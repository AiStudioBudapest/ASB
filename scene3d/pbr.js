/* GPU-baked, tileable PBR texture sets (albedo / normal / ORM) — no image is downloaded:
   each set is painted by a fragment shader into render targets at start-up.
   ORM = glTF packing (R = ambient occlusion, G = roughness, B = metalness), so one texture serves
   aoMap + roughnessMap + metalnessMap. Textures are 1024 px on phones and 2048 px on desktops:
   a tile covers only 2-4 m, so 2048 px already gives ~1-2 mm per texel — 4K/8K would only add
   memory (a 4K RGBA texture with mip-maps is ~90 MB of GPU memory) without a visible gain. */
import * as THREE from 'three';

const COMMON = `
precision highp float;
varying vec2 vUv;
float hash21(vec2 p){ p=fract(p*vec2(233.34,851.73)); p+=dot(p,p+23.45); return fract(p.x*p.y); }
float vnoise(vec2 p,float P){
  vec2 i=floor(p), f=fract(p); vec2 u=f*f*f*(f*(f*6.-15.)+10.);
  float a=hash21(mod(i,P)), b=hash21(mod(i+vec2(1.,0.),P)), c=hash21(mod(i+vec2(0.,1.),P)), d=hash21(mod(i+vec2(1.,1.),P));
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p,float P,int oct){ float s=0.,a=.5; for(int i=0;i<7;i++){ if(i>=oct) break; s+=a*vnoise(p,P); p*=2.; P*=2.; a*=.5; } return s; }
`;

