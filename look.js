/* Look upgrades, each off unless released: weap2 (detailed weapons), hair2 (detailed hair), phys (hair and cloth physics),
   stance (unique idle stances and poses), winpose (victory pose shot before the result), map2 (detailed maps), ult2 (cinematic ultimates), otsback (foreground shadow drawn as the character's back), noots (in over-the-shoulder cutscene shots show only the dark shadow, not that character). */
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
let OTSF=null,OTST=-9;const _ots=drawOTS;drawOTS=function(f,k){if(F().noots){OTSF=f;OTST=G.t}if(F().otsback){try{return drawBack(f,k)}catch(e){}}return _ots(f,k)};
const _df2=drawFighter;drawFighter=function(f,sil){if(F().noots&&f===OTSF&&G.t-OTST<.12&&(G.mode==='intro'||G.mode==='scene'))return;return _df2(f,sil)};
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
})();
