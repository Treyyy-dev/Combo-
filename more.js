/* Challenges (flag "chal") and Leaderboard (flag "lboard"), plus lbicon, lbarrow, lblvl, bots300, prof2, endcard, padd, lbtap, lbbord, botfind, gahold. All off unless released from the Dev Studio. */
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
function lbSync(force){if(!F().lboard||typeof fetch!=='function')return;const m=mine(),body=JSON.stringify(Object.assign({id:m.id,name:m.name,rank:m.rank,w:m.w,r:m.r,xp:SV.xp|0},F().lbicon?{icon:m.icon,banner:m.banner}:{},F().lbbord?{border:SV.border|0}:{}));
 try{if(body!==LBS.sent){LBS.sent=body;fetch('api/lb',{method:'POST',headers:{'content-type':'application/json'},body}).catch(()=>{})}
  if(force||performance.now()-LBS.t>45000){LBS.t=performance.now();fetch('api/lb').then(r=>r.ok?r.json():null).then(j=>{if(j&&Array.isArray(j.rows))LBS.rows=j.rows.filter(q=>q&&typeof q.name==='string').slice(0,400).map(q=>({id:String(q.id||''),name:String(q.name).slice(0,14),rank:q.rank|0,w:q.w|0,r:q.r|0,lvl:1+Math.floor((q.xp|0)/400),icon:q.icon|0,banner:q.banner|0,border:q.border|0}))}).catch(()=>{})}}catch(e){}}
function drawLb(){scr();lbSync(false);const tab=G.ltab=clamp(G.ltab|0,0,3),B=BOARDS[tab],key=B[1],ic=F().lbicon,sa=F().lbarrow,bw=Math.min(640,W-(sa?152:36)),bx=(W-bw)/2,tw=(bw-24)/4,me=mine();
 BOARDS.forEach((q,i)=>button(bx+i*(tw+8),56,tw,32,q[0],i===tab?'#b8782f':'#3a2a5e',()=>{G.ltab=i;G.lpg=0},17));
 const lv2=F().lblvl,all=(F().bots300?roster():bots()).concat(LBS.rows.filter(q=>q.id!==me.id),[me]).sort((a,b)=>b[key]-a[key]||(a.name<b.name?-1:1)),place=all.indexOf(me)+1,rh=ic?40:30,per=Math.max(ic?4:5,Math.min(10,Math.floor((H-160)/rh))),top=all.slice(0,100),np=Math.ceil(top.length/per);G.lpg=clamp(G.lpg|0,0,np-1);let y=98;
 top.slice(G.lpg*per,G.lpg*per+per).forEach((q,j)=>{const n=G.lpg*per+j+1;rr(bx,y,bw,rh-4,8);g.fillStyle=q.me?'rgba(255,225,77,.22)':'rgba(10,4,24,.66)';g.fill();if(q.me){g.strokeStyle='#ffe14d';g.lineWidth=2;g.stroke()}
  if(ic){const L=lbLook(q),cy=y+(rh-4)/2,is=rh-10,nx=bx+60+is+8,nw=Math.min(230,bw-(60+is+8)-120),nh=rh-12;txt('#'+n,bx+14,cy,16,n<=3?'#ffe14d':'#fff',INK,'left',FB,4);
   g.save();rr(nx,cy-nh/2,nw,nh,6);g.clip();worldBG(L[1],nx,cy-nh/2,nw,nh);g.fillStyle='rgba(8,4,20,.28)';g.fillRect(nx,cy-nh/2,nw,nh);g.restore();rr(nx,cy-nh/2,nw,nh,6);g.strokeStyle='rgba(255,255,255,.55)';g.lineWidth=1.5;g.stroke();
   if(F().lbbord)drawIcon(L[0],bx+60,cy-is/2,is,q.me?SV.border|0:q.border!=null?q.border|0:hs(q.name)%30,1);else{drawIcon(L[0],bx+60,cy-is/2,is,null,1);rr(bx+60,cy-is/2,is,is,is*.16);g.strokeStyle='#fff';g.lineWidth=1.5;g.stroke()}
   txt(q.name+(q.me?'  (YOU)':''),nx+10,cy,15,'#fff',INK,'left',FU,4);if(lv2)lbLR(q,nx+nw+12,cy);txt(fmtG(q[key])+(B[2]?' '+B[2]:''),bx+bw-14,cy,15,'#7fdcff',INK,'right',FU,3)}
  else{txt('#'+n,bx+14,y+13,16,n<=3?'#ffe14d':'#fff',INK,'left',FB,4);txt(q.name+(q.me?'  (YOU)':''),bx+70,y+13,15,'#fff',INK,'left',FU,3);if(lv2)lbLR(q,bx+bw*.46,y+13);txt(fmtG(q[key])+(B[2]?' '+B[2]:''),bx+bw-14,y+13,15,'#7fdcff',INK,'right',FU,3)}if(F().lbtap)hit(bx,y,bw,rh-4,()=>lbOpen(q));y+=rh});
 if(np>1){if(sa){const ah=64,ay=98+(per*rh-4)/2-ah/2;button(Math.max(6,bx-56),ay,46,ah,'‹','#3a2a5e',()=>{G.lpg=((G.lpg|0)+np-1)%np},34);button(Math.min(W-52,bx+bw+10),ay,46,ah,'›','#3a2a5e',()=>{G.lpg=((G.lpg|0)+1)%np},34);txt((G.lpg+1)+' / '+np,bx+bw,H-24,13,'#fff',INK,'right',FU,3)}else pager(W/2-78,H-40,'lpg',np)}txt('Your place: #'+place+'  ·  '+fmtG(me[key])+(B[2]?' '+B[2]:''),bx,H-24,13,'#ffe14d',INK,'left',FU,3);hdr('LEADERBOARD','menu')}
