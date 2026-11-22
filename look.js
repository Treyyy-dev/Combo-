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
function drawFrontChar(c,o){const SQ=o.stance?1:0,t=o.t||0,ex=o.expr||'',ink=INK,A=c.acc||[],long=[1,2,5,6,7].includes(c.style),bk=(c.sc>1.07||c.dm>1)?1.12:1,br=Math.sin(t*3)*.8,dk=dkOf(c);g.lineJoin='round';g.lineCap='round';
 if(c.style===7||c.style===3){poly([[-20*bk,-110],[20*bk,-110],[30*bk,-22],[-30*bk,-22]],c.style===7?c.col:c.col2,ink,2)}
 if(long){ribbon(-12,-128,c.style===2||c.style===7?76:54,13,5,-5,.1,t,c.hair,ink);ribbon(12,-128,c.style===2||c.style===7?76:54,13,5,5,.1,t+1,c.hair,ink)}
 if(c.style===0||c.style===4||c.style===3)[[-12,-140,-24,-152,-8,-146],[12,-140,24,-152,8,-146],[-15,-132,-27,-134,-15,-125],[15,-132,27,-134,15,-125],[-4,-147,0,-162,4,-147]].forEach(q=>poly([[q[0],q[1]],[q[2],q[3]],[q[4],q[5]]],c.hair,ink));
 g.beginPath();g.ellipse(0,-131,17,17.5,0,0,TAU);g.fillStyle=dk;g.fill();g.strokeStyle=ink;g.lineWidth=2;g.stroke();
 /* o.walk (legs step while running) and o.tuck (legs pulled up in a jump): used by the 3D arena */
 const wkF=o.walk||0,tkF=o.tuck||0;
 [-1,1].forEach(sx=>{g.save();g.translate(0,-70);g.scale(1,1-.32*tkF-(wkF?Math.max(0,Math.sin(wkF+(sx>0?0:Math.PI)))*.17:0));g.translate(0,70);seg2({x:sx*(6.2+1.5*SQ)*bk,y:-70},{x:sx*(7.6+7.5*SQ)*bk,y:-37+2*SQ},7.6*bk,5.8*bk,sx<0?c.pantsSh:c.pants);seg2({x:sx*(7.6+7.5*SQ)*bk,y:-37+2*SQ},{x:sx*(8.2+11*SQ)*bk,y:-3},5.8*bk,3.9,sx<0?c.pantsSh:c.pants);
  g.beginPath();g.ellipse(sx*(9.2+11*SQ)*bk,2.2,6.4,4.2,0,0,TAU);g.fillStyle=c.bare?c.skin:'#2b2438';g.fill();g.strokeStyle=ink;g.lineWidth=2;g.stroke();if(c.bare){g.lineWidth=.9;g.beginPath();[-2.4,0,2.4].forEach(x=>{g.moveTo(sx*(9.2+11*SQ)*bk+x,3.2);g.lineTo(sx*(9.2+11*SQ)*bk+x,6)});g.stroke()}else{g.strokeStyle='#efeaf8';g.lineWidth=1.5;g.beginPath();g.moveTo(sx*(9.2+11*SQ)*bk-5,5.4);g.lineTo(sx*(9.2+11*SQ)*bk+5,5.4);g.stroke();g.strokeStyle=c.col;g.beginPath();g.moveTo(sx*(9.2+11*SQ)*bk-4,-1.4);g.lineTo(sx*(9.2+11*SQ)*bk+4,-1.4);g.stroke()}g.restore()});
 const TP=[[-11,-65],[-12.6,-74],[-10,-88],[-13.4,-100-br],[-18,-108-br],[-9,-115],[9,-115],[18,-108-br],[13.4,-100-br],[10,-88],[12.6,-74],[11,-65]].map(q=>[q[0]*bk,q[1]]);
 const sm=()=>{const n=TP.length;let m=[(TP[n-1][0]+TP[0][0])/2,(TP[n-1][1]+TP[0][1])/2];g.beginPath();g.moveTo(m[0],m[1]);for(let i=0;i<n;i++){const j=(i+1)%n;m=[(TP[i][0]+TP[j][0])/2,(TP[i][1]+TP[j][1])/2];g.quadraticCurveTo(TP[i][0],TP[i][1],m[0],m[1])}g.closePath()};
 sm();g.strokeStyle=ink;g.lineWidth=4;g.stroke();g.fillStyle=c.top;g.fill();g.save();sm();g.clip();g.fillStyle=c.topSh;g.fillRect(-22*bk,-120,7.5*bk,60);g.fillRect(12*bk,-120,10*bk,60);
 g.fillStyle='rgba(255,255,255,.14)';g.beginPath();g.ellipse(-4*bk,-101,4*bk,5,0,0,TAU);g.fill();g.strokeStyle='rgba(0,0,0,.22)';g.lineWidth=1.2;g.beginPath();g.moveTo(-10*bk,-97);g.quadraticCurveTo(-5*bk,-93.5,-.6,-97);g.moveTo(.6,-97);g.quadraticCurveTo(5*bk,-93.5,10*bk,-97);g.moveTo(0,-95);g.lineTo(0,-78);g.moveTo(-4*bk,-89);g.lineTo(4*bk,-89);g.moveTo(-3.6*bk,-83.5);g.lineTo(3.6*bk,-83.5);g.stroke();
 g.beginPath();g.moveTo(-6,-116);g.lineTo(6,-116);g.lineTo(0,-103);g.closePath();g.fillStyle=c.skin;g.fill();g.strokeStyle=ink;g.lineWidth=1.4;g.stroke();g.strokeStyle=c.col;g.lineWidth=2.2;g.beginPath();g.moveTo(-7.5,-115);g.lineTo(0,-101.5);g.lineTo(7.5,-115);g.stroke();
 g.fillStyle=c.col2;g.fillRect(-16*bk,-77,32*bk,5.4);g.fillStyle=ink;g.fillRect(-2.6,-78,5.2,7.4);g.fillStyle=c.col;g.fillRect(-1.5,-77,3,5.4);g.restore();
 /* o.atk (3D arena): an attack that comes toward the camera: the hitting hand swings in to the middle and grows, a weapon sweeps across, a kick shows the sole of the foot */
 const AT=o.atk||null,ap=AT?(AT.p!=null?AT.p:Math.sin(clamp(AT.u,0,1)*Math.PI)):0;
 [-1,1].forEach(sx=>{const up=o.win&&sx<0,fr=o.arms==='front',hit=AT&&AT.k!==1&&(AT.k===3||sx===AT.arm)?ap:0,S={x:sx*17.5*bk,y:-107-br};let E=SQ&&!fr&&!up?{x:sx*24*bk,y:-92}:fr?{x:sx*20.5*bk,y:-90}:up?{x:sx*26*bk,y:-121}:{x:sx*21*bk,y:-89},Hd=SQ&&!fr&&!up?{x:sx*(sx<0?11:15)*bk,y:-108+(sx<0?0:7)}:fr?{x:sx*3.4,y:-75}:up?{x:sx*23*bk,y:-144+Math.sin(t*6)*1.5}:{x:sx*19*bk,y:-71};
  if(o.walk&&SQ&&!fr&&!up){const pw=Math.sin(o.walk+(sx>0?Math.PI:0))*6;Hd.y+=pw;E.y+=pw*.4}
  if(o.guard&&!AT){E={x:sx*23*bk,y:-95};Hd={x:-sx*5*bk,y:-107+(sx<0?0:6)}}
  if(hit){E={x:sx*lerp(24,21,hit)*bk,y:lerp(-92,-101,hit)};Hd={x:sx*lerp(13,6,hit)*bk,y:lerp(-106,-95,hit)}}
  seg2(S,E,5.9*bk,4.6*bk,sx<0?c.topSh:c.top);seg2(E,Hd,4.6*bk,3.5*bk*(1+.5*hit),c.bare?(sx<0?c.skinSh:c.skin):(sx<0?c.topSh:c.top));
  if(sx>0&&c.weapon!=='fist'&&!fr)weapon(c,Hd,(FA[c.weapon]||0)+(AT&&AT.k===2?(AT.u-.5)*2.4:0),o,false);const gl=c.weapon==='fist',r=(gl?(c.fistR||8.2)*.8:4.5)*(1+1.25*hit);circ(Hd.x,Hd.y+2,r,gl?c.col2:(sx<0?c.skinSh:c.skin),ink,2);g.strokeStyle='rgba(0,0,0,.4)';g.lineWidth=.9;g.beginPath();[-.45,0,.45].forEach(k=>{g.moveTo(Hd.x+k*r,Hd.y+2+r*.15);g.lineTo(Hd.x+k*r,Hd.y+2+r*.95)});g.stroke()});
  if(AT&&AT.k===3&&ap>.1){g.save();g.globalAlpha=.85*ap;circ(0,-97,7+12*ap,c.col,'#fff',2.5);g.globalAlpha=.5*ap;g.strokeStyle=c.col2||'#fff';g.lineWidth=3;g.beginPath();g.arc(0,-97,14+18*ap,0,TAU);g.stroke();g.restore()}
  if(AT&&AT.k===1&&ap>.05){const sx=AT.arm,K={x:sx*10*bk,y:-58-6*ap},Ft={x:sx*7*bk,y:-50+6*ap},fr2=5+11*ap;seg2({x:sx*7*bk,y:-68},K,7.6*bk,6.6*bk,c.pants);seg2(K,Ft,6.6*bk,6*bk,c.pants);g.beginPath();g.ellipse(Ft.x,Ft.y,fr2*.8,fr2,0,0,TAU);g.fillStyle=c.bare?c.skinSh:'#221c2e';g.fill();g.strokeStyle=ink;g.lineWidth=2;g.stroke();g.strokeStyle='rgba(255,255,255,.3)';g.lineWidth=1.3;g.beginPath();g.ellipse(Ft.x,Ft.y,fr2*.5,fr2*.68,0,0,TAU);g.stroke()}
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
 let UN=-1,UT=0;function hook(){CH.forEach(c=>{if(!c||!c.name)return;const d=Object.getOwnPropertyDescriptor(c,'mv');if(d&&d.get&&d.get._u)return;const m=c.mv;if(!m)return;c._m0=m;c._mu=null;const gt=function(){const b=F().umoves&&this._m0?(this._mu||(this._mu=vary(this,this._m0))):this._m0;return b&&F().nmoves&&window.COMBO_NMV?window.COMBO_NMV(this,b):b};gt._u=1;try{Object.defineProperty(c,'mv',{configurable:true,get:gt,set(v){this._m0=v;this._mu=null}})}catch(e){}})}
 const _uu=update;update=function(rdt){if((F().umoves||F().nmoves)&&(CH.length!==UN||G.t-UT>2)){UN=CH.length;UT=G.t;try{hook()}catch(e){}}_uu(rdt)}}
/* ================= flag "icon2": new game icon =================
   Kenko facing forward from about the knees up with her hands together in front, on her own world background. Used for the lobby icon and the browser tab icon;
   the home-screen icon links switch to icon2.png / manifest2.json while the flag is on. */
{let KC=null,IS=null;const kenko=()=>KC||(KC=CH.find(c=>c&&c.name==='KENKO'))||null;
 /* Game icons list. Every game icon added by an update goes in window.COMBO_ICONS as {flag, png, man, draw(x,y,s)} (draw returns false if it cannot draw).
    With flag "iconlast" on, the game shows the icon whose update was released last, and switches as soon as a release arrives, also while the game is open.
    With it off, only the Kenko icon (flag icon2) is used, as before. */
 const ICONS=window.COMBO_ICONS=window.COMBO_ICONS||[];
 const pick=()=>{const f=F(),R=window.COMBO_RELS||{};if(!f.iconlast)return f.icon2?ICONS.find(ic=>ic.flag==='icon2')||null:null;let b=null,bt=-1;for(const ic of ICONS){if(!f[ic.flag])continue;const t=R[ic.flag]||0;if(t>=bt){b=ic;bt=t}}return b};
 const g0=gameIcon;gameIcon=function(x,y,s){const ic=pick();let ok=false;if(ic){try{ok=ic.draw(x,y,s)!==false}catch(e){ok=false}}if(!ok)return g0(x,y,s)};
 ICONS.push({flag:'icon2',png:'icon2.png',man:'manifest2.json',draw:function(x,y,s){const c=kenko();if(!c)return false;try{g.save();rr(x,y,s,s,s*.22);g.fillStyle=c.col;g.fill();g.strokeStyle='#fff';g.lineWidth=Math.max(2,s*.05);g.stroke();g.clip();worldBG(c,x,y,s,s);
   const k=s/140;g.save();g.translate(x+s*.5,y+s*.06+152*k);g.scale(k,k);drawFrontChar(c,{t:1.2,expr:'',arms:'front'});g.restore();
   const gr=g.createLinearGradient(0,y+s*.7,0,y+s);gr.addColorStop(0,'rgba(10,4,24,0)');gr.addColorStop(1,'rgba(10,4,24,.45)');g.fillStyle=gr;g.fillRect(x,y,s,s);g.restore()}catch(e){try{g.restore()}catch(x2){}}}});
 const u0=update;update=function(rdt){u0(rdt);const ic=pick(),on=ic?ic.flag:'';if(on===IS)return;IS=on;try{const u=mkIcon(128),q=r=>document.querySelector('link[rel="'+r+'"]'),a=q('icon'),b=q('apple-touch-icon'),m=q('manifest');if(a&&u)a.href=u;if(location.protocol!=='blob:'){if(b)b.href=ic&&ic.png?ic.png:'icon.png';if(m)m.href=ic&&ic.man?ic.man:'manifest.json'}}catch(e){}}}
/* ================= flag "title2": new start screen =================
   COMBO at the top with no line under it, and Kenko and Neto clashing under the name. The picture is still (nothing moves except the blinking start line). */
/* The two fighters on the start screen. Change the two names here to switch them: the picture and the COMBO shout (flag "combosay") both follow. */
try{window.COMBO_TITLE_CH=['KENKO','NETO']}catch(e){}
{let KC=null,NC=null,KN='';const T2=()=>{const n=window.COMBO_TITLE_CH||['KENKO','NETO'];if(KN!==n.join()){KN=n.join();KC=NC=null}return F().title2&&(KC=KC||CH.find(c=>c&&c.name===n[0]))&&(NC=NC||CH.find(c=>c&&c.name===n[1]))};
 const tt0=SCR.title;SCR.title=function(){if(!T2())return tt0();try{if(window.COMBO_TITLE)window.COMBO_TITLE()}catch(e){}g.setTransform(S*dpr,0,0,S*dpr,0,0);G.ui=[];const bg=g.createLinearGradient(0,0,0,H);bg.addColorStop(0,'#0d0630');bg.addColorStop(.5,'#5b1f7a');bg.addColorStop(.85,'#ff5a4d');bg.addColorStop(1,'#ffc46b');g.fillStyle=bg;g.fillRect(0,0,W,H);
  const sx=W*.5,sy=H*.66;g.save();g.translate(sx,sy);g.fillStyle='rgba(255,220,150,.14)';for(let i=0;i<18;i++){g.rotate(TAU/18);g.beginPath();g.moveTo(0,0);g.lineTo(-30,-W);g.lineTo(30,-W);g.fill()}g.restore();circ(sx,sy,H*.42,'#fff1c9');circ(sx,sy,H*.35,'#ffd98a');
  g.fillStyle='#2a1050';for(let i=0;i<30;i++){const bw=W/30,bh=H*(.1+(((Math.sin(i*12.9898)*43758.5453)%1)+1)%1*.22);g.fillRect(i*bw,H*.8-bh,bw+1,bh+H);g.fillStyle='rgba(255,214,130,.7)';g.fillRect(i*bw+bw*.3,H*.8-bh+8,3,5);g.fillRect(i*bw+bw*.6,H*.8-bh+20,3,5);g.fillStyle='#2a1050'}
  const fg=g.createLinearGradient(0,H*.8,0,H);fg.addColorStop(0,'#3d1d5e');fg.addColorStop(1,'#0d0630');g.fillStyle=fg;g.fillRect(0,H*.8,W,H*.2);
  const k=H*.64/160,gy=H*.985,cx=W*.5,cy=gy-76*k,gap=64*k;
  g.fillStyle='rgba(10,0,30,.45)';[-1,1].forEach(d=>{g.beginPath();g.ellipse(cx+d*gap,gy+4,40*k,7*k,0,0,TAU);g.fill()});
  [[KC,-1,lp(L4A,L4B,.9),'yell'],[NC,1,L1B,'angry']].forEach(q=>{g.save();g.translate(cx+q[1]*gap,gy);g.scale(-q[1]*k,k);try{drawChar(q[0],q[2],{t:1.2,sway:.5,expr:q[3],ground:true})}catch(e){}g.restore()});
  g.save();g.translate(cx,cy);for(let j=0;j<3;j++){const r=[104,72,40][j]*k/2.7,n=12;g.fillStyle=[KC.col,NC.col,'#fff'][j];g.globalAlpha=j?1:.9;g.beginPath();for(let i=0;i<n*2;i++){const a=i*Math.PI/n+j*.26,rr2=i%2?r*.36:r*(.8+.2*((i*7)%5)/4);g.lineTo(Math.cos(a)*rr2,Math.sin(a)*rr2)}g.closePath();g.fill();if(j<2){g.strokeStyle=INK;g.lineWidth=3;g.stroke()}}
  g.globalAlpha=1;g.lineCap='round';[[KC.col2||'#fff',-1],[NC.col2,1]].forEach(q=>{g.strokeStyle=q[0];g.lineWidth=5;for(let i=0;i<5;i++){const a=(q[1]>0?0:Math.PI)+(i-2)*.36,r0=(125+i%2*20)*k/2.7,r1=r0+(46+i*7)*k/2.7;g.beginPath();g.moveTo(Math.cos(a)*r0,Math.sin(a)*r0);g.lineTo(Math.cos(a)*r1,Math.sin(a)*r1);g.stroke()}});g.restore();
  const vg=g.createRadialGradient(W/2,H/2,H*.4,W/2,H/2,W*.75);vg.addColorStop(0,'rgba(10,0,30,0)');vg.addColorStop(1,'rgba(10,0,30,.7)');g.fillStyle=vg;g.fillRect(0,0,W,H);
  const ls=Math.min(118,W*.15);g.save();g.translate(W/2,H*.15);g.rotate(-.04);txt('COMBO',0,0,ls,'#ffe14d','#fff','center',FB,26);txt('COMBO',0,0,ls,'#ffe14d',INK,'center',FB,13);g.restore();
  g.globalAlpha=.55+.45*Math.sin(G.t*5);txt(lastDev==='touch'?'TAP TO START':'CLICK OR PRESS ANY BUTTON TO START',W/2,H*.93,24,'#fff',INK,'center',FB,7);g.globalAlpha=1;hit(0,0,W,H,()=>goto('menu'))}}
