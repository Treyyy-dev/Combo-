/* Look upgrades, each off unless released (also sfx2: anime fight sounds; uniq: element looks for skills and ultimates; views2): weap2 (detailed weapons), hair2 (detailed hair), phys (hair and cloth physics),
   stance (unique idle stances and poses), winpose (victory pose shot before the result), map2 (detailed maps), ult2 (cinematic ultimates), otsback (foreground shadow drawn as the character's back), winscar (cuts, bruises and blood the winner took in the fight stay on them in the front victory shot), winfront (the winner's pose shot shows them full body from the front, looking at the camera), lookcam (in those shots the other fighter is drawn from the front, facing the camera), noots (in over-the-shoulder cutscene shots show only the dark shadow, not that character). */
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
const _sc=shotCam;shotCam=function(s,k){if(s.kind==='vpose'&&s.who){const f=s.who,e=ease(clamp(k*1.7,0,1)),hh=-120*(f.c.sc||1);if(F().winfront)return{x:f.x,y:lerp(-60,-74*(f.c.sc||1),e),z:lerp(1.05,1.78,e),rot:lerp(.05,0,e)};return{x:f.x+f.face*lerp(46,6,e),y:lerp(-66,hh+38,e),z:lerp(1.15,2.25,e),rot:f.face*lerp(.08,-.02,e)}}return _sc(s,k)};
const _ex=exprOf;exprOf=function(f){if(f&&f._vp&&f.state==='pose')return'happy';return _ex(f)};
const _fin=finish;finish=function(win){_fin(win);if(!F().winpose&&!F().winfront)return;const I=G.intro;if(!I||!I.out||!I.sh||I.sh.length<2)return;const lo=I.sh.find(q=>q.kind==='kneel'),wi=I.sh.find(q=>q!==lo);if(!lo||!wi||!wi.who)return;const w=wi.who;
 const only=F().winfront,wl=only&&wi.line?wi.line:null;
 I.sh=(only?[]:[lo,wi]).concat([{kind:'vpose',who:w,line:wl,dur:wl?Math.max(2.2,1.9+wl.length*.05):2,pre(){if(only){try{lo.pre&&lo.pre();G.f.forEach(q=>{if(q!==w)q.hide=true});(G.al||[]).forEach(q=>{if(q!==w)q.hide=true});G.as=[]}catch(e){}}w.hide=false;w.mv=null;w.y=0;w.vx=w.vy=0;w.pvx=0;w.state='pose';w.pz=vpose(w.c);w._vp=1;w.st=0;G.flash=.35;try{sfx('ult');shake(10);G.fx.push({type:'ring',t:0,life:.5,x:w.x,y:-70,r0:20,r1:240,col:w.c.col,w:8})}catch(e){}}}])};
const _bg=begin;begin=function(mk){const r=_bg(mk);try{(G.tm||[]).forEach(T=>T.list.forEach(f=>{f._vp=0}))}catch(e){}return r};
/* ===== CUTSCENES: when a character's big dark shadow fills the front, do not also draw that character in the scene ===== */
const dkc=(h,k)=>hexOk(h)?shade(h,k):h;
function drawBack(f,k){const c=f.c,d=f.face,sc=4.4*(H>W?.8:1),t=G.t,ink=INK,hair=dkc(c.hair,.62),hairD=dkc(c.hair,.4),top=dkc(c.top,.55),topD=dkc(c.top,.36),skin=dkc(c.skin,.5),A=c.acc||[],long=[1,2,5,6,7].includes(c.style);
 g.save();g.translate((d>0?W*.13:W*.87)-d*k*26,H+sc*84);g.scale(d*sc,sc);g.lineJoin='round';g.lineCap='round';
 if(c.style===7||c.style===3){g.beginPath();g.moveTo(-40,-80);g.quadraticCurveTo(-46,-104,-12,-116);g.lineTo(16,-116);g.quadraticCurveTo(52,-104,48,-80);g.closePath();g.fillStyle=dkc(c.style===7?c.col:c.col2,.5);g.fill();g.strokeStyle=ink;g.lineWidth=2;g.stroke()}
 g.beginPath();g.moveTo(-36,-80);g.quadraticCurveTo(-36,-100,-24,-106);g.quadraticCurveTo(-10,-111,-6,-117);g.lineTo(10,-117);g.quadraticCurveTo(14,-111,30,-106);g.quadraticCurveTo(42,-100,42,-80);g.closePath();g.fillStyle=top;g.fill();g.strokeStyle=ink;g.lineWidth=2.2;g.stroke();
 g.save();g.clip();g.fillStyle=topD;g.fillRect(-40,-120,26,44);g.fillStyle='rgba(255,255,255,.07)';g.fillRect(22,-120,22,44);g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=1.2;g.beginPath();g.moveTo(2,-112);g.lineTo(3,-80);g.moveTo(-18,-100);g.quadraticCurveTo(-12,-92,-14,-80);g.moveTo(24,-100);g.quadraticCurveTo(18,-92,20,-80);g.stroke();g.strokeStyle=dkc(c.col,.75);g.lineWidth=2;g.beginPath();g.moveTo(-8,-114);g.quadraticCurveTo(2,-108,12,-114);g.stroke();g.restore();
 g.fillStyle=skin;g.fillRect(-4,-124,12,10);g.strokeStyle=ink;g.lineWidth=2;g.strokeRect(-4,-124,12,10);
 [[-15.5,-133],[19.5,-133]].forEach(q=>{g.beginPath();g.ellipse(q[0],q[1],2.6,4,0,0,TAU);g.fillStyle=skin;g.fill();g.stroke()});
 if(A.includes('horns'))[[-9,-145,-15,-163,-2,-149],[13,-145,19,-163,6,-149]].forEach(q=>poly([[q[0],q[1]],[q[2],q[3]],[q[4],q[5]]],dkc(c.col2,.6),ink));
 if(A.includes('ears'))[[-12,-143,-14,-162,-1,-149],[16,-143,18,-162,5,-149]].forEach(q=>poly([[q[0],q[1]],[q[2],q[3]],[q[4],q[5]]],hair,ink));
 if(c.style===0||c.style===4||c.style===3)[[-12,-143,-20,-160,-4,-149],[-2,-149,2,-168,8,-149],[10,-147,22,-160,16,-141],[-14,-134,-27,-136,-15,-126],[18,-134,31,-136,19,-126]].forEach(q=>poly([[q[0],q[1]],[q[2],q[3]],[q[4],q[5]]],hair,ink));
 g.beginPath();g.arc(2,-134,16.5,0,TAU);g.fillStyle=hair;g.fill();g.strokeStyle=ink;g.lineWidth=2.2;g.stroke();
 const hl=[[-13,-124],[-9,-117],[-5,-123],[-1,-115],[3,-122],[7,-115],[11,-123],[15,-117],[17,-125]];poly([[-14,-132]].concat(hl,[[18,-132]]),hair,ink,2);g.fillStyle=hair;g.fillRect(-13,-134,30,9);
 g.strokeStyle=hairD;g.lineWidth=1.1;g.beginPath();[-9,-3,3,9,14].forEach((x,i)=>{g.moveTo(2+(x-2)*.35,-149);g.quadraticCurveTo(x+(i-2)*.6,-136,x,-121)});g.stroke();
 g.strokeStyle=hexOk(c.hairHi)?shade(c.hairHi,.8):'rgba(255,255,255,.3)';g.lineWidth=2;g.beginPath();g.arc(2,-134,12,-2.2,-1.2);g.stroke();
 if(long){ribbon(2,-126,c.style===2||c.style===7?78:58,22,10,d>0?-4:4,.15,t,hair,ink)}
 if(c.style===1||c.style===5||c.style===6){circ(2,-127,3.4,dkc(c.col2,.7),ink,1.5)}
 if(c.style===4||A.includes('band')||c.style===0){g.strokeStyle=ink;g.lineWidth=6;g.lineCap='butt';g.beginPath();g.moveTo(-14.2,-138);g.quadraticCurveTo(2,-135,18.2,-138);g.stroke();g.strokeStyle=dkc(c.col,.75);g.lineWidth=3.2;g.stroke();g.lineCap='round';ribbon(-12,-137,26,5,2,-60,.3,t,dkc(c.col,.75),ink)}
 if(A.includes('halo')){g.strokeStyle=ink;g.lineWidth=4.5;g.beginPath();g.ellipse(2,-158,12,3.5,0,0,TAU);g.stroke();g.strokeStyle='#c9b060';g.lineWidth=2.5;g.stroke()}
 g.strokeStyle=c.col;g.globalAlpha=.55;g.lineWidth=1;g.beginPath();g.arc(2,-134,17.6,-2.6,-.5);g.stroke();g.beginPath();g.moveTo(30,-107);g.quadraticCurveTo(43,-101,43,-84);g.stroke();g.globalAlpha=1;
 g.restore()}