BACK.lb='menu';
/* ---------- hooks ---------- */
const _fin=finish;finish=function(win){const r=G.rules,t=r&&r.type;_fin(win);const fl=F();if(!t||t==='training'||t==='summon'||t==='scene'||(!fl.chal&&!fl.lboard))return;
 if(fl.lboard){const L=SV.lb=SV.lb||{w:0,r:0};if(win){L.w=(L.w|0)+1;if(t==='raid')L.r=(L.r|0)+1}save();lbSync(false)}
 if(fl.chal){add('play');if(win)add('win');if(t==='ranked'){add('rplay');if(win)add('rwin')}if(win&&t==='casual')add('cwin');if(win&&t==='raid')add('raid');if(win&&t==='exp')add('exp')}};
const _ult=startUlt;startUlt=function(f,o){_ult(f,o);if(F().chal&&G.mode==='fight'&&G.f&&f===G.f[G.me]&&G.rules&&G.rules.type!=='training')add('ult')};
const _sum=startSummon;startSummon=function(list){_sum(list);if(F().chal)add('sum',(list&&list.length)||1)};
const _upd=update;update=function(rdt){_upd(rdt);if(!F().chal)return;const r=G.rules;if(!r||(G.mode!=='fight'&&G.mode!=='ko')||r.type==='training'||r.type==='summon'||!G.tm||!G.tm[1-G.me])return;const dead=G.tm[1-G.me].list.filter(q=>q.hp<=0).length;if(r._kd==null||dead<r._kd)r._kd=dead;else if(dead>r._kd){add('ko',dead-r._kd);r._kd=dead}};
/* ---------- flag lblvl: level and rank on every leaderboard row ---------- */
function lbLR(q,x,y){txt('LV '+(q.lvl|0),x,y,12,'#ffe14d',INK,'left',FU,3);txt(tier(q.rank|0)+' '+fmtG(q.rank|0),x+52,y,12,'#e6dcff',INK,'left',FU,3)}
/* ---------- flag bots300: one fixed list of 300 bots, each with a name and a full profile. Used for online opponents and the leaderboard. ---------- */
const hs=n=>{let h=7;for(let i=0;i<n.length;i++)h=(Math.imul(h,31)+n.charCodeAt(i))>>>0;return h};
let ROS=null,ROSD=-1,ROSN=0;
function roster(){const days=Math.max(0,Math.floor((Date.now()-DAY0)/864e5));if(ROS&&ROSD===days&&ROSN===CH.length)return ROS;ROSD=days;ROSN=CH.length;let sd=20261120;const R=()=>{sd=(Math.imul(sd,1664525)+1013904223)>>>0;return sd/4294967296},out=[],seen={};
 while(out.length<300){let n=BN1[R()*BN1.length|0]+BN2[R()*BN2.length|0]+BN3[R()*BN3.length|0];if(R()<.14)n='xX'+n.slice(0,10)+'Xx';if(R()<.3)n=n.toLowerCase();n=n.slice(0,14);const sk=R(),act=.3+R()*1.4,i=out.length,k=n.toLowerCase();if(seen[k])continue;seen[k]=1;
  let s2=(hs(n)^0x9e3779b9)>>>0;const Q=()=>{s2=(Math.imul(s2,1664525)+1013904223)>>>0;return s2/4294967296},t=[];let gd=0;while(t.length<3&&gd++<60){const c=Q()*CH.length|0;if(!t.includes(c))t.push(c)}while(t.length<3)t.push(t.length%CH.length);
  const w=Math.floor(8+sk*sk*260+act*days*(1.2+sk*2.2)),xp=Math.floor(300+sk*9000+act*days*(260+sk*240)),wob=Math.sin(days*.7+i)*18;
  out.push({name:n,bot:1,rank:Math.max(0,Math.round(940+sk*sk*1150+Math.min(240,days*act*1.5)+wob)),w,r:Math.floor(sk*30+act*days*(.25+sk*.5)),lvl:clamp(1+Math.floor(xp/400),1,999),rw:Math.floor(w*(.2+sk*.35)),icon:Q()<.7?t[0]:Q()*CH.length|0,banner:Q()*CH.length|0,border:Q()<.35?0:Q()*30|0,
   mt:t.map(c=>[c,clamp(Math.round(3+sk*110+Q()*25+days*act*.25),1,200),clamp(1+Math.floor(Q()*(1.5+sk*7)),1,14)])})}
 return ROS=out}