/* ================= flag "lobbybg": the lobby background is the player's profile banner =================
   The main lobby and the Match, Offline and Online menus draw the world picture of the banner chosen in the profile, darkened so the buttons stay readable. */
{const LOB={menu:1,match:1,offline:1,online:1},s0=scr;scr=function(){s0();const lc=F().lobbychar;if(!(F().lobbybg||lc)||!LOB[G.mode])return;try{const c=lc?CH[SV.team[0]]:CH[SV.banner|0];if(!c)return;g.save();if(lc)worldBG(c,0,0,W,H);else banBG(SV.banner|0,0,0,W,H);
  /* lobbychar: the background is the first fighter of the player's team (their world, with the fighter standing large on the right) instead of the profile banner; the fighter picture panel on the right of the lobby is removed (see the last block of this file) */
  if(lc){g.fillStyle='rgba(10,0,30,.4)';g.beginPath();g.ellipse(W*.72,H-14,H*.3,H*.035,0,0,TAU);g.fill();miniChar(c,W*.72,H-16,(H-70)/165,{anim:1,sway:.3})}const gr=g.createLinearGradient(0,0,W,0);gr.addColorStop(0,'rgba(10,4,24,.72)');gr.addColorStop(1,'rgba(10,4,24,.4)');g.fillStyle=gr;g.fillRect(0,0,W,H);g.restore()}catch(e){try{g.restore()}catch(x){}}}}
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
 /* studioq (story.js asks this): true while the black hold or the studio intro is on screen, so no music plays over it */
 try{window.COMBO_INTRO=()=>!DONE}catch(e){}
 const t0=SCR.title;SCR.title=function(){const now=performance.now();if(!TT)TT=now;
  if(!DONE&&!IN){if(F().studio){try{if(!document.getElementById('bungee-font')){const l=document.createElement('link');l.id='bungee-font';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Bungee&display=swap';document.head.appendChild(l);if(document.fonts&&document.fonts.load)document.fonts.load('64px Bungee')}}catch(e){}
    try{IN=mkIntro();T0=now}catch(e){IN=null;DONE=true}}
   else if(!window.LIVE_READY&&now-TT<2500){G.ui=[];g.setTransform(1,0,0,1,0,0);g.fillStyle='#000';g.fillRect(0,0,cv.width,cv.height);return}
   else DONE=true}
  if(IN){const t=(now-T0)/1000;if(t>=IN.DUR+.35){IN.free();IN=null;DONE=true}else{G.ui=[];try{IN.size(cv.width,cv.height);IN.draw(Math.min(t,IN.DUR));if(t>IN.DUR){g.fillStyle='rgba(0,0,0,'+Math.min(1,(t-IN.DUR)/.35)+')';g.fillRect(0,0,cv.width,cv.height)}}catch(e){IN=null;DONE=true}return}}
  return t0()}}
/* ================= flags "dlset", "updmsg", "uid" =================
   dlset: a settings button at the top right of the lobby (Google sign-in, MIN / FULL download). MIN = the game only, voices load while playing.
     FULL = every released voice file is fetched before the lobby opens and kept on the device (Cache Storage, served by sw.js); each update adds its files.
     The game still needs the internet either way. First start asks which one; the choice can be switched in Settings.
   updmsg: when something is released while the game is open, players in the lobby are sent back to the start screen with a NEW UPDATE message
     (players in a match get it when they are back in the lobby). live.js fills window.COMBO_UPD with the names of new releases.
   uid: "USER ID" at the top right of the lobby, hidden until tapped. */
{const CN='combo-audio-v1',MK='combo-dl-mode',DK2='combo-dl-done',DL={mode:null,list:[],have:null,done:0,fail:0,bytes:0,tot:0,run:false,stop:false,cors:null,full:false,ok:false,fin:false,started:false};
 try{DL.mode=localStorage.getItem(MK)}catch(e){}if(DL.mode!=='min'&&DL.mode!=='full')DL.mode=null;
 const web=()=>/^https?:$/.test(location.protocol),note=t=>{G.note={t,T:2.8}};
 /* mindl: MIN also has a download step, but a small one: only the fight shout and pain clips (window.COMBO_AUD_GRUNT). Everything else still loads while playing. */
 const MD=()=>DL.mode==='min'&&!!(F().mindl||F().dlgame);
 const manifest=()=>{let o=[];if(MD()){try{if(F().mindl&&window.COMBO_AUD_GRUNT)o=COMBO_AUD_GRUNT()}catch(e){}return Array.from(new Set(o))}try{if(window.COMBO_AUD_STORY)o=o.concat(COMBO_AUD_STORY())}catch(e){}try{if(window.COMBO_AUD_VOICE)o=o.concat(COMBO_AUD_VOICE())}catch(e){}try{if(F().duel2&&window.COMBO_AUD_DUEL)o=o.concat(COMBO_AUD_DUEL())}catch(e){}return Array.from(new Set(o))};
 const hsh=a=>{let x=5381;for(const u of a)for(let k=Math.max(0,u.length-12);k<u.length-4;k++)x=((x*33)^u.charCodeAt(k))>>>0;return a.length+':'+x};
 const sw=()=>{try{if(web()&&'serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{})}catch(e){}};
 /* MIN plays in LOW quality; FULL can go up to HIGH (the player's last choice comes back) */
 function qfix(){try{const st=SV.set;if(DL.mode==='min'){if(st.q!==0){if(st.q0==null)st.q0=st.q;st.q=0;save();resize()}}else if(DL.mode==='full'&&st.q0!=null){st.q=st.q0;delete st.q0;save();resize()}}catch(e){}}
 function setMode(m){DL.mode=m;try{localStorage.setItem(MK,m)}catch(e){}if(m==='full'||MD())sw();if(F().dlset)qfix()}
 async function scan(){if(DL.have)return;const h=new Set();try{if(window.caches){const c=await caches.open(CN);(await c.keys()).forEach(r=>h.add(r.url))}}catch(e){}DL.have=h}
 function missing(){const L=manifest();DL.list=L;let d=null;try{d=localStorage.getItem(DK2)}catch(e){}if(d===hsh(L))return[];return L.filter(u=>!(DL.have&&DL.have.has(u)))}
 async function one(u){
  if(DL.cors!==false&&window.caches&&!DL.full){try{const r=await fetch(u,{mode:'cors'});if(!r.ok)throw new Error('http');const b=await r.blob();DL.bytes+=b.size;try{const c=await caches.open(CN);await c.put(u,new Response(b,{headers:{'content-type':b.type||'audio/wav','content-length':String(b.size)}}));DL.have.add(u)}catch(q){DL.full=true}DL.cors=true;return true}catch(e){if(DL.cors===true)return false}}
  try{await fetch(u,{mode:'no-cors'});if(DL.cors==null)DL.cors=false;return true}catch(e){return false}}
 /* dlgame: the download step also fetches the game's own files fresh (and refreshes the saved copy when rcover is on), so a big release always downloads something.
    If a game file is different from the one fetched at the last download, the game reloads once at the end so the new files are the ones running. */
 const GF=['./','live.js','story.js','voice.js','more.js','body.js','look.js'];
 async function gone(f){try{const u=new URL(f,location.href);u.search='';u.hash='';const r=await fetch(u.href,{cache:'no-store'});if(!r.ok)return false;const t=await r.clone().text();DL.bytes+=t.length;let x=5381;for(let k=0;k<t.length;k+=7)x=((x*33)^t.charCodeAt(k))>>>0;const h=t.length+':'+x,key='combo-gf:'+f;
   let pv=null;try{pv=localStorage.getItem(key);localStorage.setItem(key,h)}catch(e){}if(pv&&pv!==h)DL.reload=true;
   try{if(F().rcover&&window.caches&&r.headers.get('x-combo')==='1')await(await caches.open('combo-shell-v1')).put(u.href,r)}catch(e){}return true}catch(e){return false}}
 async function runDL(){if(DL.run)return;DL.run=true;DL.stop=false;DL.fin=false;DL.reload=false;await scan();const q=missing();if(F().dlgame&&web())GF.forEach(f=>q.push({g:f}));DL.tot=q.length;DL.done=0;DL.fail=0;let i=0;
  const worker=async()=>{while(i<q.length&&!DL.stop){const u=q[i++],gm=typeof u!=='string';let ok=gm?await gone(u.g):await one(u);if(!ok)ok=gm?await gone(u.g):await one(u);if(!ok)DL.fail++;DL.done++}};
  try{await Promise.all([0,1,2,3].map(worker))}catch(e){}DL.run=false;if(!DL.stop){try{if(!DL.fail&&!DL.full)localStorage.setItem(DK2,hsh(DL.list))}catch(e){}DL.fin=true}}
 /* dl6: FULL players are only sent through the download screen when 5 or more things were released at once from Dev Studio (window.COMBO_BIG = time of the newest such release) since their last finished download.
    Smaller releases load their files while playing. Choosing FULL the first time, or tapping FULL in Settings, always downloads. */
 /* dlafter: a download never starts from the Settings on the start screen. Picking MIN or FULL there only saves the choice; the download screen comes
    after the player taps start and CONNECTING has finished, the same as the very first time (choose MIN / FULL, then download). */
 /* dl4 (dl6 was already released): the download step runs when 4 or more things were released at once, instead of 5 (window.COMBO_BIG4) */
 const BIGV=()=>F().dl4?(window.COMBO_BIG4||0):(window.COMBO_BIG||0);
 const BK='combo-dl-big',need=()=>{if(DL.ok)return false;if(!F().dl6)return true;let v=null;try{v=localStorage.getItem(BK)}catch(e){}if(v==null)return true;if((BIGV())>+v)return true;DL.ok=true;return false};
 function pick(m){setMode(m);DL.stop=true;DL.started=false;DL.fin=false;if(m==='full'||MD()){DL.ok=false;goto('dl')}else{DL.ok=true;goto('menu')}}
 setTimeout(()=>{if(F().dlset&&(DL.mode==='full'||MD()))sw()},3000);
 const g0=goto;goto=function(m){if(m!=='menu')G.set2=false;if(F().dlset&&m==='menu'&&G.mode==='title'&&web()){if(!DL.mode)return g0('dlpick');if((DL.mode==='full'||MD())&&(need()||(F().dlafter&&DL.force))){DL.force=false;return g0('dl')}}return g0(m)};
 SCR.dlpick=function(){scr();const n=manifest().length,bw=Math.min(330,(W-60)/2),y=96,h=160,x0=W/2-bw-10;
  [['min','MIN DOWNLOAD',F().mindl?'Small: fight sounds only.':'Small and quick.','Voices load while you play,','so a line can start a little late.','#2f4f8f','Plays in LOW quality.'],['full','FULL DOWNLOAD',n+' voice files.','Bigger and slower to get,','then voices play right away.','#2f7a5f','Quality can go up to HIGH.']].forEach((q,k)=>{const x=x0+k*(bw+20);button(x,y,bw,h,'',q[5],()=>pick(q[0]),20);txt(q[1],x+bw/2,y+36,Math.min(26,bw*.085),'#fff',INK,'center',FB,5);[q[2],q[3],q[4],q[6]].forEach((t,j)=>txt(t,x+bw/2,y+72+j*20,14,j===3?'#ffe14d':'#fff',null,'center',FU))});
  txt(F().setstart?'You can switch any time in Settings, at the top right of the start screen.':'You can switch any time in Settings, at the top right of the lobby.',W/2,y+h+28,13.5,'#e6dcff',null,'center',FU);txt('Every update adds its new files. The game still needs the internet to play.',W/2,y+h+48,13.5,'#e6dcff',null,'center',FU);hdr('CHOOSE YOUR DOWNLOAD','title',true)};
 SCR.dl=function(){scr();if(!DL.run&&!DL.fin&&!DL.started){DL.started=true;DL.stop=false;runDL()}
  if(DL.fin){DL.ok=true;DL.fin=false;DL.started=false;try{localStorage.setItem(BK,String(BIGV()))}catch(e){}if(DL.full)note('Your device is out of room. The rest loads as you play.');else if(DL.fail)note(DL.fail+' files did not download. They load as you play.');if(DL.reload&&!DL.stop){DL.reload=false;try{location.reload();return}catch(e){}}goto('menu');return}
  const tot=DL.tot,k=tot?DL.done/tot:0,bw=Math.min(560,W-60),bx=(W-bw)/2,by=150;txt('DOWNLOADING',W/2,104,30,'#ffe14d',INK,'center',FB,7);
  rr(bx,by,bw,26,13);g.fillStyle='#120a22';g.fill();g.strokeStyle='#fff';g.lineWidth=2;g.stroke();if(k>0){rr(bx+3,by+3,Math.max(20,(bw-6)*k),20,10);g.fillStyle='#7fdcff';g.fill()}
  txt(tot?DL.done+' / '+tot+' files'+(DL.bytes?'   ·   '+Math.round(DL.bytes/1048576)+' MB':''):'Checking what you already have...',W/2,by+50,17,'#fff',null,'center',FU);
  txt(DL.cors===false?'Your browser is pre-loading the files.':'Files are kept on this device so voices play right away.',W/2,by+74,13,'#e6dcff',null,'center',FU);
  txt(MD()?(F().dlgame?'MIN download: game files and fight sounds. The rest loads while you play.':'MIN download: fight sounds only. The rest loads while you play.'):'Keep the game open. You can also switch to MIN and play now.',W/2,by+94,13,'#e6dcff',null,'center',FU);
  if(MD())button((W-320)/2,by+120,320,44,'PLAY NOW','#3a2a5e',()=>{DL.stop=true;DL.started=false;DL.fin=false;DL.ok=true;goto('menu')},18);else button((W-320)/2,by+120,320,44,'SWITCH TO MIN DOWNLOAD','#3a2a5e',()=>pick('min'),18);hdr('UPDATE',null,true)};
 /* flag "dlart": the download screens (choose MIN / FULL, and downloading) are one full-screen picture: the artwork of one of 20 fighters with a tip
    on it, MIN and FULL buttons at the top, the download bar at the bottom, and arrows at the middle left and right to flip through the 20 arts and tips. */
 const TIPS=['Types beat each other in a circle: POWER beats SPEED, SPEED beats TECH, TECH beats SPIRIT, SPIRIT beats GUARD and GUARD beats POWER.',
  'Hitting a type you beat does 25% more damage. Check the type chart before you pick your team.',
  'Tap SWAP in a match to tag in a teammate. A clash cutscene plays when the new fighter comes in.',
  'AST calls a teammate in for a quick hit without swapping your fighter out.',
  'Hold GUARD to block. You cannot attack while you guard, so let go to hit back.',
  'Fill your meter by fighting, then press ULT for your cinematic ultimate.',
  'DASH gets you in close fast, or out of trouble just as fast.',
  'Hold a fighter in TEAMS to level them up with EXP items.',
  'EXP CHALLENGE in MATCH, OFFLINE gives EXP items. Play it as many times as you want.',
  'Every level adds +0.25% damage and health in offline matches. The top level is 200.',
  'Summoning a fighter you already own gives them a star. Every star makes them stronger.',
  'Red tickets are for UR summons. Yellow tickets are for the ticket exchange in GACHA.',
  'Gacha banners rotate every 30 minutes. Tap a banner to see what is in it and the full rates.',
  'NEWS, next to your mailbox, shows every new fighter, map, mode and banner. Tap one to see all of it.',
  'The mailbox next to your gems holds your rewards. A red dot means there is something to claim.',
  'You have 10 team slots. Use the arrows before a match to switch between them.',
  'Ranked Combo moves your rank up and down. Casual Combo is for fun and practice.',
  'BOSS RAID in MATCH, ONLINE lets you fight one huge boss together with other players.',
  'Every button can be changed in CONFIGURE, CONTROLS: keyboard, touch, Xbox and PlayStation.',
  'LOW quality is the fastest on older phones. Change FPS and quality in CONFIGURE.'];
 const dlArt=pk=>{
  if(!pk){if(!DL.run&&!DL.fin&&!DL.started){DL.started=true;DL.stop=false;runDL()}
   if(DL.fin){DL.ok=true;DL.fin=false;DL.started=false;try{localStorage.setItem(BK,String(BIGV()))}catch(e){}if(DL.full)note('Your device is out of room. The rest loads as you play.');else if(DL.fail)note(DL.fail+' files did not download. They load as you play.');if(DL.reload&&!DL.stop){DL.reload=false;try{location.reload();return}catch(e){}}goto('menu');return}}
  scr();const N=TIPS.length;if(G.dlaT==null||G.t-G.dlaT>1||G.dla==null)G.dla=(Math.random()*N)|0;G.dlaT=G.t;const i=((G.dla|0)%N+N)%N,c=CH[i%CH.length];
  g.save();try{worldBG(c,0,0,W,H);g.fillStyle='rgba(10,0,30,.4)';g.beginPath();g.ellipse(W*.5,H-58,H*.32,H*.035,0,0,TAU);g.fill();miniChar(c,W*.5,H-60,(H-112)/165,{sway:.3})}catch(e){}g.restore();
  let gr=g.createLinearGradient(0,0,0,74);gr.addColorStop(0,'rgba(10,4,24,.82)');gr.addColorStop(1,'rgba(10,4,24,0)');g.fillStyle=gr;g.fillRect(0,0,W,74);
  gr=g.createLinearGradient(0,H-170,0,H);gr.addColorStop(0,'rgba(10,4,24,0)');gr.addColorStop(.45,'rgba(10,4,24,.7)');gr.addColorStop(1,'rgba(10,4,24,.94)');g.fillStyle=gr;g.fillRect(0,H-170,W,170);
  /* MIN and FULL at the top */
  const bw=Math.min(190,(W-260)/2),bh=40,by=10,cur=pk?null:DL.mode;
  [['min','MIN','#2f4f8f','Small · plays in LOW'],['full','FULL','#2f7a5f','All voices · up to HIGH']].forEach((q,n)=>{const x=W/2+(n?8:-bw-8),on=cur===q[0];button(x,by,bw,bh,q[1],q[2],()=>{if(!on)pick(q[0])},24);
   if(on){g.save();g.beginPath();g.moveTo(x+10,by);g.lineTo(x+bw,by);g.lineTo(x+bw-10,by+bh);g.lineTo(x,by+bh);g.closePath();g.strokeStyle='#ffe14d';g.lineWidth=5;g.stroke();g.restore()}
   txt((on?'✓ ':'')+q[3],x+bw/2,by+bh+11,11.5,on?'#ffe14d':'#fff',INK,'center',FU,3)});
  if(pk)button(12,12,96,34,'BACK','#3a2a5e',()=>goto('title'),18);
  /* arrows at the middle left and right */
  button(8,H/2-34,48,68,'‹','#3a2a5e',()=>{G.dla=(i+N-1)%N},36);button(W-56,H/2-34,48,68,'›','#3a2a5e',()=>{G.dla=(i+1)%N},36);
  /* the tip */
  const tw=Math.min(640,W-150),tx=(W-tw)/2;g.font='700 15px '+FU;const ls=wrap(TIPS[i],tw-36),th=30+ls.length*19+10,ty=H-58-th;
  rr(tx,ty,tw,th,12);g.fillStyle='rgba(10,4,24,.8)';g.fill();g.strokeStyle=c.col2||'#ffe14d';g.lineWidth=2.5;g.stroke();
  txt('TIP '+(i+1)+' / '+N,tx+16,ty+17,12,'#ffe14d',null,'left',FU);txt(c.name+(c.title?'  ·  '+String(c.title).toUpperCase():''),tx+tw-16,ty+17,12,c.col2||'#fff',INK,'right',FU,3);
  ls.forEach((l,n)=>txt(l,W/2,ty+40+n*19,15,'#fff',null,'center',FU));
  /* the download bar at the bottom */
  const pw=Math.min(W-40,900),px=(W-pw)/2,py=H-26,tot=DL.tot,kk=pk?0:(tot?DL.done/tot:0);
  rr(px,py,pw,16,8);g.fillStyle='#120a22';g.fill();g.strokeStyle='#fff';g.lineWidth=2;g.stroke();if(kk>0){rr(px+3,py+3,Math.max(10,(pw-6)*kk),10,5);g.fillStyle='#7fdcff';g.fill()}
  txt(pk?'Pick MIN or FULL at the top to start. You can switch any time in Settings.':tot?'DOWNLOADING   '+DL.done+' / '+tot+' files'+(DL.bytes?'   ·   '+Math.round(DL.bytes/1048576)+' MB':''):'Checking what you already have...',px+4,py-13,13,'#fff',INK,'left',FU,3);
  if(!pk&&MD())button(px+pw-150,py-30,150,26,'PLAY NOW','#3a2a5e',()=>{DL.stop=true;DL.started=false;DL.fin=false;DL.ok=true;goto('menu')},14);
  hdr('',null,true)};
 {const p0=SCR.dlpick,d0=SCR.dl;SCR.dlpick=function(){return F().dlart?dlArt(true):p0()};SCR.dl=function(){return F().dlart?dlArt(false):d0()}}
 BACK.dlpick='title';BACK.dl='title';
 /* settings panel */
 let LX=0;{const ge0=gems;gems=function(){return LX=ge0()}}
 function panel(){G.ui=[];g.fillStyle='rgba(6,2,18,.86)';g.fillRect(0,0,W,H);const first=!!F().set1st&&!DL.mode,w=Math.min(520,W-40),h=first?210:306,x=(W-w)/2,y=(H-h)/2;rr(x,y,w,h,14);g.fillStyle='#1a0f33';g.fill();g.strokeStyle='#fff';g.lineWidth=3;g.stroke();txt('SETTINGS',W/2,y+34,28,'#ffe14d',INK,'center',FB,6);
  const GG=window.COMBO_G,ga=GG&&GG.get?GG.get():null,full=DL.mode==='full',bw=(w-48-12)/2;
  button(x+24,y+60,w-48,44,ga?'SIGN OUT':'SIGN IN WITH GOOGLE',ga?'#3a2a5e':'#2f4f8f',()=>{if(!F().gsign||!GG){note('Google sign-in is not switched on yet');return}if(ga)GG.out();else GG.open()},20,ga?String(ga.name||'Google').slice(0,16)+' · saved':'Save progress');
  /* set1st: before the player has picked MIN or FULL, Settings only offers sign-in; the download choice comes when they tap start */
  if(first){txt('Tap start to choose MIN or FULL download.',W/2,y+128,13.5,'#e6dcff',null,'center',FU)}else{
  txt('DOWNLOAD',W/2,y+126,14,'#e6dcff',null,'center',FU);
  button(x+24,y+140,bw,44,'MIN DOWNLOAD',!full?'#2f7a5f':'#3a2a5e',()=>{if(DL.mode!=='min'){setMode('min');if(MD()&&web()){DL.ok=false;DL.started=false;DL.fin=false;DL.stop=true;if(F().dlafter&&G.mode==='title'){DL.force=true;note('MIN picked. Tap start to download.');return}G.set2=false;g0('dl');return}DL.ok=true;note('MIN download: LOW quality, voices load while you play')}},18,!full?'ON':'');
  button(x+36+bw,y+140,bw,44,'FULL DOWNLOAD',full?'#2f7a5f':'#3a2a5e',()=>{if(!web()){note('Downloads work on the game website');return}setMode('full');DL.ok=false;DL.started=false;DL.fin=false;if(F().dlafter&&G.mode==='title'){DL.force=true;note('FULL picked. Tap start to download.');return}G.set2=false;g0('dl')},18,full?'ON':'');
  txt(full?'FULL: every voice file is kept on this device. Quality up to HIGH.':'MIN: voices load as they play. Quality stays LOW.',W/2,y+206,13.5,'#fff',null,'center',FU);txt('Each update adds its new files. The game still needs the internet.',W/2,y+225,12.5,'#e6dcff',null,'center',FU)}
  /* devkeyset: DEV KEY sits next to CLOSE here (only on the game website) and is gone from Configure */
  const DV1=!!F().devonly,DKY=(F().devkeyset||DV1)&&window.COMBO_DEVKEY&&(window.COMBO_DEVKEY.can()||(DV1&&window.COMBO_DEVKEY.owner()))?window.COMBO_DEVKEY:null;
  if(DKY){button(W/2-146,y+h-52,140,38,'CLOSE','#3a2a5e',()=>{G.set2=false},18);const ow=DKY.owner();button(W/2+6,y+h-52,140,38,ow?(DV1?'DEV KEY':'DEV: ON'):'DEV KEY',ow?'#2f7a5f':'#7a5a1f',()=>{/* devonly: once the key is in, DEV KEY opens the Dev Studio */if(ow){if(DV1&&DKY.go){G.set2=false;DKY.go();return}note('Dev access is on for this device');return}G.set2=false;DKY.ask()},18)}else
  button(W/2-70,y+h-52,140,38,'CLOSE','#3a2a5e',()=>{G.set2=false},18);
  if(G.note){g.save();g.font='700 16px '+FU;const nw=g.measureText(G.note.t).width+36;g.globalAlpha=clamp(G.note.T*3,0,1);rr((W-nw)/2,y-44,nw,36,10);g.fillStyle='rgba(10,4,24,.96)';g.fill();g.strokeStyle='#ff7ad1';g.lineWidth=2;g.stroke();txt(G.note.t,W/2,y-26,16,'#fff',null,'center',FU);g.restore()}
  if(GG&&GG.pend&&GG.pend())drawConfirm()}
 {const cf0=SCR.config;SCR.config=function(){if(F().dlset&&DL.mode==='min'){const st=SV.set;if(st.q!==0){const tap=st.q0!=null;if(!tap)st.q0=st.q;st.q=0;save();resize();if(tap)note('MIN download plays in LOW. Pick FULL in Settings for higher.')}}return cf0()}}
 const me0=SCR.menu;SCR.menu=function(){me0();const f=F();if(f.dlset)qfix();
  /* nouid: the lobby USER ID line is removed (the one on the start screen stays) */
  if(f.uid&&!f.nouid){const t='USER ID: '+(G.uidOn?String(SV.pid||'none'):'TAP TO SHOW');txt(t,W-14,50,11,G.uidOn?'#fff':'#cbbfe6',INK,'right',FU,3);hit(W-210,43,200,15,()=>{G.uidOn=!G.uidOn;sfx('ui')})}
  if(f.dlset&&!f.setstart){const x=(LX||W-330)-46,y=12,foc=hit(x,y,38,34,()=>{G.set2=true;sfx('ui')});gear(x,y,foc);
   if(G.set2)panel()}};
 function gear(x,y,foc){rr(x,y,38,34,10);g.fillStyle='rgba(10,4,24,.6)';g.fill();if(foc){g.strokeStyle='#ffe14d';g.lineWidth=3;g.stroke()}
   g.save();g.translate(x+19,y+17);g.strokeStyle='#fff';g.lineWidth=4;g.lineCap='butt';for(let k=0;k<8;k++){const a=k*TAU/8;g.beginPath();g.moveTo(Math.cos(a)*7,Math.sin(a)*7);g.lineTo(Math.cos(a)*12,Math.sin(a)*12);g.stroke()}g.lineWidth=3.5;g.beginPath();g.arc(0,0,7.5,0,TAU);g.stroke();circ(0,0,2.6,'#fff');g.restore()}
 /* setstart: the settings button leaves the lobby and sits at the top right of the start screen. uidstart: USER ID at the top left of the start screen, hidden until tapped.
    Neither shows while the studio intro or CONNECTING is on screen. */
 {const ti0=SCR.title;SCR.title=function(){ti0();const f=F(),st=f.dlset&&f.setstart,ui=f.uidstart;if(!(st||ui)||G.mode!=='title')return;g.setTransform(S*dpr,0,0,S*dpr,0,0);g.globalAlpha=1;
   if(st&&G.set2){panel();return}if(G.ui.length!==1||G.cnn)return;let n=0;
   if(st){const x=W-52,y=12;gear(x,y,false);G.ui.unshift({x,y,w:38,h:34,fn:()=>{G.set2=true}});n++}
   if(ui){const t='USER ID: '+(G.uidOn?String(SV.pid||'none'):'TAP TO SHOW');txt(t,14,26,12,G.uidOn?'#fff':'#cbbfe6',INK,'left',FU,3);G.ui.unshift({x:8,y:12,w:230,h:28,fn:()=>{G.uidOn=!G.uidOn}});n++}
   G.focus=n}}
 /* new update message. updshort: the message only says COMBO UPDATE, without the names of what was released */
 let UPD=null;const up0=update;update=function(rdt){up0(rdt);const q=window.COMBO_UPD;if(!q||!q.length)return;DL.ok=false;DL.started=false;DL.fin=false;if(!F().updmsg){q.length=0;return}
  if(G.mode==='menu'||G.mode==='title'){UPD={names:(UPD?UPD.names:[]).concat(q.splice(0)),t:0};G.set2=false;if(G.mode==='menu')goto('title')}};
 const ti0=SCR.title;SCR.title=function(){ti0();if(!UPD||!G.ui.length)return;const now=performance.now();if(!UPD.t)UPD.t=now;if(now-UPD.t>12000){UPD=null;return}
  g.setTransform(S*dpr,0,0,S*dpr,0,0);const sh=!!F().updshort,nm=sh?[]:UPD.names.slice(0,4),more=sh?0:UPD.names.length-nm.length,w=Math.min(460,W-40),h=sh?60:62+nm.length*20+(more?20:0),x=(W-w)/2,y=H*.34;g.save();g.globalAlpha=clamp((now-UPD.t)/250,0,1)*clamp((12000-(now-UPD.t))/500,0,1);
  rr(x,y,w,h,14);g.fillStyle='rgba(16,8,34,.94)';g.fill();g.strokeStyle='#ffe14d';g.lineWidth=3;g.stroke();txt(sh?'COMBO UPDATE':'NEW UPDATE',W/2,y+30,28,'#ffe14d',INK,'center',FB,6);nm.forEach((t,k)=>txt(t,W/2,y+60+k*20,15,'#fff',null,'center',FU));if(more)txt('+ '+more+' more',W/2,y+60+nm.length*20,14,'#e6dcff',null,'center',FU);g.restore()}}
/* conn: tapping start keeps the start screen up with "CONNECTING TO COMBO" at the bottom for 8 seconds, then carries on to wherever start led before. */
{const T=8000;let t0=0,on=false,pass=false,up=false,busy=false,last=0;const gc0=goto;goto=function(m){if(F().conn&&m==='menu'&&G.mode==='title'&&!pass){if(!on){on=true;up=false;last=0;t0=performance.now();sfx('ui')}return}if(m!=='title')on=false;return gc0(m)};
 const ct0=SCR.title;SCR.title=function(){if(!on||!F().conn){on=false;G.cnn=false;return ct0()}G.cnn=true;
  const tx0=txt;txt=function(s){if(typeof s==='string'&&/TO START$/.test(s))return;return tx0.apply(this,arguments)};try{ct0()}finally{txt=tx0}
  G.ui=[];const e=performance.now()-t0;g.setTransform(S*dpr,0,0,S*dpr,0,0);g.globalAlpha=1;txt('CONNECTING TO COMBO'+'.'.repeat(1+((e/450|0)%3)),W/2,H*.93,24,'#fff',INK,'center',FB,7);
  const need=F().rcover&&window.COMBO_SRV;if(need&&!up&&!busy&&performance.now()-last>2000){busy=true;last=performance.now();const tt=t0;
   fetch('live.json?c='+Date.now(),{cache:'no-store'}).then(r=>r.ok?r.json():null).then(q=>{if(Array.isArray(q)&&tt===t0){up=true;try{if(window.COMBO_REMOTE)COMBO_REMOTE()}catch(x){}}}).catch(()=>{}).then(()=>{busy=false})}
  if(e>=T&&(!need||up)){on=false;pass=true;try{goto('menu')}finally{pass=false}}}
 /* rcover: keep a copy of the game's own files on the device (see sw.js) so the studio intro and start screen show even while the game server is still waking up */
 const SH='combo-shell-v1',FILES=['./','live.js','story.js','voice.js','more.js','body.js','look.js','icon.png','icon2.png','manifest.json','manifest2.json'];let kept=false;
 const keep=async()=>{if(kept||!window.COMBO_SRV||!window.caches||!/^https?:$/.test(location.protocol))return;kept=true;try{
   if(!F().rcover){if(window.LIVE_READY)await caches.delete(SH);return}
   if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});const c=await caches.open(SH);
   for(const f of FILES){try{const u=new URL(f,location.href);u.search='';u.hash='';const r=await fetch(u.href,{cache:'no-store'});if(r.status===200&&r.headers.get('x-combo')==='1')await c.put(u.href,r)}catch(x){}}}catch(x){}};
 {let n=0;const iv=setInterval(()=>{n++;if(window.LIVE_READY||n>=8){clearInterval(iv);keep()}},1000)}}
/* lookboth: whenever a fighter is drawn facing the camera (story scenes, match intros, ultimates, win shots), the fighter they are facing turns to the camera too.
   Only fighters who are standing (idle, posing or in their win pose) turn; someone attacking, hurt, knocked down, walking in or in the air stays as they are. */
{let CUR=null,FORCE=false;const NOW=()=>performance.now();
 const fr0=drawFrontChar;drawFrontChar=function(c,o){if(CUR&&!FORCE&&CUR.c===c)CUR._ft=NOW();return fr0(c,o)};try{window.CFRONT=drawFrontChar}catch(e){}
 const all=()=>(G.f||[]).concat(G.al||[]).filter((x,i,a)=>x&&!x.hide&&a.indexOf(x)===i);
 const target=p=>{let b=null,bd=1e9,b2=null,bd2=1e9;for(const x of all()){if(x===p)continue;const d=Math.abs(x.x-p.x);if(d<bd2){bd2=d;b2=x}if(Math.sign(x.x-p.x)===(p.face||1)&&d<bd){bd=d;b=x}}return b||b2};
 const ok=f=>(f.state==='idle'||f.state==='pose'||f.state==='win')&&!(f.y<0)&&f.wz==null;
 const dl0=drawFighter;drawFighter=function(f,sil){if(!f||!F().lookboth||sil)return dl0(f,sil);const pc=CUR;CUR=f;try{
   let turn=false;if(!f.hide&&ok(f)){const t=NOW();for(const p of all()){if(p!==f&&p._ft&&t-p._ft<140&&target(p)===f){turn=true;break}}}
   if(!turn)return dl0(f,sil);
   FORCE=true;try{if(G.mode==='scene'&&F().anime&&window.CFRONT){const v=f.view;f.view='front';try{dl0(f,sil)}finally{f.view=v}}
    else{g.save();try{g.translate(f.x,f.y);const sc=f.sc||f.c.sc||1;g.scale(sc,sc);fr0(f.c,{t:f.at,expr:exprOf(f),sway:f.sway,dmg:f.mhp?1-f.hp/f.mhp:0,win:f.state==='win'})}catch(e){}g.restore()}}finally{FORCE=false}
  }finally{CUR=pc}}}
/* iconfull: every character face icon (fighter tiles, profile pictures, team circles, match portraits, quest list faces) is zoomed out so the whole head shows. The game icon is not changed. */
{const dh0=drawHead;drawHead=function(c,x,y,sc,flip,expr,dmg,sil){if(F().iconfull&&expr!=='yell')sc*=.58;return dh0(c,x,y,sc,flip,expr,dmg,sil)}}
/* bg25: 2.5D backgrounds. Matches, intros and story scenes get two more depth layers on the ground: a row of stage props just behind the fighters and a row of dark props
   close to the camera, both placed on the floor's own perspective so they slide at their own speed when the camera moves; the floor is shaded darker toward the horizon.
   Story scenes add a slow camera drift so the layers are seen moving. Menu screens get a perspective floor that scrolls toward the camera. Indoor story places are left alone. */
{const B=()=>F().bg25,ROOM={dojo:1,inn:1,cave:1},room=()=>{try{const e=window.COMBO_ENV&&COMBO_ENV();return !!(e&&ROOM[e])}catch(x){return false}};
 const prop=(kind,x,y,s,st,sil,k)=>{const dk=sil?'rgba(8,4,20,.9)':st.bc||'#1b1038';
  if(kind==='torii'){g.fillStyle=dk;g.fillRect(x-3*s,y-34*s,6*s,34*s);g.fillRect(x-10*s,y-3*s,20*s,3*s);g.fillRect(x-9*s,y-50*s,18*s,16*s);g.beginPath();g.moveTo(x-13*s,y-50*s);g.lineTo(x,y-60*s);g.lineTo(x+13*s,y-50*s);g.fill();
   if(!sil){g.fillStyle='#ffcf7a';g.globalAlpha=.75+.2*Math.sin(G.t*3+k);g.fillRect(x-6*s,y-47*s,12*s,10*s);g.globalAlpha=1}}
  else if(kind==='neon'){g.fillStyle=sil?dk:'#07061a';g.fillRect(x-2.5*s,y-78*s,5*s,78*s);g.fillRect(x-2.5*s,y-78*s,26*s,4*s);g.fillRect(x-9*s,y-4*s,18*s,4*s);
   if(!sil){const nc=k%2?'#ff5ac8':'#5af0ff';g.fillStyle=nc;g.fillRect(x+12*s,y-74*s,12*s,4*s);g.globalAlpha=.16;g.beginPath();g.moveTo(x+12*s,y-70*s);g.lineTo(x+24*s,y-70*s);g.lineTo(x+40*s,y);g.lineTo(x-4*s,y);g.fill();g.globalAlpha=1}}
  else if(kind==='ice'){poly([[x-16*s,y],[x-7*s,y-46*s],[x,y-18*s],[x+8*s,y-64*s],[x+18*s,y]],sil?dk:'#bfe8ff',sil?null:'#fff',sil?0:1.5);if(!sil)poly([[x+3*s,y],[x+8*s,y-64*s],[x+12*s,y]],'#effaff')}
  else if(kind==='rock'){poly([[x-22*s,y],[x-12*s,y-30*s],[x-2*s,y-22*s],[x+7*s,y-44*s],[x+20*s,y-16*s],[x+26*s,y]],sil?dk:'#160708');if(!sil){g.strokeStyle='rgba(255,120,30,.8)';g.lineWidth=1.6*s;g.beginPath();g.moveTo(x+7*s,y-42*s);g.lineTo(x+3*s,y-24*s);g.lineTo(x+9*s,y);g.stroke()}}
  else{const h=(k%3===0?30:54)*s;g.fillStyle=sil?dk:'#eef4fb';g.fillRect(x-8*s,y-h,16*s,h);g.fillRect(x-12*s,y-5*s,24*s,5*s);if(k%3)g.fillRect(x-12*s,y-h-5*s,24*s,6*s);if(!sil){g.fillStyle='#c6d6ea';g.fillRect(x-8*s,y-h,4.5*s,h)}}};
 try{window.COMBO_PROP=prop}catch(e){}
 const row=(front)=>{const st=STAGES[G.stg||0],z=cam.z,hy=cam.ay-26*z-cam.y*z*.6,fh=Math.max(1,H-hy),dy=front?fh*1.04:Math.min(15*z,fh*.2),f=z*(.62+2.2*dy/300),step=front?760:330,off=front?380:165,y=hy+dy,s=f*(front?1.5:.92);
  for(let i=-9;i<=9;i++){const wx=i*step+off;if(!front&&(Math.abs(wx)<95||Math.abs(Math.abs(wx)-620)<95))continue;const x=W/2+(wx-cam.x)*f;if(x<-90||x>W+90)continue;
   if(!front){g.fillStyle='rgba(0,0,0,.28)';g.beginPath();g.ellipse(x,y,16*s,3.2*s,0,0,TAU);g.fill()}prop(st.mid,x,y,s,st,front,i+20)}};
 const bg0=drawBG;drawBG=function(){bg0();if(!B()||room())return;try{g.save();const z=cam.z,hy=cam.ay-26*z-cam.y*z*.6,fh=Math.max(1,H-hy);
   const sh=g.createLinearGradient(0,hy,0,hy+fh*.42);sh.addColorStop(0,'rgba(6,2,18,.42)');sh.addColorStop(1,'rgba(6,2,18,0)');g.fillStyle=sh;g.fillRect(0,hy,W,fh*.42);
   const nr=g.createLinearGradient(0,hy+fh*.6,0,H);nr.addColorStop(0,'rgba(255,255,255,0)');nr.addColorStop(1,'rgba(255,255,255,.07)');g.fillStyle=nr;g.fillRect(0,hy+fh*.6,W,fh*.4);
   row(false);g.restore()}catch(e){try{g.restore()}catch(x){}}};
 const fg0=drawFG;drawFG=function(){fg0();if(!B()||room())return;try{g.save();row(true);g.restore()}catch(e){try{g.restore()}catch(x){}}};
 /* story scenes: slow camera drift */
 if(SCR.scene){const sc0=SCR.scene;SCR.scene=function(){if(!B()||G.mode!=='scene')return sc0();const o=Math.sin(G.t*.32)*34;cam.x+=o;try{return sc0()}finally{if(G.mode==='scene')cam.x-=o}}}
 /* menu screens: perspective floor */
 const s0=scr;scr=function(){s0();if(!B()||G.mode==='scene')return;try{g.save();const y0=H*.72,fh=H-y0,dr=(G.t*14)%90;
   const fl=g.createLinearGradient(0,y0,0,H);fl.addColorStop(0,'rgba(10,4,24,.5)');fl.addColorStop(1,'rgba(10,4,24,.12)');g.fillStyle=fl;g.fillRect(0,y0,W,fh);
   const hz=g.createLinearGradient(0,y0-26,0,y0+6);hz.addColorStop(0,'rgba(255,170,220,0)');hz.addColorStop(1,'rgba(255,170,220,.22)');g.fillStyle=hz;g.fillRect(0,y0-26,W,32);
   g.strokeStyle='rgba(255,255,255,.13)';g.lineWidth=1.2;g.beginPath();g.rect(0,y0,W,fh);g.clip();
   for(let i=-16;i<=16;i++){const wx=i*90-dr;g.beginPath();g.moveTo(W/2+wx*.3,y0);g.lineTo(W/2+wx*2.1,H);g.stroke()}
   const ph=(G.t*.22)%1;for(let j=0;j<8;j++){const d=(j+ph)/8,y=y0+fh*d*d;g.globalAlpha=.25+d*.75;g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke()}g.restore()}catch(e){try{g.restore()}catch(x){}}}}
/* art1: every fighter gets their own artwork on the lobby panel, the fighter detail screen, team cards and the summon reveal. It is drawn by the game from the fighter's name:
   own pose (front, front with raised fist, from behind, or one of six action poses), tilt, zoom, expression and facing, and own backdrop design (rays, bands, rings, burst, speed lines or split)
   in the fighter's colours over their world. A fighter the player does not own stays a dark shape as before. */
{let ART=0;const A=()=>F().art1,SP=new Map();
 const hs=n=>{let x=2166136261;for(let i=0;i<n.length;i++){x^=n.charCodeAt(i);x=Math.imul(x,16777619)}return x>>>0};
 const spec=c=>{let q=SP.get(c.name);if(!q){const h=hs(String(c.name)),h2=hs(c.name+'#');q={bg:h%6,pk:(h>>>3)%8,sp:(h>>>6)%6,tilt:((h>>>9)%7-3)*.035,zoom:((h>>>3)%8<=3?.76:.9)+((h>>>12)%5)*.04,ex:['','smirk','yell','','smirk'][(h>>>15)%5],flip:(h>>>18)&1,dx:((h>>>19)%5-2)*5,rot:(h2%628)/100,seed:h2};SP.set(c.name,q)}return q};
 const rnd=(s,i)=>{const v=Math.sin(s*.0001+i*12.9898)*43758.5453;return v-Math.floor(v)};
 const back=(c,q,cx,cy,R)=>{g.save();const a=c.col2||'#fff',b=c.col||'#fff';
  if(q.bg===0){g.translate(cx,cy);g.rotate(q.rot+G.t*.04);g.fillStyle=a;g.globalAlpha=.2;for(let k=0;k<12;k++){g.rotate(TAU/12);g.beginPath();g.moveTo(0,0);g.lineTo(-R*.14,-R*2.4);g.lineTo(R*.14,-R*2.4);g.fill()}}
  else if(q.bg===1){g.translate(cx,cy);g.rotate(-.5+q.tilt*3);[[-.75,b,.3],[-.1,a,.26],[.5,b,.22]].forEach(v=>{g.globalAlpha=v[2];g.fillStyle=v[1];g.fillRect(-R*3,v[0]*R,R*6,R*.34)})}
  else if(q.bg===2){g.globalAlpha=.16;g.fillStyle=a;g.beginPath();g.arc(cx,cy,R*.92,0,TAU);g.fill();g.strokeStyle=a;[[.92,5,.5],[1.22,2.5,.35],[1.5,1.5,.25]].forEach(v=>{g.globalAlpha=v[2];g.lineWidth=v[1];g.beginPath();g.arc(cx,cy,R*v[0],0,TAU);g.stroke()})}
  else if(q.bg===3){g.translate(cx,cy);g.rotate(q.rot);g.globalAlpha=.26;g.fillStyle=a;g.beginPath();for(let k=0;k<20;k++){const r=k%2?R*.72:R*(1.25+rnd(q.seed,k)*.5),an=k*TAU/20;g.lineTo(Math.cos(an)*r,Math.sin(an)*r)}g.closePath();g.fill();g.globalAlpha=.3;g.fillStyle='#fff';g.beginPath();g.arc(0,0,R*.5,0,TAU);g.fill()}
  else if(q.bg===4){g.strokeStyle='#fff';g.lineCap='round';for(let k=0;k<16;k++){const yy=cy-R*1.3+rnd(q.seed,k)*R*2.4,w=R*(.5+rnd(q.seed,k+40)*1.4),xx=cx-R*1.8+((rnd(q.seed,k+80)*R*3.6+G.t*R*.5*(q.flip?-1:1))%(R*3.6)+R*3.6)%(R*3.6);g.globalAlpha=.14+rnd(q.seed,k+9)*.22;g.lineWidth=1.5+rnd(q.seed,k+5)*3;g.beginPath();g.moveTo(xx,yy);g.lineTo(xx+w,yy);g.stroke()}}
  else{g.translate(cx,cy);g.rotate(q.flip?.9:-.9);g.globalAlpha=.3;g.fillStyle=b;g.fillRect(-R*3,0,R*6,R*3);g.globalAlpha=.7;g.fillStyle=a;g.fillRect(-R*3,-R*.03,R*6,R*.06)}
  g.restore();g.save();g.fillStyle=a;for(let k=0;k<14;k++){const px=cx+(rnd(q.seed,k+200)-.5)*R*2.6,py=cy+R*1.2-((rnd(q.seed,k+300)*R*2.6+G.t*R*(.05+rnd(q.seed,k+7)*.08))%(R*2.6));g.globalAlpha=.25+rnd(q.seed,k+400)*.45;g.beginPath();g.arc(px,py,R*(.012+rnd(q.seed,k+500)*.022),0,TAU);g.fill()}g.restore()};
 const mc0=miniChar;miniChar=function(c,x,y,sc,o){if(!ART||!A()||!c||(o&&o.sil))return mc0(c,x,y,sc,o);const q=spec(c),k=sc*(c.sc||1)*q.zoom;let done=false;
  try{back(c,q,x,y-78*sc,sc*100);g.fillStyle='rgba(10,0,30,.42)';g.beginPath();g.ellipse(x+q.dx*sc,y+3*sc,sc*38,sc*6,0,0,TAU);g.fill()}catch(e){try{g.restore()}catch(x2){}}
  g.save();try{g.translate(x+q.dx*sc,y);g.rotate(q.tilt);const ex=o&&o.expr&&o.expr!=='blink'?o.expr:q.ex;
   if(q.pk<=2){g.scale(k,k);drawFrontChar(c,{t:G.t,expr:ex,win:q.pk===2});done=true}
   else if(q.pk===3&&window.CBACK){g.scale(k,k);window.CBACK(c,{t:G.t});done=true}
   else{const P=[RAISE,L1B,L4A,HA,HB,WIN][q.sp]||IDLES[c.idle||0];g.scale(q.flip?-k:k,k);drawChar(c,P,{t:G.t,sway:.15,ground:true,expr:ex});done=true}}catch(e){}g.restore();
  if(!done)return mc0(c,x,y,sc,o)};
 const ctx=fn=>function(){ART++;try{return fn.apply(this,arguments)}finally{ART--}};
 SCR.menu=ctx(SCR.menu);if(SCR.fdetail)SCR.fdetail=ctx(SCR.fdetail);if(SCR.news)SCR.news=ctx(SCR.news);['dl','dlpick'].forEach(q=>{if(SCR[q])SCR[q]=ctx(SCR[q])});teamCard=ctx(teamCard);drawReveal=ctx(drawReveal)}
/* lobbychar, part 2: remove the fighter picture panel on the right side of the lobby. The panel is drawn by drawMenu right after scr(): box, world picture, fighter, header strip and two labels.
   While the flag is on those draws are skipped (canvas fill/stroke/fillRect are switched off from the end of scr() until the second label), so only the background fighter shows. */
{let REQ=false,ARM=0;const N=function(){},disarm=()=>{if(ARM){ARM=0;try{delete g.fill;delete g.stroke;delete g.fillRect}catch(e){}}};
 const sc0=scr;scr=function(){sc0();if(REQ){REQ=false;ARM=1;g.fill=N;g.stroke=N;g.fillRect=N}};
 const wb0=worldBG;worldBG=function(){if(ARM===1){ARM=2;return}return wb0.apply(this,arguments)};
 const mc1=miniChar;miniChar=function(){if(ARM===2){ARM=3;return}return mc1.apply(this,arguments)};
 const tx1=txt;txt=function(){if(ARM>=3){ARM++;if(ARM>=5)disarm();return}if(ARM){disarm()}return tx1.apply(this,arguments)};
 const m1=SCR.menu;SCR.menu=function(){REQ=!!F().lobbychar;try{return m1.apply(this,arguments)}finally{REQ=false;disarm()}}}
/* sqbtn: the big buttons on the lobby and on the MATCH, OFFLINE and ONLINE screens are square tiles in a grid. Same buttons, same order, same actions; only their shape and place change.
   Small info lines on the match screens move to the bottom of the screen so the tiles do not cover them.
   sqtab (needs sqbtn): the small lobby buttons (CHALLENGES, LEADERBOARD, DEV STUDIO) become square tiles too, on a second tab of the lobby grid (TAB 1 / TAB 2 above the tiles, G.mtab). */
{const tile=(x,y,s,b,foc)=>{g.save();rr(x,y,s,s,Math.max(8,s*.1));g.fillStyle=b.col;g.fill();const gr=g.createLinearGradient(0,y,0,y+s);gr.addColorStop(0,'rgba(255,255,255,.16)');gr.addColorStop(1,'rgba(10,4,24,.3)');g.fillStyle=gr;g.fill();g.strokeStyle=foc?'#ffe14d':'#fff';g.lineWidth=foc?5:3;g.stroke();g.restore();
   const L=String(b.label||''),ws=L.split(' '),two=ws.length>1&&L.length>9,l1=two?ws.slice(0,Math.ceil(ws.length/2)).join(' '):L,l2=two?ws.slice(Math.ceil(ws.length/2)).join(' '):'';
   let fs=Math.min(26,s*.2);g.save();g.font='900 '+fs+'px '+FB;const mw=Math.max(g.measureText(l1).width,l2?g.measureText(l2).width:0);g.restore();if(mw>s-16)fs*=(s-16)/mw;
   const D=b.desc?String(b.desc).split(' · ').slice(0,3):[],ds=Math.min(12,s*.095),th=fs*(two?2.05:1)+(D.length?6+D.length*(ds+3):0);let ty=y+s/2-th/2+fs*.5;
   txt(l1,x+s/2,ty,fs,'#fff',INK,'center',FB,5);if(two){ty+=fs*1.05;txt(l2,x+s/2,ty,fs,'#fff',INK,'center',FB,5)}ty+=fs*.5+6+ds*.5;
   D.forEach(d=>{let q=ds;g.save();g.font='700 '+q+'px '+FU;const w=g.measureText(d).width;g.restore();if(w>s-12)q*=(s-12)/w;txt(d,x+s/2,ty,q,'#fff',INK,'center',FU,3);ty+=ds+3})};
 const wrapScr=(m,menu)=>{const d0=SCR[m];if(!d0)return;let pn=0;SCR[m]=function(){if(!F().sqbtn)return d0.apply(this,arguments);const B=[],T=[],b0=button,t0=txt,f0=G.focus,tabs=menu&&!!F().sqtab;G.focus=f0-pn;
   button=function(x,y,w,h,label,col,fn,size,desc){if(!G.set2&&((w>=200&&h>=30)||(tabs&&w>=140&&h>=28))){const sm=w<200,lp=sm&&!desc?String(label).split(' \u00b7 '):null;B.push({x,y,w,h,label:lp?lp[0]:label,col,fn,desc:lp&&lp[1]?lp[1]:desc,small:sm});return false}return b0.apply(this,arguments)};
   if(!menu)txt=function(s,x,y,size){if(B.length&&size<=14.5&&y>56&&y<H-4&&typeof s==='string'){T.push(Array.prototype.slice.call(arguments));return}return t0.apply(this,arguments)};
   try{d0.apply(this,arguments)}finally{button=b0;txt=t0}
   if(G.mode!==m)return;G.focus=f0;const B1=B.filter(q=>!q.small),B2=B.filter(q=>q.small).sort((x,y)=>(/^DEV/.test(x.label)?1:0)-(/^DEV/.test(y.label)?1:0)),two=tabs&&B2.length>0;if(!two)G.mtab=0;const tab=two?(G.mtab|0):0,show=tab?B2:B1;pn=show.length+(two?2:0);if(!B1.length)return;const old=G.ui,TL=[],kb=lastDev!=='touch';
   try{g.setTransform(S*dpr,0,0,S*dpr,0,0);const gap=10,n=B1.length,th=two?34:0;let ax,ay,aw,ah;
    if(menu){ax=Math.min.apply(null,B1.map(q=>q.x));ay=Math.min.apply(null,B1.map(q=>q.y));aw=Math.max.apply(null,B1.map(q=>q.w));ah=Math.max.apply(null,B1.map(q=>q.y+q.h))-ay}
    else{ax=18;aw=W-36;ay=Math.max(58,Math.min.apply(null,B1.map(q=>q.y))-6);ah=H-ay-(T.length?T.length*16+18:14)}
    const ty0=ay;ay+=th;ah-=th;
    let best=0,bc=1;for(let c=1;c<=n;c++){const r=Math.ceil(n/c),sd=Math.min((aw-(c-1)*gap)/c,(ah-(r-1)*gap)/r);if(sd>best){best=sd;bc=c}}const sd=Math.min(best,menu?999:200),rows=Math.ceil(n/bc),gw=bc*sd+(bc-1)*gap,gh=rows*sd+(rows-1)*gap,ox=ax+(aw-gw)/2,oy=ay+(ah-gh)/2,ns=show.length,rws=Math.ceil(ns/bc);
    const P=show.map((q,k)=>{const r=k/bc|0,inRow=tab?bc:(r===rws-1?ns-r*bc:bc),rx=ox+(gw-(inRow*sd+(inRow-1)*gap))/2;return{x:rx+(k%bc)*(sd+gap),y:oy+r*(sd+gap),w:sd,h:sd,fn:q.fn}});
    if(two){const tw=(gw-gap)/2;[0,1].forEach(k=>TL.push({x:ox+k*(tw+gap),y:ty0,w:tw,h:26,fn:()=>{G.mtab=k;G.focus=0}}))}
    P.forEach(q=>TL.push(q));G.ui=TL.concat(old);
    if(two)[0,1].forEach(k=>{const u=TL[k],foc=kb&&k===f0;g.save();rr(u.x,u.y,u.w,u.h,8);g.fillStyle=tab===k?'#ffe14d':'rgba(10,4,24,.7)';g.fill();g.strokeStyle=foc?'#ffe14d':'#fff';g.lineWidth=foc?4:2;g.stroke();g.restore();txt('TAB '+(k+1),u.x+u.w/2,u.y+13,14,tab===k?'#1a0f33':'#fff',tab===k?null:INK,'center',FB,3)});
    show.forEach((q,k)=>tile(P[k].x,P[k].y,sd,q,kb&&(k+(two?2:0))===f0));
    T.forEach((a,k)=>{a[1]=W/2;a[2]=H-12-(T.length-1-k)*16;a[6]='center';txt.apply(null,a)});if(G.focus>=G.ui.length)G.focus=0}catch(e){}}};
 wrapScr('menu',true);wrapScr('match');wrapScr('offline');wrapScr('online')}
/* pvhold (look.js half): the fighter detail screen opened from another player's profile shows that player's level and stars, no level-up buttons, and BACK returns to the profile.
   arttalk: on the fighter detail screen, tapping the fighter's artwork makes them say a line (speech bubble + their voice clip when fighter voices are on). Each fighter has two lines
   (their greeting and their win line) and taps switch between them. A fighter shown as a dark shape (not owned) does not talk. */
{const fd0=SCR.fdetail;if(fd0)SCR.fdetail=function(){const f=F(),v=G.fdv,c=CH[clamp(G.fd|0,0,CH.length-1)];let rest=null;
  if(v&&c){const o=SV.owned[c.name],l=SV.lv?SV.lv[c.name]:undefined;SV.lv=SV.lv||{};SV.owned[c.name]=Math.max(1,v.st|0);SV.lv[c.name]=Math.max(1,v.lv|0);rest=()=>{if(o==null)delete SV.owned[c.name];else SV.owned[c.name]=o;if(l==null)delete SV.lv[c.name];else SV.lv[c.name]=l};BACK.fdetail=v.ret||'menu'}
  const b0=button,t0=txt;if(v){button=function(x,y,w,h,l){if(typeof l==='string'&&l.indexOf('LEVEL UP')===0)return false;if(l==='BACK'||l==='TEST'){if(l==='TEST')return false;const a=Array.prototype.slice.call(arguments);a[6]=()=>{const q=G.fdv;G.fdv=null;goto(q.ret||'menu');G.pv=q.pv};return b0.apply(this,a)}return b0.apply(this,arguments)};
   txt=function(s){if(typeof s==='string'&&s.indexOf('Get EXP items')===0){const a=Array.prototype.slice.call(arguments);a[0]=(v.who?v.who+"'s fighter":'Another player\'s fighter');a[3]=14;a[4]='#ffe14d';return t0.apply(this,a)}return t0.apply(this,arguments)}}
  const shown=c&&(v||!!SV.owned[c.name]);try{fd0()}finally{button=b0;txt=t0;if(rest)rest()}
  if(!f.arttalk||!c||!shown||G.mode!=='fdetail')return;
  try{const T=(typeof TALK!=='undefined'&&TALK[c.name])||null,L=T?[T.say,T.win].filter(x=>typeof x==='string'&&x):[];if(!L.length)return;
   G.ui.push({x:0,y:56,w:W*.44,h:H-56,fn:()=>{const pv=G.atk&&G.atk.n===c.name?G.atk.i:-1,i=(pv+1)%L.length,line=L[i];G.atk={n:c.name,i,t:G.t,line,d:1.8+line.length*.055};try{if(window.COMBO_SAY)COMBO_SAY(c.name,line)}catch(e){}}});
   const A=G.atk;/* nobub: no speech bubble, the fighter only talks out loud */if(!f.nobub&&A&&A.n===c.name&&G.t-A.t<A.d&&G.t>=A.t){g.save();g.setTransform(S*dpr,0,0,S*dpr,0,0);const k=clamp((G.t-A.t)/.15,0,1)*clamp((A.d-(G.t-A.t))/.25,0,1),bw=Math.min(300,W*.4);g.font='700 15px '+FU;const ls=wrap(A.line,bw-28).slice(0,4),bh=22+ls.length*19,bx=Math.max(10,W*.3-bw/2),by=62;g.globalAlpha=k;
    rr(bx,by,bw,bh,12);g.fillStyle='#fff';g.fill();g.strokeStyle=INK;g.lineWidth=3;g.stroke();g.beginPath();g.moveTo(bx+bw*.42,by+bh-1);g.lineTo(bx+bw*.5,by+bh+16);g.lineTo(bx+bw*.56,by+bh-1);g.closePath();g.fillStyle='#fff';g.fill();g.stroke();g.fillRect(bx+bw*.42+2,by+bh-4,bw*.14-4,5);
    ls.forEach((t,j)=>txt(t,bx+bw/2,by+21+j*19,15,'#1a0f33',null,'center',FU));g.restore()}}catch(e){try{g.restore()}catch(x){}}};
 const uf0=update;update=function(rdt){uf0(rdt);if(G.fdv&&G.mode!=='fdetail')G.fdv=null}}
/* sumduel: the summon animation is a duel between the two start screen fighters (window.COMBO_TITLE_CH, Kenko and Neto).
   They face each other for 2 s, run in, fight for 6 s, then a FINISH button appears and one of three things happens, each 1 time in 3 (picked before the pulls are rolled):
     win  - Kenko's ultimate lands. SR and above are 1.5 times as likely for every pull of this summon.
     lose - Neto dodges it and finishes Kenko. SR and above are 0.67 times as likely.
     draw - they punch each other once and walk away. Normal odds.
   Smoke covers whoever was hit; the winner (both of them on a draw) gets the aura in the colour of the highest rarity pulled, and the rarity is shown.
   Voice: window.COMBO_DUELV(fighter name, line key) is called for each line; it plays nothing until clips exist. Rarity lines use a tier picked from the pulled rarity and lower. */
{const ON=()=>!!F().sumduel,D2=()=>!!F().duel2;let PEND=null;
 /* duel2 (sumduel was already released): the face-off is one over-the-shoulder shot like the cutscenes, 3 s so the two lines do not overlap: Kenko large in front with her back to us, Neto beyond her facing the camera (Trey's wording; two earlier versions were replaced);
    the ending uses the raised-hand pose of the old summon animation instead of the win animation; and the voice lines play (window.COMBO_DUELV in voice.js). */
 const sm0=summon;summon=function(k){if(!ON())return sm0(k);const n=window.COMBO_TITLE_CH||['KENKO','NETO'],ki=CH.findIndex(c=>c&&c.name===n[0]),ni=CH.findIndex(c=>c&&c.name===n[1]);if(ki<0||ni<0)return sm0(k);
   const o=window.__DUELO||['win','lose','draw'][Math.floor(Math.random()*3)],dc=!!F().duelcap,m=o==='win'?1.5:dc?1:o==='lose'?.67:1,keep=TW.map(r=>r.slice());PEND={o,ki,ni};
   /* duelcap (own flag, sumduel was already released): the duel result sets the highest rarity of that summon. Lose: R only. Draw: SR and lower. Win: SSR and lower, with the usual chance of UR on ticket banners (the 1.5 boost stays). Every pull of the summon follows it, so a x10 can hold several of the top rarity and anything lower. */
   const cap=dc?(o==='lose'?0:o==='draw'?1:3):3;window.COMBO_DCAP=cap;try{TW.forEach(r=>{for(let j=1;j<r.length;j++)r[j]=j>cap?0:r[j]*m});return sm0(k)}finally{TW.forEach((r,a)=>{for(let j=0;j<r.length;j++)r[j]=keep[a][j]});PEND=null;window.COMBO_DCAP=3}};
 /* while a cap is set: rate-up picks only use fighters at or under the cap (the whole pool when a banner has none), and the guaranteed-new pull is skipped */
 {const pf0=pickFrom;pickFrom=function(list,tk){const cap=window.COMBO_DCAP;if(cap==null||cap>=3)return pf0(list,tk);let l=list.filter(i=>CH[i].rar<=cap);if(!l.length)l=pools()[tk?1:0].filter(i=>CH[i].rar<=cap);return pf0(l.length?l:list,tk)};
  const pc0=pull;pull=function(){const cap=window.COMBO_DCAP;if(cap==null||cap>=3)return pc0();const p=SV.pity|0;SV.pity=-1e6;try{return pc0()}finally{SV.pity=p+1}}}
 const say=(M,f,key)=>{try{if(D2()&&window.COMBO_DUELV)COMBO_DUELV(f.c.name,key)}catch(e){}};
 const up=f=>{if(D2()){f.state='pose';f.pz=RAISE;f.st=0;f.y=0;f.vx=f.vy=0;f.mv=null}else{f.state='win';f.st=0;f.y=0;f.pz=null}f.inv=9};
 const tier=M=>Math.floor(Math.random()*(M.rar+1));
 const ss0=startSummon;startSummon=function(list){const P=PEND;if(!P||!ON())return ss0(list);netClose();G.rules={type:'summon',ret:'gacha'};G.me=0;const K=mkF(P.ki,-330,1,true),N=mkF(P.ni,330,-1,true);K.side=0;N.side=1;
   G.tm=[{list:[K],i:0,sw:99,as:99,koT:null,an:0},{list:[N],i:0,sw:99,as:99,koT:null,an:0}];G.f=[K,N];G.as=[];G.proj=[];G.fx=[];G.cine=null;G.intro=null;G.hitstop=0;G.slow=1;G.msg=null;G.stg=rnd(STAGES.length)|0;G.cd=2;
   G.sm={duel:1,o:P.o,ph:10,t:0,st:0,k:0,list,rar:Math.max.apply(null,list.map(q=>CH[q.ci].rar)),aura:[],said:{},K,N};G.mode='summon';G.mt=0;G.focus=0;cam.x=0;cam.y=-70;cam.z=1.05;cam.rot=0;sfx('ult')};
 const go=(M,ph)=>{M.ph=ph;M.st=0};
 const still=f=>{f.inp.mx=0;f.inp.guard=false;f.inp.buf={}};
 const smoke=(x,n)=>{for(let j=0;j<n;j++)addP({x:x+rnd(-70,70),y:-rnd(0,150),vx:rnd(-90,90),vy:-rnd(20,160),life:rnd(.7,1.4),size:rnd(18,44),col:Math.random()<.5?'#cfc8dc':'#8f879f',shape:'c'})};
 function finish(){const M=G.sm;if(!M||!M.duel||M.ph!==13)return;const K=M.K,N=M.N;G.slow=1;K.state='idle';N.state='idle';K.pz=null;N.pz=null;
   if(M.o==='draw'){go(M,17);const mid=(K.x+N.x)/2;K.x=mid-38;N.x=mid+38;K.face=1;N.face=-1;K.state='pose';K.pz=L1B;N.state='pose';N.pz=L1B;spark(mid,-84,'#fff',true);shake(20);G.flash=.4;sfx('hit');say(M,K,'d'+tier(M));return}
   go(M,14);N.hp=M.o==='win'?1:N.mhp;N.inv=M.o==='lose'?9:0;K.inv=0;K.meter=100;faceO(K,N);say(M,K,'ult');try{startUlt(K,N)}catch(e){go(M,15);M.hitx=N.x;M.loser=N;M.winner=K}}
 const st0=stepSummon;stepSummon=function(rdt){const M=G.sm;if(!M||!M.duel)return st0(rdt);const K=M.K,N=M.N;M.t+=rdt;M.st+=rdt;const col=RC[M.rar];let c={x:(K.x+N.x)/2,y:-70,z:1.1,rot:0},kk=Math.min(1,rdt*6);
   if(M.ph===10){still(K);still(N);K.face=1;N.face=-1;if(D2()){if(M.st<.1)kk=1;K.hide=true;M.ots=K;M.front=N;if(M.st>.05&&!M.said.a){M.said.a=1;say(M,K,'face')}if(M.st>=(F().jpvoice&&SV.set.vlang===1?2.5:1.9)&&!M.said.b){M.said.b=1;say(M,N,'face')}
      c={x:N.x-58,y:-104,z:lerp(2.1,2.3,M.st/3),rot:-.015};if(M.st>=3){K.hide=false;M.ots=null;M.front=null;go(M,11);kk=1}}
     else{if(M.st>.25&&!M.said.a){M.said.a=1;say(M,K,'face')}if(M.st>1.15&&!M.said.b){M.said.b=1;say(M,N,'face')}c={x:0,y:-74,z:lerp(1.02,1.16,M.st/2),rot:0};if(M.st>=2)go(M,11)}}
   else if(M.ph===11){K.inp.mx=1;N.inp.mx=-1;K.inp.guard=N.inp.guard=false;c.z=1.12;if(Math.abs(N.x-K.x)<130||M.st>2.2)go(M,12)}
   else if(M.ph===12){try{ai(K,N,rdt);ai(N,K,rdt)}catch(e){}K.hp=K.hpLag=K.mhp;N.hp=N.hpLag=N.mhp;K.meter=0;N.meter=0;const kinds=['wide','low','orbit','wide','front','pull'],kd=kinds[Math.floor(M.st/1.2)%kinds.length],k2=(M.st%1.2)/1.2;
     try{c=kd==='wide'?{x:(K.x+N.x)/2,y:-60,z:lerp(1.05,1.2,k2),rot:Math.sin(M.t*.7)*.04}:shotCam({kind:kd,who:kd==='front'?N:K},k2)}catch(e){}if(M.st>=6){go(M,13);M.set=0}}
   else if(M.ph===13){still(K);still(N);if(!M.set&&(M.st>.5||(K.state==='idle'&&N.state==='idle'))){M.set=1;G.proj=[];G.as=[];K.mv=null;N.mv=null;K.y=N.y=0;K.vx=K.vy=N.vx=N.vy=0;const mid=clamp((K.x+N.x)/2,-560,560);K.x=mid-70;N.x=mid+70;K.face=1;N.face=-1;K.state='pose';K.pz=L1A;N.state='pose';N.pz=IDLES[3];K.hide=N.hide=false;sfx('dash')}
     if(M.set)G.slow=.03;c={x:(K.x+N.x)/2+Math.sin(M.st*.8)*40,y:-88,z:M.set?1.7+Math.sin(M.st*.6)*.12:1.2,rot:Math.sin(M.st*.5)*.05};kk=1;if(M.set&&M.st>6)finish()}
   else if(M.ph===14){still(K);still(N);if(M.o==='lose'&&M.st>.2&&!M.said.dg){M.said.dg=1;ghost(N,N.c.col,.5);N.x=clamp(K.x-K.face*190,-700,700);N.y=0;N.vx=N.vy=0;faceO(N,K);N.inv=9;sfx('dash');say(M,N,'dodge')}
     c={x:(K.x+N.x)/2,y:-80,z:1.25,rot:0};const done=M.st>.6&&!G.cine&&!K.mv;
     if(done||M.st>6){if(M.o==='win'){M.loser=N;M.winner=K;M.hitx=N.x;go(M,15)}else go(M,16)}}
   else if(M.ph===16){still(K);still(N);if(!M.said.fin){M.said.fin=1;faceO(N,K);N.x=clamp(K.x-N.face*64,-700,700);N.state='pose';N.pz=L1B;K.inv=0;K.state='idle';K.hp=1;try{applyHit(N,K,{d:9999,kx:980,ky:-520,l:1,big:1,fin:1,hs:.24},N.x,N.face)}catch(e){}shake(22);G.flash=.5}
     c={x:(K.x+N.x)/2,y:-76,z:1.2,rot:N.face*.04};if(M.st>.95){N.state='idle';N.pz=null;M.loser=K;M.winner=N;M.hitx=K.x;go(M,15)}}
   else if(M.ph===15){still(K);still(N);const L=M.loser;M.hitx=L.x;if(Math.random()<.9)smoke(L.x,3);if(M.st>.55)L.hide=true;c={x:L.x,y:-80,z:1.3,rot:0};
     if(M.st>1.35){const Wn=M.winner;M.aura=[Wn];up(Wn);sfx('ult');G.flash=.7;shake(22);say(M,Wn,(M.o==='win'?'w':'l')+tier(M));go(M,3)}}
   else if(M.ph===17){still(K);still(N);if(M.st>.45&&!M.said.rc){M.said.rc=1;K.state='idle';N.state='idle';K.pz=N.pz=null;K.vx=-260;N.vx=260;say(M,N,'d'+tier(M))}
     if(M.st>.9){K.face=-1;N.face=1;K.inp.mx=-1;N.inp.mx=1}c={x:(K.x+N.x)/2,y:-72,z:lerp(1.3,1.02,clamp(M.st/2.2,0,1)),rot:0};
     if(M.st>2.3){still(K);still(N);K.vx=N.vx=0;M.aura=[K,N];[K,N].forEach(up);sfx('ult');G.flash=.7;shake(22);go(M,3)}}
   else if(M.ph===3){still(K);still(N);G.slow=1;M.aura.forEach(f=>{if(Math.random()<.8)addP({x:f.x+rnd(-70,70),y:-rnd(0,40),vx:rnd(-40,40),vy:-rnd(300,900),life:rnd(.4,.9),size:rnd(4,10),col:Math.random()<.4?'#fff':col,shape:Math.random()<.5?'d':'c'});
       if(Math.floor(M.st*5)!==Math.floor((M.st-rdt)*5))G.fx.push({type:'ring',t:0,life:.5,x:f.x,y:-60,r0:30,r1:260+M.rar*90,col,w:8+M.rar*4});if(M.rar>1&&Math.random()<.06){G.fx.push({type:'bolt',t:0,life:.3,x:f.x+rnd(-200,200),col});shake(8)}});
     const e=ease(clamp(M.st/1.2,0,1));c=M.aura.length>1?{x:(K.x+N.x)/2,y:-74,z:lerp(1.25,1.02,e),rot:0}:{x:M.aura[0].x,y:lerp(-110,-80,e),z:lerp(2.2,1.25,e),rot:Math.sin(M.st*1.2)*.03};kk=1;if(M.st>2.8)return endSummon()}
   cam.x=lerp(cam.x,c.x,kk);cam.y=lerp(cam.y,c.y,kk);cam.z=lerp(cam.z,c.z,kk);cam.rot=lerp(cam.rot,c.rot||0,kk);cam.ay=lerp(GY,H*.46,clamp(cam.z-1.1,0,1))};
 const da0=drawAura;drawAura=function(f,col,t){const M=G.sm;if(!M||!M.duel)return da0(f,col,t);M.aura.forEach(q=>da0(q,col,t))};
 const df9=drawFighter;drawFighter=function(f,sil){const M=G.sm;if(!M||!M.duel||M.front!==f||sil||G.mode!=='summon')return df9(f,sil);g.save();try{g.translate(f.x,f.y);const sc=f.sc||f.c.sc||1;g.scale(sc,sc);drawFrontChar(f.c,{t:f.at,expr:'',sway:f.sway})}catch(e){}g.restore()};
 const ui0=drawSummonUI;drawSummonUI=function(){const M=G.sm;if(!M||!M.duel)return ui0();G.ui=[];if(M.ots&&M.ph===10){try{drawBack(M.ots,clamp(M.st/3,0,1))}catch(e){}}g.fillStyle='#05020c';g.fillRect(0,0,W,H*.08);g.fillRect(0,H-H*.08,W,H*.08);
   if(M.ph===13&&M.set){const p=1+Math.sin(G.t*8)*.05,bw=Math.min(280,W*.5)*p,bh=66*p;button(W/2-bw/2,H*(H>W?.66:.7)-bh/2,bw,bh,'FINISH!','#d0282f',finish,40);G.focus=0}
   else if(M.ph>=10&&M.ph<=12)txt('SUMMONING'+'...'.slice(0,1+Math.floor(G.t*3)%3),W/2,H*.08+22,18,'#fff',INK,'center',FB,5);
   if(M.ph===3){const s=1+Math.max(0,.3-M.st)*5;g.save();g.translate(W/2,H*.26);g.scale(s,s);g.rotate(-.04);txt(RN[M.rar],0,0,Math.min(130,W*.2),RC[M.rar],'#fff','center',FB,18);txt(RN[M.rar],0,0,Math.min(130,W*.2),RC[M.rar],INK,'center',FB,9);g.restore()}
   if(M.ph!==14&&M.ph!==16){const q=skipRect();button(q.x,q.y,q.w,q.h,'SKIP  »','rgba(10,4,24,.78)',endSummon,20)}}}
/* combotap (needs combosay): the two start screen fighters shout COMBO when the player taps start, once per visit to the start screen. This wrapper is the outermost goto so it runs on the tap itself, before CONNECTING or a download. */
{let shot=false;const gs0=goto;goto=function(m){try{if(F().combotap&&m==='menu'&&G.mode==='title'&&!shot){shot=true;if(window.COMBO_SHOUT)COMBO_SHOUT()}}catch(e){}return gs0(m)};
 const us0=update;update=function(rdt){us0(rdt);if(shot&&G.mode!=='title')shot=false}}
/* nopity: removes the guaranteed new fighter (before: every 5th summon without a new fighter gave one the player did not own, ignoring rarity odds). Every pull now uses the normal odds.
   The counter SV.pity is left as it was, so pulling this update back restores the old rule. The gacha info line about the guarantee is removed (the lines under it move up). */
{const OLD='Every 5th summon without a new fighter guarantees a new one.',AFTER=['Duplicates add','Each fighter unlocks','Banners change'];
 const pl0=pull;pull=function(){if(!F().nopity)return pl0();const p=SV.pity;SV.pity=-1e9;try{return pl0()}finally{SV.pity=p}};
 const ga0=SCR.gacha;if(ga0)SCR.gacha=function(){if(!F().nopity)return ga0();const t0=txt;let cut=false;txt=function(s){if(s===OLD){cut=true;return}if(cut&&typeof s==='string'&&AFTER.some(q=>s.indexOf(q)===0))arguments[2]-=18;return t0.apply(this,arguments)};try{return ga0()}finally{txt=t0}}}
/* feat5: every banner gives its rate-up fighters the same chance, so no banner makes more duplicates than another (before: half of all gem pulls and 1 in 5 ticket pulls were a rate-up fighter,
   which on a one-fighter banner meant that one fighter half the time). Now 5 pulls in 100 are a rate-up fighter on every banner, gems and tickets, whatever the number of rate-up fighters;
   the other 95 use the banner's normal rarity odds. pull() decides rate-up with its first random number, so that one number is replaced for the call.
   The guaranteed-new pull (when nopity is off) is left alone. The two on-screen sentences about the rate-up chance are reworded. */
{const P5=.05,pl5=pull;pull=function(){if(!F().feat5)return pl5();let B=null,pity=false;try{const BS=actBans();B=BS[G.ban||0]||BS[0];const tk=G.gtab===1;pity=!F().nopity&&SV.pity+1>=5&&pools()[tk?1:0].some(i=>!SV.owned[CH[i].name])}catch(e){}
   if(!B||!B.f||!B.f.length||pity)return pl5();const r0=Math.random;let first=true;Math.random=function(){if(first){first=false;return r0()<P5?0:.999}return r0()};try{return pl5()}finally{Math.random=r0}};
 const gb0=SCR.gacha;if(gb0)SCR.gacha=function(){if(!F().feat5)return gb0();const t0=txt;txt=function(s){if(typeof s==='string'){if(s.indexOf('RATE UP: ')===0)arguments[0]=s.replace('1 in 5 summons','5 in 100 summons').replace('half of all summons','5 in 100 summons');
     else if(s.indexOf(' here are ')>0&&s.indexOf('rate-up fighter')>0)arguments[0]=s.replace('1 in 5 summons','5 in 100 summons').replace('Half of all summons','5 in 100 summons')}return t0.apply(this,arguments)};try{return gb0()}finally{txt=t0}}}
/* ===== Own moves and motion for every fighter. Each part has its own flag; all choices come from a hash of the fighter's name, so a fighter always moves the same way. =====
   lowatk : attacks while crouched. Light = a low attack, heavy = a low heavy. Three kinds of each, one pair per fighter (low kick / low jab / low double palm; sweep / rising uppercut / slide kick).
   nmoves : the four-hit light chain and the heavy attack use different animations per fighter (jab, cross, kick, elbow, knee, hook, side kick; finisher slam, axe kick, hook or side kick; heavy uppercut, knee, hook or high kick).
            Timing, damage, reach and knockback are NOT changed, only the poses.
   airblk : five jump styles (default, tuck, front flip, arms up, scissor) and five block styles (default, crossed arms, one forearm, low brace, side turn).
   idle2  : six standing stances and a living idle: weight shifting, looking around every few seconds, and a small gesture now and then (shoulder roll, bounce, neck crack, weapon-arm flourish). Not used in story cutscenes. */
{const hs=n=>{let x=2166136261;n=String(n);for(let i=0;i<n.length;i++){x^=n.charCodeAt(i);x=Math.imul(x,16777619)}return x>>>0},HC=new Map(),H=c=>{let v=HC.get(c.name);if(v==null){v=hs(c.name+'~mv');HC.set(c.name,v)}return v};
 const ELB=[[-10,0,-60,120,-20,60,20,-26,-22,-12,0,0],[24,-4,70,110,-40,70,34,-34,-30,-8,0,0]],KNE=[[-6,0,20,80,-30,70,30,-60,-14,-10,0,0],[-14,4,-20,70,40,70,100,-100,-8,-16,0,0]],
  HOK=[[-20,0,-70,60,-10,60,22,-28,-22,-12,0,0],[28,-8,110,-60,-50,70,38,-38,-30,-8,0,0]],SDK=[[-12,0,20,80,-20,70,50,-110,-12,-10,0,0],[-26,8,-40,60,40,60,112,0,-10,-18,0,0]],
  AXE=[[-14,-4,10,80,-20,70,150,-10,-12,-10,0,0],[10,2,-30,60,30,65,70,-4,-10,-16,0,0]],HIK=[[-10,0,10,80,-20,70,40,-90,-12,-10,0,0],[-30,10,-40,50,40,60,150,-10,-10,-20,0,0]];
 const P1=[[L1A,L1B],[L2A,L2B],[L3A,L3B],ELB,KNE,HOK,SDK],P4=[[L4A,L4B],AXE,HOK,SDK,[L4A,L4B]],PH=[[HA,HB],KNE,HOK,HIK,[HA,HB]];
 /* nmoves */
 try{window.COMBO_NMV=(c,b)=>{if(c._nb===b&&c._nv)return c._nv;const h=H(c),ix=[0,1,2,3,4,5,6];let x=h;for(let k=6;k>0;k--){x=(Math.imul(x,1103515245)+12345)>>>0;const j=x%(k+1),t=ix[k];ix[k]=ix[j];ix[j]=t}
   const pk=[P1[ix[0]],P1[ix[1]],P1[ix[2]],P4[(h>>>7)%P4.length]],L=b.L.map((m,i)=>m.pose?m:Object.assign({},m,{pa:pk[i][0],pb:pk[i][1]})),hp=PH[(h>>>11)%PH.length],Hv=b.H.pose?b.H:Object.assign({},b.H,{pa:hp[0],pb:hp[1]});
   c._nb=b;c._nv={L,H:Hv,AL:b.AL,AH:b.AH,S:b.S,U:b.U};return c._nv}}catch(e){}
 /* lowatk */
 const LO=c=>{if(c._lo)return c._lo;const h=H(c),r=c.range||0,CR=CROUCH,
   LP=[[[14,-6,25,55,-25,60,40,-120,10,-95,0,0],[22,-2,30,60,-45,70,86,-6,8,-100,0,0]],[[20,-6,-20,110,-25,60,58,-105,10,-95,0,0],[30,-8,70,10,-45,70,58,-105,10,-95,0,0]],[[18,-4,-30,100,-40,100,58,-105,10,-95,0,0],[34,-10,75,5,65,10,58,-105,10,-95,0,0]]][(h>>>3)%3],
   hk=(h>>>5)%3,L={k:'CL',low:1,dur:.26,can:.1,pa:LP[0],pb:LP[1],adv:120,sw:1,hits:[{t0:.07,t1:.14,x:0,y:-58,w:70+r,h:58,d:24,kx:130,ky:0,st:.34,hs:.05}]},
   Hm=hk===0?{k:'CH',low:1,dur:.46,can:.22,pa:[24,-2,40,40,-50,60,30,-110,14,-100,0,0],pb:[34,6,60,20,-70,40,95,2,-6,-112,0,4],adv:150,sw:3,hits:[{t0:.13,t1:.22,x:0,y:-52,w:96+r,h:52,d:46,kx:160,ky:-480,l:1,hs:.1,big:1}]}
     :hk===1?{k:'CH',low:1,dur:.46,can:.2,pa:CR,pb:HB,adv:180,sw:5,hits:[{t0:.12,t1:.21,x:-5,y:-190,w:76+r,h:190,d:46,kx:40,ky:-880,l:1,hs:.1,big:1}]}
     :{k:'CH',low:1,dur:.5,can:.3,pa:[30,0,20,60,-30,60,70,-60,20,-90,0,6],pb:[-30,14,-40,40,-60,30,88,2,60,-30,0,18],adv:520,sw:3,hits:[{t0:.1,t1:.3,x:0,y:-50,w:90+r,h:50,d:46,kx:220,ky:-420,l:1,hs:.09,big:1}]};
   return c._lo={L,H:Hm}};
 const ta0=tryAct;tryAct=function(f,o,mode){try{if(F().lowatk&&mode===0&&f&&f.state==='crouch'&&f.y>=0&&f.c){const b=f.inp.buf;if(!(b.ult>0&&f.meter>=100)&&!(b.s1>0&&f.cd[0]<=0)&&!(b.s2>0&&f.cd[1]<=0)){
     if(b.heavy>0){b.heavy=0;f.chain=0;startMove(f,LO(f.c).H,o);return 1}if(b.light>0){b.light=0;f.chain=0;startMove(f,LO(f.c).L,o);return 1}}}}catch(e){}return ta0(f,o,mode)};
 const mi0=mvId;mvId=function(f){const m=f&&f.mv;if(m&&m.low)return m.k;return mi0(f)};const mo0=mvOf;mvOf=function(f,id){if(id==='CL'||id==='CH'){const q=LO(f.c);return id==='CL'?q.L:q.H}return mo0(f,id)};
 /* airblk + idle2 */
 const JV=[null,[10,6,20,100,10,100,95,-125,80,-120,0,0],null,[-8,-10,-160,-10,-150,-10,30,-50,-20,-40,0,0],[-4,-8,-30,40,40,50,80,-20,-60,-30,0,0]],FV=[null,null,null,[20,10,-150,-10,-160,-10,20,-30,-30,-50,0,0],null],
  GV=[null,[-4,4,95,150,80,150,20,-30,-25,-14,0,0],[-12,2,40,135,-30,60,24,-34,-28,-12,0,0],[10,2,70,110,55,118,46,-80,-4,-70,0,5],[-18,10,72,96,18,122,8,-18,-32,-22,0,0]];
 const po0=poseOf;poseOf=function(f){const p=po0(f);try{if(!f||!f.c||!p)return p;const fl=F(),st=f.state;
   if(st==='air'&&fl.airblk){const v=H(f.c)%5,J=JV[v]||JUMP,Fa=FV[v]||FALL;let q=f.vy<0?J.slice():lp(J,Fa,clamp(f.vy/500,0,1));if(v===2&&f.vy<120){const k=clamp((f.vy+900)/1020,0,1);q=lp([14,8,30,95,20,95,90,-120,78,-116,0,0],q,k*k*k);q[10]=-360*ease(k)}return q}
   if(st==='guard'&&fl.airblk){const v=(H(f.c)>>>4)%5;return GV[v]||p}
   if(st==='idle'&&fl.idle2&&G.mode!=='scene'&&!(G.intro&&G.intro.sp===f)){const h=H(f.c),q=p.slice(),t=f.at+(h%977)/97,sv=(h>>>8)%6;
     if(sv===1){q[0]+=6;q[6]+=12;q[8]-=12;q[7]-=14;q[9]-=10;q[11]+=5}else if(sv===2){q[0]-=6;q[2]-=15;q[3]-=20;q[4]+=10}else if(sv===3){q[0]-=9;q[1]+=5;q[2]+=24;q[3]-=28}
     else if(sv===4){q[6]-=6;q[8]+=6;q[11]-=Math.abs(Math.sin(t*5.2))*3.5;q[2]+=10;q[4]-=10}else if(sv===5){q[2]=lerp(q[2],40,.7);q[3]=lerp(q[3],118,.7);q[4]=lerp(q[4],20,.7);q[5]=lerp(q[5],122,.7)}
     const ws=.5+((h>>>12)%5)*.1,s=Math.sin(t*ws*TAU*.5);q[0]+=s*2.4;q[6]+=s*3;q[8]+=s*3;q[11]+=Math.abs(s)*1.6;
     const LT=5+((h>>>16)%5),lk=t%LT;if(lk<1.5){const e=Math.sin(lk/1.5*Math.PI);q[1]+=e*(((h>>>20)&1)?15:-13);q[0]+=e*2}
     const GT=8+((h>>>21)%6),gk=(t+3.1)%GT;if(gk<1.1){const e=Math.sin(gk/1.1*Math.PI),g2=Math.sin(gk/1.1*Math.PI*2),gv=(h>>>24)%4;
       if(gv===0){q[2]-=e*22;q[4]+=e*22;q[0]-=e*3}else if(gv===1){q[11]-=Math.abs(g2)*7;q[7]-=Math.abs(g2)*10;q[9]-=Math.abs(g2)*10}else if(gv===2){q[1]+=g2*16}else{q[2]+=e*58;q[3]-=e*36;q[1]-=e*4}}
     return q}}catch(e){}return p}}
/* clashots: after the clash that follows a knockout in a match, the two lines are spoken in one over-the-shoulder shot like the cutscenes: the player's fighter large in front with their back to us,
   the other fighter beyond them facing the camera. Whoever's line it is still speaks it (and their voice clip still plays). Then the match goes on as before. */
{const so0=startClash;startClash=function(nf,op){so0(nf,op);try{if(!F().clashots)return;const I=G.intro;if(!I||!I.mid)return;const me=G.f[G.me|0],ot=G.f[1-(G.me|0)];if(!me||!ot||me===ot)return;I.sh.forEach(q=>{if(q.kind==='cf'&&q.line){q.kind='ots2';q.ots=me;q.cam=ot}})}catch(e){}};
 const sc0=shotCam;shotCam=function(s,k){if(s&&s.kind==='ots2'&&s.cam&&s.ots){const f=s.cam;return{x:f.x-s.ots.face*58,y:-104*(f.c.sc||1),z:lerp(2.1,2.3,k),rot:-s.ots.face*.015}}return sc0(s,k)};
 const cur=()=>{const I=G.intro;if(!I||G.mode!=='intro')return null;const q=I.sh[I.i];return q&&q.kind==='ots2'?q:null};
 const do0=drawOTS;drawOTS=function(f,k){if(cur()){try{return drawBack(f,k)}catch(e){}}return do0(f,k)};
 const df0=drawFighter;drawFighter=function(f,sil){const q=cur();if(!q||sil||!f)return df0(f,sil);if(f===q.ots)return;if(f!==q.cam)return df0(f,sil);
   g.save();try{g.translate(f.x,f.y);const sc=f.sc||f.c.sc||1;g.scale(sc,sc);drawFrontChar(f.c,{t:f.at,expr:G.intro&&G.intro.sp===f?exprOf(f):'',sway:f.sway,dmg:f.mhp?1-f.hp/f.mhp:0})}catch(e){}g.restore()}}
/* goldcos: profile icons, banners and icon borders come from gold (yellow) tickets only.
   - One time per save, everyone's icons, banners and borders are reset to the starting set (the old collection is kept in SV.cos0 and comes back if this update is pulled back).
   - Summons no longer give icons, banners or borders.
   - The EXCHANGE tab is named GOLD. Its list has four gold banners to summon on with gold tickets: ICONS 5, BANNERS 10, BORDERS 15 (prices chosen by Trey) and ALL 10 (a random kind; price picked by Claude), each ×1 or ×10,
     and each summon gives a random one the player does not own yet. The old EXP exchange is the fifth entry, EXP SHOP. */
/* goldmix (own flag, goldcos was already released): the four gold banners all give a mix: half of the summons give EXP items, the other half a random banner or border. 5 gold tickets each (Trey).
   Icons are not in the gold banners: every fighter gives its icon again when summoned, and owned fighters' icons are given back (Trey: "for icon they come out with the character").
   Each banner has its own top 4 (Trey: "different top 4 each"); 1 in 5 of its non-EXP summons is one of them (share picked by Claude). EXP summon = SMALL EXP x10 or BIG EXP x2 (picked by Claude). The EXP exchange shop is removed. */
{const ON=()=>!!F().goldcos,MIX=()=>!!F().goldmix,MK=[['m0','GOLD 1','#2f4f8f'],['m1','GOLD 2','#2f7a5f'],['m2','GOLD 3','#b8782f'],['m3','GOLD 4','#8a3fb8']].map(q=>q.concat(['Banners, borders and EXP'])),COST={icon:5,banner:10,border:15,all:10},D0={icons:[0,1,2],banners:[0,1,2],borders:[0]};
 const sync=()=>{if(!window.LIVE_READY)return;try{if(ON()){if(!SV.cosr){SV.cos0={icons:(SV.icons||[]).slice(),banners:(SV.banners||[]).slice(),borders:(SV.borders||[]).slice(),icon:SV.icon|0,banner:SV.banner|0,border:SV.border|0};SV.icons=D0.icons.slice();SV.banners=(SV.bnr?[0]:D0.banners).slice();SV.borders=D0.borders.slice();
      if(!SV.icons.includes(SV.icon))SV.icon=0;if(!SV.banners.includes(SV.banner))SV.banner=0;if(!SV.borders.includes(SV.border))SV.border=0;SV.cosr=1;save()}}
    else if(SV.cosr&&SV.cos0){const b=SV.cos0,un=(a,c)=>Array.from(new Set((a||[]).concat(c||[])));SV.icons=un(b.icons,SV.icons);SV.banners=un(b.banners,SV.banners);SV.borders=un(b.borders,SV.borders);SV.icon=b.icon;SV.banner=b.banner;SV.border=b.border;delete SV.cosr;delete SV.cos0;save()}}catch(e){}};
 /* goldmix: every fighter the player owns gives its icon again */
 const icsync=()=>{try{if(!ON()||!MIX()||!window.LIVE_READY)return;const have=new Set(SV.icons);let ch=0;CH.forEach((c,i)=>{if(SV.owned[c.name]&&!have.has(i)){SV.icons.push(i);ch=1}});if(ch)save()}catch(e){}};
 const ug0=update;let tk=0;update=function(rdt){ug0(rdt);tk+=rdt;if(tk>1){tk=0;sync();icsync()}};
 const pg0=pull;pull=function(){if(!ON())return pg0();const a=SV.icons.length,b=SV.banners.length,c=SV.borders.length,mx=MIX(),r=pg0();try{if(mx){SV.banners.length=Math.min(SV.banners.length,b);SV.borders.length=Math.min(SV.borders.length,c);if(r){delete r.ban;delete r.bd}return r}SV.icons.length=Math.min(SV.icons.length,a);SV.banners.length=Math.min(SV.banners.length,b);SV.borders.length=Math.min(SV.borders.length,c);if(r){delete r.icon;delete r.ban;delete r.bd}}catch(e){}return r};
 /* GOLD tab: four gold banners in the list (ICONS, BANNERS, BORDERS, ALL) plus the EXP shop that was there before. Summon on a banner with gold tickets. */
 const KINDS=[['icon','ICONS','#2f4f8f','Profile icons'],['banner','BANNERS','#2f7a5f','Profile banners'],['border','BORDERS','#b8782f','Icon borders'],['all','ALL','#8a3fb8','Icons, banners and borders']];
 const left=k=>k==='icon'?CH.map((c,i)=>i).filter(i=>!SV.icons.includes(i)):k==='banner'?(()=>{const hb=new Set(SV.banners);return(window.COMBO_BAN_NAME&&window.COMBO_BAN_NAME(0)?window.COMBO_BN50.map((q,i)=>i):pools()[1]).filter(i=>!hb.has(i))})():BD.map((q,i)=>i).filter(i=>!SV.borders.includes(i));
 const mtop=b=>{const B=topOf('banner'),D=topOf('border'),T=[];for(let j=0;j<8;j++)[B,D].forEach(q=>{if(q[j])T.push(q[j])});const out=[];for(let j=0;j<4;j++)if(T[b+4*j])out.push(T[b+4*j]);return out};
 const give=it=>{(it.kind==='icon'?SV.icons:it.kind==='banner'?SV.banners:SV.borders).push(it.id);return it};
 const mone=b=>{const ks=['banner','border'].filter(q=>left(q).length);if(Math.random()<.5||!ks.length){const big=Math.random()<.5,n=big?2:10;SV.items=SV.items||{};SV.items[big?'b':'s']=(SV.items[big?'b':'s']|0)+n;return{kind:'exp',id:big?'b':'s',n}}
   const tp=mtop(b);if(tp.length&&Math.random()<.2)return give(tp[Math.floor(Math.random()*tp.length)]);return one(ks[Math.floor(Math.random()*ks.length)])};
 const one=kind=>{if(kind.charAt(0)==='m'&&kind.length===2)return mone(+kind.charAt(1));let k=kind;if(k==='all'){const ks=['icon','banner','border'].filter(q=>left(q).length);if(!ks.length)return null;k=ks[Math.floor(Math.random()*ks.length)]}const pool=left(k);if(!pool.length)return null;const id=pool[Math.floor(Math.random()*pool.length)];(k==='icon'?SV.icons:k==='banner'?SV.banners:SV.borders).push(id);return{kind:k,id}};
 const buy=(kind,n)=>{const c1=COST[kind]||5,cost=c1*n;if((SV.ytx||0)<cost){G.gmsg={t:'Not enough gold tickets. You need '+cost,e:G.t+2.4};return}const got=[];for(let i=0;i<n;i++){const r=one(kind);if(!r)break;got.push(r)}
   if(!got.length){G.gmsg={t:'You already own all of these',e:G.t+2.2};return}SV.ytx-=c1*got.length;save();sfx('ult');G.csr={list:got,t:G.t}};
 /* The banner picture shows only its top 4 items the player does not own (highest rarity fighters first, last borders first), one picture at a time, and moves to the next every 4 seconds. */
 const topOf=k=>{const p=left(k).slice();if(k==='border'||(k==='banner'&&window.COMBO_BAN_NAME&&window.COMBO_BAN_NAME(0)))p.sort((u,v)=>v-u);else p.sort((u,v)=>(CH[v].rar-CH[u].rar)||(u-v));return p.map(id=>({kind:k,id}))};
 const sample=kind=>{if(kind.charAt(0)==='m'&&kind.length===2)return mtop(+kind.charAt(1));if(kind!=='all')return topOf(kind).slice(0,4);const I=topOf('icon'),B=topOf('banner'),D=topOf('border'),out=[];for(let j=0;out.length<4&&j<4;j++)[I,B,D].forEach(q=>{if(q[j]&&out.length<4)out.push(q[j])});return out};
 const art=(it,x,y,sz)=>{if(it.kind==='exp'){const big=it.id==='b';rr(x,y,sz,sz,sz*.16);const gr=g.createLinearGradient(x,y,x,y+sz);gr.addColorStop(0,big?'#b06bff':'#3fa9ff');gr.addColorStop(1,big?'#4a1f7a':'#1f3f7a');g.fillStyle=gr;g.fill();g.strokeStyle='#fff';g.lineWidth=2;g.stroke();txt('EXP',x+sz/2,y+sz*.42,sz*.3,'#fff',INK,'center',FB,4);txt('×'+it.n,x+sz/2,y+sz*.74,sz*.24,'#ffe14d',INK,'center',FB,4);return(big?'BIG':'SMALL')+' EXP ×'+it.n}if(it.kind==='icon'){drawIcon(CH[it.id],x,y,sz,null,1);return CH[it.id].name}if(it.kind==='banner'){g.save();rr(x,y,sz,sz,sz*.16);g.clip();banBG(it.id,x,y,sz,sz);g.restore();rr(x,y,sz,sz,sz*.16);g.strokeStyle='#fff';g.lineWidth=2;g.stroke();return(window.COMBO_BAN_NAME&&window.COMBO_BAN_NAME(it.id))||String((CH[it.id]||CH[0]).wn||'').toUpperCase()}
   drawIcon(CH[SV.icon|0],x,y,sz,it.id,1);return BD[it.id][0]};
 const HIDE=['TICKET EXCHANGE','Fighters go up to level','Small EXP ×','Big EXP ×','Use EXP items','hold a fighter'],HIDEL=['Yellow tickets:','Casual or Ranked','5 for every Boss Raid'];
 const gg0=SCR.gacha;if(gg0)SCR.gacha=function(){if(!ON()){G.csr=null;return gg0()}const b0=button,t0=txt,ti0=tixIcon,mix=MIX(),KS=mix?MK:KINDS,gold=G.gtab===2,sel=clamp(G.gsel|0,0,mix?3:4),shop=!mix&&sel===4;let X=null,cut=false;
   button=function(x,y,w,h,l){if(l==='EXCHANGE')arguments[4]='GOLD';else if(gold&&typeof l==='string'&&(l.indexOf('SMALL EXP')===0||l.indexOf('BIG EXP')===0)){if(!X)X={x,y,w};if(!shop)return false}if(typeof arguments[8]==='string')arguments[8]=arguments[8].replace('yellow ticket','gold ticket');return b0.apply(this,arguments)};
   txt=function(s){if(typeof s==='string'){if(s.indexOf('Each fighter unlocks their icon')===0){cut=true;return}if(cut&&s.indexOf('Banners change')===0)arguments[2]-=18;
     if(gold){if(HIDEL.some(q=>s.indexOf(q)===0))return;if(s.charAt(0)==='×'&&arguments[3]===30)return;if(!shop&&HIDE.some(q=>s.indexOf(q)===0))return;if(shop&&(s.indexOf('Small EXP ×')===0||s.indexOf('Big EXP ×')===0||s.indexOf('Use EXP items')===0||s.indexOf('hold a fighter')===0))return}}return t0.apply(this,arguments)};
   if(gold)tixIcon=function(x,y,k){if(k===2.2)return;return ti0.apply(this,arguments)};
   try{gg0()}finally{button=b0;txt=t0;tixIcon=ti0}
   if(G.mode!=='gacha')return;try{g.setTransform(S*dpr,0,0,S*dpr,0,0);
    if(gold&&!G.gres){const lw=Math.min(250,W*.3),lx=14,ly=86,bh=Math.min(38,(H-ly-70)/5-5);(mix?KS:KS.concat([['exp','EXP SHOP','#3a2a5e','Level-up items']])).forEach((q,k)=>button(lx,ly+k*(bh+5),lw,bh,q[1],k===sel?q[2]:'#2a1f45',()=>{G.gsel=k},Math.min(20,bh*.5),k<4?(COST[q[0]]||5)+' gold':'gold tickets'));
     const gy=ly+(mix?4:5)*(bh+5)+22;tixIcon(lx+lw/2-46,gy,2,'#ffb020');txt('×'+fmtG(SV.ytx||0),lx+lw/2-16,gy+2,26,'#fff',INK,'left');txt('Gold tickets: win matches and raids',lx+lw/2,gy+30,11,'#e6dcff',null,'center',FU);
     if(!shop&&X){const K=KS[sel],kind=K[0],c1=COST[kind]||5,x=X.x,w=X.w,y=92,h=H-y-74,n=mix?left('banner').length+left('border').length:kind==='all'?left('icon').length+left('banner').length+left('border').length:left(kind).length;g.save();rr(x,y,w,h,14);const gr=g.createLinearGradient(x,y,x+w,y+h);gr.addColorStop(0,K[2]);gr.addColorStop(1,'#1a0f33');g.fillStyle=gr;g.fill();g.strokeStyle='#ffd36e';g.lineWidth=3;g.stroke();g.clip();
       g.globalAlpha=.14;g.fillStyle='#ffd36e';for(let j=0;j<9;j++){const q=x+w*(j/8);g.beginPath();g.moveTo(q-h*.3,y+h);g.lineTo(q+h*.05,y+h);g.lineTo(q+h*.55,y);g.lineTo(q+h*.2,y);g.fill()}g.restore();
       txt('GOLD BANNER: '+K[1],x+w/2,y+26,Math.min(28,w*.055),'#ffe14d',INK,'center',FB,6);txt(K[3]+'   ·   '+fmtG(n)+' left to get',x+w/2,y+52,13,'#fff',INK,'center',FU,3);
       const sm=sample(kind),sz=Math.min(150,h-186),sy=y+82;if(sm.length){const k=Math.floor(Date.now()/4000)%sm.length,it=sm[k],f=((Date.now()%4000)/4000),al=Math.min(1,f*6,(1-f)*6);g.save();g.globalAlpha=al;const nm=art(it,x+w/2-sz/2,sy,sz);g.restore();txt(nm,x+w/2,sy+sz+16,15,'#fff',INK,'center',FB,4);
        sm.forEach((q,j)=>{circ(x+w/2-(sm.length-1)*8+j*16,sy+sz+34,j===k?4.5:3,j===k?'#ffe14d':'rgba(255,255,255,.4)')})}
       txt(mix?'Top '+sm.length+' in this banner. Each summon gives EXP or a random banner or border.':'Top '+sm.length+' in this banner. Each summon gives a random one you do not own.',x+w/2,sy+sz+50,11.5,'#e6dcff',null,'center',FU);
       const by=H-64,bw=(w-12)/2;button(x,by,bw,50,'SUMMON ×1','#b8782f',()=>buy(kind,1),24,c1+' gold');button(x+bw+12,by,bw,50,'SUMMON ×10','#b8324f',()=>buy(kind,10),24,c1*10+' gold');const M=G.gmsg;if(M&&G.t<M.e){const mw=Math.min(w-40,360);rr(x+w/2-mw/2,y+h/2-20,mw,40,12);g.fillStyle='rgba(12,6,28,.94)';g.fill();g.strokeStyle='#ff5a6e';g.lineWidth=2;g.stroke();txt(M.t,x+w/2,y+h/2+1,15,'#fff',null,'center',FB)}}}
    const R=G.csr;if(R&&R.list){G.ui=[];hit(0,0,W,H,()=>{G.csr=null});g.fillStyle='rgba(6,2,18,.9)';g.fillRect(0,0,W,H);const k=clamp((G.t-R.t)/.25,0,1),L=R.list,cx=W/2;g.save();g.globalAlpha=k;
     g.save();g.translate(cx,H*.46);g.rotate(G.t*.3);g.fillStyle='rgba(255,211,110,.2)';for(let j=0;j<12;j++){g.rotate(TAU/12);g.beginPath();g.moveTo(0,0);g.lineTo(-18,-W);g.lineTo(18,-W);g.fill()}g.restore();
     if(L.length===1){const sz=Math.min(150,H*.36)*(1+(1-k)*.4),cy=H*.44,nm=art(L[0],cx-sz/2,cy-sz/2,sz);txt(L[0].kind==='exp'?'EXP':'NEW '+(L[0].kind==='border'?'BORDER':L[0].kind.toUpperCase()),cx,cy-sz/2-34,30,'#ffe14d',INK,'center',FB,7);txt(nm,cx,cy+sz/2+30,24,'#fff',INK,'center',FB,6)}
     else{const cols=5,sz=Math.min(86,(W-80)/cols-14,(H-170)/2-26),gw=cols*(sz+14)-14,x0=cx-gw/2,y0=H*.5-(sz+34);txt('YOU GOT '+L.length,cx,y0-26,28,'#ffe14d',INK,'center',FB,7);L.forEach((it,j)=>{const x=x0+(j%cols)*(sz+14),y=y0+(j/cols|0)*(sz+34),nm=art(it,x,y,sz);txt(nm,x+sz/2,y+sz+11,10,'#fff',INK,'center',FU,3)})}
     txt(L.some(q=>q.kind==='exp')?'Banners and borders: PROFILE.   EXP: TEAMS.   Tap to close.':'Use them in PROFILE.   Tap to close.',cx,H-26,13,'#e6dcff',null,'center',FU);g.restore()}}catch(e){try{g.restore()}catch(x){}}}}
/* border50: the 30 old icon borders are replaced by 50 new anime-style ones (Trey: delete all the old ones, 25 still and 25 animated, all anime-like).
   With the flag on the BD list holds the new 50 and drawBorder draws them; each save's old border collection is kept in SV.bd0 and comes back if the update is pulled back.
   Spec: [name, colour, colour 2, frame, decorations, label]. Frames: line dbl grad manga notch dash ink | march rb spin glitch. Decorations ending in A move. */
{const ON=()=>!!F().border50,OLD=BD.slice();
 const NEW=[['ROOKIE','#ffffff','#9fb4d8','line',[]],
  ['SAKURA','#ff9ec4','#ffd9e8','dbl',['sakura']],['NEKO','#ffb86b','#fff1d6','line',['ears']],['ONI','#ff3d5a','#ffd36e','ink',['horns']],['TENSHI','#fff3b0','#ffffff','dbl',['halo','wings']],
  ['MANGA','#ffffff','#111111','manga',[]],['SHINOBI','#5d6b8a','#c9d6e6','notch',['shuriken']],['KIRA','#ffe14d','#ffffff','grad',['kira']],['SENPAI','#ff7ad1','#ffd9f0','line',['heart'],'SENPAI'],
  ['VICTORY','#ff3d5a','#ffffff','ink',['kanji:勝']],['POWER','#ff7a1f','#ffe14d','grad',['kanji:力']],['SPIRIT','#7fdcff','#b06bff','grad',['kanji:魂']],['DRAGON SEAL','#4fc46a','#ffd36e','notch',['kanji:龍']],
  ['RIBBON','#ff5a8a','#ffffff','dbl',['ribbon']],['MOONLIGHT','#8f7bff','#fff3b0','grad',['moon','star']],['SHRINE','#ff3d2a','#ffffff','dash',['rope']],['SPEED LINES','#ffffff','#3fa9ff','manga',['speed']],
  ['HERO','#3fa9ff','#ffe14d','notch',['star']],['RIVAL','#b8324f','#1a0f33','ink',['bolt']],['KAWAII','#ffc2e2','#bfeeff','grad',['heart','kira'],'KAWAII'],['BAKA','#ffe14d','#ff3d5a','line',['vein'],'BAKA'],
  ['ROYAL','#ffd36e','#8a3fb8','dbl',['crown']],['FOREST','#4fc46a','#c8f7a8','line',['leaf']],['NANI?!','#ffffff','#ff3d5a','manga',['sweat'],'NANI?!'],['OTAKU','#3fd0c0','#ffffff','notch',['kira'],'OTAKU'],
  ['SUPER AURA','#ffe14d','#ff9a1f','line',['auraA']],['DARK AURA','#8a3fb8','#1a0f33','ink',['auraA']],['BLUE FLAME','#3fa9ff','#bfeeff','line',['auraA']],['RAGE MODE','#ff3d2a','#ffb020','line',['auraA','veinA']],
  ['THUNDER GOD','#ffe14d','#ffffff','notch',['boltA']],['STORM','#7fdcff','#ffffff','line',['boltA','speedA']],['SAKURA FALL','#ff9ec4','#ffd9e8','dbl',['petalA']],['AUTUMN','#ff7a1f','#ffd36e','line',['leafA']],
  ['STARLIGHT','#ffffff','#ffe14d','grad',['kiraA']],['MAGICAL GIRL','#ff7ad1','#bfeeff','rb',['kiraA','heartA']],['LOVE LOVE','#ff5a8a','#ffd9e8','dbl',['heartA']],['SPIRIT ORBS','#7fdcff','#b06bff','line',['orbA']],
  ['POWER UP','#ffd36e','#ffffff','line',['ringA']],['LIMIT BREAK','#ff3d5a','#ffe14d','spin',['ringA','speedA']],['CYBER','#3fd0c0','#ff3d9a','glitch',[]],['NEON TOKYO','#ff3d9a','#3fd0c0','march',[]],
  ['COMET','#bfeeff','#3fa9ff','line',['cometA']],['RYU','#4fc46a','#ffd36e','line',['dragonA']],['NINJA STAR','#c9d6e6','#5d6b8a','notch',['shurikenA']],['ANGEL WINGS','#ffffff','#fff3b0','dbl',['wingsA','halo']],
  ['SNOW QUEEN','#bfeeff','#ffffff','grad',['snowA']],['DEEP SEA','#3fa9ff','#bfeeff','grad',['bubbleA']],['FINAL FORM','#ffffff','#ffd36e','rb',['auraA','ringA']],['SUGOI!','#ffe14d','#ff7a1f','march',['kiraA'],'SUGOI!'],
  ['LEGEND','#ffd36e','#ff3d5a','spin',['dragonA','kiraA']]];
 window.COMBO_BD50=NEW;
 const hs=i=>{const v=Math.sin(i*12.9898)*43758.5453;return v-Math.floor(v)};
 const P=(x,y,s,u)=>{u=((u%1)+1)%1*4;const k=u|0,q=u-k;return k===0?[x+s*q,y]:k===1?[x+s,y+s*q]:k===2?[x+s-s*q,y+s]:[x,y+s-s*q]};
 const star4=(cx,cy,r,col)=>{g.beginPath();for(let i=0;i<8;i++){const a=i*TAU/8-TAU/4,q=i%2?r*.28:r;g.lineTo(cx+Math.cos(a)*q,cy+Math.sin(a)*q)}g.closePath();g.fillStyle=col;g.fill()};
 const star5=(cx,cy,r,col,st)=>{g.beginPath();for(let i=0;i<10;i++){const a=i*TAU/10-TAU/4,q=i%2?r*.45:r;g.lineTo(cx+Math.cos(a)*q,cy+Math.sin(a)*q)}g.closePath();g.fillStyle=col;g.fill();if(st){g.strokeStyle=INK;g.lineWidth=1.5;g.stroke()}};
 const heart=(cx,cy,r,col)=>{g.beginPath();g.moveTo(cx,cy+r*.9);g.bezierCurveTo(cx-r*1.5,cy-r*.1,cx-r*.7,cy-r*1.2,cx,cy-r*.35);g.bezierCurveTo(cx+r*.7,cy-r*1.2,cx+r*1.5,cy-r*.1,cx,cy+r*.9);g.fillStyle=col;g.fill();g.strokeStyle=INK;g.lineWidth=1.5;g.stroke()};
 const petal=(cx,cy,r,rot,col)=>{g.save();g.translate(cx,cy);g.rotate(rot);g.beginPath();g.moveTo(0,-r);g.quadraticCurveTo(r*.8,-r*.2,0,r);g.quadraticCurveTo(-r*.8,-r*.2,0,-r);g.fillStyle=col;g.fill();g.restore()};
 const flower=(cx,cy,r,col,c2)=>{for(let i=0;i<5;i++)petal(cx+Math.cos(i*TAU/5)*r*.55,cy+Math.sin(i*TAU/5)*r*.55,r*.55,i*TAU/5+TAU/4,col);circ(cx,cy,r*.22,c2)};
 const shur=(cx,cy,r,rot,col)=>{g.save();g.translate(cx,cy);g.rotate(rot);g.beginPath();for(let i=0;i<4;i++){const a=i*TAU/4;g.lineTo(Math.cos(a)*r,Math.sin(a)*r);g.lineTo(Math.cos(a+.9)*r*.34,Math.sin(a+.9)*r*.34)}g.closePath();g.fillStyle=col;g.fill();g.strokeStyle=INK;g.lineWidth=1.5;g.stroke();circ(0,0,r*.16,INK);g.restore()};
 const bolt=(x1,y1,x2,y2,j,seed,col,lw)=>{g.beginPath();g.moveTo(x1,y1);for(let i=1;i<5;i++){const q=i/5;g.lineTo(x1+(x2-x1)*q+(hs(seed+i)-.5)*j,y1+(y2-y1)*q+(hs(seed+i+9)-.5)*j)}g.lineTo(x2,y2);g.strokeStyle=col;g.lineWidth=lw;g.stroke()};
 const wing=(cx,cy,s,d,ang,col,c2)=>{g.save();g.translate(cx,cy);g.scale(d,1);g.rotate(ang);for(let i=0;i<3;i++){g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(s*(.3+i*.03),-s*(.36-i*.12),s*(.42-i*.07),s*(i*.13-.02));g.quadraticCurveTo(s*.16,s*(.02+i*.1),0,s*.08);g.fillStyle=i%2?c2:col;g.fill();g.strokeStyle=INK;g.lineWidth=1.2;g.stroke()}g.restore()};
 const flame=(cx,cy,w,h,col)=>{g.beginPath();g.moveTo(cx-w,cy);g.quadraticCurveTo(cx-w*.2,cy-h*1.5,cx+w*.15,cy-h);g.quadraticCurveTo(cx+w*.7,cy-h*.4,cx+w,cy);g.fillStyle=col;g.fill()};
 const DECO={
  sakura:(x,y,s,B)=>{flower(x+s*.04,y+s*.04,s*.15,B[1],'#ffe14d');flower(x+s*.97,y+s*.95,s*.12,B[2],'#ff7ad1');petal(x+s*.22,y-s*.02,s*.05,.8,B[2])},
  ears:(x,y,s,B)=>{for(const d of[-1,1]){const cx=x+s/2+d*s*.3;poly([[cx-s*.16,y+s*.02],[cx+d*s*.06,y-s*.26],[cx+s*.16,y+s*.02]],B[1],INK,2);poly([[cx-s*.07,y+s*.01],[cx+d*s*.04,y-s*.15],[cx+s*.08,y+s*.01]],'#ff9ec4')}},
  horns:(x,y,s,B)=>{for(const d of[-1,1]){const cx=x+s/2+d*s*.3;g.beginPath();g.moveTo(cx-d*s*.1,y+s*.02);g.quadraticCurveTo(cx+d*s*.02,y-s*.16,cx+d*s*.2,y-s*.28);g.quadraticCurveTo(cx+d*s*.16,y-s*.08,cx+d*s*.1,y+s*.02);g.closePath();g.fillStyle=B[2];g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke()}},
  halo:(x,y,s,B)=>{g.beginPath();g.ellipse(x+s/2,y-s*.14,s*.28,s*.07,0,0,TAU);g.strokeStyle=INK;g.lineWidth=s*.07;g.stroke();g.strokeStyle='#ffe14d';g.lineWidth=s*.04;g.stroke()},
  wings:(x,y,s,B,T,an)=>{const a=an?Math.sin(T*5)*.28:0;wing(x-s*.02,y+s*.45,s,-1,-.35+a,'#fff',B[2]);wing(x+s*1.02,y+s*.45,s,1,-.35+a,'#fff',B[2])},
  shuriken:(x,y,s,B,T,an)=>{shur(x+s*.96,y+s*.05,s*.17,an?T*5:.4,B[2]);if(an)shur(x+s*.04,y+s*.95,s*.13,-T*4,B[1])},
  kira:(x,y,s,B,T,an)=>{[[.02,.1,.14],[.95,.3,.1],[.86,.98,.15],[.12,.9,.08],[.5,-.04,.09]].forEach((q,i)=>{const k=an?.35+.65*Math.abs(Math.sin(T*3+i*1.3)):1;star4(x+s*q[0],y+s*q[1],s*q[2]*k,i%2?B[2]:'#fff')})},
  heart:(x,y,s,B,T,an)=>{if(!an){heart(x+s*.95,y+s*.06,s*.13,'#ff5a8a');heart(x+s*.06,y+s*.92,s*.09,B[2]);return}for(let i=0;i<5;i++){const q=(T*.45+i*.2)%1,hx=x+s*(.08+hs(i+3)*.84)+Math.sin(T*2+i)*s*.05;g.globalAlpha=Math.min(1,(1-q)*2.5);heart(hx,y+s*(1.02-q*1.2),s*(.07+hs(i)*.05),i%2?'#ff5a8a':B[2]);g.globalAlpha=1}},
  kanji:(x,y,s,B,T,an,arg)=>{const w=s*.36,cx=x+s*.9,cy=y+s*.9;g.save();g.translate(cx,cy);g.rotate(-.12);rr(-w/2,-w/2,w,w,w*.18);g.fillStyle='#d8262f';g.fill();g.strokeStyle='#fff';g.lineWidth=1.5;g.stroke();g.font='900 '+(w*.74)+'px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillStyle='#fff';g.fillText(arg,0,w*.04);g.restore()},
  ribbon:(x,y,s,B)=>{const cx=x+s*.88,cy=y+s*.06,r=s*.17;for(const d of[-1,1])poly([[cx,cy],[cx+d*r*1.3,cy-r*.8],[cx+d*r*1.3,cy+r*.8]],B[1],INK,2);poly([[cx-r*.2,cy+r*.2],[cx-r*.7,cy+r*1.5],[cx,cy+r*.9]],B[1],INK,1.5);poly([[cx+r*.2,cy+r*.2],[cx+r*.7,cy+r*1.5],[cx,cy+r*.9]],B[1],INK,1.5);circ(cx,cy,r*.3,B[2],INK,1.5)},
  moon:(x,y,s,B)=>{const cx=x+s*.95,cy=y+s*.04,r=s*.17;g.save();g.beginPath();g.arc(cx,cy,r,0,TAU);g.arc(cx+r*.45,cy-r*.2,r*.82,0,TAU,true);g.fillStyle=B[2];g.fill('evenodd');g.restore()},
  star:(x,y,s,B)=>{star5(x+s*.03,y+s*.04,s*.15,B[2],1);star5(x+s*.97,y+s*.96,s*.11,B[2],1);star5(x+s*.2,y-s*.03,s*.06,'#fff',1)},
  rope:(x,y,s,B)=>{for(let i=0;i<3;i++){const cx=x+s*(.25+i*.25);poly([[cx-s*.05,y+s*.02],[cx+s*.05,y+s*.02],[cx+s*.02,y+s*.1],[cx+s*.07,y+s*.1],[cx,y+s*.24],[cx,y+s*.14],[cx-s*.05,y+s*.14]],'#fff',INK,1.2)}},
  speed:(x,y,s,B,T,an)=>{g.save();g.strokeStyle=B[an?1:2];g.lineCap='round';for(let i=0;i<14;i++){const a=i*TAU/14+.2,k=an?(.5+.5*hs(i+Math.floor(T*12))):(.5+.5*hs(i)),r0=s*.76,r1=r0+s*.2*k;g.lineWidth=Math.max(1,s*.025*(1+hs(i+5)));g.beginPath();g.moveTo(x+s/2+Math.cos(a)*r0,y+s/2+Math.sin(a)*r0);g.lineTo(x+s/2+Math.cos(a)*r1,y+s/2+Math.sin(a)*r1);g.stroke()}g.restore()},
  bolt:(x,y,s,B,T,an)=>{if(!an){poly([[x+s*.98,y-s*.14],[x+s*.84,y+s*.06],[x+s*.94,y+s*.06],[x+s*.86,y+s*.24],[x+s*1.06,y+s*.0],[x+s*.96,y+s*.0]],'#ffe14d',INK,1.5);return}const sd=Math.floor(T*14);g.save();g.lineJoin='round';for(let i=0;i<3;i++){const u=hs(sd+i*7),a=P(x,y,s,u),b=P(x,y,s,u+.12+hs(sd+i)*.12);bolt(a[0],a[1],b[0],b[1],s*.22,sd*3+i,B[2],Math.max(1.5,s*.04));bolt(a[0],a[1],b[0],b[1],s*.22,sd*3+i,B[1],Math.max(1,s*.018))}g.restore()},
  vein:(x,y,s,B,T,an)=>{const cx=x+s*.92,cy=y+s*.1,r=s*.13*(an?1+.18*Math.sin(T*10):1);g.save();g.strokeStyle='#ff3d2a';g.lineWidth=Math.max(2,s*.045);g.lineCap='round';for(let i=0;i<4;i++){const a=i*TAU/4+TAU/8;g.beginPath();g.arc(cx+Math.cos(a)*r,cy+Math.sin(a)*r,r*.62,a+TAU/2-1,a+TAU/2+1);g.stroke()}g.restore()},
  sweat:(x,y,s,B)=>{const cx=x+s*.93,cy=y+s*.12,r=s*.09;g.beginPath();g.moveTo(cx,cy-r*2);g.quadraticCurveTo(cx+r*1.3,cy,cx,cy+r);g.quadraticCurveTo(cx-r*1.3,cy,cx,cy-r*2);g.fillStyle='#7fdcff';g.fill();g.strokeStyle=INK;g.lineWidth=1.5;g.stroke()},
  crown:(x,y,s,B)=>{const cx=x+s/2,w=s*.26,by=y+s*.0;poly([[cx-w,by],[cx-w*1.1,by-s*.2],[cx-w*.5,by-s*.1],[cx,by-s*.26],[cx+w*.5,by-s*.1],[cx+w*1.1,by-s*.2],[cx+w,by]],'#ffd36e',INK,2);circ(cx,by-s*.07,s*.035,'#ff3d5a')},
  leaf:(x,y,s,B,T,an)=>{if(!an){petal(x+s*.03,y+s*.05,s*.14,-.7,B[1]);petal(x+s*.12,y-s*.03,s*.1,.5,B[2]);petal(x+s*.96,y+s*.95,s*.13,2.4,B[1]);return}for(let i=0;i<6;i++){const q=(T*.3+hs(i)*1)%1;g.globalAlpha=Math.min(1,(1-q)*3);petal(x+s*(hs(i+2)*1.1-.05)+Math.sin(T*2+i)*s*.08,y+s*(-.15+q*1.25),s*.08,T*2+i,i%2?B[1]:B[2]);g.globalAlpha=1}},
  petal:(x,y,s,B,T)=>{for(let i=0;i<7;i++){const q=(T*.28+hs(i)*1)%1;g.globalAlpha=Math.min(1,(1-q)*3);petal(x+s*(hs(i+4)*1.2-.1)+q*s*.2,y+s*(-.15+q*1.25),s*.065,T*3+i*2,i%2?B[1]:B[2]);g.globalAlpha=1}},
  snow:(x,y,s,B,T)=>{for(let i=0;i<9;i++){const q=(T*.22+hs(i))%1;g.globalAlpha=Math.min(1,(1-q)*3);star4(x+s*(hs(i+4)*1.2-.1)+Math.sin(T+i)*s*.05,y+s*(-.15+q*1.25),s*(.035+hs(i+8)*.035),'#fff');g.globalAlpha=1}},
  bubble:(x,y,s,B,T)=>{for(let i=0;i<7;i++){const q=(T*.25+hs(i))%1,r=s*(.03+hs(i+8)*.05);g.globalAlpha=Math.min(1,(1-q)*3);circ(x+s*(hs(i+4)*1.1-.05)+Math.sin(T*2+i)*s*.04,y+s*(1.1-q*1.25),r,'rgba(191,238,255,.35)','#fff',1.2);g.globalAlpha=1}},
  aura:(x,y,s,B,T)=>{for(let i=0;i<9;i++){const fx=x+s*(i/8),h=s*(.2+.14*Math.sin(T*8+i*1.9));flame(fx,y+s*.04,s*.1,h,i%2?B[2]:B[1])}for(const d of[0,1])for(let i=0;i<4;i++){const fy=y+s*(.3+i*.22),h=s*(.1+.07*Math.sin(T*7+i*2.3+d));g.save();g.translate(d?x+s:x,fy);g.rotate(d?.5:-.5);flame(0,0,s*.07,h,i%2?B[1]:B[2]);g.restore()}
   g.save();g.globalAlpha=.25+.15*Math.sin(T*6);rr(x-s*.06,y-s*.06,s*1.12,s*1.12,s*.2);g.strokeStyle=B[1];g.lineWidth=s*.1;g.stroke();g.restore()},
  orb:(x,y,s,B,T)=>{for(let i=0;i<3;i++)for(let k=5;k>=0;k--){const a=T*2.2+i*TAU/3-k*.13,cx=x+s/2+Math.cos(a)*s*.68,cy=y+s/2+Math.sin(a)*s*.68;g.globalAlpha=1-k*.16;circ(cx,cy,s*(.075-k*.01),k?B[i%2?1:2]:'#fff');g.globalAlpha=1}},
  ring:(x,y,s,B,T)=>{for(let i=0;i<2;i++){const q=(T*.8+i*.5)%1,e=s*.3*q;g.save();g.globalAlpha=(1-q)*.8;rr(x-e,y-e,s+e*2,s+e*2,s*.16+e);g.strokeStyle=i?B[2]:B[1];g.lineWidth=Math.max(1.5,s*.05*(1-q));g.stroke();g.restore()}},
  comet:(x,y,s,B,T)=>{for(let k=14;k>=0;k--){const p=P(x,y,s,T*.45-k*.012);g.globalAlpha=1-k/15;circ(p[0],p[1],s*(.085-k*.004),k?B[2]:'#fff');g.globalAlpha=1}},
  dragon:(x,y,s,B,T)=>{for(let k=22;k>=0;k--){const u=T*.3-k*.016,p=P(x,y,s,u),w=Math.sin(T*6-k*.6)*s*.03;circ(p[0]+w,p[1]+w,s*(k?.07-k*.002:.095),k%3===0?B[2]:B[1],INK,1.2)}const h=P(x,y,s,T*.3);circ(h[0]-s*.03,h[1]-s*.02,s*.018,'#fff');circ(h[0]+s*.03,h[1]-s*.02,s*.018,'#fff')}};
 const path=(x,y,s,B)=>{if(B[3]==='notch'){const c=s*.2;g.beginPath();g.moveTo(x+c,y);g.lineTo(x+s,y);g.lineTo(x+s,y+s-c);g.lineTo(x+s-c,y+s);g.lineTo(x,y+s);g.lineTo(x,y+c);g.closePath()}else rr(x,y,s,s,s*.16)};
 const frame=(x,y,s,B,T)=>{const f=B[3],lw=Math.max(2,s*.085);g.lineJoin='round';let col=B[1];
  if(f==='glitch'){const j=Math.sin(T*23)>.55?s*.05:s*.015;for(const[dx,c]of[[-j,B[2]],[j,B[1]]]){g.globalAlpha=.85;rr(x+dx,y+(dx>0?j*.4:-j*.4),s,s,s*.16);g.strokeStyle=c;g.lineWidth=lw*.8;g.stroke()}g.globalAlpha=1;rr(x,y,s,s,s*.16);g.strokeStyle='#fff';g.lineWidth=lw*.4;g.stroke();if(Math.sin(T*17)>.7){g.fillStyle=B[1];g.fillRect(x-s*.1,y+s*hs(Math.floor(T*9)),s*1.2,s*.04)}return}
  if(f==='rb')col='hsl('+((T*140)%360|0)+',95%,66%)';
  if(f==='grad'||f==='spin'){const a=f==='spin'?T*3:.8,gr=g.createLinearGradient(x+s/2-Math.cos(a)*s*.7,y+s/2-Math.sin(a)*s*.7,x+s/2+Math.cos(a)*s*.7,y+s/2+Math.sin(a)*s*.7);gr.addColorStop(0,B[1]);gr.addColorStop(.5,B[2]);gr.addColorStop(1,B[1]);col=gr}
  path(x,y,s,B);g.strokeStyle=INK;g.lineWidth=lw+2.5;g.stroke();
  if(f==='manga'){g.strokeStyle='#111';g.lineWidth=lw;g.stroke();g.strokeStyle='#fff';g.lineWidth=lw*.34;g.stroke();g.save();path(x,y,s,B);g.clip();g.fillStyle=B[2]==='#111111'?'rgba(255,255,255,.75)':B[2];for(let i=0;i<5;i++)for(let j=0;j<5-i;j++)circ(x+s-s*.05-i*s*.07,y+s*.05+j*s*.07,s*.022*(1-(i+j)*.12),g.fillStyle);g.restore();return}
  if(f==='ink'){g.strokeStyle=col;g.lineWidth=lw;g.stroke();g.save();g.lineCap='round';g.strokeStyle=B[2];g.globalAlpha=.9;g.lineWidth=lw*.5;g.beginPath();g.moveTo(x+s*.1,y-lw*.2);g.lineTo(x+s*.62,y-lw*.3);g.stroke();g.beginPath();g.moveTo(x+s+lw*.25,y+s*.3);g.lineTo(x+s+lw*.2,y+s*.85);g.stroke();g.beginPath();g.moveTo(x+s*.9,y+s+lw*.3);g.lineTo(x+s*.35,y+s+lw*.2);g.stroke();g.restore();return}
  g.strokeStyle=col;g.lineWidth=lw;g.stroke();
  if(f==='dbl'){const e=lw*.95;rr(x+e,y+e,s-e*2,s-e*2,s*.1);g.strokeStyle=B[2];g.lineWidth=Math.max(1,lw*.3);g.stroke()}
  if(f==='dash'||f==='march'){g.save();g.setLineDash([s*.16,s*.12]);if(f==='march')g.lineDashOffset=-T*s*.9;path(x,y,s,B);g.strokeStyle=B[2];g.lineWidth=lw*.55;g.stroke();g.restore()}};
 const BACK={aura:1,wings:1,speed:1,ring:1};
 const draw=(x,y,s,id)=>{const B=NEW[id]||NEW[0],T=G.t;g.save();try{const ds=B[4].map(d=>{const an=d.slice(-1)==='A'&&!d.includes(':'),q=(an?d.slice(0,-1):d).split(':');return[q[0],an,q[1]]});
   ds.forEach(d=>{if(BACK[d[0]]&&DECO[d[0]])DECO[d[0]](x,y,s,B,T,d[1],d[2])});frame(x,y,s,B,T);ds.forEach(d=>{if(!BACK[d[0]]&&DECO[d[0]])DECO[d[0]](x,y,s,B,T,d[1],d[2])});
   if(B[5]){const an=ds.some(d=>d[1]),bb=an?Math.abs(Math.sin(T*5))*s*.04:0;g.font=(s*.2)+'px '+FB;const w=Math.min(s*1.08,g.measureText(B[5]).width+s*.18),h=s*.26;g.save();g.translate(x+s/2,y+s-h*.05-bb);g.rotate(-.05);rr(-w/2,-h/2,w,h,h*.3);g.fillStyle=B[1];g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();txt(B[5],0,1,Math.min(s*.2,s*1.25/B[5].length),'#fff',INK,'center',FB,3);g.restore()}}catch(e){}g.restore()};
 const db0=drawBorder;drawBorder=function(x,y,s,id){if(!ON())return db0(x,y,s,id);draw(x,y,s,id)};
 const setBD=on=>{const want=on?NEW:OLD;if(BD.length===want.length&&BD[0]===want[0])return;BD.length=0;want.forEach(q=>BD.push(q))};
 const sync=()=>{try{const on=ON();setBD(on);if(!window.LIVE_READY)return;if(on&&!SV.b50){const src=SV.cos0||SV;SV.bd0={borders:(src.borders||[0]).slice(),border:src.border|0};if(SV.cos0){SV.cos0.borders=[0];SV.cos0.border=0}SV.borders=[0];SV.border=0;SV.b50=1;save()}
   else if(!on&&SV.b50){const b=SV.bd0||{borders:[0],border:0};if(SV.cosr&&SV.cos0){SV.cos0.borders=b.borders;SV.cos0.border=b.border;SV.borders=[0];SV.border=0}else{SV.borders=b.borders;SV.border=b.border}delete SV.b50;delete SV.bd0;save()}}catch(e){}};
 const ub0=update;let tb=0;update=function(rdt){ub0(rdt);tb+=rdt;if(tb>.5){tb=0;sync()}};sync()}
/* banner50: the old profile banners (one per fighter world) are replaced by 50 new anime-style ones: 25 still, 25 animated (Trey). Some show fighters doing something, some a power, some both.
   Banner ids are 0-49 while the flag is on; banBG() in index.html asks window.COMBO_BAN first. Each save's old banner collection is kept in SV.bn0 and comes back if the update is pulled back.
   Spec: [name, colour 1, colour 2, background, fighter (index in CH, -1 none), action, power, animated, second fighter for a clash]. */
{const ON=()=>!!F().banner50;
 const BN=[['ROOKIE DAY','#3fa9ff','#bfeeff','sky',0,'stand','none',0],
  ['RISING SUN','#ff3d2a','#ffd36e','rays',1,'win','none',0],['CITY NIGHTS','#1a1f4a','#b06bff','city',2,'stand','none',0],['MOON WATCH','#0c1030','#3a4a9a','night',3,'sit','none',0],['SUNSET DUEL','#ff7a1f','#5a1f6a','sunset',4,'guard','none',0,5],
  ['SAKURA ROAD','#ffc2e2','#ff7ad1','sakura',6,'stand','petals',0],['DOJO MORNING','#c8824a','#ffe9c2','dojo',7,'kneel','none',0],['HIGH KICK','#ffe14d','#ff7a1f','speed',8,'kick','none',0],['FIRST PUNCH','#3fd0c0','#1a5a8a','speed',9,'punch','shock',0],
  ['MANGA PANEL','#ffffff','#c9d6e6','tone',10,'dash','none',0],['SUMMIT','#7fb8ff','#fff3d6','mount',11,'win','none',0],['OCEAN CALM','#3fa9ff','#bfeeff','sea',12,'stand','none',0],['STORM WATCH','#2a3048','#6b7a9a','storm',13,'guard','bolt',0],
  ['FROZEN PEAK','#bfeeff','#5d8ad8','mount',14,'cast','ice',0],['STAR BOMB','#ffe14d','#3fa9ff','rays',15,'raise','orb',0],['CRESCENT','#1a0f33','#b06bff','night',16,'slash','slash',0],['SEAL CIRCLE','#3a1f6a','#ff7ad1','void',17,'cast','circle',0],
  ['METEOR','#2a1050','#ff7a1f','night',-1,'','meteor',0],['BLACK HOLE','#07040f','#8a3fb8','void',-1,'','hole',0],['DRAGON FIRE','#4a0f0f','#ff7a1f','void',-1,'','fire',0],['AFTERIMAGE','#1a2a4a','#3fd0c0','tone',18,'dash','clones',0],
  ['SKY DIVE','#3fa9ff','#fff','sky',19,'fall','none',0],['RIVALS','#ff3d5a','#3fa9ff','tone',20,'punch','shock',0,21],['GOLDEN HOUR','#ffb020','#ff5a8a','sunset',22,'stand','stars',0],['TWIN TORNADO','#4fc46a','#c8f7a8','sky',-1,'','tornado',0],
  ['SUPER AURA','#ffe14d','#ff7a1f','speed',0,'charge','aura',1],['MEGA BEAM','#3fa9ff','#fff','speed',1,'beam','beam',1],['THUNDER STRIKE','#2a3048','#ffe14d','storm',2,'raise','bolt',1],['PETAL STORM','#ffc2e2','#ff5a8a','sakura',3,'stand','petals',1],
  ['NEON RAIN','#1a1f4a','#ff3d9a','city',4,'stand','rain',1],['SHOOTING STARS','#0c1030','#3a4a9a','night',5,'sit','meteor',1],['TIDAL WAVE','#1a5fa8','#7fdcff','sea',6,'cast','none',1],['SPIRAL ORB','#1a2a4a','#7fdcff','void',7,'cast','orb',1],
  ['MAGIC CIRCLE','#3a1f6a','#b06bff','void',8,'cast','circle',1],['FLAME FIST','#4a0f0f','#ff7a1f','speed',9,'punch','fire',1],['ICE AGE','#5d8ad8','#bfeeff','mount',10,'cast','ice',1],['CYCLONE','#2f7a5f','#c8f7a8','sky',11,'raise','tornado',1],
  ['EVENT HORIZON','#07040f','#ff3d9a','void',12,'guard','hole',1],['SHADOW CLONES','#2a1f45','#8a3fb8','tone',13,'dash','clones',1],['FINAL CLASH','#ff3d5a','#ffe14d','speed',14,'punch','shock',1,15],['SWORD DANCE','#1a0f33','#ff7ad1','night',16,'slash','slash',1],
  ['POWER UP','#ff7a1f','#ffe14d','rays',17,'charge','aura',1],['WAR DRUMS','#c8824a','#ff3d2a','dojo',18,'kick','shock',1],['SUNRISE RUN','#ff7a1f','#ffd36e','sunset',19,'dash','none',1],['CLOUD NINE','#7fb8ff','#fff','sky',20,'jump','stars',1],
  ['RAINY ROOFTOP','#2a3048','#6b7a9a','storm',21,'stand','rain',1],['STAR FESTIVAL','#1a1f4a','#ffe14d','city',22,'win','stars',1],['DRAGON RISE','#0f3a2a','#4fc46a','void',23,'raise','fire',1],['LIMIT BREAK','#fff','#ff3d5a','speed',24,'charge','bolt',1],
  ['LEGENDS','#ffb020','#ffe9a8','rays',0,'beam','struggle',1,1]];
 window.COMBO_BN50=BN;
 /* banner50b (own flag, banner50 was already released): Trey asked to remake the 50 banners. A second set, 25 still and 25 animated, with big close shots:
    bust = one fighter close up from the front, back = a fighter from behind looking at the scene, vs = two fighters face to face, act = a full-body move, team = three fighters, pow = a power alone.
    Spec: [name, colour 1, colour 2, background, shot, fighters, power, animated, expression]. Banner ids stay 0-49, so what a player owns carries over by number. */
 const V2=()=>!!F().banner50b;
 const BN2=[['FIRST STEP','#3fa9ff','#bfeeff','sky','bust',[0],'none',0,''],
  ['RED DAWN','#ff3d2a','#ffd36e','rays','bust',[1],'none',0,'yell'],['MIDNIGHT EYES','#0c1030','#3a4a9a','night','bust',[2],'stars',0,''],['CHERRY SMILE','#ffc2e2','#ff7ad1','sakura','bust',[3],'petals',0,''],['STORM FACE','#2a3048','#6b7a9a','storm','bust',[4],'bolt',0,'yell'],
  ['GOLD HEART','#ffb020','#ff5a8a','sunset','bust',[5],'none',0,''],['COLD STARE','#5d8ad8','#bfeeff','mount','bust',[6],'ice',0,''],['INK HERO','#ffffff','#c9d6e6','tone','bust',[7],'none',0,'yell'],['VOID WALKER','#07040f','#8a3fb8','void','bust',[8],'hole',0,''],
  ['MOON GAZER','#0c1030','#3a4a9a','night','back',[9],'none',0],['LAST SUNSET','#ff7a1f','#5a1f6a','sunset','back',[10],'none',0],['CITY WATCH','#1a1f4a','#b06bff','city','back',[11],'none',0],['SUMMIT VIEW','#7fb8ff','#fff3d6','mount','back',[12],'none',0],['FALLING STARS','#2a1050','#ff7a1f','night','back',[13],'meteor',0],
  ['OLD RIVALS','#ff3d5a','#3fa9ff','tone','vs',[14,15],'bolt',0],['FIRE AND ICE','#ff7a1f','#7fdcff','speed','vs',[16,17],'shock',0],['DOJO DUEL','#c8824a','#ffe9c2','dojo','vs',[18,19],'none',0],
  ['SKY UPPER','#3fa9ff','#fff','sky','act',[20],'shock',0,'punch'],['MOON SLASH','#1a0f33','#b06bff','night','act',[21],'slash',0,'slash'],['WAVE KICK','#1a5fa8','#7fdcff','sea','act',[22],'none',0,'kick'],['DASH PANEL','#ffe14d','#ff7a1f','speed','act',[23],'clones',0,'dash'],
  ['TEAM COMBO','#ffd36e','#ff3d5a','rays','team',[0,1,2],'none',0],['NIGHT SHIFT','#1a1f4a','#ff3d9a','city','team',[3,4,5],'none',0],
  ['DRAGON COIL','#4a0f0f','#ff7a1f','void','pow',[],'fire',0],['SEAL OF NINE','#3a1f6a','#ff7ad1','void','pow',[],'circle',0],
  ['BURNING SOUL','#ff7a1f','#ffe14d','speed','bust',[6],'aura',1,'yell'],['THUNDER EYES','#2a3048','#ffe14d','storm','bust',[7],'bolt',1,'yell'],['PETAL DREAM','#ffc2e2','#ff5a8a','sakura','bust',[8],'petals',1,''],['RAIN CHECK','#2a3048','#6b7a9a','storm','bust',[9],'rain',1,''],
  ['STAR CHILD','#0c1030','#3a4a9a','night','bust',[10],'stars',1,''],['DARK MATTER','#07040f','#ff3d9a','void','bust',[11],'hole',1,''],['OVERDRIVE','#fff','#ff3d5a','speed','bust',[12],'bolt',1,'yell'],['SPIRAL HAND','#1a2a4a','#7fdcff','void','bust',[13],'orb',1,''],
  ['COMET NIGHT','#0c1030','#3a4a9a','night','back',[14],'meteor',1],['NEON CITY','#1a1f4a','#ff3d9a','city','back',[15],'rain',1],['OCEAN ROAD','#1a5fa8','#7fdcff','sea','back',[16],'none',1],['SNOW PEAK','#5d8ad8','#bfeeff','mount','back',[17],'stars',1],['RISING DRAGON','#0f3a2a','#4fc46a','void','back',[18],'fire',1],
  ['BEAM STRUGGLE','#ffb020','#ffe9a8','rays','vs',[0,1],'struggle',1],['SPARK WAR','#ff3d5a','#3fa9ff','tone','vs',[19,20],'bolt',1],['FINAL ROUND','#ff3d5a','#ffe14d','speed','vs',[21,22],'shock',1],
  ['FLAME RUSH','#4a0f0f','#ff7a1f','speed','act',[23],'fire',1,'punch'],['BLADE STORM','#1a0f33','#ff7ad1','night','act',[24],'slash',1,'slash'],['MEGA CANNON','#3fa9ff','#fff','speed','act',[2],'beam',1,'beam'],['POWER SURGE','#ff7a1f','#ffe14d','rays','act',[3],'aura',1,'charge'],['SHADOW RUN','#2a1f45','#8a3fb8','tone','act',[4],'clones',1,'dash'],
  ['SQUAD GOALS','#3fa9ff','#bfeeff','sky','team',[5,6,7],'stars',1],['FESTIVAL NIGHT','#1a1f4a','#ffe14d','city','team',[8,9,10],'stars',1],
  ['EVENT HORIZON','#07040f','#8a3fb8','void','pow',[],'hole',1],['GOD STORM','#2f7a5f','#c8f7a8','sky','pow',[],'tornado',1]];
 const LIST=()=>V2()?BN2:BN;
 const hs=i=>{const v=Math.sin(i*12.9898)*43758.5453;return v-Math.floor(v)};
 const al=(c,a)=>{const n=parseInt(c.length===4?c[1]+c[1]+c[2]+c[2]+c[3]+c[3]:c.slice(1),16);return'rgba('+(n>>16&255)+','+(n>>8&255)+','+(n&255)+','+a+')'};
 const POSE=()=>({stand:IDLE,guard:GUARD,punch:L1B,kick:L3B,dash:DASH,jump:JUMP,charge:CHG,cast:CAST,beam:CAST2,win:WIN,raise:RAISE,kneel:KNEEL,sit:KNEEL,slash:L4B,fall:FALL});
 const BG={
  sky:(x,y,w,h,B,T,an)=>{for(let i=0;i<5;i++){const cx=x+((hs(i)*1.3*w+(an?T*w*.02*(1+i*.3):0))%(w*1.3))-w*.15,cy=y+h*(.15+hs(i+3)*.45),r=h*(.08+hs(i+6)*.07);g.fillStyle='rgba(255,255,255,.85)';for(let k=0;k<4;k++){g.beginPath();g.arc(cx+k*r*.9,cy-(k%2)*r*.4,r*(1-.12*k),0,TAU);g.fill()}g.fillRect(cx-r,cy,r*4.6,r*.7)}},
  rays:(x,y,w,h,B,T,an)=>{const cx=x+w/2,cy=y+h*1.02,R2=Math.hypot(w,h);g.save();g.translate(cx,cy);g.rotate(an?T*.25:.1);for(let i=0;i<16;i++){g.rotate(TAU/16);g.fillStyle=i%2?al(B[2],.55):'rgba(255,255,255,.16)';g.beginPath();g.moveTo(0,0);g.lineTo(-R2*.1,-R2);g.lineTo(R2*.1,-R2);g.fill()}g.restore();circ(cx,cy,h*.34,'#fff');circ(cx,cy,h*.29,B[2])},
  city:(x,y,w,h,B,T,an)=>{circ(x+w*.8,y+h*.22,h*.13,'#fff3d6');for(let i=0;i<14;i++){const bw=w*(.05+hs(i)*.05),bx=x+w*(i/13)-bw/2,bh2=h*(.25+hs(i+7)*.42);g.fillStyle=i%2?'#120a2a':'#1c1240';g.fillRect(bx,y+h-bh2,bw,bh2);for(let r=0;r<6;r++)for(let c=0;c<2;c++){const on=hs(i*31+r*7+c+(an?Math.floor(T*.7+hs(i+r)*5):0))>.45;if(on){g.fillStyle=(i+r)%3?'#ffe14d':B[2];g.fillRect(bx+bw*(.2+c*.4),y+h-bh2+bh2*(.08+r*.14),bw*.2,bh2*.06)}}}},
  night:(x,y,w,h,B,T,an)=>{for(let i=0;i<40;i++){const k=an?.4+.6*Math.abs(Math.sin(T*2+i)):.5+.5*hs(i+50);g.globalAlpha=k;circ(x+hs(i)*w,y+hs(i+20)*h*.8,Math.max(.8,h*.008*(1+hs(i+9))),'#fff')}g.globalAlpha=1;circ(x+w*.78,y+h*.26,h*.17,'#fff3d6');circ(x+w*.74,y+h*.22,h*.03,'#e6d9a8');circ(x+w*.82,y+h*.3,h*.02,'#e6d9a8');g.fillStyle='#07040f';g.beginPath();g.moveTo(x,y+h);for(let i=0;i<=10;i++)g.lineTo(x+w*i/10,y+h*(.86-hs(i+70)*.08));g.lineTo(x+w,y+h);g.fill()},
  sunset:(x,y,w,h,B,T,an)=>{const cx=x+w*.62,cy=y+h*.6,r=h*.36;circ(cx,cy,r,'#ffe9a8');g.fillStyle=B[1];for(let i=0;i<5;i++)g.fillRect(cx-r,cy+r*(.15+i*.18)+(an?Math.sin(T*2+i)*r*.02:0),r*2,r*(.03+i*.022));g.fillStyle=al(B[2],.95);g.fillRect(x,y+h*.8,w,h*.2);g.fillStyle='rgba(255,233,168,.5)';for(let i=0;i<6;i++){const ww=r*(1.4-i*.2);g.fillRect(cx-ww/2+(an?Math.sin(T*3+i)*r*.06:0),y+h*(.82+i*.03),ww,h*.012)}},
  sakura:(x,y,w,h,B,T,an)=>{g.strokeStyle='#5a2f2f';g.lineCap='round';g.lineWidth=h*.05;g.beginPath();g.moveTo(x+w*1.02,y+h*.02);g.quadraticCurveTo(x+w*.7,y+h*.2,x+w*.45,y+h*.12);g.stroke();g.lineWidth=h*.025;g.beginPath();g.moveTo(x+w*.75,y+h*.15);g.quadraticCurveTo(x+w*.7,y+h*.34,x+w*.58,y+h*.4);g.stroke();for(let i=0;i<16;i++){const q=hs(i),cx=x+w*(.45+q*.55),cy=y+h*(.04+hs(i+5)*.34);circ(cx,cy,h*(.04+hs(i+9)*.035),i%3?'#ffd9e8':'#ff9ec4')}g.fillStyle=al('#ffffff',.25);g.fillRect(x,y+h*.86,w,h*.14)},
  sea:(x,y,w,h,B,T,an)=>{circ(x+w*.2,y+h*.24,h*.12,'#fff');for(let L=0;L<4;L++){g.fillStyle=L===3?'#fff':al(L%2?B[2]:'#1a5fa8',.9);g.beginPath();g.moveTo(x,y+h);const by=y+h*(.55+L*.11),a=h*(an&&L===0&&0?0:.035);for(let i=0;i<=24;i++)g.lineTo(x+w*i/24,by+Math.sin(i*.8+L*1.7+(an?T*(1.5+L*.5):0))*a*(1+(an&&B[0]==='TIDAL WAVE'&&L===0?2.5:0)));g.lineTo(x+w,y+h);g.fill();if(L===3)break}g.fillStyle=al(B[1],.9);g.fillRect(x,y+h*.93,w,h*.07)},
  mount:(x,y,w,h,B,T,an)=>{const mx=x+w*.62,my=y+h*.2;g.fillStyle='#3a4a7a';g.beginPath();g.moveTo(mx-w*.5,y+h);g.lineTo(mx,my);g.lineTo(mx+w*.5,y+h);g.fill();g.fillStyle='#fff';g.beginPath();g.moveTo(mx-w*.1,my+h*.16);g.lineTo(mx,my);g.lineTo(mx+w*.1,my+h*.16);g.lineTo(mx+w*.05,my+h*.12);g.lineTo(mx,my+h*.18);g.lineTo(mx-w*.05,my+h*.12);g.fill();g.fillStyle='rgba(255,255,255,.8)';for(let i=0;i<3;i++){const cx=x+((hs(i+2)*w+(an?T*w*.03:0))%(w*1.2))-w*.1,cy=y+h*(.4+i*.12);g.beginPath();g.ellipse(cx,cy,w*.12,h*.035,0,0,TAU);g.fill()}g.fillStyle='#e9f4ff';g.fillRect(x,y+h*.9,w,h*.1)},
  dojo:(x,y,w,h,B,T,an)=>{g.fillStyle='#f4e3c0';g.fillRect(x,y,w,h*.78);g.strokeStyle='#7a4a24';g.lineWidth=Math.max(2,h*.02);for(let i=0;i<=6;i++){g.beginPath();g.moveTo(x+w*i/6,y);g.lineTo(x+w*i/6,y+h*.78);g.stroke()}g.beginPath();g.moveTo(x,y+h*.3);g.lineTo(x+w,y+h*.3);g.stroke();g.fillStyle='#fff';g.fillRect(x+w*.7,y+h*.06,w*.1,h*.5);g.fillStyle='#d8262f';g.fillRect(x+w*.7,y+h*.06,w*.1,h*.04);g.fillRect(x+w*.7,y+h*.52,w*.1,h*.04);g.fillStyle='#111';g.font='900 '+(h*.13)+'px sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillText('武',x+w*.75,y+h*.2);g.fillText('道',x+w*.75,y+h*.38);g.fillStyle='#8a5a30';g.fillRect(x,y+h*.78,w,h*.22);g.strokeStyle='#5a3a1c';g.lineWidth=1;for(let i=1;i<5;i++){g.beginPath();g.moveTo(x,y+h*(.78+i*.045));g.lineTo(x+w,y+h*(.78+i*.045));g.stroke()}},
  storm:(x,y,w,h,B,T,an)=>{for(let i=0;i<12;i++){const cx=x+((hs(i)*w*1.2+(an?T*w*.03:0))%(w*1.2))-w*.1;circ(cx,y+h*(.05+hs(i+4)*.2),h*(.12+hs(i+8)*.1),i%2?'#3a4258':'#4a546e')}g.fillStyle='#1a1f30';g.fillRect(x,y+h*.88,w,h*.12)},
  void:(x,y,w,h,B,T,an)=>{const cx=x+w*.6,cy=y+h*.48;for(let i=7;i>0;i--){g.save();g.translate(cx,cy);g.rotate((an?T*.3:0)*(i%2?1:-1)+i);g.beginPath();g.ellipse(0,0,h*.14*i,h*.09*i,0,0,TAU);g.strokeStyle=al(i%2?B[2]:'#ffffff',.12+.03*i);g.lineWidth=h*.02;g.stroke();g.restore()}for(let i=0;i<24;i++){g.globalAlpha=.3+.6*hs(i+2);circ(x+hs(i)*w,y+hs(i+30)*h,Math.max(.8,h*.007),'#fff')}g.globalAlpha=1},
  speed:(x,y,w,h,B,T,an)=>{const cx=x+w*.5,cy=y+h*.5,R2=Math.hypot(w,h),sd=an?Math.floor(T*10):3;g.save();g.translate(cx,cy);for(let i=0;i<40;i++){const a=i*TAU/40+hs(i+sd)*.1,r0=R2*(.2+hs(i*3+sd)*.2);g.fillStyle=i%3?'rgba(255,255,255,.5)':al(B[2],.7);g.beginPath();g.moveTo(Math.cos(a)*r0,Math.sin(a)*r0);g.lineTo(Math.cos(a-.03)*R2,Math.sin(a-.03)*R2);g.lineTo(Math.cos(a+.03)*R2,Math.sin(a+.03)*R2);g.fill()}g.restore()},
  tone:(x,y,w,h,B,T,an)=>{g.fillStyle=al(B[2],.9);g.beginPath();g.moveTo(x+w*.55,y);g.lineTo(x+w,y);g.lineTo(x+w,y+h);g.lineTo(x+w*.35,y+h);g.fill();const st=Math.max(4,h*.05);g.fillStyle='rgba(10,4,24,.28)';for(let j=0;j*st<h;j++)for(let i=0;i*st<w*.6;i++){const r=st*.42*(1-i*st/(w*.6));if(r>.4){g.beginPath();g.arc(x+i*st+(j%2)*st/2,y+j*st,r,0,TAU);g.fill()}}g.strokeStyle='#111';g.lineWidth=Math.max(2,h*.025);g.beginPath();g.moveTo(x+w*.55,y);g.lineTo(x+w*.35,y+h);g.stroke()}};
 const flame=(cx,cy,w2,h2,col)=>{g.beginPath();g.moveTo(cx-w2,cy);g.quadraticCurveTo(cx-w2*.3,cy-h2*1.4,cx+w2*.1,cy-h2);g.quadraticCurveTo(cx+w2*.7,cy-h2*.4,cx+w2,cy);g.fillStyle=col;g.fill()};
 const zig=(x1,y1,x2,y2,j,sd,col,lw)=>{g.beginPath();g.moveTo(x1,y1);for(let i=1;i<7;i++){const q=i/7;g.lineTo(x1+(x2-x1)*q+(hs(sd+i)-.5)*j,y1+(y2-y1)*q+(hs(sd+i+9)-.5)*j*.4)}g.lineTo(x2,y2);g.strokeStyle=col;g.lineWidth=lw;g.lineJoin='round';g.stroke()};
 /* powers: R = {x,y,w,h}, f = focal point {x,y}, u = size unit, gy = ground line */
 const PW={
  aura:(R,f,u,gy,B,T)=>{for(let i=0;i<11;i++){const fx=f.cx+(i-5)*u*.16,hh=u*(1.9+.5*Math.sin(T*8+i*1.9))*(1-Math.abs(i-5)*.11);flame(fx,gy,u*.2,hh,i%2?al(B[2],.85):'rgba(255,255,255,.75)')}g.save();g.globalAlpha=.3;g.beginPath();g.ellipse(f.cx,gy,u*1.3,u*.25,0,0,TAU);g.fillStyle='#fff';g.fill();g.restore();for(let i=0;i<8;i++){const q=(T*.9+hs(i))%1;g.globalAlpha=1-q;g.fillStyle='#fff';g.fillRect(f.cx+(hs(i+3)-.5)*u*2.4,gy-q*u*2.6,u*.05,u*.16)}g.globalAlpha=1},
  beam:(R,f,u,gy,B,T)=>{const bw=u*(.5+.08*Math.sin(T*25)),x2=R.x+R.w+10;for(const[k,c]of[[1.5,al(B[2],.5)],[1,B[2]],[.5,'#fff']]){g.fillStyle=c;g.beginPath();g.moveTo(f.x,f.y);g.lineTo(f.x+u*.5,f.y-bw*k/2);g.lineTo(x2,f.y-bw*k/2);g.lineTo(x2,f.y+bw*k/2);g.lineTo(f.x+u*.5,f.y+bw*k/2);g.fill()}circ(f.x+u*.1,f.y,bw*.6,'#fff');for(let i=0;i<6;i++){const q=(T*2+hs(i))%1;g.strokeStyle='rgba(255,255,255,.8)';g.lineWidth=u*.04;g.beginPath();g.moveTo(f.x+q*(x2-f.x),f.y+(hs(i+2)-.5)*bw*2.2);g.lineTo(f.x+q*(x2-f.x)+u*.5,f.y+(hs(i+2)-.5)*bw*2.2);g.stroke()}},
  orb:(R,f,u,gy,B,T)=>{const cx=f.x+u*.25,cy=f.y-(B[5]==='raise'?u*1.5:0),r=u*(.42+.04*Math.sin(T*9));const gr=g.createRadialGradient(cx,cy,r*.1,cx,cy,r*1.7);gr.addColorStop(0,'#fff');gr.addColorStop(.45,B[2]);gr.addColorStop(1,al(B[2],0));g.fillStyle=gr;g.beginPath();g.arc(cx,cy,r*1.7,0,TAU);g.fill();g.strokeStyle='#fff';g.lineWidth=u*.04;for(let i=0;i<4;i++){g.beginPath();g.arc(cx,cy,r*(.5+i*.14),T*6+i*1.6,T*6+i*1.6+2.2);g.stroke()}for(let i=0;i<8;i++){const a=T*2+i*TAU/8,q=1-((T*.8+hs(i))%1);circ(cx+Math.cos(a)*r*2.2*q,cy+Math.sin(a)*r*2.2*q,u*.04,'#fff')}},
  bolt:(R,f,u,gy,B,T)=>{const sd=Math.floor(T*11),tx=f.cx+(hs(sd)-.5)*u*.6;if(hs(sd+40)>.25){zig(tx+(hs(sd+1)-.5)*u*3,R.y-5,f.cx,B[5]==='raise'?f.y-u*1.9:gy-u*.2,u*.9,sd,al(B[2],.6),u*.22);zig(tx+(hs(sd+1)-.5)*u*3,R.y-5,f.cx,B[5]==='raise'?f.y-u*1.9:gy-u*.2,u*.9,sd,'#fff',u*.08)}for(let i=0;i<3;i++){const a=hs(sd+i*5)*TAU;zig(f.cx,f.y,f.cx+Math.cos(a)*u*1.6,f.y+Math.sin(a)*u*1.2,u*.5,sd+i*11,B[2],u*.05)}},
  slash:(R,f,u,gy,B,T)=>{for(let i=0;i<3;i++){const q=(T*.9+i*.33)%1,r=u*(1+i*.45+q*.3),a0=-1.1+i*.25;g.save();g.globalAlpha=.95-i*.2;g.translate(f.cx+u*.3,f.y);g.beginPath();g.arc(0,0,r,a0,a0+1.9);g.arc(-u*.28,u*.05,r*.92,a0+1.9,a0,true);g.closePath();g.fillStyle=i?al(B[2],.9):'#fff';g.fill();g.restore()}},
  circle:(R,f,u,gy,B,T)=>{g.save();g.translate(f.cx+u*.4,gy-u*.05);g.scale(1,.32);g.rotate(T*.8);g.strokeStyle=B[2];g.lineWidth=u*.07;for(const r of[1.7,1.4,.8]){g.beginPath();g.arc(0,0,u*r,0,TAU);g.stroke()}g.strokeStyle='#fff';g.lineWidth=u*.05;g.beginPath();for(let i=0;i<=6;i++){const a=i*TAU*2/6+(i>=3?0:0);g.lineTo(Math.cos(i*TAU/3*2)*u*1.4,Math.sin(i*TAU/3*2)*u*1.4)}g.stroke();g.beginPath();for(let i=0;i<=3;i++)g.lineTo(Math.cos(i*TAU/3+TAU/6)*u*1.4,Math.sin(i*TAU/3+TAU/6)*u*1.4);g.stroke();g.restore();for(let i=0;i<10;i++){const q=(T*.5+hs(i))%1;g.globalAlpha=1-q;circ(f.cx+u*.4+(hs(i+4)-.5)*u*3,gy-q*u*2.4,u*.05,i%2?'#fff':B[2])}g.globalAlpha=1},
  fire:(R,f,u,gy,B,T)=>{const cx=f.x+u*(B[4]<0?0:.5),cy=f.y-(B[5]==='raise'?u*1.6:0);for(let k=12;k>=0;k--){const a=T*3-k*.35,px=cx+k*u*.28*(B[4]<0?Math.cos(a*.5):1)*(B[4]<0?1:-.0)+(B[4]<0?Math.cos(a)*u*1.5:k*u*.02),py=cy+(B[4]<0?Math.sin(a)*u*.9:Math.sin(T*10+k)*u*.05*k*.3-(B[5]==='raise'?0:0)),r=u*(.5-k*.03);circ(px,py,r,k%2?al('#ffb020',.9):al('#ff3d2a',.9))}circ(cx+(B[4]<0?Math.cos(T*3)*u*1.5:0),cy+(B[4]<0?Math.sin(T*3)*u*.9:0),u*.3,'#ffe9a8');for(let i=0;i<6;i++)flame(cx+(i-2.5)*u*.2+(B[4]<0?Math.cos(T*3)*u*1.5:0),cy-u*.3+(B[4]<0?Math.sin(T*3)*u*.9:0),u*.12,u*(.5+.2*Math.sin(T*9+i)),i%2?'#ffb020':'#ff5a2a')},
  ice:(R,f,u,gy,B,T)=>{for(let i=0;i<7;i++){const px=f.x+u*(.3+i*.55),hh=u*(1+hs(i)*1.6)*(.92+.08*Math.sin(T*3+i)),ww=u*(.2+hs(i+3)*.2);g.beginPath();g.moveTo(px-ww,gy);g.lineTo(px+ww*.2,gy-hh);g.lineTo(px+ww,gy);g.closePath();g.fillStyle=i%2?'#e9f8ff':'#9fd8ff';g.fill();g.strokeStyle='#fff';g.lineWidth=1.5;g.stroke()}for(let i=0;i<8;i++){const k=.4+.6*Math.abs(Math.sin(T*3+i));circ(f.x+hs(i)*u*4,gy-u*(.4+hs(i+5)*2.4),u*.05*k,'#fff')}},
  tornado:(R,f,u,gy,B,T)=>{for(const off of(B[0]==='TWIN TORNADO'?[-1.6,1.6]:[1.6])){const bx=f.cx+off*u+(B[4]<0?u*0:0);for(let i=0;i<10;i++){const q=i/9,rw=u*(.25+q*1.1),cy=gy-q*u*3,sx=Math.sin(T*4+i*.7)*u*.18*q;g.beginPath();g.ellipse(bx+sx,cy,rw,rw*.25,0,0,TAU);g.strokeStyle=i%2?'#fff':al(B[2],.9);g.lineWidth=u*.09;g.stroke()}}},
  meteor:(R,f,u,gy,B,T)=>{for(let i=0;i<5;i++){const q=(T*.35+hs(i))%1,px=R.x+R.w*(1.1-q*1.3)+hs(i+3)*R.w*.3-R.w*.15,py=R.y+R.h*(q*1.1-.15)+hs(i+6)*R.h*.2-R.h*.1,L=u*(1.4+hs(i+8));const gr=g.createLinearGradient(px,py,px+L,py-L*.85);gr.addColorStop(0,'#fff');gr.addColorStop(.3,al(B[2]==='#3a4a9a'?'#bfeeff':B[2],.9));gr.addColorStop(1,'rgba(255,255,255,0)');g.strokeStyle=gr;g.lineWidth=u*.12;g.lineCap='round';g.beginPath();g.moveTo(px,py);g.lineTo(px+L,py-L*.85);g.stroke();circ(px,py,u*.12,'#fff')}},
  shock:(R,f,u,gy,B,T)=>{const cx=B[8]!=null?R.x+R.w*.5:f.x+u*.2,cy=f.y;g.save();g.translate(cx,cy);g.rotate(T*.4);for(let i=0;i<14;i++){g.rotate(TAU/14);const L=u*(1+.6*hs(i+Math.floor(T*9)));g.fillStyle=i%2?'#fff':'#ffe14d';g.beginPath();g.moveTo(-u*.09,0);g.lineTo(0,-L);g.lineTo(u*.09,0);g.fill()}g.restore();circ(cx,cy,u*.3,'#fff');for(let i=0;i<2;i++){const q=(T*1.2+i*.5)%1;g.globalAlpha=1-q;g.beginPath();g.arc(cx,cy,u*(.4+q*1.8),0,TAU);g.strokeStyle='#fff';g.lineWidth=u*.07*(1-q)+1;g.stroke()}g.globalAlpha=1},
  petals:(R,f,u,gy,B,T)=>{for(let i=0;i<18;i++){const q=(T*.22+hs(i))%1,px=R.x+((hs(i+4)*1.3-.15)+q*.25)*R.w,py=R.y+(q*1.2-.1)*R.h;g.save();g.translate(px,py);g.rotate(T*2+i*2);g.globalAlpha=Math.min(1,(1-q)*3);g.beginPath();g.ellipse(0,0,u*.12,u*.06,0,0,TAU);g.fillStyle=i%2?'#ffd9e8':'#ff9ec4';g.fill();g.restore()}},
  rain:(R,f,u,gy,B,T)=>{g.strokeStyle='rgba(191,238,255,.6)';g.lineWidth=Math.max(1,u*.03);for(let i=0;i<40;i++){const q=(T*1.6+hs(i))%1,px=R.x+hs(i+9)*R.w*1.2-q*R.w*.12,py=R.y+q*R.h*1.1-R.h*.05;g.beginPath();g.moveTo(px,py);g.lineTo(px-u*.08,py+u*.4);g.stroke()}},
  stars:(R,f,u,gy,B,T)=>{for(let i=0;i<12;i++){const k=.3+.7*Math.abs(Math.sin(T*2.5+i*1.3)),px=R.x+hs(i)*R.w,py=R.y+hs(i+7)*R.h*.8,r=u*(.12+hs(i+3)*.14)*k;g.beginPath();for(let j=0;j<8;j++){const a=j*TAU/8,rr2=j%2?r*.28:r;g.lineTo(px+Math.cos(a)*rr2,py+Math.sin(a)*rr2)}g.closePath();g.fillStyle=i%2?'#fff':B[2];g.fill()}},
  hole:(R,f,u,gy,B,T)=>{const cx=B[4]<0?R.x+R.w*.5:f.x+u*2.2,cy=B[4]<0?R.y+R.h*.5:f.y-u*.4,r=u*(B[4]<0?1.3:.9);for(let i=6;i>0;i--){g.save();g.translate(cx,cy);g.rotate(T*(.6+i*.1)+i);g.scale(1,.38);g.beginPath();g.arc(0,0,r*(1+i*.28),0,TAU*.8);g.strokeStyle=i%2?al(B[2],.9):'rgba(255,255,255,.7)';g.lineWidth=u*.09;g.stroke();g.restore()}circ(cx,cy,r*.8,'#000');g.beginPath();g.arc(cx,cy,r*.8,0,TAU);g.strokeStyle='#fff';g.lineWidth=u*.05;g.stroke();for(let i=0;i<10;i++){const q=1-((T*.5+hs(i))%1),a=i*TAU/10+T;circ(cx+Math.cos(a)*r*3*q,cy+Math.sin(a)*r*1.3*q,u*.05,'#fff')}},
  /* beam struggle: a blue beam from the left fighter and a red one from the right meet in a ball that slides back and forth */
  struggle:(R,f,u,gy,B,T)=>{const xl=f.x,xr=R.x+R.w-(f.x-R.x),m=R.x+R.w*.5+Math.sin(T*1.7)*R.w*.07,bw=u*(.55+.06*Math.sin(T*24));for(const[x0,x1,c]of[[xl,m,'#3fa9ff'],[xr,m,'#ff3d5a']]){for(const[k,cc]of[[1.6,al(c,.45)],[1,c],[.45,'#fff']]){g.fillStyle=cc;g.beginPath();g.moveTo(x0,f.y);g.lineTo(x0+(x1-x0)*.12,f.y-bw*k/2);g.lineTo(x1,f.y-bw*k/2);g.lineTo(x1,f.y+bw*k/2);g.lineTo(x0+(x1-x0)*.12,f.y+bw*k/2);g.fill()}circ(x0,f.y,bw*.5,'#fff');for(let i=0;i<4;i++){const q=(T*2.2+hs(i+(x0<x1?0:9)))%1;g.strokeStyle='rgba(255,255,255,.85)';g.lineWidth=u*.04;g.beginPath();g.moveTo(x0+(x1-x0)*q,f.y+(hs(i+2)-.5)*bw*2);g.lineTo(x0+(x1-x0)*Math.min(1,q+.12),f.y+(hs(i+2)-.5)*bw*2);g.stroke()}}
   const r=u*(.8+.1*Math.sin(T*15)),gr=g.createRadialGradient(m,f.y,r*.1,m,f.y,r*1.6);gr.addColorStop(0,'#fff');gr.addColorStop(.4,'#ffe14d');gr.addColorStop(1,'rgba(255,225,77,0)');g.fillStyle=gr;g.beginPath();g.arc(m,f.y,r*1.6,0,TAU);g.fill();const sd=Math.floor(T*12);for(let i=0;i<5;i++){const a=hs(sd+i*5)*TAU;zig(m,f.y,m+Math.cos(a)*u*1.5,f.y+Math.sin(a)*u*1.2,u*.5,sd+i*11,'#fff',u*.05)}
   for(let i=0;i<8;i++){const q=(T*.9+hs(i))%1;g.globalAlpha=1-q;g.fillStyle='#fff';g.fillRect(m+(hs(i+3)-.5)*u*3,gy-q*u*3,u*.06,u*.2)}g.globalAlpha=1},
  clones:()=>{},none:()=>{}};
 const FRONT={aura:0};
 const fig=(c,pose,px,gy,sc,d,T,alp,sil)=>{g.save();g.translate(px,gy);g.scale(sc*d*(c.sc||1),sc*(c.sc||1));if(alp!=null)g.globalAlpha=alp;try{drawChar(c,pose,{t:T,sway:.15,ground:true,sil:sil})}catch(e){}g.restore()};
 const AMB={bolt:1,petals:1,rain:1,stars:1,meteor:1,none:1,clones:1};
 const front=(c,px,fy,k,T,ex,win)=>{g.save();g.translate(px,fy);g.scale(k*(c.sc||1),k*(c.sc||1));try{drawFrontChar(c,{t:T,expr:ex||'',win:!!win})}catch(e){}g.restore()};
 const draw2=(id,x,y,w,h)=>{const B=BN2[((id|0)%BN2.length+BN2.length)%BN2.length],an=!!B[7],T=an?G.t:1.3+(id%7)*.37,comp=B[4],fs=B[5].map(i=>CH[i%CH.length]);g.save();try{g.beginPath();g.rect(x,y,w,h);g.clip();const gr=g.createLinearGradient(x,y,x,y+h);gr.addColorStop(0,B[1]);gr.addColorStop(1,B[2]);g.fillStyle=gr;g.fillRect(x,y,w,h);
   (BG[B[3]]||BG.sky)(x,y,w,h,B,T,an);const wide=w>h*1.3,R={x,y,w,h},pw=PW[B[6]]||PW.none,bob=an?Math.sin(T*2.2)*h*.012:0,FBx=[B[0],B[1],B[2],B[3],comp==='pow'?-1:0,comp==='act'?B[8]:'',B[6],B[7],comp==='vs'?1:null];
   if(comp==='bust'||comp==='back'){const left=id%2===0,px=x+w*(wide?(left?.27:.73):.5),ox=x+w*(wide?(left?.7:.3):.5),u=h*.3,c=fs[0];
     if(B[6]==='aura')PW.aura(R,{cx:px,x:px,y:y+h*.5},h*.42,y+h*1.02,FBx,T);else if(AMB[B[6]])pw(R,{cx:ox,x:ox,y:y+h*.45},u,y+h*.95,FBx,T);else pw(R,{cx:ox-u*.4,x:ox-u*.25,y:y+h*.48},u,y+h*.95,[B[0],B[1],B[2],B[3],-1,'',B[6],B[7],null],T);
     g.fillStyle='rgba(10,4,24,.22)';g.beginPath();g.ellipse(px,y+h*1.02,h*.7,h*.2,0,0,TAU);g.fill();
     if(comp==='bust')front(c,px,y+h*1.66+bob,h*1.5/160,T,an&&B[8]==='yell'?(Math.sin(T*9)>0?'yell':'talk'):B[8],false);else{g.save();g.translate(px,y+h*1.58+bob);const k=h*1.45/160*(c.sc||1);g.scale(k,k);try{(window.CBACK||(()=>{}))(c,{t:T})}catch(e){}g.restore()}}
   else if(comp==='vs'){const u=h*.3,m=x+w*.5;g.save();g.beginPath();g.moveTo(m+h*.18,y);g.lineTo(x+w,y);g.lineTo(x+w,y+h);g.lineTo(m-h*.18,y+h);g.closePath();g.fillStyle=al(B[2],.55);g.fill();g.restore();
     const k=h*1.45/125,P=POSE(),ps=(B[6]==='struggle'?P.beam:P.guard).slice();if(an){ps[0]+=Math.sin(T*3)*1.5;ps[2]+=Math.sin(T*3)*3}
     if(B[6]==='struggle'){fig(fs[0],ps,x+w*.14,y+h*.96,h*.8/125,1,T);fig(fs[1],ps,x+w*.86,y+h*.96,h*.8/125,-1,T+.4);PW.struggle(R,{cx:x+w*.14,x:x+w*.14+h*.24,y:y+h*.96-h*.52},h*.26,y+h*.96,FBx,T)}
     else{fig(fs[0],ps,x+w*.2,y+h*1.5+bob,k,1,T);fig(fs[1],ps,x+w*.8,y+h*1.5-bob,k,-1,T+.4);if(B[6]==='bolt'){const sd=an?Math.floor(T*11):4;zig(m+h*.18,y-4,m-h*.18,y+h+4,h*.3,sd,al('#ffffff',.5),h*.09);zig(m+h*.18,y-4,m-h*.18,y+h+4,h*.3,sd,'#fff',h*.035)}else if(B[6]==='shock')PW.shock(R,{cx:m,x:m-u*.2,y:y+h*.5},u,y+h*.95,FBx,T);
      else{g.strokeStyle='#fff';g.lineWidth=h*.03;g.beginPath();g.moveTo(m+h*.18,y);g.lineTo(m-h*.18,y+h);g.stroke()}}}
   else if(comp==='act'){const c=fs[0],P=POSE(),sc=Math.min(h*.86,w*.7)/125,u=sc*40,air=B[8]==='jump',gy=y+h*.95,cx=x+w*(wide?.3:.4),f={cx,x:cx+u*.9,y:gy-u*2.05};let pose=(P[B[8]]||IDLE).slice();
     if(an){if(B[8]==='charge'){pose[0]+=Math.sin(T*20)*.8;pose[11]=Math.sin(T*20)*.6}else if(B[8]==='dash'){const q=Math.sin(T*9);pose[6]+=q*30;pose[8]-=q*30;pose[2]+=q*20}else if(B[8]==='punch'||B[8]==='kick'||B[8]==='slash'){const q0=(T*1.4)%1,q=q0<.25?q0/.25:1,A=B[8]==='punch'?L1A:B[8]==='kick'?L3A:L4A;pose=pose.map((v,i)=>A[i]+(v-A[i])*q)}}
     g.save();g.strokeStyle='rgba(255,255,255,.55)';g.lineWidth=Math.max(1.5,h*.02);for(let i=0;i<6;i++){const ly=y+h*(.25+i*.11),q=an?((T*1.5+hs(i))%1):hs(i+3);g.beginPath();g.moveTo(x+w*(q*.25),ly);g.lineTo(x+w*(q*.25)+w*.14,ly);g.stroke()}g.restore();
     const bk=B[6]==='aura'||B[6]==='slash';if(bk)pw(R,f,u,gy,FBx,T);g.fillStyle='rgba(10,4,24,.3)';g.beginPath();g.ellipse(cx,gy,u*.9,u*.16,0,0,TAU);g.fill();
     if(B[6]==='clones')for(let q=3;q>0;q--)fig(c,pose,cx-q*u*(.9+(an?.25*Math.sin(T*6+q):0)),gy,sc,1,T-q*.1,.6-q*.14,q%2?B[2]:'#ffffff');fig(c,pose,cx,gy,sc,1,T);if(!bk)pw(R,f,u,gy,FBx,T)}
   else if(comp==='team'){pw(R,{cx:x+w/2,x:x+w/2,y:y+h*.4},h*.3,y+h*.95,FBx,T);const k=h*1.02/160;[[.22,1,1],[.78,1,2],[.5,1.16,0]].forEach(q=>{const c=fs[q[2]];if(c)front(c,x+w*q[0],y+h*(q[1]>1?1.2:1.16)+(an?Math.sin(T*2.2+q[2]*1.3)*h*.012:0),k*q[1],T+q[2],'',q[2]===0)})}
   else{const u=h*.34;pw(R,{cx:x+w/2,x:x+w/2,y:y+h*.5},u,y+h*.95,[B[0],B[1],B[2],B[3],-1,'',B[6],B[7],null],T)}
  }catch(e){}g.restore();return true};
 const draw=(id,x,y,w,h)=>{if(V2())return draw2(id,x,y,w,h);const B=BN[((id|0)%BN.length+BN.length)%BN.length],an=!!B[7],T=an?G.t:1.3+(id%7)*.37;g.save();try{g.beginPath();g.rect(x,y,w,h);g.clip();const gr=g.createLinearGradient(x,y,x,y+h);gr.addColorStop(0,B[1]);gr.addColorStop(1,B[2]);g.fillStyle=gr;g.fillRect(x,y,w,h);
   (BG[B[3]]||BG.sky)(x,y,w,h,B,T,an);const wide=w>h*1.5,two=B[8]!=null,sc=Math.min(h*.62,w*(B[6]==='struggle'?.34:.8))/125,u=sc*40,air=B[5]==='jump'||B[5]==='fall',gy=y+h*(air?.66:.93),cx=B[4]<0?x+w*.5:x+w*(B[6]==='struggle'?.17:two?.3:wide?.3:.4),R={x,y,w,h},f={cx,x:cx+u*.9,y:gy-u*2.05};
   const c=B[4]>=0?CH[B[4]%CH.length]:null,P=POSE();let pose=c?(P[B[5]]||IDLE).slice():null;
   if(c&&an){const s=Math.sin(T*3.2);if(B[5]==='stand'||B[5]==='sit'||B[5]==='guard'||B[5]==='win'){pose[0]+=s*1.5;pose[2]+=s*3;pose[3]-=s*4}else if(B[5]==='charge'){pose[0]+=Math.sin(T*20)*.8;pose[11]=Math.sin(T*20)*.6}else if(B[5]==='dash'){const k=Math.sin(T*9);pose[6]+=k*30;pose[8]-=k*30;pose[2]+=k*20}else if(B[5]==='punch'||B[5]==='kick'||B[5]==='slash'){const k=(T*1.4)%1,q=k<.25?k/.25:1;const A=B[5]==='punch'?L1A:B[5]==='kick'?L3A:L4A;pose=pose.map((v,i)=>A[i]+(v-A[i])*q)}else if(B[5]==='jump'||B[5]==='fall'){pose[11]=Math.sin(T*2.4)*8}else{pose[0]+=s}}
   const pw=PW[B[6]]||PW.none;if(B[6]==='aura'||B[6]==='circle'||B[6]==='tornado'||B[6]==='ice'||B[6]==='hole'||B[6]==='meteor'||B[6]==='slash')pw(R,f,u,gy,B,T);
   if(c){g.fillStyle='rgba(10,4,24,.3)';g.beginPath();g.ellipse(cx,y+h*.93,u*.9,u*.16,0,0,TAU);g.fill();if(B[6]==='clones')for(let k=3;k>0;k--)fig(c,pose,cx-k*u*(.9+(an?.25*Math.sin(T*6+k):0)),gy,sc,1,T-k*.1,.6-k*.14,k%2?B[2]:'#ffffff');
    fig(c,pose,cx,gy,sc,1,T);if(two){const c2=CH[B[8]%CH.length],p2=B[5]==='beam'?(()=>{const q=P.beam.slice();return q})():pose;fig(c2,p2,B[6]==='struggle'?x+w*.83:x+w*.7,gy,sc,-1,T+.4)}}
   if(!(B[6]==='aura'||B[6]==='circle'||B[6]==='tornado'||B[6]==='ice'||B[6]==='hole'||B[6]==='meteor'||B[6]==='slash')){if(two&&B[6]==='beam'){const m=x+w*.5;g.save();g.beginPath();g.rect(x,y,m-x,h);g.clip();pw(R,f,u,gy,B,T);g.restore();g.save();g.translate(2*m,0);g.scale(-1,1);g.beginPath();g.rect(x,y,m-x,h);g.clip();pw(R,f,u,gy,[B[0],B[2],B[1]].concat(B.slice(3)),T);g.restore();PW.shock(R,{cx:m,x:m-u*.26,y:f.y},u*1.3,gy,B,T)}else pw(R,f,u,gy,B,T)}
   }catch(e){}g.restore();return true};
 window.COMBO_BAN=function(id,x,y,w,h){if(!ON())return false;return draw(id,x,y,w,h)};
 window.COMBO_BAN_NAME=id=>ON()?(LIST()[((id|0)%BN.length+BN.length)%BN.length][0]):null;
 const ol0=ordList;let OC2=null;ordList=function(kind){if(kind!=='ban'||!ON())return ol0(kind);const own=SV.banners||[],key=own.length+':'+own.join(',');if(OC2&&OC2.key===key)return OC2;const S2=new Set(own),has=i=>S2.has(i),l=BN.map((b,i)=>i);l.sort((a,b)=>(has(b)?1:0)-(has(a)?1:0)||a-b);return OC2={key,l,has}};
 const sp0=SCR.profile;if(sp0)SCR.profile=function(){if(!ON())return sp0();const t0=txt;txt=function(s){if(typeof s==='string'){if(s.indexOf('Banner: ')===0)arguments[0]='Banner: '+LIST()[(SV.banner|0)%BN.length][0]+s.slice(s.indexOf('   ·   '));else if(s.indexOf('Banners: ')===0)arguments[0]='Banners: '+SV.banners.length+' / '+BN.length+' (GOLD tab in the gacha)'}return t0.apply(this,arguments)};const np2=Math.max(1,Math.ceil(BN.length/30)),pg0=pager;G.pg3=clamp(G.pg3|0,0,np2-1);pager=function(x,y,key,np){return pg0(x,y,key,key==='pg3'?np2:np)};try{sp0()}finally{txt=t0;pager=pg0}if(G.note&&typeof G.note.t==='string'&&G.note.t.indexOf(' banner drops from summons')>0)G.note.t='Get this banner in the GOLD tab of the gacha'};
 const sync=()=>{try{const on=ON();if(!window.LIVE_READY)return;if(on&&!SV.bnr){const src=SV.cos0||SV;SV.bn0={banners:(src.banners||[0]).slice(),banner:src.banner|0};if(SV.cos0){SV.cos0.banners=[0];SV.cos0.banner=0}SV.banners=[0];SV.banner=0;SV.bnr=1;save()}
   else if(!on&&SV.bnr){const b=SV.bn0||{banners:[0,1,2],banner:0};if(SV.cosr&&SV.cos0){SV.cos0.banners=b.banners;SV.cos0.banner=b.banner;SV.banners=[0,1,2];SV.banner=0}else{SV.banners=b.banners;SV.banner=b.banner}delete SV.bnr;delete SV.bn0;save()}}catch(e){}};
 const un0=update;let tn=0;update=function(rdt){un0(rdt);tn+=rdt;if(tn>.5){tn=0;sync()}}}
/* bordpage (own flag, border50 was already released): the ICON BORDERS list in the profile shows 30 per page with its own page counter, so all 50 fit, and its texts say where borders come from now. */
{const d0=drawBorders;drawBorders=function(gx){if(!F().bordpage)return d0(gx);const cols=10,per=30,ts=Math.min(46,(W-gx-14-9*(cols-1))/cols),own=new Set(SV.borders),np=Math.max(1,Math.ceil(BD.length/per));G.pgb=clamp(G.pgb|0,0,np-1);
  txt('ICON BORDER',gx,68,16,'#ffe14d',INK,'left');txt(SV.borders.length+' / '+BD.length+' owned  ·  get them in the GOLD tab of the gacha',W-14,68,12,'#e6dcff',null,'right',FU);
  for(let k=0;k<per;k++){const i=G.pgb*per+k,B=BD[i];if(!B)break;const x=gx+4+(k%cols)*(ts+9),y=92+(k/cols|0)*(ts+34),ow=own.has(i),foc=hit(x-4,y-8,ts+8,ts+30,()=>{if(ow){SV.border=i;save();netHello()}else G.note={t:'Get the '+B[0]+' border in the GOLD tab of the gacha',T:2.4}});
   g.save();g.globalAlpha=ow?1:.3;drawIcon(CH[SV.icon]||CH[0],x,y,ts,i,1,ow?null:'#05030c');g.restore();txt(B[0],x+ts/2,y+ts+16,Math.min(10,ts*1.5/B[0].length+3),SV.border===i?'#ffe14d':foc?'#fff':'#e6dcff',INK,'center',FU,2.5);if(SV.border===i||foc){rr(x-4,y-8,ts+8,ts+30,6);g.strokeStyle=foc?'#ffe14d':'#fff';g.lineWidth=1.5;g.stroke()}}
  const py=92+3*(ts+34)+2;txt('borders',gx+(W-gx-14)/2-108,py+16,11,'#e6dcff',null,'right',FU);pager(gx+(W-gx-14)/2-78,py,'pgb',np)}}
/* maintenance (Dev Studio switch, see live.js): while window.COMBO_MAINT is set, everyone but the owner is sent from the lobby back to the start screen with a SERVER UNDER MAINTENANCE box,
   and after the connecting step (or right away without it) the start screen shows the same box in place of letting them in. The state is fetched again each time start is tapped.
   Only someone signed in to the Dev Studio (the owner) still gets in. */
{const own=()=>{try{return!!(window.COMBO_LIVE&&window.COMBO_LIVE.owner)}catch(e){return false}},MT=()=>!!window.COMBO_MAINT&&!own();let box=0;
 const gm0=goto;goto=function(m){if(m==='menu'&&G.mode==='title'){if(!G.cnn){try{if(window.COMBO_MCHK)window.COMBO_MCHK()}catch(e){}}if(MT()&&(G.cnn||!F().conn)){box=performance.now();try{sfx('ui')}catch(e){}return}}return gm0(m)};
 /* matchmaking is off for everyone while maintenance is on, the owner too, and no bot is matched either: a search is never started and a running search is stopped */
 const stopQ=()=>{try{netClose()}catch(e){}G.net=null;G.note={t:'SERVER UNDER MAINTENANCE. Matchmaking is off.',T:3.2};if(G.mode==='online')gm0('menu')};
 const nq0=netQueue;netQueue=function(type){if(window.COMBO_MAINT){stopQ();return}return nq0.apply(this,arguments)};
 const um0=update;update=function(rdt){um0(rdt);if(window.COMBO_MAINT&&G.net&&G.net.st==='search')stopQ();if(MT()&&(G.mode==='menu'||G.mode==='news')){box=performance.now();G.set2=false;gm0('title')}};
 const tm0=SCR.title;SCR.title=function(){tm0();if(!box||G.mode!=='title')return;const e=performance.now()-box;if(e>9000){box=0;return}g.setTransform(S*dpr,0,0,S*dpr,0,0);const w=Math.min(480,W-40),h=64,x=(W-w)/2,y=H*.34;g.save();g.globalAlpha=clamp(e/250,0,1)*clamp((9000-e)/500,0,1);
  rr(x,y,w,h,14);g.fillStyle='rgba(16,8,34,.94)';g.fill();g.strokeStyle='#ff5a6e';g.lineWidth=3;g.stroke();txt('SERVER UNDER MAINTENANCE',W/2,y+33,Math.min(26,w*.058),'#ffe14d',INK,'center',FB,6);g.restore()}}
/* drops (asked for by Trey, 2026-11-21): the exchange shop, the GOLD tab and gold (yellow) tickets are deleted.
   - Winning a match in any mode (not training) has a 1 in 2 chance of EXP items (SMALL EXP x5 or BIG EXP x1; amounts picked by Claude).
   - Winning a Boss Raid or a Ranked match has a 1 in 4 chance of one profile banner or icon border the player does not own yet. Only EXP can repeat.
   - Gold tickets: the count is set to 0 (the old count is kept in SV.ytxb and comes back if the update is pulled back), nothing pays them, and they are taken out of the top bar and the texts. */
{const ON=()=>!!F().drops;
 const needB=()=>{const hb=new Set(SV.banners);return(window.COMBO_BAN_NAME&&window.COMBO_BAN_NAME(0)?window.COMBO_BN50.map((q,i)=>i):pools()[1]).filter(i=>!hb.has(i))},needD=()=>BD.map((q,i)=>i).filter(i=>!SV.borders.includes(i));
 const roll=(win,type)=>{const out=[];if(!win||type==='training')return out;if(Math.random()<.5){const big=Math.random()<.5,n=big?1:5;SV.items=SV.items||{};SV.items[big?'b':'s']=(SV.items[big?'b':'s']|0)+n;out.push({kind:'exp',id:big?'b':'s',n})}
   if((type==='raid'||type==='ranked')&&Math.random()<.25){const b=needB(),d=needD(),ks=[];if(b.length)ks.push('banner');if(d.length)ks.push('border');if(ks.length){const k=ks[Math.floor(Math.random()*ks.length)],p=k==='banner'?b:d,id=p[Math.floor(Math.random()*p.length)];(k==='banner'?SV.banners:SV.borders).push(id);out.push({kind:k,id})}}return out};
 window.COMBO_DROPROLL=roll;
 const fi0=finish;finish=function(win){const r=fi0.apply(this,arguments);try{if(ON()&&G.res){if(G.res.yt){SV.ytx=Math.max(0,(SV.ytx||0)-G.res.yt);G.res.yt=0}G.res.drops=roll(!!G.res.win,G.rules&&G.rules.type);save()}}catch(e){}return r};
 const tile=(it,x,y,sz)=>{if(it.kind==='exp'){const big=it.id==='b';rr(x,y,sz,sz,sz*.16);g.fillStyle=big?'#8a3fb8':'#2f6fb8';g.fill();g.strokeStyle='#fff';g.lineWidth=2;g.stroke();txt('EXP',x+sz/2,y+sz*.4,sz*.3,'#fff',INK,'center',FB,3);txt('×'+it.n,x+sz/2,y+sz*.74,sz*.26,'#ffe14d',INK,'center',FB,3);return(big?'BIG':'SMALL')+' EXP ×'+it.n}
   if(it.kind==='banner'){g.save();rr(x,y,sz,sz,sz*.16);g.clip();banBG(it.id,x,y,sz,sz);g.restore();rr(x,y,sz,sz,sz*.16);g.strokeStyle='#fff';g.lineWidth=2;g.stroke();return'NEW BANNER: '+((window.COMBO_BAN_NAME&&window.COMBO_BAN_NAME(it.id))||String((CH[it.id]||CH[0]).wn||'').toUpperCase())}
   drawIcon(CH[SV.icon|0]||CH[0],x,y,sz,it.id,1);return'NEW BORDER: '+(BD[it.id]||BD[0])[0]};
 const dr0=drawResult;drawResult=function(){dr0();try{const D=ON()&&G.res&&G.res.drops;if(!D||!D.length)return;g.setTransform(S*dpr,0,0,S*dpr,0,0);const sz=34,y=H-sz-8;g.font='700 13px '+FU;const ws=D.map(it=>sz+10+g.measureText(it.kind==='exp'?'SMALL EXP ×10':'NEW BANNER: XXXXXXXXXXXXXX').width),tot=ws.reduce((a,b)=>a+b,0)+64;let x=(W-tot)/2;
   rr(x-12,y-6,tot+24,sz+12,12);g.fillStyle='rgba(10,4,24,.78)';g.fill();g.strokeStyle='#ffe14d';g.lineWidth=2;g.stroke();txt('DROPS',x+24,y+sz/2+1,15,'#ffe14d',INK,'center',FB,4);x+=64;D.forEach((it,i)=>{const nm=tile(it,x,y,sz);txt(nm,x+sz+8,y+sz/2+1,13,'#fff',INK,'left',FU,3);x+=ws[i]})}catch(e){}};
 /* gold tickets out of the top bar: the ticket pill is the first pill drawn after the NEWS label; it is drawn narrower and the red ticket part moves right */
 const ge0=gems;gems=function(){if(!ON())return ge0();const r0=rr,ti0=tixIcon,t0=txt;let st=0,d=0;
   txt=function(s){if(s==='NEWS'&&st===0)st=1;else if(st===3){st=4;return}else if(st===2&&d&&arguments[6]==='left')arguments[1]+=d;return t0.apply(this,arguments)};
   rr=function(x,y,w,h,rad){if(st===1&&h===34&&rad===17){st=2;d=g.measureText(fmtG(SV.ytx||0)).width+30;return r0(x+d,y,w-d,h,rad)}return r0.apply(this,arguments)};
   tixIcon=function(x,y,k,col){if(st>=2&&col==='#ffb020'){st=3;return}if(st===2)return ti0(x+d,y,k,col);return ti0.apply(this,arguments)};
   try{const tx=ge0();return typeof tx==='number'?tx+d:tx}finally{rr=r0;tixIcon=ti0;txt=t0}};
 /* texts that mention gold tickets, the exchange or the gold tab */
 const fix=s=>{if(s.indexOf('ellow')<0&&s.indexOf('GOLD tab')<0&&s.indexOf('YELLOW')<0)return s;return s.replace(' + 1 yellow ticket','').replace('Win = 5 red + 5 yellow tickets + 300 gems.','Win = 5 red tickets + 300 gems.').replace(' Yellow tickets are for the ticket exchange in GACHA.','').replace(' and 1,000,000,000 yellow tickets for the exchange shop','')
   .replace('(GOLD tab in the gacha)','(win Boss Raids and Ranked matches)').replace('get them in the GOLD tab of the gacha','win Boss Raids and Ranked matches to get them').replace(' in the GOLD tab of the gacha',' by winning Boss Raids and Ranked matches').replace(/\+[\d,]+ yellow tickets?\s*·\s*/,'')};
 const tx0=txt;txt=function(s){if(typeof s==='string'&&ON())arguments[0]=fix(s);return tx0.apply(this,arguments)};
 const bt0=button;button=function(x,y,w,h,l,col,fn,size,desc){if(ON()&&typeof desc==='string')arguments[8]=fix(desc);return bt0.apply(this,arguments)};
 const wr0=wrap;wrap=function(s){if(typeof s==='string'&&ON())arguments[0]=fix(s);return wr0.apply(this,arguments)};
 /* gacha: no EXCHANGE / GOLD tab */
 const gg0=SCR.gacha;if(gg0)SCR.gacha=function(){if(!ON())return gg0();if(G.gtab===2)G.gtab=0;G.csr=null;const b0=button;button=function(x,y,w,h,l){if(l==='EXCHANGE'||(l==='GOLD'&&h===26))return false;return b0.apply(this,arguments)};try{gg0()}finally{button=b0}};
 /* challenges: no gold ticket reward shown */
 const ch0=SCR.chal;if(ch0)SCR.chal=function(){if(!ON())return ch0();const ti0=tixIcon,t0=txt;let sk=false;tixIcon=function(x,y,k,col){if(col==='#ffb020'){sk=true;return}return ti0.apply(this,arguments)};txt=function(s){if(sk){sk=false;if(typeof s==='string'&&/^x\d+$/.test(s))return}return t0.apply(this,arguments)};try{ch0()}finally{tixIcon=ti0;txt=t0}};
 const sm0=SCR.mail;if(sm0)SCR.mail=function(){if(!ON())return sm0();const hid=[];try{MAILS.forEach(m=>{if(m&&m.ytx){hid.push([m,m.ytx]);m.ytx=0}})}catch(e){}try{sm0()}finally{hid.forEach(q=>{q[0].ytx=q[1]})}};
 const sync=()=>{try{if(!window.LIVE_READY)return;if(ON()){if(SV.ytxb==null){SV.ytxb=SV.ytx||0;SV.ytx=0;save()}else if(SV.ytx){SV.ytx=0;save()}if(G.note&&typeof G.note.t==='string')G.note.t=fix(G.note.t)}else if(SV.ytxb!=null){SV.ytx=(SV.ytx||0)+SV.ytxb;delete SV.ytxb;save()}}catch(e){}};
 const ud0=update;let td=0;update=function(rdt){ud0(rdt);td+=rdt;if(td>.3){td=0;sync()}}}
/* fresh: a game that was already open keeps running the files it started with, so an update released after new files went up did nothing until the page was opened again.
   With the flag on the game asks the server which files it is serving (/health, field v) when it starts and every 40 seconds; when that changes it reloads the page the next time the player is on the start screen, the lobby or the NEWS (never in a match, a cutscene, a summon or the Dev Studio). */
{let v0=null,need=false,busy=false,last=0;const ask=()=>{if(busy||!window.COMBO_SRV)return;busy=true;last=performance.now();fetch('health?c='+Date.now(),{cache:'no-store'}).then(r=>r.ok?r.json():null).then(q=>{const v=q&&q.v;if(typeof v==='string'&&v){if(v0==null)v0=v;else if(v!==v0)need=true}}).catch(()=>{}).then(()=>{busy=false})};
 const uf0=update;update=function(rdt){uf0(rdt);try{const now=performance.now();if(v0==null?now-last>4000:now-last>40000)ask();if(need&&F().fresh&&!G.cnn&&!G.cf&&(G.mode==='title'||G.mode==='menu'||G.mode==='news')){need=false;try{save()}catch(e){}location.reload()}}catch(e){}};
 try{window.COMBO_FRESH=()=>({v0,need})}catch(e){}}
/* sndback: sound comes back after leaving the game and returning to the same tab. Phones pause the game's sound engine when the tab goes to the background and often leave it silent afterwards.
   With the flag on the game pauses the engine itself when the tab is hidden, starts it again when the tab is shown, and tries again on the next taps and every half second until it is really running. */
{const ON=()=>!!F().sndback;let want=false,tick=0;
 const kick=()=>{try{if(!ON()||typeof AC==='undefined'||!AC)return;if(AC.state!=='running'){const p=AC.resume();if(p&&p.catch)p.catch(()=>{})}else want=false}catch(e){}};
 const hide=()=>{try{if(!ON()||typeof AC==='undefined'||!AC)return;want=true;if(AC.state==='running'){const p=AC.suspend();if(p&&p.catch)p.catch(()=>{})}}catch(e){}};
 try{document.addEventListener('visibilitychange',()=>{if(document.hidden)hide();else{want=true;kick()}});window.addEventListener('pagehide',hide);window.addEventListener('pageshow',()=>{want=true;kick()});window.addEventListener('focus',()=>{want=true;kick()});
  ['pointerdown','pointerup','touchend','click','keydown'].forEach(ev=>window.addEventListener(ev,()=>{if(want||(typeof AC!=='undefined'&&AC&&AC.state!=='running'))kick()},true))}catch(e){}
 const us0=update;update=function(rdt){us0(rdt);if(!want)return;tick+=rdt;if(tick>.5){tick=0;if(!document.hidden)kick()}};
 try{window.COMBO_SND=()=>({state:typeof AC!=='undefined'&&AC?AC.state:null,want})}catch(e){}}
/* devquiet: the Dev Studio has no music (story.js wantTrack) and leaving it (BACK or Escape) goes to the start screen, where start connects as usual. TEST still comes back to the studio. */
{const gq0=goto;goto=function(m){if(F().devquiet&&G.mode==='dev'&&m==='menu'){G.set2=false;return gq0('title')}return gq0(m)}}
/* tlayout: custom layout for the mobile buttons. Configure, CONTROLS, MOBILE gets a CUSTOM LAYOUT button that opens an editor: drag each button anywhere, and change the size and see-through of the one that is selected.
   Saved per button in SV.tl[action]=[x as a share of the screen width, y as a share of the height, size multiplier, opacity]. With the flag off the saved layout is ignored. The move stick is not a button (drag anywhere on the left half), so it is not in the editor. */
{const ON=()=>!!F().tlayout,get=a=>(SV.tl&&Array.isArray(SV.tl[a]))?SV.tl[a]:null;let OP={};
 const tb0=tbs;tbs=function(){const L=tb0();if(!ON())return L;OP={};L.forEach(b=>{const q=get(b.a);if(q){b.x=clamp(+q[0]||0,0,1)*cw;b.y=clamp(+q[1]||0,0,1)*ch;b.r=b.r*clamp(+q[2]||1,.5,2);b.o=clamp(+q[3]||1,.2,1)}else b.o=1;OP[Math.round(b.x)+','+Math.round(b.y)]=b.o});return L};
 const dt0=drawTouch;drawTouch=function(){if(!ON())return dt0();const si0=skillIcon,c0=circ,al=(x,y)=>{const o=OP[Math.round(x)+','+Math.round(y)];if(o!=null&&o<1)g.globalAlpha=g.globalAlpha*o};
   skillIcon=function(x,y){al(x,y);return si0.apply(this,arguments)};circ=function(x,y){al(x,y);return c0.apply(this,arguments)};try{dt0()}finally{skillIcon=si0;circ=c0}};
 /* editor */
 const E={sel:null,drag:null};const put=(b,ch2)=>{SV.tl=SV.tl||{};const q=get(b.a)||[b.x/cw,b.y/ch,1,1];ch2(q);SV.tl[b.a]=q};
 const base=a=>tb0().find(b=>b.a===a);
 SCR.tlay=function(){scr();const L=tbs();g.setTransform(dpr,0,0,dpr,0,0);g.fillStyle='rgba(6,2,18,.55)';g.fillRect(0,0,cw,ch);
   L.forEach(b=>{const sel=E.sel===b.a;g.globalAlpha=b.o;c0d(b.x,b.y,b.r,sel?'rgba(255,225,77,.3)':'rgba(20,10,40,.6)',sel?'#ffe14d':'rgba(255,255,255,.7)',3);txt(b.l,b.x,b.y+1,b.r*(b.l.length>3?.5:.62),'#fff',INK);g.globalAlpha=1;if(sel){g.setLineDash([6,5]);c0d(b.x,b.y,b.r+7,null,'#ffe14d',2);g.setLineDash([])}});
   g.setTransform(S*dpr,0,0,S*dpr,0,0);const sb=L.find(b=>b.a===E.sel),q=sb?(get(sb.a)||[0,0,1,1]):null,bw=Math.min(104,(W-28-6*6)/7),x0=(W-(bw*7+36))/2,y=10,B=(i,l,c,fn,d)=>button(x0+i*(bw+6),y,bw,34,l,c,fn,14,d);
   B(0,'DONE','#2f7a5f',()=>{save();E.sel=null;goto('binds')});B(1,'RESET ALL','#7a1f2b',()=>{delete SV.tl;E.sel=null;save()});
   const ch1=(i,d)=>()=>{if(!sb){G.note={t:'Tap a button first',T:1.6};return}put(sb,q2=>{q2[i]=clamp(Math.round(((+q2[i]||1)+d)*10)/10,i===2?.5:.2,i===2?2:1)});save()};
   B(2,'SIZE −','#3a2a5e',ch1(2,-.1));B(3,'SIZE +','#3a2a5e',ch1(2,.1));B(4,'FADE −','#3a2a5e',ch1(3,-.1));B(5,'FADE +','#3a2a5e',ch1(3,.1));B(6,'RESET ONE','#5a3a1f',()=>{if(sb&&SV.tl){delete SV.tl[sb.a];save()}});
   txt(sb?sb.l+'   ·   size '+Math.round((q[2]||1)*100)+'%   ·   see-through '+Math.round((q[3]||1)*100)+'%':'Drag a button to move it. Tap one to pick it, then change its size or how see-through it is.',W/2,58,13,'#fff',INK,'center',FU,3);
   txt('MOVE: drag anywhere on the left half (it has no button)',W*.2,H-16,11,'#e6dcff',INK,'center',FU,3);
   if(G.note){g.save();g.font='700 15px '+FU;const nw=g.measureText(G.note.t).width+30;rr((W-nw)/2,H*.5-17,nw,34,10);g.fillStyle='rgba(10,4,24,.94)';g.fill();txt(G.note.t,W/2,H*.5,15,'#fff',null,'center',FU);g.restore()}};
 const c0d=(x,y,r,f,st,lw)=>circ(x,y,r,f,st,lw);
 try{BACK.tlay='binds'}catch(e){}
 const onUI=(x,y)=>G.ui.some(u=>x>=u.x&&x<=u.x+u.w&&y>=u.y&&y<=u.y+u.h);
 try{cv.addEventListener('pointerdown',e=>{if(G.mode!=='tlay'||!ON())return;const p=PXY(e),x=p[0],y=p[1];if(onUI(x/S,y/S))return;let best=null,bd=1e9;tbs().forEach(b=>{const d=Math.hypot(x-b.x,y-b.y);if(d<b.r*1.25&&d<bd){bd=d;best=b}});if(!best){E.sel=null;return}E.sel=best.a;E.drag={id:e.pointerId,a:best.a,dx:best.x-x,dy:best.y-y}});
  cv.addEventListener('pointermove',e=>{const D=E.drag;if(!D||D.id!==e.pointerId||G.mode!=='tlay')return;const p=PXY(e),b=tbs().find(q=>q.a===D.a);if(!b)return;const nx=clamp((p[0]+D.dx)/cw,.03,.97),ny=clamp((p[1]+D.dy)/ch,.16,.97);put(b,q=>{q[0]=nx;q[1]=ny})});
  const up=e=>{if(E.drag&&E.drag.id===e.pointerId){E.drag=null;try{save()}catch(x){}}};cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up)}catch(e){}
 const sb0=SCR.binds;if(sb0)SCR.binds=function(){sb0();if(!ON()||(G.btab||0)!==1)return;const has=SV.tl&&Object.keys(SV.tl).length;button(W/2-200,102+236,400,38,'CUSTOM LAYOUT','#2f4f8f',()=>{E.sel=null;goto('tlay')},20,has?'ON':'Drag, size, see-through')};
 try{window.COMBO_TLAY=E}catch(e){}}
/* arena3d (asked for by Trey 2026-11-21: "a mode in offline for a 3D battle like Tekken"; he chose drawn fighters in a 3D arena, 3 vs 3 teams, and both ways of moving as two modes).
   Two buttons on the OFFLINE screen: 3D SIDESTEP and 3D FREE RUN. Both are a normal offline team match (same fighters, moves, swaps, assists, rewards) played in a round arena:
   the two fighters always stay side-on to the camera, like Tekken, and stepping around the opponent turns the whole arena (floor rings, tiles and pillars are drawn in perspective and rotate).
   - SIDESTEP: tap up (into the screen) or down (toward the camera): a quick step that cannot be hit for 0.28 s, then 0.6 s before the next one.
   - FREE RUN: hold up or down to keep circling the opponent; shots and other hits that land far from the attacker miss while circling, close hits still land.
   Up/down are W / S or the arrow keys, or the move stick pushed up / down (W and the up arrow do not jump here; jump is its own key or button). Crouching (and low attacks) is switched off in these modes because down is used for stepping. The CPU steps and circles too.
   Numbers picked by Claude. rules.a3 = 'step' | 'free' marks the match. */
{const ON=()=>!!F().arena3d,/* Trey, later the same night: delete the two modes and use the 3D view for every other mode. With the flag on, every match (offline, online, ranked, raids, story fights, tests) is shown over your fighter's shoulder; the 3D SIDESTEP and 3D FREE RUN buttons are gone. Online keeps the normal rules (no circling dodge, crouch allowed) so both players' games agree. */
 /* Trey, later: make the animations 3D too (he chose match intros and win shots, ultimates, fighting moves, the summon and cutscenes). Match intros, knockouts and the summon duel now also play in this view; VI() is whose shoulder the camera is over: yours in a fight, the listener's while someone speaks in an intro, the loser's at a knockout, so the camera swings round to show the speaker or the winner from the front. */
 A=()=>ON()&&G.f&&G.f.length===2&&G.f[0]&&G.f[1]&&G.f[0].c&&G.f[1].c&&(G.mode==='fight'||G.mode==='ko'||G.mode==='intro'||(G.mode==='summon'&&G.sm&&G.sm.duel))?'free':null,VI=()=>S3.vi===0||S3.vi===1?S3.vi:(G.me||0),NET=()=>!!(G.rules&&G.rules.online),S3={ang:0,tg:0};
 const dirIn=()=>{let d=0;try{if(keys.KeyW||keys.ArrowUp)d-=1;if(keys.KeyS||keys.ArrowDown)d+=1;if(typeof joy!=='undefined'&&joy){const dx=joy.x-joy.ox,dy=joy.y-joy.oy;if(Math.abs(dx)<60){if(dy>46)d+=1;else if(dy<-46)d-=1}}}catch(e){}return clamp(d,-1,1)};
 const live=f=>G.mode==='fight'&&f.hp>0&&(f.state==='idle'||f.state==='run'||f.state==='guard'||f.state==='crouch');
 const step=(f,d)=>{if(!live(f)||(f.a3cd||0)>0)return false;f.a3s={t:0,d};f.a3cd=.6;f.inv=Math.max(f.inv||0,.28);S3.tg+=d*(f.side?-1:1)*.55;try{sfx('dash')}catch(e){}return true};
 /* W and the up arrow normally also jump; in these modes they only step, and jump stays on its own key (Space) */
 const ka0=keyAct;keyAct=function(code){if(A()&&(code==='KeyW'||code==='ArrowUp'))return null;return ka0.apply(this,arguments)};
 const sf0=stepF;stepF=function(f,o,dt){const m=A();if(m&&f.inp&&!NET()){if(f.inp.crouch)f.inp.crouch=false;if(f.state==='crouch')f.state='idle'}return sf0.apply(this,arguments)};
 /* 3D look (Trey: make the character and the camera move with it): the camera leans, pushes in and swings sideways with every step or circle, the far background slides the other way,
    the stepping fighter visibly comes toward the camera or goes into the screen (bigger or smaller, turned a little), and the other fighter shifts the opposite way. */
 const CM={rot:0,z:1,x:0,y:0};let prevD=0;const up0=update;update=function(rdt){cam.rot-=CM.rot;cam.z/=CM.z;cam.x-=CM.x;cam.y-=CM.y;CM.rot=0;CM.z=1;CM.x=0;CM.y=0;up0(rdt);const m=A();if(!m){prevD=0;return}try{const dt=Math.min(.05,rdt)*(G.slow||1),me=G.f[G.me||0],en=G.f[1-(G.me||0)],d=dirIn();
   G.f.forEach(f=>{f.a3cd=Math.max(0,(f.a3cd||0)-dt);if(f.a3s){f.a3s.t+=dt;if(f.a3s.t>.34)f.a3s=null}f.a3z=f.a3z||0});
   if(m==='step'){if(d&&!prevD)step(me,d);me.a3c=0}else{const cd=Math.abs(S3.circ||0)>.3?Math.sign(S3.circ):0;me.a3c=cd&&live(me)?cd:0;if(me.a3c)S3.tg+=me.a3c*(me.side?-1:1)*1.5*dt}
   prevD=d;
   /* CPU */
   if(G.mode==='fight'&&en.hp>0){en.a3t=(en.a3t||0)-dt;const D=G.cd|0,near=Math.abs(en.x-me.x)<260;
    if(m==='step'){if(en.a3t<=0){en.a3t=.25;if(me.state==='atk'&&near&&Math.random()<[.03,.07,.12,.2][D])step(en,Math.random()<.5?1:-1);else if(Math.random()<.012*(D+1))step(en,Math.random()<.5?1:-1)}en.a3c=0}
    else{if(en.a3t<=0){en.a3t=rnd(.5,1.4);en.a3w=Math.random()<[.15,.25,.35,.45][D]?(Math.random()<.5?1:-1):0}en.a3c=live(en)&&!NET()?(en.a3w||0):0;if(en.a3c)S3.tg+=en.a3c*(en.side?-1:1)*1.5*dt}}
   G.f.forEach((f,i)=>{const o=G.f[1-i],mine=f.a3s?Math.sin(f.a3s.t/.34*Math.PI)*f.a3s.d*62:(f.a3c||0)*40,theirs=o.a3s?Math.sin(o.a3s.t/.34*Math.PI)*o.a3s.d*62:(o.a3c||0)*40,want=mine-theirs*.45;f.a3z=lerp(f.a3z,want,Math.min(1,dt*(f.a3s||o.a3s?30:10)))});
   /* how far each fighter has turned its body (0 = side-on, 1 = fully turned) and which way */
   G.f.forEach(f=>{const on=(f.a3s&&Math.sin(f.a3s.t/.34*Math.PI)>.22)||(m!=='free'&&f.a3c);if(f.a3s)f.a3td=f.a3s.d;else if(f.a3c)f.a3td=f.a3c;f.a3tn=lerp(f.a3tn||0,on&&live(f)?1:0,Math.min(1,dt*(f.a3s?26:12)))});
   S3.ang=lerp(S3.ang,S3.tg,Math.min(1,dt*9));{/* FREE RUN works like Naruto Storm (Trey): while the two are apart the camera sits behind your fighter (you see their back, the opponent faces you in the distance); when they close in or someone attacks or is hit it swings round to the side-on fighting view, like Tekken, where every move plays as usual. */
    const close=Math.abs(me.x-en.x)<235||[me,en].some(f=>['atk','hit','launch','down','getup','stun','pin'].includes(f.state))||G.cine;S3.close=close;
    /* Trey, later: over the shoulder the whole time in FREE RUN, so the camera no longer swings side-on to fight *//* every side of the fighters (Trey: make sure it is 3D on the sides, front and backwards): the camera goes round the fighters instead of jumping. When it has to change shoulder (the speaker changes in an intro, someone wins, the two cross over) it swings out to the side view, where the fighters are drawn side-on, carries on round through the three-quarter view, and settles behind the other shoulder; the front, three-quarter, side and back drawings are picked from the camera angle at every moment. */
    {let vi=null;try{if(G.mode==='intro'&&G.intro){const sp=G.intro.sp,ix=sp===G.f[0]?0:sp===G.f[1]?1:-1;vi=ix>=0?1-ix:S3.vi}else if(G.mode==='ko'){vi=G.f[0].hp<=0?0:G.f[1].hp<=0?1:null}}catch(e){}S3.vi=vi}
    const vw=G.f[VI()],vo=G.f[1-VI()],want=Math.sign(vo.x-vw.x)||1;if(S3.sd==null||!S3.sd)S3.sd=want;let tgt=1.3,spd=3.2;if(Math.sign(S3.sd)!==want){tgt=.1;spd=5.5;if((S3.phi||0)<.24)S3.sd=want}else S3.sd=want;
    S3.phi=lerp(S3.phi==null?.3:S3.phi,tgt,Math.min(1,dt*spd))}
   {const v=clamp((S3.tg-S3.ang)*2.2,-1,1),dz=(G.f[0].a3z-G.f[1].a3z)/52;S3.v=lerp(S3.v||0,v,Math.min(1,dt*8));S3.dz=lerp(S3.dz||0,dz,Math.min(1,dt*8));
    S3.osq=m==='free'?clamp(((S3.phi||0)-.45)/.6,0,1):0;
    /* the same camera movement in every view (Trey): fights, intros, knockouts and the summon duel all get the bob, lean, push-in and hit shake */if(!G.cine){CM.rot=S3.v*.045+S3.dz*.012;CM.z=1+Math.abs(S3.v)*.07+Math.abs(S3.dz)*.03;CM.x=S3.v*46;
     /* make it feel 3D (Trey): in FREE RUN the camera looks down from higher up (more floor, the far fighter stands higher on the screen), bobs with your steps, leans into turns, pushes in as you close the distance and pulls back as you run apart */
     if(m==='free'){const mv=(me.state==='run'||me.a3c)?1:0,dist=Math.abs(me.x-en.x);S3.mv=lerp(S3.mv||0,mv,Math.min(1,dt*8));CM.y=Math.sin(G.t*11)*2.6*S3.mv;CM.rot+=(S3.circ||0)*.03*S3.mv+Math.sin(G.t*5.5)*.004*S3.mv;CM.z*=1+.1*clamp(1-dist/520,0,1)-.04*S3.mv}
     if(m==='free'){const ha=performance.now()/1000-(S3.hitT||-9);if(ha>=0&&ha<.2){const w=1-ha/.2,hs=S3.hitS||1;CM.z*=1+.055*w*hs;CM.y+=Math.sin(ha*90)*3.5*w*hs;CM.rot+=Math.sin(ha*70)*.006*w*hs}}
     cam.rot+=CM.rot;cam.z*=CM.z;cam.x+=CM.x;cam.y+=CM.y}
    /* ultimates: the camera circles the two fighters for as long as the ultimate lasts */
    try{const uf=G.f.find(f=>f.state==='atk'&&f.mv&&f.c&&f.c.mv&&f.mv===f.c.mv.U);if(uf&&G.mode==='fight'){S3.tg+=(uf.side?-1:1)*1.7*dt;if(!G.cine){cam.z/=CM.z;CM.z*=1.07;cam.z*=CM.z}}}catch(e){}
    /* knockout: the camera pushes in and drifts round the fallen fighter */
    try{if(FF()&&G.mode==='ko'){S3.koT=(S3.koT||0)+dt;const e=EZ(clamp(S3.koT/.6,0,1));cam.z/=CM.z;CM.z*=1+.13*e;cam.z*=CM.z;S3.tg+=.3*dt}else S3.koT=0}catch(e){}}}catch(e){}};
 /* hits: far hits miss a circling fighter in FREE RUN */
 const ah0=applyHit;applyHit=function(a,v,h,sx,dir,force){if(A()==='free'&&!NET()&&v&&v.a3c&&a&&Math.abs(sx-a.x)>130&&!force)return false;const hp0=v?v.hp:0,st0=v?v.state:'';const r=ah0.apply(this,arguments);try{if(A()==='free'&&v&&a&&(v.hp<hp0||(v.state==='hurt'&&st0!=='hurt'))){const n=performance.now()/1000;v.a3h=n;v.a3hb=v.state==='guard'?1:0;v.a3hs=!FF()?1:v.a3hb?.5:clamp((hp0-v.hp)/(v.mhp||v.hp+hp0||1000)*11,.55,1.7);S3.hitS=v.a3hs;S3.hitT=n}}catch(e){}return r};
 /* fighters are drawn nearer or farther while stepping */
 /* 3D camera view (Trey: do a 3D camera view for the 3D arena): the camera looks at the fight from an angle (S3.phi), from the player's side, so the player's fighter stands nearer and bigger and the opponent farther and smaller.
    Each fighter is placed on the arena floor with the same perspective as the floor itself (PJ), and the angle swings when someone steps or circles. Hit sparks and shots are still drawn on the straight line. */
 const K=620,HYO=()=>84*cam.z*(S3.osq||0),PJ=(wx,wd)=>{const z=cam.z,ay=cam.ay,hy=cam.ay-26*z-cam.y*z*.6-HYO(),cx=(G.f[0].x+G.f[1].x)/2,d=Math.max(wd,-K*.86),s=K/(K+d);return[W/2+(cx+wx-cam.x)*z*s,hy+(ay-hy)*s+(s>1?(s-1)*(H-ay)*.9:0),s]};
 /* FREE RUN controls follow the camera: pushing up runs at the opponent and down backs away while the camera is behind you, left and right circle; in the side-on view left and right move and up and down circle */
 const gi0=gatherInput;gatherInput=function(dt){gi0(dt);try{if(A()!=='free'||G.mode!=='fight')return;const me=G.f[G.me||0],en=G.f[1-(G.me||0)],ph=S3.phi||0,ix=PI.mx,iy=-dirIn(),to=Math.sign(en.x-me.x)||1;PI.mx=clamp(Math.round(ix*Math.cos(ph)+iy*Math.sin(ph)*to),-1,1);S3.circ=-iy*Math.cos(ph)+ix*Math.sin(ph)}catch(e){}};
 /* the game's own hit sparks, speed lines, bolts and shots are placed on the arena floor between the two fighters in FREE RUN (they used to stay on the flat fight line); the side-view slash arcs and afterimages are left out there because the fighters are not drawn from the side */
 /* run up and you get closer, back off and you get farther (Trey): distance is stretched in depth so the opponent clearly grows as you close in and shrinks as you back away, and when the two are in reach they stand right at each other instead of being held apart on screen */
 const CL=()=>clamp((Math.abs(G.f[0].x-G.f[1].x)-70)/260,0,1);
 const PX=x=>{const a=G.f[VI()],b=G.f[1-VI()],ph=S3.phi||0,sd=S3.sd||1,osq=S3.osq||0,cx=(G.f[0].x+G.f[1].x)/2,t=clamp((x-a.x)/((b.x-a.x)||1),0,1),xq=x-cx,cl=CL();return PJ(xq*Math.cos(ph)+lerp(-78,62,t)*osq*lerp(.5,1,cl),clamp(xq*Math.sin(ph)*sd*(1+1.25*osq)+lerp(-70,40,t)*osq*cl,-175,900))};
 const each=(list,fn,key)=>{const all=G[key];try{for(const e of all){const x=e.type==='arc'||e.type==='ghost'?null:typeof e.x==='number'?e.x:null;if(e.type==='arc'||e.type==='ghost')continue;G[key]=[e];if(x==null){fn();continue}const p=PX(x),k=clamp(p[2],.5,1.85);g.save();g.translate(cam.x+(p[0]-W/2)/cam.z,(p[1]-cam.ay)/cam.z);g.scale(k*(key==='proj'?.62:1),k);g.translate(-x,0);try{fn()}finally{g.restore()}}}finally{G[key]=all}};
 const fx0=drawFX;drawFX=function(){if(A()!=='free'||(S3.osq||0)<.5)return fx0();try{each(G.fx,fx0,'fx')}catch(e){}};
 const pj0=drawProj;drawProj=function(){if(A()!=='free'||(S3.osq||0)<.5)return pj0();try{each(G.proj,pj0,'proj')}catch(e){}};
 try{const ot0=drawOTS;drawOTS=function(){if(A())return;return ot0.apply(this,arguments)}}catch(e){}
 /* fights that read as fights (Trey: 3D animations where they feel like they are fighting, engaging, professional). Every strike has a wind-up (the fighter pulls back and coils), a fast snap that overshoots, a short hold on contact and a recovery, instead of one smooth swing */
 /* own flag "fightfeel": 3D Battle View was already released in the Claude page studio when this was added */
 const FF=()=>!!F().fightfeel,EZ=x=>x*x*(3-2*x),AC=u=>!FF()?Math.sin(clamp(u,0,1)*Math.PI):u<.2?-.24*Math.sin(u/.2*Math.PI*.5):u<.4?lerp(-.24,1.1,EZ((u-.2)/.2)):u<.58?lerp(1.1,1,(u-.4)/.18):1-EZ(clamp((u-.58)/.42,0,1));
 const BURST=(f,sc)=>{const ha=performance.now()/1000-(f.a3h||-9);if(ha<0||ha>.24)return;const w=ha/.24,bl=f.a3hb,R=(bl?26:44)*sc*(.5+w*.9),cy=f.y-92*sc,col=bl?'#8fd0ff':'#ffe14d';g.save();g.translate(f.x,cy);g.globalAlpha=1-w*w;
   g.beginPath();for(let i=0;i<16;i++){const a=i/16*TAU+f.a3h*7,r=i%2?R*.38:R*(.8+.2*Math.sin(i*5+f.a3h*3));g[i?'lineTo':'moveTo'](Math.cos(a)*r,Math.sin(a)*r)}g.closePath();g.fillStyle='#fff';g.fill();g.strokeStyle=col;g.lineWidth=3;g.stroke();
   g.strokeStyle='#fff';g.lineWidth=2.4;for(let i=0;i<7;i++){const a=i/7*TAU+f.a3h*3,r0=R*1.05,r1=R*(1.35+w*.9);g.beginPath();g.moveTo(Math.cos(a)*r0,Math.sin(a)*r0);g.lineTo(Math.cos(a)*r1,Math.sin(a)*r1);g.stroke()}
   g.restore();g.save();g.globalAlpha=(1-w)*.7;g.strokeStyle=col;g.lineWidth=3;g.beginPath();g.ellipse(f.x,0,(30+w*70)*sc,(7+w*15)*sc,0,0,TAU);g.stroke();g.restore()};
 const df0=drawFighter;drawFighter=function(f,sil){if(!A()||!f||(f!==G.f[0]&&f!==G.f[1]))return df0.apply(this,arguments);
   /* no side-view fighters in this view (Trey: delete all side character style): the dark shape used during an ultimate is the same over-the-shoulder drawing, blacked out */
   if(sil){g.save();try{g.filter='brightness(0)'}catch(e){}try{return drawFighter(f)}finally{try{g.filter='none'}catch(e){}g.restore()}}const ph=S3.phi||0,sd=S3.sd||1,cx=(G.f[0].x+G.f[1].x)/2,xr=f.x-cx,az=f.a3z||0,osq=A()==='free'?clamp((ph-.45)/.6,0,1):0,nearF=f===G.f[VI()],/* over the shoulder: your fighter sits low and to the left, the opponent up and to the right, and depth is stretched so distance reads */pos=ff=>{const xq=ff.x-cx,nq=ff===G.f[VI()],cl=CL();return PJ(xq*Math.cos(ph)+(nq?-78:62)*osq*lerp(.5,1,cl),clamp(xq*Math.sin(ph)*sd*(1+1.25*osq)-(ff.a3z||0)*1.05+(nq?-70:40)*osq*cl,osq>.5?-175:-9999,osq>.5?900:9999))},NOW=performance.now()/1000,oth=G.f[f===G.f[0]?1:0];let p=pos(f);
   /* they look like they are hitting each other (Trey): in FREE RUN an attacker who is in reach lunges across the floor to the opponent at the moment of the strike and comes back, and a fighter who is hit is knocked away from the attacker */
   if(osq>.5&&!sil){try{if(f.state==='atk'&&f.mv&&Math.abs(f.x-oth.x)<230){let id='';try{id=mvId(f)||''}catch(e){}const u=id==='U'?(f.st*3.4)%1:clamp(f.st/(f.mv.dur||.4),0,1),w=AC(u)*(id==='U'?.6:.66),q=pos(oth);p=[lerp(p[0],q[0],w),lerp(p[1],q[1],w),lerp(p[2],q[2],w)]}
     const ha=NOW-(f.a3h||-9);if(ha<.3&&!f.a3hb){const w=(1-ha/.3),q=pos(oth),dx=p[0]-q[0],dy=p[1]-q[1],d=Math.hypot(dx,dy)||1;const hs=clamp(f.a3hs||1,.5,1.7);p=[p[0]+dx/d*26*w*hs,p[1]+dy/d*14*w*hs,p[2]*(1+(nearF?.06:-.06)*w*hs)]}}catch(e){}}
   if(NOW-(f.a3h||-9)<.2){S3.hitX=p[0];S3.hitY=p[1]-95*clamp(p[2],.36,1.85)*cam.z}
   const k=clamp(p[2],.36,1.85),tw=1-Math.min(.16,Math.abs(az)/380);
   g.save();g.translate(cam.x+(p[0]-W/2)/cam.z,(p[1]-cam.ay)/cam.z);g.scale(k*tw,k);g.translate(-f.x,0);
   /* the body turns to look 3D (Trey): stepping or running into the screen shows the fighter's back, toward the camera shows their front. The turn is a quick swivel: the side view narrows, swaps to the front or back drawing, and widens again; they bob as they run. */
   /* every angle of the body (Trey: a drawing of every angle): the turn goes side view -> three-quarter view -> full front (toward the camera) or full back (into the screen), in both directions, so eight directions in all.
      The three-quarter views are the front or back drawing with the far half of the body drawn narrower than the near half, which is what a body turned 45 degrees looks like. */
   try{const meF=G.f[VI()],fat=A()==='free'&&f.state==='atk'&&f.mv&&!sil,fhu=A()==='free'&&f.state==='hurt'&&!sil&&f.y>=0,fln=A()==='free'&&f.state==='launch'&&!sil,fdn=f.state==='down'||(f.hp<=0&&f.y>=0&&f.state!=='launch'&&f.state!=='hurt'),frr=A()==='free',tn=frr?Math.max(f.a3tn||0,clamp((ph-.45)/.6,0,1)):(f.a3tn||0);if(tn>.03&&!sil&&f.c){
     if(tn<.3){const sx=1-.5*(tn/.3);g.translate(f.x,0);g.scale(sx,1);g.translate(-f.x,0)}
     else{const q=clamp((tn-.3)/.7,0,1),far=lerp(.34,1,q*q),near=lerp(.72,1,q),away=frr&&ph>.45?(f===meF):(f.a3td||1)<0,mov=f.state==='run'||f.state==='dash'||f.state==='enter'||f.a3c,fn=away?window.CBACK:(window.CFRONT||drawFrontChar),bob=mov?Math.abs(Math.sin(G.t*11))*5:f.a3s?Math.sin(f.a3s.t/.34*Math.PI)*7:0,sc=f.c.sc||1,fs=(f.face||1)*(away?-1:1);
      if(fn){/* a little more 3D (Trey): a soft shadow that stretches away from the light and fades as the fighter leaves the floor */{const hgt=clamp(1+f.y/160,.35,1),sg=g.createRadialGradient(f.x+14*sc,2,2,f.x+14*sc,2,58*sc*hgt);sg.addColorStop(0,'rgba(8,2,22,'+(.5*hgt)+')');sg.addColorStop(.6,'rgba(8,2,22,'+(.24*hgt)+')');sg.addColorStop(1,'rgba(8,2,22,0)');g.save();g.translate(0,2);g.scale(1,.24);g.translate(0,-2);g.fillStyle=sg;g.beginPath();g.arc(f.x+14*sc,2,58*sc*hgt,0,TAU);g.fill();g.restore()}/* they keep their fighting stance while turned (Trey): legs apart with bent knees and both hands up; the back view walks its legs while moving */const o={t:G.t+f.side*1.7,expr:away?'':'angry',stance:1,fwd:1,walk:mov?G.t*12:0,guard:f.state==='guard'?1:0,tuck:f.y<0&&(f.state==='air'||f.state==='atk')?clamp(-f.y/70,0,1)*(f.state==='atk'?.5:.9):0};
       /* hands in front and attacks in front (Trey): in FREE RUN the arms are held in front of the body, and attacks and ultimates are drawn from the same over-the-shoulder view, thrown forward at the opponent (yours away from the camera, theirs toward it) */
       let lg=0;if(fat){let id='';try{id=mvId(f)||''}catch(e){}const ult=id==='U',wb=['katana','dagger','staff','bo'].includes(f.c.weapon),n=ult?Math.floor(f.st*3.4):(+id[1]||0),u=ult?(f.st*3.4)%1:clamp(f.st/(f.mv.dur||.4),0,1);
        /* every kind of move fits the view (Trey): skills use a move that matches their kit (slash, rush of punches, weapon or palm thrust, throw with a glow, stomp or kick), jumping attacks are a diving kick or a downward slash */
        let kd=wb?2:(f.c.weapon==='fist'&&!ult&&(id==='L3'||id==='H'))?1:0,uu=u,nn=n;if(id[0]==='S'){let kq=f.c.kit?f.c.kit[n]:null;kq=Array.isArray(kq)?kq[0]:kq;kd=typeof kq==='number'?[2,0,wb?2:3,3,1,3,1,3][((kq%8)+8)%8]:3;if(kd===2&&!wb)kd=0;if(typeof kq==='number'&&kq%8===1){uu=(f.st*4.2)%1;nn=Math.floor(f.st*4.2)}}else if(id[0]==='A')kd=wb&&id==='AH'?2:1;
        o.atk={u:uu,k:kd,arm:wb&&kd!==1?1:(nn%2?1:-1),p:FF()?clamp(AC(uu),0,1):null};o.expr=away?'':'yell';lg=AC(ult?(f.st*3.4)%1:u);
        if(ult){g.save();g.translate(f.x,f.y-70*sc);for(let r=0;r<3;r++){const q2=(G.t*1.6+r/3)%1;g.globalAlpha=(1-q2)*.6;g.strokeStyle=r%2?'#fff':f.c.col;g.lineWidth=5*(1-q2)+1;g.beginPath();g.ellipse(0,0,(30+q2*90)*sc,(40+q2*110)*sc,0,0,TAU);g.stroke()}g.restore()}}
       /* a hit fighter rocks back in the same view, mouth open, instead of switching to the side drawing */
       const hw=fhu?clamp(1-(NOW-(f.a3h||-9))/.3,0,1):0;if(fhu||fln||fdn){o.expr=away?'':'yell';o.fwd=0;o.stance=fdn?0:1}if(f.state==='win'){o.stance=0;o.fwd=0;o.win=1;o.expr=''}
       /* animations made for this view (Trey: better animations now it is 3D, for getting hurt, falling and movement). One pose (lean, squash, stretch, shift) is worked out per fighter per frame from what they are doing and how long they have been doing it:
          running bobs and leans into the circle, a dash stretches forward with streaks, a jump stretches on the way up and squashes on landing with dust; a hit snaps the body back, shakes it and flashes it, alternating sides in a combo;
          a launch tumbles backwards with flailing legs and lands flat with a bounce and dust; a knockout buckles and falls over; getting up rolls back onto the feet. */
       const dsg=(away?1:-1)*(f.side>0?-1:1),key=fdn?'DN':f.state;if(f.a3ps!==key){f.a3pp=f.a3ps;f.a3ps=key;f.a3t0=NOW;if(key==='hurt')f.a3hn=(f.a3hn||0)+1}const el=NOW-(f.a3t0||NOW),air=f.y<-4;if(f.a3air&&!air)f.a3ld=NOW;f.a3air=air;const ld=clamp(1-(NOW-(f.a3ld||-9))/.18,0,1),ez=x=>x*x*(3-2*x);
       let rot=0,qx=1,qy=1,ox=0,oy=0,fl=0,LY=0;
       /* fighters are never still: a light bounce and sway in the stance, as if ready to move */
       if(FF()&&(f.state==='idle'||f.state==='guard')&&!mov){const b=Math.sin(G.t*5.4+f.side*2.1);oy+=b*1.7*sc;qy*=1+.014*b;qx*=1-.008*b;rot+=Math.sin(G.t*2.7+f.side)*.014}
       /* a blocked hit drives the guard back: a short brace and shudder */
       if(FF()&&f.a3hb&&NOW-(f.a3h||-9)<.2){const w=1-(NOW-f.a3h)/.2;qx*=1+.06*w;qy*=1-.06*w;ox+=Math.sin((NOW-f.a3h)*80)*3*w;oy-=(away?3:-3)*w}
       /* streaks behind a fighter at the fastest part of a strike */
       if(FF()&&fat&&lg>.45){g.save();g.globalAlpha=.4*clamp((lg-.45)*2,0,1);g.strokeStyle='#fff';g.lineWidth=2;for(let i=0;i<5;i++){const xx=f.x+(i-2)*15*sc,yy=f.y-(34+((i*37)%70))*sc;g.beginPath();g.moveTo(xx,yy);g.lineTo(xx,yy+(away?34:-34)*sc);g.stroke()}g.restore()}
       if(mov&&!fat){const c2=Math.sin(G.t*12);rot+=(f.a3c||0)*dsg*.07+c2*.018;qy*=1-.035*Math.abs(c2);qx*=1+.02*Math.abs(c2);oy-=Math.abs(c2)*3}
       if(f.state==='dash'){qx*=1.1;qy*=.93;rot+=dsg*-.05;g.save();g.globalAlpha=.4;g.strokeStyle='#fff';g.lineWidth=2;for(let i=0;i<4;i++){const yy=f.y-(30+i*28)*sc,xx=f.x+(i%2?-1:1)*(26+i*5)*sc;g.beginPath();g.moveTo(xx,yy);g.lineTo(xx,yy+(away?26:-26)*sc);g.stroke()}g.restore()}
       if(f.state==='air'){const up=(f.vy||0)<0,w=clamp(1-el/.16,0,1);qy*=1+(up?.1:.03)+.1*w;qx*=1-(up?.06:.01)-.06*w;o.tuck=clamp(el*3,0,.9)*(up?1:.5)}
       if(ld>0&&!fdn){qy*=1-.2*ld;qx*=1+.14*ld}
       if(fhu){const w=clamp(1-el/.3,0,1),sd2=(f.a3hn||0)%2?1:-.6,HS=clamp(f.a3hs||1,.5,1.7);rot+=dsg*(.08+.24*w*w*HS)*(sd2>0?1:.7);ox+=sd2*9*w*sc*HS+Math.sin(el*62)*4*w*HS;qx*=1+.07*w;qy*=1-.09*w;oy-=(away?4:-4)*w;fl=el<.09?1-el/.09:0}
       if(fln){const up=(f.vy||0)<0,e=ez(clamp(el*(up?2.6:4),0,1));rot+=dsg*lerp(.25,.95,e)+Math.sin(el*9)*.06;qy*=lerp(1,.72,e);LY=.5*e;o.tuck=.35+.3*Math.sin(el*15);const dp=1+(away?.2:-.18)*clamp(el*1.6,0,1);qx*=dp;qy*=dp;fl=el<.07?1-el/.07:0}
       if(fdn){const e=ez(clamp(el/(f.a3pp==='launch'||f.a3pp==='hurt'&&f.y<0?.1:.42),0,1)),bn=f.a3pp==='launch'?Math.abs(Math.sin(el*10))*16*Math.exp(-el*6)*sc:0;/* falling back and getting up in depth (Trey): the fighter staggers a step away from the hit, tips over backwards with the upper body dropping away behind the legs (the far half of the body is drawn smaller than the near half), bounces and settles; getting up, they sit up, tuck their legs and hop back onto their feet */LY=e;rot+=dsg*.3*e;qy*=lerp(1,.4,e)*(1-.1*Math.sin(Math.min(1,el/.16)*Math.PI));qx*=lerp(1,1.06,e);oy-=bn+(away?-1:1)*-10*sc*Math.sin(Math.min(1,e)*Math.PI*.5)*(f.a3pp==='launch'?0:1);if(e<1&&f.a3pp!=='launch'){qy*=1-.12*Math.sin(e*Math.PI);ox+=dsg*-6*Math.sin(e*Math.PI)*sc}}
       if(f.state==='getup'){const e=ez(clamp(el/.34,0,1));LY=1-e;rot+=dsg*.3*(1-e);qy*=lerp(.4,1,e)*(1+.1*Math.sin(e*Math.PI));oy-=Math.sin(clamp((e-.45)/.55,0,1)*Math.PI)*16*sc;o.tuck=Math.sin(e*Math.PI)*.8;o.stance=1}
       if(f.state==='crouch')qy*=.7;
       /* dust on landings and when a body hits the floor */
       {const da=fdn?el:(NOW-(f.a3ld||-9)),big=fdn?1.5:1;if(da>=0&&da<.32&&(fdn?f.a3pp==='launch'||el>.3:true)){const w=da/.32;g.save();g.globalAlpha=(1-w)*.5;g.fillStyle='#e9e2f5';for(let i=-1;i<=1;i+=2){g.beginPath();g.ellipse(f.x+i*(22+w*38)*sc*big,-(3+w*8)*sc,(9+w*10)*sc*big,(5+w*6)*sc,0,0,TAU);g.fill()}g.restore()}}
       const POSE=()=>{g.translate(f.x+ox,f.y+oy);if(rot)g.rotate(rot);g.scale(qx,qy);g.translate(-f.x,-f.y)};
       /* the body turns in depth: the striking side swings toward the target and the other shoulder drops back; a hit turns the body the other way */
       const tws=fat&&o.atk?o.atk.arm*(away?1:-1):((f.a3hn||0)%2?1:-1),twa=fat?lg*.3:fhu?clamp(1-el/.3,0,1)*.26:0;
       [1,-1].forEach(h=>{const k=(h===fs?far:near)*(twa?(h===tws?1+twa*.3:1-twa):1);const one=add=>{g.save();if(add){g.globalCompositeOperation='lighter';g.globalAlpha=.55*fl}POSE();g.translate(f.x+(fs*(near-far)*9*sc),f.y-bob+(away?-7:8)*lg*sc);g.scale(k*sc*(1+(away?-.05:.09)*lg),sc*(1+(away?-.05:.09)*lg));if(LY>.02){/* lying in depth: legs and upper body are drawn as two slices; the slice farther from the camera is smaller */const far2=away?lerp(1,.74,LY):lerp(1,1.3,LY),fy2=away?lerp(1,.72,LY):lerp(1,1.15,LY);
          g.save();g.beginPath();g.rect(h>0?0:-260,-70,260,170);g.clip();try{fn(f.c,o)}catch(e){}g.restore();
          g.translate(0,-70);g.scale(far2,fy2);g.translate(0,70);g.beginPath();g.rect(h>0?0:-260,-420,260,350.6);g.clip();try{fn(f.c,o)}catch(e){}}
         else{g.beginPath();g.rect(h>0?0:-260,-420,260,520);g.clip();try{fn(f.c,o)}catch(e){}}g.restore()};one(0);if(fl>0)one(1)});BURST(f,sc);return}}}
    /* attacks, hits and falls only exist as side drawings; seen from over the shoulder they are drawn narrower, as a body moving into or out of the screen would look */
    if(A()==='free'&&!sil&&f.state!=='down'){const q=clamp((ph-.45)/.6,0,1);if(q>0){g.translate(f.x,0);g.scale(lerp(1,.58,q),1);g.translate(-f.x,0)}}
    return df0.apply(this,arguments)}finally{g.restore();
    /* pillars on the near side of the ring pass in front of the fighters, big and dark, in FREE RUN (drawn once per frame, after the second fighter) */
    try{if(!sil&&A()==='free'&&(S3.osq||0)>.5){if(S3.dfT===G.t&&S3.fgT!==G.t){S3.fgT=G.t;const ang=S3.ang-(S3.phi||0)*(S3.sd||1),tr=g.getTransform();g.save();g.setTransform(S*dpr,0,0,S*dpr,0,0);
       for(let k2=0;k2<14;k2++){const t=k2/14*TAU+.2+ang,wx=880*1.04*Math.cos(t),wd=880*1.04*Math.sin(t);if(wd>-120||wd<-470)continue;const p=PJ(wx,wd),s2=p[2]*cam.z,x=p[0],y=p[1],w=26*s2,h=300*s2;if(x<-w||x>W+w)continue;g.globalAlpha=.86;g.fillStyle='#120a22';g.fillRect(x-w/2,y-h,w,h);g.fillRect(x-w*.8,y-h-w*.3,w*1.6,w*.3);g.globalAlpha=.5;circ(x,y-h-w*.9,w*.6,'#ffe14d');g.globalAlpha=1}
       /* a heavy hit throws speed lines out from the point of impact and flashes the screen for an instant */
       {const ha=performance.now()/1000-(S3.hitT||-9),hs=S3.hitS||0;if(FF()&&ha>=0&&ha<.2&&hs>=.95){const w=ha/.2,vx=S3.hitX||W/2,vy=S3.hitY||H/2;g.strokeStyle='#fff';g.globalAlpha=(1-w)*.75;for(let i=0;i<24;i++){const a=i/24*TAU+(S3.hitT%1)*6,r0=(70+((i*37)%70))*(1+w*.8),r1=r0+(90+((i*53)%150))*hs,cx2=Math.cos(a),sy2=Math.sin(a);g.lineWidth=1+((i*7)%4);g.beginPath();g.moveTo(vx+cx2*r0,vy+sy2*r0);g.lineTo(vx+cx2*r1,vy+sy2*r1);g.stroke()}
         if(ha<.05){g.globalAlpha=.28*hs;g.fillStyle='#fff';g.fillRect(0,0,W,H)}g.globalAlpha=1}}
       g.restore()}S3.dfT=G.t}}catch(e){}}};
 /* the body moves with the sidestep (Trey): a real stepping pose (legs cross and bend, the body dips and leans, arms swing), and a running stride while circling in FREE RUN */
 const pa0=poseOf;poseOf=function(f){const p=pa0(f);try{if(!A()||!f||!Array.isArray(p)||!(f.state==='idle'||f.state==='run'||f.state==='guard'))return p;
   if(f.a3s){const q=p.slice(),u=f.a3s.t/.34,w=Math.sin(u*Math.PI),d=f.a3s.d,c2=Math.sin(u*Math.PI*2);q[0]+=d*9*w;q[1]-=d*5*w;q[6]+=28*c2;q[7]+=26*w;q[8]-=28*c2;q[9]+=30*w;q[2]+=22*c2;q[3]+=14*w;q[4]-=22*c2;q[5]+=14*w;q[11]=(q[11]||0)+9*w;return q}
   if(f.a3c){const q=p.slice(),t=G.t*11,c2=Math.sin(t),d=f.a3c;q[0]+=d*5;q[6]+=24*c2;q[7]+=14+10*Math.cos(t);q[8]-=24*c2;q[9]+=14-10*Math.cos(t);q[2]-=18*c2;q[4]+=18*c2;q[11]=(q[11]||0)+3+2*Math.abs(c2);return q}}catch(e){}return p};
 /* the arena: drawn over the stage's own sky and far background, in perspective, rotating */
 const R=880,hs=i=>{const v=Math.sin(i*91.7)*43758.5;return v-Math.floor(v)};
 const bg0=drawBG;drawBG=function(){if(!A())return bg0();{const cx0=cam.x,sl=Math.sin(S3.ang)*420+(S3.v||0)*120;cam.x=cx0+sl*8;try{bg0()}finally{cam.x=cx0}}try{const st=STAGES[G.stg||0],z=cam.z,ay=cam.ay,hy=cam.ay-26*z-cam.y*z*.6-HYO(),cx=(G.f[0].x+G.f[1].x)/2,ang=S3.ang-(S3.phi||0)*(S3.sd||1);
   const P=(wx,wd)=>{const d=Math.max(wd,-K*.86),s=K/(K+d);return[W/2+(cx+wx*1-cam.x)*z*s+(1-s)*0,hy+(ay-hy+ (H-ay)*.0)*s+ (s>1?(s-1)*(H-ay)*.9:0),s]},rot=(r,t)=>[r*Math.cos(t+ang),r*Math.sin(t+ang)];
   g.save();g.beginPath();g.rect(0,hy-2,W,H-hy+2);g.clip();
   const fl=(st.fl&&st.fl[0])||'#3a2a5e',f2=(st.fl&&st.fl[1])||'#2a1f45';const gr=g.createLinearGradient(0,hy,0,H);gr.addColorStop(0,f2);gr.addColorStop(1,fl);g.fillStyle=gr;g.fillRect(0,hy,W,H-hy);
   /* disc */
   const ring=(r,col,lw,fill)=>{g.beginPath();for(let i=0;i<=72;i++){const q=rot(r,i/72*TAU),p=P(q[0],q[1]);i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])}if(fill){g.fillStyle=fill;g.fill()}if(col){g.strokeStyle=col;g.lineWidth=lw;g.stroke()}};
   ring(R,null,0,'rgba(255,255,255,.07)');for(let k=0;k<16;k++){if(k%2)continue;g.beginPath();const a0=k/16*TAU,a1=(k+1)/16*TAU;for(let i=0;i<=8;i++){const q=rot(R,a0+(a1-a0)*i/8),p=P(q[0],q[1]);i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])}for(let i=8;i>=0;i--){const q=rot(R*.62,a0+(a1-a0)*i/8),p=P(q[0],q[1]);g.lineTo(p[0],p[1])}g.closePath();g.fillStyle='rgba(255,255,255,.06)';g.fill()}
   for(let k=0;k<16;k++){const a=rot(R*.2,k/16*TAU),b=rot(R,k/16*TAU),p=P(a[0],a[1]),q=P(b[0],b[1]);g.beginPath();g.moveTo(p[0],p[1]);g.lineTo(q[0],q[1]);g.strokeStyle='rgba(255,255,255,.16)';g.lineWidth=1.5;g.stroke()}
   ring(R*.2,'rgba(255,255,255,.3)',2);ring(R*.62,'rgba(255,255,255,.2)',2);ring(R,(st.sun&&st.sun[0])||'#ffe14d',4);
   /* haze where the floor meets the horizon, so the far side of the arena fades with distance */
   {const hz=g.createLinearGradient(0,hy,0,hy+70*z);hz.addColorStop(0,'rgba('+(st.rf||'255,255,255')+',.34)');hz.addColorStop(1,'rgba('+(st.rf||'255,255,255')+',0)');g.fillStyle=hz;g.fillRect(0,hy,W,70*z)}
   /* a little more 3D (Trey): the sun or moon shines down the floor toward the camera, and the edges of the arena fall into shadow so the middle reads as lit */
   try{const sxx=W*.5-cam.x*.03,rf=st.rf||'255,255,255',sh=g.createLinearGradient(0,hy,0,H);sh.addColorStop(0,'rgba('+rf+',.3)');sh.addColorStop(.5,'rgba('+rf+',.1)');sh.addColorStop(1,'rgba('+rf+',0)');g.fillStyle=sh;g.beginPath();g.moveTo(sxx-26*z,hy);g.lineTo(sxx+26*z,hy);g.lineTo(sxx+150*z,H);g.lineTo(sxx-150*z,H);g.closePath();g.fill();
    const vg=g.createRadialGradient(W/2,hy+(H-hy)*.62,H*.22,W/2,hy+(H-hy)*.62,W*.72);vg.addColorStop(0,'rgba(6,2,18,0)');vg.addColorStop(1,'rgba(6,2,18,.5)');g.fillStyle=vg;g.fillRect(0,hy,W,H-hy)}catch(e){}
   g.restore();
   /* pillars on the far half of the ring, nearest last */
   const ps=[];for(let k=0;k<14;k++){const q=rot(R*1.04,k/14*TAU+.2);if(q[1]>-60)ps.push([q[1],q[0],k])}ps.sort((a,b)=>b[0]-a[0]);
   ps.forEach(q=>{const p=P(q[1],q[0]),s=p[2]*z,h=300*s,w=26*s,x=p[0],y=p[1];if(x<-80||x>W+80)return;g.fillStyle='rgba(10,4,24,.3)';g.beginPath();g.ellipse(x,y,w*1.5,w*.4,0,0,TAU);g.fill();
     const pg=g.createLinearGradient(x-w/2,0,x+w/2,0);pg.addColorStop(0,'#2a1f45');pg.addColorStop(.5,'#6a5a9a');pg.addColorStop(1,'#1a1030');g.fillStyle=pg;g.fillRect(x-w/2,y-h,w,h);g.fillStyle='#1a1030';g.fillRect(x-w*.8,y-h-w*.3,w*1.6,w*.3);g.fillRect(x-w*.7,y-w*.25,w*1.4,w*.25);
     const lc=q[2]%2?'#ffe14d':((st.sun&&st.sun[0])||'#ff7ad1');g.globalAlpha=.75+.25*Math.sin(G.t*3+q[2]);circ(x,y-h-w*.9,w*.55,lc);g.globalAlpha=.25;circ(x,y-h-w*.9,w*1.3,lc);g.globalAlpha=1;
     if(q[2]%2===0){g.strokeStyle='rgba(255,255,255,.25)';g.lineWidth=Math.max(1,2*s);g.beginPath();g.moveTo(x-w/2,y-h*.45);g.lineTo(x+w/2,y-h*.45);g.stroke()}})}catch(e){try{g.restore()}catch(x){}}};
 /* match label and the two buttons on the OFFLINE screen */
  const sr0=startRound;startRound=function(){S3.ang=S3.tg=0;if(ON())S3.phi=1.3;return sr0.apply(this,arguments)};
 try{window.COMBO_A3P={PJ,S3,A};window.COMBO_A3=()=>({mode:A(),ang:S3.ang,tg:S3.tg})}catch(e){}}