let OTSF=null,OTST=-9;const _ots=drawOTS;drawOTS=function(f,k){if(F().noots||F().lookcam){OTSF=f;OTST=G.t}if(F().otsback){try{return drawBack(f,k)}catch(e){}}return _ots(f,k)};
const FA={katana:150,staff:105,bo:105,bow:90,dagger:320,orb:0,fist:0};
function seg2(a,b,r0,r1,fill){const dx=b.x-a.x,dy=b.y-a.y,L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L;g.beginPath();g.moveTo(a.x+nx*r0,a.y+ny*r0);g.lineTo(b.x+nx*r1,b.y+ny*r1);g.arc(b.x,b.y,r1,Math.atan2(ny,nx),Math.atan2(-ny,-nx),true);g.lineTo(a.x-nx*r0,a.y-ny*r0);g.arc(a.x,a.y,r0,Math.atan2(-ny,-nx),Math.atan2(ny,nx),true);g.closePath();g.fillStyle=fill;g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke()}
function drawFrontChar(c,o){const t=o.t||0,ex=o.expr||'',ink=INK,A=c.acc||[],long=[1,2,5,6,7].includes(c.style),bk=(c.sc>1.07||c.dm>1)?1.12:1,br=Math.sin(t*3)*.8,dk=dkOf(c);g.lineJoin='round';g.lineCap='round';
 if(c.style===7||c.style===3){poly([[-20*bk,-110],[20*bk,-110],[30*bk,-22],[-30*bk,-22]],c.style===7?c.col:c.col2,ink,2)}
 if(long){ribbon(-12,-128,c.style===2||c.style===7?76:54,13,5,-5,.1,t,c.hair,ink);ribbon(12,-128,c.style===2||c.style===7?76:54,13,5,5,.1,t+1,c.hair,ink)}
 if(c.style===0||c.style===4||c.style===3)[[-12,-140,-24,-152,-8,-146],[12,-140,24,-152,8,-146],[-15,-132,-27,-134,-15,-125],[15,-132,27,-134,15,-125],[-4,-147,0,-162,4,-147]].forEach(q=>poly([[q[0],q[1]],[q[2],q[3]],[q[4],q[5]]],c.hair,ink));
 g.beginPath();g.ellipse(0,-131,17,17.5,0,0,TAU);g.fillStyle=dk;g.fill();g.strokeStyle=ink;g.lineWidth=2;g.stroke();
 [-1,1].forEach(sx=>{seg2({x:sx*6.2*bk,y:-70},{x:sx*7.6*bk,y:-37},7.6*bk,5.8*bk,sx<0?c.pantsSh:c.pants);seg2({x:sx*7.6*bk,y:-37},{x:sx*8.2*bk,y:-3},5.8*bk,3.9,sx<0?c.pantsSh:c.pants);
  g.beginPath();g.ellipse(sx*9.2*bk,2.2,6.4,4.2,0,0,TAU);g.fillStyle=c.bare?c.skin:'#2b2438';g.fill();g.strokeStyle=ink;g.lineWidth=2;g.stroke();if(c.bare){g.lineWidth=.9;g.beginPath();[-2.4,0,2.4].forEach(x=>{g.moveTo(sx*9.2*bk+x,3.2);g.lineTo(sx*9.2*bk+x,6)});g.stroke()}else{g.strokeStyle='#efeaf8';g.lineWidth=1.5;g.beginPath();g.moveTo(sx*9.2*bk-5,5.4);g.lineTo(sx*9.2*bk+5,5.4);g.stroke();g.strokeStyle=c.col;g.beginPath();g.moveTo(sx*9.2*bk-4,-1.4);g.lineTo(sx*9.2*bk+4,-1.4);g.stroke()}});
 const TP=[[-11,-65],[-12.6,-74],[-10,-88],[-13.4,-100-br],[-18,-108-br],[-9,-115],[9,-115],[18,-108-br],[13.4,-100-br],[10,-88],[12.6,-74],[11,-65]].map(q=>[q[0]*bk,q[1]]);
 const sm=()=>{const n=TP.length;let m=[(TP[n-1][0]+TP[0][0])/2,(TP[n-1][1]+TP[0][1])/2];g.beginPath();g.moveTo(m[0],m[1]);for(let i=0;i<n;i++){const j=(i+1)%n;m=[(TP[i][0]+TP[j][0])/2,(TP[i][1]+TP[j][1])/2];g.quadraticCurveTo(TP[i][0],TP[i][1],m[0],m[1])}g.closePath()};
 sm();g.strokeStyle=ink;g.lineWidth=4;g.stroke();g.fillStyle=c.top;g.fill();g.save();sm();g.clip();g.fillStyle=c.topSh;g.fillRect(-22*bk,-120,7.5*bk,60);g.fillRect(12*bk,-120,10*bk,60);
 g.fillStyle='rgba(255,255,255,.14)';g.beginPath();g.ellipse(-4*bk,-101,4*bk,5,0,0,TAU);g.fill();g.strokeStyle='rgba(0,0,0,.22)';g.lineWidth=1.2;g.beginPath();g.moveTo(-10*bk,-97);g.quadraticCurveTo(-5*bk,-93.5,-.6,-97);g.moveTo(.6,-97);g.quadraticCurveTo(5*bk,-93.5,10*bk,-97);g.moveTo(0,-95);g.lineTo(0,-78);g.moveTo(-4*bk,-89);g.lineTo(4*bk,-89);g.moveTo(-3.6*bk,-83.5);g.lineTo(3.6*bk,-83.5);g.stroke();
 g.beginPath();g.moveTo(-6,-116);g.lineTo(6,-116);g.lineTo(0,-103);g.closePath();g.fillStyle=c.skin;g.fill();g.strokeStyle=ink;g.lineWidth=1.4;g.stroke();g.strokeStyle=c.col;g.lineWidth=2.2;g.beginPath();g.moveTo(-7.5,-115);g.lineTo(0,-101.5);g.lineTo(7.5,-115);g.stroke();
 g.fillStyle=c.col2;g.fillRect(-16*bk,-77,32*bk,5.4);g.fillStyle=ink;g.fillRect(-2.6,-78,5.2,7.4);g.fillStyle=c.col;g.fillRect(-1.5,-77,3,5.4);g.restore();
 [-1,1].forEach(sx=>{const up=o.win&&sx<0,fr=o.arms==='front',S={x:sx*17.5*bk,y:-107-br},E=fr?{x:sx*20.5*bk,y:-90}:up?{x:sx*26*bk,y:-121}:{x:sx*21*bk,y:-89},Hd=fr?{x:sx*3.4,y:-75}:up?{x:sx*23*bk,y:-144+Math.sin(t*6)*1.5}:{x:sx*19*bk,y:-71};seg2(S,E,5.9*bk,4.6*bk,sx<0?c.topSh:c.top);seg2(E,Hd,4.6*bk,3.5*bk,c.bare?(sx<0?c.skinSh:c.skin):(sx<0?c.topSh:c.top));
  if(sx>0&&c.weapon!=='fist'&&!fr)weapon(c,Hd,FA[c.weapon]||0,o,false);const gl=c.weapon==='fist',r=gl?(c.fistR||8.2)*.8:4.5;circ(Hd.x,Hd.y+2,r,gl?c.col2:(sx<0?c.skinSh:c.skin),ink,2);g.strokeStyle='rgba(0,0,0,.4)';g.lineWidth=.9;g.beginPath();[-.45,0,.45].forEach(k=>{g.moveTo(Hd.x+k*r,Hd.y+2+r*.15);g.lineTo(Hd.x+k*r,Hd.y+2+r*.95)});g.stroke()});
 g.fillStyle=c.skinSh;g.fillRect(-3.8,-121,7.6,8);g.strokeStyle=ink;g.lineWidth=2;g.strokeRect(-3.8,-121,7.6,8);
 g.save();g.translate(0,-132);[-1,1].forEach(sx=>{g.beginPath();g.ellipse(sx*14.4,3,2.4,3.8,0,0,TAU);g.fillStyle=c.skin;g.fill();g.strokeStyle=ink;g.lineWidth=1.8;g.stroke()});
 g.beginPath();g.moveTo(-14,0);g.arc(0,0,14,Math.PI,TAU);g.quadraticCurveTo(14,10.5,6,15.6);g.quadraticCurveTo(0,18.6,-6,15.6);g.quadraticCurveTo(-14,10.5,-14,0);g.closePath();g.fillStyle=c.skin;g.fill();g.strokeStyle=ink;g.lineWidth=2;g.stroke();
 g.fillStyle='rgba(190,90,80,.2)';g.beginPath();g.moveTo(-13.4,-4);g.lineTo(13.4,-4);g.lineTo(13.2,0);g.quadraticCurveTo(0,2,-13.2,0);g.fill();
 eye(5.8,2.6,7.2,8.6,c,ex);g.save();g.scale(-1,1);eye(5.8,2.6,7.2,8.6,c,ex);g.restore();
 g.strokeStyle=ink;g.lineWidth=1.4;g.beginPath();g.moveTo(0,7.4);g.lineTo(.9,9.2);g.stroke();
 if(c.style===3)poly([[-12,7],[12,7],[10,12],[5,16.4],[-5,16.4],[-10,12]],'#262232',ink,1.6);
 else{g.lineWidth=1.5;if(ex==='yell'){ell(0,12,2.8,3.2,'#7a1f2b');g.beginPath();g.ellipse(0,12,2.8,3.2,0,0,TAU);g.stroke()}else if(ex==='hurt'){ell(0,12,2,2.1,'#7a1f2b')}else if(ex==='talk'||ex==='tired'){ell(0,12.2,2.2,2.3,'#7a1f2b')}else if(ex==='happy'){g.beginPath();g.moveTo(-3.4,11);g.quadraticCurveTo(0,14.6,3.4,11);g.stroke()}else if(ex==='smirk'){g.beginPath();g.moveTo(-3,12.4);g.quadraticCurveTo(1,13.2,3.6,10.6);g.stroke()}else{g.beginPath();g.moveTo(-2.2,12.2);g.lineTo(2.2,12.2);g.stroke()}}
 g.beginPath();g.moveTo(-15.8,-1);g.arc(0,-1,15.8,Math.PI,TAU);for(const q of(BANGS[c.style]||[]))g.lineTo(q[0],q[1]);g.closePath();g.fillStyle=c.hair;g.fill();g.strokeStyle=ink;g.lineWidth=2;g.stroke();
 g.strokeStyle=c.hairHi;g.lineWidth=2.2;g.beginPath();g.arc(0,-1,11,-2.2,-.95);g.stroke();
 if(c.style===4||A.includes('band')){g.lineCap='butt';g.strokeStyle=ink;g.lineWidth=6.5;g.beginPath();g.moveTo(-15.5,-7);g.lineTo(15.5,-7);g.stroke();g.strokeStyle=c.col;g.lineWidth=3.5;g.stroke();g.lineCap='round'}
 if(A.includes('horns'))[-1,1].forEach(sx=>poly([[sx*4,-14],[sx*11,-28],[sx*12,-11]],c.col2,ink));
 if(A.includes('ears'))[-1,1].forEach(sx=>{poly([[sx*4,-15],[sx*11.5,-28],[sx*13.5,-10]],c.hair,ink);poly([[sx*6.6,-15],[sx*10.8,-23],[sx*11.8,-13]],'#ffb0c0')});
 if(A.includes('halo')){g.strokeStyle=ink;g.lineWidth=4.5;g.beginPath();g.ellipse(0,-24,12,3.5,0,0,TAU);g.stroke();g.strokeStyle='#ffe98a';g.lineWidth=2.5;g.stroke()}
 if(A.includes('glasses')){g.strokeStyle=ink;g.lineWidth=1.6;g.fillStyle='rgba(180,230,255,.3)';[-1,1].forEach(sx=>{g.beginPath();g.ellipse(sx*5.8,2.6,4.9,5.2,0,0,TAU);g.fill();g.stroke()});g.beginPath();g.moveTo(-1,2);g.lineTo(1,2);g.stroke()}
 if(A.includes('patch')){g.strokeStyle=ink;g.lineWidth=1.5;g.beginPath();g.moveTo(-14,-6);g.lineTo(14,2);g.stroke();g.beginPath();g.ellipse(5.8,2.6,4.8,5.2,0,0,TAU);g.fillStyle='#14121c';g.fill();g.stroke()}
 if(A.includes('mark')){g.strokeStyle=c.col;g.lineWidth=1.8;g.beginPath();g.moveTo(7,8.5);g.lineTo(11,9.5);g.moveTo(-7,8.5);g.lineTo(-11,9.5);g.stroke()}
 const dm=o.dmg||0;
 if(dm>.25){g.lineCap='round';g.strokeStyle='#b3202a';g.lineWidth=1.1;g.beginPath();g.moveTo(-9.5,6);g.lineTo(-5.5,9.5);g.moveTo(-7,5.5);g.lineTo(-3.5,8.5);g.stroke()}
 if(dm>.5){g.fillStyle='rgba(110,50,130,.35)';g.beginPath();g.ellipse(8,9,4.2,3,0,0,TAU);g.fill();g.strokeStyle='#b3202a';g.lineWidth=1.2;g.beginPath();g.moveTo(4,-9);g.lineTo(8,-4);g.moveTo(6,-10);g.lineTo(10,-5);g.stroke();ell(3.6,14.4,1.2,2.1,'#a0101c')}
 if(dm>.75){g.strokeStyle='#a0101c';g.lineWidth=2;g.beginPath();g.moveTo(-4,-6);g.quadraticCurveTo(-6,2,-5,9);g.stroke();ell(-5,10.4,1.5,2,'#a0101c');circ(9.5,12.5,1,'#a0101c')}
 if(o.fx)try{o.fx(1)}catch(e){}
 g.restore();
 if(dm>.5){g.fillStyle='rgba(150,16,28,.75)';g.beginPath();g.ellipse(5*bk,-96,5,3.5,.5,0,TAU);g.ellipse(8*bk,-90,2,3,0,0,TAU);g.fill();if(dm>.75){g.beginPath();g.ellipse(-5*bk,-82,4,2.6,-.4,0,TAU);g.fill();g.strokeStyle='#8a1420';g.lineWidth=1.3;g.beginPath();g.moveTo(-20*bk,-98);g.lineTo(-15*bk,-93);g.moveTo(5*bk,-56);g.lineTo(10*bk,-50);g.stroke()}}}
