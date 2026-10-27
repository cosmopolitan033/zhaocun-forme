import './style.css';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { content as c } from './content.js';
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=s=>document.querySelector(s);
$('#app').innerHTML=`<div id="scene" aria-hidden="true"></div><div class="paper"></div>
<header><a class="brand" href="#">${c.title}<span>02</span></a><span class="edition">DIGITAL SCULPTURE GARDEN<br>A STUDY BY ${c.author.toUpperCase()}</span><a href="${c.portfolio}" class="back">PORTFOLIO <span>↗</span></a></header>
<main><section class="hero"><div class="hero-copy"><p class="eyebrow">VOLUME 02 — THE SHAPE OF POSSIBILITY</p><h1>${c.headline[0]}<br><em>${c.headline[1]}</em></h1><p class="intro">${c.intro}</p><button class="explore" id="explore">ENTER THE GARDEN <span>↗</span></button></div><div class="art-caption"><span class="small-line"></span><span id="art-number">01 / 03</span><h2 id="art-title">Continuum</h2><p id="art-description">A line without an end.</p></div><a class="scroll-note" href="#process">SCROLL TO DISCOVER <span>↓</span></a><span class="side-note">IMAGINED OBJECTS. REAL PRESENCE.</span></section>
<section class="process" id="process"><p class="eyebrow">THE ART OF ALMOST</p><h2>Not quite still.<br><em>Never quite the same.</em></h2><p>${c.note}</p><a href="${c.source}" target="_blank" rel="noopener">INSIDE THE EXPERIMENT <span>↗</span></a><footer><span>© 2026 ${c.author} / PERSONAL DESIGN STUDY</span><a href="./credits.html">CREDITS ↗</a></footer></section></main>
<aside class="studio" aria-label="Sculpture controls"><div class="objects">${c.studies.map((s,i)=>`<button data-shape="${i}" aria-pressed="${i===0}"><span>${s.index}</span> ${s.name}</button>`).join('')}</div><div class="materials"><span class="material-label">SURFACE</span><button data-material="chrome" aria-label="Chrome material" aria-pressed="true" style="--swatch:linear-gradient(130deg,#222,#fff,#444,#eee)"></button><button data-material="copper" aria-label="Copper material" aria-pressed="false" style="--swatch:linear-gradient(130deg,#40261b,#ffcba4,#75432e)"></button><button data-material="porcelain" aria-label="Porcelain material" aria-pressed="false" style="--swatch:#e9e5dd"></button><span class="divide"></span><button id="pause" aria-label="${reduced?'Play':'Pause'} rotation">${reduced?'▶':'Ⅱ'}</button></div></aside>
<button id="exit" hidden>LEAVE GARDEN <span>ESC ↗</span></button><div class="drag-hint" id="drag-hint" hidden>DRAG TO ROTATE · SELECT A FORM BELOW</div><div id="fallback" role="status" hidden>The sculpture needs WebGL. Try a browser with hardware acceleration enabled.</div>`;
$('.brand span').textContent='02';
let paused=reduced,focused=false,activeShape=0,activeMaterial='chrome';let selectShape=()=>{},selectMaterial=()=>{};
function focus(v){focused=v;document.body.classList.toggle('immersed',v);$('#exit').hidden=!v;$('#drag-hint').hidden=!v;if(v)$('#exit').focus();else $('#explore').focus();}
$('#explore').onclick=()=>focus(true);$('#exit').onclick=()=>focus(false);addEventListener('keydown',e=>{if(e.key==='Escape'&&focused)focus(false);});
$('#pause').onclick=()=>{paused=!paused;$('#pause').textContent=paused?'▶':'Ⅱ';$('#pause').setAttribute('aria-label',paused?'Play rotation':'Pause rotation');};
document.querySelectorAll('[data-shape]').forEach(b=>b.onclick=()=>{activeShape=Number(b.dataset.shape);document.querySelectorAll('[data-shape]').forEach(x=>x.setAttribute('aria-pressed',x===b));const s=c.studies[activeShape];$('#art-number').textContent=s.index+' / 03';$('#art-title').textContent=s.name;$('#art-description').textContent=s.description;selectShape(activeShape);});
document.querySelectorAll('[data-material]').forEach(b=>b.onclick=()=>{activeMaterial=b.dataset.material;document.querySelectorAll('[data-material]').forEach(x=>x.setAttribute('aria-pressed',x===b));selectMaterial(activeMaterial);});
try{startScene();}catch(error){$('#fallback').hidden=false;console.error(error);}
function startScene(){
 const scene=new THREE.Scene();scene.background=new THREE.Color('#ded7ca');scene.fog=new THREE.Fog('#ded7ca',20,55);
 const camera=new THREE.PerspectiveCamera(38,innerWidth/innerHeight,.1,100);camera.position.set(0,2.8,12);
 const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;$('#scene').append(renderer.domElement);
 const pmrem=new THREE.PMREMGenerator(renderer);const room=new RoomEnvironment();const env=pmrem.fromScene(room,.04);scene.environment=env.texture;scene.environmentIntensity=1.2;room.dispose();pmrem.dispose();
 const key=new THREE.DirectionalLight('#fff5df',4);key.position.set(-4,7,5);scene.add(key);const rim=new THREE.DirectionalLight('#cfdaff',3);rim.position.set(5,4,-4);scene.add(rim);scene.add(new THREE.HemisphereLight('#fffaf0','#76665d',1.5));
 const material=new THREE.MeshPhysicalMaterial({color:'#e5e9ee',metalness:1,roughness:.14,clearcoat:1,clearcoatRoughness:.08,iridescence:.28,iridescenceIOR:1.3,iridescenceThicknessRange:[100,350],envMapIntensity:1.6});
 // Procedural forms are generated at runtime, with no external 3D downloads.
 const sculpture=new THREE.Group();scene.add(sculpture);const forms=[];
 const continuum=new THREE.Group();const knotGeo=new THREE.TorusKnotGeometry(1.5,.47,280,48,2,3);const knot=new THREE.Mesh(knotGeo,material);knot.rotation.x=.4;knot.rotation.z=-.3;continuum.add(knot);forms.push(continuum);
 const resonance=new THREE.Group();for(let i=0;i<3;i++){const ring=new THREE.Mesh(new THREE.TorusGeometry(1.65,.22,40,180),material);ring.rotation.set(i*.85,.5+i*.9,i*.65);resonance.add(ring);}forms.push(resonance);
 const bloom=new THREE.Group();const petalGeo=new THREE.TorusGeometry(1.1,.23,32,100);for(let i=0;i<12;i++){const petal=new THREE.Mesh(petalGeo,material);const a=i/12*Math.PI*2;petal.position.set(Math.cos(a)*.72,Math.sin(a)*.72,0);petal.rotation.set(Math.sin(a)*.5,Math.cos(a)*.5,a);petal.scale.set(.55,1.2,1);bloom.add(petal);}bloom.rotation.x=.4;forms.push(bloom);
 forms.forEach((f,i)=>{sculpture.add(f);f.visible=i===0;});
 // Museum plinth, floor and softly blended contact shadow ground the floating object.
 const stone=new THREE.MeshStandardMaterial({color:'#c7bdac',roughness:.88,metalness:.05});
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(150,150),new THREE.MeshStandardMaterial({color:'#d4ccbe',roughness:.95}));floor.rotation.x=-Math.PI/2;floor.position.y=-2.6;scene.add(floor);
 const plinth=new THREE.Mesh(new THREE.CylinderGeometry(2.45,2.45,.28,128),stone);plinth.position.y=-2.45;scene.add(plinth);
 const plinthTop=new THREE.Mesh(new THREE.CylinderGeometry(2.38,2.38,.015,128),new THREE.MeshStandardMaterial({color:'#e0d8c9',roughness:.45,metalness:.2}));plinthTop.position.y=-2.299;scene.add(plinthTop);
 const shadowCanvas=document.createElement('canvas');shadowCanvas.width=256;shadowCanvas.height=256;const ctx=shadowCanvas.getContext('2d');const gradient=ctx.createRadialGradient(128,128,10,128,128,128);gradient.addColorStop(0,'rgba(34,25,24,.48)');gradient.addColorStop(.35,'rgba(34,25,24,.25)');gradient.addColorStop(1,'rgba(34,25,24,0)');ctx.fillStyle=gradient;ctx.fillRect(0,0,256,256);const shadowTexture=new THREE.CanvasTexture(shadowCanvas);const shadow=new THREE.Mesh(new THREE.PlaneGeometry(4.8,4.8),new THREE.MeshBasicMaterial({map:shadowTexture,transparent:true,depthWrite:false}));shadow.rotation.x=-Math.PI/2;shadow.position.y=-2.285;scene.add(shadow);
 const baseShadow=new THREE.Mesh(new THREE.PlaneGeometry(8,8),shadow.material);baseShadow.rotation.x=-Math.PI/2;baseShadow.position.y=-2.59;scene.add(baseShadow);
 // Architectural arcs frame a gallery which continues beyond the first viewport.
 const archGroup=new THREE.Group();const archMat=new THREE.MeshStandardMaterial({color:'#c8bba6',roughness:.8});
 for(let j=0;j<5;j++){let pts=[];for(let i=0;i<=64;i++){const a=i/64*Math.PI;pts.push(new THREE.Vector3(Math.cos(a)*5,Math.sin(a)*7-2.6,0));}const arc=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),72,.21,12,false),archMat);arc.position.set(.8+j*.4,0,-5-j*4);archGroup.add(arc);}scene.add(archGroup);
 const particles=[];for(let i=0;i<140;i++)particles.push((Math.random()-.5)*25,Math.random()*12-2,Math.random()*-20);const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.Float32BufferAttribute(particles,3));const dust=new THREE.Points(pg,new THREE.PointsMaterial({color:'#fff9e6',size:.025,transparent:true,opacity:.65}));scene.add(dust);
 let transition=1,previousShape=0;
 selectShape=i=>{previousShape=forms.findIndex(f=>f.visible);if(previousShape<0)previousShape=i;transition=0;forms.forEach((f,n)=>{f.visible=n===i||n===previousShape;});};
 selectMaterial=name=>{if(name==='chrome'){material.color.set('#e5e9ee');material.metalness=1;material.roughness=.14;material.iridescence=.28;}else if(name==='copper'){material.color.set('#e2a07e');material.metalness=1;material.roughness=.2;material.iridescence=.08;}else{material.color.set('#f5f1e8');material.metalness=.05;material.roughness=.2;material.iridescence=.12;}material.needsUpdate=true;};
 let dragging=false,lastX=0,lastY=0,dragX=0,dragY=0,px=0,py=0,time=0,prev=performance.now();
 const canvas=renderer.domElement;
 canvas.addEventListener('pointerdown',e=>{if(!focused)return;dragging=true;lastX=e.clientX;lastY=e.clientY;canvas.setPointerCapture(e.pointerId);});
 canvas.addEventListener('pointermove',e=>{if(dragging){dragX+=(e.clientX-lastX)*.008;dragY+=(e.clientY-lastY)*.006;lastX=e.clientX;lastY=e.clientY;}});
 canvas.addEventListener('pointerup',()=>dragging=false);canvas.addEventListener('pointercancel',()=>dragging=false);
 addEventListener('pointermove',e=>{px=e.clientX/innerWidth-.5;py=e.clientY/innerHeight-.5;});
 addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
 renderer.setAnimationLoop(now=>{const dt=Math.min((now-prev)/1000,.05);prev=now;if(document.hidden)return;if(!paused&&!dragging)time+=dt;
 const mobile=innerWidth<760,scroll=Math.min(scrollY/innerHeight,1);
 const targetX=focused?0:mobile?0:2.25+scroll*1.2;const targetY=mobile&&!focused?3.15:0;
 sculpture.position.x=THREE.MathUtils.damp(sculpture.position.x,targetX,4,dt);sculpture.position.y=THREE.MathUtils.damp(sculpture.position.y,targetY+Math.sin(time*.7)*.12,4,dt);
 sculpture.rotation.y=time*.2+dragX+px*.12;sculpture.rotation.x=dragY+py*.06;sculpture.rotation.z=Math.sin(time*.22)*.08;
 const targetScale=mobile?(focused?.85:.62):focused?1.18:1.15;sculpture.scale.setScalar(THREE.MathUtils.damp(sculpture.scale.x,targetScale,4,dt));
 [plinth,plinthTop,shadow,baseShadow].forEach(m=>{m.position.x=sculpture.position.x;m.visible=!mobile||focused;});archGroup.position.x=targetX;
 if(transition<1){transition=Math.min(1,transition+dt*2.2);forms.forEach((f,i)=>{if(i===activeShape){f.scale.setScalar(Math.max(.001,Math.sin(transition*Math.PI*.5)));f.visible=true;}else{f.scale.setScalar(Math.max(.001,Math.cos(transition*Math.PI*.5)));if(transition===1)f.visible=false;}});}
 resonance.children.forEach((r,i)=>{r.rotation.y=time*(.2+i*.09)+i*.9;r.rotation.x=Math.sin(time*.3+i)*.5+i*.7;});bloom.rotation.z=time*.08;dust.rotation.y=time*.008;
 camera.position.x=THREE.MathUtils.damp(camera.position.x,px*.35,3,dt);camera.position.y=THREE.MathUtils.damp(camera.position.y,mobile?3.6:2.2+scroll*.7,3,dt);camera.position.z=mobile?15.8:12;camera.lookAt(0,mobile?.3:-.1,0);
 renderer.render(scene,camera);
 });
 addEventListener('pagehide',()=>{renderer.setAnimationLoop(null);env.dispose();renderer.dispose();});
}
