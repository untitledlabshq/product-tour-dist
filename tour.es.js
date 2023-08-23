var qr = Object.defineProperty;
var Jr = (n, t, e) => t in n ? qr(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var Ho = (n, t, e) => (Jr(n, typeof t != "symbol" ? t + "" : t, e), e);
import { reactive as Qr, createApp as Ri } from "https://unpkg.com/petite-vue?module";
function $n(n) {
  n.preventDefault();
}
function Wn(n) {
  n.stopPropagation();
}
function ts(n, t, e) {
  if (e >= n.length)
    for (var o = e - n.length + 1; o--; )
      n.push(void 0);
  n.splice(e, 0, n.splice(t, 1)[0]);
}
const es = function(n, t) {
  if (n.nodeType === Node.DOCUMENT_NODE)
    return "/";
  const e = [];
  let o = n;
  for (; o; ) {
    const i = os(o, t);
    if (!i || (e.push(i), i.optimized))
      break;
    o = o.parentNode;
  }
  return e.reverse(), (e.length && e[0].optimized ? "" : "/") + e.join("/");
}, os = function(n, t) {
  let e;
  const o = ns(n);
  if (o === -1)
    return null;
  switch (n.nodeType) {
    case Node.ELEMENT_NODE:
      if (t && n.getAttribute("id"))
        return new Xn(
          '//*[@id="' + n.getAttribute("id") + '"]',
          !0
        );
      e = n.localName;
      break;
    case Node.ATTRIBUTE_NODE:
      e = "@" + n.nodeName;
      break;
    case Node.TEXT_NODE:
    case Node.CDATA_SECTION_NODE:
      e = "text()";
      break;
    case Node.PROCESSING_INSTRUCTION_NODE:
      e = "processing-instruction()";
      break;
    case Node.COMMENT_NODE:
      e = "comment()";
      break;
    case Node.DOCUMENT_NODE:
      e = "";
      break;
    default:
      e = "";
      break;
  }
  return o > 0 && (e += "[" + o + "]"), new Xn(e, n.nodeType === Node.DOCUMENT_NODE);
}, ns = function(n) {
  function t(r, s) {
    if (r === s)
      return !0;
    if (r.nodeType === Node.ELEMENT_NODE && s.nodeType === Node.ELEMENT_NODE)
      return r.localName === s.localName;
    if (r.nodeType === s.nodeType)
      return !0;
    const a = r.nodeType === Node.CDATA_SECTION_NODE ? Node.TEXT_NODE : r.nodeType, l = s.nodeType === Node.CDATA_SECTION_NODE ? Node.TEXT_NODE : s.nodeType;
    return a === l;
  }
  const e = n.parentNode ? n.parentNode.children : null;
  if (!e)
    return 0;
  let o;
  for (let r = 0; r < e.length; ++r)
    if (t(n, e[r]) && e[r] !== n) {
      o = !0;
      break;
    }
  if (!o)
    return 0;
  let i = 1;
  for (let r = 0; r < e.length; ++r)
    if (t(n, e[r])) {
      if (e[r] === n)
        return i;
      ++i;
    }
  return -1;
}, Xn = class {
  /**
   * @param {string} value
   * @param {boolean} optimized
   */
  constructor(t, e) {
    Ho(this, "value", "");
    Ho(this, "optimized", !1);
    this.value = t, this.optimized = e || !1;
  }
  /**
   * @override
   * @return {string}
   */
  toString() {
    return this.value;
  }
};
function is(n) {
  return es(n, !1);
}
function rs(n) {
  return document.evaluate(
    n,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}
/*! shepherd.js 11.1.1 */
var ss = function(t) {
  return as(t) && !ls(t);
};
function as(n) {
  return !!n && typeof n == "object";
}
function ls(n) {
  var t = Object.prototype.toString.call(n);
  return t === "[object RegExp]" || t === "[object Date]" || hs(n);
}
var cs = typeof Symbol == "function" && Symbol.for, ds = cs ? Symbol.for("react.element") : 60103;
function hs(n) {
  return n.$$typeof === ds;
}
function us(n) {
  return Array.isArray(n) ? [] : {};
}
function Xe(n, t) {
  return t.clone !== !1 && t.isMergeableObject(n) ? Ce(us(n), n, t) : n;
}
function ps(n, t, e) {
  return n.concat(t).map(function(o) {
    return Xe(o, e);
  });
}
function fs(n, t) {
  if (!t.customMerge)
    return Ce;
  var e = t.customMerge(n);
  return typeof e == "function" ? e : Ce;
}
function gs(n) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(n).filter(function(t) {
    return Object.propertyIsEnumerable.call(n, t);
  }) : [];
}
function Kn(n) {
  return Object.keys(n).concat(gs(n));
}
function Pi(n, t) {
  try {
    return t in n;
  } catch {
    return !1;
  }
}
function ms(n, t) {
  return Pi(n, t) && !(Object.hasOwnProperty.call(n, t) && Object.propertyIsEnumerable.call(n, t));
}
function bs(n, t, e) {
  var o = {};
  return e.isMergeableObject(n) && Kn(n).forEach(function(i) {
    o[i] = Xe(n[i], e);
  }), Kn(t).forEach(function(i) {
    ms(n, i) || (Pi(n, i) && e.isMergeableObject(t[i]) ? o[i] = fs(i, e)(n[i], t[i], e) : o[i] = Xe(t[i], e));
  }), o;
}
function Ce(n, t, e) {
  e = e || {}, e.arrayMerge = e.arrayMerge || ps, e.isMergeableObject = e.isMergeableObject || ss, e.cloneUnlessOtherwiseSpecified = Xe;
  var o = Array.isArray(t), i = Array.isArray(n), r = o === i;
  return r ? o ? e.arrayMerge(n, t, e) : bs(n, t, e) : Xe(t, e);
}
Ce.all = function(t, e) {
  if (!Array.isArray(t))
    throw new Error("first argument should be an array");
  return t.reduce(function(o, i) {
    return Ce(o, i, e);
  }, {});
};
var vs = Ce, wn = vs;
function ws(n) {
  return n instanceof Element;
}
function kn(n) {
  return n instanceof HTMLElement;
}
function se(n) {
  return typeof n == "function";
}
function Ke(n) {
  return typeof n == "string";
}
function ct(n) {
  return n === void 0;
}
class yn {
  on(t, e, o, i) {
    return i === void 0 && (i = !1), ct(this.bindings) && (this.bindings = {}), ct(this.bindings[t]) && (this.bindings[t] = []), this.bindings[t].push({
      handler: e,
      ctx: o,
      once: i
    }), this;
  }
  once(t, e, o) {
    return this.on(t, e, o, !0);
  }
  off(t, e) {
    return ct(this.bindings) || ct(this.bindings[t]) ? this : (ct(e) ? delete this.bindings[t] : this.bindings[t].forEach((o, i) => {
      o.handler === e && this.bindings[t].splice(i, 1);
    }), this);
  }
  trigger(t) {
    for (var e = arguments.length, o = new Array(e > 1 ? e - 1 : 0), i = 1; i < e; i++)
      o[i - 1] = arguments[i];
    return !ct(this.bindings) && this.bindings[t] && this.bindings[t].forEach((r, s) => {
      const {
        ctx: a,
        handler: l,
        once: c
      } = r, h = a || this;
      l.apply(h, o), c && this.bindings[t].splice(s, 1);
    }), this;
  }
}
function Fi(n) {
  const t = Object.getOwnPropertyNames(n.constructor.prototype);
  for (let e = 0; e < t.length; e++) {
    const o = t[e], i = n[o];
    o !== "constructor" && typeof i == "function" && (n[o] = i.bind(n));
  }
  return n;
}
function ks(n, t) {
  return (e) => {
    if (t.isOpen()) {
      const o = t.el && e.currentTarget === t.el;
      (!ct(n) && e.currentTarget.matches(n) || o) && t.tour.next();
    }
  };
}
function ys(n) {
  const {
    event: t,
    selector: e
  } = n.options.advanceOn || {};
  if (t) {
    const o = ks(e, n);
    let i;
    try {
      i = document.querySelector(e);
    } catch {
    }
    if (!ct(e) && !i)
      return console.error(`No element was found for the selector supplied to advanceOn: ${e}`);
    i ? (i.addEventListener(t, o), n.on("destroy", () => i.removeEventListener(t, o))) : (document.body.addEventListener(t, o, !0), n.on("destroy", () => document.body.removeEventListener(t, o, !0)));
  } else
    return console.error("advanceOn was defined, but no event name was passed.");
}
function Hi(n) {
  return !Ke(n) || n === "" ? "" : n.charAt(n.length - 1) !== "-" ? `${n}-` : n;
}
function xs(n) {
  const t = n.options.attachTo || {}, e = Object.assign({}, t);
  if (se(e.element) && (e.element = e.element.call(n)), Ke(e.element)) {
    try {
      e.element = document.querySelector(e.element);
    } catch {
    }
    e.element || console.error(`The element for this Shepherd step was not found ${t.element}`);
  }
  return e;
}
function ji(n) {
  return n == null ? !0 : !n.element || !n.on;
}
function xn() {
  let n = Date.now();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (t) => {
    const e = (n + Math.random() * 16) % 16 | 0;
    return n = Math.floor(n / 16), (t == "x" ? e : e & 3 | 8).toString(16);
  });
}
function ht() {
  return ht = Object.assign ? Object.assign.bind() : function(n) {
    for (var t = 1; t < arguments.length; t++) {
      var e = arguments[t];
      for (var o in e)
        Object.prototype.hasOwnProperty.call(e, o) && (n[o] = e[o]);
    }
    return n;
  }, ht.apply(this, arguments);
}
function Ui(n, t) {
  if (n == null)
    return {};
  var e = {}, o = Object.keys(n), i, r;
  for (r = 0; r < o.length; r++)
    i = o[r], !(t.indexOf(i) >= 0) && (e[i] = n[i]);
  return e;
}
const Es = ["mainAxis", "crossAxis", "fallbackPlacements", "fallbackStrategy", "fallbackAxisSideDirection", "flipAlignment"], Ss = ["mainAxis", "crossAxis", "limiter"];
function Oo(n) {
  return n.split("-")[1];
}
function En(n) {
  return n === "y" ? "height" : "width";
}
function ae(n) {
  return n.split("-")[0];
}
function Je(n) {
  return ["top", "bottom"].includes(ae(n)) ? "x" : "y";
}
function Gn(n, t, e) {
  let {
    reference: o,
    floating: i
  } = n;
  const r = o.x + o.width / 2 - i.width / 2, s = o.y + o.height / 2 - i.height / 2, a = Je(t), l = En(a), c = o[l] / 2 - i[l] / 2, h = ae(t), d = a === "x";
  let u;
  switch (h) {
    case "top":
      u = {
        x: r,
        y: o.y - i.height
      };
      break;
    case "bottom":
      u = {
        x: r,
        y: o.y + o.height
      };
      break;
    case "right":
      u = {
        x: o.x + o.width,
        y: s
      };
      break;
    case "left":
      u = {
        x: o.x - i.width,
        y: s
      };
      break;
    default:
      u = {
        x: o.x,
        y: o.y
      };
  }
  switch (Oo(t)) {
    case "start":
      u[a] -= c * (e && d ? -1 : 1);
      break;
    case "end":
      u[a] += c * (e && d ? -1 : 1);
      break;
  }
  return u;
}
const Cs = async (n, t, e) => {
  const {
    placement: o = "bottom",
    strategy: i = "absolute",
    middleware: r = [],
    platform: s
  } = e, a = r.filter(Boolean), l = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let c = await s.getElementRects({
    reference: n,
    floating: t,
    strategy: i
  }), {
    x: h,
    y: d
  } = Gn(c, o, l), u = o, f = {}, p = 0;
  for (let b = 0; b < a.length; b++) {
    const {
      name: O,
      fn: B
    } = a[b], {
      x: _,
      y: E,
      data: v,
      reset: m
    } = await B({
      x: h,
      y: d,
      initialPlacement: o,
      placement: u,
      strategy: i,
      middlewareData: f,
      rects: c,
      platform: s,
      elements: {
        reference: n,
        floating: t
      }
    });
    if (h = _ ?? h, d = E ?? d, f = ht({}, f, {
      [O]: ht({}, f[O], v)
    }), m && p <= 50) {
      p++, typeof m == "object" && (m.placement && (u = m.placement), m.rects && (c = m.rects === !0 ? await s.getElementRects({
        reference: n,
        floating: t,
        strategy: i
      }) : m.rects), {
        x: h,
        y: d
      } = Gn(c, u, l)), b = -1;
      continue;
    }
  }
  return {
    x: h,
    y: d,
    placement: u,
    strategy: i,
    middlewareData: f
  };
};
function Ts(n) {
  return ht({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }, n);
}
function zi(n) {
  return typeof n != "number" ? Ts(n) : {
    top: n,
    right: n,
    bottom: n,
    left: n
  };
}
function ko(n) {
  return ht({}, n, {
    top: n.y,
    left: n.x,
    right: n.x + n.width,
    bottom: n.y + n.height
  });
}
async function Yi(n, t) {
  var e;
  t === void 0 && (t = {});
  const {
    x: o,
    y: i,
    platform: r,
    rects: s,
    elements: a,
    strategy: l
  } = n, {
    boundary: c = "clippingAncestors",
    rootBoundary: h = "viewport",
    elementContext: d = "floating",
    altBoundary: u = !1,
    padding: f = 0
  } = t, p = zi(f), O = a[u ? d === "floating" ? "reference" : "floating" : d], B = ko(await r.getClippingRect({
    element: (e = await (r.isElement == null ? void 0 : r.isElement(O))) == null || e ? O : O.contextElement || await (r.getDocumentElement == null ? void 0 : r.getDocumentElement(a.floating)),
    boundary: c,
    rootBoundary: h,
    strategy: l
  })), _ = d === "floating" ? ht({}, s.floating, {
    x: o,
    y: i
  }) : s.reference, E = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(a.floating)), v = await (r.isElement == null ? void 0 : r.isElement(E)) ? await (r.getScale == null ? void 0 : r.getScale(E)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, m = ko(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: _,
    offsetParent: E,
    strategy: l
  }) : _);
  return {
    top: (B.top - m.top + p.top) / v.y,
    bottom: (m.bottom - B.bottom + p.bottom) / v.y,
    left: (B.left - m.left + p.left) / v.x,
    right: (m.right - B.right + p.right) / v.x
  };
}
const Bs = Math.min, _s = Math.max;
function Qo(n, t, e) {
  return _s(n, Bs(t, e));
}
const Is = (n) => ({
  name: "arrow",
  options: n,
  async fn(t) {
    const {
      element: e,
      padding: o = 0
    } = n || {}, {
      x: i,
      y: r,
      placement: s,
      rects: a,
      platform: l,
      elements: c
    } = t;
    if (e == null)
      return {};
    const h = zi(o), d = {
      x: i,
      y: r
    }, u = Je(s), f = En(u), p = await l.getDimensions(e), b = u === "y", O = b ? "top" : "left", B = b ? "bottom" : "right", _ = b ? "clientHeight" : "clientWidth", E = a.reference[f] + a.reference[u] - d[u] - a.floating[f], v = d[u] - a.reference[u], m = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(e));
    let T = m ? m[_] : 0;
    (!T || !await (l.isElement == null ? void 0 : l.isElement(m))) && (T = c.floating[_] || a.floating[f]);
    const D = E / 2 - v / 2, S = h[O], y = T - p[f] - h[B], A = T / 2 - p[f] / 2 + D, w = Qo(S, A, y), x = Oo(s) != null && A != w && a.reference[f] / 2 - (A < S ? h[O] : h[B]) - p[f] / 2 < 0 ? A < S ? S - A : y - A : 0;
    return {
      [u]: d[u] - x,
      data: {
        [u]: w,
        centerOffset: A - w
      }
    };
  }
}), Ms = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function yo(n) {
  return n.replace(/left|right|bottom|top/g, (t) => Ms[t]);
}
function Os(n, t, e) {
  e === void 0 && (e = !1);
  const o = Oo(n), i = Je(n), r = En(i);
  let s = i === "x" ? o === (e ? "end" : "start") ? "right" : "left" : o === "start" ? "bottom" : "top";
  return t.reference[r] > t.floating[r] && (s = yo(s)), {
    main: s,
    cross: yo(s)
  };
}
const As = {
  start: "end",
  end: "start"
};
function tn(n) {
  return n.replace(/start|end/g, (t) => As[t]);
}
function Ls(n) {
  const t = yo(n);
  return [tn(n), t, tn(t)];
}
function Ns(n, t, e) {
  const o = ["left", "right"], i = ["right", "left"], r = ["top", "bottom"], s = ["bottom", "top"];
  switch (n) {
    case "top":
    case "bottom":
      return e ? t ? i : o : t ? o : i;
    case "left":
    case "right":
      return t ? r : s;
    default:
      return [];
  }
}
function Ds(n, t, e, o) {
  const i = Oo(n);
  let r = Ns(ae(n), e === "start", o);
  return i && (r = r.map((s) => s + "-" + i), t && (r = r.concat(r.map(tn)))), r;
}
const Rs = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var o;
      const {
        placement: i,
        middlewareData: r,
        rects: s,
        initialPlacement: a,
        platform: l,
        elements: c
      } = e, {
        mainAxis: h = !0,
        crossAxis: d = !0,
        fallbackPlacements: u,
        fallbackStrategy: f = "bestFit",
        fallbackAxisSideDirection: p = "none",
        flipAlignment: b = !0
      } = t, O = Ui(t, Es), B = ae(i), _ = ae(a) === a, E = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)), v = u || (_ || !b ? [yo(a)] : Ls(a));
      !u && p !== "none" && v.push(...Ds(a, b, p, E));
      const m = [a, ...v], T = await Yi(e, O), D = [];
      let S = ((o = r.flip) == null ? void 0 : o.overflows) || [];
      if (h && D.push(T[B]), d) {
        const {
          main: k,
          cross: x
        } = Os(i, s, E);
        D.push(T[k], T[x]);
      }
      if (S = [...S, {
        placement: i,
        overflows: D
      }], !D.every((k) => k <= 0)) {
        var y, A;
        const k = (((y = r.flip) == null ? void 0 : y.index) || 0) + 1, x = m[k];
        if (x)
          return {
            data: {
              index: k,
              overflows: S
            },
            reset: {
              placement: x
            }
          };
        let M = (A = S.filter((I) => I.overflows[0] <= 0).sort((I, L) => I.overflows[1] - L.overflows[1])[0]) == null ? void 0 : A.placement;
        if (!M)
          switch (f) {
            case "bestFit": {
              var w;
              const I = (w = S.map((L) => [L.placement, L.overflows.filter((Y) => Y > 0).reduce((Y, U) => Y + U, 0)]).sort((L, Y) => L[1] - Y[1])[0]) == null ? void 0 : w[0];
              I && (M = I);
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
function Vi(n) {
  return n === "x" ? "y" : "x";
}
const Ps = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: o,
        y: i,
        placement: r
      } = e, {
        mainAxis: s = !0,
        crossAxis: a = !1,
        limiter: l = {
          fn: (B) => {
            let {
              x: _,
              y: E
            } = B;
            return {
              x: _,
              y: E
            };
          }
        }
      } = t, c = Ui(t, Ss), h = {
        x: o,
        y: i
      }, d = await Yi(e, c), u = Je(ae(r)), f = Vi(u);
      let p = h[u], b = h[f];
      if (s) {
        const B = u === "y" ? "top" : "left", _ = u === "y" ? "bottom" : "right", E = p + d[B], v = p - d[_];
        p = Qo(E, p, v);
      }
      if (a) {
        const B = f === "y" ? "top" : "left", _ = f === "y" ? "bottom" : "right", E = b + d[B], v = b - d[_];
        b = Qo(E, b, v);
      }
      const O = l.fn(ht({}, e, {
        [u]: p,
        [f]: b
      }));
      return ht({}, O, {
        data: {
          x: O.x - o,
          y: O.y - i
        }
      });
    }
  };
}, Fs = function(t) {
  return t === void 0 && (t = {}), {
    options: t,
    fn(e) {
      const {
        x: o,
        y: i,
        placement: r,
        rects: s,
        middlewareData: a
      } = e, {
        offset: l = 0,
        mainAxis: c = !0,
        crossAxis: h = !0
      } = t, d = {
        x: o,
        y: i
      }, u = Je(r), f = Vi(u);
      let p = d[u], b = d[f];
      const O = typeof l == "function" ? l(e) : l, B = typeof O == "number" ? {
        mainAxis: O,
        crossAxis: 0
      } : ht({
        mainAxis: 0,
        crossAxis: 0
      }, O);
      if (c) {
        const v = u === "y" ? "height" : "width", m = s.reference[u] - s.floating[v] + B.mainAxis, T = s.reference[u] + s.reference[v] - B.mainAxis;
        p < m ? p = m : p > T && (p = T);
      }
      if (h) {
        var _, E;
        const v = u === "y" ? "width" : "height", m = ["top", "left"].includes(ae(r)), T = s.reference[f] - s.floating[v] + (m && ((_ = a.offset) == null ? void 0 : _[f]) || 0) + (m ? 0 : B.crossAxis), D = s.reference[f] + s.reference[v] + (m ? 0 : ((E = a.offset) == null ? void 0 : E[f]) || 0) - (m ? B.crossAxis : 0);
        b < T ? b = T : b > D && (b = D);
      }
      return {
        [u]: p,
        [f]: b
      };
    }
  };
};
function vt(n) {
  var t;
  return ((t = n.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function At(n) {
  return vt(n).getComputedStyle(n);
}
function $i(n) {
  return n instanceof vt(n).Node;
}
function Kt(n) {
  return $i(n) ? (n.nodeName || "").toLowerCase() : "";
}
let so;
function Wi() {
  if (so)
    return so;
  const n = navigator.userAgentData;
  return n && Array.isArray(n.brands) ? (so = n.brands.map((t) => t.brand + "/" + t.version).join(" "), so) : navigator.userAgent;
}
function Bt(n) {
  return n instanceof vt(n).HTMLElement;
}
function Tt(n) {
  return n instanceof vt(n).Element;
}
function Zn(n) {
  if (typeof ShadowRoot > "u")
    return !1;
  const t = vt(n).ShadowRoot;
  return n instanceof t || n instanceof ShadowRoot;
}
function Ao(n) {
  const {
    overflow: t,
    overflowX: e,
    overflowY: o,
    display: i
  } = At(n);
  return /auto|scroll|overlay|hidden|clip/.test(t + o + e) && !["inline", "contents"].includes(i);
}
function Hs(n) {
  return ["table", "td", "th"].includes(Kt(n));
}
function Sn(n) {
  const t = /firefox/i.test(Wi()), e = At(n), o = e.backdropFilter || e.WebkitBackdropFilter;
  return e.transform !== "none" || e.perspective !== "none" || (o ? o !== "none" : !1) || t && e.willChange === "filter" || t && (e.filter ? e.filter !== "none" : !1) || ["transform", "perspective"].some((i) => e.willChange.includes(i)) || ["paint", "layout", "strict", "content"].some((i) => {
    const r = e.contain;
    return r != null ? r.includes(i) : !1;
  });
}
function Cn() {
  return /^((?!chrome|android).)*safari/i.test(Wi());
}
function Tn(n) {
  return ["html", "body", "#document"].includes(Kt(n));
}
const qn = Math.min, Re = Math.max, xo = Math.round;
function Xi(n) {
  const t = At(n);
  let e = parseFloat(t.width), o = parseFloat(t.height);
  const i = Bt(n), r = i ? n.offsetWidth : e, s = i ? n.offsetHeight : o, a = xo(e) !== r || xo(o) !== s;
  return a && (e = r, o = s), {
    width: e,
    height: o,
    fallback: a
  };
}
function Ki(n) {
  return Tt(n) ? n : n.contextElement;
}
const Gi = {
  x: 1,
  y: 1
};
function xe(n) {
  const t = Ki(n);
  if (!Bt(t))
    return Gi;
  const e = t.getBoundingClientRect(), {
    width: o,
    height: i,
    fallback: r
  } = Xi(t);
  let s = (r ? xo(e.width) : e.width) / o, a = (r ? xo(e.height) : e.height) / i;
  return (!s || !Number.isFinite(s)) && (s = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: s,
    y: a
  };
}
function le(n, t, e, o) {
  var i, r;
  t === void 0 && (t = !1), e === void 0 && (e = !1);
  const s = n.getBoundingClientRect(), a = Ki(n);
  let l = Gi;
  t && (o ? Tt(o) && (l = xe(o)) : l = xe(n));
  const c = a ? vt(a) : window, h = Cn() && e;
  let d = (s.left + (h && ((i = c.visualViewport) == null ? void 0 : i.offsetLeft) || 0)) / l.x, u = (s.top + (h && ((r = c.visualViewport) == null ? void 0 : r.offsetTop) || 0)) / l.y, f = s.width / l.x, p = s.height / l.y;
  if (a) {
    const b = vt(a), O = o && Tt(o) ? vt(o) : o;
    let B = b.frameElement;
    for (; B && o && O !== b; ) {
      const _ = xe(B), E = B.getBoundingClientRect(), v = getComputedStyle(B);
      E.x += (B.clientLeft + parseFloat(v.paddingLeft)) * _.x, E.y += (B.clientTop + parseFloat(v.paddingTop)) * _.y, d *= _.x, u *= _.y, f *= _.x, p *= _.y, d += E.x, u += E.y, B = vt(B).frameElement;
    }
  }
  return ko({
    width: f,
    height: p,
    x: d,
    y: u
  });
}
function Zt(n) {
  return (($i(n) ? n.ownerDocument : n.document) || window.document).documentElement;
}
function Lo(n) {
  return Tt(n) ? {
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  } : {
    scrollLeft: n.pageXOffset,
    scrollTop: n.pageYOffset
  };
}
function js(n) {
  let {
    rect: t,
    offsetParent: e,
    strategy: o
  } = n;
  const i = Bt(e), r = Zt(e);
  if (e === r)
    return t;
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
  if ((i || !i && o !== "fixed") && ((Kt(e) !== "body" || Ao(r)) && (s = Lo(e)), Bt(e))) {
    const c = le(e);
    a = xe(e), l.x = c.x + e.clientLeft, l.y = c.y + e.clientTop;
  }
  return {
    width: t.width * a.x,
    height: t.height * a.y,
    x: t.x * a.x - s.scrollLeft * a.x + l.x,
    y: t.y * a.y - s.scrollTop * a.y + l.y
  };
}
function Zi(n) {
  return le(Zt(n)).left + Lo(n).scrollLeft;
}
function Us(n) {
  const t = Zt(n), e = Lo(n), o = n.ownerDocument.body, i = Re(t.scrollWidth, t.clientWidth, o.scrollWidth, o.clientWidth), r = Re(t.scrollHeight, t.clientHeight, o.scrollHeight, o.clientHeight);
  let s = -e.scrollLeft + Zi(n);
  const a = -e.scrollTop;
  return At(o).direction === "rtl" && (s += Re(t.clientWidth, o.clientWidth) - i), {
    width: i,
    height: r,
    x: s,
    y: a
  };
}
function Ge(n) {
  if (Kt(n) === "html")
    return n;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    n.assignedSlot || // DOM Element detected.
    n.parentNode || // ShadowRoot detected.
    Zn(n) && n.host || // Fallback.
    Zt(n)
  );
  return Zn(t) ? t.host : t;
}
function qi(n) {
  const t = Ge(n);
  return Tn(t) ? t.ownerDocument.body : Bt(t) && Ao(t) ? t : qi(t);
}
function Pe(n, t) {
  var e;
  t === void 0 && (t = []);
  const o = qi(n), i = o === ((e = n.ownerDocument) == null ? void 0 : e.body), r = vt(o);
  return i ? t.concat(r, r.visualViewport || [], Ao(o) ? o : []) : t.concat(o, Pe(o));
}
function zs(n, t) {
  const e = vt(n), o = Zt(n), i = e.visualViewport;
  let r = o.clientWidth, s = o.clientHeight, a = 0, l = 0;
  if (i) {
    r = i.width, s = i.height;
    const c = Cn();
    (!c || c && t === "fixed") && (a = i.offsetLeft, l = i.offsetTop);
  }
  return {
    width: r,
    height: s,
    x: a,
    y: l
  };
}
function Ys(n, t) {
  const e = le(n, !0, t === "fixed"), o = e.top + n.clientTop, i = e.left + n.clientLeft, r = Bt(n) ? xe(n) : {
    x: 1,
    y: 1
  }, s = n.clientWidth * r.x, a = n.clientHeight * r.y, l = i * r.x, c = o * r.y;
  return {
    width: s,
    height: a,
    x: l,
    y: c
  };
}
function Jn(n, t, e) {
  let o;
  if (t === "viewport")
    o = zs(n, e);
  else if (t === "document")
    o = Us(Zt(n));
  else if (Tt(t))
    o = Ys(t, e);
  else {
    const s = ht({}, t);
    if (Cn()) {
      var i, r;
      const a = vt(n);
      s.x -= ((i = a.visualViewport) == null ? void 0 : i.offsetLeft) || 0, s.y -= ((r = a.visualViewport) == null ? void 0 : r.offsetTop) || 0;
    }
    o = s;
  }
  return ko(o);
}
function Vs(n, t) {
  const e = t.get(n);
  if (e)
    return e;
  let o = Pe(n).filter((a) => Tt(a) && Kt(a) !== "body"), i = null;
  const r = At(n).position === "fixed";
  let s = r ? Ge(n) : n;
  for (; Tt(s) && !Tn(s); ) {
    const a = At(s), l = Sn(s);
    a.position === "fixed" ? i = null : (r ? !l && !i : !l && a.position === "static" && !!i && ["absolute", "fixed"].includes(i.position)) ? o = o.filter((d) => d !== s) : i = a, s = Ge(s);
  }
  return t.set(n, o), o;
}
function $s(n) {
  let {
    element: t,
    boundary: e,
    rootBoundary: o,
    strategy: i
  } = n;
  const s = [...e === "clippingAncestors" ? Vs(t, this._c) : [].concat(e), o], a = s[0], l = s.reduce((c, h) => {
    const d = Jn(t, h, i);
    return c.top = Re(d.top, c.top), c.right = qn(d.right, c.right), c.bottom = qn(d.bottom, c.bottom), c.left = Re(d.left, c.left), c;
  }, Jn(t, a, i));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function Ws(n) {
  return Xi(n);
}
function Qn(n, t) {
  return !Bt(n) || At(n).position === "fixed" ? null : t ? t(n) : n.offsetParent;
}
function Xs(n) {
  let t = Ge(n);
  for (; Bt(t) && !Tn(t); ) {
    if (Sn(t))
      return t;
    t = Ge(t);
  }
  return null;
}
function ti(n, t) {
  const e = vt(n);
  if (!Bt(n))
    return e;
  let o = Qn(n, t);
  for (; o && Hs(o) && At(o).position === "static"; )
    o = Qn(o, t);
  return o && (Kt(o) === "html" || Kt(o) === "body" && At(o).position === "static" && !Sn(o)) ? e : o || Xs(n) || e;
}
function Ks(n, t, e) {
  const o = Bt(t), i = Zt(t), r = le(n, !0, e === "fixed", t);
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const a = {
    x: 0,
    y: 0
  };
  if (o || !o && e !== "fixed")
    if ((Kt(t) !== "body" || Ao(i)) && (s = Lo(t)), Bt(t)) {
      const l = le(t, !0);
      a.x = l.x + t.clientLeft, a.y = l.y + t.clientTop;
    } else
      i && (a.x = Zi(i));
  return {
    x: r.left + s.scrollLeft - a.x,
    y: r.top + s.scrollTop - a.y,
    width: r.width,
    height: r.height
  };
}
const Gs = {
  getClippingRect: $s,
  convertOffsetParentRelativeRectToViewportRelativeRect: js,
  isElement: Tt,
  getDimensions: Ws,
  getOffsetParent: ti,
  getDocumentElement: Zt,
  getScale: xe,
  async getElementRects(n) {
    let {
      reference: t,
      floating: e,
      strategy: o
    } = n;
    const i = this.getOffsetParent || ti, r = this.getDimensions;
    return {
      reference: Ks(t, await i(e), o),
      floating: ht({
        x: 0,
        y: 0
      }, await r(e))
    };
  },
  getClientRects: (n) => Array.from(n.getClientRects()),
  isRTL: (n) => At(n).direction === "rtl"
};
function Zs(n, t, e, o) {
  o === void 0 && (o = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: r = !0,
    elementResize: s = !0,
    animationFrame: a = !1
  } = o, l = i && !a, c = l || r ? [...Tt(n) ? Pe(n) : n.contextElement ? Pe(n.contextElement) : [], ...Pe(t)] : [];
  c.forEach((p) => {
    l && p.addEventListener("scroll", e, {
      passive: !0
    }), r && p.addEventListener("resize", e);
  });
  let h = null;
  s && (h = new ResizeObserver(() => {
    e();
  }), Tt(n) && !a && h.observe(n), !Tt(n) && n.contextElement && !a && h.observe(n.contextElement), h.observe(t));
  let d, u = a ? le(n) : null;
  a && f();
  function f() {
    const p = le(n);
    u && (p.x !== u.x || p.y !== u.y || p.width !== u.width || p.height !== u.height) && e(), u = p, d = requestAnimationFrame(f);
  }
  return e(), () => {
    var p;
    c.forEach((b) => {
      l && b.removeEventListener("scroll", e), r && b.removeEventListener("resize", e);
    }), (p = h) == null || p.disconnect(), h = null, a && cancelAnimationFrame(d);
  };
}
const qs = (n, t, e) => {
  const o = /* @__PURE__ */ new Map(), i = ht({
    platform: Gs
  }, e), r = ht({}, i.platform, {
    _c: o
  });
  return Cs(n, t, ht({}, i, {
    platform: r
  }));
};
function Js(n) {
  n.cleanup && n.cleanup();
  const t = n._getResolvedAttachToOptions();
  let e = t.element;
  const o = ia(t, n), i = ji(t);
  return i && (e = document.body, n.shepherdElementComponent.getElement().classList.add("shepherd-centered")), n.cleanup = Zs(e, n.el, () => {
    if (!n.el) {
      n.cleanup();
      return;
    }
    ea(e, n, o, i);
  }), n.target = t.element, o;
}
function Qs(n, t) {
  return {
    floatingUIOptions: wn(n.floatingUIOptions || {}, t.floatingUIOptions || {})
  };
}
function ta(n) {
  n.cleanup && n.cleanup(), n.cleanup = null;
}
function ea(n, t, e, o) {
  return qs(n, t.el, e).then(oa(t, o)).then((i) => new Promise((r) => {
    setTimeout(() => r(i), 300);
  })).then((i) => {
    i && i.el && i.el.focus({
      preventScroll: !0
    });
  });
}
function oa(n, t) {
  return (e) => {
    let {
      x: o,
      y: i,
      placement: r,
      middlewareData: s
    } = e;
    return n.el && (t ? Object.assign(n.el.style, {
      position: "fixed",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)"
    }) : Object.assign(n.el.style, {
      position: "absolute",
      left: `${o}px`,
      top: `${i}px`
    }), n.el.dataset.popperPlacement = r, na(n.el, s)), n;
  };
}
function na(n, t) {
  const e = n.querySelector(".shepherd-arrow");
  if (e && t.arrow) {
    const {
      x: o,
      y: i
    } = t.arrow;
    Object.assign(e.style, {
      left: o != null ? `${o}px` : "",
      top: i != null ? `${i}px` : ""
    });
  }
}
function ia(n, t) {
  const e = {
    strategy: "absolute",
    middleware: []
  }, o = ra(t);
  return ji(n) || (e.middleware.push(
    Rs(),
    // Replicate PopperJS default behavior.
    Ps({
      limiter: Fs(),
      crossAxis: !0
    })
  ), o && e.middleware.push(Is({
    element: o
  })), e.placement = n.on), wn(t.options.floatingUIOptions || {}, e);
}
function ra(n) {
  return n.options.arrow && n.el ? n.el.querySelector(".shepherd-arrow") : !1;
}
function wt() {
}
function sa(n, t) {
  for (const e in t)
    n[e] = t[e];
  return n;
}
function Ji(n) {
  return n();
}
function ei() {
  return /* @__PURE__ */ Object.create(null);
}
function Qe(n) {
  n.forEach(Ji);
}
function Bn(n) {
  return typeof n == "function";
}
function jt(n, t) {
  return n != n ? t == t : n !== t || n && typeof n == "object" || typeof n == "function";
}
function aa(n) {
  return Object.keys(n).length === 0;
}
function Te(n, t) {
  n.appendChild(t);
}
function It(n, t, e) {
  n.insertBefore(t, e || null);
}
function xt(n) {
  n.parentNode && n.parentNode.removeChild(n);
}
function la(n, t) {
  for (let e = 0; e < n.length; e += 1)
    n[e] && n[e].d(t);
}
function Lt(n) {
  return document.createElement(n);
}
function oi(n) {
  return document.createElementNS("http://www.w3.org/2000/svg", n);
}
function Qi(n) {
  return document.createTextNode(n);
}
function Eo() {
  return Qi(" ");
}
function ca() {
  return Qi("");
}
function No(n, t, e, o) {
  return n.addEventListener(t, e, o), () => n.removeEventListener(t, e, o);
}
function K(n, t, e) {
  e == null ? n.removeAttribute(t) : n.getAttribute(t) !== e && n.setAttribute(t, e);
}
function ni(n, t) {
  const e = Object.getOwnPropertyDescriptors(n.__proto__);
  for (const o in t)
    t[o] == null ? n.removeAttribute(o) : o === "style" ? n.style.cssText = t[o] : o === "__value" ? n.value = n[o] = t[o] : e[o] && e[o].set ? n[o] = t[o] : K(n, o, t[o]);
}
function da(n) {
  return Array.from(n.childNodes);
}
function ue(n, t, e) {
  n.classList[e ? "add" : "remove"](t);
}
let Ze;
function Fe(n) {
  Ze = n;
}
function tr() {
  if (!Ze)
    throw new Error("Function called outside component initialization");
  return Ze;
}
function ha(n) {
  tr().$$.on_mount.push(n);
}
function _n(n) {
  tr().$$.after_update.push(n);
}
const me = [], Be = [];
let Ee = [];
const ii = [], ua = /* @__PURE__ */ Promise.resolve();
let en = !1;
function pa() {
  en || (en = !0, ua.then(er));
}
function on(n) {
  Ee.push(n);
}
const jo = /* @__PURE__ */ new Set();
let pe = 0;
function er() {
  if (pe !== 0)
    return;
  const n = Ze;
  do {
    try {
      for (; pe < me.length; ) {
        const t = me[pe];
        pe++, Fe(t), fa(t.$$);
      }
    } catch (t) {
      throw me.length = 0, pe = 0, t;
    }
    for (Fe(null), me.length = 0, pe = 0; Be.length; )
      Be.pop()();
    for (let t = 0; t < Ee.length; t += 1) {
      const e = Ee[t];
      jo.has(e) || (jo.add(e), e());
    }
    Ee.length = 0;
  } while (me.length);
  for (; ii.length; )
    ii.pop()();
  en = !1, jo.clear(), Fe(n);
}
function fa(n) {
  if (n.fragment !== null) {
    n.update(), Qe(n.before_update);
    const t = n.dirty;
    n.dirty = [-1], n.fragment && n.fragment.p(n.ctx, t), n.after_update.forEach(on);
  }
}
function ga(n) {
  const t = [], e = [];
  Ee.forEach((o) => n.indexOf(o) === -1 ? t.push(o) : e.push(o)), e.forEach((o) => o()), Ee = t;
}
const uo = /* @__PURE__ */ new Set();
let oe;
function ne() {
  oe = {
    r: 0,
    c: [],
    p: oe
    // parent group
  };
}
function ie() {
  oe.r || Qe(oe.c), oe = oe.p;
}
function X(n, t) {
  n && n.i && (uo.delete(n), n.i(t));
}
function tt(n, t, e, o) {
  if (n && n.o) {
    if (uo.has(n))
      return;
    uo.add(n), oe.c.push(() => {
      uo.delete(n), o && (e && n.d(1), o());
    }), n.o(t);
  } else
    o && o();
}
function ma(n, t) {
  const e = {}, o = {}, i = {
    $$scope: 1
  };
  let r = n.length;
  for (; r--; ) {
    const s = n[r], a = t[r];
    if (a) {
      for (const l in s)
        l in a || (o[l] = 1);
      for (const l in a)
        i[l] || (e[l] = a[l], i[l] = 1);
      n[r] = a;
    } else
      for (const l in s)
        i[l] = 1;
  }
  for (const s in o)
    s in e || (e[s] = void 0);
  return e;
}
function he(n) {
  n && n.c();
}
function qt(n, t, e, o) {
  const {
    fragment: i,
    after_update: r
  } = n.$$;
  i && i.m(t, e), o || on(() => {
    const s = n.$$.on_mount.map(Ji).filter(Bn);
    n.$$.on_destroy ? n.$$.on_destroy.push(...s) : Qe(s), n.$$.on_mount = [];
  }), r.forEach(on);
}
function Jt(n, t) {
  const e = n.$$;
  e.fragment !== null && (ga(e.after_update), Qe(e.on_destroy), e.fragment && e.fragment.d(t), e.on_destroy = e.fragment = null, e.ctx = []);
}
function ba(n, t) {
  n.$$.dirty[0] === -1 && (me.push(n), pa(), n.$$.dirty.fill(0)), n.$$.dirty[t / 31 | 0] |= 1 << t % 31;
}
function Ut(n, t, e, o, i, r, s, a) {
  a === void 0 && (a = [-1]);
  const l = Ze;
  Fe(n);
  const c = n.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: r,
    update: wt,
    not_equal: i,
    bound: ei(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(t.context || (l ? l.$$.context : [])),
    // everything else
    callbacks: ei(),
    dirty: a,
    skip_bound: !1,
    root: t.target || l.$$.root
  };
  s && s(c.root);
  let h = !1;
  if (c.ctx = e ? e(n, t.props || {}, function(d, u) {
    const f = !(arguments.length <= 2) && arguments.length - 2 ? arguments.length <= 2 ? void 0 : arguments[2] : u;
    return c.ctx && i(c.ctx[d], c.ctx[d] = f) && (!c.skip_bound && c.bound[d] && c.bound[d](f), h && ba(n, d)), u;
  }) : [], c.update(), h = !0, Qe(c.before_update), c.fragment = o ? o(c.ctx) : !1, t.target) {
    if (t.hydrate) {
      const d = da(t.target);
      c.fragment && c.fragment.l(d), d.forEach(xt);
    } else
      c.fragment && c.fragment.c();
    t.intro && X(n.$$.fragment), qt(n, t.target, t.anchor, t.customElement), er();
  }
  Fe(l);
}
class zt {
  $destroy() {
    Jt(this, 1), this.$destroy = wt;
  }
  $on(t, e) {
    if (!Bn(e))
      return wt;
    const o = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return o.push(e), () => {
      const i = o.indexOf(e);
      i !== -1 && o.splice(i, 1);
    };
  }
  $set(t) {
    this.$$set && !aa(t) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
  }
}
function va(n) {
  let t, e, o, i, r;
  return {
    c() {
      t = Lt("button"), K(t, "aria-label", e = /*label*/
      n[3] ? (
        /*label*/
        n[3]
      ) : null), K(t, "class", o = `${/*classes*/
      n[1] || ""} shepherd-button ${/*secondary*/
      n[4] ? "shepherd-button-secondary" : ""}`), t.disabled = /*disabled*/
      n[2], K(t, "tabindex", "0");
    },
    m(s, a) {
      It(s, t, a), t.innerHTML = /*text*/
      n[5], i || (r = No(t, "click", function() {
        Bn(
          /*action*/
          n[0]
        ) && n[0].apply(this, arguments);
      }), i = !0);
    },
    p(s, a) {
      let [l] = a;
      n = s, l & /*text*/
      32 && (t.innerHTML = /*text*/
      n[5]), l & /*label*/
      8 && e !== (e = /*label*/
      n[3] ? (
        /*label*/
        n[3]
      ) : null) && K(t, "aria-label", e), l & /*classes, secondary*/
      18 && o !== (o = `${/*classes*/
      n[1] || ""} shepherd-button ${/*secondary*/
      n[4] ? "shepherd-button-secondary" : ""}`) && K(t, "class", o), l & /*disabled*/
      4 && (t.disabled = /*disabled*/
      n[2]);
    },
    i: wt,
    o: wt,
    d(s) {
      s && xt(t), i = !1, r();
    }
  };
}
function wa(n, t, e) {
  let {
    config: o,
    step: i
  } = t, r, s, a, l, c, h;
  function d(u) {
    return se(u) ? u = u.call(i) : u;
  }
  return n.$$set = (u) => {
    "config" in u && e(6, o = u.config), "step" in u && e(7, i = u.step);
  }, n.$$.update = () => {
    n.$$.dirty & /*config, step*/
    192 && (e(0, r = o.action ? o.action.bind(i.tour) : null), e(1, s = o.classes), e(2, a = o.disabled ? d(o.disabled) : !1), e(3, l = o.label ? d(o.label) : null), e(4, c = o.secondary), e(5, h = o.text ? d(o.text) : null));
  }, [r, s, a, l, c, h, o, i];
}
class ka extends zt {
  constructor(t) {
    super(), Ut(this, t, wa, va, jt, {
      config: 6,
      step: 7
    });
  }
}
function ri(n, t, e) {
  const o = n.slice();
  return o[2] = t[e], o;
}
function si(n) {
  let t, e, o = (
    /*buttons*/
    n[1]
  ), i = [];
  for (let s = 0; s < o.length; s += 1)
    i[s] = ai(ri(n, o, s));
  const r = (s) => tt(i[s], 1, 1, () => {
    i[s] = null;
  });
  return {
    c() {
      for (let s = 0; s < i.length; s += 1)
        i[s].c();
      t = ca();
    },
    m(s, a) {
      for (let l = 0; l < i.length; l += 1)
        i[l] && i[l].m(s, a);
      It(s, t, a), e = !0;
    },
    p(s, a) {
      if (a & /*buttons, step*/
      3) {
        o = /*buttons*/
        s[1];
        let l;
        for (l = 0; l < o.length; l += 1) {
          const c = ri(s, o, l);
          i[l] ? (i[l].p(c, a), X(i[l], 1)) : (i[l] = ai(c), i[l].c(), X(i[l], 1), i[l].m(t.parentNode, t));
        }
        for (ne(), l = o.length; l < i.length; l += 1)
          r(l);
        ie();
      }
    },
    i(s) {
      if (!e) {
        for (let a = 0; a < o.length; a += 1)
          X(i[a]);
        e = !0;
      }
    },
    o(s) {
      i = i.filter(Boolean);
      for (let a = 0; a < i.length; a += 1)
        tt(i[a]);
      e = !1;
    },
    d(s) {
      la(i, s), s && xt(t);
    }
  };
}
function ai(n) {
  let t, e;
  return t = new ka({
    props: {
      config: (
        /*config*/
        n[2]
      ),
      step: (
        /*step*/
        n[0]
      )
    }
  }), {
    c() {
      he(t.$$.fragment);
    },
    m(o, i) {
      qt(t, o, i), e = !0;
    },
    p(o, i) {
      const r = {};
      i & /*buttons*/
      2 && (r.config = /*config*/
      o[2]), i & /*step*/
      1 && (r.step = /*step*/
      o[0]), t.$set(r);
    },
    i(o) {
      e || (X(t.$$.fragment, o), e = !0);
    },
    o(o) {
      tt(t.$$.fragment, o), e = !1;
    },
    d(o) {
      Jt(t, o);
    }
  };
}
function ya(n) {
  let t, e, o = (
    /*buttons*/
    n[1] && si(n)
  );
  return {
    c() {
      t = Lt("footer"), o && o.c(), K(t, "class", "shepherd-footer");
    },
    m(i, r) {
      It(i, t, r), o && o.m(t, null), e = !0;
    },
    p(i, r) {
      let [s] = r;
      /*buttons*/
      i[1] ? o ? (o.p(i, s), s & /*buttons*/
      2 && X(o, 1)) : (o = si(i), o.c(), X(o, 1), o.m(t, null)) : o && (ne(), tt(o, 1, 1, () => {
        o = null;
      }), ie());
    },
    i(i) {
      e || (X(o), e = !0);
    },
    o(i) {
      tt(o), e = !1;
    },
    d(i) {
      i && xt(t), o && o.d();
    }
  };
}
function xa(n, t, e) {
  let o, {
    step: i
  } = t;
  return n.$$set = (r) => {
    "step" in r && e(0, i = r.step);
  }, n.$$.update = () => {
    n.$$.dirty & /*step*/
    1 && e(1, o = i.options.buttons);
  }, [i, o];
}
class Ea extends zt {
  constructor(t) {
    super(), Ut(this, t, xa, ya, jt, {
      step: 0
    });
  }
}
function Sa(n) {
  let t, e, o, i, r;
  return {
    c() {
      t = Lt("button"), e = Lt("span"), e.textContent = "×", K(e, "aria-hidden", "true"), K(t, "aria-label", o = /*cancelIcon*/
      n[0].label ? (
        /*cancelIcon*/
        n[0].label
      ) : "Close Tour"), K(t, "class", "shepherd-cancel-icon"), K(t, "type", "button");
    },
    m(s, a) {
      It(s, t, a), Te(t, e), i || (r = No(
        t,
        "click",
        /*handleCancelClick*/
        n[1]
      ), i = !0);
    },
    p(s, a) {
      let [l] = a;
      l & /*cancelIcon*/
      1 && o !== (o = /*cancelIcon*/
      s[0].label ? (
        /*cancelIcon*/
        s[0].label
      ) : "Close Tour") && K(t, "aria-label", o);
    },
    i: wt,
    o: wt,
    d(s) {
      s && xt(t), i = !1, r();
    }
  };
}
function Ca(n, t, e) {
  let {
    cancelIcon: o,
    step: i
  } = t;
  const r = (s) => {
    s.preventDefault(), i.cancel();
  };
  return n.$$set = (s) => {
    "cancelIcon" in s && e(0, o = s.cancelIcon), "step" in s && e(2, i = s.step);
  }, [o, r, i];
}
class Ta extends zt {
  constructor(t) {
    super(), Ut(this, t, Ca, Sa, jt, {
      cancelIcon: 0,
      step: 2
    });
  }
}
function Ba(n) {
  let t;
  return {
    c() {
      t = Lt("h3"), K(
        t,
        "id",
        /*labelId*/
        n[1]
      ), K(t, "class", "shepherd-title");
    },
    m(e, o) {
      It(e, t, o), n[3](t);
    },
    p(e, o) {
      let [i] = o;
      i & /*labelId*/
      2 && K(
        t,
        "id",
        /*labelId*/
        e[1]
      );
    },
    i: wt,
    o: wt,
    d(e) {
      e && xt(t), n[3](null);
    }
  };
}
function _a(n, t, e) {
  let {
    labelId: o,
    element: i,
    title: r
  } = t;
  _n(() => {
    se(r) && e(2, r = r()), e(0, i.innerHTML = r, i);
  });
  function s(a) {
    Be[a ? "unshift" : "push"](() => {
      i = a, e(0, i);
    });
  }
  return n.$$set = (a) => {
    "labelId" in a && e(1, o = a.labelId), "element" in a && e(0, i = a.element), "title" in a && e(2, r = a.title);
  }, [i, o, r, s];
}
class Ia extends zt {
  constructor(t) {
    super(), Ut(this, t, _a, Ba, jt, {
      labelId: 1,
      element: 0,
      title: 2
    });
  }
}
function li(n) {
  let t, e;
  return t = new Ia({
    props: {
      labelId: (
        /*labelId*/
        n[0]
      ),
      title: (
        /*title*/
        n[2]
      )
    }
  }), {
    c() {
      he(t.$$.fragment);
    },
    m(o, i) {
      qt(t, o, i), e = !0;
    },
    p(o, i) {
      const r = {};
      i & /*labelId*/
      1 && (r.labelId = /*labelId*/
      o[0]), i & /*title*/
      4 && (r.title = /*title*/
      o[2]), t.$set(r);
    },
    i(o) {
      e || (X(t.$$.fragment, o), e = !0);
    },
    o(o) {
      tt(t.$$.fragment, o), e = !1;
    },
    d(o) {
      Jt(t, o);
    }
  };
}
function ci(n) {
  let t, e;
  return t = new Ta({
    props: {
      cancelIcon: (
        /*cancelIcon*/
        n[3]
      ),
      step: (
        /*step*/
        n[1]
      )
    }
  }), {
    c() {
      he(t.$$.fragment);
    },
    m(o, i) {
      qt(t, o, i), e = !0;
    },
    p(o, i) {
      const r = {};
      i & /*cancelIcon*/
      8 && (r.cancelIcon = /*cancelIcon*/
      o[3]), i & /*step*/
      2 && (r.step = /*step*/
      o[1]), t.$set(r);
    },
    i(o) {
      e || (X(t.$$.fragment, o), e = !0);
    },
    o(o) {
      tt(t.$$.fragment, o), e = !1;
    },
    d(o) {
      Jt(t, o);
    }
  };
}
function Ma(n) {
  let t, e, o, i = (
    /*title*/
    n[2] && li(n)
  ), r = (
    /*cancelIcon*/
    n[3] && /*cancelIcon*/
    n[3].enabled && ci(n)
  );
  return {
    c() {
      t = Lt("header"), i && i.c(), e = Eo(), r && r.c(), K(t, "class", "shepherd-header");
    },
    m(s, a) {
      It(s, t, a), i && i.m(t, null), Te(t, e), r && r.m(t, null), o = !0;
    },
    p(s, a) {
      let [l] = a;
      /*title*/
      s[2] ? i ? (i.p(s, l), l & /*title*/
      4 && X(i, 1)) : (i = li(s), i.c(), X(i, 1), i.m(t, e)) : i && (ne(), tt(i, 1, 1, () => {
        i = null;
      }), ie()), /*cancelIcon*/
      s[3] && /*cancelIcon*/
      s[3].enabled ? r ? (r.p(s, l), l & /*cancelIcon*/
      8 && X(r, 1)) : (r = ci(s), r.c(), X(r, 1), r.m(t, null)) : r && (ne(), tt(r, 1, 1, () => {
        r = null;
      }), ie());
    },
    i(s) {
      o || (X(i), X(r), o = !0);
    },
    o(s) {
      tt(i), tt(r), o = !1;
    },
    d(s) {
      s && xt(t), i && i.d(), r && r.d();
    }
  };
}
function Oa(n, t, e) {
  let {
    labelId: o,
    step: i
  } = t, r, s;
  return n.$$set = (a) => {
    "labelId" in a && e(0, o = a.labelId), "step" in a && e(1, i = a.step);
  }, n.$$.update = () => {
    n.$$.dirty & /*step*/
    2 && (e(2, r = i.options.title), e(3, s = i.options.cancelIcon));
  }, [o, i, r, s];
}
class Aa extends zt {
  constructor(t) {
    super(), Ut(this, t, Oa, Ma, jt, {
      labelId: 0,
      step: 1
    });
  }
}
function La(n) {
  let t;
  return {
    c() {
      t = Lt("div"), K(t, "class", "shepherd-text"), K(
        t,
        "id",
        /*descriptionId*/
        n[1]
      );
    },
    m(e, o) {
      It(e, t, o), n[3](t);
    },
    p(e, o) {
      let [i] = o;
      i & /*descriptionId*/
      2 && K(
        t,
        "id",
        /*descriptionId*/
        e[1]
      );
    },
    i: wt,
    o: wt,
    d(e) {
      e && xt(t), n[3](null);
    }
  };
}
function Na(n, t, e) {
  let {
    descriptionId: o,
    element: i,
    step: r
  } = t;
  _n(() => {
    let {
      text: a
    } = r.options;
    se(a) && (a = a.call(r)), kn(a) ? i.appendChild(a) : e(0, i.innerHTML = a, i);
  });
  function s(a) {
    Be[a ? "unshift" : "push"](() => {
      i = a, e(0, i);
    });
  }
  return n.$$set = (a) => {
    "descriptionId" in a && e(1, o = a.descriptionId), "element" in a && e(0, i = a.element), "step" in a && e(2, r = a.step);
  }, [i, o, r, s];
}
class Da extends zt {
  constructor(t) {
    super(), Ut(this, t, Na, La, jt, {
      descriptionId: 1,
      element: 0,
      step: 2
    });
  }
}
function di(n) {
  let t, e;
  return t = new Aa({
    props: {
      labelId: (
        /*labelId*/
        n[1]
      ),
      step: (
        /*step*/
        n[2]
      )
    }
  }), {
    c() {
      he(t.$$.fragment);
    },
    m(o, i) {
      qt(t, o, i), e = !0;
    },
    p(o, i) {
      const r = {};
      i & /*labelId*/
      2 && (r.labelId = /*labelId*/
      o[1]), i & /*step*/
      4 && (r.step = /*step*/
      o[2]), t.$set(r);
    },
    i(o) {
      e || (X(t.$$.fragment, o), e = !0);
    },
    o(o) {
      tt(t.$$.fragment, o), e = !1;
    },
    d(o) {
      Jt(t, o);
    }
  };
}
function hi(n) {
  let t, e;
  return t = new Da({
    props: {
      descriptionId: (
        /*descriptionId*/
        n[0]
      ),
      step: (
        /*step*/
        n[2]
      )
    }
  }), {
    c() {
      he(t.$$.fragment);
    },
    m(o, i) {
      qt(t, o, i), e = !0;
    },
    p(o, i) {
      const r = {};
      i & /*descriptionId*/
      1 && (r.descriptionId = /*descriptionId*/
      o[0]), i & /*step*/
      4 && (r.step = /*step*/
      o[2]), t.$set(r);
    },
    i(o) {
      e || (X(t.$$.fragment, o), e = !0);
    },
    o(o) {
      tt(t.$$.fragment, o), e = !1;
    },
    d(o) {
      Jt(t, o);
    }
  };
}
function ui(n) {
  let t, e;
  return t = new Ea({
    props: {
      step: (
        /*step*/
        n[2]
      )
    }
  }), {
    c() {
      he(t.$$.fragment);
    },
    m(o, i) {
      qt(t, o, i), e = !0;
    },
    p(o, i) {
      const r = {};
      i & /*step*/
      4 && (r.step = /*step*/
      o[2]), t.$set(r);
    },
    i(o) {
      e || (X(t.$$.fragment, o), e = !0);
    },
    o(o) {
      tt(t.$$.fragment, o), e = !1;
    },
    d(o) {
      Jt(t, o);
    }
  };
}
function Ra(n) {
  let t, e = !ct(
    /*step*/
    n[2].options.title
  ) || /*step*/
  n[2].options.cancelIcon && /*step*/
  n[2].options.cancelIcon.enabled, o, i = !ct(
    /*step*/
    n[2].options.text
  ), r, s = Array.isArray(
    /*step*/
    n[2].options.buttons
  ) && /*step*/
  n[2].options.buttons.length, a, l = e && di(n), c = i && hi(n), h = s && ui(n);
  return {
    c() {
      t = Lt("div"), l && l.c(), o = Eo(), c && c.c(), r = Eo(), h && h.c(), K(t, "class", "shepherd-content");
    },
    m(d, u) {
      It(d, t, u), l && l.m(t, null), Te(t, o), c && c.m(t, null), Te(t, r), h && h.m(t, null), a = !0;
    },
    p(d, u) {
      let [f] = u;
      f & /*step*/
      4 && (e = !ct(
        /*step*/
        d[2].options.title
      ) || /*step*/
      d[2].options.cancelIcon && /*step*/
      d[2].options.cancelIcon.enabled), e ? l ? (l.p(d, f), f & /*step*/
      4 && X(l, 1)) : (l = di(d), l.c(), X(l, 1), l.m(t, o)) : l && (ne(), tt(l, 1, 1, () => {
        l = null;
      }), ie()), f & /*step*/
      4 && (i = !ct(
        /*step*/
        d[2].options.text
      )), i ? c ? (c.p(d, f), f & /*step*/
      4 && X(c, 1)) : (c = hi(d), c.c(), X(c, 1), c.m(t, r)) : c && (ne(), tt(c, 1, 1, () => {
        c = null;
      }), ie()), f & /*step*/
      4 && (s = Array.isArray(
        /*step*/
        d[2].options.buttons
      ) && /*step*/
      d[2].options.buttons.length), s ? h ? (h.p(d, f), f & /*step*/
      4 && X(h, 1)) : (h = ui(d), h.c(), X(h, 1), h.m(t, null)) : h && (ne(), tt(h, 1, 1, () => {
        h = null;
      }), ie());
    },
    i(d) {
      a || (X(l), X(c), X(h), a = !0);
    },
    o(d) {
      tt(l), tt(c), tt(h), a = !1;
    },
    d(d) {
      d && xt(t), l && l.d(), c && c.d(), h && h.d();
    }
  };
}
function Pa(n, t, e) {
  let {
    descriptionId: o,
    labelId: i,
    step: r
  } = t;
  return n.$$set = (s) => {
    "descriptionId" in s && e(0, o = s.descriptionId), "labelId" in s && e(1, i = s.labelId), "step" in s && e(2, r = s.step);
  }, [o, i, r];
}
class Fa extends zt {
  constructor(t) {
    super(), Ut(this, t, Pa, Ra, jt, {
      descriptionId: 0,
      labelId: 1,
      step: 2
    });
  }
}
function pi(n) {
  let t;
  return {
    c() {
      t = Lt("div"), K(t, "class", "shepherd-arrow"), K(t, "data-popper-arrow", "");
    },
    m(e, o) {
      It(e, t, o);
    },
    d(e) {
      e && xt(t);
    }
  };
}
function Ha(n) {
  let t, e, o, i, r, s, a, l, c = (
    /*step*/
    n[4].options.arrow && /*step*/
    n[4].options.attachTo && /*step*/
    n[4].options.attachTo.element && /*step*/
    n[4].options.attachTo.on && pi()
  );
  o = new Fa({
    props: {
      descriptionId: (
        /*descriptionId*/
        n[2]
      ),
      labelId: (
        /*labelId*/
        n[3]
      ),
      step: (
        /*step*/
        n[4]
      )
    }
  });
  let h = [
    {
      "aria-describedby": i = ct(
        /*step*/
        n[4].options.text
      ) ? null : (
        /*descriptionId*/
        n[2]
      )
    },
    {
      "aria-labelledby": r = /*step*/
      n[4].options.title ? (
        /*labelId*/
        n[3]
      ) : null
    },
    /*dataStepId*/
    n[1],
    {
      role: "dialog"
    },
    {
      tabindex: "0"
    }
  ], d = {};
  for (let u = 0; u < h.length; u += 1)
    d = sa(d, h[u]);
  return {
    c() {
      t = Lt("div"), c && c.c(), e = Eo(), he(o.$$.fragment), ni(t, d), ue(
        t,
        "shepherd-has-cancel-icon",
        /*hasCancelIcon*/
        n[5]
      ), ue(
        t,
        "shepherd-has-title",
        /*hasTitle*/
        n[6]
      ), ue(t, "shepherd-element", !0);
    },
    m(u, f) {
      It(u, t, f), c && c.m(t, null), Te(t, e), qt(o, t, null), n[13](t), s = !0, a || (l = No(
        t,
        "keydown",
        /*handleKeyDown*/
        n[7]
      ), a = !0);
    },
    p(u, f) {
      let [p] = f;
      /*step*/
      u[4].options.arrow && /*step*/
      u[4].options.attachTo && /*step*/
      u[4].options.attachTo.element && /*step*/
      u[4].options.attachTo.on ? c || (c = pi(), c.c(), c.m(t, e)) : c && (c.d(1), c = null);
      const b = {};
      p & /*descriptionId*/
      4 && (b.descriptionId = /*descriptionId*/
      u[2]), p & /*labelId*/
      8 && (b.labelId = /*labelId*/
      u[3]), p & /*step*/
      16 && (b.step = /*step*/
      u[4]), o.$set(b), ni(t, d = ma(h, [(!s || p & /*step, descriptionId*/
      20 && i !== (i = ct(
        /*step*/
        u[4].options.text
      ) ? null : (
        /*descriptionId*/
        u[2]
      ))) && {
        "aria-describedby": i
      }, (!s || p & /*step, labelId*/
      24 && r !== (r = /*step*/
      u[4].options.title ? (
        /*labelId*/
        u[3]
      ) : null)) && {
        "aria-labelledby": r
      }, p & /*dataStepId*/
      2 && /*dataStepId*/
      u[1], {
        role: "dialog"
      }, {
        tabindex: "0"
      }])), ue(
        t,
        "shepherd-has-cancel-icon",
        /*hasCancelIcon*/
        u[5]
      ), ue(
        t,
        "shepherd-has-title",
        /*hasTitle*/
        u[6]
      ), ue(t, "shepherd-element", !0);
    },
    i(u) {
      s || (X(o.$$.fragment, u), s = !0);
    },
    o(u) {
      tt(o.$$.fragment, u), s = !1;
    },
    d(u) {
      u && xt(t), c && c.d(), Jt(o), n[13](null), a = !1, l();
    }
  };
}
const ja = 9, Ua = 27, za = 37, Ya = 39;
function fi(n) {
  return n.split(" ").filter((t) => !!t.length);
}
function Va(n, t, e) {
  let {
    classPrefix: o,
    element: i,
    descriptionId: r,
    firstFocusableElement: s,
    focusableElements: a,
    labelId: l,
    lastFocusableElement: c,
    step: h,
    dataStepId: d
  } = t, u, f, p;
  const b = () => i;
  ha(() => {
    e(1, d = {
      [`data-${o}shepherd-step-id`]: h.id
    }), e(9, a = i.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]')), e(8, s = a[0]), e(10, c = a[a.length - 1]);
  }), _n(() => {
    p !== h.options.classes && O();
  });
  function O() {
    B(p), p = h.options.classes, _(p);
  }
  function B(m) {
    if (Ke(m)) {
      const T = fi(m);
      T.length && i.classList.remove(...T);
    }
  }
  function _(m) {
    if (Ke(m)) {
      const T = fi(m);
      T.length && i.classList.add(...T);
    }
  }
  const E = (m) => {
    const {
      tour: T
    } = h;
    switch (m.keyCode) {
      case ja:
        if (a.length === 0) {
          m.preventDefault();
          break;
        }
        m.shiftKey ? (document.activeElement === s || document.activeElement.classList.contains("shepherd-element")) && (m.preventDefault(), c.focus()) : document.activeElement === c && (m.preventDefault(), s.focus());
        break;
      case Ua:
        T.options.exitOnEsc && h.cancel();
        break;
      case za:
        T.options.keyboardNavigation && T.back();
        break;
      case Ya:
        T.options.keyboardNavigation && T.next();
        break;
    }
  };
  function v(m) {
    Be[m ? "unshift" : "push"](() => {
      i = m, e(0, i);
    });
  }
  return n.$$set = (m) => {
    "classPrefix" in m && e(11, o = m.classPrefix), "element" in m && e(0, i = m.element), "descriptionId" in m && e(2, r = m.descriptionId), "firstFocusableElement" in m && e(8, s = m.firstFocusableElement), "focusableElements" in m && e(9, a = m.focusableElements), "labelId" in m && e(3, l = m.labelId), "lastFocusableElement" in m && e(10, c = m.lastFocusableElement), "step" in m && e(4, h = m.step), "dataStepId" in m && e(1, d = m.dataStepId);
  }, n.$$.update = () => {
    n.$$.dirty & /*step*/
    16 && (e(5, u = h.options && h.options.cancelIcon && h.options.cancelIcon.enabled), e(6, f = h.options && h.options.title));
  }, [i, d, r, l, h, u, f, E, s, a, c, o, b, v];
}
class $a extends zt {
  constructor(t) {
    super(), Ut(this, t, Va, Ha, jt, {
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
class nn extends yn {
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
  constructor(t, e) {
    return e === void 0 && (e = {}), super(t, e), this.tour = t, this.classPrefix = this.tour.options ? Hi(this.tour.options.classPrefix) : "", this.styles = t.styles, this._resolvedAttachTo = null, Fi(this), this._setOptions(e), this;
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
    ta(this), kn(this.el) && (this.el.remove(), this.el = null), this._updateStepTargetOnHide(), this.trigger("destroy");
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
    return this._resolvedAttachTo = xs(this), this._resolvedAttachTo;
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
    return se(this.options.beforeShowPromise) ? Promise.resolve(this.options.beforeShowPromise()).then(() => this._show()) : Promise.resolve(this._show());
  }
  /**
   * Updates the options of the step.
   *
   * @param {Object} options The options for the step
   */
  updateStepOptions(t) {
    Object.assign(this.options, t), this.shepherdElementComponent && this.shepherdElementComponent.$set({
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
    const t = `${this.id}-description`, e = `${this.id}-label`;
    return this.shepherdElementComponent = new $a({
      target: this.tour.options.stepsContainer || document.body,
      props: {
        classPrefix: this.classPrefix,
        descriptionId: t,
        labelId: e,
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
  _scrollTo(t) {
    const {
      element: e
    } = this._getResolvedAttachToOptions();
    se(this.options.scrollToHandler) ? this.options.scrollToHandler(e) : ws(e) && typeof e.scrollIntoView == "function" && e.scrollIntoView(t);
  }
  /**
   * _getClassOptions gets all possible classes for the step
   * @param {Object} stepOptions The step specific options
   * @returns {String} unique string from array of classes
   * @private
   */
  _getClassOptions(t) {
    const e = this.tour && this.tour.options && this.tour.options.defaultStepOptions, o = t.classes ? t.classes : "", i = e && e.classes ? e.classes : "", r = [...o.split(" "), ...i.split(" ")], s = new Set(r);
    return Array.from(s).join(" ").trim();
  }
  /**
   * Sets the options for the step, maps `when` to events, sets up buttons
   * @param {Object} options The options for the step
   * @private
   */
  _setOptions(t) {
    t === void 0 && (t = {});
    let e = this.tour && this.tour.options && this.tour.options.defaultStepOptions;
    e = wn({}, e || {}), this.options = Object.assign({
      arrow: !0
    }, e, t, Qs(e, t));
    const {
      when: o
    } = this.options;
    this.options.classes = this._getClassOptions(t), this.destroy(), this.id = this.options.id || `step-${xn()}`, o && Object.keys(o).forEach((i) => {
      this.on(i, o[i], this);
    });
  }
  /**
   * Create the element and set up the FloatingUI instance
   * @private
   */
  _setupElements() {
    ct(this.el) || this.destroy(), this.el = this._createTooltipContent(), this.options.advanceOn && ys(this), Js(this);
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
    const t = this.shepherdElementComponent.getElement(), e = this.target || document.body;
    e.classList.add(`${this.classPrefix}shepherd-enabled`), e.classList.add(`${this.classPrefix}shepherd-target`), t.classList.add("shepherd-enabled"), this.trigger("show");
  }
  /**
   * Modulates the styles of the passed step's target element, based on the step's options and
   * the tour's `modal` option, to visually emphasize the element
   *
   * @param step The step object that attaches to the element
   * @private
   */
  _styleTargetElementForStep(t) {
    const e = t.target;
    e && (t.options.highlightClass && e.classList.add(t.options.highlightClass), e.classList.remove("shepherd-target-click-disabled"), t.options.canClickTarget === !1 && e.classList.add("shepherd-target-click-disabled"));
  }
  /**
   * When a step is hidden, remove the highlightClass and 'shepherd-enabled'
   * and 'shepherd-target' classes
   * @private
   */
  _updateStepTargetOnHide() {
    const t = this.target || document.body;
    this.options.highlightClass && t.classList.remove(this.options.highlightClass), t.classList.remove("shepherd-target-click-disabled", `${this.classPrefix}shepherd-enabled`, `${this.classPrefix}shepherd-target`);
  }
}
function Wa(n) {
  if (n) {
    const {
      steps: t
    } = n;
    t.forEach((e) => {
      e.options && e.options.canClickTarget === !1 && e.options.attachTo && e.target instanceof HTMLElement && e.target.classList.remove("shepherd-target-click-disabled");
    });
  }
}
function Xa(n) {
  let {
    width: t,
    height: e,
    x: o = 0,
    y: i = 0,
    r = 0
  } = n;
  const {
    innerWidth: s,
    innerHeight: a
  } = window, {
    topLeft: l = 0,
    topRight: c = 0,
    bottomRight: h = 0,
    bottomLeft: d = 0
  } = typeof r == "number" ? {
    topLeft: r,
    topRight: r,
    bottomRight: r,
    bottomLeft: r
  } : r;
  return `M${s},${a}H0V0H${s}V${a}ZM${o + l},${i}a${l},${l},0,0,0-${l},${l}V${e + i - d}a${d},${d},0,0,0,${d},${d}H${t + o - h}a${h},${h},0,0,0,${h}-${h}V${i + c}a${c},${c},0,0,0-${c}-${c}Z`;
}
function Ka(n) {
  let t, e, o, i, r;
  return {
    c() {
      t = oi("svg"), e = oi("path"), K(
        e,
        "d",
        /*pathDefinition*/
        n[2]
      ), K(t, "class", o = `${/*modalIsVisible*/
      n[1] ? "shepherd-modal-is-visible" : ""} shepherd-modal-overlay-container`);
    },
    m(s, a) {
      It(s, t, a), Te(t, e), n[11](t), i || (r = No(
        t,
        "touchmove",
        /*_preventModalOverlayTouch*/
        n[3]
      ), i = !0);
    },
    p(s, a) {
      let [l] = a;
      l & /*pathDefinition*/
      4 && K(
        e,
        "d",
        /*pathDefinition*/
        s[2]
      ), l & /*modalIsVisible*/
      2 && o !== (o = `${/*modalIsVisible*/
      s[1] ? "shepherd-modal-is-visible" : ""} shepherd-modal-overlay-container`) && K(t, "class", o);
    },
    i: wt,
    o: wt,
    d(s) {
      s && xt(t), n[11](null), i = !1, r();
    }
  };
}
function or(n) {
  if (!n)
    return null;
  const e = n instanceof HTMLElement && window.getComputedStyle(n).overflowY;
  return e !== "hidden" && e !== "visible" && n.scrollHeight >= n.clientHeight ? n : or(n.parentElement);
}
function Ga(n, t) {
  const e = n.getBoundingClientRect();
  let o = e.y || e.top, i = e.bottom || o + e.height;
  if (t) {
    const s = t.getBoundingClientRect(), a = s.y || s.top, l = s.bottom || a + s.height;
    o = Math.max(o, a), i = Math.min(i, l);
  }
  const r = Math.max(i - o, 0);
  return {
    y: o,
    height: r
  };
}
function Za(n, t, e) {
  let {
    element: o,
    openingProperties: i
  } = t;
  xn();
  let r = !1, s, a;
  c();
  const l = () => o;
  function c() {
    e(4, i = {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      r: 0
    });
  }
  function h() {
    e(1, r = !1), B();
  }
  function d(v, m, T, D) {
    if (v === void 0 && (v = 0), m === void 0 && (m = 0), D) {
      const {
        y: S,
        height: y
      } = Ga(D, T), {
        x: A,
        width: w,
        left: k
      } = D.getBoundingClientRect();
      e(4, i = {
        width: w + v * 2,
        height: y + v * 2,
        x: (A || k) - v,
        y: S - v,
        r: m
      });
    } else
      c();
  }
  function u(v) {
    B(), v.tour.options.useModalOverlay ? (_(v), f()) : h();
  }
  function f() {
    e(1, r = !0);
  }
  const p = (v) => {
    v.preventDefault();
  }, b = (v) => {
    v.stopPropagation();
  };
  function O() {
    window.addEventListener("touchmove", p, {
      passive: !1
    });
  }
  function B() {
    s && (cancelAnimationFrame(s), s = void 0), window.removeEventListener("touchmove", p, {
      passive: !1
    });
  }
  function _(v) {
    const {
      modalOverlayOpeningPadding: m,
      modalOverlayOpeningRadius: T
    } = v.options, D = or(v.target), S = () => {
      s = void 0, d(m, T, D, v.target), s = requestAnimationFrame(S);
    };
    S(), O();
  }
  function E(v) {
    Be[v ? "unshift" : "push"](() => {
      o = v, e(0, o);
    });
  }
  return n.$$set = (v) => {
    "element" in v && e(0, o = v.element), "openingProperties" in v && e(4, i = v.openingProperties);
  }, n.$$.update = () => {
    n.$$.dirty & /*openingProperties*/
    16 && e(2, a = Xa(i));
  }, [o, r, a, b, i, l, c, h, d, u, f, E];
}
class qa extends zt {
  constructor(t) {
    super(), Ut(this, t, Za, Ka, jt, {
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
const Dt = new yn();
class Ja extends yn {
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
  constructor(t) {
    t === void 0 && (t = {}), super(t), Fi(this);
    const e = {
      exitOnEsc: !0,
      keyboardNavigation: !0
    };
    return this.options = Object.assign({}, e, t), this.classPrefix = Hi(this.options.classPrefix), this.steps = [], this.addSteps(this.options.steps), ["active", "cancel", "complete", "inactive", "show", "start"].map((i) => {
      ((r) => {
        this.on(r, (s) => {
          s = s || {}, s.tour = this, Dt.trigger(r, s);
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
  addStep(t, e) {
    let o = t;
    return o instanceof nn ? o.tour = this : o = new nn(this, o), ct(e) ? this.steps.push(o) : this.steps.splice(e, 0, o), o;
  }
  /**
   * Add multiple steps to the tour
   * @param {Array<object> | Array<Step>} steps The steps to add to the tour
   */
  addSteps(t) {
    return Array.isArray(t) && t.forEach((e) => {
      this.addStep(e);
    }), this;
  }
  /**
   * Go to the previous step in the tour
   */
  back() {
    const t = this.steps.indexOf(this.currentStep);
    this.show(t - 1, !1);
  }
  /**
   * Calls _done() triggering the 'cancel' event
   * If `confirmCancel` is true, will show a window.confirm before cancelling
   * If `confirmCancel` is a function, will call it and wait for the return value,
   * and only cancel when the value returned is true
   */
  async cancel() {
    if (this.options.confirmCancel) {
      const t = typeof this.options.confirmCancel == "function", e = this.options.confirmCancelMessage || "Are you sure you want to stop the tour?";
      (t ? await this.options.confirmCancel() : window.confirm(e)) && this._done("cancel");
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
  getById(t) {
    return this.steps.find((e) => e.id === t);
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
    const t = this.getCurrentStep();
    if (t)
      return t.hide();
  }
  /**
   * Check if the tour is active
   * @return {boolean}
   */
  isActive() {
    return Dt.activeTour === this;
  }
  /**
   * Go to the next step in the tour
   * If we are at the end, call `complete`
   */
  next() {
    const t = this.steps.indexOf(this.currentStep);
    t === this.steps.length - 1 ? this.complete() : this.show(t + 1, !0);
  }
  /**
   * Removes the step from the tour
   * @param {String} name The id for the step to remove
   */
  removeStep(t) {
    const e = this.getCurrentStep();
    this.steps.some((o, i) => {
      if (o.id === t)
        return o.isOpen() && o.hide(), o.destroy(), this.steps.splice(i, 1), !0;
    }), e && e.id === t && (this.currentStep = void 0, this.steps.length ? this.show(0) : this.cancel());
  }
  /**
   * Show a specific step in the tour
   * @param {Number|String} key The key to look up the step by
   * @param {Boolean} forward True if we are going forward, false if backward
   */
  show(t, e) {
    t === void 0 && (t = 0), e === void 0 && (e = !0);
    const o = Ke(t) ? this.getById(t) : this.steps[t];
    o && (this._updateStateBeforeShow(), se(o.options.showOn) && !o.options.showOn() ? this._skipStep(o, e) : (this.trigger("show", {
      step: o,
      previous: this.currentStep
    }), this.currentStep = o, o.show()));
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
  _done(t) {
    const e = this.steps.indexOf(this.currentStep);
    if (Array.isArray(this.steps) && this.steps.forEach((o) => o.destroy()), Wa(this), this.trigger(t, {
      index: e
    }), Dt.activeTour = null, this.trigger("inactive", {
      tour: this
    }), this.modal && this.modal.hide(), (t === "cancel" || t === "complete") && this.modal) {
      const o = document.querySelector(".shepherd-modal-overlay-container");
      o && o.remove();
    }
    kn(this.focusedElBeforeOpen) && this.focusedElBeforeOpen.focus();
  }
  /**
   * Make this tour "active"
   * @private
   */
  _setupActiveTour() {
    this.trigger("active", {
      tour: this
    }), Dt.activeTour = this;
  }
  /**
   * _setupModal create the modal container and instance
   * @private
   */
  _setupModal() {
    this.modal = new qa({
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
  _skipStep(t, e) {
    const o = this.steps.indexOf(t);
    if (o === this.steps.length - 1)
      this.complete();
    else {
      const i = e ? o + 1 : o - 1;
      this.show(i, e);
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
    const t = this.options.tourName || "tour";
    this.id = `${t}--${xn()}`;
  }
}
const Qa = typeof window > "u";
class gi {
  constructor() {
  }
}
Qa ? Object.assign(Dt, {
  Tour: gi,
  Step: gi
}) : Object.assign(Dt, {
  Tour: Ja,
  Step: nn
});
function nr(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var tl = ["left", "right", "center", "justify"], el = { delimiter: function() {
  return "<br/>";
}, header: function(n) {
  var t = n.data;
  return "<h" + t.level + ">" + t.text + "</h" + t.level + ">";
}, paragraph: function(n) {
  var t = n.data, e = t.alignment || t.align;
  return e !== void 0 && tl.includes(e) ? '<p style="text-align:' + e + ';">' + t.text + "</p>" : "<p>" + t.text + "</p>";
}, list: function(n) {
  var t = n.data, e = t.style === "unordered" ? "ul" : "ol", o = function(i, r) {
    var s = i.map(function(a) {
      if (!a.content && !a.items)
        return "<li>" + a + "</li>";
      var l = "";
      return a.items && (l = o(a.items, r)), a.content ? "<li> " + a.content + " </li>" + l : void 0;
    });
    return "<" + r + ">" + s.join("") + "</" + r + ">";
  };
  return o(t.items, e);
}, image: function(n) {
  var t = n.data, e = t.caption ? t.caption : "Image";
  return '<img src="' + (t.file && t.file.url ? t.file.url : t.url) + '" alt="' + e + '" />';
}, quote: function(n) {
  var t = n.data;
  return "<blockquote>" + t.text + "</blockquote> - " + t.caption;
}, code: function(n) {
  return "<pre><code>" + n.data.code + "</code></pre>";
}, embed: function(n) {
  var t = n.data;
  switch (t.service) {
    case "vimeo":
      return '<iframe src="' + t.embed + '" height="' + t.height + '" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
    case "youtube":
      return '<iframe width="' + t.width + '" height="' + t.height + '" src="' + t.embed + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    default:
      throw new Error("Only Youtube and Vime Embeds are supported right now.");
  }
} };
function Uo(n) {
  return new Error('\x1B[31m The Parser function of type "' + n + `" is not defined. 

  Define your custom parser functions as: \x1B[34mhttps://github.com/pavittarx/editorjs-html#extend-for-custom-blocks \x1B[0m`);
}
var ir = function(n) {
  n === void 0 && (n = {});
  var t = Object.assign({}, el, n);
  return { parse: function(e) {
    return e.blocks.map(function(o) {
      return t[o.type] ? t[o.type](o) : Uo(o.type);
    });
  }, parseBlock: function(e) {
    return t[e.type] ? t[e.type](e) : Uo(e.type);
  }, parseStrict: function(e) {
    var o = e.blocks, i = ir(t).validate({ blocks: o });
    if (i.length)
      throw new Error("Parser Functions missing for blocks: " + i.toString());
    for (var r = [], s = 0; s < o.length; s++) {
      if (!t[o[s].type])
        throw Uo(o[s].type);
      r.push(t[o[s].type](o[s]));
    }
    return r;
  }, validate: function(e) {
    var o = e.blocks.map(function(r) {
      return r.type;
    }).filter(function(r, s, a) {
      return a.indexOf(r) === s;
    }), i = Object.keys(t);
    return o.filter(function(r) {
      return !i.includes(r);
    });
  } };
}, ol = ir;
const nl = /* @__PURE__ */ nr(ol), F = Qr({
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
    activeType: "",
    activeElement: null,
    activeEditor: null
  },
  setSteps(n) {
    this.steps = n;
  },
  addStep(n) {
    this.steps.push(n);
  },
  async addNewStep(n = !1) {
    var o;
    const t = this.newStep.activeElement;
    if (n) {
      F.newStep.activeEditor.readOnly = !0;
      const i = await F.newStep.activeEditor.save(), s = nl().parse(i);
      this.newStep.content = s.join("");
    }
    const e = {
      id: Math.round(Math.random() * 1e8).toString(),
      title: this.newStep.title,
      text: this.newStep.content,
      type: this.newStep.activeType,
      // Custom Metadata
      xpath: t ? is(t) : null
      // xpath can be null for full-page modals (without attachTo, that is)
    };
    this.steps.push(e), (o = Dt.activeTour) == null || o.cancel(), this.newStep.title = "", this.newStep.content = "", this.newStep.mediaURL = "";
  },
  removeStep(n) {
    this.steps = this.steps.filter((t) => t !== n);
  },
  setHovered(n) {
    this.hovered = n;
  },
  setSelected(n) {
    this.selected = n;
  },
  setAdminMode(n) {
    this.adminMode = n;
  },
  setEditMode(n) {
    var t, e;
    this.editMode = n, Sd(n), n || ((t = this.hovered) == null || t.classList.remove("hovered"), (e = this.selected) == null || e.classList.remove("untitled_selected"), this.hovered = null, this.selected = null);
  }
});
/**!
 * Sortable 1.15.0
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function mi(n, t) {
  var e = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(n);
    t && (o = o.filter(function(i) {
      return Object.getOwnPropertyDescriptor(n, i).enumerable;
    })), e.push.apply(e, o);
  }
  return e;
}
function Nt(n) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? mi(Object(e), !0).forEach(function(o) {
      il(n, o, e[o]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(e)) : mi(Object(e)).forEach(function(o) {
      Object.defineProperty(n, o, Object.getOwnPropertyDescriptor(e, o));
    });
  }
  return n;
}
function po(n) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? po = function(t) {
    return typeof t;
  } : po = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, po(n);
}
function il(n, t, e) {
  return t in n ? Object.defineProperty(n, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : n[t] = e, n;
}
function Ft() {
  return Ft = Object.assign || function(n) {
    for (var t = 1; t < arguments.length; t++) {
      var e = arguments[t];
      for (var o in e)
        Object.prototype.hasOwnProperty.call(e, o) && (n[o] = e[o]);
    }
    return n;
  }, Ft.apply(this, arguments);
}
function rl(n, t) {
  if (n == null)
    return {};
  var e = {}, o = Object.keys(n), i, r;
  for (r = 0; r < o.length; r++)
    i = o[r], !(t.indexOf(i) >= 0) && (e[i] = n[i]);
  return e;
}
function sl(n, t) {
  if (n == null)
    return {};
  var e = rl(n, t), o, i;
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(n);
    for (i = 0; i < r.length; i++)
      o = r[i], !(t.indexOf(o) >= 0) && Object.prototype.propertyIsEnumerable.call(n, o) && (e[o] = n[o]);
  }
  return e;
}
var al = "1.15.0";
function Pt(n) {
  if (typeof window < "u" && window.navigator)
    return !!/* @__PURE__ */ navigator.userAgent.match(n);
}
var Yt = Pt(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), to = Pt(/Edge/i), bi = Pt(/firefox/i), He = Pt(/safari/i) && !Pt(/chrome/i) && !Pt(/android/i), rr = Pt(/iP(ad|od|hone)/i), sr = Pt(/chrome/i) && Pt(/android/i), ar = {
  capture: !1,
  passive: !1
};
function W(n, t, e) {
  n.addEventListener(t, e, !Yt && ar);
}
function $(n, t, e) {
  n.removeEventListener(t, e, !Yt && ar);
}
function So(n, t) {
  if (t) {
    if (t[0] === ">" && (t = t.substring(1)), n)
      try {
        if (n.matches)
          return n.matches(t);
        if (n.msMatchesSelector)
          return n.msMatchesSelector(t);
        if (n.webkitMatchesSelector)
          return n.webkitMatchesSelector(t);
      } catch {
        return !1;
      }
    return !1;
  }
}
function ll(n) {
  return n.host && n !== document && n.host.nodeType ? n.host : n.parentNode;
}
function Mt(n, t, e, o) {
  if (n) {
    e = e || document;
    do {
      if (t != null && (t[0] === ">" ? n.parentNode === e && So(n, t) : So(n, t)) || o && n === e)
        return n;
      if (n === e)
        break;
    } while (n = ll(n));
  }
  return null;
}
var vi = /\s+/g;
function gt(n, t, e) {
  if (n && t)
    if (n.classList)
      n.classList[e ? "add" : "remove"](t);
    else {
      var o = (" " + n.className + " ").replace(vi, " ").replace(" " + t + " ", " ");
      n.className = (o + (e ? " " + t : "")).replace(vi, " ");
    }
}
function R(n, t, e) {
  var o = n && n.style;
  if (o) {
    if (e === void 0)
      return document.defaultView && document.defaultView.getComputedStyle ? e = document.defaultView.getComputedStyle(n, "") : n.currentStyle && (e = n.currentStyle), t === void 0 ? e : e[t];
    !(t in o) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t), o[t] = e + (typeof e == "string" ? "" : "px");
  }
}
function Se(n, t) {
  var e = "";
  if (typeof n == "string")
    e = n;
  else
    do {
      var o = R(n, "transform");
      o && o !== "none" && (e = o + " " + e);
    } while (!t && (n = n.parentNode));
  var i = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return i && new i(e);
}
function lr(n, t, e) {
  if (n) {
    var o = n.getElementsByTagName(t), i = 0, r = o.length;
    if (e)
      for (; i < r; i++)
        e(o[i], i);
    return o;
  }
  return [];
}
function Ot() {
  var n = document.scrollingElement;
  return n || document.documentElement;
}
function nt(n, t, e, o, i) {
  if (!(!n.getBoundingClientRect && n !== window)) {
    var r, s, a, l, c, h, d;
    if (n !== window && n.parentNode && n !== Ot() ? (r = n.getBoundingClientRect(), s = r.top, a = r.left, l = r.bottom, c = r.right, h = r.height, d = r.width) : (s = 0, a = 0, l = window.innerHeight, c = window.innerWidth, h = window.innerHeight, d = window.innerWidth), (t || e) && n !== window && (i = i || n.parentNode, !Yt))
      do
        if (i && i.getBoundingClientRect && (R(i, "transform") !== "none" || e && R(i, "position") !== "static")) {
          var u = i.getBoundingClientRect();
          s -= u.top + parseInt(R(i, "border-top-width")), a -= u.left + parseInt(R(i, "border-left-width")), l = s + r.height, c = a + r.width;
          break;
        }
      while (i = i.parentNode);
    if (o && n !== window) {
      var f = Se(i || n), p = f && f.a, b = f && f.d;
      f && (s /= b, a /= p, d /= p, h /= b, l = s + h, c = a + d);
    }
    return {
      top: s,
      left: a,
      bottom: l,
      right: c,
      width: d,
      height: h
    };
  }
}
function wi(n, t, e) {
  for (var o = Xt(n, !0), i = nt(n)[t]; o; ) {
    var r = nt(o)[e], s = void 0;
    if (e === "top" || e === "left" ? s = i >= r : s = i <= r, !s)
      return o;
    if (o === Ot())
      break;
    o = Xt(o, !1);
  }
  return !1;
}
function _e(n, t, e, o) {
  for (var i = 0, r = 0, s = n.children; r < s.length; ) {
    if (s[r].style.display !== "none" && s[r] !== P.ghost && (o || s[r] !== P.dragged) && Mt(s[r], e.draggable, n, !1)) {
      if (i === t)
        return s[r];
      i++;
    }
    r++;
  }
  return null;
}
function In(n, t) {
  for (var e = n.lastElementChild; e && (e === P.ghost || R(e, "display") === "none" || t && !So(e, t)); )
    e = e.previousElementSibling;
  return e || null;
}
function yt(n, t) {
  var e = 0;
  if (!n || !n.parentNode)
    return -1;
  for (; n = n.previousElementSibling; )
    n.nodeName.toUpperCase() !== "TEMPLATE" && n !== P.clone && (!t || So(n, t)) && e++;
  return e;
}
function ki(n) {
  var t = 0, e = 0, o = Ot();
  if (n)
    do {
      var i = Se(n), r = i.a, s = i.d;
      t += n.scrollLeft * r, e += n.scrollTop * s;
    } while (n !== o && (n = n.parentNode));
  return [t, e];
}
function cl(n, t) {
  for (var e in n)
    if (n.hasOwnProperty(e)) {
      for (var o in t)
        if (t.hasOwnProperty(o) && t[o] === n[e][o])
          return Number(e);
    }
  return -1;
}
function Xt(n, t) {
  if (!n || !n.getBoundingClientRect)
    return Ot();
  var e = n, o = !1;
  do
    if (e.clientWidth < e.scrollWidth || e.clientHeight < e.scrollHeight) {
      var i = R(e);
      if (e.clientWidth < e.scrollWidth && (i.overflowX == "auto" || i.overflowX == "scroll") || e.clientHeight < e.scrollHeight && (i.overflowY == "auto" || i.overflowY == "scroll")) {
        if (!e.getBoundingClientRect || e === document.body)
          return Ot();
        if (o || t)
          return e;
        o = !0;
      }
    }
  while (e = e.parentNode);
  return Ot();
}
function dl(n, t) {
  if (n && t)
    for (var e in t)
      t.hasOwnProperty(e) && (n[e] = t[e]);
  return n;
}
function zo(n, t) {
  return Math.round(n.top) === Math.round(t.top) && Math.round(n.left) === Math.round(t.left) && Math.round(n.height) === Math.round(t.height) && Math.round(n.width) === Math.round(t.width);
}
var je;
function cr(n, t) {
  return function() {
    if (!je) {
      var e = arguments, o = this;
      e.length === 1 ? n.call(o, e[0]) : n.apply(o, e), je = setTimeout(function() {
        je = void 0;
      }, t);
    }
  };
}
function hl() {
  clearTimeout(je), je = void 0;
}
function dr(n, t, e) {
  n.scrollLeft += t, n.scrollTop += e;
}
function hr(n) {
  var t = window.Polymer, e = window.jQuery || window.Zepto;
  return t && t.dom ? t.dom(n).cloneNode(!0) : e ? e(n).clone(!0)[0] : n.cloneNode(!0);
}
var bt = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
function ul() {
  var n = [], t;
  return {
    captureAnimationState: function() {
      if (n = [], !!this.options.animation) {
        var o = [].slice.call(this.el.children);
        o.forEach(function(i) {
          if (!(R(i, "display") === "none" || i === P.ghost)) {
            n.push({
              target: i,
              rect: nt(i)
            });
            var r = Nt({}, n[n.length - 1].rect);
            if (i.thisAnimationDuration) {
              var s = Se(i, !0);
              s && (r.top -= s.f, r.left -= s.e);
            }
            i.fromRect = r;
          }
        });
      }
    },
    addAnimationState: function(o) {
      n.push(o);
    },
    removeAnimationState: function(o) {
      n.splice(cl(n, {
        target: o
      }), 1);
    },
    animateAll: function(o) {
      var i = this;
      if (!this.options.animation) {
        clearTimeout(t), typeof o == "function" && o();
        return;
      }
      var r = !1, s = 0;
      n.forEach(function(a) {
        var l = 0, c = a.target, h = c.fromRect, d = nt(c), u = c.prevFromRect, f = c.prevToRect, p = a.rect, b = Se(c, !0);
        b && (d.top -= b.f, d.left -= b.e), c.toRect = d, c.thisAnimationDuration && zo(u, d) && !zo(h, d) && // Make sure animatingRect is on line between toRect & fromRect
        (p.top - d.top) / (p.left - d.left) === (h.top - d.top) / (h.left - d.left) && (l = fl(p, u, f, i.options)), zo(d, h) || (c.prevFromRect = h, c.prevToRect = d, l || (l = i.options.animation), i.animate(c, p, d, l)), l && (r = !0, s = Math.max(s, l), clearTimeout(c.animationResetTimer), c.animationResetTimer = setTimeout(function() {
          c.animationTime = 0, c.prevFromRect = null, c.fromRect = null, c.prevToRect = null, c.thisAnimationDuration = null;
        }, l), c.thisAnimationDuration = l);
      }), clearTimeout(t), r ? t = setTimeout(function() {
        typeof o == "function" && o();
      }, s) : typeof o == "function" && o(), n = [];
    },
    animate: function(o, i, r, s) {
      if (s) {
        R(o, "transition", ""), R(o, "transform", "");
        var a = Se(this.el), l = a && a.a, c = a && a.d, h = (i.left - r.left) / (l || 1), d = (i.top - r.top) / (c || 1);
        o.animatingX = !!h, o.animatingY = !!d, R(o, "transform", "translate3d(" + h + "px," + d + "px,0)"), this.forRepaintDummy = pl(o), R(o, "transition", "transform " + s + "ms" + (this.options.easing ? " " + this.options.easing : "")), R(o, "transform", "translate3d(0,0,0)"), typeof o.animated == "number" && clearTimeout(o.animated), o.animated = setTimeout(function() {
          R(o, "transition", ""), R(o, "transform", ""), o.animated = !1, o.animatingX = !1, o.animatingY = !1;
        }, s);
      }
    }
  };
}
function pl(n) {
  return n.offsetWidth;
}
function fl(n, t, e, o) {
  return Math.sqrt(Math.pow(t.top - n.top, 2) + Math.pow(t.left - n.left, 2)) / Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) * o.animation;
}
var fe = [], Yo = {
  initializeByDefault: !0
}, eo = {
  mount: function(t) {
    for (var e in Yo)
      Yo.hasOwnProperty(e) && !(e in t) && (t[e] = Yo[e]);
    fe.forEach(function(o) {
      if (o.pluginName === t.pluginName)
        throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
    }), fe.push(t);
  },
  pluginEvent: function(t, e, o) {
    var i = this;
    this.eventCanceled = !1, o.cancel = function() {
      i.eventCanceled = !0;
    };
    var r = t + "Global";
    fe.forEach(function(s) {
      e[s.pluginName] && (e[s.pluginName][r] && e[s.pluginName][r](Nt({
        sortable: e
      }, o)), e.options[s.pluginName] && e[s.pluginName][t] && e[s.pluginName][t](Nt({
        sortable: e
      }, o)));
    });
  },
  initializePlugins: function(t, e, o, i) {
    fe.forEach(function(a) {
      var l = a.pluginName;
      if (!(!t.options[l] && !a.initializeByDefault)) {
        var c = new a(t, e, t.options);
        c.sortable = t, c.options = t.options, t[l] = c, Ft(o, c.defaults);
      }
    });
    for (var r in t.options)
      if (t.options.hasOwnProperty(r)) {
        var s = this.modifyOption(t, r, t.options[r]);
        typeof s < "u" && (t.options[r] = s);
      }
  },
  getEventProperties: function(t, e) {
    var o = {};
    return fe.forEach(function(i) {
      typeof i.eventProperties == "function" && Ft(o, i.eventProperties.call(e[i.pluginName], t));
    }), o;
  },
  modifyOption: function(t, e, o) {
    var i;
    return fe.forEach(function(r) {
      t[r.pluginName] && r.optionListeners && typeof r.optionListeners[e] == "function" && (i = r.optionListeners[e].call(t[r.pluginName], o));
    }), i;
  }
};
function gl(n) {
  var t = n.sortable, e = n.rootEl, o = n.name, i = n.targetEl, r = n.cloneEl, s = n.toEl, a = n.fromEl, l = n.oldIndex, c = n.newIndex, h = n.oldDraggableIndex, d = n.newDraggableIndex, u = n.originalEvent, f = n.putSortable, p = n.extraEventProperties;
  if (t = t || e && e[bt], !!t) {
    var b, O = t.options, B = "on" + o.charAt(0).toUpperCase() + o.substr(1);
    window.CustomEvent && !Yt && !to ? b = new CustomEvent(o, {
      bubbles: !0,
      cancelable: !0
    }) : (b = document.createEvent("Event"), b.initEvent(o, !0, !0)), b.to = s || e, b.from = a || e, b.item = i || e, b.clone = r, b.oldIndex = l, b.newIndex = c, b.oldDraggableIndex = h, b.newDraggableIndex = d, b.originalEvent = u, b.pullMode = f ? f.lastPutMode : void 0;
    var _ = Nt(Nt({}, p), eo.getEventProperties(o, t));
    for (var E in _)
      b[E] = _[E];
    e && e.dispatchEvent(b), O[B] && O[B].call(t, b);
  }
}
var ml = ["evt"], ut = function(t, e) {
  var o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = o.evt, r = sl(o, ml);
  eo.pluginEvent.bind(P)(t, e, Nt({
    dragEl: C,
    parentEl: J,
    ghostEl: j,
    rootEl: Z,
    nextEl: ee,
    lastDownEl: fo,
    cloneEl: q,
    cloneHidden: $t,
    dragStarted: Oe,
    putSortable: rt,
    activeSortable: P.active,
    originalEvent: i,
    oldIndex: ye,
    oldDraggableIndex: Ue,
    newIndex: mt,
    newDraggableIndex: Vt,
    hideGhostForTarget: gr,
    unhideGhostForTarget: mr,
    cloneNowHidden: function() {
      $t = !0;
    },
    cloneNowShown: function() {
      $t = !1;
    },
    dispatchSortableEvent: function(a) {
      dt({
        sortable: e,
        name: a,
        originalEvent: i
      });
    }
  }, r));
};
function dt(n) {
  gl(Nt({
    putSortable: rt,
    cloneEl: q,
    targetEl: C,
    rootEl: Z,
    oldIndex: ye,
    oldDraggableIndex: Ue,
    newIndex: mt,
    newDraggableIndex: Vt
  }, n));
}
var C, J, j, Z, ee, fo, q, $t, ye, mt, Ue, Vt, ao, rt, be = !1, Co = !1, To = [], Qt, Et, Vo, $o, yi, xi, Oe, ge, ze, Ye = !1, lo = !1, go, at, Wo = [], rn = !1, Bo = [], Do = typeof document < "u", co = rr, Ei = to || Yt ? "cssFloat" : "float", bl = Do && !sr && !rr && "draggable" in document.createElement("div"), ur = function() {
  if (Do) {
    if (Yt)
      return !1;
    var n = document.createElement("x");
    return n.style.cssText = "pointer-events:auto", n.style.pointerEvents === "auto";
  }
}(), pr = function(t, e) {
  var o = R(t), i = parseInt(o.width) - parseInt(o.paddingLeft) - parseInt(o.paddingRight) - parseInt(o.borderLeftWidth) - parseInt(o.borderRightWidth), r = _e(t, 0, e), s = _e(t, 1, e), a = r && R(r), l = s && R(s), c = a && parseInt(a.marginLeft) + parseInt(a.marginRight) + nt(r).width, h = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + nt(s).width;
  if (o.display === "flex")
    return o.flexDirection === "column" || o.flexDirection === "column-reverse" ? "vertical" : "horizontal";
  if (o.display === "grid")
    return o.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
  if (r && a.float && a.float !== "none") {
    var d = a.float === "left" ? "left" : "right";
    return s && (l.clear === "both" || l.clear === d) ? "vertical" : "horizontal";
  }
  return r && (a.display === "block" || a.display === "flex" || a.display === "table" || a.display === "grid" || c >= i && o[Ei] === "none" || s && o[Ei] === "none" && c + h > i) ? "vertical" : "horizontal";
}, vl = function(t, e, o) {
  var i = o ? t.left : t.top, r = o ? t.right : t.bottom, s = o ? t.width : t.height, a = o ? e.left : e.top, l = o ? e.right : e.bottom, c = o ? e.width : e.height;
  return i === a || r === l || i + s / 2 === a + c / 2;
}, wl = function(t, e) {
  var o;
  return To.some(function(i) {
    var r = i[bt].options.emptyInsertThreshold;
    if (!(!r || In(i))) {
      var s = nt(i), a = t >= s.left - r && t <= s.right + r, l = e >= s.top - r && e <= s.bottom + r;
      if (a && l)
        return o = i;
    }
  }), o;
}, fr = function(t) {
  function e(r, s) {
    return function(a, l, c, h) {
      var d = a.options.group.name && l.options.group.name && a.options.group.name === l.options.group.name;
      if (r == null && (s || d))
        return !0;
      if (r == null || r === !1)
        return !1;
      if (s && r === "clone")
        return r;
      if (typeof r == "function")
        return e(r(a, l, c, h), s)(a, l, c, h);
      var u = (s ? a : l).options.group.name;
      return r === !0 || typeof r == "string" && r === u || r.join && r.indexOf(u) > -1;
    };
  }
  var o = {}, i = t.group;
  (!i || po(i) != "object") && (i = {
    name: i
  }), o.name = i.name, o.checkPull = e(i.pull, !0), o.checkPut = e(i.put), o.revertClone = i.revertClone, t.group = o;
}, gr = function() {
  !ur && j && R(j, "display", "none");
}, mr = function() {
  !ur && j && R(j, "display", "");
};
Do && !sr && document.addEventListener("click", function(n) {
  if (Co)
    return n.preventDefault(), n.stopPropagation && n.stopPropagation(), n.stopImmediatePropagation && n.stopImmediatePropagation(), Co = !1, !1;
}, !0);
var te = function(t) {
  if (C) {
    t = t.touches ? t.touches[0] : t;
    var e = wl(t.clientX, t.clientY);
    if (e) {
      var o = {};
      for (var i in t)
        t.hasOwnProperty(i) && (o[i] = t[i]);
      o.target = o.rootEl = e, o.preventDefault = void 0, o.stopPropagation = void 0, e[bt]._onDragOver(o);
    }
  }
}, kl = function(t) {
  C && C.parentNode[bt]._isOutsideThisEl(t.target);
};
function P(n, t) {
  if (!(n && n.nodeType && n.nodeType === 1))
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(n));
  this.el = n, this.options = t = Ft({}, t), n[bt] = this;
  var e = {
    group: null,
    sort: !0,
    disabled: !1,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(n.nodeName) ? ">li" : ">*",
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: !1,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: !0,
    direction: function() {
      return pr(n, this.options);
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
    supportPointer: P.supportPointer !== !1 && "PointerEvent" in window && !He,
    emptyInsertThreshold: 5
  };
  eo.initializePlugins(this, n, e);
  for (var o in e)
    !(o in t) && (t[o] = e[o]);
  fr(t);
  for (var i in this)
    i.charAt(0) === "_" && typeof this[i] == "function" && (this[i] = this[i].bind(this));
  this.nativeDraggable = t.forceFallback ? !1 : bl, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? W(n, "pointerdown", this._onTapStart) : (W(n, "mousedown", this._onTapStart), W(n, "touchstart", this._onTapStart)), this.nativeDraggable && (W(n, "dragover", this), W(n, "dragenter", this)), To.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), Ft(this, ul());
}
P.prototype = /** @lends Sortable.prototype */
{
  constructor: P,
  _isOutsideThisEl: function(t) {
    !this.el.contains(t) && t !== this.el && (ge = null);
  },
  _getDirection: function(t, e) {
    return typeof this.options.direction == "function" ? this.options.direction.call(this, t, e, C) : this.options.direction;
  },
  _onTapStart: function(t) {
    if (t.cancelable) {
      var e = this, o = this.el, i = this.options, r = i.preventOnFilter, s = t.type, a = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, l = (a || t).target, c = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || l, h = i.filter;
      if (_l(o), !C && !(/mousedown|pointerdown/.test(s) && t.button !== 0 || i.disabled) && !c.isContentEditable && !(!this.nativeDraggable && He && l && l.tagName.toUpperCase() === "SELECT") && (l = Mt(l, i.draggable, o, !1), !(l && l.animated) && fo !== l)) {
        if (ye = yt(l), Ue = yt(l, i.draggable), typeof h == "function") {
          if (h.call(this, t, l, this)) {
            dt({
              sortable: e,
              rootEl: c,
              name: "filter",
              targetEl: l,
              toEl: o,
              fromEl: o
            }), ut("filter", e, {
              evt: t
            }), r && t.cancelable && t.preventDefault();
            return;
          }
        } else if (h && (h = h.split(",").some(function(d) {
          if (d = Mt(c, d.trim(), o, !1), d)
            return dt({
              sortable: e,
              rootEl: d,
              name: "filter",
              targetEl: l,
              fromEl: o,
              toEl: o
            }), ut("filter", e, {
              evt: t
            }), !0;
        }), h)) {
          r && t.cancelable && t.preventDefault();
          return;
        }
        i.handle && !Mt(c, i.handle, o, !1) || this._prepareDragStart(t, a, l);
      }
    }
  },
  _prepareDragStart: function(t, e, o) {
    var i = this, r = i.el, s = i.options, a = r.ownerDocument, l;
    if (o && !C && o.parentNode === r) {
      var c = nt(o);
      if (Z = r, C = o, J = C.parentNode, ee = C.nextSibling, fo = o, ao = s.group, P.dragged = C, Qt = {
        target: C,
        clientX: (e || t).clientX,
        clientY: (e || t).clientY
      }, yi = Qt.clientX - c.left, xi = Qt.clientY - c.top, this._lastX = (e || t).clientX, this._lastY = (e || t).clientY, C.style["will-change"] = "all", l = function() {
        if (ut("delayEnded", i, {
          evt: t
        }), P.eventCanceled) {
          i._onDrop();
          return;
        }
        i._disableDelayedDragEvents(), !bi && i.nativeDraggable && (C.draggable = !0), i._triggerDragStart(t, e), dt({
          sortable: i,
          name: "choose",
          originalEvent: t
        }), gt(C, s.chosenClass, !0);
      }, s.ignore.split(",").forEach(function(h) {
        lr(C, h.trim(), Xo);
      }), W(a, "dragover", te), W(a, "mousemove", te), W(a, "touchmove", te), W(a, "mouseup", i._onDrop), W(a, "touchend", i._onDrop), W(a, "touchcancel", i._onDrop), bi && this.nativeDraggable && (this.options.touchStartThreshold = 4, C.draggable = !0), ut("delayStart", this, {
        evt: t
      }), s.delay && (!s.delayOnTouchOnly || e) && (!this.nativeDraggable || !(to || Yt))) {
        if (P.eventCanceled) {
          this._onDrop();
          return;
        }
        W(a, "mouseup", i._disableDelayedDrag), W(a, "touchend", i._disableDelayedDrag), W(a, "touchcancel", i._disableDelayedDrag), W(a, "mousemove", i._delayedDragTouchMoveHandler), W(a, "touchmove", i._delayedDragTouchMoveHandler), s.supportPointer && W(a, "pointermove", i._delayedDragTouchMoveHandler), i._dragStartTimer = setTimeout(l, s.delay);
      } else
        l();
    }
  },
  _delayedDragTouchMoveHandler: function(t) {
    var e = t.touches ? t.touches[0] : t;
    Math.max(Math.abs(e.clientX - this._lastX), Math.abs(e.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
  },
  _disableDelayedDrag: function() {
    C && Xo(C), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function() {
    var t = this.el.ownerDocument;
    $(t, "mouseup", this._disableDelayedDrag), $(t, "touchend", this._disableDelayedDrag), $(t, "touchcancel", this._disableDelayedDrag), $(t, "mousemove", this._delayedDragTouchMoveHandler), $(t, "touchmove", this._delayedDragTouchMoveHandler), $(t, "pointermove", this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function(t, e) {
    e = e || t.pointerType == "touch" && t, !this.nativeDraggable || e ? this.options.supportPointer ? W(document, "pointermove", this._onTouchMove) : e ? W(document, "touchmove", this._onTouchMove) : W(document, "mousemove", this._onTouchMove) : (W(C, "dragend", this), W(Z, "dragstart", this._onDragStart));
    try {
      document.selection ? mo(function() {
        document.selection.empty();
      }) : window.getSelection().removeAllRanges();
    } catch {
    }
  },
  _dragStarted: function(t, e) {
    if (be = !1, Z && C) {
      ut("dragStarted", this, {
        evt: e
      }), this.nativeDraggable && W(document, "dragover", kl);
      var o = this.options;
      !t && gt(C, o.dragClass, !1), gt(C, o.ghostClass, !0), P.active = this, t && this._appendGhost(), dt({
        sortable: this,
        name: "start",
        originalEvent: e
      });
    } else
      this._nulling();
  },
  _emulateDragOver: function() {
    if (Et) {
      this._lastX = Et.clientX, this._lastY = Et.clientY, gr();
      for (var t = document.elementFromPoint(Et.clientX, Et.clientY), e = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(Et.clientX, Et.clientY), t !== e); )
        e = t;
      if (C.parentNode[bt]._isOutsideThisEl(t), e)
        do {
          if (e[bt]) {
            var o = void 0;
            if (o = e[bt]._onDragOver({
              clientX: Et.clientX,
              clientY: Et.clientY,
              target: t,
              rootEl: e
            }), o && !this.options.dragoverBubble)
              break;
          }
          t = e;
        } while (e = e.parentNode);
      mr();
    }
  },
  _onTouchMove: function(t) {
    if (Qt) {
      var e = this.options, o = e.fallbackTolerance, i = e.fallbackOffset, r = t.touches ? t.touches[0] : t, s = j && Se(j, !0), a = j && s && s.a, l = j && s && s.d, c = co && at && ki(at), h = (r.clientX - Qt.clientX + i.x) / (a || 1) + (c ? c[0] - Wo[0] : 0) / (a || 1), d = (r.clientY - Qt.clientY + i.y) / (l || 1) + (c ? c[1] - Wo[1] : 0) / (l || 1);
      if (!P.active && !be) {
        if (o && Math.max(Math.abs(r.clientX - this._lastX), Math.abs(r.clientY - this._lastY)) < o)
          return;
        this._onDragStart(t, !0);
      }
      if (j) {
        s ? (s.e += h - (Vo || 0), s.f += d - ($o || 0)) : s = {
          a: 1,
          b: 0,
          c: 0,
          d: 1,
          e: h,
          f: d
        };
        var u = "matrix(".concat(s.a, ",").concat(s.b, ",").concat(s.c, ",").concat(s.d, ",").concat(s.e, ",").concat(s.f, ")");
        R(j, "webkitTransform", u), R(j, "mozTransform", u), R(j, "msTransform", u), R(j, "transform", u), Vo = h, $o = d, Et = r;
      }
      t.cancelable && t.preventDefault();
    }
  },
  _appendGhost: function() {
    if (!j) {
      var t = this.options.fallbackOnBody ? document.body : Z, e = nt(C, !0, co, !0, t), o = this.options;
      if (co) {
        for (at = t; R(at, "position") === "static" && R(at, "transform") === "none" && at !== document; )
          at = at.parentNode;
        at !== document.body && at !== document.documentElement ? (at === document && (at = Ot()), e.top += at.scrollTop, e.left += at.scrollLeft) : at = Ot(), Wo = ki(at);
      }
      j = C.cloneNode(!0), gt(j, o.ghostClass, !1), gt(j, o.fallbackClass, !0), gt(j, o.dragClass, !0), R(j, "transition", ""), R(j, "transform", ""), R(j, "box-sizing", "border-box"), R(j, "margin", 0), R(j, "top", e.top), R(j, "left", e.left), R(j, "width", e.width), R(j, "height", e.height), R(j, "opacity", "0.8"), R(j, "position", co ? "absolute" : "fixed"), R(j, "zIndex", "100000"), R(j, "pointerEvents", "none"), P.ghost = j, t.appendChild(j), R(j, "transform-origin", yi / parseInt(j.style.width) * 100 + "% " + xi / parseInt(j.style.height) * 100 + "%");
    }
  },
  _onDragStart: function(t, e) {
    var o = this, i = t.dataTransfer, r = o.options;
    if (ut("dragStart", this, {
      evt: t
    }), P.eventCanceled) {
      this._onDrop();
      return;
    }
    ut("setupClone", this), P.eventCanceled || (q = hr(C), q.removeAttribute("id"), q.draggable = !1, q.style["will-change"] = "", this._hideClone(), gt(q, this.options.chosenClass, !1), P.clone = q), o.cloneId = mo(function() {
      ut("clone", o), !P.eventCanceled && (o.options.removeCloneOnHide || Z.insertBefore(q, C), o._hideClone(), dt({
        sortable: o,
        name: "clone"
      }));
    }), !e && gt(C, r.dragClass, !0), e ? (Co = !0, o._loopId = setInterval(o._emulateDragOver, 50)) : ($(document, "mouseup", o._onDrop), $(document, "touchend", o._onDrop), $(document, "touchcancel", o._onDrop), i && (i.effectAllowed = "move", r.setData && r.setData.call(o, i, C)), W(document, "drop", o), R(C, "transform", "translateZ(0)")), be = !0, o._dragStartId = mo(o._dragStarted.bind(o, e, t)), W(document, "selectstart", o), Oe = !0, He && R(document.body, "user-select", "none");
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function(t) {
    var e = this.el, o = t.target, i, r, s, a = this.options, l = a.group, c = P.active, h = ao === l, d = a.sort, u = rt || c, f, p = this, b = !1;
    if (rn)
      return;
    function O(U, ft) {
      ut(U, p, Nt({
        evt: t,
        isOwner: h,
        axis: f ? "vertical" : "horizontal",
        revert: s,
        dragRect: i,
        targetRect: r,
        canSort: d,
        fromSortable: u,
        target: o,
        completed: _,
        onMove: function(io, ro) {
          return ho(Z, e, C, i, io, nt(io), t, ro);
        },
        changed: E
      }, ft));
    }
    function B() {
      O("dragOverAnimationCapture"), p.captureAnimationState(), p !== u && u.captureAnimationState();
    }
    function _(U) {
      return O("dragOverCompleted", {
        insertion: U
      }), U && (h ? c._hideClone() : c._showClone(p), p !== u && (gt(C, rt ? rt.options.ghostClass : c.options.ghostClass, !1), gt(C, a.ghostClass, !0)), rt !== p && p !== P.active ? rt = p : p === P.active && rt && (rt = null), u === p && (p._ignoreWhileAnimating = o), p.animateAll(function() {
        O("dragOverAnimationComplete"), p._ignoreWhileAnimating = null;
      }), p !== u && (u.animateAll(), u._ignoreWhileAnimating = null)), (o === C && !C.animated || o === e && !o.animated) && (ge = null), !a.dragoverBubble && !t.rootEl && o !== document && (C.parentNode[bt]._isOutsideThisEl(t.target), !U && te(t)), !a.dragoverBubble && t.stopPropagation && t.stopPropagation(), b = !0;
    }
    function E() {
      mt = yt(C), Vt = yt(C, a.draggable), dt({
        sortable: p,
        name: "change",
        toEl: e,
        newIndex: mt,
        newDraggableIndex: Vt,
        originalEvent: t
      });
    }
    if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), o = Mt(o, a.draggable, e, !0), O("dragOver"), P.eventCanceled)
      return b;
    if (C.contains(t.target) || o.animated && o.animatingX && o.animatingY || p._ignoreWhileAnimating === o)
      return _(!1);
    if (Co = !1, c && !a.disabled && (h ? d || (s = J !== Z) : rt === this || (this.lastPutMode = ao.checkPull(this, c, C, t)) && l.checkPut(this, c, C, t))) {
      if (f = this._getDirection(t, o) === "vertical", i = nt(C), O("dragOverValid"), P.eventCanceled)
        return b;
      if (s)
        return J = Z, B(), this._hideClone(), O("revert"), P.eventCanceled || (ee ? Z.insertBefore(C, ee) : Z.appendChild(C)), _(!0);
      var v = In(e, a.draggable);
      if (!v || Sl(t, f, this) && !v.animated) {
        if (v === C)
          return _(!1);
        if (v && e === t.target && (o = v), o && (r = nt(o)), ho(Z, e, C, i, o, r, t, !!o) !== !1)
          return B(), v && v.nextSibling ? e.insertBefore(C, v.nextSibling) : e.appendChild(C), J = e, E(), _(!0);
      } else if (v && El(t, f, this)) {
        var m = _e(e, 0, a, !0);
        if (m === C)
          return _(!1);
        if (o = m, r = nt(o), ho(Z, e, C, i, o, r, t, !1) !== !1)
          return B(), e.insertBefore(C, m), J = e, E(), _(!0);
      } else if (o.parentNode === e) {
        r = nt(o);
        var T = 0, D, S = C.parentNode !== e, y = !vl(C.animated && C.toRect || i, o.animated && o.toRect || r, f), A = f ? "top" : "left", w = wi(o, "top", "top") || wi(C, "top", "top"), k = w ? w.scrollTop : void 0;
        ge !== o && (D = r[A], Ye = !1, lo = !y && a.invertSwap || S), T = Cl(t, o, r, f, y ? 1 : a.swapThreshold, a.invertedSwapThreshold == null ? a.swapThreshold : a.invertedSwapThreshold, lo, ge === o);
        var x;
        if (T !== 0) {
          var M = yt(C);
          do
            M -= T, x = J.children[M];
          while (x && (R(x, "display") === "none" || x === j));
        }
        if (T === 0 || x === o)
          return _(!1);
        ge = o, ze = T;
        var I = o.nextElementSibling, L = !1;
        L = T === 1;
        var Y = ho(Z, e, C, i, o, r, t, L);
        if (Y !== !1)
          return (Y === 1 || Y === -1) && (L = Y === 1), rn = !0, setTimeout(xl, 30), B(), L && !I ? e.appendChild(C) : o.parentNode.insertBefore(C, L ? I : o), w && dr(w, 0, k - w.scrollTop), J = C.parentNode, D !== void 0 && !lo && (go = Math.abs(D - nt(o)[A])), E(), _(!0);
      }
      if (e.contains(C))
        return _(!1);
    }
    return !1;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function() {
    $(document, "mousemove", this._onTouchMove), $(document, "touchmove", this._onTouchMove), $(document, "pointermove", this._onTouchMove), $(document, "dragover", te), $(document, "mousemove", te), $(document, "touchmove", te);
  },
  _offUpEvents: function() {
    var t = this.el.ownerDocument;
    $(t, "mouseup", this._onDrop), $(t, "touchend", this._onDrop), $(t, "pointerup", this._onDrop), $(t, "touchcancel", this._onDrop), $(document, "selectstart", this);
  },
  _onDrop: function(t) {
    var e = this.el, o = this.options;
    if (mt = yt(C), Vt = yt(C, o.draggable), ut("drop", this, {
      evt: t
    }), J = C && C.parentNode, mt = yt(C), Vt = yt(C, o.draggable), P.eventCanceled) {
      this._nulling();
      return;
    }
    be = !1, lo = !1, Ye = !1, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), sn(this.cloneId), sn(this._dragStartId), this.nativeDraggable && ($(document, "drop", this), $(e, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), He && R(document.body, "user-select", ""), R(C, "transform", ""), t && (Oe && (t.cancelable && t.preventDefault(), !o.dropBubble && t.stopPropagation()), j && j.parentNode && j.parentNode.removeChild(j), (Z === J || rt && rt.lastPutMode !== "clone") && q && q.parentNode && q.parentNode.removeChild(q), C && (this.nativeDraggable && $(C, "dragend", this), Xo(C), C.style["will-change"] = "", Oe && !be && gt(C, rt ? rt.options.ghostClass : this.options.ghostClass, !1), gt(C, this.options.chosenClass, !1), dt({
      sortable: this,
      name: "unchoose",
      toEl: J,
      newIndex: null,
      newDraggableIndex: null,
      originalEvent: t
    }), Z !== J ? (mt >= 0 && (dt({
      rootEl: J,
      name: "add",
      toEl: J,
      fromEl: Z,
      originalEvent: t
    }), dt({
      sortable: this,
      name: "remove",
      toEl: J,
      originalEvent: t
    }), dt({
      rootEl: J,
      name: "sort",
      toEl: J,
      fromEl: Z,
      originalEvent: t
    }), dt({
      sortable: this,
      name: "sort",
      toEl: J,
      originalEvent: t
    })), rt && rt.save()) : mt !== ye && mt >= 0 && (dt({
      sortable: this,
      name: "update",
      toEl: J,
      originalEvent: t
    }), dt({
      sortable: this,
      name: "sort",
      toEl: J,
      originalEvent: t
    })), P.active && ((mt == null || mt === -1) && (mt = ye, Vt = Ue), dt({
      sortable: this,
      name: "end",
      toEl: J,
      originalEvent: t
    }), this.save()))), this._nulling();
  },
  _nulling: function() {
    ut("nulling", this), Z = C = J = j = ee = q = fo = $t = Qt = Et = Oe = mt = Vt = ye = Ue = ge = ze = rt = ao = P.dragged = P.ghost = P.clone = P.active = null, Bo.forEach(function(t) {
      t.checked = !0;
    }), Bo.length = Vo = $o = 0;
  },
  handleEvent: function(t) {
    switch (t.type) {
      case "drop":
      case "dragend":
        this._onDrop(t);
        break;
      case "dragenter":
      case "dragover":
        C && (this._onDragOver(t), yl(t));
        break;
      case "selectstart":
        t.preventDefault();
        break;
    }
  },
  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function() {
    for (var t = [], e, o = this.el.children, i = 0, r = o.length, s = this.options; i < r; i++)
      e = o[i], Mt(e, s.draggable, this.el, !1) && t.push(e.getAttribute(s.dataIdAttr) || Bl(e));
    return t;
  },
  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function(t, e) {
    var o = {}, i = this.el;
    this.toArray().forEach(function(r, s) {
      var a = i.children[s];
      Mt(a, this.options.draggable, i, !1) && (o[r] = a);
    }, this), e && this.captureAnimationState(), t.forEach(function(r) {
      o[r] && (i.removeChild(o[r]), i.appendChild(o[r]));
    }), e && this.animateAll();
  },
  /**
   * Save the current sorting
   */
  save: function() {
    var t = this.options.store;
    t && t.set && t.set(this);
  },
  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function(t, e) {
    return Mt(t, e || this.options.draggable, this.el, !1);
  },
  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function(t, e) {
    var o = this.options;
    if (e === void 0)
      return o[t];
    var i = eo.modifyOption(this, t, e);
    typeof i < "u" ? o[t] = i : o[t] = e, t === "group" && fr(o);
  },
  /**
   * Destroy
   */
  destroy: function() {
    ut("destroy", this);
    var t = this.el;
    t[bt] = null, $(t, "mousedown", this._onTapStart), $(t, "touchstart", this._onTapStart), $(t, "pointerdown", this._onTapStart), this.nativeDraggable && ($(t, "dragover", this), $(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(e) {
      e.removeAttribute("draggable");
    }), this._onDrop(), this._disableDelayedDragEvents(), To.splice(To.indexOf(this.el), 1), this.el = t = null;
  },
  _hideClone: function() {
    if (!$t) {
      if (ut("hideClone", this), P.eventCanceled)
        return;
      R(q, "display", "none"), this.options.removeCloneOnHide && q.parentNode && q.parentNode.removeChild(q), $t = !0;
    }
  },
  _showClone: function(t) {
    if (t.lastPutMode !== "clone") {
      this._hideClone();
      return;
    }
    if ($t) {
      if (ut("showClone", this), P.eventCanceled)
        return;
      C.parentNode == Z && !this.options.group.revertClone ? Z.insertBefore(q, C) : ee ? Z.insertBefore(q, ee) : Z.appendChild(q), this.options.group.revertClone && this.animate(C, q), R(q, "display", ""), $t = !1;
    }
  }
};
function yl(n) {
  n.dataTransfer && (n.dataTransfer.dropEffect = "move"), n.cancelable && n.preventDefault();
}
function ho(n, t, e, o, i, r, s, a) {
  var l, c = n[bt], h = c.options.onMove, d;
  return window.CustomEvent && !Yt && !to ? l = new CustomEvent("move", {
    bubbles: !0,
    cancelable: !0
  }) : (l = document.createEvent("Event"), l.initEvent("move", !0, !0)), l.to = t, l.from = n, l.dragged = e, l.draggedRect = o, l.related = i || t, l.relatedRect = r || nt(t), l.willInsertAfter = a, l.originalEvent = s, n.dispatchEvent(l), h && (d = h.call(c, l, s)), d;
}
function Xo(n) {
  n.draggable = !1;
}
function xl() {
  rn = !1;
}
function El(n, t, e) {
  var o = nt(_e(e.el, 0, e.options, !0)), i = 10;
  return t ? n.clientX < o.left - i || n.clientY < o.top && n.clientX < o.right : n.clientY < o.top - i || n.clientY < o.bottom && n.clientX < o.left;
}
function Sl(n, t, e) {
  var o = nt(In(e.el, e.options.draggable)), i = 10;
  return t ? n.clientX > o.right + i || n.clientX <= o.right && n.clientY > o.bottom && n.clientX >= o.left : n.clientX > o.right && n.clientY > o.top || n.clientX <= o.right && n.clientY > o.bottom + i;
}
function Cl(n, t, e, o, i, r, s, a) {
  var l = o ? n.clientY : n.clientX, c = o ? e.height : e.width, h = o ? e.top : e.left, d = o ? e.bottom : e.right, u = !1;
  if (!s) {
    if (a && go < c * i) {
      if (!Ye && (ze === 1 ? l > h + c * r / 2 : l < d - c * r / 2) && (Ye = !0), Ye)
        u = !0;
      else if (ze === 1 ? l < h + go : l > d - go)
        return -ze;
    } else if (l > h + c * (1 - i) / 2 && l < d - c * (1 - i) / 2)
      return Tl(t);
  }
  return u = u || s, u && (l < h + c * r / 2 || l > d - c * r / 2) ? l > h + c / 2 ? 1 : -1 : 0;
}
function Tl(n) {
  return yt(C) < yt(n) ? 1 : -1;
}
function Bl(n) {
  for (var t = n.tagName + n.className + n.src + n.href + n.textContent, e = t.length, o = 0; e--; )
    o += t.charCodeAt(e);
  return o.toString(36);
}
function _l(n) {
  Bo.length = 0;
  for (var t = n.getElementsByTagName("input"), e = t.length; e--; ) {
    var o = t[e];
    o.checked && Bo.push(o);
  }
}
function mo(n) {
  return setTimeout(n, 0);
}
function sn(n) {
  return clearTimeout(n);
}
Do && W(document, "touchmove", function(n) {
  (P.active || be) && n.cancelable && n.preventDefault();
});
P.utils = {
  on: W,
  off: $,
  css: R,
  find: lr,
  is: function(t, e) {
    return !!Mt(t, e, t, !1);
  },
  extend: dl,
  throttle: cr,
  closest: Mt,
  toggleClass: gt,
  clone: hr,
  index: yt,
  nextTick: mo,
  cancelNextTick: sn,
  detectDirection: pr,
  getChild: _e
};
P.get = function(n) {
  return n[bt];
};
P.mount = function() {
  for (var n = arguments.length, t = new Array(n), e = 0; e < n; e++)
    t[e] = arguments[e];
  t[0].constructor === Array && (t = t[0]), t.forEach(function(o) {
    if (!o.prototype || !o.prototype.constructor)
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(o));
    o.utils && (P.utils = Nt(Nt({}, P.utils), o.utils)), eo.mount(o);
  });
};
P.create = function(n, t) {
  return new P(n, t);
};
P.version = al;
var et = [], Ae, an, ln = !1, Ko, Go, _o, Le;
function Il() {
  function n() {
    this.defaults = {
      scroll: !0,
      forceAutoScrollFallback: !1,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: !0
    };
    for (var t in this)
      t.charAt(0) === "_" && typeof this[t] == "function" && (this[t] = this[t].bind(this));
  }
  return n.prototype = {
    dragStarted: function(e) {
      var o = e.originalEvent;
      this.sortable.nativeDraggable ? W(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? W(document, "pointermove", this._handleFallbackAutoScroll) : o.touches ? W(document, "touchmove", this._handleFallbackAutoScroll) : W(document, "mousemove", this._handleFallbackAutoScroll);
    },
    dragOverCompleted: function(e) {
      var o = e.originalEvent;
      !this.options.dragOverBubble && !o.rootEl && this._handleAutoScroll(o);
    },
    drop: function() {
      this.sortable.nativeDraggable ? $(document, "dragover", this._handleAutoScroll) : ($(document, "pointermove", this._handleFallbackAutoScroll), $(document, "touchmove", this._handleFallbackAutoScroll), $(document, "mousemove", this._handleFallbackAutoScroll)), Si(), bo(), hl();
    },
    nulling: function() {
      _o = an = Ae = ln = Le = Ko = Go = null, et.length = 0;
    },
    _handleFallbackAutoScroll: function(e) {
      this._handleAutoScroll(e, !0);
    },
    _handleAutoScroll: function(e, o) {
      var i = this, r = (e.touches ? e.touches[0] : e).clientX, s = (e.touches ? e.touches[0] : e).clientY, a = document.elementFromPoint(r, s);
      if (_o = e, o || this.options.forceAutoScrollFallback || to || Yt || He) {
        Zo(e, this.options, a, o);
        var l = Xt(a, !0);
        ln && (!Le || r !== Ko || s !== Go) && (Le && Si(), Le = setInterval(function() {
          var c = Xt(document.elementFromPoint(r, s), !0);
          c !== l && (l = c, bo()), Zo(e, i.options, c, o);
        }, 10), Ko = r, Go = s);
      } else {
        if (!this.options.bubbleScroll || Xt(a, !0) === Ot()) {
          bo();
          return;
        }
        Zo(e, this.options, Xt(a, !1), !1);
      }
    }
  }, Ft(n, {
    pluginName: "scroll",
    initializeByDefault: !0
  });
}
function bo() {
  et.forEach(function(n) {
    clearInterval(n.pid);
  }), et = [];
}
function Si() {
  clearInterval(Le);
}
var Zo = cr(function(n, t, e, o) {
  if (t.scroll) {
    var i = (n.touches ? n.touches[0] : n).clientX, r = (n.touches ? n.touches[0] : n).clientY, s = t.scrollSensitivity, a = t.scrollSpeed, l = Ot(), c = !1, h;
    an !== e && (an = e, bo(), Ae = t.scroll, h = t.scrollFn, Ae === !0 && (Ae = Xt(e, !0)));
    var d = 0, u = Ae;
    do {
      var f = u, p = nt(f), b = p.top, O = p.bottom, B = p.left, _ = p.right, E = p.width, v = p.height, m = void 0, T = void 0, D = f.scrollWidth, S = f.scrollHeight, y = R(f), A = f.scrollLeft, w = f.scrollTop;
      f === l ? (m = E < D && (y.overflowX === "auto" || y.overflowX === "scroll" || y.overflowX === "visible"), T = v < S && (y.overflowY === "auto" || y.overflowY === "scroll" || y.overflowY === "visible")) : (m = E < D && (y.overflowX === "auto" || y.overflowX === "scroll"), T = v < S && (y.overflowY === "auto" || y.overflowY === "scroll"));
      var k = m && (Math.abs(_ - i) <= s && A + E < D) - (Math.abs(B - i) <= s && !!A), x = T && (Math.abs(O - r) <= s && w + v < S) - (Math.abs(b - r) <= s && !!w);
      if (!et[d])
        for (var M = 0; M <= d; M++)
          et[M] || (et[M] = {});
      (et[d].vx != k || et[d].vy != x || et[d].el !== f) && (et[d].el = f, et[d].vx = k, et[d].vy = x, clearInterval(et[d].pid), (k != 0 || x != 0) && (c = !0, et[d].pid = setInterval(function() {
        o && this.layer === 0 && P.active._onTouchMove(_o);
        var I = et[this.layer].vy ? et[this.layer].vy * a : 0, L = et[this.layer].vx ? et[this.layer].vx * a : 0;
        typeof h == "function" && h.call(P.dragged.parentNode[bt], L, I, n, _o, et[this.layer].el) !== "continue" || dr(et[this.layer].el, L, I);
      }.bind({
        layer: d
      }), 24))), d++;
    } while (t.bubbleScroll && u !== l && (u = Xt(u, !1)));
    ln = c;
  }
}, 30), br = function(t) {
  var e = t.originalEvent, o = t.putSortable, i = t.dragEl, r = t.activeSortable, s = t.dispatchSortableEvent, a = t.hideGhostForTarget, l = t.unhideGhostForTarget;
  if (e) {
    var c = o || r;
    a();
    var h = e.changedTouches && e.changedTouches.length ? e.changedTouches[0] : e, d = document.elementFromPoint(h.clientX, h.clientY);
    l(), c && !c.el.contains(d) && (s("spill"), this.onSpill({
      dragEl: i,
      putSortable: o
    }));
  }
};
function Mn() {
}
Mn.prototype = {
  startIndex: null,
  dragStart: function(t) {
    var e = t.oldDraggableIndex;
    this.startIndex = e;
  },
  onSpill: function(t) {
    var e = t.dragEl, o = t.putSortable;
    this.sortable.captureAnimationState(), o && o.captureAnimationState();
    var i = _e(this.sortable.el, this.startIndex, this.options);
    i ? this.sortable.el.insertBefore(e, i) : this.sortable.el.appendChild(e), this.sortable.animateAll(), o && o.animateAll();
  },
  drop: br
};
Ft(Mn, {
  pluginName: "revertOnSpill"
});
function On() {
}
On.prototype = {
  onSpill: function(t) {
    var e = t.dragEl, o = t.putSortable, i = o || this.sortable;
    i.captureAnimationState(), e.parentNode && e.parentNode.removeChild(e), i.animateAll();
  },
  drop: br
};
Ft(On, {
  pluginName: "removeOnSpill"
});
P.mount(new Il());
P.mount(On, Mn);
function Ml() {
  return {
    $template: "#title-input"
  };
}
function Ol() {
  return {
    $template: "#content-input"
  };
}
const oo = "https://product-tour-backend-t3v73.ondigitalocean.app";
async function vr(n, t) {
  const e = t ?? window.location.origin + window.location.pathname, o = btoa(e), i = await fetch(
    oo + "/tour/url/" + n + "/" + o
  );
  if (i.status !== 200)
    throw console.warn(
      "An error occured while fetching the product tour",
      await i.json()
    ), new Error("An error occured while fetching the product tour");
  const r = await i.json();
  return r.length === 0 && !e.endsWith("/") ? vr(n, e + "/") : r[0];
}
async function Al(n) {
  const t = await fetch(oo + "/tour/" + n);
  if (t.status !== 200)
    throw console.warn(
      "An error occured while updating steps",
      await t.json()
    ), new Error("An error occured while updating steps");
  return (await t.json())[0].steps;
}
async function Ll(n, t, e) {
  const o = await fetch(oo + "/tour/steps/" + t, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + n,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ steps: e })
  });
  if (o.status !== 200)
    throw console.warn(
      "An error occured while updating steps",
      await o.json()
    ), new Error("An error occured while updating steps");
}
async function wr(n) {
  if (!(!n.target.files || n.target.files.length === 0))
    try {
      const t = new FormData();
      t.set("files", n.target.files[0]), t.set("project_id", F.projectId);
      const e = await fetch(oo + "/upload", {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + F.accessToken
        },
        body: t
      });
      if (e.status !== 200)
        throw console.warn(
          "An error occured while uploading the image",
          e
        ), new Error("An error occured while uploading the image");
      return e;
    } catch (t) {
      console.error(t);
    }
}
function Ci() {
  return {
    $template: "#image-input",
    async uploadImage(n) {
      const t = await wr(n);
      F.newStep.mediaURL = await (t == null ? void 0 : t.text());
    },
    addImageStep() {
      !F.newStep.mediaURL || !F.newStep.title || (F.newStep.content += `<br /><img src="${F.newStep.mediaURL}" style="width: 100%; margin-top: 1rem;" />`, F.addNewStep());
    }
  };
}
function Ti() {
  return {
    $template: "#video-input",
    async uploadVideo(n) {
      const t = await wr(n);
      F.newStep.mediaURL = await (t == null ? void 0 : t.text());
    },
    addVideoStep() {
      !F.newStep.mediaURL || !F.newStep.title || (F.newStep.content += `
              <br />
              <video style="width: 100%; margin-top: 1rem" autoplay controls>
                <source src="${F.newStep.mediaURL}" type="video/mp4">
                Your browser does not support the video tag.
              </video>
          `, F.addNewStep());
    }
  };
}
function Nl() {
  return {
    $template: "#banner-input"
  };
}
var Dl = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ro(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
function qo() {
}
Object.assign(qo, {
  default: qo,
  register: qo,
  revert: function() {
  },
  __esModule: !0
});
Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(n) {
  const t = (this.document || this.ownerDocument).querySelectorAll(n);
  let e = t.length;
  for (; --e >= 0 && t.item(e) !== this; )
    ;
  return e > -1;
});
Element.prototype.closest || (Element.prototype.closest = function(n) {
  let t = this;
  if (!document.documentElement.contains(t))
    return null;
  do {
    if (t.matches(n))
      return t;
    t = t.parentElement || t.parentNode;
  } while (t !== null);
  return null;
});
Element.prototype.prepend || (Element.prototype.prepend = function(n) {
  const t = document.createDocumentFragment();
  Array.isArray(n) || (n = [n]), n.forEach((e) => {
    const o = e instanceof Node;
    t.appendChild(o ? e : document.createTextNode(e));
  }), this.insertBefore(t, this.firstChild);
});
Element.prototype.scrollIntoViewIfNeeded || (Element.prototype.scrollIntoViewIfNeeded = function(n) {
  n = arguments.length === 0 ? !0 : !!n;
  const t = this.parentNode, e = window.getComputedStyle(t, null), o = parseInt(e.getPropertyValue("border-top-width")), i = parseInt(e.getPropertyValue("border-left-width")), r = this.offsetTop - t.offsetTop < t.scrollTop, s = this.offsetTop - t.offsetTop + this.clientHeight - o > t.scrollTop + t.clientHeight, a = this.offsetLeft - t.offsetLeft < t.scrollLeft, l = this.offsetLeft - t.offsetLeft + this.clientWidth - i > t.scrollLeft + t.clientWidth, c = r && !s;
  (r || s) && n && (t.scrollTop = this.offsetTop - t.offsetTop - t.clientHeight / 2 - o + this.clientHeight / 2), (a || l) && n && (t.scrollLeft = this.offsetLeft - t.offsetLeft - t.clientWidth / 2 - i + this.clientWidth / 2), (r || s || a || l) && !n && this.scrollIntoView(c);
});
let Rl = (n = 21) => crypto.getRandomValues(new Uint8Array(n)).reduce((t, e) => (e &= 63, e < 36 ? t += e.toString(36) : e < 62 ? t += (e - 26).toString(36).toUpperCase() : e > 62 ? t += "-" : t += "_", t), "");
var kr = /* @__PURE__ */ ((n) => (n.VERBOSE = "VERBOSE", n.INFO = "INFO", n.WARN = "WARN", n.ERROR = "ERROR", n))(kr || {});
const H = {
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
}, Pl = {
  LEFT: 0,
  WHEEL: 1,
  RIGHT: 2,
  BACKWARD: 3,
  FORWARD: 4
};
function no(n, t, e = "log", o, i = "color: inherit") {
  if (!("console" in window) || !window.console[e])
    return;
  const r = ["info", "log", "warn", "error"].includes(e), s = [];
  switch (no.logLevel) {
    case "ERROR":
      if (e !== "error")
        return;
      break;
    case "WARN":
      if (!["error", "warn"].includes(e))
        return;
      break;
    case "INFO":
      if (!r || n)
        return;
      break;
  }
  o && s.push(o);
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
  n && (r ? (s.unshift(l, i), t = `%c${a}%c ${t}`) : t = `( ${a} )${t}`);
  try {
    r ? o ? console[e](`${t} %o`, ...s) : console[e](t, ...s) : console[e](t);
  } catch {
  }
}
no.logLevel = "VERBOSE";
function Fl(n) {
  no.logLevel = n;
}
const z = no.bind(window, !1), St = no.bind(window, !0);
function ce(n) {
  return Object.prototype.toString.call(n).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}
function G(n) {
  return ce(n) === "function" || ce(n) === "asyncfunction";
}
function st(n) {
  return ce(n) === "object";
}
function Gt(n) {
  return ce(n) === "string";
}
function Hl(n) {
  return ce(n) === "boolean";
}
function Bi(n) {
  return ce(n) === "number";
}
function _i(n) {
  return ce(n) === "undefined";
}
function _t(n) {
  return n ? Object.keys(n).length === 0 && n.constructor === Object : !0;
}
function yr(n) {
  return n > 47 && n < 58 || // number keys
  n === 32 || n === 13 || // Space bar & return key(s)
  n === 229 || // processing key input for certain languages — Chinese, Japanese, etc.
  n > 64 && n < 91 || // letter keys
  n > 95 && n < 112 || // Numpad keys
  n > 185 && n < 193 || // ;=,-./` (in order)
  n > 218 && n < 223;
}
async function xr(n, t = () => {
}, e = () => {
}) {
  async function o(i, r, s) {
    try {
      await i.function(i.data), await r(_i(i.data) ? {} : i.data);
    } catch {
      s(_i(i.data) ? {} : i.data);
    }
  }
  return n.reduce(async (i, r) => (await i, o(r, t, e)), Promise.resolve());
}
function Er(n) {
  return Array.prototype.slice.call(n);
}
function de(n, t) {
  return function() {
    const e = this, o = arguments;
    window.setTimeout(() => n.apply(e, o), t);
  };
}
function jl(n) {
  return n.name.split(".").pop();
}
function Ul(n) {
  return /^[-\w]+\/([-+\w]+|\*)$/.test(n);
}
function zl(n, t, e) {
  let o;
  return (...i) => {
    const r = this, s = () => {
      o = null, e || n.apply(r, i);
    }, a = e && !o;
    window.clearTimeout(o), o = window.setTimeout(s, t), a && n.apply(r, i);
  };
}
function cn(n, t, e = void 0) {
  let o, i, r, s = null, a = 0;
  e || (e = {});
  const l = function() {
    a = e.leading === !1 ? 0 : Date.now(), s = null, r = n.apply(o, i), s || (o = i = null);
  };
  return function() {
    const c = Date.now();
    !a && e.leading === !1 && (a = c);
    const h = t - (c - a);
    return o = this, i = arguments, h <= 0 || h > t ? (s && (clearTimeout(s), s = null), a = c, r = n.apply(o, i), s || (o = i = null)) : !s && e.trailing !== !1 && (s = setTimeout(l, h)), r;
  };
}
function Yl() {
  const n = {
    win: !1,
    mac: !1,
    x11: !1,
    linux: !1
  }, t = Object.keys(n).find((e) => window.navigator.appVersion.toLowerCase().indexOf(e) !== -1);
  return t && (n[t] = !0), n;
}
function Io(n) {
  return n[0].toUpperCase() + n.slice(1);
}
function dn(n, ...t) {
  if (!t.length)
    return n;
  const e = t.shift();
  if (st(n) && st(e))
    for (const o in e)
      st(e[o]) ? (n[o] || Object.assign(n, { [o]: {} }), dn(n[o], e[o])) : Object.assign(n, { [o]: e[o] });
  return dn(n, ...t);
}
function Sr(n) {
  const t = Yl();
  return n = n.replace(/shift/gi, "⇧").replace(/backspace/gi, "⌫").replace(/enter/gi, "⏎").replace(/up/gi, "↑").replace(/left/gi, "→").replace(/down/gi, "↓").replace(/right/gi, "←").replace(/escape/gi, "⎋").replace(/insert/gi, "Ins").replace(/delete/gi, "␡").replace(/\+/gi, " + "), t.mac ? n = n.replace(/ctrl|cmd/gi, "⌘").replace(/alt/gi, "⌥") : n = n.replace(/cmd/gi, "Ctrl").replace(/windows/gi, "WIN"), n;
}
function Vl(n) {
  try {
    return new URL(n).href;
  } catch {
  }
  return n.substring(0, 2) === "//" ? window.location.protocol + n : window.location.origin + n;
}
function $l() {
  return Rl(10);
}
function Wl(n) {
  window.open(n, "_blank");
}
function Xl(n = "") {
  return `${n}${Math.floor(Math.random() * 1e8).toString(16)}`;
}
function hn(n, t, e) {
  const o = `«${t}» is deprecated and will be removed in the next major release. Please use the «${e}» instead.`;
  n && St(o, "warn");
}
function Me(n, t, e) {
  const o = e.value ? "value" : "get", i = e[o], r = `#${t}Cache`;
  if (e[o] = function(...s) {
    return this[r] === void 0 && (this[r] = i.apply(this, ...s)), this[r];
  }, o === "get" && e.set) {
    const s = e.set;
    e.set = function(a) {
      delete n[r], s.apply(this, a);
    };
  }
  return e;
}
const Cr = 650;
function re() {
  return window.matchMedia(`(max-width: ${Cr}px)`).matches;
}
const Ii = typeof window < "u" && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
function Kl(n, t) {
  const e = Array.isArray(n) || st(n), o = Array.isArray(t) || st(t);
  return e || o ? JSON.stringify(n) === JSON.stringify(t) : n === t;
}
class g {
  /**
   * Check if passed tag has no closed tag
   *
   * @param {HTMLElement} tag - element to check
   * @returns {boolean}
   */
  static isSingleTag(t) {
    return t.tagName && [
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
    ].includes(t.tagName);
  }
  /**
   * Check if element is BR or WBR
   *
   * @param {HTMLElement} element - element to check
   * @returns {boolean}
   */
  static isLineBreakTag(t) {
    return t && t.tagName && [
      "BR",
      "WBR"
    ].includes(t.tagName);
  }
  /**
   * Helper for making Elements with class name and attributes
   *
   * @param  {string} tagName - new Element tag name
   * @param  {string[]|string} [classNames] - list or name of CSS class name(s)
   * @param  {object} [attributes] - any attributes
   * @returns {HTMLElement}
   */
  static make(t, e = null, o = {}) {
    const i = document.createElement(t);
    Array.isArray(e) ? i.classList.add(...e) : e && i.classList.add(e);
    for (const r in o)
      Object.prototype.hasOwnProperty.call(o, r) && (i[r] = o[r]);
    return i;
  }
  /**
   * Creates Text Node with the passed content
   *
   * @param {string} content - text content
   * @returns {Text}
   */
  static text(t) {
    return document.createTextNode(t);
  }
  /**
   * Append one or several elements to the parent
   *
   * @param  {Element|DocumentFragment} parent - where to append
   * @param  {Element|Element[]|DocumentFragment|Text|Text[]} elements - element or elements list
   */
  static append(t, e) {
    Array.isArray(e) ? e.forEach((o) => t.appendChild(o)) : t.appendChild(e);
  }
  /**
   * Append element or a couple to the beginning of the parent elements
   *
   * @param {Element} parent - where to append
   * @param {Element|Element[]} elements - element or elements list
   */
  static prepend(t, e) {
    Array.isArray(e) ? (e = e.reverse(), e.forEach((o) => t.prepend(o))) : t.prepend(e);
  }
  /**
   * Swap two elements in parent
   *
   * @param {HTMLElement} el1 - from
   * @param {HTMLElement} el2 - to
   * @deprecated
   */
  static swap(t, e) {
    const o = document.createElement("div"), i = t.parentNode;
    i.insertBefore(o, t), i.insertBefore(t, e), i.insertBefore(e, o), i.removeChild(o);
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
  static find(t = document, e) {
    return t.querySelector(e);
  }
  /**
   * Get Element by Id
   *
   * @param {string} id - id to find
   * @returns {HTMLElement | null}
   */
  static get(t) {
    return document.getElementById(t);
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
  static findAll(t = document, e) {
    return t.querySelectorAll(e);
  }
  /**
   * Returns CSS selector for all text inputs
   */
  static get allInputsSelector() {
    return "[contenteditable=true], textarea, input:not([type]), " + ["text", "password", "email", "number", "search", "tel", "url"].map((t) => `input[type="${t}"]`).join(", ");
  }
  /**
   * Find all contenteditable, textarea and editable input elements passed holder contains
   *
   * @param holder - element where to find inputs
   */
  static findAllInputs(t) {
    return Er(t.querySelectorAll(g.allInputsSelector)).reduce((e, o) => g.isNativeInput(o) || g.containsOnlyInlineElements(o) ? [...e, o] : [...e, ...g.getDeepestBlockElements(o)], []);
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
  static getDeepestNode(t, e = !1) {
    const o = e ? "lastChild" : "firstChild", i = e ? "previousSibling" : "nextSibling";
    if (t && t.nodeType === Node.ELEMENT_NODE && t[o]) {
      let r = t[o];
      if (g.isSingleTag(r) && !g.isNativeInput(r) && !g.isLineBreakTag(r))
        if (r[i])
          r = r[i];
        else if (r.parentNode[i])
          r = r.parentNode[i];
        else
          return r.parentNode;
      return this.getDeepestNode(r, e);
    }
    return t;
  }
  /**
   * Check if object is DOM node
   *
   * @param {*} node - object to check
   * @returns {boolean}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isElement(t) {
    return Bi(t) ? !1 : t && t.nodeType && t.nodeType === Node.ELEMENT_NODE;
  }
  /**
   * Check if object is DocumentFragment node
   *
   * @param {object} node - object to check
   * @returns {boolean}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isFragment(t) {
    return Bi(t) ? !1 : t && t.nodeType && t.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
  }
  /**
   * Check if passed element is contenteditable
   *
   * @param {HTMLElement} element - html element to check
   * @returns {boolean}
   */
  static isContentEditable(t) {
    return t.contentEditable === "true";
  }
  /**
   * Checks target if it is native input
   *
   * @param {*} target - HTML element or string
   * @returns {boolean}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isNativeInput(t) {
    const e = [
      "INPUT",
      "TEXTAREA"
    ];
    return t && t.tagName ? e.includes(t.tagName) : !1;
  }
  /**
   * Checks if we can set caret
   *
   * @param {HTMLElement} target - target to check
   * @returns {boolean}
   */
  static canSetCaret(t) {
    let e = !0;
    if (g.isNativeInput(t))
      switch (t.type) {
        case "file":
        case "checkbox":
        case "radio":
        case "hidden":
        case "submit":
        case "button":
        case "image":
        case "reset":
          e = !1;
          break;
      }
    else
      e = g.isContentEditable(t);
    return e;
  }
  /**
   * Checks node if it is empty
   *
   * @description Method checks simple Node without any childs for emptiness
   * If you have Node with 2 or more children id depth, you better use {@link Dom#isEmpty} method
   * @param {Node} node - node to check
   * @returns {boolean} true if it is empty
   */
  static isNodeEmpty(t) {
    let e;
    return this.isSingleTag(t) && !this.isLineBreakTag(t) ? !1 : (this.isElement(t) && this.isNativeInput(t) ? e = t.value : e = t.textContent.replace("​", ""), e.trim().length === 0);
  }
  /**
   * checks node if it is doesn't have any child nodes
   *
   * @param {Node} node - node to check
   * @returns {boolean}
   */
  static isLeaf(t) {
    return t ? t.childNodes.length === 0 : !1;
  }
  /**
   * breadth-first search (BFS)
   * {@link https://en.wikipedia.org/wiki/Breadth-first_search}
   *
   * @description Pushes to stack all DOM leafs and checks for emptiness
   * @param {Node} node - node to check
   * @returns {boolean}
   */
  static isEmpty(t) {
    t.normalize();
    const e = [t];
    for (; e.length > 0; )
      if (t = e.shift(), !!t) {
        if (this.isLeaf(t) && !this.isNodeEmpty(t))
          return !1;
        t.childNodes && e.push(...Array.from(t.childNodes));
      }
    return !0;
  }
  /**
   * Check if string contains html elements
   *
   * @param {string} str - string to check
   * @returns {boolean}
   */
  static isHTMLString(t) {
    const e = g.make("div");
    return e.innerHTML = t, e.childElementCount > 0;
  }
  /**
   * Return length of node`s text content
   *
   * @param {Node} node - node with content
   * @returns {number}
   */
  static getContentLength(t) {
    return g.isNativeInput(t) ? t.value.length : t.nodeType === Node.TEXT_NODE ? t.length : t.textContent.length;
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
  static containsOnlyInlineElements(t) {
    let e;
    Gt(t) ? (e = document.createElement("div"), e.innerHTML = t) : e = t;
    const o = (i) => !g.blockElements.includes(i.tagName.toLowerCase()) && Array.from(i.children).every(o);
    return Array.from(e.children).every(o);
  }
  /**
   * Find and return all block elements in the passed parent (including subtree)
   *
   * @param {HTMLElement} parent - root element
   * @returns {HTMLElement[]}
   */
  static getDeepestBlockElements(t) {
    return g.containsOnlyInlineElements(t) ? [t] : Array.from(t.children).reduce((e, o) => [...e, ...g.getDeepestBlockElements(o)], []);
  }
  /**
   * Helper for get holder from {string} or return HTMLElement
   *
   * @param {string | HTMLElement} element - holder's id or holder's HTML Element
   * @returns {HTMLElement}
   */
  static getHolder(t) {
    return Gt(t) ? document.getElementById(t) : t;
  }
  /**
   * Returns true if element is anchor (is A tag)
   *
   * @param {Element} element - element to check
   * @returns {boolean}
   */
  static isAnchor(t) {
    return t.tagName.toLowerCase() === "a";
  }
  /**
   * Return element's offset related to the document
   *
   * @todo handle case when editor initialized in scrollable popup
   * @param el - element to compute offset
   */
  static offset(t) {
    const e = t.getBoundingClientRect(), o = window.pageXOffset || document.documentElement.scrollLeft, i = window.pageYOffset || document.documentElement.scrollTop, r = e.top + i, s = e.left + o;
    return {
      top: r,
      left: s,
      bottom: r + e.height,
      right: s + e.width
    };
  }
}
const Gl = {
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
}, Zl = {
  Text: "",
  Link: "",
  Bold: "",
  Italic: ""
}, ql = {
  link: {
    "Add a link": ""
  },
  stub: {
    "The block can not be displayed correctly.": ""
  }
}, Jl = {
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
}, Tr = {
  ui: Gl,
  toolNames: Zl,
  tools: ql,
  blockTunes: Jl
}, ve = class {
  /**
   * Type-safe translation for internal UI texts:
   * Perform translation of the string by namespace and a key
   *
   * @example I18n.ui(I18nInternalNS.ui.blockTunes.toggler, 'Click to tune')
   * @param internalNamespace - path to translated string in dictionary
   * @param dictKey - dictionary key. Better to use default locale original text
   */
  static ui(n, t) {
    return ve._t(n, t);
  }
  /**
   * Translate for external strings that is not presented in default dictionary.
   * For example, for user-specified tool names
   *
   * @param namespace - path to translated string in dictionary
   * @param dictKey - dictionary key. Better to use default locale original text
   */
  static t(n, t) {
    return ve._t(n, t);
  }
  /**
   * Adjust module for using external dictionary
   *
   * @param dictionary - new messages list to override default
   */
  static setDictionary(n) {
    ve.currentDictionary = n;
  }
  /**
   * Perform translation both for internal and external namespaces
   * If there is no translation found, returns passed key as a translated message
   *
   * @param namespace - path to translated string in dictionary
   * @param dictKey - dictionary key. Better to use default locale original text
   */
  static _t(n, t) {
    const e = ve.getNamespace(n);
    return !e || !e[t] ? t : e[t];
  }
  /**
   * Find messages section by namespace path
   *
   * @param namespace - path to section
   */
  static getNamespace(n) {
    return n.split(".").reduce((t, e) => !t || !Object.keys(t).length ? {} : t[e], ve.currentDictionary);
  }
};
let pt = ve;
pt.currentDictionary = Tr;
class Br extends Error {
}
class Po {
  constructor() {
    this.subscribers = {};
  }
  /**
   * Subscribe any event on callback
   *
   * @param eventName - event name
   * @param callback - subscriber
   */
  on(t, e) {
    t in this.subscribers || (this.subscribers[t] = []), this.subscribers[t].push(e);
  }
  /**
   * Subscribe any event on callback. Callback will be called once and be removed from subscribers array after call.
   *
   * @param eventName - event name
   * @param callback - subscriber
   */
  once(t, e) {
    t in this.subscribers || (this.subscribers[t] = []);
    const o = (i) => {
      const r = e(i), s = this.subscribers[t].indexOf(o);
      return s !== -1 && this.subscribers[t].splice(s, 1), r;
    };
    this.subscribers[t].push(o);
  }
  /**
   * Emit callbacks with passed data
   *
   * @param eventName - event name
   * @param data - subscribers get this data when they were fired
   */
  emit(t, e) {
    _t(this.subscribers) || !this.subscribers[t] || this.subscribers[t].reduce((o, i) => {
      const r = i(o);
      return r !== void 0 ? r : o;
    }, e);
  }
  /**
   * Unsubscribe callback from event
   *
   * @param eventName - event name
   * @param callback - event handler
   */
  off(t, e) {
    for (let o = 0; o < this.subscribers[t].length; o++)
      if (this.subscribers[t][o] === e) {
        delete this.subscribers[t][o];
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
function Ve(n) {
  Object.setPrototypeOf(this, {
    /**
     * Block id
     *
     * @returns {string}
     */
    get id() {
      return n.id;
    },
    /**
     * Tool name
     *
     * @returns {string}
     */
    get name() {
      return n.name;
    },
    /**
     * Tool config passed on Editor's initialization
     *
     * @returns {ToolConfig}
     */
    get config() {
      return n.config;
    },
    /**
     * .ce-block element, that wraps plugin contents
     *
     * @returns {HTMLElement}
     */
    get holder() {
      return n.holder;
    },
    /**
     * True if Block content is empty
     *
     * @returns {boolean}
     */
    get isEmpty() {
      return n.isEmpty;
    },
    /**
     * True if Block is selected with Cross-Block selection
     *
     * @returns {boolean}
     */
    get selected() {
      return n.selected;
    },
    /**
     * Set Block's stretch state
     *
     * @param {boolean} state — state to set
     */
    set stretched(t) {
      n.stretched = t;
    },
    /**
     * True if Block is stretched
     *
     * @returns {boolean}
     */
    get stretched() {
      return n.stretched;
    },
    /**
     * Call Tool method with errors handler under-the-hood
     *
     * @param {string} methodName - method to call
     * @param {object} param - object with parameters
     * @returns {unknown}
     */
    call(t, e) {
      return n.call(t, e);
    },
    /**
     * Save Block content
     *
     * @returns {Promise<void|SavedData>}
     */
    save() {
      return n.save();
    },
    /**
     * Validate Block data
     *
     * @param {BlockToolData} data - data to validate
     * @returns {Promise<boolean>}
     */
    validate(t) {
      return n.validate(t);
    },
    /**
     * Allows to say Editor that Block was changed. Used to manually trigger Editor's 'onChange' callback
     * Can be useful for block changes invisible for editor core.
     */
    dispatchChange() {
      n.dispatchChange();
    }
  });
}
class An {
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
  on(t, e, o, i = !1) {
    const r = Xl("l"), s = {
      id: r,
      element: t,
      eventType: e,
      handler: o,
      options: i
    };
    if (!this.findOne(t, e, o))
      return this.allListeners.push(s), t.addEventListener(e, o, i), r;
  }
  /**
   * Removes event listener from element
   *
   * @param {EventTarget} element - DOM element that we removing listener
   * @param {string} eventType - event type
   * @param {Function} handler - remove handler, if element listens several handlers on the same event type
   * @param {boolean|AddEventListenerOptions} options - useCapture or {capture, passive, once}
   */
  off(t, e, o, i) {
    const r = this.findAll(t, e, o);
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
  offById(t) {
    const e = this.findById(t);
    e && e.element.removeEventListener(e.eventType, e.handler, e.options);
  }
  /**
   * Finds and returns first listener by passed params
   *
   * @param {EventTarget} element - event target
   * @param {string} [eventType] - event type
   * @param {Function} [handler] - event handler
   * @returns {ListenerData|null}
   */
  findOne(t, e, o) {
    const i = this.findAll(t, e, o);
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
  findAll(t, e, o) {
    let i;
    const r = t ? this.findByEventTarget(t) : [];
    return t && e && o ? i = r.filter((s) => s.eventType === e && s.handler === o) : t && e ? i = r.filter((s) => s.eventType === e) : i = r, i;
  }
  /**
   * Removes all listeners
   */
  removeAll() {
    this.allListeners.map((t) => {
      t.element.removeEventListener(t.eventType, t.handler, t.options);
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
  findByEventTarget(t) {
    return this.allListeners.filter((e) => {
      if (e.element === t)
        return e;
    });
  }
  /**
   * Search method: looks for listener by passed event type
   *
   * @param {string} eventType - event type
   * @returns {ListenerData[]} listeners that found on element
   */
  findByType(t) {
    return this.allListeners.filter((e) => {
      if (e.eventType === t)
        return e;
    });
  }
  /**
   * Search method: looks for listener by passed handler
   *
   * @param {Function} handler - event handler
   * @returns {ListenerData[]} listeners that found on element
   */
  findByHandler(t) {
    return this.allListeners.filter((e) => {
      if (e.handler === t)
        return e;
    });
  }
  /**
   * Returns listener data found by id
   *
   * @param {string} id - listener identifier
   * @returns {ListenerData}
   */
  findById(t) {
    return this.allListeners.find((e) => e.id === t);
  }
}
class V {
  /**
   * @class
   * @param options - Module options
   * @param options.config - Module config
   * @param options.eventsDispatcher - Common event bus
   */
  constructor({ config: t, eventsDispatcher: e }) {
    if (this.nodes = {}, this.listeners = new An(), this.readOnlyMutableListeners = {
      /**
       * Assigns event listener on DOM element and pushes into special array that might be removed
       *
       * @param {EventTarget} element - DOM Element
       * @param {string} eventType - Event name
       * @param {Function} handler - Event handler
       * @param {boolean|AddEventListenerOptions} options - Listening options
       */
      on: (o, i, r, s = !1) => {
        this.mutableListenerIds.push(
          this.listeners.on(o, i, r, s)
        );
      },
      /**
       * Clears all mutable listeners
       */
      clearAll: () => {
        for (const o of this.mutableListenerIds)
          this.listeners.offById(o);
        this.mutableListenerIds = [];
      }
    }, this.mutableListenerIds = [], new.target === V)
      throw new TypeError("Constructors for abstract class Module are not allowed.");
    this.config = t, this.eventsDispatcher = e;
  }
  /**
   * Editor modules setter
   *
   * @param {EditorModules} Editor - Editor's Modules
   */
  set state(t) {
    this.Editor = t;
  }
  /**
   * Remove memorized nodes
   */
  removeAllNodes() {
    for (const t in this.nodes) {
      const e = this.nodes[t];
      e instanceof HTMLElement && e.remove();
    }
  }
  /**
   * Returns true if current direction is RTL (Right-To-Left)
   */
  get isRtl() {
    return this.config.i18n.direction === "rtl";
  }
}
class N {
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
    const t = window.getSelection();
    return t ? t.anchorNode : null;
  }
  /**
   * Returns selected anchor element
   *
   * @returns {Element|null}
   */
  static get anchorElement() {
    const t = window.getSelection();
    if (!t)
      return null;
    const e = t.anchorNode;
    return e ? g.isElement(e) ? e : e.parentElement : null;
  }
  /**
   * Returns selection offset according to the anchor node
   * {@link https://developer.mozilla.org/ru/docs/Web/API/Selection/anchorOffset}
   *
   * @returns {number|null}
   */
  static get anchorOffset() {
    const t = window.getSelection();
    return t ? t.anchorOffset : null;
  }
  /**
   * Is current selection range collapsed
   *
   * @returns {boolean|null}
   */
  static get isCollapsed() {
    const t = window.getSelection();
    return t ? t.isCollapsed : null;
  }
  /**
   * Check current selection if it is at Editor's zone
   *
   * @returns {boolean}
   */
  static get isAtEditor() {
    return this.isSelectionAtEditor(N.get());
  }
  /**
   * Check if passed selection is at Editor's zone
   *
   * @param selection - Selection object to check
   */
  static isSelectionAtEditor(t) {
    if (!t)
      return !1;
    let e = t.anchorNode || t.focusNode;
    e && e.nodeType === Node.TEXT_NODE && (e = e.parentNode);
    let o = null;
    return e && e instanceof Element && (o = e.closest(`.${N.CSS.editorZone}`)), o ? o.nodeType === Node.ELEMENT_NODE : !1;
  }
  /**
   * Check if passed range at Editor zone
   *
   * @param range - range to check
   */
  static isRangeAtEditor(t) {
    if (!t)
      return;
    let e = t.startContainer;
    e && e.nodeType === Node.TEXT_NODE && (e = e.parentNode);
    let o = null;
    return e && e instanceof Element && (o = e.closest(`.${N.CSS.editorZone}`)), o ? o.nodeType === Node.ELEMENT_NODE : !1;
  }
  /**
   * Methods return boolean that true if selection exists on the page
   */
  static get isSelectionExists() {
    return !!N.get().anchorNode;
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
  static getRangeFromSelection(t) {
    return t && t.rangeCount ? t.getRangeAt(0) : null;
  }
  /**
   * Calculates position and size of selected text
   *
   * @returns {DOMRect | ClientRect}
   */
  static get rect() {
    let t = document.selection, e, o = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    if (t && t.type !== "Control")
      return t = t, e = t.createRange(), o.x = e.boundingLeft, o.y = e.boundingTop, o.width = e.boundingWidth, o.height = e.boundingHeight, o;
    if (!window.getSelection)
      return z("Method window.getSelection is not supported", "warn"), o;
    if (t = window.getSelection(), t.rangeCount === null || isNaN(t.rangeCount))
      return z("Method SelectionUtils.rangeCount is not supported", "warn"), o;
    if (t.rangeCount === 0)
      return o;
    if (e = t.getRangeAt(0).cloneRange(), e.getBoundingClientRect && (o = e.getBoundingClientRect()), o.x === 0 && o.y === 0) {
      const i = document.createElement("span");
      if (i.getBoundingClientRect) {
        i.appendChild(document.createTextNode("​")), e.insertNode(i), o = i.getBoundingClientRect();
        const r = i.parentNode;
        r.removeChild(i), r.normalize();
      }
    }
    return o;
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
  static setCursor(t, e = 0) {
    const o = document.createRange(), i = window.getSelection();
    return g.isNativeInput(t) ? g.canSetCaret(t) ? (t.focus(), t.selectionStart = t.selectionEnd = e, t.getBoundingClientRect()) : void 0 : (o.setStart(t, e), o.setEnd(t, e), i.removeAllRanges(), i.addRange(o), o.getBoundingClientRect());
  }
  /**
   * Check if current range exists and belongs to container
   *
   * @param container - where range should be
   */
  static isRangeInsideContainer(t) {
    const e = N.range;
    return e === null ? !1 : t.contains(e.startContainer);
  }
  /**
   * Adds fake cursor to the current range
   */
  static addFakeCursor() {
    const t = N.range;
    if (t === null)
      return;
    const e = g.make("span", "codex-editor__fake-cursor");
    e.dataset.mutationFree = "true", t.collapse(), t.insertNode(e);
  }
  /**
   * Check if passed element contains a fake cursor
   *
   * @param el - where to check
   */
  static isFakeCursorInsideContainer(t) {
    return g.find(t, ".codex-editor__fake-cursor") !== null;
  }
  /**
   * Removes fake cursor from a container
   *
   * @param container - container to look for
   */
  static removeFakeCursor(t = document.body) {
    const e = g.find(t, ".codex-editor__fake-cursor");
    e && e.remove();
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
    this.savedSelectionRange = N.range;
  }
  /**
   * Restore saved SelectionUtils's range
   */
  restore() {
    if (!this.savedSelectionRange)
      return;
    const t = window.getSelection();
    t.removeAllRanges(), t.addRange(this.savedSelectionRange);
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
    const t = window.getSelection(), e = document.createRange();
    e.selectNodeContents(t.focusNode), e.collapse(!1), t.removeAllRanges(), t.addRange(e);
  }
  /**
   * Looks ahead to find passed tag from current selection
   *
   * @param  {string} tagName       - tag to found
   * @param  {string} [className]   - tag's class name
   * @param  {number} [searchDepth] - count of tags that can be included. For better performance.
   * @returns {HTMLElement|null}
   */
  findParentTag(t, e, o = 10) {
    const i = window.getSelection();
    let r = null;
    return !i || !i.anchorNode || !i.focusNode ? null : ([
      /** the Node in which the selection begins */
      i.anchorNode,
      /** the Node in which the selection ends */
      i.focusNode
    ].forEach((s) => {
      let a = o;
      for (; a > 0 && s.parentNode && !(s.tagName === t && (r = s, e && s.classList && !s.classList.contains(e) && (r = null), r)); )
        s = s.parentNode, a--;
    }), r);
  }
  /**
   * Expands selection range to the passed parent node
   *
   * @param {HTMLElement} element - element which contents should be selected
   */
  expandToTag(t) {
    const e = window.getSelection();
    e.removeAllRanges();
    const o = document.createRange();
    o.selectNodeContents(t), e.addRange(o);
  }
}
function Ql(n, t) {
  const { type: e, target: o, addedNodes: i, removedNodes: r } = n;
  if (o === t)
    return !0;
  if (["characterData", "attributes"].includes(e)) {
    const l = o.nodeType === Node.TEXT_NODE ? o.parentNode : o;
    return t.contains(l);
  }
  const s = Array.from(i).some((l) => t.contains(l)), a = Array.from(r).some((l) => t.contains(l));
  return s || a;
}
const un = "redactor dom changed", _r = "block changed", Ir = "fake cursor is about to be toggled", Mr = "fake cursor have been set";
var Wt = /* @__PURE__ */ ((n) => (n.APPEND_CALLBACK = "appendCallback", n.RENDERED = "rendered", n.MOVED = "moved", n.UPDATED = "updated", n.REMOVED = "removed", n.ON_PASTE = "onPaste", n))(Wt || {});
class ot extends Po {
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
    id: t = $l(),
    data: e,
    tool: o,
    api: i,
    readOnly: r,
    tunesData: s
  }, a) {
    super(), this.cachedInputs = [], this.toolRenderedElement = null, this.tunesInstances = /* @__PURE__ */ new Map(), this.defaultTunesInstances = /* @__PURE__ */ new Map(), this.unavailableTunesData = {}, this.inputIndex = 0, this.editorEventBus = null, this.handleFocus = () => {
      this.dropInputsCache(), this.updateCurrentInput();
    }, this.didMutated = (l = void 0) => {
      const c = l === void 0, h = l instanceof InputEvent;
      !c && !h && this.detectToolRootChange(l);
      let d;
      c || h ? d = !0 : d = !(l.length > 0 && l.every((u) => {
        const { addedNodes: f, removedNodes: p } = u;
        return [
          ...Array.from(f),
          ...Array.from(p)
        ].some((b) => g.isElement(b) ? b.dataset.mutationFree === "true" : !1);
      })), d && (this.dropInputsCache(), this.updateCurrentInput(), this.call(
        "updated"
        /* UPDATED */
      ), this.emit("didMutated", this));
    }, this.name = o.name, this.id = t, this.settings = o.settings, this.config = o.settings.config || {}, this.api = i, this.editorEventBus = a || null, this.blockAPI = new Ve(this), this.tool = o, this.toolInstance = o.create(e, this.blockAPI, r), this.tunes = o.tunes, this.composeTunes(s), this.holder = this.compose(), this.watchBlockMutations(), this.addInputEvents();
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
    const t = g.findAllInputs(this.holder);
    return this.inputIndex > t.length - 1 && (this.inputIndex = t.length - 1), this.cachedInputs = t, t;
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
  set currentInput(t) {
    const e = this.inputs.findIndex((o) => o === t || o.contains(t));
    e !== -1 && (this.inputIndex = e);
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
    const t = this.inputs;
    return t[t.length - 1];
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
    return this.save().then((t) => t && !_t(t.data) ? t.data : {});
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
    return G(this.toolInstance.merge);
  }
  /**
   * Check block for emptiness
   *
   * @returns {boolean}
   */
  get isEmpty() {
    const t = g.isEmpty(this.pluginsContent), e = !this.hasMedia;
    return t && e;
  }
  /**
   * Check if block has a media content such as images, iframe and other
   *
   * @returns {boolean}
   */
  get hasMedia() {
    const t = [
      "img",
      "iframe",
      "video",
      "audio",
      "source",
      "input",
      "textarea",
      "twitterwidget"
    ];
    return !!this.holder.querySelector(t.join(","));
  }
  /**
   * Set focused state
   *
   * @param {boolean} state - 'true' to select, 'false' to remove selection
   */
  set focused(t) {
    this.holder.classList.toggle(ot.CSS.focused, t);
  }
  /**
   * Get Block's focused state
   */
  get focused() {
    return this.holder.classList.contains(ot.CSS.focused);
  }
  /**
   * Set selected state
   * We don't need to mark Block as Selected when it is empty
   *
   * @param {boolean} state - 'true' to select, 'false' to remove selection
   */
  set selected(t) {
    var e, o;
    this.holder.classList.toggle(ot.CSS.selected, t);
    const i = t === !0 && N.isRangeInsideContainer(this.holder), r = t === !1 && N.isFakeCursorInsideContainer(this.holder);
    (i || r) && ((e = this.editorEventBus) == null || e.emit(Ir, { state: t }), i ? N.addFakeCursor() : N.removeFakeCursor(this.holder), (o = this.editorEventBus) == null || o.emit(Mr, { state: t }));
  }
  /**
   * Returns True if it is Selected
   *
   * @returns {boolean}
   */
  get selected() {
    return this.holder.classList.contains(ot.CSS.selected);
  }
  /**
   * Set stretched state
   *
   * @param {boolean} state - 'true' to enable, 'false' to disable stretched state
   */
  set stretched(t) {
    this.holder.classList.toggle(ot.CSS.wrapperStretched, t);
  }
  /**
   * Return Block's stretched state
   *
   * @returns {boolean}
   */
  get stretched() {
    return this.holder.classList.contains(ot.CSS.wrapperStretched);
  }
  /**
   * Toggle drop target state
   *
   * @param {boolean} state - 'true' if block is drop target, false otherwise
   */
  set dropTarget(t) {
    this.holder.classList.toggle(ot.CSS.dropTarget, t);
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
  call(t, e) {
    if (G(this.toolInstance[t])) {
      t === "appendCallback" && z(
        "`appendCallback` hook is deprecated and will be removed in the next major release. Use `rendered` hook instead",
        "warn"
      );
      try {
        this.toolInstance[t].call(this.toolInstance, e);
      } catch (o) {
        z(`Error during '${t}' call: ${o.message}`, "error");
      }
    }
  }
  /**
   * Call plugins merge method
   *
   * @param {BlockToolData} data - data to merge
   */
  async mergeWith(t) {
    await this.toolInstance.merge(t);
  }
  /**
   * Extracts data from Block
   * Groups Tool's save processing time
   *
   * @returns {object}
   */
  async save() {
    const t = await this.toolInstance.save(this.pluginsContent), e = this.unavailableTunesData;
    [
      ...this.tunesInstances.entries(),
      ...this.defaultTunesInstances.entries()
    ].forEach(([r, s]) => {
      if (G(s.save))
        try {
          e[r] = s.save();
        } catch (a) {
          z(`Tune ${s.constructor.name} save method throws an Error %o`, "warn", a);
        }
    });
    const o = window.performance.now();
    let i;
    return Promise.resolve(t).then((r) => (i = window.performance.now(), {
      id: this.id,
      tool: this.name,
      data: r,
      tunes: e,
      time: i - o
    })).catch((r) => {
      z(`Saving process for ${this.name} tool failed due to the ${r}`, "log", "red");
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
  async validate(t) {
    let e = !0;
    return this.toolInstance.validate instanceof Function && (e = await this.toolInstance.validate(t)), e;
  }
  /**
   * Returns data to render in tunes menu.
   * Splits block tunes settings into 2 groups: popover items and custom html.
   */
  getTunes() {
    const t = document.createElement("div"), e = [], o = typeof this.toolInstance.renderSettings == "function" ? this.toolInstance.renderSettings() : [], i = [
      ...this.tunesInstances.values(),
      ...this.defaultTunesInstances.values()
    ].map((r) => r.render());
    return [o, i].flat().forEach((r) => {
      g.isElement(r) ? t.appendChild(r) : Array.isArray(r) ? e.push(...r) : e.push(r);
    }), [e, t];
  }
  /**
   * Update current input index with selection anchor node
   */
  updateCurrentInput() {
    this.currentInput = g.isNativeInput(document.activeElement) || !N.anchorNode ? document.activeElement : N.anchorNode;
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
    this.unwatchBlockMutations(), this.removeInputEvents(), super.destroy(), G(this.toolInstance.destroy) && this.toolInstance.destroy();
  }
  /**
   * Tool could specify several entries to be displayed at the Toolbox (for example, "Heading 1", "Heading 2", "Heading 3")
   * This method returns the entry that is related to the Block (depended on the Block data)
   */
  async getActiveToolboxEntry() {
    const t = this.tool.toolbox;
    if (t.length === 1)
      return Promise.resolve(this.tool.toolbox[0]);
    const e = await this.data;
    return t.find((o) => Object.entries(o.data).some(([i, r]) => e[i] && Kl(e[i], r)));
  }
  /**
   * Make default Block wrappers and put Tool`s content there
   *
   * @returns {HTMLDivElement}
   */
  compose() {
    const t = g.make("div", ot.CSS.wrapper), e = g.make("div", ot.CSS.content), o = this.toolInstance.render();
    this.toolRenderedElement = o, e.appendChild(this.toolRenderedElement);
    let i = e;
    return [...this.tunesInstances.values(), ...this.defaultTunesInstances.values()].forEach((r) => {
      if (G(r.wrap))
        try {
          i = r.wrap(i);
        } catch (s) {
          z(`Tune ${r.constructor.name} wrap method throws an Error %o`, "warn", s);
        }
    }), t.appendChild(i), t;
  }
  /**
   * Instantiate Block Tunes
   *
   * @param tunesData - current Block tunes data
   * @private
   */
  composeTunes(t) {
    Array.from(this.tunes.values()).forEach((e) => {
      (e.isInternal ? this.defaultTunesInstances : this.tunesInstances).set(e.name, e.create(t[e.name], this.blockAPI));
    }), Object.entries(t).forEach(([e, o]) => {
      this.tunesInstances.has(e) || (this.unavailableTunesData[e] = o);
    });
  }
  /**
   * Adds focus event listeners to all inputs and contenteditable
   */
  addInputEvents() {
    this.inputs.forEach((t) => {
      t.addEventListener("focus", this.handleFocus), g.isNativeInput(t) && t.addEventListener("input", this.didMutated);
    });
  }
  /**
   * removes focus event listeners from all inputs and contenteditable
   */
  removeInputEvents() {
    this.inputs.forEach((t) => {
      t.removeEventListener("focus", this.handleFocus), g.isNativeInput(t) && t.removeEventListener("input", this.didMutated);
    });
  }
  /**
   * Listen common editor Dom Changed event and detect mutations related to the  Block
   */
  watchBlockMutations() {
    var t;
    this.redactorDomChangedCallback = (e) => {
      const { mutations: o } = e;
      o.some((i) => Ql(i, this.toolRenderedElement)) && this.didMutated(o);
    }, (t = this.editorEventBus) == null || t.on(un, this.redactorDomChangedCallback);
  }
  /**
   * Remove redactor dom change event listener
   */
  unwatchBlockMutations() {
    var t;
    (t = this.editorEventBus) == null || t.off(un, this.redactorDomChangedCallback);
  }
  /**
   * Sometimes Tool can replace own main element, for example H2 -> H4 or UL -> OL
   * We need to detect such changes and update a link to tools main element with the new one
   *
   * @param mutations - records of block content mutations
   */
  detectToolRootChange(t) {
    t.forEach((e) => {
      if (Array.from(e.removedNodes).includes(this.toolRenderedElement)) {
        const o = e.addedNodes[e.addedNodes.length - 1];
        this.toolRenderedElement = o;
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
class tc extends V {
  constructor() {
    super(...arguments), this.insert = (t = this.config.defaultBlock, e = {}, o = {}, i, r, s, a) => {
      const l = this.Editor.BlockManager.insert({
        id: a,
        tool: t,
        data: e,
        index: i,
        needToFocus: r,
        replace: s
      });
      return new Ve(l);
    }, this.composeBlockData = async (t) => {
      const e = this.Editor.Tools.blockTools.get(t);
      return new ot({
        tool: e,
        api: this.Editor.API,
        readOnly: !0,
        data: {},
        tunesData: {}
      }).data;
    }, this.update = (t, e) => {
      const { BlockManager: o } = this.Editor, i = o.getBlockById(t);
      if (!i) {
        z("blocks.update(): Block with passed id was not found", "warn");
        return;
      }
      const r = o.getBlockIndex(i);
      o.insert({
        id: i.id,
        tool: i.name,
        data: e,
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
      render: (t) => this.render(t),
      renderFromHTML: (t) => this.renderFromHTML(t),
      delete: (t) => this.delete(t),
      swap: (t, e) => this.swap(t, e),
      move: (t, e) => this.move(t, e),
      getBlockByIndex: (t) => this.getBlockByIndex(t),
      getById: (t) => this.getById(t),
      getCurrentBlockIndex: () => this.getCurrentBlockIndex(),
      getBlockIndex: (t) => this.getBlockIndex(t),
      getBlocksCount: () => this.getBlocksCount(),
      stretchBlock: (t, e = !0) => this.stretchBlock(t, e),
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
  getBlockIndex(t) {
    const e = this.Editor.BlockManager.getBlockById(t);
    if (!e) {
      St("There is no block with id `" + t + "`", "warn");
      return;
    }
    return this.Editor.BlockManager.getBlockIndex(e);
  }
  /**
   * Returns BlockAPI object by Block index
   *
   * @param {number} index - index to get
   */
  getBlockByIndex(t) {
    const e = this.Editor.BlockManager.getBlockByIndex(t);
    if (e === void 0) {
      St("There is no block at index `" + t + "`", "warn");
      return;
    }
    return new Ve(e);
  }
  /**
   * Returns BlockAPI object by Block id
   *
   * @param id - id of block to get
   */
  getById(t) {
    const e = this.Editor.BlockManager.getBlockById(t);
    return e === void 0 ? (St("There is no block with id `" + t + "`", "warn"), null) : new Ve(e);
  }
  /**
   * Call Block Manager method that swap Blocks
   *
   * @param {number} fromIndex - position of first Block
   * @param {number} toIndex - position of second Block
   * @deprecated — use 'move' instead
   */
  swap(t, e) {
    z(
      "`blocks.swap()` method is deprecated and will be removed in the next major release. Use `block.move()` method instead",
      "info"
    ), this.Editor.BlockManager.swap(t, e);
  }
  /**
   * Move block from one index to another
   *
   * @param {number} toIndex - index to move to
   * @param {number} fromIndex - index to move from
   */
  move(t, e) {
    this.Editor.BlockManager.move(t, e);
  }
  /**
   * Deletes Block
   *
   * @param {number} blockIndex - index of Block to delete
   */
  delete(t) {
    try {
      this.Editor.BlockManager.removeBlock(t);
    } catch (e) {
      St(e, "warn");
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
  render(t) {
    return this.Editor.BlockManager.clear(), this.Editor.Renderer.render(t.blocks);
  }
  /**
   * Render passed HTML string
   *
   * @param {string} data - HTML string to render
   * @returns {Promise<void>}
   */
  renderFromHTML(t) {
    return this.Editor.BlockManager.clear(), this.Editor.Paste.processText(t, !0);
  }
  /**
   * Stretch Block's content
   *
   * @param {number} index - index of Block to stretch
   * @param {boolean} status - true to enable, false to disable
   * @deprecated Use BlockAPI interface to stretch Blocks
   */
  stretchBlock(t, e = !0) {
    hn(
      !0,
      "blocks.stretchBlock()",
      "BlockAPI"
    );
    const o = this.Editor.BlockManager.getBlockByIndex(t);
    o && (o.stretched = e);
  }
  /**
   * Insert new Block
   * After set caret to this Block
   *
   * @todo remove in 3.0.0
   * @deprecated with insert() method
   */
  insertNewBlock() {
    z("Method blocks.insertNewBlock() is deprecated and it will be removed in the next major release. Use blocks.insert() instead.", "warn"), this.insert();
  }
}
class ec extends V {
  constructor() {
    super(...arguments), this.setToFirstBlock = (t = this.Editor.Caret.positions.DEFAULT, e = 0) => this.Editor.BlockManager.firstBlock ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.firstBlock, t, e), !0) : !1, this.setToLastBlock = (t = this.Editor.Caret.positions.DEFAULT, e = 0) => this.Editor.BlockManager.lastBlock ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.lastBlock, t, e), !0) : !1, this.setToPreviousBlock = (t = this.Editor.Caret.positions.DEFAULT, e = 0) => this.Editor.BlockManager.previousBlock ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.previousBlock, t, e), !0) : !1, this.setToNextBlock = (t = this.Editor.Caret.positions.DEFAULT, e = 0) => this.Editor.BlockManager.nextBlock ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.nextBlock, t, e), !0) : !1, this.setToBlock = (t, e = this.Editor.Caret.positions.DEFAULT, o = 0) => this.Editor.BlockManager.blocks[t] ? (this.Editor.Caret.setToBlock(this.Editor.BlockManager.blocks[t], e, o), !0) : !1, this.focus = (t = !1) => t ? this.setToLastBlock(this.Editor.Caret.positions.END) : this.setToFirstBlock(this.Editor.Caret.positions.START);
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
class oc extends V {
  /**
   * Available methods
   *
   * @returns {Events}
   */
  get methods() {
    return {
      emit: (t, e) => this.emit(t, e),
      off: (t, e) => this.off(t, e),
      on: (t, e) => this.on(t, e)
    };
  }
  /**
   * Subscribe on Events
   *
   * @param {string} eventName - event name to subscribe
   * @param {Function} callback - event handler
   */
  on(t, e) {
    this.eventsDispatcher.on(t, e);
  }
  /**
   * Emit event with data
   *
   * @param {string} eventName - event to emit
   * @param {object} data - event's data
   */
  emit(t, e) {
    this.eventsDispatcher.emit(t, e);
  }
  /**
   * Unsubscribe from Event
   *
   * @param {string} eventName - event to unsubscribe
   * @param {Function} callback - event handler
   */
  off(t, e) {
    this.eventsDispatcher.off(t, e);
  }
}
class Ln extends V {
  /**
   * Return namespace section for tool or block tune
   *
   * @param tool - tool object
   */
  static getNamespace(t) {
    return t.isTune() ? `blockTunes.${t.name}` : `tools.${t.name}`;
  }
  /**
   * Return I18n API methods with global dictionary access
   */
  get methods() {
    return {
      t: () => {
        St("I18n.t() method can be accessed only from Tools", "warn");
      }
    };
  }
  /**
   * Return I18n API methods with tool namespaced dictionary
   *
   * @param tool - Tool object
   */
  getMethodsForTool(t) {
    return Object.assign(
      this.methods,
      {
        t: (e) => pt.t(Ln.getNamespace(t), e)
      }
    );
  }
}
class nc extends V {
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
  getMethodsForTool(t) {
    return Object.assign(
      this.methods,
      {
        i18n: this.Editor.I18nAPI.getMethodsForTool(t)
      }
    );
  }
}
class ic extends V {
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
class rc extends V {
  /**
   * Available methods
   *
   * @returns {Listeners}
   */
  get methods() {
    return {
      on: (t, e, o, i) => this.on(t, e, o, i),
      off: (t, e, o, i) => this.off(t, e, o, i),
      offById: (t) => this.offById(t)
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
  on(t, e, o, i) {
    return this.listeners.on(t, e, o, i);
  }
  /**
   * Removes DOM listener from element
   *
   * @param {Element} element - Element to remove handler from
   * @param eventType - event type
   * @param handler - event handler
   * @param {boolean} useCapture - capture event or not
   */
  off(t, e, o, i) {
    this.listeners.off(t, e, o, i);
  }
  /**
   * Removes DOM listener by the listener id
   *
   * @param id - id of the listener to remove
   */
  offById(t) {
    this.listeners.offById(t);
  }
}
var pn = {}, sc = {
  get exports() {
    return pn;
  },
  set exports(n) {
    pn = n;
  }
};
(function(n, t) {
  (function(e, o) {
    n.exports = o();
  })(window, function() {
    return function(e) {
      var o = {};
      function i(r) {
        if (o[r])
          return o[r].exports;
        var s = o[r] = { i: r, l: !1, exports: {} };
        return e[r].call(s.exports, s, s.exports, i), s.l = !0, s.exports;
      }
      return i.m = e, i.c = o, i.d = function(r, s, a) {
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
    }([function(e, o, i) {
      i(1), /*!
      * Codex JavaScript Notification module
      * https://github.com/codex-team/js-notifier
      */
      e.exports = function() {
        var r = i(6), s = "cdx-notify--bounce-in", a = null;
        return { show: function(l) {
          if (l.message) {
            (function() {
              if (a)
                return !0;
              a = r.getWrapper(), document.body.appendChild(a);
            })();
            var c = null, h = l.time || 8e3;
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
                }, h);
            }
            a.appendChild(c), c.classList.add(s);
          }
        } };
      }();
    }, function(e, o, i) {
      var r = i(2);
      typeof r == "string" && (r = [[e.i, r, ""]]);
      var s = { hmr: !0, transform: void 0, insertInto: void 0 };
      i(4)(r, s), r.locals && (e.exports = r.locals);
    }, function(e, o, i) {
      (e.exports = i(3)(!1)).push([e.i, `.cdx-notify--error{background:#fffbfb!important}.cdx-notify--error::before{background:#fb5d5d!important}.cdx-notify__input{max-width:130px;padding:5px 10px;background:#f7f7f7;border:0;border-radius:3px;font-size:13px;color:#656b7c;outline:0}.cdx-notify__input:-ms-input-placeholder{color:#656b7c}.cdx-notify__input::placeholder{color:#656b7c}.cdx-notify__input:focus:-ms-input-placeholder{color:rgba(101,107,124,.3)}.cdx-notify__input:focus::placeholder{color:rgba(101,107,124,.3)}.cdx-notify__button{border:none;border-radius:3px;font-size:13px;padding:5px 10px;cursor:pointer}.cdx-notify__button:last-child{margin-left:10px}.cdx-notify__button--cancel{background:#f2f5f7;box-shadow:0 2px 1px 0 rgba(16,19,29,0);color:#656b7c}.cdx-notify__button--cancel:hover{background:#eee}.cdx-notify__button--confirm{background:#34c992;box-shadow:0 1px 1px 0 rgba(18,49,35,.05);color:#fff}.cdx-notify__button--confirm:hover{background:#33b082}.cdx-notify__btns-wrapper{display:-ms-flexbox;display:flex;-ms-flex-flow:row nowrap;flex-flow:row nowrap;margin-top:5px}.cdx-notify__cross{position:absolute;top:5px;right:5px;width:10px;height:10px;padding:5px;opacity:.54;cursor:pointer}.cdx-notify__cross::after,.cdx-notify__cross::before{content:'';position:absolute;left:9px;top:5px;height:12px;width:2px;background:#575d67}.cdx-notify__cross::before{transform:rotate(-45deg)}.cdx-notify__cross::after{transform:rotate(45deg)}.cdx-notify__cross:hover{opacity:1}.cdx-notifies{position:fixed;z-index:2;bottom:20px;left:20px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif}.cdx-notify{position:relative;width:220px;margin-top:15px;padding:13px 16px;background:#fff;box-shadow:0 11px 17px 0 rgba(23,32,61,.13);border-radius:5px;font-size:14px;line-height:1.4em;word-wrap:break-word}.cdx-notify::before{content:'';position:absolute;display:block;top:0;left:0;width:3px;height:calc(100% - 6px);margin:3px;border-radius:5px;background:0 0}@keyframes bounceIn{0%{opacity:0;transform:scale(.3)}50%{opacity:1;transform:scale(1.05)}70%{transform:scale(.9)}100%{transform:scale(1)}}.cdx-notify--bounce-in{animation-name:bounceIn;animation-duration:.6s;animation-iteration-count:1}.cdx-notify--success{background:#fafffe!important}.cdx-notify--success::before{background:#41ffb1!important}`, ""]);
    }, function(e, o) {
      e.exports = function(i) {
        var r = [];
        return r.toString = function() {
          return this.map(function(s) {
            var a = function(l, c) {
              var h = l[1] || "", d = l[3];
              if (!d)
                return h;
              if (c && typeof btoa == "function") {
                var u = (p = d, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(p)))) + " */"), f = d.sources.map(function(b) {
                  return "/*# sourceURL=" + d.sourceRoot + b + " */";
                });
                return [h].concat(f).concat([u]).join(`
`);
              }
              var p;
              return [h].join(`
`);
            }(s, i);
            return s[2] ? "@media " + s[2] + "{" + a + "}" : a;
          }).join("");
        }, r.i = function(s, a) {
          typeof s == "string" && (s = [[null, s, ""]]);
          for (var l = {}, c = 0; c < this.length; c++) {
            var h = this[c][0];
            typeof h == "number" && (l[h] = !0);
          }
          for (c = 0; c < s.length; c++) {
            var d = s[c];
            typeof d[0] == "number" && l[d[0]] || (a && !d[2] ? d[2] = a : a && (d[2] = "(" + d[2] + ") and (" + a + ")"), r.push(d));
          }
        }, r;
      };
    }, function(e, o, i) {
      var r, s, a = {}, l = (r = function() {
        return window && document && document.all && !window.atob;
      }, function() {
        return s === void 0 && (s = r.apply(this, arguments)), s;
      }), c = function(S) {
        var y = {};
        return function(A) {
          if (typeof A == "function")
            return A();
          if (y[A] === void 0) {
            var w = function(k) {
              return document.querySelector(k);
            }.call(this, A);
            if (window.HTMLIFrameElement && w instanceof window.HTMLIFrameElement)
              try {
                w = w.contentDocument.head;
              } catch {
                w = null;
              }
            y[A] = w;
          }
          return y[A];
        };
      }(), h = null, d = 0, u = [], f = i(5);
      function p(S, y) {
        for (var A = 0; A < S.length; A++) {
          var w = S[A], k = a[w.id];
          if (k) {
            k.refs++;
            for (var x = 0; x < k.parts.length; x++)
              k.parts[x](w.parts[x]);
            for (; x < w.parts.length; x++)
              k.parts.push(v(w.parts[x], y));
          } else {
            var M = [];
            for (x = 0; x < w.parts.length; x++)
              M.push(v(w.parts[x], y));
            a[w.id] = { id: w.id, refs: 1, parts: M };
          }
        }
      }
      function b(S, y) {
        for (var A = [], w = {}, k = 0; k < S.length; k++) {
          var x = S[k], M = y.base ? x[0] + y.base : x[0], I = { css: x[1], media: x[2], sourceMap: x[3] };
          w[M] ? w[M].parts.push(I) : A.push(w[M] = { id: M, parts: [I] });
        }
        return A;
      }
      function O(S, y) {
        var A = c(S.insertInto);
        if (!A)
          throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
        var w = u[u.length - 1];
        if (S.insertAt === "top")
          w ? w.nextSibling ? A.insertBefore(y, w.nextSibling) : A.appendChild(y) : A.insertBefore(y, A.firstChild), u.push(y);
        else if (S.insertAt === "bottom")
          A.appendChild(y);
        else {
          if (typeof S.insertAt != "object" || !S.insertAt.before)
            throw new Error(`[Style Loader]

 Invalid value for parameter 'insertAt' ('options.insertAt') found.
 Must be 'top', 'bottom', or Object.
 (https://github.com/webpack-contrib/style-loader#insertat)
`);
          var k = c(S.insertInto + " " + S.insertAt.before);
          A.insertBefore(y, k);
        }
      }
      function B(S) {
        if (S.parentNode === null)
          return !1;
        S.parentNode.removeChild(S);
        var y = u.indexOf(S);
        y >= 0 && u.splice(y, 1);
      }
      function _(S) {
        var y = document.createElement("style");
        return S.attrs.type === void 0 && (S.attrs.type = "text/css"), E(y, S.attrs), O(S, y), y;
      }
      function E(S, y) {
        Object.keys(y).forEach(function(A) {
          S.setAttribute(A, y[A]);
        });
      }
      function v(S, y) {
        var A, w, k, x;
        if (y.transform && S.css) {
          if (!(x = y.transform(S.css)))
            return function() {
            };
          S.css = x;
        }
        if (y.singleton) {
          var M = d++;
          A = h || (h = _(y)), w = D.bind(null, A, M, !1), k = D.bind(null, A, M, !0);
        } else
          S.sourceMap && typeof URL == "function" && typeof URL.createObjectURL == "function" && typeof URL.revokeObjectURL == "function" && typeof Blob == "function" && typeof btoa == "function" ? (A = function(I) {
            var L = document.createElement("link");
            return I.attrs.type === void 0 && (I.attrs.type = "text/css"), I.attrs.rel = "stylesheet", E(L, I.attrs), O(I, L), L;
          }(y), w = function(I, L, Y) {
            var U = Y.css, ft = Y.sourceMap, Vn = L.convertToAbsoluteUrls === void 0 && ft;
            (L.convertToAbsoluteUrls || Vn) && (U = f(U)), ft && (U += `
/*# sourceMappingURL=data:application/json;base64,` + btoa(unescape(encodeURIComponent(JSON.stringify(ft)))) + " */");
            var io = new Blob([U], { type: "text/css" }), ro = I.href;
            I.href = URL.createObjectURL(io), ro && URL.revokeObjectURL(ro);
          }.bind(null, A, y), k = function() {
            B(A), A.href && URL.revokeObjectURL(A.href);
          }) : (A = _(y), w = function(I, L) {
            var Y = L.css, U = L.media;
            if (U && I.setAttribute("media", U), I.styleSheet)
              I.styleSheet.cssText = Y;
            else {
              for (; I.firstChild; )
                I.removeChild(I.firstChild);
              I.appendChild(document.createTextNode(Y));
            }
          }.bind(null, A), k = function() {
            B(A);
          });
        return w(S), function(I) {
          if (I) {
            if (I.css === S.css && I.media === S.media && I.sourceMap === S.sourceMap)
              return;
            w(S = I);
          } else
            k();
        };
      }
      e.exports = function(S, y) {
        if (typeof DEBUG < "u" && DEBUG && typeof document != "object")
          throw new Error("The style-loader cannot be used in a non-browser environment");
        (y = y || {}).attrs = typeof y.attrs == "object" ? y.attrs : {}, y.singleton || typeof y.singleton == "boolean" || (y.singleton = l()), y.insertInto || (y.insertInto = "head"), y.insertAt || (y.insertAt = "bottom");
        var A = b(S, y);
        return p(A, y), function(w) {
          for (var k = [], x = 0; x < A.length; x++) {
            var M = A[x];
            (I = a[M.id]).refs--, k.push(I);
          }
          for (w && p(b(w, y), y), x = 0; x < k.length; x++) {
            var I;
            if ((I = k[x]).refs === 0) {
              for (var L = 0; L < I.parts.length; L++)
                I.parts[L]();
              delete a[I.id];
            }
          }
        };
      };
      var m, T = (m = [], function(S, y) {
        return m[S] = y, m.filter(Boolean).join(`
`);
      });
      function D(S, y, A, w) {
        var k = A ? "" : w.css;
        if (S.styleSheet)
          S.styleSheet.cssText = T(y, k);
        else {
          var x = document.createTextNode(k), M = S.childNodes;
          M[y] && S.removeChild(M[y]), M.length ? S.insertBefore(x, M[y]) : S.appendChild(x);
        }
      }
    }, function(e, o) {
      e.exports = function(i) {
        var r = typeof window < "u" && window.location;
        if (!r)
          throw new Error("fixUrls requires window.location");
        if (!i || typeof i != "string")
          return i;
        var s = r.protocol + "//" + r.host, a = s + r.pathname.replace(/\/[^\/]*$/, "/");
        return i.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(l, c) {
          var h, d = c.trim().replace(/^"(.*)"$/, function(u, f) {
            return f;
          }).replace(/^'(.*)'$/, function(u, f) {
            return f;
          });
          return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(d) ? l : (h = d.indexOf("//") === 0 ? d : d.indexOf("/") === 0 ? s + d : a + d.replace(/^\.\//, ""), "url(" + JSON.stringify(h) + ")");
        });
      };
    }, function(e, o, i) {
      var r, s, a, l, c, h, d, u, f;
      e.exports = (r = "cdx-notifies", s = "cdx-notify", a = "cdx-notify__cross", l = "cdx-notify__button--confirm", c = "cdx-notify__button--cancel", h = "cdx-notify__input", d = "cdx-notify__button", u = "cdx-notify__btns-wrapper", { alert: f = function(p) {
        var b = document.createElement("DIV"), O = document.createElement("DIV"), B = p.message, _ = p.style;
        return b.classList.add(s), _ && b.classList.add(s + "--" + _), b.innerHTML = B, O.classList.add(a), O.addEventListener("click", b.remove.bind(b)), b.appendChild(O), b;
      }, confirm: function(p) {
        var b = f(p), O = document.createElement("div"), B = document.createElement("button"), _ = document.createElement("button"), E = b.querySelector("." + a), v = p.cancelHandler, m = p.okHandler;
        return O.classList.add(u), B.innerHTML = p.okText || "Confirm", _.innerHTML = p.cancelText || "Cancel", B.classList.add(d), _.classList.add(d), B.classList.add(l), _.classList.add(c), v && typeof v == "function" && (_.addEventListener("click", v), E.addEventListener("click", v)), m && typeof m == "function" && B.addEventListener("click", m), B.addEventListener("click", b.remove.bind(b)), _.addEventListener("click", b.remove.bind(b)), O.appendChild(B), O.appendChild(_), b.appendChild(O), b;
      }, prompt: function(p) {
        var b = f(p), O = document.createElement("div"), B = document.createElement("button"), _ = document.createElement("input"), E = b.querySelector("." + a), v = p.cancelHandler, m = p.okHandler;
        return O.classList.add(u), B.innerHTML = p.okText || "Ok", B.classList.add(d), B.classList.add(l), _.classList.add(h), p.placeholder && _.setAttribute("placeholder", p.placeholder), p.default && (_.value = p.default), p.inputType && (_.type = p.inputType), v && typeof v == "function" && E.addEventListener("click", v), m && typeof m == "function" && B.addEventListener("click", function() {
          m(_.value);
        }), B.addEventListener("click", b.remove.bind(b)), O.appendChild(_), O.appendChild(B), b.appendChild(O), b;
      }, getWrapper: function() {
        var p = document.createElement("DIV");
        return p.classList.add(r), p;
      } });
    }]);
  });
})(sc);
const ac = /* @__PURE__ */ Ro(pn);
class lc {
  /**
   * Show web notification
   *
   * @param {NotifierOptions | ConfirmNotifierOptions | PromptNotifierOptions} options - notification options
   */
  show(t) {
    ac.show(t);
  }
}
class cc extends V {
  /**
   * @param moduleConfiguration - Module Configuration
   * @param moduleConfiguration.config - Editor's config
   * @param moduleConfiguration.eventsDispatcher - Editor's event dispatcher
   */
  constructor({ config: t, eventsDispatcher: e }) {
    super({
      config: t,
      eventsDispatcher: e
    }), this.notifier = new lc();
  }
  /**
   * Available methods
   */
  get methods() {
    return {
      show: (t) => this.show(t)
    };
  }
  /**
   * Show notification
   *
   * @param {NotifierOptions} options - message option
   */
  show(t) {
    return this.notifier.show(t);
  }
}
class dc extends V {
  /**
   * Available methods
   */
  get methods() {
    const t = () => this.isEnabled;
    return {
      toggle: (e) => this.toggle(e),
      get isEnabled() {
        return t();
      }
    };
  }
  /**
   * Set or toggle read-only state
   *
   * @param {boolean|undefined} state - set or toggle state
   * @returns {boolean} current value
   */
  toggle(t) {
    return this.Editor.ReadOnly.toggle(t);
  }
  /**
   * Returns current read-only state
   */
  get isEnabled() {
    return this.Editor.ReadOnly.isEnabled;
  }
}
var fn = {}, hc = {
  get exports() {
    return fn;
  },
  set exports(n) {
    fn = n;
  }
};
(function(n, t) {
  (function(e, o) {
    n.exports = o();
  })(Dl, function() {
    function e(d) {
      var u = d.tags, f = Object.keys(u), p = f.map(function(b) {
        return typeof u[b];
      }).every(function(b) {
        return b === "object" || b === "boolean" || b === "function";
      });
      if (!p)
        throw new Error("The configuration was invalid");
      this.config = d;
    }
    var o = ["P", "LI", "TD", "TH", "DIV", "H1", "H2", "H3", "H4", "H5", "H6", "PRE"];
    function i(d) {
      return o.indexOf(d.nodeName) !== -1;
    }
    var r = ["A", "B", "STRONG", "I", "EM", "SUB", "SUP", "U", "STRIKE"];
    function s(d) {
      return r.indexOf(d.nodeName) !== -1;
    }
    e.prototype.clean = function(d) {
      const u = document.implementation.createHTMLDocument(), f = u.createElement("div");
      return f.innerHTML = d, this._sanitize(u, f), f.innerHTML;
    }, e.prototype._sanitize = function(d, u) {
      var f = a(d, u), p = f.firstChild();
      if (p)
        do {
          if (p.nodeType === Node.TEXT_NODE)
            if (p.data.trim() === "" && (p.previousElementSibling && i(p.previousElementSibling) || p.nextElementSibling && i(p.nextElementSibling))) {
              u.removeChild(p), this._sanitize(d, u);
              break;
            } else
              continue;
          if (p.nodeType === Node.COMMENT_NODE) {
            u.removeChild(p), this._sanitize(d, u);
            break;
          }
          var b = s(p), O;
          b && (O = Array.prototype.some.call(p.childNodes, i));
          var B = !!u.parentNode, _ = i(u) && i(p) && B, E = p.nodeName.toLowerCase(), v = l(this.config, E, p), m = b && O;
          if (m || c(p, v) || !this.config.keepNestedBlockElements && _) {
            if (!(p.nodeName === "SCRIPT" || p.nodeName === "STYLE"))
              for (; p.childNodes.length > 0; )
                u.insertBefore(p.childNodes[0], p);
            u.removeChild(p), this._sanitize(d, u);
            break;
          }
          for (var T = 0; T < p.attributes.length; T += 1) {
            var D = p.attributes[T];
            h(D, v, p) && (p.removeAttribute(D.name), T = T - 1);
          }
          this._sanitize(d, p);
        } while (p = f.nextSibling());
    };
    function a(d, u) {
      return d.createTreeWalker(
        u,
        NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT,
        null,
        !1
      );
    }
    function l(d, u, f) {
      return typeof d.tags[u] == "function" ? d.tags[u](f) : d.tags[u];
    }
    function c(d, u) {
      return typeof u > "u" ? !0 : typeof u == "boolean" ? !u : !1;
    }
    function h(d, u, f) {
      var p = d.name.toLowerCase();
      return u === !0 ? !1 : typeof u[p] == "function" ? !u[p](d.value, f) : typeof u[p] > "u" || u[p] === !1 ? !0 : typeof u[p] == "string" ? u[p] !== d.value : !1;
    }
    return e;
  });
})(hc);
const uc = fn;
function Or(n, t) {
  return n.map((e) => {
    const o = G(t) ? t(e.tool) : t;
    return _t(o) || (e.data = Nn(e.data, o)), e;
  });
}
function Rt(n, t = {}) {
  const e = {
    tags: t
  };
  return new uc(e).clean(n);
}
function Nn(n, t) {
  return Array.isArray(n) ? pc(n, t) : st(n) ? fc(n, t) : Gt(n) ? gc(n, t) : n;
}
function pc(n, t) {
  return n.map((e) => Nn(e, t));
}
function fc(n, t) {
  const e = {};
  for (const o in n) {
    if (!Object.prototype.hasOwnProperty.call(n, o))
      continue;
    const i = n[o], r = mc(t[o]) ? t[o] : t;
    e[o] = Nn(i, r);
  }
  return e;
}
function gc(n, t) {
  return st(t) ? Rt(n, t) : t === !1 ? Rt(n, {}) : n;
}
function mc(n) {
  return st(n) || Hl(n) || G(n);
}
class bc extends V {
  /**
   * Available methods
   *
   * @returns {SanitizerConfig}
   */
  get methods() {
    return {
      clean: (t, e) => this.clean(t, e)
    };
  }
  /**
   * Perform sanitizing of a string
   *
   * @param {string} taintString - what to sanitize
   * @param {SanitizerConfig} config - sanitizer config
   * @returns {string}
   */
  clean(t, e) {
    return Rt(t, e);
  }
}
class vc extends V {
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
    const t = "Editor's content can not be saved in read-only mode";
    return this.Editor.ReadOnly.isEnabled ? (St(t, "warn"), Promise.reject(new Error(t))) : this.Editor.Saver.save();
  }
}
class wc extends V {
  /**
   * Available methods
   *
   * @returns {SelectionAPIInterface}
   */
  get methods() {
    return {
      findParentTag: (t, e) => this.findParentTag(t, e),
      expandToTag: (t) => this.expandToTag(t)
    };
  }
  /**
   * Looks ahead from selection and find passed tag with class name
   *
   * @param {string} tagName - tag to find
   * @param {string} className - tag's class name
   * @returns {HTMLElement|null}
   */
  findParentTag(t, e) {
    return new N().findParentTag(t, e);
  }
  /**
   * Expand selection to passed tag
   *
   * @param {HTMLElement} node - tag that should contain selection
   */
  expandToTag(t) {
    new N().expandToTag(t);
  }
}
class kc extends V {
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
class yc extends V {
  /**
   * Available methods
   *
   * @returns {Toolbar}
   */
  get methods() {
    return {
      close: () => this.close(),
      open: () => this.open(),
      toggleBlockSettings: (t) => this.toggleBlockSettings(t),
      toggleToolbox: (t) => this.toggleToolbox(t)
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
  toggleBlockSettings(t) {
    if (this.Editor.BlockManager.currentBlockIndex === -1) {
      St("Could't toggle the Toolbar because there is no block selected ", "warn");
      return;
    }
    t ?? !this.Editor.BlockSettings.opened ? (this.Editor.Toolbar.moveAndOpen(), this.Editor.BlockSettings.open()) : this.Editor.BlockSettings.close();
  }
  /**
   * Open toolbox
   *
   * @param {boolean} openingState - Opening state of toolbox
   */
  toggleToolbox(t) {
    if (this.Editor.BlockManager.currentBlockIndex === -1) {
      St("Could't toggle the Toolbox because there is no block selected ", "warn");
      return;
    }
    t ?? !this.Editor.Toolbar.toolbox.opened ? (this.Editor.Toolbar.moveAndOpen(), this.Editor.Toolbar.toolbox.open()) : this.Editor.Toolbar.toolbox.close();
  }
}
var gn = {}, xc = {
  get exports() {
    return gn;
  },
  set exports(n) {
    gn = n;
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
(function(n, t) {
  (function(e, o) {
    n.exports = o();
  })(window, function() {
    return function(e) {
      var o = {};
      function i(r) {
        if (o[r])
          return o[r].exports;
        var s = o[r] = { i: r, l: !1, exports: {} };
        return e[r].call(s.exports, s, s.exports, i), s.l = !0, s.exports;
      }
      return i.m = e, i.c = o, i.d = function(r, s, a) {
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
    }([function(e, o, i) {
      e.exports = i(1);
    }, function(e, o, i) {
      i.r(o), i.d(o, "default", function() {
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
          const h = Object.assign({ placement: "bottom", marginTop: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, delay: 70, hidingDelay: 0 }, c);
          if (h.hidingDelay && (this.hidingDelay = h.hidingDelay), this.nodes.content.innerHTML = "", typeof l == "string")
            this.nodes.content.appendChild(document.createTextNode(l));
          else {
            if (!(l instanceof Node))
              throw Error("[CodeX Tooltip] Wrong type of «content» passed. It should be an instance of Node or String. But " + typeof l + " given.");
            this.nodes.content.appendChild(l);
          }
          switch (this.nodes.wrapper.classList.remove(...Object.values(this.CSS.placement)), h.placement) {
            case "top":
              this.placeTop(a, h);
              break;
            case "left":
              this.placeLeft(a, h);
              break;
            case "right":
              this.placeRight(a, h);
              break;
            case "bottom":
            default:
              this.placeBottom(a, h);
          }
          h && h.delay ? this.showingTimeout = setTimeout(() => {
            this.nodes.wrapper.classList.add(this.CSS.tooltipShown), this.showed = !0;
          }, h.delay) : (this.nodes.wrapper.classList.add(this.CSS.tooltipShown), this.showed = !0);
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
          const c = a.getBoundingClientRect(), h = c.left + a.clientWidth / 2 - this.nodes.wrapper.offsetWidth / 2, d = c.bottom + window.pageYOffset + this.offsetTop + l.marginTop;
          this.applyPlacement("bottom", h, d);
        }
        placeTop(a, l) {
          const c = a.getBoundingClientRect(), h = c.left + a.clientWidth / 2 - this.nodes.wrapper.offsetWidth / 2, d = c.top + window.pageYOffset - this.nodes.wrapper.clientHeight - this.offsetTop;
          this.applyPlacement("top", h, d);
        }
        placeLeft(a, l) {
          const c = a.getBoundingClientRect(), h = c.left - this.nodes.wrapper.offsetWidth - this.offsetLeft - l.marginLeft, d = c.top + window.pageYOffset + a.clientHeight / 2 - this.nodes.wrapper.offsetHeight / 2;
          this.applyPlacement("left", h, d);
        }
        placeRight(a, l) {
          const c = a.getBoundingClientRect(), h = c.right + this.offsetRight + l.marginRight, d = c.top + window.pageYOffset + a.clientHeight / 2 - this.nodes.wrapper.offsetHeight / 2;
          this.applyPlacement("right", h, d);
        }
        applyPlacement(a, l, c) {
          this.nodes.wrapper.classList.add(this.CSS.placement[a]), this.nodes.wrapper.style.left = l + "px", this.nodes.wrapper.style.top = c + "px";
        }
        make(a, l = null, c = {}) {
          const h = document.createElement(a);
          Array.isArray(l) ? h.classList.add(...l) : l && h.classList.add(l);
          for (const d in c)
            c.hasOwnProperty(d) && (h[d] = c[d]);
          return h;
        }
        append(a, l) {
          Array.isArray(l) ? l.forEach((c) => a.appendChild(c)) : a.appendChild(l);
        }
        prepend(a, l) {
          Array.isArray(l) ? (l = l.reverse()).forEach((c) => a.prepend(c)) : a.prepend(l);
        }
      }
    }, function(e, o) {
      e.exports = `.ct{z-index:999;opacity:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none;-webkit-transition:opacity 50ms ease-in,-webkit-transform 70ms cubic-bezier(.215,.61,.355,1);transition:opacity 50ms ease-in,-webkit-transform 70ms cubic-bezier(.215,.61,.355,1);transition:opacity 50ms ease-in,transform 70ms cubic-bezier(.215,.61,.355,1);transition:opacity 50ms ease-in,transform 70ms cubic-bezier(.215,.61,.355,1),-webkit-transform 70ms cubic-bezier(.215,.61,.355,1);will-change:opacity,top,left;-webkit-box-shadow:0 8px 12px 0 rgba(29,32,43,.17),0 4px 5px -3px rgba(5,6,12,.49);box-shadow:0 8px 12px 0 rgba(29,32,43,.17),0 4px 5px -3px rgba(5,6,12,.49);border-radius:9px}.ct,.ct:before{position:absolute;top:0;left:0}.ct:before{content:"";bottom:0;right:0;background-color:#1d202b;z-index:-1;border-radius:4px}@supports(-webkit-mask-box-image:url("")){.ct:before{border-radius:0;-webkit-mask-box-image:url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M10.71 0h2.58c3.02 0 4.64.42 6.1 1.2a8.18 8.18 0 013.4 3.4C23.6 6.07 24 7.7 24 10.71v2.58c0 3.02-.42 4.64-1.2 6.1a8.18 8.18 0 01-3.4 3.4c-1.47.8-3.1 1.21-6.11 1.21H10.7c-3.02 0-4.64-.42-6.1-1.2a8.18 8.18 0 01-3.4-3.4C.4 17.93 0 16.3 0 13.29V10.7c0-3.02.42-4.64 1.2-6.1a8.18 8.18 0 013.4-3.4C6.07.4 7.7 0 10.71 0z"/></svg>') 48% 41% 37.9% 53.3%}}@media (--mobile){.ct{display:none}}.ct__content{padding:6px 10px;color:#cdd1e0;font-size:12px;text-align:center;letter-spacing:.02em;line-height:1em}.ct:after{content:"";width:8px;height:8px;position:absolute;background-color:#1d202b;z-index:-1}.ct--bottom{-webkit-transform:translateY(5px);transform:translateY(5px)}.ct--bottom:after{top:-3px;left:50%;-webkit-transform:translateX(-50%) rotate(-45deg);transform:translateX(-50%) rotate(-45deg)}.ct--top{-webkit-transform:translateY(-5px);transform:translateY(-5px)}.ct--top:after{top:auto;bottom:-3px;left:50%;-webkit-transform:translateX(-50%) rotate(-45deg);transform:translateX(-50%) rotate(-45deg)}.ct--left{-webkit-transform:translateX(-5px);transform:translateX(-5px)}.ct--left:after{top:50%;left:auto;right:0;-webkit-transform:translate(41.6%,-50%) rotate(-45deg);transform:translate(41.6%,-50%) rotate(-45deg)}.ct--right{-webkit-transform:translateX(5px);transform:translateX(5px)}.ct--right:after{top:50%;left:0;-webkit-transform:translate(-41.6%,-50%) rotate(-45deg);transform:translate(-41.6%,-50%) rotate(-45deg)}.ct--shown{opacity:1;-webkit-transform:none;transform:none}`;
    }]).default;
  });
})(xc);
const Ec = /* @__PURE__ */ Ro(gn);
class Dn {
  constructor() {
    this.lib = new Ec();
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
  show(t, e, o) {
    this.lib.show(t, e, o);
  }
  /**
   * Hides tooltip
   *
   * @param skipHidingDelay — pass true to immediately hide the tooltip
   */
  hide(t = !1) {
    this.lib.hide(t);
  }
  /**
   * Binds 'mouseenter' and 'mouseleave' events that shows/hides the Tooltip
   *
   * @param {HTMLElement} element - any HTML element in DOM
   * @param content - tooltip's content
   * @param options - showing settings
   */
  onHover(t, e, o) {
    this.lib.onHover(t, e, o);
  }
}
class Sc extends V {
  /**
   * @class
   * @param moduleConfiguration - Module Configuration
   * @param moduleConfiguration.config - Editor's config
   * @param moduleConfiguration.eventsDispatcher - Editor's event dispatcher
   */
  constructor({ config: t, eventsDispatcher: e }) {
    super({
      config: t,
      eventsDispatcher: e
    }), this.tooltip = new Dn();
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
      show: (t, e, o) => this.show(t, e, o),
      hide: () => this.hide(),
      onHover: (t, e, o) => this.onHover(t, e, o)
    };
  }
  /**
   * Method show tooltip on element with passed HTML content
   *
   * @param {HTMLElement} element - element on which tooltip should be shown
   * @param {TooltipContent} content - tooltip content
   * @param {TooltipOptions} options - tooltip options
   */
  show(t, e, o) {
    this.tooltip.show(t, e, o);
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
  onHover(t, e, o) {
    this.tooltip.onHover(t, e, o);
  }
}
class Cc extends V {
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
function Ar(n, t) {
  const e = {};
  return Object.entries(n).forEach(([o, i]) => {
    if (st(i)) {
      const r = t ? `${t}.${o}` : o;
      Object.values(i).every((s) => Gt(s)) ? e[o] = r : e[o] = Ar(i, r);
      return;
    }
    e[o] = i;
  }), e;
}
const Ct = Ar(Tr);
function Tc(n, t) {
  const e = {};
  return Object.keys(n).forEach((o) => {
    const i = t[o];
    i !== void 0 ? e[i] = n[o] : e[o] = n[o];
  }), e;
}
const Bc = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M9 12L9 7.1C9 7.04477 9.04477 7 9.1 7H10.4C11.5 7 14 7.1 14 9.5C14 9.5 14 12 11 12M9 12V16.8C9 16.9105 9.08954 17 9.2 17H12.5C14 17 15 16 15 14.5C15 11.7046 11 12 11 12M9 12H11"/></svg>', Lr = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 10L11.8586 14.8586C11.9367 14.9367 12.0633 14.9367 12.1414 14.8586L17 10"/></svg>', _c = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 15L11.8586 10.1414C11.9367 10.0633 12.0633 10.0633 12.1414 10.1414L17 15"/></svg>', Ic = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 8L12 12M12 12L16 16M12 12L16 8M12 12L8 16"/></svg>', Mc = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/></svg>', Oc = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M13.34 10C12.4223 12.7337 11 17 11 17"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M14.21 7H14.2"/></svg>', Mi = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7.69998 12.6L7.67896 12.62C6.53993 13.7048 6.52012 15.5155 7.63516 16.625V16.625C8.72293 17.7073 10.4799 17.7102 11.5712 16.6314L13.0263 15.193C14.0703 14.1609 14.2141 12.525 13.3662 11.3266L13.22 11.12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16.22 11.12L16.3564 10.9805C17.2895 10.0265 17.3478 8.5207 16.4914 7.49733V7.49733C15.5691 6.39509 13.9269 6.25143 12.8271 7.17675L11.3901 8.38588C10.0935 9.47674 9.95706 11.4241 11.0888 12.6852L11.12 12.72"/></svg>', Ac = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.40999 7.29999H9.4"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 7.29999H14.59"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.30999 12H9.3"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 12H14.59"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M9.40999 16.7H9.4"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2.6" d="M14.6 16.7H14.59"/></svg>', Lc = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 7V12M12 17V12M17 12H12M12 12H7"/></svg>', Nc = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="5.5" stroke="currentColor" stroke-width="2"/><line x1="15.4142" x2="19" y1="15" y2="18.5858" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>', Dc = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M15.7795 11.5C15.7795 11.5 16.053 11.1962 16.5497 10.6722C17.4442 9.72856 17.4701 8.2475 16.5781 7.30145V7.30145C15.6482 6.31522 14.0873 6.29227 13.1288 7.25073L11.8796 8.49999"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8.24517 12.3883C8.24517 12.3883 7.97171 12.6922 7.47504 13.2161C6.58051 14.1598 6.55467 15.6408 7.44666 16.5869V16.5869C8.37653 17.5731 9.93744 17.5961 10.8959 16.6376L12.1452 15.3883"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M17.7802 15.1032L16.597 14.9422C16.0109 14.8624 15.4841 15.3059 15.4627 15.8969L15.4199 17.0818"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6.39064 9.03238L7.58432 9.06668C8.17551 9.08366 8.6522 8.58665 8.61056 7.99669L8.5271 6.81397"/><line x1="12.1142" x2="11.7" y1="12.2" y2="11.7858" stroke="currentColor" stroke-linecap="round" stroke-width="2"/></svg>';
class Q {
  /**
   * Constructs popover item instance
   *
   * @param params - popover item construction params
   */
  constructor(t) {
    this.nodes = {
      root: null,
      icon: null
    }, this.confirmationState = null, this.removeSpecialFocusBehavior = () => {
      this.nodes.root.classList.remove(Q.CSS.noFocus);
    }, this.removeSpecialHoverBehavior = () => {
      this.nodes.root.classList.remove(Q.CSS.noHover);
    }, this.onErrorAnimationEnd = () => {
      this.nodes.icon.classList.remove(Q.CSS.wobbleAnimation), this.nodes.icon.removeEventListener("animationend", this.onErrorAnimationEnd);
    }, this.params = t, this.nodes.root = this.make(t);
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
    return this.nodes.root.classList.contains(Q.CSS.focused);
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
  toggleActive(t) {
    this.nodes.root.classList.toggle(Q.CSS.active, t);
  }
  /**
   * Toggles item hidden state
   *
   * @param isHidden - true if item should be hidden
   */
  toggleHidden(t) {
    this.nodes.root.classList.toggle(Q.CSS.hidden, t);
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
  make(t) {
    const e = g.make("div", Q.CSS.container);
    return t.name && (e.dataset.itemName = t.name), this.nodes.icon = g.make("div", Q.CSS.icon, {
      innerHTML: t.icon || Mc
    }), e.appendChild(this.nodes.icon), e.appendChild(g.make("div", Q.CSS.title, {
      innerHTML: t.title || ""
    })), t.secondaryLabel && e.appendChild(g.make("div", Q.CSS.secondaryTitle, {
      textContent: t.secondaryLabel
    })), t.isActive && e.classList.add(Q.CSS.active), t.isDisabled && e.classList.add(Q.CSS.disabled), e;
  }
  /**
   * Activates confirmation mode for the item.
   *
   * @param newState - new popover item params that should be applied
   */
  enableConfirmationMode(t) {
    const e = {
      ...this.params,
      ...t,
      confirmation: t.confirmation
    }, o = this.make(e);
    this.nodes.root.innerHTML = o.innerHTML, this.nodes.root.classList.add(Q.CSS.confirmationState), this.confirmationState = t, this.enableSpecialHoverAndFocusBehavior();
  }
  /**
   * Returns item to its original state
   */
  disableConfirmationMode() {
    const t = this.make(this.params);
    this.nodes.root.innerHTML = t.innerHTML, this.nodes.root.classList.remove(Q.CSS.confirmationState), this.confirmationState = null, this.disableSpecialHoverAndFocusBehavior();
  }
  /**
   * Enables special focus and hover behavior for item in confirmation state.
   * This is needed to prevent item from being highlighted as hovered/focused just after click.
   */
  enableSpecialHoverAndFocusBehavior() {
    this.nodes.root.classList.add(Q.CSS.noHover), this.nodes.root.classList.add(Q.CSS.noFocus), this.nodes.root.addEventListener("mouseleave", this.removeSpecialHoverBehavior, { once: !0 });
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
  activateOrEnableConfirmationMode(t) {
    if (t.confirmation === void 0)
      try {
        t.onActivate(t), this.disableConfirmationMode();
      } catch {
        this.animateError();
      }
    else
      this.enableConfirmationMode(t.confirmation);
  }
  /**
   * Animates item which symbolizes that error occured while executing 'onActivate()' callback
   */
  animateError() {
    this.nodes.icon.classList.contains(Q.CSS.wobbleAnimation) || (this.nodes.icon.classList.add(Q.CSS.wobbleAnimation), this.nodes.icon.addEventListener("animationend", this.onErrorAnimationEnd));
  }
}
const Ne = class {
  /**
   * @param {HTMLElement[]} nodeList — the list of iterable HTML-items
   * @param {string} focusedCssClass - user-provided CSS-class that will be set in flipping process
   */
  constructor(n, t) {
    this.cursor = -1, this.items = [], this.items = n || [], this.focusedCssClass = t;
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
  setCursor(n) {
    n < this.items.length && n >= -1 && (this.dropCursor(), this.cursor = n, this.items[this.cursor].classList.add(this.focusedCssClass));
  }
  /**
   * Sets items. Can be used when iterable items changed dynamically
   *
   * @param {HTMLElement[]} nodeList - nodes to iterate
   */
  setItems(n) {
    this.items = n;
  }
  /**
   * Sets cursor next to the current
   */
  next() {
    this.cursor = this.leafNodesAndReturnIndex(Ne.directions.RIGHT);
  }
  /**
   * Sets cursor before current
   */
  previous() {
    this.cursor = this.leafNodesAndReturnIndex(Ne.directions.LEFT);
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
  leafNodesAndReturnIndex(n) {
    if (this.items.length === 0)
      return this.cursor;
    let t = this.cursor;
    return t === -1 ? t = n === Ne.directions.RIGHT ? -1 : 0 : this.items[t].classList.remove(this.focusedCssClass), n === Ne.directions.RIGHT ? t = (t + 1) % this.items.length : t = (this.items.length + t - 1) % this.items.length, g.canSetCaret(this.items[t]) && de(() => N.setCursor(this.items[t]), 50)(), this.items[t].classList.add(this.focusedCssClass), t;
  }
};
let we = Ne;
we.directions = {
  RIGHT: "right",
  LEFT: "left"
};
class Ht {
  /**
   * @param {FlipperOptions} options - different constructing settings
   */
  constructor(t) {
    this.iterator = null, this.activated = !1, this.flipCallbacks = [], this.onKeyDown = (e) => {
      if (this.isEventReadyForHandling(e))
        switch (Ht.usedKeys.includes(e.keyCode) && e.preventDefault(), e.keyCode) {
          case H.TAB:
            this.handleTabPress(e);
            break;
          case H.LEFT:
          case H.UP:
            this.flipLeft();
            break;
          case H.RIGHT:
          case H.DOWN:
            this.flipRight();
            break;
          case H.ENTER:
            this.handleEnterPress(e);
            break;
        }
    }, this.iterator = new we(t.items, t.focusedItemClass), this.activateCallback = t.activateCallback, this.allowedKeys = t.allowedKeys || Ht.usedKeys;
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
      H.TAB,
      H.LEFT,
      H.RIGHT,
      H.ENTER,
      H.UP,
      H.DOWN
    ];
  }
  /**
   * Active tab/arrows handling by flipper
   *
   * @param items - Some modules (like, InlineToolbar, BlockSettings) might refresh buttons dynamically
   * @param cursorPosition - index of the item that should be focused once flipper is activated
   */
  activate(t, e) {
    this.activated = !0, t && this.iterator.setItems(t), e !== void 0 && this.iterator.setCursor(e), document.addEventListener("keydown", this.onKeyDown, !0);
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
  onFlip(t) {
    this.flipCallbacks.push(t);
  }
  /**
   * Unregisteres function that is executed on each navigation action
   *
   * @param cb - function to stop executing
   */
  removeOnFlip(t) {
    this.flipCallbacks = this.flipCallbacks.filter((e) => e !== t);
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
  isEventReadyForHandling(t) {
    return this.activated && this.allowedKeys.includes(t.keyCode);
  }
  /**
   * When flipper is activated tab press will leaf the items
   *
   * @param {KeyboardEvent} event - tab keydown event
   */
  handleTabPress(t) {
    switch (t.shiftKey ? we.directions.LEFT : we.directions.RIGHT) {
      case we.directions.RIGHT:
        this.flipRight();
        break;
      case we.directions.LEFT:
        this.flipLeft();
        break;
    }
  }
  /**
   * Enter press will click current item if flipper is activated
   *
   * @param {KeyboardEvent} event - enter keydown event
   */
  handleEnterPress(t) {
    this.activated && (this.iterator.currentItem && (t.stopPropagation(), t.preventDefault(), this.iterator.currentItem.click()), G(this.activateCallback) && this.activateCallback(this.iterator.currentItem));
  }
  /**
   * Fired after flipping in any direction
   */
  flipCallback() {
    this.iterator.currentItem && this.iterator.currentItem.scrollIntoViewIfNeeded(), this.flipCallbacks.forEach((t) => t());
  }
}
class $e {
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
  constructor({ items: t, onSearch: e, placeholder: o }) {
    this.listeners = new An(), this.items = t, this.onSearch = e, this.render(o);
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
  render(t) {
    this.wrapper = g.make("div", $e.CSS.wrapper);
    const e = g.make("div", $e.CSS.icon, {
      innerHTML: Nc
    });
    this.input = g.make("input", $e.CSS.input, {
      placeholder: t
    }), this.wrapper.appendChild(e), this.wrapper.appendChild(this.input), this.listeners.on(this.input, "input", () => {
      this.searchQuery = this.input.value, this.onSearch(this.searchQuery, this.foundItems);
    });
  }
  /**
   * Returns list of found items for the current search query
   */
  get foundItems() {
    return this.items.filter((t) => this.checkItem(t));
  }
  /**
   * Contains logic for checking whether passed item conforms the search query
   *
   * @param item - item to be checked
   */
  checkItem(t) {
    var e;
    const o = ((e = t.title) == null ? void 0 : e.toLowerCase()) || "", i = this.searchQuery.toLowerCase();
    return o.includes(i);
  }
}
const De = class {
  /**
   * Locks body element scroll
   */
  lock() {
    Ii ? this.lockHard() : document.body.classList.add(De.CSS.scrollLocked);
  }
  /**
   * Unlocks body element scroll
   */
  unlock() {
    Ii ? this.unlockHard() : document.body.classList.remove(De.CSS.scrollLocked);
  }
  /**
   * Locks scroll in a hard way (via setting fixed position to body element)
   */
  lockHard() {
    this.scrollPosition = window.pageYOffset, document.documentElement.style.setProperty(
      "--window-scroll-offset",
      `${this.scrollPosition}px`
    ), document.body.classList.add(De.CSS.scrollLockedHard);
  }
  /**
   * Unlocks hard scroll lock
   */
  unlockHard() {
    document.body.classList.remove(De.CSS.scrollLockedHard), this.scrollPosition !== null && window.scrollTo(0, this.scrollPosition), this.scrollPosition = null;
  }
};
let Nr = De;
Nr.CSS = {
  scrollLocked: "ce-scroll-locked",
  scrollLockedHard: "ce-scroll-locked--hard"
};
var Rc = Object.defineProperty, Pc = Object.getOwnPropertyDescriptor, Fc = (n, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? Pc(t, e) : t, r = n.length - 1, s; r >= 0; r--)
    (s = n[r]) && (i = (o ? s(t, e, i) : s(i)) || i);
  return o && i && Rc(t, e, i), i;
}, qe = /* @__PURE__ */ ((n) => (n.Close = "close", n))(qe || {});
const it = class extends Po {
  /**
   * Constructs the instance
   *
   * @param params - popover construction params
   */
  constructor(n) {
    super(), this.scopeElement = document.body, this.listeners = new An(), this.scrollLocker = new Nr(), this.nodes = {
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
      this.items.find((t) => t.isFocused).onFocus();
    }, this.items = n.items.map((t) => new Q(t)), n.scopeElement !== void 0 && (this.scopeElement = n.scopeElement), n.messages && (this.messages = {
      ...this.messages,
      ...n.messages
    }), n.customContentFlippableItems && (this.customContentFlippableItems = n.customContentFlippableItems), this.make(), n.customContent && this.addCustomContent(n.customContent), n.searchable && this.addSearch(), this.initializeFlipper();
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
    this.shouldOpenBottom || (this.nodes.popover.style.setProperty("--popover-height", this.height + "px"), this.nodes.popover.classList.add(it.CSS.popoverOpenTop)), this.nodes.overlay.classList.remove(it.CSS.overlayHidden), this.nodes.popover.classList.add(it.CSS.popoverOpened), this.flipper.activate(this.flippableElements), this.search !== void 0 && setTimeout(() => {
      this.search.focus();
    }, 100), re() && this.scrollLocker.lock();
  }
  /**
   * Closes popover
   */
  hide() {
    this.nodes.popover.classList.remove(it.CSS.popoverOpened), this.nodes.popover.classList.remove(it.CSS.popoverOpenTop), this.nodes.overlay.classList.add(it.CSS.overlayHidden), this.flipper.deactivate(), this.items.forEach((n) => n.reset()), this.search !== void 0 && this.search.clear(), re() && this.scrollLocker.unlock(), this.emit(
      "close"
      /* Close */
    );
  }
  /**
   * Clears memory
   */
  destroy() {
    this.flipper.deactivate(), this.listeners.removeAll(), re() && this.scrollLocker.unlock();
  }
  /**
   * Constructs HTML element corresponding to popover
   */
  make() {
    this.nodes.popover = g.make("div", [it.CSS.popover]), this.nodes.nothingFoundMessage = g.make("div", [it.CSS.nothingFoundMessage], {
      textContent: this.messages.nothingFound
    }), this.nodes.popover.appendChild(this.nodes.nothingFoundMessage), this.nodes.items = g.make("div", [it.CSS.items]), this.items.forEach((n) => {
      this.nodes.items.appendChild(n.getElement());
    }), this.nodes.popover.appendChild(this.nodes.items), this.listeners.on(this.nodes.popover, "click", (n) => {
      const t = this.getTargetItem(n);
      t !== void 0 && this.handleItemClick(t);
    }), this.nodes.wrapper = g.make("div"), this.nodes.overlay = g.make("div", [it.CSS.overlay, it.CSS.overlayHidden]), this.listeners.on(this.nodes.overlay, "click", () => {
      this.hide();
    }), this.nodes.wrapper.appendChild(this.nodes.overlay), this.nodes.wrapper.appendChild(this.nodes.popover);
  }
  /**
   * Adds search to the popover
   */
  addSearch() {
    this.search = new $e({
      items: this.items,
      placeholder: this.messages.search,
      onSearch: (t, e) => {
        this.items.forEach((i) => {
          const r = !e.includes(i);
          i.toggleHidden(r);
        }), this.toggleNothingFoundMessage(e.length === 0), this.toggleCustomContent(t !== "");
        const o = t === "" ? this.flippableElements : e.map((i) => i.getElement());
        this.flipper.isActivated && (this.flipper.deactivate(), this.flipper.activate(o));
      }
    });
    const n = this.search.getElement();
    n.classList.add(it.CSS.search), this.nodes.popover.insertBefore(n, this.nodes.popover.firstChild);
  }
  /**
   * Adds custom html content to the popover
   *
   * @param content - html content to append
   */
  addCustomContent(n) {
    this.nodes.customContent = n, this.nodes.customContent.classList.add(it.CSS.customContent), this.nodes.popover.insertBefore(n, this.nodes.popover.firstChild);
  }
  /**
   * Retrieves popover item that is the target of the specified event
   *
   * @param event - event to retrieve popover item from
   */
  getTargetItem(n) {
    return this.items.find((t) => n.composedPath().includes(t.getElement()));
  }
  /**
   * Handles item clicks
   *
   * @param item - item to handle click of
   */
  handleItemClick(n) {
    n.isDisabled || (this.items.filter((t) => t !== n).forEach((t) => t.reset()), n.handleClick(), this.toggleItemActivenessIfNeeded(n), n.closeOnActivate && this.hide());
  }
  /**
   * Creates Flipper instance which allows to navigate between popover items via keyboard
   */
  initializeFlipper() {
    this.flipper = new Ht({
      items: this.flippableElements,
      focusedItemClass: Q.CSS.focused,
      allowedKeys: [
        H.TAB,
        H.UP,
        H.DOWN,
        H.ENTER
      ]
    }), this.flipper.onFlip(this.onFlip);
  }
  /**
   * Returns list of elements available for keyboard navigation.
   * Contains both usual popover items elements and custom html content.
   */
  get flippableElements() {
    const n = this.items.map((t) => t.getElement());
    return (this.customContentFlippableItems || []).concat(n);
  }
  get height() {
    let n = 0;
    if (this.nodes.popover === null)
      return n;
    const t = this.nodes.popover.cloneNode(!0);
    return t.style.visibility = "hidden", t.style.position = "absolute", t.style.top = "-1000px", t.classList.add(it.CSS.popoverOpened), document.body.appendChild(t), n = t.offsetHeight, t.remove(), n;
  }
  /**
   * Checks if popover should be opened bottom.
   * It should happen when there is enough space below or not enough space above
   */
  get shouldOpenBottom() {
    const n = this.nodes.popover.getBoundingClientRect(), t = this.scopeElement.getBoundingClientRect(), e = this.height, o = n.top + e, i = n.top - e, r = Math.min(window.innerHeight, t.bottom);
    return i < t.top || o <= r;
  }
  /**
   * Toggles nothing found message visibility
   *
   * @param isDisplayed - true if the message should be displayed
   */
  toggleNothingFoundMessage(n) {
    this.nodes.nothingFoundMessage.classList.toggle(it.CSS.nothingFoundMessageDisplayed, n);
  }
  /**
   * Toggles custom content visibility
   *
   * @param isDisplayed - true if custom content should be displayed
   */
  toggleCustomContent(n) {
    var t;
    (t = this.nodes.customContent) == null || t.classList.toggle(it.CSS.customContentHidden, n);
  }
  /**
   * - Toggles item active state, if clicked popover item has property 'toggle' set to true.
   *
   * - Performs radiobutton-like behavior if the item has property 'toggle' set to string key.
   * (All the other items with the same key get inactive, and the item gets active)
   *
   * @param clickedItem - popover item that was clicked
   */
  toggleItemActivenessIfNeeded(n) {
    if (n.toggle === !0 && n.toggleActive(), typeof n.toggle == "string") {
      const t = this.items.filter((e) => e.toggle === n.toggle);
      if (t.length === 1) {
        n.toggleActive();
        return;
      }
      t.forEach((e) => {
        e.toggleActive(e === n);
      });
    }
  }
};
let Rn = it;
Fc([
  Me
], Rn.prototype, "height", 1);
class Hc extends V {
  constructor() {
    super(...arguments), this.opened = !1, this.selection = new N(), this.onPopoverClose = () => {
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
    var t;
    return (t = this.popover) == null ? void 0 : t.flipper;
  }
  /**
   * Panel with block settings with 2 sections:
   *  - Tool's Settings
   *  - Default Settings [Move, Remove, etc]
   */
  make() {
    this.nodes.wrapper = g.make("div", [this.CSS.settings]);
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
  open(t = this.Editor.BlockManager.currentBlock) {
    this.opened = !0, this.selection.save(), t.selected = !0, this.Editor.BlockSelection.clearCache();
    const [e, o] = t.getTunes();
    this.eventsDispatcher.emit(this.events.opened), this.popover = new Rn({
      searchable: !0,
      items: e.map((i) => this.resolveTuneAliases(i)),
      customContent: o,
      customContentFlippableItems: this.getControls(o),
      scopeElement: this.Editor.API.methods.ui.nodes.redactor,
      messages: {
        nothingFound: pt.ui(Ct.ui.popover, "Nothing found"),
        search: pt.ui(Ct.ui.popover, "Filter")
      }
    }), this.popover.on(qe.Close, this.onPopoverClose), this.nodes.wrapper.append(this.popover.getElement()), this.popover.show();
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
    this.opened = !1, N.isAtEditor || this.selection.restore(), this.selection.clearSaved(), !this.Editor.CrossBlockSelection.isCrossBlockSelectionStarted && this.Editor.BlockManager.currentBlock && (this.Editor.BlockManager.currentBlock.selected = !1), this.eventsDispatcher.emit(this.events.closed), this.popover && (this.popover.off(qe.Close, this.onPopoverClose), this.popover.destroy(), this.popover.getElement().remove(), this.popover = null);
  }
  /**
   * Returns list of buttons and inputs inside specified container
   *
   * @param container - container to query controls inside of
   */
  getControls(t) {
    const { StylesAPI: e } = this.Editor, o = t.querySelectorAll(
      `.${e.classes.settingsButton}, ${g.allInputsSelector}`
    );
    return Array.from(o);
  }
  /**
   * Resolves aliases in tunes menu items
   *
   * @param item - item with resolved aliases
   */
  resolveTuneAliases(t) {
    const e = Tc(t, { label: "title" });
    return t.confirmation && (e.confirmation = this.resolveTuneAliases(t.confirmation)), e;
  }
}
class kt extends V {
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
    this.nodes.wrapper = g.make("div", [
      kt.CSS.conversionToolbarWrapper,
      ...this.isRtl ? [this.Editor.UI.CSS.editorRtlFix] : []
    ]), this.nodes.tools = g.make("div", kt.CSS.conversionToolbarTools);
    const t = g.make("div", kt.CSS.conversionToolbarLabel, {
      textContent: pt.ui(Ct.ui.inlineToolbar.converter, "Convert to")
    });
    return this.addTools(), this.enableFlipper(), g.append(this.nodes.wrapper, t), g.append(this.nodes.wrapper, this.nodes.tools), this.nodes.wrapper;
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
  toggle(t) {
    this.opened ? this.close() : this.open(), G(t) && (this.togglingCallback = t);
  }
  /**
   * Shows Conversion Toolbar
   */
  open() {
    this.filterTools(), this.opened = !0, this.nodes.wrapper.classList.add(kt.CSS.conversionToolbarShowed), window.requestAnimationFrame(() => {
      this.flipper.activate(this.tools.map((t) => t.button).filter((t) => !t.classList.contains(kt.CSS.conversionToolHidden))), this.flipper.focusFirst(), G(this.togglingCallback) && this.togglingCallback(!0);
    });
  }
  /**
   * Closes Conversion Toolbar
   */
  close() {
    this.opened = !1, this.flipper.deactivate(), this.nodes.wrapper.classList.remove(kt.CSS.conversionToolbarShowed), G(this.togglingCallback) && this.togglingCallback(!1);
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
  async replaceWithBlock(t, e) {
    const o = this.Editor.BlockManager.currentBlock.tool, i = (await this.Editor.BlockManager.currentBlock.save()).data, r = this.Editor.Tools.blockTools.get(t);
    let s = "";
    const a = o.conversionConfig.export;
    if (G(a))
      s = a(i);
    else if (Gt(a))
      s = i[a];
    else {
      z("Conversion «export» property must be a string or function. String means key of saved data object to export. Function should export processed string to export.");
      return;
    }
    const l = Rt(
      s,
      r.sanitizeConfig
    );
    let c = {};
    const h = r.conversionConfig.import;
    if (G(h))
      c = h(l);
    else if (Gt(h))
      c[h] = l;
    else {
      z("Conversion «import» property must be a string or function. String means key of tool data to import. Function accepts a imported string and return composed tool data.");
      return;
    }
    e && (c = Object.assign(c, e)), this.Editor.BlockManager.replace({
      tool: t,
      data: c
    }), this.Editor.BlockSelection.clearSelection(), this.close(), this.Editor.InlineToolbar.close(), de(() => {
      this.Editor.Caret.setToBlock(this.Editor.BlockManager.currentBlock);
    }, 10)();
  }
  /**
   * Iterates existing Tools and inserts to the ConversionToolbar
   * if tools have ability to import
   */
  addTools() {
    const t = this.Editor.Tools.blockTools;
    Array.from(t.entries()).forEach(([e, o]) => {
      const i = o.conversionConfig;
      !i || !i.import || o.toolbox.forEach(
        (r) => this.addToolIfValid(e, r)
      );
    });
  }
  /**
   * Inserts a tool to the ConversionToolbar if the tool's toolbox config is valid
   *
   * @param name - tool's name
   * @param toolboxSettings - tool's single toolbox setting
   */
  addToolIfValid(t, e) {
    _t(e) || !e.icon || this.addTool(t, e);
  }
  /**
   * Add tool to the Conversion Toolbar
   *
   * @param toolName - name of Tool to add
   * @param toolboxItem - tool's toolbox item data
   */
  addTool(t, e) {
    const o = g.make("div", [kt.CSS.conversionTool]), i = g.make("div", [kt.CSS.conversionToolIcon]);
    o.dataset.tool = t, i.innerHTML = e.icon, g.append(o, i), g.append(o, g.text(pt.t(Ct.toolNames, e.title || Io(t)))), g.append(this.nodes.tools, o), this.tools.push({
      name: t,
      button: o,
      toolboxItem: e
    }), this.listeners.on(o, "click", async () => {
      await this.replaceWithBlock(t, e.data);
    });
  }
  /**
   * Hide current Tool and show others
   */
  async filterTools() {
    const { currentBlock: t } = this.Editor.BlockManager, e = await t.getActiveToolboxEntry();
    function o(i, r) {
      return i.icon === r.icon && i.title === r.title;
    }
    this.tools.forEach((i) => {
      let r = !1;
      if (e) {
        const s = o(e, i.toolboxItem);
        r = i.button.dataset.tool === t.name && s;
      }
      i.button.hidden = r, i.button.classList.toggle(kt.CSS.conversionToolHidden, r);
    });
  }
  /**
   * Prepare Flipper to be able to leaf tools by arrows/tab
   */
  enableFlipper() {
    this.flipper = new Ht({
      focusedItemClass: kt.CSS.conversionToolFocused
    });
  }
}
var mn = {}, jc = {
  get exports() {
    return mn;
  },
  set exports(n) {
    mn = n;
  }
};
/*!
 * Library for handling keyboard shortcuts
 * @copyright CodeX (https://codex.so)
 * @license MIT
 * @author CodeX (https://codex.so)
 * @version 1.2.0
 */
(function(n, t) {
  (function(e, o) {
    n.exports = o();
  })(window, function() {
    return function(e) {
      var o = {};
      function i(r) {
        if (o[r])
          return o[r].exports;
        var s = o[r] = { i: r, l: !1, exports: {} };
        return e[r].call(s.exports, s, s.exports, i), s.l = !0, s.exports;
      }
      return i.m = e, i.c = o, i.d = function(r, s, a) {
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
    }([function(e, o, i) {
      function r(l, c) {
        for (var h = 0; h < c.length; h++) {
          var d = c[h];
          d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(l, d.key, d);
        }
      }
      function s(l, c, h) {
        return c && r(l.prototype, c), h && r(l, h), l;
      }
      i.r(o);
      var a = function() {
        function l(c) {
          var h = this;
          (function(d, u) {
            if (!(d instanceof u))
              throw new TypeError("Cannot call a class as a function");
          })(this, l), this.commands = {}, this.keys = {}, this.name = c.name, this.parseShortcutName(c.name), this.element = c.on, this.callback = c.callback, this.executeShortcut = function(d) {
            h.execute(d);
          }, this.element.addEventListener("keydown", this.executeShortcut, !1);
        }
        return s(l, null, [{ key: "supportedCommands", get: function() {
          return { SHIFT: ["SHIFT"], CMD: ["CMD", "CONTROL", "COMMAND", "WINDOWS", "CTRL"], ALT: ["ALT", "OPTION"] };
        } }, { key: "keyCodes", get: function() {
          return { 0: 48, 1: 49, 2: 50, 3: 51, 4: 52, 5: 53, 6: 54, 7: 55, 8: 56, 9: 57, A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90, BACKSPACE: 8, ENTER: 13, ESCAPE: 27, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, INSERT: 45, DELETE: 46, ".": 190 };
        } }]), s(l, [{ key: "parseShortcutName", value: function(c) {
          c = c.split("+");
          for (var h = 0; h < c.length; h++) {
            c[h] = c[h].toUpperCase();
            var d = !1;
            for (var u in l.supportedCommands)
              if (l.supportedCommands[u].includes(c[h])) {
                d = this.commands[u] = !0;
                break;
              }
            d || (this.keys[c[h]] = !0);
          }
          for (var f in l.supportedCommands)
            this.commands[f] || (this.commands[f] = !1);
        } }, { key: "execute", value: function(c) {
          var h, d = { CMD: c.ctrlKey || c.metaKey, SHIFT: c.shiftKey, ALT: c.altKey }, u = !0;
          for (h in this.commands)
            this.commands[h] !== d[h] && (u = !1);
          var f, p = !0;
          for (f in this.keys)
            p = p && c.keyCode === l.keyCodes[f];
          u && p && this.callback(c);
        } }, { key: "remove", value: function() {
          this.element.removeEventListener("keydown", this.executeShortcut);
        } }]), l;
      }();
      o.default = a;
    }]).default;
  });
})(jc);
const Uc = /* @__PURE__ */ Ro(mn);
class zc {
  constructor() {
    this.registeredShortcuts = /* @__PURE__ */ new Map();
  }
  /**
   * Register shortcut
   *
   * @param shortcut - shortcut options
   */
  add(t) {
    if (this.findShortcut(t.on, t.name))
      throw Error(
        `Shortcut ${t.name} is already registered for ${t.on}. Please remove it before add a new handler.`
      );
    const e = new Uc({
      name: t.name,
      on: t.on,
      callback: t.handler
    }), o = this.registeredShortcuts.get(t.on) || [];
    this.registeredShortcuts.set(t.on, [...o, e]);
  }
  /**
   * Remove shortcut
   *
   * @param element - Element shortcut is set for
   * @param name - shortcut name
   */
  remove(t, e) {
    const o = this.findShortcut(t, e);
    if (!o)
      return;
    o.remove();
    const i = this.registeredShortcuts.get(t);
    this.registeredShortcuts.set(t, i.filter((r) => r !== o));
  }
  /**
   * Get Shortcut instance if exist
   *
   * @param element - Element shorcut is set for
   * @param shortcut - shortcut name
   * @returns {number} index - shortcut index if exist
   */
  findShortcut(t, e) {
    return (this.registeredShortcuts.get(t) || []).find(({ name: o }) => o === e);
  }
}
const Ie = new zc();
var Yc = Object.defineProperty, Vc = Object.getOwnPropertyDescriptor, Dr = (n, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? Vc(t, e) : t, r = n.length - 1, s; r >= 0; r--)
    (s = n[r]) && (i = (o ? s(t, e, i) : s(i)) || i);
  return o && i && Yc(t, e, i), i;
}, vo = /* @__PURE__ */ ((n) => (n.Opened = "toolbox-opened", n.Closed = "toolbox-closed", n.BlockAdded = "toolbox-block-added", n))(vo || {});
const Rr = class extends Po {
  /**
   * Toolbox constructor
   *
   * @param options - available parameters
   * @param options.api - Editor API methods
   * @param options.tools - Tools available to check whether some of them should be displayed at the Toolbox or not
   */
  constructor({ api: n, tools: t, i18nLabels: e }) {
    super(), this.opened = !1, this.nodes = {
      toolbox: null
    }, this.onPopoverClose = () => {
      this.opened = !1, this.emit(
        "toolbox-closed"
        /* Closed */
      );
    }, this.api = n, this.tools = t, this.i18nLabels = e;
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
    return this.popover = new Rn({
      scopeElement: this.api.ui.nodes.redactor,
      searchable: !0,
      messages: {
        nothingFound: this.i18nLabels.nothingFound,
        search: this.i18nLabels.filter
      },
      items: this.toolboxItemsToBeDisplayed
    }), this.popover.on(qe.Close, this.onPopoverClose), this.enableShortcuts(), this.nodes.toolbox = this.popover.getElement(), this.nodes.toolbox.classList.add(Rr.CSS.toolbox), this.nodes.toolbox;
  }
  /**
   * Returns true if the Toolbox has the Flipper activated and the Flipper has selected button
   */
  hasFocus() {
    var n;
    return (n = this.popover) == null ? void 0 : n.hasFocus();
  }
  /**
   * Destroy Module
   */
  destroy() {
    var n;
    super.destroy(), this.nodes && this.nodes.toolbox && (this.nodes.toolbox.remove(), this.nodes.toolbox = null), this.removeAllShortcuts(), (n = this.popover) == null || n.off(qe.Close, this.onPopoverClose);
  }
  /**
   * Toolbox Tool's button click handler
   *
   * @param toolName - tool type to be activated
   * @param blockDataOverrides - Block data predefined by the activated Toolbox item
   */
  toolButtonActivated(n, t) {
    this.insertNewBlock(n, t);
  }
  /**
   * Open Toolbox with Tools
   */
  open() {
    var n;
    this.isEmpty || ((n = this.popover) == null || n.show(), this.opened = !0, this.emit(
      "toolbox-opened"
      /* Opened */
    ));
  }
  /**
   * Close Toolbox
   */
  close() {
    var n;
    (n = this.popover) == null || n.hide(), this.opened = !1, this.emit(
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
    const n = [];
    return this.tools.forEach((t) => {
      t.toolbox && n.push(t);
    }), n;
  }
  get toolboxItemsToBeDisplayed() {
    const n = (t, e) => ({
      icon: t.icon,
      title: pt.t(Ct.toolNames, t.title || Io(e.name)),
      name: e.name,
      onActivate: () => {
        this.toolButtonActivated(e.name, t.data);
      },
      secondaryLabel: e.shortcut ? Sr(e.shortcut) : ""
    });
    return this.toolsToBeDisplayed.reduce((t, e) => (Array.isArray(e.toolbox) ? e.toolbox.forEach((o) => {
      t.push(n(o, e));
    }) : e.toolbox !== void 0 && t.push(n(e.toolbox, e)), t), []);
  }
  /**
   * Iterate all tools and enable theirs shortcuts if specified
   */
  enableShortcuts() {
    this.toolsToBeDisplayed.forEach((n) => {
      const t = n.shortcut;
      t && this.enableShortcutForTool(n.name, t);
    });
  }
  /**
   * Enable shortcut Block Tool implemented shortcut
   *
   * @param {string} toolName - Tool name
   * @param {string} shortcut - shortcut according to the ShortcutData Module format
   */
  enableShortcutForTool(n, t) {
    Ie.add({
      name: t,
      on: this.api.ui.nodes.redactor,
      handler: (e) => {
        e.preventDefault(), this.insertNewBlock(n);
      }
    });
  }
  /**
   * Removes all added shortcuts
   * Fired when the Read-Only mode is activated
   */
  removeAllShortcuts() {
    this.toolsToBeDisplayed.forEach((n) => {
      const t = n.shortcut;
      t && Ie.remove(this.api.ui.nodes.redactor, t);
    });
  }
  /**
   * Inserts new block
   * Can be called when button clicked on Toolbox or by ShortcutData
   *
   * @param {string} toolName - Tool name
   * @param blockDataOverrides - predefined Block data
   */
  async insertNewBlock(n, t) {
    const e = this.api.blocks.getCurrentBlockIndex(), o = this.api.blocks.getBlockByIndex(e);
    if (!o)
      return;
    const i = o.isEmpty ? e : e + 1;
    let r;
    if (t) {
      const a = await this.api.blocks.composeBlockData(n);
      r = Object.assign(a, t);
    }
    const s = this.api.blocks.insert(
      n,
      r,
      void 0,
      i,
      void 0,
      o.isEmpty
    );
    s.call(Wt.APPEND_CALLBACK), this.api.caret.setToBlock(i), this.emit("toolbox-block-added", {
      block: s
    }), this.api.toolbar.close();
  }
};
let Pn = Rr;
Dr([
  Me
], Pn.prototype, "toolsToBeDisplayed", 1);
Dr([
  Me
], Pn.prototype, "toolboxItemsToBeDisplayed", 1);
const Pr = "block hovered";
class $c extends V {
  /**
   * @class
   * @param moduleConfiguration - Module Configuration
   * @param moduleConfiguration.config - Editor's config
   * @param moduleConfiguration.eventsDispatcher - Editor's event dispatcher
   */
  constructor({ config: t, eventsDispatcher: e }) {
    super({
      config: t,
      eventsDispatcher: e
    }), this.tooltip = new Dn();
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
  toggleReadOnly(t) {
    t ? (this.destroy(), this.Editor.BlockSettings.destroy(), this.disableModuleBindings()) : (this.drawUI(), this.enableModuleBindings());
  }
  /**
   * Move Toolbar to the passed (or current) Block
   *
   * @param block - block to move Toolbar near it
   */
  moveAndOpen(t = this.Editor.BlockManager.currentBlock) {
    if (this.toolboxInstance.opened && this.toolboxInstance.close(), this.Editor.BlockSettings.opened && this.Editor.BlockSettings.close(), !t)
      return;
    this.hoveredBlock = t;
    const e = t.holder, { isMobile: o } = this.Editor.UI, i = t.pluginsContent, r = window.getComputedStyle(i), s = parseInt(r.paddingTop, 10), a = e.offsetHeight;
    let l;
    o ? l = e.offsetTop + a : l = e.offsetTop + s, this.nodes.wrapper.style.top = `${Math.floor(l)}px`, this.Editor.BlockManager.blocks.length === 1 && t.isEmpty ? this.blockTunesToggler.hide() : this.blockTunesToggler.show(), this.open();
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
  open(t = !0) {
    de(() => {
      this.nodes.wrapper.classList.add(this.CSS.toolbarOpened), t ? this.blockActions.show() : this.blockActions.hide();
    }, 50)();
  }
  /**
   * Draws Toolbar elements
   */
  make() {
    this.nodes.wrapper = g.make("div", this.CSS.toolbar), ["content", "actions"].forEach((e) => {
      this.nodes[e] = g.make("div", this.CSS[e]);
    }), g.append(this.nodes.wrapper, this.nodes.content), g.append(this.nodes.content, this.nodes.actions), this.nodes.plusButton = g.make("div", this.CSS.plusButton, {
      innerHTML: Lc
    }), g.append(this.nodes.actions, this.nodes.plusButton), this.readOnlyMutableListeners.on(this.nodes.plusButton, "click", () => {
      this.tooltip.hide(!0), this.plusButtonClicked();
    }, !1);
    const t = g.make("div");
    t.appendChild(document.createTextNode(pt.ui(Ct.ui.toolbar.toolbox, "Add"))), t.appendChild(g.make("div", this.CSS.plusButtonShortcut, {
      textContent: "⇥ Tab"
    })), this.tooltip.onHover(this.nodes.plusButton, t, {
      hidingDelay: 400
    }), this.nodes.settingsToggler = g.make("span", this.CSS.settingsToggler, {
      innerHTML: Ac
    }), g.append(this.nodes.actions, this.nodes.settingsToggler), this.tooltip.onHover(
      this.nodes.settingsToggler,
      pt.ui(Ct.ui.blockTunes.toggler, "Click to tune"),
      {
        hidingDelay: 400
      }
    ), g.append(this.nodes.actions, this.makeToolbox()), g.append(this.nodes.actions, this.Editor.BlockSettings.getElement()), g.append(this.Editor.UI.nodes.wrapper, this.nodes.wrapper);
  }
  /**
   * Creates the Toolbox instance and return it's rendered element
   */
  makeToolbox() {
    return this.toolboxInstance = new Pn({
      api: this.Editor.API.methods,
      tools: this.Editor.Tools.blockTools,
      i18nLabels: {
        filter: pt.ui(Ct.ui.popover, "Filter"),
        nothingFound: pt.ui(Ct.ui.popover, "Nothing found")
      }
    }), this.toolboxInstance.on(vo.Opened, () => {
      this.Editor.UI.nodes.wrapper.classList.add(this.CSS.openedToolboxHolderModifier);
    }), this.toolboxInstance.on(vo.Closed, () => {
      this.Editor.UI.nodes.wrapper.classList.remove(this.CSS.openedToolboxHolderModifier);
    }), this.toolboxInstance.on(vo.BlockAdded, ({ block: t }) => {
      const { BlockManager: e, Caret: o } = this.Editor, i = e.getBlockById(t.id);
      i.inputs.length === 0 && (i === e.lastBlock ? (e.insertAtEnd(), o.setToBlock(e.lastBlock)) : o.setToBlock(e.nextBlock));
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
    this.readOnlyMutableListeners.on(this.nodes.settingsToggler, "mousedown", (t) => {
      t.stopPropagation(), this.settingsTogglerClicked(), this.toolboxInstance.opened && this.toolboxInstance.close(), this.tooltip.hide(!0);
    }, !0), re() || this.eventsDispatcher.on(Pr, (t) => {
      this.Editor.BlockSettings.opened || this.toolboxInstance.opened || this.moveAndOpen(t.block);
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
var Fo = /* @__PURE__ */ ((n) => (n[n.Block = 0] = "Block", n[n.Inline = 1] = "Inline", n[n.Tune = 2] = "Tune", n))(Fo || {}), wo = /* @__PURE__ */ ((n) => (n.Shortcut = "shortcut", n.Toolbox = "toolbox", n.EnabledInlineTools = "inlineToolbar", n.EnabledBlockTunes = "tunes", n.Config = "config", n))(wo || {}), Fr = /* @__PURE__ */ ((n) => (n.Shortcut = "shortcut", n.SanitizeConfig = "sanitize", n))(Fr || {}), ke = /* @__PURE__ */ ((n) => (n.IsEnabledLineBreaks = "enableLineBreaks", n.Toolbox = "toolbox", n.ConversionConfig = "conversionConfig", n.IsReadOnlySupported = "isReadOnlySupported", n.PasteConfig = "pasteConfig", n))(ke || {}), Fn = /* @__PURE__ */ ((n) => (n.IsInline = "isInline", n.Title = "title", n))(Fn || {}), Hr = /* @__PURE__ */ ((n) => (n.IsTune = "isTune", n))(Hr || {});
class Hn {
  /**
   * @class
   * @param {ConstructorOptions} options - Constructor options
   */
  constructor({
    name: t,
    constructable: e,
    config: o,
    api: i,
    isDefault: r,
    isInternal: s = !1,
    defaultPlaceholder: a
  }) {
    this.api = i, this.name = t, this.constructable = e, this.config = o, this.isDefault = r, this.isInternal = s, this.defaultPlaceholder = a;
  }
  /**
   * Returns Tool user configuration
   */
  get settings() {
    const t = this.config.config || {};
    return this.isDefault && !("placeholder" in t) && this.defaultPlaceholder && (t.placeholder = this.defaultPlaceholder), t;
  }
  /**
   * Calls Tool's reset method
   */
  reset() {
    if (G(this.constructable.reset))
      return this.constructable.reset();
  }
  /**
   * Calls Tool's prepare method
   */
  prepare() {
    if (G(this.constructable.prepare))
      return this.constructable.prepare({
        toolName: this.name,
        config: this.settings
      });
  }
  /**
   * Returns shortcut for Tool (internal or specified by user)
   */
  get shortcut() {
    const t = this.constructable.shortcut;
    return this.config.shortcut || t;
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
class Wc extends V {
  /**
   * @class
   * @param moduleConfiguration - Module Configuration
   * @param moduleConfiguration.config - Editor's config
   * @param moduleConfiguration.eventsDispatcher - Editor's event dispatcher
   */
  constructor({ config: t, eventsDispatcher: e }) {
    super({
      config: t,
      eventsDispatcher: e
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
    }, this.opened = !1, this.toolbarVerticalMargin = re() ? 20 : 6, this.buttonsList = null, this.width = 0, this.flipper = null, this.tooltip = new Dn();
  }
  /**
   * Toggles read-only mode
   *
   * @param {boolean} readOnlyEnabled - read-only mode
   */
  toggleReadOnly(t) {
    t ? (this.destroy(), this.Editor.ConversionToolbar.destroy()) : this.make();
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
  tryToShow(t = !1, e = !0) {
    if (!this.allowedToShow()) {
      t && this.close();
      return;
    }
    this.move(), this.open(e), this.Editor.Toolbar.close();
  }
  /**
   * Move Toolbar to the selected text
   */
  move() {
    const t = N.rect, e = this.Editor.UI.nodes.wrapper.getBoundingClientRect(), o = {
      x: t.x - e.left,
      y: t.y + t.height - // + window.scrollY
      e.top + this.toolbarVerticalMargin
    };
    t.width && (o.x += Math.floor(t.width / 2));
    const i = o.x - this.width / 2, r = o.x + this.width / 2;
    this.nodes.wrapper.classList.toggle(
      this.CSS.inlineToolbarLeftOriented,
      i < this.Editor.UI.contentRect.left
    ), this.nodes.wrapper.classList.toggle(
      this.CSS.inlineToolbarRightOriented,
      r > this.Editor.UI.contentRect.right
    ), this.nodes.wrapper.style.left = Math.floor(o.x) + "px", this.nodes.wrapper.style.top = Math.floor(o.y) + "px";
  }
  /**
   * Hides Inline Toolbar
   */
  close() {
    this.opened && (this.Editor.ReadOnly.isEnabled || (this.nodes.wrapper.classList.remove(this.CSS.inlineToolbarShowed), Array.from(this.toolsInstances.entries()).forEach(([t, e]) => {
      const o = this.getToolShortcut(t);
      o && Ie.remove(this.Editor.UI.nodes.redactor, o), G(e.clear) && e.clear();
    }), this.opened = !1, this.flipper.deactivate(), this.Editor.ConversionToolbar.close()));
  }
  /**
   * Shows Inline Toolbar
   *
   * @param [needToShowConversionToolbar] - pass false to not to show Conversion Toolbar
   */
  open(t = !0) {
    if (this.opened)
      return;
    this.addToolsFiltered(), this.nodes.wrapper.classList.add(this.CSS.inlineToolbarShowed), this.buttonsList = this.nodes.buttons.querySelectorAll(`.${this.CSS.inlineToolButton}`), this.opened = !0, t && this.Editor.ConversionToolbar.hasTools() ? this.setConversionTogglerContent() : this.nodes.conversionToggler.hidden = !0;
    let e = Array.from(this.buttonsList);
    e.unshift(this.nodes.conversionToggler), e = e.filter((o) => !o.hidden), this.flipper.activate(e);
  }
  /**
   * Check if node is contained by Inline Toolbar
   *
   * @param {Node} node — node to check
   */
  containsNode(t) {
    return this.nodes.wrapper.contains(t);
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
    this.nodes.wrapper = g.make("div", [
      this.CSS.inlineToolbar,
      ...this.isRtl ? [this.Editor.UI.CSS.editorRtlFix] : []
    ]), this.nodes.togglerAndButtonsWrapper = g.make("div", this.CSS.togglerAndButtonsWrapper), this.nodes.buttons = g.make("div", this.CSS.buttonsWrapper), this.nodes.actions = g.make("div", this.CSS.actionsWrapper), this.listeners.on(this.nodes.wrapper, "mousedown", (t) => {
      t.target.closest(`.${this.CSS.actionsWrapper}`) || t.preventDefault();
    }), g.append(this.nodes.wrapper, [this.nodes.togglerAndButtonsWrapper, this.nodes.actions]), g.append(this.Editor.UI.nodes.wrapper, this.nodes.wrapper), this.addConversionToggler(), g.append(this.nodes.togglerAndButtonsWrapper, this.nodes.buttons), this.prepareConversionToolbar(), this.recalculateWidth(), this.enableFlipper();
  }
  /**
   * Need to show Inline Toolbar or not
   */
  allowedToShow() {
    const t = ["IMG", "INPUT"], e = N.get(), o = N.text;
    if (!e || !e.anchorNode || e.isCollapsed || o.length < 1)
      return !1;
    const i = g.isElement(e.anchorNode) ? e.anchorNode : e.anchorNode.parentElement;
    if (e && t.includes(i.tagName) || i.closest('[contenteditable="true"]') === null)
      return !1;
    const r = this.Editor.BlockManager.getBlock(e.anchorNode);
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
    this.nodes.conversionToggler = g.make("div", this.CSS.conversionToggler), this.nodes.conversionTogglerContent = g.make("div", this.CSS.conversionTogglerContent);
    const t = g.make("div", this.CSS.conversionTogglerArrow, {
      innerHTML: Lr
    });
    this.nodes.conversionToggler.appendChild(this.nodes.conversionTogglerContent), this.nodes.conversionToggler.appendChild(t), this.nodes.togglerAndButtonsWrapper.appendChild(this.nodes.conversionToggler), this.listeners.on(this.nodes.conversionToggler, "click", () => {
      this.Editor.ConversionToolbar.toggle((e) => {
        !e && this.opened ? this.flipper.activate() : this.opened && this.flipper.deactivate();
      });
    }), re() === !1 && this.tooltip.onHover(this.nodes.conversionToggler, pt.ui(Ct.ui.inlineToolbar.converter, "Convert to"), {
      placement: "top",
      hidingDelay: 100
    });
  }
  /**
   * Changes Conversion Dropdown content for current block's Tool
   */
  async setConversionTogglerContent() {
    const { BlockManager: t } = this.Editor, { currentBlock: e } = t, o = e.name, i = e.tool.conversionConfig, r = i && i.export;
    this.nodes.conversionToggler.hidden = !r, this.nodes.conversionToggler.classList.toggle(this.CSS.conversionTogglerHidden, !r);
    const s = await e.getActiveToolboxEntry() || {};
    this.nodes.conversionTogglerContent.innerHTML = s.icon || s.title || Io(o);
  }
  /**
   * Makes the Conversion Dropdown
   */
  prepareConversionToolbar() {
    const t = this.Editor.ConversionToolbar.make();
    g.append(this.nodes.wrapper, t);
  }
  /**
   *  Working with Tools
   *  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   */
  /**
   * Append only allowed Tools
   */
  addToolsFiltered() {
    const t = N.get(), e = this.Editor.BlockManager.getBlock(t.anchorNode);
    this.nodes.buttons.innerHTML = "", this.nodes.actions.innerHTML = "", this.toolsInstances = /* @__PURE__ */ new Map(), Array.from(e.tool.inlineTools.values()).forEach((o) => {
      this.addTool(o);
    }), this.recalculateWidth();
  }
  /**
   * Add tool button and activate clicks
   *
   * @param {InlineTool} tool - InlineTool object
   */
  addTool(t) {
    const e = t.create(), o = e.render();
    if (!o) {
      z("Render method must return an instance of Node", "warn", t.name);
      return;
    }
    if (o.dataset.tool = t.name, this.nodes.buttons.appendChild(o), this.toolsInstances.set(t.name, e), G(e.renderActions)) {
      const a = e.renderActions();
      this.nodes.actions.appendChild(a);
    }
    this.listeners.on(o, "click", (a) => {
      this.toolClicked(e), a.preventDefault();
    });
    const i = this.getToolShortcut(t.name);
    if (i)
      try {
        this.enableShortcuts(e, i);
      } catch {
      }
    const r = g.make("div"), s = pt.t(
      Ct.toolNames,
      t.title || Io(t.name)
    );
    r.appendChild(g.text(s)), i && r.appendChild(g.make("div", this.CSS.inlineToolbarShortcut, {
      textContent: Sr(i)
    })), re() === !1 && this.tooltip.onHover(o, r, {
      placement: "top",
      hidingDelay: 100
    }), e.checkState(N.get());
  }
  /**
   * Get shortcut name for tool
   *
   * @param toolName — Tool name
   */
  getToolShortcut(t) {
    const { Tools: e } = this.Editor, o = e.inlineTools.get(t), i = e.internal.inlineTools;
    return Array.from(i.keys()).includes(t) ? this.inlineTools[t][Fr.Shortcut] : o.shortcut;
  }
  /**
   * Enable Tool shortcut with Editor Shortcuts Module
   *
   * @param {InlineTool} tool - Tool instance
   * @param {string} shortcut - shortcut according to the ShortcutData Module format
   */
  enableShortcuts(t, e) {
    Ie.add({
      name: e,
      handler: (o) => {
        const { currentBlock: i } = this.Editor.BlockManager;
        i && i.tool.enabledInlineTools && (o.preventDefault(), this.toolClicked(t));
      },
      on: this.Editor.UI.nodes.redactor
    });
  }
  /**
   * Inline Tool button clicks
   *
   * @param {InlineTool} tool - Tool's instance
   */
  toolClicked(t) {
    const e = N.range;
    t.surround(e), this.checkToolsState(), t.renderActions !== void 0 && this.flipper.deactivate();
  }
  /**
   * Check Tools` state by selection
   */
  checkToolsState() {
    this.toolsInstances.forEach((t) => {
      t.checkState(N.get());
    });
  }
  /**
   * Get inline tools tools
   * Tools that has isInline is true
   */
  get inlineTools() {
    const t = {};
    return Array.from(this.Editor.Tools.inlineTools.entries()).forEach(([e, o]) => {
      t[e] = o.create();
    }), t;
  }
  /**
   * Allow to leaf buttons by arrows / tab
   * Buttons will be filled on opening
   */
  enableFlipper() {
    this.flipper = new Ht({
      focusedItemClass: this.CSS.focusedButton,
      allowedKeys: [
        H.ENTER,
        H.TAB
      ]
    });
  }
}
class Xc extends V {
  /**
   * All keydowns on Block
   *
   * @param {KeyboardEvent} event - keydown
   */
  keydown(t) {
    switch (this.beforeKeydownProcessing(t), t.keyCode) {
      case H.BACKSPACE:
        this.backspace(t);
        break;
      case H.ENTER:
        this.enter(t);
        break;
      case H.DOWN:
      case H.RIGHT:
        this.arrowRightAndDown(t);
        break;
      case H.UP:
      case H.LEFT:
        this.arrowLeftAndUp(t);
        break;
      case H.TAB:
        this.tabPressed(t);
        break;
    }
  }
  /**
   * Fires on keydown before event processing
   *
   * @param {KeyboardEvent} event - keydown
   */
  beforeKeydownProcessing(t) {
    this.needToolbarClosing(t) && yr(t.keyCode) && (this.Editor.Toolbar.close(), this.Editor.ConversionToolbar.close(), t.ctrlKey || t.metaKey || t.altKey || t.shiftKey || (this.Editor.BlockManager.clearFocused(), this.Editor.BlockSelection.clearSelection(t)));
  }
  /**
   * Key up on Block:
   * - shows Inline Toolbar if something selected
   * - shows conversion toolbar with 85% of block selection
   *
   * @param {KeyboardEvent} event - keyup event
   */
  keyup(t) {
    t.shiftKey || this.Editor.UI.checkEmptiness();
  }
  /**
   * Open Toolbox to leaf Tools
   *
   * @param {KeyboardEvent} event - tab keydown event
   */
  tabPressed(t) {
    this.Editor.BlockSelection.clearSelection(t);
    const { BlockManager: e, InlineToolbar: o, ConversionToolbar: i } = this.Editor, r = e.currentBlock;
    if (!r)
      return;
    const s = r.isEmpty, a = r.tool.isDefault && s, l = !s && i.opened, c = !s && !N.isCollapsed && o.opened;
    a ? this.activateToolbox() : !l && !c && this.activateBlockSettings();
  }
  /**
   * Add drop target styles
   *
   * @param {DragEvent} event - drag over event
   */
  dragOver(t) {
    const e = this.Editor.BlockManager.getBlockByChildNode(t.target);
    e.dropTarget = !0;
  }
  /**
   * Remove drop target style
   *
   * @param {DragEvent} event - drag leave event
   */
  dragLeave(t) {
    const e = this.Editor.BlockManager.getBlockByChildNode(t.target);
    e.dropTarget = !1;
  }
  /**
   * Copying selected blocks
   * Before putting to the clipboard we sanitize all blocks and then copy to the clipboard
   *
   * @param {ClipboardEvent} event - clipboard event
   */
  handleCommandC(t) {
    const { BlockSelection: e } = this.Editor;
    e.anyBlockSelected && e.copySelectedBlocks(t);
  }
  /**
   * Copy and Delete selected Blocks
   *
   * @param {ClipboardEvent} event - clipboard event
   */
  handleCommandX(t) {
    const { BlockSelection: e, BlockManager: o, Caret: i } = this.Editor;
    e.anyBlockSelected && e.copySelectedBlocks(t).then(() => {
      const r = o.removeSelectedBlocks(), s = o.insertDefaultBlockAtIndex(r, !0);
      i.setToBlock(s, i.positions.START), e.clearSelection(t);
    });
  }
  /**
   * ENTER pressed on block
   *
   * @param {KeyboardEvent} event - keydown
   */
  enter(t) {
    const { BlockManager: e, UI: o } = this.Editor;
    if (e.currentBlock.tool.isLineBreaksEnabled || o.someToolbarOpened && o.someFlipperButtonFocused || t.shiftKey)
      return;
    let i = this.Editor.BlockManager.currentBlock;
    this.Editor.Caret.isAtStart && !this.Editor.BlockManager.currentBlock.hasMedia ? this.Editor.BlockManager.insertDefaultBlockAtIndex(this.Editor.BlockManager.currentBlockIndex) : this.Editor.Caret.isAtEnd ? i = this.Editor.BlockManager.insertDefaultBlockAtIndex(this.Editor.BlockManager.currentBlockIndex + 1) : i = this.Editor.BlockManager.split(), this.Editor.Caret.setToBlock(i), this.Editor.Toolbar.moveAndOpen(i), t.preventDefault();
  }
  /**
   * Handle backspace keydown on Block
   *
   * @param {KeyboardEvent} event - keydown
   */
  backspace(t) {
    const { BlockManager: e, BlockSelection: o, Caret: i } = this.Editor, r = e.currentBlock, s = r.tool;
    if (r.selected || r.isEmpty && r.currentInput === r.firstInput) {
      t.preventDefault();
      const l = e.currentBlockIndex;
      e.previousBlock && e.previousBlock.inputs.length === 0 ? e.removeBlock(l - 1) : e.removeBlock(), i.setToBlock(
        e.currentBlock,
        l ? i.positions.END : i.positions.START
      ), this.Editor.Toolbar.close(), o.clearSelection(t);
      return;
    }
    if (s.isLineBreaksEnabled && !i.isAtStart)
      return;
    const a = e.currentBlockIndex === 0;
    i.isAtStart && N.isCollapsed && r.currentInput === r.firstInput && !a && (t.preventDefault(), this.mergeBlocks());
  }
  /**
   * Merge current and previous Blocks if they have the same type
   */
  mergeBlocks() {
    const { BlockManager: t, Caret: e, Toolbar: o } = this.Editor, i = t.previousBlock, r = t.currentBlock;
    if (r.name !== i.name || !i.mergeable) {
      if (i.inputs.length === 0 || i.isEmpty) {
        t.removeBlock(t.currentBlockIndex - 1), e.setToBlock(t.currentBlock), o.close();
        return;
      }
      e.navigatePrevious() && o.close();
      return;
    }
    e.createShadow(i.pluginsContent), t.mergeBlocks(i, r).then(() => {
      e.restoreCaret(i.pluginsContent), i.pluginsContent.normalize(), o.close();
    });
  }
  /**
   * Handle right and down keyboard keys
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  arrowRightAndDown(t) {
    const e = Ht.usedKeys.includes(t.keyCode) && (!t.shiftKey || t.keyCode === H.TAB);
    if (this.Editor.UI.someToolbarOpened && e)
      return;
    this.Editor.BlockManager.clearFocused(), this.Editor.Toolbar.close();
    const o = this.Editor.Caret.isAtEnd || this.Editor.BlockSelection.anyBlockSelected;
    if (t.shiftKey && t.keyCode === H.DOWN && o) {
      this.Editor.CrossBlockSelection.toggleBlockSelectedState();
      return;
    }
    (t.keyCode === H.DOWN || t.keyCode === H.RIGHT && !this.isRtl ? this.Editor.Caret.navigateNext() : this.Editor.Caret.navigatePrevious()) ? t.preventDefault() : de(() => {
      this.Editor.BlockManager.currentBlock && this.Editor.BlockManager.currentBlock.updateCurrentInput();
    }, 20)(), this.Editor.BlockSelection.clearSelection(t);
  }
  /**
   * Handle left and up keyboard keys
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  arrowLeftAndUp(t) {
    if (this.Editor.UI.someToolbarOpened) {
      if (Ht.usedKeys.includes(t.keyCode) && (!t.shiftKey || t.keyCode === H.TAB))
        return;
      this.Editor.UI.closeAllToolbars();
    }
    this.Editor.BlockManager.clearFocused(), this.Editor.Toolbar.close();
    const e = this.Editor.Caret.isAtStart || this.Editor.BlockSelection.anyBlockSelected;
    if (t.shiftKey && t.keyCode === H.UP && e) {
      this.Editor.CrossBlockSelection.toggleBlockSelectedState(!1);
      return;
    }
    (t.keyCode === H.UP || t.keyCode === H.LEFT && !this.isRtl ? this.Editor.Caret.navigatePrevious() : this.Editor.Caret.navigateNext()) ? t.preventDefault() : de(() => {
      this.Editor.BlockManager.currentBlock && this.Editor.BlockManager.currentBlock.updateCurrentInput();
    }, 20)(), this.Editor.BlockSelection.clearSelection(t);
  }
  /**
   * Cases when we need to close Toolbar
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  needToolbarClosing(t) {
    const e = t.keyCode === H.ENTER && this.Editor.Toolbar.toolbox.opened, o = t.keyCode === H.ENTER && this.Editor.BlockSettings.opened, i = t.keyCode === H.ENTER && this.Editor.InlineToolbar.opened, r = t.keyCode === H.ENTER && this.Editor.ConversionToolbar.opened, s = t.keyCode === H.TAB;
    return !(t.shiftKey || s || e || o || i || r);
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
class Jo {
  /**
   * @class
   * @param {HTMLElement} workingArea — editor`s working node
   */
  constructor(t) {
    this.blocks = [], this.workingArea = t;
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
    return Er(this.workingArea.children);
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
  static set(t, e, o) {
    return isNaN(Number(e)) ? (Reflect.set(t, e, o), !0) : (t.insert(+e, o), !0);
  }
  /**
   * Proxy trap to implement array-like getter
   *
   * @param {Blocks} instance — Blocks instance
   * @param {PropertyKey} property — Blocks class property key
   * @returns {Block|*}
   */
  static get(t, e) {
    return isNaN(Number(e)) ? Reflect.get(t, e) : t.get(+e);
  }
  /**
   * Push new Block to the blocks array and append it to working area
   *
   * @param {Block} block - Block to add
   */
  push(t) {
    this.blocks.push(t), this.insertToDOM(t);
  }
  /**
   * Swaps blocks with indexes first and second
   *
   * @param {number} first - first block index
   * @param {number} second - second block index
   * @deprecated — use 'move' instead
   */
  swap(t, e) {
    const o = this.blocks[e];
    g.swap(this.blocks[t].holder, o.holder), this.blocks[e] = this.blocks[t], this.blocks[t] = o;
  }
  /**
   * Move a block from one to another index
   *
   * @param {number} toIndex - new index of the block
   * @param {number} fromIndex - block to move
   */
  move(t, e) {
    const o = this.blocks.splice(e, 1)[0], i = t - 1, r = Math.max(0, i), s = this.blocks[r];
    t > 0 ? this.insertToDOM(o, "afterend", s) : this.insertToDOM(o, "beforebegin", s), this.blocks.splice(t, 0, o);
    const a = this.composeBlockEvent("move", {
      fromIndex: e,
      toIndex: t
    });
    o.call(Wt.MOVED, a);
  }
  /**
   * Insert new Block at passed index
   *
   * @param {number} index — index to insert Block
   * @param {Block} block — Block to insert
   * @param {boolean} replace — it true, replace block on given index
   */
  insert(t, e, o = !1) {
    if (!this.length) {
      this.push(e);
      return;
    }
    t > this.length && (t = this.length), o && (this.blocks[t].holder.remove(), this.blocks[t].call(Wt.REMOVED));
    const i = o ? 1 : 0;
    if (this.blocks.splice(t, i, e), t > 0) {
      const r = this.blocks[t - 1];
      this.insertToDOM(e, "afterend", r);
    } else {
      const r = this.blocks[t + 1];
      r ? this.insertToDOM(e, "beforebegin", r) : this.insertToDOM(e);
    }
  }
  /**
   * Remove block
   *
   * @param {number} index - index of Block to remove
   */
  remove(t) {
    isNaN(t) && (t = this.length - 1), this.blocks[t].holder.remove(), this.blocks[t].call(Wt.REMOVED), this.blocks.splice(t, 1);
  }
  /**
   * Remove all blocks
   */
  removeAll() {
    this.workingArea.innerHTML = "", this.blocks.forEach((t) => t.call(Wt.REMOVED)), this.blocks.length = 0;
  }
  /**
   * Insert Block after passed target
   *
   * @todo decide if this method is necessary
   * @param {Block} targetBlock — target after which Block should be inserted
   * @param {Block} newBlock — Block to insert
   */
  insertAfter(t, e) {
    const o = this.blocks.indexOf(t);
    this.insert(o + 1, e);
  }
  /**
   * Get Block by index
   *
   * @param {number} index — Block index
   * @returns {Block}
   */
  get(t) {
    return this.blocks[t];
  }
  /**
   * Return index of passed Block
   *
   * @param {Block} block - Block to find
   * @returns {number}
   */
  indexOf(t) {
    return this.blocks.indexOf(t);
  }
  /**
   * Insert new Block into DOM
   *
   * @param {Block} block - Block to insert
   * @param {InsertPosition} position — insert position (if set, will use insertAdjacentElement)
   * @param {Block} target — Block related to position
   */
  insertToDOM(t, e, o) {
    e ? o.holder.insertAdjacentElement(e, t.holder) : this.workingArea.appendChild(t.holder), t.call(Wt.RENDERED);
  }
  /**
   * Composes Block event with passed type and details
   *
   * @param {string} type - event type
   * @param {object} detail - event detail
   */
  composeBlockEvent(t, e) {
    return new CustomEvent(t, {
      detail: e
    });
  }
}
const Oi = "block-removed", Ai = "block-added", Kc = "block-moved", Gc = "block-changed";
class Zc extends V {
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
  set currentBlockIndex(t) {
    this._currentBlockIndex = t;
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
  set currentBlock(t) {
    this.currentBlockIndex = this.getBlockIndex(t);
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
    return this.blocks.slice(this.currentBlockIndex + 1).find((t) => !!t.inputs.length);
  }
  /**
   * Return first Block with inputs before current Block
   *
   * @returns {Block | undefined}
   */
  get previousContentfulBlock() {
    return this.blocks.slice(0, this.currentBlockIndex).reverse().find((t) => !!t.inputs.length);
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
    return this.blocks.every((t) => t.isEmpty);
  }
  /**
   * Should be called after Editor.UI preparation
   * Define this._blocks property
   */
  prepare() {
    const t = new Jo(this.Editor.UI.nodes.redactor);
    this._blocks = new Proxy(t, {
      set: Jo.set,
      get: Jo.get
    }), this.listeners.on(
      document,
      "copy",
      (e) => this.Editor.BlockEvents.handleCommandC(e)
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
  toggleReadOnly(t) {
    t ? this.disableModuleBindings() : this.enableModuleBindings();
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
    tool: t,
    data: e = {},
    id: o = void 0,
    tunes: i = {}
  }) {
    const r = this.Editor.ReadOnly.isEnabled, s = this.Editor.Tools.blockTools.get(t), a = new ot({
      id: o,
      data: e,
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
    id: t = void 0,
    tool: e = this.config.defaultBlock,
    data: o = {},
    index: i,
    needToFocus: r = !0,
    replace: s = !1,
    tunes: a = {}
  } = {}) {
    let l = i;
    l === void 0 && (l = this.currentBlockIndex + (s ? 0 : 1));
    const c = this.composeBlock({
      id: t,
      tool: e,
      data: o,
      tunes: a
    });
    return s && this.blockDidMutated(Oi, this.getBlockByIndex(l), {
      index: l
    }), this._blocks.insert(l, c, s), this.blockDidMutated(Ai, c, {
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
    tool: t = this.config.defaultBlock,
    data: e = {}
  }) {
    return this.insert({
      tool: t,
      data: e,
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
  paste(t, e, o = !1) {
    const i = this.insert({
      tool: t,
      replace: o
    });
    try {
      i.call(Wt.ON_PASTE, e);
    } catch (r) {
      z(`${t}: onPaste callback call is failed`, "error", r);
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
  insertDefaultBlockAtIndex(t, e = !1) {
    const o = this.composeBlock({ tool: this.config.defaultBlock });
    return this._blocks[t] = o, this.blockDidMutated(Ai, o, {
      index: t
    }), e ? this.currentBlockIndex = t : t <= this.currentBlockIndex && this.currentBlockIndex++, o;
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
  async mergeBlocks(t, e) {
    const o = this._blocks.indexOf(e);
    if (e.isEmpty)
      return;
    const i = await e.data;
    _t(i) || await t.mergeWith(i), this.removeBlock(o), this.currentBlockIndex = this._blocks.indexOf(t);
  }
  /**
   * Remove block with passed index or remove last
   *
   * @param {number|null} index - index of Block to remove
   * @throws {Error} if Block to remove is not found
   */
  removeBlock(t = this.currentBlockIndex) {
    if (!this.validateIndex(t))
      throw new Error("Can't find a Block to remove");
    const e = this._blocks[t];
    e.destroy(), this._blocks.remove(t), this.blockDidMutated(Oi, e, {
      index: t
    }), this.currentBlockIndex >= t && this.currentBlockIndex--, this.blocks.length ? t === 0 && (this.currentBlockIndex = 0) : (this.currentBlockIndex = -1, this.insert());
  }
  /**
   * Remove only selected Blocks
   * and returns first Block index where started removing...
   *
   * @returns {number|undefined}
   */
  removeSelectedBlocks() {
    let t;
    for (let e = this.blocks.length - 1; e >= 0; e--)
      this.blocks[e].selected && (this.removeBlock(e), t = e);
    return t;
  }
  /**
   * Attention!
   * After removing insert the new default typed Block and focus on it
   * Removes all blocks
   */
  removeAllBlocks() {
    for (let t = this.blocks.length - 1; t >= 0; t--)
      this._blocks.remove(t);
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
    const t = this.Editor.Caret.extractFragmentFromCaretPosition(), e = g.make("div");
    e.appendChild(t);
    const o = {
      text: g.isEmpty(e) ? "" : e.innerHTML
    };
    return this.insert({ data: o });
  }
  /**
   * Returns Block by passed index
   *
   * @param {number} index - index to get. -1 to get last
   * @returns {Block}
   */
  getBlockByIndex(t) {
    return t === -1 && (t = this._blocks.length - 1), this._blocks[t];
  }
  /**
   * Returns an index for passed Block
   *
   * @param block - block to find index
   */
  getBlockIndex(t) {
    return this._blocks.indexOf(t);
  }
  /**
   * Returns the Block by passed id
   *
   * @param id - id of block to get
   * @returns {Block}
   */
  getBlockById(t) {
    return this._blocks.array.find((e) => e.id === t);
  }
  /**
   * Get Block instance by html element
   *
   * @param {Node} element - html element to get Block by
   */
  getBlock(t) {
    g.isElement(t) || (t = t.parentNode);
    const e = this._blocks.nodes, o = t.closest(`.${ot.CSS.wrapper}`), i = e.indexOf(o);
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
    this.blocks.forEach((t) => {
      t.focused = !1;
    });
  }
  /**
   * 1) Find first-level Block from passed child Node
   * 2) Mark it as current
   *
   * @param {Node} childNode - look ahead from this node.
   * @returns {Block | undefined} can return undefined in case when the passed child note is not a part of the current editor instance
   */
  setCurrentBlockByChildNode(t) {
    g.isElement(t) || (t = t.parentNode);
    const e = t.closest(`.${ot.CSS.wrapper}`);
    if (!e)
      return;
    const o = e.closest(`.${this.Editor.UI.CSS.editorWrapper}`);
    if (o != null && o.isEqualNode(this.Editor.UI.nodes.wrapper))
      return this.currentBlockIndex = this._blocks.nodes.indexOf(e), this.currentBlock.updateCurrentInput(), this.currentBlock;
  }
  /**
   * Return block which contents passed node
   *
   * @param {Node} childNode - node to get Block by
   * @returns {Block}
   */
  getBlockByChildNode(t) {
    g.isElement(t) || (t = t.parentNode);
    const e = t.closest(`.${ot.CSS.wrapper}`);
    return this.blocks.find((o) => o.holder === e);
  }
  /**
   * Swap Blocks Position
   *
   * @param {number} fromIndex - index of first block
   * @param {number} toIndex - index of second block
   * @deprecated — use 'move' instead
   */
  swap(t, e) {
    this._blocks.swap(t, e), this.currentBlockIndex = e;
  }
  /**
   * Move a block to a new index
   *
   * @param {number} toIndex - index where to move Block
   * @param {number} fromIndex - index of Block to move
   */
  move(t, e = this.currentBlockIndex) {
    if (isNaN(t) || isNaN(e)) {
      z("Warning during 'move' call: incorrect indices provided.", "warn");
      return;
    }
    if (!this.validateIndex(t) || !this.validateIndex(e)) {
      z("Warning during 'move' call: indices cannot be lower than 0 or greater than the amount of blocks.", "warn");
      return;
    }
    this._blocks.move(t, e), this.currentBlockIndex = t, this.blockDidMutated(Kc, this.currentBlock, {
      fromIndex: e,
      toIndex: t
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
  clear(t = !1) {
    this._blocks.removeAll(), this.dropPointer(), t && this.insert(), this.Editor.UI.checkEmptiness();
  }
  /**
   * Cleans up all the block tools' resources
   * This is called when editor is destroyed
   */
  async destroy() {
    await Promise.all(this.blocks.map((t) => t.destroy()));
  }
  /**
   * Bind Block events
   *
   * @param {Block} block - Block to which event should be bound
   */
  bindBlockEvents(t) {
    const { BlockEvents: e } = this.Editor;
    this.readOnlyMutableListeners.on(t.holder, "keydown", (o) => {
      e.keydown(o);
    }), this.readOnlyMutableListeners.on(t.holder, "keyup", (o) => {
      e.keyup(o);
    }), this.readOnlyMutableListeners.on(t.holder, "dragover", (o) => {
      e.dragOver(o);
    }), this.readOnlyMutableListeners.on(t.holder, "dragleave", (o) => {
      e.dragLeave(o);
    }), t.on("didMutated", (o) => this.blockDidMutated(Gc, o, {
      index: this.getBlockIndex(o)
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
      (t) => this.Editor.BlockEvents.handleCommandX(t)
    ), this.blocks.forEach((t) => {
      this.bindBlockEvents(t);
    });
  }
  /**
   * Validates that the given index is not lower than 0 or higher than the amount of blocks
   *
   * @param {number} index - index of blocks array to validate
   * @returns {boolean}
   */
  validateIndex(t) {
    return !(t < 0 || t >= this._blocks.length);
  }
  /**
   * Block mutation callback
   *
   * @param mutationType - what happened with block
   * @param block - mutated block
   * @param detailData - additional data to pass with change event
   */
  blockDidMutated(t, e, o) {
    const i = new CustomEvent(t, {
      detail: {
        target: new Ve(e),
        ...o
      }
    });
    return this.eventsDispatcher.emit(_r, {
      event: i
    }), e;
  }
}
class qc extends V {
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
    const { BlockManager: t } = this.Editor;
    return t.blocks.every((e) => e.selected === !0);
  }
  /**
   * Set selected all blocks
   *
   * @param {boolean} state - state to set
   */
  set allBlocksSelected(t) {
    const { BlockManager: e } = this.Editor;
    e.blocks.forEach((o) => {
      o.selected = t;
    }), this.clearCache();
  }
  /**
   * Flag that identifies any Block selection
   *
   * @returns {boolean}
   */
  get anyBlockSelected() {
    const { BlockManager: t } = this.Editor;
    return this.anyBlockSelectedCache === null && (this.anyBlockSelectedCache = t.blocks.some((e) => e.selected === !0)), this.anyBlockSelectedCache;
  }
  /**
   * Return selected Blocks array
   *
   * @returns {Block[]}
   */
  get selectedBlocks() {
    return this.Editor.BlockManager.blocks.filter((t) => t.selected);
  }
  /**
   * Module Preparation
   * Registers Shortcuts CMD+A and CMD+C
   * to select all and copy them
   */
  prepare() {
    this.selection = new N(), Ie.add({
      name: "CMD+A",
      handler: (t) => {
        const { BlockManager: e, ReadOnly: o } = this.Editor;
        if (o.isEnabled) {
          t.preventDefault(), this.selectAllBlocks();
          return;
        }
        e.currentBlock && this.handleCommandA(t);
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
    N.get().removeAllRanges(), this.allBlocksSelected = !1;
  }
  /**
   * Remove selection of Block
   *
   * @param {number?} index - Block index according to the BlockManager's indexes
   */
  unSelectBlockByIndex(t) {
    const { BlockManager: e } = this.Editor;
    let o;
    isNaN(t) ? o = e.currentBlock : o = e.getBlockByIndex(t), o.selected = !1, this.clearCache();
  }
  /**
   * Clear selection from Blocks
   *
   * @param {Event} reason - event caused clear of selection
   * @param {boolean} restoreSelection - if true, restore saved selection
   */
  clearSelection(t, e = !1) {
    const { BlockManager: o, Caret: i, RectangleSelection: r } = this.Editor;
    this.needToSelectAll = !1, this.nativeInputSelected = !1, this.readyToBlockSelection = !1;
    const s = t && t instanceof KeyboardEvent, a = s && yr(t.keyCode);
    if (this.anyBlockSelected && s && a && !N.isSelectionExists) {
      const l = o.removeSelectedBlocks();
      o.insertDefaultBlockAtIndex(l, !0), i.setToBlock(o.currentBlock), de(() => {
        const c = t.key;
        i.insertContentAtCaretPosition(c.length > 1 ? "" : c);
      }, 20)();
    }
    if (this.Editor.CrossBlockSelection.clear(t), !this.anyBlockSelected || r.isRectActivated()) {
      this.Editor.RectangleSelection.clearSelection();
      return;
    }
    e && this.selection.restore(), this.allBlocksSelected = !1;
  }
  /**
   * Reduce each Block and copy its content
   *
   * @param {ClipboardEvent} e - copy/cut event
   * @returns {Promise<void>}
   */
  copySelectedBlocks(t) {
    t.preventDefault();
    const e = g.make("div");
    this.selectedBlocks.forEach((r) => {
      const s = Rt(r.holder.innerHTML, this.sanitizerConfig), a = g.make("p");
      a.innerHTML = s, e.appendChild(a);
    });
    const o = Array.from(e.childNodes).map((r) => r.textContent).join(`

`), i = e.innerHTML;
    return t.clipboardData.setData("text/plain", o), t.clipboardData.setData("text/html", i), Promise.all(this.selectedBlocks.map((r) => r.save())).then((r) => {
      try {
        t.clipboardData.setData(this.Editor.Paste.MIME_TYPE, JSON.stringify(r));
      } catch {
      }
    });
  }
  /**
   * select Block
   *
   * @param {number?} index - Block index according to the BlockManager's indexes
   */
  selectBlockByIndex(t) {
    const { BlockManager: e } = this.Editor;
    e.clearFocused();
    let o;
    isNaN(t) ? o = e.currentBlock : o = e.getBlockByIndex(t), this.selection.save(), N.get().removeAllRanges(), o.selected = !0, this.clearCache(), this.Editor.InlineToolbar.close();
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
    Ie.remove(this.Editor.UI.nodes.redactor, "CMD+A");
  }
  /**
   * First CMD+A selects all input content by native behaviour,
   * next CMD+A keypress selects all blocks
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  handleCommandA(t) {
    if (this.Editor.RectangleSelection.clearSelection(), g.isNativeInput(t.target) && !this.readyToBlockSelection) {
      this.readyToBlockSelection = !0;
      return;
    }
    const e = this.Editor.BlockManager.getBlock(t.target).inputs;
    if (e.length > 1 && !this.readyToBlockSelection) {
      this.readyToBlockSelection = !0;
      return;
    }
    if (e.length === 1 && !this.needToSelectAll) {
      this.needToSelectAll = !0;
      return;
    }
    this.needToSelectAll ? (t.preventDefault(), this.selectAllBlocks(), this.needToSelectAll = !1, this.readyToBlockSelection = !1, this.Editor.ConversionToolbar.close()) : this.readyToBlockSelection && (t.preventDefault(), this.selectBlockByIndex(), this.needToSelectAll = !0);
  }
  /**
   * Select All Blocks
   * Each Block has selected setter that makes Block copyable
   */
  selectAllBlocks() {
    this.selection.save(), N.get().removeAllRanges(), this.allBlocksSelected = !0, this.Editor.InlineToolbar.close();
  }
}
class Mo extends V {
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
    const t = N.get(), e = g.getDeepestNode(this.Editor.BlockManager.currentBlock.currentInput);
    let o = t.focusNode;
    if (g.isNativeInput(e))
      return e.selectionEnd === 0;
    if (!t.anchorNode)
      return !1;
    let i = o.textContent.search(/\S/);
    i === -1 && (i = 0);
    let r = t.focusOffset;
    return o.nodeType !== Node.TEXT_NODE && o.childNodes.length && (o.childNodes[r] ? (o = o.childNodes[r], r = 0) : (o = o.childNodes[r - 1], r = o.textContent.length)), (g.isLineBreakTag(e) || g.isEmpty(e)) && this.getHigherLevelSiblings(o, "left").every((s) => {
      const a = g.isLineBreakTag(s), l = s.children.length === 1 && g.isLineBreakTag(s.children[0]), c = a || l;
      return g.isEmpty(s) && !c;
    }) && r === i ? !0 : e === null || o === e && r <= i;
  }
  /**
   * Get's deepest last node and checks if offset is last node text length
   *
   * @returns {boolean}
   */
  get isAtEnd() {
    const t = N.get();
    let e = t.focusNode;
    const o = g.getDeepestNode(this.Editor.BlockManager.currentBlock.currentInput, !0);
    if (g.isNativeInput(o))
      return o.selectionEnd === o.value.length;
    if (!t.focusNode)
      return !1;
    let i = t.focusOffset;
    if (e.nodeType !== Node.TEXT_NODE && e.childNodes.length && (e.childNodes[i - 1] ? (e = e.childNodes[i - 1], i = e.textContent.length) : (e = e.childNodes[0], i = 0)), g.isLineBreakTag(o) || g.isEmpty(o)) {
      const s = this.getHigherLevelSiblings(e, "right");
      if (s.every((a, l) => l === s.length - 1 && g.isLineBreakTag(a) || g.isEmpty(a) && !g.isLineBreakTag(a)) && i === e.textContent.length)
        return !0;
    }
    const r = o.textContent.replace(/\s+$/, "");
    return e === o && i >= r.length;
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
  setToBlock(t, e = this.positions.DEFAULT, o = 0) {
    const { BlockManager: i } = this.Editor;
    let r;
    switch (e) {
      case this.positions.START:
        r = t.firstInput;
        break;
      case this.positions.END:
        r = t.lastInput;
        break;
      default:
        r = t.currentInput;
    }
    if (!r)
      return;
    const s = g.getDeepestNode(r, e === this.positions.END), a = g.getContentLength(s);
    switch (!0) {
      case e === this.positions.START:
        o = 0;
        break;
      case e === this.positions.END:
      case o > a:
        o = a;
        break;
    }
    de(() => {
      this.set(s, o);
    }, 20)(), i.setCurrentBlockByChildNode(t.holder), i.currentBlock.currentInput = r;
  }
  /**
   * Set caret to the current input of current Block.
   *
   * @param {HTMLElement} input - input where caret should be set
   * @param {string} position - position of the caret.
   *                            If default - leave default behaviour and apply offset if it's passed
   * @param {number} offset - caret offset regarding to the text node
   */
  setToInput(t, e = this.positions.DEFAULT, o = 0) {
    const { currentBlock: i } = this.Editor.BlockManager, r = g.getDeepestNode(t);
    switch (e) {
      case this.positions.START:
        this.set(r, 0);
        break;
      case this.positions.END:
        this.set(r, g.getContentLength(r));
        break;
      default:
        o && this.set(r, o);
    }
    i.currentInput = t;
  }
  /**
   * Creates Document Range and sets caret to the element with offset
   *
   * @param {HTMLElement} element - target node.
   * @param {number} offset - offset
   */
  set(t, e = 0) {
    const { top: o, bottom: i } = N.setCursor(t, e), { innerHeight: r } = window;
    o < 0 && window.scrollBy(0, o), i > r && window.scrollBy(0, i - r);
  }
  /**
   * Set Caret to the last Block
   * If last block is not empty, append another empty block
   */
  setToTheLastBlock() {
    const t = this.Editor.BlockManager.lastBlock;
    if (t)
      if (t.tool.isDefault && t.isEmpty)
        this.setToBlock(t);
      else {
        const e = this.Editor.BlockManager.insertAtEnd();
        this.setToBlock(e);
      }
  }
  /**
   * Extract content fragment of current Block from Caret position to the end of the Block
   */
  extractFragmentFromCaretPosition() {
    const t = N.get();
    if (t.rangeCount) {
      const e = t.getRangeAt(0), o = this.Editor.BlockManager.currentBlock.currentInput;
      if (e.deleteContents(), o)
        if (g.isNativeInput(o)) {
          const i = o, r = document.createDocumentFragment(), s = i.value.substring(0, i.selectionStart), a = i.value.substring(i.selectionStart);
          return r.textContent = a, i.value = s, r;
        } else {
          const i = e.cloneRange();
          return i.selectNodeContents(o), i.setStart(e.endContainer, e.endOffset), i.extractContents();
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
    const { BlockManager: t } = this.Editor, { currentBlock: e, nextContentfulBlock: o } = t, { nextInput: i } = e, r = this.isAtEnd;
    let s = o;
    if (!s && !i) {
      if (e.tool.isDefault || !r)
        return !1;
      s = t.insertAtEnd();
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
    const { currentBlock: t, previousContentfulBlock: e } = this.Editor.BlockManager;
    if (!t)
      return !1;
    const { previousInput: o } = t;
    return !e && !o ? !1 : this.isAtStart ? (o ? this.setToInput(o, this.positions.END) : this.setToBlock(e, this.positions.END), !0) : !1;
  }
  /**
   * Inserts shadow element after passed element where caret can be placed
   *
   * @param {Element} element - element after which shadow caret should be inserted
   */
  createShadow(t) {
    const e = document.createElement("span");
    e.classList.add(Mo.CSS.shadowCaret), t.insertAdjacentElement("beforeend", e);
  }
  /**
   * Restores caret position
   *
   * @param {HTMLElement} element - element where caret should be restored
   */
  restoreCaret(t) {
    const e = t.querySelector(`.${Mo.CSS.shadowCaret}`);
    e && (new N().expandToTag(e), setTimeout(() => {
      const o = document.createRange();
      o.selectNode(e), o.extractContents();
    }, 50));
  }
  /**
   * Inserts passed content at caret position
   *
   * @param {string} content - content to insert
   */
  insertContentAtCaretPosition(t) {
    const e = document.createDocumentFragment(), o = document.createElement("div"), i = N.get(), r = N.range;
    o.innerHTML = t, Array.from(o.childNodes).forEach((l) => e.appendChild(l)), e.childNodes.length === 0 && e.appendChild(new Text());
    const s = e.lastChild;
    r.deleteContents(), r.insertNode(e);
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
  getHigherLevelSiblings(t, e) {
    let o = t;
    const i = [];
    for (; o.parentNode && o.parentNode.contentEditable !== "true"; )
      o = o.parentNode;
    const r = e === "left" ? "previousSibling" : "nextSibling";
    for (; o[r]; )
      o = o[r], i.push(o);
    return i;
  }
}
class Jc extends V {
  constructor() {
    super(...arguments), this.onMouseUp = () => {
      this.listeners.off(document, "mouseover", this.onMouseOver), this.listeners.off(document, "mouseup", this.onMouseUp);
    }, this.onMouseOver = (t) => {
      const { BlockManager: e, BlockSelection: o } = this.Editor, i = e.getBlockByChildNode(t.relatedTarget) || this.lastSelectedBlock, r = e.getBlockByChildNode(t.target);
      if (!(!i || !r) && r !== i) {
        if (i === this.firstSelectedBlock) {
          N.get().removeAllRanges(), i.selected = !0, r.selected = !0, o.clearCache();
          return;
        }
        if (r === this.firstSelectedBlock) {
          i.selected = !1, r.selected = !1, o.clearCache();
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
    this.listeners.on(document, "mousedown", (t) => {
      this.enableCrossBlockSelection(t);
    });
  }
  /**
   * Sets up listeners
   *
   * @param {MouseEvent} event - mouse down event
   */
  watchSelection(t) {
    if (t.button !== Pl.LEFT)
      return;
    const { BlockManager: e } = this.Editor;
    this.firstSelectedBlock = e.getBlock(t.target), this.lastSelectedBlock = this.firstSelectedBlock, this.listeners.on(document, "mouseover", this.onMouseOver), this.listeners.on(document, "mouseup", this.onMouseUp);
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
  toggleBlockSelectedState(t = !0) {
    const { BlockManager: e, BlockSelection: o } = this.Editor;
    this.lastSelectedBlock || (this.lastSelectedBlock = this.firstSelectedBlock = e.currentBlock), this.firstSelectedBlock === this.lastSelectedBlock && (this.firstSelectedBlock.selected = !0, o.clearCache(), N.get().removeAllRanges());
    const i = e.blocks.indexOf(this.lastSelectedBlock) + (t ? 1 : -1), r = e.blocks[i];
    r && (this.lastSelectedBlock.selected !== r.selected ? (r.selected = !0, o.clearCache()) : (this.lastSelectedBlock.selected = !1, o.clearCache()), this.lastSelectedBlock = r, this.Editor.InlineToolbar.close(), r.holder.scrollIntoView({
      block: "nearest"
    }));
  }
  /**
   * Clear saved state
   *
   * @param {Event} reason - event caused clear of selection
   */
  clear(t) {
    const { BlockManager: e, BlockSelection: o, Caret: i } = this.Editor, r = e.blocks.indexOf(this.firstSelectedBlock), s = e.blocks.indexOf(this.lastSelectedBlock);
    if (o.anyBlockSelected && r > -1 && s > -1)
      if (t && t instanceof KeyboardEvent)
        switch (t.keyCode) {
          case H.DOWN:
          case H.RIGHT:
            i.setToBlock(e.blocks[Math.max(r, s)], i.positions.END);
            break;
          case H.UP:
          case H.LEFT:
            i.setToBlock(e.blocks[Math.min(r, s)], i.positions.START);
            break;
          default:
            i.setToBlock(e.blocks[Math.max(r, s)], i.positions.END);
        }
      else
        i.setToBlock(e.blocks[Math.max(r, s)], i.positions.END);
    this.firstSelectedBlock = this.lastSelectedBlock = null;
  }
  /**
   * Enables Cross Block Selection
   *
   * @param {MouseEvent} event - mouse down event
   */
  enableCrossBlockSelection(t) {
    const { UI: e } = this.Editor;
    N.isCollapsed || this.Editor.BlockSelection.clearSelection(t), e.nodes.redactor.contains(t.target) ? this.watchSelection(t) : this.Editor.BlockSelection.clearSelection(t);
  }
  /**
   * Change blocks selection state between passed two blocks.
   *
   * @param {Block} firstBlock - first block in range
   * @param {Block} lastBlock - last block in range
   */
  toggleBlocksSelectedState(t, e) {
    const { BlockManager: o, BlockSelection: i } = this.Editor, r = o.blocks.indexOf(t), s = o.blocks.indexOf(e), a = t.selected !== e.selected;
    for (let l = Math.min(r, s); l <= Math.max(r, s); l++) {
      const c = o.blocks[l];
      c !== this.firstSelectedBlock && c !== (a ? t : e) && (o.blocks[l].selected = !o.blocks[l].selected, i.clearCache());
    }
  }
}
class Qc extends V {
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
  toggleReadOnly(t) {
    t ? this.disableModuleBindings() : this.enableModuleBindings();
  }
  /**
   * Add drag events listeners to editor zone
   */
  enableModuleBindings() {
    const { UI: t } = this.Editor;
    this.readOnlyMutableListeners.on(t.nodes.holder, "drop", async (e) => {
      await this.processDrop(e);
    }, !0), this.readOnlyMutableListeners.on(t.nodes.holder, "dragstart", () => {
      this.processDragStart();
    }), this.readOnlyMutableListeners.on(t.nodes.holder, "dragover", (e) => {
      this.processDragOver(e);
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
  async processDrop(t) {
    const {
      BlockManager: e,
      Caret: o,
      Paste: i
    } = this.Editor;
    t.preventDefault(), e.blocks.forEach((s) => {
      s.dropTarget = !1;
    }), N.isAtEditor && !N.isCollapsed && this.isStartedAtEditor && document.execCommand("delete"), this.isStartedAtEditor = !1;
    const r = e.setCurrentBlockByChildNode(t.target);
    if (r)
      this.Editor.Caret.setToBlock(r, o.positions.END);
    else {
      const s = e.setCurrentBlockByChildNode(e.lastBlock.holder);
      this.Editor.Caret.setToBlock(s, o.positions.END);
    }
    await i.processDataTransfer(t.dataTransfer, !0);
  }
  /**
   * Handle drag start event
   */
  processDragStart() {
    N.isAtEditor && !N.isCollapsed && (this.isStartedAtEditor = !0), this.Editor.InlineToolbar.close();
  }
  /**
   * @param {DragEvent} dragEvent - drag event
   */
  processDragOver(t) {
    t.preventDefault();
  }
}
class td extends V {
  /**
   * Prepare the module
   *
   * @param options - options used by the modification observer module
   * @param options.config - Editor configuration object
   * @param options.eventsDispatcher - common Editor event bus
   */
  constructor({ config: t, eventsDispatcher: e }) {
    super({
      config: t,
      eventsDispatcher: e
    }), this.disabled = !1, this.batchingTimeout = null, this.batchingOnChangeQueue = /* @__PURE__ */ new Map(), this.batchTime = 400, this.mutationObserver = new MutationObserver((o) => {
      this.redactorChanged(o);
    }), this.eventsDispatcher.on(_r, (o) => {
      this.particularBlockChanged(o.event);
    }), this.eventsDispatcher.on(Ir, () => {
      this.disable();
    }), this.eventsDispatcher.on(Mr, () => {
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
  particularBlockChanged(t) {
    this.disabled || !G(this.config.onChange) || (this.batchingOnChangeQueue.set(`block:${t.detail.target.id}:event:${t.type}`, t), this.batchingTimeout && clearTimeout(this.batchingTimeout), this.batchingTimeout = setTimeout(() => {
      let e;
      this.batchingOnChangeQueue.size === 1 ? e = this.batchingOnChangeQueue.values().next().value : e = Array.from(this.batchingOnChangeQueue.values()), this.config.onChange && this.config.onChange(this.Editor.API.methods, e), this.batchingOnChangeQueue.clear();
    }, this.batchTime));
  }
  /**
   * Fired on every blocks wrapper dom change
   *
   * @param mutations - mutations happened
   */
  redactorChanged(t) {
    this.eventsDispatcher.emit(un, {
      mutations: t
    });
  }
}
const jr = class extends V {
  constructor() {
    super(...arguments), this.MIME_TYPE = "application/x-editor-js", this.toolsTags = {}, this.tagsByTool = {}, this.toolsPatterns = [], this.toolsFiles = {}, this.exceptionList = [], this.processTool = (n) => {
      try {
        const t = n.create({}, {}, !1);
        if (n.pasteConfig === !1) {
          this.exceptionList.push(n.name);
          return;
        }
        if (!G(t.onPaste))
          return;
        this.getTagsConfig(n), this.getFilesConfig(n), this.getPatternsConfig(n);
      } catch (t) {
        z(
          `Paste handling for «${n.name}» Tool hasn't been set up because of the error`,
          "warn",
          t
        );
      }
    }, this.handlePasteEvent = async (n) => {
      const { BlockManager: t, Toolbar: e } = this.Editor;
      !t.currentBlock || this.isNativeBehaviour(n.target) && !n.clipboardData.types.includes("Files") || t.currentBlock && this.exceptionList.includes(t.currentBlock.name) || (n.preventDefault(), this.processDataTransfer(n.clipboardData), t.clearFocused(), e.close());
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
  toggleReadOnly(n) {
    n ? this.unsetCallback() : this.setCallback();
  }
  /**
   * Handle pasted or dropped data transfer object
   *
   * @param {DataTransfer} dataTransfer - pasted or dropped data transfer object
   * @param {boolean} isDragNDrop - true if data transfer comes from drag'n'drop events
   */
  async processDataTransfer(n, t = !1) {
    const { Tools: e } = this.Editor, o = n.types;
    if ((o.includes ? o.includes("Files") : o.contains("Files")) && !_t(this.toolsFiles)) {
      await this.processFiles(n.files);
      return;
    }
    const i = n.getData(this.MIME_TYPE), r = n.getData("text/plain");
    let s = n.getData("text/html");
    if (i)
      try {
        this.insertEditorJSData(JSON.parse(i));
        return;
      } catch {
      }
    t && r.trim() && s.trim() && (s = "<p>" + (s.trim() ? s : r) + "</p>");
    const a = Object.keys(this.toolsTags).reduce((h, d) => (h[d.toLowerCase()] = this.toolsTags[d].sanitizationConfig ?? {}, h), {}), l = Object.assign({}, a, e.getAllInlineToolsSanitizeConfig(), { br: {} }), c = Rt(s, l);
    !c.trim() || c.trim() === r || !g.isHTMLString(c) ? await this.processText(r) : await this.processText(c, !0);
  }
  /**
   * Process pasted text and divide them into Blocks
   *
   * @param {string} data - text to process. Can be HTML or plain.
   * @param {boolean} isHTML - if passed string is HTML, this parameter should be true
   */
  async processText(n, t = !1) {
    const { Caret: e, BlockManager: o } = this.Editor, i = t ? this.processHTML(n) : this.processPlain(n);
    if (!i.length)
      return;
    if (i.length === 1) {
      i[0].isBlock ? this.processSingleBlock(i.pop()) : this.processInlinePaste(i.pop());
      return;
    }
    const r = o.currentBlock && o.currentBlock.tool.isDefault && o.currentBlock.isEmpty;
    i.map(
      async (s, a) => this.insertBlock(s, a === 0 && r)
    ), o.currentBlock && e.setToBlock(o.currentBlock, e.positions.END);
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
    const n = this.Editor.Tools.blockTools;
    Array.from(n.values()).forEach(this.processTool);
  }
  /**
   * Get tags name list from either tag name or sanitization config.
   *
   * @param {string | object} tagOrSanitizeConfig - tag name or sanitize config object.
   * @returns {string[]} array of tags.
   */
  collectTagNames(n) {
    return Gt(n) ? [n] : st(n) ? Object.keys(n) : [];
  }
  /**
   * Get tags to substitute by Tool
   *
   * @param tool - BlockTool object
   */
  getTagsConfig(n) {
    if (n.pasteConfig === !1)
      return;
    const t = n.pasteConfig.tags || [], e = [];
    t.forEach((o) => {
      const i = this.collectTagNames(o);
      e.push(...i), i.forEach((r) => {
        if (Object.prototype.hasOwnProperty.call(this.toolsTags, r)) {
          z(
            `Paste handler for «${n.name}» Tool on «${r}» tag is skipped because it is already used by «${this.toolsTags[r].tool.name}» Tool.`,
            "warn"
          );
          return;
        }
        const s = st(o) ? o[r] : null;
        this.toolsTags[r.toUpperCase()] = {
          tool: n,
          sanitizationConfig: s
        };
      });
    }), this.tagsByTool[n.name] = e.map((o) => o.toUpperCase());
  }
  /**
   * Get files` types and extensions to substitute by Tool
   *
   * @param tool - BlockTool object
   */
  getFilesConfig(n) {
    if (n.pasteConfig === !1)
      return;
    const { files: t = {} } = n.pasteConfig;
    let { extensions: e, mimeTypes: o } = t;
    !e && !o || (e && !Array.isArray(e) && (z(`«extensions» property of the onDrop config for «${n.name}» Tool should be an array`), e = []), o && !Array.isArray(o) && (z(`«mimeTypes» property of the onDrop config for «${n.name}» Tool should be an array`), o = []), o && (o = o.filter((i) => Ul(i) ? !0 : (z(`MIME type value «${i}» for the «${n.name}» Tool is not a valid MIME type`, "warn"), !1))), this.toolsFiles[n.name] = {
      extensions: e || [],
      mimeTypes: o || []
    });
  }
  /**
   * Get RegExp patterns to substitute by Tool
   *
   * @param tool - BlockTool object
   */
  getPatternsConfig(n) {
    n.pasteConfig === !1 || !n.pasteConfig.patterns || _t(n.pasteConfig.patterns) || Object.entries(n.pasteConfig.patterns).forEach(([t, e]) => {
      e instanceof RegExp || z(
        `Pattern ${e} for «${n.name}» Tool is skipped because it should be a Regexp instance.`,
        "warn"
      ), this.toolsPatterns.push({
        key: t,
        pattern: e,
        tool: n
      });
    });
  }
  /**
   * Check if browser behavior suits better
   *
   * @param {EventTarget} element - element where content has been pasted
   * @returns {boolean}
   */
  isNativeBehaviour(n) {
    return g.isNativeInput(n);
  }
  /**
   * Get files from data transfer object and insert related Tools
   *
   * @param {FileList} items - pasted or dropped items
   */
  async processFiles(n) {
    const { BlockManager: t } = this.Editor;
    let e;
    e = await Promise.all(
      Array.from(n).map((i) => this.processFile(i))
    ), e = e.filter((i) => !!i);
    const o = t.currentBlock.tool.isDefault && t.currentBlock.isEmpty;
    e.forEach(
      (i, r) => {
        t.paste(i.type, i.event, r === 0 && o);
      }
    );
  }
  /**
   * Get information about file and find Tool to handle it
   *
   * @param {File} file - file to process
   */
  async processFile(n) {
    const t = jl(n), e = Object.entries(this.toolsFiles).find(([i, { mimeTypes: r, extensions: s }]) => {
      const [a, l] = n.type.split("/"), c = s.find((d) => d.toLowerCase() === t.toLowerCase()), h = r.find((d) => {
        const [u, f] = d.split("/");
        return u === a && (f === l || f === "*");
      });
      return !!c || !!h;
    });
    if (!e)
      return;
    const [o] = e;
    return {
      event: this.composePasteEvent("file", {
        file: n
      }),
      type: o
    };
  }
  /**
   * Split HTML string to blocks and return it as array of Block data
   *
   * @param {string} innerHTML - html string to process
   * @returns {PasteData[]}
   */
  processHTML(n) {
    const { Tools: t } = this.Editor, e = g.make("DIV");
    return e.innerHTML = n, this.getNodes(e).map((o) => {
      let i, r = t.defaultTool, s = !1;
      switch (o.nodeType) {
        case Node.DOCUMENT_FRAGMENT_NODE:
          i = g.make("div"), i.appendChild(o);
          break;
        case Node.ELEMENT_NODE:
          i = o, s = !0, this.toolsTags[i.tagName] && (r = this.toolsTags[i.tagName].tool);
          break;
      }
      const { tags: a } = r.pasteConfig || { tags: [] }, l = a.reduce((d, u) => (this.collectTagNames(u).forEach((f) => {
        const p = st(u) ? u[f] : null;
        d[f.toLowerCase()] = p || {};
      }), d), {}), c = Object.assign({}, l, r.baseSanitizeConfig);
      if (i.tagName.toLowerCase() === "table") {
        const d = Rt(i.outerHTML, c);
        i = g.make("div", void 0, {
          innerHTML: d
        }).firstChild;
      } else
        i.innerHTML = Rt(i.innerHTML, c);
      const h = this.composePasteEvent("tag", {
        data: i
      });
      return {
        content: i,
        isBlock: s,
        tool: r.name,
        event: h
      };
    }).filter((o) => {
      const i = g.isEmpty(o.content), r = g.isSingleTag(o.content);
      return !i || r;
    });
  }
  /**
   * Split plain text by new line symbols and return it as array of Block data
   *
   * @param {string} plain - string to process
   * @returns {PasteData[]}
   */
  processPlain(n) {
    const { defaultBlock: t } = this.config;
    if (!n)
      return [];
    const e = t;
    return n.split(/\r?\n/).filter((o) => o.trim()).map((o) => {
      const i = g.make("div");
      i.textContent = o;
      const r = this.composePasteEvent("tag", {
        data: i
      });
      return {
        content: i,
        tool: e,
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
  async processSingleBlock(n) {
    const { Caret: t, BlockManager: e } = this.Editor, { currentBlock: o } = e;
    if (!o || n.tool !== o.name || !g.containsOnlyInlineElements(n.content.innerHTML)) {
      this.insertBlock(n, (o == null ? void 0 : o.tool.isDefault) && o.isEmpty);
      return;
    }
    t.insertContentAtCaretPosition(n.content.innerHTML);
  }
  /**
   * Process paste to single Block:
   * 1. Find patterns` matches
   * 2. Insert new block if it is not the same type as current one
   * 3. Just insert text if there is no substitutions
   *
   * @param {PasteData} dataToInsert - data of Block to insert
   */
  async processInlinePaste(n) {
    const { BlockManager: t, Caret: e } = this.Editor, { content: o } = n;
    if (t.currentBlock && t.currentBlock.tool.isDefault && o.textContent.length < jr.PATTERN_PROCESSING_MAX_LENGTH) {
      const i = await this.processPattern(o.textContent);
      if (i) {
        const r = t.currentBlock && t.currentBlock.tool.isDefault && t.currentBlock.isEmpty, s = t.paste(i.tool, i.event, r);
        e.setToBlock(s, e.positions.END);
        return;
      }
    }
    if (t.currentBlock && t.currentBlock.currentInput) {
      const i = t.currentBlock.tool.baseSanitizeConfig;
      document.execCommand(
        "insertHTML",
        !1,
        Rt(o.innerHTML, i)
      );
    } else
      this.insertBlock(n);
  }
  /**
   * Get patterns` matches
   *
   * @param {string} text - text to process
   * @returns {Promise<{event: PasteEvent, tool: string}>}
   */
  async processPattern(n) {
    const t = this.toolsPatterns.find((e) => {
      const o = e.pattern.exec(n);
      return o ? n === o.shift() : !1;
    });
    return t ? {
      event: this.composePasteEvent("pattern", {
        key: t.key,
        data: n
      }),
      tool: t.tool.name
    } : void 0;
  }
  /**
   * Insert pasted Block content to Editor
   *
   * @param {PasteData} data - data to insert
   * @param {boolean} canReplaceCurrentBlock - if true and is current Block is empty, will replace current Block
   * @returns {void}
   */
  insertBlock(n, t = !1) {
    const { BlockManager: e, Caret: o } = this.Editor, { currentBlock: i } = e;
    let r;
    if (t && i && i.isEmpty) {
      r = e.paste(n.tool, n.event, !0), o.setToBlock(r, o.positions.END);
      return;
    }
    r = e.paste(n.tool, n.event), o.setToBlock(r, o.positions.END);
  }
  /**
   * Insert data passed as application/x-editor-js JSON
   *
   * @param {Array} blocks — Blocks' data to insert
   * @returns {void}
   */
  insertEditorJSData(n) {
    const { BlockManager: t, Caret: e, Tools: o } = this.Editor;
    Or(
      n,
      (i) => o.blockTools.get(i).sanitizeConfig
    ).forEach(({ tool: i, data: r }, s) => {
      let a = !1;
      s === 0 && (a = t.currentBlock && t.currentBlock.tool.isDefault && t.currentBlock.isEmpty);
      const l = t.insert({
        tool: i,
        data: r,
        replace: a
      });
      e.setToBlock(l, e.positions.END);
    });
  }
  /**
   * Fetch nodes from Element node
   *
   * @param {Node} node - current node
   * @param {Node[]} nodes - processed nodes
   * @param {Node} destNode - destination node
   */
  processElementNode(n, t, e) {
    const o = Object.keys(this.toolsTags), i = n, { tool: r } = this.toolsTags[i.tagName] || {}, s = this.tagsByTool[r == null ? void 0 : r.name] || [], a = o.includes(i.tagName), l = g.blockElements.includes(i.tagName.toLowerCase()), c = Array.from(i.children).some(
      ({ tagName: d }) => o.includes(d) && !s.includes(d)
    ), h = Array.from(i.children).some(
      ({ tagName: d }) => g.blockElements.includes(d.toLowerCase())
    );
    if (!l && !a && !c)
      return e.appendChild(i), [...t, e];
    if (a && !c || l && !h && !c)
      return [...t, e, i];
  }
  /**
   * Recursively divide HTML string to two types of nodes:
   * 1. Block element
   * 2. Document Fragments contained text and markup tags like a, b, i etc.
   *
   * @param {Node} wrapper - wrapper of paster HTML content
   * @returns {Node[]}
   */
  getNodes(n) {
    const t = Array.from(n.childNodes);
    let e;
    const o = (i, r) => {
      if (g.isEmpty(r) && !g.isSingleTag(r))
        return i;
      const s = i[i.length - 1];
      let a = new DocumentFragment();
      switch (s && g.isFragment(s) && (a = i.pop()), r.nodeType) {
        case Node.ELEMENT_NODE:
          if (e = this.processElementNode(r, i, a), e)
            return e;
          break;
        case Node.TEXT_NODE:
          return a.appendChild(r), [...i, a];
        default:
          return [...i, a];
      }
      return [...i, ...Array.from(r.childNodes).reduce(o, [])];
    };
    return t.reduce(o, []);
  }
  /**
   * Compose paste event with passed type and detail
   *
   * @param {string} type - event type
   * @param {PasteEventDetail} detail - event detail
   */
  composePasteEvent(n, t) {
    return new CustomEvent(n, {
      detail: t
    });
  }
};
let Ur = jr;
Ur.PATTERN_PROCESSING_MAX_LENGTH = 450;
class ed extends V {
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
    const { Tools: t } = this.Editor, { blockTools: e } = t, o = [];
    Array.from(e.entries()).forEach(([i, r]) => {
      r.isReadOnlySupported || o.push(i);
    }), this.toolsDontSupportReadOnly = o, this.config.readOnly && o.length > 0 && this.throwCriticalError(), this.toggle(this.config.readOnly);
  }
  /**
   * Set read-only mode or toggle current state
   * Call all Modules `toggleReadOnly` method and re-render Editor
   *
   * @param {boolean} state - (optional) read-only state or toggle
   */
  async toggle(t = !this.readOnlyEnabled) {
    t && this.toolsDontSupportReadOnly.length > 0 && this.throwCriticalError();
    const e = this.readOnlyEnabled;
    this.readOnlyEnabled = t;
    for (const i in this.Editor)
      this.Editor[i].toggleReadOnly && this.Editor[i].toggleReadOnly(t);
    if (e === t)
      return this.readOnlyEnabled;
    const o = await this.Editor.Saver.save();
    return await this.Editor.BlockManager.clear(), await this.Editor.Renderer.render(o.blocks), this.readOnlyEnabled;
  }
  /**
   * Throws an error about tools which don't support read-only mode
   */
  throwCriticalError() {
    throw new Br(
      `To enable read-only mode all connected tools should support it. Tools ${this.toolsDontSupportReadOnly.join(", ")} don't support read-only mode.`
    );
  }
}
class We extends V {
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
  startSelection(t, e) {
    const o = document.elementFromPoint(t - window.pageXOffset, e - window.pageYOffset);
    o.closest(`.${this.Editor.Toolbar.CSS.toolbar}`) || (this.Editor.BlockSelection.allBlocksSelected = !1, this.clearSelection(), this.stackOfSelected = []);
    const i = [
      `.${ot.CSS.content}`,
      `.${this.Editor.Toolbar.CSS.toolbar}`,
      `.${this.Editor.InlineToolbar.CSS.inlineToolbar}`
    ], r = o.closest("." + this.Editor.UI.CSS.editorWrapper), s = i.some((a) => !!o.closest(a));
    !r || s || (this.mousedown = !0, this.startX = t, this.startY = e);
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
    const { container: t } = this.genHTML();
    this.listeners.on(t, "mousedown", (e) => {
      this.processMouseDown(e);
    }, !1), this.listeners.on(document.body, "mousemove", cn((e) => {
      this.processMouseMove(e);
    }, 10), {
      passive: !0
    }), this.listeners.on(document.body, "mouseleave", () => {
      this.processMouseLeave();
    }), this.listeners.on(window, "scroll", cn((e) => {
      this.processScroll(e);
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
  processMouseDown(t) {
    t.button === this.MAIN_MOUSE_BUTTON && (t.target.closest(g.allInputsSelector) !== null || this.startSelection(t.pageX, t.pageY));
  }
  /**
   * Handle mouse move events
   *
   * @param {MouseEvent} mouseEvent - mouse event payload
   */
  processMouseMove(t) {
    this.changingRectangle(t), this.scrollByZones(t.clientY);
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
  processScroll(t) {
    this.changingRectangle(t);
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
  scrollByZones(t) {
    if (this.inScrollZone = null, t <= this.HEIGHT_OF_SCROLL_ZONE && (this.inScrollZone = this.TOP_SCROLL_ZONE), document.documentElement.clientHeight - t <= this.HEIGHT_OF_SCROLL_ZONE && (this.inScrollZone = this.BOTTOM_SCROLL_ZONE), !this.inScrollZone) {
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
    const { UI: t } = this.Editor, e = t.nodes.holder.querySelector("." + t.CSS.editorWrapper), o = g.make("div", We.CSS.overlay, {}), i = g.make("div", We.CSS.overlayContainer, {}), r = g.make("div", We.CSS.rect, {});
    return i.appendChild(r), o.appendChild(i), e.appendChild(o), this.overlayRectangle = r, {
      container: e,
      overlay: o
    };
  }
  /**
   * Activates scrolling if blockSelection is active and mouse is in scroll zone
   *
   * @param {number} speed - speed of scrolling
   */
  scrollVertical(t) {
    if (!(this.inScrollZone && this.mousedown))
      return;
    const e = window.pageYOffset;
    window.scrollBy(0, t), this.mouseY += window.pageYOffset - e, setTimeout(() => {
      this.scrollVertical(t);
    }, 0);
  }
  /**
   * Handles the change in the rectangle and its effect
   *
   * @param {MouseEvent} event - mouse event
   */
  changingRectangle(t) {
    if (!this.mousedown)
      return;
    t.pageY !== void 0 && (this.mouseX = t.pageX, this.mouseY = t.pageY);
    const { rightPos: e, leftPos: o, index: i } = this.genInfoForMouseSelection(), r = this.startX > e && this.mouseX > e, s = this.startX < o && this.mouseX < o;
    this.rectCrossesBlocks = !(r || s), this.isRectSelectionActivated || (this.rectCrossesBlocks = !1, this.isRectSelectionActivated = !0, this.shrinkRectangleToPoint(), this.overlayRectangle.style.display = "block"), this.updateRectangleSize(), this.Editor.Toolbar.close(), i !== void 0 && (this.trySelectNextBlock(i), this.inverseSelection(), N.get().removeAllRanges());
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
    const t = this.Editor.BlockManager.getBlockByIndex(this.stackOfSelected[0]).selected;
    if (this.rectCrossesBlocks && !t)
      for (const e of this.stackOfSelected)
        this.Editor.BlockSelection.selectBlockByIndex(e);
    if (!this.rectCrossesBlocks && t)
      for (const e of this.stackOfSelected)
        this.Editor.BlockSelection.unSelectBlockByIndex(e);
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
    const t = document.body.offsetWidth / 2, e = this.mouseY - window.pageYOffset, o = document.elementFromPoint(t, e), i = this.Editor.BlockManager.getBlockByChildNode(o);
    let r;
    i !== void 0 && (r = this.Editor.BlockManager.blocks.findIndex((h) => h.holder === i.holder));
    const s = this.Editor.BlockManager.lastBlock.holder.querySelector("." + ot.CSS.content), a = Number.parseInt(window.getComputedStyle(s).width, 10) / 2, l = t - a, c = t + a;
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
  addBlockInSelection(t) {
    this.rectCrossesBlocks && this.Editor.BlockSelection.selectBlockByIndex(t), this.stackOfSelected.push(t);
  }
  /**
   * Adds a block to the selection and determines which blocks should be selected
   *
   * @param {object} index - index of new block in the reactor
   */
  trySelectNextBlock(t) {
    const e = this.stackOfSelected[this.stackOfSelected.length - 1] === t, o = this.stackOfSelected.length, i = 1, r = -1, s = 0;
    if (e)
      return;
    const a = this.stackOfSelected[o - 1] - this.stackOfSelected[o - 2] > 0;
    let l = s;
    o > 1 && (l = a ? i : r);
    const c = t > this.stackOfSelected[o - 1] && l === i, h = t < this.stackOfSelected[o - 1] && l === r, d = !(c || h || l === s);
    if (!d && (t > this.stackOfSelected[o - 1] || this.stackOfSelected[o - 1] === void 0)) {
      let p = this.stackOfSelected[o - 1] + 1 || t;
      for (p; p <= t; p++)
        this.addBlockInSelection(p);
      return;
    }
    if (!d && t < this.stackOfSelected[o - 1]) {
      for (let p = this.stackOfSelected[o - 1] - 1; p >= t; p--)
        this.addBlockInSelection(p);
      return;
    }
    if (!d)
      return;
    let u = o - 1, f;
    for (t > this.stackOfSelected[o - 1] ? f = () => t > this.stackOfSelected[u] : f = () => t < this.stackOfSelected[u]; f(); )
      this.rectCrossesBlocks && this.Editor.BlockSelection.unSelectBlockByIndex(this.stackOfSelected[u]), this.stackOfSelected.pop(), u--;
  }
}
class od extends V {
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
  async render(t) {
    const e = t.map((i) => ({ function: () => this.insertBlock(i) }));
    this.Editor.ModificationsObserver.disable();
    const o = await xr(e);
    return this.Editor.ModificationsObserver.enable(), this.Editor.UI.checkEmptiness(), o;
  }
  /**
   * Get plugin instance
   * Add plugin instance to BlockManager
   * Insert block to working zone
   *
   * @param {object} item - Block data to insert
   * @returns {Promise<void>}
   */
  async insertBlock(t) {
    var e;
    const { Tools: o, BlockManager: i } = this.Editor, { type: r, data: s, tunes: a, id: l } = t;
    if (o.available.has(r))
      try {
        i.insert({
          id: l,
          tool: r,
          data: s,
          tunes: a
        });
      } catch (c) {
        throw z(`Block «${r}» skipped because of plugins error`, "warn", {
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
      if (o.unavailable.has(r)) {
        const d = (e = o.unavailable.get(r).toolbox[0]) == null ? void 0 : e.title;
        c.title = d || c.title;
      }
      const h = i.insert({
        id: l,
        tool: o.stubTool,
        data: c
      });
      h.stretched = !0, z(`Tool «${r}» is not found. Check 'tools' property at your initial Editor.js config.`, "warn");
    }
  }
}
class nd extends V {
  /**
   * Composes new chain of Promises to fire them alternatelly
   *
   * @returns {OutputData}
   */
  async save() {
    const { BlockManager: t, Tools: e } = this.Editor, o = t.blocks, i = [];
    try {
      o.forEach((a) => {
        i.push(this.getSavedData(a));
      });
      const r = await Promise.all(i), s = await Or(r, (a) => e.blockTools.get(a).sanitizeConfig);
      return this.makeOutput(s);
    } catch (r) {
      St("Saving failed due to the Error %o", "error", r);
    }
  }
  /**
   * Saves and validates
   *
   * @param {Block} block - Editor's Tool
   * @returns {ValidatedData} - Tool's validated data
   */
  async getSavedData(t) {
    const e = await t.save(), o = e && await t.validate(e.data);
    return {
      ...e,
      isValid: o
    };
  }
  /**
   * Creates output object with saved data, time and version of editor
   *
   * @param {ValidatedData} allExtractedData - data extracted from Blocks
   * @returns {OutputData}
   */
  makeOutput(t) {
    let e = 0;
    const o = [];
    return z("[Editor.js saving]:", "groupCollapsed"), t.forEach(({ id: i, tool: r, data: s, tunes: a, time: l, isValid: c }) => {
      if (e += l, z(`${r.charAt(0).toUpperCase() + r.slice(1)}`, "group"), c)
        z(s), z(void 0, "groupEnd");
      else {
        z(`Block «${r}» skipped because saved data is invalid`), z(void 0, "groupEnd");
        return;
      }
      if (r === this.Editor.Tools.stubTool) {
        o.push(s);
        return;
      }
      const h = {
        id: i,
        type: r,
        data: s,
        ...!_t(a) && {
          tunes: a
        }
      };
      o.push(h);
    }), z("Total", "log", e), z(void 0, "groupEnd"), {
      time: +/* @__PURE__ */ new Date(),
      blocks: o,
      version: "2.27.1"
    };
  }
}
var bn = {}, id = {
  get exports() {
    return bn;
  },
  set exports(n) {
    bn = n;
  }
};
(function(n, t) {
  (function(e, o) {
    n.exports = o();
  })(window, function() {
    return function(e) {
      var o = {};
      function i(r) {
        if (o[r])
          return o[r].exports;
        var s = o[r] = { i: r, l: !1, exports: {} };
        return e[r].call(s.exports, s, s.exports, i), s.l = !0, s.exports;
      }
      return i.m = e, i.c = o, i.d = function(r, s, a) {
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
    }([function(e, o, i) {
      var r = i(1), s = i(2);
      typeof (s = s.__esModule ? s.default : s) == "string" && (s = [[e.i, s, ""]]);
      var a = { insert: "head", singleton: !1 };
      r(s, a), e.exports = s.locals || {};
    }, function(e, o, i) {
      var r, s = function() {
        return r === void 0 && (r = !!(window && document && document.all && !window.atob)), r;
      }, a = function() {
        var E = {};
        return function(v) {
          if (E[v] === void 0) {
            var m = document.querySelector(v);
            if (window.HTMLIFrameElement && m instanceof window.HTMLIFrameElement)
              try {
                m = m.contentDocument.head;
              } catch {
                m = null;
              }
            E[v] = m;
          }
          return E[v];
        };
      }(), l = [];
      function c(E) {
        for (var v = -1, m = 0; m < l.length; m++)
          if (l[m].identifier === E) {
            v = m;
            break;
          }
        return v;
      }
      function h(E, v) {
        for (var m = {}, T = [], D = 0; D < E.length; D++) {
          var S = E[D], y = v.base ? S[0] + v.base : S[0], A = m[y] || 0, w = "".concat(y, " ").concat(A);
          m[y] = A + 1;
          var k = c(w), x = { css: S[1], media: S[2], sourceMap: S[3] };
          k !== -1 ? (l[k].references++, l[k].updater(x)) : l.push({ identifier: w, updater: _(x, v), references: 1 }), T.push(w);
        }
        return T;
      }
      function d(E) {
        var v = document.createElement("style"), m = E.attributes || {};
        if (m.nonce === void 0) {
          var T = i.nc;
          T && (m.nonce = T);
        }
        if (Object.keys(m).forEach(function(S) {
          v.setAttribute(S, m[S]);
        }), typeof E.insert == "function")
          E.insert(v);
        else {
          var D = a(E.insert || "head");
          if (!D)
            throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
          D.appendChild(v);
        }
        return v;
      }
      var u, f = (u = [], function(E, v) {
        return u[E] = v, u.filter(Boolean).join(`
`);
      });
      function p(E, v, m, T) {
        var D = m ? "" : T.media ? "@media ".concat(T.media, " {").concat(T.css, "}") : T.css;
        if (E.styleSheet)
          E.styleSheet.cssText = f(v, D);
        else {
          var S = document.createTextNode(D), y = E.childNodes;
          y[v] && E.removeChild(y[v]), y.length ? E.insertBefore(S, y[v]) : E.appendChild(S);
        }
      }
      function b(E, v, m) {
        var T = m.css, D = m.media, S = m.sourceMap;
        if (D ? E.setAttribute("media", D) : E.removeAttribute("media"), S && btoa && (T += `
/*# sourceMappingURL=data:application/json;base64,`.concat(btoa(unescape(encodeURIComponent(JSON.stringify(S)))), " */")), E.styleSheet)
          E.styleSheet.cssText = T;
        else {
          for (; E.firstChild; )
            E.removeChild(E.firstChild);
          E.appendChild(document.createTextNode(T));
        }
      }
      var O = null, B = 0;
      function _(E, v) {
        var m, T, D;
        if (v.singleton) {
          var S = B++;
          m = O || (O = d(v)), T = p.bind(null, m, S, !1), D = p.bind(null, m, S, !0);
        } else
          m = d(v), T = b.bind(null, m, v), D = function() {
            (function(y) {
              if (y.parentNode === null)
                return !1;
              y.parentNode.removeChild(y);
            })(m);
          };
        return T(E), function(y) {
          if (y) {
            if (y.css === E.css && y.media === E.media && y.sourceMap === E.sourceMap)
              return;
            T(E = y);
          } else
            D();
        };
      }
      e.exports = function(E, v) {
        (v = v || {}).singleton || typeof v.singleton == "boolean" || (v.singleton = s());
        var m = h(E = E || [], v);
        return function(T) {
          if (T = T || [], Object.prototype.toString.call(T) === "[object Array]") {
            for (var D = 0; D < m.length; D++) {
              var S = c(m[D]);
              l[S].references--;
            }
            for (var y = h(T, v), A = 0; A < m.length; A++) {
              var w = c(m[A]);
              l[w].references === 0 && (l[w].updater(), l.splice(w, 1));
            }
            m = y;
          }
        };
      };
    }, function(e, o, i) {
      (o = i(3)(!1)).push([e.i, `.ce-paragraph {
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
`, ""]), e.exports = o;
    }, function(e, o, i) {
      e.exports = function(r) {
        var s = [];
        return s.toString = function() {
          return this.map(function(a) {
            var l = function(c, h) {
              var d = c[1] || "", u = c[3];
              if (!u)
                return d;
              if (h && typeof btoa == "function") {
                var f = (b = u, O = btoa(unescape(encodeURIComponent(JSON.stringify(b)))), B = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(O), "/*# ".concat(B, " */")), p = u.sources.map(function(_) {
                  return "/*# sourceURL=".concat(u.sourceRoot || "").concat(_, " */");
                });
                return [d].concat(p).concat([f]).join(`
`);
              }
              var b, O, B;
              return [d].join(`
`);
            }(a, r);
            return a[2] ? "@media ".concat(a[2], " {").concat(l, "}") : l;
          }).join("");
        }, s.i = function(a, l, c) {
          typeof a == "string" && (a = [[null, a, ""]]);
          var h = {};
          if (c)
            for (var d = 0; d < this.length; d++) {
              var u = this[d][0];
              u != null && (h[u] = !0);
            }
          for (var f = 0; f < a.length; f++) {
            var p = [].concat(a[f]);
            c && h[p[0]] || (l && (p[2] ? p[2] = "".concat(l, " and ").concat(p[2]) : p[2] = l), s.push(p));
          }
        }, s;
      };
    }, function(e, o, i) {
      i.r(o), i.d(o, "default", function() {
        return a;
      }), i(0);
      function r(l, c) {
        for (var h = 0; h < c.length; h++) {
          var d = c[h];
          d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(l, d.key, d);
        }
      }
      function s(l, c, h) {
        return c && r(l.prototype, c), h && r(l, h), l;
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
          var h = c.data, d = c.config, u = c.api, f = c.readOnly;
          (function(p, b) {
            if (!(p instanceof b))
              throw new TypeError("Cannot call a class as a function");
          })(this, l), this.api = u, this.readOnly = f, this._CSS = { block: this.api.styles.block, wrapper: "ce-paragraph" }, this.readOnly || (this.onKeyUp = this.onKeyUp.bind(this)), this._placeholder = d.placeholder ? d.placeholder : l.DEFAULT_PLACEHOLDER, this._data = {}, this._element = this.drawView(), this._preserveBlank = d.preserveBlank !== void 0 && d.preserveBlank, this.data = h;
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
          var h = { text: this.data.text + c.text };
          this.data = h;
        } }, { key: "validate", value: function(c) {
          return !(c.text.trim() === "" && !this._preserveBlank);
        } }, { key: "save", value: function(c) {
          return { text: c.innerHTML };
        } }, { key: "onPaste", value: function(c) {
          var h = { text: c.detail.data.innerHTML };
          this.data = h;
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
})(id);
const rd = /* @__PURE__ */ Ro(bn);
class jn {
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
    return this.nodes.button = document.createElement("button"), this.nodes.button.type = "button", this.nodes.button.classList.add(this.CSS.button, this.CSS.buttonModifier), this.nodes.button.innerHTML = Bc, this.nodes.button;
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
    const t = document.queryCommandState(this.commandName);
    return this.nodes.button.classList.toggle(this.CSS.buttonActive, t), t;
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
jn.isInline = !0;
jn.title = "Bold";
class Un {
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
    return this.nodes.button = document.createElement("button"), this.nodes.button.type = "button", this.nodes.button.classList.add(this.CSS.button, this.CSS.buttonModifier), this.nodes.button.innerHTML = Oc, this.nodes.button;
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
    const t = document.queryCommandState(this.commandName);
    return this.nodes.button.classList.toggle(this.CSS.buttonActive, t), t;
  }
  /**
   * Set a shortcut
   */
  get shortcut() {
    return "CMD+I";
  }
}
Un.isInline = !0;
Un.title = "Italic";
class zn {
  /**
   * @param api - Editor.js API
   */
  constructor({ api: t }) {
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
    }, this.inputOpened = !1, this.toolbar = t.toolbar, this.inlineToolbar = t.inlineToolbar, this.notifier = t.notifier, this.i18n = t.i18n, this.selection = new N();
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
    return this.nodes.button = document.createElement("button"), this.nodes.button.type = "button", this.nodes.button.classList.add(this.CSS.button, this.CSS.buttonModifier), this.nodes.button.innerHTML = Mi, this.nodes.button;
  }
  /**
   * Input for the link
   */
  renderActions() {
    return this.nodes.input = document.createElement("input"), this.nodes.input.placeholder = this.i18n.t("Add a link"), this.nodes.input.classList.add(this.CSS.input), this.nodes.input.addEventListener("keydown", (t) => {
      t.keyCode === this.ENTER_KEY && this.enterPressed(t);
    }), this.nodes.input;
  }
  /**
   * Handle clicks on the Inline Toolbar icon
   *
   * @param {Range} range - range to wrap with link
   */
  surround(t) {
    if (t) {
      this.inputOpened ? (this.selection.restore(), this.selection.removeFakeBackground()) : (this.selection.setFakeBackground(), this.selection.save());
      const e = this.selection.findParentTag("A");
      if (e) {
        this.selection.expandToTag(e), this.unlink(), this.closeActions(), this.checkState(), this.toolbar.close();
        return;
      }
    }
    this.toggleActions();
  }
  /**
   * Check selection and set activated state to button if there are <a> tag
   */
  checkState() {
    const t = this.selection.findParentTag("A");
    if (t) {
      this.nodes.button.innerHTML = Dc, this.nodes.button.classList.add(this.CSS.buttonUnlink), this.nodes.button.classList.add(this.CSS.buttonActive), this.openActions();
      const e = t.getAttribute("href");
      this.nodes.input.value = e !== "null" ? e : "", this.selection.save();
    } else
      this.nodes.button.innerHTML = Mi, this.nodes.button.classList.remove(this.CSS.buttonUnlink), this.nodes.button.classList.remove(this.CSS.buttonActive);
    return !!t;
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
  openActions(t = !1) {
    this.nodes.input.classList.add(this.CSS.inputShowed), t && this.nodes.input.focus(), this.inputOpened = !0;
  }
  /**
   * Close input
   *
   * @param {boolean} clearSavedSelection — we don't need to clear saved selection
   *                                        on toggle-clicks on the icon of opened Toolbar
   */
  closeActions(t = !0) {
    if (this.selection.isFakeBackgroundEnabled) {
      const e = new N();
      e.save(), this.selection.restore(), this.selection.removeFakeBackground(), e.restore();
    }
    this.nodes.input.classList.remove(this.CSS.inputShowed), this.nodes.input.value = "", t && this.selection.clearSaved(), this.inputOpened = !1;
  }
  /**
   * Enter pressed on input
   *
   * @param {KeyboardEvent} event - enter keydown event
   */
  enterPressed(t) {
    let e = this.nodes.input.value || "";
    if (!e.trim()) {
      this.selection.restore(), this.unlink(), t.preventDefault(), this.closeActions();
      return;
    }
    if (!this.validateURL(e)) {
      this.notifier.show({
        message: "Pasted link is not valid.",
        style: "error"
      }), z("Incorrect Link pasted", "warn", e);
      return;
    }
    e = this.prepareLink(e), this.selection.restore(), this.selection.removeFakeBackground(), this.insertLink(e), t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation(), this.selection.collapseToEnd(), this.inlineToolbar.close();
  }
  /**
   * Detects if passed string is URL
   *
   * @param {string} str - string to validate
   * @returns {boolean}
   */
  validateURL(t) {
    return !/\s/.test(t);
  }
  /**
   * Process link before injection
   * - sanitize
   * - add protocol for links like 'google.com'
   *
   * @param {string} link - raw user input
   */
  prepareLink(t) {
    return t = t.trim(), t = this.addProtocol(t), t;
  }
  /**
   * Add 'http' protocol to the links like 'vc.ru', 'google.com'
   *
   * @param {string} link - string to process
   */
  addProtocol(t) {
    if (/^(\w+):(\/\/)?/.test(t))
      return t;
    const e = /^\/[^/\s]/.test(t), o = t.substring(0, 1) === "#", i = /^\/\/[^/\s]/.test(t);
    return !e && !o && !i && (t = "http://" + t), t;
  }
  /**
   * Inserts <a> tag with "href"
   *
   * @param {string} link - "href" value
   */
  insertLink(t) {
    const e = this.selection.findParentTag("A");
    e && this.selection.expandToTag(e), document.execCommand(this.commandLink, !1, t);
  }
  /**
   * Removes <a> tag
   */
  unlink() {
    document.execCommand(this.commandUnlink);
  }
}
zn.isInline = !0;
zn.title = "Link";
class zr {
  /**
   * @param options - constructor options
   * @param options.data - stub tool data
   * @param options.api - Editor.js API
   */
  constructor({ data: t, api: e }) {
    this.CSS = {
      wrapper: "ce-stub",
      info: "ce-stub__info",
      title: "ce-stub__title",
      subtitle: "ce-stub__subtitle"
    }, this.api = e, this.title = t.title || this.api.i18n.t("Error"), this.subtitle = this.api.i18n.t("The block can not be displayed correctly."), this.savedData = t.savedData, this.wrapper = this.make();
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
    const t = g.make("div", this.CSS.wrapper), e = '<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52"><path fill="#D76B6B" fill-rule="nonzero" d="M26 52C11.64 52 0 40.36 0 26S11.64 0 26 0s26 11.64 26 26-11.64 26-26 26zm0-3.25c12.564 0 22.75-10.186 22.75-22.75S38.564 3.25 26 3.25 3.25 13.436 3.25 26 13.436 48.75 26 48.75zM15.708 33.042a2.167 2.167 0 1 1 0-4.334 2.167 2.167 0 0 1 0 4.334zm23.834 0a2.167 2.167 0 1 1 0-4.334 2.167 2.167 0 0 1 0 4.334zm-15.875 5.452a1.083 1.083 0 1 1-1.834-1.155c1.331-2.114 3.49-3.179 6.334-3.179 2.844 0 5.002 1.065 6.333 3.18a1.083 1.083 0 1 1-1.833 1.154c-.913-1.45-2.366-2.167-4.5-2.167s-3.587.717-4.5 2.167z"/></svg>', o = g.make("div", this.CSS.info), i = g.make("div", this.CSS.title, {
      textContent: this.title
    }), r = g.make("div", this.CSS.subtitle, {
      textContent: this.subtitle
    });
    return t.innerHTML = e, o.appendChild(i), o.appendChild(r), t.appendChild(o), t;
  }
}
zr.isReadOnlySupported = !0;
class sd extends Hn {
  constructor() {
    super(...arguments), this.type = Fo.Inline;
  }
  /**
   * Returns title for Inline Tool if specified by user
   */
  get title() {
    return this.constructable[Fn.Title];
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
class ad extends Hn {
  constructor() {
    super(...arguments), this.type = Fo.Tune;
  }
  /**
   * Constructs new BlockTune instance from constructable
   *
   * @param data - Tune data
   * @param block - Block API object
   */
  create(t, e) {
    return new this.constructable({
      api: this.api.getMethodsForTool(this),
      config: this.settings,
      block: e,
      data: t
    });
  }
}
class lt extends Map {
  /**
   * Returns Block Tools collection
   */
  get blockTools() {
    const t = Array.from(this.entries()).filter(([, e]) => e.isBlock());
    return new lt(t);
  }
  /**
   * Returns Inline Tools collection
   */
  get inlineTools() {
    const t = Array.from(this.entries()).filter(([, e]) => e.isInline());
    return new lt(t);
  }
  /**
   * Returns Block Tunes collection
   */
  get blockTunes() {
    const t = Array.from(this.entries()).filter(([, e]) => e.isTune());
    return new lt(t);
  }
  /**
   * Returns internal Tools collection
   */
  get internalTools() {
    const t = Array.from(this.entries()).filter(([, e]) => e.isInternal);
    return new lt(t);
  }
  /**
   * Returns Tools collection provided by user
   */
  get externalTools() {
    const t = Array.from(this.entries()).filter(([, e]) => !e.isInternal);
    return new lt(t);
  }
}
var ld = Object.defineProperty, cd = Object.getOwnPropertyDescriptor, Yr = (n, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? cd(t, e) : t, r = n.length - 1, s; r >= 0; r--)
    (s = n[r]) && (i = (o ? s(t, e, i) : s(i)) || i);
  return o && i && ld(t, e, i), i;
};
class Yn extends Hn {
  constructor() {
    super(...arguments), this.type = Fo.Block, this.inlineTools = new lt(), this.tunes = new lt();
  }
  /**
   * Creates new Tool instance
   *
   * @param data - Tool data
   * @param block - BlockAPI for current Block
   * @param readOnly - True if Editor is in read-only mode
   */
  create(t, e, o) {
    return new this.constructable({
      data: t,
      block: e,
      readOnly: o,
      api: this.api.getMethodsForTool(this),
      config: this.settings
    });
  }
  /**
   * Returns true if read-only mode is supported by Tool
   */
  get isReadOnlySupported() {
    return this.constructable[ke.IsReadOnlySupported] === !0;
  }
  /**
   * Returns true if Tool supports linebreaks
   */
  get isLineBreaksEnabled() {
    return this.constructable[ke.IsEnabledLineBreaks];
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
    const t = this.constructable[ke.Toolbox], e = this.config[wo.Toolbox];
    if (!_t(t) && e !== !1)
      return e ? Array.isArray(t) ? Array.isArray(e) ? e.map((o, i) => {
        const r = t[i];
        return r ? {
          ...r,
          ...o
        } : o;
      }) : [e] : Array.isArray(e) ? e : [
        {
          ...t,
          ...e
        }
      ] : Array.isArray(t) ? t : [t];
  }
  /**
   * Returns Tool conversion configuration
   */
  get conversionConfig() {
    return this.constructable[ke.ConversionConfig];
  }
  /**
   * Returns enabled inline tools for Tool
   */
  get enabledInlineTools() {
    return this.config[wo.EnabledInlineTools] || !1;
  }
  /**
   * Returns enabled tunes for Tool
   */
  get enabledBlockTunes() {
    return this.config[wo.EnabledBlockTunes];
  }
  /**
   * Returns Tool paste configuration
   */
  get pasteConfig() {
    return this.constructable[ke.PasteConfig] ?? {};
  }
  get sanitizeConfig() {
    const t = super.sanitizeConfig, e = this.baseSanitizeConfig;
    if (_t(t))
      return e;
    const o = {};
    for (const i in t)
      if (Object.prototype.hasOwnProperty.call(t, i)) {
        const r = t[i];
        st(r) ? o[i] = Object.assign({}, e, r) : o[i] = r;
      }
    return o;
  }
  get baseSanitizeConfig() {
    const t = {};
    return Array.from(this.inlineTools.values()).forEach((e) => Object.assign(t, e.sanitizeConfig)), Array.from(this.tunes.values()).forEach((e) => Object.assign(t, e.sanitizeConfig)), t;
  }
}
Yr([
  Me
], Yn.prototype, "sanitizeConfig", 1);
Yr([
  Me
], Yn.prototype, "baseSanitizeConfig", 1);
class dd {
  /**
   * @class
   * @param config - tools config
   * @param editorConfig - EditorJS config
   * @param api - EditorJS API module
   */
  constructor(t, e, o) {
    this.api = o, this.config = t, this.editorConfig = e;
  }
  /**
   * Returns Tool object based on it's type
   *
   * @param name - tool name
   */
  get(t) {
    const { class: e, isInternal: o = !1, ...i } = this.config[t], r = this.getConstructor(e);
    return new r({
      name: t,
      constructable: e,
      config: i,
      api: this.api,
      isDefault: t === this.editorConfig.defaultBlock,
      defaultPlaceholder: this.editorConfig.placeholder,
      isInternal: o
    });
  }
  /**
   * Find appropriate Tool object constructor for Tool constructable
   *
   * @param constructable - Tools constructable
   */
  getConstructor(t) {
    switch (!0) {
      case t[Fn.IsInline]:
        return sd;
      case t[Hr.IsTune]:
        return ad;
      default:
        return Yn;
    }
  }
}
class Vr {
  /**
   * MoveDownTune constructor
   *
   * @param {API} api — Editor's API
   */
  constructor({ api: t }) {
    this.CSS = {
      animation: "wobble"
    }, this.api = t;
  }
  /**
   * Tune's appearance in block settings menu
   */
  render() {
    return {
      icon: Lr,
      title: this.api.i18n.t("Move down"),
      onActivate: () => this.handleClick(),
      name: "move-down"
    };
  }
  /**
   * Handle clicks on 'move down' button
   */
  handleClick() {
    const t = this.api.blocks.getCurrentBlockIndex(), e = this.api.blocks.getBlockByIndex(t + 1);
    if (!e)
      throw new Error("Unable to move Block down since it is already the last");
    const o = e.holder, i = o.getBoundingClientRect();
    let r = Math.abs(window.innerHeight - o.offsetHeight);
    i.top < window.innerHeight && (r = window.scrollY + o.offsetHeight), window.scrollTo(0, r), this.api.blocks.move(t + 1), this.api.toolbar.toggleBlockSettings(!0);
  }
}
Vr.isTune = !0;
class $r {
  /**
   * DeleteTune constructor
   *
   * @param {API} api - Editor's API
   */
  constructor({ api: t }) {
    this.api = t;
  }
  /**
   * Tune's appearance in block settings menu
   */
  render() {
    return {
      icon: Ic,
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
$r.isTune = !0;
class Wr {
  /**
   * MoveUpTune constructor
   *
   * @param {API} api - Editor's API
   */
  constructor({ api: t }) {
    this.CSS = {
      animation: "wobble"
    }, this.api = t;
  }
  /**
   * Tune's appearance in block settings menu
   */
  render() {
    return {
      icon: _c,
      title: this.api.i18n.t("Move up"),
      onActivate: () => this.handleClick(),
      name: "move-up"
    };
  }
  /**
   * Move current block up
   */
  handleClick() {
    const t = this.api.blocks.getCurrentBlockIndex(), e = this.api.blocks.getBlockByIndex(t), o = this.api.blocks.getBlockByIndex(t - 1);
    if (t === 0 || !e || !o)
      throw new Error("Unable to move Block up since it is already the first");
    const i = e.holder, r = o.holder, s = i.getBoundingClientRect(), a = r.getBoundingClientRect();
    let l;
    a.top > 0 ? l = Math.abs(s.top) - Math.abs(a.top) : l = Math.abs(s.top) + a.height, window.scrollBy(0, -1 * l), this.api.blocks.move(t - 1), this.api.toolbar.toggleBlockSettings(!0);
  }
}
Wr.isTune = !0;
var hd = Object.defineProperty, ud = Object.getOwnPropertyDescriptor, pd = (n, t, e, o) => {
  for (var i = o > 1 ? void 0 : o ? ud(t, e) : t, r = n.length - 1, s; r >= 0; r--)
    (s = n[r]) && (i = (o ? s(t, e, i) : s(i)) || i);
  return o && i && hd(t, e, i), i;
};
class Xr extends V {
  constructor() {
    super(...arguments), this.stubTool = "stub", this.toolsAvailable = new lt(), this.toolsUnavailable = new lt();
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
    if (this.validateTools(), this.config.tools = dn({}, this.internalTools, this.config.tools), !Object.prototype.hasOwnProperty.call(this.config, "tools") || Object.keys(this.config.tools).length === 0)
      throw Error("Can't start without tools");
    const t = this.prepareConfig();
    this.factory = new dd(t, this.config, this.Editor.API);
    const e = this.getListOfPrepareFunctions(t);
    if (e.length === 0)
      return Promise.resolve();
    await xr(e, (o) => {
      this.toolPrepareMethodSuccess(o);
    }, (o) => {
      this.toolPrepareMethodFallback(o);
    }), this.prepareBlockTools();
  }
  getAllInlineToolsSanitizeConfig() {
    const t = {};
    return Array.from(this.inlineTools.values()).forEach((e) => {
      Object.assign(t, e.sanitizeConfig);
    }), t;
  }
  /**
   * Calls each Tool reset method to clean up anything set by Tool
   */
  destroy() {
    Object.values(this.available).forEach(async (t) => {
      G(t.reset) && await t.reset();
    });
  }
  /**
   * Returns internal tools
   * Includes Bold, Italic, Link and Paragraph
   */
  get internalTools() {
    return {
      bold: {
        class: jn,
        isInternal: !0
      },
      italic: {
        class: Un,
        isInternal: !0
      },
      link: {
        class: zn,
        isInternal: !0
      },
      paragraph: {
        class: rd,
        inlineToolbar: !0,
        isInternal: !0
      },
      stub: {
        class: zr,
        isInternal: !0
      },
      moveUp: {
        class: Wr,
        isInternal: !0
      },
      delete: {
        class: $r,
        isInternal: !0
      },
      moveDown: {
        class: Vr,
        isInternal: !0
      }
    };
  }
  /**
   * Tool prepare method success callback
   *
   * @param {object} data - append tool to available list
   */
  toolPrepareMethodSuccess(t) {
    const e = this.factory.get(t.toolName);
    if (e.isInline()) {
      const o = ["render", "surround", "checkState"].filter((i) => !e.create()[i]);
      if (o.length) {
        z(
          `Incorrect Inline Tool: ${e.name}. Some of required methods is not implemented %o`,
          "warn",
          o
        ), this.toolsUnavailable.set(e.name, e);
        return;
      }
    }
    this.toolsAvailable.set(e.name, e);
  }
  /**
   * Tool prepare method fail callback
   *
   * @param {object} data - append tool to unavailable list
   */
  toolPrepareMethodFallback(t) {
    this.toolsUnavailable.set(t.toolName, this.factory.get(t.toolName));
  }
  /**
   * Binds prepare function of plugins with user or default config
   *
   * @returns {Array} list of functions that needs to be fired sequentially
   * @param config - tools config
   */
  getListOfPrepareFunctions(t) {
    const e = [];
    return Object.entries(t).forEach(([o, i]) => {
      e.push({
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        function: G(i.class.prepare) ? i.class.prepare : () => {
        },
        data: {
          toolName: o,
          config: i.config
        }
      });
    }), e;
  }
  /**
   * Assign enabled Inline Tools and Block Tunes for Block Tool
   */
  prepareBlockTools() {
    Array.from(this.blockTools.values()).forEach((t) => {
      this.assignInlineToolsToBlockTool(t), this.assignBlockTunesToBlockTool(t);
    });
  }
  /**
   * Assign enabled Inline Tools for Block Tool
   *
   * @param tool - Block Tool
   */
  assignInlineToolsToBlockTool(t) {
    if (this.config.inlineToolbar !== !1) {
      if (t.enabledInlineTools === !0) {
        t.inlineTools = new lt(
          Array.isArray(this.config.inlineToolbar) ? this.config.inlineToolbar.map((e) => [e, this.inlineTools.get(e)]) : Array.from(this.inlineTools.entries())
        );
        return;
      }
      Array.isArray(t.enabledInlineTools) && (t.inlineTools = new lt(
        t.enabledInlineTools.map((e) => [e, this.inlineTools.get(e)])
      ));
    }
  }
  /**
   * Assign enabled Block Tunes for Block Tool
   *
   * @param tool — Block Tool
   */
  assignBlockTunesToBlockTool(t) {
    if (t.enabledBlockTunes !== !1) {
      if (Array.isArray(t.enabledBlockTunes)) {
        const e = new lt(
          t.enabledBlockTunes.map((o) => [o, this.blockTunes.get(o)])
        );
        t.tunes = new lt([...e, ...this.blockTunes.internalTools]);
        return;
      }
      if (Array.isArray(this.config.tunes)) {
        const e = new lt(
          this.config.tunes.map((o) => [o, this.blockTunes.get(o)])
        );
        t.tunes = new lt([...e, ...this.blockTunes.internalTools]);
        return;
      }
      t.tunes = this.blockTunes.internalTools;
    }
  }
  /**
   * Validate Tools configuration objects and throw Error for user if it is invalid
   */
  validateTools() {
    for (const t in this.config.tools)
      if (Object.prototype.hasOwnProperty.call(this.config.tools, t)) {
        if (t in this.internalTools)
          return;
        const e = this.config.tools[t];
        if (!G(e) && !G(e.class))
          throw Error(
            `Tool «${t}» must be a constructor function or an object with function in the «class» property`
          );
      }
  }
  /**
   * Unify tools config
   */
  prepareConfig() {
    const t = {};
    for (const e in this.config.tools)
      st(this.config.tools[e]) ? t[e] = this.config.tools[e] : t[e] = { class: this.config.tools[e] };
    return t;
  }
}
pd([
  Me
], Xr.prototype, "getAllInlineToolsSanitizeConfig", 1);
const fd = `:root{--selectionColor: #e1f2ff;--inlineSelectionColor: #d4ecff;--bg-light: #eff2f5;--grayText: #707684;--color-dark: #1D202B;--color-active-icon: #388AE5;--color-gray-border: rgba(201, 201, 204, .48);--content-width: 650px;--narrow-mode-right-padding: 50px;--toolbox-buttons-size: 26px;--toolbox-buttons-size--mobile: 36px;--icon-size: 20px;--icon-size--mobile: 28px;--block-padding-vertical: .4em;--color-line-gray: #EFF0F1 }.codex-editor{position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;z-index:1}.codex-editor .hide,.codex-editor__redactor--hidden{display:none}.codex-editor__redactor [contenteditable]:empty:after{content:"\\feff"}@media (min-width: 651px){.codex-editor--narrow .codex-editor__redactor{margin-right:50px}}@media (min-width: 651px){.codex-editor--narrow.codex-editor--rtl .codex-editor__redactor{margin-left:50px;margin-right:0}}@media (min-width: 651px){.codex-editor--narrow .ce-toolbar__actions{right:-5px}}.codex-editor__loader{position:relative;height:30vh}.codex-editor__loader:before{content:"";position:absolute;left:50%;top:50%;width:30px;height:30px;margin-top:-15px;margin-left:-15px;border-radius:50%;border:2px solid rgba(201,201,204,.48);border-top-color:transparent;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-animation:editor-loader-spin .8s infinite linear;animation:editor-loader-spin .8s infinite linear;will-change:transform}.codex-editor-copyable{position:absolute;height:1px;width:1px;top:-400%;opacity:.001}.codex-editor-overlay{position:fixed;top:0px;left:0px;right:0px;bottom:0px;z-index:999;pointer-events:none;overflow:hidden}.codex-editor-overlay__container{position:relative;pointer-events:auto;z-index:0}.codex-editor-overlay__rectangle{position:absolute;pointer-events:none;background-color:#2eaadc33;border:1px solid transparent}.codex-editor svg{max-height:100%}.codex-editor path{stroke:currentColor}::-moz-selection{background-color:#d4ecff}::selection{background-color:#d4ecff}.codex-editor--toolbox-opened [contentEditable=true][data-placeholder]:focus:before{opacity:0!important}@-webkit-keyframes editor-loader-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes editor-loader-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.ce-scroll-locked{overflow:hidden}.ce-scroll-locked--hard{overflow:hidden;top:calc(-1 * var(--window-scroll-offset));position:fixed;width:100%}.ce-toolbar{position:absolute;left:0;right:0;top:0;-webkit-transition:opacity .1s ease;transition:opacity .1s ease;will-change:opacity,top;display:none}.ce-toolbar--opened{display:block}.ce-toolbar__content{max-width:650px;margin:0 auto;position:relative}.ce-toolbar__plus{color:#1d202b;cursor:pointer;width:26px;height:26px;border-radius:7px;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-ms-flex-negative:0;flex-shrink:0}@media (max-width: 650px){.ce-toolbar__plus{width:36px;height:36px}}@media (hover: hover){.ce-toolbar__plus:hover{background-color:#eff2f5}}.ce-toolbar__plus--active{background-color:#eff2f5;-webkit-animation:bounceIn .75s 1;animation:bounceIn .75s 1;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.ce-toolbar__plus-shortcut{opacity:.6;word-spacing:-2px;margin-top:5px}@media (max-width: 650px){.ce-toolbar__plus{position:absolute;background-color:#fff;border:1px solid #E8E8EB;-webkit-box-shadow:0 3px 15px -3px rgba(13,20,33,.13);box-shadow:0 3px 15px -3px #0d142121;border-radius:6px;z-index:2;position:static}.ce-toolbar__plus--left-oriented:before{left:15px;margin-left:0}.ce-toolbar__plus--right-oriented:before{left:auto;right:15px;margin-left:0}}.ce-toolbar__actions{position:absolute;right:100%;opacity:0;display:-webkit-box;display:-ms-flexbox;display:flex;padding-right:5px}.ce-toolbar__actions--opened{opacity:1}@media (max-width: 650px){.ce-toolbar__actions{right:auto}}.ce-toolbar__settings-btn{color:#1d202b;width:26px;height:26px;border-radius:7px;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;margin-left:3px;cursor:pointer;user-select:none}@media (max-width: 650px){.ce-toolbar__settings-btn{width:36px;height:36px}}@media (hover: hover){.ce-toolbar__settings-btn:hover{background-color:#eff2f5}}.ce-toolbar__settings-btn--active{background-color:#eff2f5;-webkit-animation:bounceIn .75s 1;animation:bounceIn .75s 1;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}@media (min-width: 651px){.ce-toolbar__settings-btn{width:24px}}.ce-toolbar__settings-btn--hidden{display:none}@media (max-width: 650px){.ce-toolbar__settings-btn{position:absolute;background-color:#fff;border:1px solid #E8E8EB;-webkit-box-shadow:0 3px 15px -3px rgba(13,20,33,.13);box-shadow:0 3px 15px -3px #0d142121;border-radius:6px;z-index:2;position:static}.ce-toolbar__settings-btn--left-oriented:before{left:15px;margin-left:0}.ce-toolbar__settings-btn--right-oriented:before{left:auto;right:15px;margin-left:0}}.ce-toolbar__plus svg,.ce-toolbar__settings-btn svg{width:24px;height:24px}@media (min-width: 651px){.codex-editor--narrow .ce-toolbar__plus{left:5px}}@media (min-width: 651px){.codex-editor--narrow .ce-toolbox .ce-popover{right:0;left:auto;left:initial}}.ce-inline-toolbar{--y-offset: 8px;position:absolute;background-color:#fff;border:1px solid #E8E8EB;-webkit-box-shadow:0 3px 15px -3px rgba(13,20,33,.13);box-shadow:0 3px 15px -3px #0d142121;border-radius:6px;z-index:2;-webkit-transform:translateX(-50%) translateY(8px) scale(.94);transform:translate(-50%) translateY(8px) scale(.94);opacity:0;visibility:hidden;-webkit-transition:opacity .25s ease,-webkit-transform .15s ease;transition:opacity .25s ease,-webkit-transform .15s ease;transition:transform .15s ease,opacity .25s ease;transition:transform .15s ease,opacity .25s ease,-webkit-transform .15s ease;will-change:transform,opacity;top:0;left:0;z-index:3}.ce-inline-toolbar--left-oriented:before{left:15px;margin-left:0}.ce-inline-toolbar--right-oriented:before{left:auto;right:15px;margin-left:0}.ce-inline-toolbar--showed{opacity:1;visibility:visible;-webkit-transform:translateX(-50%);transform:translate(-50%)}.ce-inline-toolbar--left-oriented{-webkit-transform:translateX(-23px) translateY(8px) scale(.94);transform:translate(-23px) translateY(8px) scale(.94)}.ce-inline-toolbar--left-oriented.ce-inline-toolbar--showed{-webkit-transform:translateX(-23px);transform:translate(-23px)}.ce-inline-toolbar--right-oriented{-webkit-transform:translateX(-100%) translateY(8px) scale(.94);transform:translate(-100%) translateY(8px) scale(.94);margin-left:23px}.ce-inline-toolbar--right-oriented.ce-inline-toolbar--showed{-webkit-transform:translateX(-100%);transform:translate(-100%)}.ce-inline-toolbar [hidden]{display:none!important}.ce-inline-toolbar__toggler-and-button-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;padding:0 6px}.ce-inline-toolbar__buttons{display:-webkit-box;display:-ms-flexbox;display:flex}.ce-inline-toolbar__dropdown{display:-webkit-box;display:-ms-flexbox;display:flex;padding:6px;margin:0 6px 0 -6px;-webkit-box-align:center;-ms-flex-align:center;align-items:center;cursor:pointer;border-right:1px solid rgba(201,201,204,.48);-webkit-box-sizing:border-box;box-sizing:border-box}@media (hover: hover){.ce-inline-toolbar__dropdown:hover{background:#eff2f5}}.ce-inline-toolbar__dropdown--hidden{display:none}.ce-inline-toolbar__dropdown-content,.ce-inline-toolbar__dropdown-arrow{display:-webkit-box;display:-ms-flexbox;display:flex}.ce-inline-toolbar__dropdown-content svg,.ce-inline-toolbar__dropdown-arrow svg{width:20px;height:20px}.ce-inline-toolbar__shortcut{opacity:.6;word-spacing:-3px;margin-top:3px}.ce-inline-tool{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding:6px 1px;cursor:pointer;border:0;outline:none;background-color:transparent;vertical-align:bottom;color:inherit;margin:0;border-radius:0;line-height:normal}.ce-inline-tool svg{width:20px;height:20px}@media (max-width: 650px){.ce-inline-tool svg{width:28px;height:28px}}@media (hover: hover){.ce-inline-tool:hover{background-color:#eff2f5}}.ce-inline-tool--active{color:#388ae5}.ce-inline-tool--focused{background:rgba(34,186,255,.08)!important}.ce-inline-tool--focused{-webkit-box-shadow:inset 0 0 0px 1px rgba(7,161,227,.08);box-shadow:inset 0 0 0 1px #07a1e314}.ce-inline-tool--focused-animated{-webkit-animation-name:buttonClicked;animation-name:buttonClicked;-webkit-animation-duration:.25s;animation-duration:.25s}.ce-inline-tool--link .icon--unlink,.ce-inline-tool--unlink .icon--link{display:none}.ce-inline-tool--unlink .icon--unlink{display:inline-block;margin-bottom:-1px}.ce-inline-tool-input{outline:none;border:0;border-radius:0 0 4px 4px;margin:0;font-size:13px;padding:10px;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;display:none;font-weight:500;border-top:1px solid rgba(201,201,204,.48);-webkit-appearance:none;font-family:inherit}@media (max-width: 650px){.ce-inline-tool-input{font-size:15px;font-weight:500}}.ce-inline-tool-input::-webkit-input-placeholder{color:#707684}.ce-inline-tool-input::-moz-placeholder{color:#707684}.ce-inline-tool-input:-ms-input-placeholder{color:#707684}.ce-inline-tool-input::-ms-input-placeholder{color:#707684}.ce-inline-tool-input::placeholder{color:#707684}.ce-inline-tool-input--showed{display:block}.ce-conversion-toolbar{position:absolute;background-color:#fff;border:1px solid #E8E8EB;-webkit-box-shadow:0 3px 15px -3px rgba(13,20,33,.13);box-shadow:0 3px 15px -3px #0d142121;border-radius:6px;z-index:2;opacity:0;visibility:hidden;will-change:transform,opacity;-webkit-transition:opacity .1s ease,-webkit-transform .1s ease;transition:opacity .1s ease,-webkit-transform .1s ease;transition:transform .1s ease,opacity .1s ease;transition:transform .1s ease,opacity .1s ease,-webkit-transform .1s ease;-webkit-transform:translateY(-8px);transform:translateY(-8px);left:-1px;width:150px;margin-top:5px;-webkit-box-sizing:content-box;box-sizing:content-box}.ce-conversion-toolbar--left-oriented:before{left:15px;margin-left:0}.ce-conversion-toolbar--right-oriented:before{left:auto;right:15px;margin-left:0}.ce-conversion-toolbar--showed{opacity:1;visibility:visible;-webkit-transform:none;transform:none}.ce-conversion-toolbar [hidden]{display:none!important}.ce-conversion-toolbar__buttons{display:-webkit-box;display:-ms-flexbox;display:flex}.ce-conversion-toolbar__label{color:#707684;font-size:11px;font-weight:500;letter-spacing:.33px;padding:10px 10px 5px;text-transform:uppercase}.ce-conversion-tool{display:-webkit-box;display:-ms-flexbox;display:flex;padding:5px 10px;font-size:14px;line-height:20px;font-weight:500;cursor:pointer;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.ce-conversion-tool--hidden{display:none}.ce-conversion-tool--focused{background:rgba(34,186,255,.08)!important}.ce-conversion-tool--focused{-webkit-box-shadow:inset 0 0 0px 1px rgba(7,161,227,.08);box-shadow:inset 0 0 0 1px #07a1e314}.ce-conversion-tool--focused-animated{-webkit-animation-name:buttonClicked;animation-name:buttonClicked;-webkit-animation-duration:.25s;animation-duration:.25s}.ce-conversion-tool:hover{background:#eff2f5}.ce-conversion-tool__icon{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;width:26px;height:26px;-webkit-box-shadow:0 0 0 1px rgba(201,201,204,.48);box-shadow:0 0 0 1px #c9c9cc7a;border-radius:5px;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;background:#fff;-webkit-box-sizing:content-box;box-sizing:content-box;-ms-flex-negative:0;flex-shrink:0;margin-right:10px}.ce-conversion-tool__icon svg{width:20px;height:20px}@media (max-width: 650px){.ce-conversion-tool__icon{width:36px;height:36px;border-radius:8px}.ce-conversion-tool__icon svg{width:28px;height:28px}}.ce-conversion-tool--last{margin-right:0!important}.ce-conversion-tool--active{color:#388ae5!important}.ce-conversion-tool--active{-webkit-animation:bounceIn .75s 1;animation:bounceIn .75s 1;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.ce-settings__button{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding:6px 1px;border-radius:3px;cursor:pointer;border:0;outline:none;background-color:transparent;vertical-align:bottom;color:inherit;margin:0;line-height:32px}.ce-settings__button svg{width:20px;height:20px}@media (max-width: 650px){.ce-settings__button svg{width:28px;height:28px}}@media (hover: hover){.ce-settings__button:hover{background-color:#eff2f5}}.ce-settings__button--active{color:#388ae5}.ce-settings__button--focused{background:rgba(34,186,255,.08)!important}.ce-settings__button--focused{-webkit-box-shadow:inset 0 0 0px 1px rgba(7,161,227,.08);box-shadow:inset 0 0 0 1px #07a1e314}.ce-settings__button--focused-animated{-webkit-animation-name:buttonClicked;animation-name:buttonClicked;-webkit-animation-duration:.25s;animation-duration:.25s}.ce-settings__button:not(:nth-child(3n+3)){margin-right:3px}.ce-settings__button:nth-child(n+4){margin-top:3px}.ce-settings__button--disabled{cursor:not-allowed!important}.ce-settings__button--disabled{opacity:.3}.ce-settings__button--selected{color:#388ae5}@media (min-width: 651px){.codex-editor--narrow .ce-settings .ce-popover{right:0;left:auto;left:initial}}@-webkit-keyframes fade-in{0%{opacity:0}to{opacity:1}}@keyframes fade-in{0%{opacity:0}to{opacity:1}}.ce-block{-webkit-animation:fade-in .3s ease;animation:fade-in .3s ease;-webkit-animation-fill-mode:none;animation-fill-mode:none;-webkit-animation-fill-mode:initial;animation-fill-mode:initial}.ce-block:first-of-type{margin-top:0}.ce-block--selected .ce-block__content{background:#e1f2ff}.ce-block--selected .ce-block__content [contenteditable]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ce-block--selected .ce-block__content img,.ce-block--selected .ce-block__content .ce-stub{opacity:.55}.ce-block--stretched .ce-block__content{max-width:none}.ce-block__content{position:relative;max-width:650px;margin:0 auto;-webkit-transition:background-color .15s ease;transition:background-color .15s ease}.ce-block--drop-target .ce-block__content:before{content:"";position:absolute;top:100%;left:-20px;margin-top:-1px;height:8px;width:8px;border:solid #388AE5;border-width:1px 1px 0 0;-webkit-transform-origin:right;transform-origin:right;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.ce-block--drop-target .ce-block__content:after{content:"";position:absolute;top:100%;height:1px;width:100%;color:#388ae5;background:repeating-linear-gradient(90deg,#388AE5,#388AE5 1px,#fff 1px,#fff 6px)}.ce-block a{cursor:pointer;-webkit-text-decoration:underline;text-decoration:underline}.ce-block b{font-weight:700}.ce-block i{font-style:italic}@media (min-width: 651px){.codex-editor--narrow .ce-block--focused{margin-right:-50px;padding-right:50px}}@-webkit-keyframes bounceIn{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}20%{-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}60%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes bounceIn{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}20%{-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}60%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@-webkit-keyframes selectionBounce{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}50%{-webkit-transform:scale3d(1.01,1.01,1.01);transform:scale3d(1.01,1.01,1.01)}70%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes selectionBounce{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}50%{-webkit-transform:scale3d(1.01,1.01,1.01);transform:scale3d(1.01,1.01,1.01)}70%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@-webkit-keyframes buttonClicked{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.95,.95,.95);transform:scale3d(.95,.95,.95)}60%{-webkit-transform:scale3d(1.02,1.02,1.02);transform:scale3d(1.02,1.02,1.02)}80%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}@keyframes buttonClicked{0%,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{-webkit-transform:scale3d(.95,.95,.95);transform:scale3d(.95,.95,.95)}60%{-webkit-transform:scale3d(1.02,1.02,1.02);transform:scale3d(1.02,1.02,1.02)}80%{-webkit-transform:scale3d(1,1,1);transform:scaleZ(1)}}.cdx-block{padding:.4em 0}.cdx-block::-webkit-input-placeholder{line-height:normal!important}.cdx-input{border:1px solid rgba(201,201,204,.48);-webkit-box-shadow:inset 0 1px 2px 0 rgba(35,44,72,.06);box-shadow:inset 0 1px 2px #232c480f;border-radius:3px;padding:10px 12px;outline:none;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box}.cdx-input[data-placeholder]:before{position:static!important}.cdx-input[data-placeholder]:before{display:inline-block;width:0;white-space:nowrap;pointer-events:none}.cdx-settings-button{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding:6px 1px;border-radius:3px;cursor:pointer;border:0;outline:none;background-color:transparent;vertical-align:bottom;color:inherit;margin:0;min-width:26px;min-height:26px}.cdx-settings-button svg{width:20px;height:20px}@media (max-width: 650px){.cdx-settings-button svg{width:28px;height:28px}}@media (hover: hover){.cdx-settings-button:hover{background-color:#eff2f5}}.cdx-settings-button--focused{background:rgba(34,186,255,.08)!important}.cdx-settings-button--focused{-webkit-box-shadow:inset 0 0 0px 1px rgba(7,161,227,.08);box-shadow:inset 0 0 0 1px #07a1e314}.cdx-settings-button--focused-animated{-webkit-animation-name:buttonClicked;animation-name:buttonClicked;-webkit-animation-duration:.25s;animation-duration:.25s}.cdx-settings-button--active{color:#388ae5}.cdx-settings-button svg{width:auto;height:auto}@media (max-width: 650px){.cdx-settings-button{width:36px;height:36px;border-radius:8px}}.cdx-loader{position:relative;border:1px solid rgba(201,201,204,.48)}.cdx-loader:before{content:"";position:absolute;left:50%;top:50%;width:18px;height:18px;margin:-11px 0 0 -11px;border:2px solid rgba(201,201,204,.48);border-left-color:#388ae5;border-radius:50%;-webkit-animation:cdxRotation 1.2s infinite linear;animation:cdxRotation 1.2s infinite linear}@-webkit-keyframes cdxRotation{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes cdxRotation{0%{-webkit-transform:rotate(0deg);transform:rotate(0)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.cdx-button{padding:13px;border-radius:3px;border:1px solid rgba(201,201,204,.48);font-size:14.9px;background:#fff;-webkit-box-shadow:0 2px 2px 0 rgba(18,30,57,.04);box-shadow:0 2px 2px #121e390a;color:#707684;text-align:center;cursor:pointer}@media (hover: hover){.cdx-button:hover{background:#FBFCFE;-webkit-box-shadow:0 1px 3px 0 rgba(18,30,57,.08);box-shadow:0 1px 3px #121e3914}}.cdx-button svg{height:20px;margin-right:.2em;margin-top:-2px}.ce-stub{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;width:100%;padding:3.5em 0;margin:17px 0;border-radius:3px;background:#fcf7f7;color:#b46262}.ce-stub__info{margin-left:20px}.ce-stub__title{margin-bottom:3px;font-weight:600;font-size:18px;text-transform:capitalize}.ce-stub__subtitle{font-size:16px}.codex-editor.codex-editor--rtl{direction:rtl}.codex-editor.codex-editor--rtl .cdx-list{padding-left:0;padding-right:40px}.codex-editor.codex-editor--rtl .ce-toolbar__plus{right:-26px;left:auto}.codex-editor.codex-editor--rtl .ce-toolbar__actions{right:auto;left:-26px}@media (max-width: 650px){.codex-editor.codex-editor--rtl .ce-toolbar__actions{margin-left:0;margin-right:auto;padding-right:0;padding-left:10px}}.codex-editor.codex-editor--rtl .ce-settings{left:5px;right:auto}.codex-editor.codex-editor--rtl .ce-settings:before{right:auto;left:25px}.codex-editor.codex-editor--rtl .ce-settings__button:not(:nth-child(3n+3)){margin-left:3px;margin-right:0}.codex-editor.codex-editor--rtl .ce-conversion-tool__icon{margin-right:0;margin-left:10px}.codex-editor.codex-editor--rtl .ce-inline-toolbar__dropdown{border-right:0px solid transparent;border-left:1px solid rgba(201,201,204,.48);margin:0 -6px 0 6px}.codex-editor.codex-editor--rtl .ce-inline-toolbar__dropdown .icon--toggler-down{margin-left:0;margin-right:4px}@media (min-width: 651px){.codex-editor--narrow.codex-editor--rtl .ce-toolbar__plus{left:0px;right:5px}}@media (min-width: 651px){.codex-editor--narrow.codex-editor--rtl .ce-toolbar__actions{left:-5px}}.cdx-search-field{--icon-margin-right: 10px;background:rgba(232,232,235,.49);border:1px solid rgba(226,226,229,.2);border-radius:6px;padding:2px;display:grid;grid-template-columns:auto auto 1fr;grid-template-rows:auto}.cdx-search-field__icon{width:26px;height:26px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin-right:var(--icon-margin-right)}.cdx-search-field__icon svg{width:20px;height:20px;color:#707684}.cdx-search-field__input{font-size:14px;outline:none;font-weight:500;font-family:inherit;border:0;background:transparent;margin:0;padding:0;line-height:22px;min-width:calc(100% - 26px - var(--icon-margin-right))}.cdx-search-field__input::-webkit-input-placeholder{color:#707684;font-weight:500}.cdx-search-field__input::-moz-placeholder{color:#707684;font-weight:500}.cdx-search-field__input:-ms-input-placeholder{color:#707684;font-weight:500}.cdx-search-field__input::-ms-input-placeholder{color:#707684;font-weight:500}.cdx-search-field__input::placeholder{color:#707684;font-weight:500}.ce-popover{--border-radius: 6px;--width: 200px;--max-height: 270px;--padding: 6px;--offset-from-target: 8px;--color-border: #e8e8eb;--color-shadow: rgba(13,20,33,.13);--color-background: white;--color-text-primary: black;--color-text-secondary: #707684;--color-border-icon: rgba(201, 201, 204, .48);--color-border-icon-disabled: #EFF0F1;--color-text-icon-active: #388AE5;--color-background-icon-active: rgba(56, 138, 229, .1);--color-background-item-focus: rgba(34, 186, 255, .08);--color-shadow-item-focus: rgba(7, 161, 227, .08);--color-background-item-hover: #eff2f5;--color-background-item-confirm: #E24A4A;--color-background-item-confirm-hover: #CE4343;min-width:var(--width);width:var(--width);max-height:var(--max-height);border-radius:var(--border-radius);overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:0 3px 15px -3px var(--color-shadow);box-shadow:0 3px 15px -3px var(--color-shadow);position:absolute;left:0;top:calc(100% + var(--offset-from-target));background:var(--color-background);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;z-index:4;opacity:0;max-height:0;pointer-events:none;padding:0;border:none}.ce-popover--opened{opacity:1;padding:var(--padding);max-height:var(--max-height);pointer-events:auto;-webkit-animation:panelShowing .1s ease;animation:panelShowing .1s ease;border:1px solid var(--color-border)}@media (max-width: 650px){.ce-popover--opened{-webkit-animation:panelShowingMobile .25s ease;animation:panelShowingMobile .25s ease}}.ce-popover__items{overflow-y:auto;-ms-scroll-chaining:none;overscroll-behavior:contain}@media (max-width: 650px){.ce-popover__overlay{position:fixed;top:0;bottom:0;left:0;right:0;background:#1D202B;z-index:3;opacity:.5;-webkit-transition:opacity .12s ease-in;transition:opacity .12s ease-in;will-change:opacity;visibility:visible}}.ce-popover__overlay--hidden{display:none}.ce-popover--open-top{top:calc(-1 * (var(--offset-from-target) + var(--popover-height)))}@media (max-width: 650px){.ce-popover{--offset: 5px;position:fixed;max-width:none;min-width:calc(100% - var(--offset) * 2);left:var(--offset);right:var(--offset);bottom:calc(var(--offset) + env(safe-area-inset-bottom));top:auto;border-radius:10px}.ce-popover .ce-popover__search{display:none}}.ce-popover__search,.ce-popover__custom-content:not(:empty){margin-bottom:5px}.ce-popover__nothing-found-message{color:#707684;display:none;cursor:default;padding:3px;font-size:14px;line-height:20px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ce-popover__nothing-found-message--displayed{display:block}.ce-popover__custom-content:not(:empty){padding:4px}@media (min-width: 651px){.ce-popover__custom-content:not(:empty){padding:0}}.ce-popover__custom-content--hidden{display:none}.ce-popover-item{--border-radius: 6px;--icon-size: 20px;--icon-size-mobile: 28px;border-radius:var(--border-radius);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;padding:3px;color:var(--color-text-primary);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}@media (max-width: 650px){.ce-popover-item{padding:4px}}.ce-popover-item:not(:last-of-type){margin-bottom:1px}.ce-popover-item__icon{border-radius:5px;width:26px;height:26px;-webkit-box-shadow:0 0 0 1px var(--color-border-icon);box-shadow:0 0 0 1px var(--color-border-icon);background:#fff;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin-right:10px}.ce-popover-item__icon svg{width:20px;height:20px}@media (max-width: 650px){.ce-popover-item__icon{width:36px;height:36px;border-radius:8px}.ce-popover-item__icon svg{width:var(--icon-size-mobile);height:var(--icon-size-mobile)}}.ce-popover-item__title{font-size:14px;line-height:20px;font-weight:500;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}@media (max-width: 650px){.ce-popover-item__title{font-size:16px}}.ce-popover-item__secondary-title{color:var(--color-text-secondary);font-size:12px;margin-left:auto;white-space:nowrap;letter-spacing:-.1em;padding-right:5px;margin-bottom:-2px;opacity:.6}@media (max-width: 650px){.ce-popover-item__secondary-title{display:none}}.ce-popover-item--active{background:var(--color-background-icon-active);color:var(--color-text-icon-active)}.ce-popover-item--active .ce-popover-item__icon{-webkit-box-shadow:none;box-shadow:none}.ce-popover-item--disabled{color:var(--color-text-secondary);cursor:default;pointer-events:none}.ce-popover-item--disabled .ce-popover-item__icon{-webkit-box-shadow:0 0 0 1px var(--color-border-icon-disabled);box-shadow:0 0 0 1px var(--color-border-icon-disabled)}.ce-popover-item--focused:not(.ce-popover-item--no-focus){background:var(--color-background-item-focus)!important}.ce-popover-item--focused:not(.ce-popover-item--no-focus){-webkit-box-shadow:inset 0 0 0px 1px var(--color-shadow-item-focus);box-shadow:inset 0 0 0 1px var(--color-shadow-item-focus)}.ce-popover-item--hidden{display:none}@media (hover: hover){.ce-popover-item:hover{cursor:pointer}.ce-popover-item:hover:not(.ce-popover-item--no-hover){background-color:var(--color-background-item-hover)}.ce-popover-item:hover .ce-popover-item__icon{-webkit-box-shadow:none;box-shadow:none}}.ce-popover-item--confirmation{background:var(--color-background-item-confirm)}.ce-popover-item--confirmation .ce-popover-item__icon{color:var(--color-background-item-confirm)}.ce-popover-item--confirmation .ce-popover-item__title{color:#fff}@media (hover: hover){.ce-popover-item--confirmation:not(.ce-popover-item--no-hover):hover{background:var(--color-background-item-confirm-hover)}}.ce-popover-item--confirmation:not(.ce-popover-item--no-focus).ce-popover-item--focused{background:var(--color-background-item-confirm-hover)!important}.ce-popover-item--confirmation .ce-popover-item__icon,.ce-popover-item--active .ce-popover-item__icon,.ce-popover-item--focused .ce-popover-item__icon{-webkit-box-shadow:none;box-shadow:none}@-webkit-keyframes panelShowing{0%{opacity:0;-webkit-transform:translateY(-8px) scale(.9);transform:translateY(-8px) scale(.9)}70%{opacity:1;-webkit-transform:translateY(2px);transform:translateY(2px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes panelShowing{0%{opacity:0;-webkit-transform:translateY(-8px) scale(.9);transform:translateY(-8px) scale(.9)}70%{opacity:1;-webkit-transform:translateY(2px);transform:translateY(2px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes panelShowingMobile{0%{opacity:0;-webkit-transform:translateY(14px) scale(.98);transform:translateY(14px) scale(.98)}70%{opacity:1;-webkit-transform:translateY(-4px);transform:translateY(-4px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes panelShowingMobile{0%{opacity:0;-webkit-transform:translateY(14px) scale(.98);transform:translateY(14px) scale(.98)}70%{opacity:1;-webkit-transform:translateY(-4px);transform:translateY(-4px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}.wobble{-webkit-animation-name:wobble;animation-name:wobble;-webkit-animation-duration:.4s;animation-duration:.4s}@-webkit-keyframes wobble{0%{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}15%{-webkit-transform:translate3d(-9%,0,0);transform:translate3d(-9%,0,0)}30%{-webkit-transform:translate3d(9%,0,0);transform:translate3d(9%,0,0)}45%{-webkit-transform:translate3d(-4%,0,0);transform:translate3d(-4%,0,0)}60%{-webkit-transform:translate3d(4%,0,0);transform:translate3d(4%,0,0)}75%{-webkit-transform:translate3d(-1%,0,0);transform:translate3d(-1%,0,0)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}@keyframes wobble{0%{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}15%{-webkit-transform:translate3d(-9%,0,0);transform:translate3d(-9%,0,0)}30%{-webkit-transform:translate3d(9%,0,0);transform:translate3d(9%,0,0)}45%{-webkit-transform:translate3d(-4%,0,0);transform:translate3d(-4%,0,0)}60%{-webkit-transform:translate3d(4%,0,0);transform:translate3d(4%,0,0)}75%{-webkit-transform:translate3d(-1%,0,0);transform:translate3d(-1%,0,0)}to{-webkit-transform:translate3d(0,0,0);transform:translateZ(0)}}
`;
class gd extends V {
  constructor() {
    super(...arguments), this.isMobile = !1, this.contentRectCache = void 0, this.resizeDebouncer = zl(() => {
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
    const t = this.nodes.wrapper.querySelector(`.${ot.CSS.content}`);
    return t ? (this.contentRectCache = t.getBoundingClientRect(), this.contentRectCache) : {
      width: 650,
      left: 0,
      right: 0
    };
  }
  /**
   * Adds loader to editor while content is not ready
   */
  addLoader() {
    this.nodes.loader = g.make("div", this.CSS.editorLoader), this.nodes.wrapper.prepend(this.nodes.loader), this.nodes.redactor.classList.add(this.CSS.editorZoneHidden);
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
  toggleReadOnly(t) {
    t ? this.disableModuleBindings() : this.enableModuleBindings();
  }
  /**
   * Check if Editor is empty and set CSS class to wrapper
   */
  checkEmptiness() {
    const { BlockManager: t } = this.Editor;
    this.nodes.wrapper.classList.toggle(this.CSS.editorEmpty, t.isEditorEmpty);
  }
  /**
   * Check if one of Toolbar is opened
   * Used to prevent global keydowns (for example, Enter) conflicts with Enter-on-toolbar
   *
   * @returns {boolean}
   */
  get someToolbarOpened() {
    const { Toolbar: t, BlockSettings: e, InlineToolbar: o, ConversionToolbar: i } = this.Editor;
    return e.opened || o.opened || i.opened || t.toolbox.opened;
  }
  /**
   * Check for some Flipper-buttons is under focus
   */
  get someFlipperButtonFocused() {
    return this.Editor.Toolbar.toolbox.hasFocus() ? !0 : Object.entries(this.Editor).filter(([t, e]) => e.flipper instanceof Ht).some(([t, e]) => e.flipper.hasFocus());
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
    const { Toolbar: t, BlockSettings: e, InlineToolbar: o, ConversionToolbar: i } = this.Editor;
    e.close(), o.close(), i.close(), t.toolbox.close();
  }
  /**
   * Check for mobile mode and cache a result
   */
  checkIsMobile() {
    this.isMobile = window.innerWidth < Cr;
  }
  /**
   * Makes Editor.js interface
   */
  make() {
    this.nodes.holder = g.getHolder(this.config.holder), this.nodes.wrapper = g.make("div", [
      this.CSS.editorWrapper,
      ...this.isRtl ? [this.CSS.editorRtlFix] : []
    ]), this.nodes.redactor = g.make("div", this.CSS.editorZone), this.nodes.holder.offsetWidth < this.contentRect.width && this.nodes.wrapper.classList.add(this.CSS.editorWrapperNarrow), this.nodes.redactor.style.paddingBottom = this.config.minHeight + "px", this.nodes.wrapper.appendChild(this.nodes.redactor), this.nodes.holder.appendChild(this.nodes.wrapper);
  }
  /**
   * Appends CSS
   */
  loadStyles() {
    const t = "editor-js-styles";
    if (g.get(t))
      return;
    const e = g.make("style", null, {
      id: t,
      textContent: fd.toString()
    });
    g.prepend(document.head, e);
  }
  /**
   * Bind events on the Editor.js interface
   */
  enableModuleBindings() {
    this.readOnlyMutableListeners.on(this.nodes.redactor, "click", (t) => {
      this.redactorClicked(t);
    }, !1), this.readOnlyMutableListeners.on(this.nodes.redactor, "mousedown", (t) => {
      this.documentTouched(t);
    }, !0), this.readOnlyMutableListeners.on(this.nodes.redactor, "touchstart", (t) => {
      this.documentTouched(t);
    }, !0), this.readOnlyMutableListeners.on(document, "keydown", (t) => {
      this.documentKeydown(t);
    }, !0), this.readOnlyMutableListeners.on(document, "mousedown", (t) => {
      this.documentClicked(t);
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
    let t;
    this.readOnlyMutableListeners.on(this.nodes.redactor, "mousemove", cn((e) => {
      const o = e.target.closest(".ce-block");
      this.Editor.BlockSelection.anyBlockSelected || o && t !== o && (t = o, this.eventsDispatcher.emit(Pr, {
        block: this.Editor.BlockManager.getBlockByChildNode(o)
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
  documentKeydown(t) {
    switch (t.keyCode) {
      case H.ENTER:
        this.enterPressed(t);
        break;
      case H.BACKSPACE:
        this.backspacePressed(t);
        break;
      case H.ESC:
        this.escapePressed(t);
        break;
      default:
        this.defaultBehaviour(t);
        break;
    }
  }
  /**
   * Ignore all other document's keydown events
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  defaultBehaviour(t) {
    const { currentBlock: e } = this.Editor.BlockManager, o = t.target.closest(`.${this.CSS.editorWrapper}`), i = t.altKey || t.ctrlKey || t.metaKey || t.shiftKey;
    if (e !== void 0 && o === null) {
      this.Editor.BlockEvents.keydown(t);
      return;
    }
    o || e && i || (this.Editor.BlockManager.dropPointer(), this.Editor.Toolbar.close());
  }
  /**
   * @param {KeyboardEvent} event - keyboard event
   */
  backspacePressed(t) {
    const { BlockManager: e, BlockSelection: o, Caret: i } = this.Editor;
    if (o.anyBlockSelected && !N.isSelectionExists) {
      const r = e.removeSelectedBlocks();
      i.setToBlock(e.insertDefaultBlockAtIndex(r, !0), i.positions.START), o.clearSelection(t), t.preventDefault(), t.stopPropagation(), t.stopImmediatePropagation();
    }
  }
  /**
   * Escape pressed
   * If some of Toolbar components are opened, then close it otherwise close Toolbar
   *
   * @param {Event} event - escape keydown event
   */
  escapePressed(t) {
    this.Editor.BlockSelection.clearSelection(t), this.Editor.Toolbar.toolbox.opened ? (this.Editor.Toolbar.toolbox.close(), this.Editor.Caret.setToBlock(this.Editor.BlockManager.currentBlock)) : this.Editor.BlockSettings.opened ? this.Editor.BlockSettings.close() : this.Editor.ConversionToolbar.opened ? this.Editor.ConversionToolbar.close() : this.Editor.InlineToolbar.opened ? this.Editor.InlineToolbar.close() : this.Editor.Toolbar.close();
  }
  /**
   * Enter pressed on document
   *
   * @param {KeyboardEvent} event - keyboard event
   */
  enterPressed(t) {
    const { BlockManager: e, BlockSelection: o } = this.Editor, i = e.currentBlockIndex >= 0;
    if (o.anyBlockSelected && !N.isSelectionExists) {
      o.clearSelection(t), t.preventDefault(), t.stopImmediatePropagation(), t.stopPropagation();
      return;
    }
    if (!this.someToolbarOpened && i && t.target.tagName === "BODY") {
      const r = this.Editor.BlockManager.insert();
      this.Editor.Caret.setToBlock(r), this.Editor.BlockManager.highlightCurrentNode(), this.Editor.Toolbar.moveAndOpen(r);
    }
    this.Editor.BlockSelection.clearSelection(t);
  }
  /**
   * All clicks on document
   *
   * @param {MouseEvent} event - Click event
   */
  documentClicked(t) {
    if (!t.isTrusted)
      return;
    const e = t.target;
    this.nodes.holder.contains(e) || N.isAtEditor || (this.Editor.BlockManager.dropPointer(), this.Editor.Toolbar.close());
    const o = this.Editor.BlockSettings.nodes.wrapper.contains(e), i = this.Editor.Toolbar.nodes.settingsToggler.contains(e), r = o || i;
    if (this.Editor.BlockSettings.opened && !r) {
      this.Editor.BlockSettings.close();
      const s = this.Editor.BlockManager.getBlockByChildNode(e);
      this.Editor.Toolbar.moveAndOpen(s);
    }
    this.Editor.BlockSelection.clearSelection(t);
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
  documentTouched(t) {
    let e = t.target;
    if (e === this.nodes.redactor) {
      const o = t instanceof MouseEvent ? t.clientX : t.touches[0].clientX, i = t instanceof MouseEvent ? t.clientY : t.touches[0].clientY;
      e = document.elementFromPoint(o, i);
    }
    try {
      this.Editor.BlockManager.setCurrentBlockByChildNode(e), this.Editor.BlockManager.highlightCurrentNode();
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
  redactorClicked(t) {
    const { BlockSelection: e } = this.Editor;
    if (!N.isCollapsed)
      return;
    const o = () => {
      t.stopImmediatePropagation(), t.stopPropagation();
    }, i = t.target, r = t.metaKey || t.ctrlKey;
    if (g.isAnchor(i) && r) {
      o();
      const c = i.getAttribute("href"), h = Vl(c);
      Wl(h);
      return;
    }
    const s = this.Editor.BlockManager.getBlockByIndex(-1), a = g.offset(s.holder).bottom, l = t.pageY;
    if (t.target instanceof Element && t.target.isEqualNode(this.nodes.redactor) && /**
    * If there is cross block selection started, target will be equal to redactor so we need additional check
    */
    !e.anyBlockSelected && /**
    * Prevent caret jumping (to last block) when clicking between blocks
    */
    a < l) {
      o();
      const { BlockManager: c, Caret: h, Toolbar: d } = this.Editor;
      (!c.lastBlock.tool.isDefault || !c.lastBlock.isEmpty) && c.insertAtEnd(), h.setToTheLastBlock(), d.moveAndOpen(c.lastBlock);
    }
  }
  /**
   * Handle selection changes on mobile devices
   * Uses for showing the Inline Toolbar
   */
  selectionChanged() {
    const { CrossBlockSelection: t, BlockSelection: e } = this.Editor, o = N.anchorElement;
    if (t.isCrossBlockSelectionStarted && e.anyBlockSelected && N.get().removeAllRanges(), !o) {
      N.range || this.Editor.InlineToolbar.close();
      return;
    }
    const i = o.closest(`.${ot.CSS.content}`) === null;
    if (i && (this.Editor.InlineToolbar.containsNode(o) || this.Editor.InlineToolbar.close(), o.dataset.inlineToolbar !== "true"))
      return;
    this.Editor.BlockManager.currentBlock || this.Editor.BlockManager.setCurrentBlockByChildNode(o);
    const r = i !== !0;
    this.Editor.InlineToolbar.tryToShow(!0, r);
  }
}
const md = {
  // API Modules
  BlocksAPI: tc,
  CaretAPI: ec,
  EventsAPI: oc,
  I18nAPI: Ln,
  API: nc,
  InlineToolbarAPI: ic,
  ListenersAPI: rc,
  NotifierAPI: cc,
  ReadOnlyAPI: dc,
  SanitizerAPI: bc,
  SaverAPI: vc,
  SelectionAPI: wc,
  StylesAPI: kc,
  ToolbarAPI: yc,
  TooltipAPI: Sc,
  UiAPI: Cc,
  // Toolbar Modules
  BlockSettings: Hc,
  ConversionToolbar: kt,
  Toolbar: $c,
  InlineToolbar: Wc,
  // Modules
  BlockEvents: Xc,
  BlockManager: Zc,
  BlockSelection: qc,
  Caret: Mo,
  CrossBlockSelection: Jc,
  DragNDrop: Qc,
  ModificationsObserver: td,
  Paste: Ur,
  ReadOnly: ed,
  RectangleSelection: We,
  Renderer: od,
  Saver: nd,
  Tools: Xr,
  UI: gd
};
class bd {
  /**
   * @param {EditorConfig} config - user configuration
   */
  constructor(t) {
    this.moduleInstances = {}, this.eventsDispatcher = new Po();
    let e, o;
    this.isReady = new Promise((i, r) => {
      e = i, o = r;
    }), Promise.resolve().then(async () => {
      this.configuration = t, await this.validate(), await this.init(), await this.start(), St("I'm ready! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", "log", "", "color: #E24A75"), setTimeout(async () => {
        if (await this.render(), this.configuration.autofocus) {
          const { BlockManager: i, Caret: r } = this.moduleInstances;
          r.setToBlock(i.blocks[0], r.positions.START), i.highlightCurrentNode();
        }
        this.moduleInstances.UI.removeLoader(), e();
      }, 500);
    }).catch((i) => {
      z(`Editor.js is not ready because of ${i}`, "error"), o(i);
    });
  }
  /**
   * Setting for configuration
   *
   * @param {EditorConfig|string} config - Editor's config to set
   */
  set configuration(t) {
    var e, o;
    st(t) ? this.config = {
      ...t
    } : this.config = {
      holder: t
    }, hn(!!this.config.holderId, "config.holderId", "config.holder"), this.config.holderId && !this.config.holder && (this.config.holder = this.config.holderId, this.config.holderId = null), this.config.holder == null && (this.config.holder = "editorjs"), this.config.logLevel || (this.config.logLevel = kr.VERBOSE), Fl(this.config.logLevel), hn(!!this.config.initialBlock, "config.initialBlock", "config.defaultBlock"), this.config.defaultBlock = this.config.defaultBlock || this.config.initialBlock || "paragraph", this.config.minHeight = this.config.minHeight !== void 0 ? this.config.minHeight : 300;
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
    }), this.config.inlineToolbar = this.config.inlineToolbar !== void 0 ? this.config.inlineToolbar : !0, (_t(this.config.data) || !this.config.data.blocks || this.config.data.blocks.length === 0) && (this.config.data = { blocks: [i] }), this.config.readOnly = this.config.readOnly || !1, (e = this.config.i18n) != null && e.messages && pt.setDictionary(this.config.i18n.messages), this.config.i18n.direction = ((o = this.config.i18n) == null ? void 0 : o.direction) || "ltr";
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
    const { holderId: t, holder: e } = this.config;
    if (t && e)
      throw Error("«holderId» and «holder» param can't assign at the same time.");
    if (Gt(e) && !g.get(e))
      throw Error(`element with ID «${e}» is missing. Pass correct holder's ID.`);
    if (e && st(e) && !g.isElement(e))
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
      (t, e) => t.then(async () => {
        try {
          await this.moduleInstances[e].prepare();
        } catch (o) {
          if (o instanceof Br)
            throw new Error(o.message);
          z(`Module ${e} was skipped because of %o`, "warn", o);
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
    Object.entries(md).forEach(([t, e]) => {
      try {
        this.moduleInstances[t] = new e({
          config: this.configuration,
          eventsDispatcher: this.eventsDispatcher
        });
      } catch (o) {
        z("[constructModules]", `Module ${t} skipped because`, "error", o);
      }
    });
  }
  /**
   * Modules instances configuration:
   *  - pass other modules to the 'state' property
   *  - ...
   */
  configureModules() {
    for (const t in this.moduleInstances)
      Object.prototype.hasOwnProperty.call(this.moduleInstances, t) && (this.moduleInstances[t].state = this.getModulesDiff(t));
  }
  /**
   * Return modules without passed name
   *
   * @param {string} name - module for witch modules difference should be calculated
   */
  getModulesDiff(t) {
    const e = {};
    for (const o in this.moduleInstances)
      o !== t && (e[o] = this.moduleInstances[o]);
    return e;
  }
}
/**
 * Editor.js
 *
 * @license Apache-2.0
 * @see Editor.js <https://editorjs.io>
 * @author CodeX Team <https://codex.so>
 */
class vd {
  /** Editor version */
  static get version() {
    return "2.27.1";
  }
  /**
   * @param {EditorConfig|string|undefined} [configuration] - user configuration
   */
  constructor(t) {
    let e = () => {
    };
    st(t) && G(t.onReady) && (e = t.onReady);
    const o = new bd(t);
    this.isReady = o.isReady.then(() => {
      this.exportAPI(o), e();
    });
  }
  /**
   * Export external API methods
   *
   * @param {Core} editor — Editor's instance
   */
  exportAPI(t) {
    const e = ["configuration"], o = () => {
      Object.values(t.moduleInstances).forEach((i) => {
        G(i.destroy) && i.destroy(), i.listeners.removeAll();
      }), t = null;
      for (const i in this)
        Object.prototype.hasOwnProperty.call(this, i) && delete this[i];
      Object.setPrototypeOf(this, null);
    };
    e.forEach((i) => {
      this[i] = t[i];
    }), this.destroy = o, Object.setPrototypeOf(this, t.moduleInstances.API.methods), delete this.exportAPI, Object.entries({
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
        this[a] = t.moduleInstances.API.methods[i][s];
      });
    });
  }
}
var Kr = { exports: {} };
(function(n, t) {
  (function(e, o) {
    n.exports = o();
  })(window, function() {
    return function(e) {
      var o = {};
      function i(r) {
        if (o[r])
          return o[r].exports;
        var s = o[r] = { i: r, l: !1, exports: {} };
        return e[r].call(s.exports, s, s.exports, i), s.l = !0, s.exports;
      }
      return i.m = e, i.c = o, i.d = function(r, s, a) {
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
    }([function(e, o, i) {
      var r = i(1);
      typeof r == "string" && (r = [[e.i, r, ""]]);
      var s = { hmr: !0, transform: void 0, insertInto: void 0 };
      i(3)(r, s), r.locals && (e.exports = r.locals);
    }, function(e, o, i) {
      (e.exports = i(2)(!1)).push([e.i, `/**
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
    }, function(e, o) {
      e.exports = function(i) {
        var r = [];
        return r.toString = function() {
          return this.map(function(s) {
            var a = function(l, c) {
              var h = l[1] || "", d = l[3];
              if (!d)
                return h;
              if (c && typeof btoa == "function") {
                var u = (p = d, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(p)))) + " */"), f = d.sources.map(function(b) {
                  return "/*# sourceURL=" + d.sourceRoot + b + " */";
                });
                return [h].concat(f).concat([u]).join(`
`);
              }
              var p;
              return [h].join(`
`);
            }(s, i);
            return s[2] ? "@media " + s[2] + "{" + a + "}" : a;
          }).join("");
        }, r.i = function(s, a) {
          typeof s == "string" && (s = [[null, s, ""]]);
          for (var l = {}, c = 0; c < this.length; c++) {
            var h = this[c][0];
            typeof h == "number" && (l[h] = !0);
          }
          for (c = 0; c < s.length; c++) {
            var d = s[c];
            typeof d[0] == "number" && l[d[0]] || (a && !d[2] ? d[2] = a : a && (d[2] = "(" + d[2] + ") and (" + a + ")"), r.push(d));
          }
        }, r;
      };
    }, function(e, o, i) {
      var r, s, a = {}, l = (r = function() {
        return window && document && document.all && !window.atob;
      }, function() {
        return s === void 0 && (s = r.apply(this, arguments)), s;
      }), c = function(w) {
        return document.querySelector(w);
      }, h = function(w) {
        var k = {};
        return function(x) {
          if (typeof x == "function")
            return x();
          if (k[x] === void 0) {
            var M = c.call(this, x);
            if (window.HTMLIFrameElement && M instanceof window.HTMLIFrameElement)
              try {
                M = M.contentDocument.head;
              } catch {
                M = null;
              }
            k[x] = M;
          }
          return k[x];
        };
      }(), d = null, u = 0, f = [], p = i(4);
      function b(w, k) {
        for (var x = 0; x < w.length; x++) {
          var M = w[x], I = a[M.id];
          if (I) {
            I.refs++;
            for (var L = 0; L < I.parts.length; L++)
              I.parts[L](M.parts[L]);
            for (; L < M.parts.length; L++)
              I.parts.push(m(M.parts[L], k));
          } else {
            var Y = [];
            for (L = 0; L < M.parts.length; L++)
              Y.push(m(M.parts[L], k));
            a[M.id] = { id: M.id, refs: 1, parts: Y };
          }
        }
      }
      function O(w, k) {
        for (var x = [], M = {}, I = 0; I < w.length; I++) {
          var L = w[I], Y = k.base ? L[0] + k.base : L[0], U = { css: L[1], media: L[2], sourceMap: L[3] };
          M[Y] ? M[Y].parts.push(U) : x.push(M[Y] = { id: Y, parts: [U] });
        }
        return x;
      }
      function B(w, k) {
        var x = h(w.insertInto);
        if (!x)
          throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
        var M = f[f.length - 1];
        if (w.insertAt === "top")
          M ? M.nextSibling ? x.insertBefore(k, M.nextSibling) : x.appendChild(k) : x.insertBefore(k, x.firstChild), f.push(k);
        else if (w.insertAt === "bottom")
          x.appendChild(k);
        else {
          if (typeof w.insertAt != "object" || !w.insertAt.before)
            throw new Error(`[Style Loader]

 Invalid value for parameter 'insertAt' ('options.insertAt') found.
 Must be 'top', 'bottom', or Object.
 (https://github.com/webpack-contrib/style-loader#insertat)
`);
          var I = h(w.insertInto + " " + w.insertAt.before);
          x.insertBefore(k, I);
        }
      }
      function _(w) {
        if (w.parentNode === null)
          return !1;
        w.parentNode.removeChild(w);
        var k = f.indexOf(w);
        k >= 0 && f.splice(k, 1);
      }
      function E(w) {
        var k = document.createElement("style");
        return w.attrs.type === void 0 && (w.attrs.type = "text/css"), v(k, w.attrs), B(w, k), k;
      }
      function v(w, k) {
        Object.keys(k).forEach(function(x) {
          w.setAttribute(x, k[x]);
        });
      }
      function m(w, k) {
        var x, M, I, L;
        if (k.transform && w.css) {
          if (!(L = k.transform(w.css)))
            return function() {
            };
          w.css = L;
        }
        if (k.singleton) {
          var Y = u++;
          x = d || (d = E(k)), M = S.bind(null, x, Y, !1), I = S.bind(null, x, Y, !0);
        } else
          w.sourceMap && typeof URL == "function" && typeof URL.createObjectURL == "function" && typeof URL.revokeObjectURL == "function" && typeof Blob == "function" && typeof btoa == "function" ? (x = function(U) {
            var ft = document.createElement("link");
            return U.attrs.type === void 0 && (U.attrs.type = "text/css"), U.attrs.rel = "stylesheet", v(ft, U.attrs), B(U, ft), ft;
          }(k), M = A.bind(null, x, k), I = function() {
            _(x), x.href && URL.revokeObjectURL(x.href);
          }) : (x = E(k), M = y.bind(null, x), I = function() {
            _(x);
          });
        return M(w), function(U) {
          if (U) {
            if (U.css === w.css && U.media === w.media && U.sourceMap === w.sourceMap)
              return;
            M(w = U);
          } else
            I();
        };
      }
      e.exports = function(w, k) {
        if (typeof DEBUG < "u" && DEBUG && typeof document != "object")
          throw new Error("The style-loader cannot be used in a non-browser environment");
        (k = k || {}).attrs = typeof k.attrs == "object" ? k.attrs : {}, k.singleton || typeof k.singleton == "boolean" || (k.singleton = l()), k.insertInto || (k.insertInto = "head"), k.insertAt || (k.insertAt = "bottom");
        var x = O(w, k);
        return b(x, k), function(M) {
          for (var I = [], L = 0; L < x.length; L++) {
            var Y = x[L];
            (U = a[Y.id]).refs--, I.push(U);
          }
          for (M && b(O(M, k), k), L = 0; L < I.length; L++) {
            var U;
            if ((U = I[L]).refs === 0) {
              for (var ft = 0; ft < U.parts.length; ft++)
                U.parts[ft]();
              delete a[U.id];
            }
          }
        };
      };
      var T, D = (T = [], function(w, k) {
        return T[w] = k, T.filter(Boolean).join(`
`);
      });
      function S(w, k, x, M) {
        var I = x ? "" : M.css;
        if (w.styleSheet)
          w.styleSheet.cssText = D(k, I);
        else {
          var L = document.createTextNode(I), Y = w.childNodes;
          Y[k] && w.removeChild(Y[k]), Y.length ? w.insertBefore(L, Y[k]) : w.appendChild(L);
        }
      }
      function y(w, k) {
        var x = k.css, M = k.media;
        if (M && w.setAttribute("media", M), w.styleSheet)
          w.styleSheet.cssText = x;
        else {
          for (; w.firstChild; )
            w.removeChild(w.firstChild);
          w.appendChild(document.createTextNode(x));
        }
      }
      function A(w, k, x) {
        var M = x.css, I = x.sourceMap, L = k.convertToAbsoluteUrls === void 0 && I;
        (k.convertToAbsoluteUrls || L) && (M = p(M)), I && (M += `
/*# sourceMappingURL=data:application/json;base64,` + btoa(unescape(encodeURIComponent(JSON.stringify(I)))) + " */");
        var Y = new Blob([M], { type: "text/css" }), U = w.href;
        w.href = URL.createObjectURL(Y), U && URL.revokeObjectURL(U);
      }
    }, function(e, o) {
      e.exports = function(i) {
        var r = typeof window < "u" && window.location;
        if (!r)
          throw new Error("fixUrls requires window.location");
        if (!i || typeof i != "string")
          return i;
        var s = r.protocol + "//" + r.host, a = s + r.pathname.replace(/\/[^\/]*$/, "/");
        return i.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(l, c) {
          var h, d = c.trim().replace(/^"(.*)"$/, function(u, f) {
            return f;
          }).replace(/^'(.*)'$/, function(u, f) {
            return f;
          });
          return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(d) ? l : (h = d.indexOf("//") === 0 ? d : d.indexOf("/") === 0 ? s + d : a + d.replace(/^\.\//, ""), "url(" + JSON.stringify(h) + ")");
        });
      };
    }, function(e, o, i) {
      i.r(o), i.d(o, "default", function() {
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
        for (var h = 0; h < c.length; h++) {
          var d = c[h];
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
        function l(u) {
          var f = u.data, p = u.config, b = u.api, O = u.readOnly;
          (function(B, _) {
            if (!(B instanceof _))
              throw new TypeError("Cannot call a class as a function");
          })(this, l), this.api = b, this.readOnly = O, this._CSS = { block: this.api.styles.block, wrapper: "ce-header" }, this._settings = p, this._data = this.normalizeData(f), this._element = this.getTag();
        }
        var c, h, d;
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
        } }], (h = [{ key: "normalizeData", value: function(u) {
          var f = {};
          return r(u) !== "object" && (u = {}), f.text = u.text || "", f.level = parseInt(u.level) || this.defaultLevel.number, f;
        } }, { key: "render", value: function() {
          return this._element;
        } }, { key: "renderSettings", value: function() {
          var u = this;
          return this.levels.map(function(f) {
            return { icon: f.svg, label: u.api.i18n.t("Heading ".concat(f.number)), onActivate: function() {
              return u.setLevel(f.number);
            }, closeOnActivate: !0, isActive: u.currentLevel.number === f.number };
          });
        } }, { key: "setLevel", value: function(u) {
          this.data = { level: u, text: this.data.text };
        } }, { key: "merge", value: function(u) {
          var f = { text: this.data.text + u.text, level: this.data.level };
          this.data = f;
        } }, { key: "validate", value: function(u) {
          return u.text.trim() !== "";
        } }, { key: "save", value: function(u) {
          return { text: u.innerHTML, level: this.currentLevel.number };
        } }, { key: "getTag", value: function() {
          var u = document.createElement(this.currentLevel.tag);
          return u.innerHTML = this._data.text || "", u.classList.add(this._CSS.wrapper), u.contentEditable = this.readOnly ? "false" : "true", u.dataset.placeholder = this.api.i18n.t(this._settings.placeholder || ""), u;
        } }, { key: "onPaste", value: function(u) {
          var f = u.detail.data, p = this.defaultLevel.number;
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
          this._settings.levels && (p = this._settings.levels.reduce(function(b, O) {
            return Math.abs(O - p) < Math.abs(b - p) ? O : b;
          })), this.data = { level: p, text: f.innerHTML };
        } }, { key: "data", get: function() {
          return this._data.text = this._element.innerHTML, this._data.level = this.currentLevel.number, this._data;
        }, set: function(u) {
          if (this._data = this.normalizeData(u), u.level !== void 0 && this._element.parentNode) {
            var f = this.getTag();
            f.innerHTML = this._element.innerHTML, this._element.parentNode.replaceChild(f, this._element), this._element = f;
          }
          u.text !== void 0 && (this._element.innerHTML = this._data.text || "");
        } }, { key: "currentLevel", get: function() {
          var u = this, f = this.levels.find(function(p) {
            return p.number === u._data.level;
          });
          return f || (f = this.defaultLevel), f;
        } }, { key: "defaultLevel", get: function() {
          var u = this;
          if (this._settings.defaultLevel) {
            var f = this.levels.find(function(p) {
              return p.number === u._settings.defaultLevel;
            });
            if (f)
              return f;
            console.warn("(ง'̀-'́)ง Heading Tool: the default level specified was not found in available levels");
          }
          return this.levels[1];
        } }, { key: "levels", get: function() {
          var u = this, f = [{ number: 1, tag: "H1", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M19 17V10.2135C19 10.1287 18.9011 10.0824 18.836 10.1367L16 12.5"/></svg>' }, { number: 2, tag: "H2", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 11C16 10 19 9.5 19 12C19 13.9771 16.0684 13.9997 16.0012 16.8981C15.9999 16.9533 16.0448 17 16.1 17L19.3 17"/></svg>' }, { number: 3, tag: "H3", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 11C16 10.5 16.8323 10 17.6 10C18.3677 10 19.5 10.311 19.5 11.5C19.5 12.5315 18.7474 12.9022 18.548 12.9823C18.5378 12.9864 18.5395 13.0047 18.5503 13.0063C18.8115 13.0456 20 13.3065 20 14.8C20 16 19.5 17 17.8 17C17.8 17 16 17 16 16.3"/></svg>' }, { number: 4, tag: "H4", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M18 10L15.2834 14.8511C15.246 14.9178 15.294 15 15.3704 15C16.8489 15 18.7561 15 20.2 15M19 17C19 15.7187 19 14.8813 19 13.6"/></svg>' }, { number: 5, tag: "H5", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 15.9C16 15.9 16.3768 17 17.8 17C19.5 17 20 15.6199 20 14.7C20 12.7323 17.6745 12.0486 16.1635 12.9894C16.094 13.0327 16 12.9846 16 12.9027V10.1C16 10.0448 16.0448 10 16.1 10H19.8"/></svg>' }, { number: 6, tag: "H6", svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 7L6 12M6 17L6 12M6 12L12 12M12 7V12M12 17L12 12"/><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M19.5 10C16.5 10.5 16 13.3285 16 15M16 15V15C16 16.1046 16.8954 17 18 17H18.3246C19.3251 17 20.3191 16.3492 20.2522 15.3509C20.0612 12.4958 16 12.6611 16 15Z"/></svg>' }];
          return this._settings.levels ? f.filter(function(p) {
            return u._settings.levels.includes(p.number);
          }) : f;
        } }]) && s(c.prototype, h), d && s(c, d), l;
      }();
    }]).default;
  });
})(Kr);
var wd = Kr.exports;
const kd = /* @__PURE__ */ nr(wd);
function yd() {
  return localStorage.getItem("productTour_seen") == "true";
}
function Li() {
  localStorage.setItem("productTour_seen", "true");
}
function Gr(n) {
  const t = new Dt.Tour({
    useModalOverlay: !0,
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
  return t.addSteps(n || F.steps), t;
}
function Zr(n) {
  F.newStep.activeElement = n;
  const t = new Dt.Tour({
    useModalOverlay: !0,
    defaultStepOptions: {
      cancelIcon: {
        enabled: !0
      }
    }
  }), e = F.newStep.activeType;
  let o, i, r = {
    element: (n == null ? void 0 : n.tagName) + "[data-untitled-tour]",
    on: "top"
  };
  e === "text" ? (o = '<div style="width: 100%" v-scope="TitleInput()" />', i = '<div v-scope="ContentInput()" />') : e === "image" ? i = '<div v-scope="ImageInput()" />' : e === "video" ? i = '<div v-scope="VideoInput()" />' : e === "banner" && (i = '<div v-scope="BannerInput()" />', r = void 0), t.addStep({
    id: "new-step",
    attachTo: r,
    title: o,
    text: i,
    buttons: [
      {
        text: "Done",
        action() {
          e === "image" ? Ci().addImageStep() : e === "video" ? Ti().addVideoStep() : F.addNewStep(e === "banner");
        }
      }
    ]
  }), ["complete", "cancel"].forEach(
    (s) => t.on(s, () => {
      n == null || n.removeAttribute("data-untitled-tour"), F.newStep.title = "", F.newStep.content = "", F.newStep.activeType = "", F.newStep.activeElement = null;
    })
  ), t.start(), Ri({
    // Global Store
    store: F,
    // Components
    TitleInput: Ml,
    ContentInput: Ol,
    ImageInput: Ci,
    VideoInput: Ti,
    BannerInput: Nl
  }).mount(".shepherd-content"), e === "banner" && (F.newStep.activeEditor = new vd({
    holder: "banner-editor",
    tools: {
      header: kd
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
function Ni(n, t = !1) {
  const e = n, o = e.map((r, s) => {
    const a = [];
    a.push({
      text: "Skip",
      secondary: !0,
      classes: "untitled_skip-button",
      action() {
        this.cancel();
        const h = new CustomEvent("stepChanged", {
          detail: 0
        });
        window.dispatchEvent(h), Li();
      }
    }), s !== 0 && a.push({
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
        const h = new CustomEvent("stepChanged", {
          detail: s
        });
        window.dispatchEvent(h);
      }
    }), a.push({
      text: s !== e.length - 1 ? `<div class='untitled_flex-side'><div>Next</div><div class="untitled_flex-side">
                            <svg fill="none" stroke="currentColor" stroke-width="2.5" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                            </svg>
                        </div>
                        </div>` : "Finish</div>",
      action() {
        this.next();
        const h = new CustomEvent("stepChanged", {
          detail: s + 1 !== e.length ? s + 2 : 0
        });
        window.dispatchEvent(h), s === e.length - 1 && Li();
      }
    });
    let l = null;
    r.xpath && (l = rs(r.xpath), l ? l.setAttribute(`data-tour-step-${s}`, "") : console.warn("Could not locate element for xpath", r.xpath));
    const c = getComputedStyle(
      // @ts-ignore
      document.querySelector(":root")
    ).getPropertyValue("--tour-theme");
    return {
      ...r,
      index: s,
      buttons: a,
      // @ts-ignore
      title: `
            <div class="untitled_flex-between" style="width: 100%">
                <h3>Step ${s + 1}</h3>
                <a href="https://buildoor.xyz" target="_blank" class="untitled_center">
                    <img src="https://product-tour-dist.vercel.app/Watermark${c}.png" style="max-width: 120px" />
                </a>
            </div>
            `,
      text: `<h3>${r.title}</h3>` + r.text + "<div style='margin-top: 4rem'></div>",
      attachTo: l ? {
        element: l.tagName.toLowerCase() + `[data-tour-step-${s}]`,
        on: "top"
      } : void 0
    };
  });
  F.steps = o;
  const i = Gr(o);
  if (window.ProductTour.restart = i.start, window.ProductTour.tour = i, t) {
    const r = new CustomEvent("stepChanged", {
      detail: 1
    });
    window.dispatchEvent(r), i.start();
  }
  return i.start;
}
function xd(n) {
  F.newStep.activeType = n;
  const t = (e) => {
    e.key === "Escape" && (F.setEditMode(!1), window.removeEventListener("keydown", t));
  };
  window.addEventListener("keydown", t), n !== "banner" ? F.setEditMode(!0) : Zr();
}
const Ed = ["HTML", "BODY"];
function Sd(n = !1) {
  n ? (document.addEventListener("click", $n, !0), document.addEventListener("mousemove", Di), document.addEventListener("mouseleave", Wn, !0)) : (document.removeEventListener("click", $n, !0), document.removeEventListener("mousemove", Di), document.removeEventListener("mouseleave", Wn, !0));
}
function Di(n) {
  var o;
  const t = n.target;
  if ((o = document.getElementById("untitled-main")) != null && o.contains(t))
    return;
  const e = document.getElementById("label");
  n.stopPropagation(), e.style.left = n.x + 15 + "px", e.style.top = n.y + 15 + "px", t && !Ed.includes(t.tagName) ? (F.setHovered(t), Cd(t)) : e.style.display = "none";
}
function Cd(n) {
  if (n) {
    let t = function(o) {
      F.editMode ? (o.stopPropagation(), F.selected && F.selected.classList.remove("untitled_selected"), F.setSelected(n), n.classList.remove("hovered"), n.classList.add("untitled_selected"), n.setAttribute("data-untitled-tour", ""), F.setEditMode(!1), Zr(n)) : n.removeEventListener("click", t);
    };
    const e = document.getElementById("label");
    e.style.display = "block", n.addEventListener("click", t);
  }
}
function Td(n) {
  const t = document.getElementById(n);
  t ? new P(t, {
    animation: 200,
    onUpdate(e) {
      ts(F.steps, e.oldIndex, e.newIndex);
    }
  }) : console.warn("Unable to set up drag-and-drop sorting for tour steps");
}
function Bd() {
  return {
    $template: "#footer",
    loading: !1,
    message: "",
    timeout: null,
    async saveSteps() {
      try {
        this.loading = !0, await Ll(F.accessToken, F.tourId, F.steps), this.message = "Saved", this.timeout && clearTimeout(this.timeout), this.timeout = setTimeout(() => {
          this.message = "";
        }, 2e3), this.loading = !1;
      } catch (n) {
        this.loading = !1, this.message = "Error", this.timeout && clearTimeout(this.timeout), this.timeout = setTimeout(() => {
          this.message = "";
        }, 2e3), console.error("Error while saving.", n);
      }
    }
  };
}
async function _d(n) {
  const t = await fetch(oo + "/user", {
    headers: {
      Authorization: "Bearer " + n
    }
  });
  if (t.status === 400)
    throw console.error("Unauthorized for Admin Mode"), new Error("Unauthorized for Admin Mode");
  return await t.json();
}
function Id(n) {
  const t = document.querySelector(":root");
  for (const e of n)
    e.id === "colorMode" && (e.value === "light" ? (t.style.setProperty("--tour-theme", "Light"), t.style.setProperty("--tour-secondaryTextColor", "#00000f"), t.style.setProperty("--tour-background", "white"), t.style.setProperty("--tour-foreground", "#00000f"), t.style.setProperty("--tour-subtitleColor", "#6b7280")) : e.value === "dark" && (t.style.setProperty("--tour-theme", "Dark"), t.style.setProperty("--tour-secondaryTextColor", "white"), t.style.setProperty("--tour-background", "#00000f"), t.style.setProperty("--tour-foreground", "white"), t.style.setProperty("--tour-subtitleColor", "#9ca3af"))), t.style.setProperty("--tour-" + e.id, e.value);
}
window.ProductTour = {
  init: vn,
  restart: null
};
function vn(n) {
  const t = n || window.ProductTourID;
  if (console.log("Initializing Product Tour for Project ", t), !t) {
    console.warn("ProductTour: No project ID found");
    return;
  }
  const e = document.createElement("div");
  e.id = "untitled-app", e.innerHTML = `
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

      <template id="title-input">
        <input type="text" v-model="store.newStep.title" class="untitled_title-input" placeholder="Title" tabindex="1" @vue:mounted="this.focus()" />
      </template>
      <template id="content-input">
        <textarea v-model="store.newStep.content" class="untitled_content-input" placeholder="Content" tabindex="2" style="margin-bottom: 3rem"></textarea>
      </template>
      <template id="banner-input">
        <div id="banner-editor" class="untitled_editor-container" style="margin-bottom: 3rem">
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
        <div style="margin-bottom: 3rem"></div>
      </template>
`, document.body.append(e);
  async function o() {
    if (!t)
      return;
    F.projectId = t;
    const i = new URLSearchParams(window.location.search), r = i.get("tourToken"), s = i.get("tourId");
    if (r && r.length > 0) {
      if (F.accessToken = r, F.tourId = s, !s)
        return;
      _d(r).then(async () => {
        const a = await Al(s);
        a && F.setSteps(a), F.setAdminMode(!0);
      }).catch(() => {
        console.error("Unable to validate access token");
      });
    } else {
      const a = await vr(t);
      if (!a || !a.steps)
        return;
      Id(a.theme.details);
      const l = Ni(a.steps);
      if (!yd()) {
        const c = new CustomEvent("stepChanged", {
          detail: 1
        });
        window.dispatchEvent(c), l();
      }
    }
    Ri({
      // Global Store
      store: F,
      // Functions
      parseSteps: Ni,
      beginEdit: xd,
      setupTour: Gr,
      // Components
      Footer: Bd
    }).mount("#untitled-main"), Td("untitled-steps");
  }
  o();
}
document.readyState === "complete" ? vn() : window.addEventListener("load", () => vn());