try{window.CFRONT=drawFrontChar}catch(e){}
function camSubject(){if(!OTSF||G.t-OTST>=.12)return null;if(G.mode==='intro'&&G.intro){const q=G.intro.sh[G.intro.i];return q&&q.ots&&q.who?q.who:null}if(G.mode!=='scene')return null;let best=null,bd=1e9;(G.f||[]).concat(G.al||[]).forEach(x=>{if(!x||x===OTSF||x.hide)return;const d=Math.abs(x.x-OTSF.x);if(d<bd){bd=d;best=x}});return best}
const _df2=drawFighter;drawFighter=function(f,sil){const fl=F();if(fl.noots&&f===OTSF&&G.t-OTST<.12&&(G.mode==='intro'||G.mode==='scene'))return;
 if(fl.winfront&&!sil&&!f.hide&&f._vp&&f.state==='pose'&&(G.mode==='intro'||G.mode==='result')){try{g.save();g.translate(f.x,f.y);const sc=f.sc||f.c.sc||1;g.scale(sc,sc);drawFrontChar(f.c,{t:f.at,expr:G.intro&&G.intro.sp===f&&Math.sin(G.t*18)>0?'talk':'happy',win:1,dmg:fl.winscar?1-f.hp/f.mhp:0});g.restore();return}catch(e){try{g.restore()}catch(x){}}}
 if(fl.lookcam&&!sil&&!f.hide&&f.state!=='enter'&&f===camSubject()){try{g.save();g.translate(f.x,f.y);const sc=f.sc||f.c.sc||1;g.scale(sc,sc);drawFrontChar(f.c,{t:f.at,expr:exprOf(f),sway:f.sway});g.restore();return}catch(e){try{g.restore()}catch(x){}}}
 return _df2(f,sil)};
/* ================= CINEMATIC ULTIMATES ================= */
const _su2=startUlt;startUlt=function(f,o){_su2(f,o);if(!F().ult2||!G.cine)return;G.cine.dur=1.7;G.cine.u2=1;f._ufin=0;f._uhit=0;try{shake(10);G.fx.push({type:'ring',t:0,life:.5,x:f.x,y:f.y-70,r0:20,r1:300,col:f.c.col,w:10},{type:'ring',t:-.12,life:.5,x:f.x,y:f.y-70,r0:20,r1:220,col:f.c.col2,w:6})}catch(e){}};
const _dcn=drawCine;drawCine=function(){const cn=G.cine;if(!F().ult2||!cn||!cn.u2)return _dcn();const f=cn.f,c=f.c,t=cn.t,k=t/cn.dur,d=f===G.f[0]?1:-1,T=G.t,M=Math.max(W,H);
 g.save();const rgd=g.createRadialGradient(W/2,H*.46,M*.05,W/2,H*.46,M*.8);rgd.addColorStop(0,'rgba(255,255,255,0)');rgd.addColorStop(.55,'rgba(10,4,30,.35)');rgd.addColorStop(1,'rgba(4,0,16,.85)');g.fillStyle=rgd;g.fillRect(0,0,W,H);
 g.globalAlpha=.5*clamp(t*5,0,1);[[c.col,.62,70],[c.col2,.7,26],['#ffffff',.745,8]].forEach((q,i)=>{const off=(1-ease(clamp(t*3-i*.15,0,1)))*W*1.2*d;g.fillStyle=q[0];g.beginPath();g.moveTo(-40+off,H*q[1]+40);g.lineTo(W+40+off,H*q[1]-60);g.lineTo(W+40+off,H*q[1]-60+q[2]);g.lineTo(-40+off,H*q[1]+40+q[2]);g.fill()});g.globalAlpha=1;g.restore();
 _dcn();
 g.save();const al=clamp(t*6,0,1)*clamp((cn.dur-t)*6,0,1);
 g.globalAlpha=al;g.strokeStyle='#fff';g.lineCap='round';for(let i=0;i<4;i++){const sd=i%2?W-14-i*9:14+i*9,ph=((T*14)|0)+i*7;g.lineWidth=2+(i%2);g.beginPath();let y=0;g.moveTo(sd,0);for(let j=1;j<=9;j++){y=H*j/9;g.lineTo(sd+Math.sin(ph*12.9+j*4.1)*16,y)}g.strokeStyle=i%2?c.col2:'#fff';g.stroke()}
 for(let i=0;i<26;i++){const a=((i*.618+T*.9)%1),x=(i*97%W)+Math.sin(T*3+i)*20,y=H-a*H*1.1,s=2+(i%4);g.globalAlpha=al*(1-a)*.9;g.fillStyle=i%3?c.col:c.col2;g.fillRect(x,y,s,s*3.2)}
 const bh=Math.min(150,H*.3),by=H>W?H*.2:H*.16,gx=((t*1.6)%1.4-.2)*W;g.globalAlpha=al*.85;const gg=g.createLinearGradient(gx-70,0,gx+70,0);gg.addColorStop(0,'rgba(255,255,255,0)');gg.addColorStop(.5,'rgba(255,255,255,.75)');gg.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gg;g.beginPath();g.moveTo(gx-70,by+bh);g.lineTo(gx-10,by);g.lineTo(gx+70,by);g.lineTo(gx+10,by+bh);g.fill();
 g.globalAlpha=al;const ch='ULTIMATE  ✦  '+c.un+'  ✦  ',fs=Math.min(22,H*.05);g.font=fs+'px '+FB;const tw=g.measureText(ch).width||200;[[H*.08+fs*.9,1],[H*.92-fs*.2,-1]].forEach(q=>{g.fillStyle=q[1]>0?c.col:c.col2;g.fillRect(0,q[0]-fs*.75,W,fs*1.4);for(let x=-(T*260*q[1]%tw+tw)%tw-tw;x<W;x+=tw)txt(ch,x,q[0],fs,'#10061e',null,'left',FB)});
 const fl=clamp((t-(cn.dur-.14))/.14,0,1);if(fl>0){g.globalAlpha=fl;g.fillStyle='#fff';g.fillRect(0,0,W,H)}if(t<.1){g.globalAlpha=1-t/.1;g.fillStyle='#fff';g.fillRect(0,0,W,H)}
 g.restore()};
const _uf2=drawUltFX;drawUltFX=function(f,o){_uf2(f,o);const m=f.mv;if(!F().ult2||f.state!=='atk'||!m||!m.ult)return;const c=f.c,T=G.t,st=f.st,k=Math.min(1,st*4);
 g.save();g.translate(f.x,f.y);g.globalAlpha=.55*k;for(let i=0;i<3;i++){const r=((T*1.6+i/3)%1);g.strokeStyle=i%2?c.col2:c.col;g.lineWidth=5*(1-r)+1;g.beginPath();g.ellipse(0,3,30+r*190,6+r*34,0,0,TAU);g.stroke()}
 for(let i=0;i<14;i++){const a=((i*.37+T*1.3)%1),x=Math.sin(i*7.3)*70*(1-a*.4),h=30+((i*13)%40);g.globalAlpha=(1-a)*.8*k;g.fillStyle=i%2?c.col:'#fff';g.fillRect(x-1.5,-a*330-h,3,h)}
 g.globalAlpha=.3*k;const gr=g.createRadialGradient(0,-80,10,0,-80,150);gr.addColorStop(0,c.col2);gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(-150,-230,300,300);g.restore();
 if(o&&(o.state==='hurt'||o.state==='launch')){g.save();g.translate(o.x,o.y-80);g.globalAlpha=.85;g.fillStyle='#fff';const fr=(T*30)|0;for(let i=0;i<14;i++){const a=i*TAU/14+Math.sin(i*31+fr)*.2,r0=46+((i*17+fr*7)%20),r1=r0+50+((i*29+fr*3)%60);g.beginPath();g.moveTo(Math.cos(a)*r0,Math.sin(a)*r0);g.lineTo(Math.cos(a-.035)*r1,Math.sin(a-.035)*r1);g.lineTo(Math.cos(a+.035)*r1,Math.sin(a+.035)*r1);g.fill()}g.restore()}};
