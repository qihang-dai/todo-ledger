import { jsxs as F, jsx as I, Fragment as at } from "react/jsx-runtime";
import { useAppApi as Dr, useNotify as Fr, useAppEvents as _r } from "@kirocrew/app-sdk";
import { Btn as Ie, Input as Ln, PageHeader as Zi, StatCard as Nt, EmptyState as el, Card as tl, Badge as nl } from "@kirocrew/app-sdk/ui";
import { ArrowLeft as rl, AlertTriangle as il, Loader2 as ll, Plus as Nr, Clock as ol, Trash2 as al } from "lucide-react";
import { createContext as Rr, useState as ee, useMemo as Jt, useContext as st, useEffect as ut, useRef as fn, useCallback as Or } from "react";
const Ae = "/api/apps/todo-ledger", Mr = /<!--\s*claim:(.+?)\s*-->/;
async function Ye(e, n, t) {
  const r = await fetch(n, {
    method: e,
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(t)
  }), i = await r.text();
  let o = null;
  if (i)
    try {
      o = JSON.parse(i);
    } catch {
      o = { error: i };
    }
  return { status: r.status, data: o };
}
function Pe(e) {
  return e instanceof Error ? e.message : String(e);
}
function Br(e) {
  if (e == null) return "";
  const n = typeof e == "number" ? e * 1e3 : Date.parse(e);
  if (!Number.isFinite(n)) return "";
  const t = Date.now() - n;
  if (t < 45e3) return "just now";
  const r = Math.round(t / 6e4);
  if (r < 60) return `${r}m ago`;
  const i = Math.round(r / 60);
  return i < 24 ? `${i}h ago` : `${Math.round(i / 24)}d ago`;
}
function sl(e, n) {
  const t = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (t.padRight ? " " : "") + "," + (t.padLeft === !1 ? "" : " ")
  ).trim();
}
const ul = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, cl = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, fl = {};
function Dn(e, n) {
  return (fl.jsx ? cl : ul).test(e);
}
const pl = /[ \t\n\f\r]/g;
function hl(e) {
  return typeof e == "object" ? e.type === "text" ? Fn(e.value) : !1 : Fn(e);
}
function Fn(e) {
  return e.replace(pl, "") === "";
}
class pt {
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
pt.prototype.normal = {};
pt.prototype.property = {};
pt.prototype.space = void 0;
function $r(e, n) {
  const t = {}, r = {};
  for (const i of e)
    Object.assign(t, i.property), Object.assign(r, i.normal);
  return new pt(t, r, n);
}
function Kt(e) {
  return e.toLowerCase();
}
class ue {
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
ue.prototype.attribute = "";
ue.prototype.booleanish = !1;
ue.prototype.boolean = !1;
ue.prototype.commaOrSpaceSeparated = !1;
ue.prototype.commaSeparated = !1;
ue.prototype.defined = !1;
ue.prototype.mustUseProperty = !1;
ue.prototype.number = !1;
ue.prototype.overloadedBoolean = !1;
ue.prototype.property = "";
ue.prototype.spaceSeparated = !1;
ue.prototype.space = void 0;
let dl = 0;
const _ = qe(), ne = qe(), Zt = qe(), S = qe(), X = qe(), Ue = qe(), ge = qe();
function qe() {
  return 2 ** ++dl;
}
const en = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: _,
  booleanish: ne,
  commaOrSpaceSeparated: ge,
  commaSeparated: Ue,
  number: S,
  overloadedBoolean: Zt,
  spaceSeparated: X
}, Symbol.toStringTag, { value: "Module" })), Rt = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(en)
);
class pn extends ue {
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
  constructor(n, t, r, i) {
    let o = -1;
    if (super(n, t), _n(this, "space", i), typeof r == "number")
      for (; ++o < Rt.length; ) {
        const l = Rt[o];
        _n(this, Rt[o], (r & en[l]) === en[l]);
      }
  }
}
pn.prototype.defined = !0;
function _n(e, n, t) {
  t && (e[n] = t);
}
function Ge(e) {
  const n = {}, t = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const o = new pn(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (o.mustUseProperty = !0), n[r] = o, t[Kt(r)] = r, t[Kt(o.attribute)] = r;
  }
  return new pt(n, t, e.space);
}
const jr = Ge({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: ne,
    ariaAutoComplete: null,
    ariaBusy: ne,
    ariaChecked: ne,
    ariaColCount: S,
    ariaColIndex: S,
    ariaColSpan: S,
    ariaControls: X,
    ariaCurrent: null,
    ariaDescribedBy: X,
    ariaDetails: null,
    ariaDisabled: ne,
    ariaDropEffect: X,
    ariaErrorMessage: null,
    ariaExpanded: ne,
    ariaFlowTo: X,
    ariaGrabbed: ne,
    ariaHasPopup: null,
    ariaHidden: ne,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: X,
    ariaLevel: S,
    ariaLive: null,
    ariaModal: ne,
    ariaMultiLine: ne,
    ariaMultiSelectable: ne,
    ariaOrientation: null,
    ariaOwns: X,
    ariaPlaceholder: null,
    ariaPosInSet: S,
    ariaPressed: ne,
    ariaReadOnly: ne,
    ariaRelevant: null,
    ariaRequired: ne,
    ariaRoleDescription: X,
    ariaRowCount: S,
    ariaRowIndex: S,
    ariaRowSpan: S,
    ariaSelected: ne,
    ariaSetSize: S,
    ariaSort: null,
    ariaValueMax: S,
    ariaValueMin: S,
    ariaValueNow: S,
    ariaValueText: null,
    role: null
  },
  transform(e, n) {
    return n === "role" ? n : "aria-" + n.slice(4).toLowerCase();
  }
});
function Hr(e, n) {
  return n in e ? e[n] : n;
}
function Ur(e, n) {
  return Hr(e, n.toLowerCase());
}
const ml = Ge({
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
    accept: Ue,
    acceptCharset: X,
    accessKey: X,
    action: null,
    allow: null,
    allowFullScreen: _,
    allowPaymentRequest: _,
    allowUserMedia: _,
    alpha: _,
    alt: null,
    as: null,
    async: _,
    autoCapitalize: null,
    autoComplete: X,
    autoFocus: _,
    autoPlay: _,
    blocking: X,
    capture: null,
    charSet: null,
    checked: _,
    cite: null,
    className: X,
    closedBy: null,
    colorSpace: null,
    cols: S,
    colSpan: S,
    command: null,
    commandFor: null,
    content: null,
    contentEditable: ne,
    controls: _,
    controlsList: X,
    coords: S | Ue,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: _,
    defer: _,
    dir: null,
    dirName: null,
    disabled: _,
    download: Zt,
    draggable: ne,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: _,
    formTarget: null,
    headers: X,
    height: S,
    hidden: Zt,
    high: S,
    href: null,
    hrefLang: null,
    htmlFor: X,
    httpEquiv: X,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: _,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: _,
    itemId: null,
    itemProp: X,
    itemRef: X,
    itemScope: _,
    itemType: X,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: _,
    low: S,
    manifest: null,
    max: null,
    maxLength: S,
    media: null,
    method: null,
    min: null,
    minLength: S,
    multiple: _,
    muted: _,
    name: null,
    nonce: null,
    noModule: _,
    noValidate: _,
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
    open: _,
    optimum: S,
    pattern: null,
    ping: X,
    placeholder: null,
    playsInline: _,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: _,
    referrerPolicy: null,
    rel: X,
    required: _,
    reversed: _,
    rows: S,
    rowSpan: S,
    sandbox: X,
    scope: null,
    scoped: _,
    seamless: _,
    selected: _,
    shadowRootClonable: _,
    shadowRootCustomElementRegistry: _,
    shadowRootDelegatesFocus: _,
    shadowRootMode: null,
    shadowRootSerializable: _,
    shape: null,
    size: S,
    sizes: null,
    slot: null,
    span: S,
    spellCheck: ne,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: S,
    step: null,
    style: null,
    tabIndex: S,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: _,
    useMap: null,
    value: ne,
    width: S,
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
    border: S,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: S,
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
    compact: _,
    // Lists. Use CSS to reduce space between items instead
    declare: _,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: S,
    // `<img>` and `<object>`
    leftMargin: S,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: S,
    // `<body>`
    marginWidth: S,
    // `<body>`
    noResize: _,
    // `<frame>`
    noHref: _,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: _,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: _,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: S,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: ne,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: S,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: S,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    credentialless: _,
    disablePictureInPicture: _,
    disableRemotePlayback: _,
    exportParts: Ue,
    part: X,
    prefix: null,
    property: null,
    results: S,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: Ur
}), gl = Ge({
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
    accentHeight: S,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: S,
    amplitude: S,
    arabicForm: null,
    ascent: S,
    attributeName: null,
    attributeType: null,
    azimuth: S,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: S,
    by: null,
    calcMode: null,
    capHeight: S,
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
    descent: S,
    diffuseConstant: S,
    direction: null,
    display: null,
    dur: null,
    divisor: S,
    dominantBaseline: null,
    download: _,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: S,
    enableBackground: null,
    end: null,
    event: null,
    exponent: S,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: S,
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
    g1: Ue,
    g2: Ue,
    glyphName: Ue,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: S,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: S,
    horizOriginX: S,
    horizOriginY: S,
    id: null,
    ideographic: S,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: S,
    k: S,
    k1: S,
    k2: S,
    k3: S,
    k4: S,
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
    limitingConeAngle: S,
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
    mediaSize: S,
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
    overlinePosition: S,
    overlineThickness: S,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: S,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: X,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: S,
    pointsAtY: S,
    pointsAtZ: S,
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
    specularConstant: S,
    specularExponent: S,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: S,
    strikethroughThickness: S,
    string: null,
    stroke: null,
    strokeDashArray: ge,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: S,
    strokeOpacity: S,
    strokeWidth: null,
    style: null,
    surfaceScale: S,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: ge,
    tabIndex: S,
    tableValues: null,
    target: null,
    targetX: S,
    targetY: S,
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
    underlinePosition: S,
    underlineThickness: S,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: S,
    values: null,
    vAlphabetic: S,
    vMathematical: S,
    vectorEffect: null,
    vHanging: S,
    vIdeographic: S,
    version: null,
    vertAdvY: S,
    vertOriginX: S,
    vertOriginY: S,
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
    xHeight: S,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: Hr
}), Vr = Ge({
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
}), qr = Ge({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: Ur
}), Wr = Ge({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, n) {
    return "xml:" + n.slice(3).toLowerCase();
  }
}), xl = {
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
}, yl = /[A-Z]/g, Nn = /-[a-z]/g, kl = /^data[-\w.:]+$/i;
function bl(e, n) {
  const t = Kt(n);
  let r = n, i = ue;
  if (t in e.normal)
    return e.property[e.normal[t]];
  if (t.length > 4 && t.slice(0, 4) === "data" && kl.test(n)) {
    if (n.charAt(4) === "-") {
      const o = n.slice(5).replace(Nn, vl);
      r = "data" + o.charAt(0).toUpperCase() + o.slice(1);
    } else {
      const o = n.slice(4);
      if (!Nn.test(o)) {
        let l = o.replace(yl, wl);
        l.charAt(0) !== "-" && (l = "-" + l), n = "data" + l;
      }
    }
    i = pn;
  }
  return new i(r, n);
}
function wl(e) {
  return "-" + e.toLowerCase();
}
function vl(e) {
  return e.charAt(1).toUpperCase();
}
const Cl = $r([jr, ml, Vr, qr, Wr], "html"), hn = $r([jr, gl, Vr, qr, Wr], "svg");
function Sl(e) {
  return e.join(" ").trim();
}
var Ct = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Yr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var dn = {}, Rn = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, El = /\n/g, Il = /^\s*/, Tl = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, Al = /^:\s*/, Pl = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, zl = /^[;\s]*/, Ll = /^\s+|\s+$/g, Dl = `
`, On = "/", Mn = "*", He = "", Fl = "comment", _l = "declaration";
function Nl(e, n) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  n = n || {};
  var t = 1, r = 1;
  function i(d) {
    var x = d.match(El);
    x && (t += x.length);
    var w = d.lastIndexOf(Dl);
    r = ~w ? d.length - w : r + d.length;
  }
  function o() {
    var d = { line: t, column: r };
    return function(x) {
      return x.position = new l(d), u(), x;
    };
  }
  function l(d) {
    this.start = d, this.end = { line: t, column: r }, this.source = n.source;
  }
  l.prototype.content = e;
  function a(d) {
    var x = new Error(
      n.source + ":" + t + ":" + r + ": " + d
    );
    if (x.reason = d, x.filename = n.source, x.line = t, x.column = r, x.source = e, !n.silent) throw x;
  }
  function s(d) {
    var x = d.exec(e);
    if (x) {
      var w = x[0];
      return i(w), e = e.slice(w.length), x;
    }
  }
  function u() {
    s(Il);
  }
  function f(d) {
    var x;
    for (d = d || []; x = c(); )
      x !== !1 && d.push(x);
    return d;
  }
  function c() {
    var d = o();
    if (!(On != e.charAt(0) || Mn != e.charAt(1))) {
      for (var x = 2; He != e.charAt(x) && (Mn != e.charAt(x) || On != e.charAt(x + 1)); )
        ++x;
      if (x += 2, He === e.charAt(x - 1))
        return a("End of comment missing");
      var w = e.slice(2, x - 2);
      return r += 2, i(w), e = e.slice(x), r += 2, d({
        type: Fl,
        comment: w
      });
    }
  }
  function h() {
    var d = o(), x = s(Tl);
    if (x) {
      if (c(), !s(Al)) return a("property missing ':'");
      var w = s(Pl), y = d({
        type: _l,
        property: Bn(x[0].replace(Rn, He)),
        value: w ? Bn(w[0].replace(Rn, He)) : He
      });
      return s(zl), y;
    }
  }
  function p() {
    var d = [];
    f(d);
    for (var x; x = h(); )
      x !== !1 && (d.push(x), f(d));
    return d;
  }
  return u(), p();
}
function Bn(e) {
  return e ? e.replace(Ll, He) : He;
}
var Rl = Nl, Ol = Ct && Ct.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(dn, "__esModule", { value: !0 });
dn.default = Bl;
const Ml = Ol(Rl);
function Bl(e, n) {
  let t = null;
  if (!e || typeof e != "string")
    return t;
  const r = (0, Ml.default)(e), i = typeof n == "function";
  return r.forEach((o) => {
    if (o.type !== "declaration")
      return;
    const { property: l, value: a } = o;
    i ? n(l, a, o) : a && (t = t || {}, t[l] = a);
  }), t;
}
var At = {};
Object.defineProperty(At, "__esModule", { value: !0 });
At.camelCase = void 0;
var $l = /^--[a-zA-Z0-9_-]+$/, jl = /-([a-z])/g, Hl = /^[^-]+$/, Ul = /^-(webkit|moz|ms|o|khtml)-/, Vl = /^-(ms)-/, ql = function(e) {
  return !e || Hl.test(e) || $l.test(e);
}, Wl = function(e, n) {
  return n.toUpperCase();
}, $n = function(e, n) {
  return "".concat(n, "-");
}, Yl = function(e, n) {
  return n === void 0 && (n = {}), ql(e) ? e : (e = e.toLowerCase(), n.reactCompat ? e = e.replace(Vl, $n) : e = e.replace(Ul, $n), e.replace(jl, Wl));
};
At.camelCase = Yl;
var Ql = Ct && Ct.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, Xl = Ql(dn), Gl = At;
function tn(e, n) {
  var t = {};
  return !e || typeof e != "string" || (0, Xl.default)(e, function(r, i) {
    r && i && (t[(0, Gl.camelCase)(r, n)] = i);
  }), t;
}
tn.default = tn;
var Jl = tn;
const Kl = /* @__PURE__ */ Yr(Jl), Qr = Xr("end"), mn = Xr("start");
function Xr(e) {
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
function Zl(e) {
  const n = mn(e), t = Qr(e);
  if (n && t)
    return { start: n, end: t };
}
function it(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? jn(e.position) : "start" in e || "end" in e ? jn(e) : "line" in e || "column" in e ? nn(e) : "";
}
function nn(e) {
  return Hn(e && e.line) + ":" + Hn(e && e.column);
}
function jn(e) {
  return nn(e && e.start) + "-" + nn(e && e.end);
}
function Hn(e) {
  return e && typeof e == "number" ? e : 1;
}
class le extends Error {
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
    let i = "", o = {}, l = !1;
    if (t && ("line" in t && "column" in t ? o = { place: t } : "start" in t && "end" in t ? o = { place: t } : "type" in t ? o = {
      ancestors: [t],
      place: t.position
    } : o = { ...t }), typeof n == "string" ? i = n : !o.cause && n && (l = !0, i = n.message, o.cause = n), !o.ruleId && !o.source && typeof r == "string") {
      const s = r.indexOf(":");
      s === -1 ? o.ruleId = r : (o.source = r.slice(0, s), o.ruleId = r.slice(s + 1));
    }
    if (!o.place && o.ancestors && o.ancestors) {
      const s = o.ancestors[o.ancestors.length - 1];
      s && (o.place = s.position);
    }
    const a = o.place && "start" in o.place ? o.place.start : o.place;
    this.ancestors = o.ancestors || void 0, this.cause = o.cause || void 0, this.column = a ? a.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = a ? a.line : void 0, this.name = it(o.place) || "1:1", this.place = o.place || void 0, this.reason = this.message, this.ruleId = o.ruleId || void 0, this.source = o.source || void 0, this.stack = l && o.cause && typeof o.cause.stack == "string" ? o.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
le.prototype.file = "";
le.prototype.name = "";
le.prototype.reason = "";
le.prototype.message = "";
le.prototype.stack = "";
le.prototype.column = void 0;
le.prototype.line = void 0;
le.prototype.ancestors = void 0;
le.prototype.cause = void 0;
le.prototype.fatal = void 0;
le.prototype.place = void 0;
le.prototype.ruleId = void 0;
le.prototype.source = void 0;
const gn = {}.hasOwnProperty, eo = /* @__PURE__ */ new Map(), to = /[A-Z]/g, no = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), ro = /* @__PURE__ */ new Set(["td", "th"]), Gr = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function io(e, n) {
  if (!n || n.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const t = n.filePath || void 0;
  let r;
  if (n.development) {
    if (typeof n.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = po(t, n.jsxDEV);
  } else {
    if (typeof n.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof n.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = fo(t, n.jsx, n.jsxs);
  }
  const i = {
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
    schema: n.space === "svg" ? hn : Cl,
    stylePropertyNameCase: n.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: n.tableCellAlignToStyle !== !1
  }, o = Jr(i, e, void 0);
  return o && typeof o != "string" ? o : i.create(
    e,
    i.Fragment,
    { children: o || void 0 },
    void 0
  );
}
function Jr(e, n, t) {
  if (n.type === "element")
    return lo(e, n, t);
  if (n.type === "mdxFlowExpression" || n.type === "mdxTextExpression")
    return oo(e, n);
  if (n.type === "mdxJsxFlowElement" || n.type === "mdxJsxTextElement")
    return so(e, n, t);
  if (n.type === "mdxjsEsm")
    return ao(e, n);
  if (n.type === "root")
    return uo(e, n, t);
  if (n.type === "text")
    return co(e, n);
}
function lo(e, n, t) {
  const r = e.schema;
  let i = r;
  n.tagName.toLowerCase() === "svg" && r.space === "html" && (i = hn, e.schema = i), e.ancestors.push(n);
  const o = Zr(e, n.tagName, !1), l = ho(e, n);
  let a = yn(e, n);
  return no.has(n.tagName) && (a = a.filter(function(s) {
    return typeof s == "string" ? !hl(s) : !0;
  })), Kr(e, l, o, n), xn(l, a), e.ancestors.pop(), e.schema = r, e.create(n, o, l, t);
}
function oo(e, n) {
  if (n.data && n.data.estree && e.evaluater) {
    const r = n.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  ct(e, n.position);
}
function ao(e, n) {
  if (n.data && n.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(n.data.estree)
    );
  ct(e, n.position);
}
function so(e, n, t) {
  const r = e.schema;
  let i = r;
  n.name === "svg" && r.space === "html" && (i = hn, e.schema = i), e.ancestors.push(n);
  const o = n.name === null ? e.Fragment : Zr(e, n.name, !0), l = mo(e, n), a = yn(e, n);
  return Kr(e, l, o, n), xn(l, a), e.ancestors.pop(), e.schema = r, e.create(n, o, l, t);
}
function uo(e, n, t) {
  const r = {};
  return xn(r, yn(e, n)), e.create(n, e.Fragment, r, t);
}
function co(e, n) {
  return n.value;
}
function Kr(e, n, t, r) {
  typeof t != "string" && t !== e.Fragment && e.passNode && (n.node = r);
}
function xn(e, n) {
  if (n.length > 0) {
    const t = n.length > 1 ? n : n[0];
    t && (e.children = t);
  }
}
function fo(e, n, t) {
  return r;
  function r(i, o, l, a) {
    const u = Array.isArray(l.children) ? t : n;
    return a ? u(o, l, a) : u(o, l);
  }
}
function po(e, n) {
  return t;
  function t(r, i, o, l) {
    const a = Array.isArray(o.children), s = mn(r);
    return n(
      i,
      o,
      l,
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
function ho(e, n) {
  const t = {};
  let r, i;
  for (i in n.properties)
    if (i !== "children" && gn.call(n.properties, i)) {
      const o = go(e, i, n.properties[i]);
      if (o) {
        const [l, a] = o;
        e.tableCellAlignToStyle && l === "align" && typeof a == "string" && ro.has(n.tagName) ? r = a : t[l] = a;
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
function mo(e, n) {
  const t = {};
  for (const r of n.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const o = r.data.estree.body[0];
        o.type;
        const l = o.expression;
        l.type;
        const a = l.properties[0];
        a.type, Object.assign(
          t,
          e.evaluater.evaluateExpression(a.argument)
        );
      } else
        ct(e, n.position);
    else {
      const i = r.name;
      let o;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const a = r.value.data.estree.body[0];
          a.type, o = e.evaluater.evaluateExpression(a.expression);
        } else
          ct(e, n.position);
      else
        o = r.value === null ? !0 : r.value;
      t[i] = /** @type {Props[keyof Props]} */
      o;
    }
  return t;
}
function yn(e, n) {
  const t = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : eo;
  for (; ++r < n.children.length; ) {
    const o = n.children[r];
    let l;
    if (e.passKeys) {
      const s = o.type === "element" ? o.tagName : o.type === "mdxJsxFlowElement" || o.type === "mdxJsxTextElement" ? o.name : void 0;
      if (s) {
        const u = i.get(s) || 0;
        l = s + "-" + u, i.set(s, u + 1);
      }
    }
    const a = Jr(e, o, l);
    a !== void 0 && t.push(a);
  }
  return t;
}
function go(e, n, t) {
  const r = bl(e.schema, n);
  if (!(t == null || typeof t == "number" && Number.isNaN(t))) {
    if (Array.isArray(t) && (t = r.commaSeparated ? sl(t) : Sl(t)), r.property === "style") {
      let i = typeof t == "object" ? t : xo(e, String(t));
      return e.stylePropertyNameCase === "css" && (i = yo(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? xl[r.property] || r.property : r.attribute,
      t
    ];
  }
}
function xo(e, n) {
  try {
    return Kl(n, { reactCompat: !0 });
  } catch (t) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      t
    ), i = new le("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw i.file = e.filePath || void 0, i.url = Gr + "#cannot-parse-style-attribute", i;
  }
}
function Zr(e, n, t) {
  let r;
  if (!t)
    r = { type: "Literal", value: n };
  else if (n.includes(".")) {
    const i = n.split(".");
    let o = -1, l;
    for (; ++o < i.length; ) {
      const a = Dn(i[o]) ? { type: "Identifier", name: i[o] } : { type: "Literal", value: i[o] };
      l = l ? {
        type: "MemberExpression",
        object: l,
        property: a,
        computed: !!(o && a.type === "Literal"),
        optional: !1
      } : a;
    }
    r = l;
  } else
    r = Dn(n) && !/^[a-z]/.test(n) ? { type: "Identifier", name: n } : { type: "Literal", value: n };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return gn.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  ct(e);
}
function ct(e, n) {
  const t = new le(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: n,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw t.file = e.filePath || void 0, t.url = Gr + "#cannot-handle-mdx-estrees-without-createevaluater", t;
}
function yo(e) {
  const n = {};
  let t;
  for (t in e)
    gn.call(e, t) && (n[ko(t)] = e[t]);
  return n;
}
function ko(e) {
  let n = e.replace(to, bo);
  return n.slice(0, 3) === "ms-" && (n = "-" + n), n;
}
function bo(e) {
  return "-" + e.toLowerCase();
}
const Ot = {
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
}, wo = {};
function kn(e, n) {
  const t = wo, r = typeof t.includeImageAlt == "boolean" ? t.includeImageAlt : !0, i = typeof t.includeHtml == "boolean" ? t.includeHtml : !0;
  return ei(e, r, i);
}
function ei(e, n, t) {
  if (vo(e)) {
    if ("value" in e)
      return e.type === "html" && !t ? "" : e.value;
    if (n && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return Un(e.children, n, t);
  }
  return Array.isArray(e) ? Un(e, n, t) : "";
}
function Un(e, n, t) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = ei(e[i], n, t);
  return r.join("");
}
function vo(e) {
  return !!(e && typeof e == "object");
}
const Vn = document.createElement("i");
function bn(e) {
  const n = "&" + e + ";";
  Vn.innerHTML = n;
  const t = Vn.textContent;
  return t.charCodeAt(t.length - 1) === 59 && e !== "semi" || t === n ? !1 : t;
}
function xe(e, n, t, r) {
  const i = e.length;
  let o = 0, l;
  if (n < 0 ? n = -n > i ? 0 : i + n : n = n > i ? i : n, t = t > 0 ? t : 0, r.length < 1e4)
    l = Array.from(r), l.unshift(n, t), e.splice(...l);
  else
    for (t && e.splice(n, t); o < r.length; )
      l = r.slice(o, o + 1e4), l.unshift(n, 0), e.splice(...l), o += 1e4, n += 1e4;
}
function ke(e, n) {
  return e.length > 0 ? (xe(e, e.length, 0, n), e) : n;
}
const qn = {}.hasOwnProperty;
function ti(e) {
  const n = {};
  let t = -1;
  for (; ++t < e.length; )
    Co(n, e[t]);
  return n;
}
function Co(e, n) {
  let t;
  for (t in n) {
    const i = (qn.call(e, t) ? e[t] : void 0) || (e[t] = {}), o = n[t];
    let l;
    if (o)
      for (l in o) {
        qn.call(i, l) || (i[l] = []);
        const a = o[l];
        So(
          // @ts-expect-error Looks like a list.
          i[l],
          Array.isArray(a) ? a : a ? [a] : []
        );
      }
  }
}
function So(e, n) {
  let t = -1;
  const r = [];
  for (; ++t < n.length; )
    (n[t].add === "after" ? e : r).push(n[t]);
  xe(e, 0, 0, r);
}
function ni(e, n) {
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
function Se(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const oe = Oe(/[A-Za-z]/), ie = Oe(/[\dA-Za-z]/), Eo = Oe(/[#-'*+\--9=?A-Z^-~]/);
function St(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const rn = Oe(/\d/), Io = Oe(/[\dA-Fa-f]/), To = Oe(/[!-/:-@[-`{-~]/);
function D(e) {
  return e !== null && e < -2;
}
function G(e) {
  return e !== null && (e < 0 || e === 32);
}
function B(e) {
  return e === -2 || e === -1 || e === 32;
}
const Pt = Oe(new RegExp("\\p{P}|\\p{S}", "u")), Ve = Oe(/\s/);
function Oe(e) {
  return n;
  function n(t) {
    return t !== null && t > -1 && e.test(String.fromCharCode(t));
  }
}
function Je(e) {
  const n = [];
  let t = -1, r = 0, i = 0;
  for (; ++t < e.length; ) {
    const o = e.charCodeAt(t);
    let l = "";
    if (o === 37 && ie(e.charCodeAt(t + 1)) && ie(e.charCodeAt(t + 2)))
      i = 2;
    else if (o < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(o)) || (l = String.fromCharCode(o));
    else if (o > 55295 && o < 57344) {
      const a = e.charCodeAt(t + 1);
      o < 56320 && a > 56319 && a < 57344 ? (l = String.fromCharCode(o, a), i = 1) : l = "�";
    } else
      l = String.fromCharCode(o);
    l && (n.push(e.slice(r, t), encodeURIComponent(l)), r = t + i + 1, l = ""), i && (t += i, i = 0);
  }
  return n.join("") + e.slice(r);
}
function H(e, n, t, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let o = 0;
  return l;
  function l(s) {
    return B(s) ? (e.enter(t), a(s)) : n(s);
  }
  function a(s) {
    return B(s) && o++ < i ? (e.consume(s), a) : (e.exit(t), n(s));
  }
}
const Ao = {
  tokenize: Po
};
function Po(e) {
  const n = e.attempt(this.parser.constructs.contentInitial, r, i);
  let t;
  return n;
  function r(a) {
    if (a === null) {
      e.consume(a);
      return;
    }
    return e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), H(e, n, "linePrefix");
  }
  function i(a) {
    return e.enter("paragraph"), o(a);
  }
  function o(a) {
    const s = e.enter("chunkText", {
      contentType: "text",
      previous: t
    });
    return t && (t.next = s), t = s, l(a);
  }
  function l(a) {
    if (a === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(a);
      return;
    }
    return D(a) ? (e.consume(a), e.exit("chunkText"), o) : (e.consume(a), l);
  }
}
const zo = {
  tokenize: Lo
}, Wn = {
  tokenize: Do
};
function Lo(e) {
  const n = this, t = [];
  let r = 0, i, o, l;
  return a;
  function a(C) {
    if (r < t.length) {
      const A = t[r];
      return n.containerState = A[1], e.attempt(A[0].continuation, s, u)(C);
    }
    return u(C);
  }
  function s(C) {
    if (r++, n.containerState._closeFlow) {
      n.containerState._closeFlow = void 0, i && E();
      const A = n.events.length;
      let N = A, v;
      for (; N--; )
        if (n.events[N][0] === "exit" && n.events[N][1].type === "chunkFlow") {
          v = n.events[N][1].end;
          break;
        }
      y(r);
      let $ = A;
      for (; $ < n.events.length; )
        n.events[$][1].end = {
          ...v
        }, $++;
      return xe(n.events, N + 1, 0, n.events.slice(A)), n.events.length = $, u(C);
    }
    return a(C);
  }
  function u(C) {
    if (r === t.length) {
      if (!i)
        return h(C);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return d(C);
      n.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return n.containerState = {}, e.check(Wn, f, c)(C);
  }
  function f(C) {
    return i && E(), y(r), h(C);
  }
  function c(C) {
    return n.parser.lazy[n.now().line] = r !== t.length, l = n.now().offset, d(C);
  }
  function h(C) {
    return n.containerState = {}, e.attempt(Wn, p, d)(C);
  }
  function p(C) {
    return r++, t.push([n.currentConstruct, n.containerState]), h(C);
  }
  function d(C) {
    if (C === null) {
      i && E(), y(0), e.consume(C);
      return;
    }
    return i = i || n.parser.flow(n.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: o
    }), x(C);
  }
  function x(C) {
    if (C === null) {
      w(e.exit("chunkFlow"), !0), y(0), e.consume(C);
      return;
    }
    return D(C) ? (e.consume(C), w(e.exit("chunkFlow")), r = 0, n.interrupt = void 0, a) : (e.consume(C), x);
  }
  function w(C, A) {
    const N = n.sliceStream(C);
    if (A && N.push(null), C.previous = o, o && (o.next = C), o = C, i.defineSkip(C.start), i.write(N), n.parser.lazy[C.start.line]) {
      let v = i.events.length;
      for (; v--; )
        if (
          // The token starts before the line ending…
          i.events[v][1].start.offset < l && // …and either is not ended yet…
          (!i.events[v][1].end || // …or ends after it.
          i.events[v][1].end.offset > l)
        )
          return;
      const $ = n.events.length;
      let Y = $, U, k;
      for (; Y--; )
        if (n.events[Y][0] === "exit" && n.events[Y][1].type === "chunkFlow") {
          if (U) {
            k = n.events[Y][1].end;
            break;
          }
          U = !0;
        }
      for (y(r), v = $; v < n.events.length; )
        n.events[v][1].end = {
          ...k
        }, v++;
      xe(n.events, Y + 1, 0, n.events.slice($)), n.events.length = v;
    }
  }
  function y(C) {
    let A = t.length;
    for (; A-- > C; ) {
      const N = t[A];
      n.containerState = N[1], N[0].exit.call(n, e);
    }
    t.length = C;
  }
  function E() {
    i.write([null]), o = void 0, i = void 0, n.containerState._closeFlow = void 0;
  }
}
function Do(e, n, t) {
  return H(e, e.attempt(this.parser.constructs.document, n, t), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Xe(e) {
  if (e === null || G(e) || Ve(e))
    return 1;
  if (Pt(e))
    return 2;
}
function zt(e, n, t) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const o = e[i].resolveAll;
    o && !r.includes(o) && (n = o(n, t), r.push(o));
  }
  return n;
}
const ln = {
  name: "attention",
  resolveAll: Fo,
  tokenize: _o
};
function Fo(e, n) {
  let t = -1, r, i, o, l, a, s, u, f;
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
          Yn(c, -s), Yn(h, s), l = {
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
          }, i = {
            type: s > 1 ? "strong" : "emphasis",
            start: {
              ...l.start
            },
            end: {
              ...a.end
            }
          }, e[r][1].end = {
            ...l.start
          }, e[t][1].start = {
            ...a.end
          }, u = [], e[r][1].end.offset - e[r][1].start.offset && (u = ke(u, [["enter", e[r][1], n], ["exit", e[r][1], n]])), u = ke(u, [["enter", i, n], ["enter", l, n], ["exit", l, n], ["enter", o, n]]), u = ke(u, zt(n.parser.constructs.insideSpan.null, e.slice(r + 1, t), n)), u = ke(u, [["exit", o, n], ["enter", a, n], ["exit", a, n], ["exit", i, n]]), e[t][1].end.offset - e[t][1].start.offset ? (f = 2, u = ke(u, [["enter", e[t][1], n], ["exit", e[t][1], n]])) : f = 0, xe(e, r - 1, t - r + 3, u), t = r + u.length - f - 2;
          break;
        }
    }
  for (t = -1; ++t < e.length; )
    e[t][1].type === "attentionSequence" && (e[t][1].type = "data");
  return e;
}
function _o(e, n) {
  const t = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Xe(r);
  let o;
  return l;
  function l(s) {
    return o = s, e.enter("attentionSequence"), a(s);
  }
  function a(s) {
    if (s === o)
      return e.consume(s), a;
    const u = e.exit("attentionSequence"), f = Xe(s), c = !f || f === 2 && i || t.includes(s), h = !i || i === 2 && f || t.includes(r);
    return u._open = !!(o === 42 ? c : c && (i || !h)), u._close = !!(o === 42 ? h : h && (f || !c)), n(s);
  }
}
function Yn(e, n) {
  e.column += n, e.offset += n, e._bufferIndex += n;
}
const No = {
  name: "autolink",
  tokenize: Ro
};
function Ro(e, n, t) {
  let r = 0;
  return i;
  function i(p) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), o;
  }
  function o(p) {
    return oe(p) ? (e.consume(p), l) : p === 64 ? t(p) : u(p);
  }
  function l(p) {
    return p === 43 || p === 45 || p === 46 || ie(p) ? (r = 1, a(p)) : u(p);
  }
  function a(p) {
    return p === 58 ? (e.consume(p), r = 0, s) : (p === 43 || p === 45 || p === 46 || ie(p)) && r++ < 32 ? (e.consume(p), a) : (r = 0, u(p));
  }
  function s(p) {
    return p === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), n) : p === null || p === 32 || p === 60 || St(p) ? t(p) : (e.consume(p), s);
  }
  function u(p) {
    return p === 64 ? (e.consume(p), f) : Eo(p) ? (e.consume(p), u) : t(p);
  }
  function f(p) {
    return ie(p) ? c(p) : t(p);
  }
  function c(p) {
    return p === 46 ? (e.consume(p), r = 0, f) : p === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), n) : h(p);
  }
  function h(p) {
    if ((p === 45 || ie(p)) && r++ < 63) {
      const d = p === 45 ? h : c;
      return e.consume(p), d;
    }
    return t(p);
  }
}
const ht = {
  partial: !0,
  tokenize: Oo
};
function Oo(e, n, t) {
  return r;
  function r(o) {
    return B(o) ? H(e, i, "linePrefix")(o) : i(o);
  }
  function i(o) {
    return o === null || D(o) ? n(o) : t(o);
  }
}
const ri = {
  continuation: {
    tokenize: Bo
  },
  exit: $o,
  name: "blockQuote",
  tokenize: Mo
};
function Mo(e, n, t) {
  const r = this;
  return i;
  function i(l) {
    if (l === 62) {
      const a = r.containerState;
      return a.open || (e.enter("blockQuote", {
        _container: !0
      }), a.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(l), e.exit("blockQuoteMarker"), o;
    }
    return t(l);
  }
  function o(l) {
    return B(l) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(l), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), n) : (e.exit("blockQuotePrefix"), n(l));
  }
}
function Bo(e, n, t) {
  const r = this;
  return i;
  function i(l) {
    return B(l) ? H(e, o, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(l) : o(l);
  }
  function o(l) {
    return e.attempt(ri, n, t)(l);
  }
}
function $o(e) {
  e.exit("blockQuote");
}
const ii = {
  name: "characterEscape",
  tokenize: jo
};
function jo(e, n, t) {
  return r;
  function r(o) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(o), e.exit("escapeMarker"), i;
  }
  function i(o) {
    return To(o) ? (e.enter("characterEscapeValue"), e.consume(o), e.exit("characterEscapeValue"), e.exit("characterEscape"), n) : t(o);
  }
}
const li = {
  name: "characterReference",
  tokenize: Ho
};
function Ho(e, n, t) {
  const r = this;
  let i = 0, o, l;
  return a;
  function a(c) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(c), e.exit("characterReferenceMarker"), s;
  }
  function s(c) {
    return c === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(c), e.exit("characterReferenceMarkerNumeric"), u) : (e.enter("characterReferenceValue"), o = 31, l = ie, f(c));
  }
  function u(c) {
    return c === 88 || c === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(c), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), o = 6, l = Io, f) : (e.enter("characterReferenceValue"), o = 7, l = rn, f(c));
  }
  function f(c) {
    if (c === 59 && i) {
      const h = e.exit("characterReferenceValue");
      return l === ie && !bn(r.sliceSerialize(h)) ? t(c) : (e.enter("characterReferenceMarker"), e.consume(c), e.exit("characterReferenceMarker"), e.exit("characterReference"), n);
    }
    return l(c) && i++ < o ? (e.consume(c), f) : t(c);
  }
}
const Qn = {
  partial: !0,
  tokenize: Vo
}, Xn = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Uo
};
function Uo(e, n, t) {
  const r = this, i = {
    partial: !0,
    tokenize: N
  };
  let o = 0, l = 0, a;
  return s;
  function s(v) {
    return u(v);
  }
  function u(v) {
    const $ = r.events[r.events.length - 1];
    return o = $ && $[1].type === "linePrefix" ? $[2].sliceSerialize($[1], !0).length : 0, a = v, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), f(v);
  }
  function f(v) {
    return v === a ? (l++, e.consume(v), f) : l < 3 ? t(v) : (e.exit("codeFencedFenceSequence"), B(v) ? H(e, c, "whitespace")(v) : c(v));
  }
  function c(v) {
    return v === null || D(v) ? (e.exit("codeFencedFence"), r.interrupt ? n(v) : e.check(Qn, x, A)(v)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), h(v));
  }
  function h(v) {
    return v === null || D(v) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), c(v)) : B(v) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), H(e, p, "whitespace")(v)) : v === 96 && v === a ? t(v) : (e.consume(v), h);
  }
  function p(v) {
    return v === null || D(v) ? c(v) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), d(v));
  }
  function d(v) {
    return v === null || D(v) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), c(v)) : v === 96 && v === a ? t(v) : (e.consume(v), d);
  }
  function x(v) {
    return e.attempt(i, A, w)(v);
  }
  function w(v) {
    return e.enter("lineEnding"), e.consume(v), e.exit("lineEnding"), y;
  }
  function y(v) {
    return o > 0 && B(v) ? H(e, E, "linePrefix", o + 1)(v) : E(v);
  }
  function E(v) {
    return v === null || D(v) ? e.check(Qn, x, A)(v) : (e.enter("codeFlowValue"), C(v));
  }
  function C(v) {
    return v === null || D(v) ? (e.exit("codeFlowValue"), E(v)) : (e.consume(v), C);
  }
  function A(v) {
    return e.exit("codeFenced"), n(v);
  }
  function N(v, $, Y) {
    let U = 0;
    return k;
    function k(O) {
      return v.enter("lineEnding"), v.consume(O), v.exit("lineEnding"), P;
    }
    function P(O) {
      return v.enter("codeFencedFence"), B(O) ? H(v, L, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(O) : L(O);
    }
    function L(O) {
      return O === a ? (v.enter("codeFencedFenceSequence"), q(O)) : Y(O);
    }
    function q(O) {
      return O === a ? (U++, v.consume(O), q) : U >= l ? (v.exit("codeFencedFenceSequence"), B(O) ? H(v, J, "whitespace")(O) : J(O)) : Y(O);
    }
    function J(O) {
      return O === null || D(O) ? (v.exit("codeFencedFence"), $(O)) : Y(O);
    }
  }
}
function Vo(e, n, t) {
  const r = this;
  return i;
  function i(l) {
    return l === null ? t(l) : (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), o);
  }
  function o(l) {
    return r.parser.lazy[r.now().line] ? t(l) : n(l);
  }
}
const Mt = {
  name: "codeIndented",
  tokenize: Wo
}, qo = {
  partial: !0,
  tokenize: Yo
};
function Wo(e, n, t) {
  const r = this;
  return i;
  function i(u) {
    return e.enter("codeIndented"), H(e, o, "linePrefix", 5)(u);
  }
  function o(u) {
    const f = r.events[r.events.length - 1];
    return f && f[1].type === "linePrefix" && f[2].sliceSerialize(f[1], !0).length >= 4 ? l(u) : t(u);
  }
  function l(u) {
    return u === null ? s(u) : D(u) ? e.attempt(qo, l, s)(u) : (e.enter("codeFlowValue"), a(u));
  }
  function a(u) {
    return u === null || D(u) ? (e.exit("codeFlowValue"), l(u)) : (e.consume(u), a);
  }
  function s(u) {
    return e.exit("codeIndented"), n(u);
  }
}
function Yo(e, n, t) {
  const r = this;
  return i;
  function i(l) {
    return r.parser.lazy[r.now().line] ? t(l) : D(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), i) : H(e, o, "linePrefix", 5)(l);
  }
  function o(l) {
    const a = r.events[r.events.length - 1];
    return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? n(l) : D(l) ? i(l) : t(l);
  }
}
const Qo = {
  name: "codeText",
  previous: Go,
  resolve: Xo,
  tokenize: Jo
};
function Xo(e) {
  let n = e.length - 4, t = 3, r, i;
  if ((e[t][1].type === "lineEnding" || e[t][1].type === "space") && (e[n][1].type === "lineEnding" || e[n][1].type === "space")) {
    for (r = t; ++r < n; )
      if (e[r][1].type === "codeTextData") {
        e[t][1].type = "codeTextPadding", e[n][1].type = "codeTextPadding", t += 2, n -= 2;
        break;
      }
  }
  for (r = t - 1, n++; ++r <= n; )
    i === void 0 ? r !== n && e[r][1].type !== "lineEnding" && (i = r) : (r === n || e[r][1].type === "lineEnding") && (e[i][1].type = "codeTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), n -= r - i - 2, r = i + 2), i = void 0);
  return e;
}
function Go(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function Jo(e, n, t) {
  let r = 0, i, o;
  return l;
  function l(c) {
    return e.enter("codeText"), e.enter("codeTextSequence"), a(c);
  }
  function a(c) {
    return c === 96 ? (e.consume(c), r++, a) : (e.exit("codeTextSequence"), s(c));
  }
  function s(c) {
    return c === null ? t(c) : c === 32 ? (e.enter("space"), e.consume(c), e.exit("space"), s) : c === 96 ? (o = e.enter("codeTextSequence"), i = 0, f(c)) : D(c) ? (e.enter("lineEnding"), e.consume(c), e.exit("lineEnding"), s) : (e.enter("codeTextData"), u(c));
  }
  function u(c) {
    return c === null || c === 32 || c === 96 || D(c) ? (e.exit("codeTextData"), s(c)) : (e.consume(c), u);
  }
  function f(c) {
    return c === 96 ? (e.consume(c), i++, f) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), n(c)) : (o.type = "codeTextData", u(c));
  }
}
class Ko {
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
    const i = t || 0;
    this.setCursor(Math.trunc(n));
    const o = this.right.splice(this.right.length - i, Number.POSITIVE_INFINITY);
    return r && nt(this.left, r), o.reverse();
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
    this.setCursor(Number.POSITIVE_INFINITY), nt(this.left, n);
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
    this.setCursor(0), nt(this.right, n.reverse());
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
        nt(this.right, t.reverse());
      } else {
        const t = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
        nt(this.left, t.reverse());
      }
  }
}
function nt(e, n) {
  let t = 0;
  if (n.length < 1e4)
    e.push(...n);
  else
    for (; t < n.length; )
      e.push(...n.slice(t, t + 1e4)), t += 1e4;
}
function oi(e) {
  const n = {};
  let t = -1, r, i, o, l, a, s, u;
  const f = new Ko(e);
  for (; ++t < f.length; ) {
    for (; t in n; )
      t = n[t];
    if (r = f.get(t), t && r[1].type === "chunkFlow" && f.get(t - 1)[1].type === "listItemPrefix" && (s = r[1]._tokenizer.events, o = 0, o < s.length && s[o][1].type === "lineEndingBlank" && (o += 2), o < s.length && s[o][1].type === "content"))
      for (; ++o < s.length && s[o][1].type !== "content"; )
        s[o][1].type === "chunkText" && (s[o][1]._isInFirstContentOfListItem = !0, o++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(n, Zo(f, t)), t = n[t], u = !0);
    else if (r[1]._container) {
      for (o = t, i = void 0; o--; )
        if (l = f.get(o), l[1].type === "lineEnding" || l[1].type === "lineEndingBlank")
          l[0] === "enter" && (i && (f.get(i)[1].type = "lineEndingBlank"), l[1].type = "lineEnding", i = o);
        else if (!(l[1].type === "linePrefix" || l[1].type === "listItemIndent")) break;
      i && (r[1].end = {
        ...f.get(i)[1].start
      }, a = f.slice(i, t), a.unshift(r), f.splice(i, t - i + 1, a));
    }
  }
  return xe(e, 0, Number.POSITIVE_INFINITY, f.slice(0)), !u;
}
function Zo(e, n) {
  const t = e.get(n)[1], r = e.get(n)[2];
  let i = n - 1;
  const o = [];
  let l = t._tokenizer;
  l || (l = r.parser[t.contentType](t.start), t._contentTypeTextTrailing && (l._contentTypeTextTrailing = !0));
  const a = l.events, s = [], u = {};
  let f, c, h = -1, p = t, d = 0, x = 0;
  const w = [x];
  for (; p; ) {
    for (; e.get(++i)[1] !== p; )
      ;
    o.push(i), p._tokenizer || (f = r.sliceStream(p), p.next || f.push(null), c && l.defineSkip(p.start), p._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = !0), l.write(f), p._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = void 0)), c = p, p = p.next;
  }
  for (p = t; ++h < a.length; )
    // Find a void token that includes a break.
    a[h][0] === "exit" && a[h - 1][0] === "enter" && a[h][1].type === a[h - 1][1].type && a[h][1].start.line !== a[h][1].end.line && (x = h + 1, w.push(x), p._tokenizer = void 0, p.previous = void 0, p = p.next);
  for (l.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : w.pop(), h = w.length; h--; ) {
    const y = a.slice(w[h], w[h + 1]), E = o.pop();
    s.push([E, E + y.length - 1]), e.splice(E, 2, y);
  }
  for (s.reverse(), h = -1; ++h < s.length; )
    u[d + s[h][0]] = d + s[h][1], d += s[h][1] - s[h][0] - 1;
  return u;
}
const ea = {
  resolve: na,
  tokenize: ra
}, ta = {
  partial: !0,
  tokenize: ia
};
function na(e) {
  return oi(e), e;
}
function ra(e, n) {
  let t;
  return r;
  function r(a) {
    return e.enter("content"), t = e.enter("chunkContent", {
      contentType: "content"
    }), i(a);
  }
  function i(a) {
    return a === null ? o(a) : D(a) ? e.check(ta, l, o)(a) : (e.consume(a), i);
  }
  function o(a) {
    return e.exit("chunkContent"), e.exit("content"), n(a);
  }
  function l(a) {
    return e.consume(a), e.exit("chunkContent"), t.next = e.enter("chunkContent", {
      contentType: "content",
      previous: t
    }), t = t.next, i;
  }
}
function ia(e, n, t) {
  const r = this;
  return i;
  function i(l) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), H(e, o, "linePrefix");
  }
  function o(l) {
    if (l === null || D(l))
      return t(l);
    const a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? n(l) : e.interrupt(r.parser.constructs.flow, t, n)(l);
  }
}
function ai(e, n, t, r, i, o, l, a, s) {
  const u = s || Number.POSITIVE_INFINITY;
  let f = 0;
  return c;
  function c(y) {
    return y === 60 ? (e.enter(r), e.enter(i), e.enter(o), e.consume(y), e.exit(o), h) : y === null || y === 32 || y === 41 || St(y) ? t(y) : (e.enter(r), e.enter(l), e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), x(y));
  }
  function h(y) {
    return y === 62 ? (e.enter(o), e.consume(y), e.exit(o), e.exit(i), e.exit(r), n) : (e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), p(y));
  }
  function p(y) {
    return y === 62 ? (e.exit("chunkString"), e.exit(a), h(y)) : y === null || y === 60 || D(y) ? t(y) : (e.consume(y), y === 92 ? d : p);
  }
  function d(y) {
    return y === 60 || y === 62 || y === 92 ? (e.consume(y), p) : p(y);
  }
  function x(y) {
    return !f && (y === null || y === 41 || G(y)) ? (e.exit("chunkString"), e.exit(a), e.exit(l), e.exit(r), n(y)) : f < u && y === 40 ? (e.consume(y), f++, x) : y === 41 ? (e.consume(y), f--, x) : y === null || y === 32 || y === 40 || St(y) ? t(y) : (e.consume(y), y === 92 ? w : x);
  }
  function w(y) {
    return y === 40 || y === 41 || y === 92 ? (e.consume(y), x) : x(y);
  }
}
function si(e, n, t, r, i, o) {
  const l = this;
  let a = 0, s;
  return u;
  function u(p) {
    return e.enter(r), e.enter(i), e.consume(p), e.exit(i), e.enter(o), f;
  }
  function f(p) {
    return a > 999 || p === null || p === 91 || p === 93 && !s || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    p === 94 && !a && "_hiddenFootnoteSupport" in l.parser.constructs ? t(p) : p === 93 ? (e.exit(o), e.enter(i), e.consume(p), e.exit(i), e.exit(r), n) : D(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), f) : (e.enter("chunkString", {
      contentType: "string"
    }), c(p));
  }
  function c(p) {
    return p === null || p === 91 || p === 93 || D(p) || a++ > 999 ? (e.exit("chunkString"), f(p)) : (e.consume(p), s || (s = !B(p)), p === 92 ? h : c);
  }
  function h(p) {
    return p === 91 || p === 92 || p === 93 ? (e.consume(p), a++, c) : c(p);
  }
}
function ui(e, n, t, r, i, o) {
  let l;
  return a;
  function a(h) {
    return h === 34 || h === 39 || h === 40 ? (e.enter(r), e.enter(i), e.consume(h), e.exit(i), l = h === 40 ? 41 : h, s) : t(h);
  }
  function s(h) {
    return h === l ? (e.enter(i), e.consume(h), e.exit(i), e.exit(r), n) : (e.enter(o), u(h));
  }
  function u(h) {
    return h === l ? (e.exit(o), s(l)) : h === null ? t(h) : D(h) ? (e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), H(e, u, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), f(h));
  }
  function f(h) {
    return h === l || h === null || D(h) ? (e.exit("chunkString"), u(h)) : (e.consume(h), h === 92 ? c : f);
  }
  function c(h) {
    return h === l || h === 92 ? (e.consume(h), f) : f(h);
  }
}
function lt(e, n) {
  let t;
  return r;
  function r(i) {
    return D(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), t = !0, r) : B(i) ? H(e, r, t ? "linePrefix" : "lineSuffix")(i) : n(i);
  }
}
const la = {
  name: "definition",
  tokenize: aa
}, oa = {
  partial: !0,
  tokenize: sa
};
function aa(e, n, t) {
  const r = this;
  let i;
  return o;
  function o(p) {
    return e.enter("definition"), l(p);
  }
  function l(p) {
    return si.call(
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
    return i = Se(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), p === 58 ? (e.enter("definitionMarker"), e.consume(p), e.exit("definitionMarker"), s) : t(p);
  }
  function s(p) {
    return G(p) ? lt(e, u)(p) : u(p);
  }
  function u(p) {
    return ai(
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
    return e.attempt(oa, c, c)(p);
  }
  function c(p) {
    return B(p) ? H(e, h, "whitespace")(p) : h(p);
  }
  function h(p) {
    return p === null || D(p) ? (e.exit("definition"), r.parser.defined.push(i), n(p)) : t(p);
  }
}
function sa(e, n, t) {
  return r;
  function r(a) {
    return G(a) ? lt(e, i)(a) : t(a);
  }
  function i(a) {
    return ui(e, o, t, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function o(a) {
    return B(a) ? H(e, l, "whitespace")(a) : l(a);
  }
  function l(a) {
    return a === null || D(a) ? n(a) : t(a);
  }
}
const ua = {
  name: "hardBreakEscape",
  tokenize: ca
};
function ca(e, n, t) {
  return r;
  function r(o) {
    return e.enter("hardBreakEscape"), e.consume(o), i;
  }
  function i(o) {
    return D(o) ? (e.exit("hardBreakEscape"), n(o)) : t(o);
  }
}
const fa = {
  name: "headingAtx",
  resolve: pa,
  tokenize: ha
};
function pa(e, n) {
  let t = e.length - 2, r = 3, i, o;
  return e[r][1].type === "whitespace" && (r += 2), t - 2 > r && e[t][1].type === "whitespace" && (t -= 2), e[t][1].type === "atxHeadingSequence" && (r === t - 1 || t - 4 > r && e[t - 2][1].type === "whitespace") && (t -= r + 1 === t ? 2 : 4), t > r && (i = {
    type: "atxHeadingText",
    start: e[r][1].start,
    end: e[t][1].end
  }, o = {
    type: "chunkText",
    start: e[r][1].start,
    end: e[t][1].end,
    contentType: "text"
  }, xe(e, r, t - r + 1, [["enter", i, n], ["enter", o, n], ["exit", o, n], ["exit", i, n]])), e;
}
function ha(e, n, t) {
  let r = 0;
  return i;
  function i(f) {
    return e.enter("atxHeading"), o(f);
  }
  function o(f) {
    return e.enter("atxHeadingSequence"), l(f);
  }
  function l(f) {
    return f === 35 && r++ < 6 ? (e.consume(f), l) : f === null || G(f) ? (e.exit("atxHeadingSequence"), a(f)) : t(f);
  }
  function a(f) {
    return f === 35 ? (e.enter("atxHeadingSequence"), s(f)) : f === null || D(f) ? (e.exit("atxHeading"), n(f)) : B(f) ? H(e, a, "whitespace")(f) : (e.enter("atxHeadingText"), u(f));
  }
  function s(f) {
    return f === 35 ? (e.consume(f), s) : (e.exit("atxHeadingSequence"), a(f));
  }
  function u(f) {
    return f === null || f === 35 || G(f) ? (e.exit("atxHeadingText"), a(f)) : (e.consume(f), u);
  }
}
const da = [
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
], Gn = ["pre", "script", "style", "textarea"], ma = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: ya,
  tokenize: ka
}, ga = {
  partial: !0,
  tokenize: wa
}, xa = {
  partial: !0,
  tokenize: ba
};
function ya(e) {
  let n = e.length;
  for (; n-- && !(e[n][0] === "enter" && e[n][1].type === "htmlFlow"); )
    ;
  return n > 1 && e[n - 2][1].type === "linePrefix" && (e[n][1].start = e[n - 2][1].start, e[n + 1][1].start = e[n - 2][1].start, e.splice(n - 2, 2)), e;
}
function ka(e, n, t) {
  const r = this;
  let i, o, l, a, s;
  return u;
  function u(g) {
    return f(g);
  }
  function f(g) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(g), c;
  }
  function c(g) {
    return g === 33 ? (e.consume(g), h) : g === 47 ? (e.consume(g), o = !0, x) : g === 63 ? (e.consume(g), i = 3, r.interrupt ? n : m) : oe(g) ? (e.consume(g), l = String.fromCharCode(g), w) : t(g);
  }
  function h(g) {
    return g === 45 ? (e.consume(g), i = 2, p) : g === 91 ? (e.consume(g), i = 5, a = 0, d) : oe(g) ? (e.consume(g), i = 4, r.interrupt ? n : m) : t(g);
  }
  function p(g) {
    return g === 45 ? (e.consume(g), r.interrupt ? n : m) : t(g);
  }
  function d(g) {
    const pe = "CDATA[";
    return g === pe.charCodeAt(a++) ? (e.consume(g), a === pe.length ? r.interrupt ? n : L : d) : t(g);
  }
  function x(g) {
    return oe(g) ? (e.consume(g), l = String.fromCharCode(g), w) : t(g);
  }
  function w(g) {
    if (g === null || g === 47 || g === 62 || G(g)) {
      const pe = g === 47, Ee = l.toLowerCase();
      return !pe && !o && Gn.includes(Ee) ? (i = 1, r.interrupt ? n(g) : L(g)) : da.includes(l.toLowerCase()) ? (i = 6, pe ? (e.consume(g), y) : r.interrupt ? n(g) : L(g)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? t(g) : o ? E(g) : C(g));
    }
    return g === 45 || ie(g) ? (e.consume(g), l += String.fromCharCode(g), w) : t(g);
  }
  function y(g) {
    return g === 62 ? (e.consume(g), r.interrupt ? n : L) : t(g);
  }
  function E(g) {
    return B(g) ? (e.consume(g), E) : k(g);
  }
  function C(g) {
    return g === 47 ? (e.consume(g), k) : g === 58 || g === 95 || oe(g) ? (e.consume(g), A) : B(g) ? (e.consume(g), C) : k(g);
  }
  function A(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || ie(g) ? (e.consume(g), A) : N(g);
  }
  function N(g) {
    return g === 61 ? (e.consume(g), v) : B(g) ? (e.consume(g), N) : C(g);
  }
  function v(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96 ? t(g) : g === 34 || g === 39 ? (e.consume(g), s = g, $) : B(g) ? (e.consume(g), v) : Y(g);
  }
  function $(g) {
    return g === s ? (e.consume(g), s = null, U) : g === null || D(g) ? t(g) : (e.consume(g), $);
  }
  function Y(g) {
    return g === null || g === 34 || g === 39 || g === 47 || g === 60 || g === 61 || g === 62 || g === 96 || G(g) ? N(g) : (e.consume(g), Y);
  }
  function U(g) {
    return g === 47 || g === 62 || B(g) ? C(g) : t(g);
  }
  function k(g) {
    return g === 62 ? (e.consume(g), P) : t(g);
  }
  function P(g) {
    return g === null || D(g) ? L(g) : B(g) ? (e.consume(g), P) : t(g);
  }
  function L(g) {
    return g === 45 && i === 2 ? (e.consume(g), K) : g === 60 && i === 1 ? (e.consume(g), te) : g === 62 && i === 4 ? (e.consume(g), fe) : g === 63 && i === 3 ? (e.consume(g), m) : g === 93 && i === 5 ? (e.consume(g), be) : D(g) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(ga, we, q)(g)) : g === null || D(g) ? (e.exit("htmlFlowData"), q(g)) : (e.consume(g), L);
  }
  function q(g) {
    return e.check(xa, J, we)(g);
  }
  function J(g) {
    return e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), O;
  }
  function O(g) {
    return g === null || D(g) ? q(g) : (e.enter("htmlFlowData"), L(g));
  }
  function K(g) {
    return g === 45 ? (e.consume(g), m) : L(g);
  }
  function te(g) {
    return g === 47 ? (e.consume(g), l = "", ce) : L(g);
  }
  function ce(g) {
    if (g === 62) {
      const pe = l.toLowerCase();
      return Gn.includes(pe) ? (e.consume(g), fe) : L(g);
    }
    return oe(g) && l.length < 8 ? (e.consume(g), l += String.fromCharCode(g), ce) : L(g);
  }
  function be(g) {
    return g === 93 ? (e.consume(g), m) : L(g);
  }
  function m(g) {
    return g === 62 ? (e.consume(g), fe) : g === 45 && i === 2 ? (e.consume(g), m) : L(g);
  }
  function fe(g) {
    return g === null || D(g) ? (e.exit("htmlFlowData"), we(g)) : (e.consume(g), fe);
  }
  function we(g) {
    return e.exit("htmlFlow"), n(g);
  }
}
function ba(e, n, t) {
  const r = this;
  return i;
  function i(l) {
    return D(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), o) : t(l);
  }
  function o(l) {
    return r.parser.lazy[r.now().line] ? t(l) : n(l);
  }
}
function wa(e, n, t) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(ht, n, t);
  }
}
const va = {
  name: "htmlText",
  tokenize: Ca
};
function Ca(e, n, t) {
  const r = this;
  let i, o, l;
  return a;
  function a(m) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(m), s;
  }
  function s(m) {
    return m === 33 ? (e.consume(m), u) : m === 47 ? (e.consume(m), N) : m === 63 ? (e.consume(m), C) : oe(m) ? (e.consume(m), Y) : t(m);
  }
  function u(m) {
    return m === 45 ? (e.consume(m), f) : m === 91 ? (e.consume(m), o = 0, d) : oe(m) ? (e.consume(m), E) : t(m);
  }
  function f(m) {
    return m === 45 ? (e.consume(m), p) : t(m);
  }
  function c(m) {
    return m === null ? t(m) : m === 45 ? (e.consume(m), h) : D(m) ? (l = c, te(m)) : (e.consume(m), c);
  }
  function h(m) {
    return m === 45 ? (e.consume(m), p) : c(m);
  }
  function p(m) {
    return m === 62 ? K(m) : m === 45 ? h(m) : c(m);
  }
  function d(m) {
    const fe = "CDATA[";
    return m === fe.charCodeAt(o++) ? (e.consume(m), o === fe.length ? x : d) : t(m);
  }
  function x(m) {
    return m === null ? t(m) : m === 93 ? (e.consume(m), w) : D(m) ? (l = x, te(m)) : (e.consume(m), x);
  }
  function w(m) {
    return m === 93 ? (e.consume(m), y) : x(m);
  }
  function y(m) {
    return m === 62 ? K(m) : m === 93 ? (e.consume(m), y) : x(m);
  }
  function E(m) {
    return m === null || m === 62 ? K(m) : D(m) ? (l = E, te(m)) : (e.consume(m), E);
  }
  function C(m) {
    return m === null ? t(m) : m === 63 ? (e.consume(m), A) : D(m) ? (l = C, te(m)) : (e.consume(m), C);
  }
  function A(m) {
    return m === 62 ? K(m) : C(m);
  }
  function N(m) {
    return oe(m) ? (e.consume(m), v) : t(m);
  }
  function v(m) {
    return m === 45 || ie(m) ? (e.consume(m), v) : $(m);
  }
  function $(m) {
    return D(m) ? (l = $, te(m)) : B(m) ? (e.consume(m), $) : K(m);
  }
  function Y(m) {
    return m === 45 || ie(m) ? (e.consume(m), Y) : m === 47 || m === 62 || G(m) ? U(m) : t(m);
  }
  function U(m) {
    return m === 47 ? (e.consume(m), K) : m === 58 || m === 95 || oe(m) ? (e.consume(m), k) : D(m) ? (l = U, te(m)) : B(m) ? (e.consume(m), U) : K(m);
  }
  function k(m) {
    return m === 45 || m === 46 || m === 58 || m === 95 || ie(m) ? (e.consume(m), k) : P(m);
  }
  function P(m) {
    return m === 61 ? (e.consume(m), L) : D(m) ? (l = P, te(m)) : B(m) ? (e.consume(m), P) : U(m);
  }
  function L(m) {
    return m === null || m === 60 || m === 61 || m === 62 || m === 96 ? t(m) : m === 34 || m === 39 ? (e.consume(m), i = m, q) : D(m) ? (l = L, te(m)) : B(m) ? (e.consume(m), L) : (e.consume(m), J);
  }
  function q(m) {
    return m === i ? (e.consume(m), i = void 0, O) : m === null ? t(m) : D(m) ? (l = q, te(m)) : (e.consume(m), q);
  }
  function J(m) {
    return m === null || m === 34 || m === 39 || m === 60 || m === 61 || m === 96 ? t(m) : m === 47 || m === 62 || G(m) ? U(m) : (e.consume(m), J);
  }
  function O(m) {
    return m === 47 || m === 62 || G(m) ? U(m) : t(m);
  }
  function K(m) {
    return m === 62 ? (e.consume(m), e.exit("htmlTextData"), e.exit("htmlText"), n) : t(m);
  }
  function te(m) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(m), e.exit("lineEnding"), ce;
  }
  function ce(m) {
    return B(m) ? H(e, be, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(m) : be(m);
  }
  function be(m) {
    return e.enter("htmlTextData"), l(m);
  }
}
const wn = {
  name: "labelEnd",
  resolveAll: Ta,
  resolveTo: Aa,
  tokenize: Pa
}, Sa = {
  tokenize: za
}, Ea = {
  tokenize: La
}, Ia = {
  tokenize: Da
};
function Ta(e) {
  let n = -1;
  const t = [];
  for (; ++n < e.length; ) {
    const r = e[n][1];
    if (t.push(e[n]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const i = r.type === "labelImage" ? 4 : 2;
      r.type = "data", n += i;
    }
  }
  return e.length !== t.length && xe(e, 0, e.length, t), e;
}
function Aa(e, n) {
  let t = e.length, r = 0, i, o, l, a;
  for (; t--; )
    if (i = e[t][1], o) {
      if (i.type === "link" || i.type === "labelLink" && i._inactive)
        break;
      e[t][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (l) {
      if (e[t][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (o = t, i.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else i.type === "labelEnd" && (l = t);
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
      ...e[l][1].end
    }
  }, f = {
    type: "labelText",
    start: {
      ...e[o + r + 2][1].end
    },
    end: {
      ...e[l - 2][1].start
    }
  };
  return a = [["enter", s, n], ["enter", u, n]], a = ke(a, e.slice(o + 1, o + r + 3)), a = ke(a, [["enter", f, n]]), a = ke(a, zt(n.parser.constructs.insideSpan.null, e.slice(o + r + 4, l - 3), n)), a = ke(a, [["exit", f, n], e[l - 2], e[l - 1], ["exit", u, n]]), a = ke(a, e.slice(l + 1)), a = ke(a, [["exit", s, n]]), xe(e, o, e.length, a), e;
}
function Pa(e, n, t) {
  const r = this;
  let i = r.events.length, o, l;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      o = r.events[i][1];
      break;
    }
  return a;
  function a(h) {
    return o ? o._inactive ? c(h) : (l = r.parser.defined.includes(Se(r.sliceSerialize({
      start: o.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(h), e.exit("labelMarker"), e.exit("labelEnd"), s) : t(h);
  }
  function s(h) {
    return h === 40 ? e.attempt(Sa, f, l ? f : c)(h) : h === 91 ? e.attempt(Ea, f, l ? u : c)(h) : l ? f(h) : c(h);
  }
  function u(h) {
    return e.attempt(Ia, f, c)(h);
  }
  function f(h) {
    return n(h);
  }
  function c(h) {
    return o._balanced = !0, t(h);
  }
}
function za(e, n, t) {
  return r;
  function r(c) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(c), e.exit("resourceMarker"), i;
  }
  function i(c) {
    return G(c) ? lt(e, o)(c) : o(c);
  }
  function o(c) {
    return c === 41 ? f(c) : ai(e, l, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(c);
  }
  function l(c) {
    return G(c) ? lt(e, s)(c) : f(c);
  }
  function a(c) {
    return t(c);
  }
  function s(c) {
    return c === 34 || c === 39 || c === 40 ? ui(e, u, t, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(c) : f(c);
  }
  function u(c) {
    return G(c) ? lt(e, f)(c) : f(c);
  }
  function f(c) {
    return c === 41 ? (e.enter("resourceMarker"), e.consume(c), e.exit("resourceMarker"), e.exit("resource"), n) : t(c);
  }
}
function La(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return si.call(r, e, o, l, "reference", "referenceMarker", "referenceString")(a);
  }
  function o(a) {
    return r.parser.defined.includes(Se(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? n(a) : t(a);
  }
  function l(a) {
    return t(a);
  }
}
function Da(e, n, t) {
  return r;
  function r(o) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(o), e.exit("referenceMarker"), i;
  }
  function i(o) {
    return o === 93 ? (e.enter("referenceMarker"), e.consume(o), e.exit("referenceMarker"), e.exit("reference"), n) : t(o);
  }
}
const Fa = {
  name: "labelStartImage",
  resolveAll: wn.resolveAll,
  tokenize: _a
};
function _a(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(a), e.exit("labelImageMarker"), o;
  }
  function o(a) {
    return a === 91 ? (e.enter("labelMarker"), e.consume(a), e.exit("labelMarker"), e.exit("labelImage"), l) : t(a);
  }
  function l(a) {
    return a === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(a) : n(a);
  }
}
const Na = {
  name: "labelStartLink",
  resolveAll: wn.resolveAll,
  tokenize: Ra
};
function Ra(e, n, t) {
  const r = this;
  return i;
  function i(l) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(l), e.exit("labelMarker"), e.exit("labelLink"), o;
  }
  function o(l) {
    return l === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? t(l) : n(l);
  }
}
const Bt = {
  name: "lineEnding",
  tokenize: Oa
};
function Oa(e, n) {
  return t;
  function t(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), H(e, n, "linePrefix");
  }
}
const wt = {
  name: "thematicBreak",
  tokenize: Ma
};
function Ma(e, n, t) {
  let r = 0, i;
  return o;
  function o(u) {
    return e.enter("thematicBreak"), l(u);
  }
  function l(u) {
    return i = u, a(u);
  }
  function a(u) {
    return u === i ? (e.enter("thematicBreakSequence"), s(u)) : r >= 3 && (u === null || D(u)) ? (e.exit("thematicBreak"), n(u)) : t(u);
  }
  function s(u) {
    return u === i ? (e.consume(u), r++, s) : (e.exit("thematicBreakSequence"), B(u) ? H(e, a, "whitespace")(u) : a(u));
  }
}
const se = {
  continuation: {
    tokenize: Ha
  },
  exit: Va,
  name: "list",
  tokenize: ja
}, Ba = {
  partial: !0,
  tokenize: qa
}, $a = {
  partial: !0,
  tokenize: Ua
};
function ja(e, n, t) {
  const r = this, i = r.events[r.events.length - 1];
  let o = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, l = 0;
  return a;
  function a(p) {
    const d = r.containerState.type || (p === 42 || p === 43 || p === 45 ? "listUnordered" : "listOrdered");
    if (d === "listUnordered" ? !r.containerState.marker || p === r.containerState.marker : rn(p)) {
      if (r.containerState.type || (r.containerState.type = d, e.enter(d, {
        _container: !0
      })), d === "listUnordered")
        return e.enter("listItemPrefix"), p === 42 || p === 45 ? e.check(wt, t, u)(p) : u(p);
      if (!r.interrupt || p === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), s(p);
    }
    return t(p);
  }
  function s(p) {
    return rn(p) && ++l < 10 ? (e.consume(p), s) : (!r.interrupt || l < 2) && (r.containerState.marker ? p === r.containerState.marker : p === 41 || p === 46) ? (e.exit("listItemValue"), u(p)) : t(p);
  }
  function u(p) {
    return e.enter("listItemMarker"), e.consume(p), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || p, e.check(
      ht,
      // Can’t be empty when interrupting.
      r.interrupt ? t : f,
      e.attempt(Ba, h, c)
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
function Ha(e, n, t) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(ht, i, o);
  function i(a) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, H(e, n, "listItemIndent", r.containerState.size + 1)(a);
  }
  function o(a) {
    return r.containerState.furtherBlankLines || !B(a) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, l(a)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt($a, n, l)(a));
  }
  function l(a) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, H(e, e.attempt(se, n, t), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a);
  }
}
function Ua(e, n, t) {
  const r = this;
  return H(e, i, "listItemIndent", r.containerState.size + 1);
  function i(o) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === "listItemIndent" && l[2].sliceSerialize(l[1], !0).length === r.containerState.size ? n(o) : t(o);
  }
}
function Va(e) {
  e.exit(this.containerState.type);
}
function qa(e, n, t) {
  const r = this;
  return H(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(o) {
    const l = r.events[r.events.length - 1];
    return !B(o) && l && l[1].type === "listItemPrefixWhitespace" ? n(o) : t(o);
  }
}
const Jn = {
  name: "setextUnderline",
  resolveTo: Wa,
  tokenize: Ya
};
function Wa(e, n) {
  let t = e.length, r, i, o;
  for (; t--; )
    if (e[t][0] === "enter") {
      if (e[t][1].type === "content") {
        r = t;
        break;
      }
      e[t][1].type === "paragraph" && (i = t);
    } else
      e[t][1].type === "content" && e.splice(t, 1), !o && e[t][1].type === "definition" && (o = t);
  const l = {
    type: "setextHeading",
    start: {
      ...e[r][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  };
  return e[i][1].type = "setextHeadingText", o ? (e.splice(i, 0, ["enter", l, n]), e.splice(o + 1, 0, ["exit", e[r][1], n]), e[r][1].end = {
    ...e[o][1].end
  }) : e[r][1] = l, e.push(["exit", l, n]), e;
}
function Ya(e, n, t) {
  const r = this;
  let i;
  return o;
  function o(u) {
    let f = r.events.length, c;
    for (; f--; )
      if (r.events[f][1].type !== "lineEnding" && r.events[f][1].type !== "linePrefix" && r.events[f][1].type !== "content") {
        c = r.events[f][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || c) ? (e.enter("setextHeadingLine"), i = u, l(u)) : t(u);
  }
  function l(u) {
    return e.enter("setextHeadingLineSequence"), a(u);
  }
  function a(u) {
    return u === i ? (e.consume(u), a) : (e.exit("setextHeadingLineSequence"), B(u) ? H(e, s, "lineSuffix")(u) : s(u));
  }
  function s(u) {
    return u === null || D(u) ? (e.exit("setextHeadingLine"), n(u)) : t(u);
  }
}
const Qa = {
  tokenize: Xa
};
function Xa(e) {
  const n = this, t = e.attempt(
    // Try to parse a blank line.
    ht,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, H(e, e.attempt(this.parser.constructs.flow, i, e.attempt(ea, i)), "linePrefix"))
  );
  return t;
  function r(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return e.enter("lineEndingBlank"), e.consume(o), e.exit("lineEndingBlank"), n.currentConstruct = void 0, t;
  }
  function i(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), n.currentConstruct = void 0, t;
  }
}
const Ga = {
  resolveAll: fi()
}, Ja = ci("string"), Ka = ci("text");
function ci(e) {
  return {
    resolveAll: fi(e === "text" ? Za : void 0),
    tokenize: n
  };
  function n(t) {
    const r = this, i = this.parser.constructs[e], o = t.attempt(i, l, a);
    return l;
    function l(f) {
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
      const c = i[f];
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
function fi(e) {
  return n;
  function n(t, r) {
    let i = -1, o;
    for (; ++i <= t.length; )
      o === void 0 ? t[i] && t[i][1].type === "data" && (o = i, i++) : (!t[i] || t[i][1].type !== "data") && (i !== o + 2 && (t[o][1].end = t[i - 1][1].end, t.splice(o + 2, i - o - 2), i = o + 2), o = void 0);
    return e ? e(t, r) : t;
  }
}
function Za(e, n) {
  let t = 0;
  for (; ++t <= e.length; )
    if ((t === e.length || e[t][1].type === "lineEnding") && e[t - 1][1].type === "data") {
      const r = e[t - 1][1], i = n.sliceStream(r);
      let o = i.length, l = -1, a = 0, s;
      for (; o--; ) {
        const u = i[o];
        if (typeof u == "string") {
          for (l = u.length; u.charCodeAt(l - 1) === 32; )
            a++, l--;
          if (l) break;
          l = -1;
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
            _bufferIndex: o ? l : r.start._bufferIndex + l,
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
const es = {
  42: se,
  43: se,
  45: se,
  48: se,
  49: se,
  50: se,
  51: se,
  52: se,
  53: se,
  54: se,
  55: se,
  56: se,
  57: se,
  62: ri
}, ts = {
  91: la
}, ns = {
  [-2]: Mt,
  [-1]: Mt,
  32: Mt
}, rs = {
  35: fa,
  42: wt,
  45: [Jn, wt],
  60: ma,
  61: Jn,
  95: wt,
  96: Xn,
  126: Xn
}, is = {
  38: li,
  92: ii
}, ls = {
  [-5]: Bt,
  [-4]: Bt,
  [-3]: Bt,
  33: Fa,
  38: li,
  42: ln,
  60: [No, va],
  91: Na,
  92: [ua, ii],
  93: wn,
  95: ln,
  96: Qo
}, os = {
  null: [ln, Ga]
}, as = {
  null: [42, 95]
}, ss = {
  null: []
}, us = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: as,
  contentInitial: ts,
  disable: ss,
  document: es,
  flow: rs,
  flowInitial: ns,
  insideSpan: os,
  string: is,
  text: ls
}, Symbol.toStringTag, { value: "Module" }));
function cs(e, n, t) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: t && t.line || 1,
    column: t && t.column || 1,
    offset: t && t.offset || 0
  };
  const i = {}, o = [];
  let l = [], a = [];
  const s = {
    attempt: $(N),
    check: $(v),
    consume: E,
    enter: C,
    exit: A,
    interrupt: $(v, {
      interrupt: !0
    })
  }, u = {
    code: null,
    containerState: {},
    defineSkip: x,
    events: [],
    now: d,
    parser: e,
    previous: null,
    sliceSerialize: h,
    sliceStream: p,
    write: c
  };
  let f = n.tokenize.call(u, s);
  return n.resolveAll && o.push(n), u;
  function c(P) {
    return l = ke(l, P), w(), l[l.length - 1] !== null ? [] : (Y(n, 0), u.events = zt(o, u.events, u), u.events);
  }
  function h(P, L) {
    return ps(p(P), L);
  }
  function p(P) {
    return fs(l, P);
  }
  function d() {
    const {
      _bufferIndex: P,
      _index: L,
      line: q,
      column: J,
      offset: O
    } = r;
    return {
      _bufferIndex: P,
      _index: L,
      line: q,
      column: J,
      offset: O
    };
  }
  function x(P) {
    i[P.line] = P.column, k();
  }
  function w() {
    let P;
    for (; r._index < l.length; ) {
      const L = l[r._index];
      if (typeof L == "string")
        for (P = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === P && r._bufferIndex < L.length; )
          y(L.charCodeAt(r._bufferIndex));
      else
        y(L);
    }
  }
  function y(P) {
    f = f(P);
  }
  function E(P) {
    D(P) ? (r.line++, r.column = 1, r.offset += P === -3 ? 2 : 1, k()) : P !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    l[r._index].length && (r._bufferIndex = -1, r._index++)), u.previous = P;
  }
  function C(P, L) {
    const q = L || {};
    return q.type = P, q.start = d(), u.events.push(["enter", q, u]), a.push(q), q;
  }
  function A(P) {
    const L = a.pop();
    return L.end = d(), u.events.push(["exit", L, u]), L;
  }
  function N(P, L) {
    Y(P, L.from);
  }
  function v(P, L) {
    L.restore();
  }
  function $(P, L) {
    return q;
    function q(J, O, K) {
      let te, ce, be, m;
      return Array.isArray(J) ? (
        /* c8 ignore next 1 */
        we(J)
      ) : "tokenize" in J ? (
        // Looks like a construct.
        we([
          /** @type {Construct} */
          J
        ])
      ) : fe(J);
      function fe(Z) {
        return Me;
        function Me(Le) {
          const z = Le !== null && Z[Le], V = Le !== null && Z.null, W = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(z) ? z : z ? [z] : [],
            ...Array.isArray(V) ? V : V ? [V] : []
          ];
          return we(W)(Le);
        }
      }
      function we(Z) {
        return te = Z, ce = 0, Z.length === 0 ? K : g(Z[ce]);
      }
      function g(Z) {
        return Me;
        function Me(Le) {
          return m = U(), be = Z, Z.partial || (u.currentConstruct = Z), Z.name && u.parser.constructs.disable.null.includes(Z.name) ? Ee() : Z.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            L ? Object.assign(Object.create(u), L) : u,
            s,
            pe,
            Ee
          )(Le);
        }
      }
      function pe(Z) {
        return P(be, m), O;
      }
      function Ee(Z) {
        return m.restore(), ++ce < te.length ? g(te[ce]) : K;
      }
    }
  }
  function Y(P, L) {
    P.resolveAll && !o.includes(P) && o.push(P), P.resolve && xe(u.events, L, u.events.length - L, P.resolve(u.events.slice(L), u)), P.resolveTo && (u.events = P.resolveTo(u.events, u));
  }
  function U() {
    const P = d(), L = u.previous, q = u.currentConstruct, J = u.events.length, O = Array.from(a);
    return {
      from: J,
      restore: K
    };
    function K() {
      r = P, u.previous = L, u.currentConstruct = q, u.events.length = J, a = O, k();
    }
  }
  function k() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function fs(e, n) {
  const t = n.start._index, r = n.start._bufferIndex, i = n.end._index, o = n.end._bufferIndex;
  let l;
  if (t === i)
    l = [e[t].slice(r, o)];
  else {
    if (l = e.slice(t, i), r > -1) {
      const a = l[0];
      typeof a == "string" ? l[0] = a.slice(r) : l.shift();
    }
    o > 0 && l.push(e[i].slice(0, o));
  }
  return l;
}
function ps(e, n) {
  let t = -1;
  const r = [];
  let i;
  for (; ++t < e.length; ) {
    const o = e[t];
    let l;
    if (typeof o == "string")
      l = o;
    else switch (o) {
      case -5: {
        l = "\r";
        break;
      }
      case -4: {
        l = `
`;
        break;
      }
      case -3: {
        l = `\r
`;
        break;
      }
      case -2: {
        l = n ? " " : "	";
        break;
      }
      case -1: {
        if (!n && i) continue;
        l = " ";
        break;
      }
      default:
        l = String.fromCharCode(o);
    }
    i = o === -2, r.push(l);
  }
  return r.join("");
}
function hs(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      ti([us, ...(e || {}).extensions || []])
    ),
    content: i(Ao),
    defined: [],
    document: i(zo),
    flow: i(Qa),
    lazy: {},
    string: i(Ja),
    text: i(Ka)
  };
  return r;
  function i(o) {
    return l;
    function l(a) {
      return cs(r, o, a);
    }
  }
}
function ds(e) {
  for (; !oi(e); )
    ;
  return e;
}
const Kn = /[\0\t\n\r]/g;
function ms() {
  let e = 1, n = "", t = !0, r;
  return i;
  function i(o, l, a) {
    const s = [];
    let u, f, c, h, p;
    for (o = n + (typeof o == "string" ? o.toString() : new TextDecoder(l || void 0).decode(o)), c = 0, n = "", t && (o.charCodeAt(0) === 65279 && c++, t = void 0); c < o.length; ) {
      if (Kn.lastIndex = c, u = Kn.exec(o), h = u && u.index !== void 0 ? u.index : o.length, p = o.charCodeAt(h), !u) {
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
const gs = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function xs(e) {
  return e.replace(gs, ys);
}
function ys(e, n, t) {
  if (n)
    return n;
  if (t.charCodeAt(0) === 35) {
    const i = t.charCodeAt(1), o = i === 120 || i === 88;
    return ni(t.slice(o ? 2 : 1), o ? 16 : 10);
  }
  return bn(t) || e;
}
const pi = {}.hasOwnProperty;
function ks(e, n, t) {
  return n && typeof n == "object" && (t = n, n = void 0), bs(t)(ds(hs(t).document().write(ms()(e, n, !0))));
}
function bs(e) {
  const n = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: o(gt),
      autolinkProtocol: U,
      autolinkEmail: U,
      atxHeading: o(he),
      blockQuote: o(V),
      characterEscape: U,
      characterReference: U,
      codeFenced: o(W),
      codeFencedFenceInfo: l,
      codeFencedFenceMeta: l,
      codeIndented: o(W, l),
      codeText: o(M, l),
      codeTextData: U,
      data: U,
      codeFlowValue: U,
      definition: o(re),
      definitionDestinationString: l,
      definitionLabelString: l,
      definitionTitleString: l,
      emphasis: o(ae),
      hardBreakEscape: o(de),
      hardBreakTrailing: o(de),
      htmlFlow: o(Ne, l),
      htmlFlowData: U,
      htmlText: o(Ne, l),
      htmlTextData: U,
      image: o(_t),
      label: l,
      link: o(gt),
      listItem: o(Ze),
      listItemValue: h,
      listOrdered: o(Ke, c),
      listUnordered: o(Ke),
      paragraph: o(ye),
      reference: g,
      referenceString: l,
      resourceDestinationString: l,
      resourceTitleString: l,
      setextHeading: o(he),
      strong: o(ve),
      thematicBreak: o(Ki)
    },
    exit: {
      atxHeading: s(),
      atxHeadingSequence: N,
      autolink: s(),
      autolinkEmail: z,
      autolinkProtocol: Le,
      blockQuote: s(),
      characterEscapeValue: k,
      characterReferenceMarkerHexadecimal: Ee,
      characterReferenceMarkerNumeric: Ee,
      characterReferenceValue: Z,
      characterReference: Me,
      codeFenced: s(w),
      codeFencedFence: x,
      codeFencedFenceInfo: p,
      codeFencedFenceMeta: d,
      codeFlowValue: k,
      codeIndented: s(y),
      codeText: s(O),
      codeTextData: k,
      data: k,
      definition: s(),
      definitionDestinationString: A,
      definitionLabelString: E,
      definitionTitleString: C,
      emphasis: s(),
      hardBreakEscape: s(L),
      hardBreakTrailing: s(L),
      htmlFlow: s(q),
      htmlFlowData: k,
      htmlText: s(J),
      htmlTextData: k,
      image: s(te),
      label: be,
      labelText: ce,
      lineEnding: P,
      link: s(K),
      listItem: s(),
      listOrdered: s(),
      listUnordered: s(),
      paragraph: s(),
      referenceString: pe,
      resourceDestinationString: m,
      resourceTitleString: fe,
      resource: we,
      setextHeading: s(Y),
      setextHeadingLineSequence: $,
      setextHeadingText: v,
      strong: s(),
      thematicBreak: s()
    }
  };
  hi(n, (e || {}).mdastExtensions || []);
  const t = {};
  return r;
  function r(b) {
    let T = {
      type: "root",
      children: []
    };
    const R = {
      stack: [T],
      tokenStack: [],
      config: n,
      enter: a,
      exit: u,
      buffer: l,
      resume: f,
      data: t
    }, j = [];
    let Q = -1;
    for (; ++Q < b.length; )
      if (b[Q][1].type === "listOrdered" || b[Q][1].type === "listUnordered")
        if (b[Q][0] === "enter")
          j.push(Q);
        else {
          const Ce = j.pop();
          Q = i(b, Ce, Q);
        }
    for (Q = -1; ++Q < b.length; ) {
      const Ce = n[b[Q][0]];
      pi.call(Ce, b[Q][1].type) && Ce[b[Q][1].type].call(Object.assign({
        sliceSerialize: b[Q][2].sliceSerialize
      }, R), b[Q][1]);
    }
    if (R.tokenStack.length > 0) {
      const Ce = R.tokenStack[R.tokenStack.length - 1];
      (Ce[1] || Zn).call(R, void 0, Ce[0]);
    }
    for (T.position = {
      start: Re(b.length > 0 ? b[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: Re(b.length > 0 ? b[b.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, Q = -1; ++Q < n.transforms.length; )
      T = n.transforms[Q](T) || T;
    return T;
  }
  function i(b, T, R) {
    let j = T - 1, Q = -1, Ce = !1, Be, De, et, tt;
    for (; ++j <= R; ) {
      const me = b[j];
      switch (me[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          me[0] === "enter" ? Q++ : Q--, tt = void 0;
          break;
        }
        case "lineEndingBlank": {
          me[0] === "enter" && (Be && !tt && !Q && !et && (et = j), tt = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          tt = void 0;
      }
      if (!Q && me[0] === "enter" && me[1].type === "listItemPrefix" || Q === -1 && me[0] === "exit" && (me[1].type === "listUnordered" || me[1].type === "listOrdered")) {
        if (Be) {
          let We = j;
          for (De = void 0; We--; ) {
            const Fe = b[We];
            if (Fe[1].type === "lineEnding" || Fe[1].type === "lineEndingBlank") {
              if (Fe[0] === "exit") continue;
              De && (b[De][1].type = "lineEndingBlank", Ce = !0), Fe[1].type = "lineEnding", De = We;
            } else if (!(Fe[1].type === "linePrefix" || Fe[1].type === "blockQuotePrefix" || Fe[1].type === "blockQuotePrefixWhitespace" || Fe[1].type === "blockQuoteMarker" || Fe[1].type === "listItemIndent")) break;
          }
          et && (!De || et < De) && (Be._spread = !0), Be.end = Object.assign({}, De ? b[De][1].start : me[1].end), b.splice(De || j, 0, ["exit", Be, me[2]]), j++, R++;
        }
        if (me[1].type === "listItemPrefix") {
          const We = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, me[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Be = We, b.splice(j, 0, ["enter", We, me[2]]), j++, R++, et = void 0, tt = !0;
        }
      }
    }
    return b[T][1]._spread = Ce, R;
  }
  function o(b, T) {
    return R;
    function R(j) {
      a.call(this, b(j), j), T && T.call(this, j);
    }
  }
  function l() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function a(b, T, R) {
    this.stack[this.stack.length - 1].children.push(b), this.stack.push(b), this.tokenStack.push([T, R || void 0]), b.position = {
      start: Re(T.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function s(b) {
    return T;
    function T(R) {
      b && b.call(this, R), u.call(this, R);
    }
  }
  function u(b, T) {
    const R = this.stack.pop(), j = this.tokenStack.pop();
    if (j)
      j[0].type !== b.type && (T ? T.call(this, b, j[0]) : (j[1] || Zn).call(this, b, j[0]));
    else throw new Error("Cannot close `" + b.type + "` (" + it({
      start: b.start,
      end: b.end
    }) + "): it’s not open");
    R.position.end = Re(b.end);
  }
  function f() {
    return kn(this.stack.pop());
  }
  function c() {
    this.data.expectingFirstListItemValue = !0;
  }
  function h(b) {
    if (this.data.expectingFirstListItemValue) {
      const T = this.stack[this.stack.length - 2];
      T.start = Number.parseInt(this.sliceSerialize(b), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function p() {
    const b = this.resume(), T = this.stack[this.stack.length - 1];
    T.lang = b;
  }
  function d() {
    const b = this.resume(), T = this.stack[this.stack.length - 1];
    T.meta = b;
  }
  function x() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function w() {
    const b = this.resume(), T = this.stack[this.stack.length - 1];
    T.value = b.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function y() {
    const b = this.resume(), T = this.stack[this.stack.length - 1];
    T.value = b.replace(/(\r?\n|\r)$/g, "");
  }
  function E(b) {
    const T = this.resume(), R = this.stack[this.stack.length - 1];
    R.label = T, R.identifier = Se(this.sliceSerialize(b)).toLowerCase();
  }
  function C() {
    const b = this.resume(), T = this.stack[this.stack.length - 1];
    T.title = b;
  }
  function A() {
    const b = this.resume(), T = this.stack[this.stack.length - 1];
    T.url = b;
  }
  function N(b) {
    const T = this.stack[this.stack.length - 1];
    if (!T.depth) {
      const R = this.sliceSerialize(b).length;
      T.depth = R;
    }
  }
  function v() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function $(b) {
    const T = this.stack[this.stack.length - 1];
    T.depth = this.sliceSerialize(b).codePointAt(0) === 61 ? 1 : 2;
  }
  function Y() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function U(b) {
    const R = this.stack[this.stack.length - 1].children;
    let j = R[R.length - 1];
    (!j || j.type !== "text") && (j = Ji(), j.position = {
      start: Re(b.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, R.push(j)), this.stack.push(j);
  }
  function k(b) {
    const T = this.stack.pop();
    T.value += this.sliceSerialize(b), T.position.end = Re(b.end);
  }
  function P(b) {
    const T = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const R = T.children[T.children.length - 1];
      R.position.end = Re(b.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && n.canContainEols.includes(T.type) && (U.call(this, b), k.call(this, b));
  }
  function L() {
    this.data.atHardBreak = !0;
  }
  function q() {
    const b = this.resume(), T = this.stack[this.stack.length - 1];
    T.value = b;
  }
  function J() {
    const b = this.resume(), T = this.stack[this.stack.length - 1];
    T.value = b;
  }
  function O() {
    const b = this.resume(), T = this.stack[this.stack.length - 1];
    T.value = b;
  }
  function K() {
    const b = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const T = this.data.referenceType || "shortcut";
      b.type += "Reference", b.referenceType = T, delete b.url, delete b.title;
    } else
      delete b.identifier, delete b.label;
    this.data.referenceType = void 0;
  }
  function te() {
    const b = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const T = this.data.referenceType || "shortcut";
      b.type += "Reference", b.referenceType = T, delete b.url, delete b.title;
    } else
      delete b.identifier, delete b.label;
    this.data.referenceType = void 0;
  }
  function ce(b) {
    const T = this.sliceSerialize(b), R = this.stack[this.stack.length - 2];
    R.label = xs(T), R.identifier = Se(T).toLowerCase();
  }
  function be() {
    const b = this.stack[this.stack.length - 1], T = this.resume(), R = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, R.type === "link") {
      const j = b.children;
      R.children = j;
    } else
      R.alt = T;
  }
  function m() {
    const b = this.resume(), T = this.stack[this.stack.length - 1];
    T.url = b;
  }
  function fe() {
    const b = this.resume(), T = this.stack[this.stack.length - 1];
    T.title = b;
  }
  function we() {
    this.data.inReference = void 0;
  }
  function g() {
    this.data.referenceType = "collapsed";
  }
  function pe(b) {
    const T = this.resume(), R = this.stack[this.stack.length - 1];
    R.label = T, R.identifier = Se(this.sliceSerialize(b)).toLowerCase(), this.data.referenceType = "full";
  }
  function Ee(b) {
    this.data.characterReferenceType = b.type;
  }
  function Z(b) {
    const T = this.sliceSerialize(b), R = this.data.characterReferenceType;
    let j;
    R ? (j = ni(T, R === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : j = bn(T);
    const Q = this.stack[this.stack.length - 1];
    Q.value += j;
  }
  function Me(b) {
    const T = this.stack.pop();
    T.position.end = Re(b.end);
  }
  function Le(b) {
    k.call(this, b);
    const T = this.stack[this.stack.length - 1];
    T.url = this.sliceSerialize(b);
  }
  function z(b) {
    k.call(this, b);
    const T = this.stack[this.stack.length - 1];
    T.url = "mailto:" + this.sliceSerialize(b);
  }
  function V() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function W() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function M() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function re() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function ae() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function he() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function de() {
    return {
      type: "break"
    };
  }
  function Ne() {
    return {
      type: "html",
      value: ""
    };
  }
  function _t() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function gt() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function Ke(b) {
    return {
      type: "list",
      ordered: b.type === "listOrdered",
      start: null,
      spread: b._spread,
      children: []
    };
  }
  function Ze(b) {
    return {
      type: "listItem",
      spread: b._spread,
      checked: null,
      children: []
    };
  }
  function ye() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function ve() {
    return {
      type: "strong",
      children: []
    };
  }
  function Ji() {
    return {
      type: "text",
      value: ""
    };
  }
  function Ki() {
    return {
      type: "thematicBreak"
    };
  }
}
function Re(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function hi(e, n) {
  let t = -1;
  for (; ++t < n.length; ) {
    const r = n[t];
    Array.isArray(r) ? hi(e, r) : ws(e, r);
  }
}
function ws(e, n) {
  let t;
  for (t in n)
    if (pi.call(n, t))
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
function Zn(e, n) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + it({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + n.type + "`, " + it({
    start: n.start,
    end: n.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + n.type + "`, " + it({
    start: n.start,
    end: n.end
  }) + ") is still open");
}
function vs(e) {
  const n = this;
  n.parser = t;
  function t(r) {
    return ks(r, {
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
function Cs(e, n) {
  const t = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(n), !0)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Ss(e, n) {
  const t = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(n, t), [e.applyData(n, t), { type: "text", value: `
` }];
}
function Es(e, n) {
  const t = n.value ? n.value + `
` : "", r = {}, i = n.lang ? n.lang.split(/\s+/) : [];
  i.length > 0 && (r.className = ["language-" + i[0]]);
  let o = {
    type: "element",
    tagName: "code",
    properties: r,
    children: [{ type: "text", value: t }]
  };
  return n.meta && (o.data = { meta: n.meta }), e.patch(n, o), o = e.applyData(n, o), o = { type: "element", tagName: "pre", properties: {}, children: [o] }, e.patch(n, o), o;
}
function Is(e, n) {
  const t = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Ts(e, n) {
  const t = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function As(e, n) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(n.identifier).toUpperCase(), i = Je(r.toLowerCase()), o = e.footnoteOrder.indexOf(r);
  let l, a = e.footnoteCounts.get(r);
  a === void 0 ? (a = 0, e.footnoteOrder.push(r), l = e.footnoteOrder.length) : l = o + 1, a += 1, e.footnoteCounts.set(r, a);
  const s = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + t + "fn-" + i,
      id: t + "fnref-" + i + (a > 1 ? "-" + a : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(l) }]
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
function Ps(e, n) {
  const t = {
    type: "element",
    tagName: "h" + n.depth,
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function zs(e, n) {
  if (e.options.allowDangerousHtml) {
    const t = { type: "raw", value: n.value };
    return e.patch(n, t), e.applyData(n, t);
  }
}
function di(e, n) {
  const t = n.referenceType;
  let r = "]";
  if (t === "collapsed" ? r += "[]" : t === "full" && (r += "[" + (n.label || n.identifier) + "]"), n.type === "imageReference")
    return [{ type: "text", value: "![" + n.alt + r }];
  const i = e.all(n), o = i[0];
  o && o.type === "text" ? o.value = "[" + o.value : i.unshift({ type: "text", value: "[" });
  const l = i[i.length - 1];
  return l && l.type === "text" ? l.value += r : i.push({ type: "text", value: r }), i;
}
function Ls(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return di(e, n);
  const i = { src: Je(r.url || ""), alt: n.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const o = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(n, o), e.applyData(n, o);
}
function Ds(e, n) {
  const t = { src: Je(n.url) };
  n.alt !== null && n.alt !== void 0 && (t.alt = n.alt), n.title !== null && n.title !== void 0 && (t.title = n.title);
  const r = { type: "element", tagName: "img", properties: t, children: [] };
  return e.patch(n, r), e.applyData(n, r);
}
function Fs(e, n) {
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
function _s(e, n) {
  const t = String(n.identifier).toUpperCase(), r = e.definitionById.get(t);
  if (!r)
    return di(e, n);
  const i = { href: Je(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const o = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(n)
  };
  return e.patch(n, o), e.applyData(n, o);
}
function Ns(e, n) {
  const t = { href: Je(n.url) };
  n.title !== null && n.title !== void 0 && (t.title = n.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: t,
    children: e.all(n)
  };
  return e.patch(n, r), e.applyData(n, r);
}
function Rs(e, n, t) {
  const r = e.all(n), i = t ? Os(t) : mi(n), o = {}, l = [];
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
    (i || a !== 0 || f.type !== "element" || f.tagName !== "p") && l.push({ type: "text", value: `
` }), f.type === "element" && f.tagName === "p" && !i ? l.push(...f.children) : l.push(f);
  }
  const s = r[r.length - 1];
  s && (i || s.type !== "element" || s.tagName !== "p") && l.push({ type: "text", value: `
` });
  const u = { type: "element", tagName: "li", properties: o, children: l };
  return e.patch(n, u), e.applyData(n, u);
}
function Os(e) {
  let n = !1;
  if (e.type === "list") {
    n = e.spread || !1;
    const t = e.children;
    let r = -1;
    for (; !n && ++r < t.length; )
      n = mi(t[r]);
  }
  return n;
}
function mi(e) {
  const n = e.spread;
  return n ?? e.children.length > 1;
}
function Ms(e, n) {
  const t = {}, r = e.all(n);
  let i = -1;
  for (typeof n.start == "number" && n.start !== 1 && (t.start = n.start); ++i < r.length; ) {
    const l = r[i];
    if (l.type === "element" && l.tagName === "li" && l.properties && Array.isArray(l.properties.className) && l.properties.className.includes("task-list-item")) {
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
function Bs(e, n) {
  const t = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function $s(e, n) {
  const t = { type: "root", children: e.wrap(e.all(n)) };
  return e.patch(n, t), e.applyData(n, t);
}
function js(e, n) {
  const t = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
function Hs(e, n) {
  const t = e.all(n), r = t.shift(), i = [];
  if (r) {
    const l = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([r], !0)
    };
    e.patch(n.children[0], l), i.push(l);
  }
  if (t.length > 0) {
    const l = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: e.wrap(t, !0)
    }, a = mn(n.children[1]), s = Qr(n.children[n.children.length - 1]);
    a && s && (l.position = { start: a, end: s }), i.push(l);
  }
  const o = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(i, !0)
  };
  return e.patch(n, o), e.applyData(n, o);
}
function Us(e, n, t) {
  const r = t ? t.children : void 0, o = (r ? r.indexOf(n) : 1) === 0 ? "th" : "td", l = t && t.type === "table" ? t.align : void 0, a = l ? l.length : n.children.length;
  let s = -1;
  const u = [];
  for (; ++s < a; ) {
    const c = n.children[s], h = {}, p = l ? l[s] : void 0;
    p && (h.align = p);
    let d = { type: "element", tagName: o, properties: h, children: [] };
    c && (d.children = e.all(c), e.patch(c, d), d = e.applyData(c, d)), u.push(d);
  }
  const f = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(u, !0)
  };
  return e.patch(n, f), e.applyData(n, f);
}
function Vs(e, n) {
  const t = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, t), e.applyData(n, t);
}
const er = 9, tr = 32;
function qs(e) {
  const n = String(e), t = /\r?\n|\r/g;
  let r = t.exec(n), i = 0;
  const o = [];
  for (; r; )
    o.push(
      nr(n.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = t.exec(n);
  return o.push(nr(n.slice(i), i > 0, !1)), o.join("");
}
function nr(e, n, t) {
  let r = 0, i = e.length;
  if (n) {
    let o = e.codePointAt(r);
    for (; o === er || o === tr; )
      r++, o = e.codePointAt(r);
  }
  if (t) {
    let o = e.codePointAt(i - 1);
    for (; o === er || o === tr; )
      i--, o = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function Ws(e, n) {
  const t = { type: "text", value: qs(String(n.value)) };
  return e.patch(n, t), e.applyData(n, t);
}
function Ys(e, n) {
  const t = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(n, t), e.applyData(n, t);
}
const Qs = {
  blockquote: Cs,
  break: Ss,
  code: Es,
  delete: Is,
  emphasis: Ts,
  footnoteReference: As,
  heading: Ps,
  html: zs,
  imageReference: Ls,
  image: Ds,
  inlineCode: Fs,
  linkReference: _s,
  link: Ns,
  listItem: Rs,
  list: Ms,
  paragraph: Bs,
  // @ts-expect-error: root is different, but hard to type.
  root: $s,
  strong: js,
  table: Hs,
  tableCell: Vs,
  tableRow: Us,
  text: Ws,
  thematicBreak: Ys,
  toml: xt,
  yaml: xt,
  definition: xt,
  footnoteDefinition: xt
};
function xt() {
}
const gi = -1, Lt = 0, ot = 1, Et = 2, vn = 3, Cn = 4, Sn = 5, En = 6, xi = 7, yi = 8, ki = typeof self == "object" ? self : globalThis, rr = (e, n) => {
  switch (e) {
    case "Function":
    case "SharedWorker":
    case "Worker":
    case "eval":
    case "setInterval":
    case "setTimeout":
      throw new TypeError("unable to deserialize " + e);
  }
  return new ki[e](n);
}, Xs = (e, n) => {
  const t = (i, o) => (e.set(o, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [o, l] = n[i];
    switch (o) {
      case Lt:
      case gi:
        return t(l, i);
      case ot: {
        const a = t([], i);
        for (const s of l)
          a.push(r(s));
        return a;
      }
      case Et: {
        const a = t({}, i);
        for (const [s, u] of l)
          a[r(s)] = r(u);
        return a;
      }
      case vn:
        return t(new Date(l), i);
      case Cn: {
        const { source: a, flags: s } = l;
        return t(new RegExp(a, s), i);
      }
      case Sn: {
        const a = t(/* @__PURE__ */ new Map(), i);
        for (const [s, u] of l)
          a.set(r(s), r(u));
        return a;
      }
      case En: {
        const a = t(/* @__PURE__ */ new Set(), i);
        for (const s of l)
          a.add(r(s));
        return a;
      }
      case xi: {
        const { name: a, message: s } = l;
        return t(
          typeof ki[a] == "function" ? rr(a, s) : new Error(s),
          i
        );
      }
      case yi:
        return t(BigInt(l), i);
      case "BigInt":
        return t(Object(BigInt(l)), i);
      case "ArrayBuffer":
        return t(new Uint8Array(l).buffer, l);
      case "DataView": {
        const { buffer: a } = new Uint8Array(l);
        return t(new DataView(a), l);
      }
    }
    return t(rr(o, l), i);
  };
  return r;
}, ir = (e) => Xs(/* @__PURE__ */ new Map(), e)(0), je = "", { toString: Gs } = {}, { keys: Js } = Object, rt = (e) => {
  const n = typeof e;
  if (n !== "object" || !e)
    return [Lt, n];
  const t = Gs.call(e).slice(8, -1);
  switch (t) {
    case "Array":
      return [ot, je];
    case "Object":
      return [Et, je];
    case "Date":
      return [vn, je];
    case "RegExp":
      return [Cn, je];
    case "Map":
      return [Sn, je];
    case "Set":
      return [En, je];
    case "DataView":
      return [ot, t];
  }
  return t.includes("Array") ? [ot, t] : e instanceof Error ? [xi, e.name || "Error"] : [Et, t];
}, yt = ([e, n]) => e === Lt && (n === "function" || n === "symbol"), Ks = (e, n, t, r) => {
  const i = (l, a) => {
    const s = r.push(l) - 1;
    return t.set(a, s), s;
  }, o = (l) => {
    if (t.has(l))
      return t.get(l);
    let [a, s] = rt(l);
    switch (a) {
      case Lt: {
        let f = l;
        switch (s) {
          case "bigint":
            a = yi, f = l.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + s);
            f = null;
            break;
          case "undefined":
            return i([gi], l);
        }
        return i([a, f], l);
      }
      case ot: {
        if (s) {
          let h = l;
          return s === "DataView" ? h = new Uint8Array(l.buffer) : s === "ArrayBuffer" && (h = new Uint8Array(l)), i([s, [...h]], l);
        }
        const f = [], c = i([a, f], l);
        for (const h of l)
          f.push(o(h));
        return c;
      }
      case Et: {
        if (s)
          switch (s) {
            case "BigInt":
              return i([s, l.toString()], l);
            case "Boolean":
            case "Number":
            case "String":
              return i([s, l.valueOf()], l);
          }
        if (n && "toJSON" in l)
          return o(l.toJSON());
        const f = [], c = i([a, f], l);
        for (const h of Js(l))
          (e || !yt(rt(l[h]))) && f.push([o(h), o(l[h])]);
        return c;
      }
      case vn:
        return i([a, isNaN(l.getTime()) ? je : l.toISOString()], l);
      case Cn: {
        const { source: f, flags: c } = l;
        return i([a, { source: f, flags: c }], l);
      }
      case Sn: {
        const f = [], c = i([a, f], l);
        for (const [h, p] of l)
          (e || !(yt(rt(h)) || yt(rt(p)))) && f.push([o(h), o(p)]);
        return c;
      }
      case En: {
        const f = [], c = i([a, f], l);
        for (const h of l)
          (e || !yt(rt(h))) && f.push(o(h));
        return c;
      }
    }
    const { message: u } = l;
    return i([a, { name: s, message: u }], l);
  };
  return o;
}, lr = (e, { json: n, lossy: t } = {}) => {
  const r = [];
  return Ks(!(n || t), !!n, /* @__PURE__ */ new Map(), r)(e), r;
}, It = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, n) => n && ("json" in n || "lossy" in n) ? ir(lr(e, n)) : structuredClone(e)
) : (e, n) => ir(lr(e, n));
function Zs(e, n) {
  const t = [{ type: "text", value: "↩" }];
  return n > 1 && t.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(n) }]
  }), t;
}
function eu(e, n) {
  return "Back to reference " + (e + 1) + (n > 1 ? "-" + n : "");
}
function tu(e) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", t = e.options.footnoteBackContent || Zs, r = e.options.footnoteBackLabel || eu, i = e.options.footnoteLabel || "Footnotes", o = e.options.footnoteLabelTagName || "h2", l = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, a = [];
  let s = -1;
  for (; ++s < e.footnoteOrder.length; ) {
    const u = e.footnoteById.get(
      e.footnoteOrder[s]
    );
    if (!u)
      continue;
    const f = e.all(u), c = String(u.identifier).toUpperCase(), h = Je(c.toLowerCase());
    let p = 0;
    const d = [], x = e.footnoteCounts.get(c);
    for (; x !== void 0 && ++p <= x; ) {
      d.length > 0 && d.push({ type: "text", value: " " });
      let E = typeof t == "string" ? t : t(s, p);
      typeof E == "string" && (E = { type: "text", value: E }), d.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + n + "fnref-" + h + (p > 1 ? "-" + p : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(s, p),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(E) ? E : [E]
      });
    }
    const w = f[f.length - 1];
    if (w && w.type === "element" && w.tagName === "p") {
      const E = w.children[w.children.length - 1];
      E && E.type === "text" ? E.value += " " : w.children.push({ type: "text", value: " " }), w.children.push(...d);
    } else
      f.push(...d);
    const y = {
      type: "element",
      tagName: "li",
      properties: { id: n + "fn-" + h },
      children: e.wrap(f, !0)
    };
    e.patch(u, y), a.push(y);
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
            ...It(l),
            id: "footnote-label"
          },
          children: [{ type: "text", value: i }]
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
const Dt = (
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
      return lu;
    if (typeof e == "function")
      return Ft(e);
    if (typeof e == "object")
      return Array.isArray(e) ? nu(e) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        ru(
          /** @type {Props} */
          e
        )
      );
    if (typeof e == "string")
      return iu(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function nu(e) {
  const n = [];
  let t = -1;
  for (; ++t < e.length; )
    n[t] = Dt(e[t]);
  return Ft(r);
  function r(...i) {
    let o = -1;
    for (; ++o < n.length; )
      if (n[o].apply(this, i)) return !0;
    return !1;
  }
}
function ru(e) {
  const n = (
    /** @type {Record<string, unknown>} */
    e
  );
  return Ft(t);
  function t(r) {
    const i = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let o;
    for (o in e)
      if (i[o] !== n[o]) return !1;
    return !0;
  }
}
function iu(e) {
  return Ft(n);
  function n(t) {
    return t && t.type === e;
  }
}
function Ft(e) {
  return n;
  function n(t, r, i) {
    return !!(ou(t) && e.call(
      this,
      t,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function lu() {
  return !0;
}
function ou(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const bi = [], au = !0, on = !1, su = "skip";
function wi(e, n, t, r) {
  let i;
  typeof n == "function" && typeof t != "function" ? (r = t, t = n) : i = n;
  const o = Dt(i), l = r ? -1 : 1;
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
      let p = bi, d, x, w;
      if ((!n || o(s, u, f[f.length - 1] || void 0)) && (p = uu(t(s, f)), p[0] === on))
        return p;
      if ("children" in s && s.children) {
        const y = (
          /** @type {UnistParent} */
          s
        );
        if (y.children && p[0] !== su)
          for (x = (r ? y.children.length : -1) + l, w = f.concat(y); x > -1 && x < y.children.length; ) {
            const E = y.children[x];
            if (d = a(E, x, w)(), d[0] === on)
              return d;
            x = typeof d[1] == "number" ? d[1] : x + l;
          }
      }
      return p;
    }
  }
}
function uu(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [au, e] : e == null ? bi : [e];
}
function In(e, n, t, r) {
  let i, o, l;
  typeof n == "function" && typeof t != "function" ? (o = void 0, l = n, i = t) : (o = n, l = t, i = r), wi(e, o, a, i);
  function a(s, u) {
    const f = u[u.length - 1], c = f ? f.children.indexOf(s) : void 0;
    return l(s, c, f);
  }
}
const an = {}.hasOwnProperty, cu = {};
function fu(e, n) {
  const t = n || cu, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), l = { ...Qs, ...t.handlers }, a = {
    all: u,
    applyData: hu,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: o,
    footnoteOrder: [],
    handlers: l,
    one: s,
    options: t,
    patch: pu,
    wrap: mu
  };
  return In(e, function(f) {
    if (f.type === "definition" || f.type === "footnoteDefinition") {
      const c = f.type === "definition" ? r : i, h = String(f.identifier).toUpperCase();
      c.has(h) || c.set(h, f);
    }
  }), a;
  function s(f, c) {
    const h = f.type, p = a.handlers[h];
    if (an.call(a.handlers, h) && p)
      return p(a, f, c);
    if (a.options.passThrough && a.options.passThrough.includes(h)) {
      if ("children" in f) {
        const { children: x, ...w } = f, y = It(w);
        return y.children = a.all(f), y;
      }
      return It(f);
    }
    return (a.options.unknownHandler || du)(a, f, c);
  }
  function u(f) {
    const c = [];
    if ("children" in f) {
      const h = f.children;
      let p = -1;
      for (; ++p < h.length; ) {
        const d = a.one(h[p], f);
        if (d) {
          if (p && h[p - 1].type === "break" && (!Array.isArray(d) && d.type === "text" && (d.value = or(d.value)), !Array.isArray(d) && d.type === "element")) {
            const x = d.children[0];
            x && x.type === "text" && (x.value = or(x.value));
          }
          Array.isArray(d) ? c.push(...d) : c.push(d);
        }
      }
    }
    return c;
  }
}
function pu(e, n) {
  e.position && (n.position = Zl(e));
}
function hu(e, n) {
  let t = n;
  if (e && e.data) {
    const r = e.data.hName, i = e.data.hChildren, o = e.data.hProperties;
    if (typeof r == "string")
      if (t.type === "element")
        t.tagName = r;
      else {
        const l = "children" in t ? t.children : [t];
        t = { type: "element", tagName: r, properties: {}, children: l };
      }
    t.type === "element" && o && Object.assign(t.properties, It(o)), "children" in t && t.children && i !== null && i !== void 0 && (t.children = i);
  }
  return t;
}
function du(e, n) {
  const t = n.data || {}, r = "value" in n && !(an.call(t, "hProperties") || an.call(t, "hChildren")) ? { type: "text", value: n.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(n)
  };
  return e.patch(n, r), e.applyData(n, r);
}
function mu(e, n) {
  const t = [];
  let r = -1;
  for (n && t.push({ type: "text", value: `
` }); ++r < e.length; )
    r && t.push({ type: "text", value: `
` }), t.push(e[r]);
  return n && e.length > 0 && t.push({ type: "text", value: `
` }), t;
}
function or(e) {
  let n = 0, t = e.charCodeAt(n);
  for (; t === 9 || t === 32; )
    n++, t = e.charCodeAt(n);
  return e.slice(n);
}
function ar(e, n) {
  const t = fu(e, n), r = t.one(e, void 0), i = tu(t), o = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && o.children.push({ type: "text", value: `
` }, i), o;
}
function gu(e, n) {
  return e && "run" in e ? async function(t, r) {
    const i = (
      /** @type {HastRoot} */
      ar(t, { file: r, ...n })
    );
    await e.run(i, r);
  } : function(t, r) {
    return (
      /** @type {HastRoot} */
      ar(t, { file: r, ...e || n })
    );
  };
}
function sr(e) {
  if (e)
    throw e;
}
var vt = Object.prototype.hasOwnProperty, vi = Object.prototype.toString, ur = Object.defineProperty, cr = Object.getOwnPropertyDescriptor, fr = function(n) {
  return typeof Array.isArray == "function" ? Array.isArray(n) : vi.call(n) === "[object Array]";
}, pr = function(n) {
  if (!n || vi.call(n) !== "[object Object]")
    return !1;
  var t = vt.call(n, "constructor"), r = n.constructor && n.constructor.prototype && vt.call(n.constructor.prototype, "isPrototypeOf");
  if (n.constructor && !t && !r)
    return !1;
  var i;
  for (i in n)
    ;
  return typeof i > "u" || vt.call(n, i);
}, hr = function(n, t) {
  ur && t.name === "__proto__" ? ur(n, t.name, {
    enumerable: !0,
    configurable: !0,
    value: t.newValue,
    writable: !0
  }) : n[t.name] = t.newValue;
}, dr = function(n, t) {
  if (t === "__proto__")
    if (vt.call(n, t)) {
      if (cr)
        return cr(n, t).value;
    } else return;
  return n[t];
}, xu = function e() {
  var n, t, r, i, o, l, a = arguments[0], s = 1, u = arguments.length, f = !1;
  for (typeof a == "boolean" && (f = a, a = arguments[1] || {}, s = 2), (a == null || typeof a != "object" && typeof a != "function") && (a = {}); s < u; ++s)
    if (n = arguments[s], n != null)
      for (t in n)
        r = dr(a, t), i = dr(n, t), a !== i && (f && i && (pr(i) || (o = fr(i))) ? (o ? (o = !1, l = r && fr(r) ? r : []) : l = r && pr(r) ? r : {}, hr(a, { name: t, newValue: e(f, l, i) })) : typeof i < "u" && hr(a, { name: t, newValue: i }));
  return a;
};
const $t = /* @__PURE__ */ Yr(xu);
function sn(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const n = Object.getPrototypeOf(e);
  return (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function yu() {
  const e = [], n = { run: t, use: r };
  return n;
  function t(...i) {
    let o = -1;
    const l = i.pop();
    if (typeof l != "function")
      throw new TypeError("Expected function as last argument, not " + l);
    a(null, ...i);
    function a(s, ...u) {
      const f = e[++o];
      let c = -1;
      if (s) {
        l(s);
        return;
      }
      for (; ++c < i.length; )
        (u[c] === null || u[c] === void 0) && (u[c] = i[c]);
      i = u, f ? ku(f, a)(...u) : l(null, ...u);
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + i
      );
    return e.push(i), n;
  }
}
function ku(e, n) {
  let t;
  return r;
  function r(...l) {
    const a = e.length > l.length;
    let s;
    a && l.push(i);
    try {
      s = e.apply(this, l);
    } catch (u) {
      const f = (
        /** @type {Error} */
        u
      );
      if (a && t)
        throw f;
      return i(f);
    }
    a || (s && s.then && typeof s.then == "function" ? s.then(o, i) : s instanceof Error ? i(s) : o(s));
  }
  function i(l, ...a) {
    t || (t = !0, n(l, ...a));
  }
  function o(l) {
    i(null, l);
  }
}
const Te = { basename: bu, dirname: wu, extname: vu, join: Cu, sep: "/" };
function bu(e, n) {
  if (n !== void 0 && typeof n != "string")
    throw new TypeError('"ext" argument must be a string');
  dt(e);
  let t = 0, r = -1, i = e.length, o;
  if (n === void 0 || n.length === 0 || n.length > e.length) {
    for (; i--; )
      if (e.codePointAt(i) === 47) {
        if (o) {
          t = i + 1;
          break;
        }
      } else r < 0 && (o = !0, r = i + 1);
    return r < 0 ? "" : e.slice(t, r);
  }
  if (n === e)
    return "";
  let l = -1, a = n.length - 1;
  for (; i--; )
    if (e.codePointAt(i) === 47) {
      if (o) {
        t = i + 1;
        break;
      }
    } else
      l < 0 && (o = !0, l = i + 1), a > -1 && (e.codePointAt(i) === n.codePointAt(a--) ? a < 0 && (r = i) : (a = -1, r = l));
  return t === r ? r = l : r < 0 && (r = e.length), e.slice(t, r);
}
function wu(e) {
  if (dt(e), e.length === 0)
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
function vu(e) {
  dt(e);
  let n = e.length, t = -1, r = 0, i = -1, o = 0, l;
  for (; n--; ) {
    const a = e.codePointAt(n);
    if (a === 47) {
      if (l) {
        r = n + 1;
        break;
      }
      continue;
    }
    t < 0 && (l = !0, t = n + 1), a === 46 ? i < 0 ? i = n : o !== 1 && (o = 1) : i > -1 && (o = -1);
  }
  return i < 0 || t < 0 || // We saw a non-dot character immediately before the dot.
  o === 0 || // The (right-most) trimmed path component is exactly `..`.
  o === 1 && i === t - 1 && i === r + 1 ? "" : e.slice(i, t);
}
function Cu(...e) {
  let n = -1, t;
  for (; ++n < e.length; )
    dt(e[n]), e[n] && (t = t === void 0 ? e[n] : t + "/" + e[n]);
  return t === void 0 ? "." : Su(t);
}
function Su(e) {
  dt(e);
  const n = e.codePointAt(0) === 47;
  let t = Eu(e, !n);
  return t.length === 0 && !n && (t = "."), t.length > 0 && e.codePointAt(e.length - 1) === 47 && (t += "/"), n ? "/" + t : t;
}
function Eu(e, n) {
  let t = "", r = 0, i = -1, o = 0, l = -1, a, s;
  for (; ++l <= e.length; ) {
    if (l < e.length)
      a = e.codePointAt(l);
    else {
      if (a === 47)
        break;
      a = 47;
    }
    if (a === 47) {
      if (!(i === l - 1 || o === 1)) if (i !== l - 1 && o === 2) {
        if (t.length < 2 || r !== 2 || t.codePointAt(t.length - 1) !== 46 || t.codePointAt(t.length - 2) !== 46) {
          if (t.length > 2) {
            if (s = t.lastIndexOf("/"), s !== t.length - 1) {
              s < 0 ? (t = "", r = 0) : (t = t.slice(0, s), r = t.length - 1 - t.lastIndexOf("/")), i = l, o = 0;
              continue;
            }
          } else if (t.length > 0) {
            t = "", r = 0, i = l, o = 0;
            continue;
          }
        }
        n && (t = t.length > 0 ? t + "/.." : "..", r = 2);
      } else
        t.length > 0 ? t += "/" + e.slice(i + 1, l) : t = e.slice(i + 1, l), r = l - i - 1;
      i = l, o = 0;
    } else a === 46 && o > -1 ? o++ : o = -1;
  }
  return t;
}
function dt(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const Iu = { cwd: Tu };
function Tu() {
  return "/";
}
function un(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function Au(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!un(e)) {
    const n = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw n.code = "ERR_INVALID_ARG_TYPE", n;
  }
  if (e.protocol !== "file:") {
    const n = new TypeError("The URL must be of scheme file");
    throw n.code = "ERR_INVALID_URL_SCHEME", n;
  }
  return Pu(e);
}
function Pu(e) {
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
        const i = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw i.code = "ERR_INVALID_FILE_URL_PATH", i;
      }
    }
  return decodeURIComponent(n);
}
const jt = (
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
class Ci {
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
    n ? un(n) ? t = { path: n } : typeof n == "string" || zu(n) ? t = { value: n } : t = n : t = {}, this.cwd = "cwd" in t ? "" : Iu.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < jt.length; ) {
      const o = jt[r];
      o in t && t[o] !== void 0 && t[o] !== null && (this[o] = o === "history" ? [...t[o]] : t[o]);
    }
    let i;
    for (i in t)
      jt.includes(i) || (this[i] = t[i]);
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
    Ut(n, "basename"), Ht(n, "basename"), this.path = Te.join(this.dirname || "", n);
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
    mr(this.basename, "dirname"), this.path = Te.join(n || "", this.basename);
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
    if (Ht(n, "extname"), mr(this.dirname, "extname"), n) {
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
    un(n) && (n = Au(n)), Ut(n, "path"), this.path !== n && this.history.push(n);
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
    Ut(n, "stem"), Ht(n, "stem"), this.path = Te.join(this.dirname || "", n + (this.extname || ""));
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
    const i = this.message(n, t, r);
    throw i.fatal = !0, i;
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
    const i = this.message(n, t, r);
    return i.fatal = void 0, i;
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
    const i = new le(
      // @ts-expect-error: the overloads are fine.
      n,
      t,
      r
    );
    return this.path && (i.name = this.path + ":" + i.name, i.file = this.path), i.fatal = !1, this.messages.push(i), i;
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
function Ht(e, n) {
  if (e && e.includes(Te.sep))
    throw new Error(
      "`" + n + "` cannot be a path: did not expect `" + Te.sep + "`"
    );
}
function Ut(e, n) {
  if (!e)
    throw new Error("`" + n + "` cannot be empty");
}
function mr(e, n) {
  if (!e)
    throw new Error("Setting `" + n + "` requires `path` to be set too");
}
function zu(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Lu = (
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
    ), i = r[e], o = function() {
      return i.apply(o, arguments);
    };
    return Object.setPrototypeOf(o, r), o;
  }
), Du = {}.hasOwnProperty;
class Tn extends Lu {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = yu();
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
      new Tn()
    );
    let t = -1;
    for (; ++t < this.attachers.length; ) {
      const r = this.attachers[t];
      n.use(...r);
    }
    return n.data($t(!0, {}, this.namespace)), n;
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
    return typeof n == "string" ? arguments.length === 2 ? (Wt("data", this.frozen), this.namespace[n] = t, this) : Du.call(this.namespace, n) && this.namespace[n] || void 0 : n ? (Wt("data", this.frozen), this.namespace = n, this) : this.namespace;
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
      const i = t.call(n, ...r);
      typeof i == "function" && this.transformers.use(i);
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
    const t = kt(n), r = this.parser || this.Parser;
    return Vt("parse", r), r(String(t), t);
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
    return this.freeze(), Vt("process", this.parser || this.Parser), qt("process", this.compiler || this.Compiler), t ? i(void 0, t) : new Promise(i);
    function i(o, l) {
      const a = kt(n), s = (
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
        ), d = r.stringify(p, h);
        Nu(d) ? h.value = d : h.result = d, u(
          f,
          /** @type {VFileWithOutput<CompileResult>} */
          h
        );
      });
      function u(f, c) {
        f || !c ? l(f) : o ? o(c) : t(void 0, c);
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
    return this.freeze(), Vt("processSync", this.parser || this.Parser), qt("processSync", this.compiler || this.Compiler), this.process(n, i), xr("processSync", "process", t), r;
    function i(o, l) {
      t = !0, sr(o), r = l;
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
    gr(n), this.freeze();
    const i = this.transformers;
    return !r && typeof t == "function" && (r = t, t = void 0), r ? o(void 0, r) : new Promise(o);
    function o(l, a) {
      const s = kt(t);
      i.run(n, s, u);
      function u(f, c, h) {
        const p = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          c || n
        );
        f ? a(f) : l ? l(p) : r(void 0, p, h);
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
    let r = !1, i;
    return this.run(n, t, o), xr("runSync", "run", r), i;
    function o(l, a) {
      sr(l), i = a, r = !0;
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
    const r = kt(t), i = this.compiler || this.Compiler;
    return qt("stringify", i), gr(n), i(n, r);
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
    const r = this.attachers, i = this.namespace;
    if (Wt("use", this.frozen), n != null) if (typeof n == "function")
      s(n, t);
    else if (typeof n == "object")
      Array.isArray(n) ? a(n) : l(n);
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
          l(u);
      else
        throw new TypeError("Expected usable value, not `" + u + "`");
    }
    function l(u) {
      if (!("plugins" in u) && !("settings" in u))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      a(u.plugins), u.settings && (i.settings = $t(!0, i.settings, u.settings));
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
        let [p, ...d] = f;
        const x = r[h][1];
        sn(x) && sn(p) && (p = $t(!0, x, p)), r[h] = [u, p, ...d];
      }
    }
  }
}
const Fu = new Tn().freeze();
function Vt(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function qt(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function Wt(e, n) {
  if (n)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function gr(e) {
  if (!sn(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function xr(e, n, t) {
  if (!t)
    throw new Error(
      "`" + e + "` finished async. Use `" + n + "` instead"
    );
}
function kt(e) {
  return _u(e) ? e : new Ci(e);
}
function _u(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Nu(e) {
  return typeof e == "string" || Ru(e);
}
function Ru(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Ou = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", yr = [], kr = { allowDangerousHtml: !0 }, Mu = /^(https?|ircs?|mailto|xmpp)$/i, Bu = [
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
function $u(e) {
  const n = ju(e), t = Hu(e);
  return Uu(n.runSync(n.parse(t), t), e);
}
function ju(e) {
  const n = e.rehypePlugins || yr, t = e.remarkPlugins || yr, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...kr } : kr;
  return Fu().use(vs).use(t).use(gu, r).use(n);
}
function Hu(e) {
  const n = e.children || "", t = new Ci();
  return typeof n == "string" && (t.value = n), t;
}
function Uu(e, n) {
  const t = n.allowedElements, r = n.allowElement, i = n.components, o = n.disallowedElements, l = n.skipHtml, a = n.unwrapDisallowed, s = n.urlTransform || Vu;
  for (const f of Bu)
    Object.hasOwn(n, f.from) && ("" + f.from + (f.to ? "use `" + f.to + "` instead" : "remove it") + Ou + f.id, void 0);
  return In(e, u), io(e, {
    Fragment: at,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: I,
    jsxs: F,
    passKeys: !0,
    passNode: !0
  });
  function u(f, c, h) {
    if (f.type === "raw" && h && typeof c == "number")
      return l ? h.children.splice(c, 1) : h.children[c] = { type: "text", value: f.value }, c;
    if (f.type === "element") {
      let p;
      for (p in Ot)
        if (Object.hasOwn(Ot, p) && Object.hasOwn(f.properties, p)) {
          const d = f.properties[p], x = Ot[p];
          (x === null || x.includes(f.tagName)) && (f.properties[p] = s(String(d || ""), p, f));
        }
    }
    if (f.type === "element") {
      let p = t ? !t.includes(f.tagName) : o ? o.includes(f.tagName) : !1;
      if (!p && r && typeof c == "number" && (p = !r(f, c, h)), p && h && typeof c == "number")
        return a && f.children ? h.children.splice(c, 1, ...f.children) : h.children.splice(c, 1), c;
    }
  }
}
function Vu(e) {
  const n = e.indexOf(":"), t = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    n === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && n > i || t !== -1 && n > t || r !== -1 && n > r || // It is a protocol, it should be allowed.
    Mu.test(e.slice(0, n)) ? e : ""
  );
}
function br(e, n) {
  const t = String(e);
  if (typeof n != "string")
    throw new TypeError("Expected character");
  let r = 0, i = t.indexOf(n);
  for (; i !== -1; )
    r++, i = t.indexOf(n, i + n.length);
  return r;
}
function qu(e) {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function Wu(e, n, t) {
  const i = Dt((t || {}).ignore || []), o = Yu(n);
  let l = -1;
  for (; ++l < o.length; )
    wi(e, "text", a);
  function a(u, f) {
    let c = -1, h;
    for (; ++c < f.length; ) {
      const p = f[c], d = h ? h.children : void 0;
      if (i(
        p,
        d ? d.indexOf(p) : void 0,
        h
      ))
        return;
      h = p;
    }
    if (h)
      return s(u, f);
  }
  function s(u, f) {
    const c = f[f.length - 1], h = o[l][0], p = o[l][1];
    let d = 0;
    const w = c.children.indexOf(u);
    let y = !1, E = [];
    h.lastIndex = 0;
    let C = h.exec(u.value);
    for (; C; ) {
      const A = C.index, N = {
        index: C.index,
        input: C.input,
        stack: [...f, u]
      };
      let v = p(...C, N);
      if (typeof v == "string" && (v = v.length > 0 ? { type: "text", value: v } : void 0), v === !1 ? h.lastIndex = A + 1 : (d !== A && E.push({
        type: "text",
        value: u.value.slice(d, A)
      }), Array.isArray(v) ? E.push(...v) : v && E.push(v), d = A + C[0].length, y = !0), !h.global)
        break;
      C = h.exec(u.value);
    }
    return y ? (d < u.value.length && E.push({ type: "text", value: u.value.slice(d) }), c.children.splice(w, 1, ...E)) : E = [u], w + E.length;
  }
}
function Yu(e) {
  const n = [];
  if (!Array.isArray(e))
    throw new TypeError("Expected find and replace tuple or list of tuples");
  const t = !e[0] || Array.isArray(e[0]) ? e : [e];
  let r = -1;
  for (; ++r < t.length; ) {
    const i = t[r];
    n.push([Qu(i[0]), Xu(i[1])]);
  }
  return n;
}
function Qu(e) {
  return typeof e == "string" ? new RegExp(qu(e), "g") : e;
}
function Xu(e) {
  return typeof e == "function" ? e : function() {
    return e;
  };
}
const Yt = "phrasing", Qt = ["autolink", "link", "image", "label"];
function Gu() {
  return {
    transforms: [rc],
    enter: {
      literalAutolink: Ku,
      literalAutolinkEmail: Xt,
      literalAutolinkHttp: Xt,
      literalAutolinkWww: Xt
    },
    exit: {
      literalAutolink: nc,
      literalAutolinkEmail: tc,
      literalAutolinkHttp: Zu,
      literalAutolinkWww: ec
    }
  };
}
function Ju() {
  return {
    unsafe: [
      {
        character: "@",
        before: "[+\\-.\\w]",
        after: "[\\-.\\w]",
        inConstruct: Yt,
        notInConstruct: Qt
      },
      {
        character: ".",
        before: "[Ww]",
        after: "[\\-.\\w]",
        inConstruct: Yt,
        notInConstruct: Qt
      },
      {
        character: ":",
        before: "[ps]",
        after: "\\/",
        inConstruct: Yt,
        notInConstruct: Qt
      }
    ]
  };
}
function Ku(e) {
  this.enter({ type: "link", title: null, url: "", children: [] }, e);
}
function Xt(e) {
  this.config.enter.autolinkProtocol.call(this, e);
}
function Zu(e) {
  this.config.exit.autolinkProtocol.call(this, e);
}
function ec(e) {
  this.config.exit.data.call(this, e);
  const n = this.stack[this.stack.length - 1];
  n.type, n.url = "http://" + this.sliceSerialize(e);
}
function tc(e) {
  this.config.exit.autolinkEmail.call(this, e);
}
function nc(e) {
  this.exit(e);
}
function rc(e) {
  Wu(
    e,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, ic],
      [new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)", "gu"), lc]
    ],
    { ignore: ["link", "linkReference"] }
  );
}
function ic(e, n, t, r, i) {
  let o = "";
  if (!Si(i) || (/^w/i.test(n) && (t = n + t, n = "", o = "http://"), !oc(t)))
    return !1;
  const l = ac(t + r);
  if (!l[0]) return !1;
  const a = {
    type: "link",
    title: null,
    url: o + n + l[0],
    children: [{ type: "text", value: n + l[0] }]
  };
  return l[1] ? [a, { type: "text", value: l[1] }] : a;
}
function lc(e, n, t, r) {
  return (
    // Not an expected previous character.
    !Si(r, !0) || // Label ends in not allowed character.
    /[-\d_]$/.test(t) ? !1 : {
      type: "link",
      title: null,
      url: "mailto:" + n + "@" + t,
      children: [{ type: "text", value: n + "@" + t }]
    }
  );
}
function oc(e) {
  const n = e.split(".");
  return !(n.length < 2 || n[n.length - 1] && (/_/.test(n[n.length - 1]) || !/[a-zA-Z\d]/.test(n[n.length - 1])) || n[n.length - 2] && (/_/.test(n[n.length - 2]) || !/[a-zA-Z\d]/.test(n[n.length - 2])));
}
function ac(e) {
  const n = /[!"&'),.:;<>?\]}]+$/.exec(e);
  if (!n)
    return [e, void 0];
  e = e.slice(0, n.index);
  let t = n[0], r = t.indexOf(")");
  const i = br(e, "(");
  let o = br(e, ")");
  for (; r !== -1 && i > o; )
    e += t.slice(0, r + 1), t = t.slice(r + 1), r = t.indexOf(")"), o++;
  return [e, t];
}
function Si(e, n) {
  const t = e.input.charCodeAt(e.index - 1);
  return (e.index === 0 || Ve(t) || Pt(t)) && // If it’s an email, the previous character should not be a slash.
  (!n || t !== 47);
}
Ei.peek = gc;
function sc() {
  this.buffer();
}
function uc(e) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, e);
}
function cc() {
  this.buffer();
}
function fc(e) {
  this.enter(
    { type: "footnoteDefinition", identifier: "", label: "", children: [] },
    e
  );
}
function pc(e) {
  const n = this.resume(), t = this.stack[this.stack.length - 1];
  t.type, t.identifier = Se(
    this.sliceSerialize(e)
  ).toLowerCase(), t.label = n;
}
function hc(e) {
  this.exit(e);
}
function dc(e) {
  const n = this.resume(), t = this.stack[this.stack.length - 1];
  t.type, t.identifier = Se(
    this.sliceSerialize(e)
  ).toLowerCase(), t.label = n;
}
function mc(e) {
  this.exit(e);
}
function gc() {
  return "[";
}
function Ei(e, n, t, r) {
  const i = t.createTracker(r);
  let o = i.move("[^");
  const l = t.enter("footnoteReference"), a = t.enter("reference");
  return o += i.move(
    t.safe(t.associationId(e), { after: "]", before: o })
  ), a(), l(), o += i.move("]"), o;
}
function xc() {
  return {
    enter: {
      gfmFootnoteCallString: sc,
      gfmFootnoteCall: uc,
      gfmFootnoteDefinitionLabelString: cc,
      gfmFootnoteDefinition: fc
    },
    exit: {
      gfmFootnoteCallString: pc,
      gfmFootnoteCall: hc,
      gfmFootnoteDefinitionLabelString: dc,
      gfmFootnoteDefinition: mc
    }
  };
}
function yc(e) {
  let n = !1;
  return e && e.firstLineBlank && (n = !0), {
    handlers: { footnoteDefinition: t, footnoteReference: Ei },
    // This is on by default already.
    unsafe: [{ character: "[", inConstruct: ["label", "phrasing", "reference"] }]
  };
  function t(r, i, o, l) {
    const a = o.createTracker(l);
    let s = a.move("[^");
    const u = o.enter("footnoteDefinition"), f = o.enter("label");
    return s += a.move(
      o.safe(o.associationId(r), { before: s, after: "]" })
    ), f(), s += a.move("]:"), r.children && r.children.length > 0 && (a.shift(4), s += a.move(
      (n ? `
` : " ") + o.indentLines(
        o.containerFlow(r, a.current()),
        n ? Ii : kc
      )
    )), u(), s;
  }
}
function kc(e, n, t) {
  return n === 0 ? e : Ii(e, n, t);
}
function Ii(e, n, t) {
  return (t ? "" : "    ") + e;
}
const bc = [
  "autolink",
  "destinationLiteral",
  "destinationRaw",
  "reference",
  "titleQuote",
  "titleApostrophe"
];
Ti.peek = Ec;
function wc() {
  return {
    canContainEols: ["delete"],
    enter: { strikethrough: Cc },
    exit: { strikethrough: Sc }
  };
}
function vc() {
  return {
    unsafe: [
      {
        character: "~",
        inConstruct: "phrasing",
        notInConstruct: bc
      }
    ],
    handlers: { delete: Ti }
  };
}
function Cc(e) {
  this.enter({ type: "delete", children: [] }, e);
}
function Sc(e) {
  this.exit(e);
}
function Ti(e, n, t, r) {
  const i = t.createTracker(r), o = t.enter("strikethrough");
  let l = i.move("~~");
  return l += t.containerPhrasing(e, {
    ...i.current(),
    before: l,
    after: "~"
  }), l += i.move("~~"), o(), l;
}
function Ec() {
  return "~";
}
function Ic(e) {
  return e.length;
}
function Tc(e, n) {
  const t = n || {}, r = (t.align || []).concat(), i = t.stringLength || Ic, o = [], l = [], a = [], s = [];
  let u = 0, f = -1;
  for (; ++f < e.length; ) {
    const x = [], w = [];
    let y = -1;
    for (e[f].length > u && (u = e[f].length); ++y < e[f].length; ) {
      const E = Ac(e[f][y]);
      if (t.alignDelimiters !== !1) {
        const C = i(E);
        w[y] = C, (s[y] === void 0 || C > s[y]) && (s[y] = C);
      }
      x.push(E);
    }
    l[f] = x, a[f] = w;
  }
  let c = -1;
  if (typeof r == "object" && "length" in r)
    for (; ++c < u; )
      o[c] = wr(r[c]);
  else {
    const x = wr(r);
    for (; ++c < u; )
      o[c] = x;
  }
  c = -1;
  const h = [], p = [];
  for (; ++c < u; ) {
    const x = o[c];
    let w = "", y = "";
    x === 99 ? (w = ":", y = ":") : x === 108 ? w = ":" : x === 114 && (y = ":");
    let E = t.alignDelimiters === !1 ? 1 : Math.max(
      1,
      s[c] - w.length - y.length
    );
    const C = w + "-".repeat(E) + y;
    t.alignDelimiters !== !1 && (E = w.length + E + y.length, E > s[c] && (s[c] = E), p[c] = E), h[c] = C;
  }
  l.splice(1, 0, h), a.splice(1, 0, p), f = -1;
  const d = [];
  for (; ++f < l.length; ) {
    const x = l[f], w = a[f];
    c = -1;
    const y = [];
    for (; ++c < u; ) {
      const E = x[c] || "";
      let C = "", A = "";
      if (t.alignDelimiters !== !1) {
        const N = s[c] - (w[c] || 0), v = o[c];
        v === 114 ? C = " ".repeat(N) : v === 99 ? N % 2 ? (C = " ".repeat(N / 2 + 0.5), A = " ".repeat(N / 2 - 0.5)) : (C = " ".repeat(N / 2), A = C) : A = " ".repeat(N);
      }
      t.delimiterStart !== !1 && !c && y.push("|"), t.padding !== !1 && // Don’t add the opening space if we’re not aligning and the cell is
      // empty: there will be a closing space.
      !(t.alignDelimiters === !1 && E === "") && (t.delimiterStart !== !1 || c) && y.push(" "), t.alignDelimiters !== !1 && y.push(C), y.push(E), t.alignDelimiters !== !1 && y.push(A), t.padding !== !1 && y.push(" "), (t.delimiterEnd !== !1 || c !== u - 1) && y.push("|");
    }
    d.push(
      t.delimiterEnd === !1 ? y.join("").replace(/ +$/, "") : y.join("")
    );
  }
  return d.join(`
`);
}
function Ac(e) {
  return e == null ? "" : String(e);
}
function wr(e) {
  const n = typeof e == "string" ? e.codePointAt(0) : 0;
  return n === 67 || n === 99 ? 99 : n === 76 || n === 108 ? 108 : n === 82 || n === 114 ? 114 : 0;
}
function Pc(e, n, t, r) {
  const i = t.enter("blockquote"), o = t.createTracker(r);
  o.move("> "), o.shift(2);
  const l = t.indentLines(
    t.containerFlow(e, o.current()),
    zc
  );
  return i(), l;
}
function zc(e, n, t) {
  return ">" + (t ? "" : " ") + e;
}
function Lc(e, n) {
  return vr(e, n.inConstruct, !0) && !vr(e, n.notInConstruct, !1);
}
function vr(e, n, t) {
  if (typeof n == "string" && (n = [n]), !n || n.length === 0)
    return t;
  let r = -1;
  for (; ++r < n.length; )
    if (e.includes(n[r]))
      return !0;
  return !1;
}
function Cr(e, n, t, r) {
  let i = -1;
  for (; ++i < t.unsafe.length; )
    if (t.unsafe[i].character === `
` && Lc(t.stack, t.unsafe[i]))
      return /[ \t]/.test(r.before) ? "" : " ";
  return `\\
`;
}
function Dc(e, n) {
  const t = String(e);
  let r = t.indexOf(n), i = r, o = 0, l = 0;
  if (typeof n != "string")
    throw new TypeError("Expected substring");
  for (; r !== -1; )
    r === i ? ++o > l && (l = o) : o = 1, i = r + n.length, r = t.indexOf(n, i);
  return l;
}
function Fc(e, n) {
  return !!(n.options.fences === !1 && e.value && // If there’s no info…
  !e.lang && // And there’s a non-whitespace character…
  /[^ \r\n]/.test(e.value) && // And the value doesn’t start or end in a blank…
  !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value));
}
function _c(e) {
  const n = e.options.fence || "`";
  if (n !== "`" && n !== "~")
    throw new Error(
      "Cannot serialize code with `" + n + "` for `options.fence`, expected `` ` `` or `~`"
    );
  return n;
}
function Nc(e, n, t, r) {
  const i = _c(t), o = e.value || "", l = i === "`" ? "GraveAccent" : "Tilde";
  if (Fc(e, t)) {
    const c = t.enter("codeIndented"), h = t.indentLines(o, Rc);
    return c(), h;
  }
  const a = t.createTracker(r), s = i.repeat(Math.max(Dc(o, i) + 1, 3)), u = t.enter("codeFenced");
  let f = a.move(s);
  if (e.lang) {
    const c = t.enter(`codeFencedLang${l}`);
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
    const c = t.enter(`codeFencedMeta${l}`);
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
function Rc(e, n, t) {
  return (t ? "" : "    ") + e;
}
function An(e) {
  const n = e.options.quote || '"';
  if (n !== '"' && n !== "'")
    throw new Error(
      "Cannot serialize title with `" + n + "` for `options.quote`, expected `\"`, or `'`"
    );
  return n;
}
function Oc(e, n, t, r) {
  const i = An(t), o = i === '"' ? "Quote" : "Apostrophe", l = t.enter("definition");
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
  )), a(), e.title && (a = t.enter(`title${o}`), u += s.move(" " + i), u += s.move(
    t.safe(e.title, {
      before: u,
      after: i,
      ...s.current()
    })
  ), u += s.move(i), a()), l(), u;
}
function Mc(e) {
  const n = e.options.emphasis || "*";
  if (n !== "*" && n !== "_")
    throw new Error(
      "Cannot serialize emphasis with `" + n + "` for `options.emphasis`, expected `*`, or `_`"
    );
  return n;
}
function ft(e) {
  return "&#x" + e.toString(16).toUpperCase() + ";";
}
function Tt(e, n, t) {
  const r = Xe(e), i = Xe(n);
  return r === void 0 ? i === void 0 ? (
    // Letter inside:
    // we have to encode *both* letters for `_` as it is looser.
    // it already forms for `*` (and GFMs `~`).
    t === "_" ? { inside: !0, outside: !0 } : { inside: !1, outside: !1 }
  ) : i === 1 ? (
    // Whitespace inside: encode both (letter, whitespace).
    { inside: !0, outside: !0 }
  ) : (
    // Punctuation inside: encode outer (letter)
    { inside: !1, outside: !0 }
  ) : r === 1 ? i === void 0 ? (
    // Letter inside: already forms.
    { inside: !1, outside: !1 }
  ) : i === 1 ? (
    // Whitespace inside: encode both (whitespace).
    { inside: !0, outside: !0 }
  ) : (
    // Punctuation inside: already forms.
    { inside: !1, outside: !1 }
  ) : i === void 0 ? (
    // Letter inside: already forms.
    { inside: !1, outside: !1 }
  ) : i === 1 ? (
    // Whitespace inside: encode inner (whitespace).
    { inside: !0, outside: !1 }
  ) : (
    // Punctuation inside: already forms.
    { inside: !1, outside: !1 }
  );
}
Ai.peek = Bc;
function Ai(e, n, t, r) {
  const i = Mc(t), o = t.enter("emphasis"), l = t.createTracker(r), a = l.move(i);
  let s = l.move(
    t.containerPhrasing(e, {
      after: i,
      before: a,
      ...l.current()
    })
  );
  const u = s.charCodeAt(0), f = Tt(
    r.before.charCodeAt(r.before.length - 1),
    u,
    i
  );
  f.inside && (s = ft(u) + s.slice(1));
  const c = s.charCodeAt(s.length - 1), h = Tt(r.after.charCodeAt(0), c, i);
  h.inside && (s = s.slice(0, -1) + ft(c));
  const p = l.move(i);
  return o(), t.attentionEncodeSurroundingInfo = {
    after: h.outside,
    before: f.outside
  }, a + s + p;
}
function Bc(e, n, t) {
  return t.options.emphasis || "*";
}
function $c(e, n) {
  let t = !1;
  return In(e, function(r) {
    if ("value" in r && /\r?\n|\r/.test(r.value) || r.type === "break")
      return t = !0, on;
  }), !!((!e.depth || e.depth < 3) && kn(e) && (n.options.setext || t));
}
function jc(e, n, t, r) {
  const i = Math.max(Math.min(6, e.depth || 1), 1), o = t.createTracker(r);
  if ($c(e, t)) {
    const f = t.enter("headingSetext"), c = t.enter("phrasing"), h = t.containerPhrasing(e, {
      ...o.current(),
      before: `
`,
      after: `
`
    });
    return c(), f(), h + `
` + (i === 1 ? "=" : "-").repeat(
      // The whole size…
      h.length - // Minus the position of the character after the last EOL (or
      // 0 if there is none)…
      (Math.max(h.lastIndexOf("\r"), h.lastIndexOf(`
`)) + 1)
    );
  }
  const l = "#".repeat(i), a = t.enter("headingAtx"), s = t.enter("phrasing");
  o.move(l + " ");
  let u = t.containerPhrasing(e, {
    before: "# ",
    after: `
`,
    ...o.current()
  });
  return /^[\t ]/.test(u) && (u = ft(u.charCodeAt(0)) + u.slice(1)), u = u ? l + " " + u : l, t.options.closeAtx && (u += " " + l), s(), a(), u;
}
Pi.peek = Hc;
function Pi(e) {
  return e.value || "";
}
function Hc() {
  return "<";
}
zi.peek = Uc;
function zi(e, n, t, r) {
  const i = An(t), o = i === '"' ? "Quote" : "Apostrophe", l = t.enter("image");
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
  )), a(), e.title && (a = t.enter(`title${o}`), u += s.move(" " + i), u += s.move(
    t.safe(e.title, {
      before: u,
      after: i,
      ...s.current()
    })
  ), u += s.move(i), a()), u += s.move(")"), l(), u;
}
function Uc() {
  return "!";
}
Li.peek = Vc;
function Li(e, n, t, r) {
  const i = e.referenceType, o = t.enter("imageReference");
  let l = t.enter("label");
  const a = t.createTracker(r);
  let s = a.move("![");
  const u = t.safe(e.alt, {
    before: s,
    after: "]",
    ...a.current()
  });
  s += a.move(u + "]["), l();
  const f = t.stack;
  t.stack = [], l = t.enter("reference");
  const c = t.safe(t.associationId(e), {
    before: s,
    after: "]",
    ...a.current()
  });
  return l(), t.stack = f, o(), i === "full" || !u || u !== c ? s += a.move(c + "]") : i === "shortcut" ? s = s.slice(0, -1) : s += a.move("]"), s;
}
function Vc() {
  return "!";
}
Di.peek = qc;
function Di(e, n, t) {
  let r = e.value || "", i = "`", o = -1;
  for (; new RegExp("(^|[^`])" + i + "([^`]|$)").test(r); )
    i += "`";
  for (/[^ \r\n]/.test(r) && (/^[ \r\n]/.test(r) && /[ \r\n]$/.test(r) || /^`|`$/.test(r)) && (r = " " + r + " "); ++o < t.unsafe.length; ) {
    const l = t.unsafe[o], a = t.compilePattern(l);
    let s;
    if (l.atBreak)
      for (; s = a.exec(r); ) {
        let u = s.index;
        r.charCodeAt(u) === 10 && r.charCodeAt(u - 1) === 13 && u--, r = r.slice(0, u) + " " + r.slice(s.index + 1);
      }
  }
  return i + r + i;
}
function qc() {
  return "`";
}
function Fi(e, n) {
  const t = kn(e);
  return !!(!n.options.resourceLink && // If there’s a url…
  e.url && // And there’s a no title…
  !e.title && // And the content of `node` is a single text node…
  e.children && e.children.length === 1 && e.children[0].type === "text" && // And if the url is the same as the content…
  (t === e.url || "mailto:" + t === e.url) && // And that starts w/ a protocol…
  /^[a-z][a-z+.-]+:/i.test(e.url) && // And that doesn’t contain ASCII control codes (character escapes and
  // references don’t work), space, or angle brackets…
  !/[\0- <>\u007F]/.test(e.url));
}
_i.peek = Wc;
function _i(e, n, t, r) {
  const i = An(t), o = i === '"' ? "Quote" : "Apostrophe", l = t.createTracker(r);
  let a, s;
  if (Fi(e, t)) {
    const f = t.stack;
    t.stack = [], a = t.enter("autolink");
    let c = l.move("<");
    return c += l.move(
      t.containerPhrasing(e, {
        before: c,
        after: ">",
        ...l.current()
      })
    ), c += l.move(">"), a(), t.stack = f, c;
  }
  a = t.enter("link"), s = t.enter("label");
  let u = l.move("[");
  return u += l.move(
    t.containerPhrasing(e, {
      before: u,
      after: "](",
      ...l.current()
    })
  ), u += l.move("]("), s(), // If there’s no url but there is a title…
  !e.url && e.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (s = t.enter("destinationLiteral"), u += l.move("<"), u += l.move(
    t.safe(e.url, { before: u, after: ">", ...l.current() })
  ), u += l.move(">")) : (s = t.enter("destinationRaw"), u += l.move(
    t.safe(e.url, {
      before: u,
      after: e.title ? " " : ")",
      ...l.current()
    })
  )), s(), e.title && (s = t.enter(`title${o}`), u += l.move(" " + i), u += l.move(
    t.safe(e.title, {
      before: u,
      after: i,
      ...l.current()
    })
  ), u += l.move(i), s()), u += l.move(")"), a(), u;
}
function Wc(e, n, t) {
  return Fi(e, t) ? "<" : "[";
}
Ni.peek = Yc;
function Ni(e, n, t, r) {
  const i = e.referenceType, o = t.enter("linkReference");
  let l = t.enter("label");
  const a = t.createTracker(r);
  let s = a.move("[");
  const u = t.containerPhrasing(e, {
    before: s,
    after: "]",
    ...a.current()
  });
  s += a.move(u + "]["), l();
  const f = t.stack;
  t.stack = [], l = t.enter("reference");
  const c = t.safe(t.associationId(e), {
    before: s,
    after: "]",
    ...a.current()
  });
  return l(), t.stack = f, o(), i === "full" || !u || u !== c ? s += a.move(c + "]") : i === "shortcut" ? s = s.slice(0, -1) : s += a.move("]"), s;
}
function Yc() {
  return "[";
}
function Pn(e) {
  const n = e.options.bullet || "*";
  if (n !== "*" && n !== "+" && n !== "-")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.bullet`, expected `*`, `+`, or `-`"
    );
  return n;
}
function Qc(e) {
  const n = Pn(e), t = e.options.bulletOther;
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
function Xc(e) {
  const n = e.options.bulletOrdered || ".";
  if (n !== "." && n !== ")")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.bulletOrdered`, expected `.` or `)`"
    );
  return n;
}
function Ri(e) {
  const n = e.options.rule || "*";
  if (n !== "*" && n !== "-" && n !== "_")
    throw new Error(
      "Cannot serialize rules with `" + n + "` for `options.rule`, expected `*`, `-`, or `_`"
    );
  return n;
}
function Gc(e, n, t, r) {
  const i = t.enter("list"), o = t.bulletCurrent;
  let l = e.ordered ? Xc(t) : Pn(t);
  const a = e.ordered ? l === "." ? ")" : "." : Qc(t);
  let s = n && t.bulletLastUsed ? l === t.bulletLastUsed : !1;
  if (!e.ordered) {
    const f = e.children ? e.children[0] : void 0;
    if (
      // Bullet could be used as a thematic break marker:
      (l === "*" || l === "-") && // Empty first list item:
      f && (!f.children || !f.children[0]) && // Directly in two other list items:
      t.stack[t.stack.length - 1] === "list" && t.stack[t.stack.length - 2] === "listItem" && t.stack[t.stack.length - 3] === "list" && t.stack[t.stack.length - 4] === "listItem" && // That are each the first child.
      t.indexStack[t.indexStack.length - 1] === 0 && t.indexStack[t.indexStack.length - 2] === 0 && t.indexStack[t.indexStack.length - 3] === 0 && (s = !0), Ri(t) === l && f
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
  s && (l = a), t.bulletCurrent = l;
  const u = t.containerFlow(e, r);
  return t.bulletLastUsed = l, t.bulletCurrent = o, i(), u;
}
function Jc(e) {
  const n = e.options.listItemIndent || "one";
  if (n !== "tab" && n !== "one" && n !== "mixed")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
    );
  return n;
}
function Kc(e, n, t, r) {
  const i = Jc(t);
  let o = t.bulletCurrent || Pn(t);
  n && n.type === "list" && n.ordered && (o = (typeof n.start == "number" && n.start > -1 ? n.start : 1) + (t.options.incrementListMarker === !1 ? 0 : n.children.indexOf(e)) + o);
  let l = o.length + 1;
  (i === "tab" || i === "mixed" && (n && n.type === "list" && n.spread || e.spread)) && (l = Math.ceil(l / 4) * 4);
  const a = t.createTracker(r);
  a.move(o + " ".repeat(l - o.length)), a.shift(l);
  const s = t.enter("listItem"), u = t.indentLines(
    t.containerFlow(e, a.current()),
    f
  );
  return s(), u;
  function f(c, h, p) {
    return h ? (p ? "" : " ".repeat(l)) + c : (p ? o : o + " ".repeat(l - o.length)) + c;
  }
}
function Zc(e, n, t, r) {
  const i = t.enter("paragraph"), o = t.enter("phrasing"), l = t.containerPhrasing(e, r);
  return o(), i(), l;
}
const ef = (
  /** @type {(node?: unknown) => node is Exclude<PhrasingContent, Html>} */
  Dt([
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
function tf(e, n, t, r) {
  return (e.children.some(function(l) {
    return ef(l);
  }) ? t.containerPhrasing : t.containerFlow).call(t, e, r);
}
function nf(e) {
  const n = e.options.strong || "*";
  if (n !== "*" && n !== "_")
    throw new Error(
      "Cannot serialize strong with `" + n + "` for `options.strong`, expected `*`, or `_`"
    );
  return n;
}
Oi.peek = rf;
function Oi(e, n, t, r) {
  const i = nf(t), o = t.enter("strong"), l = t.createTracker(r), a = l.move(i + i);
  let s = l.move(
    t.containerPhrasing(e, {
      after: i,
      before: a,
      ...l.current()
    })
  );
  const u = s.charCodeAt(0), f = Tt(
    r.before.charCodeAt(r.before.length - 1),
    u,
    i
  );
  f.inside && (s = ft(u) + s.slice(1));
  const c = s.charCodeAt(s.length - 1), h = Tt(r.after.charCodeAt(0), c, i);
  h.inside && (s = s.slice(0, -1) + ft(c));
  const p = l.move(i + i);
  return o(), t.attentionEncodeSurroundingInfo = {
    after: h.outside,
    before: f.outside
  }, a + s + p;
}
function rf(e, n, t) {
  return t.options.strong || "*";
}
function lf(e, n, t, r) {
  return t.safe(e.value, r);
}
function of(e) {
  const n = e.options.ruleRepetition || 3;
  if (n < 3)
    throw new Error(
      "Cannot serialize rules with repetition `" + n + "` for `options.ruleRepetition`, expected `3` or more"
    );
  return n;
}
function af(e, n, t) {
  const r = (Ri(t) + (t.options.ruleSpaces ? " " : "")).repeat(of(t));
  return t.options.ruleSpaces ? r.slice(0, -1) : r;
}
const Mi = {
  blockquote: Pc,
  break: Cr,
  code: Nc,
  definition: Oc,
  emphasis: Ai,
  hardBreak: Cr,
  heading: jc,
  html: Pi,
  image: zi,
  imageReference: Li,
  inlineCode: Di,
  link: _i,
  linkReference: Ni,
  list: Gc,
  listItem: Kc,
  paragraph: Zc,
  root: tf,
  strong: Oi,
  text: lf,
  thematicBreak: af
};
function sf() {
  return {
    enter: {
      table: uf,
      tableData: Sr,
      tableHeader: Sr,
      tableRow: ff
    },
    exit: {
      codeText: pf,
      table: cf,
      tableData: Gt,
      tableHeader: Gt,
      tableRow: Gt
    }
  };
}
function uf(e) {
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
function cf(e) {
  this.exit(e), this.data.inTable = void 0;
}
function ff(e) {
  this.enter({ type: "tableRow", children: [] }, e);
}
function Gt(e) {
  this.exit(e);
}
function Sr(e) {
  this.enter({ type: "tableCell", children: [] }, e);
}
function pf(e) {
  let n = this.resume();
  this.data.inTable && (n = n.replace(/\\([\\|])/g, hf));
  const t = this.stack[this.stack.length - 1];
  t.type, t.value = n, this.exit(e);
}
function hf(e, n) {
  return n === "|" ? n : e;
}
function df(e) {
  const n = e || {}, t = n.tableCellPadding, r = n.tablePipeAlign, i = n.stringLength, o = t ? " " : "|";
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
      table: l,
      tableCell: s,
      tableRow: a
    }
  };
  function l(p, d, x, w) {
    return u(f(p, x, w), p.align);
  }
  function a(p, d, x, w) {
    const y = c(p, x, w), E = u([y]);
    return E.slice(0, E.indexOf(`
`));
  }
  function s(p, d, x, w) {
    const y = x.enter("tableCell"), E = x.enter("phrasing"), C = x.containerPhrasing(p, {
      ...w,
      before: o,
      after: o
    });
    return E(), y(), C;
  }
  function u(p, d) {
    return Tc(p, {
      align: d,
      // @ts-expect-error: `markdown-table` types should support `null`.
      alignDelimiters: r,
      // @ts-expect-error: `markdown-table` types should support `null`.
      padding: t,
      // @ts-expect-error: `markdown-table` types should support `null`.
      stringLength: i
    });
  }
  function f(p, d, x) {
    const w = p.children;
    let y = -1;
    const E = [], C = d.enter("table");
    for (; ++y < w.length; )
      E[y] = c(w[y], d, x);
    return C(), E;
  }
  function c(p, d, x) {
    const w = p.children;
    let y = -1;
    const E = [], C = d.enter("tableRow");
    for (; ++y < w.length; )
      E[y] = s(w[y], p, d, x);
    return C(), E;
  }
  function h(p, d, x) {
    let w = Mi.inlineCode(p, d, x);
    return x.stack.includes("tableCell") && (w = w.replace(/\|/g, "\\$&")), w;
  }
}
function mf() {
  return {
    exit: {
      taskListCheckValueChecked: Er,
      taskListCheckValueUnchecked: Er,
      paragraph: xf
    }
  };
}
function gf() {
  return {
    unsafe: [{ atBreak: !0, character: "-", after: "[:|-]" }],
    handlers: { listItem: yf }
  };
}
function Er(e) {
  const n = this.stack[this.stack.length - 2];
  n.type, n.checked = e.type === "taskListCheckValueChecked";
}
function xf(e) {
  const n = this.stack[this.stack.length - 2];
  if (n && n.type === "listItem" && typeof n.checked == "boolean") {
    const t = this.stack[this.stack.length - 1];
    t.type;
    const r = t.children[0];
    if (r && r.type === "text") {
      const i = n.children;
      let o = -1, l;
      for (; ++o < i.length; ) {
        const a = i[o];
        if (a.type === "paragraph") {
          l = a;
          break;
        }
      }
      l === t && (r.value = r.value.slice(1), r.value.length === 0 ? t.children.shift() : t.position && r.position && typeof r.position.start.offset == "number" && (r.position.start.column++, r.position.start.offset++, t.position.start = Object.assign({}, r.position.start)));
    }
  }
  this.exit(e);
}
function yf(e, n, t, r) {
  const i = e.children[0], o = typeof e.checked == "boolean" && i && i.type === "paragraph", l = "[" + (e.checked ? "x" : " ") + "] ", a = t.createTracker(r);
  o && a.move(l);
  let s = Mi.listItem(e, n, t, {
    ...r,
    ...a.current()
  });
  return o && (s = s.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, u)), s;
  function u(f) {
    return f + l;
  }
}
function kf() {
  return [
    Gu(),
    xc(),
    wc(),
    sf(),
    mf()
  ];
}
function bf(e) {
  return {
    extensions: [
      Ju(),
      yc(e),
      vc(),
      df(e),
      gf()
    ]
  };
}
const wf = {
  tokenize: Tf,
  partial: !0
}, Bi = {
  tokenize: Af,
  partial: !0
}, $i = {
  tokenize: Pf,
  partial: !0
}, ji = {
  tokenize: zf,
  partial: !0
}, vf = {
  tokenize: Lf,
  partial: !0
}, Hi = {
  name: "wwwAutolink",
  tokenize: Ef,
  previous: Vi
}, Ui = {
  name: "protocolAutolink",
  tokenize: If,
  previous: qi
}, _e = {
  name: "emailAutolink",
  tokenize: Sf,
  previous: Wi
}, ze = {};
function Cf() {
  return {
    text: ze
  };
}
let $e = 48;
for (; $e < 123; )
  ze[$e] = _e, $e++, $e === 58 ? $e = 65 : $e === 91 && ($e = 97);
ze[43] = _e;
ze[45] = _e;
ze[46] = _e;
ze[95] = _e;
ze[72] = [_e, Ui];
ze[104] = [_e, Ui];
ze[87] = [_e, Hi];
ze[119] = [_e, Hi];
function Sf(e, n, t) {
  const r = this;
  let i, o;
  return l;
  function l(c) {
    return !cn(c) || !Wi.call(r, r.previous) || zn(r.events) ? t(c) : (e.enter("literalAutolink"), e.enter("literalAutolinkEmail"), a(c));
  }
  function a(c) {
    return cn(c) ? (e.consume(c), a) : c === 64 ? (e.consume(c), s) : t(c);
  }
  function s(c) {
    return c === 46 ? e.check(vf, f, u)(c) : c === 45 || c === 95 || ie(c) ? (o = !0, e.consume(c), s) : f(c);
  }
  function u(c) {
    return e.consume(c), i = !0, s;
  }
  function f(c) {
    return o && i && oe(r.previous) ? (e.exit("literalAutolinkEmail"), e.exit("literalAutolink"), n(c)) : t(c);
  }
}
function Ef(e, n, t) {
  const r = this;
  return i;
  function i(l) {
    return l !== 87 && l !== 119 || !Vi.call(r, r.previous) || zn(r.events) ? t(l) : (e.enter("literalAutolink"), e.enter("literalAutolinkWww"), e.check(wf, e.attempt(Bi, e.attempt($i, o), t), t)(l));
  }
  function o(l) {
    return e.exit("literalAutolinkWww"), e.exit("literalAutolink"), n(l);
  }
}
function If(e, n, t) {
  const r = this;
  let i = "", o = !1;
  return l;
  function l(c) {
    return (c === 72 || c === 104) && qi.call(r, r.previous) && !zn(r.events) ? (e.enter("literalAutolink"), e.enter("literalAutolinkHttp"), i += String.fromCodePoint(c), e.consume(c), a) : t(c);
  }
  function a(c) {
    if (oe(c) && i.length < 5)
      return i += String.fromCodePoint(c), e.consume(c), a;
    if (c === 58) {
      const h = i.toLowerCase();
      if (h === "http" || h === "https")
        return e.consume(c), s;
    }
    return t(c);
  }
  function s(c) {
    return c === 47 ? (e.consume(c), o ? u : (o = !0, s)) : t(c);
  }
  function u(c) {
    return c === null || St(c) || G(c) || Ve(c) || Pt(c) ? t(c) : e.attempt(Bi, e.attempt($i, f), t)(c);
  }
  function f(c) {
    return e.exit("literalAutolinkHttp"), e.exit("literalAutolink"), n(c);
  }
}
function Tf(e, n, t) {
  let r = 0;
  return i;
  function i(l) {
    return (l === 87 || l === 119) && r < 3 ? (r++, e.consume(l), i) : l === 46 && r === 3 ? (e.consume(l), o) : t(l);
  }
  function o(l) {
    return l === null ? t(l) : n(l);
  }
}
function Af(e, n, t) {
  let r, i, o;
  return l;
  function l(u) {
    return u === 46 || u === 95 ? e.check(ji, s, a)(u) : u === null || G(u) || Ve(u) || u !== 45 && Pt(u) ? s(u) : (o = !0, e.consume(u), l);
  }
  function a(u) {
    return u === 95 ? r = !0 : (i = r, r = void 0), e.consume(u), l;
  }
  function s(u) {
    return i || r || !o ? t(u) : n(u);
  }
}
function Pf(e, n) {
  let t = 0, r = 0;
  return i;
  function i(l) {
    return l === 40 ? (t++, e.consume(l), i) : l === 41 && r < t ? o(l) : l === 33 || l === 34 || l === 38 || l === 39 || l === 41 || l === 42 || l === 44 || l === 46 || l === 58 || l === 59 || l === 60 || l === 63 || l === 93 || l === 95 || l === 126 ? e.check(ji, n, o)(l) : l === null || G(l) || Ve(l) ? n(l) : (e.consume(l), i);
  }
  function o(l) {
    return l === 41 && r++, e.consume(l), i;
  }
}
function zf(e, n, t) {
  return r;
  function r(a) {
    return a === 33 || a === 34 || a === 39 || a === 41 || a === 42 || a === 44 || a === 46 || a === 58 || a === 59 || a === 63 || a === 95 || a === 126 ? (e.consume(a), r) : a === 38 ? (e.consume(a), o) : a === 93 ? (e.consume(a), i) : (
      // `<` is an end.
      a === 60 || // So is whitespace.
      a === null || G(a) || Ve(a) ? n(a) : t(a)
    );
  }
  function i(a) {
    return a === null || a === 40 || a === 91 || G(a) || Ve(a) ? n(a) : r(a);
  }
  function o(a) {
    return oe(a) ? l(a) : t(a);
  }
  function l(a) {
    return a === 59 ? (e.consume(a), r) : oe(a) ? (e.consume(a), l) : t(a);
  }
}
function Lf(e, n, t) {
  return r;
  function r(o) {
    return e.consume(o), i;
  }
  function i(o) {
    return ie(o) ? t(o) : n(o);
  }
}
function Vi(e) {
  return e === null || e === 40 || e === 42 || e === 95 || e === 91 || e === 93 || e === 126 || G(e);
}
function qi(e) {
  return !oe(e);
}
function Wi(e) {
  return !(e === 47 || cn(e));
}
function cn(e) {
  return e === 43 || e === 45 || e === 46 || e === 95 || ie(e);
}
function zn(e) {
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
const Df = {
  tokenize: $f,
  partial: !0
};
function Ff() {
  return {
    document: {
      91: {
        name: "gfmFootnoteDefinition",
        tokenize: Of,
        continuation: {
          tokenize: Mf
        },
        exit: Bf
      }
    },
    text: {
      91: {
        name: "gfmFootnoteCall",
        tokenize: Rf
      },
      93: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: _f,
        resolveTo: Nf
      }
    }
  };
}
function _f(e, n, t) {
  const r = this;
  let i = r.events.length;
  const o = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let l;
  for (; i--; ) {
    const s = r.events[i][1];
    if (s.type === "labelImage") {
      l = s;
      break;
    }
    if (s.type === "gfmFootnoteCall" || s.type === "labelLink" || s.type === "label" || s.type === "image" || s.type === "link")
      break;
  }
  return a;
  function a(s) {
    if (!l || !l._balanced)
      return t(s);
    const u = Se(r.sliceSerialize({
      start: l.end,
      end: r.now()
    }));
    return u.codePointAt(0) !== 94 || !o.includes(u.slice(1)) ? t(s) : (e.enter("gfmFootnoteCallLabelMarker"), e.consume(s), e.exit("gfmFootnoteCallLabelMarker"), n(s));
  }
}
function Nf(e, n) {
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
  }, i = {
    type: "gfmFootnoteCallMarker",
    start: Object.assign({}, e[t + 3][1].end),
    end: Object.assign({}, e[t + 3][1].end)
  };
  i.end.column++, i.end.offset++, i.end._bufferIndex++;
  const o = {
    type: "gfmFootnoteCallString",
    start: Object.assign({}, i.end),
    end: Object.assign({}, e[e.length - 1][1].start)
  }, l = {
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
    ["enter", i, n],
    ["exit", i, n],
    // Everything in between.
    ["enter", o, n],
    ["enter", l, n],
    ["exit", l, n],
    ["exit", o, n],
    // The ending (`]`, properly parsed and labelled).
    e[e.length - 2],
    e[e.length - 1],
    ["exit", r, n]
  ];
  return e.splice(t, e.length - t + 1, ...a), e;
}
function Rf(e, n, t) {
  const r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let o = 0, l;
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
      c === 93 && !l || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      c === null || c === 91 || G(c)
    )
      return t(c);
    if (c === 93) {
      e.exit("chunkString");
      const h = e.exit("gfmFootnoteCallString");
      return i.includes(Se(r.sliceSerialize(h))) ? (e.enter("gfmFootnoteCallLabelMarker"), e.consume(c), e.exit("gfmFootnoteCallLabelMarker"), e.exit("gfmFootnoteCall"), n) : t(c);
    }
    return G(c) || (l = !0), o++, e.consume(c), c === 92 ? f : u;
  }
  function f(c) {
    return c === 91 || c === 92 || c === 93 ? (e.consume(c), o++, u) : u(c);
  }
}
function Of(e, n, t) {
  const r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let o, l = 0, a;
  return s;
  function s(d) {
    return e.enter("gfmFootnoteDefinition")._container = !0, e.enter("gfmFootnoteDefinitionLabel"), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(d), e.exit("gfmFootnoteDefinitionLabelMarker"), u;
  }
  function u(d) {
    return d === 94 ? (e.enter("gfmFootnoteDefinitionMarker"), e.consume(d), e.exit("gfmFootnoteDefinitionMarker"), e.enter("gfmFootnoteDefinitionLabelString"), e.enter("chunkString").contentType = "string", f) : t(d);
  }
  function f(d) {
    if (
      // Too long.
      l > 999 || // Closing brace with nothing.
      d === 93 && !a || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      d === null || d === 91 || G(d)
    )
      return t(d);
    if (d === 93) {
      e.exit("chunkString");
      const x = e.exit("gfmFootnoteDefinitionLabelString");
      return o = Se(r.sliceSerialize(x)), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(d), e.exit("gfmFootnoteDefinitionLabelMarker"), e.exit("gfmFootnoteDefinitionLabel"), h;
    }
    return G(d) || (a = !0), l++, e.consume(d), d === 92 ? c : f;
  }
  function c(d) {
    return d === 91 || d === 92 || d === 93 ? (e.consume(d), l++, f) : f(d);
  }
  function h(d) {
    return d === 58 ? (e.enter("definitionMarker"), e.consume(d), e.exit("definitionMarker"), i.includes(o) || i.push(o), H(e, p, "gfmFootnoteDefinitionWhitespace")) : t(d);
  }
  function p(d) {
    return n(d);
  }
}
function Mf(e, n, t) {
  return e.check(ht, n, e.attempt(Df, n, t));
}
function Bf(e) {
  e.exit("gfmFootnoteDefinition");
}
function $f(e, n, t) {
  const r = this;
  return H(e, i, "gfmFootnoteDefinitionIndent", 5);
  function i(o) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === "gfmFootnoteDefinitionIndent" && l[2].sliceSerialize(l[1], !0).length === 4 ? n(o) : t(o);
  }
}
function jf(e) {
  let t = (e || {}).singleTilde;
  const r = {
    name: "strikethrough",
    tokenize: o,
    resolveAll: i
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
  function i(l, a) {
    let s = -1;
    for (; ++s < l.length; )
      if (l[s][0] === "enter" && l[s][1].type === "strikethroughSequenceTemporary" && l[s][1]._close) {
        let u = s;
        for (; u--; )
          if (l[u][0] === "exit" && l[u][1].type === "strikethroughSequenceTemporary" && l[u][1]._open && // If the sizes are the same:
          l[s][1].end.offset - l[s][1].start.offset === l[u][1].end.offset - l[u][1].start.offset) {
            l[s][1].type = "strikethroughSequence", l[u][1].type = "strikethroughSequence";
            const f = {
              type: "strikethrough",
              start: Object.assign({}, l[u][1].start),
              end: Object.assign({}, l[s][1].end)
            }, c = {
              type: "strikethroughText",
              start: Object.assign({}, l[u][1].end),
              end: Object.assign({}, l[s][1].start)
            }, h = [["enter", f, a], ["enter", l[u][1], a], ["exit", l[u][1], a], ["enter", c, a]], p = a.parser.constructs.insideSpan.null;
            p && xe(h, h.length, 0, zt(p, l.slice(u + 1, s), a)), xe(h, h.length, 0, [["exit", c, a], ["enter", l[s][1], a], ["exit", l[s][1], a], ["exit", f, a]]), xe(l, u - 1, s - u + 3, h), s = u + h.length - 2;
            break;
          }
      }
    for (s = -1; ++s < l.length; )
      l[s][1].type === "strikethroughSequenceTemporary" && (l[s][1].type = "data");
    return l;
  }
  function o(l, a, s) {
    const u = this.previous, f = this.events;
    let c = 0;
    return h;
    function h(d) {
      return u === 126 && f[f.length - 1][1].type !== "characterEscape" ? s(d) : (l.enter("strikethroughSequenceTemporary"), p(d));
    }
    function p(d) {
      const x = Xe(u);
      if (d === 126)
        return c > 1 ? s(d) : (l.consume(d), c++, p);
      if (c < 2 && !t) return s(d);
      const w = l.exit("strikethroughSequenceTemporary"), y = Xe(d);
      return w._open = !y || y === 2 && !!x, w._close = !x || x === 2 && !!y, a(d);
    }
  }
}
class Hf {
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
    Uf(this, n, t, r);
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
    if (this.map.sort(function(o, l) {
      return o[0] - l[0];
    }), this.map.length === 0)
      return;
    let t = this.map.length;
    const r = [];
    for (; t > 0; )
      t -= 1, r.push(n.slice(this.map[t][0] + this.map[t][1]), this.map[t][2]), n.length = this.map[t][0];
    r.push(n.slice()), n.length = 0;
    let i = r.pop();
    for (; i; ) {
      for (const o of i)
        n.push(o);
      i = r.pop();
    }
    this.map.length = 0;
  }
}
function Uf(e, n, t, r) {
  let i = 0;
  if (!(t === 0 && r.length === 0)) {
    for (; i < e.map.length; ) {
      if (e.map[i][0] === n) {
        e.map[i][1] += t, e.map[i][2].push(...r);
        return;
      }
      i += 1;
    }
    e.map.push([n, t, r]);
  }
}
function Vf(e, n) {
  let t = !1;
  const r = [];
  for (; n < e.length; ) {
    const i = e[n];
    if (t) {
      if (i[0] === "enter")
        i[1].type === "tableContent" && r.push(e[n + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
      else if (i[1].type === "tableContent") {
        if (e[n - 1][1].type === "tableDelimiterMarker") {
          const o = r.length - 1;
          r[o] = r[o] === "left" ? "center" : "right";
        }
      } else if (i[1].type === "tableDelimiterRow")
        break;
    } else i[0] === "enter" && i[1].type === "tableDelimiterRow" && (t = !0);
    n += 1;
  }
  return r;
}
function qf() {
  return {
    flow: {
      null: {
        name: "table",
        tokenize: Wf,
        resolveAll: Yf
      }
    }
  };
}
function Wf(e, n, t) {
  const r = this;
  let i = 0, o = 0, l;
  return a;
  function a(k) {
    let P = r.events.length - 1;
    for (; P > -1; ) {
      const J = r.events[P][1].type;
      if (J === "lineEnding" || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      J === "linePrefix") P--;
      else break;
    }
    const L = P > -1 ? r.events[P][1].type : null, q = L === "tableHead" || L === "tableRow" ? v : s;
    return q === v && r.parser.lazy[r.now().line] ? t(k) : q(k);
  }
  function s(k) {
    return e.enter("tableHead"), e.enter("tableRow"), u(k);
  }
  function u(k) {
    return k === 124 || (l = !0, o += 1), f(k);
  }
  function f(k) {
    return k === null ? t(k) : D(k) ? o > 1 ? (o = 0, r.interrupt = !0, e.exit("tableRow"), e.enter("lineEnding"), e.consume(k), e.exit("lineEnding"), p) : t(k) : B(k) ? H(e, f, "whitespace")(k) : (o += 1, l && (l = !1, i += 1), k === 124 ? (e.enter("tableCellDivider"), e.consume(k), e.exit("tableCellDivider"), l = !0, f) : (e.enter("data"), c(k)));
  }
  function c(k) {
    return k === null || k === 124 || G(k) ? (e.exit("data"), f(k)) : (e.consume(k), k === 92 ? h : c);
  }
  function h(k) {
    return k === 92 || k === 124 ? (e.consume(k), c) : c(k);
  }
  function p(k) {
    return r.interrupt = !1, r.parser.lazy[r.now().line] ? t(k) : (e.enter("tableDelimiterRow"), l = !1, B(k) ? H(e, d, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(k) : d(k));
  }
  function d(k) {
    return k === 45 || k === 58 ? w(k) : k === 124 ? (l = !0, e.enter("tableCellDivider"), e.consume(k), e.exit("tableCellDivider"), x) : N(k);
  }
  function x(k) {
    return B(k) ? H(e, w, "whitespace")(k) : w(k);
  }
  function w(k) {
    return k === 58 ? (o += 1, l = !0, e.enter("tableDelimiterMarker"), e.consume(k), e.exit("tableDelimiterMarker"), y) : k === 45 ? (o += 1, y(k)) : k === null || D(k) ? A(k) : N(k);
  }
  function y(k) {
    return k === 45 ? (e.enter("tableDelimiterFiller"), E(k)) : N(k);
  }
  function E(k) {
    return k === 45 ? (e.consume(k), E) : k === 58 ? (l = !0, e.exit("tableDelimiterFiller"), e.enter("tableDelimiterMarker"), e.consume(k), e.exit("tableDelimiterMarker"), C) : (e.exit("tableDelimiterFiller"), C(k));
  }
  function C(k) {
    return B(k) ? H(e, A, "whitespace")(k) : A(k);
  }
  function A(k) {
    return k === 124 ? d(k) : k === null || D(k) ? !l || i !== o ? N(k) : (e.exit("tableDelimiterRow"), e.exit("tableHead"), n(k)) : N(k);
  }
  function N(k) {
    return t(k);
  }
  function v(k) {
    return e.enter("tableRow"), $(k);
  }
  function $(k) {
    return k === 124 ? (e.enter("tableCellDivider"), e.consume(k), e.exit("tableCellDivider"), $) : k === null || D(k) ? (e.exit("tableRow"), n(k)) : B(k) ? H(e, $, "whitespace")(k) : (e.enter("data"), Y(k));
  }
  function Y(k) {
    return k === null || k === 124 || G(k) ? (e.exit("data"), $(k)) : (e.consume(k), k === 92 ? U : Y);
  }
  function U(k) {
    return k === 92 || k === 124 ? (e.consume(k), Y) : Y(k);
  }
}
function Yf(e, n) {
  let t = -1, r = !0, i = 0, o = [0, 0, 0, 0], l = [0, 0, 0, 0], a = !1, s = 0, u, f, c;
  const h = new Hf();
  for (; ++t < e.length; ) {
    const p = e[t], d = p[1];
    p[0] === "enter" ? d.type === "tableHead" ? (a = !1, s !== 0 && (Ir(h, n, s, u, f), f = void 0, s = 0), u = {
      type: "table",
      start: Object.assign({}, d.start),
      // Note: correct end is set later.
      end: Object.assign({}, d.end)
    }, h.add(t, 0, [["enter", u, n]])) : d.type === "tableRow" || d.type === "tableDelimiterRow" ? (r = !0, c = void 0, o = [0, 0, 0, 0], l = [0, t + 1, 0, 0], a && (a = !1, f = {
      type: "tableBody",
      start: Object.assign({}, d.start),
      // Note: correct end is set later.
      end: Object.assign({}, d.end)
    }, h.add(t, 0, [["enter", f, n]])), i = d.type === "tableDelimiterRow" ? 2 : f ? 3 : 1) : i && (d.type === "data" || d.type === "tableDelimiterMarker" || d.type === "tableDelimiterFiller") ? (r = !1, l[2] === 0 && (o[1] !== 0 && (l[0] = l[1], c = bt(h, n, o, i, void 0, c), o = [0, 0, 0, 0]), l[2] = t)) : d.type === "tableCellDivider" && (r ? r = !1 : (o[1] !== 0 && (l[0] = l[1], c = bt(h, n, o, i, void 0, c)), o = l, l = [o[1], t, 0, 0])) : d.type === "tableHead" ? (a = !0, s = t) : d.type === "tableRow" || d.type === "tableDelimiterRow" ? (s = t, o[1] !== 0 ? (l[0] = l[1], c = bt(h, n, o, i, t, c)) : l[1] !== 0 && (c = bt(h, n, l, i, t, c)), i = 0) : i && (d.type === "data" || d.type === "tableDelimiterMarker" || d.type === "tableDelimiterFiller") && (l[3] = t);
  }
  for (s !== 0 && Ir(h, n, s, u, f), h.consume(n.events), t = -1; ++t < n.events.length; ) {
    const p = n.events[t];
    p[0] === "enter" && p[1].type === "table" && (p[1]._align = Vf(n.events, t));
  }
  return e;
}
function bt(e, n, t, r, i, o) {
  const l = r === 1 ? "tableHeader" : r === 2 ? "tableDelimiter" : "tableData", a = "tableContent";
  t[0] !== 0 && (o.end = Object.assign({}, Qe(n.events, t[0])), e.add(t[0], 0, [["exit", o, n]]));
  const s = Qe(n.events, t[1]);
  if (o = {
    type: l,
    start: Object.assign({}, s),
    // Note: correct end is set later.
    end: Object.assign({}, s)
  }, e.add(t[1], 0, [["enter", o, n]]), t[2] !== 0) {
    const u = Qe(n.events, t[2]), f = Qe(n.events, t[3]), c = {
      type: a,
      start: Object.assign({}, u),
      end: Object.assign({}, f)
    };
    if (e.add(t[2], 0, [["enter", c, n]]), r !== 2) {
      const h = n.events[t[2]], p = n.events[t[3]];
      if (h[1].end = Object.assign({}, p[1].end), h[1].type = "chunkText", h[1].contentType = "text", t[3] > t[2] + 1) {
        const d = t[2] + 1, x = t[3] - t[2] - 1;
        e.add(d, x, []);
      }
    }
    e.add(t[3] + 1, 0, [["exit", c, n]]);
  }
  return i !== void 0 && (o.end = Object.assign({}, Qe(n.events, i)), e.add(i, 0, [["exit", o, n]]), o = void 0), o;
}
function Ir(e, n, t, r, i) {
  const o = [], l = Qe(n.events, t);
  i && (i.end = Object.assign({}, l), o.push(["exit", i, n])), r.end = Object.assign({}, l), o.push(["exit", r, n]), e.add(t + 1, 0, o);
}
function Qe(e, n) {
  const t = e[n], r = t[0] === "enter" ? "start" : "end";
  return t[1][r];
}
const Qf = {
  name: "tasklistCheck",
  tokenize: Gf
};
function Xf() {
  return {
    text: {
      91: Qf
    }
  };
}
function Gf(e, n, t) {
  const r = this;
  return i;
  function i(s) {
    return (
      // Exit if there’s stuff before.
      r.previous !== null || // Exit if not in the first content that is the first child of a list
      // item.
      !r._gfmTasklistFirstContentOfListItem ? t(s) : (e.enter("taskListCheck"), e.enter("taskListCheckMarker"), e.consume(s), e.exit("taskListCheckMarker"), o)
    );
  }
  function o(s) {
    return G(s) ? (e.enter("taskListCheckValueUnchecked"), e.consume(s), e.exit("taskListCheckValueUnchecked"), l) : s === 88 || s === 120 ? (e.enter("taskListCheckValueChecked"), e.consume(s), e.exit("taskListCheckValueChecked"), l) : t(s);
  }
  function l(s) {
    return s === 93 ? (e.enter("taskListCheckMarker"), e.consume(s), e.exit("taskListCheckMarker"), e.exit("taskListCheck"), a) : t(s);
  }
  function a(s) {
    return D(s) ? n(s) : B(s) ? e.check({
      tokenize: Jf
    }, n, t)(s) : t(s);
  }
}
function Jf(e, n, t) {
  return H(e, r, "whitespace");
  function r(i) {
    return i === null ? t(i) : n(i);
  }
}
function Kf(e) {
  return ti([
    Cf(),
    Ff(),
    jf(e),
    qf(),
    Xf()
  ]);
}
const Zf = {};
function ep(e) {
  const n = (
    /** @type {Processor<Root>} */
    this
  ), t = e || Zf, r = n.data(), i = r.micromarkExtensions || (r.micromarkExtensions = []), o = r.fromMarkdownExtensions || (r.fromMarkdownExtensions = []), l = r.toMarkdownExtensions || (r.toMarkdownExtensions = []);
  i.push(Kf(t)), o.push(kf()), l.push(bf(t));
}
const Yi = Rr(null), mt = Rr({
  lines: [],
  pendingLine: null,
  onToggle: () => {
  },
  onOpenFile: () => {
  }
}), tp = /(^|[\s([{])((?:~\/|\/)[\w.\-]+(?:\/[\w.\-]+)+\/?)(?=[\s)\]},;:!?'"]|$)/g;
function np(e) {
  let n = !1;
  return e.split(`
`).map((t) => /^\s*(```|~~~)/.test(t) ? (n = !n, t) : n ? t : t.split(/(`[^`]*`)/).map(
    (r) => r.startsWith("`") ? r : r.replace(tp, (i, o, l) => `${o}[${l}](${l})`)
  ).join("")).join(`
`);
}
const Qi = (e) => !!e && (e.startsWith("/") || e.startsWith("~/")) && e.includes("/");
function rp({ path: e, onClose: n }) {
  const [t, r] = ee({
    loading: !0
  }), [i, o] = ee(!1);
  return ut(() => {
    let l = !0;
    return r({ loading: !0 }), fetch(`/api/file-read?path=${encodeURIComponent(e)}`, { credentials: "same-origin" }).then(async (a) => {
      const s = await a.text();
      if (l)
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
      l && r({ loading: !1, error: String(a) });
    }), () => {
      l = !1;
    };
  }, [e]), /* @__PURE__ */ I("div", { className: "tl-modal-overlay", onClick: n, role: "presentation", children: /* @__PURE__ */ F(
    "div",
    {
      className: "tl-modal",
      role: "dialog",
      "aria-label": e,
      onClick: (l) => l.stopPropagation(),
      children: [
        /* @__PURE__ */ F("div", { className: "tl-modal-head", children: [
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
              children: i ? "Copied ✓" : "Copy path"
            }
          ),
          /* @__PURE__ */ I("button", { type: "button", className: "tl-btn", onClick: n, children: "Close" })
        ] }),
        /* @__PURE__ */ I("div", { className: "tl-modal-body", children: t.loading ? /* @__PURE__ */ I("div", { className: "tl-dim", children: "Loading…" }) : t.error ? /* @__PURE__ */ F("div", { className: "tl-dim", children: [
          "Could not open: ",
          t.error
        ] }) : /* @__PURE__ */ I("pre", { className: "tl-file-pre", children: t.content }) })
      ]
    }
  ) });
}
function ip({ node: e, className: n, children: t, ...r }) {
  var a, s;
  const { lines: i } = st(mt), o = (a = e == null ? void 0 : e.position) == null ? void 0 : a.start.line;
  if (typeof n == "string" && n.includes("task-list-item") && typeof o == "number") {
    const u = o - 1, f = (s = Mr.exec(i[u] ?? "")) == null ? void 0 : s[1];
    return /* @__PURE__ */ I(Yi.Provider, { value: u, children: /* @__PURE__ */ F("li", { className: `${n} tl-task`, ...r, children: [
      t,
      f ? /* @__PURE__ */ F("span", { title: `Claimed by ${f}`, className: "tl-claim", children: [
        "⛓ ",
        f
      ] }) : null
    ] }) });
  }
  return /* @__PURE__ */ I("li", { className: n, ...r, children: t });
}
function lp(e) {
  const { node: n, ...t } = e, r = st(Yi), { pendingLine: i, onToggle: o } = st(mt);
  if (t.type !== "checkbox") return /* @__PURE__ */ I("input", { ...t });
  const l = i !== null;
  return /* @__PURE__ */ I(
    "input",
    {
      type: "checkbox",
      checked: !!t.checked,
      disabled: r === null || l,
      onChange: () => {
        r !== null && o(r);
      },
      className: `tl-check${i === r ? " tl-check-busy" : ""}`
    }
  );
}
function op({ node: e, href: n, children: t, ...r }) {
  const { onOpenFile: i } = st(mt);
  return Qi(n) ? /* @__PURE__ */ I(
    "a",
    {
      href: n,
      className: "tl-filelink",
      title: `Open ${n}`,
      onClick: (o) => {
        o.preventDefault(), i(n);
      },
      ...r,
      children: t
    }
  ) : /* @__PURE__ */ I("a", { href: n, target: "_blank", rel: "noreferrer", ...r, children: t });
}
function ap({ node: e, className: n, children: t, ...r }) {
  const { onOpenFile: i } = st(mt), o = typeof t == "string" ? t : Array.isArray(t) && t.length === 1 && typeof t[0] == "string" ? t[0] : void 0;
  return Qi(o) ? /* @__PURE__ */ I(
    "code",
    {
      className: `${n ?? ""} tl-filelink`,
      title: `Open ${o}`,
      role: "link",
      tabIndex: 0,
      onClick: () => i(o),
      onKeyDown: (l) => {
        l.key === "Enter" && i(o);
      },
      ...r,
      children: t
    }
  ) : /* @__PURE__ */ I("code", { className: n, ...r, children: t });
}
const sp = {
  li: ip,
  input: lp,
  a: op,
  code: ap
}, up = `
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
function cp({
  content: e,
  pendingLine: n,
  onToggle: t
}) {
  const [r, i] = ee(null), o = Jt(
    () => ({ lines: e.split(`
`), pendingLine: n, onToggle: t, onOpenFile: i }),
    [e, n, t]
  ), l = Jt(() => np(e), [e]);
  return /* @__PURE__ */ F(mt.Provider, { value: o, children: [
    /* @__PURE__ */ I("style", { children: up }),
    /* @__PURE__ */ I("div", { className: "tl-md", children: /* @__PURE__ */ I($u, { remarkPlugins: [ep], components: sp, children: l }) }),
    r ? /* @__PURE__ */ I(rp, { path: r, onClose: () => i(null) }) : null
  ] });
}
const Xi = /^-?\s*(✅ VALID|❌ NOT-TRUE)\s*\(([^)]*)\)\s*:?\s*(.*)$/, fp = /^(\s*)- \[([x~! ])\] (.*)$/, pp = { x: "done", "~": "prog", "!": "blk" };
function hp(e) {
  return e.replace(/<!--.*?-->/g, "").replace(/\(released:[^)]*\)/g, "").replace(/\*\*/g, "").replace(/\s+/g, " ").trim();
}
function dp(e) {
  const n = e.split(`
`), t = [];
  let r = !1;
  n.forEach((s, u) => {
    /^\s*(```|~~~)/.test(s) ? r = !r : !r && s.startsWith("## ") && t.push(u);
  });
  const i = (s, u) => {
    var d;
    const f = [], c = [];
    let h = null, p = !1;
    for (let x = s; x < u; x++) {
      const w = n[x];
      if (/^\s*(```|~~~)/.test(w)) {
        p = !p, c.push(w), h = null;
        continue;
      }
      const y = p ? null : fp.exec(w);
      if (y) {
        const E = Math.floor(y[1].length / 2);
        let C = pp[y[2]] ?? (y[3].includes("⛔") ? "gate" : "open");
        y[2] === " " && y[3].includes("⛔") && (C = "gate"), h = {
          line0: x,
          depth: E,
          status: C,
          text: hp(y[3]),
          claim: (d = Mr.exec(w)) == null ? void 0 : d[1],
          notes: []
        }, f.push(h);
        continue;
      }
      if (w.trim() === "") {
        h = null;
        continue;
      }
      if (h && /^\s{2,}/.test(w)) {
        const E = w.trim(), C = Xi.exec(E);
        C ? h.verdict = { kind: C[1] === "✅ VALID" ? "valid" : "disputed", meta: C[2], note: C[3] } : h.notes.push(E);
        continue;
      }
      h = null, !w.startsWith("---") && !w.startsWith("# ") && c.push(w);
    }
    return { items: f, extra: c };
  }, o = t.length ? t[0] : n.length, l = i(0, o).extra, a = t.map((s, u) => {
    const f = u + 1 < t.length ? t[u + 1] : n.length, { items: c, extra: h } = i(s + 1, f);
    return { title: n[s].slice(3).trim(), items: c, extra: h };
  });
  return { pre: l, sections: a };
}
function Tr() {
  try {
    let e = document.body;
    for (; e; ) {
      const n = getComputedStyle(e).backgroundColor, t = /rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s/]+([\d.]+))?\)/.exec(n);
      if (t && (t[4] === void 0 || parseFloat(t[4]) > 0.1)) {
        const [r, i, o] = [+t[1], +t[2], +t[3]];
        return 0.2126 * r + 0.7152 * i + 0.0722 * o > 128;
      }
      e = e.parentElement;
    }
  } catch {
  }
  return !1;
}
function mp() {
  const [e, n] = ee(Tr);
  return ut(() => {
    const t = () => n(Tr());
    t();
    const r = new MutationObserver(t);
    return r.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class", "style", "data-theme"]
    }), r.observe(document.body, { attributes: !0, attributeFilter: ["class", "style"] }), () => r.disconnect();
  }, []), e;
}
const gp = /(https?:\/\/[^\s)\]]+|CR-\d{6,}|\b[PV]\d{8,}\b)/g;
function xp(e) {
  return e.startsWith("http") ? e : e.startsWith("CR-") ? `https://code.amazon.com/reviews/${e}` : `https://t.corp.amazon.com/${e}`;
}
function Ar({ text: e }) {
  const n = e.split(gp);
  return /* @__PURE__ */ I(at, { children: n.map(
    (t, r) => r % 2 === 1 ? /* @__PURE__ */ I(
      "a",
      {
        href: xp(t),
        target: "_blank",
        rel: "noreferrer",
        onClick: (i) => i.stopPropagation(),
        children: t
      },
      r
    ) : t
  ) });
}
const yp = { open: "●", gate: "⛔", prog: "◐", blk: "✕", done: "✓" }, Pr = {
  open: "open",
  prog: "in flight",
  gate: "gated",
  blk: "blocked"
};
function zr({
  item: e,
  pendingLine: n,
  onToggle: t,
  onVerdict: r
}) {
  var l;
  const i = e.status === "open" || e.status === "done" || e.status === "gate", o = n !== null;
  return /* @__PURE__ */ F(
    "li",
    {
      className: `tlt-it tlt-${e.status}${((l = e.verdict) == null ? void 0 : l.kind) === "disputed" ? " tlt-disputed" : ""}${n === e.line0 ? " tlt-busy" : ""}`,
      style: e.depth ? { marginLeft: e.depth * 16 } : void 0,
      children: [
        i ? /* @__PURE__ */ I(
          "input",
          {
            type: "checkbox",
            className: "tlt-check",
            checked: e.status === "done",
            disabled: o,
            title: e.status === "done" ? "Reopen" : "Mark done",
            onChange: () => t(e.line0)
          }
        ) : /* @__PURE__ */ I("span", { className: "tlt-ic", children: yp[e.status] }),
        /* @__PURE__ */ F("span", { className: "tlt-tx", children: [
          e.status === "gate" ? /* @__PURE__ */ I("span", { className: "tlt-ic-inline", children: "⛔ " }) : null,
          /* @__PURE__ */ I(Ar, { text: e.text })
        ] }),
        e.verdict ? /* @__PURE__ */ I(
          "span",
          {
            className: `tlt-vchip tlt-vchip-${e.verdict.kind === "valid" ? "valid" : "disp"}`,
            title: `${e.verdict.kind === "valid" ? "Confirmed valid" : "Marked NOT TRUE"} (${e.verdict.meta})${e.verdict.note ? `: ${e.verdict.note}` : ""}`,
            children: e.verdict.kind === "valid" ? "✓ valid" : "✗ not true"
          }
        ) : null,
        /* @__PURE__ */ F("span", { className: "tlt-acts", children: [
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
              onClick: () => {
                const a = window.prompt("Why is this not true? (stored on the item)");
                a !== null && r(e.line0, "disputed", a.trim());
              },
              children: "✗"
            }
          )
        ] }),
        e.claim ? /* @__PURE__ */ F("span", { className: "tlt-claim", title: `Claimed by ${e.claim}`, children: [
          "⛓ ",
          e.claim
        ] }) : null,
        e.notes.length > 0 ? /* @__PURE__ */ F("details", { className: "tlt-notes", children: [
          /* @__PURE__ */ F("summary", { children: [
            "+",
            e.notes.length,
            " notes"
          ] }),
          /* @__PURE__ */ I("div", { className: "tlt-notes-body", children: e.notes.map((a, s) => /* @__PURE__ */ I("div", { children: /* @__PURE__ */ I(Ar, { text: a }) }, s)) })
        ] }) : null
      ]
    }
  );
}
function Lr({ label: e, lines: n }) {
  return n.length === 0 ? null : /* @__PURE__ */ F("details", { className: "tlt-extra", children: [
    /* @__PURE__ */ F("summary", { children: [
      e,
      " (",
      n.length,
      " lines)"
    ] }),
    /* @__PURE__ */ I("pre", { children: n.join(`
`) })
  ] });
}
const kp = `
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
function bp({
  content: e,
  pendingLine: n,
  onToggle: t,
  onVerdict: r,
  onInvestigate: i
}) {
  const { pre: o, sections: l } = Jt(() => dp(e), [e]), a = mp(), s = fn(null), [u, f] = ee(null), c = (p) => {
    const d = window.getSelection(), x = (d == null ? void 0 : d.toString().trim()) ?? "";
    if (x.length >= 3 && d && d.anchorNode && s.current && s.current.contains(d.anchorNode)) {
      const w = s.current.getBoundingClientRect();
      f({ x: p.clientX - w.left, y: p.clientY - w.top + 16, text: x });
    } else
      f(null);
  }, h = { open: 0, gate: 0, prog: 0, blk: 0, done: 0 };
  for (const p of l) for (const d of p.items) h[d.status]++;
  return /* @__PURE__ */ F(
    "div",
    {
      ref: s,
      className: `tlt${a ? " tlt-light" : ""}`,
      onMouseUp: c,
      children: [
        /* @__PURE__ */ I("style", { children: kp }),
        u ? /* @__PURE__ */ I(
          "button",
          {
            type: "button",
            className: "tlt-selbtn",
            style: { left: Math.max(0, u.x - 40), top: u.y },
            onMouseDown: (p) => p.preventDefault(),
            onClick: () => {
              i(u.text), f(null);
            },
            children: "⚡ New session"
          }
        ) : null,
        /* @__PURE__ */ F("div", { className: "tlt-stats", children: [
          /* @__PURE__ */ F("span", { className: "tlt-st tlt-st-open", children: [
            "● ",
            h.open,
            " open — needs action"
          ] }),
          /* @__PURE__ */ F("span", { className: "tlt-st tlt-st-prog", children: [
            "◐ ",
            h.prog,
            " in flight"
          ] }),
          /* @__PURE__ */ F("span", { className: "tlt-st tlt-st-gate", children: [
            "⛔ ",
            h.gate,
            " gated"
          ] }),
          h.blk > 0 ? /* @__PURE__ */ F("span", { className: "tlt-st tlt-st-blk", children: [
            "✕ ",
            h.blk,
            " blocked"
          ] }) : null,
          /* @__PURE__ */ F("span", { className: "tlt-st tlt-st-done", children: [
            "✓ ",
            h.done,
            " done"
          ] })
        ] }),
        /* @__PURE__ */ I(Lr, { label: "header notes", lines: o }),
        l.map((p, d) => {
          const x = p.items.filter((A) => A.status !== "done"), w = p.items.filter((A) => A.status === "done"), y = x.length > 0, E = {};
          for (const A of p.items) E[A.status] = (E[A.status] ?? 0) + 1;
          const C = w.length > 0 ? /* @__PURE__ */ I("ul", { className: "tlt-its", children: w.map((A) => /* @__PURE__ */ I(zr, { item: A, pendingLine: n, onToggle: t, onVerdict: r }, A.line0)) }) : null;
          return /* @__PURE__ */ F("details", { className: `tlt-sec ${y ? "tlt-hot" : "tlt-cold"}`, open: y, children: [
            /* @__PURE__ */ F("summary", { children: [
              /* @__PURE__ */ I("span", { className: "tlt-title", children: p.title }),
              Object.keys(Pr).map(
                (A) => E[A] ? /* @__PURE__ */ F("span", { className: `tlt-pill tlt-pill-${A}`, children: [
                  E[A],
                  " ",
                  Pr[A]
                ] }, A) : null
              ),
              w.length > 0 ? /* @__PURE__ */ I("span", { className: "tlt-pill tlt-pill-done", children: y ? `${w.length} done` : `✓ all ${w.length} done` }) : null
            ] }),
            x.length > 0 ? /* @__PURE__ */ I("ul", { className: "tlt-its", children: x.map((A) => /* @__PURE__ */ I(zr, { item: A, pendingLine: n, onToggle: t, onVerdict: r }, A.line0)) }) : null,
            w.length > 0 ? y ? /* @__PURE__ */ F("details", { className: "tlt-donefold", children: [
              /* @__PURE__ */ F("summary", { children: [
                "✓ ",
                w.length,
                " done — expand"
              ] }),
              C
            ] }) : C : null,
            /* @__PURE__ */ I(Lr, { label: "section notes", lines: p.extra })
          ] }, d);
        })
      ]
    }
  );
}
const Gi = "todo-ledger:view";
function wp() {
  try {
    return localStorage.getItem(Gi) === "doc" ? "doc" : "tree";
  } catch {
    return "tree";
  }
}
function vp({ id: e, onBack: n }) {
  const t = Dr(), r = Fr(), [i, o] = ee(null), [l, a] = ee(null), [s, u] = ee("view"), [f, c] = ee(wp), h = (z) => {
    c(z);
    try {
      localStorage.setItem(Gi, z);
    } catch {
    }
  }, [p, d] = ee(""), [x, w] = ee(!1), [y, E] = ee(null), [C, A] = ee(!1), [N, v] = ee(null), [$, Y] = ee(!1), [U, k] = ee(""), [P, L] = ee(""), [q, J] = ee(!1), O = fn(!1);
  O.current = x || y !== null;
  const K = Or(async () => {
    try {
      const z = await t.get(`${Ae}/ledgers/${e}`);
      if (O.current) return;
      o(z), a(null);
    } catch (z) {
      a(Pe(z));
    }
  }, [t, e]);
  ut(() => {
    i && !x && !y && d(i.content);
  }, [i, x, y]), ut(() => {
    K();
    const z = setInterval(() => {
      O.current || K();
    }, 5e3);
    return () => clearInterval(z);
  }, [K]), _r("update", (z) => {
    const V = z == null ? void 0 : z.id;
    (V === void 0 || V === e) && !O.current && K();
  });
  const te = async (z) => {
    if (!i || N !== null) return;
    const V = i.content.split(`
`)[z];
    if (V !== void 0) {
      v(z);
      try {
        const { status: W, data: M } = await Ye("POST", `${Ae}/ledgers/${e}/toggle`, {
          line: z,
          expected: V
        });
        if (W === 409 && M && typeof M.content == "string") {
          o((de) => de && { ...de, content: M.content, version: M.version }), r("List changed elsewhere — refreshed", { type: "info" });
          return;
        }
        if (W >= 400 || !M) {
          r(M != null && M.error ? String(M.error) : `Toggle failed (HTTP ${W})`, { type: "error" });
          return;
        }
        const { line: re, new_text: ae, ...he } = M;
        o((de) => {
          if (!de) return de;
          const Ne = de.content.split(`
`);
          return typeof re == "number" && typeof ae == "string" && (Ne[re] = ae), { ...de, ...he, content: Ne.join(`
`) };
        });
      } catch (W) {
        r(Pe(W), { type: "error" });
      } finally {
        v(null);
      }
    }
  }, ce = async (z, V, W) => {
    if (!i || N !== null || O.current) return;
    const M = i.content.split(`
`), re = M[z];
    if (!(re === void 0 || !/^\s*- \[/.test(re))) {
      v(z);
      try {
        const ae = /^(\s*)/.exec(re)[1];
        let he = z + 1;
        for (; he < M.length && M[he].trim() && M[he].startsWith(`${ae}  `); ) he++;
        const de = M.slice(z + 1, he).filter((ve) => !Xi.test(ve.trim())), Ne = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), _t = V === "valid" ? `✅ VALID (${Ne})` : `❌ NOT-TRUE (${Ne})`, gt = `${ae}  - ${_t}${W ? `: ${W}` : ""}`, Ke = [
          ...M.slice(0, z + 1),
          gt,
          ...de,
          ...M.slice(he)
        ].join(`
`), { status: Ze, data: ye } = await Ye("PUT", `${Ae}/ledgers/${e}`, {
          base_version: i.version,
          content: Ke
        });
        if (Ze === 409 && ye && typeof ye.content == "string") {
          o((ve) => ve && { ...ve, content: ye.content, version: ye.version }), r("List changed elsewhere — refreshed, try again", { type: "info" });
          return;
        }
        if (Ze >= 400 || !ye) {
          r(ye != null && ye.error ? String(ye.error) : `Verdict failed (HTTP ${Ze})`, {
            type: "error"
          });
          return;
        }
        o((ve) => ve && { ...ve, ...ye, content: Ke });
      } catch (ae) {
        r(Pe(ae), { type: "error" });
      } finally {
        v(null);
      }
    }
  }, be = async (z) => {
    var V, W;
    if (i)
      try {
        const M = z.length > 900 ? `${z.slice(0, 900)}…` : z, re = await Ye("POST", "/api/chat/slots", {
          title: `Ledger: ${M.replace(/\s+/g, " ").slice(0, 60)}`
        }), ae = (V = re.data) == null ? void 0 : V.key;
        if (re.status >= 400 || typeof ae != "string" || !ae) {
          r((W = re.data) != null && W.error ? String(re.data.error) : "Could not create session", {
            type: "error"
          });
          return;
        }
        const he = `Investigate this selected text from the todo-ledger "${i.name}" (ledger id ${e}):

${M}

Get full ledger context with: python3 ~/.meshclaw/apps/todo-ledger/cli/ledger.py get ${e}
Verify the claim(s) against real evidence (CRs, tickets, code, session history). Report findings. If the ledger item needs a status change, apply it via the CLI with the exact-line guard; otherwise leave the ledger untouched.`;
        fetch("/api/chat", {
          method: "POST",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slot: ae, message: he })
        }).catch(() => {
        }), window.open(`/chat/investigate?sid=${encodeURIComponent(ae)}`, "_blank", "noopener"), r("Investigation session started in a new tab", { type: "info" });
      } catch (M) {
        r(Pe(M), { type: "error" });
      }
  }, m = async (z) => {
    if (!(!i || C)) {
      A(!0);
      try {
        const { status: V, data: W } = await Ye("PUT", `${Ae}/ledgers/${e}`, {
          base_version: z ?? i.version,
          content: p
        });
        if (V === 409 && W && typeof W.content == "string") {
          E({ content: W.content, version: W.version });
          return;
        }
        if (V >= 400 || !W) {
          r(W != null && W.error ? String(W.error) : `Save failed (HTTP ${V})`, { type: "error" });
          return;
        }
        const M = p;
        E(null), w(!1), o((re) => re && { ...re, ...W, content: M }), u("view");
      } catch (V) {
        r(Pe(V), { type: "error" });
      } finally {
        A(!1);
      }
    }
  }, fe = () => {
    if (!y) return;
    const z = y;
    E(null), w(!1), o((V) => V && { ...V, content: z.content, version: z.version }), d(z.content);
  }, we = () => {
    i && (d(i.content), w(!1), u("edit"));
  }, g = () => {
    E(null), w(!1), i && d(i.content), u("view");
  }, pe = () => {
    !i || O.current || (k(i.name), Y(!0));
  }, Ee = async () => {
    var V, W;
    Y(!1);
    const z = U.trim();
    if (!(!i || !z || z === i.name))
      try {
        let M = await Ye("PUT", `${Ae}/ledgers/${e}`, {
          base_version: i.version,
          name: z
        });
        if (M.status === 409 && typeof ((V = M.data) == null ? void 0 : V.version) == "number" && (M = await Ye("PUT", `${Ae}/ledgers/${e}`, {
          base_version: M.data.version,
          name: z
        })), M.status >= 400 || !M.data) {
          r((W = M.data) != null && W.error ? String(M.data.error) : `Rename failed (HTTP ${M.status})`, {
            type: "error"
          });
          return;
        }
        await K();
      } catch (M) {
        r(Pe(M), { type: "error" });
      }
  }, Z = x || y !== null, Me = async () => {
    const z = P.trim();
    if (!(!z || q || Z)) {
      J(!0);
      try {
        await t.post(`${Ae}/ledgers/${e}/items`, { text: z }), L(""), await K();
      } catch (V) {
        r(Pe(V), { type: "error" });
      } finally {
        J(!1);
      }
    }
  };
  return /* @__PURE__ */ F("div", { className: "flex min-h-0 flex-1 flex-col", children: [
    /* @__PURE__ */ F("div", { className: "flex items-center gap-3 px-6 pb-3 pt-5", children: [
      /* @__PURE__ */ I(Ie, { onClick: () => {
        O.current && !window.confirm("Discard unsaved changes?") || n();
      }, title: "Back to ledgers", children: /* @__PURE__ */ I(rl, { size: 14 }) }),
      $ ? /* @__PURE__ */ I(
        Ln,
        {
          autoFocus: !0,
          value: U,
          onChange: (z) => k(z.target.value),
          onBlur: () => void Ee(),
          onKeyDown: (z) => {
            z.key === "Enter" && Ee(), z.key === "Escape" && Y(!1);
          },
          className: "max-w-xs"
        }
      ) : /* @__PURE__ */ I(
        "button",
        {
          type: "button",
          onClick: pe,
          title: Z ? "Save or cancel your edit first" : "Click to rename",
          className: "min-w-0 truncate bg-transparent text-lg font-semibold decoration-dotted underline-offset-4 hover:underline",
          children: (i == null ? void 0 : i.name) ?? "…"
        }
      ),
      i && /* @__PURE__ */ F("span", { className: "hidden shrink-0 text-xs text-muted sm:inline", children: [
        i.items_done,
        "/",
        i.items_total,
        " done · v",
        i.version,
        " · updated",
        " ",
        Br(i.updated_at)
      ] }),
      /* @__PURE__ */ I("div", { className: "ml-auto flex shrink-0 items-center gap-1.5", children: s === "edit" ? /* @__PURE__ */ F(at, { children: [
        /* @__PURE__ */ I(Ie, { onClick: g, disabled: C, children: "Cancel" }),
        /* @__PURE__ */ I(Ie, { primary: !0, onClick: () => void m(), disabled: C || !x, children: C ? "Saving…" : "Save" })
      ] }) : /* @__PURE__ */ F(at, { children: [
        /* @__PURE__ */ I(Ie, { primary: f === "tree", onClick: () => h("tree"), children: "Tree" }),
        /* @__PURE__ */ I(Ie, { primary: f === "doc", onClick: () => h("doc"), children: "Doc" }),
        /* @__PURE__ */ I(Ie, { onClick: we, disabled: !i, children: "Edit" })
      ] }) })
    ] }),
    /* @__PURE__ */ F(
      "div",
      {
        className: s === "view" ? "min-h-0 flex-1 overflow-y-auto px-6 pb-4" : "flex min-h-0 flex-1 flex-col px-6 pb-4",
        children: [
          s === "edit" && y && /* @__PURE__ */ F("div", { className: "mb-3 flex items-center gap-3 rounded border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm", children: [
            /* @__PURE__ */ I(il, { size: 16, className: "shrink-0 text-amber-500" }),
            /* @__PURE__ */ F("span", { className: "min-w-0 flex-1", children: [
              "Changed elsewhere (now v",
              y.version,
              ") — your save was rejected."
            ] }),
            /* @__PURE__ */ I(Ie, { onClick: fe, children: "Take theirs" }),
            /* @__PURE__ */ I(Ie, { danger: !0, onClick: () => void m(y.version), disabled: C, children: "Overwrite" })
          ] }),
          i ? s === "view" ? /* @__PURE__ */ I("div", { className: "max-w-3xl text-sm", children: i.content.trim() === "" ? /* @__PURE__ */ I("p", { className: "py-8 text-muted", children: "Empty ledger — add an item below." }) : f === "tree" ? /* @__PURE__ */ I(
            bp,
            {
              content: i.content,
              pendingLine: N,
              onToggle: te,
              onVerdict: ce,
              onInvestigate: be
            }
          ) : /* @__PURE__ */ I(cp, { content: i.content, pendingLine: N, onToggle: te }) }) : /* @__PURE__ */ I(
            "textarea",
            {
              value: p,
              onChange: (z) => {
                d(z.target.value), w(!0);
              },
              spellCheck: !1,
              className: "min-h-0 w-full flex-1 resize-none rounded border border-border bg-transparent p-3 font-mono text-sm outline-none focus:border-[var(--accent)]"
            }
          ) : /* @__PURE__ */ I("div", { className: "flex flex-1 items-center justify-center py-16 text-muted", children: l ? /* @__PURE__ */ F("span", { className: "text-sm", children: [
            "Failed to load: ",
            l
          ] }) : /* @__PURE__ */ I(ll, { size: 20, className: "animate-spin" }) })
        ]
      }
    ),
    /* @__PURE__ */ I("div", { className: "border-t border-border px-6 py-3", children: /* @__PURE__ */ F(
      "form",
      {
        className: "flex max-w-3xl items-center gap-2",
        onSubmit: (z) => {
          z.preventDefault(), Me();
        },
        children: [
          /* @__PURE__ */ I(Nr, { size: 14, className: "shrink-0 text-muted" }),
          /* @__PURE__ */ I(
            Ln,
            {
              value: P,
              onChange: (z) => L(z.target.value),
              placeholder: Z ? "Save or cancel your edit to add items" : "Add a todo item — Enter to append",
              disabled: Z || q || !i,
              className: "flex-1"
            }
          )
        ]
      }
    ) })
  ] });
}
function Ap() {
  const e = Dr(), n = Fr(), [t, r] = ee(null), [i, o] = ee(null), [l, a] = ee(null), s = fn(l);
  s.current = l;
  const u = Or(async () => {
    try {
      r(await e.get(`${Ae}/ledgers`)), o(null);
    } catch (d) {
      o(Pe(d));
    }
  }, [e]);
  ut(() => {
    if (l !== null) return;
    u();
    const d = setInterval(() => void u(), 5e3);
    return () => clearInterval(d);
  }, [l, u]), _r("update", () => {
    s.current === null && u();
  });
  const f = async () => {
    var x;
    const d = (x = window.prompt("New ledger name")) == null ? void 0 : x.trim();
    if (d)
      try {
        const w = await e.post(`${Ae}/ledgers`, { name: d });
        a(w.id);
      } catch (w) {
        n(Pe(w), { type: "error" });
      }
  }, c = async (d) => {
    if (window.confirm(`Delete ledger "${d.name}"? This cannot be undone.`))
      try {
        await e.del(`${Ae}/ledgers/${d.id}`), u();
      } catch (x) {
        n(Pe(x), { type: "error" });
      }
  };
  if (l !== null)
    return /* @__PURE__ */ I(
      vp,
      {
        id: l,
        onBack: () => {
          a(null), u();
        }
      }
    );
  const h = (t == null ? void 0 : t.reduce((d, x) => d + (x.items_total - x.items_done), 0)) ?? 0, p = (t == null ? void 0 : t.reduce((d, x) => d + x.items_done, 0)) ?? 0;
  return /* @__PURE__ */ F(at, { children: [
    /* @__PURE__ */ I(
      Zi,
      {
        title: "Ledgers",
        subtitle: "Shared markdown todo lists — humans and agents, one source of truth",
        actions: /* @__PURE__ */ F(Ie, { primary: !0, onClick: () => void f(), children: [
          /* @__PURE__ */ I(Nr, { size: 14, className: "mr-1 inline align-[-2px]" }),
          "New ledger"
        ] })
      }
    ),
    /* @__PURE__ */ F("div", { className: "min-h-0 flex-1 overflow-y-auto px-6 pb-8", children: [
      /* @__PURE__ */ F("div", { className: "mb-6 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5", children: [
        /* @__PURE__ */ I(Nt, { label: "Ledgers", value: t ? t.length : "…", accent: !0 }),
        /* @__PURE__ */ I(Nt, { label: "Open items", value: t ? h : "…" }),
        /* @__PURE__ */ I(Nt, { label: "Done items", value: t ? p : "…" })
      ] }),
      i && /* @__PURE__ */ F("div", { className: "mb-4 rounded border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm", children: [
        "Failed to load ledgers: ",
        i
      ] }),
      t && t.length === 0 ? /* @__PURE__ */ I(
        el,
        {
          icon: "📋",
          title: "No ledgers yet",
          subtitle: "Create one to start a shared todo list",
          action: /* @__PURE__ */ I(Ie, { primary: !0, onClick: () => void f(), children: "New ledger" })
        }
      ) : /* @__PURE__ */ I("div", { className: "grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3.5", children: (t ?? []).map((d) => /* @__PURE__ */ I(
        tl,
        {
          onClick: () => a(d.id),
          className: "cursor-pointer transition-colors hover:border-[var(--accent)]",
          children: /* @__PURE__ */ F("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ F("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ I("div", { className: "truncate font-medium", children: d.name }),
              /* @__PURE__ */ F("div", { className: "mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted", children: [
                /* @__PURE__ */ F("span", { children: [
                  d.items_done,
                  "/",
                  d.items_total,
                  " done"
                ] }),
                d.items_claimed > 0 && /* @__PURE__ */ F(nl, { variant: "warn", children: [
                  "⛓ ",
                  d.items_claimed,
                  " claimed"
                ] }),
                /* @__PURE__ */ F("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ I(ol, { size: 11 }),
                  Br(d.updated_at)
                ] })
              ] }),
              (d.pinned_sessions ?? []).length > 0 && /* @__PURE__ */ I("div", { className: "mt-2 flex flex-wrap gap-1", children: (d.pinned_sessions ?? []).map((x) => /* @__PURE__ */ F(
                "span",
                {
                  title: `Pinned to session ${x}`,
                  className: "rounded border border-border px-1.5 py-px text-[10px] text-muted",
                  children: [
                    "📌 ",
                    x.slice(0, 8)
                  ]
                },
                x
              )) })
            ] }),
            /* @__PURE__ */ I(
              "button",
              {
                type: "button",
                title: "Delete ledger",
                onClick: (x) => {
                  x.stopPropagation(), c(d);
                },
                className: "shrink-0 rounded p-1 text-muted transition-colors hover:text-red-400",
                children: /* @__PURE__ */ I(al, { size: 14 })
              }
            )
          ] })
        },
        d.id
      )) })
    ] })
  ] });
}
export {
  Ap as default
};