/* ================= flag "depth3d": the drawn fighters look solid (Trey: make the characters 3D but keep them how they are; he chose "keep drawings, add depth").
   Nothing about a fighter's drawing changes. While a fighter is being drawn in a match or cutscene, every filled shape (each limb, the body, the head, the hair, the weapon)
   gets a soft light on the side facing the sun and a shadow on the other side, sized to that shape, so each part reads as round. Light always comes from the same side of
   the screen whichever way the fighter faces. Dark silhouettes are left alone. ================= */
{const ON=()=>F().depth3d,NM=['beginPath','moveTo','lineTo','quadraticCurveTo','bezierCurveTo','arc','ellipse','rect','fill'];let dep=0,x0,y0,x1,y1,has=0;
 const P=(x,y)=>{if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;has=1};
 const run=fn=>{if(dep)return fn();dep=1;const prev={},cur={};NM.forEach(n=>{prev[n]=Object.prototype.hasOwnProperty.call(g,n)?g[n]:null;cur[n]=g[n]});const c=(n,a)=>cur[n].apply(g,a);
  try{g.beginPath=function(){x0=y0=1e9;x1=y1=-1e9;has=0;return c('beginPath',arguments)};
   g.moveTo=function(x,y){P(x,y);return c('moveTo',arguments)};g.lineTo=function(x,y){P(x,y);return c('lineTo',arguments)};
   g.quadraticCurveTo=function(a,b,x,y){P(a,b);P(x,y);return c('quadraticCurveTo',arguments)};g.bezierCurveTo=function(a,b,d,e,x,y){P(a,b);P(d,e);P(x,y);return c('bezierCurveTo',arguments)};
   g.arc=function(x,y,r){P(x-r,y-r);P(x+r,y+r);return c('arc',arguments)};g.ellipse=function(x,y,rx,ry){const r=Math.max(rx,ry);P(x-r,y-r);P(x+r,y+r);return c('ellipse',arguments)};
   g.rect=function(x,y,w,h){P(x,y);P(x+w,y+h);return c('rect',arguments)};
   /* Trey chose "make that look stronger": each part now also casts a soft shadow onto the parts behind it, is darkened all round its edge so it bulges, is darker toward its underside, and carries a small bright spot on its lit side */
   const strongFill=function(){let fs,w,h,ok=false;try{fs=g.fillStyle;w=x1-x0;h=y1-y0;ok=has&&typeof fs==='string'&&fs[0]==='#'&&w>=5&&h>=5&&w<=140&&h<=170&&g.globalAlpha>=.7}catch(e){}
     if(!ok)return c('fill',arguments);const big=w>=9&&h>=9;let r;
     try{if(big){g.shadowColor='rgba(8,0,30,.5)';g.shadowBlur=7;g.shadowOffsetX=3;g.shadowOffsetY=4}r=c('fill',arguments)}finally{if(big){g.shadowColor='rgba(0,0,0,0)';g.shadowBlur=0;g.shadowOffsetX=0;g.shadowOffsetY=0}}
     try{const m=g.getTransform(),flip=m.a<0,lx=flip?x1:x0,rx=flip?x0:x1,gr=g.createLinearGradient(lx,y0,rx,y0+h*.3);gr.addColorStop(0,'rgba(255,255,255,.5)');gr.addColorStop(.06,'rgba(255,255,255,.26)');gr.addColorStop(.36,'rgba(255,255,255,0)');gr.addColorStop(.52,'rgba(12,0,40,0)');gr.addColorStop(1,'rgba(12,0,40,.62)');
      g.fillStyle=gr;c('fill',arguments);
      if(big){const ao=g.createLinearGradient(0,y0+h*.5,0,y1);ao.addColorStop(0,'rgba(12,0,40,0)');ao.addColorStop(1,'rgba(12,0,40,.3)');g.fillStyle=ao;c('fill',arguments);
       const lw=g.lineWidth,ss=g.strokeStyle;g.save();g.clip();g.lineWidth=Math.min(w,h)*.42;g.strokeStyle='rgba(12,0,40,.2)';g.stroke();g.restore();g.lineWidth=lw;g.strokeStyle=ss;
       const hx=lx+(rx-lx)*.27,hy2=y0+h*.24,hr=Math.min(w,h)*.42,sp=g.createRadialGradient(hx,hy2,0,hx,hy2,hr);sp.addColorStop(0,'rgba(255,255,255,.42)');sp.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=sp;c('fill',arguments)}
      g.fillStyle=fs}catch(e){try{g.fillStyle=fs}catch(x){}}return r};
   const softFill=function(){const r=c('fill',arguments);try{const fs=g.fillStyle,w=x1-x0,h=y1-y0;if(!has||typeof fs!=='string'||fs[0]!=='#'||w<5||h<5||w>140||h>170||g.globalAlpha<.7)return r;
     const m=g.getTransform(),flip=m.a<0,lx=flip?x1:x0,rx=flip?x0:x1,gr=g.createLinearGradient(lx,y0,rx,y0+h*.3);gr.addColorStop(0,'rgba(255,255,255,.42)');gr.addColorStop(.07,'rgba(255,255,255,.2)');gr.addColorStop(.36,'rgba(255,255,255,0)');gr.addColorStop(.56,'rgba(12,0,40,0)');gr.addColorStop(1,'rgba(12,0,40,.5)');
     g.fillStyle=gr;c('fill',arguments);g.fillStyle=fs}catch(e){}return r};
   /* own flag "solid2": Solid Fighters was already released in the Claude page studio when the stronger look was added */
   g.fill=F().solid2?strongFill:softFill;
   return fn()}finally{NM.forEach(n=>{if(prev[n])g[n]=prev[n];else delete g[n]});dep=0}};
 const d0=drawFighter;drawFighter=function(f,sil){if(!ON()||sil)return d0.apply(this,arguments);const a=arguments,t=this;return run(()=>d0.apply(t,a))}}
