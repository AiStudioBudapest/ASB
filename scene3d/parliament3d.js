/* The Hungarian Parliament in 3D — built entirely in code (no downloaded model).
   Exterior (river front, roofs, back with the grand staircase, Kossuth square),
   plus a stylised interior (grand staircase + the domed hall with the Holy Crown).
   Scroll drives a camera that flies around the building; see PATH_* below.
   Bundled with three.js into public/alexstudio/parliament3d.js by `npm run build:3d`. */
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { buildBuilding } from './facade.js';
import { bakePBR, pbrMaterial } from './pbr.js';
import { Batch, planarUV, M4 } from './arch.js';

const TAU = Math.PI * 2;
const OFF = 2000; /* the interior lives 2 km away on X so both scenes never overlap */

function rng(seed) {
  let a = seed | 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const R = rng(20260924);
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

function canvasTex(w, h, draw, opts) {
  opts = opts || {};
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  if (opts.srgb !== false) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  if (opts.repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

/* ------------------------------------------------------------------ arches */
/* Pointed (gothic) arch outline, y up, starting at the bottom-left corner.
   hw = half width, spring = height where the curve starts, k >= 1 sharpness (1 = round). */
function archOutline(hw, spring, k, n) {
  const r = hw * k, pts = [[-hw, 0], [-hw, spring]];
  const a1 = Math.acos(clamp(hw / r - 1, -1, 1));
  for (let i = 1; i <= n; i++) {
    const th = Math.PI + (a1 - Math.PI) * (i / n);
    pts.push([-hw + r + r * Math.cos(th), spring + r * Math.sin(th)]);
  }
  for (let i = n - 1; i >= 0; i--) {
    const th = Math.PI + (a1 - Math.PI) * (i / n);
    pts.push([hw - r - r * Math.cos(th), spring + r * Math.sin(th)]);
  }
  pts.push([hw, 0]);
  return pts;
}
function archApex(hw, spring, k) { return spring + hw * Math.sqrt(2 * k - 1); }

/* A rectangular panel with pointed-arch holes cut out of it. holes = [{cx, y0, hw, spring, k}] */
function archPanel(width, height, depth, holes) {
  const s = new THREE.Shape();
  s.moveTo(-width / 2, 0); s.lineTo(width / 2, 0); s.lineTo(width / 2, height); s.lineTo(-width / 2, height); s.closePath();
  holes.forEach((h) => {
    const p = new THREE.Path();
    archOutline(h.hw, h.spring, h.k, 8).forEach((pt, i) => {
      const x = h.cx + pt[0], y = h.y0 + pt[1];
      if (i === 0) p.moveTo(x, y); else p.lineTo(x, y);
    });
    p.closePath();
    s.holes.push(p);
  });
  const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false, curveSegments: 4 });
  g.translate(0, 0, -depth / 2);
  return g;
}

/* ------------------------------------------------------------------ textures */
function glowTexture() {
  return canvasTex(128, 128, (g, w, h) => {
    const gr = g.createLinearGradient(0, 0, 0, 0);
    const rg = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    rg.addColorStop(0, 'rgba(255,255,255,1)'); rg.addColorStop(.25, 'rgba(255,255,255,.55)');
    rg.addColorStop(.6, 'rgba(255,255,255,.12)'); rg.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = rg; g.fillRect(0, 0, w, h); void gr;
  });
}

/* One 8 m bay x 36 m tall of the neo-Gothic facade: arcade, two window tiers, cornice.
   Painted twice: colour and emissive (the floodlit glow). */
function paintFacade(g, W, H, PX, emit) {
  const Y = (m) => H - m * PX;
  const cx = W / 2;
  if (!emit) {
    const gr = g.createLinearGradient(0, H, 0, 0);
    gr.addColorStop(0, '#f2c26e'); gr.addColorStop(.33, '#e0a653'); gr.addColorStop(.8, '#b07a38'); gr.addColorStop(1, '#8e5f2b');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.strokeStyle = 'rgba(90,55,20,.17)'; g.lineWidth = 1;
    for (let m = 0; m < 36; m += .9) { g.beginPath(); g.moveTo(0, Y(m)); g.lineTo(W, Y(m)); g.stroke(); }
    for (let m = 0, row = 0; m < 36; m += .9, row++) {
      for (let x = (row % 2) * 40; x < W; x += 80) { g.beginPath(); g.moveTo(x, Y(m)); g.lineTo(x, Y(m + .9)); g.stroke(); }
    }
    for (let i = 0; i < 1400; i++) {
      g.fillStyle = R() > .5 ? 'rgba(255,225,160,.07)' : 'rgba(70,40,10,.07)';
      g.fillRect(R() * W, R() * H, 1 + R() * 3, 1 + R() * 2);
    }
  } else {
    g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
    const gr = g.createLinearGradient(0, H, 0, 0);
    gr.addColorStop(0, 'rgb(118,76,28)'); gr.addColorStop(.45, 'rgb(74,46,16)'); gr.addColorStop(1, 'rgb(26,16,6)');
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
  }
  const path = (pts, ox, oy) => { g.beginPath(); pts.forEach((p, i) => { const x = ox + p[0] * PX, y = Y(oy + p[1]); if (i) g.lineTo(x, y); else g.moveTo(x, y); }); g.closePath(); };
  const fillGrad = (y0, y1, c0, c1) => { const gr = g.createLinearGradient(0, Y(y0), 0, Y(y1)); gr.addColorStop(0, c0); gr.addColorStop(1, c1); return gr; };
  const dark = 'rgba(74,44,14,.9)';

  /* ground-floor arcade: a tall glowing pointed opening with a door */
  path(archOutline(2.7, 6.2, 1.5, 10), cx, 1);
  g.fillStyle = emit ? fillGrad(1, 10, '#ffe7ae', '#ffab45') : fillGrad(1, 10, '#ffd47c', '#ff9a38'); g.fill();
  g.lineWidth = 5; g.strokeStyle = dark; g.stroke();
  path(archOutline(1.6, 3.6, 1.6, 8), cx, 1);
  g.fillStyle = emit ? '#7a4a14' : '#5f3a12'; g.fill();
  g.strokeStyle = 'rgba(255,220,150,.6)'; g.lineWidth = 2; g.stroke();
  g.strokeStyle = dark; g.lineWidth = 3; g.beginPath(); g.moveTo(cx, Y(1)); g.lineTo(cx, Y(5)); g.stroke();

  /* string course */
  g.fillStyle = emit ? 'rgb(140,96,40)' : '#f3d494'; g.fillRect(0, Y(10.6), W, .6 * PX);

  /* first-floor lancet pairs */
  [-1.75, 1.75].forEach((dx) => {
    path(archOutline(.75, 5.2, 1.5, 8), cx + dx * PX, 12);
    g.fillStyle = emit ? fillGrad(12, 19, '#fff0c0', '#ffc860') : fillGrad(12, 19, '#ffe08a', '#ffb650'); g.fill();
    g.lineWidth = 3; g.strokeStyle = dark; g.stroke();
    g.beginPath(); g.moveTo(cx + dx * PX, Y(12)); g.lineTo(cx + dx * PX, Y(17)); g.stroke();
  });
  /* quatrefoil */
  g.fillStyle = emit ? '#ffcf70' : '#ffd070';
  [[0, 21.4], [-.5, 21.4], [.5, 21.4], [0, 21.9], [0, 20.9]].forEach((q) => {
    g.beginPath(); g.arc(cx + q[0] * PX, Y(q[1]), .5 * PX, 0, TAU); g.fill();
  });
  g.strokeStyle = dark; g.lineWidth = 2; g.beginPath(); g.arc(cx, Y(21.4), .95 * PX, 0, TAU); g.stroke();
  /* second-floor small lancets */
  [-2.6, -.9, .9, 2.6].forEach((dx) => {
    path(archOutline(.42, 2.9, 1.5, 6), cx + dx * PX, 24.2);
    g.fillStyle = emit ? '#ffd78a' : '#ffd07a'; g.fill(); g.lineWidth = 2; g.strokeStyle = dark; g.stroke();
  });
  /* cornice + parapet */
  g.fillStyle = emit ? 'rgb(150,104,44)' : '#f6d590'; g.fillRect(0, Y(29.3), W, .9 * PX);
  g.fillStyle = dark;
  for (let x = 4; x < W; x += 14) g.fillRect(x, Y(29.3), 6, 5);
  for (let i = 0; i < 4; i++) {
    path(archOutline(.85, .7, 1.6, 5), 32 + i * 64, 30.4);
    g.lineWidth = 2; g.strokeStyle = dark; g.stroke();
  }
}

function drumPainter(g, w, h, emit) {
  g.fillStyle = emit ? '#2a1a08' : '#dfaa58'; g.fillRect(0, 0, w, h);
  if (!emit) {
    const gr = g.createLinearGradient(0, h, 0, 0); gr.addColorStop(0, '#f0c070'); gr.addColorStop(1, '#a87434'); g.fillStyle = gr; g.fillRect(0, 0, w, h);
  }
  const seg = w / 16;
  for (let i = 0; i < 16; i++) {
    const cx = i * seg + seg / 2, hw = seg * .18;
    g.beginPath();
    archOutline(hw, h * .48, 1.5, 8).forEach((p, j) => { const x = cx + p[0], y = h * .9 - p[1]; if (j) g.lineTo(x, y); else g.moveTo(x, y); });
    g.closePath();
    const gr = g.createLinearGradient(0, h * .9, 0, h * .12); gr.addColorStop(0, emit ? '#ffb850' : '#ff9d3a'); gr.addColorStop(1, emit ? '#fff0c0' : '#ffe08a');
    g.fillStyle = gr; g.fill(); g.lineWidth = 3; g.strokeStyle = 'rgba(74,44,14,.9)'; g.stroke();
  }
}

/* ------------------------------------------------------------------ photo projection + floodlights
   The real photo of the Parliament (the one already used as the fallback background) is projected onto
   the front-facing surfaces of the model from the point of view of the photographer: seen from the
   river the building carries real photographic detail and lighting; everything the photo cannot see
   (sides, back, roofs' far slopes) keeps the painted texture. World -> photo mapping was measured on
   the photo itself (dome, twin towers, wing ends): 3.96 px/m across, 3.85 px/m up, base at y = 655. */
const PH = { uPhoto: { value: null }, uPhotoK: { value: 0 }, uGlow: { value: .85 } };
function patchMaterial(mat, flood) {
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.uPhoto = PH.uPhoto; sh.uniforms.uPhotoK = PH.uPhotoK; sh.uniforms.uGlow = PH.uGlow;
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWP; varying vec3 vWN;')
      .replace('#include <project_vertex>', `#include <project_vertex>
        {
          vec4 wq = vec4(transformed, 1.0);
          vec3 wn = objectNormal;
          #ifdef USE_INSTANCING
            wq = instanceMatrix * wq;
            wn = mat3(instanceMatrix) * wn;
          #endif
          vWP = (modelMatrix * wq).xyz;
          vWN = normalize(mat3(modelMatrix) * wn);
        }`);
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWP; varying vec3 vWN; uniform sampler2D uPhoto; uniform float uPhotoK; uniform float uGlow;')
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        {
          ${flood ? 'totalEmissiveRadiance *= mix(1.15, 0.5, smoothstep(0.0, 70.0, vWP.y));' : ''}
          vec2 puv = vec2((990.0 + vWP.x * 3.96) / 2000.0, 1.0 - (655.0 - vWP.y * 3.85) / 948.0);
          float pw = 0.0; vec3 pc = vec3(0.0);
          if (uPhotoK > 0.0 && puv.x > 0.0 && puv.x < 1.0 && puv.y > 0.0 && puv.y < 1.0) {
            vec4 ph = texture2D(uPhoto, puv);
            pw = ph.a * smoothstep(0.25, 0.75, abs(vWN.z)) * uPhotoK;
            pc = ph.rgb;
          }
          diffuseColor.rgb *= (1.0 - pw);
          totalEmissiveRadiance = mix(totalEmissiveRadiance, pc * uGlow, pw);
        }`);
  };
  mat.customProgramCacheKey = () => 'ph' + (flood ? 'f' : 'n');
  return mat;
}
function setupPhoto(img) {
  const w = img.naturalWidth, h = img.naturalHeight;
  if (!w) return;
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d', { willReadFrequently: true }); g.drawImage(img, 0, 0);
  const d = g.getImageData(0, 0, w, h), a = d.data;
  for (let y = 0; y < h; y++) {
    const r = clamp((y / h - .585) / .035, 0, 1), rr = r * r * (3 - 2 * r);
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4, t = clamp(((a[i + 2] - a[i]) / 255 - .065) / .07, 0, 1), sky = t * t * (3 - 2 * t);
      a[i + 3] = Math.round(255 * Math.max(1 - sky, rr));
    }
  }
  g.putImageData(d, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 8;
  PH.uPhoto.value = tex; PH.uPhotoK.value = 1;
}

/* ------------------------------------------------------------------ night sky (baked once into a cube map)
   Milky Way band with dust lanes, layered stars, soft clouds lit purple by the city, warm horizon glow. */
const SKY_FS = `
varying vec3 vD;
float h13(vec3 p){ p=fract(p*.1031); p+=dot(p,p.zyx+31.32); return fract((p.x+p.y)*p.z); }
float n3(vec3 x){ vec3 i=floor(x); vec3 f=fract(x); f=f*f*(3.-2.*f);
  return mix(mix(mix(h13(i),h13(i+vec3(1,0,0)),f.x),mix(h13(i+vec3(0,1,0)),h13(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(h13(i+vec3(0,0,1)),h13(i+vec3(1,0,1)),f.x),mix(h13(i+vec3(0,1,1)),h13(i+vec3(1,1,1)),f.x),f.y),f.z); }
float fbm(vec3 p){ float a=.5,s=0.; for(int i=0;i<5;i++){ s+=a*n3(p); p=p*2.03+vec3(1.7,9.2,3.1); a*=.5; } return s; }
vec3 stars(vec3 d,float N,float th,float sz,float boost){
  vec3 p=d*N; vec3 c=floor(p); vec3 f=p-c; float h=h13(c);
  if(h<th) return vec3(0.);
  vec3 o=vec3(h13(c+7.1),h13(c+13.7),h13(c+3.3))*.7+.15;
  float dd=length(f-o);
  float amp=pow((h-th)/(1.-th),2.2);
  vec3 col=mix(vec3(.65,.78,1.),vec3(1.,.82,.55),h13(c+21.));
  return col*pow(smoothstep(sz,0.,dd),2.)*amp*boost;
}
void main(){
  vec3 d=normalize(vD); float e=d.y;
  float glow=pow(clamp(1.-abs(e),0.,1.),6.);
  vec3 col=mix(vec3(.0016,.0030,.0110),vec3(.0042,.0075,.0230),smoothstep(-.1,.5,e))+vec3(.050,.030,.022)*glow*step(-.06,e);
  vec3 n=normalize(vec3(.284,-.898,-.335));
  float b=dot(d,n), band=exp(-b*b/(2.*.15*.15));
  float cen=pow(max(dot(d,normalize(vec3(.95,.3,0.)))*.5+.5,0.),5.);
  float dens=fbm(d*3.2+vec3(2.,0.,1.));
  float dust=smoothstep(.48,.7,fbm(d*5.5+vec3(7.,3.,1.)));
  float mw=band*(.3+1.0*dens)*(1.-.78*dust);
  col+=mix(vec3(.30,.36,.66),vec3(.95,.66,.42),cen)*mw*.20;
  float vis=smoothstep(-.02,.07,e);
  vec3 st=stars(d,90.,.965-.03*band,.16,7.)+stars(d,180.,.95-.05*band,.15,5.)+stars(d,340.,.94-.07*band,.17,3.5)+stars(d,640.,.94-.10*band,.18,2.);
  float cl=smoothstep(.56,.84,fbm(vec3(d.xz/(e+.4)*1.25,.5)));
  cl*=smoothstep(.02,.16,e)*(1.-smoothstep(.55,.9,e));
  vec3 clc=vec3(.16,.10,.17)*(.5+1.4*glow)+vec3(.012,.012,.02);
  col=mix(col+st*vis*(1.-cl*.9),clc,cl*.65);
  gl_FragColor=vec4(col,1.);
}`;
function bakeSky(renderer, size, hdr) {
  const sc = new THREE.Scene();
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false,
    vertexShader: 'varying vec3 vD; void main(){ vD=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
    fragmentShader: SKY_FS
  });
  sc.add(new THREE.Mesh(new THREE.SphereGeometry(10, 48, 24), mat));
  const rt = new THREE.WebGLCubeRenderTarget(size, { type: hdr ? THREE.HalfFloatType : THREE.UnsignedByteType, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter });
  new THREE.CubeCamera(.1, 100, rt).update(renderer, sc);
  mat.dispose();
  return rt.texture;
}

/* ------------------------------------------------------------------ river: real planar reflection with ripples */
const REFLECT_SHADER = {
  name: 'ParliamentWater',
  uniforms: { color: { value: null }, tDiffuse: { value: null }, textureMatrix: { value: null }, uTime: { value: 0 } },
  vertexShader: `uniform mat4 textureMatrix; varying vec4 vUv; varying vec3 vW;
    void main(){ vUv=textureMatrix*vec4(position,1.); vec4 w=modelMatrix*vec4(position,1.); vW=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }`,
  fragmentShader: `uniform vec3 color; uniform sampler2D tDiffuse; uniform float uTime; varying vec4 vUv; varying vec3 vW;
    void main(){
      vec3 V=cameraPosition-vW; float dist=length(V); V/=dist;
      vec2 p=vW.xz;
      float a=sin(p.x*.42+uTime*.7+sin(p.y*.11+uTime*.25)*2.);
      float b=sin(p.y*.6-uTime*.9+p.x*.17);
      float c=sin((p.x+p.y)*1.3+uTime*1.6)*.5+sin((p.x-p.y)*1.9-uTime*1.3)*.5;
      vec2 n=vec2(a*.6+c*.4,b*.6+c*.3);
      float amp=.0018+.0022*clamp(dist/200.,0.,2.);
      vec2 uv=vUv.xy/vUv.w+n*amp;
      vec3 refl=(texture2D(tDiffuse,uv+vec2(.0014,0.)).rgb+texture2D(tDiffuse,uv-vec2(.0014,0.)).rgb+texture2D(tDiffuse,uv+vec2(0.,.0014)).rgb+texture2D(tDiffuse,uv-vec2(0.,.0014)).rgb)*.25;
      float fres=.05+.95*pow(1.-clamp(V.y,0.,1.),4.);
      vec3 deep=vec3(.003,.006,.017);
      vec3 col=mix(deep,refl*.9,clamp(fres*1.7+.14,0.,1.));
      float glint=pow(max(0.,dot(normalize(vec3(n.x*.35,1.,n.y*.35)),V)),70.);
      col+=vec3(1.,.72,.42)*glint*.10;
      float f=1.-exp(-pow(.0011*dist,2.));
      col=mix(col,vec3(.006,.006,.011),f*.6);
      gl_FragColor=vec4(col,1.);
    }`
};

/* ------------------------------------------------------------------ lens: aberration, vignette, grain, cool shadows */
const GRADE_SHADER = {
  uniforms: { tDiffuse: { value: null }, uTime: { value: 0 }, uVig: { value: .5 }, uGrain: { value: .018 }, uCA: { value: .0016 } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
  fragmentShader: `uniform sampler2D tDiffuse; uniform float uTime,uVig,uGrain,uCA; varying vec2 vUv;
    void main(){
      vec2 c=vUv-.5; float r2=dot(c,c); vec2 off=c*r2*uCA*8.;
      vec3 col=vec3(texture2D(tDiffuse,vUv+off).r,texture2D(tDiffuse,vUv).g,texture2D(tDiffuse,vUv-off).b);
      col*=1.-uVig*smoothstep(.10,.62,r2*2.0);
      float l=dot(col,vec3(.299,.587,.114));
      col=mix(col,col*vec3(.90,.98,1.12),smoothstep(.30,0.,l));
      float g=fract(sin(dot(vUv*1000.+fract(uTime)*97.,vec2(12.9898,78.233)))*43758.5453);
      col+=(g-.5)*uGrain*(.25+.75*smoothstep(1.,.0,l));
      gl_FragColor=vec4(max(col,0.),1.);
    }`
};

/* ------------------------------------------------------------------ materials */
function makeMaterials() {
  return {
    stone: new THREE.MeshStandardMaterial({ color: 0xcfa866, roughness: .7, emissive: 0x3a230a }),
    stoneLight: new THREE.MeshStandardMaterial({ color: 0xe9cf95, roughness: .7, emissive: 0x3a230a }),
    gold: new THREE.MeshStandardMaterial({ color: 0xf3c15a, emissive: 0x7a5010, roughness: .35, metalness: .7 }),
    dome: new THREE.MeshStandardMaterial({ color: 0xd9a24a, emissive: 0x4a2c08, roughness: .5, metalness: .3 })
  };
}

/* floodlights sit at the foot of the building: light fades with height, with a gentle horizontal unevenness */
function floodPatch(mat, top, bottom, grime) {
  mat.onBeforeCompile = (sh) => {
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', `#include <common>
varying vec3 vWP;`)
      .replace('#include <project_vertex>', `#include <project_vertex>
{
  vec4 wq = vec4(transformed, 1.0);
  #ifdef USE_INSTANCING
    wq = instanceMatrix * wq;
  #endif
  vWP = (modelMatrix * wq).xyz;
}`);
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec3 vWP;`)
      .replace('#include <color_fragment>', `#include <color_fragment>
${grime ? `{
  float n1 = sin(vWP.x * 1.7) * sin(vWP.y * 0.9 + vWP.z * 1.3);
  float streak = smoothstep(0.55, 1.0, sin(vWP.x * 2.3 + sin(vWP.y * 0.31 + vWP.z) * 2.6) * 0.5 + 0.5) * smoothstep(60.0, 0.0, vWP.y);
  float soot = smoothstep(18.0, 48.0, vWP.y) * 0.14;
  diffuseColor.rgb *= 1.0 - 0.1 * streak - soot + 0.05 * n1;
}` : ''}`)
      .replace('#include <opaque_fragment>', `outgoingLight *= mix(${bottom.toFixed(2)}, ${top.toFixed(2)}, smoothstep(0.0, 100.0, vWP.y)) * (0.92 + 0.16 * sin(vWP.x * 0.23 + vWP.z * 0.17) * sin(vWP.z * 0.31 + vWP.y * 0.05));
#include <opaque_fragment>`);
  };
  mat.customProgramCacheKey = () => 'flood' + top + bottom + (grime ? 'g' : '');
  return mat;
}

/* PBR set with its own UV repeat (for plain plane/cylinder UVs) */
function tiledMaterial(set, rx, ry, params, normal) {
  const cl = (t) => { const c = t.clone(); c.repeat.set(rx, ry); c.wrapS = c.wrapT = THREE.RepeatWrapping; c.needsUpdate = true; return c; };
  return pbrMaterial({ map: cl(set.map), normalMap: cl(set.normalMap), orm: cl(set.orm) }, { normal: normal || 1, params });
}

/* a warm floodlit environment for reflections on gold, glass and wet stone (PMREM of a small gradient scene) */
function warmEnv(renderer) {
  const sc = new THREE.Scene();
  sc.add(new THREE.Mesh(new THREE.SphereGeometry(10, 32, 16), new THREE.ShaderMaterial({
    side: THREE.BackSide,
    vertexShader: 'varying vec3 vD; void main(){ vD=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
    fragmentShader: `varying vec3 vD; void main(){
      vec3 d=normalize(vD); float e=d.y;
      vec3 sky=mix(vec3(.012,.022,.06),vec3(.002,.004,.016),smoothstep(0.,.8,e));
      vec3 warm=vec3(1.5,.78,.3)*exp(-pow((e+.02)/.24,2.));
      vec3 ground=vec3(.55,.30,.11)*1.5*smoothstep(.1,-.5,e);
      gl_FragColor=vec4(sky+warm+ground,1.); }`
  })));
  const pm = new THREE.PMREMGenerator(renderer);
  const t = pm.fromScene(sc, .02).texture; pm.dispose();
  return t;
}

/* ------------------------------------------------------------------ exterior */
function buildExterior(mobile, reflect, ctx) {
  const g = new THREE.Group();
  const M = makeMaterials();
  const bm = ctx.mats;
  const glow = glowTexture();
  const updaters = [];

  const add = (o, x, y, z) => { if (x !== undefined) o.position.set(x, y, z); g.add(o); return o; };

  /* ---------- ground: square (back), promenade, quay, river ---------- */
  const groundGeo = new THREE.PlaneGeometry(3200, 1500);
  groundGeo.rotateX(-Math.PI / 2);
  const ground = new THREE.Mesh(groundGeo, tiledMaterial(ctx.sets.paving, 3200 / 1.5, 1500 / 1.5, { color: 0xc8ccd8, envMapIntensity: .8, emissive: 0x1a1108, emissiveIntensity: 1 }, 1.2)); ground.position.set(0, -.06, -710); ground.receiveShadow = false; g.add(ground); /* z -1460 .. 40 */
  const quay = new THREE.Mesh(new THREE.BoxGeometry(3200, 2.6, 3), new THREE.MeshStandardMaterial({ color: 0x252b3e, roughness: 1, emissive: 0x07090f }));
  quay.position.set(0, -1.3, 40.5); g.add(quay);
  /* lit promenade band in front of the building */
  const promGeo = new THREE.PlaneGeometry(300, 16); promGeo.rotateX(-Math.PI / 2);
  const prom = new THREE.Mesh(promGeo, new THREE.MeshBasicMaterial({ map: glow, color: 0x8a5a1c, transparent: true, opacity: .55, depthWrite: false, fog: false }));
  prom.position.set(0, .02, 32); g.add(prom);
  /* Kossuth square glow */
  const sqGeo = new THREE.PlaneGeometry(190, 130); sqGeo.rotateX(-Math.PI / 2);
  const sq = new THREE.Mesh(sqGeo, new THREE.MeshBasicMaterial({ map: glow, color: 0x6b4514, transparent: true, opacity: .5, depthWrite: false, fog: false }));
  sq.position.set(0, .02, -110); g.add(sq);

  /* river: dark water that glows gold under the floodlit facade */
  const waterMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: 'varying vec3 vW; void main(){ vec4 w=modelMatrix*vec4(position,1.); vW=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }',
    fragmentShader: [
      'uniform float uTime; varying vec3 vW;',
      'float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
      'void main(){',
      ' float d=max(vW.z-41.0,0.0);',
      ' float ax=abs(vW.x);',
      ' float prof=smoothstep(150.0,118.0,ax)*(0.55+0.45*exp(-pow(vW.x/70.0,2.0)));',
      ' float tall=exp(-pow(vW.x/30.0,2.0));',
      ' float w1=sin(vW.x*0.8+sin(vW.z*0.05-uTime*0.5)*4.0+uTime*0.3);',
      ' float w2=sin(vW.x*1.9+vW.z*0.04+uTime*0.9);',
      ' float crest=0.65+0.35*sin(vW.z*0.22-uTime*1.1+w1*2.0);',
      ' float stripe=pow(clamp(0.5+0.34*w1+0.16*w2,0.0,1.0),1.8)*crest;',
      ' float refl=prof*exp(-d*0.014)+tall*0.7*exp(-d*0.008);',
      ' vec3 base=vec3(0.006,0.011,0.030);',
      ' vec3 gold=vec3(1.0,0.58,0.16);',
      ' vec3 col=base+gold*refl*(0.18+1.1*stripe)*1.15;',
      ' float spark=step(0.985,h(floor(vec2(vW.x*0.5,vW.z*0.8)+floor(uTime*2.0))))*refl;',
      ' col+=vec3(1.0,0.8,0.5)*spark*0.8;',
      ' float dist=length(vW-cameraPosition);',
      ' float f=1.0-exp(-pow(0.0011*dist,2.0));',
      ' col=mix(col,vec3(0.0018,0.0030,0.0116),f);',
      ' gl_FragColor=vec4(col,1.0);',
      ' #include <tonemapping_fragment>',
      ' #include <colorspace_fragment>',
      '}'
    ].join('\n')
  });
  const waterGeo = new THREE.PlaneGeometry(3200, 1500); waterGeo.rotateX(-Math.PI / 2);
  const water = new THREE.Mesh(waterGeo, waterMat); water.position.set(0, -2.6, 42 + 750); g.add(water);
  updaters.push((t) => { waterMat.uniforms.uTime.value = t; });
  let reflector = null;
  if (reflect) {
    reflector = new Reflector(new THREE.PlaneGeometry(3200, 1500), { textureWidth: 2048, textureHeight: 1024, clipBias: .003, shader: REFLECT_SHADER, color: 0x0a1020, multisample: 0 });
    reflector.rotation.x = -Math.PI / 2; reflector.position.set(0, -2.6, 42 + 750); g.add(reflector);
    water.visible = false;
    updaters.push((t) => { reflector.material.uniforms.uTime.value = t; });
  }

  /* ---------- the building (see facade.js) ---------- */
  g.add(buildBuilding(bm, { mobile, rand: R }));

  /* ---------- back: grand stairs, lions, flags ---------- */
  const stairsB = new Batch();
  for (let i = 0; i < 8; i++) { const hh = (8 - i) * .18; stairsB.add(new THREE.BoxGeometry(46, hh, 2), M4(0, hh / 2, -53 - i * 2)); }
  [-20, 20].forEach((lx) => {
    stairsB.add(new THREE.BoxGeometry(4, 3, 7), M4(lx, 1.5, -62));
    stairsB.add(new THREE.BoxGeometry(2.6, 2.2, 5), M4(lx, 4.1, -62));
    stairsB.add(new THREE.SphereGeometry(1.5, 10, 8), M4(lx, 5.3, -59.4));
  });
  const stairsMesh = stairsB.mesh(bm.stone, 1.5); stairsMesh.castShadow = stairsMesh.receiveShadow = true; g.add(stairsMesh);
  /* flags */
  const flagTex = canvasTex(64, 48, (c, w, h) => { c.fillStyle = '#ce2939'; c.fillRect(0, 0, w, h / 3); c.fillStyle = '#f4f4f0'; c.fillRect(0, h / 3, w, h / 3); c.fillStyle = '#477050'; c.fillRect(0, 2 * h / 3, w, h / 3); });
  const flags = [];
  [-34, 0, 34].forEach((fx) => {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(.18, .22, 34, 6), bm.gold); pole.position.set(fx, 17, -82); pole.castShadow = true; g.add(pole);
    const geo = new THREE.PlaneGeometry(9, 6, 16, 8); geo.translate(4.5, 0, 0);
    const fm = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: flagTex, side: THREE.DoubleSide, emissive: 0xffffff, emissiveMap: flagTex, emissiveIntensity: .3, roughness: 1 }));
    fm.position.set(fx + .2, 30, -82); g.add(fm);
    flags.push({ mesh: fm, base: geo.attributes.position.array.slice(), phase: fx * .3 });
  });
  updaters.push((t) => {
    flags.forEach((f) => {
      const pos = f.mesh.geometry.attributes.position, a = pos.array;
      for (let i = 0; i < a.length; i += 3) {
        const x = f.base[i], y = f.base[i + 1];
        a[i + 2] = Math.sin(x * .9 - t * 3.2 + y * .5 + f.phase) * .9 * (x / 9);
        a[i + 1] = y + Math.sin(x * .7 - t * 2.4 + f.phase) * .25 * (x / 9);
      }
      pos.needsUpdate = true;
    });
  });

  /* ---------- lamps along the promenade + glow points ---------- */
  const lampPts = [], lampCol = [];
  for (let x = -260; x <= 260; x += 9) { lampPts.push(x, 3.4, 37); lampCol.push(1, .72, .38); }
  for (let z = -60; z >= -240; z -= 12) { [-70, -46, 46, 70].forEach((x) => { lampPts.push(x, 3.4, z); lampCol.push(1, .72, .38); }); }
  const lampGeo = new THREE.BufferGeometry();
  lampGeo.setAttribute('position', new THREE.Float32BufferAttribute(lampPts, 3));
  lampGeo.setAttribute('color', new THREE.Float32BufferAttribute(lampCol, 3));
  g.add(new THREE.Points(lampGeo, new THREE.PointsMaterial({ size: 5, map: glow, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false })));

  /* ---------- surroundings: Pest behind, Buda across the river, a bridge ---------- */
  const nCity = mobile ? 110 : 230;
  const winC = canvasTex(512, 512, (c, w, h) => {
    c.fillStyle = '#3a3f52'; c.fillRect(0, 0, w, h);
    for (let i = 0; i < 700; i++) { c.fillStyle = 'rgba(' + (R() > .5 ? '255,255,255' : '0,0,0') + ',.03)'; c.fillRect(R() * w, R() * h, 4 + R() * 12, 4 + R() * 12); }
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) { c.fillStyle = '#12151f'; c.fillRect(x * 64 + 14, y * 64 + 12, 30, 38); }
  });
  const winE = canvasTex(512, 512, (c, w, h) => {
    c.fillStyle = '#000'; c.fillRect(0, 0, w, h);
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) if (R() < .5) { const k = .55 + R() * .45; c.fillStyle = 'rgb(' + Math.round(255 * k) + ',' + Math.round(190 * k) + ',' + Math.round(96 * k) + ')'; c.fillRect(x * 64 + 14, y * 64 + 12, 30, 38); }
  });
  const cityB = new Batch();
  for (let i = 0; i < nCity; i++) {
    const w = 16 + R() * 26, d = 16 + R() * 26, h = 14 + R() * 34;
    let x, z;
    for (let tries = 0; tries < 20; tries++) {
      const side = R();
      if (side < .6) { x = (R() - .5) * 1400; z = -280 - R() * 560; }
      else { x = (R() < .5 ? -1 : 1) * (175 + R() * 520); z = -230 + R() * 240; }
      if (!(Math.abs(x) < 230 && z > -330) && !(z > 8 && Math.abs(x) < 400)) break;
    }
    cityB.add(new THREE.BoxGeometry(w, h, d), M4(x, h / 2, z));
  }
  const cityMesh = cityB.mesh(new THREE.MeshStandardMaterial({ map: winC, emissiveMap: winE, emissive: 0xffffff, emissiveIntensity: 1.3, roughness: .9, color: 0x9aa0b8 }), 24);
  g.add(cityMesh);

  /* Buda hills and castle */
  const hillShape = new THREE.Shape();
  hillShape.moveTo(-1600, 0);
  for (let x = -1600; x <= 1600; x += 100) hillShape.lineTo(x, 40 + 60 * Math.sin(x * .004 + 1) + 30 * Math.sin(x * .011) + (Math.abs(x - 260) < 320 ? 50 : 0));
  hillShape.lineTo(1600, 0); hillShape.closePath();
  const hills = new THREE.Mesh(new THREE.ShapeGeometry(hillShape), new THREE.MeshBasicMaterial({ color: 0x080d1c, side: THREE.DoubleSide }));
  hills.position.set(0, -2, 760); hills.rotation.y = Math.PI; g.add(hills);
  const castleB = new Batch(); castleB.add(new THREE.BoxGeometry(220, 30, 40), M4(-260, 100, 700));
  const castle = castleB.mesh(bm.stone, 6); g.add(castle);
  const cdome = new THREE.Mesh(new THREE.SphereGeometry(20, 14, 8, 0, TAU, 0, Math.PI / 2), M.dome); cdome.position.set(-260, 115, 700); g.add(cdome);
  const budaLights = [], budaCol = [];
  for (let x = -1400; x <= 1400; x += 14) { budaLights.push(x, 4, 690 + R() * 20); budaCol.push(1, .7, .35); }
  const budaGeo = new THREE.BufferGeometry();
  budaGeo.setAttribute('position', new THREE.Float32BufferAttribute(budaLights, 3));
  budaGeo.setAttribute('color', new THREE.Float32BufferAttribute(budaCol, 3));
  g.add(new THREE.Points(budaGeo, new THREE.PointsMaterial({ size: 9, map: glow, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false })));
  /* bridge */
  const deck = new THREE.Mesh(new THREE.BoxGeometry(14, 3, 660), new THREE.MeshStandardMaterial({ color: 0x1b2135, roughness: 1, emissive: 0x080b14 }));
  deck.position.set(-540, 8, 380); g.add(deck);
  const bpts = [];
  for (let z = 60; z <= 690; z += 10) { bpts.push(-546.5, 11, z, -533.5, 11, z); }
  for (let z = 90; z <= 650; z += 110) {
    const pier = new THREE.Mesh(new THREE.CylinderGeometry(4, 5, 12, 8), M.stone); pier.position.set(-540, 1, z); g.add(pier);
  }
  const bGeo = new THREE.BufferGeometry(); bGeo.setAttribute('position', new THREE.Float32BufferAttribute(bpts, 3));
  g.add(new THREE.Points(bGeo, new THREE.PointsMaterial({ size: 6, map: glow, color: 0xffc46a, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false })));

  /* ---------- the sightseeing boat ---------- */
  const boat = new THREE.Group();
  const winStrip = canvasTex(512, 64, (c, w, h) => {
    c.fillStyle = '#e9edf3'; c.fillRect(0, 0, w, h);
    for (let i = 0; i < 22; i++) { c.fillStyle = '#1a2233'; c.fillRect(10 + i * 22.6, 14, 17, 30); }
  });
  const winStripE = canvasTex(512, 64, (c, w, h) => {
    c.fillStyle = '#000'; c.fillRect(0, 0, w, h);
    for (let i = 0; i < 22; i++) { const k = .7 + R() * .3; c.fillStyle = 'rgb(' + Math.round(255 * k) + ',' + Math.round(196 * k) + ',' + Math.round(110 * k) + ')'; c.fillRect(10 + i * 22.6, 14, 17, 30); }
  });
  const hullShape = new THREE.Shape();
  hullShape.moveTo(-18, -3.6); hullShape.lineTo(13, -3.6); hullShape.quadraticCurveTo(18.5, -2.4, 20, 0); hullShape.quadraticCurveTo(18.5, 2.4, 13, 3.6); hullShape.lineTo(-18, 3.6); hullShape.closePath();
  const hullGeo = new THREE.ExtrudeGeometry(hullShape, { depth: 2.4, bevelEnabled: true, bevelSize: .25, bevelThickness: .25, bevelSegments: 2, curveSegments: 10 });
  hullGeo.rotateX(-Math.PI / 2);
  const hull = new THREE.Mesh(hullGeo, new THREE.MeshStandardMaterial({ color: 0x141c33, roughness: .35, metalness: .3 })); hull.position.y = -.6; boat.add(hull);
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(37, .35, 7.4), new THREE.MeshStandardMaterial({ color: 0xd9dde6, roughness: .5 })); stripe.position.y = 1.9; stripe.scale.x = 1; boat.add(stripe);
  const mkDeck = (w, h, d, y, x) => {
    const m = new THREE.MeshStandardMaterial({ map: winStrip, emissiveMap: winStripE, emissive: 0xffffff, emissiveIntensity: 1.2, roughness: .5, color: 0xffffff });
    const dk = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), [m, m, new THREE.MeshStandardMaterial({ color: 0xe6e9f0, roughness: .6 }), new THREE.MeshStandardMaterial({ color: 0x222 }), m, m]);
    dk.position.set(x, y, 0); boat.add(dk);
  };
  mkDeck(29, 2.7, 6.6, 3.5, -2); mkDeck(19, 2.5, 5.4, 6.2, -4);
  const funnel = new THREE.Mesh(new THREE.CylinderGeometry(.9, 1.1, 3.4, 12), new THREE.MeshStandardMaterial({ color: 0xc8202f, roughness: .5 })); funnel.position.set(-9, 9, 0); boat.add(funnel);
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(.08, .1, 6, 5), new THREE.MeshStandardMaterial({ color: 0xdddddd })); mast.position.set(9, 8.5, 0); boat.add(mast);
  const bh = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: 0xffc46a, blending: THREE.AdditiveBlending, transparent: true, opacity: .4, depthWrite: false, fog: false })); bh.scale.set(56, 22, 1); bh.position.y = 3.5; boat.add(bh);
  boat.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.receiveShadow = false; } });
  boat.scale.setScalar(.85); boat.position.set(0, -2.2, 104); g.add(boat);
  updaters.push((t) => {
    const p = ((t * 3.6 + 330) % 720) - 360; boat.position.x = p; boat.position.y = -2.0 + Math.sin(t * .9) * .18; boat.rotation.z = Math.sin(t * .7) * .012;
  });

  /* ---------- fireworks over the Danube ---------- */
  const FW = mobile ? 0 : 1100;
  let fw = null;
  if (FW) {
    const pos = new Float32Array(FW * 3), col = new Float32Array(FW * 3), vel = new Float32Array(FW * 3), life = new Float32Array(FW);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const pts = new THREE.Points(geo, new THREE.PointsMaterial({ size: 4.2, map: glow, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }));
    pts.frustumCulled = false; g.add(pts);
    fw = { pos, col, vel, life, geo, next: 3, head: 0, base: new Float32Array(FW * 3) };
    fw.burst = (cx, cy, cz, r, gc, b) => {
      for (let n = 0; n < 220; n++) {
        const i = fw.head; fw.head = (fw.head + 1) % FW;
        const th = R() * TAU, ph = Math.acos(2 * R() - 1), sp = 24 + R() * 22;
        pos[i * 3] = cx; pos[i * 3 + 1] = cy; pos[i * 3 + 2] = cz;
        vel[i * 3] = Math.sin(ph) * Math.cos(th) * sp; vel[i * 3 + 1] = Math.cos(ph) * sp; vel[i * 3 + 2] = Math.sin(ph) * Math.sin(th) * sp;
        fw.base[i * 3] = r; fw.base[i * 3 + 1] = gc; fw.base[i * 3 + 2] = b; life[i] = 1.6 + R() * .5;
      }
    };
    updaters.push((t, dt, active) => {
      if (!active) return;
      fw.next -= dt;
      if (fw.next < 0) {
        fw.next = 3.5 + R() * 5;
        const pal = [[1, .3, .3], [.4, .8, 1], [1, .85, .3], [.6, 1, .5], [1, .5, 1]][Math.floor(R() * 5)];
        fw.burst((R() - .5) * 340, 95 + R() * 70, 150 + R() * 150, pal[0], pal[1], pal[2]);
      }
      for (let i = 0; i < FW; i++) {
        if (life[i] <= 0) { col[i * 3] = col[i * 3 + 1] = col[i * 3 + 2] = 0; continue; }
        life[i] -= dt; vel[i * 3 + 1] -= 16 * dt;
        const k = Math.max(0, life[i]) / 2.0;
        pos[i * 3] += vel[i * 3] * dt; pos[i * 3 + 1] += vel[i * 3 + 1] * dt; pos[i * 3 + 2] += vel[i * 3 + 2] * dt;
        vel[i * 3] *= .985; vel[i * 3 + 2] *= .985;
        col[i * 3] = fw.base[i * 3] * k; col[i * 3 + 1] = fw.base[i * 3 + 1] * k; col[i * 3 + 2] = fw.base[i * 3 + 2] * k;
      }
      geo.attributes.position.needsUpdate = true; geo.attributes.color.needsUpdate = true;
    });
  }

  /* ---------- lights: warm floodlights raking the front and the back, soft shadows ---------- */
  g.add(new THREE.HemisphereLight(0x4a5fae, 0x100c18, .3));
  const lights = {};
  const flood = (name, color, k, x, y, z, shadow) => {
    const l = new THREE.DirectionalLight(color, k); l.position.set(x, y, z); l.target.position.set(0, 28, 0);
    l.shadow.mapSize.set(mobile ? 1024 : 2048, mobile ? 1024 : 2048);
    const c = l.shadow.camera; c.left = -160; c.right = 160; c.top = 90; c.bottom = -38; c.near = 5; c.far = 460;
    l.shadow.bias = -.0006; l.shadow.normalBias = .5; l.shadow.radius = 3;
    g.add(l, l.target); if (shadow) lights[name] = l;
    return l;
  };
  flood('key', 0xff9a2e, 1.55, -70, 16, 240, true);
  flood('back', 0xff9530, 1.45, 60, 16, -240, true);
  flood('fill', 0xffb060, .3, 150, 20, 180, false);
  flood('sideA', 0xffb066, .35, 320, 50, 0, false);
  flood('sideB', 0xffb066, .35, -320, 50, 0, false);

  return { group: g, water, reflector, lights, update(t, dt, active) { updaters.forEach((u) => u(t, dt, active)); } };
}

