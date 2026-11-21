/* Challenges (flag "chal") and Leaderboard (flag "lboard"). Both are off unless released from the Dev Studio. */
(function(){'use strict';
const F=()=>(typeof FLAGS!=='undefined'&&FLAGS)||{};
/* ---------- CHALLENGES ---------- */
const PER=[['d','DAILY',1,30],['w','WEEKLY',3,100],['m','MONTHLY',10,300]];
const s=(n,a)=>n+' '+a+(n>1?(a==='match'?'es':'s'):'');
const ML={play:n=>'Play '+s(n,'match'),win:n=>'Win '+s(n,'match'),ult:n=>'Use your ultimate '+s(n,'time'),ko:n=>'Knock out '+s(n,'fighter'),sum:n=>'Summon '+s(n,'fighter'),rplay:n=>'Play '+s(n,'ranked match'),rwin:n=>'Win '+s(n,'ranked match'),cwin:n=>'Win '+s(n,'casual match'),raid:n=>'Clear '+s(n,'boss raid'),exp:n=>'Win '+s(n,'EXP challenge'),login:n=>n>1?'Log in on '+n+' days':'Log in today'};
const LIST={
 d:[['play',1],['play',3],['play',5],['win',1],['win',2],['win',3],['ult',3],['ult',6],['ult',10],['ko',3],['ko',6],['ko',10],['sum',1],['sum',10],['rplay',1],['rwin',1],['cwin',1],['raid',1],['exp',1],['login',1]],
 w:[['play',10],['play',20],['play',30],['win',5],['win',10],['win',20],['ult',20],['ult',40],['ko',20],['ko',40],['ko',60],['sum',10],['sum',30],['rplay',5],['rwin',3],['rwin',6],['cwin',5],['raid',3],['exp',5],['login',5]],
 m:[['play',50],['play',100],['play',150],['win',30],['win',60],['win',100],['ult',100],['ult',200],['ko',100],['ko',200],['ko',300],['sum',50],['sum',100],['rplay',20],['rwin',15],['rwin',30],['cwin',20],['raid',10],['exp',20],['login',20]]};
const p2=n=>(n<10?'0':'')+n,dayKey=d=>d.getFullYear()+'-'+p2(d.getMonth()+1)+'-'+p2(d.getDate());
function keys(){const d=new Date(),mon=new Date(d.getFullYear(),d.getMonth(),d.getDate()-((d.getDay()+6)%7));return{d:dayKey(d),w:dayKey(mon),m:d.getFullYear()+'-'+p2(d.getMonth()+1)}}
function left(k){const d=new Date();let e;if(k==='d')e=new Date(d.getFullYear(),d.getMonth(),d.getDate()+1);else if(k==='w')e=new Date(d.getFullYear(),d.getMonth(),d.getDate()-((d.getDay()+6)%7)+7);else e=new Date(d.getFullYear(),d.getMonth()+1,1);const m=Math.max(0,Math.floor((e-d)/60000)),dd=Math.floor(m/1440),h=Math.floor(m%1440/60);return dd?dd+'d '+h+'h':h?h+'h '+(m%60)+'m':(m%60)+'m'}
function roll(){const K=keys(),C=SV.ch=SV.ch||{};let ch=false;PER.forEach(P=>{const k=P[0];if(!C[k]||C[k].k!==K[k]){C[k]={k:K[k],c:{},cl:[]};ch=true}});if(C.ld!==K.d){C.ld=K.d;PER.forEach(P=>{C[P[0]].c.login=(C[P[0]].c.login|0)+1});ch=true}if(ch)save();return C}
function add(m,n){if(!F().chal)return;const C=roll();PER.forEach(P=>{const c=C[P[0]].c;c[m]=(c[m]|0)+(n||1)});save()}
function ready(){if(!F().chal)return 0;const C=roll();let n=0;PER.forEach(P=>{const k=P[0];LIST[k].forEach((q,i)=>{if((C[k].c[q[0]]|0)>=q[1]&&!C[k].cl.includes(i))n++})});return n}
function drawChal(){scr();const C=roll(),sa=F().carrow,bw=Math.min(680,W-(sa?152:36)),bx=(W-bw)/2,tab=G.ctab=clamp(G.ctab|0,0,2),P=PER[tab],k=P[0],tw=(bw-16)/3;
 PER.forEach((q,i)=>{let n=0;LIST[q[0]].forEach((c,j)=>{if((C[q[0]].c[c[0]]|0)>=c[1]&&!C[q[0]].cl.includes(j))n++});button(bx+i*(tw+8),56,tw,32,q[1]+(n?'  ·  '+n:''),i===tab?'#b8782f':'#3a2a5e',()=>{G.ctab=i;G.cpg=0},18)});
 const rh=50,per=Math.max(3,Math.min(6,Math.floor((H-150)/rh))),L=LIST[k],np=Math.ceil(L.length/per);G.cpg=clamp(G.cpg|0,0,np-1);let y=98;
 L.slice(G.cpg*per,G.cpg*per+per).forEach((q,j)=>{const i=G.cpg*per+j,have=Math.min(q[1],C[k].c[q[0]]|0),done=have>=q[1],got=C[k].cl.includes(i);
  rr(bx,y,bw,rh-6,10);g.fillStyle='rgba(10,4,24,.7)';g.fill();g.strokeStyle=got?'rgba(255,255,255,.25)':done?'#ffe14d':'rgba(255,255,255,.45)';g.lineWidth=2;g.stroke();
  txt(ML[q[0]](q[1]),bx+14,y+15,16,got?'#a99cc6':'#fff',INK,'left',FU,3);const pw=Math.max(60,bw-330);rr(bx+14,y+28,pw,9,4);g.fillStyle='#120a22';g.fill();if(have){rr(bx+14,y+28,Math.max(9,pw*have/q[1]),9,4);g.fillStyle=done?'#7fe07a':'#7fdcff';g.fill()}txt(have+' / '+q[1],bx+22+pw,y+33,12,'#e6dcff',null,'left',FU);
  const ix=bx+bw-212;tixIcon(ix,y+14,.8,'#ffb020');txt('x'+P[2],ix+14,y+15,14,'#fff',INK,'left',FU,3);poly([[ix,y+25],[ix+6,y+33],[ix,y+41],[ix-6,y+33]],'#7fdcff','#fff',1.5);txt(''+P[3],ix+14,y+34,14,'#fff',INK,'left',FU,3);
  button(bx+bw-128,y+6,116,32,got?'CLAIMED':done?'CLAIM':'LOCKED',got?'#3a2a5e':done?'#2f7a5f':'#4a3a4e',()=>{if(got||!done)return;C[k].cl.push(i);SV.ytx=(SV.ytx||0)+P[2];SV.gems+=P[3];save();G.note={t:'+'+P[2]+' yellow ticket'+(P[2]>1?'s':'')+'  ·  +'+P[3]+' gems',T:2.6};sfx('ult')},17);y+=rh});
 if(np>1){if(sa){const ah=64,ay=98+(per*rh-6)/2-ah/2;button(Math.max(6,bx-56),ay,46,ah,'‹','#3a2a5e',()=>{G.cpg=((G.cpg|0)+np-1)%np},34);button(Math.min(W-52,bx+bw+10),ay,46,ah,'›','#3a2a5e',()=>{G.cpg=((G.cpg|0)+1)%np},34);txt((G.cpg+1)+' / '+np,bx,H-24,13,'#fff',INK,'left',FU,3)}else pager(W/2-78,H-40,'cpg',np)}txt(P[1]+' challenges reset in '+left(k),bx+bw,H-24,12,'#e6dcff',null,'right',FU);hdr('CHALLENGES','menu')}
SCR.chal=drawChal;BACK.chal='menu';
/* ---------- LEADERBOARD ---------- */
const BOARDS=[['RANKED','rank','pts'],['WINS','w','wins'],['RAIDS','r','clears'],['LEVEL','lvl','']],DAY0=Date.UTC(2026,10,1);
let BOTS=null,BOTD=-1;
function bots(){const days=Math.max(0,Math.floor((Date.now()-DAY0)/864e5));if(BOTS&&BOTD===days)return BOTS;BOTD=days;let sd=771199;const R=()=>{sd=(Math.imul(sd,1664525)+1013904223)>>>0;return sd/4294967296},A=['Kai','Zed','Ryu','Nova','Ace','Blaze','Shin','Luna','Jet','Miko','Rex','Yami','Tora','Vex','Nyx','Hiro','Sora','Kage','Raze','Echo','Onyx','Dash','Fang','Volt','Aki'],B=['','X','Z','_','','99','7','','Pro','GG','','23','01','','Kun'],out=[],seen={};
 while(out.length<120){let n=A[R()*A.length|0]+(R()<.5?A[R()*A.length|0].toLowerCase():'')+B[R()*B.length|0];if(R()<.25)n+=(R()*90|0)+10;n=n.slice(0,14);const sk=R(),act=.3+R()*1.4,wob=Math.sin(days*.7+out.length)*18;if(seen[n])continue;seen[n]=1;
  const w=Math.floor(8+sk*sk*260+act*days*(1.2+sk*2.2)),xp=Math.floor(300+sk*9000+act*days*(260+sk*240));out.push({name:n,rank:Math.round(940+sk*sk*1150+Math.min(240,days*act*1.5)+wob),w,r:Math.floor(sk*30+act*days*(.25+sk*.5)),lvl:1+Math.floor(xp/400)})}
 return BOTS=out}
const LBS={rows:[],t:-1e9,sent:''};
function did(){if(!SV.did){SV.did='p'+Math.random().toString(36).slice(2,12)+Date.now().toString(36);save()}return SV.did}
function mine(){const L=SV.lb||{};return{id:did(),name:SV.name,rank:SV.rank||1000,w:L.w|0,r:L.r|0,lvl:lvl(),me:1,icon:SV.icon|0,banner:SV.banner|0}}
/* flag lbicon: profile icon and banner on every row. Bots get theirs from their name. */
function lbLook(q){if(q.icon==null||q.banner==null){let h=7;for(let i=0;i<q.name.length;i++)h=(Math.imul(h,31)+q.name.charCodeAt(i))>>>0;q.icon=h%CH.length;q.banner=(h>>>9)%CH.length}return[CH[q.icon]||CH[0],CH[q.banner]||CH[0]]}
function lbSync(force){if(!F().lboard||typeof fetch!=='function')return;const m=mine(),body=JSON.stringify(Object.assign({id:m.id,name:m.name,rank:m.rank,w:m.w,r:m.r,xp:SV.xp|0},F().lbicon?{icon:m.icon,banner:m.banner}:{}));
 try{if(body!==LBS.sent){LBS.sent=body;fetch('api/lb',{method:'POST',headers:{'content-type':'application/json'},body}).catch(()=>{})}
  if(force||performance.now()-LBS.t>45000){LBS.t=performance.now();fetch('api/lb').then(r=>r.ok?r.json():null).then(j=>{if(j&&Array.isArray(j.rows))LBS.rows=j.rows.filter(q=>q&&typeof q.name==='string').slice(0,400).map(q=>({id:String(q.id||''),name:String(q.name).slice(0,14),rank:q.rank|0,w:q.w|0,r:q.r|0,lvl:1+Math.floor((q.xp|0)/400),icon:q.icon|0,banner:q.banner|0}))}).catch(()=>{})}}catch(e){}}
function drawLb(){scr();lbSync(false);const tab=G.ltab=clamp(G.ltab|0,0,3),B=BOARDS[tab],key=B[1],ic=F().lbicon,sa=F().lbarrow,bw=Math.min(640,W-(sa?152:36)),bx=(W-bw)/2,tw=(bw-24)/4,me=mine();
 BOARDS.forEach((q,i)=>button(bx+i*(tw+8),56,tw,32,q[0],i===tab?'#b8782f':'#3a2a5e',()=>{G.ltab=i;G.lpg=0},17));
 const all=bots().concat(LBS.rows.filter(q=>q.id!==me.id),[me]).sort((a,b)=>b[key]-a[key]||(a.name<b.name?-1:1)),place=all.indexOf(me)+1,rh=ic?40:30,per=Math.max(ic?4:5,Math.min(10,Math.floor((H-160)/rh))),top=all.slice(0,100),np=Math.ceil(top.length/per);G.lpg=clamp(G.lpg|0,0,np-1);let y=98;
 top.slice(G.lpg*per,G.lpg*per+per).forEach((q,j)=>{const n=G.lpg*per+j+1;rr(bx,y,bw,rh-4,8);g.fillStyle=q.me?'rgba(255,225,77,.22)':'rgba(10,4,24,.66)';g.fill();if(q.me){g.strokeStyle='#ffe14d';g.lineWidth=2;g.stroke()}
  if(ic){const L=lbLook(q),cy=y+(rh-4)/2,is=rh-10,nx=bx+60+is+8,nw=Math.min(230,bw-(60+is+8)-120),nh=rh-12;txt('#'+n,bx+14,cy,16,n<=3?'#ffe14d':'#fff',INK,'left',FB,4);
   g.save();rr(nx,cy-nh/2,nw,nh,6);g.clip();worldBG(L[1],nx,cy-nh/2,nw,nh);g.fillStyle='rgba(8,4,20,.28)';g.fillRect(nx,cy-nh/2,nw,nh);g.restore();rr(nx,cy-nh/2,nw,nh,6);g.strokeStyle='rgba(255,255,255,.55)';g.lineWidth=1.5;g.stroke();
   drawIcon(L[0],bx+60,cy-is/2,is,null,1);rr(bx+60,cy-is/2,is,is,is*.16);g.strokeStyle='#fff';g.lineWidth=1.5;g.stroke();
   txt(q.name+(q.me?'  (YOU)':''),nx+10,cy,15,'#fff',INK,'left',FU,4);txt(fmtG(q[key])+(B[2]?' '+B[2]:''),bx+bw-14,cy,15,'#7fdcff',INK,'right',FU,3)}
  else{txt('#'+n,bx+14,y+13,16,n<=3?'#ffe14d':'#fff',INK,'left',FB,4);txt(q.name+(q.me?'  (YOU)':''),bx+70,y+13,15,'#fff',INK,'left',FU,3);txt(fmtG(q[key])+(B[2]?' '+B[2]:''),bx+bw-14,y+13,15,'#7fdcff',INK,'right',FU,3)}y+=rh});
 if(np>1){if(sa){const ah=64,ay=98+(per*rh-4)/2-ah/2;button(Math.max(6,bx-56),ay,46,ah,'‹','#3a2a5e',()=>{G.lpg=((G.lpg|0)+np-1)%np},34);button(Math.min(W-52,bx+bw+10),ay,46,ah,'›','#3a2a5e',()=>{G.lpg=((G.lpg|0)+1)%np},34);txt((G.lpg+1)+' / '+np,bx+bw,H-24,13,'#fff',INK,'right',FU,3)}else pager(W/2-78,H-40,'lpg',np)}txt('Your place: #'+place+'  ·  '+fmtG(me[key])+(B[2]?' '+B[2]:''),bx,H-24,13,'#ffe14d',INK,'left',FU,3);hdr('LEADERBOARD','menu')}
SCR.lb=drawLb;BACK.lb='menu';
/* ---------- hooks ---------- */
const _fin=finish;finish=function(win){const r=G.rules,t=r&&r.type;_fin(win);const fl=F();if(!t||t==='training'||t==='summon'||t==='scene'||(!fl.chal&&!fl.lboard))return;
 if(fl.lboard){const L=SV.lb=SV.lb||{w:0,r:0};if(win){L.w=(L.w|0)+1;if(t==='raid')L.r=(L.r|0)+1}save();lbSync(false)}
 if(fl.chal){add('play');if(win)add('win');if(t==='ranked'){add('rplay');if(win)add('rwin')}if(win&&t==='casual')add('cwin');if(win&&t==='raid')add('raid');if(win&&t==='exp')add('exp')}};
const _ult=startUlt;startUlt=function(f,o){_ult(f,o);if(F().chal&&G.mode==='fight'&&G.f&&f===G.f[G.me]&&G.rules&&G.rules.type!=='training')add('ult')};
const _sum=startSummon;startSummon=function(list){_sum(list);if(F().chal)add('sum',(list&&list.length)||1)};
const _upd=update;update=function(rdt){_upd(rdt);if(!F().chal)return;const r=G.rules;if(!r||(G.mode!=='fight'&&G.mode!=='ko')||r.type==='training'||r.type==='summon'||!G.tm||!G.tm[1-G.me])return;const dead=G.tm[1-G.me].list.filter(q=>q.hp<=0).length;if(r._kd==null||dead<r._kd)r._kd=dead;else if(dead>r._kd){add('ko',dead-r._kd);r._kd=dead}};
{const m0=SCR.menu;SCR.menu=function(){m0();const fl=F();if(!fl.chal&&!fl.lboard)return;const ww=W*.42,wx=W-ww-22,wy=58,bw=Math.min(150,(ww-30)/2);let x=wx+10;
 if(fl.chal){const n=ready();button(x,wy+34,bw,30,'CHALLENGES'+(n?' · '+n:''),n?'#2f7a5f':'#3a2a5e',()=>{G.cpg=0;goto('chal')},bw<140?13:15);x+=bw+10}
 if(fl.lboard)button(x,wy+34,bw,30,'LEADERBOARD','#2f4f8f',()=>{G.lpg=0;lbSync(true);goto('lb')},bw<140?13:15)}}
})();