const _up2=update;update=function(rdt){_up2(rdt);if(!F().ult2)return;const u=G.uf;if(!u||!u.mv||!u.mv.hits||G.cine||G.mode!=='fight')return;const hs=u.mv.hits,ft=hs[hs.length-1].t0,v=G.f[1-u.side];
 if(!u._ufin&&u.st>=ft){u._ufin=1;try{G.flash=Math.max(G.flash,.9);G.impact=.1;shake(34);if(!G.net)G.hitstop=Math.max(G.hitstop,.14);const x=v?v.x:u.x,y=(v?v.y:0)-80;spark(x,y,'#fff',true);spark(x,y,u.c.col,true);for(let i=0;i<3;i++)G.fx.push({type:'ring',t:-i*.07,life:.55,x,y,r0:20,r1:260+i*90,col:i%2?u.c.col2:u.c.col,w:10-i*2});G.fx.push({type:'bolt',t:0,life:.35,x,col:u.c.col2},{type:'bolt',t:-.08,life:.3,x:x+60,col:'#fff'},{type:'bolt',t:-.14,life:.3,x:x-70,col:u.c.col});for(let i=0;i<26;i++){const a=rnd(TAU),q=rnd(200,760);addP({x,y,vx:Math.cos(a)*q,vy:Math.sin(a)*q,g:900,life:rnd(.4,.9),size:rnd(4,11),col:i%3?u.c.col:'#fff',shape:i%2?'d':'c'})}}catch(e){}}};
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
/* ================= flag "views2": front and back views outside the story =================
   Ultimate: while the cut-in plays the attacker is seen from behind winding up, then turns to face the camera, and the face in the cut-in turns to the front with them. Match intro: the close-up shot shows the
   fighter from the front. In a match: a fighter in their win pose faces the camera. */
{const _df3=drawFighter;drawFighter=function(f,sil){const fl=F();if(!fl.views2||sil||!f||f.hide||G.mode==='scene'||f.y<0)return _df3(f,sil);let v=null;const cn=G.cine,ult=cn&&cn.f===f;
 if(ult)v=cn.t<cn.dur*.35?'back':'front';
 else if(G.mode==='intro'&&G.intro&&G.intro.sh){const q=G.intro.sh[G.intro.i];if(q&&(q.kind==='cf'||q.kind==='front')&&q.who===f&&f.state!=='enter'&&f.state!=='atk'&&!f._vp)v='front'}
 else if((G.mode==='fight'||G.mode==='ko')&&f.state==='win')v='front';
 if(!v||(v==='back'&&!window.CBACK))return _df3(f,sil);
 g.save();try{g.translate(f.x,f.y);const sc=f.sc||f.c.sc||1;g.scale(sc,sc);if(v==='back')window.CBACK(f.c,{t:f.at});else drawFrontChar(f.c,{t:f.at,expr:ult?'yell':exprOf(f),sway:f.sway,dmg:1-f.hp/f.mhp,win:f.state==='win'})}catch(e){}g.restore()}}
{const _dc3=drawCine;drawCine=function(){const cn=G.cine;if(!F().views2||!cn||cn.t<cn.dur*.35)return _dc3();const hb=headBack,hf=headFront;headBack=function(){};headFront=function(c){try{g.save();g.translate(0,132);drawFrontChar(c,{t:G.t,expr:'yell'});g.restore()}catch(e){}};try{_dc3()}finally{headBack=hb;headFront=hf}}}
/* ================= flag "sfx2": anime fight sound effects =================
   Layered impact, weapon and element sounds made in the browser (no clips). Punches thud and crack, blades ring, heavy hits get the high "kiiin" ring,
   skills and shots sound like their element, plus fuller guard, dash, jump, ultimate and KO sounds. */
const famOf=c=>{try{return EL[c.el|0][3]|0}catch(e){return 0}};
let SCX=null,HCX=null;
{const AOK=()=>typeof AC!=='undefined'&&AC&&AC.state==='running',later=(ms,fn)=>setTimeout(()=>{try{if(AOK())fn()}catch(e){}},ms),jit=()=>.92+Math.random()*.16;
 const elem=(fm,v)=>{switch(fm){
  case 0:for(let i=0;i<3;i++)later(i*35,()=>noise(.04,.16*v,5200,2,'highpass'));tone('sawtooth',1400,300,.14,.06*v);break;
  case 1:noise(.34,.22*v,300,1,'lowpass',1600);tone('sawtooth',90,160,.3,.07*v);break;
  case 2:tone('sine',1900,2300,.16,.07*v);later(50,()=>tone('sine',2700,3100,.2,.05*v));noise(.08,.08*v,6000,3,'highpass');break;
  case 3:tone('sawtooth',95,55,.34,.11*v);noise(.3,.1*v,500,1,'lowpass',180);break;
  case 4:noise(.3,.3*v,180,1,'lowpass');tone('sine',70,40,.28,.25*v);break;
  case 5:[1568,2093,2637,3136].forEach((f,i)=>later(i*38,()=>tone('triangle',f,f,.1,.05*v)));break;
  case 6:noise(.3,.2*v,700,1.2,'bandpass',2600);break;
  case 7:tone('sine',60,240,.3,.14*v);tone('sawtooth',480,120,.3,.04*v);break;
  case 8:noise(.26,.22*v,1400,1.2,'bandpass',400);tone('sine',500,180,.16,.07*v);break;
  case 9:tone('sine',1320,1760,.14,.06*v);later(70,()=>tone('sine',1760,2100,.14,.045*v));break;
  case 10:tone('sawtooth',130,80,.22,.12*v);noise(.14,.14*v,900,1.5,'bandpass',2400);break;
  default:tone('sine',1047,1047,.4,.08*v);tone('sine',1568,1568,.5,.05*v);tone('sine',2093,2093,.3,.03*v)}};
 const s0=sfx;sfx=function(n,a){if(!F().sfx2||!AOK())return s0(n,a);if(G.mode==='gacha'&&G.rules&&G.rules.type==='show'&&n!=='ui'&&n!=='ult')return;try{const j=jit(),cx=HCX||SCX,c=cx&&cx.f&&cx.f.c,w=c?c.weapon:'fist',m=cx&&cx.m,sk=m&&(m.k==='S'||m.ult),fm=c?famOf(c):0;
  switch(n){
  case'sw':if(w==='katana'||w==='dagger'){noise(.11,.15,2400*j,2.5,'bandpass',7200);tone('sine',2300*j,3900*j,.09,.035)}else if(w==='staff'||w==='bo'){noise(.17,.17,280*j,1.6,'bandpass',1100)}else if(w==='bow'){tone('triangle',320*j,170*j,.14,.13);noise(.03,.1,4200,3,'highpass')}else if(w==='orb'){tone('sine',880*j,1500*j,.14,.07);tone('triangle',1320*j,1980*j,.12,.04)}else noise(.09,.17,520*j,1.8,'bandpass',1700);
   if(sk)elem(fm,1);break;
  case'hit':if(w==='katana'||w==='dagger'){noise(.09,.34,4200*j,1.6,'bandpass',1100);tone('sine',1900*j,520*j,.07,.1);tone('sine',170,60,.08,.24)}else if(w==='staff'||w==='bo'){tone('triangle',430*j,170*j,.07,.32);noise(.05,.26,1500,2,'bandpass');tone('sine',150,55,.1,.3)}else if(w==='bow'){tone('triangle',260*j,110*j,.06,.3);noise(.04,.24,2600,3)}else if(w==='orb'){tone('square',900*j,190*j,.1,.09);noise(.08,.24,1700,1.5,'bandpass',500);tone('sine',160,55,.1,.26)}
    else{tone('sine',165*j,44,.12,.5);noise(.035,.34,2600,1,'highpass');noise(.1,.32,720*j,1,'lowpass')}
   if(sk)elem(fm,.55);break;
  case'big':tone('sine',125*j,30,.34,.6);noise(.05,.42,3000,1,'highpass');noise(.28,.5,520,1,'lowpass');later(30,()=>tone('sine',2650*j,2500*j,.42,.05));later(60,()=>noise(.3,.14,900,1,'bandpass',200));if(sk)elem(fm,.7);break;
  case'guard':tone('square',1250*j,720*j,.07,.1);tone('sine',3100*j,2900*j,.24,.05);noise(.05,.16,3600,3);break;
  case'dash':noise(.14,.2,380,1.6,'bandpass',2800);tone('sine',240,620,.1,.045);break;
  case'jump':tone('sine',260,560,.1,.09);noise(.07,.07,900,1.5,'bandpass',2200);break;
  case'shot':if(c){elem(fm,.8);noise(.1,.12,1800,2,'bandpass',4200)}else s0(n,a);break;
  case'ult':tone('sawtooth',70,620,.9,.16);tone('sine',45,90,1,.3);noise(.9,.16,250,1,'bandpass',5200);[523,659,784,1047,1319].forEach((f,i)=>later(120+i*110,()=>tone('triangle',f,f*1.01,.22,.06)));later(760,()=>{noise(.3,.3,300,1,'lowpass');tone('sine',2600,2400,.5,.05)});if(c)later(200,()=>elem(fm,.8));break;
  case'ko':tone('sine',110,22,1.1,.7);noise(.7,.42,380,1,'lowpass');later(60,()=>tone('sine',2500,2300,.7,.05));later(220,()=>noise(.6,.16,1200,1,'bandpass',200));break;
  default:return s0(n,a)}}catch(e){}};
 const m0=startMove;startMove=function(f,m,o){SCX={f,m};try{return m0(f,m,o)}finally{SCX=null}};
 const h0=applyHit0;applyHit0=function(a,v,h,sx,dir){HCX={f:a,m:a&&a.mv};try{return h0(a,v,h,sx,dir)}finally{HCX=null}}}