const botProf=b=>({name:b.name,border:b.border|0,icon:b.icon|0,banner:b.banner|0,lvl:b.lvl|0,rank:b.rank|0,rw:b.rw|0,mt:b.mt.map(q=>q.slice()),bot:1});
{const mb0=mkBot;mkBot=function(type){if(!F().bots300)return mb0(type);const L=roster(),pro=type==='ranked';let b=L[Math.random()*L.length|0];if(pro){const my=SV.rank||1000;for(let k=0;k<10;k++){const c=L[Math.random()*L.length|0];if(Math.abs(c.rank-my)<Math.abs(b.rank-my))b=c}}
 return{team:b.mt.map(q=>clamp(q[0]|0,0,CH.length-1)),cd:pro?3:Math.random()<.5?0:1,prof:botProf(b)}}}
function fillBot(p,team){if(!p)return p;if(!Array.isArray(p.mt)||!p.mt.length){const h=hs(p.name||'x');p.mt=(team&&team.length?team:[0,1,2]).slice(0,3).map((c,i)=>[c|0,clamp(Math.round((p.lvl|0)*.9+((h>>>(i*5))%20)),1,200),1+((h>>>(i*3+7))%5)])}if(p.rw==null)p.rw=Math.floor((p.lvl|0)*1.6+(hs(p.name||'x')%25));p.bot=1;return p}
/* ---------- flag prof2: ranked wins and most used team on the profile, and other players can open a profile to see them ---------- */
const PF=()=>{if(!SV.pf||typeof SV.pf!=='object')SV.pf={rw:0,tm:{}};if(!SV.pf.tm)SV.pf.tm={};return SV.pf};
function mostTeam(){const T=PF().tm;let best=null,bn=0;for(const k in T)if(T[k]>bn){bn=T[k];best=k}let ids=best?best.split(',').map(n=>CH.findIndex(c=>c.name===n)).filter(i=>i>=0):[];if(ids.length!==3)ids=SV.team.slice(0,3);return ids.map(i=>[i,lvOf(CH[i].name),clamp(SV.owned[CH[i].name]|0||1,1,14)])}
{const mp0=myProf;myProf=function(){const p=mp0();if(F().prof2){p.rw=PF().rw|0;p.mt=mostTeam()}return p};
 const cp0=cleanProf;cleanProf=function(p){const o=cp0(p);if(p&&typeof p==='object'){if(p.rw!=null)o.rw=clamp(p.rw|0,0,1e6);if(Array.isArray(p.mt))o.mt=p.mt.slice(0,3).filter(q=>Array.isArray(q)).map(q=>[clamp(q[0]|0,0,CH.length-1),clamp(q[1]|0,1,200),clamp(q[2]|0,1,14)])}return o};
 const g0=goto;goto=function(m){G.pv=null;return g0(m)}}
