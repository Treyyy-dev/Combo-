/* Look upgrades, each off unless released: weap2 (detailed weapons), hair2 (detailed hair), phys (hair and cloth physics),
   stance (unique idle stances and poses), winpose (victory pose shot before the result), map2 (detailed maps), noots (in over-the-shoulder cutscene shots show only the dark shadow, not that character). */
(function(){'use strict';
const F=()=>(typeof FLAGS!=='undefined'&&FLAGS)||{};
const hs=t=>{let x=5381;for(let i=0;i<t.length;i++)x=((x*33)^t.charCodeAt(i))>>>0;return x};
const rg=seed=>{let s=seed>>>0||1;return()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296}};
const hexOk=h=>typeof h==='string'&&h.length===7&&h[0]==='#';
/* ================= WEAPONS ================= */
const _wp=weapon;
function weapon2(c,h,fa,o,back){const ink=o.sil||INK,sil=o.sil,S=x=>sil||x;g.lineCap='round';g.lineJoin='round';
 const P=(a,l,n)=>[h.x+Math.sin(a)*l+Math.cos(a)*(n||0),h.y+Math.cos(a)*l-Math.sin(a)*(n||0)];
 const ln=(a,l0,l1,w,col,n)=>{const p=P(a,l0,n),q=P(a,l1,n);g.strokeStyle=col;g.lineWidth=w;g.beginPath();g.moveTo(p[0],p[1]);g.lineTo(q[0],q[1]);g.stroke();return q};
 const pg=(a,pts,fill,lw)=>poly(pts.map(q=>P(a,q[0],q[1])),fill,ink,lw||1.8);
 if(c.weapon==='katana'&&!back){const a=(fa+40)*R;
  pg(a,[[7,-2.6],[60,-2.9],[70,0],[61,2.4],[7,2.4]],S('#eef3ff'));if(!sil){ln(a,9,60,1.1,'#9fb0d8',1.2);ln(a,9,62,.9,'#ffffff',-1.5);ln(a,12,58,.8,c.col,.2)}
  ln(a,-12,5,6.4,ink);ln(a,-11,4,3.6,S('#2a2740'));if(!sil)for(let i=-9;i<4;i+=3.2){ln(a,i,i+1.4,3.6,c.col2)}
  pg(a,[[4.2,-6],[6.6,-6],[6.6,6],[4.2,6]],S(c.col2),1.6);const pm=P(a,-12.5);circ(pm[0],pm[1],2.6,S(c.col),ink,1.6)}
 else if(c.weapon==='staff'&&!back){const a=(fa+75)*R;ln(a,-41,58,6.4,ink);ln(a,-40,57,3.4,S('#cfd8ff'));
  if(!sil){ln(a,-40,57,1,'#ffffff',-1);[-30,-8,8,36].forEach(l=>ln(a,l,l+2.4,3.6,c.col2));ln(a,-4,4,4.4,c.col)}
  const e=P(a,62),b=P(a,-42);circ(b[0],b[1],2.8,S(c.col2),ink,1.6);
  if(!sil){const gl=g.createRadialGradient(e[0],e[1],2,e[0],e[1],22);gl.addColorStop(0,'rgba(255,255,255,.55)');gl.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gl;g.fillRect(e[0]-22,e[1]-22,44,44)}
  g.strokeStyle=ink;g.lineWidth=5.6;g.beginPath();g.arc(e[0],e[1],11,-a+1.2,-a+5.1);g.stroke();g.strokeStyle=S(c.col2);g.lineWidth=2.8;g.stroke();
  poly([[e[0],e[1]-9],[e[0]+6,e[1]],[e[0],e[1]+9],[e[0]-6,e[1]]],S(c.col),ink,1.8);if(!sil){poly([[e[0],e[1]-9],[e[0]+6,e[1]],[e[0],e[1]]],'rgba(255,255,255,.35)');circ(e[0]-1.5,e[1]-2.5,1.8,'#fff')}}
 else if(c.weapon==='dagger'){const a=(fa-140)*R;pg(a,[[4,-2.6],[20,-3.2],[30,.6],[19,2.6],[4,2.2]],S('#ece8ff'));if(!sil){ln(a,6,24,.9,'#a9a4d0',1);ln(a,6,25,.8,'#fff',-1.6)}
  pg(a,[[2.2,-5],[4.4,-5],[4.4,5],[2.2,5]],S(c.col2),1.4);ln(a,-6,2,5.4,ink);ln(a,-5,1,2.8,S(c.col));const pm=P(a,-6.5);circ(pm[0],pm[1],2,S(c.col2),ink,1.4)}
 else if(c.weapon==='fist'){const r=c.fistR||8.2;circ(h.x,h.y,r,S(c.col2),ink,2);if(!sil){g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=1.2;g.beginPath();g.arc(h.x,h.y,r*.62,-.9,1.1);g.moveTo(h.x+r*.2,h.y-r*.75);g.lineTo(h.x+r*.2,h.y+r*.75);g.stroke();[-.5,0,.5].forEach(k=>circ(h.x+r*.72,h.y+k*r*.8,1.5,c.col,INK,1));circ(h.x-r*.3,h.y-r*.35,2.2,'#fff7d0')}}
 else if(c.weapon==='bo'&&!back){const a=(fa+75)*R;ln(a,-47,57,6.8,ink);ln(a,-46,56,3.8,S('#b98a4e'));
  if(!sil){ln(a,-46,56,1,'#e8c48a',-1.1);ln(a,-46,56,.9,'#7a5628',1.3);ln(a,-9,9,4.6,'#2a2740');for(let i=-8;i<9;i+=3.4)ln(a,i,i+1.2,4.6,c.col2);ln(a,-46,-34,4.4,c.col);ln(a,44,56,4.4,c.col);[-33,43].forEach(l=>ln(a,l,l+1.6,4.8,'#ffd36e'))}
  [P(a,-47.5),P(a,57.5)].forEach(q=>circ(q[0],q[1],3,S('#ffd36e'),ink,1.5))}
 else if(c.weapon==='bow'&&!back){const a=(fa+90)*R,dx=Math.sin(a),dy=Math.cos(a),tx=h.x+dx*40,ty=h.y+dy*40,bx=h.x-dx*40,by=h.y-dy*40,qx=h.x-dy*26,qy=h.y+dx*26;
  g.strokeStyle=ink;g.lineWidth=7.4;g.beginPath();g.moveTo(tx,ty);g.quadraticCurveTo(qx,qy,bx,by);g.stroke();g.strokeStyle=S(c.col);g.lineWidth=4.2;g.stroke();
  if(!sil){g.strokeStyle='rgba(255,255,255,.45)';g.lineWidth=1.1;g.stroke();g.strokeStyle=c.col2;g.lineWidth=4.6;[[.1,.2],[.8,.9]].forEach(r=>{g.beginPath();for(let k=r[0];k<=r[1]+.001;k+=.05){const u=1-k,x=u*u*tx+2*u*k*qx+k*k*bx,y=u*u*ty+2*u*k*qy+k*k*by;k===r[0]?g.moveTo(x,y):g.lineTo(x,y)}g.stroke()})}
  g.strokeStyle=S('#ffffff');g.lineWidth=1.2;g.beginPath();g.moveTo(tx,ty);g.lineTo(h.x+dy*4,h.y-dx*4);g.lineTo(bx,by);g.stroke();
  [[tx,ty],[bx,by]].forEach(q=>circ(q[0],q[1],2.6,S(c.col2),ink,1.4));const gx=h.x-dy*13,gy=h.y+dx*13;g.strokeStyle=ink;g.lineWidth=8;g.beginPath();g.moveTo(gx+dx*5,gy+dy*5);g.lineTo(gx-dx*5,gy-dy*5);g.stroke();g.strokeStyle=S('#2a2740');g.lineWidth=5;g.stroke()}
 else if(c.weapon==='orb'&&!back){const t=o.t||0,ox=h.x+12,oy=h.y-16+Math.sin(t*4)*3;
  if(!sil){const gl=g.createRadialGradient(ox,oy,3,ox,oy,24);gl.addColorStop(0,'rgba(170,150,255,.5)');gl.addColorStop(1,'rgba(122,107,255,0)');g.fillStyle=gl;g.fillRect(ox-24,oy-24,48,48)}
  circ(ox,oy,9.5,S('#0a0618'),S(c.col),2.6);
  if(!sil){g.strokeStyle=c.col2;g.lineWidth=1.3;g.beginPath();g.ellipse(ox,oy,14,4.6,t*1.6,0,TAU);g.stroke();g.strokeStyle=c.col;g.beginPath();g.ellipse(ox,oy,13,3.8,-t*1.2+1,0,TAU);g.stroke();
   g.strokeStyle='rgba(255,255,255,.7)';g.lineWidth=1.1;g.beginPath();g.arc(ox,oy,5.5,t*3,t*3+2.2);g.stroke();circ(ox-3,oy-3,2.4,'#fff');circ(ox+Math.cos(t*2.3)*15,oy+Math.sin(t*2.3)*6,1.3,c.col2);circ(ox+Math.cos(t*2.3+3)*15,oy+Math.sin(t*2.3+3)*6,1.1,'#fff')}}}
weapon=function(c,h,fa,o,back){if(F().weap2){try{return weapon2(c,h,fa,o,back)}catch(e){}}return _wp(c,h,fa,o,back)};
/* ================= HAIR + PHYSICS (ribbons) ================= */
const _rb=ribbon;let HR=0,PHY=null;
function ribbon2(ox,oy,len,w0,w1,ang,sway,t,col,ink){const n=8,A=[],B=[],M=[],lift=PHY?PHY.l:0,fl=PHY?PHY.f:0,ph=F().phys;let x=ox,y=oy,a=ang*R;
 for(let i=0;i<=n;i++){const k=i/n,w=lerp(w0,w1,k)/2,nx=Math.cos(a),ny=-Math.sin(a);A.push([x+nx*w,y+ny*w]);B.push([x-nx*w,y-ny*w]);M.push([x,y,nx,ny,w]);
  a+=(-sway*.33+Math.sin(t*6+k*4+ox)*.11*(.4+k)*(ph?1+fl*1.6:1))*6/n;if(ph){a+=(a<=0?-1:1)*lift*.2*(.35+k)*6/n;a+=Math.sin(t*11+k*7+oy)*.05*fl*k}x+=Math.sin(a)*len/n;y+=Math.cos(a)*len/n}
 poly(A.concat(B.reverse()),col,ink,2);
 if(HR&&F().hair2&&ink===INK&&HR.c){const c=HR.c;g.lineCap='round';[[-.45,HR.dk,1.1],[.35,HR.dk,.9],[0,c.hairHi,1.2]].forEach(q=>{g.strokeStyle=q[1];g.lineWidth=q[2];g.globalAlpha=q[1]===c.hairHi?.55:.8;g.beginPath();M.forEach((m,i)=>{if(i<1||i>n-1)return;const px=m[0]+m[2]*m[4]*q[0],py=m[1]+m[3]*m[4]*q[0];i===1?g.moveTo(px,py):g.lineTo(px,py)});g.stroke()});g.globalAlpha=1}}
ribbon=function(ox,oy,len,w0,w1,ang,sway,t,col,ink){const f=F();if(f.phys||(f.hair2&&HR)){try{return ribbon2(ox,oy,len,w0,w1,ang,sway,t,col,ink)}catch(e){}}return _rb(ox,oy,len,w0,w1,ang,sway,t,col,ink)};
const dkOf=c=>c._hdk||(c._hdk=hexOk(c.hair)?shade(c.hair,.66):'rgba(0,0,0,.35)');
const _hb=headBack;headBack=function(c,o){if(!F().hair2||o.sil)return _hb(c,o);const ink=INK,dk=dkOf(c),h=hs(c.name);
 [[-10,-13,-27,-9,-14,-1],[-9,-2,-26,5,-12,8],[-7,7,-19,17,-4,13]].forEach((q,i)=>{if((h>>i)&1||i===1)poly([[q[0],q[1]],[q[2]+((h>>(i+3))&3),q[3]],[q[4],q[5]]],dk,ink,1.6)});
 HR={c,dk};try{_hb(c,o)}finally{HR=0}};
const _hf=headFront;headFront=function(c,o){_hf(c,o);if(!F().hair2||o.sil)return;const dk=dkOf(c),b=BANGS[c.style]||[],h=hs(c.name);g.save();g.lineCap='round';g.lineJoin='round';
 for(let i=1;i<b.length-1;i++){const q=b[i];if(q[1]>b[i-1][1]&&q[1]>=b[i+1][1]){const sx=q[0]*.62,sy=-13.5+Math.abs(q[0])*.22;g.strokeStyle=dk;g.lineWidth=1.05;g.beginPath();g.moveTo(sx,sy);g.quadraticCurveTo((sx+q[0])/2+1.2,(sy+q[1])/2,q[0]+.3,q[1]-1.6);g.stroke();
   g.strokeStyle=c.hairHi;g.globalAlpha=.6;g.lineWidth=.9;g.beginPath();g.moveTo(sx-1.6,sy+1.5);g.quadraticCurveTo((sx+q[0])/2-.6,(sy+q[1])/2,q[0]-1.3,q[1]-3.2);g.stroke();g.globalAlpha=1}}
 g.strokeStyle=c.hairHi;g.globalAlpha=.75;g.lineWidth=1.3;g.beginPath();g.arc(0,-1,13.4,-2.05,-1.5);g.stroke();g.globalAlpha=.5;g.beginPath();g.arc(0,-1,8.4,-2.5,-1.7);g.stroke();g.globalAlpha=1;
 g.strokeStyle=dk;g.lineWidth=1;g.beginPath();g.arc(0,-1,13.2,Math.PI+.25,Math.PI+.95);g.stroke();
 poly([[-14.6,1],[-11.2,2],[-11.6,10.5+(h&3)],[-13.4,6.5]],c.hair,INK,1.5);
 if((h>>5)%3===0){g.strokeStyle=INK;g.lineWidth=3.4;g.beginPath();g.moveTo(1,-16);g.quadraticCurveTo(4+(h&7),-27,11,-22);g.stroke();g.strokeStyle=c.hair;g.lineWidth=1.8;g.stroke()}
 g.restore()};
const _df=drawFighter;drawFighter=function(f,sil){if(!F().phys||f.hide)return _df(f,sil);const P=f._ph||(f._ph={s:f.sway||0,v:0,l:0,lv:0,t:G.t}),dt=clamp(G.t-P.t,0,.05);P.t=G.t;
 const ts=clamp((f.vx||0)*f.face/400+(f.state==='idle'?.08:0),-1.4,1.4),tl=clamp((f.vy||0)/560,-.9,1.4);for(let i=0;i<2&&dt>0;i++){const h=dt/2;P.v+=((ts-P.s)*85-P.v*7.5)*h;P.s+=P.v*h;P.lv+=((tl-P.l)*70-P.lv*7)*h;P.l+=P.lv*h}
 const keep=f.sway;f.sway=clamp(P.s,-1.8,1.8);PHY={l:clamp(P.l,-1.2,1.8),f:clamp(Math.abs(f.vx||0)/420+Math.abs(P.v)*.12,0,1.5)};try{_df(f,sil)}finally{f.sway=keep;PHY=null}};
/* ================= UNIQUE STANCES AND POSES ================= */
const AMP=[4,6,16,22,16,22,6,5,6,5,0,0],WAMP=[3,6,14,20,22,26,3,3,3,3,0,0];
function dOf(c){if(c._st)return c._st;const r=rg(hs(c.name)^0x9e3779b9),d=[],w=[];for(let i=0;i<12;i++){d.push((r()*2-1)*AMP[i]);w.push((r()*2-1)*WAMP[i])}d[7]=-Math.abs(d[7])*.6;d[9]=-Math.abs(d[9])*.6;return c._st={d,w,v:(r()*8)|0}}
const VP=[[-6,-14,172,6,-25,35,8,-8,-12,-6,0,0],[2,-4,70,115,60,120,10,-6,-12,-4,0,0],[8,-2,88,4,-30,70,24,-26,-22,-10,0,0],[-6,-12,160,14,-160,-14,14,-12,-14,-8,0,0],[-4,-8,130,60,-40,95,4,-4,-14,-4,0,0],[-8,-6,150,120,-15,25,6,-6,-10,-6,0,0],[14,-10,60,100,-60,100,34,-50,-30,-34,0,0],[-12,4,20,30,-20,30,16,-10,-4,-14,0,0]];
function vpose(c){const S=dOf(c),b=VP[S.v];return b.map((x,i)=>x+S.w[i]*.5)}
const add=(p,d)=>{const o=p.slice();for(let i=0;i<10;i++)o[i]+=d[i];return o};
const _po=poseOf;poseOf=function(f){const p=_po(f);if(!F().stance||!f||!f.c||!p)return p;if(f.state==='idle')return add(p,dOf(f.c).d);if(f.state==='win')return add(p,dOf(f.c).w);return p};
const ISET=new Set(IDLES),_dc2=drawChar;drawChar=function(c,p,o){if(F().stance&&c&&ISET.has(p))p=add(p,dOf(c).d);return _dc2(c,p,o)};
/* ================= VICTORY POSE SHOT ================= */
const _sc=shotCam;shotCam=function(s,k){if(s.kind==='vpose'&&s.who){const f=s.who,e=ease(clamp(k*1.7,0,1)),hh=-120*(f.c.sc||1);return{x:f.x+f.face*lerp(46,6,e),y:lerp(-66,hh+38,e),z:lerp(1.15,2.25,e),rot:f.face*lerp(.08,-.02,e)}}return _sc(s,k)};
const _ex=exprOf;exprOf=function(f){if(f&&f._vp&&f.state==='pose')return'happy';return _ex(f)};
const _fin=finish;finish=function(win){_fin(win);if(!F().winpose)return;const I=G.intro;if(!I||!I.out||!I.sh||I.sh.length<2)return;const lo=I.sh.find(q=>q.kind==='kneel'),wi=I.sh.find(q=>q!==lo);if(!lo||!wi||!wi.who)return;const w=wi.who;
 I.sh=[lo,wi,{kind:'vpose',who:w,dur:2,pre(){w.hide=false;w.mv=null;w.y=0;w.vx=w.vy=0;w.pvx=0;w.state='pose';w.pz=vpose(w.c);w._vp=1;w.st=0;G.flash=.35;try{sfx('ult');shake(10);G.fx.push({type:'ring',t:0,life:.5,x:w.x,y:-70,r0:20,r1:240,col:w.c.col,w:8})}catch(e){}}}]};
const _bg=begin;begin=function(mk){const r=_bg(mk);try{(G.tm||[]).forEach(T=>T.list.forEach(f=>{f._vp=0}))}catch(e){}return r};
/* ===== CUTSCENES: when a character's big dark shadow fills the front, do not also draw that character in the scene ===== */
let OTSF=null,OTST=-9;const _ots=drawOTS;drawOTS=function(f,k){if(F().noots){OTSF=f;OTST=G.t}return _ots(f,k)};
const _df2=drawFighter;drawFighter=function(f,sil){if(F().noots&&f===OTSF&&G.t-OTST<.12&&(G.mode==='intro'||G.mode==='scene'))return;return _df2(f,sil)};
/* ================= MAP DETAIL ================= */
const DEC=[];{const r=rg(4242);for(let i=0;i<70;i++)DEC.push({x:(r()*2-1)*1500,d:.08+r()*.9,k:(r()*3)|0,s:.6+r()*.9,a:r()*TAU})}
const BIRD=[];{const r=rg(77);for(let i=0;i<6;i++)BIRD.push({x:r(),y:.12+r()*.4,s:.7+r()*.6,p:r()*6})}
const _dbg=drawBG;drawBG=function(){_dbg();if(!F().map2)return;try{mapDetail()}catch(e){}};
function mapDetail(){const st=STAGES[G.stg||0],z=cam.z,hy=cam.ay-26*z-cam.y*z*.6,fh=Math.max(1,H-hy),t=G.t,rf=st.rf||'255,220,180',night=!!st.stars;if(hy<4)return;
 g.save();g.beginPath();g.rect(0,0,W,hy);g.clip();
 const sx=W*.5-cam.x*.03,sy=hy-st.sunY;g.globalAlpha=.07;g.fillStyle='rgb('+rf+')';for(let i=0;i<9;i++){const a=t*.03+i*TAU/9;g.beginPath();g.moveTo(sx,sy);g.lineTo(sx+Math.cos(a)*W,sy+Math.sin(a)*W);g.lineTo(sx+Math.cos(a+.12)*W,sy+Math.sin(a+.12)*W);g.fill()}g.globalAlpha=1;
 if(night){const k=(t*.13)%1;if(k<.12){const x=W*(.15+((t*.13|0)*.37%1)*.6)+k*380,y=hy*.12+k*160;g.strokeStyle='rgba(255,255,255,'+(1-k/.12)+')';g.lineWidth=2;g.beginPath();g.moveTo(x,y);g.lineTo(x-46,y-18);g.stroke()}}
 else{g.strokeStyle='rgba(20,12,40,.55)';g.lineWidth=1.6;g.lineCap='round';BIRD.forEach(b=>{const x=((b.x+t*.012*b.s)%1.2-.1)*W-cam.x*.04,y=hy*b.y+Math.sin(t*1.3+b.p)*5,w=7*b.s,fl=Math.sin(t*7+b.p)*3;g.beginPath();g.moveTo(x-w,y-fl);g.quadraticCurveTo(x-w/2,y-3,x,y);g.quadraticCurveTo(x+w/2,y-3,x+w,y-fl);g.stroke()})}
 const hz=g.createLinearGradient(0,hy-90,0,hy);hz.addColorStop(0,'rgba('+rf+',0)');hz.addColorStop(1,'rgba('+rf+',.3)');g.fillStyle=hz;g.fillRect(0,hy-90,W,90);g.restore();
 /* props standing on the horizon, between the big landmarks */
 const mz=lerp(1,z,.55),mx=x=>W/2+(x-cam.x*.55)*mz;[-930,-310,310,930].forEach((tx,i)=>{const x=mx(tx),s=mz*1.1;if(x<-90||x>W+90)return;g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(x,hy+3,26*s,4*s,0,0,TAU);g.fill();
  if(st.mid==='torii'){g.fillStyle='#2a1b44';g.fillRect(x-9*s,hy-8*s,18*s,9*s);g.fillRect(x-4*s,hy-44*s,8*s,38*s);g.fillRect(x-11*s,hy-62*s,22*s,20*s);g.fillStyle='#1b1030';g.beginPath();g.moveTo(x-17*s,hy-62*s);g.lineTo(x,hy-76*s);g.lineTo(x+17*s,hy-62*s);g.fill();
   const gl=g.createRadialGradient(x,hy-52*s,2,x,hy-52*s,34*s);gl.addColorStop(0,'rgba(255,205,130,.75)');gl.addColorStop(1,'rgba(255,160,90,0)');g.fillStyle=gl;g.fillRect(x-34*s,hy-86*s,68*s,68*s);g.fillStyle='#ffd58a';g.fillRect(x-6*s,hy-58*s,12*s,12*s);g.fillStyle='#2a1b44';g.fillRect(x-.8*s,hy-58*s,1.6*s,12*s)}
  else if(st.mid==='neon'){g.fillStyle='#0b0a1e';g.fillRect(x-2.5*s,hy-120*s,5*s,121*s);g.fillRect(x-2*s,hy-122*s,30*s,4*s);const c2=i%2?'90,240,255':'255,90,200',gl=g.createRadialGradient(x+26*s,hy-112*s,2,x+26*s,hy-112*s,46*s);gl.addColorStop(0,'rgba('+c2+',.7)');gl.addColorStop(1,'rgba('+c2+',0)');g.fillStyle=gl;g.fillRect(x-20*s,hy-158*s,92*s,92*s);g.fillStyle='rgb('+c2+')';g.fillRect(x+20*s,hy-118*s,12*s,5*s);
   g.fillStyle='#0b0a1e';g.fillRect(x-40*s,hy-46*s,24*s,47*s);g.fillStyle='rgba('+c2+',.85)';g.fillRect(x-37*s,hy-42*s,18*s,22*s);g.fillStyle='#0b0a1e';for(let j=0;j<3;j++)g.fillRect(x-37*s,hy-(36-j*7)*s,18*s,1.2*s)}
  else if(st.mid==='ice'){poly([[x-22*s,hy],[x-12*s,hy-46*s],[x-3*s,hy-18*s],[x+6*s,hy-64*s],[x+20*s,hy]],'#cfeeff','#ffffff',1.5);poly([[x+2*s,hy],[x+6*s,hy-64*s],[x+11*s,hy]],'#f4fcff');g.fillStyle='rgba(255,255,255,.85)';g.beginPath();g.ellipse(x-30*s,hy,34*s,8*s,0,Math.PI,TAU);g.fill();if(Math.sin(t*3+i*2)>.6){g.strokeStyle='#fff';g.lineWidth=1.4;const px=x+6*s,py=hy-64*s;g.beginPath();g.moveTo(px-6,py);g.lineTo(px+6,py);g.moveTo(px,py-6);g.lineTo(px,py+6);g.stroke()}}
  else if(st.mid==='rock'){poly([[x-30*s,hy],[x-16*s,hy-52*s],[x-2*s,hy-30*s],[x+10*s,hy-70*s],[x+30*s,hy]],'#1c090a');const gw=140+Math.sin(t*3+i)*50|0;g.strokeStyle='rgba(255,'+gw+',40,.9)';g.lineWidth=2*s;g.lineCap='round';g.beginPath();g.moveTo(x+10*s,hy-64*s);g.lineTo(x+4*s,hy-34*s);g.lineTo(x+12*s,hy);g.stroke();for(let j=0;j<4;j++){const k=(t*.5+j*.25+i*.13)%1;g.fillStyle='rgba(255,'+(160+j*20)+',60,'+(1-k)+')';g.fillRect(x+(Math.sin(j*9+i)*14+Math.sin(t+j)*5)*s,hy-(20+k*120)*s,2.2,2.2)}}
  else{g.fillStyle='#dfe8f4';g.fillRect(x-12*s,hy-(i%2?34:58)*s,24*s,(i%2?35:59)*s);g.fillStyle='#b9c9de';g.fillRect(x-12*s,hy-(i%2?34:58)*s,7*s,(i%2?35:59)*s);g.fillStyle='#ffffff';g.fillRect(x-17*s,hy-7*s,34*s,8*s);poly([[x-12*s,hy-(i%2?34:58)*s],[x-5*s,hy-(i%2?43:66)*s],[x+2*s,hy-(i%2?36:60)*s],[x+12*s,hy-(i%2?40:63)*s],[x+12*s,hy-(i%2?34:58)*s]],'#dfe8f4');
   const px=x+30*s;g.fillStyle='#6a5a48';g.fillRect(px-1.5*s,hy-130*s,3*s,131*s);g.fillStyle=st.sun[0];g.beginPath();g.moveTo(px,hy-128*s);for(let k=0;k<=6;k++)g.lineTo(px+k*8*s,hy-128*s+Math.sin(t*4+k*.9+i)*3*s*(k/6));for(let k=6;k>=0;k--)g.lineTo(px+k*8*s,hy-102*s+Math.sin(t*4+k*.9+i+.6)*3*s*(k/6));g.closePath();g.fill();g.strokeStyle='rgba(0,0,0,.3)';g.lineWidth=1;g.stroke()}});
 /* floor */
 g.save();g.beginPath();g.rect(0,hy,W,fh+2);g.clip();
 const cf=g.createLinearGradient(0,hy,0,hy+fh*.35);cf.addColorStop(0,'rgba(0,0,0,.34)');cf.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=cf;g.fillRect(0,hy,W,fh*.35);
 const pr=(wx,y)=>W/2+(wx-cam.x)*z*(.62+2.2*(y-hy)/300);g.fillStyle='rgba('+rf+',.07)';g.beginPath();g.moveTo(pr(-200,hy),hy);g.lineTo(pr(200,hy),hy);g.lineTo(pr(200,H),H);g.lineTo(pr(-200,H),H);g.fill();
 DEC.forEach(q=>{const y=hy+fh*q.d*q.d,x=pr(q.x,y);if(x<-60||x>W+60)return;const k=(.35+q.d*1.5)*q.s*z;
  if(q.k===0){g.fillStyle='rgba(0,0,0,.2)';g.beginPath();g.ellipse(x,y,22*k,4.5*k,0,0,TAU);g.fill()}
  else if(q.k===1){g.strokeStyle='rgba(0,0,0,.34)';g.lineWidth=Math.max(1,1.2*k);g.lineCap='round';g.beginPath();g.moveTo(x-14*k,y);g.lineTo(x-4*k,y+2*k);g.lineTo(x+3*k,y-1.5*k);g.lineTo(x+13*k,y+1.5*k);g.moveTo(x-4*k,y+2*k);g.lineTo(x-7*k,y+5*k);g.stroke()}
  else{g.fillStyle='rgba('+rf+','+(.16+.12*Math.sin(t*2+q.a))+')';g.beginPath();g.ellipse(x,y,9*k,1.6*k,0,0,TAU);g.fill()}});
 g.restore();
 /* soft dark corners */
 const vg=g.createRadialGradient(W/2,H*.48,Math.min(W,H)*.45,W/2,H*.48,Math.max(W,H)*.78);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba('+(st.vg||'0,0,0')+',.38)');g.fillStyle=vg;g.fillRect(0,0,W,H)}
})();
