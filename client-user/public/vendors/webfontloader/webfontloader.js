/* Web Font Loader v1.6.27 - (c) Adobe Systems, Google. License: Apache 2.0 */(function () {
  function aa(a, b, c) { return a.call.apply(a.bind, arguments); } function ba(a, b, c) { if (!a) throw Error(); if (arguments.length > 2) { const d = Array.prototype.slice.call(arguments, 2); return function () { const c = Array.prototype.slice.call(arguments); Array.prototype.unshift.apply(c, d); return a.apply(b, c); }; } return function () { return a.apply(b, arguments); }; } function p(a, b, c) { p = Function.prototype.bind && Function.prototype.bind.toString().indexOf('native code') != -1 ? aa : ba; return p(...arguments); } const q = Date.now || function () { return +new Date(); }; function ca(a, b) { this.a = a; this.m = b || a; this.c = this.m.document; } const da = !!window.FontFace; function t(a, b, c, d) { b = a.c.createElement(b); if (c) for (const e in c)c.hasOwnProperty(e) && (e == 'style' ? b.style.cssText = c[e] : b.setAttribute(e, c[e])); d && b.appendChild(a.c.createTextNode(d)); return b; } function u(a, b, c) { a = a.c.getElementsByTagName(b)[0]; a || (a = document.documentElement); a.insertBefore(c, a.lastChild); } function v(a) { a.parentNode && a.parentNode.removeChild(a); }
  function w(a, b, c) { b = b || []; c = c || []; for (var d = a.className.split(/\s+/), e = 0; e < b.length; e += 1) { for (var f = !1, g = 0; g < d.length; g += 1) if (b[e] === d[g]) { f = !0; break; }f || d.push(b[e]); }b = []; for (e = 0; e < d.length; e += 1) { f = !1; for (g = 0; g < c.length; g += 1) if (d[e] === c[g]) { f = !0; break; }f || b.push(d[e]); }a.className = b.join(' ').replace(/\s+/g, ' ').replace(/^\s+|\s+$/, ''); } function y(a, b) { for (let c = a.className.split(/\s+/), d = 0, e = c.length; d < e; d++) if (c[d] == b) return !0; return !1; }
  function z(a) { if (typeof a.f === 'string') return a.f; let b = a.m.location.protocol; b == 'about:' && (b = a.a.location.protocol); return b == 'https:' ? 'https:' : 'http:'; } function ea(a) { return a.m.location.hostname || a.a.location.hostname; }
  function A(a, b, c) {
    function d() { k && e && f && (k(g), k = null); }b = t(a, 'link', {rel: 'stylesheet', href: b, media: 'all'}); var e = !1,
      f = !0,
      g = null,
      k = c || null; da ? (b.onload = function () { e = !0; d(); }, b.onerror = function () { e = !0; g = Error('Stylesheet failed to load'); d(); }) : setTimeout(() => { e = !0; d(); }, 0); u(a, 'head', b);
  }
  function B(a, b, c, d) {
    const e = a.c.getElementsByTagName('head')[0]; if (e) {
      let f = t(a, 'script', {src: b}),
        g = !1; f.onload = f.onreadystatechange = function () { g || this.readyState && this.readyState != 'loaded' && this.readyState != 'complete' || (g = !0, c && c(null), f.onload = f.onreadystatechange = null, f.parentNode.tagName == 'HEAD' && e.removeChild(f)); }; e.appendChild(f); setTimeout(() => { g || (g = !0, c && c(Error('Script load timeout'))); }, d || 5E3); return f;
    } return null;
  } function C() { this.a = 0; this.c = null; } function D(a) { a.a++; return function () { a.a--; E(a); }; } function F(a, b) { a.c = b; E(a); } function E(a) { a.a == 0 && a.c && (a.c(), a.c = null); } function G(a) { this.a = a || '-'; }G.prototype.c = function (a) { for (var b = [], c = 0; c < arguments.length; c++)b.push(arguments[c].replace(/[\W_]+/g, '').toLowerCase()); return b.join(this.a); }; function H(a, b) { this.c = a; this.f = 4; this.a = 'n'; const c = (b || 'n4').match(/^([nio])([1-9])$/i); c && (this.a = c[1], this.f = parseInt(c[2], 10)); } function fa(a) { return `${I(a)} ${a.f}00 300px ${J(a.c)}`; } function J(a) { const b = []; a = a.split(/,\s*/); for (let c = 0; c < a.length; c++) { const d = a[c].replace(/['"]/g, ''); d.indexOf(' ') != -1 || /^\d/.test(d) ? b.push(`'${d}'`) : b.push(d); } return b.join(','); } function K(a) { return a.a + a.f; } function I(a) { let b = 'normal'; a.a === 'o' ? b = 'oblique' : a.a === 'i' && (b = 'italic'); return b; }
  function ga(a) {
    let b = 4,
      c = 'n',
      d = null; a && ((d = a.match(/(normal|oblique|italic)/i)) && d[1] && (c = d[1].substr(0, 1).toLowerCase()), (d = a.match(/([1-9]00|normal|bold)/i)) && d[1] && (/bold/i.test(d[1]) ? b = 7 : /[1-9]00/.test(d[1]) && (b = parseInt(d[1].substr(0, 1), 10)))); return c + b;
  } function ha(a, b) { this.c = a; this.f = a.m.document.documentElement; this.h = b; this.a = new G('-'); this.j = !1 !== b.events; this.g = !1 !== b.classes; } function ia(a) { a.g && w(a.f, [a.a.c('wf', 'loading')]); L(a, 'loading'); } function M(a) {
    if (a.g) {
      let b = y(a.f, a.a.c('wf', 'active')),
        c = [],
        d = [a.a.c('wf', 'loading')]; b || c.push(a.a.c('wf', 'inactive')); w(a.f, c, d);
    }L(a, 'inactive');
  } function L(a, b, c) { if (a.j && a.h[b]) if (c)a.h[b](c.c, K(c)); else a.h[b](); } function ja() { this.c = {}; } function ka(a, b, c) {
    let d = [],
      e; for (e in b) if (b.hasOwnProperty(e)) { const f = a.c[e]; f && d.push(f(b[e], c)); } return d;
  } function N(a, b) { this.c = a; this.f = b; this.a = t(this.c, 'span', {'aria-hidden': 'true'}, this.f); } function O(a) { u(a.c, 'body', a.a); } function P(a) { return `display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:${J(a.c)};` + `font-style:${I(a)};font-weight:${a.f}00;`; } function Q(a, b, c, d, e, f) { this.g = a; this.j = b; this.a = d; this.c = c; this.f = e || 3E3; this.h = f || void 0; }Q.prototype.start = function () {
    let a = this.c.m.document,
      b = this,
      c = q(),
      d = new Promise((d, e) => { function k() { q() - c >= b.f ? e() : a.fonts.load(fa(b.a), b.h).then((a) => { a.length >= 1 ? d() : setTimeout(k, 25); }, () => { e(); }); }k(); }),
      e = new Promise((a, d) => { setTimeout(d, b.f); }); Promise.race([e, d]).then(() => { b.g(b.a); }, () => { b.j(b.a); });
  }; function R(a, b, c, d, e, f, g) {
    this.v = a; this.B = b; this.c = c; this.a = d; this.s = g || 'BESbswy'; this.f = {}; this.w = e || 3E3; this.u = f || null; this.o = this.j = this.h = this.g = null; this.g = new N(this.c, this.s); this.h = new N(this.c, this.s); this.j = new N(this.c, this.s); this.o = new N(this.c, this.s); a = new H(`${this.a.c},serif`, K(this.a)); a = P(a); this.g.a.style.cssText = a; a = new H(`${this.a.c},sans-serif`, K(this.a)); a = P(a); this.h.a.style.cssText = a; a = new H('serif', K(this.a)); a = P(a); this.j.a.style.cssText = a; a = new H('sans-serif', K(this.a)); a =
P(a); this.o.a.style.cssText = a; O(this.g); O(this.h); O(this.j); O(this.o);
  } let S = {D: 'serif', C: 'sans-serif'},
    T = null; function U() { if (T === null) { const a = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent); T = !!a && (parseInt(a[1], 10) < 536 || parseInt(a[1], 10) === 536 && parseInt(a[2], 10) <= 11); } return T; }R.prototype.start = function () { this.f.serif = this.j.a.offsetWidth; this.f['sans-serif'] = this.o.a.offsetWidth; this.A = q(); la(this); };
  function ma(a, b, c) { for (const d in S) if (S.hasOwnProperty(d) && b === a.f[S[d]] && c === a.f[S[d]]) return !0; return !1; } function la(a) {
    let b = a.g.a.offsetWidth,
      c = a.h.a.offsetWidth,
      d; (d = b === a.f.serif && c === a.f['sans-serif']) || (d = U() && ma(a, b, c)); d ? q() - a.A >= a.w ? U() && ma(a, b, c) && (a.u === null || a.u.hasOwnProperty(a.a.c)) ? V(a, a.v) : V(a, a.B) : na(a) : V(a, a.v);
  } function na(a) { setTimeout(p(function () { la(this); }, a), 50); } function V(a, b) { setTimeout(p(function () { v(this.g.a); v(this.h.a); v(this.j.a); v(this.o.a); b(this.a); }, a), 0); } function W(a, b, c) { this.c = a; this.a = b; this.f = 0; this.o = this.j = !1; this.s = c; } let X = null; W.prototype.g = function (a) { const b = this.a; b.g && w(b.f, [b.a.c('wf', a.c, K(a).toString(), 'active')], [b.a.c('wf', a.c, K(a).toString(), 'loading'), b.a.c('wf', a.c, K(a).toString(), 'inactive')]); L(b, 'fontactive', a); this.o = !0; oa(this); };
  W.prototype.h = function (a) {
    const b = this.a; if (b.g) {
      let c = y(b.f, b.a.c('wf', a.c, K(a).toString(), 'active')),
        d = [],
        e = [b.a.c('wf', a.c, K(a).toString(), 'loading')]; c || d.push(b.a.c('wf', a.c, K(a).toString(), 'inactive')); w(b.f, d, e);
    }L(b, 'fontinactive', a); oa(this);
  }; function oa(a) { --a.f == 0 && a.j && (a.o ? (a = a.a, a.g && w(a.f, [a.a.c('wf', 'active')], [a.a.c('wf', 'loading'), a.a.c('wf', 'inactive')]), L(a, 'active')) : M(a.a)); } function pa(a) { this.j = a; this.a = new ja(); this.h = 0; this.f = this.g = !0; }pa.prototype.load = function (a) { this.c = new ca(this.j, a.context || this.j); this.g = !1 !== a.events; this.f = !1 !== a.classes; qa(this, new ha(this.c, a), a); };
  function ra(a, b, c, d, e) {
    const f = --a.h == 0; (a.f || a.g) && setTimeout(() => {
      let a = e || null,
        k = d || null || {}; if (c.length === 0 && f)M(b.a); else {
          b.f += c.length; f && (b.j = f); let h,
            m = []; for (h = 0; h < c.length; h++) {
              var l = c[h],
                n = k[l.c],
                r = b.a,
                x = l; r.g && w(r.f, [r.a.c('wf', x.c, K(x).toString(), 'loading')]); L(r, 'fontloading', x); r = null; if (X === null) {
                  if (window.FontFace) {
                    var x = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent),
                      ya = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
                    X = x ? parseInt(x[1], 10) > 42 : ya ? !1 : !0;
                  } else X = !1;
                } X ? r = new Q(p(b.g, b), p(b.h, b), b.c, l, b.s, n) : r = new R(p(b.g, b), p(b.h, b), b.c, l, b.s, a, n); m.push(r);
            } for (h = 0; h < m.length; h++)m[h].start();
        }
    }, 0);
  } function qa(a, b, c) {
    var d = [],
      e = c.timeout; ia(b); var d = ka(a.a, c, a.c),
        f = new W(a.c, b, e); a.h = d.length; b = 0; for (c = d.length; b < c; b++)d[b].load((b, d, c) => { ra(a, f, b, d, c); });
  } function sa(a, b) { this.c = a; this.a = b; } function ta(a, b, c) { const d = z(a.c); a = (a.a.api || 'fast.fonts.net/jsapi').replace(/^.*http(s?):(\/\/)?/, ''); return `${d}//${a}/${b}.js${c ? `?v=${c}` : ''}`; }
  sa.prototype.load = function (a) {
    function b() {
      if (f[`__mti_fntLst${d}`]) {
        let c = f[`__mti_fntLst${d}`](),
          e = [],
          h; if (c) for (let m = 0; m < c.length; m++) { const l = c[m].fontfamily; void 0 != c[m].fontStyle && void 0 != c[m].fontWeight ? (h = c[m].fontStyle + c[m].fontWeight, e.push(new H(l, h))) : e.push(new H(l)); }a(e);
      } else setTimeout(() => { b(); }, 50);
    } var c = this,
      d = c.a.projectId,
      e = c.a.version; if (d) {
        var f = c.c.m; B(this.c, ta(c, d, e), (e) => { e ? a([]) : (f[`__MonotypeConfiguration__${d}`] = function () { return c.a; }, b()); }).id = `__MonotypeAPIScript__${
d}`;
      } else a([]);
  }; function ua(a, b) { this.c = a; this.a = b; }ua.prototype.load = function (a) {
    let b,
      c,
      d = this.a.urls || [],
      e = this.a.families || [],
      f = this.a.testStrings || {},
      g = new C(); b = 0; for (c = d.length; b < c; b++)A(this.c, d[b], D(g)); const k = []; b = 0; for (c = e.length; b < c; b++) if (d = e[b].split(':'), d[1]) for (let h = d[1].split(','), m = 0; m < h.length; m += 1)k.push(new H(d[0], h[m])); else k.push(new H(d[0])); F(g, () => { a(k, f); });
  }; function va(a, b, c) { a ? this.c = a : this.c = b + wa; this.a = []; this.f = []; this.g = c || ''; } var wa = '//fonts.googleapis.com/css'; function xa(a, b) { for (let c = b.length, d = 0; d < c; d++) { const e = b[d].split(':'); e.length == 3 && a.f.push(e.pop()); let f = ''; e.length == 2 && e[1] != '' && (f = ':'); a.a.push(e.join(f)); } }
  function za(a) { if (a.a.length == 0) throw Error('No fonts to load!'); if (a.c.indexOf('kit=') != -1) return a.c; for (var b = a.a.length, c = [], d = 0; d < b; d++)c.push(a.a[d].replace(/ /g, '+')); b = `${a.c}?family=${c.join('%7C')}`; a.f.length > 0 && (b += `&subset=${a.f.join(',')}`); a.g.length > 0 && (b += `&text=${encodeURIComponent(a.g)}`); return b; } function Aa(a) { this.f = a; this.a = []; this.c = {}; }
  let Ba = {latin: 'BESbswy', 'latin-ext': '\u00e7\u00f6\u00fc\u011f\u015f', cyrillic: '\u0439\u044f\u0416', greek: '\u03b1\u03b2\u03a3', khmer: '\u1780\u1781\u1782', Hanuman: '\u1780\u1781\u1782'},
    Ca = {thin: '1', extralight: '2', 'extra-light': '2', ultralight: '2', 'ultra-light': '2', light: '3', regular: '4', book: '4', medium: '5', 'semi-bold': '6', semibold: '6', 'demi-bold': '6', demibold: '6', bold: '7', 'extra-bold': '8', extrabold: '8', 'ultra-bold': '8', ultrabold: '8', black: '9', heavy: '9', l: '3', r: '4', b: '7'},
    Da = {i: 'i', italic: 'i', n: 'n', normal: 'n'},
    Ea = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
  function Fa(a) {
    for (let b = a.f.length, c = 0; c < b; c++) {
      let d = a.f[c].split(':'),
        e = d[0].replace(/\+/g, ' '),
        f = ['n4']; if (d.length >= 2) {
          var g; var k = d[1]; g = []; if (k) {
            for (var k = k.split(','), h = k.length, m = 0; m < h; m++) {
              var l; l = k[m]; if (l.match(/^[\w-]+$/)) {
                var n = Ea.exec(l.toLowerCase()); if (n == null)l = ''; else {
                  l = n[2]; l = l == null || l == '' ? 'n' : Da[l]; n = n[1]; if (n == null || n == '')n = '4'; else {
                    var r = Ca[n],
                      n = r || isNaN(n) ? '4' : n.substr(0, 1);
                  } l = [l, n].join('');
                }
              } else l = ''; l && g.push(l);
            }
          }g.length > 0 && (f = g); d.length == 3 && (d = d[2], g = [], d = d ? d.split(',') :
g, d.length > 0 && (d = Ba[d[0]]) && (a.c[e] = d));
        }a.c[e] || (d = Ba[e]) && (a.c[e] = d); for (d = 0; d < f.length; d += 1)a.a.push(new H(e, f[d]));
    }
  } function Ga(a, b) { this.c = a; this.a = b; } const Ha = {Arimo: !0, Cousine: !0, Tinos: !0}; Ga.prototype.load = function (a) {
    let b = new C(),
      c = this.c,
      d = new va(this.a.api, z(c), this.a.text),
      e = this.a.families; xa(d, e); const f = new Aa(e); Fa(f); A(c, za(d), D(b)); F(b, () => { a(f.a, f.c, Ha); });
  }; function Ia(a, b) { this.c = a; this.a = b; }Ia.prototype.load = function (a) {
    let b = this.a.id,
      c = this.c.m; b ? B(this.c, `${this.a.api || 'https://use.typekit.net'}/${b}.js`, (b) => { if (b)a([]); else if (c.Typekit && c.Typekit.config && c.Typekit.config.fn) { b = c.Typekit.config.fn; for (var e = [], f = 0; f < b.length; f += 2) for (let g = b[f], k = b[f + 1], h = 0; h < k.length; h++)e.push(new H(g, k[h])); try { c.Typekit.load({events: !1, classes: !1, async: !0}); } catch (m) {}a(e); } }, 2E3) : a([]);
  }; function Ja(a, b) { this.c = a; this.f = b; this.a = []; }Ja.prototype.load = function (a) {
    let b = this.f.id,
      c = this.c.m,
      d = this; b ? (c.__webfontfontdeckmodule__ || (c.__webfontfontdeckmodule__ = {}), c.__webfontfontdeckmodule__[b] = function (b, c) { for (let g = 0, k = c.fonts.length; g < k; ++g) { const h = c.fonts[g]; d.a.push(new H(h.name, ga(`font-weight:${h.weight};font-style:${h.style}`))); }a(d.a); }, B(this.c, `${z(this.c) + (this.f.api || '//f.fontdeck.com/s/css/js/') + ea(this.c)}/${b}.js`, (b) => { b && a([]); })) : a([]);
  }; const Y = new pa(window); Y.a.c.custom = function (a, b) { return new ua(b, a); }; Y.a.c.fontdeck = function (a, b) { return new Ja(b, a); }; Y.a.c.monotype = function (a, b) { return new sa(b, a); }; Y.a.c.typekit = function (a, b) { return new Ia(b, a); }; Y.a.c.google = function (a, b) { return new Ga(b, a); }; const Z = {load: p(Y.load, Y)}; typeof define === 'function' && define.amd ? define(() => Z) : typeof module !== 'undefined' && module.exports ? module.exports = Z : (window.WebFont = Z, window.WebFontConfig && Y.load(window.WebFontConfig));
}());