function pvOpen(p,on){if(p)G.pv={p,on:on==null?null:!!on}}
function lbOpen(q){if(q.me)return pvOpen(myProf(),true);if(q.bot&&q.mt)return pvOpen(botProf(q),botOn(q.name));const L=lbLook(q),p={name:q.name,icon:CH.indexOf(L[0]),banner:CH.indexOf(L[1]),border:q.border|0,lvl:q.lvl|0,rank:q.rank|0};if(q.id==null){fillBot(p,null);return pvOpen(p,botOn(q.name))}pvOpen(p,null)}
{const l0=drawLb;SCR.lb=function(){l0();drawPV()}}
/* flag padd: add a friend from the profile panel, and a check mark wherever the player is already added */
const CK='\u2713 ';
function addP(p){const n=p.name;if(!n||n===SV.name||SV.friends.includes(n))return;const rq=FR.req.find(q=>q.name===n),bot=!!(p.bot||BF.known[n]);if(rq){if(bot)BF.known[n]=BF.known[n]||p;frAdd(n);FR.req=FR.req.filter(q=>q!==rq);if(!bot){FR.on[n]=rq;netRaw({t:'fa',to:n})}return}
 if(BF.sent[n])return;BF.sent[n]=1;if(bot){BF.known[n]=BF.known[n]||p;BF.q.push({p:BF.known[n],at:G.t+rnd(2.5,7),kind:'acc',ok:Math.random()<.6})}else{if(NET.st!=='on'){BF.sent[n]=0;G.note={t:'Not connected to the online server',T:2.5};return}netRaw({t:'fr',to:n})}G.note={t:'Friend request sent to '+n,T:2.5}}
function teamRow(mt,cx,y,ts){const n=mt.length,gap=14,x0=cx-(n*ts+(n-1)*gap)/2;mt.forEach((q,i)=>{const c=CH[q[0]]||CH[0],x=x0+i*(ts+gap);drawIcon(c,x,y,ts,null,1);rr(x,y,ts,ts,ts*.16);g.strokeStyle='#fff';g.lineWidth=2;g.stroke();txt(c.name,x+ts/2,y+ts+11,11,'#fff',INK,'center',FU,3);txt('LV '+q[1],x+ts/2,y+ts+25,12,'#7fdcff',INK,'center',FU,3);stars(q[2],x+ts/2,y+ts+40,11)})}
function drawPV(){const V=G.pv;if(!V)return;G.ui=[];const p=V.p,pw=Math.min(500,W-40),px=(W-pw)/2,py=34,ph=H-64;g.fillStyle='rgba(6,2,18,.88)';g.fillRect(0,0,W,H);rr(px,py,pw,ph,14);g.fillStyle='#1a1030';g.fill();g.strokeStyle='#fff';g.lineWidth=2.5;g.stroke();
 profCard(p,px+14,py+14,pw-28,78,false);const y1=py+108;if(V.on!=null){circ(px+24,y1,5,V.on?'#5fe07a':'#555',INK,1.5);txt(V.on?'ONLINE':'OFFLINE',px+36,y1,13,V.on?'#7fe07a':'#cbbfe6',INK,'left',FU,3)}
 txt('LEVEL '+(p.lvl|0)+'   ·   '+tier(p.rank|0)+' '+fmtG(p.rank|0)+'   ·   RANKED WINS '+(p.rw==null?'-':fmtG(p.rw|0)),px+pw-18,y1,13,'#fff',INK,'right',FU,3);
 txt('MOST USED TEAM',W/2,y1+26,16,'#ffe14d',INK,'center',FB,4);const ts=Math.min(72,ph-270);if(Array.isArray(p.mt)&&p.mt.length)teamRow(p.mt,W/2,y1+42,ts);else txt('No team to show yet.',W/2,y1+80,13,'#cbbfe6',null,'center',FU);
 if(F().padd&&p.name&&p.name!==SV.name){const fr=SV.friends.includes(p.name),rq=!fr&&FR.req.some(q=>q.name===p.name),sent=!fr&&!rq&&(BF.sent[p.name]||(G.res&&G.res.frs&&G.rules&&G.rules.opp&&G.rules.opp.name===p.name)),lab=fr?CK+'ADDED':rq?'ACCEPT REQUEST':sent?'REQUEST SENT':'ADD FRIEND';
  button(W/2-164,py+ph-44,170,34,lab,fr||sent?'#3a2a5e':'#2f7a5f',()=>{addP(p)},15);button(W/2+24,py+ph-44,140,34,'CLOSE','#5b2a7c',()=>{G.pv=null},18)}
 else button(W/2-70,py+ph-44,140,34,'CLOSE','#5b2a7c',()=>{G.pv=null},18)}
{const p0=SCR.profile;SCR.profile=function(){if(!F().prof2)return p0();const t0=txt,cw2=Math.min(300,W*.36),cx=14;txt=function(s,x,y){if(typeof s==='string'&&y>=300&&y<=354&&x===cx+cw2/2&&(s.indexOf('Win matches')===0||s.indexOf('Ranked Combo')===0||s.indexOf('Icons: ')===0||s.indexOf('Banners: ')===0))return;return t0.apply(this,arguments)};try{p0()}finally{txt=t0}
 const y=294;txt('RANKED WINS  '+fmtG(PF().rw|0),cx+cw2/2,y,15,'#fff',INK,'center',FU,3);txt('MOST USED TEAM',cx+cw2/2,y+20,13,'#ffe14d',INK,'center',FU,3);teamRow(mostTeam(),cx+cw2/2,y+32,Math.min(54,H-y-32-52))}}