/* ================= flag "uniq": every fighter's skills and ultimate look like their own element =================
   Twelve element looks (storm, fire, ice, shadow, stone, star, wind, void, water, blossom, wild, holy). Each fighter's shots, skill start, skill hits and
   ultimate get their element's shapes in their own two colours, with the count, size and spin set by the fighter's name so no two look the same.
   Looks only: damage, speed, range and cooldowns are untouched. */
{const hs=n=>{let x=5381;for(let i=0;i<n.length;i++)x=((x*33)^n.charCodeAt(i))>>>0;return x},UQ=()=>!!F().uniq;
 function burst(c,x,y,n,pw){const fm=famOf(c),A=c.col,B=c.col2;for(let i=0;i<n;i++){const a=rnd(TAU),s=rnd(120,520)*pw,col=i%2?A:B;let o;
  switch(fm){case 0:o={vx:Math.cos(a)*s*1.6,vy:Math.sin(a)*s*1.6,life:rnd(.1,.22),size:rnd(5,9),shape:'l',col:i%3?B:'#fff'};break;
   case 1:o={vx:Math.cos(a)*s*.4,vy:-rnd(200,620)*pw,g:-500,life:rnd(.3,.6),size:rnd(9,18),col,shrink:1};break;
   case 2:o={vx:Math.cos(a)*s,vy:Math.sin(a)*s,g:500,life:rnd(.35,.7),size:rnd(6,12),shape:'d',col:i%2?'#fff':A};break;
   case 3:o={vx:Math.cos(a)*s*.35,vy:Math.sin(a)*s*.35-60,life:rnd(.4,.8),size:rnd(14,26),col:i%2?'rgba(20,8,40,.8)':A,shrink:1};break;
   case 4:o={vx:Math.cos(a)*s*.8,vy:-rnd(300,800)*pw,g:1800,life:rnd(.5,.9),size:rnd(8,16),shape:'d',col:i%2?'#6b4a3a':A};break;
   case 5:o={vx:Math.cos(a)*s*.7,vy:Math.sin(a)*s*.7,life:rnd(.4,.8),size:rnd(4,9),shape:'d',col:i%2?'#fff':B};break;
   case 6:o={vx:(Math.random()<.5?-1:1)*rnd(500,1100)*pw,vy:rnd(-120,120),life:rnd(.15,.3),size:rnd(6,10),shape:'l',col:i%2?'#fff':A};break;
   case 7:{const r=rnd(90,190);o={x:x+Math.cos(a)*r,y:y+Math.sin(a)*r,vx:-Math.cos(a)*r*3.2,vy:-Math.sin(a)*r*3.2,life:.3,size:rnd(6,12),col:i%2?'#0a0618':A};break}
   case 8:o={vx:Math.cos(a)*s*.7,vy:-rnd(200,700)*pw,g:1500,life:rnd(.4,.8),size:rnd(5,10),col:i%2?'#fff':A};break;
   case 9:o={vx:Math.cos(a)*s*.5,vy:Math.sin(a)*s*.4,g:180,life:rnd(.6,1.1),size:rnd(5,9),col:i%3?A:'#fff'};break;
   case 10:o={vx:Math.cos(a)*s,vy:Math.sin(a)*s,g:600,life:rnd(.3,.6),size:rnd(5,10),shape:i%2?'l':'d',col};break;
   default:o={vx:Math.cos(a)*s*1.3,vy:Math.sin(a)*s*1.3,life:rnd(.3,.55),size:rnd(6,11),shape:'l',col:i%2?'#fff':A}}
  addP(Object.assign({x,y},o))}}
 function deco(c,t,k,sz){const fm=famOf(c),h=hs(c.name),n=3+h%4,sp=(1+(h>>3)%3)*(h&1?1:-1),A=c.col,B=c.col2;g.lineCap='round';g.lineJoin='round';
  for(let i=0;i<n;i++){const a=t*sp*2.2+i*TAU/n,r=sz*(.75+.25*Math.sin(t*5+i)),x=Math.cos(a)*r,y=Math.sin(a)*r*.8;g.save();g.translate(x,y);g.globalAlpha=k;
   switch(fm){case 0:g.strokeStyle=i%2?'#fff':B;g.lineWidth=2.5;g.beginPath();g.moveTo(0,0);for(let q=1;q<4;q++)g.lineTo(-Math.cos(a)*q*r*.3+rnd(-8,8),-Math.sin(a)*q*r*.3+rnd(-8,8));g.stroke();break;
    case 1:{const fl=10+6*Math.sin(t*20+i);poly([[-7,4],[0,-fl-8],[7,4]],i%2?B:A);poly([[-3,4],[0,-fl],[3,4]],'#fff3b0');break}
    case 2:g.rotate(t*2+i);g.strokeStyle='#fff';g.lineWidth=2;g.beginPath();for(let q=0;q<3;q++){const b=q*Math.PI/3;g.moveTo(-Math.cos(b)*8,-Math.sin(b)*8);g.lineTo(Math.cos(b)*8,Math.sin(b)*8)}g.stroke();break;
    case 3:g.fillStyle=i%2?'rgba(20,8,40,.7)':A;g.globalAlpha=k*.6;g.beginPath();g.arc(0,0,9+4*Math.sin(t*7+i),0,TAU);g.fill();break;
    case 4:g.rotate(t*3+i);poly([[-7,-5],[5,-7],[8,3],[-2,7]],i%2?'#6b4a3a':A,INK,1.5);break;
    case 5:{const q=5+3*Math.sin(t*12+i*2);poly([[0,-q*2],[q*.5,-q*.5],[q*2,0],[q*.5,q*.5],[0,q*2],[-q*.5,q*.5],[-q*2,0],[-q*.5,-q*.5]],i%2?'#fff':B);break}
    case 6:g.strokeStyle=i%2?'#fff':A;g.lineWidth=2.5;g.beginPath();g.arc(0,0,12,a,a+2.2);g.stroke();break;
    case 7:g.strokeStyle=A;g.lineWidth=2;g.beginPath();g.arc(-x,-y,r*(.5+.12*i),a,a+1.6);g.stroke();circ(0,0,3.5,'#0a0618',B,1.5);break;
    case 8:g.beginPath();g.moveTo(0,-9);g.quadraticCurveTo(7,2,0,6);g.quadraticCurveTo(-7,2,0,-9);g.fillStyle=i%2?'#fff':A;g.fill();break;
    case 9:g.rotate(t*4+i);g.fillStyle=i%2?'#fff':A;g.beginPath();g.ellipse(0,0,7,3.5,0,0,TAU);g.fill();break;
    case 10:g.rotate(a);g.strokeStyle=i%2?B:A;g.lineWidth=3;g.beginPath();g.moveTo(-10,-6);g.quadraticCurveTo(0,0,10,-6);g.stroke();break;
    default:g.rotate(a);g.fillStyle=i%2?'#fff':A;g.fillRect(0,-1.5,r*.7,3)}
   g.restore()}
  if(fm===11||fm===7||fm===5){g.globalAlpha=k*.6;g.strokeStyle=fm===7?'#0a0618':B;g.lineWidth=3;g.beginPath();g.ellipse(0,0,sz*1.15,sz*(fm===11?.35:1.15),0,0,TAU);g.stroke()}g.globalAlpha=1}
 const dp0=drawProj;drawProj=function(){if(!UQ())return dp0();const all=G.proj;try{for(const p of all){G.proj=[p];dp0();const c=p.o&&p.o.c;if(!c||p.type==='spike'&&p.t<(p.delay||0))continue;g.save();g.translate(p.x,p.type==='wave'||p.type==='spike'?p.y-40:p.type==='tornado'?p.y-150:p.y);try{deco(c,G.t+p.t,1,(p.r||22)+18+(hs(c.name)%5)*3)}catch(e){}g.restore()}}finally{G.proj=all}};
 const sm0=startMove;startMove=function(f,m,o){const r=sm0(f,m,o);if(UQ()&&f&&f.c&&m&&(m.k==='S'||m.ult)&&G.mode!=='scene')try{burst(f.c,f.x,f.y-80,m.ult?26:12,m.ult?1.3:.8);G.fx.push({type:'ring',t:0,life:.35,x:f.x,y:f.y-80,r0:12,r1:m.ult?220:120,col:f.c.col2,w:5})}catch(e){}return r};
 const ah0=applyHit0;applyHit0=function(a,v,h,sx,dir){const r=ah0(a,v,h,sx,dir);if(r&&UQ()&&a&&a.c&&a.mv&&(a.mv.k==='S'||a.mv.ult))try{burst(a.c,v.x,v.y-80,h.big?14:5,h.big?1.2:.7)}catch(e){}return r};
 const uf0=drawUltFX;drawUltFX=function(f,o){uf0(f,o);const m=f&&f.mv;if(!UQ()||!f||f.state!=='atk'||!m||!m.ult||!o)return;const c=f.c,fm=famOf(c),T=G.t,st=f.st,k=clamp(st*3,0,1)*clamp((m.dur-st)*4,0,1),h=hs(c.name),n=4+h%4,A=c.col,B=c.col2,vx=o.x,vy=o.y;
  g.save();g.lineCap='round';g.lineJoin='round';g.globalAlpha=k;
  g.save();g.translate(f.x,f.y-80);deco(c,T,k,70+(h%4)*8);g.restore();
  switch(fm){
  case 0:for(let i=0;i<n;i++){const x=vx+Math.sin(i*7.1+((T*9)|0)*2.3)*260;g.strokeStyle=i%2?'#fff':B;g.lineWidth=i%2?3:6;g.beginPath();g.moveTo(x+rnd(-30,30),-700);let y=-700;while(y<0){y+=90;g.lineTo(x+rnd(-36,36),Math.min(0,y))}g.stroke()}break;
  case 1:for(let i=0;i<n;i++){const x=vx+(i-(n-1)/2)*90,hh=260+120*Math.sin(T*9+i*2);[[A,34],[B,22],['#fff3b0',10]].forEach(q=>{g.fillStyle=q[0];g.beginPath();g.moveTo(x-q[1],0);g.quadraticCurveTo(x-q[1]*1.3,-hh*.5,x+Math.sin(T*13+i)*14,-hh*(q[1]/34));g.quadraticCurveTo(x+q[1]*1.3,-hh*.5,x+q[1],0);g.fill()})}break;
  case 2:for(let i=0;i<n+2;i++){const x=vx+(i-(n+1)/2)*70,hh=(120+((h>>i)%5)*40)*clamp(st*2.5-i*.08,0,1);poly([[x-20,0],[x-6,-hh],[x+8,-hh*.8],[x+20,0]],'#dff6ff',A,2.5);poly([[x-4,0],[x-6,-hh],[x+3,-hh*.5]],'#fff')}break;
  case 3:for(let i=0;i<n+1;i++){const a=i*TAU/(n+1)+T*.6,R=200+40*Math.sin(T*3+i);g.strokeStyle=i%2?A:'rgba(20,8,40,.9)';g.lineWidth=12-i;g.beginPath();g.moveTo(vx+Math.cos(a)*R,vy-80+Math.sin(a)*R*.7);g.quadraticCurveTo(vx+Math.cos(a+1)*R*.5,vy-80+Math.sin(a+1)*R*.4,vx,vy-80);g.stroke()}break;
  case 4:for(let i=0;i<n+2;i++){const a=i*TAU/(n+2),R=170,yy=-80-((T*220+i*60)%300);g.save();g.translate(vx+Math.cos(a)*R,vy+yy);g.rotate(T*2+i);poly([[-18,-12],[12,-18],[20,8],[-6,18]],i%2?'#6b4a3a':A,INK,2.5);g.restore()}break;
  case 5:for(let i=0;i<n+3;i++){const p=((T*1.4+i/(n+3))%1),x=vx+260-p*520+(i%3)*40,y=-640+p*640;g.strokeStyle=i%2?'#fff':B;g.lineWidth=5;g.globalAlpha=k*(1-p*.4);g.beginPath();g.moveTo(x+60,y-74);g.lineTo(x,y);g.stroke();poly([[x,y-12],[x+4,y-4],[x+12,y],[x+4,y+4],[x,y+12],[x-4,y+4],[x-12,y],[x-4,y-4]],'#fff')}break;
  case 6:for(let i=0;i<n+4;i++){const y=vy-20-i*34,rx=40+i*16,a=T*(8+h%4)+i;g.strokeStyle=i%2?'#fff':A;g.lineWidth=5;g.beginPath();g.ellipse(vx+Math.sin(T*10+i)*8,y,rx,10,0,a,a+4.4);g.stroke()}break;
  case 7:{const R=90+30*Math.sin(T*6);g.fillStyle='#05020c';g.beginPath();g.arc(vx,vy-90,R,0,TAU);g.fill();for(let i=0;i<n+1;i++){g.strokeStyle=i%2?B:A;g.lineWidth=4;g.beginPath();g.ellipse(vx,vy-90,R*(1.3+i*.22),R*(.35+i*.08),T*.8+i*.5,T*4+i,T*4+i+4.6);g.stroke()}break}
  case 8:for(let i=0;i<n;i++){const p=((T*.9+i/n)%1),R=60+p*300;g.strokeStyle=i%2?'#fff':A;g.lineWidth=8*(1-p)+2;g.globalAlpha=k*(1-p);g.beginPath();g.arc(vx,vy,R,Math.PI*1.1,Math.PI*1.9);g.stroke()}break;
  case 9:for(let i=0;i<14+n*2;i++){const a=T*3+i*.7,R=60+(i*29)%220,y=vy-80+Math.sin(a*.7+i)*150;g.save();g.translate(vx+Math.cos(a)*R,y);g.rotate(a*2);g.fillStyle=i%3?A:'#fff';g.beginPath();g.ellipse(0,0,11,5,0,0,TAU);g.fill();g.restore()}break;
  case 10:for(let i=0;i<3;i++){const p=clamp((st*2.2-i*.25)%1.2,0,1),x0=vx-150+i*50,x1=x0+200;g.strokeStyle=i%2?B:A;g.lineWidth=14*(1-p)+3;g.beginPath();g.moveTo(x0,vy-260);g.quadraticCurveTo(lerp(x0,x1,.5)+40,vy-130,lerp(x0,x1,p),lerp(vy-260,vy+10,p));g.stroke()}break;
  default:for(let i=0;i<n;i++){const x=vx+(i-(n-1)/2)*80,w=18+10*Math.sin(T*8+i);g.fillStyle=i%2?'rgba(255,255,255,.55)':A;g.globalAlpha=k*.6;g.fillRect(x-w/2,-800,w,800)}g.globalAlpha=k;g.strokeStyle=B;g.lineWidth=5;g.beginPath();g.ellipse(vx,vy-190,60,14,0,0,TAU);g.stroke()}
  g.restore()}}
