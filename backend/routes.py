"""todo-ledger HTTP routes — KiroCrew Apps ``backend.hooks.routes`` contract.

``register(ctx)`` returns a list of AppRoute-shaped objects
``(method, relative_path, handler(request, ctx))``; the gateway's RouteRegistry
dispatches them under ``/api/apps/todo-ledger``. Auth is the gateway's own
token middleware — nothing to do here. Handlers self-contain all state via
:class:`backend.store.LedgerStore` on ``ctx.data_dir`` (flock-guarded, shared
with the agent CLI process).
"""
from __future__ import annotations

import asyncio
import importlib.util
import json
import sys
from pathlib import Path
from typing import Any, Dict

from aiohttp import web

# --- store import -------------------------------------------------------------
# The gateway loads this module via spec_from_file_location under a synthetic
# name ("_meshclaw_app_todo-ledger.routes") whose parent package does not
# exist, so relative imports (`from .store import ...`) fail with
# "No module named '_meshclaw_app_todo-ledger'". Load the sibling store.py
# explicitly by file path instead — works under the app loader, plain python,
# and both mesh_claw / kiro_crew hosts.
_STORE_KEY = "_todo_ledger_backend_store"


def _import_store():
    mod = sys.modules.get(_STORE_KEY)
    if mod is not None:
        return mod
    path = Path(__file__).resolve().parent / "store.py"
    spec = importlib.util.spec_from_file_location(_STORE_KEY, path)
    if spec is None or spec.loader is None:  # pragma: no cover
        raise ImportError("cannot load todo-ledger store from %s" % path)
    mod = importlib.util.module_from_spec(spec)
    sys.modules[_STORE_KEY] = mod
    spec.loader.exec_module(mod)
    return mod


_store_module = _import_store()
LedgerError = _store_module.LedgerError
LedgerStore = _store_module.LedgerStore

_MAX_BODY = 60_000


def _store(ctx) -> LedgerStore:
    return LedgerStore(ctx.data_dir)


async def _body(request: web.Request) -> Dict[str, Any]:
    raw = await request.read()
    if len(raw) > _MAX_BODY:
        raise LedgerError("request too large")
    if not raw:
        return {}
    try:
        data = json.loads(raw.decode("utf-8"))
    except (ValueError, UnicodeDecodeError):
        raise LedgerError("invalid JSON body")
    if not isinstance(data, dict):
        raise LedgerError("body must be an object")
    return data


def _json(data: Any, status: int = 200) -> web.Response:
    return web.json_response(data, status=status)


async def _run(fn, *args, **kwargs):
    """Store calls do blocking file I/O + flock — keep them off the event loop."""
    loop = asyncio.get_running_loop()
    return await loop.run_in_executor(None, lambda: fn(*args, **kwargs))


def _emit(ctx, ledger_id: str, version: int) -> None:
    """Best-effort WS event so open UI pages refetch promptly (UI also polls,
    which covers mutations made by the CLI process)."""
    try:
        if ctx.events is not None:
            ctx.events.emit("update", {"id": ledger_id, "version": version})
    except Exception:  # noqa: BLE001 — never fail a write because of an event
        ctx.logger.debug("todo-ledger event emit failed", exc_info=True)


def _wrap(fn):
    async def handler(request: web.Request, ctx) -> web.Response:
        try:
            return await fn(request, ctx)
        except LedgerError as exc:
            payload = {"error": str(exc)}
            payload.update(exc.payload)
            return _json(payload, status=exc.status)

    return handler


# -- handlers -----------------------------------------------------------------


async def list_ledgers(request: web.Request, ctx) -> web.Response:
    return _json(await _run(_store(ctx).list))


async def create_ledger(request: web.Request, ctx) -> web.Response:
    body = await _body(request)
    meta = await _run(
        _store(ctx).create, str(body.get("name", "")), str(body.get("content", ""))
    )
    _emit(ctx, meta["id"], meta["version"])
    return _json(meta, status=201)


async def get_ledger(request: web.Request, ctx) -> web.Response:
    return _json(await _run(_store(ctx).get, request.match_info["ledger_id"]))