/* ---------- flag endcard: online match end screen with both profiles, add friend (bots too), bot friends ---------- */
const BF={q:[],known:{},sent:{}},isBotFr=n=>!!(SV.bfr&&SV.bfr[n]);
function botOn(n){const slot=Math.floor(Date.now()/9e5);return((hs(n)^Math.imul(slot,2654435761))>>>0)%100<45}
function botPresence(){const B=SV.bfr;if(!B)return;for(const n in B){if(!SV.friends.includes(n)){delete B[n];delete FR.on[n];continue}if(NET.st==='on'&&botOn(n))FR.on[n]=B[n];else delete FR.on[n]}}
{const fa0=frAdd;frAdd=function(n){fa0(n);if(F().endcard&&BF.known[n]&&SV.friends.includes(n)){(SV.bfr=SV.bfr||{})[n]=BF.known[n];save()}}}
function addOpp(r,op,R){if(R.frs||SV.friends.includes(op.name))return;BF.sent[op.name]=1;const rq=FR.req.find(q=>q.name===op.name);if(rq){frAdd(op.name);FR.req=FR.req.filter(q=>q!==rq);if(!r.bot){FR.on[op.name]=rq;netRaw({t:'fa',to:op.name})}R.frs=2;return}
 R.frs=1;if(r.bot)BF.q.push({p:op,at:G.t+rnd(2.5,7),kind:'acc',ok:Math.random()<.6});else netRaw({t:'fr',to:op.name});G.note={t:'Friend request sent to '+op.name,T:2.5}}
{const u0=update;update=function(rdt){u0(rdt);if(!BF.q.length)return;for(let i=BF.q.length-1;i>=0;i--){const e=BF.q[i];if(G.t<e.at)continue;BF.q.splice(i,1);if(!F().endcard||SV.friends.includes(e.p.name))continue;
  if(e.kind==='acc'){if(e.ok){frAdd(e.p.name);G.note={t:e.p.name+' accepted your friend request',T:3.5}}}else frReq(e.p)}}}
{const fn0=finish;finish=function(win){const r=G.rules,t=r&&r.type;fn0(win);const fl=F();if(!r)return;
 if(fl.prof2&&(t==='casual'||t==='ranked'||t==='team'||t==='raid'||t==='exp')){const P=PF(),ids=Array.isArray(r.team)&&r.team.length===3?r.team:SV.team,k=ids.map(i=>CH[i]&&CH[i].name).filter(Boolean).sort().join(',');if(k){P.tm[k]=(P.tm[k]|0)+1;const ks=Object.keys(P.tm);if(ks.length>40){ks.sort((a,b)=>P.tm[a]-P.tm[b]);delete P.tm[ks[0]]}}if(win&&t==='ranked')P.rw=(P.rw|0)+1;save();if(NET.st==='on')netHello()}
 if(fl.endcard&&r.bot&&r.opp&&(t==='casual'||t==='ranked')){const op=fillBot(r.opp,r.eteam);BF.known[op.name]=op;if(!SV.friends.includes(op.name)&&Math.random()<.25)BF.q.push({p:op,at:G.t+rnd(2,6),kind:'req'})}}}
{const dr0=drawResult;drawResult=function(){const r=G.rules,R=G.res;if(!F().endcard||!R||!r||!(r.online||r.bot)||r.raid||r.type==='raid'||!r.opp||!r.opp.name)return dr0();
 G.ui=[];const win=R.win,me=myProf(),op=r.bot?fillBot(r.opp,r.eteam):r.opp,on=!G.left;g.fillStyle='rgba(8,0,26,.72)';g.fillRect(0,0,W,H);
 const s=1+Math.max(0,.3-G.mt)*5,fs=Math.min(84,W*.11),ty=H*.15;g.save();g.translate(W/2,ty);g.scale(s,s);g.rotate(-.04);txt(R.title,0,0,fs,win?'#ffe14d':'#8fa0c8','#fff','center',FB,14);txt(R.title,0,0,fs,win?'#ffe14d':'#8fa0c8',INK,'center',FB,7);g.restore();
 if(R.sub)txt(R.sub,W/2,ty+fs*.62,17,'#7fdcff',INK,'center',FB,5);
 const cw=Math.min(300,(W-120)/2),chh=84,cy=H*.36,lx=W/2-46-cw,rx=W/2+46;profCard(me,lx,cy,cw,chh,false);profCard(op,rx,cy,cw,chh,true);g.save();g.translate(W/2,cy+chh/2);g.rotate(-.08);txt('VS',0,0,44,'#ff3d5a',INK,'center',FB,8);g.restore();
 if(F().prof2){hit(lx,cy,cw,chh,()=>{if(G.mt>.6)pvOpen(me,true)});hit(rx,cy,cw,chh,()=>{if(G.mt>.6)pvOpen(op,on)})}
 const sy=cy+chh+20;txt('YOU',lx+cw/2,sy,13,'#ffe14d',INK,'center',FU,3);circ(rx+12,sy,5,on?'#5fe07a':'#555',INK,1.5);txt(on?'ONLINE':'OFFLINE',rx+24,sy,13,on?'#7fe07a':'#cbbfe6',INK,'left',FU,3);
 const fr=SV.friends.includes(op.name),rq=!fr&&FR.req.some(q=>q.name===op.name),lab=fr?(F().padd?CK+'ADDED':'FRIENDS'):rq?'ACCEPT REQUEST':R.frs||(F().padd&&BF.sent[op.name])?'REQUEST SENT':'ADD FRIEND',bw2=Math.min(170,cw-96);button(rx+cw-bw2,sy-15,bw2,30,lab,fr||(R.frs&&!rq)?'#3a2a5e':'#2f7a5f',()=>{if(G.mt>.6)addOpp(r,op,R)},bw2<160?12:14);
 txt('+'+fmtG(R.gm)+' GEMS   ·   +'+(R.xp||0)+' XP'+(R.rt?'   ·   +'+R.rt+' RED':'')+(R.yt?'   ·   +'+R.yt+' YELLOW':'')+'   ·   LEVEL '+lvl(),W/2,sy+38,20,'#7fdcff',INK,'center',FB,6);
 const bw=Math.min(190,(W-50)/2),by=Math.min(H-66,sy+64);button(W/2-bw-10,by,bw,50,'PLAY AGAIN',G.f[G.me].c.col,()=>{if(G.mt>.6)again()},24);button(W/2+10,by,bw,50,'LEAVE','#5b2a7c',()=>{if(G.mt>.6)menuAct('back')},24);drawPV()}}
{const f0=SCR.friends;SCR.friends=function(){const fl=F();if(fl.endcard)botPresence();if(fl.botfind&&FR.found&&FR.q&&!FR.found._b){const q=String(FR.q).toLowerCase(),have={};FR.found.forEach(p=>{have[p.name.toLowerCase()]=1});const nf=FR.found.concat(roster().filter(b=>b.name.toLowerCase().indexOf(q)>=0&&!have[b.name.toLowerCase()]&&b.name!==SV.name).slice(0,Math.max(0,6-FR.found.length)).map(botProf));nf._b=1;FR.found=nf}
 if(fl.padd||fl.botfind){const b0=button;let k=0;button=function(x,y,w,h,l){if(w===88&&h===34&&(l==='ADD'||l==='ADDED')){const a=Array.prototype.slice.call(arguments),p=FR.found&&FR.found[k++];if(l==='ADDED'){if(fl.padd)a[4]=CK+'ADDED'}else if(fl.botfind&&p&&p.bot){if(BF.sent[p.name]){a[4]='SENT';a[5]='#3a2a5e'}a[6]=()=>addP(p)}return b0.apply(this,a)}return b0.apply(this,arguments)};try{f0()}finally{button=b0}}else f0();if(!fl.prof2&&!fl.endcard)return;const lx=14,lw=Math.min(290,W*.35),rx=lx+lw+16,rw=W-rx-14,sel=!FR.found&&FR.sel;
 if(fl.endcard&&sel&&isBotFr(sel)){G.ui=G.ui.filter(u=>!(u.x>=rx&&u.y>=H-64));rr(rx+6,124,rw-12,H-14-130,10);g.fillStyle='#150b2a';g.fill();txt('Chat is turned off for this player.',rx+rw/2,124+(H-144)/2,14,'#cbbfe6',null,'center',FU)}
 if(fl.prof2){const vw=(x,y,w,p,on)=>{if(!p)return;hit(x,y,w,46,()=>pvOpen(p,on));txt('VIEW ›',x+w-8,y+38,10,'#ffe14d',INK,'right',FU,3)};if(FR.found)FR.found.forEach((p,i)=>vw(rx+12,94+i*52,rw-120,p,p.bot?botOn(p.name):true));else if(sel){const o=FR.on[sel];if(o)vw(rx+12,70,rw-130,o,true);else if(isBotFr(sel))vw(rx+12,70,rw-130,SV.bfr[sel],false)}}
 drawPV()}}