/* ------------------------------------------------------------------ interior */
function buildInterior(mobile, ctx) {
  const g = new THREE.Group(); g.position.set(OFF, 0, 0);
  const glow = glowTexture();
  const veins = canvasTex(512, 512, (c, w, h) => {
    c.fillStyle = '#eadfc4'; c.fillRect(0, 0, w, h);
    for (let i = 0; i < 260; i++) { c.fillStyle = R() > .5 ? 'rgba(160,130,90,.05)' : 'rgba(255,250,235,.06)'; c.beginPath(); c.arc(R() * w, R() * h, 10 + R() * 60, 0, TAU); c.fill(); }
    for (let i = 0; i < 46; i++) {
      c.strokeStyle = 'rgba(110,90,62,' + (.12 + R() * .2) + ')'; c.lineWidth = .6 + R() * 1.8; c.beginPath();
      let x = R() * w, y = R() * h; c.moveTo(x, y);
      for (let k = 0; k < 7; k++) { x += (R() - .5) * 120; y += 30 + R() * 60; c.lineTo(x, y); }
      c.stroke();
    }
  }, { repeat: true });
  veins.repeat.set(.22, .22);
  void veins;
  const marble = tiledMaterial(ctx.sets.stone, 1 / 1.5, 1 / 1.5, { color: 0xc9b795, roughness: 1, envMapIntensity: .5 });
  const marblePier = tiledMaterial(ctx.sets.stone, 4, 12, { color: 0xc9b795, envMapIntensity: .5 });
  const aoTex = canvasTex(64, 64, (c, w, h) => { const rg = c.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2); rg.addColorStop(0, 'rgba(0,0,0,.65)'); rg.addColorStop(1, 'rgba(0,0,0,0)'); c.fillStyle = rg; c.fillRect(0, 0, w, h); });
  const aoMat = new THREE.MeshBasicMaterial({ map: aoTex, transparent: true, depthWrite: false });
  const aoGeo = new THREE.PlaneGeometry(1, 1); aoGeo.rotateX(-Math.PI / 2);
  const decal = (x, z, sz) => { const m = new THREE.Mesh(aoGeo, aoMat); m.scale.set(sz, 1, sz); m.position.set(x, .04, z); g.add(m); };
  const gold = new THREE.MeshStandardMaterial({ color: 0xf2c65e, emissive: 0xb07a1c, emissiveIntensity: 1.1, roughness: .35, metalness: .35 });
  const bronze = new THREE.MeshStandardMaterial({ color: 0xb98a3c, emissive: 0x5a3a0a, emissiveIntensity: .8, roughness: .5, metalness: .3 });
  const updaters = [];

  /* vault texture: blue with golden shells and stars, one panel per 1/16 */
  const vaultPaint = (emit) => (c, w, h) => {
    c.fillStyle = emit ? '#0b0f26' : '#16256a'; c.fillRect(0, 0, w, h);
    c.strokeStyle = emit ? '#ffcf70' : '#f2c65e'; c.lineWidth = 3;
    for (let y = 30; y < h; y += 48) {
      for (let x = 0; x < w; x += 64) { c.beginPath(); c.arc(x + (y / 48 % 2) * 32, y, 22, 0, Math.PI, true); c.stroke(); }
    }
    c.fillStyle = emit ? '#ffe9a8' : '#ffd77a';
    for (let i = 0; i < 40; i++) { c.beginPath(); c.arc(R() * w, R() * h, 1.5 + R() * 2, 0, TAU); c.fill(); }
  };
  const vaultMap = canvasTex(256, 512, vaultPaint(false), { repeat: true });
  const vaultEm = canvasTex(256, 512, vaultPaint(true), { repeat: true });
  [vaultMap, vaultEm].forEach((t) => t.repeat.set(16, 1));
  const vaultMat = new THREE.MeshStandardMaterial({ map: vaultMap, emissiveMap: vaultEm, emissive: 0xffffff, emissiveIntensity: .9, roughness: .8, side: THREE.DoubleSide });

  /* ---- floor of the domed hall ---- */
  const floorTex = canvasTex(1024, 1024, (c, w, h) => {
    c.fillStyle = '#e7d9b6'; c.fillRect(0, 0, w, h);
    c.strokeStyle = 'rgba(120,90,40,.25)'; c.lineWidth = 1;
    for (let i = 0; i <= 16; i++) { c.beginPath(); c.moveTo(i * 64, 0); c.lineTo(i * 64, h); c.moveTo(0, i * 64); c.lineTo(w, i * 64); c.stroke(); }
    const cx = w / 2, cy = h / 2;
    [[470, '#7a1414'], [430, '#e7d9b6'], [420, '#c99a3a'], [330, '#7a1414'], [300, '#e7d9b6'], [290, '#c99a3a']].forEach((r) => { c.fillStyle = r[1]; c.beginPath(); c.arc(cx, cy, r[0], 0, TAU); c.fill(); });
    c.fillStyle = '#c99a3a';
    for (let i = 0; i < 16; i++) {
      const a = i / 16 * TAU; c.beginPath(); c.moveTo(cx + Math.cos(a - .09) * 60, cy + Math.sin(a - .09) * 60);
      c.lineTo(cx + Math.cos(a) * 285, cy + Math.sin(a) * 285); c.lineTo(cx + Math.cos(a + .09) * 60, cy + Math.sin(a + .09) * 60); c.fill();
    }
    c.fillStyle = '#7a1414'; c.beginPath(); c.arc(cx, cy, 70, 0, TAU); c.fill(); c.fillStyle = '#e7d9b6'; c.beginPath(); c.arc(cx, cy, 52, 0, TAU); c.fill();
  });
  const floorGeo = new THREE.CircleGeometry(15.4, 64); floorGeo.rotateX(-Math.PI / 2);
  void floorTex;
  const floor = new THREE.Mesh(floorGeo, tiledMaterial(ctx.sets.floor, 30.8 / 3, 30.8 / 3, { color: 0xb8a888, envMapIntensity: .8 }, .8)); floor.position.y = 0; g.add(floor);

  /* ---- 16 piers, statues, arched wall panels ---- */
  const HALL_R = 14.2, WALL_H = 16;
  const apothem = HALL_R * Math.cos(Math.PI / 16);
  const chord = 2 * HALL_R * Math.sin(Math.PI / 16);
  const panelGeo = archPanel(chord, WALL_H, .9, [
    { cx: 0, y0: 0, hw: 1.55, spring: 6.4, k: 1.5 },
    { cx: -1.05, y0: 11, hw: .42, spring: 2.2, k: 1.5 },
    { cx: 1.05, y0: 11, hw: .42, spring: 2.2, k: 1.5 }
  ]);
  const backGlow = new THREE.MeshBasicMaterial({ color: 0xffa640 });
  for (let j = 0; j < 16; j++) {
    const phi = j / 16 * TAU, ux = Math.sin(phi), uz = -Math.cos(phi);
    const p = new THREE.Mesh(panelGeo, marble); p.position.set(ux * apothem, 0, uz * apothem); p.rotation.y = -phi; g.add(p);
    if (j !== 0) { /* every arch except the staircase door glows */
      const bgp = new THREE.Mesh(new THREE.PlaneGeometry(chord * .9, WALL_H), backGlow);
      bgp.position.set(ux * (apothem + 1.4), WALL_H / 2, uz * (apothem + 1.4)); bgp.rotation.y = -phi; g.add(bgp);
    }
    /* pier + statue at the vertex between panels */
    const th = (j + .5) / 16 * TAU, px = Math.sin(th) * HALL_R, pz = -Math.cos(th) * HALL_R;
    const pier = new THREE.Mesh(new THREE.CylinderGeometry(.75, .9, 18, 10), marblePier); pier.position.set(px, 9, pz); g.add(pier); decal(px, pz, 5); decal(Math.sin(th) * (HALL_R - 1.5), -Math.cos(th) * (HALL_R - 1.5), 3.2);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(1.25, .8, 1.4, 10), gold); cap.position.set(px, 16.4, pz); g.add(cap);
    const band = new THREE.Mesh(new THREE.TorusGeometry(.95, .09, 6, 14), gold); band.rotation.x = Math.PI / 2; band.position.set(px, 9, pz); g.add(band);
    const sx = Math.sin(th) * (HALL_R - 1.5), sz = -Math.cos(th) * (HALL_R - 1.5);
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(1.1, 3.6, 1.1), marble); plinth.position.set(sx, 1.8, sz); plinth.rotation.y = -th; g.add(plinth);
    const fig = new THREE.Mesh(new THREE.CapsuleGeometry(.34, 1.5, 4, 8), bronze); fig.position.set(sx, 5.0, sz); g.add(fig);
    const head = new THREE.Mesh(new THREE.SphereGeometry(.28, 8, 6), bronze); head.position.set(sx, 6.2, sz); g.add(head);
  }
  const ringC = new THREE.Mesh(new THREE.TorusGeometry(HALL_R + .5, .22, 6, 64), gold); ringC.rotation.x = Math.PI / 2; ringC.position.y = WALL_H; g.add(ringC);
  const ringB = new THREE.Mesh(new THREE.TorusGeometry(HALL_R + .5, .16, 6, 64), gold); ringB.rotation.x = Math.PI / 2; ringB.position.y = 10.4; g.add(ringB);

  /* ---- vault ---- */
  const vp = [];
  for (let i = 0; i <= 26; i++) {
    const t = i / 26, r = (HALL_R + .6) * Math.pow(Math.cos(t * Math.PI / 2), .82);
    if (r < 1.9) break;
    vp.push(new THREE.Vector2(r, WALL_H + t * 22));
  }
  g.add(new THREE.Mesh(new THREE.LatheGeometry(vp, 16), vaultMat));
  for (let i = 0; i < 16; i++) {
    const a = i / 16 * TAU + Math.PI / 16;
    const pts = vp.map((p) => new THREE.Vector3(Math.sin(a) * (p.x - .1), p.y, -Math.cos(a) * (p.x - .1)));
    g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 30, .24, 5), gold));
  }
  const top = vp[vp.length - 1];
  const oculus = new THREE.Mesh(new THREE.CircleGeometry(top.x, 20), new THREE.MeshBasicMaterial({ color: new THREE.Color(0xdfe9ff).multiplyScalar(5), side: THREE.DoubleSide }));
  oculus.rotation.x = Math.PI / 2; oculus.position.y = top.y + .02; g.add(oculus);
  const shaftGeo = new THREE.CylinderGeometry(top.x, 4.2, top.y, 24, 1, true); shaftGeo.translate(0, top.y / 2, 0);
  const shaft = new THREE.Mesh(shaftGeo, new THREE.MeshBasicMaterial({ color: 0xbfd6ff, transparent: true, opacity: .04, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
  g.add(shaft);
  const og = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: 0xcfe0ff, blending: THREE.AdditiveBlending, transparent: true, opacity: .8, depthWrite: false })); og.scale.set(14, 14, 1); og.position.y = top.y - 1; g.add(og);

  /* ---- the Holy Crown on its pedestal ---- */
  const ped = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.7, 1.2, 20), marblePier); ped.position.y = .6; g.add(ped); decal(0, 0, 7);
  const pedTop = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, .18, 20), gold); pedTop.position.y = 1.29; g.add(pedTop);
  const glass = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.3, 1.5), new THREE.MeshStandardMaterial({ color: 0xbfd8ff, transparent: true, opacity: .16, roughness: .05, depthWrite: false }));
  glass.position.y = 2.05; g.add(glass);
  const crown = new THREE.Group(); crown.position.y = 1.7; g.add(crown);
  const cband = new THREE.Mesh(new THREE.CylinderGeometry(.36, .38, .17, 24), gold); crown.add(cband);
  [0, Math.PI / 2].forEach((ry) => { const a = new THREE.Mesh(new THREE.TorusGeometry(.35, .03, 6, 20, Math.PI), gold); a.rotation.y = ry; a.position.y = .08; crown.add(a); });
  const cx1 = new THREE.Mesh(new THREE.BoxGeometry(.035, .2, .035), gold); cx1.position.y = .5; crown.add(cx1);
  const cx2 = new THREE.Mesh(new THREE.BoxGeometry(.12, .035, .035), gold); cx2.position.y = .53; crown.add(cx2);
  for (let i = 0; i < 12; i++) {
    const a = i / 12 * TAU, gm = new THREE.Mesh(new THREE.SphereGeometry(.035, 6, 5), new THREE.MeshBasicMaterial({ color: i % 2 ? 0xff3344 : 0x4aa8ff }));
    gm.position.set(Math.cos(a) * .375, 0, Math.sin(a) * .375); crown.add(gm);
  }
  const cg = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: 0xffc860, blending: THREE.AdditiveBlending, transparent: true, opacity: .8, depthWrite: false })); cg.scale.set(5, 5, 1); cg.position.y = 1.9; g.add(cg);
  updaters.push((t) => { crown.rotation.y = t * .5; cg.material.opacity = .4 + Math.sin(t * 2) * .08; });

  /* carpet from the centre to the staircase door */
  const carpetTex = canvasTex(128, 512, (c, w, h) => {
    c.fillStyle = '#7d1616'; c.fillRect(0, 0, w, h); c.strokeStyle = '#e2b34c'; c.lineWidth = 8; c.strokeRect(8, 0, w - 16, h);
    c.lineWidth = 3; c.strokeRect(22, 0, w - 44, h);
    c.fillStyle = '#e2b34c'; for (let y = 20; y < h; y += 44) { c.beginPath(); c.arc(w / 2, y, 9, 0, TAU); c.fill(); }
  });
  const carpetGeo = new THREE.PlaneGeometry(4.6, 15); carpetGeo.rotateX(-Math.PI / 2);
  const carpet = new THREE.Mesh(carpetGeo, new THREE.MeshStandardMaterial({ map: carpetTex, roughness: .9 })); carpet.position.set(0, .03, -7.6); carpet.rotation.y = 0; g.add(carpet);

  /* ---- grand staircase (z = -50 .. -14, rising 8 m) ---- */
  const STEPS = 32, RISE = .25;
  const steps = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), marble, STEPS);
  for (let i = 0; i < STEPS; i++) {
    const hh = (i + 1) * RISE + .2;
    steps.setMatrixAt(i, new THREE.Matrix4().compose(new THREE.Vector3(0, -8.2 + hh / 2, -46 + i + .5), new THREE.Quaternion(), new THREE.Vector3(13, hh, 1)));
  }
  g.add(steps);
  const landing = new THREE.Mesh(new THREE.BoxGeometry(13, .4, 8), marble); landing.position.set(0, -8.2, -50); g.add(landing);
  const slope = Math.atan2(8, 32), slen = Math.hypot(32, 8);
  const scTex = canvasTex(128, 512, (c, w, h) => {
    c.fillStyle = '#8a1818'; c.fillRect(0, 0, w, h); c.strokeStyle = '#e2b34c'; c.lineWidth = 7; c.strokeRect(6, 0, w - 12, h);
  });
  const sc = new THREE.Mesh(new THREE.PlaneGeometry(5, slen), new THREE.MeshStandardMaterial({ map: scTex, roughness: .9 }));
  sc.rotation.x = -Math.PI / 2 - slope; sc.position.set(0, -4 + .27, -30); g.add(sc);
  /* side arcades, vaulted ceiling, balustrades */
  const sideGeo = archPanel(4, 16, .8, [{ cx: 0, y0: 0, hw: 1.5, spring: 6.4, k: 1.5 }, { cx: 0, y0: 10.6, hw: .7, spring: 2.6, k: 1.5 }]);
  for (let i = 0; i < 9; i++) {
    [-1, 1].forEach((sd) => {
      const p = new THREE.Mesh(sideGeo, marble); p.position.set(sd * 6.9, -8 + i, -46 + i * 4); p.rotation.y = -sd * Math.PI / 2; g.add(p);
      const bgp = new THREE.Mesh(new THREE.PlaneGeometry(4, 16), backGlow); bgp.position.set(sd * 8.6, p.position.y + 8, p.position.z); bgp.rotation.y = -sd * Math.PI / 2; g.add(bgp);
    });
  }
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(7.4, 7.4, 36, 28, 1, true, Math.PI / 2, Math.PI), vaultMat.clone());
  barrel.material.map = vaultMap.clone(); barrel.material.map.repeat.set(8, 12); barrel.material.map.needsUpdate = true;
  barrel.material.emissiveMap = vaultEm.clone(); barrel.material.emissiveMap.repeat.set(8, 12); barrel.material.emissiveMap.needsUpdate = true;
  barrel.rotation.x = Math.PI / 2; barrel.position.set(0, 14, -32); g.add(barrel);
  [-1, 1].forEach((sd) => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(.18, .18, slen), gold); rail.rotation.x = -slope; rail.position.set(sd * 2.7, -4 + 1.3, -30); g.add(rail);
    for (let i = 0; i <= 16; i++) { const post = new THREE.Mesh(new THREE.BoxGeometry(.14, 1.05, .14), gold); post.position.set(sd * 2.7, -8 + i * 2 * RISE + .75, -46 + i * 2); g.add(post); }
  });
  /* hanging lamps along the staircase and the hall */
  const lampPos = [[-3, 9, -44], [3, 9, -38], [-3, 11, -32], [3, 11, -26], [-3, 12, -20]];
  const lg = new THREE.Group(); g.add(lg);
  lampPos.forEach((lp) => {
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(.5, 10, 8), new THREE.MeshBasicMaterial({ color: new THREE.Color(0xffe0a0).multiplyScalar(4) })); bulb.position.set(lp[0], lp[1], lp[2]); lg.add(bulb);
    const chain = new THREE.Mesh(new THREE.CylinderGeometry(.03, .03, 4, 4), gold); chain.position.set(lp[0], lp[1] + 2.3, lp[2]); lg.add(chain);
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, color: 0xffc866, blending: THREE.AdditiveBlending, transparent: true, opacity: .7, depthWrite: false })); s.scale.set(6, 6, 1); s.position.set(lp[0], lp[1], lp[2]); lg.add(s);
  });
  /* big stained-glass window at the foot of the stairs */
  const glassTex = canvasTex(256, 384, (c, w, h) => {
    c.fillStyle = '#1a2a70'; c.fillRect(0, 0, w, h);
    const cols = ['#e03a3a', '#f2c65e', '#3a7ae0', '#3aa86a', '#e07a3a'];
    for (let y = 0; y < h; y += 48) for (let x = 0; x < w; x += 48) { c.fillStyle = cols[Math.floor(R() * cols.length)]; c.fillRect(x + 3, y + 3, 42, 42); }
    c.strokeStyle = '#161006'; c.lineWidth = 5; c.strokeRect(2, 2, w - 4, h - 4);
  });
  const win = new THREE.Mesh(new THREE.PlaneGeometry(10, 15), new THREE.MeshBasicMaterial({ map: glassTex }));
  win.position.set(0, -8 + 8.5, -53.9); g.add(win);
  const wall = new THREE.Mesh(new THREE.BoxGeometry(16, 26, 1), marble); wall.position.set(0, 2, -54.5); g.add(wall);
  const ceilFlat = new THREE.Mesh(new THREE.PlaneGeometry(16, 40), new THREE.MeshStandardMaterial({ color: 0x2a2018 })); ceilFlat.rotation.x = Math.PI / 2; ceilFlat.position.set(0, 24, -34); g.add(ceilFlat);

  /* ---- dust drifting in the light ---- */
  const nDust = mobile ? 120 : 320, dp = new Float32Array(nDust * 3);
  for (let i = 0; i < nDust; i++) { dp[i * 3] = (R() - .5) * 20; dp[i * 3 + 1] = R() * 30; dp[i * 3 + 2] = (R() - .5) * 20; }
  const dg = new THREE.BufferGeometry(); dg.setAttribute('position', new THREE.BufferAttribute(dp, 3));
  const dust = new THREE.Points(dg, new THREE.PointsMaterial({ size: .22, map: glow, color: 0xffe8b8, transparent: true, opacity: .55, depthWrite: false, blending: THREE.AdditiveBlending }));
  g.add(dust);
  updaters.push((t, dt) => {
    for (let i = 0; i < nDust; i++) { dp[i * 3 + 1] += dt * (.25 + (i % 5) * .05); dp[i * 3] += Math.sin(t * .4 + i) * dt * .12; if (dp[i * 3 + 1] > 30) dp[i * 3 + 1] = 0; }
    dg.attributes.position.needsUpdate = true;
  });

  /* ---- lights ---- */
  g.add(new THREE.HemisphereLight(0xffe4b8, 0x3a2010, .18));
  const hallL = new THREE.PointLight(0xffd08a, 180, 70, 1.6); hallL.position.set(0, 13, 0); g.add(hallL);
  const crownL = new THREE.PointLight(0xffc860, 42, 24, 1.8); crownL.position.set(0, 5, 0); g.add(crownL);
  const stairL = new THREE.PointLight(0xffc477, 145, 60, 1.6); stairL.position.set(0, 8, -32); g.add(stairL);
  const stairL2 = new THREE.PointLight(0xffb060, 240, 40, 1.6); stairL2.position.set(0, 4, -44); g.add(stairL2);

  return { group: g, update(t, dt) { updaters.forEach((u) => u(t, dt)); } };
}

