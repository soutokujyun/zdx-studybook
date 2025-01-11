import { onMounted as Dc, openBlock as Rc, createElementBlock as Nc } from "vue";
let _l = [], Su = [];
(() => {
  let r = "lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o".split(",").map((t) => t ? parseInt(t, 36) : 1);
  for (let t = 0, e = 0; t < r.length; t++)
    (t % 2 ? Su : _l).push(e = e + r[t]);
})();
function Ic(r) {
  if (r < 768) return !1;
  for (let t = 0, e = _l.length; ; ) {
    let i = t + e >> 1;
    if (r < _l[i]) e = i;
    else if (r >= Su[i]) t = i + 1;
    else return !0;
    if (t == e) return !1;
  }
}
function nh(r) {
  return r >= 127462 && r <= 127487;
}
const rh = 8205;
function Pc(r, t, e = !0, i = !0) {
  return (e ? Au : Lc)(r, t, i);
}
function Au(r, t, e) {
  if (t == r.length) return t;
  t && ku(r.charCodeAt(t)) && Cu(r.charCodeAt(t - 1)) && t--;
  let i = El(r, t);
  for (t += sh(i); t < r.length; ) {
    let n = El(r, t);
    if (i == rh || n == rh || e && Ic(n))
      t += sh(n), i = n;
    else if (nh(n)) {
      let s = 0, o = t - 2;
      for (; o >= 0 && nh(El(r, o)); )
        s++, o -= 2;
      if (s % 2 == 0) break;
      t += 2;
    } else
      break;
  }
  return t;
}
function Lc(r, t, e) {
  for (; t > 0; ) {
    let i = Au(r, t - 2, e);
    if (i < t) return i;
    t--;
  }
  return 0;
}
function El(r, t) {
  let e = r.charCodeAt(t);
  if (!Cu(e) || t + 1 == r.length) return e;
  let i = r.charCodeAt(t + 1);
  return ku(i) ? (e - 55296 << 10) + (i - 56320) + 65536 : e;
}
function ku(r) {
  return r >= 56320 && r < 57344;
}
function Cu(r) {
  return r >= 55296 && r < 56320;
}
function sh(r) {
  return r < 65536 ? 1 : 2;
}
class pt {
  /**
  Get the line description around the given position.
  */
  lineAt(t) {
    if (t < 0 || t > this.length)
      throw new RangeError(`Invalid position ${t} in document of length ${this.length}`);
    return this.lineInner(t, !1, 1, 0);
  }
  /**
  Get the description for the given (1-based) line number.
  */
  line(t) {
    if (t < 1 || t > this.lines)
      throw new RangeError(`Invalid line number ${t} in ${this.lines}-line document`);
    return this.lineInner(t, !0, 1, 0);
  }
  /**
  Replace a range of the text with the given content.
  */
  replace(t, e, i) {
    [t, e] = Pn(this, t, e);
    let n = [];
    return this.decompose(
      0,
      t,
      n,
      2
      /* Open.To */
    ), i.length && i.decompose(
      0,
      i.length,
      n,
      3
      /* Open.To */
    ), this.decompose(
      e,
      this.length,
      n,
      1
      /* Open.From */
    ), je.from(n, this.length - (e - t) + i.length);
  }
  /**
  Append another document to this one.
  */
  append(t) {
    return this.replace(this.length, this.length, t);
  }
  /**
  Retrieve the text between the given points.
  */
  slice(t, e = this.length) {
    [t, e] = Pn(this, t, e);
    let i = [];
    return this.decompose(t, e, i, 0), je.from(i, e - t);
  }
  /**
  Test whether this text is equal to another instance.
  */
  eq(t) {
    if (t == this)
      return !0;
    if (t.length != this.length || t.lines != this.lines)
      return !1;
    let e = this.scanIdentical(t, 1), i = this.length - this.scanIdentical(t, -1), n = new vr(this), s = new vr(t);
    for (let o = e, a = e; ; ) {
      if (n.next(o), s.next(o), o = 0, n.lineBreak != s.lineBreak || n.done != s.done || n.value != s.value)
        return !1;
      if (a += n.value.length, n.done || a >= i)
        return !0;
    }
  }
  /**
  Iterate over the text. When `dir` is `-1`, iteration happens
  from end to start. This will return lines and the breaks between
  them as separate strings.
  */
  iter(t = 1) {
    return new vr(this, t);
  }
  /**
  Iterate over a range of the text. When `from` > `to`, the
  iterator will run in reverse.
  */
  iterRange(t, e = this.length) {
    return new Eu(this, t, e);
  }
  /**
  Return a cursor that iterates over the given range of lines,
  _without_ returning the line breaks between, and yielding empty
  strings for empty lines.
  
  When `from` and `to` are given, they should be 1-based line numbers.
  */
  iterLines(t, e) {
    let i;
    if (t == null)
      i = this.iter();
    else {
      e == null && (e = this.lines + 1);
      let n = this.line(t).from;
      i = this.iterRange(n, Math.max(n, e == this.lines + 1 ? this.length : e <= 1 ? 0 : this.line(e - 1).to));
    }
    return new Mu(i);
  }
  /**
  Return the document as a string, using newline characters to
  separate lines.
  */
  toString() {
    return this.sliceString(0);
  }
  /**
  Convert the document to an array of lines (which can be
  deserialized again via [`Text.of`](https://codemirror.net/6/docs/ref/#state.Text^of)).
  */
  toJSON() {
    let t = [];
    return this.flatten(t), t;
  }
  /**
  @internal
  */
  constructor() {
  }
  /**
  Create a `Text` instance for the given array of lines.
  */
  static of(t) {
    if (t.length == 0)
      throw new RangeError("A document must have at least one line");
    return t.length == 1 && !t[0] ? pt.empty : t.length <= 32 ? new Vt(t) : je.from(Vt.split(t, []));
  }
}
class Vt extends pt {
  constructor(t, e = Fc(t)) {
    super(), this.text = t, this.length = e;
  }
  get lines() {
    return this.text.length;
  }
  get children() {
    return null;
  }
  lineInner(t, e, i, n) {
    for (let s = 0; ; s++) {
      let o = this.text[s], a = n + o.length;
      if ((e ? i : a) >= t)
        return new Bc(n, a, i, o);
      n = a + 1, i++;
    }
  }
  decompose(t, e, i, n) {
    let s = t <= 0 && e >= this.length ? this : new Vt(oh(this.text, t, e), Math.min(e, this.length) - Math.max(0, t));
    if (n & 1) {
      let o = i.pop(), a = jo(s.text, o.text.slice(), 0, s.length);
      if (a.length <= 32)
        i.push(new Vt(a, o.length + s.length));
      else {
        let h = a.length >> 1;
        i.push(new Vt(a.slice(0, h)), new Vt(a.slice(h)));
      }
    } else
      i.push(s);
  }
  replace(t, e, i) {
    if (!(i instanceof Vt))
      return super.replace(t, e, i);
    [t, e] = Pn(this, t, e);
    let n = jo(this.text, jo(i.text, oh(this.text, 0, t)), e), s = this.length + i.length - (e - t);
    return n.length <= 32 ? new Vt(n, s) : je.from(Vt.split(n, []), s);
  }
  sliceString(t, e = this.length, i = `
`) {
    [t, e] = Pn(this, t, e);
    let n = "";
    for (let s = 0, o = 0; s <= e && o < this.text.length; o++) {
      let a = this.text[o], h = s + a.length;
      s > t && o && (n += i), t < h && e > s && (n += a.slice(Math.max(0, t - s), e - s)), s = h + 1;
    }
    return n;
  }
  flatten(t) {
    for (let e of this.text)
      t.push(e);
  }
  scanIdentical() {
    return 0;
  }
  static split(t, e) {
    let i = [], n = -1;
    for (let s of t)
      i.push(s), n += s.length + 1, i.length == 32 && (e.push(new Vt(i, n)), i = [], n = -1);
    return n > -1 && e.push(new Vt(i, n)), e;
  }
}
class je extends pt {
  constructor(t, e) {
    super(), this.children = t, this.length = e, this.lines = 0;
    for (let i of t)
      this.lines += i.lines;
  }
  lineInner(t, e, i, n) {
    for (let s = 0; ; s++) {
      let o = this.children[s], a = n + o.length, h = i + o.lines - 1;
      if ((e ? h : a) >= t)
        return o.lineInner(t, e, i, n);
      n = a + 1, i = h + 1;
    }
  }
  decompose(t, e, i, n) {
    for (let s = 0, o = 0; o <= e && s < this.children.length; s++) {
      let a = this.children[s], h = o + a.length;
      if (t <= h && e >= o) {
        let d = n & ((o <= t ? 1 : 0) | (h >= e ? 2 : 0));
        o >= t && h <= e && !d ? i.push(a) : a.decompose(t - o, e - o, i, d);
      }
      o = h + 1;
    }
  }
  replace(t, e, i) {
    if ([t, e] = Pn(this, t, e), i.lines < this.lines)
      for (let n = 0, s = 0; n < this.children.length; n++) {
        let o = this.children[n], a = s + o.length;
        if (t >= s && e <= a) {
          let h = o.replace(t - s, e - s, i), d = this.lines - o.lines + h.lines;
          if (h.lines < d >> 4 && h.lines > d >> 6) {
            let c = this.children.slice();
            return c[n] = h, new je(c, this.length - (e - t) + i.length);
          }
          return super.replace(s, a, h);
        }
        s = a + 1;
      }
    return super.replace(t, e, i);
  }
  sliceString(t, e = this.length, i = `
`) {
    [t, e] = Pn(this, t, e);
    let n = "";
    for (let s = 0, o = 0; s < this.children.length && o <= e; s++) {
      let a = this.children[s], h = o + a.length;
      o > t && s && (n += i), t < h && e > o && (n += a.sliceString(t - o, e - o, i)), o = h + 1;
    }
    return n;
  }
  flatten(t) {
    for (let e of this.children)
      e.flatten(t);
  }
  scanIdentical(t, e) {
    if (!(t instanceof je))
      return 0;
    let i = 0, [n, s, o, a] = e > 0 ? [0, 0, this.children.length, t.children.length] : [this.children.length - 1, t.children.length - 1, -1, -1];
    for (; ; n += e, s += e) {
      if (n == o || s == a)
        return i;
      let h = this.children[n], d = t.children[s];
      if (h != d)
        return i + h.scanIdentical(d, e);
      i += h.length + 1;
    }
  }
  static from(t, e = t.reduce((i, n) => i + n.length + 1, -1)) {
    let i = 0;
    for (let b of t)
      i += b.lines;
    if (i < 32) {
      let b = [];
      for (let S of t)
        S.flatten(b);
      return new Vt(b, e);
    }
    let n = Math.max(
      32,
      i >> 5
      /* Tree.BranchShift */
    ), s = n << 1, o = n >> 1, a = [], h = 0, d = -1, c = [];
    function p(b) {
      let S;
      if (b.lines > s && b instanceof je)
        for (let E of b.children)
          p(E);
      else b.lines > o && (h > o || !h) ? (m(), a.push(b)) : b instanceof Vt && h && (S = c[c.length - 1]) instanceof Vt && b.lines + S.lines <= 32 ? (h += b.lines, d += b.length + 1, c[c.length - 1] = new Vt(S.text.concat(b.text), S.length + 1 + b.length)) : (h + b.lines > n && m(), h += b.lines, d += b.length + 1, c.push(b));
    }
    function m() {
      h != 0 && (a.push(c.length == 1 ? c[0] : je.from(c, d)), d = -1, h = c.length = 0);
    }
    for (let b of t)
      p(b);
    return m(), a.length == 1 ? a[0] : new je(a, e);
  }
}
pt.empty = /* @__PURE__ */ new Vt([""], 0);
function Fc(r) {
  let t = -1;
  for (let e of r)
    t += e.length + 1;
  return t;
}
function jo(r, t, e = 0, i = 1e9) {
  for (let n = 0, s = 0, o = !0; s < r.length && n <= i; s++) {
    let a = r[s], h = n + a.length;
    h >= e && (h > i && (a = a.slice(0, i - n)), n < e && (a = a.slice(e - n)), o ? (t[t.length - 1] += a, o = !1) : t.push(a)), n = h + 1;
  }
  return t;
}
function oh(r, t, e) {
  return jo(r, [""], t, e);
}
class vr {
  constructor(t, e = 1) {
    this.dir = e, this.done = !1, this.lineBreak = !1, this.value = "", this.nodes = [t], this.offsets = [e > 0 ? 1 : (t instanceof Vt ? t.text.length : t.children.length) << 1];
  }
  nextInner(t, e) {
    for (this.done = this.lineBreak = !1; ; ) {
      let i = this.nodes.length - 1, n = this.nodes[i], s = this.offsets[i], o = s >> 1, a = n instanceof Vt ? n.text.length : n.children.length;
      if (o == (e > 0 ? a : 0)) {
        if (i == 0)
          return this.done = !0, this.value = "", this;
        e > 0 && this.offsets[i - 1]++, this.nodes.pop(), this.offsets.pop();
      } else if ((s & 1) == (e > 0 ? 0 : 1)) {
        if (this.offsets[i] += e, t == 0)
          return this.lineBreak = !0, this.value = `
`, this;
        t--;
      } else if (n instanceof Vt) {
        let h = n.text[o + (e < 0 ? -1 : 0)];
        if (this.offsets[i] += e, h.length > Math.max(0, t))
          return this.value = t == 0 ? h : e > 0 ? h.slice(t) : h.slice(0, h.length - t), this;
        t -= h.length;
      } else {
        let h = n.children[o + (e < 0 ? -1 : 0)];
        t > h.length ? (t -= h.length, this.offsets[i] += e) : (e < 0 && this.offsets[i]--, this.nodes.push(h), this.offsets.push(e > 0 ? 1 : (h instanceof Vt ? h.text.length : h.children.length) << 1));
      }
    }
  }
  next(t = 0) {
    return t < 0 && (this.nextInner(-t, -this.dir), t = this.value.length), this.nextInner(t, this.dir);
  }
}
class Eu {
  constructor(t, e, i) {
    this.value = "", this.done = !1, this.cursor = new vr(t, e > i ? -1 : 1), this.pos = e > i ? t.length : 0, this.from = Math.min(e, i), this.to = Math.max(e, i);
  }
  nextInner(t, e) {
    if (e < 0 ? this.pos <= this.from : this.pos >= this.to)
      return this.value = "", this.done = !0, this;
    t += Math.max(0, e < 0 ? this.pos - this.to : this.from - this.pos);
    let i = e < 0 ? this.pos - this.from : this.to - this.pos;
    t > i && (t = i), i -= t;
    let { value: n } = this.cursor.next(t);
    return this.pos += (n.length + t) * e, this.value = n.length <= i ? n : e < 0 ? n.slice(n.length - i) : n.slice(0, i), this.done = !this.value, this;
  }
  next(t = 0) {
    return t < 0 ? t = Math.max(t, this.from - this.pos) : t > 0 && (t = Math.min(t, this.to - this.pos)), this.nextInner(t, this.cursor.dir);
  }
  get lineBreak() {
    return this.cursor.lineBreak && this.value != "";
  }
}
class Mu {
  constructor(t) {
    this.inner = t, this.afterBreak = !0, this.value = "", this.done = !1;
  }
  next(t = 0) {
    let { done: e, lineBreak: i, value: n } = this.inner.next(t);
    return e && this.afterBreak ? (this.value = "", this.afterBreak = !1) : e ? (this.done = !0, this.value = "") : i ? this.afterBreak ? this.value = "" : (this.afterBreak = !0, this.next()) : (this.value = n, this.afterBreak = !1), this;
  }
  get lineBreak() {
    return !1;
  }
}
typeof Symbol < "u" && (pt.prototype[Symbol.iterator] = function() {
  return this.iter();
}, vr.prototype[Symbol.iterator] = Eu.prototype[Symbol.iterator] = Mu.prototype[Symbol.iterator] = function() {
  return this;
});
class Bc {
  /**
  @internal
  */
  constructor(t, e, i, n) {
    this.from = t, this.to = e, this.number = i, this.text = n;
  }
  /**
  The length of the line (not including any line break after it).
  */
  get length() {
    return this.to - this.from;
  }
}
function Pn(r, t, e) {
  return t = Math.max(0, Math.min(r.length, t)), [t, Math.max(t, Math.min(r.length, e))];
}
function ke(r, t, e = !0, i = !0) {
  return Pc(r, t, e, i);
}
function Vc(r) {
  return r >= 56320 && r < 57344;
}
function Hc(r) {
  return r >= 55296 && r < 56320;
}
function $e(r, t) {
  let e = r.charCodeAt(t);
  if (!Hc(e) || t + 1 == r.length)
    return e;
  let i = r.charCodeAt(t + 1);
  return Vc(i) ? (e - 55296 << 10) + (i - 56320) + 65536 : e;
}
function Ou(r) {
  return r <= 65535 ? String.fromCharCode(r) : (r -= 65536, String.fromCharCode((r >> 10) + 55296, (r & 1023) + 56320));
}
function fi(r) {
  return r < 65536 ? 1 : 2;
}
const $l = /\r\n?|\n/;
var ge = /* @__PURE__ */ function(r) {
  return r[r.Simple = 0] = "Simple", r[r.TrackDel = 1] = "TrackDel", r[r.TrackBefore = 2] = "TrackBefore", r[r.TrackAfter = 3] = "TrackAfter", r;
}(ge || (ge = {}));
class ei {
  // Sections are encoded as pairs of integers. The first is the
  // length in the current document, and the second is -1 for
  // unaffected sections, and the length of the replacement content
  // otherwise. So an insertion would be (0, n>0), a deletion (n>0,
  // 0), and a replacement two positive numbers.
  /**
  @internal
  */
  constructor(t) {
    this.sections = t;
  }
  /**
  The length of the document before the change.
  */
  get length() {
    let t = 0;
    for (let e = 0; e < this.sections.length; e += 2)
      t += this.sections[e];
    return t;
  }
  /**
  The length of the document after the change.
  */
  get newLength() {
    let t = 0;
    for (let e = 0; e < this.sections.length; e += 2) {
      let i = this.sections[e + 1];
      t += i < 0 ? this.sections[e] : i;
    }
    return t;
  }
  /**
  False when there are actual changes in this set.
  */
  get empty() {
    return this.sections.length == 0 || this.sections.length == 2 && this.sections[1] < 0;
  }
  /**
  Iterate over the unchanged parts left by these changes. `posA`
  provides the position of the range in the old document, `posB`
  the new position in the changed document.
  */
  iterGaps(t) {
    for (let e = 0, i = 0, n = 0; e < this.sections.length; ) {
      let s = this.sections[e++], o = this.sections[e++];
      o < 0 ? (t(i, n, s), n += s) : n += o, i += s;
    }
  }
  /**
  Iterate over the ranges changed by these changes. (See
  [`ChangeSet.iterChanges`](https://codemirror.net/6/docs/ref/#state.ChangeSet.iterChanges) for a
  variant that also provides you with the inserted text.)
  `fromA`/`toA` provides the extent of the change in the starting
  document, `fromB`/`toB` the extent of the replacement in the
  changed document.
  
  When `individual` is true, adjacent changes (which are kept
  separate for [position mapping](https://codemirror.net/6/docs/ref/#state.ChangeDesc.mapPos)) are
  reported separately.
  */
  iterChangedRanges(t, e = !1) {
    jl(this, t, e);
  }
  /**
  Get a description of the inverted form of these changes.
  */
  get invertedDesc() {
    let t = [];
    for (let e = 0; e < this.sections.length; ) {
      let i = this.sections[e++], n = this.sections[e++];
      n < 0 ? t.push(i, n) : t.push(n, i);
    }
    return new ei(t);
  }
  /**
  Compute the combined effect of applying another set of changes
  after this one. The length of the document after this set should
  match the length before `other`.
  */
  composeDesc(t) {
    return this.empty ? t : t.empty ? this : Tu(this, t);
  }
  /**
  Map this description, which should start with the same document
  as `other`, over another set of changes, so that it can be
  applied after it. When `before` is true, map as if the changes
  in `this` happened before the ones in `other`.
  */
  mapDesc(t, e = !1) {
    return t.empty ? this : Kl(this, t, e);
  }
  mapPos(t, e = -1, i = ge.Simple) {
    let n = 0, s = 0;
    for (let o = 0; o < this.sections.length; ) {
      let a = this.sections[o++], h = this.sections[o++], d = n + a;
      if (h < 0) {
        if (d > t)
          return s + (t - n);
        s += a;
      } else {
        if (i != ge.Simple && d >= t && (i == ge.TrackDel && n < t && d > t || i == ge.TrackBefore && n < t || i == ge.TrackAfter && d > t))
          return null;
        if (d > t || d == t && e < 0 && !a)
          return t == n || e < 0 ? s : s + h;
        s += h;
      }
      n = d;
    }
    if (t > n)
      throw new RangeError(`Position ${t} is out of range for changeset of length ${n}`);
    return s;
  }
  /**
  Check whether these changes touch a given range. When one of the
  changes entirely covers the range, the string `"cover"` is
  returned.
  */
  touchesRange(t, e = t) {
    for (let i = 0, n = 0; i < this.sections.length && n <= e; ) {
      let s = this.sections[i++], o = this.sections[i++], a = n + s;
      if (o >= 0 && n <= e && a >= t)
        return n < t && a > e ? "cover" : !0;
      n = a;
    }
    return !1;
  }
  /**
  @internal
  */
  toString() {
    let t = "";
    for (let e = 0; e < this.sections.length; ) {
      let i = this.sections[e++], n = this.sections[e++];
      t += (t ? " " : "") + i + (n >= 0 ? ":" + n : "");
    }
    return t;
  }
  /**
  Serialize this change desc to a JSON-representable value.
  */
  toJSON() {
    return this.sections;
  }
  /**
  Create a change desc from its JSON representation (as produced
  by [`toJSON`](https://codemirror.net/6/docs/ref/#state.ChangeDesc.toJSON).
  */
  static fromJSON(t) {
    if (!Array.isArray(t) || t.length % 2 || t.some((e) => typeof e != "number"))
      throw new RangeError("Invalid JSON representation of ChangeDesc");
    return new ei(t);
  }
  /**
  @internal
  */
  static create(t) {
    return new ei(t);
  }
}
class $t extends ei {
  constructor(t, e) {
    super(t), this.inserted = e;
  }
  /**
  Apply the changes to a document, returning the modified
  document.
  */
  apply(t) {
    if (this.length != t.length)
      throw new RangeError("Applying change set to a document with the wrong length");
    return jl(this, (e, i, n, s, o) => t = t.replace(n, n + (i - e), o), !1), t;
  }
  mapDesc(t, e = !1) {
    return Kl(this, t, e, !0);
  }
  /**
  Given the document as it existed _before_ the changes, return a
  change set that represents the inverse of this set, which could
  be used to go from the document created by the changes back to
  the document as it existed before the changes.
  */
  invert(t) {
    let e = this.sections.slice(), i = [];
    for (let n = 0, s = 0; n < e.length; n += 2) {
      let o = e[n], a = e[n + 1];
      if (a >= 0) {
        e[n] = a, e[n + 1] = o;
        let h = n >> 1;
        for (; i.length < h; )
          i.push(pt.empty);
        i.push(o ? t.slice(s, s + o) : pt.empty);
      }
      s += o;
    }
    return new $t(e, i);
  }
  /**
  Combine two subsequent change sets into a single set. `other`
  must start in the document produced by `this`. If `this` goes
  `docA` → `docB` and `other` represents `docB` → `docC`, the
  returned value will represent the change `docA` → `docC`.
  */
  compose(t) {
    return this.empty ? t : t.empty ? this : Tu(this, t, !0);
  }
  /**
  Given another change set starting in the same document, maps this
  change set over the other, producing a new change set that can be
  applied to the document produced by applying `other`. When
  `before` is `true`, order changes as if `this` comes before
  `other`, otherwise (the default) treat `other` as coming first.
  
  Given two changes `A` and `B`, `A.compose(B.map(A))` and
  `B.compose(A.map(B, true))` will produce the same document. This
  provides a basic form of [operational
  transformation](https://en.wikipedia.org/wiki/Operational_transformation),
  and can be used for collaborative editing.
  */
  map(t, e = !1) {
    return t.empty ? this : Kl(this, t, e, !0);
  }
  /**
  Iterate over the changed ranges in the document, calling `f` for
  each, with the range in the original document (`fromA`-`toA`)
  and the range that replaces it in the new document
  (`fromB`-`toB`).
  
  When `individual` is true, adjacent changes are reported
  separately.
  */
  iterChanges(t, e = !1) {
    jl(this, t, e);
  }
  /**
  Get a [change description](https://codemirror.net/6/docs/ref/#state.ChangeDesc) for this change
  set.
  */
  get desc() {
    return ei.create(this.sections);
  }
  /**
  @internal
  */
  filter(t) {
    let e = [], i = [], n = [], s = new kr(this);
    t: for (let o = 0, a = 0; ; ) {
      let h = o == t.length ? 1e9 : t[o++];
      for (; a < h || a == h && s.len == 0; ) {
        if (s.done)
          break t;
        let c = Math.min(s.len, h - a);
        te(n, c, -1);
        let p = s.ins == -1 ? -1 : s.off == 0 ? s.ins : 0;
        te(e, c, p), p > 0 && di(i, e, s.text), s.forward(c), a += c;
      }
      let d = t[o++];
      for (; a < d; ) {
        if (s.done)
          break t;
        let c = Math.min(s.len, d - a);
        te(e, c, -1), te(n, c, s.ins == -1 ? -1 : s.off == 0 ? s.ins : 0), s.forward(c), a += c;
      }
    }
    return {
      changes: new $t(e, i),
      filtered: ei.create(n)
    };
  }
  /**
  Serialize this change set to a JSON-representable value.
  */
  toJSON() {
    let t = [];
    for (let e = 0; e < this.sections.length; e += 2) {
      let i = this.sections[e], n = this.sections[e + 1];
      n < 0 ? t.push(i) : n == 0 ? t.push([i]) : t.push([i].concat(this.inserted[e >> 1].toJSON()));
    }
    return t;
  }
  /**
  Create a change set for the given changes, for a document of the
  given length, using `lineSep` as line separator.
  */
  static of(t, e, i) {
    let n = [], s = [], o = 0, a = null;
    function h(c = !1) {
      if (!c && !n.length)
        return;
      o < e && te(n, e - o, -1);
      let p = new $t(n, s);
      a = a ? a.compose(p.map(a)) : p, n = [], s = [], o = 0;
    }
    function d(c) {
      if (Array.isArray(c))
        for (let p of c)
          d(p);
      else if (c instanceof $t) {
        if (c.length != e)
          throw new RangeError(`Mismatched change set length (got ${c.length}, expected ${e})`);
        h(), a = a ? a.compose(c.map(a)) : c;
      } else {
        let { from: p, to: m = p, insert: b } = c;
        if (p > m || p < 0 || m > e)
          throw new RangeError(`Invalid change range ${p} to ${m} (in doc of length ${e})`);
        let S = b ? typeof b == "string" ? pt.of(b.split(i || $l)) : b : pt.empty, E = S.length;
        if (p == m && E == 0)
          return;
        p < o && h(), p > o && te(n, p - o, -1), te(n, m - p, E), di(s, n, S), o = m;
      }
    }
    return d(t), h(!a), a;
  }
  /**
  Create an empty changeset of the given length.
  */
  static empty(t) {
    return new $t(t ? [t, -1] : [], []);
  }
  /**
  Create a changeset from its JSON representation (as produced by
  [`toJSON`](https://codemirror.net/6/docs/ref/#state.ChangeSet.toJSON).
  */
  static fromJSON(t) {
    if (!Array.isArray(t))
      throw new RangeError("Invalid JSON representation of ChangeSet");
    let e = [], i = [];
    for (let n = 0; n < t.length; n++) {
      let s = t[n];
      if (typeof s == "number")
        e.push(s, -1);
      else {
        if (!Array.isArray(s) || typeof s[0] != "number" || s.some((o, a) => a && typeof o != "string"))
          throw new RangeError("Invalid JSON representation of ChangeSet");
        if (s.length == 1)
          e.push(s[0], 0);
        else {
          for (; i.length < n; )
            i.push(pt.empty);
          i[n] = pt.of(s.slice(1)), e.push(s[0], i[n].length);
        }
      }
    }
    return new $t(e, i);
  }
  /**
  @internal
  */
  static createSet(t, e) {
    return new $t(t, e);
  }
}
function te(r, t, e, i = !1) {
  if (t == 0 && e <= 0)
    return;
  let n = r.length - 2;
  n >= 0 && e <= 0 && e == r[n + 1] ? r[n] += t : n >= 0 && t == 0 && r[n] == 0 ? r[n + 1] += e : i ? (r[n] += t, r[n + 1] += e) : r.push(t, e);
}
function di(r, t, e) {
  if (e.length == 0)
    return;
  let i = t.length - 2 >> 1;
  if (i < r.length)
    r[r.length - 1] = r[r.length - 1].append(e);
  else {
    for (; r.length < i; )
      r.push(pt.empty);
    r.push(e);
  }
}
function jl(r, t, e) {
  let i = r.inserted;
  for (let n = 0, s = 0, o = 0; o < r.sections.length; ) {
    let a = r.sections[o++], h = r.sections[o++];
    if (h < 0)
      n += a, s += a;
    else {
      let d = n, c = s, p = pt.empty;
      for (; d += a, c += h, h && i && (p = p.append(i[o - 2 >> 1])), !(e || o == r.sections.length || r.sections[o + 1] < 0); )
        a = r.sections[o++], h = r.sections[o++];
      t(n, d, s, c, p), n = d, s = c;
    }
  }
}
function Kl(r, t, e, i = !1) {
  let n = [], s = i ? [] : null, o = new kr(r), a = new kr(t);
  for (let h = -1; ; ) {
    if (o.done && a.len || a.done && o.len)
      throw new Error("Mismatched change set lengths");
    if (o.ins == -1 && a.ins == -1) {
      let d = Math.min(o.len, a.len);
      te(n, d, -1), o.forward(d), a.forward(d);
    } else if (a.ins >= 0 && (o.ins < 0 || h == o.i || o.off == 0 && (a.len < o.len || a.len == o.len && !e))) {
      let d = a.len;
      for (te(n, a.ins, -1); d; ) {
        let c = Math.min(o.len, d);
        o.ins >= 0 && h < o.i && o.len <= c && (te(n, 0, o.ins), s && di(s, n, o.text), h = o.i), o.forward(c), d -= c;
      }
      a.next();
    } else if (o.ins >= 0) {
      let d = 0, c = o.len;
      for (; c; )
        if (a.ins == -1) {
          let p = Math.min(c, a.len);
          d += p, c -= p, a.forward(p);
        } else if (a.ins == 0 && a.len < c)
          c -= a.len, a.next();
        else
          break;
      te(n, d, h < o.i ? o.ins : 0), s && h < o.i && di(s, n, o.text), h = o.i, o.forward(o.len - c);
    } else {
      if (o.done && a.done)
        return s ? $t.createSet(n, s) : ei.create(n);
      throw new Error("Mismatched change set lengths");
    }
  }
}
function Tu(r, t, e = !1) {
  let i = [], n = e ? [] : null, s = new kr(r), o = new kr(t);
  for (let a = !1; ; ) {
    if (s.done && o.done)
      return n ? $t.createSet(i, n) : ei.create(i);
    if (s.ins == 0)
      te(i, s.len, 0, a), s.next();
    else if (o.len == 0 && !o.done)
      te(i, 0, o.ins, a), n && di(n, i, o.text), o.next();
    else {
      if (s.done || o.done)
        throw new Error("Mismatched change set lengths");
      {
        let h = Math.min(s.len2, o.len), d = i.length;
        if (s.ins == -1) {
          let c = o.ins == -1 ? -1 : o.off ? 0 : o.ins;
          te(i, h, c, a), n && c && di(n, i, o.text);
        } else o.ins == -1 ? (te(i, s.off ? 0 : s.len, h, a), n && di(n, i, s.textBit(h))) : (te(i, s.off ? 0 : s.len, o.off ? 0 : o.ins, a), n && !o.off && di(n, i, o.text));
        a = (s.ins > h || o.ins >= 0 && o.len > h) && (a || i.length > d), s.forward2(h), o.forward(h);
      }
    }
  }
}
class kr {
  constructor(t) {
    this.set = t, this.i = 0, this.next();
  }
  next() {
    let { sections: t } = this.set;
    this.i < t.length ? (this.len = t[this.i++], this.ins = t[this.i++]) : (this.len = 0, this.ins = -2), this.off = 0;
  }
  get done() {
    return this.ins == -2;
  }
  get len2() {
    return this.ins < 0 ? this.len : this.ins;
  }
  get text() {
    let { inserted: t } = this.set, e = this.i - 2 >> 1;
    return e >= t.length ? pt.empty : t[e];
  }
  textBit(t) {
    let { inserted: e } = this.set, i = this.i - 2 >> 1;
    return i >= e.length && !t ? pt.empty : e[i].slice(this.off, t == null ? void 0 : this.off + t);
  }
  forward(t) {
    t == this.len ? this.next() : (this.len -= t, this.off += t);
  }
  forward2(t) {
    this.ins == -1 ? this.forward(t) : t == this.ins ? this.next() : (this.ins -= t, this.off += t);
  }
}
class Ri {
  constructor(t, e, i) {
    this.from = t, this.to = e, this.flags = i;
  }
  /**
  The anchor of the range—the side that doesn't move when you
  extend it.
  */
  get anchor() {
    return this.flags & 32 ? this.to : this.from;
  }
  /**
  The head of the range, which is moved when the range is
  [extended](https://codemirror.net/6/docs/ref/#state.SelectionRange.extend).
  */
  get head() {
    return this.flags & 32 ? this.from : this.to;
  }
  /**
  True when `anchor` and `head` are at the same position.
  */
  get empty() {
    return this.from == this.to;
  }
  /**
  If this is a cursor that is explicitly associated with the
  character on one of its sides, this returns the side. -1 means
  the character before its position, 1 the character after, and 0
  means no association.
  */
  get assoc() {
    return this.flags & 8 ? -1 : this.flags & 16 ? 1 : 0;
  }
  /**
  The bidirectional text level associated with this cursor, if
  any.
  */
  get bidiLevel() {
    let t = this.flags & 7;
    return t == 7 ? null : t;
  }
  /**
  The goal column (stored vertical offset) associated with a
  cursor. This is used to preserve the vertical position when
  [moving](https://codemirror.net/6/docs/ref/#view.EditorView.moveVertically) across
  lines of different length.
  */
  get goalColumn() {
    let t = this.flags >> 6;
    return t == 16777215 ? void 0 : t;
  }
  /**
  Map this range through a change, producing a valid range in the
  updated document.
  */
  map(t, e = -1) {
    let i, n;
    return this.empty ? i = n = t.mapPos(this.from, e) : (i = t.mapPos(this.from, 1), n = t.mapPos(this.to, -1)), i == this.from && n == this.to ? this : new Ri(i, n, this.flags);
  }
  /**
  Extend this range to cover at least `from` to `to`.
  */
  extend(t, e = t) {
    if (t <= this.anchor && e >= this.anchor)
      return U.range(t, e);
    let i = Math.abs(t - this.anchor) > Math.abs(e - this.anchor) ? t : e;
    return U.range(this.anchor, i);
  }
  /**
  Compare this range to another range.
  */
  eq(t, e = !1) {
    return this.anchor == t.anchor && this.head == t.head && (!e || !this.empty || this.assoc == t.assoc);
  }
  /**
  Return a JSON-serializable object representing the range.
  */
  toJSON() {
    return { anchor: this.anchor, head: this.head };
  }
  /**
  Convert a JSON representation of a range to a `SelectionRange`
  instance.
  */
  static fromJSON(t) {
    if (!t || typeof t.anchor != "number" || typeof t.head != "number")
      throw new RangeError("Invalid JSON representation for SelectionRange");
    return U.range(t.anchor, t.head);
  }
  /**
  @internal
  */
  static create(t, e, i) {
    return new Ri(t, e, i);
  }
}
class U {
  constructor(t, e) {
    this.ranges = t, this.mainIndex = e;
  }
  /**
  Map a selection through a change. Used to adjust the selection
  position for changes.
  */
  map(t, e = -1) {
    return t.empty ? this : U.create(this.ranges.map((i) => i.map(t, e)), this.mainIndex);
  }
  /**
  Compare this selection to another selection. By default, ranges
  are compared only by position. When `includeAssoc` is true,
  cursor ranges must also have the same
  [`assoc`](https://codemirror.net/6/docs/ref/#state.SelectionRange.assoc) value.
  */
  eq(t, e = !1) {
    if (this.ranges.length != t.ranges.length || this.mainIndex != t.mainIndex)
      return !1;
    for (let i = 0; i < this.ranges.length; i++)
      if (!this.ranges[i].eq(t.ranges[i], e))
        return !1;
    return !0;
  }
  /**
  Get the primary selection range. Usually, you should make sure
  your code applies to _all_ ranges, by using methods like
  [`changeByRange`](https://codemirror.net/6/docs/ref/#state.EditorState.changeByRange).
  */
  get main() {
    return this.ranges[this.mainIndex];
  }
  /**
  Make sure the selection only has one range. Returns a selection
  holding only the main range from this selection.
  */
  asSingle() {
    return this.ranges.length == 1 ? this : new U([this.main], 0);
  }
  /**
  Extend this selection with an extra range.
  */
  addRange(t, e = !0) {
    return U.create([t].concat(this.ranges), e ? 0 : this.mainIndex + 1);
  }
  /**
  Replace a given range with another range, and then normalize the
  selection to merge and sort ranges if necessary.
  */
  replaceRange(t, e = this.mainIndex) {
    let i = this.ranges.slice();
    return i[e] = t, U.create(i, this.mainIndex);
  }
  /**
  Convert this selection to an object that can be serialized to
  JSON.
  */
  toJSON() {
    return { ranges: this.ranges.map((t) => t.toJSON()), main: this.mainIndex };
  }
  /**
  Create a selection from a JSON representation.
  */
  static fromJSON(t) {
    if (!t || !Array.isArray(t.ranges) || typeof t.main != "number" || t.main >= t.ranges.length)
      throw new RangeError("Invalid JSON representation for EditorSelection");
    return new U(t.ranges.map((e) => Ri.fromJSON(e)), t.main);
  }
  /**
  Create a selection holding a single range.
  */
  static single(t, e = t) {
    return new U([U.range(t, e)], 0);
  }
  /**
  Sort and merge the given set of ranges, creating a valid
  selection.
  */
  static create(t, e = 0) {
    if (t.length == 0)
      throw new RangeError("A selection needs at least one range");
    for (let i = 0, n = 0; n < t.length; n++) {
      let s = t[n];
      if (s.empty ? s.from <= i : s.from < i)
        return U.normalized(t.slice(), e);
      i = s.to;
    }
    return new U(t, e);
  }
  /**
  Create a cursor selection range at the given position. You can
  safely ignore the optional arguments in most situations.
  */
  static cursor(t, e = 0, i, n) {
    return Ri.create(t, t, (e == 0 ? 0 : e < 0 ? 8 : 16) | (i == null ? 7 : Math.min(6, i)) | (n ?? 16777215) << 6);
  }
  /**
  Create a selection range.
  */
  static range(t, e, i, n) {
    let s = (i ?? 16777215) << 6 | (n == null ? 7 : Math.min(6, n));
    return e < t ? Ri.create(e, t, 48 | s) : Ri.create(t, e, (e > t ? 8 : 0) | s);
  }
  /**
  @internal
  */
  static normalized(t, e = 0) {
    let i = t[e];
    t.sort((n, s) => n.from - s.from), e = t.indexOf(i);
    for (let n = 1; n < t.length; n++) {
      let s = t[n], o = t[n - 1];
      if (s.empty ? s.from <= o.to : s.from < o.to) {
        let a = o.from, h = Math.max(s.to, o.to);
        n <= e && e--, t.splice(--n, 2, s.anchor > s.head ? U.range(h, a) : U.range(a, h));
      }
    }
    return new U(t, e);
  }
}
function xu(r, t) {
  for (let e of r.ranges)
    if (e.to > t)
      throw new RangeError("Selection points outside of document");
}
let Ca = 0;
class Z {
  constructor(t, e, i, n, s) {
    this.combine = t, this.compareInput = e, this.compare = i, this.isStatic = n, this.id = Ca++, this.default = t([]), this.extensions = typeof s == "function" ? s(this) : s;
  }
  /**
  Returns a facet reader for this facet, which can be used to
  [read](https://codemirror.net/6/docs/ref/#state.EditorState.facet) it but not to define values for it.
  */
  get reader() {
    return this;
  }
  /**
  Define a new facet.
  */
  static define(t = {}) {
    return new Z(t.combine || ((e) => e), t.compareInput || ((e, i) => e === i), t.compare || (t.combine ? (e, i) => e === i : Ea), !!t.static, t.enables);
  }
  /**
  Returns an extension that adds the given value to this facet.
  */
  of(t) {
    return new Ko([], this, 0, t);
  }
  /**
  Create an extension that computes a value for the facet from a
  state. You must take care to declare the parts of the state that
  this value depends on, since your function is only called again
  for a new state when one of those parts changed.
  
  In cases where your value depends only on a single field, you'll
  want to use the [`from`](https://codemirror.net/6/docs/ref/#state.Facet.from) method instead.
  */
  compute(t, e) {
    if (this.isStatic)
      throw new Error("Can't compute a static facet");
    return new Ko(t, this, 1, e);
  }
  /**
  Create an extension that computes zero or more values for this
  facet from a state.
  */
  computeN(t, e) {
    if (this.isStatic)
      throw new Error("Can't compute a static facet");
    return new Ko(t, this, 2, e);
  }
  from(t, e) {
    return e || (e = (i) => i), this.compute([t], (i) => e(i.field(t)));
  }
}
function Ea(r, t) {
  return r == t || r.length == t.length && r.every((e, i) => e === t[i]);
}
class Ko {
  constructor(t, e, i, n) {
    this.dependencies = t, this.facet = e, this.type = i, this.value = n, this.id = Ca++;
  }
  dynamicSlot(t) {
    var e;
    let i = this.value, n = this.facet.compareInput, s = this.id, o = t[s] >> 1, a = this.type == 2, h = !1, d = !1, c = [];
    for (let p of this.dependencies)
      p == "doc" ? h = !0 : p == "selection" ? d = !0 : ((e = t[p.id]) !== null && e !== void 0 ? e : 1) & 1 || c.push(t[p.id]);
    return {
      create(p) {
        return p.values[o] = i(p), 1;
      },
      update(p, m) {
        if (h && m.docChanged || d && (m.docChanged || m.selection) || ql(p, c)) {
          let b = i(p);
          if (a ? !lh(b, p.values[o], n) : !n(b, p.values[o]))
            return p.values[o] = b, 1;
        }
        return 0;
      },
      reconfigure: (p, m) => {
        let b, S = m.config.address[s];
        if (S != null) {
          let E = Zo(m, S);
          if (this.dependencies.every((w) => w instanceof Z ? m.facet(w) === p.facet(w) : w instanceof si ? m.field(w, !1) == p.field(w, !1) : !0) || (a ? lh(b = i(p), E, n) : n(b = i(p), E)))
            return p.values[o] = E, 0;
        } else
          b = i(p);
        return p.values[o] = b, 1;
      }
    };
  }
}
function lh(r, t, e) {
  if (r.length != t.length)
    return !1;
  for (let i = 0; i < r.length; i++)
    if (!e(r[i], t[i]))
      return !1;
  return !0;
}
function ql(r, t) {
  let e = !1;
  for (let i of t)
    wr(r, i) & 1 && (e = !0);
  return e;
}
function Wc(r, t, e) {
  let i = e.map((h) => r[h.id]), n = e.map((h) => h.type), s = i.filter((h) => !(h & 1)), o = r[t.id] >> 1;
  function a(h) {
    let d = [];
    for (let c = 0; c < i.length; c++) {
      let p = Zo(h, i[c]);
      if (n[c] == 2)
        for (let m of p)
          d.push(m);
      else
        d.push(p);
    }
    return t.combine(d);
  }
  return {
    create(h) {
      for (let d of i)
        wr(h, d);
      return h.values[o] = a(h), 1;
    },
    update(h, d) {
      if (!ql(h, s))
        return 0;
      let c = a(h);
      return t.compare(c, h.values[o]) ? 0 : (h.values[o] = c, 1);
    },
    reconfigure(h, d) {
      let c = ql(h, i), p = d.config.facets[t.id], m = d.facet(t);
      if (p && !c && Ea(e, p))
        return h.values[o] = m, 0;
      let b = a(h);
      return t.compare(b, m) ? (h.values[o] = m, 0) : (h.values[o] = b, 1);
    }
  };
}
const ah = /* @__PURE__ */ Z.define({ static: !0 });
class si {
  constructor(t, e, i, n, s) {
    this.id = t, this.createF = e, this.updateF = i, this.compareF = n, this.spec = s, this.provides = void 0;
  }
  /**
  Define a state field.
  */
  static define(t) {
    let e = new si(Ca++, t.create, t.update, t.compare || ((i, n) => i === n), t);
    return t.provide && (e.provides = t.provide(e)), e;
  }
  create(t) {
    let e = t.facet(ah).find((i) => i.field == this);
    return ((e == null ? void 0 : e.create) || this.createF)(t);
  }
  /**
  @internal
  */
  slot(t) {
    let e = t[this.id] >> 1;
    return {
      create: (i) => (i.values[e] = this.create(i), 1),
      update: (i, n) => {
        let s = i.values[e], o = this.updateF(s, n);
        return this.compareF(s, o) ? 0 : (i.values[e] = o, 1);
      },
      reconfigure: (i, n) => n.config.address[this.id] != null ? (i.values[e] = n.field(this), 0) : (i.values[e] = this.create(i), 1)
    };
  }
  /**
  Returns an extension that enables this field and overrides the
  way it is initialized. Can be useful when you need to provide a
  non-default starting value for the field.
  */
  init(t) {
    return [this, ah.of({ field: this, create: t })];
  }
  /**
  State field instances can be used as
  [`Extension`](https://codemirror.net/6/docs/ref/#state.Extension) values to enable the field in a
  given state.
  */
  get extension() {
    return this;
  }
}
const Di = { lowest: 4, low: 3, default: 2, high: 1, highest: 0 };
function ar(r) {
  return (t) => new Du(t, r);
}
const fl = {
  /**
  The highest precedence level, for extensions that should end up
  near the start of the precedence ordering.
  */
  highest: /* @__PURE__ */ ar(Di.highest),
  /**
  A higher-than-default precedence, for extensions that should
  come before those with default precedence.
  */
  high: /* @__PURE__ */ ar(Di.high),
  /**
  The default precedence, which is also used for extensions
  without an explicit precedence.
  */
  default: /* @__PURE__ */ ar(Di.default),
  /**
  A lower-than-default precedence.
  */
  low: /* @__PURE__ */ ar(Di.low),
  /**
  The lowest precedence level. Meant for things that should end up
  near the end of the extension order.
  */
  lowest: /* @__PURE__ */ ar(Di.lowest)
};
class Du {
  constructor(t, e) {
    this.inner = t, this.prec = e;
  }
}
class cl {
  /**
  Create an instance of this compartment to add to your [state
  configuration](https://codemirror.net/6/docs/ref/#state.EditorStateConfig.extensions).
  */
  of(t) {
    return new Yl(this, t);
  }
  /**
  Create an [effect](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) that
  reconfigures this compartment.
  */
  reconfigure(t) {
    return cl.reconfigure.of({ compartment: this, extension: t });
  }
  /**
  Get the current content of the compartment in the state, or
  `undefined` if it isn't present.
  */
  get(t) {
    return t.config.compartments.get(this);
  }
}
class Yl {
  constructor(t, e) {
    this.compartment = t, this.inner = e;
  }
}
class Qo {
  constructor(t, e, i, n, s, o) {
    for (this.base = t, this.compartments = e, this.dynamicSlots = i, this.address = n, this.staticValues = s, this.facets = o, this.statusTemplate = []; this.statusTemplate.length < i.length; )
      this.statusTemplate.push(
        0
        /* SlotStatus.Unresolved */
      );
  }
  staticFacet(t) {
    let e = this.address[t.id];
    return e == null ? t.default : this.staticValues[e >> 1];
  }
  static resolve(t, e, i) {
    let n = [], s = /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ new Map();
    for (let m of Uc(t, e, o))
      m instanceof si ? n.push(m) : (s[m.facet.id] || (s[m.facet.id] = [])).push(m);
    let a = /* @__PURE__ */ Object.create(null), h = [], d = [];
    for (let m of n)
      a[m.id] = d.length << 1, d.push((b) => m.slot(b));
    let c = i == null ? void 0 : i.config.facets;
    for (let m in s) {
      let b = s[m], S = b[0].facet, E = c && c[m] || [];
      if (b.every(
        (w) => w.type == 0
        /* Provider.Static */
      ))
        if (a[S.id] = h.length << 1 | 1, Ea(E, b))
          h.push(i.facet(S));
        else {
          let w = S.combine(b.map((M) => M.value));
          h.push(i && S.compare(w, i.facet(S)) ? i.facet(S) : w);
        }
      else {
        for (let w of b)
          w.type == 0 ? (a[w.id] = h.length << 1 | 1, h.push(w.value)) : (a[w.id] = d.length << 1, d.push((M) => w.dynamicSlot(M)));
        a[S.id] = d.length << 1, d.push((w) => Wc(w, S, b));
      }
    }
    let p = d.map((m) => m(a));
    return new Qo(t, o, p, a, h, s);
  }
}
function Uc(r, t, e) {
  let i = [[], [], [], [], []], n = /* @__PURE__ */ new Map();
  function s(o, a) {
    let h = n.get(o);
    if (h != null) {
      if (h <= a)
        return;
      let d = i[h].indexOf(o);
      d > -1 && i[h].splice(d, 1), o instanceof Yl && e.delete(o.compartment);
    }
    if (n.set(o, a), Array.isArray(o))
      for (let d of o)
        s(d, a);
    else if (o instanceof Yl) {
      if (e.has(o.compartment))
        throw new RangeError("Duplicate use of compartment in extensions");
      let d = t.get(o.compartment) || o.inner;
      e.set(o.compartment, d), s(d, a);
    } else if (o instanceof Du)
      s(o.inner, o.prec);
    else if (o instanceof si)
      i[a].push(o), o.provides && s(o.provides, a);
    else if (o instanceof Ko)
      i[a].push(o), o.facet.extensions && s(o.facet.extensions, Di.default);
    else {
      let d = o.extension;
      if (!d)
        throw new Error(`Unrecognized extension value in extension set (${o}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);
      s(d, a);
    }
  }
  return s(r, Di.default), i.reduce((o, a) => o.concat(a));
}
function wr(r, t) {
  if (t & 1)
    return 2;
  let e = t >> 1, i = r.status[e];
  if (i == 4)
    throw new Error("Cyclic dependency between fields and/or facets");
  if (i & 2)
    return i;
  r.status[e] = 4;
  let n = r.computeSlot(r, r.config.dynamicSlots[e]);
  return r.status[e] = 2 | n;
}
function Zo(r, t) {
  return t & 1 ? r.config.staticValues[t >> 1] : r.values[t >> 1];
}
const Ru = /* @__PURE__ */ Z.define(), Gl = /* @__PURE__ */ Z.define({
  combine: (r) => r.some((t) => t),
  static: !0
}), Nu = /* @__PURE__ */ Z.define({
  combine: (r) => r.length ? r[0] : void 0,
  static: !0
}), Iu = /* @__PURE__ */ Z.define(), Pu = /* @__PURE__ */ Z.define(), Lu = /* @__PURE__ */ Z.define(), Fu = /* @__PURE__ */ Z.define({
  combine: (r) => r.length ? r[0] : !1
});
class Wi {
  /**
  @internal
  */
  constructor(t, e) {
    this.type = t, this.value = e;
  }
  /**
  Define a new type of annotation.
  */
  static define() {
    return new zc();
  }
}
class zc {
  /**
  Create an instance of this annotation.
  */
  of(t) {
    return new Wi(this, t);
  }
}
class _c {
  /**
  @internal
  */
  constructor(t) {
    this.map = t;
  }
  /**
  Create a [state effect](https://codemirror.net/6/docs/ref/#state.StateEffect) instance of this
  type.
  */
  of(t) {
    return new Rt(this, t);
  }
}
class Rt {
  /**
  @internal
  */
  constructor(t, e) {
    this.type = t, this.value = e;
  }
  /**
  Map this effect through a position mapping. Will return
  `undefined` when that ends up deleting the effect.
  */
  map(t) {
    let e = this.type.map(this.value, t);
    return e === void 0 ? void 0 : e == this.value ? this : new Rt(this.type, e);
  }
  /**
  Tells you whether this effect object is of a given
  [type](https://codemirror.net/6/docs/ref/#state.StateEffectType).
  */
  is(t) {
    return this.type == t;
  }
  /**
  Define a new effect type. The type parameter indicates the type
  of values that his effect holds. It should be a type that
  doesn't include `undefined`, since that is used in
  [mapping](https://codemirror.net/6/docs/ref/#state.StateEffect.map) to indicate that an effect is
  removed.
  */
  static define(t = {}) {
    return new _c(t.map || ((e) => e));
  }
  /**
  Map an array of effects through a change set.
  */
  static mapEffects(t, e) {
    if (!t.length)
      return t;
    let i = [];
    for (let n of t) {
      let s = n.map(e);
      s && i.push(s);
    }
    return i;
  }
}
Rt.reconfigure = /* @__PURE__ */ Rt.define();
Rt.appendConfig = /* @__PURE__ */ Rt.define();
class ie {
  constructor(t, e, i, n, s, o) {
    this.startState = t, this.changes = e, this.selection = i, this.effects = n, this.annotations = s, this.scrollIntoView = o, this._doc = null, this._state = null, i && xu(i, e.newLength), s.some((a) => a.type == ie.time) || (this.annotations = s.concat(ie.time.of(Date.now())));
  }
  /**
  @internal
  */
  static create(t, e, i, n, s, o) {
    return new ie(t, e, i, n, s, o);
  }
  /**
  The new document produced by the transaction. Contrary to
  [`.state`](https://codemirror.net/6/docs/ref/#state.Transaction.state)`.doc`, accessing this won't
  force the entire new state to be computed right away, so it is
  recommended that [transaction
  filters](https://codemirror.net/6/docs/ref/#state.EditorState^transactionFilter) use this getter
  when they need to look at the new document.
  */
  get newDoc() {
    return this._doc || (this._doc = this.changes.apply(this.startState.doc));
  }
  /**
  The new selection produced by the transaction. If
  [`this.selection`](https://codemirror.net/6/docs/ref/#state.Transaction.selection) is undefined,
  this will [map](https://codemirror.net/6/docs/ref/#state.EditorSelection.map) the start state's
  current selection through the changes made by the transaction.
  */
  get newSelection() {
    return this.selection || this.startState.selection.map(this.changes);
  }
  /**
  The new state created by the transaction. Computed on demand
  (but retained for subsequent access), so it is recommended not to
  access it in [transaction
  filters](https://codemirror.net/6/docs/ref/#state.EditorState^transactionFilter) when possible.
  */
  get state() {
    return this._state || this.startState.applyTransaction(this), this._state;
  }
  /**
  Get the value of the given annotation type, if any.
  */
  annotation(t) {
    for (let e of this.annotations)
      if (e.type == t)
        return e.value;
  }
  /**
  Indicates whether the transaction changed the document.
  */
  get docChanged() {
    return !this.changes.empty;
  }
  /**
  Indicates whether this transaction reconfigures the state
  (through a [configuration compartment](https://codemirror.net/6/docs/ref/#state.Compartment) or
  with a top-level configuration
  [effect](https://codemirror.net/6/docs/ref/#state.StateEffect^reconfigure).
  */
  get reconfigured() {
    return this.startState.config != this.state.config;
  }
  /**
  Returns true if the transaction has a [user
  event](https://codemirror.net/6/docs/ref/#state.Transaction^userEvent) annotation that is equal to
  or more specific than `event`. For example, if the transaction
  has `"select.pointer"` as user event, `"select"` and
  `"select.pointer"` will match it.
  */
  isUserEvent(t) {
    let e = this.annotation(ie.userEvent);
    return !!(e && (e == t || e.length > t.length && e.slice(0, t.length) == t && e[t.length] == "."));
  }
}
ie.time = /* @__PURE__ */ Wi.define();
ie.userEvent = /* @__PURE__ */ Wi.define();
ie.addToHistory = /* @__PURE__ */ Wi.define();
ie.remote = /* @__PURE__ */ Wi.define();
function $c(r, t) {
  let e = [];
  for (let i = 0, n = 0; ; ) {
    let s, o;
    if (i < r.length && (n == t.length || t[n] >= r[i]))
      s = r[i++], o = r[i++];
    else if (n < t.length)
      s = t[n++], o = t[n++];
    else
      return e;
    !e.length || e[e.length - 1] < s ? e.push(s, o) : e[e.length - 1] < o && (e[e.length - 1] = o);
  }
}
function Bu(r, t, e) {
  var i;
  let n, s, o;
  return e ? (n = t.changes, s = $t.empty(t.changes.length), o = r.changes.compose(t.changes)) : (n = t.changes.map(r.changes), s = r.changes.mapDesc(t.changes, !0), o = r.changes.compose(n)), {
    changes: o,
    selection: t.selection ? t.selection.map(s) : (i = r.selection) === null || i === void 0 ? void 0 : i.map(n),
    effects: Rt.mapEffects(r.effects, n).concat(Rt.mapEffects(t.effects, s)),
    annotations: r.annotations.length ? r.annotations.concat(t.annotations) : t.annotations,
    scrollIntoView: r.scrollIntoView || t.scrollIntoView
  };
}
function Jl(r, t, e) {
  let i = t.selection, n = Dn(t.annotations);
  return t.userEvent && (n = n.concat(ie.userEvent.of(t.userEvent))), {
    changes: t.changes instanceof $t ? t.changes : $t.of(t.changes || [], e, r.facet(Nu)),
    selection: i && (i instanceof U ? i : U.single(i.anchor, i.head)),
    effects: Dn(t.effects),
    annotations: n,
    scrollIntoView: !!t.scrollIntoView
  };
}
function Vu(r, t, e) {
  let i = Jl(r, t.length ? t[0] : {}, r.doc.length);
  t.length && t[0].filter === !1 && (e = !1);
  for (let s = 1; s < t.length; s++) {
    t[s].filter === !1 && (e = !1);
    let o = !!t[s].sequential;
    i = Bu(i, Jl(r, t[s], o ? i.changes.newLength : r.doc.length), o);
  }
  let n = ie.create(r, i.changes, i.selection, i.effects, i.annotations, i.scrollIntoView);
  return Kc(e ? jc(n) : n);
}
function jc(r) {
  let t = r.startState, e = !0;
  for (let n of t.facet(Iu)) {
    let s = n(r);
    if (s === !1) {
      e = !1;
      break;
    }
    Array.isArray(s) && (e = e === !0 ? s : $c(e, s));
  }
  if (e !== !0) {
    let n, s;
    if (e === !1)
      s = r.changes.invertedDesc, n = $t.empty(t.doc.length);
    else {
      let o = r.changes.filter(e);
      n = o.changes, s = o.filtered.mapDesc(o.changes).invertedDesc;
    }
    r = ie.create(t, n, r.selection && r.selection.map(s), Rt.mapEffects(r.effects, s), r.annotations, r.scrollIntoView);
  }
  let i = t.facet(Pu);
  for (let n = i.length - 1; n >= 0; n--) {
    let s = i[n](r);
    s instanceof ie ? r = s : Array.isArray(s) && s.length == 1 && s[0] instanceof ie ? r = s[0] : r = Vu(t, Dn(s), !1);
  }
  return r;
}
function Kc(r) {
  let t = r.startState, e = t.facet(Lu), i = r;
  for (let n = e.length - 1; n >= 0; n--) {
    let s = e[n](r);
    s && Object.keys(s).length && (i = Bu(i, Jl(t, s, r.changes.newLength), !0));
  }
  return i == r ? r : ie.create(t, r.changes, r.selection, i.effects, i.annotations, i.scrollIntoView);
}
const qc = [];
function Dn(r) {
  return r == null ? qc : Array.isArray(r) ? r : [r];
}
var Ce = /* @__PURE__ */ function(r) {
  return r[r.Word = 0] = "Word", r[r.Space = 1] = "Space", r[r.Other = 2] = "Other", r;
}(Ce || (Ce = {}));
const Yc = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
let Xl;
try {
  Xl = /* @__PURE__ */ new RegExp("[\\p{Alphabetic}\\p{Number}_]", "u");
} catch {
}
function Gc(r) {
  if (Xl)
    return Xl.test(r);
  for (let t = 0; t < r.length; t++) {
    let e = r[t];
    if (/\w/.test(e) || e > "" && (e.toUpperCase() != e.toLowerCase() || Yc.test(e)))
      return !0;
  }
  return !1;
}
function Jc(r) {
  return (t) => {
    if (!/\S/.test(t))
      return Ce.Space;
    if (Gc(t))
      return Ce.Word;
    for (let e = 0; e < r.length; e++)
      if (t.indexOf(r[e]) > -1)
        return Ce.Word;
    return Ce.Other;
  };
}
class bt {
  constructor(t, e, i, n, s, o) {
    this.config = t, this.doc = e, this.selection = i, this.values = n, this.status = t.statusTemplate.slice(), this.computeSlot = s, o && (o._state = this);
    for (let a = 0; a < this.config.dynamicSlots.length; a++)
      wr(this, a << 1);
    this.computeSlot = null;
  }
  field(t, e = !0) {
    let i = this.config.address[t.id];
    if (i == null) {
      if (e)
        throw new RangeError("Field is not present in this state");
      return;
    }
    return wr(this, i), Zo(this, i);
  }
  /**
  Create a [transaction](https://codemirror.net/6/docs/ref/#state.Transaction) that updates this
  state. Any number of [transaction specs](https://codemirror.net/6/docs/ref/#state.TransactionSpec)
  can be passed. Unless
  [`sequential`](https://codemirror.net/6/docs/ref/#state.TransactionSpec.sequential) is set, the
  [changes](https://codemirror.net/6/docs/ref/#state.TransactionSpec.changes) (if any) of each spec
  are assumed to start in the _current_ document (not the document
  produced by previous specs), and its
  [selection](https://codemirror.net/6/docs/ref/#state.TransactionSpec.selection) and
  [effects](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) are assumed to refer
  to the document created by its _own_ changes. The resulting
  transaction contains the combined effect of all the different
  specs. For [selection](https://codemirror.net/6/docs/ref/#state.TransactionSpec.selection), later
  specs take precedence over earlier ones.
  */
  update(...t) {
    return Vu(this, t, !0);
  }
  /**
  @internal
  */
  applyTransaction(t) {
    let e = this.config, { base: i, compartments: n } = e;
    for (let a of t.effects)
      a.is(cl.reconfigure) ? (e && (n = /* @__PURE__ */ new Map(), e.compartments.forEach((h, d) => n.set(d, h)), e = null), n.set(a.value.compartment, a.value.extension)) : a.is(Rt.reconfigure) ? (e = null, i = a.value) : a.is(Rt.appendConfig) && (e = null, i = Dn(i).concat(a.value));
    let s;
    e ? s = t.startState.values.slice() : (e = Qo.resolve(i, n, this), s = new bt(e, this.doc, this.selection, e.dynamicSlots.map(() => null), (h, d) => d.reconfigure(h, this), null).values);
    let o = t.startState.facet(Gl) ? t.newSelection : t.newSelection.asSingle();
    new bt(e, t.newDoc, o, s, (a, h) => h.update(a, t), t);
  }
  /**
  Create a [transaction spec](https://codemirror.net/6/docs/ref/#state.TransactionSpec) that
  replaces every selection range with the given content.
  */
  replaceSelection(t) {
    return typeof t == "string" && (t = this.toText(t)), this.changeByRange((e) => ({
      changes: { from: e.from, to: e.to, insert: t },
      range: U.cursor(e.from + t.length)
    }));
  }
  /**
  Create a set of changes and a new selection by running the given
  function for each range in the active selection. The function
  can return an optional set of changes (in the coordinate space
  of the start document), plus an updated range (in the coordinate
  space of the document produced by the call's own changes). This
  method will merge all the changes and ranges into a single
  changeset and selection, and return it as a [transaction
  spec](https://codemirror.net/6/docs/ref/#state.TransactionSpec), which can be passed to
  [`update`](https://codemirror.net/6/docs/ref/#state.EditorState.update).
  */
  changeByRange(t) {
    let e = this.selection, i = t(e.ranges[0]), n = this.changes(i.changes), s = [i.range], o = Dn(i.effects);
    for (let a = 1; a < e.ranges.length; a++) {
      let h = t(e.ranges[a]), d = this.changes(h.changes), c = d.map(n);
      for (let m = 0; m < a; m++)
        s[m] = s[m].map(c);
      let p = n.mapDesc(d, !0);
      s.push(h.range.map(p)), n = n.compose(c), o = Rt.mapEffects(o, c).concat(Rt.mapEffects(Dn(h.effects), p));
    }
    return {
      changes: n,
      selection: U.create(s, e.mainIndex),
      effects: o
    };
  }
  /**
  Create a [change set](https://codemirror.net/6/docs/ref/#state.ChangeSet) from the given change
  description, taking the state's document length and line
  separator into account.
  */
  changes(t = []) {
    return t instanceof $t ? t : $t.of(t, this.doc.length, this.facet(bt.lineSeparator));
  }
  /**
  Using the state's [line
  separator](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator), create a
  [`Text`](https://codemirror.net/6/docs/ref/#state.Text) instance from the given string.
  */
  toText(t) {
    return pt.of(t.split(this.facet(bt.lineSeparator) || $l));
  }
  /**
  Return the given range of the document as a string.
  */
  sliceDoc(t = 0, e = this.doc.length) {
    return this.doc.sliceString(t, e, this.lineBreak);
  }
  /**
  Get the value of a state [facet](https://codemirror.net/6/docs/ref/#state.Facet).
  */
  facet(t) {
    let e = this.config.address[t.id];
    return e == null ? t.default : (wr(this, e), Zo(this, e));
  }
  /**
  Convert this state to a JSON-serializable object. When custom
  fields should be serialized, you can pass them in as an object
  mapping property names (in the resulting object, which should
  not use `doc` or `selection`) to fields.
  */
  toJSON(t) {
    let e = {
      doc: this.sliceDoc(),
      selection: this.selection.toJSON()
    };
    if (t)
      for (let i in t) {
        let n = t[i];
        n instanceof si && this.config.address[n.id] != null && (e[i] = n.spec.toJSON(this.field(t[i]), this));
      }
    return e;
  }
  /**
  Deserialize a state from its JSON representation. When custom
  fields should be deserialized, pass the same object you passed
  to [`toJSON`](https://codemirror.net/6/docs/ref/#state.EditorState.toJSON) when serializing as
  third argument.
  */
  static fromJSON(t, e = {}, i) {
    if (!t || typeof t.doc != "string")
      throw new RangeError("Invalid JSON representation for EditorState");
    let n = [];
    if (i) {
      for (let s in i)
        if (Object.prototype.hasOwnProperty.call(t, s)) {
          let o = i[s], a = t[s];
          n.push(o.init((h) => o.spec.fromJSON(a, h)));
        }
    }
    return bt.create({
      doc: t.doc,
      selection: U.fromJSON(t.selection),
      extensions: e.extensions ? n.concat([e.extensions]) : n
    });
  }
  /**
  Create a new state. You'll usually only need this when
  initializing an editor—updated states are created by applying
  transactions.
  */
  static create(t = {}) {
    let e = Qo.resolve(t.extensions || [], /* @__PURE__ */ new Map()), i = t.doc instanceof pt ? t.doc : pt.of((t.doc || "").split(e.staticFacet(bt.lineSeparator) || $l)), n = t.selection ? t.selection instanceof U ? t.selection : U.single(t.selection.anchor, t.selection.head) : U.single(0);
    return xu(n, i.length), e.staticFacet(Gl) || (n = n.asSingle()), new bt(e, i, n, e.dynamicSlots.map(() => null), (s, o) => o.create(s), null);
  }
  /**
  The size (in columns) of a tab in the document, determined by
  the [`tabSize`](https://codemirror.net/6/docs/ref/#state.EditorState^tabSize) facet.
  */
  get tabSize() {
    return this.facet(bt.tabSize);
  }
  /**
  Get the proper [line-break](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator)
  string for this state.
  */
  get lineBreak() {
    return this.facet(bt.lineSeparator) || `
`;
  }
  /**
  Returns true when the editor is
  [configured](https://codemirror.net/6/docs/ref/#state.EditorState^readOnly) to be read-only.
  */
  get readOnly() {
    return this.facet(Fu);
  }
  /**
  Look up a translation for the given phrase (via the
  [`phrases`](https://codemirror.net/6/docs/ref/#state.EditorState^phrases) facet), or return the
  original string if no translation is found.
  
  If additional arguments are passed, they will be inserted in
  place of markers like `$1` (for the first value) and `$2`, etc.
  A single `$` is equivalent to `$1`, and `$$` will produce a
  literal dollar sign.
  */
  phrase(t, ...e) {
    for (let i of this.facet(bt.phrases))
      if (Object.prototype.hasOwnProperty.call(i, t)) {
        t = i[t];
        break;
      }
    return e.length && (t = t.replace(/\$(\$|\d*)/g, (i, n) => {
      if (n == "$")
        return "$";
      let s = +(n || 1);
      return !s || s > e.length ? i : e[s - 1];
    })), t;
  }
  /**
  Find the values for a given language data field, provided by the
  the [`languageData`](https://codemirror.net/6/docs/ref/#state.EditorState^languageData) facet.
  
  Examples of language data fields are...
  
  - [`"commentTokens"`](https://codemirror.net/6/docs/ref/#commands.CommentTokens) for specifying
    comment syntax.
  - [`"autocomplete"`](https://codemirror.net/6/docs/ref/#autocomplete.autocompletion^config.override)
    for providing language-specific completion sources.
  - [`"wordChars"`](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) for adding
    characters that should be considered part of words in this
    language.
  - [`"closeBrackets"`](https://codemirror.net/6/docs/ref/#autocomplete.CloseBracketConfig) controls
    bracket closing behavior.
  */
  languageDataAt(t, e, i = -1) {
    let n = [];
    for (let s of this.facet(Ru))
      for (let o of s(this, e, i))
        Object.prototype.hasOwnProperty.call(o, t) && n.push(o[t]);
    return n;
  }
  /**
  Return a function that can categorize strings (expected to
  represent a single [grapheme cluster](https://codemirror.net/6/docs/ref/#state.findClusterBreak))
  into one of:
  
   - Word (contains an alphanumeric character or a character
     explicitly listed in the local language's `"wordChars"`
     language data, which should be a string)
   - Space (contains only whitespace)
   - Other (anything else)
  */
  charCategorizer(t) {
    return Jc(this.languageDataAt("wordChars", t).join(""));
  }
  /**
  Find the word at the given position, meaning the range
  containing all [word](https://codemirror.net/6/docs/ref/#state.CharCategory.Word) characters
  around it. If no word characters are adjacent to the position,
  this returns null.
  */
  wordAt(t) {
    let { text: e, from: i, length: n } = this.doc.lineAt(t), s = this.charCategorizer(t), o = t - i, a = t - i;
    for (; o > 0; ) {
      let h = ke(e, o, !1);
      if (s(e.slice(h, o)) != Ce.Word)
        break;
      o = h;
    }
    for (; a < n; ) {
      let h = ke(e, a);
      if (s(e.slice(a, h)) != Ce.Word)
        break;
      a = h;
    }
    return o == a ? null : U.range(o + i, a + i);
  }
}
bt.allowMultipleSelections = Gl;
bt.tabSize = /* @__PURE__ */ Z.define({
  combine: (r) => r.length ? r[0] : 4
});
bt.lineSeparator = Nu;
bt.readOnly = Fu;
bt.phrases = /* @__PURE__ */ Z.define({
  compare(r, t) {
    let e = Object.keys(r), i = Object.keys(t);
    return e.length == i.length && e.every((n) => r[n] == t[n]);
  }
});
bt.languageData = Ru;
bt.changeFilter = Iu;
bt.transactionFilter = Pu;
bt.transactionExtender = Lu;
cl.reconfigure = /* @__PURE__ */ Rt.define();
function Xc(r, t, e = {}) {
  let i = {};
  for (let n of r)
    for (let s of Object.keys(n)) {
      let o = n[s], a = i[s];
      if (a === void 0)
        i[s] = o;
      else if (!(a === o || o === void 0)) if (Object.hasOwnProperty.call(e, s))
        i[s] = e[s](a, o);
      else
        throw new Error("Config merge conflict for field " + s);
    }
  for (let n in t)
    i[n] === void 0 && (i[n] = t[n]);
  return i;
}
class Fi {
  /**
  Compare this value with another value. Used when comparing
  rangesets. The default implementation compares by identity.
  Unless you are only creating a fixed number of unique instances
  of your value type, it is a good idea to implement this
  properly.
  */
  eq(t) {
    return this == t;
  }
  /**
  Create a [range](https://codemirror.net/6/docs/ref/#state.Range) with this value.
  */
  range(t, e = t) {
    return Ql.create(t, e, this);
  }
}
Fi.prototype.startSide = Fi.prototype.endSide = 0;
Fi.prototype.point = !1;
Fi.prototype.mapMode = ge.TrackDel;
let Ql = class Hu {
  constructor(t, e, i) {
    this.from = t, this.to = e, this.value = i;
  }
  /**
  @internal
  */
  static create(t, e, i) {
    return new Hu(t, e, i);
  }
};
function Zl(r, t) {
  return r.from - t.from || r.value.startSide - t.value.startSide;
}
class Ma {
  constructor(t, e, i, n) {
    this.from = t, this.to = e, this.value = i, this.maxPoint = n;
  }
  get length() {
    return this.to[this.to.length - 1];
  }
  // Find the index of the given position and side. Use the ranges'
  // `from` pos when `end == false`, `to` when `end == true`.
  findIndex(t, e, i, n = 0) {
    let s = i ? this.to : this.from;
    for (let o = n, a = s.length; ; ) {
      if (o == a)
        return o;
      let h = o + a >> 1, d = s[h] - t || (i ? this.value[h].endSide : this.value[h].startSide) - e;
      if (h == o)
        return d >= 0 ? o : a;
      d >= 0 ? a = h : o = h + 1;
    }
  }
  between(t, e, i, n) {
    for (let s = this.findIndex(e, -1e9, !0), o = this.findIndex(i, 1e9, !1, s); s < o; s++)
      if (n(this.from[s] + t, this.to[s] + t, this.value[s]) === !1)
        return !1;
  }
  map(t, e) {
    let i = [], n = [], s = [], o = -1, a = -1;
    for (let h = 0; h < this.value.length; h++) {
      let d = this.value[h], c = this.from[h] + t, p = this.to[h] + t, m, b;
      if (c == p) {
        let S = e.mapPos(c, d.startSide, d.mapMode);
        if (S == null || (m = b = S, d.startSide != d.endSide && (b = e.mapPos(c, d.endSide), b < m)))
          continue;
      } else if (m = e.mapPos(c, d.startSide), b = e.mapPos(p, d.endSide), m > b || m == b && d.startSide > 0 && d.endSide <= 0)
        continue;
      (b - m || d.endSide - d.startSide) < 0 || (o < 0 && (o = m), d.point && (a = Math.max(a, b - m)), i.push(d), n.push(m - o), s.push(b - o));
    }
    return { mapped: i.length ? new Ma(n, s, i, a) : null, pos: o };
  }
}
class Et {
  constructor(t, e, i, n) {
    this.chunkPos = t, this.chunk = e, this.nextLayer = i, this.maxPoint = n;
  }
  /**
  @internal
  */
  static create(t, e, i, n) {
    return new Et(t, e, i, n);
  }
  /**
  @internal
  */
  get length() {
    let t = this.chunk.length - 1;
    return t < 0 ? 0 : Math.max(this.chunkEnd(t), this.nextLayer.length);
  }
  /**
  The number of ranges in the set.
  */
  get size() {
    if (this.isEmpty)
      return 0;
    let t = this.nextLayer.size;
    for (let e of this.chunk)
      t += e.value.length;
    return t;
  }
  /**
  @internal
  */
  chunkEnd(t) {
    return this.chunkPos[t] + this.chunk[t].length;
  }
  /**
  Update the range set, optionally adding new ranges or filtering
  out existing ones.
  
  (Note: The type parameter is just there as a kludge to work
  around TypeScript variance issues that prevented `RangeSet<X>`
  from being a subtype of `RangeSet<Y>` when `X` is a subtype of
  `Y`.)
  */
  update(t) {
    let { add: e = [], sort: i = !1, filterFrom: n = 0, filterTo: s = this.length } = t, o = t.filter;
    if (e.length == 0 && !o)
      return this;
    if (i && (e = e.slice().sort(Zl)), this.isEmpty)
      return e.length ? Et.of(e) : this;
    let a = new Wu(this, null, -1).goto(0), h = 0, d = [], c = new Cr();
    for (; a.value || h < e.length; )
      if (h < e.length && (a.from - e[h].from || a.startSide - e[h].value.startSide) >= 0) {
        let p = e[h++];
        c.addInner(p.from, p.to, p.value) || d.push(p);
      } else a.rangeIndex == 1 && a.chunkIndex < this.chunk.length && (h == e.length || this.chunkEnd(a.chunkIndex) < e[h].from) && (!o || n > this.chunkEnd(a.chunkIndex) || s < this.chunkPos[a.chunkIndex]) && c.addChunk(this.chunkPos[a.chunkIndex], this.chunk[a.chunkIndex]) ? a.nextChunk() : ((!o || n > a.to || s < a.from || o(a.from, a.to, a.value)) && (c.addInner(a.from, a.to, a.value) || d.push(Ql.create(a.from, a.to, a.value))), a.next());
    return c.finishInner(this.nextLayer.isEmpty && !d.length ? Et.empty : this.nextLayer.update({ add: d, filter: o, filterFrom: n, filterTo: s }));
  }
  /**
  Map this range set through a set of changes, return the new set.
  */
  map(t) {
    if (t.empty || this.isEmpty)
      return this;
    let e = [], i = [], n = -1;
    for (let o = 0; o < this.chunk.length; o++) {
      let a = this.chunkPos[o], h = this.chunk[o], d = t.touchesRange(a, a + h.length);
      if (d === !1)
        n = Math.max(n, h.maxPoint), e.push(h), i.push(t.mapPos(a));
      else if (d === !0) {
        let { mapped: c, pos: p } = h.map(a, t);
        c && (n = Math.max(n, c.maxPoint), e.push(c), i.push(p));
      }
    }
    let s = this.nextLayer.map(t);
    return e.length == 0 ? s : new Et(i, e, s || Et.empty, n);
  }
  /**
  Iterate over the ranges that touch the region `from` to `to`,
  calling `f` for each. There is no guarantee that the ranges will
  be reported in any specific order. When the callback returns
  `false`, iteration stops.
  */
  between(t, e, i) {
    if (!this.isEmpty) {
      for (let n = 0; n < this.chunk.length; n++) {
        let s = this.chunkPos[n], o = this.chunk[n];
        if (e >= s && t <= s + o.length && o.between(s, t - s, e - s, i) === !1)
          return;
      }
      this.nextLayer.between(t, e, i);
    }
  }
  /**
  Iterate over the ranges in this set, in order, including all
  ranges that end at or after `from`.
  */
  iter(t = 0) {
    return Er.from([this]).goto(t);
  }
  /**
  @internal
  */
  get isEmpty() {
    return this.nextLayer == this;
  }
  /**
  Iterate over the ranges in a collection of sets, in order,
  starting from `from`.
  */
  static iter(t, e = 0) {
    return Er.from(t).goto(e);
  }
  /**
  Iterate over two groups of sets, calling methods on `comparator`
  to notify it of possible differences.
  */
  static compare(t, e, i, n, s = -1) {
    let o = t.filter((p) => p.maxPoint > 0 || !p.isEmpty && p.maxPoint >= s), a = e.filter((p) => p.maxPoint > 0 || !p.isEmpty && p.maxPoint >= s), h = hh(o, a, i), d = new hr(o, h, s), c = new hr(a, h, s);
    i.iterGaps((p, m, b) => uh(d, p, c, m, b, n)), i.empty && i.length == 0 && uh(d, 0, c, 0, 0, n);
  }
  /**
  Compare the contents of two groups of range sets, returning true
  if they are equivalent in the given range.
  */
  static eq(t, e, i = 0, n) {
    n == null && (n = 999999999);
    let s = t.filter((c) => !c.isEmpty && e.indexOf(c) < 0), o = e.filter((c) => !c.isEmpty && t.indexOf(c) < 0);
    if (s.length != o.length)
      return !1;
    if (!s.length)
      return !0;
    let a = hh(s, o), h = new hr(s, a, 0).goto(i), d = new hr(o, a, 0).goto(i);
    for (; ; ) {
      if (h.to != d.to || !ta(h.active, d.active) || h.point && (!d.point || !h.point.eq(d.point)))
        return !1;
      if (h.to > n)
        return !0;
      h.next(), d.next();
    }
  }
  /**
  Iterate over a group of range sets at the same time, notifying
  the iterator about the ranges covering every given piece of
  content. Returns the open count (see
  [`SpanIterator.span`](https://codemirror.net/6/docs/ref/#state.SpanIterator.span)) at the end
  of the iteration.
  */
  static spans(t, e, i, n, s = -1) {
    let o = new hr(t, null, s).goto(e), a = e, h = o.openStart;
    for (; ; ) {
      let d = Math.min(o.to, i);
      if (o.point) {
        let c = o.activeForPoint(o.to), p = o.pointFrom < e ? c.length + 1 : o.point.startSide < 0 ? c.length : Math.min(c.length, h);
        n.point(a, d, o.point, c, p, o.pointRank), h = Math.min(o.openEnd(d), c.length);
      } else d > a && (n.span(a, d, o.active, h), h = o.openEnd(d));
      if (o.to > i)
        return h + (o.point && o.to > i ? 1 : 0);
      a = o.to, o.next();
    }
  }
  /**
  Create a range set for the given range or array of ranges. By
  default, this expects the ranges to be _sorted_ (by start
  position and, if two start at the same position,
  `value.startSide`). You can pass `true` as second argument to
  cause the method to sort them.
  */
  static of(t, e = !1) {
    let i = new Cr();
    for (let n of t instanceof Ql ? [t] : e ? Qc(t) : t)
      i.add(n.from, n.to, n.value);
    return i.finish();
  }
  /**
  Join an array of range sets into a single set.
  */
  static join(t) {
    if (!t.length)
      return Et.empty;
    let e = t[t.length - 1];
    for (let i = t.length - 2; i >= 0; i--)
      for (let n = t[i]; n != Et.empty; n = n.nextLayer)
        e = new Et(n.chunkPos, n.chunk, e, Math.max(n.maxPoint, e.maxPoint));
    return e;
  }
}
Et.empty = /* @__PURE__ */ new Et([], [], null, -1);
function Qc(r) {
  if (r.length > 1)
    for (let t = r[0], e = 1; e < r.length; e++) {
      let i = r[e];
      if (Zl(t, i) > 0)
        return r.slice().sort(Zl);
      t = i;
    }
  return r;
}
Et.empty.nextLayer = Et.empty;
class Cr {
  finishChunk(t) {
    this.chunks.push(new Ma(this.from, this.to, this.value, this.maxPoint)), this.chunkPos.push(this.chunkStart), this.chunkStart = -1, this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint), this.maxPoint = -1, t && (this.from = [], this.to = [], this.value = []);
  }
  /**
  Create an empty builder.
  */
  constructor() {
    this.chunks = [], this.chunkPos = [], this.chunkStart = -1, this.last = null, this.lastFrom = -1e9, this.lastTo = -1e9, this.from = [], this.to = [], this.value = [], this.maxPoint = -1, this.setMaxPoint = -1, this.nextLayer = null;
  }
  /**
  Add a range. Ranges should be added in sorted (by `from` and
  `value.startSide`) order.
  */
  add(t, e, i) {
    this.addInner(t, e, i) || (this.nextLayer || (this.nextLayer = new Cr())).add(t, e, i);
  }
  /**
  @internal
  */
  addInner(t, e, i) {
    let n = t - this.lastTo || i.startSide - this.last.endSide;
    if (n <= 0 && (t - this.lastFrom || i.startSide - this.last.startSide) < 0)
      throw new Error("Ranges must be added sorted by `from` position and `startSide`");
    return n < 0 ? !1 : (this.from.length == 250 && this.finishChunk(!0), this.chunkStart < 0 && (this.chunkStart = t), this.from.push(t - this.chunkStart), this.to.push(e - this.chunkStart), this.last = i, this.lastFrom = t, this.lastTo = e, this.value.push(i), i.point && (this.maxPoint = Math.max(this.maxPoint, e - t)), !0);
  }
  /**
  @internal
  */
  addChunk(t, e) {
    if ((t - this.lastTo || e.value[0].startSide - this.last.endSide) < 0)
      return !1;
    this.from.length && this.finishChunk(!0), this.setMaxPoint = Math.max(this.setMaxPoint, e.maxPoint), this.chunks.push(e), this.chunkPos.push(t);
    let i = e.value.length - 1;
    return this.last = e.value[i], this.lastFrom = e.from[i] + t, this.lastTo = e.to[i] + t, !0;
  }
  /**
  Finish the range set. Returns the new set. The builder can't be
  used anymore after this has been called.
  */
  finish() {
    return this.finishInner(Et.empty);
  }
  /**
  @internal
  */
  finishInner(t) {
    if (this.from.length && this.finishChunk(!1), this.chunks.length == 0)
      return t;
    let e = Et.create(this.chunkPos, this.chunks, this.nextLayer ? this.nextLayer.finishInner(t) : t, this.setMaxPoint);
    return this.from = null, e;
  }
}
function hh(r, t, e) {
  let i = /* @__PURE__ */ new Map();
  for (let s of r)
    for (let o = 0; o < s.chunk.length; o++)
      s.chunk[o].maxPoint <= 0 && i.set(s.chunk[o], s.chunkPos[o]);
  let n = /* @__PURE__ */ new Set();
  for (let s of t)
    for (let o = 0; o < s.chunk.length; o++) {
      let a = i.get(s.chunk[o]);
      a != null && (e ? e.mapPos(a) : a) == s.chunkPos[o] && !(e != null && e.touchesRange(a, a + s.chunk[o].length)) && n.add(s.chunk[o]);
    }
  return n;
}
class Wu {
  constructor(t, e, i, n = 0) {
    this.layer = t, this.skip = e, this.minPoint = i, this.rank = n;
  }
  get startSide() {
    return this.value ? this.value.startSide : 0;
  }
  get endSide() {
    return this.value ? this.value.endSide : 0;
  }
  goto(t, e = -1e9) {
    return this.chunkIndex = this.rangeIndex = 0, this.gotoInner(t, e, !1), this;
  }
  gotoInner(t, e, i) {
    for (; this.chunkIndex < this.layer.chunk.length; ) {
      let n = this.layer.chunk[this.chunkIndex];
      if (!(this.skip && this.skip.has(n) || this.layer.chunkEnd(this.chunkIndex) < t || n.maxPoint < this.minPoint))
        break;
      this.chunkIndex++, i = !1;
    }
    if (this.chunkIndex < this.layer.chunk.length) {
      let n = this.layer.chunk[this.chunkIndex].findIndex(t - this.layer.chunkPos[this.chunkIndex], e, !0);
      (!i || this.rangeIndex < n) && this.setRangeIndex(n);
    }
    this.next();
  }
  forward(t, e) {
    (this.to - t || this.endSide - e) < 0 && this.gotoInner(t, e, !0);
  }
  next() {
    for (; ; )
      if (this.chunkIndex == this.layer.chunk.length) {
        this.from = this.to = 1e9, this.value = null;
        break;
      } else {
        let t = this.layer.chunkPos[this.chunkIndex], e = this.layer.chunk[this.chunkIndex], i = t + e.from[this.rangeIndex];
        if (this.from = i, this.to = t + e.to[this.rangeIndex], this.value = e.value[this.rangeIndex], this.setRangeIndex(this.rangeIndex + 1), this.minPoint < 0 || this.value.point && this.to - this.from >= this.minPoint)
          break;
      }
  }
  setRangeIndex(t) {
    if (t == this.layer.chunk[this.chunkIndex].value.length) {
      if (this.chunkIndex++, this.skip)
        for (; this.chunkIndex < this.layer.chunk.length && this.skip.has(this.layer.chunk[this.chunkIndex]); )
          this.chunkIndex++;
      this.rangeIndex = 0;
    } else
      this.rangeIndex = t;
  }
  nextChunk() {
    this.chunkIndex++, this.rangeIndex = 0, this.next();
  }
  compare(t) {
    return this.from - t.from || this.startSide - t.startSide || this.rank - t.rank || this.to - t.to || this.endSide - t.endSide;
  }
}
class Er {
  constructor(t) {
    this.heap = t;
  }
  static from(t, e = null, i = -1) {
    let n = [];
    for (let s = 0; s < t.length; s++)
      for (let o = t[s]; !o.isEmpty; o = o.nextLayer)
        o.maxPoint >= i && n.push(new Wu(o, e, i, s));
    return n.length == 1 ? n[0] : new Er(n);
  }
  get startSide() {
    return this.value ? this.value.startSide : 0;
  }
  goto(t, e = -1e9) {
    for (let i of this.heap)
      i.goto(t, e);
    for (let i = this.heap.length >> 1; i >= 0; i--)
      Ml(this.heap, i);
    return this.next(), this;
  }
  forward(t, e) {
    for (let i of this.heap)
      i.forward(t, e);
    for (let i = this.heap.length >> 1; i >= 0; i--)
      Ml(this.heap, i);
    (this.to - t || this.value.endSide - e) < 0 && this.next();
  }
  next() {
    if (this.heap.length == 0)
      this.from = this.to = 1e9, this.value = null, this.rank = -1;
    else {
      let t = this.heap[0];
      this.from = t.from, this.to = t.to, this.value = t.value, this.rank = t.rank, t.value && t.next(), Ml(this.heap, 0);
    }
  }
}
function Ml(r, t) {
  for (let e = r[t]; ; ) {
    let i = (t << 1) + 1;
    if (i >= r.length)
      break;
    let n = r[i];
    if (i + 1 < r.length && n.compare(r[i + 1]) >= 0 && (n = r[i + 1], i++), e.compare(n) < 0)
      break;
    r[i] = e, r[t] = n, t = i;
  }
}
class hr {
  constructor(t, e, i) {
    this.minPoint = i, this.active = [], this.activeTo = [], this.activeRank = [], this.minActive = -1, this.point = null, this.pointFrom = 0, this.pointRank = 0, this.to = -1e9, this.endSide = 0, this.openStart = -1, this.cursor = Er.from(t, e, i);
  }
  goto(t, e = -1e9) {
    return this.cursor.goto(t, e), this.active.length = this.activeTo.length = this.activeRank.length = 0, this.minActive = -1, this.to = t, this.endSide = e, this.openStart = -1, this.next(), this;
  }
  forward(t, e) {
    for (; this.minActive > -1 && (this.activeTo[this.minActive] - t || this.active[this.minActive].endSide - e) < 0; )
      this.removeActive(this.minActive);
    this.cursor.forward(t, e);
  }
  removeActive(t) {
    To(this.active, t), To(this.activeTo, t), To(this.activeRank, t), this.minActive = fh(this.active, this.activeTo);
  }
  addActive(t) {
    let e = 0, { value: i, to: n, rank: s } = this.cursor;
    for (; e < this.activeRank.length && (s - this.activeRank[e] || n - this.activeTo[e]) > 0; )
      e++;
    xo(this.active, e, i), xo(this.activeTo, e, n), xo(this.activeRank, e, s), t && xo(t, e, this.cursor.from), this.minActive = fh(this.active, this.activeTo);
  }
  // After calling this, if `this.point` != null, the next range is a
  // point. Otherwise, it's a regular range, covered by `this.active`.
  next() {
    let t = this.to, e = this.point;
    this.point = null;
    let i = this.openStart < 0 ? [] : null;
    for (; ; ) {
      let n = this.minActive;
      if (n > -1 && (this.activeTo[n] - this.cursor.from || this.active[n].endSide - this.cursor.startSide) < 0) {
        if (this.activeTo[n] > t) {
          this.to = this.activeTo[n], this.endSide = this.active[n].endSide;
          break;
        }
        this.removeActive(n), i && To(i, n);
      } else if (this.cursor.value)
        if (this.cursor.from > t) {
          this.to = this.cursor.from, this.endSide = this.cursor.startSide;
          break;
        } else {
          let s = this.cursor.value;
          if (!s.point)
            this.addActive(i), this.cursor.next();
          else if (e && this.cursor.to == this.to && this.cursor.from < this.cursor.to)
            this.cursor.next();
          else {
            this.point = s, this.pointFrom = this.cursor.from, this.pointRank = this.cursor.rank, this.to = this.cursor.to, this.endSide = s.endSide, this.cursor.next(), this.forward(this.to, this.endSide);
            break;
          }
        }
      else {
        this.to = this.endSide = 1e9;
        break;
      }
    }
    if (i) {
      this.openStart = 0;
      for (let n = i.length - 1; n >= 0 && i[n] < t; n--)
        this.openStart++;
    }
  }
  activeForPoint(t) {
    if (!this.active.length)
      return this.active;
    let e = [];
    for (let i = this.active.length - 1; i >= 0 && !(this.activeRank[i] < this.pointRank); i--)
      (this.activeTo[i] > t || this.activeTo[i] == t && this.active[i].endSide >= this.point.endSide) && e.push(this.active[i]);
    return e.reverse();
  }
  openEnd(t) {
    let e = 0;
    for (let i = this.activeTo.length - 1; i >= 0 && this.activeTo[i] > t; i--)
      e++;
    return e;
  }
}
function uh(r, t, e, i, n, s) {
  r.goto(t), e.goto(i);
  let o = i + n, a = i, h = i - t;
  for (; ; ) {
    let d = r.to + h - e.to, c = d || r.endSide - e.endSide, p = c < 0 ? r.to + h : e.to, m = Math.min(p, o);
    if (r.point || e.point ? r.point && e.point && (r.point == e.point || r.point.eq(e.point)) && ta(r.activeForPoint(r.to), e.activeForPoint(e.to)) || s.comparePoint(a, m, r.point, e.point) : m > a && !ta(r.active, e.active) && s.compareRange(a, m, r.active, e.active), p > o)
      break;
    (d || r.openEnd != e.openEnd) && s.boundChange && s.boundChange(p), a = p, c <= 0 && r.next(), c >= 0 && e.next();
  }
}
function ta(r, t) {
  if (r.length != t.length)
    return !1;
  for (let e = 0; e < r.length; e++)
    if (r[e] != t[e] && !r[e].eq(t[e]))
      return !1;
  return !0;
}
function To(r, t) {
  for (let e = t, i = r.length - 1; e < i; e++)
    r[e] = r[e + 1];
  r.pop();
}
function xo(r, t, e) {
  for (let i = r.length - 1; i >= t; i--)
    r[i + 1] = r[i];
  r[t] = e;
}
function fh(r, t) {
  let e = -1, i = 1e9;
  for (let n = 0; n < t.length; n++)
    (t[n] - i || r[n].endSide - r[e].endSide) < 0 && (e = n, i = t[n]);
  return e;
}
function Zc(r, t, e = r.length) {
  let i = 0;
  for (let n = 0; n < e; )
    r.charCodeAt(n) == 9 ? (i += t - i % t, n++) : (i++, n = ke(r, n));
  return i;
}
function td(r, t, e, i) {
  for (let n = 0, s = 0; ; ) {
    if (s >= t)
      return n;
    if (n == r.length)
      break;
    s += r.charCodeAt(n) == 9 ? e - s % e : 1, n = ke(r, n);
  }
  return i === !0 ? -1 : r.length;
}
const ea = "ͼ", ch = typeof Symbol > "u" ? "__" + ea : Symbol.for(ea), ia = typeof Symbol > "u" ? "__styleSet" + Math.floor(Math.random() * 1e8) : Symbol("styleSet"), dh = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : {};
class mi {
  // :: (Object<Style>, ?{finish: ?(string) → string})
  // Create a style module from the given spec.
  //
  // When `finish` is given, it is called on regular (non-`@`)
  // selectors (after `&` expansion) to compute the final selector.
  constructor(t, e) {
    this.rules = [];
    let { finish: i } = e || {};
    function n(o) {
      return /^@/.test(o) ? [o] : o.split(/,\s*/);
    }
    function s(o, a, h, d) {
      let c = [], p = /^@(\w+)\b/.exec(o[0]), m = p && p[1] == "keyframes";
      if (p && a == null) return h.push(o[0] + ";");
      for (let b in a) {
        let S = a[b];
        if (/&/.test(b))
          s(
            b.split(/,\s*/).map((E) => o.map((w) => E.replace(/&/, w))).reduce((E, w) => E.concat(w)),
            S,
            h
          );
        else if (S && typeof S == "object") {
          if (!p) throw new RangeError("The value of a property (" + b + ") should be a primitive value.");
          s(n(b), S, c, m);
        } else S != null && c.push(b.replace(/_.*/, "").replace(/[A-Z]/g, (E) => "-" + E.toLowerCase()) + ": " + S + ";");
      }
      (c.length || m) && h.push((i && !p && !d ? o.map(i) : o).join(", ") + " {" + c.join(" ") + "}");
    }
    for (let o in t) s(n(o), t[o], this.rules);
  }
  // :: () → string
  // Returns a string containing the module's CSS rules.
  getRules() {
    return this.rules.join(`
`);
  }
  // :: () → string
  // Generate a new unique CSS class name.
  static newName() {
    let t = dh[ch] || 1;
    return dh[ch] = t + 1, ea + t.toString(36);
  }
  // :: (union<Document, ShadowRoot>, union<[StyleModule], StyleModule>, ?{nonce: ?string})
  //
  // Mount the given set of modules in the given DOM root, which ensures
  // that the CSS rules defined by the module are available in that
  // context.
  //
  // Rules are only added to the document once per root.
  //
  // Rule order will follow the order of the modules, so that rules from
  // modules later in the array take precedence of those from earlier
  // modules. If you call this function multiple times for the same root
  // in a way that changes the order of already mounted modules, the old
  // order will be changed.
  //
  // If a Content Security Policy nonce is provided, it is added to
  // the `<style>` tag generated by the library.
  static mount(t, e, i) {
    let n = t[ia], s = i && i.nonce;
    n ? s && n.setNonce(s) : n = new ed(t, s), n.mount(Array.isArray(e) ? e : [e], t);
  }
}
let gh = /* @__PURE__ */ new Map();
class ed {
  constructor(t, e) {
    let i = t.ownerDocument || t, n = i.defaultView;
    if (!t.head && t.adoptedStyleSheets && n.CSSStyleSheet) {
      let s = gh.get(i);
      if (s) return t[ia] = s;
      this.sheet = new n.CSSStyleSheet(), gh.set(i, this);
    } else
      this.styleTag = i.createElement("style"), e && this.styleTag.setAttribute("nonce", e);
    this.modules = [], t[ia] = this;
  }
  mount(t, e) {
    let i = this.sheet, n = 0, s = 0;
    for (let o = 0; o < t.length; o++) {
      let a = t[o], h = this.modules.indexOf(a);
      if (h < s && h > -1 && (this.modules.splice(h, 1), s--, h = -1), h == -1) {
        if (this.modules.splice(s++, 0, a), i) for (let d = 0; d < a.rules.length; d++)
          i.insertRule(a.rules[d], n++);
      } else {
        for (; s < h; ) n += this.modules[s++].rules.length;
        n += a.rules.length, s++;
      }
    }
    if (i)
      e.adoptedStyleSheets.indexOf(this.sheet) < 0 && (e.adoptedStyleSheets = [this.sheet, ...e.adoptedStyleSheets]);
    else {
      let o = "";
      for (let h = 0; h < this.modules.length; h++)
        o += this.modules[h].getRules() + `
`;
      this.styleTag.textContent = o;
      let a = e.head || e;
      this.styleTag.parentNode != a && a.insertBefore(this.styleTag, a.firstChild);
    }
  }
  setNonce(t) {
    this.styleTag && this.styleTag.getAttribute("nonce") != t && this.styleTag.setAttribute("nonce", t);
  }
}
var yi = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'"
}, Mr = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ":",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: '"'
}, id = typeof navigator < "u" && /Mac/.test(navigator.platform), nd = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
for (var Xt = 0; Xt < 10; Xt++) yi[48 + Xt] = yi[96 + Xt] = String(Xt);
for (var Xt = 1; Xt <= 24; Xt++) yi[Xt + 111] = "F" + Xt;
for (var Xt = 65; Xt <= 90; Xt++)
  yi[Xt] = String.fromCharCode(Xt + 32), Mr[Xt] = String.fromCharCode(Xt);
for (var Ol in yi) Mr.hasOwnProperty(Ol) || (Mr[Ol] = yi[Ol]);
function rd(r) {
  var t = id && r.metaKey && r.shiftKey && !r.ctrlKey && !r.altKey || nd && r.shiftKey && r.key && r.key.length == 1 || r.key == "Unidentified", e = !t && r.key || (r.shiftKey ? Mr : yi)[r.keyCode] || r.key || "Unidentified";
  return e == "Esc" && (e = "Escape"), e == "Del" && (e = "Delete"), e == "Left" && (e = "ArrowLeft"), e == "Up" && (e = "ArrowUp"), e == "Right" && (e = "ArrowRight"), e == "Down" && (e = "ArrowDown"), e;
}
function Or(r) {
  let t;
  return r.nodeType == 11 ? t = r.getSelection ? r : r.ownerDocument : t = r, t.getSelection();
}
function na(r, t) {
  return t ? r == t || r.contains(t.nodeType != 1 ? t.parentNode : t) : !1;
}
function qo(r, t) {
  if (!t.anchorNode)
    return !1;
  try {
    return na(r, t.anchorNode);
  } catch {
    return !1;
  }
}
function Tr(r) {
  return r.nodeType == 3 ? Vi(r, 0, r.nodeValue.length).getClientRects() : r.nodeType == 1 ? r.getClientRects() : [];
}
function Sr(r, t, e, i) {
  return e ? ph(r, t, e, i, -1) || ph(r, t, e, i, 1) : !1;
}
function Bi(r) {
  for (var t = 0; ; t++)
    if (r = r.previousSibling, !r)
      return t;
}
function tl(r) {
  return r.nodeType == 1 && /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(r.nodeName);
}
function ph(r, t, e, i, n) {
  for (; ; ) {
    if (r == e && t == i)
      return !0;
    if (t == (n < 0 ? 0 : Ge(r))) {
      if (r.nodeName == "DIV")
        return !1;
      let s = r.parentNode;
      if (!s || s.nodeType != 1)
        return !1;
      t = Bi(r) + (n < 0 ? 0 : 1), r = s;
    } else if (r.nodeType == 1) {
      if (r = r.childNodes[t + (n < 0 ? -1 : 0)], r.nodeType == 1 && r.contentEditable == "false")
        return !1;
      t = n < 0 ? Ge(r) : 0;
    } else
      return !1;
  }
}
function Ge(r) {
  return r.nodeType == 3 ? r.nodeValue.length : r.childNodes.length;
}
function dl(r, t) {
  let e = t ? r.left : r.right;
  return { left: e, right: e, top: r.top, bottom: r.bottom };
}
function sd(r) {
  let t = r.visualViewport;
  return t ? {
    left: 0,
    right: t.width,
    top: 0,
    bottom: t.height
  } : {
    left: 0,
    right: r.innerWidth,
    top: 0,
    bottom: r.innerHeight
  };
}
function Uu(r, t) {
  let e = t.width / r.offsetWidth, i = t.height / r.offsetHeight;
  return (e > 0.995 && e < 1.005 || !isFinite(e) || Math.abs(t.width - r.offsetWidth) < 1) && (e = 1), (i > 0.995 && i < 1.005 || !isFinite(i) || Math.abs(t.height - r.offsetHeight) < 1) && (i = 1), { scaleX: e, scaleY: i };
}
function od(r, t, e, i, n, s, o, a) {
  let h = r.ownerDocument, d = h.defaultView || window;
  for (let c = r, p = !1; c && !p; )
    if (c.nodeType == 1) {
      let m, b = c == h.body, S = 1, E = 1;
      if (b)
        m = sd(d);
      else {
        if (/^(fixed|sticky)$/.test(getComputedStyle(c).position) && (p = !0), c.scrollHeight <= c.clientHeight && c.scrollWidth <= c.clientWidth) {
          c = c.assignedSlot || c.parentNode;
          continue;
        }
        let R = c.getBoundingClientRect();
        ({ scaleX: S, scaleY: E } = Uu(c, R)), m = {
          left: R.left,
          right: R.left + c.clientWidth * S,
          top: R.top,
          bottom: R.top + c.clientHeight * E
        };
      }
      let w = 0, M = 0;
      if (n == "nearest")
        t.top < m.top ? (M = -(m.top - t.top + o), e > 0 && t.bottom > m.bottom + M && (M = t.bottom - m.bottom + M + o)) : t.bottom > m.bottom && (M = t.bottom - m.bottom + o, e < 0 && t.top - M < m.top && (M = -(m.top + M - t.top + o)));
      else {
        let R = t.bottom - t.top, I = m.bottom - m.top;
        M = (n == "center" && R <= I ? t.top + R / 2 - I / 2 : n == "start" || n == "center" && e < 0 ? t.top - o : t.bottom - I + o) - m.top;
      }
      if (i == "nearest" ? t.left < m.left ? (w = -(m.left - t.left + s), e > 0 && t.right > m.right + w && (w = t.right - m.right + w + s)) : t.right > m.right && (w = t.right - m.right + s, e < 0 && t.left < m.left + w && (w = -(m.left + w - t.left + s))) : w = (i == "center" ? t.left + (t.right - t.left) / 2 - (m.right - m.left) / 2 : i == "start" == a ? t.left - s : t.right - (m.right - m.left) + s) - m.left, w || M)
        if (b)
          d.scrollBy(w, M);
        else {
          let R = 0, I = 0;
          if (M) {
            let D = c.scrollTop;
            c.scrollTop += M / E, I = (c.scrollTop - D) * E;
          }
          if (w) {
            let D = c.scrollLeft;
            c.scrollLeft += w / S, R = (c.scrollLeft - D) * S;
          }
          t = {
            left: t.left - R,
            top: t.top - I,
            right: t.right - R,
            bottom: t.bottom - I
          }, R && Math.abs(R - w) < 1 && (i = "nearest"), I && Math.abs(I - M) < 1 && (n = "nearest");
        }
      if (b)
        break;
      c = c.assignedSlot || c.parentNode;
    } else if (c.nodeType == 11)
      c = c.host;
    else
      break;
}
function ld(r) {
  let t = r.ownerDocument, e, i;
  for (let n = r.parentNode; n && !(n == t.body || e && i); )
    if (n.nodeType == 1)
      !i && n.scrollHeight > n.clientHeight && (i = n), !e && n.scrollWidth > n.clientWidth && (e = n), n = n.assignedSlot || n.parentNode;
    else if (n.nodeType == 11)
      n = n.host;
    else
      break;
  return { x: e, y: i };
}
class ad {
  constructor() {
    this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
  }
  eq(t) {
    return this.anchorNode == t.anchorNode && this.anchorOffset == t.anchorOffset && this.focusNode == t.focusNode && this.focusOffset == t.focusOffset;
  }
  setRange(t) {
    let { anchorNode: e, focusNode: i } = t;
    this.set(e, Math.min(t.anchorOffset, e ? Ge(e) : 0), i, Math.min(t.focusOffset, i ? Ge(i) : 0));
  }
  set(t, e, i, n) {
    this.anchorNode = t, this.anchorOffset = e, this.focusNode = i, this.focusOffset = n;
  }
}
let Tn = null;
function zu(r) {
  if (r.setActive)
    return r.setActive();
  if (Tn)
    return r.focus(Tn);
  let t = [];
  for (let e = r; e && (t.push(e, e.scrollTop, e.scrollLeft), e != e.ownerDocument); e = e.parentNode)
    ;
  if (r.focus(Tn == null ? {
    get preventScroll() {
      return Tn = { preventScroll: !0 }, !0;
    }
  } : void 0), !Tn) {
    Tn = !1;
    for (let e = 0; e < t.length; ) {
      let i = t[e++], n = t[e++], s = t[e++];
      i.scrollTop != n && (i.scrollTop = n), i.scrollLeft != s && (i.scrollLeft = s);
    }
  }
}
let mh;
function Vi(r, t, e = t) {
  let i = mh || (mh = document.createRange());
  return i.setEnd(r, e), i.setStart(r, t), i;
}
function Rn(r, t, e, i) {
  let n = { key: t, code: t, keyCode: e, which: e, cancelable: !0 };
  i && ({ altKey: n.altKey, ctrlKey: n.ctrlKey, shiftKey: n.shiftKey, metaKey: n.metaKey } = i);
  let s = new KeyboardEvent("keydown", n);
  s.synthetic = !0, r.dispatchEvent(s);
  let o = new KeyboardEvent("keyup", n);
  return o.synthetic = !0, r.dispatchEvent(o), s.defaultPrevented || o.defaultPrevented;
}
function hd(r) {
  for (; r; ) {
    if (r && (r.nodeType == 9 || r.nodeType == 11 && r.host))
      return r;
    r = r.assignedSlot || r.parentNode;
  }
  return null;
}
function _u(r) {
  for (; r.attributes.length; )
    r.removeAttributeNode(r.attributes[0]);
}
function ud(r, t) {
  let e = t.focusNode, i = t.focusOffset;
  if (!e || t.anchorNode != e || t.anchorOffset != i)
    return !1;
  for (i = Math.min(i, Ge(e)); ; )
    if (i) {
      if (e.nodeType != 1)
        return !1;
      let n = e.childNodes[i - 1];
      n.contentEditable == "false" ? i-- : (e = n, i = Ge(e));
    } else {
      if (e == r)
        return !0;
      i = Bi(e), e = e.parentNode;
    }
}
function $u(r) {
  return r.scrollTop > Math.max(1, r.scrollHeight - r.clientHeight - 4);
}
function ju(r, t) {
  for (let e = r, i = t; ; ) {
    if (e.nodeType == 3 && i > 0)
      return { node: e, offset: i };
    if (e.nodeType == 1 && i > 0) {
      if (e.contentEditable == "false")
        return null;
      e = e.childNodes[i - 1], i = Ge(e);
    } else if (e.parentNode && !tl(e))
      i = Bi(e), e = e.parentNode;
    else
      return null;
  }
}
function Ku(r, t) {
  for (let e = r, i = t; ; ) {
    if (e.nodeType == 3 && i < e.nodeValue.length)
      return { node: e, offset: i };
    if (e.nodeType == 1 && i < e.childNodes.length) {
      if (e.contentEditable == "false")
        return null;
      e = e.childNodes[i], i = 0;
    } else if (e.parentNode && !tl(e))
      i = Bi(e) + 1, e = e.parentNode;
    else
      return null;
  }
}
class ee {
  constructor(t, e, i = !0) {
    this.node = t, this.offset = e, this.precise = i;
  }
  static before(t, e) {
    return new ee(t.parentNode, Bi(t), e);
  }
  static after(t, e) {
    return new ee(t.parentNode, Bi(t) + 1, e);
  }
}
const Oa = [];
class At {
  constructor() {
    this.parent = null, this.dom = null, this.flags = 2;
  }
  get overrideDOMText() {
    return null;
  }
  get posAtStart() {
    return this.parent ? this.parent.posBefore(this) : 0;
  }
  get posAtEnd() {
    return this.posAtStart + this.length;
  }
  posBefore(t) {
    let e = this.posAtStart;
    for (let i of this.children) {
      if (i == t)
        return e;
      e += i.length + i.breakAfter;
    }
    throw new RangeError("Invalid child in posBefore");
  }
  posAfter(t) {
    return this.posBefore(t) + t.length;
  }
  sync(t, e) {
    if (this.flags & 2) {
      let i = this.dom, n = null, s;
      for (let o of this.children) {
        if (o.flags & 7) {
          if (!o.dom && (s = n ? n.nextSibling : i.firstChild)) {
            let a = At.get(s);
            (!a || !a.parent && a.canReuseDOM(o)) && o.reuseDOM(s);
          }
          o.sync(t, e), o.flags &= -8;
        }
        if (s = n ? n.nextSibling : i.firstChild, e && !e.written && e.node == i && s != o.dom && (e.written = !0), o.dom.parentNode == i)
          for (; s && s != o.dom; )
            s = yh(s);
        else
          i.insertBefore(o.dom, s);
        n = o.dom;
      }
      for (s = n ? n.nextSibling : i.firstChild, s && e && e.node == i && (e.written = !0); s; )
        s = yh(s);
    } else if (this.flags & 1)
      for (let i of this.children)
        i.flags & 7 && (i.sync(t, e), i.flags &= -8);
  }
  reuseDOM(t) {
  }
  localPosFromDOM(t, e) {
    let i;
    if (t == this.dom)
      i = this.dom.childNodes[e];
    else {
      let n = Ge(t) == 0 ? 0 : e == 0 ? -1 : 1;
      for (; ; ) {
        let s = t.parentNode;
        if (s == this.dom)
          break;
        n == 0 && s.firstChild != s.lastChild && (t == s.firstChild ? n = -1 : n = 1), t = s;
      }
      n < 0 ? i = t : i = t.nextSibling;
    }
    if (i == this.dom.firstChild)
      return 0;
    for (; i && !At.get(i); )
      i = i.nextSibling;
    if (!i)
      return this.length;
    for (let n = 0, s = 0; ; n++) {
      let o = this.children[n];
      if (o.dom == i)
        return s;
      s += o.length + o.breakAfter;
    }
  }
  domBoundsAround(t, e, i = 0) {
    let n = -1, s = -1, o = -1, a = -1;
    for (let h = 0, d = i, c = i; h < this.children.length; h++) {
      let p = this.children[h], m = d + p.length;
      if (d < t && m > e)
        return p.domBoundsAround(t, e, d);
      if (m >= t && n == -1 && (n = h, s = d), d > e && p.dom.parentNode == this.dom) {
        o = h, a = c;
        break;
      }
      c = m, d = m + p.breakAfter;
    }
    return {
      from: s,
      to: a < 0 ? i + this.length : a,
      startDOM: (n ? this.children[n - 1].dom.nextSibling : null) || this.dom.firstChild,
      endDOM: o < this.children.length && o >= 0 ? this.children[o].dom : null
    };
  }
  markDirty(t = !1) {
    this.flags |= 2, this.markParentsDirty(t);
  }
  markParentsDirty(t) {
    for (let e = this.parent; e; e = e.parent) {
      if (t && (e.flags |= 2), e.flags & 1)
        return;
      e.flags |= 1, t = !1;
    }
  }
  setParent(t) {
    this.parent != t && (this.parent = t, this.flags & 7 && this.markParentsDirty(!0));
  }
  setDOM(t) {
    this.dom != t && (this.dom && (this.dom.cmView = null), this.dom = t, t.cmView = this);
  }
  get rootView() {
    for (let t = this; ; ) {
      let e = t.parent;
      if (!e)
        return t;
      t = e;
    }
  }
  replaceChildren(t, e, i = Oa) {
    this.markDirty();
    for (let n = t; n < e; n++) {
      let s = this.children[n];
      s.parent == this && i.indexOf(s) < 0 && s.destroy();
    }
    i.length < 250 ? this.children.splice(t, e - t, ...i) : this.children = [].concat(this.children.slice(0, t), i, this.children.slice(e));
    for (let n = 0; n < i.length; n++)
      i[n].setParent(this);
  }
  ignoreMutation(t) {
    return !1;
  }
  ignoreEvent(t) {
    return !1;
  }
  childCursor(t = this.length) {
    return new qu(this.children, t, this.children.length);
  }
  childPos(t, e = 1) {
    return this.childCursor().findPos(t, e);
  }
  toString() {
    let t = this.constructor.name.replace("View", "");
    return t + (this.children.length ? "(" + this.children.join() + ")" : this.length ? "[" + (t == "Text" ? this.text : this.length) + "]" : "") + (this.breakAfter ? "#" : "");
  }
  static get(t) {
    return t.cmView;
  }
  get isEditable() {
    return !0;
  }
  get isWidget() {
    return !1;
  }
  get isHidden() {
    return !1;
  }
  merge(t, e, i, n, s, o) {
    return !1;
  }
  become(t) {
    return !1;
  }
  canReuseDOM(t) {
    return t.constructor == this.constructor && !((this.flags | t.flags) & 8);
  }
  // When this is a zero-length view with a side, this should return a
  // number <= 0 to indicate it is before its position, or a
  // number > 0 when after its position.
  getSide() {
    return 0;
  }
  destroy() {
    for (let t of this.children)
      t.parent == this && t.destroy();
    this.parent = null;
  }
}
At.prototype.breakAfter = 0;
function yh(r) {
  let t = r.nextSibling;
  return r.parentNode.removeChild(r), t;
}
class qu {
  constructor(t, e, i) {
    this.children = t, this.pos = e, this.i = i, this.off = 0;
  }
  findPos(t, e = 1) {
    for (; ; ) {
      if (t > this.pos || t == this.pos && (e > 0 || this.i == 0 || this.children[this.i - 1].breakAfter))
        return this.off = t - this.pos, this;
      let i = this.children[--this.i];
      this.pos -= i.length + i.breakAfter;
    }
  }
}
function Yu(r, t, e, i, n, s, o, a, h) {
  let { children: d } = r, c = d.length ? d[t] : null, p = s.length ? s[s.length - 1] : null, m = p ? p.breakAfter : o;
  if (!(t == i && c && !o && !m && s.length < 2 && c.merge(e, n, s.length ? p : null, e == 0, a, h))) {
    if (i < d.length) {
      let b = d[i];
      b && (n < b.length || b.breakAfter && (p != null && p.breakAfter)) ? (t == i && (b = b.split(n), n = 0), !m && p && b.merge(0, n, p, !0, 0, h) ? s[s.length - 1] = b : ((n || b.children.length && !b.children[0].length) && b.merge(0, n, null, !1, 0, h), s.push(b))) : b != null && b.breakAfter && (p ? p.breakAfter = 1 : o = 1), i++;
    }
    for (c && (c.breakAfter = o, e > 0 && (!o && s.length && c.merge(e, c.length, s[0], !1, a, 0) ? c.breakAfter = s.shift().breakAfter : (e < c.length || c.children.length && c.children[c.children.length - 1].length == 0) && c.merge(e, c.length, null, !1, a, 0), t++)); t < i && s.length; )
      if (d[i - 1].become(s[s.length - 1]))
        i--, s.pop(), h = s.length ? 0 : a;
      else if (d[t].become(s[0]))
        t++, s.shift(), a = s.length ? 0 : h;
      else
        break;
    !s.length && t && i < d.length && !d[t - 1].breakAfter && d[i].merge(0, 0, d[t - 1], !1, a, h) && t--, (t < i || s.length) && r.replaceChildren(t, i, s);
  }
}
function Gu(r, t, e, i, n, s) {
  let o = r.childCursor(), { i: a, off: h } = o.findPos(e, 1), { i: d, off: c } = o.findPos(t, -1), p = t - e;
  for (let m of i)
    p += m.length;
  r.length += p, Yu(r, d, c, a, h, i, 0, n, s);
}
let ce = typeof navigator < "u" ? navigator : { userAgent: "", vendor: "", platform: "" }, ra = typeof document < "u" ? document : { documentElement: { style: {} } };
const sa = /* @__PURE__ */ /Edge\/(\d+)/.exec(ce.userAgent), Ju = /* @__PURE__ */ /MSIE \d/.test(ce.userAgent), oa = /* @__PURE__ */ /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(ce.userAgent), gl = !!(Ju || oa || sa), bh = !gl && /* @__PURE__ */ /gecko\/(\d+)/i.test(ce.userAgent), Tl = !gl && /* @__PURE__ */ /Chrome\/(\d+)/.exec(ce.userAgent), vh = "webkitFontSmoothing" in ra.documentElement.style, Xu = !gl && /* @__PURE__ */ /Apple Computer/.test(ce.vendor), wh = Xu && (/* @__PURE__ */ /Mobile\/\w+/.test(ce.userAgent) || ce.maxTouchPoints > 2);
var H = {
  mac: wh || /* @__PURE__ */ /Mac/.test(ce.platform),
  windows: /* @__PURE__ */ /Win/.test(ce.platform),
  linux: /* @__PURE__ */ /Linux|X11/.test(ce.platform),
  ie: gl,
  ie_version: Ju ? ra.documentMode || 6 : oa ? +oa[1] : sa ? +sa[1] : 0,
  gecko: bh,
  gecko_version: bh ? +(/* @__PURE__ */ /Firefox\/(\d+)/.exec(ce.userAgent) || [0, 0])[1] : 0,
  chrome: !!Tl,
  chrome_version: Tl ? +Tl[1] : 0,
  ios: wh,
  android: /* @__PURE__ */ /Android\b/.test(ce.userAgent),
  webkit: vh,
  safari: Xu,
  webkit_version: vh ? +(/* @__PURE__ */ /\bAppleWebKit\/(\d+)/.exec(ce.userAgent) || [0, 0])[1] : 0,
  tabSize: ra.documentElement.style.tabSize != null ? "tab-size" : "-moz-tab-size"
};
const fd = 256;
class Le extends At {
  constructor(t) {
    super(), this.text = t;
  }
  get length() {
    return this.text.length;
  }
  createDOM(t) {
    this.setDOM(t || document.createTextNode(this.text));
  }
  sync(t, e) {
    this.dom || this.createDOM(), this.dom.nodeValue != this.text && (e && e.node == this.dom && (e.written = !0), this.dom.nodeValue = this.text);
  }
  reuseDOM(t) {
    t.nodeType == 3 && this.createDOM(t);
  }
  merge(t, e, i) {
    return this.flags & 8 || i && (!(i instanceof Le) || this.length - (e - t) + i.length > fd || i.flags & 8) ? !1 : (this.text = this.text.slice(0, t) + (i ? i.text : "") + this.text.slice(e), this.markDirty(), !0);
  }
  split(t) {
    let e = new Le(this.text.slice(t));
    return this.text = this.text.slice(0, t), this.markDirty(), e.flags |= this.flags & 8, e;
  }
  localPosFromDOM(t, e) {
    return t == this.dom ? e : e ? this.text.length : 0;
  }
  domAtPos(t) {
    return new ee(this.dom, t);
  }
  domBoundsAround(t, e, i) {
    return { from: i, to: i + this.length, startDOM: this.dom, endDOM: this.dom.nextSibling };
  }
  coordsAt(t, e) {
    return cd(this.dom, t, e);
  }
}
class ni extends At {
  constructor(t, e = [], i = 0) {
    super(), this.mark = t, this.children = e, this.length = i;
    for (let n of e)
      n.setParent(this);
  }
  setAttrs(t) {
    if (_u(t), this.mark.class && (t.className = this.mark.class), this.mark.attrs)
      for (let e in this.mark.attrs)
        t.setAttribute(e, this.mark.attrs[e]);
    return t;
  }
  canReuseDOM(t) {
    return super.canReuseDOM(t) && !((this.flags | t.flags) & 8);
  }
  reuseDOM(t) {
    t.nodeName == this.mark.tagName.toUpperCase() && (this.setDOM(t), this.flags |= 6);
  }
  sync(t, e) {
    this.dom ? this.flags & 4 && this.setAttrs(this.dom) : this.setDOM(this.setAttrs(document.createElement(this.mark.tagName))), super.sync(t, e);
  }
  merge(t, e, i, n, s, o) {
    return i && (!(i instanceof ni && i.mark.eq(this.mark)) || t && s <= 0 || e < this.length && o <= 0) ? !1 : (Gu(this, t, e, i ? i.children.slice() : [], s - 1, o - 1), this.markDirty(), !0);
  }
  split(t) {
    let e = [], i = 0, n = -1, s = 0;
    for (let a of this.children) {
      let h = i + a.length;
      h > t && e.push(i < t ? a.split(t - i) : a), n < 0 && i >= t && (n = s), i = h, s++;
    }
    let o = this.length - t;
    return this.length = t, n > -1 && (this.children.length = n, this.markDirty()), new ni(this.mark, e, o);
  }
  domAtPos(t) {
    return Qu(this, t);
  }
  coordsAt(t, e) {
    return tf(this, t, e);
  }
}
function cd(r, t, e) {
  let i = r.nodeValue.length;
  t > i && (t = i);
  let n = t, s = t, o = 0;
  t == 0 && e < 0 || t == i && e >= 0 ? H.chrome || H.gecko || (t ? (n--, o = 1) : s < i && (s++, o = -1)) : e < 0 ? n-- : s < i && s++;
  let a = Vi(r, n, s).getClientRects();
  if (!a.length)
    return null;
  let h = a[(o ? o < 0 : e >= 0) ? 0 : a.length - 1];
  return H.safari && !o && h.width == 0 && (h = Array.prototype.find.call(a, (d) => d.width) || h), o ? dl(h, o < 0) : h || null;
}
class Ni extends At {
  static create(t, e, i) {
    return new Ni(t, e, i);
  }
  constructor(t, e, i) {
    super(), this.widget = t, this.length = e, this.side = i, this.prevWidget = null;
  }
  split(t) {
    let e = Ni.create(this.widget, this.length - t, this.side);
    return this.length -= t, e;
  }
  sync(t) {
    (!this.dom || !this.widget.updateDOM(this.dom, t)) && (this.dom && this.prevWidget && this.prevWidget.destroy(this.dom), this.prevWidget = null, this.setDOM(this.widget.toDOM(t)), this.widget.editable || (this.dom.contentEditable = "false"));
  }
  getSide() {
    return this.side;
  }
  merge(t, e, i, n, s, o) {
    return i && (!(i instanceof Ni) || !this.widget.compare(i.widget) || t > 0 && s <= 0 || e < this.length && o <= 0) ? !1 : (this.length = t + (i ? i.length : 0) + (this.length - e), !0);
  }
  become(t) {
    return t instanceof Ni && t.side == this.side && this.widget.constructor == t.widget.constructor ? (this.widget.compare(t.widget) || this.markDirty(!0), this.dom && !this.prevWidget && (this.prevWidget = this.widget), this.widget = t.widget, this.length = t.length, !0) : !1;
  }
  ignoreMutation() {
    return !0;
  }
  ignoreEvent(t) {
    return this.widget.ignoreEvent(t);
  }
  get overrideDOMText() {
    if (this.length == 0)
      return pt.empty;
    let t = this;
    for (; t.parent; )
      t = t.parent;
    let { view: e } = t, i = e && e.state.doc, n = this.posAtStart;
    return i ? i.slice(n, n + this.length) : pt.empty;
  }
  domAtPos(t) {
    return (this.length ? t == 0 : this.side > 0) ? ee.before(this.dom) : ee.after(this.dom, t == this.length);
  }
  domBoundsAround() {
    return null;
  }
  coordsAt(t, e) {
    let i = this.widget.coordsAt(this.dom, t, e);
    if (i)
      return i;
    let n = this.dom.getClientRects(), s = null;
    if (!n.length)
      return null;
    let o = this.side ? this.side < 0 : t > 0;
    for (let a = o ? n.length - 1 : 0; s = n[a], !(t > 0 ? a == 0 : a == n.length - 1 || s.top < s.bottom); a += o ? -1 : 1)
      ;
    return dl(s, !o);
  }
  get isEditable() {
    return !1;
  }
  get isWidget() {
    return !0;
  }
  get isHidden() {
    return this.widget.isHidden;
  }
  destroy() {
    super.destroy(), this.dom && this.widget.destroy(this.dom);
  }
}
class Ln extends At {
  constructor(t) {
    super(), this.side = t;
  }
  get length() {
    return 0;
  }
  merge() {
    return !1;
  }
  become(t) {
    return t instanceof Ln && t.side == this.side;
  }
  split() {
    return new Ln(this.side);
  }
  sync() {
    if (!this.dom) {
      let t = document.createElement("img");
      t.className = "cm-widgetBuffer", t.setAttribute("aria-hidden", "true"), this.setDOM(t);
    }
  }
  getSide() {
    return this.side;
  }
  domAtPos(t) {
    return this.side > 0 ? ee.before(this.dom) : ee.after(this.dom);
  }
  localPosFromDOM() {
    return 0;
  }
  domBoundsAround() {
    return null;
  }
  coordsAt(t) {
    return this.dom.getBoundingClientRect();
  }
  get overrideDOMText() {
    return pt.empty;
  }
  get isHidden() {
    return !0;
  }
}
Le.prototype.children = Ni.prototype.children = Ln.prototype.children = Oa;
function Qu(r, t) {
  let e = r.dom, { children: i } = r, n = 0;
  for (let s = 0; n < i.length; n++) {
    let o = i[n], a = s + o.length;
    if (!(a == s && o.getSide() <= 0)) {
      if (t > s && t < a && o.dom.parentNode == e)
        return o.domAtPos(t - s);
      if (t <= s)
        break;
      s = a;
    }
  }
  for (let s = n; s > 0; s--) {
    let o = i[s - 1];
    if (o.dom.parentNode == e)
      return o.domAtPos(o.length);
  }
  for (let s = n; s < i.length; s++) {
    let o = i[s];
    if (o.dom.parentNode == e)
      return o.domAtPos(0);
  }
  return new ee(e, 0);
}
function Zu(r, t, e) {
  let i, { children: n } = r;
  e > 0 && t instanceof ni && n.length && (i = n[n.length - 1]) instanceof ni && i.mark.eq(t.mark) ? Zu(i, t.children[0], e - 1) : (n.push(t), t.setParent(r)), r.length += t.length;
}
function tf(r, t, e) {
  let i = null, n = -1, s = null, o = -1;
  function a(d, c) {
    for (let p = 0, m = 0; p < d.children.length && m <= c; p++) {
      let b = d.children[p], S = m + b.length;
      S >= c && (b.children.length ? a(b, c - m) : (!s || s.isHidden && e > 0) && (S > c || m == S && b.getSide() > 0) ? (s = b, o = c - m) : (m < c || m == S && b.getSide() < 0 && !b.isHidden) && (i = b, n = c - m)), m = S;
    }
  }
  a(r, t);
  let h = (e < 0 ? i : s) || i || s;
  return h ? h.coordsAt(Math.max(0, h == i ? n : o), e) : dd(r);
}
function dd(r) {
  let t = r.dom.lastChild;
  if (!t)
    return r.dom.getBoundingClientRect();
  let e = Tr(t);
  return e[e.length - 1] || null;
}
function la(r, t) {
  for (let e in r)
    e == "class" && t.class ? t.class += " " + r.class : e == "style" && t.style ? t.style += ";" + r.style : t[e] = r[e];
  return t;
}
const Sh = /* @__PURE__ */ Object.create(null);
function el(r, t, e) {
  if (r == t)
    return !0;
  r || (r = Sh), t || (t = Sh);
  let i = Object.keys(r), n = Object.keys(t);
  if (i.length - (e && i.indexOf(e) > -1 ? 1 : 0) != n.length - (e && n.indexOf(e) > -1 ? 1 : 0))
    return !1;
  for (let s of i)
    if (s != e && (n.indexOf(s) == -1 || r[s] !== t[s]))
      return !1;
  return !0;
}
function aa(r, t, e) {
  let i = !1;
  if (t)
    for (let n in t)
      e && n in e || (i = !0, n == "style" ? r.style.cssText = "" : r.removeAttribute(n));
  if (e)
    for (let n in e)
      t && t[n] == e[n] || (i = !0, n == "style" ? r.style.cssText = e[n] : r.setAttribute(n, e[n]));
  return i;
}
function gd(r) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let e = 0; e < r.attributes.length; e++) {
    let i = r.attributes[e];
    t[i.name] = i.value;
  }
  return t;
}
class pl {
  /**
  Compare this instance to another instance of the same type.
  (TypeScript can't express this, but only instances of the same
  specific class will be passed to this method.) This is used to
  avoid redrawing widgets when they are replaced by a new
  decoration of the same type. The default implementation just
  returns `false`, which will cause new instances of the widget to
  always be redrawn.
  */
  eq(t) {
    return !1;
  }
  /**
  Update a DOM element created by a widget of the same type (but
  different, non-`eq` content) to reflect this widget. May return
  true to indicate that it could update, false to indicate it
  couldn't (in which case the widget will be redrawn). The default
  implementation just returns false.
  */
  updateDOM(t, e) {
    return !1;
  }
  /**
  @internal
  */
  compare(t) {
    return this == t || this.constructor == t.constructor && this.eq(t);
  }
  /**
  The estimated height this widget will have, to be used when
  estimating the height of content that hasn't been drawn. May
  return -1 to indicate you don't know. The default implementation
  returns -1.
  */
  get estimatedHeight() {
    return -1;
  }
  /**
  For inline widgets that are displayed inline (as opposed to
  `inline-block`) and introduce line breaks (through `<br>` tags
  or textual newlines), this must indicate the amount of line
  breaks they introduce. Defaults to 0.
  */
  get lineBreaks() {
    return 0;
  }
  /**
  Can be used to configure which kinds of events inside the widget
  should be ignored by the editor. The default is to ignore all
  events.
  */
  ignoreEvent(t) {
    return !0;
  }
  /**
  Override the way screen coordinates for positions at/in the
  widget are found. `pos` will be the offset into the widget, and
  `side` the side of the position that is being queried—less than
  zero for before, greater than zero for after, and zero for
  directly at that position.
  */
  coordsAt(t, e, i) {
    return null;
  }
  /**
  @internal
  */
  get isHidden() {
    return !1;
  }
  /**
  @internal
  */
  get editable() {
    return !1;
  }
  /**
  This is called when the an instance of the widget is removed
  from the editor view.
  */
  destroy(t) {
  }
}
var Ye = /* @__PURE__ */ function(r) {
  return r[r.Text = 0] = "Text", r[r.WidgetBefore = 1] = "WidgetBefore", r[r.WidgetAfter = 2] = "WidgetAfter", r[r.WidgetRange = 3] = "WidgetRange", r;
}(Ye || (Ye = {}));
class Kt extends Fi {
  constructor(t, e, i, n) {
    super(), this.startSide = t, this.endSide = e, this.widget = i, this.spec = n;
  }
  /**
  @internal
  */
  get heightRelevant() {
    return !1;
  }
  /**
  Create a mark decoration, which influences the styling of the
  content in its range. Nested mark decorations will cause nested
  DOM elements to be created. Nesting order is determined by
  precedence of the [facet](https://codemirror.net/6/docs/ref/#view.EditorView^decorations), with
  the higher-precedence decorations creating the inner DOM nodes.
  Such elements are split on line boundaries and on the boundaries
  of lower-precedence decorations.
  */
  static mark(t) {
    return new Nr(t);
  }
  /**
  Create a widget decoration, which displays a DOM element at the
  given position.
  */
  static widget(t) {
    let e = Math.max(-1e4, Math.min(1e4, t.side || 0)), i = !!t.block;
    return e += i && !t.inlineOrder ? e > 0 ? 3e8 : -4e8 : e > 0 ? 1e8 : -1e8, new bi(t, e, e, i, t.widget || null, !1);
  }
  /**
  Create a replace decoration which replaces the given range with
  a widget, or simply hides it.
  */
  static replace(t) {
    let e = !!t.block, i, n;
    if (t.isBlockGap)
      i = -5e8, n = 4e8;
    else {
      let { start: s, end: o } = ef(t, e);
      i = (s ? e ? -3e8 : -1 : 5e8) - 1, n = (o ? e ? 2e8 : 1 : -6e8) + 1;
    }
    return new bi(t, i, n, e, t.widget || null, !0);
  }
  /**
  Create a line decoration, which can add DOM attributes to the
  line starting at the given position.
  */
  static line(t) {
    return new Ir(t);
  }
  /**
  Build a [`DecorationSet`](https://codemirror.net/6/docs/ref/#view.DecorationSet) from the given
  decorated range or ranges. If the ranges aren't already sorted,
  pass `true` for `sort` to make the library sort them for you.
  */
  static set(t, e = !1) {
    return Et.of(t, e);
  }
  /**
  @internal
  */
  hasHeight() {
    return this.widget ? this.widget.estimatedHeight > -1 : !1;
  }
}
Kt.none = Et.empty;
class Nr extends Kt {
  constructor(t) {
    let { start: e, end: i } = ef(t);
    super(e ? -1 : 5e8, i ? 1 : -6e8, null, t), this.tagName = t.tagName || "span", this.class = t.class || "", this.attrs = t.attributes || null;
  }
  eq(t) {
    var e, i;
    return this == t || t instanceof Nr && this.tagName == t.tagName && (this.class || ((e = this.attrs) === null || e === void 0 ? void 0 : e.class)) == (t.class || ((i = t.attrs) === null || i === void 0 ? void 0 : i.class)) && el(this.attrs, t.attrs, "class");
  }
  range(t, e = t) {
    if (t >= e)
      throw new RangeError("Mark decorations may not be empty");
    return super.range(t, e);
  }
}
Nr.prototype.point = !1;
class Ir extends Kt {
  constructor(t) {
    super(-2e8, -2e8, null, t);
  }
  eq(t) {
    return t instanceof Ir && this.spec.class == t.spec.class && el(this.spec.attributes, t.spec.attributes);
  }
  range(t, e = t) {
    if (e != t)
      throw new RangeError("Line decoration ranges must be zero-length");
    return super.range(t, e);
  }
}
Ir.prototype.mapMode = ge.TrackBefore;
Ir.prototype.point = !0;
class bi extends Kt {
  constructor(t, e, i, n, s, o) {
    super(e, i, s, t), this.block = n, this.isReplace = o, this.mapMode = n ? e <= 0 ? ge.TrackBefore : ge.TrackAfter : ge.TrackDel;
  }
  // Only relevant when this.block == true
  get type() {
    return this.startSide != this.endSide ? Ye.WidgetRange : this.startSide <= 0 ? Ye.WidgetBefore : Ye.WidgetAfter;
  }
  get heightRelevant() {
    return this.block || !!this.widget && (this.widget.estimatedHeight >= 5 || this.widget.lineBreaks > 0);
  }
  eq(t) {
    return t instanceof bi && pd(this.widget, t.widget) && this.block == t.block && this.startSide == t.startSide && this.endSide == t.endSide;
  }
  range(t, e = t) {
    if (this.isReplace && (t > e || t == e && this.startSide > 0 && this.endSide <= 0))
      throw new RangeError("Invalid range for replacement decoration");
    if (!this.isReplace && e != t)
      throw new RangeError("Widget decorations can only have zero-length ranges");
    return super.range(t, e);
  }
}
bi.prototype.point = !0;
function ef(r, t = !1) {
  let { inclusiveStart: e, inclusiveEnd: i } = r;
  return e == null && (e = r.inclusive), i == null && (i = r.inclusive), { start: e ?? t, end: i ?? t };
}
function pd(r, t) {
  return r == t || !!(r && t && r.compare(t));
}
function Yo(r, t, e, i = 0) {
  let n = e.length - 1;
  n >= 0 && e[n] + i >= r ? e[n] = Math.max(e[n], t) : e.push(r, t);
}
class Ht extends At {
  constructor() {
    super(...arguments), this.children = [], this.length = 0, this.prevAttrs = void 0, this.attrs = null, this.breakAfter = 0;
  }
  // Consumes source
  merge(t, e, i, n, s, o) {
    if (i) {
      if (!(i instanceof Ht))
        return !1;
      this.dom || i.transferDOM(this);
    }
    return n && this.setDeco(i ? i.attrs : null), Gu(this, t, e, i ? i.children.slice() : [], s, o), !0;
  }
  split(t) {
    let e = new Ht();
    if (e.breakAfter = this.breakAfter, this.length == 0)
      return e;
    let { i, off: n } = this.childPos(t);
    n && (e.append(this.children[i].split(n), 0), this.children[i].merge(n, this.children[i].length, null, !1, 0, 0), i++);
    for (let s = i; s < this.children.length; s++)
      e.append(this.children[s], 0);
    for (; i > 0 && this.children[i - 1].length == 0; )
      this.children[--i].destroy();
    return this.children.length = i, this.markDirty(), this.length = t, e;
  }
  transferDOM(t) {
    this.dom && (this.markDirty(), t.setDOM(this.dom), t.prevAttrs = this.prevAttrs === void 0 ? this.attrs : this.prevAttrs, this.prevAttrs = void 0, this.dom = null);
  }
  setDeco(t) {
    el(this.attrs, t) || (this.dom && (this.prevAttrs = this.attrs, this.markDirty()), this.attrs = t);
  }
  append(t, e) {
    Zu(this, t, e);
  }
  // Only called when building a line view in ContentBuilder
  addLineDeco(t) {
    let e = t.spec.attributes, i = t.spec.class;
    e && (this.attrs = la(e, this.attrs || {})), i && (this.attrs = la({ class: i }, this.attrs || {}));
  }
  domAtPos(t) {
    return Qu(this, t);
  }
  reuseDOM(t) {
    t.nodeName == "DIV" && (this.setDOM(t), this.flags |= 6);
  }
  sync(t, e) {
    var i;
    this.dom ? this.flags & 4 && (_u(this.dom), this.dom.className = "cm-line", this.prevAttrs = this.attrs ? null : void 0) : (this.setDOM(document.createElement("div")), this.dom.className = "cm-line", this.prevAttrs = this.attrs ? null : void 0), this.prevAttrs !== void 0 && (aa(this.dom, this.prevAttrs, this.attrs), this.dom.classList.add("cm-line"), this.prevAttrs = void 0), super.sync(t, e);
    let n = this.dom.lastChild;
    for (; n && At.get(n) instanceof ni; )
      n = n.lastChild;
    if (!n || !this.length || n.nodeName != "BR" && ((i = At.get(n)) === null || i === void 0 ? void 0 : i.isEditable) == !1 && (!H.ios || !this.children.some((s) => s instanceof Le))) {
      let s = document.createElement("BR");
      s.cmIgnore = !0, this.dom.appendChild(s);
    }
  }
  measureTextSize() {
    if (this.children.length == 0 || this.length > 20)
      return null;
    let t = 0, e;
    for (let i of this.children) {
      if (!(i instanceof Le) || /[^ -~]/.test(i.text))
        return null;
      let n = Tr(i.dom);
      if (n.length != 1)
        return null;
      t += n[0].width, e = n[0].height;
    }
    return t ? {
      lineHeight: this.dom.getBoundingClientRect().height,
      charWidth: t / this.length,
      textHeight: e
    } : null;
  }
  coordsAt(t, e) {
    let i = tf(this, t, e);
    if (!this.children.length && i && this.parent) {
      let { heightOracle: n } = this.parent.view.viewState, s = i.bottom - i.top;
      if (Math.abs(s - n.lineHeight) < 2 && n.textHeight < s) {
        let o = (s - n.textHeight) / 2;
        return { top: i.top + o, bottom: i.bottom - o, left: i.left, right: i.left };
      }
    }
    return i;
  }
  become(t) {
    return t instanceof Ht && this.children.length == 0 && t.children.length == 0 && el(this.attrs, t.attrs) && this.breakAfter == t.breakAfter;
  }
  covers() {
    return !0;
  }
  static find(t, e) {
    for (let i = 0, n = 0; i < t.children.length; i++) {
      let s = t.children[i], o = n + s.length;
      if (o >= e) {
        if (s instanceof Ht)
          return s;
        if (o > e)
          break;
      }
      n = o + s.breakAfter;
    }
    return null;
  }
}
class ii extends At {
  constructor(t, e, i) {
    super(), this.widget = t, this.length = e, this.deco = i, this.breakAfter = 0, this.prevWidget = null;
  }
  merge(t, e, i, n, s, o) {
    return i && (!(i instanceof ii) || !this.widget.compare(i.widget) || t > 0 && s <= 0 || e < this.length && o <= 0) ? !1 : (this.length = t + (i ? i.length : 0) + (this.length - e), !0);
  }
  domAtPos(t) {
    return t == 0 ? ee.before(this.dom) : ee.after(this.dom, t == this.length);
  }
  split(t) {
    let e = this.length - t;
    this.length = t;
    let i = new ii(this.widget, e, this.deco);
    return i.breakAfter = this.breakAfter, i;
  }
  get children() {
    return Oa;
  }
  sync(t) {
    (!this.dom || !this.widget.updateDOM(this.dom, t)) && (this.dom && this.prevWidget && this.prevWidget.destroy(this.dom), this.prevWidget = null, this.setDOM(this.widget.toDOM(t)), this.widget.editable || (this.dom.contentEditable = "false"));
  }
  get overrideDOMText() {
    return this.parent ? this.parent.view.state.doc.slice(this.posAtStart, this.posAtEnd) : pt.empty;
  }
  domBoundsAround() {
    return null;
  }
  become(t) {
    return t instanceof ii && t.widget.constructor == this.widget.constructor ? (t.widget.compare(this.widget) || this.markDirty(!0), this.dom && !this.prevWidget && (this.prevWidget = this.widget), this.widget = t.widget, this.length = t.length, this.deco = t.deco, this.breakAfter = t.breakAfter, !0) : !1;
  }
  ignoreMutation() {
    return !0;
  }
  ignoreEvent(t) {
    return this.widget.ignoreEvent(t);
  }
  get isEditable() {
    return !1;
  }
  get isWidget() {
    return !0;
  }
  coordsAt(t, e) {
    let i = this.widget.coordsAt(this.dom, t, e);
    return i || (this.widget instanceof ha ? null : dl(this.dom.getBoundingClientRect(), this.length ? t == 0 : e <= 0));
  }
  destroy() {
    super.destroy(), this.dom && this.widget.destroy(this.dom);
  }
  covers(t) {
    let { startSide: e, endSide: i } = this.deco;
    return e == i ? !1 : t < 0 ? e < 0 : i > 0;
  }
}
class ha extends pl {
  constructor(t) {
    super(), this.height = t;
  }
  toDOM() {
    let t = document.createElement("div");
    return t.className = "cm-gap", this.updateDOM(t), t;
  }
  eq(t) {
    return t.height == this.height;
  }
  updateDOM(t) {
    return t.style.height = this.height + "px", !0;
  }
  get editable() {
    return !0;
  }
  get estimatedHeight() {
    return this.height;
  }
  ignoreEvent() {
    return !1;
  }
}
class Ar {
  constructor(t, e, i, n) {
    this.doc = t, this.pos = e, this.end = i, this.disallowBlockEffectsFor = n, this.content = [], this.curLine = null, this.breakAtStart = 0, this.pendingBuffer = 0, this.bufferMarks = [], this.atCursorPos = !0, this.openStart = -1, this.openEnd = -1, this.text = "", this.textOff = 0, this.cursor = t.iter(), this.skip = e;
  }
  posCovered() {
    if (this.content.length == 0)
      return !this.breakAtStart && this.doc.lineAt(this.pos).from != this.pos;
    let t = this.content[this.content.length - 1];
    return !(t.breakAfter || t instanceof ii && t.deco.endSide < 0);
  }
  getLine() {
    return this.curLine || (this.content.push(this.curLine = new Ht()), this.atCursorPos = !0), this.curLine;
  }
  flushBuffer(t = this.bufferMarks) {
    this.pendingBuffer && (this.curLine.append(Do(new Ln(-1), t), t.length), this.pendingBuffer = 0);
  }
  addBlockWidget(t) {
    this.flushBuffer(), this.curLine = null, this.content.push(t);
  }
  finish(t) {
    this.pendingBuffer && t <= this.bufferMarks.length ? this.flushBuffer() : this.pendingBuffer = 0, !this.posCovered() && !(t && this.content.length && this.content[this.content.length - 1] instanceof ii) && this.getLine();
  }
  buildText(t, e, i) {
    for (; t > 0; ) {
      if (this.textOff == this.text.length) {
        let { value: s, lineBreak: o, done: a } = this.cursor.next(this.skip);
        if (this.skip = 0, a)
          throw new Error("Ran out of text content when drawing inline views");
        if (o) {
          this.posCovered() || this.getLine(), this.content.length ? this.content[this.content.length - 1].breakAfter = 1 : this.breakAtStart = 1, this.flushBuffer(), this.curLine = null, this.atCursorPos = !0, t--;
          continue;
        } else
          this.text = s, this.textOff = 0;
      }
      let n = Math.min(
        this.text.length - this.textOff,
        t,
        512
        /* T.Chunk */
      );
      this.flushBuffer(e.slice(e.length - i)), this.getLine().append(Do(new Le(this.text.slice(this.textOff, this.textOff + n)), e), i), this.atCursorPos = !0, this.textOff += n, t -= n, i = 0;
    }
  }
  span(t, e, i, n) {
    this.buildText(e - t, i, n), this.pos = e, this.openStart < 0 && (this.openStart = n);
  }
  point(t, e, i, n, s, o) {
    if (this.disallowBlockEffectsFor[o] && i instanceof bi) {
      if (i.block)
        throw new RangeError("Block decorations may not be specified via plugins");
      if (e > this.doc.lineAt(this.pos).to)
        throw new RangeError("Decorations that replace line breaks may not be specified via plugins");
    }
    let a = e - t;
    if (i instanceof bi)
      if (i.block)
        i.startSide > 0 && !this.posCovered() && this.getLine(), this.addBlockWidget(new ii(i.widget || Fn.block, a, i));
      else {
        let h = Ni.create(i.widget || Fn.inline, a, a ? 0 : i.startSide), d = this.atCursorPos && !h.isEditable && s <= n.length && (t < e || i.startSide > 0), c = !h.isEditable && (t < e || s > n.length || i.startSide <= 0), p = this.getLine();
        this.pendingBuffer == 2 && !d && !h.isEditable && (this.pendingBuffer = 0), this.flushBuffer(n), d && (p.append(Do(new Ln(1), n), s), s = n.length + Math.max(0, s - n.length)), p.append(Do(h, n), s), this.atCursorPos = c, this.pendingBuffer = c ? t < e || s > n.length ? 1 : 2 : 0, this.pendingBuffer && (this.bufferMarks = n.slice());
      }
    else this.doc.lineAt(this.pos).from == this.pos && this.getLine().addLineDeco(i);
    a && (this.textOff + a <= this.text.length ? this.textOff += a : (this.skip += a - (this.text.length - this.textOff), this.text = "", this.textOff = 0), this.pos = e), this.openStart < 0 && (this.openStart = s);
  }
  static build(t, e, i, n, s) {
    let o = new Ar(t, e, i, s);
    return o.openEnd = Et.spans(n, e, i, o), o.openStart < 0 && (o.openStart = o.openEnd), o.finish(o.openEnd), o;
  }
}
function Do(r, t) {
  for (let e of t)
    r = new ni(e, [r], r.length);
  return r;
}
class Fn extends pl {
  constructor(t) {
    super(), this.tag = t;
  }
  eq(t) {
    return t.tag == this.tag;
  }
  toDOM() {
    return document.createElement(this.tag);
  }
  updateDOM(t) {
    return t.nodeName.toLowerCase() == this.tag;
  }
  get isHidden() {
    return !0;
  }
}
Fn.inline = /* @__PURE__ */ new Fn("span");
Fn.block = /* @__PURE__ */ new Fn("div");
var Wt = /* @__PURE__ */ function(r) {
  return r[r.LTR = 0] = "LTR", r[r.RTL = 1] = "RTL", r;
}(Wt || (Wt = {}));
const Hi = Wt.LTR, Ta = Wt.RTL;
function nf(r) {
  let t = [];
  for (let e = 0; e < r.length; e++)
    t.push(1 << +r[e]);
  return t;
}
const md = /* @__PURE__ */ nf("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"), yd = /* @__PURE__ */ nf("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"), ua = /* @__PURE__ */ Object.create(null), We = [];
for (let r of ["()", "[]", "{}"]) {
  let t = /* @__PURE__ */ r.charCodeAt(0), e = /* @__PURE__ */ r.charCodeAt(1);
  ua[t] = e, ua[e] = -t;
}
function rf(r) {
  return r <= 247 ? md[r] : 1424 <= r && r <= 1524 ? 2 : 1536 <= r && r <= 1785 ? yd[r - 1536] : 1774 <= r && r <= 2220 ? 4 : 8192 <= r && r <= 8204 ? 256 : 64336 <= r && r <= 65023 ? 4 : 1;
}
const bd = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;
class gi {
  /**
  The direction of this span.
  */
  get dir() {
    return this.level % 2 ? Ta : Hi;
  }
  /**
  @internal
  */
  constructor(t, e, i) {
    this.from = t, this.to = e, this.level = i;
  }
  /**
  @internal
  */
  side(t, e) {
    return this.dir == e == t ? this.to : this.from;
  }
  /**
  @internal
  */
  forward(t, e) {
    return t == (this.dir == e);
  }
  /**
  @internal
  */
  static find(t, e, i, n) {
    let s = -1;
    for (let o = 0; o < t.length; o++) {
      let a = t[o];
      if (a.from <= e && a.to >= e) {
        if (a.level == i)
          return o;
        (s < 0 || (n != 0 ? n < 0 ? a.from < e : a.to > e : t[s].level > a.level)) && (s = o);
      }
    }
    if (s < 0)
      throw new RangeError("Index out of range");
    return s;
  }
}
function sf(r, t) {
  if (r.length != t.length)
    return !1;
  for (let e = 0; e < r.length; e++) {
    let i = r[e], n = t[e];
    if (i.from != n.from || i.to != n.to || i.direction != n.direction || !sf(i.inner, n.inner))
      return !1;
  }
  return !0;
}
const St = [];
function vd(r, t, e, i, n) {
  for (let s = 0; s <= i.length; s++) {
    let o = s ? i[s - 1].to : t, a = s < i.length ? i[s].from : e, h = s ? 256 : n;
    for (let d = o, c = h, p = h; d < a; d++) {
      let m = rf(r.charCodeAt(d));
      m == 512 ? m = c : m == 8 && p == 4 && (m = 16), St[d] = m == 4 ? 2 : m, m & 7 && (p = m), c = m;
    }
    for (let d = o, c = h, p = h; d < a; d++) {
      let m = St[d];
      if (m == 128)
        d < a - 1 && c == St[d + 1] && c & 24 ? m = St[d] = c : St[d] = 256;
      else if (m == 64) {
        let b = d + 1;
        for (; b < a && St[b] == 64; )
          b++;
        let S = d && c == 8 || b < e && St[b] == 8 ? p == 1 ? 1 : 8 : 256;
        for (let E = d; E < b; E++)
          St[E] = S;
        d = b - 1;
      } else m == 8 && p == 1 && (St[d] = 1);
      c = m, m & 7 && (p = m);
    }
  }
}
function wd(r, t, e, i, n) {
  let s = n == 1 ? 2 : 1;
  for (let o = 0, a = 0, h = 0; o <= i.length; o++) {
    let d = o ? i[o - 1].to : t, c = o < i.length ? i[o].from : e;
    for (let p = d, m, b, S; p < c; p++)
      if (b = ua[m = r.charCodeAt(p)])
        if (b < 0) {
          for (let E = a - 3; E >= 0; E -= 3)
            if (We[E + 1] == -b) {
              let w = We[E + 2], M = w & 2 ? n : w & 4 ? w & 1 ? s : n : 0;
              M && (St[p] = St[We[E]] = M), a = E;
              break;
            }
        } else {
          if (We.length == 189)
            break;
          We[a++] = p, We[a++] = m, We[a++] = h;
        }
      else if ((S = St[p]) == 2 || S == 1) {
        let E = S == n;
        h = E ? 0 : 1;
        for (let w = a - 3; w >= 0; w -= 3) {
          let M = We[w + 2];
          if (M & 2)
            break;
          if (E)
            We[w + 2] |= 2;
          else {
            if (M & 4)
              break;
            We[w + 2] |= 4;
          }
        }
      }
  }
}
function Sd(r, t, e, i) {
  for (let n = 0, s = i; n <= e.length; n++) {
    let o = n ? e[n - 1].to : r, a = n < e.length ? e[n].from : t;
    for (let h = o; h < a; ) {
      let d = St[h];
      if (d == 256) {
        let c = h + 1;
        for (; ; )
          if (c == a) {
            if (n == e.length)
              break;
            c = e[n++].to, a = n < e.length ? e[n].from : t;
          } else if (St[c] == 256)
            c++;
          else
            break;
        let p = s == 1, m = (c < t ? St[c] : i) == 1, b = p == m ? p ? 1 : 2 : i;
        for (let S = c, E = n, w = E ? e[E - 1].to : r; S > h; )
          S == w && (S = e[--E].from, w = E ? e[E - 1].to : r), St[--S] = b;
        h = c;
      } else
        s = d, h++;
    }
  }
}
function fa(r, t, e, i, n, s, o) {
  let a = i % 2 ? 2 : 1;
  if (i % 2 == n % 2)
    for (let h = t, d = 0; h < e; ) {
      let c = !0, p = !1;
      if (d == s.length || h < s[d].from) {
        let E = St[h];
        E != a && (c = !1, p = E == 16);
      }
      let m = !c && a == 1 ? [] : null, b = c ? i : i + 1, S = h;
      t: for (; ; )
        if (d < s.length && S == s[d].from) {
          if (p)
            break t;
          let E = s[d];
          if (!c)
            for (let w = E.to, M = d + 1; ; ) {
              if (w == e)
                break t;
              if (M < s.length && s[M].from == w)
                w = s[M++].to;
              else {
                if (St[w] == a)
                  break t;
                break;
              }
            }
          if (d++, m)
            m.push(E);
          else {
            E.from > h && o.push(new gi(h, E.from, b));
            let w = E.direction == Hi != !(b % 2);
            ca(r, w ? i + 1 : i, n, E.inner, E.from, E.to, o), h = E.to;
          }
          S = E.to;
        } else {
          if (S == e || (c ? St[S] != a : St[S] == a))
            break;
          S++;
        }
      m ? fa(r, h, S, i + 1, n, m, o) : h < S && o.push(new gi(h, S, b)), h = S;
    }
  else
    for (let h = e, d = s.length; h > t; ) {
      let c = !0, p = !1;
      if (!d || h > s[d - 1].to) {
        let E = St[h - 1];
        E != a && (c = !1, p = E == 16);
      }
      let m = !c && a == 1 ? [] : null, b = c ? i : i + 1, S = h;
      t: for (; ; )
        if (d && S == s[d - 1].to) {
          if (p)
            break t;
          let E = s[--d];
          if (!c)
            for (let w = E.from, M = d; ; ) {
              if (w == t)
                break t;
              if (M && s[M - 1].to == w)
                w = s[--M].from;
              else {
                if (St[w - 1] == a)
                  break t;
                break;
              }
            }
          if (m)
            m.push(E);
          else {
            E.to < h && o.push(new gi(E.to, h, b));
            let w = E.direction == Hi != !(b % 2);
            ca(r, w ? i + 1 : i, n, E.inner, E.from, E.to, o), h = E.from;
          }
          S = E.from;
        } else {
          if (S == t || (c ? St[S - 1] != a : St[S - 1] == a))
            break;
          S--;
        }
      m ? fa(r, S, h, i + 1, n, m, o) : S < h && o.push(new gi(S, h, b)), h = S;
    }
}
function ca(r, t, e, i, n, s, o) {
  let a = t % 2 ? 2 : 1;
  vd(r, n, s, i, a), wd(r, n, s, i, a), Sd(n, s, i, a), fa(r, n, s, t, e, i, o);
}
function Ad(r, t, e) {
  if (!r)
    return [new gi(0, 0, t == Ta ? 1 : 0)];
  if (t == Hi && !e.length && !bd.test(r))
    return of(r.length);
  if (e.length)
    for (; r.length > St.length; )
      St[St.length] = 256;
  let i = [], n = t == Hi ? 0 : 1;
  return ca(r, n, n, e, 0, r.length, i), i;
}
function of(r) {
  return [new gi(0, r, 0)];
}
let lf = "";
function kd(r, t, e, i, n) {
  var s;
  let o = i.head - r.from, a = gi.find(t, o, (s = i.bidiLevel) !== null && s !== void 0 ? s : -1, i.assoc), h = t[a], d = h.side(n, e);
  if (o == d) {
    let m = a += n ? 1 : -1;
    if (m < 0 || m >= t.length)
      return null;
    h = t[a = m], o = h.side(!n, e), d = h.side(n, e);
  }
  let c = ke(r.text, o, h.forward(n, e));
  (c < h.from || c > h.to) && (c = d), lf = r.text.slice(Math.min(o, c), Math.max(o, c));
  let p = a == (n ? t.length - 1 : 0) ? null : t[a + (n ? 1 : -1)];
  return p && c == d && p.level + (n ? 0 : 1) < h.level ? U.cursor(p.side(!n, e) + r.from, p.forward(n, e) ? 1 : -1, p.level) : U.cursor(c + r.from, h.forward(n, e) ? -1 : 1, h.level);
}
function Cd(r, t, e) {
  for (let i = t; i < e; i++) {
    let n = rf(r.charCodeAt(i));
    if (n == 1)
      return Hi;
    if (n == 2 || n == 4)
      return Ta;
  }
  return Hi;
}
const af = /* @__PURE__ */ Z.define(), hf = /* @__PURE__ */ Z.define(), uf = /* @__PURE__ */ Z.define(), ff = /* @__PURE__ */ Z.define(), da = /* @__PURE__ */ Z.define(), cf = /* @__PURE__ */ Z.define(), df = /* @__PURE__ */ Z.define(), xa = /* @__PURE__ */ Z.define(), Da = /* @__PURE__ */ Z.define(), gf = /* @__PURE__ */ Z.define({
  combine: (r) => r.some((t) => t)
}), Ed = /* @__PURE__ */ Z.define({
  combine: (r) => r.some((t) => t)
}), pf = /* @__PURE__ */ Z.define();
class Nn {
  constructor(t, e = "nearest", i = "nearest", n = 5, s = 5, o = !1) {
    this.range = t, this.y = e, this.x = i, this.yMargin = n, this.xMargin = s, this.isSnapshot = o;
  }
  map(t) {
    return t.empty ? this : new Nn(this.range.map(t), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
  }
  clip(t) {
    return this.range.to <= t.doc.length ? this : new Nn(U.cursor(t.doc.length), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
  }
}
const Ro = /* @__PURE__ */ Rt.define({ map: (r, t) => r.map(t) }), mf = /* @__PURE__ */ Rt.define();
function ye(r, t, e) {
  let i = r.facet(ff);
  i.length ? i[0](t) : window.onerror ? window.onerror(String(t), e, void 0, void 0, t) : e ? console.error(e + ":", t) : console.error(t);
}
const ti = /* @__PURE__ */ Z.define({ combine: (r) => r.length ? r[0] : !0 });
let Md = 0;
const dr = /* @__PURE__ */ Z.define();
class ri {
  constructor(t, e, i, n, s) {
    this.id = t, this.create = e, this.domEventHandlers = i, this.domEventObservers = n, this.extension = s(this);
  }
  /**
  Define a plugin from a constructor function that creates the
  plugin's value, given an editor view.
  */
  static define(t, e) {
    const { eventHandlers: i, eventObservers: n, provide: s, decorations: o } = e || {};
    return new ri(Md++, t, i, n, (a) => {
      let h = [dr.of(a)];
      return o && h.push(xr.of((d) => {
        let c = d.plugin(a);
        return c ? o(c) : Kt.none;
      })), s && h.push(s(a)), h;
    });
  }
  /**
  Create a plugin for a class whose constructor takes a single
  editor view as argument.
  */
  static fromClass(t, e) {
    return ri.define((i) => new t(i), e);
  }
}
class xl {
  constructor(t) {
    this.spec = t, this.mustUpdate = null, this.value = null;
  }
  update(t) {
    if (this.value) {
      if (this.mustUpdate) {
        let e = this.mustUpdate;
        if (this.mustUpdate = null, this.value.update)
          try {
            this.value.update(e);
          } catch (i) {
            if (ye(e.state, i, "CodeMirror plugin crashed"), this.value.destroy)
              try {
                this.value.destroy();
              } catch {
              }
            this.deactivate();
          }
      }
    } else if (this.spec)
      try {
        this.value = this.spec.create(t);
      } catch (e) {
        ye(t.state, e, "CodeMirror plugin crashed"), this.deactivate();
      }
    return this;
  }
  destroy(t) {
    var e;
    if (!((e = this.value) === null || e === void 0) && e.destroy)
      try {
        this.value.destroy();
      } catch (i) {
        ye(t.state, i, "CodeMirror plugin crashed");
      }
  }
  deactivate() {
    this.spec = this.value = null;
  }
}
const yf = /* @__PURE__ */ Z.define(), Ra = /* @__PURE__ */ Z.define(), xr = /* @__PURE__ */ Z.define(), bf = /* @__PURE__ */ Z.define(), Na = /* @__PURE__ */ Z.define(), vf = /* @__PURE__ */ Z.define();
function Ah(r, t) {
  let e = r.state.facet(vf);
  if (!e.length)
    return e;
  let i = e.map((s) => s instanceof Function ? s(r) : s), n = [];
  return Et.spans(i, t.from, t.to, {
    point() {
    },
    span(s, o, a, h) {
      let d = s - t.from, c = o - t.from, p = n;
      for (let m = a.length - 1; m >= 0; m--, h--) {
        let b = a[m].spec.bidiIsolate, S;
        if (b == null && (b = Cd(t.text, d, c)), h > 0 && p.length && (S = p[p.length - 1]).to == d && S.direction == b)
          S.to = c, p = S.inner;
        else {
          let E = { from: d, to: c, direction: b, inner: [] };
          p.push(E), p = E.inner;
        }
      }
    }
  }), n;
}
const wf = /* @__PURE__ */ Z.define();
function Ia(r) {
  let t = 0, e = 0, i = 0, n = 0;
  for (let s of r.state.facet(wf)) {
    let o = s(r);
    o && (o.left != null && (t = Math.max(t, o.left)), o.right != null && (e = Math.max(e, o.right)), o.top != null && (i = Math.max(i, o.top)), o.bottom != null && (n = Math.max(n, o.bottom)));
  }
  return { left: t, right: e, top: i, bottom: n };
}
const gr = /* @__PURE__ */ Z.define();
class Me {
  constructor(t, e, i, n) {
    this.fromA = t, this.toA = e, this.fromB = i, this.toB = n;
  }
  join(t) {
    return new Me(Math.min(this.fromA, t.fromA), Math.max(this.toA, t.toA), Math.min(this.fromB, t.fromB), Math.max(this.toB, t.toB));
  }
  addToSet(t) {
    let e = t.length, i = this;
    for (; e > 0; e--) {
      let n = t[e - 1];
      if (!(n.fromA > i.toA)) {
        if (n.toA < i.fromA)
          break;
        i = i.join(n), t.splice(e - 1, 1);
      }
    }
    return t.splice(e, 0, i), t;
  }
  static extendWithRanges(t, e) {
    if (e.length == 0)
      return t;
    let i = [];
    for (let n = 0, s = 0, o = 0, a = 0; ; n++) {
      let h = n == t.length ? null : t[n], d = o - a, c = h ? h.fromB : 1e9;
      for (; s < e.length && e[s] < c; ) {
        let p = e[s], m = e[s + 1], b = Math.max(a, p), S = Math.min(c, m);
        if (b <= S && new Me(b + d, S + d, b, S).addToSet(i), m > c)
          break;
        s += 2;
      }
      if (!h)
        return i;
      new Me(h.fromA, h.toA, h.fromB, h.toB).addToSet(i), o = h.toA, a = h.toB;
    }
  }
}
class il {
  constructor(t, e, i) {
    this.view = t, this.state = e, this.transactions = i, this.flags = 0, this.startState = t.state, this.changes = $t.empty(this.startState.doc.length);
    for (let s of i)
      this.changes = this.changes.compose(s.changes);
    let n = [];
    this.changes.iterChangedRanges((s, o, a, h) => n.push(new Me(s, o, a, h))), this.changedRanges = n;
  }
  /**
  @internal
  */
  static create(t, e, i) {
    return new il(t, e, i);
  }
  /**
  Tells you whether the [viewport](https://codemirror.net/6/docs/ref/#view.EditorView.viewport) or
  [visible ranges](https://codemirror.net/6/docs/ref/#view.EditorView.visibleRanges) changed in this
  update.
  */
  get viewportChanged() {
    return (this.flags & 4) > 0;
  }
  /**
  Returns true when
  [`viewportChanged`](https://codemirror.net/6/docs/ref/#view.ViewUpdate.viewportChanged) is true
  and the viewport change is not just the result of mapping it in
  response to document changes.
  */
  get viewportMoved() {
    return (this.flags & 8) > 0;
  }
  /**
  Indicates whether the height of a block element in the editor
  changed in this update.
  */
  get heightChanged() {
    return (this.flags & 2) > 0;
  }
  /**
  Returns true when the document was modified or the size of the
  editor, or elements within the editor, changed.
  */
  get geometryChanged() {
    return this.docChanged || (this.flags & 18) > 0;
  }
  /**
  True when this update indicates a focus change.
  */
  get focusChanged() {
    return (this.flags & 1) > 0;
  }
  /**
  Whether the document changed in this update.
  */
  get docChanged() {
    return !this.changes.empty;
  }
  /**
  Whether the selection was explicitly set in this update.
  */
  get selectionSet() {
    return this.transactions.some((t) => t.selection);
  }
  /**
  @internal
  */
  get empty() {
    return this.flags == 0 && this.transactions.length == 0;
  }
}
class kh extends At {
  get length() {
    return this.view.state.doc.length;
  }
  constructor(t) {
    super(), this.view = t, this.decorations = [], this.dynamicDecorationMap = [!1], this.domChanged = null, this.hasComposition = null, this.markedForComposition = /* @__PURE__ */ new Set(), this.editContextFormatting = Kt.none, this.lastCompositionAfterCursor = !1, this.minWidth = 0, this.minWidthFrom = 0, this.minWidthTo = 0, this.impreciseAnchor = null, this.impreciseHead = null, this.forceSelection = !1, this.lastUpdate = Date.now(), this.setDOM(t.contentDOM), this.children = [new Ht()], this.children[0].setParent(this), this.updateDeco(), this.updateInner([new Me(0, 0, 0, t.state.doc.length)], 0, null);
  }
  // Update the document view to a given state.
  update(t) {
    var e;
    let i = t.changedRanges;
    this.minWidth > 0 && i.length && (i.every(({ fromA: d, toA: c }) => c < this.minWidthFrom || d > this.minWidthTo) ? (this.minWidthFrom = t.changes.mapPos(this.minWidthFrom, 1), this.minWidthTo = t.changes.mapPos(this.minWidthTo, 1)) : this.minWidth = this.minWidthFrom = this.minWidthTo = 0), this.updateEditContextFormatting(t);
    let n = -1;
    this.view.inputState.composing >= 0 && !this.view.observer.editContext && (!((e = this.domChanged) === null || e === void 0) && e.newSel ? n = this.domChanged.newSel.head : !Id(t.changes, this.hasComposition) && !t.selectionSet && (n = t.state.selection.main.head));
    let s = n > -1 ? Td(this.view, t.changes, n) : null;
    if (this.domChanged = null, this.hasComposition) {
      this.markedForComposition.clear();
      let { from: d, to: c } = this.hasComposition;
      i = new Me(d, c, t.changes.mapPos(d, -1), t.changes.mapPos(c, 1)).addToSet(i.slice());
    }
    this.hasComposition = s ? { from: s.range.fromB, to: s.range.toB } : null, (H.ie || H.chrome) && !s && t && t.state.doc.lines != t.startState.doc.lines && (this.forceSelection = !0);
    let o = this.decorations, a = this.updateDeco(), h = Rd(o, a, t.changes);
    return i = Me.extendWithRanges(i, h), !(this.flags & 7) && i.length == 0 ? !1 : (this.updateInner(i, t.startState.doc.length, s), t.transactions.length && (this.lastUpdate = Date.now()), !0);
  }
  // Used by update and the constructor do perform the actual DOM
  // update
  updateInner(t, e, i) {
    this.view.viewState.mustMeasureContent = !0, this.updateChildren(t, e, i);
    let { observer: n } = this.view;
    n.ignore(() => {
      this.dom.style.height = this.view.viewState.contentHeight / this.view.scaleY + "px", this.dom.style.flexBasis = this.minWidth ? this.minWidth + "px" : "";
      let o = H.chrome || H.ios ? { node: n.selectionRange.focusNode, written: !1 } : void 0;
      this.sync(this.view, o), this.flags &= -8, o && (o.written || n.selectionRange.focusNode != o.node) && (this.forceSelection = !0), this.dom.style.height = "";
    }), this.markedForComposition.forEach(
      (o) => o.flags &= -9
      /* ViewFlag.Composition */
    );
    let s = [];
    if (this.view.viewport.from || this.view.viewport.to < this.view.state.doc.length)
      for (let o of this.children)
        o instanceof ii && o.widget instanceof ha && s.push(o.dom);
    n.updateGaps(s);
  }
  updateChildren(t, e, i) {
    let n = i ? i.range.addToSet(t.slice()) : t, s = this.childCursor(e);
    for (let o = n.length - 1; ; o--) {
      let a = o >= 0 ? n[o] : null;
      if (!a)
        break;
      let { fromA: h, toA: d, fromB: c, toB: p } = a, m, b, S, E;
      if (i && i.range.fromB < p && i.range.toB > c) {
        let D = Ar.build(this.view.state.doc, c, i.range.fromB, this.decorations, this.dynamicDecorationMap), N = Ar.build(this.view.state.doc, i.range.toB, p, this.decorations, this.dynamicDecorationMap);
        b = D.breakAtStart, S = D.openStart, E = N.openEnd;
        let W = this.compositionView(i);
        N.breakAtStart ? W.breakAfter = 1 : N.content.length && W.merge(W.length, W.length, N.content[0], !1, N.openStart, 0) && (W.breakAfter = N.content[0].breakAfter, N.content.shift()), D.content.length && W.merge(0, 0, D.content[D.content.length - 1], !0, 0, D.openEnd) && D.content.pop(), m = D.content.concat(W).concat(N.content);
      } else
        ({ content: m, breakAtStart: b, openStart: S, openEnd: E } = Ar.build(this.view.state.doc, c, p, this.decorations, this.dynamicDecorationMap));
      let { i: w, off: M } = s.findPos(d, 1), { i: R, off: I } = s.findPos(h, -1);
      Yu(this, R, I, w, M, m, b, S, E);
    }
    i && this.fixCompositionDOM(i);
  }
  updateEditContextFormatting(t) {
    this.editContextFormatting = this.editContextFormatting.map(t.changes);
    for (let e of t.transactions)
      for (let i of e.effects)
        i.is(mf) && (this.editContextFormatting = i.value);
  }
  compositionView(t) {
    let e = new Le(t.text.nodeValue);
    e.flags |= 8;
    for (let { deco: n } of t.marks)
      e = new ni(n, [e], e.length);
    let i = new Ht();
    return i.append(e, 0), i;
  }
  fixCompositionDOM(t) {
    let e = (s, o) => {
      o.flags |= 8 | (o.children.some(
        (h) => h.flags & 7
        /* ViewFlag.Dirty */
      ) ? 1 : 0), this.markedForComposition.add(o);
      let a = At.get(s);
      a && a != o && (a.dom = null), o.setDOM(s);
    }, i = this.childPos(t.range.fromB, 1), n = this.children[i.i];
    e(t.line, n);
    for (let s = t.marks.length - 1; s >= -1; s--)
      i = n.childPos(i.off, 1), n = n.children[i.i], e(s >= 0 ? t.marks[s].node : t.text, n);
  }
  // Sync the DOM selection to this.state.selection
  updateSelection(t = !1, e = !1) {
    (t || !this.view.observer.selectionRange.focusNode) && this.view.observer.readSelectionRange();
    let i = this.view.root.activeElement, n = i == this.dom, s = !n && !(this.view.state.facet(ti) || this.dom.tabIndex > -1) && qo(this.dom, this.view.observer.selectionRange) && !(i && this.dom.contains(i));
    if (!(n || e || s))
      return;
    let o = this.forceSelection;
    this.forceSelection = !1;
    let a = this.view.state.selection.main, h = this.moveToLine(this.domAtPos(a.anchor)), d = a.empty ? h : this.moveToLine(this.domAtPos(a.head));
    if (H.gecko && a.empty && !this.hasComposition && Od(h)) {
      let p = document.createTextNode("");
      this.view.observer.ignore(() => h.node.insertBefore(p, h.node.childNodes[h.offset] || null)), h = d = new ee(p, 0), o = !0;
    }
    let c = this.view.observer.selectionRange;
    (o || !c.focusNode || (!Sr(h.node, h.offset, c.anchorNode, c.anchorOffset) || !Sr(d.node, d.offset, c.focusNode, c.focusOffset)) && !this.suppressWidgetCursorChange(c, a)) && (this.view.observer.ignore(() => {
      H.android && H.chrome && this.dom.contains(c.focusNode) && Nd(c.focusNode, this.dom) && (this.dom.blur(), this.dom.focus({ preventScroll: !0 }));
      let p = Or(this.view.root);
      if (p) if (a.empty) {
        if (H.gecko) {
          let m = xd(h.node, h.offset);
          if (m && m != 3) {
            let b = (m == 1 ? ju : Ku)(h.node, h.offset);
            b && (h = new ee(b.node, b.offset));
          }
        }
        p.collapse(h.node, h.offset), a.bidiLevel != null && p.caretBidiLevel !== void 0 && (p.caretBidiLevel = a.bidiLevel);
      } else if (p.extend) {
        p.collapse(h.node, h.offset);
        try {
          p.extend(d.node, d.offset);
        } catch {
        }
      } else {
        let m = document.createRange();
        a.anchor > a.head && ([h, d] = [d, h]), m.setEnd(d.node, d.offset), m.setStart(h.node, h.offset), p.removeAllRanges(), p.addRange(m);
      }
      s && this.view.root.activeElement == this.dom && (this.dom.blur(), i && i.focus());
    }), this.view.observer.setSelectionRange(h, d)), this.impreciseAnchor = h.precise ? null : new ee(c.anchorNode, c.anchorOffset), this.impreciseHead = d.precise ? null : new ee(c.focusNode, c.focusOffset);
  }
  // If a zero-length widget is inserted next to the cursor during
  // composition, avoid moving it across it and disrupting the
  // composition.
  suppressWidgetCursorChange(t, e) {
    return this.hasComposition && e.empty && Sr(t.focusNode, t.focusOffset, t.anchorNode, t.anchorOffset) && this.posFromDOM(t.focusNode, t.focusOffset) == e.head;
  }
  enforceCursorAssoc() {
    if (this.hasComposition)
      return;
    let { view: t } = this, e = t.state.selection.main, i = Or(t.root), { anchorNode: n, anchorOffset: s } = t.observer.selectionRange;
    if (!i || !e.empty || !e.assoc || !i.modify)
      return;
    let o = Ht.find(this, e.head);
    if (!o)
      return;
    let a = o.posAtStart;
    if (e.head == a || e.head == a + o.length)
      return;
    let h = this.coordsAt(e.head, -1), d = this.coordsAt(e.head, 1);
    if (!h || !d || h.bottom > d.top)
      return;
    let c = this.domAtPos(e.head + e.assoc);
    i.collapse(c.node, c.offset), i.modify("move", e.assoc < 0 ? "forward" : "backward", "lineboundary"), t.observer.readSelectionRange();
    let p = t.observer.selectionRange;
    t.docView.posFromDOM(p.anchorNode, p.anchorOffset) != e.from && i.collapse(n, s);
  }
  // If a position is in/near a block widget, move it to a nearby text
  // line, since we don't want the cursor inside a block widget.
  moveToLine(t) {
    let e = this.dom, i;
    if (t.node != e)
      return t;
    for (let n = t.offset; !i && n < e.childNodes.length; n++) {
      let s = At.get(e.childNodes[n]);
      s instanceof Ht && (i = s.domAtPos(0));
    }
    for (let n = t.offset - 1; !i && n >= 0; n--) {
      let s = At.get(e.childNodes[n]);
      s instanceof Ht && (i = s.domAtPos(s.length));
    }
    return i ? new ee(i.node, i.offset, !0) : t;
  }
  nearest(t) {
    for (let e = t; e; ) {
      let i = At.get(e);
      if (i && i.rootView == this)
        return i;
      e = e.parentNode;
    }
    return null;
  }
  posFromDOM(t, e) {
    let i = this.nearest(t);
    if (!i)
      throw new RangeError("Trying to find position for a DOM position outside of the document");
    return i.localPosFromDOM(t, e) + i.posAtStart;
  }
  domAtPos(t) {
    let { i: e, off: i } = this.childCursor().findPos(t, -1);
    for (; e < this.children.length - 1; ) {
      let n = this.children[e];
      if (i < n.length || n instanceof Ht)
        break;
      e++, i = 0;
    }
    return this.children[e].domAtPos(i);
  }
  coordsAt(t, e) {
    let i = null, n = 0;
    for (let s = this.length, o = this.children.length - 1; o >= 0; o--) {
      let a = this.children[o], h = s - a.breakAfter, d = h - a.length;
      if (h < t)
        break;
      if (d <= t && (d < t || a.covers(-1)) && (h > t || a.covers(1)) && (!i || a instanceof Ht && !(i instanceof Ht && e >= 0)))
        i = a, n = d;
      else if (i && d == t && h == t && a instanceof ii && Math.abs(e) < 2) {
        if (a.deco.startSide < 0)
          break;
        o && (i = null);
      }
      s = d;
    }
    return i ? i.coordsAt(t - n, e) : null;
  }
  coordsForChar(t) {
    let { i: e, off: i } = this.childPos(t, 1), n = this.children[e];
    if (!(n instanceof Ht))
      return null;
    for (; n.children.length; ) {
      let { i: a, off: h } = n.childPos(i, 1);
      for (; ; a++) {
        if (a == n.children.length)
          return null;
        if ((n = n.children[a]).length)
          break;
      }
      i = h;
    }
    if (!(n instanceof Le))
      return null;
    let s = ke(n.text, i);
    if (s == i)
      return null;
    let o = Vi(n.dom, i, s).getClientRects();
    for (let a = 0; a < o.length; a++) {
      let h = o[a];
      if (a == o.length - 1 || h.top < h.bottom && h.left < h.right)
        return h;
    }
    return null;
  }
  measureVisibleLineHeights(t) {
    let e = [], { from: i, to: n } = t, s = this.view.contentDOM.clientWidth, o = s > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1, a = -1, h = this.view.textDirection == Wt.LTR;
    for (let d = 0, c = 0; c < this.children.length; c++) {
      let p = this.children[c], m = d + p.length;
      if (m > n)
        break;
      if (d >= i) {
        let b = p.dom.getBoundingClientRect();
        if (e.push(b.height), o) {
          let S = p.dom.lastChild, E = S ? Tr(S) : [];
          if (E.length) {
            let w = E[E.length - 1], M = h ? w.right - b.left : b.right - w.left;
            M > a && (a = M, this.minWidth = s, this.minWidthFrom = d, this.minWidthTo = m);
          }
        }
      }
      d = m + p.breakAfter;
    }
    return e;
  }
  textDirectionAt(t) {
    let { i: e } = this.childPos(t, 1);
    return getComputedStyle(this.children[e].dom).direction == "rtl" ? Wt.RTL : Wt.LTR;
  }
  measureTextSize() {
    for (let s of this.children)
      if (s instanceof Ht) {
        let o = s.measureTextSize();
        if (o)
          return o;
      }
    let t = document.createElement("div"), e, i, n;
    return t.className = "cm-line", t.style.width = "99999px", t.style.position = "absolute", t.textContent = "abc def ghi jkl mno pqr stu", this.view.observer.ignore(() => {
      this.dom.appendChild(t);
      let s = Tr(t.firstChild)[0];
      e = t.getBoundingClientRect().height, i = s ? s.width / 27 : 7, n = s ? s.height : e, t.remove();
    }), { lineHeight: e, charWidth: i, textHeight: n };
  }
  childCursor(t = this.length) {
    let e = this.children.length;
    return e && (t -= this.children[--e].length), new qu(this.children, t, e);
  }
  computeBlockGapDeco() {
    let t = [], e = this.view.viewState;
    for (let i = 0, n = 0; ; n++) {
      let s = n == e.viewports.length ? null : e.viewports[n], o = s ? s.from - 1 : this.length;
      if (o > i) {
        let a = (e.lineBlockAt(o).bottom - e.lineBlockAt(i).top) / this.view.scaleY;
        t.push(Kt.replace({
          widget: new ha(a),
          block: !0,
          inclusive: !0,
          isBlockGap: !0
        }).range(i, o));
      }
      if (!s)
        break;
      i = s.to + 1;
    }
    return Kt.set(t);
  }
  updateDeco() {
    let t = 1, e = this.view.state.facet(xr).map((s) => (this.dynamicDecorationMap[t++] = typeof s == "function") ? s(this.view) : s), i = !1, n = this.view.state.facet(bf).map((s, o) => {
      let a = typeof s == "function";
      return a && (i = !0), a ? s(this.view) : s;
    });
    for (n.length && (this.dynamicDecorationMap[t++] = i, e.push(Et.join(n))), this.decorations = [
      this.editContextFormatting,
      ...e,
      this.computeBlockGapDeco(),
      this.view.viewState.lineGapDeco
    ]; t < this.decorations.length; )
      this.dynamicDecorationMap[t++] = !1;
    return this.decorations;
  }
  scrollIntoView(t) {
    if (t.isSnapshot) {
      let d = this.view.viewState.lineBlockAt(t.range.head);
      this.view.scrollDOM.scrollTop = d.top - t.yMargin, this.view.scrollDOM.scrollLeft = t.xMargin;
      return;
    }
    for (let d of this.view.state.facet(pf))
      try {
        if (d(this.view, t.range, t))
          return !0;
      } catch (c) {
        ye(this.view.state, c, "scroll handler");
      }
    let { range: e } = t, i = this.coordsAt(e.head, e.empty ? e.assoc : e.head > e.anchor ? -1 : 1), n;
    if (!i)
      return;
    !e.empty && (n = this.coordsAt(e.anchor, e.anchor > e.head ? -1 : 1)) && (i = {
      left: Math.min(i.left, n.left),
      top: Math.min(i.top, n.top),
      right: Math.max(i.right, n.right),
      bottom: Math.max(i.bottom, n.bottom)
    });
    let s = Ia(this.view), o = {
      left: i.left - s.left,
      top: i.top - s.top,
      right: i.right + s.right,
      bottom: i.bottom + s.bottom
    }, { offsetWidth: a, offsetHeight: h } = this.view.scrollDOM;
    od(this.view.scrollDOM, o, e.head < e.anchor ? -1 : 1, t.x, t.y, Math.max(Math.min(t.xMargin, a), -a), Math.max(Math.min(t.yMargin, h), -h), this.view.textDirection == Wt.LTR);
  }
}
function Od(r) {
  return r.node.nodeType == 1 && r.node.firstChild && (r.offset == 0 || r.node.childNodes[r.offset - 1].contentEditable == "false") && (r.offset == r.node.childNodes.length || r.node.childNodes[r.offset].contentEditable == "false");
}
function Sf(r, t) {
  let e = r.observer.selectionRange;
  if (!e.focusNode)
    return null;
  let i = ju(e.focusNode, e.focusOffset), n = Ku(e.focusNode, e.focusOffset), s = i || n;
  if (n && i && n.node != i.node) {
    let a = At.get(n.node);
    if (!a || a instanceof Le && a.text != n.node.nodeValue)
      s = n;
    else if (r.docView.lastCompositionAfterCursor) {
      let h = At.get(i.node);
      !h || h instanceof Le && h.text != i.node.nodeValue || (s = n);
    }
  }
  if (r.docView.lastCompositionAfterCursor = s != i, !s)
    return null;
  let o = t - s.offset;
  return { from: o, to: o + s.node.nodeValue.length, node: s.node };
}
function Td(r, t, e) {
  let i = Sf(r, e);
  if (!i)
    return null;
  let { node: n, from: s, to: o } = i, a = n.nodeValue;
  if (/[\n\r]/.test(a) || r.state.doc.sliceString(i.from, i.to) != a)
    return null;
  let h = t.invertedDesc, d = new Me(h.mapPos(s), h.mapPos(o), s, o), c = [];
  for (let p = n.parentNode; ; p = p.parentNode) {
    let m = At.get(p);
    if (m instanceof ni)
      c.push({ node: p, deco: m.mark });
    else {
      if (m instanceof Ht || p.nodeName == "DIV" && p.parentNode == r.contentDOM)
        return { range: d, text: n, marks: c, line: p };
      if (p != r.contentDOM)
        c.push({ node: p, deco: new Nr({
          inclusive: !0,
          attributes: gd(p),
          tagName: p.tagName.toLowerCase()
        }) });
      else
        return null;
    }
  }
}
function xd(r, t) {
  return r.nodeType != 1 ? 0 : (t && r.childNodes[t - 1].contentEditable == "false" ? 1 : 0) | (t < r.childNodes.length && r.childNodes[t].contentEditable == "false" ? 2 : 0);
}
let Dd = class {
  constructor() {
    this.changes = [];
  }
  compareRange(t, e) {
    Yo(t, e, this.changes);
  }
  comparePoint(t, e) {
    Yo(t, e, this.changes);
  }
  boundChange(t) {
    Yo(t, t, this.changes);
  }
};
function Rd(r, t, e) {
  let i = new Dd();
  return Et.compare(r, t, e, i), i.changes;
}
function Nd(r, t) {
  for (let e = r; e && e != t; e = e.assignedSlot || e.parentNode)
    if (e.nodeType == 1 && e.contentEditable == "false")
      return !0;
  return !1;
}
function Id(r, t) {
  let e = !1;
  return t && r.iterChangedRanges((i, n) => {
    i < t.to && n > t.from && (e = !0);
  }), e;
}
function Pd(r, t, e = 1) {
  let i = r.charCategorizer(t), n = r.doc.lineAt(t), s = t - n.from;
  if (n.length == 0)
    return U.cursor(t);
  s == 0 ? e = 1 : s == n.length && (e = -1);
  let o = s, a = s;
  e < 0 ? o = ke(n.text, s, !1) : a = ke(n.text, s);
  let h = i(n.text.slice(o, a));
  for (; o > 0; ) {
    let d = ke(n.text, o, !1);
    if (i(n.text.slice(d, o)) != h)
      break;
    o = d;
  }
  for (; a < n.length; ) {
    let d = ke(n.text, a);
    if (i(n.text.slice(a, d)) != h)
      break;
    a = d;
  }
  return U.range(o + n.from, a + n.from);
}
function Ld(r, t) {
  return t.left > r ? t.left - r : Math.max(0, r - t.right);
}
function Fd(r, t) {
  return t.top > r ? t.top - r : Math.max(0, r - t.bottom);
}
function Dl(r, t) {
  return r.top < t.bottom - 1 && r.bottom > t.top + 1;
}
function Ch(r, t) {
  return t < r.top ? { top: t, left: r.left, right: r.right, bottom: r.bottom } : r;
}
function Eh(r, t) {
  return t > r.bottom ? { top: r.top, left: r.left, right: r.right, bottom: t } : r;
}
function ga(r, t, e) {
  let i, n, s, o, a = !1, h, d, c, p;
  for (let S = r.firstChild; S; S = S.nextSibling) {
    let E = Tr(S);
    for (let w = 0; w < E.length; w++) {
      let M = E[w];
      n && Dl(n, M) && (M = Ch(Eh(M, n.bottom), n.top));
      let R = Ld(t, M), I = Fd(e, M);
      if (R == 0 && I == 0)
        return S.nodeType == 3 ? Mh(S, t, e) : ga(S, t, e);
      if (!i || o > I || o == I && s > R) {
        i = S, n = M, s = R, o = I;
        let D = I ? e < M.top ? -1 : 1 : R ? t < M.left ? -1 : 1 : 0;
        a = !D || (D > 0 ? w < E.length - 1 : w > 0);
      }
      R == 0 ? e > M.bottom && (!c || c.bottom < M.bottom) ? (h = S, c = M) : e < M.top && (!p || p.top > M.top) && (d = S, p = M) : c && Dl(c, M) ? c = Eh(c, M.bottom) : p && Dl(p, M) && (p = Ch(p, M.top));
    }
  }
  if (c && c.bottom >= e ? (i = h, n = c) : p && p.top <= e && (i = d, n = p), !i)
    return { node: r, offset: 0 };
  let m = Math.max(n.left, Math.min(n.right, t));
  if (i.nodeType == 3)
    return Mh(i, m, e);
  if (a && i.contentEditable != "false")
    return ga(i, m, e);
  let b = Array.prototype.indexOf.call(r.childNodes, i) + (t >= (n.left + n.right) / 2 ? 1 : 0);
  return { node: r, offset: b };
}
function Mh(r, t, e) {
  let i = r.nodeValue.length, n = -1, s = 1e9, o = 0;
  for (let a = 0; a < i; a++) {
    let h = Vi(r, a, a + 1).getClientRects();
    for (let d = 0; d < h.length; d++) {
      let c = h[d];
      if (c.top == c.bottom)
        continue;
      o || (o = t - c.left);
      let p = (c.top > e ? c.top - e : e - c.bottom) - 1;
      if (c.left - 1 <= t && c.right + 1 >= t && p < s) {
        let m = t >= (c.left + c.right) / 2, b = m;
        if ((H.chrome || H.gecko) && Vi(r, a).getBoundingClientRect().left == c.right && (b = !m), p <= 0)
          return { node: r, offset: a + (b ? 1 : 0) };
        n = a + (b ? 1 : 0), s = p;
      }
    }
  }
  return { node: r, offset: n > -1 ? n : o > 0 ? r.nodeValue.length : 0 };
}
function Af(r, t, e, i = -1) {
  var n, s;
  let o = r.contentDOM.getBoundingClientRect(), a = o.top + r.viewState.paddingTop, h, { docHeight: d } = r.viewState, { x: c, y: p } = t, m = p - a;
  if (m < 0)
    return 0;
  if (m > d)
    return r.state.doc.length;
  for (let D = r.viewState.heightOracle.textHeight / 2, N = !1; h = r.elementAtHeight(m), h.type != Ye.Text; )
    for (; m = i > 0 ? h.bottom + D : h.top - D, !(m >= 0 && m <= d); ) {
      if (N)
        return e ? null : 0;
      N = !0, i = -i;
    }
  p = a + m;
  let b = h.from;
  if (b < r.viewport.from)
    return r.viewport.from == 0 ? 0 : e ? null : Oh(r, o, h, c, p);
  if (b > r.viewport.to)
    return r.viewport.to == r.state.doc.length ? r.state.doc.length : e ? null : Oh(r, o, h, c, p);
  let S = r.dom.ownerDocument, E = r.root.elementFromPoint ? r.root : S, w = E.elementFromPoint(c, p);
  w && !r.contentDOM.contains(w) && (w = null), w || (c = Math.max(o.left + 1, Math.min(o.right - 1, c)), w = E.elementFromPoint(c, p), w && !r.contentDOM.contains(w) && (w = null));
  let M, R = -1;
  if (w && ((n = r.docView.nearest(w)) === null || n === void 0 ? void 0 : n.isEditable) != !1) {
    if (S.caretPositionFromPoint) {
      let D = S.caretPositionFromPoint(c, p);
      D && ({ offsetNode: M, offset: R } = D);
    } else if (S.caretRangeFromPoint) {
      let D = S.caretRangeFromPoint(c, p);
      D && ({ startContainer: M, startOffset: R } = D, (!r.contentDOM.contains(M) || H.safari && Bd(M, R, c) || H.chrome && Vd(M, R, c)) && (M = void 0));
    }
    M && (R = Math.min(Ge(M), R));
  }
  if (!M || !r.docView.dom.contains(M)) {
    let D = Ht.find(r.docView, b);
    if (!D)
      return m > h.top + h.height / 2 ? h.to : h.from;
    ({ node: M, offset: R } = ga(D.dom, c, p));
  }
  let I = r.docView.nearest(M);
  if (!I)
    return null;
  if (I.isWidget && ((s = I.dom) === null || s === void 0 ? void 0 : s.nodeType) == 1) {
    let D = I.dom.getBoundingClientRect();
    return t.y < D.top || t.y <= D.bottom && t.x <= (D.left + D.right) / 2 ? I.posAtStart : I.posAtEnd;
  } else
    return I.localPosFromDOM(M, R) + I.posAtStart;
}
function Oh(r, t, e, i, n) {
  let s = Math.round((i - t.left) * r.defaultCharacterWidth);
  if (r.lineWrapping && e.height > r.defaultLineHeight * 1.5) {
    let a = r.viewState.heightOracle.textHeight, h = Math.floor((n - e.top - (r.defaultLineHeight - a) * 0.5) / a);
    s += h * r.viewState.heightOracle.lineLength;
  }
  let o = r.state.sliceDoc(e.from, e.to);
  return e.from + td(o, s, r.state.tabSize);
}
function Bd(r, t, e) {
  let i;
  if (r.nodeType != 3 || t != (i = r.nodeValue.length))
    return !1;
  for (let n = r.nextSibling; n; n = n.nextSibling)
    if (n.nodeType != 1 || n.nodeName != "BR")
      return !1;
  return Vi(r, i - 1, i).getBoundingClientRect().left > e;
}
function Vd(r, t, e) {
  if (t != 0)
    return !1;
  for (let n = r; ; ) {
    let s = n.parentNode;
    if (!s || s.nodeType != 1 || s.firstChild != n)
      return !1;
    if (s.classList.contains("cm-line"))
      break;
    n = s;
  }
  let i = r.nodeType == 1 ? r.getBoundingClientRect() : Vi(r, 0, Math.max(r.nodeValue.length, 1)).getBoundingClientRect();
  return e - i.left > 5;
}
function Hd(r, t) {
  let e = r.lineBlockAt(t);
  if (Array.isArray(e.type)) {
    for (let i of e.type)
      if (i.to > t || i.to == t && (i.to == e.to || i.type == Ye.Text))
        return i;
  }
  return e;
}
function Wd(r, t, e, i) {
  let n = Hd(r, t.head), s = !i || n.type != Ye.Text || !(r.lineWrapping || n.widgetLineBreaks) ? null : r.coordsAtPos(t.assoc < 0 && t.head > n.from ? t.head - 1 : t.head);
  if (s) {
    let o = r.dom.getBoundingClientRect(), a = r.textDirectionAt(n.from), h = r.posAtCoords({
      x: e == (a == Wt.LTR) ? o.right - 1 : o.left + 1,
      y: (s.top + s.bottom) / 2
    });
    if (h != null)
      return U.cursor(h, e ? -1 : 1);
  }
  return U.cursor(e ? n.to : n.from, e ? -1 : 1);
}
function Th(r, t, e, i) {
  let n = r.state.doc.lineAt(t.head), s = r.bidiSpans(n), o = r.textDirectionAt(n.from);
  for (let a = t, h = null; ; ) {
    let d = kd(n, s, o, a, e), c = lf;
    if (!d) {
      if (n.number == (e ? r.state.doc.lines : 1))
        return a;
      c = `
`, n = r.state.doc.line(n.number + (e ? 1 : -1)), s = r.bidiSpans(n), d = r.visualLineSide(n, !e);
    }
    if (h) {
      if (!h(c))
        return a;
    } else {
      if (!i)
        return d;
      h = i(c);
    }
    a = d;
  }
}
function Ud(r, t, e) {
  let i = r.state.charCategorizer(t), n = i(e);
  return (s) => {
    let o = i(s);
    return n == Ce.Space && (n = o), n == o;
  };
}
function zd(r, t, e, i) {
  let n = t.head, s = e ? 1 : -1;
  if (n == (e ? r.state.doc.length : 0))
    return U.cursor(n, t.assoc);
  let o = t.goalColumn, a, h = r.contentDOM.getBoundingClientRect(), d = r.coordsAtPos(n, t.assoc || -1), c = r.documentTop;
  if (d)
    o == null && (o = d.left - h.left), a = s < 0 ? d.top : d.bottom;
  else {
    let b = r.viewState.lineBlockAt(n);
    o == null && (o = Math.min(h.right - h.left, r.defaultCharacterWidth * (n - b.from))), a = (s < 0 ? b.top : b.bottom) + c;
  }
  let p = h.left + o, m = i ?? r.viewState.heightOracle.textHeight >> 1;
  for (let b = 0; ; b += 10) {
    let S = a + (m + b) * s, E = Af(r, { x: p, y: S }, !1, s);
    if (S < h.top || S > h.bottom || (s < 0 ? E < n : E > n)) {
      let w = r.docView.coordsForChar(E), M = !w || S < w.top ? -1 : 1;
      return U.cursor(E, M, void 0, o);
    }
  }
}
function Go(r, t, e) {
  for (; ; ) {
    let i = 0;
    for (let n of r)
      n.between(t - 1, t + 1, (s, o, a) => {
        if (t > s && t < o) {
          let h = i || e || (t - s < o - t ? -1 : 1);
          t = h < 0 ? s : o, i = h;
        }
      });
    if (!i)
      return t;
  }
}
function Rl(r, t, e) {
  let i = Go(r.state.facet(Na).map((n) => n(r)), e.from, t.head > e.from ? -1 : 1);
  return i == e.from ? e : U.cursor(i, i < e.from ? 1 : -1);
}
const pr = "￿";
class _d {
  constructor(t, e) {
    this.points = t, this.text = "", this.lineSeparator = e.facet(bt.lineSeparator);
  }
  append(t) {
    this.text += t;
  }
  lineBreak() {
    this.text += pr;
  }
  readRange(t, e) {
    if (!t)
      return this;
    let i = t.parentNode;
    for (let n = t; ; ) {
      this.findPointBefore(i, n);
      let s = this.text.length;
      this.readNode(n);
      let o = n.nextSibling;
      if (o == e)
        break;
      let a = At.get(n), h = At.get(o);
      (a && h ? a.breakAfter : (a ? a.breakAfter : tl(n)) || tl(o) && (n.nodeName != "BR" || n.cmIgnore) && this.text.length > s) && this.lineBreak(), n = o;
    }
    return this.findPointBefore(i, e), this;
  }
  readTextNode(t) {
    let e = t.nodeValue;
    for (let i of this.points)
      i.node == t && (i.pos = this.text.length + Math.min(i.offset, e.length));
    for (let i = 0, n = this.lineSeparator ? null : /\r\n?|\n/g; ; ) {
      let s = -1, o = 1, a;
      if (this.lineSeparator ? (s = e.indexOf(this.lineSeparator, i), o = this.lineSeparator.length) : (a = n.exec(e)) && (s = a.index, o = a[0].length), this.append(e.slice(i, s < 0 ? e.length : s)), s < 0)
        break;
      if (this.lineBreak(), o > 1)
        for (let h of this.points)
          h.node == t && h.pos > this.text.length && (h.pos -= o - 1);
      i = s + o;
    }
  }
  readNode(t) {
    if (t.cmIgnore)
      return;
    let e = At.get(t), i = e && e.overrideDOMText;
    if (i != null) {
      this.findPointInside(t, i.length);
      for (let n = i.iter(); !n.next().done; )
        n.lineBreak ? this.lineBreak() : this.append(n.value);
    } else t.nodeType == 3 ? this.readTextNode(t) : t.nodeName == "BR" ? t.nextSibling && this.lineBreak() : t.nodeType == 1 && this.readRange(t.firstChild, null);
  }
  findPointBefore(t, e) {
    for (let i of this.points)
      i.node == t && t.childNodes[i.offset] == e && (i.pos = this.text.length);
  }
  findPointInside(t, e) {
    for (let i of this.points)
      (t.nodeType == 3 ? i.node == t : t.contains(i.node)) && (i.pos = this.text.length + ($d(t, i.node, i.offset) ? e : 0));
  }
}
function $d(r, t, e) {
  for (; ; ) {
    if (!t || e < Ge(t))
      return !1;
    if (t == r)
      return !0;
    e = Bi(t) + 1, t = t.parentNode;
  }
}
class xh {
  constructor(t, e) {
    this.node = t, this.offset = e, this.pos = -1;
  }
}
class jd {
  constructor(t, e, i, n) {
    this.typeOver = n, this.bounds = null, this.text = "", this.domChanged = e > -1;
    let { impreciseHead: s, impreciseAnchor: o } = t.docView;
    if (t.state.readOnly && e > -1)
      this.newSel = null;
    else if (e > -1 && (this.bounds = t.docView.domBoundsAround(e, i, 0))) {
      let a = s || o ? [] : Yd(t), h = new _d(a, t.state);
      h.readRange(this.bounds.startDOM, this.bounds.endDOM), this.text = h.text, this.newSel = Gd(a, this.bounds.from);
    } else {
      let a = t.observer.selectionRange, h = s && s.node == a.focusNode && s.offset == a.focusOffset || !na(t.contentDOM, a.focusNode) ? t.state.selection.main.head : t.docView.posFromDOM(a.focusNode, a.focusOffset), d = o && o.node == a.anchorNode && o.offset == a.anchorOffset || !na(t.contentDOM, a.anchorNode) ? t.state.selection.main.anchor : t.docView.posFromDOM(a.anchorNode, a.anchorOffset), c = t.viewport;
      if ((H.ios || H.chrome) && t.state.selection.main.empty && h != d && (c.from > 0 || c.to < t.state.doc.length)) {
        let p = Math.min(h, d), m = Math.max(h, d), b = c.from - p, S = c.to - m;
        (b == 0 || b == 1 || p == 0) && (S == 0 || S == -1 || m == t.state.doc.length) && (h = 0, d = t.state.doc.length);
      }
      this.newSel = U.single(d, h);
    }
  }
}
function kf(r, t) {
  let e, { newSel: i } = t, n = r.state.selection.main, s = r.inputState.lastKeyTime > Date.now() - 100 ? r.inputState.lastKeyCode : -1;
  if (t.bounds) {
    let { from: o, to: a } = t.bounds, h = n.from, d = null;
    (s === 8 || H.android && t.text.length < a - o) && (h = n.to, d = "end");
    let c = qd(r.state.doc.sliceString(o, a, pr), t.text, h - o, d);
    c && (H.chrome && s == 13 && c.toB == c.from + 2 && t.text.slice(c.from, c.toB) == pr + pr && c.toB--, e = {
      from: o + c.from,
      to: o + c.toA,
      insert: pt.of(t.text.slice(c.from, c.toB).split(pr))
    });
  } else i && (!r.hasFocus && r.state.facet(ti) || i.main.eq(n)) && (i = null);
  if (!e && !i)
    return !1;
  if (!e && t.typeOver && !n.empty && i && i.main.empty ? e = { from: n.from, to: n.to, insert: r.state.doc.slice(n.from, n.to) } : e && e.from >= n.from && e.to <= n.to && (e.from != n.from || e.to != n.to) && n.to - n.from - (e.to - e.from) <= 4 ? e = {
    from: n.from,
    to: n.to,
    insert: r.state.doc.slice(n.from, e.from).append(e.insert).append(r.state.doc.slice(e.to, n.to))
  } : (H.mac || H.android) && e && e.from == e.to && e.from == n.head - 1 && /^\. ?$/.test(e.insert.toString()) && r.contentDOM.getAttribute("autocorrect") == "off" ? (i && e.insert.length == 2 && (i = U.single(i.main.anchor - 1, i.main.head - 1)), e = { from: n.from, to: n.to, insert: pt.of([" "]) }) : H.chrome && e && e.from == e.to && e.from == n.head && e.insert.toString() == `
 ` && r.lineWrapping && (i && (i = U.single(i.main.anchor - 1, i.main.head - 1)), e = { from: n.from, to: n.to, insert: pt.of([" "]) }), e)
    return Pa(r, e, i, s);
  if (i && !i.main.eq(n)) {
    let o = !1, a = "select";
    return r.inputState.lastSelectionTime > Date.now() - 50 && (r.inputState.lastSelectionOrigin == "select" && (o = !0), a = r.inputState.lastSelectionOrigin), r.dispatch({ selection: i, scrollIntoView: o, userEvent: a }), !0;
  } else
    return !1;
}
function Pa(r, t, e, i = -1) {
  if (H.ios && r.inputState.flushIOSKey(t))
    return !0;
  let n = r.state.selection.main;
  if (H.android && (t.to == n.to && // GBoard will sometimes remove a space it just inserted
  // after a completion when you press enter
  (t.from == n.from || t.from == n.from - 1 && r.state.sliceDoc(t.from, n.from) == " ") && t.insert.length == 1 && t.insert.lines == 2 && Rn(r.contentDOM, "Enter", 13) || (t.from == n.from - 1 && t.to == n.to && t.insert.length == 0 || i == 8 && t.insert.length < t.to - t.from && t.to > n.head) && Rn(r.contentDOM, "Backspace", 8) || t.from == n.from && t.to == n.to + 1 && t.insert.length == 0 && Rn(r.contentDOM, "Delete", 46)))
    return !0;
  let s = t.insert.toString();
  r.inputState.composing >= 0 && r.inputState.composing++;
  let o, a = () => o || (o = Kd(r, t, e));
  return r.state.facet(cf).some((h) => h(r, t.from, t.to, s, a)) || r.dispatch(a()), !0;
}
function Kd(r, t, e) {
  let i, n = r.state, s = n.selection.main;
  if (t.from >= s.from && t.to <= s.to && t.to - t.from >= (s.to - s.from) / 3 && (!e || e.main.empty && e.main.from == t.from + t.insert.length) && r.inputState.composing < 0) {
    let a = s.from < t.from ? n.sliceDoc(s.from, t.from) : "", h = s.to > t.to ? n.sliceDoc(t.to, s.to) : "";
    i = n.replaceSelection(r.state.toText(a + t.insert.sliceString(0, void 0, r.state.lineBreak) + h));
  } else {
    let a = n.changes(t), h = e && e.main.to <= a.newLength ? e.main : void 0;
    if (n.selection.ranges.length > 1 && r.inputState.composing >= 0 && t.to <= s.to && t.to >= s.to - 10) {
      let d = r.state.sliceDoc(t.from, t.to), c, p = e && Sf(r, e.main.head);
      if (p) {
        let S = t.insert.length - (t.to - t.from);
        c = { from: p.from, to: p.to - S };
      } else
        c = r.state.doc.lineAt(s.head);
      let m = s.to - t.to, b = s.to - s.from;
      i = n.changeByRange((S) => {
        if (S.from == s.from && S.to == s.to)
          return { changes: a, range: h || S.map(a) };
        let E = S.to - m, w = E - d.length;
        if (S.to - S.from != b || r.state.sliceDoc(w, E) != d || // Unfortunately, there's no way to make multiple
        // changes in the same node work without aborting
        // composition, so cursors in the composition range are
        // ignored.
        S.to >= c.from && S.from <= c.to)
          return { range: S };
        let M = n.changes({ from: w, to: E, insert: t.insert }), R = S.to - s.to;
        return {
          changes: M,
          range: h ? U.range(Math.max(0, h.anchor + R), Math.max(0, h.head + R)) : S.map(M)
        };
      });
    } else
      i = {
        changes: a,
        selection: h && n.selection.replaceRange(h)
      };
  }
  let o = "input.type";
  return (r.composing || r.inputState.compositionPendingChange && r.inputState.compositionEndedAt > Date.now() - 50) && (r.inputState.compositionPendingChange = !1, o += ".compose", r.inputState.compositionFirstChange && (o += ".start", r.inputState.compositionFirstChange = !1)), n.update(i, { userEvent: o, scrollIntoView: !0 });
}
function qd(r, t, e, i) {
  let n = Math.min(r.length, t.length), s = 0;
  for (; s < n && r.charCodeAt(s) == t.charCodeAt(s); )
    s++;
  if (s == n && r.length == t.length)
    return null;
  let o = r.length, a = t.length;
  for (; o > 0 && a > 0 && r.charCodeAt(o - 1) == t.charCodeAt(a - 1); )
    o--, a--;
  if (i == "end") {
    let h = Math.max(0, s - Math.min(o, a));
    e -= o + h - s;
  }
  if (o < s && r.length < t.length) {
    let h = e <= s && e >= o ? s - e : 0;
    s -= h, a = s + (a - o), o = s;
  } else if (a < s) {
    let h = e <= s && e >= a ? s - e : 0;
    s -= h, o = s + (o - a), a = s;
  }
  return { from: s, toA: o, toB: a };
}
function Yd(r) {
  let t = [];
  if (r.root.activeElement != r.contentDOM)
    return t;
  let { anchorNode: e, anchorOffset: i, focusNode: n, focusOffset: s } = r.observer.selectionRange;
  return e && (t.push(new xh(e, i)), (n != e || s != i) && t.push(new xh(n, s))), t;
}
function Gd(r, t) {
  if (r.length == 0)
    return null;
  let e = r[0].pos, i = r.length == 2 ? r[1].pos : e;
  return e > -1 && i > -1 ? U.single(e + t, i + t) : null;
}
class Jd {
  setSelectionOrigin(t) {
    this.lastSelectionOrigin = t, this.lastSelectionTime = Date.now();
  }
  constructor(t) {
    this.view = t, this.lastKeyCode = 0, this.lastKeyTime = 0, this.lastTouchTime = 0, this.lastFocusTime = 0, this.lastScrollTop = 0, this.lastScrollLeft = 0, this.pendingIOSKey = void 0, this.tabFocusMode = -1, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastContextMenu = 0, this.scrollHandlers = [], this.handlers = /* @__PURE__ */ Object.create(null), this.composing = -1, this.compositionFirstChange = null, this.compositionEndedAt = 0, this.compositionPendingKey = !1, this.compositionPendingChange = !1, this.mouseSelection = null, this.draggedContent = null, this.handleEvent = this.handleEvent.bind(this), this.notifiedFocused = t.hasFocus, H.safari && t.contentDOM.addEventListener("input", () => null), H.gecko && cg(t.contentDOM.ownerDocument);
  }
  handleEvent(t) {
    !rg(this.view, t) || this.ignoreDuringComposition(t) || t.type == "keydown" && this.keydown(t) || this.runHandlers(t.type, t);
  }
  runHandlers(t, e) {
    let i = this.handlers[t];
    if (i) {
      for (let n of i.observers)
        n(this.view, e);
      for (let n of i.handlers) {
        if (e.defaultPrevented)
          break;
        if (n(this.view, e)) {
          e.preventDefault();
          break;
        }
      }
    }
  }
  ensureHandlers(t) {
    let e = Xd(t), i = this.handlers, n = this.view.contentDOM;
    for (let s in e)
      if (s != "scroll") {
        let o = !e[s].handlers.length, a = i[s];
        a && o != !a.handlers.length && (n.removeEventListener(s, this.handleEvent), a = null), a || n.addEventListener(s, this.handleEvent, { passive: o });
      }
    for (let s in i)
      s != "scroll" && !e[s] && n.removeEventListener(s, this.handleEvent);
    this.handlers = e;
  }
  keydown(t) {
    if (this.lastKeyCode = t.keyCode, this.lastKeyTime = Date.now(), t.keyCode == 9 && this.tabFocusMode > -1 && (!this.tabFocusMode || Date.now() <= this.tabFocusMode))
      return !0;
    if (this.tabFocusMode > 0 && t.keyCode != 27 && Ef.indexOf(t.keyCode) < 0 && (this.tabFocusMode = -1), H.android && H.chrome && !t.synthetic && (t.keyCode == 13 || t.keyCode == 8))
      return this.view.observer.delayAndroidKey(t.key, t.keyCode), !0;
    let e;
    return H.ios && !t.synthetic && !t.altKey && !t.metaKey && ((e = Cf.find((i) => i.keyCode == t.keyCode)) && !t.ctrlKey || Qd.indexOf(t.key) > -1 && t.ctrlKey && !t.shiftKey) ? (this.pendingIOSKey = e || t, setTimeout(() => this.flushIOSKey(), 250), !0) : (t.keyCode != 229 && this.view.observer.forceFlush(), !1);
  }
  flushIOSKey(t) {
    let e = this.pendingIOSKey;
    return !e || e.key == "Enter" && t && t.from < t.to && /^\S+$/.test(t.insert.toString()) ? !1 : (this.pendingIOSKey = void 0, Rn(this.view.contentDOM, e.key, e.keyCode, e instanceof KeyboardEvent ? e : void 0));
  }
  ignoreDuringComposition(t) {
    return /^key/.test(t.type) ? this.composing > 0 ? !0 : H.safari && !H.ios && this.compositionPendingKey && Date.now() - this.compositionEndedAt < 100 ? (this.compositionPendingKey = !1, !0) : !1 : !1;
  }
  startMouseSelection(t) {
    this.mouseSelection && this.mouseSelection.destroy(), this.mouseSelection = t;
  }
  update(t) {
    this.view.observer.update(t), this.mouseSelection && this.mouseSelection.update(t), this.draggedContent && t.docChanged && (this.draggedContent = this.draggedContent.map(t.changes)), t.transactions.length && (this.lastKeyCode = this.lastSelectionTime = 0);
  }
  destroy() {
    this.mouseSelection && this.mouseSelection.destroy();
  }
}
function Dh(r, t) {
  return (e, i) => {
    try {
      return t.call(r, i, e);
    } catch (n) {
      ye(e.state, n);
    }
  };
}
function Xd(r) {
  let t = /* @__PURE__ */ Object.create(null);
  function e(i) {
    return t[i] || (t[i] = { observers: [], handlers: [] });
  }
  for (let i of r) {
    let n = i.spec;
    if (n && n.domEventHandlers)
      for (let s in n.domEventHandlers) {
        let o = n.domEventHandlers[s];
        o && e(s).handlers.push(Dh(i.value, o));
      }
    if (n && n.domEventObservers)
      for (let s in n.domEventObservers) {
        let o = n.domEventObservers[s];
        o && e(s).observers.push(Dh(i.value, o));
      }
  }
  for (let i in Fe)
    e(i).handlers.push(Fe[i]);
  for (let i in Te)
    e(i).observers.push(Te[i]);
  return t;
}
const Cf = [
  { key: "Backspace", keyCode: 8, inputType: "deleteContentBackward" },
  { key: "Enter", keyCode: 13, inputType: "insertParagraph" },
  { key: "Enter", keyCode: 13, inputType: "insertLineBreak" },
  { key: "Delete", keyCode: 46, inputType: "deleteContentForward" }
], Qd = "dthko", Ef = [16, 17, 18, 20, 91, 92, 224, 225], No = 6;
function Io(r) {
  return Math.max(0, r) * 0.7 + 8;
}
function Zd(r, t) {
  return Math.max(Math.abs(r.clientX - t.clientX), Math.abs(r.clientY - t.clientY));
}
class tg {
  constructor(t, e, i, n) {
    this.view = t, this.startEvent = e, this.style = i, this.mustSelect = n, this.scrollSpeed = { x: 0, y: 0 }, this.scrolling = -1, this.lastEvent = e, this.scrollParents = ld(t.contentDOM), this.atoms = t.state.facet(Na).map((o) => o(t));
    let s = t.contentDOM.ownerDocument;
    s.addEventListener("mousemove", this.move = this.move.bind(this)), s.addEventListener("mouseup", this.up = this.up.bind(this)), this.extend = e.shiftKey, this.multiple = t.state.facet(bt.allowMultipleSelections) && eg(t, e), this.dragging = ng(t, e) && Tf(e) == 1 ? null : !1;
  }
  start(t) {
    this.dragging === !1 && this.select(t);
  }
  move(t) {
    if (t.buttons == 0)
      return this.destroy();
    if (this.dragging || this.dragging == null && Zd(this.startEvent, t) < 10)
      return;
    this.select(this.lastEvent = t);
    let e = 0, i = 0, n = 0, s = 0, o = this.view.win.innerWidth, a = this.view.win.innerHeight;
    this.scrollParents.x && ({ left: n, right: o } = this.scrollParents.x.getBoundingClientRect()), this.scrollParents.y && ({ top: s, bottom: a } = this.scrollParents.y.getBoundingClientRect());
    let h = Ia(this.view);
    t.clientX - h.left <= n + No ? e = -Io(n - t.clientX) : t.clientX + h.right >= o - No && (e = Io(t.clientX - o)), t.clientY - h.top <= s + No ? i = -Io(s - t.clientY) : t.clientY + h.bottom >= a - No && (i = Io(t.clientY - a)), this.setScrollSpeed(e, i);
  }
  up(t) {
    this.dragging == null && this.select(this.lastEvent), this.dragging || t.preventDefault(), this.destroy();
  }
  destroy() {
    this.setScrollSpeed(0, 0);
    let t = this.view.contentDOM.ownerDocument;
    t.removeEventListener("mousemove", this.move), t.removeEventListener("mouseup", this.up), this.view.inputState.mouseSelection = this.view.inputState.draggedContent = null;
  }
  setScrollSpeed(t, e) {
    this.scrollSpeed = { x: t, y: e }, t || e ? this.scrolling < 0 && (this.scrolling = setInterval(() => this.scroll(), 50)) : this.scrolling > -1 && (clearInterval(this.scrolling), this.scrolling = -1);
  }
  scroll() {
    let { x: t, y: e } = this.scrollSpeed;
    t && this.scrollParents.x && (this.scrollParents.x.scrollLeft += t, t = 0), e && this.scrollParents.y && (this.scrollParents.y.scrollTop += e, e = 0), (t || e) && this.view.win.scrollBy(t, e), this.dragging === !1 && this.select(this.lastEvent);
  }
  skipAtoms(t) {
    let e = null;
    for (let i = 0; i < t.ranges.length; i++) {
      let n = t.ranges[i], s = null;
      if (n.empty) {
        let o = Go(this.atoms, n.from, 0);
        o != n.from && (s = U.cursor(o, -1));
      } else {
        let o = Go(this.atoms, n.from, -1), a = Go(this.atoms, n.to, 1);
        (o != n.from || a != n.to) && (s = U.range(n.from == n.anchor ? o : a, n.from == n.head ? o : a));
      }
      s && (e || (e = t.ranges.slice()), e[i] = s);
    }
    return e ? U.create(e, t.mainIndex) : t;
  }
  select(t) {
    let { view: e } = this, i = this.skipAtoms(this.style.get(t, this.extend, this.multiple));
    (this.mustSelect || !i.eq(e.state.selection, this.dragging === !1)) && this.view.dispatch({
      selection: i,
      userEvent: "select.pointer"
    }), this.mustSelect = !1;
  }
  update(t) {
    t.transactions.some((e) => e.isUserEvent("input.type")) ? this.destroy() : this.style.update(t) && setTimeout(() => this.select(this.lastEvent), 20);
  }
}
function eg(r, t) {
  let e = r.state.facet(af);
  return e.length ? e[0](t) : H.mac ? t.metaKey : t.ctrlKey;
}
function ig(r, t) {
  let e = r.state.facet(hf);
  return e.length ? e[0](t) : H.mac ? !t.altKey : !t.ctrlKey;
}
function ng(r, t) {
  let { main: e } = r.state.selection;
  if (e.empty)
    return !1;
  let i = Or(r.root);
  if (!i || i.rangeCount == 0)
    return !0;
  let n = i.getRangeAt(0).getClientRects();
  for (let s = 0; s < n.length; s++) {
    let o = n[s];
    if (o.left <= t.clientX && o.right >= t.clientX && o.top <= t.clientY && o.bottom >= t.clientY)
      return !0;
  }
  return !1;
}
function rg(r, t) {
  if (!t.bubbles)
    return !0;
  if (t.defaultPrevented)
    return !1;
  for (let e = t.target, i; e != r.contentDOM; e = e.parentNode)
    if (!e || e.nodeType == 11 || (i = At.get(e)) && i.ignoreEvent(t))
      return !1;
  return !0;
}
const Fe = /* @__PURE__ */ Object.create(null), Te = /* @__PURE__ */ Object.create(null), Mf = H.ie && H.ie_version < 15 || H.ios && H.webkit_version < 604;
function sg(r) {
  let t = r.dom.parentNode;
  if (!t)
    return;
  let e = t.appendChild(document.createElement("textarea"));
  e.style.cssText = "position: fixed; left: -10000px; top: 10px", e.focus(), setTimeout(() => {
    r.focus(), e.remove(), Of(r, e.value);
  }, 50);
}
function ml(r, t, e) {
  for (let i of r.facet(t))
    e = i(e, r);
  return e;
}
function Of(r, t) {
  t = ml(r.state, xa, t);
  let { state: e } = r, i, n = 1, s = e.toText(t), o = s.lines == e.selection.ranges.length;
  if (pa != null && e.selection.ranges.every((h) => h.empty) && pa == s.toString()) {
    let h = -1;
    i = e.changeByRange((d) => {
      let c = e.doc.lineAt(d.from);
      if (c.from == h)
        return { range: d };
      h = c.from;
      let p = e.toText((o ? s.line(n++).text : t) + e.lineBreak);
      return {
        changes: { from: c.from, insert: p },
        range: U.cursor(d.from + p.length)
      };
    });
  } else o ? i = e.changeByRange((h) => {
    let d = s.line(n++);
    return {
      changes: { from: h.from, to: h.to, insert: d.text },
      range: U.cursor(h.from + d.length)
    };
  }) : i = e.replaceSelection(s);
  r.dispatch(i, {
    userEvent: "input.paste",
    scrollIntoView: !0
  });
}
Te.scroll = (r) => {
  r.inputState.lastScrollTop = r.scrollDOM.scrollTop, r.inputState.lastScrollLeft = r.scrollDOM.scrollLeft;
};
Fe.keydown = (r, t) => (r.inputState.setSelectionOrigin("select"), t.keyCode == 27 && r.inputState.tabFocusMode != 0 && (r.inputState.tabFocusMode = Date.now() + 2e3), !1);
Te.touchstart = (r, t) => {
  r.inputState.lastTouchTime = Date.now(), r.inputState.setSelectionOrigin("select.pointer");
};
Te.touchmove = (r) => {
  r.inputState.setSelectionOrigin("select.pointer");
};
Fe.mousedown = (r, t) => {
  if (r.observer.flush(), r.inputState.lastTouchTime > Date.now() - 2e3)
    return !1;
  let e = null;
  for (let i of r.state.facet(uf))
    if (e = i(r, t), e)
      break;
  if (!e && t.button == 0 && (e = ag(r, t)), e) {
    let i = !r.hasFocus;
    r.inputState.startMouseSelection(new tg(r, t, e, i)), i && r.observer.ignore(() => {
      zu(r.contentDOM);
      let s = r.root.activeElement;
      s && !s.contains(r.contentDOM) && s.blur();
    });
    let n = r.inputState.mouseSelection;
    if (n)
      return n.start(t), n.dragging === !1;
  }
  return !1;
};
function Rh(r, t, e, i) {
  if (i == 1)
    return U.cursor(t, e);
  if (i == 2)
    return Pd(r.state, t, e);
  {
    let n = Ht.find(r.docView, t), s = r.state.doc.lineAt(n ? n.posAtEnd : t), o = n ? n.posAtStart : s.from, a = n ? n.posAtEnd : s.to;
    return a < r.state.doc.length && a == s.to && a++, U.range(o, a);
  }
}
let Nh = (r, t, e) => t >= e.top && t <= e.bottom && r >= e.left && r <= e.right;
function og(r, t, e, i) {
  let n = Ht.find(r.docView, t);
  if (!n)
    return 1;
  let s = t - n.posAtStart;
  if (s == 0)
    return 1;
  if (s == n.length)
    return -1;
  let o = n.coordsAt(s, -1);
  if (o && Nh(e, i, o))
    return -1;
  let a = n.coordsAt(s, 1);
  return a && Nh(e, i, a) ? 1 : o && o.bottom >= i ? -1 : 1;
}
function Ih(r, t) {
  let e = r.posAtCoords({ x: t.clientX, y: t.clientY }, !1);
  return { pos: e, bias: og(r, e, t.clientX, t.clientY) };
}
const lg = H.ie && H.ie_version <= 11;
let Ph = null, Lh = 0, Fh = 0;
function Tf(r) {
  if (!lg)
    return r.detail;
  let t = Ph, e = Fh;
  return Ph = r, Fh = Date.now(), Lh = !t || e > Date.now() - 400 && Math.abs(t.clientX - r.clientX) < 2 && Math.abs(t.clientY - r.clientY) < 2 ? (Lh + 1) % 3 : 1;
}
function ag(r, t) {
  let e = Ih(r, t), i = Tf(t), n = r.state.selection;
  return {
    update(s) {
      s.docChanged && (e.pos = s.changes.mapPos(e.pos), n = n.map(s.changes));
    },
    get(s, o, a) {
      let h = Ih(r, s), d, c = Rh(r, h.pos, h.bias, i);
      if (e.pos != h.pos && !o) {
        let p = Rh(r, e.pos, e.bias, i), m = Math.min(p.from, c.from), b = Math.max(p.to, c.to);
        c = m < c.from ? U.range(m, b) : U.range(b, m);
      }
      return o ? n.replaceRange(n.main.extend(c.from, c.to)) : a && i == 1 && n.ranges.length > 1 && (d = hg(n, h.pos)) ? d : a ? n.addRange(c) : U.create([c]);
    }
  };
}
function hg(r, t) {
  for (let e = 0; e < r.ranges.length; e++) {
    let { from: i, to: n } = r.ranges[e];
    if (i <= t && n >= t)
      return U.create(r.ranges.slice(0, e).concat(r.ranges.slice(e + 1)), r.mainIndex == e ? 0 : r.mainIndex - (r.mainIndex > e ? 1 : 0));
  }
  return null;
}
Fe.dragstart = (r, t) => {
  let { selection: { main: e } } = r.state;
  if (t.target.draggable) {
    let n = r.docView.nearest(t.target);
    if (n && n.isWidget) {
      let s = n.posAtStart, o = s + n.length;
      (s >= e.to || o <= e.from) && (e = U.range(s, o));
    }
  }
  let { inputState: i } = r;
  return i.mouseSelection && (i.mouseSelection.dragging = !0), i.draggedContent = e, t.dataTransfer && (t.dataTransfer.setData("Text", ml(r.state, Da, r.state.sliceDoc(e.from, e.to))), t.dataTransfer.effectAllowed = "copyMove"), !1;
};
Fe.dragend = (r) => (r.inputState.draggedContent = null, !1);
function Bh(r, t, e, i) {
  if (e = ml(r.state, xa, e), !e)
    return;
  let n = r.posAtCoords({ x: t.clientX, y: t.clientY }, !1), { draggedContent: s } = r.inputState, o = i && s && ig(r, t) ? { from: s.from, to: s.to } : null, a = { from: n, insert: e }, h = r.state.changes(o ? [o, a] : a);
  r.focus(), r.dispatch({
    changes: h,
    selection: { anchor: h.mapPos(n, -1), head: h.mapPos(n, 1) },
    userEvent: o ? "move.drop" : "input.drop"
  }), r.inputState.draggedContent = null;
}
Fe.drop = (r, t) => {
  if (!t.dataTransfer)
    return !1;
  if (r.state.readOnly)
    return !0;
  let e = t.dataTransfer.files;
  if (e && e.length) {
    let i = Array(e.length), n = 0, s = () => {
      ++n == e.length && Bh(r, t, i.filter((o) => o != null).join(r.state.lineBreak), !1);
    };
    for (let o = 0; o < e.length; o++) {
      let a = new FileReader();
      a.onerror = s, a.onload = () => {
        /[\x00-\x08\x0e-\x1f]{2}/.test(a.result) || (i[o] = a.result), s();
      }, a.readAsText(e[o]);
    }
    return !0;
  } else {
    let i = t.dataTransfer.getData("Text");
    if (i)
      return Bh(r, t, i, !0), !0;
  }
  return !1;
};
Fe.paste = (r, t) => {
  if (r.state.readOnly)
    return !0;
  r.observer.flush();
  let e = Mf ? null : t.clipboardData;
  return e ? (Of(r, e.getData("text/plain") || e.getData("text/uri-list")), !0) : (sg(r), !1);
};
function ug(r, t) {
  let e = r.dom.parentNode;
  if (!e)
    return;
  let i = e.appendChild(document.createElement("textarea"));
  i.style.cssText = "position: fixed; left: -10000px; top: 10px", i.value = t, i.focus(), i.selectionEnd = t.length, i.selectionStart = 0, setTimeout(() => {
    i.remove(), r.focus();
  }, 50);
}
function fg(r) {
  let t = [], e = [], i = !1;
  for (let n of r.selection.ranges)
    n.empty || (t.push(r.sliceDoc(n.from, n.to)), e.push(n));
  if (!t.length) {
    let n = -1;
    for (let { from: s } of r.selection.ranges) {
      let o = r.doc.lineAt(s);
      o.number > n && (t.push(o.text), e.push({ from: o.from, to: Math.min(r.doc.length, o.to + 1) })), n = o.number;
    }
    i = !0;
  }
  return { text: ml(r, Da, t.join(r.lineBreak)), ranges: e, linewise: i };
}
let pa = null;
Fe.copy = Fe.cut = (r, t) => {
  let { text: e, ranges: i, linewise: n } = fg(r.state);
  if (!e && !n)
    return !1;
  pa = n ? e : null, t.type == "cut" && !r.state.readOnly && r.dispatch({
    changes: i,
    scrollIntoView: !0,
    userEvent: "delete.cut"
  });
  let s = Mf ? null : t.clipboardData;
  return s ? (s.clearData(), s.setData("text/plain", e), !0) : (ug(r, e), !1);
};
const xf = /* @__PURE__ */ Wi.define();
function Df(r, t) {
  let e = [];
  for (let i of r.facet(df)) {
    let n = i(r, t);
    n && e.push(n);
  }
  return e ? r.update({ effects: e, annotations: xf.of(!0) }) : null;
}
function Rf(r) {
  setTimeout(() => {
    let t = r.hasFocus;
    if (t != r.inputState.notifiedFocused) {
      let e = Df(r.state, t);
      e ? r.dispatch(e) : r.update([]);
    }
  }, 10);
}
Te.focus = (r) => {
  r.inputState.lastFocusTime = Date.now(), !r.scrollDOM.scrollTop && (r.inputState.lastScrollTop || r.inputState.lastScrollLeft) && (r.scrollDOM.scrollTop = r.inputState.lastScrollTop, r.scrollDOM.scrollLeft = r.inputState.lastScrollLeft), Rf(r);
};
Te.blur = (r) => {
  r.observer.clearSelectionRange(), Rf(r);
};
Te.compositionstart = Te.compositionupdate = (r) => {
  r.observer.editContext || (r.inputState.compositionFirstChange == null && (r.inputState.compositionFirstChange = !0), r.inputState.composing < 0 && (r.inputState.composing = 0));
};
Te.compositionend = (r) => {
  r.observer.editContext || (r.inputState.composing = -1, r.inputState.compositionEndedAt = Date.now(), r.inputState.compositionPendingKey = !0, r.inputState.compositionPendingChange = r.observer.pendingRecords().length > 0, r.inputState.compositionFirstChange = null, H.chrome && H.android ? r.observer.flushSoon() : r.inputState.compositionPendingChange ? Promise.resolve().then(() => r.observer.flush()) : setTimeout(() => {
    r.inputState.composing < 0 && r.docView.hasComposition && r.update([]);
  }, 50));
};
Te.contextmenu = (r) => {
  r.inputState.lastContextMenu = Date.now();
};
Fe.beforeinput = (r, t) => {
  var e, i;
  if (t.inputType == "insertReplacementText" && r.observer.editContext) {
    let s = (e = t.dataTransfer) === null || e === void 0 ? void 0 : e.getData("text/plain"), o = t.getTargetRanges();
    if (s && o.length) {
      let a = o[0], h = r.posAtDOM(a.startContainer, a.startOffset), d = r.posAtDOM(a.endContainer, a.endOffset);
      return Pa(r, { from: h, to: d, insert: r.state.toText(s) }, null), !0;
    }
  }
  let n;
  if (H.chrome && H.android && (n = Cf.find((s) => s.inputType == t.inputType)) && (r.observer.delayAndroidKey(n.key, n.keyCode), n.key == "Backspace" || n.key == "Delete")) {
    let s = ((i = window.visualViewport) === null || i === void 0 ? void 0 : i.height) || 0;
    setTimeout(() => {
      var o;
      (((o = window.visualViewport) === null || o === void 0 ? void 0 : o.height) || 0) > s + 10 && r.hasFocus && (r.contentDOM.blur(), r.focus());
    }, 100);
  }
  return H.ios && t.inputType == "deleteContentForward" && r.observer.flushSoon(), H.safari && t.inputType == "insertText" && r.inputState.composing >= 0 && setTimeout(() => Te.compositionend(r, t), 20), !1;
};
const Vh = /* @__PURE__ */ new Set();
function cg(r) {
  Vh.has(r) || (Vh.add(r), r.addEventListener("copy", () => {
  }), r.addEventListener("cut", () => {
  }));
}
const Hh = ["pre-wrap", "normal", "pre-line", "break-spaces"];
let Bn = !1;
function Wh() {
  Bn = !1;
}
class dg {
  constructor(t) {
    this.lineWrapping = t, this.doc = pt.empty, this.heightSamples = {}, this.lineHeight = 14, this.charWidth = 7, this.textHeight = 14, this.lineLength = 30;
  }
  heightForGap(t, e) {
    let i = this.doc.lineAt(e).number - this.doc.lineAt(t).number + 1;
    return this.lineWrapping && (i += Math.max(0, Math.ceil((e - t - i * this.lineLength * 0.5) / this.lineLength))), this.lineHeight * i;
  }
  heightForLine(t) {
    return this.lineWrapping ? (1 + Math.max(0, Math.ceil((t - this.lineLength) / (this.lineLength - 5)))) * this.lineHeight : this.lineHeight;
  }
  setDoc(t) {
    return this.doc = t, this;
  }
  mustRefreshForWrapping(t) {
    return Hh.indexOf(t) > -1 != this.lineWrapping;
  }
  mustRefreshForHeights(t) {
    let e = !1;
    for (let i = 0; i < t.length; i++) {
      let n = t[i];
      n < 0 ? i++ : this.heightSamples[Math.floor(n * 10)] || (e = !0, this.heightSamples[Math.floor(n * 10)] = !0);
    }
    return e;
  }
  refresh(t, e, i, n, s, o) {
    let a = Hh.indexOf(t) > -1, h = Math.round(e) != Math.round(this.lineHeight) || this.lineWrapping != a;
    if (this.lineWrapping = a, this.lineHeight = e, this.charWidth = i, this.textHeight = n, this.lineLength = s, h) {
      this.heightSamples = {};
      for (let d = 0; d < o.length; d++) {
        let c = o[d];
        c < 0 ? d++ : this.heightSamples[Math.floor(c * 10)] = !0;
      }
    }
    return h;
  }
}
class gg {
  constructor(t, e) {
    this.from = t, this.heights = e, this.index = 0;
  }
  get more() {
    return this.index < this.heights.length;
  }
}
class Ke {
  /**
  @internal
  */
  constructor(t, e, i, n, s) {
    this.from = t, this.length = e, this.top = i, this.height = n, this._content = s;
  }
  /**
  The type of element this is. When querying lines, this may be
  an array of all the blocks that make up the line.
  */
  get type() {
    return typeof this._content == "number" ? Ye.Text : Array.isArray(this._content) ? this._content : this._content.type;
  }
  /**
  The end of the element as a document position.
  */
  get to() {
    return this.from + this.length;
  }
  /**
  The bottom position of the element.
  */
  get bottom() {
    return this.top + this.height;
  }
  /**
  If this is a widget block, this will return the widget
  associated with it.
  */
  get widget() {
    return this._content instanceof bi ? this._content.widget : null;
  }
  /**
  If this is a textblock, this holds the number of line breaks
  that appear in widgets inside the block.
  */
  get widgetLineBreaks() {
    return typeof this._content == "number" ? this._content : 0;
  }
  /**
  @internal
  */
  join(t) {
    let e = (Array.isArray(this._content) ? this._content : [this]).concat(Array.isArray(t._content) ? t._content : [t]);
    return new Ke(this.from, this.length + t.length, this.top, this.height + t.height, e);
  }
}
var Tt = /* @__PURE__ */ function(r) {
  return r[r.ByPos = 0] = "ByPos", r[r.ByHeight = 1] = "ByHeight", r[r.ByPosNoHeight = 2] = "ByPosNoHeight", r;
}(Tt || (Tt = {}));
const Jo = 1e-3;
class ae {
  constructor(t, e, i = 2) {
    this.length = t, this.height = e, this.flags = i;
  }
  get outdated() {
    return (this.flags & 2) > 0;
  }
  set outdated(t) {
    this.flags = (t ? 2 : 0) | this.flags & -3;
  }
  setHeight(t) {
    this.height != t && (Math.abs(this.height - t) > Jo && (Bn = !0), this.height = t);
  }
  // Base case is to replace a leaf node, which simply builds a tree
  // from the new nodes and returns that (HeightMapBranch and
  // HeightMapGap override this to actually use from/to)
  replace(t, e, i) {
    return ae.of(i);
  }
  // Again, these are base cases, and are overridden for branch and gap nodes.
  decomposeLeft(t, e) {
    e.push(this);
  }
  decomposeRight(t, e) {
    e.push(this);
  }
  applyChanges(t, e, i, n) {
    let s = this, o = i.doc;
    for (let a = n.length - 1; a >= 0; a--) {
      let { fromA: h, toA: d, fromB: c, toB: p } = n[a], m = s.lineAt(h, Tt.ByPosNoHeight, i.setDoc(e), 0, 0), b = m.to >= d ? m : s.lineAt(d, Tt.ByPosNoHeight, i, 0, 0);
      for (p += b.to - d, d = b.to; a > 0 && m.from <= n[a - 1].toA; )
        h = n[a - 1].fromA, c = n[a - 1].fromB, a--, h < m.from && (m = s.lineAt(h, Tt.ByPosNoHeight, i, 0, 0));
      c += m.from - h, h = m.from;
      let S = La.build(i.setDoc(o), t, c, p);
      s = nl(s, s.replace(h, d, S));
    }
    return s.updateHeight(i, 0);
  }
  static empty() {
    return new me(0, 0);
  }
  // nodes uses null values to indicate the position of line breaks.
  // There are never line breaks at the start or end of the array, or
  // two line breaks next to each other, and the array isn't allowed
  // to be empty (same restrictions as return value from the builder).
  static of(t) {
    if (t.length == 1)
      return t[0];
    let e = 0, i = t.length, n = 0, s = 0;
    for (; ; )
      if (e == i)
        if (n > s * 2) {
          let a = t[e - 1];
          a.break ? t.splice(--e, 1, a.left, null, a.right) : t.splice(--e, 1, a.left, a.right), i += 1 + a.break, n -= a.size;
        } else if (s > n * 2) {
          let a = t[i];
          a.break ? t.splice(i, 1, a.left, null, a.right) : t.splice(i, 1, a.left, a.right), i += 2 + a.break, s -= a.size;
        } else
          break;
      else if (n < s) {
        let a = t[e++];
        a && (n += a.size);
      } else {
        let a = t[--i];
        a && (s += a.size);
      }
    let o = 0;
    return t[e - 1] == null ? (o = 1, e--) : t[e] == null && (o = 1, i++), new pg(ae.of(t.slice(0, e)), o, ae.of(t.slice(i)));
  }
}
function nl(r, t) {
  return r == t ? r : (r.constructor != t.constructor && (Bn = !0), t);
}
ae.prototype.size = 1;
class Nf extends ae {
  constructor(t, e, i) {
    super(t, e), this.deco = i;
  }
  blockAt(t, e, i, n) {
    return new Ke(n, this.length, i, this.height, this.deco || 0);
  }
  lineAt(t, e, i, n, s) {
    return this.blockAt(0, i, n, s);
  }
  forEachLine(t, e, i, n, s, o) {
    t <= s + this.length && e >= s && o(this.blockAt(0, i, n, s));
  }
  updateHeight(t, e = 0, i = !1, n) {
    return n && n.from <= e && n.more && this.setHeight(n.heights[n.index++]), this.outdated = !1, this;
  }
  toString() {
    return `block(${this.length})`;
  }
}
class me extends Nf {
  constructor(t, e) {
    super(t, e, null), this.collapsed = 0, this.widgetHeight = 0, this.breaks = 0;
  }
  blockAt(t, e, i, n) {
    return new Ke(n, this.length, i, this.height, this.breaks);
  }
  replace(t, e, i) {
    let n = i[0];
    return i.length == 1 && (n instanceof me || n instanceof Jt && n.flags & 4) && Math.abs(this.length - n.length) < 10 ? (n instanceof Jt ? n = new me(n.length, this.height) : n.height = this.height, this.outdated || (n.outdated = !1), n) : ae.of(i);
  }
  updateHeight(t, e = 0, i = !1, n) {
    return n && n.from <= e && n.more ? this.setHeight(n.heights[n.index++]) : (i || this.outdated) && this.setHeight(Math.max(this.widgetHeight, t.heightForLine(this.length - this.collapsed)) + this.breaks * t.lineHeight), this.outdated = !1, this;
  }
  toString() {
    return `line(${this.length}${this.collapsed ? -this.collapsed : ""}${this.widgetHeight ? ":" + this.widgetHeight : ""})`;
  }
}
class Jt extends ae {
  constructor(t) {
    super(t, 0);
  }
  heightMetrics(t, e) {
    let i = t.doc.lineAt(e).number, n = t.doc.lineAt(e + this.length).number, s = n - i + 1, o, a = 0;
    if (t.lineWrapping) {
      let h = Math.min(this.height, t.lineHeight * s);
      o = h / s, this.length > s + 1 && (a = (this.height - h) / (this.length - s - 1));
    } else
      o = this.height / s;
    return { firstLine: i, lastLine: n, perLine: o, perChar: a };
  }
  blockAt(t, e, i, n) {
    let { firstLine: s, lastLine: o, perLine: a, perChar: h } = this.heightMetrics(e, n);
    if (e.lineWrapping) {
      let d = n + (t < e.lineHeight ? 0 : Math.round(Math.max(0, Math.min(1, (t - i) / this.height)) * this.length)), c = e.doc.lineAt(d), p = a + c.length * h, m = Math.max(i, t - p / 2);
      return new Ke(c.from, c.length, m, p, 0);
    } else {
      let d = Math.max(0, Math.min(o - s, Math.floor((t - i) / a))), { from: c, length: p } = e.doc.line(s + d);
      return new Ke(c, p, i + a * d, a, 0);
    }
  }
  lineAt(t, e, i, n, s) {
    if (e == Tt.ByHeight)
      return this.blockAt(t, i, n, s);
    if (e == Tt.ByPosNoHeight) {
      let { from: b, to: S } = i.doc.lineAt(t);
      return new Ke(b, S - b, 0, 0, 0);
    }
    let { firstLine: o, perLine: a, perChar: h } = this.heightMetrics(i, s), d = i.doc.lineAt(t), c = a + d.length * h, p = d.number - o, m = n + a * p + h * (d.from - s - p);
    return new Ke(d.from, d.length, Math.max(n, Math.min(m, n + this.height - c)), c, 0);
  }
  forEachLine(t, e, i, n, s, o) {
    t = Math.max(t, s), e = Math.min(e, s + this.length);
    let { firstLine: a, perLine: h, perChar: d } = this.heightMetrics(i, s);
    for (let c = t, p = n; c <= e; ) {
      let m = i.doc.lineAt(c);
      if (c == t) {
        let S = m.number - a;
        p += h * S + d * (t - s - S);
      }
      let b = h + d * m.length;
      o(new Ke(m.from, m.length, p, b, 0)), p += b, c = m.to + 1;
    }
  }
  replace(t, e, i) {
    let n = this.length - e;
    if (n > 0) {
      let s = i[i.length - 1];
      s instanceof Jt ? i[i.length - 1] = new Jt(s.length + n) : i.push(null, new Jt(n - 1));
    }
    if (t > 0) {
      let s = i[0];
      s instanceof Jt ? i[0] = new Jt(t + s.length) : i.unshift(new Jt(t - 1), null);
    }
    return ae.of(i);
  }
  decomposeLeft(t, e) {
    e.push(new Jt(t - 1), null);
  }
  decomposeRight(t, e) {
    e.push(null, new Jt(this.length - t - 1));
  }
  updateHeight(t, e = 0, i = !1, n) {
    let s = e + this.length;
    if (n && n.from <= e + this.length && n.more) {
      let o = [], a = Math.max(e, n.from), h = -1;
      for (n.from > e && o.push(new Jt(n.from - e - 1).updateHeight(t, e)); a <= s && n.more; ) {
        let c = t.doc.lineAt(a).length;
        o.length && o.push(null);
        let p = n.heights[n.index++];
        h == -1 ? h = p : Math.abs(p - h) >= Jo && (h = -2);
        let m = new me(c, p);
        m.outdated = !1, o.push(m), a += c + 1;
      }
      a <= s && o.push(null, new Jt(s - a).updateHeight(t, a));
      let d = ae.of(o);
      return (h < 0 || Math.abs(d.height - this.height) >= Jo || Math.abs(h - this.heightMetrics(t, e).perLine) >= Jo) && (Bn = !0), nl(this, d);
    } else (i || this.outdated) && (this.setHeight(t.heightForGap(e, e + this.length)), this.outdated = !1);
    return this;
  }
  toString() {
    return `gap(${this.length})`;
  }
}
class pg extends ae {
  constructor(t, e, i) {
    super(t.length + e + i.length, t.height + i.height, e | (t.outdated || i.outdated ? 2 : 0)), this.left = t, this.right = i, this.size = t.size + i.size;
  }
  get break() {
    return this.flags & 1;
  }
  blockAt(t, e, i, n) {
    let s = i + this.left.height;
    return t < s ? this.left.blockAt(t, e, i, n) : this.right.blockAt(t, e, s, n + this.left.length + this.break);
  }
  lineAt(t, e, i, n, s) {
    let o = n + this.left.height, a = s + this.left.length + this.break, h = e == Tt.ByHeight ? t < o : t < a, d = h ? this.left.lineAt(t, e, i, n, s) : this.right.lineAt(t, e, i, o, a);
    if (this.break || (h ? d.to < a : d.from > a))
      return d;
    let c = e == Tt.ByPosNoHeight ? Tt.ByPosNoHeight : Tt.ByPos;
    return h ? d.join(this.right.lineAt(a, c, i, o, a)) : this.left.lineAt(a, c, i, n, s).join(d);
  }
  forEachLine(t, e, i, n, s, o) {
    let a = n + this.left.height, h = s + this.left.length + this.break;
    if (this.break)
      t < h && this.left.forEachLine(t, e, i, n, s, o), e >= h && this.right.forEachLine(t, e, i, a, h, o);
    else {
      let d = this.lineAt(h, Tt.ByPos, i, n, s);
      t < d.from && this.left.forEachLine(t, d.from - 1, i, n, s, o), d.to >= t && d.from <= e && o(d), e > d.to && this.right.forEachLine(d.to + 1, e, i, a, h, o);
    }
  }
  replace(t, e, i) {
    let n = this.left.length + this.break;
    if (e < n)
      return this.balanced(this.left.replace(t, e, i), this.right);
    if (t > this.left.length)
      return this.balanced(this.left, this.right.replace(t - n, e - n, i));
    let s = [];
    t > 0 && this.decomposeLeft(t, s);
    let o = s.length;
    for (let a of i)
      s.push(a);
    if (t > 0 && Uh(s, o - 1), e < this.length) {
      let a = s.length;
      this.decomposeRight(e, s), Uh(s, a);
    }
    return ae.of(s);
  }
  decomposeLeft(t, e) {
    let i = this.left.length;
    if (t <= i)
      return this.left.decomposeLeft(t, e);
    e.push(this.left), this.break && (i++, t >= i && e.push(null)), t > i && this.right.decomposeLeft(t - i, e);
  }
  decomposeRight(t, e) {
    let i = this.left.length, n = i + this.break;
    if (t >= n)
      return this.right.decomposeRight(t - n, e);
    t < i && this.left.decomposeRight(t, e), this.break && t < n && e.push(null), e.push(this.right);
  }
  balanced(t, e) {
    return t.size > 2 * e.size || e.size > 2 * t.size ? ae.of(this.break ? [t, null, e] : [t, e]) : (this.left = nl(this.left, t), this.right = nl(this.right, e), this.setHeight(t.height + e.height), this.outdated = t.outdated || e.outdated, this.size = t.size + e.size, this.length = t.length + this.break + e.length, this);
  }
  updateHeight(t, e = 0, i = !1, n) {
    let { left: s, right: o } = this, a = e + s.length + this.break, h = null;
    return n && n.from <= e + s.length && n.more ? h = s = s.updateHeight(t, e, i, n) : s.updateHeight(t, e, i), n && n.from <= a + o.length && n.more ? h = o = o.updateHeight(t, a, i, n) : o.updateHeight(t, a, i), h ? this.balanced(s, o) : (this.height = this.left.height + this.right.height, this.outdated = !1, this);
  }
  toString() {
    return this.left + (this.break ? " " : "-") + this.right;
  }
}
function Uh(r, t) {
  let e, i;
  r[t] == null && (e = r[t - 1]) instanceof Jt && (i = r[t + 1]) instanceof Jt && r.splice(t - 1, 3, new Jt(e.length + 1 + i.length));
}
const mg = 5;
class La {
  constructor(t, e) {
    this.pos = t, this.oracle = e, this.nodes = [], this.lineStart = -1, this.lineEnd = -1, this.covering = null, this.writtenTo = t;
  }
  get isCovered() {
    return this.covering && this.nodes[this.nodes.length - 1] == this.covering;
  }
  span(t, e) {
    if (this.lineStart > -1) {
      let i = Math.min(e, this.lineEnd), n = this.nodes[this.nodes.length - 1];
      n instanceof me ? n.length += i - this.pos : (i > this.pos || !this.isCovered) && this.nodes.push(new me(i - this.pos, -1)), this.writtenTo = i, e > i && (this.nodes.push(null), this.writtenTo++, this.lineStart = -1);
    }
    this.pos = e;
  }
  point(t, e, i) {
    if (t < e || i.heightRelevant) {
      let n = i.widget ? i.widget.estimatedHeight : 0, s = i.widget ? i.widget.lineBreaks : 0;
      n < 0 && (n = this.oracle.lineHeight);
      let o = e - t;
      i.block ? this.addBlock(new Nf(o, n, i)) : (o || s || n >= mg) && this.addLineDeco(n, s, o);
    } else e > t && this.span(t, e);
    this.lineEnd > -1 && this.lineEnd < this.pos && (this.lineEnd = this.oracle.doc.lineAt(this.pos).to);
  }
  enterLine() {
    if (this.lineStart > -1)
      return;
    let { from: t, to: e } = this.oracle.doc.lineAt(this.pos);
    this.lineStart = t, this.lineEnd = e, this.writtenTo < t && ((this.writtenTo < t - 1 || this.nodes[this.nodes.length - 1] == null) && this.nodes.push(this.blankContent(this.writtenTo, t - 1)), this.nodes.push(null)), this.pos > t && this.nodes.push(new me(this.pos - t, -1)), this.writtenTo = this.pos;
  }
  blankContent(t, e) {
    let i = new Jt(e - t);
    return this.oracle.doc.lineAt(t).to == e && (i.flags |= 4), i;
  }
  ensureLine() {
    this.enterLine();
    let t = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
    if (t instanceof me)
      return t;
    let e = new me(0, -1);
    return this.nodes.push(e), e;
  }
  addBlock(t) {
    this.enterLine();
    let e = t.deco;
    e && e.startSide > 0 && !this.isCovered && this.ensureLine(), this.nodes.push(t), this.writtenTo = this.pos = this.pos + t.length, e && e.endSide > 0 && (this.covering = t);
  }
  addLineDeco(t, e, i) {
    let n = this.ensureLine();
    n.length += i, n.collapsed += i, n.widgetHeight = Math.max(n.widgetHeight, t), n.breaks += e, this.writtenTo = this.pos = this.pos + i;
  }
  finish(t) {
    let e = this.nodes.length == 0 ? null : this.nodes[this.nodes.length - 1];
    this.lineStart > -1 && !(e instanceof me) && !this.isCovered ? this.nodes.push(new me(0, -1)) : (this.writtenTo < this.pos || e == null) && this.nodes.push(this.blankContent(this.writtenTo, this.pos));
    let i = t;
    for (let n of this.nodes)
      n instanceof me && n.updateHeight(this.oracle, i), i += n ? n.length : 1;
    return this.nodes;
  }
  // Always called with a region that on both sides either stretches
  // to a line break or the end of the document.
  // The returned array uses null to indicate line breaks, but never
  // starts or ends in a line break, or has multiple line breaks next
  // to each other.
  static build(t, e, i, n) {
    let s = new La(i, t);
    return Et.spans(e, i, n, s, 0), s.finish(i);
  }
}
function yg(r, t, e) {
  let i = new bg();
  return Et.compare(r, t, e, i, 0), i.changes;
}
class bg {
  constructor() {
    this.changes = [];
  }
  compareRange() {
  }
  comparePoint(t, e, i, n) {
    (t < e || i && i.heightRelevant || n && n.heightRelevant) && Yo(t, e, this.changes, 5);
  }
}
function vg(r, t) {
  let e = r.getBoundingClientRect(), i = r.ownerDocument, n = i.defaultView || window, s = Math.max(0, e.left), o = Math.min(n.innerWidth, e.right), a = Math.max(0, e.top), h = Math.min(n.innerHeight, e.bottom);
  for (let d = r.parentNode; d && d != i.body; )
    if (d.nodeType == 1) {
      let c = d, p = window.getComputedStyle(c);
      if ((c.scrollHeight > c.clientHeight || c.scrollWidth > c.clientWidth) && p.overflow != "visible") {
        let m = c.getBoundingClientRect();
        s = Math.max(s, m.left), o = Math.min(o, m.right), a = Math.max(a, m.top), h = Math.min(d == r.parentNode ? n.innerHeight : h, m.bottom);
      }
      d = p.position == "absolute" || p.position == "fixed" ? c.offsetParent : c.parentNode;
    } else if (d.nodeType == 11)
      d = d.host;
    else
      break;
  return {
    left: s - e.left,
    right: Math.max(s, o) - e.left,
    top: a - (e.top + t),
    bottom: Math.max(a, h) - (e.top + t)
  };
}
function wg(r, t) {
  let e = r.getBoundingClientRect();
  return {
    left: 0,
    right: e.right - e.left,
    top: t,
    bottom: e.bottom - (e.top + t)
  };
}
class Nl {
  constructor(t, e, i, n) {
    this.from = t, this.to = e, this.size = i, this.displaySize = n;
  }
  static same(t, e) {
    if (t.length != e.length)
      return !1;
    for (let i = 0; i < t.length; i++) {
      let n = t[i], s = e[i];
      if (n.from != s.from || n.to != s.to || n.size != s.size)
        return !1;
    }
    return !0;
  }
  draw(t, e) {
    return Kt.replace({
      widget: new Sg(this.displaySize * (e ? t.scaleY : t.scaleX), e)
    }).range(this.from, this.to);
  }
}
class Sg extends pl {
  constructor(t, e) {
    super(), this.size = t, this.vertical = e;
  }
  eq(t) {
    return t.size == this.size && t.vertical == this.vertical;
  }
  toDOM() {
    let t = document.createElement("div");
    return this.vertical ? t.style.height = this.size + "px" : (t.style.width = this.size + "px", t.style.height = "2px", t.style.display = "inline-block"), t;
  }
  get estimatedHeight() {
    return this.vertical ? this.size : -1;
  }
}
class zh {
  constructor(t) {
    this.state = t, this.pixelViewport = { left: 0, right: window.innerWidth, top: 0, bottom: 0 }, this.inView = !0, this.paddingTop = 0, this.paddingBottom = 0, this.contentDOMWidth = 0, this.contentDOMHeight = 0, this.editorHeight = 0, this.editorWidth = 0, this.scrollTop = 0, this.scrolledToBottom = !1, this.scaleX = 1, this.scaleY = 1, this.scrollAnchorPos = 0, this.scrollAnchorHeight = -1, this.scaler = _h, this.scrollTarget = null, this.printing = !1, this.mustMeasureContent = !0, this.defaultTextDirection = Wt.LTR, this.visibleRanges = [], this.mustEnforceCursorAssoc = !1;
    let e = t.facet(Ra).some((i) => typeof i != "function" && i.class == "cm-lineWrapping");
    this.heightOracle = new dg(e), this.stateDeco = t.facet(xr).filter((i) => typeof i != "function"), this.heightMap = ae.empty().applyChanges(this.stateDeco, pt.empty, this.heightOracle.setDoc(t.doc), [new Me(0, 0, 0, t.doc.length)]);
    for (let i = 0; i < 2 && (this.viewport = this.getViewport(0, null), !!this.updateForViewport()); i++)
      ;
    this.updateViewportLines(), this.lineGaps = this.ensureLineGaps([]), this.lineGapDeco = Kt.set(this.lineGaps.map((i) => i.draw(this, !1))), this.computeVisibleRanges();
  }
  updateForViewport() {
    let t = [this.viewport], { main: e } = this.state.selection;
    for (let i = 0; i <= 1; i++) {
      let n = i ? e.head : e.anchor;
      if (!t.some(({ from: s, to: o }) => n >= s && n <= o)) {
        let { from: s, to: o } = this.lineBlockAt(n);
        t.push(new Po(s, o));
      }
    }
    return this.viewports = t.sort((i, n) => i.from - n.from), this.updateScaler();
  }
  updateScaler() {
    let t = this.scaler;
    return this.scaler = this.heightMap.height <= 7e6 ? _h : new Fa(this.heightOracle, this.heightMap, this.viewports), t.eq(this.scaler) ? 0 : 2;
  }
  updateViewportLines() {
    this.viewportLines = [], this.heightMap.forEachLine(this.viewport.from, this.viewport.to, this.heightOracle.setDoc(this.state.doc), 0, 0, (t) => {
      this.viewportLines.push(mr(t, this.scaler));
    });
  }
  update(t, e = null) {
    this.state = t.state;
    let i = this.stateDeco;
    this.stateDeco = this.state.facet(xr).filter((c) => typeof c != "function");
    let n = t.changedRanges, s = Me.extendWithRanges(n, yg(i, this.stateDeco, t ? t.changes : $t.empty(this.state.doc.length))), o = this.heightMap.height, a = this.scrolledToBottom ? null : this.scrollAnchorAt(this.scrollTop);
    Wh(), this.heightMap = this.heightMap.applyChanges(this.stateDeco, t.startState.doc, this.heightOracle.setDoc(this.state.doc), s), (this.heightMap.height != o || Bn) && (t.flags |= 2), a ? (this.scrollAnchorPos = t.changes.mapPos(a.from, -1), this.scrollAnchorHeight = a.top) : (this.scrollAnchorPos = -1, this.scrollAnchorHeight = this.heightMap.height);
    let h = s.length ? this.mapViewport(this.viewport, t.changes) : this.viewport;
    (e && (e.range.head < h.from || e.range.head > h.to) || !this.viewportIsAppropriate(h)) && (h = this.getViewport(0, e));
    let d = h.from != this.viewport.from || h.to != this.viewport.to;
    this.viewport = h, t.flags |= this.updateForViewport(), (d || !t.changes.empty || t.flags & 2) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, t.changes))), t.flags |= this.computeVisibleRanges(t.changes), e && (this.scrollTarget = e), !this.mustEnforceCursorAssoc && t.selectionSet && t.view.lineWrapping && t.state.selection.main.empty && t.state.selection.main.assoc && !t.state.facet(Ed) && (this.mustEnforceCursorAssoc = !0);
  }
  measure(t) {
    let e = t.contentDOM, i = window.getComputedStyle(e), n = this.heightOracle, s = i.whiteSpace;
    this.defaultTextDirection = i.direction == "rtl" ? Wt.RTL : Wt.LTR;
    let o = this.heightOracle.mustRefreshForWrapping(s), a = e.getBoundingClientRect(), h = o || this.mustMeasureContent || this.contentDOMHeight != a.height;
    this.contentDOMHeight = a.height, this.mustMeasureContent = !1;
    let d = 0, c = 0;
    if (a.width && a.height) {
      let { scaleX: D, scaleY: N } = Uu(e, a);
      (D > 5e-3 && Math.abs(this.scaleX - D) > 5e-3 || N > 5e-3 && Math.abs(this.scaleY - N) > 5e-3) && (this.scaleX = D, this.scaleY = N, d |= 16, o = h = !0);
    }
    let p = (parseInt(i.paddingTop) || 0) * this.scaleY, m = (parseInt(i.paddingBottom) || 0) * this.scaleY;
    (this.paddingTop != p || this.paddingBottom != m) && (this.paddingTop = p, this.paddingBottom = m, d |= 18), this.editorWidth != t.scrollDOM.clientWidth && (n.lineWrapping && (h = !0), this.editorWidth = t.scrollDOM.clientWidth, d |= 16);
    let b = t.scrollDOM.scrollTop * this.scaleY;
    this.scrollTop != b && (this.scrollAnchorHeight = -1, this.scrollTop = b), this.scrolledToBottom = $u(t.scrollDOM);
    let S = (this.printing ? wg : vg)(e, this.paddingTop), E = S.top - this.pixelViewport.top, w = S.bottom - this.pixelViewport.bottom;
    this.pixelViewport = S;
    let M = this.pixelViewport.bottom > this.pixelViewport.top && this.pixelViewport.right > this.pixelViewport.left;
    if (M != this.inView && (this.inView = M, M && (h = !0)), !this.inView && !this.scrollTarget)
      return 0;
    let R = a.width;
    if ((this.contentDOMWidth != R || this.editorHeight != t.scrollDOM.clientHeight) && (this.contentDOMWidth = a.width, this.editorHeight = t.scrollDOM.clientHeight, d |= 16), h) {
      let D = t.docView.measureVisibleLineHeights(this.viewport);
      if (n.mustRefreshForHeights(D) && (o = !0), o || n.lineWrapping && Math.abs(R - this.contentDOMWidth) > n.charWidth) {
        let { lineHeight: N, charWidth: W, textHeight: L } = t.docView.measureTextSize();
        o = N > 0 && n.refresh(s, N, W, L, R / W, D), o && (t.docView.minWidth = 0, d |= 16);
      }
      E > 0 && w > 0 ? c = Math.max(E, w) : E < 0 && w < 0 && (c = Math.min(E, w)), Wh();
      for (let N of this.viewports) {
        let W = N.from == this.viewport.from ? D : t.docView.measureVisibleLineHeights(N);
        this.heightMap = (o ? ae.empty().applyChanges(this.stateDeco, pt.empty, this.heightOracle, [new Me(0, 0, 0, t.state.doc.length)]) : this.heightMap).updateHeight(n, 0, o, new gg(N.from, W));
      }
      Bn && (d |= 2);
    }
    let I = !this.viewportIsAppropriate(this.viewport, c) || this.scrollTarget && (this.scrollTarget.range.head < this.viewport.from || this.scrollTarget.range.head > this.viewport.to);
    return I && (d & 2 && (d |= this.updateScaler()), this.viewport = this.getViewport(c, this.scrollTarget), d |= this.updateForViewport()), (d & 2 || I) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(o ? [] : this.lineGaps, t)), d |= this.computeVisibleRanges(), this.mustEnforceCursorAssoc && (this.mustEnforceCursorAssoc = !1, t.docView.enforceCursorAssoc()), d;
  }
  get visibleTop() {
    return this.scaler.fromDOM(this.pixelViewport.top);
  }
  get visibleBottom() {
    return this.scaler.fromDOM(this.pixelViewport.bottom);
  }
  getViewport(t, e) {
    let i = 0.5 - Math.max(-0.5, Math.min(0.5, t / 1e3 / 2)), n = this.heightMap, s = this.heightOracle, { visibleTop: o, visibleBottom: a } = this, h = new Po(n.lineAt(o - i * 1e3, Tt.ByHeight, s, 0, 0).from, n.lineAt(a + (1 - i) * 1e3, Tt.ByHeight, s, 0, 0).to);
    if (e) {
      let { head: d } = e.range;
      if (d < h.from || d > h.to) {
        let c = Math.min(this.editorHeight, this.pixelViewport.bottom - this.pixelViewport.top), p = n.lineAt(d, Tt.ByPos, s, 0, 0), m;
        e.y == "center" ? m = (p.top + p.bottom) / 2 - c / 2 : e.y == "start" || e.y == "nearest" && d < h.from ? m = p.top : m = p.bottom - c, h = new Po(n.lineAt(m - 1e3 / 2, Tt.ByHeight, s, 0, 0).from, n.lineAt(m + c + 1e3 / 2, Tt.ByHeight, s, 0, 0).to);
      }
    }
    return h;
  }
  mapViewport(t, e) {
    let i = e.mapPos(t.from, -1), n = e.mapPos(t.to, 1);
    return new Po(this.heightMap.lineAt(i, Tt.ByPos, this.heightOracle, 0, 0).from, this.heightMap.lineAt(n, Tt.ByPos, this.heightOracle, 0, 0).to);
  }
  // Checks if a given viewport covers the visible part of the
  // document and not too much beyond that.
  viewportIsAppropriate({ from: t, to: e }, i = 0) {
    if (!this.inView)
      return !0;
    let { top: n } = this.heightMap.lineAt(t, Tt.ByPos, this.heightOracle, 0, 0), { bottom: s } = this.heightMap.lineAt(e, Tt.ByPos, this.heightOracle, 0, 0), { visibleTop: o, visibleBottom: a } = this;
    return (t == 0 || n <= o - Math.max(10, Math.min(
      -i,
      250
      /* VP.MaxCoverMargin */
    ))) && (e == this.state.doc.length || s >= a + Math.max(10, Math.min(
      i,
      250
      /* VP.MaxCoverMargin */
    ))) && n > o - 2 * 1e3 && s < a + 2 * 1e3;
  }
  mapLineGaps(t, e) {
    if (!t.length || e.empty)
      return t;
    let i = [];
    for (let n of t)
      e.touchesRange(n.from, n.to) || i.push(new Nl(e.mapPos(n.from), e.mapPos(n.to), n.size, n.displaySize));
    return i;
  }
  // Computes positions in the viewport where the start or end of a
  // line should be hidden, trying to reuse existing line gaps when
  // appropriate to avoid unneccesary redraws.
  // Uses crude character-counting for the positioning and sizing,
  // since actual DOM coordinates aren't always available and
  // predictable. Relies on generous margins (see LG.Margin) to hide
  // the artifacts this might produce from the user.
  ensureLineGaps(t, e) {
    let i = this.heightOracle.lineWrapping, n = i ? 1e4 : 2e3, s = n >> 1, o = n << 1;
    if (this.defaultTextDirection != Wt.LTR && !i)
      return [];
    let a = [], h = (c, p, m, b) => {
      if (p - c < s)
        return;
      let S = this.state.selection.main, E = [S.from];
      S.empty || E.push(S.to);
      for (let M of E)
        if (M > c && M < p) {
          h(c, M - 10, m, b), h(M + 10, p, m, b);
          return;
        }
      let w = kg(t, (M) => M.from >= m.from && M.to <= m.to && Math.abs(M.from - c) < s && Math.abs(M.to - p) < s && !E.some((R) => M.from < R && M.to > R));
      if (!w) {
        if (p < m.to && e && i && e.visibleRanges.some((I) => I.from <= p && I.to >= p)) {
          let I = e.moveToLineBoundary(U.cursor(p), !1, !0).head;
          I > c && (p = I);
        }
        let M = this.gapSize(m, c, p, b), R = i || M < 2e6 ? M : 2e6;
        w = new Nl(c, p, M, R);
      }
      a.push(w);
    }, d = (c) => {
      if (c.length < o || c.type != Ye.Text)
        return;
      let p = Ag(c.from, c.to, this.stateDeco);
      if (p.total < o)
        return;
      let m = this.scrollTarget ? this.scrollTarget.range.head : null, b, S;
      if (i) {
        let E = n / this.heightOracle.lineLength * this.heightOracle.lineHeight, w, M;
        if (m != null) {
          let R = Fo(p, m), I = ((this.visibleBottom - this.visibleTop) / 2 + E) / c.height;
          w = R - I, M = R + I;
        } else
          w = (this.visibleTop - c.top - E) / c.height, M = (this.visibleBottom - c.top + E) / c.height;
        b = Lo(p, w), S = Lo(p, M);
      } else {
        let E = p.total * this.heightOracle.charWidth, w = n * this.heightOracle.charWidth, M = 0;
        if (E > 2e6)
          for (let W of t)
            W.from >= c.from && W.from < c.to && W.size != W.displaySize && W.from * this.heightOracle.charWidth + M < this.pixelViewport.left && (M = W.size - W.displaySize);
        let R = this.pixelViewport.left + M, I = this.pixelViewport.right + M, D, N;
        if (m != null) {
          let W = Fo(p, m), L = ((I - R) / 2 + w) / E;
          D = W - L, N = W + L;
        } else
          D = (R - w) / E, N = (I + w) / E;
        b = Lo(p, D), S = Lo(p, N);
      }
      b > c.from && h(c.from, b, c, p), S < c.to && h(S, c.to, c, p);
    };
    for (let c of this.viewportLines)
      Array.isArray(c.type) ? c.type.forEach(d) : d(c);
    return a;
  }
  gapSize(t, e, i, n) {
    let s = Fo(n, i) - Fo(n, e);
    return this.heightOracle.lineWrapping ? t.height * s : n.total * this.heightOracle.charWidth * s;
  }
  updateLineGaps(t) {
    Nl.same(t, this.lineGaps) || (this.lineGaps = t, this.lineGapDeco = Kt.set(t.map((e) => e.draw(this, this.heightOracle.lineWrapping))));
  }
  computeVisibleRanges(t) {
    let e = this.stateDeco;
    this.lineGaps.length && (e = e.concat(this.lineGapDeco));
    let i = [];
    Et.spans(e, this.viewport.from, this.viewport.to, {
      span(s, o) {
        i.push({ from: s, to: o });
      },
      point() {
      }
    }, 20);
    let n = 0;
    if (i.length != this.visibleRanges.length)
      n = 12;
    else
      for (let s = 0; s < i.length && !(n & 8); s++) {
        let o = this.visibleRanges[s], a = i[s];
        (o.from != a.from || o.to != a.to) && (n |= 4, t && t.mapPos(o.from, -1) == a.from && t.mapPos(o.to, 1) == a.to || (n |= 8));
      }
    return this.visibleRanges = i, n;
  }
  lineBlockAt(t) {
    return t >= this.viewport.from && t <= this.viewport.to && this.viewportLines.find((e) => e.from <= t && e.to >= t) || mr(this.heightMap.lineAt(t, Tt.ByPos, this.heightOracle, 0, 0), this.scaler);
  }
  lineBlockAtHeight(t) {
    return t >= this.viewportLines[0].top && t <= this.viewportLines[this.viewportLines.length - 1].bottom && this.viewportLines.find((e) => e.top <= t && e.bottom >= t) || mr(this.heightMap.lineAt(this.scaler.fromDOM(t), Tt.ByHeight, this.heightOracle, 0, 0), this.scaler);
  }
  scrollAnchorAt(t) {
    let e = this.lineBlockAtHeight(t + 8);
    return e.from >= this.viewport.from || this.viewportLines[0].top - t > 200 ? e : this.viewportLines[0];
  }
  elementAtHeight(t) {
    return mr(this.heightMap.blockAt(this.scaler.fromDOM(t), this.heightOracle, 0, 0), this.scaler);
  }
  get docHeight() {
    return this.scaler.toDOM(this.heightMap.height);
  }
  get contentHeight() {
    return this.docHeight + this.paddingTop + this.paddingBottom;
  }
}
class Po {
  constructor(t, e) {
    this.from = t, this.to = e;
  }
}
function Ag(r, t, e) {
  let i = [], n = r, s = 0;
  return Et.spans(e, r, t, {
    span() {
    },
    point(o, a) {
      o > n && (i.push({ from: n, to: o }), s += o - n), n = a;
    }
  }, 20), n < t && (i.push({ from: n, to: t }), s += t - n), { total: s, ranges: i };
}
function Lo({ total: r, ranges: t }, e) {
  if (e <= 0)
    return t[0].from;
  if (e >= 1)
    return t[t.length - 1].to;
  let i = Math.floor(r * e);
  for (let n = 0; ; n++) {
    let { from: s, to: o } = t[n], a = o - s;
    if (i <= a)
      return s + i;
    i -= a;
  }
}
function Fo(r, t) {
  let e = 0;
  for (let { from: i, to: n } of r.ranges) {
    if (t <= n) {
      e += t - i;
      break;
    }
    e += n - i;
  }
  return e / r.total;
}
function kg(r, t) {
  for (let e of r)
    if (t(e))
      return e;
}
const _h = {
  toDOM(r) {
    return r;
  },
  fromDOM(r) {
    return r;
  },
  scale: 1,
  eq(r) {
    return r == this;
  }
};
class Fa {
  constructor(t, e, i) {
    let n = 0, s = 0, o = 0;
    this.viewports = i.map(({ from: a, to: h }) => {
      let d = e.lineAt(a, Tt.ByPos, t, 0, 0).top, c = e.lineAt(h, Tt.ByPos, t, 0, 0).bottom;
      return n += c - d, { from: a, to: h, top: d, bottom: c, domTop: 0, domBottom: 0 };
    }), this.scale = (7e6 - n) / (e.height - n);
    for (let a of this.viewports)
      a.domTop = o + (a.top - s) * this.scale, o = a.domBottom = a.domTop + (a.bottom - a.top), s = a.bottom;
  }
  toDOM(t) {
    for (let e = 0, i = 0, n = 0; ; e++) {
      let s = e < this.viewports.length ? this.viewports[e] : null;
      if (!s || t < s.top)
        return n + (t - i) * this.scale;
      if (t <= s.bottom)
        return s.domTop + (t - s.top);
      i = s.bottom, n = s.domBottom;
    }
  }
  fromDOM(t) {
    for (let e = 0, i = 0, n = 0; ; e++) {
      let s = e < this.viewports.length ? this.viewports[e] : null;
      if (!s || t < s.domTop)
        return i + (t - n) / this.scale;
      if (t <= s.domBottom)
        return s.top + (t - s.domTop);
      i = s.bottom, n = s.domBottom;
    }
  }
  eq(t) {
    return t instanceof Fa ? this.scale == t.scale && this.viewports.length == t.viewports.length && this.viewports.every((e, i) => e.from == t.viewports[i].from && e.to == t.viewports[i].to) : !1;
  }
}
function mr(r, t) {
  if (t.scale == 1)
    return r;
  let e = t.toDOM(r.top), i = t.toDOM(r.bottom);
  return new Ke(r.from, r.length, e, i - e, Array.isArray(r._content) ? r._content.map((n) => mr(n, t)) : r._content);
}
const Bo = /* @__PURE__ */ Z.define({ combine: (r) => r.join(" ") }), ma = /* @__PURE__ */ Z.define({ combine: (r) => r.indexOf(!0) > -1 }), ya = /* @__PURE__ */ mi.newName(), If = /* @__PURE__ */ mi.newName(), Pf = /* @__PURE__ */ mi.newName(), Lf = { "&light": "." + If, "&dark": "." + Pf };
function ba(r, t, e) {
  return new mi(t, {
    finish(i) {
      return /&/.test(i) ? i.replace(/&\w*/, (n) => {
        if (n == "&")
          return r;
        if (!e || !e[n])
          throw new RangeError(`Unsupported selector: ${n}`);
        return e[n];
      }) : r + " " + i;
    }
  });
}
const Cg = /* @__PURE__ */ ba("." + ya, {
  "&": {
    position: "relative !important",
    boxSizing: "border-box",
    "&.cm-focused": {
      // Provide a simple default outline to make sure a focused
      // editor is visually distinct. Can't leave the default behavior
      // because that will apply to the content element, which is
      // inside the scrollable container and doesn't include the
      // gutters. We also can't use an 'auto' outline, since those
      // are, for some reason, drawn behind the element content, which
      // will cause things like the active line background to cover
      // the outline (#297).
      outline: "1px dotted #212121"
    },
    display: "flex !important",
    flexDirection: "column"
  },
  ".cm-scroller": {
    display: "flex !important",
    alignItems: "flex-start !important",
    fontFamily: "monospace",
    lineHeight: 1.4,
    height: "100%",
    overflowX: "auto",
    position: "relative",
    zIndex: 0,
    overflowAnchor: "none"
  },
  ".cm-content": {
    margin: 0,
    flexGrow: 2,
    flexShrink: 0,
    display: "block",
    whiteSpace: "pre",
    wordWrap: "normal",
    // https://github.com/codemirror/dev/issues/456
    boxSizing: "border-box",
    minHeight: "100%",
    padding: "4px 0",
    outline: "none",
    "&[contenteditable=true]": {
      WebkitUserModify: "read-write-plaintext-only"
    }
  },
  ".cm-lineWrapping": {
    whiteSpace_fallback: "pre-wrap",
    // For IE
    whiteSpace: "break-spaces",
    wordBreak: "break-word",
    // For Safari, which doesn't support overflow-wrap: anywhere
    overflowWrap: "anywhere",
    flexShrink: 1
  },
  "&light .cm-content": { caretColor: "black" },
  "&dark .cm-content": { caretColor: "white" },
  ".cm-line": {
    display: "block",
    padding: "0 2px 0 6px"
  },
  ".cm-layer": {
    position: "absolute",
    left: 0,
    top: 0,
    contain: "size style",
    "& > *": {
      position: "absolute"
    }
  },
  "&light .cm-selectionBackground": {
    background: "#d9d9d9"
  },
  "&dark .cm-selectionBackground": {
    background: "#222"
  },
  "&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
    background: "#d7d4f0"
  },
  "&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
    background: "#233"
  },
  ".cm-cursorLayer": {
    pointerEvents: "none"
  },
  "&.cm-focused > .cm-scroller > .cm-cursorLayer": {
    animation: "steps(1) cm-blink 1.2s infinite"
  },
  // Two animations defined so that we can switch between them to
  // restart the animation without forcing another style
  // recomputation.
  "@keyframes cm-blink": { "0%": {}, "50%": { opacity: 0 }, "100%": {} },
  "@keyframes cm-blink2": { "0%": {}, "50%": { opacity: 0 }, "100%": {} },
  ".cm-cursor, .cm-dropCursor": {
    borderLeft: "1.2px solid black",
    marginLeft: "-0.6px",
    pointerEvents: "none"
  },
  ".cm-cursor": {
    display: "none"
  },
  "&dark .cm-cursor": {
    borderLeftColor: "#ddd"
  },
  ".cm-dropCursor": {
    position: "absolute"
  },
  "&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor": {
    display: "block"
  },
  ".cm-iso": {
    unicodeBidi: "isolate"
  },
  ".cm-announced": {
    position: "fixed",
    top: "-10000px"
  },
  "@media print": {
    ".cm-announced": { display: "none" }
  },
  "&light .cm-activeLine": { backgroundColor: "#cceeff44" },
  "&dark .cm-activeLine": { backgroundColor: "#99eeff33" },
  "&light .cm-specialChar": { color: "red" },
  "&dark .cm-specialChar": { color: "#f78" },
  ".cm-gutters": {
    flexShrink: 0,
    display: "flex",
    height: "100%",
    boxSizing: "border-box",
    insetInlineStart: 0,
    zIndex: 200
  },
  "&light .cm-gutters": {
    backgroundColor: "#f5f5f5",
    color: "#6c6c6c",
    borderRight: "1px solid #ddd"
  },
  "&dark .cm-gutters": {
    backgroundColor: "#333338",
    color: "#ccc"
  },
  ".cm-gutter": {
    display: "flex !important",
    // Necessary -- prevents margin collapsing
    flexDirection: "column",
    flexShrink: 0,
    boxSizing: "border-box",
    minHeight: "100%",
    overflow: "hidden"
  },
  ".cm-gutterElement": {
    boxSizing: "border-box"
  },
  ".cm-lineNumbers .cm-gutterElement": {
    padding: "0 3px 0 5px",
    minWidth: "20px",
    textAlign: "right",
    whiteSpace: "nowrap"
  },
  "&light .cm-activeLineGutter": {
    backgroundColor: "#e2f2ff"
  },
  "&dark .cm-activeLineGutter": {
    backgroundColor: "#222227"
  },
  ".cm-panels": {
    boxSizing: "border-box",
    position: "sticky",
    left: 0,
    right: 0,
    zIndex: 300
  },
  "&light .cm-panels": {
    backgroundColor: "#f5f5f5",
    color: "black"
  },
  "&light .cm-panels-top": {
    borderBottom: "1px solid #ddd"
  },
  "&light .cm-panels-bottom": {
    borderTop: "1px solid #ddd"
  },
  "&dark .cm-panels": {
    backgroundColor: "#333338",
    color: "white"
  },
  ".cm-tab": {
    display: "inline-block",
    overflow: "hidden",
    verticalAlign: "bottom"
  },
  ".cm-widgetBuffer": {
    verticalAlign: "text-top",
    height: "1em",
    width: 0,
    display: "inline"
  },
  ".cm-placeholder": {
    color: "#888",
    display: "inline-block",
    verticalAlign: "top"
  },
  ".cm-highlightSpace": {
    backgroundImage: "radial-gradient(circle at 50% 55%, #aaa 20%, transparent 5%)",
    backgroundPosition: "center"
  },
  ".cm-highlightTab": {
    backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,
    backgroundSize: "auto 100%",
    backgroundPosition: "right 90%",
    backgroundRepeat: "no-repeat"
  },
  ".cm-trailingSpace": {
    backgroundColor: "#ff332255"
  },
  ".cm-button": {
    verticalAlign: "middle",
    color: "inherit",
    fontSize: "70%",
    padding: ".2em 1em",
    borderRadius: "1px"
  },
  "&light .cm-button": {
    backgroundImage: "linear-gradient(#eff1f5, #d9d9df)",
    border: "1px solid #888",
    "&:active": {
      backgroundImage: "linear-gradient(#b4b4b4, #d0d3d6)"
    }
  },
  "&dark .cm-button": {
    backgroundImage: "linear-gradient(#393939, #111)",
    border: "1px solid #888",
    "&:active": {
      backgroundImage: "linear-gradient(#111, #333)"
    }
  },
  ".cm-textfield": {
    verticalAlign: "middle",
    color: "inherit",
    fontSize: "70%",
    border: "1px solid silver",
    padding: ".2em .5em"
  },
  "&light .cm-textfield": {
    backgroundColor: "white"
  },
  "&dark .cm-textfield": {
    border: "1px solid #555",
    backgroundColor: "inherit"
  }
}, Lf), Eg = {
  childList: !0,
  characterData: !0,
  subtree: !0,
  attributes: !0,
  characterDataOldValue: !0
}, Il = H.ie && H.ie_version <= 11;
class Mg {
  constructor(t) {
    this.view = t, this.active = !1, this.editContext = null, this.selectionRange = new ad(), this.selectionChanged = !1, this.delayedFlush = -1, this.resizeTimeout = -1, this.queue = [], this.delayedAndroidKey = null, this.flushingAndroidKey = -1, this.lastChange = 0, this.scrollTargets = [], this.intersection = null, this.resizeScroll = null, this.intersecting = !1, this.gapIntersection = null, this.gaps = [], this.printQuery = null, this.parentCheck = -1, this.dom = t.contentDOM, this.observer = new MutationObserver((e) => {
      for (let i of e)
        this.queue.push(i);
      (H.ie && H.ie_version <= 11 || H.ios && t.composing) && e.some((i) => i.type == "childList" && i.removedNodes.length || i.type == "characterData" && i.oldValue.length > i.target.nodeValue.length) ? this.flushSoon() : this.flush();
    }), window.EditContext && t.constructor.EDIT_CONTEXT !== !1 && // Chrome <126 doesn't support inverted selections in edit context (#1392)
    !(H.chrome && H.chrome_version < 126) && (this.editContext = new Tg(t), t.state.facet(ti) && (t.contentDOM.editContext = this.editContext.editContext)), Il && (this.onCharData = (e) => {
      this.queue.push({
        target: e.target,
        type: "characterData",
        oldValue: e.prevValue
      }), this.flushSoon();
    }), this.onSelectionChange = this.onSelectionChange.bind(this), this.onResize = this.onResize.bind(this), this.onPrint = this.onPrint.bind(this), this.onScroll = this.onScroll.bind(this), window.matchMedia && (this.printQuery = window.matchMedia("print")), typeof ResizeObserver == "function" && (this.resizeScroll = new ResizeObserver(() => {
      var e;
      ((e = this.view.docView) === null || e === void 0 ? void 0 : e.lastUpdate) < Date.now() - 75 && this.onResize();
    }), this.resizeScroll.observe(t.scrollDOM)), this.addWindowListeners(this.win = t.win), this.start(), typeof IntersectionObserver == "function" && (this.intersection = new IntersectionObserver((e) => {
      this.parentCheck < 0 && (this.parentCheck = setTimeout(this.listenForScroll.bind(this), 1e3)), e.length > 0 && e[e.length - 1].intersectionRatio > 0 != this.intersecting && (this.intersecting = !this.intersecting, this.intersecting != this.view.inView && this.onScrollChanged(document.createEvent("Event")));
    }, { threshold: [0, 1e-3] }), this.intersection.observe(this.dom), this.gapIntersection = new IntersectionObserver((e) => {
      e.length > 0 && e[e.length - 1].intersectionRatio > 0 && this.onScrollChanged(document.createEvent("Event"));
    }, {})), this.listenForScroll(), this.readSelectionRange();
  }
  onScrollChanged(t) {
    this.view.inputState.runHandlers("scroll", t), this.intersecting && this.view.measure();
  }
  onScroll(t) {
    this.intersecting && this.flush(!1), this.editContext && this.view.requestMeasure(this.editContext.measureReq), this.onScrollChanged(t);
  }
  onResize() {
    this.resizeTimeout < 0 && (this.resizeTimeout = setTimeout(() => {
      this.resizeTimeout = -1, this.view.requestMeasure();
    }, 50));
  }
  onPrint(t) {
    (t.type == "change" || !t.type) && !t.matches || (this.view.viewState.printing = !0, this.view.measure(), setTimeout(() => {
      this.view.viewState.printing = !1, this.view.requestMeasure();
    }, 500));
  }
  updateGaps(t) {
    if (this.gapIntersection && (t.length != this.gaps.length || this.gaps.some((e, i) => e != t[i]))) {
      this.gapIntersection.disconnect();
      for (let e of t)
        this.gapIntersection.observe(e);
      this.gaps = t;
    }
  }
  onSelectionChange(t) {
    let e = this.selectionChanged;
    if (!this.readSelectionRange() || this.delayedAndroidKey)
      return;
    let { view: i } = this, n = this.selectionRange;
    if (i.state.facet(ti) ? i.root.activeElement != this.dom : !qo(this.dom, n))
      return;
    let s = n.anchorNode && i.docView.nearest(n.anchorNode);
    if (s && s.ignoreEvent(t)) {
      e || (this.selectionChanged = !1);
      return;
    }
    (H.ie && H.ie_version <= 11 || H.android && H.chrome) && !i.state.selection.main.empty && // (Selection.isCollapsed isn't reliable on IE)
    n.focusNode && Sr(n.focusNode, n.focusOffset, n.anchorNode, n.anchorOffset) ? this.flushSoon() : this.flush(!1);
  }
  readSelectionRange() {
    let { view: t } = this, e = Or(t.root);
    if (!e)
      return !1;
    let i = H.safari && t.root.nodeType == 11 && t.root.activeElement == this.dom && Og(this.view, e) || e;
    if (!i || this.selectionRange.eq(i))
      return !1;
    let n = qo(this.dom, i);
    return n && !this.selectionChanged && t.inputState.lastFocusTime > Date.now() - 200 && t.inputState.lastTouchTime < Date.now() - 300 && ud(this.dom, i) ? (this.view.inputState.lastFocusTime = 0, t.docView.updateSelection(), !1) : (this.selectionRange.setRange(i), n && (this.selectionChanged = !0), !0);
  }
  setSelectionRange(t, e) {
    this.selectionRange.set(t.node, t.offset, e.node, e.offset), this.selectionChanged = !1;
  }
  clearSelectionRange() {
    this.selectionRange.set(null, 0, null, 0);
  }
  listenForScroll() {
    this.parentCheck = -1;
    let t = 0, e = null;
    for (let i = this.dom; i; )
      if (i.nodeType == 1)
        !e && t < this.scrollTargets.length && this.scrollTargets[t] == i ? t++ : e || (e = this.scrollTargets.slice(0, t)), e && e.push(i), i = i.assignedSlot || i.parentNode;
      else if (i.nodeType == 11)
        i = i.host;
      else
        break;
    if (t < this.scrollTargets.length && !e && (e = this.scrollTargets.slice(0, t)), e) {
      for (let i of this.scrollTargets)
        i.removeEventListener("scroll", this.onScroll);
      for (let i of this.scrollTargets = e)
        i.addEventListener("scroll", this.onScroll);
    }
  }
  ignore(t) {
    if (!this.active)
      return t();
    try {
      return this.stop(), t();
    } finally {
      this.start(), this.clear();
    }
  }
  start() {
    this.active || (this.observer.observe(this.dom, Eg), Il && this.dom.addEventListener("DOMCharacterDataModified", this.onCharData), this.active = !0);
  }
  stop() {
    this.active && (this.active = !1, this.observer.disconnect(), Il && this.dom.removeEventListener("DOMCharacterDataModified", this.onCharData));
  }
  // Throw away any pending changes
  clear() {
    this.processRecords(), this.queue.length = 0, this.selectionChanged = !1;
  }
  // Chrome Android, especially in combination with GBoard, not only
  // doesn't reliably fire regular key events, but also often
  // surrounds the effect of enter or backspace with a bunch of
  // composition events that, when interrupted, cause text duplication
  // or other kinds of corruption. This hack makes the editor back off
  // from handling DOM changes for a moment when such a key is
  // detected (via beforeinput or keydown), and then tries to flush
  // them or, if that has no effect, dispatches the given key.
  delayAndroidKey(t, e) {
    var i;
    if (!this.delayedAndroidKey) {
      let n = () => {
        let s = this.delayedAndroidKey;
        s && (this.clearDelayedAndroidKey(), this.view.inputState.lastKeyCode = s.keyCode, this.view.inputState.lastKeyTime = Date.now(), !this.flush() && s.force && Rn(this.dom, s.key, s.keyCode));
      };
      this.flushingAndroidKey = this.view.win.requestAnimationFrame(n);
    }
    (!this.delayedAndroidKey || t == "Enter") && (this.delayedAndroidKey = {
      key: t,
      keyCode: e,
      // Only run the key handler when no changes are detected if
      // this isn't coming right after another change, in which case
      // it is probably part of a weird chain of updates, and should
      // be ignored if it returns the DOM to its previous state.
      force: this.lastChange < Date.now() - 50 || !!(!((i = this.delayedAndroidKey) === null || i === void 0) && i.force)
    });
  }
  clearDelayedAndroidKey() {
    this.win.cancelAnimationFrame(this.flushingAndroidKey), this.delayedAndroidKey = null, this.flushingAndroidKey = -1;
  }
  flushSoon() {
    this.delayedFlush < 0 && (this.delayedFlush = this.view.win.requestAnimationFrame(() => {
      this.delayedFlush = -1, this.flush();
    }));
  }
  forceFlush() {
    this.delayedFlush >= 0 && (this.view.win.cancelAnimationFrame(this.delayedFlush), this.delayedFlush = -1), this.flush();
  }
  pendingRecords() {
    for (let t of this.observer.takeRecords())
      this.queue.push(t);
    return this.queue;
  }
  processRecords() {
    let t = this.pendingRecords();
    t.length && (this.queue = []);
    let e = -1, i = -1, n = !1;
    for (let s of t) {
      let o = this.readMutation(s);
      o && (o.typeOver && (n = !0), e == -1 ? { from: e, to: i } = o : (e = Math.min(o.from, e), i = Math.max(o.to, i)));
    }
    return { from: e, to: i, typeOver: n };
  }
  readChange() {
    let { from: t, to: e, typeOver: i } = this.processRecords(), n = this.selectionChanged && qo(this.dom, this.selectionRange);
    if (t < 0 && !n)
      return null;
    t > -1 && (this.lastChange = Date.now()), this.view.inputState.lastFocusTime = 0, this.selectionChanged = !1;
    let s = new jd(this.view, t, e, i);
    return this.view.docView.domChanged = { newSel: s.newSel ? s.newSel.main : null }, s;
  }
  // Apply pending changes, if any
  flush(t = !0) {
    if (this.delayedFlush >= 0 || this.delayedAndroidKey)
      return !1;
    t && this.readSelectionRange();
    let e = this.readChange();
    if (!e)
      return this.view.requestMeasure(), !1;
    let i = this.view.state, n = kf(this.view, e);
    return this.view.state == i && (e.domChanged || e.newSel && !e.newSel.main.eq(this.view.state.selection.main)) && this.view.update([]), n;
  }
  readMutation(t) {
    let e = this.view.docView.nearest(t.target);
    if (!e || e.ignoreMutation(t))
      return null;
    if (e.markDirty(t.type == "attributes"), t.type == "attributes" && (e.flags |= 4), t.type == "childList") {
      let i = $h(e, t.previousSibling || t.target.previousSibling, -1), n = $h(e, t.nextSibling || t.target.nextSibling, 1);
      return {
        from: i ? e.posAfter(i) : e.posAtStart,
        to: n ? e.posBefore(n) : e.posAtEnd,
        typeOver: !1
      };
    } else return t.type == "characterData" ? { from: e.posAtStart, to: e.posAtEnd, typeOver: t.target.nodeValue == t.oldValue } : null;
  }
  setWindow(t) {
    t != this.win && (this.removeWindowListeners(this.win), this.win = t, this.addWindowListeners(this.win));
  }
  addWindowListeners(t) {
    t.addEventListener("resize", this.onResize), this.printQuery ? this.printQuery.addEventListener ? this.printQuery.addEventListener("change", this.onPrint) : this.printQuery.addListener(this.onPrint) : t.addEventListener("beforeprint", this.onPrint), t.addEventListener("scroll", this.onScroll), t.document.addEventListener("selectionchange", this.onSelectionChange);
  }
  removeWindowListeners(t) {
    t.removeEventListener("scroll", this.onScroll), t.removeEventListener("resize", this.onResize), this.printQuery ? this.printQuery.removeEventListener ? this.printQuery.removeEventListener("change", this.onPrint) : this.printQuery.removeListener(this.onPrint) : t.removeEventListener("beforeprint", this.onPrint), t.document.removeEventListener("selectionchange", this.onSelectionChange);
  }
  update(t) {
    this.editContext && (this.editContext.update(t), t.startState.facet(ti) != t.state.facet(ti) && (t.view.contentDOM.editContext = t.state.facet(ti) ? this.editContext.editContext : null));
  }
  destroy() {
    var t, e, i;
    this.stop(), (t = this.intersection) === null || t === void 0 || t.disconnect(), (e = this.gapIntersection) === null || e === void 0 || e.disconnect(), (i = this.resizeScroll) === null || i === void 0 || i.disconnect();
    for (let n of this.scrollTargets)
      n.removeEventListener("scroll", this.onScroll);
    this.removeWindowListeners(this.win), clearTimeout(this.parentCheck), clearTimeout(this.resizeTimeout), this.win.cancelAnimationFrame(this.delayedFlush), this.win.cancelAnimationFrame(this.flushingAndroidKey), this.editContext && (this.view.contentDOM.editContext = null, this.editContext.destroy());
  }
}
function $h(r, t, e) {
  for (; t; ) {
    let i = At.get(t);
    if (i && i.parent == r)
      return i;
    let n = t.parentNode;
    t = n != r.dom ? n : e > 0 ? t.nextSibling : t.previousSibling;
  }
  return null;
}
function jh(r, t) {
  let e = t.startContainer, i = t.startOffset, n = t.endContainer, s = t.endOffset, o = r.docView.domAtPos(r.state.selection.main.anchor);
  return Sr(o.node, o.offset, n, s) && ([e, i, n, s] = [n, s, e, i]), { anchorNode: e, anchorOffset: i, focusNode: n, focusOffset: s };
}
function Og(r, t) {
  if (t.getComposedRanges) {
    let n = t.getComposedRanges(r.root)[0];
    if (n)
      return jh(r, n);
  }
  let e = null;
  function i(n) {
    n.preventDefault(), n.stopImmediatePropagation(), e = n.getTargetRanges()[0];
  }
  return r.contentDOM.addEventListener("beforeinput", i, !0), r.dom.ownerDocument.execCommand("indent"), r.contentDOM.removeEventListener("beforeinput", i, !0), e ? jh(r, e) : null;
}
class Tg {
  constructor(t) {
    this.from = 0, this.to = 0, this.pendingContextChange = null, this.handlers = /* @__PURE__ */ Object.create(null), this.composing = null, this.resetRange(t.state);
    let e = this.editContext = new window.EditContext({
      text: t.state.doc.sliceString(this.from, this.to),
      selectionStart: this.toContextPos(Math.max(this.from, Math.min(this.to, t.state.selection.main.anchor))),
      selectionEnd: this.toContextPos(t.state.selection.main.head)
    });
    this.handlers.textupdate = (i) => {
      let { anchor: n } = t.state.selection.main, s = this.toEditorPos(i.updateRangeStart), o = this.toEditorPos(i.updateRangeEnd);
      t.inputState.composing >= 0 && !this.composing && (this.composing = { contextBase: i.updateRangeStart, editorBase: s, drifted: !1 });
      let a = { from: s, to: o, insert: pt.of(i.text.split(`
`)) };
      if (a.from == this.from && n < this.from ? a.from = n : a.to == this.to && n > this.to && (a.to = n), !(a.from == a.to && !a.insert.length)) {
        if (this.pendingContextChange = a, !t.state.readOnly) {
          let h = this.to - this.from + (a.to - a.from + a.insert.length);
          Pa(t, a, U.single(this.toEditorPos(i.selectionStart, h), this.toEditorPos(i.selectionEnd, h)));
        }
        this.pendingContextChange && (this.revertPending(t.state), this.setSelection(t.state));
      }
    }, this.handlers.characterboundsupdate = (i) => {
      let n = [], s = null;
      for (let o = this.toEditorPos(i.rangeStart), a = this.toEditorPos(i.rangeEnd); o < a; o++) {
        let h = t.coordsForChar(o);
        s = h && new DOMRect(h.left, h.top, h.right - h.left, h.bottom - h.top) || s || new DOMRect(), n.push(s);
      }
      e.updateCharacterBounds(i.rangeStart, n);
    }, this.handlers.textformatupdate = (i) => {
      let n = [];
      for (let s of i.getTextFormats()) {
        let o = s.underlineStyle, a = s.underlineThickness;
        if (o != "None" && a != "None") {
          let h = this.toEditorPos(s.rangeStart), d = this.toEditorPos(s.rangeEnd);
          if (h < d) {
            let c = `text-decoration: underline ${o == "Dashed" ? "dashed " : o == "Squiggle" ? "wavy " : ""}${a == "Thin" ? 1 : 2}px`;
            n.push(Kt.mark({ attributes: { style: c } }).range(h, d));
          }
        }
      }
      t.dispatch({ effects: mf.of(Kt.set(n)) });
    }, this.handlers.compositionstart = () => {
      t.inputState.composing < 0 && (t.inputState.composing = 0, t.inputState.compositionFirstChange = !0);
    }, this.handlers.compositionend = () => {
      if (t.inputState.composing = -1, t.inputState.compositionFirstChange = null, this.composing) {
        let { drifted: i } = this.composing;
        this.composing = null, i && this.reset(t.state);
      }
    };
    for (let i in this.handlers)
      e.addEventListener(i, this.handlers[i]);
    this.measureReq = { read: (i) => {
      this.editContext.updateControlBounds(i.contentDOM.getBoundingClientRect());
      let n = Or(i.root);
      n && n.rangeCount && this.editContext.updateSelectionBounds(n.getRangeAt(0).getBoundingClientRect());
    } };
  }
  applyEdits(t) {
    let e = 0, i = !1, n = this.pendingContextChange;
    return t.changes.iterChanges((s, o, a, h, d) => {
      if (i)
        return;
      let c = d.length - (o - s);
      if (n && o >= n.to)
        if (n.from == s && n.to == o && n.insert.eq(d)) {
          n = this.pendingContextChange = null, e += c, this.to += c;
          return;
        } else
          n = null, this.revertPending(t.state);
      if (s += e, o += e, o <= this.from)
        this.from += c, this.to += c;
      else if (s < this.to) {
        if (s < this.from || o > this.to || this.to - this.from + d.length > 3e4) {
          i = !0;
          return;
        }
        this.editContext.updateText(this.toContextPos(s), this.toContextPos(o), d.toString()), this.to += c;
      }
      e += c;
    }), n && !i && this.revertPending(t.state), !i;
  }
  update(t) {
    let e = this.pendingContextChange;
    this.composing && (this.composing.drifted || t.transactions.some((i) => !i.isUserEvent("input.type") && i.changes.touchesRange(this.from, this.to))) ? (this.composing.drifted = !0, this.composing.editorBase = t.changes.mapPos(this.composing.editorBase)) : !this.applyEdits(t) || !this.rangeIsValid(t.state) ? (this.pendingContextChange = null, this.reset(t.state)) : (t.docChanged || t.selectionSet || e) && this.setSelection(t.state), (t.geometryChanged || t.docChanged || t.selectionSet) && t.view.requestMeasure(this.measureReq);
  }
  resetRange(t) {
    let { head: e } = t.selection.main;
    this.from = Math.max(
      0,
      e - 1e4
      /* CxVp.Margin */
    ), this.to = Math.min(
      t.doc.length,
      e + 1e4
      /* CxVp.Margin */
    );
  }
  reset(t) {
    this.resetRange(t), this.editContext.updateText(0, this.editContext.text.length, t.doc.sliceString(this.from, this.to)), this.setSelection(t);
  }
  revertPending(t) {
    let e = this.pendingContextChange;
    this.pendingContextChange = null, this.editContext.updateText(this.toContextPos(e.from), this.toContextPos(e.from + e.insert.length), t.doc.sliceString(e.from, e.to));
  }
  setSelection(t) {
    let { main: e } = t.selection, i = this.toContextPos(Math.max(this.from, Math.min(this.to, e.anchor))), n = this.toContextPos(e.head);
    (this.editContext.selectionStart != i || this.editContext.selectionEnd != n) && this.editContext.updateSelection(i, n);
  }
  rangeIsValid(t) {
    let { head: e } = t.selection.main;
    return !(this.from > 0 && e - this.from < 500 || this.to < t.doc.length && this.to - e < 500 || this.to - this.from > 1e4 * 3);
  }
  toEditorPos(t, e = this.to - this.from) {
    t = Math.min(t, e);
    let i = this.composing;
    return i && i.drifted ? i.editorBase + (t - i.contextBase) : t + this.from;
  }
  toContextPos(t) {
    let e = this.composing;
    return e && e.drifted ? e.contextBase + (t - e.editorBase) : t - this.from;
  }
  destroy() {
    for (let t in this.handlers)
      this.editContext.removeEventListener(t, this.handlers[t]);
  }
}
class st {
  /**
  The current editor state.
  */
  get state() {
    return this.viewState.state;
  }
  /**
  To be able to display large documents without consuming too much
  memory or overloading the browser, CodeMirror only draws the
  code that is visible (plus a margin around it) to the DOM. This
  property tells you the extent of the current drawn viewport, in
  document positions.
  */
  get viewport() {
    return this.viewState.viewport;
  }
  /**
  When there are, for example, large collapsed ranges in the
  viewport, its size can be a lot bigger than the actual visible
  content. Thus, if you are doing something like styling the
  content in the viewport, it is preferable to only do so for
  these ranges, which are the subset of the viewport that is
  actually drawn.
  */
  get visibleRanges() {
    return this.viewState.visibleRanges;
  }
  /**
  Returns false when the editor is entirely scrolled out of view
  or otherwise hidden.
  */
  get inView() {
    return this.viewState.inView;
  }
  /**
  Indicates whether the user is currently composing text via
  [IME](https://en.wikipedia.org/wiki/Input_method), and at least
  one change has been made in the current composition.
  */
  get composing() {
    return this.inputState.composing > 0;
  }
  /**
  Indicates whether the user is currently in composing state. Note
  that on some platforms, like Android, this will be the case a
  lot, since just putting the cursor on a word starts a
  composition there.
  */
  get compositionStarted() {
    return this.inputState.composing >= 0;
  }
  /**
  The document or shadow root that the view lives in.
  */
  get root() {
    return this._root;
  }
  /**
  @internal
  */
  get win() {
    return this.dom.ownerDocument.defaultView || window;
  }
  /**
  Construct a new view. You'll want to either provide a `parent`
  option, or put `view.dom` into your document after creating a
  view, so that the user can see the editor.
  */
  constructor(t = {}) {
    var e;
    this.plugins = [], this.pluginMap = /* @__PURE__ */ new Map(), this.editorAttrs = {}, this.contentAttrs = {}, this.bidiCache = [], this.destroyed = !1, this.updateState = 2, this.measureScheduled = -1, this.measureRequests = [], this.contentDOM = document.createElement("div"), this.scrollDOM = document.createElement("div"), this.scrollDOM.tabIndex = -1, this.scrollDOM.className = "cm-scroller", this.scrollDOM.appendChild(this.contentDOM), this.announceDOM = document.createElement("div"), this.announceDOM.className = "cm-announced", this.announceDOM.setAttribute("aria-live", "polite"), this.dom = document.createElement("div"), this.dom.appendChild(this.announceDOM), this.dom.appendChild(this.scrollDOM), t.parent && t.parent.appendChild(this.dom);
    let { dispatch: i } = t;
    this.dispatchTransactions = t.dispatchTransactions || i && ((n) => n.forEach((s) => i(s, this))) || ((n) => this.update(n)), this.dispatch = this.dispatch.bind(this), this._root = t.root || hd(t.parent) || document, this.viewState = new zh(t.state || bt.create(t)), t.scrollTo && t.scrollTo.is(Ro) && (this.viewState.scrollTarget = t.scrollTo.value.clip(this.viewState.state)), this.plugins = this.state.facet(dr).map((n) => new xl(n));
    for (let n of this.plugins)
      n.update(this);
    this.observer = new Mg(this), this.inputState = new Jd(this), this.inputState.ensureHandlers(this.plugins), this.docView = new kh(this), this.mountStyles(), this.updateAttrs(), this.updateState = 0, this.requestMeasure(), !((e = document.fonts) === null || e === void 0) && e.ready && document.fonts.ready.then(() => this.requestMeasure());
  }
  dispatch(...t) {
    let e = t.length == 1 && t[0] instanceof ie ? t : t.length == 1 && Array.isArray(t[0]) ? t[0] : [this.state.update(...t)];
    this.dispatchTransactions(e, this);
  }
  /**
  Update the view for the given array of transactions. This will
  update the visible document and selection to match the state
  produced by the transactions, and notify view plugins of the
  change. You should usually call
  [`dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) instead, which uses this
  as a primitive.
  */
  update(t) {
    if (this.updateState != 0)
      throw new Error("Calls to EditorView.update are not allowed while an update is in progress");
    let e = !1, i = !1, n, s = this.state;
    for (let m of t) {
      if (m.startState != s)
        throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");
      s = m.state;
    }
    if (this.destroyed) {
      this.viewState.state = s;
      return;
    }
    let o = this.hasFocus, a = 0, h = null;
    t.some((m) => m.annotation(xf)) ? (this.inputState.notifiedFocused = o, a = 1) : o != this.inputState.notifiedFocused && (this.inputState.notifiedFocused = o, h = Df(s, o), h || (a = 1));
    let d = this.observer.delayedAndroidKey, c = null;
    if (d ? (this.observer.clearDelayedAndroidKey(), c = this.observer.readChange(), (c && !this.state.doc.eq(s.doc) || !this.state.selection.eq(s.selection)) && (c = null)) : this.observer.clear(), s.facet(bt.phrases) != this.state.facet(bt.phrases))
      return this.setState(s);
    n = il.create(this, s, t), n.flags |= a;
    let p = this.viewState.scrollTarget;
    try {
      this.updateState = 2;
      for (let m of t) {
        if (p && (p = p.map(m.changes)), m.scrollIntoView) {
          let { main: b } = m.state.selection;
          p = new Nn(b.empty ? b : U.cursor(b.head, b.head > b.anchor ? -1 : 1));
        }
        for (let b of m.effects)
          b.is(Ro) && (p = b.value.clip(this.state));
      }
      this.viewState.update(n, p), this.bidiCache = rl.update(this.bidiCache, n.changes), n.empty || (this.updatePlugins(n), this.inputState.update(n)), e = this.docView.update(n), this.state.facet(gr) != this.styleModules && this.mountStyles(), i = this.updateAttrs(), this.showAnnouncements(t), this.docView.updateSelection(e, t.some((m) => m.isUserEvent("select.pointer")));
    } finally {
      this.updateState = 0;
    }
    if (n.startState.facet(Bo) != n.state.facet(Bo) && (this.viewState.mustMeasureContent = !0), (e || i || p || this.viewState.mustEnforceCursorAssoc || this.viewState.mustMeasureContent) && this.requestMeasure(), e && this.docViewUpdate(), !n.empty)
      for (let m of this.state.facet(da))
        try {
          m(n);
        } catch (b) {
          ye(this.state, b, "update listener");
        }
    (h || c) && Promise.resolve().then(() => {
      h && this.state == h.startState && this.dispatch(h), c && !kf(this, c) && d.force && Rn(this.contentDOM, d.key, d.keyCode);
    });
  }
  /**
  Reset the view to the given state. (This will cause the entire
  document to be redrawn and all view plugins to be reinitialized,
  so you should probably only use it when the new state isn't
  derived from the old state. Otherwise, use
  [`dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) instead.)
  */
  setState(t) {
    if (this.updateState != 0)
      throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");
    if (this.destroyed) {
      this.viewState.state = t;
      return;
    }
    this.updateState = 2;
    let e = this.hasFocus;
    try {
      for (let i of this.plugins)
        i.destroy(this);
      this.viewState = new zh(t), this.plugins = t.facet(dr).map((i) => new xl(i)), this.pluginMap.clear();
      for (let i of this.plugins)
        i.update(this);
      this.docView.destroy(), this.docView = new kh(this), this.inputState.ensureHandlers(this.plugins), this.mountStyles(), this.updateAttrs(), this.bidiCache = [];
    } finally {
      this.updateState = 0;
    }
    e && this.focus(), this.requestMeasure();
  }
  updatePlugins(t) {
    let e = t.startState.facet(dr), i = t.state.facet(dr);
    if (e != i) {
      let n = [];
      for (let s of i) {
        let o = e.indexOf(s);
        if (o < 0)
          n.push(new xl(s));
        else {
          let a = this.plugins[o];
          a.mustUpdate = t, n.push(a);
        }
      }
      for (let s of this.plugins)
        s.mustUpdate != t && s.destroy(this);
      this.plugins = n, this.pluginMap.clear();
    } else
      for (let n of this.plugins)
        n.mustUpdate = t;
    for (let n = 0; n < this.plugins.length; n++)
      this.plugins[n].update(this);
    e != i && this.inputState.ensureHandlers(this.plugins);
  }
  docViewUpdate() {
    for (let t of this.plugins) {
      let e = t.value;
      if (e && e.docViewUpdate)
        try {
          e.docViewUpdate(this);
        } catch (i) {
          ye(this.state, i, "doc view update listener");
        }
    }
  }
  /**
  @internal
  */
  measure(t = !0) {
    if (this.destroyed)
      return;
    if (this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.observer.delayedAndroidKey) {
      this.measureScheduled = -1, this.requestMeasure();
      return;
    }
    this.measureScheduled = 0, t && this.observer.forceFlush();
    let e = null, i = this.scrollDOM, n = i.scrollTop * this.scaleY, { scrollAnchorPos: s, scrollAnchorHeight: o } = this.viewState;
    Math.abs(n - this.viewState.scrollTop) > 1 && (o = -1), this.viewState.scrollAnchorHeight = -1;
    try {
      for (let a = 0; ; a++) {
        if (o < 0)
          if ($u(i))
            s = -1, o = this.viewState.heightMap.height;
          else {
            let b = this.viewState.scrollAnchorAt(n);
            s = b.from, o = b.top;
          }
        this.updateState = 1;
        let h = this.viewState.measure(this);
        if (!h && !this.measureRequests.length && this.viewState.scrollTarget == null)
          break;
        if (a > 5) {
          console.warn(this.measureRequests.length ? "Measure loop restarted more than 5 times" : "Viewport failed to stabilize");
          break;
        }
        let d = [];
        h & 4 || ([this.measureRequests, d] = [d, this.measureRequests]);
        let c = d.map((b) => {
          try {
            return b.read(this);
          } catch (S) {
            return ye(this.state, S), Kh;
          }
        }), p = il.create(this, this.state, []), m = !1;
        p.flags |= h, e ? e.flags |= h : e = p, this.updateState = 2, p.empty || (this.updatePlugins(p), this.inputState.update(p), this.updateAttrs(), m = this.docView.update(p), m && this.docViewUpdate());
        for (let b = 0; b < d.length; b++)
          if (c[b] != Kh)
            try {
              let S = d[b];
              S.write && S.write(c[b], this);
            } catch (S) {
              ye(this.state, S);
            }
        if (m && this.docView.updateSelection(!0), !p.viewportChanged && this.measureRequests.length == 0) {
          if (this.viewState.editorHeight)
            if (this.viewState.scrollTarget) {
              this.docView.scrollIntoView(this.viewState.scrollTarget), this.viewState.scrollTarget = null, o = -1;
              continue;
            } else {
              let S = (s < 0 ? this.viewState.heightMap.height : this.viewState.lineBlockAt(s).top) - o;
              if (S > 1 || S < -1) {
                n = n + S, i.scrollTop = n / this.scaleY, o = -1;
                continue;
              }
            }
          break;
        }
      }
    } finally {
      this.updateState = 0, this.measureScheduled = -1;
    }
    if (e && !e.empty)
      for (let a of this.state.facet(da))
        a(e);
  }
  /**
  Get the CSS classes for the currently active editor themes.
  */
  get themeClasses() {
    return ya + " " + (this.state.facet(ma) ? Pf : If) + " " + this.state.facet(Bo);
  }
  updateAttrs() {
    let t = qh(this, yf, {
      class: "cm-editor" + (this.hasFocus ? " cm-focused " : " ") + this.themeClasses
    }), e = {
      spellcheck: "false",
      autocorrect: "off",
      autocapitalize: "off",
      writingsuggestions: "false",
      translate: "no",
      contenteditable: this.state.facet(ti) ? "true" : "false",
      class: "cm-content",
      style: `${H.tabSize}: ${this.state.tabSize}`,
      role: "textbox",
      "aria-multiline": "true"
    };
    this.state.readOnly && (e["aria-readonly"] = "true"), qh(this, Ra, e);
    let i = this.observer.ignore(() => {
      let n = aa(this.contentDOM, this.contentAttrs, e), s = aa(this.dom, this.editorAttrs, t);
      return n || s;
    });
    return this.editorAttrs = t, this.contentAttrs = e, i;
  }
  showAnnouncements(t) {
    let e = !0;
    for (let i of t)
      for (let n of i.effects)
        if (n.is(st.announce)) {
          e && (this.announceDOM.textContent = ""), e = !1;
          let s = this.announceDOM.appendChild(document.createElement("div"));
          s.textContent = n.value;
        }
  }
  mountStyles() {
    this.styleModules = this.state.facet(gr);
    let t = this.state.facet(st.cspNonce);
    mi.mount(this.root, this.styleModules.concat(Cg).reverse(), t ? { nonce: t } : void 0);
  }
  readMeasured() {
    if (this.updateState == 2)
      throw new Error("Reading the editor layout isn't allowed during an update");
    this.updateState == 0 && this.measureScheduled > -1 && this.measure(!1);
  }
  /**
  Schedule a layout measurement, optionally providing callbacks to
  do custom DOM measuring followed by a DOM write phase. Using
  this is preferable reading DOM layout directly from, for
  example, an event handler, because it'll make sure measuring and
  drawing done by other components is synchronized, avoiding
  unnecessary DOM layout computations.
  */
  requestMeasure(t) {
    if (this.measureScheduled < 0 && (this.measureScheduled = this.win.requestAnimationFrame(() => this.measure())), t) {
      if (this.measureRequests.indexOf(t) > -1)
        return;
      if (t.key != null) {
        for (let e = 0; e < this.measureRequests.length; e++)
          if (this.measureRequests[e].key === t.key) {
            this.measureRequests[e] = t;
            return;
          }
      }
      this.measureRequests.push(t);
    }
  }
  /**
  Get the value of a specific plugin, if present. Note that
  plugins that crash can be dropped from a view, so even when you
  know you registered a given plugin, it is recommended to check
  the return value of this method.
  */
  plugin(t) {
    let e = this.pluginMap.get(t);
    return (e === void 0 || e && e.spec != t) && this.pluginMap.set(t, e = this.plugins.find((i) => i.spec == t) || null), e && e.update(this).value;
  }
  /**
  The top position of the document, in screen coordinates. This
  may be negative when the editor is scrolled down. Points
  directly to the top of the first line, not above the padding.
  */
  get documentTop() {
    return this.contentDOM.getBoundingClientRect().top + this.viewState.paddingTop;
  }
  /**
  Reports the padding above and below the document.
  */
  get documentPadding() {
    return { top: this.viewState.paddingTop, bottom: this.viewState.paddingBottom };
  }
  /**
  If the editor is transformed with CSS, this provides the scale
  along the X axis. Otherwise, it will just be 1. Note that
  transforms other than translation and scaling are not supported.
  */
  get scaleX() {
    return this.viewState.scaleX;
  }
  /**
  Provide the CSS transformed scale along the Y axis.
  */
  get scaleY() {
    return this.viewState.scaleY;
  }
  /**
  Find the text line or block widget at the given vertical
  position (which is interpreted as relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop)).
  */
  elementAtHeight(t) {
    return this.readMeasured(), this.viewState.elementAtHeight(t);
  }
  /**
  Find the line block (see
  [`lineBlockAt`](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt) at the given
  height, again interpreted relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop).
  */
  lineBlockAtHeight(t) {
    return this.readMeasured(), this.viewState.lineBlockAtHeight(t);
  }
  /**
  Get the extent and vertical position of all [line
  blocks](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt) in the viewport. Positions
  are relative to the [top of the
  document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop);
  */
  get viewportLineBlocks() {
    return this.viewState.viewportLines;
  }
  /**
  Find the line block around the given document position. A line
  block is a range delimited on both sides by either a
  non-[hidden](https://codemirror.net/6/docs/ref/#view.Decoration^replace) line break, or the
  start/end of the document. It will usually just hold a line of
  text, but may be broken into multiple textblocks by block
  widgets.
  */
  lineBlockAt(t) {
    return this.viewState.lineBlockAt(t);
  }
  /**
  The editor's total content height.
  */
  get contentHeight() {
    return this.viewState.contentHeight;
  }
  /**
  Move a cursor position by [grapheme
  cluster](https://codemirror.net/6/docs/ref/#state.findClusterBreak). `forward` determines whether
  the motion is away from the line start, or towards it. In
  bidirectional text, the line is traversed in visual order, using
  the editor's [text direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection).
  When the start position was the last one on the line, the
  returned position will be across the line break. If there is no
  further line, the original position is returned.
  
  By default, this method moves over a single cluster. The
  optional `by` argument can be used to move across more. It will
  be called with the first cluster as argument, and should return
  a predicate that determines, for each subsequent cluster,
  whether it should also be moved over.
  */
  moveByChar(t, e, i) {
    return Rl(this, t, Th(this, t, e, i));
  }
  /**
  Move a cursor position across the next group of either
  [letters](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) or non-letter
  non-whitespace characters.
  */
  moveByGroup(t, e) {
    return Rl(this, t, Th(this, t, e, (i) => Ud(this, t.head, i)));
  }
  /**
  Get the cursor position visually at the start or end of a line.
  Note that this may differ from the _logical_ position at its
  start or end (which is simply at `line.from`/`line.to`) if text
  at the start or end goes against the line's base text direction.
  */
  visualLineSide(t, e) {
    let i = this.bidiSpans(t), n = this.textDirectionAt(t.from), s = i[e ? i.length - 1 : 0];
    return U.cursor(s.side(e, n) + t.from, s.forward(!e, n) ? 1 : -1);
  }
  /**
  Move to the next line boundary in the given direction. If
  `includeWrap` is true, line wrapping is on, and there is a
  further wrap point on the current line, the wrap point will be
  returned. Otherwise this function will return the start or end
  of the line.
  */
  moveToLineBoundary(t, e, i = !0) {
    return Wd(this, t, e, i);
  }
  /**
  Move a cursor position vertically. When `distance` isn't given,
  it defaults to moving to the next line (including wrapped
  lines). Otherwise, `distance` should provide a positive distance
  in pixels.
  
  When `start` has a
  [`goalColumn`](https://codemirror.net/6/docs/ref/#state.SelectionRange.goalColumn), the vertical
  motion will use that as a target horizontal position. Otherwise,
  the cursor's own horizontal position is used. The returned
  cursor will have its goal column set to whichever column was
  used.
  */
  moveVertically(t, e, i) {
    return Rl(this, t, zd(this, t, e, i));
  }
  /**
  Find the DOM parent node and offset (child offset if `node` is
  an element, character offset when it is a text node) at the
  given document position.
  
  Note that for positions that aren't currently in
  `visibleRanges`, the resulting DOM position isn't necessarily
  meaningful (it may just point before or after a placeholder
  element).
  */
  domAtPos(t) {
    return this.docView.domAtPos(t);
  }
  /**
  Find the document position at the given DOM node. Can be useful
  for associating positions with DOM events. Will raise an error
  when `node` isn't part of the editor content.
  */
  posAtDOM(t, e = 0) {
    return this.docView.posFromDOM(t, e);
  }
  posAtCoords(t, e = !0) {
    return this.readMeasured(), Af(this, t, e);
  }
  /**
  Get the screen coordinates at the given document position.
  `side` determines whether the coordinates are based on the
  element before (-1) or after (1) the position (if no element is
  available on the given side, the method will transparently use
  another strategy to get reasonable coordinates).
  */
  coordsAtPos(t, e = 1) {
    this.readMeasured();
    let i = this.docView.coordsAt(t, e);
    if (!i || i.left == i.right)
      return i;
    let n = this.state.doc.lineAt(t), s = this.bidiSpans(n), o = s[gi.find(s, t - n.from, -1, e)];
    return dl(i, o.dir == Wt.LTR == e > 0);
  }
  /**
  Return the rectangle around a given character. If `pos` does not
  point in front of a character that is in the viewport and
  rendered (i.e. not replaced, not a line break), this will return
  null. For space characters that are a line wrap point, this will
  return the position before the line break.
  */
  coordsForChar(t) {
    return this.readMeasured(), this.docView.coordsForChar(t);
  }
  /**
  The default width of a character in the editor. May not
  accurately reflect the width of all characters (given variable
  width fonts or styling of invididual ranges).
  */
  get defaultCharacterWidth() {
    return this.viewState.heightOracle.charWidth;
  }
  /**
  The default height of a line in the editor. May not be accurate
  for all lines.
  */
  get defaultLineHeight() {
    return this.viewState.heightOracle.lineHeight;
  }
  /**
  The text direction
  ([`direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/direction)
  CSS property) of the editor's content element.
  */
  get textDirection() {
    return this.viewState.defaultTextDirection;
  }
  /**
  Find the text direction of the block at the given position, as
  assigned by CSS. If
  [`perLineTextDirection`](https://codemirror.net/6/docs/ref/#view.EditorView^perLineTextDirection)
  isn't enabled, or the given position is outside of the viewport,
  this will always return the same as
  [`textDirection`](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection). Note that
  this may trigger a DOM layout.
  */
  textDirectionAt(t) {
    return !this.state.facet(gf) || t < this.viewport.from || t > this.viewport.to ? this.textDirection : (this.readMeasured(), this.docView.textDirectionAt(t));
  }
  /**
  Whether this editor [wraps lines](https://codemirror.net/6/docs/ref/#view.EditorView.lineWrapping)
  (as determined by the
  [`white-space`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
  CSS property of its content element).
  */
  get lineWrapping() {
    return this.viewState.heightOracle.lineWrapping;
  }
  /**
  Returns the bidirectional text structure of the given line
  (which should be in the current document) as an array of span
  objects. The order of these spans matches the [text
  direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection)—if that is
  left-to-right, the leftmost spans come first, otherwise the
  rightmost spans come first.
  */
  bidiSpans(t) {
    if (t.length > xg)
      return of(t.length);
    let e = this.textDirectionAt(t.from), i;
    for (let s of this.bidiCache)
      if (s.from == t.from && s.dir == e && (s.fresh || sf(s.isolates, i = Ah(this, t))))
        return s.order;
    i || (i = Ah(this, t));
    let n = Ad(t.text, e, i);
    return this.bidiCache.push(new rl(t.from, t.to, e, i, !0, n)), n;
  }
  /**
  Check whether the editor has focus.
  */
  get hasFocus() {
    var t;
    return (this.dom.ownerDocument.hasFocus() || H.safari && ((t = this.inputState) === null || t === void 0 ? void 0 : t.lastContextMenu) > Date.now() - 3e4) && this.root.activeElement == this.contentDOM;
  }
  /**
  Put focus on the editor.
  */
  focus() {
    this.observer.ignore(() => {
      zu(this.contentDOM), this.docView.updateSelection();
    });
  }
  /**
  Update the [root](https://codemirror.net/6/docs/ref/##view.EditorViewConfig.root) in which the editor lives. This is only
  necessary when moving the editor's existing DOM to a new window or shadow root.
  */
  setRoot(t) {
    this._root != t && (this._root = t, this.observer.setWindow((t.nodeType == 9 ? t : t.ownerDocument).defaultView || window), this.mountStyles());
  }
  /**
  Clean up this editor view, removing its element from the
  document, unregistering event handlers, and notifying
  plugins. The view instance can no longer be used after
  calling this.
  */
  destroy() {
    this.root.activeElement == this.contentDOM && this.contentDOM.blur();
    for (let t of this.plugins)
      t.destroy(this);
    this.plugins = [], this.inputState.destroy(), this.docView.destroy(), this.dom.remove(), this.observer.destroy(), this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.destroyed = !0;
  }
  /**
  Returns an effect that can be
  [added](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) to a transaction to
  cause it to scroll the given position or range into view.
  */
  static scrollIntoView(t, e = {}) {
    return Ro.of(new Nn(typeof t == "number" ? U.cursor(t) : t, e.y, e.x, e.yMargin, e.xMargin));
  }
  /**
  Return an effect that resets the editor to its current (at the
  time this method was called) scroll position. Note that this
  only affects the editor's own scrollable element, not parents.
  See also
  [`EditorViewConfig.scrollTo`](https://codemirror.net/6/docs/ref/#view.EditorViewConfig.scrollTo).
  
  The effect should be used with a document identical to the one
  it was created for. Failing to do so is not an error, but may
  not scroll to the expected position. You can
  [map](https://codemirror.net/6/docs/ref/#state.StateEffect.map) the effect to account for changes.
  */
  scrollSnapshot() {
    let { scrollTop: t, scrollLeft: e } = this.scrollDOM, i = this.viewState.scrollAnchorAt(t);
    return Ro.of(new Nn(U.cursor(i.from), "start", "start", i.top - t, e, !0));
  }
  /**
  Enable or disable tab-focus mode, which disables key bindings
  for Tab and Shift-Tab, letting the browser's default
  focus-changing behavior go through instead. This is useful to
  prevent trapping keyboard users in your editor.
  
  Without argument, this toggles the mode. With a boolean, it
  enables (true) or disables it (false). Given a number, it
  temporarily enables the mode until that number of milliseconds
  have passed or another non-Tab key is pressed.
  */
  setTabFocusMode(t) {
    t == null ? this.inputState.tabFocusMode = this.inputState.tabFocusMode < 0 ? 0 : -1 : typeof t == "boolean" ? this.inputState.tabFocusMode = t ? 0 : -1 : this.inputState.tabFocusMode != 0 && (this.inputState.tabFocusMode = Date.now() + t);
  }
  /**
  Returns an extension that can be used to add DOM event handlers.
  The value should be an object mapping event names to handler
  functions. For any given event, such functions are ordered by
  extension precedence, and the first handler to return true will
  be assumed to have handled that event, and no other handlers or
  built-in behavior will be activated for it. These are registered
  on the [content element](https://codemirror.net/6/docs/ref/#view.EditorView.contentDOM), except
  for `scroll` handlers, which will be called any time the
  editor's [scroll element](https://codemirror.net/6/docs/ref/#view.EditorView.scrollDOM) or one of
  its parent nodes is scrolled.
  */
  static domEventHandlers(t) {
    return ri.define(() => ({}), { eventHandlers: t });
  }
  /**
  Create an extension that registers DOM event observers. Contrary
  to event [handlers](https://codemirror.net/6/docs/ref/#view.EditorView^domEventHandlers),
  observers can't be prevented from running by a higher-precedence
  handler returning true. They also don't prevent other handlers
  and observers from running when they return true, and should not
  call `preventDefault`.
  */
  static domEventObservers(t) {
    return ri.define(() => ({}), { eventObservers: t });
  }
  /**
  Create a theme extension. The first argument can be a
  [`style-mod`](https://github.com/marijnh/style-mod#documentation)
  style spec providing the styles for the theme. These will be
  prefixed with a generated class for the style.
  
  Because the selectors will be prefixed with a scope class, rule
  that directly match the editor's [wrapper
  element](https://codemirror.net/6/docs/ref/#view.EditorView.dom)—to which the scope class will be
  added—need to be explicitly differentiated by adding an `&` to
  the selector for that element—for example
  `&.cm-focused`.
  
  When `dark` is set to true, the theme will be marked as dark,
  which will cause the `&dark` rules from [base
  themes](https://codemirror.net/6/docs/ref/#view.EditorView^baseTheme) to be used (as opposed to
  `&light` when a light theme is active).
  */
  static theme(t, e) {
    let i = mi.newName(), n = [Bo.of(i), gr.of(ba(`.${i}`, t))];
    return e && e.dark && n.push(ma.of(!0)), n;
  }
  /**
  Create an extension that adds styles to the base theme. Like
  with [`theme`](https://codemirror.net/6/docs/ref/#view.EditorView^theme), use `&` to indicate the
  place of the editor wrapper element when directly targeting
  that. You can also use `&dark` or `&light` instead to only
  target editors with a dark or light theme.
  */
  static baseTheme(t) {
    return fl.lowest(gr.of(ba("." + ya, t, Lf)));
  }
  /**
  Retrieve an editor view instance from the view's DOM
  representation.
  */
  static findFromDOM(t) {
    var e;
    let i = t.querySelector(".cm-content"), n = i && At.get(i) || At.get(t);
    return ((e = n == null ? void 0 : n.rootView) === null || e === void 0 ? void 0 : e.view) || null;
  }
}
st.styleModule = gr;
st.inputHandler = cf;
st.clipboardInputFilter = xa;
st.clipboardOutputFilter = Da;
st.scrollHandler = pf;
st.focusChangeEffect = df;
st.perLineTextDirection = gf;
st.exceptionSink = ff;
st.updateListener = da;
st.editable = ti;
st.mouseSelectionStyle = uf;
st.dragMovesSelection = hf;
st.clickAddsSelectionRange = af;
st.decorations = xr;
st.outerDecorations = bf;
st.atomicRanges = Na;
st.bidiIsolatedRanges = vf;
st.scrollMargins = wf;
st.darkTheme = ma;
st.cspNonce = /* @__PURE__ */ Z.define({ combine: (r) => r.length ? r[0] : "" });
st.contentAttributes = Ra;
st.editorAttributes = yf;
st.lineWrapping = /* @__PURE__ */ st.contentAttributes.of({ class: "cm-lineWrapping" });
st.announce = /* @__PURE__ */ Rt.define();
const xg = 4096, Kh = {};
class rl {
  constructor(t, e, i, n, s, o) {
    this.from = t, this.to = e, this.dir = i, this.isolates = n, this.fresh = s, this.order = o;
  }
  static update(t, e) {
    if (e.empty && !t.some((s) => s.fresh))
      return t;
    let i = [], n = t.length ? t[t.length - 1].dir : Wt.LTR;
    for (let s = Math.max(0, t.length - 10); s < t.length; s++) {
      let o = t[s];
      o.dir == n && !e.touchesRange(o.from, o.to) && i.push(new rl(e.mapPos(o.from, 1), e.mapPos(o.to, -1), o.dir, o.isolates, !1, o.order));
    }
    return i;
  }
}
function qh(r, t, e) {
  for (let i = r.state.facet(t), n = i.length - 1; n >= 0; n--) {
    let s = i[n], o = typeof s == "function" ? s(r) : s;
    o && la(o, e);
  }
  return e;
}
const Dg = H.mac ? "mac" : H.windows ? "win" : H.linux ? "linux" : "key";
function Rg(r, t) {
  const e = r.split(/-(?!$)/);
  let i = e[e.length - 1];
  i == "Space" && (i = " ");
  let n, s, o, a;
  for (let h = 0; h < e.length - 1; ++h) {
    const d = e[h];
    if (/^(cmd|meta|m)$/i.test(d))
      a = !0;
    else if (/^a(lt)?$/i.test(d))
      n = !0;
    else if (/^(c|ctrl|control)$/i.test(d))
      s = !0;
    else if (/^s(hift)?$/i.test(d))
      o = !0;
    else if (/^mod$/i.test(d))
      t == "mac" ? a = !0 : s = !0;
    else
      throw new Error("Unrecognized modifier name: " + d);
  }
  return n && (i = "Alt-" + i), s && (i = "Ctrl-" + i), a && (i = "Meta-" + i), o && (i = "Shift-" + i), i;
}
function Vo(r, t, e) {
  return t.altKey && (r = "Alt-" + r), t.ctrlKey && (r = "Ctrl-" + r), t.metaKey && (r = "Meta-" + r), e !== !1 && t.shiftKey && (r = "Shift-" + r), r;
}
const Ng = /* @__PURE__ */ fl.default(/* @__PURE__ */ st.domEventHandlers({
  keydown(r, t) {
    return Fg(Ig(t.state), r, t, "editor");
  }
})), Ff = /* @__PURE__ */ Z.define({ enables: Ng }), Yh = /* @__PURE__ */ new WeakMap();
function Ig(r) {
  let t = r.facet(Ff), e = Yh.get(t);
  return e || Yh.set(t, e = Lg(t.reduce((i, n) => i.concat(n), []))), e;
}
let ci = null;
const Pg = 4e3;
function Lg(r, t = Dg) {
  let e = /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null), n = (o, a) => {
    let h = i[o];
    if (h == null)
      i[o] = a;
    else if (h != a)
      throw new Error("Key binding " + o + " is used both as a regular binding and as a multi-stroke prefix");
  }, s = (o, a, h, d, c) => {
    var p, m;
    let b = e[o] || (e[o] = /* @__PURE__ */ Object.create(null)), S = a.split(/ (?!$)/).map((M) => Rg(M, t));
    for (let M = 1; M < S.length; M++) {
      let R = S.slice(0, M).join(" ");
      n(R, !0), b[R] || (b[R] = {
        preventDefault: !0,
        stopPropagation: !1,
        run: [(I) => {
          let D = ci = { view: I, prefix: R, scope: o };
          return setTimeout(() => {
            ci == D && (ci = null);
          }, Pg), !0;
        }]
      });
    }
    let E = S.join(" ");
    n(E, !1);
    let w = b[E] || (b[E] = {
      preventDefault: !1,
      stopPropagation: !1,
      run: ((m = (p = b._any) === null || p === void 0 ? void 0 : p.run) === null || m === void 0 ? void 0 : m.slice()) || []
    });
    h && w.run.push(h), d && (w.preventDefault = !0), c && (w.stopPropagation = !0);
  };
  for (let o of r) {
    let a = o.scope ? o.scope.split(" ") : ["editor"];
    if (o.any)
      for (let d of a) {
        let c = e[d] || (e[d] = /* @__PURE__ */ Object.create(null));
        c._any || (c._any = { preventDefault: !1, stopPropagation: !1, run: [] });
        let { any: p } = o;
        for (let m in c)
          c[m].run.push((b) => p(b, va));
      }
    let h = o[t] || o.key;
    if (h)
      for (let d of a)
        s(d, h, o.run, o.preventDefault, o.stopPropagation), o.shift && s(d, "Shift-" + h, o.shift, o.preventDefault, o.stopPropagation);
  }
  return e;
}
let va = null;
function Fg(r, t, e, i) {
  va = t;
  let n = rd(t), s = $e(n, 0), o = fi(s) == n.length && n != " ", a = "", h = !1, d = !1, c = !1;
  ci && ci.view == e && ci.scope == i && (a = ci.prefix + " ", Ef.indexOf(t.keyCode) < 0 && (d = !0, ci = null));
  let p = /* @__PURE__ */ new Set(), m = (w) => {
    if (w) {
      for (let M of w.run)
        if (!p.has(M) && (p.add(M), M(e)))
          return w.stopPropagation && (c = !0), !0;
      w.preventDefault && (w.stopPropagation && (c = !0), d = !0);
    }
    return !1;
  }, b = r[i], S, E;
  return b && (m(b[a + Vo(n, t, !o)]) ? h = !0 : o && (t.altKey || t.metaKey || t.ctrlKey) && // Ctrl-Alt may be used for AltGr on Windows
  !(H.windows && t.ctrlKey && t.altKey) && (S = yi[t.keyCode]) && S != n ? (m(b[a + Vo(S, t, !0)]) || t.shiftKey && (E = Mr[t.keyCode]) != n && E != S && m(b[a + Vo(E, t, !1)])) && (h = !0) : o && t.shiftKey && m(b[a + Vo(n, t, !0)]) && (h = !0), !h && m(b._any) && (h = !0)), d && (h = !0), h && c && t.stopPropagation(), va = null, h;
}
const Bg = !(H.ios && H.webkit && H.webkit_version < 534), Gh = {
  ".cm-line": {
    "& ::selection, &::selection": { backgroundColor: "transparent !important" }
  },
  ".cm-content": {
    "& :focus": {
      caretColor: "initial !important",
      "&::selection, & ::selection": {
        backgroundColor: "Highlight !important"
      }
    }
  }
};
Bg && (Gh[".cm-line"].caretColor = Gh[".cm-content"].caretColor = "transparent !important");
function Jh(r, t, e, i, n) {
  t.lastIndex = 0;
  for (let s = r.iterRange(e, i), o = e, a; !s.next().done; o += s.value.length)
    if (!s.lineBreak)
      for (; a = t.exec(s.value); )
        n(o + a.index, a);
}
function Vg(r, t) {
  let e = r.visibleRanges;
  if (e.length == 1 && e[0].from == r.viewport.from && e[0].to == r.viewport.to)
    return e;
  let i = [];
  for (let { from: n, to: s } of e)
    n = Math.max(r.state.doc.lineAt(n).from, n - t), s = Math.min(r.state.doc.lineAt(s).to, s + t), i.length && i[i.length - 1].to >= n ? i[i.length - 1].to = s : i.push({ from: n, to: s });
  return i;
}
class Hg {
  /**
  Create a decorator.
  */
  constructor(t) {
    const { regexp: e, decoration: i, decorate: n, boundary: s, maxLength: o = 1e3 } = t;
    if (!e.global)
      throw new RangeError("The regular expression given to MatchDecorator should have its 'g' flag set");
    if (this.regexp = e, n)
      this.addMatch = (a, h, d, c) => n(c, d, d + a[0].length, a, h);
    else if (typeof i == "function")
      this.addMatch = (a, h, d, c) => {
        let p = i(a, h, d);
        p && c(d, d + a[0].length, p);
      };
    else if (i)
      this.addMatch = (a, h, d, c) => c(d, d + a[0].length, i);
    else
      throw new RangeError("Either 'decorate' or 'decoration' should be provided to MatchDecorator");
    this.boundary = s, this.maxLength = o;
  }
  /**
  Compute the full set of decorations for matches in the given
  view's viewport. You'll want to call this when initializing your
  plugin.
  */
  createDeco(t) {
    let e = new Cr(), i = e.add.bind(e);
    for (let { from: n, to: s } of Vg(t, this.maxLength))
      Jh(t.state.doc, this.regexp, n, s, (o, a) => this.addMatch(a, t, o, i));
    return e.finish();
  }
  /**
  Update a set of decorations for a view update. `deco` _must_ be
  the set of decorations produced by _this_ `MatchDecorator` for
  the view state before the update.
  */
  updateDeco(t, e) {
    let i = 1e9, n = -1;
    return t.docChanged && t.changes.iterChanges((s, o, a, h) => {
      h >= t.view.viewport.from && a <= t.view.viewport.to && (i = Math.min(a, i), n = Math.max(h, n));
    }), t.viewportMoved || n - i > 1e3 ? this.createDeco(t.view) : n > -1 ? this.updateRange(t.view, e.map(t.changes), i, n) : e;
  }
  updateRange(t, e, i, n) {
    for (let s of t.visibleRanges) {
      let o = Math.max(s.from, i), a = Math.min(s.to, n);
      if (a > o) {
        let h = t.state.doc.lineAt(o), d = h.to < a ? t.state.doc.lineAt(a) : h, c = Math.max(s.from, h.from), p = Math.min(s.to, d.to);
        if (this.boundary) {
          for (; o > h.from; o--)
            if (this.boundary.test(h.text[o - 1 - h.from])) {
              c = o;
              break;
            }
          for (; a < d.to; a++)
            if (this.boundary.test(d.text[a - d.from])) {
              p = a;
              break;
            }
        }
        let m = [], b, S = (E, w, M) => m.push(M.range(E, w));
        if (h == d)
          for (this.regexp.lastIndex = c - h.from; (b = this.regexp.exec(h.text)) && b.index < p - h.from; )
            this.addMatch(b, t, b.index + h.from, S);
        else
          Jh(t.state.doc, this.regexp, c, p, (E, w) => this.addMatch(w, t, E, S));
        e = e.update({ filterFrom: c, filterTo: p, filter: (E, w) => E < c || w > p, add: m });
      }
    }
    return e;
  }
}
const ur = "-10000px";
class Wg {
  constructor(t, e, i, n) {
    this.facet = e, this.createTooltipView = i, this.removeTooltipView = n, this.input = t.state.facet(e), this.tooltips = this.input.filter((o) => o);
    let s = null;
    this.tooltipViews = this.tooltips.map((o) => s = i(o, s));
  }
  update(t, e) {
    var i;
    let n = t.state.facet(this.facet), s = n.filter((h) => h);
    if (n === this.input) {
      for (let h of this.tooltipViews)
        h.update && h.update(t);
      return !1;
    }
    let o = [], a = e ? [] : null;
    for (let h = 0; h < s.length; h++) {
      let d = s[h], c = -1;
      if (d) {
        for (let p = 0; p < this.tooltips.length; p++) {
          let m = this.tooltips[p];
          m && m.create == d.create && (c = p);
        }
        if (c < 0)
          o[h] = this.createTooltipView(d, h ? o[h - 1] : null), a && (a[h] = !!d.above);
        else {
          let p = o[h] = this.tooltipViews[c];
          a && (a[h] = e[c]), p.update && p.update(t);
        }
      }
    }
    for (let h of this.tooltipViews)
      o.indexOf(h) < 0 && (this.removeTooltipView(h), (i = h.destroy) === null || i === void 0 || i.call(h));
    return e && (a.forEach((h, d) => e[d] = h), e.length = a.length), this.input = n, this.tooltips = s, this.tooltipViews = o, !0;
  }
}
function Ug(r) {
  let { win: t } = r;
  return { top: 0, left: 0, bottom: t.innerHeight, right: t.innerWidth };
}
const Pl = /* @__PURE__ */ Z.define({
  combine: (r) => {
    var t, e, i;
    return {
      position: H.ios ? "absolute" : ((t = r.find((n) => n.position)) === null || t === void 0 ? void 0 : t.position) || "fixed",
      parent: ((e = r.find((n) => n.parent)) === null || e === void 0 ? void 0 : e.parent) || null,
      tooltipSpace: ((i = r.find((n) => n.tooltipSpace)) === null || i === void 0 ? void 0 : i.tooltipSpace) || Ug
    };
  }
}), Xh = /* @__PURE__ */ new WeakMap(), Bf = /* @__PURE__ */ ri.fromClass(class {
  constructor(r) {
    this.view = r, this.above = [], this.inView = !0, this.madeAbsolute = !1, this.lastTransaction = 0, this.measureTimeout = -1;
    let t = r.state.facet(Pl);
    this.position = t.position, this.parent = t.parent, this.classes = r.themeClasses, this.createContainer(), this.measureReq = { read: this.readMeasure.bind(this), write: this.writeMeasure.bind(this), key: this }, this.resizeObserver = typeof ResizeObserver == "function" ? new ResizeObserver(() => this.measureSoon()) : null, this.manager = new Wg(r, Vf, (e, i) => this.createTooltip(e, i), (e) => {
      this.resizeObserver && this.resizeObserver.unobserve(e.dom), e.dom.remove();
    }), this.above = this.manager.tooltips.map((e) => !!e.above), this.intersectionObserver = typeof IntersectionObserver == "function" ? new IntersectionObserver((e) => {
      Date.now() > this.lastTransaction - 50 && e.length > 0 && e[e.length - 1].intersectionRatio < 1 && this.measureSoon();
    }, { threshold: [1] }) : null, this.observeIntersection(), r.win.addEventListener("resize", this.measureSoon = this.measureSoon.bind(this)), this.maybeMeasure();
  }
  createContainer() {
    this.parent ? (this.container = document.createElement("div"), this.container.style.position = "relative", this.container.className = this.view.themeClasses, this.parent.appendChild(this.container)) : this.container = this.view.dom;
  }
  observeIntersection() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      for (let r of this.manager.tooltipViews)
        this.intersectionObserver.observe(r.dom);
    }
  }
  measureSoon() {
    this.measureTimeout < 0 && (this.measureTimeout = setTimeout(() => {
      this.measureTimeout = -1, this.maybeMeasure();
    }, 50));
  }
  update(r) {
    r.transactions.length && (this.lastTransaction = Date.now());
    let t = this.manager.update(r, this.above);
    t && this.observeIntersection();
    let e = t || r.geometryChanged, i = r.state.facet(Pl);
    if (i.position != this.position && !this.madeAbsolute) {
      this.position = i.position;
      for (let n of this.manager.tooltipViews)
        n.dom.style.position = this.position;
      e = !0;
    }
    if (i.parent != this.parent) {
      this.parent && this.container.remove(), this.parent = i.parent, this.createContainer();
      for (let n of this.manager.tooltipViews)
        this.container.appendChild(n.dom);
      e = !0;
    } else this.parent && this.view.themeClasses != this.classes && (this.classes = this.container.className = this.view.themeClasses);
    e && this.maybeMeasure();
  }
  createTooltip(r, t) {
    let e = r.create(this.view), i = t ? t.dom : null;
    if (e.dom.classList.add("cm-tooltip"), r.arrow && !e.dom.querySelector(".cm-tooltip > .cm-tooltip-arrow")) {
      let n = document.createElement("div");
      n.className = "cm-tooltip-arrow", e.dom.appendChild(n);
    }
    return e.dom.style.position = this.position, e.dom.style.top = ur, e.dom.style.left = "0px", this.container.insertBefore(e.dom, i), e.mount && e.mount(this.view), this.resizeObserver && this.resizeObserver.observe(e.dom), e;
  }
  destroy() {
    var r, t, e;
    this.view.win.removeEventListener("resize", this.measureSoon);
    for (let i of this.manager.tooltipViews)
      i.dom.remove(), (r = i.destroy) === null || r === void 0 || r.call(i);
    this.parent && this.container.remove(), (t = this.resizeObserver) === null || t === void 0 || t.disconnect(), (e = this.intersectionObserver) === null || e === void 0 || e.disconnect(), clearTimeout(this.measureTimeout);
  }
  readMeasure() {
    let r = 1, t = 1, e = !1;
    if (this.position == "fixed" && this.manager.tooltipViews.length) {
      let { dom: s } = this.manager.tooltipViews[0];
      if (H.gecko)
        e = s.offsetParent != this.container.ownerDocument.body;
      else if (s.style.top == ur && s.style.left == "0px") {
        let o = s.getBoundingClientRect();
        e = Math.abs(o.top + 1e4) > 1 || Math.abs(o.left) > 1;
      }
    }
    if (e || this.position == "absolute")
      if (this.parent) {
        let s = this.parent.getBoundingClientRect();
        s.width && s.height && (r = s.width / this.parent.offsetWidth, t = s.height / this.parent.offsetHeight);
      } else
        ({ scaleX: r, scaleY: t } = this.view.viewState);
    let i = this.view.scrollDOM.getBoundingClientRect(), n = Ia(this.view);
    return {
      visible: {
        left: i.left + n.left,
        top: i.top + n.top,
        right: i.right - n.right,
        bottom: i.bottom - n.bottom
      },
      parent: this.parent ? this.container.getBoundingClientRect() : this.view.dom.getBoundingClientRect(),
      pos: this.manager.tooltips.map((s, o) => {
        let a = this.manager.tooltipViews[o];
        return a.getCoords ? a.getCoords(s.pos) : this.view.coordsAtPos(s.pos);
      }),
      size: this.manager.tooltipViews.map(({ dom: s }) => s.getBoundingClientRect()),
      space: this.view.state.facet(Pl).tooltipSpace(this.view),
      scaleX: r,
      scaleY: t,
      makeAbsolute: e
    };
  }
  writeMeasure(r) {
    var t;
    if (r.makeAbsolute) {
      this.madeAbsolute = !0, this.position = "absolute";
      for (let a of this.manager.tooltipViews)
        a.dom.style.position = "absolute";
    }
    let { visible: e, space: i, scaleX: n, scaleY: s } = r, o = [];
    for (let a = 0; a < this.manager.tooltips.length; a++) {
      let h = this.manager.tooltips[a], d = this.manager.tooltipViews[a], { dom: c } = d, p = r.pos[a], m = r.size[a];
      if (!p || h.clip !== !1 && (p.bottom <= Math.max(e.top, i.top) || p.top >= Math.min(e.bottom, i.bottom) || p.right < Math.max(e.left, i.left) - 0.1 || p.left > Math.min(e.right, i.right) + 0.1)) {
        c.style.top = ur;
        continue;
      }
      let b = h.arrow ? d.dom.querySelector(".cm-tooltip-arrow") : null, S = b ? 7 : 0, E = m.right - m.left, w = (t = Xh.get(d)) !== null && t !== void 0 ? t : m.bottom - m.top, M = d.offset || _g, R = this.view.textDirection == Wt.LTR, I = m.width > i.right - i.left ? R ? i.left : i.right - m.width : R ? Math.max(i.left, Math.min(p.left - (b ? 14 : 0) + M.x, i.right - E)) : Math.min(Math.max(i.left, p.left - E + (b ? 14 : 0) - M.x), i.right - E), D = this.above[a];
      !h.strictSide && (D ? p.top - w - S - M.y < i.top : p.bottom + w + S + M.y > i.bottom) && D == i.bottom - p.bottom > p.top - i.top && (D = this.above[a] = !D);
      let N = (D ? p.top - i.top : i.bottom - p.bottom) - S;
      if (N < w && d.resize !== !1) {
        if (N < this.view.defaultLineHeight) {
          c.style.top = ur;
          continue;
        }
        Xh.set(d, w), c.style.height = (w = N) / s + "px";
      } else c.style.height && (c.style.height = "");
      let W = D ? p.top - w - S - M.y : p.bottom + S + M.y, L = I + E;
      if (d.overlap !== !0)
        for (let nt of o)
          nt.left < L && nt.right > I && nt.top < W + w && nt.bottom > W && (W = D ? nt.top - w - 2 - S : nt.bottom + S + 2);
      if (this.position == "absolute" ? (c.style.top = (W - r.parent.top) / s + "px", Qh(c, (I - r.parent.left) / n)) : (c.style.top = W / s + "px", Qh(c, I / n)), b) {
        let nt = p.left + (R ? M.x : -M.x) - (I + 14 - 7);
        b.style.left = nt / n + "px";
      }
      d.overlap !== !0 && o.push({ left: I, top: W, right: L, bottom: W + w }), c.classList.toggle("cm-tooltip-above", D), c.classList.toggle("cm-tooltip-below", !D), d.positioned && d.positioned(r.space);
    }
  }
  maybeMeasure() {
    if (this.manager.tooltips.length && (this.view.inView && this.view.requestMeasure(this.measureReq), this.inView != this.view.inView && (this.inView = this.view.inView, !this.inView)))
      for (let r of this.manager.tooltipViews)
        r.dom.style.top = ur;
  }
}, {
  eventObservers: {
    scroll() {
      this.maybeMeasure();
    }
  }
});
function Qh(r, t) {
  let e = parseInt(r.style.left, 10);
  (isNaN(e) || Math.abs(t - e) > 1) && (r.style.left = t + "px");
}
const zg = /* @__PURE__ */ st.baseTheme({
  ".cm-tooltip": {
    zIndex: 500,
    boxSizing: "border-box"
  },
  "&light .cm-tooltip": {
    border: "1px solid #bbb",
    backgroundColor: "#f5f5f5"
  },
  "&light .cm-tooltip-section:not(:first-child)": {
    borderTop: "1px solid #bbb"
  },
  "&dark .cm-tooltip": {
    backgroundColor: "#333338",
    color: "white"
  },
  ".cm-tooltip-arrow": {
    height: "7px",
    width: `${7 * 2}px`,
    position: "absolute",
    zIndex: -1,
    overflow: "hidden",
    "&:before, &:after": {
      content: "''",
      position: "absolute",
      width: 0,
      height: 0,
      borderLeft: "7px solid transparent",
      borderRight: "7px solid transparent"
    },
    ".cm-tooltip-above &": {
      bottom: "-7px",
      "&:before": {
        borderTop: "7px solid #bbb"
      },
      "&:after": {
        borderTop: "7px solid #f5f5f5",
        bottom: "1px"
      }
    },
    ".cm-tooltip-below &": {
      top: "-7px",
      "&:before": {
        borderBottom: "7px solid #bbb"
      },
      "&:after": {
        borderBottom: "7px solid #f5f5f5",
        top: "1px"
      }
    }
  },
  "&dark .cm-tooltip .cm-tooltip-arrow": {
    "&:before": {
      borderTopColor: "#333338",
      borderBottomColor: "#333338"
    },
    "&:after": {
      borderTopColor: "transparent",
      borderBottomColor: "transparent"
    }
  }
}), _g = { x: 0, y: 0 }, Vf = /* @__PURE__ */ Z.define({
  enables: [Bf, zg]
});
function Hf(r, t) {
  let e = r.plugin(Bf);
  if (!e)
    return null;
  let i = e.manager.tooltips.indexOf(t);
  return i < 0 ? null : e.manager.tooltipViews[i];
}
class Vn extends Fi {
  /**
  @internal
  */
  compare(t) {
    return this == t || this.constructor == t.constructor && this.eq(t);
  }
  /**
  Compare this marker to another marker of the same type.
  */
  eq(t) {
    return !1;
  }
  /**
  Called if the marker has a `toDOM` method and its representation
  was removed from a gutter.
  */
  destroy(t) {
  }
}
Vn.prototype.elementClass = "";
Vn.prototype.toDOM = void 0;
Vn.prototype.mapMode = ge.TrackBefore;
Vn.prototype.startSide = Vn.prototype.endSide = -1;
Vn.prototype.point = !0;
const $g = 1024;
let jg = 0;
class Ll {
  constructor(t, e) {
    this.from = t, this.to = e;
  }
}
class xt {
  /**
  Create a new node prop type.
  */
  constructor(t = {}) {
    this.id = jg++, this.perNode = !!t.perNode, this.deserialize = t.deserialize || (() => {
      throw new Error("This node type doesn't define a deserialize function");
    });
  }
  /**
  This is meant to be used with
  [`NodeSet.extend`](#common.NodeSet.extend) or
  [`LRParser.configure`](#lr.ParserConfig.props) to compute
  prop values for each node type in the set. Takes a [match
  object](#common.NodeType^match) or function that returns undefined
  if the node type doesn't get this prop, and the prop's value if
  it does.
  */
  add(t) {
    if (this.perNode)
      throw new RangeError("Can't add per-node props to node types");
    return typeof t != "function" && (t = xe.match(t)), (e) => {
      let i = t(e);
      return i === void 0 ? null : [this, i];
    };
  }
}
xt.closedBy = new xt({ deserialize: (r) => r.split(" ") });
xt.openedBy = new xt({ deserialize: (r) => r.split(" ") });
xt.group = new xt({ deserialize: (r) => r.split(" ") });
xt.isolate = new xt({ deserialize: (r) => {
  if (r && r != "rtl" && r != "ltr" && r != "auto")
    throw new RangeError("Invalid value for isolate: " + r);
  return r || "auto";
} });
xt.contextHash = new xt({ perNode: !0 });
xt.lookAhead = new xt({ perNode: !0 });
xt.mounted = new xt({ perNode: !0 });
class sl {
  constructor(t, e, i) {
    this.tree = t, this.overlay = e, this.parser = i;
  }
  /**
  @internal
  */
  static get(t) {
    return t && t.props && t.props[xt.mounted.id];
  }
}
const Kg = /* @__PURE__ */ Object.create(null);
class xe {
  /**
  @internal
  */
  constructor(t, e, i, n = 0) {
    this.name = t, this.props = e, this.id = i, this.flags = n;
  }
  /**
  Define a node type.
  */
  static define(t) {
    let e = t.props && t.props.length ? /* @__PURE__ */ Object.create(null) : Kg, i = (t.top ? 1 : 0) | (t.skipped ? 2 : 0) | (t.error ? 4 : 0) | (t.name == null ? 8 : 0), n = new xe(t.name || "", e, t.id, i);
    if (t.props) {
      for (let s of t.props)
        if (Array.isArray(s) || (s = s(n)), s) {
          if (s[0].perNode)
            throw new RangeError("Can't store a per-node prop on a node type");
          e[s[0].id] = s[1];
        }
    }
    return n;
  }
  /**
  Retrieves a node prop for this type. Will return `undefined` if
  the prop isn't present on this node.
  */
  prop(t) {
    return this.props[t.id];
  }
  /**
  True when this is the top node of a grammar.
  */
  get isTop() {
    return (this.flags & 1) > 0;
  }
  /**
  True when this node is produced by a skip rule.
  */
  get isSkipped() {
    return (this.flags & 2) > 0;
  }
  /**
  Indicates whether this is an error node.
  */
  get isError() {
    return (this.flags & 4) > 0;
  }
  /**
  When true, this node type doesn't correspond to a user-declared
  named node, for example because it is used to cache repetition.
  */
  get isAnonymous() {
    return (this.flags & 8) > 0;
  }
  /**
  Returns true when this node's name or one of its
  [groups](#common.NodeProp^group) matches the given string.
  */
  is(t) {
    if (typeof t == "string") {
      if (this.name == t)
        return !0;
      let e = this.prop(xt.group);
      return e ? e.indexOf(t) > -1 : !1;
    }
    return this.id == t;
  }
  /**
  Create a function from node types to arbitrary values by
  specifying an object whose property names are node or
  [group](#common.NodeProp^group) names. Often useful with
  [`NodeProp.add`](#common.NodeProp.add). You can put multiple
  names, separated by spaces, in a single property name to map
  multiple node names to a single value.
  */
  static match(t) {
    let e = /* @__PURE__ */ Object.create(null);
    for (let i in t)
      for (let n of i.split(" "))
        e[n] = t[i];
    return (i) => {
      for (let n = i.prop(xt.group), s = -1; s < (n ? n.length : 0); s++) {
        let o = e[s < 0 ? i.name : n[s]];
        if (o)
          return o;
      }
    };
  }
}
xe.none = new xe(
  "",
  /* @__PURE__ */ Object.create(null),
  0,
  8
  /* NodeFlag.Anonymous */
);
const Ho = /* @__PURE__ */ new WeakMap(), Zh = /* @__PURE__ */ new WeakMap();
var Qt;
(function(r) {
  r[r.ExcludeBuffers = 1] = "ExcludeBuffers", r[r.IncludeAnonymous = 2] = "IncludeAnonymous", r[r.IgnoreMounts = 4] = "IgnoreMounts", r[r.IgnoreOverlays = 8] = "IgnoreOverlays";
})(Qt || (Qt = {}));
class ne {
  /**
  Construct a new tree. See also [`Tree.build`](#common.Tree^build).
  */
  constructor(t, e, i, n, s) {
    if (this.type = t, this.children = e, this.positions = i, this.length = n, this.props = null, s && s.length) {
      this.props = /* @__PURE__ */ Object.create(null);
      for (let [o, a] of s)
        this.props[typeof o == "number" ? o : o.id] = a;
    }
  }
  /**
  @internal
  */
  toString() {
    let t = sl.get(this);
    if (t && !t.overlay)
      return t.tree.toString();
    let e = "";
    for (let i of this.children) {
      let n = i.toString();
      n && (e && (e += ","), e += n);
    }
    return this.type.name ? (/\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) + (e.length ? "(" + e + ")" : "") : e;
  }
  /**
  Get a [tree cursor](#common.TreeCursor) positioned at the top of
  the tree. Mode can be used to [control](#common.IterMode) which
  nodes the cursor visits.
  */
  cursor(t = 0) {
    return new Sa(this.topNode, t);
  }
  /**
  Get a [tree cursor](#common.TreeCursor) pointing into this tree
  at the given position and side (see
  [`moveTo`](#common.TreeCursor.moveTo).
  */
  cursorAt(t, e = 0, i = 0) {
    let n = Ho.get(this) || this.topNode, s = new Sa(n);
    return s.moveTo(t, e), Ho.set(this, s._tree), s;
  }
  /**
  Get a [syntax node](#common.SyntaxNode) object for the top of the
  tree.
  */
  get topNode() {
    return new Oe(this, 0, 0, null);
  }
  /**
  Get the [syntax node](#common.SyntaxNode) at the given position.
  If `side` is -1, this will move into nodes that end at the
  position. If 1, it'll move into nodes that start at the
  position. With 0, it'll only enter nodes that cover the position
  from both sides.
  
  Note that this will not enter
  [overlays](#common.MountedTree.overlay), and you often want
  [`resolveInner`](#common.Tree.resolveInner) instead.
  */
  resolve(t, e = 0) {
    let i = Dr(Ho.get(this) || this.topNode, t, e, !1);
    return Ho.set(this, i), i;
  }
  /**
  Like [`resolve`](#common.Tree.resolve), but will enter
  [overlaid](#common.MountedTree.overlay) nodes, producing a syntax node
  pointing into the innermost overlaid tree at the given position
  (with parent links going through all parent structure, including
  the host trees).
  */
  resolveInner(t, e = 0) {
    let i = Dr(Zh.get(this) || this.topNode, t, e, !0);
    return Zh.set(this, i), i;
  }
  /**
  In some situations, it can be useful to iterate through all
  nodes around a position, including those in overlays that don't
  directly cover the position. This method gives you an iterator
  that will produce all nodes, from small to big, around the given
  position.
  */
  resolveStack(t, e = 0) {
    return Gg(this, t, e);
  }
  /**
  Iterate over the tree and its children, calling `enter` for any
  node that touches the `from`/`to` region (if given) before
  running over such a node's children, and `leave` (if given) when
  leaving the node. When `enter` returns `false`, that node will
  not have its children iterated over (or `leave` called).
  */
  iterate(t) {
    let { enter: e, leave: i, from: n = 0, to: s = this.length } = t, o = t.mode || 0, a = (o & Qt.IncludeAnonymous) > 0;
    for (let h = this.cursor(o | Qt.IncludeAnonymous); ; ) {
      let d = !1;
      if (h.from <= s && h.to >= n && (!a && h.type.isAnonymous || e(h) !== !1)) {
        if (h.firstChild())
          continue;
        d = !0;
      }
      for (; d && i && (a || !h.type.isAnonymous) && i(h), !h.nextSibling(); ) {
        if (!h.parent())
          return;
        d = !0;
      }
    }
  }
  /**
  Get the value of the given [node prop](#common.NodeProp) for this
  node. Works with both per-node and per-type props.
  */
  prop(t) {
    return t.perNode ? this.props ? this.props[t.id] : void 0 : this.type.prop(t);
  }
  /**
  Returns the node's [per-node props](#common.NodeProp.perNode) in a
  format that can be passed to the [`Tree`](#common.Tree)
  constructor.
  */
  get propValues() {
    let t = [];
    if (this.props)
      for (let e in this.props)
        t.push([+e, this.props[e]]);
    return t;
  }
  /**
  Balance the direct children of this tree, producing a copy of
  which may have children grouped into subtrees with type
  [`NodeType.none`](#common.NodeType^none).
  */
  balance(t = {}) {
    return this.children.length <= 8 ? this : Ha(xe.none, this.children, this.positions, 0, this.children.length, 0, this.length, (e, i, n) => new ne(this.type, e, i, n, this.propValues), t.makeTree || ((e, i, n) => new ne(xe.none, e, i, n)));
  }
  /**
  Build a tree from a postfix-ordered buffer of node information,
  or a cursor over such a buffer.
  */
  static build(t) {
    return Jg(t);
  }
}
ne.empty = new ne(xe.none, [], [], 0);
class Ba {
  constructor(t, e) {
    this.buffer = t, this.index = e;
  }
  get id() {
    return this.buffer[this.index - 4];
  }
  get start() {
    return this.buffer[this.index - 3];
  }
  get end() {
    return this.buffer[this.index - 2];
  }
  get size() {
    return this.buffer[this.index - 1];
  }
  get pos() {
    return this.index;
  }
  next() {
    this.index -= 4;
  }
  fork() {
    return new Ba(this.buffer, this.index);
  }
}
class vi {
  /**
  Create a tree buffer.
  */
  constructor(t, e, i) {
    this.buffer = t, this.length = e, this.set = i;
  }
  /**
  @internal
  */
  get type() {
    return xe.none;
  }
  /**
  @internal
  */
  toString() {
    let t = [];
    for (let e = 0; e < this.buffer.length; )
      t.push(this.childString(e)), e = this.buffer[e + 3];
    return t.join(",");
  }
  /**
  @internal
  */
  childString(t) {
    let e = this.buffer[t], i = this.buffer[t + 3], n = this.set.types[e], s = n.name;
    if (/\W/.test(s) && !n.isError && (s = JSON.stringify(s)), t += 4, i == t)
      return s;
    let o = [];
    for (; t < i; )
      o.push(this.childString(t)), t = this.buffer[t + 3];
    return s + "(" + o.join(",") + ")";
  }
  /**
  @internal
  */
  findChild(t, e, i, n, s) {
    let { buffer: o } = this, a = -1;
    for (let h = t; h != e && !(Wf(s, n, o[h + 1], o[h + 2]) && (a = h, i > 0)); h = o[h + 3])
      ;
    return a;
  }
  /**
  @internal
  */
  slice(t, e, i) {
    let n = this.buffer, s = new Uint16Array(e - t), o = 0;
    for (let a = t, h = 0; a < e; ) {
      s[h++] = n[a++], s[h++] = n[a++] - i;
      let d = s[h++] = n[a++] - i;
      s[h++] = n[a++] - t, o = Math.max(o, d);
    }
    return new vi(s, o, this.set);
  }
}
function Wf(r, t, e, i) {
  switch (r) {
    case -2:
      return e < t;
    case -1:
      return i >= t && e < t;
    case 0:
      return e < t && i > t;
    case 1:
      return e <= t && i > t;
    case 2:
      return i > t;
    case 4:
      return !0;
  }
}
function Dr(r, t, e, i) {
  for (var n; r.from == r.to || (e < 1 ? r.from >= t : r.from > t) || (e > -1 ? r.to <= t : r.to < t); ) {
    let o = !i && r instanceof Oe && r.index < 0 ? null : r.parent;
    if (!o)
      return r;
    r = o;
  }
  let s = i ? 0 : Qt.IgnoreOverlays;
  if (i)
    for (let o = r, a = o.parent; a; o = a, a = o.parent)
      o instanceof Oe && o.index < 0 && ((n = a.enter(t, e, s)) === null || n === void 0 ? void 0 : n.from) != o.from && (r = a);
  for (; ; ) {
    let o = r.enter(t, e, s);
    if (!o)
      return r;
    r = o;
  }
}
class Uf {
  cursor(t = 0) {
    return new Sa(this, t);
  }
  getChild(t, e = null, i = null) {
    let n = tu(this, t, e, i);
    return n.length ? n[0] : null;
  }
  getChildren(t, e = null, i = null) {
    return tu(this, t, e, i);
  }
  resolve(t, e = 0) {
    return Dr(this, t, e, !1);
  }
  resolveInner(t, e = 0) {
    return Dr(this, t, e, !0);
  }
  matchContext(t) {
    return wa(this.parent, t);
  }
  enterUnfinishedNodesBefore(t) {
    let e = this.childBefore(t), i = this;
    for (; e; ) {
      let n = e.lastChild;
      if (!n || n.to != e.to)
        break;
      n.type.isError && n.from == n.to ? (i = e, e = n.prevSibling) : e = n;
    }
    return i;
  }
  get node() {
    return this;
  }
  get next() {
    return this.parent;
  }
}
class Oe extends Uf {
  constructor(t, e, i, n) {
    super(), this._tree = t, this.from = e, this.index = i, this._parent = n;
  }
  get type() {
    return this._tree.type;
  }
  get name() {
    return this._tree.type.name;
  }
  get to() {
    return this.from + this._tree.length;
  }
  nextChild(t, e, i, n, s = 0) {
    for (let o = this; ; ) {
      for (let { children: a, positions: h } = o._tree, d = e > 0 ? a.length : -1; t != d; t += e) {
        let c = a[t], p = h[t] + o.from;
        if (Wf(n, i, p, p + c.length)) {
          if (c instanceof vi) {
            if (s & Qt.ExcludeBuffers)
              continue;
            let m = c.findChild(0, c.buffer.length, e, i - p, n);
            if (m > -1)
              return new pi(new qg(o, c, t, p), null, m);
          } else if (s & Qt.IncludeAnonymous || !c.type.isAnonymous || Va(c)) {
            let m;
            if (!(s & Qt.IgnoreMounts) && (m = sl.get(c)) && !m.overlay)
              return new Oe(m.tree, p, t, o);
            let b = new Oe(c, p, t, o);
            return s & Qt.IncludeAnonymous || !b.type.isAnonymous ? b : b.nextChild(e < 0 ? c.children.length - 1 : 0, e, i, n);
          }
        }
      }
      if (s & Qt.IncludeAnonymous || !o.type.isAnonymous || (o.index >= 0 ? t = o.index + e : t = e < 0 ? -1 : o._parent._tree.children.length, o = o._parent, !o))
        return null;
    }
  }
  get firstChild() {
    return this.nextChild(
      0,
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  get lastChild() {
    return this.nextChild(
      this._tree.children.length - 1,
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  childAfter(t) {
    return this.nextChild(
      0,
      1,
      t,
      2
      /* Side.After */
    );
  }
  childBefore(t) {
    return this.nextChild(
      this._tree.children.length - 1,
      -1,
      t,
      -2
      /* Side.Before */
    );
  }
  enter(t, e, i = 0) {
    let n;
    if (!(i & Qt.IgnoreOverlays) && (n = sl.get(this._tree)) && n.overlay) {
      let s = t - this.from;
      for (let { from: o, to: a } of n.overlay)
        if ((e > 0 ? o <= s : o < s) && (e < 0 ? a >= s : a > s))
          return new Oe(n.tree, n.overlay[0].from + this.from, -1, this);
    }
    return this.nextChild(0, 1, t, e, i);
  }
  nextSignificantParent() {
    let t = this;
    for (; t.type.isAnonymous && t._parent; )
      t = t._parent;
    return t;
  }
  get parent() {
    return this._parent ? this._parent.nextSignificantParent() : null;
  }
  get nextSibling() {
    return this._parent && this.index >= 0 ? this._parent.nextChild(
      this.index + 1,
      1,
      0,
      4
      /* Side.DontCare */
    ) : null;
  }
  get prevSibling() {
    return this._parent && this.index >= 0 ? this._parent.nextChild(
      this.index - 1,
      -1,
      0,
      4
      /* Side.DontCare */
    ) : null;
  }
  get tree() {
    return this._tree;
  }
  toTree() {
    return this._tree;
  }
  /**
  @internal
  */
  toString() {
    return this._tree.toString();
  }
}
function tu(r, t, e, i) {
  let n = r.cursor(), s = [];
  if (!n.firstChild())
    return s;
  if (e != null) {
    for (let o = !1; !o; )
      if (o = n.type.is(e), !n.nextSibling())
        return s;
  }
  for (; ; ) {
    if (i != null && n.type.is(i))
      return s;
    if (n.type.is(t) && s.push(n.node), !n.nextSibling())
      return i == null ? s : [];
  }
}
function wa(r, t, e = t.length - 1) {
  for (let i = r; e >= 0; i = i.parent) {
    if (!i)
      return !1;
    if (!i.type.isAnonymous) {
      if (t[e] && t[e] != i.name)
        return !1;
      e--;
    }
  }
  return !0;
}
class qg {
  constructor(t, e, i, n) {
    this.parent = t, this.buffer = e, this.index = i, this.start = n;
  }
}
class pi extends Uf {
  get name() {
    return this.type.name;
  }
  get from() {
    return this.context.start + this.context.buffer.buffer[this.index + 1];
  }
  get to() {
    return this.context.start + this.context.buffer.buffer[this.index + 2];
  }
  constructor(t, e, i) {
    super(), this.context = t, this._parent = e, this.index = i, this.type = t.buffer.set.types[t.buffer.buffer[i]];
  }
  child(t, e, i) {
    let { buffer: n } = this.context, s = n.findChild(this.index + 4, n.buffer[this.index + 3], t, e - this.context.start, i);
    return s < 0 ? null : new pi(this.context, this, s);
  }
  get firstChild() {
    return this.child(
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  get lastChild() {
    return this.child(
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  childAfter(t) {
    return this.child(
      1,
      t,
      2
      /* Side.After */
    );
  }
  childBefore(t) {
    return this.child(
      -1,
      t,
      -2
      /* Side.Before */
    );
  }
  enter(t, e, i = 0) {
    if (i & Qt.ExcludeBuffers)
      return null;
    let { buffer: n } = this.context, s = n.findChild(this.index + 4, n.buffer[this.index + 3], e > 0 ? 1 : -1, t - this.context.start, e);
    return s < 0 ? null : new pi(this.context, this, s);
  }
  get parent() {
    return this._parent || this.context.parent.nextSignificantParent();
  }
  externalSibling(t) {
    return this._parent ? null : this.context.parent.nextChild(
      this.context.index + t,
      t,
      0,
      4
      /* Side.DontCare */
    );
  }
  get nextSibling() {
    let { buffer: t } = this.context, e = t.buffer[this.index + 3];
    return e < (this._parent ? t.buffer[this._parent.index + 3] : t.buffer.length) ? new pi(this.context, this._parent, e) : this.externalSibling(1);
  }
  get prevSibling() {
    let { buffer: t } = this.context, e = this._parent ? this._parent.index + 4 : 0;
    return this.index == e ? this.externalSibling(-1) : new pi(this.context, this._parent, t.findChild(
      e,
      this.index,
      -1,
      0,
      4
      /* Side.DontCare */
    ));
  }
  get tree() {
    return null;
  }
  toTree() {
    let t = [], e = [], { buffer: i } = this.context, n = this.index + 4, s = i.buffer[this.index + 3];
    if (s > n) {
      let o = i.buffer[this.index + 1];
      t.push(i.slice(n, s, o)), e.push(0);
    }
    return new ne(this.type, t, e, this.to - this.from);
  }
  /**
  @internal
  */
  toString() {
    return this.context.buffer.childString(this.index);
  }
}
function zf(r) {
  if (!r.length)
    return null;
  let t = 0, e = r[0];
  for (let s = 1; s < r.length; s++) {
    let o = r[s];
    (o.from > e.from || o.to < e.to) && (e = o, t = s);
  }
  let i = e instanceof Oe && e.index < 0 ? null : e.parent, n = r.slice();
  return i ? n[t] = i : n.splice(t, 1), new Yg(n, e);
}
class Yg {
  constructor(t, e) {
    this.heads = t, this.node = e;
  }
  get next() {
    return zf(this.heads);
  }
}
function Gg(r, t, e) {
  let i = r.resolveInner(t, e), n = null;
  for (let s = i instanceof Oe ? i : i.context.parent; s; s = s.parent)
    if (s.index < 0) {
      let o = s.parent;
      (n || (n = [i])).push(o.resolve(t, e)), s = o;
    } else {
      let o = sl.get(s.tree);
      if (o && o.overlay && o.overlay[0].from <= t && o.overlay[o.overlay.length - 1].to >= t) {
        let a = new Oe(o.tree, o.overlay[0].from + s.from, -1, s);
        (n || (n = [i])).push(Dr(a, t, e, !1));
      }
    }
  return n ? zf(n) : i;
}
class Sa {
  /**
  Shorthand for `.type.name`.
  */
  get name() {
    return this.type.name;
  }
  /**
  @internal
  */
  constructor(t, e = 0) {
    if (this.mode = e, this.buffer = null, this.stack = [], this.index = 0, this.bufferNode = null, t instanceof Oe)
      this.yieldNode(t);
    else {
      this._tree = t.context.parent, this.buffer = t.context;
      for (let i = t._parent; i; i = i._parent)
        this.stack.unshift(i.index);
      this.bufferNode = t, this.yieldBuf(t.index);
    }
  }
  yieldNode(t) {
    return t ? (this._tree = t, this.type = t.type, this.from = t.from, this.to = t.to, !0) : !1;
  }
  yieldBuf(t, e) {
    this.index = t;
    let { start: i, buffer: n } = this.buffer;
    return this.type = e || n.set.types[n.buffer[t]], this.from = i + n.buffer[t + 1], this.to = i + n.buffer[t + 2], !0;
  }
  /**
  @internal
  */
  yield(t) {
    return t ? t instanceof Oe ? (this.buffer = null, this.yieldNode(t)) : (this.buffer = t.context, this.yieldBuf(t.index, t.type)) : !1;
  }
  /**
  @internal
  */
  toString() {
    return this.buffer ? this.buffer.buffer.childString(this.index) : this._tree.toString();
  }
  /**
  @internal
  */
  enterChild(t, e, i) {
    if (!this.buffer)
      return this.yield(this._tree.nextChild(t < 0 ? this._tree._tree.children.length - 1 : 0, t, e, i, this.mode));
    let { buffer: n } = this.buffer, s = n.findChild(this.index + 4, n.buffer[this.index + 3], t, e - this.buffer.start, i);
    return s < 0 ? !1 : (this.stack.push(this.index), this.yieldBuf(s));
  }
  /**
  Move the cursor to this node's first child. When this returns
  false, the node has no child, and the cursor has not been moved.
  */
  firstChild() {
    return this.enterChild(
      1,
      0,
      4
      /* Side.DontCare */
    );
  }
  /**
  Move the cursor to this node's last child.
  */
  lastChild() {
    return this.enterChild(
      -1,
      0,
      4
      /* Side.DontCare */
    );
  }
  /**
  Move the cursor to the first child that ends after `pos`.
  */
  childAfter(t) {
    return this.enterChild(
      1,
      t,
      2
      /* Side.After */
    );
  }
  /**
  Move to the last child that starts before `pos`.
  */
  childBefore(t) {
    return this.enterChild(
      -1,
      t,
      -2
      /* Side.Before */
    );
  }
  /**
  Move the cursor to the child around `pos`. If side is -1 the
  child may end at that position, when 1 it may start there. This
  will also enter [overlaid](#common.MountedTree.overlay)
  [mounted](#common.NodeProp^mounted) trees unless `overlays` is
  set to false.
  */
  enter(t, e, i = this.mode) {
    return this.buffer ? i & Qt.ExcludeBuffers ? !1 : this.enterChild(1, t, e) : this.yield(this._tree.enter(t, e, i));
  }
  /**
  Move to the node's parent node, if this isn't the top node.
  */
  parent() {
    if (!this.buffer)
      return this.yieldNode(this.mode & Qt.IncludeAnonymous ? this._tree._parent : this._tree.parent);
    if (this.stack.length)
      return this.yieldBuf(this.stack.pop());
    let t = this.mode & Qt.IncludeAnonymous ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
    return this.buffer = null, this.yieldNode(t);
  }
  /**
  @internal
  */
  sibling(t) {
    if (!this.buffer)
      return this._tree._parent ? this.yield(this._tree.index < 0 ? null : this._tree._parent.nextChild(this._tree.index + t, t, 0, 4, this.mode)) : !1;
    let { buffer: e } = this.buffer, i = this.stack.length - 1;
    if (t < 0) {
      let n = i < 0 ? 0 : this.stack[i] + 4;
      if (this.index != n)
        return this.yieldBuf(e.findChild(
          n,
          this.index,
          -1,
          0,
          4
          /* Side.DontCare */
        ));
    } else {
      let n = e.buffer[this.index + 3];
      if (n < (i < 0 ? e.buffer.length : e.buffer[this.stack[i] + 3]))
        return this.yieldBuf(n);
    }
    return i < 0 ? this.yield(this.buffer.parent.nextChild(this.buffer.index + t, t, 0, 4, this.mode)) : !1;
  }
  /**
  Move to this node's next sibling, if any.
  */
  nextSibling() {
    return this.sibling(1);
  }
  /**
  Move to this node's previous sibling, if any.
  */
  prevSibling() {
    return this.sibling(-1);
  }
  atLastNode(t) {
    let e, i, { buffer: n } = this;
    if (n) {
      if (t > 0) {
        if (this.index < n.buffer.buffer.length)
          return !1;
      } else
        for (let s = 0; s < this.index; s++)
          if (n.buffer.buffer[s + 3] < this.index)
            return !1;
      ({ index: e, parent: i } = n);
    } else
      ({ index: e, _parent: i } = this._tree);
    for (; i; { index: e, _parent: i } = i)
      if (e > -1)
        for (let s = e + t, o = t < 0 ? -1 : i._tree.children.length; s != o; s += t) {
          let a = i._tree.children[s];
          if (this.mode & Qt.IncludeAnonymous || a instanceof vi || !a.type.isAnonymous || Va(a))
            return !1;
        }
    return !0;
  }
  move(t, e) {
    if (e && this.enterChild(
      t,
      0,
      4
      /* Side.DontCare */
    ))
      return !0;
    for (; ; ) {
      if (this.sibling(t))
        return !0;
      if (this.atLastNode(t) || !this.parent())
        return !1;
    }
  }
  /**
  Move to the next node in a
  [pre-order](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR)
  traversal, going from a node to its first child or, if the
  current node is empty or `enter` is false, its next sibling or
  the next sibling of the first parent node that has one.
  */
  next(t = !0) {
    return this.move(1, t);
  }
  /**
  Move to the next node in a last-to-first pre-order traversal. A
  node is followed by its last child or, if it has none, its
  previous sibling or the previous sibling of the first parent
  node that has one.
  */
  prev(t = !0) {
    return this.move(-1, t);
  }
  /**
  Move the cursor to the innermost node that covers `pos`. If
  `side` is -1, it will enter nodes that end at `pos`. If it is 1,
  it will enter nodes that start at `pos`.
  */
  moveTo(t, e = 0) {
    for (; (this.from == this.to || (e < 1 ? this.from >= t : this.from > t) || (e > -1 ? this.to <= t : this.to < t)) && this.parent(); )
      ;
    for (; this.enterChild(1, t, e); )
      ;
    return this;
  }
  /**
  Get a [syntax node](#common.SyntaxNode) at the cursor's current
  position.
  */
  get node() {
    if (!this.buffer)
      return this._tree;
    let t = this.bufferNode, e = null, i = 0;
    if (t && t.context == this.buffer)
      t: for (let n = this.index, s = this.stack.length; s >= 0; ) {
        for (let o = t; o; o = o._parent)
          if (o.index == n) {
            if (n == this.index)
              return o;
            e = o, i = s + 1;
            break t;
          }
        n = this.stack[--s];
      }
    for (let n = i; n < this.stack.length; n++)
      e = new pi(this.buffer, e, this.stack[n]);
    return this.bufferNode = new pi(this.buffer, e, this.index);
  }
  /**
  Get the [tree](#common.Tree) that represents the current node, if
  any. Will return null when the node is in a [tree
  buffer](#common.TreeBuffer).
  */
  get tree() {
    return this.buffer ? null : this._tree._tree;
  }
  /**
  Iterate over the current node and all its descendants, calling
  `enter` when entering a node and `leave`, if given, when leaving
  one. When `enter` returns `false`, any children of that node are
  skipped, and `leave` isn't called for it.
  */
  iterate(t, e) {
    for (let i = 0; ; ) {
      let n = !1;
      if (this.type.isAnonymous || t(this) !== !1) {
        if (this.firstChild()) {
          i++;
          continue;
        }
        this.type.isAnonymous || (n = !0);
      }
      for (; ; ) {
        if (n && e && e(this), n = this.type.isAnonymous, !i)
          return;
        if (this.nextSibling())
          break;
        this.parent(), i--, n = !0;
      }
    }
  }
  /**
  Test whether the current node matches a given context—a sequence
  of direct parent node names. Empty strings in the context array
  are treated as wildcards.
  */
  matchContext(t) {
    if (!this.buffer)
      return wa(this.node.parent, t);
    let { buffer: e } = this.buffer, { types: i } = e.set;
    for (let n = t.length - 1, s = this.stack.length - 1; n >= 0; s--) {
      if (s < 0)
        return wa(this._tree, t, n);
      let o = i[e.buffer[this.stack[s]]];
      if (!o.isAnonymous) {
        if (t[n] && t[n] != o.name)
          return !1;
        n--;
      }
    }
    return !0;
  }
}
function Va(r) {
  return r.children.some((t) => t instanceof vi || !t.type.isAnonymous || Va(t));
}
function Jg(r) {
  var t;
  let { buffer: e, nodeSet: i, maxBufferLength: n = $g, reused: s = [], minRepeatType: o = i.types.length } = r, a = Array.isArray(e) ? new Ba(e, e.length) : e, h = i.types, d = 0, c = 0;
  function p(N, W, L, nt, et, gt) {
    let { id: Q, start: z, end: ot, size: Y } = a, K = c, qt = d;
    for (; Y < 0; )
      if (a.next(), Y == -1) {
        let Ft = s[Q];
        L.push(Ft), nt.push(z - N);
        return;
      } else if (Y == -3) {
        d = Q;
        return;
      } else if (Y == -4) {
        c = Q;
        return;
      } else
        throw new RangeError(`Unrecognized record size: ${Y}`);
    let Be = h[Q], Ui, Yt, wi = z - N;
    if (ot - z <= n && (Yt = w(a.pos - W, et))) {
      let Ft = new Uint16Array(Yt.size - Yt.skip), Ut = a.pos - Yt.size, he = Ft.length;
      for (; a.pos > Ut; )
        he = M(Yt.start, Ft, he);
      Ui = new vi(Ft, ot - Yt.start, i), wi = Yt.start - N;
    } else {
      let Ft = a.pos - Y;
      a.next();
      let Ut = [], he = [], Bt = Q >= o ? Q : -1, De = 0, Nt = ot;
      for (; a.pos > Ft; )
        Bt >= 0 && a.id == Bt && a.size >= 0 ? (a.end <= Nt - n && (S(Ut, he, z, De, a.end, Nt, Bt, K, qt), De = Ut.length, Nt = a.end), a.next()) : gt > 2500 ? m(z, Ft, Ut, he) : p(z, Ft, Ut, he, Bt, gt + 1);
      if (Bt >= 0 && De > 0 && De < Ut.length && S(Ut, he, z, De, z, Nt, Bt, K, qt), Ut.reverse(), he.reverse(), Bt > -1 && De > 0) {
        let Re = b(Be, qt);
        Ui = Ha(Be, Ut, he, 0, Ut.length, 0, ot - z, Re, Re);
      } else
        Ui = E(Be, Ut, he, ot - z, K - ot, qt);
    }
    L.push(Ui), nt.push(wi);
  }
  function m(N, W, L, nt) {
    let et = [], gt = 0, Q = -1;
    for (; a.pos > W; ) {
      let { id: z, start: ot, end: Y, size: K } = a;
      if (K > 4)
        a.next();
      else {
        if (Q > -1 && ot < Q)
          break;
        Q < 0 && (Q = Y - n), et.push(z, ot, Y), gt++, a.next();
      }
    }
    if (gt) {
      let z = new Uint16Array(gt * 4), ot = et[et.length - 2];
      for (let Y = et.length - 3, K = 0; Y >= 0; Y -= 3)
        z[K++] = et[Y], z[K++] = et[Y + 1] - ot, z[K++] = et[Y + 2] - ot, z[K++] = K;
      L.push(new vi(z, et[2] - ot, i)), nt.push(ot - N);
    }
  }
  function b(N, W) {
    return (L, nt, et) => {
      let gt = 0, Q = L.length - 1, z, ot;
      if (Q >= 0 && (z = L[Q]) instanceof ne) {
        if (!Q && z.type == N && z.length == et)
          return z;
        (ot = z.prop(xt.lookAhead)) && (gt = nt[Q] + z.length + ot);
      }
      return E(N, L, nt, et, gt, W);
    };
  }
  function S(N, W, L, nt, et, gt, Q, z, ot) {
    let Y = [], K = [];
    for (; N.length > nt; )
      Y.push(N.pop()), K.push(W.pop() + L - et);
    N.push(E(i.types[Q], Y, K, gt - et, z - gt, ot)), W.push(et - L);
  }
  function E(N, W, L, nt, et, gt, Q) {
    if (gt) {
      let z = [xt.contextHash, gt];
      Q = Q ? [z].concat(Q) : [z];
    }
    if (et > 25) {
      let z = [xt.lookAhead, et];
      Q = Q ? [z].concat(Q) : [z];
    }
    return new ne(N, W, L, nt, Q);
  }
  function w(N, W) {
    let L = a.fork(), nt = 0, et = 0, gt = 0, Q = L.end - n, z = { size: 0, start: 0, skip: 0 };
    t: for (let ot = L.pos - N; L.pos > ot; ) {
      let Y = L.size;
      if (L.id == W && Y >= 0) {
        z.size = nt, z.start = et, z.skip = gt, gt += 4, nt += 4, L.next();
        continue;
      }
      let K = L.pos - Y;
      if (Y < 0 || K < ot || L.start < Q)
        break;
      let qt = L.id >= o ? 4 : 0, Be = L.start;
      for (L.next(); L.pos > K; ) {
        if (L.size < 0)
          if (L.size == -3)
            qt += 4;
          else
            break t;
        else L.id >= o && (qt += 4);
        L.next();
      }
      et = Be, nt += Y, gt += qt;
    }
    return (W < 0 || nt == N) && (z.size = nt, z.start = et, z.skip = gt), z.size > 4 ? z : void 0;
  }
  function M(N, W, L) {
    let { id: nt, start: et, end: gt, size: Q } = a;
    if (a.next(), Q >= 0 && nt < o) {
      let z = L;
      if (Q > 4) {
        let ot = a.pos - (Q - 4);
        for (; a.pos > ot; )
          L = M(N, W, L);
      }
      W[--L] = z, W[--L] = gt - N, W[--L] = et - N, W[--L] = nt;
    } else Q == -3 ? d = nt : Q == -4 && (c = nt);
    return L;
  }
  let R = [], I = [];
  for (; a.pos > 0; )
    p(r.start || 0, r.bufferStart || 0, R, I, -1, 0);
  let D = (t = r.length) !== null && t !== void 0 ? t : R.length ? I[0] + R[0].length : 0;
  return new ne(h[r.topID], R.reverse(), I.reverse(), D);
}
const eu = /* @__PURE__ */ new WeakMap();
function Xo(r, t) {
  if (!r.isAnonymous || t instanceof vi || t.type != r)
    return 1;
  let e = eu.get(t);
  if (e == null) {
    e = 1;
    for (let i of t.children) {
      if (i.type != r || !(i instanceof ne)) {
        e = 1;
        break;
      }
      e += Xo(r, i);
    }
    eu.set(t, e);
  }
  return e;
}
function Ha(r, t, e, i, n, s, o, a, h) {
  let d = 0;
  for (let S = i; S < n; S++)
    d += Xo(r, t[S]);
  let c = Math.ceil(
    d * 1.5 / 8
    /* Balance.BranchFactor */
  ), p = [], m = [];
  function b(S, E, w, M, R) {
    for (let I = w; I < M; ) {
      let D = I, N = E[I], W = Xo(r, S[I]);
      for (I++; I < M; I++) {
        let L = Xo(r, S[I]);
        if (W + L >= c)
          break;
        W += L;
      }
      if (I == D + 1) {
        if (W > c) {
          let L = S[D];
          b(L.children, L.positions, 0, L.children.length, E[D] + R);
          continue;
        }
        p.push(S[D]);
      } else {
        let L = E[I - 1] + S[I - 1].length - N;
        p.push(Ha(r, S, E, D, I, N, L, null, h));
      }
      m.push(N + R - s);
    }
  }
  return b(t, e, i, n, 0), (a || h)(p, m, o);
}
class Pi {
  /**
  Construct a tree fragment. You'll usually want to use
  [`addTree`](#common.TreeFragment^addTree) and
  [`applyChanges`](#common.TreeFragment^applyChanges) instead of
  calling this directly.
  */
  constructor(t, e, i, n, s = !1, o = !1) {
    this.from = t, this.to = e, this.tree = i, this.offset = n, this.open = (s ? 1 : 0) | (o ? 2 : 0);
  }
  /**
  Whether the start of the fragment represents the start of a
  parse, or the end of a change. (In the second case, it may not
  be safe to reuse some nodes at the start, depending on the
  parsing algorithm.)
  */
  get openStart() {
    return (this.open & 1) > 0;
  }
  /**
  Whether the end of the fragment represents the end of a
  full-document parse, or the start of a change.
  */
  get openEnd() {
    return (this.open & 2) > 0;
  }
  /**
  Create a set of fragments from a freshly parsed tree, or update
  an existing set of fragments by replacing the ones that overlap
  with a tree with content from the new tree. When `partial` is
  true, the parse is treated as incomplete, and the resulting
  fragment has [`openEnd`](#common.TreeFragment.openEnd) set to
  true.
  */
  static addTree(t, e = [], i = !1) {
    let n = [new Pi(0, t.length, t, 0, !1, i)];
    for (let s of e)
      s.to > t.length && n.push(s);
    return n;
  }
  /**
  Apply a set of edits to an array of fragments, removing or
  splitting fragments as necessary to remove edited ranges, and
  adjusting offsets for fragments that moved.
  */
  static applyChanges(t, e, i = 128) {
    if (!e.length)
      return t;
    let n = [], s = 1, o = t.length ? t[0] : null;
    for (let a = 0, h = 0, d = 0; ; a++) {
      let c = a < e.length ? e[a] : null, p = c ? c.fromA : 1e9;
      if (p - h >= i)
        for (; o && o.from < p; ) {
          let m = o;
          if (h >= m.from || p <= m.to || d) {
            let b = Math.max(m.from, h) - d, S = Math.min(m.to, p) - d;
            m = b >= S ? null : new Pi(b, S, m.tree, m.offset + d, a > 0, !!c);
          }
          if (m && n.push(m), o.to > p)
            break;
          o = s < t.length ? t[s++] : null;
        }
      if (!c)
        break;
      h = c.toA, d = c.toA - c.toB;
    }
    return n;
  }
}
class Xg {
  /**
  Start a parse, returning a [partial parse](#common.PartialParse)
  object. [`fragments`](#common.TreeFragment) can be passed in to
  make the parse incremental.
  
  By default, the entire input is parsed. You can pass `ranges`,
  which should be a sorted array of non-empty, non-overlapping
  ranges, to parse only those ranges. The tree returned in that
  case will start at `ranges[0].from`.
  */
  startParse(t, e, i) {
    return typeof t == "string" && (t = new Qg(t)), i = i ? i.length ? i.map((n) => new Ll(n.from, n.to)) : [new Ll(0, 0)] : [new Ll(0, t.length)], this.createParse(t, e || [], i);
  }
  /**
  Run a full parse, returning the resulting tree.
  */
  parse(t, e, i) {
    let n = this.startParse(t, e, i);
    for (; ; ) {
      let s = n.advance();
      if (s)
        return s;
    }
  }
}
class Qg {
  constructor(t) {
    this.string = t;
  }
  get length() {
    return this.string.length;
  }
  chunk(t) {
    return this.string.slice(t);
  }
  get lineChunks() {
    return !1;
  }
  read(t, e) {
    return this.string.slice(t, e);
  }
}
new xt({ perNode: !0 });
let Zg = 0;
class Ae {
  /**
  @internal
  */
  constructor(t, e, i, n) {
    this.name = t, this.set = e, this.base = i, this.modified = n, this.id = Zg++;
  }
  toString() {
    let { name: t } = this;
    for (let e of this.modified)
      e.name && (t = `${e.name}(${t})`);
    return t;
  }
  static define(t, e) {
    let i = typeof t == "string" ? t : "?";
    if (t instanceof Ae && (e = t), e != null && e.base)
      throw new Error("Can not derive from a modified tag");
    let n = new Ae(i, [], null, []);
    if (n.set.push(n), e)
      for (let s of e.set)
        n.set.push(s);
    return n;
  }
  /**
  Define a tag _modifier_, which is a function that, given a tag,
  will return a tag that is a subtag of the original. Applying the
  same modifier to a twice tag will return the same value (`m1(t1)
  == m1(t1)`) and applying multiple modifiers will, regardless or
  order, produce the same tag (`m1(m2(t1)) == m2(m1(t1))`).
  
  When multiple modifiers are applied to a given base tag, each
  smaller set of modifiers is registered as a parent, so that for
  example `m1(m2(m3(t1)))` is a subtype of `m1(m2(t1))`,
  `m1(m3(t1)`, and so on.
  */
  static defineModifier(t) {
    let e = new ol(t);
    return (i) => i.modified.indexOf(e) > -1 ? i : ol.get(i.base || i, i.modified.concat(e).sort((n, s) => n.id - s.id));
  }
}
let tp = 0;
class ol {
  constructor(t) {
    this.name = t, this.instances = [], this.id = tp++;
  }
  static get(t, e) {
    if (!e.length)
      return t;
    let i = e[0].instances.find((a) => a.base == t && ep(e, a.modified));
    if (i)
      return i;
    let n = [], s = new Ae(t.name, n, t, e);
    for (let a of e)
      a.instances.push(s);
    let o = ip(e);
    for (let a of t.set)
      if (!a.modified.length)
        for (let h of o)
          n.push(ol.get(a, h));
    return s;
  }
}
function ep(r, t) {
  return r.length == t.length && r.every((e, i) => e == t[i]);
}
function ip(r) {
  let t = [[]];
  for (let e = 0; e < r.length; e++)
    for (let i = 0, n = t.length; i < n; i++)
      t.push(t[i].concat(r[e]));
  return t.sort((e, i) => i.length - e.length);
}
function np(r) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let e in r) {
    let i = r[e];
    Array.isArray(i) || (i = [i]);
    for (let n of e.split(" "))
      if (n) {
        let s = [], o = 2, a = n;
        for (let p = 0; ; ) {
          if (a == "..." && p > 0 && p + 3 == n.length) {
            o = 1;
            break;
          }
          let m = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(a);
          if (!m)
            throw new RangeError("Invalid path: " + n);
          if (s.push(m[0] == "*" ? "" : m[0][0] == '"' ? JSON.parse(m[0]) : m[0]), p += m[0].length, p == n.length)
            break;
          let b = n[p++];
          if (p == n.length && b == "!") {
            o = 0;
            break;
          }
          if (b != "/")
            throw new RangeError("Invalid path: " + n);
          a = n.slice(p);
        }
        let h = s.length - 1, d = s[h];
        if (!d)
          throw new RangeError("Invalid path: " + n);
        let c = new Aa(i, o, h > 0 ? s.slice(0, h) : null);
        t[d] = c.sort(t[d]);
      }
  }
  return rp.add(t);
}
const rp = new xt();
class Aa {
  constructor(t, e, i, n) {
    this.tags = t, this.mode = e, this.context = i, this.next = n;
  }
  get opaque() {
    return this.mode == 0;
  }
  get inherit() {
    return this.mode == 1;
  }
  sort(t) {
    return !t || t.depth < this.depth ? (this.next = t, this) : (t.next = this.sort(t.next), t);
  }
  get depth() {
    return this.context ? this.context.length : 0;
  }
}
Aa.empty = new Aa([], 2, null);
function _f(r, t) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let s of r)
    if (!Array.isArray(s.tag))
      e[s.tag.id] = s.class;
    else
      for (let o of s.tag)
        e[o.id] = s.class;
  let { scope: i, all: n = null } = t || {};
  return {
    style: (s) => {
      let o = n;
      for (let a of s)
        for (let h of a.set) {
          let d = e[h.id];
          if (d) {
            o = o ? o + " " + d : d;
            break;
          }
        }
      return o;
    },
    scope: i
  };
}
const F = Ae.define, Wo = F(), hi = F(), iu = F(hi), nu = F(hi), ui = F(), Uo = F(ui), Fl = F(ui), _e = F(), xi = F(_e), Ue = F(), ze = F(), ka = F(), fr = F(ka), zo = F(), V = {
  /**
  A comment.
  */
  comment: Wo,
  /**
  A line [comment](#highlight.tags.comment).
  */
  lineComment: F(Wo),
  /**
  A block [comment](#highlight.tags.comment).
  */
  blockComment: F(Wo),
  /**
  A documentation [comment](#highlight.tags.comment).
  */
  docComment: F(Wo),
  /**
  Any kind of identifier.
  */
  name: hi,
  /**
  The [name](#highlight.tags.name) of a variable.
  */
  variableName: F(hi),
  /**
  A type [name](#highlight.tags.name).
  */
  typeName: iu,
  /**
  A tag name (subtag of [`typeName`](#highlight.tags.typeName)).
  */
  tagName: F(iu),
  /**
  A property or field [name](#highlight.tags.name).
  */
  propertyName: nu,
  /**
  An attribute name (subtag of [`propertyName`](#highlight.tags.propertyName)).
  */
  attributeName: F(nu),
  /**
  The [name](#highlight.tags.name) of a class.
  */
  className: F(hi),
  /**
  A label [name](#highlight.tags.name).
  */
  labelName: F(hi),
  /**
  A namespace [name](#highlight.tags.name).
  */
  namespace: F(hi),
  /**
  The [name](#highlight.tags.name) of a macro.
  */
  macroName: F(hi),
  /**
  A literal value.
  */
  literal: ui,
  /**
  A string [literal](#highlight.tags.literal).
  */
  string: Uo,
  /**
  A documentation [string](#highlight.tags.string).
  */
  docString: F(Uo),
  /**
  A character literal (subtag of [string](#highlight.tags.string)).
  */
  character: F(Uo),
  /**
  An attribute value (subtag of [string](#highlight.tags.string)).
  */
  attributeValue: F(Uo),
  /**
  A number [literal](#highlight.tags.literal).
  */
  number: Fl,
  /**
  An integer [number](#highlight.tags.number) literal.
  */
  integer: F(Fl),
  /**
  A floating-point [number](#highlight.tags.number) literal.
  */
  float: F(Fl),
  /**
  A boolean [literal](#highlight.tags.literal).
  */
  bool: F(ui),
  /**
  Regular expression [literal](#highlight.tags.literal).
  */
  regexp: F(ui),
  /**
  An escape [literal](#highlight.tags.literal), for example a
  backslash escape in a string.
  */
  escape: F(ui),
  /**
  A color [literal](#highlight.tags.literal).
  */
  color: F(ui),
  /**
  A URL [literal](#highlight.tags.literal).
  */
  url: F(ui),
  /**
  A language keyword.
  */
  keyword: Ue,
  /**
  The [keyword](#highlight.tags.keyword) for the self or this
  object.
  */
  self: F(Ue),
  /**
  The [keyword](#highlight.tags.keyword) for null.
  */
  null: F(Ue),
  /**
  A [keyword](#highlight.tags.keyword) denoting some atomic value.
  */
  atom: F(Ue),
  /**
  A [keyword](#highlight.tags.keyword) that represents a unit.
  */
  unit: F(Ue),
  /**
  A modifier [keyword](#highlight.tags.keyword).
  */
  modifier: F(Ue),
  /**
  A [keyword](#highlight.tags.keyword) that acts as an operator.
  */
  operatorKeyword: F(Ue),
  /**
  A control-flow related [keyword](#highlight.tags.keyword).
  */
  controlKeyword: F(Ue),
  /**
  A [keyword](#highlight.tags.keyword) that defines something.
  */
  definitionKeyword: F(Ue),
  /**
  A [keyword](#highlight.tags.keyword) related to defining or
  interfacing with modules.
  */
  moduleKeyword: F(Ue),
  /**
  An operator.
  */
  operator: ze,
  /**
  An [operator](#highlight.tags.operator) that dereferences something.
  */
  derefOperator: F(ze),
  /**
  Arithmetic-related [operator](#highlight.tags.operator).
  */
  arithmeticOperator: F(ze),
  /**
  Logical [operator](#highlight.tags.operator).
  */
  logicOperator: F(ze),
  /**
  Bit [operator](#highlight.tags.operator).
  */
  bitwiseOperator: F(ze),
  /**
  Comparison [operator](#highlight.tags.operator).
  */
  compareOperator: F(ze),
  /**
  [Operator](#highlight.tags.operator) that updates its operand.
  */
  updateOperator: F(ze),
  /**
  [Operator](#highlight.tags.operator) that defines something.
  */
  definitionOperator: F(ze),
  /**
  Type-related [operator](#highlight.tags.operator).
  */
  typeOperator: F(ze),
  /**
  Control-flow [operator](#highlight.tags.operator).
  */
  controlOperator: F(ze),
  /**
  Program or markup punctuation.
  */
  punctuation: ka,
  /**
  [Punctuation](#highlight.tags.punctuation) that separates
  things.
  */
  separator: F(ka),
  /**
  Bracket-style [punctuation](#highlight.tags.punctuation).
  */
  bracket: fr,
  /**
  Angle [brackets](#highlight.tags.bracket) (usually `<` and `>`
  tokens).
  */
  angleBracket: F(fr),
  /**
  Square [brackets](#highlight.tags.bracket) (usually `[` and `]`
  tokens).
  */
  squareBracket: F(fr),
  /**
  Parentheses (usually `(` and `)` tokens). Subtag of
  [bracket](#highlight.tags.bracket).
  */
  paren: F(fr),
  /**
  Braces (usually `{` and `}` tokens). Subtag of
  [bracket](#highlight.tags.bracket).
  */
  brace: F(fr),
  /**
  Content, for example plain text in XML or markup documents.
  */
  content: _e,
  /**
  [Content](#highlight.tags.content) that represents a heading.
  */
  heading: xi,
  /**
  A level 1 [heading](#highlight.tags.heading).
  */
  heading1: F(xi),
  /**
  A level 2 [heading](#highlight.tags.heading).
  */
  heading2: F(xi),
  /**
  A level 3 [heading](#highlight.tags.heading).
  */
  heading3: F(xi),
  /**
  A level 4 [heading](#highlight.tags.heading).
  */
  heading4: F(xi),
  /**
  A level 5 [heading](#highlight.tags.heading).
  */
  heading5: F(xi),
  /**
  A level 6 [heading](#highlight.tags.heading).
  */
  heading6: F(xi),
  /**
  A prose [content](#highlight.tags.content) separator (such as a horizontal rule).
  */
  contentSeparator: F(_e),
  /**
  [Content](#highlight.tags.content) that represents a list.
  */
  list: F(_e),
  /**
  [Content](#highlight.tags.content) that represents a quote.
  */
  quote: F(_e),
  /**
  [Content](#highlight.tags.content) that is emphasized.
  */
  emphasis: F(_e),
  /**
  [Content](#highlight.tags.content) that is styled strong.
  */
  strong: F(_e),
  /**
  [Content](#highlight.tags.content) that is part of a link.
  */
  link: F(_e),
  /**
  [Content](#highlight.tags.content) that is styled as code or
  monospace.
  */
  monospace: F(_e),
  /**
  [Content](#highlight.tags.content) that has a strike-through
  style.
  */
  strikethrough: F(_e),
  /**
  Inserted text in a change-tracking format.
  */
  inserted: F(),
  /**
  Deleted text.
  */
  deleted: F(),
  /**
  Changed text.
  */
  changed: F(),
  /**
  An invalid or unsyntactic element.
  */
  invalid: F(),
  /**
  Metadata or meta-instruction.
  */
  meta: zo,
  /**
  [Metadata](#highlight.tags.meta) that applies to the entire
  document.
  */
  documentMeta: F(zo),
  /**
  [Metadata](#highlight.tags.meta) that annotates or adds
  attributes to a given syntactic element.
  */
  annotation: F(zo),
  /**
  Processing instruction or preprocessor directive. Subtag of
  [meta](#highlight.tags.meta).
  */
  processingInstruction: F(zo),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates that a
  given element is being defined. Expected to be used with the
  various [name](#highlight.tags.name) tags.
  */
  definition: Ae.defineModifier("definition"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates that
  something is constant. Mostly expected to be used with
  [variable names](#highlight.tags.variableName).
  */
  constant: Ae.defineModifier("constant"),
  /**
  [Modifier](#highlight.Tag^defineModifier) used to indicate that
  a [variable](#highlight.tags.variableName) or [property
  name](#highlight.tags.propertyName) is being called or defined
  as a function.
  */
  function: Ae.defineModifier("function"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that can be applied to
  [names](#highlight.tags.name) to indicate that they belong to
  the language's standard environment.
  */
  standard: Ae.defineModifier("standard"),
  /**
  [Modifier](#highlight.Tag^defineModifier) that indicates a given
  [names](#highlight.tags.name) is local to some scope.
  */
  local: Ae.defineModifier("local"),
  /**
  A generic variant [modifier](#highlight.Tag^defineModifier) that
  can be used to tag language-specific alternative variants of
  some common tag. It is recommended for themes to define special
  forms of at least the [string](#highlight.tags.string) and
  [variable name](#highlight.tags.variableName) tags, since those
  come up a lot.
  */
  special: Ae.defineModifier("special")
};
for (let r in V) {
  let t = V[r];
  t instanceof Ae && (t.name = r);
}
_f([
  { tag: V.link, class: "tok-link" },
  { tag: V.heading, class: "tok-heading" },
  { tag: V.emphasis, class: "tok-emphasis" },
  { tag: V.strong, class: "tok-strong" },
  { tag: V.keyword, class: "tok-keyword" },
  { tag: V.atom, class: "tok-atom" },
  { tag: V.bool, class: "tok-bool" },
  { tag: V.url, class: "tok-url" },
  { tag: V.labelName, class: "tok-labelName" },
  { tag: V.inserted, class: "tok-inserted" },
  { tag: V.deleted, class: "tok-deleted" },
  { tag: V.literal, class: "tok-literal" },
  { tag: V.string, class: "tok-string" },
  { tag: V.number, class: "tok-number" },
  { tag: [V.regexp, V.escape, V.special(V.string)], class: "tok-string2" },
  { tag: V.variableName, class: "tok-variableName" },
  { tag: V.local(V.variableName), class: "tok-variableName tok-local" },
  { tag: V.definition(V.variableName), class: "tok-variableName tok-definition" },
  { tag: V.special(V.variableName), class: "tok-variableName2" },
  { tag: V.definition(V.propertyName), class: "tok-propertyName tok-definition" },
  { tag: V.typeName, class: "tok-typeName" },
  { tag: V.namespace, class: "tok-namespace" },
  { tag: V.className, class: "tok-className" },
  { tag: V.macroName, class: "tok-macroName" },
  { tag: V.propertyName, class: "tok-propertyName" },
  { tag: V.operator, class: "tok-operator" },
  { tag: V.comment, class: "tok-comment" },
  { tag: V.meta, class: "tok-meta" },
  { tag: V.invalid, class: "tok-invalid" },
  { tag: V.punctuation, class: "tok-punctuation" }
]);
var Bl;
const yr = /* @__PURE__ */ new xt(), sp = /* @__PURE__ */ new xt();
class qe {
  /**
  Construct a language object. If you need to invoke this
  directly, first define a data facet with
  [`defineLanguageFacet`](https://codemirror.net/6/docs/ref/#language.defineLanguageFacet), and then
  configure your parser to [attach](https://codemirror.net/6/docs/ref/#language.languageDataProp) it
  to the language's outer syntax node.
  */
  constructor(t, e, i = [], n = "") {
    this.data = t, this.name = n, bt.prototype.hasOwnProperty("tree") || Object.defineProperty(bt.prototype, "tree", { get() {
      return Hn(this);
    } }), this.parser = e, this.extension = [
      Un.of(this),
      bt.languageData.of((s, o, a) => {
        let h = ru(s, o, a), d = h.type.prop(yr);
        if (!d)
          return [];
        let c = s.facet(d), p = h.type.prop(sp);
        if (p) {
          let m = h.resolve(o - h.from, a);
          for (let b of p)
            if (b.test(m, s)) {
              let S = s.facet(b.facet);
              return b.type == "replace" ? S : S.concat(c);
            }
        }
        return c;
      })
    ].concat(i);
  }
  /**
  Query whether this language is active at the given position.
  */
  isActiveAt(t, e, i = -1) {
    return ru(t, e, i).type.prop(yr) == this.data;
  }
  /**
  Find the document regions that were parsed using this language.
  The returned regions will _include_ any nested languages rooted
  in this language, when those exist.
  */
  findRegions(t) {
    let e = t.facet(Un);
    if ((e == null ? void 0 : e.data) == this.data)
      return [{ from: 0, to: t.doc.length }];
    if (!e || !e.allowsNesting)
      return [];
    let i = [], n = (s, o) => {
      if (s.prop(yr) == this.data) {
        i.push({ from: o, to: o + s.length });
        return;
      }
      let a = s.prop(xt.mounted);
      if (a) {
        if (a.tree.prop(yr) == this.data) {
          if (a.overlay)
            for (let h of a.overlay)
              i.push({ from: h.from + o, to: h.to + o });
          else
            i.push({ from: o, to: o + s.length });
          return;
        } else if (a.overlay) {
          let h = i.length;
          if (n(a.tree, a.overlay[0].from + o), i.length > h)
            return;
        }
      }
      for (let h = 0; h < s.children.length; h++) {
        let d = s.children[h];
        d instanceof ne && n(d, s.positions[h] + o);
      }
    };
    return n(Hn(t), 0), i;
  }
  /**
  Indicates whether this language allows nested languages. The
  default implementation returns true.
  */
  get allowsNesting() {
    return !0;
  }
}
qe.setState = /* @__PURE__ */ Rt.define();
function ru(r, t, e) {
  let i = r.facet(Un), n = Hn(r).topNode;
  if (!i || i.allowsNesting)
    for (let s = n; s; s = s.enter(t, e, Qt.ExcludeBuffers))
      s.type.isTop && (n = s);
  return n;
}
function Hn(r) {
  let t = r.field(qe.state, !1);
  return t ? t.tree : ne.empty;
}
class op {
  /**
  Create an input object for the given document.
  */
  constructor(t) {
    this.doc = t, this.cursorPos = 0, this.string = "", this.cursor = t.iter();
  }
  get length() {
    return this.doc.length;
  }
  syncTo(t) {
    return this.string = this.cursor.next(t - this.cursorPos).value, this.cursorPos = t + this.string.length, this.cursorPos - this.string.length;
  }
  chunk(t) {
    return this.syncTo(t), this.string;
  }
  get lineChunks() {
    return !0;
  }
  read(t, e) {
    let i = this.cursorPos - this.string.length;
    return t < i || e >= this.cursorPos ? this.doc.sliceString(t, e) : this.string.slice(t - i, e - i);
  }
}
let cr = null;
class ll {
  constructor(t, e, i = [], n, s, o, a, h) {
    this.parser = t, this.state = e, this.fragments = i, this.tree = n, this.treeLen = s, this.viewport = o, this.skipped = a, this.scheduleOn = h, this.parse = null, this.tempSkipped = [];
  }
  /**
  @internal
  */
  static create(t, e, i) {
    return new ll(t, e, [], ne.empty, 0, i, [], null);
  }
  startParse() {
    return this.parser.startParse(new op(this.state.doc), this.fragments);
  }
  /**
  @internal
  */
  work(t, e) {
    return e != null && e >= this.state.doc.length && (e = void 0), this.tree != ne.empty && this.isDone(e ?? this.state.doc.length) ? (this.takeTree(), !0) : this.withContext(() => {
      var i;
      if (typeof t == "number") {
        let n = Date.now() + t;
        t = () => Date.now() > n;
      }
      for (this.parse || (this.parse = this.startParse()), e != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > e) && e < this.state.doc.length && this.parse.stopAt(e); ; ) {
        let n = this.parse.advance();
        if (n)
          if (this.fragments = this.withoutTempSkipped(Pi.addTree(n, this.fragments, this.parse.stoppedAt != null)), this.treeLen = (i = this.parse.stoppedAt) !== null && i !== void 0 ? i : this.state.doc.length, this.tree = n, this.parse = null, this.treeLen < (e ?? this.state.doc.length))
            this.parse = this.startParse();
          else
            return !0;
        if (t())
          return !1;
      }
    });
  }
  /**
  @internal
  */
  takeTree() {
    let t, e;
    this.parse && (t = this.parse.parsedPos) >= this.treeLen && ((this.parse.stoppedAt == null || this.parse.stoppedAt > t) && this.parse.stopAt(t), this.withContext(() => {
      for (; !(e = this.parse.advance()); )
        ;
    }), this.treeLen = t, this.tree = e, this.fragments = this.withoutTempSkipped(Pi.addTree(this.tree, this.fragments, !0)), this.parse = null);
  }
  withContext(t) {
    let e = cr;
    cr = this;
    try {
      return t();
    } finally {
      cr = e;
    }
  }
  withoutTempSkipped(t) {
    for (let e; e = this.tempSkipped.pop(); )
      t = su(t, e.from, e.to);
    return t;
  }
  /**
  @internal
  */
  changes(t, e) {
    let { fragments: i, tree: n, treeLen: s, viewport: o, skipped: a } = this;
    if (this.takeTree(), !t.empty) {
      let h = [];
      if (t.iterChangedRanges((d, c, p, m) => h.push({ fromA: d, toA: c, fromB: p, toB: m })), i = Pi.applyChanges(i, h), n = ne.empty, s = 0, o = { from: t.mapPos(o.from, -1), to: t.mapPos(o.to, 1) }, this.skipped.length) {
        a = [];
        for (let d of this.skipped) {
          let c = t.mapPos(d.from, 1), p = t.mapPos(d.to, -1);
          c < p && a.push({ from: c, to: p });
        }
      }
    }
    return new ll(this.parser, e, i, n, s, o, a, this.scheduleOn);
  }
  /**
  @internal
  */
  updateViewport(t) {
    if (this.viewport.from == t.from && this.viewport.to == t.to)
      return !1;
    this.viewport = t;
    let e = this.skipped.length;
    for (let i = 0; i < this.skipped.length; i++) {
      let { from: n, to: s } = this.skipped[i];
      n < t.to && s > t.from && (this.fragments = su(this.fragments, n, s), this.skipped.splice(i--, 1));
    }
    return this.skipped.length >= e ? !1 : (this.reset(), !0);
  }
  /**
  @internal
  */
  reset() {
    this.parse && (this.takeTree(), this.parse = null);
  }
  /**
  Notify the parse scheduler that the given region was skipped
  because it wasn't in view, and the parse should be restarted
  when it comes into view.
  */
  skipUntilInView(t, e) {
    this.skipped.push({ from: t, to: e });
  }
  /**
  Returns a parser intended to be used as placeholder when
  asynchronously loading a nested parser. It'll skip its input and
  mark it as not-really-parsed, so that the next update will parse
  it again.
  
  When `until` is given, a reparse will be scheduled when that
  promise resolves.
  */
  static getSkippingParser(t) {
    return new class extends Xg {
      createParse(e, i, n) {
        let s = n[0].from, o = n[n.length - 1].to;
        return {
          parsedPos: s,
          advance() {
            let h = cr;
            if (h) {
              for (let d of n)
                h.tempSkipped.push(d);
              t && (h.scheduleOn = h.scheduleOn ? Promise.all([h.scheduleOn, t]) : t);
            }
            return this.parsedPos = o, new ne(xe.none, [], [], o - s);
          },
          stoppedAt: null,
          stopAt() {
          }
        };
      }
    }();
  }
  /**
  @internal
  */
  isDone(t) {
    t = Math.min(t, this.state.doc.length);
    let e = this.fragments;
    return this.treeLen >= t && e.length && e[0].from == 0 && e[0].to >= t;
  }
  /**
  Get the context for the current parse, or `null` if no editor
  parse is in progress.
  */
  static get() {
    return cr;
  }
}
function su(r, t, e) {
  return Pi.applyChanges(r, [{ fromA: t, toA: e, fromB: t, toB: e }]);
}
class Wn {
  constructor(t) {
    this.context = t, this.tree = t.tree;
  }
  apply(t) {
    if (!t.docChanged && this.tree == this.context.tree)
      return this;
    let e = this.context.changes(t.changes, t.state), i = this.context.treeLen == t.startState.doc.length ? void 0 : Math.max(t.changes.mapPos(this.context.treeLen), e.viewport.to);
    return e.work(20, i) || e.takeTree(), new Wn(e);
  }
  static init(t) {
    let e = Math.min(3e3, t.doc.length), i = ll.create(t.facet(Un).parser, t, { from: 0, to: e });
    return i.work(20, e) || i.takeTree(), new Wn(i);
  }
}
qe.state = /* @__PURE__ */ si.define({
  create: Wn.init,
  update(r, t) {
    for (let e of t.effects)
      if (e.is(qe.setState))
        return e.value;
    return t.startState.facet(Un) != t.state.facet(Un) ? Wn.init(t.state) : r.apply(t);
  }
});
let $f = (r) => {
  let t = setTimeout(
    () => r(),
    500
    /* Work.MaxPause */
  );
  return () => clearTimeout(t);
};
typeof requestIdleCallback < "u" && ($f = (r) => {
  let t = -1, e = setTimeout(
    () => {
      t = requestIdleCallback(r, {
        timeout: 400
        /* Work.MinPause */
      });
    },
    100
    /* Work.MinPause */
  );
  return () => t < 0 ? clearTimeout(e) : cancelIdleCallback(t);
});
const Vl = typeof navigator < "u" && (!((Bl = navigator.scheduling) === null || Bl === void 0) && Bl.isInputPending) ? () => navigator.scheduling.isInputPending() : null, lp = /* @__PURE__ */ ri.fromClass(class {
  constructor(t) {
    this.view = t, this.working = null, this.workScheduled = 0, this.chunkEnd = -1, this.chunkBudget = -1, this.work = this.work.bind(this), this.scheduleWork();
  }
  update(t) {
    let e = this.view.state.field(qe.state).context;
    (e.updateViewport(t.view.viewport) || this.view.viewport.to > e.treeLen) && this.scheduleWork(), (t.docChanged || t.selectionSet) && (this.view.hasFocus && (this.chunkBudget += 50), this.scheduleWork()), this.checkAsyncSchedule(e);
  }
  scheduleWork() {
    if (this.working)
      return;
    let { state: t } = this.view, e = t.field(qe.state);
    (e.tree != e.context.tree || !e.context.isDone(t.doc.length)) && (this.working = $f(this.work));
  }
  work(t) {
    this.working = null;
    let e = Date.now();
    if (this.chunkEnd < e && (this.chunkEnd < 0 || this.view.hasFocus) && (this.chunkEnd = e + 3e4, this.chunkBudget = 3e3), this.chunkBudget <= 0)
      return;
    let { state: i, viewport: { to: n } } = this.view, s = i.field(qe.state);
    if (s.tree == s.context.tree && s.context.isDone(
      n + 1e5
      /* Work.MaxParseAhead */
    ))
      return;
    let o = Date.now() + Math.min(this.chunkBudget, 100, t && !Vl ? Math.max(25, t.timeRemaining() - 5) : 1e9), a = s.context.treeLen < n && i.doc.length > n + 1e3, h = s.context.work(() => Vl && Vl() || Date.now() > o, n + (a ? 0 : 1e5));
    this.chunkBudget -= Date.now() - e, (h || this.chunkBudget <= 0) && (s.context.takeTree(), this.view.dispatch({ effects: qe.setState.of(new Wn(s.context)) })), this.chunkBudget > 0 && !(h && !a) && this.scheduleWork(), this.checkAsyncSchedule(s.context);
  }
  checkAsyncSchedule(t) {
    t.scheduleOn && (this.workScheduled++, t.scheduleOn.then(() => this.scheduleWork()).catch((e) => ye(this.view.state, e)).then(() => this.workScheduled--), t.scheduleOn = null);
  }
  destroy() {
    this.working && this.working();
  }
  isWorking() {
    return !!(this.working || this.workScheduled > 0);
  }
}, {
  eventHandlers: { focus() {
    this.scheduleWork();
  } }
}), Un = /* @__PURE__ */ Z.define({
  combine(r) {
    return r.length ? r[0] : null;
  },
  enables: (r) => [
    qe.state,
    lp,
    st.contentAttributes.compute([r], (t) => {
      let e = t.facet(r);
      return e && e.name ? { "data-language": e.name } : {};
    })
  ]
}), ap = /* @__PURE__ */ Z.define({
  combine: (r) => {
    if (!r.length)
      return "  ";
    let t = r[0];
    if (!t || /\S/.test(t) || Array.from(t).some((e) => e != t[0]))
      throw new Error("Invalid indent unit: " + JSON.stringify(r[0]));
    return t;
  }
});
function ou(r) {
  let t = r.facet(ap);
  return t.charCodeAt(0) == 9 ? r.tabSize * t.length : t.length;
}
class Wa {
  constructor(t, e) {
    this.specs = t;
    let i;
    function n(a) {
      let h = mi.newName();
      return (i || (i = /* @__PURE__ */ Object.create(null)))["." + h] = a, h;
    }
    const s = typeof e.all == "string" ? e.all : e.all ? n(e.all) : void 0, o = e.scope;
    this.scope = o instanceof qe ? (a) => a.prop(yr) == o.data : o ? (a) => a == o : void 0, this.style = _f(t.map((a) => ({
      tag: a.tag,
      class: a.class || n(Object.assign({}, a, { tag: null }))
    })), {
      all: s
    }).style, this.module = i ? new mi(i) : null, this.themeType = e.themeType;
  }
  /**
  Create a highlighter style that associates the given styles to
  the given tags. The specs must be objects that hold a style tag
  or array of tags in their `tag` property, and either a single
  `class` property providing a static CSS class (for highlighter
  that rely on external styling), or a
  [`style-mod`](https://github.com/marijnh/style-mod#documentation)-style
  set of CSS properties (which define the styling for those tags).
  
  The CSS rules created for a highlighter will be emitted in the
  order of the spec's properties. That means that for elements that
  have multiple tags associated with them, styles defined further
  down in the list will have a higher CSS precedence than styles
  defined earlier.
  */
  static define(t, e) {
    return new Wa(t, e || {});
  }
}
V.meta, V.link, V.heading, V.emphasis, V.strong, V.strikethrough, V.keyword, V.atom, V.bool, V.url, V.contentSeparator, V.labelName, V.literal, V.inserted, V.string, V.deleted, V.regexp, V.escape, V.string, V.variableName, V.variableName, V.typeName, V.namespace, V.className, V.variableName, V.macroName, V.propertyName, V.comment, V.invalid;
const hp = /* @__PURE__ */ Object.create(null), lu = [xe.none], au = [], hu = /* @__PURE__ */ Object.create(null), up = /* @__PURE__ */ Object.create(null);
for (let [r, t] of [
  ["variable", "variableName"],
  ["variable-2", "variableName.special"],
  ["string-2", "string.special"],
  ["def", "variableName.definition"],
  ["tag", "tagName"],
  ["attribute", "attributeName"],
  ["type", "typeName"],
  ["builtin", "variableName.standard"],
  ["qualifier", "modifier"],
  ["error", "invalid"],
  ["header", "heading"],
  ["property", "propertyName"]
])
  up[r] = /* @__PURE__ */ fp(hp, t);
function Hl(r, t) {
  au.indexOf(r) > -1 || (au.push(r), console.warn(t));
}
function fp(r, t) {
  let e = [];
  for (let a of t.split(" ")) {
    let h = [];
    for (let d of a.split(".")) {
      let c = r[d] || V[d];
      c ? typeof c == "function" ? h.length ? h = h.map(c) : Hl(d, `Modifier ${d} used at start of tag`) : h.length ? Hl(d, `Tag ${d} used as modifier`) : h = Array.isArray(c) ? c : [c] : Hl(d, `Unknown highlighting tag ${d}`);
    }
    for (let d of h)
      e.push(d);
  }
  if (!e.length)
    return 0;
  let i = t.replace(/ /g, "_"), n = i + " " + e.map((a) => a.id), s = hu[n];
  if (s)
    return s.id;
  let o = hu[n] = xe.define({
    id: lu.length,
    name: i,
    props: [np({ [i]: e })]
  });
  return lu.push(o), o.id;
}
Wt.RTL, Wt.LTR;
class jf {
  /**
  Create a new completion context. (Mostly useful for testing
  completion sources—in the editor, the extension will create
  these for you.)
  */
  constructor(t, e, i, n) {
    this.state = t, this.pos = e, this.explicit = i, this.view = n, this.abortListeners = [], this.abortOnDocChange = !1;
  }
  /**
  Get the extent, content, and (if there is a token) type of the
  token before `this.pos`.
  */
  tokenBefore(t) {
    let e = Hn(this.state).resolveInner(this.pos, -1);
    for (; e && t.indexOf(e.name) < 0; )
      e = e.parent;
    return e ? {
      from: e.from,
      to: this.pos,
      text: this.state.sliceDoc(e.from, this.pos),
      type: e.type
    } : null;
  }
  /**
  Get the match of the given expression directly before the
  cursor.
  */
  matchBefore(t) {
    let e = this.state.doc.lineAt(this.pos), i = Math.max(e.from, this.pos - 250), n = e.text.slice(i - e.from, this.pos - e.from), s = n.search(Kf(t, !1));
    return s < 0 ? null : { from: i + s, to: this.pos, text: n.slice(s) };
  }
  /**
  Yields true when the query has been aborted. Can be useful in
  asynchronous queries to avoid doing work that will be ignored.
  */
  get aborted() {
    return this.abortListeners == null;
  }
  /**
  Allows you to register abort handlers, which will be called when
  the query is
  [aborted](https://codemirror.net/6/docs/ref/#autocomplete.CompletionContext.aborted).
  
  By default, running queries will not be aborted for regular
  typing or backspacing, on the assumption that they are likely to
  return a result with a
  [`validFor`](https://codemirror.net/6/docs/ref/#autocomplete.CompletionResult.validFor) field that
  allows the result to be used after all. Passing `onDocChange:
  true` will cause this query to be aborted for any document
  change.
  */
  addEventListener(t, e, i) {
    t == "abort" && this.abortListeners && (this.abortListeners.push(e), i && i.onDocChange && (this.abortOnDocChange = !0));
  }
}
function uu(r) {
  let t = Object.keys(r).join(""), e = /\w/.test(t);
  return e && (t = t.replace(/\w/g, "")), `[${e ? "\\w" : ""}${t.replace(/[^\w\s]/g, "\\$&")}]`;
}
function cp(r) {
  let t = /* @__PURE__ */ Object.create(null), e = /* @__PURE__ */ Object.create(null);
  for (let { label: n } of r) {
    t[n[0]] = !0;
    for (let s = 1; s < n.length; s++)
      e[n[s]] = !0;
  }
  let i = uu(t) + uu(e) + "*$";
  return [new RegExp("^" + i), new RegExp(i)];
}
function dp(r) {
  let t = r.map((n) => typeof n == "string" ? { label: n } : n), [e, i] = t.every((n) => /^\w+$/.test(n.label)) ? [/\w*$/, /\w+$/] : cp(t);
  return (n) => {
    let s = n.matchBefore(i);
    return s || n.explicit ? { from: s ? s.from : n.pos, options: t, validFor: e } : null;
  };
}
class fu {
  constructor(t, e, i, n) {
    this.completion = t, this.source = e, this.match = i, this.score = n;
  }
}
function Li(r) {
  return r.selection.main.from;
}
function Kf(r, t) {
  var e;
  let { source: i } = r, n = t && i[0] != "^", s = i[i.length - 1] != "$";
  return !n && !s ? r : new RegExp(`${n ? "^" : ""}(?:${i})${s ? "$" : ""}`, (e = r.flags) !== null && e !== void 0 ? e : r.ignoreCase ? "i" : "");
}
const Ua = /* @__PURE__ */ Wi.define();
function gp(r, t, e, i) {
  let { main: n } = r.selection, s = e - n.from, o = i - n.from;
  return Object.assign(Object.assign({}, r.changeByRange((a) => {
    if (a != n && e != i && r.sliceDoc(a.from + s, a.from + o) != r.sliceDoc(e, i))
      return { range: a };
    let h = r.toText(t);
    return {
      changes: { from: a.from + s, to: i == n.from ? a.to : a.from + o, insert: h },
      range: U.cursor(a.from + s + h.length)
    };
  })), { scrollIntoView: !0, userEvent: "input.complete" });
}
const cu = /* @__PURE__ */ new WeakMap();
function pp(r) {
  if (!Array.isArray(r))
    return r;
  let t = cu.get(r);
  return t || cu.set(r, t = dp(r)), t;
}
const al = /* @__PURE__ */ Rt.define(), Rr = /* @__PURE__ */ Rt.define();
class mp {
  constructor(t) {
    this.pattern = t, this.chars = [], this.folded = [], this.any = [], this.precise = [], this.byWord = [], this.score = 0, this.matched = [];
    for (let e = 0; e < t.length; ) {
      let i = $e(t, e), n = fi(i);
      this.chars.push(i);
      let s = t.slice(e, e + n), o = s.toUpperCase();
      this.folded.push($e(o == s ? s.toLowerCase() : o, 0)), e += n;
    }
    this.astral = t.length != this.chars.length;
  }
  ret(t, e) {
    return this.score = t, this.matched = e, this;
  }
  // Matches a given word (completion) against the pattern (input).
  // Will return a boolean indicating whether there was a match and,
  // on success, set `this.score` to the score, `this.matched` to an
  // array of `from, to` pairs indicating the matched parts of `word`.
  //
  // The score is a number that is more negative the worse the match
  // is. See `Penalty` above.
  match(t) {
    if (this.pattern.length == 0)
      return this.ret(-100, []);
    if (t.length < this.pattern.length)
      return null;
    let { chars: e, folded: i, any: n, precise: s, byWord: o } = this;
    if (e.length == 1) {
      let R = $e(t, 0), I = fi(R), D = I == t.length ? 0 : -100;
      if (R != e[0]) if (R == i[0])
        D += -200;
      else
        return null;
      return this.ret(D, [0, I]);
    }
    let a = t.indexOf(this.pattern);
    if (a == 0)
      return this.ret(t.length == this.pattern.length ? 0 : -100, [0, this.pattern.length]);
    let h = e.length, d = 0;
    if (a < 0) {
      for (let R = 0, I = Math.min(t.length, 200); R < I && d < h; ) {
        let D = $e(t, R);
        (D == e[d] || D == i[d]) && (n[d++] = R), R += fi(D);
      }
      if (d < h)
        return null;
    }
    let c = 0, p = 0, m = !1, b = 0, S = -1, E = -1, w = /[a-z]/.test(t), M = !0;
    for (let R = 0, I = Math.min(t.length, 200), D = 0; R < I && p < h; ) {
      let N = $e(t, R);
      a < 0 && (c < h && N == e[c] && (s[c++] = R), b < h && (N == e[b] || N == i[b] ? (b == 0 && (S = R), E = R + 1, b++) : b = 0));
      let W, L = N < 255 ? N >= 48 && N <= 57 || N >= 97 && N <= 122 ? 2 : N >= 65 && N <= 90 ? 1 : 0 : (W = Ou(N)) != W.toLowerCase() ? 1 : W != W.toUpperCase() ? 2 : 0;
      (!R || L == 1 && w || D == 0 && L != 0) && (e[p] == N || i[p] == N && (m = !0) ? o[p++] = R : o.length && (M = !1)), D = L, R += fi(N);
    }
    return p == h && o[0] == 0 && M ? this.result(-100 + (m ? -200 : 0), o, t) : b == h && S == 0 ? this.ret(-200 - t.length + (E == t.length ? 0 : -100), [0, E]) : a > -1 ? this.ret(-700 - t.length, [a, a + this.pattern.length]) : b == h ? this.ret(-900 - t.length, [S, E]) : p == h ? this.result(-100 + (m ? -200 : 0) + -700 + (M ? 0 : -1100), o, t) : e.length == 2 ? null : this.result((n[0] ? -700 : 0) + -200 + -1100, n, t);
  }
  result(t, e, i) {
    let n = [], s = 0;
    for (let o of e) {
      let a = o + (this.astral ? fi($e(i, o)) : 1);
      s && n[s - 1] == o ? n[s - 1] = a : (n[s++] = o, n[s++] = a);
    }
    return this.ret(t - i.length, n);
  }
}
class yp {
  constructor(t) {
    this.pattern = t, this.matched = [], this.score = 0, this.folded = t.toLowerCase();
  }
  match(t) {
    if (t.length < this.pattern.length)
      return null;
    let e = t.slice(0, this.pattern.length), i = e == this.pattern ? 0 : e.toLowerCase() == this.folded ? -200 : null;
    return i == null ? null : (this.matched = [0, e.length], this.score = i + (t.length == this.pattern.length ? 0 : -100), this);
  }
}
const jt = /* @__PURE__ */ Z.define({
  combine(r) {
    return Xc(r, {
      activateOnTyping: !0,
      activateOnCompletion: () => !1,
      activateOnTypingDelay: 100,
      selectOnOpen: !0,
      override: null,
      closeOnBlur: !0,
      maxRenderedOptions: 100,
      defaultKeymap: !0,
      tooltipClass: () => "",
      optionClass: () => "",
      aboveCursor: !1,
      icons: !0,
      addToOptions: [],
      positionInfo: bp,
      filterStrict: !1,
      compareCompletions: (t, e) => t.label.localeCompare(e.label),
      interactionDelay: 75,
      updateSyncTime: 100
    }, {
      defaultKeymap: (t, e) => t && e,
      closeOnBlur: (t, e) => t && e,
      icons: (t, e) => t && e,
      tooltipClass: (t, e) => (i) => du(t(i), e(i)),
      optionClass: (t, e) => (i) => du(t(i), e(i)),
      addToOptions: (t, e) => t.concat(e),
      filterStrict: (t, e) => t || e
    });
  }
});
function du(r, t) {
  return r ? t ? r + " " + t : r : t;
}
function bp(r, t, e, i, n, s) {
  let o = r.textDirection == Wt.RTL, a = o, h = !1, d = "top", c, p, m = t.left - n.left, b = n.right - t.right, S = i.right - i.left, E = i.bottom - i.top;
  if (a && m < Math.min(S, b) ? a = !1 : !a && b < Math.min(S, m) && (a = !0), S <= (a ? m : b))
    c = Math.max(n.top, Math.min(e.top, n.bottom - E)) - t.top, p = Math.min(400, a ? m : b);
  else {
    h = !0, p = Math.min(
      400,
      (o ? t.right : n.right - t.left) - 30
      /* Info.Margin */
    );
    let R = n.bottom - t.bottom;
    R >= E || R > t.top ? c = e.bottom - t.top : (d = "bottom", c = t.bottom - e.top);
  }
  let w = (t.bottom - t.top) / s.offsetHeight, M = (t.right - t.left) / s.offsetWidth;
  return {
    style: `${d}: ${c / w}px; max-width: ${p / M}px`,
    class: "cm-completionInfo-" + (h ? o ? "left-narrow" : "right-narrow" : a ? "left" : "right")
  };
}
function vp(r) {
  let t = r.addToOptions.slice();
  return r.icons && t.push({
    render(e) {
      let i = document.createElement("div");
      return i.classList.add("cm-completionIcon"), e.type && i.classList.add(...e.type.split(/\s+/g).map((n) => "cm-completionIcon-" + n)), i.setAttribute("aria-hidden", "true"), i;
    },
    position: 20
  }), t.push({
    render(e, i, n, s) {
      let o = document.createElement("span");
      o.className = "cm-completionLabel";
      let a = e.displayLabel || e.label, h = 0;
      for (let d = 0; d < s.length; ) {
        let c = s[d++], p = s[d++];
        c > h && o.appendChild(document.createTextNode(a.slice(h, c)));
        let m = o.appendChild(document.createElement("span"));
        m.appendChild(document.createTextNode(a.slice(c, p))), m.className = "cm-completionMatchedText", h = p;
      }
      return h < a.length && o.appendChild(document.createTextNode(a.slice(h))), o;
    },
    position: 50
  }, {
    render(e) {
      if (!e.detail)
        return null;
      let i = document.createElement("span");
      return i.className = "cm-completionDetail", i.textContent = e.detail, i;
    },
    position: 80
  }), t.sort((e, i) => e.position - i.position).map((e) => e.render);
}
function Wl(r, t, e) {
  if (r <= e)
    return { from: 0, to: r };
  if (t < 0 && (t = 0), t <= r >> 1) {
    let n = Math.floor(t / e);
    return { from: n * e, to: (n + 1) * e };
  }
  let i = Math.floor((r - t) / e);
  return { from: r - (i + 1) * e, to: r - i * e };
}
class wp {
  constructor(t, e, i) {
    this.view = t, this.stateField = e, this.applyCompletion = i, this.info = null, this.infoDestroy = null, this.placeInfoReq = {
      read: () => this.measureInfo(),
      write: (h) => this.placeInfo(h),
      key: this
    }, this.space = null, this.currentClass = "";
    let n = t.state.field(e), { options: s, selected: o } = n.open, a = t.state.facet(jt);
    this.optionContent = vp(a), this.optionClass = a.optionClass, this.tooltipClass = a.tooltipClass, this.range = Wl(s.length, o, a.maxRenderedOptions), this.dom = document.createElement("div"), this.dom.className = "cm-tooltip-autocomplete", this.updateTooltipClass(t.state), this.dom.addEventListener("mousedown", (h) => {
      let { options: d } = t.state.field(e).open;
      for (let c = h.target, p; c && c != this.dom; c = c.parentNode)
        if (c.nodeName == "LI" && (p = /-(\d+)$/.exec(c.id)) && +p[1] < d.length) {
          this.applyCompletion(t, d[+p[1]]), h.preventDefault();
          return;
        }
    }), this.dom.addEventListener("focusout", (h) => {
      let d = t.state.field(this.stateField, !1);
      d && d.tooltip && t.state.facet(jt).closeOnBlur && h.relatedTarget != t.contentDOM && t.dispatch({ effects: Rr.of(null) });
    }), this.showOptions(s, n.id);
  }
  mount() {
    this.updateSel();
  }
  showOptions(t, e) {
    this.list && this.list.remove(), this.list = this.dom.appendChild(this.createListBox(t, e, this.range)), this.list.addEventListener("scroll", () => {
      this.info && this.view.requestMeasure(this.placeInfoReq);
    });
  }
  update(t) {
    var e;
    let i = t.state.field(this.stateField), n = t.startState.field(this.stateField);
    if (this.updateTooltipClass(t.state), i != n) {
      let { options: s, selected: o, disabled: a } = i.open;
      (!n.open || n.open.options != s) && (this.range = Wl(s.length, o, t.state.facet(jt).maxRenderedOptions), this.showOptions(s, i.id)), this.updateSel(), a != ((e = n.open) === null || e === void 0 ? void 0 : e.disabled) && this.dom.classList.toggle("cm-tooltip-autocomplete-disabled", !!a);
    }
  }
  updateTooltipClass(t) {
    let e = this.tooltipClass(t);
    if (e != this.currentClass) {
      for (let i of this.currentClass.split(" "))
        i && this.dom.classList.remove(i);
      for (let i of e.split(" "))
        i && this.dom.classList.add(i);
      this.currentClass = e;
    }
  }
  positioned(t) {
    this.space = t, this.info && this.view.requestMeasure(this.placeInfoReq);
  }
  updateSel() {
    let t = this.view.state.field(this.stateField), e = t.open;
    if ((e.selected > -1 && e.selected < this.range.from || e.selected >= this.range.to) && (this.range = Wl(e.options.length, e.selected, this.view.state.facet(jt).maxRenderedOptions), this.showOptions(e.options, t.id)), this.updateSelectedOption(e.selected)) {
      this.destroyInfo();
      let { completion: i } = e.options[e.selected], { info: n } = i;
      if (!n)
        return;
      let s = typeof n == "string" ? document.createTextNode(n) : n(i);
      if (!s)
        return;
      "then" in s ? s.then((o) => {
        o && this.view.state.field(this.stateField, !1) == t && this.addInfoPane(o, i);
      }).catch((o) => ye(this.view.state, o, "completion info")) : this.addInfoPane(s, i);
    }
  }
  addInfoPane(t, e) {
    this.destroyInfo();
    let i = this.info = document.createElement("div");
    if (i.className = "cm-tooltip cm-completionInfo", t.nodeType != null)
      i.appendChild(t), this.infoDestroy = null;
    else {
      let { dom: n, destroy: s } = t;
      i.appendChild(n), this.infoDestroy = s || null;
    }
    this.dom.appendChild(i), this.view.requestMeasure(this.placeInfoReq);
  }
  updateSelectedOption(t) {
    let e = null;
    for (let i = this.list.firstChild, n = this.range.from; i; i = i.nextSibling, n++)
      i.nodeName != "LI" || !i.id ? n-- : n == t ? i.hasAttribute("aria-selected") || (i.setAttribute("aria-selected", "true"), e = i) : i.hasAttribute("aria-selected") && i.removeAttribute("aria-selected");
    return e && Ap(this.list, e), e;
  }
  measureInfo() {
    let t = this.dom.querySelector("[aria-selected]");
    if (!t || !this.info)
      return null;
    let e = this.dom.getBoundingClientRect(), i = this.info.getBoundingClientRect(), n = t.getBoundingClientRect(), s = this.space;
    if (!s) {
      let o = this.dom.ownerDocument.defaultView || window;
      s = { left: 0, top: 0, right: o.innerWidth, bottom: o.innerHeight };
    }
    return n.top > Math.min(s.bottom, e.bottom) - 10 || n.bottom < Math.max(s.top, e.top) + 10 ? null : this.view.state.facet(jt).positionInfo(this.view, e, n, i, s, this.dom);
  }
  placeInfo(t) {
    this.info && (t ? (t.style && (this.info.style.cssText = t.style), this.info.className = "cm-tooltip cm-completionInfo " + (t.class || "")) : this.info.style.cssText = "top: -1e6px");
  }
  createListBox(t, e, i) {
    const n = document.createElement("ul");
    n.id = e, n.setAttribute("role", "listbox"), n.setAttribute("aria-expanded", "true"), n.setAttribute("aria-label", this.view.state.phrase("Completions"));
    let s = null;
    for (let o = i.from; o < i.to; o++) {
      let { completion: a, match: h } = t[o], { section: d } = a;
      if (d) {
        let m = typeof d == "string" ? d : d.name;
        if (m != s && (o > i.from || i.from == 0))
          if (s = m, typeof d != "string" && d.header)
            n.appendChild(d.header(d));
          else {
            let b = n.appendChild(document.createElement("completion-section"));
            b.textContent = m;
          }
      }
      const c = n.appendChild(document.createElement("li"));
      c.id = e + "-" + o, c.setAttribute("role", "option");
      let p = this.optionClass(a);
      p && (c.className = p);
      for (let m of this.optionContent) {
        let b = m(a, this.view.state, this.view, h);
        b && c.appendChild(b);
      }
    }
    return i.from && n.classList.add("cm-completionListIncompleteTop"), i.to < t.length && n.classList.add("cm-completionListIncompleteBottom"), n;
  }
  destroyInfo() {
    this.info && (this.infoDestroy && this.infoDestroy(), this.info.remove(), this.info = null);
  }
  destroy() {
    this.destroyInfo();
  }
}
function Sp(r, t) {
  return (e) => new wp(e, r, t);
}
function Ap(r, t) {
  let e = r.getBoundingClientRect(), i = t.getBoundingClientRect(), n = e.height / r.offsetHeight;
  i.top < e.top ? r.scrollTop -= (e.top - i.top) / n : i.bottom > e.bottom && (r.scrollTop += (i.bottom - e.bottom) / n);
}
function gu(r) {
  return (r.boost || 0) * 100 + (r.apply ? 10 : 0) + (r.info ? 5 : 0) + (r.type ? 1 : 0);
}
function kp(r, t) {
  let e = [], i = null, n = (d) => {
    e.push(d);
    let { section: c } = d.completion;
    if (c) {
      i || (i = []);
      let p = typeof c == "string" ? c : c.name;
      i.some((m) => m.name == p) || i.push(typeof c == "string" ? { name: p } : c);
    }
  }, s = t.facet(jt);
  for (let d of r)
    if (d.hasResult()) {
      let c = d.result.getMatch;
      if (d.result.filter === !1)
        for (let p of d.result.options)
          n(new fu(p, d.source, c ? c(p) : [], 1e9 - e.length));
      else {
        let p = t.sliceDoc(d.from, d.to), m, b = s.filterStrict ? new yp(p) : new mp(p);
        for (let S of d.result.options)
          if (m = b.match(S.label)) {
            let E = S.displayLabel ? c ? c(S, m.matched) : [] : m.matched;
            n(new fu(S, d.source, E, m.score + (S.boost || 0)));
          }
      }
    }
  if (i) {
    let d = /* @__PURE__ */ Object.create(null), c = 0, p = (m, b) => {
      var S, E;
      return ((S = m.rank) !== null && S !== void 0 ? S : 1e9) - ((E = b.rank) !== null && E !== void 0 ? E : 1e9) || (m.name < b.name ? -1 : 1);
    };
    for (let m of i.sort(p))
      c -= 1e5, d[m.name] = c;
    for (let m of e) {
      let { section: b } = m.completion;
      b && (m.score += d[typeof b == "string" ? b : b.name]);
    }
  }
  let o = [], a = null, h = s.compareCompletions;
  for (let d of e.sort((c, p) => p.score - c.score || h(c.completion, p.completion))) {
    let c = d.completion;
    !a || a.label != c.label || a.detail != c.detail || a.type != null && c.type != null && a.type != c.type || a.apply != c.apply || a.boost != c.boost ? o.push(d) : gu(d.completion) > gu(a) && (o[o.length - 1] = d), a = d.completion;
  }
  return o;
}
class xn {
  constructor(t, e, i, n, s, o) {
    this.options = t, this.attrs = e, this.tooltip = i, this.timestamp = n, this.selected = s, this.disabled = o;
  }
  setSelected(t, e) {
    return t == this.selected || t >= this.options.length ? this : new xn(this.options, pu(e, t), this.tooltip, this.timestamp, t, this.disabled);
  }
  static build(t, e, i, n, s, o) {
    if (n && !o && t.some((d) => d.isPending))
      return n.setDisabled();
    let a = kp(t, e);
    if (!a.length)
      return n && t.some((d) => d.isPending) ? n.setDisabled() : null;
    let h = e.facet(jt).selectOnOpen ? 0 : -1;
    if (n && n.selected != h && n.selected != -1) {
      let d = n.options[n.selected].completion;
      for (let c = 0; c < a.length; c++)
        if (a[c].completion == d) {
          h = c;
          break;
        }
    }
    return new xn(a, pu(i, h), {
      pos: t.reduce((d, c) => c.hasResult() ? Math.min(d, c.from) : d, 1e8),
      create: xp,
      above: s.aboveCursor
    }, n ? n.timestamp : Date.now(), h, !1);
  }
  map(t) {
    return new xn(this.options, this.attrs, Object.assign(Object.assign({}, this.tooltip), { pos: t.mapPos(this.tooltip.pos) }), this.timestamp, this.selected, this.disabled);
  }
  setDisabled() {
    return new xn(this.options, this.attrs, this.tooltip, this.timestamp, this.selected, !0);
  }
}
class hl {
  constructor(t, e, i) {
    this.active = t, this.id = e, this.open = i;
  }
  static start() {
    return new hl(Op, "cm-ac-" + Math.floor(Math.random() * 2e6).toString(36), null);
  }
  update(t) {
    let { state: e } = t, i = e.facet(jt), s = (i.override || e.languageDataAt("autocomplete", Li(e)).map(pp)).map((h) => (this.active.find((c) => c.source == h) || new Ee(
      h,
      this.active.some(
        (c) => c.state != 0
        /* State.Inactive */
      ) ? 1 : 0
      /* State.Inactive */
    )).update(t, i));
    s.length == this.active.length && s.every((h, d) => h == this.active[d]) && (s = this.active);
    let o = this.open, a = t.effects.some((h) => h.is(za));
    o && t.docChanged && (o = o.map(t.changes)), t.selection || s.some((h) => h.hasResult() && t.changes.touchesRange(h.from, h.to)) || !Cp(s, this.active) || a ? o = xn.build(s, e, this.id, o, i, a) : o && o.disabled && !s.some((h) => h.isPending) && (o = null), !o && s.every((h) => !h.isPending) && s.some((h) => h.hasResult()) && (s = s.map((h) => h.hasResult() ? new Ee(
      h.source,
      0
      /* State.Inactive */
    ) : h));
    for (let h of t.effects)
      h.is(Yf) && (o = o && o.setSelected(h.value, this.id));
    return s == this.active && o == this.open ? this : new hl(s, this.id, o);
  }
  get tooltip() {
    return this.open ? this.open.tooltip : null;
  }
  get attrs() {
    return this.open ? this.open.attrs : this.active.length ? Ep : Mp;
  }
}
function Cp(r, t) {
  if (r == t)
    return !0;
  for (let e = 0, i = 0; ; ) {
    for (; e < r.length && !r[e].hasResult(); )
      e++;
    for (; i < t.length && !t[i].hasResult(); )
      i++;
    let n = e == r.length, s = i == t.length;
    if (n || s)
      return n == s;
    if (r[e++].result != t[i++].result)
      return !1;
  }
}
const Ep = {
  "aria-autocomplete": "list"
}, Mp = {};
function pu(r, t) {
  let e = {
    "aria-autocomplete": "list",
    "aria-haspopup": "listbox",
    "aria-controls": r
  };
  return t > -1 && (e["aria-activedescendant"] = r + "-" + t), e;
}
const Op = [];
function qf(r, t) {
  if (r.isUserEvent("input.complete")) {
    let i = r.annotation(Ua);
    if (i && t.activateOnCompletion(i))
      return 12;
  }
  let e = r.isUserEvent("input.type");
  return e && t.activateOnTyping ? 5 : e ? 1 : r.isUserEvent("delete.backward") ? 2 : r.selection ? 8 : r.docChanged ? 16 : 0;
}
class Ee {
  constructor(t, e, i = !1) {
    this.source = t, this.state = e, this.explicit = i;
  }
  hasResult() {
    return !1;
  }
  get isPending() {
    return this.state == 1;
  }
  update(t, e) {
    let i = qf(t, e), n = this;
    (i & 8 || i & 16 && this.touches(t)) && (n = new Ee(
      n.source,
      0
      /* State.Inactive */
    )), i & 4 && n.state == 0 && (n = new Ee(
      this.source,
      1
      /* State.Pending */
    )), n = n.updateFor(t, i);
    for (let s of t.effects)
      if (s.is(al))
        n = new Ee(n.source, 1, s.value);
      else if (s.is(Rr))
        n = new Ee(
          n.source,
          0
          /* State.Inactive */
        );
      else if (s.is(za))
        for (let o of s.value)
          o.source == n.source && (n = o);
    return n;
  }
  updateFor(t, e) {
    return this.map(t.changes);
  }
  map(t) {
    return this;
  }
  touches(t) {
    return t.changes.touchesRange(Li(t.state));
  }
}
class In extends Ee {
  constructor(t, e, i, n, s, o) {
    super(t, 3, e), this.limit = i, this.result = n, this.from = s, this.to = o;
  }
  hasResult() {
    return !0;
  }
  updateFor(t, e) {
    var i;
    if (!(e & 3))
      return this.map(t.changes);
    let n = this.result;
    n.map && !t.changes.empty && (n = n.map(n, t.changes));
    let s = t.changes.mapPos(this.from), o = t.changes.mapPos(this.to, 1), a = Li(t.state);
    if (a > o || !n || e & 2 && (Li(t.startState) == this.from || a < this.limit))
      return new Ee(
        this.source,
        e & 4 ? 1 : 0
        /* State.Inactive */
      );
    let h = t.changes.mapPos(this.limit);
    return Tp(n.validFor, t.state, s, o) ? new In(this.source, this.explicit, h, n, s, o) : n.update && (n = n.update(n, s, o, new jf(t.state, a, !1))) ? new In(this.source, this.explicit, h, n, n.from, (i = n.to) !== null && i !== void 0 ? i : Li(t.state)) : new Ee(this.source, 1, this.explicit);
  }
  map(t) {
    return t.empty ? this : (this.result.map ? this.result.map(this.result, t) : this.result) ? new In(this.source, this.explicit, t.mapPos(this.limit), this.result, t.mapPos(this.from), t.mapPos(this.to, 1)) : new Ee(
      this.source,
      0
      /* State.Inactive */
    );
  }
  touches(t) {
    return t.changes.touchesRange(this.from, this.to);
  }
}
function Tp(r, t, e, i) {
  if (!r)
    return !1;
  let n = t.sliceDoc(e, i);
  return typeof r == "function" ? r(n, e, i, t) : Kf(r, !0).test(n);
}
const za = /* @__PURE__ */ Rt.define({
  map(r, t) {
    return r.map((e) => e.map(t));
  }
}), Yf = /* @__PURE__ */ Rt.define(), de = /* @__PURE__ */ si.define({
  create() {
    return hl.start();
  },
  update(r, t) {
    return r.update(t);
  },
  provide: (r) => [
    Vf.from(r, (t) => t.tooltip),
    st.contentAttributes.from(r, (t) => t.attrs)
  ]
});
function _a(r, t) {
  const e = t.completion.apply || t.completion.label;
  let i = r.state.field(de).active.find((n) => n.source == t.source);
  return i instanceof In ? (typeof e == "string" ? r.dispatch(Object.assign(Object.assign({}, gp(r.state, e, i.from, i.to)), { annotations: Ua.of(t.completion) })) : e(r, t.completion, i.from, i.to), !0) : !1;
}
const xp = /* @__PURE__ */ Sp(de, _a);
function _o(r, t = "option") {
  return (e) => {
    let i = e.state.field(de, !1);
    if (!i || !i.open || i.open.disabled || Date.now() - i.open.timestamp < e.state.facet(jt).interactionDelay)
      return !1;
    let n = 1, s;
    t == "page" && (s = Hf(e, i.open.tooltip)) && (n = Math.max(2, Math.floor(s.dom.offsetHeight / s.dom.querySelector("li").offsetHeight) - 1));
    let { length: o } = i.open.options, a = i.open.selected > -1 ? i.open.selected + n * (r ? 1 : -1) : r ? 0 : o - 1;
    return a < 0 ? a = t == "page" ? 0 : o - 1 : a >= o && (a = t == "page" ? o - 1 : 0), e.dispatch({ effects: Yf.of(a) }), !0;
  };
}
const Dp = (r) => {
  let t = r.state.field(de, !1);
  return r.state.readOnly || !t || !t.open || t.open.selected < 0 || t.open.disabled || Date.now() - t.open.timestamp < r.state.facet(jt).interactionDelay ? !1 : _a(r, t.open.options[t.open.selected]);
}, mu = (r) => r.state.field(de, !1) ? (r.dispatch({ effects: al.of(!0) }), !0) : !1, Rp = (r) => {
  let t = r.state.field(de, !1);
  return !t || !t.active.some(
    (e) => e.state != 0
    /* State.Inactive */
  ) ? !1 : (r.dispatch({ effects: Rr.of(null) }), !0);
};
class Np {
  constructor(t, e) {
    this.active = t, this.context = e, this.time = Date.now(), this.updates = [], this.done = void 0;
  }
}
const Ip = 50, Pp = 1e3, Lp = /* @__PURE__ */ ri.fromClass(class {
  constructor(r) {
    this.view = r, this.debounceUpdate = -1, this.running = [], this.debounceAccept = -1, this.pendingStart = !1, this.composing = 0;
    for (let t of r.state.field(de).active)
      t.isPending && this.startQuery(t);
  }
  update(r) {
    let t = r.state.field(de), e = r.state.facet(jt);
    if (!r.selectionSet && !r.docChanged && r.startState.field(de) == t)
      return;
    let i = r.transactions.some((s) => {
      let o = qf(s, e);
      return o & 8 || (s.selection || s.docChanged) && !(o & 3);
    });
    for (let s = 0; s < this.running.length; s++) {
      let o = this.running[s];
      if (i || o.context.abortOnDocChange && r.docChanged || o.updates.length + r.transactions.length > Ip && Date.now() - o.time > Pp) {
        for (let a of o.context.abortListeners)
          try {
            a();
          } catch (h) {
            ye(this.view.state, h);
          }
        o.context.abortListeners = null, this.running.splice(s--, 1);
      } else
        o.updates.push(...r.transactions);
    }
    this.debounceUpdate > -1 && clearTimeout(this.debounceUpdate), r.transactions.some((s) => s.effects.some((o) => o.is(al))) && (this.pendingStart = !0);
    let n = this.pendingStart ? 50 : e.activateOnTypingDelay;
    if (this.debounceUpdate = t.active.some((s) => s.isPending && !this.running.some((o) => o.active.source == s.source)) ? setTimeout(() => this.startUpdate(), n) : -1, this.composing != 0)
      for (let s of r.transactions)
        s.isUserEvent("input.type") ? this.composing = 2 : this.composing == 2 && s.selection && (this.composing = 3);
  }
  startUpdate() {
    this.debounceUpdate = -1, this.pendingStart = !1;
    let { state: r } = this.view, t = r.field(de);
    for (let e of t.active)
      e.isPending && !this.running.some((i) => i.active.source == e.source) && this.startQuery(e);
    this.running.length && t.open && t.open.disabled && (this.debounceAccept = setTimeout(() => this.accept(), this.view.state.facet(jt).updateSyncTime));
  }
  startQuery(r) {
    let { state: t } = this.view, e = Li(t), i = new jf(t, e, r.explicit, this.view), n = new Np(r, i);
    this.running.push(n), Promise.resolve(r.source(i)).then((s) => {
      n.context.aborted || (n.done = s || null, this.scheduleAccept());
    }, (s) => {
      this.view.dispatch({ effects: Rr.of(null) }), ye(this.view.state, s);
    });
  }
  scheduleAccept() {
    this.running.every((r) => r.done !== void 0) ? this.accept() : this.debounceAccept < 0 && (this.debounceAccept = setTimeout(() => this.accept(), this.view.state.facet(jt).updateSyncTime));
  }
  // For each finished query in this.running, try to create a result
  // or, if appropriate, restart the query.
  accept() {
    var r;
    this.debounceAccept > -1 && clearTimeout(this.debounceAccept), this.debounceAccept = -1;
    let t = [], e = this.view.state.facet(jt), i = this.view.state.field(de);
    for (let n = 0; n < this.running.length; n++) {
      let s = this.running[n];
      if (s.done === void 0)
        continue;
      if (this.running.splice(n--, 1), s.done) {
        let a = Li(s.updates.length ? s.updates[0].startState : this.view.state), h = Math.min(a, s.done.from + (s.active.explicit ? 0 : 1)), d = new In(s.active.source, s.active.explicit, h, s.done, s.done.from, (r = s.done.to) !== null && r !== void 0 ? r : a);
        for (let c of s.updates)
          d = d.update(c, e);
        if (d.hasResult()) {
          t.push(d);
          continue;
        }
      }
      let o = i.active.find((a) => a.source == s.active.source);
      if (o && o.isPending)
        if (s.done == null) {
          let a = new Ee(
            s.active.source,
            0
            /* State.Inactive */
          );
          for (let h of s.updates)
            a = a.update(h, e);
          a.isPending || t.push(a);
        } else
          this.startQuery(o);
    }
    (t.length || i.open && i.open.disabled) && this.view.dispatch({ effects: za.of(t) });
  }
}, {
  eventHandlers: {
    blur(r) {
      let t = this.view.state.field(de, !1);
      if (t && t.tooltip && this.view.state.facet(jt).closeOnBlur) {
        let e = t.open && Hf(this.view, t.open.tooltip);
        (!e || !e.dom.contains(r.relatedTarget)) && setTimeout(() => this.view.dispatch({ effects: Rr.of(null) }), 10);
      }
    },
    compositionstart() {
      this.composing = 1;
    },
    compositionend() {
      this.composing == 3 && setTimeout(() => this.view.dispatch({ effects: al.of(!1) }), 20), this.composing = 0;
    }
  }
}), Fp = typeof navigator == "object" && /* @__PURE__ */ /Win/.test(navigator.platform), Bp = /* @__PURE__ */ fl.highest(/* @__PURE__ */ st.domEventHandlers({
  keydown(r, t) {
    let e = t.state.field(de, !1);
    if (!e || !e.open || e.open.disabled || e.open.selected < 0 || r.key.length > 1 || r.ctrlKey && !(Fp && r.altKey) || r.metaKey)
      return !1;
    let i = e.open.options[e.open.selected], n = e.active.find((o) => o.source == i.source), s = i.completion.commitCharacters || n.result.commitCharacters;
    return s && s.indexOf(r.key) > -1 && _a(t, i), !1;
  }
})), Vp = /* @__PURE__ */ st.baseTheme({
  ".cm-tooltip.cm-tooltip-autocomplete": {
    "& > ul": {
      fontFamily: "monospace",
      whiteSpace: "nowrap",
      overflow: "hidden auto",
      maxWidth_fallback: "700px",
      maxWidth: "min(700px, 95vw)",
      minWidth: "250px",
      maxHeight: "10em",
      height: "100%",
      listStyle: "none",
      margin: 0,
      padding: 0,
      "& > li, & > completion-section": {
        padding: "1px 3px",
        lineHeight: 1.2
      },
      "& > li": {
        overflowX: "hidden",
        textOverflow: "ellipsis",
        cursor: "pointer"
      },
      "& > completion-section": {
        display: "list-item",
        borderBottom: "1px solid silver",
        paddingLeft: "0.5em",
        opacity: 0.7
      }
    }
  },
  "&light .cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#17c",
    color: "white"
  },
  "&light .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
    background: "#777"
  },
  "&dark .cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#347",
    color: "white"
  },
  "&dark .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
    background: "#444"
  },
  ".cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after": {
    content: '"···"',
    opacity: 0.5,
    display: "block",
    textAlign: "center"
  },
  ".cm-tooltip.cm-completionInfo": {
    position: "absolute",
    padding: "3px 9px",
    width: "max-content",
    maxWidth: "400px",
    boxSizing: "border-box",
    whiteSpace: "pre-line"
  },
  ".cm-completionInfo.cm-completionInfo-left": { right: "100%" },
  ".cm-completionInfo.cm-completionInfo-right": { left: "100%" },
  ".cm-completionInfo.cm-completionInfo-left-narrow": { right: "30px" },
  ".cm-completionInfo.cm-completionInfo-right-narrow": { left: "30px" },
  "&light .cm-snippetField": { backgroundColor: "#00000022" },
  "&dark .cm-snippetField": { backgroundColor: "#ffffff22" },
  ".cm-snippetFieldPosition": {
    verticalAlign: "text-top",
    width: 0,
    height: "1.15em",
    display: "inline-block",
    margin: "0 -0.7px -.7em",
    borderLeft: "1.4px dotted #888"
  },
  ".cm-completionMatchedText": {
    textDecoration: "underline"
  },
  ".cm-completionDetail": {
    marginLeft: "0.5em",
    fontStyle: "italic"
  },
  ".cm-completionIcon": {
    fontSize: "90%",
    width: ".8em",
    display: "inline-block",
    textAlign: "center",
    paddingRight: ".6em",
    opacity: "0.6",
    boxSizing: "content-box"
  },
  ".cm-completionIcon-function, .cm-completionIcon-method": {
    "&:after": { content: "'ƒ'" }
  },
  ".cm-completionIcon-class": {
    "&:after": { content: "'○'" }
  },
  ".cm-completionIcon-interface": {
    "&:after": { content: "'◌'" }
  },
  ".cm-completionIcon-variable": {
    "&:after": { content: "'𝑥'" }
  },
  ".cm-completionIcon-constant": {
    "&:after": { content: "'𝐶'" }
  },
  ".cm-completionIcon-type": {
    "&:after": { content: "'𝑡'" }
  },
  ".cm-completionIcon-enum": {
    "&:after": { content: "'∪'" }
  },
  ".cm-completionIcon-property": {
    "&:after": { content: "'□'" }
  },
  ".cm-completionIcon-keyword": {
    "&:after": { content: "'🔑︎'" }
    // Disable emoji rendering
  },
  ".cm-completionIcon-namespace": {
    "&:after": { content: "'▢'" }
  },
  ".cm-completionIcon-text": {
    "&:after": { content: "'abc'", fontSize: "50%", verticalAlign: "middle" }
  }
}), ul = {
  brackets: ["(", "[", "{", "'", '"'],
  before: ")]}:;>",
  stringPrefixes: []
}, Ii = /* @__PURE__ */ Rt.define({
  map(r, t) {
    let e = t.mapPos(r, -1, ge.TrackAfter);
    return e ?? void 0;
  }
}), $a = /* @__PURE__ */ new class extends Fi {
}();
$a.startSide = 1;
$a.endSide = -1;
const Gf = /* @__PURE__ */ si.define({
  create() {
    return Et.empty;
  },
  update(r, t) {
    if (r = r.map(t.changes), t.selection) {
      let e = t.state.doc.lineAt(t.selection.main.head);
      r = r.update({ filter: (i) => i >= e.from && i <= e.to });
    }
    for (let e of t.effects)
      e.is(Ii) && (r = r.update({ add: [$a.range(e.value, e.value + 1)] }));
    return r;
  }
});
function Hp() {
  return [_p, Gf];
}
const Ul = "()[]{}<>";
function Wp(r) {
  for (let t = 0; t < Ul.length; t += 2)
    if (Ul.charCodeAt(t) == r)
      return Ul.charAt(t + 1);
  return Ou(r < 128 ? r : r + 1);
}
function Up(r, t) {
  return r.languageDataAt("closeBrackets", t)[0] || ul;
}
const zp = typeof navigator == "object" && /* @__PURE__ */ /Android\b/.test(navigator.userAgent), _p = /* @__PURE__ */ st.inputHandler.of((r, t, e, i) => {
  if ((zp ? r.composing : r.compositionStarted) || r.state.readOnly)
    return !1;
  let n = r.state.selection.main;
  if (i.length > 2 || i.length == 2 && fi($e(i, 0)) == 1 || t != n.from || e != n.to)
    return !1;
  let s = $p(r.state, i);
  return s ? (r.dispatch(s), !0) : !1;
});
function $p(r, t) {
  let e = Up(r, r.selection.main.head), i = e.brackets || ul.brackets;
  for (let n of i) {
    let s = Wp($e(n, 0));
    if (t == n)
      return s == n ? qp(r, n, i.indexOf(n + n + n) > -1, e) : jp(r, n, s, e.before || ul.before);
    if (t == s && Jf(r, r.selection.main.from))
      return Kp(r, n, s);
  }
  return null;
}
function Jf(r, t) {
  let e = !1;
  return r.field(Gf).between(0, r.doc.length, (i) => {
    i == t && (e = !0);
  }), e;
}
function ja(r, t) {
  let e = r.sliceString(t, t + 2);
  return e.slice(0, fi($e(e, 0)));
}
function jp(r, t, e, i) {
  let n = null, s = r.changeByRange((o) => {
    if (!o.empty)
      return {
        changes: [{ insert: t, from: o.from }, { insert: e, from: o.to }],
        effects: Ii.of(o.to + t.length),
        range: U.range(o.anchor + t.length, o.head + t.length)
      };
    let a = ja(r.doc, o.head);
    return !a || /\s/.test(a) || i.indexOf(a) > -1 ? {
      changes: { insert: t + e, from: o.head },
      effects: Ii.of(o.head + t.length),
      range: U.cursor(o.head + t.length)
    } : { range: n = o };
  });
  return n ? null : r.update(s, {
    scrollIntoView: !0,
    userEvent: "input.type"
  });
}
function Kp(r, t, e) {
  let i = null, n = r.changeByRange((s) => s.empty && ja(r.doc, s.head) == e ? {
    changes: { from: s.head, to: s.head + e.length, insert: e },
    range: U.cursor(s.head + e.length)
  } : i = { range: s });
  return i ? null : r.update(n, {
    scrollIntoView: !0,
    userEvent: "input.type"
  });
}
function qp(r, t, e, i) {
  let n = i.stringPrefixes || ul.stringPrefixes, s = null, o = r.changeByRange((a) => {
    if (!a.empty)
      return {
        changes: [{ insert: t, from: a.from }, { insert: t, from: a.to }],
        effects: Ii.of(a.to + t.length),
        range: U.range(a.anchor + t.length, a.head + t.length)
      };
    let h = a.head, d = ja(r.doc, h), c;
    if (d == t) {
      if (yu(r, h))
        return {
          changes: { insert: t + t, from: h },
          effects: Ii.of(h + t.length),
          range: U.cursor(h + t.length)
        };
      if (Jf(r, h)) {
        let m = e && r.sliceDoc(h, h + t.length * 3) == t + t + t ? t + t + t : t;
        return {
          changes: { from: h, to: h + m.length, insert: m },
          range: U.cursor(h + m.length)
        };
      }
    } else {
      if (e && r.sliceDoc(h - 2 * t.length, h) == t + t && (c = bu(r, h - 2 * t.length, n)) > -1 && yu(r, c))
        return {
          changes: { insert: t + t + t + t, from: h },
          effects: Ii.of(h + t.length),
          range: U.cursor(h + t.length)
        };
      if (r.charCategorizer(h)(d) != Ce.Word && bu(r, h, n) > -1 && !Yp(r, h, t, n))
        return {
          changes: { insert: t + t, from: h },
          effects: Ii.of(h + t.length),
          range: U.cursor(h + t.length)
        };
    }
    return { range: s = a };
  });
  return s ? null : r.update(o, {
    scrollIntoView: !0,
    userEvent: "input.type"
  });
}
function yu(r, t) {
  let e = Hn(r).resolveInner(t + 1);
  return e.parent && e.from == t;
}
function Yp(r, t, e, i) {
  let n = Hn(r).resolveInner(t, -1), s = i.reduce((o, a) => Math.max(o, a.length), 0);
  for (let o = 0; o < 5; o++) {
    let a = r.sliceDoc(n.from, Math.min(n.to, n.from + e.length + s)), h = a.indexOf(e);
    if (!h || h > -1 && i.indexOf(a.slice(0, h)) > -1) {
      let c = n.firstChild;
      for (; c && c.from == n.from && c.to - c.from > e.length + h; ) {
        if (r.sliceDoc(c.to - e.length, c.to) == e)
          return !1;
        c = c.firstChild;
      }
      return !0;
    }
    let d = n.to == t && n.parent;
    if (!d)
      break;
    n = d;
  }
  return !1;
}
function bu(r, t, e) {
  let i = r.charCategorizer(t);
  if (i(r.sliceDoc(t - 1, t)) != Ce.Word)
    return t;
  for (let n of e) {
    let s = t - n.length;
    if (r.sliceDoc(s, t) == n && i(r.sliceDoc(s - 1, s)) != Ce.Word)
      return s;
  }
  return -1;
}
function Gp(r = {}) {
  return [
    Bp,
    de,
    jt.of(r),
    Lp,
    Xp,
    Vp
  ];
}
const Jp = [
  { key: "Ctrl-Space", run: mu },
  { mac: "Alt-`", run: mu },
  { key: "Escape", run: Rp },
  { key: "ArrowDown", run: /* @__PURE__ */ _o(!0) },
  { key: "ArrowUp", run: /* @__PURE__ */ _o(!1) },
  { key: "PageDown", run: /* @__PURE__ */ _o(!0, "page") },
  { key: "PageUp", run: /* @__PURE__ */ _o(!1, "page") },
  { key: "Enter", run: Dp }
], Xp = /* @__PURE__ */ fl.highest(/* @__PURE__ */ Ff.computeN([jt], (r) => r.facet(jt).defaultKeymap ? [Jp] : []));
function Qp(r, t) {
  if (r.state.readOnly)
    return !1;
  let e = "delete.selection", { state: i } = r, n = i.changeByRange((s) => {
    let { from: o, to: a } = s;
    if (o == a) {
      let h = t(s);
      h < o ? (e = "delete.backward", h = $o(r, h, !1)) : h > o && (e = "delete.forward", h = $o(r, h, !0)), o = Math.min(o, h), a = Math.max(a, h);
    } else
      o = $o(r, o, !1), a = $o(r, a, !0);
    return o == a ? { range: s } : { changes: { from: o, to: a }, range: U.cursor(o, o < s.head ? -1 : 1) };
  });
  return n.changes.empty ? !1 : (r.dispatch(i.update(n, {
    scrollIntoView: !0,
    userEvent: e,
    effects: e == "delete.selection" ? st.announce.of(i.phrase("Selection deleted")) : void 0
  })), !0);
}
function $o(r, t, e) {
  if (r instanceof st)
    for (let i of r.state.facet(st.atomicRanges).map((n) => n(r)))
      i.between(t, t, (n, s) => {
        n < t && s > t && (t = e ? s : n);
      });
  return t;
}
const Zp = (r, t, e) => Qp(r, (i) => {
  let n = i.from, { state: s } = r, o = s.doc.lineAt(n), a, h;
  if (n > o.from && n < o.from + 200 && !/[^ \t]/.test(a = o.text.slice(0, n - o.from))) {
    if (a[a.length - 1] == "	")
      return n - 1;
    let d = Zc(a, s.tabSize), c = d % ou(s) || ou(s);
    for (let p = 0; p < c && a[a.length - 1 - p] == " "; p++)
      n--;
    h = n;
  } else
    h = ke(o.text, n - o.from, t, t) + o.from, h == n && o.number != 1 ? h += -1 : /[\ufe00-\ufe0f]/.test(o.text.slice(h - o.from, n - o.from)) && (h = ke(o.text, h - o.from, !1, !1) + o.from);
  return h;
}), tm = (r) => Zp(r, !1);
var br = { exports: {} }, em = br.exports, vu;
function im() {
  return vu || (vu = 1, function(r, t) {
    (function(e, i) {
      i(t);
    })(em, function(e) {
      var i = Object.freeze({ __proto__: null, get ERROR() {
        return M;
      }, get ERRORTYPES() {
        return w;
      }, get PARSE() {
        return I;
      }, get parse() {
        return I;
      }, get WALKER() {
        return De;
      }, get WALKERCONFIGDEFAULT() {
        return wi;
      }, get WALKERCONFIGFP() {
        return Ut;
      }, get WALKERCONFIGJS() {
        return he;
      }, get COMPILE() {
        return zn;
      }, get compile() {
        return zn;
      }, get RUN() {
        return qn;
      }, get run() {
        return qn;
      }, get BRANCH() {
        return z;
      }, get IF() {
        return z;
      }, get IFS() {
        return z;
      }, get branch() {
        return z;
      }, get ifs() {
        return z;
      }, get if() {
        return z;
      }, get CHOOSE() {
        return Pr;
      }, get choose() {
        return Pr;
      }, get SWITCH() {
        return Lr;
      }, get switch() {
        return Lr;
      }, get AND() {
        return nt;
      }, get and() {
        return nt;
      }, get NAND() {
        return Fr;
      }, get nand() {
        return Fr;
      }, get OR() {
        return $i;
      }, get or() {
        return $i;
      }, get NOR() {
        return Br;
      }, get nor() {
        return Br;
      }, get XOR() {
        return Vr;
      }, get xor() {
        return Vr;
      }, get NOT() {
        return _i;
      }, get not() {
        return _i;
      }, get EQ() {
        return qt;
      }, get eq() {
        return qt;
      }, get NE() {
        return Yn;
      }, get ne() {
        return Yn;
      }, get GT() {
        return Gn;
      }, get gt() {
        return Gn;
      }, get GTE() {
        return Jn;
      }, get gte() {
        return Jn;
      }, get LT() {
        return Xn;
      }, get lt() {
        return Xn;
      }, get LTE() {
        return Qn;
      }, get lte() {
        return Qn;
      }, get IDENTITY() {
        return Hr;
      }, get identity() {
        return Hr;
      }, get IFBLANK() {
        return ji;
      }, get ifBlank() {
        return ji;
      }, get ifblank() {
        return ji;
      }, get IFEMPTY() {
        return Ki;
      }, get ifEmpty() {
        return Ki;
      }, get ifempty() {
        return Ki;
      }, get IFERROR() {
        return qi;
      }, get ifError() {
        return qi;
      }, get iferror() {
        return qi;
      }, get IFNA() {
        return Yi;
      }, get ifNA() {
        return Yi;
      }, get ifna() {
        return Yi;
      }, get ISARRAY() {
        return K;
      }, get isArray() {
        return K;
      }, get isarray() {
        return K;
      }, get ISASYNCFUNCTION() {
        return W;
      }, get isAsyncFunction() {
        return W;
      }, get isasyncfunction() {
        return W;
      }, get ISBLANK() {
        return Y;
      }, get isBlank() {
        return Y;
      }, get isblank() {
        return Y;
      }, get ISBOOLEAN() {
        return Gi;
      }, get isBoolean() {
        return Gi;
      }, get isboolean() {
        return Gi;
      }, get ISDATE() {
        return Zt;
      }, get isDate() {
        return Zt;
      }, get isdate() {
        return Zt;
      }, get ISEMAIL() {
        return Ji;
      }, get isEmail() {
        return Ji;
      }, get isemail() {
        return Ji;
      }, get ISEMPTY() {
        return oi;
      }, get isEmpty() {
        return oi;
      }, get isempty() {
        return oi;
      }, get ISERROR() {
        return N;
      }, get isError() {
        return N;
      }, get iserror() {
        return N;
      }, get ISEVEN() {
        return Xi;
      }, get isEven() {
        return Xi;
      }, get iseven() {
        return Xi;
      }, get ISFALSY() {
        return gt;
      }, get isFalsy() {
        return gt;
      }, get isfalsy() {
        return gt;
      }, get ISFUNCTION() {
        return L;
      }, get isFunction() {
        return L;
      }, get isfunction() {
        return L;
      }, get ISLEAPYEAR() {
        return Zi;
      }, get isLeapYear() {
        return Zi;
      }, get isleapyear() {
        return Zi;
      }, get ISLOWERCASE() {
        return tn;
      }, get isLowerCase() {
        return tn;
      }, get islowercase() {
        return tn;
      }, get ISOBJECT() {
        return Xe;
      }, get isObject() {
        return Xe;
      }, get ISNA() {
        return en;
      }, get isNA() {
        return en;
      }, get isna() {
        return en;
      }, get ISNAN() {
        return et;
      }, get isNaN() {
        return et;
      }, get isnan() {
        return et;
      }, get ISNUMBER() {
        return J;
      }, get isNumber() {
        return J;
      }, get isnumber() {
        return J;
      }, get ISODD() {
        return nn;
      }, get isOdd() {
        return nn;
      }, get isodd() {
        return nn;
      }, get ISOWEEKNUM() {
        return rn;
      }, get ISOWeekNum() {
        return rn;
      }, get isoweeknum() {
        return rn;
      }, get ISPROMISE() {
        return sn;
      }, get isPromise() {
        return sn;
      }, get ispromise() {
        return sn;
      }, get ISREF() {
        return It;
      }, get isRef() {
        return It;
      }, get isref() {
        return It;
      }, get ISTEXT() {
        return ot;
      }, get isText() {
        return ot;
      }, get ISTRUTHY() {
        return Q;
      }, get isTruthy() {
        return Q;
      }, get istruthy() {
        return Q;
      }, get ISUPPERCASE() {
        return on;
      }, get isUpperCase() {
        return on;
      }, get isuppercase() {
        return on;
      }, get ISURL() {
        return ln;
      }, get isURL() {
        return ln;
      }, get isurl() {
        return ln;
      }, get ISWHOLENUMBER() {
        return an;
      }, get isWholeNumber() {
        return an;
      }, get iswholenumber() {
        return an;
      }, get MINUS() {
        return Ur;
      }, get minus() {
        return Ur;
      }, get PLUS() {
        return zr;
      }, get plus() {
        return zr;
      }, get ADD() {
        return _r;
      }, get add() {
        return _r;
      }, get SUBTRACT() {
        return $r;
      }, get subtract() {
        return $r;
      }, get MULTIPLY() {
        return jr;
      }, get multiply() {
        return jr;
      }, get DIVIDE() {
        return Kr;
      }, get divide() {
        return Kr;
      }, get ABS() {
        return qr;
      }, get abs() {
        return qr;
      }, get ACOS() {
        return Yr;
      }, get acos() {
        return Yr;
      }, get ACOSH() {
        return Gr;
      }, get acosh() {
        return Gr;
      }, get ACOT() {
        return Jr;
      }, get acot() {
        return Jr;
      }, get ACOTH() {
        return Xr;
      }, get acoth() {
        return Xr;
      }, get ASIN() {
        return Qr;
      }, get asin() {
        return Qr;
      }, get ASINH() {
        return Zr;
      }, get asinh() {
        return Zr;
      }, get ATAN() {
        return ts;
      }, get atan() {
        return ts;
      }, get ATAN2() {
        return es;
      }, get atan2() {
        return es;
      }, get ATANH() {
        return is;
      }, get atanh() {
        return is;
      }, get COS() {
        return ns;
      }, get cos() {
        return ns;
      }, get DEGREES() {
        return rs;
      }, get degrees() {
        return rs;
      }, get MOD() {
        return ss;
      }, get mod() {
        return ss;
      }, get PI() {
        return os;
      }, get pi() {
        return os;
      }, get POWER() {
        return ls;
      }, get power() {
        return ls;
      }, get ROUND() {
        return Si;
      }, get round() {
        return Si;
      }, get ROUNDUP() {
        return un;
      }, get roundUp() {
        return un;
      }, get roundup() {
        return un;
      }, get SIN() {
        return as;
      }, get sin() {
        return as;
      }, get TAN() {
        return hs;
      }, get tan() {
        return hs;
      }, get TAU() {
        return us;
      }, get tau() {
        return us;
      }, get TRUNC() {
        return be;
      }, get trunc() {
        return be;
      }, get WITHIN() {
        return fn;
      }, get withIn() {
        return fn;
      }, get within() {
        return fn;
      }, get CHAR() {
        return fs;
      }, get char() {
        return fs;
      }, get CAMELCASE() {
        return cn;
      }, get camelCase() {
        return cn;
      }, get camelcase() {
        return cn;
      }, get CODE() {
        return hn;
      }, get code() {
        return hn;
      }, get CONCATENATE() {
        return cs;
      }, get concatenate() {
        return cs;
      }, get EXACT() {
        return ds;
      }, get exact() {
        return ds;
      }, get FIND() {
        return gs;
      }, get find() {
        return gs;
      }, get JOIN() {
        return ps;
      }, get join() {
        return ps;
      }, get LEFT() {
        return ms;
      }, get left() {
        return ms;
      }, get LEN() {
        return ys;
      }, get len() {
        return ys;
      }, get LOWER() {
        return bs;
      }, get lower() {
        return bs;
      }, get NUMBERVALUE() {
        return Pt;
      }, get numberValue() {
        return Pt;
      }, get numbervalue() {
        return Pt;
      }, get PARSEBOOL() {
        return Ai;
      }, get parseBool() {
        return Ai;
      }, get parsebool() {
        return Ai;
      }, get PARSEDATE() {
        return Dt;
      }, get parseDate() {
        return Dt;
      }, get parsedate() {
        return Dt;
      }, get PARSEQUERY() {
        return gn;
      }, get parseQuery() {
        return gn;
      }, get parsequery() {
        return gn;
      }, get PROPER() {
        return vs;
      }, get proper() {
        return vs;
      }, get REPLACE() {
        return ws;
      }, get replace() {
        return ws;
      }, get RIGHT() {
        return Ss;
      }, get right() {
        return Ss;
      }, get REPT() {
        return pn;
      }, get rept() {
        return pn;
      }, get SEARCH() {
        return tr;
      }, get search() {
        return tr;
      }, get SNAKECASE() {
        return mn;
      }, get snakeCase() {
        return mn;
      }, get snakecase() {
        return mn;
      }, get SUBSTITUTE() {
        return er;
      }, get substitute() {
        return er;
      }, get SUBSTITUTEALL() {
        return yn;
      }, get substituteAll() {
        return yn;
      }, get substituteall() {
        return yn;
      }, get SURROUNDKEYS() {
        return bn;
      }, get surroundKeys() {
        return bn;
      }, get surroundkeys() {
        return bn;
      }, get SPLIT() {
        return Zn;
      }, get split() {
        return Zn;
      }, get TEXT() {
        return As;
      }, get text() {
        return As;
      }, get TRIM() {
        return ks;
      }, get trim() {
        return ks;
      }, get UPPER() {
        return Cs;
      }, get upper() {
        return Cs;
      }, get HLOOKUP() {
        return Es;
      }, get hlookup() {
        return Es;
      }, get INCLUDES() {
        return ki;
      }, get includes() {
        return ki;
      }, get NOTINCLUDES() {
        return vn;
      }, get notIncludes() {
        return vn;
      }, get notincludes() {
        return vn;
      }, get INDEX() {
        return Ms;
      }, get index() {
        return Ms;
      }, get LOOKUP() {
        return Os;
      }, get lookup() {
        return Os;
      }, get MATCH() {
        return Ts;
      }, get match() {
        return Ts;
      }, get VLOOKUP() {
        return xs;
      }, get vlookup() {
        return xs;
      }, get DATE() {
        return Ds;
      }, get date() {
        return Ds;
      }, get DATEVALUE() {
        return wn;
      }, get datevalue() {
        return wn;
      }, get DATEDIF() {
        return Rs;
      }, get datedif() {
        return Rs;
      }, get DAY() {
        return Ns;
      }, get day() {
        return Ns;
      }, get DAYS360() {
        return Is;
      }, get days360() {
        return Is;
      }, get EDATE() {
        return Ps;
      }, get edate() {
        return Ps;
      }, get EOMONTH() {
        return Ls;
      }, get eomonth() {
        return Ls;
      }, get HOUR() {
        return Fs;
      }, get hour() {
        return Fs;
      }, get MINUTE() {
        return Bs;
      }, get minute() {
        return Bs;
      }, get MONTH() {
        return Vs;
      }, get month() {
        return Vs;
      }, get NOW() {
        return Hs;
      }, get now() {
        return Hs;
      }, get SECOND() {
        return Ws;
      }, get second() {
        return Ws;
      }, get TODAY() {
        return Us;
      }, get today() {
        return Us;
      }, get TIME() {
        return zs;
      }, get time() {
        return zs;
      }, get TIMEVALUE() {
        return ir;
      }, get timevalue() {
        return ir;
      }, get YEAR() {
        return _s;
      }, get year() {
        return _s;
      }, get YEARFRAC() {
        return nr;
      }, get yearfrac() {
        return nr;
      }, get AVERAGE() {
        return $s;
      }, get average() {
        return $s;
      }, get MIN() {
        return js;
      }, get min() {
        return js;
      }, get MAX() {
        return Ks;
      }, get max() {
        return Ks;
      }, get QUERY() {
        return qs;
      }, get query() {
        return qs;
      }, get SUM() {
        return rr;
      }, get sum() {
        return rr;
      }, get ACCRINT() {
        return Ys;
      }, get accrint() {
        return Ys;
      }, get FV() {
        return ai;
      }, get fv() {
        return ai;
      }, get NPER() {
        return Gs;
      }, get nper() {
        return Gs;
      }, get NPV() {
        return Js;
      }, get npv() {
        return Js;
      }, get PMT() {
        return Sn;
      }, get pmt() {
        return Sn;
      }, get CUMIPMT() {
        return Xs;
      }, get cumipmt() {
        return Xs;
      }, get IPMT() {
        return Qs;
      }, get ipmt() {
        return Qs;
      }, get PV() {
        return Zs;
      }, get pv() {
        return Zs;
      }, get BIN2DEC() {
        return to;
      }, get bin2dec() {
        return to;
      }, get DEC2BIN() {
        return eo;
      }, get dec2bin() {
        return eo;
      }, get OCT2DEC() {
        return io;
      }, get oct2dec() {
        return io;
      }, get FILTER() {
        return sr;
      }, get filter() {
        return sr;
      }, get FLATTEN() {
        return Je;
      }, get flatten() {
        return Je;
      }, get MAP() {
        return Nt;
      }, get map() {
        return Nt;
      }, get PLUCK() {
        return no;
      }, get pluck() {
        return no;
      }, get REDUCE() {
        return D;
      }, get reduce() {
        return D;
      }, get SOME() {
        return Be;
      }, get some() {
        return Be;
      }, get SORT() {
        return ro;
      }, get sort() {
        return ro;
      }, get UNFLATTEN() {
        return An;
      }, get unFlatten() {
        return An;
      }, get unflatten() {
        return An;
      }, get UNIQUE() {
        return Re;
      }, get unique() {
        return Re;
      }, get CHANGED() {
        return so;
      }, get changed() {
        return so;
      }, get DIFF() {
        return oo;
      }, get diff() {
        return oo;
      }, get CLEAN() {
        return lo;
      }, get clean() {
        return lo;
      }, get GET() {
        return ao;
      }, get get() {
        return ao;
      }, get SELECT() {
        return or;
      }, get select() {
        return or;
      }, get KEYS() {
        return re;
      }, get keys() {
        return re;
      }, get ADDRESS() {
        return ho;
      }, get address() {
        return ho;
      }, get ASSIGN() {
        return Yt;
      }, get assign() {
        return Yt;
      }, get BASE() {
        return uo;
      }, get base() {
        return uo;
      }, get CELLINDEX() {
        return kn;
      }, get cellIndex() {
        return kn;
      }, get cellindex() {
        return kn;
      }, get CEILING() {
        return lr;
      }, get ceiling() {
        return lr;
      }, get COLUMN() {
        return fo;
      }, get column() {
        return fo;
      }, get COLUMNLETTER() {
        return Qe;
      }, get columnLetter() {
        return Qe;
      }, get columnletter() {
        return Qe;
      }, get COLUMNNUMBER() {
        return Ci;
      }, get columnNumber() {
        return Ci;
      }, get columnnumber() {
        return Ci;
      }, get DECODEBASE64() {
        return Ei;
      }, get decodeBase64() {
        return Ei;
      }, get decodebase64() {
        return Ei;
      }, get DECODEJWT() {
        return Cn;
      }, get decodeJWT() {
        return Cn;
      }, get decodejwt() {
        return Cn;
      }, get ENTRIES() {
        return co;
      }, get entries() {
        return co;
      }, get EVEN() {
        return go;
      }, get even() {
        return go;
      }, get FLOOR() {
        return po;
      }, get floor() {
        return po;
      }, get GROUP() {
        return mo;
      }, get group() {
        return mo;
      }, get GUID() {
        return yo;
      }, get guid() {
        return yo;
      }, get HASH() {
        return bo;
      }, get hash() {
        return bo;
      }, get INT() {
        return vo;
      }, get int() {
        return vo;
      }, get INDEX2COL() {
        return He;
      }, get index2Col() {
        return He;
      }, get index2col() {
        return He;
      }, get INDEX2ROW() {
        return ve;
      }, get index2Row() {
        return ve;
      }, get index2row() {
        return ve;
      }, get INTERSECT() {
        return wo;
      }, get intersect() {
        return wo;
      }, get INTERPOLATE() {
        return So;
      }, get interpolate() {
        return So;
      }, get INTERPOLATOR() {
        return Mi;
      }, get interpolator() {
        return Mi;
      }, get N() {
        return dn;
      }, get n() {
        return dn;
      }, get NUMBERS() {
        return Ao;
      }, get numbers() {
        return Ao;
      }, get OVERLAP() {
        return ko;
      }, get overlap() {
        return ko;
      }, get REF() {
        return Co;
      }, get ref() {
        return Co;
      }, get SERIAL() {
        return Ve;
      }, get serial() {
        return Ve;
      } });
      function n(l, u) {
        this.name = l || "NotImplementedError", this.message = u || "";
      }
      n.prototype = Error.prototype, n.prototype.toString = function() {
        return this.name;
      };
      var s = new n("#NULL!", "Null reference"), o = new n("#DIV/0!", "Divide by zero"), a = new n("#VALUE!", "Invalid value"), h = new n("#REF!", "Invalid reference"), d = new n("#NAME?", "Invalid name"), c = new n("#NUM!", "Invalid number"), p = new n("#N/A!", "Not applicable"), m = new n("#ERROR!", "Error"), b = new n("#GETTING_DATA!", "Error getting data"), S = new n("#MISSING!", "Missing"), E = new n("#UNKNOWN!", "Unknown error"), w = { nil: s, "#NULL!": s, div0: o, "#DIV/0!": o, value: a, "#VALUE!": a, ref: h, "#REF!": h, name: d, "#NAME?": d, num: c, "#NUM!": c, na: p, "#N/A!": p, error: m, "#ERROR!": m, data: b, "#GETTING_DATA!": b, missing: S, "#MISSING!": S, unknown: E, "#UNKNOWN!": E };
      function M(l) {
        return w[l] || m;
      }
      var R = function() {
        var l = function(yt, B, q, _) {
          for (q = q || {}, _ = yt.length; _--; q[yt[_]] = B)
            ;
          return q;
        }, u = [1, 4], f = [1, 5], g = [1, 6], y = [1, 7], v = [1, 8], A = [1, 11], k = [1, 12], C = [1, 13], x = [1, 14], T = [1, 15], P = [1, 16], tt = [1, 24], G = [1, 18], lt = [1, 19], at = [1, 20], X = [1, 21], it = [1, 22], ht = [1, 23], ct = [1, 25], kt = [1, 26], O = [1, 27], vt = [1, 28], dt = [1, 29], wt = [1, 30], Ct = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 32, 33, 36], mt = [5, 6, 7, 8, 12, 13, 14, 15, 16, 17, 19, 32, 33, 36], se = [1, 58], pe = [1, 59], ft = [19, 32, 33, 36], Ot = [5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 19, 32, 33, 36], Lt = [5, 6, 12, 13, 14, 15, 16, 19, 32, 33, 36], Gt = { trace: function() {
        }, yy: {}, symbols_: { error: 2, expressions: 3, e: 4, EOF: 5, "=": 6, "+": 7, "-": 8, "*": 9, "/": 10, "^": 11, "<>": 12, ">": 13, "<": 14, ">=": 15, "<=": 16, "&": 17, "(": 18, ")": 19, ":": 20, IDENT: 21, SCOPE: 22, func: 23, array_literal: 24, TRUE: 25, FALSE: 26, STRING: 27, NUMBER: 28, "%": 29, range: 30, param_list: 31, ",": 32, ";": 33, FUNC: 34, "{": 35, "}": 36, $accept: 0, $end: 1 }, terminals_: { 2: "error", 5: "EOF", 6: "=", 7: "+", 8: "-", 9: "*", 10: "/", 11: "^", 12: "<>", 13: ">", 14: "<", 15: ">=", 16: "<=", 17: "&", 18: "(", 19: ")", 20: ":", 21: "IDENT", 22: "SCOPE", 25: "TRUE", 26: "FALSE", 27: "STRING", 28: "NUMBER", 29: "%", 32: ",", 33: ";", 34: "FUNC", 35: "{", 36: "}" }, productions_: [0, [3, 2], [3, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 2], [4, 3], [4, 2], [4, 3], [4, 3], [4, 1], [4, 2], [4, 1], [4, 1], [4, 1], [4, 1], [4, 1], [4, 2], [4, 1], [30, 3], [31, 1], [31, 3], [31, 3], [23, 4], [23, 3], [24, 3]], performAction: function(B, q, _, ut, rt, $, we) {
          var j = $.length - 1;
          switch (rt) {
            case 1:
            case 2:
              return $[j - 1];
            case 3:
              this.$ = { type: "operator", subtype: "infix-add", operands: [$[j - 2], $[j]] };
              break;
            case 4:
              this.$ = { type: "operator", subtype: "infix-subtract", operands: [$[j - 2], $[j]] };
              break;
            case 5:
              this.$ = { type: "operator", subtype: "infix-multiply", operands: [$[j - 2], $[j]] };
              break;
            case 6:
              this.$ = { type: "operator", subtype: "infix-divide", operands: [$[j - 2], $[j]] };
              break;
            case 7:
              this.$ = { type: "operator", subtype: "infix-power", operands: [$[j - 2], $[j]] };
              break;
            case 8:
              this.$ = { type: "operator", subtype: "infix-ne", operands: [$[j - 2], $[j]] };
              break;
            case 9:
              this.$ = { type: "operator", subtype: "infix-eq", operands: [$[j - 2], $[j]] };
              break;
            case 10:
              this.$ = { type: "operator", subtype: "infix-gt", operands: [$[j - 2], $[j]] };
              break;
            case 11:
              this.$ = { type: "operator", subtype: "infix-lt", operands: [$[j - 2], $[j]] };
              break;
            case 12:
              this.$ = { type: "operator", subtype: "infix-gte", operands: [$[j - 2], $[j]] };
              break;
            case 13:
              this.$ = { type: "operator", subtype: "infix-lte", operands: [$[j - 2], $[j]] };
              break;
            case 14:
              this.$ = { type: "operator", subtype: "prefix-plus", operands: [$[j]] };
              break;
            case 15:
              this.$ = { type: "operator", subtype: "infix-concat", operands: [$[j - 2], $[j]] };
              break;
            case 16:
              this.$ = { type: "operator", subtype: "prefix-minus", operands: [$[j]] };
              break;
            case 17:
              this.$ = { type: "group", exp: $[j - 1] };
              break;
            case 18:
              this.$ = { type: "range", subtype: "local", topLeft: $[j - 2], bottomRight: $[j] };
              break;
            case 19:
              this.$ = { type: "variable", name: $[j] };
              break;
            case 20:
              this.$ = { type: "variable", scope: $[j - 1], name: $[j] };
              break;
            case 21:
            case 22:
              this.$ = $[j];
              break;
            case 23:
              this.$ = { type: "value", subtype: "boolean", value: !0 };
              break;
            case 24:
              this.$ = { type: "value", subtype: "boolean", value: !1 };
              break;
            case 25:
              this.$ = { type: "value", subtype: "string", value: String(B) };
              break;
            case 26:
              this.$ = { type: "value", subtype: "number", value: $[j - 1] / 100 };
              break;
            case 27:
              this.$ = { type: "value", subtype: "number", value: Number(B) };
              break;
            case 29:
              this.$ = [$[j]];
              break;
            case 30:
              this.$ = $[j - 2].concat([$[j]]);
              break;
            case 31:
              this.$ = $[j][0].subtype !== "array" ? [{ type: "value", subtype: "array", items: $[j - 2] }, { type: "value", subtype: "array", items: $[j] }] : [{ type: "value", subtype: "array", items: $[j - 2] }].concat($[j]);
              break;
            case 32:
              this.$ = { type: "function", name: $[j - 3], args: $[j - 1] };
              break;
            case 33:
              this.$ = { type: "function", name: $[j - 2], args: [] };
              break;
            case 34:
              this.$ = { type: "value", subtype: "array", items: $[j - 1] };
              break;
          }
        }, table: [{ 3: 1, 4: 2, 6: [1, 3], 7: u, 8: f, 18: g, 21: y, 22: v, 23: 9, 24: 10, 25: A, 26: k, 27: C, 28: x, 34: T, 35: P }, { 1: [3] }, { 5: [1, 17], 6: tt, 7: G, 8: lt, 9: at, 10: X, 11: it, 12: ht, 13: ct, 14: kt, 15: O, 16: vt, 17: dt, 20: wt }, { 4: 31, 7: u, 8: f, 18: g, 21: y, 22: v, 23: 9, 24: 10, 25: A, 26: k, 27: C, 28: x, 34: T, 35: P }, { 4: 32, 7: u, 8: f, 18: g, 21: y, 22: v, 23: 9, 24: 10, 25: A, 26: k, 27: C, 28: x, 34: T, 35: P }, { 4: 33, 7: u, 8: f, 18: g, 21: y, 22: v, 23: 9, 24: 10, 25: A, 26: k, 27: C, 28: x, 34: T, 35: P }, { 4: 34, 7: u, 8: f, 18: g, 21: y, 22: v, 23: 9, 24: 10, 25: A, 26: k, 27: C, 28: x, 34: T, 35: P }, l(Ct, [2, 19]), { 21: [1, 35] }, l(Ct, [2, 21]), l(Ct, [2, 22]), l(Ct, [2, 23]), l(Ct, [2, 24]), l(Ct, [2, 25]), l(Ct, [2, 27], { 29: [1, 36] }), { 18: [1, 37] }, { 4: 39, 7: u, 8: f, 18: g, 21: y, 22: v, 23: 9, 24: 10, 25: A, 26: k, 27: C, 28: x, 31: 38, 34: T, 35: P }, { 1: [2, 1] }, { 4: 40, 7: u, 8: f, 18: g, 21: y, 22: v, 23: 9, 24: 10, 25: A, 26: k, 27: C, 28: x, 34: T, 35: P }, { 4: 41, 7: u, 8: f, 18: g, 21: y, 22: v, 23: 9, 24: 10, 25: A, 26: k, 27: C, 28: x, 34: T, 35: P }, { 4: 42, 7: u, 8: f, 18: g, 21: y, 22: v, 23: 9, 24: 10, 25: A, 26: k, 27: C, 28: x, 34: T, 35: P }, { 4: 43, 7: u, 8: f, 18: g, 21: y, 22: v, 23: 9, 24: 10, 25: A, 26: k, 27: C, 28: x, 34: T, 35: P }, { 4: 44, 7: u, 8: f, 18: g, 21: y, 22: v, 23: 9, 24: 10, 25: A, 26: k, 27: C, 28: x, 34: T, 35: P }, { 4: 45, 7: u, 8: f, 18: g, 21: y, 22: v, 23: 9, 24: 10, 25: A, 26: k, 27: C, 28: x, 34: T, 35: P }, { 4: 46, 7: u, 8: f, 18: g, 21: y, 22: v, 23: 9, 24: 10, 25: A, 26: k, 27: C, 28: x, 34: T, 35: P }, { 4: 47, 7: u, 8: f, 18: g, 21: y, 22: v, 23: 9, 24: 10, 25: A, 26: k, 27: C, 28: x, 34: T, 35: P }, { 4: 48, 7: u, 8: f, 18: g, 21: y, 22: v, 23: 9, 24: 10, 25: A, 26: k, 27: C, 28: x, 34: T, 35: P }, { 4: 49, 7: u, 8: f, 18: g, 21: y, 22: v, 23: 9, 24: 10, 25: A, 26: k, 27: C, 28: x, 34: T, 35: P }, { 4: 50, 7: u, 8: f, 18: g, 21: y, 22: v, 23: 9, 24: 10, 25: A, 26: k, 27: C, 28: x, 34: T, 35: P }, { 4: 51, 7: u, 8: f, 18: g, 21: y, 22: v, 23: 9, 24: 10, 25: A, 26: k, 27: C, 28: x, 34: T, 35: P }, { 4: 52, 7: u, 8: f, 18: g, 21: y, 22: v, 23: 9, 24: 10, 25: A, 26: k, 27: C, 28: x, 34: T, 35: P }, { 5: [1, 53], 6: tt, 7: G, 8: lt, 9: at, 10: X, 11: it, 12: ht, 13: ct, 14: kt, 15: O, 16: vt, 17: dt, 20: wt }, l(mt, [2, 14], { 9: at, 10: X, 11: it, 20: wt }), l(mt, [2, 16], { 9: at, 10: X, 11: it, 20: wt }), { 6: tt, 7: G, 8: lt, 9: at, 10: X, 11: it, 12: ht, 13: ct, 14: kt, 15: O, 16: vt, 17: dt, 19: [1, 54], 20: wt }, l(Ct, [2, 20]), l(Ct, [2, 26]), { 4: 39, 7: u, 8: f, 18: g, 19: [1, 56], 21: y, 22: v, 23: 9, 24: 10, 25: A, 26: k, 27: C, 28: x, 31: 55, 34: T, 35: P }, { 32: se, 33: pe, 36: [1, 57] }, l(ft, [2, 29], { 6: tt, 7: G, 8: lt, 9: at, 10: X, 11: it, 12: ht, 13: ct, 14: kt, 15: O, 16: vt, 17: dt, 20: wt }), l(mt, [2, 3], { 9: at, 10: X, 11: it, 20: wt }), l(mt, [2, 4], { 9: at, 10: X, 11: it, 20: wt }), l(Ot, [2, 5], { 11: it, 20: wt }), l(Ot, [2, 6], { 11: it, 20: wt }), l([5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 32, 33, 36], [2, 7], { 20: wt }), l(Lt, [2, 8], { 7: G, 8: lt, 9: at, 10: X, 11: it, 17: dt, 20: wt }), l(Lt, [2, 9], { 7: G, 8: lt, 9: at, 10: X, 11: it, 17: dt, 20: wt }), l(Lt, [2, 10], { 7: G, 8: lt, 9: at, 10: X, 11: it, 17: dt, 20: wt }), l(Lt, [2, 11], { 7: G, 8: lt, 9: at, 10: X, 11: it, 17: dt, 20: wt }), l(Lt, [2, 12], { 7: G, 8: lt, 9: at, 10: X, 11: it, 17: dt, 20: wt }), l(Lt, [2, 13], { 7: G, 8: lt, 9: at, 10: X, 11: it, 17: dt, 20: wt }), l([5, 6, 12, 13, 14, 15, 16, 17, 19, 32, 33, 36], [2, 15], { 7: G, 8: lt, 9: at, 10: X, 11: it, 20: wt }), l(Ct, [2, 18]), { 1: [2, 2] }, l(Ct, [2, 17]), { 19: [1, 60], 32: se, 33: pe }, l(Ct, [2, 33]), l(Ct, [2, 34]), { 4: 61, 7: u, 8: f, 18: g, 21: y, 22: v, 23: 9, 24: 10, 25: A, 26: k, 27: C, 28: x, 34: T, 35: P }, { 4: 39, 7: u, 8: f, 18: g, 21: y, 22: v, 23: 9, 24: 10, 25: A, 26: k, 27: C, 28: x, 31: 62, 34: T, 35: P }, l(Ct, [2, 32]), l(ft, [2, 30], { 6: tt, 7: G, 8: lt, 9: at, 10: X, 11: it, 12: ht, 13: ct, 14: kt, 15: O, 16: vt, 17: dt, 20: wt }), l([19, 36], [2, 31], { 32: se, 33: pe })], defaultActions: { 17: [2, 1], 53: [2, 2] }, parseError: function(B, q) {
          if (q.recoverable)
            this.trace(B);
          else {
            var _ = new Error(B);
            throw _.hash = q, _;
          }
        }, parse: function(B) {
          var q = this, _ = [0], ut = [null], rt = [], $ = this.table, we = "", j = 0, zt = 0, le = 2, Eo = 1, En = rt.slice.call(arguments, 1), _t = Object.create(this.lexer), Oi = { yy: {} };
          for (var Sl in this.yy)
            Object.prototype.hasOwnProperty.call(this.yy, Sl) && (Oi.yy[Sl] = this.yy[Sl]);
          _t.setInput(B, Oi.yy), Oi.yy.lexer = _t, Oi.yy.parser = this, typeof _t.yylloc > "u" && (_t.yylloc = {});
          var Al = _t.yylloc;
          rt.push(Al);
          var Tc = _t.options && _t.options.ranges;
          typeof Oi.yy.parseError == "function" ? this.parseError = Oi.yy.parseError : this.parseError = Object.getPrototypeOf(this).parseError;
          for (var xc = function() {
            var On;
            return On = _t.lex() || Eo, typeof On != "number" && (On = q.symbols_[On] || On), On;
          }, fe, Ti, Se, kl, Mn = {}, Mo, Ze, ih, Oo; ; ) {
            if (Ti = _[_.length - 1], this.defaultActions[Ti] ? Se = this.defaultActions[Ti] : ((fe === null || typeof fe > "u") && (fe = xc()), Se = $[Ti] && $[Ti][fe]), typeof Se > "u" || !Se.length || !Se[0]) {
              var Cl = "";
              Oo = [];
              for (Mo in $[Ti])
                this.terminals_[Mo] && Mo > le && Oo.push("'" + this.terminals_[Mo] + "'");
              _t.showPosition ? Cl = "Parse error on line " + (j + 1) + `:
` + _t.showPosition() + `
Expecting ` + Oo.join(", ") + ", got '" + (this.terminals_[fe] || fe) + "'" : Cl = "Parse error on line " + (j + 1) + ": Unexpected " + (fe == Eo ? "end of input" : "'" + (this.terminals_[fe] || fe) + "'"), this.parseError(Cl, { text: _t.match, token: this.terminals_[fe] || fe, line: _t.yylineno, loc: Al, expected: Oo });
            }
            if (Se[0] instanceof Array && Se.length > 1)
              throw new Error("Parse Error: multiple actions possible at state: " + Ti + ", token: " + fe);
            switch (Se[0]) {
              case 1:
                _.push(fe), ut.push(_t.yytext), rt.push(_t.yylloc), _.push(Se[1]), fe = null, zt = _t.yyleng, we = _t.yytext, j = _t.yylineno, Al = _t.yylloc;
                break;
              case 2:
                if (Ze = this.productions_[Se[1]][1], Mn.$ = ut[ut.length - Ze], Mn._$ = { first_line: rt[rt.length - (Ze || 1)].first_line, last_line: rt[rt.length - 1].last_line, first_column: rt[rt.length - (Ze || 1)].first_column, last_column: rt[rt.length - 1].last_column }, Tc && (Mn._$.range = [rt[rt.length - (Ze || 1)].range[0], rt[rt.length - 1].range[1]]), kl = this.performAction.apply(Mn, [we, zt, j, Oi.yy, Se[1], ut, rt].concat(En)), typeof kl < "u")
                  return kl;
                Ze && (_ = _.slice(0, -1 * Ze * 2), ut = ut.slice(0, -1 * Ze), rt = rt.slice(0, -1 * Ze)), _.push(this.productions_[Se[1]][0]), ut.push(Mn.$), rt.push(Mn._$), ih = $[_[_.length - 2]][_[_.length - 1]], _.push(ih);
                break;
              case 3:
                return !0;
            }
          }
          return !0;
        } }, oe = /* @__PURE__ */ function() {
          var yt = { EOF: 1, parseError: function(q, _) {
            if (this.yy.parser)
              this.yy.parser.parseError(q, _);
            else
              throw new Error(q);
          }, setInput: function(B, q) {
            return this.yy = q || this.yy || {}, this._input = B, this._more = this._backtrack = this.done = !1, this.yylineno = this.yyleng = 0, this.yytext = this.matched = this.match = "", this.conditionStack = ["INITIAL"], this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 }, this.options.ranges && (this.yylloc.range = [0, 0]), this.offset = 0, this;
          }, input: function() {
            var B = this._input[0];
            this.yytext += B, this.yyleng++, this.offset++, this.match += B, this.matched += B;
            var q = B.match(/(?:\r\n?|\n).*/g);
            return q ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), B;
          }, unput: function(B) {
            var q = B.length, _ = B.split(/(?:\r\n?|\n)/g);
            this._input = B + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - q), this.offset -= q;
            var ut = this.match.split(/(?:\r\n?|\n)/g);
            this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), _.length - 1 && (this.yylineno -= _.length - 1);
            var rt = this.yylloc.range;
            return this.yylloc = { first_line: this.yylloc.first_line, last_line: this.yylineno + 1, first_column: this.yylloc.first_column, last_column: _ ? (_.length === ut.length ? this.yylloc.first_column : 0) + ut[ut.length - _.length].length - _[0].length : this.yylloc.first_column - q }, this.options.ranges && (this.yylloc.range = [rt[0], rt[0] + this.yyleng - q]), this.yyleng = this.yytext.length, this;
          }, more: function() {
            return this._more = !0, this;
          }, reject: function() {
            if (this.options.backtrack_lexer)
              this._backtrack = !0;
            else
              return this.parseError("Lexical error on line " + (this.yylineno + 1) + `. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
` + this.showPosition(), { text: "", token: null, line: this.yylineno });
            return this;
          }, less: function(B) {
            this.unput(this.match.slice(B));
          }, pastInput: function() {
            var B = this.matched.substr(0, this.matched.length - this.match.length);
            return (B.length > 20 ? "..." : "") + B.substr(-20).replace(/\n/g, "");
          }, upcomingInput: function() {
            var B = this.match;
            return B.length < 20 && (B += this._input.substr(0, 20 - B.length)), (B.substr(0, 20) + (B.length > 20 ? "..." : "")).replace(/\n/g, "");
          }, showPosition: function() {
            var B = this.pastInput(), q = new Array(B.length + 1).join("-");
            return B + this.upcomingInput() + `
` + q + "^";
          }, test_match: function(B, q) {
            var _, ut, rt;
            if (this.options.backtrack_lexer && (rt = { yylineno: this.yylineno, yylloc: { first_line: this.yylloc.first_line, last_line: this.last_line, first_column: this.yylloc.first_column, last_column: this.yylloc.last_column }, yytext: this.yytext, match: this.match, matches: this.matches, matched: this.matched, yyleng: this.yyleng, offset: this.offset, _more: this._more, _input: this._input, yy: this.yy, conditionStack: this.conditionStack.slice(0), done: this.done }, this.options.ranges && (rt.yylloc.range = this.yylloc.range.slice(0))), ut = B[0].match(/(?:\r\n?|\n).*/g), ut && (this.yylineno += ut.length), this.yylloc = { first_line: this.yylloc.last_line, last_line: this.yylineno + 1, first_column: this.yylloc.last_column, last_column: ut ? ut[ut.length - 1].length - ut[ut.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + B[0].length }, this.yytext += B[0], this.match += B[0], this.matches = B, this.yyleng = this.yytext.length, this.options.ranges && (this.yylloc.range = [this.offset, this.offset += this.yyleng]), this._more = !1, this._backtrack = !1, this._input = this._input.slice(B[0].length), this.matched += B[0], _ = this.performAction.call(this, this.yy, this, q, this.conditionStack[this.conditionStack.length - 1]), this.done && this._input && (this.done = !1), _)
              return _;
            if (this._backtrack) {
              for (var $ in rt)
                this[$] = rt[$];
              return !1;
            }
            return !1;
          }, next: function() {
            if (this.done)
              return this.EOF;
            this._input || (this.done = !0);
            var B, q, _, ut;
            this._more || (this.yytext = "", this.match = "");
            for (var rt = this._currentRules(), $ = 0; $ < rt.length; $++)
              if (_ = this._input.match(this.rules[rt[$]]), _ && (!q || _[0].length > q[0].length)) {
                if (q = _, ut = $, this.options.backtrack_lexer) {
                  if (B = this.test_match(_, rt[$]), B !== !1)
                    return B;
                  if (this._backtrack) {
                    q = !1;
                    continue;
                  } else
                    return !1;
                } else if (!this.options.flex)
                  break;
              }
            return q ? (B = this.test_match(q, rt[ut]), B !== !1 ? B : !1) : this._input === "" ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + `. Unrecognized text.
` + this.showPosition(), { text: "", token: null, line: this.yylineno });
          }, lex: function() {
            var q = this.next();
            return q || this.lex();
          }, begin: function(q) {
            this.conditionStack.push(q);
          }, popState: function() {
            var q = this.conditionStack.length - 1;
            return q > 0 ? this.conditionStack.pop() : this.conditionStack[0];
          }, _currentRules: function() {
            return this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1] ? this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules : this.conditions.INITIAL.rules;
          }, topState: function(q) {
            return q = this.conditionStack.length - 1 - Math.abs(q || 0), q >= 0 ? this.conditionStack[q] : "INITIAL";
          }, pushState: function(q) {
            this.begin(q);
          }, stateStackSize: function() {
            return this.conditionStack.length;
          }, options: {}, performAction: function(q, _, ut, rt) {
            switch (ut) {
              case 0:
                break;
              case 1:
                return 28;
              case 2:
                return 25;
              case 3:
                return 26;
              case 4:
                return 25;
              case 5:
                return 26;
              case 6:
                return 25;
              case 7:
                return 26;
              case 8:
                return 9;
              case 9:
                return 10;
              case 10:
                return 8;
              case 11:
                return 7;
              case 12:
                return 17;
              case 13:
                return 11;
              case 14:
                return 18;
              case 15:
                return 19;
              case 16:
                return ">=";
              case 17:
                return "<=";
              case 18:
                return "<>";
              case 19:
                return "=";
              case 20:
                return ">";
              case 21:
                return "<";
              case 22:
                return "{";
              case 23:
                return "}";
              case 24:
                return "!";
              case 25:
                return ",";
              case 26:
                return ":";
              case 27:
                return ";";
              case 28:
                return "%";
              case 29:
                return 34;
              case 30:
                return 34;
              case 31:
                return _.yytext = _.yytext.substr(1, _.yyleng - 2).replace(/\"\"/g, '"'), "STRING";
              case 32:
                return _.yytext = _.yytext.substr(2, _.yyleng - 3).replace(/\"\"/g, '"'), "SCOPE";
              case 33:
                return _.yytext = _.yytext.substr(1, _.yyleng - 3).replace(/\"\"/g, '"'), "SCOPE";
              case 34:
                return _.yytext = _.yytext.slice(0, -1), "SCOPE";
              case 35:
                return _.yytext = _.yytext.slice(1, -1), "SCOPE";
              case 36:
                return 21;
              case 37:
                return 5;
              case 38:
                return "INVALID";
            }
          }, rules: [/^(?:\s+)/, /^(?:[0-9]+(\.[0-9]+)?\b)/, /^(?:TRUE\b)/, /^(?:FALSE\b)/, /^(?:true\b)/, /^(?:false\b)/, /^(?:True\b)/, /^(?:False\b)/, /^(?:\*)/, /^(?:\/)/, /^(?:-)/, /^(?:\+)/, /^(?:&)/, /^(?:\^)/, /^(?:\()/, /^(?:\))/, /^(?:>=)/, /^(?:<=)/, /^(?:<>)/, /^(?:=)/, /^(?:>)/, /^(?:<)/, /^(?:\{)/, /^(?:\})/, /^(?:!)/, /^(?:,)/, /^(?::)/, /^(?:;)/, /^(?:%)/, /^(?:[A-Za-z](?=[(]))/, /^(?:[A-Za-z][A-Za-z0-9\.]+(?=[(]))/, /^(?:"(?:""|[^"])*")/, /^(?:\$'(?:''|[^'])*'!)/, /^(?:'(?:''|[^'])*'!)/, /^(?:[a-zA-Z]([a-zA-Z0-9_.$]+)?!)/, /^(?:\$([a-zA-Z])([a-zA-Z0-9_.$]+)?!)/, /^(?:([\[\]a-zA-Z0-9_.$^@\(]+))/, /^(?:$)/, /^(?:.)/], conditions: { INITIAL: { rules: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38], inclusive: !0 } } };
          return yt;
        }();
        Gt.lexer = oe;
        function Pe() {
          this.yy = {};
        }
        return Pe.prototype = Gt, Gt.Parser = Pe, new Pe();
      }();
      function I() {
        return R.parse.apply(R, arguments);
      }
      function D(l, u) {
        for (var f = [], g = arguments.length - 2; g-- > 0; ) f[g] = arguments[g + 2];
        return l.reduce.apply(l, [u].concat(f));
      }
      function N() {
        for (var l = [], u = arguments.length; u--; ) l[u] = arguments[u];
        return D(l, function(f, g) {
          return f === !0 ? !0 : g instanceof Error;
        }, !1);
      }
      function W(l) {
        return l && Object.prototype.toString.call(l) == "[object AsyncFunction]";
      }
      function L(l) {
        return l && Object.prototype.toString.call(l) == "[object Function]" || W(l);
      }
      function nt() {
        for (var l = [], u = arguments.length; u--; ) l[u] = arguments[u];
        return D(l, function(f, g) {
          if (N(f))
            return f;
          if (f === 0 || f === !1)
            return !1;
          var y = L(g) ? g() : g;
          return y === !0 || y === !1 || y === 1 || y === 0 ? y === !0 || y === 1 : w.value;
        }, void 0);
      }
      function et(l) {
        return Number.isNaN ? Number.isNaN(l) : typeof l == "number" && isNaN(l);
      }
      function gt(l) {
        return l === !1 || l === 0 || l === "" || typeof l > "u" || l === null || et(l);
      }
      function Q(l) {
        return !gt(l);
      }
      function z() {
        for (var l = [], u = arguments.length; u--; ) l[u] = arguments[u];
        var f = !1;
        return D(l, function(g, y, v) {
          var A;
          return f === !0 ? g : v === l.length - 1 ? v % 2 === 1 ? void 0 : L(y) ? y() : y : v % 2 === 0 && (L(y) && Q(y()) || !L(y) && Q(y)) ? (f = !0, A = l[v + 1], L(A) ? A() : A) : g;
        }, void 0);
      }
      function ot(l) {
        return typeof l == "string";
      }
      function Y(l) {
        return typeof l > "u" || l === null;
      }
      function K(l) {
        return Object.prototype.toString.call(l) === "[object Array]";
      }
      function qt(l, u) {
        return typeof l == "string" && typeof u == "string" ? l.toLowerCase() === u.toLowerCase() : l === u;
      }
      function Be(l, u) {
        return Y(l) && Y(u) || !K(u) ? w.na : u.some(function(f) {
          return qt(f, l);
        });
      }
      function Ui(l, u) {
        var f = arguments;
        if (l == null)
          return w.nil;
        for (var g = Object(l), y = 1; y < arguments.length; y++) {
          var v = f[y];
          if (v != null)
            for (var A in v)
              Object.prototype.hasOwnProperty.call(v, A) && (g[A] = v[A]);
        }
        return g;
      }
      function Yt(l) {
        for (var u = [], f = arguments.length - 1; f-- > 0; ) u[f] = arguments[f + 1];
        var g = Object.assign || Ui;
        return g.apply(void 0, [{}, l].concat(u));
      }
      var wi = { upCase: !0, visit: function() {
      }, labelEQ: "=", labelNE: "<>", labelGT: ">", labelGTE: ">=", labelLT: "<", labelLTE: "<=", renderMINUS: function() {
        return "-";
      }, renderPLUS: function() {
        return "+";
      }, renderEQ: function() {
        return " = ";
      }, renderNE: function() {
        return " <> ";
      }, renderGT: function() {
        return " > ";
      }, renderGTE: function() {
        return " >= ";
      }, renderLT: function() {
        return " < ";
      }, renderLTE: function() {
        return " <= ";
      }, renderADD: function() {
        return " + ";
      }, renderSUBTRACT: function() {
        return " - ";
      }, renderMULTIPLY: function() {
        return " * ";
      }, renderDIVIDE: function() {
        return " / ";
      }, renderPOWER: function() {
        return " ^ ";
      }, renderCONCAT: function() {
        return " & ";
      }, renderGroupBegin: function() {
        return "(";
      }, renderGroupEnd: function() {
        return ")";
      }, renderGroup: function(l, u, f) {
        return "" + l.renderGroupBegin(l, u, f) + Bt(l, u.exp, f + 1) + l.renderGroupEnd(l, u, f);
      }, renderFunctionBegin: function(l, u, f) {
        return l.upCase ? u.name.toUpperCase() : u.name;
      }, renderFunctionEnd: function(l, u, f) {
        return ")";
      }, renderFunction: function(l, u, f) {
        return l.renderFunctionBegin(l, u, f) + "(" + u.args.map(function(g) {
          return Bt(l, g, f + 1);
        }).join(", ") + l.renderFunctionEnd(l, u, f);
      }, renderOperator: function(l, u, f) {
        var g = u.subtype, y = u.operands;
        return z(y.length == 1, function() {
          return "" + z(g == "prefix-minus", l.renderMINUS(l, f), g == "prefix-plus", l.renderPLUS(l, f)) + Bt(l, y[0], f + 1);
        }, y.length === 2, function() {
          return "" + Bt(l, y[0], f + 1) + z(g == "infix-eq", l.renderEQ(l, { operands: y }, f), g == "infix-ne", l.renderNE(l, { operands: y }, f), g == "infix-gt", l.renderGT(l, { operands: y }, f), g == "infix-gte", l.renderGTE(l, { operands: y }, f), g == "infix-lt", l.renderLT(l, { operands: y }, f), g == "infix-lte", l.renderLTE(l, { operands: y }, f), g == "infix-add", l.renderADD(l, { operands: y }, f), g == "infix-subtract", l.renderSUBTRACT(l, { operands: y }, f), g == "infix-multiply", l.renderMULTIPLY(l, { operands: y }, f), g == "infix-divide", l.renderDIVIDE(l, { operands: y }, f), g == "infix-power", l.renderPOWER(l, { operands: y }, f), g == "infix-concat", l.renderCONCAT(l, { operands: y }, f)) + Bt(l, y[1], f + 1);
        });
      }, renderRangeBetween: function() {
        return ":";
      }, renderRange: function(l, u, f) {
        var g = u.topLeft, y = u.bottomRight;
        return "" + Bt(l, g, f) + l.renderRangeBetween(l, { topLeft: g, bottomRight: y }, f) + Bt(l, y, f);
      }, renderVariable: function(l, u, f) {
        var g = u.scope, y = u.name;
        return (g ? g + "!" : "") + y;
      }, renderString: function(l) {
        return '"' + l.replace(/\"/g, '""') + '"';
      }, renderNumber: function(l) {
        return l.toString();
      }, renderBoolean: function(l) {
        return l ? "TRUE" : "FALSE";
      }, renderValue: function(l, u, f) {
        var g = u.subtype, y = u.items, v = u.value;
        return z(g === "string", function() {
          return l.renderString(v);
        }, g === "number", function() {
          return l.renderNumber(v);
        }, g === "boolean", function() {
          return l.renderBoolean(v);
        }, g === "array", function() {
          return "" + l.renderArray(l, { items: y }, f);
        });
      }, renderArray: function(l, u, f) {
        var g = u.items;
        return "{" + g.map(function(y) {
          return l.renderValue(l, y, f + 1);
        }).join(",") + "}";
      }, renderRule: function(l, u, f) {
        f === void 0 && (f = 0);
        var g = u.type, y = l.renderGroup, v = l.renderFunction, A = l.renderOperator, k = l.renderVariable, C = l.renderValue;
        return l.visit(l, u, f), l.walk = Bt, z(g === "group", function() {
          return y(l, u, f);
        }, g === "function", function() {
          return v(l, u, f);
        }, g === "operator", function() {
          return A(l, u, f);
        }, g === "variable", function() {
          return k(l, u, f);
        }, g === "value", function() {
          return C(l, u, l, f);
        }, g === "range", function() {
          return renderRange(l, u, l, f);
        });
      } };
      function Ft(l, u, f, g) {
        var y = f.operands;
        return f.subtype, l + "(" + Bt(u, y[0], g + 1) + ", " + Bt(u, y[1], g + 1) + ")";
      }
      var Ut = Yt(wi, { renderOperator: function(l, u, f) {
        var g = u.subtype, y = u.operands;
        return z(g == "prefix-minus", "MINUS(" + Bt(l, y[0], f + 1) + ")", g == "prefix-plus", "PLUS(" + Bt(l, y[0], f + 1) + ")", g == "infix-eq", Ft("EQ", l, { operands: y, subtype: g }, f), g == "infix-ne", Ft("NE", l, { operands: y, subtype: g }, f), g == "infix-gt", Ft("GT", l, { operands: y, subtype: g }, f), g == "infix-gte", Ft("GTE", l, { operands: y, subtype: g }, f), g == "infix-lt", Ft("LT", l, { operands: y, subtype: g }, f), g == "infix-lte", Ft("LTE", l, { operands: y, subtype: g }, f), g == "infix-add", Ft("ADD", l, { operands: y, subtype: g }, f), g == "infix-subtract", Ft("SUBTRACT", l, { operands: y, subtype: g }, f), g == "infix-multiply", Ft("MULTIPLY", l, { operands: y, subtype: g }, f), g == "infix-divide", Ft("DIVIDE", l, { operands: y, subtype: g }, f), g == "infix-power", Ft("POWER", l, { operands: y, subtype: g }, f), g == "infix-concat", Ft("CONCATENATE", l, { operands: y, subtype: g }, f));
      } }), he = Yt(Ut, { renderVariable: function(l, u, f) {
        return u.scope ? 'context.get("' + u.name + '", "' + u.scope + '")' : 'context.get("' + u.name + '")';
      }, renderFunctionBegin: function(l, u) {
        return "Formula." + Ut.renderFunctionBegin(l, u);
      }, renderArray: function(l, u, f) {
        return "[" + u.map(function(g) {
          return l.walk(l, g, f + 1);
        }) + "]";
      }, renderValue: function(l, u, f) {
        var g = u.subtype, y = u.items, v = u.value;
        return z(g === "string", function() {
          return '"' + v.replace(/\"/g, '\\"') + '"';
        }, g === "number", function() {
          return "" + v;
        }, g === "boolean", function() {
          return v ? "true" : "false";
        }, g === "array", function() {
          return l.renderArray(l, y, f);
        });
      } });
      function Bt(l, u, f) {
        f === void 0 && (f = 0);
        var g = u;
        if (g)
          return ot(u) && (g = I(u)), l.renderRule(l, g, f);
      }
      var De = function(l) {
        return l === void 0 && (l = wi), function(u) {
          return Bt(l, u);
        };
      };
      function Nt(l, u) {
        return l.map(u);
      }
      function Re(l) {
        return D(l, function(u, f) {
          return u.indexOf(f) < 0 && u.push(f), u;
        }, []);
      }
      var Qf = 0;
      function zn(l) {
        var u = l, f, g = [], y = [];
        typeof u == "string" && (u = I(l));
        var v = De(Ut), A = De(Yt(he, { visit: function(T, P, tt) {
          P.type === "variable" && g.push(P), P.type === "function" && y.push(P.name);
        } })), k = v(u), C = A(k), x = Qf++;
        return g = Re(g.map(JSON.stringify)).map(JSON.parse), y = Re(y.map(JSON.stringify)).map(JSON.parse), f = new Function("context", "Formula", "/* formula: " + l + ` */
return ` + C + `;
//# sourceURL=formula_` + x + `
`), f.id = x, f.exp = l, f.exp = k, f.exp = l, f.ast = u, f.code = C, f.precedents = g, f.requires = y, f;
      }
      function Ne(l) {
        "@babel/helpers - typeof";
        return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Ne = function(u) {
          return typeof u;
        } : Ne = function(u) {
          return u && typeof Symbol == "function" && u.constructor === Symbol && u !== Symbol.prototype ? "symbol" : typeof u;
        }, Ne(l);
      }
      function Zf(l, u) {
        if (!(l instanceof u))
          throw new TypeError("Cannot call a class as a function");
      }
      function tc(l, u) {
        if (typeof u != "function" && u !== null)
          throw new TypeError("Super expression must either be null or a function");
        l.prototype = Object.create(u && u.prototype, { constructor: { value: l, writable: !0, configurable: !0 } }), u && $n(l, u);
      }
      function _n(l) {
        return _n = Object.setPrototypeOf ? Object.getPrototypeOf : function(f) {
          return f.__proto__ || Object.getPrototypeOf(f);
        }, _n(l);
      }
      function $n(l, u) {
        return $n = Object.setPrototypeOf || function(g, y) {
          return g.__proto__ = y, g;
        }, $n(l, u);
      }
      function Ka() {
        if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
          return !1;
        if (typeof Proxy == "function")
          return !0;
        try {
          return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
          })), !0;
        } catch {
          return !1;
        }
      }
      function jn(l, u, f) {
        return Ka() ? jn = Reflect.construct : jn = function(y, v, A) {
          var k = [null];
          k.push.apply(k, v);
          var C = Function.bind.apply(y, k), x = new C();
          return A && $n(x, A.prototype), x;
        }, jn.apply(null, arguments);
      }
      function ec(l) {
        return Function.toString.call(l).indexOf("[native code]") !== -1;
      }
      function yl(l) {
        var u = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
        return yl = function(g) {
          if (g === null || !ec(g))
            return g;
          if (typeof g != "function")
            throw new TypeError("Super expression must either be null or a function");
          if (typeof u < "u") {
            if (u.has(g))
              return u.get(g);
            u.set(g, y);
          }
          function y() {
            return jn(g, arguments, _n(this).constructor);
          }
          return y.prototype = Object.create(g.prototype, { constructor: { value: y, enumerable: !1, writable: !0, configurable: !0 } }), $n(y, g);
        }, yl(l);
      }
      function ic(l) {
        if (l === void 0)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return l;
      }
      function nc(l, u) {
        return u && (typeof u == "object" || typeof u == "function") ? u : ic(l);
      }
      function rc(l) {
        var u = Ka();
        return function() {
          var g = _n(l), y;
          if (u) {
            var v = _n(this).constructor;
            y = Reflect.construct(g, arguments, v);
          } else
            y = g.apply(this, arguments);
          return nc(this, y);
        };
      }
      function qa(l) {
        return sc(l) || oc(l) || Ya(l) || lc();
      }
      function sc(l) {
        if (Array.isArray(l))
          return bl(l);
      }
      function oc(l) {
        if (typeof Symbol < "u" && l[Symbol.iterator] != null || l["@@iterator"] != null)
          return Array.from(l);
      }
      function Ya(l, u) {
        if (l) {
          if (typeof l == "string")
            return bl(l, u);
          var f = Object.prototype.toString.call(l).slice(8, -1);
          if (f === "Object" && l.constructor && (f = l.constructor.name), f === "Map" || f === "Set")
            return Array.from(l);
          if (f === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(f))
            return bl(l, u);
        }
      }
      function bl(l, u) {
        (u == null || u > l.length) && (u = l.length);
        for (var f = 0, g = new Array(u); f < u; f++)
          g[f] = l[f];
        return g;
      }
      function lc() {
        throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      function ac(l, u) {
        var f = typeof Symbol < "u" && l[Symbol.iterator] || l["@@iterator"];
        if (!f) {
          if (Array.isArray(l) || (f = Ya(l)) || u) {
            f && (l = f);
            var g = 0, y = function() {
            };
            return { s: y, n: function() {
              return g >= l.length ? { done: !0 } : { done: !1, value: l[g++] };
            }, e: function(C) {
              throw C;
            }, f: y };
          }
          throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }
        var v = !0, A = !1, k;
        return { s: function() {
          f = f.call(l);
        }, n: function() {
          var C = f.next();
          return v = C.done, C;
        }, e: function(C) {
          A = !0, k = C;
        }, f: function() {
          try {
            !v && f.return != null && f.return();
          } finally {
            if (A)
              throw k;
          }
        } };
      }
      var ue = Object.prototype.hasOwnProperty;
      function Kn(l, u) {
        return l = l.slice(), l.push(u), l;
      }
      function zi(l, u) {
        return u = u.slice(), u.unshift(l), u;
      }
      var hc = function(l) {
        tc(f, l);
        var u = rc(f);
        function f(g) {
          var y;
          return Zf(this, f), y = u.call(this, 'JSONPath should not be called with "new" (it prevents return of (unwrapped) scalar values)'), y.avoidNew = !0, y.value = g, y.name = "NewError", y;
        }
        return f;
      }(yl(Error));
      function Mt(l, u, f, g, y) {
        if (!(this instanceof Mt))
          try {
            return new Mt(l, u, f, g, y);
          } catch (C) {
            if (!C.avoidNew)
              throw C;
            return C.value;
          }
        typeof l == "string" && (y = g, g = f, f = u, u = l, l = null);
        var v = l && Ne(l) === "object";
        if (l = l || {}, this.json = l.json || f, this.path = l.path || u, this.resultType = l.resultType || "value", this.flatten = l.flatten || !1, this.wrap = ue.call(l, "wrap") ? l.wrap : !0, this.sandbox = l.sandbox || {}, this.preventEval = l.preventEval || !1, this.parent = l.parent || null, this.parentProperty = l.parentProperty || null, this.callback = l.callback || g || null, this.otherTypeCallback = l.otherTypeCallback || y || function() {
          throw new TypeError("You must supply an otherTypeCallback callback option with the @other() operator.");
        }, l.autostart !== !1) {
          var A = { path: v ? l.path : u };
          v ? "json" in l && (A.json = l.json) : A.json = f;
          var k = this.evaluate(A);
          if (!k || Ne(k) !== "object")
            throw new hc(k);
          return k;
        }
      }
      Mt.prototype.evaluate = function(l, u, f, g) {
        var y = this, v = this.parent, A = this.parentProperty, k = this.flatten, C = this.wrap;
        if (this.currResultType = this.resultType, this.currPreventEval = this.preventEval, this.currSandbox = this.sandbox, f = f || this.callback, this.currOtherTypeCallback = g || this.otherTypeCallback, u = u || this.json, l = l || this.path, l && Ne(l) === "object" && !Array.isArray(l)) {
          if (!l.path && l.path !== "")
            throw new TypeError('You must supply a "path" property when providing an object argument to JSONPath.evaluate().');
          if (!ue.call(l, "json"))
            throw new TypeError('You must supply a "json" property when providing an object argument to JSONPath.evaluate().');
          var x = l;
          u = x.json, k = ue.call(l, "flatten") ? l.flatten : k, this.currResultType = ue.call(l, "resultType") ? l.resultType : this.currResultType, this.currSandbox = ue.call(l, "sandbox") ? l.sandbox : this.currSandbox, C = ue.call(l, "wrap") ? l.wrap : C, this.currPreventEval = ue.call(l, "preventEval") ? l.preventEval : this.currPreventEval, f = ue.call(l, "callback") ? l.callback : f, this.currOtherTypeCallback = ue.call(l, "otherTypeCallback") ? l.otherTypeCallback : this.currOtherTypeCallback, v = ue.call(l, "parent") ? l.parent : v, A = ue.call(l, "parentProperty") ? l.parentProperty : A, l = l.path;
        }
        if (v = v || null, A = A || null, Array.isArray(l) && (l = Mt.toPathString(l)), !(!l && l !== "" || !u)) {
          var T = Mt.toPathArray(l);
          T[0] === "$" && T.length > 1 && T.shift(), this._hasParentSelector = null;
          var P = this._trace(T, u, ["$"], v, A, f).filter(function(tt) {
            return tt && !tt.isParentSelector;
          });
          return P.length ? !C && P.length === 1 && !P[0].hasArrExpr ? this._getPreferredOutput(P[0]) : P.reduce(function(tt, G) {
            var lt = y._getPreferredOutput(G);
            return k && Array.isArray(lt) ? tt = tt.concat(lt) : tt.push(lt), tt;
          }, []) : C ? [] : void 0;
        }
      }, Mt.prototype._getPreferredOutput = function(l) {
        var u = this.currResultType;
        switch (u) {
          case "all": {
            var f = Array.isArray(l.path) ? l.path : Mt.toPathArray(l.path);
            return l.pointer = Mt.toPointer(f), l.path = typeof l.path == "string" ? l.path : Mt.toPathString(l.path), l;
          }
          case "value":
          case "parent":
          case "parentProperty":
            return l[u];
          case "path":
            return Mt.toPathString(l[u]);
          case "pointer":
            return Mt.toPointer(l.path);
          default:
            throw new TypeError("Unknown result type");
        }
      }, Mt.prototype._handleCallback = function(l, u, f) {
        if (u) {
          var g = this._getPreferredOutput(l);
          l.path = typeof l.path == "string" ? l.path : Mt.toPathString(l.path), u(g, f, l);
        }
      }, Mt.prototype._trace = function(l, u, f, g, y, v, A, k) {
        var C = this, x;
        if (!l.length)
          return x = { path: f, value: u, parent: g, parentProperty: y, hasArrExpr: A }, this._handleCallback(x, v, "value"), x;
        var T = l[0], P = l.slice(1), tt = [];
        function G(mt) {
          Array.isArray(mt) ? mt.forEach(function(se) {
            tt.push(se);
          }) : tt.push(mt);
        }
        if ((typeof T != "string" || k) && u && ue.call(u, T))
          G(this._trace(P, u[T], Kn(f, T), u, T, v, A));
        else if (T === "*")
          this._walk(T, P, u, f, g, y, v, function(mt, se, pe, ft, Ot, Lt, Gt, oe) {
            G(C._trace(zi(mt, pe), ft, Ot, Lt, Gt, oe, !0, !0));
          });
        else if (T === "..")
          G(this._trace(P, u, f, g, y, v, A)), this._walk(T, P, u, f, g, y, v, function(mt, se, pe, ft, Ot, Lt, Gt, oe) {
            Ne(ft[mt]) === "object" && G(C._trace(zi(se, pe), ft[mt], Kn(Ot, mt), ft, mt, oe, !0));
          });
        else {
          if (T === "^")
            return this._hasParentSelector = !0, { path: f.slice(0, -1), expr: P, isParentSelector: !0 };
          if (T === "~")
            return x = { path: Kn(f, T), value: y, parent: g, parentProperty: null }, this._handleCallback(x, v, "property"), x;
          if (T === "$")
            G(this._trace(P, u, f, null, null, v, A));
          else if (/^(\x2D?[0-9]*):(\x2D?[0-9]*):?([0-9]*)$/.test(T))
            G(this._slice(T, P, u, f, g, y, v));
          else if (T.indexOf("?(") === 0) {
            if (this.currPreventEval)
              throw new Error("Eval [?(expr)] prevented in JSONPath expression.");
            this._walk(T, P, u, f, g, y, v, function(mt, se, pe, ft, Ot, Lt, Gt, oe) {
              C._eval(se.replace(/^\?\(((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?)\)$/, "$1"), ft[mt], mt, Ot, Lt, Gt) && G(C._trace(zi(mt, pe), ft, Ot, Lt, Gt, oe, !0));
            });
          } else if (T[0] === "(") {
            if (this.currPreventEval)
              throw new Error("Eval [(expr)] prevented in JSONPath expression.");
            G(this._trace(zi(this._eval(T, u, f[f.length - 1], f.slice(0, -1), g, y), P), u, f, g, y, v, A));
          } else if (T[0] === "@") {
            var lt = !1, at = T.slice(1, -2);
            switch (at) {
              case "scalar":
                (!u || !["object", "function"].includes(Ne(u))) && (lt = !0);
                break;
              case "boolean":
              case "string":
              case "undefined":
              case "function":
                Ne(u) === at && (lt = !0);
                break;
              case "integer":
                Number.isFinite(u) && !(u % 1) && (lt = !0);
                break;
              case "number":
                Number.isFinite(u) && (lt = !0);
                break;
              case "nonFinite":
                typeof u == "number" && !Number.isFinite(u) && (lt = !0);
                break;
              case "object":
                u && Ne(u) === at && (lt = !0);
                break;
              case "array":
                Array.isArray(u) && (lt = !0);
                break;
              case "other":
                lt = this.currOtherTypeCallback(u, f, g, y);
                break;
              case "null":
                u === null && (lt = !0);
                break;
              default:
                throw new TypeError("Unknown value type " + at);
            }
            if (lt)
              return x = { path: f, value: u, parent: g, parentProperty: y }, this._handleCallback(x, v, "value"), x;
          } else if (T[0] === "`" && u && ue.call(u, T.slice(1))) {
            var X = T.slice(1);
            G(this._trace(P, u[X], Kn(f, X), u, X, v, A, !0));
          } else if (T.includes(",")) {
            var it = T.split(","), ht = ac(it), ct;
            try {
              for (ht.s(); !(ct = ht.n()).done; ) {
                var kt = ct.value;
                G(this._trace(zi(kt, P), u, f, g, y, v, !0));
              }
            } catch (mt) {
              ht.e(mt);
            } finally {
              ht.f();
            }
          } else !k && u && ue.call(u, T) && G(this._trace(P, u[T], Kn(f, T), u, T, v, A, !0));
        }
        if (this._hasParentSelector)
          for (var O = 0; O < tt.length; O++) {
            var vt = tt[O];
            if (vt && vt.isParentSelector) {
              var dt = this._trace(vt.expr, u, vt.path, g, y, v, A);
              if (Array.isArray(dt)) {
                tt[O] = dt[0];
                for (var wt = dt.length, Ct = 1; Ct < wt; Ct++)
                  O++, tt.splice(O, 0, dt[Ct]);
              } else
                tt[O] = dt;
            }
          }
        return tt;
      }, Mt.prototype._walk = function(l, u, f, g, y, v, A, k) {
        if (Array.isArray(f))
          for (var C = f.length, x = 0; x < C; x++)
            k(x, l, u, f, g, y, v, A);
        else f && Ne(f) === "object" && Object.keys(f).forEach(function(T) {
          k(T, l, u, f, g, y, v, A);
        });
      }, Mt.prototype._slice = function(l, u, f, g, y, v, A) {
        if (Array.isArray(f)) {
          var k = f.length, C = l.split(":"), x = C[2] && Number.parseInt(C[2]) || 1, T = C[0] && Number.parseInt(C[0]) || 0, P = C[1] && Number.parseInt(C[1]) || k;
          T = T < 0 ? Math.max(0, T + k) : Math.min(k, T), P = P < 0 ? Math.max(0, P + k) : Math.min(k, P);
          for (var tt = [], G = T; G < P; G += x) {
            var lt = this._trace(zi(G, u), f, g, y, v, A, !0);
            lt.forEach(function(at) {
              tt.push(at);
            });
          }
          return tt;
        }
      }, Mt.prototype._eval = function(l, u, f, g, y, v) {
        l.includes("@parentProperty") && (this.currSandbox._$_parentProperty = v, l = l.replace(/@parentProperty/g, "_$_parentProperty")), l.includes("@parent") && (this.currSandbox._$_parent = y, l = l.replace(/@parent/g, "_$_parent")), l.includes("@property") && (this.currSandbox._$_property = f, l = l.replace(/@property/g, "_$_property")), l.includes("@path") && (this.currSandbox._$_path = Mt.toPathString(g.concat([f])), l = l.replace(/@path/g, "_$_path")), l.includes("@root") && (this.currSandbox._$_root = this.json, l = l.replace(/@root/g, "_$_root")), /@([\t-\r \)\.\[\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])/.test(l) && (this.currSandbox._$_v = u, l = l.replace(/@([\t-\r \)\.\[\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])/g, "_$_v$1"));
        try {
          return this.vm.runInNewContext(l, this.currSandbox);
        } catch (A) {
          throw console.log(A), new Error("jsonPath: " + A.message + ": " + l);
        }
      }, Mt.cache = {}, Mt.toPathString = function(l) {
        for (var u = l, f = u.length, g = "$", y = 1; y < f; y++)
          /^(~|\^|@(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?\(\))$/.test(u[y]) || (g += /^[\*0-9]+$/.test(u[y]) ? "[" + u[y] + "]" : "['" + u[y] + "']");
        return g;
      }, Mt.toPointer = function(l) {
        for (var u = l, f = u.length, g = "", y = 1; y < f; y++)
          /^(~|\^|@(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?\(\))$/.test(u[y]) || (g += "/" + u[y].toString().replace(/~/g, "~0").replace(/\//g, "~1"));
        return g;
      }, Mt.toPathArray = function(l) {
        var u = Mt.cache;
        if (u[l])
          return u[l].concat();
        var f = [], g = l.replace(/@(?:null|boolean|number|string|integer|undefined|nonFinite|scalar|array|object|function|other)\(\)/g, ";$&;").replace(/['\[](\??\((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?\))['\]]/g, function(v, A) {
          return "[#" + (f.push(A) - 1) + "]";
        }).replace(/\[["']((?:(?!['\]])[\s\S])*)["']\]/g, function(v, A) {
          return "['" + A.replace(/\./g, "%@%").replace(/~/g, "%%@@%%") + "']";
        }).replace(/~/g, ";~;").replace(/["']?\.["']?(?!(?:(?!\[)[\s\S])*\])|\[["']?/g, ";").replace(/%@%/g, ".").replace(/%%@@%%/g, "~").replace(/(?:;)?(\^+)(?:;)?/g, function(v, A) {
          return ";" + A.split("").join(";") + ";";
        }).replace(/;;;|;;/g, ";..;").replace(/;$|'?\]|'$/g, ""), y = g.split(";").map(function(v) {
          var A = v.match(/#([0-9]+)/);
          return !A || !A[1] ? v : f[A[1]];
        });
        return u[l] = y, u[l].concat();
      };
      var uc = function(u, f, g) {
        for (var y = u.length, v = 0; v < y; v++) {
          var A = u[v];
          g(A) && f.push(u.splice(v--, 1)[0]);
        }
      };
      Mt.prototype.vm = { runInNewContext: function(u, f) {
        var g = Object.keys(f), y = [];
        uc(g, y, function(x) {
          return typeof f[x] == "function";
        });
        var v = g.map(function(x, T) {
          return f[x];
        }), A = y.reduce(function(x, T) {
          var P = f[T].toString();
          return /function/.test(P) || (P = "function " + P), "var " + T + "=" + P + ";" + x;
        }, "");
        u = A + u, !/(["'])use strict\1/.test(u) && !g.includes("arguments") && (u = "var arguments = undefined;" + u), u = u.replace(/;[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*$/, "");
        var k = u.lastIndexOf(";"), C = k > -1 ? u.slice(0, k + 1) + " return " + u.slice(k + 1) : " return " + u;
        return jn(Function, qa(g).concat([C])).apply(void 0, qa(v));
      } };
      var vl = {};
      function qn(l, u) {
        u === void 0 && (u = {});
        var f = !1;
        ot(u) && (f = !0, u = JSON.parse(u));
        var g = Yt({}, u);
        if (g.get !== "function" && (g.get = function(v, A) {
          if (f) {
            var k = Mt({ path: v, json: g });
            return k[0];
          } else if (ot(A))
            return g[A] ? g[A][v] : void 0;
          return g[v];
        }), L(l))
          return l(g, i);
        if (!ot(l))
          return w.na;
        if (vl.hasOwnProperty(l))
          y = vl[l];
        else {
          var y = zn(l);
          vl[l] = y;
        }
        return y(g, i);
      }
      function Pr(l) {
        for (var u = [], f = arguments.length - 1; f-- > 0; ) u[f] = arguments[f + 1];
        return !l || u.length === 0 ? w.na : l < 1 || l > 254 || u.length < l ? w.value : u[l - 1];
      }
      function Lr(l) {
        for (var u = [], f = arguments.length - 1; f-- > 0; ) u[f] = arguments[f + 1];
        var g, y = u.length, v = Math.floor(y / 2), A = y % 2 === 0 ? null : u[u.length - 1];
        if (v) {
          for (var k = 0; k < v; k++)
            if (qt(l, u[k * 2]))
              return g = u[k * 2 + 1], g;
        }
        return A || w.na;
      }
      function _i(l) {
        return l !== !0 && l !== !1 && l !== 1 && l !== 0 ? w.value : !l;
      }
      function Fr() {
        for (var l = [], u = arguments.length; u--; ) l[u] = arguments[u];
        return _i(nt.apply(void 0, l));
      }
      function $i() {
        for (var l = [], u = arguments.length; u--; ) l[u] = arguments[u];
        return D(l, function(f, g) {
          if (f === !0)
            return !0;
          var y = L(g) ? g() : g;
          return y === !0 || y === 1;
        }, !1);
      }
      function Br() {
        for (var l = [], u = arguments.length; u--; ) l[u] = arguments[u];
        return _i($i.apply(void 0, l));
      }
      function Je(l) {
        return K(l) ? D(l, function(u, f) {
          return u.concat(f);
        }, []) : w.value;
      }
      function Vr() {
        for (var l = [], u = arguments.length; u--; ) l[u] = arguments[u];
        return !!(D(Je(l), function(f, g) {
          return g ? f + 1 : f;
        }, 0) & 1);
      }
      function Yn(l, u) {
        return !qt(l, u);
      }
      function It(l) {
        return l ? l._isref === !0 : !1;
      }
      function Gn(l, u) {
        return It(l) && It(u) || K(l) && K(u) ? w.na : It(l) || K(l) ? Nt(l, function(f) {
          return f > u;
        }) : It(u) || K(u) ? Nt(l, function(f) {
          return f > l;
        }) : l > u;
      }
      function Jn(l, u) {
        return It(l) && It(u) || K(l) && K(u) ? error.na : It(l) || K(l) ? Nt(l, function(f) {
          return f >= u;
        }) : It(u) || K(u) ? Nt(l, function(f) {
          return f >= l;
        }) : l >= u;
      }
      function Xn(l, u) {
        return It(l) && It(u) || K(l) && K(u) ? error.na : It(l) || K(l) ? Nt(l, function(f) {
          return f < u;
        }) : It(u) || K(u) ? Nt(l, function(f) {
          return f < l;
        }) : l < u;
      }
      function Qn(l, u) {
        return It(l) && It(u) || K(l) && K(u) ? error.na : It(l) || K(l) ? Nt(l, function(f) {
          return f <= u;
        }) : It(u) || K(u) ? Nt(l, function(f) {
          return f <= l;
        }) : l <= u;
      }
      function Hr(l) {
        return l;
      }
      function ji(l, u) {
        return Y(l) ? u : l;
      }
      function oi(l) {
        return Y(l) || K(l) && l.length === 0 || ot(l) && l === "";
      }
      function Ki(l, u) {
        return oi(l) ? u : l;
      }
      function qi(l, u) {
        return u === void 0 && (u = null), N(l) ? u : l;
      }
      function Yi(l, u) {
        return l === w.na ? u : l;
      }
      function Gi(l) {
        return l === !0 || l === !1;
      }
      function Zt(l) {
        return l && Object.prototype.toString.call(l) == "[object Date]";
      }
      function Ji(l) {
        var u = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return u.test(l);
      }
      function Xi(l) {
        return !(Math.floor(Math.abs(l)) & 1);
      }
      var fc = new Date(1900, 0, 1), cc = 2415019, Wr = 60, li = 3600, Qi = 86400, Ga = 864e5, Ja = { H: "h]", M: "m]", MM: "mm]", S: "s]", SS: "ss]" }, dc = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], gc = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], Xa = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], pc = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], mc = "AM", yc = "A", bc = "PM", vc = "P", Qa = 6.28318530717958, wl = 16384, wc = ",", Sc = ".", Za = "$", th = { BLACK: "#000000", BLUE: "#0000FF", CYAN: "#00FFFF", GREEN: "#00FF00", MAGENTA: "#FF00FF", RED: "#FF0000", WHITE: "#FFFFFF", YELLOW: "#FFFF00" };
      function Dt(l) {
        function u(g) {
          var y, v, A, k, C;
          return y = g + 68569, v = Math.floor(4 * y / 146097), y = y - Math.floor((146097 * v + 3) / 4), A = Math.floor(4e3 * (y + 1) / 1461001), y = y - Math.floor(1461 * A / 4) + 31, k = Math.floor(80 * y / 2447), C = y - Math.floor(2447 * k / 80), y = Math.floor(k / 11), k = k + 2 - 12 * y, A = 100 * (v - 49) + A + y, new Date(A, k - 1, C);
        }
        if (l instanceof Error)
          return l;
        if (Zt(l))
          return l;
        if (typeof l == "number")
          return u(Math.floor(l + cc));
        if (typeof l == "string") {
          var f = Date.parse(l);
          return et(f) ? w.value : new Date(f);
        }
        return w.value;
      }
      function Zi(l) {
        var u = Dt(l), f = u.getFullYear();
        return f % 4 === 0 && f % 100 !== 0 || f % 400 === 0;
      }
      var Ac = 97, kc = 122;
      function Cc(l) {
        var u = l.charCodeAt();
        return u >= Ac && u <= kc;
      }
      function tn(l) {
        for (var u in l)
          if (!Cc(l[u]))
            return !1;
        return !0;
      }
      function Xe(l) {
        var u = typeof l;
        return !!l && (u == "object" || u == "function");
      }
      function en(l) {
        return l === w.na;
      }
      function J(l) {
        return typeof l == "number" && !isNaN(l) && isFinite(l);
      }
      function nn(l) {
        return !!(Math.floor(Math.abs(l)) & 1);
      }
      function rn(l) {
        if (l = Dt(l), l instanceof Error)
          return l;
        l.setHours(0, 0, 0), l.setDate(l.getDate() + 4 - (l.getDay() || 7));
        var u = new Date(l.getFullYear(), 0, 1);
        return Math.ceil(((l - u) / Ga + 1) / 7);
      }
      function sn(l) {
        return l && typeof l == "object" && typeof l.then == "function";
      }
      var Ec = 65, Mc = 90;
      function Oc(l) {
        var u = l.charCodeAt();
        return u >= Ec && u <= Mc;
      }
      function on(l) {
        for (var u in l)
          if (!Oc(l[u]))
            return !1;
        return !0;
      }
      function ln(l) {
        var u = new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i");
        return u.test(l);
      }
      function an(l) {
        return J(l) && l % 1 === 0;
      }
      function Zn(l, u) {
        return l.split(u);
      }
      function hn(l, u) {
        return l === void 0 && (l = ""), u === void 0 && (u = 1), u < 1 ? w.na : l.length < u ? w.value : l.charCodeAt(u - 1);
      }
      function Pt(l, u, f) {
        if (u === void 0 && (u = "."), f === void 0 && (f = ","), N(l))
          return l;
        if (oi(l))
          return w.value;
        if (J(l))
          return l;
        var g = !1, y = l.length - 1;
        return l.length === 1 ? hn(l, 0) < 48 || hn(l, 0) > 57 ? w.value : +l : D(Zn(l, ""), function(v, A, k) {
          return v === w.value ? w.value : y === k ? A === "%" ? +v / 100 : +v.concat(A) : A === u ? g ? w.value : (g = !0, v.concat(".")) : A === f ? v : A.charCodeAt(0) < 48 || A.charCodeAt(0) > 57 ? w.value : v.concat(A);
        });
      }
      function Ur(l) {
        var u = Pt(l);
        return J(u) ? -u : w.value;
      }
      function zr(l) {
        var u = Pt(l);
        return J(u) ? u : w.value;
      }
      function _r(l, u) {
        return arguments.length !== 2 ? w.na : !J(l) || !J(u) ? w.value : l + u;
      }
      function $r(l, u) {
        return arguments.length !== 2 ? w.na : !J(l) || !J(u) ? w.value : l - u;
      }
      function jr(l, u) {
        return arguments.length !== 2 ? w.na : !J(l) || !J(u) ? w.value : l * u;
      }
      function Kr(l, u) {
        return arguments.length !== 2 ? w.na : u === 0 ? w.div0 : !J(l) || !J(u) ? w.value : l / u;
      }
      function qr(l) {
        return J(l) ? Math.abs(l) : w.value;
      }
      function Yr(l) {
        return J(l) ? Math.acos(l) : w.value;
      }
      function Gr(l) {
        return J(l) ? Math.log(l + Math.sqrt(l * l - 1)) : w.value;
      }
      function Jr(l) {
        return J(l) ? Math.atan(1 / l) : w.value;
      }
      function Xr(l) {
        return J(l) ? 0.5 * Math.log((l + 1) / (l - 1)) : w.value;
      }
      function Qr(l) {
        return J(l) ? Math.asin(l) : w.value;
      }
      function Zr(l) {
        return J(l) ? Math.log(l + Math.sqrt(l * l + 1)) : w.value;
      }
      function ts(l) {
        return J(l) ? Math.atan(l) : w.value;
      }
      function es(l, u) {
        return !J(l) || !J(u) ? w.value : Math.atan2(l, u);
      }
      function is(l) {
        return J(l) ? Math.log((1 + l) / (1 - l)) / 2 : w.value;
      }
      function ns(l) {
        return J(l) ? Math.cos(l) : w.value;
      }
      function rs(l) {
        return J(l) ? l * 180 / Math.PI : w.value;
      }
      function ss(l, u) {
        return !J(l) || !J(u) ? w.value : l % u;
      }
      function os() {
        return Qa / 2;
      }
      function ls(l, u) {
        return arguments.length !== 2 ? w.na : !J(l) || !J(u) ? w.value : Math.pow(l, u);
      }
      function Si(l, u) {
        return +l.toFixed(u);
      }
      function un(l, u) {
        var f = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9], g = f[u];
        return l > 0 ? Math.ceil(l * g) / g : Math.floor(l * g) / g;
      }
      function as(l) {
        return J(l) ? Math.sin(l) : w.value;
      }
      function hs(l) {
        return J(l) ? Math.tan(l) : w.value;
      }
      function us() {
        return Qa;
      }
      function be(l) {
        return l | 0;
      }
      function fn(l, u, f) {
        return u <= l && l <= f;
      }
      function fs(l) {
        return String.fromCharCode(l);
      }
      function cn(l) {
        return ot(l) ? l.replace(/-+(.)?/g, function(u, f) {
          return f ? f.toUpperCase() : "";
        }).replace(/_+(.)?/g, function(u, f) {
          return f ? f.toUpperCase() : "";
        }) : w.value;
      }
      function cs() {
        for (var l = [], u = arguments.length; u--; ) l[u] = arguments[u];
        return D(l, function(f, g) {
          return "" + f + g;
        }, "");
      }
      function ds(l, u) {
        return l === u;
      }
      function gs(l, u, f) {
        return u === void 0 && (u = ""), f === void 0 && (f = 1), f = u.indexOf(l, f - 1), f === -1 ? w.value : f + 1;
      }
      function ps(l, u) {
        return u === void 0 && (u = ", "), l.some(function(f) {
          return typeof f != "string" && typeof f != "number";
        }) ? w.value : l.join(u);
      }
      function Ve(l) {
        if (!Zt(l))
          return w.na;
        var u = Math.ceil((l - fc) / Ga);
        return u + (u > 59 ? 2 : 1);
      }
      function dn(l) {
        return J(l) || N(l) ? l : l instanceof Date ? Ve(l) : l === !0 ? 1 : 0;
      }
      function ms(l, u) {
        return Y(l) ? "" : dn(+u) ? l.substring(0, u) : l;
      }
      function ys(l) {
        return arguments.length === 0 ? w.error : typeof l == "string" || l.length !== void 0 ? l.length : w.value;
      }
      function bs(l) {
        return ot(l) ? l.toLowerCase() : w.value;
      }
      function Ai(l) {
        if (l instanceof Error)
          return l;
        if (typeof l == "boolean")
          return l;
        if (typeof l == "number")
          return l !== 0;
        if (typeof l == "string") {
          var u = l.toUpperCase();
          if (u === "TRUE" || u === "FALSE")
            return u === "TRUE";
        }
        return w.value;
      }
      function gn(l) {
        return l === void 0 && (l = ""), typeof l != "string" ? w.na : l.length === 0 ? {} : D((l[0] === "?" ? l.substr(1) : l).split("&"), function(u, f) {
          var g = f.split("="), y = decodeURIComponent(g[0]), v = decodeURIComponent(g[1] || "");
          return u[y] = v, u;
        }, {});
      }
      function vs(l) {
        return l === void 0 || l.length === 0 || (l === !0 && (l = "TRUE"), l === !1 && (l = "FALSE"), et(l) && typeof l == "number") ? w.value : (typeof l == "number" && (l = "" + l), l.replace(/\w\S*/g, function(u) {
          return u.charAt(0).toUpperCase() + u.substr(1).toLowerCase();
        }));
      }
      function ws(l, u, f, g) {
        return N(u) || N(f) || typeof l != "string" || typeof g != "string" ? w.value : l.substr(0, u - 1) + g + l.substr(u - 1 + f);
      }
      function Ss(l, u) {
        return Y(l) ? "" : dn(+u) ? l.substring(l.length - u) : l;
      }
      function pn(l, u) {
        for (var f = "", g = 0; g < u; g++)
          f += l;
        return f;
      }
      function tr(l, u, f) {
        if (!u)
          return null;
        f = typeof f > "u" ? 1 : f;
        var g = l.replace(/([^~])\?/g, "$1.").replace(/([^~])\*/g, "$1.*").replace(/([~])\?/g, "\\?").replace(/([~])\*/g, "\\*");
        return f = new RegExp(g, "i").exec(u), f ? f.index + 1 : w.value;
      }
      function mn(l) {
        return ot(l) ? l.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/-/g, "_").toLowerCase() : w.value;
      }
      function er(l, u, f, g) {
        if (!l || !u || !f)
          return l;
        if (g === void 0)
          return l.replace(new RegExp(u, "g"), f);
        for (var y = 0, v = 0; l.indexOf(u, y) > 0; )
          if (y = l.indexOf(u, y + 1), v++, v === g)
            return l.substring(0, y) + f + l.substring(y + u.length);
      }
      function re(l) {
        return Object.keys(l);
      }
      function yn(l, u, f, g) {
        return f === void 0 && (f = "-"), g === void 0 && (g = f), u ? D(re(u), function(y, v) {
          return er(y, "" + f + v + g, u[v]);
        }, l) : l;
      }
      function bn(l, u, f) {
        return u === void 0 && (u = "-"), f = f || u, D(re(l), function(g, y) {
          return g["" + u + y + f] = l[y], g;
        }, {});
      }
      var Ie = {};
      Ie.format_definitions = {}, Ie.commands = { copy: 1, color: 2, integer_placeholder: 3, fraction_placeholder: 4, decimal: 5, currency: 6, general: 7, separator: 8, date: 9, comparison: 10, section: 11, style: 12 }, Ie.formatNumberWithFormat = function(l, u, f) {
        var g = Ie, y, v, A, k, C, x, T, P, tt, G, lt, at, X, it, ht, ct, kt, O = "", vt, dt, wt, Ct, mt, se, pe, ft, Ot, Lt, Gt, oe, Pe, yt, B, q, _, ut, rt, $, we, j, zt;
        if (l = l - 0, zt = l, !isFinite(zt))
          return "NaN";
        var le = zt < 0 ? 1 : 0;
        le && (zt = -zt);
        var Eo = zt == 0 ? 1 : 0;
        if (Ie.parse_format_string(g.format_definitions, u), vt = g.format_definitions[u], !vt)
          throw "Format not parsed error.";
        if (dt = vt.sectioninfo.length - 1, vt.hascomparison)
          for (dt = 0, wt = 0, se = 0; ; se++) {
            if (y = vt.operators[se], v = vt.operands[se], !y) {
              wt && (u = "General", g.parse_format_string(g.format_definitions, u), vt = g.format_definitions[u], dt = 0);
              break;
            }
            if (y == g.commands.section) {
              if (!wt)
                break;
              wt = 0, dt++;
              continue;
            }
            if (y == g.commands.comparison) {
              if (Ot = v.indexOf(":"), Ct = v.substring(0, Ot), mt = v.substring(Ot + 1) - 0, Ct == "<" && l < mt || Ct == "<=" && l <= mt || Ct == "=" && l == mt || Ct == "<>" && l != mt || Ct == ">=" && l >= mt || Ct == ">" && l > mt)
                break;
              wt = 1;
            }
          }
        else dt > 0 && (dt == 1 ? le ? (le = 0, dt = 1) : dt = 0 : dt == 2 && (le ? (le = 0, dt = 1) : Eo ? dt = 2 : dt = 0));
        if (ft = vt.sectioninfo[dt], ft.commas > 0)
          for (Ot = 0; Ot < ft.commas; Ot++)
            zt /= 1e3;
        if (ft.percent > 0)
          for (Ot = 0; Ot < ft.percent; Ot++)
            zt *= 100;
        for (Lt = 1, Ot = 0; Ot < ft.fractiondigits; Ot++)
          Lt *= 10;
        if (Gt = Math.floor(zt * Lt + 0.5), Gt = Gt / Lt, typeof Gt != "number" || !isFinite(Gt))
          return "NaN";
        if (oe = Gt + "", Gt == 0 && (ft.fractiondigits || ft.integerdigits) && (le = 0), oe.indexOf("e") >= 0)
          return l + "";
        if (Pe = oe.match(/^\+{0,1}(\d*)(?:\.(\d*)){0,1}$/), !Pe)
          return "NaN";
        if (yt = Pe[1], (!yt || yt == "0") && (yt = ""), B = Pe[2], B || (B = ""), ft.hasdate) {
          if (l < 0)
            return "??-???-?? ??:??:??";
          for (x = (l - Math.floor(l)) * Qi, T = l * Qi, P = Math.floor(x / li), lt = Math.floor(T / li), x = x - P * li, tt = Math.floor(x / 60), at = Math.floor(T / 60), G = x - tt * 60, Lt = 1, Ot = 0; Ot < ft.fractiondigits; Ot++)
            Lt *= 10;
          for (G = Math.floor(G * Lt + 0.5), G = G / Lt, X = Math.floor(T * Lt + 0.5), X = X / Lt, G >= 60 && (G = 0, tt++, at++, tt >= 60 && (tt = 0, P++, lt++, P >= 24 && (P = 0, l++))), B = G - Math.floor(G) + "", B = B.substring(2), ht = Dt(l), ht = { year: ht.getFullYear(), month: ht.getMonth() + 1, day: ht.getDate() }, ct = 0, kt = ft.sectionstart; y = vt.operators[kt], v = vt.operands[kt], !(!y || y == g.commands.section); kt++)
            y == g.commands.date ? ((v.toLowerCase() == "am/pm" || v.toLowerCase() == "a/p") && !it && (P >= 12 ? (P > 12 && (P -= 12), it = v.toLowerCase() == "a/p" ? vc : bc) : (P === 0 && (P = 12), it = v.toLowerCase() == "a/p" ? yc : mc), v.indexOf(it) < 0 && (it = it.toLowerCase())), ct && (v == "m" || v == "mm") && (vt.operands[kt] += "in"), v.charAt(0) == "h" ? ct = 1 : ct = 0) : y != g.commands.copy && (ct = 0);
          for (ct = 0, --kt; y = vt.operators[kt], v = vt.operands[kt], !(!y || y == g.commands.section); kt--)
            y == g.commands.date ? (ct && (v == "m" || v == "mm") && (vt.operands[kt] += "in"), v == "ss" ? ct = 1 : ct = 0) : y != g.commands.copy && (ct = 0);
        }
        for (q = 0, _ = 0, ut = 0, rt = "", $ = "", we = wc, we.indexOf(" ") >= 0 && (we = we.replace(/ /g, " ")), j = Sc, j.indexOf(" ") >= 0 && (j = j.replace(/ /g, " ")), pe = ft.sectionstart; y = vt.operators[pe]; )
          if (v = vt.operands[pe++], y == g.commands.copy)
            O += v;
          else if (y == g.commands.color)
            rt = v;
          else if (y == g.commands.style)
            $ = v;
          else if (y == g.commands.integer_placeholder) {
            if (le && (O += "-", le = 0), q++, q == 1 && yt.length > ft.integerdigits)
              for (; _ < yt.length - ft.integerdigits; _++)
                O += yt.charAt(_), ft.thousandssep && (A = yt.length - _ - 1, A > 2 && A % 3 == 0 && (O += we));
            yt.length < ft.integerdigits && q <= ft.integerdigits - yt.length ? (v == "0" || v == "?") && (O += v == "0" ? "0" : " ", ft.thousandssep && (A = ft.integerdigits - q, A > 2 && A % 3 == 0 && (O += we))) : (O += yt.charAt(_), ft.thousandssep && (A = yt.length - _ - 1, A > 2 && A % 3 == 0 && (O += we)), _++);
          } else if (y == g.commands.fraction_placeholder)
            ut >= B.length ? (v == "0" || v == "?") && (O += v == "0" ? "0" : " ") : O += B.charAt(ut), ut++;
          else if (y == g.commands.decimal)
            le && (O += "-", le = 0), O += j;
          else if (y == g.commands.currency)
            le && (O += "-", le = 0), O += v;
          else if (y == g.commands.general) {
            if (zt != 0) {
              var En = Math.floor(Math.LOG10E * Math.log(zt));
              if (En = Math.pow(10, 13 - En), zt = Math.floor(En * zt + 0.5) / En, !isFinite(zt))
                return "NaN";
            }
            if (le && (O += "-"), oe = zt + "", oe.indexOf("e") >= 0) {
              O += oe;
              continue;
            }
            if (Pe = oe.match(/^\+{0,1}(\d*)(?:\.(\d*)){0,1}$/), yt = Pe[1], (!yt || yt == "0") && (yt = ""), B = Pe[2], B || (B = ""), _ = 0, ut = 0, yt.length)
              for (; _ < yt.length; _++)
                O += yt.charAt(_), ft.thousandssep && (A = yt.length - _ - 1, A > 2 && A % 3 == 0 && (O += we));
            else
              O += "0";
            if (B.length)
              for (O += j; ut < B.length; ut++)
                O += B.charAt(ut);
          } else if (y == g.commands.date)
            C = v.toLowerCase(), C == "y" || C == "yy" ? O += (ht.year + "").substring(2) : C == "yyyy" ? O += ht.year + "" : C == "d" ? O += ht.day + "" : C == "dd" ? (k = 1e3 + ht.day, O += (k + "").substr(2)) : C == "ddd" ? (k = Math.floor(l + 6) % 7, O += gc[k]) : C == "dddd" ? (k = Math.floor(l + 6) % 7, O += dc[k]) : C == "m" ? O += ht.month + "" : C == "mm" ? (k = 1e3 + ht.month, O += (k + "").substr(2)) : C == "mmm" ? O += pc[ht.month - 1] : C == "mmmm" ? O += Xa[ht.month - 1] : C == "mmmmm" ? O += Xa[ht.month - 1].charAt(0) : C == "h" ? O += P + "" : C == "h]" ? O += lt + "" : C == "mmin" ? (k = 1e3 + tt + "", O += k.substr(2)) : C == "mm]" ? at < 100 ? (k = 1e3 + at + "", O += k.substr(2)) : O += at + "" : C == "min" ? O += tt + "" : C == "m]" ? O += at + "" : C == "hh" ? (k = 1e3 + P + "", O += k.substr(2)) : C == "s" ? (k = Math.floor(G), O += k + "") : C == "ss" ? (k = 1e3 + Math.floor(G) + "", O += k.substr(2)) : C == "am/pm" || C == "a/p" ? O += it : C == "ss]" && (X < 100 ? (k = 1e3 + Math.floor(X) + "", O += k.substr(2)) : (k = Math.floor(X), O += k + ""));
          else {
            if (y == g.commands.section)
              break;
            if (y == g.commands.comparison)
              continue;
            O += "!! Parse error.!!";
          }
        return rt && (O = '<span style="color:' + rt + ';">' + O + "</span>"), $ && (O = '<span style="' + $ + ';">' + O + "</span>"), O;
      }, Ie.parse_format_string = function(l, u) {
        var f = Ie, g, y, v, A = 1, k, C, x, T, P, tt, G, lt, at, X, it, ht, ct, kt, O;
        if (!l[u]) {
          for (g = { operators: [], operands: [], sectioninfo: [{}] }, l[u] = g, y = 0, v = g.sectioninfo[y], v.sectionstart = 0, v.integerdigits = 0, v.fractiondigits = 0, v.commas = 0, v.percent = 0, kt = 0; kt < u.length; kt++) {
            if (O = u.charAt(kt), P) {
              if (O == '"') {
                P = 0, g.operators.push(f.commands.copy), g.operands.push(tt);
                continue;
              }
              tt += O;
              continue;
            }
            if (G) {
              if (O == "]") {
                if (G = 0, at = Ie.parse_format_bracket(lt), at.operator == f.commands.separator) {
                  v.thousandssep = 1;
                  continue;
                }
                at.operator == f.commands.date && (v.hasdate = 1), at.operator == f.commands.comparison && (g.hascomparison = 1), g.operators.push(at.operator), g.operands.push(at.operand);
                continue;
              }
              lt += O;
              continue;
            }
            if (C) {
              g.operators.push(f.commands.copy), g.operands.push(O), C = !1;
              continue;
            }
            if (x) {
              g.operators.push(f.commands.copy), g.operands.push(O + O + O + O + O), x = !1;
              continue;
            }
            if (T) {
              g.operators.push(f.commands.copy), g.operands.push(" "), T = !1;
              continue;
            }
            if (X) {
              if ("general".charAt(X) == O.toLowerCase()) {
                X++, X == 7 && (g.operators.push(f.commands.general), g.operands.push(O), X = 0);
                continue;
              }
              X = 0;
            }
            if (ct) {
              if (ct.charAt(0) == O) {
                ct += O;
                continue;
              }
              g.operators.push(f.commands.date), g.operands.push(ct), v.hasdate = 1, ct = "";
            }
            if (it) {
              it += O, ht = it.toLowerCase(), ht != "am/pm".substring(0, ht.length) && ht != "a/p".substring(0, ht.length) ? ampstr = "" : (ht == "am/pm" || ht == "a/p") && (g.operators.push(f.commands.date), g.operands.push(it), it = "");
              continue;
            }
            O == "#" || O == "0" || O == "?" ? A ? (v.integerdigits++, v.commas && (v.thousandssep = 1, v.commas = 0), k = 1, g.operators.push(f.commands.integer_placeholder), g.operands.push(O)) : (v.fractiondigits++, g.operators.push(f.commands.fraction_placeholder), g.operands.push(O)) : O == "." ? (k = 0, g.operators.push(f.commands.decimal), g.operands.push(O), A = 0) : O === "$" ? (k = 0, g.operators.push(f.commands.currency), g.operands.push(O)) : O == "," ? k ? v.commas++ : (g.operators.push(f.commands.copy), g.operands.push(O)) : O == "%" ? (k = 0, v.percent++, g.operators.push(f.commands.copy), g.operands.push(O)) : O == '"' ? (k = 0, P = 1, tt = "") : O == "[" ? (k = 0, G = 1, lt = "") : O == "\\" ? (C = 1, k = 0) : O == "*" ? (x = 1, k = 0) : O == "_" ? (T = 1, k = 0) : O == ";" ? (y++, g.sectioninfo[y] = {}, v = g.sectioninfo[y], v.sectionstart = 1 + g.operators.length, v.integerdigits = 0, v.fractiondigits = 0, v.commas = 0, v.percent = 0, A = 1, k = 0, g.operators.push(f.commands.section), g.operands.push(O)) : O.toLowerCase() == "g" ? (X = 1, k = 0) : O.toLowerCase() == "a" ? (it = O, k = 0) : "dmyhHs".indexOf(O) >= 0 ? ct = O : (k = 0, g.operators.push(f.commands.copy), g.operands.push(O));
          }
          ct && (g.operators.push(f.commands.date), g.operands.push(ct), v.hasdate = 1);
        }
      }, Ie.parse_format_bracket = function(l) {
        var u = Ie, f = {}, g;
        return l.charAt(0) == "$" ? (f.operator = u.commands.currency, g = l.match(/^\$(.+?)(\-.+?){0,1}$/), g ? f.operand = g[1] || Za : f.operand = l.substring(1) || Za) : l == "?$" ? (f.operator = u.commands.currency, f.operand = "[?$]") : th[l.toUpperCase()] ? (f.operator = u.commands.color, f.operand = th[l.toUpperCase()]) : (g = l.match(/^style=([^']*)$/)) ? (f.operator = u.commands.style, f.operand = g[1]) : l == "," ? (f.operator = u.commands.separator, f.operand = l) : Ja[l.toUpperCase()] ? (f.operator = u.commands.date, f.operand = Ja[l.toUpperCase()]) : (g = l.match(/^[<>=]/)) ? (g = l.match(/^([<>=]+)(.+)$/), f.operator = u.commands.comparison, f.operand = g[1] + ":" + g[2]) : (f.operator = u.commands.copy, f.operand = "[" + l + "]"), f;
      };
      function As(l, u, f) {
        return Ie.formatNumberWithFormat(l, u, f);
      }
      function ks(l) {
        return typeof l != "string" ? w.value : l.trim();
      }
      function Cs(l) {
        return l.toUpperCase();
      }
      function Es(l, u, f, g) {
        if (f === void 0 && (f = 1), g === void 0 && (g = !1), typeof l > "u" || Y(l))
          return null;
        if (f > u.length)
          return w.ref;
        for (var y = (l + "").toLowerCase(), v = u[0], A = 0; A < v.length; A++)
          if (g && v[A] === l || v[A] == l || typeof v[A] == "string" && v[A].toLowerCase().indexOf(y) != -1)
            return u[f - 1][A];
        return w.na;
      }
      function ki(l, u, f) {
        if (u == null)
          throw new TypeError('"searchList" is null or not defined');
        var g = Object(u), y = g.length >>> 0;
        if (y === 0)
          return !1;
        var v = f | 0, A = Math.max(v >= 0 ? v : y - Math.abs(v), 0);
        function k(C, x) {
          return C === x || typeof C == "number" && typeof x == "number" && isNaN(C) && isNaN(x);
        }
        for (; A < y; ) {
          if (k(g[A], l))
            return !0;
          A++;
        }
        return !1;
      }
      function vn(l, u, f) {
        return !ki(l, u, f);
      }
      function Ms(l, u, f) {
        f === void 0 && (f = 1);
        var g;
        return !K(l) || Y(u) ? w.value : l.length < u ? w.ref : (g = l[u - 1], K(g) ? g.length < f ? w.ref : g[f - 1] : w.value);
      }
      function Os() {
        var l, u, f, g;
        if (arguments.length === 2) {
          l = arguments[0].valueOf(), u = arguments[1];
          for (var y = 0; y < u.length; y++)
            if (typeof u[y] < "u" && l === u[y].valueOf())
              return u[y];
        } else if (arguments.length === 3) {
          l = arguments[0].valueOf(), f = arguments[1], g = arguments[2];
          for (var y = 0; y < f.length; y++)
            if (typeof f[y] < "u" && l === f[y].valueOf())
              return g[y];
        }
        return error.na;
      }
      function Ts(l, u, f) {
        var g, y, v, A;
        if (arguments.length === 2 && (f = 1), y = l, K(u))
          g = u;
        else
          return w.na;
        if (!y && !g || f !== -1 && f !== 0 && f !== 1)
          return w.na;
        for (var k = 0; k < g.length; k++)
          if (f === 1) {
            if (g[k] === y)
              return k + 1;
            g[k] < y && (A ? g[k] > A && (v = k + 1, A = g[k]) : (v = k + 1, A = g[k]));
          } else if (f === 0) {
            if (typeof y == "string") {
              if (k === 0 && (y = "^" + y.replace(/\?/g, ".").replace(/\*/g, ".*").replace(/~/g, "\\?") + "$"), typeof g[k] < "u" && String(g[k]).toLowerCase().match(String(y).toLowerCase()))
                return k + 1;
            } else if (typeof g[k] < "u" && g[k] !== null && g[k].valueOf() === y)
              return k + 1;
          } else if (f === -1) {
            if (g[k] === y)
              return k + 1;
            g[k] > y && (A ? g[k] < A && (v = k + 1, A = g[k]) : (v = k + 1, A = g[k]));
          }
        return v || w.na;
      }
      function xs(l, u, f, g) {
        if (u === void 0 && (u = []), f === void 0 && (f = 1), g === void 0 && (g = !1), N(l) || Y(l))
          return l;
        for (var y = 0; y < u.length; y++) {
          var v = u[y];
          if (f > v.length)
            return w.ref;
          if (g && v[0] === l || v[0] == l || typeof v[0] == "string" && v[0].toLowerCase().indexOf(l.toLowerCase()) != -1)
            return f < v.length + 1 ? v[f - 1] : v[0];
        }
        return w.na;
      }
      function Ds(l, u, f) {
        return Ve(new Date(l, u - 1, f));
      }
      function wn(l) {
        return Ve(Dt(l));
      }
      function Rs(l, u, f) {
        var g = 1e3, y = g * 60, v = y * 60, A = v * 24, k = A * 7;
        l = Dt(l), u = Dt(u);
        var C = u - l;
        if (et(C))
          return NaN;
        switch (f) {
          case "Y":
            return u.getFullYear() - l.getFullYear();
          case "M":
            return u.getFullYear() * 12 + u.getMonth() - (l.getFullYear() * 12 + l.getMonth());
          case "W":
            return Math.floor(C / k);
          case "D":
            return Math.floor(C / A);
          case "MD":
            return u.getdate() - l.getdate();
          case "YM":
            return u.getMonth() - l.getMonth();
          case "YD":
            return new error("NOT IMPLEMENTED");
          default:
            return;
        }
      }
      function Ns(l) {
        return Dt(l).getDate();
      }
      function Is(l, u, f) {
        if (f = Ai(f), l = Dt(l), u = Dt(u), l instanceof Error)
          return l;
        if (u instanceof Error)
          return u;
        if (f instanceof Error)
          return f;
        var g = l.getMonth(), y = u.getMonth(), v, A;
        if (f)
          v = l.getDate() === 31 ? 30 : l.getDate(), A = u.getDate() === 31 ? 30 : u.getDate();
        else {
          var k = new Date(l.getFullYear(), g + 1, 0).getDate(), C = new Date(u.getFullYear(), y + 1, 0).getDate();
          v = l.getDate() === k ? 30 : l.getDate(), u.getDate() === C ? v < 30 ? (y++, A = 1) : A = 30 : A = u.getDate();
        }
        return 360 * (u.getFullYear() - l.getFullYear()) + 30 * (y - g) + (A - v);
      }
      function Ps(l, u) {
        return l = Dt(l), l instanceof Error ? l : isNaN(u) ? error.value : (u = parseInt(u, 10), l.setMonth(l.getMonth() + u), Ve(l));
      }
      function Ls(l, u) {
        return l = Dt(l), l instanceof Error ? l : isNaN(u) ? w.value : (u = parseInt(u, 10), new Date(l.getFullYear(), l.getMonth() + u + 1, 0));
      }
      function Fs(l) {
        return Zt(l) ? l.getHours() : be((l - be(l)) * 24);
      }
      function Bs(l) {
        if (Zt(l))
          return l.getMinutes();
        var u = (l - be(l)) * Qi, f = be(u / li) * li;
        return be((u - f) / Wr);
      }
      function Vs(l) {
        return Dt(l).getMonth() + 1;
      }
      function ir(l) {
        var u = /* @__PURE__ */ new Date("1/1/1900 " + l);
        return u instanceof Error ? u : (li * u.getHours() + Wr * u.getMinutes() + u.getSeconds()) / Qi;
      }
      function Hs() {
        var l = /* @__PURE__ */ new Date();
        return wn(l.toLocaleDateString()) + ir(l.toLocaleTimeString());
      }
      function Ws(l) {
        if (Zt(l))
          return l.getSeconds();
        var u = (l - be(l)) * Qi, f = be(u / li) * li, g = be((u - f) / Wr) * Wr;
        return Math.round(u - f - g);
      }
      function Us() {
        var l = /* @__PURE__ */ new Date();
        return wn(l.toLocaleDateString());
      }
      function zs(l, u, f) {
        return +((l * 3600 + u * 60 + f) / Qi).toFixed(15);
      }
      function _s(l) {
        return Dt(l).getFullYear();
      }
      function nr(l, u, f) {
        if (l = Dt(l), l instanceof Error)
          return l;
        if (u = Dt(u), u instanceof Error)
          return u;
        f = f || 0;
        var g = l.getDate(), y = l.getMonth() + 1, v = l.getFullYear(), A = u.getDate(), k = u.getMonth() + 1, C = u.getFullYear();
        function x(X) {
          return X % 4 === 0 && X % 100 !== 0 || X % 400 === 0;
        }
        function T(X, it) {
          return Ve(it) - Ve(X);
        }
        switch (f) {
          case 0:
            return g === 31 && A === 31 ? (g = 30, A = 30) : g === 31 ? g = 30 : g === 30 && A === 31 && (A = 30), (A + k * 30 + C * 360 - (g + y * 30 + v * 360)) / 360;
          case 1:
            var P = function(X, it) {
              var ht = X.getFullYear(), ct = new Date(ht, 2, 1);
              if (x(ht) && X < ct && it >= ct)
                return !0;
              var kt = it.getFullYear(), O = new Date(kt, 2, 1);
              return x(kt) && it >= O && X < O;
            }, tt = 365;
            if (v === C || v + 1 === C && (y > k || y === k && g >= A))
              return (v === C && x(v) || P(l, u) || k === 1 && A === 29) && (tt = 366), T(l, u) / tt;
            var G = C - v + 1, lt = (new Date(C + 1, 0, 1) - new Date(v, 0, 1)) / 1e3 / 60 / 60 / 24, at = lt / G;
            return T(l, u) / at;
          case 2:
            return T(l, u) / 360;
          case 3:
            return T(l, u) / 365;
          case 4:
            return (A + k * 30 + C * 360 - (g + y * 30 + v * 360)) / 360;
        }
      }
      function rr() {
        for (var l = [], u = arguments.length; u--; ) l[u] = arguments[u];
        return D(Je(Je(l)), function(f, g) {
          return typeof g != "number" ? w.value : f + g;
        });
      }
      function $s() {
        for (var l = [], u = arguments.length; u--; ) l[u] = arguments[u];
        var f = rr.apply(void 0, l);
        return N(f) ? f : f / l.length;
      }
      function js() {
        for (var l = [], u = arguments.length; u--; ) l[u] = arguments[u];
        var f = Je(l);
        if (f.length !== 0)
          return D(f, function(g, y) {
            return Y(g) ? y : J(y) ? Math.min(g, y) : g;
          });
      }
      function Ks() {
        for (var l = [], u = arguments.length; u--; ) l[u] = arguments[u];
        var f = Je(l);
        if (f.length !== 0)
          return D(f, function(g, y) {
            return Y(g) ? y : J(y) ? Math.max(g, y) : g;
          });
      }
      function sr(l) {
        for (var u = [], f = arguments.length - 1; f-- > 0; ) u[f] = arguments[f + 1];
        function g() {
          return function(y, v) {
            return D(u, function(A, k) {
              return A === !1 ? !1 : z(K(k), function() {
                return k[v];
              }, L(k), function() {
                return k(y, v);
              }, ot(k), function() {
                return qn(k, y);
              }, w.na);
            }, !0);
          };
        }
        return l.filter(g());
      }
      var eh = { $noop: function() {
        return function() {
          return !1;
        };
      }, $eq: function(l) {
        return function(u, f) {
          return qt(u[f], l);
        };
      }, $ne: function(l) {
        return function(u, f) {
          return Yn(u[f], l);
        };
      }, $gt: function(l) {
        return function(u, f) {
          return Gn(u[f], l);
        };
      }, $gte: function(l) {
        return function(u, f) {
          return Jn(u[f], l);
        };
      }, $lt: function(l) {
        return function(u, f) {
          return Xn(u[f], l);
        };
      }, $lte: function(l) {
        return function(u, f) {
          return Qn(u[f], l);
        };
      }, $in: function(l) {
        return function(u, f) {
          return K(l) && ki(u[f], l);
        };
      }, $nin: function(l) {
        return function(u, f) {
          return K(l) && !ki(u[f], l);
        };
      }, $text: function(l) {
        return function(u, f) {
          return tr(l, u[f]) > 0;
        };
      }, $exists: function(l) {
        return function(u, f) {
          return Q(l) ? u.hasOwnProperty(f) : !u.hasOwnProperty(f);
        };
      }, $and: function(l) {
        return function(u, f) {
          return !0;
        };
      }, $or: function(l) {
        return function(u, f) {
          return !0;
        };
      } };
      function qs(l, u) {
        var f = function(k, C, x) {
          return function(T) {
            return (eh[C] || eh.$noop)(x)(T, k);
          };
        }, g = function(k, C) {
          return function(x) {
            return z(Xe(k[C]), function() {
              return nt.apply(void 0, Nt(re(k[C]), function(T) {
                return f(C, T, k[C][T])(x);
              }));
            }, function() {
              return f(C, "$eq", k[C])(x);
            });
          };
        }, y = function(k, C, x, T) {
          if (T === void 0 && (T = nt), !K(C[x]))
            throw new Error("$" + T.name + " expects array!");
          return T.apply(void 0, Nt(C[x], function(P) {
            return T.apply(void 0, Nt(re(P), function(tt) {
              return g(P, tt)(k);
            }));
          }));
        }, v = function(k) {
          return D(re(k), function(C, x) {
            return C.concat(function(T) {
              return z(x === "$and", function() {
                return y(T, k, x, nt);
              }, x === "$or", function() {
                return y(T, k, x, $i);
              }, function() {
                return g(k, x)(T);
              });
            });
          }, []);
        }, A = v(u);
        return sr.apply(void 0, [l].concat(Nt(A, function(k) {
          return Nt(l, function(C) {
            return k(C);
          });
        })));
      }
      function Ys(l, u, f, g, y, v, A) {
        A === void 0 && (A = 0);
        var k = Dt(l), C = Dt(u), x = Dt(f);
        return !Zt(k) || !Zt(C) || !Zt(x) || !J(y) ? w.value : g <= 0 || y <= 0 || [1, 2, 4].indexOf(v) === -1 || [0, 1, 2, 3, 4].indexOf(A) === -1 || x <= k ? w.num : y * g * nr(l, f, A);
      }
      function ai(l, u, f, g, y) {
        if (g === void 0 && (g = 0), y === void 0 && (y = 0), Y(l) || Y(u) || Y(f))
          return w.na;
        var v;
        if (l === 0)
          v = g + f * u;
        else {
          var A = Math.pow(1 + l, u);
          y === 1 ? v = g * A + f * (1 + l) * (A - 1) / l : v = g * A + f * (A - 1) / l;
        }
        return -v;
      }
      function Gs(l, u, f, g, y) {
        var v, A;
        return l = parseFloat(l || 0), u = parseFloat(u || 0), f = parseFloat(f || 0), g = g || 0, y = y || 0, v = function(k) {
          if (et(k))
            return Math.log(0);
          var C = Math.log(k);
          return C;
        }, l == 0 ? A = -(f + g) / u : y > 0 ? A = v(-(l * g - u * (1 + l)) / (l * f + u * (1 + l))) / v(1 + l) : A = v(-(l * g - u) / (l * f + u)) / v(1 + l), et(A) && (A = 0), A;
      }
      function Js(l) {
        for (var u = [], f = arguments.length - 1; f-- > 0; ) u[f] = arguments[f + 1];
        var g = D(u, function(y, v) {
          var A = y.factor * (1 + l), k = y.sum + +v / A;
          return { factor: A, sum: k };
        }, { factor: 1, sum: 0 });
        return g.sum;
      }
      function Sn(l, u, f, g, y) {
        if (g === void 0 && (g = 0), y === void 0 && (y = 0), !J(l) || !J(u))
          return w.value;
        if (l === 0)
          return -((f + g) / u);
        var v = Math.pow(1 + l, u);
        return y === 1 ? -((g * l / (v - 1) + f * l / (1 - 1 / v)) / (1 + l)) : -(g * l / (v - 1) + f * l / (1 - 1 / v));
      }
      function Xs(l, u, f, g, y, v) {
        if (l = Pt(l), u = Pt(u), f = Pt(f), N(l) || N(u) || N(f))
          return M.value;
        if (l <= 0 || u <= 0 || f <= 0 || g < 1 || y < 1 || g > y || v !== 0 && v !== 1)
          return M.num;
        var A = Sn(l, u, f, 0, v), k = 0;
        g === 1 && v === 0 && (k = -f, g++);
        for (var C = g; C <= y; C++)
          v === 1 ? k += ai(l, C - 2, A, f, 1) - A : k += ai(l, C - 1, A, f, 0);
        return k *= l, k;
      }
      function Qs(l, u, f, g, y, v) {
        if (y === void 0 && (y = 0), v === void 0 && (v = 0), l = Pt(l), u = Pt(u), f = Pt(f), g = Pt(g), y = Pt(y), v = Pt(v), N(l, u, f, g, y, v))
          return M.value;
        var A = Sn(l, f, g, y, v), k;
        return u === 1 ? v === 1 ? k = 0 : k = -g : v === 1 ? k = ai(l, u - 2, A, g, 1) - A : k = ai(l, u - 1, A, g, 0), k * l;
      }
      function Zs(l, u, f, g, y) {
        return g === void 0 && (g = 0), y === void 0 && (y = 0), Y(l) || Y(u) || Y(f) ? w.na : l === 0 ? -f * u - g : ((1 - Math.pow(1 + l, u)) / l * f * (1 + l * y) - g) / Math.pow(1 + l, u);
      }
      function to(l) {
        var u;
        if (typeof l == "string")
          u = l;
        else if (typeof l < "u")
          u = l.toString();
        else
          return w.NA;
        return u.length > 10 ? w.NUM : u.length === 10 && u[0] === "1" ? parseInt(u.substring(1), 2) - 512 : parseInt(u, 2);
      }
      function eo(l, u) {
        if (l instanceof Error)
          return f;
        var f = parseInt(l);
        if (!/^-?[0-9]{1,3}$/.test(f) || et(f))
          return w.value;
        if (f < -512 || f > 511)
          return w.num;
        if (f < 0)
          return "1" + pn("0", 9 - (512 + f).toString(2).length) + (512 + f).toString(2);
        var g = parseInt(f, 10).toString(2);
        return typeof u > "u" ? g : !/^-?[0-9]{1,3}$/.test(u) || et(u) ? w.value : u < 0 ? w.num : (u = Math.floor(u), u >= g.length ? pn("0", u - g.length) + g : w.num);
      }
      function io(l) {
        if (!/^[0-7]{1,10}$/.test(l))
          return w.num;
        var u = parseInt(l, 8);
        return u >= 536870912 ? u - 1073741824 : u;
      }
      function no(l, u) {
        return K(u) ? Nt(u, function(f) {
          return f[l];
        }) : w.na;
      }
      function ro(l) {
        for (var u = [], f = arguments.length - 1; f-- > 0; ) u[f] = arguments[f + 1];
        var g = function() {
          return function(y, v) {
            for (var A = 0, k = 0; k < u.length; k = k + 2)
              if (A === 0) {
                var C = typeof u[k] == "string" ? u[k] : u[k] - 1, x = u[k + 1];
                y[C] < v[C] && (A = x ? -1 : 1), y[C] > v[C] && (A = x ? 1 : -1);
              }
            return A;
          };
        };
        return K(l) ? l.sort(g()) : w.na;
      }
      function An(l, u) {
        return u === void 0 && (u = 2), K(l) ? D(l, function(f, g, y) {
          (y === 0 || y % u === 0) && (f = f.concat([[]]));
          var v = f.length - 1;
          return f[v] = f[v].concat(g), f;
        }, []) : w.value;
      }
      function so(l, u) {
        var f = re(l), g = re(u);
        return Re(f.filter(function(y) {
          return l[y] !== u[y];
        }).concat(g.filter(function(y) {
          return l[y] !== u[y];
        })));
      }
      function oo(l, u) {
        var f = re(l), g = re(u), y = g.filter(function(C) {
          return f.indexOf(C) > -1;
        }), v = g.filter(function(C) {
          return f.indexOf(C) === -1;
        }), A = f.filter(function(C) {
          return g.indexOf(C) === -1;
        }), k = y.filter(function(C) {
          return l[C] !== u[C];
        });
        return { unique_left: v, unique_right: A, diff: D(k, function(C, x) {
          var T = {};
          return T[x] = { left: l[x], right: u[x] }, Yt({}, C, T);
        }, {}) };
      }
      function or(l, u) {
        if (!(!u || typeof u != "object") && l)
          return typeof l == "string" && (l = l.split(/ *, */)), K(u) ? u.map(function(f) {
            return D(l, function(g, y) {
              return g[y] = f[y], g;
            }, {});
          }) : D(l, function(f, g) {
            return f[g] = u[g], f;
          }, {});
      }
      function lo(l) {
        var u = re(l).filter(function(f) {
          return !Y(l[f]);
        });
        return or(u, l);
      }
      function ao(l, u) {
        return u[l];
      }
      function Qe(l) {
        if (!J(l))
          return w.value;
        var u = "", f = !1, g, y = Math.abs(l);
        do
          g = y % 26, f && g--, u = String.fromCharCode(g + 65) + u, y = Math.floor((y - g) / 26), f = !0;
        while (y > 0);
        return u;
      }
      function ho(l, u, f, g, y) {
        var v = Qe(u - 1);
        switch (f) {
          case 0:
            return v + l.toString();
          case 2:
            return v + "$" + l.toString();
          case 3:
            return "$" + v + l.toString();
          default:
            return "$" + v + "$" + l.toString();
        }
      }
      function uo(l, u, f) {
        f === void 0 && (f = 0), l = Pt(l), u = Pt(u), f = Pt(f), f = f === void 0 ? 0 : f;
        var g = l.toString(u);
        return new Array(Math.max(f + 1 - g.length, 0)).join("0") + g;
      }
      function kn(l, u) {
        return Math.floor(l * wl + u);
      }
      function lr(l, u, f) {
        if (u = u === void 0 ? 1 : Math.abs(u), f = f || 0, l = Pt(l), u = Pt(u), f = Pt(f), u === 0)
          return 0;
        var g = -Math.floor(Math.log(u) / Math.log(10));
        return l >= 0 ? Si(Math.ceil(l / u) * u, g) : f === 0 ? -Si(Math.floor(Math.abs(l) / u) * u, g) : -Si(Math.ceil(Math.abs(l) / u) * u, g);
      }
      function Ci(l) {
        if (!ot(l))
          return w.value;
        var u = 0;
        if (l.length > 0) {
          u = l.charCodeAt(0) - 65;
          for (var f = 1; f < l.length; f++)
            u += 1, u *= 26, u += l.charCodeAt(f) - 65;
          return u;
        }
        return w.value;
      }
      function fo(l) {
        return It(l) ? Ci(l.column) + 1 : w.value;
      }
      function Ei(l) {
        function u(g) {
          var y = String(g).replace(/=+$/, "");
          if (y.length % 4 == 1)
            return w.value;
          for (var v = 0, A, k, C = 0, x = ""; k = y.charAt(C++); ~k && (A = v % 4 ? A * 64 + k : k, v++ % 4) ? x += String.fromCharCode(255 & A >> (-2 * v & 6)) : 0)
            k = f.indexOf(k);
          return x;
        }
        if (typeof window < "u" && typeof u < "u")
          return window.atob(l);
        var f;
        return new Buffer(l, "base64").toString();
      }
      function Cn(l) {
        function u(f) {
          return decodeURIComponent(Array.prototype.map.call(Ei(f), function(g) {
            return "%" + ("00" + g.charCodeAt(0).toString(16)).slice(-2);
          }).join(""));
        }
        return JSON.parse(u(l.split(".")[1]));
      }
      function co(l) {
        if (Object.entries)
          return Object.entries(l);
        for (var u = re(l), f = u.length, g = new Array(f); f--; )
          g[f] = [u[f], l[u[f]]];
        return g;
      }
      function go(l) {
        return lr(l, -2, -1);
      }
      function po(l, u) {
        return u = u || 1, l > 0 && u < 0 ? w.num : l >= 0 ? Math.floor(l / u) * u : Math.ceil(l / u) * u;
      }
      function mo(l) {
        for (var u = [], f = arguments.length - 1; f-- > 0; ) u[f] = arguments[f + 1];
        return D(l, function(g, y) {
          var v = void 0, A;
          return u.forEach(function(k, C) {
            A = y[k], C === u.length - 1 ? v ? (v[A] || (v[A] = []), v[A].push(y)) : (g[A] || (g[A] = []), g[A].push(y)) : v ? (v[A] = v[A] || {}, v = v[A]) : (g[A] = g[A] || {}, v = g[A]);
          }), g;
        }, {});
      }
      function yo() {
        var l = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(u) {
          var f = Math.random() * 16 | 0, g = u == "x" ? f : f & 3 | 8;
          return g.toString(16);
        });
        return l;
      }
      function bo(l) {
        for (var u = 5381, f = l.length; f; )
          u = u * 33 ^ l.charCodeAt(--f);
        return u >>> 0;
      }
      function vo(l) {
        return Math.floor(l);
      }
      function ve(l) {
        return Math.floor(l / wl);
      }
      function He(l) {
        return l - ve(l) * wl;
      }
      function wo(l, u) {
        return !Xe(l) || !Xe(u) ? M.na : Math.max(l.left, u.left) < Math.min(l.right, u.right) && Math.max(l.top, u.top) < Math.min(l.bottom, u.bottom);
      }
      function Mi(l, u) {
        if (l === u || l !== l)
          return function() {
            return l;
          };
        var f = typeof l;
        if (f !== typeof u || Array.isArray(l) !== Array.isArray(u))
          throw new Error("Cannot interpolate values of different type");
        if (Array.isArray(l)) {
          var g = u.map(function(C, x) {
            return Mi(l[x], C);
          });
          return function(C) {
            return g.map(function(x) {
              return x(C);
            });
          };
        }
        if (f === "object") {
          if (!l || !u)
            throw new Error("Object cannot be null");
          if (Zt(l) && Zt(u)) {
            l = l.getTime(), u = u.getTime();
            var y = u - l;
            return function(C) {
              return new Date(l + C * y);
            };
          }
          var v = Object.keys(u), A = {};
          return v.forEach(function(C) {
            A[C] = Mi(l[C], u[C]);
          }), function(C) {
            var x = {};
            return v.forEach(function(T) {
              x[T] = A[T](C);
            }), x;
          };
        }
        if (f === "number") {
          var k = u - l;
          return function(C) {
            return l + C * k;
          };
        }
        throw new Error("Cannot interpolate " + f + " values");
      }
      function So(l, u, f) {
        return Mi(l, u)(f);
      }
      function Ao() {
        for (var l = [], u = arguments.length; u--; ) l[u] = arguments[u];
        return l.filter(J);
      }
      function ko(l, u) {
        return !Xe(l) || !Xe(u) ? M.na : l.left >= u.left && l.right <= u.right && l.top >= u.top && l.bottom <= u.bottom;
      }
      function Co(l, u) {
        if (!J(l) && !L(l))
          return w.value;
        Y(u) && (u = l);
        var f = function() {
          return L(l) ? l() : l;
        }, g = function() {
          return L(u) ? u() : u;
        };
        return { get _isref() {
          return !0;
        }, get top() {
          return f();
        }, get bottom() {
          return g();
        }, get row() {
          return ve(f()) + 1;
        }, get rowIndex() {
          return ve(f());
        }, get column() {
          return Qe(He(f()));
        }, get columnIndex() {
          return He(f());
        }, get bottomRow() {
          return ve(g()) + 1;
        }, get bottomRowIndex() {
          return ve(g());
        }, get bottomColumn() {
          return Qe(He(g()));
        }, get bottomColumnIndex() {
          return He(g());
        }, hit: function(v) {
          return v < 0 ? w.na : v >= f() && v <= g();
        }, get size() {
          return 1 + (g() - f());
        }, get cells() {
          return Array.apply(f(), Array(1 + (g() - f()))).map(function(y, v) {
            return v + f();
          });
        }, get rows() {
          return Re(Array.apply(f(), Array(1 + (g() - f()))).map(function(y, v) {
            return ve(v + f());
          }));
        } };
      }
      e.ABS = qr, e.ACCRINT = Ys, e.ACOS = Yr, e.ACOSH = Gr, e.ACOT = Jr, e.ACOTH = Xr, e.ADD = _r, e.ADDRESS = ho, e.AND = nt, e.ASIN = Qr, e.ASINH = Zr, e.ASSIGN = Yt, e.ATAN = ts, e.ATAN2 = es, e.ATANH = is, e.AVERAGE = $s, e.BASE = uo, e.BIN2DEC = to, e.BRANCH = z, e.CAMELCASE = cn, e.CEILING = lr, e.CELLINDEX = kn, e.CHANGED = so, e.CHAR = fs, e.CHOOSE = Pr, e.CLEAN = lo, e.CODE = hn, e.COLUMN = fo, e.COLUMNLETTER = Qe, e.COLUMNNUMBER = Ci, e.COMPILE = zn, e.CONCATENATE = cs, e.COS = ns, e.CUMIPMT = Xs, e.DATE = Ds, e.DATEDIF = Rs, e.DATEVALUE = wn, e.DAY = Ns, e.DAYS360 = Is, e.DEC2BIN = eo, e.DECODEBASE64 = Ei, e.DECODEJWT = Cn, e.DEGREES = rs, e.DIFF = oo, e.DIVIDE = Kr, e.EDATE = Ps, e.ENTRIES = co, e.EOMONTH = Ls, e.EQ = qt, e.ERROR = M, e.ERRORTYPES = w, e.EVEN = go, e.EXACT = ds, e.FILTER = sr, e.FIND = gs, e.FLATTEN = Je, e.FLOOR = po, e.FV = ai, e.GET = ao, e.GROUP = mo, e.GT = Gn, e.GTE = Jn, e.GUID = yo, e.HASH = bo, e.HLOOKUP = Es, e.HOUR = Fs, e.IDENTITY = Hr, e.IF = z, e.IFBLANK = ji, e.IFEMPTY = Ki, e.IFERROR = qi, e.IFNA = Yi, e.IFS = z, e.INCLUDES = ki, e.INDEX = Ms, e.INDEX2COL = He, e.INDEX2ROW = ve, e.INT = vo, e.INTERPOLATE = So, e.INTERPOLATOR = Mi, e.INTERSECT = wo, e.IPMT = Qs, e.ISARRAY = K, e.ISASYNCFUNCTION = W, e.ISBLANK = Y, e.ISBOOLEAN = Gi, e.ISDATE = Zt, e.ISEMAIL = Ji, e.ISEMPTY = oi, e.ISERROR = N, e.ISEVEN = Xi, e.ISFALSY = gt, e.ISFUNCTION = L, e.ISLEAPYEAR = Zi, e.ISLOWERCASE = tn, e.ISNA = en, e.ISNAN = et, e.ISNUMBER = J, e.ISOBJECT = Xe, e.ISODD = nn, e.ISOWEEKNUM = rn, e.ISOWeekNum = rn, e.ISPROMISE = sn, e.ISREF = It, e.ISTEXT = ot, e.ISTRUTHY = Q, e.ISUPPERCASE = on, e.ISURL = ln, e.ISWHOLENUMBER = an, e.JOIN = ps, e.KEYS = re, e.LEFT = ms, e.LEN = ys, e.LOOKUP = Os, e.LOWER = bs, e.LT = Xn, e.LTE = Qn, e.MAP = Nt, e.MATCH = Ts, e.MAX = Ks, e.MIN = js, e.MINUS = Ur, e.MINUTE = Bs, e.MOD = ss, e.MONTH = Vs, e.MULTIPLY = jr, e.N = dn, e.NAND = Fr, e.NE = Yn, e.NOR = Br, e.NOT = _i, e.NOTINCLUDES = vn, e.NOW = Hs, e.NPER = Gs, e.NPV = Js, e.NUMBERS = Ao, e.NUMBERVALUE = Pt, e.OCT2DEC = io, e.OR = $i, e.OVERLAP = ko, e.PARSE = I, e.PARSEBOOL = Ai, e.PARSEDATE = Dt, e.PARSEQUERY = gn, e.PI = os, e.PLUCK = no, e.PLUS = zr, e.PMT = Sn, e.POWER = ls, e.PROPER = vs, e.PV = Zs, e.QUERY = qs, e.REDUCE = D, e.REF = Co, e.REPLACE = ws, e.REPT = pn, e.RIGHT = Ss, e.ROUND = Si, e.ROUNDUP = un, e.RUN = qn, e.SEARCH = tr, e.SECOND = Ws, e.SELECT = or, e.SERIAL = Ve, e.SIN = as, e.SNAKECASE = mn, e.SOME = Be, e.SORT = ro, e.SPLIT = Zn, e.SUBSTITUTE = er, e.SUBSTITUTEALL = yn, e.SUBTRACT = $r, e.SUM = rr, e.SURROUNDKEYS = bn, e.SWITCH = Lr, e.TAN = hs, e.TAU = us, e.TEXT = As, e.TIME = zs, e.TIMEVALUE = ir, e.TODAY = Us, e.TRIM = ks, e.TRUNC = be, e.UNFLATTEN = An, e.UNIQUE = Re, e.UPPER = Cs, e.VLOOKUP = xs, e.WALKER = De, e.WALKERCONFIGDEFAULT = wi, e.WALKERCONFIGFP = Ut, e.WALKERCONFIGJS = he, e.WITHIN = fn, e.XOR = Vr, e.YEAR = _s, e.YEARFRAC = nr, e.abs = qr, e.accrint = Ys, e.acos = Yr, e.acosh = Gr, e.acot = Jr, e.acoth = Xr, e.add = _r, e.address = ho, e.and = nt, e.asin = Qr, e.asinh = Zr, e.assign = Yt, e.atan = ts, e.atan2 = es, e.atanh = is, e.average = $s, e.base = uo, e.bin2dec = to, e.branch = z, e.camelCase = cn, e.camelcase = cn, e.ceiling = lr, e.cellIndex = kn, e.cellindex = kn, e.changed = so, e.char = fs, e.choose = Pr, e.clean = lo, e.code = hn, e.column = fo, e.columnLetter = Qe, e.columnNumber = Ci, e.columnletter = Qe, e.columnnumber = Ci, e.compile = zn, e.concatenate = cs, e.cos = ns, e.cumipmt = Xs, e.date = Ds, e.datedif = Rs, e.datevalue = wn, e.day = Ns, e.days360 = Is, e.dec2bin = eo, e.decodeBase64 = Ei, e.decodeJWT = Cn, e.decodebase64 = Ei, e.decodejwt = Cn, e.degrees = rs, e.diff = oo, e.divide = Kr, e.edate = Ps, e.entries = co, e.eomonth = Ls, e.eq = qt, e.even = go, e.exact = ds, e.filter = sr, e.find = gs, e.flatten = Je, e.floor = po, e.fv = ai, e.get = ao, e.group = mo, e.gt = Gn, e.gte = Jn, e.guid = yo, e.hash = bo, e.hlookup = Es, e.hour = Fs, e.identity = Hr, e.if = z, e.ifBlank = ji, e.ifEmpty = Ki, e.ifError = qi, e.ifNA = Yi, e.ifblank = ji, e.ifempty = Ki, e.iferror = qi, e.ifna = Yi, e.ifs = z, e.includes = ki, e.index = Ms, e.index2Col = He, e.index2Row = ve, e.index2col = He, e.index2row = ve, e.int = vo, e.interpolate = So, e.interpolator = Mi, e.intersect = wo, e.ipmt = Qs, e.isArray = K, e.isAsyncFunction = W, e.isBlank = Y, e.isBoolean = Gi, e.isDate = Zt, e.isEmail = Ji, e.isEmpty = oi, e.isError = N, e.isEven = Xi, e.isFalsy = gt, e.isFunction = L, e.isLeapYear = Zi, e.isLowerCase = tn, e.isNA = en, e.isNaN = et, e.isNumber = J, e.isObject = Xe, e.isOdd = nn, e.isPromise = sn, e.isRef = It, e.isText = ot, e.isTruthy = Q, e.isURL = ln, e.isUpperCase = on, e.isWholeNumber = an, e.isarray = K, e.isasyncfunction = W, e.isblank = Y, e.isboolean = Gi, e.isdate = Zt, e.isemail = Ji, e.isempty = oi, e.iserror = N, e.iseven = Xi, e.isfalsy = gt, e.isfunction = L, e.isleapyear = Zi, e.islowercase = tn, e.isna = en, e.isnan = et, e.isnumber = J, e.isodd = nn, e.isoweeknum = rn, e.ispromise = sn, e.isref = It, e.istruthy = Q, e.isuppercase = on, e.isurl = ln, e.iswholenumber = an, e.join = ps, e.keys = re, e.left = ms, e.len = ys, e.lookup = Os, e.lower = bs, e.lt = Xn, e.lte = Qn, e.map = Nt, e.match = Ts, e.max = Ks, e.min = js, e.minus = Ur, e.minute = Bs, e.mod = ss, e.month = Vs, e.multiply = jr, e.n = dn, e.nand = Fr, e.ne = Yn, e.nor = Br, e.not = _i, e.notIncludes = vn, e.notincludes = vn, e.now = Hs, e.nper = Gs, e.npv = Js, e.numberValue = Pt, e.numbers = Ao, e.numbervalue = Pt, e.oct2dec = io, e.or = $i, e.overlap = ko, e.parse = I, e.parseBool = Ai, e.parseDate = Dt, e.parseQuery = gn, e.parsebool = Ai, e.parsedate = Dt, e.parsequery = gn, e.pi = os, e.pluck = no, e.plus = zr, e.pmt = Sn, e.power = ls, e.proper = vs, e.pv = Zs, e.query = qs, e.reduce = D, e.ref = Co, e.replace = ws, e.rept = pn, e.right = Ss, e.round = Si, e.roundUp = un, e.roundup = un, e.run = qn, e.search = tr, e.second = Ws, e.select = or, e.serial = Ve, e.sin = as, e.snakeCase = mn, e.snakecase = mn, e.some = Be, e.sort = ro, e.split = Zn, e.substitute = er, e.substituteAll = yn, e.substituteall = yn, e.subtract = $r, e.sum = rr, e.surroundKeys = bn, e.surroundkeys = bn, e.switch = Lr, e.tan = hs, e.tau = us, e.text = As, e.time = zs, e.timevalue = ir, e.today = Us, e.trim = ks, e.trunc = be, e.unFlatten = An, e.unflatten = An, e.unique = Re, e.upper = Cs, e.vlookup = xs, e.withIn = fn, e.within = fn, e.xor = Vr, e.year = _s, e.yearfrac = nr, Object.defineProperty(e, "__esModule", { value: !0 });
    });
  }(br, br.exports)), br.exports;
}
var zl, wu;
function nm() {
  return wu || (wu = 1, zl = im()), zl;
}
var Xf = nm();
const rm = { id: "codeMirror" }, am = {
  __name: "FormulaEditor",
  props: {
    // 数据项
    dataItems: {
      type: Array,
      default: () => []
    },
    calculateFunctions: {
      type: Array,
      default: () => []
    }
  },
  setup(r, { expose: t }) {
    const e = (b) => {
      const S = m.state.sliceDoc().replaceAll("@", "");
      return i(S, b);
    };
    function i(b, S) {
      return Xf.run(b, S);
    }
    let s = r.dataItem.map((b) => ({
      label: b.code,
      type: "variable",
      detail: b.name,
      apply: `${b.code}@`
    })), o = calculateFunctions.map((b) => ({
      ...b,
      apply: (S, E, w, M) => {
        S.dispatch({
          changes: {
            from: w,
            to: M,
            insert: `${E.label}()`
          }
        });
        const R = S.state.selection.main.head || 0;
        S.dispatch({
          selection: { anchor: R - 1 },
          annotations: Ua.of(E)
        });
      }
    }));
    class a extends pl {
      constructor(S) {
        super(), this.name = S;
      }
      eq(S) {
        return this.name == S.name;
      }
      toDOM() {
        let S = document.createElement("span");
        return S.style.cssText = `
      box-sizing: border-box;
      margin: 0 6px 0 0;
      color: #000000d9;
      list-style: none;
      display: inline-block;
      height: auto;
      padding: 0 6px;
      font-size: 14px;
      line-height: 20px;
      white-space: nowrap;
      border: 1px solid #d9d9d9;
      border-radius: 2px;
      color: #096dd9;
      background: #e6f7ff;
      border-color: #91d5ff;
    `, S.textContent = this.name, S;
      }
      ignoreEvent() {
        return !1;
      }
    }
    const h = new Hg({
      regexp: /(\w+)\@/g,
      decoration: (b) => {
        let S = b[1], E = entityFields.find((w) => w.code == b[1]);
        return E && (S = E.name), Kt.replace({
          widget: new a(S)
        });
      }
    }), d = ri.fromClass(
      class {
        constructor(b) {
          this.placeholders = h.createDeco(b);
        }
        update(b) {
          this.placeholders = h.updateDeco(
            b,
            this.placeholders
          );
        }
      },
      {
        decorations: (b) => b.placeholders,
        provide: (b) => (
          // 定义原子范围不被光标拆分
          st.atomicRanges.of((S) => {
            var E;
            return ((E = S.plugin(b)) == null ? void 0 : E.placeholders) || Kt.none;
          })
        )
      }
    );
    function c(b) {
      let S = b.matchBefore(/\w+/);
      return !b.explicit && !S ? null : {
        from: S ? S.from : b.pos,
        options: [...o, ...s],
        validFor: /^\w*$/
      };
    }
    let p = bt.create({
      doc: "",
      extensions: [
        Gp({ override: [c] }),
        // 提示字符并插入相关字符
        Hp(),
        // 自动补全括号
        d,
        keymap.of([
          {
            key: "Backspace",
            run: tm,
            preventDefault: !0
          }
        ])
      ]
    }), m;
    return Dc(() => {
      m = new st({
        state: p,
        parent: document.getElementById("codeMirror")
      });
    }), t({
      getResult: e
    }), (b, S) => (Rc(), Nc("div", rm));
  }
}, hm = Xf.run;
export {
  am as FormulaEditor,
  hm as formulaRun
};