/* flag gahold: in GACHA, hold a featured fighter to open their stats; the stats screen then has a TEST button */
{const g0=SCR.gacha;SCR.gacha=function(){if(!F().gahold)return g0();const h0=hit,t0=tile;let pend=-1;hit=function(x,y,w,h,fn,hold){if(typeof fn==='function'&&String(fn).indexOf('Do you want to test')>=0)pend=G.ui.length;return h0(x,y,w,h,fn,hold)};
 tile=function(c){if(pend>=0&&G.ui[pend]){const ci=CH.indexOf(c);if(ci>=0)G.ui[pend].hold=()=>{G.fd=ci;G.fdret='gacha';BACK.fdetail='gacha';goto('fdetail')}}pend=-1;return t0.apply(this,arguments)};try{g0()}finally{hit=h0;tile=t0}};
 const tm0=SCR.teams;SCR.teams=function(){G.fdret=null;BACK.fdetail='teams';return tm0()};
 const d0=SCR.fdetail;SCR.fdetail=function(){if(!F().gahold||G.fdret!=='gacha')return d0();const b0=button;button=function(x,y,w,h,l){if(l==='BACK'){const a=Array.prototype.slice.call(arguments);a[6]=()=>goto('gacha');return b0.apply(this,a)}return b0.apply(this,arguments)};try{d0()}finally{button=b0}
  const ci=clamp(G.fd|0,0,CH.length-1),c=CH[ci],tx=W*.74,pw=Math.min(340,W*.42);button(tx-pw/2,384,pw,40,'TEST '+c.name,'#2f7a5f',()=>begin(()=>({type:'training',team:[ci].concat(SV.team.filter(q=>q!==ci)).slice(0,3),ret:'gacha',noIntro:1})),20,'free practice match')}}
{const m0=SCR.menu;SCR.menu=function(){m0();const fl=F();if(!fl.chal&&!fl.lboard)return;const ww=W*.42,wx=W-ww-22,wy=58,bw=Math.min(150,(ww-30)/2);let x=wx+10;
 if(fl.chal){const n=ready();button(x,wy+34,bw,30,'CHALLENGES'+(n?' · '+n:''),n?'#2f7a5f':'#3a2a5e',()=>{G.cpg=0;goto('chal')},bw<140?13:15);x+=bw+10}
 if(fl.lboard)button(x,wy+34,bw,30,'LEADERBOARD','#2f4f8f',()=>{G.lpg=0;lbSync(true);goto('lb')},bw<140?13:15)}}
})();