/* ------------------------------------------------------------------ camera path */
/* waypoints: [page progress, position, look-at, fov]; progress 0..6 = hero, vitrine,
   prix, services, à propos, FAQ, contact (see PARL_STOPS in the page). */
const PATH_A = [
  [0, [0, 26, 190], [0, 100, 0], 40],
  [1, [-172, 58, 190], [0, 40, 0], 44],
  [2, [-104, 17, 86], [-70, 31, 0], 46],
  [3, [12, 124, 88], [0, 56, -6], 48],
  [3.5, [205, 84, -20], [0, 44, 0], 46],
  [4, [66, 30, -168], [0, 30, -44], 44],
  [4.6, [0, 7, -104], [0, 9, -52], 52]
];
const PATH_I = [
  [4.66, [OFF, -6.2, -47.5], [OFF, -1, -26], 62],
  [4.85, [OFF, -3.0, -33], [OFF, 4, -12], 62],
  [5.0, [OFF, .7, -19], [OFF, 11, 4], 66],
  [5.3, [OFF, 5.5, -7], [OFF, 26, 2], 72],
  [5.65, [OFF + 3.5, 3.2, 5], [OFF, 1.4, 0], 52]
];
const PATH_C = [
  [5.75, [38, 2.8, 142], [6, 28, 24], 52],
  [6.0, [-6, 30, 214], [0, 46, 0], 40]
];
const CUT1 = 4.63, CUT2 = 5.72, CUTW = .07;

