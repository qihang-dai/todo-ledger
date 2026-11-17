import { jsx as I, jsxs as N, Fragment as ut } from "react/jsx-runtime";
import { useAppApi as Rr, useNotify as Or, useAppEvents as Mr } from "@kirocrew/app-sdk";
import { Card as Br, Input as en, Btn as ve, PageHeader as tl, StatCard as Mt, EmptyState as nl, Badge as rl } from "@kirocrew/app-sdk/ui";
import { ArrowLeft as il, AlertTriangle as ll, Loader2 as ol, Plus as $r, Clock as al, Trash2 as sl } from "lucide-react";
import { useState as Z, useCallback as lt, createContext as jr, useMemo as tn, useContext as ct, useEffect as ft, useRef as mn } from "react";
const Ae = "/api/apps/todo-ledger", Hr = /<!--\s*claim:(.+?)\s*-->/;
async function Xe(e, n, t) {
  const r = await fetch(n, {
    method: e,
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(t)
  }), l = await r.text();
  let o = null;
  if (l)
    try {
      o = JSON.parse(l);
    } catch {
      o = { error: l };
    }
  return { status: r.status, data: o };
}
function Pe(e) {
  return e instanceof Error ? e.message : String(e);
}
function Ur(e) {
  if (e == null) return "";
  const n = typeof e == "number" ? e * 1e3 : Date.parse(e);
  if (!Number.isFinite(n)) return "";
  const t = Date.now() - n;
  if (t < 45e3) return "just now";
  const r = Math.round(t / 6e4);
  if (r < 60) return `${r}m ago`;
  const l = Math.round(r / 60);
  return l < 24 ? `${l}h ago` : `${Math.round(l / 24)}d ago`;
}
function gn() {
  const [e, n] = Z(null), t = lt(
    (a, s, u) => new Promise((f) => {
      n((c) => (c == null || c.resolve(null), { ...u, kind: a, message: s, resolve: f }));
    }),
    []
  ), r = lt(
    (a, s) => t("prompt", a, s),
    [t]
  ), l = lt(
    async (a, s) => await t("confirm", a, s) !== null,
    [t]
  );
  return { dialog: e ? /* @__PURE__ */ I(ul, { req: e, onClose: (a) => {
    e == null || e.resolve(a), n(null);
  } }) : null, prompt: r, confirm: l };
}
function ul({ req: e, onClose: n }) {
  const [t, r] = Z(""), l = e.kind === "prompt" && e.required === !0 && t.trim() === "", o = () => {
    l || n(e.kind === "prompt" ? t : "");
  };
  return /* @__PURE__ */ I(
    "div",
    {
      role: "presentation",
      onClick: () => n(null),
      onMouseUp: (i) => i.stopPropagation(),
      onKeyDown: (i) => {
        i.key === "Escape" && (i.stopPropagation(), n(null));
      },
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 1e3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,.45)"
      },
      children: /* @__PURE__ */ N(
        Br,
        {
          role: "dialog",
          "aria-modal": "true",
          "aria-label": e.message,
          onClick: (i) => i.stopPropagation(),
          style: { width: "min(420px, calc(100vw - 32px))" },
          children: [
            /* @__PURE__ */ I("div", { className: "mb-3 text-sm", children: e.message }),
            e.kind === "prompt" && /* @__PURE__ */ I(
              en,
              {
                autoFocus: !0,
                value: t,
                onChange: (i) => r(i.target.value),
                onKeyDown: (i) => {
                  i.key === "Enter" && (i.preventDefault(), o());
                },
                className: "mb-3 w-full"
              }
            ),
            /* @__PURE__ */ N("div", { className: "flex justify-end gap-2", children: [
              /* @__PURE__ */ I(ve, { type: "button", onClick: () => n(null), children: "Cancel" }),
              /* @__PURE__ */ I(
                ve,
                {
                  type: "button",
                  primary: !e.danger,
                  danger: e.danger,
                  disabled: l,
                  autoFocus: e.kind === "confirm",
                  onClick: o,
                  children: e.confirmLabel ?? "OK"
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function cl(e, n) {
  const t = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (t.padRight ? " " : "") + "," + (t.padLeft === !1 ? "" : " ")
  ).trim();
}
const fl = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, pl = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, hl = {};
function Rn(e, n) {
  return (hl.jsx ? pl : fl).test(e);
}
const dl = /[ \t\n\f\r]/g;
function ml(e) {
  return typeof e == "object" ? e.type === "text" ? On(e.value) : !1 : On(e);
}
function On(e) {
  return e.replace(dl, "") === "";
}
class dt {
  /**
   * @param {SchemaType['property']} property
   *   Property.
   * @param {SchemaType['normal']} normal
   *   Normal.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Schema.
   */
  constructor(n, t, r) {
    this.normal = t, this.property = n, r && (this.space = r);
  }
}
dt.prototype.normal = {};
dt.prototype.property = {};
dt.prototype.space = void 0;
function Vr(e, n) {
  const t = {}, r = {};
  for (const l of e)
    Object.assign(t, l.property), Object.assign(r, l.normal);
  return new dt(t, r, n);
}
function nn(e) {
  return e.toLowerCase();
}
class ce {
  /**
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @returns
   *   Info.
   */
  constructor(n, t) {
    this.attribute = t, this.property = n;
  }
}
ce.prototype.attribute = "";
ce.prototype.booleanish = !1;
ce.prototype.boolean = !1;
ce.prototype.commaOrSpaceSeparated = !1;
ce.prototype.commaSeparated = !1;
ce.prototype.defined = !1;
ce.prototype.mustUseProperty = !1;
ce.prototype.number = !1;
ce.prototype.overloadedBoolean = !1;
ce.prototype.property = "";
ce.prototype.spaceSeparated = !1;
ce.prototype.space = void 0;
let gl = 0;
const R = Ye(), ee = Ye(), rn = Ye(), E = Ye(), X = Ye(), qe = Ye(), ge = Ye();
function Ye() {
  return 2 ** ++gl;
}
const ln = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: R,
  booleanish: ee,
  commaOrSpaceSeparated: ge,
  commaSeparated: qe,
  number: E,
  overloadedBoolean: rn,
  spaceSeparated: X
}, Symbol.toStringTag, { value: "Module" })), Bt = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(ln)
);
class xn extends ce {
  /**
   * @constructor
   * @param {string} property
   *   Property.
   * @param {string} attribute
   *   Attribute.
   * @param {number | null | undefined} [mask]
   *   Mask.
   * @param {Space | undefined} [space]
   *   Space.
   * @returns
   *   Info.
   */
  constructor(n, t, r, l) {
    let o = -1;
    if (super(n, t), Mn(this, "space", l), typeof r == "number")
      for (; ++o < Bt.length; ) {
        const i = Bt[o];
        Mn(this, Bt[o], (r & ln[i]) === ln[i]);
      }
  }
}
xn.prototype.defined = !0;
function Mn(e, n, t) {
  t && (e[n] = t);
}
function Je(e) {
  const n = {}, t = {};
  for (const [r, l] of Object.entries(e.properties)) {
    const o = new xn(
      r,
      e.transform(e.attributes || {}, r),
      l,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (o.mustUseProperty = !0), n[r] = o, t[nn(r)] = r, t[nn(o.attribute)] = r;
  }
  return new dt(n, t, e.space);
}
const qr = Je({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: ee,
    ariaAutoComplete: null,
    ariaBusy: ee,
    ariaChecked: ee,
    ariaColCount: E,
    ariaColIndex: E,
    ariaColSpan: E,
    ariaControls: X,
    ariaCurrent: null,
    ariaDescribedBy: X,
    ariaDetails: null,
    ariaDisabled: ee,
    ariaDropEffect: X,
    ariaErrorMessage: null,
    ariaExpanded: ee,
    ariaFlowTo: X,
    ariaGrabbed: ee,
    ariaHasPopup: null,
    ariaHidden: ee,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: X,
    ariaLevel: E,
    ariaLive: null,
    ariaModal: ee,
    ariaMultiLine: ee,
    ariaMultiSelectable: ee,
    ariaOrientation: null,
    ariaOwns: X,
    ariaPlaceholder: null,
    ariaPosInSet: E,
    ariaPressed: ee,
    ariaReadOnly: ee,
    ariaRelevant: null,
    ariaRequired: ee,
    ariaRoleDescription: X,
    ariaRowCount: E,
    ariaRowIndex: E,
    ariaRowSpan: E,
    ariaSelected: ee,
    ariaSetSize: E,
    ariaSort: null,
    ariaValueMax: E,
    ariaValueMin: E,
    ariaValueNow: E,
    ariaValueText: null,
    role: null
  },
  transform(e, n) {
    return n === "role" ? n : "aria-" + n.slice(4).toLowerCase();
  }
});
function Wr(e, n) {
  return n in e ? e[n] : n;
}
function Yr(e, n) {
  return Wr(e, n.toLowerCase());
}
const xl = Je({
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: qe,
    acceptCharset: X,
    accessKey: X,
    action: null,
    allow: null,
    allowFullScreen: R,
    allowPaymentRequest: R,
    allowUserMedia: R,
    alpha: R,
    alt: null,
    as: null,
    async: R,
    autoCapitalize: null,
    autoComplete: X,
    autoFocus: R,
    autoPlay: R,
    blocking: X,
    capture: null,
    charSet: null,
    checked: R,
    cite: null,
    className: X,
    closedBy: null,
    colorSpace: null,
    cols: E,
    colSpan: E,
    command: null,
    commandFor: null,
    content: null,
    contentEditable: ee,
    controls: R,
    controlsList: X,
    coords: E | qe,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: R,
    defer: R,
    dir: null,
    dirName: null,
    disabled: R,
    download: rn,
    draggable: ee,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: R,
    formTarget: null,
    headers: X,
    height: E,
    hidden: rn,
    high: E,
    href: null,
    hrefLang: null,
    htmlFor: X,
    httpEquiv: X,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: R,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: R,
    itemId: null,
    itemProp: X,
    itemRef: X,
    itemScope: R,
    itemType: X,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: R,
    low: E,
    manifest: null,
    max: null,
    maxLength: E,
    media: null,
    method: null,
    min: null,
    minLength: E,
    multiple: R,
    muted: R,
    name: null,
    nonce: null,
    noModule: R,
    noValidate: R,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforeMatch: null,
    onBeforePrint: null,
    onBeforeToggle: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onScrollEnd: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: R,
    optimum: E,
    pattern: null,
    ping: X,
    placeholder: null,
    playsInline: R,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: R,
    referrerPolicy: null,
    rel: X,
    required: R,
    reversed: R,
    rows: E,
    rowSpan: E,
    sandbox: X,
    scope: null,
    scoped: R,
    seamless: R,
    selected: R,
    shadowRootClonable: R,
    shadowRootCustomElementRegistry: R,
    shadowRootDelegatesFocus: R,
    shadowRootMode: null,
    shadowRootSerializable: R,
    shape: null,
    size: E,
    sizes: null,
    slot: null,
    span: E,
    spellCheck: ee,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: E,
    step: null,
    style: null,
    tabIndex: E,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: R,
    useMap: null,
    value: ee,
    width: E,
    wrap: null,
    writingSuggestions: null,
    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null,
    // Several. Use CSS `text-align` instead,
    aLink: null,
    // `<body>`. Use CSS `a:active {color}` instead
    archive: X,
    // `<object>`. List of URIs to archives
    axis: null,
    // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null,
    // `<body>`. Use CSS `background-image` instead
    bgColor: null,
    // `<body>` and table elements. Use CSS `background-color` instead
    border: E,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: E,
    // `<body>`
    cellPadding: null,
    // `<table>`
    cellSpacing: null,
    // `<table>`
    char: null,
    // Several table elements. When `align=char`, sets the character to align on
    charOff: null,
    // Several table elements. When `char`, offsets the alignment
    classId: null,
    // `<object>`
    clear: null,
    // `<br>`. Use CSS `clear` instead
    code: null,
    // `<object>`
    codeBase: null,
    // `<object>`
    codeType: null,
    // `<object>`
    color: null,
    // `<font>` and `<hr>`. Use CSS instead
    compact: R,
    // Lists. Use CSS to reduce space between items instead
    declare: R,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: E,
    // `<img>` and `<object>`
    leftMargin: E,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: E,
    // `<body>`
    marginWidth: E,
    // `<body>`
    noResize: R,
    // `<frame>`
    noHref: R,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: R,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: R,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: E,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: ee,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: E,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: E,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    credentialless: R,
    disablePictureInPicture: R,
    disableRemotePlayback: R,
    exportParts: qe,
    part: X,
    prefix: null,
    property: null,
    results: E,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: Yr
}), yl = Je({
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    maskType: "mask-type",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    transformOrigin: "transform-origin",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  properties: {
    about: ge,
    accentHeight: E,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: E,
    amplitude: E,
    arabicForm: null,
    ascent: E,
    attributeName: null,
    attributeType: null,
    azimuth: E,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: E,
    by: null,
    calcMode: null,
    capHeight: E,
    className: X,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: E,
    diffuseConstant: E,
    direction: null,
    display: null,
    dur: null,
    divisor: E,
    dominantBaseline: null,
    download: R,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: E,
    enableBackground: null,
    end: null,
    event: null,
    exponent: E,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: E,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: qe,
    g2: qe,
    glyphName: qe,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: E,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: E,
    horizOriginX: E,
    horizOriginY: E,
    id: null,
    ideographic: E,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: E,
    k: E,
    k1: E,
    k2: E,
    k3: E,
    k4: E,
    kernelMatrix: ge,
    kernelUnitLength: null,
    keyPoints: null,
    // SEMI_COLON_SEPARATED
    keySplines: null,
    // SEMI_COLON_SEPARATED
    keyTimes: null,
    // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: E,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskType: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: E,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: E,
    overlineThickness: E,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: E,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: X,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: E,
    pointsAtY: E,
    pointsAtZ: E,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: ge,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: ge,
    rev: ge,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: ge,
    requiredFeatures: ge,
    requiredFonts: ge,
    requiredFormats: ge,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: E,
    specularExponent: E,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: E,
    strikethroughThickness: E,
    string: null,
    stroke: null,
    strokeDashArray: ge,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: E,
    strokeOpacity: E,
    strokeWidth: null,
    style: null,
    surfaceScale: E,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: ge,
    tabIndex: E,
    tableValues: null,
    target: null,
    targetX: E,
    targetY: E,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: ge,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: E,
    underlineThickness: E,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: E,
    values: null,
    vAlphabetic: E,
    vMathematical: E,
    vectorEffect: null,
    vHanging: E,
    vIdeographic: E,
    version: null,
    vertAdvY: E,
    vertOriginX: E,
    vertOriginY: E,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: E,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: Wr
}), Qr = Je({
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  },
  space: "xlink",
  transform(e, n) {
    return "xlink:" + n.slice(5).toLowerCase();
  }
}), Xr = Je({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: Yr
}), Kr = Je({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, n) {
    return "xml:" + n.slice(3).toLowerCase();
  }
}), bl = {
  classId: "classID",
  dataType: "datatype",
  itemId: "itemID",
  strokeDashArray: "strokeDasharray",
  strokeDashOffset: "strokeDashoffset",
  strokeLineCap: "strokeLinecap",
  strokeLineJoin: "strokeLinejoin",
  strokeMiterLimit: "strokeMiterlimit",
  typeOf: "typeof",
  xLinkActuate: "xlinkActuate",
  xLinkArcRole: "xlinkArcrole",
  xLinkHref: "xlinkHref",
  xLinkRole: "xlinkRole",
  xLinkShow: "xlinkShow",
  xLinkTitle: "xlinkTitle",
  xLinkType: "xlinkType",
  xmlnsXLink: "xmlnsXlink"
}, kl = /[A-Z]/g, Bn = /-[a-z]/g, wl = /^data[-\w.:]+$/i;
function vl(e, n) {
  const t = nn(n);
  let r = n, l = ce;
  if (t in e.normal)
    return e.property[e.normal[t]];
  if (t.length > 4 && t.slice(0, 4) === "data" && wl.test(n)) {
    if (n.charAt(4) === "-") {
      const o = n.slice(5).replace(Bn, Sl);
      r = "data" + o.charAt(0).toUpperCase() + o.slice(1);
    } else {
      const o = n.slice(4);
      if (!Bn.test(o)) {
        let i = o.replace(kl, Cl);
        i.charAt(0) !== "-" && (i = "-" + i), n = "data" + i;
      }
    }
    l = xn;
  }
  return new l(r, n);
}
function Cl(e) {
  return "-" + e.toLowerCase();
}
function Sl(e) {
  return e.charAt(1).toUpperCase();
}
const El = Vr([qr, xl, Qr, Xr, Kr], "html"), yn = Vr([qr, yl, Qr, Xr, Kr], "svg");
function Il(e) {
  return e.join(" ").trim();
}
var It = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Gr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var bn = {}, $n = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, Tl = /\n/g, Al = /^\s*/, Pl = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, zl = /^:\s*/, Ll = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, Dl = /^[;\s]*/, Fl = /^\s+|\s+$/g, Nl = `
`, jn = "/", Hn = "*", Ve = "", _l = "comment", Rl = "declaration";
function Ol(e, n) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  n = n || {};
  var t = 1, r = 1;
  function l(g) {
    var y = g.match(Tl);
    y && (t += y.length);
    var C = g.lastIndexOf(Nl);
    r = ~C ? g.length - C : r + g.length;
  }
  function o() {
    var g = { line: t, column: r };
    return function(y) {
      return y.position = new i(g), u(), y;
    };
  }
  function i(g) {
    this.start = g, this.end = { line: t, column: r }, this.source = n.source;
  }
  i.prototype.content = e;
  function a(g) {
    var y = new Error(
      n.source + ":" + t + ":" + r + ": " + g
    );
    if (y.reason = g, y.filename = n.source, y.line = t, y.column = r, y.source = e, !n.silent) throw y;
  }
  function s(g) {
    var y = g.exec(e);
    if (y) {
      var C = y[0];
      return l(C), e = e.slice(C.length), y;
    }
  }
  function u() {
    s(Al);
  }
  function f(g) {
    var y;
    for (g = g || []; y = c(); )
      y !== !1 && g.push(y);
    return g;
  }
  function c() {
    var g = o();
    if (!(jn != e.charAt(0) || Hn != e.charAt(1))) {
      for (var y = 2; Ve != e.charAt(y) && (Hn != e.charAt(y) || jn != e.charAt(y + 1)); )
        ++y;
      if (y += 2, Ve === e.charAt(y - 1))
        return a("End of comment missing");
      var C = e.slice(2, y - 2);
      return r += 2, l(C), e = e.slice(y), r += 2, g({
        type: _l,
        comment: C
      });
    }
  }
  function h() {
    var g = o(), y = s(Pl);
    if (y) {
      if (c(), !s(zl)) return a("property missing ':'");
      var C = s(Ll), x = g({
        type: Rl,
        property: Un(y[0].replace($n, Ve)),
        value: C ? Un(C[0].replace($n, Ve)) : Ve
      });
      return s(Dl), x;
    }
  }
  function p() {
    var g = [];
    f(g);
    for (var y; y = h(); )
      y !== !1 && (g.push(y), f(g));
    return g;
  }
  return u(), p();
}
function Un(e) {
  return e ? e.replace(Fl, Ve) : Ve;
}
var Ml = Ol, Bl = It && It.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(bn, "__esModule", { value: !0 });
bn.default = jl;
const $l = Bl(Ml);
function jl(e, n) {
  let t = null;
  if (!e || typeof e != "string")
    return t;
  const r = (0, $l.default)(e), l = typeof n == "function";
  return r.forEach((o) => {
    if (o.type !== "declaration")
      return;
    const { property: i, value: a } = o;
    l ? n(i, a, o) : a && (t = t || {}, t[i] = a);
  }), t;
}
var Lt = {};
Object.defineProperty(Lt, "__esModule", { value: !0 });
Lt.camelCase = void 0;
var Hl = /^--[a-zA-Z0-9_-]+$/, Ul = /-([a-z])/g, Vl = /^[^-]+$/, ql = /^-(webkit|moz|ms|o|khtml)-/, Wl = /^-(ms)-/, Yl = function(e) {
  return !e || Vl.test(e) || Hl.test(e);
}, Ql = function(e, n) {
  return n.toUpperCase();
}, Vn = function(e, n) {
  return "".concat(n, "-");
}, Xl = function(e, n) {
  return n === void 0 && (n = {}), Yl(e) ? e : (e = e.toLowerCase(), n.reactCompat ? e = e.replace(Wl, Vn) : e = e.replace(ql, Vn), e.replace(Ul, Ql));
};
Lt.camelCase = Xl;
var Kl = It && It.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, Gl = Kl(bn), Jl = Lt;
function on(e, n) {
  var t = {};
  return !e || typeof e != "string" || (0, Gl.default)(e, function(r, l) {
    r && l && (t[(0, Jl.camelCase)(r, n)] = l);
  }), t;
}
on.default = on;
var Zl = on;
const eo = /* @__PURE__ */ Gr(Zl), Jr = Zr("end"), kn = Zr("start");
function Zr(e) {
  return n;
  function n(t) {
    const r = t && t.position && t.position[e] || {};
    if (typeof r.line == "number" && r.line > 0 && typeof r.column == "number" && r.column > 0)
      return {
        line: r.line,
        column: r.column,
        offset: typeof r.offset == "number" && r.offset > -1 ? r.offset : void 0
      };
  }
}
function to(e) {
  const n = kn(e), t = Jr(e);
  if (n && t)
    return { start: n, end: t };
}
function ot(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? qn(e.position) : "start" in e || "end" in e ? qn(e) : "line" in e || "column" in e ? an(e) : "";
}
function an(e) {
  return Wn(e && e.line) + ":" + Wn(e && e.column);
}
function qn(e) {
  return an(e && e.start) + "-" + an(e && e.end);
}
function Wn(e) {
  return e && typeof e == "number" ? e : 1;
}
class oe extends Error {
  /**
   * Create a message for `reason`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {Options | null | undefined} [options]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | Options | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns
   *   Instance of `VFileMessage`.
   */
  // eslint-disable-next-line complexity
  constructor(n, t, r) {
    super(), typeof t == "string" && (r = t, t = void 0);
    let l = "", o = {}, i = !1;
    if (t && ("line" in t && "column" in t ? o = { place: t } : "start" in t && "end" in t ? o = { place: t } : "type" in t ? o = {
      ancestors: [t],
      place: t.position
    } : o = { ...t }), typeof n == "string" ? l = n : !o.cause && n && (i = !0, l = n.message, o.cause = n), !o.ruleId && !o.source && typeof r == "string") {
      const s = r.indexOf(":");
      s === -1 ? o.ruleId = r : (o.source = r.slice(0, s), o.ruleId = r.slice(s + 1));
    }
    if (!o.place && o.ancestors && o.ancestors) {
      const s = o.ancestors[o.ancestors.length - 1];
      s && (o.place = s.position);
    }
    const a = o.place && "start" in o.place ? o.place.start : o.place;
    this.ancestors = o.ancestors || void 0, this.cause = o.cause || void 0, this.column = a ? a.column : void 0, this.fatal = void 0, this.file = "", this.message = l, this.line = a ? a.line : void 0, this.name = ot(o.place) || "1:1", this.place = o.place || void 0, this.reason = this.message, this.ruleId = o.ruleId || void 0, this.source = o.source || void 0, this.stack = i && o.cause && typeof o.cause.stack == "string" ? o.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
oe.prototype.file = "";
oe.prototype.name = "";
oe.prototype.reason = "";
oe.prototype.message = "";
oe.prototype.stack = "";
oe.prototype.column = void 0;
oe.prototype.line = void 0;
oe.prototype.ancestors = void 0;
oe.prototype.cause = void 0;
oe.prototype.fatal = void 0;
oe.prototype.place = void 0;
oe.prototype.ruleId = void 0;
oe.prototype.source = void 0;
const wn = {}.hasOwnProperty, no = /* @__PURE__ */ new Map(), ro = /[A-Z]/g, io = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), lo = /* @__PURE__ */ new Set(["td", "th"]), ei = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function oo(e, n) {
  if (!n || n.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const t = n.filePath || void 0;
  let r;
  if (n.development) {
    if (typeof n.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = mo(t, n.jsxDEV);
  } else {
    if (typeof n.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof n.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = ho(t, n.jsx, n.jsxs);
  }
  const l = {
    Fragment: n.Fragment,
    ancestors: [],
    components: n.components || {},
    create: r,
    elementAttributeNameCase: n.elementAttributeNameCase || "react",
    evaluater: n.createEvaluater ? n.createEvaluater() : void 0,
    filePath: t,
    ignoreInvalidStyle: n.ignoreInvalidStyle || !1,
    passKeys: n.passKeys !== !1,
    passNode: n.passNode || !1,
    schema: n.space === "svg" ? yn : El,
    stylePropertyNameCase: n.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: n.tableCellAlignToStyle !== !1
  }, o = ti(l, e, void 0);
  return o && typeof o != "string" ? o : l.create(
    e,
    l.Fragment,
    { children: o || void 0 },
    void 0
  );
}
function ti(e, n, t) {
  if (n.type === "element")
    return ao(e, n, t);
  if (n.type === "mdxFlowExpression" || n.type === "mdxTextExpression")
    return so(e, n);
  if (n.type === "mdxJsxFlowElement" || n.type === "mdxJsxTextElement")
    return co(e, n, t);
  if (n.type === "mdxjsEsm")
    return uo(e, n);
  if (n.type === "root")
    return fo(e, n, t);
  if (n.type === "text")
    return po(e, n);
}
function ao(e, n, t) {
  const r = e.schema;
  let l = r;
  n.tagName.toLowerCase() === "svg" && r.space === "html" && (l = yn, e.schema = l), e.ancestors.push(n);
  const o = ri(e, n.tagName, !1), i = go(e, n);
  let a = Cn(e, n);
  return io.has(n.tagName) && (a = a.filter(function(s) {
    return typeof s == "string" ? !ml(s) : !0;
  })), ni(e, i, o, n), vn(i, a), e.ancestors.pop(), e.schema = r, e.create(n, o, i, t);
}
function so(e, n) {
  if (n.data && n.data.estree && e.evaluater) {
    const r = n.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  pt(e, n.position);
}
function uo(e, n) {
  if (n.data && n.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(n.data.estree)
    );
  pt(e, n.position);
}
function co(e, n, t) {
  const r = e.schema;
  let l = r;
  n.name === "svg" && r.space === "html" && (l = yn, e.schema = l), e.ancestors.push(n);
  const o = n.name === null ? e.Fragment : ri(e, n.name, !0), i = xo(e, n), a = Cn(e, n);
  return ni(e, i, o, n), vn(i, a), e.ancestors.pop(), e.schema = r, e.create(n, o, i, t);
}
function fo(e, n, t) {
  const r = {};
  return vn(r, Cn(e, n)), e.create(n, e.Fragment, r, t);
}
function po(e, n) {
  return n.value;
}
function ni(e, n, t, r) {
  typeof t != "string" && t !== e.Fragment && e.passNode && (n.node = r);
}
function vn(e, n) {
  if (n.length > 0) {
    const t = n.length > 1 ? n : n[0];
    t && (e.children = t);
  }
}
function ho(e, n, t) {
  return r;
  function r(l, o, i, a) {
    const u = Array.isArray(i.children) ? t : n;
    return a ? u(o, i, a) : u(o, i);
  }
}
function mo(e, n) {
  return t;
  function t(r, l, o, i) {
    const a = Array.isArray(o.children), s = kn(r);
    return n(
      l,
      o,
      i,
      a,
      {
        columnNumber: s ? s.column - 1 : void 0,
        fileName: e,
        lineNumber: s ? s.line : void 0
      },
      void 0
    );
  }
}
function go(e, n) {
  const t = {};
  let r, l;
  for (l in n.properties)
    if (l !== "children" && wn.call(n.properties, l)) {
      const o = yo(e, l, n.properties[l]);
      if (o) {
        const [i, a] = o;
        e.tableCellAlignToStyle && i === "align" && typeof a == "string" && lo.has(n.tagName) ? r = a : t[i] = a;
      }
    }
  if (r) {
    const o = (
      /** @type {Style} */
      t.style || (t.style = {})
    );
    o[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
  }
  return t;
}
function xo(e, n) {
  const t = {};
  for (const r of n.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const o = r.data.estree.body[0];
        o.type;
        const i = o.expression;
        i.type;
        const a = i.properties[0];
        a.type, Object.assign(
          t,
          e.evaluater.evaluateExpression(a.argument)
        );
      } else
        pt(e, n.position);
    else {
      const l = r.name;
      let o;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const a = r.value.data.estree.body[0];
          a.type, o = e.evaluater.evaluateExpression(a.expression);
        } else
          pt(e, n.position);
      else
        o = r.value === null ? !0 : r.value;
      t[l] = /** @type {Props[keyof Props]} */
      o;
    }
  return t;
}
function Cn(e, n) {
  const t = [];
  let r = -1;
  const l = e.passKeys ? /* @__PURE__ */ new Map() : no;
  for (; ++r < n.children.length; ) {
    const o = n.children[r];
    let i;
    if (e.passKeys) {
      const s = o.type === "element" ? o.tagName : o.type === "mdxJsxFlowElement" || o.type === "mdxJsxTextElement" ? o.name : void 0;
      if (s) {
        const u = l.get(s) || 0;
        i = s + "-" + u, l.set(s, u + 1);
      }
    }
    const a = ti(e, o, i);
    a !== void 0 && t.push(a);
  }
  return t;
}
function yo(e, n, t) {
  const r = vl(e.schema, n);
  if (!(t == null || typeof t == "number" && Number.isNaN(t))) {
    if (Array.isArray(t) && (t = r.commaSeparated ? cl(t) : Il(t)), r.property === "style") {
      let l = typeof t == "object" ? t : bo(e, String(t));
      return e.stylePropertyNameCase === "css" && (l = ko(l)), ["style", l];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? bl[r.property] || r.property : r.attribute,
      t
    ];
  }
}
function bo(e, n) {
  try {
    return eo(n, { reactCompat: !0 });
  } catch (t) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      t
    ), l = new oe("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw l.file = e.filePath || void 0, l.url = ei + "#cannot-parse-style-attribute", l;
  }
}
function ri(e, n, t) {
  let r;
  if (!t)
    r = { type: "Literal", value: n };
  else if (n.includes(".")) {
    const l = n.split(".");
    let o = -1, i;
    for (; ++o < l.length; ) {
      const a = Rn(l[o]) ? { type: "Identifier", name: l[o] } : { type: "Literal", value: l[o] };
      i = i ? {
        type: "MemberExpression",
        object: i,
        property: a,
        computed: !!(o && a.type === "Literal"),
        optional: !1
      } : a;
    }
    r = i;
  } else
    r = Rn(n) && !/^[a-z]/.test(n) ? { type: "Identifier", name: n } : { type: "Literal", value: n };
  if (r.type === "Literal") {
    const l = (
      /** @type {string | number} */
      r.value
    );
    return wn.call(e.components, l) ? e.components[l] : l;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  pt(e);
}
function pt(e, n) {
  const t = new oe(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: n,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw t.file = e.filePath || void 0, t.url = ei + "#cannot-handle-mdx-estrees-without-createevaluater", t;
}
function ko(e) {
  const n = {};
  let t;
  for (t in e)
    wn.call(e, t) && (n[wo(t)] = e[t]);
  return n;
}
function wo(e) {
  let n = e.replace(ro, vo);
  return n.slice(0, 3) === "ms-" && (n = "-" + n), n;
}
function vo(e) {
  return "-" + e.toLowerCase();
}
const $t = {
  action: ["form"],
  cite: ["blockquote", "del", "ins", "q"],
  data: ["object"],
  formAction: ["button", "input"],
  href: ["a", "area", "base", "link"],
  icon: ["menuitem"],
  itemId: null,
  manifest: ["html"],
  ping: ["a", "area"],
  poster: ["video"],
  src: [
    "audio",
    "embed",
    "iframe",
    "img",
    "input",
    "script",
    "source",
    "track",
    "video"
  ]
}, Co = {};
function Sn(e, n) {
  const t = Co, r = typeof t.includeImageAlt == "boolean" ? t.includeImageAlt : !0, l = typeof t.includeHtml == "boolean" ? t.includeHtml : !0;
  return ii(e, r, l);
}
function ii(e, n, t) {
  if (So(e)) {
    if ("value" in e)
      return e.type === "html" && !t ? "" : e.value;
    if (n && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return Yn(e.children, n, t);
  }
  return Array.isArray(e) ? Yn(e, n, t) : "";
}
function Yn(e, n, t) {
  const r = [];
  let l = -1;
  for (; ++l < e.length; )
    r[l] = ii(e[l], n, t);
  return r.join("");
}
function So(e) {
  return !!(e && typeof e == "object");
}
const Qn = document.createElement("i");
function En(e) {
  const n = "&" + e + ";";
  Qn.innerHTML = n;
  const t = Qn.textContent;
  return t.charCodeAt(t.length - 1) === 59 && e !== "semi" || t === n ? !1 : t;
}
function xe(e, n, t, r) {
  const l = e.length;
  let o = 0, i;
  if (n < 0 ? n = -n > l ? 0 : l + n : n = n > l ? l : n, t = t > 0 ? t : 0, r.length < 1e4)
    i = Array.from(r), i.unshift(n, t), e.splice(...i);
  else
    for (t && e.splice(n, t); o < r.length; )
      i = r.slice(o, o + 1e4), i.unshift(n, 0), e.splice(...i), o += 1e4, n += 1e4;
}
function Ce(e, n) {
  return e.length > 0 ? (xe(e, e.length, 0, n), e) : n;
}
const Xn = {}.hasOwnProperty;
function li(e) {
  const n = {};
  let t = -1;
  for (; ++t < e.length; )
    Eo(n, e[t]);
  return n;
}
function Eo(e, n) {
  let t;
  for (t in n) {
    const l = (Xn.call(e, t) ? e[t] : void 0) || (e[t] = {}), o = n[t];
    let i;
    if (o)
      for (i in o) {
        Xn.call(l, i) || (l[i] = []);
        const a = o[i];
        Io(
          // @ts-expect-error Looks like a list.
          l[i],
          Array.isArray(a) ? a : a ? [a] : []
        );
      }
  }
}
function Io(e, n) {
  let t = -1;
  const r = [];
  for (; ++t < n.length; )
    (n[t].add === "after" ? e : r).push(n[t]);
  xe(e, 0, 0, r);
}
function oi(e, n) {
  const t = Number.parseInt(e, n);
  return (
    // C0 except for HT, LF, FF, CR, space.
    t < 9 || t === 11 || t > 13 && t < 32 || // Control character (DEL) of C0, and C1 controls.
    t > 126 && t < 160 || // Lone high surrogates and low surrogates.
    t > 55295 && t < 57344 || // Noncharacters.
    t > 64975 && t < 65008 || /* eslint-disable no-bitwise */
    (t & 65535) === 65535 || (t & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    t > 1114111 ? "�" : String.fromCodePoint(t)
  );
}
function Ie(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const se = $e(/[A-Za-z]/), le = $e(/[\dA-Za-z]/), To = $e(/[#-'*+\--9=?A-Z^-~]/);
function Tt(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const sn = $e(/\d/), Ao = $e(/[\dA-Fa-f]/), Po = $e(/[!-/:-@[-`{-~]/);
function F(e) {
  return e !== null && e < -2;
}
function K(e) {
  return e !== null && (e < 0 || e === 32);
}
function B(e) {
  return e === -2 || e === -1 || e === 32;
}
const Dt = $e(new RegExp("\\p{P}|\\p{S}", "u")), We = $e(/\s/);
function $e(e) {
  return n;
  function n(t) {
    return t !== null && t > -1 && e.test(String.fromCharCode(t));
  }
}
function Ze(e) {
  const n = [];
  let t = -1, r = 0, l = 0;
  for (; ++t < e.length; ) {
    const o = e.charCodeAt(t);
    let i = "";
    if (o === 37 && le(e.charCodeAt(t + 1)) && le(e.charCodeAt(t + 2)))
      l = 2;
    else if (o < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(o)) || (i = String.fromCharCode(o));
    else if (o > 55295 && o < 57344) {
      const a = e.charCodeAt(t + 1);
      o < 56320 && a > 56319 && a < 57344 ? (i = String.fromCharCode(o, a), l = 1) : i = "�";
    } else
      i = String.fromCharCode(o);
    i && (n.push(e.slice(r, t), encodeURIComponent(i)), r = t + l + 1, i = ""), l && (t += l, l = 0);
  }
  return n.join("") + e.slice(r);
}
function H(e, n, t, r) {
  const l = r ? r - 1 : Number.POSITIVE_INFINITY;
  let o = 0;
  return i;
  function i(s) {
    return B(s) ? (e.enter(t), a(s)) : n(s);
  }
  function a(s) {
    return B(s) && o++ < l ? (e.consume(s), a) : (e.exit(t), n(s));
  }
}
const zo = {
  tokenize: Lo
};
function Lo(e) {
  const n = e.attempt(this.parser.constructs.contentInitial, r, l);
  let t;
  return n;
  function r(a) {
    if (a === null) {
      e.consume(a);
      return;
    }
    return e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), H(e, n, "linePrefix");
  }
  function l(a) {
    return e.enter("paragraph"), o(a);
  }
  function o(a) {
    const s = e.enter("chunkText", {
      contentType: "text",
      previous: t
    });
    return t && (t.next = s), t = s, i(a);
  }
  function i(a) {
    if (a === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(a);
      return;
    }
    return F(a) ? (e.consume(a), e.exit("chunkText"), o) : (e.consume(a), i);
  }
}
const Do = {
  tokenize: Fo
}, Kn = {
  tokenize: No
};
function Fo(e) {
  const n = this, t = [];
  let r = 0, l, o, i;
  return a;
  function a(k) {
    if (r < t.length) {
      const L = t[r];
      return n.containerState = L[1], e.attempt(L[0].continuation, s, u)(k);
    }
    return u(k);
  }
  function s(k) {
    if (r++, n.containerState._closeFlow) {
      n.containerState._closeFlow = void 0, l && S();
      const L = n.events.length;
      let _ = L, w;
      for (; _--; )
        if (n.events[_][0] === "exit" && n.events[_][1].type === "chunkFlow") {
          w = n.events[_][1].end;
          break;
        }
      x(r);
      let P = L;
      for (; P < n.events.length; )
        n.events[P][1].end = {
          ...w
        }, P++;
      return xe(n.events, _ + 1, 0, n.events.slice(L)), n.events.length = P, u(k);
    }
    return a(k);
  }
  function u(k) {
    if (r === t.length) {
      if (!l)
        return h(k);
      if (l.currentConstruct && l.currentConstruct.concrete)
        return g(k);
      n.interrupt = !!(l.currentConstruct && !l._gfmTableDynamicInterruptHack);
    }
    return n.containerState = {}, e.check(Kn, f, c)(k);
  }
  function f(k) {
    return l && S(), x(r), h(k);
  }
  function c(k) {
    return n.parser.lazy[n.now().line] = r !== t.length, i = n.now().offset, g(k);
  }
  function h(k) {
    return n.containerState = {}, e.attempt(Kn, p, g)(k);
  }
  function p(k) {
    return r++, t.push([n.currentConstruct, n.containerState]), h(k);
  }
  function g(k) {
    if (k === null) {
      l && S(), x(0), e.consume(k);
      return;
    }
    return l = l || n.parser.flow(n.now()), e.enter("chunkFlow", {
      _tokenizer: l,
      contentType: "flow",
      previous: o
    }), y(k);
  }
  function y(k) {
    if (k === null) {
      C(e.exit("chunkFlow"), !0), x(0), e.consume(k);
      return;
    }
    return F(k) ? (e.consume(k), C(e.exit("chunkFlow")), r = 0, n.interrupt = void 0, a) : (e.consume(k), y);
  }
  function C(k, L) {
    const _ = n.sliceStream(k);
    if (L && _.push(null), k.previous = o, o && (o.next = k), o = k, l.defineSkip(k.start), l.write(_), n.parser.lazy[k.start.line]) {
      let w = l.events.length;
      for (; w--; )
        if (
          // The token starts before the line ending…
          l.events[w][1].start.offset < i && // …and either is not ended yet…
          (!l.events[w][1].end || // …or ends after it.
          l.events[w][1].end.offset > i)
        )
          return;
      const P = n.events.length;
      let V = P, U, b;
      for (; V--; )
        if (n.events[V][0] === "exit" && n.events[V][1].type === "chunkFlow") {
          if (U) {
            b = n.events[V][1].end;
            break;
          }
          U = !0;
        }
      for (x(r), w = P; w < n.events.length; )
        n.events[w][1].end = {
          ...b
        }, w++;
      xe(n.events, V + 1, 0, n.events.slice(P)), n.events.length = w;
    }
  }
  function x(k) {
    let L = t.length;
    for (; L-- > k; ) {
      const _ = t[L];
      n.containerState = _[1], _[0].exit.call(n, e);
    }
    t.length = k;
  }
  function S() {
    l.write([null]), o = void 0, l = void 0, n.containerState._closeFlow = void 0;
  }
}
function No(e, n, t) {
  return H(e, e.attempt(this.parser.constructs.document, n, t), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Ge(e) {
  if (e === null || K(e) || We(e))
    return 1;
  if (Dt(e))
    return 2;
}
function Ft(e, n, t) {
  const r = [];
  let l = -1;
  for (; ++l < e.length; ) {
    const o = e[l].resolveAll;
    o && !r.includes(o) && (n = o(n, t), r.push(o));
  }
  return n;
}
const un = {
  name: "attention",
  resolveAll: _o,
  tokenize: Ro
};
function _o(e, n) {
  let t = -1, r, l, o, i, a, s, u, f;
  for (; ++t < e.length; )
    if (e[t][0] === "enter" && e[t][1].type === "attentionSequence" && e[t][1]._close) {
      for (r = t; r--; )
        if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && // If the markers are the same:
        n.sliceSerialize(e[r][1]).charCodeAt(0) === n.sliceSerialize(e[t][1]).charCodeAt(0)) {
          if ((e[r][1]._close || e[t][1]._open) && (e[t][1].end.offset - e[t][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[t][1].end.offset - e[t][1].start.offset) % 3))
            continue;
          s = e[r][1].end.offset - e[r][1].start.offset > 1 && e[t][1].end.offset - e[t][1].start.offset > 1 ? 2 : 1;
          const c = {
            ...e[r][1].end
          }, h = {
            ...e[t][1].start
          };
          Gn(c, -s), Gn(h, s), i = {
            type: s > 1 ? "strongSequence" : "emphasisSequence",
            start: c,
            end: {
              ...e[r][1].end
            }
          }, a = {
            type: s > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...e[t][1].start
            },
            end: h
          }, o = {
            type: s > 1 ? "strongText" : "emphasisText",
            start: {
              ...e[r][1].end
            },
            end: {
              ...e[t][1].start
            }
          }, l = {
            type: s > 1 ? "strong" : "emphasis",
            start: {
              ...i.start
            },
            end: {
              ...a.end
            }
          }, e[r][1].end = {
            ...i.start
          }, e[t][1].start = {
            ...a.end
          }, u = [], e[r][1].end.offset - e[r][1].start.offset && (u = Ce(u, [["enter", e[r][1], n], ["exit", e[r][1], n]])), u = Ce(u, [["enter", l, n], ["enter", i, n], ["exit", i, n], ["enter", o, n]]), u = Ce(u, Ft(n.parser.constructs.insideSpan.null, e.slice(r + 1, t), n)), u = Ce(u, [["exit", o, n], ["enter", a, n], ["exit", a, n], ["exit", l, n]]), e[t][1].end.offset - e[t][1].start.offset ? (f = 2, u = Ce(u, [["enter", e[t][1], n], ["exit", e[t][1], n]])) : f = 0, xe(e, r - 1, t - r + 3, u), t = r + u.length - f - 2;
          break;
        }
    }
  for (t = -1; ++t < e.length; )
    e[t][1].type === "attentionSequence" && (e[t][1].type = "data");
  return e;
}
function Ro(e, n) {
  const t = this.parser.constructs.attentionMarkers.null, r = this.previous, l = Ge(r);
  let o;
  return i;
  function i(s) {
    return o = s, e.enter("attentionSequence"), a(s);
  }
  function a(s) {
    if (s === o)
      return e.consume(s), a;
    const u = e.exit("attentionSequence"), f = Ge(s), c = !f || f === 2 && l || t.includes(s), h = !l || l === 2 && f || t.includes(r);
    return u._open = !!(o === 42 ? c : c && (l || !h)), u._close = !!(o === 42 ? h : h && (f || !c)), n(s);
  }
}
function Gn(e, n) {
  e.column += n, e.offset += n, e._bufferIndex += n;
}
const Oo = {
  name: "autolink",
  tokenize: Mo
};
function Mo(e, n, t) {
  let r = 0;
  return l;
  function l(p) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), o;
  }
  function o(p) {
    return se(p) ? (e.consume(p), i) : p === 64 ? t(p) : u(p);
  }
  function i(p) {
    return p === 43 || p === 45 || p === 46 || le(p) ? (r = 1, a(p)) : u(p);
  }
  function a(p) {
    return p === 58 ? (e.consume(p), r = 0, s) : (p === 43 || p === 45 || p === 46 || le(p)) && r++ < 32 ? (e.consume(p), a) : (r = 0, u(p));
  }
  function s(p) {
    return p === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), n) : p === null || p === 32 || p === 60 || Tt(p) ? t(p) : (e.consume(p), s);
  }
  function u(p) {
    return p === 64 ? (e.consume(p), f) : To(p) ? (e.consume(p), u) : t(p);
  }
  function f(p) {
    return le(p) ? c(p) : t(p);
  }
  function c(p) {
    return p === 46 ? (e.consume(p), r = 0, f) : p === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), n) : h(p);
  }
  function h(p) {
    if ((p === 45 || le(p)) && r++ < 63) {
      const g = p === 45 ? h : c;
      return e.consume(p), g;
    }
    return t(p);
  }
}
const mt = {
  partial: !0,
  tokenize: Bo
};
function Bo(e, n, t) {
  return r;
  function r(o) {
    return B(o) ? H(e, l, "linePrefix")(o) : l(o);
  }
  function l(o) {
    return o === null || F(o) ? n(o) : t(o);
  }
}
const ai = {
  continuation: {
    tokenize: jo
  },
  exit: Ho,
  name: "blockQuote",
  tokenize: $o
};
function $o(e, n, t) {
  const r = this;
  return l;
  function l(i) {
    if (i === 62) {
      const a = r.containerState;
      return a.open || (e.enter("blockQuote", {
        _container: !0
      }), a.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(i), e.exit("blockQuoteMarker"), o;
    }
    return t(i);
  }
  function o(i) {
    return B(i) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(i), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), n) : (e.exit("blockQuotePrefix"), n(i));
  }
}
function jo(e, n, t) {
  const r = this;
  return l;
  function l(i) {
    return B(i) ? H(e, o, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(i) : o(i);
  }
  function o(i) {
    return e.attempt(ai, n, t)(i);
  }
}
function Ho(e) {
  e.exit("blockQuote");
}
const si = {
  name: "characterEscape",
  tokenize: Uo
};
function Uo(e, n, t) {
  return r;
  function r(o) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(o), e.exit("escapeMarker"), l;
  }
  function l(o) {
    return Po(o) ? (e.enter("characterEscapeValue"), e.consume(o), e.exit("characterEscapeValue"), e.exit("characterEscape"), n) : t(o);
  }
}
const ui = {
  name: "characterReference",
  tokenize: Vo
};
function Vo(e, n, t) {
  const r = this;
  let l = 0, o, i;
  return a;
  function a(c) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(c), e.exit("characterReferenceMarker"), s;
  }
  function s(c) {
    return c === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(c), e.exit("characterReferenceMarkerNumeric"), u) : (e.enter("characterReferenceValue"), o = 31, i = le, f(c));
  }
  function u(c) {
    return c === 88 || c === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(c), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), o = 6, i = Ao, f) : (e.enter("characterReferenceValue"), o = 7, i = sn, f(c));
  }
  function f(c) {
    if (c === 59 && l) {
      const h = e.exit("characterReferenceValue");
      return i === le && !En(r.sliceSerialize(h)) ? t(c) : (e.enter("characterReferenceMarker"), e.consume(c), e.exit("characterReferenceMarker"), e.exit("characterReference"), n);
    }
    return i(c) && l++ < o ? (e.consume(c), f) : t(c);
  }
}
const Jn = {
  partial: !0,
  tokenize: Wo
}, Zn = {
  concrete: !0,
  name: "codeFenced",
  tokenize: qo
};
function qo(e, n, t) {
  const r = this, l = {
    partial: !0,
    tokenize: _
  };
  let o = 0, i = 0, a;
  return s;
  function s(w) {
    return u(w);
  }
  function u(w) {
    const P = r.events[r.events.length - 1];
    return o = P && P[1].type === "linePrefix" ? P[2].sliceSerialize(P[1], !0).length : 0, a = w, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), f(w);
  }
  function f(w) {
    return w === a ? (i++, e.consume(w), f) : i < 3 ? t(w) : (e.exit("codeFencedFenceSequence"), B(w) ? H(e, c, "whitespace")(w) : c(w));
  }
  function c(w) {
    return w === null || F(w) ? (e.exit("codeFencedFence"), r.interrupt ? n(w) : e.check(Jn, y, L)(w)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), h(w));
  }
  function h(w) {
    return w === null || F(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), c(w)) : B(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), H(e, p, "whitespace")(w)) : w === 96 && w === a ? t(w) : (e.consume(w), h);
  }
  function p(w) {
    return w === null || F(w) ? c(w) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), g(w));
  }
  function g(w) {
    return w === null || F(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), c(w)) : w === 96 && w === a ? t(w) : (e.consume(w), g);
  }
  function y(w) {
    return e.attempt(l, L, C)(w);
  }
  function C(w) {
    return e.enter("lineEnding"), e.consume(w), e.exit("lineEnding"), x;
  }
  function x(w) {
    return o > 0 && B(w) ? H(e, S, "linePrefix", o + 1)(w) : S(w);
  }
  function S(w) {
    return w === null || F(w) ? e.check(Jn, y, L)(w) : (e.enter("codeFlowValue"), k(w));
  }
  function k(w) {
    return w === null || F(w) ? (e.exit("codeFlowValue"), S(w)) : (e.consume(w), k);
  }
  function L(w) {
    return e.exit("codeFenced"), n(w);
  }
  function _(w, P, V) {
    let U = 0;
    return b;
    function b($) {
      return w.enter("lineEnding"), w.consume($), w.exit("lineEnding"), A;
    }
    function A($) {
      return w.enter("codeFencedFence"), B($) ? H(w, z, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)($) : z($);
    }
    function z($) {
      return $ === a ? (w.enter("codeFencedFenceSequence"), q($)) : V($);
    }
    function q($) {
      return $ === a ? (U++, w.consume($), q) : U >= i ? (w.exit("codeFencedFenceSequence"), B($) ? H(w, G, "whitespace")($) : G($)) : V($);
    }
    function G($) {
      return $ === null || F($) ? (w.exit("codeFencedFence"), P($)) : V($);
    }
  }
}
function Wo(e, n, t) {
  const r = this;
  return l;
  function l(i) {
    return i === null ? t(i) : (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), o);
  }
  function o(i) {
    return r.parser.lazy[r.now().line] ? t(i) : n(i);
  }
}
const jt = {
  name: "codeIndented",
  tokenize: Qo
}, Yo = {
  partial: !0,
  tokenize: Xo
};
function Qo(e, n, t) {
  const r = this;
  return l;
  function l(u) {
    return e.enter("codeIndented"), H(e, o, "linePrefix", 5)(u);
  }
  function o(u) {
    const f = r.events[r.events.length - 1];
    return f && f[1].type === "linePrefix" && f[2].sliceSerialize(f[1], !0).length >= 4 ? i(u) : t(u);
  }
  function i(u) {
    return u === null ? s(u) : F(u) ? e.attempt(Yo, i, s)(u) : (e.enter("codeFlowValue"), a(u));
  }
  function a(u) {
    return u === null || F(u) ? (e.exit("codeFlowValue"), i(u)) : (e.consume(u), a);
  }
  function s(u) {
    return e.exit("codeIndented"), n(u);
  }
}
function Xo(e, n, t) {
  const r = this;
  return l;
  function l(i) {
    return r.parser.lazy[r.now().line] ? t(i) : F(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), l) : H(e, o, "linePrefix", 5)(i);
  }
  function o(i) {
    const a = r.events[r.events.length - 1];
    return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? n(i) : F(i) ? l(i) : t(i);
  }
}
const Ko = {
  name: "codeText",
  previous: Jo,
  resolve: Go,
  tokenize: Zo
};
function Go(e) {
  let n = e.length - 4, t = 3, r, l;
  if ((e[t][1].type === "lineEnding" || e[t][1].type === "space") && (e[n][1].type === "lineEnding" || e[n][1].type === "space")) {
    for (r = t; ++r < n; )
      if (e[r][1].type === "codeTextData") {
        e[t][1].type = "codeTextPadding", e[n][1].type = "codeTextPadding", t += 2, n -= 2;
        break;
      }
  }
  for (r = t - 1, n++; ++r <= n; )
    l === void 0 ? r !== n && e[r][1].type !== "lineEnding" && (l = r) : (r === n || e[r][1].type === "lineEnding") && (e[l][1].type = "codeTextData", r !== l + 2 && (e[l][1].end = e[r - 1][1].end, e.splice(l + 2, r - l - 2), n -= r - l - 2, r = l + 2), l = void 0);
  return e;
}
function Jo(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function Zo(e, n, t) {
  let r = 0, l, o;
  return i;
  function i(c) {
    return e.enter("codeText"), e.enter("codeTextSequence"), a(c);
  }
  function a(c) {
    return c === 96 ? (e.consume(c), r++, a) : (e.exit("codeTextSequence"), s(c));
  }
  function s(c) {
    return c === null ? t(c) : c === 32 ? (e.enter("space"), e.consume(c), e.exit("space"), s) : c === 96 ? (o = e.enter("codeTextSequence"), l = 0, f(c)) : F(c) ? (e.enter("lineEnding"), e.consume(c), e.exit("lineEnding"), s) : (e.enter("codeTextData"), u(c));
  }
  function u(c) {
    return c === null || c === 32 || c === 96 || F(c) ? (e.exit("codeTextData"), s(c)) : (e.consume(c), u);
  }
  function f(c) {
    return c === 96 ? (e.consume(c), l++, f) : l === r ? (e.exit("codeTextSequence"), e.exit("codeText"), n(c)) : (o.type = "codeTextData", u(c));
  }
}
class ea {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(n) {
    this.left = n ? [...n] : [], this.right = [];
  }
  /**
   * Array access;
   * does not move the cursor.
   *
   * @param {number} index
   *   Index.
   * @return {T}
   *   Item.
   */
  get(n) {
    if (n < 0 || n >= this.left.length + this.right.length)
      throw new RangeError("Cannot access index `" + n + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return n < this.left.length ? this.left[n] : this.right[this.right.length - n + this.left.length - 1];
  }
  /**
   * The length of the splice buffer, one greater than the largest index in the
   * array.
   */
  get length() {
    return this.left.length + this.right.length;
  }
  /**
   * Remove and return `list[0]`;
   * moves the cursor to `0`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  shift() {
    return this.setCursor(0), this.right.pop();
  }
  /**
   * Slice the buffer to get an array;
   * does not move the cursor.
   *
   * @param {number} start
   *   Start.
   * @param {number | null | undefined} [end]
   *   End (optional).
   * @returns {Array<T>}
   *   Array of items.
   */
  slice(n, t) {
    const r = t ?? Number.POSITIVE_INFINITY;
    return r < this.left.length ? this.left.slice(n, r) : n > this.left.length ? this.right.slice(this.right.length - r + this.left.length, this.right.length - n + this.left.length).reverse() : this.left.slice(n).concat(this.right.slice(this.right.length - r + this.left.length).reverse());
  }
  /**
   * Mimics the behavior of Array.prototype.splice() except for the change of
   * interface necessary to avoid segfaults when patching in very large arrays.
   *
   * This operation moves cursor is moved to `start` and results in the cursor
   * placed after any inserted items.
   *
   * @param {number} start
   *   Start;
   *   zero-based index at which to start changing the array;
   *   negative numbers count backwards from the end of the array and values
   *   that are out-of bounds are clamped to the appropriate end of the array.
   * @param {number | null | undefined} [deleteCount=0]
   *   Delete count (default: `0`);
   *   maximum number of elements to delete, starting from start.
   * @param {Array<T> | null | undefined} [items=[]]
   *   Items to include in place of the deleted items (default: `[]`).
   * @return {Array<T>}
   *   Any removed items.
   */
  splice(n, t, r) {
    const l = t || 0;
    this.setCursor(Math.trunc(n));
    const o = this.right.splice(this.right.length - l, Number.POSITIVE_INFINITY);
    return r && rt(this.left, r), o.reverse();
  }
  /**
   * Remove and return the highest-numbered item in the array, so
   * `list[list.length - 1]`;
   * Moves the cursor to `length`.
   *
   * @returns {T | undefined}
   *   Item, optional.
   */
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  /**
   * Inserts a single item to the high-numbered side of the array;
   * moves the cursor to `length`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  push(n) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(n);
  }
  /**
   * Inserts many items to the high-numbered side of the array.
   * Moves the cursor to `length`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  pushMany(n) {
    this.setCursor(Number.POSITIVE_INFINITY), rt(this.left, n);
  }
  /**
   * Inserts a single item to the low-numbered side of the array;
   * Moves the cursor to `0`.
   *
   * @param {T} item
   *   Item.
   * @returns {undefined}
   *   Nothing.
   */
  unshift(n) {
    this.setCursor(0), this.right.push(n);
  }
  /**
   * Inserts many items to the low-numbered side of the array;
   * moves the cursor to `0`.
   *
   * @param {Array<T>} items
   *   Items.
   * @returns {undefined}
   *   Nothing.
   */
  unshiftMany(n) {
    this.setCursor(0), rt(this.right, n.reverse());
  }
  /**
   * Move the cursor to a specific position in the array. Requires
   * time proportional to the distance moved.
   *
   * If `n < 0`, the cursor will end up at the beginning.
   * If `n > length`, the cursor will end up at the end.
   *
   * @param {number} n
   *   Position.
   * @return {undefined}
   *   Nothing.
   */
  setCursor(n) {
    if (!(n === this.left.length || n > this.left.length && this.right.length === 0 || n < 0 && this.left.length === 0))
      if (n < this.left.length) {
        const t = this.left.splice(n, Number.POSITIVE_INFINITY);
        rt(this.right, t.reverse());
      } else {
        const t = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
        rt(this.left, t.reverse());
      }
  }
}
function rt(e, n) {
  let t = 0;
  if (n.length < 1e4)
    e.push(...n);
  else
    for (; t < n.length; )
      e.push(...n.slice(t, t + 1e4)), t += 1e4;
}
function ci(e) {
  const n = {};
  let t = -1, r, l, o, i, a, s, u;
  const f = new ea(e);
  for (; ++t < f.length; ) {
    for (; t in n; )
      t = n[t];
    if (r = f.get(t), t && r[1].type === "chunkFlow" && f.get(t - 1)[1].type === "listItemPrefix" && (s = r[1]._tokenizer.events, o = 0, o < s.length && s[o][1].type === "lineEndingBlank" && (o += 2), o < s.length && s[o][1].type === "content"))
      for (; ++o < s.length && s[o][1].type !== "content"; )
        s[o][1].type === "chunkText" && (s[o][1]._isInFirstContentOfListItem = !0, o++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(n, ta(f, t)), t = n[t], u = !0);
    else if (r[1]._container) {
      for (o = t, l = void 0; o--; )
        if (i = f.get(o), i[1].type === "lineEnding" || i[1].type === "lineEndingBlank")
          i[0] === "enter" && (l && (f.get(l)[1].type = "lineEndingBlank"), i[1].type = "lineEnding", l = o);
        else if (!(i[1].type === "linePrefix" || i[1].type === "listItemIndent")) break;
      l && (r[1].end = {
        ...f.get(l)[1].start
      }, a = f.slice(l, t), a.unshift(r), f.splice(l, t - l + 1, a));
    }
  }
  return xe(e, 0, Number.POSITIVE_INFINITY, f.slice(0)), !u;
}
function ta(e, n) {
  const t = e.get(n)[1], r = e.get(n)[2];
  let l = n - 1;
  const o = [];
  let i = t._tokenizer;
  i || (i = r.parser[t.contentType](t.start), t._contentTypeTextTrailing && (i._contentTypeTextTrailing = !0));
  const a = i.events, s = [], u = {};
  let f, c, h = -1, p = t, g = 0, y = 0;
  const C = [y];
  for (; p; ) {
    for (; e.get(++l)[1] !== p; )
      ;
    o.push(l), p._tokenizer || (f = r.sliceStream(p), p.next || f.push(null), c && i.defineSkip(p.start), p._isInFirstContentOfListItem && (i._gfmTasklistFirstContentOfListItem = !0), i.write(f), p._isInFirstContentOfListItem && (i._gfmTasklistFirstContentOfListItem = void 0)), c = p, p = p.next;
  }
  for (p = t; ++h < a.length; )
    // Find a void token that includes a break.
    a[h][0] === "exit" && a[h - 1][0] === "enter" && a[h][1].type === a[h - 1][1].type && a[h][1].start.line !== a[h][1].end.line && (y = h + 1, C.push(y), p._tokenizer = void 0, p.previous = void 0, p = p.next);
  for (i.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : C.pop(), h = C.length; h--; ) {
    const x = a.slice(C[h], C[h + 1]), S = o.pop();
    s.push([S, S + x.length - 1]), e.splice(S, 2, x);
  }
  for (s.reverse(), h = -1; ++h < s.length; )
    u[g + s[h][0]] = g + s[h][1], g += s[h][1] - s[h][0] - 1;
  return u;
}
const na = {
  resolve: ia,
  tokenize: la
}, ra = {
  partial: !0,
  tokenize: oa
};
function ia(e) {
  return ci(e), e;
}
function la(e, n) {
  let t;
  return r;
  function r(a) {
    return e.enter("content"), t = e.enter("chunkContent", {
      contentType: "content"
    }), l(a);
  }
  function l(a) {
    return a === null ? o(a) : F(a) ? e.check(ra, i, o)(a) : (e.consume(a), l);
  }
  function o(a) {
    return e.exit("chunkContent"), e.exit("content"), n(a);
  }
  function i(a) {
    return e.consume(a), e.exit("chunkContent"), t.next = e.enter("chunkContent", {
      contentType: "content",
      previous: t
    }), t = t.next, l;
  }
}
function oa(e, n, t) {
  const r = this;
  return l;
  function l(i) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), H(e, o, "linePrefix");
  }
  function o(i) {
    if (i === null || F(i))
      return t(i);
    const a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? n(i) : e.interrupt(r.parser.constructs.flow, t, n)(i);
  }
}
function fi(e, n, t, r, l, o, i, a, s) {
  const u = s || Number.POSITIVE_INFINITY;
  let f = 0;
  return c;
  function c(x) {
    return x === 60 ? (e.enter(r), e.enter(l), e.enter(o), e.consume(x), e.exit(o), h) : x === null || x === 32 || x === 41 || Tt(x) ? t(x) : (e.enter(r), e.enter(i), e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), y(x));
  }
  function h(x) {
    return x === 62 ? (e.enter(o), e.consume(x), e.exit(o), e.exit(l), e.exit(r), n) : (e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), p(x));
  }
  function p(x) {
    return x === 62 ? (e.exit("chunkString"), e.exit(a), h(x)) : x === null || x === 60 || F(x) ? t(x) : (e.consume(x), x === 92 ? g : p);
  }
  function g(x) {
    return x === 60 || x === 62 || x === 92 ? (e.consume(x), p) : p(x);
  }
  function y(x) {
    return !f && (x === null || x === 41 || K(x)) ? (e.exit("chunkString"), e.exit(a), e.exit(i), e.exit(r), n(x)) : f < u && x === 40 ? (e.consume(x), f++, y) : x === 41 ? (e.consume(x), f--, y) : x === null || x === 32 || x === 40 || Tt(x) ? t(x) : (e.consume(x), x === 92 ? C : y);
  }
  function C(x) {
    return x === 40 || x === 41 || x === 92 ? (e.consume(x), y) : y(x);
  }
}
function pi(e, n, t, r, l, o) {
  const i = this;
  let a = 0, s;
  return u;
  function u(p) {
    return e.enter(r), e.enter(l), e.consume(p), e.exit(l), e.enter(o), f;
  }
  function f(p) {
    return a > 999 || p === null || p === 91 || p === 93 && !s || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    p === 94 && !a && "_hiddenFootnoteSupport" in i.parser.constructs ? t(p) : p === 93 ? (e.exit(o), e.enter(l), e.consume(p), e.exit(l), e.exit(r), n) : F(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), f) : (e.enter("chunkString", {
      contentType: "string"
    }), c(p));
  }
  function c(p) {
    return p === null || p === 91 || p === 93 || F(p) || a++ > 999 ? (e.exit("chunkString"), f(p)) : (e.consume(p), s || (s = !B(p)), p === 92 ? h : c);
  }
  function h(p) {
    return p === 91 || p === 92 || p === 93 ? (e.consume(p), a++, c) : c(p);
  }
}
function hi(e, n, t, r, l, o) {
  let i;
  return a;
  function a(h) {
    return h === 34 || h === 39 || h === 40 ? (e.enter(r), e.enter(l), e.consume(h), e.exit(l), i = h === 40 ? 41 : h, s) : t(h);
  }
  function s(h) {
    return h === i ? (e.enter(l), e.consume(h), e.exit(l), e.exit(r), n) : (e.enter(o), u(h));
  }
  function u(h) {
    return h === i ? (e.exit(o), s(i)) : h === null ? t(h) : F(h) ? (e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), H(e, u, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), f(h));
  }
  function f(h) {
    return h === i || h === null || F(h) ? (e.exit("chunkString"), u(h)) : (e.consume(h), h === 92 ? c : f);
  }
  function c(h) {
    return h === i || h === 92 ? (e.consume(h), f) : f(h);
  }
}
function at(e, n) {
  let t;
  return r;
  function r(l) {
    return F(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), t = !0, r) : B(l) ? H(e, r, t ? "linePrefix" : "lineSuffix")(l) : n(l);
  }
}
const aa = {
  name: "definition",
  tokenize: ua
}, sa = {
  partial: !0,
  tokenize: ca
};
function ua(e, n, t) {
  const r = this;
  let l;
  return o;
  function o(p) {
    return e.enter("definition"), i(p);
  }
  function i(p) {
    return pi.call(
      r,
      e,
      a,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(p);
  }
  function a(p) {
    return l = Ie(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), p === 58 ? (e.enter("definitionMarker"), e.consume(p), e.exit("definitionMarker"), s) : t(p);
  }
  function s(p) {
    return K(p) ? at(e, u)(p) : u(p);
  }
  function u(p) {
    return fi(
      e,
      f,
      // Note: we don’t need to reset the way `markdown-rs` does.
      t,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(p);
  }
  function f(p) {
    return e.attempt(sa, c, c)(p);
  }
  function c(p) {
    return B(p) ? H(e, h, "whitespace")(p) : h(p);
  }
  function h(p) {
    return p === null || F(p) ? (e.exit("definition"), r.parser.defined.push(l), n(p)) : t(p);
  }
}
function ca(e, n, t) {
  return r;
  function r(a) {
    return K(a) ? at(e, l)(a) : t(a);
  }
  function l(a) {
    return hi(e, o, t, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function o(a) {
    return B(a) ? H(e, i, "whitespace")(a) : i(a);
  }
  function i(a) {
    return a === null || F(a) ? n(a) : t(a);
  }
}
const fa = {
  name: "hardBreakEscape",
  tokenize: pa
};
function pa(e, n, t) {
  return r;
  function r(o) {
    return e.enter("hardBreakEscape"), e.consume(o), l;
  }
  function l(o) {
    return F(o) ? (e.exit("hardBreakEscape"), n(o)) : t(o);
  }
}
const ha = {
  name: "headingAtx",
  resolve: da,
  tokenize: ma
};
function da(e, n) {
  let t = e.length - 2, r = 3, l, o;
  return e[r][1].type === "whitespace" && (r += 2), t - 2 > r && e[t][1].type === "whitespace" && (t -= 2), e[t][1].type === "atxHeadingSequence" && (r === t - 1 || t - 4 > r && e[t - 2][1].type === "whitespace") && (t -= r + 1 === t ? 2 : 4), t > r && (l = {
    type: "atxHeadingText",
    start: e[r][1].start,
    end: e[t][1].end
  }, o = {
    type: "chunkText",
    start: e[r][1].start,
    end: e[t][1].end,
    contentType: "text"
  }, xe(e, r, t - r + 1, [["enter", l, n], ["enter", o, n], ["exit", o, n], ["exit", l, n]])), e;
}
function ma(e, n, t) {
  let r = 0;
  return l;
  function l(f) {
    return e.enter("atxHeading"), o(f);
  }
  function o(f) {
    return e.enter("atxHeadingSequence"), i(f);
  }
  function i(f) {
    return f === 35 && r++ < 6 ? (e.consume(f), i) : f === null || K(f) ? (e.exit("atxHeadingSequence"), a(f)) : t(f);
  }
  function a(f) {
    return f === 35 ? (e.enter("atxHeadingSequence"), s(f)) : f === null || F(f) ? (e.exit("atxHeading"), n(f)) : B(f) ? H(e, a, "whitespace")(f) : (e.enter("atxHeadingText"), u(f));
  }
  function s(f) {
    return f === 35 ? (e.consume(f), s) : (e.exit("atxHeadingSequence"), a(f));
  }
  function u(f) {
    return f === null || f === 35 || K(f) ? (e.exit("atxHeadingText"), a(f)) : (e.consume(f), u);
  }
}
const ga = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], er = ["pre", "script", "style", "textarea"], xa = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: ka,
  tokenize: wa
}, ya = {
  partial: !0,
  tokenize: Ca
}, ba = {
  partial: !0,
  tokenize: va
};
function ka(e) {
  let n = e.length;
  for (; n-- && !(e[n][0] === "enter" && e[n][1].type === "htmlFlow"); )
    ;
  return n > 1 && e[n - 2][1].type === "linePrefix" && (e[n][1].start = e[n - 2][1].start, e[n + 1][1].start = e[n - 2][1].start, e.splice(n - 2, 2)), e;
}
function wa(e, n, t) {
  const r = this;
  let l, o, i, a, s;
  return u;
  function u(m) {
    return f(m);
  }
  function f(m) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(m), c;
  }
  function c(m) {
    return m === 33 ? (e.consume(m), h) : m === 47 ? (e.consume(m), o = !0, y) : m === 63 ? (e.consume(m), l = 3, r.interrupt ? n : d) : se(m) ? (e.consume(m), i = String.fromCharCode(m), C) : t(m);
  }
  function h(m) {
    return m === 45 ? (e.consume(m), l = 2, p) : m === 91 ? (e.consume(m), l = 5, a = 0, g) : se(m) ? (e.consume(m), l = 4, r.interrupt ? n : d) : t(m);
  }
  function p(m) {
    return m === 45 ? (e.consume(m), r.interrupt ? n : d) : t(m);
  }
  function g(m) {
    const pe = "CDATA[";
    return m === pe.charCodeAt(a++) ? (e.consume(m), a === pe.length ? r.interrupt ? n : z : g) : t(m);
  }
  function y(m) {
    return se(m) ? (e.consume(m), i = String.fromCharCode(m), C) : t(m);
  }
  function C(m) {
    if (m === null || m === 47 || m === 62 || K(m)) {
      const pe = m === 47, Le = i.toLowerCase();
      return !pe && !o && er.includes(Le) ? (l = 1, r.interrupt ? n(m) : z(m)) : ga.includes(i.toLowerCase()) ? (l = 6, pe ? (e.consume(m), x) : r.interrupt ? n(m) : z(m)) : (l = 7, r.interrupt && !r.parser.lazy[r.now().line] ? t(m) : o ? S(m) : k(m));
    }
    return m === 45 || le(m) ? (e.consume(m), i += String.fromCharCode(m), C) : t(m);
  }
  function x(m) {
    return m === 62 ? (e.consume(m), r.interrupt ? n : z) : t(m);
  }
  function S(m) {
    return B(m) ? (e.consume(m), S) : b(m);
  }
  function k(m) {
    return m === 47 ? (e.consume(m), b) : m === 58 || m === 95 || se(m) ? (e.consume(m), L) : B(m) ? (e.consume(m), k) : b(m);
  }
  function L(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || le(m) ? (e.consume(m), L) : _(m);
  }
  function _(m) {
    return m === 61 ? (e.consume(m), w) : B(m) ? (e.consume(m), _) : k(m);
  }
  function w(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96 ? t(m) : m === 34 || m === 39 ? (e.consume(m), s = m, P) : B(m) ? (e.consume(m), w) : V(m);
  }
  function P(m) {
    return m === s ? (e.consume(m), s = null, U) : m === null || F(m) ? t(m) : (e.consume(m), P);
  }
  function V(m) {
    return m === null || m === 34 || m === 39 || m === 47 || m === 60 || m === 61 || m === 62 || m === 96 || K(m) ? _(m) : (e.consume(m), V);
  }
  function U(m) {
    return m === 47 || m === 62 || B(m) ? k(m) : t(m);
  }
  function b(m) {
    return m === 62 ? (e.consume(m), A) : t(m);
  }
  function A(m) {
    return m === null || F(m) ? z(m) : B(m) ? (e.consume(m), A) : t(m);
  }
  function z(m) {
    return m === 45 && l === 2 ? (e.consume(m), te) : m === 60 && l === 1 ? (e.consume(m), J) : m === 62 && l === 4 ? (e.consume(m), fe) : m === 63 && l === 3 ? (e.consume(m), d) : m === 93 && l === 5 ? (e.consume(m), ye) : F(m) && (l === 6 || l === 7) ? (e.exit("htmlFlowData"), e.check(ya, be, q)(m)) : m === null || F(m) ? (e.exit("htmlFlowData"), q(m)) : (e.consume(m), z);
  }
  function q(m) {
    return e.check(ba, G, be)(m);
  }
  function G(m) {
    return e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), $;
  }
  function $(m) {
    return m === null || F(m) ? q(m) : (e.enter("htmlFlowData"), z(m));
  }
  function te(m) {
    return m === 45 ? (e.consume(m), d) : z(m);
  }
  function J(m) {
    return m === 47 ? (e.consume(m), i = "", re) : z(m);
  }
  function re(m) {
    if (m === 62) {
      const pe = i.toLowerCase();
      return er.includes(pe) ? (e.consume(m), fe) : z(m);
    }
    return se(m) && i.length < 8 ? (e.consume(m), i += String.fromCharCode(m), re) : z(m);
  }
  function ye(m) {
    return m === 93 ? (e.consume(m), d) : z(m);
  }
  function d(m) {
    return m === 62 ? (e.consume(m), fe) : m === 45 && l === 2 ? (e.consume(m), d) : z(m);
  }
  function fe(m) {
    return m === null || F(m) ? (e.exit("htmlFlowData"), be(m)) : (e.consume(m), fe);
  }
  function be(m) {
    return e.exit("htmlFlow"), n(m);
  }
}
function va(e, n, t) {
  const r = this;
  return l;
  function l(i) {
    return F(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), o) : t(i);
  }
  function o(i) {
    return r.parser.lazy[r.now().line] ? t(i) : n(i);
  }
}
function Ca(e, n, t) {
  return r;
  function r(l) {
    return e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), e.attempt(mt, n, t);
  }
}
const Sa = {
  name: "htmlText",
  tokenize: Ea
};
function Ea(e, n, t) {
  const r = this;
  let l, o, i;
  return a;
  function a(d) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(d), s;
  }
  function s(d) {
    return d === 33 ? (e.consume(d), u) : d === 47 ? (e.consume(d), _) : d === 63 ? (e.consume(d), k) : se(d) ? (e.consume(d), V) : t(d);
  }
  function u(d) {
    return d === 45 ? (e.consume(d), f) : d === 91 ? (e.consume(d), o = 0, g) : se(d) ? (e.consume(d), S) : t(d);
  }
  function f(d) {
    return d === 45 ? (e.consume(d), p) : t(d);
  }
  function c(d) {
    return d === null ? t(d) : d === 45 ? (e.consume(d), h) : F(d) ? (i = c, J(d)) : (e.consume(d), c);
  }
  function h(d) {
    return d === 45 ? (e.consume(d), p) : c(d);
  }
  function p(d) {
    return d === 62 ? te(d) : d === 45 ? h(d) : c(d);
  }
  function g(d) {
    const fe = "CDATA[";
    return d === fe.charCodeAt(o++) ? (e.consume(d), o === fe.length ? y : g) : t(d);
  }
  function y(d) {
    return d === null ? t(d) : d === 93 ? (e.consume(d), C) : F(d) ? (i = y, J(d)) : (e.consume(d), y);
  }
  function C(d) {
    return d === 93 ? (e.consume(d), x) : y(d);
  }
  function x(d) {
    return d === 62 ? te(d) : d === 93 ? (e.consume(d), x) : y(d);
  }
  function S(d) {
    return d === null || d === 62 ? te(d) : F(d) ? (i = S, J(d)) : (e.consume(d), S);
  }
  function k(d) {
    return d === null ? t(d) : d === 63 ? (e.consume(d), L) : F(d) ? (i = k, J(d)) : (e.consume(d), k);
  }
  function L(d) {
    return d === 62 ? te(d) : k(d);
  }
  function _(d) {
    return se(d) ? (e.consume(d), w) : t(d);
  }
  function w(d) {
    return d === 45 || le(d) ? (e.consume(d), w) : P(d);
  }
  function P(d) {
    return F(d) ? (i = P, J(d)) : B(d) ? (e.consume(d), P) : te(d);
  }
  function V(d) {
    return d === 45 || le(d) ? (e.consume(d), V) : d === 47 || d === 62 || K(d) ? U(d) : t(d);
  }
  function U(d) {
    return d === 47 ? (e.consume(d), te) : d === 58 || d === 95 || se(d) ? (e.consume(d), b) : F(d) ? (i = U, J(d)) : B(d) ? (e.consume(d), U) : te(d);
  }
  function b(d) {
    return d === 45 || d === 46 || d === 58 || d === 95 || le(d) ? (e.consume(d), b) : A(d);
  }
  function A(d) {
    return d === 61 ? (e.consume(d), z) : F(d) ? (i = A, J(d)) : B(d) ? (e.consume(d), A) : U(d);
  }
  function z(d) {
    return d === null || d === 60 || d === 61 || d === 62 || d === 96 ? t(d) : d === 34 || d === 39 ? (e.consume(d), l = d, q) : F(d) ? (i = z, J(d)) : B(d) ? (e.consume(d), z) : (e.consume(d), G);
  }
  function q(d) {
    return d === l ? (e.consume(d), l = void 0, $) : d === null ? t(d) : F(d) ? (i = q, J(d)) : (e.consume(d), q);
  }
  function G(d) {
    return d === null || d === 34 || d === 39 || d === 60 || d === 61 || d === 96 ? t(d) : d === 47 || d === 62 || K(d) ? U(d) : (e.consume(d), G);
  }
  function $(d) {
    return d === 47 || d === 62 || K(d) ? U(d) : t(d);
  }
  function te(d) {
    return d === 62 ? (e.consume(d), e.exit("htmlTextData"), e.exit("htmlText"), n) : t(d);
  }
  function J(d) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), re;
  }
  function re(d) {
    return B(d) ? H(e, ye, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(d) : ye(d);
  }
  function ye(d) {
    return e.enter("htmlTextData"), i(d);
  }
}
const In = {
  name: "labelEnd",
  resolveAll: Pa,
  resolveTo: za,
  tokenize: La
}, Ia = {
  tokenize: Da
}, Ta = {
  tokenize: Fa
}, Aa = {
  tokenize: Na
};
function Pa(e) {
  let n = -1;
  const t = [];
  for (; ++n < e.length; ) {
    const r = e[n][1];
    if (t.push(e[n]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const l = r.type === "labelImage" ? 4 : 2;
      r.type = "data", n += l;
    }
  }
  return e.length !== t.length && xe(e, 0, e.length, t), e;
}
function za(e, n) {
  let t = e.length, r = 0, l, o, i, a;
  for (; t--; )
    if (l = e[t][1], o) {
      if (l.type === "link" || l.type === "labelLink" && l._inactive)
        break;
      e[t][0] === "enter" && l.type === "labelLink" && (l._inactive = !0);
    } else if (i) {
      if (e[t][0] === "enter" && (l.type === "labelImage" || l.type === "labelLink") && !l._balanced && (o = t, l.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else l.type === "labelEnd" && (i = t);
  const s = {
    type: e[o][1].type === "labelLink" ? "link" : "image",
    start: {
      ...e[o][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  }, u = {
    type: "label",
    start: {
      ...e[o][1].start
    },
    end: {
      ...e[i][1].end
    }
  }, f = {
    type: "labelText",
    start: {
      ...e[o + r + 2][1].end
    },
    end: {
      ...e[i - 2][1].start
    }
  };
  return a = [["enter", s, n], ["enter", u, n]], a = Ce(a, e.slice(o + 1, o + r + 3)), a = Ce(a, [["enter", f, n]]), a = Ce(a, Ft(n.parser.constructs.insideSpan.null, e.slice(o + r + 4, i - 3), n)), a = Ce(a, [["exit", f, n], e[i - 2], e[i - 1], ["exit", u, n]]), a = Ce(a, e.slice(i + 1)), a = Ce(a, [["exit", s, n]]), xe(e, o, e.length, a), e;
}
function La(e, n, t) {
  const r = this;
  let l = r.events.length, o, i;
  for (; l--; )
    if ((r.events[l][1].type === "labelImage" || r.events[l][1].type === "labelLink") && !r.events[l][1]._balanced) {
      o = r.events[l][1];
      break;
    }
  return a;
  function a(h) {
    return o ? o._inactive ? c(h) : (i = r.parser.defined.includes(Ie(r.sliceSerialize({
      start: o.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(h), e.exit("labelMarker"), e.exit("labelEnd"), s) : t(h);
  }
  function s(h) {
    return h === 40 ? e.attempt(Ia, f, i ? f : c)(h) : h === 91 ? e.attempt(Ta, f, i ? u : c)(h) : i ? f(h) : c(h);
  }
  function u(h) {
    return e.attempt(Aa, f, c)(h);
  }
  function f(h) {
    return n(h);
  }
  function c(h) {
    return o._balanced = !0, t(h);
  }
}
function Da(e, n, t) {
  return r;
  function r(c) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(c), e.exit("resourceMarker"), l;
  }
  function l(c) {
    return K(c) ? at(e, o)(c) : o(c);
  }
  function o(c) {
    return c === 41 ? f(c) : fi(e, i, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(c);
  }
  function i(c) {
    return K(c) ? at(e, s)(c) : f(c);
  }
  function a(c) {
    return t(c);
  }
  function s(c) {
    return c === 34 || c === 39 || c === 40 ? hi(e, u, t, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(c) : f(c);
  }
  function u(c) {
    return K(c) ? at(e, f)(c) : f(c);
  }
  function f(c) {
    return c === 41 ? (e.enter("resourceMarker"), e.consume(c), e.exit("resourceMarker"), e.exit("resource"), n) : t(c);
  }
}
function Fa(e, n, t) {
  const r = this;
  return l;
  function l(a) {
    return pi.call(r, e, o, i, "reference", "referenceMarker", "referenceString")(a);
  }
  function o(a) {
    return r.parser.defined.includes(Ie(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? n(a) : t(a);
  }
  function i(a) {
    return t(a);
  }
}
function Na(e, n, t) {
  return r;
  function r(o) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(o), e.exit("referenceMarker"), l;
  }
  function l(o) {
    return o === 93 ? (e.enter("referenceMarker"), e.consume(o), e.exit("referenceMarker"), e.exit("reference"), n) : t(o);
  }
}
const _a = {
  name: "labelStartImage",
  resolveAll: In.resolveAll,
  tokenize: Ra
};
function Ra(e, n, t) {
  const r = this;
  return l;
  function l(a) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(a), e.exit("labelImageMarker"), o;
  }
  function o(a) {
    return a === 91 ? (e.enter("labelMarker"), e.consume(a), e.exit("labelMarker"), e.exit("labelImage"), i) : t(a);
  }
  function i(a) {
    return a === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(a) : n(a);
  }
}
const Oa = {
  name: "labelStartLink",
  resolveAll: In.resolveAll,
  tokenize: Ma
};
function Ma(e, n, t) {
  const r = this;
  return l;
  function l(i) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(i), e.exit("labelMarker"), e.exit("labelLink"), o;
  }
  function o(i) {
    return i === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(i) : n(i);
  }
}
const Ht = {
  name: "lineEnding",
  tokenize: Ba
};
function Ba(e, n) {
  return t;
  function t(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), H(e, n, "linePrefix");
  }
}
const St = {
  name: "thematicBreak",
  tokenize: $a
};
function $a(e, n, t) {
  let r = 0, l;
  return o;
  function o(u) {
    return e.enter("thematicBreak"), i(u);
  }
  function i(u) {
    return l = u, a(u);
  }
  function a(u) {
    return u === l ? (e.enter("thematicBreakSequence"), s(u)) : r >= 3 && (u === null || F(u)) ? (e.exit("thematicBreak"), n(u)) : t(u);
  }
  function s(u) {
    return u === l ? (e.consume(u), r++, s) : (e.exit("thematicBreakSequence"), B(u) ? H(e, a, "whitespace")(u) : a(u));
  }
}
const ue = {
  continuation: {
    tokenize: Va
  },
  exit: Wa,
  name: "list",
  tokenize: Ua
}, ja = {
  partial: !0,
  tokenize: Ya
}, Ha = {
  partial: !0,
  tokenize: qa
};
function Ua(e, n, t) {
  const r = this, l = r.events[r.events.length - 1];
  let o = l && l[1].type === "linePrefix" ? l[2].sliceSerialize(l[1], !0).length : 0, i = 0;
  return a;
  function a(p) {
    const g = r.containerState.type || (p === 42 || p === 43 || p === 45 ? "listUnordered" : "listOrdered");
    if (g === "listUnordered" ? !r.containerState.marker || p === r.containerState.marker : sn(p)) {
      if (r.containerState.type || (r.containerState.type = g, e.enter(g, {
        _container: !0
      })), g === "listUnordered")
        return e.enter("listItemPrefix"), p === 42 || p === 45 ? e.check(St, t, u)(p) : u(p);
      if (!r.interrupt || p === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), s(p);
    }
    return t(p);
  }
  function s(p) {
    return sn(p) && ++i < 10 ? (e.consume(p), s) : (!r.interrupt || i < 2) && (r.containerState.marker ? p === r.containerState.marker : p === 41 || p === 46) ? (e.exit("listItemValue"), u(p)) : t(p);
  }
  function u(p) {
    return e.enter("listItemMarker"), e.consume(p), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || p, e.check(
      mt,
      // Can’t be empty when interrupting.
      r.interrupt ? t : f,
      e.attempt(ja, h, c)
    );
  }
  function f(p) {
    return r.containerState.initialBlankLine = !0, o++, h(p);
  }
  function c(p) {
    return B(p) ? (e.enter("listItemPrefixWhitespace"), e.consume(p), e.exit("listItemPrefixWhitespace"), h) : t(p);
  }
  function h(p) {
    return r.containerState.size = o + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, n(p);
  }
}
function Va(e, n, t) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(mt, l, o);
  function l(a) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, H(e, n, "listItemIndent", r.containerState.size + 1)(a);
  }
  function o(a) {
    return r.containerState.furtherBlankLines || !B(a) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, i(a)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(Ha, n, i)(a));
  }
  function i(a) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, H(e, e.attempt(ue, n, t), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a);
  }
}
function qa(e, n, t) {
  const r = this;
  return H(e, l, "listItemIndent", r.containerState.size + 1);
  function l(o) {
    const i = r.events[r.events.length - 1];
    return i && i[1].type === "listItemIndent" && i[2].sliceSerialize(i[1], !0).length === r.containerState.size ? n(o) : t(o);
  }
}
function Wa(e) {
  e.exit(this.containerState.type);
}
function Ya(e, n, t) {
  const r = this;
  return H(e, l, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function l(o) {
    const i = r.events[r.events.length - 1];
    return !B(o) && i && i[1].type === "listItemPrefixWhitespace" ? n(o) : t(o);
  }
}
const tr = {
  name: "setextUnderline",
  resolveTo: Qa,
  tokenize: Xa
};
function Qa(e, n) {
  let t = e.length, r, l, o;
  for (; t--; )
    if (e[t][0] === "enter") {
      if (e[t][1].type === "content") {
        r = t;
        break;
      }
      e[t][1].type === "paragraph" && (l = t);
    } else
      e[t][1].type === "content" && e.splice(t, 1), !o && e[t][1].type === "definition" && (o = t);
  const i = {
    type: "setextHeading",
    start: {
      ...e[r][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  };
  return e[l][1].type = "setextHeadingText", o ? (e.splice(l, 0, ["enter", i, n]), e.splice(o + 1, 0, ["exit", e[r][1], n]), e[r][1].end = {
    ...e[o][1].end
  }) : e[r][1] = i, e.push(["exit", i, n]), e;
}
function Xa(e, n, t) {
  const r = this;
  let l;
  return o;
  function o(u) {
    let f = r.events.length, c;
    for (; f--; )
      if (r.events[f][1].type !== "lineEnding" && r.events[f][1].type !== "linePrefix" && r.events[f][1].type !== "content") {
        c = r.events[f][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || c) ? (e.enter("setextHeadingLine"), l = u, i(u)) : t(u);
  }
  function i(u) {
    return e.enter("setextHeadingLineSequence"), a(u);
  }
  function a(u) {
    return u === l ? (e.consume(u), a) : (e.exit("setextHeadingLineSequence"), B(u) ? H(e, s, "lineSuffix")(u) : s(u));
  }
  function s(u) {
    return u === null || F(u) ? (e.exit("setextHeadingLine"), n(u)) : t(u);
  }
}
const Ka = {
  tokenize: Ga
};
function Ga(e) {
  const n = this, t = e.attempt(
    // Try to parse a blank line.
    mt,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, l, H(e, e.attempt(this.parser.constructs.flow, l, e.attempt(na, l)), "linePrefix"))
  );
  return t;
  function r(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return e.enter("lineEndingBlank"), e.consume(o), e.exit("lineEndingBlank"), n.currentConstruct = void 0, t;
  }
  function l(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), n.currentConstruct = void 0, t;
  }
}
const Ja = {
  resolveAll: mi()
}, Za = di("string"), es = di("text");
function di(e) {
  return {
    resolveAll: mi(e === "text" ? ts : void 0),
    tokenize: n
  };
  function n(t) {
    const r = this, l = this.parser.constructs[e], o = t.attempt(l, i, a);
    return i;
    function i(f) {
      return u(f) ? o(f) : a(f);
    }
    function a(f) {
      if (f === null) {
        t.consume(f);
        return;
      }
      return t.enter("data"), t.consume(f), s;
    }
    function s(f) {
      return u(f) ? (t.exit("data"), o(f)) : (t.consume(f), s);
    }
    function u(f) {
      if (f === null)
        return !0;
      const c = l[f];
      let h = -1;
      if (c)
        for (; ++h < c.length; ) {
          const p = c[h];
          if (!p.previous || p.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function mi(e) {
  return n;
  function n(t, r) {
    let l = -1, o;
    for (; ++l <= t.length; )
      o === void 0 ? t[l] && t[l][1].type === "data" && (o = l, l++) : (!t[l] || t[l][1].type !== "data") && (l !== o + 2 && (t[o][1].end = t[l - 1][1].end, t.splice(o + 2, l - o - 2), l = o + 2), o = void 0);
    return e ? e(t, r) : t;
  }
}
function ts(e, n) {
  let t = 0;
  for (; ++t <= e.length; )
    if ((t === e.length || e[t][1].type === "lineEnding") && e[t - 1][1].type === "data") {
      const r = e[t - 1][1], l = n.sliceStream(r);
      let o = l.length, i = -1, a = 0, s;
      for (; o--; ) {
        const u = l[o];
        if (typeof u == "string") {
          for (i = u.length; u.charCodeAt(i - 1) === 32; )
            a++, i--;
          if (i) break;
          i = -1;
        } else if (u === -2)
          s = !0, a++;
        else if (u !== -1) {
          o++;
          break;
        }
      }
      if (n._contentTypeTextTrailing && t === e.length && (a = 0), a) {
        const u = {
          type: t === e.length || s || a < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            _bufferIndex: o ? i : r.start._bufferIndex + i,
            _index: r.start._index + o,
            line: r.end.line,
            column: r.end.column - a,
            offset: r.end.offset - a
          },
          end: {
            ...r.end
          }
        };
        r.end = {
          ...u.start
        }, r.start.offset === r.end.offset ? Object.assign(r, u) : (e.splice(t, 0, ["enter", u, n], ["exit", u, n]), t += 2);
      }
      t++;
    }
  return e;
}
const ns = {
  42: ue,
  43: ue,
  45: ue,
  48: ue,
  49: ue,
  50: ue,
  51: ue,
  52: ue,
  53: ue,
  54: ue,
  55: ue,
  56: ue,
  57: ue,
  62: ai
}, rs = {
  91: aa
}, is = {
  [-2]: jt,
  [-1]: jt,
  32: jt
}, ls = {
  35: ha,
  42: St,
  45: [tr, St],
  60: xa,
  61: tr,
  95: St,
  96: Zn,
  126: Zn
}, os = {
  38: ui,
  92: si
}, as = {
  [-5]: Ht,
  [-4]: Ht,
  [-3]: Ht,
  33: _a,
  38: ui,
  42: un,
  60: [Oo, Sa],
  91: Oa,
  92: [fa, si],
  93: In,
  95: un,
  96: Ko
}, ss = {
  null: [un, Ja]
}, us = {
  null: [42, 95]
}, cs = {
  null: []
}, fs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: us,
  contentInitial: rs,
  disable: cs,
  document: ns,
  flow: ls,
  flowInitial: is,
  insideSpan: ss,
  string: os,
  text: as
}, Symbol.toStringTag, { value: "Module" }));
function ps(e, n, t) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: t && t.line || 1,
    column: t && t.column || 1,
    offset: t && t.offset || 0
  };
  const l = {}, o = [];
  let i = [], a = [];
  const s = {
    attempt: P(_),
    check: P(w),
    consume: S,
    enter: k,
    exit: L,
    interrupt: P(w, {
      interrupt: !0
    })
  }, u = {
    code: null,
    containerState: {},
    defineSkip: y,
    events: [],
    now: g,
    parser: e,
    previous: null,
    sliceSerialize: h,
    sliceStream: p,
    write: c
  };
  let f = n.tokenize.call(u, s);
  return n.resolveAll && o.push(n), u;
  function c(A) {
    return i = Ce(i, A), C(), i[i.length - 1] !== null ? [] : (V(n, 0), u.events = Ft(o, u.events, u), u.events);
  }
  function h(A, z) {
    return ds(p(A), z);
  }
  function p(A) {
    return hs(i, A);
  }
  function g() {
    const {
      _bufferIndex: A,
      _index: z,
      line: q,
      column: G,
      offset: $
    } = r;
    return {
      _bufferIndex: A,
      _index: z,
      line: q,
      column: G,
      offset: $
    };
  }
  function y(A) {
    l[A.line] = A.column, b();
  }
  function C() {
    let A;
    for (; r._index < i.length; ) {
      const z = i[r._index];
      if (typeof z == "string")
        for (A = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === A && r._bufferIndex < z.length; )
          x(z.charCodeAt(r._bufferIndex));
      else
        x(z);
    }
  }
  function x(A) {
    f = f(A);
  }
  function S(A) {
    F(A) ? (r.line++, r.column = 1, r.offset += A === -3 ? 2 : 1, b()) : A !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    i[r._index].length && (r._bufferIndex = -1, r._index++)), u.previous = A;
  }
  function k(A, z) {
    const q = z || {};
    return q.type = A, q.start = g(), u.events.push(["enter", q, u]), a.push(q), q;
  }
  function L(A) {
    const z = a.pop();
    return z.end = g(), u.events.push(["exit", z, u]), z;
  }
  function _(A, z) {
    V(A, z.from);
  }
  function w(A, z) {
    z.restore();
  }
  function P(A, z) {
    return q;
    function q(G, $, te) {
      let J, re, ye, d;
      return Array.isArray(G) ? (
        /* c8 ignore next 1 */
        be(G)
      ) : "tokenize" in G ? (
        // Looks like a construct.
        be([
          /** @type {Construct} */
          G
        ])
      ) : fe(G);
      function fe(ne) {
        return _e;
        function _e(he) {
          const Re = he !== null && ne[he], Oe = he !== null && ne.null, D = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(Re) ? Re : Re ? [Re] : [],
            ...Array.isArray(Oe) ? Oe : Oe ? [Oe] : []
          ];
          return be(D)(he);
        }
      }
      function be(ne) {
        return J = ne, re = 0, ne.length === 0 ? te : m(ne[re]);
      }
      function m(ne) {
        return _e;
        function _e(he) {
          return d = U(), ye = ne, ne.partial || (u.currentConstruct = ne), ne.name && u.parser.constructs.disable.null.includes(ne.name) ? Le() : ne.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            z ? Object.assign(Object.create(u), z) : u,
            s,
            pe,
            Le
          )(he);
        }
      }
      function pe(ne) {
        return A(ye, d), $;
      }
      function Le(ne) {
        return d.restore(), ++re < J.length ? m(J[re]) : te;
      }
    }
  }
  function V(A, z) {
    A.resolveAll && !o.includes(A) && o.push(A), A.resolve && xe(u.events, z, u.events.length - z, A.resolve(u.events.slice(z), u)), A.resolveTo && (u.events = A.resolveTo(u.events, u));
  }
  function U() {
    const A = g(), z = u.previous, q = u.currentConstruct, G = u.events.length, $ = Array.from(a);
    return {
      from: G,
      restore: te
    };
    function te() {
      r = A, u.previous = z, u.currentConstruct = q, u.events.length = G, a = $, b();
    }
  }
  function b() {
    r.line in l && r.column < 2 && (r.column = l[r.line], r.offset += l[r.line] - 1);
  }
}
function hs(e, n) {
  const t = n.start._index, r = n.start._bufferIndex, l = n.end._index, o = n.end._bufferIndex;
  let i;
  if (t === l)
    i = [e[t].slice(r, o)];
  else {
    if (i = e.slice(t, l), r > -1) {
      const a = i[0];
      typeof a == "string" ? i[0] = a.slice(r) : i.shift();
    }
    o > 0 && i.push(e[l].slice(0, o));
  }
  return i;
}
function ds(e, n) {
  let t = -1;
  const r = [];
  let l;
  for (; ++t < e.length; ) {
    const o = e[t];
    let i;
    if (typeof o == "string")
      i = o;
    else switch (o) {
      case -5: {
        i = "\r";
        break;
      }
      case -4: {
        i = `
`;
        break;
      }
      case -3: {
        i = `\r
`;
        break;
      }
      case -2: {
        i = n ? " " : "	";
        break;
      }
      case -1: {
        if (!n && l) continue;
        i = " ";
        break;
      }
      default:
        i = String.fromCharCode(o);
    }
    l = o === -2, r.push(i);
  }
  return r.join("");
}
function ms(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      li([fs, ...(e || {}).extensions || []])
    ),
    content: l(zo),
    defined: [],
    document: l(Do),
    flow: l(Ka),
    lazy: {},
    string: l(Za),
    text: l(es)
  };
  return r;
  function l(o) {
    return i;
    function i(a) {
      return ps(r, o, a);
    }
  }
}
function gs(e) {
  for (; !ci(e); )
    ;
  return e;
}
const nr = /[\0\t\n\r]/g;
function xs() {
  let e = 1, n = "", t = !0, r;
  return l;
  function l(o, i, a) {
    const s = [];
    let u, f, c, h, p;
    for (o = n + (typeof o == "string" ? o.toString() : new TextDecoder(i || void 0).decode(o)), c = 0, n = "", t && (o.charCodeAt(0) === 65279 && c++, t = void 0); c < o.length; ) {
      if (nr.lastIndex = c, u = nr.exec(o), h = u && u.index !== void 0 ? u.index : o.length, p = o.charCodeAt(h), !u) {
        n = o.slice(c);
        break;
      }
      if (p === 10 && c === h && r)
        s.push(-3), r = void 0;
      else
        switch (r && (s.push(-5), r = void 0), c < h && (s.push(o.slice(c, h)), e += h - c), p) {
          case 0: {
            s.push(65533), e++;
            break;
          }
          case 9: {
            for (f = Math.ceil(e / 4) * 4, s.push(-2); e++ < f; ) s.push(-1);
            break;
          }
          case 10: {
            s.push(-4), e = 1;
            break;
          }
          default:
            r = !0, e = 1;
        }
      c = h + 1;
    }
    return a && (r && s.push(-5), n && s.push(n), s.push(null)), s;
  }
}
const ys = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function bs(e) {
  return e.replace(ys, ks);
}
function ks(e, n, t) {
  if (n)
    return n;
  if (t.charCodeAt(0) === 35) {
    const l = t.charCodeAt(1), o = l === 120 || l === 88;
    return oi(t.slice(o ? 2 : 1), o ? 16 : 10);
  }
  return En(t) || e;
}
const gi = {}.hasOwnProperty;
function ws(e, n, t) {
  return n && typeof n == "object" && (t = n, n = void 0), vs(t)(gs(ms(t).document().write(xs()(e, n, !0))));
}
function vs(e) {
  const n = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: o(Me),
      autolinkProtocol: U,
      autolinkEmail: U,
      atxHeading: o(ie),
      blockQuote: o(Oe),
      characterEscape: U,
      characterReference: U,
      codeFenced: o(D),
      codeFencedFenceInfo: i,
      codeFencedFenceMeta: i,
      codeIndented: o(D, i),
      codeText: o(W, i),
      codeTextData: U,
      data: U,
      codeFlowValue: U,
      definition: o(Y),
      definitionDestinationString: i,
      definitionLabelString: i,
      definitionTitleString: i,
      emphasis: o(M),
      hardBreakEscape: o(ae),
      hardBreakTrailing: o(ae),
      htmlFlow: o(de, i),
      htmlFlowData: U,
      htmlText: o(de, i),
      htmlTextData: U,
      image: o(ke),
      label: i,
      link: o(Me),
      listItem: o(Ot),
      listItemValue: h,
      listOrdered: o(yt, c),
      listUnordered: o(yt),
      paragraph: o(bt),
      reference: m,
      referenceString: i,
      resourceDestinationString: i,
      resourceTitleString: i,
      setextHeading: o(ie),
      strong: o(et),
      thematicBreak: o(Se)
    },
    exit: {
      atxHeading: s(),
      atxHeadingSequence: _,
      autolink: s(),
      autolinkEmail: Re,
      autolinkProtocol: he,
      blockQuote: s(),
      characterEscapeValue: b,
      characterReferenceMarkerHexadecimal: Le,
      characterReferenceMarkerNumeric: Le,
      characterReferenceValue: ne,
      characterReference: _e,
      codeFenced: s(C),
      codeFencedFence: y,
      codeFencedFenceInfo: p,
      codeFencedFenceMeta: g,
      codeFlowValue: b,
      codeIndented: s(x),
      codeText: s($),
      codeTextData: b,
      data: b,
      definition: s(),
      definitionDestinationString: L,
      definitionLabelString: S,
      definitionTitleString: k,
      emphasis: s(),
      hardBreakEscape: s(z),
      hardBreakTrailing: s(z),
      htmlFlow: s(q),
      htmlFlowData: b,
      htmlText: s(G),
      htmlTextData: b,
      image: s(J),
      label: ye,
      labelText: re,
      lineEnding: A,
      link: s(te),
      listItem: s(),
      listOrdered: s(),
      listUnordered: s(),
      paragraph: s(),
      referenceString: pe,
      resourceDestinationString: d,
      resourceTitleString: fe,
      resource: be,
      setextHeading: s(V),
      setextHeadingLineSequence: P,
      setextHeadingText: w,
      strong: s(),
      thematicBreak: s()
    }
  };
  xi(n, (e || {}).mdastExtensions || []);
  const t = {};
  return r;
  function r(v) {
    let T = {
      type: "root",
      children: []
    };
    const O = {
      stack: [T],
      tokenStack: [],
      config: n,
      enter: a,
      exit: u,
      buffer: i,
      resume: f,
      data: t
    }, j = [];
    let Q = -1;
    for (; ++Q < v.length; )
      if (v[Q][1].type === "listOrdered" || v[Q][1].type === "listUnordered")
        if (v[Q][0] === "enter")
          j.push(Q);
        else {
          const Ee = j.pop();
          Q = l(v, Ee, Q);
        }
    for (Q = -1; ++Q < v.length; ) {
      const Ee = n[v[Q][0]];
      gi.call(Ee, v[Q][1].type) && Ee[v[Q][1].type].call(Object.assign({
        sliceSerialize: v[Q][2].sliceSerialize
      }, O), v[Q][1]);
    }
    if (O.tokenStack.length > 0) {
      const Ee = O.tokenStack[O.tokenStack.length - 1];
      (Ee[1] || rr).call(O, void 0, Ee[0]);
    }
    for (T.position = {
      start: Be(v.length > 0 ? v[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: Be(v.length > 0 ? v[v.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, Q = -1; ++Q < n.transforms.length; )
      T = n.transforms[Q](T) || T;
    return T;
  }
  function l(v, T, O) {
    let j = T - 1, Q = -1, Ee = !1, je, De, tt, nt;
    for (; ++j <= O; ) {
      const me = v[j];
      switch (me[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          me[0] === "enter" ? Q++ : Q--, nt = void 0;
          break;
        }
        case "lineEndingBlank": {
          me[0] === "enter" && (je && !nt && !Q && !tt && (tt = j), nt = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          nt = void 0;
      }
      if (!Q && me[0] === "enter" && me[1].type === "listItemPrefix" || Q === -1 && me[0] === "exit" && (me[1].type === "listUnordered" || me[1].type === "listOrdered")) {
        if (je) {
          let Qe = j;
          for (De = void 0; Qe--; ) {
            const Fe = v[Qe];
            if (Fe[1].type === "lineEnding" || Fe[1].type === "lineEndingBlank") {
              if (Fe[0] === "exit") continue;
              De && (v[De][1].type = "lineEndingBlank", Ee = !0), Fe[1].type = "lineEnding", De = Qe;
            } else if (!(Fe[1].type === "linePrefix" || Fe[1].type === "blockQuotePrefix" || Fe[1].type === "blockQuotePrefixWhitespace" || Fe[1].type === "blockQuoteMarker" || Fe[1].type === "listItemIndent")) break;
          }
          tt && (!De || tt < De) && (je._spread = !0), je.end = Object.assign({}, De ? v[De][1].start : me[1].end), v.splice(De || j, 0, ["exit", je, me[2]]), j++, O++;
        }
        if (me[1].type === "listItemPrefix") {
          const Qe = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, me[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          je = Qe, v.splice(j, 0, ["enter", Qe, me[2]]), j++, O++, tt = void 0, nt = !0;
        }
      }
    }
    return v[T][1]._spread = Ee, O;
  }
  function o(v, T) {
    return O;
    function O(j) {
      a.call(this, v(j), j), T && T.call(this, j);
    }
  }
  function i() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function a(v, T, O) {
    this.stack[this.stack.length - 1].children.push(v), this.stack.push(v), this.tokenStack.push([T, O || void 0]), v.position = {
      start: Be(T.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function s(v) {
    return T;
    function T(O) {
      v && v.call(this, O), u.call(this, O);
    }
  }
  function u(v, T) {
    const O = this.stack.pop(), j = this.tokenStack.pop();
    if (j)
      j[0].type !== v.type && (T ? T.call(this, v, j[0]) : (j[1] || rr).call(this, v, j[0]));
    else throw new Error("Cannot close `" + v.type + "` (" + ot({
      start: v.start,
      end: v.end
    }) + "): it’s not open");
    O.position.end = Be(v.end);
  }
  function f() {
    return Sn(this.stack.pop());
  }
  function c() {
    this.data.expectingFirstListItemValue = !0;
  }
  function h(v) {
    if (this.data.expectingFirstListItemValue) {
      const T = this.stack[this.stack.length - 2];
      T.start = Number.parseInt(this.sliceSerialize(v), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function p() {
    const v = this.resume(), T = this.stack[this.stack.length - 1];
    T.lang = v;
  }
  function g() {
    const v = this.resume(), T = this.stack[this.stack.length - 1];
    T.meta = v;
  }
  function y() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function C() {
    const v = this.resume(), T = this.stack[this.stack.length - 1];
    T.value = v.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function x() {
    const v = this.resume(), T = this.stack[this.stack.length - 1];
    T.value = v.replace(/(\r?\n|\r)$/g, "");
  }
  function S(v) {
    const T = this.resume(), O = this.stack[this.stack.length - 1];
    O.label = T, O.identifier = Ie(this.sliceSerialize(v)).toLowerCase();
  }
  function k() {
    const v = this.resume(), T = this.stack[this.stack.length - 1];
    T.title = v;
  }
  function L() {
    const v = this.resume(), T = this.stack[this.stack.length - 1];
    T.url = v;
  }
  function _(v) {
    const T = this.stack[this.stack.length - 1];
    if (!T.depth) {
      const O = this.sliceSerialize(v).length;
      T.depth = O;
    }
  }
  function w() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function P(v) {
    const T = this.stack[this.stack.length - 1];
    T.depth = this.sliceSerialize(v).codePointAt(0) === 61 ? 1 : 2;
  }
  function V() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function U(v) {
    const O = this.stack[this.stack.length - 1].children;
    let j = O[O.length - 1];
    (!j || j.type !== "text") && (j = we(), j.position = {
      start: Be(v.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, O.push(j)), this.stack.push(j);
  }
  function b(v) {
    const T = this.stack.pop();
    T.value += this.sliceSerialize(v), T.position.end = Be(v.end);
  }
  function A(v) {
    const T = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const O = T.children[T.children.length - 1];
      O.position.end = Be(v.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && n.canContainEols.includes(T.type) && (U.call(this, v), b.call(this, v));
  }
  function z() {
    this.data.atHardBreak = !0;
  }
  function q() {
    const v = this.resume(), T = this.stack[this.stack.length - 1];
    T.value = v;
  }
  function G() {
    const v = this.resume(), T = this.stack[this.stack.length - 1];
    T.value = v;
  }
  function $() {
    const v = this.resume(), T = this.stack[this.stack.length - 1];
    T.value = v;
  }
  function te() {
    const v = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const T = this.data.referenceType || "shortcut";
      v.type += "Reference", v.referenceType = T, delete v.url, delete v.title;
    } else
      delete v.identifier, delete v.label;
    this.data.referenceType = void 0;
  }
  function J() {
    const v = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const T = this.data.referenceType || "shortcut";
      v.type += "Reference", v.referenceType = T, delete v.url, delete v.title;
    } else
      delete v.identifier, delete v.label;
    this.data.referenceType = void 0;
  }
  function re(v) {
    const T = this.sliceSerialize(v), O = this.stack[this.stack.length - 2];
    O.label = bs(T), O.identifier = Ie(T).toLowerCase();
  }
  function ye() {
    const v = this.stack[this.stack.length - 1], T = this.resume(), O = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, O.type === "link") {
      const j = v.children;
      O.children = j;
    } else
      O.alt = T;
  }
  function d() {
    const v = this.resume(), T = this.stack[this.stack.length - 1];
    T.url = v;
  }
  function fe() {
    const v = this.resume(), T = this.stack[this.stack.length - 1];
    T.title = v;
  }
  function be() {
    this.data.inReference = void 0;
  }
  function m() {
    this.data.referenceType = "collapsed";
  }
  function pe(v) {
    const T = this.resume(), O = this.stack[this.stack.length - 1];
    O.label = T, O.identifier = Ie(this.sliceSerialize(v)).toLowerCase(), this.data.referenceType = "full";
  }
  function Le(v) {
    this.data.characterReferenceType = v.type;
  }
  function ne(v) {
    const T = this.sliceSerialize(v), O = this.data.characterReferenceType;
    let j;
    O ? (j = oi(T, O === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : j = En(T);
    const Q = this.stack[this.stack.length - 1];
    Q.value += j;
  }
  function _e(v) {
    const T = this.stack.pop();
    T.position.end = Be(v.end);
  }
  function he(v) {
    b.call(this, v);
    const T = this.stack[this.stack.length - 1];
    T.url = this.sliceSerialize(v);
  }
  function Re(v) {
    b.call(this, v);
    const T = this.stack[this.stack.length - 1];
    T.url = "mailto:" + this.sliceSerialize(v);
  }
  function Oe() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function D() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function W() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function Y() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function M() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function ie() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function ae() {
    return {
      type: "break"
    };
  }
  function de() {
    return {
      type: "html",
      value: ""
    };
  }
  function ke() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function Me() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function yt(v) {
    return {
      type: "list",
      ordered: v.type === "listOrdered",
      start: null,
      spread: v._spread,
      children: []
    };
  }
  function Ot(v) {
    return {
      type: "listItem",
      spread: v._spread,
      checked: null,
      children: []
    };
  }
  function bt() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function et() {
    return {
      type: "strong",
      children: []
    };
  }
  function we() {
    return {
      type: "text",
      value: ""
    };
  }
  function Se() {
    return {
      type: "thematicBreak"
    };
  }
}
function Be(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function xi(e, n) {
  let t = -1;
  for (; ++t < n.length; ) {
    const r = n[t];
    Array.isArray(r) ? xi(e, r) : Cs(e, r);
  }
}
function Cs(e, n) {
  let t;
  for (t in n)
    if (gi.call(n, t))
      switch (t) {
        case "canContainEols": {
          const r = n[t];
          r && e[t].push(...r);
          break;
        }
        case "transforms": {
          const r = n[t];
          r && e[t].push(...r);
          break;
        }
        case "enter":
        case "exit": {
          const r = n[t];
          r && Object.assign(e[t], r);
          break;
        }
      }
}
function rr(e, n) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + ot({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + n.type + "`, " + ot({
    start: n.start,
    end: n.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + n.type + "`, " + ot({
    start: n.start,
    end: n.end
  }) + ") is still open");
}
function Ss(e) {
  const n = this;
  n.parser = t;
  function t(r) {
    return ws(r, {
      ...n.data("settings"),
      ...e,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: n.data("micromarkExtensions") || [],
      mdastExtensions: n.data("fromMarkdownExtensions") || []
    });
  }
}
function Es(e, n) {
  const t = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(n), !0)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Is(e, n) {
  const t = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(n, t), [e.applyData(n, t), { type: "text", value: `
` }];
}
function Ts(e, n) {
  const t = n.value ? n.value + `
` : "", r = {}, l = n.lang ? n.lang.split(/\s+/) : [];
  l.length > 0 && (r.className = ["language-" + l[0]]);
  let o = {
    type: "element",
    tagName: "code",
    properties: r,
    children: [{ type: "text", value: t }]
  };
  return n.meta && (o.data = { meta: n.meta }), e.patch(n, o), o = e.applyData(n, o), o = { type: "element", tagName: "pre", properties: {}, children: [o] }, e.patch(n, o), o;
}
function As(e, n) {
  const t = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Ps(e, n) {
  const t = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function zs(e, n) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(n.identifier).toUpperCase(), l = Ze(r.toLowerCase()), o = e.footnoteOrder.indexOf(r);
  let i, a = e.footnoteCounts.get(r);
  a === void 0 ? (a = 0, e.footnoteOrder.push(r), i = e.footnoteOrder.length) : i = o + 1, a += 1, e.footnoteCounts.set(r, a);
  const s = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + t + "fn-" + l,
      id: t + "fnref-" + l + (a > 1 ? "-" + a : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(i) }]
  };
  e.patch(n, s);
  const u = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [s]
  };
  return e.patch(n, u), e.applyData(n, u);
}
function Ls(e, n) {
  const t = {
    type: "element",
    tagName: "h" + n.depth,
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Ds(e, n) {
  if (e.options.allowDangerousHtml) {
    const t = { type: "raw", value: n.value };
    return e.patch(n, t), e.applyData(n, t);
  }
}
function yi(e, n) {
  const t = n.referenceType;
  let r = "]";
  if (t === "collapsed" ? r += "[]" : t === "full" && (r += "[" + (n.label || n.identifier) + "]"), n.type === "imageReference")
    return [{ type: "text", value: "![" + n.alt + r }];
  const l = e.all(n), o = l[0];
  o && o.type === "text" ? o.value = "[" + o.value : l.unshift({ type: "text", value: "[" });
  const i = l[l.length - 1];
  return i && i.type === "text" ? i.value += r : l.push({ type: "text", value: r }), l;
}
function Fs(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return yi(e, n);
  const l = { src: Ze(r.url || ""), alt: n.alt };
  r.title !== null && r.title !== void 0 && (l.title = r.title);
  const o = { type: "element", tagName: "img", properties: l, children: [] };
  return e.patch(n, o), e.applyData(n, o);
}
function Ns(e, n) {
  const t = { src: Ze(n.url) };
  n.alt !== null && n.alt !== void 0 && (t.alt = n.alt), n.title !== null && n.title !== void 0 && (t.title = n.title);
  const r = { type: "element", tagName: "img", properties: t, children: [] };
  return e.patch(n, r), e.applyData(n, r);
}
function _s(e, n) {
  const t = { type: "text", value: n.value.replace(/\r?\n|\r/g, " ") };
  e.patch(n, t);
  const r = {
    type: "element",
    tagName: "code",
    properties: {},
    children: [t]
  };
  return e.patch(n, r), e.applyData(n, r);
}
function Rs(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return yi(e, n);
  const l = { href: Ze(r.url || "") };
  r.title !== null && r.title !== void 0 && (l.title = r.title);
  const o = {
    type: "element",
    tagName: "a",
    properties: l,
    children: e.all(n)
  };
  return e.patch(n, o), e.applyData(n, o);
}
function Os(e, n) {
  const t = { href: Ze(n.url) };
  n.title !== null && n.title !== void 0 && (t.title = n.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: t,
    children: e.all(n)
  };
  return e.patch(n, r), e.applyData(n, r);
}
function Ms(e, n, t) {
  const r = e.all(n), l = t ? Bs(t) : bi(n), o = {}, i = [];
  if (typeof n.checked == "boolean") {
    const f = r[0];
    let c;
    f && f.type === "element" && f.tagName === "p" ? c = f : (c = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(c)), c.children.length > 0 && c.children.unshift({ type: "text", value: " " }), c.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: n.checked, disabled: !0 },
      children: []
    }), o.className = ["task-list-item"];
  }
  let a = -1;
  for (; ++a < r.length; ) {
    const f = r[a];
    (l || a !== 0 || f.type !== "element" || f.tagName !== "p") && i.push({ type: "text", value: `
` }), f.type === "element" && f.tagName === "p" && !l ? i.push(...f.children) : i.push(f);
  }
  const s = r[r.length - 1];
  s && (l || s.type !== "element" || s.tagName !== "p") && i.push({ type: "text", value: `
` });
  const u = { type: "element", tagName: "li", properties: o, children: i };
  return e.patch(n, u), e.applyData(n, u);
}
function Bs(e) {
  let n = !1;
  if (e.type === "list") {
    n = e.spread || !1;
    const t = e.children;
    let r = -1;
    for (; !n && ++r < t.length; )
      n = bi(t[r]);
  }
  return n;
}
function bi(e) {
  const n = e.spread;
  return n ?? e.children.length > 1;
}
function $s(e, n) {
  const t = {}, r = e.all(n);
  let l = -1;
  for (typeof n.start == "number" && n.start !== 1 && (t.start = n.start); ++l < r.length; ) {
    const i = r[l];
    if (i.type === "element" && i.tagName === "li" && i.properties && Array.isArray(i.properties.className) && i.properties.className.includes("task-list-item")) {
      t.className = ["contains-task-list"];
      break;
    }
  }
  const o = {
    type: "element",
    tagName: n.ordered ? "ol" : "ul",
    properties: t,
    children: e.wrap(r, !0)
  };
  return e.patch(n, o), e.applyData(n, o);
}
function js(e, n) {
  const t = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Hs(e, n) {
  const t = { type: "root", children: e.wrap(e.all(n)) };
  return e.patch(n, t), e.applyData(n, t);
}
function Us(e, n) {
  const t = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Vs(e, n) {
  const t = e.all(n), r = t.shift(), l = [];
  if (r) {
    const i = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([r], !0)
    };
    e.patch(n.children[0], i), l.push(i);
  }
  if (t.length > 0) {
    const i = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: e.wrap(t, !0)
    }, a = kn(n.children[1]), s = Jr(n.children[n.children.length - 1]);
    a && s && (i.position = { start: a, end: s }), l.push(i);
  }
  const o = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(l, !0)
  };
  return e.patch(n, o), e.applyData(n, o);
}
function qs(e, n, t) {
  const r = t ? t.children : void 0, o = (r ? r.indexOf(n) : 1) === 0 ? "th" : "td", i = t && t.type === "table" ? t.align : void 0, a = i ? i.length : n.children.length;
  let s = -1;
  const u = [];
  for (; ++s < a; ) {
    const c = n.children[s], h = {}, p = i ? i[s] : void 0;
    p && (h.align = p);
    let g = { type: "element", tagName: o, properties: h, children: [] };
    c && (g.children = e.all(c), e.patch(c, g), g = e.applyData(c, g)), u.push(g);
  }
  const f = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(u, !0)
  };
  return e.patch(n, f), e.applyData(n, f);
}
function Ws(e, n) {
  const t = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
const ir = 9, lr = 32;
function Ys(e) {
  const n = String(e), t = /\r?\n|\r/g;
  let r = t.exec(n), l = 0;
  const o = [];
  for (; r; )
    o.push(
      or(n.slice(l, r.index), l > 0, !0),
      r[0]
    ), l = r.index + r[0].length, r = t.exec(n);
  return o.push(or(n.slice(l), l > 0, !1)), o.join("");
}
function or(e, n, t) {
  let r = 0, l = e.length;
  if (n) {
    let o = e.codePointAt(r);
    for (; o === ir || o === lr; )
      r++, o = e.codePointAt(r);
  }
  if (t) {
    let o = e.codePointAt(l - 1);
    for (; o === ir || o === lr; )
      l--, o = e.codePointAt(l - 1);
  }
  return l > r ? e.slice(r, l) : "";
}
function Qs(e, n) {
  const t = { type: "text", value: Ys(String(n.value)) };
  return e.patch(n, t), e.applyData(n, t);
}
function Xs(e, n) {
  const t = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(n, t), e.applyData(n, t);
}
const Ks = {
  blockquote: Es,
  break: Is,
  code: Ts,
  delete: As,
  emphasis: Ps,
  footnoteReference: zs,
  heading: Ls,
  html: Ds,
  imageReference: Fs,
  image: Ns,
  inlineCode: _s,
  linkReference: Rs,
  link: Os,
  listItem: Ms,
  list: $s,
  paragraph: js,
  // @ts-expect-error: root is different, but hard to type.
  root: Hs,
  strong: Us,
  table: Vs,
  tableCell: Ws,
  tableRow: qs,
  text: Qs,
  thematicBreak: Xs,
  toml: kt,
  yaml: kt,
  definition: kt,
  footnoteDefinition: kt
};
function kt() {
}
const ki = -1, Nt = 0, st = 1, At = 2, Tn = 3, An = 4, Pn = 5, zn = 6, wi = 7, vi = 8, Ci = typeof self == "object" ? self : globalThis, ar = (e, n) => {
  switch (e) {
    case "Function":
    case "SharedWorker":
    case "Worker":
    case "eval":
    case "setInterval":
    case "setTimeout":
      throw new TypeError("unable to deserialize " + e);
  }
  return new Ci[e](n);
}, Gs = (e, n) => {
  const t = (l, o) => (e.set(o, l), l), r = (l) => {
    if (e.has(l))
      return e.get(l);
    const [o, i] = n[l];
    switch (o) {
      case Nt:
      case ki:
        return t(i, l);
      case st: {
        const a = t([], l);
        for (const s of i)
          a.push(r(s));
        return a;
      }
      case At: {
        const a = t({}, l);
        for (const [s, u] of i)
          a[r(s)] = r(u);
        return a;
      }
      case Tn:
        return t(new Date(i), l);
      case An: {
        const { source: a, flags: s } = i;
        return t(new RegExp(a, s), l);
      }
      case Pn: {
        const a = t(/* @__PURE__ */ new Map(), l);
        for (const [s, u] of i)
          a.set(r(s), r(u));
        return a;
      }
      case zn: {
        const a = t(/* @__PURE__ */ new Set(), l);
        for (const s of i)
          a.add(r(s));
        return a;
      }
      case wi: {
        const { name: a, message: s } = i;
        return t(
          typeof Ci[a] == "function" ? ar(a, s) : new Error(s),
          l
        );
      }
      case vi:
        return t(BigInt(i), l);
      case "BigInt":
        return t(Object(BigInt(i)), l);
      case "ArrayBuffer":
        return t(new Uint8Array(i).buffer, i);
      case "DataView": {
        const { buffer: a } = new Uint8Array(i);
        return t(new DataView(a), i);
      }
    }
    return t(ar(o, i), l);
  };
  return r;
}, sr = (e) => Gs(/* @__PURE__ */ new Map(), e)(0), Ue = "", { toString: Js } = {}, { keys: Zs } = Object, it = (e) => {
  const n = typeof e;
  if (n !== "object" || !e)
    return [Nt, n];
  const t = Js.call(e).slice(8, -1);
  switch (t) {
    case "Array":
      return [st, Ue];
    case "Object":
      return [At, Ue];
    case "Date":
      return [Tn, Ue];
    case "RegExp":
      return [An, Ue];
    case "Map":
      return [Pn, Ue];
    case "Set":
      return [zn, Ue];
    case "DataView":
      return [st, t];
  }
  return t.includes("Array") ? [st, t] : e instanceof Error ? [wi, e.name || "Error"] : [At, t];
}, wt = ([e, n]) => e === Nt && (n === "function" || n === "symbol"), eu = (e, n, t, r) => {
  const l = (i, a) => {
    const s = r.push(i) - 1;
    return t.set(a, s), s;
  }, o = (i) => {
    if (t.has(i))
      return t.get(i);
    let [a, s] = it(i);
    switch (a) {
      case Nt: {
        let f = i;
        switch (s) {
          case "bigint":
            a = vi, f = i.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + s);
            f = null;
            break;
          case "undefined":
            return l([ki], i);
        }
        return l([a, f], i);
      }
      case st: {
        if (s) {
          let h = i;
          return s === "DataView" ? h = new Uint8Array(i.buffer) : s === "ArrayBuffer" && (h = new Uint8Array(i)), l([s, [...h]], i);
        }
        const f = [], c = l([a, f], i);
        for (const h of i)
          f.push(o(h));
        return c;
      }
      case At: {
        if (s)
          switch (s) {
            case "BigInt":
              return l([s, i.toString()], i);
            case "Boolean":
            case "Number":
            case "String":
              return l([s, i.valueOf()], i);
          }
        if (n && "toJSON" in i)
          return o(i.toJSON());
        const f = [], c = l([a, f], i);
        for (const h of Zs(i))
          (e || !wt(it(i[h]))) && f.push([o(h), o(i[h])]);
        return c;
      }
      case Tn:
        return l([a, isNaN(i.getTime()) ? Ue : i.toISOString()], i);
      case An: {
        const { source: f, flags: c } = i;
        return l([a, { source: f, flags: c }], i);
      }
      case Pn: {
        const f = [], c = l([a, f], i);
        for (const [h, p] of i)
          (e || !(wt(it(h)) || wt(it(p)))) && f.push([o(h), o(p)]);
        return c;
      }
      case zn: {
        const f = [], c = l([a, f], i);
        for (const h of i)
          (e || !wt(it(h))) && f.push(o(h));
        return c;
      }
    }
    const { message: u } = i;
    return l([a, { name: s, message: u }], i);
  };
  return o;
}, ur = (e, { json: n, lossy: t } = {}) => {
  const r = [];
  return eu(!(n || t), !!n, /* @__PURE__ */ new Map(), r)(e), r;
}, Pt = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, n) => n && ("json" in n || "lossy" in n) ? sr(ur(e, n)) : structuredClone(e)
) : (e, n) => sr(ur(e, n));
function tu(e, n) {
  const t = [{ type: "text", value: "↩" }];
  return n > 1 && t.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(n) }]
  }), t;
}
function nu(e, n) {
  return "Back to reference " + (e + 1) + (n > 1 ? "-" + n : "");
}
function ru(e) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", t = e.options.footnoteBackContent || tu, r = e.options.footnoteBackLabel || nu, l = e.options.footnoteLabel || "Footnotes", o = e.options.footnoteLabelTagName || "h2", i = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, a = [];
  let s = -1;
  for (; ++s < e.footnoteOrder.length; ) {
    const u = e.footnoteById.get(
      e.footnoteOrder[s]
    );
    if (!u)
      continue;
    const f = e.all(u), c = String(u.identifier).toUpperCase(), h = Ze(c.toLowerCase());
    let p = 0;
    const g = [], y = e.footnoteCounts.get(c);
    for (; y !== void 0 && ++p <= y; ) {
      g.length > 0 && g.push({ type: "text", value: " " });
      let S = typeof t == "string" ? t : t(s, p);
      typeof S == "string" && (S = { type: "text", value: S }), g.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + n + "fnref-" + h + (p > 1 ? "-" + p : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(s, p),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(S) ? S : [S]
      });
    }
    const C = f[f.length - 1];
    if (C && C.type === "element" && C.tagName === "p") {
      const S = C.children[C.children.length - 1];
      S && S.type === "text" ? S.value += " " : C.children.push({ type: "text", value: " " }), C.children.push(...g);
    } else
      f.push(...g);
    const x = {
      type: "element",
      tagName: "li",
      properties: { id: n + "fn-" + h },
      children: e.wrap(f, !0)
    };
    e.patch(u, x), a.push(x);
  }
  if (a.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: o,
          properties: {
            ...Pt(i),
            id: "footnote-label"
          },
          children: [{ type: "text", value: l }]
        },
        { type: "text", value: `
` },
        {
          type: "element",
          tagName: "ol",
          properties: {},
          children: e.wrap(a, !0)
        },
        { type: "text", value: `
` }
      ]
    };
}
const _t = (
  // Note: overloads in JSDoc can’t yet use different `@template`s.
  /**
   * @type {(
   *   (<Condition extends string>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & {type: Condition}) &
   *   (<Condition extends Props>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Condition) &
   *   (<Condition extends TestFunction>(test: Condition) => (node: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node & Predicate<Condition, Node>) &
   *   ((test?: null | undefined) => (node?: unknown, index?: number | null | undefined, parent?: Parent | null | undefined, context?: unknown) => node is Node) &
   *   ((test?: Test) => Check)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {Check}
   */
  function(e) {
    if (e == null)
      return au;
    if (typeof e == "function")
      return Rt(e);
    if (typeof e == "object")
      return Array.isArray(e) ? iu(e) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        lu(
          /** @type {Props} */
          e
        )
      );
    if (typeof e == "string")
      return ou(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function iu(e) {
  const n = [];
  let t = -1;
  for (; ++t < e.length; )
    n[t] = _t(e[t]);
  return Rt(r);
  function r(...l) {
    let o = -1;
    for (; ++o < n.length; )
      if (n[o].apply(this, l)) return !0;
    return !1;
  }
}
function lu(e) {
  const n = (
    /** @type {Record<string, unknown>} */
    e
  );
  return Rt(t);
  function t(r) {
    const l = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let o;
    for (o in e)
      if (l[o] !== n[o]) return !1;
    return !0;
  }
}
function ou(e) {
  return Rt(n);
  function n(t) {
    return t && t.type === e;
  }
}
function Rt(e) {
  return n;
  function n(t, r, l) {
    return !!(su(t) && e.call(
      this,
      t,
      typeof r == "number" ? r : void 0,
      l || void 0
    ));
  }
}
function au() {
  return !0;
}
function su(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const Si = [], uu = !0, cn = !1, cu = "skip";
function Ei(e, n, t, r) {
  let l;
  typeof n == "function" && typeof t != "function" ? (r = t, t = n) : l = n;
  const o = _t(l), i = r ? -1 : 1;
  a(e, void 0, [])();
  function a(s, u, f) {
    const c = (
      /** @type {Record<string, unknown>} */
      s && typeof s == "object" ? s : {}
    );
    if (typeof c.type == "string") {
      const p = (
        // `hast`
        typeof c.tagName == "string" ? c.tagName : (
          // `xast`
          typeof c.name == "string" ? c.name : void 0
        )
      );
      Object.defineProperty(h, "name", {
        value: "node (" + (s.type + (p ? "<" + p + ">" : "")) + ")"
      });
    }
    return h;
    function h() {
      let p = Si, g, y, C;
      if ((!n || o(s, u, f[f.length - 1] || void 0)) && (p = fu(t(s, f)), p[0] === cn))
        return p;
      if ("children" in s && s.children) {
        const x = (
          /** @type {UnistParent} */
          s
        );
        if (x.children && p[0] !== cu)
          for (y = (r ? x.children.length : -1) + i, C = f.concat(x); y > -1 && y < x.children.length; ) {
            const S = x.children[y];
            if (g = a(S, y, C)(), g[0] === cn)
              return g;
            y = typeof g[1] == "number" ? g[1] : y + i;
          }
      }
      return p;
    }
  }
}
function fu(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [uu, e] : e == null ? Si : [e];
}
function Ln(e, n, t, r) {
  let l, o, i;
  typeof n == "function" && typeof t != "function" ? (o = void 0, i = n, l = t) : (o = n, i = t, l = r), Ei(e, o, a, l);
  function a(s, u) {
    const f = u[u.length - 1], c = f ? f.children.indexOf(s) : void 0;
    return i(s, c, f);
  }
}
const fn = {}.hasOwnProperty, pu = {};
function hu(e, n) {
  const t = n || pu, r = /* @__PURE__ */ new Map(), l = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = { ...Ks, ...t.handlers }, a = {
    all: u,
    applyData: mu,
    definitionById: r,
    footnoteById: l,
    footnoteCounts: o,
    footnoteOrder: [],
    handlers: i,
    one: s,
    options: t,
    patch: du,
    wrap: xu
  };
  return Ln(e, function(f) {
    if (f.type === "definition" || f.type === "footnoteDefinition") {
      const c = f.type === "definition" ? r : l, h = String(f.identifier).toUpperCase();
      c.has(h) || c.set(h, f);
    }
  }), a;
  function s(f, c) {
    const h = f.type, p = a.handlers[h];
    if (fn.call(a.handlers, h) && p)
      return p(a, f, c);
    if (a.options.passThrough && a.options.passThrough.includes(h)) {
      if ("children" in f) {
        const { children: y, ...C } = f, x = Pt(C);
        return x.children = a.all(f), x;
      }
      return Pt(f);
    }
    return (a.options.unknownHandler || gu)(a, f, c);
  }
  function u(f) {
    const c = [];
    if ("children" in f) {
      const h = f.children;
      let p = -1;
      for (; ++p < h.length; ) {
        const g = a.one(h[p], f);
        if (g) {
          if (p && h[p - 1].type === "break" && (!Array.isArray(g) && g.type === "text" && (g.value = cr(g.value)), !Array.isArray(g) && g.type === "element")) {
            const y = g.children[0];
            y && y.type === "text" && (y.value = cr(y.value));
          }
          Array.isArray(g) ? c.push(...g) : c.push(g);
        }
      }
    }
    return c;
  }
}
function du(e, n) {
  e.position && (n.position = to(e));
}
function mu(e, n) {
  let t = n;
  if (e && e.data) {
    const r = e.data.hName, l = e.data.hChildren, o = e.data.hProperties;
    if (typeof r == "string")
      if (t.type === "element")
        t.tagName = r;
      else {
        const i = "children" in t ? t.children : [t];
        t = { type: "element", tagName: r, properties: {}, children: i };
      }
    t.type === "element" && o && Object.assign(t.properties, Pt(o)), "children" in t && t.children && l !== null && l !== void 0 && (t.children = l);
  }
  return t;
}
function gu(e, n) {
  const t = n.data || {}, r = "value" in n && !(fn.call(t, "hProperties") || fn.call(t, "hChildren")) ? { type: "text", value: n.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, r), e.applyData(n, r);
}
function xu(e, n) {
  const t = [];
  let r = -1;
  for (n && t.push({ type: "text", value: `
` }); ++r < e.length; )
    r && t.push({ type: "text", value: `
` }), t.push(e[r]);
  return n && e.length > 0 && t.push({ type: "text", value: `
` }), t;
}
function cr(e) {
  let n = 0, t = e.charCodeAt(n);
  for (; t === 9 || t === 32; )
    n++, t = e.charCodeAt(n);
  return e.slice(n);
}
function fr(e, n) {
  const t = hu(e, n), r = t.one(e, void 0), l = ru(t), o = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return l && o.children.push({ type: "text", value: `
` }, l), o;
}
function yu(e, n) {
  return e && "run" in e ? async function(t, r) {
    const l = (
      /** @type {HastRoot} */
      fr(t, { file: r, ...n })
    );
    await e.run(l, r);
  } : function(t, r) {
    return (
      /** @type {HastRoot} */
      fr(t, { file: r, ...e || n })
    );
  };
}
function pr(e) {
  if (e)
    throw e;
}
var Et = Object.prototype.hasOwnProperty, Ii = Object.prototype.toString, hr = Object.defineProperty, dr = Object.getOwnPropertyDescriptor, mr = function(n) {
  return typeof Array.isArray == "function" ? Array.isArray(n) : Ii.call(n) === "[object Array]";
}, gr = function(n) {
  if (!n || Ii.call(n) !== "[object Object]")
    return !1;
  var t = Et.call(n, "constructor"), r = n.constructor && n.constructor.prototype && Et.call(n.constructor.prototype, "isPrototypeOf");
  if (n.constructor && !t && !r)
    return !1;
  var l;
  for (l in n)
    ;
  return typeof l > "u" || Et.call(n, l);
}, xr = function(n, t) {
  hr && t.name === "__proto__" ? hr(n, t.name, {
    enumerable: !0,
    configurable: !0,
    value: t.newValue,
    writable: !0
  }) : n[t.name] = t.newValue;
}, yr = function(n, t) {
  if (t === "__proto__")
    if (Et.call(n, t)) {
      if (dr)
        return dr(n, t).value;
    } else return;
  return n[t];
}, bu = function e() {
  var n, t, r, l, o, i, a = arguments[0], s = 1, u = arguments.length, f = !1;
  for (typeof a == "boolean" && (f = a, a = arguments[1] || {}, s = 2), (a == null || typeof a != "object" && typeof a != "function") && (a = {}); s < u; ++s)
    if (n = arguments[s], n != null)
      for (t in n)
        r = yr(a, t), l = yr(n, t), a !== l && (f && l && (gr(l) || (o = mr(l))) ? (o ? (o = !1, i = r && mr(r) ? r : []) : i = r && gr(r) ? r : {}, xr(a, { name: t, newValue: e(f, i, l) })) : typeof l < "u" && xr(a, { name: t, newValue: l }));
  return a;
};
const Ut = /* @__PURE__ */ Gr(bu);
function pn(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const n = Object.getPrototypeOf(e);
  return (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function ku() {
  const e = [], n = { run: t, use: r };
  return n;
  function t(...l) {
    let o = -1;
    const i = l.pop();
    if (typeof i != "function")
      throw new TypeError("Expected function as last argument, not " + i);
    a(null, ...l);
    function a(s, ...u) {
      const f = e[++o];
      let c = -1;
      if (s) {
        i(s);
        return;
      }
      for (; ++c < l.length; )
        (u[c] === null || u[c] === void 0) && (u[c] = l[c]);
      l = u, f ? wu(f, a)(...u) : i(null, ...u);
    }
  }
  function r(l) {
    if (typeof l != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + l
      );
    return e.push(l), n;
  }
}
function wu(e, n) {
  let t;
  return r;
  function r(...i) {
    const a = e.length > i.length;
    let s;
    a && i.push(l);
    try {
      s = e.apply(this, i);
    } catch (u) {
      const f = (
        /** @type {Error} */
        u
      );
      if (a && t)
        throw f;
      return l(f);
    }
    a || (s && s.then && typeof s.then == "function" ? s.then(o, l) : s instanceof Error ? l(s) : o(s));
  }
  function l(i, ...a) {
    t || (t = !0, n(i, ...a));
  }
  function o(i) {
    l(null, i);
  }
}
const Te = { basename: vu, dirname: Cu, extname: Su, join: Eu, sep: "/" };
function vu(e, n) {
  if (n !== void 0 && typeof n != "string")
    throw new TypeError('"ext" argument must be a string');
  gt(e);
  let t = 0, r = -1, l = e.length, o;
  if (n === void 0 || n.length === 0 || n.length > e.length) {
    for (; l--; )
      if (e.codePointAt(l) === 47) {
        if (o) {
          t = l + 1;
          break;
        }
      } else r < 0 && (o = !0, r = l + 1);
    return r < 0 ? "" : e.slice(t, r);
  }
  if (n === e)
    return "";
  let i = -1, a = n.length - 1;
  for (; l--; )
    if (e.codePointAt(l) === 47) {
      if (o) {
        t = l + 1;
        break;
      }
    } else
      i < 0 && (o = !0, i = l + 1), a > -1 && (e.codePointAt(l) === n.codePointAt(a--) ? a < 0 && (r = l) : (a = -1, r = i));
  return t === r ? r = i : r < 0 && (r = e.length), e.slice(t, r);
}
function Cu(e) {
  if (gt(e), e.length === 0)
    return ".";
  let n = -1, t = e.length, r;
  for (; --t; )
    if (e.codePointAt(t) === 47) {
      if (r) {
        n = t;
        break;
      }
    } else r || (r = !0);
  return n < 0 ? e.codePointAt(0) === 47 ? "/" : "." : n === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, n);
}
function Su(e) {
  gt(e);
  let n = e.length, t = -1, r = 0, l = -1, o = 0, i;
  for (; n--; ) {
    const a = e.codePointAt(n);
    if (a === 47) {
      if (i) {
        r = n + 1;
        break;
      }
      continue;
    }
    t < 0 && (i = !0, t = n + 1), a === 46 ? l < 0 ? l = n : o !== 1 && (o = 1) : l > -1 && (o = -1);
  }
  return l < 0 || t < 0 || // We saw a non-dot character immediately before the dot.
  o === 0 || // The (right-most) trimmed path component is exactly `..`.
  o === 1 && l === t - 1 && l === r + 1 ? "" : e.slice(l, t);
}
function Eu(...e) {
  let n = -1, t;
  for (; ++n < e.length; )
    gt(e[n]), e[n] && (t = t === void 0 ? e[n] : t + "/" + e[n]);
  return t === void 0 ? "." : Iu(t);
}
function Iu(e) {
  gt(e);
  const n = e.codePointAt(0) === 47;
  let t = Tu(e, !n);
  return t.length === 0 && !n && (t = "."), t.length > 0 && e.codePointAt(e.length - 1) === 47 && (t += "/"), n ? "/" + t : t;
}
function Tu(e, n) {
  let t = "", r = 0, l = -1, o = 0, i = -1, a, s;
  for (; ++i <= e.length; ) {
    if (i < e.length)
      a = e.codePointAt(i);
    else {
      if (a === 47)
        break;
      a = 47;
    }
    if (a === 47) {
      if (!(l === i - 1 || o === 1)) if (l !== i - 1 && o === 2) {
        if (t.length < 2 || r !== 2 || t.codePointAt(t.length - 1) !== 46 || t.codePointAt(t.length - 2) !== 46) {
          if (t.length > 2) {
            if (s = t.lastIndexOf("/"), s !== t.length - 1) {
              s < 0 ? (t = "", r = 0) : (t = t.slice(0, s), r = t.length - 1 - t.lastIndexOf("/")), l = i, o = 0;
              continue;
            }
          } else if (t.length > 0) {
            t = "", r = 0, l = i, o = 0;
            continue;
          }
        }
        n && (t = t.length > 0 ? t + "/.." : "..", r = 2);
      } else
        t.length > 0 ? t += "/" + e.slice(l + 1, i) : t = e.slice(l + 1, i), r = i - l - 1;
      l = i, o = 0;
    } else a === 46 && o > -1 ? o++ : o = -1;
  }
  return t;
}
function gt(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const Au = { cwd: Pu };
function Pu() {
  return "/";
}
function hn(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function zu(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!hn(e)) {
    const n = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw n.code = "ERR_INVALID_ARG_TYPE", n;
  }
  if (e.protocol !== "file:") {
    const n = new TypeError("The URL must be of scheme file");
    throw n.code = "ERR_INVALID_URL_SCHEME", n;
  }
  return Lu(e);
}
function Lu(e) {
  if (e.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw r.code = "ERR_INVALID_FILE_URL_HOST", r;
  }
  const n = e.pathname;
  let t = -1;
  for (; ++t < n.length; )
    if (n.codePointAt(t) === 37 && n.codePointAt(t + 1) === 50) {
      const r = n.codePointAt(t + 2);
      if (r === 70 || r === 102) {
        const l = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw l.code = "ERR_INVALID_FILE_URL_PATH", l;
      }
    }
  return decodeURIComponent(n);
}
const Vt = (
  /** @type {const} */
  [
    "history",
    "path",
    "basename",
    "stem",
    "extname",
    "dirname"
  ]
);
class Ti {
  /**
   * Create a new virtual file.
   *
   * `options` is treated as:
   *
   * *   `string` or `Uint8Array` — `{value: options}`
   * *   `URL` — `{path: options}`
   * *   `VFile` — shallow copies its data over to the new file
   * *   `object` — all fields are shallow copied over to the new file
   *
   * Path related fields are set in the following order (least specific to
   * most specific): `history`, `path`, `basename`, `stem`, `extname`,
   * `dirname`.
   *
   * You cannot set `dirname` or `extname` without setting either `history`,
   * `path`, `basename`, or `stem` too.
   *
   * @param {Compatible | null | undefined} [value]
   *   File value.
   * @returns
   *   New instance.
   */
  constructor(n) {
    let t;
    n ? hn(n) ? t = { path: n } : typeof n == "string" || Du(n) ? t = { value: n } : t = n : t = {}, this.cwd = "cwd" in t ? "" : Au.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < Vt.length; ) {
      const o = Vt[r];
      o in t && t[o] !== void 0 && t[o] !== null && (this[o] = o === "history" ? [...t[o]] : t[o]);
    }
    let l;
    for (l in t)
      Vt.includes(l) || (this[l] = t[l]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? Te.basename(this.path) : void 0;
  }
  /**
   * Set basename (including extname) (`'index.min.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} basename
   *   Basename.
   * @returns {undefined}
   *   Nothing.
   */
  set basename(n) {
    Wt(n, "basename"), qt(n, "basename"), this.path = Te.join(this.dirname || "", n);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? Te.dirname(this.path) : void 0;
  }
  /**
   * Set the parent path (example: `'~'`).
   *
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} dirname
   *   Dirname.
   * @returns {undefined}
   *   Nothing.
   */
  set dirname(n) {
    br(this.basename, "dirname"), this.path = Te.join(n || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? Te.extname(this.path) : void 0;
  }
  /**
   * Set the extname (including dot) (example: `'.js'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be set if there’s no `path` yet.
   *
   * @param {string | undefined} extname
   *   Extname.
   * @returns {undefined}
   *   Nothing.
   */
  set extname(n) {
    if (qt(n, "extname"), br(this.dirname, "extname"), n) {
      if (n.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (n.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = Te.join(this.dirname, this.stem + (n || ""));
  }
  /**
   * Get the full path (example: `'~/index.min.js'`).
   *
   * @returns {string}
   *   Path.
   */
  get path() {
    return this.history[this.history.length - 1];
  }
  /**
   * Set the full path (example: `'~/index.min.js'`).
   *
   * Cannot be nullified.
   * You can set a file URL (a `URL` object with a `file:` protocol) which will
   * be turned into a path with `url.fileURLToPath`.
   *
   * @param {URL | string} path
   *   Path.
   * @returns {undefined}
   *   Nothing.
   */
  set path(n) {
    hn(n) && (n = zu(n)), Wt(n, "path"), this.path !== n && this.history.push(n);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? Te.basename(this.path, this.extname) : void 0;
  }
  /**
   * Set the stem (basename w/o extname) (example: `'index.min'`).
   *
   * Cannot contain path separators (`'/'` on unix, macOS, and browsers, `'\'`
   * on windows).
   * Cannot be nullified (use `file.path = file.dirname` instead).
   *
   * @param {string} stem
   *   Stem.
   * @returns {undefined}
   *   Nothing.
   */
  set stem(n) {
    Wt(n, "stem"), qt(n, "stem"), this.path = Te.join(this.dirname || "", n + (this.extname || ""));
  }
  // Normal prototypal methods.
  /**
   * Create a fatal message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `true` (error; file not usable)
   * and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {never}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {never}
   *   Never.
   * @throws {VFileMessage}
   *   Message.
   */
  fail(n, t, r) {
    const l = this.message(n, t, r);
    throw l.fatal = !0, l;
  }
  /**
   * Create an info message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `undefined` (info; change
   * likely not needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  info(n, t, r) {
    const l = this.message(n, t, r);
    return l.fatal = void 0, l;
  }
  /**
   * Create a message for `reason` associated with the file.
   *
   * The `fatal` field of the message is set to `false` (warning; change may be
   * needed) and the `file` field is set to the current file path.
   * The message is added to the `messages` field on `file`.
   *
   * > 🪦 **Note**: also has obsolete signatures.
   *
   * @overload
   * @param {string} reason
   * @param {MessageOptions | null | undefined} [options]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {string} reason
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Node | NodeLike | null | undefined} parent
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {Point | Position | null | undefined} place
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @overload
   * @param {Error | VFileMessage} cause
   * @param {string | null | undefined} [origin]
   * @returns {VFileMessage}
   *
   * @param {Error | VFileMessage | string} causeOrReason
   *   Reason for message, should use markdown.
   * @param {Node | NodeLike | MessageOptions | Point | Position | string | null | undefined} [optionsOrParentOrPlace]
   *   Configuration (optional).
   * @param {string | null | undefined} [origin]
   *   Place in code where the message originates (example:
   *   `'my-package:my-rule'` or `'my-rule'`).
   * @returns {VFileMessage}
   *   Message.
   */
  message(n, t, r) {
    const l = new oe(
      // @ts-expect-error: the overloads are fine.
      n,
      t,
      r
    );
    return this.path && (l.name = this.path + ":" + l.name, l.file = this.path), l.fatal = !1, this.messages.push(l), l;
  }
  /**
   * Serialize the file.
   *
   * > **Note**: which encodings are supported depends on the engine.
   * > For info on Node.js, see:
   * > <https://nodejs.org/api/util.html#whatwg-supported-encodings>.
   *
   * @param {string | null | undefined} [encoding='utf8']
   *   Character encoding to understand `value` as when it’s a `Uint8Array`
   *   (default: `'utf-8'`).
   * @returns {string}
   *   Serialized file.
   */
  toString(n) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(n || void 0).decode(this.value);
  }
}
function qt(e, n) {
  if (e && e.includes(Te.sep))
    throw new Error(
      "`" + n + "` cannot be a path: did not expect `" + Te.sep + "`"
    );
}
function Wt(e, n) {
  if (!e)
    throw new Error("`" + n + "` cannot be empty");
}
function br(e, n) {
  if (!e)
    throw new Error("Setting `" + n + "` requires `path` to be set too");
}
function Du(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Fu = (
  /**
   * @type {new <Parameters extends Array<unknown>, Result>(property: string | symbol) => (...parameters: Parameters) => Result}
   */
  /** @type {unknown} */
  /**
   * @this {Function}
   * @param {string | symbol} property
   * @returns {(...parameters: Array<unknown>) => unknown}
   */
  function(e) {
    const r = (
      /** @type {Record<string | symbol, Function>} */
      // Prototypes do exist.
      // type-coverage:ignore-next-line
      this.constructor.prototype
    ), l = r[e], o = function() {
      return l.apply(o, arguments);
    };
    return Object.setPrototypeOf(o, r), o;
  }
), Nu = {}.hasOwnProperty;
class Dn extends Fu {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = ku();
  }
  /**
   * Copy a processor.
   *
   * @deprecated
   *   This is a private internal method and should not be used.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   New *unfrozen* processor ({@linkcode Processor}) that is
   *   configured to work the same as its ancestor.
   *   When the descendant processor is configured in the future it does not
   *   affect the ancestral processor.
   */
  copy() {
    const n = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new Dn()
    );
    let t = -1;
    for (; ++t < this.attachers.length; ) {
      const r = this.attachers[t];
      n.use(...r);
    }
    return n.data(Ut(!0, {}, this.namespace)), n;
  }
  /**
   * Configure the processor with info available to all plugins.
   * Information is stored in an object.
   *
   * Typically, options can be given to a specific plugin, but sometimes it
   * makes sense to have information shared with several plugins.
   * For example, a list of HTML elements that are self-closing, which is
   * needed during all phases.
   *
   * > **Note**: setting information cannot occur on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * > **Note**: to register custom data in TypeScript, augment the
   * > {@linkcode Data} interface.
   *
   * @example
   *   This example show how to get and set info:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   const processor = unified().data('alpha', 'bravo')
   *
   *   processor.data('alpha') // => 'bravo'
   *
   *   processor.data() // => {alpha: 'bravo'}
   *
   *   processor.data({charlie: 'delta'})
   *
   *   processor.data() // => {charlie: 'delta'}
   *   ```
   *
   * @template {keyof Data} Key
   *
   * @overload
   * @returns {Data}
   *
   * @overload
   * @param {Data} dataset
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Key} key
   * @returns {Data[Key]}
   *
   * @overload
   * @param {Key} key
   * @param {Data[Key]} value
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @param {Data | Key} [key]
   *   Key to get or set, or entire dataset to set, or nothing to get the
   *   entire dataset (optional).
   * @param {Data[Key]} [value]
   *   Value to set (optional).
   * @returns {unknown}
   *   The current processor when setting, the value at `key` when getting, or
   *   the entire dataset when getting without key.
   */
  data(n, t) {
    return typeof n == "string" ? arguments.length === 2 ? (Xt("data", this.frozen), this.namespace[n] = t, this) : Nu.call(this.namespace, n) && this.namespace[n] || void 0 : n ? (Xt("data", this.frozen), this.namespace = n, this) : this.namespace;
  }
  /**
   * Freeze a processor.
   *
   * Frozen processors are meant to be extended and not to be configured
   * directly.
   *
   * When a processor is frozen it cannot be unfrozen.
   * New processors working the same way can be created by calling the
   * processor.
   *
   * It’s possible to freeze processors explicitly by calling `.freeze()`.
   * Processors freeze automatically when `.parse()`, `.run()`, `.runSync()`,
   * `.stringify()`, `.process()`, or `.processSync()` are called.
   *
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   The current processor.
   */
  freeze() {
    if (this.frozen)
      return this;
    const n = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [t, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1)
        continue;
      r[0] === !0 && (r[0] = void 0);
      const l = t.call(n, ...r);
      typeof l == "function" && this.transformers.use(l);
    }
    return this.frozen = !0, this.freezeIndex = Number.POSITIVE_INFINITY, this;
  }
  /**
   * Parse text to a syntax tree.
   *
   * > **Note**: `parse` freezes the processor if not already *frozen*.
   *
   * > **Note**: `parse` performs the parse phase, not the run phase or other
   * > phases.
   *
   * @param {Compatible | undefined} [file]
   *   file to parse (optional); typically `string` or `VFile`; any value
   *   accepted as `x` in `new VFile(x)`.
   * @returns {ParseTree extends undefined ? Node : ParseTree}
   *   Syntax tree representing `file`.
   */
  parse(n) {
    this.freeze();
    const t = vt(n), r = this.parser || this.Parser;
    return Yt("parse", r), r(String(t), t);
  }
  /**
   * Process the given file as configured on the processor.
   *
   * > **Note**: `process` freezes the processor if not already *frozen*.
   *
   * > **Note**: `process` performs the parse, run, and stringify phases.
   *
   * @overload
   * @param {Compatible | undefined} file
   * @param {ProcessCallback<VFileWithOutput<CompileResult>>} done
   * @returns {undefined}
   *
   * @overload
   * @param {Compatible | undefined} [file]
   * @returns {Promise<VFileWithOutput<CompileResult>>}
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`]; any value accepted as
   *   `x` in `new VFile(x)`.
   * @param {ProcessCallback<VFileWithOutput<CompileResult>> | undefined} [done]
   *   Callback (optional).
   * @returns {Promise<VFile> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise a promise, rejected with a fatal error or resolved with the
   *   processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  process(n, t) {
    const r = this;
    return this.freeze(), Yt("process", this.parser || this.Parser), Qt("process", this.compiler || this.Compiler), t ? l(void 0, t) : new Promise(l);
    function l(o, i) {
      const a = vt(n), s = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(a)
      );
      r.run(s, a, function(f, c, h) {
        if (f || !c || !h)
          return u(f);
        const p = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          c
        ), g = r.stringify(p, h);
        Ou(g) ? h.value = g : h.result = g, u(
          f,
          /** @type {VFileWithOutput<CompileResult>} */
          h
        );
      });
      function u(f, c) {
        f || !c ? i(f) : o ? o(c) : t(void 0, c);
      }
    }
  }
  /**
   * Process the given file as configured on the processor.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `processSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `processSync` performs the parse, run, and stringify phases.
   *
   * @param {Compatible | undefined} [file]
   *   File (optional); typically `string` or `VFile`; any value accepted as
   *   `x` in `new VFile(x)`.
   * @returns {VFileWithOutput<CompileResult>}
   *   The processed file.
   *
   *   The parsed, transformed, and compiled value is available at
   *   `file.value` (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most
   *   > compilers return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  processSync(n) {
    let t = !1, r;
    return this.freeze(), Yt("processSync", this.parser || this.Parser), Qt("processSync", this.compiler || this.Compiler), this.process(n, l), wr("processSync", "process", t), r;
    function l(o, i) {
      t = !0, pr(o), r = i;
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * > **Note**: `run` freezes the processor if not already *frozen*.
   *
   * > **Note**: `run` performs the run phase, not other phases.
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} file
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} done
   * @returns {undefined}
   *
   * @overload
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   * @param {Compatible | undefined} [file]
   * @returns {Promise<TailTree extends undefined ? Node : TailTree>}
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {(
   *   RunCallback<TailTree extends undefined ? Node : TailTree> |
   *   Compatible
   * )} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @param {RunCallback<TailTree extends undefined ? Node : TailTree>} [done]
   *   Callback (optional).
   * @returns {Promise<TailTree extends undefined ? Node : TailTree> | undefined}
   *   Nothing if `done` is given.
   *   Otherwise, a promise rejected with a fatal error or resolved with the
   *   transformed tree.
   */
  run(n, t, r) {
    kr(n), this.freeze();
    const l = this.transformers;
    return !r && typeof t == "function" && (r = t, t = void 0), r ? o(void 0, r) : new Promise(o);
    function o(i, a) {
      const s = vt(t);
      l.run(n, s, u);
      function u(f, c, h) {
        const p = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          c || n
        );
        f ? a(f) : i ? i(p) : r(void 0, p, h);
      }
    }
  }
  /**
   * Run *transformers* on a syntax tree.
   *
   * An error is thrown if asynchronous transforms are configured.
   *
   * > **Note**: `runSync` freezes the processor if not already *frozen*.
   *
   * > **Note**: `runSync` performs the run phase, not other phases.
   *
   * @param {HeadTree extends undefined ? Node : HeadTree} tree
   *   Tree to transform and inspect.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {TailTree extends undefined ? Node : TailTree}
   *   Transformed tree.
   */
  runSync(n, t) {
    let r = !1, l;
    return this.run(n, t, o), wr("runSync", "run", r), l;
    function o(i, a) {
      pr(i), l = a, r = !0;
    }
  }
  /**
   * Compile a syntax tree.
   *
   * > **Note**: `stringify` freezes the processor if not already *frozen*.
   *
   * > **Note**: `stringify` performs the stringify phase, not the run phase
   * > or other phases.
   *
   * @param {CompileTree extends undefined ? Node : CompileTree} tree
   *   Tree to compile.
   * @param {Compatible | undefined} [file]
   *   File associated with `node` (optional); any value accepted as `x` in
   *   `new VFile(x)`.
   * @returns {CompileResult extends undefined ? Value : CompileResult}
   *   Textual representation of the tree (see note).
   *
   *   > **Note**: unified typically compiles by serializing: most compilers
   *   > return `string` (or `Uint8Array`).
   *   > Some compilers, such as the one configured with
   *   > [`rehype-react`][rehype-react], return other values (in this case, a
   *   > React tree).
   *   > If you’re using a compiler that doesn’t serialize, expect different
   *   > result values.
   *   >
   *   > To register custom results in TypeScript, add them to
   *   > {@linkcode CompileResultMap}.
   *
   *   [rehype-react]: https://github.com/rehypejs/rehype-react
   */
  stringify(n, t) {
    this.freeze();
    const r = vt(t), l = this.compiler || this.Compiler;
    return Qt("stringify", l), kr(n), l(n, r);
  }
  /**
   * Configure the processor to use a plugin, a list of usable values, or a
   * preset.
   *
   * If the processor is already using a plugin, the previous plugin
   * configuration is changed based on the options that are passed in.
   * In other words, the plugin is not added a second time.
   *
   * > **Note**: `use` cannot be called on *frozen* processors.
   * > Call the processor first to create a new unfrozen processor.
   *
   * @example
   *   There are many ways to pass plugins to `.use()`.
   *   This example gives an overview:
   *
   *   ```js
   *   import {unified} from 'unified'
   *
   *   unified()
   *     // Plugin with options:
   *     .use(pluginA, {x: true, y: true})
   *     // Passing the same plugin again merges configuration (to `{x: true, y: false, z: true}`):
   *     .use(pluginA, {y: false, z: true})
   *     // Plugins:
   *     .use([pluginB, pluginC])
   *     // Two plugins, the second with options:
   *     .use([pluginD, [pluginE, {}]])
   *     // Preset with plugins and settings:
   *     .use({plugins: [pluginF, [pluginG, {}]], settings: {position: false}})
   *     // Settings only:
   *     .use({settings: {position: false}})
   *   ```
   *
   * @template {Array<unknown>} [Parameters=[]]
   * @template {Node | string | undefined} [Input=undefined]
   * @template [Output=Input]
   *
   * @overload
   * @param {Preset | null | undefined} [preset]
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {PluggableList} list
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *
   * @overload
   * @param {Plugin<Parameters, Input, Output>} plugin
   * @param {...(Parameters | [boolean])} parameters
   * @returns {UsePlugin<ParseTree, HeadTree, TailTree, CompileTree, CompileResult, Input, Output>}
   *
   * @param {PluggableList | Plugin | Preset | null | undefined} value
   *   Usable value.
   * @param {...unknown} parameters
   *   Parameters, when a plugin is given as a usable value.
   * @returns {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>}
   *   Current processor.
   */
  use(n, ...t) {
    const r = this.attachers, l = this.namespace;
    if (Xt("use", this.frozen), n != null) if (typeof n == "function")
      s(n, t);
    else if (typeof n == "object")
      Array.isArray(n) ? a(n) : i(n);
    else
      throw new TypeError("Expected usable value, not `" + n + "`");
    return this;
    function o(u) {
      if (typeof u == "function")
        s(u, []);
      else if (typeof u == "object")
        if (Array.isArray(u)) {
          const [f, ...c] = (
            /** @type {PluginTuple<Array<unknown>>} */
            u
          );
          s(f, c);
        } else
          i(u);
      else
        throw new TypeError("Expected usable value, not `" + u + "`");
    }
    function i(u) {
      if (!("plugins" in u) && !("settings" in u))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      a(u.plugins), u.settings && (l.settings = Ut(!0, l.settings, u.settings));
    }
    function a(u) {
      let f = -1;
      if (u != null) if (Array.isArray(u))
        for (; ++f < u.length; ) {
          const c = u[f];
          o(c);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + u + "`");
    }
    function s(u, f) {
      let c = -1, h = -1;
      for (; ++c < r.length; )
        if (r[c][0] === u) {
          h = c;
          break;
        }
      if (h === -1)
        r.push([u, ...f]);
      else if (f.length > 0) {
        let [p, ...g] = f;
        const y = r[h][1];
        pn(y) && pn(p) && (p = Ut(!0, y, p)), r[h] = [u, p, ...g];
      }
    }
  }
}
const _u = new Dn().freeze();
function Yt(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function Qt(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function Xt(e, n) {
  if (n)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function kr(e) {
  if (!pn(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function wr(e, n, t) {
  if (!t)
    throw new Error(
      "`" + e + "` finished async. Use `" + n + "` instead"
    );
}
function vt(e) {
  return Ru(e) ? e : new Ti(e);
}
function Ru(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Ou(e) {
  return typeof e == "string" || Mu(e);
}
function Mu(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Bu = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", vr = [], Cr = { allowDangerousHtml: !0 }, $u = /^(https?|ircs?|mailto|xmpp)$/i, ju = [
  { from: "astPlugins", id: "remove-buggy-html-in-markdown-parser" },
  { from: "allowDangerousHtml", id: "remove-buggy-html-in-markdown-parser" },
  {
    from: "allowNode",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowElement"
  },
  {
    from: "allowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "allowedElements"
  },
  { from: "className", id: "remove-classname" },
  {
    from: "disallowedTypes",
    id: "replace-allownode-allowedtypes-and-disallowedtypes",
    to: "disallowedElements"
  },
  { from: "escapeHtml", id: "remove-buggy-html-in-markdown-parser" },
  { from: "includeElementIndex", id: "#remove-includeelementindex" },
  {
    from: "includeNodeIndex",
    id: "change-includenodeindex-to-includeelementindex"
  },
  { from: "linkTarget", id: "remove-linktarget" },
  { from: "plugins", id: "change-plugins-to-remarkplugins", to: "remarkPlugins" },
  { from: "rawSourcePos", id: "#remove-rawsourcepos" },
  { from: "renderers", id: "change-renderers-to-components", to: "components" },
  { from: "source", id: "change-source-to-children", to: "children" },
  { from: "sourcePos", id: "#remove-sourcepos" },
  { from: "transformImageUri", id: "#add-urltransform", to: "urlTransform" },
  { from: "transformLinkUri", id: "#add-urltransform", to: "urlTransform" }
];
function Hu(e) {
  const n = Uu(e), t = Vu(e);
  return qu(n.runSync(n.parse(t), t), e);
}
function Uu(e) {
  const n = e.rehypePlugins || vr, t = e.remarkPlugins || vr, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...Cr } : Cr;
  return _u().use(Ss).use(t).use(yu, r).use(n);
}
function Vu(e) {
  const n = e.children || "", t = new Ti();
  return typeof n == "string" && (t.value = n), t;
}
function qu(e, n) {
  const t = n.allowedElements, r = n.allowElement, l = n.components, o = n.disallowedElements, i = n.skipHtml, a = n.unwrapDisallowed, s = n.urlTransform || Wu;
  for (const f of ju)
    Object.hasOwn(n, f.from) && ("" + f.from + (f.to ? "use `" + f.to + "` instead" : "remove it") + Bu + f.id, void 0);
  return Ln(e, u), oo(e, {
    Fragment: ut,
    components: l,
    ignoreInvalidStyle: !0,
    jsx: I,
    jsxs: N,
    passKeys: !0,
    passNode: !0
  });
  function u(f, c, h) {
    if (f.type === "raw" && h && typeof c == "number")
      return i ? h.children.splice(c, 1) : h.children[c] = { type: "text", value: f.value }, c;
    if (f.type === "element") {
      let p;
      for (p in $t)
        if (Object.hasOwn($t, p) && Object.hasOwn(f.properties, p)) {
          const g = f.properties[p], y = $t[p];
          (y === null || y.includes(f.tagName)) && (f.properties[p] = s(String(g || ""), p, f));
        }
    }
    if (f.type === "element") {
      let p = t ? !t.includes(f.tagName) : o ? o.includes(f.tagName) : !1;
      if (!p && r && typeof c == "number" && (p = !r(f, c, h)), p && h && typeof c == "number")
        return a && f.children ? h.children.splice(c, 1, ...f.children) : h.children.splice(c, 1), c;
    }
  }
}
function Wu(e) {
  const n = e.indexOf(":"), t = e.indexOf("?"), r = e.indexOf("#"), l = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    n === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    l !== -1 && n > l || t !== -1 && n > t || r !== -1 && n > r || // It is a protocol, it should be allowed.
    $u.test(e.slice(0, n)) ? e : ""
  );
}
function Sr(e, n) {
  const t = String(e);
  if (typeof n != "string")
    throw new TypeError("Expected character");
  let r = 0, l = t.indexOf(n);
  for (; l !== -1; )
    r++, l = t.indexOf(n, l + n.length);
  return r;
}
function Yu(e) {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function Qu(e, n, t) {
  const l = _t((t || {}).ignore || []), o = Xu(n);
  let i = -1;
  for (; ++i < o.length; )
    Ei(e, "text", a);
  function a(u, f) {
    let c = -1, h;
    for (; ++c < f.length; ) {
      const p = f[c], g = h ? h.children : void 0;
      if (l(
        p,
        g ? g.indexOf(p) : void 0,
        h
      ))
        return;
      h = p;
    }
    if (h)
      return s(u, f);
  }
  function s(u, f) {
    const c = f[f.length - 1], h = o[i][0], p = o[i][1];
    let g = 0;
    const C = c.children.indexOf(u);
    let x = !1, S = [];
    h.lastIndex = 0;
    let k = h.exec(u.value);
    for (; k; ) {
      const L = k.index, _ = {
        index: k.index,
        input: k.input,
        stack: [...f, u]
      };
      let w = p(...k, _);
      if (typeof w == "string" && (w = w.length > 0 ? { type: "text", value: w } : void 0), w === !1 ? h.lastIndex = L + 1 : (g !== L && S.push({
        type: "text",
        value: u.value.slice(g, L)
      }), Array.isArray(w) ? S.push(...w) : w && S.push(w), g = L + k[0].length, x = !0), !h.global)
        break;
      k = h.exec(u.value);
    }
    return x ? (g < u.value.length && S.push({ type: "text", value: u.value.slice(g) }), c.children.splice(C, 1, ...S)) : S = [u], C + S.length;
  }
}
function Xu(e) {
  const n = [];
  if (!Array.isArray(e))
    throw new TypeError("Expected find and replace tuple or list of tuples");
  const t = !e[0] || Array.isArray(e[0]) ? e : [e];
  let r = -1;
  for (; ++r < t.length; ) {
    const l = t[r];
    n.push([Ku(l[0]), Gu(l[1])]);
  }
  return n;
}
function Ku(e) {
  return typeof e == "string" ? new RegExp(Yu(e), "g") : e;
}
function Gu(e) {
  return typeof e == "function" ? e : function() {
    return e;
  };
}
const Kt = "phrasing", Gt = ["autolink", "link", "image", "label"];
function Ju() {
  return {
    transforms: [lc],
    enter: {
      literalAutolink: ec,
      literalAutolinkEmail: Jt,
      literalAutolinkHttp: Jt,
      literalAutolinkWww: Jt
    },
    exit: {
      literalAutolink: ic,
      literalAutolinkEmail: rc,
      literalAutolinkHttp: tc,
      literalAutolinkWww: nc
    }
  };
}
function Zu() {
  return {
    unsafe: [
      {
        character: "@",
        before: "[+\\-.\\w]",
        after: "[\\-.\\w]",
        inConstruct: Kt,
        notInConstruct: Gt
      },
      {
        character: ".",
        before: "[Ww]",
        after: "[\\-.\\w]",
        inConstruct: Kt,
        notInConstruct: Gt
      },
      {
        character: ":",
        before: "[ps]",
        after: "\\/",
        inConstruct: Kt,
        notInConstruct: Gt
      }
    ]
  };
}
function ec(e) {
  this.enter({ type: "link", title: null, url: "", children: [] }, e);
}
function Jt(e) {
  this.config.enter.autolinkProtocol.call(this, e);
}
function tc(e) {
  this.config.exit.autolinkProtocol.call(this, e);
}
function nc(e) {
  this.config.exit.data.call(this, e);
  const n = this.stack[this.stack.length - 1];
  n.type, n.url = "http://" + this.sliceSerialize(e);
}
function rc(e) {
  this.config.exit.autolinkEmail.call(this, e);
}
function ic(e) {
  this.exit(e);
}
function lc(e) {
  Qu(
    e,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, oc],
      [new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)", "gu"), ac]
    ],
    { ignore: ["link", "linkReference"] }
  );
}
function oc(e, n, t, r, l) {
  let o = "";
  if (!Ai(l) || (/^w/i.test(n) && (t = n + t, n = "", o = "http://"), !sc(t)))
    return !1;
  const i = uc(t + r);
  if (!i[0]) return !1;
  const a = {
    type: "link",
    title: null,
    url: o + n + i[0],
    children: [{ type: "text", value: n + i[0] }]
  };
  return i[1] ? [a, { type: "text", value: i[1] }] : a;
}
function ac(e, n, t, r) {
  return (
    // Not an expected previous character.
    !Ai(r, !0) || // Label ends in not allowed character.
    /[-\d_]$/.test(t) ? !1 : {
      type: "link",
      title: null,
      url: "mailto:" + n + "@" + t,
      children: [{ type: "text", value: n + "@" + t }]
    }
  );
}
function sc(e) {
  const n = e.split(".");
  return !(n.length < 2 || n[n.length - 1] && (/_/.test(n[n.length - 1]) || !/[a-zA-Z\d]/.test(n[n.length - 1])) || n[n.length - 2] && (/_/.test(n[n.length - 2]) || !/[a-zA-Z\d]/.test(n[n.length - 2])));
}
function uc(e) {
  const n = /[!"&'),.:;<>?\]}]+$/.exec(e);
  if (!n)
    return [e, void 0];
  e = e.slice(0, n.index);
  let t = n[0], r = t.indexOf(")");
  const l = Sr(e, "(");
  let o = Sr(e, ")");
  for (; r !== -1 && l > o; )
    e += t.slice(0, r + 1), t = t.slice(r + 1), r = t.indexOf(")"), o++;
  return [e, t];
}
function Ai(e, n) {
  const t = e.input.charCodeAt(e.index - 1);
  return (e.index === 0 || We(t) || Dt(t)) && // If it’s an email, the previous character should not be a slash.
  (!n || t !== 47);
}
Pi.peek = yc;
function cc() {
  this.buffer();
}
function fc(e) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, e);
}
function pc() {
  this.buffer();
}
function hc(e) {
  this.enter(
    { type: "footnoteDefinition", identifier: "", label: "", children: [] },
    e
  );
}
function dc(e) {
  const n = this.resume(), t = this.stack[this.stack.length - 1];
  t.type, t.identifier = Ie(
    this.sliceSerialize(e)
  ).toLowerCase(), t.label = n;
}
function mc(e) {
  this.exit(e);
}
function gc(e) {
  const n = this.resume(), t = this.stack[this.stack.length - 1];
  t.type, t.identifier = Ie(
    this.sliceSerialize(e)
  ).toLowerCase(), t.label = n;
}
function xc(e) {
  this.exit(e);
}
function yc() {
  return "[";
}
function Pi(e, n, t, r) {
  const l = t.createTracker(r);
  let o = l.move("[^");
  const i = t.enter("footnoteReference"), a = t.enter("reference");
  return o += l.move(
    t.safe(t.associationId(e), { after: "]", before: o })
  ), a(), i(), o += l.move("]"), o;
}
function bc() {
  return {
    enter: {
      gfmFootnoteCallString: cc,
      gfmFootnoteCall: fc,
      gfmFootnoteDefinitionLabelString: pc,
      gfmFootnoteDefinition: hc
    },
    exit: {
      gfmFootnoteCallString: dc,
      gfmFootnoteCall: mc,
      gfmFootnoteDefinitionLabelString: gc,
      gfmFootnoteDefinition: xc
    }
  };
}
function kc(e) {
  let n = !1;
  return e && e.firstLineBlank && (n = !0), {
    handlers: { footnoteDefinition: t, footnoteReference: Pi },
    // This is on by default already.
    unsafe: [{ character: "[", inConstruct: ["label", "phrasing", "reference"] }]
  };
  function t(r, l, o, i) {
    const a = o.createTracker(i);
    let s = a.move("[^");
    const u = o.enter("footnoteDefinition"), f = o.enter("label");
    return s += a.move(
      o.safe(o.associationId(r), { before: s, after: "]" })
    ), f(), s += a.move("]:"), r.children && r.children.length > 0 && (a.shift(4), s += a.move(
      (n ? `
` : " ") + o.indentLines(
        o.containerFlow(r, a.current()),
        n ? zi : wc
      )
    )), u(), s;
  }
}
function wc(e, n, t) {
  return n === 0 ? e : zi(e, n, t);
}
function zi(e, n, t) {
  return (t ? "" : "    ") + e;
}
const vc = [
  "autolink",
  "destinationLiteral",
  "destinationRaw",
  "reference",
  "titleQuote",
  "titleApostrophe"
];
Li.peek = Tc;
function Cc() {
  return {
    canContainEols: ["delete"],
    enter: { strikethrough: Ec },
    exit: { strikethrough: Ic }
  };
}
function Sc() {
  return {
    unsafe: [
      {
        character: "~",
        inConstruct: "phrasing",
        notInConstruct: vc
      }
    ],
    handlers: { delete: Li }
  };
}
function Ec(e) {
  this.enter({ type: "delete", children: [] }, e);
}
function Ic(e) {
  this.exit(e);
}
function Li(e, n, t, r) {
  const l = t.createTracker(r), o = t.enter("strikethrough");
  let i = l.move("~~");
  return i += t.containerPhrasing(e, {
    ...l.current(),
    before: i,
    after: "~"
  }), i += l.move("~~"), o(), i;
}
function Tc() {
  return "~";
}
function Ac(e) {
  return e.length;
}
function Pc(e, n) {
  const t = n || {}, r = (t.align || []).concat(), l = t.stringLength || Ac, o = [], i = [], a = [], s = [];
  let u = 0, f = -1;
  for (; ++f < e.length; ) {
    const y = [], C = [];
    let x = -1;
    for (e[f].length > u && (u = e[f].length); ++x < e[f].length; ) {
      const S = zc(e[f][x]);
      if (t.alignDelimiters !== !1) {
        const k = l(S);
        C[x] = k, (s[x] === void 0 || k > s[x]) && (s[x] = k);
      }
      y.push(S);
    }
    i[f] = y, a[f] = C;
  }
  let c = -1;
  if (typeof r == "object" && "length" in r)
    for (; ++c < u; )
      o[c] = Er(r[c]);
  else {
    const y = Er(r);
    for (; ++c < u; )
      o[c] = y;
  }
  c = -1;
  const h = [], p = [];
  for (; ++c < u; ) {
    const y = o[c];
    let C = "", x = "";
    y === 99 ? (C = ":", x = ":") : y === 108 ? C = ":" : y === 114 && (x = ":");
    let S = t.alignDelimiters === !1 ? 1 : Math.max(
      1,
      s[c] - C.length - x.length
    );
    const k = C + "-".repeat(S) + x;
    t.alignDelimiters !== !1 && (S = C.length + S + x.length, S > s[c] && (s[c] = S), p[c] = S), h[c] = k;
  }
  i.splice(1, 0, h), a.splice(1, 0, p), f = -1;
  const g = [];
  for (; ++f < i.length; ) {
    const y = i[f], C = a[f];
    c = -1;
    const x = [];
    for (; ++c < u; ) {
      const S = y[c] || "";
      let k = "", L = "";
      if (t.alignDelimiters !== !1) {
        const _ = s[c] - (C[c] || 0), w = o[c];
        w === 114 ? k = " ".repeat(_) : w === 99 ? _ % 2 ? (k = " ".repeat(_ / 2 + 0.5), L = " ".repeat(_ / 2 - 0.5)) : (k = " ".repeat(_ / 2), L = k) : L = " ".repeat(_);
      }
      t.delimiterStart !== !1 && !c && x.push("|"), t.padding !== !1 && // Don’t add the opening space if we’re not aligning and the cell is
      // empty: there will be a closing space.
      !(t.alignDelimiters === !1 && S === "") && (t.delimiterStart !== !1 || c) && x.push(" "), t.alignDelimiters !== !1 && x.push(k), x.push(S), t.alignDelimiters !== !1 && x.push(L), t.padding !== !1 && x.push(" "), (t.delimiterEnd !== !1 || c !== u - 1) && x.push("|");
    }
    g.push(
      t.delimiterEnd === !1 ? x.join("").replace(/ +$/, "") : x.join("")
    );
  }
  return g.join(`
`);
}
function zc(e) {
  return e == null ? "" : String(e);
}
function Er(e) {
  const n = typeof e == "string" ? e.codePointAt(0) : 0;
  return n === 67 || n === 99 ? 99 : n === 76 || n === 108 ? 108 : n === 82 || n === 114 ? 114 : 0;
}
function Lc(e, n, t, r) {
  const l = t.enter("blockquote"), o = t.createTracker(r);
  o.move("> "), o.shift(2);
  const i = t.indentLines(
    t.containerFlow(e, o.current()),
    Dc
  );
  return l(), i;
}
function Dc(e, n, t) {
  return ">" + (t ? "" : " ") + e;
}
function Fc(e, n) {
  return Ir(e, n.inConstruct, !0) && !Ir(e, n.notInConstruct, !1);
}
function Ir(e, n, t) {
  if (typeof n == "string" && (n = [n]), !n || n.length === 0)
    return t;
  let r = -1;
  for (; ++r < n.length; )
    if (e.includes(n[r]))
      return !0;
  return !1;
}
function Tr(e, n, t, r) {
  let l = -1;
  for (; ++l < t.unsafe.length; )
    if (t.unsafe[l].character === `
` && Fc(t.stack, t.unsafe[l]))
      return /[ \t]/.test(r.before) ? "" : " ";
  return `\\
`;
}
function Nc(e, n) {
  const t = String(e);
  let r = t.indexOf(n), l = r, o = 0, i = 0;
  if (typeof n != "string")
    throw new TypeError("Expected substring");
  for (; r !== -1; )
    r === l ? ++o > i && (i = o) : o = 1, l = r + n.length, r = t.indexOf(n, l);
  return i;
}
function _c(e, n) {
  return !!(n.options.fences === !1 && e.value && // If there’s no info…
  !e.lang && // And there’s a non-whitespace character…
  /[^ \r\n]/.test(e.value) && // And the value doesn’t start or end in a blank…
  !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value));
}
function Rc(e) {
  const n = e.options.fence || "`";
  if (n !== "`" && n !== "~")
    throw new Error(
      "Cannot serialize code with `" + n + "` for `options.fence`, expected `` ` `` or `~`"
    );
  return n;
}
function Oc(e, n, t, r) {
  const l = Rc(t), o = e.value || "", i = l === "`" ? "GraveAccent" : "Tilde";
  if (_c(e, t)) {
    const c = t.enter("codeIndented"), h = t.indentLines(o, Mc);
    return c(), h;
  }
  const a = t.createTracker(r), s = l.repeat(Math.max(Nc(o, l) + 1, 3)), u = t.enter("codeFenced");
  let f = a.move(s);
  if (e.lang) {
    const c = t.enter(`codeFencedLang${i}`);
    f += a.move(
      t.safe(e.lang, {
        before: f,
        after: " ",
        encode: ["`"],
        ...a.current()
      })
    ), c();
  }
  if (e.lang && e.meta) {
    const c = t.enter(`codeFencedMeta${i}`);
    f += a.move(" "), f += a.move(
      t.safe(e.meta, {
        before: f,
        after: `
`,
        encode: ["`"],
        ...a.current()
      })
    ), c();
  }
  return f += a.move(`
`), o && (f += a.move(o + `
`)), f += a.move(s), u(), f;
}
function Mc(e, n, t) {
  return (t ? "" : "    ") + e;
}
function Fn(e) {
  const n = e.options.quote || '"';
  if (n !== '"' && n !== "'")
    throw new Error(
      "Cannot serialize title with `" + n + "` for `options.quote`, expected `\"`, or `'`"
    );
  return n;
}
function Bc(e, n, t, r) {
  const l = Fn(t), o = l === '"' ? "Quote" : "Apostrophe", i = t.enter("definition");
  let a = t.enter("label");
  const s = t.createTracker(r);
  let u = s.move("[");
  return u += s.move(
    t.safe(t.associationId(e), {
      before: u,
      after: "]",
      ...s.current()
    })
  ), u += s.move("]: "), a(), // If there’s no url, or…
  !e.url || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (a = t.enter("destinationLiteral"), u += s.move("<"), u += s.move(
    t.safe(e.url, { before: u, after: ">", ...s.current() })
  ), u += s.move(">")) : (a = t.enter("destinationRaw"), u += s.move(
    t.safe(e.url, {
      before: u,
      after: e.title ? " " : `
`,
      ...s.current()
    })
  )), a(), e.title && (a = t.enter(`title${o}`), u += s.move(" " + l), u += s.move(
    t.safe(e.title, {
      before: u,
      after: l,
      ...s.current()
    })
  ), u += s.move(l), a()), i(), u;
}
function $c(e) {
  const n = e.options.emphasis || "*";
  if (n !== "*" && n !== "_")
    throw new Error(
      "Cannot serialize emphasis with `" + n + "` for `options.emphasis`, expected `*`, or `_`"
    );
  return n;
}
function ht(e) {
  return "&#x" + e.toString(16).toUpperCase() + ";";
}
function zt(e, n, t) {
  const r = Ge(e), l = Ge(n);
  return r === void 0 ? l === void 0 ? (
    // Letter inside:
    // we have to encode *both* letters for `_` as it is looser.
    // it already forms for `*` (and GFMs `~`).
    t === "_" ? { inside: !0, outside: !0 } : { inside: !1, outside: !1 }
  ) : l === 1 ? (
    // Whitespace inside: encode both (letter, whitespace).
    { inside: !0, outside: !0 }
  ) : (
    // Punctuation inside: encode outer (letter)
    { inside: !1, outside: !0 }
  ) : r === 1 ? l === void 0 ? (
    // Letter inside: already forms.
    { inside: !1, outside: !1 }
  ) : l === 1 ? (
    // Whitespace inside: encode both (whitespace).
    { inside: !0, outside: !0 }
  ) : (
    // Punctuation inside: already forms.
    { inside: !1, outside: !1 }
  ) : l === void 0 ? (
    // Letter inside: already forms.
    { inside: !1, outside: !1 }
  ) : l === 1 ? (
    // Whitespace inside: encode inner (whitespace).
    { inside: !0, outside: !1 }
  ) : (
    // Punctuation inside: already forms.
    { inside: !1, outside: !1 }
  );
}
Di.peek = jc;
function Di(e, n, t, r) {
  const l = $c(t), o = t.enter("emphasis"), i = t.createTracker(r), a = i.move(l);
  let s = i.move(
    t.containerPhrasing(e, {
      after: l,
      before: a,
      ...i.current()
    })
  );
  const u = s.charCodeAt(0), f = zt(
    r.before.charCodeAt(r.before.length - 1),
    u,
    l
  );
  f.inside && (s = ht(u) + s.slice(1));
  const c = s.charCodeAt(s.length - 1), h = zt(r.after.charCodeAt(0), c, l);
  h.inside && (s = s.slice(0, -1) + ht(c));
  const p = i.move(l);
  return o(), t.attentionEncodeSurroundingInfo = {
    after: h.outside,
    before: f.outside
  }, a + s + p;
}
function jc(e, n, t) {
  return t.options.emphasis || "*";
}
function Hc(e, n) {
  let t = !1;
  return Ln(e, function(r) {
    if ("value" in r && /\r?\n|\r/.test(r.value) || r.type === "break")
      return t = !0, cn;
  }), !!((!e.depth || e.depth < 3) && Sn(e) && (n.options.setext || t));
}
function Uc(e, n, t, r) {
  const l = Math.max(Math.min(6, e.depth || 1), 1), o = t.createTracker(r);
  if (Hc(e, t)) {
    const f = t.enter("headingSetext"), c = t.enter("phrasing"), h = t.containerPhrasing(e, {
      ...o.current(),
      before: `
`,
      after: `
`
    });
    return c(), f(), h + `
` + (l === 1 ? "=" : "-").repeat(
      // The whole size…
      h.length - // Minus the position of the character after the last EOL (or
      // 0 if there is none)…
      (Math.max(h.lastIndexOf("\r"), h.lastIndexOf(`
`)) + 1)
    );
  }
  const i = "#".repeat(l), a = t.enter("headingAtx"), s = t.enter("phrasing");
  o.move(i + " ");
  let u = t.containerPhrasing(e, {
    before: "# ",
    after: `
`,
    ...o.current()
  });
  return /^[\t ]/.test(u) && (u = ht(u.charCodeAt(0)) + u.slice(1)), u = u ? i + " " + u : i, t.options.closeAtx && (u += " " + i), s(), a(), u;
}
Fi.peek = Vc;
function Fi(e) {
  return e.value || "";
}
function Vc() {
  return "<";
}
Ni.peek = qc;
function Ni(e, n, t, r) {
  const l = Fn(t), o = l === '"' ? "Quote" : "Apostrophe", i = t.enter("image");
  let a = t.enter("label");
  const s = t.createTracker(r);
  let u = s.move("![");
  return u += s.move(
    t.safe(e.alt, { before: u, after: "]", ...s.current() })
  ), u += s.move("]("), a(), // If there’s no url but there is a title…
  !e.url && e.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (a = t.enter("destinationLiteral"), u += s.move("<"), u += s.move(
    t.safe(e.url, { before: u, after: ">", ...s.current() })
  ), u += s.move(">")) : (a = t.enter("destinationRaw"), u += s.move(
    t.safe(e.url, {
      before: u,
      after: e.title ? " " : ")",
      ...s.current()
    })
  )), a(), e.title && (a = t.enter(`title${o}`), u += s.move(" " + l), u += s.move(
    t.safe(e.title, {
      before: u,
      after: l,
      ...s.current()
    })
  ), u += s.move(l), a()), u += s.move(")"), i(), u;
}
function qc() {
  return "!";
}
_i.peek = Wc;
function _i(e, n, t, r) {
  const l = e.referenceType, o = t.enter("imageReference");
  let i = t.enter("label");
  const a = t.createTracker(r);
  let s = a.move("![");
  const u = t.safe(e.alt, {
    before: s,
    after: "]",
    ...a.current()
  });
  s += a.move(u + "]["), i();
  const f = t.stack;
  t.stack = [], i = t.enter("reference");
  const c = t.safe(t.associationId(e), {
    before: s,
    after: "]",
    ...a.current()
  });
  return i(), t.stack = f, o(), l === "full" || !u || u !== c ? s += a.move(c + "]") : l === "shortcut" ? s = s.slice(0, -1) : s += a.move("]"), s;
}
function Wc() {
  return "!";
}
Ri.peek = Yc;
function Ri(e, n, t) {
  let r = e.value || "", l = "`", o = -1;
  for (; new RegExp("(^|[^`])" + l + "([^`]|$)").test(r); )
    l += "`";
  for (/[^ \r\n]/.test(r) && (/^[ \r\n]/.test(r) && /[ \r\n]$/.test(r) || /^`|`$/.test(r)) && (r = " " + r + " "); ++o < t.unsafe.length; ) {
    const i = t.unsafe[o], a = t.compilePattern(i);
    let s;
    if (i.atBreak)
      for (; s = a.exec(r); ) {
        let u = s.index;
        r.charCodeAt(u) === 10 && r.charCodeAt(u - 1) === 13 && u--, r = r.slice(0, u) + " " + r.slice(s.index + 1);
      }
  }
  return l + r + l;
}
function Yc() {
  return "`";
}
function Oi(e, n) {
  const t = Sn(e);
  return !!(!n.options.resourceLink && // If there’s a url…
  e.url && // And there’s a no title…
  !e.title && // And the content of `node` is a single text node…
  e.children && e.children.length === 1 && e.children[0].type === "text" && // And if the url is the same as the content…
  (t === e.url || "mailto:" + t === e.url) && // And that starts w/ a protocol…
  /^[a-z][a-z+.-]+:/i.test(e.url) && // And that doesn’t contain ASCII control codes (character escapes and
  // references don’t work), space, or angle brackets…
  !/[\0- <>\u007F]/.test(e.url));
}
Mi.peek = Qc;
function Mi(e, n, t, r) {
  const l = Fn(t), o = l === '"' ? "Quote" : "Apostrophe", i = t.createTracker(r);
  let a, s;
  if (Oi(e, t)) {
    const f = t.stack;
    t.stack = [], a = t.enter("autolink");
    let c = i.move("<");
    return c += i.move(
      t.containerPhrasing(e, {
        before: c,
        after: ">",
        ...i.current()
      })
    ), c += i.move(">"), a(), t.stack = f, c;
  }
  a = t.enter("link"), s = t.enter("label");
  let u = i.move("[");
  return u += i.move(
    t.containerPhrasing(e, {
      before: u,
      after: "](",
      ...i.current()
    })
  ), u += i.move("]("), s(), // If there’s no url but there is a title…
  !e.url && e.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (s = t.enter("destinationLiteral"), u += i.move("<"), u += i.move(
    t.safe(e.url, { before: u, after: ">", ...i.current() })
  ), u += i.move(">")) : (s = t.enter("destinationRaw"), u += i.move(
    t.safe(e.url, {
      before: u,
      after: e.title ? " " : ")",
      ...i.current()
    })
  )), s(), e.title && (s = t.enter(`title${o}`), u += i.move(" " + l), u += i.move(
    t.safe(e.title, {
      before: u,
      after: l,
      ...i.current()
    })
  ), u += i.move(l), s()), u += i.move(")"), a(), u;
}
function Qc(e, n, t) {
  return Oi(e, t) ? "<" : "[";
}
Bi.peek = Xc;
function Bi(e, n, t, r) {
  const l = e.referenceType, o = t.enter("linkReference");
  let i = t.enter("label");
  const a = t.createTracker(r);
  let s = a.move("[");
  const u = t.containerPhrasing(e, {
    before: s,
    after: "]",
    ...a.current()
  });
  s += a.move(u + "]["), i();
  const f = t.stack;
  t.stack = [], i = t.enter("reference");
  const c = t.safe(t.associationId(e), {
    before: s,
    after: "]",
    ...a.current()
  });
  return i(), t.stack = f, o(), l === "full" || !u || u !== c ? s += a.move(c + "]") : l === "shortcut" ? s = s.slice(0, -1) : s += a.move("]"), s;
}
function Xc() {
  return "[";
}
function Nn(e) {
  const n = e.options.bullet || "*";
  if (n !== "*" && n !== "+" && n !== "-")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.bullet`, expected `*`, `+`, or `-`"
    );
  return n;
}
function Kc(e) {
  const n = Nn(e), t = e.options.bulletOther;
  if (!t)
    return n === "*" ? "-" : "*";
  if (t !== "*" && t !== "+" && t !== "-")
    throw new Error(
      "Cannot serialize items with `" + t + "` for `options.bulletOther`, expected `*`, `+`, or `-`"
    );
  if (t === n)
    throw new Error(
      "Expected `bullet` (`" + n + "`) and `bulletOther` (`" + t + "`) to be different"
    );
  return t;
}
function Gc(e) {
  const n = e.options.bulletOrdered || ".";
  if (n !== "." && n !== ")")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.bulletOrdered`, expected `.` or `)`"
    );
  return n;
}
function $i(e) {
  const n = e.options.rule || "*";
  if (n !== "*" && n !== "-" && n !== "_")
    throw new Error(
      "Cannot serialize rules with `" + n + "` for `options.rule`, expected `*`, `-`, or `_`"
    );
  return n;
}
function Jc(e, n, t, r) {
  const l = t.enter("list"), o = t.bulletCurrent;
  let i = e.ordered ? Gc(t) : Nn(t);
  const a = e.ordered ? i === "." ? ")" : "." : Kc(t);
  let s = n && t.bulletLastUsed ? i === t.bulletLastUsed : !1;
  if (!e.ordered) {
    const f = e.children ? e.children[0] : void 0;
    if (
      // Bullet could be used as a thematic break marker:
      (i === "*" || i === "-") && // Empty first list item:
      f && (!f.children || !f.children[0]) && // Directly in two other list items:
      t.stack[t.stack.length - 1] === "list" && t.stack[t.stack.length - 2] === "listItem" && t.stack[t.stack.length - 3] === "list" && t.stack[t.stack.length - 4] === "listItem" && // That are each the first child.
      t.indexStack[t.indexStack.length - 1] === 0 && t.indexStack[t.indexStack.length - 2] === 0 && t.indexStack[t.indexStack.length - 3] === 0 && (s = !0), $i(t) === i && f
    ) {
      let c = -1;
      for (; ++c < e.children.length; ) {
        const h = e.children[c];
        if (h && h.type === "listItem" && h.children && h.children[0] && h.children[0].type === "thematicBreak") {
          s = !0;
          break;
        }
      }
    }
  }
  s && (i = a), t.bulletCurrent = i;
  const u = t.containerFlow(e, r);
  return t.bulletLastUsed = i, t.bulletCurrent = o, l(), u;
}
function Zc(e) {
  const n = e.options.listItemIndent || "one";
  if (n !== "tab" && n !== "one" && n !== "mixed")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
    );
  return n;
}
function ef(e, n, t, r) {
  const l = Zc(t);
  let o = t.bulletCurrent || Nn(t);
  n && n.type === "list" && n.ordered && (o = (typeof n.start == "number" && n.start > -1 ? n.start : 1) + (t.options.incrementListMarker === !1 ? 0 : n.children.indexOf(e)) + o);
  let i = o.length + 1;
  (l === "tab" || l === "mixed" && (n && n.type === "list" && n.spread || e.spread)) && (i = Math.ceil(i / 4) * 4);
  const a = t.createTracker(r);
  a.move(o + " ".repeat(i - o.length)), a.shift(i);
  const s = t.enter("listItem"), u = t.indentLines(
    t.containerFlow(e, a.current()),
    f
  );
  return s(), u;
  function f(c, h, p) {
    return h ? (p ? "" : " ".repeat(i)) + c : (p ? o : o + " ".repeat(i - o.length)) + c;
  }
}
function tf(e, n, t, r) {
  const l = t.enter("paragraph"), o = t.enter("phrasing"), i = t.containerPhrasing(e, r);
  return o(), l(), i;
}
const nf = (
  /** @type {(node?: unknown) => node is Exclude<PhrasingContent, Html>} */
  _t([
    "break",
    "delete",
    "emphasis",
    // To do: next major: removed since footnotes were added to GFM.
    "footnote",
    "footnoteReference",
    "image",
    "imageReference",
    "inlineCode",
    // Enabled by `mdast-util-math`:
    "inlineMath",
    "link",
    "linkReference",
    // Enabled by `mdast-util-mdx`:
    "mdxJsxTextElement",
    // Enabled by `mdast-util-mdx`:
    "mdxTextExpression",
    "strong",
    "text",
    // Enabled by `mdast-util-directive`:
    "textDirective"
  ])
);
function rf(e, n, t, r) {
  return (e.children.some(function(i) {
    return nf(i);
  }) ? t.containerPhrasing : t.containerFlow).call(t, e, r);
}
function lf(e) {
  const n = e.options.strong || "*";
  if (n !== "*" && n !== "_")
    throw new Error(
      "Cannot serialize strong with `" + n + "` for `options.strong`, expected `*`, or `_`"
    );
  return n;
}
ji.peek = of;
function ji(e, n, t, r) {
  const l = lf(t), o = t.enter("strong"), i = t.createTracker(r), a = i.move(l + l);
  let s = i.move(
    t.containerPhrasing(e, {
      after: l,
      before: a,
      ...i.current()
    })
  );
  const u = s.charCodeAt(0), f = zt(
    r.before.charCodeAt(r.before.length - 1),
    u,
    l
  );
  f.inside && (s = ht(u) + s.slice(1));
  const c = s.charCodeAt(s.length - 1), h = zt(r.after.charCodeAt(0), c, l);
  h.inside && (s = s.slice(0, -1) + ht(c));
  const p = i.move(l + l);
  return o(), t.attentionEncodeSurroundingInfo = {
    after: h.outside,
    before: f.outside
  }, a + s + p;
}
function of(e, n, t) {
  return t.options.strong || "*";
}
function af(e, n, t, r) {
  return t.safe(e.value, r);
}
function sf(e) {
  const n = e.options.ruleRepetition || 3;
  if (n < 3)
    throw new Error(
      "Cannot serialize rules with repetition `" + n + "` for `options.ruleRepetition`, expected `3` or more"
    );
  return n;
}
function uf(e, n, t) {
  const r = ($i(t) + (t.options.ruleSpaces ? " " : "")).repeat(sf(t));
  return t.options.ruleSpaces ? r.slice(0, -1) : r;
}
const Hi = {
  blockquote: Lc,
  break: Tr,
  code: Oc,
  definition: Bc,
  emphasis: Di,
  hardBreak: Tr,
  heading: Uc,
  html: Fi,
  image: Ni,
  imageReference: _i,
  inlineCode: Ri,
  link: Mi,
  linkReference: Bi,
  list: Jc,
  listItem: ef,
  paragraph: tf,
  root: rf,
  strong: ji,
  text: af,
  thematicBreak: uf
};
function cf() {
  return {
    enter: {
      table: ff,
      tableData: Ar,
      tableHeader: Ar,
      tableRow: hf
    },
    exit: {
      codeText: df,
      table: pf,
      tableData: Zt,
      tableHeader: Zt,
      tableRow: Zt
    }
  };
}
function ff(e) {
  const n = e._align;
  this.enter(
    {
      type: "table",
      align: n.map(function(t) {
        return t === "none" ? null : t;
      }),
      children: []
    },
    e
  ), this.data.inTable = !0;
}
function pf(e) {
  this.exit(e), this.data.inTable = void 0;
}
function hf(e) {
  this.enter({ type: "tableRow", children: [] }, e);
}
function Zt(e) {
  this.exit(e);
}
function Ar(e) {
  this.enter({ type: "tableCell", children: [] }, e);
}
function df(e) {
  let n = this.resume();
  this.data.inTable && (n = n.replace(/\\([\\|])/g, mf));
  const t = this.stack[this.stack.length - 1];
  t.type, t.value = n, this.exit(e);
}
function mf(e, n) {
  return n === "|" ? n : e;
}
function gf(e) {
  const n = e || {}, t = n.tableCellPadding, r = n.tablePipeAlign, l = n.stringLength, o = t ? " " : "|";
  return {
    unsafe: [
      { character: "\r", inConstruct: "tableCell" },
      { character: `
`, inConstruct: "tableCell" },
      // A pipe, when followed by a tab or space (padding), or a dash or colon
      // (unpadded delimiter row), could result in a table.
      { atBreak: !0, character: "|", after: "[	 :-]" },
      // A pipe in a cell must be encoded.
      { character: "|", inConstruct: "tableCell" },
      // A colon must be followed by a dash, in which case it could start a
      // delimiter row.
      { atBreak: !0, character: ":", after: "-" },
      // A delimiter row can also start with a dash, when followed by more
      // dashes, a colon, or a pipe.
      // This is a stricter version than the built in check for lists, thematic
      // breaks, and setex heading underlines though:
      // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/51a2038/lib/unsafe.js#L57>
      { atBreak: !0, character: "-", after: "[:|-]" }
    ],
    handlers: {
      inlineCode: h,
      table: i,
      tableCell: s,
      tableRow: a
    }
  };
  function i(p, g, y, C) {
    return u(f(p, y, C), p.align);
  }
  function a(p, g, y, C) {
    const x = c(p, y, C), S = u([x]);
    return S.slice(0, S.indexOf(`
`));
  }
  function s(p, g, y, C) {
    const x = y.enter("tableCell"), S = y.enter("phrasing"), k = y.containerPhrasing(p, {
      ...C,
      before: o,
      after: o
    });
    return S(), x(), k;
  }
  function u(p, g) {
    return Pc(p, {
      align: g,
      // @ts-expect-error: `markdown-table` types should support `null`.
      alignDelimiters: r,
      // @ts-expect-error: `markdown-table` types should support `null`.
      padding: t,
      // @ts-expect-error: `markdown-table` types should support `null`.
      stringLength: l
    });
  }
  function f(p, g, y) {
    const C = p.children;
    let x = -1;
    const S = [], k = g.enter("table");
    for (; ++x < C.length; )
      S[x] = c(C[x], g, y);
    return k(), S;
  }
  function c(p, g, y) {
    const C = p.children;
    let x = -1;
    const S = [], k = g.enter("tableRow");
    for (; ++x < C.length; )
      S[x] = s(C[x], p, g, y);
    return k(), S;
  }
  function h(p, g, y) {
    let C = Hi.inlineCode(p, g, y);
    return y.stack.includes("tableCell") && (C = C.replace(/\|/g, "\\$&")), C;
  }
}
function xf() {
  return {
    exit: {
      taskListCheckValueChecked: Pr,
      taskListCheckValueUnchecked: Pr,
      paragraph: bf
    }
  };
}
function yf() {
  return {
    unsafe: [{ atBreak: !0, character: "-", after: "[:|-]" }],
    handlers: { listItem: kf }
  };
}
function Pr(e) {
  const n = this.stack[this.stack.length - 2];
  n.type, n.checked = e.type === "taskListCheckValueChecked";
}
function bf(e) {
  const n = this.stack[this.stack.length - 2];
  if (n && n.type === "listItem" && typeof n.checked == "boolean") {
    const t = this.stack[this.stack.length - 1];
    t.type;
    const r = t.children[0];
    if (r && r.type === "text") {
      const l = n.children;
      let o = -1, i;
      for (; ++o < l.length; ) {
        const a = l[o];
        if (a.type === "paragraph") {
          i = a;
          break;
        }
      }
      i === t && (r.value = r.value.slice(1), r.value.length === 0 ? t.children.shift() : t.position && r.position && typeof r.position.start.offset == "number" && (r.position.start.column++, r.position.start.offset++, t.position.start = Object.assign({}, r.position.start)));
    }
  }
  this.exit(e);
}
function kf(e, n, t, r) {
  const l = e.children[0], o = typeof e.checked == "boolean" && l && l.type === "paragraph", i = "[" + (e.checked ? "x" : " ") + "] ", a = t.createTracker(r);
  o && a.move(i);
  let s = Hi.listItem(e, n, t, {
    ...r,
    ...a.current()
  });
  return o && (s = s.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, u)), s;
  function u(f) {
    return f + i;
  }
}
function wf() {
  return [
    Ju(),
    bc(),
    Cc(),
    cf(),
    xf()
  ];
}
function vf(e) {
  return {
    extensions: [
      Zu(),
      kc(e),
      Sc(),
      gf(e),
      yf()
    ]
  };
}
const Cf = {
  tokenize: Pf,
  partial: !0
}, Ui = {
  tokenize: zf,
  partial: !0
}, Vi = {
  tokenize: Lf,
  partial: !0
}, qi = {
  tokenize: Df,
  partial: !0
}, Sf = {
  tokenize: Ff,
  partial: !0
}, Wi = {
  name: "wwwAutolink",
  tokenize: Tf,
  previous: Qi
}, Yi = {
  name: "protocolAutolink",
  tokenize: Af,
  previous: Xi
}, Ne = {
  name: "emailAutolink",
  tokenize: If,
  previous: Ki
}, ze = {};
function Ef() {
  return {
    text: ze
  };
}
let He = 48;
for (; He < 123; )
  ze[He] = Ne, He++, He === 58 ? He = 65 : He === 91 && (He = 97);
ze[43] = Ne;
ze[45] = Ne;
ze[46] = Ne;
ze[95] = Ne;
ze[72] = [Ne, Yi];
ze[104] = [Ne, Yi];
ze[87] = [Ne, Wi];
ze[119] = [Ne, Wi];
function If(e, n, t) {
  const r = this;
  let l, o;
  return i;
  function i(c) {
    return !dn(c) || !Ki.call(r, r.previous) || _n(r.events) ? t(c) : (e.enter("literalAutolink"), e.enter("literalAutolinkEmail"), a(c));
  }
  function a(c) {
    return dn(c) ? (e.consume(c), a) : c === 64 ? (e.consume(c), s) : t(c);
  }
  function s(c) {
    return c === 46 ? e.check(Sf, f, u)(c) : c === 45 || c === 95 || le(c) ? (o = !0, e.consume(c), s) : f(c);
  }
  function u(c) {
    return e.consume(c), l = !0, s;
  }
  function f(c) {
    return o && l && se(r.previous) ? (e.exit("literalAutolinkEmail"), e.exit("literalAutolink"), n(c)) : t(c);
  }
}
function Tf(e, n, t) {
  const r = this;
  return l;
  function l(i) {
    return i !== 87 && i !== 119 || !Qi.call(r, r.previous) || _n(r.events) ? t(i) : (e.enter("literalAutolink"), e.enter("literalAutolinkWww"), e.check(Cf, e.attempt(Ui, e.attempt(Vi, o), t), t)(i));
  }
  function o(i) {
    return e.exit("literalAutolinkWww"), e.exit("literalAutolink"), n(i);
  }
}
function Af(e, n, t) {
  const r = this;
  let l = "", o = !1;
  return i;
  function i(c) {
    return (c === 72 || c === 104) && Xi.call(r, r.previous) && !_n(r.events) ? (e.enter("literalAutolink"), e.enter("literalAutolinkHttp"), l += String.fromCodePoint(c), e.consume(c), a) : t(c);
  }
  function a(c) {
    if (se(c) && l.length < 5)
      return l += String.fromCodePoint(c), e.consume(c), a;
    if (c === 58) {
      const h = l.toLowerCase();
      if (h === "http" || h === "https")
        return e.consume(c), s;
    }
    return t(c);
  }
  function s(c) {
    return c === 47 ? (e.consume(c), o ? u : (o = !0, s)) : t(c);
  }
  function u(c) {
    return c === null || Tt(c) || K(c) || We(c) || Dt(c) ? t(c) : e.attempt(Ui, e.attempt(Vi, f), t)(c);
  }
  function f(c) {
    return e.exit("literalAutolinkHttp"), e.exit("literalAutolink"), n(c);
  }
}
function Pf(e, n, t) {
  let r = 0;
  return l;
  function l(i) {
    return (i === 87 || i === 119) && r < 3 ? (r++, e.consume(i), l) : i === 46 && r === 3 ? (e.consume(i), o) : t(i);
  }
  function o(i) {
    return i === null ? t(i) : n(i);
  }
}
function zf(e, n, t) {
  let r, l, o;
  return i;
  function i(u) {
    return u === 46 || u === 95 ? e.check(qi, s, a)(u) : u === null || K(u) || We(u) || u !== 45 && Dt(u) ? s(u) : (o = !0, e.consume(u), i);
  }
  function a(u) {
    return u === 95 ? r = !0 : (l = r, r = void 0), e.consume(u), i;
  }
  function s(u) {
    return l || r || !o ? t(u) : n(u);
  }
}
function Lf(e, n) {
  let t = 0, r = 0;
  return l;
  function l(i) {
    return i === 40 ? (t++, e.consume(i), l) : i === 41 && r < t ? o(i) : i === 33 || i === 34 || i === 38 || i === 39 || i === 41 || i === 42 || i === 44 || i === 46 || i === 58 || i === 59 || i === 60 || i === 63 || i === 93 || i === 95 || i === 126 ? e.check(qi, n, o)(i) : i === null || K(i) || We(i) ? n(i) : (e.consume(i), l);
  }
  function o(i) {
    return i === 41 && r++, e.consume(i), l;
  }
}
function Df(e, n, t) {
  return r;
  function r(a) {
    return a === 33 || a === 34 || a === 39 || a === 41 || a === 42 || a === 44 || a === 46 || a === 58 || a === 59 || a === 63 || a === 95 || a === 126 ? (e.consume(a), r) : a === 38 ? (e.consume(a), o) : a === 93 ? (e.consume(a), l) : (
      // `<` is an end.
      a === 60 || // So is whitespace.
      a === null || K(a) || We(a) ? n(a) : t(a)
    );
  }
  function l(a) {
    return a === null || a === 40 || a === 91 || K(a) || We(a) ? n(a) : r(a);
  }
  function o(a) {
    return se(a) ? i(a) : t(a);
  }
  function i(a) {
    return a === 59 ? (e.consume(a), r) : se(a) ? (e.consume(a), i) : t(a);
  }
}
function Ff(e, n, t) {
  return r;
  function r(o) {
    return e.consume(o), l;
  }
  function l(o) {
    return le(o) ? t(o) : n(o);
  }
}
function Qi(e) {
  return e === null || e === 40 || e === 42 || e === 95 || e === 91 || e === 93 || e === 126 || K(e);
}
function Xi(e) {
  return !se(e);
}
function Ki(e) {
  return !(e === 47 || dn(e));
}
function dn(e) {
  return e === 43 || e === 45 || e === 46 || e === 95 || le(e);
}
function _n(e) {
  let n = e.length, t = !1;
  for (; n--; ) {
    const r = e[n][1];
    if ((r.type === "labelLink" || r.type === "labelImage") && !r._balanced) {
      t = !0;
      break;
    }
    if (r._gfmAutolinkLiteralWalkedInto) {
      t = !1;
      break;
    }
  }
  return e.length > 0 && !t && (e[e.length - 1][1]._gfmAutolinkLiteralWalkedInto = !0), t;
}
const Nf = {
  tokenize: Hf,
  partial: !0
};
function _f() {
  return {
    document: {
      91: {
        name: "gfmFootnoteDefinition",
        tokenize: Bf,
        continuation: {
          tokenize: $f
        },
        exit: jf
      }
    },
    text: {
      91: {
        name: "gfmFootnoteCall",
        tokenize: Mf
      },
      93: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: Rf,
        resolveTo: Of
      }
    }
  };
}
function Rf(e, n, t) {
  const r = this;
  let l = r.events.length;
  const o = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let i;
  for (; l--; ) {
    const s = r.events[l][1];
    if (s.type === "labelImage") {
      i = s;
      break;
    }
    if (s.type === "gfmFootnoteCall" || s.type === "labelLink" || s.type === "label" || s.type === "image" || s.type === "link")
      break;
  }
  return a;
  function a(s) {
    if (!i || !i._balanced)
      return t(s);
    const u = Ie(r.sliceSerialize({
      start: i.end,
      end: r.now()
    }));
    return u.codePointAt(0) !== 94 || !o.includes(u.slice(1)) ? t(s) : (e.enter("gfmFootnoteCallLabelMarker"), e.consume(s), e.exit("gfmFootnoteCallLabelMarker"), n(s));
  }
}
function Of(e, n) {
  let t = e.length;
  for (; t--; )
    if (e[t][1].type === "labelImage" && e[t][0] === "enter") {
      e[t][1];
      break;
    }
  e[t + 1][1].type = "data", e[t + 3][1].type = "gfmFootnoteCallLabelMarker";
  const r = {
    type: "gfmFootnoteCall",
    start: Object.assign({}, e[t + 3][1].start),
    end: Object.assign({}, e[e.length - 1][1].end)
  }, l = {
    type: "gfmFootnoteCallMarker",
    start: Object.assign({}, e[t + 3][1].end),
    end: Object.assign({}, e[t + 3][1].end)
  };
  l.end.column++, l.end.offset++, l.end._bufferIndex++;
  const o = {
    type: "gfmFootnoteCallString",
    start: Object.assign({}, l.end),
    end: Object.assign({}, e[e.length - 1][1].start)
  }, i = {
    type: "chunkString",
    contentType: "string",
    start: Object.assign({}, o.start),
    end: Object.assign({}, o.end)
  }, a = [
    // Take the `labelImageMarker` (now `data`, the `!`)
    e[t + 1],
    e[t + 2],
    ["enter", r, n],
    // The `[`
    e[t + 3],
    e[t + 4],
    // The `^`.
    ["enter", l, n],
    ["exit", l, n],
    // Everything in between.
    ["enter", o, n],
    ["enter", i, n],
    ["exit", i, n],
    ["exit", o, n],
    // The ending (`]`, properly parsed and labelled).
    e[e.length - 2],
    e[e.length - 1],
    ["exit", r, n]
  ];
  return e.splice(t, e.length - t + 1, ...a), e;
}
function Mf(e, n, t) {
  const r = this, l = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let o = 0, i;
  return a;
  function a(c) {
    return e.enter("gfmFootnoteCall"), e.enter("gfmFootnoteCallLabelMarker"), e.consume(c), e.exit("gfmFootnoteCallLabelMarker"), s;
  }
  function s(c) {
    return c !== 94 ? t(c) : (e.enter("gfmFootnoteCallMarker"), e.consume(c), e.exit("gfmFootnoteCallMarker"), e.enter("gfmFootnoteCallString"), e.enter("chunkString").contentType = "string", u);
  }
  function u(c) {
    if (
      // Too long.
      o > 999 || // Closing brace with nothing.
      c === 93 && !i || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      c === null || c === 91 || K(c)
    )
      return t(c);
    if (c === 93) {
      e.exit("chunkString");
      const h = e.exit("gfmFootnoteCallString");
      return l.includes(Ie(r.sliceSerialize(h))) ? (e.enter("gfmFootnoteCallLabelMarker"), e.consume(c), e.exit("gfmFootnoteCallLabelMarker"), e.exit("gfmFootnoteCall"), n) : t(c);
    }
    return K(c) || (i = !0), o++, e.consume(c), c === 92 ? f : u;
  }
  function f(c) {
    return c === 91 || c === 92 || c === 93 ? (e.consume(c), o++, u) : u(c);
  }
}
function Bf(e, n, t) {
  const r = this, l = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let o, i = 0, a;
  return s;
  function s(g) {
    return e.enter("gfmFootnoteDefinition")._container = !0, e.enter("gfmFootnoteDefinitionLabel"), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(g), e.exit("gfmFootnoteDefinitionLabelMarker"), u;
  }
  function u(g) {
    return g === 94 ? (e.enter("gfmFootnoteDefinitionMarker"), e.consume(g), e.exit("gfmFootnoteDefinitionMarker"), e.enter("gfmFootnoteDefinitionLabelString"), e.enter("chunkString").contentType = "string", f) : t(g);
  }
  function f(g) {
    if (
      // Too long.
      i > 999 || // Closing brace with nothing.
      g === 93 && !a || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      g === null || g === 91 || K(g)
    )
      return t(g);
    if (g === 93) {
      e.exit("chunkString");
      const y = e.exit("gfmFootnoteDefinitionLabelString");
      return o = Ie(r.sliceSerialize(y)), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(g), e.exit("gfmFootnoteDefinitionLabelMarker"), e.exit("gfmFootnoteDefinitionLabel"), h;
    }
    return K(g) || (a = !0), i++, e.consume(g), g === 92 ? c : f;
  }
  function c(g) {
    return g === 91 || g === 92 || g === 93 ? (e.consume(g), i++, f) : f(g);
  }
  function h(g) {
    return g === 58 ? (e.enter("definitionMarker"), e.consume(g), e.exit("definitionMarker"), l.includes(o) || l.push(o), H(e, p, "gfmFootnoteDefinitionWhitespace")) : t(g);
  }
  function p(g) {
    return n(g);
  }
}
function $f(e, n, t) {
  return e.check(mt, n, e.attempt(Nf, n, t));
}
function jf(e) {
  e.exit("gfmFootnoteDefinition");
}
function Hf(e, n, t) {
  const r = this;
  return H(e, l, "gfmFootnoteDefinitionIndent", 5);
  function l(o) {
    const i = r.events[r.events.length - 1];
    return i && i[1].type === "gfmFootnoteDefinitionIndent" && i[2].sliceSerialize(i[1], !0).length === 4 ? n(o) : t(o);
  }
}
function Uf(e) {
  let t = (e || {}).singleTilde;
  const r = {
    name: "strikethrough",
    tokenize: o,
    resolveAll: l
  };
  return t == null && (t = !0), {
    text: {
      126: r
    },
    insideSpan: {
      null: [r]
    },
    attentionMarkers: {
      null: [126]
    }
  };
  function l(i, a) {
    let s = -1;
    for (; ++s < i.length; )
      if (i[s][0] === "enter" && i[s][1].type === "strikethroughSequenceTemporary" && i[s][1]._close) {
        let u = s;
        for (; u--; )
          if (i[u][0] === "exit" && i[u][1].type === "strikethroughSequenceTemporary" && i[u][1]._open && // If the sizes are the same:
          i[s][1].end.offset - i[s][1].start.offset === i[u][1].end.offset - i[u][1].start.offset) {
            i[s][1].type = "strikethroughSequence", i[u][1].type = "strikethroughSequence";
            const f = {
              type: "strikethrough",
              start: Object.assign({}, i[u][1].start),
              end: Object.assign({}, i[s][1].end)
            }, c = {
              type: "strikethroughText",
              start: Object.assign({}, i[u][1].end),
              end: Object.assign({}, i[s][1].start)
            }, h = [["enter", f, a], ["enter", i[u][1], a], ["exit", i[u][1], a], ["enter", c, a]], p = a.parser.constructs.insideSpan.null;
            p && xe(h, h.length, 0, Ft(p, i.slice(u + 1, s), a)), xe(h, h.length, 0, [["exit", c, a], ["enter", i[s][1], a], ["exit", i[s][1], a], ["exit", f, a]]), xe(i, u - 1, s - u + 3, h), s = u + h.length - 2;
            break;
          }
      }
    for (s = -1; ++s < i.length; )
      i[s][1].type === "strikethroughSequenceTemporary" && (i[s][1].type = "data");
    return i;
  }
  function o(i, a, s) {
    const u = this.previous, f = this.events;
    let c = 0;
    return h;
    function h(g) {
      return u === 126 && f[f.length - 1][1].type !== "characterEscape" ? s(g) : (i.enter("strikethroughSequenceTemporary"), p(g));
    }
    function p(g) {
      const y = Ge(u);
      if (g === 126)
        return c > 1 ? s(g) : (i.consume(g), c++, p);
      if (c < 2 && !t) return s(g);
      const C = i.exit("strikethroughSequenceTemporary"), x = Ge(g);
      return C._open = !x || x === 2 && !!y, C._close = !y || y === 2 && !!x, a(g);
    }
  }
}
class Vf {
  /**
   * Create a new edit map.
   */
  constructor() {
    this.map = [];
  }
  /**
   * Create an edit: a remove and/or add at a certain place.
   *
   * @param {number} index
   * @param {number} remove
   * @param {Array<Event>} add
   * @returns {undefined}
   */
  add(n, t, r) {
    qf(this, n, t, r);
  }
  // To do: add this when moving to `micromark`.
  // /**
  //  * Create an edit: but insert `add` before existing additions.
  //  *
  //  * @param {number} index
  //  * @param {number} remove
  //  * @param {Array<Event>} add
  //  * @returns {undefined}
  //  */
  // addBefore(index, remove, add) {
  //   addImplementation(this, index, remove, add, true)
  // }
  /**
   * Done, change the events.
   *
   * @param {Array<Event>} events
   * @returns {undefined}
   */
  consume(n) {
    if (this.map.sort(function(o, i) {
      return o[0] - i[0];
    }), this.map.length === 0)
      return;
    let t = this.map.length;
    const r = [];
    for (; t > 0; )
      t -= 1, r.push(n.slice(this.map[t][0] + this.map[t][1]), this.map[t][2]), n.length = this.map[t][0];
    r.push(n.slice()), n.length = 0;
    let l = r.pop();
    for (; l; ) {
      for (const o of l)
        n.push(o);
      l = r.pop();
    }
    this.map.length = 0;
  }
}
function qf(e, n, t, r) {
  let l = 0;
  if (!(t === 0 && r.length === 0)) {
    for (; l < e.map.length; ) {
      if (e.map[l][0] === n) {
        e.map[l][1] += t, e.map[l][2].push(...r);
        return;
      }
      l += 1;
    }
    e.map.push([n, t, r]);
  }
}
function Wf(e, n) {
  let t = !1;
  const r = [];
  for (; n < e.length; ) {
    const l = e[n];
    if (t) {
      if (l[0] === "enter")
        l[1].type === "tableContent" && r.push(e[n + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
      else if (l[1].type === "tableContent") {
        if (e[n - 1][1].type === "tableDelimiterMarker") {
          const o = r.length - 1;
          r[o] = r[o] === "left" ? "center" : "right";
        }
      } else if (l[1].type === "tableDelimiterRow")
        break;
    } else l[0] === "enter" && l[1].type === "tableDelimiterRow" && (t = !0);
    n += 1;
  }
  return r;
}
function Yf() {
  return {
    flow: {
      null: {
        name: "table",
        tokenize: Qf,
        resolveAll: Xf
      }
    }
  };
}
function Qf(e, n, t) {
  const r = this;
  let l = 0, o = 0, i;
  return a;
  function a(b) {
    let A = r.events.length - 1;
    for (; A > -1; ) {
      const G = r.events[A][1].type;
      if (G === "lineEnding" || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      G === "linePrefix") A--;
      else break;
    }
    const z = A > -1 ? r.events[A][1].type : null, q = z === "tableHead" || z === "tableRow" ? w : s;
    return q === w && r.parser.lazy[r.now().line] ? t(b) : q(b);
  }
  function s(b) {
    return e.enter("tableHead"), e.enter("tableRow"), u(b);
  }
  function u(b) {
    return b === 124 || (i = !0, o += 1), f(b);
  }
  function f(b) {
    return b === null ? t(b) : F(b) ? o > 1 ? (o = 0, r.interrupt = !0, e.exit("tableRow"), e.enter("lineEnding"), e.consume(b), e.exit("lineEnding"), p) : t(b) : B(b) ? H(e, f, "whitespace")(b) : (o += 1, i && (i = !1, l += 1), b === 124 ? (e.enter("tableCellDivider"), e.consume(b), e.exit("tableCellDivider"), i = !0, f) : (e.enter("data"), c(b)));
  }
  function c(b) {
    return b === null || b === 124 || K(b) ? (e.exit("data"), f(b)) : (e.consume(b), b === 92 ? h : c);
  }
  function h(b) {
    return b === 92 || b === 124 ? (e.consume(b), c) : c(b);
  }
  function p(b) {
    return r.interrupt = !1, r.parser.lazy[r.now().line] ? t(b) : (e.enter("tableDelimiterRow"), i = !1, B(b) ? H(e, g, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(b) : g(b));
  }
  function g(b) {
    return b === 45 || b === 58 ? C(b) : b === 124 ? (i = !0, e.enter("tableCellDivider"), e.consume(b), e.exit("tableCellDivider"), y) : _(b);
  }
  function y(b) {
    return B(b) ? H(e, C, "whitespace")(b) : C(b);
  }
  function C(b) {
    return b === 58 ? (o += 1, i = !0, e.enter("tableDelimiterMarker"), e.consume(b), e.exit("tableDelimiterMarker"), x) : b === 45 ? (o += 1, x(b)) : b === null || F(b) ? L(b) : _(b);
  }
  function x(b) {
    return b === 45 ? (e.enter("tableDelimiterFiller"), S(b)) : _(b);
  }
  function S(b) {
    return b === 45 ? (e.consume(b), S) : b === 58 ? (i = !0, e.exit("tableDelimiterFiller"), e.enter("tableDelimiterMarker"), e.consume(b), e.exit("tableDelimiterMarker"), k) : (e.exit("tableDelimiterFiller"), k(b));
  }
  function k(b) {
    return B(b) ? H(e, L, "whitespace")(b) : L(b);
  }
  function L(b) {
    return b === 124 ? g(b) : b === null || F(b) ? !i || l !== o ? _(b) : (e.exit("tableDelimiterRow"), e.exit("tableHead"), n(b)) : _(b);
  }
  function _(b) {
    return t(b);
  }
  function w(b) {
    return e.enter("tableRow"), P(b);
  }
  function P(b) {
    return b === 124 ? (e.enter("tableCellDivider"), e.consume(b), e.exit("tableCellDivider"), P) : b === null || F(b) ? (e.exit("tableRow"), n(b)) : B(b) ? H(e, P, "whitespace")(b) : (e.enter("data"), V(b));
  }
  function V(b) {
    return b === null || b === 124 || K(b) ? (e.exit("data"), P(b)) : (e.consume(b), b === 92 ? U : V);
  }
  function U(b) {
    return b === 92 || b === 124 ? (e.consume(b), V) : V(b);
  }
}
function Xf(e, n) {
  let t = -1, r = !0, l = 0, o = [0, 0, 0, 0], i = [0, 0, 0, 0], a = !1, s = 0, u, f, c;
  const h = new Vf();
  for (; ++t < e.length; ) {
    const p = e[t], g = p[1];
    p[0] === "enter" ? g.type === "tableHead" ? (a = !1, s !== 0 && (zr(h, n, s, u, f), f = void 0, s = 0), u = {
      type: "table",
      start: Object.assign({}, g.start),
      // Note: correct end is set later.
      end: Object.assign({}, g.end)
    }, h.add(t, 0, [["enter", u, n]])) : g.type === "tableRow" || g.type === "tableDelimiterRow" ? (r = !0, c = void 0, o = [0, 0, 0, 0], i = [0, t + 1, 0, 0], a && (a = !1, f = {
      type: "tableBody",
      start: Object.assign({}, g.start),
      // Note: correct end is set later.
      end: Object.assign({}, g.end)
    }, h.add(t, 0, [["enter", f, n]])), l = g.type === "tableDelimiterRow" ? 2 : f ? 3 : 1) : l && (g.type === "data" || g.type === "tableDelimiterMarker" || g.type === "tableDelimiterFiller") ? (r = !1, i[2] === 0 && (o[1] !== 0 && (i[0] = i[1], c = Ct(h, n, o, l, void 0, c), o = [0, 0, 0, 0]), i[2] = t)) : g.type === "tableCellDivider" && (r ? r = !1 : (o[1] !== 0 && (i[0] = i[1], c = Ct(h, n, o, l, void 0, c)), o = i, i = [o[1], t, 0, 0])) : g.type === "tableHead" ? (a = !0, s = t) : g.type === "tableRow" || g.type === "tableDelimiterRow" ? (s = t, o[1] !== 0 ? (i[0] = i[1], c = Ct(h, n, o, l, t, c)) : i[1] !== 0 && (c = Ct(h, n, i, l, t, c)), l = 0) : l && (g.type === "data" || g.type === "tableDelimiterMarker" || g.type === "tableDelimiterFiller") && (i[3] = t);
  }
  for (s !== 0 && zr(h, n, s, u, f), h.consume(n.events), t = -1; ++t < n.events.length; ) {
    const p = n.events[t];
    p[0] === "enter" && p[1].type === "table" && (p[1]._align = Wf(n.events, t));
  }
  return e;
}
function Ct(e, n, t, r, l, o) {
  const i = r === 1 ? "tableHeader" : r === 2 ? "tableDelimiter" : "tableData", a = "tableContent";
  t[0] !== 0 && (o.end = Object.assign({}, Ke(n.events, t[0])), e.add(t[0], 0, [["exit", o, n]]));
  const s = Ke(n.events, t[1]);
  if (o = {
    type: i,
    start: Object.assign({}, s),
    // Note: correct end is set later.
    end: Object.assign({}, s)
  }, e.add(t[1], 0, [["enter", o, n]]), t[2] !== 0) {
    const u = Ke(n.events, t[2]), f = Ke(n.events, t[3]), c = {
      type: a,
      start: Object.assign({}, u),
      end: Object.assign({}, f)
    };
    if (e.add(t[2], 0, [["enter", c, n]]), r !== 2) {
      const h = n.events[t[2]], p = n.events[t[3]];
      if (h[1].end = Object.assign({}, p[1].end), h[1].type = "chunkText", h[1].contentType = "text", t[3] > t[2] + 1) {
        const g = t[2] + 1, y = t[3] - t[2] - 1;
        e.add(g, y, []);
      }
    }
    e.add(t[3] + 1, 0, [["exit", c, n]]);
  }
  return l !== void 0 && (o.end = Object.assign({}, Ke(n.events, l)), e.add(l, 0, [["exit", o, n]]), o = void 0), o;
}
function zr(e, n, t, r, l) {
  const o = [], i = Ke(n.events, t);
  l && (l.end = Object.assign({}, i), o.push(["exit", l, n])), r.end = Object.assign({}, i), o.push(["exit", r, n]), e.add(t + 1, 0, o);
}
function Ke(e, n) {
  const t = e[n], r = t[0] === "enter" ? "start" : "end";
  return t[1][r];
}
const Kf = {
  name: "tasklistCheck",
  tokenize: Jf
};
function Gf() {
  return {
    text: {
      91: Kf
    }
  };
}
function Jf(e, n, t) {
  const r = this;
  return l;
  function l(s) {
    return (
      // Exit if there’s stuff before.
      r.previous !== null || // Exit if not in the first content that is the first child of a list
      // item.
      !r._gfmTasklistFirstContentOfListItem ? t(s) : (e.enter("taskListCheck"), e.enter("taskListCheckMarker"), e.consume(s), e.exit("taskListCheckMarker"), o)
    );
  }
  function o(s) {
    return K(s) ? (e.enter("taskListCheckValueUnchecked"), e.consume(s), e.exit("taskListCheckValueUnchecked"), i) : s === 88 || s === 120 ? (e.enter("taskListCheckValueChecked"), e.consume(s), e.exit("taskListCheckValueChecked"), i) : t(s);
  }
  function i(s) {
    return s === 93 ? (e.enter("taskListCheckMarker"), e.consume(s), e.exit("taskListCheckMarker"), e.exit("taskListCheck"), a) : t(s);
  }
  function a(s) {
    return F(s) ? n(s) : B(s) ? e.check({
      tokenize: Zf
    }, n, t)(s) : t(s);
  }
}
function Zf(e, n, t) {
  return H(e, r, "whitespace");
  function r(l) {
    return l === null ? t(l) : n(l);
  }
}
function ep(e) {
  return li([
    Ef(),
    _f(),
    Uf(e),
    Yf(),
    Gf()
  ]);
}
const tp = {};
function np(e) {
  const n = (
    /** @type {Processor<Root>} */
    this
  ), t = e || tp, r = n.data(), l = r.micromarkExtensions || (r.micromarkExtensions = []), o = r.fromMarkdownExtensions || (r.fromMarkdownExtensions = []), i = r.toMarkdownExtensions || (r.toMarkdownExtensions = []);
  l.push(ep(t)), o.push(wf()), i.push(vf(t));
}
const Gi = jr(null), xt = jr({
  lines: [],
  pendingLine: null,
  onToggle: () => {
  },
  onOpenFile: () => {
  }
}), rp = /(^|[\s([{])((?:~\/|\/)[\w.\-]+(?:\/[\w.\-]+)+\/?)(?=[\s)\]},;:!?'"]|$)/g;
function ip(e) {
  let n = !1;
  return e.split(`
`).map((t) => /^\s*(```|~~~)/.test(t) ? (n = !n, t) : n ? t : t.split(/(`[^`]*`)/).map(
    (r) => r.startsWith("`") ? r : r.replace(rp, (l, o, i) => `${o}[${i}](${i})`)
  ).join("")).join(`
`);
}
const Ji = (e) => !!e && (e.startsWith("/") || e.startsWith("~/")) && e.includes("/");
function lp({ path: e, onClose: n }) {
  const [t, r] = Z({
    loading: !0
  }), [l, o] = Z(!1);
  return ft(() => {
    let i = !0;
    return r({ loading: !0 }), fetch(`/api/file-read?path=${encodeURIComponent(e)}`, { credentials: "same-origin" }).then(async (a) => {
      const s = await a.text();
      if (i)
        if (a.ok)
          r({ loading: !1, content: s });
        else {
          let u = `HTTP ${a.status}`;
          try {
            u = JSON.parse(s).error ?? u;
          } catch {
          }
          r({ loading: !1, error: u });
        }
    }).catch((a) => {
      i && r({ loading: !1, error: String(a) });
    }), () => {
      i = !1;
    };
  }, [e]), /* @__PURE__ */ I("div", { className: "tl-modal-overlay", onClick: n, role: "presentation", children: /* @__PURE__ */ N(
    "div",
    {
      className: "tl-modal",
      role: "dialog",
      "aria-label": e,
      onClick: (i) => i.stopPropagation(),
      children: [
        /* @__PURE__ */ N("div", { className: "tl-modal-head", children: [
          /* @__PURE__ */ I("span", { className: "tl-modal-title", title: e, children: e }),
          /* @__PURE__ */ I(
            "button",
            {
              type: "button",
              className: "tl-btn",
              onClick: () => {
                navigator.clipboard.writeText(e).then(() => {
                  o(!0), setTimeout(() => o(!1), 1500);
                });
              },
              children: l ? "Copied ✓" : "Copy path"
            }
          ),
          /* @__PURE__ */ I("button", { type: "button", className: "tl-btn", onClick: n, children: "Close" })
        ] }),
        /* @__PURE__ */ I("div", { className: "tl-modal-body", children: t.loading ? /* @__PURE__ */ I("div", { className: "tl-dim", children: "Loading…" }) : t.error ? /* @__PURE__ */ N("div", { className: "tl-dim", children: [
          "Could not open: ",
          t.error
        ] }) : /* @__PURE__ */ I("pre", { className: "tl-file-pre", children: t.content }) })
      ]
    }
  ) });
}
function op({ node: e, className: n, children: t, ...r }) {
  var a, s;
  const { lines: l } = ct(xt), o = (a = e == null ? void 0 : e.position) == null ? void 0 : a.start.line;
  if (typeof n == "string" && n.includes("task-list-item") && typeof o == "number") {
    const u = o - 1, f = (s = Hr.exec(l[u] ?? "")) == null ? void 0 : s[1];
    return /* @__PURE__ */ I(Gi.Provider, { value: u, children: /* @__PURE__ */ N("li", { className: `${n} tl-task`, ...r, children: [
      t,
      f ? /* @__PURE__ */ N("span", { title: `Claimed by ${f}`, className: "tl-claim", children: [
        "⛓ ",
        f
      ] }) : null
    ] }) });
  }
  return /* @__PURE__ */ I("li", { className: n, ...r, children: t });
}
function ap(e) {
  const { node: n, ...t } = e, r = ct(Gi), { pendingLine: l, onToggle: o } = ct(xt);
  if (t.type !== "checkbox") return /* @__PURE__ */ I("input", { ...t });
  const i = l !== null;
  return /* @__PURE__ */ I(
    "input",
    {
      type: "checkbox",
      checked: !!t.checked,
      disabled: r === null || i,
      onChange: () => {
        r !== null && o(r);
      },
      className: `tl-check${l === r ? " tl-check-busy" : ""}`
    }
  );
}
function sp({ node: e, href: n, children: t, ...r }) {
  const { onOpenFile: l } = ct(xt);
  return Ji(n) ? /* @__PURE__ */ I(
    "a",
    {
      href: n,
      className: "tl-filelink",
      title: `Open ${n}`,
      onClick: (o) => {
        o.preventDefault(), l(n);
      },
      ...r,
      children: t
    }
  ) : /* @__PURE__ */ I("a", { href: n, target: "_blank", rel: "noreferrer", ...r, children: t });
}
function up({ node: e, className: n, children: t, ...r }) {
  const { onOpenFile: l } = ct(xt), o = typeof t == "string" ? t : Array.isArray(t) && t.length === 1 && typeof t[0] == "string" ? t[0] : void 0;
  return Ji(o) ? /* @__PURE__ */ I(
    "code",
    {
      className: `${n ?? ""} tl-filelink`,
      title: `Open ${o}`,
      role: "link",
      tabIndex: 0,
      onClick: () => l(o),
      onKeyDown: (i) => {
        i.key === "Enter" && l(o);
      },
      ...r,
      children: t
    }
  ) : /* @__PURE__ */ I("code", { className: n, ...r, children: t });
}
const cp = {
  li: op,
  input: ap,
  a: sp,
  code: up
}, fp = `
.tl-md { line-height: 1.55; font-size: 14px; }
.tl-md h1 { font-size: 1.35em; font-weight: 600; margin: 0.9em 0 0.45em; }
.tl-md h2 { font-size: 1.2em;  font-weight: 600; margin: 0.8em 0 0.4em; }
.tl-md h3 { font-size: 1.05em; font-weight: 600; margin: 0.7em 0 0.35em; }
.tl-md p { margin: 0.4em 0; }
.tl-md ul { margin: 0.35em 0; padding-left: 1.4em; list-style: disc; }
.tl-md ol { margin: 0.35em 0; padding-left: 1.4em; list-style: decimal; }
.tl-md ul.contains-task-list { list-style: none; padding-left: 0.35em; }
.tl-md li { margin: 0.18em 0; }
.tl-md li.tl-task { list-style: none; }
.tl-md a { color: var(--accent, #7c9cff); text-decoration: underline; text-underline-offset: 2px; }
.tl-md code { background: rgba(128,128,128,0.16); border-radius: 4px; padding: 0.1em 0.35em; font-size: 0.92em; }
.tl-md pre { background: rgba(128,128,128,0.10); border: 1px solid var(--border, rgba(128,128,128,0.25)); border-radius: 6px; padding: 0.7em 0.9em; overflow-x: auto; margin: 0.5em 0; }
.tl-md pre code { background: none; padding: 0; }
.tl-md blockquote { border-left: 3px solid var(--border, rgba(128,128,128,0.35)); margin: 0.5em 0; padding: 0.1em 0 0.1em 0.8em; opacity: 0.85; }
.tl-md hr { border: none; border-top: 1px solid var(--border, rgba(128,128,128,0.25)); margin: 0.9em 0; }
.tl-md table { border-collapse: collapse; margin: 0.5em 0; font-size: 0.95em; }
.tl-md th, .tl-md td { border: 1px solid var(--border, rgba(128,128,128,0.3)); padding: 0.3em 0.6em; text-align: left; }
.tl-md th { font-weight: 600; background: rgba(128,128,128,0.10); }
.tl-md img { max-width: 100%; }
.tl-check { width: 14px; height: 14px; margin-right: 0.45em; vertical-align: -2px; cursor: pointer; accent-color: var(--accent, #7c9cff); }
.tl-check:disabled { cursor: default; }
.tl-check-busy { opacity: 0.5; }
.tl-claim { display: inline-flex; align-items: center; gap: 3px; margin-left: 0.5em; padding: 0 5px; border: 1px solid var(--border, rgba(128,128,128,0.3)); border-radius: 4px; font-size: 11px; opacity: 0.75; vertical-align: middle; }
.tl-filelink { cursor: pointer; color: var(--accent, #7c9cff); text-decoration: underline; text-decoration-style: dotted; text-underline-offset: 2px; }
.tl-modal-overlay { position: fixed; inset: 0; z-index: 60; background: rgba(0,0,0,0.55); display: flex; align-items: center; justify-content: center; padding: 4vh 4vw; }
.tl-modal { background: var(--bg, #17171b); color: inherit; border: 1px solid var(--border, rgba(128,128,128,0.3)); border-radius: 8px; width: min(900px, 100%); max-height: 88vh; display: flex; flex-direction: column; box-shadow: 0 12px 40px rgba(0,0,0,0.45); }
.tl-modal-head { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-bottom: 1px solid var(--border, rgba(128,128,128,0.25)); }
.tl-modal-title { flex: 1; font-family: ui-monospace, monospace; font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.tl-modal-body { overflow: auto; padding: 12px; }
.tl-file-pre { margin: 0; white-space: pre-wrap; word-break: break-word; font-size: 12.5px; line-height: 1.5; font-family: ui-monospace, monospace; }
.tl-btn { border: 1px solid var(--border, rgba(128,128,128,0.35)); background: transparent; color: inherit; border-radius: 5px; padding: 3px 9px; font-size: 12px; cursor: pointer; }
.tl-btn:hover { background: rgba(128,128,128,0.15); }
.tl-dim { opacity: 0.7; font-size: 13px; }
`;
function pp({
  content: e,
  pendingLine: n,
  onToggle: t
}) {
  const [r, l] = Z(null), o = tn(
    () => ({ lines: e.split(`
`), pendingLine: n, onToggle: t, onOpenFile: l }),
    [e, n, t]
  ), i = tn(() => ip(e), [e]);
  return /* @__PURE__ */ N(xt.Provider, { value: o, children: [
    /* @__PURE__ */ I("style", { children: fp }),
    /* @__PURE__ */ I("div", { className: "tl-md", children: /* @__PURE__ */ I(Hu, { remarkPlugins: [np], components: cp, children: i }) }),
    r ? /* @__PURE__ */ I(lp, { path: r, onClose: () => l(null) }) : null
  ] });
}
const Zi = /^-?\s*(✅ VALID|❌ NOT-TRUE)\s*\(([^)]*)\)\s*:?\s*(.*)$/, hp = /^(\s*)- \[([x~! ])\] (.*)$/, dp = { x: "done", "~": "prog", "!": "blk" };
function mp(e) {
  return e.replace(/<!--.*?-->/g, "").replace(/\(released:[^)]*\)/g, "").replace(/\*\*/g, "").replace(/\s+/g, " ").trim();
}
function gp(e) {
  const n = e.split(`
`), t = [];
  let r = !1;
  n.forEach((u, f) => {
    /^\s*(```|~~~)/.test(u) ? r = !r : !r && u.startsWith("## ") && t.push(f);
  });
  const l = (u, f) => {
    var y;
    const c = [], h = [];
    let p = null, g = !1;
    for (let C = u; C < f; C++) {
      const x = n[C];
      if (/^\s*(```|~~~)/.test(x)) {
        g = !g, h.push(x), p = null;
        continue;
      }
      const S = g ? null : hp.exec(x);
      if (S) {
        const k = Math.floor(S[1].length / 2);
        let L = dp[S[2]] ?? (S[3].includes("⛔") ? "gate" : "open");
        S[2] === " " && S[3].includes("⛔") && (L = "gate"), p = {
          line0: C,
          depth: k,
          status: L,
          text: mp(S[3]),
          claim: (y = Hr.exec(x)) == null ? void 0 : y[1],
          notes: []
        }, c.push(p);
        continue;
      }
      if (x.trim() === "") {
        p = null;
        continue;
      }
      if (p && /^\s{2,}/.test(x)) {
        const k = x.trim(), L = Zi.exec(k);
        L ? p.verdict = { kind: L[1] === "✅ VALID" ? "valid" : "disputed", meta: L[2], note: L[3] } : p.notes.push(k);
        continue;
      }
      p = null, !x.startsWith("---") && !x.startsWith("# ") && h.push(x);
    }
    return { items: c, extra: h };
  }, o = t.length ? t[0] : n.length, i = l(0, o), a = i.extra, s = t.map((u, f) => {
    const c = f + 1 < t.length ? t[f + 1] : n.length, { items: h, extra: p } = l(u + 1, c);
    return { title: n[u].slice(3).trim(), items: h, extra: p };
  });
  if (i.items.length) {
    const u = n.slice(0, o).find((f) => f.startsWith("# "));
    s.unshift({ title: u ? u.slice(2).trim() : "Items", items: i.items, extra: [] });
  }
  return { pre: a, sections: s };
}
function Lr() {
  try {
    let e = document.body;
    for (; e; ) {
      const n = getComputedStyle(e).backgroundColor, t = /rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s/]+([\d.]+))?\)/.exec(n);
      if (t && (t[4] === void 0 || parseFloat(t[4]) > 0.1)) {
        const [r, l, o] = [+t[1], +t[2], +t[3]];
        return 0.2126 * r + 0.7152 * l + 0.0722 * o > 128;
      }
      e = e.parentElement;
    }
  } catch {
  }
  return !1;
}
function xp() {
  const [e, n] = Z(Lr);
  return ft(() => {
    const t = () => n(Lr());
    t();
    const r = new MutationObserver(t);
    return r.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class", "style", "data-theme"]
    }), r.observe(document.body, { attributes: !0, attributeFilter: ["class", "style"] }), () => r.disconnect();
  }, []), e;
}
const yp = /(https?:\/\/[^\s)\]]+|CR-\d{6,}|\b[PV]\d{8,}\b)/g;
function bp(e) {
  return e.startsWith("http") ? e : e.startsWith("CR-") ? `https://code.amazon.com/reviews/${e}` : `https://t.corp.amazon.com/${e}`;
}
function Dr({ text: e }) {
  const n = e.split(yp);
  return /* @__PURE__ */ I(ut, { children: n.map(
    (t, r) => r % 2 === 1 ? /* @__PURE__ */ I(
      "a",
      {
        href: bp(t),
        target: "_blank",
        rel: "noreferrer",
        onClick: (l) => l.stopPropagation(),
        children: t
      },
      r
    ) : t
  ) });
}
const kp = { open: "●", gate: "⛔", prog: "◐", blk: "✕", done: "✓" }, Fr = {
  open: "open",
  prog: "in flight",
  gate: "gated",
  blk: "blocked"
};
function Nr({
  item: e,
  pendingLine: n,
  onToggle: t,
  onVerdict: r
}) {
  var i;
  const l = e.status === "open" || e.status === "done" || e.status === "gate", o = n !== null;
  return /* @__PURE__ */ N(
    "li",
    {
      className: `tlt-it tlt-${e.status}${((i = e.verdict) == null ? void 0 : i.kind) === "disputed" ? " tlt-disputed" : ""}${n === e.line0 ? " tlt-busy" : ""}`,
      style: e.depth ? { marginLeft: e.depth * 16 } : void 0,
      children: [
        l ? /* @__PURE__ */ I(
          "input",
          {
            type: "checkbox",
            className: "tlt-check",
            checked: e.status === "done",
            disabled: o,
            title: e.status === "done" ? "Reopen" : "Mark done",
            onChange: () => t(e.line0)
          }
        ) : /* @__PURE__ */ I("span", { className: "tlt-ic", children: kp[e.status] }),
        /* @__PURE__ */ N("span", { className: "tlt-tx", children: [
          e.status === "gate" ? /* @__PURE__ */ I("span", { className: "tlt-ic-inline", children: "⛔ " }) : null,
          /* @__PURE__ */ I(Dr, { text: e.text })
        ] }),
        e.verdict ? /* @__PURE__ */ I(
          "span",
          {
            className: `tlt-vchip tlt-vchip-${e.verdict.kind === "valid" ? "valid" : "disp"}`,
            title: `${e.verdict.kind === "valid" ? "Confirmed valid" : "Marked NOT TRUE"} (${e.verdict.meta})${e.verdict.note ? `: ${e.verdict.note}` : ""}`,
            children: e.verdict.kind === "valid" ? "✓ valid" : "✗ not true"
          }
        ) : null,
        /* @__PURE__ */ N("span", { className: "tlt-acts", children: [
          /* @__PURE__ */ I(
            "button",
            {
              type: "button",
              className: "tlt-abtn",
              disabled: o,
              title: "Confirm: this item is valid",
              onClick: () => r(e.line0, "valid", ""),
              children: "✓"
            }
          ),
          /* @__PURE__ */ I(
            "button",
            {
              type: "button",
              className: "tlt-abtn",
              disabled: o,
              title: "Dispute: this item is not true",
              onClick: () => r(e.line0, "disputed", ""),
              children: "✗"
            }
          )
        ] }),
        e.claim ? /* @__PURE__ */ N("span", { className: "tlt-claim", title: `Claimed by ${e.claim}`, children: [
          "⛓ ",
          e.claim
        ] }) : null,
        e.notes.length > 0 ? /* @__PURE__ */ N("details", { className: "tlt-notes", children: [
          /* @__PURE__ */ N("summary", { children: [
            "+",
            e.notes.length,
            " notes"
          ] }),
          /* @__PURE__ */ I("div", { className: "tlt-notes-body", children: e.notes.map((a, s) => /* @__PURE__ */ I("div", { children: /* @__PURE__ */ I(Dr, { text: a }) }, s)) })
        ] }) : null
      ]
    }
  );
}
function _r({ label: e, lines: n }) {
  return n.length === 0 ? null : /* @__PURE__ */ N("details", { className: "tlt-extra", children: [
    /* @__PURE__ */ N("summary", { children: [
      e,
      " (",
      n.length,
      " lines)"
    ] }),
    /* @__PURE__ */ I("pre", { children: n.join(`
`) })
  ] });
}
const wp = `
.tlt {
  font-size: 13px; line-height: 1.5;
  --t-amber: #f0a020; --t-amber-tx: #ffd27d; --t-amber-pill-tx: #14100a;
  --t-blue: #58a6ff;  --t-blue-tx: #a5cfff;
  --t-purple: #bc8cff; --t-purple-tx: #c9a8ff;
  --t-red: #f85149;   --t-red-tx: #ff9d97;
  --t-green: #3fb950;
  --t-glow: 0 0 10px rgba(240,160,32,.4);
  --t-line: var(--border, rgba(128,128,128,.25));
  --t-dim: var(--muted, #8b949e);
}
.tlt.tlt-light {
  --t-amber: #b45309; --t-amber-tx: #92400e; --t-amber-pill-tx: #fff;
  --t-blue: #0969da;  --t-blue-tx: #0a4f9e;
  --t-purple: #6f42c1; --t-purple-tx: #5e35a8;
  --t-red: #cf222e;   --t-red-tx: #a40e26;
  --t-green: #1a7f37;
  --t-glow: none;
  --t-line: var(--border, rgba(0,0,0,.14));
  --t-dim: var(--muted, #57606a);
}
.tlt a { color: var(--accent, #7c9cff); text-decoration: underline; text-underline-offset: 2px; }
.tlt-stats { display: flex; gap: 8px; flex-wrap: wrap; margin: 4px 0 14px; }
.tlt-st { padding: 3px 10px; border-radius: 6px; font-size: 11.5px; font-weight: 600; border: 1px solid; }
.tlt-st-open { color: var(--t-amber); border-color: color-mix(in srgb, var(--t-amber) 45%, transparent); background: color-mix(in srgb, var(--t-amber) 9%, transparent); }
.tlt-st-prog { color: var(--t-blue); border-color: color-mix(in srgb, var(--t-blue) 45%, transparent); background: color-mix(in srgb, var(--t-blue) 9%, transparent); }
.tlt-st-gate { color: var(--t-purple); border-color: color-mix(in srgb, var(--t-purple) 45%, transparent); background: color-mix(in srgb, var(--t-purple) 9%, transparent); }
.tlt-st-blk  { color: var(--t-red); border-color: color-mix(in srgb, var(--t-red) 45%, transparent); background: color-mix(in srgb, var(--t-red) 9%, transparent); }
.tlt-st-done { color: var(--t-dim); border-color: var(--t-line); }
.tlt-sec { margin: 0 0 6px; border-left: 2px solid var(--t-line); }
.tlt-sec > summary { cursor: pointer; list-style: none; display: flex; align-items: center; flex-wrap: wrap; gap: 8px; padding: 6px 10px; border-radius: 0 8px 8px 0; user-select: none; }
.tlt-sec > summary::-webkit-details-marker { display: none; }
.tlt-sec > summary::before { content: '▸'; opacity: .5; font-size: 10px; transition: transform .15s; }
.tlt-sec[open] > summary::before { transform: rotate(90deg); }
.tlt-hot { border-left-color: var(--t-amber); }
.tlt-hot > summary { background: linear-gradient(90deg, color-mix(in srgb, var(--t-amber) 7%, transparent), transparent 60%); }
.tlt-title { font-weight: 700; font-size: 12.5px; }
.tlt-cold { opacity: .75; }
.tlt-cold .tlt-title { font-weight: 500; color: var(--t-dim); }
.tlt-pill { font-size: 10px; font-weight: 700; padding: 1px 8px; border-radius: 99px; }
.tlt-pill-open { background: var(--t-amber); color: var(--t-amber-pill-tx); box-shadow: var(--t-glow); }
.tlt-pill-prog { color: var(--t-blue); border: 1px solid color-mix(in srgb, var(--t-blue) 40%, transparent); }
.tlt-pill-gate { color: var(--t-purple); border: 1px solid color-mix(in srgb, var(--t-purple) 40%, transparent); }
.tlt-pill-blk  { color: var(--t-red); border: 1px solid color-mix(in srgb, var(--t-red) 40%, transparent); }
.tlt-pill-done { color: var(--t-dim); border: 1px solid var(--t-line); }
.tlt-its { list-style: none; margin: 2px 0 8px; padding: 0 0 0 24px; position: relative; }
.tlt-its::before { content: ''; position: absolute; left: 12px; top: 0; bottom: 8px; width: 1px; background: var(--t-line); }
.tlt-it { position: relative; padding: 3px 8px 3px 4px; margin: 2px 0; border-radius: 6px; display: flex; align-items: baseline; flex-wrap: wrap; gap: 6px; }
.tlt-it::before { content: ''; position: absolute; left: -12px; top: 50%; width: 10px; height: 1px; background: var(--t-line); }
.tlt-tx { flex: 1 1 auto; min-width: 0; }
.tlt-ic { font-size: 11px; flex: none; }
.tlt-ic-inline { font-size: 11px; }
.tlt-check { width: 13px; height: 13px; flex: none; align-self: center; cursor: pointer; accent-color: var(--t-amber); }
.tlt-open { background: color-mix(in srgb, var(--t-amber) 8%, transparent); border: 1px solid color-mix(in srgb, var(--t-amber) 25%, transparent); }
.tlt-open .tlt-tx { color: var(--t-amber-tx); font-weight: 600; }
.tlt-gate { background: color-mix(in srgb, var(--t-purple) 6%, transparent); border: 1px solid color-mix(in srgb, var(--t-purple) 20%, transparent); }
.tlt-gate .tlt-tx { color: var(--t-purple-tx); }
.tlt-gate .tlt-check { accent-color: var(--t-purple); }
.tlt-prog { background: color-mix(in srgb, var(--t-blue) 6%, transparent); border: 1px solid color-mix(in srgb, var(--t-blue) 20%, transparent); }
.tlt-prog .tlt-ic { color: var(--t-blue); }
.tlt-prog .tlt-tx { color: var(--t-blue-tx); }
.tlt-blk { background: color-mix(in srgb, var(--t-red) 6%, transparent); border: 1px solid color-mix(in srgb, var(--t-red) 20%, transparent); }
.tlt-blk .tlt-ic { color: var(--t-red); }
.tlt-blk .tlt-tx { color: var(--t-red-tx); }
.tlt-done { opacity: .55; font-size: 12px; }
.tlt-done .tlt-check { accent-color: var(--t-green); }
.tlt-busy { opacity: .5; }
.tlt-claim { flex: none; display: inline-flex; align-items: center; gap: 3px; padding: 0 5px; border: 1px solid var(--t-line); border-radius: 4px; font-size: 10.5px; opacity: .7; }
.tlt-notes { flex: 1 0 100%; margin-left: 20px; }
.tlt-notes > summary { cursor: pointer; list-style: none; font-size: 10.5px; opacity: .55; user-select: none; }
.tlt-notes > summary::-webkit-details-marker { display: none; }
.tlt-notes-body { margin: 3px 0 4px; padding: 6px 8px; border-left: 2px solid var(--t-line); font-size: 11.5px; opacity: .8; overflow-wrap: anywhere; }
.tlt-donefold { margin: 0 0 8px 24px; }
.tlt-donefold > summary { cursor: pointer; list-style: none; font-size: 11px; color: var(--t-dim); user-select: none; padding: 2px 0; }
.tlt-donefold > summary::-webkit-details-marker { display: none; }
.tlt-donefold .tlt-its { margin-top: 0; }
.tlt-extra { margin: 2px 0 8px 24px; }
.tlt-extra > summary { cursor: pointer; list-style: none; font-size: 10.5px; opacity: .55; user-select: none; }
.tlt-extra > summary::-webkit-details-marker { display: none; }
.tlt { position: relative; }
.tlt-acts { display: none; gap: 4px; flex: none; }
.tlt-it:hover .tlt-acts { display: inline-flex; }
.tlt-abtn { border: 1px solid var(--t-line); background: transparent; color: var(--t-dim); border-radius: 4px; font-size: 10px; line-height: 16px; padding: 0 5px; cursor: pointer; }
.tlt-abtn:hover { color: inherit; border-color: var(--t-dim); }
.tlt-abtn:disabled { opacity: .4; cursor: default; }
.tlt-vchip { flex: none; font-size: 10px; font-weight: 700; padding: 0 6px; border-radius: 99px; }
.tlt-vchip-valid { color: var(--t-green); border: 1px solid color-mix(in srgb, var(--t-green) 45%, transparent); }
.tlt-vchip-disp { color: var(--t-red); border: 1px solid color-mix(in srgb, var(--t-red) 50%, transparent); background: color-mix(in srgb, var(--t-red) 10%, transparent); }
.tlt-it.tlt-disputed { border-color: color-mix(in srgb, var(--t-red) 45%, transparent); background: color-mix(in srgb, var(--t-red) 5%, transparent); }
.tlt-selbtn { position: absolute; z-index: 6; border: none; border-radius: 6px; background: var(--accent, #7c9cff); color: #fff; font-size: 11px; font-weight: 600; padding: 3px 9px; cursor: pointer; box-shadow: 0 2px 10px rgba(0,0,0,.35); }
.tlt-extra pre { margin: 4px 0; padding: 8px 10px; border: 1px solid var(--t-line); border-radius: 6px; font-size: 11px; line-height: 1.45; overflow-x: auto; }
`;
function vp({
  content: e,
  pendingLine: n,
  onToggle: t,
  onVerdict: r,
  onInvestigate: l
}) {
  const { pre: o, sections: i } = tn(() => gp(e), [e]), a = xp(), { dialog: s, prompt: u } = gn(), f = async (C, x, S) => {
    if (x === "disputed") {
      const k = await u("Why is this not true? (stored on the item)");
      if (k === null) return;
      S = k.trim();
    }
    r(C, x, S);
  }, c = mn(null), [h, p] = Z(null), g = (C) => {
    const x = window.getSelection(), S = (x == null ? void 0 : x.toString().trim()) ?? "";
    if (S.length >= 3 && x && x.anchorNode && c.current && c.current.contains(x.anchorNode)) {
      const k = c.current.getBoundingClientRect();
      p({ x: C.clientX - k.left, y: C.clientY - k.top + 16, text: S });
    } else
      p(null);
  }, y = { open: 0, gate: 0, prog: 0, blk: 0, done: 0 };
  for (const C of i) for (const x of C.items) y[x.status]++;
  return /* @__PURE__ */ N(
    "div",
    {
      ref: c,
      className: `tlt${a ? " tlt-light" : ""}`,
      onMouseUp: g,
      children: [
        /* @__PURE__ */ I("style", { children: wp }),
        h ? /* @__PURE__ */ I(
          "button",
          {
            type: "button",
            className: "tlt-selbtn",
            style: { left: Math.max(0, h.x - 40), top: h.y },
            onMouseDown: (C) => C.preventDefault(),
            onClick: () => {
              l(h.text), p(null);
            },
            children: "⚡ New session"
          }
        ) : null,
        /* @__PURE__ */ N("div", { className: "tlt-stats", children: [
          /* @__PURE__ */ N("span", { className: "tlt-st tlt-st-open", children: [
            "● ",
            y.open,
            " open — needs action"
          ] }),
          /* @__PURE__ */ N("span", { className: "tlt-st tlt-st-prog", children: [
            "◐ ",
            y.prog,
            " in flight"
          ] }),
          /* @__PURE__ */ N("span", { className: "tlt-st tlt-st-gate", children: [
            "⛔ ",
            y.gate,
            " gated"
          ] }),
          y.blk > 0 ? /* @__PURE__ */ N("span", { className: "tlt-st tlt-st-blk", children: [
            "✕ ",
            y.blk,
            " blocked"
          ] }) : null,
          /* @__PURE__ */ N("span", { className: "tlt-st tlt-st-done", children: [
            "✓ ",
            y.done,
            " done"
          ] })
        ] }),
        /* @__PURE__ */ I(_r, { label: "header notes", lines: o }),
        i.map((C, x) => {
          const S = C.items.filter((P) => P.status !== "done"), k = C.items.filter((P) => P.status === "done"), L = S.length > 0, _ = {};
          for (const P of C.items) _[P.status] = (_[P.status] ?? 0) + 1;
          const w = k.length > 0 ? /* @__PURE__ */ I("ul", { className: "tlt-its", children: k.map((P) => /* @__PURE__ */ I(Nr, { item: P, pendingLine: n, onToggle: t, onVerdict: f }, P.line0)) }) : null;
          return /* @__PURE__ */ N("details", { className: `tlt-sec ${L ? "tlt-hot" : "tlt-cold"}`, open: L, children: [
            /* @__PURE__ */ N("summary", { children: [
              /* @__PURE__ */ I("span", { className: "tlt-title", children: C.title }),
              Object.keys(Fr).map(
                (P) => _[P] ? /* @__PURE__ */ N("span", { className: `tlt-pill tlt-pill-${P}`, children: [
                  _[P],
                  " ",
                  Fr[P]
                ] }, P) : null
              ),
              k.length > 0 ? /* @__PURE__ */ I("span", { className: "tlt-pill tlt-pill-done", children: L ? `${k.length} done` : `✓ all ${k.length} done` }) : null
            ] }),
            S.length > 0 ? /* @__PURE__ */ I("ul", { className: "tlt-its", children: S.map((P) => /* @__PURE__ */ I(Nr, { item: P, pendingLine: n, onToggle: t, onVerdict: f }, P.line0)) }) : null,
            k.length > 0 ? L ? /* @__PURE__ */ N("details", { className: "tlt-donefold", children: [
              /* @__PURE__ */ N("summary", { children: [
                "✓ ",
                k.length,
                " done — expand"
              ] }),
              w
            ] }) : w : null,
            /* @__PURE__ */ I(_r, { label: "section notes", lines: C.extra })
          ] }, x);
        }),
        s
      ]
    }
  );
}
const el = "todo-ledger:view";
function Cp() {
  try {
    return localStorage.getItem(el) === "doc" ? "doc" : "tree";
  } catch {
    return "tree";
  }
}
function Sp({ id: e, onBack: n }) {
  const t = Rr(), r = Or(), { dialog: l, confirm: o } = gn(), [i, a] = Z(null), [s, u] = Z(null), [f, c] = Z("view"), [h, p] = Z(Cp), g = (D) => {
    p(D);
    try {
      localStorage.setItem(el, D);
    } catch {
    }
  }, [y, C] = Z(""), [x, S] = Z(!1), [k, L] = Z(null), [_, w] = Z(!1), [P, V] = Z(null), [U, b] = Z(!1), [A, z] = Z(""), [q, G] = Z(""), [$, te] = Z(!1), J = mn(!1);
  J.current = x || k !== null;
  const re = lt(async () => {
    try {
      const D = await t.get(`${Ae}/ledgers/${e}`);
      if (J.current) return;
      a(D), u(null);
    } catch (D) {
      u(Pe(D));
    }
  }, [t, e]);
  ft(() => {
    i && !x && !k && C(i.content);
  }, [i, x, k]), ft(() => {
    re();
    const D = setInterval(() => {
      J.current || re();
    }, 5e3);
    return () => clearInterval(D);
  }, [re]), Mr("update", (D) => {
    const W = D == null ? void 0 : D.id;
    (W === void 0 || W === e) && !J.current && re();
  });
  const ye = async (D) => {
    if (!i || P !== null) return;
    const W = i.content.split(`
`)[D];
    if (W !== void 0) {
      V(D);
      try {
        const { status: Y, data: M } = await Xe("POST", `${Ae}/ledgers/${e}/toggle`, {
          line: D,
          expected: W
        });
        if (Y === 409 && M && typeof M.content == "string") {
          a((ke) => ke && { ...ke, content: M.content, version: M.version }), r("List changed elsewhere — refreshed", { type: "info" });
          return;
        }
        if (Y >= 400 || !M) {
          r(M != null && M.error ? String(M.error) : `Toggle failed (HTTP ${Y})`, { type: "error" });
          return;
        }
        const { line: ie, new_text: ae, ...de } = M;
        a((ke) => {
          if (!ke) return ke;
          const Me = ke.content.split(`
`);
          return typeof ie == "number" && typeof ae == "string" && (Me[ie] = ae), { ...ke, ...de, content: Me.join(`
`) };
        });
      } catch (Y) {
        r(Pe(Y), { type: "error" });
      } finally {
        V(null);
      }
    }
  }, d = async (D, W, Y) => {
    if (!i || P !== null || J.current) return;
    const M = i.content.split(`
`), ie = M[D];
    if (!(ie === void 0 || !/^\s*- \[/.test(ie))) {
      V(D);
      try {
        const ae = /^(\s*)/.exec(ie)[1];
        let de = D + 1;
        for (; de < M.length && M[de].trim() && M[de].startsWith(`${ae}  `); ) de++;
        const ke = M.slice(D + 1, de).filter((Se) => !Zi.test(Se.trim())), Me = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), yt = W === "valid" ? `✅ VALID (${Me})` : `❌ NOT-TRUE (${Me})`, Ot = `${ae}  - ${yt}${Y ? `: ${Y}` : ""}`, bt = [
          ...M.slice(0, D + 1),
          Ot,
          ...ke,
          ...M.slice(de)
        ].join(`
`), { status: et, data: we } = await Xe("PUT", `${Ae}/ledgers/${e}`, {
          base_version: i.version,
          content: bt
        });
        if (et === 409 && we && typeof we.content == "string") {
          a((Se) => Se && { ...Se, content: we.content, version: we.version }), r("List changed elsewhere — refreshed, try again", { type: "info" });
          return;
        }
        if (et >= 400 || !we) {
          r(we != null && we.error ? String(we.error) : `Verdict failed (HTTP ${et})`, {
            type: "error"
          });
          return;
        }
        a((Se) => Se && { ...Se, ...we, content: bt });
      } catch (ae) {
        r(Pe(ae), { type: "error" });
      } finally {
        V(null);
      }
    }
  }, fe = async (D) => {
    var W, Y;
    if (i)
      try {
        const M = D.length > 900 ? `${D.slice(0, 900)}…` : D, ie = await Xe("POST", "/api/chat/slots", {
          title: `Ledger: ${M.replace(/\s+/g, " ").slice(0, 60)}`
        }), ae = (W = ie.data) == null ? void 0 : W.key;
        if (ie.status >= 400 || typeof ae != "string" || !ae) {
          r((Y = ie.data) != null && Y.error ? String(ie.data.error) : "Could not create session", {
            type: "error"
          });
          return;
        }
        const de = `Investigate this selected text from the todo-ledger "${i.name}" (ledger id ${e}):

${M}

Get full ledger context with: python3 ~/.meshclaw/apps/todo-ledger/cli/ledger.py get ${e}
Verify the claim(s) against real evidence (CRs, tickets, code, session history). Report findings. If the ledger item needs a status change, apply it via the CLI with the exact-line guard; otherwise leave the ledger untouched.`;
        fetch("/api/chat", {
          method: "POST",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slot: ae, message: de })
        }).catch(() => {
        }), window.open(`/chat/investigate?sid=${encodeURIComponent(ae)}`, "_blank", "noopener"), r("Investigation session started in a new tab", { type: "info" });
      } catch (M) {
        r(Pe(M), { type: "error" });
      }
  }, be = async (D) => {
    if (!(!i || _)) {
      w(!0);
      try {
        const { status: W, data: Y } = await Xe("PUT", `${Ae}/ledgers/${e}`, {
          base_version: D ?? i.version,
          content: y
        });
        if (W === 409 && Y && typeof Y.content == "string") {
          L({ content: Y.content, version: Y.version });
          return;
        }
        if (W >= 400 || !Y) {
          r(Y != null && Y.error ? String(Y.error) : `Save failed (HTTP ${W})`, { type: "error" });
          return;
        }
        const M = y;
        L(null), S(!1), a((ie) => ie && { ...ie, ...Y, content: M }), c("view");
      } catch (W) {
        r(Pe(W), { type: "error" });
      } finally {
        w(!1);
      }
    }
  }, m = () => {
    if (!k) return;
    const D = k;
    L(null), S(!1), a((W) => W && { ...W, content: D.content, version: D.version }), C(D.content);
  }, pe = () => {
    i && (C(i.content), S(!1), c("edit"));
  }, Le = () => {
    L(null), S(!1), i && C(i.content), c("view");
  }, ne = () => {
    !i || J.current || (z(i.name), b(!0));
  }, _e = async () => {
    var W, Y;
    b(!1);
    const D = A.trim();
    if (!(!i || !D || D === i.name))
      try {
        let M = await Xe("PUT", `${Ae}/ledgers/${e}`, {
          base_version: i.version,
          name: D
        });
        if (M.status === 409 && typeof ((W = M.data) == null ? void 0 : W.version) == "number" && (M = await Xe("PUT", `${Ae}/ledgers/${e}`, {
          base_version: M.data.version,
          name: D
        })), M.status >= 400 || !M.data) {
          r((Y = M.data) != null && Y.error ? String(M.data.error) : `Rename failed (HTTP ${M.status})`, {
            type: "error"
          });
          return;
        }
        await re();
      } catch (M) {
        r(Pe(M), { type: "error" });
      }
  }, he = x || k !== null, Re = async () => {
    const D = q.trim();
    if (!(!D || $ || he)) {
      te(!0);
      try {
        await t.post(`${Ae}/ledgers/${e}/items`, { text: D }), G(""), await re();
      } catch (W) {
        r(Pe(W), { type: "error" });
      } finally {
        te(!1);
      }
    }
  }, Oe = async () => {
    J.current && !await o("Discard unsaved changes?", { confirmLabel: "Discard", danger: !0 }) || n();
  };
  return /* @__PURE__ */ N("div", { className: "flex min-h-0 flex-1 flex-col", children: [
    /* @__PURE__ */ N("div", { className: "flex items-center gap-3 px-6 pb-3 pt-5", children: [
      /* @__PURE__ */ I(ve, { onClick: () => void Oe(), title: "Back to ledgers", children: /* @__PURE__ */ I(il, { size: 14 }) }),
      U ? /* @__PURE__ */ I(
        en,
        {
          autoFocus: !0,
          value: A,
          onChange: (D) => z(D.target.value),
          onBlur: () => void _e(),
          onKeyDown: (D) => {
            D.key === "Enter" && _e(), D.key === "Escape" && b(!1);
          },
          className: "max-w-xs"
        }
      ) : /* @__PURE__ */ I(
        "button",
        {
          type: "button",
          onClick: ne,
          title: he ? "Save or cancel your edit first" : "Click to rename",
          className: "min-w-0 truncate bg-transparent text-lg font-semibold decoration-dotted underline-offset-4 hover:underline",
          children: (i == null ? void 0 : i.name) ?? "…"
        }
      ),
      i && /* @__PURE__ */ N("span", { className: "hidden shrink-0 text-xs text-muted sm:inline", children: [
        i.items_done,
        "/",
        i.items_total,
        " done · v",
        i.version,
        " · updated",
        " ",
        Ur(i.updated_at)
      ] }),
      /* @__PURE__ */ I("div", { className: "ml-auto flex shrink-0 items-center gap-1.5", children: f === "edit" ? /* @__PURE__ */ N(ut, { children: [
        /* @__PURE__ */ I(ve, { onClick: Le, disabled: _, children: "Cancel" }),
        /* @__PURE__ */ I(ve, { primary: !0, onClick: () => void be(), disabled: _ || !x, children: _ ? "Saving…" : "Save" })
      ] }) : /* @__PURE__ */ N(ut, { children: [
        /* @__PURE__ */ I(ve, { primary: h === "tree", onClick: () => g("tree"), children: "Tree" }),
        /* @__PURE__ */ I(ve, { primary: h === "doc", onClick: () => g("doc"), children: "Doc" }),
        /* @__PURE__ */ I(ve, { onClick: pe, disabled: !i, children: "Edit" })
      ] }) })
    ] }),
    /* @__PURE__ */ N(
      "div",
      {
        className: f === "view" ? "min-h-0 flex-1 overflow-y-auto px-6 pb-4" : "flex min-h-0 flex-1 flex-col px-6 pb-4",
        children: [
          f === "edit" && k && /* @__PURE__ */ N("div", { className: "mb-3 flex items-center gap-3 rounded border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm", children: [
            /* @__PURE__ */ I(ll, { size: 16, className: "shrink-0 text-amber-500" }),
            /* @__PURE__ */ N("span", { className: "min-w-0 flex-1", children: [
              "Changed elsewhere (now v",
              k.version,
              ") — your save was rejected."
            ] }),
            /* @__PURE__ */ I(ve, { onClick: m, children: "Take theirs" }),
            /* @__PURE__ */ I(ve, { danger: !0, onClick: () => void be(k.version), disabled: _, children: "Overwrite" })
          ] }),
          i ? f === "view" ? /* @__PURE__ */ I("div", { className: "max-w-3xl text-sm", children: i.content.trim() === "" ? /* @__PURE__ */ I("p", { className: "py-8 text-muted", children: "Empty ledger — add an item below." }) : h === "tree" ? /* @__PURE__ */ I(
            vp,
            {
              content: i.content,
              pendingLine: P,
              onToggle: ye,
              onVerdict: d,
              onInvestigate: fe
            }
          ) : /* @__PURE__ */ I(pp, { content: i.content, pendingLine: P, onToggle: ye }) }) : /* @__PURE__ */ I(
            "textarea",
            {
              value: y,
              onChange: (D) => {
                C(D.target.value), S(!0);
              },
              spellCheck: !1,
              className: "min-h-0 w-full flex-1 resize-none rounded border border-border bg-transparent p-3 font-mono text-sm outline-none focus:border-[var(--accent)]"
            }
          ) : /* @__PURE__ */ I("div", { className: "flex flex-1 items-center justify-center py-16 text-muted", children: s ? /* @__PURE__ */ N("span", { className: "text-sm", children: [
            "Failed to load: ",
            s
          ] }) : /* @__PURE__ */ I(ol, { size: 20, className: "animate-spin" }) })
        ]
      }
    ),
    /* @__PURE__ */ I("div", { className: "border-t border-border px-6 py-3", children: /* @__PURE__ */ N(
      "form",
      {
        className: "flex max-w-3xl items-center gap-2",
        onSubmit: (D) => {
          D.preventDefault(), Re();
        },
        children: [
          /* @__PURE__ */ I($r, { size: 14, className: "shrink-0 text-muted" }),
          /* @__PURE__ */ I(
            en,
            {
              value: q,
              onChange: (D) => G(D.target.value),
              placeholder: he ? "Save or cancel your edit to add items" : "Add a todo item — Enter to append",
              disabled: he || $ || !i,
              className: "flex-1"
            }
          )
        ]
      }
    ) }),
    l
  ] });
}
function zp() {
  const e = Rr(), n = Or(), { dialog: t, prompt: r, confirm: l } = gn(), [o, i] = Z(null), [a, s] = Z(null), [u, f] = Z(null), c = mn(u);
  c.current = u;
  const h = lt(async () => {
    try {
      i(await e.get(`${Ae}/ledgers`)), s(null);
    } catch (x) {
      s(Pe(x));
    }
  }, [e]);
  ft(() => {
    if (u !== null) return;
    h();
    const x = setInterval(() => void h(), 5e3);
    return () => clearInterval(x);
  }, [u, h]), Mr("update", () => {
    c.current === null && h();
  });
  const p = async () => {
    var S;
    const x = (S = await r("New ledger name", { confirmLabel: "Create", required: !0 })) == null ? void 0 : S.trim();
    if (x)
      try {
        const k = await e.post(`${Ae}/ledgers`, { name: x });
        f(k.id);
      } catch (k) {
        n(Pe(k), { type: "error" });
      }
  }, g = async (x) => {
    if (await l(`Delete ledger "${x.name}"? This cannot be undone.`, {
      confirmLabel: "Delete",
      danger: !0
    }))
      try {
        await e.del(`${Ae}/ledgers/${x.id}`), h();
      } catch (k) {
        n(Pe(k), { type: "error" });
      }
  };
  if (u !== null)
    return /* @__PURE__ */ I(
      Sp,
      {
        id: u,
        onBack: () => {
          f(null), h();
        }
      }
    );
  const y = (o == null ? void 0 : o.reduce((x, S) => x + (S.items_total - S.items_done), 0)) ?? 0, C = (o == null ? void 0 : o.reduce((x, S) => x + S.items_done, 0)) ?? 0;
  return /* @__PURE__ */ N(ut, { children: [
    /* @__PURE__ */ I(
      tl,
      {
        title: "Ledgers",
        subtitle: "Shared markdown todo lists — humans and agents, one source of truth",
        actions: /* @__PURE__ */ N(ve, { primary: !0, onClick: () => void p(), children: [
          /* @__PURE__ */ I($r, { size: 14, className: "mr-1 inline align-[-2px]" }),
          "New ledger"
        ] })
      }
    ),
    /* @__PURE__ */ N("div", { className: "min-h-0 flex-1 overflow-y-auto px-6 pb-8", children: [
      /* @__PURE__ */ N("div", { className: "mb-6 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5", children: [
        /* @__PURE__ */ I(Mt, { label: "Ledgers", value: o ? o.length : "…", accent: !0 }),
        /* @__PURE__ */ I(Mt, { label: "Open items", value: o ? y : "…" }),
        /* @__PURE__ */ I(Mt, { label: "Done items", value: o ? C : "…" })
      ] }),
      a && /* @__PURE__ */ N("div", { className: "mb-4 rounded border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm", children: [
        "Failed to load ledgers: ",
        a
      ] }),
      o && o.length === 0 ? /* @__PURE__ */ I(
        nl,
        {
          icon: "📋",
          title: "No ledgers yet",
          subtitle: "Create one to start a shared todo list",
          action: /* @__PURE__ */ I(ve, { primary: !0, onClick: () => void p(), children: "New ledger" })
        }
      ) : /* @__PURE__ */ I("div", { className: "grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3.5", children: (o ?? []).map((x) => /* @__PURE__ */ I(
        Br,
        {
          onClick: () => f(x.id),
          className: "cursor-pointer transition-colors hover:border-[var(--accent)]",
          children: /* @__PURE__ */ N("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ N("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ I("div", { className: "truncate font-medium", children: x.name }),
              /* @__PURE__ */ N("div", { className: "mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted", children: [
                /* @__PURE__ */ N("span", { children: [
                  x.items_done,
                  "/",
                  x.items_total,
                  " done"
                ] }),
                x.items_claimed > 0 && /* @__PURE__ */ N(rl, { variant: "warn", children: [
                  "⛓ ",
                  x.items_claimed,
                  " claimed"
                ] }),
                /* @__PURE__ */ N("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ I(al, { size: 11 }),
                  Ur(x.updated_at)
                ] })
              ] }),
              (x.pinned_sessions ?? []).length > 0 && /* @__PURE__ */ I("div", { className: "mt-2 flex flex-wrap gap-1", children: (x.pinned_sessions ?? []).map((S) => /* @__PURE__ */ N(
                "span",
                {
                  title: `Pinned to session ${S}`,
                  className: "rounded border border-border px-1.5 py-px text-[10px] text-muted",
                  children: [
                    "📌 ",
                    S.slice(0, 8)
                  ]
                },
                S
              )) })
            ] }),
            /* @__PURE__ */ I(
              "button",
              {
                type: "button",
                title: "Delete ledger",
                onClick: (S) => {
                  S.stopPropagation(), g(x);
                },
                className: "shrink-0 rounded p-1 text-muted transition-colors hover:text-red-400",
                children: /* @__PURE__ */ I(sl, { size: 14 })
              }
            )
          ] })
        },
        x.id
      )) })
    ] }),
    t
  ] });
}
export {
  zp as default
};
