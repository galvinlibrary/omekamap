(function (a) {
	function b(a, b, c) {
		switch (arguments.length) {
		case 2:
			return null != a ? a : b;
		case 3:
			return null != a ? a : null != b ? b : c;
		default:
			throw new Error("Implement me")
		}
	}
	function c(a, b) {
		return Ba.call(a, b)
	}
	function d() {
		return {
			empty : !1,
			unusedTokens : [],
			unusedInput : [],
			overflow : -2,
			charsLeftOver : 0,
			nullInput : !1,
			invalidMonth : null,
			invalidFormat : !1,
			userInvalidated : !1,
			iso : !1
		}
	}
	function e(a) {
		va.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + a)
	}
	function f(a, b) {
		var c = !0;
		return o(function () {
			return c && (e(a), c = !1),
			b.apply(this, arguments)
		}, b)
	}
	function g(a, b) {
		sb[a] || (e(b), sb[a] = !0)
	}
	function h(a, b) {
		return function (c) {
			return r(a.call(this, c), b)
		}
	}
	function i(a, b) {
		return function (c) {
			return this.localeData().ordinal(a.call(this, c), b)
		}
	}
	function j(a, b) {
		var c,
		d,
		e = 12 * (b.year() - a.year()) + (b.month() - a.month()),
		f = a.clone().add(e, "months");
		return 0 > b - f ? (c = a.clone().add(e - 1, "months"), d = (b - f) / (f - c)) : (c = a.clone().add(e + 1, "months"), d = (b - f) / (c - f)),
		 - (e + d)
	}
	function k(a, b, c) {
		var d;
		return null == c ? b : null != a.meridiemHour ? a.meridiemHour(b, c) : null != a.isPM ? (d = a.isPM(c), d && 12 > b && (b += 12), d || 12 !== b || (b = 0), b) : b
	}
	function l() {}

	function m(a, b) {
		b !== !1 && H(a),
		p(this, a),
		this._d = new Date(+a._d),
		ub === !1 && (ub = !0, va.updateOffset(this), ub = !1)
	}
	function n(a) {
		var b = A(a),
		c = b.year || 0,
		d = b.quarter || 0,
		e = b.month || 0,
		f = b.week || 0,
		g = b.day || 0,
		h = b.hour || 0,
		i = b.minute || 0,
		j = b.second || 0,
		k = b.millisecond || 0;
		this._milliseconds = +k + 1e3 * j + 6e4 * i + 36e5 * h,
		this._days = +g + 7 * f,
		this._months = +e + 3 * d + 12 * c,
		this._data = {},
		this._locale = va.localeData(),
		this._bubble()
	}
	function o(a, b) {
		for (var d in b)
			c(b, d) && (a[d] = b[d]);
		return c(b, "toString") && (a.toString = b.toString),
		c(b, "valueOf") && (a.valueOf = b.valueOf),
		a
	}
	function p(a, b) {
		var c,
		d,
		e;
		if ("undefined" != typeof b._isAMomentObject && (a._isAMomentObject = b._isAMomentObject), "undefined" != typeof b._i && (a._i = b._i), "undefined" != typeof b._f && (a._f = b._f), "undefined" != typeof b._l && (a._l = b._l), "undefined" != typeof b._strict && (a._strict = b._strict), "undefined" != typeof b._tzm && (a._tzm = b._tzm), "undefined" != typeof b._isUTC && (a._isUTC = b._isUTC), "undefined" != typeof b._offset && (a._offset = b._offset), "undefined" != typeof b._pf && (a._pf = b._pf), "undefined" != typeof b._locale && (a._locale = b._locale), Ka.length > 0)
			for (c in Ka)
				d = Ka[c], e = b[d], "undefined" != typeof e && (a[d] = e);
		return a
	}
	function q(a) {
		return 0 > a ? Math.ceil(a) : Math.floor(a)
	}
	function r(a, b, c) {
		for (var d = "" + Math.abs(a), e = a >= 0; d.length < b; )
			d = "0" + d;
		return (e ? c ? "+" : "" : "-") + d
	}
	function s(a, b) {
		var c = {
			milliseconds : 0,
			months : 0
		};
		return c.months = b.month() - a.month() + 12 * (b.year() - a.year()),
		a.clone().add(c.months, "M").isAfter(b) && --c.months,
		c.milliseconds = +b - +a.clone().add(c.months, "M"),
		c
	}
	function t(a, b) {
		var c;
		return b = M(b, a),
		a.isBefore(b) ? c = s(a, b) : (c = s(b, a), c.milliseconds = -c.milliseconds, c.months = -c.months),
		c
	}
	function u(a, b) {
		return function (c, d) {
			var e,
			f;
			return null === d || isNaN(+d) || (g(b, "moment()." + b + "(period, number) is deprecated. Please use moment()." + b + "(number, period)."), f = c, c = d, d = f),
			c = "string" == typeof c ? +c : c,
			e = va.duration(c, d),
			v(this, e, a),
			this
		}
	}
	function v(a, b, c, d) {
		var e = b._milliseconds,
		f = b._days,
		g = b._months;
		d = null == d ? !0 : d,
		e && a._d.setTime(+a._d + e * c),
		f && pa(a, "Date", oa(a, "Date") + f * c),
		g && na(a, oa(a, "Month") + g * c),
		d && va.updateOffset(a, f || g)
	}
	function w(a) {
		return "[object Array]" === Object.prototype.toString.call(a)
	}
	function x(a) {
		return "[object Date]" === Object.prototype.toString.call(a) || a instanceof Date
	}
	function y(a, b, c) {
		var d,
		e = Math.min(a.length, b.length),
		f = Math.abs(a.length - b.length),
		g = 0;
		for (d = 0; e > d; d++)
			(c && a[d] !== b[d] || !c && C(a[d]) !== C(b[d])) && g++;
		return g + f
	}
	function z(a) {
		if (a) {
			var b = a.toLowerCase().replace(/(.)s$/, "$1");
			a = lb[a] || mb[b] || b
		}
		return a
	}
	function A(a) {
		var b,
		d,
		e = {};
		for (d in a)
			c(a, d) && (b = z(d), b && (e[b] = a[d]));
		return e
	}
	function B(b) {
		var c,
		d;
		if (0 === b.indexOf("week"))
			c = 7, d = "day";
		else {
			if (0 !== b.indexOf("month"))
				return;
			c = 12,
			d = "month"
		}
		va[b] = function (e, f) {
			var g,
			h,
			i = va._locale[b],
			j = [];
			if ("number" == typeof e && (f = e, e = a), h = function (a) {
				var b = va().utc().set(d, a);
				return i.call(va._locale, b, e || "")
			}, null != f)
				return h(f);
			for (g = 0; c > g; g++)
				j.push(h(g));
			return j
		}
	}
	function C(a) {
		var b = +a,
		c = 0;
		return 0 !== b && isFinite(b) && (c = b >= 0 ? Math.floor(b) : Math.ceil(b)),
		c
	}
	function D(a, b) {
		return new Date(Date.UTC(a, b + 1, 0)).getUTCDate()
	}
	function E(a, b, c) {
		return ja(va([a, 11, 31 + b - c]), b, c).week
	}
	function F(a) {
		return G(a) ? 366 : 365
	}
	function G(a) {
		return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0
	}
	function H(a) {
		var b;
		a._a && -2 === a._pf.overflow && (b = a._a[Da] < 0 || a._a[Da] > 11 ? Da : a._a[Ea] < 1 || a._a[Ea] > D(a._a[Ca], a._a[Da]) ? Ea : a._a[Fa] < 0 || a._a[Fa] > 24 || 24 === a._a[Fa] && (0 !== a._a[Ga] || 0 !== a._a[Ha] || 0 !== a._a[Ia]) ? Fa : a._a[Ga] < 0 || a._a[Ga] > 59 ? Ga : a._a[Ha] < 0 || a._a[Ha] > 59 ? Ha : a._a[Ia] < 0 || a._a[Ia] > 999 ? Ia : -1, a._pf._overflowDayOfYear && (Ca > b || b > Ea) && (b = Ea), a._pf.overflow = b)
	}
	function I(b) {
		return null == b._isValid && (b._isValid = !isNaN(b._d.getTime()) && b._pf.overflow < 0 && !b._pf.empty && !b._pf.invalidMonth && !b._pf.nullInput && !b._pf.invalidFormat && !b._pf.userInvalidated, b._strict && (b._isValid = b._isValid && 0 === b._pf.charsLeftOver && 0 === b._pf.unusedTokens.length && b._pf.bigHour === a)),
		b._isValid
	}
	function J(a) {
		return a ? a.toLowerCase().replace("_", "-") : a
	}
	function K(a) {
		for (var b, c, d, e, f = 0; f < a.length; ) {
			for (e = J(a[f]).split("-"), b = e.length, c = J(a[f + 1]), c = c ? c.split("-") : null; b > 0; ) {
				if (d = L(e.slice(0, b).join("-")))
					return d;
				if (c && c.length >= b && y(e, c, !0) >= b - 1)
					break;
				b--
			}
			f++
		}
		return null
	}
	function L(a) {
		var b = null;
		if (!Ja[a] && La)
			try {
				b = va.locale(),
				require("./locale/" + a),
				va.locale(b)
			} catch (c) {}

		return Ja[a]
	}
	function M(a, b) {
		var c,
		d;
		return b._isUTC ? (c = b.clone(), d = (va.isMoment(a) || x(a) ? +a : +va(a)) - +c, c._d.setTime(+c._d + d), va.updateOffset(c, !1), c) : va(a).local()
	}
	function N(a) {
		return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "")
	}
	function O(a) {
		var b,
		c,
		d = a.match(Pa);
		for (b = 0, c = d.length; c > b; b++)
			d[b] = rb[d[b]] ? rb[d[b]] : N(d[b]);
		return function (e) {
			var f = "";
			for (b = 0; c > b; b++)
				f += d[b]instanceof Function ? d[b].call(e, a) : d[b];
			return f
		}
	}
	function P(a, b) {
		return a.isValid() ? (b = Q(b, a.localeData()), nb[b] || (nb[b] = O(b)), nb[b](a)) : a.localeData().invalidDate()
	}
	function Q(a, b) {
		function c(a) {
			return b.longDateFormat(a) || a
		}
		var d = 5;
		for (Qa.lastIndex = 0; d >= 0 && Qa.test(a); )
			a = a.replace(Qa, c), Qa.lastIndex = 0, d -= 1;
		return a
	}
	function R(a, b) {
		var c,
		d = b._strict;
		switch (a) {
		case "Q":
			return _a;
		case "DDDD":
			return bb;
		case "YYYY":
		case "GGGG":
		case "gggg":
			return d ? cb : Ta;
		case "Y":
		case "G":
		case "g":
			return eb;
		case "YYYYYY":
		case "YYYYY":
		case "GGGGG":
		case "ggggg":
			return d ? db : Ua;
		case "S":
			if (d)
				return _a;
		case "SS":
			if (d)
				return ab;
		case "SSS":
			if (d)
				return bb;
		case "DDD":
			return Sa;
		case "MMM":
		case "MMMM":
		case "dd":
		case "ddd":
		case "dddd":
			return Wa;
		case "a":
		case "A":
			return b._locale._meridiemParse;
		case "x":
			return Za;
		case "X":
			return $a;
		case "Z":
		case "ZZ":
			return Xa;
		case "T":
			return Ya;
		case "SSSS":
			return Va;
		case "MM":
		case "DD":
		case "YY":
		case "GG":
		case "gg":
		case "HH":
		case "hh":
		case "mm":
		case "ss":
		case "ww":
		case "WW":
			return d ? ab : Ra;
		case "M":
		case "D":
		case "d":
		case "H":
		case "h":
		case "m":
		case "s":
		case "w":
		case "W":
		case "e":
		case "E":
			return Ra;
		case "Do":
			return d ? b._locale._ordinalParse : b._locale._ordinalParseLenient;
		default:
			return c = new RegExp($(Z(a.replace("\\", "")), "i"))
		}
	}
	function S(a) {
		a = a || "";
		var b = a.match(Xa) || [],
		c = b[b.length - 1] || [],
		d = (c + "").match(jb) || ["-", 0, 0],
		e =  + (60 * d[1]) + C(d[2]);
		return "+" === d[0] ? e : -e
	}
	function T(a, b, c) {
		var d,
		e = c._a;
		switch (a) {
		case "Q":
			null != b && (e[Da] = 3 * (C(b) - 1));
			break;
		case "M":
		case "MM":
			null != b && (e[Da] = C(b) - 1);
			break;
		case "MMM":
		case "MMMM":
			d = c._locale.monthsParse(b, a, c._strict),
			null != d ? e[Da] = d : c._pf.invalidMonth = b;
			break;
		case "D":
		case "DD":
			null != b && (e[Ea] = C(b));
			break;
		case "Do":
			null != b && (e[Ea] = C(parseInt(b.match(/\d{1,2}/)[0], 10)));
			break;
		case "DDD":
		case "DDDD":
			null != b && (c._dayOfYear = C(b));
			break;
		case "YY":
			e[Ca] = va.parseTwoDigitYear(b);
			break;
		case "YYYY":
		case "YYYYY":
		case "YYYYYY":
			e[Ca] = C(b);
			break;
		case "a":
		case "A":
			c._meridiem = b;
			break;
		case "h":
		case "hh":
			c._pf.bigHour = !0;
		case "H":
		case "HH":
			e[Fa] = C(b);
			break;
		case "m":
		case "mm":
			e[Ga] = C(b);
			break;
		case "s":
		case "ss":
			e[Ha] = C(b);
			break;
		case "S":
		case "SS":
		case "SSS":
		case "SSSS":
			e[Ia] = C(1e3 * ("0." + b));
			break;
		case "x":
			c._d = new Date(C(b));
			break;
		case "X":
			c._d = new Date(1e3 * parseFloat(b));
			break;
		case "Z":
		case "ZZ":
			c._useUTC = !0,
			c._tzm = S(b);
			break;
		case "dd":
		case "ddd":
		case "dddd":
			d = c._locale.weekdaysParse(b),
			null != d ? (c._w = c._w || {}, c._w.d = d) : c._pf.invalidWeekday = b;
			break;
		case "w":
		case "ww":
		case "W":
		case "WW":
		case "d":
		case "e":
		case "E":
			a = a.substr(0, 1);
		case "gggg":
		case "GGGG":
		case "GGGGG":
			a = a.substr(0, 2),
			b && (c._w = c._w || {}, c._w[a] = C(b));
			break;
		case "gg":
		case "GG":
			c._w = c._w || {},
			c._w[a] = va.parseTwoDigitYear(b)
		}
	}
	function U(a) {
		var c,
		d,
		e,
		f,
		g,
		h,
		i;
		c = a._w,
		null != c.GG || null != c.W || null != c.E ? (g = 1, h = 4, d = b(c.GG, a._a[Ca], ja(va(), 1, 4).year), e = b(c.W, 1), f = b(c.E, 1)) : (g = a._locale._week.dow, h = a._locale._week.doy, d = b(c.gg, a._a[Ca], ja(va(), g, h).year), e = b(c.w, 1), null != c.d ? (f = c.d, g > f && ++e) : f = null != c.e ? c.e + g : g),
		i = ka(d, e, f, h, g),
		a._a[Ca] = i.year,
		a._dayOfYear = i.dayOfYear
	}
	function V(a) {
		var c,
		d,
		e,
		f,
		g = [];
		if (!a._d) {
			for (e = X(a), a._w && null == a._a[Ea] && null == a._a[Da] && U(a), a._dayOfYear && (f = b(a._a[Ca], e[Ca]), a._dayOfYear > F(f) && (a._pf._overflowDayOfYear = !0), d = fa(f, 0, a._dayOfYear), a._a[Da] = d.getUTCMonth(), a._a[Ea] = d.getUTCDate()), c = 0; 3 > c && null == a._a[c]; ++c)
				a._a[c] = g[c] = e[c];
			for (; 7 > c; c++)
				a._a[c] = g[c] = null == a._a[c] ? 2 === c ? 1 : 0 : a._a[c];
			24 === a._a[Fa] && 0 === a._a[Ga] && 0 === a._a[Ha] && 0 === a._a[Ia] && (a._nextDay = !0, a._a[Fa] = 0),
			a._d = (a._useUTC ? fa : ea).apply(null, g),
			null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm),
			a._nextDay && (a._a[Fa] = 24)
		}
	}
	function W(a) {
		var b;
		a._d || (b = A(a._i), a._a = [b.year, b.month, b.day || b.date, b.hour, b.minute, b.second, b.millisecond], V(a))
	}
	function X(a) {
		var b = new Date;
		return a._useUTC ? [b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate()] : [b.getFullYear(), b.getMonth(), b.getDate()]
	}
	function Y(b) {
		if (b._f === va.ISO_8601)
			return void aa(b);
		b._a = [],
		b._pf.empty = !0;
		var c,
		d,
		e,
		f,
		g,
		h = "" + b._i,
		i = h.length,
		j = 0;
		for (e = Q(b._f, b._locale).match(Pa) || [], c = 0; c < e.length; c++)
			f = e[c], d = (h.match(R(f, b)) || [])[0], d && (g = h.substr(0, h.indexOf(d)), g.length > 0 && b._pf.unusedInput.push(g), h = h.slice(h.indexOf(d) + d.length), j += d.length), rb[f] ? (d ? b._pf.empty = !1 : b._pf.unusedTokens.push(f), T(f, d, b)) : b._strict && !d && b._pf.unusedTokens.push(f);
		b._pf.charsLeftOver = i - j,
		h.length > 0 && b._pf.unusedInput.push(h),
		b._pf.bigHour === !0 && b._a[Fa] <= 12 && (b._pf.bigHour = a),
		b._a[Fa] = k(b._locale, b._a[Fa], b._meridiem),
		V(b),
		H(b)
	}
	function Z(a) {
		return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (a, b, c, d, e) {
			return b || c || d || e
		})
	}
	function $(a) {
		return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
	}
	function _(a) {
		var b,
		c,
		e,
		f,
		g;
		if (0 === a._f.length)
			return a._pf.invalidFormat = !0, void(a._d = new Date(0 / 0));
		for (f = 0; f < a._f.length; f++)
			g = 0, b = p({}, a), null != a._useUTC && (b._useUTC = a._useUTC), b._pf = d(), b._f = a._f[f], Y(b), I(b) && (g += b._pf.charsLeftOver, g += 10 * b._pf.unusedTokens.length, b._pf.score = g, (null == e || e > g) && (e = g, c = b));
		o(a, c || b)
	}
	function aa(a) {
		var b,
		c,
		d = a._i,
		e = fb.exec(d);
		if (e) {
			for (a._pf.iso = !0, b = 0, c = hb.length; c > b; b++)
				if (hb[b][1].exec(d)) {
					a._f = hb[b][0] + (e[6] || " ");
					break
				}
			for (b = 0, c = ib.length; c > b; b++)
				if (ib[b][1].exec(d)) {
					a._f += ib[b][0];
					break
				}
			d.match(Xa) && (a._f += "Z"),
			Y(a)
		} else
			a._isValid = !1
	}
	function ba(a) {
		aa(a),
		a._isValid === !1 && (delete a._isValid, va.createFromInputFallback(a))
	}
	function ca(a, b) {
		var c,
		d = [];
		for (c = 0; c < a.length; ++c)
			d.push(b(a[c], c));
		return d
	}
	function da(b) {
		var c,
		d = b._i;
		d === a ? b._d = new Date : x(d) ? b._d = new Date(+d) : null !== (c = Ma.exec(d)) ? b._d = new Date(+c[1]) : "string" == typeof d ? ba(b) : w(d) ? (b._a = ca(d.slice(0), function (a) {
						return parseInt(a, 10)
					}), V(b)) : "object" == typeof d ? W(b) : "number" == typeof d ? b._d = new Date(d) : va.createFromInputFallback(b)
	}
	function ea(a, b, c, d, e, f, g) {
		var h = new Date(a, b, c, d, e, f, g);
		return 1970 > a && h.setFullYear(a),
		h
	}
	function fa(a) {
		var b = new Date(Date.UTC.apply(null, arguments));
		return 1970 > a && b.setUTCFullYear(a),
		b
	}
	function ga(a, b) {
		if ("string" == typeof a)
			if (isNaN(a)) {
				if (a = b.weekdaysParse(a), "number" != typeof a)
					return null
			} else
				a = parseInt(a, 10);
		return a
	}
	function ha(a, b, c, d, e) {
		return e.relativeTime(b || 1, !!c, a, d)
	}
	function ia(a, b, c) {
		var d = va.duration(a).abs(),
		e = Aa(d.as("s")),
		f = Aa(d.as("m")),
		g = Aa(d.as("h")),
		h = Aa(d.as("d")),
		i = Aa(d.as("M")),
		j = Aa(d.as("y")),
		k = e < ob.s && ["s", e] || 1 === f && ["m"] || f < ob.m && ["mm", f] || 1 === g && ["h"] || g < ob.h && ["hh", g] || 1 === h && ["d"] || h < ob.d && ["dd", h] || 1 === i && ["M"] || i < ob.M && ["MM", i] || 1 === j && ["y"] || ["yy", j];
		return k[2] = b,
		k[3] = +a > 0,
		k[4] = c,
		ha.apply({}, k)
	}
	function ja(a, b, c) {
		var d,
		e = c - b,
		f = c - a.day();
		return f > e && (f -= 7),
		e - 7 > f && (f += 7),
		d = va(a).add(f, "d"), {
			week : Math.ceil(d.dayOfYear() / 7),
			year : d.year()
		}
	}
	function ka(a, b, c, d, e) {
		var f,
		g,
		h = fa(a, 0, 1).getUTCDay();
		return h = 0 === h ? 7 : h,
		c = null != c ? c : e,
		f = e - h + (h > d ? 7 : 0) - (e > h ? 7 : 0),
		g = 7 * (b - 1) + (c - e) + f + 1, {
			year : g > 0 ? a : a - 1,
			dayOfYear : g > 0 ? g : F(a - 1) + g
		}
	}
	function la(b) {
		var c,
		d = b._i,
		e = b._f;
		return b._locale = b._locale || va.localeData(b._l),
		null === d || e === a && "" === d ? va.invalid({
			nullInput : !0
		}) : ("string" == typeof d && (b._i = d = b._locale.preparse(d)), va.isMoment(d) ? new m(d, !0) : (e ? w(e) ? _(b) : Y(b) : da(b), c = new m(b), c._nextDay && (c.add(1, "d"), c._nextDay = a), c))
	}
	function ma(a, b) {
		var c,
		d;
		if (1 === b.length && w(b[0]) && (b = b[0]), !b.length)
			return va();
		for (c = b[0], d = 1; d < b.length; ++d)
			b[d][a](c) && (c = b[d]);
		return c
	}
	function na(a, b) {
		var c;
		return "string" == typeof b && (b = a.localeData().monthsParse(b), "number" != typeof b) ? a : (c = Math.min(a.date(), D(a.year(), b)), a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c), a)
	}
	function oa(a, b) {
		return a._d["get" + (a._isUTC ? "UTC" : "") + b]()
	}
	function pa(a, b, c) {
		return "Month" === b ? na(a, c) : a._d["set" + (a._isUTC ? "UTC" : "") + b](c)
	}
	function qa(a, b) {
		return function (c) {
			return null != c ? (pa(this, a, c), va.updateOffset(this, b), this) : oa(this, a)
		}
	}
	function ra(a) {
		return 400 * a / 146097
	}
	function sa(a) {
		return 146097 * a / 400
	}
	function ta(a) {
		va.duration.fn[a] = function () {
			return this._data[a]
		}
	}
	function ua(a) {
		"undefined" == typeof ender && (wa = za.moment, za.moment = a ? f("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.", va) : va)
	}
	for (var va, wa, xa, ya = "2.9.0", za = "undefined" == typeof global || "undefined" != typeof window && window !== global.window ? this : global, Aa = Math.round, Ba = Object.prototype.hasOwnProperty, Ca = 0, Da = 1, Ea = 2, Fa = 3, Ga = 4, Ha = 5, Ia = 6, Ja = {}, Ka = [], La = "undefined" != typeof module && module && module.exports, Ma = /^\/?Date\((\-?\d+)/i, Na = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, Oa = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, Pa = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g, Qa = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Ra = /\d\d?/, Sa = /\d{1,3}/, Ta = /\d{1,4}/, Ua = /[+\-]?\d{1,6}/, Va = /\d+/, Wa = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, Xa = /Z|[\+\-]\d\d:?\d\d/gi, Ya = /T/i, Za = /[\+\-]?\d+/, $a = /[\+\-]?\d+(\.\d{1,3})?/, _a = /\d/, ab = /\d\d/, bb = /\d{3}/, cb = /\d{4}/, db = /[+-]?\d{6}/, eb = /[+-]?\d+/, fb = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, gb = "YYYY-MM-DDTHH:mm:ssZ", hb = [["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/], ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/], ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/], ["GGGG-[W]WW", /\d{4}-W\d{2}/], ["YYYY-DDD", /\d{4}-\d{3}/]], ib = [["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/], ["HH:mm", /(T| )\d\d:\d\d/], ["HH", /(T| )\d\d/]], jb = /([\+\-]|\d\d)/gi, kb = ("Date|Hours|Minutes|Seconds|Milliseconds".split("|"), {
			Milliseconds : 1,
			Seconds : 1e3,
			Minutes : 6e4,
			Hours : 36e5,
			Days : 864e5,
			Months : 2592e6,
			Years : 31536e6
		}), lb = {
			ms : "millisecond",
			s : "second",
			m : "minute",
			h : "hour",
			d : "day",
			D : "date",
			w : "week",
			W : "isoWeek",
			M : "month",
			Q : "quarter",
			y : "year",
			DDD : "dayOfYear",
			e : "weekday",
			E : "isoWeekday",
			gg : "weekYear",
			GG : "isoWeekYear"
		}, mb = {
			dayofyear : "dayOfYear",
			isoweekday : "isoWeekday",
			isoweek : "isoWeek",
			weekyear : "weekYear",
			isoweekyear : "isoWeekYear"
		}, nb = {}, ob = {
			s : 45,
			m : 45,
			h : 22,
			d : 26,
			M : 11
		}, pb = "DDD w W M D d".split(" "), qb = "M D H h m s w W".split(" "), rb = {
			M : function () {
				return this.month() + 1
			},
			MMM : function (a) {
				return this.localeData().monthsShort(this, a)
			},
			MMMM : function (a) {
				return this.localeData().months(this, a)
			},
			D : function () {
				return this.date()
			},
			DDD : function () {
				return this.dayOfYear()
			},
			d : function () {
				return this.day()
			},
			dd : function (a) {
				return this.localeData().weekdaysMin(this, a)
			},
			ddd : function (a) {
				return this.localeData().weekdaysShort(this, a)
			},
			dddd : function (a) {
				return this.localeData().weekdays(this, a)
			},
			w : function () {
				return this.week()
			},
			W : function () {
				return this.isoWeek()
			},
			YY : function () {
				return r(this.year() % 100, 2)
			},
			YYYY : function () {
				return r(this.year(), 4)
			},
			YYYYY : function () {
				return r(this.year(), 5)
			},
			YYYYYY : function () {
				var a = this.year(),
				b = a >= 0 ? "+" : "-";
				return b + r(Math.abs(a), 6)
			},
			gg : function () {
				return r(this.weekYear() % 100, 2)
			},
			gggg : function () {
				return r(this.weekYear(), 4)
			},
			ggggg : function () {
				return r(this.weekYear(), 5)
			},
			GG : function () {
				return r(this.isoWeekYear() % 100, 2)
			},
			GGGG : function () {
				return r(this.isoWeekYear(), 4)
			},
			GGGGG : function () {
				return r(this.isoWeekYear(), 5)
			},
			e : function () {
				return this.weekday()
			},
			E : function () {
				return this.isoWeekday()
			},
			a : function () {
				return this.localeData().meridiem(this.hours(), this.minutes(), !0)
			},
			A : function () {
				return this.localeData().meridiem(this.hours(), this.minutes(), !1)
			},
			H : function () {
				return this.hours()
			},
			h : function () {
				return this.hours() % 12 || 12
			},
			m : function () {
				return this.minutes()
			},
			s : function () {
				return this.seconds()
			},
			S : function () {
				return C(this.milliseconds() / 100)
			},
			SS : function () {
				return r(C(this.milliseconds() / 10), 2)
			},
			SSS : function () {
				return r(this.milliseconds(), 3)
			},
			SSSS : function () {
				return r(this.milliseconds(), 3)
			},
			Z : function () {
				var a = this.utcOffset(),
				b = "+";
				return 0 > a && (a = -a, b = "-"),
				b + r(C(a / 60), 2) + ":" + r(C(a) % 60, 2)
			},
			ZZ : function () {
				var a = this.utcOffset(),
				b = "+";
				return 0 > a && (a = -a, b = "-"),
				b + r(C(a / 60), 2) + r(C(a) % 60, 2)
			},
			z : function () {
				return this.zoneAbbr()
			},
			zz : function () {
				return this.zoneName()
			},
			x : function () {
				return this.valueOf()
			},
			X : function () {
				return this.unix()
			},
			Q : function () {
				return this.quarter()
			}
		}, sb = {}, tb = ["months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin"], ub = !1; pb.length; )
		xa = pb.pop(), rb[xa + "o"] = i(rb[xa], xa);
	for (; qb.length; )
		xa = qb.pop(), rb[xa + xa] = h(rb[xa], 2);
	rb.DDDD = h(rb.DDD, 3),
	o(l.prototype, {
		set : function (a) {
			var b,
			c;
			for (c in a)
				b = a[c], "function" == typeof b ? this[c] = b : this["_" + c] = b;
			this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
		},
		_months : "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
		months : function (a) {
			return this._months[a.month()]
		},
		_monthsShort : "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
		monthsShort : function (a) {
			return this._monthsShort[a.month()]
		},
		monthsParse : function (a, b, c) {
			var d,
			e,
			f;
			for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), d = 0; 12 > d; d++) {
				if (e = va.utc([2e3, d]), c && !this._longMonthsParse[d] && (this._longMonthsParse[d] = new RegExp("^" + this.months(e, "").replace(".", "") + "$", "i"), this._shortMonthsParse[d] = new RegExp("^" + this.monthsShort(e, "").replace(".", "") + "$", "i")), c || this._monthsParse[d] || (f = "^" + this.months(e, "") + "|^" + this.monthsShort(e, ""), this._monthsParse[d] = new RegExp(f.replace(".", ""), "i")), c && "MMMM" === b && this._longMonthsParse[d].test(a))
					return d;
				if (c && "MMM" === b && this._shortMonthsParse[d].test(a))
					return d;
				if (!c && this._monthsParse[d].test(a))
					return d
			}
		},
		_weekdays : "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
		weekdays : function (a) {
			return this._weekdays[a.day()]
		},
		_weekdaysShort : "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
		weekdaysShort : function (a) {
			return this._weekdaysShort[a.day()]
		},
		_weekdaysMin : "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
		weekdaysMin : function (a) {
			return this._weekdaysMin[a.day()]
		},
		weekdaysParse : function (a) {
			var b,
			c,
			d;
			for (this._weekdaysParse || (this._weekdaysParse = []), b = 0; 7 > b; b++)
				if (this._weekdaysParse[b] || (c = va([2e3, 1]).day(b), d = "^" + this.weekdays(c, "") + "|^" + this.weekdaysShort(c, "") + "|^" + this.weekdaysMin(c, ""), this._weekdaysParse[b] = new RegExp(d.replace(".", ""), "i")), this._weekdaysParse[b].test(a))
					return b
		},
		_longDateFormat : {
			LTS : "h:mm:ss A",
			LT : "h:mm A",
			L : "MM/DD/YYYY",
			LL : "MMMM D, YYYY",
			LLL : "MMMM D, YYYY LT",
			LLLL : "dddd, MMMM D, YYYY LT"
		},
		longDateFormat : function (a) {
			var b = this._longDateFormat[a];
			return !b && this._longDateFormat[a.toUpperCase()] && (b = this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (a) {
						return a.slice(1)
					}), this._longDateFormat[a] = b),
			b
		},
		isPM : function (a) {
			return "p" === (a + "").toLowerCase().charAt(0)
		},
		_meridiemParse : /[ap]\.?m?\.?/i,
		meridiem : function (a, b, c) {
			return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM"
		},
		_calendar : {
			sameDay : "[Today at] LT",
			nextDay : "[Tomorrow at] LT",
			nextWeek : "dddd [at] LT",
			lastDay : "[Yesterday at] LT",
			lastWeek : "[Last] dddd [at] LT",
			sameElse : "L"
		},
		calendar : function (a, b, c) {
			var d = this._calendar[a];
			return "function" == typeof d ? d.apply(b, [c]) : d
		},
		_relativeTime : {
			future : "in %s",
			past : "%s ago",
			s : "a few seconds",
			m : "a minute",
			mm : "%d minutes",
			h : "an hour",
			hh : "%d hours",
			d : "a day",
			dd : "%d days",
			M : "a month",
			MM : "%d months",
			y : "a year",
			yy : "%d years"
		},
		relativeTime : function (a, b, c, d) {
			var e = this._relativeTime[c];
			return "function" == typeof e ? e(a, b, c, d) : e.replace(/%d/i, a)
		},
		pastFuture : function (a, b) {
			var c = this._relativeTime[a > 0 ? "future" : "past"];
			return "function" == typeof c ? c(b) : c.replace(/%s/i, b)
		},
		ordinal : function (a) {
			return this._ordinal.replace("%d", a)
		},
		_ordinal : "%d",
		_ordinalParse : /\d{1,2}/,
		preparse : function (a) {
			return a
		},
		postformat : function (a) {
			return a
		},
		week : function (a) {
			return ja(a, this._week.dow, this._week.doy).week
		},
		_week : {
			dow : 0,
			doy : 6
		},
		firstDayOfWeek : function () {
			return this._week.dow
		},
		firstDayOfYear : function () {
			return this._week.doy
		},
		_invalidDate : "Invalid date",
		invalidDate : function () {
			return this._invalidDate
		}
	}),
	va = function (b, c, e, f) {
		var g;
		return "boolean" == typeof e && (f = e, e = a),
		g = {},
		g._isAMomentObject = !0,
		g._i = b,
		g._f = c,
		g._l = e,
		g._strict = f,
		g._isUTC = !1,
		g._pf = d(),
		la(g)
	},
	va.suppressDeprecationWarnings = !1,
	va.createFromInputFallback = f("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function (a) {
			a._d = new Date(a._i + (a._useUTC ? " UTC" : ""))
		}),
	va.min = function () {
		var a = [].slice.call(arguments, 0);
		return ma("isBefore", a)
	},
	va.max = function () {
		var a = [].slice.call(arguments, 0);
		return ma("isAfter", a)
	},
	va.utc = function (b, c, e, f) {
		var g;
		return "boolean" == typeof e && (f = e, e = a),
		g = {},
		g._isAMomentObject = !0,
		g._useUTC = !0,
		g._isUTC = !0,
		g._l = e,
		g._i = b,
		g._f = c,
		g._strict = f,
		g._pf = d(),
		la(g).utc()
	},
	va.unix = function (a) {
		return va(1e3 * a)
	},
	va.duration = function (a, b) {
		var d,
		e,
		f,
		g,
		h = a,
		i = null;
		return va.isDuration(a) ? h = {
			ms : a._milliseconds,
			d : a._days,
			M : a._months
		}
		 : "number" == typeof a ? (h = {}, b ? h[b] = a : h.milliseconds = a) : (i = Na.exec(a)) ? (d = "-" === i[1] ? -1 : 1, h = {
				y : 0,
				d : C(i[Ea]) * d,
				h : C(i[Fa]) * d,
				m : C(i[Ga]) * d,
				s : C(i[Ha]) * d,
				ms : C(i[Ia]) * d
			}) : (i = Oa.exec(a)) ? (d = "-" === i[1] ? -1 : 1, f = function (a) {
			var b = a && parseFloat(a.replace(",", "."));
			return (isNaN(b) ? 0 : b) * d
		}, h = {
				y : f(i[2]),
				M : f(i[3]),
				d : f(i[4]),
				h : f(i[5]),
				m : f(i[6]),
				s : f(i[7]),
				w : f(i[8])
			}) : null == h ? h = {}

		 : "object" == typeof h && ("from" in h || "to" in h) && (g = t(va(h.from), va(h.to)), h = {}, h.ms = g.milliseconds, h.M = g.months),
		e = new n(h),
		va.isDuration(a) && c(a, "_locale") && (e._locale = a._locale),
		e
	},
	va.version = ya,
	va.defaultFormat = gb,
	va.ISO_8601 = function () {},
	va.momentProperties = Ka,
	va.updateOffset = function () {},
	va.relativeTimeThreshold = function (b, c) {
		return ob[b] === a ? !1 : c === a ? ob[b] : (ob[b] = c, !0)
	},
	va.lang = f("moment.lang is deprecated. Use moment.locale instead.", function (a, b) {
			return va.locale(a, b)
		}),
	va.locale = function (a, b) {
		var c;
		return a && (c = "undefined" != typeof b ? va.defineLocale(a, b) : va.localeData(a), c && (va.duration._locale = va._locale = c)),
		va._locale._abbr
	},
	va.defineLocale = function (a, b) {
		return null !== b ? (b.abbr = a, Ja[a] || (Ja[a] = new l), Ja[a].set(b), va.locale(a), Ja[a]) : (delete Ja[a], null)
	},
	va.langData = f("moment.langData is deprecated. Use moment.localeData instead.", function (a) {
			return va.localeData(a)
		}),
	va.localeData = function (a) {
		var b;
		if (a && a._locale && a._locale._abbr && (a = a._locale._abbr), !a)
			return va._locale;
		if (!w(a)) {
			if (b = L(a))
				return b;
			a = [a]
		}
		return K(a)
	},
	va.isMoment = function (a) {
		return a instanceof m || null != a && c(a, "_isAMomentObject")
	},
	va.isDuration = function (a) {
		return a instanceof n
	};
	for (xa = tb.length - 1; xa >= 0; --xa)
		B(tb[xa]);
	va.normalizeUnits = function (a) {
		return z(a)
	},
	va.invalid = function (a) {
		var b = va.utc(0 / 0);
		return null != a ? o(b._pf, a) : b._pf.userInvalidated = !0,
		b
	},
	va.parseZone = function () {
		return va.apply(null, arguments).parseZone()
	},
	va.parseTwoDigitYear = function (a) {
		return C(a) + (C(a) > 68 ? 1900 : 2e3)
	},
	va.isDate = x,
	o(va.fn = m.prototype, {
		clone : function () {
			return va(this)
		},
		valueOf : function () {
			return +this._d - 6e4 * (this._offset || 0)
		},
		unix : function () {
			return Math.floor(+this / 1e3)
		},
		toString : function () {
			return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
		},
		toDate : function () {
			return this._offset ? new Date(+this) : this._d
		},
		toISOString : function () {
			var a = va(this).utc();
			return 0 < a.year() && a.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : P(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : P(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
		},
		toArray : function () {
			var a = this;
			return [a.year(), a.month(), a.date(), a.hours(), a.minutes(), a.seconds(), a.milliseconds()]
		},
		isValid : function () {
			return I(this)
		},
		isDSTShifted : function () {
			return this._a ? this.isValid() && y(this._a, (this._isUTC ? va.utc(this._a) : va(this._a)).toArray()) > 0 : !1
		},
		parsingFlags : function () {
			return o({}, this._pf)
		},
		invalidAt : function () {
			return this._pf.overflow
		},
		utc : function (a) {
			return this.utcOffset(0, a)
		},
		local : function (a) {
			return this._isUTC && (this.utcOffset(0, a), this._isUTC = !1, a && this.subtract(this._dateUtcOffset(), "m")),
			this
		},
		format : function (a) {
			var b = P(this, a || va.defaultFormat);
			return this.localeData().postformat(b)
		},
		add : u(1, "add"),
		subtract : u(-1, "subtract"),
		diff : function (a, b, c) {
			var d,
			e,
			f = M(a, this),
			g = 6e4 * (f.utcOffset() - this.utcOffset());
			return b = z(b),
			"year" === b || "month" === b || "quarter" === b ? (e = j(this, f), "quarter" === b ? e /= 3 : "year" === b && (e /= 12)) : (d = this - f, e = "second" === b ? d / 1e3 : "minute" === b ? d / 6e4 : "hour" === b ? d / 36e5 : "day" === b ? (d - g) / 864e5 : "week" === b ? (d - g) / 6048e5 : d),
			c ? e : q(e)
		},
		from : function (a, b) {
			return va.duration({
				to : this,
				from : a
			}).locale(this.locale()).humanize(!b)
		},
		fromNow : function (a) {
			return this.from(va(), a)
		},
		calendar : function (a) {
			var b = a || va(),
			c = M(b, this).startOf("day"),
			d = this.diff(c, "days", !0),
			e = -6 > d ? "sameElse" : -1 > d ? "lastWeek" : 0 > d ? "lastDay" : 1 > d ? "sameDay" : 2 > d ? "nextDay" : 7 > d ? "nextWeek" : "sameElse";
			return this.format(this.localeData().calendar(e, this, va(b)))
		},
		isLeapYear : function () {
			return G(this.year())
		},
		isDST : function () {
			return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
		},
		day : function (a) {
			var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
			return null != a ? (a = ga(a, this.localeData()), this.add(a - b, "d")) : b
		},
		month : qa("Month", !0),
		startOf : function (a) {
			switch (a = z(a)) {
			case "year":
				this.month(0);
			case "quarter":
			case "month":
				this.date(1);
			case "week":
			case "isoWeek":
			case "day":
				this.hours(0);
			case "hour":
				this.minutes(0);
			case "minute":
				this.seconds(0);
			case "second":
				this.milliseconds(0)
			}
			return "week" === a ? this.weekday(0) : "isoWeek" === a && this.isoWeekday(1),
			"quarter" === a && this.month(3 * Math.floor(this.month() / 3)),
			this
		},
		endOf : function (b) {
			return b = z(b),
			b === a || "millisecond" === b ? this : this.startOf(b).add(1, "isoWeek" === b ? "week" : b).subtract(1, "ms")
		},
		isAfter : function (a, b) {
			var c;
			return b = z("undefined" != typeof b ? b : "millisecond"),
			"millisecond" === b ? (a = va.isMoment(a) ? a : va(a), +this > +a) : (c = va.isMoment(a) ? +a : +va(a), c < +this.clone().startOf(b))
		},
		isBefore : function (a, b) {
			var c;
			return b = z("undefined" != typeof b ? b : "millisecond"),
			"millisecond" === b ? (a = va.isMoment(a) ? a : va(a), +a > +this) : (c = va.isMoment(a) ? +a : +va(a), +this.clone().endOf(b) < c)
		},
		isBetween : function (a, b, c) {
			return this.isAfter(a, c) && this.isBefore(b, c)
		},
		isSame : function (a, b) {
			var c;
			return b = z(b || "millisecond"),
			"millisecond" === b ? (a = va.isMoment(a) ? a : va(a), +this === +a) : (c = +va(a), +this.clone().startOf(b) <= c && c <= +this.clone().endOf(b))
		},
		min : f("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function (a) {
			return a = va.apply(null, arguments),
			this > a ? this : a
		}),
		max : f("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function (a) {
			return a = va.apply(null, arguments),
			a > this ? this : a
		}),
		zone : f("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", function (a, b) {
			return null != a ? ("string" != typeof a && (a = -a), this.utcOffset(a, b), this) : -this.utcOffset()
		}),
		utcOffset : function (a, b) {
			var c,
			d = this._offset || 0;
			return null != a ? ("string" == typeof a && (a = S(a)), Math.abs(a) < 16 && (a = 60 * a), !this._isUTC && b && (c = this._dateUtcOffset()), this._offset = a, this._isUTC = !0, null != c && this.add(c, "m"), d !== a && (!b || this._changeInProgress ? v(this, va.duration(a - d, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, va.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? d : this._dateUtcOffset()
		},
		isLocal : function () {
			return !this._isUTC
		},
		isUtcOffset : function () {
			return this._isUTC
		},
		isUtc : function () {
			return this._isUTC && 0 === this._offset
		},
		zoneAbbr : function () {
			return this._isUTC ? "UTC" : ""
		},
		zoneName : function () {
			return this._isUTC ? "Coordinated Universal Time" : ""
		},
		parseZone : function () {
			return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(S(this._i)),
			this
		},
		hasAlignedHourOffset : function (a) {
			return a = a ? va(a).utcOffset() : 0,
			(this.utcOffset() - a) % 60 === 0
		},
		daysInMonth : function () {
			return D(this.year(), this.month())
		},
		dayOfYear : function (a) {
			var b = Aa((va(this).startOf("day") - va(this).startOf("year")) / 864e5) + 1;
			return null == a ? b : this.add(a - b, "d")
		},
		quarter : function (a) {
			return null == a ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3)
		},
		weekYear : function (a) {
			var b = ja(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
			return null == a ? b : this.add(a - b, "y")
		},
		isoWeekYear : function (a) {
			var b = ja(this, 1, 4).year;
			return null == a ? b : this.add(a - b, "y")
		},
		week : function (a) {
			var b = this.localeData().week(this);
			return null == a ? b : this.add(7 * (a - b), "d")
		},
		isoWeek : function (a) {
			var b = ja(this, 1, 4).week;
			return null == a ? b : this.add(7 * (a - b), "d")
		},
		weekday : function (a) {
			var b = (this.day() + 7 - this.localeData()._week.dow) % 7;
			return null == a ? b : this.add(a - b, "d")
		},
		isoWeekday : function (a) {
			return null == a ? this.day() || 7 : this.day(this.day() % 7 ? a : a - 7)
		},
		isoWeeksInYear : function () {
			return E(this.year(), 1, 4)
		},
		weeksInYear : function () {
			var a = this.localeData()._week;
			return E(this.year(), a.dow, a.doy)
		},
		get : function (a) {
			return a = z(a),
			this[a]()
		},
		set : function (a, b) {
			var c;
			if ("object" == typeof a)
				for (c in a)
					this.set(c, a[c]);
			else
				a = z(a), "function" == typeof this[a] && this[a](b);
			return this
		},
		locale : function (b) {
			var c;
			return b === a ? this._locale._abbr : (c = va.localeData(b), null != c && (this._locale = c), this)
		},
		lang : f("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (b) {
			return b === a ? this.localeData() : this.locale(b)
		}),
		localeData : function () {
			return this._locale
		},
		_dateUtcOffset : function () {
			return 15 * -Math.round(this._d.getTimezoneOffset() / 15)
		}
	}),
	va.fn.millisecond = va.fn.milliseconds = qa("Milliseconds", !1),
	va.fn.second = va.fn.seconds = qa("Seconds", !1),
	va.fn.minute = va.fn.minutes = qa("Minutes", !1),
	va.fn.hour = va.fn.hours = qa("Hours", !0),
	va.fn.date = qa("Date", !0),
	va.fn.dates = f("dates accessor is deprecated. Use date instead.", qa("Date", !0)),
	va.fn.year = qa("FullYear", !0),
	va.fn.years = f("years accessor is deprecated. Use year instead.", qa("FullYear", !0)),
	va.fn.days = va.fn.day,
	va.fn.months = va.fn.month,
	va.fn.weeks = va.fn.week,
	va.fn.isoWeeks = va.fn.isoWeek,
	va.fn.quarters = va.fn.quarter,
	va.fn.toJSON = va.fn.toISOString,
	va.fn.isUTC = va.fn.isUtc,
	o(va.duration.fn = n.prototype, {
		_bubble : function () {
			var a,
			b,
			c,
			d = this._milliseconds,
			e = this._days,
			f = this._months,
			g = this._data,
			h = 0;
			g.milliseconds = d % 1e3,
			a = q(d / 1e3),
			g.seconds = a % 60,
			b = q(a / 60),
			g.minutes = b % 60,
			c = q(b / 60),
			g.hours = c % 24,
			e += q(c / 24),
			h = q(ra(e)),
			e -= q(sa(h)),
			f += q(e / 30),
			e %= 30,
			h += q(f / 12),
			f %= 12,
			g.days = e,
			g.months = f,
			g.years = h
		},
		abs : function () {
			return this._milliseconds = Math.abs(this._milliseconds),
			this._days = Math.abs(this._days),
			this._months = Math.abs(this._months),
			this._data.milliseconds = Math.abs(this._data.milliseconds),
			this._data.seconds = Math.abs(this._data.seconds),
			this._data.minutes = Math.abs(this._data.minutes),
			this._data.hours = Math.abs(this._data.hours),
			this._data.months = Math.abs(this._data.months),
			this._data.years = Math.abs(this._data.years),
			this
		},
		weeks : function () {
			return q(this.days() / 7)
		},
		valueOf : function () {
			return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * C(this._months / 12);

		},
		humanize : function (a) {
			var b = ia(this, !a, this.localeData());
			return a && (b = this.localeData().pastFuture(+this, b)),
			this.localeData().postformat(b)
		},
		add : function (a, b) {
			var c = va.duration(a, b);
			return this._milliseconds += c._milliseconds,
			this._days += c._days,
			this._months += c._months,
			this._bubble(),
			this
		},
		subtract : function (a, b) {
			var c = va.duration(a, b);
			return this._milliseconds -= c._milliseconds,
			this._days -= c._days,
			this._months -= c._months,
			this._bubble(),
			this
		},
		get : function (a) {
			return a = z(a),
			this[a.toLowerCase() + "s"]()
		},
		as : function (a) {
			var b,
			c;
			if (a = z(a), "month" === a || "year" === a)
				return b = this._days + this._milliseconds / 864e5, c = this._months + 12 * ra(b), "month" === a ? c : c / 12;
			switch (b = this._days + Math.round(sa(this._months / 12)), a) {
			case "week":
				return b / 7 + this._milliseconds / 6048e5;
			case "day":
				return b + this._milliseconds / 864e5;
			case "hour":
				return 24 * b + this._milliseconds / 36e5;
			case "minute":
				return 24 * b * 60 + this._milliseconds / 6e4;
			case "second":
				return 24 * b * 60 * 60 + this._milliseconds / 1e3;
			case "millisecond":
				return Math.floor(24 * b * 60 * 60 * 1e3) + this._milliseconds;
			default:
				throw new Error("Unknown unit " + a)
			}
		},
		lang : va.fn.lang,
		locale : va.fn.locale,
		toIsoString : f("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", function () {
			return this.toISOString()
		}),
		toISOString : function () {
			var a = Math.abs(this.years()),
			b = Math.abs(this.months()),
			c = Math.abs(this.days()),
			d = Math.abs(this.hours()),
			e = Math.abs(this.minutes()),
			f = Math.abs(this.seconds() + this.milliseconds() / 1e3);
			return this.asSeconds() ? (this.asSeconds() < 0 ? "-" : "") + "P" + (a ? a + "Y" : "") + (b ? b + "M" : "") + (c ? c + "D" : "") + (d || e || f ? "T" : "") + (d ? d + "H" : "") + (e ? e + "M" : "") + (f ? f + "S" : "") : "P0D"
		},
		localeData : function () {
			return this._locale
		},
		toJSON : function () {
			return this.toISOString()
		}
	}),
	va.duration.fn.toString = va.duration.fn.toISOString;
	for (xa in kb)
		c(kb, xa) && ta(xa.toLowerCase());
	va.duration.fn.asMilliseconds = function () {
		return this.as("ms")
	},
	va.duration.fn.asSeconds = function () {
		return this.as("s")
	},
	va.duration.fn.asMinutes = function () {
		return this.as("m")
	},
	va.duration.fn.asHours = function () {
		return this.as("h")
	},
	va.duration.fn.asDays = function () {
		return this.as("d")
	},
	va.duration.fn.asWeeks = function () {
		return this.as("weeks")
	},
	va.duration.fn.asMonths = function () {
		return this.as("M")
	},
	va.duration.fn.asYears = function () {
		return this.as("y")
	},
	va.locale("en", {
		ordinalParse : /\d{1,2}(th|st|nd|rd)/,
		ordinal : function (a) {
			var b = a % 10,
			c = 1 === C(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
			return a + c
		}
	}),
	La ? module.exports = va : "function" == typeof define && define.amd ? (define(function (a, b, c) {
				return c.config && c.config() && c.config().noGlobal === !0 && (za.moment = wa),
				va
			}), ua(!0)) : ua()
}).call(this), Neatline.module("Simile", {
	define : function (a) {
		a.Controller = Neatline.Shared.Controller.extend({
				slug : "SIMILE",
				events : [{
						refresh : "load"
					}, {
						"MAP:ingest" : "ingest"
					}, "select"],
				commands : ["restart"],
				init : function () {
					this.view = new a.View({
							slug : this.slug
						}),
					this.load()
				},
				load : function () {
					this.view.load()
				},
				select : function (a) {
					a.source !== this.slug && this.view.focusByModel(a.model)
				},
				restart : function (a) {
					this.view.start(a),
					this.view.ingest(this.view.records)
				},
				ingest : function () {
					this.view.ingest(this.view.records)
				}
			})
	}
}), Neatline.module("Simile", {
	define : function (a) {
		Neatline.on("initialize:after", function () {
			a.start()
		}),
		a.addInitializer(function () {
			SimileAjax.History.enabled = !1,
			a.__controller = new a.Controller
		})
	}
}), Neatline.module("Simile", {
	define : function (a) {
		a.View = Neatline.Shared.Widget.View.extend({
				id : "simile",
				options : {
					colorDebounce : 500
				},
				init : function (a) {
					this.slug = a.slug,
					this.records = new Neatline.Shared.Record.Collection,
					this.start(new Neatline.Shared.Exhibit.Model)
				},
				start : function (a) {
					this._initSimile(a),
					this._initResize(),
					this._initSelect(),
					this._initScroll()
				},
				_initSimile : function (a) {
					this.timeline && this.timeline.dispose(),
					this.eventSource = new Timeline.DefaultEventSource;
					var b = a.get("simile_track_height"),
					c = a.get("simile_tape_height"),
					d = a.get("simile_interval_pixels"),
					e = a.get("simile_interval_unit"),
					f = a.get("simile_default_date");
					this.theme = Timeline.ClassicTheme.create(),
					this.theme.event.track.height = parseInt(b),
					this.theme.event.tape.height = parseInt(c),
					this.timeline = Timeline.create(this.el, [Timeline.createBandInfo({
									intervalUnit : Timeline.DateTime[e],
									intervalPixels : parseInt(d),
									eventSource : this.eventSource,
									theme : this.theme,
									width : "100%"
								})]),
					this.band = this.timeline.getBand(0);
					var g = this;
					setTimeout(function () {
						g.setCenterDate(f)
					}, 500)
				},
				_initResize : function () {
					$(window).resize(_.bind(function () {
							this.timeline.layout()
						}, this))
				},
				_initSelect : function () {
					this.band._eventPainter._showBubble = _.bind(function (a, b, c) {
							Neatline.vent.trigger("unselect", {
								model : c.nModel,
								source : this.slug
							}),
							Neatline.vent.trigger("select", {
								model : c.nModel,
								source : this.slug
							})
						}, this)
				},
				_initScroll : function () {
					this.band.addOnScrollListener(_.bind(this.setFilter, this)),
					this.band.addOnScrollListener(_.debounce(_.bind(this.setEventColors, this), this.options.colorDebounce)),
					this.setFilter()
				},
				load : function () {
					this.records.update({
						widget : "Simile"
					}, _.bind(this.ingest, this))
				},
				ingest : function () {
					this.eventSource.clear(),
					this.records.each(_.bind(this.buildEvent, this)),
					this.setEventColors()
				},
				buildEvent : function (a) {
					if (a.get("start_date")) {
						var b = {
							text : a.get("title"),
							start : new Date(a.get("start_date")),
							color : a.get("fill_color")
						},
						c = a.get("end_date");
						c && (b.end = new Date(c));
						var d = new Timeline.DefaultEventSource.Event(b);
						d.nModel = a,
						this.eventSource._events.add(d),
						this.eventSource._fire("onAddMany", []),
						this.timeline.layout()
					}
				},
				setCenterDate : function (a) {
					moment(String(a)).isValid() && this.band.setCenterVisibleDate(new Date(a))
				},
				focusByModel : function (a) {
					var b = a.get("start_date"),
					c = a.get("end_date");
					null == b && (b = a.get("after_date"), c = a.get("before_date"));
					var d = moment(String(b)),
					e = moment(String(c)),
					//if (d.isValid() && e.isValid()) {
                    //AS edits to allow timeline scrolling only when current timeline date
					//falls outside of an item's start/end dates. This allows the timeline to 
					//scroll to the correct date when resolving a record's link from the browse, 
					//but not when clicking visible records during a certain year on the timeline
					g = this.band.getCenterVisibleDate();
					
                    if ((d.isValid() && e.isValid()) && (g < d || g > e)) {
						var f = d.add("milliseconds", (e - d) / 2);
						this.setCenterDate(f.toDate().toISOString())
					}
					//end AS edits
				},
				setFilter : function () {
					Neatline.vent.trigger("setFilter", {
						source : this.slug,
						key : "simile",
						evaluator : _.bind(function (a) {
							var b = this.band.getCenterVisibleDate(),
							c = a.get("after_date"),
							d = a.get("before_date"),
							e = !0;
							return c && (e &= new Date(c) < b),
							d && (e &= new Date(d) > b),
							Boolean(e)
						}, this)
					})
				},
				setEventColors : function () {
					_.each(this.getEvents(), _.bind(function (a) {
							$(this.getEventElement(a)).css("background", a.nModel.get("fill_color"))
						}, this))
				},
				getEvents : function () {
					return this.eventSource._events._events._a
				},
				getEventElement : function (a) {
					return this.band._eventPainter._eventIdToElmt[a._id]
				},
				clear : function () {
					this.eventSource.clear()
				}
			})
	}
});