function cr(p0, p1, p2, p3, u) {
  const u2 = u * u, u3 = u2 * u;
  return .5 * ((2 * p1) + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u2 + (-p0 + 3 * p1 - 3 * p2 + p3) * u3);
}
function samplePath(path, prog, out) {
  const n = path.length;
  if (prog <= path[0][0]) { out.p.set(...path[0][1]); out.t.set(...path[0][2]); out.fov = path[0][3]; return; }
  if (prog >= path[n - 1][0]) { out.p.set(...path[n - 1][1]); out.t.set(...path[n - 1][2]); out.fov = path[n - 1][3]; return; }
  let k = 0;
  while (k < n - 2 && prog > path[k + 1][0]) k++;
  const u = (prog - path[k][0]) / (path[k + 1][0] - path[k][0]);
  const a = path[Math.max(0, k - 1)], b = path[k], c = path[k + 1], d = path[Math.min(n - 1, k + 2)];
  for (let i = 0; i < 3; i++) {
    out.p.setComponent(i, cr(a[1][i], b[1][i], c[1][i], d[1][i], u));
    out.t.setComponent(i, cr(a[2][i], b[2][i], c[2][i], d[2][i], u));
  }
  out.fov = b[3] + (c[3] - b[3]) * u;
}

/* ------------------------------------------------------------------ public API */
export function createParliament(canvas, opts) {
  opts = opts || {};
  const mobile = !!opts.mobile;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: false, powerPreference: 'high-performance' });
  renderer.setClearColor(0x03040a, 1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  const hdr = renderer.extensions.has('EXT_color_buffer_float') || renderer.extensions.has('EXT_color_buffer_half_float');
  let tier = hdr ? (mobile ? 1 : 2) : 0; /* 2 = reflections + MSAA + bloom, 1 = bloom, 0 = plain render */
  /* individual switches for tier 2. MSAA on the HDR target produced black frames in some views (seen in testing), so anti-aliasing is SMAA on the final image instead. */
  const flags = { msaa: false, smaa: true, shadows: true, reflect: true };

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x080a14, .0011);
  const camera = new THREE.PerspectiveCamera(40, 1, .5, 6000);
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.enabled = tier >= 2 && flags.shadows;
  renderer.shadowMap.autoUpdate = false; /* the building is static: shadows are drawn once */

  /* real photo-scanned PBR sets when they loaded (Poly Haven / ambientCG, CC0), otherwise baked on the GPU */
  const A = opts.assets || {};
  const bake = (kind, key) => A[key] || bakePBR(renderer, kind, mobile ? 1024 : 2048);
  const sets = { stone: bake('stone', 'stone'), roof: bake('roof', 'roof'), gold: bake('gold', 'gold'), paving: bake('paving', 'paving'), floor: bake('marble', 'floor') };
  const mats = {
    stone: floodPatch(pbrMaterial(sets.stone, { params: { color: 0xffffff, envMapIntensity: .7 } }), .5, 1.5, true),
    roof: floodPatch(pbrMaterial(sets.roof, { params: { color: 0xffffff, envMapIntensity: .8 } }), .7, 1.4, true),
    gold: floodPatch(pbrMaterial(sets.gold, { params: { color: 0xffffff, envMapIntensity: 1.6, metalness: .72 } }), .95, 1.3),
    dark: new THREE.MeshStandardMaterial({ color: 0x2b2118, metalness: .8, roughness: .4 }),
    glass: new THREE.MeshBasicMaterial({ vertexColors: true }),
    stoneTile: sets.stone.tile, roofTile: sets.roof.tile, goldTile: sets.gold.tile
  };

  /* night sky: the real Milky Way photo (equirectangular) when available, else the procedural one */
  if (A.sky) {
    A.sky.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = A.sky; scene.backgroundIntensity = 1.0; scene.backgroundRotation.set(0, opts.skyRot === undefined ? 2.2 : opts.skyRot, 0);
  } else { scene.background = bakeSky(renderer, mobile ? 512 : 1024, hdr); scene.backgroundIntensity = .95; }
  const envSky = warmEnv(renderer);
  const pmr = new THREE.PMREMGenerator(renderer), envRoom = pmr.fromScene(new RoomEnvironment(), .04).texture; pmr.dispose();
  scene.environment = envSky; scene.environmentIntensity = .7;

  const ext = buildExterior(mobile, !mobile, { sets, mats }), inn = buildInterior(mobile, { sets, mats });
  scene.add(ext.group, inn.group);
  function applyTier() {
    const sh = tier >= 2 && flags.shadows;
    renderer.shadowMap.enabled = sh; renderer.shadowMap.needsUpdate = true;
    Object.keys(ext.lights).forEach((k) => { ext.lights[k].castShadow = sh; });
    scene.traverse((o) => { if (o.material) [].concat(o.material).forEach((m) => { m.needsUpdate = true; }); });
  }
  Object.keys(ext.lights).forEach((k) => { ext.lights[k].castShadow = tier >= 2 && flags.shadows; });
  renderer.shadowMap.needsUpdate = true;

  const pose = { p: new THREE.Vector3(), t: new THREE.Vector3(), fov: 40 };
  const state = { W: 1, H: 1, dpr: 1, last: 0, inInterior: false, dbg: null };
  let meteor = null, nextMeteor = 4;
  const meteorTex = canvasTex(128, 8, (c, w, h) => {
    const gr = c.createLinearGradient(0, 0, w, 0); gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(.85, 'rgba(210,225,255,.8)'); gr.addColorStop(1, 'rgba(255,255,255,1)');
    c.fillStyle = gr; c.fillRect(0, h / 2 - 1.5, w, 3);
  });
  const meteorMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: meteorTex, transparent: true, depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending, fog: false }));
  meteorMesh.visible = false; meteorMesh.renderOrder = 10; scene.add(meteorMesh);

  /* post-processing chain, rebuilt when the quality tier changes */
  let composer = null, bloom = null, grade = null;
  function buildComposer() {
    if (composer) { composer.dispose(); composer = null; }
    if (tier < 1) return;
    const rt = new THREE.WebGLRenderTarget(4, 4, { type: THREE.HalfFloatType, samples: tier >= 2 && flags.msaa ? 4 : 0 });
    composer = new EffectComposer(renderer, rt);
    composer.setPixelRatio(state.dpr); composer.setSize(state.W, state.H);
    composer.addPass(new RenderPass(scene, camera));
    bloom = new UnrealBloomPass(new THREE.Vector2(state.W, state.H), .3, .55, 1.0);
    composer.addPass(bloom);
    grade = new ShaderPass(GRADE_SHADER);
    composer.addPass(grade);
    composer.addPass(new OutputPass());
    if (tier >= 2 && flags.smaa) composer.addPass(new SMAAPass());
  }

  function resize(w, h, dpr) {
    state.W = w; state.H = h; state.dpr = dpr;
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (composer) { composer.setPixelRatio(dpr); composer.setSize(w, h); } else buildComposer();
  }

  function render(now, prog, o) {
    o = o || {};
    const t = now / 1000, dt = Math.min(.05, state.last ? t - state.last : .016); state.last = t;
    let interior, fade = 1;
    if (state.dbg) {
      pose.p.set(...state.dbg.p); pose.t.set(...state.dbg.t); pose.fov = state.dbg.fov || 45; interior = !!state.dbg.interior;
    } else {
      if (prog <= CUT1) samplePath(PATH_A, prog, pose);
      else if (prog < CUT2) samplePath(PATH_I, prog, pose);
      else samplePath(PATH_C, prog, pose);
      interior = prog > CUT1 && prog < CUT2;
      const dc = Math.min(Math.abs(prog - CUT1), Math.abs(prog - CUT2));
      fade = smooth(0, CUTW, dc);
    }
    if (interior !== state.inInterior || state.first !== true) {
      state.inInterior = interior; state.first = true; ext.group.visible = !interior; inn.group.visible = interior;
      scene.environment = interior ? envRoom : envSky; scene.environmentIntensity = interior ? .04 : .7;
    }
    if (ext.reflector) ext.reflector.visible = tier >= 2 && flags.reflect && !interior && pose.p.y < 260;
    if (ext.water) ext.water.visible = !(ext.reflector && ext.reflector.visible);
    /* life: slow drift + mouse parallax */
    const mx = o.mx || 0, my = o.my || 0;
    camera.position.copy(pose.p);
    camera.position.x += Math.sin(t * .17) * 1.6 + mx * 3.2 * (interior ? .25 : 1);
    camera.position.y += Math.sin(t * .13) * .7 - my * 1.6 * (interior ? .25 : 1);
    camera.position.z += Math.cos(t * .11) * 1.4;
    camera.lookAt(pose.t);
    const asp = state.W / state.H;
    camera.fov = pose.fov * clamp(1 + (1.3 - asp) * .6, 1, 1.6);
    camera.updateProjectionMatrix();
    /* exposure carries the section's dim and the cut fade (to black) */
    renderer.toneMappingExposure = clamp(1.45 - (o.dim || 0) * .9, .45, 2) * (interior ? .9 : 1) * fade;
    canvas.style.opacity = String(state.dbg || o.appear === undefined ? 1 : o.appear);

    ext.update(t, dt, !interior);
    inn.update(t, dt);

    /* shooting stars */
    if (!interior && !mobile) {
      nextMeteor -= dt;
      if (nextMeteor < 0 && !meteor) {
        nextMeteor = 6 + R() * 8;
        const yaw = (R() - .5) * 1.6, el = .25 + R() * .3, dir = new THREE.Vector3();
        camera.getWorldDirection(dir);
        const base = Math.atan2(dir.x, dir.z) + yaw;
        const c = new THREE.Vector3(Math.sin(base) * Math.cos(el), Math.sin(el), Math.cos(base) * Math.cos(el)).multiplyScalar(2600).add(camera.position);
        meteor = { c, vx: (R() < .5 ? -1 : 1) * (900 + R() * 500), vy: -(200 + R() * 200), life: 1 };
      }
      if (meteor) {
        meteor.life -= dt * 1.1;
        meteor.c.x += meteor.vx * dt; meteor.c.y += meteor.vy * dt;
        meteorMesh.visible = meteor.life > 0;
        meteorMesh.position.copy(meteor.c); meteorMesh.lookAt(camera.position);
        meteorMesh.scale.set(260, 5, 1); meteorMesh.material.opacity = clamp(meteor.life, 0, 1);
        meteorMesh.rotateZ(Math.atan2(meteor.vy, meteor.vx));
        if (meteor.life <= 0) meteor = null;
      }
    } else meteorMesh.visible = false;

    state.info = { prog: prog, interior: interior, fade: fade, tier: tier, p: camera.position.toArray().map(Math.round), fov: Math.round(camera.fov) };
    if (composer) { grade.uniforms.uTime.value = t; grade.uniforms.uVig.value = interior ? .4 : .55; bloom.strength = interior ? .34 : .3; bloom.threshold = interior ? 1.2 : 1.0; composer.render(dt); }
    else renderer.render(scene, camera);
  }

  return {
    render, resize,
    debug(d) { state.dbg = d; },
    info() { return state.info; },
    /* called by the page when the GPU is too slow: reflections + MSAA first, then bloom */
    degrade() { if (tier > 0) { tier--; applyTier(); buildComposer(); return true; } return false; },
    quality() { return tier; },
    flags, refresh() { applyTier(); buildComposer(); },
    setTier(n) { tier = Math.max(0, Math.min(hdr ? 2 : 0, n)); applyTier(); buildComposer(); },
    dispose() { renderer.dispose(); },
    renderer
  };
}

