var _c=0,Ro=1,xc=2;var Es=1,vc=2,Fi=3,He=0,fe=1,Ke=2,ri=0,Oi=1,Co=2,Io=3,Po=4,yc=5;var ai=100,Mc=101,Sc=102,bc=103,Tc=104,Ac=200,wc=201,Ec=202,Rc=203,Lo=204,No=205,Cc=206,Ic=207,Pc=208,Lc=209,Nc=210,Dc=211,Uc=212,Fc=213,Oc=214,pr=0,mr=1,gr=2,Ti=3,_r=4,xr=5,vr=6,yr=7,Do=0,Bc=1,zc=2,gn=0,Uo=1,Fo=2,Oo=3,Bo=4,zo=5,ko=6,Go=7;var Vo=300,oi=301,Bi=302,ta=303,ea=304,Mr=1e3,un=1001,Sr=1002,Me=1003,kc=1004;var Rs=1005;var De=1006,na=1007;var In=1008;var Be=1009,Ho=1010,Wo=1011,zi=1012,ia=1013,rn=1014,an=1015,on=1016,sa=1017,ra=1018,li=1020,Xo=35902,qo=35899,Yo=1021,Zo=1022,ln=1023,wn=1026,Pn=1027,Jo=1028,aa=1029,Jn=1030,oa=1031;var la=1033,Cs=33776,Is=33777,Ps=33778,Ls=33779,ca=35840,ha=35841,ua=35842,da=35843,fa=36196,pa=37492,ma=37496,ga=37488,_a=37489,Ns=37490,xa=37491,va=37808,ya=37809,Ma=37810,Sa=37811,ba=37812,Ta=37813,Aa=37814,wa=37815,Ea=37816,Ra=37817,Ca=37818,Ia=37819,Pa=37820,La=37821,Na=36492,Da=36494,Ua=36495,Fa=36283,Oa=36284,Ds=36285,Ba=36286;var es=2300,br=2301,dr=2302,yo=2303,Mo=2400,So=2401,bo=2402;var Gc=3200;var za=0,Vc=1,Ln="",Ie="srgb",ns="srgb-linear",is="linear",$t="srgb";var fr=7680;var Hc=519,Wc=512,Xc=513,qc=514,$o=515,Yc=516,Zc=517,Ko=518,Qo=519,Jc=35044;var jo="300 es",Je=2e3,Ai=2001;function Yh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Zh(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function ss(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function $c(){let i=ss("canvas");return i.style.display="block",i}var kl={},wi=null;function tl(...i){let t="THREE."+i.shift();wi?wi("log",t,...i):console.log(t,...i)}function Kc(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function It(...i){i=Kc(i);let t="THREE."+i.shift();if(wi)wi("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Lt(...i){i=Kc(i);let t="THREE."+i.shift();if(wi)wi("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function $i(...i){let t=i.join(" ");t in kl||(kl[t]=!0,It(...i))}function Qc(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var jc={[pr]:pr,[gr]:vr,[_r]:_r,[Ti]:xr,[mr]:mr,[vr]:gr,[yr]:yr,[xr]:Ti},fn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Re=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Gl=1234567,Ki=Math.PI/180,Ei=180/Math.PI;function ki(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Re[i&255]+Re[i>>8&255]+Re[i>>16&255]+Re[i>>24&255]+"-"+Re[t&255]+Re[t>>8&255]+"-"+Re[t>>16&15|64]+Re[t>>24&255]+"-"+Re[e&63|128]+Re[e>>8&255]+"-"+Re[e>>16&255]+Re[e>>24&255]+Re[n&255]+Re[n>>8&255]+Re[n>>16&255]+Re[n>>24&255]).toLowerCase()}function kt(i,t,e){return Math.max(t,Math.min(e,i))}function el(i,t){return(i%t+t)%t}function Jh(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function $h(i,t,e){return i!==t?(e-i)/(t-i):0}function Qi(i,t,e){return(1-e)*i+e*t}function Kh(i,t,e,n){return Qi(i,t,1-Math.exp(-e*n))}function Qh(i,t=1){return t-Math.abs(el(i,t*2)-t)}function jh(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function tu(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function eu(i,t){return i+Math.floor(Math.random()*(t-i+1))}function nu(i,t){return i+Math.random()*(t-i)}function iu(i){return i*(.5-Math.random())}function su(i){i!==void 0&&(Gl=i);let t=Gl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function ru(i){return i*Ki}function au(i){return i*Ei}function ou(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function lu(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function nl(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function cu(i,t,e,n,s){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),u=a((t+n)/2),m=r((t-n)/2),f=a((t-n)/2),d=r((n-t)/2),_=a((n-t)/2);switch(s){case"XYX":i.set(o*u,l*m,l*f,o*c);break;case"YZY":i.set(l*f,o*u,l*m,o*c);break;case"ZXZ":i.set(l*m,l*f,o*u,o*c);break;case"XZX":i.set(o*u,l*_,l*d,o*c);break;case"YXY":i.set(l*d,o*u,l*_,o*c);break;case"ZYZ":i.set(l*_,l*d,o*u,o*c);break;default:It("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function il(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function th(i,t){if(t.constructor===Float32Array)return i;let e=il(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/e,-1)}function eh(i,t){if(t.constructor===Float32Array)return i;let e=il(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*e)}var sl={DEG2RAD:Ki,RAD2DEG:Ei,generateUUID:ki,clamp:kt,euclideanModulo:el,mapLinear:Jh,inverseLerp:$h,lerp:Qi,damp:Kh,pingpong:Qh,smoothstep:jh,smootherstep:tu,randInt:eu,randFloat:nu,randFloatSpread:iu,seededRandom:su,degToRad:ru,radToDeg:au,isPowerOfTwo:ou,ceilPowerOfTwo:lu,floorPowerOfTwo:nl,setQuaternionFromProperEuler:cu,normalize:eh,denormalize:th},hl=class hl{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(kt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};hl.prototype.isVector2=!0;var wt=hl,pn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],m=n[s+3],f=r[a+0],d=r[a+1],_=r[a+2],y=r[a+3];if(m!==y||l!==f||c!==d||u!==_){let h=l*f+c*d+u*_+m*y;h<0&&(f=-f,d=-d,_=-_,y=-y,h=-h);let p=1-o;if(h<.9995){let M=Math.acos(h),w=Math.sin(M);p=Math.sin(p*M)/w,o=Math.sin(o*M)/w,l=l*p+f*o,c=c*p+d*o,u=u*p+_*o,m=m*p+y*o}else{l=l*p+f*o,c=c*p+d*o,u=u*p+_*o,m=m*p+y*o;let M=1/Math.sqrt(l*l+c*c+u*u+m*m);l*=M,c*=M,u*=M,m*=M}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=m}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],m=r[a],f=r[a+1],d=r[a+2],_=r[a+3];return t[e]=o*_+u*m+l*d-c*f,t[e+1]=l*_+u*f+c*m-o*d,t[e+2]=c*_+u*d+o*f-l*m,t[e+3]=u*_-o*m-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),m=o(r/2),f=l(n/2),d=l(s/2),_=l(r/2);switch(a){case"XYZ":this._x=f*u*m+c*d*_,this._y=c*d*m-f*u*_,this._z=c*u*_+f*d*m,this._w=c*u*m-f*d*_;break;case"YXZ":this._x=f*u*m+c*d*_,this._y=c*d*m-f*u*_,this._z=c*u*_-f*d*m,this._w=c*u*m+f*d*_;break;case"ZXY":this._x=f*u*m-c*d*_,this._y=c*d*m+f*u*_,this._z=c*u*_+f*d*m,this._w=c*u*m-f*d*_;break;case"ZYX":this._x=f*u*m-c*d*_,this._y=c*d*m+f*u*_,this._z=c*u*_-f*d*m,this._w=c*u*m+f*d*_;break;case"YZX":this._x=f*u*m+c*d*_,this._y=c*d*m+f*u*_,this._z=c*u*_-f*d*m,this._w=c*u*m-f*d*_;break;case"XZY":this._x=f*u*m-c*d*_,this._y=c*d*m-f*u*_,this._z=c*u*_+f*d*m,this._w=c*u*m+f*d*_;break;default:It("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],m=e[10],f=n+o+m;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(r-c)*d,this._z=(a-s)*d}else if(n>o&&n>m){let d=2*Math.sqrt(1+n-o-m);this._w=(u-l)/d,this._x=.25*d,this._y=(s+a)/d,this._z=(r+c)/d}else if(o>m){let d=2*Math.sqrt(1+o-n-m);this._w=(r-c)/d,this._x=(s+a)/d,this._y=.25*d,this._z=(l+u)/d}else{let d=2*Math.sqrt(1+m-n-o);this._w=(a-s)/d,this._x=(r+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(kt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,e=Math.sin(e*c)/u,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},ul=class ul{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Vl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Vl.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),u=2*(o*e-r*s),m=2*(r*n-a*e);return this.x=e+l*c+a*m-o*u,this.y=n+l*u+o*c-r*m,this.z=s+l*m+r*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this.z=kt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this.z=kt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ja.copy(this).projectOnVector(t),this.sub(Ja)}reflect(t){return this.sub(Ja.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(kt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};ul.prototype.isVector3=!0;var L=ul,Ja=new L,Vl=new pn,dl=class dl{constructor(t,e,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){let u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],m=n[7],f=n[2],d=n[5],_=n[8],y=s[0],h=s[3],p=s[6],M=s[1],w=s[4],S=s[7],E=s[2],T=s[5],g=s[8];return r[0]=a*y+o*M+l*E,r[3]=a*h+o*w+l*T,r[6]=a*p+o*S+l*g,r[1]=c*y+u*M+m*E,r[4]=c*h+u*w+m*T,r[7]=c*p+u*S+m*g,r[2]=f*y+d*M+_*E,r[5]=f*h+d*w+_*T,r[8]=f*p+d*S+_*g,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*a*u-e*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],m=u*a-o*c,f=o*l-u*r,d=c*r-a*l,_=e*m+n*f+s*d;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/_;return t[0]=m*y,t[1]=(s*c-u*n)*y,t[2]=(o*n-s*a)*y,t[3]=f*y,t[4]=(u*e-s*l)*y,t[5]=(s*r-o*e)*y,t[6]=d*y,t[7]=(n*l-c*e)*y,t[8]=(a*e-n*r)*y,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return $i("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply($a.makeScale(t,e)),this}rotate(t){return $i("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply($a.makeRotation(-t)),this}translate(t,e){return $i("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply($a.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};dl.prototype.isMatrix3=!0;var Nt=dl,$a=new Nt,Hl=new Nt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Wl=new Nt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function hu(){let i={enabled:!0,workingColorSpace:ns,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===$t&&(s.r=An(s.r),s.g=An(s.g),s.b=An(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===$t&&(s.r=bi(s.r),s.g=bi(s.g),s.b=bi(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ln?is:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ns]:{primaries:t,whitePoint:n,transfer:is,toXYZ:Hl,fromXYZ:Wl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ie},outputColorSpaceConfig:{drawingBufferColorSpace:Ie}},[Ie]:{primaries:t,whitePoint:n,transfer:$t,toXYZ:Hl,fromXYZ:Wl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ie}}}),i}var Wt=hu();function An(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function bi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var hi,Tr=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{hi===void 0&&(hi=ss("canvas")),hi.width=t.width,hi.height=t.height;let s=hi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=hi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=ss("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=An(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(An(e[n]/255)*255):e[n]=An(e[n]);return{data:e,width:t.width,height:t.height}}else return It("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},uu=0,Ri=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:uu++}),this.uuid=ki(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ka(s[a].image)):r.push(Ka(s[a]))}else r=Ka(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Ka(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Tr.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(It("Texture: Unable to serialize Texture."),{})}var du=0,Qa=new L,Ue=class i extends fn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=un,s=un,r=De,a=In,o=ln,l=Be,c=i.DEFAULT_ANISOTROPY,u=Ln){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:du++}),this.uuid=ki(),this.name="",this.source=new Ri(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new wt(0,0),this.repeat=new wt(1,1),this.center=new wt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Nt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Qa).x}get height(){return this.source.getSize(Qa).y}get depth(){return this.source.getSize(Qa).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){It(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){It(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Vo)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Mr:t.x=t.x-Math.floor(t.x);break;case un:t.x=t.x<0?0:1;break;case Sr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Mr:t.y=t.y-Math.floor(t.y);break;case un:t.y=t.y<0?0:1;break;case Sr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Ue.DEFAULT_IMAGE=null;Ue.DEFAULT_MAPPING=Vo;Ue.DEFAULT_ANISOTROPY=1;var fl=class fl{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],u=l[4],m=l[8],f=l[1],d=l[5],_=l[9],y=l[2],h=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(m-y)<.01&&Math.abs(_-h)<.01){if(Math.abs(u+f)<.1&&Math.abs(m+y)<.1&&Math.abs(_+h)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let w=(c+1)/2,S=(d+1)/2,E=(p+1)/2,T=(u+f)/4,g=(m+y)/4,b=(_+h)/4;return w>S&&w>E?w<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(w),s=T/n,r=g/n):S>E?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=T/s,r=b/s):E<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),n=g/r,s=b/r),this.set(n,s,r,e),this}let M=Math.sqrt((h-_)*(h-_)+(m-y)*(m-y)+(f-u)*(f-u));return Math.abs(M)<.001&&(M=1),this.x=(h-_)/M,this.y=(m-y)/M,this.z=(f-u)/M,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this.z=kt(this.z,t.z,e.z),this.w=kt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this.z=kt(this.z,t,e),this.w=kt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(kt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};fl.prototype.isVector4=!0;var re=fl,Ar=class extends fn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:De,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new re(0,0,t,e),this.scissorTest=!1,this.viewport=new re(0,0,t,e),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new Ue({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:De,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Ri(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ge=class extends Ar{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},rs=class extends Ue{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Me,this.minFilter=Me,this.wrapR=un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var wr=class extends Ue{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Me,this.minFilter=Me,this.wrapR=un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var jr=class jr{constructor(t,e,n,s,r,a,o,l,c,u,m,f,d,_,y,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,u,m,f,d,_,y,h)}set(t,e,n,s,r,a,o,l,c,u,m,f,d,_,y,h){let p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=m,p[14]=f,p[3]=d,p[7]=_,p[11]=y,p[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new jr().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/ui.setFromMatrixColumn(t,0).length(),r=1/ui.setFromMatrixColumn(t,1).length(),a=1/ui.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),m=Math.sin(r);if(t.order==="XYZ"){let f=a*u,d=a*m,_=o*u,y=o*m;e[0]=l*u,e[4]=-l*m,e[8]=c,e[1]=d+_*c,e[5]=f-y*c,e[9]=-o*l,e[2]=y-f*c,e[6]=_+d*c,e[10]=a*l}else if(t.order==="YXZ"){let f=l*u,d=l*m,_=c*u,y=c*m;e[0]=f+y*o,e[4]=_*o-d,e[8]=a*c,e[1]=a*m,e[5]=a*u,e[9]=-o,e[2]=d*o-_,e[6]=y+f*o,e[10]=a*l}else if(t.order==="ZXY"){let f=l*u,d=l*m,_=c*u,y=c*m;e[0]=f-y*o,e[4]=-a*m,e[8]=_+d*o,e[1]=d+_*o,e[5]=a*u,e[9]=y-f*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let f=a*u,d=a*m,_=o*u,y=o*m;e[0]=l*u,e[4]=_*c-d,e[8]=f*c+y,e[1]=l*m,e[5]=y*c+f,e[9]=d*c-_,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let f=a*l,d=a*c,_=o*l,y=o*c;e[0]=l*u,e[4]=y-f*m,e[8]=_*m+d,e[1]=m,e[5]=a*u,e[9]=-o*u,e[2]=-c*u,e[6]=d*m+_,e[10]=f-y*m}else if(t.order==="XZY"){let f=a*l,d=a*c,_=o*l,y=o*c;e[0]=l*u,e[4]=-m,e[8]=c*u,e[1]=f*m+y,e[5]=a*u,e[9]=d*m-_,e[2]=_*m-d,e[6]=o*u,e[10]=y*m+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(fu,t,pu)}lookAt(t,e,n){let s=this.elements;return ze.subVectors(t,e),ze.lengthSq()===0&&(ze.z=1),ze.normalize(),Un.crossVectors(n,ze),Un.lengthSq()===0&&(Math.abs(n.z)===1?ze.x+=1e-4:ze.z+=1e-4,ze.normalize(),Un.crossVectors(n,ze)),Un.normalize(),Vs.crossVectors(ze,Un),s[0]=Un.x,s[4]=Vs.x,s[8]=ze.x,s[1]=Un.y,s[5]=Vs.y,s[9]=ze.y,s[2]=Un.z,s[6]=Vs.z,s[10]=ze.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],m=n[5],f=n[9],d=n[13],_=n[2],y=n[6],h=n[10],p=n[14],M=n[3],w=n[7],S=n[11],E=n[15],T=s[0],g=s[4],b=s[8],D=s[12],I=s[1],U=s[5],O=s[9],X=s[13],C=s[2],q=s[6],F=s[10],B=s[14],j=s[3],W=s[7],K=s[11],tt=s[15];return r[0]=a*T+o*I+l*C+c*j,r[4]=a*g+o*U+l*q+c*W,r[8]=a*b+o*O+l*F+c*K,r[12]=a*D+o*X+l*B+c*tt,r[1]=u*T+m*I+f*C+d*j,r[5]=u*g+m*U+f*q+d*W,r[9]=u*b+m*O+f*F+d*K,r[13]=u*D+m*X+f*B+d*tt,r[2]=_*T+y*I+h*C+p*j,r[6]=_*g+y*U+h*q+p*W,r[10]=_*b+y*O+h*F+p*K,r[14]=_*D+y*X+h*B+p*tt,r[3]=M*T+w*I+S*C+E*j,r[7]=M*g+w*U+S*q+E*W,r[11]=M*b+w*O+S*F+E*K,r[15]=M*D+w*X+S*B+E*tt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],m=t[6],f=t[10],d=t[14],_=t[3],y=t[7],h=t[11],p=t[15],M=l*d-c*f,w=o*d-c*m,S=o*f-l*m,E=a*d-c*u,T=a*f-l*u,g=a*m-o*u;return e*(y*M-h*w+p*S)-n*(_*M-h*E+p*T)+s*(_*w-y*E+p*g)-r*(_*S-y*T+h*g)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],u=t[10];return e*(a*u-o*c)-n*(r*u-o*l)+s*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],m=t[9],f=t[10],d=t[11],_=t[12],y=t[13],h=t[14],p=t[15],M=e*o-n*a,w=e*l-s*a,S=e*c-r*a,E=n*l-s*o,T=n*c-r*o,g=s*c-r*l,b=u*y-m*_,D=u*h-f*_,I=u*p-d*_,U=m*h-f*y,O=m*p-d*y,X=f*p-d*h,C=M*X-w*O+S*U+E*I-T*D+g*b;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let q=1/C;return t[0]=(o*X-l*O+c*U)*q,t[1]=(s*O-n*X-r*U)*q,t[2]=(y*g-h*T+p*E)*q,t[3]=(f*T-m*g-d*E)*q,t[4]=(l*I-a*X-c*D)*q,t[5]=(e*X-s*I+r*D)*q,t[6]=(h*S-_*g-p*w)*q,t[7]=(u*g-f*S+d*w)*q,t[8]=(a*O-o*I+c*b)*q,t[9]=(n*I-e*O-r*b)*q,t[10]=(_*T-y*S+p*M)*q,t[11]=(m*S-u*T-d*M)*q,t[12]=(o*D-a*U-l*b)*q,t[13]=(e*U-n*D+s*b)*q,t[14]=(y*w-_*E-h*M)*q,t[15]=(u*E-m*w+f*M)*q,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,u=a+a,m=o+o,f=r*c,d=r*u,_=r*m,y=a*u,h=a*m,p=o*m,M=l*c,w=l*u,S=l*m,E=n.x,T=n.y,g=n.z;return s[0]=(1-(y+p))*E,s[1]=(d+S)*E,s[2]=(_-w)*E,s[3]=0,s[4]=(d-S)*T,s[5]=(1-(f+p))*T,s[6]=(h+M)*T,s[7]=0,s[8]=(_+w)*g,s[9]=(h-M)*g,s[10]=(1-(f+y))*g,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=ui.set(s[0],s[1],s[2]).length(),o=ui.set(s[4],s[5],s[6]).length(),l=ui.set(s[8],s[9],s[10]).length();r<0&&(a=-a),tn.copy(this);let c=1/a,u=1/o,m=1/l;return tn.elements[0]*=c,tn.elements[1]*=c,tn.elements[2]*=c,tn.elements[4]*=u,tn.elements[5]*=u,tn.elements[6]*=u,tn.elements[8]*=m,tn.elements[9]*=m,tn.elements[10]*=m,e.setFromRotationMatrix(tn),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,s,r,a,o=Je,l=!1){let c=this.elements,u=2*r/(e-t),m=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s),_,y;if(l)_=r/(a-r),y=a*r/(a-r);else if(o===Je)_=-(a+r)/(a-r),y=-2*a*r/(a-r);else if(o===Ai)_=-a/(a-r),y=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=m,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=Je,l=!1){let c=this.elements,u=2/(e-t),m=2/(n-s),f=-(e+t)/(e-t),d=-(n+s)/(n-s),_,y;if(l)_=1/(a-r),y=a/(a-r);else if(o===Je)_=-2/(a-r),y=-(a+r)/(a-r);else if(o===Ai)_=-1/(a-r),y=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=m,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=_,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};jr.prototype.isMatrix4=!0;var te=jr,ui=new L,tn=new te,fu=new L(0,0,0),pu=new L(1,1,1),Un=new L,Vs=new L,ze=new L,Xl=new te,ql=new pn,En=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],m=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(kt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-kt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-m,r),this._z=0);break;case"ZXY":this._x=Math.asin(kt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-m,d),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-kt(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(kt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-m,r)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-kt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:It("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Xl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Xl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ql.setFromEuler(this),this.setFromQuaternion(ql,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};En.DEFAULT_ORDER="XYZ";var as=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},mu=0,Yl=new L,di=new pn,yn=new te,Hs=new L,Xi=new L,gu=new L,_u=new pn,Zl=new L(1,0,0),Jl=new L(0,1,0),$l=new L(0,0,1),Kl={type:"added"},xu={type:"removed"},fi={type:"childadded",child:null},ja={type:"childremoved",child:null},Se=class i extends fn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:mu++}),this.uuid=ki(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new L,e=new En,n=new pn,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new te},normalMatrix:{value:new Nt}}),this.matrix=new te,this.matrixWorld=new te,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new as,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return di.setFromAxisAngle(t,e),this.quaternion.multiply(di),this}rotateOnWorldAxis(t,e){return di.setFromAxisAngle(t,e),this.quaternion.premultiply(di),this}rotateX(t){return this.rotateOnAxis(Zl,t)}rotateY(t){return this.rotateOnAxis(Jl,t)}rotateZ(t){return this.rotateOnAxis($l,t)}translateOnAxis(t,e){return Yl.copy(t).applyQuaternion(this.quaternion),this.position.add(Yl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Zl,t)}translateY(t){return this.translateOnAxis(Jl,t)}translateZ(t){return this.translateOnAxis($l,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(yn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Hs.copy(t):Hs.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Xi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yn.lookAt(Xi,Hs,this.up):yn.lookAt(Hs,Xi,this.up),this.quaternion.setFromRotationMatrix(yn),s&&(yn.extractRotation(s.matrixWorld),di.setFromRotationMatrix(yn),this.quaternion.premultiply(di.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Lt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Kl),fi.child=t,this.dispatchEvent(fi),fi.child=null):Lt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(xu),ja.child=t,this.dispatchEvent(ja),ja.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),yn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),yn.multiply(t.parent.matrixWorld)),t.applyMatrix4(yn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Kl),fi.child=t,this.dispatchEvent(fi),fi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xi,t,gu),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xi,_u,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let m=l[c];r(t.shapes,m)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),m=a(t.shapes),f=a(t.skeletons),d=a(t.animations),_=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),m.length>0&&(n.shapes=m),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),_.length>0&&(n.nodes=_)}return n.object=s,n;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Se.DEFAULT_UP=new L(0,1,0);Se.DEFAULT_MATRIX_AUTO_UPDATE=!0;Se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ye=class extends Se{constructor(){super(),this.isGroup=!0,this.type="Group"}},vu={type:"move"},Ci=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ye,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ye,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ye,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let y of t.hand.values()){let h=e.getJointPose(y,n),p=this._getHandJoint(c,y);h!==null&&(p.matrix.fromArray(h.transform.matrix),p.matrix.decompose(p.position,p.quaternion,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=h.radius),p.visible=h!==null}let u=c.joints["index-finger-tip"],m=c.joints["thumb-tip"],f=u.position.distanceTo(m.position),d=.02,_=.005;c.inputState.pinching&&f>d+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(vu)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new ye;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},nh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Fn={h:0,s:0,l:0},Ws={h:0,s:0,l:0};function to(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Ft=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ie){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Wt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Wt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Wt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Wt.workingColorSpace){if(t=el(t,1),e=kt(e,0,1),n=kt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=to(a,r,t+1/3),this.g=to(a,r,t),this.b=to(a,r,t-1/3)}return Wt.colorSpaceToWorking(this,s),this}setStyle(t,e=Ie){function n(r){r!==void 0&&parseFloat(r)<1&&It("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:It("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);It("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ie){let n=nh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):It("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=An(t.r),this.g=An(t.g),this.b=An(t.b),this}copyLinearToSRGB(t){return this.r=bi(t.r),this.g=bi(t.g),this.b=bi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ie){return Wt.workingToColorSpace(Ce.copy(this),t),Math.round(kt(Ce.r*255,0,255))*65536+Math.round(kt(Ce.g*255,0,255))*256+Math.round(kt(Ce.b*255,0,255))}getHexString(t=Ie){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Wt.workingColorSpace){Wt.workingToColorSpace(Ce.copy(this),e);let n=Ce.r,s=Ce.g,r=Ce.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let m=a-o;switch(c=u<=.5?m/(a+o):m/(2-a-o),a){case n:l=(s-r)/m+(s<r?6:0);break;case s:l=(r-n)/m+2;break;case r:l=(n-s)/m+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=Wt.workingColorSpace){return Wt.workingToColorSpace(Ce.copy(this),e),t.r=Ce.r,t.g=Ce.g,t.b=Ce.b,t}getStyle(t=Ie){Wt.workingToColorSpace(Ce.copy(this),t);let e=Ce.r,n=Ce.g,s=Ce.b;return t!==Ie?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Fn),this.setHSL(Fn.h+t,Fn.s+e,Fn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Fn),t.getHSL(Ws);let n=Qi(Fn.h,Ws.h,e),s=Qi(Fn.s,Ws.s,e),r=Qi(Fn.l,Ws.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ce=new Ft;Ft.NAMES=nh;var os=class extends Se{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new En,this.environmentIntensity=1,this.environmentRotation=new En,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},en=new L,Mn=new L,eo=new L,Sn=new L,pi=new L,mi=new L,Ql=new L,no=new L,io=new L,so=new L,ro=new re,ao=new re,oo=new re,kn=class i{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),en.subVectors(t,e),s.cross(en);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){en.subVectors(s,e),Mn.subVectors(n,e),eo.subVectors(t,e);let a=en.dot(en),o=en.dot(Mn),l=en.dot(eo),c=Mn.dot(Mn),u=Mn.dot(eo),m=a*c-o*o;if(m===0)return r.set(0,0,0),null;let f=1/m,d=(c*l-o*u)*f,_=(a*u-o*l)*f;return r.set(1-d-_,_,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Sn)===null?!1:Sn.x>=0&&Sn.y>=0&&Sn.x+Sn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Sn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Sn.x),l.addScaledVector(a,Sn.y),l.addScaledVector(o,Sn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return ro.setScalar(0),ao.setScalar(0),oo.setScalar(0),ro.fromBufferAttribute(t,e),ao.fromBufferAttribute(t,n),oo.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(ro,r.x),a.addScaledVector(ao,r.y),a.addScaledVector(oo,r.z),a}static isFrontFacing(t,e,n,s){return en.subVectors(n,e),Mn.subVectors(t,e),en.cross(Mn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return en.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),en.cross(Mn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;pi.subVectors(s,n),mi.subVectors(r,n),no.subVectors(t,n);let l=pi.dot(no),c=mi.dot(no);if(l<=0&&c<=0)return e.copy(n);io.subVectors(t,s);let u=pi.dot(io),m=mi.dot(io);if(u>=0&&m<=u)return e.copy(s);let f=l*m-u*c;if(f<=0&&l>=0&&u<=0&&l-u>0)return a=l/(l-u),e.copy(n).addScaledVector(pi,a);so.subVectors(t,r);let d=pi.dot(so),_=mi.dot(so);if(_>=0&&d<=_)return e.copy(r);let y=d*c-l*_;if(y<=0&&c>=0&&_<=0)return o=c/(c-_),e.copy(n).addScaledVector(mi,o);let h=u*_-d*m;if(h<=0&&m-u>=0&&d-_>=0)return Ql.subVectors(r,s),o=(m-u)/(m-u+(d-_)),e.copy(s).addScaledVector(Ql,o);let p=1/(h+y+f);return a=y*p,o=f*p,e.copy(n).addScaledVector(pi,a).addScaledVector(mi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Gn=class{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(nn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(nn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=nn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,nn):nn.fromBufferAttribute(r,a),nn.applyMatrix4(t.matrixWorld),this.expandByPoint(nn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Xs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Xs.copy(n.boundingBox)),Xs.applyMatrix4(t.matrixWorld),this.union(Xs)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,nn),nn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(qi),qs.subVectors(this.max,qi),gi.subVectors(t.a,qi),_i.subVectors(t.b,qi),xi.subVectors(t.c,qi),On.subVectors(_i,gi),Bn.subVectors(xi,_i),jn.subVectors(gi,xi);let e=[0,-On.z,On.y,0,-Bn.z,Bn.y,0,-jn.z,jn.y,On.z,0,-On.x,Bn.z,0,-Bn.x,jn.z,0,-jn.x,-On.y,On.x,0,-Bn.y,Bn.x,0,-jn.y,jn.x,0];return!lo(e,gi,_i,xi,qs)||(e=[1,0,0,0,1,0,0,0,1],!lo(e,gi,_i,xi,qs))?!1:(Ys.crossVectors(On,Bn),e=[Ys.x,Ys.y,Ys.z],lo(e,gi,_i,xi,qs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,nn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(nn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(bn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},bn=[new L,new L,new L,new L,new L,new L,new L,new L],nn=new L,Xs=new Gn,gi=new L,_i=new L,xi=new L,On=new L,Bn=new L,jn=new L,qi=new L,qs=new L,Ys=new L,ti=new L;function lo(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){ti.fromArray(i,r);let o=s.x*Math.abs(ti.x)+s.y*Math.abs(ti.y)+s.z*Math.abs(ti.z),l=t.dot(ti),c=e.dot(ti),u=n.dot(ti);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var he=new L,Zs=new wt,yu=0,dn=class extends fn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:yu++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Jc,this.updateRanges=[],this.gpuType=an,this.version=0,this._normalizationScale=t!==void 0?il(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Zs.fromBufferAttribute(this,e),Zs.applyMatrix3(t),this.setXY(e,Zs.x,Zs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.applyMatrix3(t),this.setXYZ(e,he.x,he.y,he.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.applyMatrix4(t),this.setXYZ(e,he.x,he.y,he.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.applyNormalMatrix(t),this.setXYZ(e,he.x,he.y,he.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)he.fromBufferAttribute(this,e),he.transformDirection(t),this.setXYZ(e,he.x,he.y,he.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):th(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):eh(t,this.array)}};var ls=class extends dn{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var cs=class extends dn{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Qt=class extends dn{constructor(t,e,n){super(new Float32Array(t),e,n)}},Mu=new Gn,Yi=new L,co=new L,Vn=class{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Mu.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Yi.subVectors(t,this.center);let e=Yi.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Yi,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(co.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Yi.copy(t.center).add(co)),this.expandByPoint(Yi.copy(t.center).sub(co))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Su=0,Ze=new te,ho=new Se,vi=new L,ke=new Gn,Zi=new Gn,ve=new L,Ae=class i extends fn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Su++}),this.uuid=ki(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Yh(t)?cs:ls)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Nt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ze.makeRotationFromQuaternion(t),this.applyMatrix4(Ze),this}rotateX(t){return Ze.makeRotationX(t),this.applyMatrix4(Ze),this}rotateY(t){return Ze.makeRotationY(t),this.applyMatrix4(Ze),this}rotateZ(t){return Ze.makeRotationZ(t),this.applyMatrix4(Ze),this}translate(t,e,n){return Ze.makeTranslation(t,e,n),this.applyMatrix4(Ze),this}scale(t,e,n){return Ze.makeScale(t,e,n),this.applyMatrix4(Ze),this}lookAt(t){return ho.lookAt(t),ho.updateMatrix(),this.applyMatrix4(ho.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(vi).negate(),this.translate(vi.x,vi.y,vi.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Qt(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&It("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Gn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Lt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];ke.setFromBufferAttribute(r),this.morphTargetsRelative?(ve.addVectors(this.boundingBox.min,ke.min),this.boundingBox.expandByPoint(ve),ve.addVectors(this.boundingBox.max,ke.max),this.boundingBox.expandByPoint(ve)):(this.boundingBox.expandByPoint(ke.min),this.boundingBox.expandByPoint(ke.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Lt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Lt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){let n=this.boundingSphere.center;if(ke.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Zi.setFromBufferAttribute(o),this.morphTargetsRelative?(ve.addVectors(ke.min,Zi.min),ke.expandByPoint(ve),ve.addVectors(ke.max,Zi.max),ke.expandByPoint(ve)):(ke.expandByPoint(Zi.min),ke.expandByPoint(Zi.max))}ke.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)ve.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(ve));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)ve.fromBufferAttribute(o,c),l&&(vi.fromBufferAttribute(t,c),ve.add(vi)),s=Math.max(s,n.distanceToSquared(ve))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Lt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Lt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new dn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[],c=new Uint8Array(n.count);for(let D=0;D<n.count;D++)o[D]=new L,l[D]=new L;let u=new L,m=new L,f=new L,d=new wt,_=new wt,y=new wt,h=new L,p=new L;function M(D,I,U){c[D]=c[I]=c[U]=1,u.fromBufferAttribute(n,D),m.fromBufferAttribute(n,I),f.fromBufferAttribute(n,U),d.fromBufferAttribute(r,D),_.fromBufferAttribute(r,I),y.fromBufferAttribute(r,U),m.sub(u),f.sub(u),_.sub(d),y.sub(d);let O=1/(_.x*y.y-y.x*_.y);isFinite(O)&&(h.copy(m).multiplyScalar(y.y).addScaledVector(f,-_.y).multiplyScalar(O),p.copy(f).multiplyScalar(_.x).addScaledVector(m,-y.x).multiplyScalar(O),o[D].add(h),o[I].add(h),o[U].add(h),l[D].add(p),l[I].add(p),l[U].add(p))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let D=0,I=w.length;D<I;++D){let U=w[D],O=U.start,X=U.count;for(let C=O,q=O+X;C<q;C+=3)M(t.getX(C+0),t.getX(C+1),t.getX(C+2))}let S=new L,E=new L,T=new L,g=new L;function b(D){T.fromBufferAttribute(s,D),g.copy(T);let I=o[D];S.copy(I),S.sub(T.multiplyScalar(T.dot(I))).normalize(),E.crossVectors(g,I);let O=E.dot(l[D])<0?-1:1;a.setXYZW(D,S.x,S.y,S.z,O)}for(let D=0,I=n.count;D<I;++D)c[D]&&b(D);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new dn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let s=new L,r=new L,a=new L,o=new L,l=new L,c=new L,u=new L,m=new L;if(t)for(let f=0,d=t.count;f<d;f+=3){let _=t.getX(f+0),y=t.getX(f+1),h=t.getX(f+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,y),a.fromBufferAttribute(e,h),u.subVectors(a,r),m.subVectors(s,r),u.cross(m),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,h),o.add(u),l.add(u),c.add(u),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(h,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),u.subVectors(a,r),m.subVectors(s,r),u.cross(m),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ve.fromBufferAttribute(t,e),ve.normalize(),t.setXYZ(e,ve.x,ve.y,ve.z)}toNonIndexed(){function t(o,l){let c=o.array,u=o.itemSize,m=o.normalized,f=new c.constructor(l.length*u),d=0,_=0;for(let y=0,h=l.length;y<h;y++){o.isInterleavedBufferAttribute?d=l[y]*o.data.stride+o.offset:d=l[y]*u;for(let p=0;p<u;p++)f[_++]=c[d++]}return new dn(f,u,m)}if(this.index===null)return It("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,m=c.length;u<m;u++){let f=c[u],d=t(f,n);l.push(d)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let m=0,f=c.length;m<f;m++){let d=c[m];u.push(d.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(e))}let r=t.morphAttributes;for(let c in r){let u=[],m=r[c];for(let f=0,d=m.length;f<d;f++)u.push(m[f].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,u=a.length;c<u;c++){let m=a[c];this.addGroup(m.start,m.count,m.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var uo=new L,bu=new L,Tu=new Nt,sn=class{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=uo.subVectors(n,e).cross(bu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(uo),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Tu.getNormalMatrix(t),s=this.coplanarPoint(uo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Au=0,mn=class extends fn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Au++}),this.uuid=ki(),this.name="",this.type="Material",this.blending=Oi,this.side=He,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Lo,this.blendDst=No,this.blendEquation=ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ft(0,0,0),this.blendAlpha=0,this.depthFunc=Ti,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fr,this.stencilZFail=fr,this.stencilZPass=fr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){It(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){It(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Ft().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new sn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new wt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new wt().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Tn=new L,fo=new L,Js=new L,$s=new L,Ii=class{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Tn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Tn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Tn.copy(this.origin).addScaledVector(this.direction,e),Tn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){fo.copy(t).add(e).multiplyScalar(.5),Js.copy(e).sub(t).normalize(),$s.copy(this.origin).sub(fo);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Js),o=$s.dot(this.direction),l=-$s.dot(Js),c=$s.lengthSq(),u=Math.abs(1-a*a),m,f,d,_;if(u>0)if(m=a*l-o,f=a*o-l,_=r*u,m>=0)if(f>=-_)if(f<=_){let y=1/u;m*=y,f*=y,d=m*(m+a*f+2*o)+f*(a*m+f+2*l)+c}else f=r,m=Math.max(0,-(a*f+o)),d=-m*m+f*(f+2*l)+c;else f=-r,m=Math.max(0,-(a*f+o)),d=-m*m+f*(f+2*l)+c;else f<=-_?(m=Math.max(0,-(-a*r+o)),f=m>0?-r:Math.min(Math.max(-r,-l),r),d=-m*m+f*(f+2*l)+c):f<=_?(m=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(m=Math.max(0,-(a*r+o)),f=m>0?r:Math.min(Math.max(-r,-l),r),d=-m*m+f*(f+2*l)+c);else f=a>0?-r:r,m=Math.max(0,-(a*f+o)),d=-m*m+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,m),s&&s.copy(fo).addScaledVector(Js,f),d}intersectSphere(t,e){if(t.radius<0)return null;Tn.subVectors(t.center,this.origin);let n=Tn.dot(this.direction),s=Tn.dot(Tn)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,m=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),u>=0?(r=(t.min.y-f.y)*u,a=(t.max.y-f.y)*u):(r=(t.max.y-f.y)*u,a=(t.min.y-f.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),m>=0?(o=(t.min.z-f.z)*m,l=(t.max.z-f.z)*m):(o=(t.max.z-f.z)*m,l=(t.min.z-f.z)*m),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Tn)!==null}intersectTriangle(t,e,n,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,m=t.x-a.x,f=t.y-a.y,d=t.z-a.z,_=e.x-a.x,y=e.y-a.y,h=e.z-a.z,p=n.x-a.x,M=n.y-a.y,w=n.z-a.z,S=Math.abs(l),E=Math.abs(c),T=Math.abs(u),g,b,D,I,U,O,X,C,q,F,B,j;if(S>=E&&S>=T?(D=l,O=m,q=_,j=p,l>=0?(g=c,b=u,I=f,U=d,X=y,C=h,F=M,B=w):(g=u,b=c,I=d,U=f,X=h,C=y,F=w,B=M)):E>=T?(D=c,O=f,q=y,j=M,c>=0?(g=u,b=l,I=d,U=m,X=h,C=_,F=w,B=p):(g=l,b=u,I=m,U=d,X=_,C=h,F=p,B=w)):(D=u,O=d,q=h,j=w,u>=0?(g=l,b=c,I=m,U=f,X=_,C=y,F=p,B=M):(g=c,b=l,I=f,U=m,X=y,C=_,F=M,B=p)),D===0)return null;let W=g/D,K=b/D,tt=1/D,yt=I-W*O,at=U-K*O,V=X-W*q,it=C-K*q,ot=F-W*j,gt=B-K*j,et=ot*it-gt*V,Mt=yt*gt-at*ot,qt=V*at-it*yt;if(s){if(et<0||Mt<0||qt<0)return null}else if((et<0||Mt<0||qt<0)&&(et>0||Mt>0||qt>0))return null;let bt=et+Mt+qt;if(bt===0)return null;let Yt=tt*(et*O+Mt*q+qt*j);return(bt>0?Yt<0:Yt>0)?null:this.at(Yt/bt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Pi=class extends mn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.combine=Do,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},jl=new te,ei=new Ii,Ks=new Vn,tc=new L,Qs=new L,js=new L,tr=new L,po=new L,er=new L,ec=new L,nr=new L,ae=class extends Se{constructor(t=new Ae,e=new Pi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){er.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],m=r[l];u!==0&&(po.fromBufferAttribute(m,t),a?er.addScaledVector(po,u):er.addScaledVector(po.sub(e),u))}e.add(er)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ks.copy(n.boundingSphere),Ks.applyMatrix4(r),ei.copy(t.ray).recast(t.near),!(Ks.containsPoint(ei.origin)===!1&&(ei.intersectSphere(Ks,tc)===null||ei.origin.distanceToSquared(tc)>(t.far-t.near)**2))&&(jl.copy(r).invert(),ei.copy(t.ray).applyMatrix4(jl),!(n.boundingBox!==null&&ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ei)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,m=r.attributes.normal,f=r.groups,d=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,y=f.length;_<y;_++){let h=f[_],p=a[h.materialIndex],M=Math.max(h.start,d.start),w=Math.min(o.count,Math.min(h.start+h.count,d.start+d.count));for(let S=M,E=w;S<E;S+=3){let T=o.getX(S),g=o.getX(S+1),b=o.getX(S+2);s=ir(this,p,t,n,c,u,m,T,g,b),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=h.materialIndex,e.push(s))}}else{let _=Math.max(0,d.start),y=Math.min(o.count,d.start+d.count);for(let h=_,p=y;h<p;h+=3){let M=o.getX(h),w=o.getX(h+1),S=o.getX(h+2);s=ir(this,a,t,n,c,u,m,M,w,S),s&&(s.faceIndex=Math.floor(h/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,y=f.length;_<y;_++){let h=f[_],p=a[h.materialIndex],M=Math.max(h.start,d.start),w=Math.min(l.count,Math.min(h.start+h.count,d.start+d.count));for(let S=M,E=w;S<E;S+=3){let T=S,g=S+1,b=S+2;s=ir(this,p,t,n,c,u,m,T,g,b),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=h.materialIndex,e.push(s))}}else{let _=Math.max(0,d.start),y=Math.min(l.count,d.start+d.count);for(let h=_,p=y;h<p;h+=3){let M=h,w=h+1,S=h+2;s=ir(this,a,t,n,c,u,m,M,w,S),s&&(s.faceIndex=Math.floor(h/3),e.push(s))}}}};function wu(i,t,e,n,s,r,a,o){let l;if(t.side===fe?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===He,o),l===null)return null;nr.copy(o),nr.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(nr);return c<e.near||c>e.far?null:{distance:c,point:nr.clone(),object:i}}function ir(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Qs),i.getVertexPosition(l,js),i.getVertexPosition(c,tr);let u=wu(i,t,e,n,Qs,js,tr,ec);if(u){let m=new L;kn.getBarycoord(ec,Qs,js,tr,m),s&&(u.uv=kn.getInterpolatedAttribute(s,o,l,c,m,new wt)),r&&(u.uv1=kn.getInterpolatedAttribute(r,o,l,c,m,new wt)),a&&(u.normal=kn.getInterpolatedAttribute(a,o,l,c,m,new L),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let f={a:o,b:l,c,normal:new L,materialIndex:0};kn.getNormal(Qs,js,tr,f.normal),u.face=f,u.barycoord=m}return u}var Er=class extends Ue{constructor(t=null,e=1,n=1,s,r,a,o,l,c=Me,u=Me,m,f){super(null,a,o,l,c,u,s,r,m,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ni=new Vn,Eu=new wt(.5,.5),sr=new L,Hn=class{constructor(t=new sn,e=new sn,n=new sn,s=new sn,r=new sn,a=new sn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Je,n=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],m=r[5],f=r[6],d=r[7],_=r[8],y=r[9],h=r[10],p=r[11],M=r[12],w=r[13],S=r[14],E=r[15];if(s[0].setComponents(c-a,d-u,p-_,E-M).normalize(),s[1].setComponents(c+a,d+u,p+_,E+M).normalize(),s[2].setComponents(c+o,d+m,p+y,E+w).normalize(),s[3].setComponents(c-o,d-m,p-y,E-w).normalize(),n)s[4].setComponents(l,f,h,S).normalize(),s[5].setComponents(c-l,d-f,p-h,E-S).normalize();else if(s[4].setComponents(c-l,d-f,p-h,E-S).normalize(),e===Je)s[5].setComponents(c+l,d+f,p+h,E+S).normalize();else if(e===Ai)s[5].setComponents(l,f,h,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ni.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ni.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ni)}intersectsSprite(t){ni.center.set(0,0,0);let e=Eu.distanceTo(t.center);return ni.radius=.7071067811865476+e,ni.applyMatrix4(t.matrixWorld),this.intersectsSphere(ni)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(sr.x=s.normal.x>0?t.max.x:t.min.x,sr.y=s.normal.y>0?t.max.y:t.min.y,sr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(sr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},nc=new te,Rr=class i{constructor(){this.coordinateSystem=Je,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,n=this._frustums;for(let s=0;s<e.length;s++){let r=e[s];nc.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new Hn),n[s].setFromProjectionMatrix(nc,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,n=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new Hn),e[s].copy(n[s]);return this._count=t._count,this}clone(){return new i().copy(this)}};var hs=class extends mn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ft(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Cr=new L,Ir=new L,ic=new te,Ji=new Ii,rr=new Vn,mo=new L,sc=new L,us=class extends Se{constructor(t=new Ae,e=new hs){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Cr.fromBufferAttribute(e,s-1),Ir.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Cr.distanceTo(Ir);t.setAttribute("lineDistance",new Qt(n,1))}else It("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),rr.copy(n.boundingSphere),rr.applyMatrix4(s),rr.radius+=r,t.ray.intersectsSphere(rr)===!1)return;ic.copy(s).invert(),Ji.copy(t.ray).applyMatrix4(ic);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){let d=Math.max(0,a.start),_=Math.min(u.count,a.start+a.count);for(let y=d,h=_-1;y<h;y+=c){let p=u.getX(y),M=u.getX(y+1),w=ar(this,t,Ji,l,p,M,y);w&&e.push(w)}if(this.isLineLoop){let y=u.getX(_-1),h=u.getX(d),p=ar(this,t,Ji,l,y,h,_-1);p&&e.push(p)}}else{let d=Math.max(0,a.start),_=Math.min(f.count,a.start+a.count);for(let y=d,h=_-1;y<h;y+=c){let p=ar(this,t,Ji,l,y,y+1,y);p&&e.push(p)}if(this.isLineLoop){let y=ar(this,t,Ji,l,_-1,d,_-1);y&&e.push(y)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function ar(i,t,e,n,s,r,a){let o=i.geometry.attributes.position;if(Cr.fromBufferAttribute(o,s),Ir.fromBufferAttribute(o,r),e.distanceSqToSegment(Cr,Ir,mo,sc)>n)return;mo.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(mo);if(!(c<t.near||c>t.far))return{distance:c,point:sc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Li=class extends mn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ft(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},rc=new te,To=new Ii,or=new Vn,lr=new L,ds=class extends Se{constructor(t=new Ae,e=new Li){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),or.copy(n.boundingSphere),or.applyMatrix4(s),or.radius+=r,t.ray.intersectsSphere(or)===!1)return;rc.copy(s).invert(),To.copy(t.ray).applyMatrix4(rc);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,m=n.attributes.position;if(c!==null){let f=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);for(let _=f,y=d;_<y;_++){let h=c.getX(_);lr.fromBufferAttribute(m,h),ac(lr,h,l,s,t,e,this)}}else{let f=Math.max(0,a.start),d=Math.min(m.count,a.start+a.count);for(let _=f,y=d;_<y;_++)lr.fromBufferAttribute(m,_),ac(lr,_,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function ac(i,t,e,n,s,r,a){let o=To.distanceSqToPoint(i);if(o<e){let l=new L;To.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var fs=class extends Ue{constructor(t=[],e=oi,n,s,r,a,o,l,c,u){super(t,e,n,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},ii=class extends Ue{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Rn=class extends Ue{constructor(t,e,n=rn,s,r,a,o=Me,l=Me,c,u=wn,m=1){if(u!==wn&&u!==Pn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:t,height:e,depth:m};super(f,s,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ri(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},ps=class extends Rn{constructor(t,e=rn,n=oi,s,r,a=Me,o=Me,l,c=wn){let u={width:t,height:t,depth:1},m=[u,u,u,u,u,u];super(t,t,e,n,s,r,a,o,l,c),this.image=m,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},ms=class extends Ue{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Wn=class i extends Ae{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],m=[],f=0,d=0;_("z","y","x",-1,-1,n,e,t,a,r,0),_("z","y","x",1,-1,n,e,-t,a,r,1),_("x","z","y",1,1,t,n,e,s,a,2),_("x","z","y",1,-1,t,n,-e,s,a,3),_("x","y","z",1,-1,t,e,n,s,r,4),_("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Qt(c,3)),this.setAttribute("normal",new Qt(u,3)),this.setAttribute("uv",new Qt(m,2));function _(y,h,p,M,w,S,E,T,g,b,D){let I=S/g,U=E/b,O=S/2,X=E/2,C=T/2,q=g+1,F=b+1,B=0,j=0,W=new L;for(let K=0;K<F;K++){let tt=K*U-X;for(let yt=0;yt<q;yt++){let at=yt*I-O;W[y]=at*M,W[h]=tt*w,W[p]=C,c.push(W.x,W.y,W.z),W[y]=0,W[h]=0,W[p]=T>0?1:-1,u.push(W.x,W.y,W.z),m.push(yt/g),m.push(1-K/b),B+=1}}for(let K=0;K<b;K++)for(let tt=0;tt<g;tt++){let yt=f+tt+q*K,at=f+tt+q*(K+1),V=f+(tt+1)+q*(K+1),it=f+(tt+1)+q*K;l.push(yt,at,it),l.push(at,V,it),j+=6}o.addGroup(d,j,D),d+=j,f+=B}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Ni=class i extends Ae{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let u=[],m=[],f=[],d=[],_=0,y=[],h=n/2,p=0;M(),a===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(u),this.setAttribute("position",new Qt(m,3)),this.setAttribute("normal",new Qt(f,3)),this.setAttribute("uv",new Qt(d,2));function M(){let S=new L,E=new L,T=0,g=(e-t)/n;for(let b=0;b<=r;b++){let D=[],I=b/r,U=I*(e-t)+t;for(let O=0;O<=s;O++){let X=O/s,C=X*l+o,q=Math.sin(C),F=Math.cos(C);E.x=U*q,E.y=-I*n+h,E.z=U*F,m.push(E.x,E.y,E.z),S.set(q,g,F).normalize(),f.push(S.x,S.y,S.z),d.push(X,1-I),D.push(_++)}y.push(D)}for(let b=0;b<s;b++)for(let D=0;D<r;D++){let I=y[D][b],U=y[D+1][b],O=y[D+1][b+1],X=y[D][b+1];(t>0||D!==0)&&(u.push(I,U,X),T+=3),(e>0||D!==r-1)&&(u.push(U,O,X),T+=3)}c.addGroup(p,T,0),p+=T}function w(S){let E=_,T=new wt,g=new L,b=0,D=S===!0?t:e,I=S===!0?1:-1;for(let O=1;O<=s;O++)m.push(0,h*I,0),f.push(0,I,0),d.push(.5,.5),_++;let U=_;for(let O=0;O<=s;O++){let C=O/s*l+o,q=Math.cos(C),F=Math.sin(C);g.x=D*F,g.y=h*I,g.z=D*q,m.push(g.x,g.y,g.z),f.push(0,I,0),T.x=q*.5+.5,T.y=F*.5*I+.5,d.push(T.x,T.y),_++}for(let O=0;O<s;O++){let X=E+O,C=U+O;S===!0?u.push(C,C+1,X):u.push(C+1,C,X),b+=3}c.addGroup(p,b,S===!0?1:2),p+=b}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var $e=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){It("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);let u=n[s],f=n[s+1]-u,d=(a-u)/f;return(s+d)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new wt:new L);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new L,s=[],r=[],a=[],o=new L,l=new te;for(let d=0;d<=t;d++){let _=d/t;s[d]=this.getTangentAt(_,new L)}r[0]=new L,a[0]=new L;let c=Number.MAX_VALUE,u=Math.abs(s[0].x),m=Math.abs(s[0].y),f=Math.abs(s[0].z);u<=c&&(c=u,n.set(1,0,0)),m<=c&&(c=m,n.set(0,1,0)),f<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let d=1;d<=t;d++){if(r[d]=r[d-1].clone(),a[d]=a[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();let _=Math.acos(kt(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(o,_))}a[d].crossVectors(s[d],r[d])}if(e===!0){let d=Math.acos(kt(r[0].dot(r[t]),-1,1));d/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(d=-d);for(let _=1;_<=t;_++)r[_].applyMatrix4(l.makeRotationAxis(s[_],d*_)),a[_].crossVectors(s[_],r[_])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}},gs=class extends $e{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new wt){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let u=Math.cos(this.aRotation),m=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*u-d*m+this.aX,c=f*m+d*u+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Pr=class extends gs{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function rl(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,u,m){let f=(a-r)/c-(o-r)/(c+u)+(o-a)/u,d=(o-a)/u-(l-a)/(u+m)+(l-o)/m;f*=u,d*=u,s(a,o,f,d)},calc:function(r){let a=r*r,o=a*r;return i+t*r+e*a+n*o}}}var oc=new L,lc=new L,go=new rl,_o=new rl,xo=new rl,Di=class extends $e{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new L){let n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,u;this.closed||o>0?c=s[(o-1)%r]:(lc.subVectors(s[0],s[1]).add(s[0]),c=lc);let m=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(oc.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=oc),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,_=Math.pow(c.distanceToSquared(m),d),y=Math.pow(m.distanceToSquared(f),d),h=Math.pow(f.distanceToSquared(u),d);y<1e-4&&(y=1),_<1e-4&&(_=y),h<1e-4&&(h=y),go.initNonuniformCatmullRom(c.x,m.x,f.x,u.x,_,y,h),_o.initNonuniformCatmullRom(c.y,m.y,f.y,u.y,_,y,h),xo.initNonuniformCatmullRom(c.z,m.z,f.z,u.z,_,y,h)}else this.curveType==="catmullrom"&&(go.initCatmullRom(c.x,m.x,f.x,u.x,this.tension),_o.initCatmullRom(c.y,m.y,f.y,u.y,this.tension),xo.initCatmullRom(c.z,m.z,f.z,u.z,this.tension));return n.set(go.calc(l),_o.calc(l),xo.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function cc(i,t,e,n,s){let r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function Ru(i,t){let e=1-i;return e*e*t}function Cu(i,t){return 2*(1-i)*i*t}function Iu(i,t){return i*i*t}function ji(i,t,e,n){return Ru(i,t)+Cu(i,e)+Iu(i,n)}function Pu(i,t){let e=1-i;return e*e*e*t}function Lu(i,t){let e=1-i;return 3*e*e*i*t}function Nu(i,t){return 3*(1-i)*i*i*t}function Du(i,t){return i*i*i*t}function ts(i,t,e,n,s){return Pu(i,t)+Lu(i,e)+Nu(i,n)+Du(i,s)}var Lr=class extends $e{constructor(t=new wt,e=new wt,n=new wt,s=new wt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new wt){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ts(t,s.x,r.x,a.x,o.x),ts(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Nr=class extends $e{constructor(t=new L,e=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new L){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ts(t,s.x,r.x,a.x,o.x),ts(t,s.y,r.y,a.y,o.y),ts(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Dr=class extends $e{constructor(t=new wt,e=new wt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new wt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new wt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ur=class extends $e{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Fr=class extends $e{constructor(t=new wt,e=new wt,n=new wt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new wt){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(ji(t,s.x,r.x,a.x),ji(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},_s=class extends $e{constructor(t=new L,e=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new L){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(ji(t,s.x,r.x,a.x),ji(t,s.y,r.y,a.y),ji(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Or=class extends $e{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new wt){let n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],u=s[a>s.length-2?s.length-1:a+1],m=s[a>s.length-3?s.length-1:a+2];return n.set(cc(o,l.x,c.x,u.x,m.x),cc(o,l.y,c.y,u.y,m.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new wt().fromArray(s))}return this}},Uu=Object.freeze({__proto__:null,ArcCurve:Pr,CatmullRomCurve3:Di,CubicBezierCurve:Lr,CubicBezierCurve3:Nr,EllipseCurve:gs,LineCurve:Dr,LineCurve3:Ur,QuadraticBezierCurve:Fr,QuadraticBezierCurve3:_s,SplineCurve:Or});var Xn=class i extends Ae{constructor(t=[new wt(0,-.5),new wt(.5,0),new wt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=kt(s,0,Math.PI*2);let r=[],a=[],o=[],l=[],c=[],u=1/e,m=new L,f=new wt,d=new L,_=new L,y=new L,h=0,p=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:h=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,d.x=p*1,d.y=-h,d.z=p*0,y.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case t.length-1:y.normalize(),l.push(y.x,y.y,y.z);break;default:h=t[M+1].x-t[M].x,p=t[M+1].y-t[M].y,d.x=p*1,d.y=-h,d.z=p*0,_.copy(d),d.x+=y.x,d.y+=y.y,d.z+=y.z,d.normalize(),l.push(d.x,d.y,d.z),y.copy(_)}for(let M=0;M<=e;M++){let w=n+M*u*s,S=Math.sin(w),E=Math.cos(w);for(let T=0;T<=t.length-1;T++){m.x=t[T].x*S,m.y=t[T].y,m.z=t[T].x*E,a.push(m.x,m.y,m.z),f.x=M/e,f.y=T/(t.length-1),o.push(f.x,f.y);let g=l[3*T+0]*S,b=l[3*T+1],D=l[3*T+0]*E;c.push(g,b,D)}}for(let M=0;M<e;M++)for(let w=0;w<t.length-1;w++){let S=w+M*t.length,E=S,T=S+t.length,g=S+t.length+1,b=S+1;r.push(E,T,b),r.push(g,b,T)}this.setIndex(r),this.setAttribute("position",new Qt(a,3)),this.setAttribute("uv",new Qt(o,2)),this.setAttribute("normal",new Qt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}};var si=class i extends Ae{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,m=t/o,f=e/l,d=[],_=[],y=[],h=[];for(let p=0;p<u;p++){let M=p*f-a;for(let w=0;w<c;w++){let S=w*m-r;_.push(S,-M,0),y.push(0,0,1),h.push(w/o),h.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<o;M++){let w=M+c*p,S=M+c*(p+1),E=M+1+c*(p+1),T=M+1+c*p;d.push(w,S,T),d.push(S,E,T)}this.setIndex(d),this.setAttribute("position",new Qt(_,3)),this.setAttribute("normal",new Qt(y,3)),this.setAttribute("uv",new Qt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var xs=class i extends Ae{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,u=[],m=new L,f=new L,d=[],_=[],y=[],h=[];for(let p=0;p<=n;p++){let M=[],w=p/n,S=a+w*o,E=t*Math.cos(S),T=Math.sqrt(t*t-E*E),g=0;p===0&&a===0?g=.5/e:p===n&&l===Math.PI&&(g=-.5/e);for(let b=0;b<=e;b++){let D=b/e,I=s+D*r;m.x=-T*Math.cos(I),m.y=E,m.z=T*Math.sin(I),_.push(m.x,m.y,m.z),f.copy(m).normalize(),y.push(f.x,f.y,f.z),h.push(D+g,1-w),M.push(c++)}u.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){let w=u[p][M+1],S=u[p][M],E=u[p+1][M],T=u[p+1][M+1];(p!==0||a>0)&&d.push(w,S,T),(p!==n-1||l<Math.PI)&&d.push(S,E,T)}this.setIndex(d),this.setAttribute("position",new Qt(_,3)),this.setAttribute("normal",new Qt(y,3)),this.setAttribute("uv",new Qt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var vs=class i extends Ae{constructor(t=new _s(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};let a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new L,l=new L,c=new wt,u=new L,m=[],f=[],d=[],_=[];y(),this.setIndex(_),this.setAttribute("position",new Qt(m,3)),this.setAttribute("normal",new Qt(f,3)),this.setAttribute("uv",new Qt(d,2));function y(){for(let w=0;w<e;w++)h(w);h(r===!1?e:0),M(),p()}function h(w){u=t.getPointAt(w/e,u);let S=a.normals[w],E=a.binormals[w];for(let T=0;T<=s;T++){let g=T/s*Math.PI*2,b=Math.sin(g),D=-Math.cos(g);l.x=D*S.x+b*E.x,l.y=D*S.y+b*E.y,l.z=D*S.z+b*E.z,l.normalize(),f.push(l.x,l.y,l.z),o.x=u.x+n*l.x,o.y=u.y+n*l.y,o.z=u.z+n*l.z,m.push(o.x,o.y,o.z)}}function p(){for(let w=1;w<=e;w++)for(let S=1;S<=s;S++){let E=(s+1)*(w-1)+(S-1),T=(s+1)*w+(S-1),g=(s+1)*w+S,b=(s+1)*(w-1)+S;_.push(E,T,b),_.push(T,g,b)}}function M(){for(let w=0;w<=e;w++)for(let S=0;S<=s;S++)c.x=w/e,c.y=S/s,d.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new i(new Uu[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function ci(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(hc(s))s.isRenderTargetTexture?(It("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(hc(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Pe(i){let t={};for(let e=0;e<i.length;e++){let n=ci(i[e]);for(let s in n)t[s]=n[s]}return t}function hc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Fu(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function al(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Wt.workingColorSpace}var ih={clone:ci,merge:Pe},Ou=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Bu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Oe=class extends mn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ou,this.fragmentShader=Bu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ci(t.uniforms),this.uniformsGroups=Fu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Ft().setHex(s.value);break;case"v2":this.uniforms[n].value=new wt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new L().fromArray(s.value);break;case"v4":this.uniforms[n].value=new re().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Nt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new te().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},Br=class extends Oe{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Cn=class extends mn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ft(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ft(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=za,this.normalScale=new wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var zr=class extends mn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Gc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},kr=class extends mn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};var ys=class extends hs{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}};function yi(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function cr(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var qn=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Gr=class extends qn{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Mo,endingEnd:Mo}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case So:r=t,o=2*e-n;break;case bo:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case So:a=t,l=2*n-e;break;case bo:a=1,l=n+s[1]-s[0];break;default:a=t-1,l=e}let c=(n-e)*.5,u=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=this._offsetPrev,m=this._offsetNext,f=this._weightPrev,d=this._weightNext,_=(n-e)/(s-e),y=_*_,h=y*_,p=-f*h+2*f*y-f*_,M=(1+f)*h+(-1.5-2*f)*y+(-.5+f)*_+1,w=(-1-d)*h+(1.5+d)*y+.5*_,S=d*h-d*y;for(let E=0;E!==o;++E)r[E]=p*a[u+E]+M*a[c+E]+w*a[l+E]+S*a[m+E];return r}},Vr=class extends qn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=(n-e)/(s-e),m=1-u;for(let f=0;f!==o;++f)r[f]=a[c+f]*m+a[l+f]*u;return r}},Hr=class extends qn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Wr=class extends qn{interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=this.inTangents,m=this.outTangents;if(!u||!m){let _=(n-e)/(s-e),y=1-_;for(let h=0;h!==o;++h)r[h]=a[c+h]*y+a[l+h]*_;return r}let f=o*2,d=t-1;for(let _=0;_!==o;++_){let y=a[c+_],h=a[l+_],p=d*f+_*2,M=m[p],w=m[p+1],S=t*f+_*2,E=u[S],T=u[S+1],g=ku(n,e,M,E,s);r[_]=sh(g,y,w,T,h)}return r}};function sh(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function zu(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function ku(i,t,e,n,s){let r=(i-t)/(s-t);for(let a=0;a<8;a++){let o=sh(r,t,e,n,s)-i;if(Math.abs(o)<1e-10)break;let l=zu(r,t,e,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var Ve=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=yi(e,this.TimeBufferType),this.values=yi(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:yi(t.times,Array),values:yi(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),cr(t.settings)&&(n.settings={inTangents:yi(t.settings.inTangents,Array),outTangents:yi(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Hr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Vr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Gr(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Wr(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case es:e=this.InterpolantFactoryMethodDiscrete;break;case br:e=this.InterpolantFactoryMethodLinear;break;case dr:e=this.InterpolantFactoryMethodSmooth;break;case yo:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return It("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return es;case this.InterpolantFactoryMethodLinear:return br;case this.InterpolantFactoryMethodSmooth:return dr;case this.InterpolantFactoryMethodBezier:return yo}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t;cr(this.settings)&&(uc(this.settings.inTangents,t),uc(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;cr(this.settings)&&(dc(this.settings.inTangents,t),dc(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Lt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Lt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Lt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Lt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&Zh(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Lt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===dr,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],u=t[o+1];if(c!==u&&(o!==1||c!==t[0]))if(s)l=!0;else{let m=o*n,f=m-n,d=m+n;for(let _=0;_!==n;++_){let y=e[m+_];if(y!==e[f+_]||y!==e[d+_]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let m=o*n,f=a*n;for(let d=0;d!==n;++d)e[f+d]=e[m+d]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,cr(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function uc(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]+=t}function dc(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}Ve.prototype.ValueTypeName="";Ve.prototype.TimeBufferType=Float32Array;Ve.prototype.ValueBufferType=Float32Array;Ve.prototype.DefaultInterpolation=br;var Yn=class extends Ve{constructor(t,e,n){super(t,e,n)}};Yn.prototype.ValueTypeName="bool";Yn.prototype.ValueBufferType=Array;Yn.prototype.DefaultInterpolation=es;Yn.prototype.InterpolantFactoryMethodLinear=void 0;Yn.prototype.InterpolantFactoryMethodSmooth=void 0;var Xr=class extends Ve{constructor(t,e,n,s){super(t,e,n,s)}};Xr.prototype.ValueTypeName="color";var qr=class extends Ve{constructor(t,e,n,s){super(t,e,n,s)}};qr.prototype.ValueTypeName="number";var Yr=class extends qn{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(s-e),c=t*o;for(let u=c+o;c!==u;c+=4)pn.slerpFlat(r,0,a,c-o,a,c,l);return r}},Ms=class extends Ve{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Yr(this.times,this.values,this.getValueSize(),t)}};Ms.prototype.ValueTypeName="quaternion";Ms.prototype.InterpolantFactoryMethodSmooth=void 0;var Zn=class extends Ve{constructor(t,e,n){super(t,e,n)}};Zn.prototype.ValueTypeName="string";Zn.prototype.ValueBufferType=Array;Zn.prototype.DefaultInterpolation=es;Zn.prototype.InterpolantFactoryMethodLinear=void 0;Zn.prototype.InterpolantFactoryMethodSmooth=void 0;var Zr=class extends Ve{constructor(t,e,n,s){super(t,e,n,s)}};Zr.prototype.ValueTypeName="vector";var Jr=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,m){return c.push(u,m),this},this.removeHandler=function(u){let m=c.indexOf(u);return m!==-1&&c.splice(m,2),this},this.getHandler=function(u){for(let m=0,f=c.length;m<f;m+=2){let d=c[m],_=c[m+1];if(d.global&&(d.lastIndex=0),d.test(u))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},rh=new Jr,$r=class{constructor(t){this.manager=t!==void 0?t:rh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};$r.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ss=class extends Se{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ft(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},bs=class extends Ss{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Se.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ft(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},vo=new te,fc=new L,pc=new L,Kr=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new wt(512,512),this.mapType=Be,this.map=null,this.mapPass=null,this.matrix=new te,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Hn,this._frameExtents=new wt(1,1),this._viewportCount=1,this._viewports=[new re(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;fc.setFromMatrixPosition(t.matrixWorld),e.position.copy(fc),pc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(pc),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){vo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(vo,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===Ai||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(vo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},hr=new L,ur=new pn,hn=new L,Ts=class extends Se{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new te,this.projectionMatrix=new te,this.projectionMatrixInverse=new te,this.coordinateSystem=Je,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(hr,ur,hn),hn.x===1&&hn.y===1&&hn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(hr,ur,hn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(hr,ur,hn),hn.x===1&&hn.y===1&&hn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(hr,ur,hn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},zn=new L,mc=new wt,gc=new wt,Ne=class extends Ts{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ei*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Ki*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ei*2*Math.atan(Math.tan(Ki*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){zn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(zn.x,zn.y).multiplyScalar(-t/zn.z),zn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(zn.x,zn.y).multiplyScalar(-t/zn.z)}getViewSize(t,e){return this.getViewBounds(t,mc,gc),e.subVectors(gc,mc)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Ki*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var As=class extends Ts{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Ao=class extends Kr{constructor(){super(new As(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ws=class extends Ss{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Se.DEFAULT_UP),this.updateMatrix(),this.target=new Se,this.shadow=new Ao}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var Mi=-90,Si=1,Ui=class extends Se{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ne(Mi,Si,t,e);s.layers=this.layers,this.add(s);let r=new Ne(Mi,Si,t,e);r.layers=this.layers,this.add(r);let a=new Ne(Mi,Si,t,e);a.layers=this.layers,this.add(a);let o=new Ne(Mi,Si,t,e);o.layers=this.layers,this.add(o);let l=new Ne(Mi,Si,t,e);l.layers=this.layers,this.add(l);let c=new Ne(Mi,Si,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===Je)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ai)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,m=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;let y=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let h=!1;t.isWebGLRenderer===!0?h=t.state.buffers.depth.getReversed():h=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),h&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),h&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),h&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),h&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),h&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.mipmapsAutoUpdate=y,t.setRenderTarget(n,5,s),h&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(m,f,d),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}},Qr=class extends Ne{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var ol="\\[\\]\\.:\\/",Gu=new RegExp("["+ol+"]","g"),ll="[^"+ol+"]",Vu="[^"+ol.replace("\\.","")+"]",Hu=/((?:WC+[\/:])*)/.source.replace("WC",ll),Wu=/(WCOD+)?/.source.replace("WCOD",Vu),Xu=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ll),qu=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ll),Yu=new RegExp("^"+Hu+Wu+Xu+qu+"$"),Zu=["material","materials","bones","map"],wo=class{constructor(t,e,n){let s=n||ne.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ne=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Gu,"")}static parseTrackName(t){let e=Yu.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Zu.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){It("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Lt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Lt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Lt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===c){c=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Lt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Lt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Lt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Lt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;Lt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Lt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Lt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ne.Composite=wo;ne.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ne.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ne.prototype.GetterByBindingType=[ne.prototype._getValue_direct,ne.prototype._getValue_array,ne.prototype._getValue_arrayElement,ne.prototype._getValue_toArray];ne.prototype.SetterByBindingTypeAndVersioning=[[ne.prototype._setValue_direct,ne.prototype._setValue_direct_setNeedsUpdate,ne.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ne.prototype._setValue_array,ne.prototype._setValue_array_setNeedsUpdate,ne.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ne.prototype._setValue_arrayElement,ne.prototype._setValue_arrayElement_setNeedsUpdate,ne.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ne.prototype._setValue_fromArray,ne.prototype._setValue_fromArray_setNeedsUpdate,ne.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Zg=new Float32Array(1);var pl=class pl{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};pl.prototype.isMatrix2=!0;var Eo=pl;function cl(i,t,e,n){let s=Ju(n);switch(e){case Yo:return i*t;case Jo:return i*t/s.components*s.byteLength;case aa:return i*t/s.components*s.byteLength;case Jn:return i*t*2/s.components*s.byteLength;case oa:return i*t*2/s.components*s.byteLength;case Zo:return i*t*3/s.components*s.byteLength;case ln:return i*t*4/s.components*s.byteLength;case la:return i*t*4/s.components*s.byteLength;case Cs:case Is:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ps:case Ls:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ha:case da:return Math.max(i,16)*Math.max(t,8)/4;case ca:case ua:return Math.max(i,8)*Math.max(t,8)/2;case fa:case pa:case ga:case _a:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ma:case Ns:case xa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case va:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ya:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ma:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Sa:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ba:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ta:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Aa:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case wa:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ea:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ra:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ca:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ia:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Pa:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case La:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Na:case Da:case Ua:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Fa:case Oa:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ds:case Ba:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Ju(i){switch(i){case Be:case Ho:return{byteLength:1,components:1};case zi:case Wo:case on:return{byteLength:2,components:1};case sa:case ra:return{byteLength:2,components:4};case rn:case ia:case an:return{byteLength:4,components:1};case Xo:case qo:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?It("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function Eh(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Ku(i){let t=new WeakMap;function e(o,l){let c=o.array,u=o.usage,m=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,u),o.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:m}}function n(o,l,c){let u=l.array,m=l.updateRanges;if(i.bindBuffer(c,o),m.length===0)i.bufferSubData(c,0,u);else{m.sort((d,_)=>d.start-_.start);let f=0;for(let d=1;d<m.length;d++){let _=m[f],y=m[d];y.start<=_.start+_.count+1?_.count=Math.max(_.count,y.start+y.count-_.start):(++f,m[f]=y)}m.length=f+1;for(let d=0,_=m.length;d<_;d++){let y=m[d];i.bufferSubData(c,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Qu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ju=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,td=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ed=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,nd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,id=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,sd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,rd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ad=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,od=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ld=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,cd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,hd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,ud=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,dd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,fd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,pd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,md=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,gd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,_d=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,xd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,vd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,yd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Md=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Sd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,bd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Td=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ad=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,wd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ed="gl_FragColor = linearToOutputTexel( gl_FragColor );",Rd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Cd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Id=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Pd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ld=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Nd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Dd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ud=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Fd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Od=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Bd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,zd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,kd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Gd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Vd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Hd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Wd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Xd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,qd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Yd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Zd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Jd=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,$d=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Kd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Qd=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,jd=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,tf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ef=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,rf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,af=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,of=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,lf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,hf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,uf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,df=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ff=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,mf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,_f=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,xf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Mf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Sf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,bf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Tf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Af=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,wf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ef=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Rf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Cf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,If=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Pf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Lf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Nf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Df=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Uf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ff=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Of=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Bf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,zf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,kf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Gf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Vf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Hf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Wf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Xf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,qf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Yf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Zf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Jf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$f=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Kf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Qf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ep=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,np=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ip=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,rp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ap=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,op=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,lp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,cp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,up=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,dp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,fp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,_p=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,vp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,yp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Mp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,bp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ap=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ep=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Rp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ip=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Pp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,zt={alphahash_fragment:Qu,alphahash_pars_fragment:ju,alphamap_fragment:td,alphamap_pars_fragment:ed,alphatest_fragment:nd,alphatest_pars_fragment:id,aomap_fragment:sd,aomap_pars_fragment:rd,batching_pars_vertex:ad,batching_vertex:od,begin_vertex:ld,beginnormal_vertex:cd,bsdfs:hd,iridescence_fragment:ud,bumpmap_pars_fragment:dd,clipping_planes_fragment:fd,clipping_planes_pars_fragment:pd,clipping_planes_pars_vertex:md,clipping_planes_vertex:gd,color_fragment:_d,color_pars_fragment:xd,color_pars_vertex:vd,color_vertex:yd,common:Md,defaultnormal_vertex:Sd,displacementmap_pars_vertex:bd,displacementmap_vertex:Td,emissivemap_fragment:Ad,emissivemap_pars_fragment:wd,colorspace_fragment:Ed,colorspace_pars_fragment:Rd,envmap_fragment:Cd,envmap_common_pars_fragment:Id,envmap_pars_fragment:Pd,envmap_pars_vertex:Ld,envmap_physical_pars_fragment:Hd,envmap_vertex:Nd,fog_vertex:Dd,fog_pars_vertex:Ud,fog_fragment:Fd,fog_pars_fragment:Od,gradientmap_pars_fragment:Bd,lightmap_pars_fragment:zd,lights_lambert_fragment:kd,lights_lambert_pars_fragment:Gd,lights_pars_begin:Vd,lights_toon_fragment:Wd,lights_toon_pars_fragment:Xd,lights_phong_fragment:qd,lights_phong_pars_fragment:Yd,lights_physical_fragment:Zd,lights_physical_pars_fragment:Jd,lights_fragment_begin:$d,lights_fragment_maps:Kd,lights_fragment_end:Qd,lightprobes_pars_fragment:jd,logdepthbuf_fragment:tf,logdepthbuf_pars_fragment:ef,logdepthbuf_pars_vertex:nf,logdepthbuf_vertex:sf,map_fragment:rf,map_pars_fragment:af,map_particle_fragment:of,map_particle_pars_fragment:lf,metalnessmap_fragment:cf,metalnessmap_pars_fragment:hf,morphinstance_vertex:uf,morphcolor_vertex:df,morphnormal_vertex:ff,morphtarget_pars_vertex:pf,morphtarget_vertex:mf,normal_fragment_begin:gf,normal_fragment_maps:_f,normal_pars_fragment:xf,normal_pars_vertex:vf,normal_vertex:yf,normalmap_pars_fragment:Mf,clearcoat_normal_fragment_begin:Sf,clearcoat_normal_fragment_maps:bf,clearcoat_pars_fragment:Tf,iridescence_pars_fragment:Af,opaque_fragment:wf,packing:Ef,premultiplied_alpha_fragment:Rf,project_vertex:Cf,dithering_fragment:If,dithering_pars_fragment:Pf,roughnessmap_fragment:Lf,roughnessmap_pars_fragment:Nf,shadowmap_pars_fragment:Df,shadowmap_pars_vertex:Uf,shadowmap_vertex:Ff,shadowmask_pars_fragment:Of,skinbase_vertex:Bf,skinning_pars_vertex:zf,skinning_vertex:kf,skinnormal_vertex:Gf,specularmap_fragment:Vf,specularmap_pars_fragment:Hf,tonemapping_fragment:Wf,tonemapping_pars_fragment:Xf,transmission_fragment:qf,transmission_pars_fragment:Yf,uv_pars_fragment:Zf,uv_pars_vertex:Jf,uv_vertex:$f,worldpos_vertex:Kf,background_vert:Qf,background_frag:jf,backgroundCube_vert:tp,backgroundCube_frag:ep,cube_vert:np,cube_frag:ip,depth_vert:sp,depth_frag:rp,distance_vert:ap,distance_frag:op,equirect_vert:lp,equirect_frag:cp,linedashed_vert:hp,linedashed_frag:up,meshbasic_vert:dp,meshbasic_frag:fp,meshlambert_vert:pp,meshlambert_frag:mp,meshmatcap_vert:gp,meshmatcap_frag:_p,meshnormal_vert:xp,meshnormal_frag:vp,meshphong_vert:yp,meshphong_frag:Mp,meshphysical_vert:Sp,meshphysical_frag:bp,meshtoon_vert:Tp,meshtoon_frag:Ap,points_vert:wp,points_frag:Ep,shadow_vert:Rp,shadow_frag:Cp,sprite_vert:Ip,sprite_frag:Pp},xt={common:{diffuse:{value:new Ft(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Nt}},envmap:{envMap:{value:null},envMapRotation:{value:new Nt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Nt},normalScale:{value:new wt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ft(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Ft(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0},uvTransform:{value:new Nt}},sprite:{diffuse:{value:new Ft(16777215)},opacity:{value:1},center:{value:new wt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}}},xn={basic:{uniforms:Pe([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.fog]),vertexShader:zt.meshbasic_vert,fragmentShader:zt.meshbasic_frag},lambert:{uniforms:Pe([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new Ft(0)},envMapIntensity:{value:1}}]),vertexShader:zt.meshlambert_vert,fragmentShader:zt.meshlambert_frag},phong:{uniforms:Pe([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new Ft(0)},specular:{value:new Ft(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:zt.meshphong_vert,fragmentShader:zt.meshphong_frag},standard:{uniforms:Pe([xt.common,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.roughnessmap,xt.metalnessmap,xt.fog,xt.lights,{emissive:{value:new Ft(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag},toon:{uniforms:Pe([xt.common,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.gradientmap,xt.fog,xt.lights,{emissive:{value:new Ft(0)}}]),vertexShader:zt.meshtoon_vert,fragmentShader:zt.meshtoon_frag},matcap:{uniforms:Pe([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,{matcap:{value:null}}]),vertexShader:zt.meshmatcap_vert,fragmentShader:zt.meshmatcap_frag},points:{uniforms:Pe([xt.points,xt.fog]),vertexShader:zt.points_vert,fragmentShader:zt.points_frag},dashed:{uniforms:Pe([xt.common,xt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:zt.linedashed_vert,fragmentShader:zt.linedashed_frag},depth:{uniforms:Pe([xt.common,xt.displacementmap]),vertexShader:zt.depth_vert,fragmentShader:zt.depth_frag},normal:{uniforms:Pe([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,{opacity:{value:1}}]),vertexShader:zt.meshnormal_vert,fragmentShader:zt.meshnormal_frag},sprite:{uniforms:Pe([xt.sprite,xt.fog]),vertexShader:zt.sprite_vert,fragmentShader:zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:zt.background_vert,fragmentShader:zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Nt}},vertexShader:zt.backgroundCube_vert,fragmentShader:zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:zt.cube_vert,fragmentShader:zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:zt.equirect_vert,fragmentShader:zt.equirect_frag},distance:{uniforms:Pe([xt.common,xt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:zt.distance_vert,fragmentShader:zt.distance_frag},shadow:{uniforms:Pe([xt.lights,xt.fog,{color:{value:new Ft(0)},opacity:{value:1}}]),vertexShader:zt.shadow_vert,fragmentShader:zt.shadow_frag}};xn.physical={uniforms:Pe([xn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Nt},clearcoatNormalScale:{value:new wt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Nt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Nt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Nt},sheen:{value:0},sheenColor:{value:new Ft(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Nt},transmissionSamplerSize:{value:new wt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Nt},attenuationDistance:{value:0},attenuationColor:{value:new Ft(0)},specularColor:{value:new Ft(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Nt},anisotropyVector:{value:new wt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Nt}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag};var ka={r:0,b:0,g:0},Lp=new te,Rh=new Nt;Rh.set(-1,0,0,0,1,0,0,0,1);function Np(i,t,e,n,s,r){let a=new Ft(0),o=s===!0?0:1,l,c,u=null,m=0,f=null;function d(M){let w=M.isScene===!0?M.background:null;if(w&&w.isTexture){let S=M.backgroundBlurriness>0;w=t.get(w,S)}return w}function _(M){let w=!1,S=d(M);S===null?h(a,o):S&&S.isColor&&(h(S,1),w=!0);let E=i.xr.getEnvironmentBlendMode();E==="additive"?e.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||w)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(M,w){let S=d(w);S&&S.isCubeTexture?(c===void 0&&(c=new ae(new Wn(1,1,1),new Oe({name:"BackgroundCubeMaterial",uniforms:ci(xn.backgroundCube.uniforms),vertexShader:xn.backgroundCube.vertexShader,fragmentShader:xn.backgroundCube.fragmentShader,side:fe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(E,T,g){this.matrixWorld.copyPosition(g.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Lp.makeRotationFromEuler(w.backgroundRotation)).transpose(),S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Rh),c.material.toneMapped=Wt.getTransfer(S.colorSpace)!==$t,(u!==S||m!==S.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=S,m=S.version,f=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new ae(new si(2,2),new Oe({name:"BackgroundMaterial",uniforms:ci(xn.background.uniforms),vertexShader:xn.background.vertexShader,fragmentShader:xn.background.fragmentShader,side:He,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=Wt.getTransfer(S.colorSpace)!==$t,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||m!==S.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=S,m=S.version,f=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function h(M,w){M.getRGB(ka,al(i)),e.buffers.color.setClear(ka.r,ka.g,ka.b,w,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,w=1){a.set(M),o=w,h(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,h(a,o)},render:_,addToRenderList:y,dispose:p}}function Dp(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,a=!1;function o(U,O,X,C,q){let F=!1,B=m(U,C,X,O);r!==B&&(r=B,c(r.object)),F=d(U,C,X,q),F&&_(U,C,X,q),q!==null&&t.update(q,i.ELEMENT_ARRAY_BUFFER),(F||a)&&(a=!1,S(U,O,X,C),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function l(){return i.createVertexArray()}function c(U){return i.bindVertexArray(U)}function u(U){return i.deleteVertexArray(U)}function m(U,O,X,C){let q=C.wireframe===!0,F=n[O.id];F===void 0&&(F={},n[O.id]=F);let B=U.isInstancedMesh===!0?U.id:0,j=F[B];j===void 0&&(j={},F[B]=j);let W=j[X.id];W===void 0&&(W={},j[X.id]=W);let K=W[q];return K===void 0&&(K=f(l()),W[q]=K),K}function f(U){let O=[],X=[],C=[];for(let q=0;q<e;q++)O[q]=0,X[q]=0,C[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:X,attributeDivisors:C,object:U,attributes:{},index:null}}function d(U,O,X,C){let q=r.attributes,F=O.attributes,B=0,j=X.getAttributes();for(let W in j)if(j[W].location>=0){let tt=q[W],yt=F[W];if(yt===void 0&&(W==="instanceMatrix"&&U.instanceMatrix&&(yt=U.instanceMatrix),W==="instanceColor"&&U.instanceColor&&(yt=U.instanceColor)),tt===void 0||tt.attribute!==yt||yt&&tt.data!==yt.data)return!0;B++}return r.attributesNum!==B||r.index!==C}function _(U,O,X,C){let q={},F=O.attributes,B=0,j=X.getAttributes();for(let W in j)if(j[W].location>=0){let tt=F[W];tt===void 0&&(W==="instanceMatrix"&&U.instanceMatrix&&(tt=U.instanceMatrix),W==="instanceColor"&&U.instanceColor&&(tt=U.instanceColor));let yt={};yt.attribute=tt,tt&&tt.data&&(yt.data=tt.data),q[W]=yt,B++}r.attributes=q,r.attributesNum=B,r.index=C}function y(){let U=r.newAttributes;for(let O=0,X=U.length;O<X;O++)U[O]=0}function h(U){p(U,0)}function p(U,O){let X=r.newAttributes,C=r.enabledAttributes,q=r.attributeDivisors;X[U]=1,C[U]===0&&(i.enableVertexAttribArray(U),C[U]=1),q[U]!==O&&(i.vertexAttribDivisor(U,O),q[U]=O)}function M(){let U=r.newAttributes,O=r.enabledAttributes;for(let X=0,C=O.length;X<C;X++)O[X]!==U[X]&&(i.disableVertexAttribArray(X),O[X]=0)}function w(U,O,X,C,q,F,B){B===!0?i.vertexAttribIPointer(U,O,X,q,F):i.vertexAttribPointer(U,O,X,C,q,F)}function S(U,O,X,C){y();let q=C.attributes,F=X.getAttributes(),B=O.defaultAttributeValues;for(let j in F){let W=F[j];if(W.location>=0){let K=q[j];if(K===void 0&&(j==="instanceMatrix"&&U.instanceMatrix&&(K=U.instanceMatrix),j==="instanceColor"&&U.instanceColor&&(K=U.instanceColor)),K!==void 0){let tt=K.normalized,yt=K.itemSize,at=t.get(K);if(at===void 0)continue;let V=at.buffer,it=at.type,ot=at.bytesPerElement,gt=it===i.INT||it===i.UNSIGNED_INT||K.gpuType===ia;if(K.isInterleavedBufferAttribute){let et=K.data,Mt=et.isInterleavedBuffer===!0?et.stride:et.itemSize,qt=K.offset;if(et.isInstancedInterleavedBuffer||et.isInstancedBufferAttribute){for(let bt=0;bt<W.locationSize;bt++)p(W.location+bt,et.meshPerAttribute);U.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let bt=0;bt<W.locationSize;bt++)h(W.location+bt);i.bindBuffer(i.ARRAY_BUFFER,V);for(let bt=0;bt<W.locationSize;bt++)w(W.location+bt,yt/W.locationSize,it,tt,Mt*ot,(qt+yt/W.locationSize*bt)*ot,gt)}else{if(K.isInstancedBufferAttribute){for(let et=0;et<W.locationSize;et++)p(W.location+et,K.meshPerAttribute);U.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let et=0;et<W.locationSize;et++)h(W.location+et);i.bindBuffer(i.ARRAY_BUFFER,V);for(let et=0;et<W.locationSize;et++)w(W.location+et,yt/W.locationSize,it,tt,yt*ot,yt/W.locationSize*et*ot,gt)}}else if(B!==void 0){let tt=B[j];if(tt!==void 0)switch(tt.length){case 2:i.vertexAttrib2fv(W.location,tt);break;case 3:i.vertexAttrib3fv(W.location,tt);break;case 4:i.vertexAttrib4fv(W.location,tt);break;default:i.vertexAttrib1fv(W.location,tt)}}}}M()}function E(){D();for(let U in n){let O=n[U];for(let X in O){let C=O[X];for(let q in C){let F=C[q];for(let B in F)u(F[B].object),delete F[B];delete C[q]}}delete n[U]}}function T(U){if(n[U.id]===void 0)return;let O=n[U.id];for(let X in O){let C=O[X];for(let q in C){let F=C[q];for(let B in F)u(F[B].object),delete F[B];delete C[q]}}delete n[U.id]}function g(U){for(let O in n){let X=n[O];for(let C in X){let q=X[C];if(q[U.id]===void 0)continue;let F=q[U.id];for(let B in F)u(F[B].object),delete F[B];delete q[U.id]}}}function b(U){for(let O in n){let X=n[O],C=U.isInstancedMesh===!0?U.id:0,q=X[C];if(q!==void 0){for(let F in q){let B=q[F];for(let j in B)u(B[j].object),delete B[j];delete q[F]}delete X[C],Object.keys(X).length===0&&delete n[O]}}}function D(){I(),a=!0,r!==s&&(r=s,c(r.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:D,resetDefaultState:I,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfObject:b,releaseStatesOfProgram:g,initAttributes:y,enableAttribute:h,disableUnusedAttributes:M}}function Up(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,u){u!==0&&(i.drawArraysInstanced(n,l,c,u),e.update(c,n,u))}function o(l,c,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let f=0;for(let d=0;d<u;d++)f+=c[d];e.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Fp(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let g=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(g.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(g){return!(g!==ln&&n.convert(g)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(g){let b=g===on&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(g!==Be&&g!==an&&!b&&n.convert(g)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(g){if(g==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";g="mediump"}return g==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",u=l(c);u!==c&&(It("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let m=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=e.logarithmicDepthBuffer===!0&&m===!1;e.reversedDepthBuffer===!0&&m===!1&&It("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&m===!0&&It("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),h=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),w=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:m,maxTextures:d,maxVertexTextures:_,maxTextureSize:y,maxCubemapSize:h,maxAttributes:p,maxVertexUniforms:M,maxVaryings:w,maxFragmentUniforms:S,maxSamples:E,samples:T}}function Op(i){let t=this,e=null,n=0,s=!1,r=!1,a=new sn,o=new Nt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(m,f){let d=m.length!==0||f||n!==0||s;return s=f,n=m.length,d},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(m,f){e=u(m,f,0)},this.setState=function(m,f,d){let _=m.clippingPlanes,y=m.clipIntersection,h=m.clipShadows,p=i.get(m);if(!s||_===null||_.length===0||r&&!h)r?u(null):c();else{let M=r?0:n,w=M*4,S=p.clippingState||null;l.value=S,S=u(_,f,w,d);for(let E=0;E!==w;++E)S[E]=e[E];p.clippingState=S,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(m,f,d,_){let y=m!==null?m.length:0,h=null;if(y!==0){if(h=l.value,_!==!0||h===null){let p=d+y*4,M=f.matrixWorldInverse;o.getNormalMatrix(M),(h===null||h.length<p)&&(h=new Float32Array(p));for(let w=0,S=d;w!==y;++w,S+=4)a.copy(m[w]).applyMatrix4(M,o),a.normal.toArray(h,S),h[S+3]=a.constant}l.value=h,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,h}}var Os=class extends Ge{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new fs(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Wn(5,5,5),r=new Oe({name:"CubemapFromEquirect",uniforms:ci(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:fe,blending:ri});r.uniforms.tEquirect.value=e;let a=new ae(s,r),o=e.minFilter;return e.minFilter===In&&(e.minFilter=De),new Ui(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}},ah=256,Bp=3,zp=20,Ch=256,Ih=16,kp=3,Gp=new L,Vp=new Ft,Va=class i{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Ui(1,10,null),this._boxMesh=new ae(new Wn(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:a=256,position:o=Gp}=r,l=this._renderer;this._setSize(a);let c=this._allocateTarget(),u=this._getSourceTarget(!0);e>0&&(u.texture.mipmapsAutoUpdate=!1);let m=l.autoClear,f=l.autoClearColor,d=l.autoClearDepth,_=l.autoClearStencil,y=t.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,y===null&&(t.background=l.getClearColor(Vp));let h=new Ui(n,s,u);return h.position.copy(o),h.update(l,t),l.autoClear=m,l.autoClearColor=f,l.autoClearDepth=d,l.autoClearStencil=_,t.background=y,e>0&&(u.texture.mipmapsAutoUpdate=!0,this._blur(c,e)),this._applyPMREM(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ch(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=lh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(ah,nl(t))}_fromTexture(t,e){t.mapping===oi||t.mapping===Bi?this._setSize(t.image.length===0?ah:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){let t=this._cubeSize,e=oh(t,!1,!1),n=Math.log2(t)-Bp;for(let s=0;s<=n;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=oh(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=t,r.activeMipmapLevel=e;let a=t.width>>e;t.viewport.set(0,0,a,a),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===oi||t.mapping===Bi?(this._cubemapMaterial===null&&(this._cubemapMaterial=ch()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=lh()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=Hp(),this._integrationMaterial=Wp());let e=this._cubeSize,n=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/Ih);for(let a=0;a<=n;a++){let o=i.lodToRoughness(a,n);if(a>n-kp)r.roughness.value=o,this._renderCube(t,a,this._integrationMaterial);else{let l=o>0?Math.log2(e)+.5*Math.log2(6/(Ch*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=l,this._renderCube(t,a,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=Xp());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,n),s.envMap.value=t.texture,this._renderCube(r,0,n)}};function oh(i,t,e){return new Os(i,{minFilter:In,generateMipmaps:t,type:on,colorSpace:ns,depthBuffer:e})}function Bs(i,t,e){return new Oe({name:i,uniforms:t,vertexShader:zt.cube_vert,fragmentShader:e,side:fe,blending:ri,depthTest:!1,depthWrite:!1})}function Hp(){return Bs("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Ch}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Wp(){return Bs("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Ih}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Xp(){return Bs("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${zp}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function lh(){return Bs("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function ch(){return Bs("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function qp(i){let t=new WeakMap,e=new WeakMap,n=null;function s(f,d=!1){return f==null?null:d?a(f):r(f)}function r(f){if(f&&f.isTexture){let d=f.mapping;if(d===ta||d===ea)if(t.has(f)){let _=t.get(f).texture;return o(_,f.mapping)}else{let _=f.image;if(_&&_.height>0){let y=new Os(_.height);return y.fromEquirectangularTexture(i,f),t.set(f,y),f.addEventListener("dispose",c),o(y.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture&&f.isPMREMTexture!==!0){let d=f.mapping,_=d===ta||d===ea,y=d===oi||d===Bi;if(_||y){let h=e.get(f),p=h!==void 0?h.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return n===null&&(n=new Va(i)),h=_?n.fromEquirectangular(f,h):n.fromCubemap(f,h),h.texture.pmremVersion=f.pmremVersion,e.set(f,h),h.texture;if(h!==void 0)return h.texture;{let M=f.image;return _&&M&&M.height>0||y&&M&&l(M)?(n===null&&(n=new Va(i)),h=_?n.fromEquirectangular(f):n.fromCubemap(f),h.texture.pmremVersion=f.pmremVersion,e.set(f,h),f.addEventListener("dispose",u),h.texture):null}}}return f}function o(f,d){return d===ta?f.mapping=oi:d===ea&&(f.mapping=Bi),f}function l(f){let d=0,_=6;for(let y=0;y<_;y++)f[y]!==void 0&&d++;return d===_}function c(f){let d=f.target;d.removeEventListener("dispose",c);let _=t.get(d);_!==void 0&&(t.delete(d),_.dispose())}function u(f){let d=f.target;d.removeEventListener("dispose",u);let _=e.get(d);_!==void 0&&(e.delete(d),_.dispose())}function m(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:m}}function Yp(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&$i("WebGLRenderer: "+n+" extension not supported."),s}}}function Zp(i,t,e,n){let s={},r=new WeakMap,a=new FinalizationRegistry(_=>delete s[_]);function o(_){l(_.target)}function l(_){_.index!==null&&t.remove(_.index);for(let h in _.attributes)t.remove(_.attributes[h]);_.removeEventListener("dispose",o),delete s[_.id],a.unregister(_);let y=r.get(_);y&&(t.remove(y),r.delete(_)),n.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,e.memory.geometries--}function c(_,y){return s[y.id]!==void 0||(y.addEventListener("dispose",o),s[y.id]=new WeakRef(y),a.register(y,y.id,y),e.memory.geometries++),y}function u(_){let y=_.attributes;for(let h in y)t.update(y[h],i.ARRAY_BUFFER)}function m(_){let y=_.index,h=_.attributes.position,p=0;if(h===void 0)return;let M=y!==null?y.array.length:h.array.length/3-1,w=h.count>=65535?cs:ls,S=new w(Math.ceil(M/3)*6,1),E=S.array;if(y!==null){let g=y.array;p=y.version;for(let b=0,D=0;b<M;b+=3){let I=g[b+0],U=g[b+1],O=g[b+2];E[D++]=I,E[D++]=U,E[D++]=U,E[D++]=O,E[D++]=O,E[D++]=I}}else{p=h.version;for(let g=0,b=0;g<M;g+=3){let D=g+0,I=g+1,U=g+2;E[b++]=D,E[b++]=I,E[b++]=I,E[b++]=U,E[b++]=U,E[b++]=D}}S.version=p;let T=r.get(_);T&&t.remove(T),r.set(_,S)}function f(_){let y=r.get(_);if(y){let h=_.index;h!==null&&y.version<h.version&&m(_)}else m(_);return r.get(_)}function d(){for(let _ in s){let y=s[_].deref();y!==void 0&&l(y)}}return{get:c,update:u,getWireframeAttribute:f,dispose:d}}function Jp(i,t,e){let n;function s(m){n=m}let r,a;function o(m){r=m.type,a=m.bytesPerElement}function l(m,f){i.drawElements(n,f,r,m*a),e.update(f,n,1)}function c(m,f,d){d!==0&&(i.drawElementsInstanced(n,f,r,m*a,d),e.update(f,n,d))}function u(m,f,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,m,0,d);let y=0;for(let h=0;h<d;h++)y+=f[h];e.update(y,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function $p(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:Lt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Kp(i,t,e){let n=new WeakMap,s=new re;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,m=u!==void 0?u.length:0,f=n.get(o);if(f===void 0||f.count!==m){let D=function(){g.dispose(),n.delete(o),o.removeEventListener("dispose",D)};f!==void 0&&f.texture.dispose();let d=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,y=o.morphAttributes.color!==void 0,h=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],w=0;d===!0&&(w=1),_===!0&&(w=2),y===!0&&(w=3);let S=o.attributes.position.count*w,E=1;S>t.maxTextureSize&&(E=Math.ceil(S/t.maxTextureSize),S=t.maxTextureSize);let T=new Float32Array(S*E*4*m),g=new rs(T,S,E,m);g.type=an,g.needsUpdate=!0;let b=w*4;for(let I=0;I<m;I++){let U=h[I],O=p[I],X=M[I],C=S*E*4*I;for(let q=0;q<U.count;q++){let F=q*b;d===!0&&(s.fromBufferAttribute(U,q),T[C+F+0]=s.x,T[C+F+1]=s.y,T[C+F+2]=s.z,T[C+F+3]=0),_===!0&&(s.fromBufferAttribute(O,q),T[C+F+4]=s.x,T[C+F+5]=s.y,T[C+F+6]=s.z,T[C+F+7]=0),y===!0&&(s.fromBufferAttribute(X,q),T[C+F+8]=s.x,T[C+F+9]=s.y,T[C+F+10]=s.z,T[C+F+11]=X.itemSize===4?s.w:1)}}f={count:m,texture:g,size:new wt(S,E)},n.set(o,f),o.addEventListener("dispose",D)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let d=0;for(let y=0;y<c.length;y++)d+=c[y];let _=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Qp(i,t,e,n,s){let r=new WeakMap;function a(c){let u=s.render.frame,m=c.geometry,f=t.get(c,m);if(r.get(f)!==u&&(t.update(f),r.set(f,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){let d=c.skeleton;r.get(d)!==u&&(d.update(),r.set(d,u))}return f}function o(){r=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:a,dispose:o}}var jp={[Uo]:"LINEAR_TONE_MAPPING",[Fo]:"REINHARD_TONE_MAPPING",[Oo]:"CINEON_TONE_MAPPING",[Bo]:"ACES_FILMIC_TONE_MAPPING",[ko]:"AGX_TONE_MAPPING",[Go]:"NEUTRAL_TONE_MAPPING",[zo]:"CUSTOM_TONE_MAPPING"};function tm(i,t,e,n,s,r){let a=new Ge(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=null,u=new Ae;u.setAttribute("position",new Qt([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute("uv",new Qt([0,2,0,0,2,0],2));let m=new Br({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new ae(u,m),d=new As(-1,1,1,-1,0,1),_=null,y=null,h=!1,p,M=null,w=[],S=!1;this.setSize=function(E,T){a.setSize(E,T),o!==null&&o.setSize(E,T),l!==null&&l.setSize(E,T);for(let g=0;g<w.length;g++){let b=w[g];b.setSize&&b.setSize(E,T)}},this.setEffects=function(E){w=E,S=w.length>0&&w[0].isRenderPass===!0;let T=a.width,g=a.height;w.length>0&&o===null&&(o=new Ge(T,g,{type:on,depthBuffer:!1,stencilBuffer:!1}),l=new Ge(T,g,{type:on,depthBuffer:!1,stencilBuffer:!1}));let b=s===!0&&w.some(D=>D.needsDepthTexture===!0);b!==(a.depthTexture!==null)&&(b===!0&&c===null&&(c=new Rn(T,g),r===!0&&(c.format=Pn,c.type=li)),a.dispose(),a.depthTexture=b?c:null,a.resolveDepthBuffer=b,a.storeMultisampledDepthBuffer=b);for(let D=0;D<w.length;D++){let I=w[D];I.setSize&&I.setSize(T,g),b&&I.needsDepthTexture===!0&&I.setDepthTexture&&I.setDepthTexture(c)}},this.begin=function(E,T){if(h||E.toneMapping===gn&&w.length===0)return!1;if(M=T,T!==null){let g=T.width,b=T.height;(a.width!==g||a.height!==b)&&this.setSize(g,b)}return S===!1&&E.setRenderTarget(a),p=E.toneMapping,E.toneMapping=gn,!0},this.hasRenderPass=function(){return S},this.end=function(E,T){E.toneMapping=p,h=!0;let g=a,b=o;for(let D=0;D<w.length;D++){let I=w[D];I.enabled!==!1&&(I.render(E,b,g,T),I.needsSwap!==!1&&(g=b,b=b===o?l:o))}if(_!==E.outputColorSpace||y!==E.toneMapping){_=E.outputColorSpace,y=E.toneMapping,m.defines={},Wt.getTransfer(_)===$t&&(m.defines.SRGB_TRANSFER="");let D=jp[y];D&&(m.defines[D]=""),m.needsUpdate=!0}m.uniforms.tDiffuse.value=g.texture,E.setRenderTarget(M),E.render(f,d),M=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),u.dispose(),m.dispose()}}var Ph=new Ue,Lh=new Rn(1,1),Nh=new ps(1),Dh=new rs,Uh=new wr,Fh=new fs,hh=[],uh=[],dh=new Float32Array(16),fh=new Float32Array(9),ph=new Float32Array(4);function Vi(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=hh[s];if(r===void 0&&(r=new Float32Array(s),hh[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function pe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function me(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Wa(i,t){let e=uh[t];e===void 0&&(e=new Int32Array(t),uh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function em(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function nm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(pe(e,t))return;i.uniform2fv(this.addr,t),me(e,t)}}function im(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(pe(e,t))return;i.uniform3fv(this.addr,t),me(e,t)}}function sm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(pe(e,t))return;i.uniform4fv(this.addr,t),me(e,t)}}function rm(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(pe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),me(e,t)}else{if(pe(e,n))return;ph.set(n),i.uniformMatrix2fv(this.addr,!1,ph),me(e,n)}}function am(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(pe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),me(e,t)}else{if(pe(e,n))return;fh.set(n),i.uniformMatrix3fv(this.addr,!1,fh),me(e,n)}}function om(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(pe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),me(e,t)}else{if(pe(e,n))return;dh.set(n),i.uniformMatrix4fv(this.addr,!1,dh),me(e,n)}}function lm(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function cm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(pe(e,t))return;i.uniform2iv(this.addr,t),me(e,t)}}function hm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(pe(e,t))return;i.uniform3iv(this.addr,t),me(e,t)}}function um(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(pe(e,t))return;i.uniform4iv(this.addr,t),me(e,t)}}function dm(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function fm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(pe(e,t))return;i.uniform2uiv(this.addr,t),me(e,t)}}function pm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(pe(e,t))return;i.uniform3uiv(this.addr,t),me(e,t)}}function mm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(pe(e,t))return;i.uniform4uiv(this.addr,t),me(e,t)}}function Xa(i){return i.version===0&&(i.compareFunction=Qo,i.needsUpdate=!0),i}function gm(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=Xa(Lh):r=Ph,e.setTexture2D(t||r,s)}function _m(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Uh,s)}function xm(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=Xa(Nh):r=Fh,e.setTextureCube(t||r,s)}function vm(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Dh,s)}function ym(i){switch(i){case 5126:return em;case 35664:return nm;case 35665:return im;case 35666:return sm;case 35674:return rm;case 35675:return am;case 35676:return om;case 5124:case 35670:return lm;case 35667:case 35671:return cm;case 35668:case 35672:return hm;case 35669:case 35673:return um;case 5125:return dm;case 36294:return fm;case 36295:return pm;case 36296:return mm;case 35678:case 36198:case 36298:case 36306:case 35682:return gm;case 35679:case 36299:case 36307:return _m;case 35680:case 36300:case 36308:case 36293:return xm;case 36289:case 36303:case 36311:case 36292:return vm}}function Mm(i,t){i.uniform1fv(this.addr,t)}function Sm(i,t){let e=Vi(t,this.size,2);i.uniform2fv(this.addr,e)}function bm(i,t){let e=Vi(t,this.size,3);i.uniform3fv(this.addr,e)}function Tm(i,t){let e=Vi(t,this.size,4);i.uniform4fv(this.addr,e)}function Am(i,t){let e=Vi(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function wm(i,t){let e=Vi(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Em(i,t){let e=Vi(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Rm(i,t){i.uniform1iv(this.addr,t)}function Cm(i,t){i.uniform2iv(this.addr,t)}function Im(i,t){i.uniform3iv(this.addr,t)}function Pm(i,t){i.uniform4iv(this.addr,t)}function Lm(i,t){i.uniform1uiv(this.addr,t)}function Nm(i,t){i.uniform2uiv(this.addr,t)}function Dm(i,t){i.uniform3uiv(this.addr,t)}function Um(i,t){i.uniform4uiv(this.addr,t)}function Fm(i,t,e){let n=this.cache,s=t.length,r=Wa(e,s);pe(n,r)||(i.uniform1iv(this.addr,r),me(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Xa(Lh):a=Ph;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function Om(i,t,e){let n=this.cache,s=t.length,r=Wa(e,s);pe(n,r)||(i.uniform1iv(this.addr,r),me(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Uh,r[a])}function Bm(i,t,e){let n=this.cache,s=t.length,r=Wa(e,s);pe(n,r)||(i.uniform1iv(this.addr,r),me(n,r));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=Xa(Nh):a=Fh;for(let o=0;o!==s;++o)e.setTextureCube(t[o]||a,r[o])}function zm(i,t,e){let n=this.cache,s=t.length,r=Wa(e,s);pe(n,r)||(i.uniform1iv(this.addr,r),me(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Dh,r[a])}function km(i){switch(i){case 5126:return Mm;case 35664:return Sm;case 35665:return bm;case 35666:return Tm;case 35674:return Am;case 35675:return wm;case 35676:return Em;case 5124:case 35670:return Rm;case 35667:case 35671:return Cm;case 35668:case 35672:return Im;case 35669:case 35673:return Pm;case 5125:return Lm;case 36294:return Nm;case 36295:return Dm;case 36296:return Um;case 35678:case 36198:case 36298:case 36306:case 35682:return Fm;case 35679:case 36299:case 36307:return Om;case 35680:case 36300:case 36308:case 36293:return Bm;case 36289:case 36303:case 36311:case 36292:return zm}}var _l=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=ym(e.type)}},xl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=km(e.type)}},vl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},ml=/(\w+)(\])?(\[|\.)?/g;function mh(i,t){i.seq.push(t),i.map[t.id]=t}function Gm(i,t,e){let n=i.name,s=n.length;for(ml.lastIndex=0;;){let r=ml.exec(n),a=ml.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){mh(e,c===void 0?new _l(o,i,t):new xl(o,i,t));break}else{let m=e.map[o];m===void 0&&(m=new vl(o),mh(e,m)),e=m}}}var Gi=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);Gm(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function gh(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Vm=37297,Hm=0;function Wm(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var _h=new Nt;function Xm(i){Wt._getMatrix(_h,Wt.workingColorSpace,i);let t=`mat3( ${_h.elements.map(e=>e.toFixed(4))} )`;switch(Wt.getTransfer(i)){case is:return[t,"LinearTransferOETF"];case $t:return[t,"sRGBTransferOETF"];default:return It("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function xh(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Wm(i.getShaderSource(t),o)}else return r}function qm(i,t){let e=Xm(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var Ym={[Uo]:"Linear",[Fo]:"Reinhard",[Oo]:"Cineon",[Bo]:"ACESFilmic",[ko]:"AgX",[Go]:"Neutral",[zo]:"Custom"};function Zm(i,t){let e=Ym[t];return e===void 0?(It("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Ga=new L;function Jm(){Wt.getLuminanceCoefficients(Ga);let i=Ga.x.toFixed(4),t=Ga.y.toFixed(4),e=Ga.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function $m(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Fs).join(`
`)}function Km(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Qm(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Fs(i){return i!==""}function vh(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function yh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var jm=/^[ \t]*#include +<([\w\d./]+)>/gm;function yl(i){return i.replace(jm,tg)}function tg(i,t){let e=zt[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return yl(e)}var eg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Mh(i){return i.replace(eg,ng)}function ng(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Sh(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var ig={[Es]:"SHADOWMAP_TYPE_PCF",[Fi]:"SHADOWMAP_TYPE_VSM"};function sg(i){return ig[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var rg={[Bi]:"ENVMAP_MODE_REFRACTION"};function ag(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":rg[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var og={[Do]:"ENVMAP_BLENDING_MULTIPLY",[Bc]:"ENVMAP_BLENDING_MIX",[zc]:"ENVMAP_BLENDING_ADD"};function lg(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":og[i.combine]||"ENVMAP_BLENDING_NONE"}function cg(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=sg(e),c=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",u=ag(e),m=lg(e),f=$m(e),d=Km(r),_=s.createProgram(),y,h,p=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(y=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d].filter(Fs).join(`
`),y.length>0&&(y+=`
`),h=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d].filter(Fs).join(`
`),h.length>0&&(h+=`
`)):(y=[Sh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fs).join(`
`),h=[Sh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,d,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+m:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==gn?"#define TONE_MAPPING":"",e.toneMapping!==gn?zt.tonemapping_pars_fragment:"",e.toneMapping!==gn?Zm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",zt.colorspace_pars_fragment,qm("linearToOutputTexel",e.outputColorSpace),Jm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Fs).join(`
`)),a=yl(a),a=vh(a,e),a=yh(a,e),o=yl(o),o=vh(o,e),o=yh(o,e),a=Mh(a),o=Mh(o),e.isRawShaderMaterial!==!0&&(p=`#version 300 es
`,y=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,h=["#define varying in",e.glslVersion===jo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===jo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);let M=p+y+a,w=p+h+o,S=gh(s,s.VERTEX_SHADER,M),E=gh(s,s.FRAGMENT_SHADER,w);s.attachShader(_,S),s.attachShader(_,E),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function T(I){if(i.debug.checkShaderErrors){let U=s.getProgramInfoLog(_)||"",O=s.getShaderInfoLog(S)||"",X=s.getShaderInfoLog(E)||"",C=U.trim(),q=O.trim(),F=X.trim(),B=!0,j=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(B=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,S,E);else{let W=xh(s,S,"vertex"),K=xh(s,E,"fragment");Lt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+C+`
`+W+`
`+K)}else C!==""?It("WebGLProgram: Program Info Log:",C):(q===""||F==="")&&(j=!1);j&&(I.diagnostics={runnable:B,programLog:C,vertexShader:{log:q,prefix:y},fragmentShader:{log:F,prefix:h}})}s.deleteShader(S),s.deleteShader(E),g=new Gi(s,_),b=Qm(s,_)}let g;this.getUniforms=function(){return g===void 0&&T(this),g};let b;this.getAttributes=function(){return b===void 0&&T(this),b};let D=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=s.getProgramParameter(_,Vm)),D},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Hm++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=S,this.fragmentShader=E,this}var hg=0,Ml=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Sl(t),e.set(t,n)),n}},Sl=class{constructor(t){this.id=hg++,this.code=t,this.usedTimes=0}};function ug(i){return i===Jn||i===Ns||i===Ds}function dg(i,t,e,n,s,r){let a=new as,o=new Ml,l=new Set,c=[],u=new Map,m=n.logarithmicDepthBuffer,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(g){return l.add(g),g===0?"uv":`uv${g}`}function _(g,b,D,I,U,O){let X=I.fog,C=U.geometry,q=g.isMeshStandardMaterial||g.isMeshLambertMaterial||g.isMeshPhongMaterial?I.environment:null,F=g.isMeshStandardMaterial||g.isMeshLambertMaterial&&!g.envMap||g.isMeshPhongMaterial&&!g.envMap,B=t.get(g.envMap||q,F),j=f[g.type],W=n.precision;g.precision!==null&&(W=n.getMaxPrecision(g.precision),W!==g.precision&&It("WebGLProgram.getParameters:",g.precision,"not supported, using",W,"instead."));let K=C.morphAttributes.position||C.morphAttributes.normal||C.morphAttributes.color,tt=K!==void 0?K.length:0,yt=0;C.morphAttributes.position!==void 0&&(yt=1),C.morphAttributes.normal!==void 0&&(yt=2),C.morphAttributes.color!==void 0&&(yt=3);let at,V,it,ot;if(j){let _t=xn[j];at=_t.vertexShader,V=_t.fragmentShader}else{at=g.vertexShader,V=g.fragmentShader;let _t=o.getVertexShaderStage(g),Kt=o.getFragmentShaderStage(g);o.update(g,_t,Kt),it=_t.id,ot=Kt.id}let gt=i.getRenderTarget(),et=i.state.buffers.depth.getReversed(),Mt=U.isInstancedMesh===!0,qt=U.isBatchedMesh===!0,bt=!!g.map,Yt=!!g.matcap,Jt=!!B,Gt=Jt&&B.isPMREMTexture===!0,be=!!g.aoMap,ue=!!g.lightMap,Fe=!!g.bumpMap&&g.wireframe===!1,oe=!!g.normalMap,cn=!!g.displacementMap,ge=!!g.emissiveMap,We=!!g.metalnessMap,Xe=!!g.roughnessMap,qe=g.anisotropy>0,N=g.clearcoat>0,Ye=g.diffuseRoughness>0,ie=g.dispersion>0,se=g.retroreflectivity>0,mt=g.iridescence>0,de=g.sheen>0,Pt=g.transmission>0,Dt=qe&&!!g.anisotropyMap,A=N&&!!g.clearcoatMap,x=N&&!!g.clearcoatNormalMap,k=N&&!!g.clearcoatRoughnessMap,nt=Ye&&!!g.diffuseRoughnessMap,Q=mt&&!!g.iridescenceMap,lt=mt&&!!g.iridescenceThicknessMap,ft=de&&!!g.sheenColorMap,Z=de&&!!g.sheenRoughnessMap,J=!!g.specularMap,ht=!!g.specularColorMap,R=!!g.specularIntensityMap,$=Pt&&!!g.transmissionMap,Y=Pt&&!!g.thicknessMap,ut=!!g.gradientMap,rt=!!g.alphaMap,ct=g.alphaTest>0,Rt=!!g.alphaHash,Bt=!!g.extensions,st=gn;g.toneMapped&&(gt===null||gt.isXRRenderTarget===!0)&&(st=i.toneMapping);let Ct=Gt?B.isCompressedCubeTexture?B.image[0].mipmaps:B.mipmaps:null,Ot={shaderID:j,shaderType:g.type,shaderName:g.name,vertexShader:at,fragmentShader:V,defines:g.defines,customVertexShaderID:it,customFragmentShaderID:ot,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:W,batching:qt,batchingColor:qt&&U._colorsTexture!==null,instancing:Mt,instancingColor:Mt&&U.instanceColor!==null,instancingMorph:Mt&&U.morphTexture!==null,outputColorSpace:gt===null?i.outputColorSpace:gt.isXRRenderTarget===!0?gt.texture.colorSpace:Wt.workingColorSpace,alphaToCoverage:!!g.alphaToCoverage,map:bt,matcap:Yt,envMap:Jt,envMapMode:Jt&&B.mapping,envMapPMREM:Gt,envMapMaxLod:Gt?Ct.length-1:null,envMapSize:Gt?Ct[0].width:null,aoMap:be,lightMap:ue,bumpMap:Fe,normalMap:oe,displacementMap:cn,emissiveMap:ge,normalMapObjectSpace:oe&&g.normalMapType===Vc,normalMapTangentSpace:oe&&g.normalMapType===za,packedNormalMap:oe&&g.normalMapType===za&&ug(g.normalMap.format),metalnessMap:We,roughnessMap:Xe,anisotropy:qe,anisotropyMap:Dt,clearcoat:N,clearcoatMap:A,clearcoatNormalMap:x,clearcoatRoughnessMap:k,diffuseRoughness:Ye,diffuseRoughnessMap:nt,dispersion:ie,retroreflection:se,iridescence:mt,iridescenceMap:Q,iridescenceThicknessMap:lt,sheen:de,sheenColorMap:ft,sheenRoughnessMap:Z,specularMap:J,specularColorMap:ht,specularIntensityMap:R,transmission:Pt,transmissionMap:$,thicknessMap:Y,gradientMap:ut,opaque:g.transparent===!1&&g.blending===Oi&&g.alphaToCoverage===!1,alphaMap:rt,alphaTest:ct,alphaHash:Rt,combine:g.combine,mapUv:bt&&d(g.map.channel),aoMapUv:be&&d(g.aoMap.channel),lightMapUv:ue&&d(g.lightMap.channel),bumpMapUv:Fe&&d(g.bumpMap.channel),normalMapUv:oe&&d(g.normalMap.channel),displacementMapUv:cn&&d(g.displacementMap.channel),emissiveMapUv:ge&&d(g.emissiveMap.channel),metalnessMapUv:We&&d(g.metalnessMap.channel),roughnessMapUv:Xe&&d(g.roughnessMap.channel),anisotropyMapUv:Dt&&d(g.anisotropyMap.channel),clearcoatMapUv:A&&d(g.clearcoatMap.channel),clearcoatNormalMapUv:x&&d(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:k&&d(g.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:nt&&d(g.diffuseRoughnessMap.channel),iridescenceMapUv:Q&&d(g.iridescenceMap.channel),iridescenceThicknessMapUv:lt&&d(g.iridescenceThicknessMap.channel),sheenColorMapUv:ft&&d(g.sheenColorMap.channel),sheenRoughnessMapUv:Z&&d(g.sheenRoughnessMap.channel),specularMapUv:J&&d(g.specularMap.channel),specularColorMapUv:ht&&d(g.specularColorMap.channel),specularIntensityMapUv:R&&d(g.specularIntensityMap.channel),transmissionMapUv:$&&d(g.transmissionMap.channel),thicknessMapUv:Y&&d(g.thicknessMap.channel),alphaMapUv:rt&&d(g.alphaMap.channel),vertexTangents:!!C.attributes.tangent&&(oe||qe),vertexNormals:!!C.attributes.normal,vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!C.attributes.color&&C.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!C.attributes.uv&&(bt||rt),fog:!!X,useFog:g.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:g.wireframe===!1&&(g.flatShading===!0||C.attributes.normal===void 0&&oe===!1&&(g.isMeshLambertMaterial||g.isMeshPhongMaterial||g.isMeshStandardMaterial||g.isMeshPhysicalMaterial)),sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:m,reversedDepthBuffer:et,skinning:U.isSkinnedMesh===!0,hasPositionAttribute:C.attributes.position!==void 0,morphTargets:C.morphAttributes.position!==void 0,morphNormals:C.morphAttributes.normal!==void 0,morphColors:C.morphAttributes.color!==void 0,morphTargetsCount:tt,morphTextureStride:yt,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:O.filter(_t=>_t.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:g.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:st,decodeVideoTexture:bt&&g.map.isVideoTexture===!0&&Wt.getTransfer(g.map.colorSpace)===$t,decodeVideoTextureEmissive:ge&&g.emissiveMap.isVideoTexture===!0&&Wt.getTransfer(g.emissiveMap.colorSpace)===$t,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===Ke,flipSided:g.side===fe,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:Bt&&g.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Bt&&g.extensions.multiDraw===!0||qt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return Ot.vertexUv1s=l.has(1),Ot.vertexUv2s=l.has(2),Ot.vertexUv3s=l.has(3),l.clear(),Ot}function y(g){let b=[];if(g.shaderID?b.push(g.shaderID):(b.push(g.customVertexShaderID),b.push(g.customFragmentShaderID)),g.defines!==void 0)for(let D in g.defines)b.push(D),b.push(g.defines[D]);return g.isRawShaderMaterial===!1&&(h(b,g),p(b,g),b.push(i.outputColorSpace)),b.push(g.customProgramCacheKey),b.join()}function h(g,b){g.push(b.precision),g.push(b.outputColorSpace),g.push(b.envMapMode),g.push(b.envMapPMREM),g.push(b.envMapMaxLod),g.push(b.envMapSize),g.push(b.mapUv),g.push(b.alphaMapUv),g.push(b.lightMapUv),g.push(b.aoMapUv),g.push(b.bumpMapUv),g.push(b.normalMapUv),g.push(b.displacementMapUv),g.push(b.emissiveMapUv),g.push(b.metalnessMapUv),g.push(b.roughnessMapUv),g.push(b.anisotropyMapUv),g.push(b.clearcoatMapUv),g.push(b.clearcoatNormalMapUv),g.push(b.clearcoatRoughnessMapUv),g.push(b.diffuseRoughnessMapUv),g.push(b.iridescenceMapUv),g.push(b.iridescenceThicknessMapUv),g.push(b.sheenColorMapUv),g.push(b.sheenRoughnessMapUv),g.push(b.specularMapUv),g.push(b.specularColorMapUv),g.push(b.specularIntensityMapUv),g.push(b.transmissionMapUv),g.push(b.thicknessMapUv),g.push(b.combine),g.push(b.fogExp2),g.push(b.sizeAttenuation),g.push(b.morphTargetsCount),g.push(b.numSunLights),g.push(b.numDirLights),g.push(b.numPointLights),g.push(b.numSpotLights),g.push(b.numSpotLightMaps),g.push(b.numHemiLights),g.push(b.numRectAreaLights),g.push(b.numSunLightShadows),g.push(b.numDirLightShadows),g.push(b.numPointLightShadows),g.push(b.numSpotLightShadows),g.push(b.numSpotLightShadowsWithMaps),g.push(b.numLightProbes),g.push(b.numLightProbeGrids),g.push(b.shadowMapType),g.push(b.toneMapping),g.push(b.numClippingPlanes),g.push(b.numClipIntersection),g.push(b.depthPacking)}function p(g,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.retroreflection&&a.enable(24),b.diffuseRoughness&&a.enable(25),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),b.packedNormalMap&&a.enable(22),b.vertexNormals&&a.enable(23),g.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),b.numLightProbeGrids>0&&a.enable(22),b.hasPositionAttribute&&a.enable(23),g.push(a.mask)}function M(g){let b=f[g.type],D;if(b){let I=xn[b];D=ih.clone(I.uniforms)}else D=g.uniforms;return D}function w(g,b){let D=u.get(b);return D!==void 0?++D.usedTimes:(D=new cg(i,b,g,s),c.push(D),u.set(b,D)),D}function S(g){if(--g.usedTimes===0){let b=c.indexOf(g);c[b]=c[c.length-1],c.pop(),u.delete(g.cacheKey),g.destroy()}}function E(g){o.remove(g)}function T(){o.dispose()}return{getParameters:_,getProgramCacheKey:y,getUniforms:M,acquireProgram:w,releaseProgram:S,releaseShaderCache:E,programs:c,dispose:T}}function fg(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function pg(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function bh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Th(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function o(f,d,_,y,h,p){let M=i[t];return M===void 0?(M={id:f.id,object:f,geometry:d,material:_,materialVariant:a(f),groupOrder:y,renderOrder:f.renderOrder,z:h,group:p},i[t]=M):(M.id=f.id,M.object=f,M.geometry=d,M.material=_,M.materialVariant=a(f),M.groupOrder=y,M.renderOrder=f.renderOrder,M.z=h,M.group=p),t++,M}function l(f,d,_,y,h,p,M){M.reversedDepth===!0&&(h=-h);let w=o(f,d,_,y,h,p);_.transmission>0?n.push(w):_.transparent===!0?s.push(w):e.push(w)}function c(f,d,_,y,h,p){let M=o(f,d,_,y,h,p);_.transmission>0?n.unshift(M):_.transparent===!0?s.unshift(M):e.unshift(M)}function u(f,d){e.length>1&&e.sort(f||pg),n.length>1&&n.sort(d||bh),s.length>1&&s.sort(d||bh)}function m(){for(let f=t,d=i.length;f<d;f++){let _=i[f];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:m,sort:u}}function mg(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new Th,i.set(n,[a])):s>=r.length?(a=new Th,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function gg(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new L,color:new Ft};break;case"SpotLight":e={position:new L,direction:new L,color:new Ft,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Ft,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Ft,groundColor:new Ft};break;case"RectAreaLight":e={color:new Ft,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function _g(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var xg=0;function vg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function yg(i){let t=new gg,e=_g(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);let s=new L,r=new te,a=new te;function o(c){let u=0,m=0,f=0;for(let O=0;O<9;O++)n.probe[O].set(0,0,0);let d=0,_=0,y=0,h=0,p=0,M=0,w=0,S=0,E=0,T=0,g=0,b=0,D=0,I=0;c.sort(vg);for(let O=0,X=c.length;O<X;O++){let C=c[O],q=C.color,F=C.intensity,B=C.distance,j=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===Jn?j=C.shadow.map.texture:j=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)u+=q.r*F,m+=q.g*F,f+=q.b*F;else if(C.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(C.sh.coefficients[W],F);I++}else if(C.isSunLight){let W=t.get(C);if(W.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let K=C.shadow,tt=e.get(C);tt.shadowIntensity=K.intensity,tt.shadowBias=K.bias,tt.shadowNormalBias=K.normalBias,tt.shadowRadius=K.radius,tt.shadowMapSize.copy(K.mapSize).multiply(K.getFrameExtents()),n.sunShadow[_]=tt,n.sunShadowMap[_]=j;let yt=K.getViewportCount();for(let at=0;at<yt;at++)n.sunShadowMatrix[y+at]=K.getMatrix(at),n.sunShadowCascade[y+at]=K._cascadeData[at];y+=yt,_++}n.sun[d]=W,d++}else if(C.isDirectionalLight){let W=t.get(C);if(W.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let K=C.shadow,tt=e.get(C);tt.shadowIntensity=K.intensity,tt.shadowBias=K.bias,tt.shadowNormalBias=K.normalBias,tt.shadowRadius=K.radius,tt.shadowMapSize=K.mapSize,n.directionalShadow[h]=tt,n.directionalShadowMap[h]=j,n.directionalShadowMatrix[h]=C.shadow.matrix,E++}n.directional[h]=W,h++}else if(C.isSpotLight){let W=t.get(C);W.position.setFromMatrixPosition(C.matrixWorld),W.color.copy(q).multiplyScalar(F),W.distance=B,W.coneCos=Math.cos(C.angle),W.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),W.decay=C.decay,n.spot[M]=W;let K=C.shadow;if(C.map&&(n.spotLightMap[b]=C.map,b++,K.updateMatrices(C),C.castShadow&&D++),n.spotLightMatrix[M]=K.matrix,C.castShadow){let tt=e.get(C);tt.shadowIntensity=K.intensity,tt.shadowBias=K.bias,tt.shadowNormalBias=K.normalBias,tt.shadowRadius=K.radius,tt.shadowMapSize=K.mapSize,n.spotShadow[M]=tt,n.spotShadowMap[M]=j,g++}M++}else if(C.isRectAreaLight){let W=t.get(C);W.color.copy(q).multiplyScalar(F),W.halfWidth.set(C.width*.5,0,0),W.halfHeight.set(0,C.height*.5,0),n.rectArea[w]=W,w++}else if(C.isPointLight){let W=t.get(C);if(W.color.copy(C.color).multiplyScalar(C.intensity),W.distance=C.distance,W.decay=C.decay,C.castShadow){let K=C.shadow,tt=e.get(C);tt.shadowIntensity=K.intensity,tt.shadowBias=K.bias,tt.shadowNormalBias=K.normalBias,tt.shadowRadius=K.radius,tt.shadowMapSize=K.mapSize,tt.shadowCameraNear=K.camera.near,tt.shadowCameraFar=K.camera.far,n.pointShadow[p]=tt,n.pointShadowMap[p]=j,n.pointShadowMatrix[p]=C.shadow.matrix,T++}n.point[p]=W,p++}else if(C.isHemisphereLight){let W=t.get(C);W.skyColor.copy(C.color).multiplyScalar(F),W.groundColor.copy(C.groundColor).multiplyScalar(F),n.hemi[S]=W,S++}}w>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=xt.LTC_FLOAT_1,n.rectAreaLTC2=xt.LTC_FLOAT_2):(n.rectAreaLTC1=xt.LTC_HALF_1,n.rectAreaLTC2=xt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=m,n.ambient[2]=f;let U=n.hash;(U.sunLength!==d||U.directionalLength!==h||U.pointLength!==p||U.spotLength!==M||U.rectAreaLength!==w||U.hemiLength!==S||U.numSunShadows!==_||U.numDirectionalShadows!==E||U.numPointShadows!==T||U.numSpotShadows!==g||U.numSpotMaps!==b||U.numLightProbes!==I)&&(n.sun.length=d,n.directional.length=h,n.spot.length=M,n.rectArea.length=w,n.point.length=p,n.hemi.length=S,n.sunShadow.length=_,n.sunShadowMap.length=_,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.directionalShadowMatrix.length=E,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=g,n.spotShadowMap.length=g,n.spotLightMatrix.length=g+b-D,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=D,n.numLightProbes=I,U.sunLength=d,U.directionalLength=h,U.pointLength=p,U.spotLength=M,U.rectAreaLength=w,U.hemiLength=S,U.numSunShadows=_,U.numDirectionalShadows=E,U.numPointShadows=T,U.numSpotShadows=g,U.numSpotMaps=b,U.numLightProbes=I,n.version=xg++)}function l(c,u){let m=0,f=0,d=0,_=0,y=0,h=0,p=u.matrixWorldInverse;for(let M=0,w=c.length;M<w;M++){let S=c[M];if(S.isSunLight){let E=n.sun[m];E.direction.setFromMatrixPosition(S.matrixWorld),E.direction.transformDirection(p),m++}else if(S.isDirectionalLight){let E=n.directional[f];E.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(p),f++}else if(S.isSpotLight){let E=n.spot[_];E.position.setFromMatrixPosition(S.matrixWorld),E.position.applyMatrix4(p),E.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(p),_++}else if(S.isRectAreaLight){let E=n.rectArea[y];E.position.setFromMatrixPosition(S.matrixWorld),E.position.applyMatrix4(p),a.identity(),r.copy(S.matrixWorld),r.premultiply(p),a.extractRotation(r),E.halfWidth.set(S.width*.5,0,0),E.halfHeight.set(0,S.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),y++}else if(S.isPointLight){let E=n.point[d];E.position.setFromMatrixPosition(S.matrixWorld),E.position.applyMatrix4(p),d++}else if(S.isHemisphereLight){let E=n.hemi[h];E.direction.setFromMatrixPosition(S.matrixWorld),E.direction.transformDirection(p),h++}}}return{setup:o,setupView:l,state:n}}function Ah(i){let t=new yg(i),e=[],n=[],s=[];function r(m){u.camera=m,e.length=0,n.length=0,s.length=0}function a(m){m.isLightProbeGrid?s.push(m):e.push(m)}function o(m){n.push(m)}function l(){t.setup(e),s.sort((m,f)=>m.priority-f.priority||m.id-f.id)}function c(m){t.setupView(e,m)}let u={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Mg(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new Ah(i),t.set(s,[o])):r>=a.length?(o=new Ah(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var Sg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Tg=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],Ag=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],wh=new te,Us=new L,gl=new L;function wg(i,t,e){let n=new Hn,s=new wt,r=new wt,a=new re,o=new zr,l=new kr,c={},u=e.maxTextureSize,m={[He]:fe,[fe]:He,[Ke]:Ke},f=new Oe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new wt},radius:{value:4}},vertexShader:Sg,fragmentShader:bg}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let _=new Ae;_.setAttribute("position",new dn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new ae(_,f),h=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Es;let p=this.type;this.render=function(T,g,b){if(h.enabled===!1||h.autoUpdate===!1&&h.needsUpdate===!1||T.length===0)return;this.type===vc&&(It("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Es);let D=i.getRenderTarget(),I=i.getActiveCubeFace(),U=i.getActiveMipmapLevel(),O=i.state;O.setBlending(ri),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let X=p!==this.type;X&&g.traverse(function(C){C.material&&(Array.isArray(C.material)?C.material.forEach(q=>q.needsUpdate=!0):C.material.needsUpdate=!0)});for(let C=0,q=T.length;C<q;C++){let F=T[C],B=F.shadow;if(B===void 0){It("WebGLShadowMap:",F,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;s.copy(B.mapSize);let j=B.getFrameExtents();s.multiply(j),r.copy(B.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/j.x),s.x=r.x*j.x,B.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/j.y),s.y=r.y*j.y,B.mapSize.y=r.y));let W=i.state.buffers.depth.getReversed();if(B.camera._reversedDepth=W,B.map===null||X===!0){if(B.map!==null&&(B.map.depthTexture!==null&&(B.map.depthTexture.dispose(),B.map.depthTexture=null),B.map.dispose()),this.type===Fi){if(F.isPointLight){It("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}B.map=new Ge(s.x,s.y,{format:Jn,type:on,minFilter:De,magFilter:De,generateMipmaps:!1}),B.map.texture.name=F.name+".shadowMap",B.map.depthTexture=new Rn(s.x,s.y,an),B.map.depthTexture.name=F.name+".shadowMapDepth",B.map.depthTexture.format=wn,B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Me,B.map.depthTexture.magFilter=Me}else F.isPointLight?(B.map=new Os(s.x),B.map.depthTexture=new ps(s.x,rn)):(B.map=new Ge(s.x,s.y),B.map.depthTexture=new Rn(s.x,s.y,rn)),B.map.depthTexture.name=F.name+".shadowMap",B.map.depthTexture.format=wn,this.type===Es?(B.map.depthTexture.compareFunction=W?Ko:$o,B.map.depthTexture.minFilter=De,B.map.depthTexture.magFilter=De):(B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Me,B.map.depthTexture.magFilter=Me);B.camera.updateProjectionMatrix()}B.map.isWebGLCubeRenderTarget!==!0&&(B.map.width!==s.x||B.map.height!==s.y)&&B.map.setSize(s.x,s.y);let K=B.map.isWebGLCubeRenderTarget?6:B.getViewportCount();F.isPointLight!==!0&&B.updateMatrices(F,b);let tt=(B.camera.layers.mask&4294967294)!==0?B.camera.layers:b.layers;for(let yt=0;yt<K;yt++){let at=B.getCamera(yt);if(F.isPointLight){let V=B.camera,it=B.matrix,ot=F.distance||V.far;ot!==V.far&&(V.far=ot,V.updateProjectionMatrix()),Us.setFromMatrixPosition(F.matrixWorld),V.position.copy(Us),gl.copy(V.position),gl.add(Tg[yt]),V.up.copy(Ag[yt]),V.lookAt(gl),V.updateMatrixWorld(),it.makeTranslation(-Us.x,-Us.y,-Us.z),wh.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),B._frustum.setFromProjectionMatrix(wh,V.coordinateSystem,V.reversedDepth)}if(B.map.isWebGLCubeRenderTarget)i.setRenderTarget(B.map,yt),i.clear();else{yt===0&&(i.setRenderTarget(B.map),i.clear());let V=B.getViewport(yt);a.set(r.x*V.x,r.y*V.y,r.x*V.z,r.y*V.w),O.viewport(a)}n=B.getFrustum(yt),S(g,b,at,F,tt,this.type)}B.isPointLightShadow!==!0&&this.type===Fi&&M(B,b),B.needsUpdate=!1}p=this.type,h.needsUpdate=!1,i.setRenderTarget(D,I,U)};function M(T,g){let b=t.update(y);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null?T.mapPass=new Ge(s.x,s.y,{format:Jn,type:on}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),f.uniforms.shadow_pass.value=T.map.depthTexture,f.uniforms.resolution.value.set(T.map.width,T.map.height),f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(g,null,b,f,y,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value.set(T.map.width,T.map.height),d.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(g,null,b,d,y,null)}function w(T,g,b,D){let I=null,U=b.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(U!==void 0)I=U;else if(I=b.isPointLight===!0?l:o,i.localClippingEnabled&&g.clipShadows===!0&&Array.isArray(g.clippingPlanes)&&g.clippingPlanes.length!==0||g.displacementMap&&g.displacementScale!==0||g.alphaMap&&g.alphaTest>0||g.map&&g.alphaTest>0||g.alphaToCoverage===!0){let O=I.uuid,X=g.uuid,C=c[O];C===void 0&&(C={},c[O]=C);let q=C[X];q===void 0&&(q=I.clone(),C[X]=q,g.addEventListener("dispose",E)),I=q}if(I.visible=g.visible,I.wireframe=g.wireframe,D===Fi?I.side=g.shadowSide!==null?g.shadowSide:g.side:I.side=g.shadowSide!==null?g.shadowSide:m[g.side],I.alphaMap=g.alphaMap,I.alphaTest=g.alphaToCoverage===!0?.5:g.alphaTest,I.map=g.map,I.clipShadows=g.clipShadows,I.clippingPlanes=g.clippingPlanes,I.clipIntersection=g.clipIntersection,I.displacementMap=g.displacementMap,I.displacementScale=g.displacementScale,I.displacementBias=g.displacementBias,I.wireframeLinewidth=g.wireframeLinewidth,I.linewidth=g.linewidth,b.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let O=i.properties.get(I);O.light=b}return I}function S(T,g,b,D,I,U){if(T.visible===!1)return;if(T.layers.test(I)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&U===Fi)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,T.matrixWorld);let C=t.update(T),q=T.material;if(Array.isArray(q)){let F=C.groups;for(let B=0,j=F.length;B<j;B++){let W=F[B],K=q[W.materialIndex];if(K&&K.visible){let tt=w(T,K,D,U);T.onBeforeShadow(i,T,g,b,C,tt,W),i.renderBufferDirect(b,null,C,tt,T,W),T.onAfterShadow(i,T,g,b,C,tt,W)}}}else if(q.visible){let F=w(T,q,D,U);T.onBeforeShadow(i,T,g,b,C,F,null),i.renderBufferDirect(b,null,C,F,T,null),T.onAfterShadow(i,T,g,b,C,F,null)}}let X=T.children;for(let C=0,q=X.length;C<q;C++)S(X[C],g,b,D,I,U)}function E(T){T.target.removeEventListener("dispose",E);for(let b in c){let D=c[b],I=T.target.uuid;I in D&&(D[I].dispose(),delete D[I])}}}function Eg(i,t){function e(){let R=!1,$=new re,Y=null,ut=new re(0,0,0,0);return{setMask:function(rt){Y!==rt&&!R&&(i.colorMask(rt,rt,rt,rt),Y=rt)},setLocked:function(rt){R=rt},setClear:function(rt,ct,Rt,Bt,st){st===!0&&(rt*=Bt,ct*=Bt,Rt*=Bt),$.set(rt,ct,Rt,Bt),ut.equals($)===!1&&(i.clearColor(rt,ct,Rt,Bt),ut.copy($))},reset:function(){R=!1,Y=null,ut.set(-1,0,0,0)}}}function n(){let R=!1,$=!1,Y=null,ut=null,rt=null;return{setReversed:function(ct){if($!==ct){let Rt=t.get("EXT_clip_control");ct?Rt.clipControlEXT(Rt.LOWER_LEFT_EXT,Rt.ZERO_TO_ONE_EXT):Rt.clipControlEXT(Rt.LOWER_LEFT_EXT,Rt.NEGATIVE_ONE_TO_ONE_EXT),$=ct;let Bt=rt;rt=null,this.setClear(Bt)}},getReversed:function(){return $},setTest:function(ct){ct?et(i.DEPTH_TEST):Mt(i.DEPTH_TEST)},setMask:function(ct){Y!==ct&&!R&&(i.depthMask(ct),Y=ct)},setFunc:function(ct){if($&&(ct=jc[ct]),ut!==ct){switch(ct){case pr:i.depthFunc(i.NEVER);break;case mr:i.depthFunc(i.ALWAYS);break;case gr:i.depthFunc(i.LESS);break;case Ti:i.depthFunc(i.LEQUAL);break;case _r:i.depthFunc(i.EQUAL);break;case xr:i.depthFunc(i.GEQUAL);break;case vr:i.depthFunc(i.GREATER);break;case yr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ut=ct}},setLocked:function(ct){R=ct},setClear:function(ct){rt!==ct&&(rt=ct,$&&(ct=1-ct),i.clearDepth(ct))},reset:function(){R=!1,Y=null,ut=null,rt=null,$=!1}}}function s(){let R=!1,$=null,Y=null,ut=null,rt=null,ct=null,Rt=null,Bt=null,st=null;return{setTest:function(Ct){R||(Ct?et(i.STENCIL_TEST):Mt(i.STENCIL_TEST))},setMask:function(Ct){$!==Ct&&!R&&(i.stencilMask(Ct),$=Ct)},setFunc:function(Ct,Ot,_t){(Y!==Ct||ut!==Ot||rt!==_t)&&(i.stencilFunc(Ct,Ot,_t),Y=Ct,ut=Ot,rt=_t)},setOp:function(Ct,Ot,_t){(ct!==Ct||Rt!==Ot||Bt!==_t)&&(i.stencilOp(Ct,Ot,_t),ct=Ct,Rt=Ot,Bt=_t)},setLocked:function(Ct){R=Ct},setClear:function(Ct){st!==Ct&&(i.clearStencil(Ct),st=Ct)},reset:function(){R=!1,$=null,Y=null,ut=null,rt=null,ct=null,Rt=null,Bt=null,st=null}}}let r=new e,a=new n,o=new s,l={},c=new WeakMap,u={},m={},f={},d=new WeakMap,_=[],y=null,h=!1,p=null,M=null,w=null,S=null,E=null,T=null,g=null,b=new Ft(0,0,0),D=0,I=!1,U=null,O=null,X=null,C=null,q=null,F=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),B=!1,j=0,W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(W)[1]),B=j>=1):W.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),B=j>=2);let K=null,tt={},yt=i.getParameter(i.SCISSOR_BOX),at=i.getParameter(i.VIEWPORT),V=new re().fromArray(yt),it=new re().fromArray(at);function ot(R,$,Y,ut){let rt=new Uint8Array(4),ct=i.createTexture();i.bindTexture(R,ct),i.texParameteri(R,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(R,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Rt=0;Rt<Y;Rt++)R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY?i.texImage3D($,0,i.RGBA,1,1,ut,0,i.RGBA,i.UNSIGNED_BYTE,rt):i.texImage2D($+Rt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,rt);return ct}let gt={};gt[i.TEXTURE_2D]=ot(i.TEXTURE_2D,i.TEXTURE_2D,1),gt[i.TEXTURE_CUBE_MAP]=ot(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),gt[i.TEXTURE_2D_ARRAY]=ot(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),gt[i.TEXTURE_3D]=ot(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),et(i.DEPTH_TEST),a.setFunc(Ti),Fe(!1),oe(Ro),et(i.CULL_FACE),be(ri);function et(R){u[R]!==!0&&(i.enable(R),u[R]=!0)}function Mt(R){u[R]!==!1&&(i.disable(R),u[R]=!1)}function qt(R,$){return f[R]!==$?(i.bindFramebuffer(R,$),f[R]=$,R===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=$),R===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=$),!0):!1}function bt(R,$){let Y=_,ut=!1;if(R){Y=d.get($),Y===void 0&&(Y=[],d.set($,Y));let rt=R.textures;if(Y.length!==rt.length||Y[0]!==i.COLOR_ATTACHMENT0){for(let ct=0,Rt=rt.length;ct<Rt;ct++)Y[ct]=i.COLOR_ATTACHMENT0+ct;Y.length=rt.length,ut=!0}}else Y[0]!==i.BACK&&(Y[0]=i.BACK,ut=!0);ut&&i.drawBuffers(Y)}function Yt(R){return y!==R?(i.useProgram(R),y=R,!0):!1}let Jt={[ai]:i.FUNC_ADD,[Mc]:i.FUNC_SUBTRACT,[Sc]:i.FUNC_REVERSE_SUBTRACT};Jt[bc]=i.MIN,Jt[Tc]=i.MAX;let Gt={[Ac]:i.ZERO,[wc]:i.ONE,[Ec]:i.SRC_COLOR,[Lo]:i.SRC_ALPHA,[Nc]:i.SRC_ALPHA_SATURATE,[Pc]:i.DST_COLOR,[Cc]:i.DST_ALPHA,[Rc]:i.ONE_MINUS_SRC_COLOR,[No]:i.ONE_MINUS_SRC_ALPHA,[Lc]:i.ONE_MINUS_DST_COLOR,[Ic]:i.ONE_MINUS_DST_ALPHA,[Dc]:i.CONSTANT_COLOR,[Uc]:i.ONE_MINUS_CONSTANT_COLOR,[Fc]:i.CONSTANT_ALPHA,[Oc]:i.ONE_MINUS_CONSTANT_ALPHA};function be(R,$,Y,ut,rt,ct,Rt,Bt,st,Ct){if(R===ri){h===!0&&(Mt(i.BLEND),h=!1);return}if(h===!1&&(et(i.BLEND),h=!0),R!==yc){if(R!==p||Ct!==I){if((M!==ai||E!==ai)&&(i.blendEquation(i.FUNC_ADD),M=ai,E=ai),Ct)switch(R){case Oi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Co:i.blendFunc(i.ONE,i.ONE);break;case Io:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Po:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Lt("WebGLState: Invalid blending: ",R);break}else switch(R){case Oi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Co:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Io:Lt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Po:Lt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Lt("WebGLState: Invalid blending: ",R);break}w=null,S=null,T=null,g=null,b.set(0,0,0),D=0,p=R,I=Ct}return}rt=rt||$,ct=ct||Y,Rt=Rt||ut,($!==M||rt!==E)&&(i.blendEquationSeparate(Jt[$],Jt[rt]),M=$,E=rt),(Y!==w||ut!==S||ct!==T||Rt!==g)&&(i.blendFuncSeparate(Gt[Y],Gt[ut],Gt[ct],Gt[Rt]),w=Y,S=ut,T=ct,g=Rt),(Bt.equals(b)===!1||st!==D)&&(i.blendColor(Bt.r,Bt.g,Bt.b,st),b.copy(Bt),D=st),p=R,I=!1}function ue(R,$){R.side===Ke?Mt(i.CULL_FACE):et(i.CULL_FACE);let Y=R.side===fe;$&&(Y=!Y),Fe(Y),R.blending===Oi&&R.transparent===!1?be(ri):be(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),a.setFunc(R.depthFunc),a.setTest(R.depthTest),a.setMask(R.depthWrite),r.setMask(R.colorWrite);let ut=R.stencilWrite;o.setTest(ut),ut&&(o.setMask(R.stencilWriteMask),o.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),o.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),ge(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?et(i.SAMPLE_ALPHA_TO_COVERAGE):Mt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Fe(R){U!==R&&(R?i.frontFace(i.CW):i.frontFace(i.CCW),U=R)}function oe(R){R!==_c?(et(i.CULL_FACE),R!==O&&(R===Ro?i.cullFace(i.BACK):R===xc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Mt(i.CULL_FACE),O=R}function cn(R){R!==X&&(B&&i.lineWidth(R),X=R)}function ge(R,$,Y){R?(et(i.POLYGON_OFFSET_FILL),(C!==$||q!==Y)&&(C=$,q=Y,a.getReversed()&&($=-$,Y=-Y),i.polygonOffset($,Y))):Mt(i.POLYGON_OFFSET_FILL)}function We(R){R?et(i.SCISSOR_TEST):Mt(i.SCISSOR_TEST)}function Xe(R){R===void 0&&(R=i.TEXTURE0+F-1),K!==R&&(i.activeTexture(R),K=R)}function qe(R,$,Y){Y===void 0&&(K===null?Y=i.TEXTURE0+F-1:Y=K);let ut=tt[Y];ut===void 0&&(ut={type:void 0,texture:void 0},tt[Y]=ut),(ut.type!==R||ut.texture!==$)&&(K!==Y&&(i.activeTexture(Y),K=Y),i.bindTexture(R,$||gt[R]),ut.type=R,ut.texture=$)}function N(){let R=tt[K];R!==void 0&&R.type!==void 0&&(i.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function Ye(){try{i.compressedTexImage2D(...arguments)}catch(R){Lt("WebGLState:",R)}}function ie(){try{i.compressedTexImage3D(...arguments)}catch(R){Lt("WebGLState:",R)}}function se(){try{i.texSubImage2D(...arguments)}catch(R){Lt("WebGLState:",R)}}function mt(){try{i.texSubImage3D(...arguments)}catch(R){Lt("WebGLState:",R)}}function de(){try{i.compressedTexSubImage2D(...arguments)}catch(R){Lt("WebGLState:",R)}}function Pt(){try{i.compressedTexSubImage3D(...arguments)}catch(R){Lt("WebGLState:",R)}}function Dt(){try{i.texStorage2D(...arguments)}catch(R){Lt("WebGLState:",R)}}function A(){try{i.texStorage3D(...arguments)}catch(R){Lt("WebGLState:",R)}}function x(){try{i.texImage2D(...arguments)}catch(R){Lt("WebGLState:",R)}}function k(){try{i.texImage3D(...arguments)}catch(R){Lt("WebGLState:",R)}}function nt(R){return m[R]!==void 0?m[R]:i.getParameter(R)}function Q(R,$){m[R]!==$&&(i.pixelStorei(R,$),m[R]=$)}function lt(R){V.equals(R)===!1&&(i.scissor(R.x,R.y,R.z,R.w),V.copy(R))}function ft(R){it.equals(R)===!1&&(i.viewport(R.x,R.y,R.z,R.w),it.copy(R))}function Z(R,$){let Y=c.get($);Y===void 0&&(Y=new WeakMap,c.set($,Y));let ut=Y.get(R);ut===void 0&&(ut=i.getUniformBlockIndex($,R.name),i.uniformBlockBinding($,ut,ut),Y.set(R,ut))}function J(R,$,Y){let rt=c.get($).get(R);l[rt]!==Y&&(i.bindBufferBase(i.UNIFORM_BUFFER,rt,Y),l[rt]=Y)}function ht(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},m={},K=null,tt={},f={},l={},d=new WeakMap,_=[],y=null,h=!1,p=null,M=null,w=null,S=null,E=null,T=null,g=null,b=new Ft(0,0,0),D=0,I=!1,U=null,O=null,X=null,C=null,q=null,V.set(0,0,i.canvas.width,i.canvas.height),it.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:et,disable:Mt,bindFramebuffer:qt,drawBuffers:bt,useProgram:Yt,setBlending:be,setMaterial:ue,setFlipSided:Fe,setCullFace:oe,setLineWidth:cn,setPolygonOffset:ge,setScissorTest:We,activeTexture:Xe,bindTexture:qe,unbindTexture:N,compressedTexImage2D:Ye,compressedTexImage3D:ie,texImage2D:x,texImage3D:k,pixelStorei:Q,getParameter:nt,updateUBOMapping:Z,uniformBlockBinding:J,texStorage2D:Dt,texStorage3D:A,texSubImage2D:se,texSubImage3D:mt,compressedTexSubImage2D:de,compressedTexSubImage3D:Pt,scissor:lt,viewport:ft,reset:ht}}function Rg(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new wt,u=new WeakMap,m=new Set,f,d=new WeakMap,_=new Set,y=new FinalizationRegistry(A=>_.delete(A)),h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(A,x){return h?new OffscreenCanvas(A,x):ss("canvas")}function M(A,x,k){let nt=1,Q=Dt(A);if((Q.width>k||Q.height>k)&&(nt=k/Math.max(Q.width,Q.height)),nt<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let lt=Math.floor(nt*Q.width),ft=Math.floor(nt*Q.height);f===void 0&&(f=p(lt,ft));let Z=x?p(lt,ft):f;return Z.width=lt,Z.height=ft,Z.getContext("2d").drawImage(A,0,0,lt,ft),It("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+lt+"x"+ft+")."),Z}else return"data"in A&&It("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),A;return A}function w(A){return A.generateMipmaps}function S(A){i.generateMipmap(A)}function E(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(A,x,k,nt,Q,lt=!1){if(A!==null){if(i[A]!==void 0)return i[A];It("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let ft;nt&&(ft=t.get("EXT_texture_norm16"),ft||It("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Z=x;if(x===i.RED&&(k===i.FLOAT&&(Z=i.R32F),k===i.HALF_FLOAT&&(Z=i.R16F),k===i.UNSIGNED_BYTE&&(Z=i.R8),k===i.UNSIGNED_SHORT&&ft&&(Z=ft.R16_EXT),k===i.SHORT&&ft&&(Z=ft.R16_SNORM_EXT)),x===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(Z=i.R8UI),k===i.UNSIGNED_SHORT&&(Z=i.R16UI),k===i.UNSIGNED_INT&&(Z=i.R32UI),k===i.BYTE&&(Z=i.R8I),k===i.SHORT&&(Z=i.R16I),k===i.INT&&(Z=i.R32I)),x===i.RG&&(k===i.FLOAT&&(Z=i.RG32F),k===i.HALF_FLOAT&&(Z=i.RG16F),k===i.UNSIGNED_BYTE&&(Z=i.RG8),k===i.UNSIGNED_SHORT&&ft&&(Z=ft.RG16_EXT),k===i.SHORT&&ft&&(Z=ft.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(Z=i.RG8UI),k===i.UNSIGNED_SHORT&&(Z=i.RG16UI),k===i.UNSIGNED_INT&&(Z=i.RG32UI),k===i.BYTE&&(Z=i.RG8I),k===i.SHORT&&(Z=i.RG16I),k===i.INT&&(Z=i.RG32I)),x===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),k===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),k===i.UNSIGNED_INT&&(Z=i.RGB32UI),k===i.BYTE&&(Z=i.RGB8I),k===i.SHORT&&(Z=i.RGB16I),k===i.INT&&(Z=i.RGB32I)),x===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),k===i.UNSIGNED_INT&&(Z=i.RGBA32UI),k===i.BYTE&&(Z=i.RGBA8I),k===i.SHORT&&(Z=i.RGBA16I),k===i.INT&&(Z=i.RGBA32I)),x===i.RGB&&(k===i.UNSIGNED_SHORT&&ft&&(Z=ft.RGB16_EXT),k===i.SHORT&&ft&&(Z=ft.RGB16_SNORM_EXT),k===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),k===i.UNSIGNED_INT_10F_11F_11F_REV&&(Z=i.R11F_G11F_B10F)),x===i.RGBA){let J=lt?is:Wt.getTransfer(Q);k===i.FLOAT&&(Z=i.RGBA32F),k===i.HALF_FLOAT&&(Z=i.RGBA16F),k===i.UNSIGNED_BYTE&&(Z=J===$t?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT&&ft&&(Z=ft.RGBA16_EXT),k===i.SHORT&&ft&&(Z=ft.RGBA16_SNORM_EXT),k===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function g(A,x){let k;return A?x===null||x===rn||x===li?k=i.DEPTH24_STENCIL8:x===an?k=i.DEPTH32F_STENCIL8:x===zi&&(k=i.DEPTH24_STENCIL8,It("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===rn||x===li?k=i.DEPTH_COMPONENT24:x===an?k=i.DEPTH_COMPONENT32F:x===zi&&(k=i.DEPTH_COMPONENT16),k}function b(A,x){return w(A)===!0||A.isFramebufferTexture&&A.minFilter!==Me&&A.minFilter!==De?Math.log2(Math.max(x.width,x.height))+1:A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?x.mipmaps.length:1}function D(A){let x=new WeakRef(A);n.get(A).__ref=x,_.add(x),y.register(A,x,x)}function I(A){let x=n.get(A).__ref;x!==void 0&&(_.delete(x),y.unregister(x))}function U(A){X(A.target)}function O(A){C(A.target)}function X(A){A.removeEventListener("dispose",U),I(A),F(A),A.isVideoTexture&&u.delete(A),A.isHTMLTexture&&m.delete(A)}function C(A){A.removeEventListener("dispose",O),I(A),j(A)}function q(){for(let A of _){let x=A.deref();x!==void 0&&(x.isRenderTarget===!0?C(x):X(x))}_.clear(),m.clear()}function F(A){let x=n.get(A);if(x.__webglInit===void 0)return;let k=A.source,nt=d.get(k);if(nt){let Q=nt[x.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&B(A),Object.keys(nt).length===0&&d.delete(k)}n.remove(A)}function B(A){let x=n.get(A);i.deleteTexture(x.__webglTexture);let k=A.source,nt=d.get(k);delete nt[x.__cacheKey],a.memory.textures--}function j(A){let x=n.get(A);x.__depthDisposeCallback&&x.__depthDisposeCallback();let k=A.depthTexture;if(k&&k.renderTarget===A&&X(k),A.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(x.__webglFramebuffer[Q]))for(let lt=0;lt<x.__webglFramebuffer[Q].length;lt++)i.deleteFramebuffer(x.__webglFramebuffer[Q][lt]);else i.deleteFramebuffer(x.__webglFramebuffer[Q]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[Q])}else{if(Array.isArray(x.__webglFramebuffer))for(let Q=0;Q<x.__webglFramebuffer.length;Q++)i.deleteFramebuffer(x.__webglFramebuffer[Q]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let Q=0;Q<x.__webglColorRenderbuffer.length;Q++)x.__webglColorRenderbuffer[Q]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[Q]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}let nt=A.textures;for(let Q=0,lt=nt.length;Q<lt;Q++){let ft=n.get(nt[Q]);ft.__webglTexture&&(i.deleteTexture(ft.__webglTexture),a.memory.textures--),n.remove(nt[Q])}n.remove(A)}let W=0;function K(){W=0}function tt(){return W}function yt(A){W=A}function at(){let A=W;return A>=s.maxTextures&&It("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+s.maxTextures),W+=1,A}function V(A){let x=[];return x.push(A.wrapS),x.push(A.wrapT),x.push(A.wrapR||0),x.push(A.magFilter),x.push(A.minFilter),x.push(A.anisotropy),x.push(A.internalFormat),x.push(A.format),x.push(A.type),x.push(A.generateMipmaps),x.push(A.mipmapsAutoUpdate),x.push(A.premultiplyAlpha),x.push(A.flipY),x.push(A.unpackAlignment),x.push(A.colorSpace),x.join()}function it(A,x){let k=n.get(A);if(A.isVideoTexture&&de(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&k.__version!==A.version){let nt=A.image;if(nt===null)It("WebGLRenderer: Texture marked for update but no image data found.");else if(nt.complete===!1)It("WebGLRenderer: Texture marked for update but image is incomplete");else{ue(k,A,x);return}}else A.isExternalTexture&&(k.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+x)}function ot(A,x){let k=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&k.__version!==A.version){ue(k,A,x);return}else A.isExternalTexture&&(k.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+x)}function gt(A,x){let k=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&k.__version!==A.version){ue(k,A,x);return}e.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+x)}function et(A,x){let k=n.get(A);if(A.version>0&&k.__version!==A.version){Fe(k,A,x);return}e.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+x)}let Mt={[Mr]:i.REPEAT,[un]:i.CLAMP_TO_EDGE,[Sr]:i.MIRRORED_REPEAT},qt={[Me]:i.NEAREST,[kc]:i.NEAREST_MIPMAP_NEAREST,[Rs]:i.NEAREST_MIPMAP_LINEAR,[De]:i.LINEAR,[na]:i.LINEAR_MIPMAP_NEAREST,[In]:i.LINEAR_MIPMAP_LINEAR},bt={[Wc]:i.NEVER,[Qo]:i.ALWAYS,[Xc]:i.LESS,[$o]:i.LEQUAL,[qc]:i.EQUAL,[Ko]:i.GEQUAL,[Yc]:i.GREATER,[Zc]:i.NOTEQUAL};function Yt(A,x){if(x.type===an&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===De||x.magFilter===na||x.magFilter===Rs||x.magFilter===In||x.minFilter===De||x.minFilter===na||x.minFilter===Rs||x.minFilter===In)&&It("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,Mt[x.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,Mt[x.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,Mt[x.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,qt[x.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,qt[x.minFilter]),x.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,bt[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Me||x.minFilter!==Rs&&x.minFilter!==In||x.type===an&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){let k=t.get("EXT_texture_filter_anisotropic");i.texParameterf(A,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Jt(A,x){let k=!1;A.__webglInit===void 0&&(A.__webglInit=!0,x.addEventListener("dispose",U),D(x));let nt=x.source,Q=d.get(nt);Q===void 0&&(Q={},d.set(nt,Q));let lt=V(x);if(lt!==A.__cacheKey){Q[lt]===void 0&&(Q[lt]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,k=!0),Q[lt].usedTimes++;let ft=Q[A.__cacheKey];ft!==void 0&&(Q[A.__cacheKey].usedTimes--,ft.usedTimes===0&&B(x)),A.__cacheKey=lt,A.__webglTexture=Q[lt].texture}return k}function Gt(A,x,k){return Math.floor(Math.floor(A/k)/x)}function be(A,x,k,nt){let lt=A.updateRanges;if(lt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,k,nt,x.data);else{lt.sort((R,$)=>R.start-$.start);let ft=0;for(let R=1;R<lt.length;R++){let $=lt[ft],Y=lt[R],ut=$.start+$.count,rt=Gt(Y.start,x.width,4),ct=Gt($.start,x.width,4);Y.start<=ut+1&&rt===ct&&Gt(Y.start+Y.count-1,x.width,4)===rt?$.count=Math.max($.count,Y.start+Y.count-$.start):(++ft,lt[ft]=Y)}lt.length=ft+1;let Z=e.getParameter(i.UNPACK_ROW_LENGTH),J=e.getParameter(i.UNPACK_SKIP_PIXELS),ht=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let R=0,$=lt.length;R<$;R++){let Y=lt[R],ut=Math.floor(Y.start/4),rt=Math.ceil(Y.count/4),ct=ut%x.width,Rt=Math.floor(ut/x.width),Bt=rt,st=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,ct),e.pixelStorei(i.UNPACK_SKIP_ROWS,Rt),e.texSubImage2D(i.TEXTURE_2D,0,ct,Rt,Bt,st,k,nt,x.data)}A.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,Z),e.pixelStorei(i.UNPACK_SKIP_PIXELS,J),e.pixelStorei(i.UNPACK_SKIP_ROWS,ht)}}function ue(A,x,k){let nt=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(nt=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(nt=i.TEXTURE_3D);let Q=Jt(A,x),lt=x.source;e.bindTexture(nt,A.__webglTexture,i.TEXTURE0+k);let ft=n.get(lt);if(lt.version!==ft.__version||Q===!0){if(e.activeTexture(i.TEXTURE0+k),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){let st=Wt.getPrimaries(Wt.workingColorSpace),Ct=x.colorSpace===Ln?null:Wt.getPrimaries(x.colorSpace),Ot=x.colorSpace===Ln||st===Ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ot)}e.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let J=M(x.image,!1,s.maxTextureSize);J=Pt(x,J);let ht=r.convert(x.format,x.colorSpace),R=r.convert(x.type),$=T(x.internalFormat,ht,R,x.normalized,x.colorSpace,x.isVideoTexture);Yt(nt,x);let Y,ut=x.mipmaps,rt=x.isVideoTexture!==!0,ct=ft.__version===void 0||Q===!0,Rt=lt.dataReady,Bt=b(x,J);if(x.isDepthTexture)$=g(x.format===Pn,x.type),ct&&(rt?e.texStorage2D(i.TEXTURE_2D,1,$,J.width,J.height):e.texImage2D(i.TEXTURE_2D,0,$,J.width,J.height,0,ht,R,null));else if(x.isDataTexture)if(ut.length>0){rt&&ct&&e.texStorage2D(i.TEXTURE_2D,Bt,$,ut[0].width,ut[0].height);for(let st=0,Ct=ut.length;st<Ct;st++)Y=ut[st],rt?Rt&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,Y.width,Y.height,ht,R,Y.data):e.texImage2D(i.TEXTURE_2D,st,$,Y.width,Y.height,0,ht,R,Y.data);x.generateMipmaps=!1}else rt?(ct&&e.texStorage2D(i.TEXTURE_2D,Bt,$,J.width,J.height),Rt&&be(x,J,ht,R)):e.texImage2D(i.TEXTURE_2D,0,$,J.width,J.height,0,ht,R,J.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){rt&&ct&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Bt,$,ut[0].width,ut[0].height,J.depth);for(let st=0,Ct=ut.length;st<Ct;st++)if(Y=ut[st],x.format!==ln)if(ht!==null)if(rt){if(Rt)if(x.layerUpdates.size>0){let Ot=cl(Y.width,Y.height,x.format,x.type);for(let _t of x.layerUpdates){let Kt=Y.data.subarray(_t*Ot/Y.data.BYTES_PER_ELEMENT,(_t+1)*Ot/Y.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,_t,Y.width,Y.height,1,ht,Kt)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,0,Y.width,Y.height,J.depth,ht,Y.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,st,$,Y.width,Y.height,J.depth,0,Y.data,0,0);else It("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else rt?Rt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,0,Y.width,Y.height,J.depth,ht,R,Y.data):e.texImage3D(i.TEXTURE_2D_ARRAY,st,$,Y.width,Y.height,J.depth,0,ht,R,Y.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{rt&&ct&&e.texStorage2D(i.TEXTURE_2D,Bt,$,ut[0].width,ut[0].height);for(let st=0,Ct=ut.length;st<Ct;st++)Y=ut[st],x.format!==ln?ht!==null?rt?Rt&&e.compressedTexSubImage2D(i.TEXTURE_2D,st,0,0,Y.width,Y.height,ht,Y.data):e.compressedTexImage2D(i.TEXTURE_2D,st,$,Y.width,Y.height,0,Y.data):It("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):rt?Rt&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,Y.width,Y.height,ht,R,Y.data):e.texImage2D(i.TEXTURE_2D,st,$,Y.width,Y.height,0,ht,R,Y.data)}else if(x.isDataArrayTexture)if(rt){if(ct&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Bt,$,J.width,J.height,J.depth),Rt)if(x.layerUpdates.size>0){let st=cl(J.width,J.height,x.format,x.type);for(let Ct of x.layerUpdates){let Ot=J.data.subarray(Ct*st/J.data.BYTES_PER_ELEMENT,(Ct+1)*st/J.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ct,J.width,J.height,1,ht,R,Ot)}x.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,ht,R,J.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,$,J.width,J.height,J.depth,0,ht,R,J.data);else if(x.isData3DTexture)rt?(ct&&e.texStorage3D(i.TEXTURE_3D,Bt,$,J.width,J.height,J.depth),Rt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,ht,R,J.data)):e.texImage3D(i.TEXTURE_3D,0,$,J.width,J.height,J.depth,0,ht,R,J.data);else if(x.isFramebufferTexture){if(ct)if(rt)e.texStorage2D(i.TEXTURE_2D,Bt,$,J.width,J.height);else{let st=J.width,Ct=J.height;for(let Ot=0;Ot<Bt;Ot++)e.texImage2D(i.TEXTURE_2D,Ot,$,st,Ct,0,ht,R,null),st>>=1,Ct>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){let st=i.canvas;if(st.hasAttribute("layoutsubtree")||st.setAttribute("layoutsubtree","true"),J.parentNode!==st){st.appendChild(J),m.add(x),st.onpaint=Ct=>{let Ot=Ct.changedElements;for(let _t of m)Ot.includes(_t.image)&&(_t.needsUpdate=!0)},st.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,J);else{let Ot=i.RGBA,_t=i.RGBA,Kt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ot,_t,Kt,J)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ut.length>0){if(rt&&ct){let st=Dt(ut[0]);e.texStorage2D(i.TEXTURE_2D,Bt,$,st.width,st.height)}for(let st=0,Ct=ut.length;st<Ct;st++)Y=ut[st],rt?Rt&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,ht,R,Y):e.texImage2D(i.TEXTURE_2D,st,$,ht,R,Y);x.generateMipmaps=!1}else if(rt){if(ct){let st=Dt(J);e.texStorage2D(i.TEXTURE_2D,Bt,$,st.width,st.height)}Rt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ht,R,J)}else e.texImage2D(i.TEXTURE_2D,0,$,ht,R,J);w(x)&&x.mipmapsAutoUpdate===!0&&S(nt),ft.__version=lt.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function Fe(A,x,k){if(x.image.length!==6)return;let nt=Jt(A,x),Q=x.source;e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+k);let lt=n.get(Q);if(Q.version!==lt.__version||nt===!0){e.activeTexture(i.TEXTURE0+k);let ft=Wt.getPrimaries(Wt.workingColorSpace),Z=x.colorSpace===Ln?null:Wt.getPrimaries(x.colorSpace),J=x.colorSpace===Ln||ft===Z?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);let ht=x.isCompressedTexture||x.image[0].isCompressedTexture,R=x.image[0]&&x.image[0].isDataTexture,$=[];for(let _t=0;_t<6;_t++)!ht&&!R?$[_t]=M(x.image[_t],!0,s.maxCubemapSize):$[_t]=R?x.image[_t].image:x.image[_t],$[_t]=Pt(x,$[_t]);let Y=$[0],ut=r.convert(x.format,x.colorSpace),rt=r.convert(x.type),ct=T(x.internalFormat,ut,rt,x.normalized,x.colorSpace),Rt=x.isVideoTexture!==!0,Bt=lt.__version===void 0||nt===!0,st=Q.dataReady,Ct=b(x,Y);Yt(i.TEXTURE_CUBE_MAP,x);let Ot;if(x.isDepthTexture){if(ct=g(x.format===Pn,x.type),Bt)if(Rt)e.texStorage2D(i.TEXTURE_CUBE_MAP,1,ct,Y.width,Y.height);else for(let _t=0;_t<6;_t++)e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,ct,Y.width,Y.height,0,ut,rt,null)}else if(ht){Rt&&Bt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Ct,ct,Y.width,Y.height);for(let _t=0;_t<6;_t++){Ot=$[_t].mipmaps;for(let Kt=0;Kt<Ot.length;Kt++){let _e=Ot[Kt];x.format!==ln?ut!==null?Rt?st&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Kt,0,0,_e.width,_e.height,ut,_e.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Kt,ct,_e.width,_e.height,0,_e.data):It("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Rt?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Kt,0,0,_e.width,_e.height,ut,rt,_e.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Kt,ct,_e.width,_e.height,0,ut,rt,_e.data)}}}else{if(Ot=x.mipmaps,Rt&&Bt){Ot.length>0&&Ct++;let _t=Dt($[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Ct,ct,_t.width,_t.height)}for(let _t=0;_t<6;_t++)if(R){Rt?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,0,0,$[_t].width,$[_t].height,ut,rt,$[_t].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,ct,$[_t].width,$[_t].height,0,ut,rt,$[_t].data);for(let Kt=0;Kt<Ot.length;Kt++){let Nn=Ot[Kt].image[_t].image;Rt?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Kt+1,0,0,Nn.width,Nn.height,ut,rt,Nn.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Kt+1,ct,Nn.width,Nn.height,0,ut,rt,Nn.data)}}else{Rt?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,0,0,ut,rt,$[_t]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,ct,ut,rt,$[_t]);for(let Kt=0;Kt<Ot.length;Kt++){let _e=Ot[Kt];Rt?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Kt+1,0,0,ut,rt,_e.image[_t]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Kt+1,ct,ut,rt,_e.image[_t])}}}w(x)&&x.mipmapsAutoUpdate===!0&&S(i.TEXTURE_CUBE_MAP),lt.__version=Q.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function oe(A,x,k,nt,Q,lt){let ft=r.convert(k.format,k.colorSpace),Z=r.convert(k.type),J=T(k.internalFormat,ft,Z,k.normalized,k.colorSpace),ht=n.get(x),R=n.get(k);if(R.__renderTarget=x,!ht.__hasExternalTextures){let $=Math.max(1,x.width>>lt),Y=Math.max(1,x.height>>lt);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,lt,J,$,Y,x.depth,0,ft,Z,null):e.texImage2D(Q,lt,J,$,Y,0,ft,Z,null)}e.bindFramebuffer(i.FRAMEBUFFER,A),mt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,nt,Q,R.__webglTexture,0,se(x)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,nt,Q,R.__webglTexture,lt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function cn(A,x,k){if(i.bindRenderbuffer(i.RENDERBUFFER,A),x.depthBuffer){let nt=x.depthTexture,Q=nt&&nt.isDepthTexture?nt.type:null,lt=g(x.stencilBuffer,Q),ft=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;mt(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,se(x),lt,x.width,x.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,se(x),lt,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,lt,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ft,i.RENDERBUFFER,A)}else{let nt=x.textures;for(let Q=0;Q<nt.length;Q++){let lt=nt[Q],ft=r.convert(lt.format,lt.colorSpace),Z=r.convert(lt.type),J=T(lt.internalFormat,ft,Z,lt.normalized,lt.colorSpace);mt(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,se(x),J,x.width,x.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,se(x),J,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,J,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ge(A,x,k){let nt=x.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,A),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Q=n.get(x.depthTexture);Q.__renderTarget=x;let lt=nt?x.depthTexture.image[0]:x.depthTexture.image;(!Q.__webglTexture||lt.width!==x.width||lt.height!==x.height)&&(lt.width=x.width,lt.height=x.height,x.depthTexture.needsUpdate=!0),nt?et(x.depthTexture,0):it(x.depthTexture,0);let ft=Q.__webglTexture,Z=se(x),J=nt?i.TEXTURE_CUBE_MAP_POSITIVE_X+k:i.TEXTURE_2D,ht=x.depthTexture.format===Pn?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===wn)mt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ht,J,ft,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,ht,J,ft,0);else if(x.depthTexture.format===Pn)mt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ht,J,ft,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,ht,J,ft,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function We(A){let x=n.get(A),k=A.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==A.depthTexture){let nt=A.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),nt){let Q=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,nt.removeEventListener("dispose",Q)};nt.addEventListener("dispose",Q),x.__depthDisposeCallback=Q}x.__boundDepthTexture=nt}if(A.depthTexture&&!x.__autoAllocateDepthBuffer)if(k)for(let nt=0;nt<6;nt++)ge(x.__webglFramebuffer[nt],A,nt);else A.texture.mipmaps.length>0?ge(x.__webglFramebuffer[0],A,0):ge(x.__webglFramebuffer,A,0);else if(k){x.__webglDepthbuffer=[];for(let nt=0;nt<6;nt++)if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[nt]),x.__webglDepthbuffer[nt]===void 0)x.__webglDepthbuffer[nt]=i.createRenderbuffer(),cn(x.__webglDepthbuffer[nt],A,!1);else{let Q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=x.__webglDepthbuffer[nt];i.bindRenderbuffer(i.RENDERBUFFER,lt),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,lt)}}else if(A.texture.mipmaps.length>0?e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),cn(x.__webglDepthbuffer,A,!1);else{let Q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,lt),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,lt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Xe(A,x,k){let nt=n.get(A);x!==void 0&&oe(nt.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&We(A)}function qe(A){let x=A.texture,k=n.get(A),nt=n.get(x);A.addEventListener("dispose",O),D(A);let Q=A.textures,lt=A.isWebGLCubeRenderTarget===!0,ft=Q.length>1;if(ft||(nt.__webglTexture===void 0&&(nt.__webglTexture=i.createTexture()),nt.__version=x.version,a.memory.textures++),lt){k.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(x.mipmaps.length>0){k.__webglFramebuffer[Z]=[];for(let J=0;J<x.mipmaps.length;J++)k.__webglFramebuffer[Z][J]=i.createFramebuffer()}else k.__webglFramebuffer[Z]=i.createFramebuffer()}else{if(x.mipmaps.length>0){k.__webglFramebuffer=[];for(let Z=0;Z<x.mipmaps.length;Z++)k.__webglFramebuffer[Z]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(ft)for(let Z=0,J=Q.length;Z<J;Z++){let ht=n.get(Q[Z]);ht.__webglTexture===void 0&&(ht.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&mt(A)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let Z=0;Z<Q.length;Z++){let J=Q[Z];k.__webglColorRenderbuffer[Z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[Z]);let ht=r.convert(J.format,J.colorSpace),R=r.convert(J.type),$=T(J.internalFormat,ht,R,J.normalized,J.colorSpace,A.isXRRenderTarget===!0),Y=se(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Y,$,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,k.__webglColorRenderbuffer[Z])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),cn(k.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(lt){e.bindTexture(i.TEXTURE_CUBE_MAP,nt.__webglTexture),Yt(i.TEXTURE_CUBE_MAP,x);for(let Z=0;Z<6;Z++)if(x.mipmaps.length>0)for(let J=0;J<x.mipmaps.length;J++)oe(k.__webglFramebuffer[Z][J],A,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,J);else oe(k.__webglFramebuffer[Z],A,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);w(x)?S(i.TEXTURE_CUBE_MAP):x.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,x.mipmaps.length-1),e.unbindTexture()}else if(ft){for(let Z=0,J=Q.length;Z<J;Z++){let ht=Q[Z],R=n.get(ht),$=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&($=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture($,R.__webglTexture),Yt($,ht),oe(k.__webglFramebuffer,A,ht,i.COLOR_ATTACHMENT0+Z,$,0),w(ht)&&S($)}e.unbindTexture()}else{let Z=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Z=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Z,nt.__webglTexture),Yt(Z,x),x.mipmaps.length>0)for(let J=0;J<x.mipmaps.length;J++)oe(k.__webglFramebuffer[J],A,x,i.COLOR_ATTACHMENT0,Z,J);else oe(k.__webglFramebuffer,A,x,i.COLOR_ATTACHMENT0,Z,0);w(x)?S(Z):x.mipmaps.length>0&&i.texParameteri(Z,i.TEXTURE_MAX_LEVEL,x.mipmaps.length-1),e.unbindTexture()}A.depthBuffer&&We(A)}function N(A){let x=A.textures;for(let k=0,nt=x.length;k<nt;k++){let Q=x[k];if(w(Q)&&Q.mipmapsAutoUpdate===!0){let lt=E(A),ft=n.get(Q).__webglTexture;e.bindTexture(lt,ft),S(lt),e.unbindTexture()}}}let Ye=[];function ie(A){if(A.samples>0){if(mt(A)===!1){let x=A.textures,k=A.width,nt=A.height,Q=i.COLOR_BUFFER_BIT,lt=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ft=n.get(A),Z=x.length>1;if(Z)for(let ht=0;ht<x.length;ht++)e.bindFramebuffer(i.FRAMEBUFFER,ft.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ft.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ft.__webglMultisampledFramebuffer),A.texture.mipmaps.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ft.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ft.__webglFramebuffer);for(let ht=0;ht<x.length;ht++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),Z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ft.__webglColorRenderbuffer[ht]);let R=n.get(x[ht]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,R,0)}i.blitFramebuffer(0,0,k,nt,0,0,k,nt,Q,i.NEAREST),l===!0&&(Ye.length=0,Ye.push(i.COLOR_ATTACHMENT0+ht),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&Ye.push(lt),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ye))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Z)for(let ht=0;ht<x.length;ht++){e.bindFramebuffer(i.FRAMEBUFFER,ft.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,ft.__webglColorRenderbuffer[ht]);let R=n.get(x[ht]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ft.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.TEXTURE_2D,R,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ft.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&l){let x=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function se(A){return Math.min(s.maxSamples,A.samples)}function mt(A){let x=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function de(A){let x=a.render.frame;u.get(A)!==x&&(u.set(A,x),A.update())}function Pt(A,x){let k=A.colorSpace,nt=A.format,Q=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||k!==ns&&k!==Ln&&(Wt.getTransfer(k)===$t?(nt!==ln||Q!==Be)&&It("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Lt("WebGLTextures: Unsupported texture color space:",k)),x}function Dt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=at,this.resetTextureUnits=K,this.getTextureUnits=tt,this.setTextureUnits=yt,this.setTexture2D=it,this.setTexture2DArray=ot,this.setTexture3D=gt,this.setTextureCube=et,this.rebindTextures=Xe,this.setupRenderTarget=qe,this.updateRenderTargetMipmap=N,this.updateMultisampleRenderTarget=ie,this.setupDepthRenderbuffer=We,this.setupFrameBufferTexture=oe,this.useMultisampledRTT=mt,this.dispose=q}function Cg(i,t){function e(n,s=Ln){let r,a=Wt.getTransfer(s);if(n===Be)return i.UNSIGNED_BYTE;if(n===sa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ra)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Xo)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===qo)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ho)return i.BYTE;if(n===Wo)return i.SHORT;if(n===zi)return i.UNSIGNED_SHORT;if(n===ia)return i.INT;if(n===rn)return i.UNSIGNED_INT;if(n===an)return i.FLOAT;if(n===on)return i.HALF_FLOAT;if(n===Yo)return i.ALPHA;if(n===Zo)return i.RGB;if(n===ln)return i.RGBA;if(n===wn)return i.DEPTH_COMPONENT;if(n===Pn)return i.DEPTH_STENCIL;if(n===Jo)return i.RED;if(n===aa)return i.RED_INTEGER;if(n===Jn)return i.RG;if(n===oa)return i.RG_INTEGER;if(n===la)return i.RGBA_INTEGER;if(n===Cs||n===Is||n===Ps||n===Ls)if(a===$t)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Cs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Is)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ps)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ls)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Cs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Is)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ps)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ls)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ca||n===ha||n===ua||n===da)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ca)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ha)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ua)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===da)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===fa||n===pa||n===ma||n===ga||n===_a||n===Ns||n===xa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===fa||n===pa)return a===$t?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ma)return a===$t?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ga)return r.COMPRESSED_R11_EAC;if(n===_a)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Ns)return r.COMPRESSED_RG11_EAC;if(n===xa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===va||n===ya||n===Ma||n===Sa||n===ba||n===Ta||n===Aa||n===wa||n===Ea||n===Ra||n===Ca||n===Ia||n===Pa||n===La)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===va)return a===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ya)return a===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ma)return a===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Sa)return a===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ba)return a===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ta)return a===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Aa)return a===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===wa)return a===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ea)return a===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ra)return a===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ca)return a===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ia)return a===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Pa)return a===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===La)return a===$t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Na||n===Da||n===Ua)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Na)return a===$t?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Da)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ua)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Fa||n===Oa||n===Ds||n===Ba)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Fa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Oa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ds)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ba)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===li?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var Ig=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Pg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,bl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new ms(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Oe({vertexShader:Ig,fragmentShader:Pg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ae(new si(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Tl=class extends fn{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,m=null,f=null,d=null,_=null,y=typeof XRWebGLBinding<"u",h=new bl,p={},M=e.getContextAttributes(),w=null,S=null,E=[],T=[],g=new wt,b=null,D=null,I=new Ne;I.viewport=new re;let U=new Ne;U.viewport=new re;let O=[I,U],X=new Qr,C=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let it=E[V];return it===void 0&&(it=new Ci,E[V]=it),it.getTargetRaySpace()},this.getControllerGrip=function(V){let it=E[V];return it===void 0&&(it=new Ci,E[V]=it),it.getGripSpace()},this.getHand=function(V){let it=E[V];return it===void 0&&(it=new Ci,E[V]=it),it.getHandSpace()};function F(V){let it=T.indexOf(V.inputSource);if(it===-1)return;let ot=E[it];ot!==void 0&&(ot.update(V.inputSource,V.frame,c||a),ot.dispatchEvent({type:V.type,data:V.inputSource}))}function B(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",j);for(let V=0;V<E.length;V++){let it=T[V];it!==null&&(T[V]=null,E[V].disconnect(it))}C=null,q=null,h.reset();for(let V in p)delete p[V];if(t.setRenderTarget(w),d=null,f=null,m=null,s=null,S=null,at.stop(),n.isPresenting=!1,t.setPixelRatio(b),t.setSize(g.width,g.height,!1),D!==null){let V=D.camera;V.fov=D.fov,V.zoom=D.zoom,V.updateProjectionMatrix(),D=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,n.isPresenting===!0&&It("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){o=V,n.isPresenting===!0&&It("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(V){c=V},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return m===null&&y&&(m=new XRWebGLBinding(s,e)),m},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(V){if(s=V,s!==null){if(w=t.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",B),s.addEventListener("inputsourceschange",j),M.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(g),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let ot=null,gt=null,et=null;M.depth&&(et=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ot=M.stencil?Pn:wn,gt=M.stencil?li:rn);let Mt={colorFormat:e.RGBA8,depthFormat:et,scaleFactor:r};m=this.getBinding(),f=m.createProjectionLayer(Mt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),S=new Ge(f.textureWidth,f.textureHeight,{format:ln,type:Be,depthTexture:new Rn(f.textureWidth,f.textureHeight,gt,void 0,void 0,void 0,void 0,void 0,void 0,ot),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let ot={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,ot),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),S=new Ge(d.framebufferWidth,d.framebufferHeight,{format:ln,type:Be,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),at.setContext(s),at.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function j(V){for(let it=0;it<V.removed.length;it++){let ot=V.removed[it],gt=T.indexOf(ot);gt>=0&&(T[gt]=null,E[gt].disconnect(ot))}for(let it=0;it<V.added.length;it++){let ot=V.added[it],gt=T.indexOf(ot);if(gt===-1){for(let Mt=0;Mt<E.length;Mt++)if(Mt>=T.length){T.push(ot),gt=Mt;break}else if(T[Mt]===null){T[Mt]=ot,gt=Mt;break}if(gt===-1)break}let et=E[gt];et&&et.connect(ot)}}function W(V,it){it===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(it.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(s===null)return;let it=V.near,ot=V.far;h.texture!==null&&(h.depthNear>0&&(it=h.depthNear),h.depthFar>0&&(ot=h.depthFar)),X.near=U.near=I.near=it,X.far=U.far=I.far=ot,(C!==X.near||q!==X.far)&&(s.updateRenderState({depthNear:X.near,depthFar:X.far}),C=X.near,q=X.far),X.layers.mask=V.layers.mask|6,I.layers.mask=X.layers.mask&-5,U.layers.mask=X.layers.mask&-3;let gt=V.parent,et=X.cameras;W(X,gt);for(let Mt=0;Mt<et.length;Mt++)W(et[Mt],gt);X.projectionMatrix.copy(I.projectionMatrix),X.projectionMatrixInverse.copy(I.projectionMatrixInverse),D===null&&V.isPerspectiveCamera&&(D={camera:V,fov:V.fov,zoom:V.zoom}),K(V,X,gt)};function K(V,it,ot){ot===null?V.matrix.copy(it.matrixWorld):(V.matrix.copy(ot.matrixWorld),V.matrix.invert(),V.matrix.multiply(it.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(it.projectionMatrix),V.projectionMatrixInverse.copy(it.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=Ei*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return X},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(V){l=V,f!==null&&(f.fixedFoveation=V),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=V)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(X)},this.getCameraTexture=function(V){return p[V]};let tt=null;function yt(V,it){if(u=it.getViewerPose(c||a),_=it,u!==null){let ot=u.views;d!==null&&(t.setRenderTargetFramebuffer(S,d.framebuffer),t.setRenderTarget(S));let gt=!1;ot.length!==X.cameras.length&&(X.cameras.length=0,gt=!0);for(let bt=0;bt<ot.length;bt++){let Yt=ot[bt],Jt=null;if(d!==null)Jt=d.getViewport(Yt);else{let be=m.getViewSubImage(f,Yt);Jt=be.viewport,bt===0&&(t.setRenderTargetTextures(S,be.colorTexture,be.depthStencilTexture),t.setRenderTarget(S))}let Gt=O[bt];Gt===void 0&&(Gt=new Ne,Gt.layers.enable(bt),Gt.viewport=new re,O[bt]=Gt),Gt.matrix.fromArray(Yt.transform.matrix),Gt.matrix.decompose(Gt.position,Gt.quaternion,Gt.scale),Gt.projectionMatrix.fromArray(Yt.projectionMatrix),Gt.projectionMatrixInverse.copy(Gt.projectionMatrix).invert(),Gt.viewport.set(Jt.x,Jt.y,Jt.width,Jt.height),bt===0&&(X.matrix.copy(Gt.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale)),gt===!0&&X.cameras.push(Gt)}let et=s.enabledFeatures;if(et&&et.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){m=n.getBinding();let bt=m.getDepthInformation(ot[0]);bt&&bt.isValid&&bt.texture&&h.init(bt,s.renderState)}if(et&&et.includes("camera-access")&&y){t.state.unbindTexture(),m=n.getBinding();for(let bt=0;bt<ot.length;bt++){let Yt=ot[bt].camera;if(Yt){let Jt=p[Yt];Jt||(Jt=new ms,p[Yt]=Jt);let Gt=m.getCameraImage(Yt);Jt.sourceTexture=Gt}}}}for(let ot=0;ot<E.length;ot++){let gt=T[ot],et=E[ot];gt!==null&&et!==void 0&&et.update(gt,it,c||a)}tt&&tt(V,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),_=null}let at=new Eh;at.setAnimationLoop(yt),this.setAnimationLoop=function(V){tt=V},this.dispose=function(){}}},Lg=new te,Oh=new Nt;Oh.set(-1,0,0,0,1,0,0,0,1);function Ng(i,t){function e(h,p){h.matrixAutoUpdate===!0&&h.updateMatrix(),p.value.copy(h.matrix)}function n(h,p){p.color.getRGB(h.fogColor.value,al(i)),p.isFog?(h.fogNear.value=p.near,h.fogFar.value=p.far):p.isFogExp2&&(h.fogDensity.value=p.density)}function s(h,p,M,w,S){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(h,p):p.isMeshLambertMaterial?(r(h,p),p.envMap&&(h.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(h,p),m(h,p)):p.isMeshPhongMaterial?(r(h,p),u(h,p),p.envMap&&(h.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(h,p),f(h,p),p.isMeshPhysicalMaterial&&d(h,p,S)):p.isMeshMatcapMaterial?(r(h,p),_(h,p)):p.isMeshDepthMaterial?r(h,p):p.isMeshDistanceMaterial?(r(h,p),y(h,p)):p.isMeshNormalMaterial?r(h,p):p.isLineBasicMaterial?(a(h,p),p.isLineDashedMaterial&&o(h,p)):p.isPointsMaterial?l(h,p,M,w):p.isSpriteMaterial?c(h,p):p.isShadowMaterial?(h.color.value.copy(p.color),h.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(h,p){h.opacity.value=p.opacity,p.color&&h.diffuse.value.copy(p.color),p.emissive&&h.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(h.map.value=p.map,e(p.map,h.mapTransform)),p.alphaMap&&(h.alphaMap.value=p.alphaMap,e(p.alphaMap,h.alphaMapTransform)),p.bumpMap&&(h.bumpMap.value=p.bumpMap,e(p.bumpMap,h.bumpMapTransform),h.bumpScale.value=p.bumpScale,p.side===fe&&(h.bumpScale.value*=-1)),p.normalMap&&(h.normalMap.value=p.normalMap,e(p.normalMap,h.normalMapTransform),h.normalScale.value.copy(p.normalScale),p.side===fe&&h.normalScale.value.negate()),p.displacementMap&&(h.displacementMap.value=p.displacementMap,e(p.displacementMap,h.displacementMapTransform),h.displacementScale.value=p.displacementScale,h.displacementBias.value=p.displacementBias),p.emissiveMap&&(h.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,h.emissiveMapTransform)),p.specularMap&&(h.specularMap.value=p.specularMap,e(p.specularMap,h.specularMapTransform)),p.alphaTest>0&&(h.alphaTest.value=p.alphaTest);let M=t.get(p),w=M.envMap,S=M.envMapRotation;w&&(h.envMap.value=w,h.envMapRotation.value.setFromMatrix4(Lg.makeRotationFromEuler(S)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&h.envMapRotation.value.premultiply(Oh),h.reflectivity.value=p.reflectivity,h.ior.value=p.ior,h.refractionRatio.value=p.refractionRatio),p.lightMap&&(h.lightMap.value=p.lightMap,h.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,h.lightMapTransform)),p.aoMap&&(h.aoMap.value=p.aoMap,h.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,h.aoMapTransform))}function a(h,p){h.diffuse.value.copy(p.color),h.opacity.value=p.opacity,p.map&&(h.map.value=p.map,e(p.map,h.mapTransform))}function o(h,p){h.dashSize.value=p.dashSize,h.totalSize.value=p.dashSize+p.gapSize,h.scale.value=p.scale}function l(h,p,M,w){h.diffuse.value.copy(p.color),h.opacity.value=p.opacity,h.size.value=p.size*M,h.scale.value=w*.5,p.map&&(h.map.value=p.map,e(p.map,h.uvTransform)),p.alphaMap&&(h.alphaMap.value=p.alphaMap,e(p.alphaMap,h.alphaMapTransform)),p.alphaTest>0&&(h.alphaTest.value=p.alphaTest)}function c(h,p){h.diffuse.value.copy(p.color),h.opacity.value=p.opacity,h.rotation.value=p.rotation,p.map&&(h.map.value=p.map,e(p.map,h.mapTransform)),p.alphaMap&&(h.alphaMap.value=p.alphaMap,e(p.alphaMap,h.alphaMapTransform)),p.alphaTest>0&&(h.alphaTest.value=p.alphaTest)}function u(h,p){h.specular.value.copy(p.specular),h.shininess.value=Math.max(p.shininess,1e-4)}function m(h,p){p.gradientMap&&(h.gradientMap.value=p.gradientMap)}function f(h,p){h.metalness.value=p.metalness,p.metalnessMap&&(h.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,h.metalnessMapTransform)),h.roughness.value=p.roughness,p.roughnessMap&&(h.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,h.roughnessMapTransform)),p.envMap&&(h.envMapIntensity.value=p.envMapIntensity)}function d(h,p,M){h.ior.value=p.ior,p.diffuseRoughness>0&&(h.diffuseRoughness.value=p.diffuseRoughness,p.diffuseRoughnessMap&&(h.diffuseRoughnessMap.value=p.diffuseRoughnessMap,e(p.diffuseRoughnessMap,h.diffuseRoughnessMapTransform))),p.sheen>0&&(h.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),h.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(h.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,h.sheenColorMapTransform)),p.sheenRoughnessMap&&(h.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,h.sheenRoughnessMapTransform))),p.clearcoat>0&&(h.clearcoat.value=p.clearcoat,h.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(h.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,h.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(h.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,h.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(h.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,h.clearcoatNormalMapTransform),h.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===fe&&h.clearcoatNormalScale.value.negate())),p.dispersion>0&&(h.dispersion.value=p.dispersion),p.retroreflectivity>0&&(h.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(h.iridescence.value=p.iridescence,h.iridescenceIOR.value=p.iridescenceIOR,h.iridescenceThicknessMinimum.value=p.iridescenceThicknessMinimum,h.iridescenceThicknessMaximum.value=p.iridescenceThicknessMaximum,p.iridescenceMap&&(h.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,h.iridescenceMapTransform)),p.iridescenceThicknessMap&&(h.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,h.iridescenceThicknessMapTransform))),p.transmission>0&&(h.transmission.value=p.transmission,h.transmissionSamplerMap.value=M.texture,h.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(h.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,h.transmissionMapTransform)),h.thickness.value=p.thickness,p.thicknessMap&&(h.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,h.thicknessMapTransform)),h.attenuationDistance.value=p.attenuationDistance,h.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(h.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(h.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,h.anisotropyMapTransform))),h.specularIntensity.value=p.specularIntensity,h.specularColor.value.copy(p.specularColor),p.specularColorMap&&(h.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,h.specularColorMapTransform)),p.specularIntensityMap&&(h.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,h.specularIntensityMapTransform))}function _(h,p){p.matcap&&(h.matcap.value=p.matcap)}function y(h,p){let M=t.get(p).light;h.referencePosition.value.setFromMatrixPosition(M.matrixWorld),h.nearDistance.value=M.shadow.camera.near,h.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Dg(i,t,e,n){let s={},r={};function a(M,w){let S=w.program;n.uniformBlockBinding(M,S,s[M.id])}function o(M,w){let S=s[M.id];S===void 0&&(_(M),S=l(M),s[M.id]=S,M.addEventListener("dispose",h));let E=w.program;n.updateUBOMapping(M,E);let T=t.render.frame;r[M.id]!==T&&(c(M),r[M.id]=T)}function l(M){let w=i.createBuffer(),S=M.__size,E=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,S,E),i.bindBuffer(i.UNIFORM_BUFFER,null),w}function c(M){let w=s[M.id],S=M.uniforms,E=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let T=0,g=S.length;T<g;T++){let b=S[T];if(Array.isArray(b))for(let D=0,I=b.length;D<I;D++)u(b[D],T,D,E);else u(b,T,0,E)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function u(M,w,S,E){if(f(M,w,S,E)===!0){let T=M.__offset,g=M.value;if(Array.isArray(g)){let b=0;for(let D=0;D<g.length;D++){let I=g[D],U=y(I,!0);m(I,M.__data,b),b+=U.storage/Float32Array.BYTES_PER_ELEMENT}}else m(g,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,T,M.__data)}}function m(M,w,S){typeof M=="number"||typeof M=="boolean"?w[S]=M:M.isMatrix3?(w[S]=M.elements[0],w[S+1]=M.elements[1],w[S+2]=M.elements[2],w[S+3]=0,w[S+4]=M.elements[3],w[S+5]=M.elements[4],w[S+6]=M.elements[5],w[S+7]=0,w[S+8]=M.elements[6],w[S+9]=M.elements[7],w[S+10]=M.elements[8],w[S+11]=0):ArrayBuffer.isView(M)?w.set(M.subarray(0,w.length-S),S):M.toArray(w,S)}function f(M,w,S,E){let T=M.value,g=w+"_"+S;if(Array.isArray(T)){E[g]===void 0&&(E[g]=[]);let b=E[g],D=!1;for(let I=0;I<T.length;I++)d(T[I],b,I)===!0&&(D=!0);return D}return d(T,E,g)}function d(M,w,S){if(w[S]===void 0)return typeof M=="number"||typeof M=="boolean"?w[S]=M:ArrayBuffer.isView(M)?w[S]=M.slice():w[S]=M.clone(),!0;{let E=w[S];if(typeof M=="number"||typeof M=="boolean"){if(E!==M)return w[S]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(E.equals(M)===!1)return E.copy(M),!0}}return!1}function _(M){let w=M.uniforms,S=0,E=16;for(let g=0,b=w.length;g<b;g++){let D=Array.isArray(w[g])?w[g]:[w[g]];for(let I=0,U=D.length;I<U;I++){let O=D[I],X=Array.isArray(O.value)?O.value:[O.value],C=Array.isArray(w[g])||Array.isArray(O.value),q=S;for(let B=0,j=X.length;B<j;B++){let W=X[B],K=y(W,C),tt=S%E,yt=tt%K.boundary,at=tt+yt;S+=yt,at!==0&&E-at<K.storage&&(S+=E-at),B===0&&(q=S),S+=K.storage}let F=O.type==="int"?Int32Array:O.type==="uint"?Uint32Array:Float32Array;O.__data=new F((S-q)/Float32Array.BYTES_PER_ELEMENT),O.__offset=q}}let T=S%E;return T>0&&(S+=E-T),M.__size=S,M.__cache={},this}function y(M,w){let S={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(S.boundary=4,S.storage=4):M.isVector2?(S.boundary=8,S.storage=8):M.isVector3||M.isColor?(S.boundary=16,S.storage=12):M.isVector4?(S.boundary=16,S.storage=16):M.isMatrix3?(S.boundary=16,S.storage=48):M.isMatrix4?(S.boundary=16,S.storage=64):M.isTexture?It("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(S.boundary=16,S.storage=M.byteLength):It("WebGLRenderer: Unsupported uniform value type.",M),w===!0&&(S.boundary=16,S.storage=Math.ceil(S.storage/16)*16),S}function h(M){let w=M.target;w.removeEventListener("dispose",h),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function p(){for(let M in s)i.deleteBuffer(s[M]);s={},r={}}return{bind:a,update:o,dispose:p}}var Ug=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),_n=null;function Fg(){return _n===null&&(_n=new Er(Ug,16,16,Jn,on),_n.name="DFG_LUT",_n.minFilter=De,_n.magFilter=De,_n.wrapS=un,_n.wrapT=un,_n.generateMipmaps=!1,_n.needsUpdate=!0),_n}var Ha=class{constructor(t={}){let{canvas:e=$c(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:m=!1,reversedDepthBuffer:f=!1,outputBufferType:d=Be}=t;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=a;let y=d,h=new Set([la,oa,aa]),p=new Set([Be,rn,zi,li,sa,ra]),M=new Uint32Array(4),w=new Int32Array(4),S={textures:[],min:[],max:[],resolution:[]},E=null,T=null,g=[],b=[],D=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=gn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,U=!1,O=null,X=null,C=null,q=null;this._outputColorSpace=Ie;let F=0,B=0,j=null,W=-1,K=null,tt=new re,yt=new re,at=null,V=new Ft(0),it=0,ot=e.width,gt=e.height,et=1,Mt=null,qt=null,bt=new re(0,0,ot,gt),Yt=new re(0,0,ot,gt),Jt=!1,Gt=new Hn,be=new Rr,ue=!1,Fe=!1,oe=new te,cn=new L,ge=new re,We={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Xe=!1;function qe(){return j===null?et:1}let N=n;function Ye(v,P){return e.getContext(v,P)}let ie,se,mt,de,Pt,Dt,A,x,k,nt,Q,lt,ft,Z,J,ht,R,$,Y,ut,rt,ct,Rt;try{let v={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:m};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",Ct,!1),e.addEventListener("webglcontextrestored",Ot,!1),e.addEventListener("webglcontextcreationerror",_t,!1),N===null){let P="webgl2";if(N=Ye(P,v),N===null)throw Ye(P)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Bt()}catch(v){throw e.removeEventListener("webglcontextlost",Ct,!1),e.removeEventListener("webglcontextrestored",Ot,!1),e.removeEventListener("webglcontextcreationerror",_t,!1),Lt("WebGLRenderer: "+v.message),v}function Bt(){ie=new Yp(N),ie.init(),rt=new Cg(N,ie),se=new Fp(N,ie,t,rt),mt=new Eg(N,ie),se.reversedDepthBuffer&&f&&mt.buffers.depth.setReversed(!0),X=N.createFramebuffer(),C=N.createFramebuffer(),q=N.createFramebuffer(),de=new $p(N),Pt=new fg,Dt=new Rg(N,ie,mt,Pt,se,rt,de),A=new qp(I),x=new Ku(N),ct=new Dp(N,x),k=new Zp(N,x,de,ct),nt=new Qp(N,k,x,ct,de),$=new Kp(N,se,Dt),J=new Op(Pt),Q=new dg(I,A,ie,se,ct,J),lt=new Ng(I,Pt),ft=new mg,Z=new Mg(ie),R=new Np(I,A,mt,nt,_,l),ht=new wg(I,nt,se),Rt=new Dg(N,de,se,mt),Y=new Up(N,ie,de),ut=new Jp(N,ie,de),de.programs=Q.programs,I.capabilities=se,I.extensions=ie,I.properties=Pt,I.renderLists=ft,I.shadowMap=ht,I.state=mt,I.info=de}y!==Be&&(D=new tm(y,e.width,e.height,o,s,r));let st=new Tl(I,N);this.xr=st,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let v=ie.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){let v=ie.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return et},this.setPixelRatio=function(v){v!==void 0&&(et=v,this.setSize(ot,gt,!1))},this.getSize=function(v){return v.set(ot,gt)},this.setSize=function(v,P,H=!0){if(st.isPresenting){It("WebGLRenderer: Can't change size while VR device is presenting.");return}ot=v,gt=P,e.width=Math.floor(v*et),e.height=Math.floor(P*et),H===!0&&(e.style.width=v+"px",e.style.height=P+"px"),D!==null&&D.setSize(e.width,e.height),this.setViewport(0,0,v,P)},this.getDrawingBufferSize=function(v){return v.set(ot*et,gt*et).floor()},this.setDrawingBufferSize=function(v,P,H){ot=v,gt=P,et=H,e.width=Math.floor(v*H),e.height=Math.floor(P*H),this.setViewport(0,0,v,P)},this.setEffects=function(v){if(y===Be){Lt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let P=0;P<v.length;P++)if(v[P].isOutputPass===!0){It("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}D.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(tt)},this.getViewport=function(v){return v.copy(bt)},this.setViewport=function(v,P,H,z){v.isVector4?bt.set(v.x,v.y,v.z,v.w):bt.set(v,P,H,z),mt.viewport(tt.copy(bt).multiplyScalar(qe()).round())},this.getScissor=function(v){return v.copy(Yt)},this.setScissor=function(v,P,H,z){v.isVector4?Yt.set(v.x,v.y,v.z,v.w):Yt.set(v,P,H,z),mt.scissor(yt.copy(Yt).multiplyScalar(qe()).round())},this.getScissorTest=function(){return Jt},this.setScissorTest=function(v){mt.setScissorTest(Jt=v)},this.setOpaqueSort=function(v){Mt=v},this.setTransparentSort=function(v){qt=v},this.getClearColor=function(v){return v.copy(R.getClearColor())},this.setClearColor=function(){R.setClearColor(...arguments)},this.getClearAlpha=function(){return R.getClearAlpha()},this.setClearAlpha=function(){R.setClearAlpha(...arguments)},this.clear=function(v=!0,P=!0,H=!0){let z=0;if(v){let G=!1;if(j!==null){let pt=j.texture.format;G=h.has(pt)}if(G){let pt=j.texture.type,St=p.has(pt),dt=R.getClearColor(),vt=R.getClearAlpha(),Et=dt.r,Ut=dt.g,Vt=dt.b;St?(M[0]=Et,M[1]=Ut,M[2]=Vt,M[3]=vt,N.clearBufferuiv(N.COLOR,0,M)):(w[0]=Et,w[1]=Ut,w[2]=Vt,w[3]=vt,N.clearBufferiv(N.COLOR,0,w))}else z|=N.COLOR_BUFFER_BIT}P&&(z|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),H&&(z|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&N.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),O=v},this.dispose=function(){e.removeEventListener("webglcontextlost",Ct,!1),e.removeEventListener("webglcontextrestored",Ot,!1),e.removeEventListener("webglcontextcreationerror",_t,!1),R.dispose(),ft.dispose(),Z.dispose(),Dt.dispose(),Pt.dispose(),A.dispose(),nt.dispose(),k.dispose(),ct.dispose(),Rt.dispose(),Q.dispose(),st.dispose(),st.removeEventListener("sessionstart",Il),st.removeEventListener("sessionend",Pl),$n.stop()};function Ct(v){v.preventDefault(),tl("WebGLRenderer: Context Lost."),U=!0}function Ot(){tl("WebGLRenderer: Context Restored."),U=!1;let v=de.autoReset,P=ht.enabled,H=ht.autoUpdate,z=ht.needsUpdate,G=ht.type;Bt(),de.autoReset=v,ht.enabled=P,ht.autoUpdate=H,ht.needsUpdate=z,ht.type=G}function _t(v){Lt("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Kt(v){let P=v.target;P.removeEventListener("dispose",Kt),_e(P)}function _e(v){Nn(v),Pt.remove(v)}function Nn(v){let P=Pt.get(v).programs;P!==void 0&&(P.forEach(function(H){Q.releaseProgram(H)}),v.isShaderMaterial&&Q.releaseShaderCache(v))}this.renderBufferDirect=function(v,P,H,z,G,pt){P===null&&(P=We);let St=G.isMesh&&G.matrixWorld.determinantAffine()<0,dt=Wh(v,P,H,z,G);mt.setMaterial(z,St);let vt=H.index,Et=1;if(z.wireframe===!0){if(vt=k.getWireframeAttribute(H),vt===void 0)return;Et=2}let Ut=H.drawRange,Vt=H.attributes.position,Tt=Ut.start*Et,Ht=(Ut.start+Ut.count)*Et;pt!==null&&(Tt=Math.max(Tt,pt.start*Et),Ht=Math.min(Ht,(pt.start+pt.count)*Et)),vt!==null?(Tt=Math.max(Tt,0),Ht=Math.min(Ht,vt.count)):Vt!=null&&(Tt=Math.max(Tt,0),Ht=Math.min(Ht,Vt.count));let ce=Ht-Tt;if(ce<0||ce===1/0)return;ct.setup(G,z,dt,H,vt);let ee,jt=Y;if(vt!==null&&(ee=x.get(vt),jt=ut,jt.setIndex(ee)),G.isMesh)z.wireframe===!0?(mt.setLineWidth(z.wireframeLinewidth*qe()),jt.setMode(N.LINES)):jt.setMode(N.TRIANGLES);else if(G.isLine){let we=z.linewidth;we===void 0&&(we=1),mt.setLineWidth(we*qe()),G.isLineSegments?jt.setMode(N.LINES):G.isLineLoop?jt.setMode(N.LINE_LOOP):jt.setMode(N.LINE_STRIP)}else G.isPoints?jt.setMode(N.POINTS):G.isSprite&&jt.setMode(N.TRIANGLES);if(G.isBatchedMesh)if(ie.get("WEBGL_multi_draw"))jt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{let we=G._multiDrawStarts,At=G._multiDrawCounts,Le=G._multiDrawCount,Zt=vt?x.get(vt).bytesPerElement:1,Kn=Pt.get(z).currentProgram.getUniforms();for(let Ee=0;Ee<Le;Ee++)Kn.setValue(N,"_gl_DrawID",Ee),jt.render(we[Ee]/Zt,At[Ee])}else if(G.isInstancedMesh)jt.renderInstances(Tt,ce,G.count);else if(H.isInstancedBufferGeometry){let we=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,At=Math.min(H.instanceCount,we);jt.renderInstances(Tt,ce,At)}else jt.render(Tt,ce)};function Cl(v,P,H,z){O!==null&&v.isNodeMaterial&&O.setObject(z,v),ue===!0&&J.setState(v,H,!1),v.transparent===!0&&v.side===Ke&&v.forceSinglePass===!1?(v.side=fe,v.needsUpdate=!0,Wi(v,P,z),v.side=He,v.needsUpdate=!0,Wi(v,P,z),v.side=Ke):Wi(v,P,z)}this.compile=function(v,P,H=null){H===null&&(H=v),O!==null&&O.renderStart(v,P,H),T=Z.get(H),T.init(P),b.push(T),H.traverseVisible(function(G){G.isLight&&G.layers.test(P.layers)&&(T.pushLight(G),G.castShadow&&T.pushShadow(G))}),v!==H&&v.traverseVisible(function(G){G.isLight&&G.layers.test(P.layers)&&(T.pushLight(G),G.castShadow&&T.pushShadow(G))}),T.setupLights(),O!==null&&O.updateLights(T.state.lightsArray),Fe=this.localClippingEnabled,ue=J.init(this.clippingPlanes,Fe),ue===!0&&J.setGlobalState(this.clippingPlanes,P),O!==null&&ht.render(T.state.shadowsArray,H,P);let z=new Set;return v.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;let pt=G.material;if(pt)if(Array.isArray(pt))for(let St=0;St<pt.length;St++){let dt=pt[St];Cl(dt,H,P,G),z.add(dt)}else Cl(pt,H,P,G),z.add(pt)}),T=b.pop(),O!==null&&O.renderEnd(),z},this.compileAsync=function(v,P,H=null){let z=this.compile(v,P,H);return new Promise(G=>{function pt(){if(z.forEach(function(St){let vt=Pt.get(St).currentProgram;(vt===void 0||vt.isReady())&&z.delete(St)}),z.size===0){G(v);return}setTimeout(pt,10)}ie.get("KHR_parallel_shader_compile")!==null?pt():setTimeout(pt,10)})};let Ya=null;function Vh(v){Ya&&Ya(v)}function Il(){$n.stop()}function Pl(){$n.start()}let $n=new Eh;$n.setAnimationLoop(Vh),typeof self<"u"&&$n.setContext(self),this.setAnimationLoop=function(v){Ya=v,st.setAnimationLoop(v),v===null?$n.stop():$n.start()},st.addEventListener("sessionstart",Il),st.addEventListener("sessionend",Pl),this.render=function(v,P){if(P!==void 0&&P.isCamera!==!0){Lt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;O!==null&&O.renderStart(v,P);let H=st.enabled===!0&&st.isPresenting===!0,z=D!==null&&(j===null||H)&&D.begin(I,j);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),st.enabled===!0&&st.isPresenting===!0&&(D===null||D.isCompositing()===!1)&&(st.cameraAutoUpdate===!0&&st.updateCamera(P),P=st.getCamera()),v.isScene===!0&&v.onBeforeRender(I,v,P,j),T=Z.get(v,b.length),T.init(P),T.state.textureUnits=Dt.getTextureUnits(),b.push(T),oe.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),P.isArrayCamera?be.setFromArrayCamera(P):Gt.setFromProjectionMatrix(oe,Je,P.reversedDepth),Fe=this.localClippingEnabled,ue=J.init(this.clippingPlanes,Fe),E=ft.get(v,g.length),E.init(),g.push(E),this.info.render.frame++,st.enabled===!0&&st.isPresenting===!0){let St=I.xr.getDepthSensingMesh();St!==null&&Za(St,P,-1/0,I.sortObjects)}Za(v,P,0,I.sortObjects),E.finish(),O!==null&&O.updateLights(T.state.lightsArray),I.sortObjects===!0&&E.sort(Mt,qt),Xe=st.enabled===!1||st.isPresenting===!1||st.hasDepthSensing()===!1,Xe&&R.addToRenderList(E,v),this.info.autoReset===!0&&this.info.reset(),ue===!0&&J.beginShadows();let G=T.state.shadowsArray;if(ht.render(G,v,P),ue===!0&&J.endShadows(),(z&&D.hasRenderPass())===!1){let St=E.opaque,dt=E.transmissive;if(T.setupLights(),P.isArrayCamera){let vt=P.cameras;if(dt.length>0)for(let Et=0,Ut=vt.length;Et<Ut;Et++){let Vt=vt[Et];Nl(St,dt,v,Vt)}Xe&&R.render(v);for(let Et=0,Ut=vt.length;Et<Ut;Et++){let Vt=vt[Et];Ll(E,v,Vt,Vt.viewport)}}else dt.length>0&&Nl(St,dt,v,P),Xe&&R.render(v),Ll(E,v,P)}j!==null&&B===0&&(Dt.updateMultisampleRenderTarget(j),Dt.updateRenderTargetMipmap(j)),z&&D.end(I),v.isScene===!0&&v.onAfterRender(I,v,P),ct.resetDefaultState(),W=-1,K=null,b.pop(),b.length>0?(T=b[b.length-1],Dt.setTextureUnits(T.state.textureUnits),ue===!0&&J.setGlobalState(I.clippingPlanes,T.state.camera)):T=null,g.pop(),g.length>0?E=g[g.length-1]:E=null,O!==null&&O.renderEnd()};function Za(v,P,H,z){if(v.visible===!1)return;if(v.layers.test(P.layers)){if(v.isGroup)H=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(P);else if(v.isLight)T.pushLight(v),v.castShadow&&T.pushShadow(v);else if(v.isSprite){let St=P.isArrayCamera?be:Gt;if(!v.frustumCulled||v.intersectsFrustum(St)){z&&ge.setFromMatrixPosition(v.matrixWorld).applyMatrix4(oe);let dt=nt.update(v),vt=v.material;vt.visible&&E.push(v,dt,vt,H,ge.z,null,P)}}else if(v.isMesh||v.isLine||v.isPoints){let St=P.isArrayCamera?be:Gt;if(!v.frustumCulled||v.intersectsFrustum(St)){let dt=nt.update(v),vt=v.material;if(z&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),ge.copy(v.boundingSphere.center)):(dt.boundingSphere===null&&dt.computeBoundingSphere(),ge.copy(dt.boundingSphere.center)),ge.applyMatrix4(v.matrixWorld).applyMatrix4(oe)),Array.isArray(vt)){let Et=dt.groups;for(let Ut=0,Vt=Et.length;Ut<Vt;Ut++){let Tt=Et[Ut],Ht=vt[Tt.materialIndex];Ht&&Ht.visible&&E.push(v,dt,Ht,H,ge.z,Tt,P)}}else vt.visible&&E.push(v,dt,vt,H,ge.z,null,P)}}}let pt=v.children;for(let St=0,dt=pt.length;St<dt;St++)Za(pt[St],P,H,z)}function Ll(v,P,H,z){let{opaque:G,transmissive:pt,transparent:St}=v;T.setupLightsView(H),ue===!0&&J.setGlobalState(I.clippingPlanes,H),z&&mt.viewport(tt.copy(z)),G.length>0&&ks(G,P,H),pt.length>0&&ks(pt,P,H),St.length>0&&ks(St,P,H),mt.buffers.depth.setTest(!0),mt.buffers.depth.setMask(!0),mt.buffers.color.setMask(!0),mt.setPolygonOffset(!1)}function Nl(v,P,H,z){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[z.id]===void 0){let Tt=ie.has("EXT_color_buffer_half_float")||ie.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[z.id]=new Ge(1,1,{generateMipmaps:!0,type:Tt?on:Be,minFilter:In,samples:Math.max(4,se.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Wt.workingColorSpace})}let pt=T.state.transmissionRenderTarget[z.id],St=z.viewport||tt;pt.setSize(St.z*I.transmissionResolutionScale,St.w*I.transmissionResolutionScale);let dt=I.getRenderTarget(),vt=I.getActiveCubeFace(),Et=I.getActiveMipmapLevel();I.setRenderTarget(pt),I.getClearColor(V),it=I.getClearAlpha(),it<1&&I.setClearColor(16777215,.5),I.clear(),Xe&&R.render(H);let Ut=I.toneMapping;I.toneMapping=gn;let Vt=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),T.setupLightsView(z),ue===!0&&J.setGlobalState(I.clippingPlanes,z),ks(v,H,z),Dt.updateMultisampleRenderTarget(pt),Dt.updateRenderTargetMipmap(pt),ie.has("WEBGL_multisampled_render_to_texture")===!1){let Tt=!1;for(let Ht=0,ce=P.length;Ht<ce;Ht++){let ee=P[Ht],{object:jt,geometry:we,material:At,group:Le}=ee;if(At.side===Ke&&jt.layers.test(z.layers)){let Zt=At.side;At.side=fe,At.needsUpdate=!0,Dl(jt,H,z,we,At,Le),At.side=Zt,At.needsUpdate=!0,Tt=!0}}Tt===!0&&(Dt.updateMultisampleRenderTarget(pt),Dt.updateRenderTargetMipmap(pt))}I.setRenderTarget(dt,vt,Et),I.setClearColor(V,it),Vt!==void 0&&(z.viewport=Vt),I.toneMapping=Ut}function ks(v,P,H){let z=P.isScene===!0?P.overrideMaterial:null;for(let G=0,pt=v.length;G<pt;G++){let St=v[G],{object:dt,geometry:vt,group:Et}=St,Ut=St.material;Ut.allowOverride===!0&&z!==null&&(Ut=z),dt.layers.test(H.layers)&&Dl(dt,P,H,vt,Ut,Et)}}function Dl(v,P,H,z,G,pt){O!==null&&G.isNodeMaterial&&O.setObject(v,G),v.onBeforeRender(I,P,H,z,G,pt),v.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),G.onBeforeRender(I,P,H,z,v,pt),G.transparent===!0&&G.side===Ke&&G.forceSinglePass===!1?(G.side=fe,G.needsUpdate=!0,I.renderBufferDirect(H,P,z,G,v,pt),G.side=He,G.needsUpdate=!0,I.renderBufferDirect(H,P,z,G,v,pt),G.side=Ke):I.renderBufferDirect(H,P,z,G,v,pt),v.onAfterRender(I,P,H,z,G,pt)}function Ul(v){let P=0;for(let H of v)H.texture!==null&&P++;return P}function Wi(v,P,H){P.isScene!==!0&&(P=We);let z=Pt.get(v),G=T.state.lights,pt=T.state.shadowsArray,St=G.state.version,dt=Q.getParameters(v,G.state,pt,P,H,T.state.lightProbeGridArray),vt=Q.getProgramCacheKey(dt),Et=z.programs;z.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?P.environment:null,z.fog=P.fog;let Ut=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;z.envMap=A.get(v.envMap||z.environment,Ut),z.envMapRotation=z.environment!==null&&v.envMap===null?P.environmentRotation:v.envMapRotation,Et===void 0&&(v.addEventListener("dispose",Kt),Et=new Map,z.programs=Et,z.programVariants=new Map);let Vt=Et.get(vt);if(Vt!==void 0){if(z.currentProgram===Vt&&z.lightsStateVersion===St)return Ol(v,dt),Vt}else dt.uniforms=Q.getUniforms(v),O!==null&&v.isNodeMaterial&&O.build(v,H,dt),v.onBeforeCompile(dt,I),Vt=Q.acquireProgram(dt,vt),Et.set(vt,Vt),z.uniforms=dt.uniforms;let Tt=z.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Tt.clippingPlanes=J.uniform),Ol(v,dt),z.needsLights=qh(v),z.lightsStateVersion=St,z.needsLights&&(Tt.ambientLightColor.value=G.state.ambient,Tt.lightProbe.value=G.state.probe,Tt.sunLights.value=G.state.sun,Tt.sunLightShadows.value=G.state.sunShadow,Tt.directionalLights.value=G.state.directional,Tt.directionalLightShadows.value=G.state.directionalShadow,Tt.spotLights.value=G.state.spot,Tt.spotLightShadows.value=G.state.spotShadow,Tt.rectAreaLights.value=G.state.rectArea,Tt.ltc_1.value=G.state.rectAreaLTC1,Tt.ltc_2.value=G.state.rectAreaLTC2,Tt.pointLights.value=G.state.point,Tt.pointLightShadows.value=G.state.pointShadow,Tt.hemisphereLights.value=G.state.hemi,Tt.sunShadowMatrix.value=G.state.sunShadowMatrix,Tt.sunShadowCascade.value=G.state.sunShadowCascade,Tt.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Tt.spotLightMatrix.value=G.state.spotLightMatrix,Tt.spotLightMap.value=G.state.spotLightMap,Tt.pointShadowMatrix.value=G.state.pointShadowMatrix),z.numLightProbeGrids=Ul(T.state.lightProbeGridArray),z.currentProgram=Vt,z.uniformsList=null,Vt}function Hh(v,P,H,z,G){let pt=Pt.get(v),St=pt.currentProgram.id+","+z+","+G,dt=pt.programVariants.get(St);return dt===void 0?(dt=Wi(v,P,H),pt.programVariants.set(St,dt)):(pt.currentProgram=dt,pt.uniformsList=null,pt.outputColorSpace=z,pt.toneMapping=G),dt}function Fl(v){if(v.uniformsList===null){let P=v.currentProgram.getUniforms();v.uniformsList=Gi.seqWithValue(P.seq,v.uniforms)}return v.uniformsList}function Ol(v,P){let H=Pt.get(v);H.outputColorSpace=P.outputColorSpace,H.batching=P.batching,H.batchingColor=P.batchingColor,H.instancing=P.instancing,H.instancingColor=P.instancingColor,H.instancingMorph=P.instancingMorph,H.skinning=P.skinning,H.morphTargets=P.morphTargets,H.morphNormals=P.morphNormals,H.morphColors=P.morphColors,H.morphTargetsCount=P.morphTargetsCount,H.numClippingPlanes=P.numClippingPlanes,H.numIntersection=P.numClipIntersection,H.vertexAlphas=P.vertexAlphas,H.vertexTangents=P.vertexTangents,H.toneMapping=P.toneMapping}function Wh(v,P,H,z,G){P.isScene!==!0&&(P=We),Dt.resetTextureUnits();let pt=P.fog,St=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?P.environment:null,dt=j===null?I.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Wt.workingColorSpace,vt=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Et=A.get(z.envMap||St,vt),Ut=z.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Vt=!!H.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Tt=!!H.morphAttributes.position,Ht=!!H.morphAttributes.normal,ce=!!H.morphAttributes.color,ee=gn;z.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(ee=I.toneMapping);let jt=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,we=jt!==void 0?jt.length:0,At=Pt.get(z),Le=T.state.lights;if(ue===!0&&(Fe===!0||v!==K)){let le=v===K&&z.id===W;J.setState(z,v,le)}let Zt=!1,Kn=!1;z.version===At.__version?At.needsLights&&At.lightsStateVersion!==Le.state.version||G.isBatchedMesh&&At.batching===!1||!G.isBatchedMesh&&At.batching===!0||G.isBatchedMesh&&At.batchingColor===!0&&G._colorsTexture===null||G.isBatchedMesh&&At.batchingColor===!1&&G._colorsTexture!==null||G.isInstancedMesh&&At.instancing===!1||!G.isInstancedMesh&&At.instancing===!0||G.isSkinnedMesh&&At.skinning===!1||!G.isSkinnedMesh&&At.skinning===!0||G.isInstancedMesh&&At.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&At.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&At.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&At.instancingMorph===!1&&G.morphTexture!==null||At.envMap!==Et||z.fog===!0&&At.fog!==pt||At.numClippingPlanes!==void 0&&(At.numClippingPlanes!==J.numPlanes||At.numIntersection!==J.numIntersection)||At.vertexAlphas!==Ut||At.vertexTangents!==Vt||At.morphTargets!==Tt||At.morphNormals!==Ht||At.morphColors!==ce||At.morphTargetsCount!==we||At.numLightProbeGrids!==Ul(T.state.lightProbeGridArray)?Zt=!0:(At.outputColorSpace!==dt||At.toneMapping!==ee)&&(Kn=!0):(Zt=!0,At.__version=z.version);let Ee=At.currentProgram;(Zt===!0||Kn===!0)&&(Ee=Kn===!0?Hh(z,P,G,dt,ee):Wi(z,P,G),O&&z.isNodeMaterial&&O.onUpdateProgram(z,Ee,At));let Gs=!1,Dn=!1,Qn=!1,Xt=Ee.getUniforms(),Te=At.uniforms;if(mt.useProgram(Ee.program)&&(Gs=!0,Dn=!0,Qn=!0),z.id!==W&&(W=z.id,Dn=!0),Gs||K!==v){mt.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),Xt.setValue(N,"projectionMatrix",v.projectionMatrix),Xt.setValue(N,"viewMatrix",v.matrixWorldInverse);let xe=Xt.map.cameraPosition;xe!==void 0&&xe.setValue(N,cn.setFromMatrixPosition(v.matrixWorld)),se.logarithmicDepthBuffer&&Xt.setValue(N,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&Xt.setValue(N,"isOrthographic",v.isOrthographicCamera===!0),K!==v&&(K=v,Dn=!0,Qn=!0)}if(At.needsLights&&(Le.state.sunShadowMap.length>0&&Xt.setValue(N,"sunShadowMap",Le.state.sunShadowMap,Dt),Le.state.directionalShadowMap.length>0&&Xt.setValue(N,"directionalShadowMap",Le.state.directionalShadowMap,Dt),Le.state.spotShadowMap.length>0&&Xt.setValue(N,"spotShadowMap",Le.state.spotShadowMap,Dt),Le.state.pointShadowMap.length>0&&Xt.setValue(N,"pointShadowMap",Le.state.pointShadowMap,Dt)),G.isSkinnedMesh){Xt.setOptional(N,G,"bindMatrix"),Xt.setOptional(N,G,"bindMatrixInverse");let le=G.skeleton;le&&(le.boneTexture===null&&le.computeBoneTexture(),Xt.setValue(N,"boneTexture",le.boneTexture,Dt))}G.isBatchedMesh&&(Xt.setOptional(N,G,"batchingTexture"),Xt.setValue(N,"batchingTexture",G._matricesTexture,Dt),Xt.setOptional(N,G,"batchingIdTexture"),Xt.setValue(N,"batchingIdTexture",G._indirectTexture,Dt),Xt.setOptional(N,G,"batchingColorTexture"),G._colorsTexture!==null&&Xt.setValue(N,"batchingColorTexture",G._colorsTexture,Dt));let je=H.morphAttributes;if((je.position!==void 0||je.normal!==void 0||je.color!==void 0)&&$.update(G,H,Ee),(Dn||At.receiveShadow!==G.receiveShadow)&&(At.receiveShadow=G.receiveShadow,Xt.setValue(N,"receiveShadow",G.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&P.environment!==null&&(Te.envMapIntensity.value=P.environmentIntensity),Te.dfgLUT!==void 0&&(Te.dfgLUT.value=Fg()),Dn){if(Xt.setValue(N,"toneMappingExposure",I.toneMappingExposure),At.needsLights&&Xh(Te,Qn),pt&&z.fog===!0&&lt.refreshFogUniforms(Te,pt),lt.refreshMaterialUniforms(Te,z,et,gt,T.state.transmissionRenderTarget[v.id]),At.needsLights&&At.numLightProbeGrids>0){let le=S,xe=0;for(let vn of T.state.lightProbeGridArray)vn.texture!==null&&(le.textures[xe]=vn.texture,le.min[xe]=vn.boundingBox.min,le.max[xe]=vn.boundingBox.max,le.resolution[xe]=vn.resolution,xe++);for(let vn in le)le[vn].length=xe;Te.probesSH.value=le.textures,Te.probesMin.value=le.min,Te.probesMax.value=le.max,Te.probesResolution.value=le.resolution}Gi.upload(N,Fl(At),Te,Dt)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Gi.upload(N,Fl(At),Te,Dt),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&Xt.setValue(N,"center",G.center),Xt.setValue(N,"modelViewMatrix",G.modelViewMatrix),Xt.setValue(N,"normalMatrix",G.normalMatrix),Xt.setValue(N,"modelMatrix",G.matrixWorld),z.uniformsGroups!==void 0){let le=z.uniformsGroups;for(let xe=0,vn=le.length;xe<vn;xe++){let zl=le[xe];Rt.update(zl,Ee),Rt.bind(zl,Ee)}}return Ee}function Xh(v,P){v.ambientLightColor.needsUpdate=P,v.lightProbe.needsUpdate=P,v.sunLights.needsUpdate=P,v.sunLightShadows.needsUpdate=P,v.directionalLights.needsUpdate=P,v.directionalLightShadows.needsUpdate=P,v.pointLights.needsUpdate=P,v.pointLightShadows.needsUpdate=P,v.spotLights.needsUpdate=P,v.spotLightShadows.needsUpdate=P,v.rectAreaLights.needsUpdate=P,v.hemisphereLights.needsUpdate=P}function qh(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return B},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(v,P,H){let z=Pt.get(v);z.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),Pt.get(v.texture).__webglTexture=P,Pt.get(v.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:H,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,P){let H=Pt.get(v);H.__webglFramebuffer=P,H.__useDefaultFramebuffer=P===void 0},this.setRenderTarget=function(v,P=0,H=0){j=v,F=P,B=H;let z=null,G=!1,pt=!1;if(v){let dt=Pt.get(v);if(dt.__useDefaultFramebuffer!==void 0){mt.bindFramebuffer(N.FRAMEBUFFER,dt.__webglFramebuffer),tt.copy(v.viewport),yt.copy(v.scissor),at=v.scissorTest,mt.viewport(tt),mt.scissor(yt),mt.setScissorTest(at),W=-1;return}else if(dt.__webglFramebuffer===void 0)Dt.setupRenderTarget(v);else if(dt.__hasExternalTextures)Dt.rebindTextures(v,Pt.get(v.texture).__webglTexture,Pt.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){let Ut=v.depthTexture;if(dt.__boundDepthTexture!==Ut){if(Ut!==null&&Pt.has(Ut)&&(v.width!==Ut.image.width||v.height!==Ut.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Dt.setupDepthRenderbuffer(v)}}let vt=v.texture;(vt.isData3DTexture||vt.isDataArrayTexture||vt.isCompressedArrayTexture)&&(pt=!0);let Et=Pt.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Et[P])?z=Et[P][H]:z=Et[P],G=!0):v.samples>0&&Dt.useMultisampledRTT(v)===!1?z=Pt.get(v).__webglMultisampledFramebuffer:Array.isArray(Et)?z=Et[H]:z=Et,tt.copy(v.viewport),yt.copy(v.scissor),at=v.scissorTest}else tt.copy(bt).multiplyScalar(et).floor(),yt.copy(Yt).multiplyScalar(et).floor(),at=Jt;if(H!==0&&(z=X),mt.bindFramebuffer(N.FRAMEBUFFER,z)&&mt.drawBuffers(v,z),mt.viewport(tt),mt.scissor(yt),mt.setScissorTest(at),G){let dt=Pt.get(v.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+P,dt.__webglTexture,H)}else if(pt){let dt=P;for(let vt=0;vt<v.textures.length;vt++){let Et=Pt.get(v.textures[vt]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+vt,Et.__webglTexture,H,dt)}}else if(v!==null&&H!==0){let dt=Pt.get(v.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,dt.__webglTexture,H)}W=-1};function Bl(v){let P=Pt.get(v);return(P.__readFormat!==v.format||P.__readType!==v.type)&&(P.__readFormat=v.format,P.__readType=v.type,P.__formatReadable=se.textureFormatReadable(v.format),P.__typeReadable=se.textureTypeReadable(v.type)),P}this.readRenderTargetPixels=function(v,P,H,z,G,pt,St,dt=0){if(!(v&&v.isWebGLRenderTarget)){Lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let vt=Pt.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&St!==void 0&&(vt=vt[St],Array.isArray(vt)&&(vt=vt[0])),vt){mt.bindFramebuffer(N.FRAMEBUFFER,vt);try{let Et=v.textures[dt],Ut=Et.format,Vt=Et.type;v.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+dt);let Tt=Bl(Et);if(Tt.__formatReadable===!1){Lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Tt.__typeReadable===!1){Lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=v.width-z&&H>=0&&H<=v.height-G&&N.readPixels(P,H,z,G,rt.convert(Ut),rt.convert(Vt),pt)}finally{let Et=j!==null?Pt.get(j).__webglFramebuffer:null;mt.bindFramebuffer(N.FRAMEBUFFER,Et)}}},this.readRenderTargetPixelsAsync=async function(v,P,H,z,G,pt,St,dt=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let vt=Pt.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&St!==void 0&&(vt=vt[St],Array.isArray(vt)&&(vt=vt[0])),vt)if(P>=0&&P<=v.width-z&&H>=0&&H<=v.height-G){mt.bindFramebuffer(N.FRAMEBUFFER,vt);let Et=v.textures[dt],Ut=Et.format,Vt=Et.type;v.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+dt);let Tt=Bl(Et);if(Tt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Tt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ht=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Ht),N.bufferData(N.PIXEL_PACK_BUFFER,pt.byteLength,N.STREAM_READ),N.readPixels(P,H,z,G,rt.convert(Ut),rt.convert(Vt),0),N.bindBuffer(N.PIXEL_PACK_BUFFER,null);let ce=j!==null?Pt.get(j).__webglFramebuffer:null;mt.bindFramebuffer(N.FRAMEBUFFER,ce);let ee=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Qc(N,ee,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Ht),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,pt),N.bindBuffer(N.PIXEL_PACK_BUFFER,null),N.deleteBuffer(Ht),N.deleteSync(ee),pt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,P=null,H=0){let z=Math.pow(2,-H),G=Math.floor(v.image.width*z),pt=Math.floor(v.image.height*z),St=P!==null?P.x:0,dt=P!==null?P.y:0;Dt.setTexture2D(v,0),N.copyTexSubImage2D(N.TEXTURE_2D,H,0,0,St,dt,G,pt),mt.unbindTexture()},this.copyTextureToTexture=function(v,P,H=null,z=null,G=0,pt=0){let St,dt,vt,Et,Ut,Vt,Tt,Ht,ce,ee=v.isCompressedTexture?v.mipmaps[pt]:v.image;if(H!==null)St=H.max.x-H.min.x,dt=H.max.y-H.min.y,vt=H.isBox3?H.max.z-H.min.z:1,Et=H.min.x,Ut=H.min.y,Vt=H.isBox3?H.min.z:0;else{let Xt=Math.pow(2,-G);St=Math.floor(ee.width*Xt),dt=Math.floor(ee.height*Xt),v.isDataArrayTexture?vt=ee.depth:v.isData3DTexture?vt=Math.floor(ee.depth*Xt):vt=1,Et=0,Ut=0,Vt=0}z!==null?(Tt=z.x,Ht=z.y,ce=z.z):(Tt=0,Ht=0,ce=0);let jt=rt.convert(P.format),we=rt.convert(P.type),At;P.isData3DTexture?(Dt.setTexture3D(P,0),At=N.TEXTURE_3D):P.isDataArrayTexture||P.isCompressedArrayTexture?(Dt.setTexture2DArray(P,0),At=N.TEXTURE_2D_ARRAY):(Dt.setTexture2D(P,0),At=N.TEXTURE_2D),mt.activeTexture(N.TEXTURE0),mt.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,P.flipY),mt.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),mt.pixelStorei(N.UNPACK_ALIGNMENT,P.unpackAlignment);let Le=mt.getParameter(N.UNPACK_ROW_LENGTH),Zt=mt.getParameter(N.UNPACK_IMAGE_HEIGHT),Kn=mt.getParameter(N.UNPACK_SKIP_PIXELS),Ee=mt.getParameter(N.UNPACK_SKIP_ROWS),Gs=mt.getParameter(N.UNPACK_SKIP_IMAGES);mt.pixelStorei(N.UNPACK_ROW_LENGTH,ee.width),mt.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ee.height),mt.pixelStorei(N.UNPACK_SKIP_PIXELS,Et),mt.pixelStorei(N.UNPACK_SKIP_ROWS,Ut),mt.pixelStorei(N.UNPACK_SKIP_IMAGES,Vt);let Dn=v.isDataArrayTexture||v.isData3DTexture,Qn=P.isDataArrayTexture||P.isData3DTexture;if(v.isDepthTexture){let Xt=Pt.get(v),Te=Pt.get(P),je=Pt.get(Xt.__renderTarget),le=Pt.get(Te.__renderTarget);mt.bindFramebuffer(N.READ_FRAMEBUFFER,je.__webglFramebuffer),mt.bindFramebuffer(N.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let xe=0;xe<vt;xe++)Dn&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Pt.get(v).__webglTexture,G,Vt+xe),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Pt.get(P).__webglTexture,pt,ce+xe)),N.blitFramebuffer(Et,Ut,Et+St,Ut+dt,Tt,Ht,Tt+St,Ht+dt,N.DEPTH_BUFFER_BIT,N.NEAREST);mt.bindFramebuffer(N.READ_FRAMEBUFFER,null),mt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(G!==0||v.isRenderTargetTexture||Pt.has(v)){let Xt=Pt.get(v),Te=Pt.get(P);mt.bindFramebuffer(N.READ_FRAMEBUFFER,C),mt.bindFramebuffer(N.DRAW_FRAMEBUFFER,q);for(let je=0;je<vt;je++)Dn?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Xt.__webglTexture,G,Vt+je):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Xt.__webglTexture,G),Qn?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Te.__webglTexture,pt,ce+je):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Te.__webglTexture,pt),G!==0?N.blitFramebuffer(Et,Ut,Et+St,Ut+dt,Tt,Ht,Tt+St,Ht+dt,N.COLOR_BUFFER_BIT,N.NEAREST):Qn?N.copyTexSubImage3D(At,pt,Tt,Ht,ce+je,Et,Ut,St,dt):N.copyTexSubImage2D(At,pt,Tt,Ht,Et,Ut,St,dt);mt.bindFramebuffer(N.READ_FRAMEBUFFER,null),mt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else Qn?v.isDataTexture||v.isData3DTexture?N.texSubImage3D(At,pt,Tt,Ht,ce,St,dt,vt,jt,we,ee.data):P.isCompressedArrayTexture?N.compressedTexSubImage3D(At,pt,Tt,Ht,ce,St,dt,vt,jt,ee.data):N.texSubImage3D(At,pt,Tt,Ht,ce,St,dt,vt,jt,we,ee):v.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,pt,Tt,Ht,St,dt,jt,we,ee.data):v.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,pt,Tt,Ht,ee.width,ee.height,jt,ee.data):N.texSubImage2D(N.TEXTURE_2D,pt,Tt,Ht,St,dt,jt,we,ee);mt.pixelStorei(N.UNPACK_ROW_LENGTH,Le),mt.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Zt),mt.pixelStorei(N.UNPACK_SKIP_PIXELS,Kn),mt.pixelStorei(N.UNPACK_SKIP_ROWS,Ee),mt.pixelStorei(N.UNPACK_SKIP_IMAGES,Gs),pt===0&&P.generateMipmaps===!0&&P.mipmapsAutoUpdate===!0&&N.generateMipmap(At),mt.unbindTexture()},this.initRenderTarget=function(v){Pt.get(v).__webglFramebuffer===void 0&&Dt.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?Dt.setTextureCube(v,0):v.isData3DTexture?Dt.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?Dt.setTexture2DArray(v,0):Dt.setTexture2D(v,0),mt.unbindTexture()},this.resetState=function(){F=0,B=0,j=null,mt.reset(),ct.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Je}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=Wt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Wt._getUnpackColorSpace()}};var zs=new L;function Qe(i,t,e,n,s,r){let a=2*Math.PI*s/4,o=Math.max(r-2*s,0),l=Math.PI/4;zs.copy(t),zs[n]=0,zs.normalize();let c=.5*a/(a+o),u=1-zs.angleTo(i)/l;return Math.sign(zs[e])===1?u*c:o/(a+o)+c+c*(1-u)}var qa=class i extends Wn{constructor(t=1,e=1,n=1,s=2,r=.1){let a=s*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let l=new L,c=new L,u=new L(t,e,n).divideScalar(2).subScalar(r),m=this.attributes.position.array,f=this.attributes.normal.array,d=this.attributes.uv.array,_=m.length/6,y=new L,h=.5/a;for(let p=0,M=0;p<m.length;p+=3,M+=2)switch(l.fromArray(m,p),c.copy(l),c.x-=Math.sign(c.x)*h,c.y-=Math.sign(c.y)*h,c.z-=Math.sign(c.z)*h,c.normalize(),m[p+0]=u.x*Math.sign(l.x)+c.x*r,m[p+1]=u.y*Math.sign(l.y)+c.y*r,m[p+2]=u.z*Math.sign(l.z)+c.z*r,f[p+0]=c.x,f[p+1]=c.y,f[p+2]=c.z,Math.floor(p/_)){case 0:y.set(1,0,0),d[M+0]=Qe(y,c,"z","y",r,n),d[M+1]=1-Qe(y,c,"y","z",r,e);break;case 1:y.set(-1,0,0),d[M+0]=1-Qe(y,c,"z","y",r,n),d[M+1]=1-Qe(y,c,"y","z",r,e);break;case 2:y.set(0,1,0),d[M+0]=1-Qe(y,c,"x","z",r,t),d[M+1]=Qe(y,c,"z","x",r,n);break;case 3:y.set(0,-1,0),d[M+0]=1-Qe(y,c,"x","z",r,t),d[M+1]=1-Qe(y,c,"z","x",r,n);break;case 4:y.set(0,0,1),d[M+0]=1-Qe(y,c,"x","y",r,t),d[M+1]=1-Qe(y,c,"y","x",r,e);break;case 5:y.set(0,0,-1),d[M+0]=Qe(y,c,"x","y",r,t),d[M+1]=1-Qe(y,c,"y","x",r,e);break}}static fromJSON(t){return new i(t.width,t.height,t.depth,t.segments,t.radius)}};var El=`
vec3 studio(vec3 r){
  vec3 col = mix(vec3(.015,.10,.075), vec3(.30,.58,.50), smoothstep(-.3,.95,r.y));
  col += vec3(1.,.97,.9) * smoothstep(.84,.92,dot(r,normalize(vec3(-.55,.6,.55)))) * 1.25;
  float strip = smoothstep(.13,.0,abs(r.x-.72)) * smoothstep(-.35,.1,r.y) * smoothstep(.95,.45,r.y);
  col += vec3(.92,1.,.96) * strip * .95;
  col += vec3(1.,.82,.62) * smoothstep(.78,.95,dot(r,normalize(vec3(.5,.25,-.8)))) * .8;
  col += vec3(.7,.9,1.) * smoothstep(.86,.95,dot(r,normalize(vec3(-.8,.1,-.5)))) * .45;
  return col;
}`,Rl=`
varying vec3 vN; varying vec3 vW; varying vec3 vL;
void main(){
  vL = position;
  vec4 w = modelMatrix * vec4(position,1.);
  vW = w.xyz;
  vN = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * w;
}`,Og=`
precision highp float;
varying vec3 vN; varying vec3 vW; varying vec3 vL;
uniform vec3 uTint; uniform float uBase; uniform float uFres; uniform float uMilk; uniform float uOpacity;
${El}
float h31(vec3 p){ p = fract(p*.3183099+.1); p *= 17.; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
float vn(vec3 x){ vec3 i=floor(x), f=fract(x); f=f*f*(3.-2.*f);
  return mix(mix(mix(h31(i),h31(i+vec3(1,0,0)),f.x),mix(h31(i+vec3(0,1,0)),h31(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(h31(i+vec3(0,0,1)),h31(i+vec3(1,0,1)),f.x),mix(h31(i+vec3(0,1,1)),h31(i+vec3(1,1,1)),f.x),f.y),f.z); }
void main(){
  vec3 N = normalize(vN); if(!gl_FrontFacing) N = -N;
  vec3 V = normalize(cameraPosition - vW);
  float nv = clamp(dot(N,V),0.,1.);
  float fres = pow(1.-nv, 3.);
  vec3 env = studio(reflect(-V,N));
  vec3 inner = studio(refract(-V,N,.78));
  float milk = uMilk > 0. ? (vn(vL*5.)*.65 + vn(vL*13.)*.35) : 0.;
  vec3 col = uTint*.14 + env*(.18 + uFres*fres) + inner*.07 + vec3(.85,.93,1.)*milk*uMilk*.3;
  float hi = max(dot(env,vec3(.333))-.6,0.);
  float a = uBase + fres*uFres*.75 + hi*.9 + milk*uMilk*.28;
  gl_FragColor = vec4(col, clamp(a,0.,.94)*uOpacity);
}`,Bg=`
precision highp float;
varying vec3 vN; varying vec3 vW; varying vec3 vL;
uniform vec3 uTop; uniform vec3 uBot; uniform float uAlpha; uniform float uY0; uniform float uY1; uniform float uGloss;
${El}
void main(){
  vec3 N = normalize(vN);
  vec3 V = normalize(cameraPosition - vW);
  float nv = clamp(dot(N,V),0.,1.);
  float fres = pow(1.-nv,2.5);
  float h = clamp((vL.y-uY0)/(uY1-uY0),0.,1.);
  vec3 base = mix(uBot,uTop,smoothstep(0.,1.,h));
  vec3 env = studio(reflect(-V,N));
  vec3 col = base*(.62+.38*nv) + base*fres*.55 + env*(.10 + fres*.55)*uGloss;
  float topFace = smoothstep(.55,.92,N.y);
  col = mix(col, base*1.18 + env*.28*uGloss, topFace*.65);
  col += vec3(1.,.96,.9)*pow(max(dot(reflect(-V,N),normalize(vec3(-.55,.6,.55))),0.),48.)*.55*uGloss;
  gl_FragColor = vec4(col, uAlpha);
}`,zg=`
precision highp float;
varying vec3 vN; varying vec3 vW; varying vec3 vL;
uniform vec3 uColor;
${El}
void main(){
  vec3 N = normalize(vN); if(!gl_FrontFacing) N = -N;
  vec3 V = normalize(cameraPosition - vW);
  float nv = clamp(dot(N,V),0.,1.);
  vec3 env = studio(reflect(-V,N));
  vec3 col = uColor*(.16 + env*1.0) + vec3(1.,.97,.9)*pow(max(dot(env,vec3(.333))-.62,0.),2.)*1.6 + uColor*pow(1.-nv,3.)*.35;
  gl_FragColor = vec4(col,1.);
}`,Al=i=>(i=Math.min(1,Math.max(0,i)),i*i*(3-2*i)),kg=i=>(i=Math.min(1,Math.max(0,i)),i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2);function wl(i){return function(){i|=0,i=i+1831565813|0;let t=Math.imul(i^i>>>15,1|i);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Hi(i){return new Oe({vertexShader:Rl,fragmentShader:Og,transparent:!0,depthWrite:!1,side:i.side||He,uniforms:{uTint:{value:new Ft(i.tint||12576992)},uBase:{value:i.base},uFres:{value:i.fres||1},uMilk:{value:i.milk||0},uOpacity:{value:1}}})}function Bh(i){return new Oe({vertexShader:Rl,fragmentShader:Bg,transparent:i.alpha<1,depthWrite:i.alpha>=1,uniforms:{uTop:{value:new Ft(i.top)},uBot:{value:new Ft(i.bot)},uAlpha:{value:i.alpha},uY0:{value:-i.h/2},uY1:{value:i.h/2},uGloss:{value:i.gloss==null?1:i.gloss}}})}function Gg(i,t){let e=[[0,0],[i*.93,0],[i*.985,.03],[i,.08],[i,t-.08],[i*.985,t-.03],[i*.94,t-.004],[i*.62,t-.018],[0,t-.03]],n=new Xn(e.map(s=>new wt(s[0],s[1])),56);return n.translate(0,-t/2,0),n}function Vg(){let i=[[0,-1.1],[.72,-1.1],[.86,-1.09],[.95,-1.045],[1,-.97],[1.03,-.8],[1.06,1.05],[1.065,1.1],[1.05,1.135],[1.01,1.145],[.97,1.135],[.945,1.11],[.93,1.07],[.905,-.52],[.88,-.6],[.8,-.64],[.5,-.655],[0,-.665]];return new Xn(i.map(t=>new wt(t[0],t[1])),80)}function zh(i){let e=document.createElement("canvas");e.width=e.height=512;let n=e.getContext("2d"),s=wl(7),r=512/2,a=i?{rind:"#c9831f",a:"#dc9a2c",b:"#b8720f",pith:"#f5dfa8",pith2:"rgba(240,210,140,.8)",f0:"#f0b650",f1:"#e19a2a",f2:"#c97a12",v:"255,205,110"}:{rind:"#f08a14",a:"#ffa72e",b:"#e8780c",pith:"#fff3d0",pith2:"rgba(255,225,160,.75)",f0:"#ffc15e",f1:"#ff9c24",f2:"#f27d0a",v:"255,215,130"};n.fillStyle=a.rind,n.fillRect(0,0,512,512);let o=n.createRadialGradient(r,r,512*.42,r,r,512*.5);o.addColorStop(0,a.a),o.addColorStop(1,a.b),n.fillStyle=o,n.beginPath(),n.arc(r,r,512*.5,0,7),n.fill();for(let f=0;f<360;f++){let d=s()*6.283,_=512*(.455+s()*.03);n.fillStyle="rgba(190,90,0,.35)",n.beginPath(),n.arc(r+Math.cos(d)*_,r+Math.sin(d)*_,1.2+s()*1.4,0,7),n.fill()}n.fillStyle=a.pith,n.beginPath(),n.arc(r,r,512*.435,0,7),n.fill(),o=n.createRadialGradient(r,r,512*.3,r,r,512*.435),o.addColorStop(0,"rgba(255,236,190,0)"),o.addColorStop(1,a.pith2),n.fillStyle=o,n.beginPath(),n.arc(r,r,512*.435,0,7),n.fill();let l=10,c=.05,u=512*.405;for(let f=0;f<l;f++){let d=f/l*6.283+c,_=(f+1)/l*6.283-c,y=(d+_)/2,h=r+Math.cos(y)*7,p=r+Math.sin(y)*7;n.beginPath(),n.moveTo(h,p),n.arc(h,p,u,d,_),n.closePath();let M=n.createRadialGradient(r,r,10,r,r,u);M.addColorStop(0,a.f0),M.addColorStop(.55,a.f1),M.addColorStop(1,a.f2),n.fillStyle=M,n.fill(),n.save(),n.clip();for(let w=0;w<150;w++){let S=d+s()*(_-d),E=18+s()*(u-20),T=r+Math.cos(S)*E,g=r+Math.sin(S)*E;n.fillStyle=`rgba(${a.v},${(i?.18:.35)+s()*.4})`,n.beginPath(),n.ellipse(T,g,2+s()*3,6+s()*12,S+1.5708,0,7),n.fill()}n.restore()}o=n.createRadialGradient(r,r,0,r,r,30),o.addColorStop(0,"#fff6dc"),o.addColorStop(1,"rgba(255,246,220,0)"),n.fillStyle=o,n.beginPath(),n.arc(r,r,30,0,7),n.fill(),n.fillStyle="rgba(255,255,255,.1)",n.beginPath(),n.ellipse(r-90,r-120,120,50,-.6,0,7),n.fill();let m=new ii(e);return m.colorSpace=Ie,m.anisotropy=4,m}function Hg(){let i=document.createElement("canvas");i.width=i.height=128;let t=i.getContext("2d"),e=t.createRadialGradient(64,64,0,64,64,64);return e.addColorStop(0,"rgba(0,0,0,.55)"),e.addColorStop(.55,"rgba(0,0,0,.22)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),new ii(i)}function Wg(i){return new Oe({vertexShader:Rl,fragmentShader:zg,side:Ke,uniforms:{uColor:{value:new Ft(i)}}})}function kh(i,t){let e=new ye,n=i.map(s=>{let r=new qa(s.s,s.s,s.s,3,.085*s.s/.6),a=new ye,o=new ae(r,Hi({side:fe,base:.16,fres:.9,milk:.8,tint:13625844}));o.renderOrder=5;let l=new ae(r,Hi({side:He,base:.12,fres:1.1,milk:.8,tint:14939387}));return l.renderOrder=6,a.add(o,l),e.add(a),{g:a,sp:s}});return{ice:e,meshes:n}}function Xg(){let i=document.createElement("canvas");i.width=i.height=32;let t=i.getContext("2d"),e=t.createRadialGradient(16,16,0,16,16,16);return e.addColorStop(0,"rgba(255,255,255,.95)"),e.addColorStop(.55,"rgba(255,255,255,.35)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,32,32),new ii(i)}function Gh(i){let{add:t,root:e}=i,n=Vg(),s=new ye,r=new ae(n,Hi({side:fe,base:.05,fres:.7,tint:11065036}));r.renderOrder=3;let a=new ae(n,Hi({side:He,base:.035,fres:1.1,tint:13496038}));a.renderOrder=4,s.add(r,a),t("glass",s,0,-2.45,{a:.28,b:1,rw:1.06});let o=.42,l=.888,c=Gg(l,o),u=(p,M)=>{let w=new ae(c,Bh(Object.assign({h:o},p)));return w.renderOrder=M,w};t("vermouth",u({top:15906108,bot:8011272,alpha:1,gloss:.85},0),-.41,-.38,{a:.24,b:.93,rw:l}),t("campari",u({top:16730682,bot:8194834,alpha:1,gloss:.9},0),.01,.88,{a:.18,b:.86,rw:l}),t("gin",u({top:15268855,bot:11133657,alpha:.36,gloss:1.3},1),.43,2.12,{a:.12,b:.78,rw:l});let{ice:m,meshes:f}=kh([{s:.62,a:[.42,.25,.1],r:[.32,.6,-.2],ang:0},{s:.56,a:[.15,-.35,.4],r:[-.5,.2,.55],ang:2.1},{s:.6,a:[-.3,.5,-.25],r:[.2,-.7,.35],ang:4.2}]);t("ice",m,.75,3.35,{a:.06,b:.7,rw:.95});let d=zh(!1),_=new Cn({map:d,roughness:.5,metalness:0,emissive:4200960,emissiveMap:d,emissiveIntensity:.5}),y=new Cn({color:15631378,roughness:.62}),h=new ye;return h.add(new ae(new Ni(.92,.92,.1,72,1,!1),[y,_,_])),t("orange",h,1.3,4.7,{a:0,b:.62,rw:.92}),{order:["orange","ice","gin","campari","vermouth","glass"],cam:{visA:4.2,visE:10.9,tyA:.35,tyE:.62,el:.17},shadowY:-1.115,shadowFollow:"glass",axis:[-3.9,5.3],update(p,M){let w=M.orange.p,S=M.ice.p;h.rotation.set(.43+(1-.43)*w,w*.6,0),f.forEach((E,T)=>{let g=E.sp;E.g.position.set(g.a[0]*(1-S)+Math.cos(g.ang+.5)*.46*S,(g.a[1]-.5)*(1-S)*.35+Math.sin(p*1.1+T*2)*.02*S,g.a[2]*(1-S)+Math.sin(g.ang+.5)*.46*S),E.g.rotation.set(g.r[0]+S*1.2,g.r[1]+S*.8+p*.05*S,g.r[2])})}}}function qg(i){let{add:t}=i,e=2.85,n=1.3,s=1.28,r=1.245,a=1.225,o=[[0,0],[1.18,0],[1.22,.035],[1.21,.085],[.9,.12],[.45,.17],[.17,.26],[.1,.45],[.09,.9],[.09,1.35],[.12,1.46],[.18,1.53]];for(let at=-80;at<=44;at+=4){let V=at*Math.PI/180;o.push([n*Math.cos(V),e+s*Math.sin(V)])}o.push([.94,3.77],[.905,3.795],[.87,3.775]);for(let at=44;at>=-86;at-=4){let V=at*Math.PI/180;o.push([r*Math.cos(V),e+a*Math.sin(V)])}o.push([0,1.63]);let l=new Xn(o.map(at=>new wt(at[0],at[1])),88),c=new ye,u=new ae(l,Hi({side:fe,base:.05,fres:.7,tint:11065036}));u.renderOrder=3;let m=new ae(l,Hi({side:He,base:.035,fres:1.1,tint:13496038}));m.renderOrder=4,c.add(u,m),t("glass",c,0,0,{a:0,b:1,rw:1.3},1.9);let f=r-.018,d=a-.018,_=at=>f*Math.sqrt(Math.max(0,1-Math.pow((at-e)/d,2)));function y(at,V,it){let ot=[];it?(at=e-d*.985,ot.push([0,at])):ot.push([0,at],[_(at)*.94,at]);for(let et=it?1:0;et<=16;et++){let Mt=at+(V-at)*et/16;ot.push([_(Mt),Mt])}return ot.push([_(V)*.95,V-.006],[_(V)*.6,V-.02],[0,V-.032]),new Xn(ot.map(et=>new wt(et[0],et[1])),72)}let h=(at,V,it,ot,gt)=>{let et=new ae(y(at,V,it),Bh(Object.assign({h:V-at},ot)));return et.material.uniforms.uY0.value=at,et.material.uniforms.uY1.value=V,et.renderOrder=gt,et};t("gin",h(1.64,2.25,!0,{top:15268855,bot:11133657,alpha:.36,gloss:1.3},1),0,2.815,{a:.24,b:.93,rw:.95},1.945);let p=h(2.25,3.35,!1,{top:16181168,bot:14467184,alpha:.46,gloss:1.3},2),M=[],w=wl(11);for(let at=0;at<46;at++){let V=2.3+w()*1,it=_(V)*.86*Math.sqrt(w()),ot=w()*6.283;M.push(Math.cos(ot)*it,V,Math.sin(ot)*it)}let S=new Ae;S.setAttribute("position",new Qt(M,3));let E=new ds(S,new Li({map:Xg(),size:.09,transparent:!0,depthWrite:!1,opacity:.9,sizeAttenuation:!0}));E.renderOrder=3;let T=new ye;T.add(p,E),t("tonic",T,0,3.47,{a:.18,b:.86,rw:1.1},2.8);let{ice:g,meshes:b}=kh([{s:.5,a:[.32,3.28,.12],r:[.32,.6,-.2],ang:0},{s:.46,a:[-.12,3.18,.4],r:[-.5,.2,.55],ang:2.1},{s:.48,a:[-.34,3.3,-.22],r:[.2,-.7,.35],ang:4.2}]);t("ice",g,0,4.445,{a:.12,b:.78,rw:.85},3.3);let D=new ye,I=wl(5),U=[14250127,15774406,9321315,8014378].map(at=>new Cn({color:at,roughness:.75})),O=new xs(1,10,6),X=[];for(let at=0;at<20;at++){let V=new ae(O,U[at%7===6?3:at%3===2?2:at%2]),it=.06+I()*.06;V.scale.set(it*1.4,it*.28,it);let ot=I()*6.283,gt=.15+Math.sqrt(I())*.72;V.position.set(Math.cos(ot)*gt,3.36+I()*.03,Math.sin(ot)*gt),V.rotation.set(I()*.8,I()*6,I()*.8),D.add(V),X.push(V)}t("flowers",D,0,5.435,{a:.08,b:.72,rw:.85},3.36);let C=zh(!0),q=new Cn({map:C,roughness:.6,metalness:0,emissive:3808256,emissiveMap:C,emissiveIntensity:.45}),F=new Cn({color:13208098,roughness:.7}),B=new ye,j=new ae(new Ni(.62,.62,.07,64,1,!1),[F,q,q]);B.add(j),t("orange",B,0,6.62,{a:.04,b:.66,rw:.66},3.45);let W=3.2,K=new Di([new L(0,-W/2,0),new L(0,W/2-.55,0),new L(.06,W/2-.26,0),new L(.3,W/2-.08,0),new L(.62,W/2-.1,0)]),tt=new ae(new vs(K,48,.05,10,!1),Wg(14263361)),yt=new ye;return yt.add(tt),t("straw",yt,0,9.52,{a:0,b:.6,rw:.6},3.3),{order:["straw","orange","flowers","ice","tonic","gin","glass"],cam:{visA:5.8,visE:15.9,tyA:2.3,tyE:7.15,el:.15},shadowY:-.012,shadowFollow:null,axis:[-.6,15.1],update(at,V){let it=V.straw.p,ot=V.orange.p,gt=V.ice.p,et=V.flowers.p;tt.position.set(.2*(1-it),3.3,0),tt.rotation.set(0,0,-.2*(1-it)),j.position.set(.52*(1-ot),3.5,0),j.rotation.set(.3+(1-.3)*ot,ot*.5,-.95*(1-ot)),b.forEach((Mt,qt)=>{let bt=Mt.sp;Mt.g.position.set(bt.a[0]*(1-gt)+Math.cos(bt.ang+.5)*.4*gt,bt.a[1]+Math.sin(at*1.1+qt*2)*.02*gt,bt.a[2]*(1-gt)+Math.sin(bt.ang+.5)*.4*gt),Mt.g.rotation.set(bt.r[0]+gt*1.2,bt.r[1]+gt*.8+at*.05*gt,bt.r[2])}),D.rotation.y=at*.12*et,X.forEach((Mt,qt)=>{Mt.position.y=3.36+qt%5*.012*et+Math.sin(at*1.2+qt)*.01*et})}}}var Yg={negroni:Gh,paradise:qg};function gv(i,t){let e=new Ha({alpha:!0,antialias:!0,powerPreference:"high-performance"});e.setClearColor(0,0),e.outputColorSpace=Ie,e.setPixelRatio(Math.min(window.devicePixelRatio||1,2));let n=e.domElement;n.className="xv-3d",i.appendChild(n);let s=new os,r=new Ne(26,1,.1,300);s.add(new bs(16777215,1919549,1.05));let a=new ws(16773597,2.1);a.position.set(-3,5,6),s.add(a);let o=new ye;s.add(o);let l={},c=(F,B,j,W,K,tt)=>{let yt={k:F,g:B,y0:j,y1:W,p:0,w:K,rw:K.rw,c:tt||0};return l[F]=yt,o.add(B),yt},u=(Yg[t]||Gh)({add:c,root:o}),m=u.order,f=u.cam,d=new ae(new si(4.6,4.6),new Pi({map:Hg(),transparent:!0,depthWrite:!1,opacity:.6}));d.rotation.x=-Math.PI/2,d.renderOrder=-1,o.add(d);let _=new Ae;_.setAttribute("position",new Qt([0,u.axis[0],0,0,u.axis[1],0],3));let y=new us(_,new ys({color:16777215,dashSize:.1,gapSize:.1,transparent:!0,opacity:0,depthWrite:!1}));y.computeLineDistances(),y.renderOrder=7,o.add(y);let h={W:0,H:0,cx:0,u:0,from:0,to:0,t0:0,dur:0,yaw:0,pitch:0,vyaw:0,drag:!1,idle:0,run:!1,raf:0,frames:0,acc:0,lowered:!1,onFrame:null,onTap:null,onLost:null},p={};function M(F,B,j){h.W=F,h.H=B,h.cx=j,e.setSize(F,B,!1),n.style.width=F+"px",n.style.height=B+"px",r.aspect=F/B,r.setViewOffset(F,B,F/2-j,0,F,B),r.updateProjectionMatrix()}let w=F=>F/(2*Math.tan(sl.degToRad(r.fov/2))),S=new L;function E(F){if(!h.run)return;h.raf=requestAnimationFrame(E);let B=F/1e3;if(h.dur>0){let gt=Math.min(1,(F-h.t0)/h.dur);h.u=h.from+(h.to-h.from)*gt,gt>=1&&(h.dur=0)}else h.u=h.to;let j=h.u;h.drag||(h.yaw+=h.vyaw,h.vyaw*=.93,F-h.idle>2200&&(h.yaw+=(0-h.yaw)*.035,h.pitch+=(0-h.pitch)*.05)),o.rotation.y=h.yaw+Math.sin(B*.55)*.07,o.rotation.x=h.pitch,m.forEach((gt,et)=>{let Mt=l[gt],qt=kg((j-Mt.w.a)/(Mt.w.b-Mt.w.a));Mt.p=qt;let bt=Mt.y0+(Mt.y1-Mt.y0)*qt+Math.sin(B*1.3+et)*.028*qt;Mt.g.position.set(0,bt,0),p[gt]=bt+Mt.c}),u.update(B,l),d.position.set(0,u.shadowY+(u.shadowFollow?l[u.shadowFollow].g.position.y:0),0),d.material.opacity=.55-Al(j)*.15,y.material.opacity=.32*Al((j-.35)/.5);let W=h.W/h.H,K=Al(j),tt=2.5*(f.visE/10.9),yt=Math.max(f.visA,tt/(W*.52)),at=Math.max(f.visE,tt/(W*.5)),V=w(yt+(at-yt)*K),it=f.tyA+(f.tyE-f.tyA)*K,ot=f.el;if(r.position.set(0,it+Math.sin(ot)*V,Math.cos(ot)*V),r.lookAt(0,it,0),r.updateMatrixWorld(),e.render(s,r),h.last&&j>.1&&!h.lowered&&(h.frames++,h.acc+=F-h.last-16,h.frames>45&&(h.acc/h.frames>14&&e.getPixelRatio()>1&&(e.setPixelRatio(1),e.setSize(h.W,h.H,!1),h.lowered=!0),h.frames=0,h.acc=0)),h.last=F,h.onFrame){let gt={u:j,W:h.W,H:h.H,parts:[],colX:0},et=0;m.forEach(Mt=>{let qt=l[Mt];S.set(0,p[Mt],0).project(r);let bt=(S.x*.5+.5)*h.W,Yt=(-S.y*.5+.5)*h.H;S.set(qt.rw,p[Mt],0).project(r);let Jt=(S.x*.5+.5)*h.W;et=Math.max(et,Jt),gt.parts.push({k:Mt,sx:bt,sy:Yt,edge:Jt,p:qt.p})}),gt.colX=et,h.onFrame(gt)}}function T(){h.run||(h.run=!0,h.last=0,h.raf=requestAnimationFrame(E))}function g(){h.run=!1,cancelAnimationFrame(h.raf)}function b(F,B){h.from=h.u,h.to=F,h.t0=performance.now(),h.dur=B,B||(h.u=F)}let D=0,I=0,U=0,O=0,X=0,C=0;n.style.touchAction="none",n.addEventListener("pointerdown",F=>{h.drag=!0,h.vyaw=0,D=X=F.clientX,I=C=F.clientY,U=performance.now(),O=0;try{n.setPointerCapture(F.pointerId)}catch{}}),n.addEventListener("pointermove",F=>{if(!h.drag)return;let B=F.clientX-X,j=F.clientY-C;X=F.clientX,C=F.clientY,O=Math.max(O,Math.hypot(F.clientX-D,F.clientY-I)),h.yaw=Math.max(-1.6,Math.min(1.6,h.yaw+B*.009)),h.vyaw=B*.0016,h.pitch=Math.max(-.22,Math.min(.3,h.pitch+j*.004)),h.idle=performance.now()});let q=()=>{h.drag&&(h.drag=!1,h.idle=performance.now(),O<7&&performance.now()-U<350&&h.onTap&&h.onTap())};return n.addEventListener("pointerup",q),n.addEventListener("pointercancel",()=>{h.drag=!1}),n.addEventListener("webglcontextlost",F=>{F.preventDefault(),g(),h.onLost&&h.onLost()}),{canvas:n,resize:M,start:T,stop:g,setTarget:b,get u(){return h.u},get target(){return h.to},set onFrame(F){h.onFrame=F},set onTap(F){h.onTap=F},set onLost(F){h.onLost=F},dispose(){h.onLost=null,g(),e.dispose();try{e.forceContextLoss()}catch{}n.remove()}}}export{gv as create};