/* ================= flag "mapdepth": the maps are built in depth (Trey: make the map 3D but keep it how it is; he chose "same maps, built in depth").
   The map's own sky, hills, buildings and big landmarks stay as they are. On the ground between the landmarks and the fighters the map's own small props (stone lanterns, neon signs,
   ice, rocks, columns) are placed in three rows going back into the distance, each on the floor's own perspective with a shadow, so near rows slide faster than far rows when the
   camera moves; floor lines run back to the horizon and each row is hazier than the one in front. In the two 3D arena modes the same props stand around the ring and turn with it.
   Indoor story places are left alone. ================= */
{const ON=()=>F().mapdepth,K=620,ROOM={dojo:1,inn:1,cave:1},b0=drawBG;drawBG=function(){b0.apply(this,arguments);if(!ON())return;const prop=window.COMBO_PROP;if(!prop)return;
  try{if(G.mode==='scene'){let e=null;try{e=window.COMBO_ENV&&COMBO_ENV()}catch(x){}if(e&&ROOM[e])return}
   const st=STAGES[G.stg||0],z=cam.z,hy=cam.ay-26*z-cam.y*z*.6,kind=st.mid||'column',A3=window.COMBO_A3P,am=A3&&A3.A&&A3.A();g.save();
   if(am){const S3=A3.S3,ang=S3.ang-(S3.phi||0)*(S3.sd||1),L=[];for(let k=0;k<10;k++){const t=k/10*TAU+.5+ang,wx=800*Math.cos(t),wd=800*Math.sin(t);if(wd<90)continue;L.push([wd,wx,k])}
    L.sort((a,b)=>b[0]-a[0]).forEach(q=>{const p=A3.PJ(q[1],q[0]),s=p[2]*z*(q[2]%5===0?4.6:3);if(p[0]<-120||p[0]>W+120)return;g.globalAlpha=.3*clamp(p[2]*1.6,0,1);g.fillStyle='#05020c';g.beginPath();g.ellipse(p[0]+10*s,p[1],16*s,3.2*s,0,0,TAU);g.fill();g.globalAlpha=clamp(.45+p[2]*.9,0,1);prop(kind,p[0],p[1],s,st,false,q[2])});g.restore();return}
   const fy=cam.ay-cam.y*z,PP=(wx,d)=>{const s=K/(K+d);return[W/2+(wx-cam.x)*z*s,hy+(fy-hy)*s,s]};
   /* floor lines running back to the horizon, and one line across the floor at each row */
   g.strokeStyle='#fff';g.lineWidth=1;g.globalAlpha=.06;g.beginPath();for(let i=-12;i<=12;i++){const wx=Math.round(cam.x/420)*420+i*420,a=PP(wx,40),b=PP(wx,2600);g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1])}g.stroke();
   [[1020,.5,210],[640,.72,0],[330,.95,210]].forEach((r,ri)=>{const d=r[0],y=PP(0,d)[1];g.globalAlpha=.09;g.strokeStyle='#fff';g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();
    const c0=Math.round(cam.x/420);for(let i=-9;i<=9;i++){const wx=(c0+i)*420+r[2];if(ri===2&&Math.abs(wx)%840<10)continue;const p=PP(wx,d),s=p[2]*z*2.5;if(p[0]<-80||p[0]>W+80)continue;
     g.globalAlpha=.32*r[1];g.fillStyle='#05020c';g.beginPath();g.ellipse(p[0]+9*s,p[1]+1,15*s,3*s,0,0,TAU);g.fill();g.globalAlpha=r[1];prop(kind,p[0],p[1],s,st,false,i+ri*3+40)}
    /* haze in front of each row, so the rows behind it look farther away */
    g.globalAlpha=1;const hz=g.createLinearGradient(0,y-46*z*r[1],0,y+3);hz.addColorStop(0,'rgba('+(st.rf||'255,255,255')+',0)');hz.addColorStop(1,'rgba('+(st.rf||'255,255,255')+','+(.2*(1.1-r[1])+.03)+')');g.fillStyle=hz;g.fillRect(0,y-46*z*r[1],W,46*z*r[1]+3)});
   g.restore()}catch(e){try{g.restore()}catch(x){}}}}