/* ------------------------------------------------------------------ assets (real textures + sky) */
const TEX = {
  stone: ['stone_c', 'stone_n', 'stone_orm', 1.5], roof: ['roof_c', 'roof_n', 'roof_orm', 3], gold: ['gold_c', 'gold_n', 'gold_orm', 1],
  paving: ['paving_c', 'paving_n', 'paving_orm', 1.5], floor: ['floor_c', 'floor_n', 'floor_orm', 3]
};
export async function loadAssets(base, mobile) {
  const loader = new THREE.TextureLoader();
  const load = (url, srgb) => loader.loadAsync(url).then((t) => { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace; t.anisotropy = 8; return t; });
  const out = {};
  await Promise.all(Object.keys(TEX).map(async (k) => {
    try {
      const d = TEX[k], r = await Promise.all([load(base + d[0] + '.jpg', true), load(base + d[1] + '.jpg', false), load(base + d[2] + '.jpg', false)]);
      out[k] = { map: r[0], normalMap: r[1], orm: r[2], tile: d[3] };
    } catch (e) { /* that set falls back to the GPU-baked texture */ }
  }));
  try { out.sky = await load(base + (mobile ? 'sky_2k.jpg' : 'sky.jpg'), true); } catch (e) { /* procedural sky */ }
  return out;
}
/* what the page calls: fetch the textures, then build the scene */
export async function loadParliament(canvas, opts) {
  opts = opts || {};
  const assets = await loadAssets(opts.base || '/alexstudio/tex/', !!opts.mobile);
  return createParliament(canvas, Object.assign({}, opts, { assets }));
}
