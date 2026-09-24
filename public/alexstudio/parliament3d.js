/*! Parliament 3D scene (AiStudioBudapest). Includes three.js, MIT License, (c) three.js authors, see parliament3d.LICENSE.txt */
var e = 1e3, t = 1001, n = 1002, r = 1003, i = 1006, a = 1008, o = 1009, s = 1012, c = 1014, l = 1015, u = 1016, d = 1017, f = 1018, p = 1020, m = 1023, h = 1026, g = 1027, _ = 1028, v = 1029, y = 1030, b = 1031, x = 1033, S = 2300, C = 2301, w = 2302, T = 2303, E = 2400, D = 2401, O = 2402, k = "srgb", A = "srgb-linear", j = "linear", M = "srgb", N = 7680, P = 35044, F = 2e3;
function I(e) {
	for (let t = e.length - 1; t >= 0; --t) if (e[t] >= 65535) return !0;
	return !1;
}
function ee(e) {
	return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function L(e) {
	return document.createElementNS("http://www.w3.org/1999/xhtml", e);
}
function te() {
	let e = L("canvas");
	return e.style.display = "block", e;
}
var ne = {};
function re(...e) {
	let t = "THREE." + e.shift();
	console.log(t, ...e);
}
function R(e) {
	let t = e[0];
	if (typeof t == "string" && t.startsWith("TSL:")) {
		let t = e[1];
		t && t.isStackTrace ? e[0] += " " + t.getLocation() : e[1] = "Stack trace not available. Enable \"THREE.Node.captureStackTrace\" to capture stack traces.";
	}
	return e;
}
function z(...e) {
	e = R(e);
	let t = "THREE." + e.shift();
	{
		let n = e[0];
		n && n.isStackTrace ? console.warn(n.getError(t)) : console.warn(t, ...e);
	}
}
function B(...e) {
	e = R(e);
	let t = "THREE." + e.shift();
	{
		let n = e[0];
		n && n.isStackTrace ? console.error(n.getError(t)) : console.error(t, ...e);
	}
}
function V(...e) {
	let t = e.join(" ");
	t in ne || (ne[t] = !0, z(...e));
}
function ie(e, t, n) {
	return new Promise(function(r, i) {
		function a() {
			switch (e.clientWaitSync(t, e.SYNC_FLUSH_COMMANDS_BIT, 0)) {
				case e.WAIT_FAILED:
					i();
					break;
				case e.TIMEOUT_EXPIRED:
					setTimeout(a, n);
					break;
				default: r();
			}
		}
		setTimeout(a, n);
	});
}
var ae = {
	0: 1,
	2: 6,
	4: 7,
	3: 5,
	1: 0,
	6: 2,
	7: 4,
	5: 3
}, oe = class {
	addEventListener(e, t) {
		this._listeners === void 0 && (this._listeners = {});
		let n = this._listeners;
		n[e] === void 0 && (n[e] = []), n[e].indexOf(t) === -1 && n[e].push(t);
	}
	hasEventListener(e, t) {
		let n = this._listeners;
		return n !== void 0 && n[e] !== void 0 && n[e].indexOf(t) !== -1;
	}
	removeEventListener(e, t) {
		let n = this._listeners;
		if (n === void 0) return;
		let r = n[e];
		if (r !== void 0) {
			let e = r.indexOf(t);
			e !== -1 && r.splice(e, 1);
		}
	}
	dispatchEvent(e) {
		let t = this._listeners;
		if (t === void 0) return;
		let n = t[e.type];
		if (n !== void 0) {
			e.target = this;
			let t = n.slice(0);
			for (let n = 0, r = t.length; n < r; n++) t[n].call(this, e);
			e.target = null;
		}
	}
}, se = /* @__PURE__ */ "00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff".split("."), ce = Math.PI / 180, le = 180 / Math.PI;
function ue() {
	let e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0, r = Math.random() * 4294967295 | 0;
	return (se[e & 255] + se[e >> 8 & 255] + se[e >> 16 & 255] + se[e >> 24 & 255] + "-" + se[t & 255] + se[t >> 8 & 255] + "-" + se[t >> 16 & 15 | 64] + se[t >> 24 & 255] + "-" + se[n & 63 | 128] + se[n >> 8 & 255] + "-" + se[n >> 16 & 255] + se[n >> 24 & 255] + se[r & 255] + se[r >> 8 & 255] + se[r >> 16 & 255] + se[r >> 24 & 255]).toLowerCase();
}
function H(e, t, n) {
	return Math.max(t, Math.min(n, e));
}
function de(e, t) {
	return (e % t + t) % t;
}
function fe(e, t, n) {
	return (1 - n) * e + n * t;
}
function pe(e, t) {
	switch (t.constructor) {
		case Float32Array: return e;
		case Uint32Array: return e / 4294967295;
		case Uint16Array: return e / 65535;
		case Uint8Array:
		case Uint8ClampedArray: return e / 255;
		case Int32Array: return Math.max(e / 2147483647, -1);
		case Int16Array: return Math.max(e / 32767, -1);
		case Int8Array: return Math.max(e / 127, -1);
		default: throw Error("THREE.MathUtils: Invalid component type.");
	}
}
function me(e, t) {
	switch (t.constructor) {
		case Float32Array: return e;
		case Uint32Array: return Math.round(e * 4294967295);
		case Uint16Array: return Math.round(e * 65535);
		case Uint8Array:
		case Uint8ClampedArray: return Math.round(e * 255);
		case Int32Array: return Math.round(e * 2147483647);
		case Int16Array: return Math.round(e * 32767);
		case Int8Array: return Math.round(e * 127);
		default: throw Error("THREE.MathUtils: Invalid component type.");
	}
}
var U = class e {
	static {
		e.prototype.isVector2 = !0;
	}
	constructor(e = 0, t = 0) {
		this.x = e, this.y = t;
	}
	get width() {
		return this.x;
	}
	set width(e) {
		this.x = e;
	}
	get height() {
		return this.y;
	}
	set height(e) {
		this.y = e;
	}
	set(e, t) {
		return this.x = e, this.y = t, this;
	}
	setScalar(e) {
		return this.x = e, this.y = e, this;
	}
	setX(e) {
		return this.x = e, this;
	}
	setY(e) {
		return this.y = e, this;
	}
	setComponent(e, t) {
		switch (e) {
			case 0:
				this.x = t;
				break;
			case 1:
				this.y = t;
				break;
			default: throw Error("THREE.Vector2: index is out of range: " + e);
		}
		return this;
	}
	getComponent(e) {
		switch (e) {
			case 0: return this.x;
			case 1: return this.y;
			default: throw Error("THREE.Vector2: index is out of range: " + e);
		}
	}
	clone() {
		return new this.constructor(this.x, this.y);
	}
	copy(e) {
		return this.x = e.x, this.y = e.y, this;
	}
	add(e) {
		return this.x += e.x, this.y += e.y, this;
	}
	addScalar(e) {
		return this.x += e, this.y += e, this;
	}
	addVectors(e, t) {
		return this.x = e.x + t.x, this.y = e.y + t.y, this;
	}
	addScaledVector(e, t) {
		return this.x += e.x * t, this.y += e.y * t, this;
	}
	sub(e) {
		return this.x -= e.x, this.y -= e.y, this;
	}
	subScalar(e) {
		return this.x -= e, this.y -= e, this;
	}
	subVectors(e, t) {
		return this.x = e.x - t.x, this.y = e.y - t.y, this;
	}
	multiply(e) {
		return this.x *= e.x, this.y *= e.y, this;
	}
	multiplyScalar(e) {
		return this.x *= e, this.y *= e, this;
	}
	divide(e) {
		return this.x /= e.x, this.y /= e.y, this;
	}
	divideScalar(e) {
		return this.multiplyScalar(1 / e);
	}
	applyMatrix3(e) {
		let t = this.x, n = this.y, r = e.elements;
		return this.x = r[0] * t + r[3] * n + r[6], this.y = r[1] * t + r[4] * n + r[7], this;
	}
	min(e) {
		return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
	}
	max(e) {
		return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
	}
	clamp(e, t) {
		return this.x = H(this.x, e.x, t.x), this.y = H(this.y, e.y, t.y), this;
	}
	clampScalar(e, t) {
		return this.x = H(this.x, e, t), this.y = H(this.y, e, t), this;
	}
	clampLength(e, t) {
		let n = this.length();
		return this.divideScalar(n || 1).multiplyScalar(H(n, e, t));
	}
	floor() {
		return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
	}
	ceil() {
		return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
	}
	round() {
		return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
	}
	roundToZero() {
		return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
	}
	negate() {
		return this.x = -this.x, this.y = -this.y, this;
	}
	dot(e) {
		return this.x * e.x + this.y * e.y;
	}
	cross(e) {
		return this.x * e.y - this.y * e.x;
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y);
	}
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	angle() {
		return Math.atan2(-this.y, -this.x) + Math.PI;
	}
	angleTo(e) {
		let t = Math.sqrt(this.lengthSq() * e.lengthSq());
		if (t === 0) return Math.PI / 2;
		let n = this.dot(e) / t;
		return Math.acos(H(n, -1, 1));
	}
	distanceTo(e) {
		return Math.sqrt(this.distanceToSquared(e));
	}
	distanceToSquared(e) {
		let t = this.x - e.x, n = this.y - e.y;
		return t * t + n * n;
	}
	manhattanDistanceTo(e) {
		return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
	}
	setLength(e) {
		return this.normalize().multiplyScalar(e);
	}
	lerp(e, t) {
		return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this;
	}
	lerpVectors(e, t, n) {
		return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this;
	}
	equals(e) {
		return e.x === this.x && e.y === this.y;
	}
	fromArray(e, t = 0) {
		return this.x = e[t], this.y = e[t + 1], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.x, e[t + 1] = this.y, e;
	}
	fromBufferAttribute(e, t) {
		return this.x = e.getX(t), this.y = e.getY(t), this;
	}
	rotateAround(e, t) {
		let n = Math.cos(t), r = Math.sin(t), i = this.x - e.x, a = this.y - e.y;
		return this.x = i * n - a * r + e.x, this.y = i * r + a * n + e.y, this;
	}
	random() {
		return this.x = Math.random(), this.y = Math.random(), this;
	}
	*[Symbol.iterator]() {
		yield this.x, yield this.y;
	}
}, he = class {
	constructor(e = 0, t = 0, n = 0, r = 1) {
		this.isQuaternion = !0, this._x = e, this._y = t, this._z = n, this._w = r;
	}
	static slerpFlat(e, t, n, r, i, a, o) {
		let s = n[r + 0], c = n[r + 1], l = n[r + 2], u = n[r + 3], d = i[a + 0], f = i[a + 1], p = i[a + 2], m = i[a + 3];
		if (u !== m || s !== d || c !== f || l !== p) {
			let e = s * d + c * f + l * p + u * m;
			e < 0 && (d = -d, f = -f, p = -p, m = -m, e = -e);
			let t = 1 - o;
			if (e < .9995) {
				let n = Math.acos(e), r = Math.sin(n);
				t = Math.sin(t * n) / r, o = Math.sin(o * n) / r, s = s * t + d * o, c = c * t + f * o, l = l * t + p * o, u = u * t + m * o;
			} else {
				s = s * t + d * o, c = c * t + f * o, l = l * t + p * o, u = u * t + m * o;
				let e = 1 / Math.sqrt(s * s + c * c + l * l + u * u);
				s *= e, c *= e, l *= e, u *= e;
			}
		}
		e[t] = s, e[t + 1] = c, e[t + 2] = l, e[t + 3] = u;
	}
	static multiplyQuaternionsFlat(e, t, n, r, i, a) {
		let o = n[r], s = n[r + 1], c = n[r + 2], l = n[r + 3], u = i[a], d = i[a + 1], f = i[a + 2], p = i[a + 3];
		return e[t] = o * p + l * u + s * f - c * d, e[t + 1] = s * p + l * d + c * u - o * f, e[t + 2] = c * p + l * f + o * d - s * u, e[t + 3] = l * p - o * u - s * d - c * f, e;
	}
	get x() {
		return this._x;
	}
	set x(e) {
		this._x = e, this._onChangeCallback();
	}
	get y() {
		return this._y;
	}
	set y(e) {
		this._y = e, this._onChangeCallback();
	}
	get z() {
		return this._z;
	}
	set z(e) {
		this._z = e, this._onChangeCallback();
	}
	get w() {
		return this._w;
	}
	set w(e) {
		this._w = e, this._onChangeCallback();
	}
	set(e, t, n, r) {
		return this._x = e, this._y = t, this._z = n, this._w = r, this._onChangeCallback(), this;
	}
	clone() {
		return new this.constructor(this._x, this._y, this._z, this._w);
	}
	copy(e) {
		return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
	}
	setFromEuler(e, t = !0) {
		let n = e._x, r = e._y, i = e._z, a = e._order, o = Math.cos, s = Math.sin, c = o(n / 2), l = o(r / 2), u = o(i / 2), d = s(n / 2), f = s(r / 2), p = s(i / 2);
		switch (a) {
			case "XYZ":
				this._x = d * l * u + c * f * p, this._y = c * f * u - d * l * p, this._z = c * l * p + d * f * u, this._w = c * l * u - d * f * p;
				break;
			case "YXZ":
				this._x = d * l * u + c * f * p, this._y = c * f * u - d * l * p, this._z = c * l * p - d * f * u, this._w = c * l * u + d * f * p;
				break;
			case "ZXY":
				this._x = d * l * u - c * f * p, this._y = c * f * u + d * l * p, this._z = c * l * p + d * f * u, this._w = c * l * u - d * f * p;
				break;
			case "ZYX":
				this._x = d * l * u - c * f * p, this._y = c * f * u + d * l * p, this._z = c * l * p - d * f * u, this._w = c * l * u + d * f * p;
				break;
			case "YZX":
				this._x = d * l * u + c * f * p, this._y = c * f * u + d * l * p, this._z = c * l * p - d * f * u, this._w = c * l * u - d * f * p;
				break;
			case "XZY":
				this._x = d * l * u - c * f * p, this._y = c * f * u - d * l * p, this._z = c * l * p + d * f * u, this._w = c * l * u + d * f * p;
				break;
			default: z("Quaternion: .setFromEuler() encountered an unknown order: " + a);
		}
		return t === !0 && this._onChangeCallback(), this;
	}
	setFromAxisAngle(e, t) {
		let n = t / 2, r = Math.sin(n);
		return this._x = e.x * r, this._y = e.y * r, this._z = e.z * r, this._w = Math.cos(n), this._onChangeCallback(), this;
	}
	setFromRotationMatrix(e) {
		let t = e.elements, n = t[0], r = t[4], i = t[8], a = t[1], o = t[5], s = t[9], c = t[2], l = t[6], u = t[10], d = n + o + u;
		if (d > 0) {
			let e = .5 / Math.sqrt(d + 1);
			this._w = .25 / e, this._x = (l - s) * e, this._y = (i - c) * e, this._z = (a - r) * e;
		} else if (n > o && n > u) {
			let e = 2 * Math.sqrt(1 + n - o - u);
			this._w = (l - s) / e, this._x = .25 * e, this._y = (r + a) / e, this._z = (i + c) / e;
		} else if (o > u) {
			let e = 2 * Math.sqrt(1 + o - n - u);
			this._w = (i - c) / e, this._x = (r + a) / e, this._y = .25 * e, this._z = (s + l) / e;
		} else {
			let e = 2 * Math.sqrt(1 + u - n - o);
			this._w = (a - r) / e, this._x = (i + c) / e, this._y = (s + l) / e, this._z = .25 * e;
		}
		return this._onChangeCallback(), this;
	}
	setFromUnitVectors(e, t) {
		let n = e.dot(t) + 1;
		return n < 1e-8 ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize();
	}
	angleTo(e) {
		return 2 * Math.acos(Math.abs(H(this.dot(e), -1, 1)));
	}
	rotateTowards(e, t) {
		let n = this.angleTo(e);
		if (n === 0) return this;
		let r = Math.min(1, t / n);
		return this.slerp(e, r), this;
	}
	identity() {
		return this.set(0, 0, 0, 1);
	}
	invert() {
		return this.conjugate();
	}
	conjugate() {
		return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
	}
	dot(e) {
		return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
	}
	lengthSq() {
		return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
	}
	length() {
		return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
	}
	normalize() {
		let e = this.length();
		return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x *= e, this._y *= e, this._z *= e, this._w *= e), this._onChangeCallback(), this;
	}
	multiply(e) {
		return this.multiplyQuaternions(this, e);
	}
	premultiply(e) {
		return this.multiplyQuaternions(e, this);
	}
	multiplyQuaternions(e, t) {
		let n = e._x, r = e._y, i = e._z, a = e._w, o = t._x, s = t._y, c = t._z, l = t._w;
		return this._x = n * l + a * o + r * c - i * s, this._y = r * l + a * s + i * o - n * c, this._z = i * l + a * c + n * s - r * o, this._w = a * l - n * o - r * s - i * c, this._onChangeCallback(), this;
	}
	slerp(e, t) {
		let n = e._x, r = e._y, i = e._z, a = e._w, o = this.dot(e);
		o < 0 && (n = -n, r = -r, i = -i, a = -a, o = -o);
		let s = 1 - t;
		if (o < .9995) {
			let e = Math.acos(o), c = Math.sin(e);
			s = Math.sin(s * e) / c, t = Math.sin(t * e) / c, this._x = this._x * s + n * t, this._y = this._y * s + r * t, this._z = this._z * s + i * t, this._w = this._w * s + a * t, this._onChangeCallback();
		} else this._x = this._x * s + n * t, this._y = this._y * s + r * t, this._z = this._z * s + i * t, this._w = this._w * s + a * t, this.normalize();
		return this;
	}
	slerpQuaternions(e, t, n) {
		return this.copy(e).slerp(t, n);
	}
	random() {
		let e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), n = Math.random(), r = Math.sqrt(1 - n), i = Math.sqrt(n);
		return this.set(r * Math.sin(e), r * Math.cos(e), i * Math.sin(t), i * Math.cos(t));
	}
	equals(e) {
		return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
	}
	fromArray(e, t = 0) {
		return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
	}
	fromBufferAttribute(e, t) {
		return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this;
	}
	toJSON() {
		return this.toArray();
	}
	_onChange(e) {
		return this._onChangeCallback = e, this;
	}
	_onChangeCallback() {}
	*[Symbol.iterator]() {
		yield this._x, yield this._y, yield this._z, yield this._w;
	}
}, W = class e {
	static {
		e.prototype.isVector3 = !0;
	}
	constructor(e = 0, t = 0, n = 0) {
		this.x = e, this.y = t, this.z = n;
	}
	set(e, t, n) {
		return n === void 0 && (n = this.z), this.x = e, this.y = t, this.z = n, this;
	}
	setScalar(e) {
		return this.x = e, this.y = e, this.z = e, this;
	}
	setX(e) {
		return this.x = e, this;
	}
	setY(e) {
		return this.y = e, this;
	}
	setZ(e) {
		return this.z = e, this;
	}
	setComponent(e, t) {
		switch (e) {
			case 0:
				this.x = t;
				break;
			case 1:
				this.y = t;
				break;
			case 2:
				this.z = t;
				break;
			default: throw Error("THREE.Vector3: index is out of range: " + e);
		}
		return this;
	}
	getComponent(e) {
		switch (e) {
			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			default: throw Error("THREE.Vector3: index is out of range: " + e);
		}
	}
	clone() {
		return new this.constructor(this.x, this.y, this.z);
	}
	copy(e) {
		return this.x = e.x, this.y = e.y, this.z = e.z, this;
	}
	add(e) {
		return this.x += e.x, this.y += e.y, this.z += e.z, this;
	}
	addScalar(e) {
		return this.x += e, this.y += e, this.z += e, this;
	}
	addVectors(e, t) {
		return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this;
	}
	addScaledVector(e, t) {
		return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this;
	}
	sub(e) {
		return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
	}
	subScalar(e) {
		return this.x -= e, this.y -= e, this.z -= e, this;
	}
	subVectors(e, t) {
		return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this;
	}
	multiply(e) {
		return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
	}
	multiplyScalar(e) {
		return this.x *= e, this.y *= e, this.z *= e, this;
	}
	multiplyVectors(e, t) {
		return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this;
	}
	applyEuler(e) {
		return this.applyQuaternion(_e.setFromEuler(e));
	}
	applyAxisAngle(e, t) {
		return this.applyQuaternion(_e.setFromAxisAngle(e, t));
	}
	applyMatrix3(e) {
		let t = this.x, n = this.y, r = this.z, i = e.elements;
		return this.x = i[0] * t + i[3] * n + i[6] * r, this.y = i[1] * t + i[4] * n + i[7] * r, this.z = i[2] * t + i[5] * n + i[8] * r, this;
	}
	applyNormalMatrix(e) {
		return this.applyMatrix3(e).normalize();
	}
	applyMatrix4(e) {
		let t = this.x, n = this.y, r = this.z, i = e.elements, a = 1 / (i[3] * t + i[7] * n + i[11] * r + i[15]);
		return this.x = (i[0] * t + i[4] * n + i[8] * r + i[12]) * a, this.y = (i[1] * t + i[5] * n + i[9] * r + i[13]) * a, this.z = (i[2] * t + i[6] * n + i[10] * r + i[14]) * a, this;
	}
	applyQuaternion(e) {
		let t = this.x, n = this.y, r = this.z, i = e.x, a = e.y, o = e.z, s = e.w, c = 2 * (a * r - o * n), l = 2 * (o * t - i * r), u = 2 * (i * n - a * t);
		return this.x = t + s * c + a * u - o * l, this.y = n + s * l + o * c - i * u, this.z = r + s * u + i * l - a * c, this;
	}
	project(e) {
		return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
	}
	unproject(e) {
		return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
	}
	transformDirection(e) {
		let t = this.x, n = this.y, r = this.z, i = e.elements;
		return this.x = i[0] * t + i[4] * n + i[8] * r, this.y = i[1] * t + i[5] * n + i[9] * r, this.z = i[2] * t + i[6] * n + i[10] * r, this.normalize();
	}
	divide(e) {
		return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
	}
	divideScalar(e) {
		return this.multiplyScalar(1 / e);
	}
	min(e) {
		return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
	}
	max(e) {
		return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
	}
	clamp(e, t) {
		return this.x = H(this.x, e.x, t.x), this.y = H(this.y, e.y, t.y), this.z = H(this.z, e.z, t.z), this;
	}
	clampScalar(e, t) {
		return this.x = H(this.x, e, t), this.y = H(this.y, e, t), this.z = H(this.z, e, t), this;
	}
	clampLength(e, t) {
		let n = this.length();
		return this.divideScalar(n || 1).multiplyScalar(H(n, e, t));
	}
	floor() {
		return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
	}
	ceil() {
		return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
	}
	round() {
		return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
	}
	roundToZero() {
		return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
	}
	negate() {
		return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
	}
	dot(e) {
		return this.x * e.x + this.y * e.y + this.z * e.z;
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
	}
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	setLength(e) {
		return this.normalize().multiplyScalar(e);
	}
	lerp(e, t) {
		return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this;
	}
	lerpVectors(e, t, n) {
		return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this;
	}
	cross(e) {
		return this.crossVectors(this, e);
	}
	crossVectors(e, t) {
		let n = e.x, r = e.y, i = e.z, a = t.x, o = t.y, s = t.z;
		return this.x = r * s - i * o, this.y = i * a - n * s, this.z = n * o - r * a, this;
	}
	projectOnVector(e) {
		let t = e.lengthSq();
		if (t === 0) return this.set(0, 0, 0);
		let n = e.dot(this) / t;
		return this.copy(e).multiplyScalar(n);
	}
	projectOnPlane(e) {
		return ge.copy(this).projectOnVector(e), this.sub(ge);
	}
	reflect(e) {
		return this.sub(ge.copy(e).multiplyScalar(2 * this.dot(e)));
	}
	angleTo(e) {
		let t = Math.sqrt(this.lengthSq() * e.lengthSq());
		if (t === 0) return Math.PI / 2;
		let n = this.dot(e) / t;
		return Math.acos(H(n, -1, 1));
	}
	distanceTo(e) {
		return Math.sqrt(this.distanceToSquared(e));
	}
	distanceToSquared(e) {
		let t = this.x - e.x, n = this.y - e.y, r = this.z - e.z;
		return t * t + n * n + r * r;
	}
	manhattanDistanceTo(e) {
		return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
	}
	setFromSpherical(e) {
		return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
	}
	setFromSphericalCoords(e, t, n) {
		let r = Math.sin(t) * e;
		return this.x = r * Math.sin(n), this.y = Math.cos(t) * e, this.z = r * Math.cos(n), this;
	}
	setFromCylindrical(e) {
		return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
	}
	setFromCylindricalCoords(e, t, n) {
		return this.x = e * Math.sin(t), this.y = n, this.z = e * Math.cos(t), this;
	}
	setFromMatrixPosition(e) {
		let t = e.elements;
		return this.x = t[12], this.y = t[13], this.z = t[14], this;
	}
	setFromMatrixScale(e) {
		let t = this.setFromMatrixColumn(e, 0).length(), n = this.setFromMatrixColumn(e, 1).length(), r = this.setFromMatrixColumn(e, 2).length();
		return this.x = t, this.y = n, this.z = r, this;
	}
	setFromMatrixColumn(e, t) {
		return this.fromArray(e.elements, t * 4);
	}
	setFromMatrix3Column(e, t) {
		return this.fromArray(e.elements, t * 3);
	}
	setFromEuler(e) {
		return this.x = e._x, this.y = e._y, this.z = e._z, this;
	}
	setFromColor(e) {
		return this.x = e.r, this.y = e.g, this.z = e.b, this;
	}
	equals(e) {
		return e.x === this.x && e.y === this.y && e.z === this.z;
	}
	fromArray(e, t = 0) {
		return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e;
	}
	fromBufferAttribute(e, t) {
		return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this;
	}
	random() {
		return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
	}
	randomDirection() {
		let e = Math.random() * Math.PI * 2, t = Math.random() * 2 - 1, n = Math.sqrt(1 - t * t);
		return this.x = n * Math.cos(e), this.y = t, this.z = n * Math.sin(e), this;
	}
	*[Symbol.iterator]() {
		yield this.x, yield this.y, yield this.z;
	}
}, ge = /*@__PURE__*/ new W(), _e = /*@__PURE__*/ new he(), G = class e {
	static {
		e.prototype.isMatrix3 = !0;
	}
	constructor(e, t, n, r, i, a, o, s, c) {
		this.elements = [
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			1
		], e !== void 0 && this.set(e, t, n, r, i, a, o, s, c);
	}
	set(e, t, n, r, i, a, o, s, c) {
		let l = this.elements;
		return l[0] = e, l[1] = r, l[2] = o, l[3] = t, l[4] = i, l[5] = s, l[6] = n, l[7] = a, l[8] = c, this;
	}
	identity() {
		return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
	}
	copy(e) {
		let t = this.elements, n = e.elements;
		return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], this;
	}
	extractBasis(e, t, n) {
		return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
	}
	setFromMatrix4(e) {
		let t = e.elements;
		return this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]), this;
	}
	multiply(e) {
		return this.multiplyMatrices(this, e);
	}
	premultiply(e) {
		return this.multiplyMatrices(e, this);
	}
	multiplyMatrices(e, t) {
		let n = e.elements, r = t.elements, i = this.elements, a = n[0], o = n[3], s = n[6], c = n[1], l = n[4], u = n[7], d = n[2], f = n[5], p = n[8], m = r[0], h = r[3], g = r[6], _ = r[1], v = r[4], y = r[7], b = r[2], x = r[5], S = r[8];
		return i[0] = a * m + o * _ + s * b, i[3] = a * h + o * v + s * x, i[6] = a * g + o * y + s * S, i[1] = c * m + l * _ + u * b, i[4] = c * h + l * v + u * x, i[7] = c * g + l * y + u * S, i[2] = d * m + f * _ + p * b, i[5] = d * h + f * v + p * x, i[8] = d * g + f * y + p * S, this;
	}
	multiplyScalar(e) {
		let t = this.elements;
		return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this;
	}
	determinant() {
		let e = this.elements, t = e[0], n = e[1], r = e[2], i = e[3], a = e[4], o = e[5], s = e[6], c = e[7], l = e[8];
		return t * a * l - t * o * c - n * i * l + n * o * s + r * i * c - r * a * s;
	}
	invert() {
		let e = this.elements, t = e[0], n = e[1], r = e[2], i = e[3], a = e[4], o = e[5], s = e[6], c = e[7], l = e[8], u = l * a - o * c, d = o * s - l * i, f = c * i - a * s, p = t * u + n * d + r * f;
		if (p === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
		let m = 1 / p;
		return e[0] = u * m, e[1] = (r * c - l * n) * m, e[2] = (o * n - r * a) * m, e[3] = d * m, e[4] = (l * t - r * s) * m, e[5] = (r * i - o * t) * m, e[6] = f * m, e[7] = (n * s - c * t) * m, e[8] = (a * t - n * i) * m, this;
	}
	transpose() {
		let e, t = this.elements;
		return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this;
	}
	getNormalMatrix(e) {
		return this.setFromMatrix4(e).invert().transpose();
	}
	transposeIntoArray(e) {
		let t = this.elements;
		return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this;
	}
	setUvTransform(e, t, n, r, i, a, o) {
		let s = Math.cos(i), c = Math.sin(i);
		return this.set(n * s, n * c, -n * (s * a + c * o) + a + e, -r * c, r * s, -r * (-c * a + s * o) + o + t, 0, 0, 1), this;
	}
	scale(e, t) {
		return V("Matrix3: .scale() is deprecated. Use .makeScale() instead."), this.premultiply(ve.makeScale(e, t)), this;
	}
	rotate(e) {
		return V("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."), this.premultiply(ve.makeRotation(-e)), this;
	}
	translate(e, t) {
		return V("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."), this.premultiply(ve.makeTranslation(e, t)), this;
	}
	makeTranslation(e, t) {
		return e.isVector2 ? this.set(1, 0, e.x, 0, 1, e.y, 0, 0, 1) : this.set(1, 0, e, 0, 1, t, 0, 0, 1), this;
	}
	makeRotation(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.set(t, -n, 0, n, t, 0, 0, 0, 1), this;
	}
	makeScale(e, t) {
		return this.set(e, 0, 0, 0, t, 0, 0, 0, 1), this;
	}
	equals(e) {
		let t = this.elements, n = e.elements;
		for (let e = 0; e < 9; e++) if (t[e] !== n[e]) return !1;
		return !0;
	}
	fromArray(e, t = 0) {
		for (let n = 0; n < 9; n++) this.elements[n] = e[n + t];
		return this;
	}
	toArray(e = [], t = 0) {
		let n = this.elements;
		return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e;
	}
	clone() {
		return new this.constructor().fromArray(this.elements);
	}
}, ve = /*@__PURE__*/ new G(), ye = /*@__PURE__*/ new G().set(.4123908, .3575843, .1804808, .212639, .7151687, .0721923, .0193308, .1191948, .9505322), be = /*@__PURE__*/ new G().set(3.2409699, -1.5373832, -.4986108, -.9692436, 1.8759675, .0415551, .0556301, -.203977, 1.0569715);
function xe() {
	let e = {
		enabled: !0,
		workingColorSpace: A,
		spaces: {},
		convert: function(e, t, n) {
			return this.enabled === !1 || t === n || !t || !n ? e : (this.spaces[t].transfer === "srgb" && (e.r = Ce(e.r), e.g = Ce(e.g), e.b = Ce(e.b)), this.spaces[t].primaries !== this.spaces[n].primaries && (e.applyMatrix3(this.spaces[t].toXYZ), e.applyMatrix3(this.spaces[n].fromXYZ)), this.spaces[n].transfer === "srgb" && (e.r = we(e.r), e.g = we(e.g), e.b = we(e.b)), e);
		},
		workingToColorSpace: function(e, t) {
			return this.convert(e, this.workingColorSpace, t);
		},
		colorSpaceToWorking: function(e, t) {
			return this.convert(e, t, this.workingColorSpace);
		},
		getPrimaries: function(e) {
			return this.spaces[e].primaries;
		},
		getTransfer: function(e) {
			return e === "" ? j : this.spaces[e].transfer;
		},
		getToneMappingMode: function(e) {
			return this.spaces[e].outputColorSpaceConfig.toneMappingMode || "standard";
		},
		getLuminanceCoefficients: function(e, t = this.workingColorSpace) {
			return e.fromArray(this.spaces[t].luminanceCoefficients);
		},
		define: function(e) {
			Object.assign(this.spaces, e);
		},
		_getMatrix: function(e, t, n) {
			return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ);
		},
		_getDrawingBufferColorSpace: function(e) {
			return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace;
		},
		_getUnpackColorSpace: function(e = this.workingColorSpace) {
			return this.spaces[e].workingColorSpaceConfig.unpackColorSpace;
		},
		fromWorkingColorSpace: function(t, n) {
			return V("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."), e.workingToColorSpace(t, n);
		},
		toWorkingColorSpace: function(t, n) {
			return V("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."), e.colorSpaceToWorking(t, n);
		}
	}, t = [
		.64,
		.33,
		.3,
		.6,
		.15,
		.06
	], n = [
		.2126,
		.7152,
		.0722
	], r = [.3127, .329];
	return e.define({
		[A]: {
			primaries: t,
			whitePoint: r,
			transfer: j,
			toXYZ: ye,
			fromXYZ: be,
			luminanceCoefficients: n,
			workingColorSpaceConfig: { unpackColorSpace: k },
			outputColorSpaceConfig: { drawingBufferColorSpace: k }
		},
		[k]: {
			primaries: t,
			whitePoint: r,
			transfer: M,
			toXYZ: ye,
			fromXYZ: be,
			luminanceCoefficients: n,
			outputColorSpaceConfig: { drawingBufferColorSpace: k }
		}
	}), e;
}
var Se = /*@__PURE__*/ xe();
function Ce(e) {
	return e < .04045 ? e * .0773993808 : (e * .9478672986 + .0521327014) ** 2.4;
}
function we(e) {
	return e < .0031308 ? e * 12.92 : 1.055 * e ** .41666 - .055;
}
var Te, Ee = class {
	static getDataURL(e, t = "image/png") {
		if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u") return e.src;
		let n;
		if (e instanceof HTMLCanvasElement) n = e;
		else {
			Te === void 0 && (Te = L("canvas")), Te.width = e.width, Te.height = e.height;
			let t = Te.getContext("2d");
			e instanceof ImageData ? t.putImageData(e, 0, 0) : t.drawImage(e, 0, 0, e.width, e.height), n = Te;
		}
		return n.toDataURL(t);
	}
	static sRGBToLinear(e) {
		if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
			let t = L("canvas");
			t.width = e.width, t.height = e.height;
			let n = t.getContext("2d");
			n.drawImage(e, 0, 0, e.width, e.height);
			let r = n.getImageData(0, 0, e.width, e.height), i = r.data;
			for (let e = 0; e < i.length; e++) i[e] = Ce(i[e] / 255) * 255;
			return n.putImageData(r, 0, 0), t;
		}
		if (e.data) {
			let t = e.data.slice(0);
			for (let e = 0; e < t.length; e++) t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[e] = Math.floor(Ce(t[e] / 255) * 255) : t[e] = Ce(t[e]);
			return {
				data: t,
				width: e.width,
				height: e.height
			};
		}
		return z("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
	}
}, De = 0, Oe = class {
	constructor(e = null) {
		this.isTextureSource = !0, Object.defineProperty(this, "id", { value: De++ }), this.uuid = ue(), this.data = e, this.dataReady = !0, this.version = 0;
	}
	getSize(e) {
		let t = this.data;
		return typeof HTMLVideoElement < "u" && t instanceof HTMLVideoElement ? e.set(t.videoWidth, t.videoHeight, 0) : typeof VideoFrame < "u" && t instanceof VideoFrame ? e.set(t.displayWidth, t.displayHeight, 0) : t === null ? e.set(0, 0, 0) : e.set(t.width, t.height, t.depth || 0), e;
	}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
	toJSON(e) {
		let t = e === void 0 || typeof e == "string";
		if (!t && e.images[this.uuid] !== void 0) return e.images[this.uuid];
		let n = {
			uuid: this.uuid,
			url: ""
		}, r = this.data;
		if (r !== null) {
			let e;
			if (Array.isArray(r)) {
				e = [];
				for (let t = 0, n = r.length; t < n; t++) r[t].isDataTexture ? e.push(ke(r[t].image)) : e.push(ke(r[t]));
			} else e = ke(r);
			n.url = e;
		}
		return t || (e.images[this.uuid] = n), n;
	}
};
function ke(e) {
	return typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap ? Ee.getDataURL(e) : e.data ? {
		data: Array.from(e.data),
		width: e.width,
		height: e.height,
		type: e.data.constructor.name
	} : (z("Texture: Unable to serialize Texture."), {});
}
var Ae = 0, je = /*@__PURE__*/ new W(), K = class r extends oe {
	constructor(e = r.DEFAULT_IMAGE, n = r.DEFAULT_MAPPING, s = t, c = t, l = i, u = a, d = m, f = o, p = r.DEFAULT_ANISOTROPY, h = "") {
		super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: Ae++ }), this.uuid = ue(), this.name = "", this.source = new Oe(e), this.mipmaps = [], this.mapping = n, this.channel = 0, this.wrapS = s, this.wrapT = c, this.magFilter = l, this.minFilter = u, this.anisotropy = p, this.format = d, this.internalFormat = null, this.type = f, this.offset = new U(0, 0), this.repeat = new U(1, 1), this.center = new U(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new G(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = h, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(e && e.depth && e.depth > 1), this.pmremVersion = 0, this.normalized = !1;
	}
	get width() {
		return this.source.getSize(je).x;
	}
	get height() {
		return this.source.getSize(je).y;
	}
	get depth() {
		return this.source.getSize(je).z;
	}
	get image() {
		return this.source.data;
	}
	set image(e) {
		this.source.data = e;
	}
	updateMatrix() {
		this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
	}
	addUpdateRange(e, t) {
		this.updateRanges.push({
			start: e,
			count: t
		});
	}
	clearUpdateRanges() {
		this.updateRanges.length = 0;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.normalized = e.normalized, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.renderTarget = e.renderTarget, this.isRenderTargetTexture = e.isRenderTargetTexture, this.isArrayTexture = e.isArrayTexture, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this;
	}
	setValues(e) {
		for (let t in e) {
			let n = e[t];
			if (n === void 0) {
				z(`Texture.setValues(): parameter '${t}' has value of undefined.`);
				continue;
			}
			let r = this[t];
			if (r === void 0) {
				z(`Texture.setValues(): property '${t}' does not exist.`);
				continue;
			}
			r && n && r.isVector2 && n.isVector2 || r && n && r.isVector3 && n.isVector3 || r && n && r.isMatrix3 && n.isMatrix3 ? r.copy(n) : this[t] = n;
		}
	}
	toJSON(e) {
		let t = e === void 0 || typeof e == "string";
		if (!t && e.textures[this.uuid] !== void 0) return e.textures[this.uuid];
		let n = {
			metadata: {
				version: 4.7,
				type: "Texture",
				generator: "Texture.toJSON"
			},
			uuid: this.uuid,
			name: this.name,
			image: this.source.toJSON(e).uuid,
			mapping: this.mapping,
			channel: this.channel,
			repeat: [this.repeat.x, this.repeat.y],
			offset: [this.offset.x, this.offset.y],
			center: [this.center.x, this.center.y],
			rotation: this.rotation,
			wrap: [this.wrapS, this.wrapT],
			format: this.format,
			internalFormat: this.internalFormat,
			type: this.type,
			normalized: this.normalized,
			colorSpace: this.colorSpace,
			minFilter: this.minFilter,
			magFilter: this.magFilter,
			anisotropy: this.anisotropy,
			flipY: this.flipY,
			generateMipmaps: this.generateMipmaps,
			premultiplyAlpha: this.premultiplyAlpha,
			unpackAlignment: this.unpackAlignment
		};
		return Object.keys(this.userData).length > 0 && (n.userData = this.userData), t || (e.textures[this.uuid] = n), n;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
	transformUv(r) {
		if (this.mapping !== 300) return r;
		if (r.applyMatrix3(this.matrix), r.x < 0 || r.x > 1) switch (this.wrapS) {
			case e:
				r.x -= Math.floor(r.x);
				break;
			case t:
				r.x = r.x < 0 ? 0 : 1;
				break;
			case n: Math.abs(Math.floor(r.x) % 2) === 1 ? r.x = Math.ceil(r.x) - r.x : r.x -= Math.floor(r.x);
		}
		if (r.y < 0 || r.y > 1) switch (this.wrapT) {
			case e:
				r.y -= Math.floor(r.y);
				break;
			case t:
				r.y = r.y < 0 ? 0 : 1;
				break;
			case n: Math.abs(Math.floor(r.y) % 2) === 1 ? r.y = Math.ceil(r.y) - r.y : r.y -= Math.floor(r.y);
		}
		return this.flipY && (r.y = 1 - r.y), r;
	}
	set needsUpdate(e) {
		e === !0 && (this.version++, this.source.needsUpdate = !0);
	}
	set needsPMREMUpdate(e) {
		e === !0 && this.pmremVersion++;
	}
};
K.DEFAULT_IMAGE = null, K.DEFAULT_MAPPING = 300, K.DEFAULT_ANISOTROPY = 1;
var Me = class e {
	static {
		e.prototype.isVector4 = !0;
	}
	constructor(e = 0, t = 0, n = 0, r = 1) {
		this.x = e, this.y = t, this.z = n, this.w = r;
	}
	get width() {
		return this.z;
	}
	set width(e) {
		this.z = e;
	}
	get height() {
		return this.w;
	}
	set height(e) {
		this.w = e;
	}
	set(e, t, n, r) {
		return this.x = e, this.y = t, this.z = n, this.w = r, this;
	}
	setScalar(e) {
		return this.x = e, this.y = e, this.z = e, this.w = e, this;
	}
	setX(e) {
		return this.x = e, this;
	}
	setY(e) {
		return this.y = e, this;
	}
	setZ(e) {
		return this.z = e, this;
	}
	setW(e) {
		return this.w = e, this;
	}
	setComponent(e, t) {
		switch (e) {
			case 0:
				this.x = t;
				break;
			case 1:
				this.y = t;
				break;
			case 2:
				this.z = t;
				break;
			case 3:
				this.w = t;
				break;
			default: throw Error("THREE.Vector4: index is out of range: " + e);
		}
		return this;
	}
	getComponent(e) {
		switch (e) {
			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			case 3: return this.w;
			default: throw Error("THREE.Vector4: index is out of range: " + e);
		}
	}
	clone() {
		return new this.constructor(this.x, this.y, this.z, this.w);
	}
	copy(e) {
		return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w === void 0 ? 1 : e.w, this;
	}
	add(e) {
		return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
	}
	addScalar(e) {
		return this.x += e, this.y += e, this.z += e, this.w += e, this;
	}
	addVectors(e, t) {
		return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this;
	}
	addScaledVector(e, t) {
		return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this;
	}
	sub(e) {
		return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
	}
	subScalar(e) {
		return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this;
	}
	subVectors(e, t) {
		return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this;
	}
	multiply(e) {
		return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this;
	}
	multiplyScalar(e) {
		return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
	}
	applyMatrix4(e) {
		let t = this.x, n = this.y, r = this.z, i = this.w, a = e.elements;
		return this.x = a[0] * t + a[4] * n + a[8] * r + a[12] * i, this.y = a[1] * t + a[5] * n + a[9] * r + a[13] * i, this.z = a[2] * t + a[6] * n + a[10] * r + a[14] * i, this.w = a[3] * t + a[7] * n + a[11] * r + a[15] * i, this;
	}
	divide(e) {
		return this.x /= e.x, this.y /= e.y, this.z /= e.z, this.w /= e.w, this;
	}
	divideScalar(e) {
		return this.multiplyScalar(1 / e);
	}
	setAxisAngleFromQuaternion(e) {
		this.w = 2 * Math.acos(e.w);
		let t = Math.sqrt(1 - e.w * e.w);
		return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this;
	}
	setAxisAngleFromRotationMatrix(e) {
		let t, n, r, i, a = .01, o = .1, s = e.elements, c = s[0], l = s[4], u = s[8], d = s[1], f = s[5], p = s[9], m = s[2], h = s[6], g = s[10];
		if (Math.abs(l - d) < a && Math.abs(u - m) < a && Math.abs(p - h) < a) {
			if (Math.abs(l + d) < o && Math.abs(u + m) < o && Math.abs(p + h) < o && Math.abs(c + f + g - 3) < o) return this.set(1, 0, 0, 0), this;
			t = Math.PI;
			let e = (c + 1) / 2, s = (f + 1) / 2, _ = (g + 1) / 2, v = (l + d) / 4, y = (u + m) / 4, b = (p + h) / 4;
			return e > s && e > _ ? e < a ? (n = 0, r = .707106781, i = .707106781) : (n = Math.sqrt(e), r = v / n, i = y / n) : s > _ ? s < a ? (n = .707106781, r = 0, i = .707106781) : (r = Math.sqrt(s), n = v / r, i = b / r) : _ < a ? (n = .707106781, r = .707106781, i = 0) : (i = Math.sqrt(_), n = y / i, r = b / i), this.set(n, r, i, t), this;
		}
		let _ = Math.sqrt((h - p) * (h - p) + (u - m) * (u - m) + (d - l) * (d - l));
		return Math.abs(_) < .001 && (_ = 1), this.x = (h - p) / _, this.y = (u - m) / _, this.z = (d - l) / _, this.w = Math.acos((c + f + g - 1) / 2), this;
	}
	setFromMatrixPosition(e) {
		let t = e.elements;
		return this.x = t[12], this.y = t[13], this.z = t[14], this.w = t[15], this;
	}
	min(e) {
		return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
	}
	max(e) {
		return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
	}
	clamp(e, t) {
		return this.x = H(this.x, e.x, t.x), this.y = H(this.y, e.y, t.y), this.z = H(this.z, e.z, t.z), this.w = H(this.w, e.w, t.w), this;
	}
	clampScalar(e, t) {
		return this.x = H(this.x, e, t), this.y = H(this.y, e, t), this.z = H(this.z, e, t), this.w = H(this.w, e, t), this;
	}
	clampLength(e, t) {
		let n = this.length();
		return this.divideScalar(n || 1).multiplyScalar(H(n, e, t));
	}
	floor() {
		return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
	}
	ceil() {
		return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
	}
	round() {
		return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
	}
	roundToZero() {
		return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
	}
	negate() {
		return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
	}
	dot(e) {
		return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
	}
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
	}
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	setLength(e) {
		return this.normalize().multiplyScalar(e);
	}
	lerp(e, t) {
		return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this;
	}
	lerpVectors(e, t, n) {
		return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this.w = e.w + (t.w - e.w) * n, this;
	}
	equals(e) {
		return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
	}
	fromArray(e, t = 0) {
		return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e;
	}
	fromBufferAttribute(e, t) {
		return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this;
	}
	random() {
		return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
	}
	*[Symbol.iterator]() {
		yield this.x, yield this.y, yield this.z, yield this.w;
	}
}, Ne = class extends oe {
	constructor(e = 1, t = 1, n = {}) {
		super(), n = Object.assign({
			generateMipmaps: !1,
			internalFormat: null,
			minFilter: i,
			depthBuffer: !0,
			stencilBuffer: !1,
			resolveColorBuffer: !0,
			resolveDepthBuffer: !0,
			resolveStencilBuffer: !0,
			storeMultisampledColorBuffer: !0,
			storeMultisampledDepthBuffer: !0,
			storeMultisampledStencilBuffer: !0,
			depthTexture: null,
			samples: 0,
			count: 1,
			depth: 1,
			multiview: !1,
			useArrayDepthTexture: !1
		}, n), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = n.depth, this.scissor = new Me(0, 0, e, t), this.scissorTest = !1, this.viewport = new Me(0, 0, e, t), this.textures = [];
		let r = new K({
			width: e,
			height: t,
			depth: n.depth
		}), a = n.count;
		for (let e = 0; e < a; e++) this.textures[e] = r.clone(), this.textures[e].isRenderTargetTexture = !0, this.textures[e].renderTarget = this;
		this._setTextureOptions(n), this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveColorBuffer = n.resolveColorBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this.storeMultisampledColorBuffer = n.storeMultisampledColorBuffer, this.storeMultisampledDepthBuffer = n.storeMultisampledDepthBuffer, this.storeMultisampledStencilBuffer = n.storeMultisampledStencilBuffer, this._depthTexture = null, this.depthTexture = n.depthTexture, this.samples = n.samples, this.multiview = n.multiview, this.useArrayDepthTexture = n.useArrayDepthTexture;
	}
	_setTextureOptions(e = {}) {
		let t = {
			minFilter: i,
			generateMipmaps: !1,
			flipY: !1,
			internalFormat: null
		};
		e.mapping !== void 0 && (t.mapping = e.mapping), e.wrapS !== void 0 && (t.wrapS = e.wrapS), e.wrapT !== void 0 && (t.wrapT = e.wrapT), e.wrapR !== void 0 && (t.wrapR = e.wrapR), e.magFilter !== void 0 && (t.magFilter = e.magFilter), e.minFilter !== void 0 && (t.minFilter = e.minFilter), e.format !== void 0 && (t.format = e.format), e.type !== void 0 && (t.type = e.type), e.anisotropy !== void 0 && (t.anisotropy = e.anisotropy), e.colorSpace !== void 0 && (t.colorSpace = e.colorSpace), e.flipY !== void 0 && (t.flipY = e.flipY), e.generateMipmaps !== void 0 && (t.generateMipmaps = e.generateMipmaps), e.internalFormat !== void 0 && (t.internalFormat = e.internalFormat);
		for (let e = 0; e < this.textures.length; e++) this.textures[e].setValues(t);
	}
	get texture() {
		return this.textures[0];
	}
	set texture(e) {
		this.textures[0] = e;
	}
	set depthTexture(e) {
		this._depthTexture !== null && this._depthTexture.renderTarget === this && (this._depthTexture.renderTarget = null), e !== null && e.renderTarget === null && (e.renderTarget = this), this._depthTexture = e;
	}
	get depthTexture() {
		return this._depthTexture;
	}
	setSize(e, t, n = 1) {
		if (this.width !== e || this.height !== t || this.depth !== n) {
			this.width = e, this.height = t, this.depth = n;
			for (let r = 0, i = this.textures.length; r < i; r++) this.textures[r].image.width = e, this.textures[r].image.height = t, this.textures[r].image.depth = n, this.textures[r].isData3DTexture !== !0 && (this.textures[r].isArrayTexture = this.textures[r].image.depth > 1);
			this.dispose();
		}
		this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t);
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0;
		for (let t = 0, n = e.textures.length; t < n; t++) {
			this.textures[t] = e.textures[t].clone(), this.textures[t].isRenderTargetTexture = !0, this.textures[t].renderTarget = this;
			let n = Object.assign({}, e.textures[t].image);
			this.textures[t].source = new Oe(n);
		}
		if (this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveColorBuffer = e.resolveColorBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, this.storeMultisampledColorBuffer = e.storeMultisampledColorBuffer, this.storeMultisampledDepthBuffer = e.storeMultisampledDepthBuffer, this.storeMultisampledStencilBuffer = e.storeMultisampledStencilBuffer, e.depthTexture !== null) {
			if (e.depthTexture.renderTarget === e) {
				let t = e.depthTexture.clone();
				t.renderTarget = null, this.depthTexture = t;
			} else this.depthTexture = e.depthTexture;
		}
		return this.samples = e.samples, this.multiview = e.multiview, this.useArrayDepthTexture = e.useArrayDepthTexture, this;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
}, Pe = class extends Ne {
	constructor(e = 1, t = 1, n = {}) {
		super(e, t, n), this.isWebGLRenderTarget = !0;
	}
}, Fe = class extends K {
	constructor(e = null, n = 1, i = 1, a = 1) {
		super(null), this.isDataArrayTexture = !0, this.image = {
			data: e,
			width: n,
			height: i,
			depth: a
		}, this.magFilter = r, this.minFilter = r, this.wrapR = t, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
	}
	copy(e) {
		return super.copy(e), this.wrapR = e.wrapR, this;
	}
	addLayerUpdate(e) {
		this.layerUpdates.add(e);
	}
	clearLayerUpdates() {
		this.layerUpdates.clear();
	}
}, Ie = class extends K {
	constructor(e = null, n = 1, i = 1, a = 1) {
		super(null), this.isData3DTexture = !0, this.image = {
			data: e,
			width: n,
			height: i,
			depth: a
		}, this.magFilter = r, this.minFilter = r, this.wrapR = t, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
	}
	copy(e) {
		return super.copy(e), this.wrapR = e.wrapR, this;
	}
}, Le = class e {
	static {
		e.prototype.isMatrix4 = !0;
	}
	constructor(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) {
		this.elements = [
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			1
		], e !== void 0 && this.set(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h);
	}
	set(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h) {
		let g = this.elements;
		return g[0] = e, g[4] = t, g[8] = n, g[12] = r, g[1] = i, g[5] = a, g[9] = o, g[13] = s, g[2] = c, g[6] = l, g[10] = u, g[14] = d, g[3] = f, g[7] = p, g[11] = m, g[15] = h, this;
	}
	identity() {
		return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
	}
	clone() {
		return new e().fromArray(this.elements);
	}
	copy(e) {
		let t = this.elements, n = e.elements;
		return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t[9] = n[9], t[10] = n[10], t[11] = n[11], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15], this;
	}
	copyPosition(e) {
		let t = this.elements, n = e.elements;
		return t[12] = n[12], t[13] = n[13], t[14] = n[14], this;
	}
	setFromMatrix3(e) {
		let t = e.elements;
		return this.set(t[0], t[3], t[6], 0, t[1], t[4], t[7], 0, t[2], t[5], t[8], 0, 0, 0, 0, 1), this;
	}
	extractBasis(e, t, n) {
		return this.determinantAffine() === 0 ? (e.set(1, 0, 0), t.set(0, 1, 0), n.set(0, 0, 1), this) : (e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this);
	}
	makeBasis(e, t, n) {
		return this.set(e.x, t.x, n.x, 0, e.y, t.y, n.y, 0, e.z, t.z, n.z, 0, 0, 0, 0, 1), this;
	}
	extractRotation(e) {
		if (e.determinantAffine() === 0) return this.identity();
		let t = this.elements, n = e.elements, r = 1 / q.setFromMatrixColumn(e, 0).length(), i = 1 / q.setFromMatrixColumn(e, 1).length(), a = 1 / q.setFromMatrixColumn(e, 2).length();
		return t[0] = n[0] * r, t[1] = n[1] * r, t[2] = n[2] * r, t[3] = 0, t[4] = n[4] * i, t[5] = n[5] * i, t[6] = n[6] * i, t[7] = 0, t[8] = n[8] * a, t[9] = n[9] * a, t[10] = n[10] * a, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
	}
	makeRotationFromEuler(e) {
		let t = this.elements, n = e.x, r = e.y, i = e.z, a = Math.cos(n), o = Math.sin(n), s = Math.cos(r), c = Math.sin(r), l = Math.cos(i), u = Math.sin(i);
		if (e.order === "XYZ") {
			let e = a * l, n = a * u, r = o * l, i = o * u;
			t[0] = s * l, t[4] = -s * u, t[8] = c, t[1] = n + r * c, t[5] = e - i * c, t[9] = -o * s, t[2] = i - e * c, t[6] = r + n * c, t[10] = a * s;
		} else if (e.order === "YXZ") {
			let e = s * l, n = s * u, r = c * l, i = c * u;
			t[0] = e + i * o, t[4] = r * o - n, t[8] = a * c, t[1] = a * u, t[5] = a * l, t[9] = -o, t[2] = n * o - r, t[6] = i + e * o, t[10] = a * s;
		} else if (e.order === "ZXY") {
			let e = s * l, n = s * u, r = c * l, i = c * u;
			t[0] = e - i * o, t[4] = -a * u, t[8] = r + n * o, t[1] = n + r * o, t[5] = a * l, t[9] = i - e * o, t[2] = -a * c, t[6] = o, t[10] = a * s;
		} else if (e.order === "ZYX") {
			let e = a * l, n = a * u, r = o * l, i = o * u;
			t[0] = s * l, t[4] = r * c - n, t[8] = e * c + i, t[1] = s * u, t[5] = i * c + e, t[9] = n * c - r, t[2] = -c, t[6] = o * s, t[10] = a * s;
		} else if (e.order === "YZX") {
			let e = a * s, n = a * c, r = o * s, i = o * c;
			t[0] = s * l, t[4] = i - e * u, t[8] = r * u + n, t[1] = u, t[5] = a * l, t[9] = -o * l, t[2] = -c * l, t[6] = n * u + r, t[10] = e - i * u;
		} else if (e.order === "XZY") {
			let e = a * s, n = a * c, r = o * s, i = o * c;
			t[0] = s * l, t[4] = -u, t[8] = c * l, t[1] = e * u + i, t[5] = a * l, t[9] = n * u - r, t[2] = r * u - n, t[6] = o * l, t[10] = i * u + e;
		}
		return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
	}
	makeRotationFromQuaternion(e) {
		return this.compose(ze, e, Be);
	}
	lookAt(e, t, n) {
		let r = this.elements;
		return Ue.subVectors(e, t), Ue.lengthSq() === 0 && (Ue.z = 1), Ue.normalize(), Ve.crossVectors(n, Ue), Ve.lengthSq() === 0 && (Math.abs(n.z) === 1 ? Ue.x += 1e-4 : Ue.z += 1e-4, Ue.normalize(), Ve.crossVectors(n, Ue)), Ve.normalize(), He.crossVectors(Ue, Ve), r[0] = Ve.x, r[4] = He.x, r[8] = Ue.x, r[1] = Ve.y, r[5] = He.y, r[9] = Ue.y, r[2] = Ve.z, r[6] = He.z, r[10] = Ue.z, this;
	}
	multiply(e) {
		return this.multiplyMatrices(this, e);
	}
	premultiply(e) {
		return this.multiplyMatrices(e, this);
	}
	multiplyMatrices(e, t) {
		let n = e.elements, r = t.elements, i = this.elements, a = n[0], o = n[4], s = n[8], c = n[12], l = n[1], u = n[5], d = n[9], f = n[13], p = n[2], m = n[6], h = n[10], g = n[14], _ = n[3], v = n[7], y = n[11], b = n[15], x = r[0], S = r[4], C = r[8], w = r[12], T = r[1], E = r[5], D = r[9], O = r[13], k = r[2], A = r[6], j = r[10], M = r[14], N = r[3], P = r[7], F = r[11], I = r[15];
		return i[0] = a * x + o * T + s * k + c * N, i[4] = a * S + o * E + s * A + c * P, i[8] = a * C + o * D + s * j + c * F, i[12] = a * w + o * O + s * M + c * I, i[1] = l * x + u * T + d * k + f * N, i[5] = l * S + u * E + d * A + f * P, i[9] = l * C + u * D + d * j + f * F, i[13] = l * w + u * O + d * M + f * I, i[2] = p * x + m * T + h * k + g * N, i[6] = p * S + m * E + h * A + g * P, i[10] = p * C + m * D + h * j + g * F, i[14] = p * w + m * O + h * M + g * I, i[3] = _ * x + v * T + y * k + b * N, i[7] = _ * S + v * E + y * A + b * P, i[11] = _ * C + v * D + y * j + b * F, i[15] = _ * w + v * O + y * M + b * I, this;
	}
	multiplyScalar(e) {
		let t = this.elements;
		return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this;
	}
	determinant() {
		let e = this.elements, t = e[0], n = e[4], r = e[8], i = e[12], a = e[1], o = e[5], s = e[9], c = e[13], l = e[2], u = e[6], d = e[10], f = e[14], p = e[3], m = e[7], h = e[11], g = e[15], _ = s * f - c * d, v = o * f - c * u, y = o * d - s * u, b = a * f - c * l, x = a * d - s * l, S = a * u - o * l;
		return t * (m * _ - h * v + g * y) - n * (p * _ - h * b + g * x) + r * (p * v - m * b + g * S) - i * (p * y - m * x + h * S);
	}
	determinantAffine() {
		let e = this.elements, t = e[0], n = e[4], r = e[8], i = e[1], a = e[5], o = e[9], s = e[2], c = e[6], l = e[10];
		return t * (a * l - o * c) - n * (i * l - o * s) + r * (i * c - a * s);
	}
	transpose() {
		let e = this.elements, t;
		return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this;
	}
	setPosition(e, t, n) {
		let r = this.elements;
		return e.isVector3 ? (r[12] = e.x, r[13] = e.y, r[14] = e.z) : (r[12] = e, r[13] = t, r[14] = n), this;
	}
	invert() {
		let e = this.elements, t = e[0], n = e[1], r = e[2], i = e[3], a = e[4], o = e[5], s = e[6], c = e[7], l = e[8], u = e[9], d = e[10], f = e[11], p = e[12], m = e[13], h = e[14], g = e[15], _ = t * o - n * a, v = t * s - r * a, y = t * c - i * a, b = n * s - r * o, x = n * c - i * o, S = r * c - i * s, C = l * m - u * p, w = l * h - d * p, T = l * g - f * p, E = u * h - d * m, D = u * g - f * m, O = d * g - f * h, k = _ * O - v * D + y * E + b * T - x * w + S * C;
		if (k === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
		let A = 1 / k;
		return e[0] = (o * O - s * D + c * E) * A, e[1] = (r * D - n * O - i * E) * A, e[2] = (m * S - h * x + g * b) * A, e[3] = (d * x - u * S - f * b) * A, e[4] = (s * T - a * O - c * w) * A, e[5] = (t * O - r * T + i * w) * A, e[6] = (h * y - p * S - g * v) * A, e[7] = (l * S - d * y + f * v) * A, e[8] = (a * D - o * T + c * C) * A, e[9] = (n * T - t * D - i * C) * A, e[10] = (p * x - m * y + g * _) * A, e[11] = (u * y - l * x - f * _) * A, e[12] = (o * w - a * E - s * C) * A, e[13] = (t * E - n * w + r * C) * A, e[14] = (m * v - p * b - h * _) * A, e[15] = (l * b - u * v + d * _) * A, this;
	}
	scale(e) {
		let t = this.elements, n = e.x, r = e.y, i = e.z;
		return t[0] *= n, t[4] *= r, t[8] *= i, t[1] *= n, t[5] *= r, t[9] *= i, t[2] *= n, t[6] *= r, t[10] *= i, t[3] *= n, t[7] *= r, t[11] *= i, this;
	}
	getMaxScaleOnAxis() {
		let e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], r = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
		return Math.sqrt(Math.max(t, n, r));
	}
	makeTranslation(e, t, n) {
		return e.isVector3 ? this.set(1, 0, 0, e.x, 0, 1, 0, e.y, 0, 0, 1, e.z, 0, 0, 0, 1) : this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, n, 0, 0, 0, 1), this;
	}
	makeRotationX(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.set(1, 0, 0, 0, 0, t, -n, 0, 0, n, t, 0, 0, 0, 0, 1), this;
	}
	makeRotationY(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.set(t, 0, n, 0, 0, 1, 0, 0, -n, 0, t, 0, 0, 0, 0, 1), this;
	}
	makeRotationZ(e) {
		let t = Math.cos(e), n = Math.sin(e);
		return this.set(t, -n, 0, 0, n, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
	}
	makeRotationAxis(e, t) {
		let n = Math.cos(t), r = Math.sin(t), i = 1 - n, a = e.x, o = e.y, s = e.z, c = i * a, l = i * o;
		return this.set(c * a + n, c * o - r * s, c * s + r * o, 0, c * o + r * s, l * o + n, l * s - r * a, 0, c * s - r * o, l * s + r * a, i * s * s + n, 0, 0, 0, 0, 1), this;
	}
	makeScale(e, t, n) {
		return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this;
	}
	makeShear(e, t, n, r, i, a) {
		return this.set(1, n, i, 0, e, 1, a, 0, t, r, 1, 0, 0, 0, 0, 1), this;
	}
	compose(e, t, n) {
		let r = this.elements, i = t._x, a = t._y, o = t._z, s = t._w, c = i + i, l = a + a, u = o + o, d = i * c, f = i * l, p = i * u, m = a * l, h = a * u, g = o * u, _ = s * c, v = s * l, y = s * u, b = n.x, x = n.y, S = n.z;
		return r[0] = (1 - (m + g)) * b, r[1] = (f + y) * b, r[2] = (p - v) * b, r[3] = 0, r[4] = (f - y) * x, r[5] = (1 - (d + g)) * x, r[6] = (h + _) * x, r[7] = 0, r[8] = (p + v) * S, r[9] = (h - _) * S, r[10] = (1 - (d + m)) * S, r[11] = 0, r[12] = e.x, r[13] = e.y, r[14] = e.z, r[15] = 1, this;
	}
	decompose(e, t, n) {
		let r = this.elements;
		e.x = r[12], e.y = r[13], e.z = r[14];
		let i = this.determinantAffine();
		if (i === 0) return n.set(1, 1, 1), t.identity(), this;
		let a = q.set(r[0], r[1], r[2]).length(), o = q.set(r[4], r[5], r[6]).length(), s = q.set(r[8], r[9], r[10]).length();
		i < 0 && (a = -a), Re.copy(this);
		let c = 1 / a, l = 1 / o, u = 1 / s;
		return Re.elements[0] *= c, Re.elements[1] *= c, Re.elements[2] *= c, Re.elements[4] *= l, Re.elements[5] *= l, Re.elements[6] *= l, Re.elements[8] *= u, Re.elements[9] *= u, Re.elements[10] *= u, t.setFromRotationMatrix(Re), n.x = a, n.y = o, n.z = s, this;
	}
	makePerspective(e, t, n, r, i, a, o = F, s = !1) {
		let c = this.elements, l = 2 * i / (t - e), u = 2 * i / (n - r), d = (t + e) / (t - e), f = (n + r) / (n - r), p, m;
		if (s) p = i / (a - i), m = a * i / (a - i);
		else if (o === 2e3) p = -(a + i) / (a - i), m = -2 * a * i / (a - i);
		else if (o === 2001) p = -a / (a - i), m = -a * i / (a - i);
		else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
		return c[0] = l, c[4] = 0, c[8] = d, c[12] = 0, c[1] = 0, c[5] = u, c[9] = f, c[13] = 0, c[2] = 0, c[6] = 0, c[10] = p, c[14] = m, c[3] = 0, c[7] = 0, c[11] = -1, c[15] = 0, this;
	}
	makeOrthographic(e, t, n, r, i, a, o = F, s = !1) {
		let c = this.elements, l = 2 / (t - e), u = 2 / (n - r), d = -(t + e) / (t - e), f = -(n + r) / (n - r), p, m;
		if (s) p = 1 / (a - i), m = a / (a - i);
		else if (o === 2e3) p = -2 / (a - i), m = -(a + i) / (a - i);
		else if (o === 2001) p = -1 / (a - i), m = -i / (a - i);
		else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
		return c[0] = l, c[4] = 0, c[8] = 0, c[12] = d, c[1] = 0, c[5] = u, c[9] = 0, c[13] = f, c[2] = 0, c[6] = 0, c[10] = p, c[14] = m, c[3] = 0, c[7] = 0, c[11] = 0, c[15] = 1, this;
	}
	equals(e) {
		let t = this.elements, n = e.elements;
		for (let e = 0; e < 16; e++) if (t[e] !== n[e]) return !1;
		return !0;
	}
	fromArray(e, t = 0) {
		for (let n = 0; n < 16; n++) this.elements[n] = e[n + t];
		return this;
	}
	toArray(e = [], t = 0) {
		let n = this.elements;
		return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e[t + 9] = n[9], e[t + 10] = n[10], e[t + 11] = n[11], e[t + 12] = n[12], e[t + 13] = n[13], e[t + 14] = n[14], e[t + 15] = n[15], e;
	}
}, q = /*@__PURE__*/ new W(), Re = /*@__PURE__*/ new Le(), ze = /*@__PURE__*/ new W(0, 0, 0), Be = /*@__PURE__*/ new W(1, 1, 1), Ve = /*@__PURE__*/ new W(), He = /*@__PURE__*/ new W(), Ue = /*@__PURE__*/ new W(), We = /*@__PURE__*/ new Le(), Ge = /*@__PURE__*/ new he(), Ke = class e {
	constructor(t = 0, n = 0, r = 0, i = e.DEFAULT_ORDER) {
		this.isEuler = !0, this._x = t, this._y = n, this._z = r, this._order = i;
	}
	get x() {
		return this._x;
	}
	set x(e) {
		this._x = e, this._onChangeCallback();
	}
	get y() {
		return this._y;
	}
	set y(e) {
		this._y = e, this._onChangeCallback();
	}
	get z() {
		return this._z;
	}
	set z(e) {
		this._z = e, this._onChangeCallback();
	}
	get order() {
		return this._order;
	}
	set order(e) {
		this._order = e, this._onChangeCallback();
	}
	set(e, t, n, r = this._order) {
		return this._x = e, this._y = t, this._z = n, this._order = r, this._onChangeCallback(), this;
	}
	clone() {
		return new this.constructor(this._x, this._y, this._z, this._order);
	}
	copy(e) {
		return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
	}
	setFromRotationMatrix(e, t = this._order, n = !0) {
		let r = e.elements, i = r[0], a = r[4], o = r[8], s = r[1], c = r[5], l = r[9], u = r[2], d = r[6], f = r[10];
		switch (t) {
			case "XYZ":
				this._y = Math.asin(H(o, -1, 1)), Math.abs(o) < .9999999 ? (this._x = Math.atan2(-l, f), this._z = Math.atan2(-a, i)) : (this._x = Math.atan2(d, c), this._z = 0);
				break;
			case "YXZ":
				this._x = Math.asin(-H(l, -1, 1)), Math.abs(l) < .9999999 ? (this._y = Math.atan2(o, f), this._z = Math.atan2(s, c)) : (this._y = Math.atan2(-u, i), this._z = 0);
				break;
			case "ZXY":
				this._x = Math.asin(H(d, -1, 1)), Math.abs(d) < .9999999 ? (this._y = Math.atan2(-u, f), this._z = Math.atan2(-a, c)) : (this._y = 0, this._z = Math.atan2(s, i));
				break;
			case "ZYX":
				this._y = Math.asin(-H(u, -1, 1)), Math.abs(u) < .9999999 ? (this._x = Math.atan2(d, f), this._z = Math.atan2(s, i)) : (this._x = 0, this._z = Math.atan2(-a, c));
				break;
			case "YZX":
				this._z = Math.asin(H(s, -1, 1)), Math.abs(s) < .9999999 ? (this._x = Math.atan2(-l, c), this._y = Math.atan2(-u, i)) : (this._x = 0, this._y = Math.atan2(o, f));
				break;
			case "XZY":
				this._z = Math.asin(-H(a, -1, 1)), Math.abs(a) < .9999999 ? (this._x = Math.atan2(d, c), this._y = Math.atan2(o, i)) : (this._x = Math.atan2(-l, f), this._y = 0);
				break;
			default: z("Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
		}
		return this._order = t, n === !0 && this._onChangeCallback(), this;
	}
	setFromQuaternion(e, t, n) {
		return We.makeRotationFromQuaternion(e), this.setFromRotationMatrix(We, t, n);
	}
	setFromVector3(e, t = this._order) {
		return this.set(e.x, e.y, e.z, t);
	}
	reorder(e) {
		return Ge.setFromEuler(this), this.setFromQuaternion(Ge, e);
	}
	equals(e) {
		return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
	}
	fromArray(e) {
		return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e;
	}
	_onChange(e) {
		return this._onChangeCallback = e, this;
	}
	_onChangeCallback() {}
	*[Symbol.iterator]() {
		yield this._x, yield this._y, yield this._z, yield this._order;
	}
};
Ke.DEFAULT_ORDER = "XYZ";
var qe = class {
	constructor() {
		this.mask = 1;
	}
	set(e) {
		this.mask = (1 << e | 0) >>> 0;
	}
	enable(e) {
		this.mask |= 1 << e | 0;
	}
	enableAll() {
		this.mask = -1;
	}
	toggle(e) {
		this.mask ^= 1 << e | 0;
	}
	disable(e) {
		this.mask &= ~(1 << e | 0);
	}
	disableAll() {
		this.mask = 0;
	}
	test(e) {
		return (this.mask & e.mask) !== 0;
	}
	isEnabled(e) {
		return !!(this.mask & (1 << e | 0));
	}
}, Je = 0, Ye = /*@__PURE__*/ new W(), Xe = /*@__PURE__*/ new he(), Ze = /*@__PURE__*/ new Le(), Qe = /*@__PURE__*/ new W(), $e = /*@__PURE__*/ new W(), et = /*@__PURE__*/ new W(), tt = /*@__PURE__*/ new he(), nt = /*@__PURE__*/ new W(1, 0, 0), rt = /*@__PURE__*/ new W(0, 1, 0), it = /*@__PURE__*/ new W(0, 0, 1), at = { type: "added" }, ot = { type: "removed" }, st = {
	type: "childadded",
	child: null
}, ct = {
	type: "childremoved",
	child: null
}, lt = class e extends oe {
	constructor() {
		super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: Je++ }), this.uuid = ue(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = e.DEFAULT_UP.clone();
		let t = new W(), n = new Ke(), r = new he(), i = new W(1, 1, 1);
		function a() {
			r.setFromEuler(n, !1);
		}
		function o() {
			n.setFromQuaternion(r, void 0, !1);
		}
		n._onChange(a), r._onChange(o), Object.defineProperties(this, {
			position: {
				configurable: !0,
				enumerable: !0,
				value: t
			},
			rotation: {
				configurable: !0,
				enumerable: !0,
				value: n
			},
			quaternion: {
				configurable: !0,
				enumerable: !0,
				value: r
			},
			scale: {
				configurable: !0,
				enumerable: !0,
				value: i
			},
			modelViewMatrix: { value: new Le() },
			normalMatrix: { value: new G() }
		}), this.matrix = new Le(), this.matrixWorld = new Le(), this.matrixAutoUpdate = e.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new qe(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.static = !1, this.userData = {}, this.pivot = null;
	}
	onBeforeShadow() {}
	onAfterShadow() {}
	onBeforeRender() {}
	onAfterRender() {}
	applyMatrix4(e) {
		this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale);
	}
	applyQuaternion(e) {
		return this.quaternion.premultiply(e), this;
	}
	setRotationFromAxisAngle(e, t) {
		this.quaternion.setFromAxisAngle(e, t);
	}
	setRotationFromEuler(e) {
		this.quaternion.setFromEuler(e, !0);
	}
	setRotationFromMatrix(e) {
		this.quaternion.setFromRotationMatrix(e);
	}
	setRotationFromQuaternion(e) {
		this.quaternion.copy(e);
	}
	rotateOnAxis(e, t) {
		return Xe.setFromAxisAngle(e, t), this.quaternion.multiply(Xe), this;
	}
	rotateOnWorldAxis(e, t) {
		return Xe.setFromAxisAngle(e, t), this.quaternion.premultiply(Xe), this;
	}
	rotateX(e) {
		return this.rotateOnAxis(nt, e);
	}
	rotateY(e) {
		return this.rotateOnAxis(rt, e);
	}
	rotateZ(e) {
		return this.rotateOnAxis(it, e);
	}
	translateOnAxis(e, t) {
		return Ye.copy(e).applyQuaternion(this.quaternion), this.position.add(Ye.multiplyScalar(t)), this;
	}
	translateX(e) {
		return this.translateOnAxis(nt, e);
	}
	translateY(e) {
		return this.translateOnAxis(rt, e);
	}
	translateZ(e) {
		return this.translateOnAxis(it, e);
	}
	localToWorld(e) {
		return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
	}
	worldToLocal(e) {
		return this.updateWorldMatrix(!0, !1), e.applyMatrix4(Ze.copy(this.matrixWorld).invert());
	}
	lookAt(e, t, n) {
		e.isVector3 ? Qe.copy(e) : Qe.set(e, t, n);
		let r = this.parent;
		this.updateWorldMatrix(!0, !1), $e.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? Ze.lookAt($e, Qe, this.up) : Ze.lookAt(Qe, $e, this.up), this.quaternion.setFromRotationMatrix(Ze), r && (Ze.extractRotation(r.matrixWorld), Xe.setFromRotationMatrix(Ze), this.quaternion.premultiply(Xe.invert()));
	}
	add(e) {
		if (arguments.length > 1) {
			for (let e = 0; e < arguments.length; e++) this.add(arguments[e]);
			return this;
		}
		return e === this ? (B("Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent(at), st.child = e, this.dispatchEvent(st), st.child = null) : B("Object3D.add: object not an instance of THREE.Object3D.", e), this);
	}
	remove(e) {
		if (arguments.length > 1) {
			for (let e = 0; e < arguments.length; e++) this.remove(arguments[e]);
			return this;
		}
		let t = this.children.indexOf(e);
		return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(ot), ct.child = e, this.dispatchEvent(ct), ct.child = null), this;
	}
	removeFromParent() {
		let e = this.parent;
		return e !== null && e.remove(this), this;
	}
	clear() {
		return this.remove(...this.children);
	}
	attach(e) {
		return this.updateWorldMatrix(!0, !1), Ze.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), Ze.multiply(e.parent.matrixWorld)), e.applyMatrix4(Ze), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(!1, !0), e.dispatchEvent(at), st.child = e, this.dispatchEvent(st), st.child = null, this;
	}
	getObjectById(e) {
		return this.getObjectByProperty("id", e);
	}
	getObjectByName(e) {
		return this.getObjectByProperty("name", e);
	}
	getObjectByProperty(e, t) {
		if (this[e] === t) return this;
		for (let n = 0, r = this.children.length; n < r; n++) {
			let r = this.children[n].getObjectByProperty(e, t);
			if (r !== void 0) return r;
		}
	}
	getObjectsByProperty(e, t, n = []) {
		this[e] === t && n.push(this);
		let r = this.children;
		for (let i = 0, a = r.length; i < a; i++) r[i].getObjectsByProperty(e, t, n);
		return n;
	}
	getWorldPosition(e) {
		return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
	}
	getWorldQuaternion(e) {
		return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose($e, e, et), e;
	}
	getWorldScale(e) {
		return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose($e, tt, e), e;
	}
	getWorldDirection(e) {
		this.updateWorldMatrix(!0, !1);
		let t = this.matrixWorld.elements;
		return e.set(t[8], t[9], t[10]).normalize();
	}
	raycast() {}
	intersectsFrustum() {}
	traverse(e) {
		e(this);
		let t = this.children;
		for (let n = 0, r = t.length; n < r; n++) t[n].traverse(e);
	}
	traverseVisible(e) {
		if (this.visible === !1) return;
		e(this);
		let t = this.children;
		for (let n = 0, r = t.length; n < r; n++) t[n].traverseVisible(e);
	}
	traverseAncestors(e) {
		let t = this.parent;
		t !== null && (e(t), t.traverseAncestors(e));
	}
	updateMatrix() {
		this.matrix.compose(this.position, this.quaternion, this.scale);
		let e = this.pivot;
		if (e !== null) {
			let t = e.x, n = e.y, r = e.z, i = this.matrix.elements;
			i[12] += t - i[0] * t - i[4] * n - i[8] * r, i[13] += n - i[1] * t - i[5] * n - i[9] * r, i[14] += r - i[2] * t - i[6] * n - i[10] * r;
		}
		this.matrixWorldNeedsUpdate = !0;
	}
	updateMatrixWorld(e) {
		this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, e = !0);
		let t = this.children;
		for (let n = 0, r = t.length; n < r; n++) t[n].updateMatrixWorld(e);
	}
	updateWorldMatrix(e, t, n = !1) {
		let r = this.parent;
		if (e === !0 && r !== null && r.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || n) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, n = !0), t === !0) {
			let e = this.children;
			for (let t = 0, r = e.length; t < r; t++) e[t].updateWorldMatrix(!1, !0, n);
		}
	}
	toJSON(e) {
		let t = e === void 0 || typeof e == "string", n = {};
		t && (e = {
			geometries: {},
			materials: {},
			textures: {},
			images: {},
			shapes: {},
			skeletons: {},
			animations: {},
			nodes: {}
		}, n.metadata = {
			version: 4.7,
			type: "Object",
			generator: "Object3D.toJSON"
		});
		let r = {};
		r.uuid = this.uuid, r.type = this.type, r.name = this.name, r.castShadow = this.castShadow, r.receiveShadow = this.receiveShadow, r.visible = this.visible, r.frustumCulled = this.frustumCulled, r.renderOrder = this.renderOrder, r.static = this.static, r.matrixAutoUpdate = this.matrixAutoUpdate, Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), this.pivot !== null && (r.pivot = this.pivot.toArray()), this.morphTargetDictionary !== void 0 && (r.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary)), this.morphTargetInfluences !== void 0 && (r.morphTargetInfluences = this.morphTargetInfluences.slice()), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = "BatchedMesh", r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.geometryInfo = this._geometryInfo.map((e) => ({
			...e,
			boundingBox: e.boundingBox ? e.boundingBox.toJSON() : void 0,
			boundingSphere: e.boundingSphere ? e.boundingSphere.toJSON() : void 0
		})), r.instanceInfo = this._instanceInfo.map((e) => ({ ...e })), r.availableInstanceIds = this._availableInstanceIds.slice(), r.availableGeometryIds = this._availableGeometryIds.slice(), r.nextIndexStart = this._nextIndexStart, r.nextVertexStart = this._nextVertexStart, r.geometryCount = this._geometryCount, r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.matricesTexture = this._matricesTexture.toJSON(e), r.indirectTexture = this._indirectTexture.toJSON(e), this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(e)), this.boundingSphere !== null && (r.boundingSphere = this.boundingSphere.toJSON()), this.boundingBox !== null && (r.boundingBox = this.boundingBox.toJSON()));
		function i(t, n) {
			return t[n.uuid] === void 0 && (t[n.uuid] = n.toJSON(e)), n.uuid;
		}
		if (this.isScene) this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (r.environment = this.environment.toJSON(e).uuid);
		else if (this.isMesh || this.isLine || this.isPoints) {
			r.geometry = i(e.geometries, this.geometry);
			let t = this.geometry.parameters;
			if (t !== void 0 && t.shapes !== void 0) {
				let n = t.shapes;
				if (Array.isArray(n)) for (let t = 0, r = n.length; t < r; t++) {
					let r = n[t];
					i(e.shapes, r);
				}
				else i(e.shapes, n);
			}
		}
		if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (i(e.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== void 0) {
			if (Array.isArray(this.material)) {
				let t = [];
				for (let n = 0, r = this.material.length; n < r; n++) t.push(i(e.materials, this.material[n]));
				r.material = t;
			} else r.material = i(e.materials, this.material);
		}
		if (this.children.length > 0) {
			r.children = [];
			for (let t = 0; t < this.children.length; t++) r.children.push(this.children[t].toJSON(e).object);
		}
		if (this.animations.length > 0) {
			r.animations = [];
			for (let t = 0; t < this.animations.length; t++) {
				let n = this.animations[t];
				r.animations.push(i(e.animations, n));
			}
		}
		if (t) {
			let t = a(e.geometries), r = a(e.materials), i = a(e.textures), o = a(e.images), s = a(e.shapes), c = a(e.skeletons), l = a(e.animations), u = a(e.nodes);
			t.length > 0 && (n.geometries = t), r.length > 0 && (n.materials = r), i.length > 0 && (n.textures = i), o.length > 0 && (n.images = o), s.length > 0 && (n.shapes = s), c.length > 0 && (n.skeletons = c), l.length > 0 && (n.animations = l), u.length > 0 && (n.nodes = u);
		}
		return n.object = r, n;
		function a(e) {
			let t = [];
			for (let n in e) {
				let r = e[n];
				delete r.metadata, t.push(r);
			}
			return t;
		}
	}
	clone(e) {
		return new this.constructor().copy(this, e);
	}
	copy(e, t = !0) {
		if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.pivot = e.pivot === null ? null : e.pivot.clone(), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.static = e.static, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), t === !0) for (let t = 0; t < e.children.length; t++) {
			let n = e.children[t];
			this.add(n.clone());
		}
		return this;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
};
lt.DEFAULT_UP = /*@__PURE__*/ new W(0, 1, 0), lt.DEFAULT_MATRIX_AUTO_UPDATE = !0, lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
var ut = class extends lt {
	constructor() {
		super(), this.isGroup = !0, this.type = "Group";
	}
}, dt = { type: "move" }, ft = class {
	constructor() {
		this._targetRay = null, this._grip = null, this._hand = null;
	}
	getHandSpace() {
		return this._hand === null && (this._hand = new ut(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
	}
	getTargetRaySpace() {
		return this._targetRay === null && (this._targetRay = new ut(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new W(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new W()), this._targetRay;
	}
	getGripSpace() {
		return this._grip === null && (this._grip = new ut(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new W(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new W(), this._grip.eventsEnabled = !1), this._grip;
	}
	dispatchEvent(e) {
		return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this;
	}
	connect(e) {
		if (e && e.hand) {
			let t = this._hand;
			if (t) for (let n of e.hand.values()) this._getHandJoint(t, n);
		}
		return this.dispatchEvent({
			type: "connected",
			data: e
		}), this;
	}
	disconnect(e) {
		return this.dispatchEvent({
			type: "disconnected",
			data: e
		}), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
	}
	update(e, t, n) {
		let r = null, i = null, a = null, o = this._targetRay, s = this._grip, c = this._hand;
		if (e && t.session.visibilityState !== "visible-blurred") {
			if (c && e.hand) {
				a = !0;
				for (let r of e.hand.values()) {
					let e = t.getJointPose(r, n), i = this._getHandJoint(c, r);
					e !== null && (i.matrix.fromArray(e.transform.matrix), i.matrix.decompose(i.position, i.rotation, i.scale), i.matrixWorldNeedsUpdate = !0, i.jointRadius = e.radius), i.visible = e !== null;
				}
				let r = c.joints["index-finger-tip"], i = c.joints["thumb-tip"], o = r.position.distanceTo(i.position);
				c.inputState.pinching && o > .025 ? (c.inputState.pinching = !1, this.dispatchEvent({
					type: "pinchend",
					handedness: e.handedness,
					target: this
				})) : !c.inputState.pinching && o <= .015 && (c.inputState.pinching = !0, this.dispatchEvent({
					type: "pinchstart",
					handedness: e.handedness,
					target: this
				}));
			} else s !== null && e.gripSpace && (i = t.getPose(e.gripSpace, n), i !== null && (s.matrix.fromArray(i.transform.matrix), s.matrix.decompose(s.position, s.rotation, s.scale), s.matrixWorldNeedsUpdate = !0, i.linearVelocity ? (s.hasLinearVelocity = !0, s.linearVelocity.copy(i.linearVelocity)) : s.hasLinearVelocity = !1, i.angularVelocity ? (s.hasAngularVelocity = !0, s.angularVelocity.copy(i.angularVelocity)) : s.hasAngularVelocity = !1, s.eventsEnabled && s.dispatchEvent({
				type: "gripUpdated",
				data: e,
				target: this
			})));
			o !== null && (r = t.getPose(e.targetRaySpace, n), r === null && i !== null && (r = i), r !== null && (o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(r.linearVelocity)) : o.hasLinearVelocity = !1, r.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(r.angularVelocity)) : o.hasAngularVelocity = !1, this.dispatchEvent(dt)));
		}
		return o !== null && (o.visible = r !== null), s !== null && (s.visible = i !== null), c !== null && (c.visible = a !== null), this;
	}
	_getHandJoint(e, t) {
		if (e.joints[t.jointName] === void 0) {
			let n = new ut();
			n.matrixAutoUpdate = !1, n.visible = !1, e.joints[t.jointName] = n, e.add(n);
		}
		return e.joints[t.jointName];
	}
}, pt = {
	aliceblue: 15792383,
	antiquewhite: 16444375,
	aqua: 65535,
	aquamarine: 8388564,
	azure: 15794175,
	beige: 16119260,
	bisque: 16770244,
	black: 0,
	blanchedalmond: 16772045,
	blue: 255,
	blueviolet: 9055202,
	brown: 10824234,
	burlywood: 14596231,
	cadetblue: 6266528,
	chartreuse: 8388352,
	chocolate: 13789470,
	coral: 16744272,
	cornflowerblue: 6591981,
	cornsilk: 16775388,
	crimson: 14423100,
	cyan: 65535,
	darkblue: 139,
	darkcyan: 35723,
	darkgoldenrod: 12092939,
	darkgray: 11119017,
	darkgreen: 25600,
	darkgrey: 11119017,
	darkkhaki: 12433259,
	darkmagenta: 9109643,
	darkolivegreen: 5597999,
	darkorange: 16747520,
	darkorchid: 10040012,
	darkred: 9109504,
	darksalmon: 15308410,
	darkseagreen: 9419919,
	darkslateblue: 4734347,
	darkslategray: 3100495,
	darkslategrey: 3100495,
	darkturquoise: 52945,
	darkviolet: 9699539,
	deeppink: 16716947,
	deepskyblue: 49151,
	dimgray: 6908265,
	dimgrey: 6908265,
	dodgerblue: 2003199,
	firebrick: 11674146,
	floralwhite: 16775920,
	forestgreen: 2263842,
	fuchsia: 16711935,
	gainsboro: 14474460,
	ghostwhite: 16316671,
	gold: 16766720,
	goldenrod: 14329120,
	gray: 8421504,
	green: 32768,
	greenyellow: 11403055,
	grey: 8421504,
	honeydew: 15794160,
	hotpink: 16738740,
	indianred: 13458524,
	indigo: 4915330,
	ivory: 16777200,
	khaki: 15787660,
	lavender: 15132410,
	lavenderblush: 16773365,
	lawngreen: 8190976,
	lemonchiffon: 16775885,
	lightblue: 11393254,
	lightcoral: 15761536,
	lightcyan: 14745599,
	lightgoldenrodyellow: 16448210,
	lightgray: 13882323,
	lightgreen: 9498256,
	lightgrey: 13882323,
	lightpink: 16758465,
	lightsalmon: 16752762,
	lightseagreen: 2142890,
	lightskyblue: 8900346,
	lightslategray: 7833753,
	lightslategrey: 7833753,
	lightsteelblue: 11584734,
	lightyellow: 16777184,
	lime: 65280,
	limegreen: 3329330,
	linen: 16445670,
	magenta: 16711935,
	maroon: 8388608,
	mediumaquamarine: 6737322,
	mediumblue: 205,
	mediumorchid: 12211667,
	mediumpurple: 9662683,
	mediumseagreen: 3978097,
	mediumslateblue: 8087790,
	mediumspringgreen: 64154,
	mediumturquoise: 4772300,
	mediumvioletred: 13047173,
	midnightblue: 1644912,
	mintcream: 16121850,
	mistyrose: 16770273,
	moccasin: 16770229,
	navajowhite: 16768685,
	navy: 128,
	oldlace: 16643558,
	olive: 8421376,
	olivedrab: 7048739,
	orange: 16753920,
	orangered: 16729344,
	orchid: 14315734,
	palegoldenrod: 15657130,
	palegreen: 10025880,
	paleturquoise: 11529966,
	palevioletred: 14381203,
	papayawhip: 16773077,
	peachpuff: 16767673,
	peru: 13468991,
	pink: 16761035,
	plum: 14524637,
	powderblue: 11591910,
	purple: 8388736,
	rebeccapurple: 6697881,
	red: 16711680,
	rosybrown: 12357519,
	royalblue: 4286945,
	saddlebrown: 9127187,
	salmon: 16416882,
	sandybrown: 16032864,
	seagreen: 3050327,
	seashell: 16774638,
	sienna: 10506797,
	silver: 12632256,
	skyblue: 8900331,
	slateblue: 6970061,
	slategray: 7372944,
	slategrey: 7372944,
	snow: 16775930,
	springgreen: 65407,
	steelblue: 4620980,
	tan: 13808780,
	teal: 32896,
	thistle: 14204888,
	tomato: 16737095,
	turquoise: 4251856,
	violet: 15631086,
	wheat: 16113331,
	white: 16777215,
	whitesmoke: 16119285,
	yellow: 16776960,
	yellowgreen: 10145074
}, mt = {
	h: 0,
	s: 0,
	l: 0
}, ht = {
	h: 0,
	s: 0,
	l: 0
};
function gt(e, t, n) {
	return n < 0 && (n += 1), n > 1 && --n, n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * 6 * (2 / 3 - n) : e;
}
var J = class {
	constructor(e, t, n) {
		return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, n);
	}
	set(e, t, n) {
		if (t === void 0 && n === void 0) {
			let t = e;
			t && t.isColor ? this.copy(t) : typeof t == "number" ? this.setHex(t) : typeof t == "string" && this.setStyle(t);
		} else this.setRGB(e, t, n);
		return this;
	}
	setScalar(e) {
		return this.r = e, this.g = e, this.b = e, this;
	}
	setHex(e, t = k) {
		return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, Se.colorSpaceToWorking(this, t), this;
	}
	setRGB(e, t, n, r = Se.workingColorSpace) {
		return this.r = e, this.g = t, this.b = n, Se.colorSpaceToWorking(this, r), this;
	}
	setHSL(e, t, n, r = Se.workingColorSpace) {
		if (e = de(e, 1), t = H(t, 0, 1), n = H(n, 0, 1), t === 0) this.r = this.g = this.b = n;
		else {
			let r = n <= .5 ? n * (1 + t) : n + t - n * t, i = 2 * n - r;
			this.r = gt(i, r, e + 1 / 3), this.g = gt(i, r, e), this.b = gt(i, r, e - 1 / 3);
		}
		return Se.colorSpaceToWorking(this, r), this;
	}
	setStyle(e, t = k) {
		function n(t) {
			t !== void 0 && parseFloat(t) < 1 && z("Color: Alpha component of " + e + " will be ignored.");
		}
		let r;
		if (r = /^(\w+)\(([^\)]*)\)/.exec(e)) {
			let i, a = r[1], o = r[2];
			switch (a) {
				case "rgb":
				case "rgba":
					if (i = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(i[4]), this.setRGB(Math.min(255, parseInt(i[1], 10)) / 255, Math.min(255, parseInt(i[2], 10)) / 255, Math.min(255, parseInt(i[3], 10)) / 255, t);
					if (i = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(i[4]), this.setRGB(Math.min(100, parseInt(i[1], 10)) / 100, Math.min(100, parseInt(i[2], 10)) / 100, Math.min(100, parseInt(i[3], 10)) / 100, t);
					break;
				case "hsl":
				case "hsla":
					if (i = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)) return n(i[4]), this.setHSL(parseFloat(i[1]) / 360, parseFloat(i[2]) / 100, parseFloat(i[3]) / 100, t);
					break;
				default: z("Color: Unknown color model " + e);
			}
		} else if (r = /^\#([A-Fa-f\d]+)$/.exec(e)) {
			let n = r[1], i = n.length;
			if (i === 3) return this.setRGB(parseInt(n.charAt(0), 16) / 15, parseInt(n.charAt(1), 16) / 15, parseInt(n.charAt(2), 16) / 15, t);
			if (i === 6) return this.setHex(parseInt(n, 16), t);
			z("Color: Invalid hex color " + e);
		} else if (e && e.length > 0) return this.setColorName(e, t);
		return this;
	}
	setColorName(e, t = k) {
		let n = pt[e.toLowerCase()];
		return n === void 0 ? z("Color: Unknown color " + e) : this.setHex(n, t), this;
	}
	clone() {
		return new this.constructor(this.r, this.g, this.b);
	}
	copy(e) {
		return this.r = e.r, this.g = e.g, this.b = e.b, this;
	}
	copySRGBToLinear(e) {
		return this.r = Ce(e.r), this.g = Ce(e.g), this.b = Ce(e.b), this;
	}
	copyLinearToSRGB(e) {
		return this.r = we(e.r), this.g = we(e.g), this.b = we(e.b), this;
	}
	convertSRGBToLinear() {
		return this.copySRGBToLinear(this), this;
	}
	convertLinearToSRGB() {
		return this.copyLinearToSRGB(this), this;
	}
	getHex(e = k) {
		return Se.workingToColorSpace(_t.copy(this), e), Math.round(H(_t.r * 255, 0, 255)) * 65536 + Math.round(H(_t.g * 255, 0, 255)) * 256 + Math.round(H(_t.b * 255, 0, 255));
	}
	getHexString(e = k) {
		return ("000000" + this.getHex(e).toString(16)).slice(-6);
	}
	getHSL(e, t = Se.workingColorSpace) {
		Se.workingToColorSpace(_t.copy(this), t);
		let n = _t.r, r = _t.g, i = _t.b, a = Math.max(n, r, i), o = Math.min(n, r, i), s, c, l = (o + a) / 2;
		if (o === a) s = 0, c = 0;
		else {
			let e = a - o;
			switch (c = l <= .5 ? e / (a + o) : e / (2 - a - o), a) {
				case n:
					s = (r - i) / e + (r < i ? 6 : 0);
					break;
				case r:
					s = (i - n) / e + 2;
					break;
				case i: s = (n - r) / e + 4;
			}
			s /= 6;
		}
		return e.h = s, e.s = c, e.l = l, e;
	}
	getRGB(e, t = Se.workingColorSpace) {
		return Se.workingToColorSpace(_t.copy(this), t), e.r = _t.r, e.g = _t.g, e.b = _t.b, e;
	}
	getStyle(e = k) {
		Se.workingToColorSpace(_t.copy(this), e);
		let t = _t.r, n = _t.g, r = _t.b;
		return e === "srgb" ? `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(r * 255)})` : `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`;
	}
	offsetHSL(e, t, n) {
		return this.getHSL(mt), this.setHSL(mt.h + e, mt.s + t, mt.l + n);
	}
	add(e) {
		return this.r += e.r, this.g += e.g, this.b += e.b, this;
	}
	addColors(e, t) {
		return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
	}
	addScalar(e) {
		return this.r += e, this.g += e, this.b += e, this;
	}
	sub(e) {
		return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
	}
	multiply(e) {
		return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
	}
	multiplyScalar(e) {
		return this.r *= e, this.g *= e, this.b *= e, this;
	}
	lerp(e, t) {
		return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
	}
	lerpColors(e, t, n) {
		return this.r = e.r + (t.r - e.r) * n, this.g = e.g + (t.g - e.g) * n, this.b = e.b + (t.b - e.b) * n, this;
	}
	lerpHSL(e, t) {
		this.getHSL(mt), e.getHSL(ht);
		let n = fe(mt.h, ht.h, t), r = fe(mt.s, ht.s, t), i = fe(mt.l, ht.l, t);
		return this.setHSL(n, r, i), this;
	}
	setFromVector3(e) {
		return this.r = e.x, this.g = e.y, this.b = e.z, this;
	}
	applyMatrix3(e) {
		let t = this.r, n = this.g, r = this.b, i = e.elements;
		return this.r = i[0] * t + i[3] * n + i[6] * r, this.g = i[1] * t + i[4] * n + i[7] * r, this.b = i[2] * t + i[5] * n + i[8] * r, this;
	}
	equals(e) {
		return e.r === this.r && e.g === this.g && e.b === this.b;
	}
	fromArray(e, t = 0) {
		return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
	}
	toArray(e = [], t = 0) {
		return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
	}
	fromBufferAttribute(e, t) {
		return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
	}
	toJSON() {
		return this.getHex();
	}
	*[Symbol.iterator]() {
		yield this.r, yield this.g, yield this.b;
	}
}, _t = /*@__PURE__*/ new J();
J.NAMES = pt;
var vt = class e {
	constructor(e, t = 25e-5) {
		this.isFogExp2 = !0, this.name = "", this.color = new J(e), this.density = t;
	}
	clone() {
		return new e(this.color, this.density);
	}
	toJSON() {
		return {
			type: "FogExp2",
			name: this.name,
			color: this.color.getHex(),
			density: this.density
		};
	}
}, yt = class extends lt {
	constructor() {
		super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new Ke(), this.environmentIntensity = 1, this.environmentRotation = new Ke(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
	}
	copy(e, t) {
		return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return this.fog !== null && (t.object.fog = this.fog.toJSON()), t.object.backgroundBlurriness = this.backgroundBlurriness, t.object.backgroundIntensity = this.backgroundIntensity, t.object.backgroundRotation = this.backgroundRotation.toArray(), t.object.environmentIntensity = this.environmentIntensity, t.object.environmentRotation = this.environmentRotation.toArray(), t;
	}
}, bt = /*@__PURE__*/ new W(), xt = /*@__PURE__*/ new W(), St = /*@__PURE__*/ new W(), Ct = /*@__PURE__*/ new W(), wt = /*@__PURE__*/ new W(), Tt = /*@__PURE__*/ new W(), Et = /*@__PURE__*/ new W(), Dt = /*@__PURE__*/ new W(), Ot = /*@__PURE__*/ new W(), kt = /*@__PURE__*/ new W(), At = /*@__PURE__*/ new Me(), jt = /*@__PURE__*/ new Me(), Mt = /*@__PURE__*/ new Me(), Nt = class e {
	constructor(e = new W(), t = new W(), n = new W()) {
		this.a = e, this.b = t, this.c = n;
	}
	static getNormal(e, t, n, r) {
		r.subVectors(n, t), bt.subVectors(e, t), r.cross(bt);
		let i = r.lengthSq();
		return i > 0 ? r.multiplyScalar(1 / Math.sqrt(i)) : r.set(0, 0, 0);
	}
	static getBarycoord(e, t, n, r, i) {
		bt.subVectors(r, t), xt.subVectors(n, t), St.subVectors(e, t);
		let a = bt.dot(bt), o = bt.dot(xt), s = bt.dot(St), c = xt.dot(xt), l = xt.dot(St), u = a * c - o * o;
		if (u === 0) return i.set(0, 0, 0), null;
		let d = 1 / u, f = (c * s - o * l) * d, p = (a * l - o * s) * d;
		return i.set(1 - f - p, p, f);
	}
	static containsPoint(e, t, n, r) {
		return this.getBarycoord(e, t, n, r, Ct) !== null && Ct.x >= 0 && Ct.y >= 0 && Ct.x + Ct.y <= 1;
	}
	static getInterpolation(e, t, n, r, i, a, o, s) {
		return this.getBarycoord(e, t, n, r, Ct) === null ? (s.x = 0, s.y = 0, "z" in s && (s.z = 0), "w" in s && (s.w = 0), null) : (s.setScalar(0), s.addScaledVector(i, Ct.x), s.addScaledVector(a, Ct.y), s.addScaledVector(o, Ct.z), s);
	}
	static getInterpolatedAttribute(e, t, n, r, i, a) {
		return At.setScalar(0), jt.setScalar(0), Mt.setScalar(0), At.fromBufferAttribute(e, t), jt.fromBufferAttribute(e, n), Mt.fromBufferAttribute(e, r), a.setScalar(0), a.addScaledVector(At, i.x), a.addScaledVector(jt, i.y), a.addScaledVector(Mt, i.z), a;
	}
	static isFrontFacing(e, t, n, r) {
		return bt.subVectors(n, t), xt.subVectors(e, t), bt.cross(xt).dot(r) < 0;
	}
	set(e, t, n) {
		return this.a.copy(e), this.b.copy(t), this.c.copy(n), this;
	}
	setFromPointsAndIndices(e, t, n, r) {
		return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[r]), this;
	}
	setFromAttributeAndIndices(e, t, n, r) {
		return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, n), this.c.fromBufferAttribute(e, r), this;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
	}
	getArea() {
		return bt.subVectors(this.c, this.b), xt.subVectors(this.a, this.b), bt.cross(xt).length() * .5;
	}
	getMidpoint(e) {
		return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
	}
	getNormal(t) {
		return e.getNormal(this.a, this.b, this.c, t);
	}
	getPlane(e) {
		return e.setFromCoplanarPoints(this.a, this.b, this.c);
	}
	getBarycoord(t, n) {
		return e.getBarycoord(t, this.a, this.b, this.c, n);
	}
	getInterpolation(t, n, r, i, a) {
		return e.getInterpolation(t, this.a, this.b, this.c, n, r, i, a);
	}
	containsPoint(t) {
		return e.containsPoint(t, this.a, this.b, this.c);
	}
	isFrontFacing(t) {
		return e.isFrontFacing(this.a, this.b, this.c, t);
	}
	intersectsBox(e) {
		return e.intersectsTriangle(this);
	}
	closestPointToPoint(e, t) {
		let n = this.a, r = this.b, i = this.c, a, o;
		wt.subVectors(r, n), Tt.subVectors(i, n), Dt.subVectors(e, n);
		let s = wt.dot(Dt), c = Tt.dot(Dt);
		if (s <= 0 && c <= 0) return t.copy(n);
		Ot.subVectors(e, r);
		let l = wt.dot(Ot), u = Tt.dot(Ot);
		if (l >= 0 && u <= l) return t.copy(r);
		let d = s * u - l * c;
		if (d <= 0 && s >= 0 && l <= 0) return a = s / (s - l), t.copy(n).addScaledVector(wt, a);
		kt.subVectors(e, i);
		let f = wt.dot(kt), p = Tt.dot(kt);
		if (p >= 0 && f <= p) return t.copy(i);
		let m = f * c - s * p;
		if (m <= 0 && c >= 0 && p <= 0) return o = c / (c - p), t.copy(n).addScaledVector(Tt, o);
		let h = l * p - f * u;
		if (h <= 0 && u - l >= 0 && f - p >= 0) return Et.subVectors(i, r), o = (u - l) / (u - l + (f - p)), t.copy(r).addScaledVector(Et, o);
		let g = 1 / (h + m + d);
		return a = m * g, o = d * g, t.copy(n).addScaledVector(wt, a).addScaledVector(Tt, o);
	}
	equals(e) {
		return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
	}
}, Pt = class {
	constructor(e = new W(Infinity, Infinity, Infinity), t = new W(-Infinity, -Infinity, -Infinity)) {
		this.isBox3 = !0, this.min = e, this.max = t;
	}
	set(e, t) {
		return this.min.copy(e), this.max.copy(t), this;
	}
	setFromArray(e) {
		this.makeEmpty();
		for (let t = 0, n = e.length; t < n; t += 3) this.expandByPoint(It.fromArray(e, t));
		return this;
	}
	setFromBufferAttribute(e) {
		this.makeEmpty();
		for (let t = 0, n = e.count; t < n; t++) this.expandByPoint(It.fromBufferAttribute(e, t));
		return this;
	}
	setFromPoints(e) {
		this.makeEmpty();
		for (let t = 0, n = e.length; t < n; t++) this.expandByPoint(e[t]);
		return this;
	}
	setFromCenterAndSize(e, t) {
		let n = It.copy(t).multiplyScalar(.5);
		return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
	}
	setFromObject(e, t = !1) {
		return this.makeEmpty(), this.expandByObject(e, t);
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return this.min.copy(e.min), this.max.copy(e.max), this;
	}
	makeEmpty() {
		return this.min.x = this.min.y = this.min.z = Infinity, this.max.x = this.max.y = this.max.z = -Infinity, this;
	}
	isEmpty() {
		return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
	}
	getCenter(e) {
		return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(.5);
	}
	getSize(e) {
		return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
	}
	expandByPoint(e) {
		return this.min.min(e), this.max.max(e), this;
	}
	expandByVector(e) {
		return this.min.sub(e), this.max.add(e), this;
	}
	expandByScalar(e) {
		return this.min.addScalar(-e), this.max.addScalar(e), this;
	}
	expandByObject(e, t = !1) {
		e.updateWorldMatrix(!1, !1);
		let n = e.geometry;
		if (n !== void 0) {
			let r = n.getAttribute("position");
			if (t === !0 && r !== void 0 && e.isInstancedMesh !== !0) for (let t = 0, n = r.count; t < n; t++) e.isMesh === !0 ? e.getVertexPosition(t, It) : It.fromBufferAttribute(r, t), It.applyMatrix4(e.matrixWorld), this.expandByPoint(It);
			else e.boundingBox === void 0 ? (n.boundingBox === null && n.computeBoundingBox(), Lt.copy(n.boundingBox)) : (e.boundingBox === null && e.computeBoundingBox(), Lt.copy(e.boundingBox)), Lt.applyMatrix4(e.matrixWorld), this.union(Lt);
		}
		let r = e.children;
		for (let e = 0, n = r.length; e < n; e++) this.expandByObject(r[e], t);
		return this;
	}
	containsPoint(e) {
		return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z;
	}
	containsBox(e) {
		return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
	}
	getParameter(e, t) {
		return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z));
	}
	intersectsBox(e) {
		return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z;
	}
	intersectsSphere(e) {
		return this.clampPoint(e.center, It), It.distanceToSquared(e.center) <= e.radius * e.radius;
	}
	intersectsPlane(e) {
		let t, n;
		return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant;
	}
	intersectsTriangle(e) {
		if (this.isEmpty()) return !1;
		this.getCenter(Wt), Gt.subVectors(this.max, Wt), Rt.subVectors(e.a, Wt), zt.subVectors(e.b, Wt), Bt.subVectors(e.c, Wt), Vt.subVectors(zt, Rt), Ht.subVectors(Bt, zt), Ut.subVectors(Rt, Bt);
		let t = [
			0,
			-Vt.z,
			Vt.y,
			0,
			-Ht.z,
			Ht.y,
			0,
			-Ut.z,
			Ut.y,
			Vt.z,
			0,
			-Vt.x,
			Ht.z,
			0,
			-Ht.x,
			Ut.z,
			0,
			-Ut.x,
			-Vt.y,
			Vt.x,
			0,
			-Ht.y,
			Ht.x,
			0,
			-Ut.y,
			Ut.x,
			0
		];
		return !Jt(t, Rt, zt, Bt, Gt) || (t = [
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			1
		], !Jt(t, Rt, zt, Bt, Gt)) ? !1 : (Kt.crossVectors(Vt, Ht), t = [
			Kt.x,
			Kt.y,
			Kt.z
		], Jt(t, Rt, zt, Bt, Gt));
	}
	clampPoint(e, t) {
		return t.copy(e).clamp(this.min, this.max);
	}
	distanceToPoint(e) {
		return this.clampPoint(e, It).distanceTo(e);
	}
	getBoundingSphere(e) {
		return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(It).length() * .5), e;
	}
	intersect(e) {
		return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
	}
	union(e) {
		return this.min.min(e.min), this.max.max(e.max), this;
	}
	applyMatrix4(e) {
		return this.isEmpty() ? this : (Ft[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), Ft[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), Ft[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), Ft[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), Ft[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), Ft[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), Ft[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), Ft[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(Ft), this);
	}
	translate(e) {
		return this.min.add(e), this.max.add(e), this;
	}
	equals(e) {
		return e.min.equals(this.min) && e.max.equals(this.max);
	}
	toJSON() {
		return {
			min: this.min.toArray(),
			max: this.max.toArray()
		};
	}
	fromJSON(e) {
		return this.min.fromArray(e.min), this.max.fromArray(e.max), this;
	}
}, Ft = [
	/*@__PURE__*/ new W(),
	/*@__PURE__*/ new W(),
	/*@__PURE__*/ new W(),
	/*@__PURE__*/ new W(),
	/*@__PURE__*/ new W(),
	/*@__PURE__*/ new W(),
	/*@__PURE__*/ new W(),
	/*@__PURE__*/ new W()
], It = /*@__PURE__*/ new W(), Lt = /*@__PURE__*/ new Pt(), Rt = /*@__PURE__*/ new W(), zt = /*@__PURE__*/ new W(), Bt = /*@__PURE__*/ new W(), Vt = /*@__PURE__*/ new W(), Ht = /*@__PURE__*/ new W(), Ut = /*@__PURE__*/ new W(), Wt = /*@__PURE__*/ new W(), Gt = /*@__PURE__*/ new W(), Kt = /*@__PURE__*/ new W(), qt = /*@__PURE__*/ new W();
function Jt(e, t, n, r, i) {
	for (let a = 0, o = e.length - 3; a <= o; a += 3) {
		qt.fromArray(e, a);
		let o = i.x * Math.abs(qt.x) + i.y * Math.abs(qt.y) + i.z * Math.abs(qt.z), s = t.dot(qt), c = n.dot(qt), l = r.dot(qt);
		if (Math.max(-Math.max(s, c, l), Math.min(s, c, l)) > o) return !1;
	}
	return !0;
}
var Yt = /*@__PURE__*/ new W(), Xt = /*@__PURE__*/ new U(), Zt = 0, Qt = class extends oe {
	constructor(e, t, n = !1) {
		if (super(), Array.isArray(e)) throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");
		this.isBufferAttribute = !0, Object.defineProperty(this, "id", { value: Zt++ }), this.name = "", this.array = e, this.itemSize = t, this.count = e === void 0 ? 0 : e.length / t, this.normalized = n, this.usage = P, this.updateRanges = [], this.gpuType = l, this.version = 0;
	}
	onUploadCallback() {}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
	setUsage(e) {
		return this.usage = e, this;
	}
	addUpdateRange(e, t) {
		this.updateRanges.push({
			start: e,
			count: t
		});
	}
	clearUpdateRanges() {
		this.updateRanges.length = 0;
	}
	copy(e) {
		return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this;
	}
	copyAt(e, t, n) {
		e *= this.itemSize, n *= t.itemSize;
		for (let r = 0, i = this.itemSize; r < i; r++) this.array[e + r] = t.array[n + r];
		return this;
	}
	copyArray(e) {
		return this.array.set(e), this;
	}
	applyMatrix3(e) {
		if (this.itemSize === 2) for (let t = 0, n = this.count; t < n; t++) Xt.fromBufferAttribute(this, t), Xt.applyMatrix3(e), this.setXY(t, Xt.x, Xt.y);
		else if (this.itemSize === 3) for (let t = 0, n = this.count; t < n; t++) Yt.fromBufferAttribute(this, t), Yt.applyMatrix3(e), this.setXYZ(t, Yt.x, Yt.y, Yt.z);
		return this;
	}
	applyMatrix4(e) {
		for (let t = 0, n = this.count; t < n; t++) Yt.fromBufferAttribute(this, t), Yt.applyMatrix4(e), this.setXYZ(t, Yt.x, Yt.y, Yt.z);
		return this;
	}
	applyNormalMatrix(e) {
		for (let t = 0, n = this.count; t < n; t++) Yt.fromBufferAttribute(this, t), Yt.applyNormalMatrix(e), this.setXYZ(t, Yt.x, Yt.y, Yt.z);
		return this;
	}
	transformDirection(e) {
		for (let t = 0, n = this.count; t < n; t++) Yt.fromBufferAttribute(this, t), Yt.transformDirection(e), this.setXYZ(t, Yt.x, Yt.y, Yt.z);
		return this;
	}
	set(e, t = 0) {
		return this.array.set(e, t), this;
	}
	getComponent(e, t) {
		let n = this.array[e * this.itemSize + t];
		return this.normalized && (n = pe(n, this.array)), n;
	}
	setComponent(e, t, n) {
		return this.normalized && (n = me(n, this.array)), this.array[e * this.itemSize + t] = n, this;
	}
	getX(e) {
		let t = this.array[e * this.itemSize];
		return this.normalized && (t = pe(t, this.array)), t;
	}
	setX(e, t) {
		return this.normalized && (t = me(t, this.array)), this.array[e * this.itemSize] = t, this;
	}
	getY(e) {
		let t = this.array[e * this.itemSize + 1];
		return this.normalized && (t = pe(t, this.array)), t;
	}
	setY(e, t) {
		return this.normalized && (t = me(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
	}
	getZ(e) {
		let t = this.array[e * this.itemSize + 2];
		return this.normalized && (t = pe(t, this.array)), t;
	}
	setZ(e, t) {
		return this.normalized && (t = me(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
	}
	getW(e) {
		let t = this.array[e * this.itemSize + 3];
		return this.normalized && (t = pe(t, this.array)), t;
	}
	setW(e, t) {
		return this.normalized && (t = me(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
	}
	setXY(e, t, n) {
		return e *= this.itemSize, this.normalized && (t = me(t, this.array), n = me(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this;
	}
	setXYZ(e, t, n, r) {
		return e *= this.itemSize, this.normalized && (t = me(t, this.array), n = me(n, this.array), r = me(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this;
	}
	setXYZW(e, t, n, r, i) {
		return e *= this.itemSize, this.normalized && (t = me(t, this.array), n = me(n, this.array), r = me(r, this.array), i = me(i, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this.array[e + 3] = i, this;
	}
	onUpload(e) {
		return this.onUploadCallback = e, this;
	}
	clone() {
		return new this.constructor(this.array, this.itemSize).copy(this);
	}
	toJSON() {
		let e = {
			itemSize: this.itemSize,
			type: this.array.constructor.name,
			array: Array.from(this.array),
			normalized: this.normalized
		};
		return e.name = this.name, e.usage = this.usage, e.gpuType = this.gpuType, e;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
}, $t = class extends Qt {
	constructor(e, t, n) {
		super(new Uint16Array(e), t, n);
	}
}, en = class extends Qt {
	constructor(e, t, n) {
		super(new Uint32Array(e), t, n);
	}
}, Y = class extends Qt {
	constructor(e, t, n) {
		super(new Float32Array(e), t, n);
	}
}, tn = /*@__PURE__*/ new Pt(), nn = /*@__PURE__*/ new W(), rn = /*@__PURE__*/ new W(), an = class {
	constructor(e = new W(), t = -1) {
		this.isSphere = !0, this.center = e, this.radius = t;
	}
	set(e, t) {
		return this.center.copy(e), this.radius = t, this;
	}
	setFromPoints(e, t) {
		let n = this.center;
		t === void 0 ? tn.setFromPoints(e).getCenter(n) : n.copy(t);
		let r = 0;
		for (let t = 0, i = e.length; t < i; t++) r = Math.max(r, n.distanceToSquared(e[t]));
		return this.radius = Math.sqrt(r), this;
	}
	copy(e) {
		return this.center.copy(e.center), this.radius = e.radius, this;
	}
	isEmpty() {
		return this.radius < 0;
	}
	makeEmpty() {
		return this.center.set(0, 0, 0), this.radius = -1, this;
	}
	containsPoint(e) {
		return e.distanceToSquared(this.center) <= this.radius * this.radius;
	}
	distanceToPoint(e) {
		return e.distanceTo(this.center) - this.radius;
	}
	intersectsSphere(e) {
		let t = this.radius + e.radius;
		return e.center.distanceToSquared(this.center) <= t * t;
	}
	intersectsBox(e) {
		return e.intersectsSphere(this);
	}
	intersectsPlane(e) {
		return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
	}
	clampPoint(e, t) {
		let n = this.center.distanceToSquared(e);
		return t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
	}
	getBoundingBox(e) {
		return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
	}
	applyMatrix4(e) {
		return this.center.applyMatrix4(e), this.radius *= e.getMaxScaleOnAxis(), this;
	}
	translate(e) {
		return this.center.add(e), this;
	}
	expandByPoint(e) {
		if (this.isEmpty()) return this.center.copy(e), this.radius = 0, this;
		nn.subVectors(e, this.center);
		let t = nn.lengthSq();
		if (t > this.radius * this.radius) {
			let e = Math.sqrt(t), n = (e - this.radius) * .5;
			this.center.addScaledVector(nn, n / e), this.radius += n;
		}
		return this;
	}
	union(e) {
		return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (rn.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(nn.copy(e.center).add(rn)), this.expandByPoint(nn.copy(e.center).sub(rn))), this);
	}
	equals(e) {
		return e.center.equals(this.center) && e.radius === this.radius;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	toJSON() {
		return {
			radius: this.radius,
			center: this.center.toArray()
		};
	}
	fromJSON(e) {
		return this.radius = e.radius, this.center.fromArray(e.center), this;
	}
}, on = 0, sn = /*@__PURE__*/ new Le(), cn = /*@__PURE__*/ new lt(), ln = /*@__PURE__*/ new W(), un = /*@__PURE__*/ new Pt(), dn = /*@__PURE__*/ new Pt(), fn = /*@__PURE__*/ new W(), pn = class e extends oe {
	constructor() {
		super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: on++ }), this.uuid = ue(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.indirectOffset = 0, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
			start: 0,
			count: Infinity
		}, this.userData = {}, this._transformed = !1;
	}
	getIndex() {
		return this.index;
	}
	setIndex(e) {
		return this.index = Array.isArray(e) ? new (I(e) ? en : $t)(e, 1) : e, this;
	}
	setIndirect(e, t = 0) {
		return this.indirect = e, this.indirectOffset = t, this;
	}
	getIndirect() {
		return this.indirect;
	}
	getAttribute(e) {
		return this.attributes[e];
	}
	setAttribute(e, t) {
		return this.attributes[e] = t, this;
	}
	deleteAttribute(e) {
		return delete this.attributes[e], this;
	}
	hasAttribute(e) {
		return this.attributes[e] !== void 0;
	}
	addGroup(e, t, n = 0) {
		this.groups.push({
			start: e,
			count: t,
			materialIndex: n
		});
	}
	clearGroups() {
		this.groups = [];
	}
	setDrawRange(e, t) {
		this.drawRange.start = e, this.drawRange.count = t;
	}
	applyMatrix4(e) {
		let t = this.attributes.position;
		t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = !0);
		let n = this.attributes.normal;
		if (n !== void 0) {
			let t = new G().getNormalMatrix(e);
			n.applyNormalMatrix(t), n.needsUpdate = !0;
		}
		let r = this.attributes.tangent;
		return r !== void 0 && (r.transformDirection(e), r.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this._transformed = !0, this;
	}
	applyQuaternion(e) {
		return sn.makeRotationFromQuaternion(e), this.applyMatrix4(sn), this;
	}
	rotateX(e) {
		return sn.makeRotationX(e), this.applyMatrix4(sn), this;
	}
	rotateY(e) {
		return sn.makeRotationY(e), this.applyMatrix4(sn), this;
	}
	rotateZ(e) {
		return sn.makeRotationZ(e), this.applyMatrix4(sn), this;
	}
	translate(e, t, n) {
		return sn.makeTranslation(e, t, n), this.applyMatrix4(sn), this;
	}
	scale(e, t, n) {
		return sn.makeScale(e, t, n), this.applyMatrix4(sn), this;
	}
	lookAt(e) {
		return cn.lookAt(e), cn.updateMatrix(), this.applyMatrix4(cn.matrix), this;
	}
	center() {
		return this.computeBoundingBox(), this.boundingBox.getCenter(ln).negate(), this.translate(ln.x, ln.y, ln.z), this;
	}
	setFromPoints(e) {
		let t = this.getAttribute("position");
		if (t === void 0) {
			let t = [];
			for (let n = 0, r = e.length; n < r; n++) {
				let r = e[n];
				t.push(r.x, r.y, r.z || 0);
			}
			this.setAttribute("position", new Y(t, 3));
		} else {
			let n = Math.min(e.length, t.count);
			for (let r = 0; r < n; r++) {
				let n = e[r];
				t.setXYZ(r, n.x, n.y, n.z || 0);
			}
			e.length > t.count && z("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), t.needsUpdate = !0;
		}
		return this;
	}
	computeBoundingBox() {
		this.boundingBox === null && (this.boundingBox = new Pt());
		let e = this.attributes.position, t = this.morphAttributes.position;
		if (e && e.isGLBufferAttribute) {
			B("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(new W(-Infinity, -Infinity, -Infinity), new W(Infinity, Infinity, Infinity));
			return;
		}
		if (e !== void 0) {
			if (this.boundingBox.setFromBufferAttribute(e), t) for (let e = 0, n = t.length; e < n; e++) {
				let n = t[e];
				un.setFromBufferAttribute(n), this.morphTargetsRelative ? (fn.addVectors(this.boundingBox.min, un.min), this.boundingBox.expandByPoint(fn), fn.addVectors(this.boundingBox.max, un.max), this.boundingBox.expandByPoint(fn)) : (this.boundingBox.expandByPoint(un.min), this.boundingBox.expandByPoint(un.max));
			}
		} else this.boundingBox.makeEmpty();
		(isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && B("BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The \"position\" attribute is likely to have NaN values.", this);
	}
	computeBoundingSphere() {
		this.boundingSphere === null && (this.boundingSphere = new an());
		let e = this.attributes.position, t = this.morphAttributes.position;
		if (e && e.isGLBufferAttribute) {
			B("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new W(), Infinity);
			return;
		}
		if (e) {
			let n = this.boundingSphere.center;
			if (un.setFromBufferAttribute(e), t) for (let e = 0, n = t.length; e < n; e++) {
				let n = t[e];
				dn.setFromBufferAttribute(n), this.morphTargetsRelative ? (fn.addVectors(un.min, dn.min), un.expandByPoint(fn), fn.addVectors(un.max, dn.max), un.expandByPoint(fn)) : (un.expandByPoint(dn.min), un.expandByPoint(dn.max));
			}
			un.getCenter(n);
			let r = 0;
			for (let t = 0, i = e.count; t < i; t++) fn.fromBufferAttribute(e, t), r = Math.max(r, n.distanceToSquared(fn));
			if (t) for (let i = 0, a = t.length; i < a; i++) {
				let a = t[i], o = this.morphTargetsRelative;
				for (let t = 0, i = a.count; t < i; t++) fn.fromBufferAttribute(a, t), o && (ln.fromBufferAttribute(e, t), fn.add(ln)), r = Math.max(r, n.distanceToSquared(fn));
			}
			this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && B("BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The \"position\" attribute is likely to have NaN values.", this);
		}
	}
	computeTangents() {
		let e = this.index, t = this.attributes;
		if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) {
			B("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
			return;
		}
		let n = t.position, r = t.normal, i = t.uv, a = this.getAttribute("tangent");
		(a === void 0 || a.count !== n.count) && (a = new Qt(new Float32Array(4 * n.count), 4), this.setAttribute("tangent", a));
		let o = [], s = [];
		for (let e = 0; e < n.count; e++) o[e] = new W(), s[e] = new W();
		let c = new W(), l = new W(), u = new W(), d = new U(), f = new U(), p = new U(), m = new W(), h = new W();
		function g(e, t, r) {
			c.fromBufferAttribute(n, e), l.fromBufferAttribute(n, t), u.fromBufferAttribute(n, r), d.fromBufferAttribute(i, e), f.fromBufferAttribute(i, t), p.fromBufferAttribute(i, r), l.sub(c), u.sub(c), f.sub(d), p.sub(d);
			let a = 1 / (f.x * p.y - p.x * f.y);
			isFinite(a) && (m.copy(l).multiplyScalar(p.y).addScaledVector(u, -f.y).multiplyScalar(a), h.copy(u).multiplyScalar(f.x).addScaledVector(l, -p.x).multiplyScalar(a), o[e].add(m), o[t].add(m), o[r].add(m), s[e].add(h), s[t].add(h), s[r].add(h));
		}
		let _ = this.groups;
		_.length === 0 && (_ = [{
			start: 0,
			count: e.count
		}]);
		for (let t = 0, n = _.length; t < n; ++t) {
			let n = _[t], r = n.start, i = n.count;
			for (let t = r, n = r + i; t < n; t += 3) g(e.getX(t + 0), e.getX(t + 1), e.getX(t + 2));
		}
		let v = new W(), y = new W(), b = new W(), x = new W();
		function S(e) {
			b.fromBufferAttribute(r, e), x.copy(b);
			let t = o[e];
			v.copy(t), v.sub(b.multiplyScalar(b.dot(t))).normalize(), y.crossVectors(x, t);
			let n = y.dot(s[e]) < 0 ? -1 : 1;
			a.setXYZW(e, v.x, v.y, v.z, n);
		}
		for (let t = 0, n = _.length; t < n; ++t) {
			let n = _[t], r = n.start, i = n.count;
			for (let t = r, n = r + i; t < n; t += 3) S(e.getX(t + 0)), S(e.getX(t + 1)), S(e.getX(t + 2));
		}
		this._transformed = !0;
	}
	computeVertexNormals() {
		let e = this.index, t = this.getAttribute("position");
		if (t !== void 0) {
			let n = this.getAttribute("normal");
			if (n === void 0 || n.count !== t.count) n = new Qt(new Float32Array(t.count * 3), 3), this.setAttribute("normal", n);
			else for (let e = 0, t = n.count; e < t; e++) n.setXYZ(e, 0, 0, 0);
			let r = new W(), i = new W(), a = new W(), o = new W(), s = new W(), c = new W(), l = new W(), u = new W();
			if (e) for (let d = 0, f = e.count; d < f; d += 3) {
				let f = e.getX(d + 0), p = e.getX(d + 1), m = e.getX(d + 2);
				r.fromBufferAttribute(t, f), i.fromBufferAttribute(t, p), a.fromBufferAttribute(t, m), l.subVectors(a, i), u.subVectors(r, i), l.cross(u), o.fromBufferAttribute(n, f), s.fromBufferAttribute(n, p), c.fromBufferAttribute(n, m), o.add(l), s.add(l), c.add(l), n.setXYZ(f, o.x, o.y, o.z), n.setXYZ(p, s.x, s.y, s.z), n.setXYZ(m, c.x, c.y, c.z);
			}
			else for (let e = 0, o = t.count; e < o; e += 3) r.fromBufferAttribute(t, e + 0), i.fromBufferAttribute(t, e + 1), a.fromBufferAttribute(t, e + 2), l.subVectors(a, i), u.subVectors(r, i), l.cross(u), n.setXYZ(e + 0, l.x, l.y, l.z), n.setXYZ(e + 1, l.x, l.y, l.z), n.setXYZ(e + 2, l.x, l.y, l.z);
			this.normalizeNormals(), n.needsUpdate = !0;
		}
	}
	normalizeNormals() {
		let e = this.attributes.normal;
		for (let t = 0, n = e.count; t < n; t++) fn.fromBufferAttribute(e, t), fn.normalize(), e.setXYZ(t, fn.x, fn.y, fn.z);
	}
	toNonIndexed() {
		function t(e, t) {
			let n = e.array, r = e.itemSize, i = e.normalized, a = new n.constructor(t.length * r), o = 0, s = 0;
			for (let i = 0, c = t.length; i < c; i++) {
				o = e.isInterleavedBufferAttribute ? t[i] * e.data.stride + e.offset : t[i] * r;
				for (let e = 0; e < r; e++) a[s++] = n[o++];
			}
			return new Qt(a, r, i);
		}
		if (this.index === null) return z("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
		let n = new e(), r = this.index.array, i = this.attributes;
		for (let e in i) {
			let a = i[e], o = t(a, r);
			n.setAttribute(e, o);
		}
		let a = this.morphAttributes;
		for (let e in a) {
			let i = [], o = a[e];
			for (let e = 0, n = o.length; e < n; e++) {
				let n = o[e], a = t(n, r);
				i.push(a);
			}
			n.morphAttributes[e] = i;
		}
		n.morphTargetsRelative = this.morphTargetsRelative;
		let o = this.groups;
		for (let e = 0, t = o.length; e < t; e++) {
			let t = o[e];
			n.addGroup(t.start, t.count, t.materialIndex);
		}
		return n;
	}
	toJSON() {
		let e = { metadata: {
			version: 4.7,
			type: "BufferGeometry",
			generator: "BufferGeometry.toJSON"
		} };
		if (e.uuid = this.uuid, e.type = this.parameters !== void 0 && this._transformed === !0 ? "BufferGeometry" : this.type, e.name = this.name, Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0 && this._transformed !== !0) {
			let t = this.parameters;
			for (let n in t) t[n] !== void 0 && (e[n] = t[n]);
			return e;
		}
		e.data = { attributes: {} };
		let t = this.index;
		t !== null && (e.data.index = {
			type: t.array.constructor.name,
			array: Array.prototype.slice.call(t.array)
		});
		let n = this.attributes;
		for (let t in n) {
			let r = n[t];
			e.data.attributes[t] = r.toJSON(e.data);
		}
		let r = {}, i = !1;
		for (let t in this.morphAttributes) {
			let n = this.morphAttributes[t], a = [];
			for (let t = 0, r = n.length; t < r; t++) {
				let r = n[t];
				a.push(r.toJSON(e.data));
			}
			a.length > 0 && (r[t] = a, i = !0);
		}
		i && (e.data.morphAttributes = r, e.data.morphTargetsRelative = this.morphTargetsRelative);
		let a = this.groups;
		a.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(a)));
		let o = this.boundingSphere;
		return o !== null && (e.data.boundingSphere = o.toJSON()), e;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
		let t = {};
		this.name = e.name;
		let n = e.index;
		n !== null && this.setIndex(n.clone());
		let r = e.attributes;
		for (let e in r) {
			let n = r[e];
			this.setAttribute(e, n.clone(t));
		}
		let i = e.morphAttributes;
		for (let e in i) {
			let n = [], r = i[e];
			for (let e = 0, i = r.length; e < i; e++) n.push(r[e].clone(t));
			this.morphAttributes[e] = n;
		}
		this.morphTargetsRelative = e.morphTargetsRelative;
		let a = e.groups;
		for (let e = 0, t = a.length; e < t; e++) {
			let t = a[e];
			this.addGroup(t.start, t.count, t.materialIndex);
		}
		let o = e.boundingBox;
		o !== null && (this.boundingBox = o.clone());
		let s = e.boundingSphere;
		return s !== null && (this.boundingSphere = s.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this._transformed = e._transformed, this;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
}, mn = class {
	constructor(e, t) {
		this.isInterleavedBuffer = !0, this.array = e, this.stride = t, this.count = e === void 0 ? 0 : e.length / t, this.usage = P, this.updateRanges = [], this.version = 0, this.uuid = ue();
	}
	onUploadCallback() {}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
	setUsage(e) {
		return this.usage = e, this;
	}
	addUpdateRange(e, t) {
		this.updateRanges.push({
			start: e,
			count: t
		});
	}
	clearUpdateRanges() {
		this.updateRanges.length = 0;
	}
	copy(e) {
		return this.array = new e.array.constructor(e.array), this.count = e.count, this.stride = e.stride, this.usage = e.usage, this;
	}
	copyAt(e, t, n) {
		e *= this.stride, n *= t.stride;
		for (let r = 0, i = this.stride; r < i; r++) this.array[e + r] = t.array[n + r];
		return this;
	}
	set(e, t = 0) {
		return this.array.set(e, t), this;
	}
	clone(e) {
		e.arrayBuffers === void 0 && (e.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = ue()), e.arrayBuffers[this.array.buffer._uuid] === void 0 && (e.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer);
		let t = new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]), n = new this.constructor(t, this.stride);
		return n.setUsage(this.usage), n;
	}
	onUpload(e) {
		return this.onUploadCallback = e, this;
	}
	toJSON(e) {
		e.arrayBuffers === void 0 && (e.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = ue()), e.arrayBuffers[this.array.buffer._uuid] === void 0 && (e.arrayBuffers[this.array.buffer._uuid] = Array.from(new Uint32Array(this.array.buffer)));
		let t = {
			uuid: this.uuid,
			buffer: this.array.buffer._uuid,
			type: this.array.constructor.name,
			stride: this.stride
		};
		return t.usage = this.usage, t;
	}
}, hn = /*@__PURE__*/ new W(), gn = class e {
	constructor(e, t, n, r = !1) {
		this.isInterleavedBufferAttribute = !0, this.name = "", this.data = e, this.itemSize = t, this.offset = n, this.normalized = r;
	}
	get count() {
		return this.data.count;
	}
	get array() {
		return this.data.array;
	}
	set needsUpdate(e) {
		this.data.needsUpdate = e;
	}
	applyMatrix4(e) {
		for (let t = 0, n = this.data.count; t < n; t++) hn.fromBufferAttribute(this, t), hn.applyMatrix4(e), this.setXYZ(t, hn.x, hn.y, hn.z);
		return this;
	}
	applyNormalMatrix(e) {
		for (let t = 0, n = this.count; t < n; t++) hn.fromBufferAttribute(this, t), hn.applyNormalMatrix(e), this.setXYZ(t, hn.x, hn.y, hn.z);
		return this;
	}
	transformDirection(e) {
		for (let t = 0, n = this.count; t < n; t++) hn.fromBufferAttribute(this, t), hn.transformDirection(e), this.setXYZ(t, hn.x, hn.y, hn.z);
		return this;
	}
	getComponent(e, t) {
		let n = this.array[e * this.data.stride + this.offset + t];
		return this.normalized && (n = pe(n, this.array)), n;
	}
	setComponent(e, t, n) {
		return this.normalized && (n = me(n, this.array)), this.data.array[e * this.data.stride + this.offset + t] = n, this;
	}
	setX(e, t) {
		return this.normalized && (t = me(t, this.array)), this.data.array[e * this.data.stride + this.offset] = t, this;
	}
	setY(e, t) {
		return this.normalized && (t = me(t, this.array)), this.data.array[e * this.data.stride + this.offset + 1] = t, this;
	}
	setZ(e, t) {
		return this.normalized && (t = me(t, this.array)), this.data.array[e * this.data.stride + this.offset + 2] = t, this;
	}
	setW(e, t) {
		return this.normalized && (t = me(t, this.array)), this.data.array[e * this.data.stride + this.offset + 3] = t, this;
	}
	getX(e) {
		let t = this.data.array[e * this.data.stride + this.offset];
		return this.normalized && (t = pe(t, this.array)), t;
	}
	getY(e) {
		let t = this.data.array[e * this.data.stride + this.offset + 1];
		return this.normalized && (t = pe(t, this.array)), t;
	}
	getZ(e) {
		let t = this.data.array[e * this.data.stride + this.offset + 2];
		return this.normalized && (t = pe(t, this.array)), t;
	}
	getW(e) {
		let t = this.data.array[e * this.data.stride + this.offset + 3];
		return this.normalized && (t = pe(t, this.array)), t;
	}
	setXY(e, t, n) {
		return e = e * this.data.stride + this.offset, this.normalized && (t = me(t, this.array), n = me(n, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this;
	}
	setXYZ(e, t, n, r) {
		return e = e * this.data.stride + this.offset, this.normalized && (t = me(t, this.array), n = me(n, this.array), r = me(r, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = r, this;
	}
	setXYZW(e, t, n, r, i) {
		return e = e * this.data.stride + this.offset, this.normalized && (t = me(t, this.array), n = me(n, this.array), r = me(r, this.array), i = me(i, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = r, this.data.array[e + 3] = i, this;
	}
	clone(t) {
		if (t === void 0) {
			re("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");
			let e = [];
			for (let t = 0; t < this.count; t++) {
				let n = t * this.data.stride + this.offset;
				for (let t = 0; t < this.itemSize; t++) e.push(this.data.array[n + t]);
			}
			return new Qt(new this.array.constructor(e), this.itemSize, this.normalized);
		}
		return t.interleavedBuffers === void 0 && (t.interleavedBuffers = {}), t.interleavedBuffers[this.data.uuid] === void 0 && (t.interleavedBuffers[this.data.uuid] = this.data.clone(t)), new e(t.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized);
	}
	toJSON(e) {
		if (e === void 0) {
			re("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");
			let e = [];
			for (let t = 0; t < this.count; t++) {
				let n = t * this.data.stride + this.offset;
				for (let t = 0; t < this.itemSize; t++) e.push(this.data.array[n + t]);
			}
			return {
				itemSize: this.itemSize,
				type: this.array.constructor.name,
				array: e,
				normalized: this.normalized
			};
		}
		return e.interleavedBuffers === void 0 && (e.interleavedBuffers = {}), e.interleavedBuffers[this.data.uuid] === void 0 && (e.interleavedBuffers[this.data.uuid] = this.data.toJSON(e)), {
			isInterleavedBufferAttribute: !0,
			itemSize: this.itemSize,
			data: this.data.uuid,
			offset: this.offset,
			normalized: this.normalized
		};
	}
}, _n = /*@__PURE__*/ new W(), vn = /*@__PURE__*/ new W(), yn = /*@__PURE__*/ new G(), bn = class {
	constructor(e = new W(1, 0, 0), t = 0) {
		this.isPlane = !0, this.normal = e, this.constant = t;
	}
	set(e, t) {
		return this.normal.copy(e), this.constant = t, this;
	}
	setComponents(e, t, n, r) {
		return this.normal.set(e, t, n), this.constant = r, this;
	}
	setFromNormalAndCoplanarPoint(e, t) {
		return this.normal.copy(e), this.constant = -t.dot(this.normal), this;
	}
	setFromCoplanarPoints(e, t, n) {
		let r = _n.subVectors(n, t).cross(vn.subVectors(e, t)).normalize();
		return this.setFromNormalAndCoplanarPoint(r, e), this;
	}
	copy(e) {
		return this.normal.copy(e.normal), this.constant = e.constant, this;
	}
	normalize() {
		let e = 1 / this.normal.length();
		return this.normal.multiplyScalar(e), this.constant *= e, this;
	}
	negate() {
		return this.constant *= -1, this.normal.negate(), this;
	}
	distanceToPoint(e) {
		return this.normal.dot(e) + this.constant;
	}
	distanceToSphere(e) {
		return this.distanceToPoint(e.center) - e.radius;
	}
	projectPoint(e, t) {
		return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
	}
	intersectLine(e, t, n = !0) {
		let r = e.delta(_n), i = this.normal.dot(r);
		if (i === 0) return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
		let a = -(e.start.dot(this.normal) + this.constant) / i;
		return n === !0 && (a < 0 || a > 1) ? null : t.copy(e.start).addScaledVector(r, a);
	}
	intersectsLine(e) {
		let t = this.distanceToPoint(e.start), n = this.distanceToPoint(e.end);
		return t < 0 && n > 0 || n < 0 && t > 0;
	}
	intersectsBox(e) {
		return e.intersectsPlane(this);
	}
	intersectsSphere(e) {
		return e.intersectsPlane(this);
	}
	coplanarPoint(e) {
		return e.copy(this.normal).multiplyScalar(-this.constant);
	}
	applyMatrix4(e, t) {
		let n = t || yn.getNormalMatrix(e), r = this.coplanarPoint(_n).applyMatrix4(e), i = this.normal.applyMatrix3(n).normalize();
		return this.constant = -r.dot(i), this;
	}
	translate(e) {
		return this.constant -= e.dot(this.normal), this;
	}
	equals(e) {
		return e.normal.equals(this.normal) && e.constant === this.constant;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	toJSON() {
		return {
			normal: this.normal.toArray(),
			constant: this.constant
		};
	}
	fromJSON(e) {
		return this.normal.fromArray(e.normal), this.constant = e.constant, this;
	}
}, xn = 0, Sn = class extends oe {
	constructor() {
		super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: xn++ }), this.uuid = ue(), this.name = "", this.type = "Material", this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new J(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = N, this.stencilZFail = N, this.stencilZPass = N, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
	}
	get alphaTest() {
		return this._alphaTest;
	}
	set alphaTest(e) {
		this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
	}
	onBeforeRender() {}
	onBeforeCompile() {}
	customProgramCacheKey() {
		return this.onBeforeCompile.toString();
	}
	setValues(e) {
		if (e !== void 0) for (let t in e) {
			let n = e[t];
			if (n === void 0) {
				z(`Material: parameter '${t}' has value of undefined.`);
				continue;
			}
			let r = this[t];
			if (r === void 0) {
				z(`Material: '${t}' is not a property of THREE.${this.type}.`);
				continue;
			}
			r && r.isColor ? r.set(n) : r && r.isVector2 && n && n.isVector2 || r && r.isEuler && n && n.isEuler || r && r.isVector3 && n && n.isVector3 ? r.copy(n) : this[t] = n;
		}
	}
	toJSON(e) {
		let t = e === void 0 || typeof e == "string";
		t && (e = {
			textures: {},
			images: {}
		});
		let n = { metadata: {
			version: 4.7,
			type: "Material",
			generator: "Material.toJSON"
		} };
		n.uuid = this.uuid, n.type = this.type, n.blending = this.blending, n.side = this.side, n.shadowSide = this.shadowSide, n.vertexColors = this.vertexColors, n.opacity = this.opacity, n.transparent = this.transparent, n.blendSrc = this.blendSrc, n.blendDst = this.blendDst, n.blendEquation = this.blendEquation, n.blendSrcAlpha = this.blendSrcAlpha, n.blendDstAlpha = this.blendDstAlpha, n.blendEquationAlpha = this.blendEquationAlpha, n.blendColor = this.blendColor.getHex(), n.blendAlpha = this.blendAlpha, n.depthFunc = this.depthFunc, n.depthTest = this.depthTest, n.depthWrite = this.depthWrite, n.colorWrite = this.colorWrite, n.clipIntersection = this.clipIntersection, n.clipShadows = this.clipShadows, n.stencilWriteMask = this.stencilWriteMask, n.stencilFunc = this.stencilFunc, n.stencilRef = this.stencilRef, n.stencilFuncMask = this.stencilFuncMask, n.stencilFail = this.stencilFail, n.stencilZFail = this.stencilZFail, n.stencilZPass = this.stencilZPass, n.stencilWrite = this.stencilWrite, n.polygonOffset = this.polygonOffset, n.polygonOffsetFactor = this.polygonOffsetFactor, n.polygonOffsetUnits = this.polygonOffsetUnits, n.dithering = this.dithering, n.alphaTest = this.alphaTest, n.alphaHash = this.alphaHash, n.alphaToCoverage = this.alphaToCoverage, n.premultipliedAlpha = this.premultipliedAlpha, n.forceSinglePass = this.forceSinglePass, n.allowOverride = this.allowOverride, n.visible = this.visible, n.toneMapped = this.toneMapped, n.name = this.name, this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (n.sheenColorMap = this.sheenColorMap.toJSON(e).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (n.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(e).uuid), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.retroreflectivity !== void 0 && (n.retroreflectivity = this.retroreflectivity), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), Array.isArray(this.clippingPlanes) && this.clippingPlanes.length > 0 && (n.clippingPlanes = this.clippingPlanes.map((e) => e.toJSON())), this.rotation !== void 0 && (n.rotation = this.rotation), this.depthPacking !== void 0 && (n.depthPacking = this.depthPacking), this.linewidth !== void 0 && (n.linewidth = this.linewidth), this.linecap !== void 0 && (n.linecap = this.linecap), this.linejoin !== void 0 && (n.linejoin = this.linejoin), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.wireframe !== void 0 && (n.wireframe = this.wireframe), this.wireframeLinewidth !== void 0 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== void 0 && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== void 0 && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading !== void 0 && (n.flatShading = this.flatShading), this.fog !== void 0 && (n.fog = this.fog), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
		function r(e) {
			let t = [];
			for (let n in e) {
				let r = e[n];
				delete r.metadata, t.push(r);
			}
			return t;
		}
		if (t) {
			let t = r(e.textures), i = r(e.images);
			t.length > 0 && (n.textures = t), i.length > 0 && (n.images = i);
		}
		return n;
	}
	fromJSON(e, t) {
		if (e.uuid !== void 0 && (this.uuid = e.uuid), e.name !== void 0 && (this.name = e.name), e.color !== void 0 && this.color !== void 0 && this.color.setHex(e.color), e.roughness !== void 0 && (this.roughness = e.roughness), e.metalness !== void 0 && (this.metalness = e.metalness), e.sheen !== void 0 && (this.sheen = e.sheen), e.sheenColor !== void 0 && (this.sheenColor = new J().setHex(e.sheenColor)), e.sheenRoughness !== void 0 && (this.sheenRoughness = e.sheenRoughness), e.emissive !== void 0 && this.emissive !== void 0 && this.emissive.setHex(e.emissive), e.specular !== void 0 && this.specular !== void 0 && this.specular.setHex(e.specular), e.specularIntensity !== void 0 && (this.specularIntensity = e.specularIntensity), e.specularColor !== void 0 && this.specularColor !== void 0 && this.specularColor.setHex(e.specularColor), e.shininess !== void 0 && (this.shininess = e.shininess), e.clearcoat !== void 0 && (this.clearcoat = e.clearcoat), e.clearcoatRoughness !== void 0 && (this.clearcoatRoughness = e.clearcoatRoughness), e.dispersion !== void 0 && (this.dispersion = e.dispersion), e.retroreflectivity !== void 0 && (this.retroreflectivity = e.retroreflectivity), e.iridescence !== void 0 && (this.iridescence = e.iridescence), e.iridescenceIOR !== void 0 && (this.iridescenceIOR = e.iridescenceIOR), e.iridescenceThicknessRange !== void 0 && (this.iridescenceThicknessRange = e.iridescenceThicknessRange), e.transmission !== void 0 && (this.transmission = e.transmission), e.thickness !== void 0 && (this.thickness = e.thickness), e.attenuationDistance !== void 0 && (this.attenuationDistance = e.attenuationDistance), e.attenuationColor !== void 0 && this.attenuationColor !== void 0 && this.attenuationColor.setHex(e.attenuationColor), e.anisotropy !== void 0 && (this.anisotropy = e.anisotropy), e.anisotropyRotation !== void 0 && (this.anisotropyRotation = e.anisotropyRotation), e.fog !== void 0 && (this.fog = e.fog), e.flatShading !== void 0 && (this.flatShading = e.flatShading), e.blending !== void 0 && (this.blending = e.blending), e.combine !== void 0 && (this.combine = e.combine), e.side !== void 0 && (this.side = e.side), e.shadowSide !== void 0 && (this.shadowSide = e.shadowSide), e.opacity !== void 0 && (this.opacity = e.opacity), e.transparent !== void 0 && (this.transparent = e.transparent), e.alphaTest !== void 0 && (this.alphaTest = e.alphaTest), e.alphaHash !== void 0 && (this.alphaHash = e.alphaHash), e.depthFunc !== void 0 && (this.depthFunc = e.depthFunc), e.depthTest !== void 0 && (this.depthTest = e.depthTest), e.depthWrite !== void 0 && (this.depthWrite = e.depthWrite), e.colorWrite !== void 0 && (this.colorWrite = e.colorWrite), e.clippingPlanes !== void 0 && (this.clippingPlanes = e.clippingPlanes.map((e) => new bn().fromJSON(e))), e.clipIntersection !== void 0 && (this.clipIntersection = e.clipIntersection), e.clipShadows !== void 0 && (this.clipShadows = e.clipShadows), e.depthPacking !== void 0 && (this.depthPacking = e.depthPacking), e.blendSrc !== void 0 && (this.blendSrc = e.blendSrc), e.blendDst !== void 0 && (this.blendDst = e.blendDst), e.blendEquation !== void 0 && (this.blendEquation = e.blendEquation), e.blendSrcAlpha !== void 0 && (this.blendSrcAlpha = e.blendSrcAlpha), e.blendDstAlpha !== void 0 && (this.blendDstAlpha = e.blendDstAlpha), e.blendEquationAlpha !== void 0 && (this.blendEquationAlpha = e.blendEquationAlpha), e.blendColor !== void 0 && this.blendColor !== void 0 && this.blendColor.setHex(e.blendColor), e.blendAlpha !== void 0 && (this.blendAlpha = e.blendAlpha), e.stencilWriteMask !== void 0 && (this.stencilWriteMask = e.stencilWriteMask), e.stencilFunc !== void 0 && (this.stencilFunc = e.stencilFunc), e.stencilRef !== void 0 && (this.stencilRef = e.stencilRef), e.stencilFuncMask !== void 0 && (this.stencilFuncMask = e.stencilFuncMask), e.stencilFail !== void 0 && (this.stencilFail = e.stencilFail), e.stencilZFail !== void 0 && (this.stencilZFail = e.stencilZFail), e.stencilZPass !== void 0 && (this.stencilZPass = e.stencilZPass), e.stencilWrite !== void 0 && (this.stencilWrite = e.stencilWrite), e.wireframe !== void 0 && (this.wireframe = e.wireframe), e.wireframeLinewidth !== void 0 && (this.wireframeLinewidth = e.wireframeLinewidth), e.wireframeLinecap !== void 0 && (this.wireframeLinecap = e.wireframeLinecap), e.wireframeLinejoin !== void 0 && (this.wireframeLinejoin = e.wireframeLinejoin), e.rotation !== void 0 && (this.rotation = e.rotation), e.linewidth !== void 0 && (this.linewidth = e.linewidth), e.linecap !== void 0 && (this.linecap = e.linecap), e.linejoin !== void 0 && (this.linejoin = e.linejoin), e.dashSize !== void 0 && (this.dashSize = e.dashSize), e.gapSize !== void 0 && (this.gapSize = e.gapSize), e.scale !== void 0 && (this.scale = e.scale), e.polygonOffset !== void 0 && (this.polygonOffset = e.polygonOffset), e.polygonOffsetFactor !== void 0 && (this.polygonOffsetFactor = e.polygonOffsetFactor), e.polygonOffsetUnits !== void 0 && (this.polygonOffsetUnits = e.polygonOffsetUnits), e.dithering !== void 0 && (this.dithering = e.dithering), e.alphaToCoverage !== void 0 && (this.alphaToCoverage = e.alphaToCoverage), e.premultipliedAlpha !== void 0 && (this.premultipliedAlpha = e.premultipliedAlpha), e.forceSinglePass !== void 0 && (this.forceSinglePass = e.forceSinglePass), e.allowOverride !== void 0 && (this.allowOverride = e.allowOverride), e.visible !== void 0 && (this.visible = e.visible), e.toneMapped !== void 0 && (this.toneMapped = e.toneMapped), e.userData !== void 0 && (this.userData = e.userData), e.vertexColors !== void 0 && (this.vertexColors = typeof e.vertexColors == "number" ? e.vertexColors > 0 : e.vertexColors), e.size !== void 0 && (this.size = e.size), e.sizeAttenuation !== void 0 && (this.sizeAttenuation = e.sizeAttenuation), e.map !== void 0 && (this.map = t[e.map] || null), e.matcap !== void 0 && (this.matcap = t[e.matcap] || null), e.alphaMap !== void 0 && (this.alphaMap = t[e.alphaMap] || null), e.bumpMap !== void 0 && (this.bumpMap = t[e.bumpMap] || null), e.bumpScale !== void 0 && (this.bumpScale = e.bumpScale), e.normalMap !== void 0 && (this.normalMap = t[e.normalMap] || null), e.normalMapType !== void 0 && (this.normalMapType = e.normalMapType), e.normalScale !== void 0) {
			let t = e.normalScale;
			Array.isArray(t) === !1 && (t = [t, t]), this.normalScale = new U().fromArray(t);
		}
		return e.displacementMap !== void 0 && (this.displacementMap = t[e.displacementMap] || null), e.displacementScale !== void 0 && (this.displacementScale = e.displacementScale), e.displacementBias !== void 0 && (this.displacementBias = e.displacementBias), e.roughnessMap !== void 0 && (this.roughnessMap = t[e.roughnessMap] || null), e.metalnessMap !== void 0 && (this.metalnessMap = t[e.metalnessMap] || null), e.emissiveMap !== void 0 && (this.emissiveMap = t[e.emissiveMap] || null), e.emissiveIntensity !== void 0 && (this.emissiveIntensity = e.emissiveIntensity), e.specularMap !== void 0 && (this.specularMap = t[e.specularMap] || null), e.specularIntensityMap !== void 0 && (this.specularIntensityMap = t[e.specularIntensityMap] || null), e.specularColorMap !== void 0 && (this.specularColorMap = t[e.specularColorMap] || null), e.envMap !== void 0 && (this.envMap = t[e.envMap] || null), e.envMapRotation !== void 0 && this.envMapRotation.fromArray(e.envMapRotation), e.envMapIntensity !== void 0 && (this.envMapIntensity = e.envMapIntensity), e.reflectivity !== void 0 && (this.reflectivity = e.reflectivity), e.refractionRatio !== void 0 && (this.refractionRatio = e.refractionRatio), e.lightMap !== void 0 && (this.lightMap = t[e.lightMap] || null), e.lightMapIntensity !== void 0 && (this.lightMapIntensity = e.lightMapIntensity), e.aoMap !== void 0 && (this.aoMap = t[e.aoMap] || null), e.aoMapIntensity !== void 0 && (this.aoMapIntensity = e.aoMapIntensity), e.gradientMap !== void 0 && (this.gradientMap = t[e.gradientMap] || null), e.clearcoatMap !== void 0 && (this.clearcoatMap = t[e.clearcoatMap] || null), e.clearcoatRoughnessMap !== void 0 && (this.clearcoatRoughnessMap = t[e.clearcoatRoughnessMap] || null), e.clearcoatNormalMap !== void 0 && (this.clearcoatNormalMap = t[e.clearcoatNormalMap] || null), e.clearcoatNormalScale !== void 0 && (this.clearcoatNormalScale = new U().fromArray(e.clearcoatNormalScale)), e.iridescenceMap !== void 0 && (this.iridescenceMap = t[e.iridescenceMap] || null), e.iridescenceThicknessMap !== void 0 && (this.iridescenceThicknessMap = t[e.iridescenceThicknessMap] || null), e.transmissionMap !== void 0 && (this.transmissionMap = t[e.transmissionMap] || null), e.thicknessMap !== void 0 && (this.thicknessMap = t[e.thicknessMap] || null), e.anisotropyMap !== void 0 && (this.anisotropyMap = t[e.anisotropyMap] || null), e.sheenColorMap !== void 0 && (this.sheenColorMap = t[e.sheenColorMap] || null), e.sheenRoughnessMap !== void 0 && (this.sheenRoughnessMap = t[e.sheenRoughnessMap] || null), this;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
		let t = e.clippingPlanes, n = null;
		if (t !== null) {
			let e = t.length;
			n = Array(e);
			for (let r = 0; r !== e; ++r) n[r] = t[r].clone();
		}
		return this.clippingPlanes = n, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.allowOverride = e.allowOverride, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
	}
	dispose() {
		this.dispatchEvent({ type: "dispose" });
	}
	set needsUpdate(e) {
		e === !0 && this.version++;
	}
}, Cn = class extends Sn {
	constructor(e) {
		super(), this.isSpriteMaterial = !0, this.type = "SpriteMaterial", this.color = new J(16777215), this.map = null, this.alphaMap = null, this.rotation = 0, this.sizeAttenuation = !0, this.transparent = !0, this.fog = !0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.rotation = e.rotation, this.sizeAttenuation = e.sizeAttenuation, this.fog = e.fog, this;
	}
}, wn, Tn = /*@__PURE__*/ new W(), En = /*@__PURE__*/ new W(), Dn = /*@__PURE__*/ new W(), On = /*@__PURE__*/ new U(), kn = /*@__PURE__*/ new U(), An = /*@__PURE__*/ new Le(), jn = /*@__PURE__*/ new W(), Mn = /*@__PURE__*/ new W(), Nn = /*@__PURE__*/ new W(), Pn = /*@__PURE__*/ new U(), Fn = /*@__PURE__*/ new U(), In = /*@__PURE__*/ new U(), Ln = class extends lt {
	constructor(e = new Cn()) {
		if (super(), this.isSprite = !0, this.type = "Sprite", wn === void 0) {
			wn = new pn();
			let e = new mn(new Float32Array([
				-.5,
				-.5,
				0,
				0,
				0,
				.5,
				-.5,
				0,
				1,
				0,
				.5,
				.5,
				0,
				1,
				1,
				-.5,
				.5,
				0,
				0,
				1
			]), 5);
			wn.setIndex([
				0,
				1,
				2,
				0,
				2,
				3
			]), wn.setAttribute("position", new gn(e, 3, 0, !1)), wn.setAttribute("uv", new gn(e, 2, 3, !1));
		}
		this.geometry = wn, this.material = e, this.center = new U(.5, .5), this.count = 1;
	}
	intersectsFrustum(e) {
		return e.intersectsSprite(this);
	}
	raycast(e, t) {
		e.camera === null && B("Sprite: \"Raycaster.camera\" needs to be set in order to raycast against sprites."), En.setFromMatrixScale(this.matrixWorld), An.copy(e.camera.matrixWorld), this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse, this.matrixWorld), Dn.setFromMatrixPosition(this.modelViewMatrix), e.camera.isPerspectiveCamera && this.material.sizeAttenuation === !1 && En.multiplyScalar(-Dn.z);
		let n = this.material.rotation, r, i;
		n !== 0 && (i = Math.cos(n), r = Math.sin(n));
		let a = this.center;
		Rn(jn.set(-.5, -.5, 0), Dn, a, En, r, i), Rn(Mn.set(.5, -.5, 0), Dn, a, En, r, i), Rn(Nn.set(.5, .5, 0), Dn, a, En, r, i), Pn.set(0, 0), Fn.set(1, 0), In.set(1, 1);
		let o = e.ray.intersectTriangle(jn, Mn, Nn, !1, Tn);
		if (o === null && (Rn(Mn.set(-.5, .5, 0), Dn, a, En, r, i), Fn.set(0, 1), o = e.ray.intersectTriangle(jn, Nn, Mn, !1, Tn), o === null)) return;
		let s = e.ray.origin.distanceTo(Tn);
		s < e.near || s > e.far || t.push({
			distance: s,
			point: Tn.clone(),
			uv: Nt.getInterpolation(Tn, jn, Mn, Nn, Pn, Fn, In, new U()),
			face: null,
			object: this
		});
	}
	copy(e, t) {
		return super.copy(e, t), e.center !== void 0 && this.center.copy(e.center), this.material = e.material, this;
	}
};
function Rn(e, t, n, r, i, a) {
	On.subVectors(e, n).addScalar(.5).multiply(r), i === void 0 ? kn.copy(On) : (kn.x = a * On.x - i * On.y, kn.y = i * On.x + a * On.y), e.copy(t), e.x += kn.x, e.y += kn.y, e.applyMatrix4(An);
}
var zn = /*@__PURE__*/ new W(), Bn = /*@__PURE__*/ new W(), Vn = /*@__PURE__*/ new W(), Hn = /*@__PURE__*/ new W(), Un = class {
	constructor(e = new W(), t = new W(0, 0, -1)) {
		this.origin = e, this.direction = t;
	}
	set(e, t) {
		return this.origin.copy(e), this.direction.copy(t), this;
	}
	copy(e) {
		return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
	}
	at(e, t) {
		return t.copy(this.origin).addScaledVector(this.direction, e);
	}
	lookAt(e) {
		return this.direction.copy(e).sub(this.origin).normalize(), this;
	}
	recast(e) {
		return this.origin.copy(this.at(e, zn)), this;
	}
	closestPointToPoint(e, t) {
		t.subVectors(e, this.origin);
		let n = t.dot(this.direction);
		return n < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, n);
	}
	distanceToPoint(e) {
		return Math.sqrt(this.distanceSqToPoint(e));
	}
	distanceSqToPoint(e) {
		let t = zn.subVectors(e, this.origin).dot(this.direction);
		return t < 0 ? this.origin.distanceToSquared(e) : (zn.copy(this.origin).addScaledVector(this.direction, t), zn.distanceToSquared(e));
	}
	distanceSqToSegment(e, t, n, r) {
		Bn.copy(e).add(t).multiplyScalar(.5), Vn.copy(t).sub(e).normalize(), Hn.copy(this.origin).sub(Bn);
		let i = e.distanceTo(t) * .5, a = -this.direction.dot(Vn), o = Hn.dot(this.direction), s = -Hn.dot(Vn), c = Hn.lengthSq(), l = Math.abs(1 - a * a), u, d, f, p;
		if (l > 0) {
			if (u = a * s - o, d = a * o - s, p = i * l, u >= 0) {
				if (d >= -p) {
					if (d <= p) {
						let e = 1 / l;
						u *= e, d *= e, f = u * (u + a * d + 2 * o) + d * (a * u + d + 2 * s) + c;
					} else d = i, u = Math.max(0, -(a * d + o)), f = -u * u + d * (d + 2 * s) + c;
				} else d = -i, u = Math.max(0, -(a * d + o)), f = -u * u + d * (d + 2 * s) + c;
			} else d <= -p ? (u = Math.max(0, -(-a * i + o)), d = u > 0 ? -i : Math.min(Math.max(-i, -s), i), f = -u * u + d * (d + 2 * s) + c) : d <= p ? (u = 0, d = Math.min(Math.max(-i, -s), i), f = d * (d + 2 * s) + c) : (u = Math.max(0, -(a * i + o)), d = u > 0 ? i : Math.min(Math.max(-i, -s), i), f = -u * u + d * (d + 2 * s) + c);
		} else d = a > 0 ? -i : i, u = Math.max(0, -(a * d + o)), f = -u * u + d * (d + 2 * s) + c;
		return n && n.copy(this.origin).addScaledVector(this.direction, u), r && r.copy(Bn).addScaledVector(Vn, d), f;
	}
	intersectSphere(e, t) {
		if (e.radius < 0) return null;
		zn.subVectors(e.center, this.origin);
		let n = zn.dot(this.direction), r = zn.dot(zn) - n * n, i = e.radius * e.radius;
		if (r > i) return null;
		let a = Math.sqrt(i - r), o = n - a, s = n + a;
		return s < 0 ? null : o < 0 ? this.at(s, t) : this.at(o, t);
	}
	intersectsSphere(e) {
		return e.radius < 0 ? !1 : this.distanceSqToPoint(e.center) <= e.radius * e.radius;
	}
	distanceToPlane(e) {
		let t = e.normal.dot(this.direction);
		if (t === 0) return e.distanceToPoint(this.origin) === 0 ? 0 : null;
		let n = -(this.origin.dot(e.normal) + e.constant) / t;
		return n >= 0 ? n : null;
	}
	intersectPlane(e, t) {
		let n = this.distanceToPlane(e);
		return n === null ? null : this.at(n, t);
	}
	intersectsPlane(e) {
		let t = e.distanceToPoint(this.origin);
		return t === 0 || e.normal.dot(this.direction) * t < 0;
	}
	intersectBox(e, t) {
		let n, r, i, a, o, s, c = 1 / this.direction.x, l = 1 / this.direction.y, u = 1 / this.direction.z, d = this.origin;
		return c >= 0 ? (n = (e.min.x - d.x) * c, r = (e.max.x - d.x) * c) : (n = (e.max.x - d.x) * c, r = (e.min.x - d.x) * c), l >= 0 ? (i = (e.min.y - d.y) * l, a = (e.max.y - d.y) * l) : (i = (e.max.y - d.y) * l, a = (e.min.y - d.y) * l), n > a || i > r || ((i > n || isNaN(n)) && (n = i), (a < r || isNaN(r)) && (r = a), u >= 0 ? (o = (e.min.z - d.z) * u, s = (e.max.z - d.z) * u) : (o = (e.max.z - d.z) * u, s = (e.min.z - d.z) * u), n > s || o > r) || ((o > n || n !== n) && (n = o), (s < r || r !== r) && (r = s), r < 0) ? null : this.at(n >= 0 ? n : r, t);
	}
	intersectsBox(e) {
		return this.intersectBox(e, zn) !== null;
	}
	intersectTriangle(e, t, n, r, i) {
		let a = this.origin, o = this.direction, s = o.x, c = o.y, l = o.z, u = e.x - a.x, d = e.y - a.y, f = e.z - a.z, p = t.x - a.x, m = t.y - a.y, h = t.z - a.z, g = n.x - a.x, _ = n.y - a.y, v = n.z - a.z, y = Math.abs(s), b = Math.abs(c), x = Math.abs(l), S, C, w, T, E, D, O, k, A, j, M, N;
		if (y >= b && y >= x ? (w = s, D = u, A = p, N = g, s >= 0 ? (S = c, C = l, T = d, E = f, O = m, k = h, j = _, M = v) : (S = l, C = c, T = f, E = d, O = h, k = m, j = v, M = _)) : b >= x ? (w = c, D = d, A = m, N = _, c >= 0 ? (S = l, C = s, T = f, E = u, O = h, k = p, j = v, M = g) : (S = s, C = l, T = u, E = f, O = p, k = h, j = g, M = v)) : (w = l, D = f, A = h, N = v, l >= 0 ? (S = s, C = c, T = u, E = d, O = p, k = m, j = g, M = _) : (S = c, C = s, T = d, E = u, O = m, k = p, j = _, M = g)), w === 0) return null;
		let P = S / w, F = C / w, I = 1 / w, ee = T - P * D, L = E - F * D, te = O - P * A, ne = k - F * A, re = j - P * N, R = M - F * N, z = re * ne - R * te, B = ee * R - L * re, V = te * L - ne * ee;
		if (r) {
			if (z < 0 || B < 0 || V < 0) return null;
		} else if ((z < 0 || B < 0 || V < 0) && (z > 0 || B > 0 || V > 0)) return null;
		let ie = z + B + V;
		if (ie === 0) return null;
		let ae = I * (z * D + B * A + V * N);
		return (ie > 0 ? ae < 0 : ae > 0) ? null : this.at(ae / ie, i);
	}
	applyMatrix4(e) {
		return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
	}
	equals(e) {
		return e.origin.equals(this.origin) && e.direction.equals(this.direction);
	}
	clone() {
		return new this.constructor().copy(this);
	}
}, Wn = class extends Sn {
	constructor(e) {
		super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new J(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Ke(), this.combine = 0, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
	}
}, Gn = /*@__PURE__*/ new Le(), Kn = /*@__PURE__*/ new Un(), qn = /*@__PURE__*/ new an(), Jn = /*@__PURE__*/ new W(), Yn = /*@__PURE__*/ new W(), Xn = /*@__PURE__*/ new W(), Zn = /*@__PURE__*/ new W(), Qn = /*@__PURE__*/ new W(), $n = /*@__PURE__*/ new W(), er = /*@__PURE__*/ new W(), tr = /*@__PURE__*/ new W(), X = class extends lt {
	constructor(e = new pn(), t = new Wn()) {
		super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.count = 1, this.updateMorphTargets();
	}
	copy(e, t) {
		return super.copy(e, t), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
	}
	updateMorphTargets() {
		let e = this.geometry.morphAttributes, t = Object.keys(e);
		if (t.length > 0) {
			let n = e[t[0]];
			if (n !== void 0) {
				this.morphTargetInfluences = [], this.morphTargetDictionary = {};
				for (let e = 0, t = n.length; e < t; e++) {
					let t = n[e].name || String(e);
					this.morphTargetInfluences.push(0), this.morphTargetDictionary[t] = e;
				}
			}
		}
	}
	getVertexPosition(e, t) {
		let n = this.geometry, r = n.attributes.position, i = n.morphAttributes.position, a = n.morphTargetsRelative;
		t.fromBufferAttribute(r, e);
		let o = this.morphTargetInfluences;
		if (i && o) {
			$n.set(0, 0, 0);
			for (let n = 0, r = i.length; n < r; n++) {
				let r = o[n], s = i[n];
				r !== 0 && (Qn.fromBufferAttribute(s, e), a ? $n.addScaledVector(Qn, r) : $n.addScaledVector(Qn.sub(t), r));
			}
			t.add($n);
		}
		return t;
	}
	intersectsFrustum(e) {
		return e.intersectsObject(this);
	}
	raycast(e, t) {
		let n = this.geometry, r = this.material, i = this.matrixWorld;
		r !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), qn.copy(n.boundingSphere), qn.applyMatrix4(i), Kn.copy(e.ray).recast(e.near), !(qn.containsPoint(Kn.origin) === !1 && (Kn.intersectSphere(qn, Jn) === null || Kn.origin.distanceToSquared(Jn) > (e.far - e.near) ** 2)) && (Gn.copy(i).invert(), Kn.copy(e.ray).applyMatrix4(Gn), (n.boundingBox === null || Kn.intersectsBox(n.boundingBox) !== !1) && this._computeIntersections(e, t, Kn)));
	}
	_computeIntersections(e, t, n) {
		let r, i = this.geometry, a = this.material, o = i.index, s = i.attributes.position, c = i.attributes.uv, l = i.attributes.uv1, u = i.attributes.normal, d = i.groups, f = i.drawRange;
		if (o !== null) {
			if (Array.isArray(a)) for (let i = 0, s = d.length; i < s; i++) {
				let s = d[i], p = a[s.materialIndex], m = Math.max(s.start, f.start), h = Math.min(o.count, Math.min(s.start + s.count, f.start + f.count));
				for (let i = m, a = h; i < a; i += 3) {
					let a = o.getX(i), d = o.getX(i + 1), f = o.getX(i + 2);
					r = rr(this, p, e, n, c, l, u, a, d, f), r && (r.faceIndex = Math.floor(i / 3), r.face.materialIndex = s.materialIndex, t.push(r));
				}
			}
			else {
				let i = Math.max(0, f.start), s = Math.min(o.count, f.start + f.count);
				for (let d = i, f = s; d < f; d += 3) {
					let i = o.getX(d), s = o.getX(d + 1), f = o.getX(d + 2);
					r = rr(this, a, e, n, c, l, u, i, s, f), r && (r.faceIndex = Math.floor(d / 3), t.push(r));
				}
			}
		} else if (s !== void 0) {
			if (Array.isArray(a)) for (let i = 0, o = d.length; i < o; i++) {
				let o = d[i], p = a[o.materialIndex], m = Math.max(o.start, f.start), h = Math.min(s.count, Math.min(o.start + o.count, f.start + f.count));
				for (let i = m, a = h; i < a; i += 3) {
					let a = i, s = i + 1, d = i + 2;
					r = rr(this, p, e, n, c, l, u, a, s, d), r && (r.faceIndex = Math.floor(i / 3), r.face.materialIndex = o.materialIndex, t.push(r));
				}
			}
			else {
				let i = Math.max(0, f.start), o = Math.min(s.count, f.start + f.count);
				for (let s = i, d = o; s < d; s += 3) {
					let i = s, o = s + 1, d = s + 2;
					r = rr(this, a, e, n, c, l, u, i, o, d), r && (r.faceIndex = Math.floor(s / 3), t.push(r));
				}
			}
		}
	}
};
function nr(e, t, n, r, i, a, o, s) {
	let c;
	if (c = t.side === 1 ? r.intersectTriangle(o, a, i, !0, s) : r.intersectTriangle(i, a, o, t.side === 0, s), c === null) return null;
	tr.copy(s), tr.applyMatrix4(e.matrixWorld);
	let l = n.ray.origin.distanceTo(tr);
	return l < n.near || l > n.far ? null : {
		distance: l,
		point: tr.clone(),
		object: e
	};
}
function rr(e, t, n, r, i, a, o, s, c, l) {
	e.getVertexPosition(s, Yn), e.getVertexPosition(c, Xn), e.getVertexPosition(l, Zn);
	let u = nr(e, t, n, r, Yn, Xn, Zn, er);
	if (u) {
		let e = new W();
		Nt.getBarycoord(er, Yn, Xn, Zn, e), i && (u.uv = Nt.getInterpolatedAttribute(i, s, c, l, e, new U())), a && (u.uv1 = Nt.getInterpolatedAttribute(a, s, c, l, e, new U())), o && (u.normal = Nt.getInterpolatedAttribute(o, s, c, l, e, new W()), u.normal.dot(r.direction) > 0 && u.normal.multiplyScalar(-1));
		let t = {
			a: s,
			b: c,
			c: l,
			normal: new W(),
			materialIndex: 0
		};
		Nt.getNormal(Yn, Xn, Zn, t.normal), u.face = t, u.barycoord = e;
	}
	return u;
}
var ir = class extends K {
	constructor(e = null, t = 1, n = 1, i, a, o, s, c, l = r, u = r, d, f) {
		super(null, o, s, c, l, u, i, a, d, f), this.isDataTexture = !0, this.image = {
			data: e,
			width: t,
			height: n
		}, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
	}
}, ar = class extends Qt {
	constructor(e, t, n, r = 1) {
		super(e, t, n), this.isInstancedBufferAttribute = !0, this.meshPerAttribute = r;
	}
	copy(e) {
		return super.copy(e), this.meshPerAttribute = e.meshPerAttribute, this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.meshPerAttribute = this.meshPerAttribute, e.isInstancedBufferAttribute = !0, e;
	}
}, or = /*@__PURE__*/ new Le(), sr = /*@__PURE__*/ new Le(), cr = [], lr = /*@__PURE__*/ new Pt(), ur = /*@__PURE__*/ new Le(), dr = /*@__PURE__*/ new X(), fr = /*@__PURE__*/ new an(), pr = class extends X {
	constructor(e, t, n) {
		super(e, t), this.isInstancedMesh = !0, this.instanceMatrix = new ar(new Float32Array(n * 16), 16), this.instanceColor = null, this.morphTexture = null, this.count = n, this.boundingBox = null, this.boundingSphere = null;
		for (let e = 0; e < n; e++) this.setMatrixAt(e, ur);
	}
	computeBoundingBox() {
		let e = this.geometry, t = this.count;
		this.boundingBox === null && (this.boundingBox = new Pt()), e.boundingBox === null && e.computeBoundingBox(), this.boundingBox.makeEmpty();
		for (let n = 0; n < t; n++) this.getMatrixAt(n, or), lr.copy(e.boundingBox).applyMatrix4(or), this.boundingBox.union(lr);
	}
	computeBoundingSphere() {
		let e = this.geometry, t = this.count;
		this.boundingSphere === null && (this.boundingSphere = new an()), e.boundingSphere === null && e.computeBoundingSphere(), this.boundingSphere.makeEmpty();
		for (let n = 0; n < t; n++) this.getMatrixAt(n, or), fr.copy(e.boundingSphere).applyMatrix4(or), this.boundingSphere.union(fr);
	}
	copy(e, t) {
		return super.copy(e, t), this.instanceMatrix.copy(e.instanceMatrix), e.morphTexture !== null && (this.morphTexture = e.morphTexture.clone()), e.instanceColor !== null && (this.instanceColor = e.instanceColor.clone()), this.count = e.count, e.boundingBox !== null && (this.boundingBox = e.boundingBox.clone()), e.boundingSphere !== null && (this.boundingSphere = e.boundingSphere.clone()), this;
	}
	getColorAt(e, t) {
		return this.instanceColor === null ? t.setRGB(1, 1, 1) : t.fromArray(this.instanceColor.array, e * 3);
	}
	getMatrixAt(e, t) {
		return t.fromArray(this.instanceMatrix.array, e * 16);
	}
	getMorphAt(e, t) {
		let n = t.morphTargetInfluences, r = this.morphTexture.source.data.data, i = e * (n.length + 1) + 1;
		for (let e = 0; e < n.length; e++) n[e] = r[i + e];
	}
	raycast(e, t) {
		let n = this.matrixWorld, r = this.count;
		if (dr.geometry = this.geometry, dr.material = this.material, dr.material !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), fr.copy(this.boundingSphere), fr.applyMatrix4(n), e.ray.intersectsSphere(fr) !== !1)) for (let i = 0; i < r; i++) {
			this.getMatrixAt(i, or), sr.multiplyMatrices(n, or), dr.matrixWorld = sr, dr.raycast(e, cr);
			for (let e = 0, n = cr.length; e < n; e++) {
				let n = cr[e];
				n.instanceId = i, n.object = this, t.push(n);
			}
			cr.length = 0;
		}
	}
	setColorAt(e, t) {
		return this.instanceColor === null && (this.instanceColor = new ar(new Float32Array(this.instanceMatrix.count * 3).fill(1), 3)), t.toArray(this.instanceColor.array, e * 3), this;
	}
	setMatrixAt(e, t) {
		return t.toArray(this.instanceMatrix.array, e * 16), this;
	}
	setMorphAt(e, t) {
		let n = t.morphTargetInfluences, r = n.length + 1;
		this.morphTexture === null && (this.morphTexture = new ir(new Float32Array(r * this.count), r, this.count, _, l));
		let i = this.morphTexture.source.data.data, a = 0;
		for (let e = 0; e < n.length; e++) a += n[e];
		let o = this.geometry.morphTargetsRelative ? 1 : 1 - a, s = r * e;
		return i[s] = o, i.set(n, s + 1), this;
	}
	updateMorphTargets() {}
	dispose() {
		super.dispose(), this.morphTexture !== null && (this.morphTexture.dispose(), this.morphTexture = null);
	}
}, mr = /*@__PURE__*/ new an(), hr = /*@__PURE__*/ new U(.5, .5), gr = /*@__PURE__*/ new W(), _r = class {
	constructor(e = new bn(), t = new bn(), n = new bn(), r = new bn(), i = new bn(), a = new bn()) {
		this.planes = [
			e,
			t,
			n,
			r,
			i,
			a
		];
	}
	set(e, t, n, r, i, a) {
		let o = this.planes;
		return o[0].copy(e), o[1].copy(t), o[2].copy(n), o[3].copy(r), o[4].copy(i), o[5].copy(a), this;
	}
	copy(e) {
		let t = this.planes;
		for (let n = 0; n < 6; n++) t[n].copy(e.planes[n]);
		return this;
	}
	setFromProjectionMatrix(e, t = F, n = !1) {
		let r = this.planes, i = e.elements, a = i[0], o = i[1], s = i[2], c = i[3], l = i[4], u = i[5], d = i[6], f = i[7], p = i[8], m = i[9], h = i[10], g = i[11], _ = i[12], v = i[13], y = i[14], b = i[15];
		if (r[0].setComponents(c - a, f - l, g - p, b - _).normalize(), r[1].setComponents(c + a, f + l, g + p, b + _).normalize(), r[2].setComponents(c + o, f + u, g + m, b + v).normalize(), r[3].setComponents(c - o, f - u, g - m, b - v).normalize(), n) r[4].setComponents(s, d, h, y).normalize(), r[5].setComponents(c - s, f - d, g - h, b - y).normalize();
		else if (r[4].setComponents(c - s, f - d, g - h, b - y).normalize(), t === 2e3) r[5].setComponents(c + s, f + d, g + h, b + y).normalize();
		else if (t === 2001) r[5].setComponents(s, d, h, y).normalize();
		else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
		return this;
	}
	intersectsObject(e) {
		if (e.boundingSphere !== void 0) e.boundingSphere === null && e.computeBoundingSphere(), mr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
		else {
			let t = e.geometry;
			t.boundingSphere === null && t.computeBoundingSphere(), mr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
		}
		return this.intersectsSphere(mr);
	}
	intersectsSprite(e) {
		return mr.center.set(0, 0, 0), mr.radius = .7071067811865476 + hr.distanceTo(e.center), mr.applyMatrix4(e.matrixWorld), this.intersectsSphere(mr);
	}
	intersectsSphere(e) {
		let t = this.planes, n = e.center, r = -e.radius;
		for (let e = 0; e < 6; e++) if (t[e].distanceToPoint(n) < r) return !1;
		return !0;
	}
	intersectsBox(e) {
		let t = this.planes;
		for (let n = 0; n < 6; n++) {
			let r = t[n];
			if (gr.x = r.normal.x > 0 ? e.max.x : e.min.x, gr.y = r.normal.y > 0 ? e.max.y : e.min.y, gr.z = r.normal.z > 0 ? e.max.z : e.min.z, r.distanceToPoint(gr) < 0) return !1;
		}
		return !0;
	}
	containsPoint(e) {
		let t = this.planes;
		for (let n = 0; n < 6; n++) if (t[n].distanceToPoint(e) < 0) return !1;
		return !0;
	}
	clone() {
		return new this.constructor().copy(this);
	}
}, vr = class extends Sn {
	constructor(e) {
		super(), this.isPointsMaterial = !0, this.type = "PointsMaterial", this.color = new J(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.fog = !0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.size = e.size, this.sizeAttenuation = e.sizeAttenuation, this.fog = e.fog, this;
	}
}, yr = /*@__PURE__*/ new Le(), br = /*@__PURE__*/ new Un(), xr = /*@__PURE__*/ new an(), Sr = /*@__PURE__*/ new W(), Cr = class extends lt {
	constructor(e = new pn(), t = new vr()) {
		super(), this.isPoints = !0, this.type = "Points", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets();
	}
	copy(e, t) {
		return super.copy(e, t), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
	}
	intersectsFrustum(e) {
		return e.intersectsObject(this);
	}
	raycast(e, t) {
		let n = this.geometry, r = this.matrixWorld, i = e.params.Points.threshold, a = n.drawRange;
		if (n.boundingSphere === null && n.computeBoundingSphere(), xr.copy(n.boundingSphere), xr.applyMatrix4(r), xr.radius += i, e.ray.intersectsSphere(xr) === !1) return;
		yr.copy(r).invert(), br.copy(e.ray).applyMatrix4(yr);
		let o = i / ((this.scale.x + this.scale.y + this.scale.z) / 3), s = o * o, c = n.index, l = n.attributes.position;
		if (c !== null) {
			let n = Math.max(0, a.start), i = Math.min(c.count, a.start + a.count);
			for (let a = n, o = i; a < o; a++) {
				let n = c.getX(a);
				Sr.fromBufferAttribute(l, n), wr(Sr, n, s, r, e, t, this);
			}
		} else {
			let n = Math.max(0, a.start), i = Math.min(l.count, a.start + a.count);
			for (let a = n, o = i; a < o; a++) Sr.fromBufferAttribute(l, a), wr(Sr, a, s, r, e, t, this);
		}
	}
	updateMorphTargets() {
		let e = this.geometry.morphAttributes, t = Object.keys(e);
		if (t.length > 0) {
			let n = e[t[0]];
			if (n !== void 0) {
				this.morphTargetInfluences = [], this.morphTargetDictionary = {};
				for (let e = 0, t = n.length; e < t; e++) {
					let t = n[e].name || String(e);
					this.morphTargetInfluences.push(0), this.morphTargetDictionary[t] = e;
				}
			}
		}
	}
};
function wr(e, t, n, r, i, a, o) {
	let s = br.distanceSqToPoint(e);
	if (s < n) {
		let n = new W();
		br.closestPointToPoint(e, n), n.applyMatrix4(r);
		let c = i.ray.origin.distanceTo(n);
		if (c < i.near || c > i.far) return;
		a.push({
			distance: c,
			distanceToRay: Math.sqrt(s),
			point: n,
			index: t,
			face: null,
			faceIndex: null,
			barycoord: null,
			object: o
		});
	}
}
var Tr = class extends K {
	constructor(e, t) {
		super({
			width: e,
			height: t
		}), this.isFramebufferTexture = !0, this.magFilter = r, this.minFilter = r, this.generateMipmaps = !1, this.needsUpdate = !0;
	}
}, Er = class extends K {
	constructor(e = [], t = 301, n, r, i, a, o, s, c, l) {
		super(e, t, n, r, i, a, o, s, c, l), this.isCubeTexture = !0, this.flipY = !1;
	}
	get images() {
		return this.image;
	}
	set images(e) {
		this.image = e;
	}
}, Dr = class extends K {
	constructor(e, t, n, r, i, a, o, s, c) {
		super(e, t, n, r, i, a, o, s, c), this.isCanvasTexture = !0, this.needsUpdate = !0;
	}
}, Or = class extends K {
	constructor(e, t, n = c, i, a, o, s = r, l = r, u, d = h, f = 1) {
		if (d !== 1026 && d !== 1027) throw Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
		super({
			width: e,
			height: t,
			depth: f
		}, i, a, o, s, l, d, n, u), this.isDepthTexture = !0, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
	}
	copy(e) {
		return super.copy(e), this.source = new Oe(Object.assign({}, e.image)), this.compareFunction = e.compareFunction, this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.compareFunction = this.compareFunction, t;
	}
}, kr = class extends Or {
	constructor(e, t = c, n = 301, i, a, o = r, s = r, l, u = h) {
		let d = {
			width: e,
			height: e,
			depth: 1
		}, f = [
			d,
			d,
			d,
			d,
			d,
			d
		];
		super(e, e, t, n, i, a, o, s, l, u), this.image = f, this.isCubeDepthTexture = !0, this.isCubeTexture = !0;
	}
	get images() {
		return this.image;
	}
	set images(e) {
		this.image = e;
	}
}, Ar = class extends K {
	constructor(e = null) {
		super(), this.sourceTexture = e, this.isExternalTexture = !0;
	}
	copy(e) {
		return super.copy(e), this.sourceTexture = e.sourceTexture, this;
	}
}, jr = class e extends pn {
	constructor(e = 1, t = 1, n = 1, r = 1, i = 1, a = 1) {
		super(), this.type = "BoxGeometry", this.parameters = {
			width: e,
			height: t,
			depth: n,
			widthSegments: r,
			heightSegments: i,
			depthSegments: a
		};
		let o = this;
		r = Math.floor(r), i = Math.floor(i), a = Math.floor(a);
		let s = [], c = [], l = [], u = [], d = 0, f = 0;
		p("z", "y", "x", -1, -1, n, t, e, a, i, 0), p("z", "y", "x", 1, -1, n, t, -e, a, i, 1), p("x", "z", "y", 1, 1, e, n, t, r, a, 2), p("x", "z", "y", 1, -1, e, n, -t, r, a, 3), p("x", "y", "z", 1, -1, e, t, n, r, i, 4), p("x", "y", "z", -1, -1, e, t, -n, r, i, 5), this.setIndex(s), this.setAttribute("position", new Y(c, 3)), this.setAttribute("normal", new Y(l, 3)), this.setAttribute("uv", new Y(u, 2));
		function p(e, t, n, r, i, a, p, m, h, g, _) {
			let v = a / h, y = p / g, b = a / 2, x = p / 2, S = m / 2, C = h + 1, w = g + 1, T = 0, E = 0, D = new W();
			for (let a = 0; a < w; a++) {
				let o = a * y - x;
				for (let s = 0; s < C; s++) D[e] = (s * v - b) * r, D[t] = o * i, D[n] = S, c.push(D.x, D.y, D.z), D[e] = 0, D[t] = 0, D[n] = m > 0 ? 1 : -1, l.push(D.x, D.y, D.z), u.push(s / h), u.push(1 - a / g), T += 1;
			}
			for (let e = 0; e < g; e++) for (let t = 0; t < h; t++) {
				let n = d + t + C * e, r = d + t + C * (e + 1), i = d + (t + 1) + C * (e + 1), a = d + (t + 1) + C * e;
				s.push(n, r, a), s.push(r, i, a), E += 6;
			}
			o.addGroup(f, E, _), f += E, d += T;
		}
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
	}
}, Mr = class e extends pn {
	constructor(e = 1, t = 1, n = 4, r = 8, i = 1) {
		super(), this.type = "CapsuleGeometry", this.parameters = {
			radius: e,
			height: t,
			capSegments: n,
			radialSegments: r,
			heightSegments: i
		}, t = Math.max(0, t), n = Math.max(1, Math.floor(n)), r = Math.max(3, Math.floor(r)), i = Math.max(1, Math.floor(i));
		let a = [], o = [], s = [], c = [], l = t / 2, u = Math.PI / 2 * e, d = t, f = 2 * u + d, p = n * 2 + i, m = r + 1, h = new W(), g = new W();
		for (let _ = 0; _ <= p; _++) {
			let v = 0, y = 0, b = 0, x = 0;
			if (_ <= n) {
				let t = _ / n, r = t * Math.PI / 2;
				y = -l - e * Math.cos(r), b = e * Math.sin(r), x = -e * Math.cos(r), v = t * u;
			} else if (_ <= n + i) {
				let r = (_ - n) / i;
				y = -l + r * t, b = e, x = 0, v = u + r * d;
			} else {
				let t = (_ - n - i) / n, r = t * Math.PI / 2;
				y = l + e * Math.sin(r), b = e * Math.cos(r), x = e * Math.sin(r), v = u + d + t * u;
			}
			let S = Math.max(0, Math.min(1, v / f)), C = 0;
			_ === 0 ? C = .5 / r : _ === p && (C = -.5 / r);
			for (let e = 0; e <= r; e++) {
				let t = e / r, n = t * Math.PI * 2, i = Math.sin(n), a = Math.cos(n);
				g.x = -b * a, g.y = y, g.z = b * i, o.push(g.x, g.y, g.z), h.set(-b * a, x, b * i), h.normalize(), s.push(h.x, h.y, h.z), c.push(t + C, S);
			}
			if (_ > 0) {
				let e = (_ - 1) * m;
				for (let t = 0; t < r; t++) {
					let n = e + t, r = e + t + 1, i = _ * m + t, o = _ * m + t + 1;
					a.push(n, r, i), a.push(r, o, i);
				}
			}
		}
		this.setIndex(a), this.setAttribute("position", new Y(o, 3)), this.setAttribute("normal", new Y(s, 3)), this.setAttribute("uv", new Y(c, 2));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.radius, t.height, t.capSegments, t.radialSegments, t.heightSegments);
	}
}, Nr = class e extends pn {
	constructor(e = 1, t = 32, n = 0, r = Math.PI * 2) {
		super(), this.type = "CircleGeometry", this.parameters = {
			radius: e,
			segments: t,
			thetaStart: n,
			thetaLength: r
		}, t = Math.max(3, t);
		let i = [], a = [], o = [], s = [], c = new W(), l = new U();
		a.push(0, 0, 0), o.push(0, 0, 1), s.push(.5, .5);
		for (let i = 0, u = 3; i <= t; i++, u += 3) {
			let d = n + i / t * r;
			c.x = e * Math.cos(d), c.y = e * Math.sin(d), a.push(c.x, c.y, c.z), o.push(0, 0, 1), l.x = (a[u] / e + 1) / 2, l.y = (a[u + 1] / e + 1) / 2, s.push(l.x, l.y);
		}
		for (let e = 1; e <= t; e++) i.push(e, e + 1, 0);
		this.setIndex(i), this.setAttribute("position", new Y(a, 3)), this.setAttribute("normal", new Y(o, 3)), this.setAttribute("uv", new Y(s, 2));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.radius, t.segments, t.thetaStart, t.thetaLength);
	}
}, Pr = class e extends pn {
	constructor(e = 1, t = 1, n = 1, r = 32, i = 1, a = !1, o = 0, s = Math.PI * 2) {
		super(), this.type = "CylinderGeometry", this.parameters = {
			radiusTop: e,
			radiusBottom: t,
			height: n,
			radialSegments: r,
			heightSegments: i,
			openEnded: a,
			thetaStart: o,
			thetaLength: s
		};
		let c = this;
		r = Math.floor(r), i = Math.floor(i);
		let l = [], u = [], d = [], f = [], p = 0, m = [], h = n / 2, g = 0;
		_(), a === !1 && (e > 0 && v(!0), t > 0 && v(!1)), this.setIndex(l), this.setAttribute("position", new Y(u, 3)), this.setAttribute("normal", new Y(d, 3)), this.setAttribute("uv", new Y(f, 2));
		function _() {
			let a = new W(), _ = new W(), v = 0, y = (t - e) / n;
			for (let c = 0; c <= i; c++) {
				let l = [], g = c / i, v = g * (t - e) + e;
				for (let e = 0; e <= r; e++) {
					let t = e / r, i = t * s + o, c = Math.sin(i), m = Math.cos(i);
					_.x = v * c, _.y = -g * n + h, _.z = v * m, u.push(_.x, _.y, _.z), a.set(c, y, m).normalize(), d.push(a.x, a.y, a.z), f.push(t, 1 - g), l.push(p++);
				}
				m.push(l);
			}
			for (let n = 0; n < r; n++) for (let r = 0; r < i; r++) {
				let a = m[r][n], o = m[r + 1][n], s = m[r + 1][n + 1], c = m[r][n + 1];
				(e > 0 || r !== 0) && (l.push(a, o, c), v += 3), (t > 0 || r !== i - 1) && (l.push(o, s, c), v += 3);
			}
			c.addGroup(g, v, 0), g += v;
		}
		function v(n) {
			let i = p, a = new U(), m = new W(), _ = 0, v = n === !0 ? e : t, y = n === !0 ? 1 : -1;
			for (let e = 1; e <= r; e++) u.push(0, h * y, 0), d.push(0, y, 0), f.push(.5, .5), p++;
			let b = p;
			for (let e = 0; e <= r; e++) {
				let t = e / r * s + o, n = Math.cos(t), i = Math.sin(t);
				m.x = v * i, m.y = h * y, m.z = v * n, u.push(m.x, m.y, m.z), d.push(0, y, 0), a.x = n * .5 + .5, a.y = i * .5 * y + .5, f.push(a.x, a.y), p++;
			}
			for (let e = 0; e < r; e++) {
				let t = i + e, r = b + e;
				n === !0 ? l.push(r, r + 1, t) : l.push(r + 1, r, t), _ += 3;
			}
			c.addGroup(g, _, n === !0 ? 1 : 2), g += _;
		}
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.radiusTop, t.radiusBottom, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
	}
}, Fr = class e extends Pr {
	constructor(e = 1, t = 1, n = 32, r = 1, i = !1, a = 0, o = Math.PI * 2) {
		super(0, e, t, n, r, i, a, o), this.type = "ConeGeometry", this.parameters = {
			radius: e,
			height: t,
			radialSegments: n,
			heightSegments: r,
			openEnded: i,
			thetaStart: a,
			thetaLength: o
		};
	}
	static fromJSON(t) {
		return new e(t.radius, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
	}
}, Ir = class {
	constructor() {
		this.type = "Curve", this.arcLengthDivisions = 200, this.needsUpdate = !1, this.cacheArcLengths = null;
	}
	getPoint() {
		z("Curve: .getPoint() not implemented.");
	}
	getPointAt(e, t) {
		let n = this.getUtoTmapping(e);
		return this.getPoint(n, t);
	}
	getPoints(e = 5) {
		let t = [];
		for (let n = 0; n <= e; n++) t.push(this.getPoint(n / e));
		return t;
	}
	getSpacedPoints(e = 5) {
		let t = [];
		for (let n = 0; n <= e; n++) t.push(this.getPointAt(n / e));
		return t;
	}
	getLength() {
		let e = this.getLengths();
		return e[e.length - 1];
	}
	getLengths(e = this.arcLengthDivisions) {
		if (this.cacheArcLengths && this.cacheArcLengths.length === e + 1 && !this.needsUpdate) return this.cacheArcLengths;
		this.needsUpdate = !1;
		let t = [], n, r = this.getPoint(0), i = 0;
		t.push(0);
		for (let a = 1; a <= e; a++) n = this.getPoint(a / e), i += n.distanceTo(r), t.push(i), r = n;
		return this.cacheArcLengths = t, t;
	}
	updateArcLengths() {
		this.needsUpdate = !0, this.getLengths();
	}
	getUtoTmapping(e, t = null) {
		let n = this.getLengths(), r = 0, i = n.length, a;
		a = t || e * n[i - 1];
		let o = 0, s = i - 1, c;
		for (; o <= s;) if (r = Math.floor(o + (s - o) / 2), c = n[r] - a, c < 0) o = r + 1;
		else if (c > 0) s = r - 1;
		else {
			s = r;
			break;
		}
		if (r = s, n[r] === a) return r / (i - 1);
		let l = n[r], u = n[r + 1] - l, d = (a - l) / u;
		return (r + d) / (i - 1);
	}
	getTangent(e, t) {
		let n = 1e-4, r = e - n, i = e + n;
		r < 0 && (r = 0), i > 1 && (i = 1);
		let a = this.getPoint(r), o = this.getPoint(i), s = t || (a.isVector2 ? new U() : new W());
		return s.copy(o).sub(a).normalize(), s;
	}
	getTangentAt(e, t) {
		let n = this.getUtoTmapping(e);
		return this.getTangent(n, t);
	}
	computeFrenetFrames(e, t = !1) {
		let n = new W(), r = [], i = [], a = [], o = new W(), s = new Le();
		for (let t = 0; t <= e; t++) {
			let n = t / e;
			r[t] = this.getTangentAt(n, new W());
		}
		i[0] = new W(), a[0] = new W();
		let c = Number.MAX_VALUE, l = Math.abs(r[0].x), u = Math.abs(r[0].y), d = Math.abs(r[0].z);
		l <= c && (c = l, n.set(1, 0, 0)), u <= c && (c = u, n.set(0, 1, 0)), d <= c && n.set(0, 0, 1), o.crossVectors(r[0], n).normalize(), i[0].crossVectors(r[0], o), a[0].crossVectors(r[0], i[0]);
		for (let t = 1; t <= e; t++) {
			if (i[t] = i[t - 1].clone(), a[t] = a[t - 1].clone(), o.crossVectors(r[t - 1], r[t]), o.length() > 2 ** -52) {
				o.normalize();
				let e = Math.acos(H(r[t - 1].dot(r[t]), -1, 1));
				i[t].applyMatrix4(s.makeRotationAxis(o, e));
			}
			a[t].crossVectors(r[t], i[t]);
		}
		if (t === !0) {
			let t = Math.acos(H(i[0].dot(i[e]), -1, 1));
			t /= e, r[0].dot(o.crossVectors(i[0], i[e])) > 0 && (t = -t);
			for (let n = 1; n <= e; n++) i[n].applyMatrix4(s.makeRotationAxis(r[n], t * n)), a[n].crossVectors(r[n], i[n]);
		}
		return {
			tangents: r,
			normals: i,
			binormals: a
		};
	}
	clone() {
		return new this.constructor().copy(this);
	}
	copy(e) {
		return this.arcLengthDivisions = e.arcLengthDivisions, this;
	}
	toJSON() {
		let e = { metadata: {
			version: 4.7,
			type: "Curve",
			generator: "Curve.toJSON"
		} };
		return e.arcLengthDivisions = this.arcLengthDivisions, e.type = this.type, e;
	}
	fromJSON(e) {
		return this.arcLengthDivisions = e.arcLengthDivisions, this;
	}
}, Lr = class extends Ir {
	constructor(e = 0, t = 0, n = 1, r = 1, i = 0, a = Math.PI * 2, o = !1, s = 0) {
		super(), this.isEllipseCurve = !0, this.type = "EllipseCurve", this.aX = e, this.aY = t, this.xRadius = n, this.yRadius = r, this.aStartAngle = i, this.aEndAngle = a, this.aClockwise = o, this.aRotation = s;
	}
	getPoint(e, t = new U()) {
		let n = t, r = Math.PI * 2, i = this.aEndAngle - this.aStartAngle, a = Math.abs(i) < 2 ** -52;
		for (; i < 0;) i += r;
		for (; i > r;) i -= r;
		i < 2 ** -52 && (i = a ? 0 : r), this.aClockwise === !0 && !a && (i === r ? i = -r : i -= r);
		let o = this.aStartAngle + e * i, s = this.aX + this.xRadius * Math.cos(o), c = this.aY + this.yRadius * Math.sin(o);
		if (this.aRotation !== 0) {
			let e = Math.cos(this.aRotation), t = Math.sin(this.aRotation), n = s - this.aX, r = c - this.aY;
			s = n * e - r * t + this.aX, c = n * t + r * e + this.aY;
		}
		return n.set(s, c);
	}
	copy(e) {
		return super.copy(e), this.aX = e.aX, this.aY = e.aY, this.xRadius = e.xRadius, this.yRadius = e.yRadius, this.aStartAngle = e.aStartAngle, this.aEndAngle = e.aEndAngle, this.aClockwise = e.aClockwise, this.aRotation = e.aRotation, this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.aX = this.aX, e.aY = this.aY, e.xRadius = this.xRadius, e.yRadius = this.yRadius, e.aStartAngle = this.aStartAngle, e.aEndAngle = this.aEndAngle, e.aClockwise = this.aClockwise, e.aRotation = this.aRotation, e;
	}
	fromJSON(e) {
		return super.fromJSON(e), this.aX = e.aX, this.aY = e.aY, this.xRadius = e.xRadius, this.yRadius = e.yRadius, this.aStartAngle = e.aStartAngle, this.aEndAngle = e.aEndAngle, this.aClockwise = e.aClockwise, this.aRotation = e.aRotation, this;
	}
}, Rr = class extends Lr {
	constructor(e, t, n, r, i, a) {
		super(e, t, n, n, r, i, a), this.isArcCurve = !0, this.type = "ArcCurve";
	}
};
function zr() {
	let e = 0, t = 0, n = 0, r = 0;
	function i(i, a, o, s) {
		e = i, t = o, n = -3 * i + 3 * a - 2 * o - s, r = 2 * i - 2 * a + o + s;
	}
	return {
		initCatmullRom: function(e, t, n, r, a) {
			i(t, n, a * (n - e), a * (r - t));
		},
		initNonuniformCatmullRom: function(e, t, n, r, a, o, s) {
			let c = (t - e) / a - (n - e) / (a + o) + (n - t) / o, l = (n - t) / o - (r - t) / (o + s) + (r - n) / s;
			c *= o, l *= o, i(t, n, c, l);
		},
		calc: function(i) {
			let a = i * i, o = a * i;
			return e + t * i + n * a + r * o;
		}
	};
}
var Br = /*@__PURE__*/ new W(), Vr = /*@__PURE__*/ new W(), Hr = /*@__PURE__*/ new zr(), Ur = /*@__PURE__*/ new zr(), Wr = /*@__PURE__*/ new zr(), Gr = class extends Ir {
	constructor(e = [], t = !1, n = "centripetal", r = .5) {
		super(), this.isCatmullRomCurve3 = !0, this.type = "CatmullRomCurve3", this.points = e, this.closed = t, this.curveType = n, this.tension = r;
	}
	getPoint(e, t = new W()) {
		let n = t, r = this.points, i = r.length, a = (i - +!this.closed) * e, o = Math.floor(a), s = a - o;
		this.closed ? o += o > 0 ? 0 : (Math.floor(Math.abs(o) / i) + 1) * i : s === 0 && o === i - 1 && (o = i - 2, s = 1);
		let c, l;
		this.closed || o > 0 ? c = r[(o - 1) % i] : (Vr.subVectors(r[0], r[1]).add(r[0]), c = Vr);
		let u = r[o % i], d = r[(o + 1) % i];
		if (this.closed || o + 2 < i ? l = r[(o + 2) % i] : (Br.subVectors(r[i - 1], r[i - 2]).add(r[i - 1]), l = Br), this.curveType === "centripetal" || this.curveType === "chordal") {
			let e = this.curveType === "chordal" ? .5 : .25, t = c.distanceToSquared(u) ** +e, n = u.distanceToSquared(d) ** +e, r = d.distanceToSquared(l) ** +e;
			n < 1e-4 && (n = 1), t < 1e-4 && (t = n), r < 1e-4 && (r = n), Hr.initNonuniformCatmullRom(c.x, u.x, d.x, l.x, t, n, r), Ur.initNonuniformCatmullRom(c.y, u.y, d.y, l.y, t, n, r), Wr.initNonuniformCatmullRom(c.z, u.z, d.z, l.z, t, n, r);
		} else this.curveType === "catmullrom" && (Hr.initCatmullRom(c.x, u.x, d.x, l.x, this.tension), Ur.initCatmullRom(c.y, u.y, d.y, l.y, this.tension), Wr.initCatmullRom(c.z, u.z, d.z, l.z, this.tension));
		return n.set(Hr.calc(s), Ur.calc(s), Wr.calc(s)), n;
	}
	copy(e) {
		super.copy(e), this.points = [];
		for (let t = 0, n = e.points.length; t < n; t++) {
			let n = e.points[t];
			this.points.push(n.clone());
		}
		return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this;
	}
	toJSON() {
		let e = super.toJSON();
		e.points = [];
		for (let t = 0, n = this.points.length; t < n; t++) {
			let n = this.points[t];
			e.points.push(n.toArray());
		}
		return e.closed = this.closed, e.curveType = this.curveType, e.tension = this.tension, e;
	}
	fromJSON(e) {
		super.fromJSON(e), this.points = [];
		for (let t = 0, n = e.points.length; t < n; t++) {
			let n = e.points[t];
			this.points.push(new W().fromArray(n));
		}
		return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this;
	}
};
function Kr(e, t, n, r, i) {
	let a = (r - t) * .5, o = (i - n) * .5, s = e * e, c = e * s;
	return (2 * n - 2 * r + a + o) * c + (-3 * n + 3 * r - 2 * a - o) * s + a * e + n;
}
function qr(e, t) {
	let n = 1 - e;
	return n * n * t;
}
function Jr(e, t) {
	return 2 * (1 - e) * e * t;
}
function Yr(e, t) {
	return e * e * t;
}
function Xr(e, t, n, r) {
	return qr(e, t) + Jr(e, n) + Yr(e, r);
}
function Zr(e, t) {
	let n = 1 - e;
	return n * n * n * t;
}
function Qr(e, t) {
	let n = 1 - e;
	return 3 * n * n * e * t;
}
function $r(e, t) {
	return 3 * (1 - e) * e * e * t;
}
function ei(e, t) {
	return e * e * e * t;
}
function ti(e, t, n, r, i) {
	return Zr(e, t) + Qr(e, n) + $r(e, r) + ei(e, i);
}
var ni = class extends Ir {
	constructor(e = new U(), t = new U(), n = new U(), r = new U()) {
		super(), this.isCubicBezierCurve = !0, this.type = "CubicBezierCurve", this.v0 = e, this.v1 = t, this.v2 = n, this.v3 = r;
	}
	getPoint(e, t = new U()) {
		let n = t, r = this.v0, i = this.v1, a = this.v2, o = this.v3;
		return n.set(ti(e, r.x, i.x, a.x, o.x), ti(e, r.y, i.y, a.y, o.y)), n;
	}
	copy(e) {
		return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e.v3 = this.v3.toArray(), e;
	}
	fromJSON(e) {
		return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this.v3.fromArray(e.v3), this;
	}
}, ri = class extends Ir {
	constructor(e = new W(), t = new W(), n = new W(), r = new W()) {
		super(), this.isCubicBezierCurve3 = !0, this.type = "CubicBezierCurve3", this.v0 = e, this.v1 = t, this.v2 = n, this.v3 = r;
	}
	getPoint(e, t = new W()) {
		let n = t, r = this.v0, i = this.v1, a = this.v2, o = this.v3;
		return n.set(ti(e, r.x, i.x, a.x, o.x), ti(e, r.y, i.y, a.y, o.y), ti(e, r.z, i.z, a.z, o.z)), n;
	}
	copy(e) {
		return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e.v3 = this.v3.toArray(), e;
	}
	fromJSON(e) {
		return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this.v3.fromArray(e.v3), this;
	}
}, ii = class extends Ir {
	constructor(e = new U(), t = new U()) {
		super(), this.isLineCurve = !0, this.type = "LineCurve", this.v1 = e, this.v2 = t;
	}
	getPoint(e, t = new U()) {
		let n = t;
		return e === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(e).add(this.v1)), n;
	}
	getPointAt(e, t) {
		return this.getPoint(e, t);
	}
	getTangent(e, t = new U()) {
		return t.subVectors(this.v2, this.v1).normalize();
	}
	getTangentAt(e, t) {
		return this.getTangent(e, t);
	}
	copy(e) {
		return super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
	}
	fromJSON(e) {
		return super.fromJSON(e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
	}
}, ai = class extends Ir {
	constructor(e = new W(), t = new W()) {
		super(), this.isLineCurve3 = !0, this.type = "LineCurve3", this.v1 = e, this.v2 = t;
	}
	getPoint(e, t = new W()) {
		let n = t;
		return e === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(e).add(this.v1)), n;
	}
	getPointAt(e, t) {
		return this.getPoint(e, t);
	}
	getTangent(e, t = new W()) {
		return t.subVectors(this.v2, this.v1).normalize();
	}
	getTangentAt(e, t) {
		return this.getTangent(e, t);
	}
	copy(e) {
		return super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
	}
	fromJSON(e) {
		return super.fromJSON(e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
	}
}, oi = class extends Ir {
	constructor(e = new U(), t = new U(), n = new U()) {
		super(), this.isQuadraticBezierCurve = !0, this.type = "QuadraticBezierCurve", this.v0 = e, this.v1 = t, this.v2 = n;
	}
	getPoint(e, t = new U()) {
		let n = t, r = this.v0, i = this.v1, a = this.v2;
		return n.set(Xr(e, r.x, i.x, a.x), Xr(e, r.y, i.y, a.y)), n;
	}
	copy(e) {
		return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
	}
	fromJSON(e) {
		return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
	}
}, si = class extends Ir {
	constructor(e = new W(), t = new W(), n = new W()) {
		super(), this.isQuadraticBezierCurve3 = !0, this.type = "QuadraticBezierCurve3", this.v0 = e, this.v1 = t, this.v2 = n;
	}
	getPoint(e, t = new W()) {
		let n = t, r = this.v0, i = this.v1, a = this.v2;
		return n.set(Xr(e, r.x, i.x, a.x), Xr(e, r.y, i.y, a.y), Xr(e, r.z, i.z, a.z)), n;
	}
	copy(e) {
		return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
	}
	fromJSON(e) {
		return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
	}
}, ci = class extends Ir {
	constructor(e = []) {
		super(), this.isSplineCurve = !0, this.type = "SplineCurve", this.points = e;
	}
	getPoint(e, t = new U()) {
		let n = t, r = this.points, i = (r.length - 1) * e, a = Math.floor(i), o = i - a, s = r[a === 0 ? a : a - 1], c = r[a], l = r[a > r.length - 2 ? r.length - 1 : a + 1], u = r[a > r.length - 3 ? r.length - 1 : a + 2];
		return n.set(Kr(o, s.x, c.x, l.x, u.x), Kr(o, s.y, c.y, l.y, u.y)), n;
	}
	copy(e) {
		super.copy(e), this.points = [];
		for (let t = 0, n = e.points.length; t < n; t++) {
			let n = e.points[t];
			this.points.push(n.clone());
		}
		return this;
	}
	toJSON() {
		let e = super.toJSON();
		e.points = [];
		for (let t = 0, n = this.points.length; t < n; t++) {
			let n = this.points[t];
			e.points.push(n.toArray());
		}
		return e;
	}
	fromJSON(e) {
		super.fromJSON(e), this.points = [];
		for (let t = 0, n = e.points.length; t < n; t++) {
			let n = e.points[t];
			this.points.push(new U().fromArray(n));
		}
		return this;
	}
}, li = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	ArcCurve: Rr,
	CatmullRomCurve3: Gr,
	CubicBezierCurve: ni,
	CubicBezierCurve3: ri,
	EllipseCurve: Lr,
	LineCurve: ii,
	LineCurve3: ai,
	QuadraticBezierCurve: oi,
	QuadraticBezierCurve3: si,
	SplineCurve: ci
}), ui = class extends Ir {
	constructor() {
		super(), this.type = "CurvePath", this.curves = [], this.autoClose = !1;
	}
	add(e) {
		this.curves.push(e);
	}
	closePath() {
		let e = this.curves[0].getPoint(0), t = this.curves[this.curves.length - 1].getPoint(1);
		if (!e.equals(t)) {
			let n = e.isVector2 === !0 ? "LineCurve" : "LineCurve3";
			this.curves.push(new li[n](t, e));
		}
		return this;
	}
	getPoint(e, t) {
		let n = e * this.getLength(), r = this.getCurveLengths(), i = 0;
		for (; i < r.length;) {
			if (r[i] >= n) {
				let e = r[i] - n, a = this.curves[i], o = a.getLength(), s = o === 0 ? 0 : 1 - e / o;
				return a.getPointAt(s, t);
			}
			i++;
		}
		return null;
	}
	getLength() {
		let e = this.getCurveLengths();
		return e[e.length - 1];
	}
	updateArcLengths() {
		this.needsUpdate = !0, this.cacheLengths = null, this.getCurveLengths();
	}
	getCurveLengths() {
		if (this.cacheLengths && this.cacheLengths.length === this.curves.length) return this.cacheLengths;
		let e = [], t = 0;
		for (let n = 0, r = this.curves.length; n < r; n++) t += this.curves[n].getLength(), e.push(t);
		return this.cacheLengths = e, e;
	}
	getSpacedPoints(e = 40) {
		let t = [];
		for (let n = 0; n <= e; n++) t.push(this.getPoint(n / e));
		return this.autoClose && t.push(t[0]), t;
	}
	getPoints(e = 12) {
		let t = [], n;
		for (let r = 0, i = this.curves; r < i.length; r++) {
			let a = i[r], o = a.isEllipseCurve ? e * 2 : a.isLineCurve || a.isLineCurve3 ? 1 : a.isSplineCurve ? e * a.points.length : e, s = a.getPoints(o);
			for (let e = 0; e < s.length; e++) {
				let r = s[e];
				n && n.equals(r) || (t.push(r), n = r);
			}
		}
		return this.autoClose && t.length > 1 && !t[t.length - 1].equals(t[0]) && t.push(t[0]), t;
	}
	copy(e) {
		super.copy(e), this.curves = [];
		for (let t = 0, n = e.curves.length; t < n; t++) {
			let n = e.curves[t];
			this.curves.push(n.clone());
		}
		return this.autoClose = e.autoClose, this;
	}
	toJSON() {
		let e = super.toJSON();
		e.autoClose = this.autoClose, e.curves = [];
		for (let t = 0, n = this.curves.length; t < n; t++) {
			let n = this.curves[t];
			e.curves.push(n.toJSON());
		}
		return e;
	}
	fromJSON(e) {
		super.fromJSON(e), this.autoClose = e.autoClose, this.curves = [];
		for (let t = 0, n = e.curves.length; t < n; t++) {
			let n = e.curves[t];
			this.curves.push(new li[n.type]().fromJSON(n));
		}
		return this;
	}
}, di = class extends ui {
	constructor(e) {
		super(), this.type = "Path", this.currentPoint = new U(), e && this.setFromPoints(e);
	}
	setFromPoints(e) {
		this.moveTo(e[0].x, e[0].y);
		for (let t = 1, n = e.length; t < n; t++) this.lineTo(e[t].x, e[t].y);
		return this;
	}
	moveTo(e, t) {
		return this.currentPoint.set(e, t), this;
	}
	lineTo(e, t) {
		let n = new ii(this.currentPoint.clone(), new U(e, t));
		return this.curves.push(n), this.currentPoint.set(e, t), this;
	}
	quadraticCurveTo(e, t, n, r) {
		let i = new oi(this.currentPoint.clone(), new U(e, t), new U(n, r));
		return this.curves.push(i), this.currentPoint.set(n, r), this;
	}
	bezierCurveTo(e, t, n, r, i, a) {
		let o = new ni(this.currentPoint.clone(), new U(e, t), new U(n, r), new U(i, a));
		return this.curves.push(o), this.currentPoint.set(i, a), this;
	}
	splineThru(e) {
		let t = new ci([this.currentPoint.clone()].concat(e));
		return this.curves.push(t), this.currentPoint.copy(e[e.length - 1]), this;
	}
	arc(e, t, n, r, i, a) {
		let o = this.currentPoint.x, s = this.currentPoint.y;
		return this.absarc(e + o, t + s, n, r, i, a), this;
	}
	absarc(e, t, n, r, i, a) {
		return this.absellipse(e, t, n, n, r, i, a), this;
	}
	ellipse(e, t, n, r, i, a, o, s) {
		let c = this.currentPoint.x, l = this.currentPoint.y;
		return this.absellipse(e + c, t + l, n, r, i, a, o, s), this;
	}
	absellipse(e, t, n, r, i, a, o, s) {
		let c = new Lr(e, t, n, r, i, a, o, s);
		if (this.curves.length > 0) {
			let e = c.getPoint(0);
			e.equals(this.currentPoint) || this.lineTo(e.x, e.y);
		}
		this.curves.push(c);
		let l = c.getPoint(1);
		return this.currentPoint.copy(l), this;
	}
	copy(e) {
		return super.copy(e), this.currentPoint.copy(e.currentPoint), this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.currentPoint = this.currentPoint.toArray(), e;
	}
	fromJSON(e) {
		return super.fromJSON(e), this.currentPoint.fromArray(e.currentPoint), this;
	}
}, fi = class extends di {
	constructor(e) {
		super(e), this.uuid = ue(), this.type = "Shape", this.holes = [];
	}
	getPointsHoles(e) {
		let t = [];
		for (let n = 0, r = this.holes.length; n < r; n++) t[n] = this.holes[n].getPoints(e);
		return t;
	}
	extractPoints(e) {
		return {
			shape: this.getPoints(e),
			holes: this.getPointsHoles(e)
		};
	}
	copy(e) {
		super.copy(e), this.holes = [];
		for (let t = 0, n = e.holes.length; t < n; t++) {
			let n = e.holes[t];
			this.holes.push(n.clone());
		}
		return this;
	}
	toJSON() {
		let e = super.toJSON();
		e.uuid = this.uuid, e.holes = [];
		for (let t = 0, n = this.holes.length; t < n; t++) {
			let n = this.holes[t];
			e.holes.push(n.toJSON());
		}
		return e;
	}
	fromJSON(e) {
		super.fromJSON(e), this.uuid = e.uuid, this.holes = [];
		for (let t = 0, n = e.holes.length; t < n; t++) {
			let n = e.holes[t];
			this.holes.push(new di().fromJSON(n));
		}
		return this;
	}
};
function pi(e, t, n = 2) {
	let r = t && t.length, i = r ? t[0] * n : e.length, a = mi(e, 0, i, n, !0), o = [];
	if (!a || a.next === a.prev) return o;
	let s, c, l;
	if (r && (a = xi(e, t, a, n)), e.length > 80 * n) {
		s = e[0], c = e[1];
		let t = s, r = c;
		for (let a = n; a < i; a += n) {
			let n = e[a], i = e[a + 1];
			n < s && (s = n), i < c && (c = i), n > t && (t = n), i > r && (r = i);
		}
		l = Math.max(t - s, r - c), l = l === 0 ? 0 : 32767 / l;
	}
	return gi(a, o, n, s, c, l, 0), o;
}
function mi(e, t, n, r, i) {
	let a;
	if (i === Gi(e, t, n, r) > 0) for (let i = t; i < n; i += r) a = Hi(i / r | 0, e[i], e[i + 1], a);
	else for (let i = n - r; i >= t; i -= r) a = Hi(i / r | 0, e[i], e[i + 1], a);
	return a && Pi(a, a.next) && (Ui(a), a = a.next), a;
}
function hi(e, t) {
	if (!e) return e;
	t ||= e;
	let n = e, r;
	do
		if (r = !1, !n.steiner && (Pi(n, n.next) || Ni(n.prev, n, n.next) === 0)) {
			if (Ui(n), n = t = n.prev, n === n.next) break;
			r = !0;
		} else n = n.next;
	while (r || n !== t);
	return t;
}
function gi(e, t, n, r, i, a, o) {
	if (!e) return;
	!o && a && Ei(e, r, i, a);
	let s = e;
	for (; e.prev !== e.next;) {
		let c = e.prev, l = e.next;
		if (a ? vi(e, r, i, a) : _i(e)) {
			t.push(c.i, e.i, l.i), Ui(e), e = l.next, s = l.next;
			continue;
		}
		if (e = l, e === s) {
			o ? o === 1 ? (e = yi(hi(e), t), gi(e, t, n, r, i, a, 2)) : o === 2 && bi(e, t, n, r, i, a) : gi(hi(e), t, n, r, i, a, 1);
			break;
		}
	}
}
function _i(e) {
	let t = e.prev, n = e, r = e.next;
	if (Ni(t, n, r) >= 0) return !1;
	let i = t.x, a = n.x, o = r.x, s = t.y, c = n.y, l = r.y, u = Math.min(i, a, o), d = Math.min(s, c, l), f = Math.max(i, a, o), p = Math.max(s, c, l), m = r.next;
	for (; m !== t;) {
		if (m.x >= u && m.x <= f && m.y >= d && m.y <= p && ji(i, s, a, c, o, l, m.x, m.y) && Ni(m.prev, m, m.next) >= 0) return !1;
		m = m.next;
	}
	return !0;
}
function vi(e, t, n, r) {
	let i = e.prev, a = e, o = e.next;
	if (Ni(i, a, o) >= 0) return !1;
	let s = i.x, c = a.x, l = o.x, u = i.y, d = a.y, f = o.y, p = Math.min(s, c, l), m = Math.min(u, d, f), h = Math.max(s, c, l), g = Math.max(u, d, f), _ = Oi(p, m, t, n, r), v = Oi(h, g, t, n, r), y = e.prevZ, b = e.nextZ;
	for (; y && y.z >= _ && b && b.z <= v;) {
		if (y.x >= p && y.x <= h && y.y >= m && y.y <= g && y !== i && y !== o && ji(s, u, c, d, l, f, y.x, y.y) && Ni(y.prev, y, y.next) >= 0 || (y = y.prevZ, b.x >= p && b.x <= h && b.y >= m && b.y <= g && b !== i && b !== o && ji(s, u, c, d, l, f, b.x, b.y) && Ni(b.prev, b, b.next) >= 0)) return !1;
		b = b.nextZ;
	}
	for (; y && y.z >= _;) {
		if (y.x >= p && y.x <= h && y.y >= m && y.y <= g && y !== i && y !== o && ji(s, u, c, d, l, f, y.x, y.y) && Ni(y.prev, y, y.next) >= 0) return !1;
		y = y.prevZ;
	}
	for (; b && b.z <= v;) {
		if (b.x >= p && b.x <= h && b.y >= m && b.y <= g && b !== i && b !== o && ji(s, u, c, d, l, f, b.x, b.y) && Ni(b.prev, b, b.next) >= 0) return !1;
		b = b.nextZ;
	}
	return !0;
}
function yi(e, t) {
	let n = e;
	do {
		let r = n.prev, i = n.next.next;
		!Pi(r, i) && Fi(r, n, n.next, i) && zi(r, i) && zi(i, r) && (t.push(r.i, n.i, i.i), Ui(n), Ui(n.next), n = e = i), n = n.next;
	} while (n !== e);
	return hi(n);
}
function bi(e, t, n, r, i, a) {
	let o = e;
	do {
		let e = o.next.next;
		for (; e !== o.prev;) {
			if (o.i !== e.i && Mi(o, e)) {
				let s = Vi(o, e);
				o = hi(o, o.next), s = hi(s, s.next), gi(o, t, n, r, i, a, 0), gi(s, t, n, r, i, a, 0);
				return;
			}
			e = e.next;
		}
		o = o.next;
	} while (o !== e);
}
function xi(e, t, n, r) {
	let i = [];
	for (let n = 0, a = t.length; n < a; n++) {
		let o = mi(e, t[n] * r, n < a - 1 ? t[n + 1] * r : e.length, r, !1);
		o === o.next && (o.steiner = !0), i.push(ki(o));
	}
	i.sort(Si);
	for (let e = 0; e < i.length; e++) n = Ci(i[e], n);
	return n;
}
function Si(e, t) {
	let n = e.x - t.x;
	return n === 0 && (n = e.y - t.y, n === 0 && (n = (e.next.y - e.y) / (e.next.x - e.x) - (t.next.y - t.y) / (t.next.x - t.x))), n;
}
function Ci(e, t) {
	let n = wi(e, t);
	if (!n) return t;
	let r = Vi(n, e);
	return hi(r, r.next), hi(n, n.next);
}
function wi(e, t) {
	let n = t, r = e.x, i = e.y, a = -Infinity, o;
	if (Pi(e, n)) return n;
	do {
		if (Pi(e, n.next)) return n.next;
		if (i <= n.y && i >= n.next.y && n.next.y !== n.y) {
			let e = n.x + (i - n.y) * (n.next.x - n.x) / (n.next.y - n.y);
			if (e <= r && e > a && (a = e, o = n.x < n.next.x ? n : n.next, e === r)) return o;
		}
		n = n.next;
	} while (n !== t);
	if (!o) return null;
	let s = o, c = o.x, l = o.y, u = Infinity;
	n = o;
	do {
		if (r >= n.x && n.x >= c && r !== n.x && Ai(i < l ? r : a, i, c, l, i < l ? a : r, i, n.x, n.y)) {
			let t = Math.abs(i - n.y) / (r - n.x);
			zi(n, e) && (t < u || t === u && (n.x > o.x || n.x === o.x && Ti(o, n))) && (o = n, u = t);
		}
		n = n.next;
	} while (n !== s);
	return o;
}
function Ti(e, t) {
	return Ni(e.prev, e, t.prev) < 0 && Ni(t.next, e, e.next) < 0;
}
function Ei(e, t, n, r) {
	let i = e;
	do
		i.z === 0 && (i.z = Oi(i.x, i.y, t, n, r)), i.prevZ = i.prev, i.nextZ = i.next, i = i.next;
	while (i !== e);
	i.prevZ.nextZ = null, i.prevZ = null, Di(i);
}
function Di(e) {
	let t, n = 1;
	do {
		let r = e, i;
		e = null;
		let a = null;
		for (t = 0; r;) {
			t++;
			let o = r, s = 0;
			for (let e = 0; e < n && (s++, o = o.nextZ, o); e++);
			let c = n;
			for (; s > 0 || c > 0 && o;) s !== 0 && (c === 0 || !o || r.z <= o.z) ? (i = r, r = r.nextZ, s--) : (i = o, o = o.nextZ, c--), a ? a.nextZ = i : e = i, i.prevZ = a, a = i;
			r = o;
		}
		a.nextZ = null, n *= 2;
	} while (t > 1);
	return e;
}
function Oi(e, t, n, r, i) {
	return e = (e - n) * i | 0, t = (t - r) * i | 0, e = (e | e << 8) & 16711935, e = (e | e << 4) & 252645135, e = (e | e << 2) & 858993459, e = (e | e << 1) & 1431655765, t = (t | t << 8) & 16711935, t = (t | t << 4) & 252645135, t = (t | t << 2) & 858993459, t = (t | t << 1) & 1431655765, e | t << 1;
}
function ki(e) {
	let t = e, n = e;
	do
		(t.x < n.x || t.x === n.x && t.y < n.y) && (n = t), t = t.next;
	while (t !== e);
	return n;
}
function Ai(e, t, n, r, i, a, o, s) {
	return (i - o) * (t - s) >= (e - o) * (a - s) && (e - o) * (r - s) >= (n - o) * (t - s) && (n - o) * (a - s) >= (i - o) * (r - s);
}
function ji(e, t, n, r, i, a, o, s) {
	return (e !== o || t !== s) && Ai(e, t, n, r, i, a, o, s);
}
function Mi(e, t) {
	return e.next.i !== t.i && e.prev.i !== t.i && !Ri(e, t) && (zi(e, t) && zi(t, e) && Bi(e, t) && (Ni(e.prev, e, t.prev) || Ni(e, t.prev, t)) || Pi(e, t) && Ni(e.prev, e, e.next) > 0 && Ni(t.prev, t, t.next) > 0);
}
function Ni(e, t, n) {
	return (t.y - e.y) * (n.x - t.x) - (t.x - e.x) * (n.y - t.y);
}
function Pi(e, t) {
	return e.x === t.x && e.y === t.y;
}
function Fi(e, t, n, r) {
	let i = Li(Ni(e, t, n)), a = Li(Ni(e, t, r)), o = Li(Ni(n, r, e)), s = Li(Ni(n, r, t));
	return !!(i !== a && o !== s || i === 0 && Ii(e, n, t) || a === 0 && Ii(e, r, t) || o === 0 && Ii(n, e, r) || s === 0 && Ii(n, t, r));
}
function Ii(e, t, n) {
	return t.x <= Math.max(e.x, n.x) && t.x >= Math.min(e.x, n.x) && t.y <= Math.max(e.y, n.y) && t.y >= Math.min(e.y, n.y);
}
function Li(e) {
	return e > 0 ? 1 : e < 0 ? -1 : 0;
}
function Ri(e, t) {
	let n = e;
	do {
		if (n.i !== e.i && n.next.i !== e.i && n.i !== t.i && n.next.i !== t.i && Fi(n, n.next, e, t)) return !0;
		n = n.next;
	} while (n !== e);
	return !1;
}
function zi(e, t) {
	return Ni(e.prev, e, e.next) < 0 ? Ni(e, t, e.next) >= 0 && Ni(e, e.prev, t) >= 0 : Ni(e, t, e.prev) < 0 || Ni(e, e.next, t) < 0;
}
function Bi(e, t) {
	let n = e, r = !1, i = (e.x + t.x) / 2, a = (e.y + t.y) / 2;
	do
		n.y > a != n.next.y > a && n.next.y !== n.y && i < (n.next.x - n.x) * (a - n.y) / (n.next.y - n.y) + n.x && (r = !r), n = n.next;
	while (n !== e);
	return r;
}
function Vi(e, t) {
	let n = Wi(e.i, e.x, e.y), r = Wi(t.i, t.x, t.y), i = e.next, a = t.prev;
	return e.next = t, t.prev = e, n.next = i, i.prev = n, r.next = n, n.prev = r, a.next = r, r.prev = a, r;
}
function Hi(e, t, n, r) {
	let i = Wi(e, t, n);
	return r ? (i.next = r.next, i.prev = r, r.next.prev = i, r.next = i) : (i.prev = i, i.next = i), i;
}
function Ui(e) {
	e.next.prev = e.prev, e.prev.next = e.next, e.prevZ && (e.prevZ.nextZ = e.nextZ), e.nextZ && (e.nextZ.prevZ = e.prevZ);
}
function Wi(e, t, n) {
	return {
		i: e,
		x: t,
		y: n,
		prev: null,
		next: null,
		z: 0,
		prevZ: null,
		nextZ: null,
		steiner: !1
	};
}
function Gi(e, t, n, r) {
	let i = 0;
	for (let a = t, o = n - r; a < n; a += r) i += (e[o] - e[a]) * (e[a + 1] + e[o + 1]), o = a;
	return i;
}
var Ki = class {
	static triangulate(e, t, n = 2) {
		return pi(e, t, n);
	}
}, qi = class e {
	static area(e) {
		let t = e.length, n = 0;
		for (let r = t - 1, i = 0; i < t; r = i++) n += e[r].x * e[i].y - e[i].x * e[r].y;
		return n * .5;
	}
	static isClockWise(t) {
		return e.area(t) < 0;
	}
	static triangulateShape(e, t) {
		let n = [], r = [], i = [];
		Ji(e), Yi(n, e);
		let a = e.length;
		t.forEach(Ji);
		for (let e = 0; e < t.length; e++) r.push(a), a += t[e].length, Yi(n, t[e]);
		let o = Ki.triangulate(n, r);
		for (let e = 0; e < o.length; e += 3) i.push(o.slice(e, e + 3));
		return i;
	}
};
function Ji(e) {
	let t = e.length;
	t > 2 && e[t - 1].equals(e[0]) && e.pop();
}
function Yi(e, t) {
	for (let n = 0; n < t.length; n++) e.push(t[n].x), e.push(t[n].y);
}
var Xi = class e extends pn {
	constructor(e = new fi([
		new U(.5, .5),
		new U(-.5, .5),
		new U(-.5, -.5),
		new U(.5, -.5)
	]), t = {}) {
		super(), this.type = "ExtrudeGeometry", this.parameters = {
			shapes: e,
			options: t
		}, e = Array.isArray(e) ? e : [e];
		let n = this, r = [], i = [];
		for (let t = 0, n = e.length; t < n; t++) {
			let n = e[t];
			a(n);
		}
		this.setAttribute("position", new Y(r, 3)), this.setAttribute("uv", new Y(i, 2)), this.computeVertexNormals();
		function a(e) {
			let a = [], o = t.curveSegments === void 0 ? 12 : t.curveSegments, s = t.steps === void 0 ? 1 : t.steps, c = t.depth === void 0 ? 1 : t.depth, l = t.bevelEnabled === void 0 || t.bevelEnabled, u = t.bevelThickness === void 0 ? .2 : t.bevelThickness, d = t.bevelSize === void 0 ? u - .1 : t.bevelSize, f = t.bevelOffset === void 0 ? 0 : t.bevelOffset, p = t.bevelSegments === void 0 ? 3 : t.bevelSegments, m = t.extrudePath, h = t.UVGenerator === void 0 ? Zi : t.UVGenerator, g, _ = !1, v, y, b, x;
			if (m) {
				g = m.getSpacedPoints(s), _ = !0, l = !1;
				let e = m.isCatmullRomCurve3 ? m.closed : !1;
				v = m.computeFrenetFrames(s, e), y = new W(), b = new W(), x = new W();
			}
			l || (p = 0, u = 0, d = 0, f = 0);
			let S = e.extractPoints(o), C = S.shape, w = S.holes;
			if (!qi.isClockWise(C)) {
				C = C.reverse();
				for (let e = 0, t = w.length; e < t; e++) {
					let t = w[e];
					qi.isClockWise(t) && (w[e] = t.reverse());
				}
			}
			function T(e) {
				let t = e[0];
				for (let n = 1; n <= e.length; n++) {
					let r = n % e.length, i = e[r], a = i.x - t.x, o = i.y - t.y, s = a * a + o * o, c = Math.max(Math.abs(i.x), Math.abs(i.y), Math.abs(t.x), Math.abs(t.y));
					if (s <= 10000000000000001e-36 * c * c) {
						e.splice(r, 1), n--;
						continue;
					}
					t = i;
				}
			}
			T(C), w.forEach(T);
			let E = w.length, D = C;
			for (let e = 0; e < E; e++) {
				let t = w[e];
				C = C.concat(t);
			}
			function O(e, t, n) {
				return t || B("ExtrudeGeometry: vec does not exist"), e.clone().addScaledVector(t, n);
			}
			let k = C.length;
			function A(e, t, n) {
				let r, i, a, o = e.x - t.x, s = e.y - t.y, c = n.x - e.x, l = n.y - e.y, u = o * o + s * s, d = o * l - s * c;
				if (Math.abs(d) > 2 ** -52) {
					let d = Math.sqrt(u), f = Math.sqrt(c * c + l * l), p = t.x - s / d, m = t.y + o / d, h = n.x - l / f, g = n.y + c / f, _ = ((h - p) * l - (g - m) * c) / (o * l - s * c);
					r = p + o * _ - e.x, i = m + s * _ - e.y;
					let v = r * r + i * i;
					if (v <= 2) return new U(r, i);
					a = Math.sqrt(v / 2);
				} else {
					let e = !1;
					o > 2 ** -52 ? c > 2 ** -52 && (e = !0) : o < -(2 ** -52) ? c < -(2 ** -52) && (e = !0) : Math.sign(s) === Math.sign(l) && (e = !0), e ? (r = -s, i = o, a = Math.sqrt(u)) : (r = o, i = s, a = Math.sqrt(u / 2));
				}
				return new U(r / a, i / a);
			}
			let j = [];
			for (let e = 0, t = D.length, n = t - 1, r = e + 1; e < t; e++, n++, r++) n === t && (n = 0), r === t && (r = 0), j[e] = A(D[e], D[n], D[r]);
			let M = [], N, P = j.concat();
			for (let e = 0, t = E; e < t; e++) {
				let t = w[e];
				N = [];
				for (let e = 0, n = t.length, r = n - 1, i = e + 1; e < n; e++, r++, i++) r === n && (r = 0), i === n && (i = 0), N[e] = A(t[e], t[r], t[i]);
				M.push(N), P = P.concat(N);
			}
			let F;
			if (p === 0) F = qi.triangulateShape(D, w);
			else {
				let e = [], t = [];
				for (let n = 0; n < p; n++) {
					let r = n / p, i = u * Math.cos(r * Math.PI / 2), a = d * Math.sin(r * Math.PI / 2) + f;
					for (let t = 0, n = D.length; t < n; t++) {
						let n = O(D[t], j[t], a);
						re(n.x, n.y, -i), r === 0 && e.push(n);
					}
					for (let e = 0, n = E; e < n; e++) {
						let n = w[e];
						N = M[e];
						let o = [];
						for (let e = 0, t = n.length; e < t; e++) {
							let t = O(n[e], N[e], a);
							re(t.x, t.y, -i), r === 0 && o.push(t);
						}
						r === 0 && t.push(o);
					}
				}
				F = qi.triangulateShape(e, t);
			}
			let I = F.length, ee = d + f;
			for (let e = 0; e < k; e++) {
				let t = l ? O(C[e], P[e], ee) : C[e];
				_ ? (b.copy(v.normals[0]).multiplyScalar(t.x), y.copy(v.binormals[0]).multiplyScalar(t.y), x.copy(g[0]).add(b).add(y), re(x.x, x.y, x.z)) : re(t.x, t.y, 0);
			}
			for (let e = 1; e <= s; e++) for (let t = 0; t < k; t++) {
				let n = l ? O(C[t], P[t], ee) : C[t];
				_ ? (b.copy(v.normals[e]).multiplyScalar(n.x), y.copy(v.binormals[e]).multiplyScalar(n.y), x.copy(g[e]).add(b).add(y), re(x.x, x.y, x.z)) : re(n.x, n.y, c / s * e);
			}
			for (let e = p - 1; e >= 0; e--) {
				let t = e / p, n = u * Math.cos(t * Math.PI / 2), r = d * Math.sin(t * Math.PI / 2) + f;
				for (let e = 0, t = D.length; e < t; e++) {
					let t = O(D[e], j[e], r);
					re(t.x, t.y, c + n);
				}
				for (let e = 0, t = w.length; e < t; e++) {
					let t = w[e];
					N = M[e];
					for (let e = 0, i = t.length; e < i; e++) {
						let i = O(t[e], N[e], r);
						_ ? re(i.x, i.y + g[s - 1].y, g[s - 1].x + n) : re(i.x, i.y, c + n);
					}
				}
			}
			L(), te();
			function L() {
				let e = r.length / 3;
				if (l) {
					let e = 0, t = k * e;
					for (let e = 0; e < I; e++) {
						let n = F[e];
						R(n[2] + t, n[1] + t, n[0] + t);
					}
					e = s + p * 2, t = k * e;
					for (let e = 0; e < I; e++) {
						let n = F[e];
						R(n[0] + t, n[1] + t, n[2] + t);
					}
				} else {
					for (let e = 0; e < I; e++) {
						let t = F[e];
						R(t[2], t[1], t[0]);
					}
					for (let e = 0; e < I; e++) {
						let t = F[e];
						R(t[0] + k * s, t[1] + k * s, t[2] + k * s);
					}
				}
				n.addGroup(e, r.length / 3 - e, 0);
			}
			function te() {
				let e = r.length / 3, t = 0;
				ne(D, t), t += D.length;
				for (let e = 0, n = w.length; e < n; e++) {
					let n = w[e];
					ne(n, t), t += n.length;
				}
				n.addGroup(e, r.length / 3 - e, 1);
			}
			function ne(e, t) {
				let n = e.length;
				for (; --n >= 0;) {
					let r = n, i = n - 1;
					i < 0 && (i = e.length - 1);
					for (let e = 0, n = s + p * 2; e < n; e++) {
						let n = k * e, a = k * (e + 1);
						z(t + r + n, t + i + n, t + i + a, t + r + a);
					}
				}
			}
			function re(e, t, n) {
				a.push(e), a.push(t), a.push(n);
			}
			function R(e, t, i) {
				V(e), V(t), V(i);
				let a = r.length / 3, o = h.generateTopUV(n, r, a - 3, a - 2, a - 1);
				ie(o[0]), ie(o[1]), ie(o[2]);
			}
			function z(e, t, i, a) {
				V(e), V(t), V(a), V(t), V(i), V(a);
				let o = r.length / 3, s = h.generateSideWallUV(n, r, o - 6, o - 3, o - 2, o - 1);
				ie(s[0]), ie(s[1]), ie(s[3]), ie(s[1]), ie(s[2]), ie(s[3]);
			}
			function V(e) {
				r.push(a[e * 3 + 0]), r.push(a[e * 3 + 1]), r.push(a[e * 3 + 2]);
			}
			function ie(e) {
				i.push(e.x), i.push(e.y);
			}
		}
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	toJSON() {
		let e = super.toJSON(), t = this.parameters.shapes, n = this.parameters.options;
		return Qi(t, n, e);
	}
	static fromJSON(t, n) {
		let r = [];
		for (let e = 0, i = t.shapes.length; e < i; e++) {
			let i = n[t.shapes[e]];
			r.push(i);
		}
		let i = t.options.extrudePath;
		return i !== void 0 && (t.options.extrudePath = new li[i.type]().fromJSON(i)), new e(r, t.options);
	}
}, Zi = {
	generateTopUV: function(e, t, n, r, i) {
		let a = t[n * 3], o = t[n * 3 + 1], s = t[r * 3], c = t[r * 3 + 1], l = t[i * 3], u = t[i * 3 + 1];
		return [
			new U(a, o),
			new U(s, c),
			new U(l, u)
		];
	},
	generateSideWallUV: function(e, t, n, r, i, a) {
		let o = t[n * 3], s = t[n * 3 + 1], c = t[n * 3 + 2], l = t[r * 3], u = t[r * 3 + 1], d = t[r * 3 + 2], f = t[i * 3], p = t[i * 3 + 1], m = t[i * 3 + 2], h = t[a * 3], g = t[a * 3 + 1], _ = t[a * 3 + 2];
		return Math.abs(s - u) < Math.abs(o - l) ? [
			new U(o, 1 - c),
			new U(l, 1 - d),
			new U(f, 1 - m),
			new U(h, 1 - _)
		] : [
			new U(s, 1 - c),
			new U(u, 1 - d),
			new U(p, 1 - m),
			new U(g, 1 - _)
		];
	}
};
function Qi(e, t, n) {
	if (n.shapes = [], Array.isArray(e)) for (let t = 0, r = e.length; t < r; t++) {
		let r = e[t];
		n.shapes.push(r.uuid);
	}
	else n.shapes.push(e.uuid);
	return n.options = Object.assign({}, t), t.extrudePath !== void 0 && (n.options.extrudePath = t.extrudePath.toJSON()), n;
}
var $i = class e extends pn {
	constructor(e = [
		new U(0, -.5),
		new U(.5, 0),
		new U(0, .5)
	], t = 12, n = 0, r = Math.PI * 2) {
		super(), this.type = "LatheGeometry", this.parameters = {
			points: e,
			segments: t,
			phiStart: n,
			phiLength: r
		}, t = Math.floor(t), r = H(r, 0, Math.PI * 2);
		let i = [], a = [], o = [], s = [], c = [], l = 1 / t, u = new W(), d = new U(), f = new W(), p = new W(), m = new W(), h = 0, g = 0;
		for (let t = 0; t <= e.length - 1; t++) switch (t) {
			case 0:
				h = e[t + 1].x - e[t].x, g = e[t + 1].y - e[t].y, f.x = g * 1, f.y = -h, f.z = g * 0, m.copy(f), f.normalize(), s.push(f.x, f.y, f.z);
				break;
			case e.length - 1:
				s.push(m.x, m.y, m.z);
				break;
			default: h = e[t + 1].x - e[t].x, g = e[t + 1].y - e[t].y, f.x = g * 1, f.y = -h, f.z = g * 0, p.copy(f), f.x += m.x, f.y += m.y, f.z += m.z, f.normalize(), s.push(f.x, f.y, f.z), m.copy(p);
		}
		for (let i = 0; i <= t; i++) {
			let f = n + i * l * r, p = Math.sin(f), m = Math.cos(f);
			for (let n = 0; n <= e.length - 1; n++) {
				u.x = e[n].x * p, u.y = e[n].y, u.z = e[n].x * m, a.push(u.x, u.y, u.z), d.x = i / t, d.y = n / (e.length - 1), o.push(d.x, d.y);
				let r = s[3 * n + 0] * p, l = s[3 * n + 1], f = s[3 * n + 0] * m;
				c.push(r, l, f);
			}
		}
		for (let n = 0; n < t; n++) for (let t = 0; t < e.length - 1; t++) {
			let r = t + n * e.length, a = r, o = r + e.length, s = r + e.length + 1, c = r + 1;
			i.push(a, o, c), i.push(s, c, o);
		}
		this.setIndex(i), this.setAttribute("position", new Y(a, 3)), this.setAttribute("uv", new Y(o, 2)), this.setAttribute("normal", new Y(c, 3));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.points, t.segments, t.phiStart, t.phiLength);
	}
}, ea = class e extends pn {
	constructor(e = 1, t = 1, n = 1, r = 1) {
		super(), this.type = "PlaneGeometry", this.parameters = {
			width: e,
			height: t,
			widthSegments: n,
			heightSegments: r
		};
		let i = e / 2, a = t / 2, o = Math.floor(n), s = Math.floor(r), c = o + 1, l = s + 1, u = e / o, d = t / s, f = [], p = [], m = [], h = [];
		for (let e = 0; e < l; e++) {
			let t = e * d - a;
			for (let n = 0; n < c; n++) {
				let r = n * u - i;
				p.push(r, -t, 0), m.push(0, 0, 1), h.push(n / o), h.push(1 - e / s);
			}
		}
		for (let e = 0; e < s; e++) for (let t = 0; t < o; t++) {
			let n = t + c * e, r = t + c * (e + 1), i = t + 1 + c * (e + 1), a = t + 1 + c * e;
			f.push(n, r, a), f.push(r, i, a);
		}
		this.setIndex(f), this.setAttribute("position", new Y(p, 3)), this.setAttribute("normal", new Y(m, 3)), this.setAttribute("uv", new Y(h, 2));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.width, t.height, t.widthSegments, t.heightSegments);
	}
}, ta = class e extends pn {
	constructor(e = new fi([
		new U(0, .5),
		new U(-.5, -.5),
		new U(.5, -.5)
	]), t = 12) {
		super(), this.type = "ShapeGeometry", this.parameters = {
			shapes: e,
			curveSegments: t
		};
		let n = [], r = [], i = [], a = [], o = 0, s = 0;
		if (Array.isArray(e) === !1) c(e);
		else for (let t = 0; t < e.length; t++) c(e[t]), this.addGroup(o, s, t), o += s, s = 0;
		this.setIndex(n), this.setAttribute("position", new Y(r, 3)), this.setAttribute("normal", new Y(i, 3)), this.setAttribute("uv", new Y(a, 2));
		function c(e) {
			let o = r.length / 3, c = e.extractPoints(t), l = c.shape, u = c.holes;
			qi.isClockWise(l) === !1 && (l = l.reverse());
			for (let e = 0, t = u.length; e < t; e++) {
				let t = u[e];
				qi.isClockWise(t) === !0 && (u[e] = t.reverse());
			}
			let d = qi.triangulateShape(l, u);
			for (let e = 0, t = u.length; e < t; e++) {
				let t = u[e];
				l = l.concat(t);
			}
			for (let e = 0, t = l.length; e < t; e++) {
				let t = l[e];
				r.push(t.x, t.y, 0), i.push(0, 0, 1), a.push(t.x, t.y);
			}
			for (let e = 0, t = d.length; e < t; e++) {
				let t = d[e], r = t[0] + o, i = t[1] + o, a = t[2] + o;
				n.push(r, i, a), s += 3;
			}
		}
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	toJSON() {
		let e = super.toJSON(), t = this.parameters.shapes;
		return na(t, e);
	}
	static fromJSON(t, n) {
		let r = [];
		for (let e = 0, i = t.shapes.length; e < i; e++) {
			let i = n[t.shapes[e]];
			r.push(i);
		}
		return new e(r, t.curveSegments);
	}
};
function na(e, t) {
	if (t.shapes = [], Array.isArray(e)) for (let n = 0, r = e.length; n < r; n++) {
		let r = e[n];
		t.shapes.push(r.uuid);
	}
	else t.shapes.push(e.uuid);
	return t;
}
var ra = class e extends pn {
	constructor(e = 1, t = 32, n = 16, r = 0, i = Math.PI * 2, a = 0, o = Math.PI) {
		super(), this.type = "SphereGeometry", this.parameters = {
			radius: e,
			widthSegments: t,
			heightSegments: n,
			phiStart: r,
			phiLength: i,
			thetaStart: a,
			thetaLength: o
		}, t = Math.max(3, Math.floor(t)), n = Math.max(2, Math.floor(n));
		let s = Math.min(a + o, Math.PI), c = 0, l = [], u = new W(), d = new W(), f = [], p = [], m = [], h = [];
		for (let f = 0; f <= n; f++) {
			let g = [], _ = f / n, v = a + _ * o, y = e * Math.cos(v), b = Math.sqrt(e * e - y * y), x = 0;
			f === 0 && a === 0 ? x = .5 / t : f === n && s === Math.PI && (x = -.5 / t);
			for (let e = 0; e <= t; e++) {
				let n = e / t, a = r + n * i;
				u.x = -b * Math.cos(a), u.y = y, u.z = b * Math.sin(a), p.push(u.x, u.y, u.z), d.copy(u).normalize(), m.push(d.x, d.y, d.z), h.push(n + x, 1 - _), g.push(c++);
			}
			l.push(g);
		}
		for (let e = 0; e < n; e++) for (let r = 0; r < t; r++) {
			let t = l[e][r + 1], i = l[e][r], o = l[e + 1][r], c = l[e + 1][r + 1];
			(e !== 0 || a > 0) && f.push(t, i, c), (e !== n - 1 || s < Math.PI) && f.push(i, o, c);
		}
		this.setIndex(f), this.setAttribute("position", new Y(p, 3)), this.setAttribute("normal", new Y(m, 3)), this.setAttribute("uv", new Y(h, 2));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.radius, t.widthSegments, t.heightSegments, t.phiStart, t.phiLength, t.thetaStart, t.thetaLength);
	}
}, ia = class e extends pn {
	constructor(e = 1, t = .4, n = 12, r = 48, i = Math.PI * 2, a = 0, o = Math.PI * 2) {
		super(), this.type = "TorusGeometry", this.parameters = {
			radius: e,
			tube: t,
			radialSegments: n,
			tubularSegments: r,
			arc: i,
			thetaStart: a,
			thetaLength: o
		}, n = Math.floor(n), r = Math.floor(r);
		let s = [], c = [], l = [], u = [], d = new W(), f = new W(), p = new W();
		for (let s = 0; s <= n; s++) {
			let m = a + s / n * o;
			for (let a = 0; a <= r; a++) {
				let o = a / r * i;
				f.x = (e + t * Math.cos(m)) * Math.cos(o), f.y = (e + t * Math.cos(m)) * Math.sin(o), f.z = t * Math.sin(m), c.push(f.x, f.y, f.z), d.x = e * Math.cos(o), d.y = e * Math.sin(o), p.subVectors(f, d).normalize(), l.push(p.x, p.y, p.z), u.push(a / r), u.push(s / n);
			}
		}
		for (let e = 1; e <= n; e++) for (let t = 1; t <= r; t++) {
			let n = (r + 1) * e + t - 1, i = (r + 1) * (e - 1) + t - 1, a = (r + 1) * (e - 1) + t, o = (r + 1) * e + t;
			s.push(n, i, o), s.push(i, a, o);
		}
		this.setIndex(s), this.setAttribute("position", new Y(c, 3)), this.setAttribute("normal", new Y(l, 3)), this.setAttribute("uv", new Y(u, 2));
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	static fromJSON(t) {
		return new e(t.radius, t.tube, t.radialSegments, t.tubularSegments, t.arc, t.thetaStart, t.thetaLength);
	}
}, aa = class e extends pn {
	constructor(e = new si(new W(-1, -1, 0), new W(-1, 1, 0), new W(1, 1, 0)), t = 64, n = 1, r = 8, i = !1) {
		super(), this.type = "TubeGeometry", this.parameters = {
			path: e,
			tubularSegments: t,
			radius: n,
			radialSegments: r,
			closed: i
		};
		let a = e.computeFrenetFrames(t, i);
		this.tangents = a.tangents, this.normals = a.normals, this.binormals = a.binormals;
		let o = new W(), s = new W(), c = new U(), l = new W(), u = [], d = [], f = [], p = [];
		m(), this.setIndex(p), this.setAttribute("position", new Y(u, 3)), this.setAttribute("normal", new Y(d, 3)), this.setAttribute("uv", new Y(f, 2));
		function m() {
			for (let e = 0; e < t; e++) h(e);
			h(i === !1 ? t : 0), _(), g();
		}
		function h(i) {
			l = e.getPointAt(i / t, l);
			let c = a.normals[i], f = a.binormals[i];
			for (let e = 0; e <= r; e++) {
				let t = e / r * Math.PI * 2, i = Math.sin(t), a = -Math.cos(t);
				s.x = a * c.x + i * f.x, s.y = a * c.y + i * f.y, s.z = a * c.z + i * f.z, s.normalize(), d.push(s.x, s.y, s.z), o.x = l.x + n * s.x, o.y = l.y + n * s.y, o.z = l.z + n * s.z, u.push(o.x, o.y, o.z);
			}
		}
		function g() {
			for (let e = 1; e <= t; e++) for (let t = 1; t <= r; t++) {
				let n = (r + 1) * (e - 1) + (t - 1), i = (r + 1) * e + (t - 1), a = (r + 1) * e + t, o = (r + 1) * (e - 1) + t;
				p.push(n, i, o), p.push(i, a, o);
			}
		}
		function _() {
			for (let e = 0; e <= t; e++) for (let n = 0; n <= r; n++) c.x = e / t, c.y = n / r, f.push(c.x, c.y);
		}
	}
	copy(e) {
		return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.path = this.parameters.path.toJSON(), e;
	}
	static fromJSON(t) {
		return new e(new li[t.path.type]().fromJSON(t.path), t.tubularSegments, t.radius, t.radialSegments, t.closed);
	}
};
function oa(e) {
	let t = {};
	for (let n in e) {
		t[n] = {};
		for (let r in e[n]) {
			let i = e[n][r];
			if (ca(i)) i.isRenderTargetTexture ? (z("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), t[n][r] = null) : t[n][r] = i.clone();
			else if (Array.isArray(i)) {
				if (ca(i[0])) {
					let e = [];
					for (let t = 0, n = i.length; t < n; t++) e[t] = i[t].clone();
					t[n][r] = e;
				} else t[n][r] = i.slice();
			} else t[n][r] = i;
		}
	}
	return t;
}
function sa(e) {
	let t = {};
	for (let n = 0; n < e.length; n++) {
		let r = oa(e[n]);
		for (let e in r) t[e] = r[e];
	}
	return t;
}
function ca(e) {
	return e && (e.isColor || e.isMatrix3 || e.isMatrix4 || e.isVector2 || e.isVector3 || e.isVector4 || e.isTexture || e.isQuaternion);
}
function la(e) {
	let t = [];
	for (let n = 0; n < e.length; n++) t.push(e[n].clone());
	return t;
}
function ua(e) {
	let t = e.getRenderTarget();
	return t === null ? e.outputColorSpace : t.isXRRenderTarget === !0 ? t.texture.colorSpace : Se.workingColorSpace;
}
var da = {
	clone: oa,
	merge: sa
}, fa = "void main() {\n	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}", pa = "void main() {\n	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}", ma = class extends Sn {
	constructor(e) {
		super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = fa, this.fragmentShader = pa, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
			clipCullDistance: !1,
			multiDraw: !1
		}, this.defaultAttributeValues = {
			color: [
				1,
				1,
				1
			],
			uv: [0, 0],
			uv1: [0, 0]
		}, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = oa(e.uniforms), this.uniformsGroups = la(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this.defaultAttributeValues = Object.assign({}, e.defaultAttributeValues), this.index0AttributeName = e.index0AttributeName, this.uniformsNeedUpdate = e.uniformsNeedUpdate, this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		t.glslVersion = this.glslVersion, t.uniforms = {};
		for (let n in this.uniforms) {
			let r = this.uniforms[n].value;
			r && r.isTexture ? t.uniforms[n] = {
				type: "t",
				value: r.toJSON(e).uuid
			} : r && r.isColor ? t.uniforms[n] = {
				type: "c",
				value: r.getHex()
			} : r && r.isVector2 ? t.uniforms[n] = {
				type: "v2",
				value: r.toArray()
			} : r && r.isVector3 ? t.uniforms[n] = {
				type: "v3",
				value: r.toArray()
			} : r && r.isVector4 ? t.uniforms[n] = {
				type: "v4",
				value: r.toArray()
			} : r && r.isMatrix3 ? t.uniforms[n] = {
				type: "m3",
				value: r.toArray()
			} : r && r.isMatrix4 ? t.uniforms[n] = {
				type: "m4",
				value: r.toArray()
			} : t.uniforms[n] = { value: r };
		}
		Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
		let n = {};
		for (let e in this.extensions) this.extensions[e] === !0 && (n[e] = !0);
		return Object.keys(n).length > 0 && (t.extensions = n), t;
	}
	fromJSON(e, t) {
		if (super.fromJSON(e, t), e.uniforms !== void 0) for (let n in e.uniforms) {
			let r = e.uniforms[n];
			switch (this.uniforms[n] = {}, r.type) {
				case "t":
					this.uniforms[n].value = t[r.value] || null;
					break;
				case "c":
					this.uniforms[n].value = new J().setHex(r.value);
					break;
				case "v2":
					this.uniforms[n].value = new U().fromArray(r.value);
					break;
				case "v3":
					this.uniforms[n].value = new W().fromArray(r.value);
					break;
				case "v4":
					this.uniforms[n].value = new Me().fromArray(r.value);
					break;
				case "m3":
					this.uniforms[n].value = new G().fromArray(r.value);
					break;
				case "m4":
					this.uniforms[n].value = new Le().fromArray(r.value);
					break;
				default: this.uniforms[n].value = r.value;
			}
		}
		if (e.defines !== void 0 && (this.defines = e.defines), e.vertexShader !== void 0 && (this.vertexShader = e.vertexShader), e.fragmentShader !== void 0 && (this.fragmentShader = e.fragmentShader), e.glslVersion !== void 0 && (this.glslVersion = e.glslVersion), e.extensions !== void 0) for (let t in e.extensions) this.extensions[t] = e.extensions[t];
		return e.lights !== void 0 && (this.lights = e.lights), e.clipping !== void 0 && (this.clipping = e.clipping), this;
	}
}, ha = class extends ma {
	constructor(e) {
		super(e), this.isRawShaderMaterial = !0, this.type = "RawShaderMaterial";
	}
}, ga = class extends Sn {
	constructor(e) {
		super(), this.isMeshStandardMaterial = !0, this.type = "MeshStandardMaterial", this.defines = { STANDARD: "" }, this.color = new J(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new J(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new U(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Ke(), this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.defines = { STANDARD: "" }, this.color.copy(e.color), this.roughness = e.roughness, this.metalness = e.metalness, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.roughnessMap = e.roughnessMap, this.metalnessMap = e.metalnessMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.envMapIntensity = e.envMapIntensity, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
	}
}, _a = class extends Sn {
	constructor(e) {
		super(), this.isMeshLambertMaterial = !0, this.type = "MeshLambertMaterial", this.color = new J(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new J(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = 0, this.normalScale = new U(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new Ke(), this.combine = 0, this.reflectivity = 1, this.envMapIntensity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.envMapIntensity = e.envMapIntensity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
	}
}, va = class extends Sn {
	constructor(e) {
		super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = 3200, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
	}
}, ya = class extends Sn {
	constructor(e) {
		super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
	}
	copy(e) {
		return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
	}
};
function ba(e, t) {
	return !e || e.constructor === t ? e : typeof t.BYTES_PER_ELEMENT == "number" ? new t(e) : Array.prototype.slice.call(e);
}
function xa(e) {
	return e !== void 0 && e.inTangents !== void 0 && e.outTangents !== void 0;
}
var Sa = class {
	constructor(e, t, n, r) {
		this.parameterPositions = e, this._cachedIndex = 0, this.resultBuffer = r === void 0 ? new t.constructor(n) : r, this.sampleValues = t, this.valueSize = n, this.settings = null, this.DefaultSettings_ = {};
	}
	evaluate(e) {
		let t = this.parameterPositions, n = this._cachedIndex, r = t[n], i = t[n - 1];
		validate_interval: {
			seek: {
				let a;
				linear_scan: {
					forward_scan: if (!(e < r)) {
						for (let a = n + 2;;) {
							if (r === void 0) {
								if (e < i) break forward_scan;
								return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
							}
							if (n === a) break;
							if (i = r, r = t[++n], e < r) break seek;
						}
						a = t.length;
						break linear_scan;
					}
					if (!(e >= i)) {
						let o = t[1];
						e < o && (n = 2, i = o);
						for (let a = n - 2;;) {
							if (i === void 0) return this._cachedIndex = 0, this.copySampleValue_(0);
							if (n === a) break;
							if (r = i, i = t[--n - 1], e >= i) break seek;
						}
						a = n, n = 0;
						break linear_scan;
					}
					break validate_interval;
				}
				for (; n < a;) {
					let r = n + a >>> 1;
					e < t[r] ? a = r : n = r + 1;
				}
				if (r = t[n], i = t[n - 1], i === void 0) return this._cachedIndex = 0, this.copySampleValue_(0);
				if (r === void 0) return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
			}
			this._cachedIndex = n, this.intervalChanged_(n, i, r);
		}
		return this.interpolate_(n, i, e, r);
	}
	getSettings_() {
		return this.settings || this.DefaultSettings_;
	}
	copySampleValue_(e) {
		let t = this.resultBuffer, n = this.sampleValues, r = this.valueSize, i = e * r;
		for (let e = 0; e !== r; ++e) t[e] = n[i + e];
		return t;
	}
	interpolate_() {
		throw Error("THREE.Interpolant: Call to abstract method.");
	}
	intervalChanged_() {}
}, Ca = class extends Sa {
	constructor(e, t, n, r) {
		super(e, t, n, r), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
			endingStart: E,
			endingEnd: E
		};
	}
	intervalChanged_(e, t, n) {
		let r = this.parameterPositions, i = e - 2, a = e + 1, o = r[i], s = r[a];
		if (o === void 0) switch (this.getSettings_().endingStart) {
			case D:
				i = e, o = 2 * t - n;
				break;
			case O:
				i = r.length - 2, o = t + r[i] - r[i + 1];
				break;
			default: i = e, o = n;
		}
		if (s === void 0) switch (this.getSettings_().endingEnd) {
			case D:
				a = e, s = 2 * n - t;
				break;
			case O:
				a = 1, s = n + r[1] - r[0];
				break;
			default: a = e - 1, s = t;
		}
		let c = (n - t) * .5, l = this.valueSize;
		this._weightPrev = c / (t - o), this._weightNext = c / (s - n), this._offsetPrev = i * l, this._offsetNext = a * l;
	}
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = s - o, l = this._offsetPrev, u = this._offsetNext, d = this._weightPrev, f = this._weightNext, p = (n - t) / (r - t), m = p * p, h = m * p, g = -d * h + 2 * d * m - d * p, _ = (1 + d) * h + (-1.5 - 2 * d) * m + (-.5 + d) * p + 1, v = (-1 - f) * h + (1.5 + f) * m + .5 * p, y = f * h - f * m;
		for (let e = 0; e !== o; ++e) i[e] = g * a[l + e] + _ * a[c + e] + v * a[s + e] + y * a[u + e];
		return i;
	}
}, wa = class extends Sa {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = s - o, l = (n - t) / (r - t), u = 1 - l;
		for (let e = 0; e !== o; ++e) i[e] = a[c + e] * u + a[s + e] * l;
		return i;
	}
}, Ta = class extends Sa {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	interpolate_(e) {
		return this.copySampleValue_(e - 1);
	}
}, Ea = class extends Sa {
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = e * o, c = s - o, l = this.inTangents, u = this.outTangents;
		if (!l || !u) {
			let e = (n - t) / (r - t), l = 1 - e;
			for (let t = 0; t !== o; ++t) i[t] = a[c + t] * l + a[s + t] * e;
			return i;
		}
		let d = o * 2, f = e - 1;
		for (let p = 0; p !== o; ++p) {
			let o = a[c + p], m = a[s + p], h = f * d + p * 2, g = u[h], _ = u[h + 1], v = e * d + p * 2, y = l[v], b = l[v + 1], x = ka(n, t, g, y, r);
			i[p] = Da(x, o, _, b, m);
		}
		return i;
	}
};
function Da(e, t, n, r, i) {
	let a = 1 - e;
	return a * a * a * t + 3 * a * a * e * n + 3 * a * e * e * r + e * e * e * i;
}
function Oa(e, t, n, r, i) {
	let a = 1 - e;
	return 3 * a * a * (n - t) + 6 * a * e * (r - n) + 3 * e * e * (i - r);
}
function ka(e, t, n, r, i) {
	let a = (e - t) / (i - t);
	for (let o = 0; o < 8; o++) {
		let o = Da(a, t, n, r, i) - e;
		if (Math.abs(o) < 1e-10) break;
		let s = Oa(a, t, n, r, i);
		if (Math.abs(s) < 1e-10) break;
		a = Math.max(0, Math.min(1, a - o / s));
	}
	return a;
}
var Aa = class {
	constructor(e, t, n, r) {
		if (e === void 0) throw Error("THREE.KeyframeTrack: track name is undefined");
		if (t === void 0 || t.length === 0) throw Error("THREE.KeyframeTrack: no keyframes in track named " + e);
		this.name = e, this.times = ba(t, this.TimeBufferType), this.values = ba(n, this.ValueBufferType), this.setInterpolation(r || this.DefaultInterpolation);
	}
	static toJSON(e) {
		let t = e.constructor, n;
		if (t.toJSON !== this.toJSON) n = t.toJSON(e);
		else {
			n = {
				name: e.name,
				times: ba(e.times, Array),
				values: ba(e.values, Array)
			};
			let t = e.getInterpolation();
			t !== e.DefaultInterpolation && (n.interpolation = t), xa(e.settings) && (n.settings = {
				inTangents: ba(e.settings.inTangents, Array),
				outTangents: ba(e.settings.outTangents, Array)
			});
		}
		return n.type = e.ValueTypeName, n;
	}
	InterpolantFactoryMethodDiscrete(e) {
		return new Ta(this.times, this.values, this.getValueSize(), e);
	}
	InterpolantFactoryMethodLinear(e) {
		return new wa(this.times, this.values, this.getValueSize(), e);
	}
	InterpolantFactoryMethodSmooth(e) {
		return new Ca(this.times, this.values, this.getValueSize(), e);
	}
	InterpolantFactoryMethodBezier(e) {
		let t = new Ea(this.times, this.values, this.getValueSize(), e);
		return this.settings && (t.inTangents = this.settings.inTangents, t.outTangents = this.settings.outTangents), t;
	}
	setInterpolation(e) {
		let t;
		switch (e) {
			case S:
				t = this.InterpolantFactoryMethodDiscrete;
				break;
			case C:
				t = this.InterpolantFactoryMethodLinear;
				break;
			case w:
				t = this.InterpolantFactoryMethodSmooth;
				break;
			case T: t = this.InterpolantFactoryMethodBezier;
		}
		if (t === void 0) {
			let t = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
			if (this.createInterpolant === void 0) {
				if (e !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation);
				else throw Error(t);
			}
			return z("KeyframeTrack:", t), this;
		}
		return this.createInterpolant = t, this;
	}
	getInterpolation() {
		switch (this.createInterpolant) {
			case this.InterpolantFactoryMethodDiscrete: return S;
			case this.InterpolantFactoryMethodLinear: return C;
			case this.InterpolantFactoryMethodSmooth: return w;
			case this.InterpolantFactoryMethodBezier: return T;
		}
	}
	getValueSize() {
		return this.values.length / this.times.length;
	}
	shift(e) {
		if (e !== 0) {
			let t = this.times;
			for (let n = 0, r = t.length; n !== r; ++n) t[n] += e;
		}
		return this;
	}
	scale(e) {
		if (e !== 1) {
			let t = this.times;
			for (let n = 0, r = t.length; n !== r; ++n) t[n] *= e;
			xa(this.settings) && (ja(this.settings.inTangents, e), ja(this.settings.outTangents, e));
		}
		return this;
	}
	trim(e, t) {
		let n = this.times, r = n.length, i = 0, a = r - 1;
		for (; i !== r && n[i] < e;) ++i;
		for (; a !== -1 && n[a] > t;) --a;
		if (++a, i !== 0 || a !== r) {
			i >= a && (a = Math.max(a, 1), i = a - 1);
			let e = this.getValueSize();
			this.times = n.slice(i, a), this.values = this.values.slice(i * e, a * e);
		}
		return this;
	}
	validate() {
		let e = !0, t = this.getValueSize();
		t - Math.floor(t) !== 0 && (B("KeyframeTrack: Invalid value size in track.", this), e = !1);
		let n = this.times, r = this.values, i = n.length;
		i === 0 && (B("KeyframeTrack: Track is empty.", this), e = !1);
		let a = null;
		for (let t = 0; t !== i; t++) {
			let r = n[t];
			if (typeof r == "number" && isNaN(r)) {
				B("KeyframeTrack: Time is not a valid number.", this, t, r), e = !1;
				break;
			}
			if (a !== null && a > r) {
				B("KeyframeTrack: Out of order keys.", this, t, r, a), e = !1;
				break;
			}
			a = r;
		}
		if (r !== void 0 && ee(r)) for (let t = 0, n = r.length; t !== n; ++t) {
			let n = r[t];
			if (isNaN(n)) {
				B("KeyframeTrack: Value is not a valid number.", this, t, n), e = !1;
				break;
			}
		}
		return e;
	}
	optimize() {
		let e = this.times.slice(), t = this.values.slice(), n = this.getValueSize(), r = this.getInterpolation() === w, i = e.length - 1, a = 1;
		for (let o = 1; o < i; ++o) {
			let i = !1, s = e[o];
			if (s !== e[o + 1] && (o !== 1 || s !== e[0])) {
				if (r) i = !0;
				else {
					let e = o * n, r = e - n, a = e + n;
					for (let o = 0; o !== n; ++o) {
						let n = t[e + o];
						if (n !== t[r + o] || n !== t[a + o]) {
							i = !0;
							break;
						}
					}
				}
			}
			if (i) {
				if (o !== a) {
					e[a] = e[o];
					let r = o * n, i = a * n;
					for (let e = 0; e !== n; ++e) t[i + e] = t[r + e];
				}
				++a;
			}
		}
		if (i > 0) {
			e[a] = e[i];
			for (let e = i * n, r = a * n, o = 0; o !== n; ++o) t[r + o] = t[e + o];
			++a;
		}
		return a === e.length ? (this.times = e, this.values = t) : (this.times = e.slice(0, a), this.values = t.slice(0, a * n)), this;
	}
	clone() {
		let e = this.times.slice(), t = this.values.slice(), n = this.constructor, r = new n(this.name, e, t);
		return r.createInterpolant = this.createInterpolant, xa(this.settings) && (r.settings = {
			inTangents: this.settings.inTangents.slice(),
			outTangents: this.settings.outTangents.slice()
		}), r;
	}
};
function ja(e, t) {
	for (let n = 0, r = e.length; n !== r; n += 2) e[n] *= t;
}
Aa.prototype.ValueTypeName = "", Aa.prototype.TimeBufferType = Float32Array, Aa.prototype.ValueBufferType = Float32Array, Aa.prototype.DefaultInterpolation = C;
var Ma = class extends Aa {
	constructor(e, t, n) {
		super(e, t, n);
	}
};
Ma.prototype.ValueTypeName = "bool", Ma.prototype.ValueBufferType = Array, Ma.prototype.DefaultInterpolation = S, Ma.prototype.InterpolantFactoryMethodLinear = void 0, Ma.prototype.InterpolantFactoryMethodSmooth = void 0;
var Na = class extends Aa {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
};
Na.prototype.ValueTypeName = "color";
var Pa = class extends Aa {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
};
Pa.prototype.ValueTypeName = "number";
var Fa = class extends Sa {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	interpolate_(e, t, n, r) {
		let i = this.resultBuffer, a = this.sampleValues, o = this.valueSize, s = (n - t) / (r - t), c = e * o;
		for (let e = c + o; c !== e; c += 4) he.slerpFlat(i, 0, a, c - o, a, c, s);
		return i;
	}
}, Ia = class extends Aa {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
	InterpolantFactoryMethodLinear(e) {
		return new Fa(this.times, this.values, this.getValueSize(), e);
	}
};
Ia.prototype.ValueTypeName = "quaternion", Ia.prototype.InterpolantFactoryMethodSmooth = void 0;
var La = class extends Aa {
	constructor(e, t, n) {
		super(e, t, n);
	}
};
La.prototype.ValueTypeName = "string", La.prototype.ValueBufferType = Array, La.prototype.DefaultInterpolation = S, La.prototype.InterpolantFactoryMethodLinear = void 0, La.prototype.InterpolantFactoryMethodSmooth = void 0;
var Ra = class extends Aa {
	constructor(e, t, n, r) {
		super(e, t, n, r);
	}
};
Ra.prototype.ValueTypeName = "vector";
var za = {
	enabled: !1,
	files: {},
	add: function(e, t) {
		this.enabled !== !1 && (Ba(e) || (this.files[e] = t));
	},
	get: function(e) {
		if (this.enabled !== !1 && !Ba(e)) return this.files[e];
	},
	remove: function(e) {
		delete this.files[e];
	},
	clear: function() {
		this.files = {};
	}
};
function Ba(e) {
	try {
		let t = e.slice(e.indexOf(":") + 1);
		return new URL(t).protocol === "blob:";
	} catch {
		return !1;
	}
}
var Va = /*@__PURE__*/ new class {
	constructor(e, t, n) {
		let r = this, i = !1, a = 0, o = 0, s, c = [];
		this.onStart = void 0, this.onLoad = e, this.onProgress = t, this.onError = n, this._abortController = null, this.itemStart = function(e) {
			o++, i === !1 && r.onStart !== void 0 && r.onStart(e, a, o), i = !0;
		}, this.itemEnd = function(e) {
			a++, r.onProgress !== void 0 && r.onProgress(e, a, o), a === o && (i = !1, r.onLoad !== void 0 && r.onLoad());
		}, this.itemError = function(e) {
			r.onError !== void 0 && r.onError(e);
		}, this.resolveURL = function(e) {
			return e = e.normalize("NFC"), s ? s(e) : e;
		}, this.setURLModifier = function(e) {
			return s = e, this;
		}, this.addHandler = function(e, t) {
			return c.push(e, t), this;
		}, this.removeHandler = function(e) {
			let t = c.indexOf(e);
			return t !== -1 && c.splice(t, 2), this;
		}, this.getHandler = function(e) {
			for (let t = 0, n = c.length; t < n; t += 2) {
				let n = c[t], r = c[t + 1];
				if (n.global && (n.lastIndex = 0), n.test(e)) return r;
			}
			return null;
		}, this.abort = function() {
			return this.abortController.abort(), this._abortController = null, this;
		};
	}
	get abortController() {
		return this._abortController ||= new AbortController(), this._abortController;
	}
}(), Ha = class {
	constructor(e) {
		this.manager = e === void 0 ? Va : e, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {}, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
	}
	load() {}
	loadAsync(e, t) {
		let n = this;
		return new Promise(function(r, i) {
			n.load(e, r, t, i);
		});
	}
	parse() {}
	setCrossOrigin(e) {
		return this.crossOrigin = e, this;
	}
	setWithCredentials(e) {
		return this.withCredentials = e, this;
	}
	setPath(e) {
		return this.path = e, this;
	}
	setResourcePath(e) {
		return this.resourcePath = e, this;
	}
	setRequestHeader(e) {
		return this.requestHeader = e, this;
	}
	abort() {
		return this;
	}
};
Ha.DEFAULT_MATERIAL_NAME = "__DEFAULT";
var Ua = /* @__PURE__ */ new WeakMap(), Wa = class extends Ha {
	constructor(e) {
		super(e);
	}
	load(e, t, n, r) {
		this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e);
		let i = this, a = za.get(`image:${e}`);
		if (a !== void 0) {
			if (a.complete === !0) i.manager.itemStart(e), setTimeout(function() {
				t && t(a), i.manager.itemEnd(e);
			}, 0);
			else {
				let e = Ua.get(a);
				e === void 0 && (e = [], Ua.set(a, e)), e.push({
					onLoad: t,
					onError: r
				});
			}
			return a;
		}
		let o = L("img");
		function s() {
			l(), t && t(this);
			let n = Ua.get(this) || [];
			for (let e = 0; e < n.length; e++) {
				let t = n[e];
				t.onLoad && t.onLoad(this);
			}
			Ua.delete(this), i.manager.itemEnd(e);
		}
		function c(t) {
			l(), r && r(t), za.remove(`image:${e}`);
			let n = Ua.get(this) || [];
			for (let e = 0; e < n.length; e++) {
				let r = n[e];
				r.onError && r.onError(t);
			}
			Ua.delete(this), i.manager.itemError(e), i.manager.itemEnd(e);
		}
		function l() {
			o.removeEventListener("load", s, !1), o.removeEventListener("error", c, !1);
		}
		return o.addEventListener("load", s, !1), o.addEventListener("error", c, !1), e.slice(0, 5) !== "data:" && this.crossOrigin !== void 0 && (o.crossOrigin = this.crossOrigin), za.add(`image:${e}`, o), i.manager.itemStart(e), o.src = e, o;
	}
}, Ga = class extends Ha {
	constructor(e) {
		super(e);
	}
	load(e, t, n, r) {
		let i = new K(), a = new Wa(this.manager);
		return a.setCrossOrigin(this.crossOrigin), a.setPath(this.path), a.load(e, function(e) {
			i.image = e, i.needsUpdate = !0, t !== void 0 && t(i);
		}, n, r), i;
	}
}, Ka = class extends lt {
	constructor(e, t = 1) {
		super(), this.isLight = !0, this.type = "Light", this.color = new J(e), this.intensity = t;
	}
	copy(e, t) {
		return super.copy(e, t), this.color.copy(e.color), this.intensity = e.intensity, this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, t;
	}
}, qa = class extends Ka {
	constructor(e, t, n) {
		super(e, n), this.isHemisphereLight = !0, this.type = "HemisphereLight", this.position.copy(lt.DEFAULT_UP), this.updateMatrix(), this.groundColor = new J(t);
	}
	copy(e, t) {
		return super.copy(e, t), this.groundColor.copy(e.groundColor), this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.groundColor = this.groundColor.getHex(), t;
	}
}, Ja = /*@__PURE__*/ new Le(), Ya = /*@__PURE__*/ new W(), Xa = /*@__PURE__*/ new W(), Za = class {
	constructor(e) {
		this.camera = e, this.intensity = 1, this.bias = 0, this.biasNode = null, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new U(512, 512), this.mapType = o, this.map = null, this.mapPass = null, this.matrix = new Le(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new _r(), this._frameExtents = new U(1, 1), this._viewportCount = 1, this._viewports = [new Me(0, 0, 1, 1)];
	}
	getViewportCount() {
		return this._viewportCount;
	}
	getCamera() {
		return this.camera;
	}
	getFrustum() {
		return this._frustum;
	}
	updateMatrices(e) {
		let t = this.camera;
		Ya.setFromMatrixPosition(e.matrixWorld), t.position.copy(Ya), Xa.setFromMatrixPosition(e.target.matrixWorld), t.lookAt(Xa), t.updateMatrixWorld(), this._updateMatrix(t, this.matrix, this._frustum);
	}
	_updateMatrix(e, t, n, r) {
		Ja.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), n.setFromProjectionMatrix(Ja, e.coordinateSystem, e.reversedDepth);
		let i = this._frameExtents, a = r ? r.z / i.x : 1, o = r ? r.w / i.y : 1, s = r ? r.x / i.x : 0, c = r ? r.y / i.y : 0;
		e.coordinateSystem === 2001 || e.reversedDepth ? t.set(.5 * a, 0, 0, .5 * a + s, 0, .5 * o, 0, .5 * o + c, 0, 0, 1, 0, 0, 0, 0, 1) : t.set(.5 * a, 0, 0, .5 * a + s, 0, .5 * o, 0, .5 * o + c, 0, 0, .5, .5, 0, 0, 0, 1), t.multiply(Ja);
	}
	getViewport(e) {
		return this._viewports[e];
	}
	getFrameExtents() {
		return this._frameExtents;
	}
	dispose() {
		this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
	}
	copy(e) {
		return this.camera = e.camera.clone(), this.intensity = e.intensity, this.bias = e.bias, this.radius = e.radius, this.autoUpdate = e.autoUpdate, this.needsUpdate = e.needsUpdate, this.normalBias = e.normalBias, this.blurSamples = e.blurSamples, this.mapSize.copy(e.mapSize), this.biasNode = e.biasNode, this;
	}
	clone() {
		return new this.constructor().copy(this);
	}
	toJSON() {
		let e = {};
		return e.intensity = this.intensity, e.bias = this.bias, e.normalBias = this.normalBias, e.radius = this.radius, e.blurSamples = this.blurSamples, e.mapSize = this.mapSize.toArray(), e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e;
	}
}, Qa = /*@__PURE__*/ new W(), $a = /*@__PURE__*/ new he(), eo = /*@__PURE__*/ new W(), to = class extends lt {
	constructor() {
		super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new Le(), this.projectionMatrix = new Le(), this.projectionMatrixInverse = new Le(), this.coordinateSystem = F, this._reversedDepth = !1;
	}
	get reversedDepth() {
		return this._reversedDepth;
	}
	copy(e, t) {
		return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
	}
	getWorldDirection(e) {
		return super.getWorldDirection(e).negate();
	}
	updateMatrixWorld(e) {
		super.updateMatrixWorld(e), this.matrixWorld.decompose(Qa, $a, eo), eo.x === 1 && eo.y === 1 && eo.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(Qa, $a, eo.set(1, 1, 1)).invert();
	}
	updateWorldMatrix(e, t, n = !1) {
		super.updateWorldMatrix(e, t, n), this.matrixWorld.decompose(Qa, $a, eo), eo.x === 1 && eo.y === 1 && eo.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(Qa, $a, eo.set(1, 1, 1)).invert();
	}
	clone() {
		return new this.constructor().copy(this);
	}
}, no = /*@__PURE__*/ new W(), ro = /*@__PURE__*/ new U(), io = /*@__PURE__*/ new U(), ao = class extends to {
	constructor(e = 50, t = 1, n = .1, r = 2e3) {
		super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = n, this.far = r, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
	}
	copy(e, t) {
		return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
	}
	setFocalLength(e) {
		let t = .5 * this.getFilmHeight() / e;
		this.fov = le * 2 * Math.atan(t), this.updateProjectionMatrix();
	}
	getFocalLength() {
		let e = Math.tan(ce * .5 * this.fov);
		return .5 * this.getFilmHeight() / e;
	}
	getEffectiveFOV() {
		return le * 2 * Math.atan(Math.tan(ce * .5 * this.fov) / this.zoom);
	}
	getFilmWidth() {
		return this.filmGauge * Math.min(this.aspect, 1);
	}
	getFilmHeight() {
		return this.filmGauge / Math.max(this.aspect, 1);
	}
	getViewBounds(e, t, n) {
		no.set(-1, -1, .5).applyMatrix4(this.projectionMatrixInverse), t.set(no.x, no.y).multiplyScalar(-e / no.z), no.set(1, 1, .5).applyMatrix4(this.projectionMatrixInverse), n.set(no.x, no.y).multiplyScalar(-e / no.z);
	}
	getViewSize(e, t) {
		return this.getViewBounds(e, ro, io), t.subVectors(io, ro);
	}
	setViewOffset(e, t, n, r, i, a) {
		this.aspect = e / t, this.view === null && (this.view = {
			enabled: !0,
			fullWidth: 1,
			fullHeight: 1,
			offsetX: 0,
			offsetY: 0,
			width: 1,
			height: 1
		}), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = i, this.view.height = a, this.updateProjectionMatrix();
	}
	clearViewOffset() {
		this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
	}
	updateProjectionMatrix() {
		let e = this.near, t = e * Math.tan(ce * .5 * this.fov) / this.zoom, n = 2 * t, r = this.aspect * n, i = -.5 * r, a = this.view;
		if (this.view !== null && this.view.enabled) {
			let e = a.fullWidth, o = a.fullHeight;
			i += a.offsetX * r / e, t -= a.offsetY * n / o, r *= a.width / e, n *= a.height / o;
		}
		let o = this.filmOffset;
		o !== 0 && (i += e * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(i, i + r, t, t - n, e, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
	}
}, oo = class extends Za {
	constructor() {
		super(new ao(50, 1, .5, 500)), this.isSpotLightShadow = !0, this.focus = 1, this.aspect = 1;
	}
	updateMatrices(e) {
		let t = this.camera, n = le * 2 * e.angle * this.focus, r = this.mapSize.width / this.mapSize.height * this.aspect, i = e.distance || t.far;
		(n !== t.fov || r !== t.aspect || i !== t.far) && (t.fov = n, t.aspect = r, t.far = i, t.updateProjectionMatrix()), super.updateMatrices(e);
	}
	copy(e) {
		return super.copy(e), this.focus = e.focus, this.aspect = e.aspect, this;
	}
	toJSON() {
		let e = super.toJSON();
		return e.focus = this.focus, e.aspect = this.aspect, e;
	}
}, so = class extends Ka {
	constructor(e, t, n = 0, r = Math.PI / 3, i = 0, a = 2) {
		super(e, t), this.isSpotLight = !0, this.type = "SpotLight", this.position.copy(lt.DEFAULT_UP), this.updateMatrix(), this.target = new lt(), this.distance = n, this.angle = r, this.penumbra = i, this.decay = a, this.map = null, this.shadow = new oo();
	}
	get power() {
		return this.intensity * Math.PI;
	}
	set power(e) {
		this.intensity = e / Math.PI;
	}
	dispose() {
		super.dispose(), this.shadow.dispose();
	}
	copy(e, t) {
		return super.copy(e, t), this.distance = e.distance, this.angle = e.angle, this.penumbra = e.penumbra, this.decay = e.decay, this.target = e.target.clone(), this.map = e.map, this.shadow = e.shadow.clone(), this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.distance = this.distance, t.object.angle = this.angle, t.object.decay = this.decay, t.object.penumbra = this.penumbra, t.object.target = this.target.uuid, this.map && this.map.isTexture && (t.object.map = this.map.toJSON(e).uuid), t.object.shadow = this.shadow.toJSON(), t;
	}
}, co = class extends Za {
	constructor() {
		super(new ao(90, 1, .5, 500)), this.isPointLightShadow = !0;
	}
}, lo = class extends Ka {
	constructor(e, t, n = 0, r = 2) {
		super(e, t), this.isPointLight = !0, this.type = "PointLight", this.distance = n, this.decay = r, this.shadow = new co();
	}
	get power() {
		return this.intensity * 4 * Math.PI;
	}
	set power(e) {
		this.intensity = e / (4 * Math.PI);
	}
	dispose() {
		super.dispose(), this.shadow.dispose();
	}
	copy(e, t) {
		return super.copy(e, t), this.distance = e.distance, this.decay = e.decay, this.shadow = e.shadow.clone(), this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.distance = this.distance, t.object.decay = this.decay, t.object.shadow = this.shadow.toJSON(), t;
	}
}, uo = class extends to {
	constructor(e = -1, t = 1, n = 1, r = -1, i = .1, a = 2e3) {
		super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = n, this.bottom = r, this.near = i, this.far = a, this.updateProjectionMatrix();
	}
	copy(e, t) {
		return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
	}
	setViewOffset(e, t, n, r, i, a) {
		this.view === null && (this.view = {
			enabled: !0,
			fullWidth: 1,
			fullHeight: 1,
			offsetX: 0,
			offsetY: 0,
			width: 1,
			height: 1
		}), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = i, this.view.height = a, this.updateProjectionMatrix();
	}
	clearViewOffset() {
		this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
	}
	updateProjectionMatrix() {
		let e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, r = (this.top + this.bottom) / 2, i = n - e, a = n + e, o = r + t, s = r - t;
		if (this.view !== null && this.view.enabled) {
			let e = (this.right - this.left) / this.view.fullWidth / this.zoom, t = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
			i += e * this.view.offsetX, a = i + e * this.view.width, o -= t * this.view.offsetY, s = o - t * this.view.height;
		}
		this.projectionMatrix.makeOrthographic(i, a, o, s, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t;
	}
}, fo = class extends Za {
	constructor() {
		super(new uo(-5, 5, 5, -5, .5, 500)), this.isDirectionalLightShadow = !0;
	}
}, po = class extends Ka {
	constructor(e, t) {
		super(e, t), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(lt.DEFAULT_UP), this.updateMatrix(), this.target = new lt(), this.shadow = new fo();
	}
	dispose() {
		super.dispose(), this.shadow.dispose();
	}
	copy(e) {
		return super.copy(e), this.target = e.target.clone(), this.shadow = e.shadow.clone(), this;
	}
	toJSON(e) {
		let t = super.toJSON(e);
		return t.object.shadow = this.shadow.toJSON(), t.object.target = this.target.uuid, t;
	}
}, mo = -90, ho = 1, go = class extends lt {
	constructor(e, t, n) {
		super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
		let r = new ao(mo, ho, e, t);
		r.layers = this.layers, this.add(r);
		let i = new ao(mo, ho, e, t);
		i.layers = this.layers, this.add(i);
		let a = new ao(mo, ho, e, t);
		a.layers = this.layers, this.add(a);
		let o = new ao(mo, ho, e, t);
		o.layers = this.layers, this.add(o);
		let s = new ao(mo, ho, e, t);
		s.layers = this.layers, this.add(s);
		let c = new ao(mo, ho, e, t);
		c.layers = this.layers, this.add(c);
	}
	updateCoordinateSystem() {
		let e = this.coordinateSystem, t = this.children.concat(), [n, r, i, a, o, s] = t;
		for (let e of t) this.remove(e);
		if (e === 2e3) n.up.set(0, 1, 0), n.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), i.up.set(0, 0, -1), i.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), s.up.set(0, 1, 0), s.lookAt(0, 0, -1);
		else if (e === 2001) n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), r.up.set(0, -1, 0), r.lookAt(1, 0, 0), i.up.set(0, 0, 1), i.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), s.up.set(0, -1, 0), s.lookAt(0, 0, -1);
		else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
		for (let e of t) this.add(e), e.updateMatrixWorld();
	}
	update(e, t) {
		this.parent === null && this.updateMatrixWorld();
		let { renderTarget: n, activeMipmapLevel: r } = this;
		this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
		let [i, a, o, s, c, l] = this.children, u = e.getRenderTarget(), d = e.getActiveCubeFace(), f = e.getActiveMipmapLevel(), p = e.xr.enabled;
		e.xr.enabled = !1;
		let m = n.texture.generateMipmaps;
		n.texture.generateMipmaps = !1;
		let h = !1;
		h = e.isWebGLRenderer === !0 ? e.state.buffers.depth.getReversed() : e.reversedDepthBuffer, e.setRenderTarget(n, 0, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, i), e.setRenderTarget(n, 1, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, a), e.setRenderTarget(n, 2, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, o), e.setRenderTarget(n, 3, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, s), e.setRenderTarget(n, 4, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, c), n.texture.generateMipmaps = m, e.setRenderTarget(n, 5, r), h && e.autoClear === !1 && e.clearDepth(), e.render(t, l), e.setRenderTarget(u, d, f), e.xr.enabled = p, n.texture.needsPMREMUpdate = !0;
	}
}, _o = class extends ao {
	constructor(e = []) {
		super(), this.isArrayCamera = !0, this.isMultiViewCamera = !1, this.cameras = e;
	}
}, vo = class {
	constructor() {
		this._previousTime = 0, this._currentTime = 0, this._startTime = performance.now(), this._delta = 0, this._elapsed = 0, this._timescale = 1, this._document = null, this._pageVisibilityHandler = null;
	}
	connect(e) {
		this._document = e, e.hidden !== void 0 && (this._pageVisibilityHandler = yo.bind(this), e.addEventListener("visibilitychange", this._pageVisibilityHandler, !1));
	}
	disconnect() {
		this._pageVisibilityHandler !== null && (this._document.removeEventListener("visibilitychange", this._pageVisibilityHandler), this._pageVisibilityHandler = null), this._document = null;
	}
	getDelta() {
		return this._delta / 1e3;
	}
	getElapsed() {
		return this._elapsed / 1e3;
	}
	getTimescale() {
		return this._timescale;
	}
	setTimescale(e) {
		return this._timescale = e, this;
	}
	reset() {
		return this._currentTime = performance.now() - this._startTime, this;
	}
	dispose() {
		this.disconnect();
	}
	update(e) {
		return this._pageVisibilityHandler !== null && this._document.hidden === !0 ? this._delta = 0 : (this._previousTime = this._currentTime, this._currentTime = (e === void 0 ? performance.now() : e) - this._startTime, this._delta = (this._currentTime - this._previousTime) * this._timescale, this._elapsed += this._delta), this;
	}
};
function yo() {
	this._document.hidden === !1 && this.reset();
}
var bo = "\\[\\]\\.:\\/", xo = /* @__PURE__ */ RegExp("[\\[\\]\\.:\\/]", "g"), So = "[^\\[\\]\\.:\\/]", Co = "[^" + bo.replace("\\.", "") + "]", wo = /*@__PURE__*/ "((?:WC+[\\/:])*)".replace("WC", So), To = /*@__PURE__*/ "(WCOD+)?".replace("WCOD", Co), Eo = /*@__PURE__*/ "(?:\\.(WC+)(?:\\[(.+)\\])?)?".replace("WC", So), Do = /*@__PURE__*/ "\\.(WC+)(?:\\[(.+)\\])?".replace("WC", So), Oo = RegExp("^" + wo + To + Eo + Do + "$"), ko = [
	"material",
	"materials",
	"bones",
	"map"
], Ao = class {
	constructor(e, t, n) {
		let r = n || jo.parseTrackName(t);
		this._targetGroup = e, this._bindings = e.subscribe_(t, r);
	}
	getValue(e, t) {
		this.bind();
		let n = this._targetGroup.nCachedObjects_, r = this._bindings[n];
		r !== void 0 && r.getValue(e, t);
	}
	setValue(e, t) {
		let n = this._bindings;
		for (let r = this._targetGroup.nCachedObjects_, i = n.length; r !== i; ++r) n[r].setValue(e, t);
	}
	bind() {
		let e = this._bindings;
		for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t) e[t].bind();
	}
	unbind() {
		let e = this._bindings;
		for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t) e[t].unbind();
	}
}, jo = class e {
	constructor(t, n, r) {
		this.path = n, this.parsedPath = r || e.parseTrackName(n), this.node = e.findNode(t, this.parsedPath.nodeName), this.rootNode = t, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
	}
	static create(t, n, r) {
		return t && t.isAnimationObjectGroup ? new e.Composite(t, n, r) : new e(t, n, r);
	}
	static sanitizeNodeName(e) {
		return e.replace(/\s/g, "_").replace(xo, "");
	}
	static parseTrackName(e) {
		let t = Oo.exec(e);
		if (t === null) throw Error("THREE.PropertyBinding: Cannot parse trackName: " + e);
		let n = {
			nodeName: t[2],
			objectName: t[3],
			objectIndex: t[4],
			propertyName: t[5],
			propertyIndex: t[6]
		}, r = n.nodeName && n.nodeName.lastIndexOf(".");
		if (r !== void 0 && r !== -1) {
			let e = n.nodeName.substring(r + 1);
			ko.indexOf(e) !== -1 && (n.nodeName = n.nodeName.substring(0, r), n.objectName = e);
		}
		if (n.propertyName === null || n.propertyName.length === 0) throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: " + e);
		return n;
	}
	static findNode(e, t) {
		if (t === void 0 || t === "" || t === "." || t === -1 || t === e.name || t === e.uuid) return e;
		if (e.skeleton) {
			let n = e.skeleton.getBoneByName(t);
			if (n !== void 0) return n;
		}
		if (e.children) {
			let n = function(e) {
				for (let r = 0; r < e.length; r++) {
					let i = e[r];
					if (i.name === t || i.uuid === t) return i;
					let a = n(i.children);
					if (a) return a;
				}
				return null;
			}, r = n(e.children);
			if (r) return r;
		}
		return null;
	}
	_getValue_unavailable() {}
	_setValue_unavailable() {}
	_getValue_direct(e, t) {
		e[t] = this.targetObject[this.propertyName];
	}
	_getValue_array(e, t) {
		let n = this.resolvedProperty;
		for (let r = 0, i = n.length; r !== i; ++r) e[t++] = n[r];
	}
	_getValue_arrayElement(e, t) {
		e[t] = this.resolvedProperty[this.propertyIndex];
	}
	_getValue_toArray(e, t) {
		this.resolvedProperty.toArray(e, t);
	}
	_setValue_direct(e, t) {
		this.targetObject[this.propertyName] = e[t];
	}
	_setValue_direct_setNeedsUpdate(e, t) {
		this.targetObject[this.propertyName] = e[t], this.targetObject.needsUpdate = !0;
	}
	_setValue_direct_setMatrixWorldNeedsUpdate(e, t) {
		this.targetObject[this.propertyName] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_setValue_array(e, t) {
		let n = this.resolvedProperty;
		for (let r = 0, i = n.length; r !== i; ++r) n[r] = e[t++];
	}
	_setValue_array_setNeedsUpdate(e, t) {
		let n = this.resolvedProperty;
		for (let r = 0, i = n.length; r !== i; ++r) n[r] = e[t++];
		this.targetObject.needsUpdate = !0;
	}
	_setValue_array_setMatrixWorldNeedsUpdate(e, t) {
		let n = this.resolvedProperty;
		for (let r = 0, i = n.length; r !== i; ++r) n[r] = e[t++];
		this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_setValue_arrayElement(e, t) {
		this.resolvedProperty[this.propertyIndex] = e[t];
	}
	_setValue_arrayElement_setNeedsUpdate(e, t) {
		this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.needsUpdate = !0;
	}
	_setValue_arrayElement_setMatrixWorldNeedsUpdate(e, t) {
		this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_setValue_fromArray(e, t) {
		this.resolvedProperty.fromArray(e, t);
	}
	_setValue_fromArray_setNeedsUpdate(e, t) {
		this.resolvedProperty.fromArray(e, t), this.targetObject.needsUpdate = !0;
	}
	_setValue_fromArray_setMatrixWorldNeedsUpdate(e, t) {
		this.resolvedProperty.fromArray(e, t), this.targetObject.matrixWorldNeedsUpdate = !0;
	}
	_getValue_unbound(e, t) {
		this.bind(), this.getValue(e, t);
	}
	_setValue_unbound(e, t) {
		this.bind(), this.setValue(e, t);
	}
	bind() {
		let t = this.node, n = this.parsedPath, r = n.objectName, i = n.propertyName, a = n.propertyIndex;
		if (t || (t = e.findNode(this.rootNode, n.nodeName), this.node = t), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !t) {
			z("PropertyBinding: No target node found for track: " + this.path + ".");
			return;
		}
		if (r) {
			let e = n.objectIndex;
			switch (r) {
				case "materials":
					if (!t.material) {
						B("PropertyBinding: Can not bind to material as node does not have a material.", this);
						return;
					}
					if (!t.material.materials) {
						B("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
						return;
					}
					t = t.material.materials;
					break;
				case "bones":
					if (!t.skeleton) {
						B("PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
						return;
					}
					t = t.skeleton.bones;
					for (let n = 0; n < t.length; n++) if (t[n].name === e) {
						e = n;
						break;
					}
					break;
				case "map":
					if ("map" in t) {
						t = t.map;
						break;
					}
					if (!t.material) {
						B("PropertyBinding: Can not bind to material as node does not have a material.", this);
						return;
					}
					if (!t.material.map) {
						B("PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
						return;
					}
					t = t.material.map;
					break;
				default:
					if (t[r] === void 0) {
						B("PropertyBinding: Can not bind to objectName of node undefined.", this);
						return;
					}
					t = t[r];
			}
			if (e !== void 0) {
				if (t[e] === void 0) {
					B("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, t);
					return;
				}
				t = t[e];
			}
		}
		let o = t[i];
		if (o === void 0) {
			let e = n.nodeName;
			B("PropertyBinding: Trying to update property for track: " + e + "." + i + " but it wasn't found.", t);
			return;
		}
		let s = this.Versioning.None;
		this.targetObject = t, t.isMaterial === !0 ? s = this.Versioning.NeedsUpdate : t.isObject3D === !0 && (s = this.Versioning.MatrixWorldNeedsUpdate);
		let c = this.BindingType.Direct;
		if (a !== void 0) {
			if (i === "morphTargetInfluences") {
				if (!t.geometry) {
					B("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
					return;
				}
				if (!t.geometry.morphAttributes) {
					B("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
					return;
				}
				t.morphTargetDictionary[a] !== void 0 && (a = t.morphTargetDictionary[a]);
			}
			c = this.BindingType.ArrayElement, this.resolvedProperty = o, this.propertyIndex = a;
		} else o.fromArray !== void 0 && o.toArray !== void 0 ? (c = this.BindingType.HasFromToArray, this.resolvedProperty = o) : Array.isArray(o) ? (c = this.BindingType.EntireArray, this.resolvedProperty = o) : this.propertyName = i;
		this.getValue = this.GetterByBindingType[c], this.setValue = this.SetterByBindingTypeAndVersioning[c][s];
	}
	unbind() {
		this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
	}
};
jo.Composite = Ao, jo.prototype.BindingType = {
	Direct: 0,
	EntireArray: 1,
	ArrayElement: 2,
	HasFromToArray: 3
}, jo.prototype.Versioning = {
	None: 0,
	NeedsUpdate: 1,
	MatrixWorldNeedsUpdate: 2
}, jo.prototype.GetterByBindingType = [
	jo.prototype._getValue_direct,
	jo.prototype._getValue_array,
	jo.prototype._getValue_arrayElement,
	jo.prototype._getValue_toArray
], jo.prototype.SetterByBindingTypeAndVersioning = [
	[
		jo.prototype._setValue_direct,
		jo.prototype._setValue_direct_setNeedsUpdate,
		jo.prototype._setValue_direct_setMatrixWorldNeedsUpdate
	],
	[
		jo.prototype._setValue_array,
		jo.prototype._setValue_array_setNeedsUpdate,
		jo.prototype._setValue_array_setMatrixWorldNeedsUpdate
	],
	[
		jo.prototype._setValue_arrayElement,
		jo.prototype._setValue_arrayElement_setNeedsUpdate,
		jo.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate
	],
	[
		jo.prototype._setValue_fromArray,
		jo.prototype._setValue_fromArray_setNeedsUpdate,
		jo.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate
	]
], class e {
	static {
		e.prototype.isMatrix2 = !0;
	}
	constructor(e, t, n, r) {
		this.elements = [
			1,
			0,
			0,
			1
		], e !== void 0 && this.set(e, t, n, r);
	}
	identity() {
		return this.set(1, 0, 0, 1), this;
	}
	fromArray(e, t = 0) {
		for (let n = 0; n < 4; n++) this.elements[n] = e[n + t];
		return this;
	}
	set(e, t, n, r) {
		let i = this.elements;
		return i[0] = e, i[2] = t, i[1] = n, i[3] = r, this;
	}
};
function Mo(e, t, n, r) {
	let i = No(r);
	switch (n) {
		case 1021: return e * t;
		case _: return e * t / i.components * i.byteLength;
		case v: return e * t / i.components * i.byteLength;
		case y: return e * t * 2 / i.components * i.byteLength;
		case b: return e * t * 2 / i.components * i.byteLength;
		case 1022: return e * t * 3 / i.components * i.byteLength;
		case m: return e * t * 4 / i.components * i.byteLength;
		case x: return e * t * 4 / i.components * i.byteLength;
		case 33776:
		case 33777: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
		case 33778:
		case 33779: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
		case 35841:
		case 35843: return Math.max(e, 16) * Math.max(t, 8) / 4;
		case 35840:
		case 35842: return Math.max(e, 8) * Math.max(t, 8) / 2;
		case 36196:
		case 37492:
		case 37488:
		case 37489: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 8;
		case 37496:
		case 37490:
		case 37491: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
		case 37808: return Math.floor((e + 3) / 4) * Math.floor((t + 3) / 4) * 16;
		case 37809: return Math.floor((e + 4) / 5) * Math.floor((t + 3) / 4) * 16;
		case 37810: return Math.floor((e + 4) / 5) * Math.floor((t + 4) / 5) * 16;
		case 37811: return Math.floor((e + 5) / 6) * Math.floor((t + 4) / 5) * 16;
		case 37812: return Math.floor((e + 5) / 6) * Math.floor((t + 5) / 6) * 16;
		case 37813: return Math.floor((e + 7) / 8) * Math.floor((t + 4) / 5) * 16;
		case 37814: return Math.floor((e + 7) / 8) * Math.floor((t + 5) / 6) * 16;
		case 37815: return Math.floor((e + 7) / 8) * Math.floor((t + 7) / 8) * 16;
		case 37816: return Math.floor((e + 9) / 10) * Math.floor((t + 4) / 5) * 16;
		case 37817: return Math.floor((e + 9) / 10) * Math.floor((t + 5) / 6) * 16;
		case 37818: return Math.floor((e + 9) / 10) * Math.floor((t + 7) / 8) * 16;
		case 37819: return Math.floor((e + 9) / 10) * Math.floor((t + 9) / 10) * 16;
		case 37820: return Math.floor((e + 11) / 12) * Math.floor((t + 9) / 10) * 16;
		case 37821: return Math.floor((e + 11) / 12) * Math.floor((t + 11) / 12) * 16;
		case 36492:
		case 36494:
		case 36495: return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
		case 36283:
		case 36284: return Math.ceil(e / 4) * Math.ceil(t / 4) * 8;
		case 36285:
		case 36286: return Math.ceil(e / 4) * Math.ceil(t / 4) * 16;
	}
	throw Error(`Unable to determine texture byte length for ${n} format.`);
}
function No(e) {
	switch (e) {
		case o:
		case 1010: return {
			byteLength: 1,
			components: 1
		};
		case s:
		case 1011:
		case u: return {
			byteLength: 2,
			components: 1
		};
		case d:
		case f: return {
			byteLength: 2,
			components: 4
		};
		case c:
		case 1013:
		case l: return {
			byteLength: 4,
			components: 1
		};
		case 35902:
		case 35899: return {
			byteLength: 4,
			components: 3
		};
	}
	throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`);
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: "186" } })), typeof window < "u" && (window.__THREE__ ? z("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = "186");
//#endregion
//#region node_modules/three/build/three.module.js
function Po() {
	let e = null, t = !1, n = null, r = null;
	function i(t, a) {
		r = e.requestAnimationFrame(i), n(t, a);
	}
	return {
		start: function() {
			t !== !0 && n !== null && e !== null && (r = e.requestAnimationFrame(i), t = !0);
		},
		stop: function() {
			e !== null && e.cancelAnimationFrame(r), t = !1;
		},
		setAnimationLoop: function(e) {
			n = e;
		},
		setContext: function(t) {
			e = t;
		}
	};
}
function Fo(e) {
	let t = /* @__PURE__ */ new WeakMap();
	function n(t, n) {
		let r = t.array, i = t.usage, a = r.byteLength, o = e.createBuffer();
		e.bindBuffer(n, o), e.bufferData(n, r, i), t.onUploadCallback();
		let s;
		if (r instanceof Float32Array) s = e.FLOAT;
		else if (typeof Float16Array < "u" && r instanceof Float16Array) s = e.HALF_FLOAT;
		else if (r instanceof Uint16Array) s = t.isFloat16BufferAttribute ? e.HALF_FLOAT : e.UNSIGNED_SHORT;
		else if (r instanceof Int16Array) s = e.SHORT;
		else if (r instanceof Uint32Array) s = e.UNSIGNED_INT;
		else if (r instanceof Int32Array) s = e.INT;
		else if (r instanceof Int8Array) s = e.BYTE;
		else if (r instanceof Uint8Array) s = e.UNSIGNED_BYTE;
		else if (r instanceof Uint8ClampedArray) s = e.UNSIGNED_BYTE;
		else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: " + r);
		return {
			buffer: o,
			type: s,
			bytesPerElement: r.BYTES_PER_ELEMENT,
			version: t.version,
			size: a
		};
	}
	function r(t, n, r) {
		let i = n.array, a = n.updateRanges;
		if (e.bindBuffer(r, t), a.length === 0) e.bufferSubData(r, 0, i);
		else {
			a.sort((e, t) => e.start - t.start);
			let t = 0;
			for (let e = 1; e < a.length; e++) {
				let n = a[t], r = a[e];
				r.start <= n.start + n.count + 1 ? n.count = Math.max(n.count, r.start + r.count - n.start) : (++t, a[t] = r);
			}
			a.length = t + 1;
			for (let t = 0, n = a.length; t < n; t++) {
				let n = a[t];
				e.bufferSubData(r, n.start * i.BYTES_PER_ELEMENT, i, n.start, n.count);
			}
			n.clearUpdateRanges();
		}
		n.onUploadCallback();
	}
	function i(e) {
		return e.isInterleavedBufferAttribute && (e = e.data), t.get(e);
	}
	function a(n) {
		n.isInterleavedBufferAttribute && (n = n.data);
		let r = t.get(n);
		r && (e.deleteBuffer(r.buffer), t.delete(n));
	}
	function o(e, i) {
		if (e.isInterleavedBufferAttribute && (e = e.data), e.isGLBufferAttribute) {
			let n = t.get(e);
			(!n || n.version < e.version) && t.set(e, {
				buffer: e.buffer,
				type: e.type,
				bytesPerElement: e.elementSize,
				version: e.version
			});
			return;
		}
		let a = t.get(e);
		if (a === void 0) t.set(e, n(e, i));
		else if (a.version < e.version) {
			if (a.size !== e.array.byteLength) throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
			r(a.buffer, e, i), a.version = e.version;
		}
	}
	return {
		get: i,
		remove: a,
		update: o
	};
}
var Io = {
	alphahash_fragment: "#ifdef USE_ALPHAHASH\n	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;\n#endif",
	alphahash_pars_fragment: "#ifdef USE_ALPHAHASH\n	const float ALPHA_HASH_SCALE = 0.05;\n	float hash2D( vec2 value ) {\n		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );\n	}\n	float hash3D( vec3 value ) {\n		return hash2D( vec2( hash2D( value.xy ), value.z ) );\n	}\n	float getAlphaHashThreshold( vec3 position ) {\n		float maxDeriv = max(\n			length( dFdx( position.xyz ) ),\n			length( dFdy( position.xyz ) )\n		);\n		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );\n		vec2 pixScales = vec2(\n			exp2( floor( log2( pixScale ) ) ),\n			exp2( ceil( log2( pixScale ) ) )\n		);\n		vec2 alpha = vec2(\n			hash3D( floor( pixScales.x * position.xyz ) ),\n			hash3D( floor( pixScales.y * position.xyz ) )\n		);\n		float lerpFactor = fract( log2( pixScale ) );\n		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;\n		float a = min( lerpFactor, 1.0 - lerpFactor );\n		vec3 cases = vec3(\n			x * x / ( 2.0 * a * ( 1.0 - a ) ),\n			( x - 0.5 * a ) / ( 1.0 - a ),\n			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )\n		);\n		float threshold = ( x < ( 1.0 - a ) )\n			? ( ( x < a ) ? cases.x : cases.y )\n			: cases.z;\n		return clamp( threshold , 1.0e-6, 1.0 );\n	}\n#endif",
	alphamap_fragment: "#ifdef USE_ALPHAMAP\n	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;\n#endif",
	alphamap_pars_fragment: "#ifdef USE_ALPHAMAP\n	uniform sampler2D alphaMap;\n#endif",
	alphatest_fragment: "#ifdef USE_ALPHATEST\n	#ifdef ALPHA_TO_COVERAGE\n	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );\n	if ( diffuseColor.a == 0.0 ) discard;\n	#else\n	if ( diffuseColor.a < alphaTest ) discard;\n	#endif\n#endif",
	alphatest_pars_fragment: "#ifdef USE_ALPHATEST\n	uniform float alphaTest;\n#endif",
	aomap_fragment: "#ifdef USE_AOMAP\n	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;\n	reflectedLight.indirectDiffuse *= ambientOcclusion;\n	#if defined( USE_CLEARCOAT ) \n		clearcoatSpecularIndirect *= ambientOcclusion;\n	#endif\n	#if defined( USE_SHEEN ) \n		sheenSpecularIndirect *= ambientOcclusion;\n	#endif\n	#if defined( USE_ENVMAP ) && defined( STANDARD )\n		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );\n		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n	#endif\n#endif",
	aomap_pars_fragment: "#ifdef USE_AOMAP\n	uniform sampler2D aoMap;\n	uniform float aoMapIntensity;\n#endif",
	batching_pars_vertex: "#ifdef USE_BATCHING\n	#if ! defined( GL_ANGLE_multi_draw )\n	#define gl_DrawID _gl_DrawID\n	uniform int _gl_DrawID;\n	#endif\n	uniform highp sampler2D batchingTexture;\n	uniform highp usampler2D batchingIdTexture;\n	mat4 getBatchingMatrix( const in float i ) {\n		int size = textureSize( batchingTexture, 0 ).x;\n		int j = int( i ) * 4;\n		int x = j % size;\n		int y = j / size;\n		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );\n		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );\n		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );\n		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );\n		return mat4( v1, v2, v3, v4 );\n	}\n	float getIndirectIndex( const in int i ) {\n		int size = textureSize( batchingIdTexture, 0 ).x;\n		int x = i % size;\n		int y = i / size;\n		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );\n	}\n#endif\n#ifdef USE_BATCHING_COLOR\n	uniform sampler2D batchingColorTexture;\n	vec4 getBatchingColor( const in float i ) {\n		int size = textureSize( batchingColorTexture, 0 ).x;\n		int j = int( i );\n		int x = j % size;\n		int y = j / size;\n		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );\n	}\n#endif",
	batching_vertex: "#ifdef USE_BATCHING\n	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );\n#endif",
	begin_vertex: "vec3 transformed = vec3( position );\n#ifdef USE_ALPHAHASH\n	vPosition = vec3( position );\n#endif",
	beginnormal_vertex: "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n	vec3 objectTangent = vec3( tangent.xyz );\n#endif",
	bsdfs: "float G_BlinnPhong_Implicit( ) {\n	return 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float dotVH = saturate( dot( viewDir, halfDir ) );\n	vec3 F = F_Schlick( specularColor, 1.0, dotVH );\n	float G = G_BlinnPhong_Implicit( );\n	float D = D_BlinnPhong( shininess, dotNH );\n	return F * ( G * D );\n} // validated",
	iridescence_fragment: "#ifdef USE_IRIDESCENCE\n	const mat3 XYZ_TO_REC709 = mat3(\n		 3.2404542, -0.9692660,  0.0556434,\n		-1.5371385,  1.8760108, -0.2040259,\n		-0.4985314,  0.0415560,  1.0572252\n	);\n	vec3 Fresnel0ToIor( vec3 fresnel0 ) {\n		vec3 sqrtF0 = sqrt( fresnel0 );\n		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );\n	}\n	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {\n		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );\n	}\n	float IorToFresnel0( float transmittedIor, float incidentIor ) {\n		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));\n	}\n	vec3 evalSensitivity( float OPD, vec3 shift ) {\n		float phase = 2.0 * PI * OPD * 1.0e-9;\n		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );\n		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );\n		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );\n		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );\n		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );\n		xyz /= 1.0685e-7;\n		vec3 rgb = XYZ_TO_REC709 * xyz;\n		return rgb;\n	}\n	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {\n		vec3 I;\n		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );\n		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );\n		float cosTheta2Sq = 1.0 - sinTheta2Sq;\n		if ( cosTheta2Sq < 0.0 ) {\n			return vec3( 1.0 );\n		}\n		float cosTheta2 = sqrt( cosTheta2Sq );\n		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );\n		float R12 = F_Schlick( R0, 1.0, cosTheta1 );\n		float T121 = 1.0 - R12;\n		float phi12 = 0.0;\n		if ( iridescenceIOR < outsideIOR ) phi12 = PI;\n		float phi21 = PI - phi12;\n		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );\n		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );\n		vec3 phi23 = vec3( 0.0 );\n		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;\n		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;\n		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;\n		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;\n		vec3 phi = vec3( phi21 ) + phi23;\n		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );\n		vec3 r123 = sqrt( R123 );\n		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );\n		vec3 C0 = R12 + Rs;\n		I = C0;\n		vec3 Cm = Rs - T121;\n		for ( int m = 1; m <= 2; ++ m ) {\n			Cm *= r123;\n			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );\n			I += Cm * Sm;\n		}\n		return max( I, vec3( 0.0 ) );\n	}\n#endif",
	bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\n	uniform sampler2D bumpMap;\n	uniform float bumpScale;\n	vec2 dHdxy_fwd() {\n		vec2 dSTdx = dFdx( vBumpMapUv );\n		vec2 dSTdy = dFdy( vBumpMapUv );\n		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;\n		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;\n		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;\n		return vec2( dBx, dBy );\n	}\n	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );\n		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );\n		vec3 vN = surf_norm;\n		vec3 R1 = cross( vSigmaY, vN );\n		vec3 R2 = cross( vN, vSigmaX );\n		float fDet = dot( vSigmaX, R1 ) * faceDirection;\n		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n		return normalize( abs( fDet ) * surf_norm - vGrad );\n	}\n#endif",
	clipping_planes_fragment: "#if NUM_CLIPPING_PLANES > 0\n	vec4 plane;\n	#ifdef ALPHA_TO_COVERAGE\n		float distanceToPlane, distanceGradient;\n		float clipOpacity = 1.0;\n		#pragma unroll_loop_start\n		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n			plane = clippingPlanes[ i ];\n			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n			distanceGradient = fwidth( distanceToPlane ) / 2.0;\n			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n			if ( clipOpacity == 0.0 ) discard;\n		}\n		#pragma unroll_loop_end\n		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n			float unionClipOpacity = 1.0;\n			#pragma unroll_loop_start\n			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n				plane = clippingPlanes[ i ];\n				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n				distanceGradient = fwidth( distanceToPlane ) / 2.0;\n				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n			}\n			#pragma unroll_loop_end\n			clipOpacity *= 1.0 - unionClipOpacity;\n		#endif\n		diffuseColor.a *= clipOpacity;\n		if ( diffuseColor.a == 0.0 ) discard;\n	#else\n		#pragma unroll_loop_start\n		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n			plane = clippingPlanes[ i ];\n			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n		}\n		#pragma unroll_loop_end\n		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n			bool clipped = true;\n			#pragma unroll_loop_start\n			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n				plane = clippingPlanes[ i ];\n				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n			}\n			#pragma unroll_loop_end\n			if ( clipped ) discard;\n		#endif\n	#endif\n#endif",
	clipping_planes_pars_fragment: "#if NUM_CLIPPING_PLANES > 0\n	varying vec3 vClipPosition;\n	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif",
	clipping_planes_pars_vertex: "#if NUM_CLIPPING_PLANES > 0\n	varying vec3 vClipPosition;\n#endif",
	clipping_planes_vertex: "#if NUM_CLIPPING_PLANES > 0\n	vClipPosition = - mvPosition.xyz;\n#endif",
	color_fragment: "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )\n	diffuseColor *= vColor;\n#endif",
	color_pars_fragment: "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )\n	varying vec4 vColor;\n#endif",
	color_pars_vertex: "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n	varying vec4 vColor;\n#endif",
	color_vertex: "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n	vColor = vec4( 1.0 );\n#endif\n#ifdef USE_COLOR_ALPHA\n	vColor *= color;\n#elif defined( USE_COLOR )\n	vColor.rgb *= color;\n#endif\n#ifdef USE_INSTANCING_COLOR\n	vColor.rgb *= instanceColor.rgb;\n#endif\n#ifdef USE_BATCHING_COLOR\n	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );\n#endif",
	common: "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement( a ) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nvec3 pow2( const in vec3 x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }\nfloat average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }\nhighp float rand( const in vec2 uv ) {\n	const highp float a = 12.9898, b = 78.233, c = 43758.5453;\n	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n	return fract( sin( sn ) * c );\n}\n#ifdef HIGH_PRECISION\n	float precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n	float precisionSafeLength( vec3 v ) {\n		float maxComponent = max3( abs( v ) );\n		return length( v / maxComponent ) * maxComponent;\n	}\n#endif\nstruct IncidentLight {\n	vec3 color;\n	vec3 direction;\n	bool visible;\n};\nstruct ReflectedLight {\n	vec3 directDiffuse;\n	vec3 directSpecular;\n	vec3 indirectDiffuse;\n	vec3 indirectSpecular;\n};\n#ifdef USE_ALPHAHASH\n	varying vec3 vPosition;\n#endif\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\n#define inverseTransformDirection transformDirectionByInverseViewMatrix\nvec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {\n	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );\n}\nvec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {\n	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n	return m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n	return vec2( u, v );\n}\nvec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n	return RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {\n	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n}\nfloat F_Schlick( const in float f0, const in float f90, const in float dotVH ) {\n	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n} // validated",
	cube_uv_reflection_fragment: "#ifdef ENVMAP_TYPE_CUBE_UV\n	#define cubeUV_minMipLevel 4.0\n	#define cubeUV_minTileSize 16.0\n	float getFace( vec3 direction ) {\n		vec3 absDirection = abs( direction );\n		float face = - 1.0;\n		if ( absDirection.x > absDirection.z ) {\n			if ( absDirection.x > absDirection.y )\n				face = direction.x > 0.0 ? 0.0 : 3.0;\n			else\n				face = direction.y > 0.0 ? 1.0 : 4.0;\n		} else {\n			if ( absDirection.z > absDirection.y )\n				face = direction.z > 0.0 ? 2.0 : 5.0;\n			else\n				face = direction.y > 0.0 ? 1.0 : 4.0;\n		}\n		return face;\n	}\n	vec2 getUV( vec3 direction, float face ) {\n		vec2 uv;\n		if ( face == 0.0 ) {\n			uv = vec2( direction.z, direction.y ) / abs( direction.x );\n		} else if ( face == 1.0 ) {\n			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );\n		} else if ( face == 2.0 ) {\n			uv = vec2( - direction.x, direction.y ) / abs( direction.z );\n		} else if ( face == 3.0 ) {\n			uv = vec2( - direction.z, direction.y ) / abs( direction.x );\n		} else if ( face == 4.0 ) {\n			uv = vec2( - direction.x, direction.z ) / abs( direction.y );\n		} else {\n			uv = vec2( direction.x, direction.y ) / abs( direction.z );\n		}\n		return 0.5 * ( uv + 1.0 );\n	}\n	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n		float face = getFace( direction );\n		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n		mipInt = max( mipInt, cubeUV_minMipLevel );\n		float faceSize = exp2( mipInt );\n		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;\n		if ( face > 2.0 ) {\n			uv.y += faceSize;\n			face -= 3.0;\n		}\n		uv.x += face * faceSize;\n		uv.x += filterInt * 3.0 * cubeUV_minTileSize;\n		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );\n		uv.x *= CUBEUV_TEXEL_WIDTH;\n		uv.y *= CUBEUV_TEXEL_HEIGHT;\n		#ifdef texture2DGradEXT\n			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;\n		#else\n			return texture2D( envMap, uv ).rgb;\n		#endif\n	}\n	#define cubeUV_r0 1.0\n	#define cubeUV_m0 - 2.0\n	#define cubeUV_r1 0.8\n	#define cubeUV_m1 - 1.0\n	#define cubeUV_r4 0.4\n	#define cubeUV_m4 2.0\n	#define cubeUV_r5 0.305\n	#define cubeUV_m5 3.0\n	#define cubeUV_r6 0.21\n	#define cubeUV_m6 4.0\n	float roughnessToMip( float roughness ) {\n		float mip = 0.0;\n		if ( roughness >= cubeUV_r1 ) {\n			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;\n		} else if ( roughness >= cubeUV_r4 ) {\n			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;\n		} else if ( roughness >= cubeUV_r5 ) {\n			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;\n		} else if ( roughness >= cubeUV_r6 ) {\n			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;\n		} else {\n			mip = - 2.0 * log2( 1.16 * roughness );		}\n		return mip;\n	}\n	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );\n		float mipF = fract( mip );\n		float mipInt = floor( mip );\n		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n		if ( mipF == 0.0 ) {\n			return vec4( color0, 1.0 );\n		} else {\n			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n			return vec4( mix( color0, color1, mipF ), 1.0 );\n		}\n	}\n#endif",
	defaultnormal_vertex: "vec3 transformedNormal = objectNormal;\n#ifdef USE_TANGENT\n	vec3 transformedTangent = objectTangent;\n#endif\n#ifdef USE_BATCHING\n	mat3 bm = mat3( batchingMatrix );\n	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );\n	transformedNormal = bm * transformedNormal;\n	#ifdef USE_TANGENT\n		transformedTangent = bm * transformedTangent;\n	#endif\n#endif\n#ifdef USE_INSTANCING\n	mat3 im = mat3( instanceMatrix );\n	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );\n	transformedNormal = im * transformedNormal;\n	#ifdef USE_TANGENT\n		transformedTangent = im * transformedTangent;\n	#endif\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n	transformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;\n#endif",
	displacementmap_pars_vertex: "#ifdef USE_DISPLACEMENTMAP\n	uniform sampler2D displacementMap;\n	uniform float displacementScale;\n	uniform float displacementBias;\n#endif",
	displacementmap_vertex: "#ifdef USE_DISPLACEMENTMAP\n	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );\n#endif",
	emissivemap_fragment: "#ifdef USE_EMISSIVEMAP\n	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );\n	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE\n		emissiveColor = sRGBTransferEOTF( emissiveColor );\n	#endif\n	totalEmissiveRadiance *= emissiveColor.rgb;\n#endif",
	emissivemap_pars_fragment: "#ifdef USE_EMISSIVEMAP\n	uniform sampler2D emissiveMap;\n#endif",
	colorspace_fragment: "gl_FragColor = linearToOutputTexel( gl_FragColor );",
	colorspace_pars_fragment: "vec4 LinearTransferOETF( in vec4 value ) {\n	return value;\n}\nvec4 sRGBTransferEOTF( in vec4 value ) {\n	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 sRGBTransferOETF( in vec4 value ) {\n	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}",
	envmap_fragment: "#ifdef USE_ENVMAP\n	#ifdef ENV_WORLDPOS\n		vec3 cameraToFrag;\n		if ( isOrthographic ) {\n			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n		} else {\n			cameraToFrag = normalize( vWorldPosition - cameraPosition );\n		}\n		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );\n		#ifdef ENVMAP_MODE_REFLECTION\n			vec3 reflectVec = reflect( cameraToFrag, worldNormal );\n		#else\n			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n		#endif\n	#else\n		vec3 reflectVec = vReflect;\n	#endif\n	#ifdef ENVMAP_TYPE_CUBE\n		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );\n		#ifdef ENVMAP_BLENDING_MULTIPLY\n			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n		#elif defined( ENVMAP_BLENDING_MIX )\n			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n		#elif defined( ENVMAP_BLENDING_ADD )\n			outgoingLight += envColor.xyz * specularStrength * reflectivity;\n		#endif\n	#endif\n#endif",
	envmap_common_pars_fragment: "#ifdef USE_ENVMAP\n	uniform float envMapIntensity;\n	uniform mat3 envMapRotation;\n	#ifdef ENVMAP_TYPE_CUBE\n		uniform samplerCube envMap;\n	#else\n		uniform sampler2D envMap;\n	#endif\n#endif",
	envmap_pars_fragment: "#ifdef USE_ENVMAP\n	uniform float reflectivity;\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n		#define ENV_WORLDPOS\n	#endif\n	#ifdef ENV_WORLDPOS\n		varying vec3 vWorldPosition;\n		uniform float refractionRatio;\n	#else\n		varying vec3 vReflect;\n	#endif\n#endif",
	envmap_pars_vertex: "#ifdef USE_ENVMAP\n	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n		#define ENV_WORLDPOS\n	#endif\n	#ifdef ENV_WORLDPOS\n		\n		varying vec3 vWorldPosition;\n	#else\n		varying vec3 vReflect;\n		uniform float refractionRatio;\n	#endif\n#endif",
	envmap_physical_pars_fragment: "#ifdef USE_ENVMAP\n	vec3 getIBLIrradiance( const in vec3 normal ) {\n		#ifdef ENVMAP_TYPE_CUBE_UV\n			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );\n			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );\n			return PI * envMapColor.rgb * envMapIntensity;\n		#else\n			return vec3( 0.0 );\n		#endif\n	}\n	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n		#ifdef ENVMAP_TYPE_CUBE_UV\n			vec3 reflectVec = reflect( - viewDir, normal );\n			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );\n			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );\n			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );\n			return envMapColor.rgb * envMapIntensity;\n		#else\n			return vec3( 0.0 );\n		#endif\n	}\n	#ifdef USE_RETROREFLECTION\n		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n			#ifdef ENVMAP_TYPE_CUBE_UV\n				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );\n				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );\n				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );\n				return envMapColor.rgb * envMapIntensity;\n			#else\n				return vec3( 0.0 );\n			#endif\n		}\n	#endif\n	#ifdef USE_ANISOTROPY\n		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {\n			#ifdef ENVMAP_TYPE_CUBE_UV\n				vec3 bentNormal = cross( bitangent, viewDir );\n				bentNormal = normalize( cross( bentNormal, bitangent ) );\n				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );\n				return getIBLRadiance( viewDir, bentNormal, roughness );\n			#else\n				return vec3( 0.0 );\n			#endif\n		}\n		#ifdef USE_RETROREFLECTION\n			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {\n				#ifdef ENVMAP_TYPE_CUBE_UV\n					vec3 bentNormal = cross( bitangent, viewDir );\n					bentNormal = normalize( cross( bentNormal, bitangent ) );\n					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );\n					return getIBLRetroRadiance( viewDir, bentNormal, roughness );\n				#else\n					return vec3( 0.0 );\n				#endif\n			}\n		#endif\n	#endif\n#endif",
	envmap_vertex: "#ifdef USE_ENVMAP\n	#ifdef ENV_WORLDPOS\n		vWorldPosition = worldPosition.xyz;\n	#else\n		vec3 cameraToVertex;\n		if ( isOrthographic ) {\n			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n		} else {\n			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n		}\n		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );\n		#ifdef ENVMAP_MODE_REFLECTION\n			vReflect = reflect( cameraToVertex, worldNormal );\n		#else\n			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n		#endif\n	#endif\n#endif",
	fog_vertex: "#ifdef USE_FOG\n	vFogDepth = - mvPosition.z;\n#endif",
	fog_pars_vertex: "#ifdef USE_FOG\n	varying float vFogDepth;\n#endif",
	fog_fragment: "#ifdef USE_FOG\n	#ifdef FOG_EXP2\n		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );\n	#else\n		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );\n	#endif\n	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif",
	fog_pars_fragment: "#ifdef USE_FOG\n	uniform vec3 fogColor;\n	varying float vFogDepth;\n	#ifdef FOG_EXP2\n		uniform float fogDensity;\n	#else\n		uniform float fogNear;\n		uniform float fogFar;\n	#endif\n#endif",
	gradientmap_pars_fragment: "#ifdef USE_GRADIENTMAP\n	uniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n	float dotNL = dot( normal, lightDirection );\n	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n	#ifdef USE_GRADIENTMAP\n		return vec3( texture2D( gradientMap, coord ).r );\n	#else\n		vec2 fw = fwidth( coord ) * 0.5;\n		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );\n	#endif\n}",
	lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\n	uniform sampler2D lightMap;\n	uniform float lightMapIntensity;\n#endif",
	lights_lambert_fragment: "LambertMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularStrength = specularStrength;",
	lights_lambert_pars_fragment: "varying vec3 vViewPosition;\nstruct LambertMaterial {\n	vec3 diffuseColor;\n	float specularStrength;\n};\nvoid RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_Lambert\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert",
	lights_pars_begin: "uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\n#if defined( USE_LIGHT_PROBES )\n	uniform vec3 lightProbe[ 9 ];\n#endif\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n	float x = normal.x, y = normal.y, z = normal.z;\n	vec3 result = shCoefficients[ 0 ] * 0.886227;\n	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n	return result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {\n	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );\n	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n	return irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n	vec3 irradiance = ambientLightColor;\n	return irradiance;\n}\nfloat getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n	if ( cutoffDistance > 0.0 ) {\n		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n	}\n	return distanceFalloff;\n}\nfloat getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {\n	return smoothstep( coneCosine, penumbraCosine, angleCosine );\n}\n#if NUM_SUN_LIGHTS > 0\n	struct SunLight {\n		vec3 direction;\n		vec3 color;\n	};\n	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];\n	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {\n		light.color = sunLight.color;\n		light.direction = sunLight.direction;\n		light.visible = true;\n	}\n#endif\n#if NUM_DIR_LIGHTS > 0\n	struct DirectionalLight {\n		vec3 direction;\n		vec3 color;\n	};\n	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {\n		light.color = directionalLight.color;\n		light.direction = directionalLight.direction;\n		light.visible = true;\n	}\n#endif\n#if NUM_POINT_LIGHTS > 0\n	struct PointLight {\n		vec3 position;\n		vec3 color;\n		float distance;\n		float decay;\n	};\n	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {\n		vec3 lVector = pointLight.position - geometryPosition;\n		light.direction = normalize( lVector );\n		float lightDistance = length( lVector );\n		light.color = pointLight.color;\n		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );\n		light.visible = ( light.color != vec3( 0.0 ) );\n	}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n	struct SpotLight {\n		vec3 position;\n		vec3 direction;\n		vec3 color;\n		float distance;\n		float decay;\n		float coneCos;\n		float penumbraCos;\n	};\n	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {\n		vec3 lVector = spotLight.position - geometryPosition;\n		light.direction = normalize( lVector );\n		float angleCos = dot( light.direction, spotLight.direction );\n		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n		if ( spotAttenuation > 0.0 ) {\n			float lightDistance = length( lVector );\n			light.color = spotLight.color * spotAttenuation;\n			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );\n			light.visible = ( light.color != vec3( 0.0 ) );\n		} else {\n			light.color = vec3( 0.0 );\n			light.visible = false;\n		}\n	}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n	struct RectAreaLight {\n		vec3 color;\n		vec3 position;\n		vec3 halfWidth;\n		vec3 halfHeight;\n	};\n	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;\n	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n	struct HemisphereLight {\n		vec3 direction;\n		vec3 skyColor;\n		vec3 groundColor;\n	};\n	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {\n		float dotNL = dot( normal, hemiLight.direction );\n		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n		return irradiance;\n	}\n#endif\n#include <lightprobes_pars_fragment>",
	lights_toon_fragment: "ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;",
	lights_toon_pars_fragment: "varying vec3 vViewPosition;\nstruct ToonMaterial {\n	vec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_Toon\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon",
	lights_phong_fragment: "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;",
	lights_phong_pars_fragment: "varying vec3 vViewPosition;\nstruct BlinnPhongMaterial {\n	vec3 diffuseColor;\n	vec3 specularColor;\n	float specularShininess;\n	float specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct				RE_Direct_BlinnPhong\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong",
	lights_physical_fragment: "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.metalness = metalnessFactor;\nvec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\n#ifdef IOR\n	material.ior = ior;\n	#ifdef USE_SPECULAR\n		float specularIntensityFactor = specularIntensity;\n		vec3 specularColorFactor = specularColor;\n		#ifdef USE_SPECULAR_COLORMAP\n			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;\n		#endif\n		#ifdef USE_SPECULAR_INTENSITYMAP\n			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;\n		#endif\n		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );\n	#else\n		float specularIntensityFactor = 1.0;\n		vec3 specularColorFactor = vec3( 1.0 );\n		material.specularF90 = 1.0;\n	#endif\n	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;\n	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );\n#else\n	material.specularColor = vec3( 0.04 );\n	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );\n	material.specularF90 = 1.0;\n#endif\n#ifdef USE_CLEARCOAT\n	material.clearcoat = clearcoat;\n	material.clearcoatRoughness = clearcoatRoughness;\n	material.clearcoatF0 = vec3( 0.04 );\n	material.clearcoatF90 = 1.0;\n	#ifdef USE_CLEARCOATMAP\n		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;\n	#endif\n	#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;\n	#endif\n	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n	material.clearcoatRoughness += geometryRoughness;\n	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_DISPERSION\n	material.dispersion = dispersion;\n#endif\n#ifdef USE_RETROREFLECTION\n	material.retroreflectivity = retroreflectivity;\n#endif\n#ifdef USE_IRIDESCENCE\n	material.iridescence = iridescence;\n	material.iridescenceIOR = iridescenceIOR;\n	#ifdef USE_IRIDESCENCEMAP\n		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;\n	#endif\n	#ifdef USE_IRIDESCENCE_THICKNESSMAP\n		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;\n	#else\n		material.iridescenceThickness = iridescenceThicknessMaximum;\n	#endif\n#endif\n#ifdef USE_SHEEN\n	material.sheenColor = sheenColor;\n	#ifdef USE_SHEEN_COLORMAP\n		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;\n	#endif\n	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );\n	#ifdef USE_SHEEN_ROUGHNESSMAP\n		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;\n	#endif\n#endif\n#ifdef USE_ANISOTROPY\n	#ifdef USE_ANISOTROPYMAP\n		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );\n		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;\n		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;\n	#else\n		vec2 anisotropyV = anisotropyVector;\n	#endif\n	material.anisotropy = length( anisotropyV );\n	if( material.anisotropy == 0.0 ) {\n		anisotropyV = vec2( 1.0, 0.0 );\n	} else {\n		anisotropyV /= material.anisotropy;\n		material.anisotropy = saturate( material.anisotropy );\n	}\n	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );\n	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;\n	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;\n#endif",
	lights_physical_pars_fragment: "uniform sampler2D dfgLUT;\nstruct PhysicalMaterial {\n	vec3 diffuseColor;\n	vec3 diffuseContribution;\n	vec3 specularColor;\n	vec3 specularColorBlended;\n	float roughness;\n	float metalness;\n	float specularF90;\n	float dispersion;\n	vec2 dfg;\n	vec3 multiScatteringCompensation;\n	#ifdef USE_RETROREFLECTION\n		float retroreflectivity;\n	#endif\n	#ifdef USE_CLEARCOAT\n		float clearcoat;\n		float clearcoatRoughness;\n		vec3 clearcoatF0;\n		float clearcoatF90;\n	#endif\n	#ifdef USE_IRIDESCENCE\n		float iridescence;\n		float iridescenceIOR;\n		float iridescenceThickness;\n		vec3 iridescenceFresnel;\n		vec3 iridescenceF0Dielectric;\n		vec3 iridescenceF0Metallic;\n	#endif\n	#ifdef USE_SHEEN\n		vec3 sheenColor;\n		float sheenRoughness;\n	#endif\n	#ifdef IOR\n		float ior;\n	#endif\n	#ifdef USE_TRANSMISSION\n		float transmission;\n		float transmissionAlpha;\n		float thickness;\n		float attenuationDistance;\n		vec3 attenuationColor;\n	#endif\n	#ifdef USE_ANISOTROPY\n		float anisotropy;\n		float alphaT;\n		vec3 anisotropyT;\n		vec3 anisotropyB;\n	#endif\n};\nvec3 clearcoatSpecularDirect = vec3( 0.0 );\nvec3 clearcoatSpecularIndirect = vec3( 0.0 );\nvec3 sheenSpecularDirect = vec3( 0.0 );\nvec3 sheenSpecularIndirect = vec3(0.0 );\nvec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {\n    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );\n    float x2 = x * x;\n    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );\n    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );\n}\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n	float a2 = pow2( alpha );\n	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n	return 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n	float a2 = pow2( alpha );\n	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n	return RECIPROCAL_PI * a2 / pow2( denom );\n}\n#ifdef USE_ANISOTROPY\n	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {\n		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );\n		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );\n		return 0.5 / max( gv + gl, EPSILON );\n	}\n	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {\n		float a2 = alphaT * alphaB;\n		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );\n		highp float v2 = dot( v, v );\n		float w2 = a2 / v2;\n		return RECIPROCAL_PI * a2 * pow2 ( w2 );\n	}\n#endif\n#ifdef USE_CLEARCOAT\n	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {\n		vec3 f0 = material.clearcoatF0;\n		float f90 = material.clearcoatF90;\n		float roughness = material.clearcoatRoughness;\n		float alpha = pow2( roughness );\n		vec3 halfDir = normalize( lightDir + viewDir );\n		float dotNL = saturate( dot( normal, lightDir ) );\n		float dotNV = saturate( dot( normal, viewDir ) );\n		float dotNH = saturate( dot( normal, halfDir ) );\n		float dotVH = saturate( dot( viewDir, halfDir ) );\n		vec3 F = F_Schlick( f0, f90, dotVH );\n		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n		float D = D_GGX( alpha, dotNH );\n		return F * ( V * D );\n	}\n#endif\nvec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n	vec3 f0 = material.specularColorBlended;\n	float f90 = material.specularF90;\n	float roughness = material.roughness;\n	float alpha = pow2( roughness );\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float dotVH = saturate( dot( viewDir, halfDir ) );\n	vec3 F = F_Schlick( f0, f90, dotVH );\n	#ifdef USE_IRIDESCENCE\n		F = mix( F, material.iridescenceFresnel, material.iridescence );\n	#endif\n	#ifdef USE_ANISOTROPY\n		float dotTL = dot( material.anisotropyT, lightDir );\n		float dotTV = dot( material.anisotropyT, viewDir );\n		float dotTH = dot( material.anisotropyT, halfDir );\n		float dotBL = dot( material.anisotropyB, lightDir );\n		float dotBV = dot( material.anisotropyB, viewDir );\n		float dotBH = dot( material.anisotropyB, halfDir );\n		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );\n		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );\n	#else\n		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n		float D = D_GGX( alpha, dotNH );\n	#endif\n	return F * ( V * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n	const float LUT_SIZE = 64.0;\n	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n	const float LUT_BIAS = 0.5 / LUT_SIZE;\n	float dotNV = saturate( dot( N, V ) );\n	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n	uv = uv * LUT_SCALE + LUT_BIAS;\n	return uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n	float l = length( f );\n	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n	float x = dot( v1, v2 );\n	float y = abs( x );\n	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n	float b = 3.4175940 + ( 4.1616724 + y ) * y;\n	float v = a / b;\n	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n	return cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n	vec3 lightNormal = cross( v1, v2 );\n	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n	vec3 T1, T2;\n	T1 = normalize( V - N * dot( V, N ) );\n	T2 = - cross( N, T1 );\n	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );\n	vec3 coords[ 4 ];\n	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n	coords[ 0 ] = normalize( coords[ 0 ] );\n	coords[ 1 ] = normalize( coords[ 1 ] );\n	coords[ 2 ] = normalize( coords[ 2 ] );\n	coords[ 3 ] = normalize( coords[ 3 ] );\n	vec3 vectorFormFactor = vec3( 0.0 );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n	return vec3( result );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie( float roughness, float dotNH ) {\n	float alpha = pow2( roughness );\n	float invAlpha = 1.0 / alpha;\n	float cos2h = dotNH * dotNH;\n	float sin2h = max( 1.0 - cos2h, 0.0078125 );\n	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n}\nfloat V_Neubelt( float dotNV, float dotNL ) {\n	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );\n}\nvec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {\n	vec3 halfDir = normalize( lightDir + viewDir );\n	float dotNL = saturate( dot( normal, lightDir ) );\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float dotNH = saturate( dot( normal, halfDir ) );\n	float D = D_Charlie( sheenRoughness, dotNH );\n	float V = V_Neubelt( dotNV, dotNL );\n	return sheenColor * ( D * V );\n}\n#endif\nfloat IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n	float dotNV = saturate( dot( normal, viewDir ) );\n	float r2 = roughness * roughness;\n	float rInv = 1.0 / ( roughness + 0.1 );\n	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;\n	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;\n	float DG = exp( a * dotNV + b );\n	return saturate( DG );\n}\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n	float dotNV = saturate( dot( normal, viewDir ) );\n	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;\n	return specularColor * fab.x + specularF90 * fab.y;\n}\n#ifdef USE_IRIDESCENCE\nvoid computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#else\nvoid computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#endif\n	#ifdef USE_IRIDESCENCE\n		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );\n	#else\n		vec3 Fr = specularColor;\n	#endif\n	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;\n	float Ess = fab.x + fab.y;\n	float Ems = 1.0 - Ess;\n	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n	singleScatter += FssEss;\n	multiScatter += Fms * Ems;\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n		vec3 normal = geometryNormal;\n		vec3 viewDir = geometryViewDir;\n		vec3 position = geometryPosition;\n		vec3 lightPos = rectAreaLight.position;\n		vec3 halfWidth = rectAreaLight.halfWidth;\n		vec3 halfHeight = rectAreaLight.halfHeight;\n		vec3 lightColor = rectAreaLight.color;\n		float roughness = material.roughness;\n		vec3 rectCoords[ 4 ];\n		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n		vec2 uv = LTC_Uv( normal, viewDir, roughness );\n		vec4 t1 = texture2D( ltc_1, uv );\n		vec4 t2 = texture2D( ltc_2, uv );\n		mat3 mInv = mat3(\n			vec3( t1.x, 0, t1.y ),\n			vec3(    0, 1,    0 ),\n			vec3( t1.z, 0, t1.w )\n		);\n		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );\n		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n		#ifdef USE_CLEARCOAT\n			vec3 Ncc = geometryClearcoatNormal;\n			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );\n			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );\n			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );\n			mat3 mInvClearcoat = mat3(\n				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),\n				vec3(             0, 1,             0 ),\n				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )\n			);\n			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;\n			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );\n		#endif\n	}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n	vec3 irradiance = dotNL * directLight.color;\n	#ifdef USE_CLEARCOAT\n		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );\n		vec3 ccIrradiance = dotNLcc * directLight.color;\n		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );\n	#endif\n	#ifdef USE_SHEEN\n \n 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );\n \n 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );\n \n 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );\n \n 		irradiance *= sheenEnergyComp;\n \n 	#endif\n	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );\n	#ifdef USE_RETROREFLECTION\n		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );\n		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );\n		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );\n	#endif\n	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;\n	vec3 halfDir = normalize( directLight.direction + geometryViewDir );\n	float dotVH = saturate( dot( geometryViewDir, halfDir ) );\n	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );\n	#ifdef USE_RETROREFLECTION\n		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );\n		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );\n		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );\n		F = mix( F, retroF, saturate( material.retroreflectivity ) );\n	#endif\n	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n	vec3 singleScattering = vec3( 0.0 );\n	vec3 multiScattering = vec3( 0.0 );\n	#ifdef USE_IRIDESCENCE\n		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );\n	#else\n		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );\n	#endif\n	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );\n	#ifdef USE_SHEEN\n		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;\n		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;\n		diffuse *= sheenEnergyComp;\n	#endif\n	reflectedLight.indirectDiffuse += diffuse;\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n	#ifdef USE_CLEARCOAT\n		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n	#endif\n	#ifdef USE_SHEEN\n		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;\n 	#endif\n	vec3 singleScatteringDielectric = vec3( 0.0 );\n	vec3 multiScatteringDielectric = vec3( 0.0 );\n	vec3 singleScatteringMetallic = vec3( 0.0 );\n	vec3 multiScatteringMetallic = vec3( 0.0 );\n	#ifdef USE_IRIDESCENCE\n		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );\n		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );\n	#else\n		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );\n		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );\n	#endif\n	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );\n	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );\n	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;\n	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );\n	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n	vec3 indirectSpecular = radiance * singleScattering;\n	indirectSpecular += multiScattering * cosineWeightedIrradiance;\n	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;\n	#ifdef USE_SHEEN\n		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;\n		indirectSpecular *= sheenEnergyComp;\n		indirectDiffuse *= sheenEnergyComp;\n	#endif\n	reflectedLight.indirectSpecular += indirectSpecular;\n	reflectedLight.indirectDiffuse += indirectDiffuse;\n}\n#define RE_Direct				RE_Direct_Physical\n#define RE_Direct_RectArea		RE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular		RE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}",
	lights_fragment_begin: "\nvec3 geometryPosition = - vViewPosition;\nvec3 geometryNormal = normal;\nvec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\nvec3 geometryClearcoatNormal = vec3( 0.0 );\n#ifdef USE_CLEARCOAT\n	geometryClearcoatNormal = clearcoatNormal;\n#endif\n#ifdef USE_IRIDESCENCE\n	float dotNVi = saturate( dot( normal, geometryViewDir ) );\n	if ( material.iridescenceThickness == 0.0 ) {\n		material.iridescence = 0.0;\n	} else {\n		material.iridescence = saturate( material.iridescence );\n	}\n	if ( material.iridescence > 0.0 ) {\n		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );\n		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );\n		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );\n		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );\n		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );\n	}\n#endif\n#ifdef STANDARD\n	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );\n	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;\n	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )\n		float EssMs = material.dfg.x + material.dfg.y;\n		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );\n	#endif\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n	PointLight pointLight;\n	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n	PointLightShadow pointLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n		pointLight = pointLights[ i ];\n		getPointLightInfo( pointLight, geometryPosition, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )\n		pointLightShadow = pointLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n	SpotLight spotLight;\n	vec4 spotColor;\n	vec3 spotLightCoord;\n	bool inSpotLightMap;\n	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n	SpotLightShadow spotLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n		spotLight = spotLights[ i ];\n		getSpotLightInfo( spotLight, geometryPosition, directLight );\n		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX\n		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS\n		#else\n		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n		#endif\n		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )\n			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;\n			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );\n			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );\n			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;\n		#endif\n		#undef SPOT_LIGHT_MAP_INDEX\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n		spotLightShadow = spotLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )\n	SunLight sunLight;\n	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0\n	SunLightShadow sunLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {\n		sunLight = sunLights[ i ];\n		getSunLightInfo( sunLight, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )\n		sunLightShadow = sunLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n	DirectionalLight directionalLight;\n	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n	DirectionalLightShadow directionalLightShadow;\n	#endif\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n		directionalLight = directionalLights[ i ];\n		getDirectionalLightInfo( directionalLight, directLight );\n		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n		directionalLightShadow = directionalLightShadows[ i ];\n		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n		#endif\n		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n	RectAreaLight rectAreaLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n		rectAreaLight = rectAreaLights[ i ];\n		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n	}\n	#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n	vec3 iblIrradiance = vec3( 0.0 );\n	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n	#if defined( USE_LIGHT_PROBES )\n		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );\n	#endif\n	#if ( NUM_HEMI_LIGHTS > 0 )\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );\n		}\n		#pragma unroll_loop_end\n	#endif\n	#ifdef USE_LIGHT_PROBES_GRID\n		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;\n		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );\n		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );\n	#endif\n#endif\n#if defined( RE_IndirectSpecular )\n	vec3 radiance = vec3( 0.0 );\n	vec3 clearcoatRadiance = vec3( 0.0 );\n#endif",
	lights_fragment_maps: "#if defined( RE_IndirectDiffuse )\n	#ifdef USE_LIGHTMAP\n		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n		irradiance += lightMapIrradiance;\n	#endif\n	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )\n		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )\n			iblIrradiance += getIBLIrradiance( geometryNormal );\n		#endif\n	#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n	#ifdef USE_ANISOTROPY\n		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );\n	#else\n		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );\n	#endif\n	#ifdef USE_RETROREFLECTION\n		#ifdef USE_ANISOTROPY\n			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );\n		#else\n			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );\n		#endif\n		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );\n	#endif\n	radiance += iblRadiance;\n	#ifdef USE_CLEARCOAT\n		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );\n	#endif\n#endif",
	lights_fragment_end: "#if defined( RE_IndirectDiffuse )\n	#if defined( LAMBERT ) || defined( PHONG )\n		irradiance += iblIrradiance;\n	#endif\n	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif",
	lightprobes_pars_fragment: "#ifdef USE_LIGHT_PROBES_GRID\nuniform highp sampler3D probesSH;\nuniform vec3 probesMin;\nuniform vec3 probesMax;\nuniform vec3 probesResolution;\nvec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {\n	vec3 res = probesResolution;\n	vec3 gridRange = probesMax - probesMin;\n	vec3 resMinusOne = res - 1.0;\n	vec3 probeSpacing = gridRange / resMinusOne;\n	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;\n	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );\n	uvw = uvw * resMinusOne / res + 0.5 / res;\n	float nz          = res.z;\n	float paddedSlices = nz + 2.0;\n	float atlasDepth  = 7.0 * paddedSlices;\n	float uvZBase     = uvw.z * nz + 1.0;\n	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );\n	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );\n	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );\n	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );\n	vec3 c0 = s0.xyz;\n	vec3 c1 = vec3( s0.w, s1.xy );\n	vec3 c2 = vec3( s1.zw, s2.x );\n	vec3 c3 = s2.yzw;\n	vec3 c4 = s3.xyz;\n	vec3 c5 = vec3( s3.w, s4.xy );\n	vec3 c6 = vec3( s4.zw, s5.x );\n	vec3 c7 = s5.yzw;\n	vec3 c8 = s6.xyz;\n	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;\n	vec3 result = c0 * 0.886227;\n	result += c1 * 2.0 * 0.511664 * y;\n	result += c2 * 2.0 * 0.511664 * z;\n	result += c3 * 2.0 * 0.511664 * x;\n	result += c4 * 2.0 * 0.429043 * x * y;\n	result += c5 * 2.0 * 0.429043 * y * z;\n	result += c6 * ( 0.743125 * z * z - 0.247708 );\n	result += c7 * 2.0 * 0.429043 * x * z;\n	result += c8 * 0.429043 * ( x * x - y * y );\n	return max( result, vec3( 0.0 ) );\n}\n#endif",
	logdepthbuf_fragment: "#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )\n	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",
	logdepthbuf_pars_fragment: "#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )\n	uniform float logDepthBufFC;\n	varying float vFragDepth;\n	varying float vIsPerspective;\n#endif",
	logdepthbuf_pars_vertex: "#ifdef USE_LOGARITHMIC_DEPTH_BUFFER\n	varying float vFragDepth;\n	varying float vIsPerspective;\n#endif",
	logdepthbuf_vertex: "#ifdef USE_LOGARITHMIC_DEPTH_BUFFER\n	vFragDepth = 1.0 + gl_Position.w;\n	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n#endif",
	map_fragment: "#ifdef USE_MAP\n	vec4 sampledDiffuseColor = texture2D( map, vMapUv );\n	#ifdef DECODE_VIDEO_TEXTURE\n		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );\n	#endif\n	diffuseColor *= sampledDiffuseColor;\n#endif",
	map_pars_fragment: "#ifdef USE_MAP\n	uniform sampler2D map;\n#endif",
	map_particle_fragment: "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n	#if defined( USE_POINTS_UV )\n		vec2 uv = vUv;\n	#else\n		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n	#endif\n#endif\n#ifdef USE_MAP\n	diffuseColor *= texture2D( map, uv );\n#endif\n#ifdef USE_ALPHAMAP\n	diffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif",
	map_particle_pars_fragment: "#if defined( USE_POINTS_UV )\n	varying vec2 vUv;\n#else\n	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n		uniform mat3 uvTransform;\n	#endif\n#endif\n#ifdef USE_MAP\n	uniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n	uniform sampler2D alphaMap;\n#endif",
	metalnessmap_fragment: "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );\n	metalnessFactor *= texelMetalness.b;\n#endif",
	metalnessmap_pars_fragment: "#ifdef USE_METALNESSMAP\n	uniform sampler2D metalnessMap;\n#endif",
	morphinstance_vertex: "#ifdef USE_INSTANCING_MORPH\n	float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;\n	}\n#endif",
	morphcolor_vertex: "#if defined( USE_MORPHCOLORS )\n	vColor *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		#if defined( USE_COLOR_ALPHA )\n			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];\n		#elif defined( USE_COLOR )\n			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];\n		#endif\n	}\n#endif",
	morphnormal_vertex: "#ifdef USE_MORPHNORMALS\n	objectNormal *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];\n	}\n#endif",
	morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n	#ifndef USE_INSTANCING_MORPH\n		uniform float morphTargetBaseInfluence;\n		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n	#endif\n	uniform sampler2DArray morphTargetsTexture;\n	uniform ivec2 morphTargetsTextureSize;\n	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {\n		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;\n		int y = texelIndex / morphTargetsTextureSize.x;\n		int x = texelIndex - y * morphTargetsTextureSize.x;\n		ivec3 morphUV = ivec3( x, y, morphTargetIndex );\n		return texelFetch( morphTargetsTexture, morphUV, 0 );\n	}\n#endif",
	morphtarget_vertex: "#ifdef USE_MORPHTARGETS\n	transformed *= morphTargetBaseInfluence;\n	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];\n	}\n#endif",
	normal_fragment_begin: "float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n	vec3 fdx = dFdx( vViewPosition );\n	vec3 fdy = dFdy( vViewPosition );\n	vec3 normal = normalize( cross( fdx, fdy ) );\n#else\n	vec3 normal = normalize( vNormal );\n	#ifdef DOUBLE_SIDED\n		normal *= faceDirection;\n	#endif\n#endif\n#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )\n	#ifdef USE_TANGENT\n		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n	#else\n		mat3 tbn = getTangentFrame( - vViewPosition, normal,\n		#if defined( USE_NORMALMAP )\n			vNormalMapUv\n		#elif defined( USE_CLEARCOAT_NORMALMAP )\n			vClearcoatNormalMapUv\n		#else\n			vUv\n		#endif\n		);\n	#endif\n	#ifdef DOUBLE_SIDED\n		tbn[0] *= faceDirection;\n		tbn[1] *= faceDirection;\n	#endif\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	#ifdef USE_TANGENT\n		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n	#else\n		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );\n	#endif\n	#ifdef DOUBLE_SIDED\n		tbn2[0] *= faceDirection;\n		tbn2[1] *= faceDirection;\n	#endif\n#endif\nvec3 nonPerturbedNormal = normal;",
	normal_fragment_maps: "#ifdef USE_NORMALMAP_OBJECTSPACE\n	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n	#ifdef FLIP_SIDED\n		normal = - normal;\n	#endif\n	#ifdef DOUBLE_SIDED\n		normal = normal * faceDirection;\n	#endif\n	normal = normalize( normalMatrix * normal );\n#elif defined( USE_NORMALMAP_TANGENTSPACE )\n	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n	#if defined( USE_PACKED_NORMALMAP )\n		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );\n	#endif\n	mapN.xy *= normalScale;\n	normal = normalize( tbn * mapN );\n#elif defined( USE_BUMPMAP )\n	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif",
	normal_pars_fragment: "#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n	#ifdef USE_TANGENT\n		varying vec3 vTangent;\n		varying vec3 vBitangent;\n	#endif\n#endif",
	normal_pars_vertex: "#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n	#ifdef USE_TANGENT\n		varying vec3 vTangent;\n		varying vec3 vBitangent;\n	#endif\n#endif",
	normal_vertex: "#ifndef FLAT_SHADED\n	vNormal = normalize( transformedNormal );\n	#ifdef USE_TANGENT\n		vTangent = normalize( transformedTangent );\n		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n		#ifdef FLIP_SIDED\n			vBitangent = - vBitangent;\n		#endif\n	#endif\n#endif",
	normalmap_pars_fragment: "#ifdef USE_NORMALMAP\n	uniform sampler2D normalMap;\n	uniform vec2 normalScale;\n#endif\n#ifdef USE_NORMALMAP_OBJECTSPACE\n	uniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )\n	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {\n		vec3 q0 = dFdx( eye_pos.xyz );\n		vec3 q1 = dFdy( eye_pos.xyz );\n		vec2 st0 = dFdx( uv.st );\n		vec2 st1 = dFdy( uv.st );\n		vec3 N = surf_norm;\n		vec3 q1perp = cross( q1, N );\n		vec3 q0perp = cross( N, q0 );\n		vec3 T = q1perp * st0.x + q0perp * st1.x;\n		vec3 B = q1perp * st0.y + q0perp * st1.y;\n		float det = max( dot( T, T ), dot( B, B ) );\n		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );\n		return mat3( T * scale, B * scale, N );\n	}\n#endif",
	clearcoat_normal_fragment_begin: "#ifdef USE_CLEARCOAT\n	vec3 clearcoatNormal = nonPerturbedNormal;\n#endif",
	clearcoat_normal_fragment_maps: "#ifdef USE_CLEARCOAT_NORMALMAP\n	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;\n	clearcoatMapN.xy *= clearcoatNormalScale;\n	clearcoatNormal = normalize( tbn2 * clearcoatMapN );\n#endif",
	clearcoat_pars_fragment: "#ifdef USE_CLEARCOATMAP\n	uniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	uniform sampler2D clearcoatNormalMap;\n	uniform vec2 clearcoatNormalScale;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	uniform sampler2D clearcoatRoughnessMap;\n#endif",
	iridescence_pars_fragment: "#ifdef USE_IRIDESCENCEMAP\n	uniform sampler2D iridescenceMap;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	uniform sampler2D iridescenceThicknessMap;\n#endif",
	opaque_fragment: "#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= material.transmissionAlpha;\n#endif\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );",
	packing: "vec3 packNormalToRGB( const in vec3 normal ) {\n	return normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n	return 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;\nconst float Inv255 = 1. / 255.;\nconst vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );\nconst vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );\nconst vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );\nconst vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );\nvec4 packDepthToRGBA( const in float v ) {\n	if( v <= 0.0 )\n		return vec4( 0., 0., 0., 0. );\n	if( v >= 1.0 )\n		return vec4( 1., 1., 1., 1. );\n	float vuf;\n	float af = modf( v * PackFactors.a, vuf );\n	float bf = modf( vuf * ShiftRight8, vuf );\n	float gf = modf( vuf * ShiftRight8, vuf );\n	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );\n}\nvec3 packDepthToRGB( const in float v ) {\n	if( v <= 0.0 )\n		return vec3( 0., 0., 0. );\n	if( v >= 1.0 )\n		return vec3( 1., 1., 1. );\n	float vuf;\n	float bf = modf( v * PackFactors.b, vuf );\n	float gf = modf( vuf * ShiftRight8, vuf );\n	return vec3( vuf * Inv255, gf * PackUpscale, bf );\n}\nvec2 packDepthToRG( const in float v ) {\n	if( v <= 0.0 )\n		return vec2( 0., 0. );\n	if( v >= 1.0 )\n		return vec2( 1., 1. );\n	float vuf;\n	float gf = modf( v * 256., vuf );\n	return vec2( vuf * Inv255, gf );\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n	return dot( v, UnpackFactors4 );\n}\nfloat unpackRGBToDepth( const in vec3 v ) {\n	return dot( v, UnpackFactors3 );\n}\nfloat unpackRGToDepth( const in vec2 v ) {\n	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;\n}\nvec4 pack2HalfToRGBA( const in vec2 v ) {\n	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );\n	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );\n}\nvec2 unpackRGBATo2Half( const in vec4 v ) {\n	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n	return ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {\n	#ifdef USE_REVERSED_DEPTH_BUFFER\n	\n		return depth * ( far - near ) - far;\n	#else\n		return depth * ( near - far ) - near;\n	#endif\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {\n	\n	#ifdef USE_REVERSED_DEPTH_BUFFER\n		return ( near * far ) / ( ( near - far ) * depth - near );\n	#else\n		return ( near * far ) / ( ( far - near ) * depth - far );\n	#endif\n}",
	premultiplied_alpha_fragment: "#ifdef PREMULTIPLIED_ALPHA\n	gl_FragColor.rgb *= gl_FragColor.a;\n#endif",
	project_vertex: "vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_BATCHING\n	mvPosition = batchingMatrix * mvPosition;\n#endif\n#ifdef USE_INSTANCING\n	mvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;",
	dithering_fragment: "#ifdef DITHERING\n	gl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif",
	dithering_pars_fragment: "#ifdef DITHERING\n	vec3 dithering( vec3 color ) {\n		float grid_position = rand( gl_FragCoord.xy );\n		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n		return color + dither_shift_RGB;\n	}\n#endif",
	roughnessmap_fragment: "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );\n	roughnessFactor *= texelRoughness.g;\n#endif",
	roughnessmap_pars_fragment: "#ifdef USE_ROUGHNESSMAP\n	uniform sampler2D roughnessMap;\n#endif",
	shadowmap_pars_fragment: "#if NUM_SPOT_LIGHT_COORDS > 0\n	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#if NUM_SPOT_LIGHT_MAPS > 0\n	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];\n#endif\n#ifdef USE_SHADOWMAP\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n		#define SUN_LIGHT_CASCADES 2\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];\n		#else\n			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];\n		#endif\n		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];\n		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];\n		varying vec4 vSunShadowWorldPosition;\n		varying vec3 vSunShadowWorldNormal;\n		struct SunLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n		#else\n			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n		#endif\n		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n		struct DirectionalLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n		#else\n			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n		#endif\n		struct SpotLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		#if defined( SHADOWMAP_TYPE_PCF )\n			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n		#elif defined( SHADOWMAP_TYPE_BASIC )\n			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n		#endif\n		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n		struct PointLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n			float shadowCameraNear;\n			float shadowCameraFar;\n		};\n		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n	#endif\n	#if defined( SHADOWMAP_TYPE_PCF )\n		float interleavedGradientNoise( vec2 position ) {\n			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );\n		}\n		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {\n			const float goldenAngle = 2.399963229728653;\n			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );\n			float theta = float( sampleIndex ) * goldenAngle + phi;\n			return vec2( cos( theta ), sin( theta ) ) * r;\n		}\n	#endif\n	#if defined( SHADOWMAP_TYPE_PCF )\n		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n			float shadow = 1.0;\n			shadowCoord.xyz /= shadowCoord.w;\n			shadowCoord.z += shadowBias;\n			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n			if ( frustumTest ) {\n				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n				float radius = shadowRadius * texelSize.x;\n				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;\n				shadow = (\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +\n					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )\n				) * 0.2;\n			}\n			return mix( 1.0, shadow, shadowIntensity );\n		}\n	#elif defined( SHADOWMAP_TYPE_VSM )\n		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n			float shadow = 1.0;\n			shadowCoord.xyz /= shadowCoord.w;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				shadowCoord.z -= shadowBias;\n			#else\n				shadowCoord.z += shadowBias;\n			#endif\n			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n			if ( frustumTest ) {\n				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;\n				float mean = distribution.x;\n				float variance = distribution.y * distribution.y;\n				#ifdef USE_REVERSED_DEPTH_BUFFER\n					float hard_shadow = step( mean, shadowCoord.z );\n				#else\n					float hard_shadow = step( shadowCoord.z, mean );\n				#endif\n				\n				if ( hard_shadow == 1.0 ) {\n					shadow = 1.0;\n				} else {\n					variance = max( variance, 0.0000001 );\n					float d = shadowCoord.z - mean;\n					float p_max = variance / ( variance + d * d );\n					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );\n					shadow = max( hard_shadow, p_max );\n				}\n			}\n			return mix( 1.0, shadow, shadowIntensity );\n		}\n	#else\n		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n			float shadow = 1.0;\n			shadowCoord.xyz /= shadowCoord.w;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				shadowCoord.z -= shadowBias;\n			#else\n				shadowCoord.z += shadowBias;\n			#endif\n			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n			if ( frustumTest ) {\n				float depth = texture2D( shadowMap, shadowCoord.xy ).r;\n				#ifdef USE_REVERSED_DEPTH_BUFFER\n					shadow = step( depth, shadowCoord.z );\n				#else\n					shadow = step( shadowCoord.z, depth );\n				#endif\n			}\n			return mix( 1.0, shadow, shadowIntensity );\n		}\n	#endif\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n		float getSunShadow(\n			#if defined( SHADOWMAP_TYPE_PCF )\n				sampler2DShadow shadowMap,\n			#else\n				sampler2D shadowMap,\n			#endif\n			SunLightShadow sunLightShadow,\n			int shadowIndex\n		) {\n			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );\n			float viewDepth = vSunShadowWorldPosition.w;\n			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;\n			float shadow = 1.0;\n			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {\n				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];\n				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {\n					float cascadeShadow = getShadow(\n						shadowMap,\n						sunLightShadow.shadowMapSize,\n						sunLightShadow.shadowIntensity,\n						sunLightShadow.shadowBias,\n						sunLightShadow.shadowRadius,\n						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition\n					);\n					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );\n				}\n			}\n			return shadow;\n		}\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n	#if defined( SHADOWMAP_TYPE_PCF )\n	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n		float shadow = 1.0;\n		vec3 lightToPosition = shadowCoord.xyz;\n		vec3 bd3D = normalize( lightToPosition );\n		vec3 absVec = abs( lightToPosition );\n		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );\n		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );\n				dp -= shadowBias;\n			#else\n				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );\n				dp += shadowBias;\n			#endif\n			float texelSize = shadowRadius / shadowMapSize.x;\n			vec3 absDir = abs( bd3D );\n			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );\n			tangent = normalize( cross( bd3D, tangent ) );\n			vec3 bitangent = cross( bd3D, tangent );\n			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;\n			vec2 sample0 = vogelDiskSample( 0, 5, phi );\n			vec2 sample1 = vogelDiskSample( 1, 5, phi );\n			vec2 sample2 = vogelDiskSample( 2, 5, phi );\n			vec2 sample3 = vogelDiskSample( 3, 5, phi );\n			vec2 sample4 = vogelDiskSample( 4, 5, phi );\n			shadow = (\n				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +\n				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +\n				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +\n				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +\n				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )\n			) * 0.2;\n		}\n		return mix( 1.0, shadow, shadowIntensity );\n	}\n	#elif defined( SHADOWMAP_TYPE_BASIC )\n	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n		float shadow = 1.0;\n		vec3 lightToPosition = shadowCoord.xyz;\n		vec3 absVec = abs( lightToPosition );\n		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );\n		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {\n			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );\n			dp += shadowBias;\n			vec3 bd3D = normalize( lightToPosition );\n			float depth = textureCube( shadowMap, bd3D ).r;\n			#ifdef USE_REVERSED_DEPTH_BUFFER\n				depth = 1.0 - depth;\n			#endif\n			shadow = step( dp, depth );\n		}\n		return mix( 1.0, shadow, shadowIntensity );\n	}\n	#endif\n	#endif\n#endif",
	shadowmap_pars_vertex: "#if NUM_SPOT_LIGHT_COORDS > 0\n	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];\n	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#ifdef USE_SHADOWMAP\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n		varying vec4 vSunShadowWorldPosition;\n		varying vec3 vSunShadowWorldNormal;\n	#endif\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n		struct DirectionalLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n		struct SpotLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n		};\n		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n		struct PointLightShadow {\n			float shadowIntensity;\n			float shadowBias;\n			float shadowNormalBias;\n			float shadowRadius;\n			vec2 shadowMapSize;\n			float shadowCameraNear;\n			float shadowCameraFar;\n		};\n		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n	#endif\n#endif",
	shadowmap_vertex: "#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )\n	#ifdef HAS_NORMAL\n		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );\n	#else\n		vec3 shadowWorldNormal = vec3( 0.0 );\n	#endif\n	vec4 shadowWorldPosition;\n#endif\n#if defined( USE_SHADOWMAP )\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );\n		vSunShadowWorldNormal = shadowWorldNormal;\n	#endif\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n		}\n		#pragma unroll_loop_end\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0\n		#pragma unroll_loop_start\n		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n		}\n		#pragma unroll_loop_end\n	#endif\n#endif\n#if NUM_SPOT_LIGHT_COORDS > 0\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {\n		shadowWorldPosition = worldPosition;\n		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;\n		#endif\n		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;\n	}\n	#pragma unroll_loop_end\n#endif",
	shadowmask_pars_fragment: "float getShadowMask() {\n	float shadow = 1.0;\n	#ifdef USE_SHADOWMAP\n	#if NUM_SUN_LIGHT_SHADOWS > 0\n	SunLightShadow sunLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {\n		sunLight = sunLightShadows[ i ];\n		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_DIR_LIGHT_SHADOWS > 0\n	DirectionalLightShadow directionalLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n		directionalLight = directionalLightShadows[ i ];\n		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_SPOT_LIGHT_SHADOWS > 0\n	SpotLightShadow spotLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n		spotLight = spotLightShadows[ i ];\n		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )\n	PointLightShadow pointLight;\n	#pragma unroll_loop_start\n	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n		pointLight = pointLightShadows[ i ];\n		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n	}\n	#pragma unroll_loop_end\n	#endif\n	#endif\n	return shadow;\n}",
	skinbase_vertex: "#ifdef USE_SKINNING\n	mat4 boneMatX = getBoneMatrix( skinIndex.x );\n	mat4 boneMatY = getBoneMatrix( skinIndex.y );\n	mat4 boneMatZ = getBoneMatrix( skinIndex.z );\n	mat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",
	skinning_pars_vertex: "#ifdef USE_SKINNING\n	uniform mat4 bindMatrix;\n	uniform mat4 bindMatrixInverse;\n	uniform highp sampler2D boneTexture;\n	mat4 getBoneMatrix( const in float i ) {\n		int size = textureSize( boneTexture, 0 ).x;\n		int j = int( i ) * 4;\n		int x = j % size;\n		int y = j / size;\n		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );\n		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );\n		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );\n		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );\n		return mat4( v1, v2, v3, v4 );\n	}\n#endif",
	skinning_vertex: "#ifdef USE_SKINNING\n	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n	vec4 skinned = vec4( 0.0 );\n	skinned += boneMatX * skinVertex * skinWeight.x;\n	skinned += boneMatY * skinVertex * skinWeight.y;\n	skinned += boneMatZ * skinVertex * skinWeight.z;\n	skinned += boneMatW * skinVertex * skinWeight.w;\n	transformed = ( bindMatrixInverse * skinned ).xyz;\n#endif",
	skinnormal_vertex: "#ifdef USE_SKINNING\n	mat4 skinMatrix = mat4( 0.0 );\n	skinMatrix += skinWeight.x * boneMatX;\n	skinMatrix += skinWeight.y * boneMatY;\n	skinMatrix += skinWeight.z * boneMatZ;\n	skinMatrix += skinWeight.w * boneMatW;\n	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n	#ifdef USE_TANGENT\n		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n	#endif\n#endif",
	specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\n	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );\n	specularStrength = texelSpecular.r;\n#else\n	specularStrength = 1.0;\n#endif",
	specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\n	uniform sampler2D specularMap;\n#endif",
	tonemapping_fragment: "#if defined( TONE_MAPPING )\n	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif",
	tonemapping_pars_fragment: "#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n	return saturate( toneMappingExposure * color );\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n	color *= toneMappingExposure;\n	return saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 CineonToneMapping( vec3 color ) {\n	color *= toneMappingExposure;\n	color = max( vec3( 0.0 ), color - 0.004 );\n	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n	return a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n	const mat3 ACESInputMat = mat3(\n		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),\n		vec3( 0.04823, 0.01566, 0.83777 )\n	);\n	const mat3 ACESOutputMat = mat3(\n		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),\n		vec3( -0.07367, -0.00605,  1.07602 )\n	);\n	color *= toneMappingExposure / 0.6;\n	color = ACESInputMat * color;\n	color = RRTAndODTFit( color );\n	color = ACESOutputMat * color;\n	return saturate( color );\n}\nconst mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(\n	vec3( 1.6605, - 0.1246, - 0.0182 ),\n	vec3( - 0.5876, 1.1329, - 0.1006 ),\n	vec3( - 0.0728, - 0.0083, 1.1187 )\n);\nconst mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(\n	vec3( 0.6274, 0.0691, 0.0164 ),\n	vec3( 0.3293, 0.9195, 0.0880 ),\n	vec3( 0.0433, 0.0113, 0.8956 )\n);\nvec3 agxDefaultContrastApprox( vec3 x ) {\n	vec3 x2 = x * x;\n	vec3 x4 = x2 * x2;\n	return + 15.5 * x4 * x2\n		- 40.14 * x4 * x\n		+ 31.96 * x4\n		- 6.868 * x2 * x\n		+ 0.4298 * x2\n		+ 0.1191 * x\n		- 0.00232;\n}\nvec3 AgXToneMapping( vec3 color ) {\n	const mat3 AgXInsetMatrix = mat3(\n		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),\n		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),\n		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )\n	);\n	const mat3 AgXOutsetMatrix = mat3(\n		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),\n		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),\n		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )\n	);\n	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;\n	color *= toneMappingExposure;\n	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;\n	color = AgXInsetMatrix * color;\n	color = max( color, 1e-10 );	color = log2( color );\n	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );\n	color = clamp( color, 0.0, 1.0 );\n	color = agxDefaultContrastApprox( color );\n	color = AgXOutsetMatrix * color;\n	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );\n	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;\n	color = clamp( color, 0.0, 1.0 );\n	return color;\n}\nvec3 NeutralToneMapping( vec3 color ) {\n	const float StartCompression = 0.8 - 0.04;\n	const float Desaturation = 0.15;\n	color *= toneMappingExposure;\n	float x = min( color.r, min( color.g, color.b ) );\n	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;\n	color -= offset;\n	float peak = max( color.r, max( color.g, color.b ) );\n	if ( peak < StartCompression ) return color;\n	float d = 1. - StartCompression;\n	float newPeak = 1. - d * d / ( peak + d - StartCompression );\n	color *= newPeak / peak;\n	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );\n	return mix( color, vec3( newPeak ), g );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }",
	transmission_fragment: "#ifdef USE_TRANSMISSION\n	material.transmission = transmission;\n	material.transmissionAlpha = 1.0;\n	material.thickness = thickness;\n	material.attenuationDistance = attenuationDistance;\n	material.attenuationColor = attenuationColor;\n	#ifdef USE_TRANSMISSIONMAP\n		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;\n	#endif\n	#ifdef USE_THICKNESSMAP\n		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;\n	#endif\n	vec3 pos = vWorldPosition;\n	vec3 v = normalize( cameraPosition - pos );\n	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );\n	vec4 transmitted = getIBLVolumeRefraction(\n		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,\n		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,\n		material.attenuationColor, material.attenuationDistance );\n	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );\n	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );\n#endif",
	transmission_pars_fragment: "#ifdef USE_TRANSMISSION\n	uniform float transmission;\n	uniform float thickness;\n	uniform float attenuationDistance;\n	uniform vec3 attenuationColor;\n	#ifdef USE_TRANSMISSIONMAP\n		uniform sampler2D transmissionMap;\n	#endif\n	#ifdef USE_THICKNESSMAP\n		uniform sampler2D thicknessMap;\n	#endif\n	uniform vec2 transmissionSamplerSize;\n	uniform sampler2D transmissionSamplerMap;\n	uniform mat4 modelMatrix;\n	uniform mat4 projectionMatrix;\n	varying vec3 vWorldPosition;\n	float w0( float a ) {\n		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );\n	}\n	float w1( float a ) {\n		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );\n	}\n	float w2( float a ){\n		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );\n	}\n	float w3( float a ) {\n		return ( 1.0 / 6.0 ) * ( a * a * a );\n	}\n	float g0( float a ) {\n		return w0( a ) + w1( a );\n	}\n	float g1( float a ) {\n		return w2( a ) + w3( a );\n	}\n	float h0( float a ) {\n		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );\n	}\n	float h1( float a ) {\n		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );\n	}\n	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {\n		uv = uv * texelSize.zw + 0.5;\n		vec2 iuv = floor( uv );\n		vec2 fuv = fract( uv );\n		float g0x = g0( fuv.x );\n		float g1x = g1( fuv.x );\n		float h0x = h0( fuv.x );\n		float h1x = h1( fuv.x );\n		float h0y = h0( fuv.y );\n		float h1y = h1( fuv.y );\n		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +\n			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );\n	}\n	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {\n		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );\n		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );\n		vec2 fLodSizeInv = 1.0 / fLodSize;\n		vec2 cLodSizeInv = 1.0 / cLodSize;\n		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );\n		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );\n		return mix( fSample, cSample, fract( lod ) );\n	}\n	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {\n		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );\n		vec3 modelScale;\n		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );\n		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );\n		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );\n		return normalize( refractionVector ) * thickness * modelScale;\n	}\n	float applyIorToRoughness( const in float roughness, const in float ior ) {\n		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );\n	}\n	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {\n		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );\n		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );\n	}\n	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {\n		if ( isinf( attenuationDistance ) ) {\n			return vec3( 1.0 );\n		} else {\n			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;\n			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;\n		}\n	}\n	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,\n		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,\n		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,\n		const in vec3 attenuationColor, const in float attenuationDistance ) {\n		vec4 transmittedLight;\n		vec3 transmittance;\n		#ifdef USE_DISPERSION\n			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;\n			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );\n			for ( int i = 0; i < 3; i ++ ) {\n				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );\n				vec3 refractedRayExit = position + transmissionRay;\n				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n				vec2 refractionCoords = ndcPos.xy / ndcPos.w;\n				refractionCoords += 1.0;\n				refractionCoords /= 2.0;\n				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );\n				transmittedLight[ i ] = transmissionSample[ i ];\n				transmittedLight.a += transmissionSample.a;\n				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];\n			}\n			transmittedLight.a /= 3.0;\n		#else\n			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );\n			vec3 refractedRayExit = position + transmissionRay;\n			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n			vec2 refractionCoords = ndcPos.xy / ndcPos.w;\n			refractionCoords += 1.0;\n			refractionCoords /= 2.0;\n			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );\n			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );\n		#endif\n		vec3 attenuatedColor = transmittance * transmittedLight.rgb;\n		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );\n		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;\n		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );\n	}\n#endif",
	uv_pars_fragment: "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	varying vec2 vUv;\n#endif\n#ifdef USE_MAP\n	varying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n	varying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n	varying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n	varying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n	varying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n	varying vec2 vNormalMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n	varying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n	varying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	varying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	varying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n	varying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	varying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	varying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	varying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	varying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	varying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	varying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n	varying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	varying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	varying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	uniform mat3 transmissionMapTransform;\n	varying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n	uniform mat3 thicknessMapTransform;\n	varying vec2 vThicknessMapUv;\n#endif",
	uv_pars_vertex: "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	varying vec2 vUv;\n#endif\n#ifdef USE_MAP\n	uniform mat3 mapTransform;\n	varying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n	uniform mat3 alphaMapTransform;\n	varying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n	uniform mat3 lightMapTransform;\n	varying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n	uniform mat3 aoMapTransform;\n	varying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n	uniform mat3 bumpMapTransform;\n	varying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n	uniform mat3 normalMapTransform;\n	varying vec2 vNormalMapUv;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n	uniform mat3 displacementMapTransform;\n	varying vec2 vDisplacementMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n	uniform mat3 emissiveMapTransform;\n	varying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n	uniform mat3 metalnessMapTransform;\n	varying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	uniform mat3 roughnessMapTransform;\n	varying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	uniform mat3 anisotropyMapTransform;\n	varying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n	uniform mat3 clearcoatMapTransform;\n	varying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	uniform mat3 clearcoatNormalMapTransform;\n	varying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	uniform mat3 clearcoatRoughnessMapTransform;\n	varying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	uniform mat3 sheenColorMapTransform;\n	varying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	uniform mat3 sheenRoughnessMapTransform;\n	varying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	uniform mat3 iridescenceMapTransform;\n	varying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	uniform mat3 iridescenceThicknessMapTransform;\n	varying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n	uniform mat3 specularMapTransform;\n	varying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	uniform mat3 specularColorMapTransform;\n	varying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	uniform mat3 specularIntensityMapTransform;\n	varying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	uniform mat3 transmissionMapTransform;\n	varying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n	uniform mat3 thicknessMapTransform;\n	varying vec2 vThicknessMapUv;\n#endif",
	uv_vertex: "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n	vUv = vec3( uv, 1 ).xy;\n#endif\n#ifdef USE_MAP\n	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ALPHAMAP\n	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_LIGHTMAP\n	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_AOMAP\n	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_BUMPMAP\n	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_NORMALMAP\n	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_EMISSIVEMAP\n	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_METALNESSMAP\n	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ROUGHNESSMAP\n	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ANISOTROPYMAP\n	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOATMAP\n	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULARMAP\n	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_THICKNESSMAP\n	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;\n#endif",
	worldpos_vertex: "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0\n	vec4 worldPosition = vec4( transformed, 1.0 );\n	#ifdef USE_BATCHING\n		worldPosition = batchingMatrix * worldPosition;\n	#endif\n	#ifdef USE_INSTANCING\n		worldPosition = instanceMatrix * worldPosition;\n	#endif\n	worldPosition = modelMatrix * worldPosition;\n#endif",
	background_vert: "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n	gl_Position = vec4( position.xy, 1.0, 1.0 );\n}",
	background_frag: "uniform sampler2D t2D;\nuniform float backgroundIntensity;\nvarying vec2 vUv;\nvoid main() {\n	vec4 texColor = texture2D( t2D, vUv );\n	#ifdef DECODE_VIDEO_TEXTURE\n		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );\n	#endif\n	texColor.rgb *= backgroundIntensity;\n	gl_FragColor = texColor;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",
	backgroundCube_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n	gl_Position.z = gl_Position.w;\n}",
	backgroundCube_frag: "#ifdef ENVMAP_TYPE_CUBE\n	uniform samplerCube envMap;\n#elif defined( ENVMAP_TYPE_CUBE_UV )\n	uniform sampler2D envMap;\n#endif\nuniform float backgroundBlurriness;\nuniform float backgroundIntensity;\nuniform mat3 backgroundRotation;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n	#ifdef ENVMAP_TYPE_CUBE\n		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );\n	#elif defined( ENVMAP_TYPE_CUBE_UV )\n		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );\n	#else\n		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n	#endif\n	texColor.rgb *= backgroundIntensity;\n	gl_FragColor = texColor;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",
	cube_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n	gl_Position.z = gl_Position.w;\n}",
	cube_frag: "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldDirection;\nvoid main() {\n	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n	gl_FragColor = texColor;\n	gl_FragColor.a *= opacity;\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",
	depth_vert: "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <skinbase_vertex>\n	#include <morphinstance_vertex>\n	#ifdef USE_DISPLACEMENTMAP\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vHighPrecisionZW = gl_Position.zw;\n}",
	depth_frag: "#if DEPTH_PACKING == 3200\n	uniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n	vec4 diffuseColor = vec4( 1.0 );\n	#include <clipping_planes_fragment>\n	#if DEPTH_PACKING == 3200\n		diffuseColor.a = opacity;\n	#endif\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <logdepthbuf_fragment>\n	#ifdef USE_REVERSED_DEPTH_BUFFER\n		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];\n	#else\n		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;\n	#endif\n	#if DEPTH_PACKING == 3200\n		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n	#elif DEPTH_PACKING == 3201\n		gl_FragColor = packDepthToRGBA( fragCoordZ );\n	#elif DEPTH_PACKING == 3202\n		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );\n	#elif DEPTH_PACKING == 3203\n		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );\n	#endif\n}",
	distance_vert: "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <skinbase_vertex>\n	#include <morphinstance_vertex>\n	#ifdef USE_DISPLACEMENTMAP\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <worldpos_vertex>\n	#include <clipping_planes_vertex>\n	vWorldPosition = worldPosition.xyz;\n}",
	distance_frag: "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( 1.0 );\n	#include <clipping_planes_fragment>\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	float dist = length( vWorldPosition - referencePosition );\n	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n	dist = saturate( dist );\n	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );\n}",
	equirect_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vWorldDirection = transformDirection( position, modelMatrix );\n	#include <begin_vertex>\n	#include <project_vertex>\n}",
	equirect_frag: "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n	vec3 direction = normalize( vWorldDirection );\n	vec2 sampleUV = equirectUv( direction );\n	gl_FragColor = texture2D( tEquirect, sampleUV );\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n}",
	linedashed_vert: "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	vLineDistance = scale * lineDistance;\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n}",
	linedashed_frag: "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	if ( mod( vLineDistance, totalSize ) > dashSize ) {\n		discard;\n	}\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}",
	meshbasic_vert: "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n		#include <beginnormal_vertex>\n		#include <morphnormal_vertex>\n		#include <skinbase_vertex>\n		#include <skinnormal_vertex>\n		#include <defaultnormal_vertex>\n	#endif\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <fog_vertex>\n}",
	meshbasic_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n	varying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	#ifdef USE_LIGHTMAP\n		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;\n	#else\n		reflectedLight.indirectDiffuse += vec3( 1.0 );\n	#endif\n	#include <aomap_fragment>\n	reflectedLight.indirectDiffuse *= diffuseColor.rgb;\n	vec3 outgoingLight = reflectedLight.indirectDiffuse;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshlambert_vert: "#define LAMBERT\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",
	meshlambert_frag: "#define LAMBERT\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_lambert_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_lambert_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshmatcap_vert: "#define MATCAP\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n	vViewPosition = - mvPosition.xyz;\n}",
	meshmatcap_frag: "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	vec3 viewDir = normalize( vViewPosition );\n	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n	vec3 y = cross( viewDir, x );\n	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n	#ifdef USE_MATCAP\n		vec4 matcapColor = texture2D( matcap, uv );\n	#else\n		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );\n	#endif\n	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshnormal_vert: "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	varying vec3 vViewPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	vViewPosition = - mvPosition.xyz;\n#endif\n}",
	meshnormal_frag: "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n	varying vec3 vViewPosition;\n#endif\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );\n	#include <clipping_planes_fragment>\n	#include <logdepthbuf_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );\n	#ifdef OPAQUE\n		gl_FragColor.a = 1.0;\n	#endif\n}",
	meshphong_vert: "#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <envmap_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",
	meshphong_frag: "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <specularmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_phong_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n	#include <envmap_fragment>\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshphysical_vert: "#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n	varying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n#ifdef USE_TRANSMISSION\n	vWorldPosition = worldPosition.xyz;\n#endif\n}",
	meshphysical_frag: "#define STANDARD\n#ifdef PHYSICAL\n	#define IOR\n	#define USE_SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n	uniform float ior;\n#endif\n#ifdef USE_SPECULAR\n	uniform float specularIntensity;\n	uniform vec3 specularColor;\n	#ifdef USE_SPECULAR_COLORMAP\n		uniform sampler2D specularColorMap;\n	#endif\n	#ifdef USE_SPECULAR_INTENSITYMAP\n		uniform sampler2D specularIntensityMap;\n	#endif\n#endif\n#ifdef USE_CLEARCOAT\n	uniform float clearcoat;\n	uniform float clearcoatRoughness;\n#endif\n#ifdef USE_DISPERSION\n	uniform float dispersion;\n#endif\n#ifdef USE_RETROREFLECTION\n	uniform float retroreflectivity;\n#endif\n#ifdef USE_IRIDESCENCE\n	uniform float iridescence;\n	uniform float iridescenceIOR;\n	uniform float iridescenceThicknessMinimum;\n	uniform float iridescenceThicknessMaximum;\n#endif\n#ifdef USE_SHEEN\n	uniform vec3 sheenColor;\n	uniform float sheenRoughness;\n	#ifdef USE_SHEEN_COLORMAP\n		uniform sampler2D sheenColorMap;\n	#endif\n	#ifdef USE_SHEEN_ROUGHNESSMAP\n		uniform sampler2D sheenRoughnessMap;\n	#endif\n#endif\n#ifdef USE_ANISOTROPY\n	uniform vec2 anisotropyVector;\n	#ifdef USE_ANISOTROPYMAP\n		uniform sampler2D anisotropyMap;\n	#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <iridescence_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <roughnessmap_fragment>\n	#include <metalnessmap_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <clearcoat_normal_fragment_begin>\n	#include <clearcoat_normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_physical_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n	#include <transmission_fragment>\n	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n	#ifdef USE_SHEEN\n \n		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;\n \n 	#endif\n	#ifdef USE_CLEARCOAT\n		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );\n		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;\n	#endif\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	meshtoon_vert: "#define TOON\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <normal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <displacementmap_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	vViewPosition = - mvPosition.xyz;\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",
	meshtoon_frag: "#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n	vec3 totalEmissiveRadiance = emissive;\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <color_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	#include <normal_fragment_begin>\n	#include <normal_fragment_maps>\n	#include <emissivemap_fragment>\n	#include <lights_toon_fragment>\n	#include <lights_fragment_begin>\n	#include <lights_fragment_maps>\n	#include <lights_fragment_end>\n	#include <aomap_fragment>\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n	#include <dithering_fragment>\n}",
	points_vert: "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n#ifdef USE_POINTS_UV\n	varying vec2 vUv;\n	uniform mat3 uvTransform;\n#endif\nvoid main() {\n	#ifdef USE_POINTS_UV\n		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n	#endif\n	#include <color_vertex>\n	#include <morphinstance_vertex>\n	#include <morphcolor_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <project_vertex>\n	gl_PointSize = size;\n	#ifdef USE_SIZEATTENUATION\n		bool isPerspective = isPerspectiveMatrix( projectionMatrix );\n		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n	#endif\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <worldpos_vertex>\n	#include <fog_vertex>\n}",
	points_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_particle_fragment>\n	#include <color_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}",
	shadow_vert: "#include <common>\n#include <batching_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n	#include <batching_vertex>\n	#include <beginnormal_vertex>\n	#include <morphinstance_vertex>\n	#include <morphnormal_vertex>\n	#include <skinbase_vertex>\n	#include <skinnormal_vertex>\n	#include <defaultnormal_vertex>\n	#include <begin_vertex>\n	#include <morphtarget_vertex>\n	#include <skinning_vertex>\n	#include <project_vertex>\n	#include <logdepthbuf_vertex>\n	#include <worldpos_vertex>\n	#include <shadowmap_vertex>\n	#include <fog_vertex>\n}",
	shadow_frag: "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <logdepthbuf_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n	#include <logdepthbuf_fragment>\n	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n	#include <premultiplied_alpha_fragment>\n}",
	sprite_vert: "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n	#include <uv_vertex>\n	vec4 mvPosition = modelViewMatrix[ 3 ];\n	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );\n	#ifndef USE_SIZEATTENUATION\n		bool isPerspective = isPerspectiveMatrix( projectionMatrix );\n		if ( isPerspective ) scale *= - mvPosition.z;\n	#endif\n	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n	vec2 rotatedPosition;\n	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n	mvPosition.xy += rotatedPosition;\n	gl_Position = projectionMatrix * mvPosition;\n	#include <logdepthbuf_vertex>\n	#include <clipping_planes_vertex>\n	#include <fog_vertex>\n}",
	sprite_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n	vec4 diffuseColor = vec4( diffuse, opacity );\n	#include <clipping_planes_fragment>\n	vec3 outgoingLight = vec3( 0.0 );\n	#include <logdepthbuf_fragment>\n	#include <map_fragment>\n	#include <alphamap_fragment>\n	#include <alphatest_fragment>\n	#include <alphahash_fragment>\n	outgoingLight = diffuseColor.rgb;\n	#include <opaque_fragment>\n	#include <tonemapping_fragment>\n	#include <colorspace_fragment>\n	#include <fog_fragment>\n}"
}, Z = {
	common: {
		diffuse: { value: /*@__PURE__*/ new J(16777215) },
		opacity: { value: 1 },
		map: { value: null },
		mapTransform: { value: /*@__PURE__*/ new G() },
		alphaMap: { value: null },
		alphaMapTransform: { value: /*@__PURE__*/ new G() },
		alphaTest: { value: 0 }
	},
	specularmap: {
		specularMap: { value: null },
		specularMapTransform: { value: /*@__PURE__*/ new G() }
	},
	envmap: {
		envMap: { value: null },
		envMapRotation: { value: /*@__PURE__*/ new G() },
		reflectivity: { value: 1 },
		ior: { value: 1.5 },
		refractionRatio: { value: .98 },
		dfgLUT: { value: null }
	},
	aomap: {
		aoMap: { value: null },
		aoMapIntensity: { value: 1 },
		aoMapTransform: { value: /*@__PURE__*/ new G() }
	},
	lightmap: {
		lightMap: { value: null },
		lightMapIntensity: { value: 1 },
		lightMapTransform: { value: /*@__PURE__*/ new G() }
	},
	bumpmap: {
		bumpMap: { value: null },
		bumpMapTransform: { value: /*@__PURE__*/ new G() },
		bumpScale: { value: 1 }
	},
	normalmap: {
		normalMap: { value: null },
		normalMapTransform: { value: /*@__PURE__*/ new G() },
		normalScale: { value: /*@__PURE__*/ new U(1, 1) }
	},
	displacementmap: {
		displacementMap: { value: null },
		displacementMapTransform: { value: /*@__PURE__*/ new G() },
		displacementScale: { value: 1 },
		displacementBias: { value: 0 }
	},
	emissivemap: {
		emissiveMap: { value: null },
		emissiveMapTransform: { value: /*@__PURE__*/ new G() }
	},
	metalnessmap: {
		metalnessMap: { value: null },
		metalnessMapTransform: { value: /*@__PURE__*/ new G() }
	},
	roughnessmap: {
		roughnessMap: { value: null },
		roughnessMapTransform: { value: /*@__PURE__*/ new G() }
	},
	gradientmap: { gradientMap: { value: null } },
	fog: {
		fogDensity: { value: 25e-5 },
		fogNear: { value: 1 },
		fogFar: { value: 2e3 },
		fogColor: { value: /*@__PURE__*/ new J(16777215) }
	},
	lights: {
		ambientLightColor: { value: [] },
		lightProbe: { value: [] },
		sunLights: {
			value: [],
			properties: {
				direction: {},
				color: {}
			}
		},
		sunLightShadows: {
			value: [],
			properties: {
				shadowIntensity: 1,
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			}
		},
		sunShadowMatrix: { value: [] },
		sunShadowCascade: { value: [] },
		directionalLights: {
			value: [],
			properties: {
				direction: {},
				color: {}
			}
		},
		directionalLightShadows: {
			value: [],
			properties: {
				shadowIntensity: 1,
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			}
		},
		directionalShadowMatrix: { value: [] },
		spotLights: {
			value: [],
			properties: {
				color: {},
				position: {},
				direction: {},
				distance: {},
				coneCos: {},
				penumbraCos: {},
				decay: {}
			}
		},
		spotLightShadows: {
			value: [],
			properties: {
				shadowIntensity: 1,
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {}
			}
		},
		spotLightMap: { value: [] },
		spotLightMatrix: { value: [] },
		pointLights: {
			value: [],
			properties: {
				color: {},
				position: {},
				decay: {},
				distance: {}
			}
		},
		pointLightShadows: {
			value: [],
			properties: {
				shadowIntensity: 1,
				shadowBias: {},
				shadowNormalBias: {},
				shadowRadius: {},
				shadowMapSize: {},
				shadowCameraNear: {},
				shadowCameraFar: {}
			}
		},
		pointShadowMatrix: { value: [] },
		hemisphereLights: {
			value: [],
			properties: {
				direction: {},
				skyColor: {},
				groundColor: {}
			}
		},
		rectAreaLights: {
			value: [],
			properties: {
				color: {},
				position: {},
				width: {},
				height: {}
			}
		},
		ltc_1: { value: null },
		ltc_2: { value: null },
		probesSH: { value: null },
		probesMin: { value: /*@__PURE__*/ new W() },
		probesMax: { value: /*@__PURE__*/ new W() },
		probesResolution: { value: /*@__PURE__*/ new W() }
	},
	points: {
		diffuse: { value: /*@__PURE__*/ new J(16777215) },
		opacity: { value: 1 },
		size: { value: 1 },
		scale: { value: 1 },
		map: { value: null },
		alphaMap: { value: null },
		alphaMapTransform: { value: /*@__PURE__*/ new G() },
		alphaTest: { value: 0 },
		uvTransform: { value: /*@__PURE__*/ new G() }
	},
	sprite: {
		diffuse: { value: /*@__PURE__*/ new J(16777215) },
		opacity: { value: 1 },
		center: { value: /*@__PURE__*/ new U(.5, .5) },
		rotation: { value: 0 },
		map: { value: null },
		mapTransform: { value: /*@__PURE__*/ new G() },
		alphaMap: { value: null },
		alphaMapTransform: { value: /*@__PURE__*/ new G() },
		alphaTest: { value: 0 }
	}
}, Lo = {
	basic: {
		uniforms: /*@__PURE__*/ sa([
			Z.common,
			Z.specularmap,
			Z.envmap,
			Z.aomap,
			Z.lightmap,
			Z.fog
		]),
		vertexShader: Io.meshbasic_vert,
		fragmentShader: Io.meshbasic_frag
	},
	lambert: {
		uniforms: /*@__PURE__*/ sa([
			Z.common,
			Z.specularmap,
			Z.envmap,
			Z.aomap,
			Z.lightmap,
			Z.emissivemap,
			Z.bumpmap,
			Z.normalmap,
			Z.displacementmap,
			Z.fog,
			Z.lights,
			{
				emissive: { value: /*@__PURE__*/ new J(0) },
				envMapIntensity: { value: 1 }
			}
		]),
		vertexShader: Io.meshlambert_vert,
		fragmentShader: Io.meshlambert_frag
	},
	phong: {
		uniforms: /*@__PURE__*/ sa([
			Z.common,
			Z.specularmap,
			Z.envmap,
			Z.aomap,
			Z.lightmap,
			Z.emissivemap,
			Z.bumpmap,
			Z.normalmap,
			Z.displacementmap,
			Z.fog,
			Z.lights,
			{
				emissive: { value: /*@__PURE__*/ new J(0) },
				specular: { value: /*@__PURE__*/ new J(1118481) },
				shininess: { value: 30 },
				envMapIntensity: { value: 1 }
			}
		]),
		vertexShader: Io.meshphong_vert,
		fragmentShader: Io.meshphong_frag
	},
	standard: {
		uniforms: /*@__PURE__*/ sa([
			Z.common,
			Z.envmap,
			Z.aomap,
			Z.lightmap,
			Z.emissivemap,
			Z.bumpmap,
			Z.normalmap,
			Z.displacementmap,
			Z.roughnessmap,
			Z.metalnessmap,
			Z.fog,
			Z.lights,
			{
				emissive: { value: /*@__PURE__*/ new J(0) },
				roughness: { value: 1 },
				metalness: { value: 0 },
				envMapIntensity: { value: 1 }
			}
		]),
		vertexShader: Io.meshphysical_vert,
		fragmentShader: Io.meshphysical_frag
	},
	toon: {
		uniforms: /*@__PURE__*/ sa([
			Z.common,
			Z.aomap,
			Z.lightmap,
			Z.emissivemap,
			Z.bumpmap,
			Z.normalmap,
			Z.displacementmap,
			Z.gradientmap,
			Z.fog,
			Z.lights,
			{ emissive: { value: /*@__PURE__*/ new J(0) } }
		]),
		vertexShader: Io.meshtoon_vert,
		fragmentShader: Io.meshtoon_frag
	},
	matcap: {
		uniforms: /*@__PURE__*/ sa([
			Z.common,
			Z.bumpmap,
			Z.normalmap,
			Z.displacementmap,
			Z.fog,
			{ matcap: { value: null } }
		]),
		vertexShader: Io.meshmatcap_vert,
		fragmentShader: Io.meshmatcap_frag
	},
	points: {
		uniforms: /*@__PURE__*/ sa([Z.points, Z.fog]),
		vertexShader: Io.points_vert,
		fragmentShader: Io.points_frag
	},
	dashed: {
		uniforms: /*@__PURE__*/ sa([
			Z.common,
			Z.fog,
			{
				scale: { value: 1 },
				dashSize: { value: 1 },
				totalSize: { value: 2 }
			}
		]),
		vertexShader: Io.linedashed_vert,
		fragmentShader: Io.linedashed_frag
	},
	depth: {
		uniforms: /*@__PURE__*/ sa([Z.common, Z.displacementmap]),
		vertexShader: Io.depth_vert,
		fragmentShader: Io.depth_frag
	},
	normal: {
		uniforms: /*@__PURE__*/ sa([
			Z.common,
			Z.bumpmap,
			Z.normalmap,
			Z.displacementmap,
			{ opacity: { value: 1 } }
		]),
		vertexShader: Io.meshnormal_vert,
		fragmentShader: Io.meshnormal_frag
	},
	sprite: {
		uniforms: /*@__PURE__*/ sa([Z.sprite, Z.fog]),
		vertexShader: Io.sprite_vert,
		fragmentShader: Io.sprite_frag
	},
	background: {
		uniforms: {
			uvTransform: { value: /*@__PURE__*/ new G() },
			t2D: { value: null },
			backgroundIntensity: { value: 1 }
		},
		vertexShader: Io.background_vert,
		fragmentShader: Io.background_frag
	},
	backgroundCube: {
		uniforms: {
			envMap: { value: null },
			backgroundBlurriness: { value: 0 },
			backgroundIntensity: { value: 1 },
			backgroundRotation: { value: /*@__PURE__*/ new G() }
		},
		vertexShader: Io.backgroundCube_vert,
		fragmentShader: Io.backgroundCube_frag
	},
	cube: {
		uniforms: {
			tCube: { value: null },
			tFlip: { value: -1 },
			opacity: { value: 1 }
		},
		vertexShader: Io.cube_vert,
		fragmentShader: Io.cube_frag
	},
	equirect: {
		uniforms: { tEquirect: { value: null } },
		vertexShader: Io.equirect_vert,
		fragmentShader: Io.equirect_frag
	},
	distance: {
		uniforms: /*@__PURE__*/ sa([
			Z.common,
			Z.displacementmap,
			{
				referencePosition: { value: /*@__PURE__*/ new W() },
				nearDistance: { value: 1 },
				farDistance: { value: 1e3 }
			}
		]),
		vertexShader: Io.distance_vert,
		fragmentShader: Io.distance_frag
	},
	shadow: {
		uniforms: /*@__PURE__*/ sa([
			Z.lights,
			Z.fog,
			{
				color: { value: /*@__PURE__*/ new J(0) },
				opacity: { value: 1 }
			}
		]),
		vertexShader: Io.shadow_vert,
		fragmentShader: Io.shadow_frag
	}
};
Lo.physical = {
	uniforms: /*@__PURE__*/ sa([Lo.standard.uniforms, {
		clearcoat: { value: 0 },
		clearcoatMap: { value: null },
		clearcoatMapTransform: { value: /*@__PURE__*/ new G() },
		clearcoatNormalMap: { value: null },
		clearcoatNormalMapTransform: { value: /*@__PURE__*/ new G() },
		clearcoatNormalScale: { value: /*@__PURE__*/ new U(1, 1) },
		clearcoatRoughness: { value: 0 },
		clearcoatRoughnessMap: { value: null },
		clearcoatRoughnessMapTransform: { value: /*@__PURE__*/ new G() },
		dispersion: { value: 0 },
		retroreflectivity: { value: 0 },
		iridescence: { value: 0 },
		iridescenceMap: { value: null },
		iridescenceMapTransform: { value: /*@__PURE__*/ new G() },
		iridescenceIOR: { value: 1.3 },
		iridescenceThicknessMinimum: { value: 100 },
		iridescenceThicknessMaximum: { value: 400 },
		iridescenceThicknessMap: { value: null },
		iridescenceThicknessMapTransform: { value: /*@__PURE__*/ new G() },
		sheen: { value: 0 },
		sheenColor: { value: /*@__PURE__*/ new J(0) },
		sheenColorMap: { value: null },
		sheenColorMapTransform: { value: /*@__PURE__*/ new G() },
		sheenRoughness: { value: 1 },
		sheenRoughnessMap: { value: null },
		sheenRoughnessMapTransform: { value: /*@__PURE__*/ new G() },
		transmission: { value: 0 },
		transmissionMap: { value: null },
		transmissionMapTransform: { value: /*@__PURE__*/ new G() },
		transmissionSamplerSize: { value: /*@__PURE__*/ new U() },
		transmissionSamplerMap: { value: null },
		thickness: { value: 0 },
		thicknessMap: { value: null },
		thicknessMapTransform: { value: /*@__PURE__*/ new G() },
		attenuationDistance: { value: 0 },
		attenuationColor: { value: /*@__PURE__*/ new J(0) },
		specularColor: { value: /*@__PURE__*/ new J(1, 1, 1) },
		specularColorMap: { value: null },
		specularColorMapTransform: { value: /*@__PURE__*/ new G() },
		specularIntensity: { value: 1 },
		specularIntensityMap: { value: null },
		specularIntensityMapTransform: { value: /*@__PURE__*/ new G() },
		anisotropyVector: { value: /*@__PURE__*/ new U() },
		anisotropyMap: { value: null },
		anisotropyMapTransform: { value: /*@__PURE__*/ new G() }
	}]),
	vertexShader: Io.meshphysical_vert,
	fragmentShader: Io.meshphysical_frag
};
var Ro = {
	r: 0,
	b: 0,
	g: 0
}, zo = /*@__PURE__*/ new Le(), Bo = /*@__PURE__*/ new G();
Bo.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function Vo(e, t, n, r, i, a) {
	let o = new J(0), s = i === !0 ? 0 : 1, c, l, u = null, d = 0, f = null;
	function p(e) {
		let n = e.isScene === !0 ? e.background : null;
		if (n && n.isTexture) {
			let r = e.backgroundBlurriness > 0;
			n = t.get(n, r);
		}
		return n;
	}
	function m(t) {
		let r = !1, i = p(t);
		i === null ? g(o, s) : i && i.isColor && (g(i, 1), r = !0);
		let c = e.xr.getEnvironmentBlendMode();
		c === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, a) : c === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, a), (e.autoClear || r) && (n.buffers.depth.setTest(!0), n.buffers.depth.setMask(!0), n.buffers.color.setMask(!0), e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil));
	}
	function h(t, n) {
		let i = p(n);
		i && (i.isCubeTexture || i.mapping === 306) ? (l === void 0 && (l = new X(new jr(1, 1, 1), new ma({
			name: "BackgroundCubeMaterial",
			uniforms: oa(Lo.backgroundCube.uniforms),
			vertexShader: Lo.backgroundCube.vertexShader,
			fragmentShader: Lo.backgroundCube.fragmentShader,
			side: 1,
			depthTest: !1,
			depthWrite: !1,
			fog: !1,
			allowOverride: !1
		})), l.geometry.deleteAttribute("normal"), l.geometry.deleteAttribute("uv"), l.onBeforeRender = function(e, t, n) {
			this.matrixWorld.copyPosition(n.matrixWorld);
		}, Object.defineProperty(l.material, "envMap", { get: function() {
			return this.uniforms.envMap.value;
		} }), r.update(l)), l.material.uniforms.envMap.value = i, l.material.uniforms.backgroundBlurriness.value = n.backgroundBlurriness, l.material.uniforms.backgroundIntensity.value = n.backgroundIntensity, l.material.uniforms.backgroundRotation.value.setFromMatrix4(zo.makeRotationFromEuler(n.backgroundRotation)).transpose(), i.isCubeTexture && i.isRenderTargetTexture === !1 && l.material.uniforms.backgroundRotation.value.premultiply(Bo), l.material.toneMapped = Se.getTransfer(i.colorSpace) !== M, (u !== i || d !== i.version || f !== e.toneMapping) && (l.material.needsUpdate = !0, u = i, d = i.version, f = e.toneMapping), l.layers.enableAll(), t.unshift(l, l.geometry, l.material, 0, 0, null)) : i && i.isTexture && (c === void 0 && (c = new X(new ea(2, 2), new ma({
			name: "BackgroundMaterial",
			uniforms: oa(Lo.background.uniforms),
			vertexShader: Lo.background.vertexShader,
			fragmentShader: Lo.background.fragmentShader,
			side: 0,
			depthTest: !1,
			depthWrite: !1,
			fog: !1,
			allowOverride: !1
		})), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", { get: function() {
			return this.uniforms.t2D.value;
		} }), r.update(c)), c.material.uniforms.t2D.value = i, c.material.uniforms.backgroundIntensity.value = n.backgroundIntensity, c.material.toneMapped = Se.getTransfer(i.colorSpace) !== M, i.matrixAutoUpdate === !0 && i.updateMatrix(), c.material.uniforms.uvTransform.value.copy(i.matrix), (u !== i || d !== i.version || f !== e.toneMapping) && (c.material.needsUpdate = !0, u = i, d = i.version, f = e.toneMapping), c.layers.enableAll(), t.unshift(c, c.geometry, c.material, 0, 0, null));
	}
	function g(t, r) {
		t.getRGB(Ro, ua(e)), n.buffers.color.setClear(Ro.r, Ro.g, Ro.b, r, a);
	}
	function _() {
		l !== void 0 && (l.geometry.dispose(), l.material.dispose(), l = void 0), c !== void 0 && (c.geometry.dispose(), c.material.dispose(), c = void 0);
	}
	return {
		getClearColor: function() {
			return o;
		},
		setClearColor: function(e, t = 1) {
			o.set(e), s = t, g(o, s);
		},
		getClearAlpha: function() {
			return s;
		},
		setClearAlpha: function(e) {
			s = e, g(o, s);
		},
		render: m,
		addToRenderList: h,
		dispose: _
	};
}
function Ho(e, t) {
	let n = e.getParameter(e.MAX_VERTEX_ATTRIBS), r = {}, i = f(null), a = i, o = !1;
	function s(n, r, i, s, c) {
		let u = !1, f = d(n, s, i, r);
		a !== f && (a = f, l(a.object)), u = p(n, s, i, c), u && m(n, s, i, c), c !== null && t.update(c, e.ELEMENT_ARRAY_BUFFER), (u || o) && (o = !1, b(n, r, i, s), c !== null && e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, t.get(c).buffer));
	}
	function c() {
		return e.createVertexArray();
	}
	function l(t) {
		return e.bindVertexArray(t);
	}
	function u(t) {
		return e.deleteVertexArray(t);
	}
	function d(e, t, n, i) {
		let a = i.wireframe === !0, o = r[t.id];
		o === void 0 && (o = {}, r[t.id] = o);
		let s = e.isInstancedMesh === !0 ? e.id : 0, l = o[s];
		l === void 0 && (l = {}, o[s] = l);
		let u = l[n.id];
		u === void 0 && (u = {}, l[n.id] = u);
		let d = u[a];
		return d === void 0 && (d = f(c()), u[a] = d), d;
	}
	function f(e) {
		let t = [], r = [], i = [];
		for (let e = 0; e < n; e++) t[e] = 0, r[e] = 0, i[e] = 0;
		return {
			geometry: null,
			program: null,
			wireframe: !1,
			newAttributes: t,
			enabledAttributes: r,
			attributeDivisors: i,
			object: e,
			attributes: {},
			index: null
		};
	}
	function p(e, t, n, r) {
		let i = a.attributes, o = t.attributes, s = 0, c = n.getAttributes();
		for (let t in c) if (c[t].location >= 0) {
			let n = i[t], r = o[t];
			if (r === void 0 && (t === "instanceMatrix" && e.instanceMatrix && (r = e.instanceMatrix), t === "instanceColor" && e.instanceColor && (r = e.instanceColor)), n === void 0 || n.attribute !== r || r && n.data !== r.data) return !0;
			s++;
		}
		return a.attributesNum !== s || a.index !== r;
	}
	function m(e, t, n, r) {
		let i = {}, o = t.attributes, s = 0, c = n.getAttributes();
		for (let t in c) if (c[t].location >= 0) {
			let n = o[t];
			n === void 0 && (t === "instanceMatrix" && e.instanceMatrix && (n = e.instanceMatrix), t === "instanceColor" && e.instanceColor && (n = e.instanceColor));
			let r = {};
			r.attribute = n, n && n.data && (r.data = n.data), i[t] = r, s++;
		}
		a.attributes = i, a.attributesNum = s, a.index = r;
	}
	function h() {
		let e = a.newAttributes;
		for (let t = 0, n = e.length; t < n; t++) e[t] = 0;
	}
	function g(e) {
		_(e, 0);
	}
	function _(t, n) {
		let r = a.newAttributes, i = a.enabledAttributes, o = a.attributeDivisors;
		r[t] = 1, i[t] === 0 && (e.enableVertexAttribArray(t), i[t] = 1), o[t] !== n && (e.vertexAttribDivisor(t, n), o[t] = n);
	}
	function v() {
		let t = a.newAttributes, n = a.enabledAttributes;
		for (let r = 0, i = n.length; r < i; r++) n[r] !== t[r] && (e.disableVertexAttribArray(r), n[r] = 0);
	}
	function y(t, n, r, i, a, o, s) {
		s === !0 ? e.vertexAttribIPointer(t, n, r, a, o) : e.vertexAttribPointer(t, n, r, i, a, o);
	}
	function b(n, r, i, a) {
		h();
		let o = a.attributes, s = i.getAttributes(), c = r.defaultAttributeValues;
		for (let r in s) {
			let i = s[r];
			if (i.location >= 0) {
				let s = o[r];
				if (s === void 0 && (r === "instanceMatrix" && n.instanceMatrix && (s = n.instanceMatrix), r === "instanceColor" && n.instanceColor && (s = n.instanceColor)), s !== void 0) {
					let r = s.normalized, o = s.itemSize, c = t.get(s);
					if (c === void 0) continue;
					let l = c.buffer, u = c.type, d = c.bytesPerElement, f = u === e.INT || u === e.UNSIGNED_INT || s.gpuType === 1013;
					if (s.isInterleavedBufferAttribute) {
						let t = s.data, c = t.stride, p = s.offset;
						if (t.isInstancedInterleavedBuffer) {
							for (let e = 0; e < i.locationSize; e++) _(i.location + e, t.meshPerAttribute);
							n.isInstancedMesh !== !0 && a._maxInstanceCount === void 0 && (a._maxInstanceCount = t.meshPerAttribute * t.count);
						} else for (let e = 0; e < i.locationSize; e++) g(i.location + e);
						e.bindBuffer(e.ARRAY_BUFFER, l);
						for (let e = 0; e < i.locationSize; e++) y(i.location + e, o / i.locationSize, u, r, c * d, (p + o / i.locationSize * e) * d, f);
					} else {
						if (s.isInstancedBufferAttribute) {
							for (let e = 0; e < i.locationSize; e++) _(i.location + e, s.meshPerAttribute);
							n.isInstancedMesh !== !0 && a._maxInstanceCount === void 0 && (a._maxInstanceCount = s.meshPerAttribute * s.count);
						} else for (let e = 0; e < i.locationSize; e++) g(i.location + e);
						e.bindBuffer(e.ARRAY_BUFFER, l);
						for (let e = 0; e < i.locationSize; e++) y(i.location + e, o / i.locationSize, u, r, o * d, o / i.locationSize * e * d, f);
					}
				} else if (c !== void 0) {
					let t = c[r];
					if (t !== void 0) switch (t.length) {
						case 2:
							e.vertexAttrib2fv(i.location, t);
							break;
						case 3:
							e.vertexAttrib3fv(i.location, t);
							break;
						case 4:
							e.vertexAttrib4fv(i.location, t);
							break;
						default: e.vertexAttrib1fv(i.location, t);
					}
				}
			}
		}
		v();
	}
	function x() {
		T();
		for (let e in r) {
			let t = r[e];
			for (let e in t) {
				let n = t[e];
				for (let e in n) {
					let t = n[e];
					for (let e in t) u(t[e].object), delete t[e];
					delete n[e];
				}
			}
			delete r[e];
		}
	}
	function S(e) {
		if (r[e.id] === void 0) return;
		let t = r[e.id];
		for (let e in t) {
			let n = t[e];
			for (let e in n) {
				let t = n[e];
				for (let e in t) u(t[e].object), delete t[e];
				delete n[e];
			}
		}
		delete r[e.id];
	}
	function C(e) {
		for (let t in r) {
			let n = r[t];
			for (let t in n) {
				let r = n[t];
				if (r[e.id] === void 0) continue;
				let i = r[e.id];
				for (let e in i) u(i[e].object), delete i[e];
				delete r[e.id];
			}
		}
	}
	function w(e) {
		for (let t in r) {
			let n = r[t], i = e.isInstancedMesh === !0 ? e.id : 0, a = n[i];
			if (a !== void 0) {
				for (let e in a) {
					let t = a[e];
					for (let e in t) u(t[e].object), delete t[e];
					delete a[e];
				}
				delete n[i], Object.keys(n).length === 0 && delete r[t];
			}
		}
	}
	function T() {
		E(), o = !0, a !== i && (a = i, l(a.object));
	}
	function E() {
		i.geometry = null, i.program = null, i.wireframe = !1;
	}
	return {
		setup: s,
		reset: T,
		resetDefaultState: E,
		dispose: x,
		releaseStatesOfGeometry: S,
		releaseStatesOfObject: w,
		releaseStatesOfProgram: C,
		initAttributes: h,
		enableAttribute: g,
		disableUnusedAttributes: v
	};
}
function Uo(e, t, n) {
	let r;
	function i(e) {
		r = e;
	}
	function a(t, i) {
		e.drawArrays(r, t, i), n.update(i, r, 1);
	}
	function o(t, i, a) {
		a !== 0 && (e.drawArraysInstanced(r, t, i, a), n.update(i, r, a));
	}
	function s(e, i, a) {
		if (a === 0) return;
		t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r, e, 0, i, 0, a);
		let o = 0;
		for (let e = 0; e < a; e++) o += i[e];
		n.update(o, r, 1);
	}
	this.setMode = i, this.render = a, this.renderInstances = o, this.renderMultiDraw = s;
}
function Wo(e, t, n, r) {
	let i;
	function a() {
		if (i !== void 0) return i;
		if (t.has("EXT_texture_filter_anisotropic") === !0) {
			let n = t.get("EXT_texture_filter_anisotropic");
			i = e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
		} else i = 0;
		return i;
	}
	function o(t) {
		return t === 1023 || r.convert(t) === e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT);
	}
	function s(n) {
		let i = n === 1016 && (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
		return !(n !== 1009 && n !== 1015 && !i && r.convert(n) !== e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE));
	}
	function c(t) {
		if (t === "highp") {
			if (e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision > 0) return "highp";
			t = "mediump";
		}
		return t === "mediump" && e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
	}
	let l = n.precision === void 0 ? "highp" : n.precision, u = c(l);
	u !== l && (z("WebGLRenderer:", l, "not supported, using", u, "instead."), l = u);
	let d = n.logarithmicDepthBuffer === !0, f = n.reversedDepthBuffer === !0 && t.has("EXT_clip_control");
	n.reversedDepthBuffer === !0 && f === !1 && z("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");
	let p = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS), m = e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS), h = e.getParameter(e.MAX_TEXTURE_SIZE), g = e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE), _ = e.getParameter(e.MAX_VERTEX_ATTRIBS), v = e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS), y = e.getParameter(e.MAX_VARYING_VECTORS), b = e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS), x = e.getParameter(e.MAX_SAMPLES), S = e.getParameter(e.SAMPLES);
	return {
		isWebGL2: !0,
		getMaxAnisotropy: a,
		getMaxPrecision: c,
		textureFormatReadable: o,
		textureTypeReadable: s,
		precision: l,
		logarithmicDepthBuffer: d,
		reversedDepthBuffer: f,
		maxTextures: p,
		maxVertexTextures: m,
		maxTextureSize: h,
		maxCubemapSize: g,
		maxAttributes: _,
		maxVertexUniforms: v,
		maxVaryings: y,
		maxFragmentUniforms: b,
		maxSamples: x,
		samples: S
	};
}
function Go(e) {
	let t = this, n = null, r = 0, i = !1, a = !1, o = new bn(), s = new G(), c = {
		value: null,
		needsUpdate: !1
	};
	this.uniform = c, this.numPlanes = 0, this.numIntersection = 0, this.init = function(e, t) {
		let n = e.length !== 0 || t || r !== 0 || i;
		return i = t, r = e.length, n;
	}, this.beginShadows = function() {
		a = !0, u(null);
	}, this.endShadows = function() {
		a = !1;
	}, this.setGlobalState = function(e, t) {
		n = u(e, t, 0);
	}, this.setState = function(t, o, s) {
		let d = t.clippingPlanes, f = t.clipIntersection, p = t.clipShadows, m = e.get(t);
		if (!i || d === null || d.length === 0 || a && !p) a ? u(null) : l();
		else {
			let e = a ? 0 : r, t = e * 4, i = m.clippingState || null;
			c.value = i, i = u(d, o, t, s);
			for (let e = 0; e !== t; ++e) i[e] = n[e];
			m.clippingState = i, this.numIntersection = f ? this.numPlanes : 0, this.numPlanes += e;
		}
	};
	function l() {
		c.value !== n && (c.value = n, c.needsUpdate = r > 0), t.numPlanes = r, t.numIntersection = 0;
	}
	function u(e, n, r, i) {
		let a = e === null ? 0 : e.length, l = null;
		if (a !== 0) {
			if (l = c.value, i !== !0 || l === null) {
				let t = r + a * 4, i = n.matrixWorldInverse;
				s.getNormalMatrix(i), (l === null || l.length < t) && (l = new Float32Array(t));
				for (let t = 0, n = r; t !== a; ++t, n += 4) o.copy(e[t]).applyMatrix4(i, s), o.normal.toArray(l, n), l[n + 3] = o.constant;
			}
			c.value = l, c.needsUpdate = !0;
		}
		return t.numPlanes = a, t.numIntersection = 0, l;
	}
}
var Ko = 4, qo = 6, Jo = 20, Yo = 256, Xo = /*@__PURE__*/ new uo(), Zo = /*@__PURE__*/ new J(), Qo = null, $o = 0, es = 0, ts = !1, ns = /*@__PURE__*/ new W(), rs = /*@__PURE__*/ new W(), is = class {
	constructor(e) {
		this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._sizeLods = [], this._lodMeshes = [], this._backgroundBox = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._blurMaterial = null, this._ggxMaterial = null;
	}
	fromScene(e, t = 0, n = .1, r = 100, i = {}) {
		let { size: a = 256, position: o = ns } = i;
		Qo = this._renderer.getRenderTarget(), $o = this._renderer.getActiveCubeFace(), es = this._renderer.getActiveMipmapLevel(), ts = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(a);
		let s = this._allocateTargets();
		return s.depthBuffer = !0, this._sceneToCubeUV(e, n, r, s, o), t > 0 && this._blur(s, 0, 0, t), this._applyPMREM(s), this._cleanup(s), s;
	}
	fromEquirectangular(e, t = null) {
		return this._fromTexture(e, t);
	}
	fromCubemap(e, t = null) {
		return this._fromTexture(e, t);
	}
	compileCubemapShader() {
		this._cubemapMaterial === null && (this._cubemapMaterial = ds(), this._compileMaterial(this._cubemapMaterial));
	}
	compileEquirectangularShader() {
		this._equirectMaterial === null && (this._equirectMaterial = us(), this._compileMaterial(this._equirectMaterial));
	}
	dispose() {
		this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose(), this._backgroundBox !== null && (this._backgroundBox.geometry.dispose(), this._backgroundBox.material.dispose());
	}
	_setSize(e) {
		this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = 2 ** this._lodMax;
	}
	_dispose() {
		this._blurMaterial !== null && this._blurMaterial.dispose(), this._ggxMaterial !== null && this._ggxMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
		for (let e = 0; e < this._lodMeshes.length; e++) this._lodMeshes[e].geometry.dispose();
	}
	_cleanup(e) {
		this._renderer.setRenderTarget(Qo, $o, es), this._renderer.xr.enabled = ts, e.scissorTest = !1, ss(e, 0, 0, e.width, e.height);
	}
	_fromTexture(e, t) {
		e.mapping === 301 || e.mapping === 302 ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), Qo = this._renderer.getRenderTarget(), $o = this._renderer.getActiveCubeFace(), es = this._renderer.getActiveMipmapLevel(), ts = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
		let n = t || this._allocateTargets();
		return this._textureToCubeUV(e, n), this._applyPMREM(n), this._cleanup(n), n;
	}
	_allocateTargets() {
		let e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, n = {
			magFilter: i,
			minFilter: i,
			generateMipmaps: !1,
			type: u,
			format: m,
			colorSpace: A,
			depthBuffer: !1
		}, r = os(e, t, n);
		if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
			this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = os(e, t, n);
			let { _lodMax: r } = this;
			({lodMeshes: this._lodMeshes, sizeLods: this._sizeLods} = as(r)), this._blurMaterial = ls(r, e, t), this._ggxMaterial = cs(r, e, t);
		}
		return r;
	}
	_compileMaterial(e) {
		let t = new X(new pn(), e);
		this._renderer.compile(t, Xo);
	}
	_sceneToCubeUV(e, t, n, r, i) {
		let a = new ao(90, 1, t, n), o = [
			1,
			-1,
			1,
			1,
			1,
			1
		], s = [
			1,
			1,
			1,
			-1,
			-1,
			-1
		], c = this._renderer, l = c.autoClear, u = c.toneMapping;
		c.getClearColor(Zo), c.toneMapping = 0, c.autoClear = !1, c.state.buffers.depth.getReversed() && (c.setRenderTarget(r), c.clearDepth(), c.setRenderTarget(null)), this._backgroundBox === null && (this._backgroundBox = new X(new jr(), new Wn({
			name: "PMREM.Background",
			side: 1,
			depthWrite: !1,
			depthTest: !1
		})));
		let d = this._backgroundBox, f = d.material, p = !1, m = e.background;
		m ? m.isColor && (f.color.copy(m), e.background = null, p = !0) : (f.color.copy(Zo), p = !0);
		for (let t = 0; t < 6; t++) {
			let n = t % 3;
			n === 0 ? (a.up.set(0, o[t], 0), a.position.set(i.x, i.y, i.z), a.lookAt(i.x + s[t], i.y, i.z)) : n === 1 ? (a.up.set(0, 0, o[t]), a.position.set(i.x, i.y, i.z), a.lookAt(i.x, i.y + s[t], i.z)) : (a.up.set(0, o[t], 0), a.position.set(i.x, i.y, i.z), a.lookAt(i.x, i.y, i.z + s[t]));
			let l = this._cubeSize;
			ss(r, n * l, t > 2 ? l : 0, l, l), c.setRenderTarget(r), p && c.render(d, a), c.render(e, a);
		}
		c.toneMapping = u, c.autoClear = l, e.background = m;
	}
	_textureToCubeUV(e, t) {
		let n = this._renderer, r = e.mapping === 301 || e.mapping === 302;
		r ? (this._cubemapMaterial === null && (this._cubemapMaterial = ds()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = us());
		let i = r ? this._cubemapMaterial : this._equirectMaterial, a = this._lodMeshes[0];
		a.material = i;
		let o = i.uniforms;
		o.envMap.value = e;
		let s = this._cubeSize;
		ss(t, 0, 0, 3 * s, 2 * s), n.setRenderTarget(t), n.render(a, Xo);
	}
	_applyPMREM(e) {
		let t = this._renderer, n = t.autoClear;
		t.autoClear = !1;
		let r = this._lodMeshes.length;
		for (let t = 1; t < r; t++) this._applyGGXFilter(e, t - 1, t);
		t.autoClear = n;
	}
	_applyGGXFilter(e, t, n) {
		let r = this._renderer, i = this._pingPongRenderTarget, a = this._ggxMaterial, o = this._lodMeshes[n];
		o.material = a;
		let s = a.uniforms, c = n / (this._lodMeshes.length - 1), l = t / (this._lodMeshes.length - 1), u = Math.sqrt(c * c - l * l) * (c * 1.25), { _lodMax: d } = this, f = this._sizeLods[n], p = 3 * f * (n > d - Ko ? n - d + Ko : 0), m = 4 * (this._cubeSize - f);
		s.envMap.value = e.texture, s.roughness.value = u, s.mipInt.value = d - t, ss(i, p, m, 3 * f, 2 * f), r.setRenderTarget(i), r.render(o, Xo), s.envMap.value = i.texture, s.roughness.value = 0, s.mipInt.value = d - n, ss(e, p, m, 3 * f, 2 * f), r.setRenderTarget(e), r.render(o, Xo);
	}
	_blur(e, t, n, r) {
		let i = this._pingPongRenderTarget, a = Math.min(r, Math.PI) / Math.SQRT2;
		this._blurPass(e, i, t, n, a), this._blurPass(i, e, n, n, a);
	}
	_blurPass(e, t, n, r, i) {
		let a = this._renderer, o = this._blurMaterial, s = this._lodMeshes[r];
		s.material = o;
		let c = o.uniforms;
		c.envMap.value = e.texture, c.sigma.value = i, c.mipInt.value = this._lodMax - n;
		let l = this._sizeLods[r];
		ss(t, 3 * l * (r > this._lodMax - Ko ? r - this._lodMax + Ko : 0), 4 * (this._cubeSize - l), 3 * l, 2 * l), a.setRenderTarget(t), a.render(s, Xo);
	}
};
function as(e) {
	let t = [], n = [], r = e, i = e - Ko + 1 + qo;
	for (let e = 0; e < i; e++) {
		let e = 2 ** r;
		t.push(e);
		let i = 1 / (e - 2), a = -i, o = 1 + i, s = [
			a,
			a,
			o,
			a,
			o,
			o,
			a,
			a,
			o,
			o,
			a,
			o
		], c = /* @__PURE__ */ new Float32Array(108), l = /* @__PURE__ */ new Float32Array(108);
		for (let e = 0; e < 6; e++) {
			let t = e % 3 * 2 / 3 - 1, n = e > 2 ? 0 : -1, r = [
				t,
				n,
				0,
				t + 2 / 3,
				n,
				0,
				t + 2 / 3,
				n + 1,
				0,
				t,
				n,
				0,
				t + 2 / 3,
				n + 1,
				0,
				t,
				n + 1,
				0
			];
			c.set(r, 18 * e);
			for (let t = 0; t < 6; t++) {
				let n = s[t * 2] * 2 - 1, r = s[t * 2 + 1] * 2 - 1;
				e === 0 ? rs.set(1, r, n) : e === 1 ? rs.set(-n, 1, -r) : e === 2 ? rs.set(-n, r, 1) : e === 3 ? rs.set(-1, r, -n) : e === 4 ? rs.set(-n, -1, r) : rs.set(n, r, -1), rs.toArray(l, (e * 6 + t) * 3);
			}
		}
		let u = new pn();
		u.setAttribute("position", new Qt(c, 3)), u.setAttribute("outputDirection", new Qt(l, 3)), n.push(new X(u, null)), r > Ko && r--;
	}
	return {
		lodMeshes: n,
		sizeLods: t
	};
}
function os(e, t, n) {
	let r = new Pe(e, t, n);
	return r.texture.mapping = 306, r.texture.name = "PMREM.cubeUv", r.scissorTest = !0, r;
}
function ss(e, t, n, r, i) {
	e.viewport.set(t, n, r, i), e.scissor.set(t, n, r, i);
}
function cs(e, t, n) {
	return new ma({
		name: "PMREMGGXConvolution",
		defines: {
			GGX_SAMPLES: Yo,
			CUBEUV_TEXEL_WIDTH: 1 / t,
			CUBEUV_TEXEL_HEIGHT: 1 / n,
			CUBEUV_MAX_MIP: `${e}.0`
		},
		uniforms: {
			envMap: { value: null },
			roughness: { value: 0 },
			mipInt: { value: 0 }
		},
		vertexShader: fs(),
		fragmentShader: "\n\n			precision highp float;\n			precision highp int;\n\n			varying vec3 vOutputDirection;\n\n			uniform sampler2D envMap;\n			uniform float roughness;\n			uniform float mipInt;\n\n			#define ENVMAP_TYPE_CUBE_UV\n			#include <cube_uv_reflection_fragment>\n\n			#define PI 3.14159265359\n\n			// Van der Corput radical inverse\n			float radicalInverse_VdC(uint bits) {\n				bits = (bits << 16u) | (bits >> 16u);\n				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);\n				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);\n				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);\n				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);\n				return float(bits) * 2.3283064365386963e-10; // / 0x100000000\n			}\n\n			// Hammersley sequence\n			vec2 hammersley(uint i, uint N) {\n				return vec2(float(i) / float(N), radicalInverse_VdC(i));\n			}\n\n			// GGX VNDF importance sampling (Eric Heitz 2018)\n			// \"Sampling the GGX Distribution of Visible Normals\"\n			// https://jcgt.org/published/0007/04/01/\n			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {\n				float alpha = roughness * roughness;\n\n				// Section 4.1: Orthonormal basis\n				vec3 T1 = vec3(1.0, 0.0, 0.0);\n				vec3 T2 = cross(V, T1);\n\n				// Section 4.2: Parameterization of projected area\n				float r = sqrt(Xi.x);\n				float phi = 2.0 * PI * Xi.y;\n				float t1 = r * cos(phi);\n				float t2 = r * sin(phi);\n				float s = 0.5 * (1.0 + V.z);\n				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;\n\n				// Section 4.3: Reprojection onto hemisphere\n				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;\n\n				// Section 3.4: Transform back to ellipsoid configuration\n				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));\n			}\n\n			void main() {\n				vec3 N = normalize(vOutputDirection);\n				vec3 V = N; // Assume view direction equals normal for pre-filtering\n\n				vec3 prefilteredColor = vec3(0.0);\n				float totalWeight = 0.0;\n\n				// For very low roughness, just sample the environment directly\n				if (roughness < 0.001) {\n					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);\n					return;\n				}\n\n				// Tangent space basis for VNDF sampling\n				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);\n				vec3 tangent = normalize(cross(up, N));\n				vec3 bitangent = cross(N, tangent);\n\n				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {\n					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));\n\n					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)\n					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);\n\n					// Transform H back to world space\n					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);\n					vec3 L = normalize(2.0 * dot(V, H) * H - V);\n\n					float NdotL = max(dot(N, L), 0.0);\n\n					if(NdotL > 0.0) {\n						// Sample environment at fixed mip level\n						// VNDF importance sampling handles the distribution filtering\n						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);\n\n						// Weight by NdotL for the split-sum approximation\n						// VNDF PDF naturally accounts for the visible microfacet distribution\n						prefilteredColor += sampleColor * NdotL;\n						totalWeight += NdotL;\n					}\n				}\n\n				if (totalWeight > 0.0) {\n					prefilteredColor = prefilteredColor / totalWeight;\n				}\n\n				gl_FragColor = vec4(prefilteredColor, 1.0);\n			}\n		",
		blending: 0,
		depthTest: !1,
		depthWrite: !1
	});
}
function ls(e, t, n) {
	return new ma({
		name: "SphericalGaussianBlur",
		defines: {
			SAMPLES: Jo,
			CUBEUV_TEXEL_WIDTH: 1 / t,
			CUBEUV_TEXEL_HEIGHT: 1 / n,
			CUBEUV_MAX_MIP: `${e}.0`
		},
		uniforms: {
			envMap: { value: null },
			sigma: { value: 0 },
			mipInt: { value: 0 }
		},
		vertexShader: fs(),
		fragmentShader: "\n\n			precision highp float;\n			precision highp int;\n\n			varying vec3 vOutputDirection;\n\n			uniform sampler2D envMap;\n			uniform float sigma;\n			uniform float mipInt;\n\n			#define ENVMAP_TYPE_CUBE_UV\n			#include <cube_uv_reflection_fragment>\n\n			#define PI 3.14159265359\n			#define GOLDEN_ANGLE 2.39996322973\n\n			void main() {\n\n				if ( sigma == 0.0 ) {\n\n					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );\n					return;\n\n				}\n\n				vec3 outputDirection = normalize( vOutputDirection );\n\n				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );\n				vec3 tangent = normalize( cross( up, outputDirection ) );\n				vec3 bitangent = cross( outputDirection, tangent );\n\n				// Truncate the kernel at three standard deviations or at the antipode.\n				float thetaMax = min( 3.0 * sigma, PI );\n				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );\n\n				vec3 accumColor = vec3( 0.0 );\n				float accumWeight = 0.0;\n\n				for ( int i = 0; i < SAMPLES; i ++ ) {\n\n					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.\n					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );\n					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );\n					float phi = float( i ) * GOLDEN_ANGLE;\n\n					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;\n					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;\n\n					// Correct the planar sample density to solid angle.\n					float weight = sin( theta ) / theta;\n\n					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );\n					accumWeight += weight;\n\n				}\n\n				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );\n\n			}\n		",
		blending: 0,
		depthTest: !1,
		depthWrite: !1
	});
}
function us() {
	return new ma({
		name: "EquirectangularToCubeUV",
		uniforms: { envMap: { value: null } },
		vertexShader: fs(),
		fragmentShader: "\n\n			precision mediump float;\n			precision mediump int;\n\n			varying vec3 vOutputDirection;\n\n			uniform sampler2D envMap;\n\n			#include <common>\n\n			void main() {\n\n				vec3 outputDirection = normalize( vOutputDirection );\n				vec2 uv = equirectUv( outputDirection );\n\n				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );\n\n			}\n		",
		blending: 0,
		depthTest: !1,
		depthWrite: !1
	});
}
function ds() {
	return new ma({
		name: "CubemapToCubeUV",
		uniforms: {
			envMap: { value: null },
			flipEnvMap: { value: -1 }
		},
		vertexShader: fs(),
		fragmentShader: "\n\n			precision mediump float;\n			precision mediump int;\n\n			uniform float flipEnvMap;\n\n			varying vec3 vOutputDirection;\n\n			uniform samplerCube envMap;\n\n			void main() {\n\n				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );\n\n			}\n		",
		blending: 0,
		depthTest: !1,
		depthWrite: !1
	});
}
function fs() {
	return "\n\n		precision mediump float;\n		precision mediump int;\n\n		attribute vec3 outputDirection;\n\n		varying vec3 vOutputDirection;\n\n		void main() {\n\n			vOutputDirection = outputDirection;\n			gl_Position = vec4( position, 1.0 );\n\n		}\n	";
}
var ps = class extends Pe {
	constructor(e = 1, t = {}) {
		super(e, e, t), this.isWebGLCubeRenderTarget = !0;
		let n = {
			width: e,
			height: e,
			depth: 1
		}, r = [
			n,
			n,
			n,
			n,
			n,
			n
		];
		this.texture = new Er(r), this._setTextureOptions(t), this.texture.isRenderTargetTexture = !0;
	}
	fromEquirectangularTexture(e, t) {
		this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
		let n = {
			uniforms: { tEquirect: { value: null } },
			vertexShader: "\n\n				varying vec3 vWorldDirection;\n\n				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n				}\n\n				void main() {\n\n					vWorldDirection = transformDirection( position, modelMatrix );\n\n					#include <begin_vertex>\n					#include <project_vertex>\n\n				}\n			",
			fragmentShader: "\n\n				uniform sampler2D tEquirect;\n\n				varying vec3 vWorldDirection;\n\n				#include <common>\n\n				void main() {\n\n					vec3 direction = normalize( vWorldDirection );\n\n					vec2 sampleUV = equirectUv( direction );\n\n					gl_FragColor = texture2D( tEquirect, sampleUV );\n\n				}\n			"
		}, r = new jr(5, 5, 5), a = new ma({
			name: "CubemapFromEquirect",
			uniforms: oa(n.uniforms),
			vertexShader: n.vertexShader,
			fragmentShader: n.fragmentShader,
			side: 1,
			blending: 0
		});
		a.uniforms.tEquirect.value = t;
		let o = new X(r, a), s = t.minFilter;
		return t.minFilter === 1008 && (t.minFilter = i), new go(1, 10, this).update(e, o), t.minFilter = s, o.geometry.dispose(), o.material.dispose(), this;
	}
	clear(e, t = !0, n = !0, r = !0) {
		let i = e.getRenderTarget();
		for (let i = 0; i < 6; i++) e.setRenderTarget(this, i), e.clear(t, n, r);
		e.setRenderTarget(i);
	}
};
function ms(e) {
	let t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), r = null;
	function i(e, t = !1) {
		return e == null ? null : t ? o(e) : a(e);
	}
	function a(n) {
		if (n && n.isTexture) {
			let r = n.mapping;
			if (r === 303 || r === 304) {
				if (t.has(n)) {
					let e = t.get(n).texture;
					return s(e, n.mapping);
				}
				{
					let r = n.image;
					if (r && r.height > 0) {
						let i = new ps(r.height);
						return i.fromEquirectangularTexture(e, n), t.set(n, i), n.addEventListener("dispose", l), s(i.texture, n.mapping);
					}
					return null;
				}
			}
		}
		return n;
	}
	function o(t) {
		if (t && t.isTexture) {
			let i = t.mapping, a = i === 303 || i === 304, o = i === 301 || i === 302;
			if (a || o) {
				let i = n.get(t), s = i === void 0 ? 0 : i.texture.pmremVersion;
				if (t.isRenderTargetTexture && t.pmremVersion !== s) return r === null && (r = new is(e)), i = a ? r.fromEquirectangular(t, i) : r.fromCubemap(t, i), i.texture.pmremVersion = t.pmremVersion, n.set(t, i), i.texture;
				if (i !== void 0) return i.texture;
				{
					let s = t.image;
					return a && s && s.height > 0 || o && s && c(s) ? (r === null && (r = new is(e)), i = a ? r.fromEquirectangular(t) : r.fromCubemap(t), i.texture.pmremVersion = t.pmremVersion, n.set(t, i), t.addEventListener("dispose", u), i.texture) : null;
				}
			}
		}
		return t;
	}
	function s(e, t) {
		return t === 303 ? e.mapping = 301 : t === 304 && (e.mapping = 302), e;
	}
	function c(e) {
		let t = 0;
		for (let n = 0; n < 6; n++) e[n] !== void 0 && t++;
		return t === 6;
	}
	function l(e) {
		let n = e.target;
		n.removeEventListener("dispose", l);
		let r = t.get(n);
		r !== void 0 && (t.delete(n), r.dispose());
	}
	function u(e) {
		let t = e.target;
		t.removeEventListener("dispose", u);
		let r = n.get(t);
		r !== void 0 && (n.delete(t), r.dispose());
	}
	function d() {
		t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap(), r !== null && (r.dispose(), r = null);
	}
	return {
		get: i,
		dispose: d
	};
}
function hs(e) {
	let t = {};
	function n(n) {
		if (t[n] !== void 0) return t[n];
		let r = e.getExtension(n);
		return t[n] = r, r;
	}
	return {
		has: function(e) {
			return n(e) !== null;
		},
		init: function() {
			n("EXT_color_buffer_float"), n("WEBGL_clip_cull_distance"), n("OES_texture_float_linear"), n("EXT_color_buffer_half_float"), n("WEBGL_multisampled_render_to_texture"), n("WEBGL_render_shared_exponent");
		},
		get: function(e) {
			let t = n(e);
			return t === null && V("WebGLRenderer: " + e + " extension not supported."), t;
		}
	};
}
function gs(e, t, n, r) {
	let i = {}, a = /* @__PURE__ */ new WeakMap();
	function o(e) {
		let s = e.target;
		s.index !== null && t.remove(s.index);
		for (let e in s.attributes) t.remove(s.attributes[e]);
		s.removeEventListener("dispose", o), delete i[s.id];
		let c = a.get(s);
		c && (t.remove(c), a.delete(s)), r.releaseStatesOfGeometry(s), s.isInstancedBufferGeometry === !0 && delete s._maxInstanceCount, n.memory.geometries--;
	}
	function s(e, t) {
		return i[t.id] === !0 ? t : (t.addEventListener("dispose", o), i[t.id] = !0, n.memory.geometries++, t);
	}
	function c(n) {
		let r = n.attributes;
		for (let n in r) t.update(r[n], e.ARRAY_BUFFER);
	}
	function l(e) {
		let n = [], r = e.index, i = e.attributes.position, o = 0;
		if (i === void 0) return;
		if (r !== null) {
			let e = r.array;
			o = r.version;
			for (let t = 0, r = e.length; t < r; t += 3) {
				let r = e[t + 0], i = e[t + 1], a = e[t + 2];
				n.push(r, i, i, a, a, r);
			}
		} else {
			let e = i.array;
			o = i.version;
			for (let t = 0, r = e.length / 3 - 1; t < r; t += 3) {
				let e = t + 0, r = t + 1, i = t + 2;
				n.push(e, r, r, i, i, e);
			}
		}
		let s = new (i.count >= 65535 ? en : $t)(n, 1);
		s.version = o;
		let c = a.get(e);
		c && t.remove(c), a.set(e, s);
	}
	function u(e) {
		let t = a.get(e);
		if (t) {
			let n = e.index;
			n !== null && t.version < n.version && l(e);
		} else l(e);
		return a.get(e);
	}
	return {
		get: s,
		update: c,
		getWireframeAttribute: u
	};
}
function _s(e, t, n) {
	let r;
	function i(e) {
		r = e;
	}
	let a, o;
	function s(e) {
		a = e.type, o = e.bytesPerElement;
	}
	function c(t, i) {
		e.drawElements(r, i, a, t * o), n.update(i, r, 1);
	}
	function l(t, i, s) {
		s !== 0 && (e.drawElementsInstanced(r, i, a, t * o, s), n.update(i, r, s));
	}
	function u(e, i, o) {
		if (o === 0) return;
		t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r, i, 0, a, e, 0, o);
		let s = 0;
		for (let e = 0; e < o; e++) s += i[e];
		n.update(s, r, 1);
	}
	this.setMode = i, this.setIndex = s, this.render = c, this.renderInstances = l, this.renderMultiDraw = u;
}
function vs(e) {
	let t = {
		geometries: 0,
		textures: 0
	}, n = {
		frame: 0,
		calls: 0,
		triangles: 0,
		points: 0,
		lines: 0
	};
	function r(t, r, i) {
		switch (n.calls++, r) {
			case e.TRIANGLES:
				n.triangles += t / 3 * i;
				break;
			case e.LINES:
				n.lines += t / 2 * i;
				break;
			case e.LINE_STRIP:
				n.lines += i * (t - 1);
				break;
			case e.LINE_LOOP:
				n.lines += i * t;
				break;
			case e.POINTS:
				n.points += i * t;
				break;
			default: B("WebGLInfo: Unknown draw mode:", r);
		}
	}
	function i() {
		n.calls = 0, n.triangles = 0, n.points = 0, n.lines = 0;
	}
	return {
		memory: t,
		render: n,
		programs: null,
		autoReset: !0,
		reset: i,
		update: r
	};
}
function ys(e, t, n) {
	let r = /* @__PURE__ */ new WeakMap(), i = new Me();
	function a(a, o, s) {
		let c = a.morphTargetInfluences, u = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, d = u === void 0 ? 0 : u.length, f = r.get(o);
		if (f === void 0 || f.count !== d) {
			f !== void 0 && f.texture.dispose();
			let e = o.morphAttributes.position !== void 0, n = o.morphAttributes.normal !== void 0, a = o.morphAttributes.color !== void 0, s = o.morphAttributes.position || [], c = o.morphAttributes.normal || [], u = o.morphAttributes.color || [], p = 0;
			e === !0 && (p = 1), n === !0 && (p = 2), a === !0 && (p = 3);
			let m = o.attributes.position.count * p, h = 1;
			m > t.maxTextureSize && (h = Math.ceil(m / t.maxTextureSize), m = t.maxTextureSize);
			let g = new Float32Array(m * h * 4 * d), _ = new Fe(g, m, h, d);
			_.type = l, _.needsUpdate = !0;
			let v = p * 4;
			for (let t = 0; t < d; t++) {
				let r = s[t], o = c[t], l = u[t], d = m * h * 4 * t;
				for (let t = 0; t < r.count; t++) {
					let s = t * v;
					e === !0 && (i.fromBufferAttribute(r, t), g[d + s + 0] = i.x, g[d + s + 1] = i.y, g[d + s + 2] = i.z, g[d + s + 3] = 0), n === !0 && (i.fromBufferAttribute(o, t), g[d + s + 4] = i.x, g[d + s + 5] = i.y, g[d + s + 6] = i.z, g[d + s + 7] = 0), a === !0 && (i.fromBufferAttribute(l, t), g[d + s + 8] = i.x, g[d + s + 9] = i.y, g[d + s + 10] = i.z, g[d + s + 11] = l.itemSize === 4 ? i.w : 1);
				}
			}
			f = {
				count: d,
				texture: _,
				size: new U(m, h)
			}, r.set(o, f);
			function y() {
				_.dispose(), r.delete(o), o.removeEventListener("dispose", y);
			}
			o.addEventListener("dispose", y);
		}
		if (a.isInstancedMesh === !0 && a.morphTexture !== null) s.getUniforms().setValue(e, "morphTexture", a.morphTexture, n);
		else {
			let t = 0;
			for (let e = 0; e < c.length; e++) t += c[e];
			let n = o.morphTargetsRelative ? 1 : 1 - t;
			s.getUniforms().setValue(e, "morphTargetBaseInfluence", n), s.getUniforms().setValue(e, "morphTargetInfluences", c);
		}
		s.getUniforms().setValue(e, "morphTargetsTexture", f.texture, n), s.getUniforms().setValue(e, "morphTargetsTextureSize", f.size);
	}
	return { update: a };
}
function bs(e, t, n, r, i) {
	let a = /* @__PURE__ */ new WeakMap();
	function o(r) {
		let o = i.render.frame, s = r.geometry, l = t.get(r, s);
		if (a.get(l) !== o && (t.update(l), a.set(l, o)), r.isInstancedMesh && (r.hasEventListener("dispose", c) === !1 && r.addEventListener("dispose", c), a.get(r) !== o && (n.update(r.instanceMatrix, e.ARRAY_BUFFER), r.instanceColor !== null && n.update(r.instanceColor, e.ARRAY_BUFFER), a.set(r, o))), r.isSkinnedMesh) {
			let e = r.skeleton;
			a.get(e) !== o && (e.update(), a.set(e, o));
		}
		return l;
	}
	function s() {
		a = /* @__PURE__ */ new WeakMap();
	}
	function c(e) {
		let t = e.target;
		t.removeEventListener("dispose", c), r.releaseStatesOfObject(t), n.remove(t.instanceMatrix), t.instanceColor !== null && n.remove(t.instanceColor);
	}
	return {
		update: o,
		dispose: s
	};
}
var xs = {
	1: "LINEAR_TONE_MAPPING",
	2: "REINHARD_TONE_MAPPING",
	3: "CINEON_TONE_MAPPING",
	4: "ACES_FILMIC_TONE_MAPPING",
	6: "AGX_TONE_MAPPING",
	7: "NEUTRAL_TONE_MAPPING",
	5: "CUSTOM_TONE_MAPPING"
};
function Ss(e, t, n, r, i, a) {
	let o = new Pe(t, n, {
		type: e,
		depthBuffer: i,
		stencilBuffer: a,
		samples: r ? 4 : 0,
		storeMultisampledDepthBuffer: !1,
		storeMultisampledStencilBuffer: !1,
		resolveDepthBuffer: !1,
		resolveStencilBuffer: !1
	}), s = null, c = null, l = new pn();
	l.setAttribute("position", new Y([
		-1,
		3,
		0,
		-1,
		-1,
		0,
		3,
		-1,
		0
	], 3)), l.setAttribute("uv", new Y([
		0,
		2,
		0,
		0,
		2,
		0
	], 2));
	let d = new ha({
		uniforms: { tDiffuse: { value: null } },
		vertexShader: "\n			precision highp float;\n\n			uniform mat4 modelViewMatrix;\n			uniform mat4 projectionMatrix;\n\n			attribute vec3 position;\n			attribute vec2 uv;\n\n			varying vec2 vUv;\n\n			void main() {\n				vUv = uv;\n				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n			}",
		fragmentShader: "\n			precision highp float;\n\n			uniform sampler2D tDiffuse;\n\n			varying vec2 vUv;\n\n			#include <tonemapping_pars_fragment>\n			#include <colorspace_pars_fragment>\n\n			void main() {\n				gl_FragColor = texture2D( tDiffuse, vUv );\n\n				#ifdef LINEAR_TONE_MAPPING\n					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );\n				#elif defined( REINHARD_TONE_MAPPING )\n					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );\n				#elif defined( CINEON_TONE_MAPPING )\n					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );\n				#elif defined( ACES_FILMIC_TONE_MAPPING )\n					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );\n				#elif defined( AGX_TONE_MAPPING )\n					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );\n				#elif defined( NEUTRAL_TONE_MAPPING )\n					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );\n				#elif defined( CUSTOM_TONE_MAPPING )\n					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );\n				#endif\n\n				#ifdef SRGB_TRANSFER\n					gl_FragColor = sRGBTransferOETF( gl_FragColor );\n				#endif\n			}",
		depthTest: !1,
		depthWrite: !1
	}), f = new X(l, d), p = new uo(-1, 1, 1, -1, 0, 1), m = null, h = null, g = !1, _, v = null, y = [], b = !1;
	this.setSize = function(e, t) {
		o.setSize(e, t), s !== null && s.setSize(e, t), c !== null && c.setSize(e, t);
		for (let n = 0; n < y.length; n++) {
			let r = y[n];
			r.setSize && r.setSize(e, t);
		}
	}, this.setEffects = function(e) {
		y = e, b = y.length > 0 && y[0].isRenderPass === !0;
		let t = o.width, n = o.height;
		y.length > 0 && s === null && (s = new Pe(t, n, {
			type: u,
			depthBuffer: !1,
			stencilBuffer: !1
		}), c = new Pe(t, n, {
			type: u,
			depthBuffer: !1,
			stencilBuffer: !1
		}));
		for (let e = 0; e < y.length; e++) {
			let r = y[e];
			r.setSize && r.setSize(t, n);
		}
	}, this.begin = function(e, t) {
		if (g || e.toneMapping === 0 && y.length === 0) return !1;
		if (v = t, t !== null) {
			let e = t.width, n = t.height;
			(o.width !== e || o.height !== n) && this.setSize(e, n);
		}
		return b === !1 && e.setRenderTarget(o), _ = e.toneMapping, e.toneMapping = 0, !0;
	}, this.hasRenderPass = function() {
		return b;
	}, this.end = function(e, t) {
		e.toneMapping = _, g = !0;
		let n = o, r = s;
		for (let i = 0; i < y.length; i++) {
			let a = y[i];
			a.enabled !== !1 && (a.render(e, r, n, t), a.needsSwap !== !1 && (n = r, r = r === s ? c : s));
		}
		if (m !== e.outputColorSpace || h !== e.toneMapping) {
			m = e.outputColorSpace, h = e.toneMapping, d.defines = {}, Se.getTransfer(m) === "srgb" && (d.defines.SRGB_TRANSFER = "");
			let t = xs[h];
			t && (d.defines[t] = ""), d.needsUpdate = !0;
		}
		d.uniforms.tDiffuse.value = n.texture, e.setRenderTarget(v), e.render(f, p), v = null, g = !1;
	}, this.isCompositing = function() {
		return g;
	}, this.dispose = function() {
		o.dispose(), s !== null && s.dispose(), c !== null && c.dispose(), l.dispose(), d.dispose();
	};
}
var Cs = /*@__PURE__*/ new K(), ws = /*@__PURE__*/ new Or(1, 1), Ts = /*@__PURE__*/ new Fe(), Es = /*@__PURE__*/ new Ie(), Ds = /*@__PURE__*/ new Er(), Os = [], ks = [], As = /* @__PURE__ */ new Float32Array(16), js = /* @__PURE__ */ new Float32Array(9), Ms = /* @__PURE__ */ new Float32Array(4);
function Ns(e, t, n) {
	let r = e[0];
	if (r <= 0 || r > 0) return e;
	let i = t * n, a = Os[i];
	if (a === void 0 && (a = new Float32Array(i), Os[i] = a), t !== 0) {
		r.toArray(a, 0);
		for (let r = 1, i = 0; r !== t; ++r) i += n, e[r].toArray(a, i);
	}
	return a;
}
function Ps(e, t) {
	if (e.length !== t.length) return !1;
	for (let n = 0, r = e.length; n < r; n++) if (e[n] !== t[n]) return !1;
	return !0;
}
function Fs(e, t) {
	for (let n = 0, r = t.length; n < r; n++) e[n] = t[n];
}
function Is(e, t) {
	let n = ks[t];
	n === void 0 && (n = new Int32Array(t), ks[t] = n);
	for (let r = 0; r !== t; ++r) n[r] = e.allocateTextureUnit();
	return n;
}
function Ls(e, t) {
	let n = this.cache;
	n[0] !== t && (e.uniform1f(this.addr, t), n[0] = t);
}
function Rs(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y) && (e.uniform2f(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
	else {
		if (Ps(n, t)) return;
		e.uniform2fv(this.addr, t), Fs(n, t);
	}
}
function zs(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3f(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
	else if (t.r !== void 0) (n[0] !== t.r || n[1] !== t.g || n[2] !== t.b) && (e.uniform3f(this.addr, t.r, t.g, t.b), n[0] = t.r, n[1] = t.g, n[2] = t.b);
	else {
		if (Ps(n, t)) return;
		e.uniform3fv(this.addr, t), Fs(n, t);
	}
}
function Bs(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4f(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
	else {
		if (Ps(n, t)) return;
		e.uniform4fv(this.addr, t), Fs(n, t);
	}
}
function Vs(e, t) {
	let n = this.cache, r = t.elements;
	if (r === void 0) {
		if (Ps(n, t)) return;
		e.uniformMatrix2fv(this.addr, !1, t), Fs(n, t);
	} else {
		if (Ps(n, r)) return;
		Ms.set(r), e.uniformMatrix2fv(this.addr, !1, Ms), Fs(n, r);
	}
}
function Hs(e, t) {
	let n = this.cache, r = t.elements;
	if (r === void 0) {
		if (Ps(n, t)) return;
		e.uniformMatrix3fv(this.addr, !1, t), Fs(n, t);
	} else {
		if (Ps(n, r)) return;
		js.set(r), e.uniformMatrix3fv(this.addr, !1, js), Fs(n, r);
	}
}
function Us(e, t) {
	let n = this.cache, r = t.elements;
	if (r === void 0) {
		if (Ps(n, t)) return;
		e.uniformMatrix4fv(this.addr, !1, t), Fs(n, t);
	} else {
		if (Ps(n, r)) return;
		As.set(r), e.uniformMatrix4fv(this.addr, !1, As), Fs(n, r);
	}
}
function Ws(e, t) {
	let n = this.cache;
	n[0] !== t && (e.uniform1i(this.addr, t), n[0] = t);
}
function Gs(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y) && (e.uniform2i(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
	else {
		if (Ps(n, t)) return;
		e.uniform2iv(this.addr, t), Fs(n, t);
	}
}
function Ks(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3i(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
	else {
		if (Ps(n, t)) return;
		e.uniform3iv(this.addr, t), Fs(n, t);
	}
}
function qs(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4i(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
	else {
		if (Ps(n, t)) return;
		e.uniform4iv(this.addr, t), Fs(n, t);
	}
}
function Js(e, t) {
	let n = this.cache;
	n[0] !== t && (e.uniform1ui(this.addr, t), n[0] = t);
}
function Ys(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y) && (e.uniform2ui(this.addr, t.x, t.y), n[0] = t.x, n[1] = t.y);
	else {
		if (Ps(n, t)) return;
		e.uniform2uiv(this.addr, t), Fs(n, t);
	}
}
function Xs(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z) && (e.uniform3ui(this.addr, t.x, t.y, t.z), n[0] = t.x, n[1] = t.y, n[2] = t.z);
	else {
		if (Ps(n, t)) return;
		e.uniform3uiv(this.addr, t), Fs(n, t);
	}
}
function Zs(e, t) {
	let n = this.cache;
	if (t.x !== void 0) (n[0] !== t.x || n[1] !== t.y || n[2] !== t.z || n[3] !== t.w) && (e.uniform4ui(this.addr, t.x, t.y, t.z, t.w), n[0] = t.x, n[1] = t.y, n[2] = t.z, n[3] = t.w);
	else {
		if (Ps(n, t)) return;
		e.uniform4uiv(this.addr, t), Fs(n, t);
	}
}
function Qs(e, t, n) {
	let r = this.cache, i = n.allocateTextureUnit();
	r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i);
	let a;
	this.type === e.SAMPLER_2D_SHADOW ? (ws.compareFunction = n.isReversedDepthBuffer() ? 518 : 515, a = ws) : a = Cs, n.setTexture2D(t || a, i);
}
function $s(e, t, n) {
	let r = this.cache, i = n.allocateTextureUnit();
	r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i), n.setTexture3D(t || Es, i);
}
function ec(e, t, n) {
	let r = this.cache, i = n.allocateTextureUnit();
	r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i), n.setTextureCube(t || Ds, i);
}
function tc(e, t, n) {
	let r = this.cache, i = n.allocateTextureUnit();
	r[0] !== i && (e.uniform1i(this.addr, i), r[0] = i), n.setTexture2DArray(t || Ts, i);
}
function nc(e) {
	switch (e) {
		case 5126: return Ls;
		case 35664: return Rs;
		case 35665: return zs;
		case 35666: return Bs;
		case 35674: return Vs;
		case 35675: return Hs;
		case 35676: return Us;
		case 5124:
		case 35670: return Ws;
		case 35667:
		case 35671: return Gs;
		case 35668:
		case 35672: return Ks;
		case 35669:
		case 35673: return qs;
		case 5125: return Js;
		case 36294: return Ys;
		case 36295: return Xs;
		case 36296: return Zs;
		case 35678:
		case 36198:
		case 36298:
		case 36306:
		case 35682: return Qs;
		case 35679:
		case 36299:
		case 36307: return $s;
		case 35680:
		case 36300:
		case 36308:
		case 36293: return ec;
		case 36289:
		case 36303:
		case 36311:
		case 36292: return tc;
	}
}
function rc(e, t) {
	e.uniform1fv(this.addr, t);
}
function ic(e, t) {
	let n = Ns(t, this.size, 2);
	e.uniform2fv(this.addr, n);
}
function ac(e, t) {
	let n = Ns(t, this.size, 3);
	e.uniform3fv(this.addr, n);
}
function oc(e, t) {
	let n = Ns(t, this.size, 4);
	e.uniform4fv(this.addr, n);
}
function sc(e, t) {
	let n = Ns(t, this.size, 4);
	e.uniformMatrix2fv(this.addr, !1, n);
}
function cc(e, t) {
	let n = Ns(t, this.size, 9);
	e.uniformMatrix3fv(this.addr, !1, n);
}
function lc(e, t) {
	let n = Ns(t, this.size, 16);
	e.uniformMatrix4fv(this.addr, !1, n);
}
function uc(e, t) {
	e.uniform1iv(this.addr, t);
}
function dc(e, t) {
	e.uniform2iv(this.addr, t);
}
function fc(e, t) {
	e.uniform3iv(this.addr, t);
}
function pc(e, t) {
	e.uniform4iv(this.addr, t);
}
function mc(e, t) {
	e.uniform1uiv(this.addr, t);
}
function hc(e, t) {
	e.uniform2uiv(this.addr, t);
}
function gc(e, t) {
	e.uniform3uiv(this.addr, t);
}
function _c(e, t) {
	e.uniform4uiv(this.addr, t);
}
function vc(e, t, n) {
	let r = this.cache, i = t.length, a = Is(n, i);
	Ps(r, a) || (e.uniform1iv(this.addr, a), Fs(r, a));
	let o;
	o = this.type === e.SAMPLER_2D_SHADOW ? ws : Cs;
	for (let e = 0; e !== i; ++e) n.setTexture2D(t[e] || o, a[e]);
}
function yc(e, t, n) {
	let r = this.cache, i = t.length, a = Is(n, i);
	Ps(r, a) || (e.uniform1iv(this.addr, a), Fs(r, a));
	for (let e = 0; e !== i; ++e) n.setTexture3D(t[e] || Es, a[e]);
}
function bc(e, t, n) {
	let r = this.cache, i = t.length, a = Is(n, i);
	Ps(r, a) || (e.uniform1iv(this.addr, a), Fs(r, a));
	for (let e = 0; e !== i; ++e) n.setTextureCube(t[e] || Ds, a[e]);
}
function xc(e, t, n) {
	let r = this.cache, i = t.length, a = Is(n, i);
	Ps(r, a) || (e.uniform1iv(this.addr, a), Fs(r, a));
	for (let e = 0; e !== i; ++e) n.setTexture2DArray(t[e] || Ts, a[e]);
}
function Sc(e) {
	switch (e) {
		case 5126: return rc;
		case 35664: return ic;
		case 35665: return ac;
		case 35666: return oc;
		case 35674: return sc;
		case 35675: return cc;
		case 35676: return lc;
		case 5124:
		case 35670: return uc;
		case 35667:
		case 35671: return dc;
		case 35668:
		case 35672: return fc;
		case 35669:
		case 35673: return pc;
		case 5125: return mc;
		case 36294: return hc;
		case 36295: return gc;
		case 36296: return _c;
		case 35678:
		case 36198:
		case 36298:
		case 36306:
		case 35682: return vc;
		case 35679:
		case 36299:
		case 36307: return yc;
		case 35680:
		case 36300:
		case 36308:
		case 36293: return bc;
		case 36289:
		case 36303:
		case 36311:
		case 36292: return xc;
	}
}
var Cc = class {
	constructor(e, t, n) {
		this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.setValue = nc(t.type);
	}
}, wc = class {
	constructor(e, t, n) {
		this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = Sc(t.type);
	}
}, Tc = class {
	constructor(e) {
		this.id = e, this.seq = [], this.map = {};
	}
	setValue(e, t, n) {
		let r = this.seq;
		for (let i = 0, a = r.length; i !== a; ++i) {
			let a = r[i];
			a.setValue(e, t[a.id], n);
		}
	}
}, Ec = /(\w+)(\])?(\[|\.)?/g;
function Dc(e, t) {
	e.seq.push(t), e.map[t.id] = t;
}
function Oc(e, t, n) {
	let r = e.name, i = r.length;
	for (Ec.lastIndex = 0;;) {
		let a = Ec.exec(r), o = Ec.lastIndex, s = a[1], c = a[2] === "]", l = a[3];
		if (c && (s |= 0), l === void 0 || l === "[" && o + 2 === i) {
			Dc(n, l === void 0 ? new Cc(s, e, t) : new wc(s, e, t));
			break;
		}
		{
			let e = n.map[s];
			e === void 0 && (e = new Tc(s), Dc(n, e)), n = e;
		}
	}
}
var kc = class {
	constructor(e, t) {
		this.seq = [], this.map = {};
		let n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
		for (let r = 0; r < n; ++r) {
			let n = e.getActiveUniform(t, r);
			Oc(n, e.getUniformLocation(t, n.name), this);
		}
		let r = [], i = [];
		for (let t of this.seq) t.type === e.SAMPLER_2D_SHADOW || t.type === e.SAMPLER_CUBE_SHADOW || t.type === e.SAMPLER_2D_ARRAY_SHADOW ? r.push(t) : i.push(t);
		r.length > 0 && (this.seq = r.concat(i));
	}
	setValue(e, t, n, r) {
		let i = this.map[t];
		i !== void 0 && i.setValue(e, n, r);
	}
	setOptional(e, t, n) {
		let r = t[n];
		r !== void 0 && this.setValue(e, n, r);
	}
	static upload(e, t, n, r) {
		for (let i = 0, a = t.length; i !== a; ++i) {
			let a = t[i], o = n[a.id];
			o.needsUpdate !== !1 && a.setValue(e, o.value, r);
		}
	}
	static seqWithValue(e, t) {
		let n = [];
		for (let r = 0, i = e.length; r !== i; ++r) {
			let i = e[r];
			i.id in t && n.push(i);
		}
		return n;
	}
};
function Ac(e, t, n) {
	let r = e.createShader(t);
	return e.shaderSource(r, n), e.compileShader(r), r;
}
var jc = 37297, Mc = 0;
function Nc(e, t) {
	let n = e.split("\n"), r = [], i = Math.max(t - 6, 0), a = Math.min(t + 6, n.length);
	for (let e = i; e < a; e++) {
		let i = e + 1;
		r.push(`${i === t ? ">" : " "} ${i}: ${n[e]}`);
	}
	return r.join("\n");
}
var Pc = /*@__PURE__*/ new G();
function Fc(e) {
	Se._getMatrix(Pc, Se.workingColorSpace, e);
	let t = `mat3( ${Pc.elements.map((e) => e.toFixed(4))} )`;
	switch (Se.getTransfer(e)) {
		case j: return [t, "LinearTransferOETF"];
		case M: return [t, "sRGBTransferOETF"];
		default: return z("WebGLProgram: Unsupported color space: ", e), [t, "LinearTransferOETF"];
	}
}
function Ic(e, t, n) {
	let r = e.getShaderParameter(t, e.COMPILE_STATUS), i = (e.getShaderInfoLog(t) || "").trim();
	if (r && i === "") return "";
	let a = /ERROR: 0:(\d+)/.exec(i);
	if (a) {
		let r = parseInt(a[1]);
		return n.toUpperCase() + "\n\n" + i + "\n\n" + Nc(e.getShaderSource(t), r);
	}
	return i;
}
function Lc(e, t) {
	let n = Fc(t);
	return [
		`vec4 ${e}( vec4 value ) {`,
		`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,
		"}"
	].join("\n");
}
var Rc = {
	1: "Linear",
	2: "Reinhard",
	3: "Cineon",
	4: "ACESFilmic",
	6: "AgX",
	7: "Neutral",
	5: "Custom"
};
function zc(e, t) {
	let n = Rc[t];
	return n === void 0 ? (z("WebGLProgram: Unsupported toneMapping:", t), "vec3 " + e + "( vec3 color ) { return LinearToneMapping( color ); }") : "vec3 " + e + "( vec3 color ) { return " + n + "ToneMapping( color ); }";
}
var Bc = /*@__PURE__*/ new W();
function Vc() {
	return Se.getLuminanceCoefficients(Bc), [
		"float luminance( const in vec3 rgb ) {",
		`	const vec3 weights = vec3( ${Bc.x.toFixed(4)}, ${Bc.y.toFixed(4)}, ${Bc.z.toFixed(4)} );`,
		"	return dot( weights, rgb );",
		"}"
	].join("\n");
}
function Hc(e) {
	return [e.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "", e.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""].filter(Gc).join("\n");
}
function Uc(e) {
	let t = [];
	for (let n in e) {
		let r = e[n];
		r !== !1 && t.push("#define " + n + " " + r);
	}
	return t.join("\n");
}
function Wc(e, t) {
	let n = {}, r = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES);
	for (let i = 0; i < r; i++) {
		let r = e.getActiveAttrib(t, i), a = r.name, o = 1;
		r.type === e.FLOAT_MAT2 && (o = 2), r.type === e.FLOAT_MAT3 && (o = 3), r.type === e.FLOAT_MAT4 && (o = 4), n[a] = {
			type: r.type,
			location: e.getAttribLocation(t, a),
			locationSize: o
		};
	}
	return n;
}
function Gc(e) {
	return e !== "";
}
function Kc(e, t) {
	let n = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
	return e.replace(/NUM_SUN_LIGHTS/g, t.numSunLights).replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, n).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g, t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}
function qc(e, t) {
	return e.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}
var Jc = /^[ \t]*#include +<([\w\d./]+)>/gm;
function Yc(e) {
	return e.replace(Jc, Zc);
}
var Xc = /* @__PURE__ */ new Map();
function Zc(e, t) {
	let n = Io[t];
	if (n === void 0) {
		let e = Xc.get(t);
		if (e !== void 0) n = Io[e], z("WebGLRenderer: Shader chunk \"%s\" has been deprecated. Use \"%s\" instead.", t, e);
		else throw Error("THREE.WebGLProgram: Can not resolve #include <" + t + ">");
	}
	return Yc(n);
}
var Qc = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function $c(e) {
	return e.replace(Qc, el);
}
function el(e, t, n, r) {
	let i = "";
	for (let e = parseInt(t); e < parseInt(n); e++) i += r.replace(/\[\s*i\s*\]/g, "[ " + e + " ]").replace(/UNROLLED_LOOP_INDEX/g, e);
	return i;
}
function tl(e) {
	let t = `precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;
	return e.precision === "highp" ? t += "\n#define HIGH_PRECISION" : e.precision === "mediump" ? t += "\n#define MEDIUM_PRECISION" : e.precision === "lowp" && (t += "\n#define LOW_PRECISION"), t;
}
var nl = {
	1: "SHADOWMAP_TYPE_PCF",
	3: "SHADOWMAP_TYPE_VSM"
};
function rl(e) {
	return nl[e.shadowMapType] || "SHADOWMAP_TYPE_BASIC";
}
var il = {
	301: "ENVMAP_TYPE_CUBE",
	302: "ENVMAP_TYPE_CUBE",
	306: "ENVMAP_TYPE_CUBE_UV"
};
function al(e) {
	return e.envMap === !1 ? "ENVMAP_TYPE_CUBE" : il[e.envMapMode] || "ENVMAP_TYPE_CUBE";
}
var ol = { 302: "ENVMAP_MODE_REFRACTION" };
function sl(e) {
	return e.envMap === !1 ? "ENVMAP_MODE_REFLECTION" : ol[e.envMapMode] || "ENVMAP_MODE_REFLECTION";
}
var cl = {
	0: "ENVMAP_BLENDING_MULTIPLY",
	1: "ENVMAP_BLENDING_MIX",
	2: "ENVMAP_BLENDING_ADD"
};
function ll(e) {
	return e.envMap === !1 ? "ENVMAP_BLENDING_NONE" : cl[e.combine] || "ENVMAP_BLENDING_NONE";
}
function ul(e) {
	let t = e.envMapCubeUVHeight;
	if (t === null) return null;
	let n = Math.log2(t) - 2, r = 1 / t;
	return {
		texelWidth: 1 / (3 * Math.max(2 ** n, 112)),
		texelHeight: r,
		maxMip: n
	};
}
function dl(e, t, n, r) {
	let i = e.getContext(), a = n.defines, o = n.vertexShader, s = n.fragmentShader, c = rl(n), l = al(n), u = sl(n), d = ll(n), f = ul(n), p = Hc(n), m = Uc(a), h = i.createProgram(), g, _, v = n.glslVersion ? "#version " + n.glslVersion + "\n" : "";
	n.isRawShaderMaterial ? (g = [
		"#define SHADER_TYPE " + n.shaderType,
		"#define SHADER_NAME " + n.shaderName,
		m
	].filter(Gc).join("\n"), g.length > 0 && (g += "\n"), _ = [
		"#define SHADER_TYPE " + n.shaderType,
		"#define SHADER_NAME " + n.shaderName,
		m
	].filter(Gc).join("\n"), _.length > 0 && (_ += "\n")) : (g = [
		tl(n),
		"#define SHADER_TYPE " + n.shaderType,
		"#define SHADER_NAME " + n.shaderName,
		m,
		n.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
		n.batching ? "#define USE_BATCHING" : "",
		n.batchingColor ? "#define USE_BATCHING_COLOR" : "",
		n.instancing ? "#define USE_INSTANCING" : "",
		n.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
		n.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
		n.useFog && n.fog ? "#define USE_FOG" : "",
		n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "",
		n.map ? "#define USE_MAP" : "",
		n.envMap ? "#define USE_ENVMAP" : "",
		n.envMap ? "#define " + u : "",
		n.lightMap ? "#define USE_LIGHTMAP" : "",
		n.aoMap ? "#define USE_AOMAP" : "",
		n.bumpMap ? "#define USE_BUMPMAP" : "",
		n.normalMap ? "#define USE_NORMALMAP" : "",
		n.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
		n.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
		n.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
		n.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
		n.anisotropy ? "#define USE_ANISOTROPY" : "",
		n.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
		n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
		n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
		n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
		n.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
		n.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
		n.specularMap ? "#define USE_SPECULARMAP" : "",
		n.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
		n.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
		n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
		n.metalnessMap ? "#define USE_METALNESSMAP" : "",
		n.alphaMap ? "#define USE_ALPHAMAP" : "",
		n.alphaHash ? "#define USE_ALPHAHASH" : "",
		n.transmission ? "#define USE_TRANSMISSION" : "",
		n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
		n.thicknessMap ? "#define USE_THICKNESSMAP" : "",
		n.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
		n.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
		n.mapUv ? "#define MAP_UV " + n.mapUv : "",
		n.alphaMapUv ? "#define ALPHAMAP_UV " + n.alphaMapUv : "",
		n.lightMapUv ? "#define LIGHTMAP_UV " + n.lightMapUv : "",
		n.aoMapUv ? "#define AOMAP_UV " + n.aoMapUv : "",
		n.emissiveMapUv ? "#define EMISSIVEMAP_UV " + n.emissiveMapUv : "",
		n.bumpMapUv ? "#define BUMPMAP_UV " + n.bumpMapUv : "",
		n.normalMapUv ? "#define NORMALMAP_UV " + n.normalMapUv : "",
		n.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + n.displacementMapUv : "",
		n.metalnessMapUv ? "#define METALNESSMAP_UV " + n.metalnessMapUv : "",
		n.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + n.roughnessMapUv : "",
		n.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + n.anisotropyMapUv : "",
		n.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + n.clearcoatMapUv : "",
		n.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + n.clearcoatNormalMapUv : "",
		n.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + n.clearcoatRoughnessMapUv : "",
		n.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + n.iridescenceMapUv : "",
		n.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + n.iridescenceThicknessMapUv : "",
		n.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + n.sheenColorMapUv : "",
		n.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + n.sheenRoughnessMapUv : "",
		n.specularMapUv ? "#define SPECULARMAP_UV " + n.specularMapUv : "",
		n.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + n.specularColorMapUv : "",
		n.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + n.specularIntensityMapUv : "",
		n.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + n.transmissionMapUv : "",
		n.thicknessMapUv ? "#define THICKNESSMAP_UV " + n.thicknessMapUv : "",
		n.vertexTangents && n.flatShading === !1 ? "#define USE_TANGENT" : "",
		n.vertexNormals ? "#define HAS_NORMAL" : "",
		n.vertexColors ? "#define USE_COLOR" : "",
		n.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
		n.vertexUv1s ? "#define USE_UV1" : "",
		n.vertexUv2s ? "#define USE_UV2" : "",
		n.vertexUv3s ? "#define USE_UV3" : "",
		n.pointsUvs ? "#define USE_POINTS_UV" : "",
		n.flatShading ? "#define FLAT_SHADED" : "",
		n.skinning ? "#define USE_SKINNING" : "",
		n.morphTargets ? "#define USE_MORPHTARGETS" : "",
		n.morphNormals && n.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
		n.morphColors ? "#define USE_MORPHCOLORS" : "",
		n.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + n.morphTextureStride : "",
		n.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + n.morphTargetsCount : "",
		n.doubleSided ? "#define DOUBLE_SIDED" : "",
		n.flipSided ? "#define FLIP_SIDED" : "",
		n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
		n.shadowMapEnabled ? "#define " + c : "",
		n.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
		n.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
		n.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
		n.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
		"uniform mat4 modelMatrix;",
		"uniform mat4 modelViewMatrix;",
		"uniform mat4 projectionMatrix;",
		"uniform mat4 viewMatrix;",
		"uniform mat3 normalMatrix;",
		"uniform vec3 cameraPosition;",
		"uniform bool isOrthographic;",
		"#ifdef USE_INSTANCING",
		"	attribute mat4 instanceMatrix;",
		"#endif",
		"#ifdef USE_INSTANCING_COLOR",
		"	attribute vec3 instanceColor;",
		"#endif",
		"#ifdef USE_INSTANCING_MORPH",
		"	uniform sampler2D morphTexture;",
		"#endif",
		"attribute vec3 position;",
		"attribute vec3 normal;",
		"attribute vec2 uv;",
		"#ifdef USE_UV1",
		"	attribute vec2 uv1;",
		"#endif",
		"#ifdef USE_UV2",
		"	attribute vec2 uv2;",
		"#endif",
		"#ifdef USE_UV3",
		"	attribute vec2 uv3;",
		"#endif",
		"#ifdef USE_TANGENT",
		"	attribute vec4 tangent;",
		"#endif",
		"#if defined( USE_COLOR_ALPHA )",
		"	attribute vec4 color;",
		"#elif defined( USE_COLOR )",
		"	attribute vec3 color;",
		"#endif",
		"#ifdef USE_SKINNING",
		"	attribute vec4 skinIndex;",
		"	attribute vec4 skinWeight;",
		"#endif",
		"\n"
	].filter(Gc).join("\n"), _ = [
		tl(n),
		"#define SHADER_TYPE " + n.shaderType,
		"#define SHADER_NAME " + n.shaderName,
		m,
		n.useFog && n.fog ? "#define USE_FOG" : "",
		n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "",
		n.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
		n.map ? "#define USE_MAP" : "",
		n.matcap ? "#define USE_MATCAP" : "",
		n.envMap ? "#define USE_ENVMAP" : "",
		n.envMap ? "#define " + l : "",
		n.envMap ? "#define " + u : "",
		n.envMap ? "#define " + d : "",
		f ? "#define CUBEUV_TEXEL_WIDTH " + f.texelWidth : "",
		f ? "#define CUBEUV_TEXEL_HEIGHT " + f.texelHeight : "",
		f ? "#define CUBEUV_MAX_MIP " + f.maxMip + ".0" : "",
		n.lightMap ? "#define USE_LIGHTMAP" : "",
		n.aoMap ? "#define USE_AOMAP" : "",
		n.bumpMap ? "#define USE_BUMPMAP" : "",
		n.normalMap ? "#define USE_NORMALMAP" : "",
		n.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
		n.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
		n.packedNormalMap ? "#define USE_PACKED_NORMALMAP" : "",
		n.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
		n.anisotropy ? "#define USE_ANISOTROPY" : "",
		n.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
		n.clearcoat ? "#define USE_CLEARCOAT" : "",
		n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
		n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
		n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
		n.dispersion ? "#define USE_DISPERSION" : "",
		n.retroreflection ? "#define USE_RETROREFLECTION" : "",
		n.iridescence ? "#define USE_IRIDESCENCE" : "",
		n.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
		n.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
		n.specularMap ? "#define USE_SPECULARMAP" : "",
		n.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
		n.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
		n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
		n.metalnessMap ? "#define USE_METALNESSMAP" : "",
		n.alphaMap ? "#define USE_ALPHAMAP" : "",
		n.alphaTest ? "#define USE_ALPHATEST" : "",
		n.alphaHash ? "#define USE_ALPHAHASH" : "",
		n.sheen ? "#define USE_SHEEN" : "",
		n.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
		n.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
		n.transmission ? "#define USE_TRANSMISSION" : "",
		n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
		n.thicknessMap ? "#define USE_THICKNESSMAP" : "",
		n.vertexTangents && n.flatShading === !1 ? "#define USE_TANGENT" : "",
		n.vertexColors || n.instancingColor ? "#define USE_COLOR" : "",
		n.vertexAlphas || n.batchingColor ? "#define USE_COLOR_ALPHA" : "",
		n.vertexUv1s ? "#define USE_UV1" : "",
		n.vertexUv2s ? "#define USE_UV2" : "",
		n.vertexUv3s ? "#define USE_UV3" : "",
		n.pointsUvs ? "#define USE_POINTS_UV" : "",
		n.gradientMap ? "#define USE_GRADIENTMAP" : "",
		n.flatShading ? "#define FLAT_SHADED" : "",
		n.doubleSided ? "#define DOUBLE_SIDED" : "",
		n.flipSided ? "#define FLIP_SIDED" : "",
		n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
		n.shadowMapEnabled ? "#define " + c : "",
		n.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
		n.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
		n.numLightProbeGrids > 0 ? "#define USE_LIGHT_PROBES_GRID" : "",
		n.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
		n.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "",
		n.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
		n.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
		"uniform mat4 viewMatrix;",
		"uniform vec3 cameraPosition;",
		"uniform bool isOrthographic;",
		n.toneMapping === 0 ? "" : "#define TONE_MAPPING",
		n.toneMapping === 0 ? "" : Io.tonemapping_pars_fragment,
		n.toneMapping === 0 ? "" : zc("toneMapping", n.toneMapping),
		n.dithering ? "#define DITHERING" : "",
		n.opaque ? "#define OPAQUE" : "",
		Io.colorspace_pars_fragment,
		Lc("linearToOutputTexel", n.outputColorSpace),
		Vc(),
		n.useDepthPacking ? "#define DEPTH_PACKING " + n.depthPacking : "",
		"\n"
	].filter(Gc).join("\n")), o = Yc(o), o = Kc(o, n), o = qc(o, n), s = Yc(s), s = Kc(s, n), s = qc(s, n), o = $c(o), s = $c(s), n.isRawShaderMaterial !== !0 && (v = "#version 300 es\n", g = [
		p,
		"#define attribute in",
		"#define varying out",
		"#define texture2D texture"
	].join("\n") + "\n" + g, _ = [
		"#define varying in",
		n.glslVersion === "300 es" ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
		n.glslVersion === "300 es" ? "" : "#define gl_FragColor pc_fragColor",
		"#define gl_FragDepthEXT gl_FragDepth",
		"#define texture2D texture",
		"#define textureCube texture",
		"#define texture2DProj textureProj",
		"#define texture2DLodEXT textureLod",
		"#define texture2DProjLodEXT textureProjLod",
		"#define textureCubeLodEXT textureLod",
		"#define texture2DGradEXT textureGrad",
		"#define texture2DProjGradEXT textureProjGrad",
		"#define textureCubeGradEXT textureGrad"
	].join("\n") + "\n" + _);
	let y = v + g + o, b = v + _ + s, x = Ac(i, i.VERTEX_SHADER, y), S = Ac(i, i.FRAGMENT_SHADER, b);
	i.attachShader(h, x), i.attachShader(h, S), n.index0AttributeName === void 0 ? n.hasPositionAttribute === !0 && i.bindAttribLocation(h, 0, "position") : i.bindAttribLocation(h, 0, n.index0AttributeName), i.linkProgram(h);
	function C(t) {
		if (e.debug.checkShaderErrors) {
			let n = i.getProgramInfoLog(h) || "", r = i.getShaderInfoLog(x) || "", a = i.getShaderInfoLog(S) || "", o = n.trim(), s = r.trim(), c = a.trim(), l = !0, u = !0;
			if (i.getProgramParameter(h, i.LINK_STATUS) === !1) {
				if (l = !1, typeof e.debug.onShaderError == "function") e.debug.onShaderError(i, h, x, S);
				else {
					let e = Ic(i, x, "vertex"), n = Ic(i, S, "fragment");
					B("WebGLProgram: Shader Error " + i.getError() + " - VALIDATE_STATUS " + i.getProgramParameter(h, i.VALIDATE_STATUS) + "\n\nMaterial Name: " + t.name + "\nMaterial Type: " + t.type + "\n\nProgram Info Log: " + o + "\n" + e + "\n" + n);
				}
			} else o === "" ? (s === "" || c === "") && (u = !1) : z("WebGLProgram: Program Info Log:", o);
			u && (t.diagnostics = {
				runnable: l,
				programLog: o,
				vertexShader: {
					log: s,
					prefix: g
				},
				fragmentShader: {
					log: c,
					prefix: _
				}
			});
		}
		i.deleteShader(x), i.deleteShader(S), w = new kc(i, h), T = Wc(i, h);
	}
	let w;
	this.getUniforms = function() {
		return w === void 0 && C(this), w;
	};
	let T;
	this.getAttributes = function() {
		return T === void 0 && C(this), T;
	};
	let E = n.rendererExtensionParallelShaderCompile === !1;
	return this.isReady = function() {
		return E === !1 && (E = i.getProgramParameter(h, jc)), E;
	}, this.destroy = function() {
		r.releaseStatesOfProgram(this), i.deleteProgram(h), this.program = void 0;
	}, this.type = n.shaderType, this.name = n.shaderName, this.id = Mc++, this.cacheKey = t, this.usedTimes = 1, this.program = h, this.vertexShader = x, this.fragmentShader = S, this;
}
var fl = 0, pl = class {
	constructor() {
		this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
	}
	update(e, t, n) {
		let r = this._getShaderCacheForMaterial(e);
		return r.has(t) === !1 && (r.add(t), t.usedTimes++), r.has(n) === !1 && (r.add(n), n.usedTimes++), this;
	}
	remove(e) {
		let t = this.materialCache.get(e);
		for (let e of t) e.usedTimes--, e.usedTimes === 0 && this.shaderCache.delete(e.code);
		return this.materialCache.delete(e), this;
	}
	getVertexShaderStage(e) {
		return this._getShaderStage(e.vertexShader);
	}
	getFragmentShaderStage(e) {
		return this._getShaderStage(e.fragmentShader);
	}
	dispose() {
		this.shaderCache.clear(), this.materialCache.clear();
	}
	_getShaderCacheForMaterial(e) {
		let t = this.materialCache, n = t.get(e);
		return n === void 0 && (n = /* @__PURE__ */ new Set(), t.set(e, n)), n;
	}
	_getShaderStage(e) {
		let t = this.shaderCache, n = t.get(e);
		return n === void 0 && (n = new ml(e), t.set(e, n)), n;
	}
}, ml = class {
	constructor(e) {
		this.id = fl++, this.code = e, this.usedTimes = 0;
	}
};
function hl(e) {
	return e === 1030 || e === 37490 || e === 36285;
}
function gl(e, t, n, r, i, a) {
	let o = new qe(), s = new pl(), c = /* @__PURE__ */ new Set(), l = [], u = /* @__PURE__ */ new Map(), d = r.logarithmicDepthBuffer, f = r.precision, p = {
		MeshDepthMaterial: "depth",
		MeshDistanceMaterial: "distance",
		MeshNormalMaterial: "normal",
		MeshBasicMaterial: "basic",
		MeshLambertMaterial: "lambert",
		MeshPhongMaterial: "phong",
		MeshToonMaterial: "toon",
		MeshStandardMaterial: "physical",
		MeshPhysicalMaterial: "physical",
		MeshMatcapMaterial: "matcap",
		LineBasicMaterial: "basic",
		LineDashedMaterial: "dashed",
		PointsMaterial: "points",
		ShadowMaterial: "shadow",
		SpriteMaterial: "sprite"
	};
	function m(e) {
		return c.add(e), e === 0 ? "uv" : `uv${e}`;
	}
	function h(i, o, l, u, h, g) {
		let _ = u.fog, v = h.geometry, y = i.isMeshStandardMaterial || i.isMeshLambertMaterial || i.isMeshPhongMaterial ? u.environment : null, b = i.isMeshStandardMaterial || i.isMeshLambertMaterial && !i.envMap || i.isMeshPhongMaterial && !i.envMap, x = t.get(i.envMap || y, b), S = x && x.mapping === 306 ? x.image.height : null, C = p[i.type];
		i.precision !== null && (f = r.getMaxPrecision(i.precision), f !== i.precision && z("WebGLProgram.getParameters:", i.precision, "not supported, using", f, "instead."));
		let w = v.morphAttributes.position || v.morphAttributes.normal || v.morphAttributes.color, T = w === void 0 ? 0 : w.length, E = 0;
		v.morphAttributes.position !== void 0 && (E = 1), v.morphAttributes.normal !== void 0 && (E = 2), v.morphAttributes.color !== void 0 && (E = 3);
		let D, O, k, A;
		if (C) {
			let e = Lo[C];
			D = e.vertexShader, O = e.fragmentShader;
		} else {
			D = i.vertexShader, O = i.fragmentShader;
			let e = s.getVertexShaderStage(i), t = s.getFragmentShaderStage(i);
			s.update(i, e, t), k = e.id, A = t.id;
		}
		let j = e.getRenderTarget(), M = e.state.buffers.depth.getReversed(), N = h.isInstancedMesh === !0, P = h.isBatchedMesh === !0, F = !!i.map, I = !!i.matcap, ee = !!x, L = !!i.aoMap, te = !!i.lightMap, ne = !!i.bumpMap && i.wireframe === !1, re = !!i.normalMap, R = !!i.displacementMap, B = !!i.emissiveMap, V = !!i.metalnessMap, ie = !!i.roughnessMap, ae = i.anisotropy > 0, oe = i.clearcoat > 0, se = i.dispersion > 0, ce = i.retroreflectivity > 0, le = i.iridescence > 0, ue = i.sheen > 0, H = i.transmission > 0, de = ae && !!i.anisotropyMap, fe = oe && !!i.clearcoatMap, pe = oe && !!i.clearcoatNormalMap, me = oe && !!i.clearcoatRoughnessMap, U = le && !!i.iridescenceMap, he = le && !!i.iridescenceThicknessMap, W = ue && !!i.sheenColorMap, ge = ue && !!i.sheenRoughnessMap, _e = !!i.specularMap, G = !!i.specularColorMap, ve = !!i.specularIntensityMap, ye = H && !!i.transmissionMap, be = H && !!i.thicknessMap, xe = !!i.gradientMap, Ce = !!i.alphaMap, we = i.alphaTest > 0, Te = !!i.alphaHash, Ee = !!i.extensions, De = 0;
		i.toneMapped && (j === null || j.isXRRenderTarget === !0) && (De = e.toneMapping);
		let Oe = {
			shaderID: C,
			shaderType: i.type,
			shaderName: i.name,
			vertexShader: D,
			fragmentShader: O,
			defines: i.defines,
			customVertexShaderID: k,
			customFragmentShaderID: A,
			isRawShaderMaterial: i.isRawShaderMaterial === !0,
			glslVersion: i.glslVersion,
			precision: f,
			batching: P,
			batchingColor: P && h._colorsTexture !== null,
			instancing: N,
			instancingColor: N && h.instanceColor !== null,
			instancingMorph: N && h.morphTexture !== null,
			outputColorSpace: j === null ? e.outputColorSpace : j.isXRRenderTarget === !0 ? j.texture.colorSpace : Se.workingColorSpace,
			alphaToCoverage: !!i.alphaToCoverage,
			map: F,
			matcap: I,
			envMap: ee,
			envMapMode: ee && x.mapping,
			envMapCubeUVHeight: S,
			aoMap: L,
			lightMap: te,
			bumpMap: ne,
			normalMap: re,
			displacementMap: R,
			emissiveMap: B,
			normalMapObjectSpace: re && i.normalMapType === 1,
			normalMapTangentSpace: re && i.normalMapType === 0,
			packedNormalMap: re && i.normalMapType === 0 && hl(i.normalMap.format),
			metalnessMap: V,
			roughnessMap: ie,
			anisotropy: ae,
			anisotropyMap: de,
			clearcoat: oe,
			clearcoatMap: fe,
			clearcoatNormalMap: pe,
			clearcoatRoughnessMap: me,
			dispersion: se,
			retroreflection: ce,
			iridescence: le,
			iridescenceMap: U,
			iridescenceThicknessMap: he,
			sheen: ue,
			sheenColorMap: W,
			sheenRoughnessMap: ge,
			specularMap: _e,
			specularColorMap: G,
			specularIntensityMap: ve,
			transmission: H,
			transmissionMap: ye,
			thicknessMap: be,
			gradientMap: xe,
			opaque: i.transparent === !1 && i.blending === 1 && i.alphaToCoverage === !1,
			alphaMap: Ce,
			alphaTest: we,
			alphaHash: Te,
			combine: i.combine,
			mapUv: F && m(i.map.channel),
			aoMapUv: L && m(i.aoMap.channel),
			lightMapUv: te && m(i.lightMap.channel),
			bumpMapUv: ne && m(i.bumpMap.channel),
			normalMapUv: re && m(i.normalMap.channel),
			displacementMapUv: R && m(i.displacementMap.channel),
			emissiveMapUv: B && m(i.emissiveMap.channel),
			metalnessMapUv: V && m(i.metalnessMap.channel),
			roughnessMapUv: ie && m(i.roughnessMap.channel),
			anisotropyMapUv: de && m(i.anisotropyMap.channel),
			clearcoatMapUv: fe && m(i.clearcoatMap.channel),
			clearcoatNormalMapUv: pe && m(i.clearcoatNormalMap.channel),
			clearcoatRoughnessMapUv: me && m(i.clearcoatRoughnessMap.channel),
			iridescenceMapUv: U && m(i.iridescenceMap.channel),
			iridescenceThicknessMapUv: he && m(i.iridescenceThicknessMap.channel),
			sheenColorMapUv: W && m(i.sheenColorMap.channel),
			sheenRoughnessMapUv: ge && m(i.sheenRoughnessMap.channel),
			specularMapUv: _e && m(i.specularMap.channel),
			specularColorMapUv: G && m(i.specularColorMap.channel),
			specularIntensityMapUv: ve && m(i.specularIntensityMap.channel),
			transmissionMapUv: ye && m(i.transmissionMap.channel),
			thicknessMapUv: be && m(i.thicknessMap.channel),
			alphaMapUv: Ce && m(i.alphaMap.channel),
			vertexTangents: !!v.attributes.tangent && (re || ae),
			vertexNormals: !!v.attributes.normal,
			vertexColors: i.vertexColors,
			vertexAlphas: i.vertexColors === !0 && !!v.attributes.color && v.attributes.color.itemSize === 4,
			pointsUvs: h.isPoints === !0 && !!v.attributes.uv && (F || Ce),
			fog: !!_,
			useFog: i.fog === !0,
			fogExp2: !!_ && _.isFogExp2,
			flatShading: i.wireframe === !1 && (i.flatShading === !0 || v.attributes.normal === void 0 && re === !1 && (i.isMeshLambertMaterial || i.isMeshPhongMaterial || i.isMeshStandardMaterial || i.isMeshPhysicalMaterial)),
			sizeAttenuation: i.sizeAttenuation === !0,
			logarithmicDepthBuffer: d,
			reversedDepthBuffer: M,
			skinning: h.isSkinnedMesh === !0,
			hasPositionAttribute: v.attributes.position !== void 0,
			morphTargets: v.morphAttributes.position !== void 0,
			morphNormals: v.morphAttributes.normal !== void 0,
			morphColors: v.morphAttributes.color !== void 0,
			morphTargetsCount: T,
			morphTextureStride: E,
			numSunLights: o.sun.length,
			numDirLights: o.directional.length,
			numPointLights: o.point.length,
			numSpotLights: o.spot.length,
			numSpotLightMaps: o.spotLightMap.length,
			numRectAreaLights: o.rectArea.length,
			numHemiLights: o.hemi.length,
			numSunLightShadows: o.sunShadowMap.length,
			numDirLightShadows: o.directionalShadowMap.length,
			numPointLightShadows: o.pointShadowMap.length,
			numSpotLightShadows: o.spotShadowMap.length,
			numSpotLightShadowsWithMaps: o.numSpotLightShadowsWithMaps,
			numLightProbes: o.numLightProbes,
			numLightProbeGrids: g.length,
			numClippingPlanes: a.numPlanes,
			numClipIntersection: a.numIntersection,
			dithering: i.dithering,
			shadowMapEnabled: e.shadowMap.enabled && l.length > 0,
			shadowMapType: e.shadowMap.type,
			toneMapping: De,
			decodeVideoTexture: F && i.map.isVideoTexture === !0 && Se.getTransfer(i.map.colorSpace) === "srgb",
			decodeVideoTextureEmissive: B && i.emissiveMap.isVideoTexture === !0 && Se.getTransfer(i.emissiveMap.colorSpace) === "srgb",
			premultipliedAlpha: i.premultipliedAlpha,
			doubleSided: i.side === 2,
			flipSided: i.side === 1,
			useDepthPacking: i.depthPacking >= 0,
			depthPacking: i.depthPacking || 0,
			index0AttributeName: i.index0AttributeName,
			extensionClipCullDistance: Ee && i.extensions.clipCullDistance === !0 && n.has("WEBGL_clip_cull_distance"),
			extensionMultiDraw: (Ee && i.extensions.multiDraw === !0 || P) && n.has("WEBGL_multi_draw"),
			rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"),
			customProgramCacheKey: i.customProgramCacheKey()
		};
		return Oe.vertexUv1s = c.has(1), Oe.vertexUv2s = c.has(2), Oe.vertexUv3s = c.has(3), c.clear(), Oe;
	}
	function g(t) {
		let n = [];
		if (t.shaderID ? n.push(t.shaderID) : (n.push(t.customVertexShaderID), n.push(t.customFragmentShaderID)), t.defines !== void 0) for (let e in t.defines) n.push(e), n.push(t.defines[e]);
		return t.isRawShaderMaterial === !1 && (_(n, t), v(n, t), n.push(e.outputColorSpace)), n.push(t.customProgramCacheKey), n.join();
	}
	function _(e, t) {
		e.push(t.precision), e.push(t.outputColorSpace), e.push(t.envMapMode), e.push(t.envMapCubeUVHeight), e.push(t.mapUv), e.push(t.alphaMapUv), e.push(t.lightMapUv), e.push(t.aoMapUv), e.push(t.bumpMapUv), e.push(t.normalMapUv), e.push(t.displacementMapUv), e.push(t.emissiveMapUv), e.push(t.metalnessMapUv), e.push(t.roughnessMapUv), e.push(t.anisotropyMapUv), e.push(t.clearcoatMapUv), e.push(t.clearcoatNormalMapUv), e.push(t.clearcoatRoughnessMapUv), e.push(t.iridescenceMapUv), e.push(t.iridescenceThicknessMapUv), e.push(t.sheenColorMapUv), e.push(t.sheenRoughnessMapUv), e.push(t.specularMapUv), e.push(t.specularColorMapUv), e.push(t.specularIntensityMapUv), e.push(t.transmissionMapUv), e.push(t.thicknessMapUv), e.push(t.combine), e.push(t.fogExp2), e.push(t.sizeAttenuation), e.push(t.morphTargetsCount), e.push(t.morphAttributeCount), e.push(t.numSunLights), e.push(t.numDirLights), e.push(t.numPointLights), e.push(t.numSpotLights), e.push(t.numSpotLightMaps), e.push(t.numHemiLights), e.push(t.numRectAreaLights), e.push(t.numSunLightShadows), e.push(t.numDirLightShadows), e.push(t.numPointLightShadows), e.push(t.numSpotLightShadows), e.push(t.numSpotLightShadowsWithMaps), e.push(t.numLightProbes), e.push(t.shadowMapType), e.push(t.toneMapping), e.push(t.numClippingPlanes), e.push(t.numClipIntersection), e.push(t.depthPacking);
	}
	function v(e, t) {
		o.disableAll(), t.instancing && o.enable(0), t.instancingColor && o.enable(1), t.instancingMorph && o.enable(2), t.matcap && o.enable(3), t.envMap && o.enable(4), t.normalMapObjectSpace && o.enable(5), t.normalMapTangentSpace && o.enable(6), t.clearcoat && o.enable(7), t.iridescence && o.enable(8), t.alphaTest && o.enable(9), t.vertexColors && o.enable(10), t.vertexAlphas && o.enable(11), t.vertexUv1s && o.enable(12), t.vertexUv2s && o.enable(13), t.vertexUv3s && o.enable(14), t.vertexTangents && o.enable(15), t.anisotropy && o.enable(16), t.alphaHash && o.enable(17), t.batching && o.enable(18), t.dispersion && o.enable(19), t.retroreflection && o.enable(24), t.batchingColor && o.enable(20), t.gradientMap && o.enable(21), t.packedNormalMap && o.enable(22), t.vertexNormals && o.enable(23), e.push(o.mask), o.disableAll(), t.fog && o.enable(0), t.useFog && o.enable(1), t.flatShading && o.enable(2), t.logarithmicDepthBuffer && o.enable(3), t.reversedDepthBuffer && o.enable(4), t.skinning && o.enable(5), t.morphTargets && o.enable(6), t.morphNormals && o.enable(7), t.morphColors && o.enable(8), t.premultipliedAlpha && o.enable(9), t.shadowMapEnabled && o.enable(10), t.doubleSided && o.enable(11), t.flipSided && o.enable(12), t.useDepthPacking && o.enable(13), t.dithering && o.enable(14), t.transmission && o.enable(15), t.sheen && o.enable(16), t.opaque && o.enable(17), t.pointsUvs && o.enable(18), t.decodeVideoTexture && o.enable(19), t.decodeVideoTextureEmissive && o.enable(20), t.alphaToCoverage && o.enable(21), t.numLightProbeGrids > 0 && o.enable(22), t.hasPositionAttribute && o.enable(23), e.push(o.mask);
	}
	function y(e) {
		let t = p[e.type], n;
		if (t) {
			let e = Lo[t];
			n = da.clone(e.uniforms);
		} else n = e.uniforms;
		return n;
	}
	function b(t, n) {
		let r = u.get(n);
		return r === void 0 ? (r = new dl(e, n, t, i), l.push(r), u.set(n, r)) : ++r.usedTimes, r;
	}
	function x(e) {
		if (--e.usedTimes === 0) {
			let t = l.indexOf(e);
			l[t] = l[l.length - 1], l.pop(), u.delete(e.cacheKey), e.destroy();
		}
	}
	function S(e) {
		s.remove(e);
	}
	function C() {
		s.dispose();
	}
	return {
		getParameters: h,
		getProgramCacheKey: g,
		getUniforms: y,
		acquireProgram: b,
		releaseProgram: x,
		releaseShaderCache: S,
		programs: l,
		dispose: C
	};
}
function _l() {
	let e = /* @__PURE__ */ new WeakMap();
	function t(t) {
		return e.has(t);
	}
	function n(t) {
		let n = e.get(t);
		return n === void 0 && (n = {}, e.set(t, n)), n;
	}
	function r(t) {
		e.delete(t);
	}
	function i(t, n, r) {
		e.get(t)[n] = r;
	}
	function a() {
		e = /* @__PURE__ */ new WeakMap();
	}
	return {
		has: t,
		get: n,
		remove: r,
		update: i,
		dispose: a
	};
}
function vl(e, t) {
	return e.groupOrder === t.groupOrder ? e.renderOrder === t.renderOrder ? e.material.id === t.material.id ? e.materialVariant === t.materialVariant ? e.z === t.z ? e.id - t.id : e.z - t.z : e.materialVariant - t.materialVariant : e.material.id - t.material.id : e.renderOrder - t.renderOrder : e.groupOrder - t.groupOrder;
}
function yl(e, t) {
	return e.groupOrder === t.groupOrder ? e.renderOrder === t.renderOrder ? e.z === t.z ? e.id - t.id : t.z - e.z : e.renderOrder - t.renderOrder : e.groupOrder - t.groupOrder;
}
function bl() {
	let e = [], t = 0, n = [], r = [], i = [];
	function a() {
		t = 0, n.length = 0, r.length = 0, i.length = 0;
	}
	function o(e) {
		let t = 0;
		return e.isInstancedMesh && (t += 2), e.isSkinnedMesh && (t += 1), t;
	}
	function s(n, r, i, a, s, c) {
		let l = e[t];
		return l === void 0 ? (l = {
			id: n.id,
			object: n,
			geometry: r,
			material: i,
			materialVariant: o(n),
			groupOrder: a,
			renderOrder: n.renderOrder,
			z: s,
			group: c
		}, e[t] = l) : (l.id = n.id, l.object = n, l.geometry = r, l.material = i, l.materialVariant = o(n), l.groupOrder = a, l.renderOrder = n.renderOrder, l.z = s, l.group = c), t++, l;
	}
	function c(e, t, a, o, c, l, u) {
		u.reversedDepth === !0 && (c = -c);
		let d = s(e, t, a, o, c, l);
		a.transmission > 0 ? r.push(d) : a.transparent === !0 ? i.push(d) : n.push(d);
	}
	function l(e, t, a, o, c, l) {
		let u = s(e, t, a, o, c, l);
		a.transmission > 0 ? r.unshift(u) : a.transparent === !0 ? i.unshift(u) : n.unshift(u);
	}
	function u(e, t) {
		n.length > 1 && n.sort(e || vl), r.length > 1 && r.sort(t || yl), i.length > 1 && i.sort(t || yl);
	}
	function d() {
		for (let n = t, r = e.length; n < r; n++) {
			let t = e[n];
			if (t.id === null) break;
			t.id = null, t.object = null, t.geometry = null, t.material = null, t.group = null;
		}
	}
	return {
		opaque: n,
		transmissive: r,
		transparent: i,
		init: a,
		push: c,
		unshift: l,
		finish: d,
		sort: u
	};
}
function xl() {
	let e = /* @__PURE__ */ new WeakMap();
	function t(t, n) {
		let r = e.get(t), i;
		return r === void 0 ? (i = new bl(), e.set(t, [i])) : n >= r.length ? (i = new bl(), r.push(i)) : i = r[n], i;
	}
	function n() {
		e = /* @__PURE__ */ new WeakMap();
	}
	return {
		get: t,
		dispose: n
	};
}
function Sl() {
	let e = {};
	return { get: function(t) {
		if (e[t.id] !== void 0) return e[t.id];
		let n;
		switch (t.type) {
			case "SunLight":
			case "DirectionalLight":
				n = {
					direction: new W(),
					color: new J()
				};
				break;
			case "SpotLight":
				n = {
					position: new W(),
					direction: new W(),
					color: new J(),
					distance: 0,
					coneCos: 0,
					penumbraCos: 0,
					decay: 0
				};
				break;
			case "PointLight":
				n = {
					position: new W(),
					color: new J(),
					distance: 0,
					decay: 0
				};
				break;
			case "HemisphereLight":
				n = {
					direction: new W(),
					skyColor: new J(),
					groundColor: new J()
				};
				break;
			case "RectAreaLight": n = {
				color: new J(),
				position: new W(),
				halfWidth: new W(),
				halfHeight: new W()
			};
		}
		return e[t.id] = n, n;
	} };
}
function Cl() {
	let e = {};
	return { get: function(t) {
		if (e[t.id] !== void 0) return e[t.id];
		let n;
		switch (t.type) {
			case "SunLight":
			case "DirectionalLight":
				n = {
					shadowIntensity: 1,
					shadowBias: 0,
					shadowNormalBias: 0,
					shadowRadius: 1,
					shadowMapSize: new U()
				};
				break;
			case "SpotLight":
				n = {
					shadowIntensity: 1,
					shadowBias: 0,
					shadowNormalBias: 0,
					shadowRadius: 1,
					shadowMapSize: new U()
				};
				break;
			case "PointLight": n = {
				shadowIntensity: 1,
				shadowBias: 0,
				shadowNormalBias: 0,
				shadowRadius: 1,
				shadowMapSize: new U(),
				shadowCameraNear: 1,
				shadowCameraFar: 1e3
			};
		}
		return e[t.id] = n, n;
	} };
}
var wl = 0;
function Tl(e, t) {
	return (t.castShadow ? 2 : 0) - (e.castShadow ? 2 : 0) + +!!t.map - !!e.map;
}
function El(e) {
	let t = new Sl(), n = Cl(), r = {
		version: 0,
		hash: {
			sunLength: -1,
			directionalLength: -1,
			pointLength: -1,
			spotLength: -1,
			rectAreaLength: -1,
			hemiLength: -1,
			numSunShadows: -1,
			numDirectionalShadows: -1,
			numPointShadows: -1,
			numSpotShadows: -1,
			numSpotMaps: -1,
			numLightProbes: -1
		},
		ambient: [
			0,
			0,
			0
		],
		probe: [],
		sun: [],
		sunShadow: [],
		sunShadowMap: [],
		sunShadowMatrix: [],
		sunShadowCascade: [],
		directional: [],
		directionalShadow: [],
		directionalShadowMap: [],
		directionalShadowMatrix: [],
		spot: [],
		spotLightMap: [],
		spotShadow: [],
		spotShadowMap: [],
		spotLightMatrix: [],
		rectArea: [],
		rectAreaLTC1: null,
		rectAreaLTC2: null,
		point: [],
		pointShadow: [],
		pointShadowMap: [],
		pointShadowMatrix: [],
		hemi: [],
		numSpotLightShadowsWithMaps: 0,
		numLightProbes: 0
	};
	for (let e = 0; e < 9; e++) r.probe.push(new W());
	let i = new W(), a = new Le(), o = new Le();
	function s(i) {
		let a = 0, o = 0, s = 0;
		for (let e = 0; e < 9; e++) r.probe[e].set(0, 0, 0);
		let c = 0, l = 0, u = 0, d = 0, f = 0, p = 0, m = 0, h = 0, g = 0, _ = 0, v = 0, y = 0, b = 0, x = 0;
		i.sort(Tl);
		for (let e = 0, S = i.length; e < S; e++) {
			let S = i[e], C = S.color, w = S.intensity, T = S.distance, E = null;
			if (S.shadow && S.shadow.map && (E = S.shadow.map.texture.format === 1030 ? S.shadow.map.texture : S.shadow.map.depthTexture || S.shadow.map.texture), S.isAmbientLight) a += C.r * w, o += C.g * w, s += C.b * w;
			else if (S.isLightProbe) {
				for (let e = 0; e < 9; e++) r.probe[e].addScaledVector(S.sh.coefficients[e], w);
				x++;
			} else if (S.isSunLight) {
				let e = t.get(S);
				if (e.color.copy(S.color).multiplyScalar(S.intensity), S.castShadow) {
					let e = S.shadow, t = n.get(S);
					t.shadowIntensity = e.intensity, t.shadowBias = e.bias, t.shadowNormalBias = e.normalBias, t.shadowRadius = e.radius, t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()), r.sunShadow[l] = t, r.sunShadowMap[l] = E;
					let i = e.getViewportCount();
					for (let t = 0; t < i; t++) r.sunShadowMatrix[u + t] = e.getMatrix(t), r.sunShadowCascade[u + t] = e._cascadeData[t];
					u += i, l++;
				}
				r.sun[c] = e, c++;
			} else if (S.isDirectionalLight) {
				let e = t.get(S);
				if (e.color.copy(S.color).multiplyScalar(S.intensity), S.castShadow) {
					let e = S.shadow, t = n.get(S);
					t.shadowIntensity = e.intensity, t.shadowBias = e.bias, t.shadowNormalBias = e.normalBias, t.shadowRadius = e.radius, t.shadowMapSize = e.mapSize, r.directionalShadow[d] = t, r.directionalShadowMap[d] = E, r.directionalShadowMatrix[d] = S.shadow.matrix, g++;
				}
				r.directional[d] = e, d++;
			} else if (S.isSpotLight) {
				let e = t.get(S);
				e.position.setFromMatrixPosition(S.matrixWorld), e.color.copy(C).multiplyScalar(w), e.distance = T, e.coneCos = Math.cos(S.angle), e.penumbraCos = Math.cos(S.angle * (1 - S.penumbra)), e.decay = S.decay, r.spot[p] = e;
				let i = S.shadow;
				if (S.map && (r.spotLightMap[y] = S.map, y++, i.updateMatrices(S), S.castShadow && b++), r.spotLightMatrix[p] = i.matrix, S.castShadow) {
					let e = n.get(S);
					e.shadowIntensity = i.intensity, e.shadowBias = i.bias, e.shadowNormalBias = i.normalBias, e.shadowRadius = i.radius, e.shadowMapSize = i.mapSize, r.spotShadow[p] = e, r.spotShadowMap[p] = E, v++;
				}
				p++;
			} else if (S.isRectAreaLight) {
				let e = t.get(S);
				e.color.copy(C).multiplyScalar(w), e.halfWidth.set(S.width * .5, 0, 0), e.halfHeight.set(0, S.height * .5, 0), r.rectArea[m] = e, m++;
			} else if (S.isPointLight) {
				let e = t.get(S);
				if (e.color.copy(S.color).multiplyScalar(S.intensity), e.distance = S.distance, e.decay = S.decay, S.castShadow) {
					let e = S.shadow, t = n.get(S);
					t.shadowIntensity = e.intensity, t.shadowBias = e.bias, t.shadowNormalBias = e.normalBias, t.shadowRadius = e.radius, t.shadowMapSize = e.mapSize, t.shadowCameraNear = e.camera.near, t.shadowCameraFar = e.camera.far, r.pointShadow[f] = t, r.pointShadowMap[f] = E, r.pointShadowMatrix[f] = S.shadow.matrix, _++;
				}
				r.point[f] = e, f++;
			} else if (S.isHemisphereLight) {
				let e = t.get(S);
				e.skyColor.copy(S.color).multiplyScalar(w), e.groundColor.copy(S.groundColor).multiplyScalar(w), r.hemi[h] = e, h++;
			}
		}
		m > 0 && (e.has("OES_texture_float_linear") === !0 ? (r.rectAreaLTC1 = Z.LTC_FLOAT_1, r.rectAreaLTC2 = Z.LTC_FLOAT_2) : (r.rectAreaLTC1 = Z.LTC_HALF_1, r.rectAreaLTC2 = Z.LTC_HALF_2)), r.ambient[0] = a, r.ambient[1] = o, r.ambient[2] = s;
		let S = r.hash;
		(S.sunLength !== c || S.directionalLength !== d || S.pointLength !== f || S.spotLength !== p || S.rectAreaLength !== m || S.hemiLength !== h || S.numSunShadows !== l || S.numDirectionalShadows !== g || S.numPointShadows !== _ || S.numSpotShadows !== v || S.numSpotMaps !== y || S.numLightProbes !== x) && (r.sun.length = c, r.directional.length = d, r.spot.length = p, r.rectArea.length = m, r.point.length = f, r.hemi.length = h, r.sunShadow.length = l, r.sunShadowMap.length = l, r.sunShadowMatrix.length = u, r.sunShadowCascade.length = u, r.directionalShadow.length = g, r.directionalShadowMap.length = g, r.directionalShadowMatrix.length = g, r.pointShadow.length = _, r.pointShadowMap.length = _, r.pointShadowMatrix.length = _, r.spotShadow.length = v, r.spotShadowMap.length = v, r.spotLightMatrix.length = v + y - b, r.spotLightMap.length = y, r.numSpotLightShadowsWithMaps = b, r.numLightProbes = x, S.sunLength = c, S.directionalLength = d, S.pointLength = f, S.spotLength = p, S.rectAreaLength = m, S.hemiLength = h, S.numSunShadows = l, S.numDirectionalShadows = g, S.numPointShadows = _, S.numSpotShadows = v, S.numSpotMaps = y, S.numLightProbes = x, r.version = wl++);
	}
	function c(e, t) {
		let n = 0, s = 0, c = 0, l = 0, u = 0, d = 0, f = t.matrixWorldInverse;
		for (let t = 0, p = e.length; t < p; t++) {
			let p = e[t];
			if (p.isSunLight) {
				let e = r.sun[n];
				e.direction.setFromMatrixPosition(p.matrixWorld), e.direction.transformDirection(f), n++;
			} else if (p.isDirectionalLight) {
				let e = r.directional[s];
				e.direction.setFromMatrixPosition(p.matrixWorld), i.setFromMatrixPosition(p.target.matrixWorld), e.direction.sub(i), e.direction.transformDirection(f), s++;
			} else if (p.isSpotLight) {
				let e = r.spot[l];
				e.position.setFromMatrixPosition(p.matrixWorld), e.position.applyMatrix4(f), e.direction.setFromMatrixPosition(p.matrixWorld), i.setFromMatrixPosition(p.target.matrixWorld), e.direction.sub(i), e.direction.transformDirection(f), l++;
			} else if (p.isRectAreaLight) {
				let e = r.rectArea[u];
				e.position.setFromMatrixPosition(p.matrixWorld), e.position.applyMatrix4(f), o.identity(), a.copy(p.matrixWorld), a.premultiply(f), o.extractRotation(a), e.halfWidth.set(p.width * .5, 0, 0), e.halfHeight.set(0, p.height * .5, 0), e.halfWidth.applyMatrix4(o), e.halfHeight.applyMatrix4(o), u++;
			} else if (p.isPointLight) {
				let e = r.point[c];
				e.position.setFromMatrixPosition(p.matrixWorld), e.position.applyMatrix4(f), c++;
			} else if (p.isHemisphereLight) {
				let e = r.hemi[d];
				e.direction.setFromMatrixPosition(p.matrixWorld), e.direction.transformDirection(f), d++;
			}
		}
	}
	return {
		setup: s,
		setupView: c,
		state: r
	};
}
function Dl(e) {
	let t = new El(e), n = [], r = [], i = [];
	function a(e) {
		d.camera = e, n.length = 0, r.length = 0, i.length = 0;
	}
	function o(e) {
		n.push(e);
	}
	function s(e) {
		r.push(e);
	}
	function c(e) {
		i.push(e);
	}
	function l() {
		t.setup(n);
	}
	function u(e) {
		t.setupView(n, e);
	}
	let d = {
		lightsArray: n,
		shadowsArray: r,
		lightProbeGridArray: i,
		camera: null,
		lights: t,
		transmissionRenderTarget: {},
		textureUnits: 0
	};
	return {
		init: a,
		state: d,
		setupLights: l,
		setupLightsView: u,
		pushLight: o,
		pushShadow: s,
		pushLightProbeGrid: c
	};
}
function Ol(e) {
	let t = /* @__PURE__ */ new WeakMap();
	function n(n, r = 0) {
		let i = t.get(n), a;
		return i === void 0 ? (a = new Dl(e), t.set(n, [a])) : r >= i.length ? (a = new Dl(e), i.push(a)) : a = i[r], a;
	}
	function r() {
		t = /* @__PURE__ */ new WeakMap();
	}
	return {
		get: n,
		dispose: r
	};
}
var kl = "void main() {\n	gl_Position = vec4( position, 1.0 );\n}", Al = "uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\nvoid main() {\n	const float samples = float( VSM_SAMPLES );\n	float mean = 0.0;\n	float squared_mean = 0.0;\n	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );\n	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;\n	for ( float i = 0.0; i < samples; i ++ ) {\n		float uvOffset = uvStart + i * uvStride;\n		#ifdef HORIZONTAL_PASS\n			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;\n			mean += distribution.x;\n			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n		#else\n			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;\n			mean += depth;\n			squared_mean += depth * depth;\n		#endif\n	}\n	mean = mean / samples;\n	squared_mean = squared_mean / samples;\n	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );\n	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );\n}", jl = [
	/*@__PURE__*/ new W(1, 0, 0),
	/*@__PURE__*/ new W(-1, 0, 0),
	/*@__PURE__*/ new W(0, 1, 0),
	/*@__PURE__*/ new W(0, -1, 0),
	/*@__PURE__*/ new W(0, 0, 1),
	/*@__PURE__*/ new W(0, 0, -1)
], Ml = [
	/*@__PURE__*/ new W(0, -1, 0),
	/*@__PURE__*/ new W(0, -1, 0),
	/*@__PURE__*/ new W(0, 0, 1),
	/*@__PURE__*/ new W(0, 0, -1),
	/*@__PURE__*/ new W(0, -1, 0),
	/*@__PURE__*/ new W(0, -1, 0)
], Nl = /*@__PURE__*/ new Le(), Pl = /*@__PURE__*/ new W(), Fl = /*@__PURE__*/ new W();
function Il(e, t, n) {
	let a = new _r(), o = new U(), s = new U(), d = new Me(), f = new va(), p = new ya(), m = {}, g = n.maxTextureSize, _ = {
		0: 1,
		1: 0,
		2: 2
	}, v = new ma({
		defines: { VSM_SAMPLES: 8 },
		uniforms: {
			shadow_pass: { value: null },
			resolution: { value: new U() },
			radius: { value: 4 }
		},
		vertexShader: kl,
		fragmentShader: Al
	}), b = v.clone();
	b.defines.HORIZONTAL_PASS = 1;
	let x = new pn();
	x.setAttribute("position", new Qt(new Float32Array([
		-1,
		-1,
		.5,
		3,
		-1,
		.5,
		-1,
		3,
		.5
	]), 3));
	let S = new X(x, v), C = this;
	this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1;
	let w = this.type;
	this.render = function(t, n, f) {
		if (C.enabled === !1 || C.autoUpdate === !1 && C.needsUpdate === !1 || t.length === 0) return;
		this.type === 2 && (z("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."), this.type = 1);
		let p = e.getRenderTarget(), m = e.getActiveCubeFace(), _ = e.getActiveMipmapLevel(), v = e.state;
		v.setBlending(0), v.buffers.depth.getReversed() === !0 ? v.buffers.color.setClear(0, 0, 0, 0) : v.buffers.color.setClear(1, 1, 1, 1), v.buffers.depth.setTest(!0), v.setScissorTest(!1);
		let b = w !== this.type;
		b && n.traverse(function(e) {
			e.material && (Array.isArray(e.material) ? e.material.forEach((e) => e.needsUpdate = !0) : e.material.needsUpdate = !0);
		});
		for (let p = 0, m = t.length; p < m; p++) {
			let m = t[p], _ = m.shadow;
			if (_ === void 0) {
				z("WebGLShadowMap:", m, "has no shadow.");
				continue;
			}
			if (_.autoUpdate === !1 && _.needsUpdate === !1) continue;
			o.copy(_.mapSize);
			let x = _.getFrameExtents();
			o.multiply(x), s.copy(_.mapSize), (o.x > g || o.y > g) && (o.x > g && (s.x = Math.floor(g / x.x), o.x = s.x * x.x, _.mapSize.x = s.x), o.y > g && (s.y = Math.floor(g / x.y), o.y = s.y * x.y, _.mapSize.y = s.y));
			let S = e.state.buffers.depth.getReversed();
			if (_.camera._reversedDepth = S, _.map === null || b === !0) {
				if (_.map !== null && (_.map.depthTexture !== null && (_.map.depthTexture.dispose(), _.map.depthTexture = null), _.map.dispose()), this.type === 3) {
					if (m.isPointLight) {
						z("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");
						continue;
					}
					_.map = new Pe(o.x, o.y, {
						format: y,
						type: u,
						minFilter: i,
						magFilter: i,
						generateMipmaps: !1
					}), _.map.texture.name = m.name + ".shadowMap", _.map.depthTexture = new Or(o.x, o.y, l), _.map.depthTexture.name = m.name + ".shadowMapDepth", _.map.depthTexture.format = h, _.map.depthTexture.compareFunction = null, _.map.depthTexture.minFilter = r, _.map.depthTexture.magFilter = r;
				} else m.isPointLight ? (_.map = new ps(o.x), _.map.depthTexture = new kr(o.x, c)) : (_.map = new Pe(o.x, o.y), _.map.depthTexture = new Or(o.x, o.y, c)), _.map.depthTexture.name = m.name + ".shadowMap", _.map.depthTexture.format = h, this.type === 1 ? (_.map.depthTexture.compareFunction = S ? 518 : 515, _.map.depthTexture.minFilter = i, _.map.depthTexture.magFilter = i) : (_.map.depthTexture.compareFunction = null, _.map.depthTexture.minFilter = r, _.map.depthTexture.magFilter = r);
				_.camera.updateProjectionMatrix();
			}
			_.map.isWebGLCubeRenderTarget !== !0 && (_.map.width !== o.x || _.map.height !== o.y) && _.map.setSize(o.x, o.y);
			let C = _.map.isWebGLCubeRenderTarget ? 6 : _.getViewportCount();
			m.isPointLight !== !0 && _.updateMatrices(m, f);
			for (let t = 0; t < C; t++) {
				let r = _.getCamera(t);
				if (m.isPointLight) {
					let e = _.camera, n = _.matrix, r = m.distance || e.far;
					r !== e.far && (e.far = r, e.updateProjectionMatrix()), Pl.setFromMatrixPosition(m.matrixWorld), e.position.copy(Pl), Fl.copy(e.position), Fl.add(jl[t]), e.up.copy(Ml[t]), e.lookAt(Fl), e.updateMatrixWorld(), n.makeTranslation(-Pl.x, -Pl.y, -Pl.z), Nl.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), _._frustum.setFromProjectionMatrix(Nl, e.coordinateSystem, e.reversedDepth);
				}
				if (_.map.isWebGLCubeRenderTarget) e.setRenderTarget(_.map, t), e.clear();
				else {
					t === 0 && (e.setRenderTarget(_.map), e.clear());
					let n = _.getViewport(t);
					d.set(s.x * n.x, s.y * n.y, s.x * n.z, s.y * n.w), v.viewport(d);
				}
				a = _.getFrustum(t), D(n, f, r, m, this.type);
			}
			_.isPointLightShadow !== !0 && this.type === 3 && T(_, f), _.needsUpdate = !1;
		}
		w = this.type, C.needsUpdate = !1, e.setRenderTarget(p, m, _);
	};
	function T(n, r) {
		let i = t.update(S);
		v.defines.VSM_SAMPLES !== n.blurSamples && (v.defines.VSM_SAMPLES = n.blurSamples, b.defines.VSM_SAMPLES = n.blurSamples, v.needsUpdate = !0, b.needsUpdate = !0), n.mapPass === null ? n.mapPass = new Pe(o.x, o.y, {
			format: y,
			type: u
		}) : (n.mapPass.width !== n.map.width || n.mapPass.height !== n.map.height) && n.mapPass.setSize(n.map.width, n.map.height), v.uniforms.shadow_pass.value = n.map.depthTexture, v.uniforms.resolution.value.set(n.map.width, n.map.height), v.uniforms.radius.value = n.radius, e.setRenderTarget(n.mapPass), e.clear(), e.renderBufferDirect(r, null, i, v, S, null), b.uniforms.shadow_pass.value = n.mapPass.texture, b.uniforms.resolution.value.set(n.map.width, n.map.height), b.uniforms.radius.value = n.radius, e.setRenderTarget(n.map), e.clear(), e.renderBufferDirect(r, null, i, b, S, null);
	}
	function E(t, n, r, i) {
		let a = null, o = r.isPointLight === !0 ? t.customDistanceMaterial : t.customDepthMaterial;
		if (o !== void 0) a = o;
		else if (a = r.isPointLight === !0 ? p : f, e.localClippingEnabled && n.clipShadows === !0 && Array.isArray(n.clippingPlanes) && n.clippingPlanes.length !== 0 || n.displacementMap && n.displacementScale !== 0 || n.alphaMap && n.alphaTest > 0 || n.map && n.alphaTest > 0 || n.alphaToCoverage === !0) {
			let e = a.uuid, t = n.uuid, r = m[e];
			r === void 0 && (r = {}, m[e] = r);
			let i = r[t];
			i === void 0 && (i = a.clone(), r[t] = i, n.addEventListener("dispose", O)), a = i;
		}
		if (a.visible = n.visible, a.wireframe = n.wireframe, i === 3 ? a.side = n.shadowSide === null ? n.side : n.shadowSide : a.side = n.shadowSide === null ? _[n.side] : n.shadowSide, a.alphaMap = n.alphaMap, a.alphaTest = n.alphaToCoverage === !0 ? .5 : n.alphaTest, a.map = n.map, a.clipShadows = n.clipShadows, a.clippingPlanes = n.clippingPlanes, a.clipIntersection = n.clipIntersection, a.displacementMap = n.displacementMap, a.displacementScale = n.displacementScale, a.displacementBias = n.displacementBias, a.wireframeLinewidth = n.wireframeLinewidth, a.linewidth = n.linewidth, r.isPointLight === !0 && a.isMeshDistanceMaterial === !0) {
			let t = e.properties.get(a);
			t.light = r;
		}
		return a;
	}
	function D(n, r, i, o, s) {
		if (n.visible === !1) return;
		if (n.layers.test(r.layers) && (n.isMesh || n.isLine || n.isPoints) && (n.castShadow || n.receiveShadow && s === 3) && (!n.frustumCulled || n.intersectsFrustum(a))) {
			n.modelViewMatrix.multiplyMatrices(i.matrixWorldInverse, n.matrixWorld);
			let a = t.update(n), c = n.material;
			if (Array.isArray(c)) {
				let t = a.groups;
				for (let l = 0, u = t.length; l < u; l++) {
					let u = t[l], d = c[u.materialIndex];
					if (d && d.visible) {
						let t = E(n, d, o, s);
						n.onBeforeShadow(e, n, r, i, a, t, u), e.renderBufferDirect(i, null, a, t, n, u), n.onAfterShadow(e, n, r, i, a, t, u);
					}
				}
			} else if (c.visible) {
				let t = E(n, c, o, s);
				n.onBeforeShadow(e, n, r, i, a, t, null), e.renderBufferDirect(i, null, a, t, n, null), n.onAfterShadow(e, n, r, i, a, t, null);
			}
		}
		let c = n.children;
		for (let e = 0, t = c.length; e < t; e++) D(c[e], r, i, o, s);
	}
	function O(e) {
		e.target.removeEventListener("dispose", O);
		for (let t in m) {
			let n = m[t], r = e.target.uuid;
			r in n && (n[r].dispose(), delete n[r]);
		}
	}
}
function Ll(e, t) {
	function n() {
		let t = !1, n = new Me(), r = null, i = new Me(0, 0, 0, 0);
		return {
			setMask: function(n) {
				r !== n && !t && (e.colorMask(n, n, n, n), r = n);
			},
			setLocked: function(e) {
				t = e;
			},
			setClear: function(t, r, a, o, s) {
				s === !0 && (t *= o, r *= o, a *= o), n.set(t, r, a, o), i.equals(n) === !1 && (e.clearColor(t, r, a, o), i.copy(n));
			},
			reset: function() {
				t = !1, r = null, i.set(-1, 0, 0, 0);
			}
		};
	}
	function r() {
		let n = !1, r = !1, i = null, a = null, o = null;
		return {
			setReversed: function(e) {
				if (r !== e) {
					let n = t.get("EXT_clip_control");
					e ? n.clipControlEXT(n.LOWER_LEFT_EXT, n.ZERO_TO_ONE_EXT) : n.clipControlEXT(n.LOWER_LEFT_EXT, n.NEGATIVE_ONE_TO_ONE_EXT), r = e;
					let i = o;
					o = null, this.setClear(i);
				}
			},
			getReversed: function() {
				return r;
			},
			setTest: function(t) {
				t ? V(e.DEPTH_TEST) : ie(e.DEPTH_TEST);
			},
			setMask: function(t) {
				i !== t && !n && (e.depthMask(t), i = t);
			},
			setFunc: function(t) {
				if (r && (t = ae[t]), a !== t) {
					switch (t) {
						case 0:
							e.depthFunc(e.NEVER);
							break;
						case 1:
							e.depthFunc(e.ALWAYS);
							break;
						case 2:
							e.depthFunc(e.LESS);
							break;
						case 3:
							e.depthFunc(e.LEQUAL);
							break;
						case 4:
							e.depthFunc(e.EQUAL);
							break;
						case 5:
							e.depthFunc(e.GEQUAL);
							break;
						case 6:
							e.depthFunc(e.GREATER);
							break;
						case 7:
							e.depthFunc(e.NOTEQUAL);
							break;
						default: e.depthFunc(e.LEQUAL);
					}
					a = t;
				}
			},
			setLocked: function(e) {
				n = e;
			},
			setClear: function(t) {
				o !== t && (o = t, r && (t = 1 - t), e.clearDepth(t));
			},
			reset: function() {
				n = !1, i = null, a = null, o = null, r = !1;
			}
		};
	}
	function i() {
		let t = !1, n = null, r = null, i = null, a = null, o = null, s = null, c = null, l = null;
		return {
			setTest: function(n) {
				t || (n ? V(e.STENCIL_TEST) : ie(e.STENCIL_TEST));
			},
			setMask: function(r) {
				n !== r && !t && (e.stencilMask(r), n = r);
			},
			setFunc: function(t, n, o) {
				(r !== t || i !== n || a !== o) && (e.stencilFunc(t, n, o), r = t, i = n, a = o);
			},
			setOp: function(t, n, r) {
				(o !== t || s !== n || c !== r) && (e.stencilOp(t, n, r), o = t, s = n, c = r);
			},
			setLocked: function(e) {
				t = e;
			},
			setClear: function(t) {
				l !== t && (e.clearStencil(t), l = t);
			},
			reset: function() {
				t = !1, n = null, r = null, i = null, a = null, o = null, s = null, c = null, l = null;
			}
		};
	}
	let a = new n(), o = new r(), s = new i(), c = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap(), u = {}, d = {}, f = {}, p = /* @__PURE__ */ new WeakMap(), m = [], h = null, g = !1, _ = null, v = null, y = null, b = null, x = null, S = null, C = null, w = new J(0, 0, 0), T = 0, E = !1, D = null, O = null, k = null, A = null, j = null, M = e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS), N = !1, P = 0, F = e.getParameter(e.VERSION);
	F.indexOf("WebGL") === -1 ? F.indexOf("OpenGL ES") !== -1 && (P = parseFloat(/^OpenGL ES (\d)/.exec(F)[1]), N = P >= 2) : (P = parseFloat(/^WebGL (\d)/.exec(F)[1]), N = P >= 1);
	let I = null, ee = {}, L = e.getParameter(e.SCISSOR_BOX), te = e.getParameter(e.VIEWPORT), ne = new Me().fromArray(L), re = new Me().fromArray(te);
	function R(t, n, r, i) {
		let a = /* @__PURE__ */ new Uint8Array(4), o = e.createTexture();
		e.bindTexture(t, o), e.texParameteri(t, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(t, e.TEXTURE_MAG_FILTER, e.NEAREST);
		for (let o = 0; o < r; o++) t === e.TEXTURE_3D || t === e.TEXTURE_2D_ARRAY ? e.texImage3D(n, 0, e.RGBA, 1, 1, i, 0, e.RGBA, e.UNSIGNED_BYTE, a) : e.texImage2D(n + o, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, a);
		return o;
	}
	let z = {};
	z[e.TEXTURE_2D] = R(e.TEXTURE_2D, e.TEXTURE_2D, 1), z[e.TEXTURE_CUBE_MAP] = R(e.TEXTURE_CUBE_MAP, e.TEXTURE_CUBE_MAP_POSITIVE_X, 6), z[e.TEXTURE_2D_ARRAY] = R(e.TEXTURE_2D_ARRAY, e.TEXTURE_2D_ARRAY, 1, 1), z[e.TEXTURE_3D] = R(e.TEXTURE_3D, e.TEXTURE_3D, 1, 1), a.setClear(0, 0, 0, 1), o.setClear(1), s.setClear(0), V(e.DEPTH_TEST), o.setFunc(3), fe(!1), pe(1), V(e.CULL_FACE), H(0);
	function V(t) {
		u[t] !== !0 && (e.enable(t), u[t] = !0);
	}
	function ie(t) {
		u[t] !== !1 && (e.disable(t), u[t] = !1);
	}
	function oe(t, n) {
		return f[t] !== n && (e.bindFramebuffer(t, n), f[t] = n, t === e.DRAW_FRAMEBUFFER && (f[e.FRAMEBUFFER] = n), t === e.FRAMEBUFFER && (f[e.DRAW_FRAMEBUFFER] = n), !0);
	}
	function se(t, n) {
		let r = m, i = !1;
		if (t) {
			r = p.get(n), r === void 0 && (r = [], p.set(n, r));
			let a = t.textures;
			if (r.length !== a.length || r[0] !== e.COLOR_ATTACHMENT0) {
				for (let t = 0, n = a.length; t < n; t++) r[t] = e.COLOR_ATTACHMENT0 + t;
				r.length = a.length, i = !0;
			}
		} else r[0] !== e.BACK && (r[0] = e.BACK, i = !0);
		i && e.drawBuffers(r);
	}
	function ce(t) {
		return h !== t && (e.useProgram(t), h = t, !0);
	}
	let le = {
		100: e.FUNC_ADD,
		101: e.FUNC_SUBTRACT,
		102: e.FUNC_REVERSE_SUBTRACT
	};
	le[103] = e.MIN, le[104] = e.MAX;
	let ue = {
		200: e.ZERO,
		201: e.ONE,
		202: e.SRC_COLOR,
		204: e.SRC_ALPHA,
		210: e.SRC_ALPHA_SATURATE,
		208: e.DST_COLOR,
		206: e.DST_ALPHA,
		203: e.ONE_MINUS_SRC_COLOR,
		205: e.ONE_MINUS_SRC_ALPHA,
		209: e.ONE_MINUS_DST_COLOR,
		207: e.ONE_MINUS_DST_ALPHA,
		211: e.CONSTANT_COLOR,
		212: e.ONE_MINUS_CONSTANT_COLOR,
		213: e.CONSTANT_ALPHA,
		214: e.ONE_MINUS_CONSTANT_ALPHA
	};
	function H(t, n, r, i, a, o, s, c, l, u) {
		if (t === 0) {
			g === !0 && (ie(e.BLEND), g = !1);
			return;
		}
		if (g === !1 && (V(e.BLEND), g = !0), t !== 5) {
			if (t !== _ || u !== E) {
				if ((v !== 100 || x !== 100) && (e.blendEquation(e.FUNC_ADD), v = 100, x = 100), u) switch (t) {
					case 1:
						e.blendFuncSeparate(e.ONE, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
						break;
					case 2:
						e.blendFunc(e.ONE, e.ONE);
						break;
					case 3:
						e.blendFuncSeparate(e.ZERO, e.ONE_MINUS_SRC_COLOR, e.ZERO, e.ONE);
						break;
					case 4:
						e.blendFuncSeparate(e.DST_COLOR, e.ONE_MINUS_SRC_ALPHA, e.ZERO, e.ONE);
						break;
					default: B("WebGLState: Invalid blending: ", t);
				}
				else switch (t) {
					case 1:
						e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
						break;
					case 2:
						e.blendFuncSeparate(e.SRC_ALPHA, e.ONE, e.ONE, e.ONE);
						break;
					case 3:
						B("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");
						break;
					case 4:
						B("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");
						break;
					default: B("WebGLState: Invalid blending: ", t);
				}
				y = null, b = null, S = null, C = null, w.set(0, 0, 0), T = 0, _ = t, E = u;
			}
			return;
		}
		a ||= n, o ||= r, s ||= i, (n !== v || a !== x) && (e.blendEquationSeparate(le[n], le[a]), v = n, x = a), (r !== y || i !== b || o !== S || s !== C) && (e.blendFuncSeparate(ue[r], ue[i], ue[o], ue[s]), y = r, b = i, S = o, C = s), (c.equals(w) === !1 || l !== T) && (e.blendColor(c.r, c.g, c.b, l), w.copy(c), T = l), _ = t, E = !1;
	}
	function de(t, n) {
		t.side === 2 ? ie(e.CULL_FACE) : V(e.CULL_FACE);
		let r = t.side === 1;
		n && (r = !r), fe(r), t.blending === 1 && t.transparent === !1 ? H(0) : H(t.blending, t.blendEquation, t.blendSrc, t.blendDst, t.blendEquationAlpha, t.blendSrcAlpha, t.blendDstAlpha, t.blendColor, t.blendAlpha, t.premultipliedAlpha), o.setFunc(t.depthFunc), o.setTest(t.depthTest), o.setMask(t.depthWrite), a.setMask(t.colorWrite);
		let i = t.stencilWrite;
		s.setTest(i), i && (s.setMask(t.stencilWriteMask), s.setFunc(t.stencilFunc, t.stencilRef, t.stencilFuncMask), s.setOp(t.stencilFail, t.stencilZFail, t.stencilZPass)), U(t.polygonOffset, t.polygonOffsetFactor, t.polygonOffsetUnits), t.alphaToCoverage === !0 ? V(e.SAMPLE_ALPHA_TO_COVERAGE) : ie(e.SAMPLE_ALPHA_TO_COVERAGE);
	}
	function fe(t) {
		D !== t && (t ? e.frontFace(e.CW) : e.frontFace(e.CCW), D = t);
	}
	function pe(t) {
		t === 0 ? ie(e.CULL_FACE) : (V(e.CULL_FACE), t !== O && (t === 1 ? e.cullFace(e.BACK) : t === 2 ? e.cullFace(e.FRONT) : e.cullFace(e.FRONT_AND_BACK))), O = t;
	}
	function me(t) {
		t !== k && (N && e.lineWidth(t), k = t);
	}
	function U(t, n, r) {
		t ? (V(e.POLYGON_OFFSET_FILL), (A !== n || j !== r) && (A = n, j = r, o.getReversed() && (n = -n), e.polygonOffset(n, r))) : ie(e.POLYGON_OFFSET_FILL);
	}
	function he(t) {
		t ? V(e.SCISSOR_TEST) : ie(e.SCISSOR_TEST);
	}
	function W(t) {
		t === void 0 && (t = e.TEXTURE0 + M - 1), I !== t && (e.activeTexture(t), I = t);
	}
	function ge(t, n, r) {
		r === void 0 && (r = I === null ? e.TEXTURE0 + M - 1 : I);
		let i = ee[r];
		i === void 0 && (i = {
			type: void 0,
			texture: void 0
		}, ee[r] = i), (i.type !== t || i.texture !== n) && (I !== r && (e.activeTexture(r), I = r), e.bindTexture(t, n || z[t]), i.type = t, i.texture = n);
	}
	function _e() {
		let t = ee[I];
		t !== void 0 && t.type !== void 0 && (e.bindTexture(t.type, null), t.type = void 0, t.texture = void 0);
	}
	function G() {
		try {
			e.compressedTexImage2D(...arguments);
		} catch (e) {
			B("WebGLState:", e);
		}
	}
	function ve() {
		try {
			e.compressedTexImage3D(...arguments);
		} catch (e) {
			B("WebGLState:", e);
		}
	}
	function ye() {
		try {
			e.texSubImage2D(...arguments);
		} catch (e) {
			B("WebGLState:", e);
		}
	}
	function be() {
		try {
			e.texSubImage3D(...arguments);
		} catch (e) {
			B("WebGLState:", e);
		}
	}
	function xe() {
		try {
			e.compressedTexSubImage2D(...arguments);
		} catch (e) {
			B("WebGLState:", e);
		}
	}
	function Se() {
		try {
			e.compressedTexSubImage3D(...arguments);
		} catch (e) {
			B("WebGLState:", e);
		}
	}
	function Ce() {
		try {
			e.texStorage2D(...arguments);
		} catch (e) {
			B("WebGLState:", e);
		}
	}
	function we() {
		try {
			e.texStorage3D(...arguments);
		} catch (e) {
			B("WebGLState:", e);
		}
	}
	function Te() {
		try {
			e.texImage2D(...arguments);
		} catch (e) {
			B("WebGLState:", e);
		}
	}
	function Ee() {
		try {
			e.texImage3D(...arguments);
		} catch (e) {
			B("WebGLState:", e);
		}
	}
	function De(t) {
		return d[t] === void 0 ? e.getParameter(t) : d[t];
	}
	function Oe(t, n) {
		d[t] !== n && (e.pixelStorei(t, n), d[t] = n);
	}
	function ke(t) {
		ne.equals(t) === !1 && (e.scissor(t.x, t.y, t.z, t.w), ne.copy(t));
	}
	function Ae(t) {
		re.equals(t) === !1 && (e.viewport(t.x, t.y, t.z, t.w), re.copy(t));
	}
	function je(t, n) {
		let r = l.get(n);
		r === void 0 && (r = /* @__PURE__ */ new WeakMap(), l.set(n, r));
		let i = r.get(t);
		i === void 0 && (i = e.getUniformBlockIndex(n, t.name), r.set(t, i));
	}
	function K(t, n) {
		let r = l.get(n).get(t);
		c.get(n) !== r && (e.uniformBlockBinding(n, r, t.__bindingPointIndex), c.set(n, r));
	}
	function Ne() {
		e.disable(e.BLEND), e.disable(e.CULL_FACE), e.disable(e.DEPTH_TEST), e.disable(e.POLYGON_OFFSET_FILL), e.disable(e.SCISSOR_TEST), e.disable(e.STENCIL_TEST), e.disable(e.SAMPLE_ALPHA_TO_COVERAGE), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ONE, e.ZERO), e.blendFuncSeparate(e.ONE, e.ZERO, e.ONE, e.ZERO), e.blendColor(0, 0, 0, 0), e.colorMask(!0, !0, !0, !0), e.clearColor(0, 0, 0, 0), e.depthMask(!0), e.depthFunc(e.LESS), o.setReversed(!1), e.clearDepth(1), e.stencilMask(4294967295), e.stencilFunc(e.ALWAYS, 0, 4294967295), e.stencilOp(e.KEEP, e.KEEP, e.KEEP), e.clearStencil(0), e.cullFace(e.BACK), e.frontFace(e.CCW), e.polygonOffset(0, 0), e.activeTexture(e.TEXTURE0), e.bindFramebuffer(e.FRAMEBUFFER, null), e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), e.bindFramebuffer(e.READ_FRAMEBUFFER, null), e.useProgram(null), e.lineWidth(1), e.scissor(0, 0, e.canvas.width, e.canvas.height), e.viewport(0, 0, e.canvas.width, e.canvas.height), e.pixelStorei(e.PACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !1), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, e.BROWSER_DEFAULT_WEBGL), e.pixelStorei(e.PACK_ROW_LENGTH, 0), e.pixelStorei(e.PACK_SKIP_PIXELS, 0), e.pixelStorei(e.PACK_SKIP_ROWS, 0), e.pixelStorei(e.UNPACK_ROW_LENGTH, 0), e.pixelStorei(e.UNPACK_IMAGE_HEIGHT, 0), e.pixelStorei(e.UNPACK_SKIP_PIXELS, 0), e.pixelStorei(e.UNPACK_SKIP_ROWS, 0), e.pixelStorei(e.UNPACK_SKIP_IMAGES, 0), u = {}, d = {}, I = null, ee = {}, f = {}, p = /* @__PURE__ */ new WeakMap(), m = [], h = null, g = !1, _ = null, v = null, y = null, b = null, x = null, S = null, C = null, w = new J(0, 0, 0), T = 0, E = !1, D = null, O = null, k = null, A = null, j = null, ne.set(0, 0, e.canvas.width, e.canvas.height), re.set(0, 0, e.canvas.width, e.canvas.height), a.reset(), o.reset(), s.reset();
	}
	return {
		buffers: {
			color: a,
			depth: o,
			stencil: s
		},
		enable: V,
		disable: ie,
		bindFramebuffer: oe,
		drawBuffers: se,
		useProgram: ce,
		setBlending: H,
		setMaterial: de,
		setFlipSided: fe,
		setCullFace: pe,
		setLineWidth: me,
		setPolygonOffset: U,
		setScissorTest: he,
		activeTexture: W,
		bindTexture: ge,
		unbindTexture: _e,
		compressedTexImage2D: G,
		compressedTexImage3D: ve,
		texImage2D: Te,
		texImage3D: Ee,
		pixelStorei: Oe,
		getParameter: De,
		updateUBOMapping: je,
		uniformBlockBinding: K,
		texStorage2D: Ce,
		texStorage3D: we,
		texSubImage2D: ye,
		texSubImage3D: be,
		compressedTexSubImage2D: xe,
		compressedTexSubImage3D: Se,
		scissor: ke,
		viewport: Ae,
		reset: Ne
	};
}
function Rl(o, s, c, l, u, d, f) {
	let p = s.has("WEBGL_multisampled_render_to_texture") ? s.get("WEBGL_multisampled_render_to_texture") : null, m = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), h = new U(), _ = /* @__PURE__ */ new WeakMap(), v = /* @__PURE__ */ new Set(), y, b = /* @__PURE__ */ new WeakMap(), x = !1;
	try {
		x = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
	} catch {}
	function S(e, t) {
		return x ? new OffscreenCanvas(e, t) : L("canvas");
	}
	function C(e, t, n) {
		let r = 1, i = Oe(e);
		if ((i.width > n || i.height > n) && (r = n / Math.max(i.width, i.height)), r < 1) {
			if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap || typeof VideoFrame < "u" && e instanceof VideoFrame) {
				let n = Math.floor(r * i.width), a = Math.floor(r * i.height);
				y === void 0 && (y = S(n, a));
				let o = t ? S(n, a) : y;
				return o.width = n, o.height = a, o.getContext("2d").drawImage(e, 0, 0, n, a), z("WebGLRenderer: Texture has been resized from (" + i.width + "x" + i.height + ") to (" + n + "x" + a + ")."), o;
			}
			return "data" in e && z("WebGLRenderer: Image in DataTexture is too big (" + i.width + "x" + i.height + ")."), e;
		}
		return e;
	}
	function w(e) {
		return e.generateMipmaps;
	}
	function T(e) {
		o.generateMipmap(e);
	}
	function E(e) {
		return e.isWebGLCubeRenderTarget ? o.TEXTURE_CUBE_MAP : e.isWebGL3DRenderTarget ? o.TEXTURE_3D : e.isWebGLArrayRenderTarget || e.isCompressedArrayTexture ? o.TEXTURE_2D_ARRAY : o.TEXTURE_2D;
	}
	function D(e, t, n, r, i, a = !1) {
		if (e !== null) {
			if (o[e] !== void 0) return o[e];
			z("WebGLRenderer: Attempt to use non-existing WebGL internal format '" + e + "'");
		}
		let c;
		r && (c = s.get("EXT_texture_norm16"), c || z("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));
		let l = t;
		if (t === o.RED && (n === o.FLOAT && (l = o.R32F), n === o.HALF_FLOAT && (l = o.R16F), n === o.UNSIGNED_BYTE && (l = o.R8), n === o.UNSIGNED_SHORT && c && (l = c.R16_EXT), n === o.SHORT && c && (l = c.R16_SNORM_EXT)), t === o.RED_INTEGER && (n === o.UNSIGNED_BYTE && (l = o.R8UI), n === o.UNSIGNED_SHORT && (l = o.R16UI), n === o.UNSIGNED_INT && (l = o.R32UI), n === o.BYTE && (l = o.R8I), n === o.SHORT && (l = o.R16I), n === o.INT && (l = o.R32I)), t === o.RG && (n === o.FLOAT && (l = o.RG32F), n === o.HALF_FLOAT && (l = o.RG16F), n === o.UNSIGNED_BYTE && (l = o.RG8), n === o.UNSIGNED_SHORT && c && (l = c.RG16_EXT), n === o.SHORT && c && (l = c.RG16_SNORM_EXT)), t === o.RG_INTEGER && (n === o.UNSIGNED_BYTE && (l = o.RG8UI), n === o.UNSIGNED_SHORT && (l = o.RG16UI), n === o.UNSIGNED_INT && (l = o.RG32UI), n === o.BYTE && (l = o.RG8I), n === o.SHORT && (l = o.RG16I), n === o.INT && (l = o.RG32I)), t === o.RGB_INTEGER && (n === o.UNSIGNED_BYTE && (l = o.RGB8UI), n === o.UNSIGNED_SHORT && (l = o.RGB16UI), n === o.UNSIGNED_INT && (l = o.RGB32UI), n === o.BYTE && (l = o.RGB8I), n === o.SHORT && (l = o.RGB16I), n === o.INT && (l = o.RGB32I)), t === o.RGBA_INTEGER && (n === o.UNSIGNED_BYTE && (l = o.RGBA8UI), n === o.UNSIGNED_SHORT && (l = o.RGBA16UI), n === o.UNSIGNED_INT && (l = o.RGBA32UI), n === o.BYTE && (l = o.RGBA8I), n === o.SHORT && (l = o.RGBA16I), n === o.INT && (l = o.RGBA32I)), t === o.RGB && (n === o.UNSIGNED_SHORT && c && (l = c.RGB16_EXT), n === o.SHORT && c && (l = c.RGB16_SNORM_EXT), n === o.UNSIGNED_INT_5_9_9_9_REV && (l = o.RGB9_E5), n === o.UNSIGNED_INT_10F_11F_11F_REV && (l = o.R11F_G11F_B10F)), t === o.RGBA) {
			let e = a ? j : Se.getTransfer(i);
			n === o.FLOAT && (l = o.RGBA32F), n === o.HALF_FLOAT && (l = o.RGBA16F), n === o.UNSIGNED_BYTE && (l = e === "srgb" ? o.SRGB8_ALPHA8 : o.RGBA8), n === o.UNSIGNED_SHORT && c && (l = c.RGBA16_EXT), n === o.SHORT && c && (l = c.RGBA16_SNORM_EXT), n === o.UNSIGNED_SHORT_4_4_4_4 && (l = o.RGBA4), n === o.UNSIGNED_SHORT_5_5_5_1 && (l = o.RGB5_A1);
		}
		return (l === o.R16F || l === o.R32F || l === o.RG16F || l === o.RG32F || l === o.RGBA16F || l === o.RGBA32F) && s.get("EXT_color_buffer_float"), l;
	}
	function O(e, t) {
		let n;
		return e ? t === null || t === 1014 || t === 1020 ? n = o.DEPTH24_STENCIL8 : t === 1015 ? n = o.DEPTH32F_STENCIL8 : t === 1012 && (n = o.DEPTH24_STENCIL8, z("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : t === null || t === 1014 || t === 1020 ? n = o.DEPTH_COMPONENT24 : t === 1015 ? n = o.DEPTH_COMPONENT32F : t === 1012 && (n = o.DEPTH_COMPONENT16), n;
	}
	function k(e, t) {
		return w(e) === !0 || e.isFramebufferTexture && e.minFilter !== 1003 && e.minFilter !== 1006 ? Math.log2(Math.max(t.width, t.height)) + 1 : e.mipmaps !== void 0 && e.mipmaps.length > 0 ? e.mipmaps.length : e.isCompressedTexture && Array.isArray(e.image) ? t.mipmaps.length : 1;
	}
	function A(e) {
		let t = e.target;
		t.removeEventListener("dispose", A), N(t), t.isVideoTexture && _.delete(t), t.isHTMLTexture && v.delete(t);
	}
	function M(e) {
		let t = e.target;
		t.removeEventListener("dispose", M), F(t);
	}
	function N(e) {
		let t = l.get(e);
		if (t.__webglInit === void 0) return;
		let n = e.source, r = b.get(n);
		if (r) {
			let i = r[t.__cacheKey];
			i.usedTimes--, i.usedTimes === 0 && P(e), Object.keys(r).length === 0 && b.delete(n);
		}
		l.remove(e);
	}
	function P(e) {
		let t = l.get(e);
		o.deleteTexture(t.__webglTexture);
		let n = e.source, r = b.get(n);
		delete r[t.__cacheKey], f.memory.textures--;
	}
	function F(e) {
		let t = l.get(e);
		if (e.depthTexture && (e.depthTexture.dispose(), l.remove(e.depthTexture)), e.isWebGLCubeRenderTarget) for (let e = 0; e < 6; e++) {
			if (Array.isArray(t.__webglFramebuffer[e])) for (let n = 0; n < t.__webglFramebuffer[e].length; n++) o.deleteFramebuffer(t.__webglFramebuffer[e][n]);
			else o.deleteFramebuffer(t.__webglFramebuffer[e]);
			t.__webglDepthbuffer && o.deleteRenderbuffer(t.__webglDepthbuffer[e]);
		}
		else {
			if (Array.isArray(t.__webglFramebuffer)) for (let e = 0; e < t.__webglFramebuffer.length; e++) o.deleteFramebuffer(t.__webglFramebuffer[e]);
			else o.deleteFramebuffer(t.__webglFramebuffer);
			if (t.__webglDepthbuffer && o.deleteRenderbuffer(t.__webglDepthbuffer), t.__webglMultisampledFramebuffer && o.deleteFramebuffer(t.__webglMultisampledFramebuffer), t.__webglColorRenderbuffer) for (let e = 0; e < t.__webglColorRenderbuffer.length; e++) t.__webglColorRenderbuffer[e] && o.deleteRenderbuffer(t.__webglColorRenderbuffer[e]);
			t.__webglDepthRenderbuffer && o.deleteRenderbuffer(t.__webglDepthRenderbuffer);
		}
		let n = e.textures;
		for (let e = 0, t = n.length; e < t; e++) {
			let t = l.get(n[e]);
			t.__webglTexture && (o.deleteTexture(t.__webglTexture), f.memory.textures--), l.remove(n[e]);
		}
		l.remove(e);
	}
	let I = 0;
	function ee() {
		I = 0;
	}
	function te() {
		return I;
	}
	function ne(e) {
		I = e;
	}
	function re() {
		let e = I;
		return e >= u.maxTextures && z("WebGLTextures: Trying to use " + (e + 1) + " texture units while this GPU supports only " + u.maxTextures), I += 1, e;
	}
	function R(e) {
		let t = [];
		return t.push(e.wrapS), t.push(e.wrapT), t.push(e.wrapR || 0), t.push(e.magFilter), t.push(e.minFilter), t.push(e.anisotropy), t.push(e.internalFormat), t.push(e.format), t.push(e.type), t.push(e.generateMipmaps), t.push(e.premultiplyAlpha), t.push(e.flipY), t.push(e.unpackAlignment), t.push(e.colorSpace), t.join();
	}
	function V(e, t) {
		let n = l.get(e);
		if (e.isVideoTexture && Ee(e), e.isRenderTargetTexture === !1 && e.isExternalTexture !== !0 && e.version > 0 && n.__version !== e.version) {
			let r = e.image;
			if (r === null) z("WebGLRenderer: Texture marked for update but no image data found.");
			else if (r.complete === !1) z("WebGLRenderer: Texture marked for update but image is incomplete");
			else {
				pe(n, e, t);
				return;
			}
		} else e.isExternalTexture && (n.__webglTexture = e.sourceTexture ? e.sourceTexture : null);
		c.bindTexture(o.TEXTURE_2D, n.__webglTexture, o.TEXTURE0 + t);
	}
	function ie(e, t) {
		let n = l.get(e);
		if (e.isRenderTargetTexture === !1 && e.version > 0 && n.__version !== e.version) {
			pe(n, e, t);
			return;
		}
		e.isExternalTexture && (n.__webglTexture = e.sourceTexture ? e.sourceTexture : null), c.bindTexture(o.TEXTURE_2D_ARRAY, n.__webglTexture, o.TEXTURE0 + t);
	}
	function ae(e, t) {
		let n = l.get(e);
		if (e.isRenderTargetTexture === !1 && e.version > 0 && n.__version !== e.version) {
			pe(n, e, t);
			return;
		}
		c.bindTexture(o.TEXTURE_3D, n.__webglTexture, o.TEXTURE0 + t);
	}
	function oe(e, t) {
		let n = l.get(e);
		if (e.isCubeDepthTexture !== !0 && e.version > 0 && n.__version !== e.version) {
			me(n, e, t);
			return;
		}
		c.bindTexture(o.TEXTURE_CUBE_MAP, n.__webglTexture, o.TEXTURE0 + t);
	}
	let se = {
		[e]: o.REPEAT,
		[t]: o.CLAMP_TO_EDGE,
		[n]: o.MIRRORED_REPEAT
	}, ce = {
		[r]: o.NEAREST,
		1004: o.NEAREST_MIPMAP_NEAREST,
		1005: o.NEAREST_MIPMAP_LINEAR,
		[i]: o.LINEAR,
		1007: o.LINEAR_MIPMAP_NEAREST,
		[a]: o.LINEAR_MIPMAP_LINEAR
	}, le = {
		512: o.NEVER,
		519: o.ALWAYS,
		513: o.LESS,
		515: o.LEQUAL,
		514: o.EQUAL,
		518: o.GEQUAL,
		516: o.GREATER,
		517: o.NOTEQUAL
	};
	function ue(e, t) {
		if (t.type === 1015 && s.has("OES_texture_float_linear") === !1 && (t.magFilter === 1006 || t.magFilter === 1007 || t.magFilter === 1005 || t.magFilter === 1008 || t.minFilter === 1006 || t.minFilter === 1007 || t.minFilter === 1005 || t.minFilter === 1008) && z("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), o.texParameteri(e, o.TEXTURE_WRAP_S, se[t.wrapS]), o.texParameteri(e, o.TEXTURE_WRAP_T, se[t.wrapT]), (e === o.TEXTURE_3D || e === o.TEXTURE_2D_ARRAY) && o.texParameteri(e, o.TEXTURE_WRAP_R, se[t.wrapR]), o.texParameteri(e, o.TEXTURE_MAG_FILTER, ce[t.magFilter]), o.texParameteri(e, o.TEXTURE_MIN_FILTER, ce[t.minFilter]), t.compareFunction && (o.texParameteri(e, o.TEXTURE_COMPARE_MODE, o.COMPARE_REF_TO_TEXTURE), o.texParameteri(e, o.TEXTURE_COMPARE_FUNC, le[t.compareFunction])), s.has("EXT_texture_filter_anisotropic") === !0) {
			if (t.magFilter === 1003 || t.minFilter !== 1005 && t.minFilter !== 1008 || t.type === 1015 && s.has("OES_texture_float_linear") === !1) return;
			if (t.anisotropy > 1 || l.get(t).__currentAnisotropy) {
				let n = s.get("EXT_texture_filter_anisotropic");
				o.texParameterf(e, n.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(t.anisotropy, u.getMaxAnisotropy())), l.get(t).__currentAnisotropy = t.anisotropy;
			}
		}
	}
	function H(e, t) {
		let n = !1;
		e.__webglInit === void 0 && (e.__webglInit = !0, t.addEventListener("dispose", A));
		let r = t.source, i = b.get(r);
		i === void 0 && (i = {}, b.set(r, i));
		let a = R(t);
		if (a !== e.__cacheKey) {
			i[a] === void 0 && (i[a] = {
				texture: o.createTexture(),
				usedTimes: 0
			}, f.memory.textures++, n = !0), i[a].usedTimes++;
			let r = i[e.__cacheKey];
			r !== void 0 && (i[e.__cacheKey].usedTimes--, r.usedTimes === 0 && P(t)), e.__cacheKey = a, e.__webglTexture = i[a].texture;
		}
		return n;
	}
	function de(e, t, n) {
		return Math.floor(Math.floor(e / n) / t);
	}
	function fe(e, t, n, r) {
		let i = e.updateRanges;
		if (i.length === 0) c.texSubImage2D(o.TEXTURE_2D, 0, 0, 0, t.width, t.height, n, r, t.data);
		else {
			i.sort((e, t) => e.start - t.start);
			let a = 0;
			for (let e = 1; e < i.length; e++) {
				let n = i[a], r = i[e], o = n.start + n.count, s = de(r.start, t.width, 4), c = de(n.start, t.width, 4);
				r.start <= o + 1 && s === c && de(r.start + r.count - 1, t.width, 4) === s ? n.count = Math.max(n.count, r.start + r.count - n.start) : (++a, i[a] = r);
			}
			i.length = a + 1;
			let s = c.getParameter(o.UNPACK_ROW_LENGTH), l = c.getParameter(o.UNPACK_SKIP_PIXELS), u = c.getParameter(o.UNPACK_SKIP_ROWS);
			c.pixelStorei(o.UNPACK_ROW_LENGTH, t.width);
			for (let e = 0, a = i.length; e < a; e++) {
				let a = i[e], s = Math.floor(a.start / 4), l = Math.ceil(a.count / 4), u = s % t.width, d = Math.floor(s / t.width), f = l;
				c.pixelStorei(o.UNPACK_SKIP_PIXELS, u), c.pixelStorei(o.UNPACK_SKIP_ROWS, d), c.texSubImage2D(o.TEXTURE_2D, 0, u, d, f, 1, n, r, t.data);
			}
			e.clearUpdateRanges(), c.pixelStorei(o.UNPACK_ROW_LENGTH, s), c.pixelStorei(o.UNPACK_SKIP_PIXELS, l), c.pixelStorei(o.UNPACK_SKIP_ROWS, u);
		}
	}
	function pe(e, t, n) {
		let r = o.TEXTURE_2D;
		(t.isDataArrayTexture || t.isCompressedArrayTexture) && (r = o.TEXTURE_2D_ARRAY), t.isData3DTexture && (r = o.TEXTURE_3D);
		let i = H(e, t), a = t.source;
		c.bindTexture(r, e.__webglTexture, o.TEXTURE0 + n);
		let s = l.get(a);
		if (a.version !== s.__version || i === !0) {
			if (c.activeTexture(o.TEXTURE0 + n), !(typeof ImageBitmap < "u" && t.image instanceof ImageBitmap)) {
				let e = Se.getPrimaries(Se.workingColorSpace), n = t.colorSpace === "" ? null : Se.getPrimaries(t.colorSpace), r = t.colorSpace === "" || e === n ? o.NONE : o.BROWSER_DEFAULT_WEBGL;
				c.pixelStorei(o.UNPACK_FLIP_Y_WEBGL, t.flipY), c.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.premultiplyAlpha), c.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL, r);
			}
			c.pixelStorei(o.UNPACK_ALIGNMENT, t.unpackAlignment);
			let e = C(t.image, !1, u.maxTextureSize);
			e = De(t, e);
			let l = d.convert(t.format, t.colorSpace), f = d.convert(t.type), p = D(t.internalFormat, l, f, t.normalized, t.colorSpace, t.isVideoTexture);
			ue(r, t);
			let m, h = t.mipmaps, _ = t.isVideoTexture !== !0, y = s.__version === void 0 || i === !0, b = a.dataReady, x = k(t, e);
			if (t.isDepthTexture) p = O(t.format === g, t.type), y && (_ ? c.texStorage2D(o.TEXTURE_2D, 1, p, e.width, e.height) : c.texImage2D(o.TEXTURE_2D, 0, p, e.width, e.height, 0, l, f, null));
			else if (t.isDataTexture) {
				if (h.length > 0) {
					_ && y && c.texStorage2D(o.TEXTURE_2D, x, p, h[0].width, h[0].height);
					for (let e = 0, t = h.length; e < t; e++) m = h[e], _ ? b && c.texSubImage2D(o.TEXTURE_2D, e, 0, 0, m.width, m.height, l, f, m.data) : c.texImage2D(o.TEXTURE_2D, e, p, m.width, m.height, 0, l, f, m.data);
					t.generateMipmaps = !1;
				} else _ ? (y && c.texStorage2D(o.TEXTURE_2D, x, p, e.width, e.height), b && fe(t, e, l, f)) : c.texImage2D(o.TEXTURE_2D, 0, p, e.width, e.height, 0, l, f, e.data);
			} else if (t.isCompressedTexture) {
				if (t.isCompressedArrayTexture) {
					_ && y && c.texStorage3D(o.TEXTURE_2D_ARRAY, x, p, h[0].width, h[0].height, e.depth);
					for (let n = 0, r = h.length; n < r; n++) if (m = h[n], t.format !== 1023) {
						if (l !== null) {
							if (_) {
								if (b) {
									if (t.layerUpdates.size > 0) {
										let e = Mo(m.width, m.height, t.format, t.type);
										for (let r of t.layerUpdates) {
											let t = m.data.subarray(r * e / m.data.BYTES_PER_ELEMENT, (r + 1) * e / m.data.BYTES_PER_ELEMENT);
											c.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY, n, 0, 0, r, m.width, m.height, 1, l, t);
										}
									} else c.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY, n, 0, 0, 0, m.width, m.height, e.depth, l, m.data);
								}
							} else c.compressedTexImage3D(o.TEXTURE_2D_ARRAY, n, p, m.width, m.height, e.depth, 0, m.data, 0, 0);
						} else z("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
					} else _ ? b && c.texSubImage3D(o.TEXTURE_2D_ARRAY, n, 0, 0, 0, m.width, m.height, e.depth, l, f, m.data) : c.texImage3D(o.TEXTURE_2D_ARRAY, n, p, m.width, m.height, e.depth, 0, l, f, m.data);
					t.layerUpdates.size > 0 && t.clearLayerUpdates();
				} else {
					_ && y && c.texStorage2D(o.TEXTURE_2D, x, p, h[0].width, h[0].height);
					for (let e = 0, n = h.length; e < n; e++) m = h[e], t.format === 1023 ? _ ? b && c.texSubImage2D(o.TEXTURE_2D, e, 0, 0, m.width, m.height, l, f, m.data) : c.texImage2D(o.TEXTURE_2D, e, p, m.width, m.height, 0, l, f, m.data) : l === null ? z("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : _ ? b && c.compressedTexSubImage2D(o.TEXTURE_2D, e, 0, 0, m.width, m.height, l, m.data) : c.compressedTexImage2D(o.TEXTURE_2D, e, p, m.width, m.height, 0, m.data);
				}
			} else if (t.isDataArrayTexture) {
				if (_) {
					if (y && c.texStorage3D(o.TEXTURE_2D_ARRAY, x, p, e.width, e.height, e.depth), b) {
						if (t.layerUpdates.size > 0) {
							let n = Mo(e.width, e.height, t.format, t.type);
							for (let r of t.layerUpdates) {
								let t = e.data.subarray(r * n / e.data.BYTES_PER_ELEMENT, (r + 1) * n / e.data.BYTES_PER_ELEMENT);
								c.texSubImage3D(o.TEXTURE_2D_ARRAY, 0, 0, 0, r, e.width, e.height, 1, l, f, t);
							}
							t.clearLayerUpdates();
						} else c.texSubImage3D(o.TEXTURE_2D_ARRAY, 0, 0, 0, 0, e.width, e.height, e.depth, l, f, e.data);
					}
				} else c.texImage3D(o.TEXTURE_2D_ARRAY, 0, p, e.width, e.height, e.depth, 0, l, f, e.data);
			} else if (t.isData3DTexture) _ ? (y && c.texStorage3D(o.TEXTURE_3D, x, p, e.width, e.height, e.depth), b && c.texSubImage3D(o.TEXTURE_3D, 0, 0, 0, 0, e.width, e.height, e.depth, l, f, e.data)) : c.texImage3D(o.TEXTURE_3D, 0, p, e.width, e.height, e.depth, 0, l, f, e.data);
			else if (t.isFramebufferTexture) {
				if (y) {
					if (_) c.texStorage2D(o.TEXTURE_2D, x, p, e.width, e.height);
					else {
						let t = e.width, n = e.height;
						for (let e = 0; e < x; e++) c.texImage2D(o.TEXTURE_2D, e, p, t, n, 0, l, f, null), t >>= 1, n >>= 1;
					}
				}
			} else if (t.isHTMLTexture) {
				if ("texElementImage2D" in o) {
					let n = o.canvas;
					if (n.hasAttribute("layoutsubtree") || n.setAttribute("layoutsubtree", "true"), e.parentNode !== n) {
						n.appendChild(e), v.add(t), n.onpaint = (e) => {
							let t = e.changedElements;
							for (let e of v) t.includes(e.image) && (e.needsUpdate = !0);
						}, n.requestPaint();
						return;
					}
					if (o.texElementImage2D.length === 3) o.texElementImage2D(o.TEXTURE_2D, o.RGBA8, e);
					else {
						let t = o.RGBA, n = o.RGBA, r = o.UNSIGNED_BYTE;
						o.texElementImage2D(o.TEXTURE_2D, 0, t, n, r, e);
					}
					o.texParameteri(o.TEXTURE_2D, o.TEXTURE_MIN_FILTER, o.LINEAR), o.texParameteri(o.TEXTURE_2D, o.TEXTURE_WRAP_S, o.CLAMP_TO_EDGE), o.texParameteri(o.TEXTURE_2D, o.TEXTURE_WRAP_T, o.CLAMP_TO_EDGE);
				}
			} else if (h.length > 0) {
				if (_ && y) {
					let e = Oe(h[0]);
					c.texStorage2D(o.TEXTURE_2D, x, p, e.width, e.height);
				}
				for (let e = 0, t = h.length; e < t; e++) m = h[e], _ ? b && c.texSubImage2D(o.TEXTURE_2D, e, 0, 0, l, f, m) : c.texImage2D(o.TEXTURE_2D, e, p, l, f, m);
				t.generateMipmaps = !1;
			} else if (_) {
				if (y) {
					let t = Oe(e);
					c.texStorage2D(o.TEXTURE_2D, x, p, t.width, t.height);
				}
				b && c.texSubImage2D(o.TEXTURE_2D, 0, 0, 0, l, f, e);
			} else c.texImage2D(o.TEXTURE_2D, 0, p, l, f, e);
			w(t) && T(r), s.__version = a.version, t.onUpdate && t.onUpdate(t);
		}
		e.__version = t.version;
	}
	function me(e, t, n) {
		if (t.image.length !== 6) return;
		let r = H(e, t), i = t.source;
		c.bindTexture(o.TEXTURE_CUBE_MAP, e.__webglTexture, o.TEXTURE0 + n);
		let a = l.get(i);
		if (i.version !== a.__version || r === !0) {
			c.activeTexture(o.TEXTURE0 + n);
			let e = Se.getPrimaries(Se.workingColorSpace), s = t.colorSpace === "" ? null : Se.getPrimaries(t.colorSpace), l = t.colorSpace === "" || e === s ? o.NONE : o.BROWSER_DEFAULT_WEBGL;
			c.pixelStorei(o.UNPACK_FLIP_Y_WEBGL, t.flipY), c.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.premultiplyAlpha), c.pixelStorei(o.UNPACK_ALIGNMENT, t.unpackAlignment), c.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL, l);
			let f = t.isCompressedTexture || t.image[0].isCompressedTexture, p = t.image[0] && t.image[0].isDataTexture, m = [];
			for (let e = 0; e < 6; e++) !f && !p ? m[e] = C(t.image[e], !0, u.maxCubemapSize) : m[e] = p ? t.image[e].image : t.image[e], m[e] = De(t, m[e]);
			let h = m[0], g = d.convert(t.format, t.colorSpace), _ = d.convert(t.type), v = D(t.internalFormat, g, _, t.normalized, t.colorSpace), y = t.isVideoTexture !== !0, b = a.__version === void 0 || r === !0, x = i.dataReady, S = k(t, h);
			ue(o.TEXTURE_CUBE_MAP, t);
			let E;
			if (f) {
				y && b && c.texStorage2D(o.TEXTURE_CUBE_MAP, S, v, h.width, h.height);
				for (let e = 0; e < 6; e++) {
					E = m[e].mipmaps;
					for (let n = 0; n < E.length; n++) {
						let r = E[n];
						t.format === 1023 ? y ? x && c.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + e, n, 0, 0, r.width, r.height, g, _, r.data) : c.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + e, n, v, r.width, r.height, 0, g, _, r.data) : g === null ? z("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : y ? x && c.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + e, n, 0, 0, r.width, r.height, g, r.data) : c.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + e, n, v, r.width, r.height, 0, r.data);
					}
				}
			} else {
				if (E = t.mipmaps, y && b) {
					E.length > 0 && S++;
					let e = Oe(m[0]);
					c.texStorage2D(o.TEXTURE_CUBE_MAP, S, v, e.width, e.height);
				}
				for (let e = 0; e < 6; e++) if (p) {
					y ? x && c.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + e, 0, 0, 0, m[e].width, m[e].height, g, _, m[e].data) : c.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + e, 0, v, m[e].width, m[e].height, 0, g, _, m[e].data);
					for (let t = 0; t < E.length; t++) {
						let n = E[t].image[e].image;
						y ? x && c.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + e, t + 1, 0, 0, n.width, n.height, g, _, n.data) : c.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + e, t + 1, v, n.width, n.height, 0, g, _, n.data);
					}
				} else {
					y ? x && c.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + e, 0, 0, 0, g, _, m[e]) : c.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + e, 0, v, g, _, m[e]);
					for (let t = 0; t < E.length; t++) {
						let n = E[t];
						y ? x && c.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + e, t + 1, 0, 0, g, _, n.image[e]) : c.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + e, t + 1, v, g, _, n.image[e]);
					}
				}
			}
			w(t) && T(o.TEXTURE_CUBE_MAP), a.__version = i.version, t.onUpdate && t.onUpdate(t);
		}
		e.__version = t.version;
	}
	function he(e, t, n, r, i, a) {
		let s = d.convert(n.format, n.colorSpace), u = d.convert(n.type), f = D(n.internalFormat, s, u, n.normalized, n.colorSpace), m = l.get(t), h = l.get(n);
		if (h.__renderTarget = t, !m.__hasExternalTextures) {
			let e = Math.max(1, t.width >> a), n = Math.max(1, t.height >> a);
			i === o.TEXTURE_3D || i === o.TEXTURE_2D_ARRAY ? c.texImage3D(i, a, f, e, n, t.depth, 0, s, u, null) : c.texImage2D(i, a, f, e, n, 0, s, u, null);
		}
		c.bindFramebuffer(o.FRAMEBUFFER, e), Te(t) ? p.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER, r, i, h.__webglTexture, 0, we(t)) : (i === o.TEXTURE_2D || i >= o.TEXTURE_CUBE_MAP_POSITIVE_X && i <= o.TEXTURE_CUBE_MAP_NEGATIVE_Z) && o.framebufferTexture2D(o.FRAMEBUFFER, r, i, h.__webglTexture, a), c.bindFramebuffer(o.FRAMEBUFFER, null);
	}
	function W(e, t, n) {
		if (o.bindRenderbuffer(o.RENDERBUFFER, e), t.depthBuffer) {
			let r = t.depthTexture, i = r && r.isDepthTexture ? r.type : null, a = O(t.stencilBuffer, i), s = t.stencilBuffer ? o.DEPTH_STENCIL_ATTACHMENT : o.DEPTH_ATTACHMENT;
			Te(t) ? p.renderbufferStorageMultisampleEXT(o.RENDERBUFFER, we(t), a, t.width, t.height) : n ? o.renderbufferStorageMultisample(o.RENDERBUFFER, we(t), a, t.width, t.height) : o.renderbufferStorage(o.RENDERBUFFER, a, t.width, t.height), o.framebufferRenderbuffer(o.FRAMEBUFFER, s, o.RENDERBUFFER, e);
		} else {
			let e = t.textures;
			for (let r = 0; r < e.length; r++) {
				let i = e[r], a = d.convert(i.format, i.colorSpace), s = d.convert(i.type), c = D(i.internalFormat, a, s, i.normalized, i.colorSpace);
				Te(t) ? p.renderbufferStorageMultisampleEXT(o.RENDERBUFFER, we(t), c, t.width, t.height) : n ? o.renderbufferStorageMultisample(o.RENDERBUFFER, we(t), c, t.width, t.height) : o.renderbufferStorage(o.RENDERBUFFER, c, t.width, t.height);
			}
		}
		o.bindRenderbuffer(o.RENDERBUFFER, null);
	}
	function ge(e, t, n) {
		let r = t.isWebGLCubeRenderTarget === !0;
		if (c.bindFramebuffer(o.FRAMEBUFFER, e), !(t.depthTexture && t.depthTexture.isDepthTexture)) throw Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");
		let i = l.get(t.depthTexture);
		if (i.__renderTarget = t, (!i.__webglTexture || t.depthTexture.image.width !== t.width || t.depthTexture.image.height !== t.height) && (t.depthTexture.image.width = t.width, t.depthTexture.image.height = t.height, t.depthTexture.needsUpdate = !0), r) {
			if (i.__webglInit === void 0 && (i.__webglInit = !0, t.depthTexture.addEventListener("dispose", A)), i.__webglTexture === void 0) {
				i.__webglTexture = o.createTexture(), c.bindTexture(o.TEXTURE_CUBE_MAP, i.__webglTexture), ue(o.TEXTURE_CUBE_MAP, t.depthTexture);
				let e = d.convert(t.depthTexture.format), n = d.convert(t.depthTexture.type), r;
				t.depthTexture.format === 1026 ? r = o.DEPTH_COMPONENT24 : t.depthTexture.format === 1027 && (r = o.DEPTH24_STENCIL8);
				for (let i = 0; i < 6; i++) o.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, r, t.width, t.height, 0, e, n, null);
			}
		} else V(t.depthTexture, 0);
		let a = i.__webglTexture, s = we(t), u = r ? o.TEXTURE_CUBE_MAP_POSITIVE_X + n : o.TEXTURE_2D, f = t.depthTexture.format === 1027 ? o.DEPTH_STENCIL_ATTACHMENT : o.DEPTH_ATTACHMENT;
		if (t.depthTexture.format === 1026) Te(t) ? p.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER, f, u, a, 0, s) : o.framebufferTexture2D(o.FRAMEBUFFER, f, u, a, 0);
		else if (t.depthTexture.format === 1027) Te(t) ? p.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER, f, u, a, 0, s) : o.framebufferTexture2D(o.FRAMEBUFFER, f, u, a, 0);
		else throw Error("THREE.WebGLTextures: Unknown depthTexture format.");
	}
	function _e(e) {
		let t = l.get(e), n = e.isWebGLCubeRenderTarget === !0;
		if (t.__boundDepthTexture !== e.depthTexture) {
			let n = e.depthTexture;
			if (t.__depthDisposeCallback && t.__depthDisposeCallback(), n) {
				let e = () => {
					delete t.__boundDepthTexture, delete t.__depthDisposeCallback, n.removeEventListener("dispose", e);
				};
				n.addEventListener("dispose", e), t.__depthDisposeCallback = e;
			}
			t.__boundDepthTexture = n;
		}
		if (e.depthTexture && !t.__autoAllocateDepthBuffer) {
			if (n) for (let n = 0; n < 6; n++) ge(t.__webglFramebuffer[n], e, n);
			else {
				let n = e.texture.mipmaps;
				n && n.length > 0 ? ge(t.__webglFramebuffer[0], e, 0) : ge(t.__webglFramebuffer, e, 0);
			}
		} else if (n) {
			t.__webglDepthbuffer = [];
			for (let n = 0; n < 6; n++) if (c.bindFramebuffer(o.FRAMEBUFFER, t.__webglFramebuffer[n]), t.__webglDepthbuffer[n] === void 0) t.__webglDepthbuffer[n] = o.createRenderbuffer(), W(t.__webglDepthbuffer[n], e, !1);
			else {
				let r = e.stencilBuffer ? o.DEPTH_STENCIL_ATTACHMENT : o.DEPTH_ATTACHMENT, i = t.__webglDepthbuffer[n];
				o.bindRenderbuffer(o.RENDERBUFFER, i), o.framebufferRenderbuffer(o.FRAMEBUFFER, r, o.RENDERBUFFER, i);
			}
		} else {
			let n = e.texture.mipmaps;
			if (n && n.length > 0 ? c.bindFramebuffer(o.FRAMEBUFFER, t.__webglFramebuffer[0]) : c.bindFramebuffer(o.FRAMEBUFFER, t.__webglFramebuffer), t.__webglDepthbuffer === void 0) t.__webglDepthbuffer = o.createRenderbuffer(), W(t.__webglDepthbuffer, e, !1);
			else {
				let n = e.stencilBuffer ? o.DEPTH_STENCIL_ATTACHMENT : o.DEPTH_ATTACHMENT, r = t.__webglDepthbuffer;
				o.bindRenderbuffer(o.RENDERBUFFER, r), o.framebufferRenderbuffer(o.FRAMEBUFFER, n, o.RENDERBUFFER, r);
			}
		}
		c.bindFramebuffer(o.FRAMEBUFFER, null);
	}
	function G(e, t, n) {
		let r = l.get(e);
		t !== void 0 && he(r.__webglFramebuffer, e, e.texture, o.COLOR_ATTACHMENT0, o.TEXTURE_2D, 0), n !== void 0 && _e(e);
	}
	function ve(e) {
		let t = e.texture, n = l.get(e), r = l.get(t);
		e.addEventListener("dispose", M);
		let i = e.textures, a = e.isWebGLCubeRenderTarget === !0, s = i.length > 1;
		if (s || (r.__webglTexture === void 0 && (r.__webglTexture = o.createTexture()), r.__version = t.version, f.memory.textures++), a) {
			n.__webglFramebuffer = [];
			for (let e = 0; e < 6; e++) if (t.mipmaps && t.mipmaps.length > 0) {
				n.__webglFramebuffer[e] = [];
				for (let r = 0; r < t.mipmaps.length; r++) n.__webglFramebuffer[e][r] = o.createFramebuffer();
			} else n.__webglFramebuffer[e] = o.createFramebuffer();
		} else {
			if (t.mipmaps && t.mipmaps.length > 0) {
				n.__webglFramebuffer = [];
				for (let e = 0; e < t.mipmaps.length; e++) n.__webglFramebuffer[e] = o.createFramebuffer();
			} else n.__webglFramebuffer = o.createFramebuffer();
			if (s) for (let e = 0, t = i.length; e < t; e++) {
				let t = l.get(i[e]);
				t.__webglTexture === void 0 && (t.__webglTexture = o.createTexture(), f.memory.textures++);
			}
			if (e.samples > 0 && Te(e) === !1) {
				n.__webglMultisampledFramebuffer = o.createFramebuffer(), n.__webglColorRenderbuffer = [], c.bindFramebuffer(o.FRAMEBUFFER, n.__webglMultisampledFramebuffer);
				for (let t = 0; t < i.length; t++) {
					let r = i[t];
					n.__webglColorRenderbuffer[t] = o.createRenderbuffer(), o.bindRenderbuffer(o.RENDERBUFFER, n.__webglColorRenderbuffer[t]);
					let a = d.convert(r.format, r.colorSpace), s = d.convert(r.type), c = D(r.internalFormat, a, s, r.normalized, r.colorSpace, e.isXRRenderTarget === !0), l = we(e);
					o.renderbufferStorageMultisample(o.RENDERBUFFER, l, c, e.width, e.height), o.framebufferRenderbuffer(o.FRAMEBUFFER, o.COLOR_ATTACHMENT0 + t, o.RENDERBUFFER, n.__webglColorRenderbuffer[t]);
				}
				o.bindRenderbuffer(o.RENDERBUFFER, null), e.depthBuffer && (n.__webglDepthRenderbuffer = o.createRenderbuffer(), W(n.__webglDepthRenderbuffer, e, !0)), c.bindFramebuffer(o.FRAMEBUFFER, null);
			}
		}
		if (a) {
			c.bindTexture(o.TEXTURE_CUBE_MAP, r.__webglTexture), ue(o.TEXTURE_CUBE_MAP, t);
			for (let r = 0; r < 6; r++) if (t.mipmaps && t.mipmaps.length > 0) for (let i = 0; i < t.mipmaps.length; i++) he(n.__webglFramebuffer[r][i], e, t, o.COLOR_ATTACHMENT0, o.TEXTURE_CUBE_MAP_POSITIVE_X + r, i);
			else he(n.__webglFramebuffer[r], e, t, o.COLOR_ATTACHMENT0, o.TEXTURE_CUBE_MAP_POSITIVE_X + r, 0);
			w(t) && T(o.TEXTURE_CUBE_MAP), c.unbindTexture();
		} else if (s) {
			for (let t = 0, r = i.length; t < r; t++) {
				let r = i[t], a = l.get(r), s = o.TEXTURE_2D;
				(e.isWebGL3DRenderTarget || e.isWebGLArrayRenderTarget) && (s = e.isWebGL3DRenderTarget ? o.TEXTURE_3D : o.TEXTURE_2D_ARRAY), c.bindTexture(s, a.__webglTexture), ue(s, r), he(n.__webglFramebuffer, e, r, o.COLOR_ATTACHMENT0 + t, s, 0), w(r) && T(s);
			}
			c.unbindTexture();
		} else {
			let i = o.TEXTURE_2D;
			if ((e.isWebGL3DRenderTarget || e.isWebGLArrayRenderTarget) && (i = e.isWebGL3DRenderTarget ? o.TEXTURE_3D : o.TEXTURE_2D_ARRAY), c.bindTexture(i, r.__webglTexture), ue(i, t), t.mipmaps && t.mipmaps.length > 0) for (let r = 0; r < t.mipmaps.length; r++) he(n.__webglFramebuffer[r], e, t, o.COLOR_ATTACHMENT0, i, r);
			else he(n.__webglFramebuffer, e, t, o.COLOR_ATTACHMENT0, i, 0);
			w(t) && T(i), c.unbindTexture();
		}
		e.depthBuffer && _e(e);
	}
	function ye(e) {
		let t = e.textures;
		for (let n = 0, r = t.length; n < r; n++) {
			let r = t[n];
			if (w(r)) {
				let t = E(e), n = l.get(r).__webglTexture;
				c.bindTexture(t, n), T(t), c.unbindTexture();
			}
		}
	}
	let be = [], xe = [];
	function Ce(e) {
		if (e.samples > 0) {
			if (Te(e) === !1) {
				let t = e.textures, n = e.width, r = e.height, i = o.COLOR_BUFFER_BIT, a = e.stencilBuffer ? o.DEPTH_STENCIL_ATTACHMENT : o.DEPTH_ATTACHMENT, s = l.get(e), u = t.length > 1;
				if (u) for (let e = 0; e < t.length; e++) c.bindFramebuffer(o.FRAMEBUFFER, s.__webglMultisampledFramebuffer), o.framebufferRenderbuffer(o.FRAMEBUFFER, o.COLOR_ATTACHMENT0 + e, o.RENDERBUFFER, null), c.bindFramebuffer(o.FRAMEBUFFER, s.__webglFramebuffer), o.framebufferTexture2D(o.DRAW_FRAMEBUFFER, o.COLOR_ATTACHMENT0 + e, o.TEXTURE_2D, null, 0);
				c.bindFramebuffer(o.READ_FRAMEBUFFER, s.__webglMultisampledFramebuffer);
				let d = e.texture.mipmaps;
				d && d.length > 0 ? c.bindFramebuffer(o.DRAW_FRAMEBUFFER, s.__webglFramebuffer[0]) : c.bindFramebuffer(o.DRAW_FRAMEBUFFER, s.__webglFramebuffer);
				for (let c = 0; c < t.length; c++) {
					if (e.resolveDepthBuffer && (e.depthBuffer && (i |= o.DEPTH_BUFFER_BIT), e.stencilBuffer && e.resolveStencilBuffer && (i |= o.STENCIL_BUFFER_BIT)), u) {
						o.framebufferRenderbuffer(o.READ_FRAMEBUFFER, o.COLOR_ATTACHMENT0, o.RENDERBUFFER, s.__webglColorRenderbuffer[c]);
						let e = l.get(t[c]).__webglTexture;
						o.framebufferTexture2D(o.DRAW_FRAMEBUFFER, o.COLOR_ATTACHMENT0, o.TEXTURE_2D, e, 0);
					}
					o.blitFramebuffer(0, 0, n, r, 0, 0, n, r, i, o.NEAREST), m === !0 && (be.length = 0, xe.length = 0, be.push(o.COLOR_ATTACHMENT0 + c), e.depthBuffer && e.storeMultisampledDepthBuffer === !1 && (be.push(a), xe.push(a), o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER, xe)), o.invalidateFramebuffer(o.READ_FRAMEBUFFER, be));
				}
				if (c.bindFramebuffer(o.READ_FRAMEBUFFER, null), c.bindFramebuffer(o.DRAW_FRAMEBUFFER, null), u) for (let e = 0; e < t.length; e++) {
					c.bindFramebuffer(o.FRAMEBUFFER, s.__webglMultisampledFramebuffer), o.framebufferRenderbuffer(o.FRAMEBUFFER, o.COLOR_ATTACHMENT0 + e, o.RENDERBUFFER, s.__webglColorRenderbuffer[e]);
					let n = l.get(t[e]).__webglTexture;
					c.bindFramebuffer(o.FRAMEBUFFER, s.__webglFramebuffer), o.framebufferTexture2D(o.DRAW_FRAMEBUFFER, o.COLOR_ATTACHMENT0 + e, o.TEXTURE_2D, n, 0);
				}
				c.bindFramebuffer(o.DRAW_FRAMEBUFFER, s.__webglMultisampledFramebuffer);
			} else if (e.depthBuffer && e.storeMultisampledDepthBuffer === !1 && m) {
				let t = e.stencilBuffer ? o.DEPTH_STENCIL_ATTACHMENT : o.DEPTH_ATTACHMENT;
				o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER, [t]);
			}
		}
	}
	function we(e) {
		return Math.min(u.maxSamples, e.samples);
	}
	function Te(e) {
		let t = l.get(e);
		return e.samples > 0 && s.has("WEBGL_multisampled_render_to_texture") === !0 && t.__useRenderToTexture !== !1;
	}
	function Ee(e) {
		let t = f.render.frame;
		_.get(e) !== t && (_.set(e, t), e.update());
	}
	function De(e, t) {
		let n = e.colorSpace, r = e.format, i = e.type;
		return e.isCompressedTexture === !0 || e.isVideoTexture === !0 || n !== "srgb-linear" && n !== "" && (Se.getTransfer(n) === "srgb" ? (r !== 1023 || i !== 1009) && z("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : B("WebGLTextures: Unsupported texture color space:", n)), t;
	}
	function Oe(e) {
		return typeof HTMLImageElement < "u" && e instanceof HTMLImageElement ? (h.width = e.naturalWidth || e.width, h.height = e.naturalHeight || e.height) : typeof VideoFrame < "u" && e instanceof VideoFrame ? (h.width = e.displayWidth, h.height = e.displayHeight) : (h.width = e.width, h.height = e.height), h;
	}
	this.allocateTextureUnit = re, this.resetTextureUnits = ee, this.getTextureUnits = te, this.setTextureUnits = ne, this.setTexture2D = V, this.setTexture2DArray = ie, this.setTexture3D = ae, this.setTextureCube = oe, this.rebindTextures = G, this.setupRenderTarget = ve, this.updateRenderTargetMipmap = ye, this.updateMultisampleRenderTarget = Ce, this.setupDepthRenderbuffer = _e, this.setupFrameBufferTexture = he, this.useMultisampledRTT = Te, this.isReversedDepthBuffer = function() {
		return c.buffers.depth.getReversed();
	};
}
function zl(e, t) {
	function n(n, r = "") {
		let i, a = Se.getTransfer(r);
		if (n === 1009) return e.UNSIGNED_BYTE;
		if (n === 1017) return e.UNSIGNED_SHORT_4_4_4_4;
		if (n === 1018) return e.UNSIGNED_SHORT_5_5_5_1;
		if (n === 35902) return e.UNSIGNED_INT_5_9_9_9_REV;
		if (n === 35899) return e.UNSIGNED_INT_10F_11F_11F_REV;
		if (n === 1010) return e.BYTE;
		if (n === 1011) return e.SHORT;
		if (n === 1012) return e.UNSIGNED_SHORT;
		if (n === 1013) return e.INT;
		if (n === 1014) return e.UNSIGNED_INT;
		if (n === 1015) return e.FLOAT;
		if (n === 1016) return e.HALF_FLOAT;
		if (n === 1021) return e.ALPHA;
		if (n === 1022) return e.RGB;
		if (n === 1023) return e.RGBA;
		if (n === 1026) return e.DEPTH_COMPONENT;
		if (n === 1027) return e.DEPTH_STENCIL;
		if (n === 1028) return e.RED;
		if (n === 1029) return e.RED_INTEGER;
		if (n === 1030) return e.RG;
		if (n === 1031) return e.RG_INTEGER;
		if (n === 1033) return e.RGBA_INTEGER;
		if (n === 33776 || n === 33777 || n === 33778 || n === 33779) {
			if (a === "srgb") {
				if (i = t.get("WEBGL_compressed_texture_s3tc_srgb"), i !== null) {
					if (n === 33776) return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;
					if (n === 33777) return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
					if (n === 33778) return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
					if (n === 33779) return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
				} else return null;
			} else if (i = t.get("WEBGL_compressed_texture_s3tc"), i !== null) {
				if (n === 33776) return i.COMPRESSED_RGB_S3TC_DXT1_EXT;
				if (n === 33777) return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;
				if (n === 33778) return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;
				if (n === 33779) return i.COMPRESSED_RGBA_S3TC_DXT5_EXT;
			} else return null;
		}
		if (n === 35840 || n === 35841 || n === 35842 || n === 35843) {
			if (i = t.get("WEBGL_compressed_texture_pvrtc"), i !== null) {
				if (n === 35840) return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
				if (n === 35841) return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
				if (n === 35842) return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
				if (n === 35843) return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
			} else return null;
		}
		if (n === 36196 || n === 37492 || n === 37496 || n === 37488 || n === 37489 || n === 37490 || n === 37491) {
			if (i = t.get("WEBGL_compressed_texture_etc"), i !== null) {
				if (n === 36196 || n === 37492) return a === "srgb" ? i.COMPRESSED_SRGB8_ETC2 : i.COMPRESSED_RGB8_ETC2;
				if (n === 37496) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : i.COMPRESSED_RGBA8_ETC2_EAC;
				if (n === 37488) return i.COMPRESSED_R11_EAC;
				if (n === 37489) return i.COMPRESSED_SIGNED_R11_EAC;
				if (n === 37490) return i.COMPRESSED_RG11_EAC;
				if (n === 37491) return i.COMPRESSED_SIGNED_RG11_EAC;
			} else return null;
		}
		if (n === 37808 || n === 37809 || n === 37810 || n === 37811 || n === 37812 || n === 37813 || n === 37814 || n === 37815 || n === 37816 || n === 37817 || n === 37818 || n === 37819 || n === 37820 || n === 37821) {
			if (i = t.get("WEBGL_compressed_texture_astc"), i !== null) {
				if (n === 37808) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : i.COMPRESSED_RGBA_ASTC_4x4_KHR;
				if (n === 37809) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : i.COMPRESSED_RGBA_ASTC_5x4_KHR;
				if (n === 37810) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : i.COMPRESSED_RGBA_ASTC_5x5_KHR;
				if (n === 37811) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : i.COMPRESSED_RGBA_ASTC_6x5_KHR;
				if (n === 37812) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : i.COMPRESSED_RGBA_ASTC_6x6_KHR;
				if (n === 37813) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : i.COMPRESSED_RGBA_ASTC_8x5_KHR;
				if (n === 37814) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : i.COMPRESSED_RGBA_ASTC_8x6_KHR;
				if (n === 37815) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : i.COMPRESSED_RGBA_ASTC_8x8_KHR;
				if (n === 37816) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : i.COMPRESSED_RGBA_ASTC_10x5_KHR;
				if (n === 37817) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : i.COMPRESSED_RGBA_ASTC_10x6_KHR;
				if (n === 37818) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : i.COMPRESSED_RGBA_ASTC_10x8_KHR;
				if (n === 37819) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : i.COMPRESSED_RGBA_ASTC_10x10_KHR;
				if (n === 37820) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : i.COMPRESSED_RGBA_ASTC_12x10_KHR;
				if (n === 37821) return a === "srgb" ? i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : i.COMPRESSED_RGBA_ASTC_12x12_KHR;
			} else return null;
		}
		if (n === 36492 || n === 36494 || n === 36495) {
			if (i = t.get("EXT_texture_compression_bptc"), i !== null) {
				if (n === 36492) return a === "srgb" ? i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : i.COMPRESSED_RGBA_BPTC_UNORM_EXT;
				if (n === 36494) return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
				if (n === 36495) return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
			} else return null;
		}
		if (n === 36283 || n === 36284 || n === 36285 || n === 36286) {
			if (i = t.get("EXT_texture_compression_rgtc"), i !== null) {
				if (n === 36283) return i.COMPRESSED_RED_RGTC1_EXT;
				if (n === 36284) return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;
				if (n === 36285) return i.COMPRESSED_RED_GREEN_RGTC2_EXT;
				if (n === 36286) return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
			} else return null;
		}
		return n === 1020 ? e.UNSIGNED_INT_24_8 : e[n] === void 0 ? null : e[n];
	}
	return { convert: n };
}
var Bl = "\nvoid main() {\n\n	gl_Position = vec4( position, 1.0 );\n\n}", Vl = "\nuniform sampler2DArray depthColor;\nuniform float depthWidth;\nuniform float depthHeight;\n\nvoid main() {\n\n	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );\n\n	if ( coord.x >= 1.0 ) {\n\n		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;\n\n	} else {\n\n		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;\n\n	}\n\n}", Hl = class {
	constructor() {
		this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
	}
	init(e, t) {
		if (this.texture === null) {
			let n = new Ar(e.texture);
			(e.depthNear !== t.depthNear || e.depthFar !== t.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = n;
		}
	}
	getMesh(e) {
		if (this.texture !== null && this.mesh === null) {
			let t = e.cameras[0].viewport, n = new ma({
				vertexShader: Bl,
				fragmentShader: Vl,
				uniforms: {
					depthColor: { value: this.texture },
					depthWidth: { value: t.z },
					depthHeight: { value: t.w }
				}
			});
			this.mesh = new X(new ea(20, 20), n);
		}
		return this.mesh;
	}
	reset() {
		this.texture = null, this.mesh = null;
	}
	getDepthTexture() {
		return this.texture;
	}
}, Ul = class extends oe {
	constructor(e, t) {
		super();
		let n = this, r = null, i = 1, a = null, s = "local-floor", l = 1, u = null, d = null, f = null, _ = null, v = null, y = null, b = typeof XRWebGLBinding < "u", x = new Hl(), S = {}, C = t.getContextAttributes(), w = null, T = null, E = [], D = [], O = new U(), k = null, A = null, j = new ao();
		j.viewport = new Me();
		let M = new ao();
		M.viewport = new Me();
		let N = [j, M], P = new _o(), F = null, I = null;
		this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(e) {
			let t = E[e];
			return t === void 0 && (t = new ft(), E[e] = t), t.getTargetRaySpace();
		}, this.getControllerGrip = function(e) {
			let t = E[e];
			return t === void 0 && (t = new ft(), E[e] = t), t.getGripSpace();
		}, this.getHand = function(e) {
			let t = E[e];
			return t === void 0 && (t = new ft(), E[e] = t), t.getHandSpace();
		};
		function ee(e) {
			let t = D.indexOf(e.inputSource);
			if (t === -1) return;
			let n = E[t];
			n !== void 0 && (n.update(e.inputSource, e.frame, u || a), n.dispatchEvent({
				type: e.type,
				data: e.inputSource
			}));
		}
		function L() {
			r.removeEventListener("select", ee), r.removeEventListener("selectstart", ee), r.removeEventListener("selectend", ee), r.removeEventListener("squeeze", ee), r.removeEventListener("squeezestart", ee), r.removeEventListener("squeezeend", ee), r.removeEventListener("end", L), r.removeEventListener("inputsourceschange", te);
			for (let e = 0; e < E.length; e++) {
				let t = D[e];
				t !== null && (D[e] = null, E[e].disconnect(t));
			}
			F = null, I = null, x.reset();
			for (let e in S) delete S[e];
			if (e.setRenderTarget(w), v = null, _ = null, f = null, r = null, T = null, oe.stop(), n.isPresenting = !1, e.setPixelRatio(k), e.setSize(O.width, O.height, !1), A !== null) {
				let e = A.camera;
				e.fov = A.fov, e.zoom = A.zoom, e.updateProjectionMatrix(), A = null;
			}
			n.dispatchEvent({ type: "sessionend" });
		}
		this.setFramebufferScaleFactor = function(e) {
			i = e, n.isPresenting === !0 && z("WebXRManager: Cannot change framebuffer scale while presenting.");
		}, this.setReferenceSpaceType = function(e) {
			s = e, n.isPresenting === !0 && z("WebXRManager: Cannot change reference space type while presenting.");
		}, this.getReferenceSpace = function() {
			return u || a;
		}, this.setReferenceSpace = function(e) {
			u = e;
		}, this.getBaseLayer = function() {
			return _ === null ? v : _;
		}, this.getBinding = function() {
			return f === null && b && (f = new XRWebGLBinding(r, t)), f;
		}, this.getFrame = function() {
			return y;
		}, this.getSession = function() {
			return r;
		}, this.setSession = async function(d) {
			if (r = d, r !== null) {
				if (w = e.getRenderTarget(), r.addEventListener("select", ee), r.addEventListener("selectstart", ee), r.addEventListener("selectend", ee), r.addEventListener("squeeze", ee), r.addEventListener("squeezestart", ee), r.addEventListener("squeezeend", ee), r.addEventListener("end", L), r.addEventListener("inputsourceschange", te), C.xrCompatible !== !0 && await t.makeXRCompatible(), k = e.getPixelRatio(), e.getSize(O), b && "createProjectionLayer" in XRWebGLBinding.prototype) {
					let n = null, a = null, s = null;
					C.depth && (s = C.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, n = C.stencil ? g : h, a = C.stencil ? p : c);
					let l = {
						colorFormat: t.RGBA8,
						depthFormat: s,
						scaleFactor: i
					};
					f = this.getBinding(), _ = f.createProjectionLayer(l), r.updateRenderState({ layers: [_] }), e.setPixelRatio(1), e.setSize(_.textureWidth, _.textureHeight, !1), T = new Pe(_.textureWidth, _.textureHeight, {
						format: m,
						type: o,
						depthTexture: new Or(_.textureWidth, _.textureHeight, a, void 0, void 0, void 0, void 0, void 0, void 0, n),
						stencilBuffer: C.stencil,
						colorSpace: e.outputColorSpace,
						samples: C.antialias ? 4 : 0,
						resolveDepthBuffer: _.ignoreDepthValues === !1,
						resolveStencilBuffer: _.ignoreDepthValues === !1,
						storeMultisampledDepthBuffer: _.ignoreDepthValues === !1,
						storeMultisampledStencilBuffer: _.ignoreDepthValues === !1
					});
				} else {
					let n = {
						antialias: C.antialias,
						alpha: !0,
						depth: C.depth,
						stencil: C.stencil,
						framebufferScaleFactor: i
					};
					v = new XRWebGLLayer(r, t, n), r.updateRenderState({ baseLayer: v }), e.setPixelRatio(1), e.setSize(v.framebufferWidth, v.framebufferHeight, !1), T = new Pe(v.framebufferWidth, v.framebufferHeight, {
						format: m,
						type: o,
						colorSpace: e.outputColorSpace,
						stencilBuffer: C.stencil,
						resolveDepthBuffer: v.ignoreDepthValues === !1,
						resolveStencilBuffer: v.ignoreDepthValues === !1,
						storeMultisampledDepthBuffer: v.ignoreDepthValues === !1,
						storeMultisampledStencilBuffer: v.ignoreDepthValues === !1
					});
				}
				T.isXRRenderTarget = !0, this.setFoveation(l), u = null, a = await r.requestReferenceSpace(s), oe.setContext(r), oe.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
			}
		}, this.getEnvironmentBlendMode = function() {
			if (r !== null) return r.environmentBlendMode;
		}, this.getDepthTexture = function() {
			return x.getDepthTexture();
		};
		function te(e) {
			for (let t = 0; t < e.removed.length; t++) {
				let n = e.removed[t], r = D.indexOf(n);
				r >= 0 && (D[r] = null, E[r].disconnect(n));
			}
			for (let t = 0; t < e.added.length; t++) {
				let n = e.added[t], r = D.indexOf(n);
				if (r === -1) {
					for (let e = 0; e < E.length; e++) if (e >= D.length) {
						D.push(n), r = e;
						break;
					} else if (D[e] === null) {
						D[e] = n, r = e;
						break;
					}
					if (r === -1) break;
				}
				let i = E[r];
				i && i.connect(n);
			}
		}
		let ne = new W(), re = new W();
		function R(e, t, n) {
			ne.setFromMatrixPosition(t.matrixWorld), re.setFromMatrixPosition(n.matrixWorld);
			let r = ne.distanceTo(re), i = t.projectionMatrix.elements, a = n.projectionMatrix.elements, o = i[14] / (i[10] - 1), s = i[14] / (i[10] + 1), c = (i[9] + 1) / i[5], l = (i[9] - 1) / i[5], u = (i[8] - 1) / i[0], d = (a[8] + 1) / a[0], f = o * u, p = o * d, m = r / (-u + d), h = m * -u;
			if (t.matrixWorld.decompose(e.position, e.quaternion, e.scale), e.translateX(h), e.translateZ(m), e.matrixWorld.compose(e.position, e.quaternion, e.scale), e.matrixWorldInverse.copy(e.matrixWorld).invert(), i[10] === -1) e.projectionMatrix.copy(t.projectionMatrix), e.projectionMatrixInverse.copy(t.projectionMatrixInverse);
			else {
				let t = o + m, n = s + m, i = f - h, a = p + (r - h), u = c * s / n * t, d = l * s / n * t;
				e.projectionMatrix.makePerspective(i, a, u, d, t, n), e.projectionMatrixInverse.copy(e.projectionMatrix).invert();
			}
		}
		function B(e, t) {
			t === null ? e.matrixWorld.copy(e.matrix) : e.matrixWorld.multiplyMatrices(t.matrixWorld, e.matrix), e.matrixWorldInverse.copy(e.matrixWorld).invert();
		}
		this.updateCamera = function(e) {
			if (r === null) return;
			let t = e.near, n = e.far;
			x.texture !== null && (x.depthNear > 0 && (t = x.depthNear), x.depthFar > 0 && (n = x.depthFar)), P.near = M.near = j.near = t, P.far = M.far = j.far = n, (F !== P.near || I !== P.far) && (r.updateRenderState({
				depthNear: P.near,
				depthFar: P.far
			}), F = P.near, I = P.far), P.layers.mask = e.layers.mask | 6, j.layers.mask = P.layers.mask & -5, M.layers.mask = P.layers.mask & -3;
			let i = e.parent, a = P.cameras;
			B(P, i);
			for (let e = 0; e < a.length; e++) B(a[e], i);
			a.length === 2 ? R(P, j, M) : P.projectionMatrix.copy(j.projectionMatrix), A === null && e.isPerspectiveCamera && (A = {
				camera: e,
				fov: e.fov,
				zoom: e.zoom
			}), V(e, P, i);
		};
		function V(e, t, n) {
			n === null ? e.matrix.copy(t.matrixWorld) : (e.matrix.copy(n.matrixWorld), e.matrix.invert(), e.matrix.multiply(t.matrixWorld)), e.matrix.decompose(e.position, e.quaternion, e.scale), e.updateMatrixWorld(!0), e.projectionMatrix.copy(t.projectionMatrix), e.projectionMatrixInverse.copy(t.projectionMatrixInverse), e.isPerspectiveCamera && (e.fov = le * 2 * Math.atan(1 / e.projectionMatrix.elements[5]), e.zoom = 1);
		}
		this.getCamera = function() {
			return P;
		}, this.getFoveation = function() {
			if (_ !== null || v !== null) return l;
		}, this.setFoveation = function(e) {
			l = e, _ !== null && (_.fixedFoveation = e), v !== null && v.fixedFoveation !== void 0 && (v.fixedFoveation = e);
		}, this.hasDepthSensing = function() {
			return x.texture !== null;
		}, this.getDepthSensingMesh = function() {
			return x.getMesh(P);
		}, this.getCameraTexture = function(e) {
			return S[e];
		};
		let ie = null;
		function ae(t, i) {
			if (d = i.getViewerPose(u || a), y = i, d !== null) {
				let t = d.views;
				v !== null && (e.setRenderTargetFramebuffer(T, v.framebuffer), e.setRenderTarget(T));
				let i = !1;
				t.length !== P.cameras.length && (P.cameras.length = 0, i = !0);
				for (let n = 0; n < t.length; n++) {
					let r = t[n], a = null;
					if (v !== null) a = v.getViewport(r);
					else {
						let t = f.getViewSubImage(_, r);
						a = t.viewport, n === 0 && (e.setRenderTargetTextures(T, t.colorTexture, t.depthStencilTexture), e.setRenderTarget(T));
					}
					let o = N[n];
					o === void 0 && (o = new ao(), o.layers.enable(n), o.viewport = new Me(), N[n] = o), o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.quaternion, o.scale), o.projectionMatrix.fromArray(r.projectionMatrix), o.projectionMatrixInverse.copy(o.projectionMatrix).invert(), o.viewport.set(a.x, a.y, a.width, a.height), n === 0 && (P.matrix.copy(o.matrix), P.matrix.decompose(P.position, P.quaternion, P.scale)), i === !0 && P.cameras.push(o);
				}
				let a = r.enabledFeatures;
				if (a && a.includes("depth-sensing") && r.depthUsage == "gpu-optimized" && b) {
					f = n.getBinding();
					let e = f.getDepthInformation(t[0]);
					e && e.isValid && e.texture && x.init(e, r.renderState);
				}
				if (a && a.includes("camera-access") && b) {
					e.state.unbindTexture(), f = n.getBinding();
					for (let e = 0; e < t.length; e++) {
						let n = t[e].camera;
						if (n) {
							let e = S[n];
							e || (e = new Ar(), S[n] = e);
							let t = f.getCameraImage(n);
							e.sourceTexture = t;
						}
					}
				}
			}
			for (let e = 0; e < E.length; e++) {
				let t = D[e], n = E[e];
				t !== null && n !== void 0 && n.update(t, i, u || a);
			}
			ie && ie(t, i), i.detectedPlanes && n.dispatchEvent({
				type: "planesdetected",
				data: i
			}), y = null;
		}
		let oe = new Po();
		oe.setAnimationLoop(ae), this.setAnimationLoop = function(e) {
			ie = e;
		}, this.dispose = function() {};
	}
}, Wl = /*@__PURE__*/ new Le(), Gl = /*@__PURE__*/ new G();
Gl.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function Kl(e, t) {
	function n(e, t) {
		e.matrixAutoUpdate === !0 && e.updateMatrix(), t.value.copy(e.matrix);
	}
	function r(t, n) {
		n.color.getRGB(t.fogColor.value, ua(e)), n.isFog ? (t.fogNear.value = n.near, t.fogFar.value = n.far) : n.isFogExp2 && (t.fogDensity.value = n.density);
	}
	function i(e, t, n, r, i) {
		t.isNodeMaterial ? t.uniformsNeedUpdate = !1 : t.isMeshBasicMaterial ? a(e, t) : t.isMeshLambertMaterial ? (a(e, t), t.envMap && (e.envMapIntensity.value = t.envMapIntensity)) : t.isMeshToonMaterial ? (a(e, t), d(e, t)) : t.isMeshPhongMaterial ? (a(e, t), u(e, t), t.envMap && (e.envMapIntensity.value = t.envMapIntensity)) : t.isMeshStandardMaterial ? (a(e, t), f(e, t), t.isMeshPhysicalMaterial && p(e, t, i)) : t.isMeshMatcapMaterial ? (a(e, t), m(e, t)) : t.isMeshDepthMaterial ? a(e, t) : t.isMeshDistanceMaterial ? (a(e, t), h(e, t)) : t.isMeshNormalMaterial ? a(e, t) : t.isLineBasicMaterial ? (o(e, t), t.isLineDashedMaterial && s(e, t)) : t.isPointsMaterial ? c(e, t, n, r) : t.isSpriteMaterial ? l(e, t) : t.isShadowMaterial ? (e.color.value.copy(t.color), e.opacity.value = t.opacity) : t.isShaderMaterial && (t.uniformsNeedUpdate = !1);
	}
	function a(e, r) {
		e.opacity.value = r.opacity, r.color && e.diffuse.value.copy(r.color), r.emissive && e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity), r.map && (e.map.value = r.map, n(r.map, e.mapTransform)), r.alphaMap && (e.alphaMap.value = r.alphaMap, n(r.alphaMap, e.alphaMapTransform)), r.bumpMap && (e.bumpMap.value = r.bumpMap, n(r.bumpMap, e.bumpMapTransform), e.bumpScale.value = r.bumpScale, r.side === 1 && (e.bumpScale.value *= -1)), r.normalMap && (e.normalMap.value = r.normalMap, n(r.normalMap, e.normalMapTransform), e.normalScale.value.copy(r.normalScale), r.side === 1 && e.normalScale.value.negate()), r.displacementMap && (e.displacementMap.value = r.displacementMap, n(r.displacementMap, e.displacementMapTransform), e.displacementScale.value = r.displacementScale, e.displacementBias.value = r.displacementBias), r.emissiveMap && (e.emissiveMap.value = r.emissiveMap, n(r.emissiveMap, e.emissiveMapTransform)), r.specularMap && (e.specularMap.value = r.specularMap, n(r.specularMap, e.specularMapTransform)), r.alphaTest > 0 && (e.alphaTest.value = r.alphaTest);
		let i = t.get(r), a = i.envMap, o = i.envMapRotation;
		a && (e.envMap.value = a, e.envMapRotation.value.setFromMatrix4(Wl.makeRotationFromEuler(o)).transpose(), a.isCubeTexture && a.isRenderTargetTexture === !1 && e.envMapRotation.value.premultiply(Gl), e.reflectivity.value = r.reflectivity, e.ior.value = r.ior, e.refractionRatio.value = r.refractionRatio), r.lightMap && (e.lightMap.value = r.lightMap, e.lightMapIntensity.value = r.lightMapIntensity, n(r.lightMap, e.lightMapTransform)), r.aoMap && (e.aoMap.value = r.aoMap, e.aoMapIntensity.value = r.aoMapIntensity, n(r.aoMap, e.aoMapTransform));
	}
	function o(e, t) {
		e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, t.map && (e.map.value = t.map, n(t.map, e.mapTransform));
	}
	function s(e, t) {
		e.dashSize.value = t.dashSize, e.totalSize.value = t.dashSize + t.gapSize, e.scale.value = t.scale;
	}
	function c(e, t, r, i) {
		e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, e.size.value = t.size * r, e.scale.value = i * .5, t.map && (e.map.value = t.map, n(t.map, e.uvTransform)), t.alphaMap && (e.alphaMap.value = t.alphaMap, n(t.alphaMap, e.alphaMapTransform)), t.alphaTest > 0 && (e.alphaTest.value = t.alphaTest);
	}
	function l(e, t) {
		e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, e.rotation.value = t.rotation, t.map && (e.map.value = t.map, n(t.map, e.mapTransform)), t.alphaMap && (e.alphaMap.value = t.alphaMap, n(t.alphaMap, e.alphaMapTransform)), t.alphaTest > 0 && (e.alphaTest.value = t.alphaTest);
	}
	function u(e, t) {
		e.specular.value.copy(t.specular), e.shininess.value = Math.max(t.shininess, 1e-4);
	}
	function d(e, t) {
		t.gradientMap && (e.gradientMap.value = t.gradientMap);
	}
	function f(e, t) {
		e.metalness.value = t.metalness, t.metalnessMap && (e.metalnessMap.value = t.metalnessMap, n(t.metalnessMap, e.metalnessMapTransform)), e.roughness.value = t.roughness, t.roughnessMap && (e.roughnessMap.value = t.roughnessMap, n(t.roughnessMap, e.roughnessMapTransform)), t.envMap && (e.envMapIntensity.value = t.envMapIntensity);
	}
	function p(e, t, r) {
		e.ior.value = t.ior, t.sheen > 0 && (e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen), e.sheenRoughness.value = t.sheenRoughness, t.sheenColorMap && (e.sheenColorMap.value = t.sheenColorMap, n(t.sheenColorMap, e.sheenColorMapTransform)), t.sheenRoughnessMap && (e.sheenRoughnessMap.value = t.sheenRoughnessMap, n(t.sheenRoughnessMap, e.sheenRoughnessMapTransform))), t.clearcoat > 0 && (e.clearcoat.value = t.clearcoat, e.clearcoatRoughness.value = t.clearcoatRoughness, t.clearcoatMap && (e.clearcoatMap.value = t.clearcoatMap, n(t.clearcoatMap, e.clearcoatMapTransform)), t.clearcoatRoughnessMap && (e.clearcoatRoughnessMap.value = t.clearcoatRoughnessMap, n(t.clearcoatRoughnessMap, e.clearcoatRoughnessMapTransform)), t.clearcoatNormalMap && (e.clearcoatNormalMap.value = t.clearcoatNormalMap, n(t.clearcoatNormalMap, e.clearcoatNormalMapTransform), e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale), t.side === 1 && e.clearcoatNormalScale.value.negate())), t.dispersion > 0 && (e.dispersion.value = t.dispersion), t.retroreflectivity > 0 && (e.retroreflectivity.value = t.retroreflectivity), t.iridescence > 0 && (e.iridescence.value = t.iridescence, e.iridescenceIOR.value = t.iridescenceIOR, e.iridescenceThicknessMinimum.value = t.iridescenceThicknessRange[0], e.iridescenceThicknessMaximum.value = t.iridescenceThicknessRange[1], t.iridescenceMap && (e.iridescenceMap.value = t.iridescenceMap, n(t.iridescenceMap, e.iridescenceMapTransform)), t.iridescenceThicknessMap && (e.iridescenceThicknessMap.value = t.iridescenceThicknessMap, n(t.iridescenceThicknessMap, e.iridescenceThicknessMapTransform))), t.transmission > 0 && (e.transmission.value = t.transmission, e.transmissionSamplerMap.value = r.texture, e.transmissionSamplerSize.value.set(r.width, r.height), t.transmissionMap && (e.transmissionMap.value = t.transmissionMap, n(t.transmissionMap, e.transmissionMapTransform)), e.thickness.value = t.thickness, t.thicknessMap && (e.thicknessMap.value = t.thicknessMap, n(t.thicknessMap, e.thicknessMapTransform)), e.attenuationDistance.value = t.attenuationDistance, e.attenuationColor.value.copy(t.attenuationColor)), t.anisotropy > 0 && (e.anisotropyVector.value.set(t.anisotropy * Math.cos(t.anisotropyRotation), t.anisotropy * Math.sin(t.anisotropyRotation)), t.anisotropyMap && (e.anisotropyMap.value = t.anisotropyMap, n(t.anisotropyMap, e.anisotropyMapTransform))), e.specularIntensity.value = t.specularIntensity, e.specularColor.value.copy(t.specularColor), t.specularColorMap && (e.specularColorMap.value = t.specularColorMap, n(t.specularColorMap, e.specularColorMapTransform)), t.specularIntensityMap && (e.specularIntensityMap.value = t.specularIntensityMap, n(t.specularIntensityMap, e.specularIntensityMapTransform));
	}
	function m(e, t) {
		t.matcap && (e.matcap.value = t.matcap);
	}
	function h(e, n) {
		let r = t.get(n).light;
		e.referencePosition.value.setFromMatrixPosition(r.matrixWorld), e.nearDistance.value = r.shadow.camera.near, e.farDistance.value = r.shadow.camera.far;
	}
	return {
		refreshFogUniforms: r,
		refreshMaterialUniforms: i
	};
}
function ql(e, t, n, r) {
	let i = {}, a = {}, o = [], s = e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);
	function c(e, t) {
		let n = t.program;
		r.uniformBlockBinding(e, n);
	}
	function l(e, n) {
		let o = i[e.id];
		o === void 0 && (g(e), o = u(e), i[e.id] = o, e.addEventListener("dispose", v));
		let s = n.program;
		r.updateUBOMapping(e, s);
		let c = t.render.frame;
		a[e.id] !== c && (f(e), a[e.id] = c);
	}
	function u(t) {
		let n = d();
		t.__bindingPointIndex = n;
		let r = e.createBuffer(), i = t.__size, a = t.usage;
		return e.bindBuffer(e.UNIFORM_BUFFER, r), e.bufferData(e.UNIFORM_BUFFER, i, a), e.bindBuffer(e.UNIFORM_BUFFER, null), e.bindBufferBase(e.UNIFORM_BUFFER, n, r), r;
	}
	function d() {
		for (let e = 0; e < s; e++) if (o.indexOf(e) === -1) return o.push(e), e;
		return B("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
	}
	function f(t) {
		let n = i[t.id], r = t.uniforms, a = t.__cache;
		e.bindBuffer(e.UNIFORM_BUFFER, n);
		for (let e = 0, t = r.length; e < t; e++) {
			let t = r[e];
			if (Array.isArray(t)) for (let n = 0, r = t.length; n < r; n++) p(t[n], e, n, a);
			else p(t, e, 0, a);
		}
		e.bindBuffer(e.UNIFORM_BUFFER, null);
	}
	function p(t, n, r, i) {
		if (h(t, n, r, i) === !0) {
			let n = t.__offset, r = t.value;
			if (Array.isArray(r)) {
				let e = 0;
				for (let n = 0; n < r.length; n++) {
					let i = r[n], a = _(i);
					m(i, t.__data, e), typeof i != "number" && typeof i != "boolean" && !i.isMatrix3 && !ArrayBuffer.isView(i) && (e += a.storage / Float32Array.BYTES_PER_ELEMENT);
				}
			} else m(r, t.__data, 0);
			e.bufferSubData(e.UNIFORM_BUFFER, n, t.__data);
		}
	}
	function m(e, t, n) {
		typeof e == "number" || typeof e == "boolean" ? t[0] = e : e.isMatrix3 ? (t[0] = e.elements[0], t[1] = e.elements[1], t[2] = e.elements[2], t[3] = 0, t[4] = e.elements[3], t[5] = e.elements[4], t[6] = e.elements[5], t[7] = 0, t[8] = e.elements[6], t[9] = e.elements[7], t[10] = e.elements[8], t[11] = 0) : ArrayBuffer.isView(e) ? t.set(new e.constructor(e.buffer, e.byteOffset, t.length)) : e.toArray(t, n);
	}
	function h(e, t, n, r) {
		let i = e.value, a = t + "_" + n;
		if (r[a] === void 0) return r[a] = typeof i == "number" || typeof i == "boolean" ? i : ArrayBuffer.isView(i) ? i.slice() : i.clone(), !0;
		{
			let e = r[a];
			if (typeof i == "number" || typeof i == "boolean") {
				if (e !== i) return r[a] = i, !0;
			} else if (ArrayBuffer.isView(i)) return !0;
			else if (e.equals(i) === !1) return e.copy(i), !0;
		}
		return !1;
	}
	function g(e) {
		let t = e.uniforms, n = 0;
		for (let e = 0, r = t.length; e < r; e++) {
			let r = Array.isArray(t[e]) ? t[e] : [t[e]];
			for (let e = 0, t = r.length; e < t; e++) {
				let t = r[e], i = Array.isArray(t.value) ? t.value : [t.value];
				for (let e = 0, r = i.length; e < r; e++) {
					let r = i[e], a = _(r), o = n % 16, s = o % a.boundary, c = o + s;
					n += s, c !== 0 && 16 - c < a.storage && (n += 16 - c), t.__data = new Float32Array(a.storage / Float32Array.BYTES_PER_ELEMENT), t.__offset = n, n += a.storage;
				}
			}
		}
		let r = n % 16;
		return r > 0 && (n += 16 - r), e.__size = n, e.__cache = {}, this;
	}
	function _(e) {
		let t = {
			boundary: 0,
			storage: 0
		};
		return typeof e == "number" || typeof e == "boolean" ? (t.boundary = 4, t.storage = 4) : e.isVector2 ? (t.boundary = 8, t.storage = 8) : e.isVector3 || e.isColor ? (t.boundary = 16, t.storage = 12) : e.isVector4 ? (t.boundary = 16, t.storage = 16) : e.isMatrix3 ? (t.boundary = 48, t.storage = 48) : e.isMatrix4 ? (t.boundary = 64, t.storage = 64) : e.isTexture ? z("WebGLRenderer: Texture samplers can not be part of an uniforms group.") : ArrayBuffer.isView(e) ? (t.boundary = 16, t.storage = e.byteLength) : z("WebGLRenderer: Unsupported uniform value type.", e), t;
	}
	function v(t) {
		let n = t.target;
		n.removeEventListener("dispose", v);
		let r = o.indexOf(n.__bindingPointIndex);
		o.splice(r, 1), e.deleteBuffer(i[n.id]), delete i[n.id], delete a[n.id];
	}
	function y() {
		for (let t in i) e.deleteBuffer(i[t]);
		o = [], i = {}, a = {};
	}
	return {
		bind: c,
		update: l,
		dispose: y
	};
}
var Jl = new Uint16Array([
	12469,
	15057,
	12620,
	14925,
	13266,
	14620,
	13807,
	14376,
	14323,
	13990,
	14545,
	13625,
	14713,
	13328,
	14840,
	12882,
	14931,
	12528,
	14996,
	12233,
	15039,
	11829,
	15066,
	11525,
	15080,
	11295,
	15085,
	10976,
	15082,
	10705,
	15073,
	10495,
	13880,
	14564,
	13898,
	14542,
	13977,
	14430,
	14158,
	14124,
	14393,
	13732,
	14556,
	13410,
	14702,
	12996,
	14814,
	12596,
	14891,
	12291,
	14937,
	11834,
	14957,
	11489,
	14958,
	11194,
	14943,
	10803,
	14921,
	10506,
	14893,
	10278,
	14858,
	9960,
	14484,
	14039,
	14487,
	14025,
	14499,
	13941,
	14524,
	13740,
	14574,
	13468,
	14654,
	13106,
	14743,
	12678,
	14818,
	12344,
	14867,
	11893,
	14889,
	11509,
	14893,
	11180,
	14881,
	10751,
	14852,
	10428,
	14812,
	10128,
	14765,
	9754,
	14712,
	9466,
	14764,
	13480,
	14764,
	13475,
	14766,
	13440,
	14766,
	13347,
	14769,
	13070,
	14786,
	12713,
	14816,
	12387,
	14844,
	11957,
	14860,
	11549,
	14868,
	11215,
	14855,
	10751,
	14825,
	10403,
	14782,
	10044,
	14729,
	9651,
	14666,
	9352,
	14599,
	9029,
	14967,
	12835,
	14966,
	12831,
	14963,
	12804,
	14954,
	12723,
	14936,
	12564,
	14917,
	12347,
	14900,
	11958,
	14886,
	11569,
	14878,
	11247,
	14859,
	10765,
	14828,
	10401,
	14784,
	10011,
	14727,
	9600,
	14660,
	9289,
	14586,
	8893,
	14508,
	8533,
	15111,
	12234,
	15110,
	12234,
	15104,
	12216,
	15092,
	12156,
	15067,
	12010,
	15028,
	11776,
	14981,
	11500,
	14942,
	11205,
	14902,
	10752,
	14861,
	10393,
	14812,
	9991,
	14752,
	9570,
	14682,
	9252,
	14603,
	8808,
	14519,
	8445,
	14431,
	8145,
	15209,
	11449,
	15208,
	11451,
	15202,
	11451,
	15190,
	11438,
	15163,
	11384,
	15117,
	11274,
	15055,
	10979,
	14994,
	10648,
	14932,
	10343,
	14871,
	9936,
	14803,
	9532,
	14729,
	9218,
	14645,
	8742,
	14556,
	8381,
	14461,
	8020,
	14365,
	7603,
	15273,
	10603,
	15272,
	10607,
	15267,
	10619,
	15256,
	10631,
	15231,
	10614,
	15182,
	10535,
	15118,
	10389,
	15042,
	10167,
	14963,
	9787,
	14883,
	9447,
	14800,
	9115,
	14710,
	8665,
	14615,
	8318,
	14514,
	7911,
	14411,
	7507,
	14279,
	7198,
	15314,
	9675,
	15313,
	9683,
	15309,
	9712,
	15298,
	9759,
	15277,
	9797,
	15229,
	9773,
	15166,
	9668,
	15084,
	9487,
	14995,
	9274,
	14898,
	8910,
	14800,
	8539,
	14697,
	8234,
	14590,
	7790,
	14479,
	7409,
	14367,
	7067,
	14178,
	6621,
	15337,
	8619,
	15337,
	8631,
	15333,
	8677,
	15325,
	8769,
	15305,
	8871,
	15264,
	8940,
	15202,
	8909,
	15119,
	8775,
	15022,
	8565,
	14916,
	8328,
	14804,
	8009,
	14688,
	7614,
	14569,
	7287,
	14448,
	6888,
	14321,
	6483,
	14088,
	6171,
	15350,
	7402,
	15350,
	7419,
	15347,
	7480,
	15340,
	7613,
	15322,
	7804,
	15287,
	7973,
	15229,
	8057,
	15148,
	8012,
	15046,
	7846,
	14933,
	7611,
	14810,
	7357,
	14682,
	7069,
	14552,
	6656,
	14421,
	6316,
	14251,
	5948,
	14007,
	5528,
	15356,
	5942,
	15356,
	5977,
	15353,
	6119,
	15348,
	6294,
	15332,
	6551,
	15302,
	6824,
	15249,
	7044,
	15171,
	7122,
	15070,
	7050,
	14949,
	6861,
	14818,
	6611,
	14679,
	6349,
	14538,
	6067,
	14398,
	5651,
	14189,
	5311,
	13935,
	4958,
	15359,
	4123,
	15359,
	4153,
	15356,
	4296,
	15353,
	4646,
	15338,
	5160,
	15311,
	5508,
	15263,
	5829,
	15188,
	6042,
	15088,
	6094,
	14966,
	6001,
	14826,
	5796,
	14678,
	5543,
	14527,
	5287,
	14377,
	4985,
	14133,
	4586,
	13869,
	4257,
	15360,
	1563,
	15360,
	1642,
	15358,
	2076,
	15354,
	2636,
	15341,
	3350,
	15317,
	4019,
	15273,
	4429,
	15203,
	4732,
	15105,
	4911,
	14981,
	4932,
	14836,
	4818,
	14679,
	4621,
	14517,
	4386,
	14359,
	4156,
	14083,
	3795,
	13808,
	3437,
	15360,
	122,
	15360,
	137,
	15358,
	285,
	15355,
	636,
	15344,
	1274,
	15322,
	2177,
	15281,
	2765,
	15215,
	3223,
	15120,
	3451,
	14995,
	3569,
	14846,
	3567,
	14681,
	3466,
	14511,
	3305,
	14344,
	3121,
	14037,
	2800,
	13753,
	2467,
	15360,
	0,
	15360,
	1,
	15359,
	21,
	15355,
	89,
	15346,
	253,
	15325,
	479,
	15287,
	796,
	15225,
	1148,
	15133,
	1492,
	15008,
	1749,
	14856,
	1882,
	14685,
	1886,
	14506,
	1783,
	14324,
	1608,
	13996,
	1398,
	13702,
	1183
]), Yl = null;
function Xl() {
	return Yl === null && (Yl = new ir(Jl, 16, 16, y, u), Yl.name = "DFG_LUT", Yl.minFilter = i, Yl.magFilter = i, Yl.wrapS = t, Yl.wrapT = t, Yl.generateMipmaps = !1, Yl.needsUpdate = !0), Yl;
}
var Zl = class {
	constructor(e = {}) {
		let { canvas: t = te(), context: n = null, depth: r = !0, stencil: i = !1, alpha: l = !1, antialias: m = !1, premultipliedAlpha: h = !0, preserveDrawingBuffer: g = !1, powerPreference: _ = "default", failIfMajorPerformanceCaveat: y = !1, reversedDepthBuffer: S = !1, outputBufferType: C = o } = e;
		this.isWebGLRenderer = !0;
		let w;
		if (n !== null) {
			if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext) throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
			w = n.getContextAttributes().alpha;
		} else w = l;
		let T = C, E = /* @__PURE__ */ new Set([
			x,
			b,
			v
		]), D = /* @__PURE__ */ new Set([
			o,
			c,
			s,
			p,
			d,
			f
		]), O = /* @__PURE__ */ new Uint32Array(4), A = /* @__PURE__ */ new Int32Array(4), j = new W(), M = null, N = null, P = [], I = [], ee = null;
		this.domElement = t, this.debug = {
			checkShaderErrors: !0,
			diagnostics: { keywords: !1 },
			onShaderError: null
		}, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.toneMapping = 0, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1;
		let L = this, ne = !1, R = null, V = null, ae = null, oe = null;
		this._outputColorSpace = k;
		let se = 0, ce = 0, le = null, ue = -1, H = null, de = new Me(), fe = new Me(), pe = null, me = new J(0), U = 0, he = t.width, ge = t.height, _e = 1, G = null, ve = null, ye = new Me(0, 0, he, ge), be = new Me(0, 0, he, ge), xe = !1, Ce = new _r(), we = !1, Te = !1, Ee = new Le(), De = new W(), Oe = new Me(), ke = {
			background: null,
			fog: null,
			environment: null,
			overrideMaterial: null,
			isScene: !0
		}, Ae = !1;
		function je() {
			return le === null ? _e : 1;
		}
		let K = n;
		function Ne(e, n) {
			return t.getContext(e, n);
		}
		let Fe, Ie, q, Re, ze, Be, Ve, He, Ue, We, Ge, Ke, qe, Je, Ye, Xe, Ze, Qe, $e, et, tt, nt, rt;
		try {
			let e = {
				alpha: !0,
				depth: r,
				stencil: i,
				antialias: m,
				premultipliedAlpha: h,
				preserveDrawingBuffer: g,
				powerPreference: _,
				failIfMajorPerformanceCaveat: y
			};
			if ("setAttribute" in t && t.setAttribute("data-engine", "three.js r186"), t.addEventListener("webglcontextlost", ot, !1), t.addEventListener("webglcontextrestored", st, !1), t.addEventListener("webglcontextcreationerror", ct, !1), K === null) {
				let t = "webgl2";
				if (K = Ne(t, e), K === null) throw Ne(t) ? Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.") : Error("THREE.WebGLRenderer: Error creating WebGL context.");
			}
			it();
		} catch (e) {
			throw t.removeEventListener("webglcontextlost", ot, !1), t.removeEventListener("webglcontextrestored", st, !1), t.removeEventListener("webglcontextcreationerror", ct, !1), B("WebGLRenderer: " + e.message), e;
		}
		function it() {
			Fe = new hs(K), Fe.init(), tt = new zl(K, Fe), Ie = new Wo(K, Fe, e, tt), q = new Ll(K, Fe), Ie.reversedDepthBuffer && S && q.buffers.depth.setReversed(!0), V = K.createFramebuffer(), ae = K.createFramebuffer(), oe = K.createFramebuffer(), Re = new vs(K), ze = new _l(), Be = new Rl(K, Fe, q, ze, Ie, tt, Re), Ve = new ms(L), He = new Fo(K), nt = new Ho(K, He), Ue = new gs(K, He, Re, nt), We = new bs(K, Ue, He, nt, Re), Qe = new ys(K, Ie, Be), Ye = new Go(ze), Ge = new gl(L, Ve, Fe, Ie, nt, Ye), Ke = new Kl(L, ze), qe = new xl(), Je = new Ol(Fe), Ze = new Vo(L, Ve, q, We, w, h), Xe = new Il(L, We, Ie), rt = new ql(K, Re, Ie, q), $e = new Uo(K, Fe, Re), et = new _s(K, Fe, Re), Re.programs = Ge.programs, L.capabilities = Ie, L.extensions = Fe, L.properties = ze, L.renderLists = qe, L.shadowMap = Xe, L.state = q, L.info = Re;
		}
		T !== 1009 && (ee = new Ss(T, t.width, t.height, m, r, i));
		let at = new Ul(L, K);
		this.xr = at, this.getContext = function() {
			return K;
		}, this.getContextAttributes = function() {
			return K.getContextAttributes();
		}, this.forceContextLoss = function() {
			let e = Fe.get("WEBGL_lose_context");
			e && e.loseContext();
		}, this.forceContextRestore = function() {
			let e = Fe.get("WEBGL_lose_context");
			e && e.restoreContext();
		}, this.getPixelRatio = function() {
			return _e;
		}, this.setPixelRatio = function(e) {
			e !== void 0 && (_e = e, this.setSize(he, ge, !1));
		}, this.getSize = function(e) {
			return e.set(he, ge);
		}, this.setSize = function(e, n, r = !0) {
			if (at.isPresenting) {
				z("WebGLRenderer: Can't change size while VR device is presenting.");
				return;
			}
			he = e, ge = n, t.width = Math.floor(e * _e), t.height = Math.floor(n * _e), r === !0 && (t.style.width = e + "px", t.style.height = n + "px"), ee !== null && ee.setSize(t.width, t.height), this.setViewport(0, 0, e, n);
		}, this.getDrawingBufferSize = function(e) {
			return e.set(he * _e, ge * _e).floor();
		}, this.setDrawingBufferSize = function(e, n, r) {
			he = e, ge = n, _e = r, t.width = Math.floor(e * r), t.height = Math.floor(n * r), this.setViewport(0, 0, e, n);
		}, this.setEffects = function(e) {
			if (T === 1009) {
				B("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");
				return;
			}
			if (e) {
				for (let t = 0; t < e.length; t++) if (e[t].isOutputPass === !0) {
					z("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");
					break;
				}
			}
			ee.setEffects(e || []);
		}, this.getCurrentViewport = function(e) {
			return e.copy(de);
		}, this.getViewport = function(e) {
			return e.copy(ye);
		}, this.setViewport = function(e, t, n, r) {
			e.isVector4 ? ye.set(e.x, e.y, e.z, e.w) : ye.set(e, t, n, r), q.viewport(de.copy(ye).multiplyScalar(_e).round());
		}, this.getScissor = function(e) {
			return e.copy(be);
		}, this.setScissor = function(e, t, n, r) {
			e.isVector4 ? be.set(e.x, e.y, e.z, e.w) : be.set(e, t, n, r), q.scissor(fe.copy(be).multiplyScalar(_e).round());
		}, this.getScissorTest = function() {
			return xe;
		}, this.setScissorTest = function(e) {
			q.setScissorTest(xe = e);
		}, this.setOpaqueSort = function(e) {
			G = e;
		}, this.setTransparentSort = function(e) {
			ve = e;
		}, this.getClearColor = function(e) {
			return e.copy(Ze.getClearColor());
		}, this.setClearColor = function() {
			Ze.setClearColor(...arguments);
		}, this.getClearAlpha = function() {
			return Ze.getClearAlpha();
		}, this.setClearAlpha = function() {
			Ze.setClearAlpha(...arguments);
		}, this.clear = function(e = !0, t = !0, n = !0) {
			let r = 0;
			if (e) {
				let e = !1;
				if (le !== null) {
					let t = le.texture.format;
					e = E.has(t);
				}
				if (e) {
					let e = le.texture.type, t = D.has(e), n = Ze.getClearColor(), r = Ze.getClearAlpha(), i = n.r, a = n.g, o = n.b;
					t ? (O[0] = i, O[1] = a, O[2] = o, O[3] = r, K.clearBufferuiv(K.COLOR, 0, O)) : (A[0] = i, A[1] = a, A[2] = o, A[3] = r, K.clearBufferiv(K.COLOR, 0, A));
				} else r |= K.COLOR_BUFFER_BIT;
			}
			t && (r |= K.DEPTH_BUFFER_BIT, this.state.buffers.depth.setMask(!0)), n && (r |= K.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), r !== 0 && K.clear(r);
		}, this.clearColor = function() {
			this.clear(!0, !1, !1);
		}, this.clearDepth = function() {
			this.clear(!1, !0, !1);
		}, this.clearStencil = function() {
			this.clear(!1, !1, !0);
		}, this.setNodesHandler = function(e) {
			e.setRenderer(this), R = e;
		}, this.dispose = function() {
			t.removeEventListener("webglcontextlost", ot, !1), t.removeEventListener("webglcontextrestored", st, !1), t.removeEventListener("webglcontextcreationerror", ct, !1), Ze.dispose(), qe.dispose(), Je.dispose(), ze.dispose(), Ve.dispose(), We.dispose(), nt.dispose(), rt.dispose(), Ge.dispose(), at.dispose(), at.removeEventListener("sessionstart", ht), at.removeEventListener("sessionend", gt), _t.stop();
		};
		function ot(e) {
			e.preventDefault(), re("WebGLRenderer: Context Lost."), ne = !0;
		}
		function st() {
			re("WebGLRenderer: Context Restored."), ne = !1;
			let e = Re.autoReset, t = Xe.enabled, n = Xe.autoUpdate, r = Xe.needsUpdate, i = Xe.type;
			it(), Re.autoReset = e, Xe.enabled = t, Xe.autoUpdate = n, Xe.needsUpdate = r, Xe.type = i;
		}
		function ct(e) {
			B("WebGLRenderer: A WebGL context could not be created. Reason: ", e.statusMessage);
		}
		function lt(e) {
			let t = e.target;
			t.removeEventListener("dispose", lt), ut(t);
		}
		function ut(e) {
			dt(e), ze.remove(e);
		}
		function dt(e) {
			let t = ze.get(e).programs;
			t !== void 0 && (t.forEach(function(e) {
				Ge.releaseProgram(e);
			}), e.isShaderMaterial && Ge.releaseShaderCache(e));
		}
		this.renderBufferDirect = function(e, t, n, r, i, a) {
			t === null && (t = ke);
			let o = i.isMesh && i.matrixWorld.determinantAffine() < 0, s = Dt(e, t, n, r, i);
			q.setMaterial(r, o);
			let c = n.index, l = 1;
			if (r.wireframe === !0) {
				if (c = Ue.getWireframeAttribute(n), c === void 0) return;
				l = 2;
			}
			let u = n.drawRange, d = n.attributes.position, f = u.start * l, p = (u.start + u.count) * l;
			a !== null && (f = Math.max(f, a.start * l), p = Math.min(p, (a.start + a.count) * l)), c === null ? d != null && (f = Math.max(f, 0), p = Math.min(p, d.count)) : (f = Math.max(f, 0), p = Math.min(p, c.count));
			let m = p - f;
			if (m < 0 || m === Infinity) return;
			nt.setup(i, r, s, n, c);
			let h, g = $e;
			if (c !== null && (h = He.get(c), g = et, g.setIndex(h)), i.isMesh) r.wireframe === !0 ? (q.setLineWidth(r.wireframeLinewidth * je()), g.setMode(K.LINES)) : g.setMode(K.TRIANGLES);
			else if (i.isLine) {
				let e = r.linewidth;
				e === void 0 && (e = 1), q.setLineWidth(e * je()), i.isLineSegments ? g.setMode(K.LINES) : i.isLineLoop ? g.setMode(K.LINE_LOOP) : g.setMode(K.LINE_STRIP);
			} else i.isPoints ? g.setMode(K.POINTS) : i.isSprite && g.setMode(K.TRIANGLES);
			if (i.isBatchedMesh) {
				if (Fe.get("WEBGL_multi_draw")) g.renderMultiDraw(i._multiDrawStarts, i._multiDrawCounts, i._multiDrawCount);
				else {
					let e = i._multiDrawStarts, t = i._multiDrawCounts, n = i._multiDrawCount, a = c ? He.get(c).bytesPerElement : 1, o = ze.get(r).currentProgram.getUniforms();
					for (let r = 0; r < n; r++) o.setValue(K, "_gl_DrawID", r), g.render(e[r] / a, t[r]);
				}
			} else if (i.isInstancedMesh) g.renderInstances(f, m, i.count);
			else if (n.isInstancedBufferGeometry) {
				let e = n._maxInstanceCount === void 0 ? Infinity : n._maxInstanceCount, t = Math.min(n.instanceCount, e);
				g.renderInstances(f, m, t);
			} else g.render(f, m);
		};
		function ft(e, t, n, r) {
			R !== null && e.isNodeMaterial && R.setObject(r, e), we === !0 && Ye.setState(e, n, !1), e.transparent === !0 && e.side === 2 && e.forceSinglePass === !1 ? (e.side = 1, e.needsUpdate = !0, Ct(e, t, r), e.side = 0, e.needsUpdate = !0, Ct(e, t, r), e.side = 2) : Ct(e, t, r);
		}
		this.compile = function(e, t, n = null) {
			n === null && (n = e), R !== null && R.renderStart(e, t, n), N = Je.get(n), N.init(t), I.push(N), n.traverseVisible(function(e) {
				e.isLight && e.layers.test(t.layers) && (N.pushLight(e), e.castShadow && N.pushShadow(e));
			}), e !== n && e.traverseVisible(function(e) {
				e.isLight && e.layers.test(t.layers) && (N.pushLight(e), e.castShadow && N.pushShadow(e));
			}), N.setupLights(), R !== null && R.updateLights(N.state.lightsArray), Te = this.localClippingEnabled, we = Ye.init(this.clippingPlanes, Te), we === !0 && Ye.setGlobalState(this.clippingPlanes, t), R !== null && Xe.render(N.state.shadowsArray, n, t);
			let r = /* @__PURE__ */ new Set();
			return e.traverse(function(e) {
				if (!(e.isMesh || e.isPoints || e.isLine || e.isSprite)) return;
				let i = e.material;
				if (i) {
					if (Array.isArray(i)) for (let a = 0; a < i.length; a++) {
						let o = i[a];
						ft(o, n, t, e), r.add(o);
					}
					else ft(i, n, t, e), r.add(i);
				}
			}), N = I.pop(), R !== null && R.renderEnd(), r;
		}, this.compileAsync = function(e, t, n = null) {
			let r = this.compile(e, t, n);
			return new Promise((t) => {
				function n() {
					if (r.forEach(function(e) {
						let t = ze.get(e).currentProgram;
						(t === void 0 || t.isReady()) && r.delete(e);
					}), r.size === 0) {
						t(e);
						return;
					}
					setTimeout(n, 10);
				}
				Fe.get("KHR_parallel_shader_compile") === null ? setTimeout(n, 10) : n();
			});
		};
		let pt = null;
		function mt(e) {
			pt && pt(e);
		}
		function ht() {
			_t.stop();
		}
		function gt() {
			_t.start();
		}
		let _t = new Po();
		_t.setAnimationLoop(mt), typeof self < "u" && _t.setContext(self), this.setAnimationLoop = function(e) {
			pt = e, at.setAnimationLoop(e), e === null ? _t.stop() : _t.start();
		}, at.addEventListener("sessionstart", ht), at.addEventListener("sessionend", gt), this.render = function(e, t) {
			if (t !== void 0 && t.isCamera !== !0) {
				B("WebGLRenderer.render: camera is not an instance of THREE.Camera.");
				return;
			}
			if (ne === !0) return;
			R !== null && R.renderStart(e, t);
			let n = at.enabled === !0 && at.isPresenting === !0, r = ee !== null && (le === null || n) && ee.begin(L, le);
			if (e.matrixWorldAutoUpdate === !0 && e.updateMatrixWorld(), t.parent === null && t.matrixWorldAutoUpdate === !0 && t.updateMatrixWorld(), at.enabled === !0 && at.isPresenting === !0 && (ee === null || ee.isCompositing() === !1) && (at.cameraAutoUpdate === !0 && at.updateCamera(t), t = at.getCamera()), e.isScene === !0 && e.onBeforeRender(L, e, t, le), N = Je.get(e, I.length), N.init(t), N.state.textureUnits = Be.getTextureUnits(), I.push(N), Ee.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), Ce.setFromProjectionMatrix(Ee, F, t.reversedDepth), Te = this.localClippingEnabled, we = Ye.init(this.clippingPlanes, Te), M = qe.get(e, P.length), M.init(), P.push(M), at.enabled === !0 && at.isPresenting === !0) {
				let e = L.xr.getDepthSensingMesh();
				e !== null && vt(e, t, -Infinity, L.sortObjects);
			}
			vt(e, t, 0, L.sortObjects), M.finish(), R !== null && R.updateLights(N.state.lightsArray), L.sortObjects === !0 && M.sort(G, ve), Ae = at.enabled === !1 || at.isPresenting === !1 || at.hasDepthSensing() === !1, Ae && Ze.addToRenderList(M, e), this.info.render.frame++, this.info.autoReset === !0 && this.info.reset(), we === !0 && Ye.beginShadows();
			let i = N.state.shadowsArray;
			if (Xe.render(i, e, t), we === !0 && Ye.endShadows(), (r && ee.hasRenderPass()) === !1) {
				let n = M.opaque, r = M.transmissive;
				if (N.setupLights(), t.isArrayCamera) {
					let i = t.cameras;
					if (r.length > 0) for (let t = 0, a = i.length; t < a; t++) {
						let a = i[t];
						bt(n, r, e, a);
					}
					Ae && Ze.render(e);
					for (let t = 0, n = i.length; t < n; t++) {
						let n = i[t];
						yt(M, e, n, n.viewport);
					}
				} else r.length > 0 && bt(n, r, e, t), Ae && Ze.render(e), yt(M, e, t);
			}
			le !== null && ce === 0 && (Be.updateMultisampleRenderTarget(le), Be.updateRenderTargetMipmap(le)), r && ee.end(L), e.isScene === !0 && e.onAfterRender(L, e, t), nt.resetDefaultState(), ue = -1, H = null, I.pop(), I.length > 0 ? (N = I[I.length - 1], Be.setTextureUnits(N.state.textureUnits), we === !0 && Ye.setGlobalState(L.clippingPlanes, N.state.camera)) : N = null, P.pop(), M = P.length > 0 ? P[P.length - 1] : null, R !== null && R.renderEnd();
		};
		function vt(e, t, n, r) {
			if (e.visible === !1) return;
			if (e.layers.test(t.layers)) {
				if (e.isGroup) n = e.renderOrder;
				else if (e.isLOD) e.autoUpdate === !0 && e.update(t);
				else if (e.isLightProbeGrid) N.pushLightProbeGrid(e);
				else if (e.isLight) N.pushLight(e), e.castShadow && N.pushShadow(e);
				else if (e.isSprite) {
					if (!e.frustumCulled || e.intersectsFrustum(Ce)) {
						r && Oe.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Ee);
						let i = We.update(e), a = e.material;
						a.visible && M.push(e, i, a, n, Oe.z, null, t);
					}
				} else if ((e.isMesh || e.isLine || e.isPoints) && (!e.frustumCulled || e.intersectsFrustum(Ce))) {
					let i = We.update(e), a = e.material;
					if (r && (e.boundingSphere === void 0 ? (i.boundingSphere === null && i.computeBoundingSphere(), Oe.copy(i.boundingSphere.center)) : (e.boundingSphere === null && e.computeBoundingSphere(), Oe.copy(e.boundingSphere.center)), Oe.applyMatrix4(e.matrixWorld).applyMatrix4(Ee)), Array.isArray(a)) {
						let r = i.groups;
						for (let o = 0, s = r.length; o < s; o++) {
							let s = r[o], c = a[s.materialIndex];
							c && c.visible && M.push(e, i, c, n, Oe.z, s, t);
						}
					} else a.visible && M.push(e, i, a, n, Oe.z, null, t);
				}
			}
			let i = e.children;
			for (let e = 0, a = i.length; e < a; e++) vt(i[e], t, n, r);
		}
		function yt(e, t, n, r) {
			let { opaque: i, transmissive: a, transparent: o } = e;
			N.setupLightsView(n), we === !0 && Ye.setGlobalState(L.clippingPlanes, n), r && q.viewport(de.copy(r)), i.length > 0 && xt(i, t, n), a.length > 0 && xt(a, t, n), o.length > 0 && xt(o, t, n), q.buffers.depth.setTest(!0), q.buffers.depth.setMask(!0), q.buffers.color.setMask(!0), q.setPolygonOffset(!1);
		}
		function bt(e, t, n, r) {
			if ((n.isScene === !0 ? n.overrideMaterial : null) !== null) return;
			if (N.state.transmissionRenderTarget[r.id] === void 0) {
				let e = Fe.has("EXT_color_buffer_half_float") || Fe.has("EXT_color_buffer_float");
				N.state.transmissionRenderTarget[r.id] = new Pe(1, 1, {
					generateMipmaps: !0,
					type: e ? u : o,
					minFilter: a,
					samples: Math.max(4, Ie.samples),
					stencilBuffer: i,
					resolveDepthBuffer: !1,
					resolveStencilBuffer: !1,
					storeMultisampledDepthBuffer: !1,
					storeMultisampledStencilBuffer: !1,
					colorSpace: Se.workingColorSpace
				});
			}
			let s = N.state.transmissionRenderTarget[r.id], c = r.viewport || de;
			s.setSize(c.z * L.transmissionResolutionScale, c.w * L.transmissionResolutionScale);
			let l = L.getRenderTarget(), d = L.getActiveCubeFace(), f = L.getActiveMipmapLevel();
			L.setRenderTarget(s), L.getClearColor(me), U = L.getClearAlpha(), U < 1 && L.setClearColor(16777215, .5), L.clear(), Ae && Ze.render(n);
			let p = L.toneMapping;
			L.toneMapping = 0;
			let m = r.viewport;
			if (r.viewport !== void 0 && (r.viewport = void 0), N.setupLightsView(r), we === !0 && Ye.setGlobalState(L.clippingPlanes, r), xt(e, n, r), Be.updateMultisampleRenderTarget(s), Be.updateRenderTargetMipmap(s), Fe.has("WEBGL_multisampled_render_to_texture") === !1) {
				let e = !1;
				for (let i = 0, a = t.length; i < a; i++) {
					let { object: a, geometry: o, material: s, group: c } = t[i];
					if (s.side === 2 && a.layers.test(r.layers)) {
						let t = s.side;
						s.side = 1, s.needsUpdate = !0, St(a, n, r, o, s, c), s.side = t, s.needsUpdate = !0, e = !0;
					}
				}
				e === !0 && (Be.updateMultisampleRenderTarget(s), Be.updateRenderTargetMipmap(s));
			}
			L.setRenderTarget(l, d, f), L.setClearColor(me, U), m !== void 0 && (r.viewport = m), L.toneMapping = p;
		}
		function xt(e, t, n) {
			let r = t.isScene === !0 ? t.overrideMaterial : null;
			for (let i = 0, a = e.length; i < a; i++) {
				let a = e[i], { object: o, geometry: s, group: c } = a, l = a.material;
				l.allowOverride === !0 && r !== null && (l = r), o.layers.test(n.layers) && St(o, t, n, s, l, c);
			}
		}
		function St(e, t, n, r, i, a) {
			R !== null && i.isNodeMaterial && R.setObject(e, i), e.onBeforeRender(L, t, n, r, i, a), e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse, e.matrixWorld), e.normalMatrix.getNormalMatrix(e.modelViewMatrix), i.onBeforeRender(L, t, n, r, e, a), i.transparent === !0 && i.side === 2 && i.forceSinglePass === !1 ? (i.side = 1, i.needsUpdate = !0, L.renderBufferDirect(n, t, r, i, e, a), i.side = 0, i.needsUpdate = !0, L.renderBufferDirect(n, t, r, i, e, a), i.side = 2) : L.renderBufferDirect(n, t, r, i, e, a), e.onAfterRender(L, t, n, r, i, a);
		}
		function Ct(e, t, n) {
			t.isScene !== !0 && (t = ke);
			let r = ze.get(e), i = N.state.lights, a = N.state.shadowsArray, o = i.state.version, s = Ge.getParameters(e, i.state, a, t, n, N.state.lightProbeGridArray), c = Ge.getProgramCacheKey(s), l = r.programs;
			r.environment = e.isMeshStandardMaterial || e.isMeshLambertMaterial || e.isMeshPhongMaterial ? t.environment : null, r.fog = t.fog;
			let u = e.isMeshStandardMaterial || e.isMeshLambertMaterial && !e.envMap || e.isMeshPhongMaterial && !e.envMap;
			r.envMap = Ve.get(e.envMap || r.environment, u), r.envMapRotation = r.environment !== null && e.envMap === null ? t.environmentRotation : e.envMapRotation, l === void 0 && (e.addEventListener("dispose", lt), l = /* @__PURE__ */ new Map(), r.programs = l);
			let d = l.get(c);
			if (d !== void 0) {
				if (r.currentProgram === d && r.lightsStateVersion === o) return Tt(e, s), d;
			} else s.uniforms = Ge.getUniforms(e), R !== null && e.isNodeMaterial && R.build(e, n, s), e.onBeforeCompile(s, L), d = Ge.acquireProgram(s, c), l.set(c, d), r.uniforms = s.uniforms;
			let f = r.uniforms;
			return (!e.isShaderMaterial && !e.isRawShaderMaterial || e.clipping === !0) && (f.clippingPlanes = Ye.uniform), Tt(e, s), r.needsLights = kt(e), r.lightsStateVersion = o, r.needsLights && (f.ambientLightColor.value = i.state.ambient, f.lightProbe.value = i.state.probe, f.sunLights.value = i.state.sun, f.sunLightShadows.value = i.state.sunShadow, f.directionalLights.value = i.state.directional, f.directionalLightShadows.value = i.state.directionalShadow, f.spotLights.value = i.state.spot, f.spotLightShadows.value = i.state.spotShadow, f.rectAreaLights.value = i.state.rectArea, f.ltc_1.value = i.state.rectAreaLTC1, f.ltc_2.value = i.state.rectAreaLTC2, f.pointLights.value = i.state.point, f.pointLightShadows.value = i.state.pointShadow, f.hemisphereLights.value = i.state.hemi, f.sunShadowMatrix.value = i.state.sunShadowMatrix, f.sunShadowCascade.value = i.state.sunShadowCascade, f.directionalShadowMatrix.value = i.state.directionalShadowMatrix, f.spotLightMatrix.value = i.state.spotLightMatrix, f.spotLightMap.value = i.state.spotLightMap, f.pointShadowMatrix.value = i.state.pointShadowMatrix), r.lightProbeGrid = N.state.lightProbeGridArray.length > 0, r.currentProgram = d, r.uniformsList = null, d;
		}
		function wt(e) {
			if (e.uniformsList === null) {
				let t = e.currentProgram.getUniforms();
				e.uniformsList = kc.seqWithValue(t.seq, e.uniforms);
			}
			return e.uniformsList;
		}
		function Tt(e, t) {
			let n = ze.get(e);
			n.outputColorSpace = t.outputColorSpace, n.batching = t.batching, n.batchingColor = t.batchingColor, n.instancing = t.instancing, n.instancingColor = t.instancingColor, n.instancingMorph = t.instancingMorph, n.skinning = t.skinning, n.morphTargets = t.morphTargets, n.morphNormals = t.morphNormals, n.morphColors = t.morphColors, n.morphTargetsCount = t.morphTargetsCount, n.numClippingPlanes = t.numClippingPlanes, n.numIntersection = t.numClipIntersection, n.vertexAlphas = t.vertexAlphas, n.vertexTangents = t.vertexTangents, n.toneMapping = t.toneMapping;
		}
		function Et(e, t) {
			if (e.length === 0) return null;
			if (e.length === 1) return e[0].texture === null ? null : e[0];
			j.setFromMatrixPosition(t.matrixWorld);
			for (let t = 0, n = e.length; t < n; t++) {
				let n = e[t];
				if (n.texture !== null && n.boundingBox.containsPoint(j)) return n;
			}
			return null;
		}
		function Dt(e, t, n, r, i) {
			t.isScene !== !0 && (t = ke), Be.resetTextureUnits();
			let a = t.fog, o = r.isMeshStandardMaterial || r.isMeshLambertMaterial || r.isMeshPhongMaterial ? t.environment : null, s = le === null ? L.outputColorSpace : le.isXRRenderTarget === !0 ? le.texture.colorSpace : Se.workingColorSpace, c = r.isMeshStandardMaterial || r.isMeshLambertMaterial && !r.envMap || r.isMeshPhongMaterial && !r.envMap, l = Ve.get(r.envMap || o, c), u = r.vertexColors === !0 && !!n.attributes.color && n.attributes.color.itemSize === 4, d = !!n.attributes.tangent && (!!r.normalMap || r.anisotropy > 0), f = !!n.morphAttributes.position, p = !!n.morphAttributes.normal, m = !!n.morphAttributes.color, h = 0;
			r.toneMapped && (le === null || le.isXRRenderTarget === !0) && (h = L.toneMapping);
			let g = n.morphAttributes.position || n.morphAttributes.normal || n.morphAttributes.color, _ = g === void 0 ? 0 : g.length, v = ze.get(r), y = N.state.lights;
			if (we === !0 && (Te === !0 || e !== H)) {
				let t = e === H && r.id === ue;
				Ye.setState(r, e, t);
			}
			let b = !1;
			r.version === v.__version ? v.needsLights && v.lightsStateVersion !== y.state.version ? b = !0 : v.outputColorSpace === s ? i.isBatchedMesh && v.batching === !1 || !i.isBatchedMesh && v.batching === !0 || i.isBatchedMesh && v.batchingColor === !0 && i._colorsTexture === null || i.isBatchedMesh && v.batchingColor === !1 && i._colorsTexture !== null || i.isInstancedMesh && v.instancing === !1 || !i.isInstancedMesh && v.instancing === !0 || i.isSkinnedMesh && v.skinning === !1 || !i.isSkinnedMesh && v.skinning === !0 || i.isInstancedMesh && v.instancingColor === !0 && i.instanceColor === null || i.isInstancedMesh && v.instancingColor === !1 && i.instanceColor !== null || i.isInstancedMesh && v.instancingMorph === !0 && i.morphTexture === null || i.isInstancedMesh && v.instancingMorph === !1 && i.morphTexture !== null ? b = !0 : v.envMap === l ? r.fog === !0 && v.fog !== a || v.numClippingPlanes !== void 0 && (v.numClippingPlanes !== Ye.numPlanes || v.numIntersection !== Ye.numIntersection) ? b = !0 : v.vertexAlphas === u && v.vertexTangents === d && v.morphTargets === f && v.morphNormals === p && v.morphColors === m && v.toneMapping === h && v.morphTargetsCount === _ ? !!v.lightProbeGrid != N.state.lightProbeGridArray.length > 0 && (b = !0) : b = !0 : b = !0 : b = !0 : (b = !0, v.__version = r.version);
			let x = v.currentProgram;
			b === !0 && (x = Ct(r, t, i), R && r.isNodeMaterial && R.onUpdateProgram(r, x, v));
			let S = !1, C = !1, w = !1, T = x.getUniforms(), E = v.uniforms;
			if (q.useProgram(x.program) && (S = !0, C = !0, w = !0), r.id !== ue && (ue = r.id, C = !0), v.needsLights) {
				let e = Et(N.state.lightProbeGridArray, i);
				v.lightProbeGrid !== e && (v.lightProbeGrid = e, C = !0);
			}
			if (S || H !== e) {
				q.buffers.depth.getReversed() && e.reversedDepth !== !0 && (e._reversedDepth = !0, e.updateProjectionMatrix()), T.setValue(K, "projectionMatrix", e.projectionMatrix), T.setValue(K, "viewMatrix", e.matrixWorldInverse);
				let t = T.map.cameraPosition;
				t !== void 0 && t.setValue(K, De.setFromMatrixPosition(e.matrixWorld)), Ie.logarithmicDepthBuffer && T.setValue(K, "logDepthBufFC", 2 / (Math.log(e.far + 1) / Math.LN2)), (r.isMeshPhongMaterial || r.isMeshToonMaterial || r.isMeshLambertMaterial || r.isMeshBasicMaterial || r.isMeshStandardMaterial || r.isShaderMaterial) && T.setValue(K, "isOrthographic", e.isOrthographicCamera === !0), H !== e && (H = e, C = !0, w = !0);
			}
			if (v.needsLights && (y.state.sunShadowMap.length > 0 && T.setValue(K, "sunShadowMap", y.state.sunShadowMap, Be), y.state.directionalShadowMap.length > 0 && T.setValue(K, "directionalShadowMap", y.state.directionalShadowMap, Be), y.state.spotShadowMap.length > 0 && T.setValue(K, "spotShadowMap", y.state.spotShadowMap, Be), y.state.pointShadowMap.length > 0 && T.setValue(K, "pointShadowMap", y.state.pointShadowMap, Be)), i.isSkinnedMesh) {
				T.setOptional(K, i, "bindMatrix"), T.setOptional(K, i, "bindMatrixInverse");
				let e = i.skeleton;
				e && (e.boneTexture === null && e.computeBoneTexture(), T.setValue(K, "boneTexture", e.boneTexture, Be));
			}
			i.isBatchedMesh && (T.setOptional(K, i, "batchingTexture"), T.setValue(K, "batchingTexture", i._matricesTexture, Be), T.setOptional(K, i, "batchingIdTexture"), T.setValue(K, "batchingIdTexture", i._indirectTexture, Be), T.setOptional(K, i, "batchingColorTexture"), i._colorsTexture !== null && T.setValue(K, "batchingColorTexture", i._colorsTexture, Be));
			let D = n.morphAttributes;
			if ((D.position !== void 0 || D.normal !== void 0 || D.color !== void 0) && Qe.update(i, n, x), (C || v.receiveShadow !== i.receiveShadow) && (v.receiveShadow = i.receiveShadow, T.setValue(K, "receiveShadow", i.receiveShadow)), (r.isMeshStandardMaterial || r.isMeshLambertMaterial || r.isMeshPhongMaterial) && r.envMap === null && t.environment !== null && (E.envMapIntensity.value = t.environmentIntensity), E.dfgLUT !== void 0 && (E.dfgLUT.value = Xl()), C) {
				if (T.setValue(K, "toneMappingExposure", L.toneMappingExposure), v.needsLights && Ot(E, w), a && r.fog === !0 && Ke.refreshFogUniforms(E, a), Ke.refreshMaterialUniforms(E, r, _e, ge, N.state.transmissionRenderTarget[e.id]), v.needsLights && v.lightProbeGrid) {
					let e = v.lightProbeGrid;
					E.probesSH.value = e.texture, E.probesMin.value.copy(e.boundingBox.min), E.probesMax.value.copy(e.boundingBox.max), E.probesResolution.value.copy(e.resolution);
				}
				kc.upload(K, wt(v), E, Be);
			}
			if (r.isShaderMaterial && r.uniformsNeedUpdate === !0 && (kc.upload(K, wt(v), E, Be), r.uniformsNeedUpdate = !1), r.isSpriteMaterial && T.setValue(K, "center", i.center), T.setValue(K, "modelViewMatrix", i.modelViewMatrix), T.setValue(K, "normalMatrix", i.normalMatrix), T.setValue(K, "modelMatrix", i.matrixWorld), r.uniformsGroups !== void 0) {
				let e = r.uniformsGroups;
				for (let t = 0, n = e.length; t < n; t++) {
					let n = e[t];
					rt.update(n, x), rt.bind(n, x);
				}
			}
			return x;
		}
		function Ot(e, t) {
			e.ambientLightColor.needsUpdate = t, e.lightProbe.needsUpdate = t, e.sunLights.needsUpdate = t, e.sunLightShadows.needsUpdate = t, e.directionalLights.needsUpdate = t, e.directionalLightShadows.needsUpdate = t, e.pointLights.needsUpdate = t, e.pointLightShadows.needsUpdate = t, e.spotLights.needsUpdate = t, e.spotLightShadows.needsUpdate = t, e.rectAreaLights.needsUpdate = t, e.hemisphereLights.needsUpdate = t;
		}
		function kt(e) {
			return e.isMeshLambertMaterial || e.isMeshToonMaterial || e.isMeshPhongMaterial || e.isMeshStandardMaterial || e.isShadowMaterial || e.isShaderMaterial && e.lights === !0;
		}
		this.getActiveCubeFace = function() {
			return se;
		}, this.getActiveMipmapLevel = function() {
			return ce;
		}, this.getRenderTarget = function() {
			return le;
		}, this.setRenderTargetTextures = function(e, t, n) {
			let r = ze.get(e);
			r.__autoAllocateDepthBuffer = e.resolveDepthBuffer === !1, r.__autoAllocateDepthBuffer === !1 && (r.__useRenderToTexture = !1), ze.get(e.texture).__webglTexture = t, ze.get(e.depthTexture).__webglTexture = r.__autoAllocateDepthBuffer ? void 0 : n, r.__hasExternalTextures = !0;
		}, this.setRenderTargetFramebuffer = function(e, t) {
			let n = ze.get(e);
			n.__webglFramebuffer = t, n.__useDefaultFramebuffer = t === void 0;
		}, this.setRenderTarget = function(e, t = 0, n = 0) {
			le = e, se = t, ce = n;
			let r = null, i = !1, a = !1;
			if (e) {
				let o = ze.get(e);
				if (o.__useDefaultFramebuffer !== void 0) {
					q.bindFramebuffer(K.FRAMEBUFFER, o.__webglFramebuffer), de.copy(e.viewport), fe.copy(e.scissor), pe = e.scissorTest, q.viewport(de), q.scissor(fe), q.setScissorTest(pe), ue = -1;
					return;
				}
				if (o.__webglFramebuffer === void 0) Be.setupRenderTarget(e);
				else if (o.__hasExternalTextures) Be.rebindTextures(e, ze.get(e.texture).__webglTexture, ze.get(e.depthTexture).__webglTexture);
				else if (e.depthBuffer) {
					let t = e.depthTexture;
					if (o.__boundDepthTexture !== t) {
						if (t !== null && ze.has(t) && (e.width !== t.image.width || e.height !== t.image.height)) throw Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");
						Be.setupDepthRenderbuffer(e);
					}
				}
				let s = e.texture;
				(s.isData3DTexture || s.isDataArrayTexture || s.isCompressedArrayTexture) && (a = !0);
				let c = ze.get(e).__webglFramebuffer;
				e.isWebGLCubeRenderTarget ? (r = Array.isArray(c[t]) ? c[t][n] : c[t], i = !0) : r = e.samples > 0 && Be.useMultisampledRTT(e) === !1 ? ze.get(e).__webglMultisampledFramebuffer : Array.isArray(c) ? c[n] : c, de.copy(e.viewport), fe.copy(e.scissor), pe = e.scissorTest;
			} else de.copy(ye).multiplyScalar(_e).floor(), fe.copy(be).multiplyScalar(_e).floor(), pe = xe;
			if (n !== 0 && (r = V), q.bindFramebuffer(K.FRAMEBUFFER, r) && q.drawBuffers(e, r), q.viewport(de), q.scissor(fe), q.setScissorTest(pe), i) {
				let r = ze.get(e.texture);
				K.framebufferTexture2D(K.FRAMEBUFFER, K.COLOR_ATTACHMENT0, K.TEXTURE_CUBE_MAP_POSITIVE_X + t, r.__webglTexture, n);
			} else if (a) {
				let r = t;
				for (let t = 0; t < e.textures.length; t++) {
					let i = ze.get(e.textures[t]);
					K.framebufferTextureLayer(K.FRAMEBUFFER, K.COLOR_ATTACHMENT0 + t, i.__webglTexture, n, r);
				}
			} else if (e !== null && n !== 0) {
				let t = ze.get(e.texture);
				K.framebufferTexture2D(K.FRAMEBUFFER, K.COLOR_ATTACHMENT0, K.TEXTURE_2D, t.__webglTexture, n);
			}
			ue = -1;
		};
		function At(e) {
			let t = ze.get(e);
			return (t.__readFormat !== e.format || t.__readType !== e.type) && (t.__readFormat = e.format, t.__readType = e.type, t.__formatReadable = Ie.textureFormatReadable(e.format), t.__typeReadable = Ie.textureTypeReadable(e.type)), t;
		}
		this.readRenderTargetPixels = function(e, t, n, r, i, a, o, s = 0) {
			if (!(e && e.isWebGLRenderTarget)) {
				B("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
				return;
			}
			let c = ze.get(e).__webglFramebuffer;
			if (e.isWebGLCubeRenderTarget && o !== void 0 && (c = c[o]), c) {
				q.bindFramebuffer(K.FRAMEBUFFER, c);
				try {
					let o = e.textures[s], c = o.format, l = o.type;
					e.textures.length > 1 && K.readBuffer(K.COLOR_ATTACHMENT0 + s);
					let u = At(o);
					if (u.__formatReadable === !1) {
						B("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
						return;
					}
					if (u.__typeReadable === !1) {
						B("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
						return;
					}
					t >= 0 && t <= e.width - r && n >= 0 && n <= e.height - i && K.readPixels(t, n, r, i, tt.convert(c), tt.convert(l), a);
				} finally {
					let e = le === null ? null : ze.get(le).__webglFramebuffer;
					q.bindFramebuffer(K.FRAMEBUFFER, e);
				}
			}
		}, this.readRenderTargetPixelsAsync = async function(e, t, n, r, i, a, o, s = 0) {
			if (!(e && e.isWebGLRenderTarget)) throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
			let c = ze.get(e).__webglFramebuffer;
			if (e.isWebGLCubeRenderTarget && o !== void 0 && (c = c[o]), c) {
				if (t >= 0 && t <= e.width - r && n >= 0 && n <= e.height - i) {
					q.bindFramebuffer(K.FRAMEBUFFER, c);
					let o = e.textures[s], l = o.format, u = o.type;
					e.textures.length > 1 && K.readBuffer(K.COLOR_ATTACHMENT0 + s);
					let d = At(o);
					if (d.__formatReadable === !1) throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
					if (d.__typeReadable === !1) throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
					let f = K.createBuffer();
					K.bindBuffer(K.PIXEL_PACK_BUFFER, f), K.bufferData(K.PIXEL_PACK_BUFFER, a.byteLength, K.STREAM_READ), K.readPixels(t, n, r, i, tt.convert(l), tt.convert(u), 0), K.bindBuffer(K.PIXEL_PACK_BUFFER, null);
					let p = le === null ? null : ze.get(le).__webglFramebuffer;
					q.bindFramebuffer(K.FRAMEBUFFER, p);
					let m = K.fenceSync(K.SYNC_GPU_COMMANDS_COMPLETE, 0);
					return K.flush(), await ie(K, m, 4), K.bindBuffer(K.PIXEL_PACK_BUFFER, f), K.getBufferSubData(K.PIXEL_PACK_BUFFER, 0, a), K.bindBuffer(K.PIXEL_PACK_BUFFER, null), K.deleteBuffer(f), K.deleteSync(m), a;
				}
				throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
			}
		}, this.copyFramebufferToTexture = function(e, t = null, n = 0) {
			let r = 2 ** -n, i = Math.floor(e.image.width * r), a = Math.floor(e.image.height * r), o = t === null ? 0 : t.x, s = t === null ? 0 : t.y;
			Be.setTexture2D(e, 0), K.copyTexSubImage2D(K.TEXTURE_2D, n, 0, 0, o, s, i, a), q.unbindTexture();
		}, this.copyTextureToTexture = function(e, t, n = null, r = null, i = 0, a = 0) {
			let o, s, c, l, u, d, f, p, m, h = e.isCompressedTexture ? e.mipmaps[a] : e.image;
			if (n !== null) o = n.max.x - n.min.x, s = n.max.y - n.min.y, c = n.isBox3 ? n.max.z - n.min.z : 1, l = n.min.x, u = n.min.y, d = n.isBox3 ? n.min.z : 0;
			else {
				let t = 2 ** -i;
				o = Math.floor(h.width * t), s = Math.floor(h.height * t), c = e.isDataArrayTexture ? h.depth : e.isData3DTexture ? Math.floor(h.depth * t) : 1, l = 0, u = 0, d = 0;
			}
			r === null ? (f = 0, p = 0, m = 0) : (f = r.x, p = r.y, m = r.z);
			let g = tt.convert(t.format), _ = tt.convert(t.type), v;
			t.isData3DTexture ? (Be.setTexture3D(t, 0), v = K.TEXTURE_3D) : t.isDataArrayTexture || t.isCompressedArrayTexture ? (Be.setTexture2DArray(t, 0), v = K.TEXTURE_2D_ARRAY) : (Be.setTexture2D(t, 0), v = K.TEXTURE_2D), q.activeTexture(K.TEXTURE0), q.pixelStorei(K.UNPACK_FLIP_Y_WEBGL, t.flipY), q.pixelStorei(K.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.premultiplyAlpha), q.pixelStorei(K.UNPACK_ALIGNMENT, t.unpackAlignment);
			let y = q.getParameter(K.UNPACK_ROW_LENGTH), b = q.getParameter(K.UNPACK_IMAGE_HEIGHT), x = q.getParameter(K.UNPACK_SKIP_PIXELS), S = q.getParameter(K.UNPACK_SKIP_ROWS), C = q.getParameter(K.UNPACK_SKIP_IMAGES);
			q.pixelStorei(K.UNPACK_ROW_LENGTH, h.width), q.pixelStorei(K.UNPACK_IMAGE_HEIGHT, h.height), q.pixelStorei(K.UNPACK_SKIP_PIXELS, l), q.pixelStorei(K.UNPACK_SKIP_ROWS, u), q.pixelStorei(K.UNPACK_SKIP_IMAGES, d);
			let w = e.isDataArrayTexture || e.isData3DTexture, T = t.isDataArrayTexture || t.isData3DTexture;
			if (e.isDepthTexture) {
				let n = ze.get(e), r = ze.get(t), h = ze.get(n.__renderTarget), g = ze.get(r.__renderTarget);
				q.bindFramebuffer(K.READ_FRAMEBUFFER, h.__webglFramebuffer), q.bindFramebuffer(K.DRAW_FRAMEBUFFER, g.__webglFramebuffer);
				for (let n = 0; n < c; n++) w && (K.framebufferTextureLayer(K.READ_FRAMEBUFFER, K.COLOR_ATTACHMENT0, ze.get(e).__webglTexture, i, d + n), K.framebufferTextureLayer(K.DRAW_FRAMEBUFFER, K.COLOR_ATTACHMENT0, ze.get(t).__webglTexture, a, m + n)), K.blitFramebuffer(l, u, o, s, f, p, o, s, K.DEPTH_BUFFER_BIT, K.NEAREST);
				q.bindFramebuffer(K.READ_FRAMEBUFFER, null), q.bindFramebuffer(K.DRAW_FRAMEBUFFER, null);
			} else if (i !== 0 || e.isRenderTargetTexture || ze.has(e)) {
				let n = ze.get(e), r = ze.get(t);
				q.bindFramebuffer(K.READ_FRAMEBUFFER, ae), q.bindFramebuffer(K.DRAW_FRAMEBUFFER, oe);
				for (let e = 0; e < c; e++) w ? K.framebufferTextureLayer(K.READ_FRAMEBUFFER, K.COLOR_ATTACHMENT0, n.__webglTexture, i, d + e) : K.framebufferTexture2D(K.READ_FRAMEBUFFER, K.COLOR_ATTACHMENT0, K.TEXTURE_2D, n.__webglTexture, i), T ? K.framebufferTextureLayer(K.DRAW_FRAMEBUFFER, K.COLOR_ATTACHMENT0, r.__webglTexture, a, m + e) : K.framebufferTexture2D(K.DRAW_FRAMEBUFFER, K.COLOR_ATTACHMENT0, K.TEXTURE_2D, r.__webglTexture, a), i === 0 ? T ? K.copyTexSubImage3D(v, a, f, p, m + e, l, u, o, s) : K.copyTexSubImage2D(v, a, f, p, l, u, o, s) : K.blitFramebuffer(l, u, o, s, f, p, o, s, K.COLOR_BUFFER_BIT, K.NEAREST);
				q.bindFramebuffer(K.READ_FRAMEBUFFER, null), q.bindFramebuffer(K.DRAW_FRAMEBUFFER, null);
			} else T ? e.isDataTexture || e.isData3DTexture ? K.texSubImage3D(v, a, f, p, m, o, s, c, g, _, h.data) : t.isCompressedArrayTexture ? K.compressedTexSubImage3D(v, a, f, p, m, o, s, c, g, h.data) : K.texSubImage3D(v, a, f, p, m, o, s, c, g, _, h) : e.isDataTexture ? K.texSubImage2D(K.TEXTURE_2D, a, f, p, o, s, g, _, h.data) : e.isCompressedTexture ? K.compressedTexSubImage2D(K.TEXTURE_2D, a, f, p, h.width, h.height, g, h.data) : K.texSubImage2D(K.TEXTURE_2D, a, f, p, o, s, g, _, h);
			q.pixelStorei(K.UNPACK_ROW_LENGTH, y), q.pixelStorei(K.UNPACK_IMAGE_HEIGHT, b), q.pixelStorei(K.UNPACK_SKIP_PIXELS, x), q.pixelStorei(K.UNPACK_SKIP_ROWS, S), q.pixelStorei(K.UNPACK_SKIP_IMAGES, C), a === 0 && t.generateMipmaps && K.generateMipmap(v), q.unbindTexture();
		}, this.initRenderTarget = function(e) {
			ze.get(e).__webglFramebuffer === void 0 && Be.setupRenderTarget(e);
		}, this.initTexture = function(e) {
			e.isCubeTexture ? Be.setTextureCube(e, 0) : e.isData3DTexture ? Be.setTexture3D(e, 0) : e.isDataArrayTexture || e.isCompressedArrayTexture ? Be.setTexture2DArray(e, 0) : Be.setTexture2D(e, 0), q.unbindTexture();
		}, this.resetState = function() {
			se = 0, ce = 0, le = null, q.reset(), nt.reset();
		}, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
	}
	get coordinateSystem() {
		return F;
	}
	get outputColorSpace() {
		return this._outputColorSpace;
	}
	set outputColorSpace(e) {
		this._outputColorSpace = e;
		let t = this.getContext();
		t.drawingBufferColorSpace = Se._getDrawingBufferColorSpace(e), t.unpackColorSpace = Se._getUnpackColorSpace();
	}
}, Ql = {
	name: "CopyShader",
	uniforms: {
		tDiffuse: { value: null },
		opacity: { value: 1 }
	},
	vertexShader: "\n\n		varying vec2 vUv;\n\n		void main() {\n\n			vUv = uv;\n			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n		}",
	fragmentShader: "\n\n		uniform float opacity;\n\n		uniform sampler2D tDiffuse;\n\n		varying vec2 vUv;\n\n		void main() {\n\n			vec4 texel = texture2D( tDiffuse, vUv );\n			gl_FragColor = opacity * texel;\n\n\n		}"
}, $l = class {
	constructor() {
		this.isPass = !0, this.enabled = !0, this.needsSwap = !0, this.clear = !1, this.renderToScreen = !1;
	}
	setSize() {}
	render() {
		console.error("THREE.Pass: .render() must be implemented in derived pass.");
	}
	dispose() {}
}, eu = new uo(-1, 1, 1, -1, 0, 1), tu = new class extends pn {
	constructor() {
		super(), this.setAttribute("position", new Y([
			-1,
			3,
			0,
			-1,
			-1,
			0,
			3,
			-1,
			0
		], 3)), this.setAttribute("uv", new Y([
			0,
			2,
			0,
			0,
			2,
			0
		], 2));
	}
}(), nu = class {
	constructor(e) {
		this._mesh = new X(tu, e);
	}
	dispose() {
		this._mesh.geometry.dispose();
	}
	render(e) {
		e.render(this._mesh, eu);
	}
	get material() {
		return this._mesh.material;
	}
	set material(e) {
		this._mesh.material = e;
	}
}, ru = class extends $l {
	constructor(e, t = "tDiffuse") {
		super(), this.textureID = t, this.uniforms = null, this.material = null, e instanceof ma ? (this.uniforms = e.uniforms, this.material = e) : e && (this.uniforms = da.clone(e.uniforms), this.material = new ma({
			name: e.name === void 0 ? "unspecified" : e.name,
			defines: Object.assign({}, e.defines),
			uniforms: this.uniforms,
			vertexShader: e.vertexShader,
			fragmentShader: e.fragmentShader
		})), this._fsQuad = new nu(this.material);
	}
	render(e, t, n) {
		this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = n.texture), this._fsQuad.material = this.material, this.renderToScreen ? (e.setRenderTarget(null), this._fsQuad.render(e)) : (e.setRenderTarget(t), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), this._fsQuad.render(e));
	}
	dispose() {
		this.material.dispose(), this._fsQuad.dispose();
	}
}, iu = class extends $l {
	constructor(e, t) {
		super(), this.scene = e, this.camera = t, this.clear = !0, this.needsSwap = !1, this.inverse = !1;
	}
	render(e, t, n) {
		let r = e.getContext(), i = e.state;
		i.buffers.color.setMask(!1), i.buffers.depth.setMask(!1), i.buffers.color.setLocked(!0), i.buffers.depth.setLocked(!0);
		let a, o;
		this.inverse ? (a = 0, o = 1) : (a = 1, o = 0), i.buffers.stencil.setTest(!0), i.buffers.stencil.setOp(r.REPLACE, r.REPLACE, r.REPLACE), i.buffers.stencil.setFunc(r.ALWAYS, a, 4294967295), i.buffers.stencil.setClear(o), i.buffers.stencil.setLocked(!0), e.setRenderTarget(n), this.clear && e.clear(), e.render(this.scene, this.camera), e.setRenderTarget(t), this.clear && e.clear(), e.render(this.scene, this.camera), i.buffers.color.setLocked(!1), i.buffers.depth.setLocked(!1), i.buffers.color.setMask(!0), i.buffers.depth.setMask(!0), i.buffers.stencil.setLocked(!1), i.buffers.stencil.setFunc(r.EQUAL, 1, 4294967295), i.buffers.stencil.setOp(r.KEEP, r.KEEP, r.KEEP), i.buffers.stencil.setLocked(!0);
	}
}, au = class extends $l {
	constructor() {
		super(), this.needsSwap = !1;
	}
	render(e) {
		e.state.buffers.stencil.setLocked(!1), e.state.buffers.stencil.setTest(!1);
	}
}, ou = class {
	constructor(e, t) {
		if (this.renderer = e, this._pixelRatio = e.getPixelRatio(), t === void 0) {
			let n = e.getSize(new U());
			this._width = n.width, this._height = n.height, t = new Pe(this._width * this._pixelRatio, this._height * this._pixelRatio, { type: u }), t.texture.name = "EffectComposer.rt1";
		} else this._width = t.width, this._height = t.height;
		this.renderTarget1 = t, this.renderTarget2 = t.clone(), this.renderTarget2.texture.name = "EffectComposer.rt2", this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2, this.renderToScreen = !0, this.passes = [], this.copyPass = new ru(Ql), this.copyPass.material.blending = 0, this.timer = new vo();
	}
	swapBuffers() {
		let e = this.readBuffer;
		this.readBuffer = this.writeBuffer, this.writeBuffer = e;
	}
	addPass(e) {
		this.passes.push(e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
	}
	insertPass(e, t) {
		this.passes.splice(t, 0, e), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
	}
	removePass(e) {
		let t = this.passes.indexOf(e);
		t !== -1 && this.passes.splice(t, 1);
	}
	isLastEnabledPass(e) {
		for (let t = e + 1; t < this.passes.length; t++) if (this.passes[t].enabled) return !1;
		return !0;
	}
	render(e) {
		this.timer.update(), e === void 0 && (e = this.timer.getDelta());
		let t = this.renderer.getRenderTarget(), n = !1;
		for (let t = 0, r = this.passes.length; t < r; t++) {
			let r = this.passes[t];
			if (r.enabled !== !1) {
				if (r.renderToScreen = this.renderToScreen && this.isLastEnabledPass(t), r.render(this.renderer, this.writeBuffer, this.readBuffer, e, n), r.needsSwap) {
					if (n) {
						let t = this.renderer.getContext(), n = this.renderer.state.buffers.stencil;
						n.setFunc(t.NOTEQUAL, 1, 4294967295), this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, e), n.setFunc(t.EQUAL, 1, 4294967295);
					}
					this.swapBuffers();
				}
				iu !== void 0 && (r instanceof iu ? n = !0 : r instanceof au && (n = !1));
			}
		}
		this.renderer.setRenderTarget(t);
	}
	reset(e) {
		if (e === void 0) {
			let t = this.renderer.getSize(new U());
			this._pixelRatio = this.renderer.getPixelRatio(), this._width = t.width, this._height = t.height, e = this.renderTarget1.clone(), e.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
		}
		this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.renderTarget1 = e, this.renderTarget2 = e.clone(), this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2;
	}
	setSize(e, t) {
		this._width = e, this._height = t;
		let n = this._width * this._pixelRatio, r = this._height * this._pixelRatio;
		this.renderTarget1.setSize(n, r), this.renderTarget2.setSize(n, r);
		for (let e = 0; e < this.passes.length; e++) this.passes[e].setSize(n, r);
	}
	setPixelRatio(e) {
		this._pixelRatio = e, this.setSize(this._width, this._height);
	}
	dispose() {
		this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.copyPass.dispose();
	}
}, su = class extends $l {
	constructor(e, t, n = null, r = null, i = null) {
		super(), this.scene = e, this.camera = t, this.overrideMaterial = n, this.clearColor = r, this.clearAlpha = i, this.clear = !0, this.clearDepth = !1, this.needsSwap = !1, this.isRenderPass = !0, this._oldClearColor = new J();
	}
	render(e, t, n) {
		let r = e.autoClear;
		e.autoClear = !1;
		let i, a;
		this.overrideMaterial !== null && (a = this.scene.overrideMaterial, this.scene.overrideMaterial = this.overrideMaterial), this.clearColor !== null && (e.getClearColor(this._oldClearColor), e.setClearColor(this.clearColor, e.getClearAlpha())), this.clearAlpha !== null && (i = e.getClearAlpha(), e.setClearAlpha(this.clearAlpha)), this.clearDepth == 1 && e.clearDepth(), e.setRenderTarget(this.renderToScreen ? null : n), this.clear === !0 && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), e.render(this.scene, this.camera), this.clearColor !== null && e.setClearColor(this._oldClearColor), this.clearAlpha !== null && e.setClearAlpha(i), this.overrideMaterial !== null && (this.scene.overrideMaterial = a), e.autoClear = r;
	}
}, cu = {
	name: "LuminosityHighPassShader",
	uniforms: {
		tDiffuse: { value: null },
		luminosityThreshold: { value: 1 },
		smoothWidth: { value: 1 },
		defaultColor: { value: new J(0) },
		defaultOpacity: { value: 0 }
	},
	vertexShader: "\n\n		varying vec2 vUv;\n\n		void main() {\n\n			vUv = uv;\n\n			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n		}",
	fragmentShader: "\n\n		uniform sampler2D tDiffuse;\n		uniform vec3 defaultColor;\n		uniform float defaultOpacity;\n		uniform float luminosityThreshold;\n		uniform float smoothWidth;\n\n		varying vec2 vUv;\n\n		void main() {\n\n			vec4 texel = texture2D( tDiffuse, vUv );\n\n			float v = luminance( texel.xyz );\n\n			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );\n\n			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );\n\n			gl_FragColor = mix( outputColor, texel, alpha );\n\n		}"
}, lu = class e extends $l {
	constructor(e, t = 1, n, r) {
		super(), this.strength = t, this.radius = n, this.threshold = r, this.resolution = e === void 0 ? new U(256, 256) : new U(e.x, e.y), this.clearColor = new J(0, 0, 0), this.needsSwap = !1, this.renderTargetsHorizontal = [], this.renderTargetsVertical = [], this.nMips = 5;
		let i = Math.round(this.resolution.x / 2), a = Math.round(this.resolution.y / 2);
		this.renderTargetBright = new Pe(i, a, {
			type: u,
			depthBuffer: !1
		}), this.renderTargetBright.texture.name = "UnrealBloomPass.bright", this.renderTargetBright.texture.generateMipmaps = !1;
		for (let e = 0; e < this.nMips; e++) {
			let t = new Pe(i, a, {
				type: u,
				depthBuffer: !1
			});
			t.texture.name = "UnrealBloomPass.h" + e, t.texture.generateMipmaps = !1, this.renderTargetsHorizontal.push(t);
			let n = new Pe(i, a, {
				type: u,
				depthBuffer: !1
			});
			n.texture.name = "UnrealBloomPass.v" + e, n.texture.generateMipmaps = !1, this.renderTargetsVertical.push(n), i = Math.round(i / 2), a = Math.round(a / 2);
		}
		let o = cu;
		this.highPassUniforms = da.clone(o.uniforms), this.highPassUniforms.luminosityThreshold.value = r, this.highPassUniforms.smoothWidth.value = .01, this.materialHighPassFilter = new ma({
			uniforms: this.highPassUniforms,
			vertexShader: o.vertexShader,
			fragmentShader: o.fragmentShader
		}), this.separableBlurMaterials = [];
		let s = [
			6,
			10,
			14,
			18,
			22
		];
		i = Math.round(this.resolution.x / 2), a = Math.round(this.resolution.y / 2);
		for (let e = 0; e < this.nMips; e++) this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])), this.separableBlurMaterials[e].uniforms.invSize.value = new U(1 / i, 1 / a), i = Math.round(i / 2), a = Math.round(a / 2);
		this.compositeMaterial = this._getCompositeMaterial(this.nMips), this.compositeMaterial.uniforms.blurTexture1.value = this.renderTargetsVertical[0].texture, this.compositeMaterial.uniforms.blurTexture2.value = this.renderTargetsVertical[1].texture, this.compositeMaterial.uniforms.blurTexture3.value = this.renderTargetsVertical[2].texture, this.compositeMaterial.uniforms.blurTexture4.value = this.renderTargetsVertical[3].texture, this.compositeMaterial.uniforms.blurTexture5.value = this.renderTargetsVertical[4].texture, this.compositeMaterial.uniforms.bloomStrength.value = t, this.compositeMaterial.uniforms.bloomRadius.value = .1;
		let c = [
			1,
			.8,
			.6,
			.4,
			.2
		];
		this.compositeMaterial.uniforms.bloomFactors.value = c, this.bloomTintColors = [
			new W(1, 1, 1),
			new W(1, 1, 1),
			new W(1, 1, 1),
			new W(1, 1, 1),
			new W(1, 1, 1)
		], this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors, this.copyUniforms = da.clone(Ql.uniforms), this.blendMaterial = new ma({
			uniforms: this.copyUniforms,
			vertexShader: Ql.vertexShader,
			fragmentShader: Ql.fragmentShader,
			premultipliedAlpha: !0,
			blending: 2,
			depthTest: !1,
			depthWrite: !1,
			transparent: !0
		}), this._oldClearColor = new J(), this._oldClearAlpha = 1, this._basic = new Wn(), this._fsQuad = new nu(null);
	}
	dispose() {
		for (let e = 0; e < this.renderTargetsHorizontal.length; e++) this.renderTargetsHorizontal[e].dispose();
		for (let e = 0; e < this.renderTargetsVertical.length; e++) this.renderTargetsVertical[e].dispose();
		this.renderTargetBright.dispose();
		for (let e = 0; e < this.separableBlurMaterials.length; e++) this.separableBlurMaterials[e].dispose();
		this.compositeMaterial.dispose(), this.blendMaterial.dispose(), this._basic.dispose(), this._fsQuad.dispose();
	}
	setSize(e, t) {
		let n = Math.round(e / 2), r = Math.round(t / 2);
		this.renderTargetBright.setSize(n, r);
		for (let e = 0; e < this.nMips; e++) this.renderTargetsHorizontal[e].setSize(n, r), this.renderTargetsVertical[e].setSize(n, r), this.separableBlurMaterials[e].uniforms.invSize.value = new U(1 / n, 1 / r), n = Math.round(n / 2), r = Math.round(r / 2);
	}
	render(t, n, r, i, a) {
		t.getClearColor(this._oldClearColor), this._oldClearAlpha = t.getClearAlpha();
		let o = t.autoClear;
		t.autoClear = !1, t.setClearColor(this.clearColor, 0), a && t.state.buffers.stencil.setTest(!1), this.renderToScreen && (this._fsQuad.material = this._basic, this._basic.map = r.texture, t.setRenderTarget(null), t.clear(), this._fsQuad.render(t)), this.highPassUniforms.tDiffuse.value = r.texture, this.highPassUniforms.luminosityThreshold.value = this.threshold, this._fsQuad.material = this.materialHighPassFilter, t.setRenderTarget(this.renderTargetBright), t.clear(), this._fsQuad.render(t);
		let s = this.renderTargetBright;
		for (let n = 0; n < this.nMips; n++) this._fsQuad.material = this.separableBlurMaterials[n], this.separableBlurMaterials[n].uniforms.colorTexture.value = s.texture, this.separableBlurMaterials[n].uniforms.direction.value = e.BlurDirectionX, t.setRenderTarget(this.renderTargetsHorizontal[n]), t.clear(), this._fsQuad.render(t), this.separableBlurMaterials[n].uniforms.colorTexture.value = this.renderTargetsHorizontal[n].texture, this.separableBlurMaterials[n].uniforms.direction.value = e.BlurDirectionY, t.setRenderTarget(this.renderTargetsVertical[n]), t.clear(), this._fsQuad.render(t), s = this.renderTargetsVertical[n];
		this._fsQuad.material = this.compositeMaterial, this.compositeMaterial.uniforms.bloomStrength.value = this.strength, this.compositeMaterial.uniforms.bloomRadius.value = this.radius, this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors, t.setRenderTarget(this.renderTargetsHorizontal[0]), t.clear(), this._fsQuad.render(t), this._fsQuad.material = this.blendMaterial, this.copyUniforms.tDiffuse.value = this.renderTargetsHorizontal[0].texture, a && t.state.buffers.stencil.setTest(!0), this.renderToScreen ? (t.setRenderTarget(null), this._fsQuad.render(t)) : (t.setRenderTarget(r), this._fsQuad.render(t)), t.setClearColor(this._oldClearColor, this._oldClearAlpha), t.autoClear = o;
	}
	_getSeparableBlurMaterial(e) {
		let t = [], n = e / 3;
		for (let r = 0; r < e; r++) t.push(.39894 * Math.exp(-.5 * r * r / (n * n)) / n);
		let r = [], i = [];
		for (let n = 1; n < e; n += 2) {
			let a = t[n], o = n + 1 < e ? t[n + 1] : 0, s = a + o;
			r.push((n * a + (n + 1) * o) / s), i.push(s);
		}
		return new ma({
			defines: { KERNEL_PAIRS: r.length },
			uniforms: {
				colorTexture: { value: null },
				invSize: { value: new U(.5, .5) },
				direction: { value: new U(.5, .5) },
				centerWeight: { value: t[0] },
				gaussianOffsets: { value: r },
				gaussianWeights: { value: i }
			},
			vertexShader: "\n\n				varying vec2 vUv;\n\n				void main() {\n\n					vUv = uv;\n					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n				}",
			fragmentShader: "\n\n				#include <common>\n\n				varying vec2 vUv;\n\n				uniform sampler2D colorTexture;\n				uniform vec2 invSize;\n				uniform vec2 direction;\n				uniform float centerWeight;\n				uniform float gaussianOffsets[KERNEL_PAIRS];\n				uniform float gaussianWeights[KERNEL_PAIRS];\n\n				void main() {\n\n					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;\n\n					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {\n\n						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];\n						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;\n						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;\n						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];\n\n					}\n\n					gl_FragColor = vec4( diffuseSum, 1.0 );\n\n				}"
		});
	}
	_getCompositeMaterial(e) {
		return new ma({
			defines: { NUM_MIPS: e },
			uniforms: {
				blurTexture1: { value: null },
				blurTexture2: { value: null },
				blurTexture3: { value: null },
				blurTexture4: { value: null },
				blurTexture5: { value: null },
				bloomStrength: { value: 1 },
				bloomFactors: { value: null },
				bloomTintColors: { value: null },
				bloomRadius: { value: 0 }
			},
			vertexShader: "\n\n				varying vec2 vUv;\n\n				void main() {\n\n					vUv = uv;\n					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n				}",
			fragmentShader: "\n\n				varying vec2 vUv;\n\n				uniform sampler2D blurTexture1;\n				uniform sampler2D blurTexture2;\n				uniform sampler2D blurTexture3;\n				uniform sampler2D blurTexture4;\n				uniform sampler2D blurTexture5;\n				uniform float bloomStrength;\n				uniform float bloomRadius;\n				uniform float bloomFactors[NUM_MIPS];\n				uniform vec3 bloomTintColors[NUM_MIPS];\n\n				float lerpBloomFactor( const in float factor ) {\n\n					float mirrorFactor = 1.2 - factor;\n					return mix( factor, mirrorFactor, bloomRadius );\n\n				}\n\n				void main() {\n\n					// 3.0 for backwards compatibility with previous alpha-based intensity\n					vec3 bloom = 3.0 * bloomStrength * (\n						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +\n						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +\n						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +\n						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +\n						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb\n					);\n\n					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );\n					gl_FragColor = vec4( bloom, bloomAlpha );\n\n				}"
		});
	}
};
lu.BlurDirectionX = new U(1, 0), lu.BlurDirectionY = new U(0, 1);
//#endregion
//#region node_modules/three/examples/jsm/shaders/OutputShader.js
var uu = {
	name: "OutputShader",
	uniforms: {
		tDiffuse: { value: null },
		toneMappingExposure: { value: 1 }
	},
	vertexShader: "\n		precision highp float;\n\n		uniform mat4 modelViewMatrix;\n		uniform mat4 projectionMatrix;\n\n		attribute vec3 position;\n		attribute vec2 uv;\n\n		varying vec2 vUv;\n\n		void main() {\n\n			vUv = uv;\n			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n		}",
	fragmentShader: "\n\n		precision highp float;\n\n		uniform sampler2D tDiffuse;\n\n		#include <tonemapping_pars_fragment>\n		#include <colorspace_pars_fragment>\n\n		varying vec2 vUv;\n\n		void main() {\n\n			gl_FragColor = texture2D( tDiffuse, vUv );\n\n			// tone mapping\n\n			#ifdef LINEAR_TONE_MAPPING\n\n				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );\n\n			#elif defined( REINHARD_TONE_MAPPING )\n\n				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );\n\n			#elif defined( CINEON_TONE_MAPPING )\n\n				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );\n\n			#elif defined( ACES_FILMIC_TONE_MAPPING )\n\n				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );\n\n			#elif defined( AGX_TONE_MAPPING )\n\n				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );\n\n			#elif defined( NEUTRAL_TONE_MAPPING )\n\n				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );\n\n			#elif defined( CUSTOM_TONE_MAPPING )\n\n				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );\n\n			#endif\n\n			// color space\n\n			#ifdef SRGB_TRANSFER\n\n				gl_FragColor = sRGBTransferOETF( gl_FragColor );\n\n			#endif\n\n		}"
}, du = class extends $l {
	constructor() {
		super(), this.isOutputPass = !0, this.uniforms = da.clone(uu.uniforms), this.material = new ha({
			name: uu.name,
			uniforms: this.uniforms,
			vertexShader: uu.vertexShader,
			fragmentShader: uu.fragmentShader
		}), this._fsQuad = new nu(this.material), this._outputColorSpace = null, this._toneMapping = null;
	}
	render(e, t, n) {
		this.uniforms.tDiffuse.value = n.texture, this.uniforms.toneMappingExposure.value = e.toneMappingExposure, (this._outputColorSpace !== e.outputColorSpace || this._toneMapping !== e.toneMapping) && (this._outputColorSpace = e.outputColorSpace, this._toneMapping = e.toneMapping, this.material.defines = {}, Se.getTransfer(this._outputColorSpace) === "srgb" && (this.material.defines.SRGB_TRANSFER = ""), this._toneMapping === 1 ? this.material.defines.LINEAR_TONE_MAPPING = "" : this._toneMapping === 2 ? this.material.defines.REINHARD_TONE_MAPPING = "" : this._toneMapping === 3 ? this.material.defines.CINEON_TONE_MAPPING = "" : this._toneMapping === 4 ? this.material.defines.ACES_FILMIC_TONE_MAPPING = "" : this._toneMapping === 6 ? this.material.defines.AGX_TONE_MAPPING = "" : this._toneMapping === 7 ? this.material.defines.NEUTRAL_TONE_MAPPING = "" : this._toneMapping === 5 && (this.material.defines.CUSTOM_TONE_MAPPING = ""), this.material.needsUpdate = !0), this.renderToScreen === !0 ? (e.setRenderTarget(null), this._fsQuad.render(e)) : (e.setRenderTarget(t), this.clear && e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil), this._fsQuad.render(e));
	}
	dispose() {
		this.material.dispose(), this._fsQuad.dispose();
	}
}, fu = {
	name: "SMAAEdgesShader",
	defines: { SMAA_THRESHOLD: "0.1" },
	uniforms: {
		tDiffuse: { value: null },
		resolution: { value: new U(1 / 1024, 1 / 512) }
	},
	vertexShader: "\n\n		uniform vec2 resolution;\n\n		varying vec2 vUv;\n		varying vec4 vOffset[ 3 ];\n\n		void SMAAEdgeDetectionVS( vec2 texcoord ) {\n			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0,  1.0 ); // WebGL port note: Changed sign in W component\n			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4(  1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component\n			vOffset[ 2 ] = texcoord.xyxy + resolution.xyxy * vec4( -2.0, 0.0, 0.0,  2.0 ); // WebGL port note: Changed sign in W component\n		}\n\n		void main() {\n\n			vUv = uv;\n\n			SMAAEdgeDetectionVS( vUv );\n\n			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n		}",
	fragmentShader: "\n\n		uniform sampler2D tDiffuse;\n\n		varying vec2 vUv;\n		varying vec4 vOffset[ 3 ];\n\n		vec4 SMAAColorEdgeDetectionPS( vec2 texcoord, vec4 offset[3], sampler2D colorTex ) {\n			vec2 threshold = vec2( SMAA_THRESHOLD, SMAA_THRESHOLD );\n\n			// Calculate color deltas:\n			vec4 delta;\n			vec3 C = texture2D( colorTex, texcoord ).rgb;\n\n			vec3 Cleft = texture2D( colorTex, offset[0].xy ).rgb;\n			vec3 t = abs( C - Cleft );\n			delta.x = max( max( t.r, t.g ), t.b );\n\n			vec3 Ctop = texture2D( colorTex, offset[0].zw ).rgb;\n			t = abs( C - Ctop );\n			delta.y = max( max( t.r, t.g ), t.b );\n\n			// We do the usual threshold:\n			vec2 edges = step( threshold, delta.xy );\n\n			// Then discard if there is no edge:\n			if ( dot( edges, vec2( 1.0, 1.0 ) ) == 0.0 )\n				discard;\n\n			// Calculate right and bottom deltas:\n			vec3 Cright = texture2D( colorTex, offset[1].xy ).rgb;\n			t = abs( C - Cright );\n			delta.z = max( max( t.r, t.g ), t.b );\n\n			vec3 Cbottom  = texture2D( colorTex, offset[1].zw ).rgb;\n			t = abs( C - Cbottom );\n			delta.w = max( max( t.r, t.g ), t.b );\n\n			// Calculate the maximum delta in the direct neighborhood:\n			float maxDelta = max( max( max( delta.x, delta.y ), delta.z ), delta.w );\n\n			// Calculate left-left and top-top deltas:\n			vec3 Cleftleft  = texture2D( colorTex, offset[2].xy ).rgb;\n			t = abs( C - Cleftleft );\n			delta.z = max( max( t.r, t.g ), t.b );\n\n			vec3 Ctoptop = texture2D( colorTex, offset[2].zw ).rgb;\n			t = abs( C - Ctoptop );\n			delta.w = max( max( t.r, t.g ), t.b );\n\n			// Calculate the final maximum delta:\n			maxDelta = max( max( maxDelta, delta.z ), delta.w );\n\n			// Local contrast adaptation in action:\n			edges.xy *= step( 0.5 * maxDelta, delta.xy );\n\n			return vec4( edges, 0.0, 0.0 );\n		}\n\n		void main() {\n\n			gl_FragColor = SMAAColorEdgeDetectionPS( vUv, vOffset, tDiffuse );\n\n		}"
}, pu = {
	name: "SMAAWeightsShader",
	defines: {
		SMAA_MAX_SEARCH_STEPS: "8",
		SMAA_AREATEX_MAX_DISTANCE: "16",
		SMAA_AREATEX_PIXEL_SIZE: "( 1.0 / vec2( 160.0, 560.0 ) )",
		SMAA_AREATEX_SUBTEX_SIZE: "( 1.0 / 7.0 )"
	},
	uniforms: {
		tDiffuse: { value: null },
		tArea: { value: null },
		tSearch: { value: null },
		resolution: { value: new U(1 / 1024, 1 / 512) }
	},
	vertexShader: "\n\n		uniform vec2 resolution;\n\n		varying vec2 vUv;\n		varying vec4 vOffset[ 3 ];\n		varying vec2 vPixcoord;\n\n		void SMAABlendingWeightCalculationVS( vec2 texcoord ) {\n			vPixcoord = texcoord / resolution;\n\n			// We will use these offsets for the searches later on (see @PSEUDO_GATHER4):\n			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.25, 0.125, 1.25, 0.125 ); // WebGL port note: Changed sign in Y and W components\n			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.125, 0.25, -0.125, -1.25 ); // WebGL port note: Changed sign in Y and W components\n\n			// And these for the searches, they indicate the ends of the loops:\n			vOffset[ 2 ] = vec4( vOffset[ 0 ].xz, vOffset[ 1 ].yw ) + vec4( -2.0, 2.0, -2.0, 2.0 ) * resolution.xxyy * float( SMAA_MAX_SEARCH_STEPS );\n\n		}\n\n		void main() {\n\n			vUv = uv;\n\n			SMAABlendingWeightCalculationVS( vUv );\n\n			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n		}",
	fragmentShader: "\n\n		#define SMAASampleLevelZeroOffset( tex, coord, offset ) texture2D( tex, coord + float( offset ) * resolution, 0.0 )\n\n		uniform sampler2D tDiffuse;\n		uniform sampler2D tArea;\n		uniform sampler2D tSearch;\n		uniform vec2 resolution;\n\n		varying vec2 vUv;\n		varying vec4 vOffset[3];\n		varying vec2 vPixcoord;\n\n		#if __VERSION__ == 100\n		vec2 round( vec2 x ) {\n			return sign( x ) * floor( abs( x ) + 0.5 );\n		}\n		#endif\n\n		float SMAASearchLength( sampler2D searchTex, vec2 e, float bias, float scale ) {\n			// Not required if searchTex accesses are set to point:\n			// float2 SEARCH_TEX_PIXEL_SIZE = 1.0 / float2(66.0, 33.0);\n			// e = float2(bias, 0.0) + 0.5 * SEARCH_TEX_PIXEL_SIZE +\n			//     e * float2(scale, 1.0) * float2(64.0, 32.0) * SEARCH_TEX_PIXEL_SIZE;\n			e.r = bias + e.r * scale;\n			return 255.0 * texture2D( searchTex, e, 0.0 ).r;\n		}\n\n		float SMAASearchXLeft( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {\n			/**\n				* @PSEUDO_GATHER4\n				* This texcoord has been offset by (-0.25, -0.125) in the vertex shader to\n				* sample between edge, thus fetching four edges in a row.\n				* Sampling with different offsets in each direction allows to disambiguate\n				* which edges are active from the four fetched ones.\n				*/\n			vec2 e = vec2( 0.0, 1.0 );\n\n			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for\n				e = texture2D( edgesTex, texcoord, 0.0 ).rg;\n				texcoord -= vec2( 2.0, 0.0 ) * resolution;\n				if ( ! ( texcoord.x > end && e.g > 0.8281 && e.r == 0.0 ) ) break;\n			}\n\n			// We correct the previous (-0.25, -0.125) offset we applied:\n			texcoord.x += 0.25 * resolution.x;\n\n			// The searches are bias by 1, so adjust the coords accordingly:\n			texcoord.x += resolution.x;\n\n			// Disambiguate the length added by the last step:\n			texcoord.x += 2.0 * resolution.x; // Undo last step\n			texcoord.x -= resolution.x * SMAASearchLength(searchTex, e, 0.0, 0.5);\n\n			return texcoord.x;\n		}\n\n		float SMAASearchXRight( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {\n			vec2 e = vec2( 0.0, 1.0 );\n\n			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for\n				e = texture2D( edgesTex, texcoord, 0.0 ).rg;\n				texcoord += vec2( 2.0, 0.0 ) * resolution;\n				if ( ! ( texcoord.x < end && e.g > 0.8281 && e.r == 0.0 ) ) break;\n			}\n\n			texcoord.x -= 0.25 * resolution.x;\n			texcoord.x -= resolution.x;\n			texcoord.x -= 2.0 * resolution.x;\n			texcoord.x += resolution.x * SMAASearchLength( searchTex, e, 0.5, 0.5 );\n\n			return texcoord.x;\n		}\n\n		float SMAASearchYUp( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {\n			vec2 e = vec2( 1.0, 0.0 );\n\n			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for\n				e = texture2D( edgesTex, texcoord, 0.0 ).rg;\n				texcoord += vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign\n				if ( ! ( texcoord.y > end && e.r > 0.8281 && e.g == 0.0 ) ) break;\n			}\n\n			texcoord.y -= 0.25 * resolution.y; // WebGL port note: Changed sign\n			texcoord.y -= resolution.y; // WebGL port note: Changed sign\n			texcoord.y -= 2.0 * resolution.y; // WebGL port note: Changed sign\n			texcoord.y += resolution.y * SMAASearchLength( searchTex, e.gr, 0.0, 0.5 ); // WebGL port note: Changed sign\n\n			return texcoord.y;\n		}\n\n		float SMAASearchYDown( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {\n			vec2 e = vec2( 1.0, 0.0 );\n\n			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for\n				e = texture2D( edgesTex, texcoord, 0.0 ).rg;\n				texcoord -= vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign\n				if ( ! ( texcoord.y < end && e.r > 0.8281 && e.g == 0.0 ) ) break;\n			}\n\n			texcoord.y += 0.25 * resolution.y; // WebGL port note: Changed sign\n			texcoord.y += resolution.y; // WebGL port note: Changed sign\n			texcoord.y += 2.0 * resolution.y; // WebGL port note: Changed sign\n			texcoord.y -= resolution.y * SMAASearchLength( searchTex, e.gr, 0.5, 0.5 ); // WebGL port note: Changed sign\n\n			return texcoord.y;\n		}\n\n		vec2 SMAAArea( sampler2D areaTex, vec2 dist, float e1, float e2, float offset ) {\n			// Rounding prevents precision errors of bilinear filtering:\n			vec2 texcoord = float( SMAA_AREATEX_MAX_DISTANCE ) * round( 4.0 * vec2( e1, e2 ) ) + dist;\n\n			// We do a scale and bias for mapping to texel space:\n			texcoord = SMAA_AREATEX_PIXEL_SIZE * texcoord + ( 0.5 * SMAA_AREATEX_PIXEL_SIZE );\n\n			// Move to proper place, according to the subpixel offset:\n			texcoord.y += SMAA_AREATEX_SUBTEX_SIZE * offset;\n\n			return texture2D( areaTex, texcoord, 0.0 ).rg;\n		}\n\n		vec4 SMAABlendingWeightCalculationPS( vec2 texcoord, vec2 pixcoord, vec4 offset[ 3 ], sampler2D edgesTex, sampler2D areaTex, sampler2D searchTex, ivec4 subsampleIndices ) {\n			vec4 weights = vec4( 0.0, 0.0, 0.0, 0.0 );\n\n			vec2 e = texture2D( edgesTex, texcoord ).rg;\n\n			if ( e.g > 0.0 ) { // Edge at north\n				vec2 d;\n\n				// Find the distance to the left:\n				vec2 coords;\n				coords.x = SMAASearchXLeft( edgesTex, searchTex, offset[ 0 ].xy, offset[ 2 ].x );\n				coords.y = offset[ 1 ].y; // offset[1].y = texcoord.y - 0.25 * resolution.y (@CROSSING_OFFSET)\n				d.x = coords.x;\n\n				// Now fetch the left crossing edges, two at a time using bilinear\n				// filtering. Sampling at -0.25 (see @CROSSING_OFFSET) enables to\n				// discern what value each edge has:\n				float e1 = texture2D( edgesTex, coords, 0.0 ).r;\n\n				// Find the distance to the right:\n				coords.x = SMAASearchXRight( edgesTex, searchTex, offset[ 0 ].zw, offset[ 2 ].y );\n				d.y = coords.x;\n\n				// We want the distances to be in pixel units (doing this here allow to\n				// better interleave arithmetic and memory accesses):\n				d = d / resolution.x - pixcoord.x;\n\n				// SMAAArea below needs a sqrt, as the areas texture is compressed\n				// quadratically:\n				vec2 sqrt_d = sqrt( abs( d ) );\n\n				// Fetch the right crossing edges:\n				coords.y -= 1.0 * resolution.y; // WebGL port note: Added\n				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 1, 0 ) ).r;\n\n				// Ok, we know how this pattern looks like, now it is time for getting\n				// the actual area:\n				weights.rg = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.y ) );\n			}\n\n			if ( e.r > 0.0 ) { // Edge at west\n				vec2 d;\n\n				// Find the distance to the top:\n				vec2 coords;\n\n				coords.y = SMAASearchYUp( edgesTex, searchTex, offset[ 1 ].xy, offset[ 2 ].z );\n				coords.x = offset[ 0 ].x; // offset[1].x = texcoord.x - 0.25 * resolution.x;\n				d.x = coords.y;\n\n				// Fetch the top crossing edges:\n				float e1 = texture2D( edgesTex, coords, 0.0 ).g;\n\n				// Find the distance to the bottom:\n				coords.y = SMAASearchYDown( edgesTex, searchTex, offset[ 1 ].zw, offset[ 2 ].w );\n				d.y = coords.y;\n\n				// We want the distances to be in pixel units:\n				d = d / resolution.y - pixcoord.y;\n\n				// SMAAArea below needs a sqrt, as the areas texture is compressed\n				// quadratically:\n				vec2 sqrt_d = sqrt( abs( d ) );\n\n				// Fetch the bottom crossing edges:\n				coords.y -= 1.0 * resolution.y; // WebGL port note: Added\n				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 0, 1 ) ).g;\n\n				// Get the area for this direction:\n				weights.ba = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.x ) );\n			}\n\n			return weights;\n		}\n\n		void main() {\n\n			gl_FragColor = SMAABlendingWeightCalculationPS( vUv, vPixcoord, vOffset, tDiffuse, tArea, tSearch, ivec4( 0.0 ) );\n\n		}"
}, mu = {
	name: "SMAABlendShader",
	uniforms: {
		tDiffuse: { value: null },
		tColor: { value: null },
		resolution: { value: new U(1 / 1024, 1 / 512) }
	},
	vertexShader: "\n\n		uniform vec2 resolution;\n\n		varying vec2 vUv;\n		varying vec4 vOffset[ 2 ];\n\n		void SMAANeighborhoodBlendingVS( vec2 texcoord ) {\n			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0, 1.0 ); // WebGL port note: Changed sign in W component\n			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( 1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component\n		}\n\n		void main() {\n\n			vUv = uv;\n\n			SMAANeighborhoodBlendingVS( vUv );\n\n			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n		}",
	fragmentShader: "\n\n		uniform sampler2D tDiffuse;\n		uniform sampler2D tColor;\n		uniform vec2 resolution;\n\n		varying vec2 vUv;\n		varying vec4 vOffset[ 2 ];\n\n		vec4 SMAANeighborhoodBlendingPS( vec2 texcoord, vec4 offset[ 2 ], sampler2D colorTex, sampler2D blendTex ) {\n			// Fetch the blending weights for current pixel:\n			vec4 a;\n			a.xz = texture2D( blendTex, texcoord ).xz;\n			a.y = texture2D( blendTex, offset[ 1 ].zw ).g;\n			a.w = texture2D( blendTex, offset[ 1 ].xy ).a;\n\n			// Is there any blending weight with a value greater than 0.0?\n			if ( dot(a, vec4( 1.0, 1.0, 1.0, 1.0 )) < 1e-5 ) {\n				return texture2D( colorTex, texcoord, 0.0 );\n			} else {\n				// Up to 4 lines can be crossing a pixel (one through each edge). We\n				// favor blending by choosing the line with the maximum weight for each\n				// direction:\n				vec2 offset;\n				offset.x = a.a > a.b ? a.a : -a.b; // left vs. right\n				offset.y = a.g > a.r ? -a.g : a.r; // top vs. bottom // WebGL port note: Changed signs\n\n				// Then we go in the direction that has the maximum weight:\n				if ( abs( offset.x ) > abs( offset.y )) { // horizontal vs. vertical\n					offset.y = 0.0;\n				} else {\n					offset.x = 0.0;\n				}\n\n				// Fetch the opposite color and lerp by hand:\n				vec4 C = texture2D( colorTex, texcoord, 0.0 );\n				texcoord += sign( offset ) * resolution;\n				vec4 Cop = texture2D( colorTex, texcoord, 0.0 );\n				float s = abs( offset.x ) > abs( offset.y ) ? abs( offset.x ) : abs( offset.y );\n\n				// WebGL port note: Added gamma correction\n				C.xyz = pow(C.xyz, vec3(2.2));\n				Cop.xyz = pow(Cop.xyz, vec3(2.2));\n				vec4 mixed = mix(C, Cop, s);\n				mixed.xyz = pow(mixed.xyz, vec3(1.0 / 2.2));\n\n				return mixed;\n			}\n		}\n\n		void main() {\n\n			gl_FragColor = SMAANeighborhoodBlendingPS( vUv, vOffset, tColor, tDiffuse );\n\n		}"
}, hu = class extends $l {
	constructor() {
		super(), this._edgesRT = new Pe(1, 1, {
			depthBuffer: !1,
			type: u
		}), this._edgesRT.texture.name = "SMAAPass.edges", this._weightsRT = new Pe(1, 1, {
			depthBuffer: !1,
			type: u
		}), this._weightsRT.texture.name = "SMAAPass.weights";
		let e = this, t = new Image();
		t.src = this._getAreaTexture(), t.onload = function() {
			e._areaTexture.needsUpdate = !0;
		}, this._areaTexture = new K(), this._areaTexture.name = "SMAAPass.area", this._areaTexture.image = t, this._areaTexture.minFilter = i, this._areaTexture.generateMipmaps = !1, this._areaTexture.flipY = !1;
		let n = new Image();
		n.src = this._getSearchTexture(), n.onload = function() {
			e._searchTexture.needsUpdate = !0;
		}, this._searchTexture = new K(), this._searchTexture.name = "SMAAPass.search", this._searchTexture.image = n, this._searchTexture.magFilter = r, this._searchTexture.minFilter = r, this._searchTexture.generateMipmaps = !1, this._searchTexture.flipY = !1, this._uniformsEdges = da.clone(fu.uniforms), this._materialEdges = new ma({
			defines: Object.assign({}, fu.defines),
			uniforms: this._uniformsEdges,
			vertexShader: fu.vertexShader,
			fragmentShader: fu.fragmentShader
		}), this._uniformsWeights = da.clone(pu.uniforms), this._uniformsWeights.tDiffuse.value = this._edgesRT.texture, this._uniformsWeights.tArea.value = this._areaTexture, this._uniformsWeights.tSearch.value = this._searchTexture, this._materialWeights = new ma({
			defines: Object.assign({}, pu.defines),
			uniforms: this._uniformsWeights,
			vertexShader: pu.vertexShader,
			fragmentShader: pu.fragmentShader
		}), this._uniformsBlend = da.clone(mu.uniforms), this._uniformsBlend.tDiffuse.value = this._weightsRT.texture, this._materialBlend = new ma({
			uniforms: this._uniformsBlend,
			vertexShader: mu.vertexShader,
			fragmentShader: mu.fragmentShader
		}), this._fsQuad = new nu(null);
	}
	render(e, t, n) {
		this._uniformsEdges.tDiffuse.value = n.texture, this._fsQuad.material = this._materialEdges, e.setRenderTarget(this._edgesRT), this.clear && e.clear(), this._fsQuad.render(e), this._fsQuad.material = this._materialWeights, e.setRenderTarget(this._weightsRT), this.clear && e.clear(), this._fsQuad.render(e), this._uniformsBlend.tColor.value = n.texture, this._fsQuad.material = this._materialBlend, this.renderToScreen ? (e.setRenderTarget(null), this._fsQuad.render(e)) : (e.setRenderTarget(t), this.clear && e.clear(), this._fsQuad.render(e));
	}
	setSize(e, t) {
		this._edgesRT.setSize(e, t), this._weightsRT.setSize(e, t), this._materialEdges.uniforms.resolution.value.set(1 / e, 1 / t), this._materialWeights.uniforms.resolution.value.set(1 / e, 1 / t), this._materialBlend.uniforms.resolution.value.set(1 / e, 1 / t);
	}
	dispose() {
		this._edgesRT.dispose(), this._weightsRT.dispose(), this._areaTexture.dispose(), this._searchTexture.dispose(), this._materialEdges.dispose(), this._materialWeights.dispose(), this._materialBlend.dispose(), this._fsQuad.dispose();
	}
	_getAreaTexture() {
		return "data:image/png;base64,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";
	}
	_getSearchTexture() {
		return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII=";
	}
}, gu = class e extends X {
	constructor(t, n = {}) {
		super(t), this.isReflector = !0, this.type = "Reflector", this.forceUpdate = !1, this._reflectionCameras = /* @__PURE__ */ new WeakMap();
		let r = this, i = n.color === void 0 ? new J(8355711) : new J(n.color), a = n.textureWidth || 512, o = n.textureHeight || 512, s = n.clipBias || 0, c = n.shader || e.ReflectorShader, l = n.multisample === void 0 ? 4 : n.multisample, d = new bn(), f = new W(), p = new W(), m = new W(), h = new Le(), g = new W(0, 0, -1), _ = new Me(), v = new W(), y = new W(), b = new Me(), x = new Le(), S = new Pe(a, o, {
			samples: l,
			type: u
		}), C = new ma({
			name: c.name === void 0 ? "unspecified" : c.name,
			uniforms: da.clone(c.uniforms),
			fragmentShader: c.fragmentShader,
			vertexShader: c.vertexShader
		});
		C.uniforms.tDiffuse.value = S.texture, C.uniforms.color.value = i, C.uniforms.textureMatrix.value = x, this.material = C, this.onBeforeRender = function(e, t, n) {
			let i = this.getReflectionCamera(n);
			if (p.setFromMatrixPosition(r.matrixWorld), m.setFromMatrixPosition(n.matrixWorld), h.extractRotation(r.matrixWorld), f.set(0, 0, 1), f.applyMatrix4(h), v.subVectors(p, m), v.dot(f) > 0 && this.forceUpdate === !1) return;
			v.reflect(f).negate(), v.add(p), h.extractRotation(n.matrixWorld), g.set(0, 0, -1), g.applyMatrix4(h), g.add(m), y.subVectors(p, g), y.reflect(f).negate(), y.add(p), i.position.copy(v), i.up.set(0, 1, 0), i.up.applyMatrix4(h), i.up.reflect(f), i.lookAt(y), i.far = n.far, i.updateMatrixWorld(), i.projectionMatrix.copy(n.projectionMatrix), x.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), x.multiply(i.projectionMatrix), x.multiply(i.matrixWorldInverse), x.multiply(r.matrixWorld), d.setFromNormalAndCoplanarPoint(f, p), d.applyMatrix4(i.matrixWorldInverse), _.set(d.normal.x, d.normal.y, d.normal.z, d.constant);
			let a = i.projectionMatrix;
			i.isOrthographicCamera ? (b.x = (Math.sign(_.x) + a.elements[8]) / a.elements[0], b.y = (Math.sign(_.y) + a.elements[9]) / a.elements[5], b.z = -n.far, b.w = 1) : (b.x = (Math.sign(_.x) + a.elements[8]) / a.elements[0], b.y = (Math.sign(_.y) + a.elements[9]) / a.elements[5], b.z = -1, b.w = (1 + a.elements[10]) / a.elements[14]), _.multiplyScalar(2 / _.dot(b)), a.elements[2] = _.x, a.elements[6] = _.y, i.isOrthographicCamera ? (a.elements[10] = _.z - s, a.elements[14] = _.w - 1) : (a.elements[10] = _.z + 1 - s, a.elements[14] = _.w), r.visible = !1;
			let o = e.getRenderTarget(), c = e.xr.enabled, l = e.shadowMap.autoUpdate;
			e.xr.enabled = !1, e.shadowMap.autoUpdate = !1, e.setRenderTarget(S), e.state.buffers.depth.setMask(!0), e.autoClear === !1 && e.clear(), e.render(t, i), e.xr.enabled = c, e.shadowMap.autoUpdate = l, e.setRenderTarget(o);
			let u = n.viewport;
			u !== void 0 && e.state.viewport(u), r.visible = !0, this.forceUpdate = !1;
		}, this.getRenderTarget = function() {
			return S;
		}, this.dispose = function() {
			S.dispose(), r.material.dispose();
		}, this.getReflectionCamera = function(e) {
			let t = this._reflectionCameras.get(e);
			return t === void 0 && (t = e.clone(), this._reflectionCameras.set(e, t)), t;
		};
	}
};
gu.ReflectorShader = {
	name: "ReflectorShader",
	uniforms: {
		color: { value: null },
		tDiffuse: { value: null },
		textureMatrix: { value: null }
	},
	vertexShader: "\n		uniform mat4 textureMatrix;\n		varying vec4 vUv;\n\n		#include <common>\n		#include <logdepthbuf_pars_vertex>\n\n		void main() {\n\n			vUv = textureMatrix * vec4( position, 1.0 );\n\n			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\n			#include <logdepthbuf_vertex>\n\n		}",
	fragmentShader: "\n		uniform vec3 color;\n		uniform sampler2D tDiffuse;\n		varying vec4 vUv;\n\n		#include <logdepthbuf_pars_fragment>\n\n		float blendOverlay( float base, float blend ) {\n\n			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );\n\n		}\n\n		vec3 blendOverlay( vec3 base, vec3 blend ) {\n\n			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );\n\n		}\n\n		void main() {\n\n			#include <logdepthbuf_fragment>\n\n			vec4 base = texture2DProj( tDiffuse, vUv );\n			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );\n\n			#include <tonemapping_fragment>\n			#include <colorspace_fragment>\n\n		}"
};
//#endregion
//#region node_modules/three/examples/jsm/environments/RoomEnvironment.js
var _u = class extends yt {
	constructor() {
		super(), this.name = "RoomEnvironment", this.position.y = -3.5;
		let e = new jr();
		e.deleteAttribute("uv");
		let t = new ga({ side: 1 }), n = new ga(), r = new lo(16777215, 900, 28, 2);
		r.position.set(.418, 16.199, .3), this.add(r);
		let i = new X(e, t);
		i.position.set(-.757, 13.219, .717), i.scale.set(31.713, 28.305, 28.591), this.add(i);
		let a = new pr(e, n, 6), o = new lt();
		o.position.set(-10.906, 2.009, 1.846), o.rotation.set(0, -.195, 0), o.scale.set(2.328, 7.905, 4.651), o.updateMatrix(), a.setMatrixAt(0, o.matrix), o.position.set(-5.607, -.754, -.758), o.rotation.set(0, .994, 0), o.scale.set(1.97, 1.534, 3.955), o.updateMatrix(), a.setMatrixAt(1, o.matrix), o.position.set(6.167, .857, 7.803), o.rotation.set(0, .561, 0), o.scale.set(3.927, 6.285, 3.687), o.updateMatrix(), a.setMatrixAt(2, o.matrix), o.position.set(-2.017, .018, 6.124), o.rotation.set(0, .333, 0), o.scale.set(2.002, 4.566, 2.064), o.updateMatrix(), a.setMatrixAt(3, o.matrix), o.position.set(2.291, -.756, -2.621), o.rotation.set(0, -.286, 0), o.scale.set(1.546, 1.552, 1.496), o.updateMatrix(), a.setMatrixAt(4, o.matrix), o.position.set(-2.193, -.369, -5.547), o.rotation.set(0, .516, 0), o.scale.set(3.875, 3.487, 2.986), o.updateMatrix(), a.setMatrixAt(5, o.matrix), this.add(a);
		let s = new X(e, vu(50));
		s.position.set(-16.116, 14.37, 8.208), s.scale.set(.1, 2.428, 2.739), this.add(s);
		let c = new X(e, vu(50));
		c.position.set(-16.109, 18.021, -8.207), c.scale.set(.1, 2.425, 2.751), this.add(c);
		let l = new X(e, vu(17));
		l.position.set(14.904, 12.198, -1.832), l.scale.set(.15, 4.265, 6.331), this.add(l);
		let u = new X(e, vu(43));
		u.position.set(-.462, 8.89, 14.52), u.scale.set(4.38, 5.441, .088), this.add(u);
		let d = new X(e, vu(20));
		d.position.set(3.235, 11.486, -12.541), d.scale.set(2.5, 2, .1), this.add(d);
		let f = new X(e, vu(100));
		f.position.set(0, 20, 0), f.scale.set(1, .1, 1), this.add(f);
	}
	dispose() {
		let e = /* @__PURE__ */ new Set();
		this.traverse((t) => {
			t.isMesh && (e.add(t.geometry), e.add(t.material));
		});
		for (let t of e) t.dispose();
	}
};
function vu(e) {
	return new _a({
		color: 0,
		emissive: 16777215,
		emissiveIntensity: e
	});
}
//#endregion
//#region node_modules/three/examples/jsm/utils/BufferGeometryUtils.js
function yu(e, t = !1) {
	let n = e[0].index !== null, r = new Set(Object.keys(e[0].attributes)), i = new Set(Object.keys(e[0].morphAttributes)), a = {}, o = {}, s = e[0].morphTargetsRelative, c = new pn(), l = 0;
	for (let u = 0; u < e.length; ++u) {
		let d = e[u], f = 0;
		if (n !== (d.index !== null)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."), null;
		for (let e in d.attributes) {
			if (!r.has(e)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". All geometries must have compatible attributes; make sure \"" + e + "\" attribute exists among all geometries, or in none of them."), null;
			a[e] === void 0 && (a[e] = []), a[e].push(d.attributes[e]), f++;
		}
		if (f !== r.size) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". Make sure all geometries have the same number of attributes."), null;
		if (s !== d.morphTargetsRelative) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". .morphTargetsRelative must be consistent throughout all geometries."), null;
		for (let e in d.morphAttributes) {
			if (!i.has(e)) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ".  .morphAttributes must be consistent throughout all geometries."), null;
			o[e] === void 0 && (o[e] = []), o[e].push(d.morphAttributes[e]);
		}
		if (t) {
			let e;
			if (n) e = d.index.count;
			else if (d.attributes.position !== void 0) e = d.attributes.position.count;
			else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + u + ". The geometry must have either an index or a position attribute"), null;
			c.addGroup(l, e, u), l += e;
		}
	}
	if (n) {
		let t = 0, n = [];
		for (let r = 0; r < e.length; ++r) {
			let i = e[r].index;
			for (let e = 0; e < i.count; ++e) n.push(i.getX(e) + t);
			t += e[r].attributes.position.count;
		}
		c.setIndex(n);
	}
	for (let e in a) {
		let t = bu(a[e]);
		if (!t) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " attribute."), null;
		c.setAttribute(e, t);
	}
	for (let e in o) {
		let t = o[e][0].length;
		if (t !== 0) {
			c.morphAttributes = c.morphAttributes || {}, c.morphAttributes[e] = [];
			for (let n = 0; n < t; ++n) {
				let t = [];
				for (let r = 0; r < o[e].length; ++r) t.push(o[e][r][n]);
				let r = bu(t);
				if (!r) return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + e + " morphAttribute."), null;
				c.morphAttributes[e].push(r);
			}
		}
	}
	return c;
}
function bu(e) {
	let t, n, r, i = -1, a = 0;
	for (let o = 0; o < e.length; ++o) {
		let s = e[o];
		if (t === void 0 && (t = s.array.constructor), t !== s.array.constructor) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."), null;
		if (n === void 0 && (n = s.itemSize), n !== s.itemSize) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."), null;
		if (r === void 0 && (r = s.normalized), r !== s.normalized) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."), null;
		if (i === -1 && (i = s.gpuType), i !== s.gpuType) return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."), null;
		a += s.count * n;
	}
	let o = new t(a), s = new Qt(o, n, r), c = 0;
	for (let t = 0; t < e.length; ++t) {
		let r = e[t];
		if (r.isInterleavedBufferAttribute) {
			let e = c / n;
			for (let t = 0, i = r.count; t < i; t++) for (let i = 0; i < n; i++) {
				let n = r.getComponent(t, i);
				s.setComponent(t + e, i, n);
			}
		} else o.set(r.array, c);
		c += r.count * n;
	}
	return i !== void 0 && (s.gpuType = i), s;
}
//#endregion
//#region scene3d/arch.js
var xu = Math.PI * 2;
function Su(e, t, n, r) {
	let i = e * n, a = [[-e, 0], [-e, t]], o = Math.acos(Math.min(1, Math.max(-1, e / i - 1)));
	r ||= 10;
	for (let n = 1; n <= r; n++) {
		let s = Math.PI + (o - Math.PI) * (n / r);
		a.push([-e + i + i * Math.cos(s), t + i * Math.sin(s)]);
	}
	for (let n = r - 1; n >= 0; n--) {
		let s = Math.PI + (o - Math.PI) * (n / r);
		a.push([e - i - i * Math.cos(s), t + i * Math.sin(s)]);
	}
	return a.push([e, 0]), a;
}
var Cu = (e, t, n) => t + e * Math.sqrt(2 * n - 1);
function wu(e, t, n) {
	let r = new di();
	return e.forEach((e, i) => {
		let a = t + e[0], o = n + e[1];
		i ? r.lineTo(a, o) : r.moveTo(a, o);
	}), r.closePath(), r;
}
function Tu(e) {
	if (e.circle) {
		let t = new di();
		return t.absarc(e.cx, e.cy, e.r, 0, xu, !0), t;
	}
	return wu(Su(e.hw, e.spring, e.k, 8), e.cx, e.y0);
}
var Eu = /* @__PURE__ */ new Map();
function Du(e, t) {
	let n = Eu.get(e);
	return n || (n = t(), Eu.set(e, n)), n;
}
function Ou(e, t, n, r, i) {
	return Du("P" + JSON.stringify([
		e,
		t,
		n,
		r,
		i
	]), () => ku(e, t, n, r, i));
}
function ku(e, t, n, r, i) {
	let a = new fi();
	a.moveTo(-e / 2, 0), a.lineTo(e / 2, 0), a.lineTo(e / 2, t), i && a.lineTo(0, t + i), a.lineTo(-e / 2, t), a.closePath(), (r || []).forEach((e) => a.holes.push(Tu(e)));
	let o = new Xi(a, {
		depth: n,
		bevelEnabled: !1,
		curveSegments: 6
	});
	return o.translate(0, 0, -n / 2), o;
}
function Au(e, t, n) {
	return Du("F" + JSON.stringify([
		e,
		t,
		n
	]), () => ju(e, t, n));
}
function ju(e, t, n) {
	let r;
	e.circle ? (r = new fi(), r.absarc(e.cx, e.cy, e.r + t, 0, xu, !1)) : (r = new fi(), Su(e.hw + t, e.spring, e.k, 8).forEach((n, i) => {
		let a = e.cx + n[0], o = e.y0 - t * .6 + n[1] * 1 + (n[1] > e.spring ? t * 0 : 0);
		i ? r.lineTo(a, o) : r.moveTo(a, o);
	}), r.closePath()), r.holes.push(Tu(e));
	let i = new Xi(r, {
		depth: n,
		bevelEnabled: !1,
		curveSegments: 6
	});
	return i.translate(0, 0, -n / 2), i;
}
function Mu(e, t) {
	return Du("S" + JSON.stringify([e, t]), () => Nu(e, t));
}
function Nu(e, t) {
	let n;
	if (e.circle) n = new Nr(e.r, 20).translate(e.cx, e.cy, 0);
	else {
		let t = new fi();
		Su(e.hw, e.spring, e.k, 8).forEach((n, r) => {
			let i = e.cx + n[0], a = e.y0 + n[1];
			r ? t.lineTo(i, a) : t.moveTo(i, a);
		}), t.closePath(), n = new ta(t);
	}
	return n.translate(0, 0, t || 0), n;
}
var Q = (e, t, n, r, i, a, o) => new Le().compose(new W(e || 0, t || 0, n || 0), new he().setFromAxisAngle(new W(0, 1, 0), r || 0), new W(i || 1, a === void 0 ? i || 1 : a, o === void 0 ? i || 1 : o));
function Pu(e, t) {
	let n = e.attributes.position, r = new Float32Array(n.count * 2), i = new W(), a = new W(), o = new W(), s = new W(), c = new W(), l = new W(), u = new W();
	for (let e = 0; e < n.count; e += 3) {
		i.fromBufferAttribute(n, e), a.fromBufferAttribute(n, e + 1), o.fromBufferAttribute(n, e + 2), s.subVectors(o, a).cross(u.subVectors(i, a)), s.lengthSq() < 1e-12 ? s.set(0, 1, 0) : s.normalize(), Math.abs(s.y) > .92 ? (c.set(1, 0, 0), l.set(0, 0, 1)) : (c.set(s.z, 0, -s.x).normalize(), l.crossVectors(s, c));
		for (let i = 0; i < 3; i++) u.fromBufferAttribute(n, e + i), r[(e + i) * 2] = u.dot(c) / t, r[(e + i) * 2 + 1] = u.dot(l) / t;
	}
	e.setAttribute("uv", new Qt(r, 2));
}
var Fu = class {
	constructor(e) {
		this.g = [], this.attrs = e || [
			"position",
			"normal",
			"uv"
		];
	}
	add(e, t) {
		let n = e.index ? e.toNonIndexed() : e.clone();
		Object.keys(n.attributes).forEach((e) => {
			this.attrs.indexOf(e) < 0 && n.deleteAttribute(e);
		}), this.attrs.indexOf("uv") >= 0 && !n.attributes.uv && n.setAttribute("uv", new Qt(new Float32Array(n.attributes.position.count * 2), 2)), t && n.applyMatrix4(t), n.clearGroups(), this.g.push(n);
	}
	mesh(e, t) {
		if (!this.g.length) return null;
		let n = yu(this.g, !1);
		return t && Pu(n, t), n.computeBoundingSphere(), new X(n, e);
	}
	get count() {
		return this.g.length;
	}
}, Iu = (e, t) => new Le().multiplyMatrices(e, t), Lu = (e, t, n) => new Le().compose(new W(e, 0, t), new he().setFromAxisAngle(new W(0, 1, 0), n || 0), new W(1, 1, 1));
function Ru(e, t) {
	t ||= {};
	let n = !!t.mobile, r = t.rand || Math.random, i = {
		stone: new Fu(),
		roof: new Fu(),
		gold: new Fu(),
		dark: new Fu(),
		glass: new Fu([
			"position",
			"normal",
			"color"
		])
	}, a = (e, t, n, r) => i[e].add(t, r ? Iu(n, r) : n), o = (e, t, n, r, i, o, s, c) => a(e, new jr(n, r, i), t, Q(o, s, c)), s = new Le(), c = [-1, 1];
	function l(e, t) {
		let n = Mu(e, 0), r = n.attributes.position, i = new Float32Array(r.count * 3), a = e.circle ? e.cy - e.r : e.y0, o = e.circle ? e.r * 2 : Cu(e.hw, e.spring, e.k);
		for (let e = 0; e < r.count; e++) {
			let n = t * (1.15 - .42 * Math.min(1, Math.max(0, (r.getY(e) - a) / o)));
			i[e * 3] = n, i[e * 3 + 1] = n * .47, i[e * 3 + 2] = n * .12;
		}
		return n.setAttribute("color", new Qt(i, 3)), n;
	}
	let u = (e, t, n, r) => a("glass", l(t, r), e, Q(0, 0, n));
	function d(e, t, n, r) {
		if (t.circle) {
			a("dark", new jr(t.r * 2, .07, .12), e, Q(t.cx, t.cy, n + .02)), a("dark", new jr(.07, t.r * 2, .12), e, Q(t.cx, t.cy, n + .02));
			return;
		}
		let i = Cu(t.hw, t.spring, t.k), o = t.hw > 1.6 ? 2 : 1, s = t.spring + (i - t.spring) * .55;
		for (let r = 1; r <= o; r++) a("dark", new jr(.09, s, .14), e, Q(t.cx - t.hw + 2 * t.hw * r / (o + 1), t.y0 + s / 2, n + .02));
		r && a("dark", new jr(t.hw * 2, .08, .14), e, Q(t.cx, t.y0 + t.spring * .55, n + .02)), a("dark", new jr(t.hw * 2, .08, .14), e, Q(t.cx, t.y0 + t.spring, n + .02)), t.hw > .55 && a("dark", new ia(t.hw * .42, .045, 5, 14), e, Q(t.cx, t.y0 + t.spring + (i - t.spring) * .42, n + .03));
	}
	function f(e, t, n, i, o, s) {
		s ||= {};
		let c = s.thick || 1.2;
		a("stone", Ou(t, n, c, i, o), e, Q(0, 0, -c / 2)), i.forEach((t) => {
			a("stone", Au(t, s.fr || .28, .36), e, Q(0, 0, .18)), !t.open && (u(e, t, -c * .42, .75 + r() * .5), d(e, t, -c * .42, t.tall), !t.circle && t.y0 > 5 && a("stone", new jr(t.hw * 2 + .8, .28, .5), e, Q(t.cx, t.y0 - .16, .2)));
		});
	}
	let p = (() => {
		let e = new $i([
			[0, 0],
			[.55, 0],
			[.62, .3],
			[.5, 1.5],
			[.36, 2.3],
			[.3, 2.55],
			[0, 2.62]
		].map((e) => new U(e[0], e[1])), n ? 6 : 10);
		return [
			[
				"stone",
				new jr(1.2, 1, 1.2),
				Q(0, .5, 0)
			],
			[
				"stone",
				e,
				Q(0, 1, 0)
			],
			[
				"stone",
				new ra(.3, 8, 6),
				Q(0, 3.95, 0)
			],
			[
				"gold",
				new Fr(.34, .34, 6),
				Q(0, 4.35, 0)
			],
			[
				"stone",
				new jr(.2, 1, .2),
				Q(.55, 2.3, .15)
			],
			[
				"gold",
				new Pr(.03, .03, 2.2, 5),
				Q(-.5, 2.6, .3)
			]
		];
	})(), m = (e, t, n, r) => p.forEach((i) => a(i[0], i[1], e, Iu(Q(t, n, r), i[2])));
	function h(e, t) {
		o("stone", e, 1.7, 10, 2.1, 0, 5, 1.05), o("stone", e, 1.45, 10, 1.7, 0, 15, .85), o("stone", e, 1.2, t - 21.5, 1.35, 0, 20 + (t - 21.5) / 2, .68), a("stone", new Fr(1, 1.6, 4).rotateY(Math.PI / 4), e, Q(0, t - .7, .68)), o("stone", e, 1.5, .35, 1.7, 0, 10.05, .85), o("stone", e, 1.75, .35, 2, 0, 20.05, .75), m(e, 0, t + .1, .68);
	}
	function g(e, t, r, i) {
		if (o("stone", e, t, 1, 1.7, 0, r, i + .35), o("stone", e, t, .35, 1.2, 0, r - .65, i + .1), !n) for (let n = -t / 2 + .4; n < t / 2 - .2; n += .7) o("stone", e, .3, .42, .45, n, r - .95, i - .05);
	}
	function _(e, t, r, i) {
		let s = Math.max(1, Math.round(t / 1)), c = t / s;
		for (let o = 0; o < s; o++) a("stone", Ou(c - .04, 1.9, .34, n ? [] : [{
			cx: 0,
			y0: .3,
			hw: c * .3,
			spring: .55,
			k: 1.6
		}]), e, Q(-t / 2 + c * (o + .5), r, i));
		o("stone", e, t, .3, .5, 0, r + 1.95, i);
	}
	let v = (e, t, n) => {
		o("stone", e, t, .5, .5, 0, n, .22), o("stone", e, t, .22, .32, 0, n - .34, .12);
	};
	function y(e, t) {
		f(e, t, 30, [
			{
				cx: 0,
				y0: 1.1,
				hw: t * .3,
				spring: 6,
				k: 1.5,
				tall: !0
			},
			{
				cx: -t * .23,
				y0: 12.2,
				hw: .72,
				spring: 5,
				k: 1.6
			},
			{
				cx: t * .23,
				y0: 12.2,
				hw: .72,
				spring: 5,
				k: 1.6
			},
			{
				circle: !0,
				cx: 0,
				cy: 21.8,
				r: .95
			},
			{
				cx: -t * .37,
				y0: 24.4,
				hw: .4,
				spring: 2.4,
				k: 1.6
			},
			{
				cx: -t * .12,
				y0: 24.4,
				hw: .4,
				spring: 2.4,
				k: 1.6
			},
			{
				cx: t * .12,
				y0: 24.4,
				hw: .4,
				spring: 2.4,
				k: 1.6
			},
			{
				cx: t * .37,
				y0: 24.4,
				hw: .4,
				spring: 2.4,
				k: 1.6
			}
		]), v(e, t, 10.7), v(e, t, 19.6), g(e, t, 29.4, 0), _(e, t, 30.2, .1);
	}
	function b(e, t, r, i, s) {
		let l = t / 32;
		if (s ||= [
			{
				cx: -t * .3,
				y0: 1.1,
				hw: 2.4 * l,
				spring: 6.5,
				k: 1.5,
				tall: !0
			},
			{
				cx: 0,
				y0: 1.1,
				hw: 2.7 * l,
				spring: 6.8,
				k: 1.5,
				tall: !0
			},
			{
				cx: t * .3,
				y0: 1.1,
				hw: 2.4 * l,
				spring: 6.5,
				k: 1.5,
				tall: !0
			},
			{
				cx: 0,
				y0: 13.4,
				hw: 2.1 * l,
				spring: 7.4,
				k: 1.4,
				tall: !0
			},
			{
				cx: -t * .2,
				y0: 12.4,
				hw: .95,
				spring: 6,
				k: 1.6
			},
			{
				cx: t * .2,
				y0: 12.4,
				hw: .95,
				spring: 6,
				k: 1.6
			},
			{
				cx: -t * .37,
				y0: 12.6,
				hw: .62,
				spring: 4.2,
				k: 1.6
			},
			{
				cx: t * .37,
				y0: 12.6,
				hw: .62,
				spring: 4.2,
				k: 1.6
			},
			{
				circle: !0,
				cx: 0,
				cy: r - 5.4,
				r: 1.7
			},
			{
				cx: -t * .2,
				y0: r - 8,
				hw: .6,
				spring: 3.4,
				k: 1.6
			},
			{
				cx: t * .2,
				y0: r - 8,
				hw: .6,
				spring: 3.4,
				k: 1.6
			},
			{
				circle: !0,
				cx: 0,
				cy: r + i * .42,
				r: 1.15
			}
		], f(e, t, r, s, i, { thick: 1.4 }), v(e, t, 10.9), v(e, t, 21.4), o("stone", e, t + .6, .8, 1.5, 0, r - .2, .4), !n) for (let n = 0; n < 8; n++) {
			let o = (n + .5) / 8;
			c.forEach((n) => a("stone", new Fr(.28, 1.2, 4), e, Q(t / 2 * n * (1 - o), r + i * o + .5, .2)));
		}
		a("gold", new Fr(.6, 3.2, 6), e, Q(0, r + i + 1.3, 0));
	}
	function x(e, t, r, i, o, s) {
		a("stone", new Pr(o * .9, o, i, 8), e, Q(t, i / 2, r));
		for (let s = 0; s < 8; s++) {
			if (n && s % 2) continue;
			let c = s / 8 * xu + xu / 16, l = Mu({
				cx: 0,
				y0: 0,
				hw: .2,
				spring: 1.6,
				k: 1.6
			}, 0), u = l.attributes.position;
			l.setAttribute("color", new Qt(new Float32Array(u.count * 3).fill(1.7), 3)), a("glass", l, e, Iu(Q(t, i * .5, r), Iu(new Le().makeRotationY(c), Q(0, 0, o * .93))));
		}
		a("stone", new Pr(o * 1.3, o * 1.3, .7, 8), e, Q(t, i + .1, r)), a("gold", new Fr(o * 1.25, s, 8), e, Q(t, i + .45 + s / 2, r)), a("gold", new ra(o * .3, 8, 6), e, Q(t, i + .5 + s, r));
	}
	function S(e, t, r, i, o, s) {
		if (a("gold", new Fr(o, s, 8), e, Q(t, r + s / 2, i)), !n) for (let n = 0; n < 8; n++) {
			let c = n / 8 * xu + xu / 16;
			for (let n = 1; n <= 6; n++) {
				let l = n / 7, u = o * (1 - l);
				a("gold", new Fr(.28 * (1 - l * .5), .9, 4), e, Q(t + Math.sin(c) * u, r + s * l, i + Math.cos(c) * u));
			}
		}
	}
	function C(e, t, n, r, i, o, c) {
		let l = (c ? r - n : t - e) / 2 + 1.2, u = new fi();
		u.moveTo(-l, 0), u.lineTo(l, 0), u.lineTo(0, o), u.closePath();
		let d = new Xi(u, {
			depth: (c ? t - e : r - n) + 2.4,
			bevelEnabled: !1
		});
		if (c ? (d.rotateY(Math.PI / 2), a("roof", d, s, Q(e - 1.2, i, (n + r) / 2))) : a("roof", d, s, Q((e + t) / 2, i, n - 1.2)), c) for (let c = e; c <= t; c += 3) a("gold", new Fr(.35, 1.1, 4), s, Q(c, i + o + .3, (n + r) / 2));
		else for (let c = n; c <= r; c += 3) a("gold", new Fr(.35, 1.1, 4), s, Q((e + t) / 2, i + o + .3, c));
	}
	function w(e) {
		o("stone", e, 1.9, 2.6, 1.7, 0, 1.3, -.8), a("roof", new Fr(1.6, 1.5, 4).rotateY(Math.PI / 4), e, Q(0, 3.3, -.8));
		let t = l({
			cx: 0,
			y0: .35,
			hw: .5,
			spring: 1.1,
			k: 1.6
		}, 1);
		a("glass", t, e, Q(0, 0, .06)), o("dark", e, .08, 1.8, .1, 0, 1.25, .08);
	}
	let T = (e, t, n, r, i) => a("stone", new jr(t - e, i, r - n), s, Q((e + t) / 2, i / 2, (n + r) / 2));
	T(-134, 134, -21.6, 21.6, 30), T(-42, 42, -43.6, 21.6, 34), c.forEach((e) => {
		T(e * 61 - 14.6, e * 61 + 14.6, -25.9, 25.9, 35), T(e * 119.5 - 13.3, e * 119.5 + 13.3, -25.9, 25.9, 32);
	}), T(-19.5, 19.5, 21.6, 32.4, 32), [[1, 0], [-1, Math.PI]].forEach(([e, t]) => {
		let n = 23 * e, r = 27.5 * e;
		c.forEach((i) => {
			[33, 41].forEach((e) => y(Lu(i * e, n, t), 8)), [
				81.67,
				91,
				100.33
			].forEach((e) => y(Lu(i * e, n, t), 9.33)), [
				29,
				37,
				45,
				77,
				86.33,
				95.67,
				105
			].forEach((e) => h(Lu(i * e, n, t), 30)), b(Lu(i * 61, r, t), 32, 35, 13), b(Lu(i * 119.5, r, t), 29, 32, 10), c.forEach((t) => {
				x(Q(0, 35, 0), i * 61 + t * 14.4, r - e * 1.2, 16, 1.5, 11), x(Q(0, 32, 0), i * 119.5 + t * 13.2, r - e * 1.2, 10, 1.4, 8);
			}), [
				33,
				41,
				81.67,
				91,
				100.33
			].forEach((n) => w(Lu(i * n, 14.5 * e, t).multiply(Q(0, 34.2, 0))));
		});
	}), c.forEach((e) => [[
		61,
		16,
		35
	], [
		119.5,
		14.5,
		32
	]].forEach(([t, n, r]) => {
		[-1, 1].forEach((i) => {
			let a = [
				{
					cx: -7,
					y0: 1.1,
					hw: 1.6,
					spring: 6,
					k: 1.5,
					tall: !0
				},
				{
					cx: 0,
					y0: 1.1,
					hw: 1.6,
					spring: 6,
					k: 1.5,
					tall: !0
				},
				{
					cx: 7,
					y0: 1.1,
					hw: 1.6,
					spring: 6,
					k: 1.5,
					tall: !0
				},
				{
					cx: -7,
					y0: 12.4,
					hw: .8,
					spring: 5.4,
					k: 1.6
				},
				{
					cx: 0,
					y0: 12.4,
					hw: .8,
					spring: 5.4,
					k: 1.6
				},
				{
					cx: 7,
					y0: 12.4,
					hw: .8,
					spring: 5.4,
					k: 1.6
				},
				{
					cx: -7,
					y0: 22,
					hw: .55,
					spring: 3.6,
					k: 1.6
				},
				{
					cx: 0,
					y0: 22,
					hw: .55,
					spring: 3.6,
					k: 1.6
				},
				{
					cx: 7,
					y0: 22,
					hw: .55,
					spring: 3.6,
					k: 1.6
				}
			], o = Lu(e * t + i * n, 0, i * Math.PI / 2);
			f(o, 54, r, a, 0, { thick: 1.2 }), v(o, 54, 10.9), g(o, 54, r - .6, 0);
		});
	})), b(Lu(0, 34, 0), 39, 32, 10, [
		{
			cx: -11.5,
			y0: 1.1,
			hw: 3.4,
			spring: 8.4,
			k: 1.5,
			tall: !0
		},
		{
			cx: 0,
			y0: 1.1,
			hw: 3.8,
			spring: 9,
			k: 1.5,
			tall: !0
		},
		{
			cx: 11.5,
			y0: 1.1,
			hw: 3.4,
			spring: 8.4,
			k: 1.5,
			tall: !0
		},
		{
			cx: -11.5,
			y0: 15,
			hw: 1.3,
			spring: 6.4,
			k: 1.6
		},
		{
			cx: -5.6,
			y0: 15,
			hw: 1.3,
			spring: 6.4,
			k: 1.6
		},
		{
			cx: 5.6,
			y0: 15,
			hw: 1.3,
			spring: 6.4,
			k: 1.6
		},
		{
			cx: 11.5,
			y0: 15,
			hw: 1.3,
			spring: 6.4,
			k: 1.6
		},
		{
			cx: 0,
			y0: 14.5,
			hw: 1.8,
			spring: 7.2,
			k: 1.5,
			tall: !0
		},
		{
			circle: !0,
			cx: 0,
			cy: 27.4,
			r: 1.8
		},
		{
			cx: -9,
			y0: 24,
			hw: .8,
			spring: 3.2,
			k: 1.6
		},
		{
			cx: 9,
			y0: 24,
			hw: .8,
			spring: 3.2,
			k: 1.6
		},
		{
			circle: !0,
			cx: 0,
			cy: 34.2,
			r: 1.2
		}
	]), T(-24, -4.8, -50.2, -44.6, 27), T(4.8, 24, -50.2, -44.6, 27), a("stone", new jr(9.6, 10.4, 5.6), s, Q(0, 21.8, -47.4)), f(Lu(0, -52, Math.PI), 48, 27, [
		{
			cx: 0,
			y0: 0,
			hw: 4.6,
			spring: 9.5,
			k: 1.5,
			tall: !0,
			open: !0
		},
		{
			cx: -14,
			y0: 1.5,
			hw: 2.4,
			spring: 6.5,
			k: 1.5,
			tall: !0
		},
		{
			cx: 14,
			y0: 1.5,
			hw: 2.4,
			spring: 6.5,
			k: 1.5,
			tall: !0
		},
		{
			cx: -14,
			y0: 14,
			hw: .9,
			spring: 5.5,
			k: 1.6
		},
		{
			cx: -7,
			y0: 14,
			hw: .9,
			spring: 5.5,
			k: 1.6
		},
		{
			cx: 7,
			y0: 14,
			hw: .9,
			spring: 5.5,
			k: 1.6
		},
		{
			cx: 14,
			y0: 14,
			hw: .9,
			spring: 5.5,
			k: 1.6
		},
		{
			circle: !0,
			cx: 0,
			cy: 21,
			r: 1.6
		}
	], 9, { thick: 1.6 }), C(-24, 24, -52, -44.6, 27, 9, !1), c.forEach((e) => {
		let t = Lu(e * 31, -44.5, Math.PI);
		T(e * 31 - 4, e * 31 + 4, -43.3, -37, 38), f(t, 8, 38, [
			{
				cx: 0,
				y0: 3,
				hw: .9,
				spring: 6,
				k: 1.5,
				tall: !0
			},
			{
				cx: 0,
				y0: 15,
				hw: .9,
				spring: 6,
				k: 1.5
			},
			{
				cx: 0,
				y0: 26,
				hw: .7,
				spring: 4.4,
				k: 1.6
			}
		], 0, { thick: 1 }), x(Q(0, 38, 0), e * 31, -41, 9, 3, 14);
	}), C(-134, 134, -22.6, 22.6, 30, 11, !0), C(-42, 42, -44.6, 22.6, 34, 8, !0), C(-19.5, 19.5, 22.6, 33.6, 32, 10, !1), c.forEach((e) => {
		C(e * 61 - 16, e * 61 + 16, -27.1, 27.1, 35, 13, !1), C(e * 119.5 - 14.5, e * 119.5 + 14.5, -27.1, 27.1, 32, 10, !1);
	}), c.forEach((e) => {
		let t = e * 24;
		T(t - 3.1, t + 3.1, 22.6, 33.6, 42), f(Lu(t, 35, 0), 9, 42, [
			{
				cx: -2.2,
				y0: 2,
				hw: .9,
				spring: 6,
				k: 1.6,
				tall: !0
			},
			{
				cx: 2.2,
				y0: 2,
				hw: .9,
				spring: 6,
				k: 1.6,
				tall: !0
			},
			{
				cx: -2.2,
				y0: 16,
				hw: .9,
				spring: 6,
				k: 1.6
			},
			{
				cx: 2.2,
				y0: 16,
				hw: .9,
				spring: 6,
				k: 1.6
			},
			{
				cx: 0,
				y0: 29,
				hw: 1.3,
				spring: 7.5,
				k: 1.5,
				tall: !0
			}
		], 0, { thick: 1.3 }), f(Lu(t + e * 4.5, 29, e * Math.PI / 2), 12, 42, [
			{
				cx: -2.5,
				y0: 2,
				hw: .9,
				spring: 6,
				k: 1.6
			},
			{
				cx: 2.5,
				y0: 2,
				hw: .9,
				spring: 6,
				k: 1.6
			},
			{
				cx: -2.5,
				y0: 16,
				hw: .9,
				spring: 6,
				k: 1.6
			},
			{
				cx: 2.5,
				y0: 16,
				hw: .9,
				spring: 6,
				k: 1.6
			},
			{
				cx: 0,
				y0: 29,
				hw: 1.2,
				spring: 7,
				k: 1.5
			}
		], 0, { thick: 1.3 }), v(Lu(t, 35, 0), 9, 14), v(Lu(t, 35, 0), 9, 28), g(Lu(t, 35, 0), 9, 41.4, 0);
		for (let e = 0; e < 8; e++) {
			let n = e * xu / 8, r = 4.34;
			f(Iu(Q(0, 42, 0), Lu(t + Math.sin(n) * r, 29 + Math.cos(n) * r, n)), 3.6, 12, [{
				cx: 0,
				y0: 1.8,
				hw: .7,
				spring: 5.6,
				k: 1.5,
				tall: !0
			}], 0, { thick: .8 });
		}
		a("stone", new Pr(5.3, 5.3, 1, 8), s, Q(t, 54.4, 29)), S(s, t, 54.9, 29, 4.7, 21.1), a("gold", new ra(.9, 8, 6), s, Q(t, 76.4, 29)), c.forEach((e) => c.forEach((n) => x(Q(0, 42, 0), t + e * 3.9, 29 + n * 3.9 + (n > 0 ? 2.5 : 0), 5.5, 1, 7)));
	});
	let E = 17.6, D = E * Math.cos(Math.PI / 16), O = 2 * E * Math.sin(Math.PI / 16);
	for (let e = 0; e < 16; e++) {
		let t = e * xu / 16;
		f(Iu(Q(0, 42, 0), Lu(Math.sin(t) * D, Math.cos(t) * D, t)), O, 14, [{
			cx: 0,
			y0: 2.2,
			hw: 1,
			spring: 6.2,
			k: 1.5,
			tall: !0
		}], 0, { thick: .9 });
		let n = t + Math.PI / 16;
		a("stone", new jr(1.1, 15.2, 1.6), s, Iu(Lu(Math.sin(n) * 17.75, Math.cos(n) * 17.75, n), Q(0, 49.6, 0))), a("gold", new Fr(.75, 5.2, 6), s, Iu(Lu(Math.sin(n) * 17.75, Math.cos(n) * 17.75, n), Q(0, 59.8, 0)));
	}
	a("stone", new Pr(18.5, 18.5, 1.6, 16), s, Q(0, 42.8, 0)), a("stone", new Pr(19.1, 19.1, 1.4, 16), s, Q(0, 56.7, 0)), a("stone", new Pr(18.400000000000002, 18.8, .7, 16), s, Q(0, 55.9, 0));
	let k = [];
	for (let e = 0; e <= 26; e++) {
		let t = e / 26, n = 17.4 * Math.cos(t * Math.PI / 2) ** .78 + .001;
		k.push(new U(n, 57.4 + t * 26.6));
	}
	a("stone", new $i(k, 16), s);
	for (let e = 0; e < 16; e++) {
		let t = e / 16 * xu;
		if (a("gold", new aa(new Gr(k.map((e) => new W(Math.sin(t) * (e.x + .14), e.y, Math.cos(t) * (e.x + .14))).slice(0, -1)), n ? 14 : 30, .34, 5), s), !n && e % 2 == 0) {
			let e = t + Math.PI / 16, n = 15.2, r = Iu(Lu(Math.sin(e) * n, Math.cos(e) * n, e), Q(0, 67, 0));
			o("stone", r, 1.6, 2.6, 1.2, 0, 1.3, .3), a("gold", new Fr(1.3, 1.6, 4).rotateY(Math.PI / 4), r, Q(0, 3.4, .3)), a("glass", l({
				cx: 0,
				y0: .3,
				hw: .5,
				spring: 1.2,
				k: 1.6
			}, 1), r, Q(0, 0, .95));
		}
	}
	a("stone", new Pr(3, 3.4, 6.4, 8), s, Q(0, 87, 0));
	for (let e = 0; e < 8; e++) {
		let t = e / 8 * xu + xu / 16, n = Mu({
			cx: 0,
			y0: 0,
			hw: .5,
			spring: 2.6,
			k: 1.5
		}, 0), r = n.attributes.position;
		n.setAttribute("color", new Qt(new Float32Array(r.count * 3).fill(2), 3)), a("glass", n, s, Iu(Q(0, 84.8, 0), Iu(new Le().makeRotationY(t), Q(0, 0, 3.05))));
	}
	a("stone", new Pr(3.7, 3.7, .8, 8), s, Q(0, 90.5, 0)), a("gold", new Fr(3.4, 6.5, 8), s, Q(0, 94.2, 0)), a("gold", new ra(.7, 8, 6), s, Q(0, 97.9, 0)), o("gold", s, .35, 4.2, .35, 0, 100.4, 0), o("gold", s, 2, .35, .35, 0, 101.2, 0);
	let A = new ut(), j = (e, t, n) => {
		let r = i[e].mesh(t, n);
		r && (r.castShadow = e !== "glass", r.receiveShadow = e !== "glass", A.add(r));
	};
	return j("stone", e.stone, e.stoneTile || 1.5), j("roof", e.roof, e.roofTile || 3), j("gold", e.gold, e.goldTile || 1), j("dark", e.dark, 0), j("glass", e.glass, 0), A;
}
//#endregion
//#region scene3d/pbr.js
var zu = "\nprecision highp float;\nvarying vec2 vUv;\nfloat hash21(vec2 p){ p=fract(p*vec2(233.34,851.73)); p+=dot(p,p+23.45); return fract(p.x*p.y); }\nfloat vnoise(vec2 p,float P){\n  vec2 i=floor(p), f=fract(p); vec2 u=f*f*f*(f*(f*6.-15.)+10.);\n  float a=hash21(mod(i,P)), b=hash21(mod(i+vec2(1.,0.),P)), c=hash21(mod(i+vec2(0.,1.),P)), d=hash21(mod(i+vec2(1.,1.),P));\n  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);\n}\nfloat fbm(vec2 p,float P,int oct){ float s=0.,a=.5; for(int i=0;i<7;i++){ if(i>=oct) break; s+=a*vnoise(p,P); p*=2.; P*=2.; a*=.5; } return s; }\n", Bu = {
	stone: "\n    const float TILE=4.0; const float NSTR=1.0;\n    void blk(vec2 uv,out float edge,out float bid,out float bi,out float row){\n      vec2 m=uv*4.0; row=floor(m.y/.5); float bx=m.x+mod(row,2.)*.5;\n      bi=floor(mod(bx,4.)); vec2 f=vec2(fract(bx),fract(m.y/.5));\n      edge=min(min(f.x,1.-f.x)*1.0,min(f.y,1.-f.y)*.5); bid=hash21(vec2(bi,row));\n    }\n    float H(vec2 uv){\n      float edge,bid,bi,row; blk(uv,edge,bid,bi,row);\n      float joint=smoothstep(.005,.013,edge), bevel=smoothstep(.0,.06,edge);\n      float chip=fbm(uv*64.,64.,3);\n      float face=(bid-.5)*.006+(fbm(uv*24.,24.,5)-.5)*.011+(fbm(uv*128.,128.,3)-.5)*.0035;\n      return joint*(.010+face+bevel*.005-smoothstep(.55,.85,chip)*(1.-bevel)*.006);\n    }\n    vec3 ALB(vec2 uv,float h){\n      float edge,bid,bi,row; blk(uv,edge,bid,bi,row);\n      float joint=smoothstep(.005,.013,edge);\n      vec3 c=mix(vec3(.46,.37,.25),vec3(.66,.55,.39),fbm(uv*9.,9.,4));\n      c*=.86+.26*bid; c=mix(c,c*vec3(1.05,1.0,.92),fbm(uv*3.,3.,3));\n      float streak=smoothstep(.5,.9,fbm(vec2(uv.x*22.,uv.y*2.),22.,4));\n      c*=1.-streak*.32; c*=.80+.20*smoothstep(.0,.02,edge)+.0;\n      c=mix(vec3(.26,.24,.20)*(.8+.4*fbm(uv*60.,60.,3)),c,joint);\n      return c*(.72+h*30.);\n    }\n    vec3 ORM(vec2 uv,float h){\n      float edge,bid,bi,row; blk(uv,edge,bid,bi,row);\n      float joint=smoothstep(.005,.013,edge);\n      float ao=mix(.35,1.,joint)*mix(.78,1.,smoothstep(.0,.05,edge))*(.85+.3*fbm(uv*40.,40.,3));\n      return vec3(clamp(ao,0.,1.),.74+.2*fbm(uv*20.,20.,3)+(1.-joint)*.1,0.);\n    }",
	roof: "\n    const float TILE=2.0; const float NSTR=1.0;\n    void tl(vec2 uv,out vec2 f,out vec2 id){\n      vec2 m=uv*vec2(8.,5.); float row=floor(m.y); m.x+=mod(row,2.)*.5; id=vec2(floor(mod(m.x,8.)),row); f=vec2(fract(m.x),fract(m.y));\n    }\n    float H(vec2 uv){\n      vec2 f,id; tl(uv,f,id);\n      float e=min(f.x,1.-f.x);\n      float slope=f.y*.014-smoothstep(.0,.06,f.y)*.0; float gap=smoothstep(.02,.07,e);\n      return slope*gap+(fbm(uv*60.,60.,3)-.5)*.0016;\n    }\n    vec3 ALB(vec2 uv,float h){\n      vec2 f,id; tl(uv,f,id);\n      float band=mod(floor(id.x/2.)+id.y,4.);\n      vec3 c=band<.5?vec3(.020,.105,.070):band<1.5?vec3(.30,.085,.04):band<2.5?vec3(.33,.20,.05):vec3(.03,.055,.12);\n      c*=.75+.5*hash21(id+3.7); c*=.7+.3*smoothstep(.0,.35,f.y)+.2*fbm(uv*30.,30.,3);\n      return c*(.85+h*20.);\n    }\n    vec3 ORM(vec2 uv,float h){\n      vec2 f,id; tl(uv,f,id); float e=min(f.x,1.-f.x);\n      float ao=mix(.4,1.,smoothstep(.0,.08,e))*mix(.55,1.,smoothstep(.0,.3,f.y));\n      return vec3(ao,.22+.25*fbm(uv*25.,25.,3),0.);\n    }",
	gold: "\n    const float TILE=1.0; const float NSTR=.6;\n    float H(vec2 uv){ return (fbm(vec2(uv.x*6.,uv.y*140.),140.,4)-.5)*.0012+(fbm(uv*20.,20.,4)-.5)*.0016; }\n    vec3 ALB(vec2 uv,float h){\n      vec3 c=mix(vec3(.86,.60,.20),vec3(1.0,.78,.34),fbm(uv*8.,8.,4));\n      float pat=smoothstep(.62,.9,fbm(uv*12.,12.,5));\n      return mix(c,vec3(.32,.30,.14),pat*.5);\n    }\n    vec3 ORM(vec2 uv,float h){\n      float pat=smoothstep(.62,.9,fbm(uv*12.,12.,5));\n      return vec3(1.-pat*.4,.26+.22*fbm(uv*30.,30.,3)+pat*.3,1.);\n    }",
	marble: "\n    const float TILE=3.0; const float NSTR=.25;\n    float veins(vec2 uv){\n      vec2 w=uv*4.+vec2(fbm(uv*6.,6.,5)*3.,fbm(uv*6.+3.1,6.,5)*3.);\n      float v=abs(sin(w.x*3.+w.y*1.7+fbm(uv*3.,3.,4)*6.)); return 1.-smoothstep(.0,.16,v);\n    }\n    float H(vec2 uv){ return (fbm(uv*30.,30.,4)-.5)*.0009; }\n    vec3 ALB(vec2 uv,float h){\n      vec3 c=mix(vec3(.72,.66,.54),vec3(.86,.80,.68),fbm(uv*5.,5.,4));\n      c=mix(c,vec3(.36,.30,.24),veins(uv)*.55*fbm(uv*10.,10.,3)*2.);\n      return c*(.9+.12*fbm(uv*40.,40.,3));\n    }\n    vec3 ORM(vec2 uv,float h){ return vec3(1.,.10+.08*fbm(uv*20.,20.,3)+veins(uv)*.06,0.); }",
	paving: "\n    const float TILE=4.0; const float NSTR=1.2;\n    void sl(vec2 uv,out float edge,out float bid){\n      vec2 m=uv*vec2(8.,8.); float row=floor(m.y); float bx=m.x+mod(row,2.)*.5; vec2 f=fract(vec2(bx,m.y));\n      edge=min(min(f.x,1.-f.x),min(f.y,1.-f.y))*.5; bid=hash21(vec2(floor(mod(bx,8.)),row));\n    }\n    float H(vec2 uv){ float e,b; sl(uv,e,b); return smoothstep(.006,.02,e)*(.012+(b-.5)*.004+(fbm(uv*40.,40.,4)-.5)*.006); }\n    vec3 ALB(vec2 uv,float h){ float e,b; sl(uv,e,b); vec3 c=mix(vec3(.20,.20,.22),vec3(.36,.34,.32),fbm(uv*12.,12.,4))*(.8+.35*b); return mix(vec3(.08,.08,.09),c,smoothstep(.006,.02,e)); }\n    vec3 ORM(vec2 uv,float h){ float e,b; sl(uv,e,b); return vec3(mix(.4,1.,smoothstep(.004,.03,e)),.55+.3*fbm(uv*30.,30.,3),0.); }"
}, Vu = "varying vec2 vUv; void main(){ vUv=position.xy*.5+.5; gl_Position=vec4(position.xy,0.,1.); }", Hu = new X(new ea(2, 2)), Uu = new uo(-1, 1, 1, -1, 0, 1), Wu = new yt();
Wu.add(Hu);
function Gu(t, n, r, s) {
	let c = new ma({
		vertexShader: Vu,
		fragmentShader: zu + Bu[n] + `
    void main(){
      #if PASS==0
        float h=H(vUv); gl_FragColor=vec4(ALB(vUv,h),1.);
      #elif PASS==1
        float e=1./${r}.0;
        float dx=(H(vUv+vec2(e,0.))-H(vUv-vec2(e,0.)))/(2.*e*TILE);
        float dy=(H(vUv+vec2(0.,e))-H(vUv-vec2(0.,e)))/(2.*e*TILE);
        vec3 n=normalize(vec3(-dx*NSTR*40.,-dy*NSTR*40.,1.)); gl_FragColor=vec4(n*.5+.5,1.);
      #else
        float h=H(vUv); gl_FragColor=vec4(ORM(vUv,h),1.);
      #endif
    }`,
		defines: { PASS: s },
		depthTest: !1,
		depthWrite: !1
	});
	Hu.material = c;
	let l = new Pe(r, r, {
		type: o,
		depthBuffer: !1,
		generateMipmaps: !0,
		minFilter: a,
		magFilter: i,
		wrapS: e,
		wrapT: e
	});
	return l.texture.colorSpace = s === 0 ? k : "", l.texture.anisotropy = Math.min(8, t.capabilities.getMaxAnisotropy()), t.setRenderTarget(l), t.render(Wu, Uu), t.setRenderTarget(null), c.dispose(), l.texture;
}
function Ku(e, t, n) {
	let r = e.autoClear, i = e.toneMapping;
	e.autoClear = !0, e.toneMapping = 0;
	let a = {
		map: Gu(e, t, n, 0),
		normalMap: Gu(e, t, n, 1),
		orm: Gu(e, t, n, 2)
	};
	return e.autoClear = r, e.toneMapping = i, a.tile = parseFloat(/const float TILE=([\d.]+)/.exec(Bu[t])[1]), a;
}
function qu(e, t) {
	return t ||= {}, new ga(Object.assign({
		map: e.map,
		normalMap: e.normalMap,
		normalScale: new U(t.normal || 1, t.normal || 1),
		aoMap: e.orm,
		aoMapIntensity: t.ao === void 0 ? 1 : t.ao,
		roughnessMap: e.orm,
		metalnessMap: e.orm,
		roughness: 1,
		metalness: 1
	}, t.params || {}));
}
//#endregion
//#region scene3d/parliament3d.js
var Ju = Math.PI * 2, Yu = 2e3;
function Xu(e) {
	let t = e | 0;
	return function() {
		t = t + 1831565813 | 0;
		let e = Math.imul(t ^ t >>> 15, 1 | t);
		return e = e + Math.imul(e ^ e >>> 7, 61 | e) ^ e, ((e ^ e >>> 14) >>> 0) / 4294967296;
	};
}
var $ = Xu(20260924), Zu = (e, t, n) => e < t ? t : e > n ? n : e, Qu = (e, t, n) => {
	let r = Zu((n - e) / (t - e), 0, 1);
	return r * r * (3 - 2 * r);
};
function $u(t, n, r, i) {
	i ||= {};
	let a = document.createElement("canvas");
	a.width = t, a.height = n, r(a.getContext("2d"), t, n);
	let o = new Dr(a);
	return i.srgb !== !1 && (o.colorSpace = k), o.anisotropy = 4, i.repeat && (o.wrapS = o.wrapT = e), o;
}
function ed(e, t, n, r) {
	let i = e * n, a = [[-e, 0], [-e, t]], o = Math.acos(Zu(e / i - 1, -1, 1));
	for (let n = 1; n <= r; n++) {
		let s = Math.PI + (o - Math.PI) * (n / r);
		a.push([-e + i + i * Math.cos(s), t + i * Math.sin(s)]);
	}
	for (let n = r - 1; n >= 0; n--) {
		let s = Math.PI + (o - Math.PI) * (n / r);
		a.push([e - i - i * Math.cos(s), t + i * Math.sin(s)]);
	}
	return a.push([e, 0]), a;
}
function td(e, t, n, r) {
	let i = new fi();
	i.moveTo(-e / 2, 0), i.lineTo(e / 2, 0), i.lineTo(e / 2, t), i.lineTo(-e / 2, t), i.closePath(), r.forEach((e) => {
		let t = new di();
		ed(e.hw, e.spring, e.k, 8).forEach((n, r) => {
			let i = e.cx + n[0], a = e.y0 + n[1];
			r === 0 ? t.moveTo(i, a) : t.lineTo(i, a);
		}), t.closePath(), i.holes.push(t);
	});
	let a = new Xi(i, {
		depth: n,
		bevelEnabled: !1,
		curveSegments: 4
	});
	return a.translate(0, 0, -n / 2), a;
}
function nd() {
	return $u(128, 128, (e, t, n) => {
		e.createLinearGradient(0, 0, 0, 0);
		let r = e.createRadialGradient(t / 2, n / 2, 0, t / 2, n / 2, t / 2);
		r.addColorStop(0, "rgba(255,255,255,1)"), r.addColorStop(.25, "rgba(255,255,255,.55)"), r.addColorStop(.6, "rgba(255,255,255,.12)"), r.addColorStop(1, "rgba(255,255,255,0)"), e.fillStyle = r, e.fillRect(0, 0, t, n);
	});
}
var rd = "\nvarying vec3 vD;\nfloat h13(vec3 p){ p=fract(p*.1031); p+=dot(p,p.zyx+31.32); return fract((p.x+p.y)*p.z); }\nfloat n3(vec3 x){ vec3 i=floor(x); vec3 f=fract(x); f=f*f*(3.-2.*f);\n  return mix(mix(mix(h13(i),h13(i+vec3(1,0,0)),f.x),mix(h13(i+vec3(0,1,0)),h13(i+vec3(1,1,0)),f.x),f.y),\n             mix(mix(h13(i+vec3(0,0,1)),h13(i+vec3(1,0,1)),f.x),mix(h13(i+vec3(0,1,1)),h13(i+vec3(1,1,1)),f.x),f.y),f.z); }\nfloat fbm(vec3 p){ float a=.5,s=0.; for(int i=0;i<5;i++){ s+=a*n3(p); p=p*2.03+vec3(1.7,9.2,3.1); a*=.5; } return s; }\nvec3 stars(vec3 d,float N,float th,float sz,float boost){\n  vec3 p=d*N; vec3 c=floor(p); vec3 f=p-c; float h=h13(c);\n  if(h<th) return vec3(0.);\n  vec3 o=vec3(h13(c+7.1),h13(c+13.7),h13(c+3.3))*.7+.15;\n  float dd=length(f-o);\n  float amp=pow((h-th)/(1.-th),2.2);\n  vec3 col=mix(vec3(.65,.78,1.),vec3(1.,.82,.55),h13(c+21.));\n  return col*pow(smoothstep(sz,0.,dd),2.)*amp*boost;\n}\nvoid main(){\n  vec3 d=normalize(vD); float e=d.y;\n  float glow=pow(clamp(1.-abs(e),0.,1.),6.);\n  vec3 col=mix(vec3(.0016,.0030,.0110),vec3(.0042,.0075,.0230),smoothstep(-.1,.5,e))+vec3(.050,.030,.022)*glow*step(-.06,e);\n  vec3 n=normalize(vec3(.284,-.898,-.335));\n  float b=dot(d,n), band=exp(-b*b/(2.*.15*.15));\n  float cen=pow(max(dot(d,normalize(vec3(.95,.3,0.)))*.5+.5,0.),5.);\n  float dens=fbm(d*3.2+vec3(2.,0.,1.));\n  float dust=smoothstep(.48,.7,fbm(d*5.5+vec3(7.,3.,1.)));\n  float mw=band*(.3+1.0*dens)*(1.-.78*dust);\n  col+=mix(vec3(.30,.36,.66),vec3(.95,.66,.42),cen)*mw*.20;\n  float vis=smoothstep(-.02,.07,e);\n  vec3 st=stars(d,90.,.965-.03*band,.16,7.)+stars(d,180.,.95-.05*band,.15,5.)+stars(d,340.,.94-.07*band,.17,3.5)+stars(d,640.,.94-.10*band,.18,2.);\n  float cl=smoothstep(.56,.84,fbm(vec3(d.xz/(e+.4)*1.25,.5)));\n  cl*=smoothstep(.02,.16,e)*(1.-smoothstep(.55,.9,e));\n  vec3 clc=vec3(.16,.10,.17)*(.5+1.4*glow)+vec3(.012,.012,.02);\n  col=mix(col+st*vis*(1.-cl*.9),clc,cl*.65);\n  gl_FragColor=vec4(col,1.);\n}";
function id(e, t, n) {
	let r = new yt(), i = new ma({
		side: 1,
		depthWrite: !1,
		vertexShader: "varying vec3 vD; void main(){ vD=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }",
		fragmentShader: rd
	});
	r.add(new X(new ra(10, 48, 24), i));
	let s = new ps(t, {
		type: n ? u : o,
		generateMipmaps: !0,
		minFilter: a
	});
	return new go(.1, 100, s).update(e, r), i.dispose(), s.texture;
}
var ad = {
	name: "ParliamentWater",
	uniforms: {
		color: { value: null },
		tDiffuse: { value: null },
		textureMatrix: { value: null },
		uTime: { value: 0 }
	},
	vertexShader: "uniform mat4 textureMatrix; varying vec4 vUv; varying vec3 vW;\n    void main(){ vUv=textureMatrix*vec4(position,1.); vec4 w=modelMatrix*vec4(position,1.); vW=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }",
	fragmentShader: "uniform vec3 color; uniform sampler2D tDiffuse; uniform float uTime; varying vec4 vUv; varying vec3 vW;\n    void main(){\n      vec3 V=cameraPosition-vW; float dist=length(V); V/=dist;\n      vec2 p=vW.xz;\n      float a=sin(p.x*.42+uTime*.7+sin(p.y*.11+uTime*.25)*2.);\n      float b=sin(p.y*.6-uTime*.9+p.x*.17);\n      float c=sin((p.x+p.y)*1.3+uTime*1.6)*.5+sin((p.x-p.y)*1.9-uTime*1.3)*.5;\n      vec2 n=vec2(a*.6+c*.4,b*.6+c*.3);\n      float amp=.0018+.0022*clamp(dist/200.,0.,2.);\n      vec2 uv=vUv.xy/vUv.w+n*amp;\n      vec3 refl=clamp((texture2D(tDiffuse,uv+vec2(.0014,0.)).rgb+texture2D(tDiffuse,uv-vec2(.0014,0.)).rgb+texture2D(tDiffuse,uv+vec2(0.,.0014)).rgb+texture2D(tDiffuse,uv-vec2(0.,.0014)).rgb)*.25,0.,12.);\n      float fres=.05+.95*pow(1.-clamp(V.y,0.,1.),4.);\n      vec3 deep=vec3(.006,.010,.024);\n      vec3 col=mix(deep,refl*.9,clamp(fres*1.7+.14,0.,1.));\n      float glint=pow(max(0.,dot(normalize(vec3(n.x*.35,1.,n.y*.35)),V)),70.);\n      col+=vec3(1.,.72,.42)*glint*.10;\n      float f=1.-exp(-pow(.0011*dist,2.));\n      col=mix(col,vec3(.006,.006,.011),f*.6);\n      gl_FragColor=vec4(col,1.);\n    }"
}, od = {
	uniforms: { tDiffuse: { value: null } },
	vertexShader: "varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }",
	fragmentShader: "uniform sampler2D tDiffuse; varying vec2 vUv;\n    void main(){ vec4 c=texture2D(tDiffuse,vUv); if(any(isnan(c.rgb))||any(isinf(c.rgb))) c.rgb=vec3(0.); gl_FragColor=vec4(clamp(c.rgb,0.,24.),1.); }"
}, sd = {
	uniforms: {
		tDiffuse: { value: null },
		tPrev: { value: null },
		uMix: { value: 0 }
	},
	vertexShader: "varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }",
	fragmentShader: "uniform sampler2D tDiffuse,tPrev; uniform float uMix; varying vec2 vUv;\n    void main(){ vec3 c=texture2D(tDiffuse,vUv).rgb; c=mix(c,texture2D(tPrev,vUv).rgb,uMix); gl_FragColor=vec4(c,1.); }"
}, cd = {
	uniforms: {
		tDiffuse: { value: null },
		uTime: { value: 0 },
		uVig: { value: .5 },
		uGrain: { value: .018 },
		uCA: { value: .0016 },
		uFlash: { value: 0 },
		uFlashCol: { value: new J(2.5, 1.35, .42) }
	},
	vertexShader: "varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }",
	fragmentShader: "uniform sampler2D tDiffuse; uniform float uTime,uVig,uGrain,uCA,uFlash; uniform vec3 uFlashCol; varying vec2 vUv;\n    void main(){\n      vec2 c=vUv-.5; float r2=dot(c,c); vec2 off=c*r2*uCA*8.;\n      vec3 col=vec3(texture2D(tDiffuse,vUv+off).r,texture2D(tDiffuse,vUv).g,texture2D(tDiffuse,vUv-off).b);\n      col*=1.-uVig*smoothstep(.10,.62,r2*2.0);\n      float l=dot(col,vec3(.299,.587,.114));\n      col=mix(col,col*vec3(.90,.98,1.12),smoothstep(.30,0.,l));\n      float g=fract(sin(dot(vUv*1000.+fract(uTime)*97.,vec2(12.9898,78.233)))*43758.5453);\n      col+=(g-.5)*uGrain*(.25+.75*smoothstep(1.,.0,l));\n      col=mix(col,uFlashCol,uFlash);\n      gl_FragColor=vec4(max(col,0.),1.);\n    }"
};
function ld() {
	return {
		stone: new ga({
			color: 13609062,
			roughness: .7,
			emissive: 3810058
		}),
		stoneLight: new ga({
			color: 15323029,
			roughness: .7,
			emissive: 3810058
		}),
		gold: new ga({
			color: 15974746,
			emissive: 8015888,
			roughness: .35,
			metalness: .7
		}),
		dome: new ga({
			color: 14262858,
			emissive: 4860936,
			roughness: .5,
			metalness: .3
		})
	};
}
function ud(e, t, n, r) {
	return e.onBeforeCompile = (e) => {
		e.vertexShader = e.vertexShader.replace("#include <common>", "#include <common>\nvarying vec3 vWP;").replace("#include <project_vertex>", "#include <project_vertex>\n{\n  vec4 wq = vec4(transformed, 1.0);\n  #ifdef USE_INSTANCING\n    wq = instanceMatrix * wq;\n  #endif\n  vWP = (modelMatrix * wq).xyz;\n}"), e.fragmentShader = e.fragmentShader.replace("#include <common>", "#include <common>\nvarying vec3 vWP;").replace("#include <color_fragment>", `#include <color_fragment>
${r ? "{\n  float n1 = sin(vWP.x * 1.7) * sin(vWP.y * 0.9 + vWP.z * 1.3);\n  float streak = smoothstep(0.55, 1.0, sin(vWP.x * 2.3 + sin(vWP.y * 0.31 + vWP.z) * 2.6) * 0.5 + 0.5) * smoothstep(60.0, 0.0, vWP.y);\n  float soot = smoothstep(18.0, 48.0, vWP.y) * 0.14;\n  diffuseColor.rgb *= 1.0 - 0.1 * streak - soot + 0.05 * n1;\n}" : ""}`).replace("#include <opaque_fragment>", `outgoingLight *= mix(${n.toFixed(2)}, ${t.toFixed(2)}, smoothstep(0.0, 100.0, vWP.y)) * (0.92 + 0.16 * sin(vWP.x * 0.23 + vWP.z * 0.17) * sin(vWP.z * 0.31 + vWP.y * 0.05));
#include <opaque_fragment>`);
	}, e.customProgramCacheKey = () => "flood" + t + n + (r ? "g" : ""), e;
}
function dd(t, n, r, i, a) {
	let o = (t) => {
		let i = t.clone();
		return i.repeat.set(n, r), i.wrapS = i.wrapT = e, i.needsUpdate = !0, i;
	};
	return qu({
		map: o(t.map),
		normalMap: o(t.normalMap),
		orm: o(t.orm)
	}, {
		normal: a || 1,
		params: i
	});
}
function fd(e) {
	let t = new yt();
	t.add(new X(new ra(10, 32, 16), new ma({
		side: 1,
		vertexShader: "varying vec3 vD; void main(){ vD=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }",
		fragmentShader: "varying vec3 vD; void main(){\n      vec3 d=normalize(vD); float e=d.y;\n      vec3 sky=mix(vec3(.012,.022,.06),vec3(.002,.004,.016),smoothstep(0.,.8,e));\n      vec3 warm=vec3(1.5,.78,.3)*exp(-pow((e+.02)/.24,2.));\n      vec3 ground=vec3(.55,.30,.11)*1.5*smoothstep(.1,-.5,e);\n      gl_FragColor=vec4(sky+warm+ground,1.); }"
	})));
	let n = new is(e), r = n.fromScene(t, .02).texture;
	return n.dispose(), r;
}
function pd(e, t, n) {
	let r = new ut(), i = ld(), a = n.mats, o = nd(), s = [], c = new ea(3200, 1500);
	c.rotateX(-Math.PI / 2);
	let l = new X(c, dd(n.sets.paving, 3200 / 1.5, 1e3, {
		color: 14211812,
		envMapIntensity: .9,
		emissive: 3810320,
		emissiveIntensity: 1
	}, 1.2));
	l.position.set(0, -.06, -710), l.receiveShadow = !1, r.add(l);
	let u = new X(new jr(3200, 2.6, 3), new ga({
		color: 5921384,
		roughness: .9,
		emissive: 2759180
	}));
	u.position.set(0, -1.3, 40.5), r.add(u);
	let d = (e, t, i, a) => {
		let o = new ea(e, t);
		o.rotateX(-Math.PI / 2);
		let s = new X(o, dd(n.sets.paving, e / 1.5, t / 1.5, {
			color: 15782560,
			envMapIntensity: .9,
			emissive: 5912594,
			emissiveIntensity: 1
		}, 1.2));
		return s.position.set(i, .03, a), s.receiveShadow = !1, r.add(s), s;
	};
	d(320, 17, 0, 31.5), d(200, 140, 0, -120);
	let f = new ma({
		uniforms: { uTime: { value: 0 } },
		vertexShader: "varying vec3 vW; void main(){ vec4 w=modelMatrix*vec4(position,1.); vW=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }",
		fragmentShader: [
			"uniform float uTime; varying vec3 vW;",
			"float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}",
			"void main(){",
			" float d=max(vW.z-41.0,0.0);",
			" float ax=abs(vW.x);",
			" float prof=smoothstep(150.0,118.0,ax)*(0.55+0.45*exp(-pow(vW.x/70.0,2.0)));",
			" float tall=exp(-pow(vW.x/30.0,2.0));",
			" float w1=sin(vW.x*0.8+sin(vW.z*0.05-uTime*0.5)*4.0+uTime*0.3);",
			" float w2=sin(vW.x*1.9+vW.z*0.04+uTime*0.9);",
			" float crest=0.65+0.35*sin(vW.z*0.22-uTime*1.1+w1*2.0);",
			" float stripe=pow(clamp(0.5+0.34*w1+0.16*w2,0.0,1.0),1.8)*crest;",
			" float refl=prof*exp(-d*0.014)+tall*0.7*exp(-d*0.008);",
			" vec3 base=vec3(0.006,0.011,0.030);",
			" vec3 gold=vec3(1.0,0.58,0.16);",
			" vec3 col=base+gold*refl*(0.18+1.1*stripe)*1.15;",
			" float spark=step(0.985,h(floor(vec2(vW.x*0.5,vW.z*0.8)+floor(uTime*2.0))))*refl;",
			" col+=vec3(1.0,0.8,0.5)*spark*0.8;",
			" float dist=length(vW-cameraPosition);",
			" float f=1.0-exp(-pow(0.0011*dist,2.0));",
			" col=mix(col,vec3(0.0018,0.0030,0.0116),f);",
			" gl_FragColor=vec4(col,1.0);",
			" #include <tonemapping_fragment>",
			" #include <colorspace_fragment>",
			"}"
		].join("\n")
	}), p = new ea(3200, 1500);
	p.rotateX(-Math.PI / 2);
	let m = new X(p, f);
	m.position.set(0, -2.6, 792), r.add(m), s.push((e) => {
		f.uniforms.uTime.value = e;
	});
	let h = null;
	t && (h = new gu(new ea(3200, 1500), {
		textureWidth: 2048,
		textureHeight: 1024,
		clipBias: .003,
		shader: ad,
		color: 659488,
		multisample: 0
	}), h.rotation.x = -Math.PI / 2, h.position.set(0, -2.6, 792), r.add(h), m.visible = !1, s.push((e) => {
		h.material.uniforms.uTime.value = e;
	})), r.add(Ru(a, {
		mobile: e,
		rand: $
	}));
	let g = {
		hw: 4.5,
		y0: 1.5,
		z: -51.2,
		spring: 8,
		k: 1.5
	}, _ = $u(256, 512, (e, t, n) => {
		e.fillStyle = "#5a3719", e.fillRect(0, 0, t, n);
		for (let t = 0; t < 4; t++) e.fillStyle = t % 2 ? "rgba(255,190,110,.10)" : "rgba(0,0,0,.14)", e.fillRect(t * 64, 0, 64, n), e.fillStyle = "rgba(0,0,0,.55)", e.fillRect(t * 64, 0, 2, n);
		for (let r = 0; r < 260; r++) e.fillStyle = "rgba(" + ($() > .5 ? "20,8,0" : "255,200,120") + "," + (.03 + $() * .05) + ")", e.fillRect($() * t, $() * n, 1 + $() * 2, 12 + $() * 60);
	}, { repeat: !0 });
	_.repeat.set(.25, .12);
	let v = new ga({
		map: _,
		roughness: .5,
		metalness: .1,
		emissive: 2757640,
		emissiveIntensity: .9,
		side: 2
	}), y = (e) => {
		let t = ed(g.hw, g.spring, g.k, 10).filter((e) => e[0] >= -1e-6), n = new fi();
		n.moveTo(0, 0), t.forEach((t) => n.lineTo(e * (t[0] - g.hw), t[1])), n.closePath();
		let r = new Xi(n, {
			depth: .3,
			bevelEnabled: !1,
			curveSegments: 6
		});
		r.translate(0, 0, -.15);
		let i = new ut();
		i.add(new X(r, v));
		let o = -e * g.hw / 2;
		[
			1.7,
			4.6,
			7.5
		].forEach((e) => {
			let t = new X(new jr(g.hw - .3, .26, .42), a.gold);
			t.position.set(o, e, 0), i.add(t);
		});
		let s = new X(new jr(.22, g.spring + 1.2, .42), a.gold);
		s.position.set(-e * (g.hw - .14), (g.spring + 1.2) / 2, 0), i.add(s);
		let c = new X(new jr(.2, g.spring, .42), a.gold);
		c.position.set(e * -.1, g.spring / 2, 0), i.add(c);
		let l = new X(new ia(.34, .055, 8, 18), a.gold);
		l.position.set(-e * (g.hw - .9), 4.6, .3), i.add(l);
		for (let e = 0; e < 6; e++) for (let t = 0; t < 3; t++) {
			let n = new X(new ra(.1, 6, 5), a.gold);
			n.position.set(o + (e - 2.5) * .62, 3.1 + t * 2.9, .2), i.add(n);
		}
		return i;
	}, b = new ut(), x = new ut();
	b.position.set(g.hw, g.y0, g.z), x.position.set(-g.hw, g.y0, g.z), b.add(y(1)), x.add(y(-1)), r.add(b, x);
	let S = -50.5, C = g.hw + .2, w = ed(C, g.spring, g.k, 10), T = [], E = [], D = [], O = [
		.5,
		.3,
		.12
	], k = [
		1.35,
		.85,
		.36
	], A = [
		.42,
		.04,
		.04
	], j = [
		1.2,
		.2,
		.13
	], M = [
		1.5,
		1,
		.35
	], N = (e, t, n, r, i, a, o) => {
		let s = T.length / 3;
		[
			[
				e,
				n,
				i
			],
			[
				t,
				n,
				i
			],
			[
				t,
				r,
				a
			],
			[
				e,
				r,
				a
			]
		].forEach((e) => {
			T.push(e[0][0] * o[0], (e[0][1] - o[2]) * o[1] + o[2] + g.y0 + o[3], e[1]), E.push(e[2][0], e[2][1], e[2][2]);
		}), D.push(s, s + 1, s + 2, s, s + 2, s + 3);
	}, P = (g.spring + C * Math.sqrt(2 * g.k - 1)) / 2;
	for (let e = 0; e < w.length; e++) {
		let t = w[e], n = w[(e + 1) % w.length], r = e === w.length - 1;
		if (N(t, n, S, -43.7, r ? A : O, r ? j : k, [
			1,
			1,
			0,
			r ? .02 : 0
		]), !r) for (let e = 1; e <= 3; e++) N(t, n, S + e * 1.7, S + e * 1.7 + .22, M, M, [
			.994,
			.994,
			P,
			0
		]);
	}
	let F = new pn();
	F.setAttribute("position", new Y(T, 3)), F.setAttribute("color", new Y(E, 3)), F.setIndex(D), r.add(new X(F, new Wn({
		vertexColors: !0,
		side: 2,
		fog: !1
	})));
	let I = $u(256, 512, (e, t, n) => {
		let r = e.createRadialGradient(t / 2, n * .78, 8, t / 2, n * .62, n * .8);
		r.addColorStop(0, "#fff6d8"), r.addColorStop(.32, "#ffc866"), r.addColorStop(1, "#a04c14"), e.fillStyle = r, e.fillRect(0, 0, t, n);
		for (let r = 0; r < 10; r++) e.fillStyle = "rgba(96,32,0," + (.1 + r * .02) + ")", e.fillRect(t * .14 + r * 2.4, n - 14 - r * r * 3 - r * 12, t * .72 - r * 4.8, 3);
		e.fillStyle = "rgba(160,22,22,.8)", e.beginPath(), e.moveTo(t * .34, n), e.lineTo(t * .66, n), e.lineTo(t * .54, n * .5), e.lineTo(t * .46, n * .5), e.closePath(), e.fill(), [
			[.24, .3],
			[.76, .3],
			[.3, .55],
			[.7, .55]
		].forEach((r) => {
			let i = e.createRadialGradient(t * r[0], n * r[1], 0, t * r[0], n * r[1], 26);
			i.addColorStop(0, "rgba(255,255,235,1)"), i.addColorStop(1, "rgba(255,220,140,0)"), e.fillStyle = i, e.fillRect(t * r[0] - 26, n * r[1] - 26, 52, 52);
		});
	}), ee = new fi();
	w.forEach((e, t) => {
		t ? ee.lineTo(e[0], e[1]) : ee.moveTo(e[0], e[1]);
	}), ee.closePath();
	let L = new ta(ee), te = L.attributes.position, ne = new Float32Array(te.count * 2), re = g.spring + C * Math.sqrt(2 * g.k - 1);
	for (let e = 0; e < te.count; e++) ne[e * 2] = (te.getX(e) + C) / (2 * C), ne[e * 2 + 1] = te.getY(e) / re;
	L.setAttribute("uv", new Qt(ne, 2));
	let R = new X(L, new Wn({
		map: I,
		color: new J(1, .92, .8),
		side: 2,
		fog: !1
	}));
	R.position.set(0, g.y0, -43.75), r.add(R);
	let z = (e) => {
		let t = Zu(e, 0, 1) * 1.4;
		b.rotation.y = -t, x.rotation.y = t;
	}, B = new Fu();
	for (let e = 0; e < 8; e++) {
		let t = (8 - e) * .18;
		B.add(new jr(46, t, 2), Q(0, t / 2, -53 - e * 2));
	}
	B.add(new jr(10, 1.5, 2.2), Q(0, .75, -51.1)), [-20, 20].forEach((e) => {
		B.add(new jr(4, 3, 7), Q(e, 1.5, -62)), B.add(new jr(2.6, 2.2, 5), Q(e, 4.1, -62)), B.add(new ra(1.5, 10, 8), Q(e, 5.3, -59.4));
	});
	let V = B.mesh(a.stone, 1.5);
	V.castShadow = V.receiveShadow = !0, r.add(V);
	let ie = $u(64, 48, (e, t, n) => {
		e.fillStyle = "#ce2939", e.fillRect(0, 0, t, n / 3), e.fillStyle = "#f4f4f0", e.fillRect(0, n / 3, t, n / 3), e.fillStyle = "#477050", e.fillRect(0, 2 * n / 3, t, n / 3);
	}), ae = [];
	[
		-36,
		-18,
		18,
		36
	].forEach((e) => {
		let t = new X(new Pr(.18, .22, 34, 6), a.gold);
		t.position.set(e, 17, -82), t.castShadow = !0, r.add(t);
		let n = new ea(9, 6, 16, 8);
		n.translate(4.5, 0, 0);
		let i = new X(n, new ga({
			map: ie,
			side: 2,
			emissive: 16777215,
			emissiveMap: ie,
			emissiveIntensity: .3,
			roughness: 1
		}));
		i.position.set(e + .2, 30, -82), r.add(i), ae.push({
			mesh: i,
			base: n.attributes.position.array.slice(),
			phase: e * .3
		});
	}), s.push((e) => {
		ae.forEach((t) => {
			let n = t.mesh.geometry.attributes.position, r = n.array;
			for (let n = 0; n < r.length; n += 3) {
				let i = t.base[n], a = t.base[n + 1];
				r[n + 2] = Math.sin(i * .9 - e * 3.2 + a * .5 + t.phase) * .9 * (i / 9), r[n + 1] = a + Math.sin(i * .7 - e * 2.4 + t.phase) * .25 * (i / 9);
			}
			n.needsUpdate = !0;
		});
	});
	let oe = [], se = [];
	for (let e = -260; e <= 260; e += 9) oe.push(e, 3.4, 37), se.push(1, .72, .38);
	for (let e = -60; e >= -240; e -= 12) [
		-70,
		-46,
		46,
		70
	].forEach((t) => {
		oe.push(t, 3.4, e), se.push(1, .72, .38);
	});
	let ce = new pn();
	ce.setAttribute("position", new Y(oe, 3)), ce.setAttribute("color", new Y(se, 3)), r.add(new Cr(ce, new vr({
		size: 5,
		map: o,
		vertexColors: !0,
		transparent: !0,
		depthWrite: !1,
		blending: 2,
		fog: !1
	})));
	let le = e ? 110 : 230, ue = $u(512, 512, (e, t, n) => {
		e.fillStyle = "#3a3f52", e.fillRect(0, 0, t, n);
		for (let r = 0; r < 700; r++) e.fillStyle = "rgba(" + ($() > .5 ? "255,255,255" : "0,0,0") + ",.03)", e.fillRect($() * t, $() * n, 4 + $() * 12, 4 + $() * 12);
		for (let t = 0; t < 8; t++) for (let n = 0; n < 8; n++) e.fillStyle = "#12151f", e.fillRect(n * 64 + 14, t * 64 + 12, 30, 38);
	}), H = $u(512, 512, (e, t, n) => {
		e.fillStyle = "#000", e.fillRect(0, 0, t, n);
		for (let t = 0; t < 8; t++) for (let n = 0; n < 8; n++) if ($() < .5) {
			let r = .55 + $() * .45;
			e.fillStyle = "rgb(" + Math.round(255 * r) + "," + Math.round(190 * r) + "," + Math.round(96 * r) + ")", e.fillRect(n * 64 + 14, t * 64 + 12, 30, 38);
		}
	}), de = new Fu();
	for (let e = 0; e < le; e++) {
		let e = 16 + $() * 26, t = 16 + $() * 26, n = 14 + $() * 34, r, i;
		for (let e = 0; e < 20 && ($() < .6 ? (r = ($() - .5) * 1400, i = -280 - $() * 560) : (r = ($() < .5 ? -1 : 1) * (175 + $() * 520), i = -230 + $() * 240), Math.abs(r) < 230 && i > -330 || i > 8 && Math.abs(r) < 400); e++);
		de.add(new jr(e, n, t), Q(r, n / 2, i));
	}
	let fe = de.mesh(new ga({
		map: ue,
		emissiveMap: H,
		emissive: 16777215,
		emissiveIntensity: 1.3,
		roughness: .9,
		color: 10133688
	}), 24);
	r.add(fe);
	let pe = new fi();
	pe.moveTo(-1600, 0);
	for (let e = -1600; e <= 1600; e += 100) pe.lineTo(e, 40 + 60 * Math.sin(e * .004 + 1) + 30 * Math.sin(e * .011) + (Math.abs(e - 260) < 320 ? 50 : 0));
	pe.lineTo(1600, 0), pe.closePath();
	let me = new X(new ta(pe), new Wn({
		color: 527644,
		side: 2
	}));
	me.position.set(0, -2, 760), me.rotation.y = Math.PI, r.add(me);
	let U = new Fu();
	U.add(new jr(220, 30, 40), Q(-260, 100, 700));
	let he = U.mesh(a.stone, 6);
	r.add(he);
	let W = new X(new ra(20, 14, 8, 0, Ju, 0, Math.PI / 2), i.dome);
	W.position.set(-260, 115, 700), r.add(W);
	let ge = [], _e = [];
	for (let e = -1400; e <= 1400; e += 14) ge.push(e, 4, 690 + $() * 20), _e.push(1, .7, .35);
	let G = new pn();
	G.setAttribute("position", new Y(ge, 3)), G.setAttribute("color", new Y(_e, 3)), r.add(new Cr(G, new vr({
		size: 9,
		map: o,
		vertexColors: !0,
		transparent: !0,
		depthWrite: !1,
		blending: 2,
		fog: !1
	})));
	let ve = new X(new jr(14, 3, 660), new ga({
		color: 1777973,
		roughness: 1,
		emissive: 527124
	}));
	ve.position.set(-540, 8, 380), r.add(ve);
	let ye = [];
	for (let e = 60; e <= 690; e += 10) ye.push(-546.5, 11, e, -533.5, 11, e);
	for (let e = 90; e <= 650; e += 110) {
		let t = new X(new Pr(4, 5, 12, 8), i.stone);
		t.position.set(-540, 1, e), r.add(t);
	}
	let be = new pn();
	be.setAttribute("position", new Y(ye, 3)), r.add(new Cr(be, new vr({
		size: 6,
		map: o,
		color: 16761962,
		transparent: !0,
		depthWrite: !1,
		blending: 2,
		fog: !1
	})));
	let xe = new ut(), Se = $u(512, 64, (e, t, n) => {
		e.fillStyle = "#e9edf3", e.fillRect(0, 0, t, n);
		for (let t = 0; t < 22; t++) e.fillStyle = "#1a2233", e.fillRect(10 + t * 22.6, 14, 17, 30);
	}), Ce = $u(512, 64, (e, t, n) => {
		e.fillStyle = "#000", e.fillRect(0, 0, t, n);
		for (let t = 0; t < 22; t++) {
			let n = .7 + $() * .3;
			e.fillStyle = "rgb(" + Math.round(255 * n) + "," + Math.round(196 * n) + "," + Math.round(110 * n) + ")", e.fillRect(10 + t * 22.6, 14, 17, 30);
		}
	}), we = new fi();
	we.moveTo(-18, -3.6), we.lineTo(13, -3.6), we.quadraticCurveTo(18.5, -2.4, 20, 0), we.quadraticCurveTo(18.5, 2.4, 13, 3.6), we.lineTo(-18, 3.6), we.closePath();
	let Te = new Xi(we, {
		depth: 2.4,
		bevelEnabled: !0,
		bevelSize: .25,
		bevelThickness: .25,
		bevelSegments: 2,
		curveSegments: 10
	});
	Te.rotateX(-Math.PI / 2);
	let Ee = new X(Te, new ga({
		color: 1317939,
		roughness: .35,
		metalness: .3
	}));
	Ee.position.y = -.6, xe.add(Ee);
	let De = new X(new jr(37, .35, 7.4), new ga({
		color: 14278118,
		roughness: .5
	}));
	De.position.y = 1.9, De.scale.x = 1, xe.add(De);
	let Oe = (e, t, n, r, i) => {
		let a = new ga({
			map: Se,
			emissiveMap: Ce,
			emissive: 16777215,
			emissiveIntensity: 1.2,
			roughness: .5,
			color: 16777215
		}), o = new X(new jr(e, t, n), [
			a,
			a,
			new ga({
				color: 15133168,
				roughness: .6
			}),
			new ga({ color: 546 }),
			a,
			a
		]);
		o.position.set(i, r, 0), xe.add(o);
	};
	Oe(29, 2.7, 6.6, 3.5, -2), Oe(19, 2.5, 5.4, 6.2, -4);
	let ke = new X(new Pr(.9, 1.1, 3.4, 12), new ga({
		color: 13115439,
		roughness: .5
	}));
	ke.position.set(-9, 9, 0), xe.add(ke);
	let Ae = new X(new Pr(.08, .1, 6, 5), new ga({ color: 14540253 }));
	Ae.position.set(9, 8.5, 0), xe.add(Ae);
	let je = new Ln(new Cn({
		map: o,
		color: 16761962,
		blending: 2,
		transparent: !0,
		opacity: .4,
		depthWrite: !1,
		fog: !1
	}));
	je.scale.set(56, 22, 1), je.position.y = 3.5, xe.add(je), xe.traverse((e) => {
		e.isMesh && (e.castShadow = !1, e.receiveShadow = !1);
	}), xe.scale.setScalar(.85), xe.position.set(0, -2.2, 104), r.add(xe), s.push((e) => {
		let t = (e * 3.6 + 330) % 720 - 360;
		xe.position.x = t, xe.position.y = -2 + Math.sin(e * .9) * .18, xe.rotation.z = Math.sin(e * .7) * .012;
	});
	let K = e ? 0 : 1100, Me = null;
	if (K) {
		let e = new Float32Array(K * 3), t = new Float32Array(K * 3), n = new Float32Array(K * 3), i = new Float32Array(K), a = new pn();
		a.setAttribute("position", new Qt(e, 3)), a.setAttribute("color", new Qt(t, 3));
		let c = new Cr(a, new vr({
			size: 4.2,
			map: o,
			vertexColors: !0,
			transparent: !0,
			depthWrite: !1,
			blending: 2,
			fog: !1
		}));
		c.frustumCulled = !1, r.add(c), Me = {
			pos: e,
			col: t,
			vel: n,
			life: i,
			geo: a,
			next: 3,
			head: 0,
			base: new Float32Array(K * 3)
		}, Me.burst = (t, r, a, o, s, c) => {
			for (let l = 0; l < 220; l++) {
				let l = Me.head;
				Me.head = (Me.head + 1) % K;
				let u = $() * Ju, d = Math.acos(2 * $() - 1), f = 24 + $() * 22;
				e[l * 3] = t, e[l * 3 + 1] = r, e[l * 3 + 2] = a, n[l * 3] = Math.sin(d) * Math.cos(u) * f, n[l * 3 + 1] = Math.cos(d) * f, n[l * 3 + 2] = Math.sin(d) * Math.sin(u) * f, Me.base[l * 3] = o, Me.base[l * 3 + 1] = s, Me.base[l * 3 + 2] = c, i[l] = 1.6 + $() * .5;
			}
		}, s.push((r, o, s) => {
			if (s) {
				if (Me.next -= o, Me.next < 0) {
					Me.next = 3.5 + $() * 5;
					let e = [
						[
							1,
							.3,
							.3
						],
						[
							.4,
							.8,
							1
						],
						[
							1,
							.85,
							.3
						],
						[
							.6,
							1,
							.5
						],
						[
							1,
							.5,
							1
						]
					][Math.floor($() * 5)];
					Me.burst(($() - .5) * 340, 95 + $() * 70, 150 + $() * 150, e[0], e[1], e[2]);
				}
				for (let r = 0; r < K; r++) {
					if (i[r] <= 0) {
						t[r * 3] = t[r * 3 + 1] = t[r * 3 + 2] = 0;
						continue;
					}
					i[r] -= o, n[r * 3 + 1] -= 16 * o;
					let a = Math.max(0, i[r]) / 2;
					e[r * 3] += n[r * 3] * o, e[r * 3 + 1] += n[r * 3 + 1] * o, e[r * 3 + 2] += n[r * 3 + 2] * o, n[r * 3] *= .985, n[r * 3 + 2] *= .985, t[r * 3] = Me.base[r * 3] * a, t[r * 3 + 1] = Me.base[r * 3 + 1] * a, t[r * 3 + 2] = Me.base[r * 3 + 2] * a;
				}
				a.attributes.position.needsUpdate = !0, a.attributes.color.needsUpdate = !0;
			}
		});
	}
	r.add(new qa(4874158, 1051672, .3));
	let Ne = {}, Pe = (t, n, i, a, o, s, c) => {
		let l = new po(n, i);
		l.position.set(a, o, s), l.target.position.set(0, 28, 0), l.shadow.mapSize.set(e ? 1024 : 2048, e ? 1024 : 2048);
		let u = l.shadow.camera;
		return u.left = -160, u.right = 160, u.top = 90, u.bottom = -38, u.near = 5, u.far = 460, l.shadow.bias = -6e-4, l.shadow.normalBias = .5, l.shadow.radius = 3, r.add(l, l.target), c && (Ne[t] = l), l;
	};
	return Pe("key", 16751150, 1.55, -70, 16, 240, !0), Pe("back", 16749872, 1.45, 60, 16, -240, !0), Pe("fill", 16756832, .3, 150, 20, 180, !1), Pe("sideA", 16756838, .35, 320, 50, 0, !1), Pe("sideB", 16756838, .35, -320, 50, 0, !1), {
		group: r,
		water: m,
		reflector: h,
		lights: Ne,
		door: z,
		update(e, t, n) {
			s.forEach((r) => r(e, t, n));
		}
	};
}
function md(e, t) {
	let n = new ut();
	n.position.set(Yu, 0, 0);
	let r = nd();
	$u(512, 512, (e, t, n) => {
		e.fillStyle = "#eadfc4", e.fillRect(0, 0, t, n);
		for (let r = 0; r < 260; r++) e.fillStyle = $() > .5 ? "rgba(160,130,90,.05)" : "rgba(255,250,235,.06)", e.beginPath(), e.arc($() * t, $() * n, 10 + $() * 60, 0, Ju), e.fill();
		for (let r = 0; r < 46; r++) {
			e.strokeStyle = "rgba(110,90,62," + (.12 + $() * .2) + ")", e.lineWidth = .6 + $() * 1.8, e.beginPath();
			let r = $() * t, i = $() * n;
			e.moveTo(r, i);
			for (let t = 0; t < 7; t++) r += ($() - .5) * 120, i += 30 + $() * 60, e.lineTo(r, i);
			e.stroke();
		}
	}, { repeat: !0 }).repeat.set(.22, .22);
	let i = dd(t.sets.stone, 1 / 1.5, 1 / 1.5, {
		color: 13219733,
		roughness: 1,
		envMapIntensity: .5
	}), a = dd(t.sets.stone, 4, 12, {
		color: 13219733,
		envMapIntensity: .5
	}), o = new Wn({
		map: $u(64, 64, (e, t, n) => {
			let r = e.createRadialGradient(t / 2, n / 2, 0, t / 2, n / 2, t / 2);
			r.addColorStop(0, "rgba(0,0,0,.65)"), r.addColorStop(1, "rgba(0,0,0,0)"), e.fillStyle = r, e.fillRect(0, 0, t, n);
		}),
		transparent: !0,
		depthWrite: !1
	}), s = new ea(1, 1);
	s.rotateX(-Math.PI / 2);
	let c = (e, t, r) => {
		let i = new X(s, o);
		i.scale.set(r, 1, r), i.position.set(e, .04, t), n.add(i);
	}, l = new ga({
		color: 15910494,
		emissive: 11565596,
		emissiveIntensity: 1.1,
		roughness: .35,
		metalness: .35
	}), u = new ga({
		color: 12159548,
		emissive: 5913098,
		emissiveIntensity: .8,
		roughness: .5,
		metalness: .3
	}), d = [], f = (e) => (t, n, r) => {
		t.fillStyle = e ? "#0b0f26" : "#16256a", t.fillRect(0, 0, n, r), t.strokeStyle = e ? "#ffcf70" : "#f2c65e", t.lineWidth = 3;
		for (let e = 30; e < r; e += 48) for (let r = 0; r < n; r += 64) t.beginPath(), t.arc(r + e / 48 % 2 * 32, e, 22, 0, Math.PI, !0), t.stroke();
		t.fillStyle = e ? "#ffe9a8" : "#ffd77a";
		for (let e = 0; e < 40; e++) t.beginPath(), t.arc($() * n, $() * r, 1.5 + $() * 2, 0, Ju), t.fill();
	}, p = $u(256, 512, f(!1), { repeat: !0 }), m = $u(256, 512, f(!0), { repeat: !0 });
	[p, m].forEach((e) => e.repeat.set(16, 1));
	let h = new ga({
		map: p,
		emissiveMap: m,
		emissive: 16777215,
		emissiveIntensity: .9,
		roughness: .8,
		side: 2
	});
	$u(1024, 1024, (e, t, n) => {
		e.fillStyle = "#e7d9b6", e.fillRect(0, 0, t, n), e.strokeStyle = "rgba(120,90,40,.25)", e.lineWidth = 1;
		for (let r = 0; r <= 16; r++) e.beginPath(), e.moveTo(r * 64, 0), e.lineTo(r * 64, n), e.moveTo(0, r * 64), e.lineTo(t, r * 64), e.stroke();
		let r = t / 2, i = n / 2;
		[
			[470, "#7a1414"],
			[430, "#e7d9b6"],
			[420, "#c99a3a"],
			[330, "#7a1414"],
			[300, "#e7d9b6"],
			[290, "#c99a3a"]
		].forEach((t) => {
			e.fillStyle = t[1], e.beginPath(), e.arc(r, i, t[0], 0, Ju), e.fill();
		}), e.fillStyle = "#c99a3a";
		for (let t = 0; t < 16; t++) {
			let n = t / 16 * Ju;
			e.beginPath(), e.moveTo(r + Math.cos(n - .09) * 60, i + Math.sin(n - .09) * 60), e.lineTo(r + Math.cos(n) * 285, i + Math.sin(n) * 285), e.lineTo(r + Math.cos(n + .09) * 60, i + Math.sin(n + .09) * 60), e.fill();
		}
		e.fillStyle = "#7a1414", e.beginPath(), e.arc(r, i, 70, 0, Ju), e.fill(), e.fillStyle = "#e7d9b6", e.beginPath(), e.arc(r, i, 52, 0, Ju), e.fill();
	});
	let g = new Nr(15.4, 64);
	g.rotateX(-Math.PI / 2);
	let _ = new X(g, dd(t.sets.floor, 30.8 / 3, 30.8 / 3, {
		color: 12101768,
		envMapIntensity: .8
	}, .8));
	_.position.y = 0, n.add(_);
	let v = 14.2, y = v * Math.cos(Math.PI / 16), b = 2 * v * Math.sin(Math.PI / 16), x = td(b, 16, .9, [
		{
			cx: 0,
			y0: 0,
			hw: 1.55,
			spring: 6.4,
			k: 1.5
		},
		{
			cx: -1.05,
			y0: 11,
			hw: .42,
			spring: 2.2,
			k: 1.5
		},
		{
			cx: 1.05,
			y0: 11,
			hw: .42,
			spring: 2.2,
			k: 1.5
		}
	]), S = new Wn({ color: new J(16754240).multiplyScalar(.78) });
	for (let e = 0; e < 16; e++) {
		let t = e / 16 * Ju, r = Math.sin(t), o = -Math.cos(t), s = new X(x, i);
		if (s.position.set(r * y, 0, o * y), s.rotation.y = -t, n.add(s), e !== 0) {
			let e = new X(new ea(b * .9, 16), S);
			e.position.set(r * (y + 1.4), 8, o * (y + 1.4)), e.rotation.y = -t, n.add(e);
		}
		let d = (e + .5) / 16 * Ju, f = Math.sin(d) * v, p = -Math.cos(d) * v, m = new X(new Pr(.75, .9, 18, 10), a);
		m.position.set(f, 9, p), n.add(m), c(f, p, 5), c(Math.sin(d) * 12.7, -Math.cos(d) * 12.7, 3.2);
		let h = new X(new Pr(1.25, .8, 1.4, 10), l);
		h.position.set(f, 16.4, p), n.add(h);
		let g = new X(new ia(.95, .09, 6, 14), l);
		g.rotation.x = Math.PI / 2, g.position.set(f, 9, p), n.add(g);
		let _ = Math.sin(d) * 12.7, C = -Math.cos(d) * 12.7, w = new X(new jr(1.1, 3.6, 1.1), i);
		w.position.set(_, 1.8, C), w.rotation.y = -d, n.add(w);
		let T = new X(new Mr(.34, 1.5, 4, 8), u);
		T.position.set(_, 5, C), n.add(T);
		let E = new X(new ra(.28, 8, 6), u);
		E.position.set(_, 6.2, C), n.add(E);
	}
	let C = new X(new ia(14.7, .22, 6, 64), l);
	C.rotation.x = Math.PI / 2, C.position.y = 16, n.add(C);
	let w = new X(new ia(14.7, .16, 6, 64), l);
	w.rotation.x = Math.PI / 2, w.position.y = 10.4, n.add(w);
	let T = [];
	for (let e = 0; e <= 26; e++) {
		let t = e / 26, n = 14.799999999999999 * Math.cos(t * Math.PI / 2) ** .82;
		if (n < 1.9) break;
		T.push(new U(n, 16 + t * 22));
	}
	n.add(new X(new $i(T, 16), h));
	for (let e = 0; e < 16; e++) {
		let t = e / 16 * Ju + Math.PI / 16, r = T.map((e) => new W(Math.sin(t) * (e.x - .1), e.y, -Math.cos(t) * (e.x - .1)));
		n.add(new X(new aa(new Gr(r), 30, .24, 5), l));
	}
	let E = T[T.length - 1], D = new X(new Nr(E.x, 20), new Wn({
		color: new J(14674431).multiplyScalar(5),
		side: 2
	}));
	D.rotation.x = Math.PI / 2, D.position.y = E.y + .02, n.add(D);
	let O = new Pr(E.x, 4.2, E.y, 24, 1, !0);
	O.translate(0, E.y / 2, 0);
	let k = new X(O, new Wn({
		color: 12572415,
		transparent: !0,
		opacity: .04,
		depthWrite: !1,
		blending: 2,
		side: 2
	}));
	n.add(k);
	let A = new Ln(new Cn({
		map: r,
		color: 13623551,
		blending: 2,
		transparent: !0,
		opacity: .8,
		depthWrite: !1
	}));
	A.scale.set(14, 14, 1), A.position.y = E.y - 1, n.add(A);
	let j = new ga({
		color: 16107098,
		emissive: 6964752,
		emissiveIntensity: .9,
		roughness: .3,
		metalness: .6
	}), M = new X(new Pr(1.4, 1.7, 1.2, 28), a);
	M.position.y = .6, n.add(M), c(0, 0, 7);
	let N = new X(new Pr(1.5, 1.5, .18, 28), j);
	N.position.y = 1.29, n.add(N);
	let P = new X(new Pr(.95, 1.05, .1, 28), new ga({
		color: 7148064,
		roughness: .95,
		emissive: 1836040
	}));
	P.position.y = 1.43, n.add(P);
	let F = new X(new jr(1.5, 1.3, 1.5), new ga({
		color: 12572927,
		transparent: !0,
		opacity: .045,
		roughness: .05,
		envMapIntensity: .25,
		depthWrite: !1
	}));
	F.position.y = 2.1, n.add(F);
	let I = new ut();
	I.position.y = 1.5, I.scale.setScalar(1.5), n.add(I);
	let ee = new ga({
		color: 16183524,
		roughness: .25,
		emissive: 4208688
	}), L = new X(new Pr(.36, .38, .17, 32), j);
	L.position.y = .085, I.add(L);
	for (let e = 0; e < 28; e++) {
		let t = e / 28 * Ju;
		[0, .17].forEach((e) => {
			let n = new X(new ra(.026, 6, 5), ee);
			n.position.set(Math.cos(t) * .375, e, Math.sin(t) * .375), I.add(n);
		});
	}
	let te = [
		3112928,
		2071130,
		14169132,
		15921906
	];
	for (let e = 0; e < 8; e++) {
		let t = e / 8 * Ju + .2, n = new X(new jr(.13, .11, .02), new ga({
			color: te[e % 4],
			emissive: te[e % 4],
			emissiveIntensity: .45,
			roughness: .3
		}));
		n.position.set(Math.cos(t) * .383, .085, Math.sin(t) * .383), n.rotation.y = -t + Math.PI / 2, I.add(n);
	}
	[0, Math.PI / 2].forEach((e) => {
		let t = new X(new ia(.35, .028, 8, 24, Math.PI), j);
		t.rotation.y = e, t.position.y = .17, I.add(t);
	});
	let ne = new X(new jr(.035, .2, .035), j);
	ne.position.set(.02, .58, 0), ne.rotation.z = -.16, I.add(ne);
	let re = new X(new jr(.12, .035, .035), j);
	re.position.set(.008, .6, 0), re.rotation.z = -.16, I.add(re);
	for (let e = 0; e < 12; e++) {
		let t = e / 12 * Ju, n = new X(new ra(.034, 8, 6), new Wn({ color: e % 2 ? 16724804 : 4892927 }));
		n.position.set(Math.cos(t) * .375, .085, Math.sin(t) * .375), I.add(n);
	}
	let R = new Ln(new Cn({
		map: r,
		color: 16762976,
		blending: 2,
		transparent: !0,
		opacity: .5,
		depthWrite: !1
	}));
	R.scale.set(4, 4, 1), R.position.y = 2, n.add(R), d.push((e) => {
		I.rotation.y = e * .5, R.material.opacity = .32 + Math.sin(e * 2) * .06;
	});
	let z = $u(128, 512, (e, t, n) => {
		e.fillStyle = "#7d1616", e.fillRect(0, 0, t, n), e.strokeStyle = "#e2b34c", e.lineWidth = 8, e.strokeRect(8, 0, t - 16, n), e.lineWidth = 3, e.strokeRect(22, 0, t - 44, n), e.fillStyle = "#e2b34c";
		for (let r = 20; r < n; r += 44) e.beginPath(), e.arc(t / 2, r, 9, 0, Ju), e.fill();
	}), B = new ea(4.6, 15);
	B.rotateX(-Math.PI / 2);
	let V = new X(B, new ga({
		map: z,
		roughness: .9
	}));
	V.position.set(0, .03, -7.6), V.rotation.y = 0, n.add(V);
	let ie = .25, ae = new pr(new jr(1, 1, 1), i, 32);
	for (let e = 0; e < 32; e++) {
		let t = (e + 1) * ie + .2;
		ae.setMatrixAt(e, new Le().compose(new W(0, -8.2 + t / 2, -46 + e + .5), new he(), new W(13, t, 1)));
	}
	n.add(ae);
	let oe = new X(new jr(13, .4, 8), i);
	oe.position.set(0, -8.2, -50), n.add(oe);
	let se = Math.atan2(8, 32), ce = Math.hypot(32, 8), le = $u(128, 512, (e, t, n) => {
		e.fillStyle = "#8a1818", e.fillRect(0, 0, t, n), e.strokeStyle = "#e2b34c", e.lineWidth = 7, e.strokeRect(6, 0, t - 12, n);
	}), ue = new X(new ea(5, ce), new ga({
		map: le,
		roughness: .9
	}));
	ue.rotation.x = -Math.PI / 2 - se, ue.position.set(0, -3.73, -30), n.add(ue);
	let H = td(4, 16, .8, [{
		cx: 0,
		y0: 0,
		hw: 1.5,
		spring: 6.4,
		k: 1.5
	}, {
		cx: 0,
		y0: 10.6,
		hw: .7,
		spring: 2.6,
		k: 1.5
	}]);
	for (let e = 0; e < 9; e++) [-1, 1].forEach((t) => {
		let r = new X(H, i);
		r.position.set(t * 6.9, -8 + e, -46 + e * 4), r.rotation.y = -t * Math.PI / 2, n.add(r);
		let a = new X(new ea(4, 16), S);
		a.position.set(t * 8.6, r.position.y + 8, r.position.z), a.rotation.y = -t * Math.PI / 2, n.add(a);
	});
	let de = new X(new Pr(7.4, 7.4, 36, 28, 1, !0, Math.PI / 2, Math.PI), h.clone());
	de.material.map = p.clone(), de.material.map.repeat.set(8, 12), de.material.map.needsUpdate = !0, de.material.emissiveMap = m.clone(), de.material.emissiveMap.repeat.set(8, 12), de.material.emissiveMap.needsUpdate = !0, de.rotation.x = Math.PI / 2, de.position.set(0, 14, -32), n.add(de), [-1, 1].forEach((e) => {
		let t = new X(new jr(.18, .18, ce), l);
		t.rotation.x = -se, t.position.set(e * 2.7, -2.7, -30), n.add(t);
		for (let t = 0; t <= 16; t++) {
			let r = new X(new jr(.14, 1.05, .14), l);
			r.position.set(e * 2.7, -8 + t * 2 * ie + .75, -46 + t * 2), n.add(r);
		}
	});
	let fe = [
		[
			-3,
			9,
			-44
		],
		[
			3,
			9,
			-38
		],
		[
			-3,
			11,
			-32
		],
		[
			3,
			11,
			-26
		],
		[
			-3,
			12,
			-20
		]
	], pe = new ut();
	n.add(pe), fe.forEach((e) => {
		let t = new X(new ra(.5, 10, 8), new Wn({ color: new J(16769184).multiplyScalar(4) }));
		t.position.set(e[0], e[1], e[2]), pe.add(t);
		let n = new X(new Pr(.03, .03, 4, 4), l);
		n.position.set(e[0], e[1] + 2.3, e[2]), pe.add(n);
		let i = new Ln(new Cn({
			map: r,
			color: 16762982,
			blending: 2,
			transparent: !0,
			opacity: .7,
			depthWrite: !1
		}));
		i.scale.set(6, 6, 1), i.position.set(e[0], e[1], e[2]), pe.add(i);
	});
	let me = $u(256, 384, (e, t, n) => {
		e.fillStyle = "#1a2a70", e.fillRect(0, 0, t, n);
		let r = [
			"#e03a3a",
			"#f2c65e",
			"#3a7ae0",
			"#3aa86a",
			"#e07a3a"
		];
		for (let i = 0; i < n; i += 48) for (let n = 0; n < t; n += 48) e.fillStyle = r[Math.floor($() * r.length)], e.fillRect(n + 3, i + 3, 42, 42);
		e.strokeStyle = "#161006", e.lineWidth = 5, e.strokeRect(2, 2, t - 4, n - 4);
	}), ge = new X(new ea(10, 15), new Wn({ map: me }));
	ge.position.set(0, .5, -53.9), n.add(ge);
	let _e = new X(new jr(16, 26, 1), i);
	_e.position.set(0, 2, -54.5), n.add(_e);
	let G = new X(new ea(16, 40), new ga({ color: 2760728 }));
	G.rotation.x = Math.PI / 2, G.position.set(0, 24, -34), n.add(G);
	let ve = e ? 120 : 320, ye = new Float32Array(ve * 3);
	for (let e = 0; e < ve; e++) ye[e * 3] = ($() - .5) * 20, ye[e * 3 + 1] = $() * 30, ye[e * 3 + 2] = ($() - .5) * 20;
	let be = new pn();
	be.setAttribute("position", new Qt(ye, 3));
	let xe = new Cr(be, new vr({
		size: .22,
		map: r,
		color: 16771256,
		transparent: !0,
		opacity: .55,
		depthWrite: !1,
		blending: 2
	}));
	n.add(xe), d.push((e, t) => {
		for (let n = 0; n < ve; n++) ye[n * 3 + 1] += t * (.25 + n % 5 * .05), ye[n * 3] += Math.sin(e * .4 + n) * t * .12, ye[n * 3 + 1] > 30 && (ye[n * 3 + 1] = 0);
		be.attributes.position.needsUpdate = !0;
	}), n.add(new qa(16770232, 3809296, .18));
	let Se = new lo(16765066, 180, 70, 1.6);
	Se.position.set(0, 13, 0), n.add(Se);
	let Ce = new lo(16762976, 20, 24, 1.8);
	Ce.position.set(0, 5, 0), n.add(Ce);
	let we = new so(16769190, 130, 30, .34, .7, 1.4);
	we.position.set(.6, 11, -1.4), we.target.position.set(0, 1.7, 0), n.add(we, we.target);
	let Te = new lo(16761975, 145, 60, 1.6);
	Te.position.set(0, 8, -32), n.add(Te);
	let Ee = new lo(16756832, 240, 40, 1.6);
	return Ee.position.set(0, 4, -44), n.add(Ee), {
		group: n,
		update(e, t) {
			d.forEach((n) => n(e, t));
		}
	};
}
var hd = [
	[
		0,
		[
			0,
			30,
			262
		],
		[
			0,
			88,
			0
		],
		44
	],
	[
		1,
		[
			-172,
			58,
			190
		],
		[
			0,
			40,
			0
		],
		44
	],
	[
		2,
		[
			-104,
			17,
			86
		],
		[
			-70,
			31,
			0
		],
		46
	],
	[
		3,
		[
			12,
			124,
			88
		],
		[
			0,
			56,
			-6
		],
		48
	],
	[
		3.5,
		[
			205,
			84,
			-20
		],
		[
			0,
			44,
			0
		],
		46
	],
	[
		4,
		[
			66,
			30,
			-168
		],
		[
			0,
			30,
			-44
		],
		44
	],
	[
		4.15,
		[
			22,
			15,
			-128
		],
		[
			0,
			9,
			-52
		],
		46
	],
	[
		4.32,
		[
			2,
			7.5,
			-92
		],
		[
			0,
			8,
			-51
		],
		48
	],
	[
		4.48,
		[
			0,
			6,
			-73
		],
		[
			0,
			7,
			-49
		],
		50
	],
	[
		4.56,
		[
			0,
			4.4,
			-55.5
		],
		[
			0,
			4.9,
			-40
		],
		54
	],
	[
		4.63,
		[
			0,
			3.7,
			-46.6
		],
		[
			0,
			4.4,
			-30
		],
		56
	]
], gd = [
	[
		4.66,
		[
			Yu,
			-6.2,
			-47.5
		],
		[
			Yu,
			-1,
			-26
		],
		62
	],
	[
		4.85,
		[
			Yu,
			-3,
			-33
		],
		[
			Yu,
			4,
			-12
		],
		62
	],
	[
		5,
		[
			Yu,
			.7,
			-19
		],
		[
			Yu,
			11,
			4
		],
		66
	],
	[
		5.2,
		[
			Yu,
			2.7,
			-9.5
		],
		[
			Yu,
			20,
			2
		],
		70
	],
	[
		5.36,
		[
			2000.1,
			2.7,
			-4.6
		],
		[
			Yu,
			2.1,
			0
		],
		44
	],
	[
		5.42,
		[
			Yu,
			2.7,
			-3.7
		],
		[
			Yu,
			2.1,
			0
		],
		44
	],
	[
		5.5,
		[
			2002.6,
			2.7,
			-2.6
		],
		[
			Yu,
			2.1,
			0
		],
		44
	],
	[
		5.58,
		[
			2003.7,
			2.7,
			0
		],
		[
			Yu,
			2.1,
			0
		],
		44
	],
	[
		5.66,
		[
			2003.2,
			2.7,
			1.85
		],
		[
			Yu,
			2.1,
			0
		],
		44
	],
	[
		5.78,
		[
			2001.2,
			9,
			1.2
		],
		[
			Yu,
			24,
			0
		],
		62
	],
	[
		5.85,
		[
			Yu,
			29,
			.3
		],
		[
			Yu,
			52,
			0
		],
		78
	]
], _d = [
	[
		5.86,
		[
			0,
			118,
			-34
		],
		[
			0,
			62,
			40
		],
		60
	],
	[
		5.93,
		[
			12,
			66,
			122
		],
		[
			0,
			50,
			0
		],
		50
	],
	[
		6,
		[
			-6,
			30,
			214
		],
		[
			0,
			46,
			0
		],
		40
	]
];
gd.mono = !0, _d.mono = !0;
var vd = 4.63, yd = 5.86, bd = .06, xd = .05, Sd = [
	2.5,
	1.35,
	.42
], Cd = [
	1.6,
	2,
	3
];
function wd(e, t, n, r, i) {
	let a = i * i, o = a * i;
	return .5 * (2 * t + (-e + n) * i + (2 * e - 5 * t + 4 * n - r) * a + (-e + 3 * t - 3 * n + r) * o);
}
function Td(e, t) {
	let n = e.length, r = [], i = Array(n);
	for (let i = 0; i < n - 1; i++) r[i] = (t[i + 1] - t[i]) / (e[i + 1] - e[i]);
	i[0] = r[0], i[n - 1] = r[n - 2];
	for (let t = 1; t < n - 1; t++) if (r[t - 1] * r[t] <= 0) i[t] = 0;
	else {
		let n = e[t] - e[t - 1], a = e[t + 1] - e[t];
		i[t] = 3 * (n + a) / ((2 * a + n) / r[t - 1] + (a + 2 * n) / r[t]);
	}
	return i;
}
function Ed(e, t, n) {
	let r = e.length;
	if (!e.tan) {
		let t = e.map((e) => e[0]);
		e.tan = [
			0,
			1,
			2,
			3,
			4,
			5,
			6
		].map((n) => Td(t, e.map((e) => n < 3 ? e[1][n] : n < 6 ? e[2][n - 3] : e[3])));
	}
	let i = 0;
	if (t <= e[0][0]) t = e[0][0];
	else if (t >= e[r - 1][0]) t = e[r - 1][0], i = r - 2;
	else for (; i < r - 2 && t > e[i + 1][0];) i++;
	let a = e[i][0], o = e[i + 1][0] - a, s = (t - a) / o, c = s * s, l = c * s, u = 2 * l - 3 * c + 1, d = l - 2 * c + s, f = -2 * l + 3 * c, p = l - c, m = (e, t) => e < 3 ? t[1][e] : e < 6 ? t[2][e - 3] : t[3], h = [];
	for (let t = 0; t < 7; t++) h[t] = u * m(t, e[i]) + d * o * e.tan[t][i] + f * m(t, e[i + 1]) + p * o * e.tan[t][i + 1];
	n.p.set(h[0], h[1], h[2]), n.t.set(h[3], h[4], h[5]), n.fov = h[6];
}
function Dd(e, t, n) {
	if (e.mono) {
		Ed(e, t, n);
		return;
	}
	let r = e.length;
	if (t <= e[0][0]) {
		n.p.set(...e[0][1]), n.t.set(...e[0][2]), n.fov = e[0][3];
		return;
	}
	if (t >= e[r - 1][0]) {
		n.p.set(...e[r - 1][1]), n.t.set(...e[r - 1][2]), n.fov = e[r - 1][3];
		return;
	}
	let i = 0;
	for (; i < r - 2 && t > e[i + 1][0];) i++;
	let a = (t - e[i][0]) / (e[i + 1][0] - e[i][0]), o = e[Math.max(0, i - 1)], s = e[i], c = e[i + 1], l = e[Math.min(r - 1, i + 2)];
	for (let e = 0; e < 3; e++) n.p.setComponent(e, wd(o[1][e], s[1][e], c[1][e], l[1][e], a)), n.t.setComponent(e, wd(o[2][e], s[2][e], c[2][e], l[2][e], a));
	n.fov = s[3] + (c[3] - s[3]) * a;
}
function Od(e, t) {
	t ||= {};
	let n = !!t.mobile, r = new Zl({
		canvas: e,
		alpha: !1,
		antialias: !1,
		powerPreference: "high-performance"
	});
	r.setClearColor(197642, 1), r.toneMapping = 4, r.toneMappingExposure = 1;
	let i = r.extensions.has("EXT_color_buffer_float") || r.extensions.has("EXT_color_buffer_half_float"), a = i ? n ? 1 : 2 : 0, o = {
		msaa: !1,
		smaa: !0,
		shadows: !0,
		reflect: !0
	}, s = new yt();
	s.fog = new vt(526868, .0011);
	let c = new ao(40, 1, .5, 6e3);
	r.shadowMap.type = 2, r.shadowMap.enabled = a >= 2 && o.shadows, r.shadowMap.autoUpdate = !1;
	let l = t.assets || {}, d = (e, t) => l[t] || Ku(r, e, n ? 1024 : 2048), f = {
		stone: d("stone", "stone"),
		roof: d("roof", "roof"),
		gold: d("gold", "gold"),
		paving: d("paving", "paving"),
		floor: d("marble", "floor")
	}, p = {
		stone: ud(qu(f.stone, { params: {
			color: 16777215,
			envMapIntensity: .7
		} }), .5, 1.5, !0),
		roof: ud(qu(f.roof, { params: {
			color: 16777215,
			envMapIntensity: .8
		} }), .7, 1.4, !0),
		gold: ud(qu(f.gold, { params: {
			color: 16777215,
			envMapIntensity: 1.6,
			metalness: .72
		} }), .95, 1.3),
		dark: new ga({
			color: 2826520,
			metalness: .8,
			roughness: .4
		}),
		glass: new Wn({ vertexColors: !0 }),
		stoneTile: f.stone.tile,
		roofTile: f.roof.tile,
		goldTile: f.gold.tile
	};
	l.sky ? (l.sky.mapping = 303, s.background = l.sky, s.backgroundIntensity = 1, s.backgroundRotation.set(0, t.skyRot === void 0 ? 2.2 : t.skyRot, 0)) : (s.background = id(r, n ? 512 : 1024, i), s.backgroundIntensity = .95);
	let m = fd(r), h = new is(r), g = h.fromScene(new _u(), .04).texture;
	h.dispose(), s.environment = m, s.environmentIntensity = .7;
	let _ = pd(n, !n, {
		sets: f,
		mats: p
	}), v = md(n, {
		sets: f,
		mats: p
	});
	s.add(_.group, v.group);
	function y() {
		let e = a >= 2 && o.shadows;
		r.shadowMap.enabled = e, r.shadowMap.needsUpdate = !0, Object.keys(_.lights).forEach((t) => {
			_.lights[t].castShadow = e;
		}), s.traverse((e) => {
			e.material && [].concat(e.material).forEach((e) => {
				e.needsUpdate = !0;
			});
		});
	}
	Object.keys(_.lights).forEach((e) => {
		_.lights[e].castShadow = a >= 2 && o.shadows;
	}), r.shadowMap.needsUpdate = !0;
	let b = {
		p: new W(),
		t: new W(),
		fov: 40
	}, x = {
		W: 1,
		H: 1,
		dpr: 1,
		last: 0,
		inInterior: !1,
		dbg: null
	}, S = null, C = 4, w = $u(128, 8, (e, t, n) => {
		let r = e.createLinearGradient(0, 0, t, 0);
		r.addColorStop(0, "rgba(255,255,255,0)"), r.addColorStop(.85, "rgba(210,225,255,.8)"), r.addColorStop(1, "rgba(255,255,255,1)"), e.fillStyle = r, e.fillRect(0, n / 2 - 1.5, t, 3);
	}), T = new X(new ea(1, 1), new Wn({
		map: w,
		transparent: !0,
		depthWrite: !1,
		depthTest: !1,
		blending: 2,
		fog: !1
	}));
	T.visible = !1, T.renderOrder = 10, s.add(T);
	let E = null, D = null, O = null, k = null, A = null, j = {
		zone: -1,
		mix: 0,
		capZone: -2,
		capAge: 99
	}, M = new U();
	function N() {
		if (!k) return;
		r.getDrawingBufferSize(M);
		let e = Math.max(1, Math.round(M.x)), t = Math.max(1, Math.round(M.y));
		(!A || A.image.width !== e || A.image.height !== t) && (A && A.dispose(), A = new Tr(e, t), j.capZone = -2, j.mix = 0), k.uniforms.tPrev.value = A;
	}
	function P() {
		if (E && (E.dispose(), E = null, k = null), a < 1) return;
		let e = new Pe(4, 4, {
			type: u,
			samples: a >= 2 && o.msaa ? 4 : 0
		});
		E = new ou(r, e), E.setPixelRatio(x.dpr), E.setSize(x.W, x.H), E.addPass(new su(s, c)), E.addPass(new ru(od)), D = new lu(new U(x.W, x.H), .3, .55, 1), E.addPass(D), O = new ru(cd), E.addPass(O), E.addPass(new du()), a >= 2 && o.smaa && E.addPass(new hu()), k = new ru(sd), k.enabled = !1, E.addPass(k), N();
	}
	function F(e, t, n) {
		e >= 2 && t >= 2 && (x.W = e, x.H = t, x.dpr = n, r.setPixelRatio(n), r.setSize(e, t, !1), c.aspect = e / t, c.updateProjectionMatrix(), E ? (E.setPixelRatio(n), E.setSize(e, t), N()) : P());
	}
	let I = {
		n: 0,
		bad: 0,
		buf: /* @__PURE__ */ new Uint8Array(4)
	};
	function ee() {
		let e = r.getContext(), t = e.drawingBufferWidth, n = e.drawingBufferHeight;
		for (let r = 1; r <= 4; r++) for (let i = 1; i <= 5; i++) if (e.readPixels(Math.floor(t * i / 6), Math.floor(n * r / 5), 1, 1, e.RGBA, e.UNSIGNED_BYTE, I.buf), I.buf[0] + I.buf[1] + I.buf[2] > 6) return !1;
		return !0;
	}
	function L(t, i, l) {
		l ||= {};
		let u = t / 1e3, d = Zu(x.last ? u - x.last : .016, 0, .05);
		x.last = u;
		let f, p = 1, h = Sd, w = 0, M = l.dim || 0, N = x.dbg && x.dbg.prog === void 0;
		if (N) b.p.set(...x.dbg.p), b.t.set(...x.dbg.t), b.fov = x.dbg.fov || 45, f = !!x.dbg.interior, _.door(x.dbg.door || 0);
		else {
			x.dbg && (i = x.dbg.prog, M = x.dbg.dim === void 0 ? .58 : x.dbg.dim), Dd(i <= vd ? hd : i < yd ? gd : _d, i, b), f = i > vd && i < yd;
			let e = Math.abs(i - vd), t = Math.abs(i - yd);
			e < t ? p = Qu(0, bd, e) : (p = Qu(0, xd, t), h = Cd), _.door(Qu(4.2, 4.46, i));
			let n = x.W / x.H;
			n < .9 && (b.t.y += 40 * Zu((.9 - n) / .4, 0, 1) * (1 - Qu(0, .7, i))), w = Qu(4.1, 4.45, i) * +(i < 4.64), w = Math.max(w, Qu(5.3, 5.38, i) * (1 - Qu(5.68, 5.76, i)));
		}
		let F = N ? +!!f : i <= vd ? 0 : i < yd ? 1 : 2;
		F !== j.zone && (j.zone >= 0 && E && j.capZone === j.zone && j.capAge < 6 && (j.mix = 1), j.zone = F), j.mix = Math.max(0, j.mix - d / .8), (f !== x.inInterior || x.first !== !0) && (x.inInterior = f, x.first = !0, _.group.visible = !f, v.group.visible = f, r.shadowMap.needsUpdate = !0, s.environment = f ? g : m, s.environmentIntensity = f ? .04 : .7), _.reflector && (_.reflector.visible = a >= 2 && o.reflect && !f && b.p.y < 260), _.water && (_.water.visible = !(_.reflector && _.reflector.visible)), c.position.copy(b.p);
		let L = (1 - w) * (f ? .5 : 1);
		c.position.x += Math.sin(u * .17) * 1.6 * L, c.position.y += Math.sin(u * .13) * .7 * L, c.position.z += Math.cos(u * .11) * 1.4 * L, c.lookAt(b.t);
		let te = x.W / x.H;
		c.fov = b.fov * Zu(1 + (1.3 - te) * .6, 1, 1.6), c.updateProjectionMatrix();
		let ne = E ? 0 : (1 - p) ** 1.4;
		if (r.toneMappingExposure = Zu(1.45 - M * .9, .45, 2) * (f ? .9 : 1) * (E ? 1 : 1 + ne * 6), e.style.opacity = String(x.dbg || l.appear === void 0 ? 1 : l.appear), _.update(u, d, !f), v.update(u, d), !f && !n) {
			if (C -= d, C < 0 && !S) {
				C = 6 + $() * 8;
				let e = ($() - .5) * 1.6, t = .25 + $() * .3, n = new W();
				c.getWorldDirection(n);
				let r = Math.atan2(n.x, n.z) + e;
				S = {
					c: new W(Math.sin(r) * Math.cos(t), Math.sin(t), Math.cos(r) * Math.cos(t)).multiplyScalar(2600).add(c.position),
					vx: ($() < .5 ? -1 : 1) * (900 + $() * 500),
					vy: -(200 + $() * 200),
					life: 1
				};
			}
			S && (S.life -= d * 1.1, S.c.x += S.vx * d, S.c.y += S.vy * d, T.visible = S.life > 0, T.position.copy(S.c), T.lookAt(c.position), T.scale.set(260, 5, 1), T.material.opacity = Zu(S.life, 0, 1), T.rotateZ(Math.atan2(S.vy, S.vx)), S.life <= 0 && (S = null));
		} else T.visible = !1;
		if (x.info = {
			prog: i,
			interior: f,
			fade: p,
			mix: +j.mix.toFixed(2),
			tier: a,
			p: c.position.toArray().map(Math.round),
			fov: Math.round(c.fov)
		}, E ? (k.enabled = j.mix > .001, k.uniforms.uMix.value = Qu(0, 1, j.mix), O.uniforms.uTime.value = u, O.uniforms.uFlash.value = ne, O.uniforms.uFlashCol.value.setRGB(h[0], h[1], h[2]), O.uniforms.uVig.value = f ? .4 : .55, D.strength = f ? .34 : .3, D.threshold = f ? 1.2 : 1, E.render(d), j.mix <= .001 && !N && Math.min(Math.abs(i - vd), Math.abs(i - yd)) < .2 ? (r.copyFramebufferToTexture(A), j.capZone = F, j.capAge = 0) : j.capAge++) : r.render(s, c), !x.dbg && ++I.n % 45 == 0) {
			if (ee()) {
				if (++I.bad >= 2) {
					if (I.bad = 0, a > 0) a--, y(), P();
					else throw Error("black frames");
				}
			} else I.bad = 0;
		}
	}
	async function te() {
		a >= 1 && !E && F(e.clientWidth || 960, e.clientHeight || 540, 1), c.position.set(0, 26, 190), c.lookAt(0, 80, 0), c.updateMatrixWorld();
		let t = async (e) => {
			_.group.visible = e, v.group.visible = !e, r.setRenderTarget(E ? E.readBuffer : null);
			try {
				await r.compileAsync(s, c);
			} catch {
				try {
					r.compile(s, c);
				} catch {}
			}
			r.setRenderTarget(null);
		};
		await t(!0), await t(!1), x.first = !1, [
			0,
			5,
			0
		].forEach((e) => L(performance.now(), e, { appear: 0 })), k && (j.zone = 0, j.capZone = 0, j.capAge = 0, j.mix = 1, L(performance.now(), 5, { appear: 0 }), L(performance.now(), 0, { appear: 0 })), j.mix = 0, j.zone = -1, j.capZone = -2, j.capAge = 99, x.last = 0;
	}
	return {
		render: L,
		resize: F,
		warm: te,
		debug(e) {
			x.dbg = e;
		},
		info() {
			return x.info;
		},
		degrade() {
			return a > 0 && (a--, y(), P(), !0);
		},
		quality() {
			return a;
		},
		flags: o,
		refresh() {
			y(), P();
		},
		setTier(e) {
			a = Math.max(0, Math.min(i ? 2 : 0, e)), y(), P();
		},
		dispose() {
			r.dispose();
		},
		renderer: r
	};
}
var kd = {
	stone: [
		"stone_c",
		"stone_n",
		"stone_orm",
		1.5
	],
	roof: [
		"roof_c",
		"roof_n",
		"roof_orm",
		3
	],
	gold: [
		"gold_c",
		"gold_n",
		"gold_orm",
		1
	],
	paving: [
		"paving_c",
		"paving_n",
		"paving_orm",
		1.5
	],
	floor: [
		"floor_c",
		"floor_n",
		"floor_orm",
		3
	]
};
async function Ad(t, n) {
	let r = new Ga(), i = (t, n) => r.loadAsync(t).then((t) => (t.wrapS = t.wrapT = e, t.colorSpace = n ? k : "", t.anisotropy = 8, t)), a = {};
	await Promise.all(Object.keys(kd).map(async (e) => {
		try {
			let n = kd[e], r = await Promise.all([
				i(t + n[0] + ".jpg", !0),
				i(t + n[1] + ".jpg", !1),
				i(t + n[2] + ".jpg", !1)
			]);
			a[e] = {
				map: r[0],
				normalMap: r[1],
				orm: r[2],
				tile: n[3]
			};
		} catch {}
	}));
	try {
		a.sky = await i(t + (n ? "sky_2k.jpg" : "sky.jpg"), !0);
	} catch {}
	return a;
}
async function jd(e, t) {
	t ||= {};
	let n = await Ad(t.base || "/alexstudio/tex/", !!t.mobile), r = Od(e, Object.assign({}, t, { assets: n }));
	try {
		await r.warm();
	} catch {}
	return r;
}
//#endregion
export { Od as createParliament, Ad as loadAssets, jd as loadParliament };