/* ================= flag "scene3d": story cutscenes are staged in depth (Trey: make the animations 3D; he also chose cutscenes).
   Whoever is speaking steps toward the camera (drawn bigger and lower) and the others stand back (smaller and higher), easing between the two as the speaker changes, and the camera slowly pushes in and tilts a little during each line. Lines, voices and timing are unchanged. ================= */
{const ON=()=>F().scene3d,sc=()=>{try{return (window.COMBO_SC&&COMBO_SC())||null}catch(e){return null}};
 const d1=drawFighter;drawFighter=function(f,sil){const S0=G.mode==='scene'&&ON()?sc():null;if(!S0||!f||sil)return d1.apply(this,arguments);let foc=null;try{foc=S0.foc}catch(e){}
   const tz=foc?(f===foc?1.1:.94):1;f.s3z=lerp(f.s3z||1,tz,.07);const k=f.s3z;g.save();g.translate(f.x,(f.y||0)+(k-1)*46);g.scale(k,k);g.translate(-f.x,-(f.y||0));try{return d1.apply(this,arguments)}finally{g.restore()}};
 try{const ss=SCR.scene;SCR.scene=function(){const S0=ON()?sc():null;if(!S0)return ss.apply(this,arguments);const z0=cam.z,r0=cam.rot,t=G.t,w=.5+.5*Math.sin(t*.35);cam.z=z0*(1.02+.035*w);cam.rot=(r0||0)+Math.sin(t*.27)*.006;try{return ss.apply(this,arguments)}finally{cam.z=z0;cam.rot=r0}}}catch(e){}}
})();
