import { jsxs as q, jsx as P, Fragment as pn } from "react/jsx-runtime";
import { useAppApi as br, useNotify as wr, useAppEvents as Sr } from "@kirocrew/app-sdk";
import { Btn as Ee, Input as Ct, PageHeader as qi, StatCard as vn, EmptyState as Wi, Card as Qi, Badge as Yi } from "@kirocrew/app-sdk/ui";
import { ArrowLeft as Xi, AlertTriangle as Gi, Loader2 as Ji, Plus as Cr, Clock as Ki, Trash2 as Zi } from "lucide-react";
import { createContext as Er, useState as ne, useMemo as Et, useContext as Ge, useEffect as hn, useRef as vr, useCallback as Ir } from "react";
const ve = "/api/apps/todo-ledger", el = /<!--\s*claim:(.+?)\s*-->/;
async function ln(e, t, n) {
  const r = await fetch(t, {
    method: e,
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(n)
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
function Tr(e) {
  if (e == null) return "";
  const t = typeof e == "number" ? e * 1e3 : Date.parse(e);
  if (!Number.isFinite(t)) return "";
  const n = Date.now() - t;
  if (n < 45e3) return "just now";
  const r = Math.round(n / 6e4);
  if (r < 60) return `${r}m ago`;
  const i = Math.round(r / 60);
  return i < 24 ? `${i}h ago` : `${Math.round(i / 24)}d ago`;
}
function nl(e, t) {
  const n = {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
const tl = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, rl = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, il = {};
function vt(e, t) {
  return (il.jsx ? rl : tl).test(e);
}
const ll = /[ \t\n\f\r]/g;
function ol(e) {
  return typeof e == "object" ? e.type === "text" ? It(e.value) : !1 : It(e);
}
function It(e) {
  return e.replace(ll, "") === "";
}
class Ze {
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
  constructor(t, n, r) {
    this.normal = n, this.property = t, r && (this.space = r);
  }
}
Ze.prototype.normal = {};
Ze.prototype.property = {};
Ze.prototype.space = void 0;
function Ar(e, t) {
  const n = {}, r = {};
  for (const i of e)
    Object.assign(n, i.property), Object.assign(r, i.normal);
  return new Ze(n, r, t);
}
function $n(e) {
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
  constructor(t, n) {
    this.attribute = n, this.property = t;
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
let al = 0;
const D = Ne(), K = Ne(), Hn = Ne(), C = Ne(), X = Ne(), Re = Ne(), pe = Ne();
function Ne() {
  return 2 ** ++al;
}
const Un = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: D,
  booleanish: K,
  commaOrSpaceSeparated: pe,
  commaSeparated: Re,
  number: C,
  overloadedBoolean: Hn,
  spaceSeparated: X
}, Symbol.toStringTag, { value: "Module" })), In = (
  /** @type {ReadonlyArray<keyof typeof types>} */
  Object.keys(Un)
);
class Zn extends ue {
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
  constructor(t, n, r, i) {
    let o = -1;
    if (super(t, n), Tt(this, "space", i), typeof r == "number")
      for (; ++o < In.length; ) {
        const l = In[o];
        Tt(this, In[o], (r & Un[l]) === Un[l]);
      }
  }
}
Zn.prototype.defined = !0;
function Tt(e, t, n) {
  n && (e[t] = n);
}
function $e(e) {
  const t = {}, n = {};
  for (const [r, i] of Object.entries(e.properties)) {
    const o = new Zn(
      r,
      e.transform(e.attributes || {}, r),
      i,
      e.space
    );
    e.mustUseProperty && e.mustUseProperty.includes(r) && (o.mustUseProperty = !0), t[r] = o, n[$n(r)] = r, n[$n(o.attribute)] = r;
  }
  return new Ze(t, n, e.space);
}
const Pr = $e({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: K,
    ariaAutoComplete: null,
    ariaBusy: K,
    ariaChecked: K,
    ariaColCount: C,
    ariaColIndex: C,
    ariaColSpan: C,
    ariaControls: X,
    ariaCurrent: null,
    ariaDescribedBy: X,
    ariaDetails: null,
    ariaDisabled: K,
    ariaDropEffect: X,
    ariaErrorMessage: null,
    ariaExpanded: K,
    ariaFlowTo: X,
    ariaGrabbed: K,
    ariaHasPopup: null,
    ariaHidden: K,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: X,
    ariaLevel: C,
    ariaLive: null,
    ariaModal: K,
    ariaMultiLine: K,
    ariaMultiSelectable: K,
    ariaOrientation: null,
    ariaOwns: X,
    ariaPlaceholder: null,
    ariaPosInSet: C,
    ariaPressed: K,
    ariaReadOnly: K,
    ariaRelevant: null,
    ariaRequired: K,
    ariaRoleDescription: X,
    ariaRowCount: C,
    ariaRowIndex: C,
    ariaRowSpan: C,
    ariaSelected: K,
    ariaSetSize: C,
    ariaSort: null,
    ariaValueMax: C,
    ariaValueMin: C,
    ariaValueNow: C,
    ariaValueText: null,
    role: null
  },
  transform(e, t) {
    return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
  }
});
function zr(e, t) {
  return t in e ? e[t] : t;
}
function Lr(e, t) {
  return zr(e, t.toLowerCase());
}
const ul = $e({
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
    accept: Re,
    acceptCharset: X,
    accessKey: X,
    action: null,
    allow: null,
    allowFullScreen: D,
    allowPaymentRequest: D,
    allowUserMedia: D,
    alpha: D,
    alt: null,
    as: null,
    async: D,
    autoCapitalize: null,
    autoComplete: X,
    autoFocus: D,
    autoPlay: D,
    blocking: X,
    capture: null,
    charSet: null,
    checked: D,
    cite: null,
    className: X,
    closedBy: null,
    colorSpace: null,
    cols: C,
    colSpan: C,
    command: null,
    commandFor: null,
    content: null,
    contentEditable: K,
    controls: D,
    controlsList: X,
    coords: C | Re,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: D,
    defer: D,
    dir: null,
    dirName: null,
    disabled: D,
    download: Hn,
    draggable: K,
    encType: null,
    enterKeyHint: null,
    fetchPriority: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: D,
    formTarget: null,
    headers: X,
    height: C,
    hidden: Hn,
    high: C,
    href: null,
    hrefLang: null,
    htmlFor: X,
    httpEquiv: X,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inert: D,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: D,
    itemId: null,
    itemProp: X,
    itemRef: X,
    itemScope: D,
    itemType: X,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: D,
    low: C,
    manifest: null,
    max: null,
    maxLength: C,
    media: null,
    method: null,
    min: null,
    minLength: C,
    multiple: D,
    muted: D,
    name: null,
    nonce: null,
    noModule: D,
    noValidate: D,
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
    open: D,
    optimum: C,
    pattern: null,
    ping: X,
    placeholder: null,
    playsInline: D,
    popover: null,
    popoverTarget: null,
    popoverTargetAction: null,
    poster: null,
    preload: null,
    readOnly: D,
    referrerPolicy: null,
    rel: X,
    required: D,
    reversed: D,
    rows: C,
    rowSpan: C,
    sandbox: X,
    scope: null,
    scoped: D,
    seamless: D,
    selected: D,
    shadowRootClonable: D,
    shadowRootCustomElementRegistry: D,
    shadowRootDelegatesFocus: D,
    shadowRootMode: null,
    shadowRootSerializable: D,
    shape: null,
    size: C,
    sizes: null,
    slot: null,
    span: C,
    spellCheck: K,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: C,
    step: null,
    style: null,
    tabIndex: C,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: D,
    useMap: null,
    value: K,
    width: C,
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
    border: C,
    // `<table>`. Use CSS `border-width` instead,
    borderColor: null,
    // `<table>`. Use CSS `border-color` instead,
    bottomMargin: C,
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
    compact: D,
    // Lists. Use CSS to reduce space between items instead
    declare: D,
    // `<object>`
    event: null,
    // `<script>`
    face: null,
    // `<font>`. Use CSS instead
    frame: null,
    // `<table>`
    frameBorder: null,
    // `<iframe>`. Use CSS `border` instead
    hSpace: C,
    // `<img>` and `<object>`
    leftMargin: C,
    // `<body>`
    link: null,
    // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null,
    // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null,
    // `<img>`. Use a `<picture>`
    marginHeight: C,
    // `<body>`
    marginWidth: C,
    // `<body>`
    noResize: D,
    // `<frame>`
    noHref: D,
    // `<area>`. Use no href instead of an explicit `nohref`
    noShade: D,
    // `<hr>`. Use background-color and height instead of borders
    noWrap: D,
    // `<td>` and `<th>`
    object: null,
    // `<applet>`
    profile: null,
    // `<head>`
    prompt: null,
    // `<isindex>`
    rev: null,
    // `<link>`
    rightMargin: C,
    // `<body>`
    rules: null,
    // `<table>`
    scheme: null,
    // `<meta>`
    scrolling: K,
    // `<frame>`. Use overflow in the child context
    standby: null,
    // `<object>`
    summary: null,
    // `<table>`
    text: null,
    // `<body>`. Use CSS `color` instead
    topMargin: C,
    // `<body>`
    valueType: null,
    // `<param>`
    version: null,
    // `<html>`. Use a doctype.
    vAlign: null,
    // Several. Use CSS `vertical-align` instead
    vLink: null,
    // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: C,
    // `<img>` and `<object>`
    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    credentialless: D,
    disablePictureInPicture: D,
    disableRemotePlayback: D,
    exportParts: Re,
    part: X,
    prefix: null,
    property: null,
    results: C,
    security: null,
    unselectable: null
  },
  space: "html",
  transform: Lr
}), sl = $e({
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
    about: pe,
    accentHeight: C,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: C,
    amplitude: C,
    arabicForm: null,
    ascent: C,
    attributeName: null,
    attributeType: null,
    azimuth: C,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: C,
    by: null,
    calcMode: null,
    capHeight: C,
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
    descent: C,
    diffuseConstant: C,
    direction: null,
    display: null,
    dur: null,
    divisor: C,
    dominantBaseline: null,
    download: D,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: C,
    enableBackground: null,
    end: null,
    event: null,
    exponent: C,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: C,
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
    g1: Re,
    g2: Re,
    glyphName: Re,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: C,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: C,
    horizOriginX: C,
    horizOriginY: C,
    id: null,
    ideographic: C,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: C,
    k: C,
    k1: C,
    k2: C,
    k3: C,
    k4: C,
    kernelMatrix: pe,
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
    limitingConeAngle: C,
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
    mediaSize: C,
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
    overlinePosition: C,
    overlineThickness: C,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: C,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: X,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: C,
    pointsAtY: C,
    pointsAtZ: C,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: pe,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: pe,
    rev: pe,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: pe,
    requiredFeatures: pe,
    requiredFonts: pe,
    requiredFormats: pe,
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
    specularConstant: C,
    specularExponent: C,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: C,
    strikethroughThickness: C,
    string: null,
    stroke: null,
    strokeDashArray: pe,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: C,
    strokeOpacity: C,
    strokeWidth: null,
    style: null,
    surfaceScale: C,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: pe,
    tabIndex: C,
    tableValues: null,
    target: null,
    targetX: C,
    targetY: C,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: pe,
    to: null,
    transform: null,
    transformOrigin: null,
    u1: null,
    u2: null,
    underlinePosition: C,
    underlineThickness: C,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: C,
    values: null,
    vAlphabetic: C,
    vMathematical: C,
    vectorEffect: null,
    vHanging: C,
    vIdeographic: C,
    version: null,
    vertAdvY: C,
    vertOriginX: C,
    vertOriginY: C,
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
    xHeight: C,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  },
  space: "svg",
  transform: zr
}), Dr = $e({
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
  transform(e, t) {
    return "xlink:" + t.slice(5).toLowerCase();
  }
}), Fr = $e({
  attributes: { xmlnsxlink: "xmlns:xlink" },
  properties: { xmlnsXLink: null, xmlns: null },
  space: "xmlns",
  transform: Lr
}), _r = $e({
  properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  }
}), cl = {
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
}, fl = /[A-Z]/g, At = /-[a-z]/g, pl = /^data[-\w.:]+$/i;
function hl(e, t) {
  const n = $n(t);
  let r = t, i = ue;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && pl.test(t)) {
    if (t.charAt(4) === "-") {
      const o = t.slice(5).replace(At, dl);
      r = "data" + o.charAt(0).toUpperCase() + o.slice(1);
    } else {
      const o = t.slice(4);
      if (!At.test(o)) {
        let l = o.replace(fl, ml);
        l.charAt(0) !== "-" && (l = "-" + l), t = "data" + l;
      }
    }
    i = Zn;
  }
  return new i(r, t);
}
function ml(e) {
  return "-" + e.toLowerCase();
}
function dl(e) {
  return e.charAt(1).toUpperCase();
}
const gl = Ar([Pr, ul, Dr, Fr, _r], "html"), et = Ar([Pr, sl, Dr, Fr, _r], "svg");
function yl(e) {
  return e.join(" ").trim();
}
var mn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Rr(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var nt = {}, Pt = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, xl = /\n/g, kl = /^\s*/, bl = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, wl = /^:\s*/, Sl = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, Cl = /^[;\s]*/, El = /^\s+|\s+$/g, vl = `
`, zt = "/", Lt = "*", _e = "", Il = "comment", Tl = "declaration";
function Al(e, t) {
  if (typeof e != "string")
    throw new TypeError("First argument must be a string");
  if (!e) return [];
  t = t || {};
  var n = 1, r = 1;
  function i(m) {
    var y = m.match(xl);
    y && (n += y.length);
    var S = m.lastIndexOf(vl);
    r = ~S ? m.length - S : r + m.length;
  }
  function o() {
    var m = { line: n, column: r };
    return function(y) {
      return y.position = new l(m), s(), y;
    };
  }
  function l(m) {
    this.start = m, this.end = { line: n, column: r }, this.source = t.source;
  }
  l.prototype.content = e;
  function a(m) {
    var y = new Error(
      t.source + ":" + n + ":" + r + ": " + m
    );
    if (y.reason = m, y.filename = t.source, y.line = n, y.column = r, y.source = e, !t.silent) throw y;
  }
  function u(m) {
    var y = m.exec(e);
    if (y) {
      var S = y[0];
      return i(S), e = e.slice(S.length), y;
    }
  }
  function s() {
    u(kl);
  }
  function f(m) {
    var y;
    for (m = m || []; y = c(); )
      y !== !1 && m.push(y);
    return m;
  }
  function c() {
    var m = o();
    if (!(zt != e.charAt(0) || Lt != e.charAt(1))) {
      for (var y = 2; _e != e.charAt(y) && (Lt != e.charAt(y) || zt != e.charAt(y + 1)); )
        ++y;
      if (y += 2, _e === e.charAt(y - 1))
        return a("End of comment missing");
      var S = e.slice(2, y - 2);
      return r += 2, i(S), e = e.slice(y), r += 2, m({
        type: Il,
        comment: S
      });
    }
  }
  function h() {
    var m = o(), y = u(bl);
    if (y) {
      if (c(), !u(wl)) return a("property missing ':'");
      var S = u(Sl), x = m({
        type: Tl,
        property: Dt(y[0].replace(Pt, _e)),
        value: S ? Dt(S[0].replace(Pt, _e)) : _e
      });
      return u(Cl), x;
    }
  }
  function p() {
    var m = [];
    f(m);
    for (var y; y = h(); )
      y !== !1 && (m.push(y), f(m));
    return m;
  }
  return s(), p();
}
function Dt(e) {
  return e ? e.replace(El, _e) : _e;
}
var Pl = Al, zl = mn && mn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(nt, "__esModule", { value: !0 });
nt.default = Dl;
const Ll = zl(Pl);
function Dl(e, t) {
  let n = null;
  if (!e || typeof e != "string")
    return n;
  const r = (0, Ll.default)(e), i = typeof t == "function";
  return r.forEach((o) => {
    if (o.type !== "declaration")
      return;
    const { property: l, value: a } = o;
    i ? t(l, a, o) : a && (n = n || {}, n[l] = a);
  }), n;
}
var kn = {};
Object.defineProperty(kn, "__esModule", { value: !0 });
kn.camelCase = void 0;
var Fl = /^--[a-zA-Z0-9_-]+$/, _l = /-([a-z])/g, Rl = /^[^-]+$/, Ol = /^-(webkit|moz|ms|o|khtml)-/, Nl = /^-(ms)-/, Ml = function(e) {
  return !e || Rl.test(e) || Fl.test(e);
}, Bl = function(e, t) {
  return t.toUpperCase();
}, Ft = function(e, t) {
  return "".concat(t, "-");
}, jl = function(e, t) {
  return t === void 0 && (t = {}), Ml(e) ? e : (e = e.toLowerCase(), t.reactCompat ? e = e.replace(Nl, Ft) : e = e.replace(Ol, Ft), e.replace(_l, Bl));
};
kn.camelCase = jl;
var $l = mn && mn.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, Hl = $l(nt), Ul = kn;
function Vn(e, t) {
  var n = {};
  return !e || typeof e != "string" || (0, Hl.default)(e, function(r, i) {
    r && i && (n[(0, Ul.camelCase)(r, t)] = i);
  }), n;
}
Vn.default = Vn;
var Vl = Vn;
const ql = /* @__PURE__ */ Rr(Vl), Or = Nr("end"), tt = Nr("start");
function Nr(e) {
  return t;
  function t(n) {
    const r = n && n.position && n.position[e] || {};
    if (typeof r.line == "number" && r.line > 0 && typeof r.column == "number" && r.column > 0)
      return {
        line: r.line,
        column: r.column,
        offset: typeof r.offset == "number" && r.offset > -1 ? r.offset : void 0
      };
  }
}
function Wl(e) {
  const t = tt(e), n = Or(e);
  if (t && n)
    return { start: t, end: n };
}
function Qe(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? _t(e.position) : "start" in e || "end" in e ? _t(e) : "line" in e || "column" in e ? qn(e) : "";
}
function qn(e) {
  return Rt(e && e.line) + ":" + Rt(e && e.column);
}
function _t(e) {
  return qn(e && e.start) + "-" + qn(e && e.end);
}
function Rt(e) {
  return e && typeof e == "number" ? e : 1;
}
class ie extends Error {
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
  constructor(t, n, r) {
    super(), typeof n == "string" && (r = n, n = void 0);
    let i = "", o = {}, l = !1;
    if (n && ("line" in n && "column" in n ? o = { place: n } : "start" in n && "end" in n ? o = { place: n } : "type" in n ? o = {
      ancestors: [n],
      place: n.position
    } : o = { ...n }), typeof t == "string" ? i = t : !o.cause && t && (l = !0, i = t.message, o.cause = t), !o.ruleId && !o.source && typeof r == "string") {
      const u = r.indexOf(":");
      u === -1 ? o.ruleId = r : (o.source = r.slice(0, u), o.ruleId = r.slice(u + 1));
    }
    if (!o.place && o.ancestors && o.ancestors) {
      const u = o.ancestors[o.ancestors.length - 1];
      u && (o.place = u.position);
    }
    const a = o.place && "start" in o.place ? o.place.start : o.place;
    this.ancestors = o.ancestors || void 0, this.cause = o.cause || void 0, this.column = a ? a.column : void 0, this.fatal = void 0, this.file = "", this.message = i, this.line = a ? a.line : void 0, this.name = Qe(o.place) || "1:1", this.place = o.place || void 0, this.reason = this.message, this.ruleId = o.ruleId || void 0, this.source = o.source || void 0, this.stack = l && o.cause && typeof o.cause.stack == "string" ? o.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
ie.prototype.file = "";
ie.prototype.name = "";
ie.prototype.reason = "";
ie.prototype.message = "";
ie.prototype.stack = "";
ie.prototype.column = void 0;
ie.prototype.line = void 0;
ie.prototype.ancestors = void 0;
ie.prototype.cause = void 0;
ie.prototype.fatal = void 0;
ie.prototype.place = void 0;
ie.prototype.ruleId = void 0;
ie.prototype.source = void 0;
const rt = {}.hasOwnProperty, Ql = /* @__PURE__ */ new Map(), Yl = /[A-Z]/g, Xl = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), Gl = /* @__PURE__ */ new Set(["td", "th"]), Mr = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function Jl(e, t) {
  if (!t || t.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = lo(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = io(n, t.jsx, t.jsxs);
  }
  const i = {
    Fragment: t.Fragment,
    ancestors: [],
    components: t.components || {},
    create: r,
    elementAttributeNameCase: t.elementAttributeNameCase || "react",
    evaluater: t.createEvaluater ? t.createEvaluater() : void 0,
    filePath: n,
    ignoreInvalidStyle: t.ignoreInvalidStyle || !1,
    passKeys: t.passKeys !== !1,
    passNode: t.passNode || !1,
    schema: t.space === "svg" ? et : gl,
    stylePropertyNameCase: t.stylePropertyNameCase || "dom",
    tableCellAlignToStyle: t.tableCellAlignToStyle !== !1
  }, o = Br(i, e, void 0);
  return o && typeof o != "string" ? o : i.create(
    e,
    i.Fragment,
    { children: o || void 0 },
    void 0
  );
}
function Br(e, t, n) {
  if (t.type === "element")
    return Kl(e, t, n);
  if (t.type === "mdxFlowExpression" || t.type === "mdxTextExpression")
    return Zl(e, t);
  if (t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement")
    return no(e, t, n);
  if (t.type === "mdxjsEsm")
    return eo(e, t);
  if (t.type === "root")
    return to(e, t, n);
  if (t.type === "text")
    return ro(e, t);
}
function Kl(e, t, n) {
  const r = e.schema;
  let i = r;
  t.tagName.toLowerCase() === "svg" && r.space === "html" && (i = et, e.schema = i), e.ancestors.push(t);
  const o = $r(e, t.tagName, !1), l = oo(e, t);
  let a = lt(e, t);
  return Xl.has(t.tagName) && (a = a.filter(function(u) {
    return typeof u == "string" ? !ol(u) : !0;
  })), jr(e, l, o, t), it(l, a), e.ancestors.pop(), e.schema = r, e.create(t, o, l, n);
}
function Zl(e, t) {
  if (t.data && t.data.estree && e.evaluater) {
    const r = t.data.estree.body[0];
    return r.type, /** @type {Child | undefined} */
    e.evaluater.evaluateExpression(r.expression);
  }
  Je(e, t.position);
}
function eo(e, t) {
  if (t.data && t.data.estree && e.evaluater)
    return (
      /** @type {Child | undefined} */
      e.evaluater.evaluateProgram(t.data.estree)
    );
  Je(e, t.position);
}
function no(e, t, n) {
  const r = e.schema;
  let i = r;
  t.name === "svg" && r.space === "html" && (i = et, e.schema = i), e.ancestors.push(t);
  const o = t.name === null ? e.Fragment : $r(e, t.name, !0), l = ao(e, t), a = lt(e, t);
  return jr(e, l, o, t), it(l, a), e.ancestors.pop(), e.schema = r, e.create(t, o, l, n);
}
function to(e, t, n) {
  const r = {};
  return it(r, lt(e, t)), e.create(t, e.Fragment, r, n);
}
function ro(e, t) {
  return t.value;
}
function jr(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function it(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function io(e, t, n) {
  return r;
  function r(i, o, l, a) {
    const s = Array.isArray(l.children) ? n : t;
    return a ? s(o, l, a) : s(o, l);
  }
}
function lo(e, t) {
  return n;
  function n(r, i, o, l) {
    const a = Array.isArray(o.children), u = tt(r);
    return t(
      i,
      o,
      l,
      a,
      {
        columnNumber: u ? u.column - 1 : void 0,
        fileName: e,
        lineNumber: u ? u.line : void 0
      },
      void 0
    );
  }
}
function oo(e, t) {
  const n = {};
  let r, i;
  for (i in t.properties)
    if (i !== "children" && rt.call(t.properties, i)) {
      const o = uo(e, i, t.properties[i]);
      if (o) {
        const [l, a] = o;
        e.tableCellAlignToStyle && l === "align" && typeof a == "string" && Gl.has(t.tagName) ? r = a : n[l] = a;
      }
    }
  if (r) {
    const o = (
      /** @type {Style} */
      n.style || (n.style = {})
    );
    o[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
  }
  return n;
}
function ao(e, t) {
  const n = {};
  for (const r of t.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const o = r.data.estree.body[0];
        o.type;
        const l = o.expression;
        l.type;
        const a = l.properties[0];
        a.type, Object.assign(
          n,
          e.evaluater.evaluateExpression(a.argument)
        );
      } else
        Je(e, t.position);
    else {
      const i = r.name;
      let o;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const a = r.value.data.estree.body[0];
          a.type, o = e.evaluater.evaluateExpression(a.expression);
        } else
          Je(e, t.position);
      else
        o = r.value === null ? !0 : r.value;
      n[i] = /** @type {Props[keyof Props]} */
      o;
    }
  return n;
}
function lt(e, t) {
  const n = [];
  let r = -1;
  const i = e.passKeys ? /* @__PURE__ */ new Map() : Ql;
  for (; ++r < t.children.length; ) {
    const o = t.children[r];
    let l;
    if (e.passKeys) {
      const u = o.type === "element" ? o.tagName : o.type === "mdxJsxFlowElement" || o.type === "mdxJsxTextElement" ? o.name : void 0;
      if (u) {
        const s = i.get(u) || 0;
        l = u + "-" + s, i.set(u, s + 1);
      }
    }
    const a = Br(e, o, l);
    a !== void 0 && n.push(a);
  }
  return n;
}
function uo(e, t, n) {
  const r = hl(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? nl(n) : yl(n)), r.property === "style") {
      let i = typeof n == "object" ? n : so(e, String(n));
      return e.stylePropertyNameCase === "css" && (i = co(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space ? cl[r.property] || r.property : r.attribute,
      n
    ];
  }
}
function so(e, t) {
  try {
    return ql(t, { reactCompat: !0 });
  } catch (n) {
    if (e.ignoreInvalidStyle)
      return {};
    const r = (
      /** @type {Error} */
      n
    ), i = new ie("Cannot parse `style` attribute", {
      ancestors: e.ancestors,
      cause: r,
      ruleId: "style",
      source: "hast-util-to-jsx-runtime"
    });
    throw i.file = e.filePath || void 0, i.url = Mr + "#cannot-parse-style-attribute", i;
  }
}
function $r(e, t, n) {
  let r;
  if (!n)
    r = { type: "Literal", value: t };
  else if (t.includes(".")) {
    const i = t.split(".");
    let o = -1, l;
    for (; ++o < i.length; ) {
      const a = vt(i[o]) ? { type: "Identifier", name: i[o] } : { type: "Literal", value: i[o] };
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
    r = vt(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  if (r.type === "Literal") {
    const i = (
      /** @type {string | number} */
      r.value
    );
    return rt.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater)
    return e.evaluater.evaluateExpression(r);
  Je(e);
}
function Je(e, t) {
  const n = new ie(
    "Cannot handle MDX estrees without `createEvaluater`",
    {
      ancestors: e.ancestors,
      place: t,
      ruleId: "mdx-estree",
      source: "hast-util-to-jsx-runtime"
    }
  );
  throw n.file = e.filePath || void 0, n.url = Mr + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function co(e) {
  const t = {};
  let n;
  for (n in e)
    rt.call(e, n) && (t[fo(n)] = e[n]);
  return t;
}
function fo(e) {
  let t = e.replace(Yl, po);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function po(e) {
  return "-" + e.toLowerCase();
}
const Tn = {
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
}, ho = {};
function ot(e, t) {
  const n = ho, r = typeof n.includeImageAlt == "boolean" ? n.includeImageAlt : !0, i = typeof n.includeHtml == "boolean" ? n.includeHtml : !0;
  return Hr(e, r, i);
}
function Hr(e, t, n) {
  if (mo(e)) {
    if ("value" in e)
      return e.type === "html" && !n ? "" : e.value;
    if (t && "alt" in e && e.alt)
      return e.alt;
    if ("children" in e)
      return Ot(e.children, t, n);
  }
  return Array.isArray(e) ? Ot(e, t, n) : "";
}
function Ot(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; )
    r[i] = Hr(e[i], t, n);
  return r.join("");
}
function mo(e) {
  return !!(e && typeof e == "object");
}
const Nt = document.createElement("i");
function at(e) {
  const t = "&" + e + ";";
  Nt.innerHTML = t;
  const n = Nt.textContent;
  return n.charCodeAt(n.length - 1) === 59 && e !== "semi" || n === t ? !1 : n;
}
function he(e, t, n, r) {
  const i = e.length;
  let o = 0, l;
  if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4)
    l = Array.from(r), l.unshift(t, n), e.splice(...l);
  else
    for (n && e.splice(t, n); o < r.length; )
      l = r.slice(o, o + 1e4), l.unshift(t, 0), e.splice(...l), o += 1e4, t += 1e4;
}
function me(e, t) {
  return e.length > 0 ? (he(e, e.length, 0, t), e) : t;
}
const Mt = {}.hasOwnProperty;
function Ur(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    go(t, e[n]);
  return t;
}
function go(e, t) {
  let n;
  for (n in t) {
    const i = (Mt.call(e, n) ? e[n] : void 0) || (e[n] = {}), o = t[n];
    let l;
    if (o)
      for (l in o) {
        Mt.call(i, l) || (i[l] = []);
        const a = o[l];
        yo(
          // @ts-expect-error Looks like a list.
          i[l],
          Array.isArray(a) ? a : a ? [a] : []
        );
      }
  }
}
function yo(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  he(e, 0, 0, r);
}
function Vr(e, t) {
  const n = Number.parseInt(e, t);
  return (
    // C0 except for HT, LF, FF, CR, space.
    n < 9 || n === 11 || n > 13 && n < 32 || // Control character (DEL) of C0, and C1 controls.
    n > 126 && n < 160 || // Lone high surrogates and low surrogates.
    n > 55295 && n < 57344 || // Noncharacters.
    n > 64975 && n < 65008 || /* eslint-disable no-bitwise */
    (n & 65535) === 65535 || (n & 65535) === 65534 || /* eslint-enable no-bitwise */
    // Out of range
    n > 1114111 ? "�" : String.fromCodePoint(n)
  );
}
function xe(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const oe = ze(/[A-Za-z]/), re = ze(/[\dA-Za-z]/), xo = ze(/[#-'*+\--9=?A-Z^-~]/);
function dn(e) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    e !== null && (e < 32 || e === 127)
  );
}
const Wn = ze(/\d/), ko = ze(/[\dA-Fa-f]/), bo = ze(/[!-/:-@[-`{-~]/);
function z(e) {
  return e !== null && e < -2;
}
function G(e) {
  return e !== null && (e < 0 || e === 32);
}
function N(e) {
  return e === -2 || e === -1 || e === 32;
}
const bn = ze(new RegExp("\\p{P}|\\p{S}", "u")), Oe = ze(/\s/);
function ze(e) {
  return t;
  function t(n) {
    return n !== null && n > -1 && e.test(String.fromCharCode(n));
  }
}
function He(e) {
  const t = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < e.length; ) {
    const o = e.charCodeAt(n);
    let l = "";
    if (o === 37 && re(e.charCodeAt(n + 1)) && re(e.charCodeAt(n + 2)))
      i = 2;
    else if (o < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(o)) || (l = String.fromCharCode(o));
    else if (o > 55295 && o < 57344) {
      const a = e.charCodeAt(n + 1);
      o < 56320 && a > 56319 && a < 57344 ? (l = String.fromCharCode(o, a), i = 1) : l = "�";
    } else
      l = String.fromCharCode(o);
    l && (t.push(e.slice(r, n), encodeURIComponent(l)), r = n + i + 1, l = ""), i && (n += i, i = 0);
  }
  return t.join("") + e.slice(r);
}
function H(e, t, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let o = 0;
  return l;
  function l(u) {
    return N(u) ? (e.enter(n), a(u)) : t(u);
  }
  function a(u) {
    return N(u) && o++ < i ? (e.consume(u), a) : (e.exit(n), t(u));
  }
}
const wo = {
  tokenize: So
};
function So(e) {
  const t = e.attempt(this.parser.constructs.contentInitial, r, i);
  let n;
  return t;
  function r(a) {
    if (a === null) {
      e.consume(a);
      return;
    }
    return e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), H(e, t, "linePrefix");
  }
  function i(a) {
    return e.enter("paragraph"), o(a);
  }
  function o(a) {
    const u = e.enter("chunkText", {
      contentType: "text",
      previous: n
    });
    return n && (n.next = u), n = u, l(a);
  }
  function l(a) {
    if (a === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(a);
      return;
    }
    return z(a) ? (e.consume(a), e.exit("chunkText"), o) : (e.consume(a), l);
  }
}
const Co = {
  tokenize: Eo
}, Bt = {
  tokenize: vo
};
function Eo(e) {
  const t = this, n = [];
  let r = 0, i, o, l;
  return a;
  function a(E) {
    if (r < n.length) {
      const R = n[r];
      return t.containerState = R[1], e.attempt(R[0].continuation, u, s)(E);
    }
    return s(E);
  }
  function u(E) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && I();
      const R = t.events.length;
      let _ = R, w;
      for (; _--; )
        if (t.events[_][0] === "exit" && t.events[_][1].type === "chunkFlow") {
          w = t.events[_][1].end;
          break;
        }
      x(r);
      let M = R;
      for (; M < t.events.length; )
        t.events[M][1].end = {
          ...w
        }, M++;
      return he(t.events, _ + 1, 0, t.events.slice(R)), t.events.length = M, s(E);
    }
    return a(E);
  }
  function s(E) {
    if (r === n.length) {
      if (!i)
        return h(E);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return m(E);
      t.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(Bt, f, c)(E);
  }
  function f(E) {
    return i && I(), x(r), h(E);
  }
  function c(E) {
    return t.parser.lazy[t.now().line] = r !== n.length, l = t.now().offset, m(E);
  }
  function h(E) {
    return t.containerState = {}, e.attempt(Bt, p, m)(E);
  }
  function p(E) {
    return r++, n.push([t.currentConstruct, t.containerState]), h(E);
  }
  function m(E) {
    if (E === null) {
      i && I(), x(0), e.consume(E);
      return;
    }
    return i = i || t.parser.flow(t.now()), e.enter("chunkFlow", {
      _tokenizer: i,
      contentType: "flow",
      previous: o
    }), y(E);
  }
  function y(E) {
    if (E === null) {
      S(e.exit("chunkFlow"), !0), x(0), e.consume(E);
      return;
    }
    return z(E) ? (e.consume(E), S(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, a) : (e.consume(E), y);
  }
  function S(E, R) {
    const _ = t.sliceStream(E);
    if (R && _.push(null), E.previous = o, o && (o.next = E), o = E, i.defineSkip(E.start), i.write(_), t.parser.lazy[E.start.line]) {
      let w = i.events.length;
      for (; w--; )
        if (
          // The token starts before the line ending…
          i.events[w][1].start.offset < l && // …and either is not ended yet…
          (!i.events[w][1].end || // …or ends after it.
          i.events[w][1].end.offset > l)
        )
          return;
      const M = t.events.length;
      let W = M, U, k;
      for (; W--; )
        if (t.events[W][0] === "exit" && t.events[W][1].type === "chunkFlow") {
          if (U) {
            k = t.events[W][1].end;
            break;
          }
          U = !0;
        }
      for (x(r), w = M; w < t.events.length; )
        t.events[w][1].end = {
          ...k
        }, w++;
      he(t.events, W + 1, 0, t.events.slice(M)), t.events.length = w;
    }
  }
  function x(E) {
    let R = n.length;
    for (; R-- > E; ) {
      const _ = n[R];
      t.containerState = _[1], _[0].exit.call(t, e);
    }
    n.length = E;
  }
  function I() {
    i.write([null]), o = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function vo(e, t, n) {
  return H(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function je(e) {
  if (e === null || G(e) || Oe(e))
    return 1;
  if (bn(e))
    return 2;
}
function wn(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const o = e[i].resolveAll;
    o && !r.includes(o) && (t = o(t, n), r.push(o));
  }
  return t;
}
const Qn = {
  name: "attention",
  resolveAll: Io,
  tokenize: To
};
function Io(e, t) {
  let n = -1, r, i, o, l, a, u, s, f;
  for (; ++n < e.length; )
    if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
      for (r = n; r--; )
        if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && // If the markers are the same:
        t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
          if ((e[r][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3))
            continue;
          u = e[r][1].end.offset - e[r][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
          const c = {
            ...e[r][1].end
          }, h = {
            ...e[n][1].start
          };
          jt(c, -u), jt(h, u), l = {
            type: u > 1 ? "strongSequence" : "emphasisSequence",
            start: c,
            end: {
              ...e[r][1].end
            }
          }, a = {
            type: u > 1 ? "strongSequence" : "emphasisSequence",
            start: {
              ...e[n][1].start
            },
            end: h
          }, o = {
            type: u > 1 ? "strongText" : "emphasisText",
            start: {
              ...e[r][1].end
            },
            end: {
              ...e[n][1].start
            }
          }, i = {
            type: u > 1 ? "strong" : "emphasis",
            start: {
              ...l.start
            },
            end: {
              ...a.end
            }
          }, e[r][1].end = {
            ...l.start
          }, e[n][1].start = {
            ...a.end
          }, s = [], e[r][1].end.offset - e[r][1].start.offset && (s = me(s, [["enter", e[r][1], t], ["exit", e[r][1], t]])), s = me(s, [["enter", i, t], ["enter", l, t], ["exit", l, t], ["enter", o, t]]), s = me(s, wn(t.parser.constructs.insideSpan.null, e.slice(r + 1, n), t)), s = me(s, [["exit", o, t], ["enter", a, t], ["exit", a, t], ["exit", i, t]]), e[n][1].end.offset - e[n][1].start.offset ? (f = 2, s = me(s, [["enter", e[n][1], t], ["exit", e[n][1], t]])) : f = 0, he(e, r - 1, n - r + 3, s), n = r + s.length - f - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function To(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = je(r);
  let o;
  return l;
  function l(u) {
    return o = u, e.enter("attentionSequence"), a(u);
  }
  function a(u) {
    if (u === o)
      return e.consume(u), a;
    const s = e.exit("attentionSequence"), f = je(u), c = !f || f === 2 && i || n.includes(u), h = !i || i === 2 && f || n.includes(r);
    return s._open = !!(o === 42 ? c : c && (i || !h)), s._close = !!(o === 42 ? h : h && (f || !c)), t(u);
  }
}
function jt(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const Ao = {
  name: "autolink",
  tokenize: Po
};
function Po(e, t, n) {
  let r = 0;
  return i;
  function i(p) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), o;
  }
  function o(p) {
    return oe(p) ? (e.consume(p), l) : p === 64 ? n(p) : s(p);
  }
  function l(p) {
    return p === 43 || p === 45 || p === 46 || re(p) ? (r = 1, a(p)) : s(p);
  }
  function a(p) {
    return p === 58 ? (e.consume(p), r = 0, u) : (p === 43 || p === 45 || p === 46 || re(p)) && r++ < 32 ? (e.consume(p), a) : (r = 0, s(p));
  }
  function u(p) {
    return p === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), t) : p === null || p === 32 || p === 60 || dn(p) ? n(p) : (e.consume(p), u);
  }
  function s(p) {
    return p === 64 ? (e.consume(p), f) : xo(p) ? (e.consume(p), s) : n(p);
  }
  function f(p) {
    return re(p) ? c(p) : n(p);
  }
  function c(p) {
    return p === 46 ? (e.consume(p), r = 0, f) : p === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(p), e.exit("autolinkMarker"), e.exit("autolink"), t) : h(p);
  }
  function h(p) {
    if ((p === 45 || re(p)) && r++ < 63) {
      const m = p === 45 ? h : c;
      return e.consume(p), m;
    }
    return n(p);
  }
}
const en = {
  partial: !0,
  tokenize: zo
};
function zo(e, t, n) {
  return r;
  function r(o) {
    return N(o) ? H(e, i, "linePrefix")(o) : i(o);
  }
  function i(o) {
    return o === null || z(o) ? t(o) : n(o);
  }
}
const qr = {
  continuation: {
    tokenize: Do
  },
  exit: Fo,
  name: "blockQuote",
  tokenize: Lo
};
function Lo(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    if (l === 62) {
      const a = r.containerState;
      return a.open || (e.enter("blockQuote", {
        _container: !0
      }), a.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(l), e.exit("blockQuoteMarker"), o;
    }
    return n(l);
  }
  function o(l) {
    return N(l) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(l), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(l));
  }
}
function Do(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return N(l) ? H(e, o, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(l) : o(l);
  }
  function o(l) {
    return e.attempt(qr, t, n)(l);
  }
}
function Fo(e) {
  e.exit("blockQuote");
}
const Wr = {
  name: "characterEscape",
  tokenize: _o
};
function _o(e, t, n) {
  return r;
  function r(o) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(o), e.exit("escapeMarker"), i;
  }
  function i(o) {
    return bo(o) ? (e.enter("characterEscapeValue"), e.consume(o), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(o);
  }
}
const Qr = {
  name: "characterReference",
  tokenize: Ro
};
function Ro(e, t, n) {
  const r = this;
  let i = 0, o, l;
  return a;
  function a(c) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(c), e.exit("characterReferenceMarker"), u;
  }
  function u(c) {
    return c === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(c), e.exit("characterReferenceMarkerNumeric"), s) : (e.enter("characterReferenceValue"), o = 31, l = re, f(c));
  }
  function s(c) {
    return c === 88 || c === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(c), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), o = 6, l = ko, f) : (e.enter("characterReferenceValue"), o = 7, l = Wn, f(c));
  }
  function f(c) {
    if (c === 59 && i) {
      const h = e.exit("characterReferenceValue");
      return l === re && !at(r.sliceSerialize(h)) ? n(c) : (e.enter("characterReferenceMarker"), e.consume(c), e.exit("characterReferenceMarker"), e.exit("characterReference"), t);
    }
    return l(c) && i++ < o ? (e.consume(c), f) : n(c);
  }
}
const $t = {
  partial: !0,
  tokenize: No
}, Ht = {
  concrete: !0,
  name: "codeFenced",
  tokenize: Oo
};
function Oo(e, t, n) {
  const r = this, i = {
    partial: !0,
    tokenize: _
  };
  let o = 0, l = 0, a;
  return u;
  function u(w) {
    return s(w);
  }
  function s(w) {
    const M = r.events[r.events.length - 1];
    return o = M && M[1].type === "linePrefix" ? M[2].sliceSerialize(M[1], !0).length : 0, a = w, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), f(w);
  }
  function f(w) {
    return w === a ? (l++, e.consume(w), f) : l < 3 ? n(w) : (e.exit("codeFencedFenceSequence"), N(w) ? H(e, c, "whitespace")(w) : c(w));
  }
  function c(w) {
    return w === null || z(w) ? (e.exit("codeFencedFence"), r.interrupt ? t(w) : e.check($t, y, R)(w)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), h(w));
  }
  function h(w) {
    return w === null || z(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), c(w)) : N(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), H(e, p, "whitespace")(w)) : w === 96 && w === a ? n(w) : (e.consume(w), h);
  }
  function p(w) {
    return w === null || z(w) ? c(w) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), m(w));
  }
  function m(w) {
    return w === null || z(w) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), c(w)) : w === 96 && w === a ? n(w) : (e.consume(w), m);
  }
  function y(w) {
    return e.attempt(i, R, S)(w);
  }
  function S(w) {
    return e.enter("lineEnding"), e.consume(w), e.exit("lineEnding"), x;
  }
  function x(w) {
    return o > 0 && N(w) ? H(e, I, "linePrefix", o + 1)(w) : I(w);
  }
  function I(w) {
    return w === null || z(w) ? e.check($t, y, R)(w) : (e.enter("codeFlowValue"), E(w));
  }
  function E(w) {
    return w === null || z(w) ? (e.exit("codeFlowValue"), I(w)) : (e.consume(w), E);
  }
  function R(w) {
    return e.exit("codeFenced"), t(w);
  }
  function _(w, M, W) {
    let U = 0;
    return k;
    function k(B) {
      return w.enter("lineEnding"), w.consume(B), w.exit("lineEnding"), A;
    }
    function A(B) {
      return w.enter("codeFencedFence"), N(B) ? H(w, T, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(B) : T(B);
    }
    function T(B) {
      return B === a ? (w.enter("codeFencedFenceSequence"), $(B)) : W(B);
    }
    function $(B) {
      return B === a ? (U++, w.consume(B), $) : U >= l ? (w.exit("codeFencedFenceSequence"), N(B) ? H(w, J, "whitespace")(B) : J(B)) : W(B);
    }
    function J(B) {
      return B === null || z(B) ? (w.exit("codeFencedFence"), M(B)) : W(B);
    }
  }
}
function No(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return l === null ? n(l) : (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), o);
  }
  function o(l) {
    return r.parser.lazy[r.now().line] ? n(l) : t(l);
  }
}
const An = {
  name: "codeIndented",
  tokenize: Bo
}, Mo = {
  partial: !0,
  tokenize: jo
};
function Bo(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return e.enter("codeIndented"), H(e, o, "linePrefix", 5)(s);
  }
  function o(s) {
    const f = r.events[r.events.length - 1];
    return f && f[1].type === "linePrefix" && f[2].sliceSerialize(f[1], !0).length >= 4 ? l(s) : n(s);
  }
  function l(s) {
    return s === null ? u(s) : z(s) ? e.attempt(Mo, l, u)(s) : (e.enter("codeFlowValue"), a(s));
  }
  function a(s) {
    return s === null || z(s) ? (e.exit("codeFlowValue"), l(s)) : (e.consume(s), a);
  }
  function u(s) {
    return e.exit("codeIndented"), t(s);
  }
}
function jo(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return r.parser.lazy[r.now().line] ? n(l) : z(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), i) : H(e, o, "linePrefix", 5)(l);
  }
  function o(l) {
    const a = r.events[r.events.length - 1];
    return a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(l) : z(l) ? i(l) : n(l);
  }
}
const $o = {
  name: "codeText",
  previous: Uo,
  resolve: Ho,
  tokenize: Vo
};
function Ho(e) {
  let t = e.length - 4, n = 3, r, i;
  if ((e[n][1].type === "lineEnding" || e[n][1].type === "space") && (e[t][1].type === "lineEnding" || e[t][1].type === "space")) {
    for (r = n; ++r < t; )
      if (e[r][1].type === "codeTextData") {
        e[n][1].type = "codeTextPadding", e[t][1].type = "codeTextPadding", n += 2, t -= 2;
        break;
      }
  }
  for (r = n - 1, t++; ++r <= t; )
    i === void 0 ? r !== t && e[r][1].type !== "lineEnding" && (i = r) : (r === t || e[r][1].type === "lineEnding") && (e[i][1].type = "codeTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), t -= r - i - 2, r = i + 2), i = void 0);
  return e;
}
function Uo(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function Vo(e, t, n) {
  let r = 0, i, o;
  return l;
  function l(c) {
    return e.enter("codeText"), e.enter("codeTextSequence"), a(c);
  }
  function a(c) {
    return c === 96 ? (e.consume(c), r++, a) : (e.exit("codeTextSequence"), u(c));
  }
  function u(c) {
    return c === null ? n(c) : c === 32 ? (e.enter("space"), e.consume(c), e.exit("space"), u) : c === 96 ? (o = e.enter("codeTextSequence"), i = 0, f(c)) : z(c) ? (e.enter("lineEnding"), e.consume(c), e.exit("lineEnding"), u) : (e.enter("codeTextData"), s(c));
  }
  function s(c) {
    return c === null || c === 32 || c === 96 || z(c) ? (e.exit("codeTextData"), u(c)) : (e.consume(c), s);
  }
  function f(c) {
    return c === 96 ? (e.consume(c), i++, f) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(c)) : (o.type = "codeTextData", s(c));
  }
}
class qo {
  /**
   * @param {ReadonlyArray<T> | null | undefined} [initial]
   *   Initial items (optional).
   * @returns
   *   Splice buffer.
   */
  constructor(t) {
    this.left = t ? [...t] : [], this.right = [];
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
  get(t) {
    if (t < 0 || t >= this.left.length + this.right.length)
      throw new RangeError("Cannot access index `" + t + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return t < this.left.length ? this.left[t] : this.right[this.right.length - t + this.left.length - 1];
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
  slice(t, n) {
    const r = n ?? Number.POSITIVE_INFINITY;
    return r < this.left.length ? this.left.slice(t, r) : t > this.left.length ? this.right.slice(this.right.length - r + this.left.length, this.right.length - t + this.left.length).reverse() : this.left.slice(t).concat(this.right.slice(this.right.length - r + this.left.length).reverse());
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
  splice(t, n, r) {
    const i = n || 0;
    this.setCursor(Math.trunc(t));
    const o = this.right.splice(this.right.length - i, Number.POSITIVE_INFINITY);
    return r && qe(this.left, r), o.reverse();
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
  push(t) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(t);
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
  pushMany(t) {
    this.setCursor(Number.POSITIVE_INFINITY), qe(this.left, t);
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
  unshift(t) {
    this.setCursor(0), this.right.push(t);
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
  unshiftMany(t) {
    this.setCursor(0), qe(this.right, t.reverse());
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
  setCursor(t) {
    if (!(t === this.left.length || t > this.left.length && this.right.length === 0 || t < 0 && this.left.length === 0))
      if (t < this.left.length) {
        const n = this.left.splice(t, Number.POSITIVE_INFINITY);
        qe(this.right, n.reverse());
      } else {
        const n = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
        qe(this.left, n.reverse());
      }
  }
}
function qe(e, t) {
  let n = 0;
  if (t.length < 1e4)
    e.push(...t);
  else
    for (; n < t.length; )
      e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
function Yr(e) {
  const t = {};
  let n = -1, r, i, o, l, a, u, s;
  const f = new qo(e);
  for (; ++n < f.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = f.get(n), n && r[1].type === "chunkFlow" && f.get(n - 1)[1].type === "listItemPrefix" && (u = r[1]._tokenizer.events, o = 0, o < u.length && u[o][1].type === "lineEndingBlank" && (o += 2), o < u.length && u[o][1].type === "content"))
      for (; ++o < u.length && u[o][1].type !== "content"; )
        u[o][1].type === "chunkText" && (u[o][1]._isInFirstContentOfListItem = !0, o++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, Wo(f, n)), n = t[n], s = !0);
    else if (r[1]._container) {
      for (o = n, i = void 0; o--; )
        if (l = f.get(o), l[1].type === "lineEnding" || l[1].type === "lineEndingBlank")
          l[0] === "enter" && (i && (f.get(i)[1].type = "lineEndingBlank"), l[1].type = "lineEnding", i = o);
        else if (!(l[1].type === "linePrefix" || l[1].type === "listItemIndent")) break;
      i && (r[1].end = {
        ...f.get(i)[1].start
      }, a = f.slice(i, n), a.unshift(r), f.splice(i, n - i + 1, a));
    }
  }
  return he(e, 0, Number.POSITIVE_INFINITY, f.slice(0)), !s;
}
function Wo(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let i = t - 1;
  const o = [];
  let l = n._tokenizer;
  l || (l = r.parser[n.contentType](n.start), n._contentTypeTextTrailing && (l._contentTypeTextTrailing = !0));
  const a = l.events, u = [], s = {};
  let f, c, h = -1, p = n, m = 0, y = 0;
  const S = [y];
  for (; p; ) {
    for (; e.get(++i)[1] !== p; )
      ;
    o.push(i), p._tokenizer || (f = r.sliceStream(p), p.next || f.push(null), c && l.defineSkip(p.start), p._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = !0), l.write(f), p._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = void 0)), c = p, p = p.next;
  }
  for (p = n; ++h < a.length; )
    // Find a void token that includes a break.
    a[h][0] === "exit" && a[h - 1][0] === "enter" && a[h][1].type === a[h - 1][1].type && a[h][1].start.line !== a[h][1].end.line && (y = h + 1, S.push(y), p._tokenizer = void 0, p.previous = void 0, p = p.next);
  for (l.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : S.pop(), h = S.length; h--; ) {
    const x = a.slice(S[h], S[h + 1]), I = o.pop();
    u.push([I, I + x.length - 1]), e.splice(I, 2, x);
  }
  for (u.reverse(), h = -1; ++h < u.length; )
    s[m + u[h][0]] = m + u[h][1], m += u[h][1] - u[h][0] - 1;
  return s;
}
const Qo = {
  resolve: Xo,
  tokenize: Go
}, Yo = {
  partial: !0,
  tokenize: Jo
};
function Xo(e) {
  return Yr(e), e;
}
function Go(e, t) {
  let n;
  return r;
  function r(a) {
    return e.enter("content"), n = e.enter("chunkContent", {
      contentType: "content"
    }), i(a);
  }
  function i(a) {
    return a === null ? o(a) : z(a) ? e.check(Yo, l, o)(a) : (e.consume(a), i);
  }
  function o(a) {
    return e.exit("chunkContent"), e.exit("content"), t(a);
  }
  function l(a) {
    return e.consume(a), e.exit("chunkContent"), n.next = e.enter("chunkContent", {
      contentType: "content",
      previous: n
    }), n = n.next, i;
  }
}
function Jo(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), H(e, o, "linePrefix");
  }
  function o(l) {
    if (l === null || z(l))
      return n(l);
    const a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(l) : e.interrupt(r.parser.constructs.flow, n, t)(l);
  }
}
function Xr(e, t, n, r, i, o, l, a, u) {
  const s = u || Number.POSITIVE_INFINITY;
  let f = 0;
  return c;
  function c(x) {
    return x === 60 ? (e.enter(r), e.enter(i), e.enter(o), e.consume(x), e.exit(o), h) : x === null || x === 32 || x === 41 || dn(x) ? n(x) : (e.enter(r), e.enter(l), e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), y(x));
  }
  function h(x) {
    return x === 62 ? (e.enter(o), e.consume(x), e.exit(o), e.exit(i), e.exit(r), t) : (e.enter(a), e.enter("chunkString", {
      contentType: "string"
    }), p(x));
  }
  function p(x) {
    return x === 62 ? (e.exit("chunkString"), e.exit(a), h(x)) : x === null || x === 60 || z(x) ? n(x) : (e.consume(x), x === 92 ? m : p);
  }
  function m(x) {
    return x === 60 || x === 62 || x === 92 ? (e.consume(x), p) : p(x);
  }
  function y(x) {
    return !f && (x === null || x === 41 || G(x)) ? (e.exit("chunkString"), e.exit(a), e.exit(l), e.exit(r), t(x)) : f < s && x === 40 ? (e.consume(x), f++, y) : x === 41 ? (e.consume(x), f--, y) : x === null || x === 32 || x === 40 || dn(x) ? n(x) : (e.consume(x), x === 92 ? S : y);
  }
  function S(x) {
    return x === 40 || x === 41 || x === 92 ? (e.consume(x), y) : y(x);
  }
}
function Gr(e, t, n, r, i, o) {
  const l = this;
  let a = 0, u;
  return s;
  function s(p) {
    return e.enter(r), e.enter(i), e.consume(p), e.exit(i), e.enter(o), f;
  }
  function f(p) {
    return a > 999 || p === null || p === 91 || p === 93 && !u || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    p === 94 && !a && "_hiddenFootnoteSupport" in l.parser.constructs ? n(p) : p === 93 ? (e.exit(o), e.enter(i), e.consume(p), e.exit(i), e.exit(r), t) : z(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), f) : (e.enter("chunkString", {
      contentType: "string"
    }), c(p));
  }
  function c(p) {
    return p === null || p === 91 || p === 93 || z(p) || a++ > 999 ? (e.exit("chunkString"), f(p)) : (e.consume(p), u || (u = !N(p)), p === 92 ? h : c);
  }
  function h(p) {
    return p === 91 || p === 92 || p === 93 ? (e.consume(p), a++, c) : c(p);
  }
}
function Jr(e, t, n, r, i, o) {
  let l;
  return a;
  function a(h) {
    return h === 34 || h === 39 || h === 40 ? (e.enter(r), e.enter(i), e.consume(h), e.exit(i), l = h === 40 ? 41 : h, u) : n(h);
  }
  function u(h) {
    return h === l ? (e.enter(i), e.consume(h), e.exit(i), e.exit(r), t) : (e.enter(o), s(h));
  }
  function s(h) {
    return h === l ? (e.exit(o), u(l)) : h === null ? n(h) : z(h) ? (e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), H(e, s, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), f(h));
  }
  function f(h) {
    return h === l || h === null || z(h) ? (e.exit("chunkString"), s(h)) : (e.consume(h), h === 92 ? c : f);
  }
  function c(h) {
    return h === l || h === 92 ? (e.consume(h), f) : f(h);
  }
}
function Ye(e, t) {
  let n;
  return r;
  function r(i) {
    return z(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : N(i) ? H(e, r, n ? "linePrefix" : "lineSuffix")(i) : t(i);
  }
}
const Ko = {
  name: "definition",
  tokenize: ea
}, Zo = {
  partial: !0,
  tokenize: na
};
function ea(e, t, n) {
  const r = this;
  let i;
  return o;
  function o(p) {
    return e.enter("definition"), l(p);
  }
  function l(p) {
    return Gr.call(
      r,
      e,
      a,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(p);
  }
  function a(p) {
    return i = xe(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), p === 58 ? (e.enter("definitionMarker"), e.consume(p), e.exit("definitionMarker"), u) : n(p);
  }
  function u(p) {
    return G(p) ? Ye(e, s)(p) : s(p);
  }
  function s(p) {
    return Xr(
      e,
      f,
      // Note: we don’t need to reset the way `markdown-rs` does.
      n,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(p);
  }
  function f(p) {
    return e.attempt(Zo, c, c)(p);
  }
  function c(p) {
    return N(p) ? H(e, h, "whitespace")(p) : h(p);
  }
  function h(p) {
    return p === null || z(p) ? (e.exit("definition"), r.parser.defined.push(i), t(p)) : n(p);
  }
}
function na(e, t, n) {
  return r;
  function r(a) {
    return G(a) ? Ye(e, i)(a) : n(a);
  }
  function i(a) {
    return Jr(e, o, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function o(a) {
    return N(a) ? H(e, l, "whitespace")(a) : l(a);
  }
  function l(a) {
    return a === null || z(a) ? t(a) : n(a);
  }
}
const ta = {
  name: "hardBreakEscape",
  tokenize: ra
};
function ra(e, t, n) {
  return r;
  function r(o) {
    return e.enter("hardBreakEscape"), e.consume(o), i;
  }
  function i(o) {
    return z(o) ? (e.exit("hardBreakEscape"), t(o)) : n(o);
  }
}
const ia = {
  name: "headingAtx",
  resolve: la,
  tokenize: oa
};
function la(e, t) {
  let n = e.length - 2, r = 3, i, o;
  return e[r][1].type === "whitespace" && (r += 2), n - 2 > r && e[n][1].type === "whitespace" && (n -= 2), e[n][1].type === "atxHeadingSequence" && (r === n - 1 || n - 4 > r && e[n - 2][1].type === "whitespace") && (n -= r + 1 === n ? 2 : 4), n > r && (i = {
    type: "atxHeadingText",
    start: e[r][1].start,
    end: e[n][1].end
  }, o = {
    type: "chunkText",
    start: e[r][1].start,
    end: e[n][1].end,
    contentType: "text"
  }, he(e, r, n - r + 1, [["enter", i, t], ["enter", o, t], ["exit", o, t], ["exit", i, t]])), e;
}
function oa(e, t, n) {
  let r = 0;
  return i;
  function i(f) {
    return e.enter("atxHeading"), o(f);
  }
  function o(f) {
    return e.enter("atxHeadingSequence"), l(f);
  }
  function l(f) {
    return f === 35 && r++ < 6 ? (e.consume(f), l) : f === null || G(f) ? (e.exit("atxHeadingSequence"), a(f)) : n(f);
  }
  function a(f) {
    return f === 35 ? (e.enter("atxHeadingSequence"), u(f)) : f === null || z(f) ? (e.exit("atxHeading"), t(f)) : N(f) ? H(e, a, "whitespace")(f) : (e.enter("atxHeadingText"), s(f));
  }
  function u(f) {
    return f === 35 ? (e.consume(f), u) : (e.exit("atxHeadingSequence"), a(f));
  }
  function s(f) {
    return f === null || f === 35 || G(f) ? (e.exit("atxHeadingText"), a(f)) : (e.consume(f), s);
  }
}
const aa = [
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
], Ut = ["pre", "script", "style", "textarea"], ua = {
  concrete: !0,
  name: "htmlFlow",
  resolveTo: fa,
  tokenize: pa
}, sa = {
  partial: !0,
  tokenize: ma
}, ca = {
  partial: !0,
  tokenize: ha
};
function fa(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); )
    ;
  return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function pa(e, t, n) {
  const r = this;
  let i, o, l, a, u;
  return s;
  function s(g) {
    return f(g);
  }
  function f(g) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(g), c;
  }
  function c(g) {
    return g === 33 ? (e.consume(g), h) : g === 47 ? (e.consume(g), o = !0, y) : g === 63 ? (e.consume(g), i = 3, r.interrupt ? t : d) : oe(g) ? (e.consume(g), l = String.fromCharCode(g), S) : n(g);
  }
  function h(g) {
    return g === 45 ? (e.consume(g), i = 2, p) : g === 91 ? (e.consume(g), i = 5, a = 0, m) : oe(g) ? (e.consume(g), i = 4, r.interrupt ? t : d) : n(g);
  }
  function p(g) {
    return g === 45 ? (e.consume(g), r.interrupt ? t : d) : n(g);
  }
  function m(g) {
    const L = "CDATA[";
    return g === L.charCodeAt(a++) ? (e.consume(g), a === L.length ? r.interrupt ? t : T : m) : n(g);
  }
  function y(g) {
    return oe(g) ? (e.consume(g), l = String.fromCharCode(g), S) : n(g);
  }
  function S(g) {
    if (g === null || g === 47 || g === 62 || G(g)) {
      const L = g === 47, Q = l.toLowerCase();
      return !L && !o && Ut.includes(Q) ? (i = 1, r.interrupt ? t(g) : T(g)) : aa.includes(l.toLowerCase()) ? (i = 6, L ? (e.consume(g), x) : r.interrupt ? t(g) : T(g)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(g) : o ? I(g) : E(g));
    }
    return g === 45 || re(g) ? (e.consume(g), l += String.fromCharCode(g), S) : n(g);
  }
  function x(g) {
    return g === 62 ? (e.consume(g), r.interrupt ? t : T) : n(g);
  }
  function I(g) {
    return N(g) ? (e.consume(g), I) : k(g);
  }
  function E(g) {
    return g === 47 ? (e.consume(g), k) : g === 58 || g === 95 || oe(g) ? (e.consume(g), R) : N(g) ? (e.consume(g), E) : k(g);
  }
  function R(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || re(g) ? (e.consume(g), R) : _(g);
  }
  function _(g) {
    return g === 61 ? (e.consume(g), w) : N(g) ? (e.consume(g), _) : E(g);
  }
  function w(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96 ? n(g) : g === 34 || g === 39 ? (e.consume(g), u = g, M) : N(g) ? (e.consume(g), w) : W(g);
  }
  function M(g) {
    return g === u ? (e.consume(g), u = null, U) : g === null || z(g) ? n(g) : (e.consume(g), M);
  }
  function W(g) {
    return g === null || g === 34 || g === 39 || g === 47 || g === 60 || g === 61 || g === 62 || g === 96 || G(g) ? _(g) : (e.consume(g), W);
  }
  function U(g) {
    return g === 47 || g === 62 || N(g) ? E(g) : n(g);
  }
  function k(g) {
    return g === 62 ? (e.consume(g), A) : n(g);
  }
  function A(g) {
    return g === null || z(g) ? T(g) : N(g) ? (e.consume(g), A) : n(g);
  }
  function T(g) {
    return g === 45 && i === 2 ? (e.consume(g), ee) : g === 60 && i === 1 ? (e.consume(g), Z) : g === 62 && i === 4 ? (e.consume(g), te) : g === 63 && i === 3 ? (e.consume(g), d) : g === 93 && i === 5 ? (e.consume(g), de) : z(g) && (i === 6 || i === 7) ? (e.exit("htmlFlowData"), e.check(sa, ge, $)(g)) : g === null || z(g) ? (e.exit("htmlFlowData"), $(g)) : (e.consume(g), T);
  }
  function $(g) {
    return e.check(ca, J, ge)(g);
  }
  function J(g) {
    return e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), B;
  }
  function B(g) {
    return g === null || z(g) ? $(g) : (e.enter("htmlFlowData"), T(g));
  }
  function ee(g) {
    return g === 45 ? (e.consume(g), d) : T(g);
  }
  function Z(g) {
    return g === 47 ? (e.consume(g), l = "", se) : T(g);
  }
  function se(g) {
    if (g === 62) {
      const L = l.toLowerCase();
      return Ut.includes(L) ? (e.consume(g), te) : T(g);
    }
    return oe(g) && l.length < 8 ? (e.consume(g), l += String.fromCharCode(g), se) : T(g);
  }
  function de(g) {
    return g === 93 ? (e.consume(g), d) : T(g);
  }
  function d(g) {
    return g === 62 ? (e.consume(g), te) : g === 45 && i === 2 ? (e.consume(g), d) : T(g);
  }
  function te(g) {
    return g === null || z(g) ? (e.exit("htmlFlowData"), ge(g)) : (e.consume(g), te);
  }
  function ge(g) {
    return e.exit("htmlFlow"), t(g);
  }
}
function ha(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return z(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), o) : n(l);
  }
  function o(l) {
    return r.parser.lazy[r.now().line] ? n(l) : t(l);
  }
}
function ma(e, t, n) {
  return r;
  function r(i) {
    return e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), e.attempt(en, t, n);
  }
}
const da = {
  name: "htmlText",
  tokenize: ga
};
function ga(e, t, n) {
  const r = this;
  let i, o, l;
  return a;
  function a(d) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(d), u;
  }
  function u(d) {
    return d === 33 ? (e.consume(d), s) : d === 47 ? (e.consume(d), _) : d === 63 ? (e.consume(d), E) : oe(d) ? (e.consume(d), W) : n(d);
  }
  function s(d) {
    return d === 45 ? (e.consume(d), f) : d === 91 ? (e.consume(d), o = 0, m) : oe(d) ? (e.consume(d), I) : n(d);
  }
  function f(d) {
    return d === 45 ? (e.consume(d), p) : n(d);
  }
  function c(d) {
    return d === null ? n(d) : d === 45 ? (e.consume(d), h) : z(d) ? (l = c, Z(d)) : (e.consume(d), c);
  }
  function h(d) {
    return d === 45 ? (e.consume(d), p) : c(d);
  }
  function p(d) {
    return d === 62 ? ee(d) : d === 45 ? h(d) : c(d);
  }
  function m(d) {
    const te = "CDATA[";
    return d === te.charCodeAt(o++) ? (e.consume(d), o === te.length ? y : m) : n(d);
  }
  function y(d) {
    return d === null ? n(d) : d === 93 ? (e.consume(d), S) : z(d) ? (l = y, Z(d)) : (e.consume(d), y);
  }
  function S(d) {
    return d === 93 ? (e.consume(d), x) : y(d);
  }
  function x(d) {
    return d === 62 ? ee(d) : d === 93 ? (e.consume(d), x) : y(d);
  }
  function I(d) {
    return d === null || d === 62 ? ee(d) : z(d) ? (l = I, Z(d)) : (e.consume(d), I);
  }
  function E(d) {
    return d === null ? n(d) : d === 63 ? (e.consume(d), R) : z(d) ? (l = E, Z(d)) : (e.consume(d), E);
  }
  function R(d) {
    return d === 62 ? ee(d) : E(d);
  }
  function _(d) {
    return oe(d) ? (e.consume(d), w) : n(d);
  }
  function w(d) {
    return d === 45 || re(d) ? (e.consume(d), w) : M(d);
  }
  function M(d) {
    return z(d) ? (l = M, Z(d)) : N(d) ? (e.consume(d), M) : ee(d);
  }
  function W(d) {
    return d === 45 || re(d) ? (e.consume(d), W) : d === 47 || d === 62 || G(d) ? U(d) : n(d);
  }
  function U(d) {
    return d === 47 ? (e.consume(d), ee) : d === 58 || d === 95 || oe(d) ? (e.consume(d), k) : z(d) ? (l = U, Z(d)) : N(d) ? (e.consume(d), U) : ee(d);
  }
  function k(d) {
    return d === 45 || d === 46 || d === 58 || d === 95 || re(d) ? (e.consume(d), k) : A(d);
  }
  function A(d) {
    return d === 61 ? (e.consume(d), T) : z(d) ? (l = A, Z(d)) : N(d) ? (e.consume(d), A) : U(d);
  }
  function T(d) {
    return d === null || d === 60 || d === 61 || d === 62 || d === 96 ? n(d) : d === 34 || d === 39 ? (e.consume(d), i = d, $) : z(d) ? (l = T, Z(d)) : N(d) ? (e.consume(d), T) : (e.consume(d), J);
  }
  function $(d) {
    return d === i ? (e.consume(d), i = void 0, B) : d === null ? n(d) : z(d) ? (l = $, Z(d)) : (e.consume(d), $);
  }
  function J(d) {
    return d === null || d === 34 || d === 39 || d === 60 || d === 61 || d === 96 ? n(d) : d === 47 || d === 62 || G(d) ? U(d) : (e.consume(d), J);
  }
  function B(d) {
    return d === 47 || d === 62 || G(d) ? U(d) : n(d);
  }
  function ee(d) {
    return d === 62 ? (e.consume(d), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(d);
  }
  function Z(d) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), se;
  }
  function se(d) {
    return N(d) ? H(e, de, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(d) : de(d);
  }
  function de(d) {
    return e.enter("htmlTextData"), l(d);
  }
}
const ut = {
  name: "labelEnd",
  resolveAll: ba,
  resolveTo: wa,
  tokenize: Sa
}, ya = {
  tokenize: Ca
}, xa = {
  tokenize: Ea
}, ka = {
  tokenize: va
};
function ba(e) {
  let t = -1;
  const n = [];
  for (; ++t < e.length; ) {
    const r = e[t][1];
    if (n.push(e[t]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const i = r.type === "labelImage" ? 4 : 2;
      r.type = "data", t += i;
    }
  }
  return e.length !== n.length && he(e, 0, e.length, n), e;
}
function wa(e, t) {
  let n = e.length, r = 0, i, o, l, a;
  for (; n--; )
    if (i = e[n][1], o) {
      if (i.type === "link" || i.type === "labelLink" && i._inactive)
        break;
      e[n][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (l) {
      if (e[n][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (o = n, i.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else i.type === "labelEnd" && (l = n);
  const u = {
    type: e[o][1].type === "labelLink" ? "link" : "image",
    start: {
      ...e[o][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  }, s = {
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
  return a = [["enter", u, t], ["enter", s, t]], a = me(a, e.slice(o + 1, o + r + 3)), a = me(a, [["enter", f, t]]), a = me(a, wn(t.parser.constructs.insideSpan.null, e.slice(o + r + 4, l - 3), t)), a = me(a, [["exit", f, t], e[l - 2], e[l - 1], ["exit", s, t]]), a = me(a, e.slice(l + 1)), a = me(a, [["exit", u, t]]), he(e, o, e.length, a), e;
}
function Sa(e, t, n) {
  const r = this;
  let i = r.events.length, o, l;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      o = r.events[i][1];
      break;
    }
  return a;
  function a(h) {
    return o ? o._inactive ? c(h) : (l = r.parser.defined.includes(xe(r.sliceSerialize({
      start: o.end,
      end: r.now()
    }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(h), e.exit("labelMarker"), e.exit("labelEnd"), u) : n(h);
  }
  function u(h) {
    return h === 40 ? e.attempt(ya, f, l ? f : c)(h) : h === 91 ? e.attempt(xa, f, l ? s : c)(h) : l ? f(h) : c(h);
  }
  function s(h) {
    return e.attempt(ka, f, c)(h);
  }
  function f(h) {
    return t(h);
  }
  function c(h) {
    return o._balanced = !0, n(h);
  }
}
function Ca(e, t, n) {
  return r;
  function r(c) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(c), e.exit("resourceMarker"), i;
  }
  function i(c) {
    return G(c) ? Ye(e, o)(c) : o(c);
  }
  function o(c) {
    return c === 41 ? f(c) : Xr(e, l, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(c);
  }
  function l(c) {
    return G(c) ? Ye(e, u)(c) : f(c);
  }
  function a(c) {
    return n(c);
  }
  function u(c) {
    return c === 34 || c === 39 || c === 40 ? Jr(e, s, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(c) : f(c);
  }
  function s(c) {
    return G(c) ? Ye(e, f)(c) : f(c);
  }
  function f(c) {
    return c === 41 ? (e.enter("resourceMarker"), e.consume(c), e.exit("resourceMarker"), e.exit("resource"), t) : n(c);
  }
}
function Ea(e, t, n) {
  const r = this;
  return i;
  function i(a) {
    return Gr.call(r, e, o, l, "reference", "referenceMarker", "referenceString")(a);
  }
  function o(a) {
    return r.parser.defined.includes(xe(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(a) : n(a);
  }
  function l(a) {
    return n(a);
  }
}
function va(e, t, n) {
  return r;
  function r(o) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(o), e.exit("referenceMarker"), i;
  }
  function i(o) {
    return o === 93 ? (e.enter("referenceMarker"), e.consume(o), e.exit("referenceMarker"), e.exit("reference"), t) : n(o);
  }
}
const Ia = {
  name: "labelStartImage",
  resolveAll: ut.resolveAll,
  tokenize: Ta
};
function Ta(e, t, n) {
  const r = this;
  return i;
  function i(a) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(a), e.exit("labelImageMarker"), o;
  }
  function o(a) {
    return a === 91 ? (e.enter("labelMarker"), e.consume(a), e.exit("labelMarker"), e.exit("labelImage"), l) : n(a);
  }
  function l(a) {
    return a === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(a) : t(a);
  }
}
const Aa = {
  name: "labelStartLink",
  resolveAll: ut.resolveAll,
  tokenize: Pa
};
function Pa(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(l), e.exit("labelMarker"), e.exit("labelLink"), o;
  }
  function o(l) {
    return l === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(l) : t(l);
  }
}
const Pn = {
  name: "lineEnding",
  tokenize: za
};
function za(e, t) {
  return n;
  function n(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), H(e, t, "linePrefix");
  }
}
const cn = {
  name: "thematicBreak",
  tokenize: La
};
function La(e, t, n) {
  let r = 0, i;
  return o;
  function o(s) {
    return e.enter("thematicBreak"), l(s);
  }
  function l(s) {
    return i = s, a(s);
  }
  function a(s) {
    return s === i ? (e.enter("thematicBreakSequence"), u(s)) : r >= 3 && (s === null || z(s)) ? (e.exit("thematicBreak"), t(s)) : n(s);
  }
  function u(s) {
    return s === i ? (e.consume(s), r++, u) : (e.exit("thematicBreakSequence"), N(s) ? H(e, a, "whitespace")(s) : a(s));
  }
}
const ae = {
  continuation: {
    tokenize: Ra
  },
  exit: Na,
  name: "list",
  tokenize: _a
}, Da = {
  partial: !0,
  tokenize: Ma
}, Fa = {
  partial: !0,
  tokenize: Oa
};
function _a(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let o = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, l = 0;
  return a;
  function a(p) {
    const m = r.containerState.type || (p === 42 || p === 43 || p === 45 ? "listUnordered" : "listOrdered");
    if (m === "listUnordered" ? !r.containerState.marker || p === r.containerState.marker : Wn(p)) {
      if (r.containerState.type || (r.containerState.type = m, e.enter(m, {
        _container: !0
      })), m === "listUnordered")
        return e.enter("listItemPrefix"), p === 42 || p === 45 ? e.check(cn, n, s)(p) : s(p);
      if (!r.interrupt || p === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), u(p);
    }
    return n(p);
  }
  function u(p) {
    return Wn(p) && ++l < 10 ? (e.consume(p), u) : (!r.interrupt || l < 2) && (r.containerState.marker ? p === r.containerState.marker : p === 41 || p === 46) ? (e.exit("listItemValue"), s(p)) : n(p);
  }
  function s(p) {
    return e.enter("listItemMarker"), e.consume(p), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || p, e.check(
      en,
      // Can’t be empty when interrupting.
      r.interrupt ? n : f,
      e.attempt(Da, h, c)
    );
  }
  function f(p) {
    return r.containerState.initialBlankLine = !0, o++, h(p);
  }
  function c(p) {
    return N(p) ? (e.enter("listItemPrefixWhitespace"), e.consume(p), e.exit("listItemPrefixWhitespace"), h) : n(p);
  }
  function h(p) {
    return r.containerState.size = o + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(p);
  }
}
function Ra(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(en, i, o);
  function i(a) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, H(e, t, "listItemIndent", r.containerState.size + 1)(a);
  }
  function o(a) {
    return r.containerState.furtherBlankLines || !N(a) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, l(a)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(Fa, t, l)(a));
  }
  function l(a) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, H(e, e.attempt(ae, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(a);
  }
}
function Oa(e, t, n) {
  const r = this;
  return H(e, i, "listItemIndent", r.containerState.size + 1);
  function i(o) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === "listItemIndent" && l[2].sliceSerialize(l[1], !0).length === r.containerState.size ? t(o) : n(o);
  }
}
function Na(e) {
  e.exit(this.containerState.type);
}
function Ma(e, t, n) {
  const r = this;
  return H(e, i, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function i(o) {
    const l = r.events[r.events.length - 1];
    return !N(o) && l && l[1].type === "listItemPrefixWhitespace" ? t(o) : n(o);
  }
}
const Vt = {
  name: "setextUnderline",
  resolveTo: Ba,
  tokenize: ja
};
function Ba(e, t) {
  let n = e.length, r, i, o;
  for (; n--; )
    if (e[n][0] === "enter") {
      if (e[n][1].type === "content") {
        r = n;
        break;
      }
      e[n][1].type === "paragraph" && (i = n);
    } else
      e[n][1].type === "content" && e.splice(n, 1), !o && e[n][1].type === "definition" && (o = n);
  const l = {
    type: "setextHeading",
    start: {
      ...e[r][1].start
    },
    end: {
      ...e[e.length - 1][1].end
    }
  };
  return e[i][1].type = "setextHeadingText", o ? (e.splice(i, 0, ["enter", l, t]), e.splice(o + 1, 0, ["exit", e[r][1], t]), e[r][1].end = {
    ...e[o][1].end
  }) : e[r][1] = l, e.push(["exit", l, t]), e;
}
function ja(e, t, n) {
  const r = this;
  let i;
  return o;
  function o(s) {
    let f = r.events.length, c;
    for (; f--; )
      if (r.events[f][1].type !== "lineEnding" && r.events[f][1].type !== "linePrefix" && r.events[f][1].type !== "content") {
        c = r.events[f][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || c) ? (e.enter("setextHeadingLine"), i = s, l(s)) : n(s);
  }
  function l(s) {
    return e.enter("setextHeadingLineSequence"), a(s);
  }
  function a(s) {
    return s === i ? (e.consume(s), a) : (e.exit("setextHeadingLineSequence"), N(s) ? H(e, u, "lineSuffix")(s) : u(s));
  }
  function u(s) {
    return s === null || z(s) ? (e.exit("setextHeadingLine"), t(s)) : n(s);
  }
}
const $a = {
  tokenize: Ha
};
function Ha(e) {
  const t = this, n = e.attempt(
    // Try to parse a blank line.
    en,
    r,
    // Try to parse initial flow (essentially, only code).
    e.attempt(this.parser.constructs.flowInitial, i, H(e, e.attempt(this.parser.constructs.flow, i, e.attempt(Qo, i)), "linePrefix"))
  );
  return n;
  function r(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return e.enter("lineEndingBlank"), e.consume(o), e.exit("lineEndingBlank"), t.currentConstruct = void 0, n;
  }
  function i(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), t.currentConstruct = void 0, n;
  }
}
const Ua = {
  resolveAll: Zr()
}, Va = Kr("string"), qa = Kr("text");
function Kr(e) {
  return {
    resolveAll: Zr(e === "text" ? Wa : void 0),
    tokenize: t
  };
  function t(n) {
    const r = this, i = this.parser.constructs[e], o = n.attempt(i, l, a);
    return l;
    function l(f) {
      return s(f) ? o(f) : a(f);
    }
    function a(f) {
      if (f === null) {
        n.consume(f);
        return;
      }
      return n.enter("data"), n.consume(f), u;
    }
    function u(f) {
      return s(f) ? (n.exit("data"), o(f)) : (n.consume(f), u);
    }
    function s(f) {
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
function Zr(e) {
  return t;
  function t(n, r) {
    let i = -1, o;
    for (; ++i <= n.length; )
      o === void 0 ? n[i] && n[i][1].type === "data" && (o = i, i++) : (!n[i] || n[i][1].type !== "data") && (i !== o + 2 && (n[o][1].end = n[i - 1][1].end, n.splice(o + 2, i - o - 2), i = o + 2), o = void 0);
    return e ? e(n, r) : n;
  }
}
function Wa(e, t) {
  let n = 0;
  for (; ++n <= e.length; )
    if ((n === e.length || e[n][1].type === "lineEnding") && e[n - 1][1].type === "data") {
      const r = e[n - 1][1], i = t.sliceStream(r);
      let o = i.length, l = -1, a = 0, u;
      for (; o--; ) {
        const s = i[o];
        if (typeof s == "string") {
          for (l = s.length; s.charCodeAt(l - 1) === 32; )
            a++, l--;
          if (l) break;
          l = -1;
        } else if (s === -2)
          u = !0, a++;
        else if (s !== -1) {
          o++;
          break;
        }
      }
      if (t._contentTypeTextTrailing && n === e.length && (a = 0), a) {
        const s = {
          type: n === e.length || u || a < 2 ? "lineSuffix" : "hardBreakTrailing",
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
          ...s.start
        }, r.start.offset === r.end.offset ? Object.assign(r, s) : (e.splice(n, 0, ["enter", s, t], ["exit", s, t]), n += 2);
      }
      n++;
    }
  return e;
}
const Qa = {
  42: ae,
  43: ae,
  45: ae,
  48: ae,
  49: ae,
  50: ae,
  51: ae,
  52: ae,
  53: ae,
  54: ae,
  55: ae,
  56: ae,
  57: ae,
  62: qr
}, Ya = {
  91: Ko
}, Xa = {
  [-2]: An,
  [-1]: An,
  32: An
}, Ga = {
  35: ia,
  42: cn,
  45: [Vt, cn],
  60: ua,
  61: Vt,
  95: cn,
  96: Ht,
  126: Ht
}, Ja = {
  38: Qr,
  92: Wr
}, Ka = {
  [-5]: Pn,
  [-4]: Pn,
  [-3]: Pn,
  33: Ia,
  38: Qr,
  42: Qn,
  60: [Ao, da],
  91: Aa,
  92: [ta, Wr],
  93: ut,
  95: Qn,
  96: $o
}, Za = {
  null: [Qn, Ua]
}, eu = {
  null: [42, 95]
}, nu = {
  null: []
}, tu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  attentionMarkers: eu,
  contentInitial: Ya,
  disable: nu,
  document: Qa,
  flow: Ga,
  flowInitial: Xa,
  insideSpan: Za,
  string: Ja,
  text: Ka
}, Symbol.toStringTag, { value: "Module" }));
function ru(e, t, n) {
  let r = {
    _bufferIndex: -1,
    _index: 0,
    line: n && n.line || 1,
    column: n && n.column || 1,
    offset: n && n.offset || 0
  };
  const i = {}, o = [];
  let l = [], a = [];
  const u = {
    attempt: M(_),
    check: M(w),
    consume: I,
    enter: E,
    exit: R,
    interrupt: M(w, {
      interrupt: !0
    })
  }, s = {
    code: null,
    containerState: {},
    defineSkip: y,
    events: [],
    now: m,
    parser: e,
    previous: null,
    sliceSerialize: h,
    sliceStream: p,
    write: c
  };
  let f = t.tokenize.call(s, u);
  return t.resolveAll && o.push(t), s;
  function c(A) {
    return l = me(l, A), S(), l[l.length - 1] !== null ? [] : (W(t, 0), s.events = wn(o, s.events, s), s.events);
  }
  function h(A, T) {
    return lu(p(A), T);
  }
  function p(A) {
    return iu(l, A);
  }
  function m() {
    const {
      _bufferIndex: A,
      _index: T,
      line: $,
      column: J,
      offset: B
    } = r;
    return {
      _bufferIndex: A,
      _index: T,
      line: $,
      column: J,
      offset: B
    };
  }
  function y(A) {
    i[A.line] = A.column, k();
  }
  function S() {
    let A;
    for (; r._index < l.length; ) {
      const T = l[r._index];
      if (typeof T == "string")
        for (A = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === A && r._bufferIndex < T.length; )
          x(T.charCodeAt(r._bufferIndex));
      else
        x(T);
    }
  }
  function x(A) {
    f = f(A);
  }
  function I(A) {
    z(A) ? (r.line++, r.column = 1, r.offset += A === -3 ? 2 : 1, k()) : A !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === // Points w/ non-negative `_bufferIndex` reference
    // strings.
    /** @type {string} */
    l[r._index].length && (r._bufferIndex = -1, r._index++)), s.previous = A;
  }
  function E(A, T) {
    const $ = T || {};
    return $.type = A, $.start = m(), s.events.push(["enter", $, s]), a.push($), $;
  }
  function R(A) {
    const T = a.pop();
    return T.end = m(), s.events.push(["exit", T, s]), T;
  }
  function _(A, T) {
    W(A, T.from);
  }
  function w(A, T) {
    T.restore();
  }
  function M(A, T) {
    return $;
    function $(J, B, ee) {
      let Z, se, de, d;
      return Array.isArray(J) ? (
        /* c8 ignore next 1 */
        ge(J)
      ) : "tokenize" in J ? (
        // Looks like a construct.
        ge([
          /** @type {Construct} */
          J
        ])
      ) : te(J);
      function te(O) {
        return V;
        function V(le) {
          const we = le !== null && O[le], Te = le !== null && O.null, ce = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(we) ? we : we ? [we] : [],
            ...Array.isArray(Te) ? Te : Te ? [Te] : []
          ];
          return ge(ce)(le);
        }
      }
      function ge(O) {
        return Z = O, se = 0, O.length === 0 ? ee : g(O[se]);
      }
      function g(O) {
        return V;
        function V(le) {
          return d = U(), de = O, O.partial || (s.currentConstruct = O), O.name && s.parser.constructs.disable.null.includes(O.name) ? Q() : O.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            T ? Object.assign(Object.create(s), T) : s,
            u,
            L,
            Q
          )(le);
        }
      }
      function L(O) {
        return A(de, d), B;
      }
      function Q(O) {
        return d.restore(), ++se < Z.length ? g(Z[se]) : ee;
      }
    }
  }
  function W(A, T) {
    A.resolveAll && !o.includes(A) && o.push(A), A.resolve && he(s.events, T, s.events.length - T, A.resolve(s.events.slice(T), s)), A.resolveTo && (s.events = A.resolveTo(s.events, s));
  }
  function U() {
    const A = m(), T = s.previous, $ = s.currentConstruct, J = s.events.length, B = Array.from(a);
    return {
      from: J,
      restore: ee
    };
    function ee() {
      r = A, s.previous = T, s.currentConstruct = $, s.events.length = J, a = B, k();
    }
  }
  function k() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function iu(e, t) {
  const n = t.start._index, r = t.start._bufferIndex, i = t.end._index, o = t.end._bufferIndex;
  let l;
  if (n === i)
    l = [e[n].slice(r, o)];
  else {
    if (l = e.slice(n, i), r > -1) {
      const a = l[0];
      typeof a == "string" ? l[0] = a.slice(r) : l.shift();
    }
    o > 0 && l.push(e[i].slice(0, o));
  }
  return l;
}
function lu(e, t) {
  let n = -1;
  const r = [];
  let i;
  for (; ++n < e.length; ) {
    const o = e[n];
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
        l = t ? " " : "	";
        break;
      }
      case -1: {
        if (!t && i) continue;
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
function ou(e) {
  const r = {
    constructs: (
      /** @type {FullNormalizedExtension} */
      Ur([tu, ...(e || {}).extensions || []])
    ),
    content: i(wo),
    defined: [],
    document: i(Co),
    flow: i($a),
    lazy: {},
    string: i(Va),
    text: i(qa)
  };
  return r;
  function i(o) {
    return l;
    function l(a) {
      return ru(r, o, a);
    }
  }
}
function au(e) {
  for (; !Yr(e); )
    ;
  return e;
}
const qt = /[\0\t\n\r]/g;
function uu() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(o, l, a) {
    const u = [];
    let s, f, c, h, p;
    for (o = t + (typeof o == "string" ? o.toString() : new TextDecoder(l || void 0).decode(o)), c = 0, t = "", n && (o.charCodeAt(0) === 65279 && c++, n = void 0); c < o.length; ) {
      if (qt.lastIndex = c, s = qt.exec(o), h = s && s.index !== void 0 ? s.index : o.length, p = o.charCodeAt(h), !s) {
        t = o.slice(c);
        break;
      }
      if (p === 10 && c === h && r)
        u.push(-3), r = void 0;
      else
        switch (r && (u.push(-5), r = void 0), c < h && (u.push(o.slice(c, h)), e += h - c), p) {
          case 0: {
            u.push(65533), e++;
            break;
          }
          case 9: {
            for (f = Math.ceil(e / 4) * 4, u.push(-2); e++ < f; ) u.push(-1);
            break;
          }
          case 10: {
            u.push(-4), e = 1;
            break;
          }
          default:
            r = !0, e = 1;
        }
      c = h + 1;
    }
    return a && (r && u.push(-5), t && u.push(t), u.push(null)), u;
  }
}
const su = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function cu(e) {
  return e.replace(su, fu);
}
function fu(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), o = i === 120 || i === 88;
    return Vr(n.slice(o ? 2 : 1), o ? 16 : 10);
  }
  return at(n) || e;
}
const ei = {}.hasOwnProperty;
function pu(e, t, n) {
  return t && typeof t == "object" && (n = t, t = void 0), hu(n)(au(ou(n).document().write(uu()(e, t, !0))));
}
function hu(e) {
  const t = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: o(wt),
      autolinkProtocol: U,
      autolinkEmail: U,
      atxHeading: o(xt),
      blockQuote: o(Te),
      characterEscape: U,
      characterReference: U,
      codeFenced: o(ce),
      codeFencedFenceInfo: l,
      codeFencedFenceMeta: l,
      codeIndented: o(ce, l),
      codeText: o(rn, l),
      codeTextData: U,
      data: U,
      codeFlowValue: U,
      definition: o(Ni),
      definitionDestinationString: l,
      definitionLabelString: l,
      definitionTitleString: l,
      emphasis: o(Mi),
      hardBreakEscape: o(kt),
      hardBreakTrailing: o(kt),
      htmlFlow: o(bt, l),
      htmlFlowData: U,
      htmlText: o(bt, l),
      htmlTextData: U,
      image: o(Bi),
      label: l,
      link: o(wt),
      listItem: o(ji),
      listItemValue: h,
      listOrdered: o(St, c),
      listUnordered: o(St),
      paragraph: o($i),
      reference: g,
      referenceString: l,
      resourceDestinationString: l,
      resourceTitleString: l,
      setextHeading: o(xt),
      strong: o(Hi),
      thematicBreak: o(Vi)
    },
    exit: {
      atxHeading: u(),
      atxHeadingSequence: _,
      autolink: u(),
      autolinkEmail: we,
      autolinkProtocol: le,
      blockQuote: u(),
      characterEscapeValue: k,
      characterReferenceMarkerHexadecimal: Q,
      characterReferenceMarkerNumeric: Q,
      characterReferenceValue: O,
      characterReference: V,
      codeFenced: u(S),
      codeFencedFence: y,
      codeFencedFenceInfo: p,
      codeFencedFenceMeta: m,
      codeFlowValue: k,
      codeIndented: u(x),
      codeText: u(B),
      codeTextData: k,
      data: k,
      definition: u(),
      definitionDestinationString: R,
      definitionLabelString: I,
      definitionTitleString: E,
      emphasis: u(),
      hardBreakEscape: u(T),
      hardBreakTrailing: u(T),
      htmlFlow: u($),
      htmlFlowData: k,
      htmlText: u(J),
      htmlTextData: k,
      image: u(Z),
      label: de,
      labelText: se,
      lineEnding: A,
      link: u(ee),
      listItem: u(),
      listOrdered: u(),
      listUnordered: u(),
      paragraph: u(),
      referenceString: L,
      resourceDestinationString: d,
      resourceTitleString: te,
      resource: ge,
      setextHeading: u(W),
      setextHeadingLineSequence: M,
      setextHeadingText: w,
      strong: u(),
      thematicBreak: u()
    }
  };
  ni(t, (e || {}).mdastExtensions || []);
  const n = {};
  return r;
  function r(b) {
    let v = {
      type: "root",
      children: []
    };
    const F = {
      stack: [v],
      tokenStack: [],
      config: t,
      enter: a,
      exit: s,
      buffer: l,
      resume: f,
      data: n
    }, j = [];
    let Y = -1;
    for (; ++Y < b.length; )
      if (b[Y][1].type === "listOrdered" || b[Y][1].type === "listUnordered")
        if (b[Y][0] === "enter")
          j.push(Y);
        else {
          const ye = j.pop();
          Y = i(b, ye, Y);
        }
    for (Y = -1; ++Y < b.length; ) {
      const ye = t[b[Y][0]];
      ei.call(ye, b[Y][1].type) && ye[b[Y][1].type].call(Object.assign({
        sliceSerialize: b[Y][2].sliceSerialize
      }, F), b[Y][1]);
    }
    if (F.tokenStack.length > 0) {
      const ye = F.tokenStack[F.tokenStack.length - 1];
      (ye[1] || Wt).call(F, void 0, ye[0]);
    }
    for (v.position = {
      start: Ae(b.length > 0 ? b[0][1].start : {
        line: 1,
        column: 1,
        offset: 0
      }),
      end: Ae(b.length > 0 ? b[b.length - 2][1].end : {
        line: 1,
        column: 1,
        offset: 0
      })
    }, Y = -1; ++Y < t.transforms.length; )
      v = t.transforms[Y](v) || v;
    return v;
  }
  function i(b, v, F) {
    let j = v - 1, Y = -1, ye = !1, Le, Se, Ue, Ve;
    for (; ++j <= F; ) {
      const fe = b[j];
      switch (fe[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          fe[0] === "enter" ? Y++ : Y--, Ve = void 0;
          break;
        }
        case "lineEndingBlank": {
          fe[0] === "enter" && (Le && !Ve && !Y && !Ue && (Ue = j), Ve = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          Ve = void 0;
      }
      if (!Y && fe[0] === "enter" && fe[1].type === "listItemPrefix" || Y === -1 && fe[0] === "exit" && (fe[1].type === "listUnordered" || fe[1].type === "listOrdered")) {
        if (Le) {
          let Me = j;
          for (Se = void 0; Me--; ) {
            const Ce = b[Me];
            if (Ce[1].type === "lineEnding" || Ce[1].type === "lineEndingBlank") {
              if (Ce[0] === "exit") continue;
              Se && (b[Se][1].type = "lineEndingBlank", ye = !0), Ce[1].type = "lineEnding", Se = Me;
            } else if (!(Ce[1].type === "linePrefix" || Ce[1].type === "blockQuotePrefix" || Ce[1].type === "blockQuotePrefixWhitespace" || Ce[1].type === "blockQuoteMarker" || Ce[1].type === "listItemIndent")) break;
          }
          Ue && (!Se || Ue < Se) && (Le._spread = !0), Le.end = Object.assign({}, Se ? b[Se][1].start : fe[1].end), b.splice(Se || j, 0, ["exit", Le, fe[2]]), j++, F++;
        }
        if (fe[1].type === "listItemPrefix") {
          const Me = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, fe[1].start),
            // @ts-expect-error: we’ll add `end` in a second.
            end: void 0
          };
          Le = Me, b.splice(j, 0, ["enter", Me, fe[2]]), j++, F++, Ue = void 0, Ve = !0;
        }
      }
    }
    return b[v][1]._spread = ye, F;
  }
  function o(b, v) {
    return F;
    function F(j) {
      a.call(this, b(j), j), v && v.call(this, j);
    }
  }
  function l() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function a(b, v, F) {
    this.stack[this.stack.length - 1].children.push(b), this.stack.push(b), this.tokenStack.push([v, F || void 0]), b.position = {
      start: Ae(v.start),
      // @ts-expect-error: `end` will be patched later.
      end: void 0
    };
  }
  function u(b) {
    return v;
    function v(F) {
      b && b.call(this, F), s.call(this, F);
    }
  }
  function s(b, v) {
    const F = this.stack.pop(), j = this.tokenStack.pop();
    if (j)
      j[0].type !== b.type && (v ? v.call(this, b, j[0]) : (j[1] || Wt).call(this, b, j[0]));
    else throw new Error("Cannot close `" + b.type + "` (" + Qe({
      start: b.start,
      end: b.end
    }) + "): it’s not open");
    F.position.end = Ae(b.end);
  }
  function f() {
    return ot(this.stack.pop());
  }
  function c() {
    this.data.expectingFirstListItemValue = !0;
  }
  function h(b) {
    if (this.data.expectingFirstListItemValue) {
      const v = this.stack[this.stack.length - 2];
      v.start = Number.parseInt(this.sliceSerialize(b), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function p() {
    const b = this.resume(), v = this.stack[this.stack.length - 1];
    v.lang = b;
  }
  function m() {
    const b = this.resume(), v = this.stack[this.stack.length - 1];
    v.meta = b;
  }
  function y() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
  }
  function S() {
    const b = this.resume(), v = this.stack[this.stack.length - 1];
    v.value = b.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function x() {
    const b = this.resume(), v = this.stack[this.stack.length - 1];
    v.value = b.replace(/(\r?\n|\r)$/g, "");
  }
  function I(b) {
    const v = this.resume(), F = this.stack[this.stack.length - 1];
    F.label = v, F.identifier = xe(this.sliceSerialize(b)).toLowerCase();
  }
  function E() {
    const b = this.resume(), v = this.stack[this.stack.length - 1];
    v.title = b;
  }
  function R() {
    const b = this.resume(), v = this.stack[this.stack.length - 1];
    v.url = b;
  }
  function _(b) {
    const v = this.stack[this.stack.length - 1];
    if (!v.depth) {
      const F = this.sliceSerialize(b).length;
      v.depth = F;
    }
  }
  function w() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function M(b) {
    const v = this.stack[this.stack.length - 1];
    v.depth = this.sliceSerialize(b).codePointAt(0) === 61 ? 1 : 2;
  }
  function W() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function U(b) {
    const F = this.stack[this.stack.length - 1].children;
    let j = F[F.length - 1];
    (!j || j.type !== "text") && (j = Ui(), j.position = {
      start: Ae(b.start),
      // @ts-expect-error: we’ll add `end` later.
      end: void 0
    }, F.push(j)), this.stack.push(j);
  }
  function k(b) {
    const v = this.stack.pop();
    v.value += this.sliceSerialize(b), v.position.end = Ae(b.end);
  }
  function A(b) {
    const v = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const F = v.children[v.children.length - 1];
      F.position.end = Ae(b.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && t.canContainEols.includes(v.type) && (U.call(this, b), k.call(this, b));
  }
  function T() {
    this.data.atHardBreak = !0;
  }
  function $() {
    const b = this.resume(), v = this.stack[this.stack.length - 1];
    v.value = b;
  }
  function J() {
    const b = this.resume(), v = this.stack[this.stack.length - 1];
    v.value = b;
  }
  function B() {
    const b = this.resume(), v = this.stack[this.stack.length - 1];
    v.value = b;
  }
  function ee() {
    const b = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const v = this.data.referenceType || "shortcut";
      b.type += "Reference", b.referenceType = v, delete b.url, delete b.title;
    } else
      delete b.identifier, delete b.label;
    this.data.referenceType = void 0;
  }
  function Z() {
    const b = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const v = this.data.referenceType || "shortcut";
      b.type += "Reference", b.referenceType = v, delete b.url, delete b.title;
    } else
      delete b.identifier, delete b.label;
    this.data.referenceType = void 0;
  }
  function se(b) {
    const v = this.sliceSerialize(b), F = this.stack[this.stack.length - 2];
    F.label = cu(v), F.identifier = xe(v).toLowerCase();
  }
  function de() {
    const b = this.stack[this.stack.length - 1], v = this.resume(), F = this.stack[this.stack.length - 1];
    if (this.data.inReference = !0, F.type === "link") {
      const j = b.children;
      F.children = j;
    } else
      F.alt = v;
  }
  function d() {
    const b = this.resume(), v = this.stack[this.stack.length - 1];
    v.url = b;
  }
  function te() {
    const b = this.resume(), v = this.stack[this.stack.length - 1];
    v.title = b;
  }
  function ge() {
    this.data.inReference = void 0;
  }
  function g() {
    this.data.referenceType = "collapsed";
  }
  function L(b) {
    const v = this.resume(), F = this.stack[this.stack.length - 1];
    F.label = v, F.identifier = xe(this.sliceSerialize(b)).toLowerCase(), this.data.referenceType = "full";
  }
  function Q(b) {
    this.data.characterReferenceType = b.type;
  }
  function O(b) {
    const v = this.sliceSerialize(b), F = this.data.characterReferenceType;
    let j;
    F ? (j = Vr(v, F === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : j = at(v);
    const Y = this.stack[this.stack.length - 1];
    Y.value += j;
  }
  function V(b) {
    const v = this.stack.pop();
    v.position.end = Ae(b.end);
  }
  function le(b) {
    k.call(this, b);
    const v = this.stack[this.stack.length - 1];
    v.url = this.sliceSerialize(b);
  }
  function we(b) {
    k.call(this, b);
    const v = this.stack[this.stack.length - 1];
    v.url = "mailto:" + this.sliceSerialize(b);
  }
  function Te() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function ce() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function rn() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function Ni() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function Mi() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function xt() {
    return {
      type: "heading",
      // @ts-expect-error `depth` will be set later.
      depth: 0,
      children: []
    };
  }
  function kt() {
    return {
      type: "break"
    };
  }
  function bt() {
    return {
      type: "html",
      value: ""
    };
  }
  function Bi() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function wt() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function St(b) {
    return {
      type: "list",
      ordered: b.type === "listOrdered",
      start: null,
      spread: b._spread,
      children: []
    };
  }
  function ji(b) {
    return {
      type: "listItem",
      spread: b._spread,
      checked: null,
      children: []
    };
  }
  function $i() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function Hi() {
    return {
      type: "strong",
      children: []
    };
  }
  function Ui() {
    return {
      type: "text",
      value: ""
    };
  }
  function Vi() {
    return {
      type: "thematicBreak"
    };
  }
}
function Ae(e) {
  return {
    line: e.line,
    column: e.column,
    offset: e.offset
  };
}
function ni(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? ni(e, r) : mu(e, r);
  }
}
function mu(e, t) {
  let n;
  for (n in t)
    if (ei.call(t, n))
      switch (n) {
        case "canContainEols": {
          const r = t[n];
          r && e[n].push(...r);
          break;
        }
        case "transforms": {
          const r = t[n];
          r && e[n].push(...r);
          break;
        }
        case "enter":
        case "exit": {
          const r = t[n];
          r && Object.assign(e[n], r);
          break;
        }
      }
}
function Wt(e, t) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + Qe({
    start: e.start,
    end: e.end
  }) + "): a different token (`" + t.type + "`, " + Qe({
    start: t.start,
    end: t.end
  }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + Qe({
    start: t.start,
    end: t.end
  }) + ") is still open");
}
function du(e) {
  const t = this;
  t.parser = n;
  function n(r) {
    return pu(r, {
      ...t.data("settings"),
      ...e,
      // Note: these options are not in the readme.
      // The goal is for them to be set by plugins on `data` instead of being
      // passed by users.
      extensions: t.data("micromarkExtensions") || [],
      mdastExtensions: t.data("fromMarkdownExtensions") || []
    });
  }
}
function gu(e, t) {
  const n = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(t), !0)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function yu(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
}
function xu(e, t) {
  const n = t.value ? t.value + `
` : "", r = {}, i = t.lang ? t.lang.split(/\s+/) : [];
  i.length > 0 && (r.className = ["language-" + i[0]]);
  let o = {
    type: "element",
    tagName: "code",
    properties: r,
    children: [{ type: "text", value: n }]
  };
  return t.meta && (o.data = { meta: t.meta }), e.patch(t, o), o = e.applyData(t, o), o = { type: "element", tagName: "pre", properties: {}, children: [o] }, e.patch(t, o), o;
}
function ku(e, t) {
  const n = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function bu(e, t) {
  const n = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function wu(e, t) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), i = He(r.toLowerCase()), o = e.footnoteOrder.indexOf(r);
  let l, a = e.footnoteCounts.get(r);
  a === void 0 ? (a = 0, e.footnoteOrder.push(r), l = e.footnoteOrder.length) : l = o + 1, a += 1, e.footnoteCounts.set(r, a);
  const u = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + n + "fn-" + i,
      id: n + "fnref-" + i + (a > 1 ? "-" + a : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"]
    },
    children: [{ type: "text", value: String(l) }]
  };
  e.patch(t, u);
  const s = {
    type: "element",
    tagName: "sup",
    properties: {},
    children: [u]
  };
  return e.patch(t, s), e.applyData(t, s);
}
function Su(e, t) {
  const n = {
    type: "element",
    tagName: "h" + t.depth,
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Cu(e, t) {
  if (e.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return e.patch(t, n), e.applyData(t, n);
  }
}
function ti(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
    return [{ type: "text", value: "![" + t.alt + r }];
  const i = e.all(t), o = i[0];
  o && o.type === "text" ? o.value = "[" + o.value : i.unshift({ type: "text", value: "[" });
  const l = i[i.length - 1];
  return l && l.type === "text" ? l.value += r : i.push({ type: "text", value: r }), i;
}
function Eu(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return ti(e, t);
  const i = { src: He(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const o = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(t, o), e.applyData(t, o);
}
function vu(e, t) {
  const n = { src: He(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, r), e.applyData(t, r);
}
function Iu(e, t) {
  const n = { type: "text", value: t.value.replace(/\r?\n|\r/g, " ") };
  e.patch(t, n);
  const r = {
    type: "element",
    tagName: "code",
    properties: {},
    children: [n]
  };
  return e.patch(t, r), e.applyData(t, r);
}
function Tu(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r)
    return ti(e, t);
  const i = { href: He(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const o = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(t)
  };
  return e.patch(t, o), e.applyData(t, o);
}
function Au(e, t) {
  const n = { href: He(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: n,
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function Pu(e, t, n) {
  const r = e.all(t), i = n ? zu(n) : ri(t), o = {}, l = [];
  if (typeof t.checked == "boolean") {
    const f = r[0];
    let c;
    f && f.type === "element" && f.tagName === "p" ? c = f : (c = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(c)), c.children.length > 0 && c.children.unshift({ type: "text", value: " " }), c.children.unshift({
      type: "element",
      tagName: "input",
      properties: { type: "checkbox", checked: t.checked, disabled: !0 },
      children: []
    }), o.className = ["task-list-item"];
  }
  let a = -1;
  for (; ++a < r.length; ) {
    const f = r[a];
    (i || a !== 0 || f.type !== "element" || f.tagName !== "p") && l.push({ type: "text", value: `
` }), f.type === "element" && f.tagName === "p" && !i ? l.push(...f.children) : l.push(f);
  }
  const u = r[r.length - 1];
  u && (i || u.type !== "element" || u.tagName !== "p") && l.push({ type: "text", value: `
` });
  const s = { type: "element", tagName: "li", properties: o, children: l };
  return e.patch(t, s), e.applyData(t, s);
}
function zu(e) {
  let t = !1;
  if (e.type === "list") {
    t = e.spread || !1;
    const n = e.children;
    let r = -1;
    for (; !t && ++r < n.length; )
      t = ri(n[r]);
  }
  return t;
}
function ri(e) {
  const t = e.spread;
  return t ?? e.children.length > 1;
}
function Lu(e, t) {
  const n = {}, r = e.all(t);
  let i = -1;
  for (typeof t.start == "number" && t.start !== 1 && (n.start = t.start); ++i < r.length; ) {
    const l = r[i];
    if (l.type === "element" && l.tagName === "li" && l.properties && Array.isArray(l.properties.className) && l.properties.className.includes("task-list-item")) {
      n.className = ["contains-task-list"];
      break;
    }
  }
  const o = {
    type: "element",
    tagName: t.ordered ? "ol" : "ul",
    properties: n,
    children: e.wrap(r, !0)
  };
  return e.patch(t, o), e.applyData(t, o);
}
function Du(e, t) {
  const n = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Fu(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}
function _u(e, t) {
  const n = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
function Ru(e, t) {
  const n = e.all(t), r = n.shift(), i = [];
  if (r) {
    const l = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([r], !0)
    };
    e.patch(t.children[0], l), i.push(l);
  }
  if (n.length > 0) {
    const l = {
      type: "element",
      tagName: "tbody",
      properties: {},
      children: e.wrap(n, !0)
    }, a = tt(t.children[1]), u = Or(t.children[t.children.length - 1]);
    a && u && (l.position = { start: a, end: u }), i.push(l);
  }
  const o = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(i, !0)
  };
  return e.patch(t, o), e.applyData(t, o);
}
function Ou(e, t, n) {
  const r = n ? n.children : void 0, o = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", l = n && n.type === "table" ? n.align : void 0, a = l ? l.length : t.children.length;
  let u = -1;
  const s = [];
  for (; ++u < a; ) {
    const c = t.children[u], h = {}, p = l ? l[u] : void 0;
    p && (h.align = p);
    let m = { type: "element", tagName: o, properties: h, children: [] };
    c && (m.children = e.all(c), e.patch(c, m), m = e.applyData(c, m)), s.push(m);
  }
  const f = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(s, !0)
  };
  return e.patch(t, f), e.applyData(t, f);
}
function Nu(e, t) {
  const n = {
    type: "element",
    tagName: "td",
    // Assume body cell.
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, n), e.applyData(t, n);
}
const Qt = 9, Yt = 32;
function Mu(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let r = n.exec(t), i = 0;
  const o = [];
  for (; r; )
    o.push(
      Xt(t.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(t);
  return o.push(Xt(t.slice(i), i > 0, !1)), o.join("");
}
function Xt(e, t, n) {
  let r = 0, i = e.length;
  if (t) {
    let o = e.codePointAt(r);
    for (; o === Qt || o === Yt; )
      r++, o = e.codePointAt(r);
  }
  if (n) {
    let o = e.codePointAt(i - 1);
    for (; o === Qt || o === Yt; )
      i--, o = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function Bu(e, t) {
  const n = { type: "text", value: Mu(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}
function ju(e, t) {
  const n = {
    type: "element",
    tagName: "hr",
    properties: {},
    children: []
  };
  return e.patch(t, n), e.applyData(t, n);
}
const $u = {
  blockquote: gu,
  break: yu,
  code: xu,
  delete: ku,
  emphasis: bu,
  footnoteReference: wu,
  heading: Su,
  html: Cu,
  imageReference: Eu,
  image: vu,
  inlineCode: Iu,
  linkReference: Tu,
  link: Au,
  listItem: Pu,
  list: Lu,
  paragraph: Du,
  // @ts-expect-error: root is different, but hard to type.
  root: Fu,
  strong: _u,
  table: Ru,
  tableCell: Nu,
  tableRow: Ou,
  text: Bu,
  thematicBreak: ju,
  toml: on,
  yaml: on,
  definition: on,
  footnoteDefinition: on
};
function on() {
}
const ii = -1, Sn = 0, Xe = 1, gn = 2, st = 3, ct = 4, ft = 5, pt = 6, li = 7, oi = 8, ai = typeof self == "object" ? self : globalThis, Gt = (e, t) => {
  switch (e) {
    case "Function":
    case "SharedWorker":
    case "Worker":
    case "eval":
    case "setInterval":
    case "setTimeout":
      throw new TypeError("unable to deserialize " + e);
  }
  return new ai[e](t);
}, Hu = (e, t) => {
  const n = (i, o) => (e.set(o, i), i), r = (i) => {
    if (e.has(i))
      return e.get(i);
    const [o, l] = t[i];
    switch (o) {
      case Sn:
      case ii:
        return n(l, i);
      case Xe: {
        const a = n([], i);
        for (const u of l)
          a.push(r(u));
        return a;
      }
      case gn: {
        const a = n({}, i);
        for (const [u, s] of l)
          a[r(u)] = r(s);
        return a;
      }
      case st:
        return n(new Date(l), i);
      case ct: {
        const { source: a, flags: u } = l;
        return n(new RegExp(a, u), i);
      }
      case ft: {
        const a = n(/* @__PURE__ */ new Map(), i);
        for (const [u, s] of l)
          a.set(r(u), r(s));
        return a;
      }
      case pt: {
        const a = n(/* @__PURE__ */ new Set(), i);
        for (const u of l)
          a.add(r(u));
        return a;
      }
      case li: {
        const { name: a, message: u } = l;
        return n(
          typeof ai[a] == "function" ? Gt(a, u) : new Error(u),
          i
        );
      }
      case oi:
        return n(BigInt(l), i);
      case "BigInt":
        return n(Object(BigInt(l)), i);
      case "ArrayBuffer":
        return n(new Uint8Array(l).buffer, l);
      case "DataView": {
        const { buffer: a } = new Uint8Array(l);
        return n(new DataView(a), l);
      }
    }
    return n(Gt(o, l), i);
  };
  return r;
}, Jt = (e) => Hu(/* @__PURE__ */ new Map(), e)(0), Fe = "", { toString: Uu } = {}, { keys: Vu } = Object, We = (e) => {
  const t = typeof e;
  if (t !== "object" || !e)
    return [Sn, t];
  const n = Uu.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [Xe, Fe];
    case "Object":
      return [gn, Fe];
    case "Date":
      return [st, Fe];
    case "RegExp":
      return [ct, Fe];
    case "Map":
      return [ft, Fe];
    case "Set":
      return [pt, Fe];
    case "DataView":
      return [Xe, n];
  }
  return n.includes("Array") ? [Xe, n] : e instanceof Error ? [li, e.name || "Error"] : [gn, n];
}, an = ([e, t]) => e === Sn && (t === "function" || t === "symbol"), qu = (e, t, n, r) => {
  const i = (l, a) => {
    const u = r.push(l) - 1;
    return n.set(a, u), u;
  }, o = (l) => {
    if (n.has(l))
      return n.get(l);
    let [a, u] = We(l);
    switch (a) {
      case Sn: {
        let f = l;
        switch (u) {
          case "bigint":
            a = oi, f = l.toString();
            break;
          case "function":
          case "symbol":
            if (e)
              throw new TypeError("unable to serialize " + u);
            f = null;
            break;
          case "undefined":
            return i([ii], l);
        }
        return i([a, f], l);
      }
      case Xe: {
        if (u) {
          let h = l;
          return u === "DataView" ? h = new Uint8Array(l.buffer) : u === "ArrayBuffer" && (h = new Uint8Array(l)), i([u, [...h]], l);
        }
        const f = [], c = i([a, f], l);
        for (const h of l)
          f.push(o(h));
        return c;
      }
      case gn: {
        if (u)
          switch (u) {
            case "BigInt":
              return i([u, l.toString()], l);
            case "Boolean":
            case "Number":
            case "String":
              return i([u, l.valueOf()], l);
          }
        if (t && "toJSON" in l)
          return o(l.toJSON());
        const f = [], c = i([a, f], l);
        for (const h of Vu(l))
          (e || !an(We(l[h]))) && f.push([o(h), o(l[h])]);
        return c;
      }
      case st:
        return i([a, isNaN(l.getTime()) ? Fe : l.toISOString()], l);
      case ct: {
        const { source: f, flags: c } = l;
        return i([a, { source: f, flags: c }], l);
      }
      case ft: {
        const f = [], c = i([a, f], l);
        for (const [h, p] of l)
          (e || !(an(We(h)) || an(We(p)))) && f.push([o(h), o(p)]);
        return c;
      }
      case pt: {
        const f = [], c = i([a, f], l);
        for (const h of l)
          (e || !an(We(h))) && f.push(o(h));
        return c;
      }
    }
    const { message: s } = l;
    return i([a, { name: u, message: s }], l);
  };
  return o;
}, Kt = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return qu(!(t || n), !!t, /* @__PURE__ */ new Map(), r)(e), r;
}, yn = typeof structuredClone == "function" ? (
  /* c8 ignore start */
  (e, t) => t && ("json" in t || "lossy" in t) ? Jt(Kt(e, t)) : structuredClone(e)
) : (e, t) => Jt(Kt(e, t));
function Wu(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({
    type: "element",
    tagName: "sup",
    properties: {},
    children: [{ type: "text", value: String(t) }]
  }), n;
}
function Qu(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
function Yu(e) {
  const t = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", n = e.options.footnoteBackContent || Wu, r = e.options.footnoteBackLabel || Qu, i = e.options.footnoteLabel || "Footnotes", o = e.options.footnoteLabelTagName || "h2", l = e.options.footnoteLabelProperties || {
    className: ["sr-only"]
  }, a = [];
  let u = -1;
  for (; ++u < e.footnoteOrder.length; ) {
    const s = e.footnoteById.get(
      e.footnoteOrder[u]
    );
    if (!s)
      continue;
    const f = e.all(s), c = String(s.identifier).toUpperCase(), h = He(c.toLowerCase());
    let p = 0;
    const m = [], y = e.footnoteCounts.get(c);
    for (; y !== void 0 && ++p <= y; ) {
      m.length > 0 && m.push({ type: "text", value: " " });
      let I = typeof n == "string" ? n : n(u, p);
      typeof I == "string" && (I = { type: "text", value: I }), m.push({
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + t + "fnref-" + h + (p > 1 ? "-" + p : ""),
          dataFootnoteBackref: "",
          ariaLabel: typeof r == "string" ? r : r(u, p),
          className: ["data-footnote-backref"]
        },
        children: Array.isArray(I) ? I : [I]
      });
    }
    const S = f[f.length - 1];
    if (S && S.type === "element" && S.tagName === "p") {
      const I = S.children[S.children.length - 1];
      I && I.type === "text" ? I.value += " " : S.children.push({ type: "text", value: " " }), S.children.push(...m);
    } else
      f.push(...m);
    const x = {
      type: "element",
      tagName: "li",
      properties: { id: t + "fn-" + h },
      children: e.wrap(f, !0)
    };
    e.patch(s, x), a.push(x);
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
            ...yn(l),
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
const Cn = (
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
      return Ku;
    if (typeof e == "function")
      return En(e);
    if (typeof e == "object")
      return Array.isArray(e) ? Xu(e) : (
        // Cast because `ReadonlyArray` goes into the above but `isArray`
        // narrows to `Array`.
        Gu(
          /** @type {Props} */
          e
        )
      );
    if (typeof e == "string")
      return Ju(e);
    throw new Error("Expected function, string, or object as test");
  }
);
function Xu(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = Cn(e[n]);
  return En(r);
  function r(...i) {
    let o = -1;
    for (; ++o < t.length; )
      if (t[o].apply(this, i)) return !0;
    return !1;
  }
}
function Gu(e) {
  const t = (
    /** @type {Record<string, unknown>} */
    e
  );
  return En(n);
  function n(r) {
    const i = (
      /** @type {Record<string, unknown>} */
      /** @type {unknown} */
      r
    );
    let o;
    for (o in e)
      if (i[o] !== t[o]) return !1;
    return !0;
  }
}
function Ju(e) {
  return En(t);
  function t(n) {
    return n && n.type === e;
  }
}
function En(e) {
  return t;
  function t(n, r, i) {
    return !!(Zu(n) && e.call(
      this,
      n,
      typeof r == "number" ? r : void 0,
      i || void 0
    ));
  }
}
function Ku() {
  return !0;
}
function Zu(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const ui = [], es = !0, Yn = !1, ns = "skip";
function si(e, t, n, r) {
  let i;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : i = t;
  const o = Cn(i), l = r ? -1 : 1;
  a(e, void 0, [])();
  function a(u, s, f) {
    const c = (
      /** @type {Record<string, unknown>} */
      u && typeof u == "object" ? u : {}
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
        value: "node (" + (u.type + (p ? "<" + p + ">" : "")) + ")"
      });
    }
    return h;
    function h() {
      let p = ui, m, y, S;
      if ((!t || o(u, s, f[f.length - 1] || void 0)) && (p = ts(n(u, f)), p[0] === Yn))
        return p;
      if ("children" in u && u.children) {
        const x = (
          /** @type {UnistParent} */
          u
        );
        if (x.children && p[0] !== ns)
          for (y = (r ? x.children.length : -1) + l, S = f.concat(x); y > -1 && y < x.children.length; ) {
            const I = x.children[y];
            if (m = a(I, y, S)(), m[0] === Yn)
              return m;
            y = typeof m[1] == "number" ? m[1] : y + l;
          }
      }
      return p;
    }
  }
}
function ts(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [es, e] : e == null ? ui : [e];
}
function ht(e, t, n, r) {
  let i, o, l;
  typeof t == "function" && typeof n != "function" ? (o = void 0, l = t, i = n) : (o = t, l = n, i = r), si(e, o, a, i);
  function a(u, s) {
    const f = s[s.length - 1], c = f ? f.children.indexOf(u) : void 0;
    return l(u, c, f);
  }
}
const Xn = {}.hasOwnProperty, rs = {};
function is(e, t) {
  const n = t || rs, r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), l = { ...$u, ...n.handlers }, a = {
    all: s,
    applyData: os,
    definitionById: r,
    footnoteById: i,
    footnoteCounts: o,
    footnoteOrder: [],
    handlers: l,
    one: u,
    options: n,
    patch: ls,
    wrap: us
  };
  return ht(e, function(f) {
    if (f.type === "definition" || f.type === "footnoteDefinition") {
      const c = f.type === "definition" ? r : i, h = String(f.identifier).toUpperCase();
      c.has(h) || c.set(h, f);
    }
  }), a;
  function u(f, c) {
    const h = f.type, p = a.handlers[h];
    if (Xn.call(a.handlers, h) && p)
      return p(a, f, c);
    if (a.options.passThrough && a.options.passThrough.includes(h)) {
      if ("children" in f) {
        const { children: y, ...S } = f, x = yn(S);
        return x.children = a.all(f), x;
      }
      return yn(f);
    }
    return (a.options.unknownHandler || as)(a, f, c);
  }
  function s(f) {
    const c = [];
    if ("children" in f) {
      const h = f.children;
      let p = -1;
      for (; ++p < h.length; ) {
        const m = a.one(h[p], f);
        if (m) {
          if (p && h[p - 1].type === "break" && (!Array.isArray(m) && m.type === "text" && (m.value = Zt(m.value)), !Array.isArray(m) && m.type === "element")) {
            const y = m.children[0];
            y && y.type === "text" && (y.value = Zt(y.value));
          }
          Array.isArray(m) ? c.push(...m) : c.push(m);
        }
      }
    }
    return c;
  }
}
function ls(e, t) {
  e.position && (t.position = Wl(e));
}
function os(e, t) {
  let n = t;
  if (e && e.data) {
    const r = e.data.hName, i = e.data.hChildren, o = e.data.hProperties;
    if (typeof r == "string")
      if (n.type === "element")
        n.tagName = r;
      else {
        const l = "children" in n ? n.children : [n];
        n = { type: "element", tagName: r, properties: {}, children: l };
      }
    n.type === "element" && o && Object.assign(n.properties, yn(o)), "children" in n && n.children && i !== null && i !== void 0 && (n.children = i);
  }
  return n;
}
function as(e, t) {
  const n = t.data || {}, r = "value" in t && !(Xn.call(n, "hProperties") || Xn.call(n, "hChildren")) ? { type: "text", value: t.value } : {
    type: "element",
    tagName: "div",
    properties: {},
    children: e.all(t)
  };
  return e.patch(t, r), e.applyData(t, r);
}
function us(e, t) {
  const n = [];
  let r = -1;
  for (t && n.push({ type: "text", value: `
` }); ++r < e.length; )
    r && n.push({ type: "text", value: `
` }), n.push(e[r]);
  return t && e.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function Zt(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; )
    t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function er(e, t) {
  const n = is(e, t), r = n.one(e, void 0), i = Yu(n), o = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return i && o.children.push({ type: "text", value: `
` }, i), o;
}
function ss(e, t) {
  return e && "run" in e ? async function(n, r) {
    const i = (
      /** @type {HastRoot} */
      er(n, { file: r, ...t })
    );
    await e.run(i, r);
  } : function(n, r) {
    return (
      /** @type {HastRoot} */
      er(n, { file: r, ...e || t })
    );
  };
}
function nr(e) {
  if (e)
    throw e;
}
var fn = Object.prototype.hasOwnProperty, ci = Object.prototype.toString, tr = Object.defineProperty, rr = Object.getOwnPropertyDescriptor, ir = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : ci.call(t) === "[object Array]";
}, lr = function(t) {
  if (!t || ci.call(t) !== "[object Object]")
    return !1;
  var n = fn.call(t, "constructor"), r = t.constructor && t.constructor.prototype && fn.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || fn.call(t, i);
}, or = function(t, n) {
  tr && n.name === "__proto__" ? tr(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, ar = function(t, n) {
  if (n === "__proto__")
    if (fn.call(t, n)) {
      if (rr)
        return rr(t, n).value;
    } else return;
  return t[n];
}, cs = function e() {
  var t, n, r, i, o, l, a = arguments[0], u = 1, s = arguments.length, f = !1;
  for (typeof a == "boolean" && (f = a, a = arguments[1] || {}, u = 2), (a == null || typeof a != "object" && typeof a != "function") && (a = {}); u < s; ++u)
    if (t = arguments[u], t != null)
      for (n in t)
        r = ar(a, n), i = ar(t, n), a !== i && (f && i && (lr(i) || (o = ir(i))) ? (o ? (o = !1, l = r && ir(r) ? r : []) : l = r && lr(r) ? r : {}, or(a, { name: n, newValue: e(f, l, i) })) : typeof i < "u" && or(a, { name: n, newValue: i }));
  return a;
};
const zn = /* @__PURE__ */ Rr(cs);
function Gn(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function fs() {
  const e = [], t = { run: n, use: r };
  return t;
  function n(...i) {
    let o = -1;
    const l = i.pop();
    if (typeof l != "function")
      throw new TypeError("Expected function as last argument, not " + l);
    a(null, ...i);
    function a(u, ...s) {
      const f = e[++o];
      let c = -1;
      if (u) {
        l(u);
        return;
      }
      for (; ++c < i.length; )
        (s[c] === null || s[c] === void 0) && (s[c] = i[c]);
      i = s, f ? ps(f, a)(...s) : l(null, ...s);
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + i
      );
    return e.push(i), t;
  }
}
function ps(e, t) {
  let n;
  return r;
  function r(...l) {
    const a = e.length > l.length;
    let u;
    a && l.push(i);
    try {
      u = e.apply(this, l);
    } catch (s) {
      const f = (
        /** @type {Error} */
        s
      );
      if (a && n)
        throw f;
      return i(f);
    }
    a || (u && u.then && typeof u.then == "function" ? u.then(o, i) : u instanceof Error ? i(u) : o(u));
  }
  function i(l, ...a) {
    n || (n = !0, t(l, ...a));
  }
  function o(l) {
    i(null, l);
  }
}
const ke = { basename: hs, dirname: ms, extname: ds, join: gs, sep: "/" };
function hs(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  nn(e);
  let n = 0, r = -1, i = e.length, o;
  if (t === void 0 || t.length === 0 || t.length > e.length) {
    for (; i--; )
      if (e.codePointAt(i) === 47) {
        if (o) {
          n = i + 1;
          break;
        }
      } else r < 0 && (o = !0, r = i + 1);
    return r < 0 ? "" : e.slice(n, r);
  }
  if (t === e)
    return "";
  let l = -1, a = t.length - 1;
  for (; i--; )
    if (e.codePointAt(i) === 47) {
      if (o) {
        n = i + 1;
        break;
      }
    } else
      l < 0 && (o = !0, l = i + 1), a > -1 && (e.codePointAt(i) === t.codePointAt(a--) ? a < 0 && (r = i) : (a = -1, r = l));
  return n === r ? r = l : r < 0 && (r = e.length), e.slice(n, r);
}
function ms(e) {
  if (nn(e), e.length === 0)
    return ".";
  let t = -1, n = e.length, r;
  for (; --n; )
    if (e.codePointAt(n) === 47) {
      if (r) {
        t = n;
        break;
      }
    } else r || (r = !0);
  return t < 0 ? e.codePointAt(0) === 47 ? "/" : "." : t === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, t);
}
function ds(e) {
  nn(e);
  let t = e.length, n = -1, r = 0, i = -1, o = 0, l;
  for (; t--; ) {
    const a = e.codePointAt(t);
    if (a === 47) {
      if (l) {
        r = t + 1;
        break;
      }
      continue;
    }
    n < 0 && (l = !0, n = t + 1), a === 46 ? i < 0 ? i = t : o !== 1 && (o = 1) : i > -1 && (o = -1);
  }
  return i < 0 || n < 0 || // We saw a non-dot character immediately before the dot.
  o === 0 || // The (right-most) trimmed path component is exactly `..`.
  o === 1 && i === n - 1 && i === r + 1 ? "" : e.slice(i, n);
}
function gs(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    nn(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : ys(n);
}
function ys(e) {
  nn(e);
  const t = e.codePointAt(0) === 47;
  let n = xs(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.codePointAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function xs(e, t) {
  let n = "", r = 0, i = -1, o = 0, l = -1, a, u;
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
        if (n.length < 2 || r !== 2 || n.codePointAt(n.length - 1) !== 46 || n.codePointAt(n.length - 2) !== 46) {
          if (n.length > 2) {
            if (u = n.lastIndexOf("/"), u !== n.length - 1) {
              u < 0 ? (n = "", r = 0) : (n = n.slice(0, u), r = n.length - 1 - n.lastIndexOf("/")), i = l, o = 0;
              continue;
            }
          } else if (n.length > 0) {
            n = "", r = 0, i = l, o = 0;
            continue;
          }
        }
        t && (n = n.length > 0 ? n + "/.." : "..", r = 2);
      } else
        n.length > 0 ? n += "/" + e.slice(i + 1, l) : n = e.slice(i + 1, l), r = l - i - 1;
      i = l, o = 0;
    } else a === 46 && o > -1 ? o++ : o = -1;
  }
  return n;
}
function nn(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const ks = { cwd: bs };
function bs() {
  return "/";
}
function Jn(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && // @ts-expect-error: indexing is fine.
  e.auth === void 0);
}
function ws(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!Jn(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return Ss(e);
}
function Ss(e) {
  if (e.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw r.code = "ERR_INVALID_FILE_URL_HOST", r;
  }
  const t = e.pathname;
  let n = -1;
  for (; ++n < t.length; )
    if (t.codePointAt(n) === 37 && t.codePointAt(n + 1) === 50) {
      const r = t.codePointAt(n + 2);
      if (r === 70 || r === 102) {
        const i = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw i.code = "ERR_INVALID_FILE_URL_PATH", i;
      }
    }
  return decodeURIComponent(t);
}
const Ln = (
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
class fi {
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
  constructor(t) {
    let n;
    t ? Jn(t) ? n = { path: t } : typeof t == "string" || Cs(t) ? n = { value: t } : n = t : n = {}, this.cwd = "cwd" in n ? "" : ks.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let r = -1;
    for (; ++r < Ln.length; ) {
      const o = Ln[r];
      o in n && n[o] !== void 0 && n[o] !== null && (this[o] = o === "history" ? [...n[o]] : n[o]);
    }
    let i;
    for (i in n)
      Ln.includes(i) || (this[i] = n[i]);
  }
  /**
   * Get the basename (including extname) (example: `'index.min.js'`).
   *
   * @returns {string | undefined}
   *   Basename.
   */
  get basename() {
    return typeof this.path == "string" ? ke.basename(this.path) : void 0;
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
  set basename(t) {
    Fn(t, "basename"), Dn(t, "basename"), this.path = ke.join(this.dirname || "", t);
  }
  /**
   * Get the parent path (example: `'~'`).
   *
   * @returns {string | undefined}
   *   Dirname.
   */
  get dirname() {
    return typeof this.path == "string" ? ke.dirname(this.path) : void 0;
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
  set dirname(t) {
    ur(this.basename, "dirname"), this.path = ke.join(t || "", this.basename);
  }
  /**
   * Get the extname (including dot) (example: `'.js'`).
   *
   * @returns {string | undefined}
   *   Extname.
   */
  get extname() {
    return typeof this.path == "string" ? ke.extname(this.path) : void 0;
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
  set extname(t) {
    if (Dn(t, "extname"), ur(this.dirname, "extname"), t) {
      if (t.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = ke.join(this.dirname, this.stem + (t || ""));
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
  set path(t) {
    Jn(t) && (t = ws(t)), Fn(t, "path"), this.path !== t && this.history.push(t);
  }
  /**
   * Get the stem (basename w/o extname) (example: `'index.min'`).
   *
   * @returns {string | undefined}
   *   Stem.
   */
  get stem() {
    return typeof this.path == "string" ? ke.basename(this.path, this.extname) : void 0;
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
  set stem(t) {
    Fn(t, "stem"), Dn(t, "stem"), this.path = ke.join(this.dirname || "", t + (this.extname || ""));
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
  fail(t, n, r) {
    const i = this.message(t, n, r);
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
  info(t, n, r) {
    const i = this.message(t, n, r);
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
  message(t, n, r) {
    const i = new ie(
      // @ts-expect-error: the overloads are fine.
      t,
      n,
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
  toString(t) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(t || void 0).decode(this.value);
  }
}
function Dn(e, t) {
  if (e && e.includes(ke.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + ke.sep + "`"
    );
}
function Fn(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function ur(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
function Cs(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const Es = (
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
), vs = {}.hasOwnProperty;
class mt extends Es {
  /**
   * Create a processor.
   */
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = fs();
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
    const t = (
      /** @type {Processor<ParseTree, HeadTree, TailTree, CompileTree, CompileResult>} */
      new mt()
    );
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return t.data(zn(!0, {}, this.namespace)), t;
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
  data(t, n) {
    return typeof t == "string" ? arguments.length === 2 ? (On("data", this.frozen), this.namespace[t] = n, this) : vs.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (On("data", this.frozen), this.namespace = t, this) : this.namespace;
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
    const t = (
      /** @type {Processor} */
      /** @type {unknown} */
      this
    );
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [n, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1)
        continue;
      r[0] === !0 && (r[0] = void 0);
      const i = n.call(t, ...r);
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
  parse(t) {
    this.freeze();
    const n = un(t), r = this.parser || this.Parser;
    return _n("parse", r), r(String(n), n);
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
  process(t, n) {
    const r = this;
    return this.freeze(), _n("process", this.parser || this.Parser), Rn("process", this.compiler || this.Compiler), n ? i(void 0, n) : new Promise(i);
    function i(o, l) {
      const a = un(t), u = (
        /** @type {HeadTree extends undefined ? Node : HeadTree} */
        /** @type {unknown} */
        r.parse(a)
      );
      r.run(u, a, function(f, c, h) {
        if (f || !c || !h)
          return s(f);
        const p = (
          /** @type {CompileTree extends undefined ? Node : CompileTree} */
          /** @type {unknown} */
          c
        ), m = r.stringify(p, h);
        As(m) ? h.value = m : h.result = m, s(
          f,
          /** @type {VFileWithOutput<CompileResult>} */
          h
        );
      });
      function s(f, c) {
        f || !c ? l(f) : o ? o(c) : n(void 0, c);
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
  processSync(t) {
    let n = !1, r;
    return this.freeze(), _n("processSync", this.parser || this.Parser), Rn("processSync", this.compiler || this.Compiler), this.process(t, i), cr("processSync", "process", n), r;
    function i(o, l) {
      n = !0, nr(o), r = l;
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
  run(t, n, r) {
    sr(t), this.freeze();
    const i = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? o(void 0, r) : new Promise(o);
    function o(l, a) {
      const u = un(n);
      i.run(t, u, s);
      function s(f, c, h) {
        const p = (
          /** @type {TailTree extends undefined ? Node : TailTree} */
          c || t
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
  runSync(t, n) {
    let r = !1, i;
    return this.run(t, n, o), cr("runSync", "run", r), i;
    function o(l, a) {
      nr(l), i = a, r = !0;
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
  stringify(t, n) {
    this.freeze();
    const r = un(n), i = this.compiler || this.Compiler;
    return Rn("stringify", i), sr(t), i(t, r);
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
  use(t, ...n) {
    const r = this.attachers, i = this.namespace;
    if (On("use", this.frozen), t != null) if (typeof t == "function")
      u(t, n);
    else if (typeof t == "object")
      Array.isArray(t) ? a(t) : l(t);
    else
      throw new TypeError("Expected usable value, not `" + t + "`");
    return this;
    function o(s) {
      if (typeof s == "function")
        u(s, []);
      else if (typeof s == "object")
        if (Array.isArray(s)) {
          const [f, ...c] = (
            /** @type {PluginTuple<Array<unknown>>} */
            s
          );
          u(f, c);
        } else
          l(s);
      else
        throw new TypeError("Expected usable value, not `" + s + "`");
    }
    function l(s) {
      if (!("plugins" in s) && !("settings" in s))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      a(s.plugins), s.settings && (i.settings = zn(!0, i.settings, s.settings));
    }
    function a(s) {
      let f = -1;
      if (s != null) if (Array.isArray(s))
        for (; ++f < s.length; ) {
          const c = s[f];
          o(c);
        }
      else
        throw new TypeError("Expected a list of plugins, not `" + s + "`");
    }
    function u(s, f) {
      let c = -1, h = -1;
      for (; ++c < r.length; )
        if (r[c][0] === s) {
          h = c;
          break;
        }
      if (h === -1)
        r.push([s, ...f]);
      else if (f.length > 0) {
        let [p, ...m] = f;
        const y = r[h][1];
        Gn(y) && Gn(p) && (p = zn(!0, y, p)), r[h] = [s, p, ...m];
      }
    }
  }
}
const Is = new mt().freeze();
function _n(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function Rn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function On(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function sr(e) {
  if (!Gn(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function cr(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function un(e) {
  return Ts(e) ? e : new fi(e);
}
function Ts(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function As(e) {
  return typeof e == "string" || Ps(e);
}
function Ps(e) {
  return !!(e && typeof e == "object" && "byteLength" in e && "byteOffset" in e);
}
const zs = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", fr = [], pr = { allowDangerousHtml: !0 }, Ls = /^(https?|ircs?|mailto|xmpp)$/i, Ds = [
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
function Fs(e) {
  const t = _s(e), n = Rs(e);
  return Os(t.runSync(t.parse(n), n), e);
}
function _s(e) {
  const t = e.rehypePlugins || fr, n = e.remarkPlugins || fr, r = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...pr } : pr;
  return Is().use(du).use(n).use(ss, r).use(t);
}
function Rs(e) {
  const t = e.children || "", n = new fi();
  return typeof t == "string" && (n.value = t), n;
}
function Os(e, t) {
  const n = t.allowedElements, r = t.allowElement, i = t.components, o = t.disallowedElements, l = t.skipHtml, a = t.unwrapDisallowed, u = t.urlTransform || Ns;
  for (const f of Ds)
    Object.hasOwn(t, f.from) && ("" + f.from + (f.to ? "use `" + f.to + "` instead" : "remove it") + zs + f.id, void 0);
  return ht(e, s), Jl(e, {
    Fragment: pn,
    components: i,
    ignoreInvalidStyle: !0,
    jsx: P,
    jsxs: q,
    passKeys: !0,
    passNode: !0
  });
  function s(f, c, h) {
    if (f.type === "raw" && h && typeof c == "number")
      return l ? h.children.splice(c, 1) : h.children[c] = { type: "text", value: f.value }, c;
    if (f.type === "element") {
      let p;
      for (p in Tn)
        if (Object.hasOwn(Tn, p) && Object.hasOwn(f.properties, p)) {
          const m = f.properties[p], y = Tn[p];
          (y === null || y.includes(f.tagName)) && (f.properties[p] = u(String(m || ""), p, f));
        }
    }
    if (f.type === "element") {
      let p = n ? !n.includes(f.tagName) : o ? o.includes(f.tagName) : !1;
      if (!p && r && typeof c == "number" && (p = !r(f, c, h)), p && h && typeof c == "number")
        return a && f.children ? h.children.splice(c, 1, ...f.children) : h.children.splice(c, 1), c;
    }
  }
}
function Ns(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), i = e.indexOf("/");
  return (
    // If there is no protocol, it’s relative.
    t === -1 || // If the first colon is after a `?`, `#`, or `/`, it’s not a protocol.
    i !== -1 && t > i || n !== -1 && t > n || r !== -1 && t > r || // It is a protocol, it should be allowed.
    Ls.test(e.slice(0, t)) ? e : ""
  );
}
function hr(e, t) {
  const n = String(e);
  if (typeof t != "string")
    throw new TypeError("Expected character");
  let r = 0, i = n.indexOf(t);
  for (; i !== -1; )
    r++, i = n.indexOf(t, i + t.length);
  return r;
}
function Ms(e) {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function Bs(e, t, n) {
  const i = Cn((n || {}).ignore || []), o = js(t);
  let l = -1;
  for (; ++l < o.length; )
    si(e, "text", a);
  function a(s, f) {
    let c = -1, h;
    for (; ++c < f.length; ) {
      const p = f[c], m = h ? h.children : void 0;
      if (i(
        p,
        m ? m.indexOf(p) : void 0,
        h
      ))
        return;
      h = p;
    }
    if (h)
      return u(s, f);
  }
  function u(s, f) {
    const c = f[f.length - 1], h = o[l][0], p = o[l][1];
    let m = 0;
    const S = c.children.indexOf(s);
    let x = !1, I = [];
    h.lastIndex = 0;
    let E = h.exec(s.value);
    for (; E; ) {
      const R = E.index, _ = {
        index: E.index,
        input: E.input,
        stack: [...f, s]
      };
      let w = p(...E, _);
      if (typeof w == "string" && (w = w.length > 0 ? { type: "text", value: w } : void 0), w === !1 ? h.lastIndex = R + 1 : (m !== R && I.push({
        type: "text",
        value: s.value.slice(m, R)
      }), Array.isArray(w) ? I.push(...w) : w && I.push(w), m = R + E[0].length, x = !0), !h.global)
        break;
      E = h.exec(s.value);
    }
    return x ? (m < s.value.length && I.push({ type: "text", value: s.value.slice(m) }), c.children.splice(S, 1, ...I)) : I = [s], S + I.length;
  }
}
function js(e) {
  const t = [];
  if (!Array.isArray(e))
    throw new TypeError("Expected find and replace tuple or list of tuples");
  const n = !e[0] || Array.isArray(e[0]) ? e : [e];
  let r = -1;
  for (; ++r < n.length; ) {
    const i = n[r];
    t.push([$s(i[0]), Hs(i[1])]);
  }
  return t;
}
function $s(e) {
  return typeof e == "string" ? new RegExp(Ms(e), "g") : e;
}
function Hs(e) {
  return typeof e == "function" ? e : function() {
    return e;
  };
}
const Nn = "phrasing", Mn = ["autolink", "link", "image", "label"];
function Us() {
  return {
    transforms: [Gs],
    enter: {
      literalAutolink: qs,
      literalAutolinkEmail: Bn,
      literalAutolinkHttp: Bn,
      literalAutolinkWww: Bn
    },
    exit: {
      literalAutolink: Xs,
      literalAutolinkEmail: Ys,
      literalAutolinkHttp: Ws,
      literalAutolinkWww: Qs
    }
  };
}
function Vs() {
  return {
    unsafe: [
      {
        character: "@",
        before: "[+\\-.\\w]",
        after: "[\\-.\\w]",
        inConstruct: Nn,
        notInConstruct: Mn
      },
      {
        character: ".",
        before: "[Ww]",
        after: "[\\-.\\w]",
        inConstruct: Nn,
        notInConstruct: Mn
      },
      {
        character: ":",
        before: "[ps]",
        after: "\\/",
        inConstruct: Nn,
        notInConstruct: Mn
      }
    ]
  };
}
function qs(e) {
  this.enter({ type: "link", title: null, url: "", children: [] }, e);
}
function Bn(e) {
  this.config.enter.autolinkProtocol.call(this, e);
}
function Ws(e) {
  this.config.exit.autolinkProtocol.call(this, e);
}
function Qs(e) {
  this.config.exit.data.call(this, e);
  const t = this.stack[this.stack.length - 1];
  t.type, t.url = "http://" + this.sliceSerialize(e);
}
function Ys(e) {
  this.config.exit.autolinkEmail.call(this, e);
}
function Xs(e) {
  this.exit(e);
}
function Gs(e) {
  Bs(
    e,
    [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, Js],
      [new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)", "gu"), Ks]
    ],
    { ignore: ["link", "linkReference"] }
  );
}
function Js(e, t, n, r, i) {
  let o = "";
  if (!pi(i) || (/^w/i.test(t) && (n = t + n, t = "", o = "http://"), !Zs(n)))
    return !1;
  const l = ec(n + r);
  if (!l[0]) return !1;
  const a = {
    type: "link",
    title: null,
    url: o + t + l[0],
    children: [{ type: "text", value: t + l[0] }]
  };
  return l[1] ? [a, { type: "text", value: l[1] }] : a;
}
function Ks(e, t, n, r) {
  return (
    // Not an expected previous character.
    !pi(r, !0) || // Label ends in not allowed character.
    /[-\d_]$/.test(n) ? !1 : {
      type: "link",
      title: null,
      url: "mailto:" + t + "@" + n,
      children: [{ type: "text", value: t + "@" + n }]
    }
  );
}
function Zs(e) {
  const t = e.split(".");
  return !(t.length < 2 || t[t.length - 1] && (/_/.test(t[t.length - 1]) || !/[a-zA-Z\d]/.test(t[t.length - 1])) || t[t.length - 2] && (/_/.test(t[t.length - 2]) || !/[a-zA-Z\d]/.test(t[t.length - 2])));
}
function ec(e) {
  const t = /[!"&'),.:;<>?\]}]+$/.exec(e);
  if (!t)
    return [e, void 0];
  e = e.slice(0, t.index);
  let n = t[0], r = n.indexOf(")");
  const i = hr(e, "(");
  let o = hr(e, ")");
  for (; r !== -1 && i > o; )
    e += n.slice(0, r + 1), n = n.slice(r + 1), r = n.indexOf(")"), o++;
  return [e, n];
}
function pi(e, t) {
  const n = e.input.charCodeAt(e.index - 1);
  return (e.index === 0 || Oe(n) || bn(n)) && // If it’s an email, the previous character should not be a slash.
  (!t || n !== 47);
}
hi.peek = sc;
function nc() {
  this.buffer();
}
function tc(e) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, e);
}
function rc() {
  this.buffer();
}
function ic(e) {
  this.enter(
    { type: "footnoteDefinition", identifier: "", label: "", children: [] },
    e
  );
}
function lc(e) {
  const t = this.resume(), n = this.stack[this.stack.length - 1];
  n.type, n.identifier = xe(
    this.sliceSerialize(e)
  ).toLowerCase(), n.label = t;
}
function oc(e) {
  this.exit(e);
}
function ac(e) {
  const t = this.resume(), n = this.stack[this.stack.length - 1];
  n.type, n.identifier = xe(
    this.sliceSerialize(e)
  ).toLowerCase(), n.label = t;
}
function uc(e) {
  this.exit(e);
}
function sc() {
  return "[";
}
function hi(e, t, n, r) {
  const i = n.createTracker(r);
  let o = i.move("[^");
  const l = n.enter("footnoteReference"), a = n.enter("reference");
  return o += i.move(
    n.safe(n.associationId(e), { after: "]", before: o })
  ), a(), l(), o += i.move("]"), o;
}
function cc() {
  return {
    enter: {
      gfmFootnoteCallString: nc,
      gfmFootnoteCall: tc,
      gfmFootnoteDefinitionLabelString: rc,
      gfmFootnoteDefinition: ic
    },
    exit: {
      gfmFootnoteCallString: lc,
      gfmFootnoteCall: oc,
      gfmFootnoteDefinitionLabelString: ac,
      gfmFootnoteDefinition: uc
    }
  };
}
function fc(e) {
  let t = !1;
  return e && e.firstLineBlank && (t = !0), {
    handlers: { footnoteDefinition: n, footnoteReference: hi },
    // This is on by default already.
    unsafe: [{ character: "[", inConstruct: ["label", "phrasing", "reference"] }]
  };
  function n(r, i, o, l) {
    const a = o.createTracker(l);
    let u = a.move("[^");
    const s = o.enter("footnoteDefinition"), f = o.enter("label");
    return u += a.move(
      o.safe(o.associationId(r), { before: u, after: "]" })
    ), f(), u += a.move("]:"), r.children && r.children.length > 0 && (a.shift(4), u += a.move(
      (t ? `
` : " ") + o.indentLines(
        o.containerFlow(r, a.current()),
        t ? mi : pc
      )
    )), s(), u;
  }
}
function pc(e, t, n) {
  return t === 0 ? e : mi(e, t, n);
}
function mi(e, t, n) {
  return (n ? "" : "    ") + e;
}
const hc = [
  "autolink",
  "destinationLiteral",
  "destinationRaw",
  "reference",
  "titleQuote",
  "titleApostrophe"
];
di.peek = xc;
function mc() {
  return {
    canContainEols: ["delete"],
    enter: { strikethrough: gc },
    exit: { strikethrough: yc }
  };
}
function dc() {
  return {
    unsafe: [
      {
        character: "~",
        inConstruct: "phrasing",
        notInConstruct: hc
      }
    ],
    handlers: { delete: di }
  };
}
function gc(e) {
  this.enter({ type: "delete", children: [] }, e);
}
function yc(e) {
  this.exit(e);
}
function di(e, t, n, r) {
  const i = n.createTracker(r), o = n.enter("strikethrough");
  let l = i.move("~~");
  return l += n.containerPhrasing(e, {
    ...i.current(),
    before: l,
    after: "~"
  }), l += i.move("~~"), o(), l;
}
function xc() {
  return "~";
}
function kc(e) {
  return e.length;
}
function bc(e, t) {
  const n = t || {}, r = (n.align || []).concat(), i = n.stringLength || kc, o = [], l = [], a = [], u = [];
  let s = 0, f = -1;
  for (; ++f < e.length; ) {
    const y = [], S = [];
    let x = -1;
    for (e[f].length > s && (s = e[f].length); ++x < e[f].length; ) {
      const I = wc(e[f][x]);
      if (n.alignDelimiters !== !1) {
        const E = i(I);
        S[x] = E, (u[x] === void 0 || E > u[x]) && (u[x] = E);
      }
      y.push(I);
    }
    l[f] = y, a[f] = S;
  }
  let c = -1;
  if (typeof r == "object" && "length" in r)
    for (; ++c < s; )
      o[c] = mr(r[c]);
  else {
    const y = mr(r);
    for (; ++c < s; )
      o[c] = y;
  }
  c = -1;
  const h = [], p = [];
  for (; ++c < s; ) {
    const y = o[c];
    let S = "", x = "";
    y === 99 ? (S = ":", x = ":") : y === 108 ? S = ":" : y === 114 && (x = ":");
    let I = n.alignDelimiters === !1 ? 1 : Math.max(
      1,
      u[c] - S.length - x.length
    );
    const E = S + "-".repeat(I) + x;
    n.alignDelimiters !== !1 && (I = S.length + I + x.length, I > u[c] && (u[c] = I), p[c] = I), h[c] = E;
  }
  l.splice(1, 0, h), a.splice(1, 0, p), f = -1;
  const m = [];
  for (; ++f < l.length; ) {
    const y = l[f], S = a[f];
    c = -1;
    const x = [];
    for (; ++c < s; ) {
      const I = y[c] || "";
      let E = "", R = "";
      if (n.alignDelimiters !== !1) {
        const _ = u[c] - (S[c] || 0), w = o[c];
        w === 114 ? E = " ".repeat(_) : w === 99 ? _ % 2 ? (E = " ".repeat(_ / 2 + 0.5), R = " ".repeat(_ / 2 - 0.5)) : (E = " ".repeat(_ / 2), R = E) : R = " ".repeat(_);
      }
      n.delimiterStart !== !1 && !c && x.push("|"), n.padding !== !1 && // Don’t add the opening space if we’re not aligning and the cell is
      // empty: there will be a closing space.
      !(n.alignDelimiters === !1 && I === "") && (n.delimiterStart !== !1 || c) && x.push(" "), n.alignDelimiters !== !1 && x.push(E), x.push(I), n.alignDelimiters !== !1 && x.push(R), n.padding !== !1 && x.push(" "), (n.delimiterEnd !== !1 || c !== s - 1) && x.push("|");
    }
    m.push(
      n.delimiterEnd === !1 ? x.join("").replace(/ +$/, "") : x.join("")
    );
  }
  return m.join(`
`);
}
function wc(e) {
  return e == null ? "" : String(e);
}
function mr(e) {
  const t = typeof e == "string" ? e.codePointAt(0) : 0;
  return t === 67 || t === 99 ? 99 : t === 76 || t === 108 ? 108 : t === 82 || t === 114 ? 114 : 0;
}
function Sc(e, t, n, r) {
  const i = n.enter("blockquote"), o = n.createTracker(r);
  o.move("> "), o.shift(2);
  const l = n.indentLines(
    n.containerFlow(e, o.current()),
    Cc
  );
  return i(), l;
}
function Cc(e, t, n) {
  return ">" + (n ? "" : " ") + e;
}
function Ec(e, t) {
  return dr(e, t.inConstruct, !0) && !dr(e, t.notInConstruct, !1);
}
function dr(e, t, n) {
  if (typeof t == "string" && (t = [t]), !t || t.length === 0)
    return n;
  let r = -1;
  for (; ++r < t.length; )
    if (e.includes(t[r]))
      return !0;
  return !1;
}
function gr(e, t, n, r) {
  let i = -1;
  for (; ++i < n.unsafe.length; )
    if (n.unsafe[i].character === `
` && Ec(n.stack, n.unsafe[i]))
      return /[ \t]/.test(r.before) ? "" : " ";
  return `\\
`;
}
function vc(e, t) {
  const n = String(e);
  let r = n.indexOf(t), i = r, o = 0, l = 0;
  if (typeof t != "string")
    throw new TypeError("Expected substring");
  for (; r !== -1; )
    r === i ? ++o > l && (l = o) : o = 1, i = r + t.length, r = n.indexOf(t, i);
  return l;
}
function Ic(e, t) {
  return !!(t.options.fences === !1 && e.value && // If there’s no info…
  !e.lang && // And there’s a non-whitespace character…
  /[^ \r\n]/.test(e.value) && // And the value doesn’t start or end in a blank…
  !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value));
}
function Tc(e) {
  const t = e.options.fence || "`";
  if (t !== "`" && t !== "~")
    throw new Error(
      "Cannot serialize code with `" + t + "` for `options.fence`, expected `` ` `` or `~`"
    );
  return t;
}
function Ac(e, t, n, r) {
  const i = Tc(n), o = e.value || "", l = i === "`" ? "GraveAccent" : "Tilde";
  if (Ic(e, n)) {
    const c = n.enter("codeIndented"), h = n.indentLines(o, Pc);
    return c(), h;
  }
  const a = n.createTracker(r), u = i.repeat(Math.max(vc(o, i) + 1, 3)), s = n.enter("codeFenced");
  let f = a.move(u);
  if (e.lang) {
    const c = n.enter(`codeFencedLang${l}`);
    f += a.move(
      n.safe(e.lang, {
        before: f,
        after: " ",
        encode: ["`"],
        ...a.current()
      })
    ), c();
  }
  if (e.lang && e.meta) {
    const c = n.enter(`codeFencedMeta${l}`);
    f += a.move(" "), f += a.move(
      n.safe(e.meta, {
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
`)), f += a.move(u), s(), f;
}
function Pc(e, t, n) {
  return (n ? "" : "    ") + e;
}
function dt(e) {
  const t = e.options.quote || '"';
  if (t !== '"' && t !== "'")
    throw new Error(
      "Cannot serialize title with `" + t + "` for `options.quote`, expected `\"`, or `'`"
    );
  return t;
}
function zc(e, t, n, r) {
  const i = dt(n), o = i === '"' ? "Quote" : "Apostrophe", l = n.enter("definition");
  let a = n.enter("label");
  const u = n.createTracker(r);
  let s = u.move("[");
  return s += u.move(
    n.safe(n.associationId(e), {
      before: s,
      after: "]",
      ...u.current()
    })
  ), s += u.move("]: "), a(), // If there’s no url, or…
  !e.url || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (a = n.enter("destinationLiteral"), s += u.move("<"), s += u.move(
    n.safe(e.url, { before: s, after: ">", ...u.current() })
  ), s += u.move(">")) : (a = n.enter("destinationRaw"), s += u.move(
    n.safe(e.url, {
      before: s,
      after: e.title ? " " : `
`,
      ...u.current()
    })
  )), a(), e.title && (a = n.enter(`title${o}`), s += u.move(" " + i), s += u.move(
    n.safe(e.title, {
      before: s,
      after: i,
      ...u.current()
    })
  ), s += u.move(i), a()), l(), s;
}
function Lc(e) {
  const t = e.options.emphasis || "*";
  if (t !== "*" && t !== "_")
    throw new Error(
      "Cannot serialize emphasis with `" + t + "` for `options.emphasis`, expected `*`, or `_`"
    );
  return t;
}
function Ke(e) {
  return "&#x" + e.toString(16).toUpperCase() + ";";
}
function xn(e, t, n) {
  const r = je(e), i = je(t);
  return r === void 0 ? i === void 0 ? (
    // Letter inside:
    // we have to encode *both* letters for `_` as it is looser.
    // it already forms for `*` (and GFMs `~`).
    n === "_" ? { inside: !0, outside: !0 } : { inside: !1, outside: !1 }
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
gi.peek = Dc;
function gi(e, t, n, r) {
  const i = Lc(n), o = n.enter("emphasis"), l = n.createTracker(r), a = l.move(i);
  let u = l.move(
    n.containerPhrasing(e, {
      after: i,
      before: a,
      ...l.current()
    })
  );
  const s = u.charCodeAt(0), f = xn(
    r.before.charCodeAt(r.before.length - 1),
    s,
    i
  );
  f.inside && (u = Ke(s) + u.slice(1));
  const c = u.charCodeAt(u.length - 1), h = xn(r.after.charCodeAt(0), c, i);
  h.inside && (u = u.slice(0, -1) + Ke(c));
  const p = l.move(i);
  return o(), n.attentionEncodeSurroundingInfo = {
    after: h.outside,
    before: f.outside
  }, a + u + p;
}
function Dc(e, t, n) {
  return n.options.emphasis || "*";
}
function Fc(e, t) {
  let n = !1;
  return ht(e, function(r) {
    if ("value" in r && /\r?\n|\r/.test(r.value) || r.type === "break")
      return n = !0, Yn;
  }), !!((!e.depth || e.depth < 3) && ot(e) && (t.options.setext || n));
}
function _c(e, t, n, r) {
  const i = Math.max(Math.min(6, e.depth || 1), 1), o = n.createTracker(r);
  if (Fc(e, n)) {
    const f = n.enter("headingSetext"), c = n.enter("phrasing"), h = n.containerPhrasing(e, {
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
  const l = "#".repeat(i), a = n.enter("headingAtx"), u = n.enter("phrasing");
  o.move(l + " ");
  let s = n.containerPhrasing(e, {
    before: "# ",
    after: `
`,
    ...o.current()
  });
  return /^[\t ]/.test(s) && (s = Ke(s.charCodeAt(0)) + s.slice(1)), s = s ? l + " " + s : l, n.options.closeAtx && (s += " " + l), u(), a(), s;
}
yi.peek = Rc;
function yi(e) {
  return e.value || "";
}
function Rc() {
  return "<";
}
xi.peek = Oc;
function xi(e, t, n, r) {
  const i = dt(n), o = i === '"' ? "Quote" : "Apostrophe", l = n.enter("image");
  let a = n.enter("label");
  const u = n.createTracker(r);
  let s = u.move("![");
  return s += u.move(
    n.safe(e.alt, { before: s, after: "]", ...u.current() })
  ), s += u.move("]("), a(), // If there’s no url but there is a title…
  !e.url && e.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (a = n.enter("destinationLiteral"), s += u.move("<"), s += u.move(
    n.safe(e.url, { before: s, after: ">", ...u.current() })
  ), s += u.move(">")) : (a = n.enter("destinationRaw"), s += u.move(
    n.safe(e.url, {
      before: s,
      after: e.title ? " " : ")",
      ...u.current()
    })
  )), a(), e.title && (a = n.enter(`title${o}`), s += u.move(" " + i), s += u.move(
    n.safe(e.title, {
      before: s,
      after: i,
      ...u.current()
    })
  ), s += u.move(i), a()), s += u.move(")"), l(), s;
}
function Oc() {
  return "!";
}
ki.peek = Nc;
function ki(e, t, n, r) {
  const i = e.referenceType, o = n.enter("imageReference");
  let l = n.enter("label");
  const a = n.createTracker(r);
  let u = a.move("![");
  const s = n.safe(e.alt, {
    before: u,
    after: "]",
    ...a.current()
  });
  u += a.move(s + "]["), l();
  const f = n.stack;
  n.stack = [], l = n.enter("reference");
  const c = n.safe(n.associationId(e), {
    before: u,
    after: "]",
    ...a.current()
  });
  return l(), n.stack = f, o(), i === "full" || !s || s !== c ? u += a.move(c + "]") : i === "shortcut" ? u = u.slice(0, -1) : u += a.move("]"), u;
}
function Nc() {
  return "!";
}
bi.peek = Mc;
function bi(e, t, n) {
  let r = e.value || "", i = "`", o = -1;
  for (; new RegExp("(^|[^`])" + i + "([^`]|$)").test(r); )
    i += "`";
  for (/[^ \r\n]/.test(r) && (/^[ \r\n]/.test(r) && /[ \r\n]$/.test(r) || /^`|`$/.test(r)) && (r = " " + r + " "); ++o < n.unsafe.length; ) {
    const l = n.unsafe[o], a = n.compilePattern(l);
    let u;
    if (l.atBreak)
      for (; u = a.exec(r); ) {
        let s = u.index;
        r.charCodeAt(s) === 10 && r.charCodeAt(s - 1) === 13 && s--, r = r.slice(0, s) + " " + r.slice(u.index + 1);
      }
  }
  return i + r + i;
}
function Mc() {
  return "`";
}
function wi(e, t) {
  const n = ot(e);
  return !!(!t.options.resourceLink && // If there’s a url…
  e.url && // And there’s a no title…
  !e.title && // And the content of `node` is a single text node…
  e.children && e.children.length === 1 && e.children[0].type === "text" && // And if the url is the same as the content…
  (n === e.url || "mailto:" + n === e.url) && // And that starts w/ a protocol…
  /^[a-z][a-z+.-]+:/i.test(e.url) && // And that doesn’t contain ASCII control codes (character escapes and
  // references don’t work), space, or angle brackets…
  !/[\0- <>\u007F]/.test(e.url));
}
Si.peek = Bc;
function Si(e, t, n, r) {
  const i = dt(n), o = i === '"' ? "Quote" : "Apostrophe", l = n.createTracker(r);
  let a, u;
  if (wi(e, n)) {
    const f = n.stack;
    n.stack = [], a = n.enter("autolink");
    let c = l.move("<");
    return c += l.move(
      n.containerPhrasing(e, {
        before: c,
        after: ">",
        ...l.current()
      })
    ), c += l.move(">"), a(), n.stack = f, c;
  }
  a = n.enter("link"), u = n.enter("label");
  let s = l.move("[");
  return s += l.move(
    n.containerPhrasing(e, {
      before: s,
      after: "](",
      ...l.current()
    })
  ), s += l.move("]("), u(), // If there’s no url but there is a title…
  !e.url && e.title || // If there are control characters or whitespace.
  /[\0- \u007F]/.test(e.url) ? (u = n.enter("destinationLiteral"), s += l.move("<"), s += l.move(
    n.safe(e.url, { before: s, after: ">", ...l.current() })
  ), s += l.move(">")) : (u = n.enter("destinationRaw"), s += l.move(
    n.safe(e.url, {
      before: s,
      after: e.title ? " " : ")",
      ...l.current()
    })
  )), u(), e.title && (u = n.enter(`title${o}`), s += l.move(" " + i), s += l.move(
    n.safe(e.title, {
      before: s,
      after: i,
      ...l.current()
    })
  ), s += l.move(i), u()), s += l.move(")"), a(), s;
}
function Bc(e, t, n) {
  return wi(e, n) ? "<" : "[";
}
Ci.peek = jc;
function Ci(e, t, n, r) {
  const i = e.referenceType, o = n.enter("linkReference");
  let l = n.enter("label");
  const a = n.createTracker(r);
  let u = a.move("[");
  const s = n.containerPhrasing(e, {
    before: u,
    after: "]",
    ...a.current()
  });
  u += a.move(s + "]["), l();
  const f = n.stack;
  n.stack = [], l = n.enter("reference");
  const c = n.safe(n.associationId(e), {
    before: u,
    after: "]",
    ...a.current()
  });
  return l(), n.stack = f, o(), i === "full" || !s || s !== c ? u += a.move(c + "]") : i === "shortcut" ? u = u.slice(0, -1) : u += a.move("]"), u;
}
function jc() {
  return "[";
}
function gt(e) {
  const t = e.options.bullet || "*";
  if (t !== "*" && t !== "+" && t !== "-")
    throw new Error(
      "Cannot serialize items with `" + t + "` for `options.bullet`, expected `*`, `+`, or `-`"
    );
  return t;
}
function $c(e) {
  const t = gt(e), n = e.options.bulletOther;
  if (!n)
    return t === "*" ? "-" : "*";
  if (n !== "*" && n !== "+" && n !== "-")
    throw new Error(
      "Cannot serialize items with `" + n + "` for `options.bulletOther`, expected `*`, `+`, or `-`"
    );
  if (n === t)
    throw new Error(
      "Expected `bullet` (`" + t + "`) and `bulletOther` (`" + n + "`) to be different"
    );
  return n;
}
function Hc(e) {
  const t = e.options.bulletOrdered || ".";
  if (t !== "." && t !== ")")
    throw new Error(
      "Cannot serialize items with `" + t + "` for `options.bulletOrdered`, expected `.` or `)`"
    );
  return t;
}
function Ei(e) {
  const t = e.options.rule || "*";
  if (t !== "*" && t !== "-" && t !== "_")
    throw new Error(
      "Cannot serialize rules with `" + t + "` for `options.rule`, expected `*`, `-`, or `_`"
    );
  return t;
}
function Uc(e, t, n, r) {
  const i = n.enter("list"), o = n.bulletCurrent;
  let l = e.ordered ? Hc(n) : gt(n);
  const a = e.ordered ? l === "." ? ")" : "." : $c(n);
  let u = t && n.bulletLastUsed ? l === n.bulletLastUsed : !1;
  if (!e.ordered) {
    const f = e.children ? e.children[0] : void 0;
    if (
      // Bullet could be used as a thematic break marker:
      (l === "*" || l === "-") && // Empty first list item:
      f && (!f.children || !f.children[0]) && // Directly in two other list items:
      n.stack[n.stack.length - 1] === "list" && n.stack[n.stack.length - 2] === "listItem" && n.stack[n.stack.length - 3] === "list" && n.stack[n.stack.length - 4] === "listItem" && // That are each the first child.
      n.indexStack[n.indexStack.length - 1] === 0 && n.indexStack[n.indexStack.length - 2] === 0 && n.indexStack[n.indexStack.length - 3] === 0 && (u = !0), Ei(n) === l && f
    ) {
      let c = -1;
      for (; ++c < e.children.length; ) {
        const h = e.children[c];
        if (h && h.type === "listItem" && h.children && h.children[0] && h.children[0].type === "thematicBreak") {
          u = !0;
          break;
        }
      }
    }
  }
  u && (l = a), n.bulletCurrent = l;
  const s = n.containerFlow(e, r);
  return n.bulletLastUsed = l, n.bulletCurrent = o, i(), s;
}
function Vc(e) {
  const t = e.options.listItemIndent || "one";
  if (t !== "tab" && t !== "one" && t !== "mixed")
    throw new Error(
      "Cannot serialize items with `" + t + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`"
    );
  return t;
}
function qc(e, t, n, r) {
  const i = Vc(n);
  let o = n.bulletCurrent || gt(n);
  t && t.type === "list" && t.ordered && (o = (typeof t.start == "number" && t.start > -1 ? t.start : 1) + (n.options.incrementListMarker === !1 ? 0 : t.children.indexOf(e)) + o);
  let l = o.length + 1;
  (i === "tab" || i === "mixed" && (t && t.type === "list" && t.spread || e.spread)) && (l = Math.ceil(l / 4) * 4);
  const a = n.createTracker(r);
  a.move(o + " ".repeat(l - o.length)), a.shift(l);
  const u = n.enter("listItem"), s = n.indentLines(
    n.containerFlow(e, a.current()),
    f
  );
  return u(), s;
  function f(c, h, p) {
    return h ? (p ? "" : " ".repeat(l)) + c : (p ? o : o + " ".repeat(l - o.length)) + c;
  }
}
function Wc(e, t, n, r) {
  const i = n.enter("paragraph"), o = n.enter("phrasing"), l = n.containerPhrasing(e, r);
  return o(), i(), l;
}
const Qc = (
  /** @type {(node?: unknown) => node is Exclude<PhrasingContent, Html>} */
  Cn([
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
function Yc(e, t, n, r) {
  return (e.children.some(function(l) {
    return Qc(l);
  }) ? n.containerPhrasing : n.containerFlow).call(n, e, r);
}
function Xc(e) {
  const t = e.options.strong || "*";
  if (t !== "*" && t !== "_")
    throw new Error(
      "Cannot serialize strong with `" + t + "` for `options.strong`, expected `*`, or `_`"
    );
  return t;
}
vi.peek = Gc;
function vi(e, t, n, r) {
  const i = Xc(n), o = n.enter("strong"), l = n.createTracker(r), a = l.move(i + i);
  let u = l.move(
    n.containerPhrasing(e, {
      after: i,
      before: a,
      ...l.current()
    })
  );
  const s = u.charCodeAt(0), f = xn(
    r.before.charCodeAt(r.before.length - 1),
    s,
    i
  );
  f.inside && (u = Ke(s) + u.slice(1));
  const c = u.charCodeAt(u.length - 1), h = xn(r.after.charCodeAt(0), c, i);
  h.inside && (u = u.slice(0, -1) + Ke(c));
  const p = l.move(i + i);
  return o(), n.attentionEncodeSurroundingInfo = {
    after: h.outside,
    before: f.outside
  }, a + u + p;
}
function Gc(e, t, n) {
  return n.options.strong || "*";
}
function Jc(e, t, n, r) {
  return n.safe(e.value, r);
}
function Kc(e) {
  const t = e.options.ruleRepetition || 3;
  if (t < 3)
    throw new Error(
      "Cannot serialize rules with repetition `" + t + "` for `options.ruleRepetition`, expected `3` or more"
    );
  return t;
}
function Zc(e, t, n) {
  const r = (Ei(n) + (n.options.ruleSpaces ? " " : "")).repeat(Kc(n));
  return n.options.ruleSpaces ? r.slice(0, -1) : r;
}
const Ii = {
  blockquote: Sc,
  break: gr,
  code: Ac,
  definition: zc,
  emphasis: gi,
  hardBreak: gr,
  heading: _c,
  html: yi,
  image: xi,
  imageReference: ki,
  inlineCode: bi,
  link: Si,
  linkReference: Ci,
  list: Uc,
  listItem: qc,
  paragraph: Wc,
  root: Yc,
  strong: vi,
  text: Jc,
  thematicBreak: Zc
};
function ef() {
  return {
    enter: {
      table: nf,
      tableData: yr,
      tableHeader: yr,
      tableRow: rf
    },
    exit: {
      codeText: lf,
      table: tf,
      tableData: jn,
      tableHeader: jn,
      tableRow: jn
    }
  };
}
function nf(e) {
  const t = e._align;
  this.enter(
    {
      type: "table",
      align: t.map(function(n) {
        return n === "none" ? null : n;
      }),
      children: []
    },
    e
  ), this.data.inTable = !0;
}
function tf(e) {
  this.exit(e), this.data.inTable = void 0;
}
function rf(e) {
  this.enter({ type: "tableRow", children: [] }, e);
}
function jn(e) {
  this.exit(e);
}
function yr(e) {
  this.enter({ type: "tableCell", children: [] }, e);
}
function lf(e) {
  let t = this.resume();
  this.data.inTable && (t = t.replace(/\\([\\|])/g, of));
  const n = this.stack[this.stack.length - 1];
  n.type, n.value = t, this.exit(e);
}
function of(e, t) {
  return t === "|" ? t : e;
}
function af(e) {
  const t = e || {}, n = t.tableCellPadding, r = t.tablePipeAlign, i = t.stringLength, o = n ? " " : "|";
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
      tableCell: u,
      tableRow: a
    }
  };
  function l(p, m, y, S) {
    return s(f(p, y, S), p.align);
  }
  function a(p, m, y, S) {
    const x = c(p, y, S), I = s([x]);
    return I.slice(0, I.indexOf(`
`));
  }
  function u(p, m, y, S) {
    const x = y.enter("tableCell"), I = y.enter("phrasing"), E = y.containerPhrasing(p, {
      ...S,
      before: o,
      after: o
    });
    return I(), x(), E;
  }
  function s(p, m) {
    return bc(p, {
      align: m,
      // @ts-expect-error: `markdown-table` types should support `null`.
      alignDelimiters: r,
      // @ts-expect-error: `markdown-table` types should support `null`.
      padding: n,
      // @ts-expect-error: `markdown-table` types should support `null`.
      stringLength: i
    });
  }
  function f(p, m, y) {
    const S = p.children;
    let x = -1;
    const I = [], E = m.enter("table");
    for (; ++x < S.length; )
      I[x] = c(S[x], m, y);
    return E(), I;
  }
  function c(p, m, y) {
    const S = p.children;
    let x = -1;
    const I = [], E = m.enter("tableRow");
    for (; ++x < S.length; )
      I[x] = u(S[x], p, m, y);
    return E(), I;
  }
  function h(p, m, y) {
    let S = Ii.inlineCode(p, m, y);
    return y.stack.includes("tableCell") && (S = S.replace(/\|/g, "\\$&")), S;
  }
}
function uf() {
  return {
    exit: {
      taskListCheckValueChecked: xr,
      taskListCheckValueUnchecked: xr,
      paragraph: cf
    }
  };
}
function sf() {
  return {
    unsafe: [{ atBreak: !0, character: "-", after: "[:|-]" }],
    handlers: { listItem: ff }
  };
}
function xr(e) {
  const t = this.stack[this.stack.length - 2];
  t.type, t.checked = e.type === "taskListCheckValueChecked";
}
function cf(e) {
  const t = this.stack[this.stack.length - 2];
  if (t && t.type === "listItem" && typeof t.checked == "boolean") {
    const n = this.stack[this.stack.length - 1];
    n.type;
    const r = n.children[0];
    if (r && r.type === "text") {
      const i = t.children;
      let o = -1, l;
      for (; ++o < i.length; ) {
        const a = i[o];
        if (a.type === "paragraph") {
          l = a;
          break;
        }
      }
      l === n && (r.value = r.value.slice(1), r.value.length === 0 ? n.children.shift() : n.position && r.position && typeof r.position.start.offset == "number" && (r.position.start.column++, r.position.start.offset++, n.position.start = Object.assign({}, r.position.start)));
    }
  }
  this.exit(e);
}
function ff(e, t, n, r) {
  const i = e.children[0], o = typeof e.checked == "boolean" && i && i.type === "paragraph", l = "[" + (e.checked ? "x" : " ") + "] ", a = n.createTracker(r);
  o && a.move(l);
  let u = Ii.listItem(e, t, n, {
    ...r,
    ...a.current()
  });
  return o && (u = u.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, s)), u;
  function s(f) {
    return f + l;
  }
}
function pf() {
  return [
    Us(),
    cc(),
    mc(),
    ef(),
    uf()
  ];
}
function hf(e) {
  return {
    extensions: [
      Vs(),
      fc(e),
      dc(),
      af(e),
      sf()
    ]
  };
}
const mf = {
  tokenize: bf,
  partial: !0
}, Ti = {
  tokenize: wf,
  partial: !0
}, Ai = {
  tokenize: Sf,
  partial: !0
}, Pi = {
  tokenize: Cf,
  partial: !0
}, df = {
  tokenize: Ef,
  partial: !0
}, zi = {
  name: "wwwAutolink",
  tokenize: xf,
  previous: Di
}, Li = {
  name: "protocolAutolink",
  tokenize: kf,
  previous: Fi
}, Ie = {
  name: "emailAutolink",
  tokenize: yf,
  previous: _i
}, be = {};
function gf() {
  return {
    text: be
  };
}
let De = 48;
for (; De < 123; )
  be[De] = Ie, De++, De === 58 ? De = 65 : De === 91 && (De = 97);
be[43] = Ie;
be[45] = Ie;
be[46] = Ie;
be[95] = Ie;
be[72] = [Ie, Li];
be[104] = [Ie, Li];
be[87] = [Ie, zi];
be[119] = [Ie, zi];
function yf(e, t, n) {
  const r = this;
  let i, o;
  return l;
  function l(c) {
    return !Kn(c) || !_i.call(r, r.previous) || yt(r.events) ? n(c) : (e.enter("literalAutolink"), e.enter("literalAutolinkEmail"), a(c));
  }
  function a(c) {
    return Kn(c) ? (e.consume(c), a) : c === 64 ? (e.consume(c), u) : n(c);
  }
  function u(c) {
    return c === 46 ? e.check(df, f, s)(c) : c === 45 || c === 95 || re(c) ? (o = !0, e.consume(c), u) : f(c);
  }
  function s(c) {
    return e.consume(c), i = !0, u;
  }
  function f(c) {
    return o && i && oe(r.previous) ? (e.exit("literalAutolinkEmail"), e.exit("literalAutolink"), t(c)) : n(c);
  }
}
function xf(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return l !== 87 && l !== 119 || !Di.call(r, r.previous) || yt(r.events) ? n(l) : (e.enter("literalAutolink"), e.enter("literalAutolinkWww"), e.check(mf, e.attempt(Ti, e.attempt(Ai, o), n), n)(l));
  }
  function o(l) {
    return e.exit("literalAutolinkWww"), e.exit("literalAutolink"), t(l);
  }
}
function kf(e, t, n) {
  const r = this;
  let i = "", o = !1;
  return l;
  function l(c) {
    return (c === 72 || c === 104) && Fi.call(r, r.previous) && !yt(r.events) ? (e.enter("literalAutolink"), e.enter("literalAutolinkHttp"), i += String.fromCodePoint(c), e.consume(c), a) : n(c);
  }
  function a(c) {
    if (oe(c) && i.length < 5)
      return i += String.fromCodePoint(c), e.consume(c), a;
    if (c === 58) {
      const h = i.toLowerCase();
      if (h === "http" || h === "https")
        return e.consume(c), u;
    }
    return n(c);
  }
  function u(c) {
    return c === 47 ? (e.consume(c), o ? s : (o = !0, u)) : n(c);
  }
  function s(c) {
    return c === null || dn(c) || G(c) || Oe(c) || bn(c) ? n(c) : e.attempt(Ti, e.attempt(Ai, f), n)(c);
  }
  function f(c) {
    return e.exit("literalAutolinkHttp"), e.exit("literalAutolink"), t(c);
  }
}
function bf(e, t, n) {
  let r = 0;
  return i;
  function i(l) {
    return (l === 87 || l === 119) && r < 3 ? (r++, e.consume(l), i) : l === 46 && r === 3 ? (e.consume(l), o) : n(l);
  }
  function o(l) {
    return l === null ? n(l) : t(l);
  }
}
function wf(e, t, n) {
  let r, i, o;
  return l;
  function l(s) {
    return s === 46 || s === 95 ? e.check(Pi, u, a)(s) : s === null || G(s) || Oe(s) || s !== 45 && bn(s) ? u(s) : (o = !0, e.consume(s), l);
  }
  function a(s) {
    return s === 95 ? r = !0 : (i = r, r = void 0), e.consume(s), l;
  }
  function u(s) {
    return i || r || !o ? n(s) : t(s);
  }
}
function Sf(e, t) {
  let n = 0, r = 0;
  return i;
  function i(l) {
    return l === 40 ? (n++, e.consume(l), i) : l === 41 && r < n ? o(l) : l === 33 || l === 34 || l === 38 || l === 39 || l === 41 || l === 42 || l === 44 || l === 46 || l === 58 || l === 59 || l === 60 || l === 63 || l === 93 || l === 95 || l === 126 ? e.check(Pi, t, o)(l) : l === null || G(l) || Oe(l) ? t(l) : (e.consume(l), i);
  }
  function o(l) {
    return l === 41 && r++, e.consume(l), i;
  }
}
function Cf(e, t, n) {
  return r;
  function r(a) {
    return a === 33 || a === 34 || a === 39 || a === 41 || a === 42 || a === 44 || a === 46 || a === 58 || a === 59 || a === 63 || a === 95 || a === 126 ? (e.consume(a), r) : a === 38 ? (e.consume(a), o) : a === 93 ? (e.consume(a), i) : (
      // `<` is an end.
      a === 60 || // So is whitespace.
      a === null || G(a) || Oe(a) ? t(a) : n(a)
    );
  }
  function i(a) {
    return a === null || a === 40 || a === 91 || G(a) || Oe(a) ? t(a) : r(a);
  }
  function o(a) {
    return oe(a) ? l(a) : n(a);
  }
  function l(a) {
    return a === 59 ? (e.consume(a), r) : oe(a) ? (e.consume(a), l) : n(a);
  }
}
function Ef(e, t, n) {
  return r;
  function r(o) {
    return e.consume(o), i;
  }
  function i(o) {
    return re(o) ? n(o) : t(o);
  }
}
function Di(e) {
  return e === null || e === 40 || e === 42 || e === 95 || e === 91 || e === 93 || e === 126 || G(e);
}
function Fi(e) {
  return !oe(e);
}
function _i(e) {
  return !(e === 47 || Kn(e));
}
function Kn(e) {
  return e === 43 || e === 45 || e === 46 || e === 95 || re(e);
}
function yt(e) {
  let t = e.length, n = !1;
  for (; t--; ) {
    const r = e[t][1];
    if ((r.type === "labelLink" || r.type === "labelImage") && !r._balanced) {
      n = !0;
      break;
    }
    if (r._gfmAutolinkLiteralWalkedInto) {
      n = !1;
      break;
    }
  }
  return e.length > 0 && !n && (e[e.length - 1][1]._gfmAutolinkLiteralWalkedInto = !0), n;
}
const vf = {
  tokenize: Ff,
  partial: !0
};
function If() {
  return {
    document: {
      91: {
        name: "gfmFootnoteDefinition",
        tokenize: zf,
        continuation: {
          tokenize: Lf
        },
        exit: Df
      }
    },
    text: {
      91: {
        name: "gfmFootnoteCall",
        tokenize: Pf
      },
      93: {
        name: "gfmPotentialFootnoteCall",
        add: "after",
        tokenize: Tf,
        resolveTo: Af
      }
    }
  };
}
function Tf(e, t, n) {
  const r = this;
  let i = r.events.length;
  const o = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let l;
  for (; i--; ) {
    const u = r.events[i][1];
    if (u.type === "labelImage") {
      l = u;
      break;
    }
    if (u.type === "gfmFootnoteCall" || u.type === "labelLink" || u.type === "label" || u.type === "image" || u.type === "link")
      break;
  }
  return a;
  function a(u) {
    if (!l || !l._balanced)
      return n(u);
    const s = xe(r.sliceSerialize({
      start: l.end,
      end: r.now()
    }));
    return s.codePointAt(0) !== 94 || !o.includes(s.slice(1)) ? n(u) : (e.enter("gfmFootnoteCallLabelMarker"), e.consume(u), e.exit("gfmFootnoteCallLabelMarker"), t(u));
  }
}
function Af(e, t) {
  let n = e.length;
  for (; n--; )
    if (e[n][1].type === "labelImage" && e[n][0] === "enter") {
      e[n][1];
      break;
    }
  e[n + 1][1].type = "data", e[n + 3][1].type = "gfmFootnoteCallLabelMarker";
  const r = {
    type: "gfmFootnoteCall",
    start: Object.assign({}, e[n + 3][1].start),
    end: Object.assign({}, e[e.length - 1][1].end)
  }, i = {
    type: "gfmFootnoteCallMarker",
    start: Object.assign({}, e[n + 3][1].end),
    end: Object.assign({}, e[n + 3][1].end)
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
    e[n + 1],
    e[n + 2],
    ["enter", r, t],
    // The `[`
    e[n + 3],
    e[n + 4],
    // The `^`.
    ["enter", i, t],
    ["exit", i, t],
    // Everything in between.
    ["enter", o, t],
    ["enter", l, t],
    ["exit", l, t],
    ["exit", o, t],
    // The ending (`]`, properly parsed and labelled).
    e[e.length - 2],
    e[e.length - 1],
    ["exit", r, t]
  ];
  return e.splice(n, e.length - n + 1, ...a), e;
}
function Pf(e, t, n) {
  const r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let o = 0, l;
  return a;
  function a(c) {
    return e.enter("gfmFootnoteCall"), e.enter("gfmFootnoteCallLabelMarker"), e.consume(c), e.exit("gfmFootnoteCallLabelMarker"), u;
  }
  function u(c) {
    return c !== 94 ? n(c) : (e.enter("gfmFootnoteCallMarker"), e.consume(c), e.exit("gfmFootnoteCallMarker"), e.enter("gfmFootnoteCallString"), e.enter("chunkString").contentType = "string", s);
  }
  function s(c) {
    if (
      // Too long.
      o > 999 || // Closing brace with nothing.
      c === 93 && !l || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      c === null || c === 91 || G(c)
    )
      return n(c);
    if (c === 93) {
      e.exit("chunkString");
      const h = e.exit("gfmFootnoteCallString");
      return i.includes(xe(r.sliceSerialize(h))) ? (e.enter("gfmFootnoteCallLabelMarker"), e.consume(c), e.exit("gfmFootnoteCallLabelMarker"), e.exit("gfmFootnoteCall"), t) : n(c);
    }
    return G(c) || (l = !0), o++, e.consume(c), c === 92 ? f : s;
  }
  function f(c) {
    return c === 91 || c === 92 || c === 93 ? (e.consume(c), o++, s) : s(c);
  }
}
function zf(e, t, n) {
  const r = this, i = r.parser.gfmFootnotes || (r.parser.gfmFootnotes = []);
  let o, l = 0, a;
  return u;
  function u(m) {
    return e.enter("gfmFootnoteDefinition")._container = !0, e.enter("gfmFootnoteDefinitionLabel"), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(m), e.exit("gfmFootnoteDefinitionLabelMarker"), s;
  }
  function s(m) {
    return m === 94 ? (e.enter("gfmFootnoteDefinitionMarker"), e.consume(m), e.exit("gfmFootnoteDefinitionMarker"), e.enter("gfmFootnoteDefinitionLabelString"), e.enter("chunkString").contentType = "string", f) : n(m);
  }
  function f(m) {
    if (
      // Too long.
      l > 999 || // Closing brace with nothing.
      m === 93 && !a || // Space or tab is not supported by GFM for some reason.
      // `\n` and `[` not being supported makes sense.
      m === null || m === 91 || G(m)
    )
      return n(m);
    if (m === 93) {
      e.exit("chunkString");
      const y = e.exit("gfmFootnoteDefinitionLabelString");
      return o = xe(r.sliceSerialize(y)), e.enter("gfmFootnoteDefinitionLabelMarker"), e.consume(m), e.exit("gfmFootnoteDefinitionLabelMarker"), e.exit("gfmFootnoteDefinitionLabel"), h;
    }
    return G(m) || (a = !0), l++, e.consume(m), m === 92 ? c : f;
  }
  function c(m) {
    return m === 91 || m === 92 || m === 93 ? (e.consume(m), l++, f) : f(m);
  }
  function h(m) {
    return m === 58 ? (e.enter("definitionMarker"), e.consume(m), e.exit("definitionMarker"), i.includes(o) || i.push(o), H(e, p, "gfmFootnoteDefinitionWhitespace")) : n(m);
  }
  function p(m) {
    return t(m);
  }
}
function Lf(e, t, n) {
  return e.check(en, t, e.attempt(vf, t, n));
}
function Df(e) {
  e.exit("gfmFootnoteDefinition");
}
function Ff(e, t, n) {
  const r = this;
  return H(e, i, "gfmFootnoteDefinitionIndent", 5);
  function i(o) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === "gfmFootnoteDefinitionIndent" && l[2].sliceSerialize(l[1], !0).length === 4 ? t(o) : n(o);
  }
}
function _f(e) {
  let n = (e || {}).singleTilde;
  const r = {
    name: "strikethrough",
    tokenize: o,
    resolveAll: i
  };
  return n == null && (n = !0), {
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
    let u = -1;
    for (; ++u < l.length; )
      if (l[u][0] === "enter" && l[u][1].type === "strikethroughSequenceTemporary" && l[u][1]._close) {
        let s = u;
        for (; s--; )
          if (l[s][0] === "exit" && l[s][1].type === "strikethroughSequenceTemporary" && l[s][1]._open && // If the sizes are the same:
          l[u][1].end.offset - l[u][1].start.offset === l[s][1].end.offset - l[s][1].start.offset) {
            l[u][1].type = "strikethroughSequence", l[s][1].type = "strikethroughSequence";
            const f = {
              type: "strikethrough",
              start: Object.assign({}, l[s][1].start),
              end: Object.assign({}, l[u][1].end)
            }, c = {
              type: "strikethroughText",
              start: Object.assign({}, l[s][1].end),
              end: Object.assign({}, l[u][1].start)
            }, h = [["enter", f, a], ["enter", l[s][1], a], ["exit", l[s][1], a], ["enter", c, a]], p = a.parser.constructs.insideSpan.null;
            p && he(h, h.length, 0, wn(p, l.slice(s + 1, u), a)), he(h, h.length, 0, [["exit", c, a], ["enter", l[u][1], a], ["exit", l[u][1], a], ["exit", f, a]]), he(l, s - 1, u - s + 3, h), u = s + h.length - 2;
            break;
          }
      }
    for (u = -1; ++u < l.length; )
      l[u][1].type === "strikethroughSequenceTemporary" && (l[u][1].type = "data");
    return l;
  }
  function o(l, a, u) {
    const s = this.previous, f = this.events;
    let c = 0;
    return h;
    function h(m) {
      return s === 126 && f[f.length - 1][1].type !== "characterEscape" ? u(m) : (l.enter("strikethroughSequenceTemporary"), p(m));
    }
    function p(m) {
      const y = je(s);
      if (m === 126)
        return c > 1 ? u(m) : (l.consume(m), c++, p);
      if (c < 2 && !n) return u(m);
      const S = l.exit("strikethroughSequenceTemporary"), x = je(m);
      return S._open = !x || x === 2 && !!y, S._close = !y || y === 2 && !!x, a(m);
    }
  }
}
class Rf {
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
  add(t, n, r) {
    Of(this, t, n, r);
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
  consume(t) {
    if (this.map.sort(function(o, l) {
      return o[0] - l[0];
    }), this.map.length === 0)
      return;
    let n = this.map.length;
    const r = [];
    for (; n > 0; )
      n -= 1, r.push(t.slice(this.map[n][0] + this.map[n][1]), this.map[n][2]), t.length = this.map[n][0];
    r.push(t.slice()), t.length = 0;
    let i = r.pop();
    for (; i; ) {
      for (const o of i)
        t.push(o);
      i = r.pop();
    }
    this.map.length = 0;
  }
}
function Of(e, t, n, r) {
  let i = 0;
  if (!(n === 0 && r.length === 0)) {
    for (; i < e.map.length; ) {
      if (e.map[i][0] === t) {
        e.map[i][1] += n, e.map[i][2].push(...r);
        return;
      }
      i += 1;
    }
    e.map.push([t, n, r]);
  }
}
function Nf(e, t) {
  let n = !1;
  const r = [];
  for (; t < e.length; ) {
    const i = e[t];
    if (n) {
      if (i[0] === "enter")
        i[1].type === "tableContent" && r.push(e[t + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
      else if (i[1].type === "tableContent") {
        if (e[t - 1][1].type === "tableDelimiterMarker") {
          const o = r.length - 1;
          r[o] = r[o] === "left" ? "center" : "right";
        }
      } else if (i[1].type === "tableDelimiterRow")
        break;
    } else i[0] === "enter" && i[1].type === "tableDelimiterRow" && (n = !0);
    t += 1;
  }
  return r;
}
function Mf() {
  return {
    flow: {
      null: {
        name: "table",
        tokenize: Bf,
        resolveAll: jf
      }
    }
  };
}
function Bf(e, t, n) {
  const r = this;
  let i = 0, o = 0, l;
  return a;
  function a(k) {
    let A = r.events.length - 1;
    for (; A > -1; ) {
      const J = r.events[A][1].type;
      if (J === "lineEnding" || // Note: markdown-rs uses `whitespace` instead of `linePrefix`
      J === "linePrefix") A--;
      else break;
    }
    const T = A > -1 ? r.events[A][1].type : null, $ = T === "tableHead" || T === "tableRow" ? w : u;
    return $ === w && r.parser.lazy[r.now().line] ? n(k) : $(k);
  }
  function u(k) {
    return e.enter("tableHead"), e.enter("tableRow"), s(k);
  }
  function s(k) {
    return k === 124 || (l = !0, o += 1), f(k);
  }
  function f(k) {
    return k === null ? n(k) : z(k) ? o > 1 ? (o = 0, r.interrupt = !0, e.exit("tableRow"), e.enter("lineEnding"), e.consume(k), e.exit("lineEnding"), p) : n(k) : N(k) ? H(e, f, "whitespace")(k) : (o += 1, l && (l = !1, i += 1), k === 124 ? (e.enter("tableCellDivider"), e.consume(k), e.exit("tableCellDivider"), l = !0, f) : (e.enter("data"), c(k)));
  }
  function c(k) {
    return k === null || k === 124 || G(k) ? (e.exit("data"), f(k)) : (e.consume(k), k === 92 ? h : c);
  }
  function h(k) {
    return k === 92 || k === 124 ? (e.consume(k), c) : c(k);
  }
  function p(k) {
    return r.interrupt = !1, r.parser.lazy[r.now().line] ? n(k) : (e.enter("tableDelimiterRow"), l = !1, N(k) ? H(e, m, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(k) : m(k));
  }
  function m(k) {
    return k === 45 || k === 58 ? S(k) : k === 124 ? (l = !0, e.enter("tableCellDivider"), e.consume(k), e.exit("tableCellDivider"), y) : _(k);
  }
  function y(k) {
    return N(k) ? H(e, S, "whitespace")(k) : S(k);
  }
  function S(k) {
    return k === 58 ? (o += 1, l = !0, e.enter("tableDelimiterMarker"), e.consume(k), e.exit("tableDelimiterMarker"), x) : k === 45 ? (o += 1, x(k)) : k === null || z(k) ? R(k) : _(k);
  }
  function x(k) {
    return k === 45 ? (e.enter("tableDelimiterFiller"), I(k)) : _(k);
  }
  function I(k) {
    return k === 45 ? (e.consume(k), I) : k === 58 ? (l = !0, e.exit("tableDelimiterFiller"), e.enter("tableDelimiterMarker"), e.consume(k), e.exit("tableDelimiterMarker"), E) : (e.exit("tableDelimiterFiller"), E(k));
  }
  function E(k) {
    return N(k) ? H(e, R, "whitespace")(k) : R(k);
  }
  function R(k) {
    return k === 124 ? m(k) : k === null || z(k) ? !l || i !== o ? _(k) : (e.exit("tableDelimiterRow"), e.exit("tableHead"), t(k)) : _(k);
  }
  function _(k) {
    return n(k);
  }
  function w(k) {
    return e.enter("tableRow"), M(k);
  }
  function M(k) {
    return k === 124 ? (e.enter("tableCellDivider"), e.consume(k), e.exit("tableCellDivider"), M) : k === null || z(k) ? (e.exit("tableRow"), t(k)) : N(k) ? H(e, M, "whitespace")(k) : (e.enter("data"), W(k));
  }
  function W(k) {
    return k === null || k === 124 || G(k) ? (e.exit("data"), M(k)) : (e.consume(k), k === 92 ? U : W);
  }
  function U(k) {
    return k === 92 || k === 124 ? (e.consume(k), W) : W(k);
  }
}
function jf(e, t) {
  let n = -1, r = !0, i = 0, o = [0, 0, 0, 0], l = [0, 0, 0, 0], a = !1, u = 0, s, f, c;
  const h = new Rf();
  for (; ++n < e.length; ) {
    const p = e[n], m = p[1];
    p[0] === "enter" ? m.type === "tableHead" ? (a = !1, u !== 0 && (kr(h, t, u, s, f), f = void 0, u = 0), s = {
      type: "table",
      start: Object.assign({}, m.start),
      // Note: correct end is set later.
      end: Object.assign({}, m.end)
    }, h.add(n, 0, [["enter", s, t]])) : m.type === "tableRow" || m.type === "tableDelimiterRow" ? (r = !0, c = void 0, o = [0, 0, 0, 0], l = [0, n + 1, 0, 0], a && (a = !1, f = {
      type: "tableBody",
      start: Object.assign({}, m.start),
      // Note: correct end is set later.
      end: Object.assign({}, m.end)
    }, h.add(n, 0, [["enter", f, t]])), i = m.type === "tableDelimiterRow" ? 2 : f ? 3 : 1) : i && (m.type === "data" || m.type === "tableDelimiterMarker" || m.type === "tableDelimiterFiller") ? (r = !1, l[2] === 0 && (o[1] !== 0 && (l[0] = l[1], c = sn(h, t, o, i, void 0, c), o = [0, 0, 0, 0]), l[2] = n)) : m.type === "tableCellDivider" && (r ? r = !1 : (o[1] !== 0 && (l[0] = l[1], c = sn(h, t, o, i, void 0, c)), o = l, l = [o[1], n, 0, 0])) : m.type === "tableHead" ? (a = !0, u = n) : m.type === "tableRow" || m.type === "tableDelimiterRow" ? (u = n, o[1] !== 0 ? (l[0] = l[1], c = sn(h, t, o, i, n, c)) : l[1] !== 0 && (c = sn(h, t, l, i, n, c)), i = 0) : i && (m.type === "data" || m.type === "tableDelimiterMarker" || m.type === "tableDelimiterFiller") && (l[3] = n);
  }
  for (u !== 0 && kr(h, t, u, s, f), h.consume(t.events), n = -1; ++n < t.events.length; ) {
    const p = t.events[n];
    p[0] === "enter" && p[1].type === "table" && (p[1]._align = Nf(t.events, n));
  }
  return e;
}
function sn(e, t, n, r, i, o) {
  const l = r === 1 ? "tableHeader" : r === 2 ? "tableDelimiter" : "tableData", a = "tableContent";
  n[0] !== 0 && (o.end = Object.assign({}, Be(t.events, n[0])), e.add(n[0], 0, [["exit", o, t]]));
  const u = Be(t.events, n[1]);
  if (o = {
    type: l,
    start: Object.assign({}, u),
    // Note: correct end is set later.
    end: Object.assign({}, u)
  }, e.add(n[1], 0, [["enter", o, t]]), n[2] !== 0) {
    const s = Be(t.events, n[2]), f = Be(t.events, n[3]), c = {
      type: a,
      start: Object.assign({}, s),
      end: Object.assign({}, f)
    };
    if (e.add(n[2], 0, [["enter", c, t]]), r !== 2) {
      const h = t.events[n[2]], p = t.events[n[3]];
      if (h[1].end = Object.assign({}, p[1].end), h[1].type = "chunkText", h[1].contentType = "text", n[3] > n[2] + 1) {
        const m = n[2] + 1, y = n[3] - n[2] - 1;
        e.add(m, y, []);
      }
    }
    e.add(n[3] + 1, 0, [["exit", c, t]]);
  }
  return i !== void 0 && (o.end = Object.assign({}, Be(t.events, i)), e.add(i, 0, [["exit", o, t]]), o = void 0), o;
}
function kr(e, t, n, r, i) {
  const o = [], l = Be(t.events, n);
  i && (i.end = Object.assign({}, l), o.push(["exit", i, t])), r.end = Object.assign({}, l), o.push(["exit", r, t]), e.add(n + 1, 0, o);
}
function Be(e, t) {
  const n = e[t], r = n[0] === "enter" ? "start" : "end";
  return n[1][r];
}
const $f = {
  name: "tasklistCheck",
  tokenize: Uf
};
function Hf() {
  return {
    text: {
      91: $f
    }
  };
}
function Uf(e, t, n) {
  const r = this;
  return i;
  function i(u) {
    return (
      // Exit if there’s stuff before.
      r.previous !== null || // Exit if not in the first content that is the first child of a list
      // item.
      !r._gfmTasklistFirstContentOfListItem ? n(u) : (e.enter("taskListCheck"), e.enter("taskListCheckMarker"), e.consume(u), e.exit("taskListCheckMarker"), o)
    );
  }
  function o(u) {
    return G(u) ? (e.enter("taskListCheckValueUnchecked"), e.consume(u), e.exit("taskListCheckValueUnchecked"), l) : u === 88 || u === 120 ? (e.enter("taskListCheckValueChecked"), e.consume(u), e.exit("taskListCheckValueChecked"), l) : n(u);
  }
  function l(u) {
    return u === 93 ? (e.enter("taskListCheckMarker"), e.consume(u), e.exit("taskListCheckMarker"), e.exit("taskListCheck"), a) : n(u);
  }
  function a(u) {
    return z(u) ? t(u) : N(u) ? e.check({
      tokenize: Vf
    }, t, n)(u) : n(u);
  }
}
function Vf(e, t, n) {
  return H(e, r, "whitespace");
  function r(i) {
    return i === null ? n(i) : t(i);
  }
}
function qf(e) {
  return Ur([
    gf(),
    If(),
    _f(e),
    Mf(),
    Hf()
  ]);
}
const Wf = {};
function Qf(e) {
  const t = (
    /** @type {Processor<Root>} */
    this
  ), n = e || Wf, r = t.data(), i = r.micromarkExtensions || (r.micromarkExtensions = []), o = r.fromMarkdownExtensions || (r.fromMarkdownExtensions = []), l = r.toMarkdownExtensions || (r.toMarkdownExtensions = []);
  i.push(qf(n)), o.push(pf()), l.push(hf(n));
}
const Ri = Er(null), tn = Er({
  lines: [],
  pendingLine: null,
  onToggle: () => {
  },
  onOpenFile: () => {
  }
}), Yf = /(^|[\s([{])((?:~\/|\/)[\w.\-]+(?:\/[\w.\-]+)+\/?)(?=[\s)\]},;:!?'"]|$)/g;
function Xf(e) {
  let t = !1;
  return e.split(`
`).map((n) => /^\s*(```|~~~)/.test(n) ? (t = !t, n) : t ? n : n.split(/(`[^`]*`)/).map(
    (r) => r.startsWith("`") ? r : r.replace(Yf, (i, o, l) => `${o}[${l}](${l})`)
  ).join("")).join(`
`);
}
const Oi = (e) => !!e && (e.startsWith("/") || e.startsWith("~/")) && e.includes("/");
function Gf({ path: e, onClose: t }) {
  const [n, r] = ne({
    loading: !0
  }), [i, o] = ne(!1);
  return hn(() => {
    let l = !0;
    return r({ loading: !0 }), fetch(`/api/file-read?path=${encodeURIComponent(e)}`, { credentials: "same-origin" }).then(async (a) => {
      const u = await a.text();
      if (l)
        if (a.ok)
          r({ loading: !1, content: u });
        else {
          let s = `HTTP ${a.status}`;
          try {
            s = JSON.parse(u).error ?? s;
          } catch {
          }
          r({ loading: !1, error: s });
        }
    }).catch((a) => {
      l && r({ loading: !1, error: String(a) });
    }), () => {
      l = !1;
    };
  }, [e]), /* @__PURE__ */ P("div", { className: "tl-modal-overlay", onClick: t, role: "presentation", children: /* @__PURE__ */ q(
    "div",
    {
      className: "tl-modal",
      role: "dialog",
      "aria-label": e,
      onClick: (l) => l.stopPropagation(),
      children: [
        /* @__PURE__ */ q("div", { className: "tl-modal-head", children: [
          /* @__PURE__ */ P("span", { className: "tl-modal-title", title: e, children: e }),
          /* @__PURE__ */ P(
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
          /* @__PURE__ */ P("button", { type: "button", className: "tl-btn", onClick: t, children: "Close" })
        ] }),
        /* @__PURE__ */ P("div", { className: "tl-modal-body", children: n.loading ? /* @__PURE__ */ P("div", { className: "tl-dim", children: "Loading…" }) : n.error ? /* @__PURE__ */ q("div", { className: "tl-dim", children: [
          "Could not open: ",
          n.error
        ] }) : /* @__PURE__ */ P("pre", { className: "tl-file-pre", children: n.content }) })
      ]
    }
  ) });
}
function Jf({ node: e, className: t, children: n, ...r }) {
  var a, u;
  const { lines: i } = Ge(tn), o = (a = e == null ? void 0 : e.position) == null ? void 0 : a.start.line;
  if (typeof t == "string" && t.includes("task-list-item") && typeof o == "number") {
    const s = o - 1, f = (u = el.exec(i[s] ?? "")) == null ? void 0 : u[1];
    return /* @__PURE__ */ P(Ri.Provider, { value: s, children: /* @__PURE__ */ q("li", { className: `${t} tl-task`, ...r, children: [
      n,
      f ? /* @__PURE__ */ q("span", { title: `Claimed by ${f}`, className: "tl-claim", children: [
        "⛓ ",
        f
      ] }) : null
    ] }) });
  }
  return /* @__PURE__ */ P("li", { className: t, ...r, children: n });
}
function Kf(e) {
  const { node: t, ...n } = e, r = Ge(Ri), { pendingLine: i, onToggle: o } = Ge(tn);
  if (n.type !== "checkbox") return /* @__PURE__ */ P("input", { ...n });
  const l = i !== null;
  return /* @__PURE__ */ P(
    "input",
    {
      type: "checkbox",
      checked: !!n.checked,
      disabled: r === null || l,
      onChange: () => {
        r !== null && o(r);
      },
      className: `tl-check${i === r ? " tl-check-busy" : ""}`
    }
  );
}
function Zf({ node: e, href: t, children: n, ...r }) {
  const { onOpenFile: i } = Ge(tn);
  return Oi(t) ? /* @__PURE__ */ P(
    "a",
    {
      href: t,
      className: "tl-filelink",
      title: `Open ${t}`,
      onClick: (o) => {
        o.preventDefault(), i(t);
      },
      ...r,
      children: n
    }
  ) : /* @__PURE__ */ P("a", { href: t, target: "_blank", rel: "noreferrer", ...r, children: n });
}
function ep({ node: e, className: t, children: n, ...r }) {
  const { onOpenFile: i } = Ge(tn), o = typeof n == "string" ? n : Array.isArray(n) && n.length === 1 && typeof n[0] == "string" ? n[0] : void 0;
  return Oi(o) ? /* @__PURE__ */ P(
    "code",
    {
      className: `${t ?? ""} tl-filelink`,
      title: `Open ${o}`,
      role: "link",
      tabIndex: 0,
      onClick: () => i(o),
      onKeyDown: (l) => {
        l.key === "Enter" && i(o);
      },
      ...r,
      children: n
    }
  ) : /* @__PURE__ */ P("code", { className: t, ...r, children: n });
}
const np = {
  li: Jf,
  input: Kf,
  a: Zf,
  code: ep
}, tp = `
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
function rp({
  content: e,
  pendingLine: t,
  onToggle: n
}) {
  const [r, i] = ne(null), o = Et(
    () => ({ lines: e.split(`
`), pendingLine: t, onToggle: n, onOpenFile: i }),
    [e, t, n]
  ), l = Et(() => Xf(e), [e]);
  return /* @__PURE__ */ q(tn.Provider, { value: o, children: [
    /* @__PURE__ */ P("style", { children: tp }),
    /* @__PURE__ */ P("div", { className: "tl-md", children: /* @__PURE__ */ P(Fs, { remarkPlugins: [Qf], components: np, children: l }) }),
    r ? /* @__PURE__ */ P(Gf, { path: r, onClose: () => i(null) }) : null
  ] });
}
function ip({ id: e, onBack: t }) {
  const n = br(), r = wr(), [i, o] = ne(null), [l, a] = ne(null), [u, s] = ne("view"), [f, c] = ne(""), [h, p] = ne(!1), [m, y] = ne(null), [S, x] = ne(!1), [I, E] = ne(null), [R, _] = ne(!1), [w, M] = ne(""), [W, U] = ne(""), [k, A] = ne(!1), T = vr(!1);
  T.current = h || m !== null;
  const $ = Ir(async () => {
    try {
      const L = await n.get(`${ve}/ledgers/${e}`);
      if (T.current) return;
      o(L), a(null);
    } catch (L) {
      a(Pe(L));
    }
  }, [n, e]);
  hn(() => {
    i && !h && !m && c(i.content);
  }, [i, h, m]), hn(() => {
    $();
    const L = setInterval(() => {
      T.current || $();
    }, 5e3);
    return () => clearInterval(L);
  }, [$]), Sr("update", (L) => {
    const Q = L == null ? void 0 : L.id;
    (Q === void 0 || Q === e) && !T.current && $();
  });
  const J = async (L) => {
    if (!i || I !== null) return;
    const Q = i.content.split(`
`)[L];
    if (Q !== void 0) {
      E(L);
      try {
        const { status: O, data: V } = await ln("POST", `${ve}/ledgers/${e}/toggle`, {
          line: L,
          expected: Q
        });
        if (O === 409 && V && typeof V.content == "string") {
          o((ce) => ce && { ...ce, content: V.content, version: V.version }), r("List changed elsewhere — refreshed", { type: "info" });
          return;
        }
        if (O >= 400 || !V) {
          r(V != null && V.error ? String(V.error) : `Toggle failed (HTTP ${O})`, { type: "error" });
          return;
        }
        const { line: le, new_text: we, ...Te } = V;
        o((ce) => {
          if (!ce) return ce;
          const rn = ce.content.split(`
`);
          return typeof le == "number" && typeof we == "string" && (rn[le] = we), { ...ce, ...Te, content: rn.join(`
`) };
        });
      } catch (O) {
        r(Pe(O), { type: "error" });
      } finally {
        E(null);
      }
    }
  }, B = async (L) => {
    if (!(!i || S)) {
      x(!0);
      try {
        const { status: Q, data: O } = await ln("PUT", `${ve}/ledgers/${e}`, {
          base_version: L ?? i.version,
          content: f
        });
        if (Q === 409 && O && typeof O.content == "string") {
          y({ content: O.content, version: O.version });
          return;
        }
        if (Q >= 400 || !O) {
          r(O != null && O.error ? String(O.error) : `Save failed (HTTP ${Q})`, { type: "error" });
          return;
        }
        const V = f;
        y(null), p(!1), o((le) => le && { ...le, ...O, content: V }), s("view");
      } catch (Q) {
        r(Pe(Q), { type: "error" });
      } finally {
        x(!1);
      }
    }
  }, ee = () => {
    if (!m) return;
    const L = m;
    y(null), p(!1), o((Q) => Q && { ...Q, content: L.content, version: L.version }), c(L.content);
  }, Z = () => {
    i && (c(i.content), p(!1), s("edit"));
  }, se = () => {
    y(null), p(!1), i && c(i.content), s("view");
  }, de = () => {
    !i || T.current || (M(i.name), _(!0));
  }, d = async () => {
    var Q, O;
    _(!1);
    const L = w.trim();
    if (!(!i || !L || L === i.name))
      try {
        let V = await ln("PUT", `${ve}/ledgers/${e}`, {
          base_version: i.version,
          name: L
        });
        if (V.status === 409 && typeof ((Q = V.data) == null ? void 0 : Q.version) == "number" && (V = await ln("PUT", `${ve}/ledgers/${e}`, {
          base_version: V.data.version,
          name: L
        })), V.status >= 400 || !V.data) {
          r((O = V.data) != null && O.error ? String(V.data.error) : `Rename failed (HTTP ${V.status})`, {
            type: "error"
          });
          return;
        }
        await $();
      } catch (V) {
        r(Pe(V), { type: "error" });
      }
  }, te = h || m !== null, ge = async () => {
    const L = W.trim();
    if (!(!L || k || te)) {
      A(!0);
      try {
        await n.post(`${ve}/ledgers/${e}/items`, { text: L }), U(""), await $();
      } catch (Q) {
        r(Pe(Q), { type: "error" });
      } finally {
        A(!1);
      }
    }
  };
  return /* @__PURE__ */ q("div", { className: "flex min-h-0 flex-1 flex-col", children: [
    /* @__PURE__ */ q("div", { className: "flex items-center gap-3 px-6 pb-3 pt-5", children: [
      /* @__PURE__ */ P(Ee, { onClick: () => {
        T.current && !window.confirm("Discard unsaved changes?") || t();
      }, title: "Back to ledgers", children: /* @__PURE__ */ P(Xi, { size: 14 }) }),
      R ? /* @__PURE__ */ P(
        Ct,
        {
          autoFocus: !0,
          value: w,
          onChange: (L) => M(L.target.value),
          onBlur: () => void d(),
          onKeyDown: (L) => {
            L.key === "Enter" && d(), L.key === "Escape" && _(!1);
          },
          className: "max-w-xs"
        }
      ) : /* @__PURE__ */ P(
        "button",
        {
          type: "button",
          onClick: de,
          title: te ? "Save or cancel your edit first" : "Click to rename",
          className: "min-w-0 truncate bg-transparent text-lg font-semibold decoration-dotted underline-offset-4 hover:underline",
          children: (i == null ? void 0 : i.name) ?? "…"
        }
      ),
      i && /* @__PURE__ */ q("span", { className: "hidden shrink-0 text-xs text-muted sm:inline", children: [
        i.items_done,
        "/",
        i.items_total,
        " done · v",
        i.version,
        " · updated",
        " ",
        Tr(i.updated_at)
      ] }),
      /* @__PURE__ */ P("div", { className: "ml-auto flex shrink-0 items-center gap-1.5", children: u === "edit" ? /* @__PURE__ */ q(pn, { children: [
        /* @__PURE__ */ P(Ee, { onClick: se, disabled: S, children: "Cancel" }),
        /* @__PURE__ */ P(Ee, { primary: !0, onClick: () => void B(), disabled: S || !h, children: S ? "Saving…" : "Save" })
      ] }) : /* @__PURE__ */ q(pn, { children: [
        /* @__PURE__ */ P(Ee, { primary: !0, children: "View" }),
        /* @__PURE__ */ P(Ee, { onClick: Z, disabled: !i, children: "Edit" })
      ] }) })
    ] }),
    /* @__PURE__ */ q(
      "div",
      {
        className: u === "view" ? "min-h-0 flex-1 overflow-y-auto px-6 pb-4" : "flex min-h-0 flex-1 flex-col px-6 pb-4",
        children: [
          u === "edit" && m && /* @__PURE__ */ q("div", { className: "mb-3 flex items-center gap-3 rounded border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm", children: [
            /* @__PURE__ */ P(Gi, { size: 16, className: "shrink-0 text-amber-500" }),
            /* @__PURE__ */ q("span", { className: "min-w-0 flex-1", children: [
              "Changed elsewhere (now v",
              m.version,
              ") — your save was rejected."
            ] }),
            /* @__PURE__ */ P(Ee, { onClick: ee, children: "Take theirs" }),
            /* @__PURE__ */ P(Ee, { danger: !0, onClick: () => void B(m.version), disabled: S, children: "Overwrite" })
          ] }),
          i ? u === "view" ? /* @__PURE__ */ P("div", { className: "max-w-3xl text-sm", children: i.content.trim() === "" ? /* @__PURE__ */ P("p", { className: "py-8 text-muted", children: "Empty ledger — add an item below." }) : /* @__PURE__ */ P(rp, { content: i.content, pendingLine: I, onToggle: J }) }) : /* @__PURE__ */ P(
            "textarea",
            {
              value: f,
              onChange: (L) => {
                c(L.target.value), p(!0);
              },
              spellCheck: !1,
              className: "min-h-0 w-full flex-1 resize-none rounded border border-border bg-transparent p-3 font-mono text-sm outline-none focus:border-[var(--accent)]"
            }
          ) : /* @__PURE__ */ P("div", { className: "flex flex-1 items-center justify-center py-16 text-muted", children: l ? /* @__PURE__ */ q("span", { className: "text-sm", children: [
            "Failed to load: ",
            l
          ] }) : /* @__PURE__ */ P(Ji, { size: 20, className: "animate-spin" }) })
        ]
      }
    ),
    /* @__PURE__ */ P("div", { className: "border-t border-border px-6 py-3", children: /* @__PURE__ */ q(
      "form",
      {
        className: "flex max-w-3xl items-center gap-2",
        onSubmit: (L) => {
          L.preventDefault(), ge();
        },
        children: [
          /* @__PURE__ */ P(Cr, { size: 14, className: "shrink-0 text-muted" }),
          /* @__PURE__ */ P(
            Ct,
            {
              value: W,
              onChange: (L) => U(L.target.value),
              placeholder: te ? "Save or cancel your edit to add items" : "Add a todo item — Enter to append",
              disabled: te || k || !i,
              className: "flex-1"
            }
          )
        ]
      }
    ) })
  ] });
}
function cp() {
  const e = br(), t = wr(), [n, r] = ne(null), [i, o] = ne(null), [l, a] = ne(null), u = vr(l);
  u.current = l;
  const s = Ir(async () => {
    try {
      r(await e.get(`${ve}/ledgers`)), o(null);
    } catch (m) {
      o(Pe(m));
    }
  }, [e]);
  hn(() => {
    if (l !== null) return;
    s();
    const m = setInterval(() => void s(), 5e3);
    return () => clearInterval(m);
  }, [l, s]), Sr("update", () => {
    u.current === null && s();
  });
  const f = async () => {
    var y;
    const m = (y = window.prompt("New ledger name")) == null ? void 0 : y.trim();
    if (m)
      try {
        const S = await e.post(`${ve}/ledgers`, { name: m });
        a(S.id);
      } catch (S) {
        t(Pe(S), { type: "error" });
      }
  }, c = async (m) => {
    if (window.confirm(`Delete ledger "${m.name}"? This cannot be undone.`))
      try {
        await e.del(`${ve}/ledgers/${m.id}`), s();
      } catch (y) {
        t(Pe(y), { type: "error" });
      }
  };
  if (l !== null)
    return /* @__PURE__ */ P(
      ip,
      {
        id: l,
        onBack: () => {
          a(null), s();
        }
      }
    );
  const h = (n == null ? void 0 : n.reduce((m, y) => m + (y.items_total - y.items_done), 0)) ?? 0, p = (n == null ? void 0 : n.reduce((m, y) => m + y.items_done, 0)) ?? 0;
  return /* @__PURE__ */ q(pn, { children: [
    /* @__PURE__ */ P(
      qi,
      {
        title: "Ledgers",
        subtitle: "Shared markdown todo lists — humans and agents, one source of truth",
        actions: /* @__PURE__ */ q(Ee, { primary: !0, onClick: () => void f(), children: [
          /* @__PURE__ */ P(Cr, { size: 14, className: "mr-1 inline align-[-2px]" }),
          "New ledger"
        ] })
      }
    ),
    /* @__PURE__ */ q("div", { className: "min-h-0 flex-1 overflow-y-auto px-6 pb-8", children: [
      /* @__PURE__ */ q("div", { className: "mb-6 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5", children: [
        /* @__PURE__ */ P(vn, { label: "Ledgers", value: n ? n.length : "…", accent: !0 }),
        /* @__PURE__ */ P(vn, { label: "Open items", value: n ? h : "…" }),
        /* @__PURE__ */ P(vn, { label: "Done items", value: n ? p : "…" })
      ] }),
      i && /* @__PURE__ */ q("div", { className: "mb-4 rounded border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm", children: [
        "Failed to load ledgers: ",
        i
      ] }),
      n && n.length === 0 ? /* @__PURE__ */ P(
        Wi,
        {
          icon: "📋",
          title: "No ledgers yet",
          subtitle: "Create one to start a shared todo list",
          action: /* @__PURE__ */ P(Ee, { primary: !0, onClick: () => void f(), children: "New ledger" })
        }
      ) : /* @__PURE__ */ P("div", { className: "grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3.5", children: (n ?? []).map((m) => /* @__PURE__ */ P(
        Qi,
        {
          onClick: () => a(m.id),
          className: "cursor-pointer transition-colors hover:border-[var(--accent)]",
          children: /* @__PURE__ */ q("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ q("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ P("div", { className: "truncate font-medium", children: m.name }),
              /* @__PURE__ */ q("div", { className: "mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted", children: [
                /* @__PURE__ */ q("span", { children: [
                  m.items_done,
                  "/",
                  m.items_total,
                  " done"
                ] }),
                m.items_claimed > 0 && /* @__PURE__ */ q(Yi, { variant: "warn", children: [
                  "⛓ ",
                  m.items_claimed,
                  " claimed"
                ] }),
                /* @__PURE__ */ q("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ P(Ki, { size: 11 }),
                  Tr(m.updated_at)
                ] })
              ] }),
              (m.pinned_sessions ?? []).length > 0 && /* @__PURE__ */ P("div", { className: "mt-2 flex flex-wrap gap-1", children: (m.pinned_sessions ?? []).map((y) => /* @__PURE__ */ q(
                "span",
                {
                  title: `Pinned to session ${y}`,
                  className: "rounded border border-border px-1.5 py-px text-[10px] text-muted",
                  children: [
                    "📌 ",
                    y.slice(0, 8)
                  ]
                },
                y
              )) })
            ] }),
            /* @__PURE__ */ P(
              "button",
              {
                type: "button",
                title: "Delete ledger",
                onClick: (y) => {
                  y.stopPropagation(), c(m);
                },
                className: "shrink-0 rounded p-1 text-muted transition-colors hover:text-red-400",
                children: /* @__PURE__ */ P(Zi, { size: 14 })
              }
            )
          ] })
        },
        m.id
      )) })
    ] })
  ] });
}
export {
  cp as default
};