/* each kind defines: TILE (metres), NSTR (normal strength), H(uv), ALB(uv,h), ORM(uv,h) */
const KINDS = {
  /* ashlar limestone: 4 m tile, 0.5 m courses, 1 m blocks staggered, mortar joints, chipped edges, weathering */
  stone: `
    const float TILE=4.0; const float NSTR=1.0;
    void blk(vec2 uv,out float edge,out float bid,out float bi,out float row){
      vec2 m=uv*4.0; row=floor(m.y/.5); float bx=m.x+mod(row,2.)*.5;
      bi=floor(mod(bx,4.)); vec2 f=vec2(fract(bx),fract(m.y/.5));
      edge=min(min(f.x,1.-f.x)*1.0,min(f.y,1.-f.y)*.5); bid=hash21(vec2(bi,row));
    }
    float H(vec2 uv){
      float edge,bid,bi,row; blk(uv,edge,bid,bi,row);
      float joint=smoothstep(.005,.013,edge), bevel=smoothstep(.0,.06,edge);
      float chip=fbm(uv*64.,64.,3);
      float face=(bid-.5)*.006+(fbm(uv*24.,24.,5)-.5)*.011+(fbm(uv*128.,128.,3)-.5)*.0035;
      return joint*(.010+face+bevel*.005-smoothstep(.55,.85,chip)*(1.-bevel)*.006);
    }
    vec3 ALB(vec2 uv,float h){
      float edge,bid,bi,row; blk(uv,edge,bid,bi,row);
      float joint=smoothstep(.005,.013,edge);
      vec3 c=mix(vec3(.46,.37,.25),vec3(.66,.55,.39),fbm(uv*9.,9.,4));
      c*=.86+.26*bid; c=mix(c,c*vec3(1.05,1.0,.92),fbm(uv*3.,3.,3));
      float streak=smoothstep(.5,.9,fbm(vec2(uv.x*22.,uv.y*2.),22.,4));
      c*=1.-streak*.32; c*=.80+.20*smoothstep(.0,.02,edge)+.0;
      c=mix(vec3(.26,.24,.20)*(.8+.4*fbm(uv*60.,60.,3)),c,joint);
      return c*(.72+h*30.);
    }
    vec3 ORM(vec2 uv,float h){
      float edge,bid,bi,row; blk(uv,edge,bid,bi,row);
      float joint=smoothstep(.005,.013,edge);
      float ao=mix(.35,1.,joint)*mix(.78,1.,smoothstep(.0,.05,edge))*(.85+.3*fbm(uv*40.,40.,3));
      return vec3(clamp(ao,0.,1.),.74+.2*fbm(uv*20.,20.,3)+(1.-joint)*.1,0.);
    }`,
  /* glazed ceramic roof tiles in geometric bands (Zsolnay-style), 2 m tile */
  roof: `
    const float TILE=2.0; const float NSTR=1.0;
    void tl(vec2 uv,out vec2 f,out vec2 id){
      vec2 m=uv*vec2(8.,5.); float row=floor(m.y); m.x+=mod(row,2.)*.5; id=vec2(floor(mod(m.x,8.)),row); f=vec2(fract(m.x),fract(m.y));
    }
    float H(vec2 uv){
      vec2 f,id; tl(uv,f,id);
      float e=min(f.x,1.-f.x);
      float slope=f.y*.014-smoothstep(.0,.06,f.y)*.0; float gap=smoothstep(.02,.07,e);
      return slope*gap+(fbm(uv*60.,60.,3)-.5)*.0016;
    }
    vec3 ALB(vec2 uv,float h){
      vec2 f,id; tl(uv,f,id);
      float band=mod(floor(id.x/2.)+id.y,4.);
      vec3 c=band<.5?vec3(.020,.105,.070):band<1.5?vec3(.30,.085,.04):band<2.5?vec3(.33,.20,.05):vec3(.03,.055,.12);
      c*=.75+.5*hash21(id+3.7); c*=.7+.3*smoothstep(.0,.35,f.y)+.2*fbm(uv*30.,30.,3);
      return c*(.85+h*20.);
    }
    vec3 ORM(vec2 uv,float h){
      vec2 f,id; tl(uv,f,id); float e=min(f.x,1.-f.x);
      float ao=mix(.4,1.,smoothstep(.0,.08,e))*mix(.55,1.,smoothstep(.0,.3,f.y));
      return vec3(ao,.22+.25*fbm(uv*25.,25.,3),0.);
    }`,
  /* gilded copper / brass: brushed micro-scratches and darker patina in the recesses, 1 m tile */
  gold: `
    const float TILE=1.0; const float NSTR=.6;
    float H(vec2 uv){ return (fbm(vec2(uv.x*6.,uv.y*140.),140.,4)-.5)*.0012+(fbm(uv*20.,20.,4)-.5)*.0016; }
    vec3 ALB(vec2 uv,float h){
      vec3 c=mix(vec3(.86,.60,.20),vec3(1.0,.78,.34),fbm(uv*8.,8.,4));
      float pat=smoothstep(.62,.9,fbm(uv*12.,12.,5));
      return mix(c,vec3(.32,.30,.14),pat*.5);
    }
    vec3 ORM(vec2 uv,float h){
      float pat=smoothstep(.62,.9,fbm(uv*12.,12.,5));
      return vec3(1.-pat*.4,.26+.22*fbm(uv*30.,30.,3)+pat*.3,1.);
    }`,
  /* polished veined marble, 3 m tile */
  marble: `
    const float TILE=3.0; const float NSTR=.25;
    float veins(vec2 uv){
      vec2 w=uv*4.+vec2(fbm(uv*6.,6.,5)*3.,fbm(uv*6.+3.1,6.,5)*3.);
      float v=abs(sin(w.x*3.+w.y*1.7+fbm(uv*3.,3.,4)*6.)); return 1.-smoothstep(.0,.16,v);
    }
    float H(vec2 uv){ return (fbm(uv*30.,30.,4)-.5)*.0009; }
    vec3 ALB(vec2 uv,float h){
      vec3 c=mix(vec3(.72,.66,.54),vec3(.86,.80,.68),fbm(uv*5.,5.,4));
      c=mix(c,vec3(.36,.30,.24),veins(uv)*.55*fbm(uv*10.,10.,3)*2.);
      return c*(.9+.12*fbm(uv*40.,40.,3));
    }
    vec3 ORM(vec2 uv,float h){ return vec3(1.,.10+.08*fbm(uv*20.,20.,3)+veins(uv)*.06,0.); }`,
  /* worn paving stones, 4 m tile */
  paving: `
    const float TILE=4.0; const float NSTR=1.2;
    void sl(vec2 uv,out float edge,out float bid){
      vec2 m=uv*vec2(8.,8.); float row=floor(m.y); float bx=m.x+mod(row,2.)*.5; vec2 f=fract(vec2(bx,m.y));
      edge=min(min(f.x,1.-f.x),min(f.y,1.-f.y))*.5; bid=hash21(vec2(floor(mod(bx,8.)),row));
    }
    float H(vec2 uv){ float e,b; sl(uv,e,b); return smoothstep(.006,.02,e)*(.012+(b-.5)*.004+(fbm(uv*40.,40.,4)-.5)*.006); }
    vec3 ALB(vec2 uv,float h){ float e,b; sl(uv,e,b); vec3 c=mix(vec3(.20,.20,.22),vec3(.36,.34,.32),fbm(uv*12.,12.,4))*(.8+.35*b); return mix(vec3(.08,.08,.09),c,smoothstep(.006,.02,e)); }
    vec3 ORM(vec2 uv,float h){ float e,b; sl(uv,e,b); return vec3(mix(.4,1.,smoothstep(.004,.03,e)),.55+.3*fbm(uv*30.,30.,3),0.); }`
};