/* ================= flag "umoves": every fighter's two skills and ultimate play differently =================
   The 8 shared move types stay, but each fighter gets their own version of each one, fixed by their name:
   rhythm (frequent: 20% shorter cooldown, 15% less damage / charged: 25% longer cooldown, 20% more damage), hit pattern (fewer heavier hits / more lighter hits,
   same total), reach (wider with less knockback / tighter with more knockback), shots (fast and small / slow and big / split into two half-damage shots),
   and for ultimates how the damage is split between the flurry and the finisher (same total). Normal attacks are unchanged. */
{const hs=n=>{let x=5381;for(let i=0;i<n.length;i++)x=((x*33)^n.charCodeAt(i))>>>0;return x};
 function fixP(p,ds,pj){if(!p||p._u)return;p._u=1;p.h=Object.assign({},p.h);if(p.h.d)p.h.d*=ds;
  if(p.vx||p.vy){if(pj===1){p.vx*=1.3;p.vy*=1.3;p.r=(p.r||22)*.82;p.life/=1.3}else if(pj===2){p.vx*=.76;p.vy*=.76;p.r=(p.r||22)*1.3;p.life/=.76}
   else if(pj===3&&p.h.d){p.h.d*=.5;const q=Object.assign({},p,{h:Object.assign({},p.h),x:p.x-(p.dir||1)*80,t:0});G.proj.push(q)}}
  else if(p.delay){if(pj===1){p.delay*=.72;p.r=(p.r||40)*.86}else if(pj===2){p.delay*=1.2;p.r=(p.r||40)*1.25}}}
 function tw(m0,h,i){const m=Object.assign({},m0);m.hits=(m0.hits||[]).map(x=>Object.assign({},x));const tempo=(h>>>(i*5))&3,pat=(h>>>(i*5+2))&3,reach=(h>>>(i*5+13))%3,pj=(h>>>(i*5+17))&3;let ds=1;
  if(!m.ult&&m.cd){if(tempo===1){m.cd*=.8;ds=.85}else if(tempo===2){m.cd*=1.25;ds=1.2}}
  m.hits.forEach(x=>{if(x.d)x.d*=ds;if(x.n>1&&x.d&&x.iv){const n=pat===1?Math.max(2,Math.round(x.n*.6)):pat===2?Math.round(x.n*1.5):x.n;if(n!==x.n){x.d=x.d*x.n/n;x.iv=x.iv*x.n/n;x.n=n}}
   if(x.w>0&&x.w<900&&x.d){if(reach===1){x.w*=1.18;x.kx=(x.kx||0)*.8;x.ky=(x.ky||0)*.8}else if(reach===2){x.w*=.86;x.kx=(x.kx||0)*1.2;x.ky=(x.ky||0)*1.2}}});
  if(m.ult){const pins=m.hits.filter(x=>x.pin&&x.n>1&&x.d),fin=m.hits.find(x=>x.fin&&x.d);if(pins.length&&fin){const P=pins.reduce((s,x)=>s+x.d*x.n,0),sh=[0,.3,-.25,.15][tempo]*Math.min(P,fin.d*1.5);pins.forEach(x=>{x.d*=(P-sh)/P});fin.d+=sh}}
  const wr=fn=>function(){const n0=G.proj.length,r=fn.apply(this,arguments);for(let k=G.proj.length-1;k>=n0;k--)fixP(G.proj[k],ds,pj);return r};
  if(m.ev)m.ev=m.ev.map(e=>Object.assign({},e,{f:wr(e.f)}));if(m.on)m.on=wr(m.on);m._u=1;return m}
 function vary(c,m0){const h=hs(c.name),o=Object.assign({},m0);try{o.S=(m0.S||[]).map((m,i)=>tw(m,h,i));if(m0.U)o.U=tw(m0.U,h,2)}catch(e){return m0}return o}
 let UN=-1,UT=0;function hook(){CH.forEach(c=>{if(!c||!c.name)return;const d=Object.getOwnPropertyDescriptor(c,'mv');if(d&&d.get&&d.get._u)return;const m=c.mv;if(!m)return;c._m0=m;c._mu=null;const gt=function(){return F().umoves&&this._m0?(this._mu||(this._mu=vary(this,this._m0))):this._m0};gt._u=1;try{Object.defineProperty(c,'mv',{configurable:true,get:gt,set(v){this._m0=v;this._mu=null}})}catch(e){}})}
 const _uu=update;update=function(rdt){if(F().umoves&&(CH.length!==UN||G.t-UT>2)){UN=CH.length;UT=G.t;try{hook()}catch(e){}}_uu(rdt)}}
/* ================= flag "icon2": new game icon =================
   Kenko facing forward from about the knees up with her hands together in front, on her own world background. Used for the lobby icon and the browser tab icon;
   the home-screen icon links switch to icon2.png / manifest2.json while the flag is on. */
{let KC=null,IS=null;const kenko=()=>KC||(KC=CH.find(c=>c&&c.name==='KENKO'))||null;
 const g0=gameIcon;gameIcon=function(x,y,s){const c=F().icon2?kenko():null;if(!c)return g0(x,y,s);try{g.save();rr(x,y,s,s,s*.22);g.fillStyle=c.col;g.fill();g.strokeStyle='#fff';g.lineWidth=Math.max(2,s*.05);g.stroke();g.clip();worldBG(c,x,y,s,s);
   const k=s/140;g.save();g.translate(x+s*.5,y+s*.06+152*k);g.scale(k,k);drawFrontChar(c,{t:1.2,expr:'',arms:'front'});g.restore();
   const gr=g.createLinearGradient(0,y+s*.7,0,y+s);gr.addColorStop(0,'rgba(10,4,24,0)');gr.addColorStop(1,'rgba(10,4,24,.45)');g.fillStyle=gr;g.fillRect(x,y,s,s);g.restore()}catch(e){try{g.restore()}catch(x2){}}};
 const u0=update;update=function(rdt){u0(rdt);const on=!!F().icon2;if(on===IS)return;IS=on;try{const u=mkIcon(128),q=r=>document.querySelector('link[rel="'+r+'"]'),a=q('icon'),b=q('apple-touch-icon'),m=q('manifest');if(a&&u)a.href=u;if(location.protocol!=='blob:'){if(b)b.href=on?'icon2.png':'icon.png';if(m)m.href=on?'manifest2.json':'manifest.json'}}catch(e){}}}