async def update_ledger(request: web.Request, ctx) -> web.Response:
    body = await _body(request)
    if "base_version" not in body:
        raise LedgerError("base_version required")
    meta = await _run(
        _store(ctx).update,
        request.match_info["ledger_id"],
        int(body["base_version"]),
        body.get("content"),
        body.get("name"),
    )
    _emit(ctx, meta["id"], meta["version"])
    return _json(meta)


async def delete_ledger(request: web.Request, ctx) -> web.Response:
    lid = request.match_info["ledger_id"]
    await _run(_store(ctx).delete, lid)
    _emit(ctx, lid, -1)
    return _json({"ok": True})


async def append_item(request: web.Request, ctx) -> web.Response:
    body = await _body(request)
    meta = await _run(
        _store(ctx).append_item, request.match_info["ledger_id"], str(body.get("text", ""))
    )
    _emit(ctx, meta["id"], meta["version"])
    return _json(meta)


async def toggle_item(request: web.Request, ctx) -> web.Response:
    body = await _body(request)
    if "line" not in body or "expected" not in body:
        raise LedgerError("line and expected required")
    meta = await _run(
        _store(ctx).toggle,
        request.match_info["ledger_id"],
        int(body["line"]),
        str(body["expected"]),
    )
    _emit(ctx, meta["id"], meta["version"])
    return _json(meta)


async def claim_items(request: web.Request, ctx) -> web.Response:
    body = await _body(request)
    meta = await _run(
        _store(ctx).claim,
        request.match_info["ledger_id"],
        str(body.get("worker", "")),
        int(body.get("max_items", 3)),
    )
    _emit(ctx, meta["id"], meta["version"])
    return _json(meta)


async def transition_item(request: web.Request, ctx) -> web.Response:
    body = await _body(request)
    for k in ("line", "expected", "action"):
        if k not in body:
            raise LedgerError("%s required" % k)
    meta = await _run(
        _store(ctx).transition,
        request.match_info["ledger_id"],
        int(body["line"]),
        str(body["expected"]),
        str(body["action"]),
        str(body.get("note", "")),
    )
    _emit(ctx, meta["id"], meta["version"])
    return _json(meta)


async def pin_ledger(request: web.Request, ctx) -> web.Response:
    body = await _body(request)
    if "session" not in body:
        raise LedgerError("session required")
    meta = await _run(
        _store(ctx).set_pin,
        request.match_info["ledger_id"],
        str(body["session"]),
        bool(body.get("pinned", True)),
    )
    return _json(meta)


def register(ctx):
    """Entry point named by app.json ``backend.hooks.routes``.

    Dual-host: the internal distribution ships the framework as ``mesh_claw``,
    the open-source one as ``kiro_crew`` — same contract either way.
    """
    try:
        from mesh_claw.apps.route_registry import AppRoute  # type: ignore
    except ImportError:
        from kiro_crew.apps.route_registry import AppRoute  # type: ignore
    return _make_routes(AppRoute)


def _make_routes(AppRoute):
    return [
        AppRoute("GET", "/ledgers", _wrap(list_ledgers)),
        AppRoute("POST", "/ledgers", _wrap(create_ledger)),
        AppRoute("GET", "/ledgers/{ledger_id}", _wrap(get_ledger)),
        AppRoute("PUT", "/ledgers/{ledger_id}", _wrap(update_ledger)),
        AppRoute("DELETE", "/ledgers/{ledger_id}", _wrap(delete_ledger)),
        AppRoute("POST", "/ledgers/{ledger_id}/items", _wrap(append_item)),
        AppRoute("POST", "/ledgers/{ledger_id}/toggle", _wrap(toggle_item)),
        AppRoute("POST", "/ledgers/{ledger_id}/claim", _wrap(claim_items)),
        AppRoute("POST", "/ledgers/{ledger_id}/transition", _wrap(transition_item)),
        AppRoute("POST", "/ledgers/{ledger_id}/pin", _wrap(pin_ledger)),
    ]
