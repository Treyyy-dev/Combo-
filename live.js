"use strict";
/* COMBO LIVE CONTENT + DEV STUDIO
   Loaded by index.html with <script src="live.js"></script> right after the main game script.
   Reads released fighters, maps, modes and banners from this page's database (collection "live")
   and adds them to the running game. Where there is no page database (the GitHub / Render copy) it reads live.json instead.
   The owner also gets a DEV STUDIO screen (menu button, or #dev)
   that lists staged items (collection "staged"), previews and tests them, and releases them. */
(function(){
if(typeof CH==='undefined'||typeof STAGES==='undefined'||typeof SCR==='undefined')return;
const NB=CH.length,NS=STAGES.length,CK='combo-live-v1',CN='combo-live-names-v1';
const WPN=['katana','fist','staff','dagger','bow','bo','orb'],ACCS=['band','horns','ears','halo','patch','glasses','mark'];
const BLD=['city','pines','islands','none'],MID=['torii','neon','ice','rock','column'],FXS=['petal','rain','snow','ember','mote'],FGS=['sakura','wires','ice','none'];
const TCOL={character:'#b06bff',map:'#3fa9ff',mode:'#3fe0a0',banner:'#ff4d8d'},TNAME={character:'FIGHTER',map:'MAP',mode:'MODE',banner:'BANNER'};
const L={db:null,owner:false,ready:false,staged:[],live:[],names:[],modes:[],bans:[],bc:null,sig:null,first:true,test:null,pending:null,tab:0,sel:0,pg:0,busy:false,pv:null};
window.COMBO_LIVE=L;

/* ---------- cleaning untrusted data ---------- */
const hex=(c,d)=>/^#[0-9a-f]{6}$/i.test(String(c||''))?String(c).toLowerCase():d;
const str=(s,n,d)=>{s=typeof s==='string'||typeof s==='number'?String(s).replace(/[\u0000-\u001f]/g,' ').trim():'';return(s||d||'').slice(0,n)};
const num=(v,a,b,d)=>{v=+v;return isFinite(v)?Math.min(b,Math.max(a,v)):d};
const int=(v,a,b,d)=>{v=+v;return isFinite(v)?Math.min(b,Math.max(a,Math.round(v))):d};
const one=(v,list,d)=>list.includes(v)?v:d;
const rgb=h=>{const n=parseInt(h.slice(1),16);return(n>>16)+','+((n>>8)&255)+','+(n&255)};
const rgba=(h,a)=>'rgba('+rgb(h)+','+a+')';
const dark=(h,k)=>{const n=parseInt(h.slice(1),16),f=v=>('0'+((v*k)|0).toString(16)).slice(-2);return'#'+f(n>>16)+f((n>>8)&255)+f(n&255)};
const obj=v=>v&&typeof v==='object'&&!Array.isArray(v)?v:{};
const arr=v=>Array.isArray(v)?v:[];

function mkChar(it){
 const d=obj(it.game),name=str(it.name,20).toUpperCase().replace(/[^A-Z]/g,'').slice(0,8);if(name.length<2)return null;
 const k=arr(d.colors).length?arr(d.colors):arr(it.colors),col=hex(k[0],'#7a6bff'),col2=hex(k[1],'#ffe14d'),hair=hex(k[2],'#1d2b53'),skin=hex(k[3],'#ffd9b8'),top=hex(k[4],'#f2f4ff'),pants=hex(k[5],'#23263a'),eye=hex(k[6],col);
 const style=int(d.style,0,7,0),el=int(d.el,0,EL.length-1,0),kk=arr(d.kit),kp=(q,v)=>{q=arr(q);return[int(q[0],0,7,style),int(q[1],0,1,v)]},sc=num(d.sc,.9,1.2,1),sn=arr(d.sn);
 const c={name,title:str(it.subtitle,24,'Fighter'),desc:str(it.desc,130,'A new challenger.'),col,col2,hair,hairHi:tint(hair,.4),skin,top,topSh:shade(top,.68),pants,eye,style,
  weapon:one(d.weapon,WPN,'katana'),spd:int(d.spd,270,390,330),range:int(d.range,4,36,20),kit:[kp(kk[0],0),kp(kk[1],1),int(kk[2],0,7,style)],
  sn:[str(sn[0],22,'Skill One'),str(sn[1],22,'Skill Two')],un:str(d.un,24,'FINAL STRIKE').toUpperCase(),rar:int(d.rar,0,3,2),idle:int(d.idle,0,9,0),gu:int(d.gu,0,2,0),wp:int(d.wp,0,3,0),ent:int(d.ent,0,7,style),
  sc,dm:num(d.dm,.9,1.15,1),bare:d.bare?1:0,acc:arr(d.acc).filter(a=>ACCS.includes(a)).slice(0,2),el,wt:int(d.wt,0,11,EL[el][3]),wn:str(d.wn,22,EL[el][5]+' Reach'),fistR:sc>1.07?10.5:8.2,live:1};
 c.pantsSh=shade(pants,.7);c.skinSh=shade(skin,.82);
 const t=obj(d.talk);c._talk={say:str(t.say,90,'Let us begin.'),re:str(t.re,90,'Show me.'),win:str(t.win,90,'That settles it.'),lose:str(t.lose,90,'Not... yet...'),vs:{},rv:{}};
 if(d.ty!=null)c._ty=int(d.ty,0,4,0);
 Object.defineProperty(c,'mv',{configurable:true,get(){buildMoves(c);return c.mv}});
 return c}
function seat(c,i){c.ix=i;c.ty=c._ty!=null?c._ty:(Math.imul(i+3,2654435761)>>>0)%5;return c}
function mkStage(it){
 const d=obj(it.game),sk=arr(d.sky),s=[hex(sk[0],'#150c36'),hex(sk[1],'#5b2a7c'),hex(sk[2],'#f0685c'),hex(sk[3],'#ffd58a')],sun=hex(d.sun,'#fff4cf'),glow=hex(d.glow,s[2]),cl=arr(d.cloud),m=arr(d.m),fl=arr(d.fl),w=arr(d.win),rf=hex(d.rf,s[3]);
 return{name:str(it.name,20,'NEW STAGE').toUpperCase(),sky:[[0,s[0]],[.45,s[1]],[.82,s[2]],[1,s[3]]],stars:d.stars?1:0,aurora:d.aurora?1:0,sun:[sun,rgba(glow,.5),rgba(sun,.7),int(d.sunR,30,120,70)],sunY:int(d.sunY,20,220,100),
  cl:[rgba(hex(cl[0],s[2]),.55),rgba(hex(cl[1],s[1]),.55)],m:[hex(m[0],dark(s[1],.9)),hex(m[1],dark(s[1],.65))],bld:one(d.bld,BLD,'none'),bc:hex(d.bc,dark(s[0],.8)),wc:[rgba(hex(w[0],'#ffd682'),.85),rgba(hex(w[1],'#ffd682'),.85)],
  mid:one(d.mid,MID,'column'),lan:d.lan?1:0,fl:[hex(fl[0],dark(s[2],.8)),hex(fl[1],dark(s[1],.7)),hex(fl[2],dark(s[0],.6))],rf:rgb(rf),ln:rgba(rf,.2),fx:one(d.fx,FXS,'mote'),fg:one(d.fg,FGS,'none'),vg:rgb(dark(s[0],.5)),live:1}}
function mkMode(it){const d=obj(it.game),gm=obj(d.gems);
 return{id:str(it.id,60),n:str(it.name,18,'NEW MODE').toUpperCase(),d:str(it.subtitle||it.desc,64),col:hex(arr(it.colors)[0],'#2f7a5f'),timer:d.timer?int(d.timer,20,900,180):0,cd:d.cd==null?null:int(d.cd,0,2,1),stage:str(d.stage,20).toUpperCase(),
  php:num(d.playerHp,.1,10,1),ehp:num(d.enemyHp,.1,10,1),pdm:num(d.playerDmg,.1,10,1),edm:num(d.enemyDmg,.1,10,1),meter:d.meter?1:0,w:int(gm.win,0,5000,120),l:int(gm.lose,0,5000,25),noIntro:d.noIntro?1:0}}
function findCh(n,extra){n=str(n,20).toUpperCase();for(let i=NB;i<CH.length;i++)if(CH[i].name===n)return i;for(let i=0;i<NB;i++)if(CH[i].name===n)return i;return-1}
function stageIdx(n){n=str(n,20).toUpperCase();if(!n)return-1;for(let i=0;i<STAGES.length;i++)if(STAGES[i].name===n)return i;return-1}
function mkBan(it){const d=obj(it.game),el=int(d.el,0,EL.length-1,0),f=[];
 arr(d.featured).slice(0,4).forEach(n=>{const i=findCh(n);if(i>=0&&CH[i].rar<3&&!f.includes(i))f.push(i)});
 const el2=f.length?CH[f[0]].el:el;for(let i=0;i<NB&&f.length<4;i++)if(CH[i].el===el2&&CH[i].rar<3&&!f.includes(i))f.push(i);for(let i=0;f.length<4&&i<NB;i++)if(CH[i].rar<3&&!f.includes(i))f.push(i);
 const si=stageIdx(d.stage);return{n:str(it.name,18,'NEW BANNER').toUpperCase(),d:str(it.subtitle,30,'Limited banner'),col:hex(arr(it.colors)[0],'#b8324f'),f,el:el2==null?el:el2,stage:si>=0?si:el%STAGES.length,key:'live-'+str(it.id,60)}}

/* ---------- putting released content into the game ---------- */
function untest(){const T=L.test;if(!T)return;L.test=null;if(T.name&&!L.names.includes(T.name))delete TALK[T.name];CH.length=T.nch;STAGES.length=T.nst;clampG()}
function clampG(){try{if((G.stg|0)>=STAGES.length)G.stg=0;if((G.stage|0)>=STAGES.length)G.stage=-1;if((G.sel|0)>=CH.length)G.sel=0;if((G.fd|0)>=CH.length)G.fd=0}catch(e){}}
function resetCaches(){try{POOLS=null;BCACHE=null;TCACHE=null}catch(e){}try{for(const k in OC)delete OC[k]}catch(e){}try{SHOW.key='';SHOW.ph=-1}catch(e){}L.bc=null}
function remap(old){let ch=false;const n=CH.length,fix=i=>{i=i|0;if(i<NB)return i<0?0:i;const nm=old[i-NB];if(nm)for(let k=NB;k<n;k++)if(CH[k].name===nm)return k;return-1};
 try{(SV.teams||[]).forEach(t=>{for(let s=0;s<3;s++){let v=fix(t[s]);if(v<0||v>=n){v=0;while(t.includes(v))v++}if(v!==t[s]){t[s]=v;ch=true}}});SV.team=SV.teams[SV.tp|0]||SV.team;
  ['icon','banner'].forEach(k=>{let v=fix(SV[k]);if(v<0||v>=n)v=0;if(v!==SV[k]){SV[k]=v;ch=true}});
  ['icons','banners'].forEach(k=>{if(!Array.isArray(SV[k]))return;const a=SV[k].map(fix).filter(v=>v>=0&&v<n);if(a.join()!==SV[k].join()){SV[k]=a;ch=true}});if(ch)save()}catch(e){}}
function apply(docs){
 docs=docs.filter(d=>d&&d.name&&TNAME[d.type]).sort((a,b)=>(a.releasedAt||0)-(b.releasedAt||0)||String(a.id).localeCompare(String(b.id)));
 const sig=JSON.stringify(docs);if(sig===L.sig)return;if(L.test){L.pending=docs;return}L.sig=sig;L.live=docs;
 let old=CH.slice(NB).map(c=>c.name);if(L.first){L.first=false;try{const q=JSON.parse(localStorage.getItem(CN));if(Array.isArray(q))old=q.map(String)}catch(e){}}
 L.names.forEach(n=>{delete TALK[n]});L.names=[];CH.length=NB;STAGES.length=NS;const taken=new Set(CH.map(c=>c.name));
 docs.forEach(it=>{try{if(it.type==='character'){const c=mkChar(it);if(!c||taken.has(c.name))return;taken.add(c.name);TALK[c.name]=c._talk;L.names.push(c.name);CH.push(seat(c,CH.length))}
  else if(it.type==='map'){const s=mkStage(it);if(stageIdx(s.name)<0)STAGES.push(s)}}catch(e){}});
 L.modes=docs.filter(d=>d.type==='mode').map(mkMode).slice(0,12);L.bans=docs.filter(d=>d.type==='banner').slice(-4).map(mkBan);
 resetCaches();remap(old);clampG();
 try{localStorage.setItem(CK,sig);localStorage.setItem(CN,JSON.stringify(L.names))}catch(e){}}

/* ---------- hooks into the game (wrapping, so the main script stays untouched) ---------- */
{const f0=curBans;curBans=function(){const b=f0();if(!L.bans.length)return b;if(!L.bc||L.bc.src!==b||L.bc.n!==L.bans)L.bc={src:b,n:L.bans,out:L.bans.concat(b)};return L.bc.out}}
{const f0=begin;begin=function(mk){f0(mk);const r=G.rules,m=r&&r.lv;if(!m)return;G.tm.forEach((T,sd)=>T.list.forEach(f=>{const mine=sd===G.me;f.mhp=f.mhp*(mine?m.php:m.ehp);f.hp=f.hpLag=f.mhp;f.pw=(f.pw||1)*(mine?m.pdm:m.edm);if(mine&&m.meter)f.meter=100}));if(m.timer)G.timer=m.timer}}
{const f0=finish;finish=function(win){const r=G.rules,m=r&&r.lv;if(!m)return f0(win);const g0=SV.gems;f0(win);const want=win?m.w:m.l;SV.gems=g0+want;if(G.res)G.res.gm=want;save()}}
{const f0=rlab;rlab=function(){const r=G.rules;return r&&r.lv?r.lv.n:f0()}}
function playMode(m,ret){const si=stageIdx(m.stage);begin(()=>{const r={type:'team',team:SV.team.slice(),ret,lv:m};if(si>=0)r.stage=si;if(m.cd!=null)r.cd=m.cd;if(m.noIntro)r.noIntro=1;return r})}
{const f0=SCR.offline;SCR.offline=function(){f0();const n=L.modes.length;if(!n)return;const bw=Math.min(600,W-36),x=(W-bw)/2+bw+10,w=W-x-10,go=()=>{G.lmpg=0;goto('livemodes')};
  if(w>=84)button(x,64,w,62,'NEW',L.modes[0].col,go,Math.min(24,w*.26),n+(n>1?' modes':' mode'));else button(W-150,H-40,138,32,'NEW MODES  '+n,L.modes[0].col,go,14)}}
SCR.livemodes=function(){scr();const M=L.modes,bw=Math.min(600,W-36),bx=(W-bw)/2,per=Math.max(1,Math.min(4,Math.floor((H-64-50)/72))),np=Math.max(1,Math.ceil(M.length/per));G.lmpg=Math.min(np-1,G.lmpg|0);let y=64;
 M.slice(G.lmpg*per,G.lmpg*per+per).forEach(m=>{button(bx,y,bw,60,m.n,m.col,()=>pickTeam(()=>playMode(m,'livemodes'),'livemodes'),30,m.d);y+=72});
 if(!M.length)txt('No extra modes right now.',W/2,H/2,15,'#e6dcff',null,'center',FU);if(np>1)pager(W/2-78,H-40,'lmpg',np);hdr('NEW MODES','offline')};
try{BACK.livemodes='offline'}catch(e){}
{const f0=SCR.menu;SCR.menu=function(){f0();if(!L.owner)return;const ww=W*.42,wh=H-84,wx=W-ww-22,wy=58;button(wx+10,wy+wh-42,150,32,'DEV STUDIO'+(L.staged.length?'  ·  '+L.staged.length:''),'#b8324f',()=>{L.sel=0;G.devpg=0;goto('dev')},16)}}
try{BACK.dev='menu'}catch(e){}

/* ---------- studio actions ---------- */
const body=it=>{const o={};for(const k in it)if(k!=='id')o[k]=it[k];return o};
function say(t){G.note={t,T:2.6}}
async function move(it,toLive){if(L.busy||!L.db)return;L.busy=true;try{const b=body(it);
  if(toLive){b.releasedAt=Date.now();b.status='released';await L.db.doc('live/'+it.id).set(b);await L.db.doc('staged/'+it.id).delete();say(it.name+' is LIVE');sfx('ult')}
  else{b.releasedAt=0;b.status='staged';await L.db.doc('staged/'+it.id).set(b);await L.db.doc('live/'+it.id).delete();say(it.name+' pulled back')}}catch(e){say('That did not save. Try again.')}L.busy=false;L.sel=0}
async function scrap(it){if(L.busy||!L.db)return;L.busy=true;try{await L.db.doc('staged/'+it.id).delete();say(it.name+' scrapped')}catch(e){say('That did not save. Try again.')}L.busy=false;L.sel=0}
function testIt(it,P){untest();const T={nch:CH.length,nst:STAGES.length,name:''};
 if(it.type==='character'){let ci=findChLive(P.c.name);if(ci<0){if(CH.some(c=>c.name===P.c.name)){say('Another fighter already uses that name');return}ci=CH.length;TALK[P.c.name]=P.c._talk;T.name=P.c.name;CH.push(seat(P.c,ci))}
  L.test=T;begin(()=>({type:'training',team:[ci].concat(SV.team.filter(q=>q!==ci)).slice(0,3),ret:'dev',noIntro:1}))}
 else if(it.type==='map'){let si=stageIdx(P.s.name);if(si<0){si=STAGES.length;STAGES.push(P.s)}L.test=T;begin(()=>({type:'training',team:SV.team.slice(),ret:'dev',noIntro:1,stage:si}))}
 else if(it.type==='mode'){L.test=T;playMode(P.m,'dev')}}
function findChLive(n){for(let i=NB;i<CH.length;i++)if(CH[i].name===n)return i;return-1}
function preview(it){const key=it.id+'|'+JSON.stringify(it);if(L.pv&&L.pv.key===key)return L.pv;const P={key};
 try{if(it.type==='character'){P.c=mkChar(it);if(P.c){const li=findChLive(P.c.name);if(li>=0)P.c=CH[li];else seat(P.c,CH.length)}}else if(it.type==='map')P.s=mkStage(it);else if(it.type==='mode')P.m=mkMode(it)}catch(e){}return L.pv=P}

/* ---------- studio screen ---------- */
function lines(t,x,y,w,size,col,max){g.font='700 '+size+'px '+FU;wrap(String(t),w).slice(0,max||3).forEach((l,i)=>txt(l,x,y+i*(size+4),size,col,null,'left',FU));}
function drawDev(){untest();if(L.pending){const p=L.pending;L.pending=null;apply(p)}
 scr();const lx=14,ly=58,lw=Math.min(250,W*.3),list=L.tab?L.live:L.staged;
 ['STAGED  '+L.staged.length,'LIVE  '+L.live.length].forEach((t,i)=>button(lx+i*(lw/2+2),ly,lw/2-2,30,t,i===L.tab?'#b8324f':'#3a2a5e',()=>{L.tab=i;L.sel=0;G.devpg=0},15));
 const rh=40,rows=Math.max(1,Math.floor((H-ly-38-44)/rh)),np=Math.max(1,Math.ceil(list.length/rows));L.pg=G.devpg=Math.min(np-1,G.devpg|0);L.sel=Math.min(Math.max(0,list.length-1),L.sel|0);
 list.slice(L.pg*rows,L.pg*rows+rows).forEach((it,k)=>{const i=L.pg*rows+k,y=ly+38+k*rh,sel=i===L.sel,foc=hit(lx,y,lw,rh-5,()=>{L.sel=i});rr(lx,y,lw,rh-5,8);g.fillStyle=sel?'#2a1c5c':'rgba(10,4,24,.6)';g.fill();g.strokeStyle=foc?'#ffe14d':sel?'#fff':'rgba(255,255,255,.22)';g.lineWidth=sel||foc?3:1.5;g.stroke();
  rr(lx+6,y+7,58,rh-19,5);g.fillStyle=TCOL[it.type];g.fill();txt(TNAME[it.type],lx+35,y+(rh-5)/2+.5,10.5,'#10061e',null,'center',FU);txt(str(it.name,18).toUpperCase(),lx+72,y+(rh-5)/2+1,Math.min(17,(lw-80)/(str(it.name,18).length*.58+1)),'#fff',INK,'left')});
 if(np>1)pager(lx+(lw-156)/2,H-38,'devpg',np);
 const x0=lx+lw+16,pw=W-x0-14,py=58,ph=H-py-66,it=list[L.sel];
 rr(x0,py,pw,ph,12);g.fillStyle='rgba(10,4,24,.6)';g.fill();g.strokeStyle='rgba(255,255,255,.3)';g.lineWidth=2;g.stroke();
 if(!L.db)txt(L.ready?'Studio storage is not reachable in this view.':'Connecting to the studio...',x0+pw/2,py+ph/2,15,'#e6dcff',null,'center',FU);
 else if(!it){txt(L.tab?'NOTHING LIVE YET':'NOTHING WAITING',x0+pw/2,py+ph/2-12,26,'#ffe14d',INK,'center',FB,6);txt(L.tab?'Release a staged item and it shows up here.':'New fighters, maps, modes and banners land here.',x0+pw/2,py+ph/2+18,13,'#e6dcff',null,'center',FU)}
 else{const P=preview(it),tx=x0+pw*.5+6,tw=pw*.5-18;let can=1,warn='';g.save();rr(x0+3,py+3,pw-6,ph-6,10);g.clip();
  if(it.type==='character'&&P.c){const c=P.c;worldBG(c,x0,py,pw*.48,ph);g.fillStyle='rgba(10,0,30,.45)';g.beginPath();g.ellipse(x0+pw*.24,py+ph-18,70,10,0,0,TAU);g.fill();miniChar(c,x0+pw*.24,py+ph-20,Math.min(2.4,(ph-30)/160),{anim:1,sway:.3});
   txt(RN[c.rar],tx,py+22,24,RC[c.rar],INK,'left',FB,5);txt(c.name,tx+RN[c.rar].length*17+12,py+23,Math.min(34,tw/(c.name.length*.62)),'#fff',INK,'left',FB,6);txt(c.title.toUpperCase(),tx,py+50,13,c.col2,INK,'left',FU,3);
   txt(EL[c.el][0].toUpperCase()+'  ·  '+TY[c.ty][0]+'  ·  '+c.weapon.toUpperCase()+'  ·  SPD '+c.spd,tx,py+70,11.5,'#7fdcff',null,'left',FU);
   txt('S1  '+c.sn[0],tx,py+94,13,'#fff',null,'left',FU);txt('S2  '+c.sn[1],tx,py+112,13,'#fff',null,'left',FU);txt('ULT  '+c.un,tx,py+130,13,c.col2,null,'left',FU);lines(c.desc,tx,py+154,tw,12,'#e6dcff',3);lines('"'+c._talk.say+'"',tx,py+212,tw,12,'#ffe9b0',2);
   if(!L.tab&&findChLive(c.name)<0&&CH.some(q=>q.name===c.name)){warn='That name is already taken by another fighter.';can=0}}
  else if(it.type==='map'&&P.s){STAGES.push(P.s);try{stageCard(STAGES.length-1,x0+12,py+12,pw-24,ph-70)}finally{STAGES.pop()}lines(str(it.desc,160),x0+16,py+ph-44,pw-32,12,'#e6dcff',2)}
  else if(it.type==='mode'&&P.m){const m=P.m,bgc=g.createLinearGradient(x0,py,x0+pw,py+ph);bgc.addColorStop(0,m.col);bgc.addColorStop(1,'#120a22');g.fillStyle=bgc;g.globalAlpha=.55;g.fillRect(x0,py,pw,ph);g.globalAlpha=1;
   txt(m.n,x0+18,py+34,Math.min(40,pw/(m.n.length*.6)),'#ffe14d',INK,'left',FB,8);lines(str(it.desc,200),x0+18,py+66,pw-36,13,'#fff',3);let y=py+128;
   [['MATCH','3 vs 3 team match'+(m.stage&&stageIdx(m.stage)>=0?' on '+m.stage:'')],['TIMER',(m.timer||180)+' seconds'],['YOUR TEAM','Health ×'+m.php+'   ·   Damage ×'+m.pdm+(m.meter?'   ·   Ultimate ready at the start':'')],['ENEMY TEAM','Health ×'+m.ehp+'   ·   Damage ×'+m.edm+(m.cd!=null?'   ·   CPU '+['EASY','NORMAL','HARD'][m.cd]:'')],['REWARD','Win +'+m.w+' gems   ·   Lose +'+m.l+' gems']].forEach(q=>{txt(q[0],x0+18,y,11,'#7fdcff',null,'left',FU);txt(q[1],x0+110,y,13,'#fff',null,'left',FU);y+=22})}
  else if(it.type==='banner'){const B=mkBan(it),bgc=g.createLinearGradient(x0,py,x0+pw,py);bgc.addColorStop(0,B.col);bgc.addColorStop(1,'#120a22');g.fillStyle=bgc;g.fillRect(x0,py,pw,ph);
   txt('SUMMON BANNER',x0+18,py+20,11,'#fff',null,'left',FU);txt(B.n,x0+18,py+50,Math.min(38,pw/(B.n.length*.6)),'#ffe14d',INK,'left',FB,8);txt(B.d,x0+18,py+78,13,'#fff',INK,'left',FU,3);
   const ts=Math.min(78,(pw-36-24)/4,ph-150);txt('RATE UP',x0+18,py+100,11,'#ffe14d',null,'left',FU);B.f.forEach((ci,k)=>tile(CH[ci],x0+18+k*(ts+8),py+110,ts,{}));
   const miss=arr(obj(it.game).featured).filter(n=>findCh(n)<0).map(n=>str(n,12).toUpperCase());if(miss.length)warn=miss.join(', ')+' is not live yet. Release the fighter first to feature them.';lines(str(it.desc,160),x0+18,py+110+ts+18,pw-36,12,'#e6dcff',2)}
  else txt('This item has no game data yet.',x0+pw/2,py+ph/2,14,'#e6dcff',null,'center',FU);
  g.restore();if(warn){rr(x0+8,py+ph-30,pw-16,24,6);g.fillStyle='rgba(60,20,10,.92)';g.fill();txt(warn,x0+pw/2,py+ph-18,11.5,'#ffd9a0',null,'center',FU)}
  const by=H-58,n=L.tab?(it.type==='banner'?1:2):(it.type==='banner'?2:3),bw=(pw-8*(n-1))/n;let bx=x0;const add=(l,c,fn,d)=>{button(bx,by,bw,46,l,c,fn,22,d);bx+=bw+8};
  if(it.type!=='banner')add('TEST','#2f4f8f',()=>testIt(it,P),it.type==='character'?'Practice as this fighter':it.type==='map'?'Practice on this map':'Play it now');
  if(L.tab)add('PULL BACK','#3a2a5e',()=>{G.cf={text:'Pull '+str(it.name,20).toUpperCase()+' back?',sub:'It leaves the live game and returns to staged',yes:()=>move(it,false)}},'Remove from the live game');
  else{add('RELEASE','#2f7a5f',()=>{if(!can){say(warn);return}G.cf={text:'Release '+str(it.name,20).toUpperCase()+'?',sub:'It goes into the live game right away',yes:()=>move(it,true)}},'Send to the live game');
   add('SCRAP','#7a1f2b',()=>{G.cf={text:'Scrap '+str(it.name,20).toUpperCase()+'?',sub:'This deletes it from the studio for good',yes:()=>scrap(it)}},'Delete')}}
 hdr('DEV STUDIO','menu');if(G.cf)drawConfirm()}
SCR.dev=drawDev;

/* ---------- data ---------- */
const rows=s=>s.docs.map(d=>Object.assign({},d.data(),{id:d.id}));
try{const q=JSON.parse(localStorage.getItem(CK));if(Array.isArray(q))apply(q)}catch(e){}
(async()=>{let c=null;try{if(window.claude&&window.claude.use)c=await window.claude.use('db')}catch(e){}L.ready=true;
 if(!c){/* outside claude.ai (the GitHub / Render copy): released content comes from live.json next to this file */
  try{const r=await fetch('live.json',{cache:'no-store'});if(r.ok){const q=await r.json();if(Array.isArray(q))apply(q)}}catch(e){}return}
 L.db=c;
 try{c.collection('live').onSnapshot(s=>{if(s.metadata&&s.metadata.fromCache&&!s.docs.length)return;apply(rows(s))},()=>{})}catch(e){}
 let u=null,ow=false;try{u=await window.claude.use('user');if(u)ow=!!(await u.isOwner())}catch(e){u=null}
 if(!u){try{await c.doc('meta/studio').set({owner:1});ow=true}catch(e){ow=false}}L.owner=ow;if(!ow)return;
 try{c.collection('staged').onSnapshot(s=>{L.staged=rows(s).filter(d=>d&&d.name&&TNAME[d.type]).sort((a,b)=>(b.created||0)-(a.created||0))},()=>{})}catch(e){}
 try{if(location.hash==='#dev'&&SCR[G.mode]&&G.mode!=='dev')goto('dev')}catch(e){}})();
})();
