/* Sculpted fighter bodies: shaped torso, tapered limbs, hands with fingers and real feet. Off unless the "body2" update is released. "d25" turns fighters to a three-quarter angle with depth shading (and uses these bodies). */
(function(){'use strict';
const F=()=>(typeof FLAGS!=='undefined'&&FLAGS)||{};
const _dc=drawChar;
function segPath(a,b,r0,r1,bl,br){const dx=b.x-a.x,dy=b.y-a.y,L=Math.hypot(dx,dy)||1,ux=dx/L,uy=dy/L,nx=-uy,ny=ux,an=Math.atan2(uy,ux),m=Math.max(r0,r1),kx=a.x+ux*L*.38,ky=a.y+uy*L*.38;
 g.beginPath();g.moveTo(a.x+nx*r0,a.y+ny*r0);g.quadraticCurveTo(kx+nx*(m+bl*2),ky+ny*(m+bl*2),b.x+nx*r1,b.y+ny*r1);g.arc(b.x,b.y,r1,an+Math.PI/2,an-Math.PI/2,true);
 g.quadraticCurveTo(kx-nx*(m+br*2),ky-ny*(m+br*2),a.x-nx*r0,a.y-ny*r0);g.arc(a.x,a.y,r0,an-Math.PI/2,an-Math.PI*1.5,true);g.closePath()}
function stripe(a,b,r0,r1,side,col,k){const dx=b.x-a.x,dy=b.y-a.y,L=Math.hypot(dx,dy)||1,nx=-dy/L*side,ny=dx/L*side;g.strokeStyle=col;g.lineCap='round';g.lineWidth=Math.min(r0,r1)*k;g.beginPath();g.moveTo(a.x+nx*r0*.5,a.y+ny*r0*.5);g.lineTo(b.x+nx*r1*.5,b.y+ny*r1*.5);g.stroke()}
/* segs: [a,b,r0,r1,bulgeBack,bulgeFront,fill,shade,light] */
function limb2(segs,ink,sil){g.lineJoin='round';segs.forEach(s=>{segPath(s[0],s[1],s[2],s[3],s[4],s[5]);g.strokeStyle=ink;g.lineWidth=4;g.stroke()});
 segs.forEach(s=>{segPath(s[0],s[1],s[2],s[3],s[4],s[5]);g.fillStyle=s[6];g.fill();if(!sil){if(s[7])stripe(s[0],s[1],s[2],s[3],1,s[7],.62);if(s[8])stripe(s[0],s[1],s[2],s[3],-1,s[8],.3)}})}
function smooth(pts){const n=pts.length,mid=(i,j)=>[(pts[i][0]+pts[j][0])/2,(pts[i][1]+pts[j][1])/2];let m=mid(n-1,0);g.beginPath();g.moveTo(m[0],m[1]);for(let i=0;i<n;i++){m=mid(i,(i+1)%n);g.quadraticCurveTo(pts[i][0],pts[i][1],m[0],m[1])}g.closePath()}
function hand(h,fa,col,sh,ink,sil,fist,k){const a=fa*R,ux=Math.sin(a),uy=Math.cos(a),nx=uy,ny=-ux,P=(u,n)=>[h.x+(ux*u+nx*n)*k,h.y+(uy*u+ny*n)*k],L=[];
 if(fist){[-2.5,-.8,.9,2.5].forEach(o=>{const p=P(5,o);L.push([p,P(5.4,o+.01),2.9])});L.push([P(.8,3.6),P(4.2,2.2),2.4])}
 else{[[-2.5,4.6],[-.9,5.8],[.8,5.6],[2.4,4.6]].forEach(q=>L.push([P(4.4,q[0]),P(4.4+q[1],q[0]*1.25+.7),2]));L.push([P(1.5,3.2),P(5,5.6),2.2])}
 const pc=P(fist?1.8:2.4,0),rx=(fist?4.7:4.4)*k,ry=(fist?4.4:3.6)*k,rot=Math.atan2(uy,ux);g.lineCap='round';
 g.strokeStyle=ink;L.forEach(q=>{g.lineWidth=(q[2]+1.9)*k;g.beginPath();g.moveTo(q[0][0],q[0][1]);g.lineTo(q[1][0],q[1][1]);g.stroke()});g.beginPath();g.ellipse(pc[0],pc[1],rx+1,ry+1,rot,0,TAU);g.fillStyle=ink;g.fill();
 g.strokeStyle=col;L.forEach(q=>{g.lineWidth=q[2]*k;g.beginPath();g.moveTo(q[0][0],q[0][1]);g.lineTo(q[1][0],q[1][1]);g.stroke()});g.beginPath();g.ellipse(pc[0],pc[1],rx-.8,ry-.8,rot,0,TAU);g.fillStyle=col;g.fill();
 if(!sil){g.strokeStyle=sh;g.lineWidth=.9*k;g.beginPath();if(fist){[-1.7,0,1.7].forEach(o=>{const p=P(3.2,o),q=P(6.2,o);g.moveTo(p[0],p[1]);g.lineTo(q[0],q[1])})}else{const p=P(1,-2.6),q=P(4,-3.2);g.moveTo(p[0],p[1]);g.lineTo(q[0],q[1])}g.stroke()}}
function foot(f,a,c,C,ink,sil,back){g.save();g.translate(f.x,f.y);g.rotate(-a*R*.35);g.lineJoin='round';g.lineCap='round';
 if(c.bare){smooth([[-3.4,-3.6],[-5.4,1.5],[-4,5],[4,5.2],[11,5.2],[14,3.8],[12.4,.8],[6.5,-1.4],[3.2,-4]]);g.fillStyle=C(back?c.skinSh:c.skin);g.fill();g.strokeStyle=ink;g.lineWidth=2;g.stroke();
  if(!sil){g.strokeStyle=ink;g.lineWidth=.9;g.beginPath();[9.6,10.9,12].forEach((x,i)=>{g.moveTo(x,2.2-i*.25);g.lineTo(x+.5,4.8)});g.stroke();g.strokeStyle=c.skinSh;g.lineWidth=1.1;g.beginPath();g.moveTo(-1,3.6);g.quadraticCurveTo(3,2.2,7,3.8);g.stroke();
   g.strokeStyle=ink;g.lineWidth=4.6;g.beginPath();g.moveTo(-3.6,-2.6);g.lineTo(3.6,-3);g.stroke();g.strokeStyle=c.col;g.lineWidth=2.6;g.stroke()}}
 else{smooth([[-3.6,-4.2],[-5.8,1],[-4.6,5.2],[4,5.4],[11.5,5.4],[14.6,3.9],[13.2,.6],[7,-2.2],[3.4,-4.6]]);g.fillStyle=C(back?'#221c2e':'#2b2438');g.fill();g.strokeStyle=ink;g.lineWidth=2;g.stroke();
  if(!sil){g.strokeStyle='#efeaf8';g.lineWidth=1.7;g.beginPath();g.moveTo(-4.2,4.4);g.lineTo(13.4,4.4);g.stroke();g.strokeStyle=ink;g.lineWidth=.9;g.beginPath();g.moveTo(9.4,.2);g.quadraticCurveTo(10.6,2,10,3.5);g.moveTo(4.2,-2.6);g.lineTo(6,-.2);g.moveTo(6.2,-1.8);g.lineTo(8,.6);g.stroke();
   g.strokeStyle=c.col;g.lineWidth=1.6;g.beginPath();g.moveTo(-3.4,-3.4);g.lineTo(3.4,-3.9);g.stroke()}}
 g.restore()}
function drawChar2(c,p,o){const J=joints(p),D=F().d25?1:0,sil=o.sil,ink=sil||INK,C=x=>sil||x,t=o.t||0,sw=o.sway||0,bk=(c.sc>1.07||c.dm>1)?1.14:1,hi=sil?null:tint(c.skin,.38);
 if(D){const tl0=p[0]*R,nx=Math.cos(tl0),ny=Math.sin(tl0),sh=(P,dx,dy)=>({x:P.x+dx,y:P.y+dy}),a=-5*bk,b=7*bk;J.shA=sh(J.sh,nx*a,ny*a);J.shB=sh(J.sh,nx*b,ny*b);J.af=J.af.map(q=>sh(q,nx*a,ny*a));J.ab=J.ab.map(q=>sh(q,nx*b,ny*b));J.hipA=sh(J.hip,-3.6*bk,0);J.hipB=sh(J.hip,4.6*bk,0);J.lf=J.lf.map(q=>sh(q,-3.6*bk,0));J.lb=J.lb.map(q=>sh(q,4.6*bk,0))}else{J.shA=J.shB=J.sh;J.hipA=J.hipB=J.hip}
 const LT=D&&!sil?'rgba(255,255,255,.17)':null;
 g.save();
 if(o.ground)g.translate(0,-Math.max(J.lf[1].y,J.lb[1].y));
 if(p[10]||p[11]){g.translate(0,p[11]-75);g.rotate(p[10]*R);g.translate(0,75)}
 const ha=(p[0]*.5+p[1])*R,hx=J.neck.x+Math.sin(ha)*15,hy=J.neck.y-Math.cos(ha)*15;
 g.save();g.translate(hx,hy);g.rotate(ha);headBack(c,o);g.restore();
 if(c.style===3){ribbon(J.neck.x-4,J.neck.y+3,62,9,4,-62,sw,t,C(c.col2),ink);ribbon(J.neck.x-3,J.neck.y+5,46,8,3,-40,sw,t+1,C(c.col2),ink)}
 if(c.style===2)ribbon(J.hip.x-3,J.hip.y-6,52,28,36,-14,sw*.7,t,C(c.topSh),ink);
 if(c.style===0)ribbon(J.hip.x-7,J.hip.y-6,28,16,9,-28,sw,t,C(c.topSh),ink);
 if(c.style===1){ribbon(J.hip.x-8,J.hip.y-2,38,7,3,-35,sw,t,C(c.col2),ink);ribbon(J.hip.x-7,J.hip.y,30,6,3,-15,sw,t+2,C(c.col),ink)}
 if(c.style===4)ribbon(J.hip.x-8,J.hip.y-2,30,8,4,-30,sw,t,C(c.col),ink);
 if(c.style===5)ribbon(J.neck.x-4,J.neck.y+4,34,8,3,-55,sw,t,C(c.col),ink);
 if(c.style===6){ribbon(J.hip.x-8,J.hip.y-3,44,8,4,-30,sw,t,C(c.col),ink);ribbon(J.hip.x-6,J.hip.y,34,7,3,-12,sw,t+2,C(c.col2),ink)}
 if(c.style===7){ribbon(J.neck.x-6,J.neck.y+4,88,22,30,-16,sw*.8,t,C(c.col),ink);ribbon(J.hip.x-3,J.hip.y-6,56,28,38,-10,sw*.6,t,C(c.topSh),ink)}
 const glove=c.weapon==='fist',gk=glove?(c.fistR||8.2)/5.6:1,grip=c.weapon!=='orb';
 /* back arm */
 limb2([[J.shB,J.ab[0],5.2*bk,4.3*bk,1,1.2,C(c.topSh)],[J.ab[0],J.ab[1],4.3*bk,3.2*bk,1.1,.6,C(c.bare?c.skinSh:c.topSh)]],ink,sil);
 if(c.weapon==='dagger')weapon(c,J.ab[1],p[4]+p[5],o,true);
 hand(J.ab[1],p[4]+p[5],C(glove?shade(c.col2.length===7?c.col2:'#cccccc',.8):c.skinSh),'rgba(0,0,0,.35)',ink,sil,glove||c.weapon==='dagger',gk*.95);
 /* legs */
 limb2([[J.hipB,J.lb[0],7.2*bk,5.4*bk,1.2,1.8,C(c.pantsSh)],[J.lb[0],J.lb[1],5.4*bk,3.6,2,.3,C(c.pantsSh)]],ink,sil);foot(J.lb[1],p[8]+p[9],c,C,ink,sil,true);
 limb2([[J.hipA,J.lf[0],7.9*bk,5.9*bk,1.2,2,C(c.pants),c.pantsSh,LT],[J.lf[0],J.lf[1],5.9*bk,3.9,2.2,.3,C(c.pants),c.pantsSh,LT]],ink,sil);foot(J.lf[1],p[6]+p[7],c,C,ink,sil,false);
 if(!sil){const k=J.lf[0],a=(p[6]+p[7]*.5)*R;g.strokeStyle='rgba(0,0,0,.28)';g.lineWidth=1.2;g.lineCap='round';g.beginPath();g.arc(k.x+Math.cos(a)*1.5,k.y-Math.sin(a)*1.5,3.4*bk,-a-.9,-a+.9);g.stroke()}
 if(c.style===2||c.style===7)ribbon(J.hip.x+4,J.hip.y-6,c.style===7?52:44,20,24,8,sw*.6,t+1,C(c.top),ink);
 if(c.style===5)ribbon(J.hip.x-1,J.hip.y-8,24,24,40,0,sw*.3,t,C(c.col),ink);
 /* torso */
 const tl=p[0]*R,TP=[[9,7],[10.6,2],[8.4,-11],[10.4,-20],[13,-28],[11.6,-35.5],[8,-41],[3,-43.5],[-4,-43.5],[-9.6,-40],[-12,-30],[-9,-14],[-10.9,-1],[-8.6,7]].map(q=>[(D?q[0]*1.2+1.2:q[0])*bk,q[1]]);
 g.save();g.translate(J.hip.x,J.hip.y);g.rotate(tl);g.lineJoin='round';smooth(TP);g.strokeStyle=ink;g.lineWidth=4;g.stroke();g.fillStyle=C(c.top);g.fill();
 if(!sil){g.save();smooth(TP);g.clip();
  g.fillStyle=c.topSh;g.beginPath();g.moveTo(-16,10);g.lineTo(-3.5*bk,10);g.quadraticCurveTo(-6*bk,-18,-2.5*bk,-46);g.lineTo(-16,-46);g.closePath();g.fill();
  g.fillStyle='rgba(0,0,0,.16)';g.beginPath();g.moveTo(2*bk,-24);g.quadraticCurveTo(8*bk,-19.5,14*bk,-25);g.lineTo(14*bk,-19);g.quadraticCurveTo(8*bk,-14,1*bk,-20);g.closePath();g.fill();
  g.fillStyle='rgba(255,255,255,.16)';g.beginPath();g.ellipse(7.5*bk,-31,3.2*bk,5,.2,0,TAU);g.fill();
  g.strokeStyle='rgba(0,0,0,.22)';g.lineWidth=1.2;g.lineCap='round';g.beginPath();g.moveTo(3*bk,-25);g.quadraticCurveTo(8.5*bk,-21,12.6*bk,-26.5);g.moveTo(4.5*bk,-17);g.lineTo(9*bk,-16.4);g.moveTo(4.6*bk,-11.5);g.lineTo(8.2*bk,-11);g.moveTo(5.2*bk,-22);g.lineTo(5*bk,-7);g.moveTo(-7.5*bk,-28);g.quadraticCurveTo(-5*bk,-22,-7*bk,-13);g.stroke();
  if(D){g.strokeStyle='rgba(0,0,0,.22)';g.lineWidth=1.2;g.beginPath();g.moveTo(-6*bk,-25.5);g.quadraticCurveTo(-1.5*bk,-21.5,2.6*bk,-25);g.moveTo(-3.5*bk,-17);g.lineTo(1*bk,-16.6);g.moveTo(-3.2*bk,-11.5);g.lineTo(.8*bk,-11.2);g.stroke();g.strokeStyle=c.col;g.lineWidth=2.4;g.beginPath();g.moveTo(3.6*bk,-5);g.quadraticCurveTo(2.6*bk,-18,4*bk,-34);g.stroke();
   const ax=(J.af[0].x-J.hip.x),ay=(J.af[0].y-J.hip.y),cs=Math.cos(-tl),sn=Math.sin(-tl),ex2=ax*cs-ay*sn,ey2=ax*sn+ay*cs,sx2=-5*bk,sy2=-38;g.strokeStyle='rgba(0,0,0,.17)';g.lineWidth=13*bk;g.lineCap='round';g.beginPath();g.moveTo(sx2+3.5,sy2+3);g.lineTo(ex2+3.5,ey2+3);g.stroke();
   g.fillStyle='rgba(0,0,0,.2)';g.beginPath();g.ellipse(4*bk,-41,9*bk,3.4,0,0,TAU);g.fill()}
  else{g.strokeStyle=c.col;g.lineWidth=2.6;g.beginPath();g.moveTo(9.6*bk,-5);g.quadraticCurveTo(7.6*bk,-14,11.2*bk,-27);g.stroke()}
  g.fillStyle=c.col2;g.fillRect(-16,-3.2,32,5.4);g.fillStyle='rgba(0,0,0,.25)';g.fillRect(-16,1.2,32,1);g.fillStyle=INK;g.fillRect(5*bk,-4,4,7);g.fillStyle=c.col;g.fillRect(5.8*bk,-3,2.4,5);
  g.beginPath();g.moveTo(.5,-45);g.lineTo(9*bk,-41.5);g.lineTo(4.6*bk,-33);g.closePath();g.fillStyle=c.skin;g.fill();g.strokeStyle=INK;g.lineWidth=1.4;g.stroke();g.strokeStyle=c.skinSh;g.lineWidth=1;g.beginPath();g.moveTo(2.6,-41.5);g.lineTo(6.6*bk,-39.6);g.stroke();
  g.restore()}
 g.restore();
 if(!sil){const dm=o.dmg||0;if(dm>.5){const mx=(J.hip.x+J.sh.x)/2,my=(J.hip.y+J.sh.y)/2;g.fillStyle='rgba(150,16,28,.75)';g.beginPath();g.ellipse(mx+4,my-4,5,3.5,.5,0,TAU);g.ellipse(mx+7,my+1,2,3,0,0,TAU);g.fill();if(dm>.75){g.beginPath();g.ellipse(mx-2,my+10,4,2.6,-.4,0,TAU);g.fill();g.strokeStyle='#8a1420';g.lineWidth=1.3;g.beginPath();g.moveTo(J.af[0].x-3,J.af[0].y-3);g.lineTo(J.af[0].x+3,J.af[0].y+2);g.moveTo(J.lf[0].x-4,J.lf[0].y-6);g.lineTo(J.lf[0].x+2,J.lf[0].y-1);g.stroke()}}}
 /* neck + head */
 limb2([[{x:J.neck.x,y:J.neck.y+2},{x:hx,y:hy+6},4.1*bk,3.5,.2,.2,C(c.skinSh)]],ink,sil);
 g.save();g.translate(hx,hy);g.rotate(ha);headFront(c,o);g.restore();
 /* front arm */
 limb2([[J.shA,J.af[0],6*bk,4.7*bk,1.3,1.5,C(c.top),c.topSh,LT],[J.af[0],J.af[1],4.7*bk,3.4*bk,1.3,.6,C(c.bare?c.skin:c.top),c.bare?c.skinSh:c.topSh,c.bare?hi:LT]],ink,sil);
 if(!sil&&!c.bare){const w=J.af[1],e=J.af[0],dx=w.x-e.x,dy=w.y-e.y,L=Math.hypot(dx,dy)||1,x=w.x-dx/L*2.5,y=w.y-dy/L*2.5,nx=-dy/L*3.6*bk,ny=dx/L*3.6*bk;g.lineCap='butt';g.strokeStyle=INK;g.lineWidth=4;g.beginPath();g.moveTo(x-nx,y-ny);g.lineTo(x+nx,y+ny);g.stroke();g.strokeStyle=c.col;g.lineWidth=2.2;g.stroke();g.lineCap='round'}
 if(glove)hand(J.af[1],p[2]+p[3],C(c.col2),'rgba(0,0,0,.4)',ink,sil,true,gk);
 else{weapon(c,J.af[1],p[2]+p[3],o,false);hand(J.af[1],p[2]+p[3],C(c.skin),'rgba(120,50,40,.55)',ink,sil,grip,1)}
 if(glove&&!sil)circ(J.af[1].x+2,J.af[1].y-2,2.2,'#fff7d0');
 g.restore()}
drawChar=function(c,p,o){if(F().body2||F().d25){try{return drawChar2(c,p,o)}catch(e){return _dc(c,p,o)}}return _dc(c,p,o)};
})();