/* ================= flag "studio": the Treyyverse studio intro plays before the start menu =================
   Ported from the "Treyyverse Studio Intro" page: 5 seconds on black, a four-hit combo by Kaito, Rin, Zero and Gou, then the TREYYVERSE logo with the first
   eight fighters lined up under it. Plays once each time the game is opened, then the start menu shows.
   The start screen never shows first: if the game does not yet know the intro is released (the saved list on the device is old or empty) the screen stays
   black until the fresh released list has loaded (window.LIVE_READY, set by live.js; at most 2.5 s), then the intro starts. It cannot be skipped: no taps,
   keys or buttons do anything until it has finished. */
{const mkIntro=()=>{const dpr=1,DUR=5;let W,H,u,cx,cy,OS;
  const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const mix = (a, b, t) => a + (b - a) * t;
  const sm = t => t * t * (3 - 2 * t);
  const outBack = t => { const c = 1.9; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };
  const prog = (t, a, b) => cl((t - a) / (b - a));
  const rng = seed => () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  const C = n => CH.find(c => c.name === n);

  // ---------- one fighter: drawn by the game's renderer on the game canvas, copied to a sprite, then placed with a colour rim so it reads on black
  const SP = []; let MODE = 0, QI = 0;
  function drawF(c, pose, px, py, s, f, rot, alpha, t, ground) {
    if (alpha <= 0.01 || !c) return;
    const k = s * (c.sc || 1), n = QI++;
    if (MODE === 0) {
      let sp = SP[n]; if (!sp) { sp = SP[n] = document.createElement('canvas'); }
      if (sp.width !== OS) { sp.width = sp.height = OS; }
      g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, OS, OS);
      g.save(); g.beginPath(); g.rect(0, 0, OS, OS); g.clip();
      g.setTransform(1, 0, 0, 1, OS / 2, OS / 2); g.rotate(rot * f); g.scale(f * k, k); g.translate(0, ground ? 75 : 72);
      try { drawChar(c, pose, { t, sway: 0, ground: ground ? 1 : 0, expr: 'idle' }); } catch (e) {}
      g.restore(); g.setTransform(1, 0, 0, 1, 0, 0);
      const x = sp.getContext('2d'); x.clearRect(0, 0, OS, OS); x.drawImage(cv, 0, 0, OS, OS, 0, 0, OS, OS);
      return;
    }
    const sp = SP[n]; if (!sp) return;
    g.save(); g.globalAlpha = alpha; g.shadowColor = c.col; g.shadowBlur = 16 * u;
    g.drawImage(sp, px - OS / 2, py - (ground ? 75 * k : 0) - OS / 2);
    g.restore();
  }

  // ---------- the combo: keys = [t, x, y (hip, in u from centre), pose, rot]; a = fade in/out times
  const SC = 0.95;
  const combo = [
    { c: C('KAITO'), f: 1, a: [0.3, 0.4, 1.22, 1.42],
      keys: [[0.3, -340, 12, DASH, 0], [0.78, -118, 12, DASH, 0], [0.86, -92, 12, L4A, 0], [0.95, -70, 12, L4B, 0], [1.42, -62, 12, L4B, 0]] },
    { c: C('RIN'), f: -1, a: [1.05, 1.15, 1.9, 2.1],
      keys: [[1.05, 340, 46, DASH, 0], [1.45, 100, 46, DASH, 0], [1.53, 78, 42, HA, 0], [1.62, 60, 8, HB, 0], [2.1, 52, -60, HB, 0]] },
    { c: C('ZERO'), f: 1, a: [1.98, 2.06, 2.42, 2.6],
      keys: [[1.98, -82, -78, ALA, 0], [2.12, -76, -72, ALA, 0], [2.2, -58, -52, ALB, 0], [2.6, -50, -44, ALB, 0]] },
    { c: C('GOU'), f: 1, a: [2.25, 2.3, 2.86, 3.05],
      keys: [[2.25, -30, -500, AHA, 0], [2.7, -36, -128, AHA, 0], [2.8, -36, -100, AHB, 0], [3.05, -36, -92, AHB, 0]] }
  ];
  function sample(ks, t) {
    let i = 0;
    while (i < ks.length - 2 && t > ks[i + 1][0]) i++;
    const a = ks[i], b = ks[i + 1], p = sm(prog(t, a[0], b[0]));
    return { x: mix(a[1], b[1], p), y: mix(a[2], b[2], p), pose: lp(a[3], b[3], p), rot: mix(a[4], b[4], p) };
  }
  function drawCombo(t) {
    for (const m of combo) {
      if (t < m.a[0] || t > m.a[3]) continue;
      const st = sample(m.keys, t);
      const al = prog(t, m.a[0], m.a[1]) * (1 - prog(t, m.a[2], m.a[3]));
      drawF(m.c, st.pose, cx + st.x * u, cy + st.y * u, SC * u, m.f, st.rot, al, t, false);
    }
  }

  // ---------- the whole roster lines up under the logo
  function drawLineup(t) {
    const T0 = 3.4;
    if (t < T0) return;
    const one = W / u >= 640;
    CH.slice(0, 8).forEach((c, i) => {
      const p = prog(t, T0 + i * 0.07, T0 + i * 0.07 + 0.26);
      if (p <= 0) return;
      let x, y, s;
      if (one) { x = (i - 3.5) * 78; y = 222; s = 0.78; }
      else { x = ((i % 4) - 1.5) * 96; y = i < 4 ? 172 : 256; s = 0.56; }
      const f = (one ? i < 4 : i % 4 < 2) ? 1 : -1;
      const pose = IDLES[c.idle] || IDLE;
      drawF(c, pose, cx + x * u, cy + y * u, s * u * mix(0.5, 1, outBack(p)), f, 0, cl(p * 1.5), t, true);
    });
  }

  // ---------- effects ----------
  const HITS = [
    { t: 0.95, col: '#3fa9ff', label: '1 HIT', x: 82, y: -128, r: -0.12 },
    { t: 1.62, col: '#ff5a36', label: '2 HITS', x: -86, y: -138, r: 0.1 },
    { t: 2.2, col: '#b06bff', label: '3 HITS', x: 88, y: -142, r: -0.08 },
    { t: 2.8, col: '#ffc23d', label: '4 HIT COMBO!', x: 0, y: -188, r: -0.04 }
  ];
  const LAST = HITS.length - 1, BOOM = HITS[LAST].t;
  const parts = HITS.map((h, i) => {
    const r = rng(77 + i * 991), big = i === LAST, n = big ? 76 : 26, arr = [];
    for (let j = 0; j < n; j++) arr.push({ a: r() * 6.283, sp: 60 + r() * (big ? 340 : 170), life: 0.35 + r() * (big ? 0.9 : 0.4), sz: 1.5 + r() * 3.5,
      col: r() < 0.35 ? '#fff' : (big ? HITS[j % 4].col : h.col), shard: big && r() < 0.4 });
    return arr;
  });
  const lr = rng(5), speedLines = Array.from({ length: 26 }, () => ({ y: lr() * 2 - 1, x: lr(), len: 0.1 + lr() * 0.3, sp: 1.5 + lr() * 2.5 }));

  function drawSpeedLines(t) {
    const a = prog(t, 0.2, 0.5) * (1 - prog(t, 2.7, 3.0));
    if (a <= 0) return;
    g.save(); g.lineWidth = 1.2 * u; g.lineCap = 'round'; g.strokeStyle = `rgba(255,255,255,${0.1 * a})`;
    for (const l of speedLines) {
      const x = ((l.x + t * l.sp) % 1.4 - 0.2) * W, y = cy + l.y * H * 0.5;
      g.beginPath(); g.moveTo(x, y); g.lineTo(x - l.len * W, y); g.stroke();
    }
    g.restore();
  }

  function drawOrb(t) {
    if (t >= BOOM) return;
    const a = prog(t, 0, 0.45);
    let bump = 0; for (const h of HITS) if (t >= h.t) bump = Math.max(bump, 1 - prog(t, h.t, h.t + 0.25));
    const r = (34 + Math.sin(t * 9) * 1.5 + bump * 9) * u * a;
    if (r <= 0) return;
    g.save();
    g.shadowColor = '#b9a4ff'; g.shadowBlur = 40 * u * dpr;
    const gr = g.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.1, cx, cy, r);
    gr.addColorStop(0, '#fff'); gr.addColorStop(0.45, '#cbbcff'); gr.addColorStop(1, '#5b3fd6');
    g.fillStyle = gr; g.beginPath(); g.arc(cx, cy, r, 0, 7); g.fill();
    g.shadowBlur = 0;
    const hits = HITS.filter(h => t >= h.t).length, cr = rng(31);
    g.strokeStyle = '#120a33'; g.lineWidth = 1.6 * u;
    for (let i = 0; i < hits * 4; i++) {
      let ang = cr() * 6.283, x = cx, y = cy;
      g.beginPath(); g.moveTo(x, y);
      for (let s = 0; s < 3; s++) { ang += (cr() - 0.5) * 1.2; x += Math.cos(ang) * r * 0.33; y += Math.sin(ang) * r * 0.33; g.lineTo(x, y); }
      g.stroke();
    }
    g.restore();
  }

  function streak(p, x1, y1, x2, y2, col, w) {
    g.globalAlpha = 1 - p; g.shadowColor = col; g.shadowBlur = 22 * u * dpr; g.lineCap = 'round';
    g.strokeStyle = col; g.lineWidth = w * (1 - p * 0.7) * u;
    g.beginPath(); g.moveTo(cx + x1 * u, cy + y1 * u); g.lineTo(cx + x2 * u, cy + y2 * u); g.stroke();
    g.strokeStyle = '#fff'; g.lineWidth = w * 0.35 * (1 - p) * u; g.stroke();
  }
  function drawFx(t) {
    g.save();
    let p = prog(t, HITS[0].t - 0.02, HITS[0].t + 0.28); // Kaito: crescent
    if (p > 0 && p < 1) {
      g.globalAlpha = 1 - p; g.shadowColor = '#3fa9ff'; g.shadowBlur = 25 * u * dpr;
      g.strokeStyle = '#eaf6ff'; g.lineCap = 'round'; g.lineWidth = (11 - p * 9) * u;
      g.beginPath(); g.arc(cx - 50 * u, cy + 5 * u, (78 + p * 26) * u, -1.2, 0.75); g.stroke();
      streak(p, -90, 70, 70 + p * 80, -60 - p * 50, '#3fa9ff', 4);
    }
    p = prog(t, HITS[1].t, HITS[1].t + 0.32); // Rin: rising flame
    if (p > 0 && p < 1) { streak(p, 14, 40, 6, -70 - p * 90, '#ff5a36', 16); streak(p, 30, 30, 34, -40 - p * 70, '#ffc23d', 7); }
    p = prog(t, HITS[2].t, HITS[2].t + 0.26); // Zero: cross cut
    if (p > 0 && p < 1) { streak(p, -70, -60, 70 + p * 30, 60 + p * 30, '#b06bff', 5); streak(p, 70, -60, -70 - p * 30, 60 + p * 30, '#ff4d8d', 5); }
    HITS.forEach((h, i) => { // rings
      const big = i === LAST, rp = prog(t, h.t, h.t + (big ? 0.7 : 0.4));
      if (rp > 0 && rp < 1) {
        g.globalAlpha = 1 - rp; g.shadowColor = h.col; g.shadowBlur = 20 * u * dpr;
        g.strokeStyle = h.col; g.lineWidth = (big ? 9 : 5) * (1 - rp) * u + 0.5;
        g.beginPath(); g.arc(cx, cy, (30 + sm(rp) * (big ? 420 : 130)) * u, 0, 7); g.stroke();
      }
    });
    g.shadowBlur = 8 * u * dpr;
    HITS.forEach((h, i) => { // sparks and shards
      const dt = t - h.t; if (dt < 0) return;
      for (const q of parts[i]) {
        const lf = dt / q.life; if (lf >= 1) continue;
        const d = q.sp * (1 - Math.pow(1 - lf, 2.4)) * u;
        const x = cx + Math.cos(q.a) * d, y = cy + Math.sin(q.a) * d + lf * lf * 40 * u;
        g.globalAlpha = 1 - lf; g.fillStyle = q.col; g.shadowColor = q.col;
        if (q.shard) {
          g.save(); g.translate(x, y); g.rotate(q.a + dt * 7);
          g.beginPath(); g.moveTo(0, -q.sz * 2.4 * u); g.lineTo(q.sz * 1.4 * u, q.sz * u); g.lineTo(-q.sz * 1.2 * u, q.sz * 1.3 * u); g.closePath(); g.fill(); g.restore();
        } else { g.beginPath(); g.arc(x, y, q.sz * u * (1 - lf * 0.5), 0, 7); g.fill(); }
      }
    });
    g.restore();
  }

  function drawHitText(t) {
    HITS.forEach((h, i) => {
      const big = i === LAST, end = h.t + (big ? 0.8 : 0.55);
      if (t < h.t || t > end) return;
      const p = prog(t, h.t, h.t + 0.16), fade = 1 - prog(t, end - 0.2, end);
      g.save();
      g.translate(cx + h.x * u, cy + h.y * u); g.rotate(h.r);
      const sc = mix(2.2, 1, outBack(p)); g.scale(sc, sc);
      g.globalAlpha = fade * p;
      g.font = `${(big ? 30 : 24) * u}px Bungee, Bangers, Impact, sans-serif`;
      g.textAlign = 'center'; g.textBaseline = 'middle';
      g.shadowColor = h.col; g.shadowBlur = 18 * u * dpr;
      g.lineWidth = 5 * u; g.strokeStyle = '#000'; g.lineJoin = 'round'; g.strokeText(h.label, 0, 0);
      g.fillStyle = h.col; g.fillText(h.label, 0, 0);
      g.restore();
    });
  }

  // ---------- logo ----------
  const WORD = 'TREYYVERSE';
  function drawLogo(t) {
    const T0 = BOOM + 0.12;
    if (t < T0) return;
    g.save();
    g.textBaseline = 'middle'; g.textAlign = 'center';
    g.font = '100px Bungee, Bangers, Impact, sans-serif';
    const full = g.measureText(WORD).width;
    const fs = Math.min(100 * (W * 0.9) / full, 62 * u, 120);
    g.font = `${fs}px Bungee, Bangers, Impact, sans-serif`;
    const ws = [...WORD].map(ch => g.measureText(ch).width), total = ws.reduce((a, b) => a + b, 0);
    let x = cx - total / 2;
    const pulse = 0.5 + 0.5 * Math.sin((t - T0) * 5);
    [...WORD].forEach((ch, i) => {
      const p = prog(t, T0 + i * 0.055, T0 + i * 0.055 + 0.24), lx = x + ws[i] / 2; x += ws[i];
      if (p <= 0) return;
      g.save(); g.translate(lx, cy);
      const sc = mix(3.4, 1, outBack(p)); g.scale(sc, sc);
      g.globalAlpha = cl(p * 1.6);
      const isY = i === 3 || i === 4;
      g.shadowColor = isY ? '#ffd23f' : '#7fd9ff'; g.shadowBlur = (12 + pulse * 12 + (1 - p) * 30) * u * dpr;
      const gr = g.createLinearGradient(0, -fs / 2, 0, fs / 2);
      if (isY) { gr.addColorStop(0, '#fff3b0'); gr.addColorStop(0.5, '#ffd23f'); gr.addColorStop(1, '#ff8a1f'); }
      else { gr.addColorStop(0, '#fff'); gr.addColorStop(0.55, '#fff'); gr.addColorStop(1, '#9fe9ff'); }
      g.fillStyle = gr; g.fillText(ch, 0, 0);
      g.restore();
    });
    const bp = sm(prog(t, 3.6, 4.0));
    if (bp > 0) {
      const bw = total * 0.92 * bp, by = cy + fs * 0.62;
      const gr = g.createLinearGradient(cx - bw / 2, 0, cx + bw / 2, 0);
      gr.addColorStop(0, '#3fa9ff'); gr.addColorStop(0.5, '#ffe14d'); gr.addColorStop(1, '#ff5a36');
      g.shadowColor = '#ffe14d'; g.shadowBlur = 10 * u * dpr; g.fillStyle = gr;
      g.fillRect(cx - bw / 2, by, bw, Math.max(2, 3 * u));
    }
    const tp = prog(t, 3.9, 4.4);
    if (tp > 0) {
      g.globalAlpha = tp; g.shadowBlur = 0; g.fillStyle = '#d7dbe6';
      const ts = Math.max(11, fs * 0.3);
      g.font = `700 ${ts}px Rajdhani, system-ui, sans-serif`;
      const sp = ts * mix(1.0, 0.55, sm(tp));
      if ('letterSpacing' in g) { g.letterSpacing = sp + 'px'; g.fillText('GAME STUDIO', cx + sp / 2, cy + fs * 0.62 + ts * 1.25); g.letterSpacing = '0px'; }
      else g.fillText('G A M E   S T U D I O', cx, cy + fs * 0.62 + ts * 1.25);
    }
    g.restore();
  }

  // ---------- frame ----------
  function frame(t) {
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.fillStyle = '#000'; g.fillRect(0, 0, W, H);
    let amp = 0;
    HITS.forEach((h, i) => { if (t >= h.t) amp = Math.max(amp, (i === LAST ? 16 : 7) * (1 - prog(t, h.t, h.t + (i === LAST ? 0.5 : 0.25)))); });
    g.save();
    if (amp > 0) g.translate(Math.sin(t * 91) * amp * u, Math.cos(t * 77) * amp * u);
    drawSpeedLines(t);
    drawOrb(t);
    drawCombo(t);
    drawFx(t);
    drawLineup(t);
    drawLogo(t);
    drawHitText(t);
    g.restore();
    const fl = 1 - prog(t, BOOM, BOOM + 0.4);
    if (t >= BOOM && fl > 0) { g.fillStyle = `rgba(255,255,255,${fl * 0.9})`; g.fillRect(0, 0, W, H); }
  }

  return{DUR,size(w,h){W=w;H=h;u=Math.min(W/420,H/520);cx=W/2;cy=H/2;OS=Math.ceil(Math.min(440*u,W,H))},
   draw(t){MODE=0;QI=0;drawCombo(t);drawLineup(t);MODE=1;QI=0;frame(t);g.setTransform(1,0,0,1,0,0)},free(){SP.length=0}}};
 let IN=null,T0=0,DONE=false,TT=0;
 const t0=SCR.title;SCR.title=function(){const now=performance.now();if(!TT)TT=now;
  if(!DONE&&!IN){if(F().studio){try{if(!document.getElementById('bungee-font')){const l=document.createElement('link');l.id='bungee-font';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Bungee&display=swap';document.head.appendChild(l);if(document.fonts&&document.fonts.load)document.fonts.load('64px Bungee')}}catch(e){}
    try{IN=mkIntro();T0=now}catch(e){IN=null;DONE=true}}
   else if(!window.LIVE_READY&&now-TT<2500){G.ui=[];g.setTransform(1,0,0,1,0,0);g.fillStyle='#000';g.fillRect(0,0,cv.width,cv.height);return}
   else DONE=true}
  if(IN){const t=(now-T0)/1000;if(t>=IN.DUR+.35){IN.free();IN=null;DONE=true}else{G.ui=[];try{IN.size(cv.width,cv.height);IN.draw(Math.min(t,IN.DUR));if(t>IN.DUR){g.fillStyle='rgba(0,0,0,'+Math.min(1,(t-IN.DUR)/.35)+')';g.fillRect(0,0,cv.width,cv.height)}}catch(e){IN=null;DONE=true}return}}
  return t0()}}
})();
