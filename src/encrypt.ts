// @ts-nocheck
function vt(t) {
  for (var e = 0; e < t; e++) this[e] = 0;
  this.length = t;
}
function zt(t) {
  return t % 4294967296;
}
function Bt(t, e) {
  return (
    (t = zt(t)),
    (e = zt(e)),
    t - 2147483648 >= 0 ? ((t %= 2147483648), (t >>= e), (t += 1073741824 >> (e - 1))) : (t >>= e),
    t
  );
}
function Ht(t) {
  return (t %= 2147483648), !0 & t ? ((t -= 1073741824), (t *= 2), (t += 2147483648)) : (t *= 2), t;
}
function kt(t, e) {
  (t = zt(t)), (e = zt(e));
  for (var s = 0; s < e; s++) t = Ht(t);
  return t;
}
function jt(t, e) {
  (t = zt(t)), (e = zt(e));
  var s = t - 2147483648,
    i = e - 2147483648;
  return s >= 0 ? (i >= 0 ? 2147483648 + (s & i) : s & e) : i >= 0 ? t & i : t & e;
}
function Ct(t, e) {
  (t = zt(t)), (e = zt(e));
  var s = t - 2147483648,
    i = e - 2147483648;
  return s >= 0 ? (i >= 0 ? 2147483648 + (s | i) : 2147483648 + (s | e)) : i >= 0 ? 2147483648 + (t | i) : t | e;
}
function wt(t, e) {
  (t = zt(t)), (e = zt(e));
  var s = t - 2147483648,
    i = e - 2147483648;
  return s >= 0 ? (i >= 0 ? s ^ i : 2147483648 + (s ^ e)) : i >= 0 ? 2147483648 + (t ^ i) : t ^ e;
}
function St(t) {
  return (t = zt(t)), 4294967295 - t;
}
var It = new vt(4),
  xt = new vt(2);
(xt[0] = 0), (xt[1] = 0);
var Ot = new vt(64),
  Tt = new vt(16),
  Dt = new vt(16),
  Et = 7,
  Lt = 12,
  Rt = 17,
  Ut = 22,
  Mt = 5,
  Nt = 9,
  Vt = 14,
  Zt = 20,
  Ft = 4,
  Pt = 11,
  Qt = 16,
  Gt = 23,
  Xt = 6,
  Jt = 10,
  Yt = 15,
  qt = 21;
