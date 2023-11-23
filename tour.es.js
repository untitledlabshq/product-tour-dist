var pa = Object.defineProperty;
var fa = (o, e, t) => e in o ? pa(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var cn = (o, e, t) => (fa(o, typeof e != "symbol" ? e + "" : e, t), t);
import { reactive as ga, createApp as Ar } from "https://unpkg.com/petite-vue?module";
function Oi(o) {
  o.preventDefault();
}
function Ii(o) {
  o.stopPropagation();
}
function ma(o, e, t) {
  if (t >= o.length)
    for (var n = t - o.length + 1; n--; )
      o.push(void 0);
  o.splice(t, 0, o.splice(e, 1)[0]);
}
const ba = function(o, e) {
  if (o.nodeType === Node.DOCUMENT_NODE)
    return "/";
  const t = [];
  let n = o;
  for (; n; ) {
    const i = va(n, e);
    if (!i || (t.push(i), i.optimized))
      break;
    n = n.parentNode;
  }
  return t.reverse(), (t.length && t[0].optimized ? "" : "/") + t.join("/");
}, va = function(o, e) {
  let t;
  const n = wa(o);
  if (n === -1)
    return null;
  switch (o.nodeType) {
    case Node.ELEMENT_NODE:
      if (e && o.getAttribute("id"))
        return new Ai(
          '//*[@id="' + o.getAttribute("id") + '"]',
          !0
        );
      t = o.localName;
      break;
    case Node.ATTRIBUTE_NODE:
      t = "@" + o.nodeName;
      break;
    case Node.TEXT_NODE:
    case Node.CDATA_SECTION_NODE:
      t = "text()";
      break;
    case Node.PROCESSING_INSTRUCTION_NODE:
      t = "processing-instruction()";
      break;
    case Node.COMMENT_NODE:
      t = "comment()";
      break;
    case Node.DOCUMENT_NODE:
      t = "";
      break;
    default:
      t = "";
      break;
  }
  return n > 0 && (t += "[" + n + "]"), new Ai(t, o.nodeType === Node.DOCUMENT_NODE);
}, wa = function(o) {
  function e(r, s) {
    if (r === s)
      return !0;
    if (r.nodeType === Node.ELEMENT_NODE && s.nodeType === Node.ELEMENT_NODE)
      return r.localName === s.localName;
    if (r.nodeType === s.nodeType)
      return !0;
    const a = r.nodeType === Node.CDATA_SECTION_NODE ? Node.TEXT_NODE : r.nodeType, l = s.nodeType === Node.CDATA_SECTION_NODE ? Node.TEXT_NODE : s.nodeType;
    return a === l;
  }
  const t = o.parentNode ? o.parentNode.children : null;
  if (!t)
    return 0;
  let n;
  for (let r = 0; r < t.length; ++r)
    if (e(o, t[r]) && t[r] !== o) {
      n = !0;
      break;
    }
  if (!n)
    return 0;
  let i = 1;
  for (let r = 0; r < t.length; ++r)
    if (e(o, t[r])) {
      if (t[r] === o)
        return i;
      ++i;
    }
  return -1;
}, Ai = class {
  /**
   * @param {string} value
   * @param {boolean} optimized
   */
  constructor(e, t) {
    cn(this, "value", "");
    cn(this, "optimized", !1);
    this.value = e, this.optimized = t || !1;
  }
  /**
   * @override
   * @return {string}
   */
  toString() {
    return this.value;
  }
};
function ya(o) {
  return ba(o, !1);
}
function ka(o) {
  const e = o.replace("/svg", "/*[local-name()='svg']");
  return document.evaluate(
    e,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}
/*! shepherd.js 11.1.1 */
var xa = function(e) {
  return Ea(e) && !Sa(e);
};
function Ea(o) {
  return !!o && typeof o == "object";
}
function Sa(o) {
  var e = Object.prototype.toString.call(o);
  return e === "[object RegExp]" || e === "[object Date]" || Ba(o);
}
var Ca = typeof Symbol == "function" && Symbol.for, Ta = Ca ? Symbol.for("react.element") : 60103;
function Ba(o) {
  return o.$$typeof === Ta;
}
function _a(o) {
  return Array.isArray(o) ? [] : {};
}
function ro(o, e) {
  return e.clone !== !1 && e.isMergeableObject(o) ? Lt(_a(o), o, e) : o;
}
function Oa(o, e, t) {
  return o.concat(e).map(function(n) {
    return ro(n, t);
  });
}
function Ia(o, e) {
  if (!e.customMerge)
    return Lt;
  var t = e.customMerge(o);
  return typeof t == "function" ? t : Lt;
}
function Aa(o) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(o).filter(function(e) {
    return Object.propertyIsEnumerable.call(o, e);
  }) : [];
}
function Mi(o) {
  return Object.keys(o).concat(Aa(o));
}
function Mr(o, e) {
  try {
    return e in o;
  } catch {
    return !1;
  }
}
function Ma(o, e) {
  return Mr(o, e) && !(Object.hasOwnProperty.call(o, e) && Object.propertyIsEnumerable.call(o, e));
}
function La(o, e, t) {
  var n = {};
  return t.isMergeableObject(o) && Mi(o).forEach(function(i) {
    n[i] = ro(o[i], t);
  }), Mi(e).forEach(function(i) {
    Ma(o, i) || (Mr(o, i) && t.isMergeableObject(e[i]) ? n[i] = Ia(i, t)(o[i], e[i], t) : n[i] = ro(e[i], t));
  }), n;
}
function Lt(o, e, t) {
  t = t || {}, t.arrayMerge = t.arrayMerge || Oa, t.isMergeableObject = t.isMergeableObject || xa, t.cloneUnlessOtherwiseSpecified = ro;
  var n = Array.isArray(e), i = Array.isArray(o), r = n === i;
  return r ? n ? t.arrayMerge(o, e, t) : La(o, e, t) : ro(e, t);
}
Lt.all = function(e, t) {
  if (!Array.isArray(e))
    throw new Error("first argument should be an array");
  return e.reduce(function(n, i) {
    return Lt(n, i, t);
  }, {});
};
var Na = Lt, Zn = Na;
function Ra(o) {
  return o instanceof Element;
}
function Jn(o) {
  return o instanceof HTMLElement;
}
function ft(o) {
  return typeof o == "function";
}
function so(o) {
  return typeof o == "string";
}
function he(o) {
  return o === void 0;
}
class Qn {
  on(e, t, n, i) {
    return i === void 0 && (i = !1), he(this.bindings) && (this.bindings = {}), he(this.bindings[e]) && (this.bindings[e] = []), this.bindings[e].push({
      handler: t,
      ctx: n,
      once: i
    }), this;
  }
  once(e, t, n) {
    return this.on(e, t, n, !0);
  }
  off(e, t) {
    return he(this.bindings) || he(this.bindings[e]) ? this : (he(t) ? delete this.bindings[e] : this.bindings[e].forEach((n, i) => {
      n.handler === t && this.bindings[e].splice(i, 1);
    }), this);
  }
  trigger(e) {
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
      n[i - 1] = arguments[i];
    return !he(this.bindings) && this.bindings[e] && this.bindings[e].forEach((r, s) => {
      const {
        ctx: a,
        handler: l,
        once: c
      } = r, u = a || this;
      l.apply(u, n), c && this.bindings[e].splice(s, 1);
    }), this;
  }
}
function Lr(o) {
  const e = Object.getOwnPropertyNames(o.constructor.prototype);
  for (let t = 0; t < e.length; t++) {
    const n = e[t], i = o[n];
    n !== "constructor" && typeof i == "function" && (o[n] = i.bind(o));
  }
  return o;
}
function Da(o, e) {
  return (t) => {
    if (e.isOpen()) {
      const n = e.el && t.currentTarget === e.el;
      (!he(o) && t.currentTarget.matches(o) || n) && e.tour.next();
    }
  };
}
function Pa(o) {
  const {
    event: e,
    selector: t
  } = o.options.advanceOn || {};
  if (e) {
    const n = Da(t, o);
    let i;
    try {
      i = document.querySelector(t);
    } catch {
    }
    if (!he(t) && !i)
      return console.error(`No element was found for the selector supplied to advanceOn: ${t}`);
    i ? (i.addEventListener(e, n), o.on("destroy", () => i.removeEventListener(e, n))) : (document.body.addEventListener(e, n, !0), o.on("destroy", () => document.body.removeEventListener(e, n, !0)));
  } else
    return console.error("advanceOn was defined, but no event name was passed.");
}
function Nr(o) {
  return !so(o) || o === "" ? "" : o.charAt(o.length - 1) !== "-" ? `${o}-` : o;
}
function Fa(o) {
  const e = o.options.attachTo || {}, t = Object.assign({}, e);
  if (ft(t.element) && (t.element = t.element.call(o)), so(t.element)) {
    try {
      t.element = document.querySelector(t.element);
    } catch {
    }
    t.element || console.error(`The element for this Shepherd step was not found ${e.element}`);
  }
  return t;
}
function Rr(o) {
  return o == null ? !0 : !o.element || !o.on;
}
function ei() {
  let o = Date.now();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (e) => {
    const t = (o + Math.random() * 16) % 16 | 0;
    return o = Math.floor(o / 16), (e == "x" ? t : t & 3 | 8).toString(16);
  });
}
function fe() {
  return fe = Object.assign ? Object.assign.bind() : function(o) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (o[n] = t[n]);
    }
    return o;
  }, fe.apply(this, arguments);
}
function Dr(o, e) {
  if (o == null)
    return {};
  var t = {}, n = Object.keys(o), i, r;
  for (r = 0; r < n.length; r++)
    i = n[r], !(e.indexOf(i) >= 0) && (t[i] = o[i]);
  return t;
}
const Ha = ["mainAxis", "crossAxis", "fallbackPlacements", "fallbackStrategy", "fallbackAxisSideDirection", "flipAlignment"], ja = ["mainAxis", "crossAxis", "limiter"];
function qo(o) {
  return o.split("-")[1];
}
function ti(o) {
  return o === "y" ? "height" : "width";
}
function gt(o) {
  return o.split("-")[0];
}
function ho(o) {
  return ["top", "bottom"].includes(gt(o)) ? "x" : "y";
}
function Li(o, e, t) {
  let {
    reference: n,
    floating: i
  } = o;
  const r = n.x + n.width / 2 - i.width / 2, s = n.y + n.height / 2 - i.height / 2, a = ho(e), l = ti(a), c = n[l] / 2 - i[l] / 2, u = gt(e), d = a === "x";
  let h;
  switch (u) {
    case "top":
      h = {
        x: r,
        y: n.y - i.height
      };
      break;
    case "bottom":
      h = {
        x: r,
        y: n.y + n.height
      };
      break;
    case "right":
      h = {
        x: n.x + n.width,
        y: s
      };
      break;
    case "left":
      h = {
        x: n.x - i.width,
        y: s
      };
      break;
    default:
      h = {
        x: n.x,
        y: n.y
      };
  }
  switch (qo(e)) {
    case "start":
      h[a] -= c * (t && d ? -1 : 1);
      break;
    case "end":
      h[a] += c * (t && d ? -1 : 1);
      break;
  }
  return h;
}
const Ua = async (o, e, t) => {
  const {
    placement: n = "bottom",
    strategy: i = "absolute",
    middleware: r = [],
    platform: s
  } = t, a = r.filter(Boolean), l = await (s.isRTL == null ? void 0 : s.isRTL(e));
  let c = await s.getElementRects({
    reference: o,
    floating: e,
    strategy: i
  }), {
    x: u,
    y: d
  } = Li(c, n, l), h = n, f = {}, p = 0;
  for (let g = 0; g < a.length; g++) {
    const {
      name: _,
      fn: B
    } = a[g], {
      x: T,
      y: S,
      data: v,
      reset: b
    } = await B({
      x: u,
      y: d,
      initialPlacement: n,
      placement: h,
      strategy: i,
      middlewareData: f,
      rects: c,
      platform: s,
      elements: {
        reference: o,
        floating: e
      }
    });
    if (u = T ?? u, d = S ?? d, f = fe({}, f, {
      [_]: fe({}, f[_], v)
    }), b && p <= 50) {
      p++, typeof b == "object" && (b.placement && (h = b.placement), b.rects && (c = b.rects === !0 ? await s.getElementRects({
        reference: o,
        floating: e,
        strategy: i
      }) : b.rects), {
        x: u,
        y: d
      } = Li(c, h, l)), g = -1;
      continue;
    }
  }
  return {
    x: u,
    y: d,
    placement: h,
    strategy: i,
    middlewareData: f
  };
};
function za(o) {
  return fe({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }, o);
}
function Pr(o) {
  return typeof o != "number" ? za(o) : {
    top: o,
    right: o,
    bottom: o,
    left: o
  };
}
function Po(o) {
  return fe({}, o, {
    top: o.y,
    left: o.x,
    right: o.x + o.width,
    bottom: o.y + o.height
  });
}
async function Fr(o, e) {
  var t;
  e === void 0 && (e = {});
  const {
    x: n,
    y: i,
    platform: r,
    rects: s,
    elements: a,
    strategy: l
  } = o, {
    boundary: c = "clippingAncestors",
    rootBoundary: u = "viewport",
    elementContext: d = "floating",
    altBoundary: h = !1,
    padding: f = 0
  } = e, p = Pr(f), _ = a[h ? d === "floating" ? "reference" : "floating" : d], B = Po(await r.getClippingRect({
    element: (t = await (r.isElement == null ? void 0 : r.isElement(_))) == null || t ? _ : _.contextElement || await (r.getDocumentElement == null ? void 0 : r.getDocumentElement(a.floating)),
    boundary: c,
    rootBoundary: u,
    strategy: l
  })), T = d === "floating" ? fe({}, s.floating, {
    x: n,
    y: i
  }) : s.reference, S = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(a.floating)), v = await (r.isElement == null ? void 0 : r.isElement(S)) ? await (r.getScale == null ? void 0 : r.getScale(S)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, b = Po(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: T,
    offsetParent: S,
    strategy: l
  }) : T);
  return {
    top: (B.top - b.top + p.top) / v.y,
    bottom: (b.bottom - B.bottom + p.bottom) / v.y,
    left: (B.left - b.left + p.left) / v.x,
    right: (b.right - B.right + p.right) / v.x
  };
}
const $a = Math.min, Va = Math.max;
function Bn(o, e, t) {
  return Va(o, $a(e, t));
}
const Wa = (o) => ({
  name: "arrow",
  options: o,
  async fn(e) {
    const {
      element: t,
      padding: n = 0
    } = o || {}, {
      x: i,
      y: r,
      placement: s,
      rects: a,
      platform: l,
      elements: c
    } = e;
    if (t == null)
      return {};
    const u = Pr(n), d = {
      x: i,
      y: r
    }, h = ho(s), f = ti(h), p = await l.getDimensions(t), g = h === "y", _ = g ? "top" : "left", B = g ? "bottom" : "right", T = g ? "clientHeight" : "clientWidth", S = a.reference[f] + a.reference[h] - d[h] - a.floating[f], v = d[h] - a.reference[h], b = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(t));
    let I = b ? b[T] : 0;
    (!I || !await (l.isElement == null ? void 0 : l.isElement(b))) && (I = c.floating[T] || a.floating[f]);
    const P = S / 2 - v / 2, C = u[_], x = I - p[f] - u[B], L = I / 2 - p[f] / 2 + P, w = Bn(C, L, x), E = qo(s) != null && L != w && a.reference[f] / 2 - (L < C ? u[_] : u[B]) - p[f] / 2 < 0 ? L < C ? C - L : x - L : 0;
    return {
      [h]: d[h] - E,
      data: {
        [h]: w,
        centerOffset: L - w
      }
    };
  }
}), Ya = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Fo(o) {
  return o.replace(/left|right|bottom|top/g, (e) => Ya[e]);
}
function Xa(o, e, t) {
  t === void 0 && (t = !1);
  const n = qo(o), i = ho(o), r = ti(i);
  let s = i === "x" ? n === (t ? "end" : "start") ? "right" : "left" : n === "start" ? "bottom" : "top";
  return e.reference[r] > e.floating[r] && (s = Fo(s)), {
    main: s,
    cross: Fo(s)
  };
}
const Ka = {
  start: "end",
  end: "start"
};
function _n(o) {
  return o.replace(/start|end/g, (e) => Ka[e]);
}
function qa(o) {
  const e = Fo(o);
  return [_n(o), e, _n(e)];
}
function Ga(o, e, t) {
  const n = ["left", "right"], i = ["right", "left"], r = ["top", "bottom"], s = ["bottom", "top"];
  switch (o) {
    case "top":
    case "bottom":
      return t ? e ? i : n : e ? n : i;
    case "left":
    case "right":
      return e ? r : s;
    default:
      return [];
  }
}
function Za(o, e, t, n) {
  const i = qo(o);
  let r = Ga(gt(o), t === "start", n);
  return i && (r = r.map((s) => s + "-" + i), e && (r = r.concat(r.map(_n)))), r;
}
const Ja = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n;
      const {
        placement: i,
        middlewareData: r,
        rects: s,
        initialPlacement: a,
        platform: l,
        elements: c
      } = t, {
        mainAxis: u = !0,
        crossAxis: d = !0,
        fallbackPlacements: h,
        fallbackStrategy: f = "bestFit",
        fallbackAxisSideDirection: p = "none",
        flipAlignment: g = !0
      } = e, _ = Dr(e, Ha), B = gt(i), T = gt(a) === a, S = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)), v = h || (T || !g ? [Fo(a)] : qa(a));
      !h && p !== "none" && v.push(...Za(a, g, p, S));
      const b = [a, ...v], I = await Fr(t, _), P = [];
      let C = ((n = r.flip) == null ? void 0 : n.overflows) || [];
      if (u && P.push(I[B]), d) {
        const {
          main: k,
          cross: E
        } = Xa(i, s, S);
        P.push(I[k], I[E]);
      }
      if (C = [...C, {
        placement: i,
        overflows: P
      }], !P.every((k) => k <= 0)) {
        var x, L;
        const k = (((x = r.flip) == null ? void 0 : x.index) || 0) + 1, E = b[k];
        if (E)
          return {
            data: {
              index: k,
              overflows: C
            },
            reset: {
              placement: E
            }
          };
        let M = (L = C.filter((A) => A.overflows[0] <= 0).sort((A, N) => A.overflows[1] - N.overflows[1])[0]) == null ? void 0 : L.placement;
        if (!M)
          switch (f) {
            case "bestFit": {
              var w;
              const A = (w = C.map((N) => [N.placement, N.overflows.filter((V) => V > 0).reduce((V, z) => V + z, 0)]).sort((N, V) => N[1] - V[1])[0]) == null ? void 0 : w[0];
              A && (M = A);
              break;
            }
            case "initialPlacement":
              M = a;
              break;
          }
        if (i !== M)
          return {
            reset: {
              placement: M
            }
          };
      }
      return {};
    }
  };
};
function Hr(o) {
  return o === "x" ? "y" : "x";
}
const Qa = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: i,
        placement: r
      } = t, {
        mainAxis: s = !0,
        crossAxis: a = !1,
        limiter: l = {
          fn: (B) => {
            let {
              x: T,
              y: S
            } = B;
            return {
              x: T,
              y: S
            };
          }
        }
      } = e, c = Dr(e, ja), u = {
        x: n,
        y: i
      }, d = await Fr(t, c), h = ho(gt(r)), f = Hr(h);
      let p = u[h], g = u[f];
      if (s) {
        const B = h === "y" ? "top" : "left", T = h === "y" ? "bottom" : "right", S = p + d[B], v = p - d[T];
        p = Bn(S, p, v);
      }
      if (a) {
        const B = f === "y" ? "top" : "left", T = f === "y" ? "bottom" : "right", S = g + d[B], v = g - d[T];
        g = Bn(S, g, v);
      }
      const _ = l.fn(fe({}, t, {
        [h]: p,
        [f]: g
      }));
      return fe({}, _, {
        data: {
          x: _.x - n,
          y: _.y - i
        }
      });
    }
  };
}, el = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: i,
        placement: r,
        rects: s,
        middlewareData: a
      } = t, {
        offset: l = 0,
        mainAxis: c = !0,
        crossAxis: u = !0
      } = e, d = {
        x: n,
        y: i
      }, h = ho(r), f = Hr(h);
      let p = d[h], g = d[f];
      const _ = typeof l == "function" ? l(t) : l, B = typeof _ == "number" ? {
        mainAxis: _,
        crossAxis: 0
      } : fe({
        mainAxis: 0,
        crossAxis: 0
      }, _);
      if (c) {
        const v = h === "y" ? "height" : "width", b = s.reference[h] - s.floating[v] + B.mainAxis, I = s.reference[h] + s.reference[v] - B.mainAxis;
        p < b ? p = b : p > I && (p = I);
      }
      if (u) {
        var T, S;
        const v = h === "y" ? "width" : "height", b = ["top", "left"].includes(gt(r)), I = s.reference[f] - s.floating[v] + (b && ((T = a.offset) == null ? void 0 : T[f]) || 0) + (b ? 0 : B.crossAxis), P = s.reference[f] + s.reference[v] + (b ? 0 : ((S = a.offset) == null ? void 0 : S[f]) || 0) - (b ? B.crossAxis : 0);
        g < I ? g = I : g > P && (g = P);
      }
      return {
        [h]: p,
        [f]: g
      };
    }
  };
};
function ke(o) {
  var e;
  return ((e = o.ownerDocument) == null ? void 0 : e.defaultView) || window;
}
function Pe(o) {
  return ke(o).getComputedStyle(o);
}
function jr(o) {
  return o instanceof ke(o).Node;
}
function ot(o) {
  return jr(o) ? (o.nodeName || "").toLowerCase() : "";
}
let ko;
function Ur() {
  if (ko)
    return ko;
  const o = navigator.userAgentData;
  return o && Array.isArray(o.brands) ? (ko = o.brands.map((e) => e.brand + "/" + e.version).join(" "), ko) : navigator.userAgent;
}
function Ae(o) {
  return o instanceof ke(o).HTMLElement;
}
function Ie(o) {
  return o instanceof ke(o).Element;
}
function Ni(o) {
  if (typeof ShadowRoot > "u")
    return !1;
  const e = ke(o).ShadowRoot;
  return o instanceof e || o instanceof ShadowRoot;
}
function Go(o) {
  const {
    overflow: e,
    overflowX: t,
    overflowY: n,
    display: i
  } = Pe(o);
  return /auto|scroll|overlay|hidden|clip/.test(e + n + t) && !["inline", "contents"].includes(i);
}
function tl(o) {
  return ["table", "td", "th"].includes(ot(o));
}
function oi(o) {
  const e = /firefox/i.test(Ur()), t = Pe(o), n = t.backdropFilter || t.WebkitBackdropFilter;
  return t.transform !== "none" || t.perspective !== "none" || (n ? n !== "none" : !1) || e && t.willChange === "filter" || e && (t.filter ? t.filter !== "none" : !1) || ["transform", "perspective"].some((i) => t.willChange.includes(i)) || ["paint", "layout", "strict", "content"].some((i) => {
    const r = t.contain;
    return r != null ? r.includes(i) : !1;
  });
}
function ni() {
  return /^((?!chrome|android).)*safari/i.test(Ur());
}
function ii(o) {
  return ["html", "body", "#document"].includes(ot(o));
}
const Ri = Math.min, Kt = Math.max, Ho = Math.round;
function zr(o) {
  const e = Pe(o);
  let t = parseFloat(e.width), n = parseFloat(e.height);
  const i = Ae(o), r = i ? o.offsetWidth : t, s = i ? o.offsetHeight : n, a = Ho(t) !== r || Ho(n) !== s;
  return a && (t = r, n = s), {
    width: t,
    height: n,
    fallback: a
  };
}
function $r(o) {
  return Ie(o) ? o : o.contextElement;
}
const Vr = {
  x: 1,
  y: 1
};
function It(o) {
  const e = $r(o);
  if (!Ae(e))
    return Vr;
  const t = e.getBoundingClientRect(), {
    width: n,
    height: i,
    fallback: r
  } = zr(e);
  let s = (r ? Ho(t.width) : t.width) / n, a = (r ? Ho(t.height) : t.height) / i;
  return (!s || !Number.isFinite(s)) && (s = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: s,
    y: a
  };
}
function mt(o, e, t, n) {
  var i, r;
  e === void 0 && (e = !1), t === void 0 && (t = !1);
  const s = o.getBoundingClientRect(), a = $r(o);
  let l = Vr;
  e && (n ? Ie(n) && (l = It(n)) : l = It(o));
  const c = a ? ke(a) : window, u = ni() && t;
  let d = (s.left + (u && ((i = c.visualViewport) == null ? void 0 : i.offsetLeft) || 0)) / l.x, h = (s.top + (u && ((r = c.visualViewport) == null ? void 0 : r.offsetTop) || 0)) / l.y, f = s.width / l.x, p = s.height / l.y;
  if (a) {
    const g = ke(a), _ = n && Ie(n) ? ke(n) : n;
    let B = g.frameElement;
    for (; B && n && _ !== g; ) {
      const T = It(B), S = B.getBoundingClientRect(), v = getComputedStyle(B);
      S.x += (B.clientLeft + parseFloat(v.paddingLeft)) * T.x, S.y += (B.clientTop + parseFloat(v.paddingTop)) * T.y, d *= T.x, h *= T.y, f *= T.x, p *= T.y, d += S.x, h += S.y, B = ke(B).frameElement;
    }
  }
  return Po({
    width: f,
    height: p,
    x: d,
    y: h
  });
}
function it(o) {
  return ((jr(o) ? o.ownerDocument : o.document) || window.document).documentElement;
}
function Zo(o) {
  return Ie(o) ? {
    scrollLeft: o.scrollLeft,
    scrollTop: o.scrollTop
  } : {
    scrollLeft: o.pageXOffset,
    scrollTop: o.pageYOffset
  };
}
function ol(o) {
  let {
    rect: e,
    offsetParent: t,
    strategy: n
  } = o;
  const i = Ae(t), r = it(t);
  if (t === r)
    return e;
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = {
    x: 1,
    y: 1
  };
  const l = {
    x: 0,
    y: 0
  };
  if ((i || !i && n !== "fixed") && ((ot(t) !== "body" || Go(r)) && (s = Zo(t)), Ae(t))) {
    const c = mt(t);
    a = It(t), l.x = c.x + t.clientLeft, l.y = c.y + t.clientTop;
  }
  return {
    width: e.width * a.x,
    height: e.height * a.y,
    x: e.x * a.x - s.scrollLeft * a.x + l.x,
    y: e.y * a.y - s.scrollTop * a.y + l.y
  };
}
function Wr(o) {
  return mt(it(o)).left + Zo(o).scrollLeft;
}
function nl(o) {
  const e = it(o), t = Zo(o), n = o.ownerDocument.body, i = Kt(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), r = Kt(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight);
  let s = -t.scrollLeft + Wr(o);
  const a = -t.scrollTop;
  return Pe(n).direction === "rtl" && (s += Kt(e.clientWidth, n.clientWidth) - i), {
    width: i,
    height: r,
    x: s,
    y: a
  };
}
function ao(o) {
  if (ot(o) === "html")
    return o;
  const e = (
    // Step into the shadow DOM of the parent of a slotted node.
    o.assignedSlot || // DOM Element detected.
    o.parentNode || // ShadowRoot detected.
    Ni(o) && o.host || // Fallback.
    it(o)
  );
  return Ni(e) ? e.host : e;
}
function Yr(o) {
  const e = ao(o);
  return ii(e) ? e.ownerDocument.body : Ae(e) && Go(e) ? e : Yr(e);
}
function qt(o, e) {
  var t;
  e === void 0 && (e = []);
  const n = Yr(o), i = n === ((t = o.ownerDocument) == null ? void 0 : t.body), r = ke(n);
  return i ? e.concat(r, r.visualViewport || [], Go(n) ? n : []) : e.concat(n, qt(n));
}
function il(o, e) {
  const t = ke(o), n = it(o), i = t.visualViewport;
  let r = n.clientWidth, s = n.clientHeight, a = 0, l = 0;
  if (i) {
    r = i.width, s = i.height;
    const c = ni();
    (!c || c && e === "fixed") && (a = i.offsetLeft, l = i.offsetTop);
  }
  return {
    width: r,
    height: s,
    x: a,
    y: l
  };
}
function rl(o, e) {
  const t = mt(o, !0, e === "fixed"), n = t.top + o.clientTop, i = t.left + o.clientLeft, r = Ae(o) ? It(o) : {
    x: 1,
    y: 1
  }, s = o.clientWidth * r.x, a = o.clientHeight * r.y, l = i * r.x, c = n * r.y;
  return {
    width: s,
    height: a,
    x: l,
    y: c
  };
}
function Di(o, e, t) {
  let n;
  if (e === "viewport")
    n = il(o, t);
  else if (e === "document")
    n = nl(it(o));
  else if (Ie(e))
    n = rl(e, t);
  else {
    const s = fe({}, e);
    if (ni()) {
      var i, r;
      const a = ke(o);
      s.x -= ((i = a.visualViewport) == null ? void 0 : i.offsetLeft) || 0, s.y -= ((r = a.visualViewport) == null ? void 0 : r.offsetTop) || 0;
    }
    n = s;
  }
  return Po(n);
}
function sl(o, e) {
  const t = e.get(o);
  if (t)
    return t;
  let n = qt(o).filter((a) => Ie(a) && ot(a) !== "body"), i = null;
  const r = Pe(o).position === "fixed";
  let s = r ? ao(o) : o;
  for (; Ie(s) && !ii(s); ) {
    const a = Pe(s), l = oi(s);
    a.position === "fixed" ? i = null : (r ? !l && !i : !l && a.position === "static" && !!i && ["absolute", "fixed"].includes(i.position)) ? n = n.filter((d) => d !== s) : i = a, s = ao(s);
  }
  return e.set(o, n), n;
}
function al(o) {
  let {
    element: e,
    boundary: t,
    rootBoundary: n,
    strategy: i
  } = o;
  const s = [...t === "clippingAncestors" ? sl(e, this._c) : [].concat(t), n], a = s[0], l = s.reduce((c, u) => {
    const d = Di(e, u, i);
    return c.top = Kt(d.top, c.top), c.right = Ri(d.right, c.right), c.bottom = Ri(d.bottom, c.bottom), c.left = Kt(d.left, c.left), c;
  }, Di(e, a, i));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function ll(o) {
  return zr(o);
}
function Pi(o, e) {
  return !Ae(o) || Pe(o).position === "fixed" ? null : e ? e(o) : o.offsetParent;
}
function cl(o) {
  let e = ao(o);
  for (; Ae(e) && !ii(e); ) {
    if (oi(e))
      return e;
    e = ao(e);
  }
  return null;
}
function Fi(o, e) {
  const t = ke(o);
  if (!Ae(o))
    return t;
  let n = Pi(o, e);
  for (; n && tl(n) && Pe(n).position === "static"; )
    n = Pi(n, e);
  return n && (ot(n) === "html" || ot(n) === "body" && Pe(n).position === "static" && !oi(n)) ? t : n || cl(o) || t;
}
function dl(o, e, t) {
  const n = Ae(e), i = it(e), r = mt(o, !0, t === "fixed", e);
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const a = {
    x: 0,
    y: 0
  };
  if (n || !n && t !== "fixed")
    if ((ot(e) !== "body" || Go(i)) && (s = Zo(e)), Ae(e)) {
      const l = mt(e, !0);
      a.x = l.x + e.clientLeft, a.y = l.y + e.clientTop;
    } else
      i && (a.x = Wr(i));
  return {
    x: r.left + s.scrollLeft - a.x,
    y: r.top + s.scrollTop - a.y,
    width: r.width,
    height: r.height
  };
}
const ul = {
  getClippingRect: al,
  convertOffsetParentRelativeRectToViewportRelativeRect: ol,
  isElement: Ie,
  getDimensions: ll,
  getOffsetParent: Fi,
  getDocumentElement: it,
  getScale: It,
  async getElementRects(o) {
    let {
      reference: e,
      floating: t,
      strategy: n
    } = o;
    const i = this.getOffsetParent || Fi, r = this.getDimensions;
    return {
      reference: dl(e, await i(t), n),
      floating: fe({
        x: 0,
        y: 0
      }, await r(t))
    };
  },
  getClientRects: (o) => Array.from(o.getClientRects()),
  isRTL: (o) => Pe(o).direction === "rtl"
};
function hl(o, e, t, n) {
  n === void 0 && (n = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: r = !0,
    elementResize: s = !0,
    animationFrame: a = !1
  } = n, l = i && !a, c = l || r ? [...Ie(o) ? qt(o) : o.contextElement ? qt(o.contextElement) : [], ...qt(e)] : [];
  c.forEach((p) => {
    l && p.addEventListener("scroll", t, {
      passive: !0
    }), r && p.addEventListener("resize", t);
  });
  let u = null;
  s && (u = new ResizeObserver(() => {
    t();
  }), Ie(o) && !a && u.observe(o), !Ie(o) && o.contextElement && !a && u.observe(o.contextElement), u.observe(e));
  let d, h = a ? mt(o) : null;
  a && f();
  function f() {
    const p = mt(o);
    h && (p.x !== h.x || p.y !== h.y || p.width !== h.width || p.height !== h.height) && t(), h = p, d = requestAnimationFrame(f);
  }
  return t(), () => {
    var p;
    c.forEach((g) => {
      l && g.removeEventListener("scroll", t), r && g.removeEventListener("resize", t);
    }), (p = u) == null || p.disconnect(), u = null, a && cancelAnimationFrame(d);
  };
}
const pl = (o, e, t) => {
  const n = /* @__PURE__ */ new Map(), i = fe({
    platform: ul
  }, t), r = fe({}, i.platform, {
    _c: n
  });
  return Ua(o, e, fe({}, i, {
    platform: r
  }));
};
function fl(o) {
  o.cleanup && o.cleanup();
  const e = o._getResolvedAttachToOptions();
  let t = e.element;
  const n = yl(e, o), i = Rr(e);
  return i && (t = document.body, o.shepherdElementComponent.getElement().classList.add("shepherd-centered")), o.cleanup = hl(t, o.el, () => {
    if (!o.el) {
      o.cleanup();
      return;
    }
    bl(t, o, n, i);
  }), o.target = e.element, n;
}
function gl(o, e) {
  return {
    floatingUIOptions: Zn(o.floatingUIOptions || {}, e.floatingUIOptions || {})
  };
}
function ml(o) {
  o.cleanup && o.cleanup(), o.cleanup = null;
}
function bl(o, e, t, n) {
  return pl(o, e.el, t).then(vl(e, n)).then((i) => new Promise((r) => {
    setTimeout(() => r(i), 300);
  })).then((i) => {
    i && i.el && i.el.focus({
      preventScroll: !0
    });
  });
}
function vl(o, e) {
  return (t) => {
    let {
      x: n,
      y: i,
      placement: r,
      middlewareData: s
    } = t;
    return o.el && (e ? Object.assign(o.el.style, {
      position: "fixed",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)"
    }) : Object.assign(o.el.style, {
      position: "absolute",
      left: `${n}px`,
      top: `${i}px`
    }), o.el.dataset.popperPlacement = r, wl(o.el, s)), o;
  };
}
function wl(o, e) {
  const t = o.querySelector(".shepherd-arrow");
  if (t && e.arrow) {
    const {
      x: n,
      y: i
    } = e.arrow;
    Object.assign(t.style, {
      left: n != null ? `${n}px` : "",
      top: i != null ? `${i}px` : ""
    });
  }
}
function yl(o, e) {
  const t = {
    strategy: "absolute",
    middleware: []
  }, n = kl(e);
  return Rr(o) || (t.middleware.push(
    Ja(),
    // Replicate PopperJS default behavior.
    Qa({
      limiter: el(),
      crossAxis: !0
    })
  ), n && t.middleware.push(Wa({
    element: n
  })), t.placement = o.on), Zn(e.options.floatingUIOptions || {}, t);
}
function kl(o) {
  return o.options.arrow && o.el ? o.el.querySelector(".shepherd-arrow") : !1;
}
function xe() {
}
function xl(o, e) {
  for (const t in e)
    o[t] = e[t];
  return o;
}
function Xr(o) {
  return o();
}
function Hi() {
  return /* @__PURE__ */ Object.create(null);
}
function po(o) {
  o.forEach(Xr);
}
function ri(o) {
  return typeof o == "function";
}
function Xe(o, e) {
  return o != o ? e == e : o !== e || o && typeof o == "object" || typeof o == "function";
}
function El(o) {
  return Object.keys(o).length === 0;
}
function Nt(o, e) {
  o.appendChild(e);
}
function Le(o, e, t) {
  o.insertBefore(e, t || null);
}
function Te(o) {
  o.parentNode && o.parentNode.removeChild(o);
}
function Sl(o, e) {
  for (let t = 0; t < o.length; t += 1)
    o[t] && o[t].d(e);
}
function Fe(o) {
  return document.createElement(o);
}
function ji(o) {
  return document.createElementNS("http://www.w3.org/2000/svg", o);
}
function Kr(o) {
  return document.createTextNode(o);
}
function jo() {
  return Kr(" ");
}
function Cl() {
  return Kr("");
}
function Jo(o, e, t, n) {
  return o.addEventListener(e, t, n), () => o.removeEventListener(e, t, n);
}
function G(o, e, t) {
  t == null ? o.removeAttribute(e) : o.getAttribute(e) !== t && o.setAttribute(e, t);
}
function Ui(o, e) {
  const t = Object.getOwnPropertyDescriptors(o.__proto__);
  for (const n in e)
    e[n] == null ? o.removeAttribute(n) : n === "style" ? o.style.cssText = e[n] : n === "__value" ? o.value = o[n] = e[n] : t[n] && t[n].set ? o[n] = e[n] : G(o, n, e[n]);
}
function Tl(o) {
  return Array.from(o.childNodes);
}
function yt(o, e, t) {
  o.classList[t ? "add" : "remove"](e);
}
let lo;
function Gt(o) {
  lo = o;
}
function qr() {
  if (!lo)
    throw new Error("Function called outside component initialization");
  return lo;
}
function Bl(o) {
  qr().$$.on_mount.push(o);
}
function si(o) {
  qr().$$.after_update.push(o);
}
const St = [], Rt = [];
let At = [];
const zi = [], _l = /* @__PURE__ */ Promise.resolve();
let On = !1;
function Ol() {
  On || (On = !0, _l.then(Gr));
}
function In(o) {
  At.push(o);
}
const dn = /* @__PURE__ */ new Set();
let kt = 0;
function Gr() {
  if (kt !== 0)
    return;
  const o = lo;
  do {
    try {
      for (; kt < St.length; ) {
        const e = St[kt];
        kt++, Gt(e), Il(e.$$);
      }
    } catch (e) {
      throw St.length = 0, kt = 0, e;
    }
    for (Gt(null), St.length = 0, kt = 0; Rt.length; )
      Rt.pop()();
    for (let e = 0; e < At.length; e += 1) {
      const t = At[e];
      dn.has(t) || (dn.add(t), t());
    }
    At.length = 0;
  } while (St.length);
  for (; zi.length; )
    zi.pop()();
  On = !1, dn.clear(), Gt(o);
}
function Il(o) {
  if (o.fragment !== null) {
    o.update(), po(o.before_update);
    const e = o.dirty;
    o.dirty = [-1], o.fragment && o.fragment.p(o.ctx, e), o.after_update.forEach(In);
  }
}
function Al(o) {
  const e = [], t = [];
  At.forEach((n) => o.indexOf(n) === -1 ? e.push(n) : t.push(n)), t.forEach((n) => n()), At = e;
}
const To = /* @__PURE__ */ new Set();
let dt;
function ut() {
  dt = {
    r: 0,
    c: [],
    p: dt
    // parent group
  };
}
function ht() {
  dt.r || po(dt.c), dt = dt.p;
}
function q(o, e) {
  o && o.i && (To.delete(o), o.i(e));
}
function oe(o, e, t, n) {
  if (o && o.o) {
    if (To.has(o))
      return;
    To.add(o), dt.c.push(() => {
      To.delete(o), n && (t && o.d(1), n());
    }), o.o(e);
  } else
    n && n();
}
function Ml(o, e) {
  const t = {}, n = {}, i = {
    $$scope: 1
  };
  let r = o.length;
  for (; r--; ) {
    const s = o[r], a = e[r];
    if (a) {
      for (const l in s)
        l in a || (n[l] = 1);
      for (const l in a)
        i[l] || (t[l] = a[l], i[l] = 1);
      o[r] = a;
    } else
      for (const l in s)
        i[l] = 1;
  }
  for (const s in n)
    s in t || (t[s] = void 0);
  return t;
}
function wt(o) {
  o && o.c();
}
function rt(o, e, t, n) {
  const {
    fragment: i,
    after_update: r
  } = o.$$;
  i && i.m(e, t), n || In(() => {
    const s = o.$$.on_mount.map(Xr).filter(ri);
    o.$$.on_destroy ? o.$$.on_destroy.push(...s) : po(s), o.$$.on_mount = [];
  }), r.forEach(In);
}
function st(o, e) {
  const t = o.$$;
  t.fragment !== null && (Al(t.after_update), po(t.on_destroy), t.fragment && t.fragment.d(e), t.on_destroy = t.fragment = null, t.ctx = []);
}
function Ll(o, e) {
  o.$$.dirty[0] === -1 && (St.push(o), Ol(), o.$$.dirty.fill(0)), o.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function Ke(o, e, t, n, i, r, s, a) {
  a === void 0 && (a = [-1]);
  const l = lo;
  Gt(o);
  const c = o.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: r,
    update: xe,
    not_equal: i,
    bound: Hi(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (l ? l.$$.context : [])),
    // everything else
    callbacks: Hi(),
    dirty: a,
    skip_bound: !1,
    root: e.target || l.$$.root
  };
  s && s(c.root);
  let u = !1;
  if (c.ctx = t ? t(o, e.props || {}, function(d, h) {
    const f = !(arguments.length <= 2) && arguments.length - 2 ? arguments.length <= 2 ? void 0 : arguments[2] : h;
    return c.ctx && i(c.ctx[d], c.ctx[d] = f) && (!c.skip_bound && c.bound[d] && c.bound[d](f), u && Ll(o, d)), h;
  }) : [], c.update(), u = !0, po(c.before_update), c.fragment = n ? n(c.ctx) : !1, e.target) {
    if (e.hydrate) {
      const d = Tl(e.target);
      c.fragment && c.fragment.l(d), d.forEach(Te);
    } else
      c.fragment && c.fragment.c();
    e.intro && q(o.$$.fragment), rt(o, e.target, e.anchor, e.customElement), Gr();
  }
  Gt(l);
}
class qe {
  $destroy() {
    st(this, 1), this.$destroy = xe;
  }
  $on(e, t) {
    if (!ri(t))
      return xe;
    const n = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return n.push(t), () => {
      const i = n.indexOf(t);
      i !== -1 && n.splice(i, 1);
    };
  }
  $set(e) {
    this.$$set && !El(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1);
  }
}
function Nl(o) {
  let e, t, n, i, r;
  return {
    c() {
      e = Fe("button"), G(e, "aria-label", t = /*label*/
      o[3] ? (
        /*label*/
        o[3]
      ) : null), G(e, "class", n = `${/*classes*/
      o[1] || ""} shepherd-button ${/*secondary*/
      o[4] ? "shepherd-button-secondary" : ""}`), e.disabled = /*disabled*/
      o[2], G(e, "tabindex", "0");
    },
    m(s, a) {
      Le(s, e, a), e.innerHTML = /*text*/
      o[5], i || (r = Jo(e, "click", function() {
        ri(
          /*action*/
          o[0]
        ) && o[0].apply(this, arguments);
      }), i = !0);
    },
    p(s, a) {
      let [l] = a;
      o = s, l & /*text*/
      32 && (e.innerHTML = /*text*/
      o[5]), l & /*label*/
      8 && t !== (t = /*label*/
      o[3] ? (
        /*label*/
        o[3]
      ) : null) && G(e, "aria-label", t), l & /*classes, secondary*/
      18 && n !== (n = `${/*classes*/
      o[1] || ""} shepherd-button ${/*secondary*/
      o[4] ? "shepherd-button-secondary" : ""}`) && G(e, "class", n), l & /*disabled*/
      4 && (e.disabled = /*disabled*/
      o[2]);
    },
    i: xe,
    o: xe,
    d(s) {
      s && Te(e), i = !1, r();
    }
  };
}
function Rl(o, e, t) {
  let {
    config: n,
    step: i
  } = e, r, s, a, l, c, u;
  function d(h) {
    return ft(h) ? h = h.call(i) : h;
  }
  return o.$$set = (h) => {
    "config" in h && t(6, n = h.config), "step" in h && t(7, i = h.step);
  }, o.$$.update = () => {
    o.$$.dirty & /*config, step*/
    192 && (t(0, r = n.action ? n.action.bind(i.tour) : null), t(1, s = n.classes), t(2, a = n.disabled ? d(n.disabled) : !1), t(3, l = n.label ? d(n.label) : null), t(4, c = n.secondary), t(5, u = n.text ? d(n.text) : null));
  }, [r, s, a, l, c, u, n, i];
}
class Dl extends qe {
  constructor(e) {
    super(), Ke(this, e, Rl, Nl, Xe, {
      config: 6,
      step: 7
    });
  }
}
function $i(o, e, t) {
  const n = o.slice();
  return n[2] = e[t], n;
}
function Vi(o) {
  let e, t, n = (
    /*buttons*/
    o[1]
  ), i = [];
  for (let s = 0; s < n.length; s += 1)
    i[s] = Wi($i(o, n, s));
  const r = (s) => oe(i[s], 1, 1, () => {
    i[s] = null;
  });
  return {
    c() {
      for (let s = 0; s < i.length; s += 1)
        i[s].c();
      e = Cl();
    },
    m(s, a) {
      for (let l = 0; l < i.length; l += 1)
        i[l] && i[l].m(s, a);
      Le(s, e, a), t = !0;
    },
    p(s, a) {
      if (a & /*buttons, step*/
      3) {
        n = /*buttons*/
        s[1];
        let l;
        for (l = 0; l < n.length; l += 1) {
          const c = $i(s, n, l);
          i[l] ? (i[l].p(c, a), q(i[l], 1)) : (i[l] = Wi(c), i[l].c(), q(i[l], 1), i[l].m(e.parentNode, e));
        }
        for (ut(), l = n.length; l < i.length; l += 1)
          r(l);
        ht();
      }
    },
    i(s) {
      if (!t) {
        for (let a = 0; a < n.length; a += 1)
          q(i[a]);
        t = !0;
      }
    },
    o(s) {
      i = i.filter(Boolean);
      for (let a = 0; a < i.length; a += 1)
        oe(i[a]);
      t = !1;
    },
    d(s) {
      Sl(i, s), s && Te(e);
    }
  };
}
function Wi(o) {
  let e, t;
  return e = new Dl({
    props: {
      config: (
        /*config*/
        o[2]
      ),
      step: (
        /*step*/
        o[0]
      )
    }
  }), {
    c() {
      wt(e.$$.fragment);
    },
    m(n, i) {
      rt(e, n, i), t = !0;
    },
    p(n, i) {
      const r = {};
      i & /*buttons*/
      2 && (r.config = /*config*/
      n[2]), i & /*step*/
      1 && (r.step = /*step*/
      n[0]), e.$set(r);
    },
    i(n) {
      t || (q(e.$$.fragment, n), t = !0);
    },
    o(n) {
      oe(e.$$.fragment, n), t = !1;
    },
    d(n) {
      st(e, n);
    }
  };
}
function Pl(o) {
  let e, t, n = (
    /*buttons*/
    o[1] && Vi(o)
  );
  return {
    c() {
      e = Fe("footer"), n && n.c(), G(e, "class", "shepherd-footer");
    },
    m(i, r) {
      Le(i, e, r), n && n.m(e, null), t = !0;
    },
    p(i, r) {
      let [s] = r;
      /*buttons*/
      i[1] ? n ? (n.p(i, s), s & /*buttons*/
      2 && q(n, 1)) : (n = Vi(i), n.c(), q(n, 1), n.m(e, null)) : n && (ut(), oe(n, 1, 1, () => {
        n = null;
      }), ht());
    },
    i(i) {
      t || (q(n), t = !0);
    },
    o(i) {
      oe(n), t = !1;
    },
    d(i) {
      i && Te(e), n && n.d();
    }
  };
}
function Fl(o, e, t) {
  let n, {
    step: i
  } = e;
  return o.$$set = (r) => {
    "step" in r && t(0, i = r.step);
  }, o.$$.update = () => {
    o.$$.dirty & /*step*/
    1 && t(1, n = i.options.buttons);
  }, [i, n];
}
class Hl extends qe {
  constructor(e) {
    super(), Ke(this, e, Fl, Pl, Xe, {
      step: 0
    });
  }
}
function jl(o) {
  let e, t, n, i, r;
  return {
    c() {
      e = Fe("button"), t = Fe("span"), t.textContent = "×", G(t, "aria-hidden", "true"), G(e, "aria-label", n = /*cancelIcon*/
      o[0].label ? (
        /*cancelIcon*/
        o[0].label
      ) : "Close Tour"), G(e, "class", "shepherd-cancel-icon"), G(e, "type", "button");
    },
    m(s, a) {
      Le(s, e, a), Nt(e, t), i || (r = Jo(
        e,
        "click",
        /*handleCancelClick*/
        o[1]
      ), i = !0);
    },
    p(s, a) {
      let [l] = a;
      l & /*cancelIcon*/
      1 && n !== (n = /*cancelIcon*/
      s[0].label ? (
        /*cancelIcon*/
        s[0].label
      ) : "Close Tour") && G(e, "aria-label", n);
    },
    i: xe,
    o: xe,
    d(s) {
      s && Te(e), i = !1, r();
    }
  };
}
function Ul(o, e, t) {
  let {
    cancelIcon: n,
    step: i
  } = e;
  const r = (s) => {
    s.preventDefault(), i.cancel();
  };
  return o.$$set = (s) => {
    "cancelIcon" in s && t(0, n = s.cancelIcon), "step" in s && t(2, i = s.step);
  }, [n, r, i];
}
class zl extends qe {
  constructor(e) {
    super(), Ke(this, e, Ul, jl, Xe, {
      cancelIcon: 0,
      step: 2
    });
  }
}
function $l(o) {
  let e;
  return {
    c() {
      e = Fe("h3"), G(
        e,
        "id",
        /*labelId*/
        o[1]
      ), G(e, "class", "shepherd-title");
    },
    m(t, n) {
      Le(t, e, n), o[3](e);
    },
    p(t, n) {
      let [i] = n;
      i & /*labelId*/
      2 && G(
        e,
        "id",
        /*labelId*/
        t[1]
      );
    },
    i: xe,
    o: xe,
    d(t) {
      t && Te(e), o[3](null);
    }
  };
}
function Vl(o, e, t) {
  let {
    labelId: n,
    element: i,
    title: r
  } = e;
  si(() => {
    ft(r) && t(2, r = r()), t(0, i.innerHTML = r, i);
  });
  function s(a) {
    Rt[a ? "unshift" : "push"](() => {
      i = a, t(0, i);
    });
  }
  return o.$$set = (a) => {
    "labelId" in a && t(1, n = a.labelId), "element" in a && t(0, i = a.element), "title" in a && t(2, r = a.title);
  }, [i, n, r, s];
}
class Wl extends qe {
  constructor(e) {
    super(), Ke(this, e, Vl, $l, Xe, {
      labelId: 1,
      element: 0,
      title: 2
    });
  }
}
function Yi(o) {
  let e, t;
  return e = new Wl({
    props: {
      labelId: (
        /*labelId*/
        o[0]
      ),
      title: (
        /*title*/
        o[2]
      )
    }
  }), {
    c() {
      wt(e.$$.fragment);
    },
    m(n, i) {
      rt(e, n, i), t = !0;
    },
    p(n, i) {
      const r = {};
      i & /*labelId*/
      1 && (r.labelId = /*labelId*/
      n[0]), i & /*title*/
      4 && (r.title = /*title*/
      n[2]), e.$set(r);
    },
    i(n) {
      t || (q(e.$$.fragment, n), t = !0);
    },
    o(n) {
      oe(e.$$.fragment, n), t = !1;
    },
    d(n) {
      st(e, n);
    }
  };
}
function Xi(o) {
  let e, t;
  return e = new zl({
    props: {
      cancelIcon: (
        /*cancelIcon*/
        o[3]
      ),
      step: (
        /*step*/
        o[1]
      )
    }
  }), {
    c() {
      wt(e.$$.fragment);
    },
    m(n, i) {
      rt(e, n, i), t = !0;
    },
    p(n, i) {
      const r = {};
      i & /*cancelIcon*/
      8 && (r.cancelIcon = /*cancelIcon*/
      n[3]), i & /*step*/
      2 && (r.step = /*step*/
      n[1]), e.$set(r);
    },
    i(n) {
      t || (q(e.$$.fragment, n), t = !0);
    },
    o(n) {
      oe(e.$$.fragment, n), t = !1;
    },
    d(n) {
      st(e, n);
    }
  };
}
function Yl(o) {
  let e, t, n, i = (
    /*title*/
    o[2] && Yi(o)
  ), r = (
    /*cancelIcon*/
    o[3] && /*cancelIcon*/
    o[3].enabled && Xi(o)
  );
  return {
    c() {
      e = Fe("header"), i && i.c(), t = jo(), r && r.c(), G(e, "class", "shepherd-header");
    },
    m(s, a) {
      Le(s, e, a), i && i.m(e, null), Nt(e, t), r && r.m(e, null), n = !0;
    },
    p(s, a) {
      let [l] = a;
      /*title*/
      s[2] ? i ? (i.p(s, l), l & /*title*/
      4 && q(i, 1)) : (i = Yi(s), i.c(), q(i, 1), i.m(e, t)) : i && (ut(), oe(i, 1, 1, () => {
        i = null;
      }), ht()), /*cancelIcon*/
      s[3] && /*cancelIcon*/
      s[3].enabled ? r ? (r.p(s, l), l & /*cancelIcon*/
      8 && q(r, 1)) : (r = Xi(s), r.c(), q(r, 1), r.m(e, null)) : r && (ut(), oe(r, 1, 1, () => {
        r = null;
      }), ht());
    },
    i(s) {
      n || (q(i), q(r), n = !0);
    },
    o(s) {
      oe(i), oe(r), n = !1;
    },
    d(s) {
      s && Te(e), i && i.d(), r && r.d();
    }
  };
}
function Xl(o, e, t) {
  let {
    labelId: n,
    step: i
  } = e, r, s;
  return o.$$set = (a) => {
    "labelId" in a && t(0, n = a.labelId), "step" in a && t(1, i = a.step);
  }, o.$$.update = () => {
    o.$$.dirty & /*step*/
    2 && (t(2, r = i.options.title), t(3, s = i.options.cancelIcon));
  }, [n, i, r, s];
}
class Kl extends qe {
  constructor(e) {
    super(), Ke(this, e, Xl, Yl, Xe, {
      labelId: 0,
      step: 1
    });
  }
}
function ql(o) {
  let e;
  return {
    c() {
      e = Fe("div"), G(e, "class", "shepherd-text"), G(
        e,
        "id",
        /*descriptionId*/
        o[1]
      );
    },
    m(t, n) {
      Le(t, e, n), o[3](e);
    },
    p(t, n) {
      let [i] = n;
      i & /*descriptionId*/
      2 && G(
        e,
        "id",
        /*descriptionId*/
        t[1]
      );
    },
    i: xe,
    o: xe,
    d(t) {
      t && Te(e), o[3](null);
    }
  };
}
function Gl(o, e, t) {
  let {
    descriptionId: n,
    element: i,
    step: r
  } = e;
  si(() => {
    let {
      text: a
    } = r.options;
    ft(a) && (a = a.call(r)), Jn(a) ? i.appendChild(a) : t(0, i.innerHTML = a, i);
  });
  function s(a) {
    Rt[a ? "unshift" : "push"](() => {
      i = a, t(0, i);
    });
  }
  return o.$$set = (a) => {
    "descriptionId" in a && t(1, n = a.descriptionId), "element" in a && t(0, i = a.element), "step" in a && t(2, r = a.step);
  }, [i, n, r, s];
}
class Zl extends qe {
  constructor(e) {
    super(), Ke(this, e, Gl, ql, Xe, {
      descriptionId: 1,
      element: 0,
      step: 2
    });
  }
}
function Ki(o) {
  let e, t;
  return e = new Kl({
    props: {
      labelId: (
        /*labelId*/
        o[1]
      ),
      step: (
        /*step*/
        o[2]
      )
    }
  }), {
    c() {
      wt(e.$$.fragment);
    },
    m(n, i) {
      rt(e, n, i), t = !0;
    },
    p(n, i) {
      const r = {};
      i & /*labelId*/
      2 && (r.labelId = /*labelId*/
      n[1]), i & /*step*/
      4 && (r.step = /*step*/
      n[2]), e.$set(r);
    },
    i(n) {
      t || (q(e.$$.fragment, n), t = !0);
    },
    o(n) {
      oe(e.$$.fragment, n), t = !1;
    },
    d(n) {
      st(e, n);
    }
  };
}
function qi(o) {
  let e, t;
  return e = new Zl({
    props: {
      descriptionId: (
        /*descriptionId*/
        o[0]
      ),
      step: (
        /*step*/
        o[2]
      )
    }
  }), {
    c() {
      wt(e.$$.fragment);
    },
    m(n, i) {
      rt(e, n, i), t = !0;
    },
    p(n, i) {
      const r = {};
      i & /*descriptionId*/
      1 && (r.descriptionId = /*descriptionId*/
      n[0]), i & /*step*/
      4 && (r.step = /*step*/
      n[2]), e.$set(r);
    },
    i(n) {
      t || (q(e.$$.fragment, n), t = !0);
    },
    o(n) {
      oe(e.$$.fragment, n), t = !1;
    },
    d(n) {
      st(e, n);
    }
  };
}
function Gi(o) {
  let e, t;
  return e = new Hl({
    props: {
      step: (
        /*step*/
        o[2]
      )
    }
  }), {
    c() {
      wt(e.$$.fragment);
    },
    m(n, i) {
      rt(e, n, i), t = !0;
    },
    p(n, i) {
      const r = {};
      i & /*step*/
      4 && (r.step = /*step*/
      n[2]), e.$set(r);
    },
    i(n) {
      t || (q(e.$$.fragment, n), t = !0);
    },
    o(n) {
      oe(e.$$.fragment, n), t = !1;
    },
    d(n) {
      st(e, n);
    }
  };
}
function Jl(o) {
  let e, t = !he(
    /*step*/
    o[2].options.title
  ) || /*step*/
  o[2].options.cancelIcon && /*step*/
  o[2].options.cancelIcon.enabled, n, i = !he(
    /*step*/
    o[2].options.text
  ), r, s = Array.isArray(
    /*step*/
    o[2].options.buttons
  ) && /*step*/
  o[2].options.buttons.length, a, l = t && Ki(o), c = i && qi(o), u = s && Gi(o);
  return {
    c() {
      e = Fe("div"), l && l.c(), n = jo(), c && c.c(), r = jo(), u && u.c(), G(e, "class", "shepherd-content");
    },
    m(d, h) {
      Le(d, e, h), l && l.m(e, null), Nt(e, n), c && c.m(e, null), Nt(e, r), u && u.m(e, null), a = !0;
    },
    p(d, h) {
      let [f] = h;
      f & /*step*/
      4 && (t = !he(
        /*step*/
        d[2].options.title
      ) || /*step*/
      d[2].options.cancelIcon && /*step*/
      d[2].options.cancelIcon.enabled), t ? l ? (l.p(d, f), f & /*step*/
      4 && q(l, 1)) : (l = Ki(d), l.c(), q(l, 1), l.m(e, n)) : l && (ut(), oe(l, 1, 1, () => {
        l = null;
      }), ht()), f & /*step*/
      4 && (i = !he(
        /*step*/
        d[2].options.text
      )), i ? c ? (c.p(d, f), f & /*step*/
      4 && q(c, 1)) : (c = qi(d), c.c(), q(c, 1), c.m(e, r)) : c && (ut(), oe(c, 1, 1, () => {
        c = null;
      }), ht()), f & /*step*/
      4 && (s = Array.isArray(
        /*step*/
        d[2].options.buttons
      ) && /*step*/
      d[2].options.buttons.length), s ? u ? (u.p(d, f), f & /*step*/
      4 && q(u, 1)) : (u = Gi(d), u.c(), q(u, 1), u.m(e, null)) : u && (ut(), oe(u, 1, 1, () => {
        u = null;
      }), ht());
    },
    i(d) {
      a || (q(l), q(c), q(u), a = !0);
    },
    o(d) {
      oe(l), oe(c), oe(u), a = !1;
    },
    d(d) {
      d && Te(e), l && l.d(), c && c.d(), u && u.d();
    }
  };
}
function Ql(o, e, t) {
  let {
    descriptionId: n,
    labelId: i,
    step: r
  } = e;
  return o.$$set = (s) => {
    "descriptionId" in s && t(0, n = s.descriptionId), "labelId" in s && t(1, i = s.labelId), "step" in s && t(2, r = s.step);
  }, [n, i, r];
}
class ec extends qe {
  constructor(e) {
    super(), Ke(this, e, Ql, Jl, Xe, {
      descriptionId: 0,
      labelId: 1,
      step: 2
    });
  }
}
function Zi(o) {
  let e;
  return {
    c() {
      e = Fe("div"), G(e, "class", "shepherd-arrow"), G(e, "data-popper-arrow", "");
    },
    m(t, n) {
      Le(t, e, n);
    },
    d(t) {
      t && Te(e);
    }
  };
}
function tc(o) {
  let e, t, n, i, r, s, a, l, c = (
    /*step*/
    o[4].options.arrow && /*step*/
    o[4].options.attachTo && /*step*/
    o[4].options.attachTo.element && /*step*/
    o[4].options.attachTo.on && Zi()
  );
  n = new ec({
    props: {
      descriptionId: (
        /*descriptionId*/
        o[2]
      ),
      labelId: (
        /*labelId*/
        o[3]
      ),
      step: (
        /*step*/
        o[4]
      )
    }
  });
  let u = [
    {
      "aria-describedby": i = he(
        /*step*/
        o[4].options.text
      ) ? null : (
        /*descriptionId*/
        o[2]
      )
    },
    {
      "aria-labelledby": r = /*step*/
      o[4].options.title ? (
        /*labelId*/
        o[3]
      ) : null
    },
    /*dataStepId*/
    o[1],
    {
      role: "dialog"
    },
    {
      tabindex: "0"
    }
  ], d = {};
  for (let h = 0; h < u.length; h += 1)
    d = xl(d, u[h]);
  return {
    c() {
      e = Fe("div"), c && c.c(), t = jo(), wt(n.$$.fragment), Ui(e, d), yt(
        e,
        "shepherd-has-cancel-icon",
        /*hasCancelIcon*/
        o[5]
      ), yt(
        e,
        "shepherd-has-title",
        /*hasTitle*/
        o[6]
      ), yt(e, "shepherd-element", !0);
    },
    m(h, f) {
      Le(h, e, f), c && c.m(e, null), Nt(e, t), rt(n, e, null), o[13](e), s = !0, a || (l = Jo(
        e,
        "keydown",
        /*handleKeyDown*/
        o[7]
      ), a = !0);
    },
    p(h, f) {
      let [p] = f;
      /*step*/
      h[4].options.arrow && /*step*/
      h[4].options.attachTo && /*step*/
      h[4].options.attachTo.element && /*step*/
      h[4].options.attachTo.on ? c || (c = Zi(), c.c(), c.m(e, t)) : c && (c.d(1), c = null);
      const g = {};
      p & /*descriptionId*/
      4 && (g.descriptionId = /*descriptionId*/
      h[2]), p & /*labelId*/
      8 && (g.labelId = /*labelId*/
      h[3]), p & /*step*/
      16 && (g.step = /*step*/
      h[4]), n.$set(g), Ui(e, d = Ml(u, [(!s || p & /*step, descriptionId*/
      20 && i !== (i = he(
        /*step*/
        h[4].options.text
      ) ? null : (
        /*descriptionId*/
        h[2]
      ))) && {
        "aria-describedby": i
      }, (!s || p & /*step, labelId*/
      24 && r !== (r = /*step*/
      h[4].options.title ? (
        /*labelId*/
        h[3]
      ) : null)) && {
        "aria-labelledby": r
      }, p & /*dataStepId*/
      2 && /*dataStepId*/
      h[1], {
        role: "dialog"
      }, {
        tabindex: "0"
      }])), yt(
        e,
        "shepherd-has-cancel-icon",
        /*hasCancelIcon*/
        h[5]
      ), yt(
        e,
        "shepherd-has-title",
        /*hasTitle*/
        h[6]
      ), yt(e, "shepherd-element", !0);
    },
    i(h) {
      s || (q(n.$$.fragment, h), s = !0);
    },
    o(h) {
      oe(n.$$.fragment, h), s = !1;
    },
    d(h) {
      h && Te(e), c && c.d(), st(n), o[13](null), a = !1, l();
    }
  };
}
const oc = 9, nc = 27, ic = 37, rc = 39;
function Ji(o) {
  return o.split(" ").filter((e) => !!e.length);
}
function sc(o, e, t) {
  let {
    classPrefix: n,
    element: i,
    descriptionId: r,
    firstFocusableElement: s,
    focusableElements: a,
    labelId: l,
    lastFocusableElement: c,
    step: u,
    dataStepId: d
  } = e, h, f, p;
  const g = () => i;
  Bl(() => {
    t(1, d = {
      [`data-${n}shepherd-step-id`]: u.id
    }), t(9, a = i.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]')), t(8, s = a[0]), t(10, c = a[a.length - 1]);
  }), si(() => {
    p !== u.options.classes && _();
  });
  function _() {
    B(p), p = u.options.classes, T(p);
  }
  function B(b) {
    if (so(b)) {
      const I = Ji(b);
      I.length && i.classList.remove(...I);
    }
  }
  function T(b) {
    if (so(b)) {
      const I = Ji(b);
      I.length && i.classList.add(...I);
    }
  }
  const S = (b) => {
    const {
      tour: I
    } = u;
    switch (b.keyCode) {
      case oc:
        if (a.length === 0) {
          b.preventDefault();
          break;
        }
        b.shiftKey ? (document.activeElement === s || document.activeElement.classList.contains("shepherd-element")) && (b.preventDefault(), c.focus()) : document.activeElement === c && (b.preventDefault(), s.focus());
        break;
      case nc:
        I.options.exitOnEsc && u.cancel();
        break;
      case ic:
        I.options.keyboardNavigation && I.back();
        break;
      case rc:
        I.options.keyboardNavigation && I.next();
        break;
    }
  };
  function v(b) {
    Rt[b ? "unshift" : "push"](() => {
      i = b, t(0, i);
    });
  }
  return o.$$set = (b) => {
    "classPrefix" in b && t(11, n = b.classPrefix), "element" in b && t(0, i = b.element), "descriptionId" in b && t(2, r = b.descriptionId), "firstFocusableElement" in b && t(8, s = b.firstFocusableElement), "focusableElements" in b && t(9, a = b.focusableElements), "labelId" in b && t(3, l = b.labelId), "lastFocusableElement" in b && t(10, c = b.lastFocusableElement), "step" in b && t(4, u = b.step), "dataStepId" in b && t(1, d = b.dataStepId);
  }, o.$$.update = () => {
    o.$$.dirty & /*step*/
    16 && (t(5, h = u.options && u.options.cancelIcon && u.options.cancelIcon.enabled), t(6, f = u.options && u.options.title));
  }, [i, d, r, l, u, h, f, S, s, a, c, n, g, v];
}
class ac extends qe {
  constructor(e) {
    super(), Ke(this, e, sc, tc, Xe, {
      classPrefix: 11,
      element: 0,
      descriptionId: 2,
      firstFocusableElement: 8,
      focusableElements: 9,
      labelId: 3,
      lastFocusableElement: 10,
      step: 4,
      dataStepId: 1,
      getElement: 12
    });
  }
  get getElement() {
    return this.$$.ctx[12];
  }
}
class An extends Qn {
  /**
   * Create a step
   * @param {Tour} tour The tour for the step
   * @param {object} options The options for the step
   * @param {boolean} options.arrow Whether to display the arrow for the tooltip or not. Defaults to `true`.
   * @param {object} options.attachTo The element the step should be attached to on the page.
   * An object with properties `element` and `on`.
   *
   * ```js
   * const step = new Step(tour, {
   *   attachTo: { element: '.some .selector-path', on: 'left' },
   *   ...moreOptions
   * });
   * ```
   *
   * If you don’t specify an `attachTo` the element will appear in the middle of the screen. The same will happen if your `attachTo.element` callback returns `null`, `undefined`, or a selector that does not exist in the DOM.
   * If you omit the `on` portion of `attachTo`, the element will still be highlighted, but the tooltip will appear
   * in the middle of the screen, without an arrow pointing to the target.
   * If the element to highlight does not yet exist while instantiating tour steps, you may use lazy evaluation by supplying a function to `attachTo.element`. The function will be called in the `before-show` phase.
   * @param {string|HTMLElement|function} options.attachTo.element An element selector string, DOM element, or a function (returning a selector, a DOM element, `null` or `undefined`).
   * @param {string} options.attachTo.on The optional direction to place the FloatingUI tooltip relative to the element.
   *   - Possible string values: 'top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'right', 'right-start', 'right-end', 'left', 'left-start', 'left-end'
   * @param {Object} options.advanceOn An action on the page which should advance shepherd to the next step.
   * It should be an object with a string `selector` and an `event` name
   * ```js
   * const step = new Step(tour, {
   *   advanceOn: { selector: '.some .selector-path', event: 'click' },
   *   ...moreOptions
   * });
   * ```
   * `event` doesn’t have to be an event inside the tour, it can be any event fired on any element on the page.
   * You can also always manually advance the Tour by calling `myTour.next()`.
   * @param {function} options.beforeShowPromise A function that returns a promise.
   * When the promise resolves, the rest of the `show` code for the step will execute.
   * @param {Object[]} options.buttons An array of buttons to add to the step. These will be rendered in a
   * footer below the main body text.
   * @param {function} options.buttons.button.action A function executed when the button is clicked on.
   * It is automatically bound to the `tour` the step is associated with, so things like `this.next` will
   * work inside the action.
   * You can use action to skip steps or navigate to specific steps, with something like:
   * ```js
   * action() {
   *   return this.show('some_step_name');
   * }
   * ```
   * @param {string} options.buttons.button.classes Extra classes to apply to the `<a>`
   * @param {boolean} options.buttons.button.disabled Should the button be disabled?
   * @param {string} options.buttons.button.label The aria-label text of the button
   * @param {boolean} options.buttons.button.secondary If true, a shepherd-button-secondary class is applied to the button
   * @param {string} options.buttons.button.text The HTML text of the button
   * @param {boolean} options.canClickTarget A boolean, that when set to false, will set `pointer-events: none` on the target
   * @param {object} options.cancelIcon Options for the cancel icon
   * @param {boolean} options.cancelIcon.enabled Should a cancel “✕” be shown in the header of the step?
   * @param {string} options.cancelIcon.label The label to add for `aria-label`
   * @param {string} options.classes A string of extra classes to add to the step's content element.
   * @param {string} options.highlightClass An extra class to apply to the `attachTo` element when it is
   * highlighted (that is, when its step is active). You can then target that selector in your CSS.
   * @param {string} options.id The string to use as the `id` for the step.
   * @param {number} options.modalOverlayOpeningPadding An amount of padding to add around the modal overlay opening
   * @param {number | { topLeft: number, bottomLeft: number, bottomRight: number, topRight: number }} options.modalOverlayOpeningRadius An amount of border radius to add around the modal overlay opening
   * @param {object} options.floatingUIOptions Extra options to pass to FloatingUI
   * @param {boolean|Object} options.scrollTo Should the element be scrolled to when this step is shown? If true, uses the default `scrollIntoView`,
   * if an object, passes that object as the params to `scrollIntoView` i.e. `{behavior: 'smooth', block: 'center'}`
   * @param {function} options.scrollToHandler A function that lets you override the default scrollTo behavior and
   * define a custom action to do the scrolling, and possibly other logic.
   * @param {function} options.showOn A function that, when it returns `true`, will show the step.
   * If it returns false, the step will be skipped.
   * @param {string} options.text The text in the body of the step. It can be one of three types:
   * ```
   * - HTML string
   * - `HTMLElement` object
   * - `Function` to be executed when the step is built. It must return one the two options above.
   * ```
   * @param {string} options.title The step's title. It becomes an `h3` at the top of the step. It can be one of two types:
   * ```
   * - HTML string
   * - `Function` to be executed when the step is built. It must return HTML string.
   * ```
   * @param {object} options.when You can define `show`, `hide`, etc events inside `when`. For example:
   * ```js
   * when: {
   *   show: function() {
   *     window.scrollTo(0, 0);
   *   }
   * }
   * ```
   * @return {Step} The newly created Step instance
   */
  constructor(e, t) {
    return t === void 0 && (t = {}), super(e, t), this.tour = e, this.classPrefix = this.tour.options ? Nr(this.tour.options.classPrefix) : "", this.styles = e.styles, this._resolvedAttachTo = null, Lr(this), this._setOptions(t), this;
  }
  /**
   * Cancel the tour
   * Triggers the `cancel` event
   */
  cancel() {
    this.tour.cancel(), this.trigger("cancel");
  }
  /**
   * Complete the tour
   * Triggers the `complete` event
   */
  complete() {
    this.tour.complete(), this.trigger("complete");
  }
  /**
   * Remove the step, delete the step's element, and destroy the FloatingUI instance for the step.
   * Triggers `destroy` event
   */
  destroy() {
    ml(this), Jn(this.el) && (this.el.remove(), this.el = null), this._updateStepTargetOnHide(), this.trigger("destroy");
  }
  /**
   * Returns the tour for the step
   * @return {Tour} The tour instance
   */
  getTour() {
    return this.tour;
  }
  /**
   * Hide the step
   */
  hide() {
    this.tour.modal.hide(), this.trigger("before-hide"), this.el && (this.el.hidden = !0), this._updateStepTargetOnHide(), this.trigger("hide");
  }
  /**
   * Resolves attachTo options.
   * @returns {{}|{element, on}}
   * @private
   */
  _resolveAttachToOptions() {
    return this._resolvedAttachTo = Fa(this), this._resolvedAttachTo;
  }
  /**
   * A selector for resolved attachTo options.
   * @returns {{}|{element, on}}
   * @private
   */
  _getResolvedAttachToOptions() {
    return this._resolvedAttachTo === null ? this._resolveAttachToOptions() : this._resolvedAttachTo;
  }
  /**
   * Check if the step is open and visible
   * @return {boolean} True if the step is open and visible
   */
  isOpen() {
    return !!(this.el && !this.el.hidden);
  }
  /**
   * Wraps `_show` and ensures `beforeShowPromise` resolves before calling show
   * @return {*|Promise}
   */
  show() {
    return ft(this.options.beforeShowPromise) ? Promise.resolve(this.options.beforeShowPromise()).then(() => this._show()) : Promise.resolve(this._show());
  }
  /**
   * Updates the options of the step.
   *
   * @param {Object} options The options for the step
   */
  updateStepOptions(e) {
    Object.assign(this.options, e), this.shepherdElementComponent && this.shepherdElementComponent.$set({
      step: this
    });
  }
  /**
   * Returns the element for the step
   * @return {HTMLElement|null|undefined} The element instance. undefined if it has never been shown, null if it has been destroyed
   */
  getElement() {
    return this.el;
  }
  /**
   * Returns the target for the step
   * @return {HTMLElement|null|undefined} The element instance. undefined if it has never been shown, null if query string has not been found
   */
  getTarget() {
    return this.target;
  }
  /**
   * Creates Shepherd element for step based on options
   *
   * @return {Element} The DOM element for the step tooltip
   * @private
   */
  _createTooltipContent() {
    const e = `${this.id}-description`, t = `${this.id}-label`;
    return this.shepherdElementComponent = new ac({
      target: this.tour.options.stepsContainer || document.body,
      props: {
        classPrefix: this.classPrefix,
        descriptionId: e,
        labelId: t,
        step: this,
        styles: this.styles
      }
    }), this.shepherdElementComponent.getElement();
  }
  /**
   * If a custom scrollToHandler is defined, call that, otherwise do the generic
   * scrollIntoView call.
   *
   * @param {boolean|Object} scrollToOptions If true, uses the default `scrollIntoView`,
   * if an object, passes that object as the params to `scrollIntoView` i.e. `{ behavior: 'smooth', block: 'center' }`
   * @private
   */
  _scrollTo(e) {
    const {
      element: t
    } = this._getResolvedAttachToOptions();
    ft(this.options.scrollToHandler) ? this.options.scrollToHandler(t) : Ra(t) && typeof t.scrollIntoView == "function" && t.scrollIntoView(e);
  }
  /**
   * _getClassOptions gets all possible classes for the step
   * @param {Object} stepOptions The step specific options
   * @returns {String} unique string from array of classes
   * @private
   */
  _getClassOptions(e) {
    const t = this.tour && this.tour.options && this.tour.options.defaultStepOptions, n = e.classes ? e.classes : "", i = t && t.classes ? t.classes : "", r = [...n.split(" "), ...i.split(" ")], s = new Set(r);
    return Array.from(s).join(" ").trim();
  }
  /**
   * Sets the options for the step, maps `when` to events, sets up buttons
   * @param {Object} options The options for the step
   * @private
   */
  _setOptions(e) {
    e === void 0 && (e = {});
    let t = this.tour && this.tour.options && this.tour.options.defaultStepOptions;
    t = Zn({}, t || {}), this.options = Object.assign({
      arrow: !0
    }, t, e, gl(t, e));
    const {
      when: n
    } = this.options;
    this.options.classes = this._getClassOptions(e), this.destroy(), this.id = this.options.id || `step-${ei()}`, n && Object.keys(n).forEach((i) => {
      this.on(i, n[i], this);
    });
  }
  /**
   * Create the element and set up the FloatingUI instance
   * @private
   */
  _setupElements() {
    he(this.el) || this.destroy(), this.el = this._createTooltipContent(), this.options.advanceOn && Pa(this), fl(this);
  }
  /**
   * Triggers `before-show`, generates the tooltip DOM content,
   * sets up a FloatingUI instance for the tooltip, then triggers `show`.
   * @private
   */
  _show() {
    this.trigger("before-show"), this._resolveAttachToOptions(), this._setupElements(), this.tour.modal || this.tour._setupModal(), this.tour.modal.setupForStep(this), this._styleTargetElementForStep(this), this.el.hidden = !1, this.options.scrollTo && setTimeout(() => {
      this._scrollTo(this.options.scrollTo);
    }), this.el.hidden = !1;
    const e = this.shepherdElementComponent.getElement(), t = this.target || document.body;
    t.classList.add(`${this.classPrefix}shepherd-enabled`), t.classList.add(`${this.classPrefix}shepherd-target`), e.classList.add("shepherd-enabled"), this.trigger("show");
  }
  /**
   * Modulates the styles of the passed step's target element, based on the step's options and
   * the tour's `modal` option, to visually emphasize the element
   *
   * @param step The step object that attaches to the element
   * @private
   */
  _styleTargetElementForStep(e) {
    const t = e.target;
    t && (e.options.highlightClass && t.classList.add(e.options.highlightClass), t.classList.remove("shepherd-target-click-disabled"), e.options.canClickTarget === !1 && t.classList.add("shepherd-target-click-disabled"));
  }
  /**
   * When a step is hidden, remove the highlightClass and 'shepherd-enabled'
   * and 'shepherd-target' classes
   * @private
   */
  _updateStepTargetOnHide() {
    const e = this.target || document.body;
    this.options.highlightClass && e.classList.remove(this.options.highlightClass), e.classList.remove("shepherd-target-click-disabled", `${this.classPrefix}shepherd-enabled`, `${this.classPrefix}shepherd-target`);
  }
}
function lc(o) {
  if (o) {
    const {
      steps: e
    } = o;
    e.forEach((t) => {
      t.options && t.options.canClickTarget === !1 && t.options.attachTo && t.target instanceof HTMLElement && t.target.classList.remove("shepherd-target-click-disabled");
    });
  }
}
function cc(o) {
  let {
    width: e,
    height: t,
    x: n = 0,
    y: i = 0,
    r = 0
  } = o;
  const {
    innerWidth: s,
    innerHeight: a
  } = window, {
    topLeft: l = 0,
    topRight: c = 0,
    bottomRight: u = 0,
    bottomLeft: d = 0
  } = typeof r == "number" ? {
    topLeft: r,
    topRight: r,
    bottomRight: r,
    bottomLeft: r
  } : r;
  return `M${s},${a}H0V0H${s}V${a}ZM${n + l},${i}a${l},${l},0,0,0-${l},${l}V${t + i - d}a${d},${d},0,0,0,${d},${d}H${e + n - u}a${u},${u},0,0,0,${u}-${u}V${i + c}a${c},${c},0,0,0-${c}-${c}Z`;
}
function dc(o) {
  let e, t, n, i, r;
  return {
    c() {
      e = ji("svg"), t = ji("path"), G(
        t,
        "d",
        /*pathDefinition*/
        o[2]
      ), G(e, "class", n = `${/*modalIsVisible*/
      o[1] ? "shepherd-modal-is-visible" : ""} shepherd-modal-overlay-container`);
    },
    m(s, a) {
      Le(s, e, a), Nt(e, t), o[11](e), i || (r = Jo(
        e,
        "touchmove",
        /*_preventModalOverlayTouch*/
        o[3]
      ), i = !0);
    },
    p(s, a) {
      let [l] = a;
      l & /*pathDefinition*/
      4 && G(
        t,
        "d",
        /*pathDefinition*/
        s[2]
      ), l & /*modalIsVisible*/
      2 && n !== (n = `${/*modalIsVisible*/
      s[1] ? "shepherd-modal-is-visible" : ""} shepherd-modal-overlay-container`) && G(e, "class", n);
    },
    i: xe,
    o: xe,
    d(s) {
      s && Te(e), o[11](null), i = !1, r();
    }
  };
}
function Zr(o) {
  if (!o)
    return null;
  const t = o instanceof HTMLElement && window.getComputedStyle(o).overflowY;
  return t !== "hidden" && t !== "visible" && o.scrollHeight >= o.clientHeight ? o : Zr(o.parentElement);
}
function uc(o, e) {
  const t = o.getBoundingClientRect();
  let n = t.y || t.top, i = t.bottom || n + t.height;
  if (e) {
    const s = e.getBoundingClientRect(), a = s.y || s.top, l = s.bottom || a + s.height;
    n = Math.max(n, a), i = Math.min(i, l);
  }
  const r = Math.max(i - n, 0);
  return {
    y: n,
    height: r
  };
}
function hc(o, e, t) {
  let {
    element: n,
    openingProperties: i
  } = e;
  ei();
  let r = !1, s, a;
  c();
  const l = () => n;
  function c() {
    t(4, i = {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      r: 0
    });
  }
  function u() {
    t(1, r = !1), B();
  }
  function d(v, b, I, P) {
    if (v === void 0 && (v = 0), b === void 0 && (b = 0), P) {
      const {
        y: C,
        height: x
      } = uc(P, I), {
        x: L,
        width: w,
        left: k
      } = P.getBoundingClientRect();
      t(4, i = {
        width: w + v * 2,
        height: x + v * 2,
        x: (L || k) - v,
        y: C - v,
        r: b
      });
    } else
      c();
  }
  function h(v) {
    B(), v.tour.options.useModalOverlay ? (T(v), f()) : u();
  }
  function f() {
    t(1, r = !0);
  }
  const p = (v) => {
    v.preventDefault();
  }, g = (v) => {
    v.stopPropagation();
  };
  function _() {
    window.addEventListener("touchmove", p, {
      passive: !1
    });
  }
  function B() {
    s && (cancelAnimationFrame(s), s = void 0), window.removeEventListener("touchmove", p, {
      passive: !1
    });
  }
  function T(v) {
    const {
      modalOverlayOpeningPadding: b,
      modalOverlayOpeningRadius: I
    } = v.options, P = Zr(v.target), C = () => {
      s = void 0, d(b, I, P, v.target), s = requestAnimationFrame(C);
    };
    C(), _();
  }
  function S(v) {
    Rt[v ? "unshift" : "push"](() => {
      n = v, t(0, n);
    });
  }
  return o.$$set = (v) => {
    "element" in v && t(0, n = v.element), "openingProperties" in v && t(4, i = v.openingProperties);
  }, o.$$.update = () => {
    o.$$.dirty & /*openingProperties*/
    16 && t(2, a = cc(i));
  }, [n, r, a, g, i, l, c, u, d, h, f, S];
}
class pc extends qe {
  constructor(e) {
    super(), Ke(this, e, hc, dc, Xe, {
      element: 0,
      openingProperties: 4,
      getElement: 5,
      closeModalOpening: 6,
      hide: 7,
      positionModal: 8,
      setupForStep: 9,
      show: 10
    });
  }
  get getElement() {
    return this.$$.ctx[5];
  }
  get closeModalOpening() {
    return this.$$.ctx[6];
  }
  get hide() {
    return this.$$.ctx[7];
  }
  get positionModal() {
    return this.$$.ctx[8];
  }
  get setupForStep() {
    return this.$$.ctx[9];
  }
  get show() {
    return this.$$.ctx[10];
  }
}
const Ue = new Qn();
class fc extends Qn {
  /**
   * @param {Object} options The options for the tour
   * @param {boolean | function(): boolean | Promise<boolean> | function(): Promise<boolean>} options.confirmCancel If true, will issue a `window.confirm` before cancelling.
   * If it is a function(support Async Function), it will be called and wait for the return value, and will only be cancelled if the value returned is true
   * @param {string} options.confirmCancelMessage The message to display in the `window.confirm` dialog
   * @param {string} options.classPrefix The prefix to add to the `shepherd-enabled` and `shepherd-target` class names as well as the `data-shepherd-step-id`.
   * @param {Object} options.defaultStepOptions Default options for Steps ({@link Step#constructor}), created through `addStep`
   * @param {boolean} options.exitOnEsc Exiting the tour with the escape key will be enabled unless this is explicitly
   * set to false.
   * @param {boolean} options.keyboardNavigation Navigating the tour via left and right arrow keys will be enabled
   * unless this is explicitly set to false.
   * @param {HTMLElement} options.stepsContainer An optional container element for the steps.
   * If not set, the steps will be appended to `document.body`.
   * @param {HTMLElement} options.modalContainer An optional container element for the modal.
   * If not set, the modal will be appended to `document.body`.
   * @param {object[] | Step[]} options.steps An array of step options objects or Step instances to initialize the tour with
   * @param {string} options.tourName An optional "name" for the tour. This will be appended to the the tour's
   * dynamically generated `id` property.
   * @param {boolean} options.useModalOverlay Whether or not steps should be placed above a darkened
   * modal overlay. If true, the overlay will create an opening around the target element so that it
   * can remain interactive
   * @returns {Tour}
   */
  constructor(e) {
    e === void 0 && (e = {}), super(e), Lr(this);
    const t = {
      exitOnEsc: !0,
      keyboardNavigation: !0
    };
    return this.options = Object.assign({}, t, e), this.classPrefix = Nr(this.options.classPrefix), this.steps = [], this.addSteps(this.options.steps), ["active", "cancel", "complete", "inactive", "show", "start"].map((i) => {
      ((r) => {
        this.on(r, (s) => {
          s = s || {}, s.tour = this, Ue.trigger(r, s);
        });
      })(i);
    }), this._setTourID(), this;
  }
  /**
   * Adds a new step to the tour
   * @param {Object|Step} options An object containing step options or a Step instance
   * @param {number} index The optional index to insert the step at. If undefined, the step
   * is added to the end of the array.
   * @return {Step} The newly added step
   */
  addStep(e, t) {
    let n = e;
    return n instanceof An ? n.tour = this : n = new An(this, n), he(t) ? this.steps.push(n) : this.steps.splice(t, 0, n), n;
  }
  /**
   * Add multiple steps to the tour
   * @param {Array<object> | Array<Step>} steps The steps to add to the tour
   */
  addSteps(e) {
    return Array.isArray(e) && e.forEach((t) => {
      this.addStep(t);
    }), this;
  }
  /**
   * Go to the previous step in the tour
   */
  back() {
    const e = this.steps.indexOf(this.currentStep);
    this.show(e - 1, !1);
  }
  /**
   * Calls _done() triggering the 'cancel' event
   * If `confirmCancel` is true, will show a window.confirm before cancelling
   * If `confirmCancel` is a function, will call it and wait for the return value,
   * and only cancel when the value returned is true
   */
  async cancel() {
    if (this.options.confirmCancel) {
      const e = typeof this.options.confirmCancel == "function", t = this.options.confirmCancelMessage || "Are you sure you want to stop the tour?";
      (e ? await this.options.confirmCancel() : window.confirm(t)) && this._done("cancel");
    } else
      this._done("cancel");
  }
  /**
   * Calls _done() triggering the `complete` event
   */
  complete() {
    this._done("complete");
  }
  /**
   * Gets the step from a given id
   * @param {Number|String} id The id of the step to retrieve
   * @return {Step} The step corresponding to the `id`
   */
  getById(e) {
    return this.steps.find((t) => t.id === e);
  }
  /**
   * Gets the current step
   * @returns {Step|null}
   */
  getCurrentStep() {
    return this.currentStep;
  }
  /**
   * Hide the current step
   */
  hide() {
    const e = this.getCurrentStep();
    if (e)
      return e.hide();
  }
  /**
   * Check if the tour is active
   * @return {boolean}
   */
  isActive() {
    return Ue.activeTour === this;
  }
  /**
   * Go to the next step in the tour
   * If we are at the end, call `complete`
   */
  next() {
    const e = this.steps.indexOf(this.currentStep);
    e === this.steps.length - 1 ? this.complete() : this.show(e + 1, !0);
  }
  /**
   * Removes the step from the tour
   * @param {String} name The id for the step to remove
   */
  removeStep(e) {
    const t = this.getCurrentStep();
    this.steps.some((n, i) => {
      if (n.id === e)
        return n.isOpen() && n.hide(), n.destroy(), this.steps.splice(i, 1), !0;
    }), t && t.id === e && (this.currentStep = void 0, this.steps.length ? this.show(0) : this.cancel());
  }
  /**
   * Show a specific step in the tour
   * @param {Number|String} key The key to look up the step by
   * @param {Boolean} forward True if we are going forward, false if backward
   */
  show(e, t) {
    e === void 0 && (e = 0), t === void 0 && (t = !0);
    const n = so(e) ? this.getById(e) : this.steps[e];
    n && (this._updateStateBeforeShow(), ft(n.options.showOn) && !n.options.showOn() ? this._skipStep(n, t) : (this.trigger("show", {
      step: n,
      previous: this.currentStep
    }), this.currentStep = n, n.show()));
  }
  /**
   * Start the tour
   */
  start() {
    this.trigger("start"), this.focusedElBeforeOpen = document.activeElement, this.currentStep = null, this._setupModal(), this._setupActiveTour(), this.next();
  }
  /**
   * Called whenever the tour is cancelled or completed, basically anytime we exit the tour
   * @param {String} event The event name to trigger
   * @private
   */
  _done(e) {
    const t = this.steps.indexOf(this.currentStep);
    if (Array.isArray(this.steps) && this.steps.forEach((n) => n.destroy()), lc(this), this.trigger(e, {
      index: t
    }), Ue.activeTour = null, this.trigger("inactive", {
      tour: this
    }), this.modal && this.modal.hide(), (e === "cancel" || e === "complete") && this.modal) {
      const n = document.querySelector(".shepherd-modal-overlay-container");
      n && n.remove();
    }
    Jn(this.focusedElBeforeOpen) && this.focusedElBeforeOpen.focus();
  }
  /**
   * Make this tour "active"
   * @private
   */
  _setupActiveTour() {
    this.trigger("active", {
      tour: this
    }), Ue.activeTour = this;
  }
  /**
   * _setupModal create the modal container and instance
   * @private
   */
  _setupModal() {
    this.modal = new pc({
      target: this.options.modalContainer || document.body,
      props: {
        classPrefix: this.classPrefix,
        styles: this.styles
      }
    });
  }
  /**
   * Called when `showOn` evaluates to false, to skip the step or complete the tour if it's the last step
   * @param {Step} step The step to skip
   * @param {Boolean} forward True if we are going forward, false if backward
   * @private
   */
  _skipStep(e, t) {
    const n = this.steps.indexOf(e);
    if (n === this.steps.length - 1)
      this.complete();
    else {
      const i = t ? n + 1 : n - 1;
      this.show(i, t);
    }
  }
  /**
   * Before showing, hide the current step and if the tour is not
   * already active, call `this._setupActiveTour`.
   * @private
   */
  _updateStateBeforeShow() {
    this.currentStep && this.currentStep.hide(), this.isActive() || this._setupActiveTour();
  }
  /**
   * Sets this.id to `${tourName}--${uuid}`
   * @private
   */
  _setTourID() {
    const e = this.options.tourName || "tour";
    this.id = `${e}--${ei()}`;
  }
}
const gc = typeof window > "u";
class Qi {
  constructor() {
  }
}
gc ? Object.assign(Ue, {
  Tour: Qi,
  Step: Qi
}) : Object.assign(Ue, {
  Tour: fc,
  Step: An
});
function Jr(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var mc = ["left", "right", "center", "justify"], bc = { delimiter: function() {
  return "<br/>";
}, header: function(o) {
  var e = o.data;
  return "<h" + e.level + ">" + e.text + "</h" + e.level + ">";
}, paragraph: function(o) {
  var e = o.data, t = e.alignment || e.align;
  return t !== void 0 && mc.includes(t) ? '<p style="text-align:' + t + ';">' + e.text + "</p>" : "<p>" + e.text + "</p>";
}, list: function(o) {
  var e = o.data, t = e.style === "unordered" ? "ul" : "ol", n = function(i, r) {
    var s = i.map(function(a) {
      if (!a.content && !a.items)
        return "<li>" + a + "</li>";
      var l = "";
      return a.items && (l = n(a.items, r)), a.content ? "<li> " + a.content + " </li>" + l : void 0;
    });
    return "<" + r + ">" + s.join("") + "</" + r + ">";
  };
  return n(e.items, t);
}, image: function(o) {
  var e = o.data, t = e.caption ? e.caption : "Image";
  return '<img src="' + (e.file && e.file.url ? e.file.url : e.url) + '" alt="' + t + '" />';
}, quote: function(o) {
  var e = o.data;
  return "<blockquote>" + e.text + "</blockquote> - " + e.caption;
}, code: function(o) {
  return "<pre><code>" + o.data.code + "</code></pre>";
}, embed: function(o) {
  var e = o.data;
  switch (e.service) {
    case "vimeo":
      return '<iframe src="' + e.embed + '" height="' + e.height + '" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
    case "youtube":
      return '<iframe width="' + e.width + '" height="' + e.height + '" src="' + e.embed + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    default:
      throw new Error("Only Youtube and Vime Embeds are supported right now.");
  }
} };
function un(o) {
  return new Error('\x1B[31m The Parser function of type "' + o + `" is not defined. 

  Define your custom parser functions as: \x1B[34mhttps://github.com/pavittarx/editorjs-html#extend-for-custom-blocks \x1B[0m`);
}
var Qr = function(o) {
  o === void 0 && (o = {});
  var e = Object.assign({}, bc, o);
  return { parse: function(t) {
    return t.blocks.map(function(n) {
      return e[n.type] ? e[n.type](n) : un(n.type);
    });
  }, parseBlock: function(t) {
    return e[t.type] ? e[t.type](t) : un(t.type);
  }, parseStrict: function(t) {
    var n = t.blocks, i = Qr(e).validate({ blocks: n });
    if (i.length)
      throw new Error("Parser Functions missing for blocks: " + i.toString());
    for (var r = [], s = 0; s < n.length; s++) {
      if (!e[n[s].type])
        throw un(n[s].type);
      r.push(e[n[s].type](n[s]));
    }
    return r;
  }, validate: function(t) {
    var n = t.blocks.map(function(r) {
      return r.type;
    }).filter(function(r, s, a) {
      return a.indexOf(r) === s;
    }), i = Object.keys(e);
    return n.filter(function(r) {
      return !i.includes(r);
    });
  } };
}, vc = Qr;
const wc = /* @__PURE__ */ Jr(vc), D = ga({
  hovered: null,
  selected: null,
  editMode: !1,
  adminMode: !1,
  projectId: null,
  tourId: null,
  // Temporary until inferred or used for end-result
  accessToken: null,
  steps: [],
  newStep: {
    title: "",
    content: "",
    mediaURL: "",
    position: "top",
    activeType: "",
    activeElement: null,
    activeEditor: null
  },
  setSteps(o) {
    this.steps = o;
  },
  addStep(o) {
    this.steps.push(o);
  },
  async addNewStep(o = !1) {
    var n;
    const e = this.newStep.activeElement;
    if (o) {
      D.newStep.activeEditor.readOnly = !0;
      const i = await D.newStep.activeEditor.save(), s = wc().parse(i);
      this.newStep.content = s.join("");
    }
    const t = {
      id: Math.round(Math.random() * 1e8).toString(),
      title: this.newStep.title,
      text: this.newStep.content,
      type: this.newStep.activeType,
      position: this.newStep.position,
      // Custom Metadata
      xpath: e ? ya(e) : null
      // xpath can be null for full-page modals (without attachTo, that is)
    };
    this.steps.push(t), (n = Ue.activeTour) == null || n.cancel(), this.newStep.title = "", this.newStep.content = "", this.newStep.mediaURL = "", this.newStep.position = "top";
  },
  removeStep(o) {
    this.steps = this.steps.filter((e) => e !== o);
  },
  setHovered(o) {
    this.hovered = o;
  },
  setSelected(o) {
    this.selected = o;
  },
  setAdminMode(o) {
    this.adminMode = o;
  },
  setEditMode(o) {
    var e, t;
    this.editMode = o, np(o), o || ((e = this.hovered) == null || e.classList.remove("hovered"), (t = this.selected) == null || t.classList.remove("untitled_selected"), this.hovered = null, this.selected = null);
  }
});
/**!
 * Sortable 1.15.0
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function er(o, e) {
  var t = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(o);
    e && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(o, i).enumerable;
    })), t.push.apply(t, n);
  }
  return t;
}
function He(o) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? er(Object(t), !0).forEach(function(n) {
      yc(o, n, t[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(t)) : er(Object(t)).forEach(function(n) {
      Object.defineProperty(o, n, Object.getOwnPropertyDescriptor(t, n));
    });
  }
  return o;
}
function Bo(o) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Bo = function(e) {
    return typeof e;
  } : Bo = function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Bo(o);
}
function yc(o, e, t) {
  return e in o ? Object.defineProperty(o, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : o[e] = t, o;
}
function We() {
  return We = Object.assign || function(o) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (o[n] = t[n]);
    }
    return o;
  }, We.apply(this, arguments);
}
function kc(o, e) {
  if (o == null)
    return {};
  var t = {}, n = Object.keys(o), i, r;
  for (r = 0; r < n.length; r++)
    i = n[r], !(e.indexOf(i) >= 0) && (t[i] = o[i]);
  return t;
}
function xc(o, e) {
  if (o == null)
    return {};
  var t = kc(o, e), n, i;
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(o);
    for (i = 0; i < r.length; i++)
      n = r[i], !(e.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(o, n) && (t[n] = o[n]);
  }
  return t;
}
var Ec = "1.15.0";
function $e(o) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(o);
}
var Ge = $e(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), fo = $e(/Edge/i), tr = $e(/firefox/i), Zt = $e(/safari/i) && !$e(/chrome/i) && !$e(/android/i), es = $e(/iP(ad|od|hone)/i), ts = $e(/chrome/i) && $e(/android/i), os = {
  capture: !1,
  passive: !1
};
function K(o, e, t) {
  o.addEventListener(e, t, !Ge && os);
}
function X(o, e, t) {
  o.removeEventListener(e, t, !Ge && os);
}
function Uo(o, e) {
  if (e) {
    if (e[0] === ">" && (e = e.substring(1)), o)
      try {
        if (o.matches)
          return o.matches(e);
        if (o.msMatchesSelector)
          return o.msMatchesSelector(e);
        if (o.webkitMatchesSelector)
          return o.webkitMatchesSelector(e);
      } catch {
        return !1;
      }
    return !1;
  }
}
function Sc(o) {
  return o.host && o !== document && o.host.nodeType ? o.host : o.parentNode;
}
function Ne(o, e, t, n) {
  if (o) {
    t = t || document;
    do {
      if (e != null && (e[0] === ">" ? o.parentNode === t && Uo(o, e) : Uo(o, e)) || n && o === t)
        return o;
      if (o === t)
        break;
    } while (o = Sc(o));
  }
  return null;
}
var or = /\s+/g;
function ve(o, e, t) {
  if (o && e)
    if (o.classList)
      o.classList[t ? "add" : "remove"](e);
    else {
      var n = (" " + o.className + " ").replace(or, " ").replace(" " + e + " ", " ");
      o.className = (n + (t ? " " + e : "")).replace(or, " ");
    }
}
function F(o, e, t) {
  var n = o && o.style;
  if (n) {
    if (t === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? t = document.defaultView.getComputedStyle(o, "") : o.currentStyle && (t = o.currentStyle), e === void 0 ? t : t[e];
    !(e in n) && e.indexOf("webkit") === -1 && (e = "-webkit-" + e), n[e] = t + (typeof t == "string" ? "" : "px");
  }
}
function Mt(o, e) {
  var t = "";
  if (typeof o == "string")
    t = o;
  else
    do {
      var n = F(o, "transform");
      n && n !== "none" && (t = n + " " + t);
    } while (!e && (o = o.parentNode));
  var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return i && new i(t);
}
function ns(o, e, t) {
  if (o) {
    var n = o.getElementsByTagName(e), i = 0, r = n.length;
    if (t)
      for (; i < r; i++)
        t(n[i], i);
    return n;
  }
  return [];
}
function De() {
  var o = document.scrollingElement;
  return o || document.documentElement;
}
function se(o, e, t, n, i) {
  if (!(!o.getBoundingClientRect && o !== window)) {
    var r, s, a, l, c, u, d;
    if (o !== window && o.parentNode && o !== De() ? (r = o.getBoundingClientRect(), s = r.top, a = r.left, l = r.bottom, c = r.right, u = r.height, d = r.width) : (s = 0, a = 0, l = window.innerHeight, c = window.innerWidth, u = window.innerHeight, d = window.innerWidth), (e || t) && o !== window && (i = i || o.parentNode, !Ge))
      do
        if (i && i.getBoundingClientRect && (F(i, "transform") !== "none" || t && F(i, "position") !== "static")) {
          var h = i.getBoundingClientRect();
          s -= h.top + parseInt(F(i, "border-top-width")), a -= h.left + parseInt(F(i, "border-left-width")), l = s + r.height, c = a + r.width;
          break;
        }
      while (i = i.parentNode);
    if (n && o !== window) {
      var f = Mt(i || o), p = f && f.a, g = f && f.d;
      f && (s /= g, a /= p, d /= p, u /= g, l = s + u, c = a + d);
    }
    return {
      top: s,
      left: a,
      bottom: l,
      right: c,
      width: d,
      height: u
    };
  }
}
function nr(o, e, t) {
  for (var n = tt(o, !0), i = se(o)[e]; n; ) {
    var r = se(n)[t], s = void 0;
    if (t === "top" || t === "left" ? s = i >= r : s = i <= r, !s)
      return n;
    if (n === De())
      break;
    n = tt(n, !1);
  }
  return !1;
}
function Dt(o, e, t, n) {
  for (var i = 0, r = 0, s = o.children; r < s.length; ) {
    if (s[r].style.display !== "none" && s[r] !== H.ghost && (n || s[r] !== H.dragged) && Ne(s[r], t.draggable, o, !1)) {
      if (i === e)
        return s[r];
      i++;
    }
    r++;
  }
  return null;
}
function ai(o, e) {
  for (var t = o.lastElementChild; t && (t === H.ghost || F(t, "display") === "none" || e && !Uo(t, e)); )
    t = t.previousElementSibling;
  return t || null;
}
function Se(o, e) {
  var t = 0;
  if (!o || !o.parentNode)
    return -1;
  for (; o = o.previousElementSibling; )
    o.nodeName.toUpperCase() !== "TEMPLATE" && o !== H.clone && (!e || Uo(o, e)) && t++;
  return t;
}
function ir(o) {
  var e = 0, t = 0, n = De();
  if (o)
    do {
      var i = Mt(o), r = i.a, s = i.d;
      e += o.scrollLeft * r, t += o.scrollTop * s;
    } while (o !== n && (o = o.parentNode));
  return [e, t];
}
function Cc(o, e) {
  for (var t in o)
    if (o.hasOwnProperty(t)) {
      for (var n in e)
        if (e.hasOwnProperty(n) && e[n] === o[t][n])
          return Number(t);
    }
  return -1;
}
function tt(o, e) {
  if (!o || !o.getBoundingClientRect)
    return De();
  var t = o, n = !1;
  do
    if (t.clientWidth < t.scrollWidth || t.clientHeight < t.scrollHeight) {
      var i = F(t);
      if (t.clientWidth < t.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || t.clientHeight < t.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
        if (!t.getBoundingClientRect || t === document.body)
          return De();
        if (n || e)
          return t;
        n = !0;
      }
    }
  while (t = t.parentNode);
  return De();
}
function Tc(o, e) {
  if (o && e)
    for (var t in e)
      e.hasOwnProperty(t) && (o[t] = e[t]);
  return o;
}
function hn(o, e) {
  return Math.round(o.top) === Math.round(e.top) && Math.round(o.left) === Math.round(e.left) && Math.round(o.height) === Math.round(e.height) && Math.round(o.width) === Math.round(e.width);
}
var Jt;
function is(o, e) {
  return function() {
    if (!Jt) {
      var t = arguments, n = this;
      t.length === 1 ? o.call(n, t[0]) : o.apply(n, t), Jt = setTimeout(function() {
        Jt = void 0;
      }, e);
    }
  };
}
function Bc() {
  clearTimeout(Jt), Jt = void 0;
}
function rs(o, e, t) {
  o.scrollLeft += e, o.scrollTop += t;
}
function ss(o) {
  var e = window.Polymer, t = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(o).cloneNode(!0) : t ? t(o).clone(!0)[0] : o.cloneNode(!0);
}
var ye = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function _c() {
  var o = [], e;
  return {
    captureAnimationState: function() {
      if (o = [], !!this.options.animation) {
        var n = [].slice.call(this.el.children);
        n.forEach(function(i) {
          if (!(F(i, "display") === "none" || i === H.ghost)) {
            o.push({
              target: i,
              rect: se(i)
            });
            var r = He({}, o[o.length - 1].rect);
            if (i.thisAnimationDuration) {
              var s = Mt(i, !0);
              s && (r.top -= s.f, r.left -= s.e);
            }
            i.fromRect = r;
          }
        });
      }
    },
    addAnimationState: function(n) {
      o.push(n);
    },
    removeAnimationState: function(n) {
      o.splice(Cc(o, {
        target: n
      }), 1);
    },
    animateAll: function(n) {
      var i = this;
      if (!this.options.animation) {
        clearTimeout(e), typeof n == "function" && n();
        return;
      }
      var r = !1, s = 0;
      o.forEach(function(a) {
        var l = 0, c = a.target, u = c.fromRect, d = se(c), h = c.prevFromRect, f = c.prevToRect, p = a.rect, g = Mt(c, !0);
        g && (d.top -= g.f, d.left -= g.e), c.toRect = d, c.thisAnimationDuration && hn(h, d) && !hn(u, d) && // Make sure animatingRect is on line between toRect & fromRect
        (p.top - d.top) / (p.left - d.left) === (u.top - d.top) / (u.left - d.left) && (l = Ic(p, h, f, i.options)), hn(d, u) || (c.prevFromRect = u, c.prevToRect = d, l || (l = i.options.animation), i.animate(c, p, d, l)), l && (r = !0, s = Math.max(s, l), clearTimeout(c.animationResetTimer), c.animationResetTimer = setTimeout(function() {
          c.animationTime = 0, c.prevFromRect = null, c.fromRect = null, c.prevToRect = null, c.thisAnimationDuration = null;
        }, l), c.thisAnimationDuration = l);
      }), clearTimeout(e), r ? e = setTimeout(function() {
        typeof n == "function" && n();
      }, s) : typeof n == "function" && n(), o = [];
    },
    animate: function(n, i, r, s) {
      if (s) {
        F(n, "transition", ""), F(n, "transform", "");
        var a = Mt(this.el), l = a && a.a, c = a && a.d, u = (i.left - r.left) / (l || 1), d = (i.top - r.top) / (c || 1);
        n.animatingX = !!u, n.animatingY = !!d, F(n, "transform", "translate3d(" + u + "px," + d + "px,0)"), this.forRepaintDummy = Oc(n), F(n, "transition", "transform " + s + "ms" + (this.options.easing ? " " + this.options.easing : "")), F(n, "transform", "translate3d(0,0,0)"), typeof n.animated == "number" && clearTimeout(n.animated), n.animated = setTimeout(function() {
          F(n, "transition", ""), F(n, "transform", ""), n.animated = !1, n.animatingX = !1, n.animatingY = !1;
        }, s);
      }
    }
  };
}
function Oc(o) {
  return o.offsetWidth;
}
function Ic(o, e, t, n) {
  return Math.sqrt(Math.pow(e.top - o.top, 2) + Math.pow(e.left - o.left, 2)) / Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) * n.animation;
}
var xt = [], pn = {
  initializeByDefault: !0
}, go = {
  mount: function(e) {
    for (var t in pn)
      pn.hasOwnProperty(t) && !(t in e) && (e[t] = pn[t]);
    xt.forEach(function(n) {
      if (n.pluginName === e.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(e.pluginName, " more than once");
    }), xt.push(e);
  },
  pluginEvent: function(e, t, n) {
    var i = this;
    this.eventCanceled = !1, n.cancel = function() {
      i.eventCanceled = !0;
    };
    var r = e + "Global";
    xt.forEach(function(s) {
      t[s.pluginName] && (t[s.pluginName][r] && t[s.pluginName][r](He({
        sortable: t
      }, n)), t.options[s.pluginName] && t[s.pluginName][e] && t[s.pluginName][e](He({
        sortable: t
      }, n)));
    });
  },
  initializePlugins: function(e, t, n, i) {
    xt.forEach(function(a) {
      var l = a.pluginName;
      if (!(!e.options[l] && !a.initializeByDefault)) {
        var c = new a(e, t, e.options);
        c.sortable = e, c.options = e.options, e[l] = c, We(n, c.defaults);
      }
    });
    for (var r in e.options)
      if (e.options.hasOwnProperty(r)) {
        var s = this.modifyOption(e, r, e.options[r]);
        typeof s < "u" && (e.options[r] = s);
      }
  },
  getEventProperties: function(e, t) {
    var n = {};
    return xt.forEach(function(i) {
      typeof i.eventProperties == "function" && We(n, i.eventProperties.call(t[i.pluginName], e));
    }), n;
  },
  modifyOption: function(e, t, n) {
    var i;
    return xt.forEach(function(r) {
      e[r.pluginName] && r.optionListeners && typeof r.optionListeners[t] == "function" && (i = r.optionListeners[t].call(e[r.pluginName], n));
    }), i;
  }
};
function Ac(o) {
  var e = o.sortable, t = o.rootEl, n = o.name, i = o.targetEl, r = o.cloneEl, s = o.toEl, a = o.fromEl, l = o.oldIndex, c = o.newIndex, u = o.oldDraggableIndex, d = o.newDraggableIndex, h = o.originalEvent, f = o.putSortable, p = o.extraEventProperties;
  if (e = e || t && t[ye], !!e) {
    var g, _ = e.options, B = "on" + n.charAt(0).toUpperCase() + n.substr(1);
    window.CustomEvent && !Ge && !fo ? g = new CustomEvent(n, {
      bubbles: !0,
      cancelable: !0
    }) : (g = document.createEvent("Event"), g.initEvent(n, !0, !0)), g.to = s || t, g.from = a || t, g.item = i || t, g.clone = r, g.oldIndex = l, g.newIndex = c, g.oldDraggableIndex = u, g.newDraggableIndex = d, g.originalEvent = h, g.pullMode = f ? f.lastPutMode : void 0;
    var T = He(He({}, p), go.getEventProperties(n, e));
    for (var S in T)
      g[S] = T[S];
    t && t.dispatchEvent(g), _[B] && _[B].call(e, g);
  }
}
var Mc = ["evt"], ge = function(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = n.evt, r = xc(n, Mc);
  go.pluginEvent.bind(H)(e, t, He({
    dragEl: O,
    parentEl: ee,
    ghostEl: U,
    rootEl: J,
    nextEl: ct,
    lastDownEl: _o,
    cloneEl: Q,
    cloneHidden: Qe,
    dragStarted: $t,
    putSortable: le,
    activeSortable: H.active,
    originalEvent: i,
    oldIndex: Ot,
    oldDraggableIndex: Qt,
    newIndex: we,
    newDraggableIndex: Je,
    hideGhostForTarget: ds,
    unhideGhostForTarget: us,
    cloneNowHidden: function() {
      Qe = !0;
    },
    cloneNowShown: function() {
      Qe = !1;
    },
    dispatchSortableEvent: function(a) {
      pe({
        sortable: t,
        name: a,
        originalEvent: i
      });
    }
  }, r));
};
function pe(o) {
  Ac(He({
    putSortable: le,
    cloneEl: Q,
    targetEl: O,
    rootEl: J,
    oldIndex: Ot,
    oldDraggableIndex: Qt,
    newIndex: we,
    newDraggableIndex: Je
  }, o));
}
var O, ee, U, J, ct, _o, Q, Qe, Ot, we, Qt, Je, xo, le, Ct = !1, zo = !1, $o = [], at, Be, fn, gn, rr, sr, $t, Et, eo, to = !1, Eo = !1, Oo, de, mn = [], Mn = !1, Vo = [], Qo = typeof document < "u", So = es, ar = fo || Ge ? "cssFloat" : "float", Lc = Qo && !ts && !es && "draggable" in document.createElement("div"), as = function() {
  if (Qo) {
    if (Ge)
      return !1;
    var o = document.createElement("x");
    return o.style.cssText = "pointer-events:auto", o.style.pointerEvents === "auto";
  }
}(), ls = function(e, t) {
  var n = F(e), i = parseInt(n.width) - parseInt(n.paddingLeft) - parseInt(n.paddingRight) - parseInt(n.borderLeftWidth) - parseInt(n.borderRightWidth), r = Dt(e, 0, t), s = Dt(e, 1, t), a = r && F(r), l = s && F(s), c = a && parseInt(a.marginLeft) + parseInt(a.marginRight) + se(r).width, u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + se(s).width;
  if (n.display === "flex")
    return n.flexDirection === "column" || n.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (n.display === "grid")
    return n.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (r && a.float && a.float !== "none") {
    var d = a.float === "left" ? "left" : "right";
    return s && (l.clear === "both" || l.clear === d) ? "vertical" : "horizontal";
  }
  return r && (a.display === "block" || a.display === "flex" || a.display === "table" || a.display === "grid" || c >= i && n[ar] === "none" || s && n[ar] === "none" && c + u > i) ? "vertical" : "horizontal";
}, Nc = function(e, t, n) {
  var i = n ? e.left : e.top, r = n ? e.right : e.bottom, s = n ? e.width : e.height, a = n ? t.left : t.top, l = n ? t.right : t.bottom, c = n ? t.width : t.height;
  return i === a || r === l || i + s / 2 === a + c / 2;
}, Rc = function(e, t) {
  var n;
  return $o.some(function(i) {
    var r = i[ye].options.emptyInsertThreshold;
    if (!(!r || ai(i))) {
      var s = se(i), a = e >= s.left - r && e <= s.right + r, l = t >= s.top - r && t <= s.bottom + r;
      if (a && l)
        return n = i;
    }
  }), n;
}, cs = function(e) {
  function t(r, s) {
    return function(a, l, c, u) {
      var d = a.options.group.name && l.options.group.name && a.options.group.name === l.options.group.name;
      if (r == null && (s || d))
        return !0;
      if (r == null || r === !1)
        return !1;
      if (s && r === "clone")
        return r;
      if (typeof r == "function")
        return t(r(a, l, c, u), s)(a, l, c, u);
      var h = (s ? a : l).options.group.name;
      return r === !0 || typeof r == "string" && r === h || r.join && r.indexOf(h) > -1;
    };
  }
  var n = {}, i = e.group;
  (!i || Bo(i) != "object") && (i = {
    name: i
  }), n.name = i.name, n.checkPull = t(i.pull, !0), n.checkPut = t(i.put), n.revertClone = i.revertClone, e.group = n;
}, ds = function() {
  !as && U && F(U, "display", "none");
}, us = function() {
  !as && U && F(U, "display", "");
};
Qo && !ts && document.addEventListener("click", function(o) {
  if (zo)
    return o.preventDefault(), o.stopPropagation && o.stopPropagation(), o.stopImmediatePropagation && o.stopImmediatePropagation(), zo = !1, !1;
}, !0);
var lt = function(e) {
  if (O) {
    e = e.touches ? e.touches[0] : e;
    var t = Rc(e.clientX, e.clientY);
    if (t) {
      var n = {};
      for (var i in e)
        e.hasOwnProperty(i) && (n[i] = e[i]);
      n.target = n.rootEl = t, n.preventDefault = void 0, n.stopPropagation = void 0, t[ye]._onDragOver(n);
    }
  }
}, Dc = function(e) {
  O && O.parentNode[ye]._isOutsideThisEl(e.target);
};
function H(o, e) {
  if (!(o && o.nodeType && o.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(o));
  this.el = o, this.options = e = We({}, e), o[ye] = this;
  var t = {
    group: null,
    sort: !0,
    disabled: !1,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(o.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: !1,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: !0,
    direction: function() {
      return ls(o, this.options);
    },
    ghostClass: "sortable-ghost",
    chosenClass: "sortable-chosen",
    dragClass: "sortable-drag",
    ignore: "a, img",
    filter: null,
    preventOnFilter: !0,
    animation: 0,
    easing: null,
    setData: function(s, a) {
      s.setData("Text", a.textContent);
    },
    dropBubble: !1,
    dragoverBubble: !1,
    dataIdAttr: "data-id",
    delay: 0,
    delayOnTouchOnly: !1,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: !1,
    fallbackClass: "sortable-fallback",
    fallbackOnBody: !1,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    supportPointer: H.supportPointer !== !1 && "PointerEvent" in window && !Zt,
    emptyInsertThreshold: 5
  };
  go.initializePlugins(this, o, t);
  for (var n in t)
    !(n in e) && (e[n] = t[n]);
  cs(e);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = e.forceFallback ? !1 : Lc, this.nativeDraggable && (this.options.touchStartThreshold = 1), e.supportPointer ? K(o, "pointerdown", this._onTapStart) : (K(o, "mousedown", this._onTapStart), K(o, "touchstart", this._onTapStart)), this.nativeDraggable && (K(o, "dragover", this), K(o, "dragenter", this)), $o.push(this.el), e.store && e.store.get && this.sort(e.store.get(this) || []), We(this, _c());
}
H.prototype = /** @lends Sortable.prototype */
{
  constructor: H,
  _isOutsideThisEl: function(e) {
    !this.el.contains(e) && e !== this.el && (Et = null);
  },
  _getDirection: function(e, t) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, e, t, O) : this.options.direction;
  },
  _onTapStart: function(e) {
    if (e.cancelable) {
      var t = this, n = this.el, i = this.options, r = i.preventOnFilter, s = e.type, a = e.touches && e.touches[0] || e.pointerType && e.pointerType === "touch" && e, l = (a || e).target, c = e.target.shadowRoot && (e.path && e.path[0] || e.composedPath && e.composedPath()[0]) || l, u = i.filter;
      if (Vc(n), !O && !(/mousedown|pointerdown/.test(s) && e.button !== 0 || i.disabled) && !c.isContentEditable && !(!this.nativeDraggable && Zt && l && l.tagName.toUpperCase() === "SELECT") && (l = Ne(l, i.draggable, n, !1), !(l && l.animated) && _o !== l)) {
        if (Ot = Se(l), Qt = Se(l, i.draggable), typeof u == "function") {
          if (u.call(this, e, l, this)) {
            pe({
              sortable: t,
              rootEl: c,
              name: "filter",
              targetEl: l,
              toEl: n,
              fromEl: n
            }), ge("filter", t, {
              evt: e
            }), r && e.cancelable && e.preventDefault();
            return;
          }
        } else if (u && (u = u.split(",").some(function(d) {
          if (d = Ne(c, d.trim(), n, !1), d)
            return pe({
              sortable: t,
              rootEl: d,
              name: "filter",
              targetEl: l,
              fromEl: n,
              toEl: n
            }), ge("filter", t, {
              evt: e
            }), !0;
        }), u)) {
          r && e.cancelable && e.preventDefault();
          return;
        }
        i.handle && !Ne(c, i.handle, n, !1) || this._prepareDragStart(e, a, l);
      }
    }
  },
  _prepareDragStart: function(e, t, n) {
    var i = this, r = i.el, s = i.options, a = r.ownerDocument, l;
    if (n && !O && n.parentNode === r) {
      var c = se(n);
      if (J = r, O = n, ee = O.parentNode, ct = O.nextSibling, _o = n, xo = s.group, H.dragged = O, at = {
        target: O,
        clientX: (t || e).clientX,
        clientY: (t || e).clientY
      }, rr = at.clientX - c.left, sr = at.clientY - c.top, this._lastX = (t || e).clientX, this._lastY = (t || e).clientY, O.style["will-change"] = "all", l = function() {
        if (ge("delayEnded", i, {
          evt: e
        }), H.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !tr && i.nativeDraggable && (O.draggable = !0), i._triggerDragStart(e, t), pe({
          sortable: i,
          name: "choose",
          originalEvent: e
        }), ve(O, s.chosenClass, !0);
      }, s.ignore.split(",").forEach(function(u) {
        ns(O, u.trim(), bn);
      }), K(a, "dragover", lt), K(a, "mousemove", lt), K(a, "touchmove", lt), K(a, "mouseup", i._onDrop), K(a, "touchend", i._onDrop), K(a, "touchcancel", i._onDrop), tr && this.nativeDraggable && (this.options.touchStartThreshold = 4, O.draggable = !0), ge("delayStart", this, {
        evt: e
      }), s.delay && (!s.delayOnTouchOnly || t) && (!this.nativeDraggable || !(fo || Ge))) {
        if (H.eventCanceled) {
          this._onDrop();
          return;
        }
        K(a, "mouseup", i._disableDelayedDrag), K(a, "touchend", i._disableDelayedDrag), K(a, "touchcancel", i._disableDelayedDrag), K(a, "mousemove", i._delayedDragTouchMoveHandler), K(a, "touchmove", i._delayedDragTouchMoveHandler), s.supportPointer && K(a, "pointermove", i._delayedDragTouchMoveHandler), i._dragStartTimer = setTimeout(l, s.delay);
      } else
        l();
    }
  },
  _delayedDragTouchMoveHandler: function(e) {
    var t = e.touches ? e.touches[0] : e;
    Math.max(Math.abs(t.clientX - this._lastX), Math.abs(t.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    O && bn(O), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var e = this.el.ownerDocument;
    X(e, "mouseup", this._disableDelayedDrag), X(e, "touchend", this._disableDelayedDrag), X(e, "touchcancel", this._disableDelayedDrag), X(e, "mousemove", this._delayedDragTouchMoveHandler), X(e, "touchmove", this._delayedDragTouchMoveHandler), X(e, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(e, t) {
    t = t || e.pointerType == "touch" && e, !this.nativeDraggable || t ? this.options.supportPointer ? K(document, "pointermove", this._onTouchMove) : t ? K(document, "touchmove", this._onTouchMove) : K(document, "mousemove", this._onTouchMove) : (K(O, "dragend", this), K(J, "dragstart", this._onDragStart));
    try {
      document.selection ? Io(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(e, t) {
    if (Ct = !1, J && O) {
      ge("dragStarted", this, {
        evt: t
      }), this.nativeDraggable && K(document, "dragover", Dc);
      var n = this.options;
      !e && ve(O, n.dragClass, !1), ve(O, n.ghostClass, !0), H.active = this, e && this._appendGhost(), pe({
        sortable: this,
        name: "start",
        originalEvent: t
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (Be) {
      this._lastX = Be.clientX, this._lastY = Be.clientY, ds();
      for (var e = document.elementFromPoint(Be.clientX, Be.clientY), t = e; e && e.shadowRoot && (e = e.shadowRoot.elementFromPoint(Be.clientX, Be.clientY), e !== t); )
        t = e;
      if (O.parentNode[ye]._isOutsideThisEl(e), t)
        do {
          if (t[ye]) {
            var n = void 0;
            if (n = t[ye]._onDragOver({
              clientX: Be.clientX,
              clientY: Be.clientY,
              target: e,
              rootEl: t
            }), n && !this.options.dragoverBubble)
              break;
          }
          e = t;
        } while (t = t.parentNode);
      us();
    }
  },
  _onTouchMove: function(e) {
    if (at) {
      var t = this.options, n = t.fallbackTolerance, i = t.fallbackOffset, r = e.touches ? e.touches[0] : e, s = U && Mt(U, !0), a = U && s && s.a, l = U && s && s.d, c = So && de && ir(de), u = (r.clientX - at.clientX + i.x) / (a || 1) + (c ? c[0] - mn[0] : 0) / (a || 1), d = (r.clientY - at.clientY + i.y) / (l || 1) + (c ? c[1] - mn[1] : 0) / (l || 1);
      if (!H.active && !Ct) {
        if (n && Math.max(Math.abs(r.clientX - this._lastX), Math.abs(r.clientY - this._lastY)) < n)
          return;
        this._onDragStart(e, !0);
      }
      if (U) {
        s ? (s.e += u - (fn || 0), s.f += d - (gn || 0)) : s = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: u,
          f: d
        };
        var h = "matrix(".concat(s.a, ",").concat(s.b, ",").concat(s.c, ",").concat(s.d, ",").concat(s.e, ",").concat(s.f, ")");
        F(U, "webkitTransform", h), F(U, "mozTransform", h), F(U, "msTransform", h), F(U, "transform", h), fn = u, gn = d, Be = r;
      }
      e.cancelable && e.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!U) {
      var e = this.options.fallbackOnBody ? document.body : J, t = se(O, !0, So, !0, e), n = this.options;
      if (So) {
        for (de = e; F(de, "position") === "static" && F(de, "transform") === "none" && de !== document; )
          de = de.parentNode;
        de !== document.body && de !== document.documentElement ? (de === document && (de = De()), t.top += de.scrollTop, t.left += de.scrollLeft) : de = De(), mn = ir(de);
      }
      U = O.cloneNode(!0), ve(U, n.ghostClass, !1), ve(U, n.fallbackClass, !0), ve(U, n.dragClass, !0), F(U, "transition", ""), F(U, "transform", ""), F(U, "box-sizing", "border-box"), F(U, "margin", 0), F(U, "top", t.top), F(U, "left", t.left), F(U, "width", t.width), F(U, "height", t.height), F(U, "opacity", "0.8"), F(U, "position", So ? "absolute" : "fixed"), F(U, "zIndex", "100000"), F(U, "pointerEvents", "none"), H.ghost = U, e.appendChild(U), F(U, "transform-origin", rr / parseInt(U.style.width) * 100 + "% " + sr / parseInt(U.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(e, t) {
    var n = this, i = e.dataTransfer, r = n.options;
    if (ge("dragStart", this, {
      evt: e
    }), H.eventCanceled) {
      this._onDrop();
      return;
    }
    ge("setupClone", this), H.eventCanceled || (Q = ss(O), Q.removeAttribute("id"), Q.draggable = !1, Q.style["will-change"] = "", this._hideClone(), ve(Q, this.options.chosenClass, !1), H.clone = Q), n.cloneId = Io(function() {
      ge("clone", n), !H.eventCanceled && (n.options.removeCloneOnHide || J.insertBefore(Q, O), n._hideClone(), pe({
        sortable: n,
        name: "clone"
      }));
    }), !t && ve(O, r.dragClass, !0), t ? (zo = !0, n._loopId = setInterval(n._emulateDragOver, 50)) : (X(document, "mouseup", n._onDrop), X(document, "touchend", n._onDrop), X(document, "touchcancel", n._onDrop), i && (i.effectAllowed = "move", r.setData && r.setData.call(n, i, O)), K(document, "drop", n), F(O, "transform", "translateZ(0)")), Ct = !0, n._dragStartId = Io(n._dragStarted.bind(n, t, e)), K(document, "selectstart", n), $t = !0, Zt && F(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(e) {
    var t = this.el, n = e.target, i, r, s, a = this.options, l = a.group, c = H.active, u = xo === l, d = a.sort, h = le || c, f, p = this, g = !1;
    if (Mn)
      return;
    function _(z, be) {
      ge(z, p, He({
        evt: e,
        isOwner: u,
        axis: f ? "vertical" : "horizontal",
        revert: s,
        dragRect: i,
        targetRect: r,
        canSort: d,
        fromSortable: h,
        target: n,
        completed: T,
        onMove: function(wo, yo) {
          return Co(J, t, O, i, wo, se(wo), e, yo);
        },
        changed: S
      }, be));
    }
    function B() {
      _("dragOverAnimationCapture"), p.captureAnimationState(), p !== h && h.captureAnimationState();
    }
    function T(z) {
      return _("dragOverCompleted", {
        insertion: z
      }), z && (u ? c._hideClone() : c._showClone(p), p !== h && (ve(O, le ? le.options.ghostClass : c.options.ghostClass, !1), ve(O, a.ghostClass, !0)), le !== p && p !== H.active ? le = p : p === H.active && le && (le = null), h === p && (p._ignoreWhileAnimating = n), p.animateAll(function() {
        _("dragOverAnimationComplete"), p._ignoreWhileAnimating = null;
      }), p !== h && (h.animateAll(), h._ignoreWhileAnimating = null)), (n === O && !O.animated || n === t && !n.animated) && (Et = null), !a.dragoverBubble && !e.rootEl && n !== document && (O.parentNode[ye]._isOutsideThisEl(e.target), !z && lt(e)), !a.dragoverBubble && e.stopPropagation && e.stopPropagation(), g = !0;
    }
    function S() {
      we = Se(O), Je = Se(O, a.draggable), pe({
        sortable: p,
        name: "change",
        toEl: t,
        newIndex: we,
        newDraggableIndex: Je,
        originalEvent: e
      });
    }
    if (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(), n = Ne(n, a.draggable, t, !0), _("dragOver"), H.eventCanceled)
      return g;
    if (O.contains(e.target) || n.animated && n.animatingX && n.animatingY || p._ignoreWhileAnimating === n)
      return T(!1);
    if (zo = !1, c && !a.disabled && (u ? d || (s = ee !== J) : le === this || (this.lastPutMode = xo.checkPull(this, c, O, e)) && l.checkPut(this, c, O, e))) {
      if (f = this._getDirection(e, n) === "vertical", i = se(O), _("dragOverValid"), H.eventCanceled)
        return g;
      if (s)
        return ee = J, B(), this._hideClone(), _("revert"), H.eventCanceled || (ct ? J.insertBefore(O, ct) : J.appendChild(O)), T(!0);
      var v = ai(t, a.draggable);
      if (!v || jc(e, f, this) && !v.animated) {
        if (v === O)
          return T(!1);
        if (v && t === e.target && (n = v), n && (r = se(n)), Co(J, t, O, i, n, r, e, !!n) !== !1)
          return B(), v && v.nextSibling ? t.insertBefore(O, v.nextSibling) : t.appendChild(O), ee = t, S(), T(!0);
      } else if (v && Hc(e, f, this)) {
        var b = Dt(t, 0, a, !0);
        if (b === O)
          return T(!1);
        if (n = b, r = se(n), Co(J, t, O, i, n, r, e, !1) !== !1)
          return B(), t.insertBefore(O, b), ee = t, S(), T(!0);
      } else if (n.parentNode === t) {
        r = se(n);
        var I = 0, P, C = O.parentNode !== t, x = !Nc(O.animated && O.toRect || i, n.animated && n.toRect || r, f), L = f ? "top" : "left", w = nr(n, "top", "top") || nr(O, "top", "top"), k = w ? w.scrollTop : void 0;
        Et !== n && (P = r[L], to = !1, Eo = !x && a.invertSwap || C), I = Uc(e, n, r, f, x ? 1 : a.swapThreshold, a.invertedSwapThreshold == null ? a.swapThreshold : a.invertedSwapThreshold, Eo, Et === n);
        var E;
        if (I !== 0) {
          var M = Se(O);
          do
            M -= I, E = ee.children[M];
          while (E && (F(E, "display") === "none" || E === U));
        }
        if (I === 0 || E === n)
          return T(!1);
        Et = n, eo = I;
        var A = n.nextElementSibling, N = !1;
        N = I === 1;
        var V = Co(J, t, O, i, n, r, e, N);
        if (V !== !1)
          return (V === 1 || V === -1) && (N = V === 1), Mn = !0, setTimeout(Fc, 30), B(), N && !A ? t.appendChild(O) : n.parentNode.insertBefore(O, N ? A : n), w && rs(w, 0, k - w.scrollTop), ee = O.parentNode, P !== void 0 && !Eo && (Oo = Math.abs(P - se(n)[L])), S(), T(!0);
      }
      if (t.contains(O))
        return T(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    X(document, "mousemove", this._onTouchMove), X(document, "touchmove", this._onTouchMove), X(document, "pointermove", this._onTouchMove), X(document, "dragover", lt), X(document, "mousemove", lt), X(document, "touchmove", lt);
  },
  _offUpEvents: function() {
    var e = this.el.ownerDocument;
    X(e, "mouseup", this._onDrop), X(e, "touchend", this._onDrop), X(e, "pointerup", this._onDrop), X(e, "touchcancel", this._onDrop), X(document, "selectstart", this);
  },
  _onDrop: function(e) {
    var t = this.el, n = this.options;
    if (we = Se(O), Je = Se(O, n.draggable), ge("drop", this, {
      evt: e
    }), ee = O && O.parentNode, we = Se(O), Je = Se(O, n.draggable), H.eventCanceled) {
      this._nulling();
      return;
    }
    Ct = !1, Eo = !1, to = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), Ln(this.cloneId), Ln(this._dragStartId), this.nativeDraggable && (X(document, "drop", this), X(t, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Zt && F(document.body, "user-select", ""), F(O, "transform", ""), e && ($t && (e.cancelable && e.preventDefault(), !n.dropBubble && e.stopPropagation()), U && U.parentNode && U.parentNode.removeChild(U), (J === ee || le && le.lastPutMode !== "clone") && Q && Q.parentNode && Q.parentNode.removeChild(Q), O && (this.nativeDraggable && X(O, "dragend", this), bn(O), O.style["will-change"] = "", $t && !Ct && ve(O, le ? le.options.ghostClass : this.options.ghostClass, !1), ve(O, this.options.chosenClass, !1), pe({
      sortable: this,
      name: "unchoose",
      toEl: ee,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: e
    }), J !== ee ? (we >= 0 && (pe({
      rootEl: ee,
      name: "add",
      toEl: ee,
      fromEl: J,
      originalEvent: e
    }), pe({
      sortable: this,
      name: "remove",
      toEl: ee,
      originalEvent: e
    }), pe({
      rootEl: ee,
      name: "sort",
      toEl: ee,
      fromEl: J,
      originalEvent: e
    }), pe({
      sortable: this,
      name: "sort",
      toEl: ee,
      originalEvent: e
    })), le && le.save()) : we !== Ot && we >= 0 && (pe({
      sortable: this,
      name: "update",
      toEl: ee,
      originalEvent: e
    }), pe({
      sortable: this,
      name: "sort",
      toEl: ee,
      originalEvent: e
    })), H.active && ((we == null || we === -1) && (we = Ot, Je = Qt), pe({
      sortable: this,
      name: "end",
      toEl: ee,
      originalEvent: e
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    ge("nulling", this), J = O = ee = U = ct = Q = _o = Qe = at = Be = $t = we = Je = Ot = Qt = Et = eo = le = xo = H.dragged = H.ghost = H.clone = H.active = null, Vo.forEach(function(e) {
      e.checked = !0;
    }), Vo.length = fn = gn = 0;
  },
  handleEvent: function(e) {
    switch (e.type) {
      case "drop":
      case "dragend":
        this._onDrop(e);
        break;
      case "dragenter":
      case "dragover":
        O && (this._onDragOver(e), Pc(e));
        break;
      case "selectstart":
        e.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function() {
    for (var e = [], t, n = this.el.children, i = 0, r = n.length, s = this.options; i < r; i++)
      t = n[i], Ne(t, s.draggable, this.el, !1) && e.push(t.getAttribute(s.dataIdAttr) || $c(t));
    return e;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(e, t) {
    var n = {}, i = this.el;
    this.toArray().forEach(function(r, s) {
      var a = i.children[s];
      Ne(a, this.options.draggable, i, !1) && (n[r] = a);
    }, this), t && this.captureAnimationState(), e.forEach(function(r) {
      n[r] && (i.removeChild(n[r]), i.appendChild(n[r]));
    }), t && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function() {
    var e = this.options.store;
    e && e.set && e.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function(e, t) {
    return Ne(e, t || this.options.draggable, this.el, !1);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function(e, t) {
    var n = this.options;
    if (t === void 0)
      return n[e];
    var i = go.modifyOption(this, e, t);
    typeof i < "u" ? n[e] = i : n[e] = t, e === "group" && cs(n);
  },
  /**
   * Destroy
   */
  destroy: function() {
    ge("destroy", this);
    var e = this.el;
    e[ye] = null, X(e, "mousedown", this._onTapStart), X(e, "touchstart", this._onTapStart), X(e, "pointerdown", this._onTapStart), this.nativeDraggable && (X(e, "dragover", this), X(e, "dragenter", this)), Array.prototype.forEach.call(e.querySelectorAll("[draggable]"), function(t) {
      t.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), $o.splice($o.indexOf(this.el), 1), this.el = e = null;
  },
  _hideClone: function() {
    if (!Qe) {
      if (ge("hideClone", this), H.eventCanceled)
        return;
      F(Q, "display", "none"), this.options.removeCloneOnHide && Q.parentNode && Q.parentNode.removeChild(Q), Qe = !0;
    }
  },
  _showClone: function(e) {
    if (e.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if (Qe) {
      if (ge("showClone", this), H.eventCanceled)
        return;
      O.parentNode == J && !this.options.group.revertClone ? J.insertBefore(Q, O) : ct ? J.insertBefore(Q, ct) : J.appendChild(Q), this.options.group.revertClone && this.animate(O, Q), F(Q, "display", ""), Qe = !1;
    }
  }
};
function Pc(o) {
  o.dataTransfer && (o.dataTransfer.dropEffect = "move"), o.cancelable && o.preventDefault();
}
function Co(o, e, t, n, i, r, s, a) {
  var l, c = o[ye], u = c.options.onMove, d;
  return window.CustomEvent && !Ge && !fo ? l = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (l = document.createEvent("Event"), l.initEvent("move", !0, !0)), l.to = e, l.from = o, l.dragged = t, l.draggedRect = n, l.related = i || e, l.relatedRect = r || se(e), l.willInsertAfter = a, l.originalEvent = s, o.dispatchEvent(l), u && (d = u.call(c, l, s)), d;
}
function bn(o) {
  o.draggable = !1;
}
function Fc() {
  Mn = !1;
}
function Hc(o, e, t) {
  var n = se(Dt(t.el, 0, t.options, !0)), i = 10;
  return e ? o.clientX < n.left - i || o.clientY < n.top && o.clientX < n.right : o.clientY < n.top - i || o.clientY < n.bottom && o.clientX < n.left;
}
function jc(o, e, t) {
  var n = se(ai(t.el, t.options.draggable)), i = 10;
  return e ? o.clientX > n.right + i || o.clientX <= n.right && o.clientY > n.bottom && o.clientX >= n.left : o.clientX > n.right && o.clientY > n.top || o.clientX <= n.right && o.clientY > n.bottom + i;
}
function Uc(o, e, t, n, i, r, s, a) {
  var l = n ? o.clientY : o.clientX, c = n ? t.height : t.width, u = n ? t.top : t.left, d = n ? t.bottom : t.right, h = !1;
  if (!s) {
    if (a && Oo < c * i) {
      if (!to && (eo === 1 ? l > u + c * r / 2 : l < d - c * r / 2) && (to = !0), to)
        h = !0;
      else if (eo === 1 ? l < u + Oo : l > d - Oo)
        return -eo;
    } else if (l > u + c * (1 - i) / 2 && l < d - c * (1 - i) / 2)
      return zc(e);
  }
  return h = h || s, h && (l < u + c * r / 2 || l > d - c * r / 2) ? l > u + c / 2 ? 1 : -1 : 0;
}
function zc(o) {
  return Se(O) < Se(o) ? 1 : -1;
}
function $c(o) {
  for (var e = o.tagName + o.className + o.src + o.href + o.textContent, t = e.length, n = 0; t--; )
    n += e.charCodeAt(t);
  return n.toString(36);
}
function Vc(o) {
  Vo.length = 0;
  for (var e = o.getElementsByTagName("input"), t = e.length; t--; ) {
    var n = e[t];
    n.checked && Vo.push(n);
  }
}
function Io(o) {
  return setTimeout(o, 0);
}
function Ln(o) {
  return clearTimeout(o);
}
Qo && K(document, "touchmove", function(o) {
  (H.active || Ct) && o.cancelable && o.preventDefault();
});
H.utils = {
  on: K,
  off: X,
  css: F,
  find: ns,
  is: function(e, t) {
    return !!Ne(e, t, e, !1);
  },
  extend: Tc,
  throttle: is,
  closest: Ne,
  toggleClass: ve,
  clone: ss,
  index: Se,
  nextTick: Io,
  cancelNextTick: Ln,
  detectDirection: ls,
  getChild: Dt
};
H.get = function(o) {
  return o[ye];
};
H.mount = function() {
  for (var o = arguments.length, e = new Array(o), t = 0; t < o; t++)
    e[t] = arguments[t];
  e[0].constructor === Array && (e = e[0]), e.forEach(function(n) {
    if (!n.prototype || !n.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(n));
    n.utils && (H.utils = He(He({}, H.utils), n.utils)), go.mount(n);
  });
};
H.create = function(o, e) {
  return new H(o, e);
};
H.version = Ec;
var ne = [], Vt, Nn, Rn = !1, vn, wn, Wo, Wt;
function Wc() {
  function o() {
    this.defaults = {
      scroll: !0,
      forceAutoScrollFallback: !1,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: !0
    };
    for (var e in this)
      e.charAt(0) === "_" && typeof this[e] == "function" && (this[e] = this[e].bind(this));
  }
  return o.prototype = {
    dragStarted: function(t) {
      var n = t.originalEvent;
      this.sortable.nativeDraggable ? K(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? K(document, "pointermove", this._handleFallbackAutoScroll) : n.touches ? K(document, "touchmove", this._handleFallbackAutoScroll) : K(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(t) {
      var n = t.originalEvent;
      !this.options.dragOverBubble && !n.rootEl && this._handleAutoScroll(n);
    },
    drop: function() {
      this.sortable.nativeDraggable ? X(document, "dragover", this._handleAutoScroll) : (X(document, "pointermove", this._handleFallbackAutoScroll), X(document, "touchmove", this._handleFallbackAutoScroll), X(document, "mousemove", this._handleFallbackAutoScroll)), lr(), Ao(), Bc();
    },
    nulling: function() {
      Wo = Nn = Vt = Rn = Wt = vn = wn = null, ne.length = 0;
    },
    _handleFallbackAutoScroll: function(t) {
      this._handleAutoScroll(t, !0);
    },
    _handleAutoScroll: function(t, n) {
      var i = this, r = (t.touches ? t.touches[0] : t).clientX, s = (t.touches ? t.touches[0] : t).clientY, a = document.elementFromPoint(r, s);
      if (Wo = t, n || this.options.forceAutoScrollFallback || fo || Ge || Zt) {
        yn(t, this.options, a, n);
        var l = tt(a, !0);
        Rn && (!Wt || r !== vn || s !== wn) && (Wt && lr(), Wt = setInterval(function() {
          var c = tt(document.elementFromPoint(r, s), !0);
          c !== l && (l = c, Ao()), yn(t, i.options, c, n);
        }, 10), vn = r, wn = s);
      } else {
        if (!this.options.bubbleScroll || tt(a, !0) === De()) {
          Ao();
          return;
        }
        yn(t, this.options, tt(a, !1), !1);
      }
    }
  }, We(o, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function Ao() {
  ne.forEach(function(o) {
    clearInterval(o.pid);
  }), ne = [];
}
function lr() {
  clearInterval(Wt);
}
var yn = is(function(o, e, t, n) {
  if (e.scroll) {
    var i = (o.touches ? o.touches[0] : o).clientX, r = (o.touches ? o.touches[0] : o).clientY, s = e.scrollSensitivity, a = e.scrollSpeed, l = De(), c = !1, u;
    Nn !== t && (Nn = t, Ao(), Vt = e.scroll, u = e.scrollFn, Vt === !0 && (Vt = tt(t, !0)));
    var d = 0, h = Vt;
    do {
      var f = h, p = se(f), g = p.top, _ = p.bottom, B = p.left, T = p.right, S = p.width, v = p.height, b = void 0, I = void 0, P = f.scrollWidth, C = f.scrollHeight, x = F(f), L = f.scrollLeft, w = f.scrollTop;
      f === l ? (b = S < P && (x.overflowX === "auto" || x.overflowX === "scroll" || x.overflowX === "visible"), I = v < C && (x.overflowY === "auto" || x.overflowY === "scroll" || x.overflowY === "visible")) : (b = S < P && (x.overflowX === "auto" || x.overflowX === "scroll"), I = v < C && (x.overflowY === "auto" || x.overflowY === "scroll"));
      var k = b && (Math.abs(T - i) <= s && L + S < P) - (Math.abs(B - i) <= s && !!L), E = I && (Math.abs(_ - r) <= s && w + v < C) - (Math.abs(g - r) <= s && !!w);
      if (!ne[d])
        for (var M = 0; M <= d; M++)
          ne[M] || (ne[M] = {});
      (ne[d].vx != k || ne[d].vy != E || ne[d].el !== f) && (ne[d].el = f, ne[d].vx = k, ne[d].vy = E, clearInterval(ne[d].pid), (k != 0 || E != 0) && (c = !0, ne[d].pid = setInterval(function() {
        n && this.layer === 0 && H.active._onTouchMove(Wo);
        var A = ne[this.layer].vy ? ne[this.layer].vy * a : 0, N = ne[this.layer].vx ? ne[this.layer].vx * a : 0;
        typeof u == "function" && u.call(H.dragged.parentNode[ye], N, A, o, Wo, ne[this.layer].el) !== "continue" || rs(ne[this.layer].el, N, A);
      }.bind({
        layer: d
      }), 24))), d++;
    } while (e.bubbleScroll && h !== l && (h = tt(h, !1)));
    Rn = c;
  }
}, 30), hs = function(e) {
  var t = e.originalEvent, n = e.putSortable, i = e.dragEl, r = e.activeSortable, s = e.dispatchSortableEvent, a = e.hideGhostForTarget, l = e.unhideGhostForTarget;
  if (t) {
    var c = n || r;
    a();
    var u = t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t, d = document.elementFromPoint(u.clientX, u.clientY);
    l(), c && !c.el.contains(d) && (s("spill"), this.onSpill({
      dragEl: i,
      putSortable: n
    }));
  }
};
function li() {
}
li.prototype = {
  startIndex: null,
  dragStart: function(e) {
    var t = e.oldDraggableIndex;
    this.startIndex = t;
  },
  onSpill: function(e) {
    var t = e.dragEl, n = e.putSortable;
    this.sortable.captureAnimationState(), n && n.captureAnimationState();
    var i = Dt(this.sortable.el, this.startIndex, this.options);
    i ? this.sortable.el.insertBefore(t, i) : this.sortable.el.appendChild(t), this.sortable.animateAll(), n && n.animateAll();
  },
  drop: hs
};
We(li, {
  pluginName: "revertOnSpill"
});
function ci() {
}
ci.prototype = {
  onSpill: function(e) {
    var t = e.dragEl, n = e.putSortable, i = n || this.sortable;
    i.captureAnimationState(), t.parentNode && t.parentNode.removeChild(t), i.animateAll();
  },
  drop: hs
};
We(ci, {
  pluginName: "removeOnSpill"
});
H.mount(new Wc());
H.mount(ci, li);
function Yc() {
  return {
    $template: "#title-input"
  };
}
function Xc() {
  return {
    $template: "#content-input"
  };
}
function ps(o, e) {
  return function() {
    return o.apply(e, arguments);
  };
}
const { toString: Kc } = Object.prototype, { getPrototypeOf: di } = Object, en = ((o) => (e) => {
  const t = Kc.call(e);
  return o[t] || (o[t] = t.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), je = (o) => (o = o.toLowerCase(), (e) => en(e) === o), tn = (o) => (e) => typeof e === o, { isArray: Ht } = Array, co = tn("undefined");
function qc(o) {
  return o !== null && !co(o) && o.constructor !== null && !co(o.constructor) && Ce(o.constructor.isBuffer) && o.constructor.isBuffer(o);
}
const fs = je("ArrayBuffer");
function Gc(o) {
  let e;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? e = ArrayBuffer.isView(o) : e = o && o.buffer && fs(o.buffer), e;
}
const Zc = tn("string"), Ce = tn("function"), gs = tn("number"), on = (o) => o !== null && typeof o == "object", Jc = (o) => o === !0 || o === !1, Mo = (o) => {
  if (en(o) !== "object")
    return !1;
  const e = di(o);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in o) && !(Symbol.iterator in o);
}, Qc = je("Date"), ed = je("File"), td = je("Blob"), od = je("FileList"), nd = (o) => on(o) && Ce(o.pipe), id = (o) => {
  let e;
  return o && (typeof FormData == "function" && o instanceof FormData || Ce(o.append) && ((e = en(o)) === "formdata" || // detect form-data instance
  e === "object" && Ce(o.toString) && o.toString() === "[object FormData]"));
}, rd = je("URLSearchParams"), sd = (o) => o.trim ? o.trim() : o.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function mo(o, e, { allOwnKeys: t = !1 } = {}) {
  if (o === null || typeof o > "u")
    return;
  let n, i;
  if (typeof o != "object" && (o = [o]), Ht(o))
    for (n = 0, i = o.length; n < i; n++)
      e.call(null, o[n], n, o);
  else {
    const r = t ? Object.getOwnPropertyNames(o) : Object.keys(o), s = r.length;
    let a;
    for (n = 0; n < s; n++)
      a = r[n], e.call(null, o[a], a, o);
  }
}
function ms(o, e) {
  e = e.toLowerCase();
  const t = Object.keys(o);
  let n = t.length, i;
  for (; n-- > 0; )
    if (i = t[n], e === i.toLowerCase())
      return i;
  return null;
}
const bs = (() => typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global)(), vs = (o) => !co(o) && o !== bs;
function Dn() {
  const { caseless: o } = vs(this) && this || {}, e = {}, t = (n, i) => {
    const r = o && ms(e, i) || i;
    Mo(e[r]) && Mo(n) ? e[r] = Dn(e[r], n) : Mo(n) ? e[r] = Dn({}, n) : Ht(n) ? e[r] = n.slice() : e[r] = n;
  };
  for (let n = 0, i = arguments.length; n < i; n++)
    arguments[n] && mo(arguments[n], t);
  return e;
}
const ad = (o, e, t, { allOwnKeys: n } = {}) => (mo(e, (i, r) => {
  t && Ce(i) ? o[r] = ps(i, t) : o[r] = i;
}, { allOwnKeys: n }), o), ld = (o) => (o.charCodeAt(0) === 65279 && (o = o.slice(1)), o), cd = (o, e, t, n) => {
  o.prototype = Object.create(e.prototype, n), o.prototype.constructor = o, Object.defineProperty(o, "super", {
    value: e.prototype
  }), t && Object.assign(o.prototype, t);
}, dd = (o, e, t, n) => {
  let i, r, s;
  const a = {};
  if (e = e || {}, o == null)
    return e;
  do {
    for (i = Object.getOwnPropertyNames(o), r = i.length; r-- > 0; )
      s = i[r], (!n || n(s, o, e)) && !a[s] && (e[s] = o[s], a[s] = !0);
    o = t !== !1 && di(o);
  } while (o && (!t || t(o, e)) && o !== Object.prototype);
  return e;
}, ud = (o, e, t) => {
  o = String(o), (t === void 0 || t > o.length) && (t = o.length), t -= e.length;
  const n = o.indexOf(e, t);
  return n !== -1 && n === t;
}, hd = (o) => {
  if (!o)
    return null;
  if (Ht(o))
    return o;
  let e = o.length;
  if (!gs(e))
    return null;
  const t = new Array(e);
  for (; e-- > 0; )
    t[e] = o[e];
  return t;
}, pd = ((o) => (e) => o && e instanceof o)(typeof Uint8Array < "u" && di(Uint8Array)), fd = (o, e) => {
  const n = (o && o[Symbol.iterator]).call(o);
  let i;
  for (; (i = n.next()) && !i.done; ) {
    const r = i.value;
    e.call(o, r[0], r[1]);
  }
}, gd = (o, e) => {
  let t;
  const n = [];
  for (; (t = o.exec(e)) !== null; )
    n.push(t);
  return n;
}, md = je("HTMLFormElement"), bd = (o) => o.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(t, n, i) {
    return n.toUpperCase() + i;
  }
), cr = (({ hasOwnProperty: o }) => (e, t) => o.call(e, t))(Object.prototype), vd = je("RegExp"), ws = (o, e) => {
  const t = Object.getOwnPropertyDescriptors(o), n = {};
  mo(t, (i, r) => {
    let s;
    (s = e(i, r, o)) !== !1 && (n[r] = s || i);
  }), Object.defineProperties(o, n);
}, wd = (o) => {
  ws(o, (e, t) => {
    if (Ce(o) && ["arguments", "caller", "callee"].indexOf(t) !== -1)
      return !1;
    const n = o[t];
    if (Ce(n)) {
      if (e.enumerable = !1, "writable" in e) {
        e.writable = !1;
        return;
      }
      e.set || (e.set = () => {
        throw Error("Can not rewrite read-only method '" + t + "'");
      });
    }
  });
}, yd = (o, e) => {
  const t = {}, n = (i) => {
    i.forEach((r) => {
      t[r] = !0;
    });
  };
  return Ht(o) ? n(o) : n(String(o).split(e)), t;
}, kd = () => {
}, xd = (o, e) => (o = +o, Number.isFinite(o) ? o : e), kn = "abcdefghijklmnopqrstuvwxyz", dr = "0123456789", ys = {
  DIGIT: dr,
  ALPHA: kn,
  ALPHA_DIGIT: kn + kn.toUpperCase() + dr
}, Ed = (o = 16, e = ys.ALPHA_DIGIT) => {
  let t = "";
  const { length: n } = e;
  for (; o--; )
    t += e[Math.random() * n | 0];
  return t;
};
function Sd(o) {
  return !!(o && Ce(o.append) && o[Symbol.toStringTag] === "FormData" && o[Symbol.iterator]);
}
const Cd = (o) => {
  const e = new Array(10), t = (n, i) => {
    if (on(n)) {
      if (e.indexOf(n) >= 0)
        return;
      if (!("toJSON" in n)) {
        e[i] = n;
        const r = Ht(n) ? [] : {};
        return mo(n, (s, a) => {
          const l = t(s, i + 1);
          !co(l) && (r[a] = l);
        }), e[i] = void 0, r;
      }
    }
    return n;
  };
  return t(o, 0);
}, Td = je("AsyncFunction"), Bd = (o) => o && (on(o) || Ce(o)) && Ce(o.then) && Ce(o.catch), y = {
  isArray: Ht,
  isArrayBuffer: fs,
  isBuffer: qc,
  isFormData: id,
  isArrayBufferView: Gc,
  isString: Zc,
  isNumber: gs,
  isBoolean: Jc,
  isObject: on,
  isPlainObject: Mo,
  isUndefined: co,
  isDate: Qc,
  isFile: ed,
  isBlob: td,
  isRegExp: vd,
  isFunction: Ce,
  isStream: nd,
  isURLSearchParams: rd,
  isTypedArray: pd,
  isFileList: od,
  forEach: mo,
  merge: Dn,
  extend: ad,
  trim: sd,
  stripBOM: ld,
  inherits: cd,
  toFlatObject: dd,
  kindOf: en,
  kindOfTest: je,
  endsWith: ud,
  toArray: hd,
  forEachEntry: fd,
  matchAll: gd,
  isHTMLForm: md,
  hasOwnProperty: cr,
  hasOwnProp: cr,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: ws,
  freezeMethods: wd,
  toObjectSet: yd,
  toCamelCase: bd,
  noop: kd,
  toFiniteNumber: xd,
  findKey: ms,
  global: bs,
  isContextDefined: vs,
  ALPHABET: ys,
  generateString: Ed,
  isSpecCompliantForm: Sd,
  toJSONObject: Cd,
  isAsyncFn: Td,
  isThenable: Bd
};
function Y(o, e, t, n, i) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = o, this.name = "AxiosError", e && (this.code = e), t && (this.config = t), n && (this.request = n), i && (this.response = i);
}
y.inherits(Y, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: y.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const ks = Y.prototype, xs = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((o) => {
  xs[o] = { value: o };
});
Object.defineProperties(Y, xs);
Object.defineProperty(ks, "isAxiosError", { value: !0 });
Y.from = (o, e, t, n, i, r) => {
  const s = Object.create(ks);
  return y.toFlatObject(o, s, function(l) {
    return l !== Error.prototype;
  }, (a) => a !== "isAxiosError"), Y.call(s, o.message, e, t, n, i), s.cause = o, s.name = o.name, r && Object.assign(s, r), s;
};
const _d = null;
function Pn(o) {
  return y.isPlainObject(o) || y.isArray(o);
}
function Es(o) {
  return y.endsWith(o, "[]") ? o.slice(0, -2) : o;
}
function ur(o, e, t) {
  return o ? o.concat(e).map(function(i, r) {
    return i = Es(i), !t && r ? "[" + i + "]" : i;
  }).join(t ? "." : "") : e;
}
function Od(o) {
  return y.isArray(o) && !o.some(Pn);
}
const Id = y.toFlatObject(y, {}, null, function(e) {
  return /^is[A-Z]/.test(e);
});
function nn(o, e, t) {
  if (!y.isObject(o))
    throw new TypeError("target must be an object");
  e = e || new FormData(), t = y.toFlatObject(t, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(g, _) {
    return !y.isUndefined(_[g]);
  });
  const n = t.metaTokens, i = t.visitor || u, r = t.dots, s = t.indexes, l = (t.Blob || typeof Blob < "u" && Blob) && y.isSpecCompliantForm(e);
  if (!y.isFunction(i))
    throw new TypeError("visitor must be a function");
  function c(p) {
    if (p === null)
      return "";
    if (y.isDate(p))
      return p.toISOString();
    if (!l && y.isBlob(p))
      throw new Y("Blob is not supported. Use a Buffer instead.");
    return y.isArrayBuffer(p) || y.isTypedArray(p) ? l && typeof Blob == "function" ? new Blob([p]) : Buffer.from(p) : p;
  }
  function u(p, g, _) {
    let B = p;
    if (p && !_ && typeof p == "object") {
      if (y.endsWith(g, "{}"))
        g = n ? g : g.slice(0, -2), p = JSON.stringify(p);
      else if (y.isArray(p) && Od(p) || (y.isFileList(p) || y.endsWith(g, "[]")) && (B = y.toArray(p)))
        return g = Es(g), B.forEach(function(S, v) {
          !(y.isUndefined(S) || S === null) && e.append(
            // eslint-disable-next-line no-nested-ternary
            s === !0 ? ur([g], v, r) : s === null ? g : g + "[]",
            c(S)
          );
        }), !1;
    }
    return Pn(p) ? !0 : (e.append(ur(_, g, r), c(p)), !1);
  }
  const d = [], h = Object.assign(Id, {
    defaultVisitor: u,
    convertValue: c,
    isVisitable: Pn
  });
  function f(p, g) {
    if (!y.isUndefined(p)) {
      if (d.indexOf(p) !== -1)
        throw Error("Circular reference detected in " + g.join("."));
      d.push(p), y.forEach(p, function(B, T) {
        (!(y.isUndefined(B) || B === null) && i.call(
          e,
          B,
          y.isString(T) ? T.trim() : T,
          g,
          h
        )) === !0 && f(B, g ? g.concat(T) : [T]);
      }), d.pop();
    }
  }
  if (!y.isObject(o))
    throw new TypeError("data must be an object");
  return f(o), e;
}
function hr(o) {
  const e = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(o).replace(/[!'()~]|%20|%00/g, function(n) {
    return e[n];
  });
}
function ui(o, e) {
  this._pairs = [], o && nn(o, this, e);
}
const Ss = ui.prototype;
Ss.append = function(e, t) {
  this._pairs.push([e, t]);
};
Ss.toString = function(e) {
  const t = e ? function(n) {
    return e.call(this, n, hr);
  } : hr;
  return this._pairs.map(function(i) {
    return t(i[0]) + "=" + t(i[1]);
  }, "").join("&");
};
function Ad(o) {
  return encodeURIComponent(o).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Cs(o, e, t) {
  if (!e)
    return o;
  const n = t && t.encode || Ad, i = t && t.serialize;
  let r;
  if (i ? r = i(e, t) : r = y.isURLSearchParams(e) ? e.toString() : new ui(e, t).toString(n), r) {
    const s = o.indexOf("#");
    s !== -1 && (o = o.slice(0, s)), o += (o.indexOf("?") === -1 ? "?" : "&") + r;
  }
  return o;
}
class Md {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(e, t, n) {
    return this.handlers.push({
      fulfilled: e,
      rejected: t,
      synchronous: n ? n.synchronous : !1,
      runWhen: n ? n.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(e) {
    this.handlers[e] && (this.handlers[e] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(e) {
    y.forEach(this.handlers, function(n) {
      n !== null && e(n);
    });
  }
}
const pr = Md, Ts = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Ld = typeof URLSearchParams < "u" ? URLSearchParams : ui, Nd = typeof FormData < "u" ? FormData : null, Rd = typeof Blob < "u" ? Blob : null, Dd = (() => {
  let o;
  return typeof navigator < "u" && ((o = navigator.product) === "ReactNative" || o === "NativeScript" || o === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), Pd = (() => typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function")(), Re = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Ld,
    FormData: Nd,
    Blob: Rd
  },
  isStandardBrowserEnv: Dd,
  isStandardBrowserWebWorkerEnv: Pd,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function Fd(o, e) {
  return nn(o, new Re.classes.URLSearchParams(), Object.assign({
    visitor: function(t, n, i, r) {
      return Re.isNode && y.isBuffer(t) ? (this.append(n, t.toString("base64")), !1) : r.defaultVisitor.apply(this, arguments);
    }
  }, e));
}
function Hd(o) {
  return y.matchAll(/\w+|\[(\w*)]/g, o).map((e) => e[0] === "[]" ? "" : e[1] || e[0]);
}
function jd(o) {
  const e = {}, t = Object.keys(o);
  let n;
  const i = t.length;
  let r;
  for (n = 0; n < i; n++)
    r = t[n], e[r] = o[r];
  return e;
}
function Bs(o) {
  function e(t, n, i, r) {
    let s = t[r++];
    const a = Number.isFinite(+s), l = r >= t.length;
    return s = !s && y.isArray(i) ? i.length : s, l ? (y.hasOwnProp(i, s) ? i[s] = [i[s], n] : i[s] = n, !a) : ((!i[s] || !y.isObject(i[s])) && (i[s] = []), e(t, n, i[s], r) && y.isArray(i[s]) && (i[s] = jd(i[s])), !a);
  }
  if (y.isFormData(o) && y.isFunction(o.entries)) {
    const t = {};
    return y.forEachEntry(o, (n, i) => {
      e(Hd(n), i, t, 0);
    }), t;
  }
  return null;
}
function Ud(o, e, t) {
  if (y.isString(o))
    try {
      return (e || JSON.parse)(o), y.trim(o);
    } catch (n) {
      if (n.name !== "SyntaxError")
        throw n;
    }
  return (t || JSON.stringify)(o);
}
const hi = {
  transitional: Ts,
  adapter: ["xhr", "http"],
  transformRequest: [function(e, t) {
    const n = t.getContentType() || "", i = n.indexOf("application/json") > -1, r = y.isObject(e);
    if (r && y.isHTMLForm(e) && (e = new FormData(e)), y.isFormData(e))
      return i && i ? JSON.stringify(Bs(e)) : e;
    if (y.isArrayBuffer(e) || y.isBuffer(e) || y.isStream(e) || y.isFile(e) || y.isBlob(e))
      return e;
    if (y.isArrayBufferView(e))
      return e.buffer;
    if (y.isURLSearchParams(e))
      return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
    let a;
    if (r) {
      if (n.indexOf("application/x-www-form-urlencoded") > -1)
        return Fd(e, this.formSerializer).toString();
      if ((a = y.isFileList(e)) || n.indexOf("multipart/form-data") > -1) {
        const l = this.env && this.env.FormData;
        return nn(
          a ? { "files[]": e } : e,
          l && new l(),
          this.formSerializer
        );
      }
    }
    return r || i ? (t.setContentType("application/json", !1), Ud(e)) : e;
  }],
  transformResponse: [function(e) {
    const t = this.transitional || hi.transitional, n = t && t.forcedJSONParsing, i = this.responseType === "json";
    if (e && y.isString(e) && (n && !this.responseType || i)) {
      const s = !(t && t.silentJSONParsing) && i;
      try {
        return JSON.parse(e);
      } catch (a) {
        if (s)
          throw a.name === "SyntaxError" ? Y.from(a, Y.ERR_BAD_RESPONSE, this, null, this.response) : a;
      }
    }
    return e;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: Re.classes.FormData,
    Blob: Re.classes.Blob
  },
  validateStatus: function(e) {
    return e >= 200 && e < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
y.forEach(["delete", "get", "head", "post", "put", "patch"], (o) => {
  hi.headers[o] = {};
});
const pi = hi, zd = y.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), $d = (o) => {
  const e = {};
  let t, n, i;
  return o && o.split(`
`).forEach(function(s) {
    i = s.indexOf(":"), t = s.substring(0, i).trim().toLowerCase(), n = s.substring(i + 1).trim(), !(!t || e[t] && zd[t]) && (t === "set-cookie" ? e[t] ? e[t].push(n) : e[t] = [n] : e[t] = e[t] ? e[t] + ", " + n : n);
  }), e;
}, fr = Symbol("internals");
function zt(o) {
  return o && String(o).trim().toLowerCase();
}
function Lo(o) {
  return o === !1 || o == null ? o : y.isArray(o) ? o.map(Lo) : String(o);
}
function Vd(o) {
  const e = /* @__PURE__ */ Object.create(null), t = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; n = t.exec(o); )
    e[n[1]] = n[2];
  return e;
}
const Wd = (o) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(o.trim());
function xn(o, e, t, n, i) {
  if (y.isFunction(n))
    return n.call(this, e, t);
  if (i && (e = t), !!y.isString(e)) {
    if (y.isString(n))
      return e.indexOf(n) !== -1;
    if (y.isRegExp(n))
      return n.test(e);
  }
}
function Yd(o) {
  return o.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (e, t, n) => t.toUpperCase() + n);
}
function Xd(o, e) {
  const t = y.toCamelCase(" " + e);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(o, n + t, {
      value: function(i, r, s) {
        return this[n].call(this, e, i, r, s);
      },
      configurable: !0
    });
  });
}
class rn {
  constructor(e) {
    e && this.set(e);
  }
  set(e, t, n) {
    const i = this;
    function r(a, l, c) {
      const u = zt(l);
      if (!u)
        throw new Error("header name must be a non-empty string");
      const d = y.findKey(i, u);
      (!d || i[d] === void 0 || c === !0 || c === void 0 && i[d] !== !1) && (i[d || l] = Lo(a));
    }
    const s = (a, l) => y.forEach(a, (c, u) => r(c, u, l));
    return y.isPlainObject(e) || e instanceof this.constructor ? s(e, t) : y.isString(e) && (e = e.trim()) && !Wd(e) ? s($d(e), t) : e != null && r(t, e, n), this;
  }
  get(e, t) {
    if (e = zt(e), e) {
      const n = y.findKey(this, e);
      if (n) {
        const i = this[n];
        if (!t)
          return i;
        if (t === !0)
          return Vd(i);
        if (y.isFunction(t))
          return t.call(this, i, n);
        if (y.isRegExp(t))
          return t.exec(i);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(e, t) {
    if (e = zt(e), e) {
      const n = y.findKey(this, e);
      return !!(n && this[n] !== void 0 && (!t || xn(this, this[n], n, t)));
    }
    return !1;
  }
  delete(e, t) {
    const n = this;
    let i = !1;
    function r(s) {
      if (s = zt(s), s) {
        const a = y.findKey(n, s);
        a && (!t || xn(n, n[a], a, t)) && (delete n[a], i = !0);
      }
    }
    return y.isArray(e) ? e.forEach(r) : r(e), i;
  }
  clear(e) {
    const t = Object.keys(this);
    let n = t.length, i = !1;
    for (; n--; ) {
      const r = t[n];
      (!e || xn(this, this[r], r, e, !0)) && (delete this[r], i = !0);
    }
    return i;
  }
  normalize(e) {
    const t = this, n = {};
    return y.forEach(this, (i, r) => {
      const s = y.findKey(n, r);
      if (s) {
        t[s] = Lo(i), delete t[r];
        return;
      }
      const a = e ? Yd(r) : String(r).trim();
      a !== r && delete t[r], t[a] = Lo(i), n[a] = !0;
    }), this;
  }
  concat(...e) {
    return this.constructor.concat(this, ...e);
  }
  toJSON(e) {
    const t = /* @__PURE__ */ Object.create(null);
    return y.forEach(this, (n, i) => {
      n != null && n !== !1 && (t[i] = e && y.isArray(n) ? n.join(", ") : n);
    }), t;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([e, t]) => e + ": " + t).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(e) {
    return e instanceof this ? e : new this(e);
  }
  static concat(e, ...t) {
    const n = new this(e);
    return t.forEach((i) => n.set(i)), n;
  }
  static accessor(e) {
    const n = (this[fr] = this[fr] = {
      accessors: {}
    }).accessors, i = this.prototype;
    function r(s) {
      const a = zt(s);
      n[a] || (Xd(i, s), n[a] = !0);
    }
    return y.isArray(e) ? e.forEach(r) : r(e), this;
  }
}
rn.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
y.reduceDescriptors(rn.prototype, ({ value: o }, e) => {
  let t = e[0].toUpperCase() + e.slice(1);
  return {
    get: () => o,
    set(n) {
      this[t] = n;
    }
  };
});
y.freezeMethods(rn);
const Ve = rn;
function En(o, e) {
  const t = this || pi, n = e || t, i = Ve.from(n.headers);
  let r = n.data;
  return y.forEach(o, function(a) {
    r = a.call(t, r, i.normalize(), e ? e.status : void 0);
  }), i.normalize(), r;
}
function _s(o) {
  return !!(o && o.__CANCEL__);
}
function bo(o, e, t) {
  Y.call(this, o ?? "canceled", Y.ERR_CANCELED, e, t), this.name = "CanceledError";
}
y.inherits(bo, Y, {
  __CANCEL__: !0
});
function Kd(o, e, t) {
  const n = t.config.validateStatus;
  !t.status || !n || n(t.status) ? o(t) : e(new Y(
    "Request failed with status code " + t.status,
    [Y.ERR_BAD_REQUEST, Y.ERR_BAD_RESPONSE][Math.floor(t.status / 100) - 4],
    t.config,
    t.request,
    t
  ));
}
const qd = Re.isStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  function() {
    return {
      write: function(t, n, i, r, s, a) {
        const l = [];
        l.push(t + "=" + encodeURIComponent(n)), y.isNumber(i) && l.push("expires=" + new Date(i).toGMTString()), y.isString(r) && l.push("path=" + r), y.isString(s) && l.push("domain=" + s), a === !0 && l.push("secure"), document.cookie = l.join("; ");
      },
      read: function(t) {
        const n = document.cookie.match(new RegExp("(^|;\\s*)(" + t + ")=([^;]*)"));
        return n ? decodeURIComponent(n[3]) : null;
      },
      remove: function(t) {
        this.write(t, "", Date.now() - 864e5);
      }
    };
  }()
) : (
  // Non standard browser env (web workers, react-native) lack needed support.
  function() {
    return {
      write: function() {
      },
      read: function() {
        return null;
      },
      remove: function() {
      }
    };
  }()
);
function Gd(o) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(o);
}
function Zd(o, e) {
  return e ? o.replace(/\/+$/, "") + "/" + e.replace(/^\/+/, "") : o;
}
function Os(o, e) {
  return o && !Gd(e) ? Zd(o, e) : e;
}
const Jd = Re.isStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const e = /(msie|trident)/i.test(navigator.userAgent), t = document.createElement("a");
    let n;
    function i(r) {
      let s = r;
      return e && (t.setAttribute("href", s), s = t.href), t.setAttribute("href", s), {
        href: t.href,
        protocol: t.protocol ? t.protocol.replace(/:$/, "") : "",
        host: t.host,
        search: t.search ? t.search.replace(/^\?/, "") : "",
        hash: t.hash ? t.hash.replace(/^#/, "") : "",
        hostname: t.hostname,
        port: t.port,
        pathname: t.pathname.charAt(0) === "/" ? t.pathname : "/" + t.pathname
      };
    }
    return n = i(window.location.href), function(s) {
      const a = y.isString(s) ? i(s) : s;
      return a.protocol === n.protocol && a.host === n.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  function() {
    return function() {
      return !0;
    };
  }()
);
function Qd(o) {
  const e = /^([-+\w]{1,25})(:?\/\/|:)/.exec(o);
  return e && e[1] || "";
}
function eu(o, e) {
  o = o || 10;
  const t = new Array(o), n = new Array(o);
  let i = 0, r = 0, s;
  return e = e !== void 0 ? e : 1e3, function(l) {
    const c = Date.now(), u = n[r];
    s || (s = c), t[i] = l, n[i] = c;
    let d = r, h = 0;
    for (; d !== i; )
      h += t[d++], d = d % o;
    if (i = (i + 1) % o, i === r && (r = (r + 1) % o), c - s < e)
      return;
    const f = u && c - u;
    return f ? Math.round(h * 1e3 / f) : void 0;
  };
}
function gr(o, e) {
  let t = 0;
  const n = eu(50, 250);
  return (i) => {
    const r = i.loaded, s = i.lengthComputable ? i.total : void 0, a = r - t, l = n(a), c = r <= s;
    t = r;
    const u = {
      loaded: r,
      total: s,
      progress: s ? r / s : void 0,
      bytes: a,
      rate: l || void 0,
      estimated: l && s && c ? (s - r) / l : void 0,
      event: i
    };
    u[e ? "download" : "upload"] = !0, o(u);
  };
}
const tu = typeof XMLHttpRequest < "u", ou = tu && function(o) {
  return new Promise(function(t, n) {
    let i = o.data;
    const r = Ve.from(o.headers).normalize(), s = o.responseType;
    let a;
    function l() {
      o.cancelToken && o.cancelToken.unsubscribe(a), o.signal && o.signal.removeEventListener("abort", a);
    }
    let c;
    y.isFormData(i) && (Re.isStandardBrowserEnv || Re.isStandardBrowserWebWorkerEnv ? r.setContentType(!1) : r.getContentType(/^\s*multipart\/form-data/) ? y.isString(c = r.getContentType()) && r.setContentType(c.replace(/^\s*(multipart\/form-data);+/, "$1")) : r.setContentType("multipart/form-data"));
    let u = new XMLHttpRequest();
    if (o.auth) {
      const p = o.auth.username || "", g = o.auth.password ? unescape(encodeURIComponent(o.auth.password)) : "";
      r.set("Authorization", "Basic " + btoa(p + ":" + g));
    }
    const d = Os(o.baseURL, o.url);
    u.open(o.method.toUpperCase(), Cs(d, o.params, o.paramsSerializer), !0), u.timeout = o.timeout;
    function h() {
      if (!u)
        return;
      const p = Ve.from(
        "getAllResponseHeaders" in u && u.getAllResponseHeaders()
      ), _ = {
        data: !s || s === "text" || s === "json" ? u.responseText : u.response,
        status: u.status,
        statusText: u.statusText,
        headers: p,
        config: o,
        request: u
      };
      Kd(function(T) {
        t(T), l();
      }, function(T) {
        n(T), l();
      }, _), u = null;
    }
    if ("onloadend" in u ? u.onloadend = h : u.onreadystatechange = function() {
      !u || u.readyState !== 4 || u.status === 0 && !(u.responseURL && u.responseURL.indexOf("file:") === 0) || setTimeout(h);
    }, u.onabort = function() {
      u && (n(new Y("Request aborted", Y.ECONNABORTED, o, u)), u = null);
    }, u.onerror = function() {
      n(new Y("Network Error", Y.ERR_NETWORK, o, u)), u = null;
    }, u.ontimeout = function() {
      let g = o.timeout ? "timeout of " + o.timeout + "ms exceeded" : "timeout exceeded";
      const _ = o.transitional || Ts;
      o.timeoutErrorMessage && (g = o.timeoutErrorMessage), n(new Y(
        g,
        _.clarifyTimeoutError ? Y.ETIMEDOUT : Y.ECONNABORTED,
        o,
        u
      )), u = null;
    }, Re.isStandardBrowserEnv) {
      const p = (o.withCredentials || Jd(d)) && o.xsrfCookieName && qd.read(o.xsrfCookieName);
      p && r.set(o.xsrfHeaderName, p);
    }
    i === void 0 && r.setContentType(null), "setRequestHeader" in u && y.forEach(r.toJSON(), function(g, _) {
      u.setRequestHeader(_, g);
    }), y.isUndefined(o.withCredentials) || (u.withCredentials = !!o.withCredentials), s && s !== "json" && (u.responseType = o.responseType), typeof o.onDownloadProgress == "function" && u.addEventListener("progress", gr(o.onDownloadProgress, !0)), typeof o.onUploadProgress == "function" && u.upload && u.upload.addEventListener("progress", gr(o.onUploadProgress)), (o.cancelToken || o.signal) && (a = (p) => {
      u && (n(!p || p.type ? new bo(null, o, u) : p), u.abort(), u = null);
    }, o.cancelToken && o.cancelToken.subscribe(a), o.signal && (o.signal.aborted ? a() : o.signal.addEventListener("abort", a)));
    const f = Qd(d);
    if (f && Re.protocols.indexOf(f) === -1) {
      n(new Y("Unsupported protocol " + f + ":", Y.ERR_BAD_REQUEST, o));
      return;
    }
    u.send(i || null);
  });
}, Fn = {
  http: _d,
  xhr: ou
};
y.forEach(Fn, (o, e) => {
  if (o) {
    try {
      Object.defineProperty(o, "name", { value: e });
    } catch {
    }
    Object.defineProperty(o, "adapterName", { value: e });
  }
});
const mr = (o) => `- ${o}`, nu = (o) => y.isFunction(o) || o === null || o === !1, Is = {
  getAdapter: (o) => {
    o = y.isArray(o) ? o : [o];
    const { length: e } = o;
    let t, n;
    const i = {};
    for (let r = 0; r < e; r++) {
      t = o[r];
      let s;
      if (n = t, !nu(t) && (n = Fn[(s = String(t)).toLowerCase()], n === void 0))
        throw new Y(`Unknown adapter '${s}'`);
      if (n)
        break;
      i[s || "#" + r] = n;
    }
    if (!n) {
      const r = Object.entries(i).map(
        ([a, l]) => `adapter ${a} ` + (l === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let s = e ? r.length > 1 ? `since :
` + r.map(mr).join(`
`) : " " + mr(r[0]) : "as no adapter specified";
      throw new Y(
        "There is no suitable adapter to dispatch the request " + s,
        "ERR_NOT_SUPPORT"
      );
    }
    return n;
  },
  adapters: Fn
};
function Sn(o) {
  if (o.cancelToken && o.cancelToken.throwIfRequested(), o.signal && o.signal.aborted)
    throw new bo(null, o);
}
function br(o) {
  return Sn(o), o.headers = Ve.from(o.headers), o.data = En.call(
    o,
    o.transformRequest
  ), ["post", "put", "patch"].indexOf(o.method) !== -1 && o.headers.setContentType("application/x-www-form-urlencoded", !1), Is.getAdapter(o.adapter || pi.adapter)(o).then(function(n) {
    return Sn(o), n.data = En.call(
      o,
      o.transformResponse,
      n
    ), n.headers = Ve.from(n.headers), n;
  }, function(n) {
    return _s(n) || (Sn(o), n && n.response && (n.response.data = En.call(
      o,
      o.transformResponse,
      n.response
    ), n.response.headers = Ve.from(n.response.headers))), Promise.reject(n);
  });
}
const vr = (o) => o instanceof Ve ? o.toJSON() : o;
function Pt(o, e) {
  e = e || {};
  const t = {};
  function n(c, u, d) {
    return y.isPlainObject(c) && y.isPlainObject(u) ? y.merge.call({ caseless: d }, c, u) : y.isPlainObject(u) ? y.merge({}, u) : y.isArray(u) ? u.slice() : u;
  }
  function i(c, u, d) {
    if (y.isUndefined(u)) {
      if (!y.isUndefined(c))
        return n(void 0, c, d);
    } else
      return n(c, u, d);
  }
  function r(c, u) {
    if (!y.isUndefined(u))
      return n(void 0, u);
  }
  function s(c, u) {
    if (y.isUndefined(u)) {
      if (!y.isUndefined(c))
        return n(void 0, c);
    } else
      return n(void 0, u);
  }
  function a(c, u, d) {
    if (d in e)
      return n(c, u);
    if (d in o)
      return n(void 0, c);
  }
  const l = {
    url: r,
    method: r,
    data: r,
    baseURL: s,
    transformRequest: s,
    transformResponse: s,
    paramsSerializer: s,
    timeout: s,
    timeoutMessage: s,
    withCredentials: s,
    adapter: s,
    responseType: s,
    xsrfCookieName: s,
    xsrfHeaderName: s,
    onUploadProgress: s,
    onDownloadProgress: s,
    decompress: s,
    maxContentLength: s,
    maxBodyLength: s,
    beforeRedirect: s,
    transport: s,
    httpAgent: s,
    httpsAgent: s,
    cancelToken: s,
    socketPath: s,
    responseEncoding: s,
    validateStatus: a,
    headers: (c, u) => i(vr(c), vr(u), !0)
  };
  return y.forEach(Object.keys(Object.assign({}, o, e)), function(u) {
    const d = l[u] || i, h = d(o[u], e[u], u);
    y.isUndefined(h) && d !== a || (t[u] = h);
  }), t;
}
const As = "1.5.1", fi = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((o, e) => {
  fi[o] = function(n) {
    return typeof n === o || "a" + (e < 1 ? "n " : " ") + o;
  };
});
const wr = {};
fi.transitional = function(e, t, n) {
  function i(r, s) {
    return "[Axios v" + As + "] Transitional option '" + r + "'" + s + (n ? ". " + n : "");
  }
  return (r, s, a) => {
    if (e === !1)
      throw new Y(
        i(s, " has been removed" + (t ? " in " + t : "")),
        Y.ERR_DEPRECATED
      );
    return t && !wr[s] && (wr[s] = !0, console.warn(
      i(
        s,
        " has been deprecated since v" + t + " and will be removed in the near future"
      )
    )), e ? e(r, s, a) : !0;
  };
};
function iu(o, e, t) {
  if (typeof o != "object")
    throw new Y("options must be an object", Y.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(o);
  let i = n.length;
  for (; i-- > 0; ) {
    const r = n[i], s = e[r];
    if (s) {
      const a = o[r], l = a === void 0 || s(a, r, o);
      if (l !== !0)
        throw new Y("option " + r + " must be " + l, Y.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (t !== !0)
      throw new Y("Unknown option " + r, Y.ERR_BAD_OPTION);
  }
}
const Hn = {
  assertOptions: iu,
  validators: fi
}, Ze = Hn.validators;
class Yo {
  constructor(e) {
    this.defaults = e, this.interceptors = {
      request: new pr(),
      response: new pr()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(e, t) {
    typeof e == "string" ? (t = t || {}, t.url = e) : t = e || {}, t = Pt(this.defaults, t);
    const { transitional: n, paramsSerializer: i, headers: r } = t;
    n !== void 0 && Hn.assertOptions(n, {
      silentJSONParsing: Ze.transitional(Ze.boolean),
      forcedJSONParsing: Ze.transitional(Ze.boolean),
      clarifyTimeoutError: Ze.transitional(Ze.boolean)
    }, !1), i != null && (y.isFunction(i) ? t.paramsSerializer = {
      serialize: i
    } : Hn.assertOptions(i, {
      encode: Ze.function,
      serialize: Ze.function
    }, !0)), t.method = (t.method || this.defaults.method || "get").toLowerCase();
    let s = r && y.merge(
      r.common,
      r[t.method]
    );
    r && y.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (p) => {
        delete r[p];
      }
    ), t.headers = Ve.concat(s, r);
    const a = [];
    let l = !0;
    this.interceptors.request.forEach(function(g) {
      typeof g.runWhen == "function" && g.runWhen(t) === !1 || (l = l && g.synchronous, a.unshift(g.fulfilled, g.rejected));
    });
    const c = [];
    this.interceptors.response.forEach(function(g) {
      c.push(g.fulfilled, g.rejected);
    });
    let u, d = 0, h;
    if (!l) {
      const p = [br.bind(this), void 0];
      for (p.unshift.apply(p, a), p.push.apply(p, c), h = p.length, u = Promise.resolve(t); d < h; )
        u = u.then(p[d++], p[d++]);
      return u;
    }
    h = a.length;
    let f = t;
    for (d = 0; d < h; ) {
      const p = a[d++], g = a[d++];
      try {
        f = p(f);
      } catch (_) {
        g.call(this, _);
        break;
      }
    }
    try {
      u = br.call(this, f);
    } catch (p) {
      return Promise.reject(p);
    }
    for (d = 0, h = c.length; d < h; )
      u = u.then(c[d++], c[d++]);
    return u;
  }
  getUri(e) {
    e = Pt(this.defaults, e);
    const t = Os(e.baseURL, e.url);
    return Cs(t, e.params, e.paramsSerializer);
  }
}
y.forEach(["delete", "get", "head", "options"], function(e) {
  Yo.prototype[e] = function(t, n) {
    return this.request(Pt(n || {}, {
      method: e,
      url: t,
      data: (n || {}).data
    }));
  };
});
y.forEach(["post", "put", "patch"], function(e) {
  function t(n) {
    return function(r, s, a) {
      return this.request(Pt(a || {}, {
        method: e,
        headers: n ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: r,
        data: s
      }));
    };
  }
  Yo.prototype[e] = t(), Yo.prototype[e + "Form"] = t(!0);
});
const No = Yo;
class gi {
  constructor(e) {
    if (typeof e != "function")
      throw new TypeError("executor must be a function.");
    let t;
    this.promise = new Promise(function(r) {
      t = r;
    });
    const n = this;
    this.promise.then((i) => {
      if (!n._listeners)
        return;
      let r = n._listeners.length;
      for (; r-- > 0; )
        n._listeners[r](i);
      n._listeners = null;
    }), this.promise.then = (i) => {
      let r;
      const s = new Promise((a) => {
        n.subscribe(a), r = a;
      }).then(i);
      return s.cancel = function() {
        n.unsubscribe(r);
      }, s;
    }, e(function(r, s, a) {
      n.reason || (n.reason = new bo(r, s, a), t(n.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(e) {
    if (this.reason) {
      e(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(e) : this._listeners = [e];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(e) {
    if (!this._listeners)
      return;
    const t = this._listeners.indexOf(e);
    t !== -1 && this._listeners.splice(t, 1);
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let e;
    return {
      token: new gi(function(i) {
        e = i;
      }),
      cancel: e
    };
  }
}
const ru = gi;
function su(o) {
  return function(t) {
    return o.apply(null, t);
  };
}
function au(o) {
  return y.isObject(o) && o.isAxiosError === !0;
}
const jn = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(jn).forEach(([o, e]) => {
  jn[e] = o;
});
const lu = jn;
function Ms(o) {
  const e = new No(o), t = ps(No.prototype.request, e);
  return y.extend(t, No.prototype, e, { allOwnKeys: !0 }), y.extend(t, e, null, { allOwnKeys: !0 }), t.create = function(i) {
    return Ms(Pt(o, i));
  }, t;
}
const ie = Ms(pi);
ie.Axios = No;
ie.CanceledError = bo;
ie.CancelToken = ru;
ie.isCancel = _s;
ie.VERSION = As;
ie.toFormData = nn;
ie.AxiosError = Y;
ie.Cancel = ie.CanceledError;
ie.all = function(e) {
  return Promise.all(e);
};
ie.spread = su;
ie.isAxiosError = au;
ie.mergeConfig = Pt;
ie.AxiosHeaders = Ve;
ie.formToJSON = (o) => Bs(y.isHTMLForm(o) ? new FormData(o) : o);
ie.getAdapter = Is.getAdapter;
ie.HttpStatusCode = lu;
ie.default = ie;
const Ls = ie, jt = "https://api.buildoor.xyz", cu = "https://product-tour-dist.vercel.app/tour.css";
async function Ns(o, e) {
  const t = e ?? window.location.origin + window.location.pathname, n = btoa(t), i = await fetch(
    jt + "/tour/url/" + o + "/" + n
  );
  if (i.status !== 200)
    throw console.warn(
      "An error occured while fetching the product tour",
      await i.json()
    ), new Error("An error occured while fetching the product tour");
  const r = await i.json();
  return r.length === 0 && !t.endsWith("/") ? Ns(o, t + "/") : r[0];
}
async function du(o) {
  const e = await fetch(jt + "/tour/" + o);
  if (e.status !== 200)
    throw console.warn(
      "An error occured while updating steps",
      await e.json()
    ), new Error("An error occured while updating steps");
  return (await e.json())[0].steps;
}
async function uu(o, e, t) {
  const n = await fetch(jt + "/tour/steps/" + e, {
    method: "PATCH",
    headers: {
      Authorization: (D.isWeb3 ? "web3 " : "web2 ") + o,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ steps: t })
  });
  if (n.status !== 200)
    throw console.warn(
      "An error occured while updating steps",
      await n.json()
    ), new Error("An error occured while updating steps");
}
async function Rs(o, e) {
  if (!(!o.target.files || o.target.files.length === 0))
    try {
      const t = new FormData();
      t.set("files", o.target.files[0]), t.set("project_id", D.projectId);
      const n = await Ls.put(jt + "/upload", t, {
        headers: {
          Authorization: (D.isWeb3 ? "web3 " : "web2 ") + D.accessToken
        },
        onUploadProgress(i) {
          if (!i.total)
            return;
          const r = i.loaded / i.total * 100;
          e == null || e(r > 95 ? 95 : r);
        }
      });
      if (n.status !== 200)
        throw console.warn(
          "An error occured while uploading the image",
          n
        ), new Error("An error occured while uploading the image");
      return n;
    } catch (t) {
      console.error(t);
    }
}
function yr() {
  return {
    $template: "#image-input",
    uploadProgress: 0,
    async uploadImage(o) {
      try {
        this.uploadProgress = 0;
        const e = await Rs(o, (t) => {
          this.uploadProgress = t;
        });
        D.newStep.mediaURL = await (e == null ? void 0 : e.data), this.uploadProgress = 0;
      } catch (e) {
        console.error(e), this.uploadProgress = 0;
      }
    },
    addImageStep() {
      !D.newStep.mediaURL || !D.newStep.title || (D.newStep.content += `<br /><img src="${D.newStep.mediaURL}" style="width: 100%; margin-top: 1rem;" />`, D.addNewStep());
    }
  };
}
function kr() {
  return {
    $template: "#video-input",
    uploadProgress: 0,
    async uploadVideo(o) {
      try {
        this.uploadProgress = 0;
        const e = await Rs(o, (t) => {
          this.uploadProgress = t;
        });
        D.newStep.mediaURL = await (e == null ? void 0 : e.data), this.uploadProgress = 0;
      } catch (e) {
        console.error(e), this.uploadProgress = 0;
      }
    },
    addVideoStep() {
      !D.newStep.mediaURL || !D.newStep.title || (D.newStep.content += `
              <br />
              <video style="width: 100%; margin-top: 1rem" autoplay controls muted>
                <source src="${D.newStep.mediaURL}" type="video/mp4">
                Your browser does not support the video tag.
              </video>
          `, D.addNewStep());
    }
  };
}
function hu() {
  return {
    $template: "#banner-input"
  };
}
function pu() {
  return {
    $template: "#position-input"
  };
}
var fu = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function sn(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
function Cn() {
}
Object.assign(Cn, {
  default: Cn,
  register: Cn,
  revert: function() {
  },
  __esModule: !0
});
Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(o) {
  const e = (this.document || this.ownerDocument).querySelectorAll(o);
  let t = e.length;
  for (; --t >= 0 && e.item(t) !== this; )
    ;
  return t > -1;
});
Element.prototype.closest || (Element.prototype.closest = function(o) {
  let e = this;
  if (!document.documentElement.contains(e))
    return null;
  do {
    if (e.matches(o))
      return e;
    e = e.parentElement || e.parentNode;
  } while (e !== null);
  return null;
});
Element.prototype.prepend || (Element.prototype.prepend = function(o) {
  const e = document.createDocumentFragment();
  Array.isArray(o) || (o = [o]), o.forEach((t) => {
    const n = t instanceof Node;
    e.appendChild(n ? t : document.createTextNode(t));
  }), this.insertBefore(e, this.firstChild);
});
Element.prototype.scrollIntoViewIfNeeded || (Element.prototype.scrollIntoViewIfNeeded = function(o) {
  o = arguments.length === 0 ? !0 : !!o;
  const e = this.parentNode, t = window.getComputedStyle(e, null), n = parseInt(t.getPropertyValue("border-top-width")), i = parseInt(t.getPropertyValue("border-left-width")), r = this.offsetTop - e.offsetTop < e.scrollTop, s = this.offsetTop - e.offsetTop + this.clientHeight - n > e.scrollTop + e.clientHeight, a = this.offsetLeft - e.offsetLeft < e.scrollLeft, l = this.offsetLeft - e.offsetLeft + this.clientWidth - i > e.scrollLeft + e.clientWidth, c = r && !s;
  (r || s) && o && (e.scrollTop = this.offsetTop - e.offsetTop - e.clientHeight / 2 - n + this.clientHeight / 2), (a || l) && o && (e.scrollLeft = this.offsetLeft - e.offsetLeft - e.clientWidth / 2 - i + this.clientWidth / 2), (r || s || a || l) && !o && this.scrollIntoView(c);
});
let gu = (o = 21) => crypto.getRandomValues(new Uint8Array(o)).reduce((e, t) => (t &= 63, t < 36 ? e += t.toString(36) : t < 62 ? e += (t - 26).toString(36).toUpperCase() : t > 62 ? e += "-" : e += "_", e), "");
var Ds = /* @__PURE__ */ ((o) => (o.VERBOSE = "VERBOSE", o.INFO = "INFO", o.WARN = "WARN", o.ERROR = "ERROR", o))(Ds || {});
const j = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  SHIFT: 16,
  CTRL: 17,
  ALT: 18,
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  DOWN: 40,
  RIGHT: 39,
  DELETE: 46,
  META: 91
}, mu = {
  LEFT: 0,
  WHEEL: 1,
  RIGHT: 2,
  BACKWARD: 3,
  FORWARD: 4
};
function vo(o, e, t = "log", n, i = "color: inherit") {
  if (!("console" in window) || !window.console[t])
    return;
  const r = ["info", "log", "warn", "error"].includes(t), s = [];
  switch (vo.logLevel) {
    case "ERROR":
      if (t !== "error")
        return;
      break;
    case "WARN":
      if (!["error", "warn"].includes(t))
        return;
      break;
    case "INFO":
      if (!r || o)
        return;
      break;
  }
  n && s.push(n);
  const a = "Editor.js 2.27.1", l = `line-height: 1em;
            color: #006FEA;
            display: inline-block;
            font-size: 11px;
            line-height: 1em;
            background-color: #fff;
            padding: 4px 9px;
            border-radius: 30px;
            border: 1px solid rgba(56, 138, 229, 0.16);
            margin: 4px 5px 4px 0;`;
  o && (r ? (s.unshift(l, i), e = `%c${a}%c ${e}`) : e = `( ${a} )${e}`);
  try {
    r ? n ? console[t](`${e} %o`, ...s) : console[t](e, ...s) : console[t](e);
  } catch {
  }
}
vo.logLevel = "VERBOSE";
function bu(o) {
  vo.logLevel = o;
}
const $ = vo.bind(window, !1), _e = vo.bind(window, !0);
function bt(o) {
  return Object.prototype.toString.call(o).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}
function Z(o) {
  return bt(o) === "function" || bt(o) === "asyncfunction";
}
function ce(o) {
  return bt(o) === "object";
}
function nt(o) {
  return bt(o) === "string";
}
function vu(o) {
  return bt(o) === "boolean";
}
function xr(o) {
  return bt(o) === "number";
}
function Er(o) {
  return bt(o) === "undefined";
}
function Me(o) {
  return o ? Object.keys(o).length === 0 && o.constructor === Object : !0;
}
function Ps(o) {
  return o > 47 && o < 58 || // number keys
  o === 32 || o === 13 || // Space bar & return key(s)
  o === 229 || // processing key input for certain languages — Chinese, Japanese, etc.
  o > 64 && o < 91 || // letter keys
  o > 95 && o < 112 || // Numpad keys
  o > 185 && o < 193 || // ;=,-./` (in order)
  o > 218 && o < 223;
}
async function Fs(o, e = () => {
}, t = () => {
}) {
  async function n(i, r, s) {
    try {
      await i.function(i.data), await r(Er(i.data) ? {} : i.data);
    } catch {
      s(Er(i.data) ? {} : i.data);
    }
  }
  return o.reduce(async (i, r) => (await i, n(r, e, t)), Promise.resolve());
}
function Hs(o) {
  return Array.prototype.slice.call(o);
}
function vt(o, e) {
  return function() {
    const t = this, n = arguments;
    window.setTimeout(() => o.apply(t, n), e);
  };
}
function wu(o) {
  return o.name.split(".").pop();
}
function yu(o) {
  return /^[-\w]+\/([-+\w]+|\*)$/.test(o);
}
function ku(o, e, t) {
  let n;
  return (...i) => {
    const r = this, s = () => {
      n = null, t || o.apply(r, i);
    }, a = t && !n;
    window.clearTimeout(n), n = window.setTimeout(s, e), a && o.apply(r, i);
  };
}
function Un(o, e, t = void 0) {
  let n, i, r, s = null, a = 0;
  t || (t = {});
  const l = function() {
    a = t.leading === !1 ? 0 : Date.now(), s = null, r = o.apply(n, i), s || (n = i = null);
  };
  return function() {
    const c = Date.now();
    !a && t.leading === !1 && (a = c);
    const u = e - (c - a);
    return n = this, i = arguments, u <= 0 || u > e ? (s && (clearTimeout(s), s = null), a = c, r = o.apply(n, i), s || (n = i = null)) : !s && t.trailing !== !1 && (s = setTimeout(l, u)), r;
  };
}
function xu() {
  const o = {
    win: !1,
    mac: !1,
    x11: !1,
    linux: !1
  }, e = Object.keys(o).find((t) => window.navigator.appVersion.toLowerCase().indexOf(t) !== -1);
  return e && (o[e] = !0), o;
}
function Xo(o) {
  return o[0].toUpperCase() + o.slice(1);
}
function zn(o, ...e) {
  if (!e.length)
    return o;
  const t = e.shift();
  if (ce(o) && ce(t))
    for (const n in t)
      ce(t[n]) ? (o[n] || Object.assign(o, { [n]: {} }), zn(o[n], t[n])) : Object.assign(o, { [n]: t[n] });
  return zn(o, ...e);
}
function js(o) {
  const e = xu();
  return o = o.replace(/shift/gi, "⇧").replace(/backspace/gi, "⌫").replace(/enter/gi, "⏎").replace(/up/gi, "↑").replace(/left/gi, "→").replace(/down/gi, "↓").replace(/right/gi, "←").replace(/escape/gi, "⎋").replace(/insert/gi, "Ins").replace(/delete/gi, "␡").replace(/\+/gi, " + "), e.mac ? o = o.replace(/ctrl|cmd/gi, "⌘").replace(/alt/gi, "⌥") : o = o.replace(/cmd/gi, "Ctrl").replace(/windows/gi, "WIN"), o;
}
function Eu(o) {
  try {
    return new URL(o).href;
  } catch {
  }
  return o.substring(0, 2) === "//" ? window.location.protocol + o : window.location.origin + o;
}
function Su() {
  return gu(10);
}
function Cu(o) {
  window.open(o, "_blank");
}
function Tu(o = "") {
  return `${o}${Math.floor(Math.random() * 1e8).toString(16)}`;
}
function $n(o, e, t) {
  const n = `«${e}» is deprecated and will be removed in the next major release. Please use the «${t}» instead.`;
  o && _e(n, "warn");
}
function Ut(o, e, t) {
  const n = t.value ? "value" : "get", i = t[n], r = `#${e}Cache`;
  if (t[n] = function(...s) {
    return this[r] === void 0 && (this[r] = i.apply(this, ...s)), this[r];
  }, n === "get" && t.set) {
    const s = t.set;
    t.set = function(a) {
      delete o[r], s.apply(this, a);
    };
  }
  return t;
}
const Us = 650;
function pt() {
  return window.matchMedia(`(max-width: ${Us}px)`).matches;
}
const Sr = typeof window < "u" && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
function Bu(o, e) {
  const t = Array.isArray(o) || ce(o), n = Array.isArray(e) || ce(e);
  return t || n ? JSON.stringify(o) === JSON.stringify(e) : o === e;
}
class m {
  /**
   * Check if passed tag has no closed tag
   *
   * @param {HTMLElement} tag - element to check
   * @returns {boolean}
   */
  static isSingleTag(e) {
    return e.tagName && [
      "AREA",
      "BASE",
      "BR",
      "COL",
      "COMMAND",
      "EMBED",
      "HR",
      "IMG",
      "INPUT",
      "KEYGEN",
      "LINK",
      "META",
      "PARAM",
      "SOURCE",
      "TRACK",
      "WBR"
    ].includes(e.tagName);
  }
  /**
   * Check if element is BR or WBR
   *
   * @param {HTMLElement} element - element to check
   * @returns {boolean}
   */
  static isLineBreakTag(e) {
    return e && e.tagName && [
      "BR",
      "WBR"
    ].includes(e.tagName);
  }
  /**
   * Helper for making Elements with class name and attributes
   *
   * @param  {string} tagName - new Element tag name
   * @param  {string[]|string} [classNames] - list or name of CSS class name(s)
   * @param  {object} [attributes] - any attributes
   * @returns {HTMLElement}
   */
  static make(e, t = null, n = {}) {
    const i = document.createElement(e);
    Array.isArray(t) ? i.classList.add(...t) : t && i.classList.add(t);
    for (const r in n)
      Object.prototype.hasOwnProperty.call(n, r) && (i[r] = n[r]);
    return i;
  }
  /**
   * Creates Text Node with the passed content
   *
   * @param {string} content - text content
   * @returns {Text}
   */
  static text(e) {
    return document.createTextNode(e);
  }
  /**
   * Append one or several elements to the parent
   *
   * @param  {Element|DocumentFragment} parent - where to append
   * @param  {Element|Element[]|DocumentFragment|Text|Text[]} elements - element or elements list
   */
  static append(e, t) {
    Array.isArray(t) ? t.forEach((n) => e.appendChild(n)) : e.appendChild(t);
  }
  /**
   * Append element or a couple to the beginning of the parent elements
   *
   * @param {Element} parent - where to append
   * @param {Element|Element[]} elements - element or elements list
   */
  static prepend(e, t) {
    Array.isArray(t) ? (t = t.reverse(), t.forEach((n) => e.prepend(n))) : e.prepend(t);
  }
  /**
   * Swap two elements in parent
   *
   * @param {HTMLElement} el1 - from
   * @param {HTMLElement} el2 - to
   * @deprecated
   */
  static swap(e, t) {
    const n = document.createElement("div"), i = e.parentNode;
    i.insertBefore(n, e), i.insertBefore(e, t), i.insertBefore(t, n), i.removeChild(n);
  }
  /**
   * Selector Decorator
   *
   * Returns first match
   *
   * @param {Element} el - element we searching inside. Default - DOM Document
   * @param {string} selector - searching string
   * @returns {Element}
   */
  static find(e = document, t) {
    return e.querySelector(t);
  }
  /**
   * Get Element by Id
   *
   * @param {string} id - id to find
   * @returns {HTMLElement | null}
   */
  static get(e) {
    return document.getElementById(e);
  }
  /**
   * Selector Decorator.
   *
   * Returns all matches
   *
   * @param {Element|Document} el - element we searching inside. Default - DOM Document
   * @param {string} selector - searching string
   * @returns {NodeList}
   */
  static findAll(e = document, t) {
    return e.querySelectorAll(t);
  }
  /**
   * Returns CSS selector for all text inputs
   */
  static get allInputsSelector() {
    return "[contenteditable=true], textarea, input:not([type]), " + ["text", "password", "email", "number", "search", "tel", "url"].map((e) => `input[type="${e}"]`).join(", ");
  }
  /**
   * Find all contenteditable, textarea and editable input elements passed holder contains
   *
   * @param holder - element where to find inputs
   */
  static findAllInputs(e) {
    return Hs(e.querySelectorAll(m.allInputsSelector)).reduce((t, n) => m.isNativeInput(n) || m.containsOnlyInlineElements(n) ? [...t, n] : [...t, ...m.getDeepestBlockElements(n)], []);
  }
  /**
   * Search for deepest node which is Leaf.
   * Leaf is the vertex that doesn't have any child nodes
   *
   * @description Method recursively goes throw the all Node until it finds the Leaf
   * @param {Node} node - root Node. From this vertex we start Deep-first search
   *                      {@link https://en.wikipedia.org/wiki/Depth-first_search}
   * @param {boolean} [atLast] - find last text node
   * @returns {Node} - it can be text Node or Element Node, so that caret will able to work with it
   */
  static getDeepestNode(e, t = !1) {
    const n = t ? "lastChild" : "firstChild", i = t ? "previousSibling" : "nextSibling";
    if (e && e.nodeType === Node.ELEMENT_NODE && e[n]) {
      let r = e[n];
      if (m.isSingleTag(r) && !m.isNativeInput(r) && !m.isLineBreakTag(r))
        if (r[i])
          r = r[i];
        else if (r.parentNode[i])
          r = r.parentNode[i];
        else
          return r.parentNode;
      return this.getDeepestNode(r, t);
    }
    return e;
  }
  /**
   * Check if object is DOM node
   *
   * @param {*} node - object to check
   * @returns {boolean}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isElement(e) {
    return xr(e) ? !1 : e && e.nodeType && e.nodeType === Node.ELEMENT_NODE;
  }
  /**
   * Check if object is DocumentFragment node
   *
   * @param {object} node - object to check
   * @returns {boolean}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isFragment(e) {
    return xr(e) ? !1 : e && e.nodeType && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
  }
  /**
   * Check if passed element is contenteditable
   *
   * @param {HTMLElement} element - html element to check
   * @returns {boolean}
   */
  static isContentEditable(e) {
    return e.contentEditable === "true";
  }
  /**
   * Checks target if it is native input
   *
   * @param {*} target - HTML element or string
   * @returns {boolean}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isNativeInput(e) {
    const t = [
      "INPUT",
      "TEXTAREA"
    ];
    return e && e.tagName ? t.includes(e.tagName) : !1;
  }
  /**
   * Checks if we can set caret
   *
   * @param {HTMLElement} target - target to check
   * @returns {boolean}
   */
  static canSetCaret(e) {
    let t = !0;
    if (m.isNativeInput(e))
      switch (e.type) {
        case "file":
        case "checkbox":
        case "radio":
        case "hidden":
        case "submit":
        case "button":
        case "image":
        case "reset":
          t = !1;
          break;
      }
    else
      t = m.isContentEditable(e);
    return t;
  }
  /**
   * Checks node if it is empty
   *
   * @description Method checks simple Node without any childs for emptiness
   * If you have Node with 2 or more children id depth, you better use {@link Dom#isEmpty} method
   * @param {Node} node - node to check
   * @returns {boolean} true if it is empty
   */
  static isNodeEmpty(e) {
    let t;
    return this.isSingleTag(e) && !this.isLineBreakTag(e) ? !1 : (this.isElement(e) && this.isNativeInput(e) ? t = e.value : t = e.textContent.replace("​", ""), t.trim().length === 0);
  }
  /**
   * checks node if it is doesn't have any child nodes
   *
   * @param {Node} node - node to check
   * @returns {boolean}
   */
  static isLeaf(e) {
    return e ? e.childNodes.length === 0 : !1;
  }
  /**
   * breadth-first search (BFS)
   * {@link https://en.wikipedia.org/wiki/Breadth-first_search}
   *
   * @description Pushes to stack all DOM leafs and checks for emptiness
   * @param {Node} node - node to check
   * @returns {boolean}
   */
  static isEmpty(e) {
    e.normalize();
    const t = [e];
    for (; t.length > 0; )
      if (e = t.shift(), !!e) {
        if (this.isLeaf(e) && !this.isNodeEmpty(e))
          return !1;
        e.childNodes && t.push(...Array.from(e.childNodes));
      }
    return !0;
  }
  /**
   * Check if string contains html elements
   *
   * @param {string} str - string to check
   * @returns {boolean}
   */
  static isHTMLString(e) {
    const t = m.make("div");
    return t.innerHTML = e, t.childElementCount > 0;
  }
  /**
   * Return length of node`s text content
   *
   * @param {Node} node - node with content
   * @returns {number}
   */
  static getContentLength(e) {
    return m.isNativeInput(e) ? e.value.length : e.nodeType === Node.TEXT_NODE ? e.length : e.textContent.length;
  }
  /**
   * Return array of names of block html elements
   *
   * @returns {string[]}
   */
  static get blockElements() {
    return [
      "address",
      "article",
      "aside",
      "blockquote",
      "canvas",
      "div",
      "dl",
      "dt",
      "fieldset",
      "figcaption",
      "figure",
      "footer",
      "form",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "header",
      "hgroup",
      "hr",
      "li",
      "main",
      "nav",
      "noscript",
      "ol",
      "output",
      "p",
      "pre",
      "ruby",
      "section",
      "table",
      "tbody",
      "thead",
      "tr",
      "tfoot",
      "ul",
      "video"
    ];
  }
  /**
   * Check if passed content includes only inline elements
   *
   * @param {string|HTMLElement} data - element or html string
   * @returns {boolean}
   */
  static containsOnlyInlineElements(e) {
    let t;
    nt(e) ? (t = document.createElement("div"), t.innerHTML = e) : t = e;
    const n = (i) => !m.blockElements.includes(i.tagName.toLowerCase()) && Array.from(i.children).every(n);
    return Array.from(t.children).every(n);
  }
  /**
   * Find and return all block elements in the passed parent (including subtree)
   *
   * @param {HTMLElement} parent - root element
   * @returns {HTMLElement[]}
   */
  static getDeepestBlockElements(e) {
    return m.containsOnlyInlineElements(e) ? [e] : Array.from(e.children).reduce((t, n) => [...t, ...m.getDeepestBlockElements(n)], []);
  }
  /**
   * Helper for get holder from {string} or return HTMLElement
   *
   * @param {string | HTMLElement} element - holder's id or holder's HTML Element
   * @returns {HTMLElement}
   */
  static getHolder(e) {
    return nt(e) ? document.getElementById(e) : e;
  }
  /**
   * Returns true if element is anchor (is A tag)
   *
   * @param {Element} element - element to check
   * @returns {boolean}
   */
  static isAnchor(e) {
    return e.tagName.toLowerCase() === "a";
  }
  /**
   * Return element's offset related to the document
   *
   * @todo handle case when editor initialized in scrollable popup
   * @param el - element to compute offset
   */
  static offset(e) {
    const t = e.getBoundingClientRect(), n = window.pageXOffset || document.documentElement.scrollLeft, i = window.pageYOffset || document.documentElement.scrollTop, r = t.top + i, s = t.left + n;
    return {
      top: r,
      left: s,
      bottom: r + t.height,
      right: s + t.width
    };
  }
}
const _u = {
  blockTunes: {
    toggler: {
      "Click to tune": "",
      "or drag to move": ""
    }
  },
  inlineToolbar: {
    converter: {
      "Convert to": ""
    }
  },
  toolbar: {
    toolbox: {
      Add: ""
    }
  },
  popover: {
    Filter: "",
    "Nothing found": ""
  }
}, Ou = {
  Text: "",
  Link: "",
  Bold: "",
  Italic: ""
}, Iu = {
  link: {
    "Add a link": ""
  },
  stub: {
    "The block can not be displayed correctly.": ""
  }
}, Au = {
  delete: {
    Delete: "",
    "Click to delete": ""
  },
  moveUp: {
    "Move up": ""
  },
  moveDown: {
    "Move down": ""
  }
}, zs = {
  ui: _u,
  toolNames: Ou,
  tools: Iu,
  blockTunes: Au
}, Tt = class {
  /**
   * Type-safe translation for internal UI texts:
   * Perform translation of the string by namespace and a key
   *
   * @example I18n.ui(I18nInternalNS.ui.blockTunes.toggler, 'Click to tune')
   * @param internalNamespace - path to translated string in dictionary
   * @param dictKey - dictionary key. Better to use default locale original text
   */
  static ui(o, e) {
    return Tt._t(o, e);
  }
  /**
   * Translate for external strings that is not presented in default dictionary.
   * For example, for user-specified tool names
   *
   * @param namespace - path to translated string in dictionary
   * @param dictKey - dictionary key. Better to use default locale original text
   */
  static t(o, e) {
    return Tt._t(o, e);
  }
  /**
   * Adjust module for using external dictionary
   *
   * @param dictionary - new messages list to override default
   */
  static setDictionary(o) {
    Tt.currentDictionary = o;
  }
  /**
   * Perform translation both for internal and external namespaces
   * If there is no translation found, returns passed key as a translated message
   *
   * @param namespace - path to translated string in dictionary
   * @param dictKey - dictionary key. Better to use default locale original text
   */
  static _t(o, e) {
    const t = Tt.getNamespace(o);
    return !t || !t[e] ? e : t[e];
  }
  /**
   * Find messages section by namespace path
   *
   * @param namespace - path to section
   */
  static getNamespace(o) {
    return o.split(".").reduce((e, t) => !e || !Object.keys(e).length ? {} : e[t], Tt.currentDictionary);
  }
};
let me = Tt;
me.currentDictionary = zs;
class $s extends Error {
}
class an {
  constructor() {
    this.subscribers = {};
  }
  /**
   * Subscribe any event on callback
   *
   * @param eventName - event name
   * @param callback - subscriber
   */
  on(e, t) {
    e in this.subscribers || (this.subscribers[e] = []), this.subscribers[e].push(t);
  }
  /**
   * Subscribe any event on callback. Callback will be called once and be removed from subscribers array after call.
   *
   * @param eventName - event name
   * @param callback - subscriber
   */
  once(e, t) {
    e in this.subscribers || (this.subscribers[e] = []);
    const n = (i) => {
      const r = t(i), s = this.subscribers[e].indexOf(n);
      return s !== -1 && this.subscribers[e].splice(s, 1), r;
    };
    this.subscribers[e].push(n);
  }
  /**
   * Emit callbacks with passed data
   *
   * @param eventName - event name
   * @param data - subscribers get this data when they were fired
   */
  emit(e, t) {
    Me(this.subscribers) || !this.subscribers[e] || this.subscribers[e].reduce((n, i) => {
      const r = i(n);
      return r !== void 0 ? r : n;
    }, t);
  }
  /**
   * Unsubscribe callback from event
   *
   * @param eventName - event name
   * @param callback - event handler
   */
  off(e, t) {
    for (let n = 0; n < this.subscribers[e].length; n++)
      if (this.subscribers[e][n] === t) {
        delete this.subscribers[e][n];
        break;
      }
  }
  /**
   * Destroyer
   * clears subscribers list
   */
  destroy() {
    this.subscribers = null;
  }
}
function oo(o) {
  Object.setPrototypeOf(this, {
    /**
     * Block id
     *
     * @returns {string}
     */
    get id() {
      return o.id;
    },
    /**
     * Tool name
     *
     * @returns {string}
     */
    get name() {
      return o.name;
    },
    /**
     * Tool config passed on Editor's initialization
     *
     * @returns {ToolConfig}
     */
    get config() {
      return o.config;
    },
    /**
     * .ce-block element, that wraps plugin contents
     *
     * @returns {HTMLElement}
     */
    get holder() {
      return o.holder;
    },
    /**
     * True if Block content is empty
     *
     * @returns {boolean}
     */
    get isEmpty() {
      return o.isEmpty;
    },
    /**
     * True if Block is selected with Cross-Block selection
     *
     * @returns {boolean}
     */
    get selected() {
      return o.selected;
    },
    /**
     * Set Block's stretch state
     *
     * @param {boolean} state — state to set
     */
    set stretched(e) {
      o.stretched = e;
    },
    /**
     * True if Block is stretched
     *
     * @returns {boolean}
     */
    get stretched() {
      return o.stretched;
    },
    /**
     * Call Tool method with errors handler under-the-hood
     *
     * @param {string} methodName - method to call
     * @param {object} param - object with parameters
     * @returns {unknown}
     */
    call(e, t) {
      return o.call(e, t);
    },
    /**
     * Save Block content
     *
     * @returns {Promise<void|SavedData>}
     */
    save() {
      return o.save();
    },
    /**
     * Validate Block data
     *
     * @param {BlockToolData} data - data to validate
     * @returns {Promise<boolean>}
     */
    validate(e) {
      return o.validate(e);
    },
    /**
     * Allows to say Editor that Block was changed. Used to manually trigger Editor's 'onChange' callback
     * Can be useful for block changes invisible for editor core.
     */
    dispatchChange() {
      o.dispatchChange();
    }
  });
}
class mi {
  constructor() {
    this.allListeners = [];
  }
  /**
   * Assigns event listener on element and returns unique identifier
   *
   * @param {EventTarget} element - DOM element that needs to be listened
   * @param {string} eventType - event type
   * @param {Function} handler - method that will be fired on event
   * @param {boolean|AddEventListenerOptions} options - useCapture or {capture, passive, once}
   */
  on(e, t, n, i = !1) {
    const r = Tu("l"), s = {
      id: r,
      element: e,
      eventType: t,
      handler: n,
      options: i
    };
    if (!this.findOne(e, t, n))
      return this.allListeners.push(s), e.addEventListener(t, n, i), r;
  }
  /**
   * Removes event listener from element
   *
   * @param {EventTarget} element - DOM element that we removing listener
   * @param {string} eventType - event type
   * @param {Function} handler - remove handler, if element listens several handlers on the same event type
   * @param {boolean|AddEventListenerOptions} options - useCapture or {capture, passive, once}
   */
  off(e, t, n, i) {
    const r = this.findAll(e, t, n);
    r.forEach((s, a) => {
      const l = this.allListeners.indexOf(r[a]);
      l > -1 && (this.allListeners.splice(l, 1), s.element.removeEventListener(s.eventType, s.handler, s.options));
    });
  }
  /**
   * Removes listener by id
   *
   * @param {string} id - listener identifier
   */
  offById(e) {
    const t = this.findById(e);
    t && t.element.removeEventListener(t.eventType, t.handler, t.options);
  }
  /**
   * Finds and returns first listener by passed params
   *
   * @param {EventTarget} element - event target
   * @param {string} [eventType] - event type
   * @param {Function} [handler] - event handler
   * @returns {ListenerData|null}
   */
  findOne(e, t, n) {
    const i = this.findAll(e, t, n);
    return i.length > 0 ? i[0] : null;
  }
  /**
   * Return all stored listeners by passed params
   *
   * @param {EventTarget} element - event target
   * @param {string} eventType - event type
   * @param {Function} handler - event handler
   * @returns {ListenerData[]}
   */
  findAll(e, t, n) {
    let i;
    const r = e ? this.findByEventTarget(e) : [];
    return e && t && n ? i = r.filter((s) => s.eventType === t && s.handler === n) : e && t ? i = r.filter((s) => s.eventType === t) : i = r, i;
  }
  /**
   * Removes all listeners
   */
  removeAll() {
    this.allListeners.map((e) => {
      e.element.removeEventListener(e.eventType, e.handler, e.options);
    }), this.allListeners = [];
  }
  /**
   * Module cleanup on destruction
   */
  destroy() {
    this.removeAll();
  }
  /**
   * Search method: looks for listener by passed element
   *
   * @param {EventTarget} element - searching element
   * @returns {Array} listeners that found on element
   */
  findByEventTarget(e) {
    return this.allListeners.filter((t) => {
      if (t.element === e)
        return t;
    });
  }
  /**
   * Search method: looks for listener by passed event type
   *
   * @param {string} eventType - event type
   * @returns {ListenerData[]} listeners that found on element
   */
  findByType(e) {
    return this.allListeners.filter((t) => {
      if (t.eventType === e)
        return t;
    });
  }
  /**
   * Search method: looks for listener by passed handler
   *
   * @param {Function} handler - event handler
   * @returns {ListenerData[]} listeners that found on element
   */
  findByHandler(e) {
    return this.allListeners.filter((t) => {
      if (t.handler === e)
        return t;
    });
  }
  /**
   * Returns listener data found by id
   *
   * @param {string} id - listener identifier
   * @returns {ListenerData}
   */
  findById(e) {
    return this.allListeners.find((t) => t.id === e);
  }
}
class W {
  /**
   * @class
   * @param options - Module options
   * @param options.config - Module config
   * @param options.eventsDispatcher - Common event bus
   */
  constructor({ config: e, eventsDispatcher: t }) {
    if (this.nodes = {}, this.listeners = new mi(), this.readOnlyMutableListeners = {
      /**
       * Assigns event listener on DOM element and pushes into special array that might be removed
       *
       * @param {EventTarget} element - DOM Element
       * @param {string} eventType - Event name
       * @param {Function} handler - Event handler
       * @param {boolean|AddEventListenerOptions} options - Listening options
       */
      on: (n, i, r, s = !1) => {
        this.mutableListenerIds.push(
          this.listeners.on(n, i, r, s)
        );
      },
      /**
       * Clears all mutable listeners
       */
      clearAll: () => {
        for (const n of this.mutableListenerIds)
          this.listeners.offById(n);
        this.mutableListenerIds = [];
      }
    }, this.mutableListenerIds = [], new.target === W)
      throw new TypeError("Constructors for abstract class Module are not allowed.");
    this.config = e, this.eventsDispatcher = t;
  }
  /**
   * Editor modules setter
   *
   * @param {EditorModules} Editor - Editor's Modules
   */
  set state(e) {
    this.Editor = e;
  }
  /**
   * Remove memorized nodes
   */
  removeAllNodes() {
    for (const e in this.nodes) {
      const t = this.nodes[e];
      t instanceof HTMLElement && t.remove();
    }
  }
  /**
   * Returns true if current direction is RTL (Right-To-Left)
   */
  get isRtl() {
    return this.config.i18n.direction === "rtl";
  }
}
class R {
  constructor() {
    this.instance = null, this.selection = null, this.savedSelectionRange = null, this.isFakeBackgroundEnabled = !1, this.commandBackground = "backColor", this.commandRemoveFormat = "removeFormat";
  }
  /**
   * Editor styles
   *
   * @returns {{editorWrapper: string, editorZone: string}}
   */
  static get CSS() {
    return {
      editorWrapper: "codex-editor",
      editorZone: "codex-editor__redactor"
    };
  }
  /**
   * Returns selected anchor
   * {@link https://developer.mozilla.org/ru/docs/Web/API/Selection/anchorNode}
   *
   * @returns {Node|null}
   */
  static get anchorNode() {
    const e = window.getSelection();
    return e ? e.anchorNode : null;
  }
  /**
   * Returns selected anchor element
   *
   * @returns {Element|null}
   */
  static get anchorElement() {
    const e = window.getSelection();
    if (!e)
      return null;
    const t = e.anchorNode;
    return t ? m.isElement(t) ? t : t.parentElement : null;
  }
  /**
   * Returns selection offset according to the anchor node
   * {@link https://developer.mozilla.org/ru/docs/Web/API/Selection/anchorOffset}
   *
   * @returns {number|null}
   */
  static get anchorOffset() {
    const e = window.getSelection();
    return e ? e.anchorOffset : null;
  }
  /**
   * Is current selection range collapsed
   *
   * @returns {boolean|null}
   */
  static get isCollapsed() {
    const e = window.getSelection();
    return e ? e.isCollapsed : null;
  }
  /**
   * Check current selection if it is at Editor's zone
   *
   * @returns {boolean}
   */
  static get isAtEditor() {
    return this.isSelectionAtEditor(R.get());
  }
  /**
   * Check if passed selection is at Editor's zone
   *
   * @param selection - Selection object to check
   */
  static isSelectionAtEditor(e) {
    if (!e)
      return !1;
    let t = e.anchorNode || e.focusNode;
    t && t.nodeType === Node.TEXT_NODE && (t = t.parentNode);
    let n = null;
    return t && t instanceof Element && (n = t.closest(`.${R.CSS.editorZone}`)), n ? n.nodeType === Node.ELEMENT_NODE : !1;
  }
  /**
   * Check if passed range at Editor zone
   *
   * @param range - range to check
   */
  static isRangeAtEditor(e) {
    if (!e)
      return;
    let t = e.startContainer;
    t && t.nodeType === Node.TEXT_NODE && (t = t.parentNode);
    let n = null;
    return t && t instanceof Element && (n = t.closest(`.${R.CSS.editorZone}`)), n ? n.nodeType === Node.ELEMENT_NODE : !1;
  }
  /**
   * Methods return boolean that true if selection exists on the page
   */
  static get isSelectionExists() {
    return !!R.get().anchorNode;
  }
  /**
   * Return first range
   *
   * @returns {Range|null}
   */
  static get range() {
    return this.getRangeFromSelection(this.get());
  }
  /**
   * Returns range from passed Selection object
   *
   * @param selection - Selection object to get Range from
   */
  static getRangeFromSelection(e) {
    return e && e.rangeCount ? e.getRangeAt(0) : null;
  }
  /**
   * Calculates position and size of selected text
   *
   * @returns {DOMRect | ClientRect}
   */
  static get rect() {
    let e = document.selection, t, n = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    if (e && e.type !== "Control")
      return e = e, t = e.createRange(), n.x = t.boundingLeft, n.y = t.boundingTop, n.width = t.boundingWidth, n.height = t.boundingHeight, n;
    if (!window.getSelection)
      return $("Method window.getSelection is not supported", "warn"), n;
    if (e = window.getSelection(), e.rangeCount === null || isNaN(e.rangeCount))
      return $("Method SelectionUtils.rangeCount is not supported", "warn"), n;
    if (e.rangeCount === 0)
      return n;
    if (t = e.getRangeAt(0).cloneRange(), t.getBoundingClientRect && (n = t.getBoundingClientRect()), n.x === 0 && n.y === 0) {
      const i = document.createElement("span");
      if (i.getBoundingClientRect) {
        i.appendChild(document.createTextNode("​")), t.insertNode(i), n = i.getBoundingClientRect();
        const r = i.parentNode;
        r.removeChild(i), r.normalize();
      }
    }
    return n;
  }
  /**
   * Returns selected text as String
   *
   * @returns {string}
   */
  static get text() {
    return window.getSelection ? window.getSelection().toString() : "";
  }
  /**
   * Returns window SelectionUtils
   * {@link https://developer.mozilla.org/ru/docs/Web/API/Window/getSelection}
   *
   * @returns {Selection}
   */
  static get() {
    return window.getSelection();
  }
  /**
   * Set focus to contenteditable or native input element
   *
   * @param element - element where to set focus
   * @param offset - offset of cursor
   */
  static setCursor(e, t = 0) {
    const n = document.createRange(), i = window.getSelection();
    return m.isNativeInput(e) ? m.canSetCaret(e) ? (e.focus(), e.selectionStart = e.selectionEnd = t, e.getBoundingClientRect()) : void 0 : (n.setStart(e, t), n.setEnd(e, t), i.removeAllRanges(), i.addRange(n), n.getBoundingClientRect());
  }
  /**
   * Check if current range exists and belongs to container
   *
   * @param container - where range should be
   */
  static isRangeInsideContainer(e) {
    const t = R.range;
    return t === null ? !1 : e.contains(t.startContainer);
  }
  /**
   * Adds fake cursor to the current range
   */
  static addFakeCursor() {
    const e = R.range;
    if (e === null)
      return;
    const t = m.make("span", "codex-editor__fake-cursor");
    t.dataset.mutationFree = "true", e.collapse(), e.insertNode(t);
  }
  /**
   * Check if passed element contains a fake cursor
   *
   * @param el - where to check
   */
  static isFakeCursorInsideContainer(e) {
    return m.find(e, ".codex-editor__fake-cursor") !== null;
  }
  /**
   * Removes fake cursor from a container
   *
   * @param container - container to look for
   */
  static removeFakeCursor(e = document.body) {
    const t = m.find(e, ".codex-editor__fake-cursor");
    t && t.remove();
  }
  /**
   * Removes fake background
   */
  removeFakeBackground() {
    this.isFakeBackgroundEnabled && (this.isFakeBackgroundEnabled = !1, document.execCommand(this.commandRemoveFormat));
  }
  /**
   * Sets fake background
   */
  setFakeBackground() {
    document.execCommand(this.commandBackground, !1, "#a8d6ff"), this.isFakeBackgroundEnabled = !0;
  }
  /**
   * Save SelectionUtils's range
   */
  save() {
    this.savedSelectionRange = R.range;
  }
  /**
   * Restore saved SelectionUtils's range
   */
  restore() {
    if (!this.savedSelectionRange)
      return;
    const e = window.getSelection();
    e.removeAllRanges(), e.addRange(this.savedSelectionRange);
  }
  /**
   * Clears saved selection
   */
  clearSaved() {
    this.savedSelectionRange = null;
  }
  /**
   * Collapse current selection
   */
  collapseToEnd() {
    const e = window.getSelection(), t = document.createRange();
    t.selectNodeContents(e.focusNode), t.collapse(!1), e.removeAllRanges(), e.addRange(t);
  }
  /**
   * Looks ahead to find passed tag from current selection
   *
   * @param  {string} tagName       - tag to found
   * @param  {string} [className]   - tag's class name
   * @param  {number} [searchDepth] - count of tags that can be included. For better performance.
   * @returns {HTMLElement|null}
   */
  findParentTag(e, t, n = 10) {
    const i = window.getSelection();
    let r = null;
    return !i || !i.anchorNode || !i.focusNode ? null : ([
      /** the Node in which the selection begins */
      i.anchorNode,
      /** the Node in which the selection ends */
      i.focusNode
    ].forEach((s) => {
      let a = n;
      for (; a > 0 && s.parentNode && !(s.tagName === e && (r = s, t && s.classList && !s.classList.contains(t) && (r = null), r)); )
        s = s.parentNode, a--;
    }), r);
  }
  /**
   * Expands selection range to the passed parent node
   *
   * @param {HTMLElement} element - element which contents should be selected
   */
  expandToTag(e) {
    const t = window.getSelection();
    t.removeAllRanges();
    const n = document.createRange();
    n.selectNodeContents(e), t.addRange(n);
  }
}
function Mu(o, e) {
  const { type: t, target: n, addedNodes: i, removedNodes: r } = o;
  if (n === e)
    return !0;
  if (["characterData", "attributes"].includes(t)) {
    const l = n.nodeType === Node.TEXT_NODE ? n.parentNode : n;
    return e.contains(l);
  }
  const s = Array.from(i).some((l) => e.contains(l)), a = Array.from(r).some((l) => e.contains(l));
  return s || a;
}
const Vn = "redactor dom changed", Vs = "block changed", Ws = "fake cursor is about to be toggled", Ys = "fake cursor have been set";
var et = /* @__PURE__ */ ((o) => (o.APPEND_CALLBACK = "appendCallback", o.RENDERED = "rendered", o.MOVED = "moved", o.UPDATED = "updated", o.REMOVED = "removed", o.ON_PASTE = "onPaste", o))(et || {});
class re extends an {
  /**
   * @param options - block constructor options
   * @param [options.id] - block's id. Will be generated if omitted.
   * @param options.data - Tool's initial data
   * @param options.tool — block's tool
   * @param options.api - Editor API module for pass it to the Block Tunes
   * @param options.readOnly - Read-Only flag
   * @param [eventBus] - Editor common event bus. Allows to subscribe on some Editor events. Could be omitted when "virtual" Block is created. See BlocksAPI@composeBlockData.
   */
  constructor({
    id: e = Su(),
    data: t,
    tool: n,
    api: i,
    readOnly: r,
    tunesData: s
  }, a) {
    super(), this.cachedInputs = [], this.toolRenderedElement = null, this.tunesInstances = /* @__PURE__ */ new Map(), this.defaultTunesInstances = /* @__PURE__ */ new Map(), this.unavailableTunesData = {}, this.inputIndex = 0, this.editorEventBus = null, this.handleFocus = () => {
      this.dropInputsCache(), this.updateCurrentInput();
    }, this.didMutated = (l = void 0) => {
      const c = l === void 0, u = l instanceof InputEvent;
      !c && !u && this.detectToolRootChange(l);
      let d;
      c || u ? d = !0 : d = !(l.length > 0 && l.every((h) => {
        const { addedNodes: f, removedNodes: p } = h;
        return [
          ...Array.from(f),
          ...Array.from(p)
        ].some((g) => m.isElement(g) ? g.dataset.mutationFree === "true" : !1);
      })), d && (this.dropInputsCache(), this.updateCurrentInput(), this.call(
        "updated"
        /* UPDATED */
      ), this.emit("didMutated", this));
    }, this.name = n.name, this.id = e, this.settings = n.settings, this.config = n.settings.config || {}, this.api = i, this.editorEventBus = a || null, this.blockAPI = new oo(this), this.tool = n, this.toolInstance = n.create(t, this.blockAPI, r), this.tunes = n.tunes, this.composeTunes(s), this.holder = this.compose(), this.watchBlockMutations(), this.addInputEvents();
  }
  /**
   * CSS classes for the Block
   *
   * @returns {{wrapper: string, content: string}}
   */
  static get CSS() {
    return {
      wrapper: "ce-block",
      wrapperStretched: "ce-block--stretched",
      content: "ce-block__content",
      focused: "ce-block--focused",
      selected: "ce-block--selected",
      dropTarget: "ce-block--drop-target"
    };
  }
  /**
   * Find and return all editable elements (contenteditable and native inputs) in the Tool HTML
   *
   * @returns {HTMLElement[]}
   */
  get inputs() {
    if (this.cachedInputs.length !== 0)
      return this.cachedInputs;
    const e = m.findAllInputs(this.holder);
    return this.inputIndex > e.length - 1 && (this.inputIndex = e.length - 1), this.cachedInputs = e, e;
  }
  /**
   * Return current Tool`s input
   *
   * @returns {HTMLElement}
   */
  get currentInput() {
    return this.inputs[this.inputIndex];
  }
  /**
   * Set input index to the passed element
   *
   * @param {HTMLElement | Node} element - HTML Element to set as current input
   */
  set currentInput(e) {
    const t = this.inputs.findIndex((n) => n === e || n.contains(e));
    t !== -1 && (this.inputIndex = t);
  }
  /**
   * Return first Tool`s input
   *
   * @returns {HTMLElement}
   */
  get firstInput() {
    return this.inputs[0];
  }
  /**
   * Return first Tool`s input
   *
   * @returns {HTMLElement}
   */
  get lastInput() {
    const e = this.inputs;
    return e[e.length - 1];
  }
  /**
   * Return next Tool`s input or undefined if it doesn't exist
   *
   * @returns {HTMLElement}
   */
  get nextInput() {
    return this.inputs[this.inputIndex + 1];
  }
  /**
   * Return previous Tool`s input or undefined if it doesn't exist
   *
   * @returns {HTMLElement}
   */
  get previousInput() {
    return this.inputs[this.inputIndex - 1];
  }
  /**
   * Get Block's JSON data
   *
   * @returns {object}
   */
  get data() {
    return this.save().then((e) => e && !Me(e.data) ? e.data : {});
  }
  /**
   * Returns tool's sanitizer config
   *
   * @returns {object}
   */
  get sanitize() {
    return this.tool.sanitizeConfig;
  }
  /**
   * is block mergeable
   * We plugin have merge function then we call it mergeable
   *
   * @returns {boolean}
   */
  get mergeable() {
    return Z(this.toolInstance.merge);
  }
  /**
   * Check block for emptiness
   *
   * @returns {boolean}
   */
  get isEmpty() {
    const e = m.isEmpty(this.pluginsContent), t = !this.hasMedia;
    return e && t;
  }
  /**
   * Check if block has a media content such as images, iframe and other
   *
   * @returns {boolean}
   */
  get hasMedia() {
    const e = [
      "img",
      "iframe",
      "video",
      "audio",
      "source",
      "input",
      "textarea",
      "twitterwidget"
    ];
    return !!this.holder.querySelector(e.join(","));
  }
  /**
   * Set focused state
   *
   * @param {boolean} state - 'true' to select, 'false' to remove selection
   */
  set focused(e) {
    this.holder.classList.toggle(re.CSS.focused, e);
  }
  /**
   * Get Block's focused state
   */
  get focused() {
    return this.holder.classList.contains(re.CSS.focused);
  }
  /**
   * Set selected state
   * We don't need to mark Block as Selected when it is empty
   *
   * @param {boolean} state - 'true' to select, 'false' to remove selection
   */
  set selected(e) {
    var t, n;
    this.holder.classList.toggle(re.CSS.selected, e);
    const i = e === !0 && R.isRangeInsideContainer(this.holder), r = e === !1 && R.isFakeCursorInsideContainer(this.holder);
    (i || r) && ((t = this.editorEventBus) == null || t.emit(Ws, { state: e }), i ? R.addFakeCursor() : R.removeFakeCursor(this.holder), (n = this.editorEventBus) == null || n.emit(Ys, { state: e }));
  }
  /**
   * Returns True if it is Selected
   *
   * @returns {boolean}
   */
  get selected() {
    return this.holder.classList.contains(re.CSS.selected);
  }
  /**
   * Set stretched state
   *
   * @param {boolean} state - 'true' to enable, 'false' to disable stretched state
   */
  set stretched(e) {
    this.holder.classList.toggle(re.CSS.wrapperStretched, e);
  }
  /**
   * Return Block's stretched state
   *
   * @returns {boolean}
   */
  get stretched() {
    return this.holder.classList.contains(re.CSS.wrapperStretched);
  }
  /**
   * Toggle drop target state
   *
   * @param {boolean} state - 'true' if block is drop target, false otherwise
   */
  set dropTarget(e) {
    this.holder.classList.toggle(re.CSS.dropTarget, e);
  }
  /**
   * Returns Plugins content
   *
   * @returns {HTMLElement}
   */
  get pluginsContent() {
    return this.toolRenderedElement;
  }
  /**
   * Calls Tool's method
   *
   * Method checks tool property {MethodName}. Fires method with passes params If it is instance of Function
   *
   * @param {string} methodName - method to call
   * @param {object} params - method argument
   */
  call(e, t) {
    if (Z(this.toolInstance[e])) {
      e === "appendCallback" && $(
        "`appendCallback` hook is deprecated and will be removed in the next major release. Use `rendered` hook instead",
        "warn"
      );
      try {
        this.toolInstance[e].call(this.toolInstance, t);
      } catch (n) {
        $(`Error during '${e}' call: ${n.message}`, "error");
      }
    }
  }
  /**
   * Call plugins merge method
   *
   * @param {BlockToolData} data - data to merge
   */
  async mergeWith(e) {
    await this.toolInstance.merge(e);
  }
  /**
   * Extracts data from Block
   * Groups Tool's save processing time
   *
   * @returns {object}
   */
  async save() {
    const e = await this.toolInstance.save(this.pluginsContent), t = this.unavailableTunesData;
    [
      ...this.tunesInstances.entries(),
      ...this.defaultTunesInstances.entries()
    ].forEach(([r, s]) => {
      if (Z(s.save))
        try {
          t[r] = s.save();
        } catch (a) {
          $(`Tune ${s.constructor.name} save method throws an Error %o`, "warn", a);
        }
    });
    const n = window.performance.now();
    let i;
    return Promise.resolve(e).then((r) => (i = window.performance.now(), {
      id: this.id,
      tool: this.name,
      data: r,
      tunes: t,
      time: i - n
    })).catch((r) => {
      $(`Saving process for ${this.name} tool failed due to the ${r}`, "log", "red");
    });
  }
  /**
   * Uses Tool's validation method to check the correctness of output data
   * Tool's validation method is optional
   *
   * @description Method returns true|false whether data passed the validation or not
   * @param {BlockToolData} data - data to validate
   * @returns {Promise<boolean>} valid
   */
  async validate(e) {
    let t = !0;
    return this.toolInstance.validate instanceof Function && (t = await this.toolInstance.validate(e)), t;
  }
  /**
   * Returns data to render in tunes menu.
   * Splits block tunes settings into 2 groups: popover items and custom html.
   */
  getTunes() {
    const e = document.createElement("div"), t = [], n = typeof this.toolInstance.renderSettings == "function" ? this.toolInstance.renderSettings() : [], i = [
      ...this.tunesInstances.values(),
      ...this.defaultTunesInstances.values()
    ].map((r) => r.render());
    return [n, i].flat().forEach((r) => {
      m.isElement(r) ? e.appendChild(r) : Array.isArray(r) ? t.push(...r) : t.push(r);
    }), [t, e];
  }
  /**
   * Update current input index with selection anchor node
   */
  updateCurrentInput() {
    this.currentInput = m.isNativeInput(document.activeElement) || !R.anchorNode ? document.activeElement : R.anchorNode;
  }
  /**
   * Allows to say Editor that Block was changed. Used to manually trigger Editor's 'onChange' callback
   * Can be useful for block changes invisible for editor core.
   */
  dispatchChange() {
    this.didMutated();
  }
  /**
   * Call Tool instance destroy method
   */
  destroy() {
    this.unwatchBlockMutations(), this.removeInputEvents(), super.destroy(), Z(this.toolInstance.destroy) && this.toolInstance.destroy();
  }
  /**
   * Tool could specify several entries to be displayed at the Toolbox (for example, "Heading 1", "Heading 2", "Heading 3")
   * This method returns the entry that is related to the Block (depended on the Block data)
   */
  async getActiveToolboxEntry() {
    const e = this.tool.toolbox;
    if (e.length === 1)
      return Promise.resolve(this.tool.toolbox[0]);
    const t = await this.data;
    return e.find((n) => Object.entries(n.data).some(([i, r]) => t[i] && Bu(t[i], r)));
  }
  /**
   * Make default Block wrappers and put Tool`s content there
   *
   * @returns {HTMLDivElement}
   */
  compose() {
    const e = m.make("div", re.CSS.wrapper), t = m.make("div", re.CSS.content), n = this.toolInstance.render();
    this.toolRenderedElement = n, t.appendChild(this.toolRenderedElement);
    let i = t;
    return [...this.tunesInstances.values(), ...this.defaultTunesInstances.values()].forEach((r) => {
      if (Z(r.wrap))
        try {
          i = r.wrap(i);
        } catch (s) {
          $(`Tune ${r.constructor.name} wrap method throws an Error %o`, "warn", s);
        }
    }), e.appendChild(i), e;
  }
  /**
   * Instantiate Block Tunes
   *
   * @param tunesData - current Block tunes data
   * @private
   */
  composeTunes(e) {
    Array.from(this.tunes.values()).forEach((t) => {
      (t.isInternal ? this.defaultTunesInstances : this.tunesInstances).set(t.name, t.create(e[t.name], this.blockAPI));
    }), Object.entries(e).forEach(([t, n]) => {
      this.tunesInstances.has(t) || (this.unavailableTunesData[t] = n);
    });
  }
  /**
   * Adds focus event listeners to all inputs and contenteditable
   */
  addInputEvents() {
    this.inputs.forEach((e) => {
      e.addEventListener("focus", this.handleFocus), m.isNativeInput(e) && e.addEventListener("input", this.didMutated);
    });
  }
  /**
   * removes focus event listeners from all inputs and contenteditable
   */
  removeInputEvents() {
    this.inputs.forEach((e) => {
      e.removeEventListener("focus", this.handleFocus), m.isNativeInput(e) && e.removeEventListener("input", this.didMutated);
    });
  }
  /**
   * Listen common editor Dom Changed event and detect mutations related to the  Block
   */
  watchBlockMutations() {
    var e;
    this.redactorDomChangedCallback = (t) => {
      const { mutations: n } = t;
      n.some((i) => Mu(i, this.toolRenderedElement)) && this.didMutated(n);
    }, (e = this.editorEventBus) == null || e.on(Vn, this.redactorDomChangedCallback);
  }
  /**
   * Remove redactor dom change event listener
   */
  unwatchBlockMutations() {
    var e;
    (e = this.editorEventBus) == null || e.off(Vn, this.redactorDomChangedCallback);
  }
  /**
   * Sometimes Tool can replace own main element, for example H2 -> H4 or UL -> OL
   * We need to detect such changes and update a link to tools main element with the new one
   *
   * @param mutations - records of block content mutations
   */
  detectToolRootChange(e) {
    e.forEach((t) => {
      if (Array.from(t.removedNodes).includes(this.toolRenderedElement)) {
        const n = t.addedNodes[t.addedNodes.length - 1];
        this.toolRenderedElement = n;
      }
    });
  }
  /**
   * Clears inputs cached value
   */
  dropInputsCache() {
    this.cachedInputs = [];
  }
}
class Lu extends W {
  constructor() {
    super(...arguments), this.insert = (e = this.config.defaultBlock, t = {}, n = {}, i, r, s, a) => {
      const l = this.Editor.BlockManager.insert({
        id: a,
        tool: e,
        data: t,
        index: i,
        needToFocus: r,
        replace: s
      });
      return new oo(l);
    }, this.composeBlockData = async (e) => {
      const t = this.Editor.Tools.blockTools.get(e);
      return new re({
        tool: t,
        api: this.Editor.API,
        readOnly: !0,
        data: {},
        tunesData: {}
      }).data;
    }, this.update = (e, t) => {
      const { BlockManager: n } = this.Editor, i = n.getBlockById(e);
      if (!i) {
        $("blocks.update(): Block with passed id was not found", "warn");
        return;
      }
      const r = n.getBlockIndex(i);
      n.insert({
        id: i.id,
        tool: i.name,
        data: t,
        index: r,
        replace: !0,
        tunes: i.tunes
      });
    };
  }
  /**
   * Available methods
   *
   * @returns {Blocks}
   */
  get methods() {
    return {
      clear: () => this.clear(),
      render: (e) => this.render(e),
      renderFromHTML: (e) => this.renderFromHTML(e),
      delete: (e) => this.delete(e),
      swap: (e, t) => this.swap(e, t),
      move: (e, t) => this.move(e, t),
      getBlockByIndex: (e) => this.getBlockByIndex(e),
      getById: (e) => this.getById(e),
      getCurrentBlockIndex: () => this.getCurrentBlockIndex(),
      getBlockIndex: (e) => this.getBlockIndex(e),
      getBlocksCount: () => this.getBlocksCount(),
      stretchBlock: (e, t = !0) => this.stretchBlock(e, t),
      insertNewBlock: () => this.insertNewBlock(),
      insert: this.insert,
      update: this.update,
      composeBlockData: this.composeBlockData
    };
  }
  /**
   * Returns Blocks count
   *
   * @returns {number}
   */
  getBlocksCount() {
    return this.Editor.BlockManager.blocks.length;
  }
  /**
   * Returns current block index
   *
   * @returns {number}
   */
  getCurrentBlockIndex() {
    return this.Editor.BlockManager.currentBlockIndex;
  }
  /**
   * Returns the index of Block by id;
   *
   * @param id - block id
   */
  getBlockIndex(e) {
    const t = this.Editor.BlockManager.getBlockById(e);
    if (!t) {
      _e("There is no block with id `" + e + "`", "warn");
      return;
    }
    return this.Editor.BlockManager.getBlockIndex(t);
  }
  /**
   * Returns BlockAPI object by Block index
   *
   * @param {number} index - index to get
   */
  getBlockByIndex(e) {
    const t = this.Editor.BlockManager.getBlockByIndex(e);
    if (t === void 0) {
      _e("There is no block at index `" + e + "`", "warn");
      return;
    }
    return new oo(t);
  }
  /**
   * Returns BlockAPI object by Block id
   *
   * @param id - id of block to get
   */
  getById(e) {
    const t = this.Editor.BlockManager.getBlockById(e);
    return t === void 0 ? (_e("There is no block with id `" + e + "`", "warn"), null) : new oo(t);
  }
  /**
   * Call Block Manager method that swap Blocks
   *
   * @param {number} fromIndex - position of first Block
   * @param {number} toIndex - position of second Block
   * @deprecated — use 'move' instead
   */
  swap(e, t) {
    $(
      "`blocks.swap()` method is deprecated and will be removed in the next major release. Use `block.move()` method instead",
      "info"
    ), this.Editor.BlockManager.swap(e, t);
  }
  /**
   * Move block from one index to another
   *
   * @param {number} toIndex - index to move to
   * @param {number} fromIndex - index to move from
   */
  move(e, t) {
    this.Editor.BlockManager.move(e, t);
  }
  /**
   * Deletes Block
   *
   * @param {number} blockIndex - index of Block to delete
   */
  delete(e) {
    try {
      this.Editor.BlockManager.removeBlock(e);
    } catch (t) {
      _e(t, "warn");
      return;
    }
    this.Editor.BlockManager.blocks.length === 0 && this.Editor.BlockManager.insert(), this.Editor.BlockManager.currentBlock && this.Editor.Caret.setToBlock(this.Editor.BlockManager.currentBlock, this.Editor.Caret.positions.END), this.Editor.Toolbar.close();
  }
  /**
   * Clear Editor's area
   */
  clear() {
    this.Editor.BlockManager.clear(!0), this.Editor.InlineToolbar.close();
  }
  /**
   * Fills Editor with Blocks data
   *
   * @param {OutputData} data — Saved Editor data
   */
  render(e) {
    return this.Editor.BlockManager.clear(), this.Editor.Renderer.render(e.blocks);
  }
  /**
   * Render passed HTML string
   *
   * @param {string} data - HTML string to render
   * @returns {Promise<void>}
   */
  renderFromHTML(e) {
    return this.Editor.BlockManager.clear(), this.Editor.Paste.processText(e, !0);
  }
  /**
   * Stretch Block's content
   *
   * @param {number} index - index of Block to stretch
   * @param {boolean} status - true to enable, false to disable
   * @deprecated Use BlockAPI interface to stretch Blocks
   */
  stretchBlock(e, t = !0) {
    $n(
      !0,
      "blocks.stretchBlock()",
      "BlockAPI"
    );
    const n = this.Editor.BlockManager.getBlockByIndex(e);
    n && (n.stretched = t);
  }
  /**
   * Insert new Block
   * After set caret to this Block
   *
   * @todo remove in 3.0.0
   * @deprecated with insert() method
   */
  insertNewBlock() {
    $("Method blocks.insertNewBlock() is deprecated and it will be removed in the next major release. Use blocks.insert() instead.", "warn"), this.insert();
  }
}
class Nu extends W {
  constructor() {
    super(...arguments), this.setToFirstBlock = (e = this.Editor.Caret.positions.DEFAULT, t = 0) => this.Editor.BlockManager.firstBlock ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.firstBlock, e, t), !0) : !1, this.setToLastBlock = (e = this.Editor.Caret.positions.DEFAULT, t = 0) => this.Editor.BlockManager.lastBlock ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.lastBlock, e, t), !0) : !1, this.setToPreviousBlock = (e = this.Editor.Caret.positions.DEFAULT, t = 0) => this.Editor.BlockManager.previousBlock ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.previousBlock, e, t), !0) : !1, this.setToNextBlock = (e = this.Editor.Caret.positions.DEFAULT, t = 0) => this.Editor.BlockManager.nextBlock ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.nextBlock, e, t), !0) : !1, this.setToBlock = (e, t = this.Editor.Caret.positions.DEFAULT, n = 0) => this.Editor.BlockManager.blocks[e] ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.blocks[e], t, n), !0) : !1, this.focus = (e = !1) => e ? this.setToLastBlock(this.Editor.Caret.positions.END) : this.setToFirstBlock(this.Editor.Caret.positions.START);
  }
  /**
   * Available methods
   *
   * @returns {Caret}
   */
  get methods() {
    return {
      setToFirstBlock: this.setToFirstBlock,
      setToLastBlock: this.setToLastBlock,
      setToPreviousBlock: this.setToPreviousBlock,
      setToNextBlock: this.setToNextBlock,
      setToBlock: this.setToBlock,
      focus: this.focus
    };
  }
}
class Ru extends W {
  /**
   * Available methods
   *
   * @returns {Events}
   */
  get methods() {
    return {
      emit: (e, t) => this.emit(e, t),
      off: (e, t) => this.off(e, t),
      on: (e, t) => this.on(e, t)
    };
  }
  /**
   * Subscribe on Events
   *
   * @param {string} eventName - event name to subscribe
   * @param {Function} callback - event handler
   */
  on(e, t) {
    this.eventsDispatcher.on(e, t);
  }
  /**
   * Emit event with data
   *
   * @param {string} eventName - event to emit
   * @param {object} data - event's data
   */
  emit(e, t) {
    this.eventsDispatcher.emit(e, t);
  }
  /**
   * Unsubscribe from Event
   *
   * @param {string} eventName - event to unsubscribe
   * @param {Function} callback - event handler
   */
  off(e, t) {
    this.eventsDispatcher.off(e, t);
  }
}
class bi extends W {
  /**
   * Return namespace section for tool or block tune
   *
   * @param tool - tool object
   */
  static getNamespace(e) {
    return e.isTune() ? `blockTunes.${e.name}` : `tools.${e.name}`;
  }
  /**
   * Return I18n API methods with global dictionary access
   */
  get methods() {
    return {
      t: () => {
        _e("I18n.t() method can be accessed only from Tools", "warn");
      }
    };
  }
  /**
   * Return I18n API methods with tool namespaced dictionary
   *
   * @param tool - Tool object
   */
  getMethodsForTool(e) {
    return Object.assign(
      this.methods,
      {
        t: (t) => me.t(bi.getNamespace(e), t)
      }
    );
  }
}
class Du extends W {
  /**
   * Editor.js Core API modules
   */
  get methods() {
    return {
      blocks: this.Editor.BlocksAPI.methods,
      caret: this.Editor.CaretAPI.methods,
      events: this.Editor.EventsAPI.methods,
      listeners: this.Editor.ListenersAPI.methods,
      notifier: this.Editor.NotifierAPI.methods,
      sanitizer: this.Editor.SanitizerAPI.methods,
      saver: this.Editor.SaverAPI.methods,
      selection: this.Editor.SelectionAPI.methods,
      styles: this.Editor.StylesAPI.classes,
      toolbar: this.Editor.ToolbarAPI.methods,
      inlineToolbar: this.Editor.InlineToolbarAPI.methods,
      tooltip: this.Editor.TooltipAPI.methods,
      i18n: this.Editor.I18nAPI.methods,
      readOnly: this.Editor.ReadOnlyAPI.methods,
      ui: this.Editor.UiAPI.methods
    };
  }
  /**
   * Returns Editor.js Core API methods for passed tool
   *
   * @param tool - tool object
   */
  getMethodsForTool(e) {
    return Object.assign(
      this.methods,
      {
        i18n: this.Editor.I18nAPI.getMethodsForTool(e)
      }
    );
  }
}
class Pu extends W {
  /**
   * Available methods
   *
   * @returns {InlineToolbar}
   */
  get methods() {
    return {
      close: () => this.close(),
      open: () => this.open()
    };
  }
  /**
   * Open Inline Toolbar
   */
  open() {
    this.Editor.InlineToolbar.tryToShow();
  }
  /**
   * Close Inline Toolbar
   */
  close() {
    this.Editor.InlineToolbar.close();
  }
}
class Fu extends W {
  /**
   * Available methods
   *
   * @returns {Listeners}
   */
  get methods() {
    return {
      on: (e, t, n, i) => this.on(e, t, n, i),
      off: (e, t, n, i) => this.off(e, t, n, i),
      offById: (e) => this.offById(e)
    };
  }
  /**
   * Ads a DOM event listener. Return it's id.
   *
   * @param {HTMLElement} element - Element to set handler to
   * @param {string} eventType - event type
   * @param {() => void} handler - event handler
   * @param {boolean} useCapture - capture event or not
   */
  on(e, t, n, i) {
    return this.listeners.on(e, t, n, i);
  }
  /**
   * Removes DOM listener from element
   *
   * @param {Element} element - Element to remove handler from
   * @param eventType - event type
   * @param handler - event handler
   * @param {boolean} useCapture - capture event or not
   */
  off(e, t, n, i) {
    this.listeners.off(e, t, n, i);
  }
  /**
   * Removes DOM listener by the listener id
   *
   * @param id - id of the listener to remove
   */
  offById(e) {
    this.listeners.offById(e);
  }
}
var Wn = {}, Hu = {
  get exports() {
    return Wn;
  },
  set exports(o) {
    Wn = o;
  }
};
(function(o, e) {
  (function(t, n) {
    o.exports = n();
  })(window, function() {
    return function(t) {
      var n = {};
      function i(r) {
        if (n[r])
          return n[r].exports;
        var s = n[r] = { i: r, l: !1, exports: {} };
        return t[r].call(s.exports, s, s.exports, i), s.l = !0, s.exports;
      }
      return i.m = t, i.c = n, i.d = function(r, s, a) {
        i.o(r, s) || Object.defineProperty(r, s, { enumerable: !0, get: a });
      }, i.r = function(r) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(r, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(r, "__esModule", { value: !0 });
      }, i.t = function(r, s) {
        if (1 & s && (r = i(r)), 8 & s || 4 & s && typeof r == "object" && r && r.__esModule)
          return r;
        var a = /* @__PURE__ */ Object.create(null);
        if (i.r(a), Object.defineProperty(a, "default", { enumerable: !0, value: r }), 2 & s && typeof r != "string")
          for (var l in r)
            i.d(a, l, function(c) {
              return r[c];
            }.bind(null, l));
        return a;
      }, i.n = function(r) {
        var s = r && r.__esModule ? function() {
          return r.default;
        } : function() {
          return r;
        };
        return i.d(s, "a", s), s;
      }, i.o = function(r, s) {
        return Object.prototype.hasOwnProperty.call(r, s);
      }, i.p = "/", i(i.s = 0);
    }([function(t, n, i) {
      i(1), /*!
      * Codex JavaScript Notification module
      * https://github.com/codex-team/js-notifier
      */
      t.exports = function() {
        var r = i(6), s = "cdx-notify--bounce-in", a = null;
        return { show: function(l) {
          if (l.message) {
            (function() {
              if (a)
                return !0;
              a = r.getWrapper(), document.body.appendChild(a);
            })();
            var c = null, u = l.time || 8e3;
            switch (l.type) {
              case "confirm":
                c = r.confirm(l);
                break;
              case "prompt":
                c = r.prompt(l);
                break;
              default:
                c = r.alert(l), window.setTimeout(function() {
                  c.remove();
                }, u);
            }
            a.appendChild(c), c.classList.add(s);
          }
        } };
      }();
    }, function(t, n, i) {
      var r = i(2);
      typeof r == "string" && (r = [[t.i, r, ""]]);
      var s = { hmr: !0, transform: void 0, insertInto: void 0 };
      i(4)(r, s), r.locals && (t.exports = r.locals);
    }, function(t, n, i) {
      (t.exports = i(3)(!1)).push([t.i, `.cdx-notify--error{background:#fffbfb!important}.cdx-notify--error::before{background:#fb5d5d!important}.cdx-notify__input{max-width:130px;padding:5px 10px;background:#f7f7f7;border:0;border-radius:3px;font-size:13px;color:#656b7c;outline:0}.cdx-notify__input:-ms-input-placeholder{color:#656b7c}.cdx-notify__input::placeholder{color:#656b7c}.cdx-notify__input:focus:-ms-input-placeholder{color:rgba(101,107,124,.3)}.cdx-notify__input:focus::placeholder{color:rgba(101,107,124,.3)}.cdx-notify__button{border:none;border-radius:3px;font-size:13px;padding:5px 10px;cursor:pointer}.cdx-notify__button:last-child{margin-left:10px}.cdx-notify__button--cancel{background:#f2f5f7;box-shadow:0 2px 1px 0 rgba(16,19,29,0);color:#656b7c}.cdx-notify__button--cancel:hover{background:#eee}.cdx-notify__button--confirm{background:#34c992;box-shadow:0 1px 1px 0 rgba(18,49,35,.05);color:#fff}.cdx-notify__button--confirm:hover{background:#33b082}.cdx-notify__btns-wrapper{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;margin-top:5px}.cdx-notify__cross{position:absolute;top:5px;right:5px;width:10px;height:10px;padding:5px;opacity:.54;cursor:pointer}.cdx-notify__cross::after,.cdx-notify__cross::before{content:'';position:absolute;left:9px;top:5px;height:12px;width:2px;background:#575d67}.cdx-notify__cross::before{transform:rotate(-45deg)}.cdx-notify__cross::after{transform:rotate(45deg)}.cdx-notify__cross:hover{opacity:1}.cdx-notifies{position:fixed;z-index:2;bottom:20px;left:20px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif}.cdx-notify{position:relative;width:220px;margin-top:15px;padding:13px 16px;background:#fff;box-shadow:0 11px 17px 0 rgba(23,32,61,.13);border-radius:5px;font-size:14px;line-height:1.4em;word-wrap:break-word}.cdx-notify::before{content:'';position:absolute;display:block;top:0;left:0;width:3px;height:calc(100% - 6px);margin:3px;border-radius:5px;background:0 0}@keyframes bounceIn{0%{opacity:0;transform:scale(.3)}50%{opacity:1;transform:scale(1.05)}70%{transform:scale(.9)}100%{transform:scale(1)}}.cdx-notify--bounce-in{animation-name:bounceIn;animation-duration:.6s;animation-iteration-count:1}.cdx-notify--success{background:#fafffe!important}.cdx-notify--success::before{background:#41ffb1!important}`, ""]);
    }, function(t, n) {
      t.exports = function(i) {
        var r = [];
        return r.toString = function() {
          return this.map(function(s) {
            var a = function(l, c) {
              var u = l[1] || "", d = l[3];
              if (!d)
                return u;
              if (c && typeof btoa == "function") {
                var h = (p = d, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(p)))) + " */"), f = d.sources.map(function(g) {
                  return "/*# sourceURL=" + d.sourceRoot + g + " */";
                });
                return [u].concat(f).concat([h]).join(`
`);
              }
              var p;
              return [u].join(`
`);
            }(s, i);
            return s[2] ? "@media " + s[2] + "{" + a + "}" : a;
          }).join("");
        }, r.i = function(s, a) {
          typeof s == "string" && (s = [[null, s, ""]]);
          for (var l = {}, c = 0; c < this.length; c++) {
            var u = this[c][0];
            typeof u == "number" && (l[u] = !0);
          }
          for (c = 0; c < s.length; c++) {
            var d = s[c];
            typeof d[0] == "number" && l[d[0]] || (a && !d[2] ? d[2] = a : a && (d[2] = "(" + d[2] + ") and (" + a + ")"), r.push(d));
          }
        }, r;
      };
    }, function(t, n, i) {
      var r, s, a = {}, l = (r = function() {
        return window && document && document.all && !window.atob;
      }, function() {
        return s === void 0 && (s = r.apply(this, arguments)), s;
      }), c = function(C) {
        var x = {};
        return function(L) {
          if (typeof L == "function")
            return L();
          if (x[L] === void 0) {
            var w = function(k) {
              return document.querySelector(k);
            }.call(this, L);
            if (window.HTMLIFrameElement && w instanceof window.HTMLIFrameElement)
              try {
                w = w.contentDocument.head;
              } catch {
                w = null;
              }
            x[L] = w;
          }
          return x[L];
        };
      }(), u = null, d = 0, h = [], f = i(5);
      function p(C, x) {
        for (var L = 0; L < C.length; L++) {
          var w = C[L], k = a[w.id];
          if (k) {
            k.refs++;
            for (var E = 0; E < k.parts.length; E++)
              k.parts[E](w.parts[E]);
            for (; E < w.parts.length; E++)
              k.parts.push(v(w.parts[E], x));
          } else {
            var M = [];
            for (E = 0; E < w.parts.length; E++)
              M.push(v(w.parts[E], x));
            a[w.id] = { id: w.id, refs: 1, parts: M };
          }
        }
      }
      function g(C, x) {
        for (var L = [], w = {}, k = 0; k < C.length; k++) {
          var E = C[k], M = x.base ? E[0] + x.base : E[0], A = { css: E[1], media: E[2], sourceMap: E[3] };
          w[M] ? w[M].parts.push(A) : L.push(w[M] = { id: M, parts: [A] });
        }
        return L;
      }
      function _(C, x) {
        var L = c(C.insertInto);
        if (!L)
          throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
        var w = h[h.length - 1];
        if (C.insertAt === "top")
          w ? w.nextSibling ? L.insertBefore(x, w.nextSibling) : L.appendChild(x) : L.insertBefore(x, L.firstChild), h.push(x);
        else if (C.insertAt === "bottom")
          L.appendChild(x);
        else {
          if (typeof C.insertAt != "object" || !C.insertAt.before)
            throw new Error(`[Style Loader]

 Invalid value for parameter 'insertAt' ('options.insertAt') found.
 Must be 'top', 'bottom', or Object.
 (https://github.com/webpack-contrib/style-loader#insertat)
`);
          var k = c(C.insertInto + " " + C.insertAt.before);
          L.insertBefore(x, k);
        }
      }
      function B(C) {
        if (C.parentNode === null)
          return !1;
        C.parentNode.removeChild(C);
        var x = h.indexOf(C);
        x >= 0 && h.splice(x, 1);
      }
      function T(C) {
        var x = document.createElement("style");
        return C.attrs.type === void 0 && (C.attrs.type = "text/css"), S(x, C.attrs), _(C, x), x;
      }
      function S(C, x) {
        Object.keys(x).forEach(function(L) {
          C.setAttribute(L, x[L]);
        });
      }
      function v(C, x) {
        var L, w, k, E;
        if (x.transform && C.css) {
          if (!(E = x.transform(C.css)))
            return function() {
            };
          C.css = E;
        }
        if (x.singleton) {
          var M = d++;
          L = u || (u = T(x)), w = P.bind(null, L, M, !1), k = P.bind(null, L, M, !0);
        } else
          C.sourceMap && typeof URL == "function" && typeof URL.createObjectURL == "function" && typeof URL.revokeObjectURL == "function" && typeof Blob == "function" && typeof btoa == "function" ? (L = function(A) {
            var N = document.createElement("link");
            return A.attrs.type === void 0 && (A.attrs.type = "text/css"), A.attrs.rel = "stylesheet", S(N, A.attrs), _(A, N), N;
          }(x), w = function(A, N, V) {
            var z = V.css, be = V.sourceMap, _i = N.convertToAbsoluteUrls === void 0 && be;
            (N.convertToAbsoluteUrls || _i) && (z = f(z)), be && (z += `
/*# sourceMappingURL=data:application/json;base64,` + btoa(unescape(encodeURIComponent(JSON.stringify(be)))) + " */");
            var wo = new Blob([z], { type: "text/css" }), yo = A.href;
            A.href = URL.createObjectURL(wo), yo && URL.revokeObjectURL(yo);
          }.bind(null, L, x), k = function() {
            B(L), L.href && URL.revokeObjectURL(L.href);
          }) : (L = T(x), w = function(A, N) {
            var V = N.css, z = N.media;
            if (z && A.setAttribute("media", z), A.styleSheet)
              A.styleSheet.cssText = V;
            else {
              for (; A.firstChild; )
                A.removeChild(A.firstChild);
              A.appendChild(document.createTextNode(V));
            }
          }.bind(null, L), k = function() {
            B(L);
          });
        return w(C), function(A) {
          if (A) {
            if (A.css === C.css && A.media === C.media && A.sourceMap === C.sourceMap)
              return;
            w(C = A);
          } else
            k();
        };
      }
      t.exports = function(C, x) {
        if (typeof DEBUG < "u" && DEBUG && typeof document != "object")
          throw new Error("The style-loader cannot be used in a non-browser environment");
        (x = x || {}).attrs = typeof x.attrs == "object" ? x.attrs : {}, x.singleton || typeof x.singleton == "boolean" || (x.singleton = l()), x.insertInto || (x.insertInto = "head"), x.insertAt || (x.insertAt = "bottom");
        var L = g(C, x);
        return p(L, x), function(w) {
          for (var k = [], E = 0; E < L.length; E++) {
            var M = L[E];
            (A = a[M.id]).refs--, k.push(A);
          }
          for (w && p(g(w, x), x), E = 0; E < k.length; E++) {
            var A;
            if ((A = k[E]).refs === 0) {
              for (var N = 0; N < A.parts.length; N++)
                A.parts[N]();
              delete a[A.id];
            }
          }
        };
      };
      var b, I = (b = [], function(C, x) {
        return b[C] = x, b.filter(Boolean).join(`
`);
      });
      function P(C, x, L, w) {
        var k = L ? "" : w.css;
        if (C.styleSheet)
          C.styleSheet.cssText = I(x, k);
        else {
          var E = document.createTextNode(k), M = C.childNodes;
          M[x] && C.removeChild(M[x]), M.length ? C.insertBefore(E, M[x]) : C.appendChild(E);
        }
      }
    }, function(t, n) {
      t.exports = function(i) {
        var r = typeof window < "u" && window.location;
        if (!r)
          throw new Error("fixUrls requires window.location");
        if (!i || typeof i != "string")
          return i;
        var s = r.protocol + "//" + r.host, a = s + r.pathname.replace(/\/[^\/]*$/, "/");
        return i.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(l, c) {
          var u, d = c.trim().replace(/^"(.*)"$/, function(h, f) {
            return f;
          }).replace(/^'(.*)'$/, function(h, f) {
            return f;
          });
          return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(d) ? l : (u = d.indexOf("//") === 0 ? d : d.indexOf("/") === 0 ? s + d : a + d.replace(/^\.\//, ""), "url(" + JSON.stringify(u) + ")");
        });
      };
    }, function(t, n, i) {
      var r, s, a, l, c, u, d, h, f;
      t.exports = (r = "cdx-notifies", s = "cdx-notify", a = "cdx-notify__cross", l = "cdx-notify__button--confirm", c = "cdx-notify__button--cancel", u = "cdx-notify__input", d = "cdx-notify__button", h = "cdx-notify__btns-wrapper", { alert: f = function(p) {
        var g = document.createElement("DIV"), _ = document.createElement("DIV"), B = p.message, T = p.style;
        return g.classList.add(s), T && g.classList.add(s + "--" + T), g.innerHTML = B, _.classList.add(a), _.addEventListener("click", g.remove.bind(g)), g.appendChild(_), g;
      }, confirm: function(p) {
        var g = f(p), _ = document.createElement("div"), B = document.createElement("button"), T = document.createElement("button"), S = g.querySelector("." + a), v = p.cancelHandler, b = p.okHandler;
        return _.classList.add(h), B.innerHTML = p.okText || "Confirm", T.innerHTML = p.cancelText || "Cancel", B.classList.add(d), T.classList.add(d), B.classList.add(l), T.classList.add(c), v && typeof v == "function" && (T.addEventListener("click", v), S.addEventListener("click", v)), b && typeof b == "function" && B.addEventListener("click", b), B.addEventListener("click", g.remove.bind(g)), T.addEventListener("click", g.remove.bind(g)), _.appendChild(B), _.appendChild(T), g.appendChild(_), g;
      }, prompt: function(p) {
        var g = f(p), _ = document.createElement("div"), B = document.createElement("button"), T = document.createElement("input"), S = g.querySelector("." + a), v = p.cancelHandler, b = p.okHandler;
        return _.classList.add(h), B.innerHTML = p.okText || "Ok", B.classList.add(d), B.classList.add(l), T.classList.add(u), p.placeholder && T.setAttribute("placeholder", p.placeholder), p.default && (T.value = p.default), p.inputType && (T.type = p.inputType), v && typeof v == "function" && S.addEventListener("click", v), b && typeof b == "function" && B.addEventListener("click", function() {
          b(T.value);
        }), B.addEventListener("click", g.remove.bind(g)), _.appendChild(T), _.appendChild(B), g.appendChild(_), g;
      }, getWrapper: function() {
        var p = document.createElement("DIV");
        return p.classList.add(r), p;
      } });
    }]);
  });
})(Hu);
const ju = /* @__PURE__ */ sn(Wn);
class Uu {
  /**
   * Show web notification
   *
   * @param {NotifierOptions | ConfirmNotifierOptions | PromptNotifierOptions} options - notification options
   */
  show(e) {
    ju.show(e);
  }
}
class zu extends W {
  /**
   * @param moduleConfiguration - Module Configuration
   * @param moduleConfiguration.config - Editor's config
   * @param moduleConfiguration.eventsDispatcher - Editor's event dispatcher
   */
  constructor({ config: e, eventsDispatcher: t }) {
    super({
      config: e,
      eventsDispatcher: t
    }), this.notifier = new Uu();
  }
  /**
   * Available methods
   */
  get methods() {
    return {
      show: (e) => this.show(e)
    };
  }
  /**
   * Show notification
   *
   * @param {NotifierOptions} options - message option
   */
  show(e) {
    return this.notifier.show(e);
  }
}
class $u extends W {
  /**
   * Available methods
   */
  get methods() {
    const e = () => this.isEnabled;
    return {
      toggle: (t) => this.toggle(t),
      get isEnabled() {
        return e();
      }
    };
  }
  /**
   * Set or toggle read-only state
   *
   * @param {boolean|undefined} state - set or toggle state
   * @returns {boolean} current value
   */
  toggle(e) {
    return this.Editor.ReadOnly.toggle(e);
  }
  /**
   * Returns current read-only state
   */
  get isEnabled() {
    return this.Editor.ReadOnly.isEnabled;
  }
}
var Yn = {}, Vu = {
  get exports() {
    return Yn;
  },
  set exports(o) {
    Yn = o;
  }
};
(function(o, e) {
  (function(t, n) {
    o.exports = n();
  })(fu, function() {
    function t(d) {
      var h = d.tags, f = Object.keys(h), p = f.map(function(g) {
        return typeof h[g];
      }).every(function(g) {
        return g === "object" || g === "boolean" || g === "function";
      });
      if (!p)
        throw new Error("The configuration was invalid");
      this.config = d;
    }
    var n = ["P", "LI", "TD", "TH", "DIV", "H1", "H2", "H3", "H4", "H5", "H6", "PRE"];
    function i(d) {
      return n.indexOf(d.nodeName) !== -1;
    }
    var r = ["A", "B", "STRONG", "I", "EM", "SUB", "SUP", "U", "STRIKE"];
    function s(d) {
      return r.indexOf(d.nodeName) !== -1;
    }
    t.prototype.clean = function(d) {
      const h = document.implementation.createHTMLDocument(), f = h.createElement("div");
      return f.innerHTML = d, this._sanitize(h, f), f.innerHTML;
    }, t.prototype._sanitize = function(d, h) {
      var f = a(d, h), p = f.firstChild();
      if (p)
        do {
          if (p.nodeType === Node.TEXT_NODE)
            if (p.data.trim() === "" && (p.previousElementSibling && i(p.previousElementSibling) || p.nextElementSibling && i(p.nextElementSibling))) {
              h.removeChild(p), this._sanitize(d, h);
              break;
            } else
              continue;
          if (p.nodeType === Node.COMMENT_NODE) {
            h.removeChild(p), this._sanitize(d, h);
            break;
          }
          var g = s(p), _;
          g && (_ = Array.prototype.some.call(p.childNodes, i));
          var B = !!h.parentNode, T = i(h) && i(p) && B, S = p.nodeName.toLowerCase(), v = l(this.config, S, p), b = g && _;
          if (b || c(p, v) || !this.config.keepNestedBlockElements && T) {
            if (!(p.nodeName === "SCRIPT" || p.nodeName === "STYLE"))
              for (; p.childNodes.length > 0; )
                h.insertBefore(p.childNodes[0], p);
            h.removeChild(p), this._sanitize(d, h);
            break;
          }
          for (var I = 0; I < p.attributes.length; I += 1) {
            var P = p.attributes[I];
            u(P, v, p) && (p.removeAttribute(P.name), I = I - 1);
          }
          this._sanitize(d, p);
        } while (p = f.nextSibling());
    };
    function a(d, h) {
      return d.createTreeWalker(
        h,
        NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT,
        null,
        !1
      );
    }
    function l(d, h, f) {
      return typeof d.tags[h] == "function" ? d.tags[h](f) : d.tags[h];
    }
    function c(d, h) {
      return typeof h > "u" ? !0 : typeof h == "boolean" ? !h : !1;
    }
    function u(d, h, f) {
      var p = d.name.toLowerCase();
      return h === !0 ? !1 : typeof h[p] == "function" ? !h[p](d.value, f) : typeof h[p] > "u" || h[p] === !1 ? !0 : typeof h[p] == "string" ? h[p] !== d.value : !1;
    }
    return t;
  });
})(Vu);
const Wu = Yn;
function Xs(o, e) {
  return o.map((t) => {
    const n = Z(e) ? e(t.tool) : e;
    return Me(n) || (t.data = vi(t.data, n)), t;
  });
}
function ze(o, e = {}) {
  const t = {
    tags: e
  };
  return new Wu(t).clean(o);
}
function vi(o, e) {
  return Array.isArray(o) ? Yu(o, e) : ce(o) ? Xu(o, e) : nt(o) ? Ku(o, e) : o;
}
function Yu(o, e) {
  return o.map((t) => vi(t, e));
}
function Xu(o, e) {
  const t = {};
  for (const n in o) {
    if (!Object.prototype.hasOwnProperty.call(o, n))
      continue;
    const i = o[n], r = qu(e[n]) ? e[n] : e;
    t[n] = vi(i, r);
  }
  return t;
}
function Ku(o, e) {
  return ce(e) ? ze(o, e) : e === !1 ? ze(o, {}) : o;
}
function qu(o) {
  return ce(o) || vu(o) || Z(o);
}
class Gu extends W {
  /**
   * Available methods
   *
   * @returns {SanitizerConfig}
   */
  get methods() {
    return {
      clean: (e, t) => this.clean(e, t)
    };
  }
  /**
   * Perform sanitizing of a string
   *
   * @param {string} taintString - what to sanitize
   * @param {SanitizerConfig} config - sanitizer config
   * @returns {string}
   */
  clean(e, t) {
    return ze(e, t);
  }
}
class Zu extends W {
  /**
   * Available methods
   *
   * @returns {Saver}
   */
  get methods() {
    return {
      save: () => this.save()
    };
  }
  /**
   * Return Editor's data
   *
   * @returns {OutputData}
   */
  save() {
    const e = "Editor's content can not be saved in read-only mode";
    return this.Editor.ReadOnly.isEnabled ? (_e(e, "warn"), Promise.reject(new Error(e))) : this.Editor.Saver.save();
  }
}
class Ju extends W {
  /**
   * Available methods
   *
   * @returns {SelectionAPIInterface}
   */
  get methods() {
    return {
      findParentTag: (e, t) => this.findParentTag(e, t),
      expandToTag: (e) => this.expandToTag(e)
    };
  }
  /**
   * Looks ahead from selection and find passed tag with class name
   *
   * @param {string} tagName - tag to find
   * @param {string} className - tag's class name
   * @returns {HTMLElement|null}
   */
  findParentTag(e, t) {
    return new R().findParentTag(e, t);
  }
  /**
   * Expand selection to passed tag
   *
   * @param {HTMLElement} node - tag that should contain selection
   */
  expandToTag(e) {
    new R().expandToTag(e);
  }
}
class Qu extends W {
  /**
   * Exported classes
   */
  get classes() {
    return {
      /**
       * Base Block styles
       */
      block: "cdx-block",
      /**
       * Inline Tools styles
       */
      inlineToolButton: "ce-inline-tool",
      inlineToolButtonActive: "ce-inline-tool--active",
      /**
       * UI elements
       */
      input: "cdx-input",
      loader: "cdx-loader",
      button: "cdx-button",
      /**
       * Settings styles
       */
      settingsButton: "cdx-settings-button",
      settingsButtonActive: "cdx-settings-button--active"
    };
  }
}
class eh extends W {
  /**
   * Available methods
   *
   * @returns {Toolbar}
   */
  get methods() {
    return {
      close: () => this.close(),
      open: () => this.open(),
      toggleBlockSettings: (e) => this.toggleBlockSettings(e),
      toggleToolbox: (e) => this.toggleToolbox(e)
    };
  }
  /**
   * Open toolbar
   */
  open() {
    this.Editor.Toolbar.moveAndOpen();
  }
  /**
   * Close toolbar and all included elements
   */
  close() {
    this.Editor.Toolbar.close();
  }
  /**
   * Toggles Block Setting of the current block
   *
   * @param {boolean} openingState —  opening state of Block Setting
   */
  toggleBlockSettings(e) {
    if (this.Editor.BlockManager.currentBlockIndex === -1) {
      _e("Could't toggle the Toolbar because there is no block selected ", "warn");
      return;
    }
    e ?? !this.Editor.BlockSettings.opened ? (this.Editor.Toolbar.moveAndOpen(), this.Editor.BlockSettings.open()) : this.Editor.BlockSettings.close();
  }
  /**
   * Open toolbox
   *
   * @param {boolean} openingState - Opening state of toolbox
   */
  toggleToolbox(e) {
    if (this.Editor.BlockManager.currentBlockIndex === -1) {
      _e("Could't toggle the Toolbox because there is no block selected ", "warn");
      return;
    }
    e ?? !this.Editor.Toolbar.toolbox.opened ? (this.Editor.Toolbar.moveAndOpen(), this.Editor.Toolbar.toolbox.open()) : this.Editor.Toolbar.toolbox.close();
  }
}
var Xn = {}, th = {
  get exports() {
    return Xn;
  },
  set exports(o) {
    Xn = o;
  }
};
/*!
 * CodeX.Tooltips
 * 
 * @version 1.0.5
 * 
 * @licence MIT
 * @author CodeX <https://codex.so>
 * 
 * 
 */
(function(o, e) {
  (function(t, n) {
    o.exports = n();
  })(window, function() {
    return function(t) {
      var n = {};
      function i(r) {
        if (n[r])
          return n[r].exports;
        var s = n[r] = { i: r, l: !1, exports: {} };
        return t[r].call(s.exports, s, s.exports, i), s.l = !0, s.exports;
      }
      return i.m = t, i.c = n, i.d = function(r, s, a) {
        i.o(r, s) || Object.defineProperty(r, s, { enumerable: !0, get: a });
      }, i.r = function(r) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(r, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(r, "__esModule", { value: !0 });
      }, i.t = function(r, s) {
        if (1 & s && (r = i(r)), 8 & s || 4 & s && typeof r == "object" && r && r.__esModule)
          return r;
        var a = /* @__PURE__ */ Object.create(null);
        if (i.r(a), Object.defineProperty(a, "default", { enumerable: !0, value: r }), 2 & s && typeof r != "string")
          for (var l in r)
            i.d(a, l, function(c) {
              return r[c];
            }.bind(null, l));
        return a;
      }, i.n = function(r) {
        var s = r && r.__esModule ? function() {
          return r.default;
        } : function() {
          return r;
        };
        return i.d(s, "a", s), s;
      }, i.o = function(r, s) {
        return Object.prototype.hasOwnProperty.call(r, s);
      }, i.p = "", i(i.s = 0);
    }([function(t, n, i) {
      t.exports = i(1);
    }, function(t, n, i) {
      i.r(n), i.d(n, "default", function() {
        return r;
      });
      class r {
        constructor() {
          this.nodes = { wrapper: null, content: null }, this.showed = !1, this.offsetTop = 10, this.offsetLeft = 10, this.offsetRight = 10, this.hidingDelay = 0, this.handleWindowScroll = () => {
            this.showed && this.hide(!0);
          }, this.loadStyles(), this.prepare(), window.addEventListener("scroll", this.handleWindowScroll, { passive: !0 });
        }
        get CSS() {
          return { tooltip: "ct", tooltipContent: "ct__content", tooltipShown: "ct--shown", placement: { left: "ct--left", bottom: "ct--bottom", right: "ct--right", top: "ct--top" } };
        }
        show(a, l, c) {
          this.nodes.wrapper || this.prepare(), this.hidingTimeout && clearTimeout(this.hidingTimeout);
          const u = Object.assign({ placement: "bottom", marginTop: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, delay: 70, hidingDelay: 0 }, c);
          if (u.hidingDelay && (this.hidingDelay = u.hidingDelay), this.nodes.content.innerHTML = "", typeof l == "string")
            this.nodes.content.appendChild(document.createTextNode(l));
          else {
            if (!(l instanceof Node))
              throw Error("[CodeX Tooltip] Wrong type of «content» passed. It should be an instance of Node or String. But " + typeof l + " given.");
            this.nodes.content.appendChild(l);
          }
          switch (this.nodes.wrapper.classList.remove(...Object.values(this.CSS.placement)), u.placement) {
            case "top":
              this.placeTop(a, u);
              break;
            case "left":
              this.placeLeft(a, u);
              break;
            case "right":
              this.placeRight(a, u);
              break;
            case "bottom":
            default:
              this.placeBottom(a, u);
          }
          u && u.delay ? this.showingTimeout = setTimeout(() => {
            this.nodes.wrapper.classList.add(this.CSS.tooltipShown), this.showed = !0;
          }, u.delay) : (this.nodes.wrapper.classList.add(this.CSS.tooltipShown), this.showed = !0);
        }
        hide(a = !1) {
          if (this.hidingDelay && !a)
            return this.hidingTimeout && clearTimeout(this.hidingTimeout), void (this.hidingTimeout = setTimeout(() => {
              this.hide(!0);
            }, this.hidingDelay));
          this.nodes.wrapper.classList.remove(this.CSS.tooltipShown), this.showed = !1, this.showingTimeout && clearTimeout(this.showingTimeout);
        }
        onHover(a, l, c) {
          a.addEventListener("mouseenter", () => {
            this.show(a, l, c);
          }), a.addEventListener("mouseleave", () => {
            this.hide();
          });
        }
        destroy() {
          this.nodes.wrapper.remove(), window.removeEventListener("scroll", this.handleWindowScroll);
        }
        prepare() {
          this.nodes.wrapper = this.make("div", this.CSS.tooltip), this.nodes.content = this.make("div", this.CSS.tooltipContent), this.append(this.nodes.wrapper, this.nodes.content), this.append(document.body, this.nodes.wrapper);
        }
        loadStyles() {
          const a = "codex-tooltips-style";
          if (document.getElementById(a))
            return;
          const l = i(2), c = this.make("style", null, { textContent: l.toString(), id: a });
          this.prepend(document.head, c);
        }
        placeBottom(a, l) {
          const c = a.getBoundingClientRect(), u = c.left + a.clientWidth / 2 - this.nodes.wrapper.offsetWidth / 2, d = c.bottom + window.pageYOffset + this.offsetTop + l.marginTop;
          this.applyPlacement("bottom", u, d);
        }
        placeTop(a, l) {
          const c = a.getBoundingClientRect(), u = c.left + a.clientWidth / 2 - this.nodes.wrapper.offsetWidth / 2, d = c.top + window.pageYOffset - this.nodes.wrapper.clientHeight - this.offsetTop;
          this.applyPlacement("top", u, d);
        }
        placeLeft(a, l) {
          const c = a.getBoundingClientRect(), u = c.left - this.nodes.wrapper.offsetWidth - this.offsetLeft - l.marginLeft, d = c.top + window.pageYOffset + a.clientHeight / 2 - this.nodes.wrapper.offsetHeight / 2;
          this.applyPlacement("left", u, d);
        }
        placeRight(a, l) {
          const c = a.getBoundingClientRect(), u = c.right + this.offsetRight + l.marginRight, d = c.top + window.pageYOffset + a.clientHeight / 2 - this.nodes.wrapper.offsetHeight / 2;
          this.applyPlacement("right", u, d);
        }
        applyPlacement(a, l, c) {
          this.nodes.wrapper.classList.add(this.CSS.placement[a]), this.nodes.wrapper.style.left = l + "px", this.nodes.wrapper.style.top = c + "px";
        }
        make(a, l = null, c = {}) {
          const u = document.createElement(a);
          Array.isArray(l) ? u.classList.add(...l) : l && u.classList.add(l);
          for (const d in c)
            c.hasOwnProperty(d) && (u[d] = c[d]);
          return u;
        }
        append(a, l) {
          Array.isArray(l) ? l.forEach((c) => a.appendChild(c)) : a.appendChild(l);
        }
        prepend(a, l) {
          Array.isArray(l) ? (l = l.reverse()).forEach((c) => a.prepend(c)) : a.prepend(l);
        }
      }
    }, function(t, n) {
      t.exports = `.ct{z-index:999;opacity:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;-webkit-transition:opacity 50ms ease-in,-webkit-transform 70ms cubic-bezier(.215,.61,.355,1);transition:opacity 50ms ease-in,-webkit-transform 70ms cubic-bezier(.215,.61,.355,1);transition:opacity 50ms ease-in,transform 70ms cubic-bezier(.215,.61,.355,1);transition:opacity 50ms ease-in,transform 70ms cubic-bezier(.215,.61,.355,1),-webkit-transform 70ms cubic-bezier(.215,.61,.355,1);will-change:opacity,top,left;-webkit-box-shadow:0 8px 12px 0 rgba(29,32,43,.17),0 4px 5px -3px rgba(5,6,12,.49);box-shadow:0 8px 12px 0 rgba(29,32,43,.17),0 4px 5px -3px rgba(5,6,12,.49);border-radius:9px}.ct,.ct:before{position:absolute;top:0;left:0}.ct:before{content:"";bottom:0;right:0;background-color:#1d202b;z-index:-1;border-radius:4px}@supports(-webkit-mask-box-image:url("")){.ct:before{border-radius:0;-webkit-mask-box-image:url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M10.71 0h2.58c3.02 0 4.64.42 6.1 1.2a8.18 8.18 0 013.4 3.4C23.6 6.07 24 7.7 24 10.71v2.58c0 3.02-.42 4.64-1.2 6.1a8.18 8.18 0 01-3.4 3.4c-1.47.8-3.1 1.21-6.11 1.21H10.7c-3.02 0-4.64-.42-6.1-1.2a8.18 8.18 0 01-3.4-3.4C.4 17.93 0 16.3 0 13.29V10.7c0-3.02.42-4.64 1.2-6.1a8.18 8.18 0 013.4-3.4C6.07.4 7.7 0 10.71 0z"/></svg>') 48% 41% 37.9% 53.3%}}@media (--mobile){.ct{display:none}}.ct__content{padding:6px 10px;color:#cdd1e0;font-size:12px;text-align:center;letter-spacing:.02em;line-height:1em}.ct:after{content:"";width:8px;height:8px;position:absolute;background-color:#1d202b;z-index:-1}.ct--bottom{-webkit-transform:translateY(5px);transform:translateY(5px)}.ct--bottom:after{top:-3px;left:50%;-webkit-transform:translateX(-50%) rotate(-45deg);transform:translateX(-50%) rotate(-45deg)}.ct--top{-webkit-transform:translateY(-5px);transform:translateY(-5px)}.ct--top:after{top:auto;bottom:-3px;left:50%;-webkit-transform:translateX(-50%) rotate(-45deg);transform:translateX(-50%) rotate(-45deg)}.ct--left{-webkit-transform:translateX(-5px);transform:translateX(-5px)}.ct--left:after{top:50%;left:auto;right:0;-webkit-transform:translate(41.6%,-50%) rotate(-45deg);transform:translate(41.6%,-50%) rotate(-45deg)}.ct--right{-webkit-transform:translateX(5px);transform:translateX(5px)}.ct--right:after{top:50%;left:0;-webkit-transform:translate(-41.6%,-50%) rotate(-45deg);transform:translate(-41.6%,-50%) rotate(-45deg)}.ct--shown{opacity:1;-webkit-transform:none;transform:none}`;
    }]).default;
  });
})(th);
const oh = /* @__PURE__ */ sn(Xn);
class wi {
  constructor() {
    this.lib = new oh();
  }
  /**
   * Release the library
   */
  destroy() {
    this.lib.destroy();
  }
  /**
   * Shows tooltip on element with passed HTML content
   *
   * @param {HTMLElement} element - any HTML element in DOM
   * @param content - tooltip's content
   * @param options - showing settings
   */
  show(e, t, n) {
    this.lib.show(e, t, n);
  }
  /**
   * Hides tooltip
   *
   * @param skipHidingDelay — pass true to immediately hide the tooltip
   */
  hide(e = !1) {
    this.lib.hide(e);
  }
  /**
   * Binds 'mouseenter' and 'mouseleave' events that shows/hides the Tooltip
   *
   * @param {HTMLElement} element - any HTML element in DOM
   * @param content - tooltip's content
   * @param options - showing settings
   */
  onHover(e, t, n) {
    this.lib.onHover(e, t, n);
  }
}
class nh extends W {
  /**
   * @class
   * @param moduleConfiguration - Module Configuration
   * @param moduleConfiguration.config - Editor's config
   * @param moduleConfiguration.eventsDispatcher - Editor's event dispatcher
   */
  constructor({ config: e, eventsDispatcher: t }) {
    super({
      config: e,
      eventsDispatcher: t
    }), this.tooltip = new wi();
  }
  /**
   * Destroy Module
   */
  destroy() {
    this.tooltip.destroy();
  }
  /**
   * Available methods
   */
  get methods() {
    return {
      show: (e, t, n) => this.show(e, t, n),
      hide: () => this.hide(),
      onHover: (e, t, n) => this.onHover(e, t, n)
    };
  }
  /**
   * Method show tooltip on element with passed HTML content
   *
   * @param {HTMLElement} element - element on which tooltip should be shown
   * @param {TooltipContent} content - tooltip content
   * @param {TooltipOptions} options - tooltip options
   */
  show(e, t, n) {
    this.tooltip.show(e, t, n);
  }
  /**
   * Method hides tooltip on HTML page
   */
  hide() {
    this.tooltip.hide();
  }
  /**
   * Decorator for showing Tooltip by mouseenter/mouseleave
   *
   * @param {HTMLElement} element - element on which tooltip should be shown
   * @param {TooltipContent} content - tooltip content
   * @param {TooltipOptions} options - tooltip options
   */
  onHover(e, t, n) {
    this.tooltip.onHover(e, t, n);
  }
}
class ih extends W {
  /**
   * Available methods / getters
   */
  get methods() {
    return {
      nodes: this.editorNodes
      /**
       * There can be added some UI methods, like toggleThinMode() etc
       */
    };
  }
  /**
   * Exported classes
   */
  get editorNodes() {
    return {
      /**
       * Top-level editor instance wrapper
       */
      wrapper: this.Editor.UI.nodes.wrapper,
      /**
       * Element that holds all the Blocks
       */
      redactor: this.Editor.UI.nodes.redactor
    };
  }
}
function Ks(o, e) {
  const t = {};
  return Object.entries(o).forEach(([n, i]) => {
    if (ce(i)) {
      const r = e ? `${e}.${n}` : n;
      Object.values(i).every((s) => nt(s)) ? t[n] = r : t[n] = Ks(i, r);
      return;
    }
    t[n] = i;
  }), t;
}
const Oe = Ks(zs);
function rh(o, e) {
  const t = {};
  return Object.keys(o).forEach((n) => {
    const i = e[n];
    i !== void 0 ? t[i] = o[n] : t[n] = o[n];
  }), t;
}
const sh = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 12L9 7.1C9 7.04477 9.04477 7 9.1 7H10.4C11.5 7 14 7.1 14 9.5C14 9.5 14 12 11 12M9 12V16.8C9 16.9105 9.08954 17 9.2 17H12.5C14 17 15 16 15 14.5C15 11.7046 11 12 11 12M9 12H11"/></svg>', qs = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 10L11.8586 14.8586C11.9367 14.9367 12.0633 14.9367 12.1414 14.8586L17 10"/></svg>', ah = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 15L11.8586 10.1414C11.9367 10.0633 12.0633 10.0633 12.1414 10.1414L17 15"/></svg>', lh = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 8L12 12M12 12L16 16M12 12L16 8M12 12L8 16"/></svg>', ch = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/></svg>', dh = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M13.34 10C12.4223 12.7337 11 17 11 17"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M14.21 7H14.2"/></svg>', Cr = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7.69998 12.6L7.67896 12.62C6.53993 13.7048 6.52012 15.5155 7.63516 16.625V16.625C8.72293 17.7073 10.4799 17.7102 11.5712 16.6314L13.0263 15.193C14.0703 14.1609 14.2141 12.525 13.3662 11.3266L13.22 11.12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16.22 11.12L16.3564 10.9805C17.2895 10.0265 17.3478 8.5207 16.4914 7.49733V7.49733C15.5691 6.39509 13.9269 6.25143 12.8271 7.17675L11.3901 8.38588C10.0935 9.47674 9.95706 11.4241 11.0888 12.6852L11.12 12.72"/></svg>', uh = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.40999 7.29999H9.4"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 7.29999H14.59"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.30999 12H9.3"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 12H14.59"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.40999 16.7H9.4"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 16.7H14.59"/></svg>', hh = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 7V12M12 17V12M17 12H12M12 12H7"/></svg>', ph = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="5.5" stroke="currentColor" stroke-width="2"/><line x1="15.4142" x2="19" y1="15" y2="18.5858" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>', fh = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M15.7795 11.5C15.7795 11.5 16.053 11.1962 16.5497 10.6722C17.4442 9.72856 17.4701 8.2475 16.5781 7.30145V7.30145C15.6482 6.31522 14.0873 6.29227 13.1288 7.25073L11.8796 8.49999"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8.24517 12.3883C8.24517 12.3883 7.97171 12.6922 7.47504 13.2161C6.58051 14.1598 6.55467 15.6408 7.44666 16.5869V16.5869C8.37653 17.5731 9.93744 17.5961 10.8959 16.6376L12.1452 15.3883"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M17.7802 15.1032L16.597 14.9422C16.0109 14.8624 15.4841 15.3059 15.4627 15.8969L15.4199 17.0818"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6.39064 9.03238L7.58432 9.06668C8.17551 9.08366 8.6522 8.58665 8.61056 7.99669L8.5271 6.81397"/><line x1="12.1142" x2="11.7" y1="12.2" y2="11.7858" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>';
class te {
  /**
   * Constructs popover item instance
   *
   * @param params - popover item construction params
   */
  constructor(e) {
    this.nodes = {
      root: null,
      icon: null
    }, this.confirmationState = null, this.removeSpecialFocusBehavior = () => {
      this.nodes.root.classList.remove(te.CSS.noFocus);
    }, this.removeSpecialHoverBehavior = () => {
      this.nodes.root.classList.remove(te.CSS.noHover);
    }, this.onErrorAnimationEnd = () => {
      this.nodes.icon.classList.remove(te.CSS.wobbleAnimation), this.nodes.icon.removeEventListener("animationend", this.onErrorAnimationEnd);
    }, this.params = e, this.nodes.root = this.make(e);
  }
  /**
   * True if item is disabled and hence not clickable
   */
  get isDisabled() {
    return this.params.isDisabled;
  }
  /**
   * Exposes popover item toggle parameter
   */
  get toggle() {
    return this.params.toggle;
  }
  /**
   * Item title
   */
  get title() {
    return this.params.title;
  }
  /**
   * True if popover should close once item is activated
   */
  get closeOnActivate() {
    return this.params.closeOnActivate;
  }
  /**
   * True if confirmation state is enabled for popover item
   */
  get isConfirmationStateEnabled() {
    return this.confirmationState !== null;
  }
  /**
   * True if item is focused in keyboard navigation process
   */
  get isFocused() {
    return this.nodes.root.classList.contains(te.CSS.focused);
  }
  /**
   * Popover item CSS classes
   */
  static get CSS() {
    return {
      container: "ce-popover-item",
      title: "ce-popover-item__title",
      secondaryTitle: "ce-popover-item__secondary-title",
      icon: "ce-popover-item__icon",
      active: "ce-popover-item--active",
      disabled: "ce-popover-item--disabled",
      focused: "ce-popover-item--focused",
      hidden: "ce-popover-item--hidden",
      confirmationState: "ce-popover-item--confirmation",
      noHover: "ce-popover-item--no-hover",
      noFocus: "ce-popover-item--no-focus",
      wobbleAnimation: "wobble"
    };
  }
  /**
   * Returns popover item root element
   */
  getElement() {
    return this.nodes.root;
  }
  /**
   * Called on popover item click
   */
  handleClick() {
    if (this.isConfirmationStateEnabled) {
      this.activateOrEnableConfirmationMode(this.confirmationState);
      return;
    }
    this.activateOrEnableConfirmationMode(this.params);
  }
  /**
   * Toggles item active state
   *
   * @param isActive - true if item should strictly should become active
   */
  toggleActive(e) {
    this.nodes.root.classList.toggle(te.CSS.active, e);
  }
  /**
   * Toggles item hidden state
   *
   * @param isHidden - true if item should be hidden
   */
  toggleHidden(e) {
    this.nodes.root.classList.toggle(te.CSS.hidden, e);
  }
  /**
   * Resets popover item to its original state
   */
  reset() {
    this.isConfirmationStateEnabled && this.disableConfirmationMode();
  }
  /**
   * Method called once item becomes focused during keyboard navigation
   */
  onFocus() {
    this.disableSpecialHoverAndFocusBehavior();
  }
  /**
   * Constructs HTML element corresponding to popover item params
   *
   * @param params - item construction params
   */
  make(e) {
    const t = m.make("div", te.CSS.container);
    return e.name && (t.dataset.itemName = e.name), this.nodes.icon = m.make("div", te.CSS.icon, {
      innerHTML: e.icon || ch
    }), t.appendChild(this.nodes.icon), t.appendChild(m.make("div", te.CSS.title, {
      innerHTML: e.title || ""
    })), e.secondaryLabel && t.appendChild(m.make("div", te.CSS.secondaryTitle, {
      textContent: e.secondaryLabel
    })), e.isActive && t.classList.add(te.CSS.active), e.isDisabled && t.classList.add(te.CSS.disabled), t;
  }
  /**
   * Activates confirmation mode for the item.
   *
   * @param newState - new popover item params that should be applied
   */
  enableConfirmationMode(e) {
    const t = {
      ...this.params,
      ...e,
      confirmation: e.confirmation
    }, n = this.make(t);
    this.nodes.root.innerHTML = n.innerHTML, this.nodes.root.classList.add(te.CSS.confirmationState), this.confirmationState = e, this.enableSpecialHoverAndFocusBehavior();
  }
  /**
   * Returns item to its original state
   */
  disableConfirmationMode() {
    const e = this.make(this.params);
    this.nodes.root.innerHTML = e.innerHTML, this.nodes.root.classList.remove(te.CSS.confirmationState), this.confirmationState = null, this.disableSpecialHoverAndFocusBehavior();
  }
  /**
   * Enables special focus and hover behavior for item in confirmation state.
   * This is needed to prevent item from being highlighted as hovered/focused just after click.
   */
  enableSpecialHoverAndFocusBehavior() {
    this.nodes.root.classList.add(te.CSS.noHover), this.nodes.root.classList.add(te.CSS.noFocus), this.nodes.root.addEventListener("mouseleave", this.removeSpecialHoverBehavior, { once: !0 });
  }
  /**
   * Disables special focus and hover behavior
   */
  disableSpecialHoverAndFocusBehavior() {
    this.removeSpecialFocusBehavior(), this.removeSpecialHoverBehavior(), this.nodes.root.removeEventListener("mouseleave", this.removeSpecialHoverBehavior);
  }
  /**
   * Executes item's onActivate callback if the item has no confirmation configured
   *
   * @param item - item to activate or bring to confirmation mode
   */
  activateOrEnableConfirmationMode(e) {
    if (e.confirmation === void 0)
      try {
        e.onActivate(e), this.disableConfirmationMode();
      } catch {
        this.animateError();
      }
    else
      this.enableConfirmationMode(e.confirmation);
  }
  /**
   * Animates item which symbolizes that error occured while executing 'onActivate()' callback
   */
  animateError() {
    this.nodes.icon.classList.contains(te.CSS.wobbleAnimation) || (this.nodes.icon.classList.add(te.CSS.wobbleAnimation), this.nodes.icon.addEventListener("animationend", this.onErrorAnimationEnd));
  }
}
const Yt = class {
  /**
   * @param {HTMLElement[]} nodeList — the list of iterable HTML-items
   * @param {string} focusedCssClass - user-provided CSS-class that will be set in flipping process
   */
  constructor(o, e) {
    this.cursor = -1, this.items = [], this.items = o || [], this.focusedCssClass = e;
  }
  /**
   * Returns Focused button Node
   *
   * @returns {HTMLElement}
   */
  get currentItem() {
    return this.cursor === -1 ? null : this.items[this.cursor];
  }
  /**
   * Sets cursor to specified position
   *
   * @param cursorPosition - new cursor position
   */
  setCursor(o) {
    o < this.items.length && o >= -1 && (this.dropCursor(), this.cursor = o, this.items[this.cursor].classList.add(this.focusedCssClass));
  }
  /**
   * Sets items. Can be used when iterable items changed dynamically
   *
   * @param {HTMLElement[]} nodeList - nodes to iterate
   */
  setItems(o) {
    this.items = o;
  }
  /**
   * Sets cursor next to the current
   */
  next() {
    this.cursor = this.leafNodesAndReturnIndex(Yt.directions.RIGHT);
  }
  /**
   * Sets cursor before current
   */
  previous() {
    this.cursor = this.leafNodesAndReturnIndex(Yt.directions.LEFT);
  }
  /**
   * Sets cursor to the default position and removes CSS-class from previously focused item
   */
  dropCursor() {
    this.cursor !== -1 && (this.items[this.cursor].classList.remove(this.focusedCssClass), this.cursor = -1);
  }
  /**
   * Leafs nodes inside the target list from active element
   *
   * @param {string} direction - leaf direction. Can be 'left' or 'right'
   * @returns {number} index of focused node
   */
  leafNodesAndReturnIndex(o) {
    if (this.items.length === 0)
      return this.cursor;
    let e = this.cursor;
    return e === -1 ? e = o === Yt.directions.RIGHT ? -1 : 0 : this.items[e].classList.remove(this.focusedCssClass), o === Yt.directions.RIGHT ? e = (e + 1) % this.items.length : e = (this.items.length + e - 1) % this.items.length, m.canSetCaret(this.items[e]) && vt(() => R.setCursor(this.items[e]), 50)(), this.items[e].classList.add(this.focusedCssClass), e;
  }
};
let Bt = Yt;
Bt.directions = {
  RIGHT: "right",
  LEFT: "left"
};
class Ye {
  /**
   * @param {FlipperOptions} options - different constructing settings
   */
  constructor(e) {
    this.iterator = null, this.activated = !1, this.flipCallbacks = [], this.onKeyDown = (t) => {
      if (this.isEventReadyForHandling(t))
        switch (Ye.usedKeys.includes(t.keyCode) && t.preventDefault(), t.keyCode) {
          case j.TAB:
            this.handleTabPress(t);
            break;
          case j.LEFT:
          case j.UP:
            this.flipLeft();
            break;
          case j.RIGHT:
          case j.DOWN:
            this.flipRight();
            break;
          case j.ENTER:
            this.handleEnterPress(t);
            break;
        }
    }, this.iterator = new Bt(e.items, e.focusedItemClass), this.activateCallback = e.activateCallback, this.allowedKeys = e.allowedKeys || Ye.usedKeys;
  }
  /**
   * True if flipper is currently activated
   */
  get isActivated() {
    return this.activated;
  }
  /**
   * Array of keys (codes) that is handled by Flipper
   * Used to:
   *  - preventDefault only for this keys, not all keydowns (@see constructor)
   *  - to skip external behaviours only for these keys, when filler is activated (@see BlockEvents@arrowRightAndDown)
   */
  static get usedKeys() {
    return [
      j.TAB,
      j.LEFT,
      j.RIGHT,
      j.ENTER,
      j.UP,
      j.DOWN
    ];
  }
  /**
   * Active tab/arrows handling by flipper
   *
   * @param items - Some modules (like, InlineToolbar, BlockSettings) might refresh buttons dynamically
   * @param cursorPosition - index of the item that should be focused once flipper is activated
   */
  activate(e, t) {
    this.activated = !0, e && this.iterator.setItems(e), t !== void 0 && this.iterator.setCursor(t), document.addEventListener("keydown", this.onKeyDown, !0);
  }
  /**
   * Disable tab/arrows handling by flipper
   */
  deactivate() {
    this.activated = !1, this.dropCursor(), document.removeEventListener("keydown", this.onKeyDown);
  }
  /**
   * Focus first item
   */
  focusFirst() {
    this.dropCursor(), this.flipRight();
  }
  /**
   * Focuses previous flipper iterator item
   */
  flipLeft() {
    this.iterator.previous(), this.flipCallback();
  }
  /**
   * Focuses next flipper iterator item
   */
  flipRight() {
    this.iterator.next(), this.flipCallback();
  }
  /**
   * Return true if some button is focused
   */
  hasFocus() {
    return !!this.iterator.currentItem;
  }
  /**
   * Registeres function that should be executed on each navigation action
   *
   * @param cb - function to execute
   */
  onFlip(e) {
    this.flipCallbacks.push(e);
  }
  /**
   * Unregisteres function that is executed on each navigation action
   *
   * @param cb - function to stop executing
   */
  removeOnFlip(e) {
    this.flipCallbacks = this.flipCallbacks.filter((t) => t !== e);
  }
  /**
   * Drops flipper's iterator cursor
   *
   * @see DomIterator#dropCursor
   */
  dropCursor() {
    this.iterator.dropCursor();
  }
  /**
   * This function is fired before handling flipper keycodes
   * The result of this function defines if it is need to be handled or not
   *
   * @param {KeyboardEvent} event - keydown keyboard event
   * @returns {boolean}
   */
  isEventReadyForHandling(e) {
    return this.activated && this.allowedKeys.includes(e.keyCode);
  }
  /**
   * When flipper is activated tab press will leaf the items
   *
   * @param {KeyboardEvent} event - tab keydown event
   */
  handleTabPress(e) {
    switch (e.shiftKey ? Bt.directions.LEFT : Bt.directions.RIGHT) {
      case Bt.directions.RIGHT:
        this.flipRight();
        break;
      case Bt.directions.LEFT:
        this.flipLeft();
        break;
    }
  }
  /**
   * Enter press will click current item if flipper is activated
   *
   * @param {KeyboardEvent} event - enter keydown event
   */
  handleEnterPress(e) {
    this.activated && (this.iterator.currentItem && (e.stopPropagation(), e.preventDefault(), this.iterator.currentItem.click()), Z(this.activateCallback) && this.activateCallback(this.iterator.currentItem));
  }
  /**
   * Fired after flipping in any direction
   */
  flipCallback() {
    this.iterator.currentItem && this.iterator.currentItem.scrollIntoViewIfNeeded(), this.flipCallbacks.forEach((e) => e());
  }
}
class no {
  /**
   * Styles
   */
  static get CSS() {
    return {
      wrapper: "cdx-search-field",
      icon: "cdx-search-field__icon",
      input: "cdx-search-field__input"
    };
  }
  /**
   * @param options - available config
   * @param options.items - searchable items list
   * @param options.onSearch - search callback
   * @param options.placeholder - input placeholder
   */
  constructor({ items: e, onSearch: t, placeholder: n }) {
    this.listeners = new mi(), this.items = e, this.onSearch = t, this.render(n);
  }
  /**
   * Returns search field element
   */
  getElement() {
    return this.wrapper;
  }
  /**
   * Sets focus to the input
   */
  focus() {
    this.input.focus();
  }
  /**
   * Clears search query and results
   */
  clear() {
    this.input.value = "", this.searchQuery = "", this.onSearch("", this.foundItems);
  }
  /**
   * Clears memory
   */
  destroy() {
    this.listeners.removeAll();
  }
  /**
   * Creates the search field
   *
   * @param placeholder - input placeholder
   */
  render(e) {
    this.wrapper = m.make("div", no.CSS.wrapper);
    const t = m.make("div", no.CSS.icon, {
      innerHTML: ph
    });
    this.input = m.make("input", no.CSS.input, {
      placeholder: e
    }), this.wrapper.appendChild(t), this.wrapper.appendChild(this.input), this.listeners.on(this.input, "input", () => {
      this.searchQuery = this.input.value, this.onSearch(this.searchQuery, this.foundItems);
    });
  }
  /**
   * Returns list of found items for the current search query
   */
  get foundItems() {
    return this.items.filter((e) => this.checkItem(e));
  }
  /**
   * Contains logic for checking whether passed item conforms the search query
   *
   * @param item - item to be checked
   */
  checkItem(e) {
    var t;
    const n = ((t = e.title) == null ? void 0 : t.toLowerCase()) || "", i = this.searchQuery.toLowerCase();
    return n.includes(i);
  }
}
const Xt = class {
  /**
   * Locks body element scroll
   */
  lock() {
    Sr ? this.lockHard() : document.body.classList.add(Xt.CSS.scrollLocked);
  }
  /**
   * Unlocks body element scroll
   */
  unlock() {
    Sr ? this.unlockHard() : document.body.classList.remove(Xt.CSS.scrollLocked);
  }
  /**
   * Locks scroll in a hard way (via setting fixed position to body element)
   */
  lockHard() {
    this.scrollPosition = window.pageYOffset, document.documentElement.style.setProperty(
      "--window-scroll-offset",
      `${this.scrollPosition}px`
    ), document.body.classList.add(Xt.CSS.scrollLockedHard);
  }
  /**
   * Unlocks hard scroll lock
   */
  unlockHard() {
    document.body.classList.remove(Xt.CSS.scrollLockedHard), this.scrollPosition !== null && window.scrollTo(0, this.scrollPosition), this.scrollPosition = null;
  }
};
let Gs = Xt;
Gs.CSS = {
  scrollLocked: "ce-scroll-locked",
  scrollLockedHard: "ce-scroll-locked--hard"
};
var gh = Object.defineProperty, mh = Object.getOwnPropertyDescriptor, bh = (o, e, t, n) => {
  for (var i = n > 1 ? void 0 : n ? mh(e, t) : e, r = o.length - 1, s; r >= 0; r--)
    (s = o[r]) && (i = (n ? s(e, t, i) : s(i)) || i);
  return n && i && gh(e, t, i), i;
}, uo = /* @__PURE__ */ ((o) => (o.Close = "close", o))(uo || {});
const ae = class extends an {
  /**
   * Constructs the instance
   *
   * @param params - popover construction params
   */
  constructor(o) {
    super(), this.scopeElement = document.body, this.listeners = new mi(), this.scrollLocker = new Gs(), this.nodes = {
      wrapper: null,
      popover: null,
      nothingFoundMessage: null,
      customContent: null,
      items: null,
      overlay: null
    }, this.messages = {
      nothingFound: "Nothing found",
      search: "Search"
    }, this.onFlip = () => {
      this.items.find((e) => e.isFocused).onFocus();
    }, this.items = o.items.map((e) => new te(e)), o.scopeElement !== void 0 && (this.scopeElement = o.scopeElement), o.messages && (this.messages = {
      ...this.messages,
      ...o.messages
    }), o.customContentFlippableItems && (this.customContentFlippableItems = o.customContentFlippableItems), this.make(), o.customContent && this.addCustomContent(o.customContent), o.searchable && this.addSearch(), this.initializeFlipper();
  }
  /**
   * Popover CSS classes
   */
  static get CSS() {
    return {
      popover: "ce-popover",
      popoverOpenTop: "ce-popover--open-top",
      popoverOpened: "ce-popover--opened",
      search: "ce-popover__search",
      nothingFoundMessage: "ce-popover__nothing-found-message",
      nothingFoundMessageDisplayed: "ce-popover__nothing-found-message--displayed",
      customContent: "ce-popover__custom-content",
      customContentHidden: "ce-popover__custom-content--hidden",
      items: "ce-popover__items",
      overlay: "ce-popover__overlay",
      overlayHidden: "ce-popover__overlay--hidden"
    };
  }
  /**
   * Returns HTML element corresponding to the popover
   */
  getElement() {
    return this.nodes.wrapper;
  }
  /**
   * Returns true if some item inside popover is focused
   */
  hasFocus() {
    return this.flipper.hasFocus();
  }
  /**
   * Open popover
   */
  show() {
    this.shouldOpenBottom || (this.nodes.popover.style.setProperty("--popover-height", this.height + "px"), this.nodes.popover.classList.add(ae.CSS.popoverOpenTop)), this.nodes.overlay.classList.remove(ae.CSS.overlayHidden), this.nodes.popover.classList.add(ae.CSS.popoverOpened), this.flipper.activate(this.flippableElements), this.search !== void 0 && setTimeout(() => {
      this.search.focus();
    }, 100), pt() && this.scrollLocker.lock();
  }
  /**
   * Closes popover
   */
  hide() {
    this.nodes.popover.classList.remove(ae.CSS.popoverOpened), this.nodes.popover.classList.remove(ae.CSS.popoverOpenTop), this.nodes.overlay.classList.add(ae.CSS.overlayHidden), this.flipper.deactivate(), this.items.forEach((o) => o.reset()), this.search !== void 0 && this.search.clear(), pt() && this.scrollLocker.unlock(), this.emit(
      "close"
      /* Close */
    );
  }
  /**
   * Clears memory
   */
  destroy() {
    this.flipper.deactivate(), this.listeners.removeAll(), pt() && this.scrollLocker.unlock();
  }
  /**
   * Constructs HTML element corresponding to popover
   */
  make() {
    this.nodes.popover = m.make("div", [ae.CSS.popover]), this.nodes.nothingFoundMessage = m.make("div", [ae.CSS.nothingFoundMessage], {
      textContent: this.messages.nothingFound
    }), this.nodes.popover.appendChild(this.nodes.nothingFoundMessage), this.nodes.items = m.make("div", [ae.CSS.items]), this.items.forEach((o) => {
      this.nodes.items.appendChild(o.getElement());
    }), this.nodes.popover.appendChild(this.nodes.items), this.listeners.on(this.nodes.popover, "click", (o) => {
      const e = this.getTargetItem(o);
      e !== void 0 && this.handleItemClick(e);
    }), this.nodes.wrapper = m.make("div"), this.nodes.overlay = m.make("div", [ae.CSS.overlay, ae.CSS.overlayHidden]), this.listeners.on(this.nodes.overlay, "click", () => {
      this.hide();
    }), this.nodes.wrapper.appendChild(this.nodes.overlay), this.nodes.wrapper.appendChild(this.nodes.popover);
  }
  /**
   * Adds search to the popover
   */
  addSearch() {
    this.search = new no({
      items: this.items,
      placeholder: this.messages.search,
      onSearch: (e, t) => {
        this.items.forEach((i) => {
          const r = !t.includes(i);
          i.toggleHidden(r);
        }), this.toggleNothingFoundMessage(t.length === 0), this.toggleCustomContent(e !== "");
        const n = e === "" ? this.flippableElements : t.map((i) => i.getElement());
        this.flipper.isActivated && (this.flipper.deactivate(), this.flipper.activate(n));
      }
    });
    const o = this.search.getElement();
    o.classList.add(ae.CSS.search), this.nodes.popover.insertBefore(o, this.nodes.popover.firstChild);
  }
  /**
   * Adds custom html content to the popover
   *
   * @param content - html content to append
   */
  addCustomContent(o) {
    this.nodes.customContent = o, this.nodes.customContent.classList.add(ae.CSS.customContent), this.nodes.popover.insertBefore(o, this.nodes.popover.firstChild);
  }
  /**
   * Retrieves popover item that is the target of the specified event
   *
   * @param event - event to retrieve popover item from
   */
  getTargetItem(o) {
    return this.items.find((e) => o.composedPath().includes(e.getElement()));
  }
  /**
   * Handles item clicks
   *
   * @param item - item to handle click of
   */
  handleItemClick(o) {
    o.isDisabled || (this.items.filter((e) => e !== o).forEach((e) => e.reset()), o.handleClick(), this.toggleItemActivenessIfNeeded(o), o.closeOnActivate && this.hide());
  }
  /**
   * Creates Flipper instance which allows to navigate between popover items via keyboard
   */
  initializeFlipper() {
    this.flipper = new Ye({
      items: this.flippableElements,
      focusedItemClass: te.CSS.focused,
      allowedKeys: [
        j.TAB,
        j.UP,
        j.DOWN,
        j.ENTER
      ]
    }), this.flipper.onFlip(this.onFlip);
  }
  /**
   * Returns list of elements available for keyboard navigation.
   * Contains both usual popover items elements and custom html content.
   */
  get flippableElements() {
    const o = this.items.map((e) => e.getElement());
    return (this.customContentFlippableItems || []).concat(o);
  }
  get height() {
    let o = 0;
    if (this.nodes.popover === null)
      return o;
    const e = this.nodes.popover.cloneNode(!0);
    return e.style.visibility = "hidden", e.style.position = "absolute", e.style.top = "-1000px", e.classList.add(ae.CSS.popoverOpened), document.body.appendChild(e), o = e.offsetHeight, e.remove(), o;
  }
  /**
   * Checks if popover should be opened bottom.
   * It should happen when there is enough space below or not enough space above
   */
  get shouldOpenBottom() {
    const o = this.nodes.popover.getBoundingClientRect(), e = this.scopeElement.getBoundingClientRect(), t = this.height, n = o.top + t, i = o.top - t, r = Math.min(window.innerHeight, e.bottom);
    return i < e.top || n <= r;
  }
  /**
   * Toggles nothing found message visibility
   *
   * @param isDisplayed - true if the message should be displayed
   */
  toggleNothingFoundMessage(o) {
    this.nodes.nothingFoundMessage.classList.toggle(ae.CSS.nothingFoundMessageDisplayed, o);
  }
  /**
   * Toggles custom content visibility
   *
   * @param isDisplayed - true if custom content should be displayed
   */
  toggleCustomContent(o) {
    var e;
    (e = this.nodes.customContent) == null || e.classList.toggle(ae.CSS.customContentHidden, o);
  }
  /**
   * - Toggles item active state, if clicked popover item has property 'toggle' set to true.
   *
   * - Performs radiobutton-like behavior if the item has property 'toggle' set to string key.
   * (All the other items with the same key get inactive, and the item gets active)
   *
   * @param clickedItem - popover item that was clicked
   */
  toggleItemActivenessIfNeeded(o) {
    if (o.toggle === !0 && o.toggleActive(), typeof o.toggle == "string") {
      const e = this.items.filter((t) => t.toggle === o.toggle);
      if (e.length === 1) {
        o.toggleActive();
        return;
      }
      e.forEach((t) => {
        t.toggleActive(t === o);
      });
    }
  }
};
let yi = ae;
bh([
  Ut
], yi.prototype, "height", 1);
class vh extends W {
  constructor() {
    super(...arguments), this.opened = !1, this.selection = new R(), this.onPopoverClose = () => {
      this.close();
    };
  }
  /**
   * Module Events
   *
   * @returns {{opened: string, closed: string}}
   */
  get events() {
    return {
      opened: "block-settings-opened",
      closed: "block-settings-closed"
    };
  }
  /**
   * Block Settings CSS
   */
  get CSS() {
    return {
      settings: "ce-settings"
    };
  }
  /**
   * Getter for inner popover's flipper instance
   *
   * @todo remove once BlockSettings becomes standalone non-module class
   */
  get flipper() {
    var e;
    return (e = this.popover) == null ? void 0 : e.flipper;
  }
  /**
   * Panel with block settings with 2 sections:
   *  - Tool's Settings
   *  - Default Settings [Move, Remove, etc]
   */
  make() {
    this.nodes.wrapper = m.make("div", [this.CSS.settings]);
  }
  /**
   * Destroys module
   */
  destroy() {
    this.removeAllNodes();
  }
  /**
   * Open Block Settings pane
   *
   * @param targetBlock - near which Block we should open BlockSettings
   */
  open(e = this.Editor.BlockManager.currentBlock) {
    this.opened = !0, this.selection.save(), e.selected = !0, this.Editor.BlockSelection.clearCache();
    const [t, n] = e.getTunes();
    this.eventsDispatcher.emit(this.events.opened), this.popover = new yi({
      searchable: !0,
      items: t.map((i) => this.resolveTuneAliases(i)),
      customContent: n,
      customContentFlippableItems: this.getControls(n),
      scopeElement: this.Editor.API.methods.ui.nodes.redactor,
      messages: {
        nothingFound: me.ui(Oe.ui.popover, "Nothing found"),
        search: me.ui(Oe.ui.popover, "Filter")
      }
    }), this.popover.on(uo.Close, this.onPopoverClose), this.nodes.wrapper.append(this.popover.getElement()), this.popover.show();
  }
  /**
   * Returns root block settings element
   */
  getElement() {
    return this.nodes.wrapper;
  }
  /**
   * Close Block Settings pane
   */
  close() {
    this.opened = !1, R.isAtEditor || this.selection.restore(), this.selection.clearSaved(), !this.Editor.CrossBlockSelection.isCrossBlockSelectionStarted && this.Editor.BlockManager.currentBlock && (this.Editor.BlockManager.currentBlock.selected = !1), this.eventsDispatcher.emit(this.events.closed), this.popover && (this.popover.off(uo.Close, this.onPopoverClose), this.popover.destroy(), this.popover.getElement().remove(), this.popover = null);
  }
  /**
   * Returns list of buttons and inputs inside specified container
   *
   * @param container - container to query controls inside of
   */
  getControls(e) {
    const { StylesAPI: t } = this.Editor, n = e.querySelectorAll(
      `.${t.classes.settingsButton}, ${m.allInputsSelector}`
    );
    return Array.from(n);
  }
  /**
   * Resolves aliases in tunes menu items
   *
   * @param item - item with resolved aliases
   */
  resolveTuneAliases(e) {
    const t = rh(e, { label: "title" });
    return e.confirmation && (t.confirmation = this.resolveTuneAliases(e.confirmation)), t;
  }
}
class Ee extends W {
  constructor() {
    super(...arguments), this.opened = !1, this.tools = [], this.flipper = null, this.togglingCallback = null;
  }
  /**
   * CSS getter
   */
  static get CSS() {
    return {
      conversionToolbarWrapper: "ce-conversion-toolbar",
      conversionToolbarShowed: "ce-conversion-toolbar--showed",
      conversionToolbarTools: "ce-conversion-toolbar__tools",
      conversionToolbarLabel: "ce-conversion-toolbar__label",
      conversionTool: "ce-conversion-tool",
      conversionToolHidden: "ce-conversion-tool--hidden",
      conversionToolIcon: "ce-conversion-tool__icon",
      conversionToolFocused: "ce-conversion-tool--focused",
      conversionToolActive: "ce-conversion-tool--active"
    };
  }
  /**
   * Create UI of Conversion Toolbar
   */
  make() {
    this.nodes.wrapper = m.make("div", [
      Ee.CSS.conversionToolbarWrapper,
      ...this.isRtl ? [this.Editor.UI.CSS.editorRtlFix] : []
    ]), this.nodes.tools = m.make("div", Ee.CSS.conversionToolbarTools);
    const e = m.make("div", Ee.CSS.conversionToolbarLabel, {
      textContent: me.ui(Oe.ui.inlineToolbar.converter, "Convert to")
    });
    return this.addTools(), this.enableFlipper(), m.append(this.nodes.wrapper, e), m.append(this.nodes.wrapper, this.nodes.tools), this.nodes.wrapper;
  }
  /**
   * Deactivates flipper and removes all nodes
   */
  destroy() {
    this.flipper && (this.flipper.deactivate(), this.flipper = null), this.removeAllNodes();
  }
  /**
   * Toggle conversion dropdown visibility
   *
   * @param {Function} [togglingCallback] — callback that will accept opening state
   */
  toggle(e) {
    this.opened ? this.close() : this.open(), Z(e) && (this.togglingCallback = e);
  }
  /**
   * Shows Conversion Toolbar
   */
  open() {
    this.filterTools(), this.opened = !0, this.nodes.wrapper.classList.add(Ee.CSS.conversionToolbarShowed), window.requestAnimationFrame(() => {
      this.flipper.activate(this.tools.map((e) => e.button).filter((e) => !e.classList.contains(Ee.CSS.conversionToolHidden))), this.flipper.focusFirst(), Z(this.togglingCallback) && this.togglingCallback(!0);
    });
  }
  /**
   * Closes Conversion Toolbar
   */
  close() {
    this.opened = !1, this.flipper.deactivate(), this.nodes.wrapper.classList.remove(Ee.CSS.conversionToolbarShowed), Z(this.togglingCallback) && this.togglingCallback(!1);
  }
  /**
   * Returns true if it has more than one tool available for convert in
   */
  hasTools() {
    return this.tools.length === 1 ? this.tools[0].name !== this.config.defaultBlock : !0;
  }
  /**
   * Replaces one Block with another
   * For that Tools must provide import/export methods
   *
   * @param {string} replacingToolName - name of Tool which replaces current
   * @param blockDataOverrides - Block data overrides. Could be passed in case if Multiple Toolbox items specified
   */
  async replaceWithBlock(e, t) {
    const n = this.Editor.BlockManager.currentBlock.tool, i = (await this.Editor.BlockManager.currentBlock.save()).data, r = this.Editor.Tools.blockTools.get(e);
    let s = "";
    const a = n.conversionConfig.export;
    if (Z(a))
      s = a(i);
    else if (nt(a))
      s = i[a];
    else {
      $("Conversion «export» property must be a string or function. String means key of saved data object to export. Function should export processed string to export.");
      return;
    }
    const l = ze(
      s,
      r.sanitizeConfig
    );
    let c = {};
    const u = r.conversionConfig.import;
    if (Z(u))
      c = u(l);
    else if (nt(u))
      c[u] = l;
    else {
      $("Conversion «import» property must be a string or function. String means key of tool data to import. Function accepts a imported string and return composed tool data.");
      return;
    }
    t && (c = Object.assign(c, t)), this.Editor.BlockManager.replace({
      tool: e,
      data: c
    }), this.Editor.BlockSelection.clearSelection(), this.close(), this.Editor.InlineToolbar.close(), vt(() => {
      this.Editor.Caret.setToBlock(this.Editor.BlockManager.currentBlock);
    }, 10)();
  }
  /**
   * Iterates existing Tools and inserts to the ConversionToolbar
   * if tools have ability to import
   */
  addTools() {
    const e = this.Editor.Tools.blockTools;
    Array.from(e.entries()).forEach(([t, n]) => {
      const i = n.conversionConfig;
      !i || !i.import || n.toolbox.forEach(
        (r) => this.addToolIfValid(t, r)
      );
    });
  }
  /**
   * Inserts a tool to the ConversionToolbar if the tool's toolbox config is valid
   *
   * @param name - tool's name
   * @param toolboxSettings - tool's single toolbox setting
   */
  addToolIfValid(e, t) {
    Me(t) || !t.icon || this.addTool(e, t);
  }
  /**
   * Add tool to the Conversion Toolbar
   *
   * @param toolName - name of Tool to add
   * @param toolboxItem - tool's toolbox item data
   */
  addTool(e, t) {
    const n = m.make("div", [Ee.CSS.conversionTool]), i = m.make("div", [Ee.CSS.conversionToolIcon]);
    n.dataset.tool = e, i.innerHTML = t.icon, m.append(n, i), m.append(n, m.text(me.t(Oe.toolNames, t.title || Xo(e)))), m.append(this.nodes.tools, n), this.tools.push({
      name: e,
      button: n,
      toolboxItem: t
    }), this.listeners.on(n, "click", async () => {
      await this.replaceWithBlock(e, t.data);
    });
  }
  /**
   * Hide current Tool and show others
   */
  async filterTools() {
    const { currentBlock: e } = this.Editor.BlockManager, t = await e.getActiveToolboxEntry();
    function n(i, r) {
      return i.icon === r.icon && i.title === r.title;
    }
    this.tools.forEach((i) => {
      let r = !1;
      if (t) {
        const s = n(t, i.toolboxItem);
        r = i.button.dataset.tool === e.name && s;
      }
      i.button.hidden = r, i.button.classList.toggle(Ee.CSS.conversionToolHidden, r);
    });
  }
  /**
   * Prepare Flipper to be able to leaf tools by arrows/tab
   */
  enableFlipper() {
    this.flipper = new Ye({
      focusedItemClass: Ee.CSS.conversionToolFocused
    });
  }
}
var Kn = {}, wh = {
  get exports() {
    return Kn;
  },
  set exports(o) {
    Kn = o;
  }
};
/*!
 * Library for handling keyboard shortcuts
 * @copyright CodeX (https://codex.so)
 * @license MIT
 * @author CodeX (https://codex.so)
 * @version 1.2.0
 */
(function(o, e) {
  (function(t, n) {
    o.exports = n();
  })(window, function() {
    return function(t) {
      var n = {};
      function i(r) {
        if (n[r])
          return n[r].exports;
        var s = n[r] = { i: r, l: !1, exports: {} };
        return t[r].call(s.exports, s, s.exports, i), s.l = !0, s.exports;
      }
      return i.m = t, i.c = n, i.d = function(r, s, a) {
        i.o(r, s) || Object.defineProperty(r, s, { enumerable: !0, get: a });
      }, i.r = function(r) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(r, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(r, "__esModule", { value: !0 });
      }, i.t = function(r, s) {
        if (1 & s && (r = i(r)), 8 & s || 4 & s && typeof r == "object" && r && r.__esModule)
          return r;
        var a = /* @__PURE__ */ Object.create(null);
        if (i.r(a), Object.defineProperty(a, "default", { enumerable: !0, value: r }), 2 & s && typeof r != "string")
          for (var l in r)
            i.d(a, l, function(c) {
              return r[c];
            }.bind(null, l));
        return a;
      }, i.n = function(r) {
        var s = r && r.__esModule ? function() {
          return r.default;
        } : function() {
          return r;
        };
        return i.d(s, "a", s), s;
      }, i.o = function(r, s) {
        return Object.prototype.hasOwnProperty.call(r, s);
      }, i.p = "", i(i.s = 0);
    }([function(t, n, i) {
      function r(l, c) {
        for (var u = 0; u < c.length; u++) {
          var d = c[u];
          d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(l, d.key, d);
        }
      }
      function s(l, c, u) {
        return c && r(l.prototype, c), u && r(l, u), l;
      }
      i.r(n);
      var a = function() {
        function l(c) {
          var u = this;
          (function(d, h) {
            if (!(d instanceof h))
              throw new TypeError("Cannot call a class as a function");
          })(this, l), this.commands = {}, this.keys = {}, this.name = c.name, this.parseShortcutName(c.name), this.element = c.on, this.callback = c.callback, this.executeShortcut = function(d) {
            u.execute(d);
          }, this.element.addEventListener("keydown", this.executeShortcut, !1);
        }
        return s(l, null, [{ key: "supportedCommands", get: function() {
          return { SHIFT: ["SHIFT"], CMD: ["CMD", "CONTROL", "COMMAND", "WINDOWS", "CTRL"], ALT: ["ALT", "OPTION"] };
        } }, { key: "keyCodes", get: function() {
          return { 0: 48, 1: 49, 2: 50, 3: 51, 4: 52, 5: 53, 6: 54, 7: 55, 8: 56, 9: 57, A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90, BACKSPACE: 8, ENTER: 13, ESCAPE: 27, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, INSERT: 45, DELETE: 46, ".": 190 };
        } }]), s(l, [{ key: "parseShortcutName", value: function(c) {
          c = c.split("+");
          for (var u = 0; u < c.length; u++) {
            c[u] = c[u].toUpperCase();
            var d = !1;
            for (var h in l.supportedCommands)
              if (l.supportedCommands[h].includes(c[u])) {
                d = this.commands[h] = !0;
                break;
              }
            d || (this.keys[c[u]] = !0);
          }
          for (var f in l.supportedCommands)
            this.commands[f] || (this.commands[f] = !1);
        } }, { key: "execute", value: function(c) {
          var u, d = { CMD: c.ctrlKey || c.metaKey, SHIFT: c.shiftKey, ALT: c.altKey }, h = !0;
          for (u in this.commands)
            this.commands[u] !== d[u] && (h = !1);
          var f, p = !0;
          for (f in this.keys)
            p = p && c.keyCode === l.keyCodes[f];
          h && p && this.callback(c);
        } }, { key: "remove", value: function() {
          this.element.removeEventListener("keydown", this.executeShortcut);
        } }]), l;
      }();
      n.default = a;
    }]).default;
  });
})(wh);
const yh = /* @__PURE__ */ sn(Kn);
class kh {
  constructor() {
    this.registeredShortcuts = /* @__PURE__ */ new Map();
  }
  /**
   * Register shortcut
   *
   * @param shortcut - shortcut options
   */
  add(e) {
    if (this.findShortcut(e.on, e.name))
      throw Error(
        `Shortcut ${e.name} is already registered for ${e.on}. Please remove it before add a new handler.`
      );
    const t = new yh({
      name: e.name,
      on: e.on,
      callback: e.handler
    }), n = this.registeredShortcuts.get(e.on) || [];
    this.registeredShortcuts.set(e.on, [...n, t]);
  }
  /**
   * Remove shortcut
   *
   * @param element - Element shortcut is set for
   * @param name - shortcut name
   */
  remove(e, t) {
    const n = this.findShortcut(e, t);
    if (!n)
      return;
    n.remove();
    const i = this.registeredShortcuts.get(e);
    this.registeredShortcuts.set(e, i.filter((r) => r !== n));
  }
  /**
   * Get Shortcut instance if exist
   *
   * @param element - Element shorcut is set for
   * @param shortcut - shortcut name
   * @returns {number} index - shortcut index if exist
   */
  findShortcut(e, t) {
    return (this.registeredShortcuts.get(e) || []).find(({ name: n }) => n === t);
  }
}
const Ft = new kh();
var xh = Object.defineProperty, Eh = Object.getOwnPropertyDescriptor, Zs = (o, e, t, n) => {
  for (var i = n > 1 ? void 0 : n ? Eh(e, t) : e, r = o.length - 1, s; r >= 0; r--)
    (s = o[r]) && (i = (n ? s(e, t, i) : s(i)) || i);
  return n && i && xh(e, t, i), i;
}, Ro = /* @__PURE__ */ ((o) => (o.Opened = "toolbox-opened", o.Closed = "toolbox-closed", o.BlockAdded = "toolbox-block-added", o))(Ro || {});
const Js = class extends an {
  /**
   * Toolbox constructor
   *
   * @param options - available parameters
   * @param options.api - Editor API methods
   * @param options.tools - Tools available to check whether some of them should be displayed at the Toolbox or not
   */
  constructor({ api: o, tools: e, i18nLabels: t }) {
    super(), this.opened = !1, this.nodes = {
      toolbox: null
    }, this.onPopoverClose = () => {
      this.opened = !1, this.emit(
        "toolbox-closed"
        /* Closed */
      );
    }, this.api = o, this.tools = e, this.i18nLabels = t;
  }
  /**
   * Returns True if Toolbox is Empty and nothing to show
   *
   * @returns {boolean}
   */
  get isEmpty() {
    return this.toolsToBeDisplayed.length === 0;
  }
  /**
   * CSS styles
   *
   * @returns {Object<string, string>}
   */
  static get CSS() {
    return {
      toolbox: "ce-toolbox"
    };
  }
  /**
   * Makes the Toolbox
   */
  make() {
    return this.popover = new yi({
      scopeElement: this.api.ui.nodes.redactor,
      searchable: !0,
      messages: {
        nothingFound: this.i18nLabels.nothingFound,
        search: this.i18nLabels.filter
      },
      items: this.toolboxItemsToBeDisplayed
    }), this.popover.on(uo.Close, this.onPopoverClose), this.enableShortcuts(), this.nodes.toolbox = this.popover.getElement(), this.nodes.toolbox.classList.add(Js.CSS.toolbox), this.nodes.toolbox;
  }
  /**
   * Returns true if the Toolbox has the Flipper activated and the Flipper has selected button
   */
  hasFocus() {
    var o;
    return (o = this.popover) == null ? void 0 : o.hasFocus();
  }
  /**
   * Destroy Module
   */
  destroy() {
    var o;
    super.destroy(), this.nodes && this.nodes.toolbox && (this.nodes.toolbox.remove(), this.nodes.toolbox = null), this.removeAllShortcuts(), (o = this.popover) == null || o.off(uo.Close, this.onPopoverClose);
  }
  /**
   * Toolbox Tool's button click handler
   *
   * @param toolName - tool type to be activated
   * @param blockDataOverrides - Block data predefined by the activated Toolbox item
   */
  toolButtonActivated(o, e) {
    this.insertNewBlock(o, e);
  }
  /**
   * Open Toolbox with Tools
   */
  open() {
    var o;
    this.isEmpty || ((o = this.popover) == null || o.show(), this.opened = !0, this.emit(
      "toolbox-opened"
      /* Opened */
    ));
  }
  /**
   * Close Toolbox
   */
  close() {
    var o;
    (o = this.popover) == null || o.hide(), this.opened = !1, this.emit(
      "toolbox-closed"
      /* Closed */
    );
  }
  /**
   * Close Toolbox
   */
  toggle() {
    this.opened ? this.close() : this.open();
  }
  get toolsToBeDisplayed() {
    const o = [];
    return this.tools.forEach((e) => {
      e.toolbox && o.push(e);
    }), o;
  }
  get toolboxItemsToBeDisplayed() {
    const o = (e, t) => ({
      icon: e.icon,
      title: me.t(Oe.toolNames, e.title || Xo(t.name)),
      name: t.name,
      onActivate: () => {
        this.toolButtonActivated(t.name, e.data);
      },
      secondaryLabel: t.shortcut ? js(t.shortcut) : ""
    });
    return this.toolsToBeDisplayed.reduce((e, t) => (Array.isArray(t.toolbox) ? t.toolbox.forEach((n) => {
      e.push(o(n, t));
    }) : t.toolbox !== void 0 && e.push(o(t.toolbox, t)), e), []);
  }
  /**
   * Iterate all tools and enable theirs shortcuts if specified
   */
  enableShortcuts() {
    this.toolsToBeDisplayed.forEach((o) => {
      const e = o.shortcut;
      e && this.enableShortcutForTool(o.name, e);
    });
  }
  /**
   * Enable shortcut Block Tool implemented shortcut
   *
   * @param {string} toolName - Tool name
   * @param {string} shortcut - shortcut according to the ShortcutData Module format
   */
  enableShortcutForTool(o, e) {
    Ft.add({
      name: e,
      on: this.api.ui.nodes.redactor,
      handler: (t) => {
        t.preventDefault(), this.insertNewBlock(o);
      }
    });
  }
  /**
   * Removes all added shortcuts
   * Fired when the Read-Only mode is activated
   */
  removeAllShortcuts() {
    this.toolsToBeDisplayed.forEach((o) => {
      const e = o.shortcut;
      e && Ft.remove(this.api.ui.nodes.redactor, e);
    });
  }
  /**
   * Inserts new block
   * Can be called when button clicked on Toolbox or by ShortcutData
   *
   * @param {string} toolName - Tool name
   * @param blockDataOverrides - predefined Block data
   */
  async insertNewBlock(o, e) {
    const t = this.api.blocks.getCurrentBlockIndex(), n = this.api.blocks.getBlockByIndex(t);
    if (!n)
      return;
    const i = n.isEmpty ? t : t + 1;
    let r;
    if (e) {
      const a = await this.api.blocks.composeBlockData(o);
      r = Object.assign(a, e);
    }
    const s = this.api.blocks.insert(
      o,
      r,
      void 0,
      i,
      void 0,
      n.isEmpty
    );
    s.call(et.APPEND_CALLBACK), this.api.caret.setToBlock(i), this.emit("toolbox-block-added", {
      block: s
    }), this.api.toolbar.close();
  }
};
let ki = Js;
Zs([
  Ut
], ki.prototype, "toolsToBeDisplayed", 1);
Zs([
  Ut
], ki.prototype, "toolboxItemsToBeDisplayed", 1);
const Qs = "block hovered";
class Sh extends W {
  /**
   * @class
   * @param moduleConfiguration - Module Configuration
   * @param moduleConfiguration.config - Editor's config
   * @param moduleConfiguration.eventsDispatcher - Editor's event dispatcher
   */
  constructor({ config: e, eventsDispatcher: t }) {
    super({
      config: e,
      eventsDispatcher: t
    }), this.tooltip = new wi();
  }
  /**
   * CSS styles
   *
   * @returns {object}
   */
  get CSS() {
    return {
      toolbar: "ce-toolbar",
      content: "ce-toolbar__content",
      actions: "ce-toolbar__actions",
      actionsOpened: "ce-toolbar__actions--opened",
      toolbarOpened: "ce-toolbar--opened",
      openedToolboxHolderModifier: "codex-editor--toolbox-opened",
      plusButton: "ce-toolbar__plus",
      plusButtonShortcut: "ce-toolbar__plus-shortcut",
      settingsToggler: "ce-toolbar__settings-btn",
      settingsTogglerHidden: "ce-toolbar__settings-btn--hidden"
    };
  }
  /**
   * Returns the Toolbar opening state
   *
   * @returns {boolean}
   */
  get opened() {
    return this.nodes.wrapper.classList.contains(this.CSS.toolbarOpened);
  }
  /**
   * Public interface for accessing the Toolbox
   */
  get toolbox() {
    return {
      opened: this.toolboxInstance.opened,
      close: () => {
        this.toolboxInstance.close();
      },
      open: () => {
        this.Editor.BlockManager.currentBlock = this.hoveredBlock, this.toolboxInstance.open();
      },
      toggle: () => this.toolboxInstance.toggle(),
      hasFocus: () => this.toolboxInstance.hasFocus()
    };
  }
  /**
   * Block actions appearance manipulations
   */
  get blockActions() {
    return {
      hide: () => {
        this.nodes.actions.classList.remove(this.CSS.actionsOpened);
      },
      show: () => {
        this.nodes.actions.classList.add(this.CSS.actionsOpened);
      }
    };
  }
  /**
   * Methods for working with Block Tunes toggler
   */
  get blockTunesToggler() {
    return {
      hide: () => this.nodes.settingsToggler.classList.add(this.CSS.settingsTogglerHidden),
      show: () => this.nodes.settingsToggler.classList.remove(this.CSS.settingsTogglerHidden)
    };
  }
  /**
   * Toggles read-only mode
   *
   * @param {boolean} readOnlyEnabled - read-only mode
   */
  toggleReadOnly(e) {
    e ? (this.destroy(), this.Editor.BlockSettings.destroy(), this.disableModuleBindings()) : (this.drawUI(), this.enableModuleBindings());
  }
  /**
   * Move Toolbar to the passed (or current) Block
   *
   * @param block - block to move Toolbar near it
   */
  moveAndOpen(e = this.Editor.BlockManager.currentBlock) {
    if (this.toolboxInstance.opened && this.toolboxInstance.close(), this.Editor.BlockSettings.opened && this.Editor.BlockSettings.close(), !e)
      return;
    this.hoveredBlock = e;
    const t = e.holder, { isMobile: n } = this.Editor.UI, i = e.pluginsContent, r = window.getComputedStyle(i), s = parseInt(r.paddingTop, 10), a = t.offsetHeight;
    let l;
    n ? l = t.offsetTop + a : l = t.offsetTop + s, this.nodes.wrapper.style.top = `${Math.floor(l)}px`, this.Editor.BlockManager.blocks.length === 1 && e.isEmpty ? this.blockTunesToggler.hide() : this.blockTunesToggler.show(), this.open();
  }
  /**
   * Close the Toolbar
   */
  close() {
    this.Editor.ReadOnly.isEnabled || (this.nodes.wrapper.classList.remove(this.CSS.toolbarOpened), this.blockActions.hide(), this.toolboxInstance.close(), this.Editor.BlockSettings.close());
  }
  /**
   * Open Toolbar with Plus Button and Actions
   *
   * @param {boolean} withBlockActions - by default, Toolbar opens with Block Actions.
   *                                     This flag allows to open Toolbar without Actions.
   */
  open(e = !0) {
    vt(() => {
      this.nodes.wrapper.classList.add(this.CSS.toolbarOpened), e ? this.blockActions.show() : this.blockActions.hide();
    }, 50)();
  }
  /**
   * Draws Toolbar elements
   */
  make() {
    this.nodes.wrapper = m.make("div", this.CSS.toolbar), ["content", "actions"].forEach((t) => {
      this.nodes[t] = m.make("div", this.CSS[t]);
    }), m.append(this.nodes.wrapper, this.nodes.content), m.append(this.nodes.content, this.nodes.actions), this.nodes.plusButton = m.make("div", this.CSS.plusButton, {
      innerHTML: hh
    }), m.append(this.nodes.actions, this.nodes.plusButton), this.readOnlyMutableListeners.on(this.nodes.plusButton, "click", () => {
      this.tooltip.hide(!0), this.plusButtonClicked();
    }, !1);
    const e = m.make("div");
    e.appendChild(document.createTextNode(me.ui(Oe.ui.toolbar.toolbox, "Add"))), e.appendChild(m.make("div", this.CSS.plusButtonShortcut, {
      textContent: "⇥ Tab"
    })), this.tooltip.onHover(this.nodes.plusButton, e, {
      hidingDelay: 400
    }), this.nodes.settingsToggler = m.make("span", this.CSS.settingsToggler, {
      innerHTML: uh
    }), m.append(this.nodes.actions, this.nodes.settingsToggler), this.tooltip.onHover(
      this.nodes.settingsToggler,
      me.ui(Oe.ui.blockTunes.toggler, "Click to tune"),
      {
        hidingDelay: 400
      }
    ), m.append(this.nodes.actions, this.makeToolbox()), m.append(this.nodes.actions, this.Editor.BlockSettings.getElement()), m.append(this.Editor.UI.nodes.wrapper, this.nodes.wrapper);
  }
  /**
   * Creates the Toolbox instance and return it's rendered element
   */
  makeToolbox() {
    return this.toolboxInstance = new ki({
      api: this.Editor.API.methods,
      tools: this.Editor.Tools.blockTools,
      i18nLabels: {
        filter: me.ui(Oe.ui.popover, "Filter"),
        nothingFound: me.ui(Oe.ui.popover, "Nothing found")
      }
    }), this.toolboxInstance.on(Ro.Opened, () => {
      this.Editor.UI.nodes.wrapper.classList.add(this.CSS.openedToolboxHolderModifier);
    }), this.toolboxInstance.on(Ro.Closed, () => {
      this.Editor.UI.nodes.wrapper.classList.remove(this.CSS.openedToolboxHolderModifier);
    }), this.toolboxInstance.on(Ro.BlockAdded, ({ block: e }) => {
      const { BlockManager: t, Caret: n } = this.Editor, i = t.getBlockById(e.id);
      i.inputs.length === 0 && (i === t.lastBlock ? (t.insertAtEnd(), n.setToBlock(t.lastBlock)) : n.setToBlock(t.nextBlock));
    }), this.toolboxInstance.make();
  }
  /**
   * Handler for Plus Button
   */
  plusButtonClicked() {
    this.Editor.BlockManager.currentBlock = this.hoveredBlock, this.toolboxInstance.toggle();
  }
  /**
   * Enable bindings
   */
  enableModuleBindings() {
    this.readOnlyMutableListeners.on(this.nodes.settingsToggler, "mousedown", (e) => {
      e.stopPropagation(), this.settingsTogglerClicked(), this.toolboxInstance.opened && this.toolboxInstance.close(), this.tooltip.hide(!0);
    }, !0), pt() || this.eventsDispatcher.on(Qs, (e) => {
      this.Editor.BlockSettings.opened || this.toolboxInstance.opened || this.moveAndOpen(e.block);
    });
  }
  /**
   * Disable bindings
   */
  disableModuleBindings() {
    this.readOnlyMutableListeners.clearAll();
  }
  /**
   * Clicks on the Block Settings toggler
   */
  settingsTogglerClicked() {
    this.Editor.BlockManager.currentBlock = this.hoveredBlock, this.Editor.BlockSettings.opened ? this.Editor.BlockSettings.close() : this.Editor.BlockSettings.open(this.hoveredBlock);
  }
  /**
   * Draws Toolbar UI
   *
   * Toolbar contains BlockSettings and Toolbox.
   * That's why at first we draw its components and then Toolbar itself
   *
   * Steps:
   *  - Make Toolbar dependent components like BlockSettings, Toolbox and so on
   *  - Make itself and append dependent nodes to itself
   *
   */
  drawUI() {
    this.Editor.BlockSettings.make(), this.make();
  }
  /**
   * Removes all created and saved HTMLElements
   * It is used in Read-Only mode
   */
  destroy() {
    this.removeAllNodes(), this.toolboxInstance && this.toolboxInstance.destroy(), this.tooltip.destroy();
  }
}
var ln = /* @__PURE__ */ ((o) => (o[o.Block = 0] = "Block", o[o.Inline = 1] = "Inline", o[o.Tune = 2] = "Tune", o))(ln || {}), Do = /* @__PURE__ */ ((o) => (o.Shortcut = "shortcut", o.Toolbox = "toolbox", o.EnabledInlineTools = "inlineToolbar", o.EnabledBlockTunes = "tunes", o.Config = "config", o))(Do || {}), ea = /* @__PURE__ */ ((o) => (o.Shortcut = "shortcut", o.SanitizeConfig = "sanitize", o))(ea || {}), _t = /* @__PURE__ */ ((o) => (o.IsEnabledLineBreaks = "enableLineBreaks", o.Toolbox = "toolbox", o.ConversionConfig = "conversionConfig", o.IsReadOnlySupported = "isReadOnlySupported", o.PasteConfig = "pasteConfig", o))(_t || {}), xi = /* @__PURE__ */ ((o) => (o.IsInline = "isInline", o.Title = "title", o))(xi || {}), ta = /* @__PURE__ */ ((o) => (o.IsTune = "isTune", o))(ta || {});
class Ei {
  /**
   * @class
   * @param {ConstructorOptions} options - Constructor options
   */
  constructor({
    name: e,
    constructable: t,
    config: n,
    api: i,
    isDefault: r,
    isInternal: s = !1,
    defaultPlaceholder: a
  }) {
    this.api = i, this.name = e, this.constructable = t, this.config = n, this.isDefault = r, this.isInternal = s, this.defaultPlaceholder = a;
  }
  /**
   * Returns Tool user configuration
   */
  get settings() {
    const e = this.config.config || {};
    return this.isDefault && !("placeholder" in e) && this.defaultPlaceholder && (e.placeholder = this.defaultPlaceholder), e;
  }
  /**
   * Calls Tool's reset method
   */
  reset() {
    if (Z(this.constructable.reset))
      return this.constructable.reset();
  }
  /**
   * Calls Tool's prepare method
   */
  prepare() {
    if (Z(this.constructable.prepare))
      return this.constructable.prepare({
        toolName: this.name,
        config: this.settings
      });
  }
  /**
   * Returns shortcut for Tool (internal or specified by user)
   */
  get shortcut() {
    const e = this.constructable.shortcut;
    return this.config.shortcut || e;
  }
  /**
   * Returns Tool's sanitizer configuration
   */
  get sanitizeConfig() {
    return this.constructable.sanitize || {};
  }
  /**
   * Returns true if Tools is inline
   */
  isInline() {
    return this.type === 1;
  }
  /**
   * Returns true if Tools is block
   */
  isBlock() {
    return this.type === 0;
  }
  /**
   * Returns true if Tools is tune
   */
  isTune() {
    return this.type === 2;
  }
}
class Ch extends W {
  /**
   * @class
   * @param moduleConfiguration - Module Configuration
   * @param moduleConfiguration.config - Editor's config
   * @param moduleConfiguration.eventsDispatcher - Editor's event dispatcher
   */
  constructor({ config: e, eventsDispatcher: t }) {
    super({
      config: e,
      eventsDispatcher: t
    }), this.CSS = {
      inlineToolbar: "ce-inline-toolbar",
      inlineToolbarShowed: "ce-inline-toolbar--showed",
      inlineToolbarLeftOriented: "ce-inline-toolbar--left-oriented",
      inlineToolbarRightOriented: "ce-inline-toolbar--right-oriented",
      inlineToolbarShortcut: "ce-inline-toolbar__shortcut",
      buttonsWrapper: "ce-inline-toolbar__buttons",
      actionsWrapper: "ce-inline-toolbar__actions",
      inlineToolButton: "ce-inline-tool",
      inputField: "cdx-input",
      focusedButton: "ce-inline-tool--focused",
      conversionToggler: "ce-inline-toolbar__dropdown",
      conversionTogglerArrow: "ce-inline-toolbar__dropdown-arrow",
      conversionTogglerHidden: "ce-inline-toolbar__dropdown--hidden",
      conversionTogglerContent: "ce-inline-toolbar__dropdown-content",
      togglerAndButtonsWrapper: "ce-inline-toolbar__toggler-and-button-wrapper"
    }, this.opened = !1, this.toolbarVerticalMargin = pt() ? 20 : 6, this.buttonsList = null, this.width = 0, this.flipper = null, this.tooltip = new wi();
  }
  /**
   * Toggles read-only mode
   *
   * @param {boolean} readOnlyEnabled - read-only mode
   */
  toggleReadOnly(e) {
    e ? (this.destroy(), this.Editor.ConversionToolbar.destroy()) : this.make();
  }
  /**
   *  Moving / appearance
   *  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   */
  /**
   * Shows Inline Toolbar if something is selected
   *
   * @param [needToClose] - pass true to close toolbar if it is not allowed.
   *                                  Avoid to use it just for closing IT, better call .close() clearly.
   * @param [needToShowConversionToolbar] - pass false to not to show Conversion Toolbar
   */
  tryToShow(e = !1, t = !0) {
    if (!this.allowedToShow()) {
      e && this.close();
      return;
    }
    this.move(), this.open(t), this.Editor.Toolbar.close();
  }
  /**
   * Move Toolbar to the selected text
   */
  move() {
    const e = R.rect, t = this.Editor.UI.nodes.wrapper.getBoundingClientRect(), n = {
      x: e.x - t.left,
      y: e.y + e.height - // + window.scrollY
      t.top + this.toolbarVerticalMargin
    };
    e.width && (n.x += Math.floor(e.width / 2));
    const i = n.x - this.width / 2, r = n.x + this.width / 2;
    this.nodes.wrapper.classList.toggle(
      this.CSS.inlineToolbarLeftOriented,
      i < this.Editor.UI.contentRect.left
    ), this.nodes.wrapper.classList.toggle(
      this.CSS.inlineToolbarRightOriented,
      r > this.Editor.UI.contentRect.right
    ), this.nodes.wrapper.style.left = Math.floor(n.x) + "px", this.nodes.wrapper.style.top = Math.floor(n.y) + "px";
  }
  /**
   * Hides Inline Toolbar
   */
  close() {
    this.opened && (this.Editor.ReadOnly.isEnabled || (this.nodes.wrapper.classList.remove(this.CSS.inlineToolbarShowed), Array.from(this.toolsInstances.entries()).forEach(([e, t]) => {
      const n = this.getToolShortcut(e);
      n && Ft.remove(this.Editor.UI.nodes.redactor, n), Z(t.clear) && t.clear();
    }), this.opened = !1, this.flipper.deactivate(), this.Editor.ConversionToolbar.close()));
  }
  /**
   * Shows Inline Toolbar
   *
   * @param [needToShowConversionToolbar] - pass false to not to show Conversion Toolbar
   */
  open(e = !0) {
    if (this.opened)
      return;
    this.addToolsFiltered(), this.nodes.wrapper.classList.add(this.CSS.inlineToolbarShowed), this.buttonsList = this.nodes.buttons.querySelectorAll(`.${this.CSS.inlineToolButton}`), this.opened = !0, e && this.Editor.ConversionToolbar.hasTools() ? this.setConversionTogglerContent() : this.nodes.conversionToggler.hidden = !0;
    let t = Array.from(this.buttonsList);
    t.unshift(this.nodes.conversionToggler), t = t.filter((n) => !n.hidden), this.flipper.activate(t);
  }
  /**
   * Check if node is contained by Inline Toolbar
   *
   * @param {Node} node — node to check
   */
  containsNode(e) {
    return this.nodes.wrapper.contains(e);
  }
  /**
   * Removes UI and its components
   */
  destroy() {
    this.flipper && (this.flipper.deactivate(), this.flipper = null), this.removeAllNodes(), this.tooltip.destroy();
  }
  /**
   * Making DOM
   */
  make() {
    this.nodes.wrapper = m.make("div", [
      this.CSS.inlineToolbar,
      ...this.isRtl ? [this.Editor.UI.CSS.editorRtlFix] : []
    ]), this.nodes.togglerAndButtonsWrapper = m.make("div", this.CSS.togglerAndButtonsWrapper), this.nodes.buttons = m.make("div", this.CSS.buttonsWrapper), this.nodes.actions = m.make("div", this.CSS.actionsWrapper), this.listeners.on(this.nodes.wrapper, "mousedown", (e) => {
      e.target.closest(`.${this.CSS.actionsWrapper}`) || e.preventDefault();
    }), m.append(this.nodes.wrapper, [this.nodes.togglerAndButtonsWrapper, this.nodes.actions]), m.append(this.Editor.UI.nodes.wrapper, this.nodes.wrapper), this.addConversionToggler(), m.append(this.nodes.togglerAndButtonsWrapper, this.nodes.buttons), this.prepareConversionToolbar(), this.recalculateWidth(), this.enableFlipper();
  }
  /**
   * Need to show Inline Toolbar or not
   */
  allowedToShow() {
    const e = ["IMG", "INPUT"], t = R.get(), n = R.text;
    if (!t || !t.anchorNode || t.isCollapsed || n.length < 1)
      return !1;
    const i = m.isElement(t.anchorNode) ? t.anchorNode : t.anchorNode.parentElement;
    if (t && e.includes(i.tagName) || i.closest('[contenteditable="true"]') === null)
      return !1;
    const r = this.Editor.BlockManager.getBlock(t.anchorNode);
    return r ? r.tool.inlineTools.size !== 0 : !1;
  }
  /**
   * Recalculate inline toolbar width
   */
  recalculateWidth() {
    this.width = this.nodes.wrapper.offsetWidth;
  }
  /**
   * Create a toggler for Conversion Dropdown
   * and prepend it to the buttons list
   */
  addConversionToggler() {
    this.nodes.conversionToggler = m.make("div", this.CSS.conversionToggler), this.nodes.conversionTogglerContent = m.make("div", this.CSS.conversionTogglerContent);
    const e = m.make("div", this.CSS.conversionTogglerArrow, {
      innerHTML: qs
    });
    this.nodes.conversionToggler.appendChild(this.nodes.conversionTogglerContent), this.nodes.conversionToggler.appendChild(e), this.nodes.togglerAndButtonsWrapper.appendChild(this.nodes.conversionToggler), this.listeners.on(this.nodes.conversionToggler, "click", () => {
      this.Editor.ConversionToolbar.toggle((t) => {
        !t && this.opened ? this.flipper.activate() : this.opened && this.flipper.deactivate();
      });
    }), pt() === !1 && this.tooltip.onHover(this.nodes.conversionToggler, me.ui(Oe.ui.inlineToolbar.converter, "Convert to"), {
      placement: "top",
      hidingDelay: 100
    });
  }
  /**
   * Changes Conversion Dropdown content for current block's Tool
   */
  async setConversionTogglerContent() {
    const { BlockManager: e } = this.Editor, { currentBlock: t } = e, n = t.name, i = t.tool.conversionConfig, r = i && i.export;
    this.nodes.conversionToggler.hidden = !r, this.nodes.conversionToggler.classList.toggle(this.CSS.conversionTogglerHidden, !r);
    const s = await t.getActiveToolboxEntry() || {};
    this.nodes.conversionTogglerContent.innerHTML = s.icon || s.title || Xo(n);
  }
  /**
   * Makes the Conversion Dropdown
   */
  prepareConversionToolbar() {
    const e = this.Editor.ConversionToolbar.make();
    m.append(this.nodes.wrapper, e);
  }
  /**
   *  Working with Tools
   *  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   */
  /**
   * Append only allowed Tools
   */
  addToolsFiltered() {
    const e = R.get(), t = this.Editor.BlockManager.getBlock(e.anchorNode);
    this.nodes.buttons.innerHTML = "", this.nodes.actions.innerHTML = "", this.toolsInstances = /* @__PURE__ */ new Map(), Array.from(t.tool.inlineTools.values()).forEach((n) => {
      this.addTool(n);
    }), this.recalculateWidth();
  }
  /**
   * Add tool button and activate clicks
   *
   * @param {InlineTool} tool - InlineTool object
   */
  addTool(e) {
    const t = e.create(), n = t.render();
    if (!n) {
      $("Render method must return an instance of Node", "warn", e.name);
      return;
    }
    if (n.dataset.tool = e.name, this.nodes.buttons.appendChild(n), this.toolsInstances.set(e.name, t), Z(t.renderActions)) {
      const a = t.renderActions();
      this.nodes.actions.appendChild(a);
    }
    this.listeners.on(n, "click", (a) => {
      this.toolClicked(t), a.preventDefault();
    });
    const i = this.getToolShortcut(e.name);
    if (i)
      try {
        this.enableShortcuts(t, i);
      } catch {
      }
    const r = m.make("div"), s = me.t(
      Oe.toolNames,
      e.title || Xo(e.name)
    );
    r.appendChild(m.text(s)), i && r.appendChild(m.make("div", this.CSS.inlineToolbarShortcut, {
      textContent: js(i)
    })), pt() === !1 && this.tooltip.onHover(n, r, {
      placement: "top",
      hidingDelay: 100
    }), t.checkState(R.get());
  }
  /**
   * Get shortcut name for tool
   *
   * @param toolName — Tool name
   */
  getToolShortcut(e) {
    const { Tools: t } = this.Editor, n = t.inlineTools.get(e), i = t.internal.inlineTools;
    return Array.from(i.keys()).includes(e) ? this.inlineTools[e][ea.Shortcut] : n.shortcut;
  }
  /**
   * Enable Tool shortcut with Editor Shortcuts Module
   *
   * @param {InlineTool} tool - Tool instance
   * @param {string} shortcut - shortcut according to the ShortcutData Module format
   */
  enableShortcuts(e, t) {
    Ft.add({
      name: t,
      handler: (n) => {
        const { currentBlock: i } = this.Editor.BlockManager;
        i && i.tool.enabledInlineTools && (n.preventDefault(), this.toolClicked(e));
      },
      on: this.Editor.UI.nodes.redactor
    });
  }
  /**
   * Inline Tool button clicks
   *
   * @param {InlineTool} tool - Tool's instance
   */
  toolClicked(e) {
    const t = R.range;
    e.surround(t), this.checkToolsState(), e.renderActions !== void 0 && this.flipper.deactivate();
  }
  /**
   * Check Tools` state by selection
   */
  checkToolsState() {
    this.toolsInstances.forEach((e) => {
      e.checkState(R.get());
    });
  }
  /**
   * Get inline tools tools
   * Tools that has isInline is true
   */
  get inlineTools() {
    const e = {};
    return Array.from(this.Editor.Tools.inlineTools.entries()).forEach(([t, n]) => {
      e[t] = n.create();
    }), e;
  }
  /**
   * Allow to leaf buttons by arrows / tab
   * Buttons will be filled on opening
   */
  enableFlipper() {
    this.flipper = new Ye({
      focusedItemClass: this.CSS.focusedButton,
      allowedKeys: [
        j.ENTER,
        j.TAB
      ]
    });
  }
}
class Th extends W {
  /**
   * All keydowns on Block
   *
   * @param {KeyboardEvent} event - keydown
   */
  keydown(e) {
    switch (this.beforeKeydownProcessing(e), e.keyCode) {
      case j.BACKSPACE:
        this.backspace(e);
        break;
      case j.ENTER:
        this.enter(e);
        break;
      case j.DOWN:
      case j.RIGHT:
        this.arrowRightAndDown(e);
        break;
      case j.UP:
      case j.LEFT:
        this.arrowLeftAndUp(e);
        break;
      case j.TAB:
        this.tabPressed(e);
        break;
    }
  }
  /**
   * Fires on keydown before event processing
   *
   * @param {KeyboardEvent} event - keydown
   */
  beforeKeydownProcessing(e) {
    this.needToolbarClosing(e) && Ps(e.keyCode) && (this.Editor.Toolbar.close(), this.Editor.ConversionToolbar.close(), e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || (this.Editor.BlockManager.clearFocused(), this.Editor.BlockSelection.clearSelection(e)));
  }
  /**
   * Key up on Block:
   * - shows Inline Toolbar if something selected
   * - shows conversion toolbar with 85% of block selection
   *
   * @param {KeyboardEvent} event - keyup event
   */
  keyup(e) {
    e.shiftKey || this.Editor.UI.checkEmptiness();
  }
  /**
   * Open Toolbox to leaf Tools
   *
   * @param {KeyboardEvent} event - tab keydown event
   */
  tabPressed(e) {
    this.Editor.BlockSelection.clearSelection(e);
    const { BlockManager: t, InlineToolbar: n, ConversionToolbar: i } = this.Editor, r = t.currentBlock;
    if (!r)
      return;
    const s = r.isEmpty, a = r.tool.isDefault && s, l = !s && i.opened, c = !s && !R.isCollapsed && n.opened;
    a ? this.activateToolbox() : !l && !c && this.activateBlockSettings();
  }
  /**
   * Add drop target styles
   *
   * @param {DragEvent} event - drag over event
   */
  dragOver(e) {
    const t = this.Editor.BlockManager.getBlockByChildNode(e.target);
    t.dropTarget = !0;
  }
  /**
   * Remove drop target style
   *
   * @param {DragEvent} event - drag leave event
   */
  dragLeave(e) {
    const t = this.Editor.BlockManager.getBlockByChildNode(e.target);
    t.dropTarget = !1;
  }
  /**
   * Copying selected blocks
   * Before putting to the clipboard we sanitize all blocks and then copy to the clipboard
   *
   * @param {ClipboardEvent} event - clipboard event
   */
  handleCommandC(e) {
    const { BlockSelection: t } = this.Editor;
    t.anyBlockSelected && t.copySelectedBlocks(e);
  }
  /**
   * Copy and Delete selected Blocks
   *
   * @param {ClipboardEvent} event - clipboard event
   */
  handleCommandX(e) {
    const { BlockSelection: t, BlockManager: n, Caret: i } = this.Editor;
    t.anyBlockSelected && t.copySelectedBlocks(e).then(() => {
      const r = n.removeSelectedBlocks(), s = n.insertDefaultBlockAtIndex(r, !0);
      i.setToBlock(s, i.positions.START), t.clearSelection(e);
    });
  }
  /**
   * ENTER pressed on block
   *
   * @param {KeyboardEvent} event - keydown
   */
  enter(e) {
    const { BlockManager: t, UI: n } = this.Editor;
    if (t.currentBlock.tool.isLineBreaksEnabled || n.someToolbarOpened && n.someFlipperButtonFocused || e.shiftKey)
      return;
    let i = this.Editor.BlockManager.currentBlock;
    this.Editor.Caret.isAtStart && !this.Editor.BlockManager.currentBlock.hasMedia ? this.Editor.BlockManager.insertDefaultBlockAtIndex(this.Editor.BlockManager.currentBlockIndex) : this.Editor.Caret.isAtEnd ? i = this.Editor.BlockManager.insertDefaultBlockAtIndex(this.Editor.BlockManager.currentBlockIndex + 1) : i = this.Editor.BlockManager.split(), this.Editor.Caret.setToBlock(i), this.Editor.Toolbar.moveAndOpen(i), e.preventDefault();
  }
  /**
   * Handle backspace keydown on Block
   *
   * @param {KeyboardEvent} event - keydown
   */
  backspace(e) {
    const { BlockManager: t, BlockSelection: n, Caret: i } = this.Editor, r = t.currentBlock, s = r.tool;
    if (r.selected || r.isEmpty && r.currentInput === r.firstInput) {
      e.preventDefault();
      const l = t.currentBlockIndex;
      t.previousBlock && t.previousBlock.inputs.length === 0 ? t.removeBlock(l - 1) : t.removeBlock(), i.setToBlock(
        t.currentBlock,
        l ? i.positions.END : i.positions.START
      ), this.Editor.Toolbar.close(), n.clearSelection(e);
      return;
    }
    if (s.isLineBreaksEnabled && !i.isAtStart)
      return;
    const a = t.currentBlockIndex === 0;
    i.isAtStart && R.isCollapsed && r.currentInput === r.firstInput && !a && (e.preventDefault(), this.mergeBlocks());
  }
  /**
   * Merge current and previous Blocks if they have the same type
   */
  mergeBlocks() {
    const { BlockManager: e, Caret: t, Toolbar: n } = this.Editor, i = e.previousBlock, r = e.currentBlock;
    if (r.name !== i.name || !i.mergeable) {
      if (i.inputs.length === 0 || i.isEmpty) {
        e.removeBlock(e.currentBlockIndex - 1), t.setToBlock(e.currentBlock), n.close();
        return;
      }
      t.navigatePrevious() && n.close();
      return;
    }
    t.createShadow(i.pluginsContent), e.mergeBlocks(i, r).then(() => {
      t.restoreCaret(i.pluginsContent), i.pluginsContent.normalize(), n.close();
    });
  }
  /**
   * Handle right and down keyboard keys
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  arrowRightAndDown(e) {
    const t = Ye.usedKeys.includes(e.keyCode) && (!e.shiftKey || e.keyCode === j.TAB);
    if (this.Editor.UI.someToolbarOpened && t)
      return;
    this.Editor.BlockManager.clearFocused(), this.Editor.Toolbar.close();
    const n = this.Editor.Caret.isAtEnd || this.Editor.BlockSelection.anyBlockSelected;
    if (e.shiftKey && e.keyCode === j.DOWN && n) {
      this.Editor.CrossBlockSelection.toggleBlockSelectedState();
      return;
    }
    (e.keyCode === j.DOWN || e.keyCode === j.RIGHT && !this.isRtl ? this.Editor.Caret.navigateNext() : this.Editor.Caret.navigatePrevious()) ? e.preventDefault() : vt(() => {
      this.Editor.BlockManager.currentBlock && this.Editor.BlockManager.currentBlock.updateCurrentInput();
    }, 20)(), this.Editor.BlockSelection.clearSelection(e);
  }
  /**
   * Handle left and up keyboard keys
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  arrowLeftAndUp(e) {
    if (this.Editor.UI.someToolbarOpened) {
      if (Ye.usedKeys.includes(e.keyCode) && (!e.shiftKey || e.keyCode === j.TAB))
        return;
      this.Editor.UI.closeAllToolbars();
    }
    this.Editor.BlockManager.clearFocused(), this.Editor.Toolbar.close();
    const t = this.Editor.Caret.isAtStart || this.Editor.BlockSelection.anyBlockSelected;
    if (e.shiftKey && e.keyCode === j.UP && t) {
      this.Editor.CrossBlockSelection.toggleBlockSelectedState(!1);
      return;
    }
    (e.keyCode === j.UP || e.keyCode === j.LEFT && !this.isRtl ? this.Editor.Caret.navigatePrevious() : this.Editor.Caret.navigateNext()) ? e.preventDefault() : vt(() => {
      this.Editor.BlockManager.currentBlock && this.Editor.BlockManager.currentBlock.updateCurrentInput();
    }, 20)(), this.Editor.BlockSelection.clearSelection(e);
  }
  /**
   * Cases when we need to close Toolbar
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  needToolbarClosing(e) {
    const t = e.keyCode === j.ENTER && this.Editor.Toolbar.toolbox.opened, n = e.keyCode === j.ENTER && this.Editor.BlockSettings.opened, i = e.keyCode === j.ENTER && this.Editor.InlineToolbar.opened, r = e.keyCode === j.ENTER && this.Editor.ConversionToolbar.opened, s = e.keyCode === j.TAB;
    return !(e.shiftKey || s || t || n || i || r);
  }
  /**
   * If Toolbox is not open, then just open it and show plus button
   */
  activateToolbox() {
    this.Editor.Toolbar.opened || this.Editor.Toolbar.moveAndOpen(), this.Editor.Toolbar.toolbox.open();
  }
  /**
   * Open Toolbar and show BlockSettings before flipping Tools
   */
  activateBlockSettings() {
    this.Editor.Toolbar.opened || (this.Editor.BlockManager.currentBlock.focused = !0, this.Editor.Toolbar.moveAndOpen()), this.Editor.BlockSettings.opened || this.Editor.BlockSettings.open();
  }
}
class Tn {
  /**
   * @class
   * @param {HTMLElement} workingArea — editor`s working node
   */
  constructor(e) {
    this.blocks = [], this.workingArea = e;
  }
  /**
   * Get length of Block instances array
   *
   * @returns {number}
   */
  get length() {
    return this.blocks.length;
  }
  /**
   * Get Block instances array
   *
   * @returns {Block[]}
   */
  get array() {
    return this.blocks;
  }
  /**
   * Get blocks html elements array
   *
   * @returns {HTMLElement[]}
   */
  get nodes() {
    return Hs(this.workingArea.children);
  }
  /**
   * Proxy trap to implement array-like setter
   *
   * @example
   * blocks[0] = new Block(...)
   * @param {Blocks} instance — Blocks instance
   * @param {PropertyKey} property — block index or any Blocks class property key to set
   * @param {Block} value — value to set
   * @returns {boolean}
   */
  static set(e, t, n) {
    return isNaN(Number(t)) ? (Reflect.set(e, t, n), !0) : (e.insert(+t, n), !0);
  }
  /**
   * Proxy trap to implement array-like getter
   *
   * @param {Blocks} instance — Blocks instance
   * @param {PropertyKey} property — Blocks class property key
   * @returns {Block|*}
   */
  static get(e, t) {
    return isNaN(Number(t)) ? Reflect.get(e, t) : e.get(+t);
  }
  /**
   * Push new Block to the blocks array and append it to working area
   *
   * @param {Block} block - Block to add
   */
  push(e) {
    this.blocks.push(e), this.insertToDOM(e);
  }
  /**
   * Swaps blocks with indexes first and second
   *
   * @param {number} first - first block index
   * @param {number} second - second block index
   * @deprecated — use 'move' instead
   */
  swap(e, t) {
    const n = this.blocks[t];
    m.swap(this.blocks[e].holder, n.holder), this.blocks[t] = this.blocks[e], this.blocks[e] = n;
  }
  /**
   * Move a block from one to another index
   *
   * @param {number} toIndex - new index of the block
   * @param {number} fromIndex - block to move
   */
  move(e, t) {
    const n = this.blocks.splice(t, 1)[0], i = e - 1, r = Math.max(0, i), s = this.blocks[r];
    e > 0 ? this.insertToDOM(n, "afterend", s) : this.insertToDOM(n, "beforebegin", s), this.blocks.splice(e, 0, n);
    const a = this.composeBlockEvent("move", {
      fromIndex: t,
      toIndex: e
    });
    n.call(et.MOVED, a);
  }
  /**
   * Insert new Block at passed index
   *
   * @param {number} index — index to insert Block
   * @param {Block} block — Block to insert
   * @param {boolean} replace — it true, replace block on given index
   */
  insert(e, t, n = !1) {
    if (!this.length) {
      this.push(t);
      return;
    }
    e > this.length && (e = this.length), n && (this.blocks[e].holder.remove(), this.blocks[e].call(et.REMOVED));
    const i = n ? 1 : 0;
    if (this.blocks.splice(e, i, t), e > 0) {
      const r = this.blocks[e - 1];
      this.insertToDOM(t, "afterend", r);
    } else {
      const r = this.blocks[e + 1];
      r ? this.insertToDOM(t, "beforebegin", r) : this.insertToDOM(t);
    }
  }
  /**
   * Remove block
   *
   * @param {number} index - index of Block to remove
   */
  remove(e) {
    isNaN(e) && (e = this.length - 1), this.blocks[e].holder.remove(), this.blocks[e].call(et.REMOVED), this.blocks.splice(e, 1);
  }
  /**
   * Remove all blocks
   */
  removeAll() {
    this.workingArea.innerHTML = "", this.blocks.forEach((e) => e.call(et.REMOVED)), this.blocks.length = 0;
  }
  /**
   * Insert Block after passed target
   *
   * @todo decide if this method is necessary
   * @param {Block} targetBlock — target after which Block should be inserted
   * @param {Block} newBlock — Block to insert
   */
  insertAfter(e, t) {
    const n = this.blocks.indexOf(e);
    this.insert(n + 1, t);
  }
  /**
   * Get Block by index
   *
   * @param {number} index — Block index
   * @returns {Block}
   */
  get(e) {
    return this.blocks[e];
  }
  /**
   * Return index of passed Block
   *
   * @param {Block} block - Block to find
   * @returns {number}
   */
  indexOf(e) {
    return this.blocks.indexOf(e);
  }
  /**
   * Insert new Block into DOM
   *
   * @param {Block} block - Block to insert
   * @param {InsertPosition} position — insert position (if set, will use insertAdjacentElement)
   * @param {Block} target — Block related to position
   */
  insertToDOM(e, t, n) {
    t ? n.holder.insertAdjacentElement(t, e.holder) : this.workingArea.appendChild(e.holder), e.call(et.RENDERED);
  }
  /**
   * Composes Block event with passed type and details
   *
   * @param {string} type - event type
   * @param {object} detail - event detail
   */
  composeBlockEvent(e, t) {
    return new CustomEvent(e, {
      detail: t
    });
  }
}
const Tr = "block-removed", Br = "block-added", Bh = "block-moved", _h = "block-changed";
class Oh extends W {
  constructor() {
    super(...arguments), this._currentBlockIndex = -1, this._blocks = null;
  }
  /**
   * Returns current Block index
   *
   * @returns {number}
   */
  get currentBlockIndex() {
    return this._currentBlockIndex;
  }
  /**
   * Set current Block index and fire Block lifecycle callbacks
   *
   * @param {number} newIndex - index of Block to set as current
   */
  set currentBlockIndex(e) {
    this._currentBlockIndex = e;
  }
  /**
   * returns first Block
   *
   * @returns {Block}
   */
  get firstBlock() {
    return this._blocks[0];
  }
  /**
   * returns last Block
   *
   * @returns {Block}
   */
  get lastBlock() {
    return this._blocks[this._blocks.length - 1];
  }
  /**
   * Get current Block instance
   *
   * @returns {Block}
   */
  get currentBlock() {
    return this._blocks[this.currentBlockIndex];
  }
  /**
   * Set passed Block as a current
   *
   * @param block - block to set as a current
   */
  set currentBlock(e) {
    this.currentBlockIndex = this.getBlockIndex(e);
  }
  /**
   * Returns next Block instance
   *
   * @returns {Block|null}
   */
  get nextBlock() {
    return this.currentBlockIndex === this._blocks.length - 1 ? null : this._blocks[this.currentBlockIndex + 1];
  }
  /**
   * Return first Block with inputs after current Block
   *
   * @returns {Block | undefined}
   */
  get nextContentfulBlock() {
    return this.blocks.slice(this.currentBlockIndex + 1).find((e) => !!e.inputs.length);
  }
  /**
   * Return first Block with inputs before current Block
   *
   * @returns {Block | undefined}
   */
  get previousContentfulBlock() {
    return this.blocks.slice(0, this.currentBlockIndex).reverse().find((e) => !!e.inputs.length);
  }
  /**
   * Returns previous Block instance
   *
   * @returns {Block|null}
   */
  get previousBlock() {
    return this.currentBlockIndex === 0 ? null : this._blocks[this.currentBlockIndex - 1];
  }
  /**
   * Get array of Block instances
   *
   * @returns {Block[]} {@link Blocks#array}
   */
  get blocks() {
    return this._blocks.array;
  }
  /**
   * Check if each Block is empty
   *
   * @returns {boolean}
   */
  get isEditorEmpty() {
    return this.blocks.every((e) => e.isEmpty);
  }
  /**
   * Should be called after Editor.UI preparation
   * Define this._blocks property
   */
  prepare() {
    const e = new Tn(this.Editor.UI.nodes.redactor);
    this._blocks = new Proxy(e, {
      set: Tn.set,
      get: Tn.get
    }), this.listeners.on(
      document,
      "copy",
      (t) => this.Editor.BlockEvents.handleCommandC(t)
    );
  }
  /**
   * Toggle read-only state
   *
   * If readOnly is true:
   *  - Unbind event handlers from created Blocks
   *
   * if readOnly is false:
   *  - Bind event handlers to all existing Blocks
   *
   * @param {boolean} readOnlyEnabled - "read only" state
   */
  toggleReadOnly(e) {
    e ? this.disableModuleBindings() : this.enableModuleBindings();
  }
  /**
   * Creates Block instance by tool name
   *
   * @param {object} options - block creation options
   * @param {string} options.tool - tools passed in editor config {@link EditorConfig#tools}
   * @param {string} [options.id] - unique id for this block
   * @param {BlockToolData} [options.data] - constructor params
   * @returns {Block}
   */
  composeBlock({
    tool: e,
    data: t = {},
    id: n = void 0,
    tunes: i = {}
  }) {
    const r = this.Editor.ReadOnly.isEnabled, s = this.Editor.Tools.blockTools.get(e), a = new re({
      id: n,
      data: t,
      tool: s,
      api: this.Editor.API,
      readOnly: r,
      tunesData: i
    }, this.eventsDispatcher);
    return r || this.bindBlockEvents(a), a;
  }
  /**
   * Insert new block into _blocks
   *
   * @param {object} options - insert options
   * @param {string} [options.id] - block's unique id
   * @param {string} [options.tool] - plugin name, by default method inserts the default block type
   * @param {object} [options.data] - plugin data
   * @param {number} [options.index] - index where to insert new Block
   * @param {boolean} [options.needToFocus] - flag shows if needed to update current Block index
   * @param {boolean} [options.replace] - flag shows if block by passed index should be replaced with inserted one
   * @returns {Block}
   */
  insert({
    id: e = void 0,
    tool: t = this.config.defaultBlock,
    data: n = {},
    index: i,
    needToFocus: r = !0,
    replace: s = !1,
    tunes: a = {}
  } = {}) {
    let l = i;
    l === void 0 && (l = this.currentBlockIndex + (s ? 0 : 1));
    const c = this.composeBlock({
      id: e,
      tool: t,
      data: n,
      tunes: a
    });
    return s && this.blockDidMutated(Tr, this.getBlockByIndex(l), {
      index: l
    }), this._blocks.insert(l, c, s), this.blockDidMutated(Br, c, {
      index: l
    }), r ? this.currentBlockIndex = l : l <= this.currentBlockIndex && this.currentBlockIndex++, c;
  }
  /**
   * Replace current working block
   *
   * @param {object} options - replace options
   * @param {string} options.tool — plugin name
   * @param {BlockToolData} options.data — plugin data
   * @returns {Block}
   */
  replace({
    tool: e = this.config.defaultBlock,
    data: t = {}
  }) {
    return this.insert({
      tool: e,
      data: t,
      index: this.currentBlockIndex,
      replace: !0
    });
  }
  /**
   * Insert pasted content. Call onPaste callback after insert.
   *
   * @param {string} toolName - name of Tool to insert
   * @param {PasteEvent} pasteEvent - pasted data
   * @param {boolean} replace - should replace current block
   */
  paste(e, t, n = !1) {
    const i = this.insert({
      tool: e,
      replace: n
    });
    try {
      i.call(et.ON_PASTE, t);
    } catch (r) {
      $(`${e}: onPaste callback call is failed`, "error", r);
    }
    return i;
  }
  /**
   * Insert new default block at passed index
   *
   * @param {number} index - index where Block should be inserted
   * @param {boolean} needToFocus - if true, updates current Block index
   *
   * TODO: Remove method and use insert() with index instead (?)
   * @returns {Block} inserted Block
   */
  insertDefaultBlockAtIndex(e, t = !1) {
    const n = this.composeBlock({ tool: this.config.defaultBlock });
    return this._blocks[e] = n, this.blockDidMutated(Br, n, {
      index: e
    }), t ? this.currentBlockIndex = e : e <= this.currentBlockIndex && this.currentBlockIndex++, n;
  }
  /**
   * Always inserts at the end
   *
   * @returns {Block}
   */
  insertAtEnd() {
    return this.currentBlockIndex = this.blocks.length - 1, this.insert();
  }
  /**
   * Merge two blocks
   *
   * @param {Block} targetBlock - previous block will be append to this block
   * @param {Block} blockToMerge - block that will be merged with target block
   * @returns {Promise} - the sequence that can be continued
   */
  async mergeBlocks(e, t) {
    const n = this._blocks.indexOf(t);
    if (t.isEmpty)
      return;
    const i = await t.data;
    Me(i) || await e.mergeWith(i), this.removeBlock(n), this.currentBlockIndex = this._blocks.indexOf(e);
  }
  /**
   * Remove block with passed index or remove last
   *
   * @param {number|null} index - index of Block to remove
   * @throws {Error} if Block to remove is not found
   */
  removeBlock(e = this.currentBlockIndex) {
    if (!this.validateIndex(e))
      throw new Error("Can't find a Block to remove");
    const t = this._blocks[e];
    t.destroy(), this._blocks.remove(e), this.blockDidMutated(Tr, t, {
      index: e
    }), this.currentBlockIndex >= e && this.currentBlockIndex--, this.blocks.length ? e === 0 && (this.currentBlockIndex = 0) : (this.currentBlockIndex = -1, this.insert());
  }
  /**
   * Remove only selected Blocks
   * and returns first Block index where started removing...
   *
   * @returns {number|undefined}
   */
  removeSelectedBlocks() {
    let e;
    for (let t = this.blocks.length - 1; t >= 0; t--)
      this.blocks[t].selected && (this.removeBlock(t), e = t);
    return e;
  }
  /**
   * Attention!
   * After removing insert the new default typed Block and focus on it
   * Removes all blocks
   */
  removeAllBlocks() {
    for (let e = this.blocks.length - 1; e >= 0; e--)
      this._blocks.remove(e);
    this.currentBlockIndex = -1, this.insert(), this.currentBlock.firstInput.focus();
  }
  /**
   * Split current Block
   * 1. Extract content from Caret position to the Block`s end
   * 2. Insert a new Block below current one with extracted content
   *
   * @returns {Block}
   */
  split() {
    const e = this.Editor.Caret.extractFragmentFromCaretPosition(), t = m.make("div");
    t.appendChild(e);
    const n = {
      text: m.isEmpty(t) ? "" : t.innerHTML
    };
    return this.insert({ data: n });
  }
  /**
   * Returns Block by passed index
   *
   * @param {number} index - index to get. -1 to get last
   * @returns {Block}
   */
  getBlockByIndex(e) {
    return e === -1 && (e = this._blocks.length - 1), this._blocks[e];
  }
  /**
   * Returns an index for passed Block
   *
   * @param block - block to find index
   */
  getBlockIndex(e) {
    return this._blocks.indexOf(e);
  }
  /**
   * Returns the Block by passed id
   *
   * @param id - id of block to get
   * @returns {Block}
   */
  getBlockById(e) {
    return this._blocks.array.find((t) => t.id === e);
  }
  /**
   * Get Block instance by html element
   *
   * @param {Node} element - html element to get Block by
   */
  getBlock(e) {
    m.isElement(e) || (e = e.parentNode);
    const t = this._blocks.nodes, n = e.closest(`.${re.CSS.wrapper}`), i = t.indexOf(n);
    if (i >= 0)
      return this._blocks[i];
  }
  /**
   * Remove selection from all Blocks then highlight only Current Block
   */
  highlightCurrentNode() {
    this.clearFocused(), this.currentBlock.focused = !0;
  }
  /**
   * Remove selection from all Blocks
   */
  clearFocused() {
    this.blocks.forEach((e) => {
      e.focused = !1;
    });
  }
  /**
   * 1) Find first-level Block from passed child Node
   * 2) Mark it as current
   *
   * @param {Node} childNode - look ahead from this node.
   * @returns {Block | undefined} can return undefined in case when the passed child note is not a part of the current editor instance
   */
  setCurrentBlockByChildNode(e) {
    m.isElement(e) || (e = e.parentNode);
    const t = e.closest(`.${re.CSS.wrapper}`);
    if (!t)
      return;
    const n = t.closest(`.${this.Editor.UI.CSS.editorWrapper}`);
    if (n != null && n.isEqualNode(this.Editor.UI.nodes.wrapper))
      return this.currentBlockIndex = this._blocks.nodes.indexOf(t), this.currentBlock.updateCurrentInput(), this.currentBlock;
  }
  /**
   * Return block which contents passed node
   *
   * @param {Node} childNode - node to get Block by
   * @returns {Block}
   */
  getBlockByChildNode(e) {
    m.isElement(e) || (e = e.parentNode);
    const t = e.closest(`.${re.CSS.wrapper}`);
    return this.blocks.find((n) => n.holder === t);
  }
  /**
   * Swap Blocks Position
   *
   * @param {number} fromIndex - index of first block
   * @param {number} toIndex - index of second block
   * @deprecated — use 'move' instead
   */
  swap(e, t) {
    this._blocks.swap(e, t), this.currentBlockIndex = t;
  }
  /**
   * Move a block to a new index
   *
   * @param {number} toIndex - index where to move Block
   * @param {number} fromIndex - index of Block to move
   */
  move(e, t = this.currentBlockIndex) {
    if (isNaN(e) || isNaN(t)) {
      $("Warning during 'move' call: incorrect indices provided.", "warn");
      return;
    }
    if (!this.validateIndex(e) || !this.validateIndex(t)) {
      $("Warning during 'move' call: indices cannot be lower than 0 or greater than the amount of blocks.", "warn");
      return;
    }
    this._blocks.move(e, t), this.currentBlockIndex = e, this.blockDidMutated(Bh, this.currentBlock, {
      fromIndex: t,
      toIndex: e
    });
  }
  /**
   * Sets current Block Index -1 which means unknown
   * and clear highlights
   */
  dropPointer() {
    this.currentBlockIndex = -1, this.clearFocused();
  }
  /**
   * Clears Editor
   *
   * @param {boolean} needToAddDefaultBlock - 1) in internal calls (for example, in api.blocks.render)
   *                                             we don't need to add an empty default block
   *                                        2) in api.blocks.clear we should add empty block
   */
  clear(e = !1) {
    this._blocks.removeAll(), this.dropPointer(), e && this.insert(), this.Editor.UI.checkEmptiness();
  }
  /**
   * Cleans up all the block tools' resources
   * This is called when editor is destroyed
   */
  async destroy() {
    await Promise.all(this.blocks.map((e) => e.destroy()));
  }
  /**
   * Bind Block events
   *
   * @param {Block} block - Block to which event should be bound
   */
  bindBlockEvents(e) {
    const { BlockEvents: t } = this.Editor;
    this.readOnlyMutableListeners.on(e.holder, "keydown", (n) => {
      t.keydown(n);
    }), this.readOnlyMutableListeners.on(e.holder, "keyup", (n) => {
      t.keyup(n);
    }), this.readOnlyMutableListeners.on(e.holder, "dragover", (n) => {
      t.dragOver(n);
    }), this.readOnlyMutableListeners.on(e.holder, "dragleave", (n) => {
      t.dragLeave(n);
    }), e.on("didMutated", (n) => this.blockDidMutated(_h, n, {
      index: this.getBlockIndex(n)
    }));
  }
  /**
   * Disable mutable handlers and bindings
   */
  disableModuleBindings() {
    this.readOnlyMutableListeners.clearAll();
  }
  /**
   * Enables all module handlers and bindings for all Blocks
   */
  enableModuleBindings() {
    this.readOnlyMutableListeners.on(
      document,
      "cut",
      (e) => this.Editor.BlockEvents.handleCommandX(e)
    ), this.blocks.forEach((e) => {
      this.bindBlockEvents(e);
    });
  }
  /**
   * Validates that the given index is not lower than 0 or higher than the amount of blocks
   *
   * @param {number} index - index of blocks array to validate
   * @returns {boolean}
   */
  validateIndex(e) {
    return !(e < 0 || e >= this._blocks.length);
  }
  /**
   * Block mutation callback
   *
   * @param mutationType - what happened with block
   * @param block - mutated block
   * @param detailData - additional data to pass with change event
   */
  blockDidMutated(e, t, n) {
    const i = new CustomEvent(e, {
      detail: {
        target: new oo(t),
        ...n
      }
    });
    return this.eventsDispatcher.emit(Vs, {
      event: i
    }), t;
  }
}
class Ih extends W {
  constructor() {
    super(...arguments), this.anyBlockSelectedCache = null, this.needToSelectAll = !1, this.nativeInputSelected = !1, this.readyToBlockSelection = !1;
  }
  /**
   * Sanitizer Config
   *
   * @returns {SanitizerConfig}
   */
  get sanitizerConfig() {
    return {
      p: {},
      h1: {},
      h2: {},
      h3: {},
      h4: {},
      h5: {},
      h6: {},
      ol: {},
      ul: {},
      li: {},
      br: !0,
      img: {
        src: !0,
        width: !0,
        height: !0
      },
      a: {
        href: !0
      },
      b: {},
      i: {},
      u: {}
    };
  }
  /**
   * Flag that identifies all Blocks selection
   *
   * @returns {boolean}
   */
  get allBlocksSelected() {
    const { BlockManager: e } = this.Editor;
    return e.blocks.every((t) => t.selected === !0);
  }
  /**
   * Set selected all blocks
   *
   * @param {boolean} state - state to set
   */
  set allBlocksSelected(e) {
    const { BlockManager: t } = this.Editor;
    t.blocks.forEach((n) => {
      n.selected = e;
    }), this.clearCache();
  }
  /**
   * Flag that identifies any Block selection
   *
   * @returns {boolean}
   */
  get anyBlockSelected() {
    const { BlockManager: e } = this.Editor;
    return this.anyBlockSelectedCache === null && (this.anyBlockSelectedCache = e.blocks.some((t) => t.selected === !0)), this.anyBlockSelectedCache;
  }
  /**
   * Return selected Blocks array
   *
   * @returns {Block[]}
   */
  get selectedBlocks() {
    return this.Editor.BlockManager.blocks.filter((e) => e.selected);
  }
  /**
   * Module Preparation
   * Registers Shortcuts CMD+A and CMD+C
   * to select all and copy them
   */
  prepare() {
    this.selection = new R(), Ft.add({
      name: "CMD+A",
      handler: (e) => {
        const { BlockManager: t, ReadOnly: n } = this.Editor;
        if (n.isEnabled) {
          e.preventDefault(), this.selectAllBlocks();
          return;
        }
        t.currentBlock && this.handleCommandA(e);
      },
      on: this.Editor.UI.nodes.redactor
    });
  }
  /**
   * Toggle read-only state
   *
   *  - Remove all ranges
   *  - Unselect all Blocks
   */
  toggleReadOnly() {
    R.get().removeAllRanges(), this.allBlocksSelected = !1;
  }
  /**
   * Remove selection of Block
   *
   * @param {number?} index - Block index according to the BlockManager's indexes
   */
  unSelectBlockByIndex(e) {
    const { BlockManager: t } = this.Editor;
    let n;
    isNaN(e) ? n = t.currentBlock : n = t.getBlockByIndex(e), n.selected = !1, this.clearCache();
  }
  /**
   * Clear selection from Blocks
   *
   * @param {Event} reason - event caused clear of selection
   * @param {boolean} restoreSelection - if true, restore saved selection
   */
  clearSelection(e, t = !1) {
    const { BlockManager: n, Caret: i, RectangleSelection: r } = this.Editor;
    this.needToSelectAll = !1, this.nativeInputSelected = !1, this.readyToBlockSelection = !1;
    const s = e && e instanceof KeyboardEvent, a = s && Ps(e.keyCode);
    if (this.anyBlockSelected && s && a && !R.isSelectionExists) {
      const l = n.removeSelectedBlocks();
      n.insertDefaultBlockAtIndex(l, !0), i.setToBlock(n.currentBlock), vt(() => {
        const c = e.key;
        i.insertContentAtCaretPosition(c.length > 1 ? "" : c);
      }, 20)();
    }
    if (this.Editor.CrossBlockSelection.clear(e), !this.anyBlockSelected || r.isRectActivated()) {
      this.Editor.RectangleSelection.clearSelection();
      return;
    }
    t && this.selection.restore(), this.allBlocksSelected = !1;
  }
  /**
   * Reduce each Block and copy its content
   *
   * @param {ClipboardEvent} e - copy/cut event
   * @returns {Promise<void>}
   */
  copySelectedBlocks(e) {
    e.preventDefault();
    const t = m.make("div");
    this.selectedBlocks.forEach((r) => {
      const s = ze(r.holder.innerHTML, this.sanitizerConfig), a = m.make("p");
      a.innerHTML = s, t.appendChild(a);
    });
    const n = Array.from(t.childNodes).map((r) => r.textContent).join(`

`), i = t.innerHTML;
    return e.clipboardData.setData("text/plain", n), e.clipboardData.setData("text/html", i), Promise.all(this.selectedBlocks.map((r) => r.save())).then((r) => {
      try {
        e.clipboardData.setData(this.Editor.Paste.MIME_TYPE, JSON.stringify(r));
      } catch {
      }
    });
  }
  /**
   * select Block
   *
   * @param {number?} index - Block index according to the BlockManager's indexes
   */
  selectBlockByIndex(e) {
    const { BlockManager: t } = this.Editor;
    t.clearFocused();
    let n;
    isNaN(e) ? n = t.currentBlock : n = t.getBlockByIndex(e), this.selection.save(), R.get().removeAllRanges(), n.selected = !0, this.clearCache(), this.Editor.InlineToolbar.close();
  }
  /**
   * Clear anyBlockSelected cache
   */
  clearCache() {
    this.anyBlockSelectedCache = null;
  }
  /**
   * Module destruction
   * De-registers Shortcut CMD+A
   */
  destroy() {
    Ft.remove(this.Editor.UI.nodes.redactor, "CMD+A");
  }
  /**
   * First CMD+A selects all input content by native behaviour,
   * next CMD+A keypress selects all blocks
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  handleCommandA(e) {
    if (this.Editor.RectangleSelection.clearSelection(), m.isNativeInput(e.target) && !this.readyToBlockSelection) {
      this.readyToBlockSelection = !0;
      return;
    }
    const t = this.Editor.BlockManager.getBlock(e.target).inputs;
    if (t.length > 1 && !this.readyToBlockSelection) {
      this.readyToBlockSelection = !0;
      return;
    }
    if (t.length === 1 && !this.needToSelectAll) {
      this.needToSelectAll = !0;
      return;
    }
    this.needToSelectAll ? (e.preventDefault(), this.selectAllBlocks(), this.needToSelectAll = !1, this.readyToBlockSelection = !1, this.Editor.ConversionToolbar.close()) : this.readyToBlockSelection && (e.preventDefault(), this.selectBlockByIndex(), this.needToSelectAll = !0);
  }
  /**
   * Select All Blocks
   * Each Block has selected setter that makes Block copyable
   */
  selectAllBlocks() {
    this.selection.save(), R.get().removeAllRanges(), this.allBlocksSelected = !0, this.Editor.InlineToolbar.close();
  }
}
class Ko extends W {
  /**
   * Allowed caret positions in input
   *
   * @static
   * @returns {{START: string, END: string, DEFAULT: string}}
   */
  get positions() {
    return {
      START: "start",
      END: "end",
      DEFAULT: "default"
    };
  }
  /**
   * Elements styles that can be useful for Caret Module
   */
  static get CSS() {
    return {
      shadowCaret: "cdx-shadow-caret"
    };
  }
  /**
   * Get's deepest first node and checks if offset is zero
   *
   * @returns {boolean}
   */
  get isAtStart() {
    const e = R.get(), t = m.getDeepestNode(this.Editor.BlockManager.currentBlock.currentInput);
    let n = e.focusNode;
    if (m.isNativeInput(t))
      return t.selectionEnd === 0;
    if (!e.anchorNode)
      return !1;
    let i = n.textContent.search(/\S/);
    i === -1 && (i = 0);
    let r = e.focusOffset;
    return n.nodeType !== Node.TEXT_NODE && n.childNodes.length && (n.childNodes[r] ? (n = n.childNodes[r], r = 0) : (n = n.childNodes[r - 1], r = n.textContent.length)), (m.isLineBreakTag(t) || m.isEmpty(t)) && this.getHigherLevelSiblings(n, "left").every((s) => {
      const a = m.isLineBreakTag(s), l = s.children.length === 1 && m.isLineBreakTag(s.children[0]), c = a || l;
      return m.isEmpty(s) && !c;
    }) && r === i ? !0 : t === null || n === t && r <= i;
  }
  /**
   * Get's deepest last node and checks if offset is last node text length
   *
   * @returns {boolean}
   */
  get isAtEnd() {
    const e = R.get();
    let t = e.focusNode;
    const n = m.getDeepestNode(this.Editor.BlockManager.currentBlock.currentInput, !0);
    if (m.isNativeInput(n))
      return n.selectionEnd === n.value.length;
    if (!e.focusNode)
      return !1;
    let i = e.focusOffset;
    if (t.nodeType !== Node.TEXT_NODE && t.childNodes.length && (t.childNodes[i - 1] ? (t = t.childNodes[i - 1], i = t.textContent.length) : (t = t.childNodes[0], i = 0)), m.isLineBreakTag(n) || m.isEmpty(n)) {
      const s = this.getHigherLevelSiblings(t, "right");
      if (s.every((a, l) => l === s.length - 1 && m.isLineBreakTag(a) || m.isEmpty(a) && !m.isLineBreakTag(a)) && i === t.textContent.length)
        return !0;
    }
    const r = n.textContent.replace(/\s+$/, "");
    return t === n && i >= r.length;
  }
  /**
   * Method gets Block instance and puts caret to the text node with offset
   * There two ways that method applies caret position:
   *   - first found text node: sets at the beginning, but you can pass an offset
   *   - last found text node: sets at the end of the node. Also, you can customize the behaviour
   *
   * @param {Block} block - Block class
   * @param {string} position - position where to set caret.
   *                            If default - leave default behaviour and apply offset if it's passed
   * @param {number} offset - caret offset regarding to the text node
   */
  setToBlock(e, t = this.positions.DEFAULT, n = 0) {
    const { BlockManager: i } = this.Editor;
    let r;
    switch (t) {
      case this.positions.START:
        r = e.firstInput;
        break;
      case this.positions.END:
        r = e.lastInput;
        break;
      default:
        r = e.currentInput;
    }
    if (!r)
      return;
    const s = m.getDeepestNode(r, t === this.positions.END), a = m.getContentLength(s);
    switch (!0) {
      case t === this.positions.START:
        n = 0;
        break;
      case t === this.positions.END:
      case n > a:
        n = a;
        break;
    }
    vt(() => {
      this.set(s, n);
    }, 20)(), i.setCurrentBlockByChildNode(e.holder), i.currentBlock.currentInput = r;
  }
  /**
   * Set caret to the current input of current Block.
   *
   * @param {HTMLElement} input - input where caret should be set
   * @param {string} position - position of the caret.
   *                            If default - leave default behaviour and apply offset if it's passed
   * @param {number} offset - caret offset regarding to the text node
   */
  setToInput(e, t = this.positions.DEFAULT, n = 0) {
    const { currentBlock: i } = this.Editor.BlockManager, r = m.getDeepestNode(e);
    switch (t) {
      case this.positions.START:
        this.set(r, 0);
        break;
      case this.positions.END:
        this.set(r, m.getContentLength(r));
        break;
      default:
        n && this.set(r, n);
    }
    i.currentInput = e;
  }
  /**
   * Creates Document Range and sets caret to the element with offset
   *
   * @param {HTMLElement} element - target node.
   * @param {number} offset - offset
   */
  set(e, t = 0) {
    const { top: n, bottom: i } = R.setCursor(e, t), { innerHeight: r } = window;
    n < 0 && window.scrollBy(0, n), i > r && window.scrollBy(0, i - r);
  }
  /**
   * Set Caret to the last Block
   * If last block is not empty, append another empty block
   */
  setToTheLastBlock() {
    const e = this.Editor.BlockManager.lastBlock;
    if (e)
      if (e.tool.isDefault && e.isEmpty)
        this.setToBlock(e);
      else {
        const t = this.Editor.BlockManager.insertAtEnd();
        this.setToBlock(t);
      }
  }
  /**
   * Extract content fragment of current Block from Caret position to the end of the Block
   */
  extractFragmentFromCaretPosition() {
    const e = R.get();
    if (e.rangeCount) {
      const t = e.getRangeAt(0), n = this.Editor.BlockManager.currentBlock.currentInput;
      if (t.deleteContents(), n)
        if (m.isNativeInput(n)) {
          const i = n, r = document.createDocumentFragment(), s = i.value.substring(0, i.selectionStart), a = i.value.substring(i.selectionStart);
          return r.textContent = a, i.value = s, r;
        } else {
          const i = t.cloneRange();
          return i.selectNodeContents(n), i.setStart(t.endContainer, t.endOffset), i.extractContents();
        }
    }
  }
  /**
   * Set's caret to the next Block or Tool`s input
   * Before moving caret, we should check if caret position is at the end of Plugins node
   * Using {@link Dom#getDeepestNode} to get a last node and match with current selection
   *
   * @returns {boolean}
   */
  navigateNext() {
    const { BlockManager: e } = this.Editor, { currentBlock: t, nextContentfulBlock: n } = e, { nextInput: i } = t, r = this.isAtEnd;
    let s = n;
    if (!s && !i) {
      if (t.tool.isDefault || !r)
        return !1;
      s = e.insertAtEnd();
    }
    return r ? (i ? this.setToInput(i, this.positions.START) : this.setToBlock(s, this.positions.START), !0) : !1;
  }
  /**
   * Set's caret to the previous Tool`s input or Block
   * Before moving caret, we should check if caret position is start of the Plugins node
   * Using {@link Dom#getDeepestNode} to get a last node and match with current selection
   *
   * @returns {boolean}
   */
  navigatePrevious() {
    const { currentBlock: e, previousContentfulBlock: t } = this.Editor.BlockManager;
    if (!e)
      return !1;
    const { previousInput: n } = e;
    return !t && !n ? !1 : this.isAtStart ? (n ? this.setToInput(n, this.positions.END) : this.setToBlock(t, this.positions.END), !0) : !1;
  }
  /**
   * Inserts shadow element after passed element where caret can be placed
   *
   * @param {Element} element - element after which shadow caret should be inserted
   */
  createShadow(e) {
    const t = document.createElement("span");
    t.classList.add(Ko.CSS.shadowCaret), e.insertAdjacentElement("beforeend", t);
  }
  /**
   * Restores caret position
   *
   * @param {HTMLElement} element - element where caret should be restored
   */
  restoreCaret(e) {
    const t = e.querySelector(`.${Ko.CSS.shadowCaret}`);
    t && (new R().expandToTag(t), setTimeout(() => {
      const n = document.createRange();
      n.selectNode(t), n.extractContents();
    }, 50));
  }
  /**
   * Inserts passed content at caret position
   *
   * @param {string} content - content to insert
   */
  insertContentAtCaretPosition(e) {
    const t = document.createDocumentFragment(), n = document.createElement("div"), i = R.get(), r = R.range;
    n.innerHTML = e, Array.from(n.childNodes).forEach((l) => t.appendChild(l)), t.childNodes.length === 0 && t.appendChild(new Text());
    const s = t.lastChild;
    r.deleteContents(), r.insertNode(t);
    const a = document.createRange();
    a.setStart(s, s.textContent.length), i.removeAllRanges(), i.addRange(a);
  }
  /**
   * Get all first-level (first child of [contenteditable]) siblings from passed node
   * Then you can check it for emptiness
   *
   * @example
   * <div contenteditable>
   * <p></p>                            |
   * <p></p>                            | left first-level siblings
   * <p></p>                            |
   * <blockquote><a><b>adaddad</b><a><blockquote>       <-- passed node for example <b>
   * <p></p>                            |
   * <p></p>                            | right first-level siblings
   * <p></p>                            |
   * </div>
   * @param {HTMLElement} from - element from which siblings should be searched
   * @param {'left' | 'right'} direction - direction of search
   * @returns {HTMLElement[]}
   */
  getHigherLevelSiblings(e, t) {
    let n = e;
    const i = [];
    for (; n.parentNode && n.parentNode.contentEditable !== "true"; )
      n = n.parentNode;
    const r = t === "left" ? "previousSibling" : "nextSibling";
    for (; n[r]; )
      n = n[r], i.push(n);
    return i;
  }
}
class Ah extends W {
  constructor() {
    super(...arguments), this.onMouseUp = () => {
      this.listeners.off(document, "mouseover", this.onMouseOver), this.listeners.off(document, "mouseup", this.onMouseUp);
    }, this.onMouseOver = (e) => {
      const { BlockManager: t, BlockSelection: n } = this.Editor, i = t.getBlockByChildNode(e.relatedTarget) || this.lastSelectedBlock, r = t.getBlockByChildNode(e.target);
      if (!(!i || !r) && r !== i) {
        if (i === this.firstSelectedBlock) {
          R.get().removeAllRanges(), i.selected = !0, r.selected = !0, n.clearCache();
          return;
        }
        if (r === this.firstSelectedBlock) {
          i.selected = !1, r.selected = !1, n.clearCache();
          return;
        }
        this.Editor.InlineToolbar.close(), this.toggleBlocksSelectedState(i, r), this.lastSelectedBlock = r;
      }
    };
  }
  /**
   * Module preparation
   *
   * @returns {Promise}
   */
  async prepare() {
    this.listeners.on(document, "mousedown", (e) => {
      this.enableCrossBlockSelection(e);
    });
  }
  /**
   * Sets up listeners
   *
   * @param {MouseEvent} event - mouse down event
   */
  watchSelection(e) {
    if (e.button !== mu.LEFT)
      return;
    const { BlockManager: t } = this.Editor;
    this.firstSelectedBlock = t.getBlock(e.target), this.lastSelectedBlock = this.firstSelectedBlock, this.listeners.on(document, "mouseover", this.onMouseOver), this.listeners.on(document, "mouseup", this.onMouseUp);
  }
  /**
   * return boolean is cross block selection started
   */
  get isCrossBlockSelectionStarted() {
    return !!this.firstSelectedBlock && !!this.lastSelectedBlock;
  }
  /**
   * Change selection state of the next Block
   * Used for CBS via Shift + arrow keys
   *
   * @param {boolean} next - if true, toggle next block. Previous otherwise
   */
  toggleBlockSelectedState(e = !0) {
    const { BlockManager: t, BlockSelection: n } = this.Editor;
    this.lastSelectedBlock || (this.lastSelectedBlock = this.firstSelectedBlock = t.currentBlock), this.firstSelectedBlock === this.lastSelectedBlock && (this.firstSelectedBlock.selected = !0, n.clearCache(), R.get().removeAllRanges());
    const i = t.blocks.indexOf(this.lastSelectedBlock) + (e ? 1 : -1), r = t.blocks[i];
    r && (this.lastSelectedBlock.selected !== r.selected ? (r.selected = !0, n.clearCache()) : (this.lastSelectedBlock.selected = !1, n.clearCache()), this.lastSelectedBlock = r, this.Editor.InlineToolbar.close(), r.holder.scrollIntoView({
      block: "nearest"
    }));
  }
  /**
   * Clear saved state
   *
   * @param {Event} reason - event caused clear of selection
   */
  clear(e) {
    const { BlockManager: t, BlockSelection: n, Caret: i } = this.Editor, r = t.blocks.indexOf(this.firstSelectedBlock), s = t.blocks.indexOf(this.lastSelectedBlock);
    if (n.anyBlockSelected && r > -1 && s > -1)
      if (e && e instanceof KeyboardEvent)
        switch (e.keyCode) {
          case j.DOWN:
          case j.RIGHT:
            i.setToBlock(t.blocks[Math.max(r, s)], i.positions.END);
            break;
          case j.UP:
          case j.LEFT:
            i.setToBlock(t.blocks[Math.min(r, s)], i.positions.START);
            break;
          default:
            i.setToBlock(t.blocks[Math.max(r, s)], i.positions.END);
        }
      else
        i.setToBlock(t.blocks[Math.max(r, s)], i.positions.END);
    this.firstSelectedBlock = this.lastSelectedBlock = null;
  }
  /**
   * Enables Cross Block Selection
   *
   * @param {MouseEvent} event - mouse down event
   */
  enableCrossBlockSelection(e) {
    const { UI: t } = this.Editor;
    R.isCollapsed || this.Editor.BlockSelection.clearSelection(e), t.nodes.redactor.contains(e.target) ? this.watchSelection(e) : this.Editor.BlockSelection.clearSelection(e);
  }
  /**
   * Change blocks selection state between passed two blocks.
   *
   * @param {Block} firstBlock - first block in range
   * @param {Block} lastBlock - last block in range
   */
  toggleBlocksSelectedState(e, t) {
    const { BlockManager: n, BlockSelection: i } = this.Editor, r = n.blocks.indexOf(e), s = n.blocks.indexOf(t), a = e.selected !== t.selected;
    for (let l = Math.min(r, s); l <= Math.max(r, s); l++) {
      const c = n.blocks[l];
      c !== this.firstSelectedBlock && c !== (a ? e : t) && (n.blocks[l].selected = !n.blocks[l].selected, i.clearCache());
    }
  }
}
class Mh extends W {
  constructor() {
    super(...arguments), this.isStartedAtEditor = !1;
  }
  /**
   * Toggle read-only state
   *
   * if state is true:
   *  - disable all drag-n-drop event handlers
   *
   * if state is false:
   *  - restore drag-n-drop event handlers
   *
   * @param {boolean} readOnlyEnabled - "read only" state
   */
  toggleReadOnly(e) {
    e ? this.disableModuleBindings() : this.enableModuleBindings();
  }
  /**
   * Add drag events listeners to editor zone
   */
  enableModuleBindings() {
    const { UI: e } = this.Editor;
    this.readOnlyMutableListeners.on(e.nodes.holder, "drop", async (t) => {
      await this.processDrop(t);
    }, !0), this.readOnlyMutableListeners.on(e.nodes.holder, "dragstart", () => {
      this.processDragStart();
    }), this.readOnlyMutableListeners.on(e.nodes.holder, "dragover", (t) => {
      this.processDragOver(t);
    }, !0);
  }
  /**
   * Unbind drag-n-drop event handlers
   */
  disableModuleBindings() {
    this.readOnlyMutableListeners.clearAll();
  }
  /**
   * Handle drop event
   *
   * @param {DragEvent} dropEvent - drop event
   */
  async processDrop(e) {
    const {
      BlockManager: t,
      Caret: n,
      Paste: i
    } = this.Editor;
    e.preventDefault(), t.blocks.forEach((s) => {
      s.dropTarget = !1;
    }), R.isAtEditor && !R.isCollapsed && this.isStartedAtEditor && document.execCommand("delete"), this.isStartedAtEditor = !1;
    const r = t.setCurrentBlockByChildNode(e.target);
    if (r)
      this.Editor.Caret.setToBlock(r, n.positions.END);
    else {
      const s = t.setCurrentBlockByChildNode(t.lastBlock.holder);
      this.Editor.Caret.setToBlock(s, n.positions.END);
    }
    await i.processDataTransfer(e.dataTransfer, !0);
  }
  /**
   * Handle drag start event
   */
  processDragStart() {
    R.isAtEditor && !R.isCollapsed && (this.isStartedAtEditor = !0), this.Editor.InlineToolbar.close();
  }
  /**
   * @param {DragEvent} dragEvent - drag event
   */
  processDragOver(e) {
    e.preventDefault();
  }
}
class Lh extends W {
  /**
   * Prepare the module
   *
   * @param options - options used by the modification observer module
   * @param options.config - Editor configuration object
   * @param options.eventsDispatcher - common Editor event bus
   */
  constructor({ config: e, eventsDispatcher: t }) {
    super({
      config: e,
      eventsDispatcher: t
    }), this.disabled = !1, this.batchingTimeout = null, this.batchingOnChangeQueue = /* @__PURE__ */ new Map(), this.batchTime = 400, this.mutationObserver = new MutationObserver((n) => {
      this.redactorChanged(n);
    }), this.eventsDispatcher.on(Vs, (n) => {
      this.particularBlockChanged(n.event);
    }), this.eventsDispatcher.on(Ws, () => {
      this.disable();
    }), this.eventsDispatcher.on(Ys, () => {
      this.enable();
    });
  }
  /**
   * Enables onChange event
   */
  enable() {
    this.mutationObserver.observe(
      this.Editor.UI.nodes.redactor,
      {
        childList: !0,
        subtree: !0,
        characterData: !0,
        attributes: !0
      }
    ), this.disabled = !1;
  }
  /**
   * Disables onChange event
   */
  disable() {
    this.mutationObserver.disconnect(), this.disabled = !0;
  }
  /**
   * Call onChange event passed to Editor.js configuration
   *
   * @param event - some of our custom change events
   */
  particularBlockChanged(e) {
    this.disabled || !Z(this.config.onChange) || (this.batchingOnChangeQueue.set(`block:${e.detail.target.id}:event:${e.type}`, e), this.batchingTimeout && clearTimeout(this.batchingTimeout), this.batchingTimeout = setTimeout(() => {
      let t;
      this.batchingOnChangeQueue.size === 1 ? t = this.batchingOnChangeQueue.values().next().value : t = Array.from(this.batchingOnChangeQueue.values()), this.config.onChange && this.config.onChange(this.Editor.API.methods, t), this.batchingOnChangeQueue.clear();
    }, this.batchTime));
  }
  /**
   * Fired on every blocks wrapper dom change
   *
   * @param mutations - mutations happened
   */
  redactorChanged(e) {
    this.eventsDispatcher.emit(Vn, {
      mutations: e
    });
  }
}
const oa = class extends W {
  constructor() {
    super(...arguments), this.MIME_TYPE = "application/x-editor-js", this.toolsTags = {}, this.tagsByTool = {}, this.toolsPatterns = [], this.toolsFiles = {}, this.exceptionList = [], this.processTool = (o) => {
      try {
        const e = o.create({}, {}, !1);
        if (o.pasteConfig === !1) {
          this.exceptionList.push(o.name);
          return;
        }
        if (!Z(e.onPaste))
          return;
        this.getTagsConfig(o), this.getFilesConfig(o), this.getPatternsConfig(o);
      } catch (e) {
        $(
          `Paste handling for «${o.name}» Tool hasn't been set up because of the error`,
          "warn",
          e
        );
      }
    }, this.handlePasteEvent = async (o) => {
      const { BlockManager: e, Toolbar: t } = this.Editor;
      !e.currentBlock || this.isNativeBehaviour(o.target) && !o.clipboardData.types.includes("Files") || e.currentBlock && this.exceptionList.includes(e.currentBlock.name) || (o.preventDefault(), this.processDataTransfer(o.clipboardData), e.clearFocused(), t.close());
    };
  }
  /**
   * Set onPaste callback and collect tools` paste configurations
   */
  async prepare() {
    this.processTools();
  }
  /**
   * Set read-only state
   *
   * @param {boolean} readOnlyEnabled - read only flag value
   */
  toggleReadOnly(o) {
    o ? this.unsetCallback() : this.setCallback();
  }
  /**
   * Handle pasted or dropped data transfer object
   *
   * @param {DataTransfer} dataTransfer - pasted or dropped data transfer object
   * @param {boolean} isDragNDrop - true if data transfer comes from drag'n'drop events
   */
  async processDataTransfer(o, e = !1) {
    const { Tools: t } = this.Editor, n = o.types;
    if ((n.includes ? n.includes("Files") : n.contains("Files")) && !Me(this.toolsFiles)) {
      await this.processFiles(o.files);
      return;
    }
    const i = o.getData(this.MIME_TYPE), r = o.getData("text/plain");
    let s = o.getData("text/html");
    if (i)
      try {
        this.insertEditorJSData(JSON.parse(i));
        return;
      } catch {
      }
    e && r.trim() && s.trim() && (s = "<p>" + (s.trim() ? s : r) + "</p>");
    const a = Object.keys(this.toolsTags).reduce((u, d) => (u[d.toLowerCase()] = this.toolsTags[d].sanitizationConfig ?? {}, u), {}), l = Object.assign({}, a, t.getAllInlineToolsSanitizeConfig(), { br: {} }), c = ze(s, l);
    !c.trim() || c.trim() === r || !m.isHTMLString(c) ? await this.processText(r) : await this.processText(c, !0);
  }
  /**
   * Process pasted text and divide them into Blocks
   *
   * @param {string} data - text to process. Can be HTML or plain.
   * @param {boolean} isHTML - if passed string is HTML, this parameter should be true
   */
  async processText(o, e = !1) {
    const { Caret: t, BlockManager: n } = this.Editor, i = e ? this.processHTML(o) : this.processPlain(o);
    if (!i.length)
      return;
    if (i.length === 1) {
      i[0].isBlock ? this.processSingleBlock(i.pop()) : this.processInlinePaste(i.pop());
      return;
    }
    const r = n.currentBlock && n.currentBlock.tool.isDefault && n.currentBlock.isEmpty;
    i.map(
      async (s, a) => this.insertBlock(s, a === 0 && r)
    ), n.currentBlock && t.setToBlock(n.currentBlock, t.positions.END);
  }
  /**
   * Set onPaste callback handler
   */
  setCallback() {
    this.listeners.on(this.Editor.UI.nodes.holder, "paste", this.handlePasteEvent);
  }
  /**
   * Unset onPaste callback handler
   */
  unsetCallback() {
    this.listeners.off(this.Editor.UI.nodes.holder, "paste", this.handlePasteEvent);
  }
  /**
   * Get and process tool`s paste configs
   */
  processTools() {
    const o = this.Editor.Tools.blockTools;
    Array.from(o.values()).forEach(this.processTool);
  }
  /**
   * Get tags name list from either tag name or sanitization config.
   *
   * @param {string | object} tagOrSanitizeConfig - tag name or sanitize config object.
   * @returns {string[]} array of tags.
   */
  collectTagNames(o) {
    return nt(o) ? [o] : ce(o) ? Object.keys(o) : [];
  }
  /**
   * Get tags to substitute by Tool
   *
   * @param tool - BlockTool object
   */
  getTagsConfig(o) {
    if (o.pasteConfig === !1)
      return;
    const e = o.pasteConfig.tags || [], t = [];
    e.forEach((n) => {
      const i = this.collectTagNames(n);
      t.push(...i), i.forEach((r) => {
        if (Object.prototype.hasOwnProperty.call(this.toolsTags, r)) {
          $(
            `Paste handler for «${o.name}» Tool on «${r}» tag is skipped because it is already used by «${this.toolsTags[r].tool.name}» Tool.`,
            "warn"
          );
          return;
        }
        const s = ce(n) ? n[r] : null;
        this.toolsTags[r.toUpperCase()] = {
          tool: o,
          sanitizationConfig: s
        };
      });
    }), this.tagsByTool[o.name] = t.map((n) => n.toUpperCase());
  }
  /**
   * Get files` types and extensions to substitute by Tool
   *
   * @param tool - BlockTool object
   */
  getFilesConfig(o) {
    if (o.pasteConfig === !1)
      return;
    const { files: e = {} } = o.pasteConfig;
    let { extensions: t, mimeTypes: n } = e;
    !t && !n || (t && !Array.isArray(t) && ($(`«extensions» property of the onDrop config for «${o.name}» Tool should be an array`), t = []), n && !Array.isArray(n) && ($(`«mimeTypes» property of the onDrop config for «${o.name}» Tool should be an array`), n = []), n && (n = n.filter((i) => yu(i) ? !0 : ($(`MIME type value «${i}» for the «${o.name}» Tool is not a valid MIME type`, "warn"), !1))), this.toolsFiles[o.name] = {
      extensions: t || [],
      mimeTypes: n || []
    });
  }
  /**
   * Get RegExp patterns to substitute by Tool
   *
   * @param tool - BlockTool object
   */
  getPatternsConfig(o) {
    o.pasteConfig === !1 || !o.pasteConfig.patterns || Me(o.pasteConfig.patterns) || Object.entries(o.pasteConfig.patterns).forEach(([e, t]) => {
      t instanceof RegExp || $(
        `Pattern ${t} for «${o.name}» Tool is skipped because it should be a Regexp instance.`,
        "warn"
      ), this.toolsPatterns.push({
        key: e,
        pattern: t,
        tool: o
      });
    });
  }
  /**
   * Check if browser behavior suits better
   *
   * @param {EventTarget} element - element where content has been pasted
   * @returns {boolean}
   */
  isNativeBehaviour(o) {
    return m.isNativeInput(o);
  }
  /**
   * Get files from data transfer object and insert related Tools
   *
   * @param {FileList} items - pasted or dropped items
   */
  async processFiles(o) {
    const { BlockManager: e } = this.Editor;
    let t;
    t = await Promise.all(
      Array.from(o).map((i) => this.processFile(i))
    ), t = t.filter((i) => !!i);
    const n = e.currentBlock.tool.isDefault && e.currentBlock.isEmpty;
    t.forEach(
      (i, r) => {
        e.paste(i.type, i.event, r === 0 && n);
      }
    );
  }
  /**
   * Get information about file and find Tool to handle it
   *
   * @param {File} file - file to process
   */
  async processFile(o) {
    const e = wu(o), t = Object.entries(this.toolsFiles).find(([i, { mimeTypes: r, extensions: s }]) => {
      const [a, l] = o.type.split("/"), c = s.find((d) => d.toLowerCase() === e.toLowerCase()), u = r.find((d) => {
        const [h, f] = d.split("/");
        return h === a && (f === l || f === "*");
      });
      return !!c || !!u;
    });
    if (!t)
      return;
    const [n] = t;
    return {
      event: this.composePasteEvent("file", {
        file: o
      }),
      type: n
    };
  }
  /**
   * Split HTML string to blocks and return it as array of Block data
   *
   * @param {string} innerHTML - html string to process
   * @returns {PasteData[]}
   */
  processHTML(o) {
    const { Tools: e } = this.Editor, t = m.make("DIV");
    return t.innerHTML = o, this.getNodes(t).map((n) => {
      let i, r = e.defaultTool, s = !1;
      switch (n.nodeType) {
        case Node.DOCUMENT_FRAGMENT_NODE:
          i = m.make("div"), i.appendChild(n);
          break;
        case Node.ELEMENT_NODE:
          i = n, s = !0, this.toolsTags[i.tagName] && (r = this.toolsTags[i.tagName].tool);
          break;
      }
      const { tags: a } = r.pasteConfig || { tags: [] }, l = a.reduce((d, h) => (this.collectTagNames(h).forEach((f) => {
        const p = ce(h) ? h[f] : null;
        d[f.toLowerCase()] = p || {};
      }), d), {}), c = Object.assign({}, l, r.baseSanitizeConfig);
      if (i.tagName.toLowerCase() === "table") {
        const d = ze(i.outerHTML, c);
        i = m.make("div", void 0, {
          innerHTML: d
        }).firstChild;
      } else
        i.innerHTML = ze(i.innerHTML, c);
      const u = this.composePasteEvent("tag", {
        data: i
      });
      return {
        content: i,
        isBlock: s,
        tool: r.name,
        event: u
      };
    }).filter((n) => {
      const i = m.isEmpty(n.content), r = m.isSingleTag(n.content);
      return !i || r;
    });
  }
  /**
   * Split plain text by new line symbols and return it as array of Block data
   *
   * @param {string} plain - string to process
   * @returns {PasteData[]}
   */
  processPlain(o) {
    const { defaultBlock: e } = this.config;
    if (!o)
      return [];
    const t = e;
    return o.split(/\r?\n/).filter((n) => n.trim()).map((n) => {
      const i = m.make("div");
      i.textContent = n;
      const r = this.composePasteEvent("tag", {
        data: i
      });
      return {
        content: i,
        tool: t,
        isBlock: !1,
        event: r
      };
    });
  }
  /**
   * Process paste of single Block tool content
   *
   * @param {PasteData} dataToInsert - data of Block to insert
   */
  async processSingleBlock(o) {
    const { Caret: e, BlockManager: t } = this.Editor, { currentBlock: n } = t;
    if (!n || o.tool !== n.name || !m.containsOnlyInlineElements(o.content.innerHTML)) {
      this.insertBlock(o, (n == null ? void 0 : n.tool.isDefault) && n.isEmpty);
      return;
    }
    e.insertContentAtCaretPosition(o.content.innerHTML);
  }
  /**
   * Process paste to single Block:
   * 1. Find patterns` matches
   * 2. Insert new block if it is not the same type as current one
   * 3. Just insert text if there is no substitutions
   *
   * @param {PasteData} dataToInsert - data of Block to insert
   */
  async processInlinePaste(o) {
    const { BlockManager: e, Caret: t } = this.Editor, { content: n } = o;
    if (e.currentBlock && e.currentBlock.tool.isDefault && n.textContent.length < oa.PATTERN_PROCESSING_MAX_LENGTH) {
      const i = await this.processPattern(n.textContent);
      if (i) {
        const r = e.currentBlock && e.currentBlock.tool.isDefault && e.currentBlock.isEmpty, s = e.paste(i.tool, i.event, r);
        t.setToBlock(s, t.positions.END);
        return;
      }
    }
    if (e.currentBlock && e.currentBlock.currentInput) {
      const i = e.currentBlock.tool.baseSanitizeConfig;
      document.execCommand(
        "insertHTML",
        !1,
        ze(n.innerHTML, i)
      );
    } else
      this.insertBlock(o);
  }
  /**
   * Get patterns` matches
   *
   * @param {string} text - text to process
   * @returns {Promise<{event: PasteEvent, tool: string}>}
   */
  async processPattern(o) {
    const e = this.toolsPatterns.find((t) => {
      const n = t.pattern.exec(o);
      return n ? o === n.shift() : !1;
    });
    return e ? {
      event: this.composePasteEvent("pattern", {
        key: e.key,
        data: o
      }),
      tool: e.tool.name
    } : void 0;
  }
  /**
   * Insert pasted Block content to Editor
   *
   * @param {PasteData} data - data to insert
   * @param {boolean} canReplaceCurrentBlock - if true and is current Block is empty, will replace current Block
   * @returns {void}
   */
  insertBlock(o, e = !1) {
    const { BlockManager: t, Caret: n } = this.Editor, { currentBlock: i } = t;
    let r;
    if (e && i && i.isEmpty) {
      r = t.paste(o.tool, o.event, !0), n.setToBlock(r, n.positions.END);
      return;
    }
    r = t.paste(o.tool, o.event), n.setToBlock(r, n.positions.END);
  }
  /**
   * Insert data passed as application/x-editor-js JSON
   *
   * @param {Array} blocks — Blocks' data to insert
   * @returns {void}
   */
  insertEditorJSData(o) {
    const { BlockManager: e, Caret: t, Tools: n } = this.Editor;
    Xs(
      o,
      (i) => n.blockTools.get(i).sanitizeConfig
    ).forEach(({ tool: i, data: r }, s) => {
      let a = !1;
      s === 0 && (a = e.currentBlock && e.currentBlock.tool.isDefault && e.currentBlock.isEmpty);
      const l = e.insert({
        tool: i,
        data: r,
        replace: a
      });
      t.setToBlock(l, t.positions.END);
    });
  }
  /**
   * Fetch nodes from Element node
   *
   * @param {Node} node - current node
   * @param {Node[]} nodes - processed nodes
   * @param {Node} destNode - destination node
   */
  processElementNode(o, e, t) {
    const n = Object.keys(this.toolsTags), i = o, { tool: r } = this.toolsTags[i.tagName] || {}, s = this.tagsByTool[r == null ? void 0 : r.name] || [], a = n.includes(i.tagName), l = m.blockElements.includes(i.tagName.toLowerCase()), c = Array.from(i.children).some(
      ({ tagName: d }) => n.includes(d) && !s.includes(d)
    ), u = Array.from(i.children).some(
      ({ tagName: d }) => m.blockElements.includes(d.toLowerCase())
    );
    if (!l && !a && !c)
      return t.appendChild(i), [...e, t];
    if (a && !c || l && !u && !c)
      return [...e, t, i];
  }
  /**
   * Recursively divide HTML string to two types of nodes:
   * 1. Block element
   * 2. Document Fragments contained text and markup tags like a, b, i etc.
   *
   * @param {Node} wrapper - wrapper of paster HTML content
   * @returns {Node[]}
   */
  getNodes(o) {
    const e = Array.from(o.childNodes);
    let t;
    const n = (i, r) => {
      if (m.isEmpty(r) && !m.isSingleTag(r))
        return i;
      const s = i[i.length - 1];
      let a = new DocumentFragment();
      switch (s && m.isFragment(s) && (a = i.pop()), r.nodeType) {
        case Node.ELEMENT_NODE:
          if (t = this.processElementNode(r, i, a), t)
            return t;
          break;
        case Node.TEXT_NODE:
          return a.appendChild(r), [...i, a];
        default:
          return [...i, a];
      }
      return [...i, ...Array.from(r.childNodes).reduce(n, [])];
    };
    return e.reduce(n, []);
  }
  /**
   * Compose paste event with passed type and detail
   *
   * @param {string} type - event type
   * @param {PasteEventDetail} detail - event detail
   */
  composePasteEvent(o, e) {
    return new CustomEvent(o, {
      detail: e
    });
  }
};
let na = oa;
na.PATTERN_PROCESSING_MAX_LENGTH = 450;
class Nh extends W {
  constructor() {
    super(...arguments), this.toolsDontSupportReadOnly = [], this.readOnlyEnabled = !1;
  }
  /**
   * Returns state of read only mode
   */
  get isEnabled() {
    return this.readOnlyEnabled;
  }
  /**
   * Set initial state
   */
  async prepare() {
    const { Tools: e } = this.Editor, { blockTools: t } = e, n = [];
    Array.from(t.entries()).forEach(([i, r]) => {
      r.isReadOnlySupported || n.push(i);
    }), this.toolsDontSupportReadOnly = n, this.config.readOnly && n.length > 0 && this.throwCriticalError(), this.toggle(this.config.readOnly);
  }
  /**
   * Set read-only mode or toggle current state
   * Call all Modules `toggleReadOnly` method and re-render Editor
   *
   * @param {boolean} state - (optional) read-only state or toggle
   */
  async toggle(e = !this.readOnlyEnabled) {
    e && this.toolsDontSupportReadOnly.length > 0 && this.throwCriticalError();
    const t = this.readOnlyEnabled;
    this.readOnlyEnabled = e;
    for (const i in this.Editor)
      this.Editor[i].toggleReadOnly && this.Editor[i].toggleReadOnly(e);
    if (t === e)
      return this.readOnlyEnabled;
    const n = await this.Editor.Saver.save();
    return await this.Editor.BlockManager.clear(), await this.Editor.Renderer.render(n.blocks), this.readOnlyEnabled;
  }
  /**
   * Throws an error about tools which don't support read-only mode
   */
  throwCriticalError() {
    throw new $s(
      `To enable read-only mode all connected tools should support it. Tools ${this.toolsDontSupportReadOnly.join(", ")} don't support read-only mode.`
    );
  }
}
class io extends W {
  constructor() {
    super(...arguments), this.isRectSelectionActivated = !1, this.SCROLL_SPEED = 3, this.HEIGHT_OF_SCROLL_ZONE = 40, this.BOTTOM_SCROLL_ZONE = 1, this.TOP_SCROLL_ZONE = 2, this.MAIN_MOUSE_BUTTON = 0, this.mousedown = !1, this.isScrolling = !1, this.inScrollZone = null, this.startX = 0, this.startY = 0, this.mouseX = 0, this.mouseY = 0, this.stackOfSelected = [], this.listenerIds = [];
  }
  /**
   * CSS classes for the Block
   *
   * @returns {{wrapper: string, content: string}}
   */
  static get CSS() {
    return {
      overlay: "codex-editor-overlay",
      overlayContainer: "codex-editor-overlay__container",
      rect: "codex-editor-overlay__rectangle",
      topScrollZone: "codex-editor-overlay__scroll-zone--top",
      bottomScrollZone: "codex-editor-overlay__scroll-zone--bottom"
    };
  }
  /**
   * Module Preparation
   * Creating rect and hang handlers
   */
  prepare() {
    this.enableModuleBindings();
  }
  /**
   * Init rect params
   *
   * @param {number} pageX - X coord of mouse
   * @param {number} pageY - Y coord of mouse
   */
  startSelection(e, t) {
    const n = document.elementFromPoint(e - window.pageXOffset, t - window.pageYOffset);
    n.closest(`.${this.Editor.Toolbar.CSS.toolbar}`) || (this.Editor.BlockSelection.allBlocksSelected = !1, this.clearSelection(), this.stackOfSelected = []);
    const i = [
      `.${re.CSS.content}`,
      `.${this.Editor.Toolbar.CSS.toolbar}`,
      `.${this.Editor.InlineToolbar.CSS.inlineToolbar}`
    ], r = n.closest("." + this.Editor.UI.CSS.editorWrapper), s = i.some((a) => !!n.closest(a));
    !r || s || (this.mousedown = !0, this.startX = e, this.startY = t);
  }
  /**
   * Clear all params to end selection
   */
  endSelection() {
    this.mousedown = !1, this.startX = 0, this.startY = 0, this.overlayRectangle.style.display = "none";
  }
  /**
   * is RectSelection Activated
   */
  isRectActivated() {
    return this.isRectSelectionActivated;
  }
  /**
   * Mark that selection is end
   */
  clearSelection() {
    this.isRectSelectionActivated = !1;
  }
  /**
   * Sets Module necessary event handlers
   */
  enableModuleBindings() {
    const { container: e } = this.genHTML();
    this.listeners.on(e, "mousedown", (t) => {
      this.processMouseDown(t);
    }, !1), this.listeners.on(document.body, "mousemove", Un((t) => {
      this.processMouseMove(t);
    }, 10), {
      passive: !0
    }), this.listeners.on(document.body, "mouseleave", () => {
      this.processMouseLeave();
    }), this.listeners.on(window, "scroll", Un((t) => {
      this.processScroll(t);
    }, 10), {
      passive: !0
    }), this.listeners.on(document.body, "mouseup", () => {
      this.processMouseUp();
    }, !1);
  }
  /**
   * Handle mouse down events
   *
   * @param {MouseEvent} mouseEvent - mouse event payload
   */
  processMouseDown(e) {
    e.button === this.MAIN_MOUSE_BUTTON && (e.target.closest(m.allInputsSelector) !== null || this.startSelection(e.pageX, e.pageY));
  }
  /**
   * Handle mouse move events
   *
   * @param {MouseEvent} mouseEvent - mouse event payload
   */
  processMouseMove(e) {
    this.changingRectangle(e), this.scrollByZones(e.clientY);
  }
  /**
   * Handle mouse leave
   */
  processMouseLeave() {
    this.clearSelection(), this.endSelection();
  }
  /**
   * @param {MouseEvent} mouseEvent - mouse event payload
   */
  processScroll(e) {
    this.changingRectangle(e);
  }
  /**
   * Handle mouse up
   */
  processMouseUp() {
    this.clearSelection(), this.endSelection();
  }
  /**
   * Scroll If mouse in scroll zone
   *
   * @param {number} clientY - Y coord of mouse
   */
  scrollByZones(e) {
    if (this.inScrollZone = null, e <= this.HEIGHT_OF_SCROLL_ZONE && (this.inScrollZone = this.TOP_SCROLL_ZONE), document.documentElement.clientHeight - e <= this.HEIGHT_OF_SCROLL_ZONE && (this.inScrollZone = this.BOTTOM_SCROLL_ZONE), !this.inScrollZone) {
      this.isScrolling = !1;
      return;
    }
    this.isScrolling || (this.scrollVertical(this.inScrollZone === this.TOP_SCROLL_ZONE ? -this.SCROLL_SPEED : this.SCROLL_SPEED), this.isScrolling = !0);
  }
  /**
   * Generates required HTML elements
   *
   * @returns {Object<string, Element>}
   */
  genHTML() {
    const { UI: e } = this.Editor, t = e.nodes.holder.querySelector("." + e.CSS.editorWrapper), n = m.make("div", io.CSS.overlay, {}), i = m.make("div", io.CSS.overlayContainer, {}), r = m.make("div", io.CSS.rect, {});
    return i.appendChild(r), n.appendChild(i), t.appendChild(n), this.overlayRectangle = r, {
      container: t,
      overlay: n
    };
  }
  /**
   * Activates scrolling if blockSelection is active and mouse is in scroll zone
   *
   * @param {number} speed - speed of scrolling
   */
  scrollVertical(e) {
    if (!(this.inScrollZone && this.mousedown))
      return;
    const t = window.pageYOffset;
    window.scrollBy(0, e), this.mouseY += window.pageYOffset - t, setTimeout(() => {
      this.scrollVertical(e);
    }, 0);
  }
  /**
   * Handles the change in the rectangle and its effect
   *
   * @param {MouseEvent} event - mouse event
   */
  changingRectangle(e) {
    if (!this.mousedown)
      return;
    e.pageY !== void 0 && (this.mouseX = e.pageX, this.mouseY = e.pageY);
    const { rightPos: t, leftPos: n, index: i } = this.genInfoForMouseSelection(), r = this.startX > t && this.mouseX > t, s = this.startX < n && this.mouseX < n;
    this.rectCrossesBlocks = !(r || s), this.isRectSelectionActivated || (this.rectCrossesBlocks = !1, this.isRectSelectionActivated = !0, this.shrinkRectangleToPoint(), this.overlayRectangle.style.display = "block"), this.updateRectangleSize(), this.Editor.Toolbar.close(), i !== void 0 && (this.trySelectNextBlock(i), this.inverseSelection(), R.get().removeAllRanges());
  }
  /**
   * Shrink rect to singular point
   */
  shrinkRectangleToPoint() {
    this.overlayRectangle.style.left = `${this.startX - window.pageXOffset}px`, this.overlayRectangle.style.top = `${this.startY - window.pageYOffset}px`, this.overlayRectangle.style.bottom = `calc(100% - ${this.startY - window.pageYOffset}px`, this.overlayRectangle.style.right = `calc(100% - ${this.startX - window.pageXOffset}px`;
  }
  /**
   * Select or unselect all of blocks in array if rect is out or in selectable area
   */
  inverseSelection() {
    const e = this.Editor.BlockManager.getBlockByIndex(this.stackOfSelected[0]).selected;
    if (this.rectCrossesBlocks && !e)
      for (const t of this.stackOfSelected)
        this.Editor.BlockSelection.selectBlockByIndex(t);
    if (!this.rectCrossesBlocks && e)
      for (const t of this.stackOfSelected)
        this.Editor.BlockSelection.unSelectBlockByIndex(t);
  }
  /**
   * Updates size of rectangle
   */
  updateRectangleSize() {
    this.mouseY >= this.startY ? (this.overlayRectangle.style.top = `${this.startY - window.pageYOffset}px`, this.overlayRectangle.style.bottom = `calc(100% - ${this.mouseY - window.pageYOffset}px`) : (this.overlayRectangle.style.bottom = `calc(100% - ${this.startY - window.pageYOffset}px`, this.overlayRectangle.style.top = `${this.mouseY - window.pageYOffset}px`), this.mouseX >= this.startX ? (this.overlayRectangle.style.left = `${this.startX - window.pageXOffset}px`, this.overlayRectangle.style.right = `calc(100% - ${this.mouseX - window.pageXOffset}px`) : (this.overlayRectangle.style.right = `calc(100% - ${this.startX - window.pageXOffset}px`, this.overlayRectangle.style.left = `${this.mouseX - window.pageXOffset}px`);
  }
  /**
   * Collects information needed to determine the behavior of the rectangle
   *
   * @returns {object} index - index next Block, leftPos - start of left border of Block, rightPos - right border
   */
  genInfoForMouseSelection() {
    const e = document.body.offsetWidth / 2, t = this.mouseY - window.pageYOffset, n = document.elementFromPoint(e, t), i = this.Editor.BlockManager.getBlockByChildNode(n);
    let r;
    i !== void 0 && (r = this.Editor.BlockManager.blocks.findIndex((u) => u.holder === i.holder));
    const s = this.Editor.BlockManager.lastBlock.holder.querySelector("." + re.CSS.content), a = Number.parseInt(window.getComputedStyle(s).width, 10) / 2, l = e - a, c = e + a;
    return {
      index: r,
      leftPos: l,
      rightPos: c
    };
  }
  /**
   * Select block with index index
   *
   * @param index - index of block in redactor
   */
  addBlockInSelection(e) {
    this.rectCrossesBlocks && this.Editor.BlockSelection.selectBlockByIndex(e), this.stackOfSelected.push(e);
  }
  /**
   * Adds a block to the selection and determines which blocks should be selected
   *
   * @param {object} index - index of new block in the reactor
   */
  trySelectNextBlock(e) {
    const t = this.stackOfSelected[this.stackOfSelected.length - 1] === e, n = this.stackOfSelected.length, i = 1, r = -1, s = 0;
    if (t)
      return;
    const a = this.stackOfSelected[n - 1] - this.stackOfSelected[n - 2] > 0;
    let l = s;
    n > 1 && (l = a ? i : r);
    const c = e > this.stackOfSelected[n - 1] && l === i, u = e < this.stackOfSelected[n - 1] && l === r, d = !(c || u || l === s);
    if (!d && (e > this.stackOfSelected[n - 1] || this.stackOfSelected[n - 1] === void 0)) {
      let p = this.stackOfSelected[n - 1] + 1 || e;
      for (p; p <= e; p++)
        this.addBlockInSelection(p);
      return;
    }
    if (!d && e < this.stackOfSelected[n - 1]) {
      for (let p = this.stackOfSelected[n - 1] - 1; p >= e; p--)
        this.addBlockInSelection(p);
      return;
    }
    if (!d)
      return;
    let h = n - 1, f;
    for (e > this.stackOfSelected[n - 1] ? f = () => e > this.stackOfSelected[h] : f = () => e < this.stackOfSelected[h]; f(); )
      this.rectCrossesBlocks && this.Editor.BlockSelection.unSelectBlockByIndex(this.stackOfSelected[h]), this.stackOfSelected.pop(), h--;
  }
}
class Rh extends W {
  /**
   * @typedef {object} RendererBlocks
   * @property {string} type - tool name
   * @property {object} data - tool data
   */
  /**
   * @example
   *
   * blocks: [
   *   {
   *     id   : 'oDe-EVrGWA',
   *     type : 'paragraph',
   *     data : {
   *       text : 'Hello from Codex!'
   *     }
   *   },
   *   {
   *     id   : 'Ld5BJjJCHs',
   *     type : 'paragraph',
   *     data : {
   *       text : 'Leave feedback if you like it!'
   *     }
   *   },
   * ]
   */
  /**
   * Make plugin blocks from array of plugin`s data
   *
   * @param {OutputBlockData[]} blocks - blocks to render
   */
  async render(e) {
    const t = e.map((i) => ({ function: () => this.insertBlock(i) }));
    this.Editor.ModificationsObserver.disable();
    const n = await Fs(t);
    return this.Editor.ModificationsObserver.enable(), this.Editor.UI.checkEmptiness(), n;
  }
  /**
   * Get plugin instance
   * Add plugin instance to BlockManager
   * Insert block to working zone
   *
   * @param {object} item - Block data to insert
   * @returns {Promise<void>}
   */
  async insertBlock(e) {
    var t;
    const { Tools: n, BlockManager: i } = this.Editor, { type: r, data: s, tunes: a, id: l } = e;
    if (n.available.has(r))
      try {
        i.insert({
          id: l,
          tool: r,
          data: s,
          tunes: a
        });
      } catch (c) {
        throw $(`Block «${r}» skipped because of plugins error`, "warn", {
          data: s,
          error: c
        }), Error(c);
      }
    else {
      const c = {
        savedData: {
          id: l,
          type: r,
          data: s
        },
        title: r
      };
      if (n.unavailable.has(r)) {
        const d = (t = n.unavailable.get(r).toolbox[0]) == null ? void 0 : t.title;
        c.title = d || c.title;
      }
      const u = i.insert({
        id: l,
        tool: n.stubTool,
        data: c
      });
      u.stretched = !0, $(`Tool «${r}» is not found. Check 'tools' property at your initial Editor.js config.`, "warn");
    }
  }
}
class Dh extends W {
  /**
   * Composes new chain of Promises to fire them alternatelly
   *
   * @returns {OutputData}
   */
  async save() {
    const { BlockManager: e, Tools: t } = this.Editor, n = e.blocks, i = [];
    try {
      n.forEach((a) => {
        i.push(this.getSavedData(a));
      });
      const r = await Promise.all(i), s = await Xs(r, (a) => t.blockTools.get(a).sanitizeConfig);
      return this.makeOutput(s);
    } catch (r) {
      _e("Saving failed due to the Error %o", "error", r);
    }
  }
  /**
   * Saves and validates
   *
   * @param {Block} block - Editor's Tool
   * @returns {ValidatedData} - Tool's validated data
   */
  async getSavedData(e) {
    const t = await e.save(), n = t && await e.validate(t.data);
    return {
      ...t,
      isValid: n
    };
  }
  /**
   * Creates output object with saved data, time and version of editor
   *
   * @param {ValidatedData} allExtractedData - data extracted from Blocks
   * @returns {OutputData}
   */
  makeOutput(e) {
    let t = 0;
    const n = [];
    return $("[Editor.js saving]:", "groupCollapsed"), e.forEach(({ id: i, tool: r, data: s, tunes: a, time: l, isValid: c }) => {
      if (t += l, $(`${r.charAt(0).toUpperCase() + r.slice(1)}`, "group"), c)
        $(s), $(void 0, "groupEnd");
      else {
        $(`Block «${r}» skipped because saved data is invalid`), $(void 0, "groupEnd");
        return;
      }
      if (r === this.Editor.Tools.stubTool) {
        n.push(s);
        return;
      }
      const u = {
        id: i,
        type: r,
        data: s,
        ...!Me(a) && {
          tunes: a
        }
      };
      n.push(u);
    }), $("Total", "log", t), $(void 0, "groupEnd"), {
      time: +/* @__PURE__ */ new Date(),
      blocks: n,
      version: "2.27.1"
    };
  }
}
var qn = {}, Ph = {
  get exports() {
    return qn;
  },
  set exports(o) {
    qn = o;
  }
};
(function(o, e) {
  (function(t, n) {
    o.exports = n();
  })(window, function() {
    return function(t) {
      var n = {};
      function i(r) {
        if (n[r])
          return n[r].exports;
        var s = n[r] = { i: r, l: !1, exports: {} };
        return t[r].call(s.exports, s, s.exports, i), s.l = !0, s.exports;
      }
      return i.m = t, i.c = n, i.d = function(r, s, a) {
        i.o(r, s) || Object.defineProperty(r, s, { enumerable: !0, get: a });
      }, i.r = function(r) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(r, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(r, "__esModule", { value: !0 });
      }, i.t = function(r, s) {
        if (1 & s && (r = i(r)), 8 & s || 4 & s && typeof r == "object" && r && r.__esModule)
          return r;
        var a = /* @__PURE__ */ Object.create(null);
        if (i.r(a), Object.defineProperty(a, "default", { enumerable: !0, value: r }), 2 & s && typeof r != "string")
          for (var l in r)
            i.d(a, l, function(c) {
              return r[c];
            }.bind(null, l));
        return a;
      }, i.n = function(r) {
        var s = r && r.__esModule ? function() {
          return r.default;
        } : function() {
          return r;
        };
        return i.d(s, "a", s), s;
      }, i.o = function(r, s) {
        return Object.prototype.hasOwnProperty.call(r, s);
      }, i.p = "/", i(i.s = 4);
    }([function(t, n, i) {
      var r = i(1), s = i(2);
      typeof (s = s.__esModule ? s.default : s) == "string" && (s = [[t.i, s, ""]]);
      var a = { insert: "head", singleton: !1 };
      r(s, a), t.exports = s.locals || {};
    }, function(t, n, i) {
      var r, s = function() {
        return r === void 0 && (r = !!(window && document && document.all && !window.atob)), r;
      }, a = function() {
        var S = {};
        return function(v) {
          if (S[v] === void 0) {
            var b = document.querySelector(v);
            if (window.HTMLIFrameElement && b instanceof window.HTMLIFrameElement)
              try {
                b = b.contentDocument.head;
              } catch {
                b = null;
              }
            S[v] = b;
          }
          return S[v];
        };
      }(), l = [];
      function c(S) {
        for (var v = -1, b = 0; b < l.length; b++)
          if (l[b].identifier === S) {
            v = b;
            break;
          }
        return v;
      }
      function u(S, v) {
        for (var b = {}, I = [], P = 0; P < S.length; P++) {
          var C = S[P], x = v.base ? C[0] + v.base : C[0], L = b[x] || 0, w = "".concat(x, " ").concat(L);
          b[x] = L + 1;
          var k = c(w), E = { css: C[1], media: C[2], sourceMap: C[3] };
          k !== -1 ? (l[k].references++, l[k].updater(E)) : l.push({ identifier: w, updater: T(E, v), references: 1 }), I.push(w);
        }
        return I;
      }
      function d(S) {
        var v = document.createElement("style"), b = S.attributes || {};
        if (b.nonce === void 0) {
          var I = i.nc;
          I && (b.nonce = I);
        }
        if (Object.keys(b).forEach(function(C) {
          v.setAttribute(C, b[C]);
        }), typeof S.insert == "function")
          S.insert(v);
        else {
          var P = a(S.insert || "head");
          if (!P)
            throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
          P.appendChild(v);
        }
        return v;
      }
      var h, f = (h = [], function(S, v) {
        return h[S] = v, h.filter(Boolean).join(`
`);
      });
      function p(S, v, b, I) {
        var P = b ? "" : I.media ? "@media ".concat(I.media, " {").concat(I.css, "}") : I.css;
        if (S.styleSheet)
          S.styleSheet.cssText = f(v, P);
        else {
          var C = document.createTextNode(P), x = S.childNodes;
          x[v] && S.removeChild(x[v]), x.length ? S.insertBefore(C, x[v]) : S.appendChild(C);
        }
      }
      function g(S, v, b) {
        var I = b.css, P = b.media, C = b.sourceMap;
        if (P ? S.setAttribute("media", P) : S.removeAttribute("media"), C && btoa && (I += `
/*# sourceMappingURL=data:application/json;base64,`.concat(btoa(unescape(encodeURIComponent(JSON.stringify(C)))), " */")), S.styleSheet)
          S.styleSheet.cssText = I;
        else {
          for (; S.firstChild; )
            S.removeChild(S.firstChild);
          S.appendChild(document.createTextNode(I));
        }
      }
      var _ = null, B = 0;
      function T(S, v) {
        var b, I, P;
        if (v.singleton) {
          var C = B++;
          b = _ || (_ = d(v)), I = p.bind(null, b, C, !1), P = p.bind(null, b, C, !0);
        } else
          b = d(v), I = g.bind(null, b, v), P = function() {
            (function(x) {
              if (x.parentNode === null)
                return !1;
              x.parentNode.removeChild(x);
            })(b);
          };
        return I(S), function(x) {
          if (x) {
            if (x.css === S.css && x.media === S.media && x.sourceMap === S.sourceMap)
              return;
            I(S = x);
          } else
            P();
        };
      }
      t.exports = function(S, v) {
        (v = v || {}).singleton || typeof v.singleton == "boolean" || (v.singleton = s());
        var b = u(S = S || [], v);
        return function(I) {
          if (I = I || [], Object.prototype.toString.call(I) === "[object Array]") {
            for (var P = 0; P < b.length; P++) {
              var C = c(b[P]);
              l[C].references--;
            }
            for (var x = u(I, v), L = 0; L < b.length; L++) {
              var w = c(b[L]);
              l[w].references === 0 && (l[w].updater(), l.splice(w, 1));
            }
            b = x;
          }
        };
      };
    }, function(t, n, i) {
      (n = i(3)(!1)).push([t.i, `.ce-paragraph {
    line-height: 1.6em;
    outline: none;
}

.ce-paragraph[data-placeholder]:empty::before{
  content: attr(data-placeholder);
  color: #707684;
  font-weight: normal;
  opacity: 0;
}

/** Show placeholder at the first paragraph if Editor is empty */
.codex-editor--empty .ce-block:first-child .ce-paragraph[data-placeholder]:empty::before {
  opacity: 1;
}

.codex-editor--toolbox-opened .ce-block:first-child .ce-paragraph[data-placeholder]:empty::before,
.codex-editor--empty .ce-block:first-child .ce-paragraph[data-placeholder]:empty:focus::before {
  opacity: 0;
}

.ce-paragraph p:first-of-type{
    margin-top: 0;
}

.ce-paragraph p:last-of-type{
    margin-bottom: 0;
}
`, ""]), t.exports = n;
    }, function(t, n, i) {
      t.exports = function(r) {
        var s = [];
        return s.toString = function() {
          return this.map(function(a) {
            var l = function(c, u) {
              var d = c[1] || "", h = c[3];
              if (!h)
                return d;
              if (u && typeof btoa == "function") {
                var f = (g = h, _ = btoa(unescape(encodeURIComponent(JSON.stringify(g)))), B = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(_), "/*# ".concat(B, " */")), p = h.sources.map(function(T) {
                  return "/*# sourceURL=".concat(h.sourceRoot || "").concat(T, " */");
                });
                return [d].concat(p).concat([f]).join(`
`);
              }
              var g, _, B;
              return [d].join(`
`);
            }(a, r);
            return a[2] ? "@media ".concat(a[2], " {").concat(l, "}") : l;
          }).join("");
        }, s.i = function(a, l, c) {
          typeof a == "string" && (a = [[null, a, ""]]);
          var u = {};
          if (c)
            for (var d = 0; d < this.length; d++) {
              var h = this[d][0];
              h != null && (u[h] = !0);
            }
          for (var f = 0; f < a.length; f++) {
            var p = [].concat(a[f]);
            c && u[p[0]] || (l && (p[2] ? p[2] = "".concat(l, " and ").concat(p[2]) : p[2] = l), s.push(p));
          }
        }, s;
      };
    }, function(t, n, i) {
      i.r(n), i.d(n, "default", function() {
        return a;
      }), i(0);
      function r(l, c) {
        for (var u = 0; u < c.length; u++) {
          var d = c[u];
          d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(l, d.key, d);
        }
      }
      function s(l, c, u) {
        return c && r(l.prototype, c), u && r(l, u), l;
      }
      /**
       * Base Paragraph Block for the Editor.js.
       * Represents simple paragraph
       *
       * @author CodeX (team@codex.so)
       * @copyright CodeX 2018
       * @license The MIT License (MIT)
       */
      var a = function() {
        function l(c) {
          var u = c.data, d = c.config, h = c.api, f = c.readOnly;
          (function(p, g) {
            if (!(p instanceof g))
              throw new TypeError("Cannot call a class as a function");
          })(this, l), this.api = h, this.readOnly = f, this._CSS = { block: this.api.styles.block, wrapper: "ce-paragraph" }, this.readOnly || (this.onKeyUp = this.onKeyUp.bind(this)), this._placeholder = d.placeholder ? d.placeholder : l.DEFAULT_PLACEHOLDER, this._data = {}, this._element = this.drawView(), this._preserveBlank = d.preserveBlank !== void 0 && d.preserveBlank, this.data = u;
        }
        return s(l, null, [{ key: "DEFAULT_PLACEHOLDER", get: function() {
          return "";
        } }]), s(l, [{ key: "onKeyUp", value: function(c) {
          c.code !== "Backspace" && c.code !== "Delete" || this._element.textContent === "" && (this._element.innerHTML = "");
        } }, { key: "drawView", value: function() {
          var c = document.createElement("DIV");
          return c.classList.add(this._CSS.wrapper, this._CSS.block), c.contentEditable = !1, c.dataset.placeholder = this.api.i18n.t(this._placeholder), this.readOnly || (c.contentEditable = !0, c.addEventListener("keyup", this.onKeyUp)), c;
        } }, { key: "render", value: function() {
          return this._element;
        } }, { key: "merge", value: function(c) {
          var u = { text: this.data.text + c.text };
          this.data = u;
        } }, { key: "validate", value: function(c) {
          return !(c.text.trim() === "" && !this._preserveBlank);
        } }, { key: "save", value: function(c) {
          return { text: c.innerHTML };
        } }, { key: "onPaste", value: function(c) {
          var u = { text: c.detail.data.innerHTML };
          this.data = u;
        } }, { key: "data", get: function() {
          var c = this._element.innerHTML;
          return this._data.text = c, this._data;
        }, set: function(c) {
          this._data = c || {}, this._element.innerHTML = this._data.text || "";
        } }], [{ key: "conversionConfig", get: function() {
          return { export: "text", import: "text" };
        } }, { key: "sanitize", get: function() {
          return { text: { br: !0 } };
        } }, { key: "isReadOnlySupported", get: function() {
          return !0;
        } }, { key: "pasteConfig", get: function() {
          return { tags: ["P"] };
        } }, { key: "toolbox", get: function() {
          return { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 9V7.2C8 7.08954 8.08954 7 8.2 7L12 7M16 9V7.2C16 7.08954 15.9105 7 15.8 7L12 7M12 7L12 17M12 17H10M12 17H14"/></svg>', title: "Text" };
        } }]), l;
      }();
    }]).default;
  });
})(Ph);
const Fh = /* @__PURE__ */ sn(qn);
class Si {
  constructor() {
    this.commandName = "bold", this.CSS = {
      button: "ce-inline-tool",
      buttonActive: "ce-inline-tool--active",
      buttonModifier: "ce-inline-tool--bold"
    }, this.nodes = {
      button: void 0
    };
  }
  /**
   * Sanitizer Rule
   * Leave <b> tags
   *
   * @returns {object}
   */
  static get sanitize() {
    return {
      b: {}
    };
  }
  /**
   * Create button for Inline Toolbar
   */
  render() {
    return this.nodes.button = document.createElement("button"), this.nodes.button.type = "button", this.nodes.button.classList.add(this.CSS.button, this.CSS.buttonModifier), this.nodes.button.innerHTML = sh, this.nodes.button;
  }
  /**
   * Wrap range with <b> tag
   */
  surround() {
    document.execCommand(this.commandName);
  }
  /**
   * Check selection and set activated state to button if there are <b> tag
   *
   * @returns {boolean}
   */
  checkState() {
    const e = document.queryCommandState(this.commandName);
    return this.nodes.button.classList.toggle(this.CSS.buttonActive, e), e;
  }
  /**
   * Set a shortcut
   *
   * @returns {boolean}
   */
  get shortcut() {
    return "CMD+B";
  }
}
Si.isInline = !0;
Si.title = "Bold";
class Ci {
  constructor() {
    this.commandName = "italic", this.CSS = {
      button: "ce-inline-tool",
      buttonActive: "ce-inline-tool--active",
      buttonModifier: "ce-inline-tool--italic"
    }, this.nodes = {
      button: null
    };
  }
  /**
   * Sanitizer Rule
   * Leave <i> tags
   *
   * @returns {object}
   */
  static get sanitize() {
    return {
      i: {}
    };
  }
  /**
   * Create button for Inline Toolbar
   */
  render() {
    return this.nodes.button = document.createElement("button"), this.nodes.button.type = "button", this.nodes.button.classList.add(this.CSS.button, this.CSS.buttonModifier), this.nodes.button.innerHTML = dh, this.nodes.button;
  }
  /**
   * Wrap range with <i> tag
   */
  surround() {
    document.execCommand(this.commandName);
  }
  /**
   * Check selection and set activated state to button if there are <i> tag
   */
  checkState() {
    const e = document.queryCommandState(this.commandName);
    return this.nodes.button.classList.toggle(this.CSS.buttonActive, e), e;
  }
  /**
   * Set a shortcut
   */
  get shortcut() {
    return "CMD+I";
  }
}
Ci.isInline = !0;
Ci.title = "Italic";
class Ti {
  /**
   * @param api - Editor.js API
   */
  constructor({ api: e }) {
    this.commandLink = "createLink", this.commandUnlink = "unlink", this.ENTER_KEY = 13, this.CSS = {
      button: "ce-inline-tool",
      buttonActive: "ce-inline-tool--active",
      buttonModifier: "ce-inline-tool--link",
      buttonUnlink: "ce-inline-tool--unlink",
      input: "ce-inline-tool-input",
      inputShowed: "ce-inline-tool-input--showed"
    }, this.nodes = {
      button: null,
      input: null
    }, this.inputOpened = !1, this.toolbar = e.toolbar, this.inlineToolbar = e.inlineToolbar, this.notifier = e.notifier, this.i18n = e.i18n, this.selection = new R();
  }
  /**
   * Sanitizer Rule
   * Leave <a> tags
   *
   * @returns {object}
   */
  static get sanitize() {
    return {
      a: {
        href: !0,
        target: "_blank",
        rel: "nofollow"
      }
    };
  }
  /**
   * Create button for Inline Toolbar
   */
  render() {
    return this.nodes.button = document.createElement("button"), this.nodes.button.type = "button", this.nodes.button.classList.add(this.CSS.button, this.CSS.buttonModifier), this.nodes.button.innerHTML = Cr, this.nodes.button;
  }
  /**
   * Input for the link
   */
  renderActions() {
    return this.nodes.input = document.createElement("input"), this.nodes.input.placeholder = this.i18n.t("Add a link"), this.nodes.input.classList.add(this.CSS.input), this.nodes.input.addEventListener("keydown", (e) => {
      e.keyCode === this.ENTER_KEY && this.enterPressed(e);
    }), this.nodes.input;
  }
  /**
   * Handle clicks on the Inline Toolbar icon
   *
   * @param {Range} range - range to wrap with link
   */
  surround(e) {
    if (e) {
      this.inputOpened ? (this.selection.restore(), this.selection.removeFakeBackground()) : (this.selection.setFakeBackground(), this.selection.save());
      const t = this.selection.findParentTag("A");
      if (t) {
        this.selection.expandToTag(t), this.unlink(), this.closeActions(), this.checkState(), this.toolbar.close();
        return;
      }
    }
    this.toggleActions();
  }
  /**
   * Check selection and set activated state to button if there are <a> tag
   */
  checkState() {
    const e = this.selection.findParentTag("A");
    if (e) {
      this.nodes.button.innerHTML = fh, this.nodes.button.classList.add(this.CSS.buttonUnlink), this.nodes.button.classList.add(this.CSS.buttonActive), this.openActions();
      const t = e.getAttribute("href");
      this.nodes.input.value = t !== "null" ? t : "", this.selection.save();
    } else
      this.nodes.button.innerHTML = Cr, this.nodes.button.classList.remove(this.CSS.buttonUnlink), this.nodes.button.classList.remove(this.CSS.buttonActive);
    return !!e;
  }
  /**
   * Function called with Inline Toolbar closing
   */
  clear() {
    this.closeActions();
  }
  /**
   * Set a shortcut
   */
  get shortcut() {
    return "CMD+K";
  }
  /**
   * Show/close link input
   */
  toggleActions() {
    this.inputOpened ? this.closeActions(!1) : this.openActions(!0);
  }
  /**
   * @param {boolean} needFocus - on link creation we need to focus input. On editing - nope.
   */
  openActions(e = !1) {
    this.nodes.input.classList.add(this.CSS.inputShowed), e && this.nodes.input.focus(), this.inputOpened = !0;
  }
  /**
   * Close input
   *
   * @param {boolean} clearSavedSelection — we don't need to clear saved selection
   *                                        on toggle-clicks on the icon of opened Toolbar
   */
  closeActions(e = !0) {
    if (this.selection.isFakeBackgroundEnabled) {
      const t = new R();
      t.save(), this.selection.restore(), this.selection.removeFakeBackground(), t.restore();
    }
    this.nodes.input.classList.remove(this.CSS.inputShowed), this.nodes.input.value = "", e && this.selection.clearSaved(), this.inputOpened = !1;
  }
  /**
   * Enter pressed on input
   *
   * @param {KeyboardEvent} event - enter keydown event
   */
  enterPressed(e) {
    let t = this.nodes.input.value || "";
    if (!t.trim()) {
      this.selection.restore(), this.unlink(), e.preventDefault(), this.closeActions();
      return;
    }
    if (!this.validateURL(t)) {
      this.notifier.show({
        message: "Pasted link is not valid.",
        style: "error"
      }), $("Incorrect Link pasted", "warn", t);
      return;
    }
    t = this.prepareLink(t), this.selection.restore(), this.selection.removeFakeBackground(), this.insertLink(t), e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), this.selection.collapseToEnd(), this.inlineToolbar.close();
  }
  /**
   * Detects if passed string is URL
   *
   * @param {string} str - string to validate
   * @returns {boolean}
   */
  validateURL(e) {
    return !/\s/.test(e);
  }
  /**
   * Process link before injection
   * - sanitize
   * - add protocol for links like 'google.com'
   *
   * @param {string} link - raw user input
   */
  prepareLink(e) {
    return e = e.trim(), e = this.addProtocol(e), e;
  }
  /**
   * Add 'http' protocol to the links like 'vc.ru', 'google.com'
   *
   * @param {string} link - string to process
   */
  addProtocol(e) {
    if (/^(\w+):(\/\/)?/.test(e))
      return e;
    const t = /^\/[^/\s]/.test(e), n = e.substring(0, 1) === "#", i = /^\/\/[^/\s]/.test(e);
    return !t && !n && !i && (e = "http://" + e), e;
  }
  /**
   * Inserts <a> tag with "href"
   *
   * @param {string} link - "href" value
   */
  insertLink(e) {
    const t = this.selection.findParentTag("A");
    t && this.selection.expandToTag(t), document.execCommand(this.commandLink, !1, e);
  }
  /**
   * Removes <a> tag
   */
  unlink() {
    document.execCommand(this.commandUnlink);
  }
}
Ti.isInline = !0;
Ti.title = "Link";
class ia {
  /**
   * @param options - constructor options
   * @param options.data - stub tool data
   * @param options.api - Editor.js API
   */
  constructor({ data: e, api: t }) {
    this.CSS = {
      wrapper: "ce-stub",
      info: "ce-stub__info",
      title: "ce-stub__title",
      subtitle: "ce-stub__subtitle"
    }, this.api = t, this.title = e.title || this.api.i18n.t("Error"), this.subtitle = this.api.i18n.t("The block can not be displayed correctly."), this.savedData = e.savedData, this.wrapper = this.make();
  }
  /**
   * Returns stub holder
   *
   * @returns {HTMLElement}
   */
  render() {
    return this.wrapper;
  }
  /**
   * Return original Tool data
   *
   * @returns {BlockToolData}
   */
  save() {
    return this.savedData;
  }
  /**
   * Create Tool html markup
   *
   * @returns {HTMLElement}
   */
  make() {
    const e = m.make("div", this.CSS.wrapper), t = '<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52"><path fill="#D76B6B" fill-rule="nonzero" d="M26 52C11.64 52 0 40.36 0 26S11.64 0 26 0s26 11.64 26 26-11.64 26-26 26zm0-3.25c12.564 0 22.75-10.186 22.75-22.75S38.564 3.25 26 3.25 3.25 13.436 3.25 26 13.436 48.75 26 48.75zM15.708 33.042a2.167 2.167 0 1 1 0-4.334 2.167 2.167 0 0 1 0 4.334zm23.834 0a2.167 2.167 0 1 1 0-4.334 2.167 2.167 0 0 1 0 4.334zm-15.875 5.452a1.083 1.083 0 1 1-1.834-1.155c1.331-2.114 3.49-3.179 6.334-3.179 2.844 0 5.002 1.065 6.333 3.18a1.083 1.083 0 1 1-1.833 1.154c-.913-1.45-2.366-2.167-4.5-2.167s-3.587.717-4.5 2.167z"/></svg>', n = m.make("div", this.CSS.info), i = m.make("div", this.CSS.title, {
      textContent: this.title
    }), r = m.make("div", this.CSS.subtitle, {
      textContent: this.subtitle
    });
    return e.innerHTML = t, n.appendChild(i), n.appendChild(r), e.appendChild(n), e;
  }
}
ia.isReadOnlySupported = !0;
class Hh extends Ei {
  constructor() {
    super(...arguments), this.type = ln.Inline;
  }
  /**
   * Returns title for Inline Tool if specified by user
   */
  get title() {
    return this.constructable[xi.Title];
  }
  /**
   * Constructs new InlineTool instance from constructable
   */
  create() {
    return new this.constructable({
      api: this.api.getMethodsForTool(this),
      config: this.settings
    });
  }
}
class jh extends Ei {
  constructor() {
    super(...arguments), this.type = ln.Tune;
  }
  /**
   * Constructs new BlockTune instance from constructable
   *
   * @param data - Tune data
   * @param block - Block API object
   */
  create(e, t) {
    return new this.constructable({
      api: this.api.getMethodsForTool(this),
      config: this.settings,
      block: t,
      data: e
    });
  }
}
class ue extends Map {
  /**
   * Returns Block Tools collection
   */
  get blockTools() {
    const e = Array.from(this.entries()).filter(([, t]) => t.isBlock());
    return new ue(e);
  }
  /**
   * Returns Inline Tools collection
   */
  get inlineTools() {
    const e = Array.from(this.entries()).filter(([, t]) => t.isInline());
    return new ue(e);
  }
  /**
   * Returns Block Tunes collection
   */
  get blockTunes() {
    const e = Array.from(this.entries()).filter(([, t]) => t.isTune());
    return new ue(e);
  }
  /**
   * Returns internal Tools collection
   */
  get internalTools() {
    const e = Array.from(this.entries()).filter(([, t]) => t.isInternal);
    return new ue(e);
  }
  /**
   * Returns Tools collection provided by user
   */
  get externalTools() {
    const e = Array.from(this.entries()).filter(([, t]) => !t.isInternal);
    return new ue(e);
  }
}
var Uh = Object.defineProperty, zh = Object.getOwnPropertyDescriptor, ra = (o, e, t, n) => {
  for (var i = n > 1 ? void 0 : n ? zh(e, t) : e, r = o.length - 1, s; r >= 0; r--)
    (s = o[r]) && (i = (n ? s(e, t, i) : s(i)) || i);
  return n && i && Uh(e, t, i), i;
};
class Bi extends Ei {
  constructor() {
    super(...arguments), this.type = ln.Block, this.inlineTools = new ue(), this.tunes = new ue();
  }
  /**
   * Creates new Tool instance
   *
   * @param data - Tool data
   * @param block - BlockAPI for current Block
   * @param readOnly - True if Editor is in read-only mode
   */
  create(e, t, n) {
    return new this.constructable({
      data: e,
      block: t,
      readOnly: n,
      api: this.api.getMethodsForTool(this),
      config: this.settings
    });
  }
  /**
   * Returns true if read-only mode is supported by Tool
   */
  get isReadOnlySupported() {
    return this.constructable[_t.IsReadOnlySupported] === !0;
  }
  /**
   * Returns true if Tool supports linebreaks
   */
  get isLineBreaksEnabled() {
    return this.constructable[_t.IsEnabledLineBreaks];
  }
  /**
   * Returns Tool toolbox configuration (internal or user-specified).
   *
   * Merges internal and user-defined toolbox configs based on the following rules:
   *
   * - If both internal and user-defined toolbox configs are arrays their items are merged.
   * Length of the second one is kept.
   *
   * - If both are objects their properties are merged.
   *
   * - If one is an object and another is an array than internal config is replaced with user-defined
   * config. This is made to allow user to override default tool's toolbox representation (single/multiple entries)
   */
  get toolbox() {
    const e = this.constructable[_t.Toolbox], t = this.config[Do.Toolbox];
    if (!Me(e) && t !== !1)
      return t ? Array.isArray(e) ? Array.isArray(t) ? t.map((n, i) => {
        const r = e[i];
        return r ? {
          ...r,
          ...n
        } : n;
      }) : [t] : Array.isArray(t) ? t : [
        {
          ...e,
          ...t
        }
      ] : Array.isArray(e) ? e : [e];
  }
  /**
   * Returns Tool conversion configuration
   */
  get conversionConfig() {
    return this.constructable[_t.ConversionConfig];
  }
  /**
   * Returns enabled inline tools for Tool
   */
  get enabledInlineTools() {
    return this.config[Do.EnabledInlineTools] || !1;
  }
  /**
   * Returns enabled tunes for Tool
   */
  get enabledBlockTunes() {
    return this.config[Do.EnabledBlockTunes];
  }
  /**
   * Returns Tool paste configuration
   */
  get pasteConfig() {
    return this.constructable[_t.PasteConfig] ?? {};
  }
  get sanitizeConfig() {
    const e = super.sanitizeConfig, t = this.baseSanitizeConfig;
    if (Me(e))
      return t;
    const n = {};
    for (const i in e)
      if (Object.prototype.hasOwnProperty.call(e, i)) {
        const r = e[i];
        ce(r) ? n[i] = Object.assign({}, t, r) : n[i] = r;
      }
    return n;
  }
  get baseSanitizeConfig() {
    const e = {};
    return Array.from(this.inlineTools.values()).forEach((t) => Object.assign(e, t.sanitizeConfig)), Array.from(this.tunes.values()).forEach((t) => Object.assign(e, t.sanitizeConfig)), e;
  }
}
ra([
  Ut
], Bi.prototype, "sanitizeConfig", 1);
ra([
  Ut
], Bi.prototype, "baseSanitizeConfig", 1);
class $h {
  /**
   * @class
   * @param config - tools config
   * @param editorConfig - EditorJS config
   * @param api - EditorJS API module
   */
  constructor(e, t, n) {
    this.api = n, this.config = e, this.editorConfig = t;
  }
  /**
   * Returns Tool object based on it's type
   *
   * @param name - tool name
   */
  get(e) {
    const { class: t, isInternal: n = !1, ...i } = this.config[e], r = this.getConstructor(t);
    return new r({
      name: e,
      constructable: t,
      config: i,
      api: this.api,
      isDefault: e === this.editorConfig.defaultBlock,
      defaultPlaceholder: this.editorConfig.placeholder,
      isInternal: n
    });
  }
  /**
   * Find appropriate Tool object constructor for Tool constructable
   *
   * @param constructable - Tools constructable
   */
  getConstructor(e) {
    switch (!0) {
      case e[xi.IsInline]:
        return Hh;
      case e[ta.IsTune]:
        return jh;
      default:
        return Bi;
    }
  }
}
class sa {
  /**
   * MoveDownTune constructor
   *
   * @param {API} api — Editor's API
   */
  constructor({ api: e }) {
    this.CSS = {
      animation: "wobble"
    }, this.api = e;
  }
  /**
   * Tune's appearance in block settings menu
   */
  render() {
    return {
      icon: qs,
      title: this.api.i18n.t("Move down"),
      onActivate: () => this.handleClick(),
      name: "move-down"
    };
  }
  /**
   * Handle clicks on 'move down' button
   */
  handleClick() {
    const e = this.api.blocks.getCurrentBlockIndex(), t = this.api.blocks.getBlockByIndex(e + 1);
    if (!t)
      throw new Error("Unable to move Block down since it is already the last");
    const n = t.holder, i = n.getBoundingClientRect();
    let r = Math.abs(window.innerHeight - n.offsetHeight);
    i.top < window.innerHeight && (r = window.scrollY + n.offsetHeight), window.scrollTo(0, r), this.api.blocks.move(e + 1), this.api.toolbar.toggleBlockSettings(!0);
  }
}
sa.isTune = !0;
class aa {
  /**
   * DeleteTune constructor
   *
   * @param {API} api - Editor's API
   */
  constructor({ api: e }) {
    this.api = e;
  }
  /**
   * Tune's appearance in block settings menu
   */
  render() {
    return {
      icon: lh,
      title: this.api.i18n.t("Delete"),
      name: "delete",
      confirmation: {
        title: this.api.i18n.t("Click to delete"),
        onActivate: () => this.handleClick()
      }
    };
  }
  /**
   * Delete block conditions passed
   */
  handleClick() {
    this.api.blocks.delete();
  }
}
aa.isTune = !0;
class la {
  /**
   * MoveUpTune constructor
   *
   * @param {API} api - Editor's API
   */
  constructor({ api: e }) {
    this.CSS = {
      animation: "wobble"
    }, this.api = e;
  }
  /**
   * Tune's appearance in block settings menu
   */
  render() {
    return {
      icon: ah,
      title: this.api.i18n.t("Move up"),
      onActivate: () => this.handleClick(),
      name: "move-up"
    };
  }
  /**
   * Move current block up
   */
  handleClick() {
    const e = this.api.blocks.getCurrentBlockIndex(), t = this.api.blocks.getBlockByIndex(e), n = this.api.blocks.getBlockByIndex(e - 1);
    if (e === 0 || !t || !n)
      throw new Error("Unable to move Block up since it is already the first");
    const i = t.holder, r = n.holder, s = i.getBoundingClientRect(), a = r.getBoundingClientRect();
    let l;
    a.top > 0 ? l = Math.abs(s.top) - Math.abs(a.top) : l = Math.abs(s.top) + a.height, window.scrollBy(0, -1 * l), this.api.blocks.move(e - 1), this.api.toolbar.toggleBlockSettings(!0);
  }
}
la.isTune = !0;
var Vh = Object.defineProperty, Wh = Object.getOwnPropertyDescriptor, Yh = (o, e, t, n) => {
  for (var i = n > 1 ? void 0 : n ? Wh(e, t) : e, r = o.length - 1, s; r >= 0; r--)
    (s = o[r]) && (i = (n ? s(e, t, i) : s(i)) || i);
  return n && i && Vh(e, t, i), i;
};
class ca extends W {
  constructor() {
    super(...arguments), this.stubTool = "stub", this.toolsAvailable = new ue(), this.toolsUnavailable = new ue();
  }
  /**
   * Returns available Tools
   */
  get available() {
    return this.toolsAvailable;
  }
  /**
   * Returns unavailable Tools
   */
  get unavailable() {
    return this.toolsUnavailable;
  }
  /**
   * Return Tools for the Inline Toolbar
   */
  get inlineTools() {
    return this.available.inlineTools;
  }
  /**
   * Return editor block tools
   */
  get blockTools() {
    return this.available.blockTools;
  }
  /**
   * Return available Block Tunes
   *
   * @returns {object} - object of Inline Tool's classes
   */
  get blockTunes() {
    return this.available.blockTunes;
  }
  /**
   * Returns default Tool object
   */
  get defaultTool() {
    return this.blockTools.get(this.config.defaultBlock);
  }
  /**
   * Returns internal tools
   */
  get internal() {
    return this.available.internalTools;
  }
  /**
   * Creates instances via passed or default configuration
   *
   * @returns {Promise<void>}
   */
  async prepare() {
    if (this.validateTools(), this.config.tools = zn({}, this.internalTools, this.config.tools), !Object.prototype.hasOwnProperty.call(this.config, "tools") || Object.keys(this.config.tools).length === 0)
      throw Error("Can't start without tools");
    const e = this.prepareConfig();
    this.factory = new $h(e, this.config, this.Editor.API);
    const t = this.getListOfPrepareFunctions(e);
    if (t.length === 0)
      return Promise.resolve();
    await Fs(t, (n) => {
      this.toolPrepareMethodSuccess(n);
    }, (n) => {
      this.toolPrepareMethodFallback(n);
    }), this.prepareBlockTools();
  }
  getAllInlineToolsSanitizeConfig() {
    const e = {};
    return Array.from(this.inlineTools.values()).forEach((t) => {
      Object.assign(e, t.sanitizeConfig);
    }), e;
  }
  /**
   * Calls each Tool reset method to clean up anything set by Tool
   */
  destroy() {
    Object.values(this.available).forEach(async (e) => {
      Z(e.reset) && await e.reset();
    });
  }
  /**
   * Returns internal tools
   * Includes Bold, Italic, Link and Paragraph
   */
  get internalTools() {
    return {
      bold: {
        class: Si,
        isInternal: !0
      },
      italic: {
        class: Ci,
        isInternal: !0
      },
      link: {
        class: Ti,
        isInternal: !0
      },
      paragraph: {
        class: Fh,
        inlineToolbar: !0,
        isInternal: !0
      },
      stub: {
        class: ia,
        isInternal: !0
      },
      moveUp: {
        class: la,
        isInternal: !0
      },
      delete: {
        class: aa,
        isInternal: !0
      },
      moveDown: {
        class: sa,
        isInternal: !0
      }
    };
  }
  /**
   * Tool prepare method success callback
   *
   * @param {object} data - append tool to available list
   */
  toolPrepareMethodSuccess(e) {
    const t = this.factory.get(e.toolName);
    if (t.isInline()) {
      const n = ["render", "surround", "checkState"].filter((i) => !t.create()[i]);
      if (n.length) {
        $(
          `Incorrect Inline Tool: ${t.name}. Some of required methods is not implemented %o`,
          "warn",
          n
        ), this.toolsUnavailable.set(t.name, t);
        return;
      }
    }
    this.toolsAvailable.set(t.name, t);
  }
  /**
   * Tool prepare method fail callback
   *
   * @param {object} data - append tool to unavailable list
   */
  toolPrepareMethodFallback(e) {
    this.toolsUnavailable.set(e.toolName, this.factory.get(e.toolName));
  }
  /**
   * Binds prepare function of plugins with user or default config
   *
   * @returns {Array} list of functions that needs to be fired sequentially
   * @param config - tools config
   */
  getListOfPrepareFunctions(e) {
    const t = [];
    return Object.entries(e).forEach(([n, i]) => {
      t.push({
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        function: Z(i.class.prepare) ? i.class.prepare : () => {
        },
        data: {
          toolName: n,
          config: i.config
        }
      });
    }), t;
  }
  /**
   * Assign enabled Inline Tools and Block Tunes for Block Tool
   */
  prepareBlockTools() {
    Array.from(this.blockTools.values()).forEach((e) => {
      this.assignInlineToolsToBlockTool(e), this.assignBlockTunesToBlockTool(e);
    });
  }
  /**
   * Assign enabled Inline Tools for Block Tool
   *
   * @param tool - Block Tool
   */
  assignInlineToolsToBlockTool(e) {
    if (this.config.inlineToolbar !== !1) {
      if (e.enabledInlineTools === !0) {
        e.inlineTools = new ue(
          Array.isArray(this.config.inlineToolbar) ? this.config.inlineToolbar.map((t) => [t, this.inlineTools.get(t)]) : Array.from(this.inlineTools.entries())
        );
        return;
      }
      Array.isArray(e.enabledInlineTools) && (e.inlineTools = new ue(
        e.enabledInlineTools.map((t) => [t, this.inlineTools.get(t)])
      ));
    }
  }
  /**
   * Assign enabled Block Tunes for Block Tool
   *
   * @param tool — Block Tool
   */
  assignBlockTunesToBlockTool(e) {
    if (e.enabledBlockTunes !== !1) {
      if (Array.isArray(e.enabledBlockTunes)) {
        const t = new ue(
          e.enabledBlockTunes.map((n) => [n, this.blockTunes.get(n)])
        );
        e.tunes = new ue([...t, ...this.blockTunes.internalTools]);
        return;
      }
      if (Array.isArray(this.config.tunes)) {
        const t = new ue(
          this.config.tunes.map((n) => [n, this.blockTunes.get(n)])
        );
        e.tunes = new ue([...t, ...this.blockTunes.internalTools]);
        return;
      }
      e.tunes = this.blockTunes.internalTools;
    }
  }
  /**
   * Validate Tools configuration objects and throw Error for user if it is invalid
   */
  validateTools() {
    for (const e in this.config.tools)
      if (Object.prototype.hasOwnProperty.call(this.config.tools, e)) {
        if (e in this.internalTools)
          return;
        const t = this.config.tools[e];
        if (!Z(t) && !Z(t.class))
          throw Error(
            `Tool «${e}» must be a constructor function or an object with function in the «class» property`
          );
      }
  }
  /**
   * Unify tools config
   */
  prepareConfig() {
    const e = {};
    for (const t in this.config.tools)
      ce(this.config.tools[t]) ? e[t] = this.config.tools[t] : e[t] = { class: this.config.tools[t] };
    return e;
  }
}
Yh([
  Ut
], ca.prototype, "getAllInlineToolsSanitizeConfig", 1);
const Xh = `:root{--selectionColor: #e1f2ff;--inlineSelectionColor: #d4ecff;--bg-light: #eff2f5;--grayText: #707684;--color-dark: #1D202B;--color-active-icon: #388AE5;--color-gray-border: rgba(201, 201, 204, .48);--content-width: 650px;--narrow-mode-right-padding: 50px;--toolbox-buttons-size: 26px;--toolbox-buttons-size--mobile: 36px;--icon-size: 20px;--icon-size--mobile: 28px;--block-padding-vertical: .4em;--color-line-gray: #EFF0F1 }.codex-editor{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;z-index:1}.codex-editor .hide,.codex-editor__redactor--hidden{display:none}.codex-editor__redactor [contenteditable]:empty:after{content:"\\feff"}@media (min-width: 651px){.codex-editor--narrow .codex-editor__redactor{margin-right:50px}}@media (min-width: 651px){.codex-editor--narrow.codex-editor--rtl .codex-editor__redactor{margin-left:50px;margin-right:0}}@media (min-width: 651px){.codex-editor--narrow .ce-toolbar__actions{right:-5px}}.codex-editor__loader{position:relative;height:30vh}.codex-editor__loader:before{content:"";position:absolute;left:50%;top:50%;width:30px;height:30px;margin-top:-15px;margin-left:-15px;border-radius:50%;border:2px solid rgba(201,201,204,.48);border-top-color:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-animation:editor-loader-spin .8s infinite linear;animation:editor-loader-spin .8s infinite linear;will-change:transform}.codex-editor-copyable{position:absolute;height:1px;width:1px;top:-400%;opacity:.001}.codex-editor-overlay{position:fixed;top:0px;left:0px;right:0px;bottom:0px;z-index:999;pointer-events:none;overflow:hidden}.codex-editor-overlay__container{position:relative;pointer-events:auto;z-index:0}.codex-editor-overlay__rectangle{position:absolute;pointer-events:none;background-color:#2eaadc33;border:1px solid transparent}.codex-editor svg{max-height:100%}.codex-editor path{stroke:currentColor}::-moz-selection{background-color:#d4ecff}::selection{background-color:#d4ecff}.codex-editor--toolbox-opened [contentEditable=true][data-placeholder]:focus:before{opacity:0!important}@-webkit-keyframes editor-loader-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes editor-loader-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.ce-scroll-locked{overflow:hidden}.ce-scroll-locked--hard{overflow:hidden;top:calc(-1 * var(--window-scroll-offset));position:fixed;width:100%}.ce-toolbar{position:absolute;left:0;right:0;top:0;-webkit-transition:opacity .1s ease;transition:opacity .1s ease;will-change:opacity,top;display:none}.ce-toolbar--opened{display:block}.ce-toolbar__content{max-width:650px;margin:0 auto;position:relative}.ce-toolbar__plus{color:#1d202b;cursor:pointer;width:26px;height:26px;border-radius:7px;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-ms-flex-negative:0;flex-shrink:0}@media (max-width: 650px){.ce-toolbar__plus{width:36px;height:36px}}@media (hover: hover){.ce-toolbar__plus:hover{background-color:#eff2f5}}.ce-toolbar__plus--active{background-color:#eff2f5;-webkit-animation:bounceIn .75s 1;animation:bounceIn .75s 1;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.ce-toolbar__plus-shortcut{opacity:.6;word-spacing:-2px;margin-top:5px}@media (max-width: 650px){.ce-toolbar__plus{position:absolute;background-color:#fff;border:1px solid #E8E8EB;-webkit-box-shadow:0 3px 15px -3px rgba(13,20,33,.13);box-shadow:0 3px 15px -3px #0d142121;border-radius:6px;z-index:2;position:static}.ce-toolbar__plus--left-oriented:before{left:15px;margin-left:0}.ce-toolbar__plus--right-oriented:before{left:auto;right:15px;margin-left:0}}.ce-toolbar__actions{position:absolute;right:100%;opacity:0;display:-webkit-box;display:-ms-flexbox;display:flex;padding-right:5px}.ce-toolbar__actions--opened{opacity:1}@media (max-width: 650px){.ce-toolbar__actions{right:auto}}.ce-toolbar__settings-btn{color:#1d202b;width:26px;height:26px;border-radius:7px;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;margin-left:3px;cursor:pointer;user-select:none}@media (max-width: 650px){.ce-toolbar__settings-btn{width:36px;height:36px}}@media (hover: hover){.ce-toolbar__settings-btn:hover{background-color:#eff2f5}}.ce-toolbar__settings-btn--active{background-color:#eff2f5;-webkit-animation:bounceIn .75s 1;animation:bounceIn .75s 1;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}@media (min-width: 651px){.ce-toolbar__settings-btn{width:24px}}.ce-toolbar__settings-btn--hidden{display:none}@media (max-width: 650px){.ce-toolbar__settings-btn{position:absolute;background-color:#fff;border:1px solid #E8E8EB;-webkit-box-shadow:0 3px 15px -3px rgba(13,20,33,.13);box-shadow:0 3px 15px -3px #0d142121;border-radius:6px;z-index:2;position:static}.ce-toolbar__settings-btn--left-oriented:before{left:15px;margin-left:0}.ce-toolbar__settings-btn--right-oriented:before{left:auto;right:15px;margin-left:0}}.ce-toolbar__plus svg,.ce-toolbar__settings-btn svg{width:24px;height:24px}@media (min-width: 651px){.codex-editor--narrow .ce-toolbar__plus{left:5px}}@media (min-width: 651px){.codex-editor--narrow .ce-toolbox .ce-popover{right:0;left:auto;left:initial}}.ce-inline-toolbar{--y-offset: 8px;position:absolute;background-color:#fff;border:1px solid #E8E8EB;-webkit-box-shadow:0 3px 15px -3px rgba(13,20,33,.13);box-shadow:0 3px 15px -3px #0d142121;border-radius:6px;z-index:2;-webkit-transform:translateX(-50%) translateY(8px) scale(.94);transform:translate(-50%) translateY(8px) scale(.94);opacity:0;visibility:hidden;-webkit-transition:opacity .25s ease,-webkit-transform .15s ease;transition:opacity .25s ease,-webkit-transform .15s ease;transition:transform .15s ease,opacity .25s ease;transition:transform .15s ease,opacity .25s ease,-webkit-transform .15s ease;will-change:transform,opacity;top:0;left:0;z-index:3}.ce-inline-toolbar--left-oriented:before{left:15px;margin-left:0}.ce-inline-toolbar--right-oriented:before{left:auto;right:15px;margin-left:0}.ce-inline-toolbar--showed{opacity:1;visibility:visible;-webkit-transform:translateX(-50%);transform:translate(-50%)}.ce-inline-toolbar--left-oriented{-webkit-transform:translateX(-23px) translateY(8px) scale(.94);transform:translate(-23px) translateY(8px) scale(.94)}.ce-inline-toolbar--left-oriented.ce-inline-toolbar--showed{-webkit-transform:translateX(-23px);transform:translate(-23px)}.ce-inline-toolbar--right-oriented{-webkit-transform:translateX(-100%) translateY(8px) scale(.94);transform:translate(-100%) translateY(8px) scale(.94);margin-left:23px}.ce-inline-toolbar--right-oriented.ce-inline-toolbar--showed{-webkit-transform:translateX(-100%);transform:translate(-100%)}.ce-inline-toolbar [hidden]{display:none!important}.ce-inline-toolbar__toggler-and-button-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;padding:0 6px}.ce-inline-toolbar__buttons{display:-webkit-box;display:-ms-flexbox;display:flex}.ce-inline-toolbar__dropdown{display:-webkit-box;display:-ms-flexbox;display:flex;padding:6px;margin:0 6px 0 -6px;-webkit-box-align:center;-ms-flex-align:center;align-items:center;cursor:pointer;border-right:1px solid rgba(201,201,204,.48);-webkit-box-sizing:border-box;box-sizing:border-box}@media (hover: hover){.ce-inline-toolbar__dropdown:hover{background:#eff2f5}}.ce-inline-toolbar__dropdown--hidden{display:none}.ce-inline-toolbar__dropdown-content,.ce-inline-toolbar__dropdown-arrow{display:-webkit-box;display:-ms-flexbox;display:flex}.ce-inline-toolbar__dropdown-content svg,.ce-inline-toolbar__dropdown-arrow svg{width:20px;height:20px}.ce-inline-toolbar__shortcut{opacity:.6;word-spacing:-3px;margin-top:3px}.ce-inline-tool{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding:6px 1px;cursor:pointer;border:0;outline:none;background-color:transparent;vertical-align:bottom;color:inherit;margin:0;border-radius:0;line-height:normal}.ce-inline-tool svg{width:20px;height:20px}@media (max-width: 650px){.ce-inline-tool svg{width:28px;height:28px}}@media (hover: hover){.ce-inline-tool:hover{background-color:#eff2f5}}.ce-inline-tool--active{color:#388ae5}.ce-inline-tool--focused{background:rgba(34,186,255,.08)!important}.ce-inline-tool--focused{-webkit-box-shadow:inset 0 0 0px 1px rgba(7,161,227,.08);box-shadow:inset 0 0 0 1px #07a1e314}.ce-inline-tool--focused-animated{-webkit-animation-name:buttonClicked;animation-name:buttonClicked;-webkit-animation-duration:.25s;animation-duration:.25s}.ce-inline-tool--link .icon--unlink,.ce-inline-tool--unlink .icon--link{display:none}.ce-inline-tool--unlink .icon--unlink{display:inline-block;margin-bottom:-1px}.ce-inline-tool-input{outline:none;border:0;border-radius:0 0 4px 4px;margin:0;font-size:13px;padding:10px;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;display:none;font-weight:500;border-top:1px solid rgba(201,201,204,.48);-webkit-appearance:none;font-family:inherit}@media (max-width: 650px){.ce-inline-tool-input{font-size:15px;font-weight:500}}.ce-inline-tool-input::-webkit-input-placeholder{color:#707684}.ce-inline-tool-input::-moz-placeholder{color:#707684}.ce-inline-tool-input:-ms-input-placeholder{color:#707684}.ce-inline-tool-input::-ms-input-placeholder{color:#707684}.ce-inline-tool-input::placeholder{color:#707684}.ce-inline-tool-input--showed{display:block}.ce-conversion-toolbar{position:absolute;background-color:#fff;border:1px solid #E8E8EB;-webkit-box-shadow:0 3px 15px -3px rgba(13,20,33,.13);box-shadow:0 3px 15px -3px #0d142121;border-radius:6px;z-index:2;opacity:0;visibility:hidden;will-change:transform,opacity;-webkit-transition:opacity .1s ease,-webkit-transform .1s ease;transition:opacity .1s ease,-webkit-transform .1s ease;transition:transform .1s ease,opacity .1s ease;transition:transform .1s ease,opacity .1s ease,-webkit-transform .1s ease;-webkit-transform:translateY(-8px);transform:translateY(-8px);left:-1px;width:150px;margin-top:5px;-webkit-box-sizing:content-box;box-sizing:content-box}.ce-conversion-toolbar--left-oriented:before{left:15px;margin-left:0}.ce-conversion-toolbar--right-oriented:before{left:auto;right:15px;margin-left:0}.ce-conversion-toolbar--showed{opacity:1;visibility:visible;-webkit-transform:none;transform:none}.ce-conversion-toolbar [hidden]{display:none!important}.ce-conversion-toolbar__buttons{display:-webkit-box;display:-ms-flexbox;display:flex}.ce-conversion-toolbar__label{color:#707684;font-size:11px;font-weight:500;letter-spacing:.33px;padding:10px 10px 5px;text-transform:uppercase}.ce-conversion-tool{display:-webkit-box;display:-ms-flexbox;display:flex;padding:5px 10px;font-size:14px;line-height:20px;font-weight:500;cursor:pointer;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.ce-conversion-tool--hidden{display:none}.ce-conversion-tool--focused{background:rgba(34,186,255,.08)!important}.ce-conversion-tool--focused{-webkit-box-shadow:inset 0 0 0px 1px rgba(7,161,227,.08);box-shadow:inset 0 0 0 1px #07a1e314}.ce-conversion-tool--focused-animated{-webkit-animation-name:buttonClicked;animation-name:buttonClicked;-webkit-animation-duration:.25s;animation-duration:.25s}.ce-conversion-tool:hover{background:#eff2f5}.ce-conversion-tool__icon{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;width:26px;height:26px;-webkit-box-shadow:0 0 0 1px rgba(201,201,204,.48);box-shadow:0 0 0 1px #c9c9cc7a;border-radius:5px;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;background:#fff;-webkit-box-sizing:content-box;box-sizing:content-box;-ms-flex-negative:0;flex-shrink:0;margin-right:10px}.ce-conversion-tool__icon svg{width:20px;height:20px}@media (max-width: 650px){.ce-conversion-tool__icon{width:36px;height:36px;border-radius:8px}.ce-conversion-tool__icon svg{width:28px;height:28px}}.ce-conversion-tool--last{margin-right:0!important}.ce-conversion-tool--active{color:#388ae5!important}.ce-conversion-tool--active{-webkit-animation:bounceIn .75s 1;animation:bounceIn .75s 1;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.ce-settings__button{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding:6px 1px;border-radius:3px;cursor:pointer;border:0;outline:none;background-color:transparent;vertical-align:bottom;color:inherit;margin:0;line-height:32px}.ce-settings__button svg{width:20px;height:20px}@media (max-width: 650px){.ce-settings__button svg{width:28px;height:28px}}@media (hover: hover){.ce-settings__button:hover{background-color:#eff2f5}}.ce-settings__button--active{color:#388ae5}.ce-settings__button--focused{background:rgba(34,186,255,.08)!important}.ce-settings__button--focused{-webkit-box-shadow:inset 0 0 0px 1px rgba(7,161,227,.08);box-shadow:inset 0 0 0 1px #07a1e314}.ce-settings__button--focused-animated{-webkit-animation-name:buttonClicked;animation-name:buttonClicked;-webkit-animation-duration:.25s;animation-duration:.25s}.ce-settings__button:not(:nth-child(3n+3)){margin-right:3px}.ce-settings__button:nth-child(n+4){margin-top:3px}.ce-settings__button--disabled{cursor:not-allowed!important}.ce-settings__button--disabled{opacity:.3}.ce-settings__button--selected{color:#388ae5}@media (min-width: 651px){.codex-editor--narrow .ce-settings .ce-popover{right:0;left:auto;left:initial}}@-webkit-keyframes fade-in{0%{opacity:0}to{opacity:1}}@keyframes fade-in{0%{opacity:0}to{opacity:1}}.ce-block{-webkit-animation:fade-in .3s ease;animation:fade-in .3s ease;-webkit-animation-fill-mode:none;animation-fill-mode:none;-webkit-animation-fill-mode:initial;animation-fill-mode:initial}.ce-block:first-of-type{margin-top:0}.ce-block--selected .ce-block__content{background:#e1f2ff}.ce-block--selected .ce-block__content [contenteditable]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ce-block--selected .ce-block__content img,.ce-block--selected .ce-block__content .ce-stub{opacity:.55}.ce-block--stretched .ce-block__content{max-width:none}.ce-block__content{position:relative;max-width:650px;margin:0 auto;-webkit-transition:background-color .15s ease;transition:background-color .15s ease}.ce-block--drop-target .ce-block__content:before{content:"";position:absolute;top:100%;left:-20px;margin-top:-1px;height:8px;width:8px;border:solid #388AE5;border-width:1px 1px 0 0;-webkit-transform-origin:right;transform-origin:right;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.ce-block--drop-target .ce-block__content:after{content:"";position:absolute;top:100%;height:1px;width:100%;color:#388ae5;background:repeating-linear-gradient(90deg,#388AE5,#388AE5 1px,#fff 1px,#fff 6px)}.ce-block a{cursor:pointer;-webkit-text-decoration:underline;text-decoration:underline}.ce-block b{font-weight:700}.ce-block i{font-style:italic}@media (min-width: 651px){.codex-editor--narrow .ce-block--focused{margin-right:-50px;padding-right:50px}}@-webkit-keyframes bounceIn{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}20%{-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}60%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes bounceIn{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}20%{-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}60%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@-webkit-keyframes selectionBounce{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}50%{-webkit-transform:scale3d(1.01,1.01,1.01);transform:scale3d(1.01,1.01,1.01)}70%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes selectionBounce{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}50%{-webkit-transform:scale3d(1.01,1.01,1.01);transform:scale3d(1.01,1.01,1.01)}70%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@-webkit-keyframes buttonClicked{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.95,.95,.95);transform:scale3d(.95,.95,.95)}60%{-webkit-transform:scale3d(1.02,1.02,1.02);transform:scale3d(1.02,1.02,1.02)}80%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes buttonClicked{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.95,.95,.95);transform:scale3d(.95,.95,.95)}60%{-webkit-transform:scale3d(1.02,1.02,1.02);transform:scale3d(1.02,1.02,1.02)}80%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}.cdx-block{padding:.4em 0}.cdx-block::-webkit-input-placeholder{line-height:normal!important}.cdx-input{border:1px solid rgba(201,201,204,.48);-webkit-box-shadow:inset 0 1px 2px 0 rgba(35,44,72,.06);box-shadow:inset 0 1px 2px #232c480f;border-radius:3px;padding:10px 12px;outline:none;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box}.cdx-input[data-placeholder]:before{position:static!important}.cdx-input[data-placeholder]:before{display:inline-block;width:0;white-space:nowrap;pointer-events:none}.cdx-settings-button{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding:6px 1px;border-radius:3px;cursor:pointer;border:0;outline:none;background-color:transparent;vertical-align:bottom;color:inherit;margin:0;min-width:26px;min-height:26px}.cdx-settings-button svg{width:20px;height:20px}@media (max-width: 650px){.cdx-settings-button svg{width:28px;height:28px}}@media (hover: hover){.cdx-settings-button:hover{background-color:#eff2f5}}.cdx-settings-button--focused{background:rgba(34,186,255,.08)!important}.cdx-settings-button--focused{-webkit-box-shadow:inset 0 0 0px 1px rgba(7,161,227,.08);box-shadow:inset 0 0 0 1px #07a1e314}.cdx-settings-button--focused-animated{-webkit-animation-name:buttonClicked;animation-name:buttonClicked;-webkit-animation-duration:.25s;animation-duration:.25s}.cdx-settings-button--active{color:#388ae5}.cdx-settings-button svg{width:auto;height:auto}@media (max-width: 650px){.cdx-settings-button{width:36px;height:36px;border-radius:8px}}.cdx-loader{position:relative;border:1px solid rgba(201,201,204,.48)}.cdx-loader:before{content:"";position:absolute;left:50%;top:50%;width:18px;height:18px;margin:-11px 0 0 -11px;border:2px solid rgba(201,201,204,.48);border-left-color:#388ae5;border-radius:50%;-webkit-animation:cdxRotation 1.2s infinite linear;animation:cdxRotation 1.2s infinite linear}@-webkit-keyframes cdxRotation{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes cdxRotation{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.cdx-button{padding:13px;border-radius:3px;border:1px solid rgba(201,201,204,.48);font-size:14.9px;background:#fff;-webkit-box-shadow:0 2px 2px 0 rgba(18,30,57,.04);box-shadow:0 2px 2px #121e390a;color:#707684;text-align:center;cursor:pointer}@media (hover: hover){.cdx-button:hover{background:#FBFCFE;-webkit-box-shadow:0 1px 3px 0 rgba(18,30,57,.08);box-shadow:0 1px 3px #121e3914}}.cdx-button svg{height:20px;margin-right:.2em;margin-top:-2px}.ce-stub{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;width:100%;padding:3.5em 0;margin:17px 0;border-radius:3px;background:#fcf7f7;color:#b46262}.ce-stub__info{margin-left:20px}.ce-stub__title{margin-bottom:3px;font-weight:600;font-size:18px;text-transform:capitalize}.ce-stub__subtitle{font-size:16px}.codex-editor.codex-editor--rtl{direction:rtl}.codex-editor.codex-editor--rtl .cdx-list{padding-left:0;padding-right:40px}.codex-editor.codex-editor--rtl .ce-toolbar__plus{right:-26px;left:auto}.codex-editor.codex-editor--rtl .ce-toolbar__actions{right:auto;left:-26px}@media (max-width: 650px){.codex-editor.codex-editor--rtl .ce-toolbar__actions{margin-left:0;margin-right:auto;padding-right:0;padding-left:10px}}.codex-editor.codex-editor--rtl .ce-settings{left:5px;right:auto}.codex-editor.codex-editor--rtl .ce-settings:before{right:auto;left:25px}.codex-editor.codex-editor--rtl .ce-settings__button:not(:nth-child(3n+3)){margin-left:3px;margin-right:0}.codex-editor.codex-editor--rtl .ce-conversion-tool__icon{margin-right:0;margin-left:10px}.codex-editor.codex-editor--rtl .ce-inline-toolbar__dropdown{border-right:0px solid transparent;border-left:1px solid rgba(201,201,204,.48);margin:0 -6px 0 6px}.codex-editor.codex-editor--rtl .ce-inline-toolbar__dropdown .icon--toggler-down{margin-left:0;margin-right:4px}@media (min-width: 651px){.codex-editor--narrow.codex-editor--rtl .ce-toolbar__plus{left:0px;right:5px}}@media (min-width: 651px){.codex-editor--narrow.codex-editor--rtl .ce-toolbar__actions{left:-5px}}.cdx-search-field{--icon-margin-right: 10px;background:rgba(232,232,235,.49);border:1px solid rgba(226,226,229,.2);border-radius:6px;padding:2px;display:grid;grid-template-columns:auto auto 1fr;grid-template-rows:auto}.cdx-search-field__icon{width:26px;height:26px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin-right:var(--icon-margin-right)}.cdx-search-field__icon svg{width:20px;height:20px;color:#707684}.cdx-search-field__input{font-size:14px;outline:none;font-weight:500;font-family:inherit;border:0;background:transparent;margin:0;padding:0;line-height:22px;min-width:calc(100% - 26px - var(--icon-margin-right))}.cdx-search-field__input::-webkit-input-placeholder{color:#707684;font-weight:500}.cdx-search-field__input::-moz-placeholder{color:#707684;font-weight:500}.cdx-search-field__input:-ms-input-placeholder{color:#707684;font-weight:500}.cdx-search-field__input::-ms-input-placeholder{color:#707684;font-weight:500}.cdx-search-field__input::placeholder{color:#707684;font-weight:500}.ce-popover{--border-radius: 6px;--width: 200px;--max-height: 270px;--padding: 6px;--offset-from-target: 8px;--color-border: #e8e8eb;--color-shadow: rgba(13,20,33,.13);--color-background: white;--color-text-primary: black;--color-text-secondary: #707684;--color-border-icon: rgba(201, 201, 204, .48);--color-border-icon-disabled: #EFF0F1;--color-text-icon-active: #388AE5;--color-background-icon-active: rgba(56, 138, 229, .1);--color-background-item-focus: rgba(34, 186, 255, .08);--color-shadow-item-focus: rgba(7, 161, 227, .08);--color-background-item-hover: #eff2f5;--color-background-item-confirm: #E24A4A;--color-background-item-confirm-hover: #CE4343;min-width:var(--width);width:var(--width);max-height:var(--max-height);border-radius:var(--border-radius);overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:0 3px 15px -3px var(--color-shadow);box-shadow:0 3px 15px -3px var(--color-shadow);position:absolute;left:0;top:calc(100% + var(--offset-from-target));background:var(--color-background);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;z-index:4;opacity:0;max-height:0;pointer-events:none;padding:0;border:none}.ce-popover--opened{opacity:1;padding:var(--padding);max-height:var(--max-height);pointer-events:auto;-webkit-animation:panelShowing .1s ease;animation:panelShowing .1s ease;border:1px solid var(--color-border)}@media (max-width: 650px){.ce-popover--opened{-webkit-animation:panelShowingMobile .25s ease;animation:panelShowingMobile .25s ease}}.ce-popover__items{overflow-y:auto;-ms-scroll-chaining:none;overscroll-behavior:contain}@media (max-width: 650px){.ce-popover__overlay{position:fixed;top:0;bottom:0;left:0;right:0;background:#1D202B;z-index:3;opacity:.5;-webkit-transition:opacity .12s ease-in;transition:opacity .12s ease-in;will-change:opacity;visibility:visible}}.ce-popover__overlay--hidden{display:none}.ce-popover--open-top{top:calc(-1 * (var(--offset-from-target) + var(--popover-height)))}@media (max-width: 650px){.ce-popover{--offset: 5px;position:fixed;max-width:none;min-width:calc(100% - var(--offset) * 2);left:var(--offset);right:var(--offset);bottom:calc(var(--offset) + env(safe-area-inset-bottom));top:auto;border-radius:10px}.ce-popover .ce-popover__search{display:none}}.ce-popover__search,.ce-popover__custom-content:not(:empty){margin-bottom:5px}.ce-popover__nothing-found-message{color:#707684;display:none;cursor:default;padding:3px;font-size:14px;line-height:20px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ce-popover__nothing-found-message--displayed{display:block}.ce-popover__custom-content:not(:empty){padding:4px}@media (min-width: 651px){.ce-popover__custom-content:not(:empty){padding:0}}.ce-popover__custom-content--hidden{display:none}.ce-popover-item{--border-radius: 6px;--icon-size: 20px;--icon-size-mobile: 28px;border-radius:var(--border-radius);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:3px;color:var(--color-text-primary);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}@media (max-width: 650px){.ce-popover-item{padding:4px}}.ce-popover-item:not(:last-of-type){margin-bottom:1px}.ce-popover-item__icon{border-radius:5px;width:26px;height:26px;-webkit-box-shadow:0 0 0 1px var(--color-border-icon);box-shadow:0 0 0 1px var(--color-border-icon);background:#fff;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin-right:10px}.ce-popover-item__icon svg{width:20px;height:20px}@media (max-width: 650px){.ce-popover-item__icon{width:36px;height:36px;border-radius:8px}.ce-popover-item__icon svg{width:var(--icon-size-mobile);height:var(--icon-size-mobile)}}.ce-popover-item__title{font-size:14px;line-height:20px;font-weight:500;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}@media (max-width: 650px){.ce-popover-item__title{font-size:16px}}.ce-popover-item__secondary-title{color:var(--color-text-secondary);font-size:12px;margin-left:auto;white-space:nowrap;letter-spacing:-.1em;padding-right:5px;margin-bottom:-2px;opacity:.6}@media (max-width: 650px){.ce-popover-item__secondary-title{display:none}}.ce-popover-item--active{background:var(--color-background-icon-active);color:var(--color-text-icon-active)}.ce-popover-item--active .ce-popover-item__icon{-webkit-box-shadow:none;box-shadow:none}.ce-popover-item--disabled{color:var(--color-text-secondary);cursor:default;pointer-events:none}.ce-popover-item--disabled .ce-popover-item__icon{-webkit-box-shadow:0 0 0 1px var(--color-border-icon-disabled);box-shadow:0 0 0 1px var(--color-border-icon-disabled)}.ce-popover-item--focused:not(.ce-popover-item--no-focus){background:var(--color-background-item-focus)!important}.ce-popover-item--focused:not(.ce-popover-item--no-focus){-webkit-box-shadow:inset 0 0 0px 1px var(--color-shadow-item-focus);box-shadow:inset 0 0 0 1px var(--color-shadow-item-focus)}.ce-popover-item--hidden{display:none}@media (hover: hover){.ce-popover-item:hover{cursor:pointer}.ce-popover-item:hover:not(.ce-popover-item--no-hover){background-color:var(--color-background-item-hover)}.ce-popover-item:hover .ce-popover-item__icon{-webkit-box-shadow:none;box-shadow:none}}.ce-popover-item--confirmation{background:var(--color-background-item-confirm)}.ce-popover-item--confirmation .ce-popover-item__icon{color:var(--color-background-item-confirm)}.ce-popover-item--confirmation .ce-popover-item__title{color:#fff}@media (hover: hover){.ce-popover-item--confirmation:not(.ce-popover-item--no-hover):hover{background:var(--color-background-item-confirm-hover)}}.ce-popover-item--confirmation:not(.ce-popover-item--no-focus).ce-popover-item--focused{background:var(--color-background-item-confirm-hover)!important}.ce-popover-item--confirmation .ce-popover-item__icon,.ce-popover-item--active .ce-popover-item__icon,.ce-popover-item--focused .ce-popover-item__icon{-webkit-box-shadow:none;box-shadow:none}@-webkit-keyframes panelShowing{0%{opacity:0;-webkit-transform:translateY(-8px) scale(.9);transform:translateY(-8px) scale(.9)}70%{opacity:1;-webkit-transform:translateY(2px);transform:translateY(2px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes panelShowing{0%{opacity:0;-webkit-transform:translateY(-8px) scale(.9);transform:translateY(-8px) scale(.9)}70%{opacity:1;-webkit-transform:translateY(2px);transform:translateY(2px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes panelShowingMobile{0%{opacity:0;-webkit-transform:translateY(14px) scale(.98);transform:translateY(14px) scale(.98)}70%{opacity:1;-webkit-transform:translateY(-4px);transform:translateY(-4px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes panelShowingMobile{0%{opacity:0;-webkit-transform:translateY(14px) scale(.98);transform:translateY(14px) scale(.98)}70%{opacity:1;-webkit-transform:translateY(-4px);transform:translateY(-4px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}.wobble{-webkit-animation-name:wobble;animation-name:wobble;-webkit-animation-duration:.4s;animation-duration:.4s}@-webkit-keyframes wobble{0%{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}15%{-webkit-transform:translate3d(-9%,0,0);transform:translate3d(-9%,0,0)}30%{-webkit-transform:translate3d(9%,0,0);transform:translate3d(9%,0,0)}45%{-webkit-transform:translate3d(-4%,0,0);transform:translate3d(-4%,0,0)}60%{-webkit-transform:translate3d(4%,0,0);transform:translate3d(4%,0,0)}75%{-webkit-transform:translate3d(-1%,0,0);transform:translate3d(-1%,0,0)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes wobble{0%{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}15%{-webkit-transform:translate3d(-9%,0,0);transform:translate3d(-9%,0,0)}30%{-webkit-transform:translate3d(9%,0,0);transform:translate3d(9%,0,0)}45%{-webkit-transform:translate3d(-4%,0,0);transform:translate3d(-4%,0,0)}60%{-webkit-transform:translate3d(4%,0,0);transform:translate3d(4%,0,0)}75%{-webkit-transform:translate3d(-1%,0,0);transform:translate3d(-1%,0,0)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}
`;
class Kh extends W {
  constructor() {
    super(...arguments), this.isMobile = !1, this.contentRectCache = void 0, this.resizeDebouncer = ku(() => {
      this.windowResize();
    }, 200);
  }
  /**
   * Editor.js UI CSS class names
   *
   * @returns {{editorWrapper: string, editorZone: string}}
   */
  get CSS() {
    return {
      editorWrapper: "codex-editor",
      editorWrapperNarrow: "codex-editor--narrow",
      editorZone: "codex-editor__redactor",
      editorZoneHidden: "codex-editor__redactor--hidden",
      editorLoader: "codex-editor__loader",
      editorEmpty: "codex-editor--empty",
      editorRtlFix: "codex-editor--rtl"
    };
  }
  /**
   * Return Width of center column of Editor
   *
   * @returns {DOMRect}
   */
  get contentRect() {
    if (this.contentRectCache)
      return this.contentRectCache;
    const e = this.nodes.wrapper.querySelector(`.${re.CSS.content}`);
    return e ? (this.contentRectCache = e.getBoundingClientRect(), this.contentRectCache) : {
      width: 650,
      left: 0,
      right: 0
    };
  }
  /**
   * Adds loader to editor while content is not ready
   */
  addLoader() {
    this.nodes.loader = m.make("div", this.CSS.editorLoader), this.nodes.wrapper.prepend(this.nodes.loader), this.nodes.redactor.classList.add(this.CSS.editorZoneHidden);
  }
  /**
   * Removes loader when content has loaded
   */
  removeLoader() {
    this.nodes.loader.remove(), this.nodes.redactor.classList.remove(this.CSS.editorZoneHidden);
  }
  /**
   * Making main interface
   */
  async prepare() {
    this.checkIsMobile(), this.make(), this.addLoader(), this.loadStyles();
  }
  /**
   * Toggle read-only state
   *
   * If readOnly is true:
   *  - removes all listeners from main UI module elements
   *
   * if readOnly is false:
   *  - enables all listeners to UI module elements
   *
   * @param {boolean} readOnlyEnabled - "read only" state
   */
  toggleReadOnly(e) {
    e ? this.disableModuleBindings() : this.enableModuleBindings();
  }
  /**
   * Check if Editor is empty and set CSS class to wrapper
   */
  checkEmptiness() {
    const { BlockManager: e } = this.Editor;
    this.nodes.wrapper.classList.toggle(this.CSS.editorEmpty, e.isEditorEmpty);
  }
  /**
   * Check if one of Toolbar is opened
   * Used to prevent global keydowns (for example, Enter) conflicts with Enter-on-toolbar
   *
   * @returns {boolean}
   */
  get someToolbarOpened() {
    const { Toolbar: e, BlockSettings: t, InlineToolbar: n, ConversionToolbar: i } = this.Editor;
    return t.opened || n.opened || i.opened || e.toolbox.opened;
  }
  /**
   * Check for some Flipper-buttons is under focus
   */
  get someFlipperButtonFocused() {
    return this.Editor.Toolbar.toolbox.hasFocus() ? !0 : Object.entries(this.Editor).filter(([e, t]) => t.flipper instanceof Ye).some(([e, t]) => t.flipper.hasFocus());
  }
  /**
   * Clean editor`s UI
   */
  destroy() {
    this.nodes.holder.innerHTML = "";
  }
  /**
   * Close all Editor's toolbars
   */
  closeAllToolbars() {
    const { Toolbar: e, BlockSettings: t, InlineToolbar: n, ConversionToolbar: i } = this.Editor;
    t.close(), n.close(), i.close(), e.toolbox.close();
  }
  /**
   * Check for mobile mode and cache a result
   */
  checkIsMobile() {
    this.isMobile = window.innerWidth < Us;
  }
  /**
   * Makes Editor.js interface
   */
  make() {
    this.nodes.holder = m.getHolder(this.config.holder), this.nodes.wrapper = m.make("div", [
      this.CSS.editorWrapper,
      ...this.isRtl ? [this.CSS.editorRtlFix] : []
    ]), this.nodes.redactor = m.make("div", this.CSS.editorZone), this.nodes.holder.offsetWidth < this.contentRect.width && this.nodes.wrapper.classList.add(this.CSS.editorWrapperNarrow), this.nodes.redactor.style.paddingBottom = this.config.minHeight + "px", this.nodes.wrapper.appendChild(this.nodes.redactor), this.nodes.holder.appendChild(this.nodes.wrapper);
  }
  /**
   * Appends CSS
   */
  loadStyles() {
    const e = "editor-js-styles";
    if (m.get(e))
      return;
    const t = m.make("style", null, {
      id: e,
      textContent: Xh.toString()
    });
    m.prepend(document.head, t);
  }
  /**
   * Bind events on the Editor.js interface
   */
  enableModuleBindings() {
    this.readOnlyMutableListeners.on(this.nodes.redactor, "click", (e) => {
      this.redactorClicked(e);
    }, !1), this.readOnlyMutableListeners.on(this.nodes.redactor, "mousedown", (e) => {
      this.documentTouched(e);
    }, !0), this.readOnlyMutableListeners.on(this.nodes.redactor, "touchstart", (e) => {
      this.documentTouched(e);
    }, !0), this.readOnlyMutableListeners.on(document, "keydown", (e) => {
      this.documentKeydown(e);
    }, !0), this.readOnlyMutableListeners.on(document, "mousedown", (e) => {
      this.documentClicked(e);
    }, !0), this.readOnlyMutableListeners.on(document, "selectionchange", () => {
      this.selectionChanged();
    }, !0), this.readOnlyMutableListeners.on(window, "resize", () => {
      this.resizeDebouncer();
    }, {
      passive: !0
    }), this.watchBlockHoveredEvents();
  }
  /**
   * Listen redactor mousemove to emit 'block-hovered' event
   */
  watchBlockHoveredEvents() {
    let e;
    this.readOnlyMutableListeners.on(this.nodes.redactor, "mousemove", Un((t) => {
      const n = t.target.closest(".ce-block");
      this.Editor.BlockSelection.anyBlockSelected || n && e !== n && (e = n, this.eventsDispatcher.emit(Qs, {
        block: this.Editor.BlockManager.getBlockByChildNode(n)
      }));
    }, 20), {
      passive: !0
    });
  }
  /**
   * Unbind events on the Editor.js interface
   */
  disableModuleBindings() {
    this.readOnlyMutableListeners.clearAll();
  }
  /**
   * Resize window handler
   */
  windowResize() {
    this.contentRectCache = null, this.checkIsMobile();
  }
  /**
   * All keydowns on document
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  documentKeydown(e) {
    switch (e.keyCode) {
      case j.ENTER:
        this.enterPressed(e);
        break;
      case j.BACKSPACE:
        this.backspacePressed(e);
        break;
      case j.ESC:
        this.escapePressed(e);
        break;
      default:
        this.defaultBehaviour(e);
        break;
    }
  }
  /**
   * Ignore all other document's keydown events
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  defaultBehaviour(e) {
    const { currentBlock: t } = this.Editor.BlockManager, n = e.target.closest(`.${this.CSS.editorWrapper}`), i = e.altKey || e.ctrlKey || e.metaKey || e.shiftKey;
    if (t !== void 0 && n === null) {
      this.Editor.BlockEvents.keydown(e);
      return;
    }
    n || t && i || (this.Editor.BlockManager.dropPointer(), this.Editor.Toolbar.close());
  }
  /**
   * @param {KeyboardEvent} event - keyboard event
   */
  backspacePressed(e) {
    const { BlockManager: t, BlockSelection: n, Caret: i } = this.Editor;
    if (n.anyBlockSelected && !R.isSelectionExists) {
      const r = t.removeSelectedBlocks();
      i.setToBlock(t.insertDefaultBlockAtIndex(r, !0), i.positions.START), n.clearSelection(e), e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation();
    }
  }
  /**
   * Escape pressed
   * If some of Toolbar components are opened, then close it otherwise close Toolbar
   *
   * @param {Event} event - escape keydown event
   */
  escapePressed(e) {
    this.Editor.BlockSelection.clearSelection(e), this.Editor.Toolbar.toolbox.opened ? (this.Editor.Toolbar.toolbox.close(), this.Editor.Caret.setToBlock(this.Editor.BlockManager.currentBlock)) : this.Editor.BlockSettings.opened ? this.Editor.BlockSettings.close() : this.Editor.ConversionToolbar.opened ? this.Editor.ConversionToolbar.close() : this.Editor.InlineToolbar.opened ? this.Editor.InlineToolbar.close() : this.Editor.Toolbar.close();
  }
  /**
   * Enter pressed on document
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  enterPressed(e) {
    const { BlockManager: t, BlockSelection: n } = this.Editor, i = t.currentBlockIndex >= 0;
    if (n.anyBlockSelected && !R.isSelectionExists) {
      n.clearSelection(e), e.preventDefault(), e.stopImmediatePropagation(), e.stopPropagation();
      return;
    }
    if (!this.someToolbarOpened && i && e.target.tagName === "BODY") {
      const r = this.Editor.BlockManager.insert();
      this.Editor.Caret.setToBlock(r), this.Editor.BlockManager.highlightCurrentNode(), this.Editor.Toolbar.moveAndOpen(r);
    }
    this.Editor.BlockSelection.clearSelection(e);
  }
  /**
   * All clicks on document
   *
   * @param {MouseEvent} event - Click event
   */
  documentClicked(e) {
    if (!e.isTrusted)
      return;
    const t = e.target;
    this.nodes.holder.contains(t) || R.isAtEditor || (this.Editor.BlockManager.dropPointer(), this.Editor.Toolbar.close());
    const n = this.Editor.BlockSettings.nodes.wrapper.contains(t), i = this.Editor.Toolbar.nodes.settingsToggler.contains(t), r = n || i;
    if (this.Editor.BlockSettings.opened && !r) {
      this.Editor.BlockSettings.close();
      const s = this.Editor.BlockManager.getBlockByChildNode(t);
      this.Editor.Toolbar.moveAndOpen(s);
    }
    this.Editor.BlockSelection.clearSelection(e);
  }
  /**
   * First touch on editor
   * Fired before click
   *
   * Used to change current block — we need to do it before 'selectionChange' event.
   * Also:
   * - Move and show the Toolbar
   * - Set a Caret
   *
   * @param {MouseEvent | TouchEvent} event - touch or mouse event
   */
  documentTouched(e) {
    let t = e.target;
    if (t === this.nodes.redactor) {
      const n = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX, i = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
      t = document.elementFromPoint(n, i);
    }
    try {
      this.Editor.BlockManager.setCurrentBlockByChildNode(t), this.Editor.BlockManager.highlightCurrentNode();
    } catch {
      this.Editor.RectangleSelection.isRectActivated() || this.Editor.Caret.setToTheLastBlock();
    }
    this.Editor.Toolbar.moveAndOpen();
  }
  /**
   * All clicks on the redactor zone
   *
   * @param {MouseEvent} event - click event
   * @description
   * - By clicks on the Editor's bottom zone:
   *      - if last Block is empty, set a Caret to this
   *      - otherwise, add a new empty Block and set a Caret to that
   */
  redactorClicked(e) {
    const { BlockSelection: t } = this.Editor;
    if (!R.isCollapsed)
      return;
    const n = () => {
      e.stopImmediatePropagation(), e.stopPropagation();
    }, i = e.target, r = e.metaKey || e.ctrlKey;
    if (m.isAnchor(i) && r) {
      n();
      const c = i.getAttribute("href"), u = Eu(c);
      Cu(u);
      return;
    }
    const s = this.Editor.BlockManager.getBlockByIndex(-1), a = m.offset(s.holder).bottom, l = e.pageY;
    if (e.target instanceof Element && e.target.isEqualNode(this.nodes.redactor) && /**
    * If there is cross block selection started, target will be equal to redactor so we need additional check
    */
    !t.anyBlockSelected && /**
    * Prevent caret jumping (to last block) when clicking between blocks
    */
    a < l) {
      n();
      const { BlockManager: c, Caret: u, Toolbar: d } = this.Editor;
      (!c.lastBlock.tool.isDefault || !c.lastBlock.isEmpty) && c.insertAtEnd(), u.setToTheLastBlock(), d.moveAndOpen(c.lastBlock);
    }
  }
  /**
   * Handle selection changes on mobile devices
   * Uses for showing the Inline Toolbar
   */
  selectionChanged() {
    const { CrossBlockSelection: e, BlockSelection: t } = this.Editor, n = R.anchorElement;
    if (e.isCrossBlockSelectionStarted && t.anyBlockSelected && R.get().removeAllRanges(), !n) {
      R.range || this.Editor.InlineToolbar.close();
      return;
    }
    const i = n.closest(`.${re.CSS.content}`) === null;
    if (i && (this.Editor.InlineToolbar.containsNode(n) || this.Editor.InlineToolbar.close(), n.dataset.inlineToolbar !== "true"))
      return;
    this.Editor.BlockManager.currentBlock || this.Editor.BlockManager.setCurrentBlockByChildNode(n);
    const r = i !== !0;
    this.Editor.InlineToolbar.tryToShow(!0, r);
  }
}
const qh = {
  // API Modules
  BlocksAPI: Lu,
  CaretAPI: Nu,
  EventsAPI: Ru,
  I18nAPI: bi,
  API: Du,
  InlineToolbarAPI: Pu,
  ListenersAPI: Fu,
  NotifierAPI: zu,
  ReadOnlyAPI: $u,
  SanitizerAPI: Gu,
  SaverAPI: Zu,
  SelectionAPI: Ju,
  StylesAPI: Qu,
  ToolbarAPI: eh,
  TooltipAPI: nh,
  UiAPI: ih,
  // Toolbar Modules
  BlockSettings: vh,
  ConversionToolbar: Ee,
  Toolbar: Sh,
  InlineToolbar: Ch,
  // Modules
  BlockEvents: Th,
  BlockManager: Oh,
  BlockSelection: Ih,
  Caret: Ko,
  CrossBlockSelection: Ah,
  DragNDrop: Mh,
  ModificationsObserver: Lh,
  Paste: na,
  ReadOnly: Nh,
  RectangleSelection: io,
  Renderer: Rh,
  Saver: Dh,
  Tools: ca,
  UI: Kh
};
class Gh {
  /**
   * @param {EditorConfig} config - user configuration
   */
  constructor(e) {
    this.moduleInstances = {}, this.eventsDispatcher = new an();
    let t, n;
    this.isReady = new Promise((i, r) => {
      t = i, n = r;
    }), Promise.resolve().then(async () => {
      this.configuration = e, await this.validate(), await this.init(), await this.start(), _e("I'm ready! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", "log", "", "color: #E24A75"), setTimeout(async () => {
        if (await this.render(), this.configuration.autofocus) {
          const { BlockManager: i, Caret: r } = this.moduleInstances;
          r.setToBlock(i.blocks[0], r.positions.START), i.highlightCurrentNode();
        }
        this.moduleInstances.UI.removeLoader(), t();
      }, 500);
    }).catch((i) => {
      $(`Editor.js is not ready because of ${i}`, "error"), n(i);
    });
  }
  /**
   * Setting for configuration
   *
   * @param {EditorConfig|string} config - Editor's config to set
   */
  set configuration(e) {
    var t, n;
    ce(e) ? this.config = {
      ...e
    } : this.config = {
      holder: e
    }, $n(!!this.config.holderId, "config.holderId", "config.holder"), this.config.holderId && !this.config.holder && (this.config.holder = this.config.holderId, this.config.holderId = null), this.config.holder == null && (this.config.holder = "editorjs"), this.config.logLevel || (this.config.logLevel = Ds.VERBOSE), bu(this.config.logLevel), $n(!!this.config.initialBlock, "config.initialBlock", "config.defaultBlock"), this.config.defaultBlock = this.config.defaultBlock || this.config.initialBlock || "paragraph", this.config.minHeight = this.config.minHeight !== void 0 ? this.config.minHeight : 300;
    const i = {
      type: this.config.defaultBlock,
      data: {}
    };
    this.config.placeholder = this.config.placeholder || !1, this.config.sanitizer = this.config.sanitizer || {
      p: !0,
      b: !0,
      a: !0
    }, this.config.hideToolbar = this.config.hideToolbar ? this.config.hideToolbar : !1, this.config.tools = this.config.tools || {}, this.config.i18n = this.config.i18n || {}, this.config.data = this.config.data || { blocks: [] }, this.config.onReady = this.config.onReady || (() => {
    }), this.config.onChange = this.config.onChange || (() => {
    }), this.config.inlineToolbar = this.config.inlineToolbar !== void 0 ? this.config.inlineToolbar : !0, (Me(this.config.data) || !this.config.data.blocks || this.config.data.blocks.length === 0) && (this.config.data = { blocks: [i] }), this.config.readOnly = this.config.readOnly || !1, (t = this.config.i18n) != null && t.messages && me.setDictionary(this.config.i18n.messages), this.config.i18n.direction = ((n = this.config.i18n) == null ? void 0 : n.direction) || "ltr";
  }
  /**
   * Returns private property
   *
   * @returns {EditorConfig}
   */
  get configuration() {
    return this.config;
  }
  /**
   * Checks for required fields in Editor's config
   *
   * @returns {Promise<void>}
   */
  async validate() {
    const { holderId: e, holder: t } = this.config;
    if (e && t)
      throw Error("«holderId» and «holder» param can't assign at the same time.");
    if (nt(t) && !m.get(t))
      throw Error(`element with ID «${t}» is missing. Pass correct holder's ID.`);
    if (t && ce(t) && !m.isElement(t))
      throw Error("«holder» value must be an Element node");
  }
  /**
   * Initializes modules:
   *  - make and save instances
   *  - configure
   */
  init() {
    this.constructModules(), this.configureModules();
  }
  /**
   * Start Editor!
   *
   * Get list of modules that needs to be prepared and return a sequence (Promise)
   *
   * @returns {Promise<void>}
   */
  async start() {
    await [
      "Tools",
      "UI",
      "BlockManager",
      "Paste",
      "BlockSelection",
      "RectangleSelection",
      "CrossBlockSelection",
      "ReadOnly"
    ].reduce(
      (e, t) => e.then(async () => {
        try {
          await this.moduleInstances[t].prepare();
        } catch (n) {
          if (n instanceof $s)
            throw new Error(n.message);
          $(`Module ${t} was skipped because of %o`, "warn", n);
        }
      }),
      Promise.resolve()
    );
  }
  /**
   * Render initial data
   */
  render() {
    return this.moduleInstances.Renderer.render(this.config.data.blocks);
  }
  /**
   * Make modules instances and save it to the @property this.moduleInstances
   */
  constructModules() {
    Object.entries(qh).forEach(([e, t]) => {
      try {
        this.moduleInstances[e] = new t({
          config: this.configuration,
          eventsDispatcher: this.eventsDispatcher
        });
      } catch (n) {
        $("[constructModules]", `Module ${e} skipped because`, "error", n);
      }
    });
  }
  /**
   * Modules instances configuration:
   *  - pass other modules to the 'state' property
   *  - ...
   */
  configureModules() {
    for (const e in this.moduleInstances)
      Object.prototype.hasOwnProperty.call(this.moduleInstances, e) && (this.moduleInstances[e].state = this.getModulesDiff(e));
  }
  /**
   * Return modules without passed name
   *
   * @param {string} name - module for witch modules difference should be calculated
   */
  getModulesDiff(e) {
    const t = {};
    for (const n in this.moduleInstances)
      n !== e && (t[n] = this.moduleInstances[n]);
    return t;
  }
}
/**
 * Editor.js
 *
 * @license Apache-2.0
 * @see Editor.js <https://editorjs.io>
 * @author CodeX Team <https://codex.so>
 */
class Zh {
  /** Editor version */
  static get version() {
    return "2.27.1";
  }
  /**
   * @param {EditorConfig|string|undefined} [configuration] - user configuration
   */
  constructor(e) {
    let t = () => {
    };
    ce(e) && Z(e.onReady) && (t = e.onReady);
    const n = new Gh(e);
    this.isReady = n.isReady.then(() => {
      this.exportAPI(n), t();
    });
  }
  /**
   * Export external API methods
   *
   * @param {Core} editor — Editor's instance
   */
  exportAPI(e) {
    const t = ["configuration"], n = () => {
      Object.values(e.moduleInstances).forEach((i) => {
        Z(i.destroy) && i.destroy(), i.listeners.removeAll();
      }), e = null;
      for (const i in this)
        Object.prototype.hasOwnProperty.call(this, i) && delete this[i];
      Object.setPrototypeOf(this, null);
    };
    t.forEach((i) => {
      this[i] = e[i];
    }), this.destroy = n, Object.setPrototypeOf(this, e.moduleInstances.API.methods), delete this.exportAPI, Object.entries({
      blocks: {
        clear: "clear",
        render: "render"
      },
      caret: {
        focus: "focus"
      },
      events: {
        on: "on",
        off: "off",
        emit: "emit"
      },
      saver: {
        save: "save"
      }
    }).forEach(([i, r]) => {
      Object.entries(r).forEach(([s, a]) => {
        this[a] = e.moduleInstances.API.methods[i][s];
      });
    });
  }
}
var da = { exports: {} };
(function(o, e) {
  (function(t, n) {
    o.exports = n();
  })(window, function() {
    return function(t) {
      var n = {};
      function i(r) {
        if (n[r])
          return n[r].exports;
        var s = n[r] = { i: r, l: !1, exports: {} };
        return t[r].call(s.exports, s, s.exports, i), s.l = !0, s.exports;
      }
      return i.m = t, i.c = n, i.d = function(r, s, a) {
        i.o(r, s) || Object.defineProperty(r, s, { enumerable: !0, get: a });
      }, i.r = function(r) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(r, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(r, "__esModule", { value: !0 });
      }, i.t = function(r, s) {
        if (1 & s && (r = i(r)), 8 & s || 4 & s && typeof r == "object" && r && r.__esModule)
          return r;
        var a = /* @__PURE__ */ Object.create(null);
        if (i.r(a), Object.defineProperty(a, "default", { enumerable: !0, value: r }), 2 & s && typeof r != "string")
          for (var l in r)
            i.d(a, l, function(c) {
              return r[c];
            }.bind(null, l));
        return a;
      }, i.n = function(r) {
        var s = r && r.__esModule ? function() {
          return r.default;
        } : function() {
          return r;
        };
        return i.d(s, "a", s), s;
      }, i.o = function(r, s) {
        return Object.prototype.hasOwnProperty.call(r, s);
      }, i.p = "/", i(i.s = 5);
    }([function(t, n, i) {
      var r = i(1);
      typeof r == "string" && (r = [[t.i, r, ""]]);
      var s = { hmr: !0, transform: void 0, insertInto: void 0 };
      i(3)(r, s), r.locals && (t.exports = r.locals);
    }, function(t, n, i) {
      (t.exports = i(2)(!1)).push([t.i, `/**
 * Plugin styles
 */
.ce-header {
  padding: 0.6em 0 3px;
  margin: 0;
  line-height: 1.25em;
  outline: none;
}

.ce-header p,
.ce-header div{
  padding: 0 !important;
  margin: 0 !important;
}

/**
 * Styles for Plugin icon in Toolbar
 */
.ce-header__icon {}

.ce-header[contentEditable=true][data-placeholder]::before{
  position: absolute;
  content: attr(data-placeholder);
  color: #707684;
  font-weight: normal;
  display: none;
  cursor: text;
}

.ce-header[contentEditable=true][data-placeholder]:empty::before {
  display: block;
}

.ce-header[contentEditable=true][data-placeholder]:empty:focus::before {
  display: none;
}
`, ""]);
    }, function(t, n) {
      t.exports = function(i) {
        var r = [];
        return r.toString = function() {
          return this.map(function(s) {
            var a = function(l, c) {
              var u = l[1] || "", d = l[3];
              if (!d)
                return u;
              if (c && typeof btoa == "function") {
                var h = (p = d, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(p)))) + " */"), f = d.sources.map(function(g) {
                  return "/*# sourceURL=" + d.sourceRoot + g + " */";
                });
                return [u].concat(f).concat([h]).join(`
`);
              }
              var p;
              return [u].join(`
`);
            }(s, i);
            return s[2] ? "@media " + s[2] + "{" + a + "}" : a;
          }).join("");
        }, r.i = function(s, a) {
          typeof s == "string" && (s = [[null, s, ""]]);
          for (var l = {}, c = 0; c < this.length; c++) {
            var u = this[c][0];
            typeof u == "number" && (l[u] = !0);
          }
          for (c = 0; c < s.length; c++) {
            var d = s[c];
            typeof d[0] == "number" && l[d[0]] || (a && !d[2] ? d[2] = a : a && (d[2] = "(" + d[2] + ") and (" + a + ")"), r.push(d));
          }
        }, r;
      };
    }, function(t, n, i) {
      var r, s, a = {}, l = (r = function() {
        return window && document && document.all && !window.atob;
      }, function() {
        return s === void 0 && (s = r.apply(this, arguments)), s;
      }), c = function(w) {
        return document.querySelector(w);
      }, u = function(w) {
        var k = {};
        return function(E) {
          if (typeof E == "function")
            return E();
          if (k[E] === void 0) {
            var M = c.call(this, E);
            if (window.HTMLIFrameElement && M instanceof window.HTMLIFrameElement)
              try {
                M = M.contentDocument.head;
              } catch {
                M = null;
              }
            k[E] = M;
          }
          return k[E];
        };
      }(), d = null, h = 0, f = [], p = i(4);
      function g(w, k) {
        for (var E = 0; E < w.length; E++) {
          var M = w[E], A = a[M.id];
          if (A) {
            A.refs++;
            for (var N = 0; N < A.parts.length; N++)
              A.parts[N](M.parts[N]);
            for (; N < M.parts.length; N++)
              A.parts.push(b(M.parts[N], k));
          } else {
            var V = [];
            for (N = 0; N < M.parts.length; N++)
              V.push(b(M.parts[N], k));
            a[M.id] = { id: M.id, refs: 1, parts: V };
          }
        }
      }
      function _(w, k) {
        for (var E = [], M = {}, A = 0; A < w.length; A++) {
          var N = w[A], V = k.base ? N[0] + k.base : N[0], z = { css: N[1], media: N[2], sourceMap: N[3] };
          M[V] ? M[V].parts.push(z) : E.push(M[V] = { id: V, parts: [z] });
        }
        return E;
      }
      function B(w, k) {
        var E = u(w.insertInto);
        if (!E)
          throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
        var M = f[f.length - 1];
        if (w.insertAt === "top")
          M ? M.nextSibling ? E.insertBefore(k, M.nextSibling) : E.appendChild(k) : E.insertBefore(k, E.firstChild), f.push(k);
        else if (w.insertAt === "bottom")
          E.appendChild(k);
        else {
          if (typeof w.insertAt != "object" || !w.insertAt.before)
            throw new Error(`[Style Loader]

 Invalid value for parameter 'insertAt' ('options.insertAt') found.
 Must be 'top', 'bottom', or Object.
 (https://github.com/webpack-contrib/style-loader#insertat)
`);
          var A = u(w.insertInto + " " + w.insertAt.before);
          E.insertBefore(k, A);
        }
      }
      function T(w) {
        if (w.parentNode === null)
          return !1;
        w.parentNode.removeChild(w);
        var k = f.indexOf(w);
        k >= 0 && f.splice(k, 1);
      }
      function S(w) {
        var k = document.createElement("style");
        return w.attrs.type === void 0 && (w.attrs.type = "text/css"), v(k, w.attrs), B(w, k), k;
      }
      function v(w, k) {
        Object.keys(k).forEach(function(E) {
          w.setAttribute(E, k[E]);
        });
      }
      function b(w, k) {
        var E, M, A, N;
        if (k.transform && w.css) {
          if (!(N = k.transform(w.css)))
            return function() {
            };
          w.css = N;
        }
        if (k.singleton) {
          var V = h++;
          E = d || (d = S(k)), M = C.bind(null, E, V, !1), A = C.bind(null, E, V, !0);
        } else
          w.sourceMap && typeof URL == "function" && typeof URL.createObjectURL == "function" && typeof URL.revokeObjectURL == "function" && typeof Blob == "function" && typeof btoa == "function" ? (E = function(z) {
            var be = document.createElement("link");
            return z.attrs.type === void 0 && (z.attrs.type = "text/css"), z.attrs.rel = "stylesheet", v(be, z.attrs), B(z, be), be;
          }(k), M = L.bind(null, E, k), A = function() {
            T(E), E.href && URL.revokeObjectURL(E.href);
          }) : (E = S(k), M = x.bind(null, E), A = function() {
            T(E);
          });
        return M(w), function(z) {
          if (z) {
            if (z.css === w.css && z.media === w.media && z.sourceMap === w.sourceMap)
              return;
            M(w = z);
          } else
            A();
        };
      }
      t.exports = function(w, k) {
        if (typeof DEBUG < "u" && DEBUG && typeof document != "object")
          throw new Error("The style-loader cannot be used in a non-browser environment");
        (k = k || {}).attrs = typeof k.attrs == "object" ? k.attrs : {}, k.singleton || typeof k.singleton == "boolean" || (k.singleton = l()), k.insertInto || (k.insertInto = "head"), k.insertAt || (k.insertAt = "bottom");
        var E = _(w, k);
        return g(E, k), function(M) {
          for (var A = [], N = 0; N < E.length; N++) {
            var V = E[N];
            (z = a[V.id]).refs--, A.push(z);
          }
          for (M && g(_(M, k), k), N = 0; N < A.length; N++) {
            var z;
            if ((z = A[N]).refs === 0) {
              for (var be = 0; be < z.parts.length; be++)
                z.parts[be]();
              delete a[z.id];
            }
          }
        };
      };
      var I, P = (I = [], function(w, k) {
        return I[w] = k, I.filter(Boolean).join(`
`);
      });
      function C(w, k, E, M) {
        var A = E ? "" : M.css;
        if (w.styleSheet)
          w.styleSheet.cssText = P(k, A);
        else {
          var N = document.createTextNode(A), V = w.childNodes;
          V[k] && w.removeChild(V[k]), V.length ? w.insertBefore(N, V[k]) : w.appendChild(N);
        }
      }
      function x(w, k) {
        var E = k.css, M = k.media;
        if (M && w.setAttribute("media", M), w.styleSheet)
          w.styleSheet.cssText = E;
        else {
          for (; w.firstChild; )
            w.removeChild(w.firstChild);
          w.appendChild(document.createTextNode(E));
        }
      }
      function L(w, k, E) {
        var M = E.css, A = E.sourceMap, N = k.convertToAbsoluteUrls === void 0 && A;
        (k.convertToAbsoluteUrls || N) && (M = p(M)), A && (M += `
/*# sourceMappingURL=data:application/json;base64,` + btoa(unescape(encodeURIComponent(JSON.stringify(A)))) + " */");
        var V = new Blob([M], { type: "text/css" }), z = w.href;
        w.href = URL.createObjectURL(V), z && URL.revokeObjectURL(z);
      }
    }, function(t, n) {
      t.exports = function(i) {
        var r = typeof window < "u" && window.location;
        if (!r)
          throw new Error("fixUrls requires window.location");
        if (!i || typeof i != "string")
          return i;
        var s = r.protocol + "//" + r.host, a = s + r.pathname.replace(/\/[^\/]*$/, "/");
        return i.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(l, c) {
          var u, d = c.trim().replace(/^"(.*)"$/, function(h, f) {
            return f;
          }).replace(/^'(.*)'$/, function(h, f) {
            return f;
          });
          return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(d) ? l : (u = d.indexOf("//") === 0 ? d : d.indexOf("/") === 0 ? s + d : a + d.replace(/^\.\//, ""), "url(" + JSON.stringify(u) + ")");
        });
      };
    }, function(t, n, i) {
      i.r(n), i.d(n, "default", function() {
        return a;
      }), i(0);
      function r(l) {
        return (r = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(c) {
          return typeof c;
        } : function(c) {
          return c && typeof Symbol == "function" && c.constructor === Symbol && c !== Symbol.prototype ? "symbol" : typeof c;
        })(l);
      }
      function s(l, c) {
        for (var u = 0; u < c.length; u++) {
          var d = c[u];
          d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(l, d.key, d);
        }
      }
      /**
       * Header block for the Editor.js.
       *
       * @author CodeX (team@ifmo.su)
       * @copyright CodeX 2018
       * @license MIT
       * @version 2.0.0
       */
      var a = function() {
        function l(h) {
          var f = h.data, p = h.config, g = h.api, _ = h.readOnly;
          (function(B, T) {
            if (!(B instanceof T))
              throw new TypeError("Cannot call a class as a function");
          })(this, l), this.api = g, this.readOnly = _, this._CSS = { block: this.api.styles.block, wrapper: "ce-header" }, this._settings = p, this._data = this.normalizeData(f), this._element = this.getTag();
        }
        var c, u, d;
        return c = l, d = [{ key: "conversionConfig", get: function() {
          return { export: "text", import: "text" };
        } }, { key: "sanitize", get: function() {
          return { level: !1, text: {} };
        } }, { key: "isReadOnlySupported", get: function() {
          return !0;
        } }, { key: "pasteConfig", get: function() {
          return { tags: ["H1", "H2", "H3", "H4", "H5", "H6"] };
        } }, { key: "toolbox", get: function() {
          return { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 7L9 12M9 17V12M9 12L15 12M15 7V12M15 17L15 12"/></svg>', title: "Heading" };
        } }], (u = [{ key: "normalizeData", value: function(h) {
          var f = {};
          return r(h) !== "object" && (h = {}), f.text = h.text || "", f.level = parseInt(h.level) || this.defaultLevel.number, f;
        } }, { key: "render", value: function() {
          return this._element;
        } }, { key: "renderSettings", value: function() {
          var h = this;
          return this.levels.map(function(f) {
            return { icon: f.svg, label: h.api.i18n.t("Heading ".concat(f.number)), onActivate: function() {
              return h.setLevel(f.number);
            }, closeOnActivate: !0, isActive: h.currentLevel.number === f.number };
          });
        } }, { key: "setLevel", value: function(h) {
          this.data = { level: h, text: this.data.text };
        } }, { key: "merge", value: function(h) {
          var f = { text: this.data.text + h.text, level: this.data.level };
          this.data = f;
        } }, { key: "validate", value: function(h) {
          return h.text.trim() !== "";
        } }, { key: "save", value: function(h) {
          return { text: h.innerHTML, level: this.currentLevel.number };
        } }, { key: "getTag", value: function() {
          var h = document.createElement(this.currentLevel.tag);
          return h.innerHTML = this._data.text || "", h.classList.add(this._CSS.wrapper), h.contentEditable = this.readOnly ? "false" : "true", h.dataset.placeholder = this.api.i18n.t(this._settings.placeholder || ""), h;
        } }, { key: "onPaste", value: function(h) {
          var f = h.detail.data, p = this.defaultLevel.number;
          switch (f.tagName) {
            case "H1":
              p = 1;
              break;
            case "H2":
              p = 2;
              break;
            case "H3":
              p = 3;
              break;
            case "H4":
              p = 4;
              break;
            case "H5":
              p = 5;
              break;
            case "H6":
              p = 6;
          }
          this._settings.levels && (p = this._settings.levels.reduce(function(g, _) {
            return Math.abs(_ - p) < Math.abs(g - p) ? _ : g;
          })), this.data = { level: p, text: f.innerHTML };
        } }, { key: "data", get: function() {
          return this._data.text = this._element.innerHTML, this._data.level = this.currentLevel.number, this._data;
        }, set: function(h) {
          if (this._data = this.normalizeData(h), h.level !== void 0 && this._element.parentNode) {
            var f = this.getTag();
            f.innerHTML = this._element.innerHTML, this._element.parentNode.replaceChild(f, this._element), this._element = f;
          }
          h.text !== void 0 && (this._element.innerHTML = this._data.text || "");
        } }, { key: "currentLevel", get: function() {
          var h = this, f = this.levels.find(function(p) {
            return p.number === h._data.level;
          });
          return f || (f = this.defaultLevel), f;
        } }, { key: "defaultLevel", get: function() {
          var h = this;
          if (this._settings.defaultLevel) {
            var f = this.levels.find(function(p) {
              return p.number === h._settings.defaultLevel;
            });
            if (f)
              return f;
            console.warn("(ง'̀-'́)ง Heading Tool: the default level specified was not found in available levels");
          }
          return this.levels[1];
        } }, { key: "levels", get: function() {
          var h = this, f = [{ number: 1, tag: "H1", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M19 17V10.2135C19 10.1287 18.9011 10.0824 18.836 10.1367L16 12.5"/></svg>' }, { number: 2, tag: "H2", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 11C16 10 19 9.5 19 12C19 13.9771 16.0684 13.9997 16.0012 16.8981C15.9999 16.9533 16.0448 17 16.1 17L19.3 17"/></svg>' }, { number: 3, tag: "H3", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 11C16 10.5 16.8323 10 17.6 10C18.3677 10 19.5 10.311 19.5 11.5C19.5 12.5315 18.7474 12.9022 18.548 12.9823C18.5378 12.9864 18.5395 13.0047 18.5503 13.0063C18.8115 13.0456 20 13.3065 20 14.8C20 16 19.5 17 17.8 17C17.8 17 16 17 16 16.3"/></svg>' }, { number: 4, tag: "H4", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M18 10L15.2834 14.8511C15.246 14.9178 15.294 15 15.3704 15C16.8489 15 18.7561 15 20.2 15M19 17C19 15.7187 19 14.8813 19 13.6"/></svg>' }, { number: 5, tag: "H5", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 15.9C16 15.9 16.3768 17 17.8 17C19.5 17 20 15.6199 20 14.7C20 12.7323 17.6745 12.0486 16.1635 12.9894C16.094 13.0327 16 12.9846 16 12.9027V10.1C16 10.0448 16.0448 10 16.1 10H19.8"/></svg>' }, { number: 6, tag: "H6", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M19.5 10C16.5 10.5 16 13.3285 16 15M16 15V15C16 16.1046 16.8954 17 18 17H18.3246C19.3251 17 20.3191 16.3492 20.2522 15.3509C20.0612 12.4958 16 12.6611 16 15Z"/></svg>' }];
          return this._settings.levels ? f.filter(function(p) {
            return h._settings.levels.includes(p.number);
          }) : f;
        } }]) && s(c.prototype, u), d && s(c, d), l;
      }();
    }]).default;
  });
})(da);
var Jh = da.exports;
const Qh = /* @__PURE__ */ Jr(Jh);
function ep() {
  return localStorage.getItem("productTour_seen") == "true";
}
function _r() {
  localStorage.setItem("productTour_seen", "true");
}
function ua(o, e) {
  const t = new Ue.Tour({
    useModalOverlay: (e == null ? void 0 : e.useModalOverlay) ?? !0,
    defaultStepOptions: {
      cancelIcon: {
        enabled: !1
      },
      scrollTo: {
        behavior: "smooth",
        block: "center"
      }
    }
  });
  return t.addSteps(o || D.steps), t;
}
function ha(o) {
  D.newStep.activeElement = o;
  const e = new Ue.Tour({
    useModalOverlay: !0,
    defaultStepOptions: {
      cancelIcon: {
        enabled: !0
      }
    }
  }), t = D.newStep.activeType;
  let n, i, r = {
    element: (o == null ? void 0 : o.tagName) + "[data-untitled-tour]",
    on: "top"
  };
  t === "text" ? (n = `
            <div style="width: 100%" v-scope="TitleInput()" />
            <div style="width: 100%" v-scope="PositionInput()" />
        `, i = '<div v-scope="ContentInput()" style="margin-top: 8px" />') : t === "image" ? (n = '<div v-scope="PositionInput()"></div><br />', i = '<div v-scope="ImageInput()" />') : t === "video" ? (n = '<div v-scope="PositionInput()"></div><br />', i = '<div v-scope="VideoInput()" />') : t === "banner" && (i = '<div v-scope="BannerInput()" />', r = void 0), e.addStep({
    id: "new-step",
    attachTo: r,
    title: n,
    text: i,
    buttons: [
      {
        text: "Done",
        action() {
          t === "image" ? yr().addImageStep() : t === "video" ? kr().addVideoStep() : D.addNewStep(t === "banner");
        }
      }
    ]
  }), ["complete", "cancel"].forEach(
    (s) => e.on(s, () => {
      o == null || o.removeAttribute("data-untitled-tour"), D.newStep.title = "", D.newStep.content = "", D.newStep.activeType = "", D.newStep.position = "top", D.newStep.activeElement = null, D.newStep.mediaURL = "";
    })
  ), e.start(), Ar({
    // Global Store
    store: D,
    // Components
    TitleInput: Yc,
    ContentInput: Xc,
    ImageInput: yr,
    VideoInput: kr,
    BannerInput: hu,
    PositionInput: pu
  }).mount(".shepherd-content"), t === "banner" && (D.newStep.activeEditor = new Zh({
    holder: "banner-editor",
    tools: {
      header: Qh
    },
    data: {
      time: 1688887516724,
      blocks: [
        {
          id: "2dCwuxRaLF",
          type: "header",
          data: {
            text: "Heading",
            level: 2
          }
        },
        {
          id: "d8pXsELxxG",
          type: "paragraph",
          data: {
            text: "Paragraph"
          }
        }
      ],
      version: "2.27.1"
    }
  }));
}
function Or(o, e = !1, t) {
  const n = o, i = n.map((s, a) => {
    const l = [];
    l.push({
      text: "Skip",
      secondary: !0,
      classes: "untitled_skip-button",
      action() {
        this.cancel();
        const d = new CustomEvent("stepChanged", {
          detail: 0
        });
        window.dispatchEvent(d), _r();
      }
    }), a !== 0 && l.push({
      text: `<div class='untitled_flex-side'">
                <div class="untitled_flex-side">
                    <svg fill="none" stroke="currentColor" stroke-width="2.5" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                    </svg>
                </div>
                <div>Prev</div>
                `,
      secondary: !0,
      action() {
        this.back();
        const d = new CustomEvent("stepChanged", {
          detail: a
        });
        window.dispatchEvent(d);
      }
    }), l.push({
      text: a !== n.length - 1 ? `<div class='untitled_flex-side'><div>Next</div><div class="untitled_flex-side">
                            <svg fill="none" stroke="currentColor" stroke-width="2.5" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                            </svg>
                        </div>
                        </div>` : "Finish</div>",
      action() {
        this.next();
        const d = new CustomEvent("stepChanged", {
          detail: a + 1 !== n.length ? a + 2 : 0
        });
        window.dispatchEvent(d), a === n.length - 1 && _r();
      }
    });
    let c = null;
    s.xpath && (c = ka(s.xpath), c ? c.setAttribute(`data-tour-step-${a}`, "") : console.warn("Could not locate element for xpath", s.xpath));
    const u = getComputedStyle(
      // @ts-ignore
      document.querySelector(":root")
    ).getPropertyValue("--tour-theme");
    return {
      ...s,
      index: a,
      buttons: l,
      // @ts-ignore
      title: `
            <div class="untitled_flex-between" style="width: 100%">
                <h3>Step ${a + 1}</h3>
                ${D.isPro ? "" : `
                    <a href="https://buildoor.xyz" target="_blank" class="untitled_center" style="margin-bottom: 7px">
                        <img src="https://product-tour-dist.vercel.app/Watermark${u}.png" style="max-width: 120px" />
                    </a>
                    `}
            </div>
            `,
      text: `<h3>${s.title}</h3>` + s.text + "<div style='margin-top: 4rem'></div>",
      attachTo: c ? {
        element: c.tagName.toLowerCase() + `[data-tour-step-${a}]`,
        on: s.position ?? "top"
      } : void 0
    };
  });
  D.steps = i;
  const r = ua(i, t);
  if (window.ProductTour.restart = r.start, window.ProductTour.tour = r, e) {
    const s = new CustomEvent("stepChanged", {
      detail: 1
    });
    window.dispatchEvent(s), r.start();
  }
  return r;
}
function tp(o) {
  D.newStep.activeType = o;
  const e = (t) => {
    t.key === "Escape" && (D.setEditMode(!1), window.removeEventListener("keydown", e));
  };
  window.addEventListener("keydown", e), o !== "banner" ? D.setEditMode(!0) : ha();
}
const op = ["HTML", "BODY"];
function np(o = !1) {
  o ? (document.addEventListener("click", Oi, !0), document.addEventListener("mousemove", Ir), document.addEventListener("mouseleave", Ii, !0)) : (document.removeEventListener("click", Oi, !0), document.removeEventListener("mousemove", Ir), document.removeEventListener("mouseleave", Ii, !0));
}
function Ir(o) {
  var n;
  const e = o.target;
  if ((n = document.getElementById("untitled-main")) != null && n.contains(e))
    return;
  const t = document.getElementById("label");
  o.stopPropagation(), t.style.left = o.x + 15 + "px", t.style.top = o.y + 15 + "px", e && !op.includes(e.tagName) ? (D.setHovered(e), ip(e)) : t.style.display = "none";
}
function ip(o) {
  if (o) {
    let e = function(n) {
      D.editMode ? (n.stopPropagation(), D.selected && D.selected.classList.remove("untitled_selected"), D.setSelected(o), o.classList.remove("hovered"), o.classList.add("untitled_selected"), o.setAttribute("data-untitled-tour", ""), D.setEditMode(!1), ha(o)) : o.removeEventListener("click", e);
    };
    const t = document.getElementById("label");
    t.style.display = "block", o.addEventListener("click", e);
  }
}
function rp(o) {
  const e = document.getElementById(o);
  e ? new H(e, {
    animation: 200,
    onUpdate(t) {
      ma(D.steps, t.oldIndex, t.newIndex);
    }
  }) : console.warn("Unable to set up drag-and-drop sorting for tour steps");
}
function sp() {
  return {
    $template: "#footer",
    loading: !1,
    message: "",
    timeout: null,
    async saveSteps() {
      try {
        this.loading = !0, await uu(D.accessToken, D.tourId, D.steps), this.message = "Saved", this.timeout && clearTimeout(this.timeout), this.timeout = setTimeout(() => {
          this.message = "";
        }, 2e3), this.loading = !1;
      } catch (o) {
        this.loading = !1, this.message = "Error", this.timeout && clearTimeout(this.timeout), this.timeout = setTimeout(() => {
          this.message = "";
        }, 2e3), console.error("Error while saving.", o);
      }
    }
  };
}
async function ap(o, e) {
  const t = await fetch(jt + "/user", {
    headers: {
      Authorization: (e ? "web3 " : "web2 ") + o
    }
  });
  if (t.status === 400)
    throw console.error("Unauthorized for Admin Mode"), new Error("Unauthorized for Admin Mode");
  return await t.json();
}
function lp(o) {
  const e = document.querySelector(":root");
  for (const t of o)
    t.id === "colorMode" && (t.value === "light" ? (e.style.setProperty("--tour-theme", "Light"), e.style.setProperty("--tour-secondaryTextColor", "#00000f"), e.style.setProperty("--tour-background", "white"), e.style.setProperty("--tour-foreground", "#00000f"), e.style.setProperty("--tour-subtitleColor", "#6b7280")) : t.value === "dark" && (e.style.setProperty("--tour-theme", "Dark"), e.style.setProperty("--tour-secondaryTextColor", "white"), e.style.setProperty("--tour-background", "#00000f"), e.style.setProperty("--tour-foreground", "white"), e.style.setProperty("--tour-subtitleColor", "#9ca3af"), e.style.setProperty("--tour-arrowFilter", "invert()"))), e.style.setProperty("--tour-" + t.id, t.value);
}
window.ProductTour = {
  init: Gn,
  restart: null,
  step: -1
};
window.addEventListener("stepChanged", (o) => {
  window.ProductTour.step = o.detail;
});
function Gn(o) {
  const e = document.createElement("link");
  e.rel = "stylesheet", e.href = cu;
  const t = document.head;
  t ? t.appendChild(e) : document.body.appendChild(e);
  const n = o || window.ProductTourID;
  if (console.log("Initializing Product Tour for Project ", n), !n) {
    console.warn("ProductTour: No project ID found");
    return;
  }
  const i = document.createElement("div");
  i.id = "untitled-app", i.innerHTML = `
      <div id="untitled-main" v-scope="Footer()">
      </div>

      <template id="footer">
          <footer class="untitled_footer" v-show="store.adminMode">
              <div class="top untitled_flex-side">
                  <div class="untitled_step-card-add">
                    <div class="untitled_grid-4x4" style="height: 8rem" v-if="!store.editMode">
                        <div title="Text" class="untitled_insert-card untitled_center" @click="beginEdit('text')">
                          <svg viewBox="0 0 24 24" width="24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 3H8C6.11438 3 5.17157 3 4.58579 3.58579C4 4.17157 4 5.11438 4 7V7.95M12 3H16C17.8856 3 18.8284 3 19.4142 3.58579C20 4.17157 20 5.11438 20 7V7.95M12 3V8M12 21V12" stroke="#404040" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7 21H17" stroke="#404040" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        </div>
                        <div title="Centered Banner" class="untitled_insert-card untitled_center" @click="beginEdit('banner')">
                          <svg viewBox="0 0 16 16" width="32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#404040" d="M3 6h2v1h-2v-1z"></path> <path fill="#404040" d="M6 6h7v1h-7v-1z"></path> <path fill="#404040" d="M3 8h2v1h-2v-1z"></path> <path fill="#404040" d="M6 8h7v1h-7v-1z"></path> <path fill="#404040" d="M3 10h2v1h-2v-1z"></path> <path fill="#404040" d="M6 10h7v1h-7v-1z"></path> <path fill="#404040" d="M0 1v14h16v-14h-16zM15 14h-14v-10h14v10zM15 3h-1v-1h1v1z"></path> </g></svg>
                        </div>
                        <div title="Image" class="untitled_insert-card untitled_center" @click="beginEdit('image')">
                          <svg viewBox="0 0 32 32" width="24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">  <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-360.000000, -99.000000)" fill="#404040"> <path d="M368,109 C366.896,109 366,108.104 366,107 C366,105.896 366.896,105 368,105 C369.104,105 370,105.896 370,107 C370,108.104 369.104,109 368,109 L368,109 Z M368,103 C365.791,103 364,104.791 364,107 C364,109.209 365.791,111 368,111 C370.209,111 372,109.209 372,107 C372,104.791 370.209,103 368,103 L368,103 Z M390,116.128 L384,110 L374.059,120.111 L370,116 L362,123.337 L362,103 C362,101.896 362.896,101 364,101 L388,101 C389.104,101 390,101.896 390,103 L390,116.128 L390,116.128 Z M390,127 C390,128.104 389.104,129 388,129 L382.832,129 L375.464,121.535 L384,112.999 L390,118.999 L390,127 L390,127 Z M364,129 C362.896,129 362,128.104 362,127 L362,126.061 L369.945,118.945 L380.001,129 L364,129 L364,129 Z M388,99 L364,99 C361.791,99 360,100.791 360,103 L360,127 C360,129.209 361.791,131 364,131 L388,131 C390.209,131 392,129.209 392,127 L392,103 C392,100.791 390.209,99 388,99 L388,99 Z" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
                        </div>
                        <div title="Video" class="untitled_insert-card untitled_center" @click="beginEdit('video')">
                          <svg viewBox="0 0 24 24" width="32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.5617 7C19.7904 5.69523 18.7863 4.5 17.4617 4.5H6.53788C5.21323 4.5 4.20922 5.69523 4.43784 7" stroke="#404040" stroke-width="1.104"></path> <path d="M17.4999 4.5C17.5283 4.24092 17.5425 4.11135 17.5427 4.00435C17.545 2.98072 16.7739 2.12064 15.7561 2.01142C15.6497 2 15.5194 2 15.2588 2H8.74099C8.48035 2 8.35002 2 8.24362 2.01142C7.22584 2.12064 6.45481 2.98072 6.45704 4.00434C6.45727 4.11135 6.47146 4.2409 6.49983 4.5" stroke="#404040" stroke-width="1.104"></path> <path d="M21.1935 16.793C20.8437 19.2739 20.6689 20.5143 19.7717 21.2572C18.8745 22 17.5512 22 14.9046 22H9.09536C6.44881 22 5.12553 22 4.22834 21.2572C3.33115 20.5143 3.15626 19.2739 2.80648 16.793L2.38351 13.793C1.93748 10.6294 1.71447 9.04765 2.66232 8.02383C3.61017 7 5.29758 7 8.67239 7H15.3276C18.7024 7 20.3898 7 21.3377 8.02383C22.0865 8.83268 22.1045 9.98979 21.8592 12" stroke="#404040" stroke-width="1.104" stroke-linecap="round"></path> <path d="M14.5812 13.6159C15.1396 13.9621 15.1396 14.8582 14.5812 15.2044L11.2096 17.2945C10.6669 17.6309 10 17.1931 10 16.5003L10 12.32C10 11.6273 10.6669 11.1894 11.2096 11.5258L14.5812 13.6159Z" stroke="#404040" stroke-width="1.104"></path> </g></svg>
                        </div>
                        <!-- Plus Icon -->
                        <svg class="untitled_centered-icon" fill="#bbb" viewBox="0 0 20 20" width="30" height="30" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                          <path clip-rule="evenodd" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"></path>
                        </svg>
                    </div>
                    <div class="untitled_center" style="height: 8rem" @click="store.setEditMode(false)" v-else>
                      <svg fill="#bbb" viewBox="0 0 20 20" width="30" height="30" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z"></path>
                      </svg>
                      <p style="text-align: center;">
                        <span style="color: #aaa;">Select Element</span><br />
                        <span style="color: #ccc;">(Press ESC or Click again to Cancel)</span>
                      </p>
                    </div>
                  </div>
                  <div class="untitled_steps" id="untitled-steps">
                    <div v-for="step in store.steps" :key="step.id" class="untitled_step-card">
                      <div class="untitled_flex-between">
                        <div></div>
                        <div class="remove-button" style="cursor: pointer;" @click="store.removeStep(step)">
                          <svg fill="red" viewBox="0 0 20 20" width="14" height="14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"></path>
                          </svg>
                        </div>
                      </div>

                      <template v-if="step.type === 'text'">
                        <p class="untitled_heading">{{ step.title }}</p>
                        <p style="color: #303030">
                        {{ step.text }}
                        </p>
                        </template>
                        <template v-else-if="step.type='image'">
                            <p class="untitled_heading">{{ step.title }}</p>
                            <div v-html="step.text"></div>
                        </template>
                    </div>
                  </div>
              </div>
              <div class="bottom untitled_flex-between">
                  <div class="untitled_flex-side">
                    <img src="https://product-tour-dashboard.vercel.app/logo_white.png" height="24" />
                  </div>
                  <div class="untitled_flex-side">
                      <p style="font-size: 0.68rem">{{ message }}</p>
                      <button class="untitled_secondary-button" @click="saveSteps" :disabled="loading">{{loading ? "Saving..." : "Save"}}</button>
                  </div>
              </div>
          </footer>
          <p v-show="store.editMode && store.hovered" id="label">
              <span>{{store.hovered?.tagName}}</span>
              <span style="color: #ddd">
                  {{store.hovered?.id ? " #" + store.hovered.id : ""}}
              </span>
              <span v-if="store.hovered?.className.replace" style="color: #ddd">
                  {{store.hovered?.className.replace("untitled_selected", "")
                  ? " ." + store.hovered?.className.replace("untitled_selected", "")
                  : ""}}
              </span>
          </p>
      </template>

      <template id="position-input">
      Position:
        <select v-model="store.newStep.position">
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
      </template>
      <template id="title-input">
        <input type="text" v-model="store.newStep.title" class="untitled_title-input" placeholder="Title" tabindex="1" style="margin: 12px 0 0" @vue:mounted="this.focus()" />
      </template>
      <template id="content-input">
        <textarea v-model="store.newStep.content" class="untitled_content-input" placeholder="Content" tabindex="2" style="margin: 21px 0 42px"></textarea>
      </template>
      <template id="banner-input">
        <div id="banner-editor" class="untitled_editor-container" style="margin-bottom: 42px">
        </div>
      </template>
      <template id="image-input">
        <input type="text" v-model="store.newStep.title" class="untitled_title-input" placeholder="Title*" tabindex="1" @vue:mounted="this.focus()" style="margin-bottom: 1rem" />
        <textarea v-model="store.newStep.content" class="untitled_content-input" placeholder="Content" tabindex="2" style="margin-bottom: 1rem"></textarea>
        <img v-if="store.newStep.mediaURL" :src="store.newStep.mediaURL" style="width: 100%" />
        <label for="file-input-image" class="untitled_image-input-label" style="margin-top: 1rem">
          SELECT IMAGE
        </label>
        <input id="file-input-image" type="file" accept="image/*" style="display: none" @change="uploadImage" />
        <div v-if="uploadProgress > 0" style="margin-top: 10px;">
          <p>Uploading...</p>
          <progress max="100" :value="uploadProgress" style="width: 100%;"></progress>
        </div>
        <div style="margin-bottom: 3rem"></div>
      </template>
      <template id="video-input">
        <input type="text" v-model="store.newStep.title" class="untitled_title-input" placeholder="Title*" tabindex="1" @vue:mounted="this.focus()" style="margin-bottom: 1rem" />
        <textarea v-model="store.newStep.content" class="untitled_content-input" placeholder="Content" tabindex="2" style="margin-bottom: 1rem"></textarea>
        <video v-if="store.newStep.mediaURL" style="width: 100%" controls>
          <source :src="store.newStep.mediaURL">
          Your browser does not support the video tag.
        </video>
        <label for="file-input-image" class="untitled_image-input-label" style="margin-top: 1rem">
          SELECT VIDEO
        </label>
        <input id="file-input-image" type="file" accept="video/*" style="display: none" @change="uploadVideo" />
        <div v-if="uploadProgress > 0" style="margin-top: 10px;">
          <p>Uploading...</p>
          <progress max="100" :value="uploadProgress" style="width: 100%;"></progress>
        </div>
        <div style="margin-bottom: 3rem"></div>
      </template>
`, document.body.append(i);
  async function r() {
    var u;
    if (!n)
      return;
    D.projectId = n;
    const s = new URLSearchParams(window.location.search), a = s.get("tourToken"), l = s.get("tourId"), c = s.get("is_web3") === "true";
    if (a && a.length > 0) {
      if (D.accessToken = a, D.tourId = l, D.isWeb3 = c, !l)
        return;
      ap(a, c).then(async () => {
        const d = await du(l);
        d && D.setSteps(d), D.setAdminMode(!0);
      }).catch(() => {
        console.error("Unable to validate access token");
      });
    } else {
      const d = await Ns(n);
      if (D.isPro = d.is_pro, !d || !d.steps)
        return;
      lp(JSON.parse(d.theme.details));
      const h = Or(d.steps, !1, {
        useModalOverlay: ((u = JSON.parse(d.theme.details).find(
          (f) => f.id === "modalOverlay"
        )) == null ? void 0 : u.value) ?? !0
      });
      if (!ep()) {
        const f = new CustomEvent("stepChanged", {
          detail: 1
        });
        window.dispatchEvent(f), h.start(), ["complete", "cancel"].forEach(
          (p) => h.on(p, async () => {
            try {
              await Ls.patch(
                jt + "/visitor/" + d.id,
                {
                  step_end: window.ProductTour.step,
                  steps_total: h.steps.length,
                  is_complete: window.ProductTour.step == h.steps.length
                }
              );
            } catch (g) {
              console.error(
                "Failed to send tour closure information",
                g
              );
            }
          })
        );
      }
    }
    Ar({
      // Global Store
      store: D,
      // Functions
      parseSteps: Or,
      beginEdit: tp,
      setupTour: ua,
      // Components
      Footer: sp
    }).mount("#untitled-main"), rp("untitled-steps");
  }
  r();
}
document.readyState === "complete" ? Gn() : window.addEventListener("load", () => Gn());