const VERT = 'varying vec2 vUv; void main(){ vUv=position.xy*.5+.5; gl_Position=vec4(position.xy,0.,1.); }';
const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
const scn = new THREE.Scene(); scn.add(quad);

function pass(renderer, kind, size, which) {
  const code = KINDS[kind];
  const frag = COMMON + code + `
    void main(){
      #if PASS==0
        float h=H(vUv); gl_FragColor=vec4(ALB(vUv,h),1.);
      #elif PASS==1
        float e=1./${size}.0;
        float dx=(H(vUv+vec2(e,0.))-H(vUv-vec2(e,0.)))/(2.*e*TILE);
        float dy=(H(vUv+vec2(0.,e))-H(vUv-vec2(0.,e)))/(2.*e*TILE);
        vec3 n=normalize(vec3(-dx*NSTR*40.,-dy*NSTR*40.,1.)); gl_FragColor=vec4(n*.5+.5,1.);
      #else
        float h=H(vUv); gl_FragColor=vec4(ORM(vUv,h),1.);
      #endif
    }`;
  const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: frag, defines: { PASS: which }, depthTest: false, depthWrite: false });
  quad.material = mat;
  const rt = new THREE.WebGLRenderTarget(size, size, {
    type: THREE.UnsignedByteType, depthBuffer: false, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter, magFilter: THREE.LinearFilter,
    wrapS: THREE.RepeatWrapping, wrapT: THREE.RepeatWrapping
  });
  rt.texture.colorSpace = which === 0 ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  rt.texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  renderer.setRenderTarget(rt); renderer.render(scn, cam); renderer.setRenderTarget(null);
  mat.dispose();
  return rt.texture;
}

/* returns { map, normalMap, orm, tile } for one material kind */
export function bakePBR(renderer, kind, size) {
  const prevAuto = renderer.autoClear, prevTM = renderer.toneMapping;
  renderer.autoClear = true; renderer.toneMapping = THREE.NoToneMapping;
  const out = { map: pass(renderer, kind, size, 0), normalMap: pass(renderer, kind, size, 1), orm: pass(renderer, kind, size, 2) };
  renderer.autoClear = prevAuto; renderer.toneMapping = prevTM;
  out.tile = parseFloat(/const float TILE=([\d.]+)/.exec(KINDS[kind])[1]);
  return out;
}

/* MeshStandardMaterial from a baked set; uv are in metres / tile (see planarUV in facade.js) */
export function pbrMaterial(set, o) {
  o = o || {};
  return new THREE.MeshStandardMaterial(Object.assign({
    map: set.map, normalMap: set.normalMap, normalScale: new THREE.Vector2(o.normal || 1, o.normal || 1),
    aoMap: set.orm, aoMapIntensity: o.ao === undefined ? 1 : o.ao, roughnessMap: set.orm, metalnessMap: set.orm,
    roughness: 1, metalness: 1
  }, o.params || {}));
}