function Kt(t, e, s) {
  return Ct(jt(t, e), jt(St(t), s));
}
function Wt(t, e, s) {
  return Ct(jt(t, s), jt(e, St(s)));
}
function $t(t, e, s) {
  return wt(wt(t, e), s);
}
function te(t, e, s) {
  return wt(e, Ct(t, St(s)));
}
function ee(t, e) {
  return Ct(kt(t, e), Bt(t, 32 - e));
}
function se(t, e, s, i, n, a, o) {
  return (t = t + Kt(e, s, i) + n + o), (t = ee(t, a)), (t += e), t;
}
function ie(t, e, s, i, n, a, o) {
  return (t = t + Wt(e, s, i) + n + o), (t = ee(t, a)), (t += e), t;
}
function ne(t, e, s, i, n, a, o) {
  return (t = t + $t(e, s, i) + n + o), (t = ee(t, a)), (t += e), t;
}
function ae(t, e, s, i, n, a, o) {
  return (t = t + te(e, s, i) + n + o), (t = ee(t, a)), (t += e), t;
}
function oe(t, e) {
  var s = 0,
    i = 0,
    n = 0,
    a = 0,
    o = Tt;
  (s = It[0]), (i = It[1]), (n = It[2]), (a = It[3]);
  for (var c = 0; c < 16; c++) {
    o[c] = jt(t[4 * c + e], 255);
    for (var r = 1; r < 4; r++) o[c] += kt(jt(t[4 * c + r + e], 255), 8 * r);
  }
  (s = se(s, i, n, a, o[0], Et, 3614090360)),
    (a = se(a, s, i, n, o[1], Lt, 3905402710)),
    (n = se(n, a, s, i, o[2], Rt, 606105819)),
    (i = se(i, n, a, s, o[3], Ut, 3250441966)),
    (s = se(s, i, n, a, o[4], Et, 4118548399)),
    (a = se(a, s, i, n, o[5], Lt, 1200080426)),
    (n = se(n, a, s, i, o[6], Rt, 2821735955)),
    (i = se(i, n, a, s, o[7], Ut, 4249261313)),
    (s = se(s, i, n, a, o[8], Et, 1770035416)),
    (a = se(a, s, i, n, o[9], Lt, 2336552879)),
    (n = se(n, a, s, i, o[10], Rt, 4294925233)),
    (i = se(i, n, a, s, o[11], Ut, 2304563134)),
    (s = se(s, i, n, a, o[12], Et, 1804603682)),
    (a = se(a, s, i, n, o[13], Lt, 4254626195)),
    (n = se(n, a, s, i, o[14], Rt, 2792965006)),
    (i = se(i, n, a, s, o[15], Ut, 1236535329)),
    (s = ie(s, i, n, a, o[1], Mt, 4129170786)),
    (a = ie(a, s, i, n, o[6], Nt, 3225465664)),
    (n = ie(n, a, s, i, o[11], Vt, 643717713)),
    (i = ie(i, n, a, s, o[0], Zt, 3921069994)),
    (s = ie(s, i, n, a, o[5], Mt, 3593408605)),
    (a = ie(a, s, i, n, o[10], Nt, 38016083)),
    (n = ie(n, a, s, i, o[15], Vt, 3634488961)),
    (i = ie(i, n, a, s, o[4], Zt, 3889429448)),
    (s = ie(s, i, n, a, o[9], Mt, 568446438)),
    (a = ie(a, s, i, n, o[14], Nt, 3275163606)),
    (n = ie(n, a, s, i, o[3], Vt, 4107603335)),
    (i = ie(i, n, a, s, o[8], Zt, 1163531501)),
    (s = ie(s, i, n, a, o[13], Mt, 2850285829)),
    (a = ie(a, s, i, n, o[2], Nt, 4243563512)),
    (n = ie(n, a, s, i, o[7], Vt, 1735328473)),
    (i = ie(i, n, a, s, o[12], Zt, 2368359562)),
    (s = ne(s, i, n, a, o[5], Ft, 4294588738)),
    (a = ne(a, s, i, n, o[8], Pt, 2272392833)),
    (n = ne(n, a, s, i, o[11], Qt, 1839030562)),
    (i = ne(i, n, a, s, o[14], Gt, 4259657740)),
    (s = ne(s, i, n, a, o[1], Ft, 2763975236)),
    (a = ne(a, s, i, n, o[4], Pt, 1272893353)),
    (n = ne(n, a, s, i, o[7], Qt, 4139469664)),
    (i = ne(i, n, a, s, o[10], Gt, 3200236656)),
    (s = ne(s, i, n, a, o[13], Ft, 681279174)),
    (a = ne(a, s, i, n, o[0], Pt, 3936430074)),
    (n = ne(n, a, s, i, o[3], Qt, 3572445317)),
    (i = ne(i, n, a, s, o[6], Gt, 76029189)),
    (s = ne(s, i, n, a, o[9], Ft, 3654602809)),
    (a = ne(a, s, i, n, o[12], Pt, 3873151461)),
    (n = ne(n, a, s, i, o[15], Qt, 530742520)),
    (i = ne(i, n, a, s, o[2], Gt, 3299628645)),
    (s = ae(s, i, n, a, o[0], Xt, 4096336452)),
    (a = ae(a, s, i, n, o[7], Jt, 1126891415)),
    (n = ae(n, a, s, i, o[14], Yt, 2878612391)),
    (i = ae(i, n, a, s, o[5], qt, 4237533241)),
    (s = ae(s, i, n, a, o[12], Xt, 1700485571)),
    (a = ae(a, s, i, n, o[3], Jt, 2399980690)),
    (n = ae(n, a, s, i, o[10], Yt, 4293915773)),
    (i = ae(i, n, a, s, o[1], qt, 2240044497)),
    (s = ae(s, i, n, a, o[8], Xt, 1873313359)),
    (a = ae(a, s, i, n, o[15], Jt, 4264355552)),
    (n = ae(n, a, s, i, o[6], Yt, 2734768916)),
    (i = ae(i, n, a, s, o[13], qt, 1309151649)),
    (s = ae(s, i, n, a, o[4], Xt, 4149444226)),
    (a = ae(a, s, i, n, o[11], Jt, 3174756917)),
    (n = ae(n, a, s, i, o[2], Yt, 718787259)),
    (i = ae(i, n, a, s, o[9], qt, 3951481745)),
    (It[0] += s),
    (It[1] += i),
    (It[2] += n),
    (It[3] += a);
}
function ce() {
  (xt[0] = xt[1] = 0), (It[0] = 1732584193), (It[1] = 4023233417), (It[2] = 2562383102), (It[3] = 271733878);
  for (var t = 0; t < Dt.length; t++) Dt[t] = 0;
}
function re(t) {
  var e;
  (e = jt(Bt(xt[0], 3), 63)),
    xt[0] < 4294967288 || (xt[1]++, (xt[0] -= 4294967296)),
    (xt[0] += 8),
    (Ot[e] = jt(t, 255)),
    e >= 63 && oe(Ot, 0);
}
function le() {
  var t,
    e = new vt(8),
    s = 0,
    i = 0,
    n = 0;
  for (s = 0; s < 4; s++) e[s] = jt(Bt(xt[0], 8 * s), 255);
  for (s = 0; s < 4; s++) e[s + 4] = jt(Bt(xt[1], 8 * s), 255);
  (i = jt(Bt(xt[0], 3), 63)), (n = i < 56 ? 56 - i : 120 - i), (t = new vt(64)), (t[0] = 128);
  for (s = 0; s < n; s++) re(t[s]);
  for (s = 0; s < 8; s++) re(e[s]);
  for (s = 0; s < 4; s++) for (var a = 0; a < 4; a++) Dt[4 * s + a] = jt(Bt(It[s], 8 * a), 255);
}
function Ae(t) {
  for (var e = '0123456789abcdef', s = '', i = t, n = 0; n < 8; n++)
    (s = e.charAt(Math.abs(i) % 16) + s), (i = Math.floor(i / 16));
  return s;
}
var he =
  '01234567890123456789012345678901 !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
export default function (t: string) {
  var e, s, i, n, a, o;
  ce();
  for (var c = 0; c < t.length; c++) (e = t.charAt(c)), re(he.lastIndexOf(e));
  le(), (i = n = a = o = 0);
  for (var r = 0; r < 4; r++) i += kt(Dt[15 - r], 8 * r);
  for (r = 4; r < 8; r++) n += kt(Dt[15 - r], 8 * (r - 4));
  for (r = 8; r < 12; r++) a += kt(Dt[15 - r], 8 * (r - 8));
  for (r = 12; r < 16; r++) o += kt(Dt[15 - r], 8 * (r - 12));
  return (s = Ae(o) + Ae(a) + Ae(n) + Ae(i)), s;
}
