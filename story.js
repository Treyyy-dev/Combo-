/* COMBO: Chapter 1 story mode and music.
   Loaded after the game and live.js. Everything here is behind update flags (FLAGS.story1, mlobby, mmap, msummon, mgacha)
   that are switched on by releasing the matching UPDATE item in the Dev Studio. With the flags off this file changes nothing. */
(()=>{"use strict";
if(typeof SCR==='undefined'||typeof CH==='undefined')return;
const F=()=>(typeof FLAGS!=='undefined'&&FLAGS)||{};
/* ================= MUSIC ================= */
const SCL={maj:[0,2,4,5,7,9,11],min:[0,2,3,5,7,8,10],hmin:[0,2,3,5,7,8,11],dor:[0,2,3,5,7,9,10],phr:[0,1,3,5,7,8,10],lyd:[0,2,4,6,7,9,11],pdom:[0,1,4,5,7,8,10],pent:[0,2,4,7,9],jpn:[0,1,5,7,8]};
const TRK={lobby:{bpm:152,root:60,scale:'maj',prog:[3,4,2,5],seed:11,bass:'drive',drum:'pop',arp:0,lead:'square'},
 gacha:{bpm:126,root:65,scale:'maj',prog:[0,4,5,3],seed:23,bass:'half',drum:'soft',arp:2,lead:'triangle'},
 summon:{bpm:174,root:57,scale:'min',prog:[0,5,2,6],seed:37,bass:'drive',drum:'fast',arp:1,lead:'sawtooth'},
 story:{bpm:88,root:62,scale:'maj',prog:[0,5,3,4],seed:41,bass:'half',drum:'none',arp:1,lead:'triangle'},
 tense:{bpm:112,root:57,scale:'hmin',prog:[0,0,5,4],seed:53,bass:'half',drum:'soft',arp:1,lead:'triangle'},
 battle:{bpm:164,root:59,scale:'min',prog:[0,6,5,6],seed:67,bass:'drive',drum:'fast',arp:0,lead:'square'}};
const MAPT=[{bpm:132,root:57,scale:'jpn',prog:[0,3,1,0],bass:'half',drum:'pop',arp:1,lead:'triangle'},{bpm:140,root:54,scale:'min',prog:[0,5,2,6],bass:'drive',drum:'pop',arp:2,lead:'sawtooth'},
 {bpm:118,root:62,scale:'lyd',prog:[0,1,0,4],bass:'half',drum:'soft',arp:2,lead:'triangle'},{bpm:168,root:52,scale:'phr',prog:[0,1,0,6],bass:'drive',drum:'fast',arp:0,lead:'sawtooth'},
 {bpm:144,root:67,scale:'maj',prog:[0,4,5,3],bass:'drive',drum:'pop',arp:1,lead:'square'},{bpm:108,root:61,scale:'dor',prog:[0,3,0,6],bass:'half',drum:'soft',arp:2,lead:'triangle'},
 {bpm:128,root:57,scale:'pdom',prog:[0,1,0,6],bass:'walk',drum:'pop',arp:0,lead:'square'},{bpm:100,root:55,scale:'min',prog:[0,3,6,2],bass:'walk',drum:'soft',arp:1,lead:'triangle'},
 {bpm:124,root:62,scale:'pent',prog:[0,2,3,0],bass:'half',drum:'soft',arp:1,lead:'triangle'},{bpm:176,root:56,scale:'min',prog:[0,5,6,4],bass:'drive',drum:'fast',arp:0,lead:'sawtooth'}];
const DRM={pop:{k:[0,8,10],s:[4,12],h:[0,2,4,6,8,10,12,14]},fast:{k:[0,3,8,11],s:[4,12],h:[0,2,4,6,8,10,12,14,15]},soft:{k:[0,10],s:[],r:[8],h:[4,12]},none:{k:[],s:[],h:[]}};
const TC={};
function hash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function mkTrack(p){let sd=(p.seed*2654435761)>>>0||1;const R=()=>{sd=(Math.imul(sd,1664525)+1013904223)>>>0;return sd/4294967296};
 const sc=SCL[p.scale],n=sc.length,L=p.prog.length,bars=L*2,deg=d=>p.root+sc[((d%n)+n)%n]+12*Math.floor(d/n),ev=[];for(let i=0;i<bars*16;i++)ev.push([]);
 const mot=[[0,3,6,8,11,14],[0,2,4,8,10,12],[0,4,6,8,12,14],[0,6,8,10,14],[0,3,4,8,11,12],[0,4,8,10,12]],A=mot[R()*6|0],B=mot[R()*6|0],D=DRM[p.drum]||DRM.none;let d=n+2;
 for(let b=0;b<bars;b++){const c=p.prog[b%L],base=b*16,rh=b===bars-1?[0,8]:b%4===2?B:A,tones=[c,c+2,c+4,c+n,c+n+2,c+n+4,c+2*n];
  rh.forEach((st,k)=>{if(k===0||st===8){let best=tones[0];tones.forEach(t=>{if(Math.abs(t-d)<Math.abs(best-d))best=t});d=best<n-1?best+n:best}else d+=[-2,-1,-1,1,1,2][R()*6|0];d=Math.max(n-1,Math.min(2*n+3,d));
   const len=Math.min(6,(rh[k+1]||16)-st);ev[base+st].push(['l',deg(d),len])});
  const br=p.root+sc[((c%n)+n)%n]-24;
  if(p.bass==='drive')for(let s=0;s<16;s+=2)ev[base+s].push(['b',br+(s===6||s===14?7:0),2]);
  else if(p.bass==='walk')[0,4,8,12].forEach((s,k)=>ev[base+s].push(['b',deg(c+[0,2,4,2][k])-24,4]));
  else{ev[base].push(['b',br,6]);ev[base+8].push(['b',br,4]);ev[base+14].push(['b',br+7,2])}
  ev[base].push(['p',deg(c),16],['p',deg(c+2),16],['p',deg(c+4),16]);
  if(p.arp){const stp=p.arp===2?1:2,at=[c,c+2,c+4,c+n,c+4,c+2];for(let s=0,k=0;s<16;s+=stp,k++)ev[base+s].push(['a',deg(at[k%at.length])+12,stp])}
  D.k.forEach(s=>ev[base+s].push(['k']));D.s.forEach(s=>ev[base+s].push(['s']));(D.r||[]).forEach(s=>ev[base+s].push(['r']));D.h.forEach(s=>ev[base+s].push(['h']))}
 return{spb:60/p.bpm/4,ev,len:bars*16,lead:p.lead||'square'}}
function track(id){if(TC[id])return TC[id];let p=TRK[id];if(!p&&id.slice(0,3)==='map'){const i=+id.slice(3)|0;if(i<MAPT.length)p=Object.assign({seed:101+i*17},MAPT[i]);else{const h=hash(STAGES[i]?STAGES[i].name:id),ks=Object.keys(SCL);p={bpm:104+h%72,root:52+(h>>>3)%14,scale:ks[(h>>>7)%ks.length],prog:[[0,5,2,6],[0,3,4,3],[0,4,5,3],[0,1,0,6]][(h>>>11)%4],seed:h%9973+7,bass:['drive','half','walk'][(h>>>13)%3],drum:['pop','soft','fast'][(h>>>15)%3],arp:(h>>>17)%3,lead:['square','triangle','sawtooth'][(h>>>19)%3]}}}
 return TC[id]=mkTrack(p||TRK.lobby)}
const fq=m=>440*Math.pow(2,(m-69)/12);
function nt(type,m,t,dur,vol,out){const o=AC.createOscillator(),q=AC.createGain();o.type=type;o.frequency.value=fq(m);q.gain.setValueAtTime(.0001,t);q.gain.linearRampToValueAtTime(vol,t+.012);q.gain.setValueAtTime(vol,t+Math.max(.02,dur*.55));q.gain.exponentialRampToValueAtTime(.0008,t+dur);o.connect(q);q.connect(out);o.start(t);o.stop(t+dur+.03)}
function nz(t,dur,vol,type,f,out){if(!noiseB)return;const s=AC.createBufferSource(),fl=AC.createBiquadFilter(),q=AC.createGain();s.buffer=noiseB;fl.type=type;fl.frequency.value=f;fl.Q.value=.8;q.gain.setValueAtTime(vol,t);q.gain.exponentialRampToValueAtTime(.0008,t+dur);s.connect(fl);fl.connect(q);q.connect(out);s.start(t);s.stop(t+dur+.02)}
function sched(T,st,t,out){const sp=T.spb;for(const e of T.ev[st]){switch(e[0]){
 case'l':nt(T.lead,e[1],t,e[2]*sp*.95,T.lead==='triangle'?.11:T.lead==='square'?.05:.045,out);break;
 case'b':nt('triangle',e[1],t,e[2]*sp*.9,.16,out);break;
 case'p':nt('sine',e[1],t,e[2]*sp,.028,out);break;
 case'a':nt('triangle',e[1],t,Math.max(.09,e[2]*sp*.9),.035,out);break;
 case'k':{const o=AC.createOscillator(),q=AC.createGain();o.type='sine';o.frequency.setValueAtTime(150,t);o.frequency.exponentialRampToValueAtTime(45,t+.11);q.gain.setValueAtTime(.3,t);q.gain.exponentialRampToValueAtTime(.001,t+.14);o.connect(q);q.connect(out);o.start(t);o.stop(t+.16);break}
 case's':nz(t,.12,.13,'bandpass',1800,out);break;case'r':nz(t,.05,.07,'bandpass',2600,out);break;case'h':nz(t,.03,.035,'highpass',7000,out);break}}}
const MU={id:null,g:null,tr:null,step:0,nt:0};let SC=null;
function wantTrack(){const m=G.mode,f=F();
 if(m==='scene')return f.story1&&SC?(QS[SC.qi].k==='B'?'tense':'story'):null;
 if(m==='summon')return f.msummon?'summon':null;
 if(m==='gacha')return f.mgacha?'gacha':f.mlobby?'lobby':null;
 if(m==='fight'||m==='intro'||m==='ko'||m==='result'){const r=G.rules||{};if(r.type==='show')return null;if(f.mmap)return'map'+(G.stg|0);return r.type==='story1'&&f.story1?'battle':null}
 return f.mlobby?'lobby':null}
function musicTick(){if(typeof AC==='undefined'||!AC||AC.state!=='running'||!MG)return;const now=AC.currentTime;let w=null;try{w=SV.set.vol?wantTrack():null}catch(e){}
 if(w!==MU.id){if(MU.g){const og=MU.g;try{og.gain.cancelScheduledValues(now);og.gain.setValueAtTime(Math.max(.0001,og.gain.value),now);og.gain.linearRampToValueAtTime(.0001,now+.4)}catch(e){}setTimeout(()=>{try{og.disconnect()}catch(e){}},900)}
  MU.id=w;MU.g=null;if(w){MU.tr=track(w);MU.g=AC.createGain();MU.g.gain.setValueAtTime(.0001,now);MU.g.gain.linearRampToValueAtTime(.6,now+.5);MU.g.connect(MG);MU.step=0;MU.nt=now+.1}}
 if(!MU.g)return;if(MU.nt<now-.3)MU.nt=now+.05;let n=0;while(MU.nt<now+.22&&n++<48){try{sched(MU.tr,MU.step%MU.tr.len,MU.nt,MU.g)}catch(e){}MU.step++;MU.nt+=MU.tr.spb}}
/* ================= STORY: CHAPTER 1 ================= */
const NM={};CH.slice(0,30).forEach((c,i)=>{NM[c.name]=i});
const ARCS=['THE FALLEN STAR','CITY OF LIGHTS','THE MOUNTAIN GATE','WHISPERING GROVE','BLACK TIDE',"TIGER'S MARCH","THE WIND'S TRIAL",'ORACLE OF FROST','STORM FRONT','EVENT HORIZON'];
const RAW=`
T|A Falling Star|0|KAITO,RIN
N|The night the sky cracked open, a star fell behind the old shrine.
KAITO look|That was no shooting star. It came down right behind the shrine.
RIN in|You saw it too, Storm Blade? Good. I hate chasing things alone.
KAITO cross|Rin. Let me guess. You want to race.
RIN|I was halfway through dinner when the whole sky lit up. You owe me a bowl of noodles for this, by the way.
KAITO|I did not make the star fall, Rin.
RIN laugh|No, but you are the one standing here looking all serious about it. That counts.
KAITO look|Look at the tree line. The light is still glowing back there. Whatever landed, it has not gone out.
RIN step|My teacher used to say a falling star grants one wish. I already know mine.
KAITO|Let me guess again. To be the strongest.
RIN cheer|To be the strongest AND to finally beat you in a footrace. Two wishes. I am greedy.
RIN point|First one to touch it keeps it. Try to keep up!
F|Race to the Shrine|0|KAITO,RIN|RIN
RIN draw|Change of plans. I get there first if you are on the ground.
KAITO|We were supposed to be racing, not fighting. You remember the difference?
RIN laugh|A race is just a fight where nobody gets hit. That sounds boring when I say it out loud.
KAITO cross|You have been waiting all year for an excuse, have you not.
RIN point|Since the spring festival. You beat me in front of the whole village and then you bowed. You BOWED, Kaito.
KAITO|It is polite to bow.
RIN|It is rude to bow when the other person is face down in a rice field!
KAITO laugh|...All right. That one I will give you.
RIN aura|So tonight, under a falling star, I even the score. Then we go see what landed.
KAITO look|And if I win again?
RIN|Then you carry me to the shrine, because I will be too mad to walk.
KAITO draw|You could have just said you wanted a fight.
F|The White Fox|0|KAITO,SHIRO|SHIRO
SHIRO ent|Loud feet on sacred stone. The shrine does not like loud feet.
KAITO|I did not know the shrine still had a keeper. The priests left years ago.
SHIRO laugh|Priests leave. Foxes stay. We were here before the first stone was laid, and we will be here after the last one falls.
KAITO look|Then you saw it come down.
SHIRO|I saw the sky tear like old paper. I saw something cold land in my garden. And then I heard boots.
KAITO|That would be me. I am sorry about the noise.
SHIRO cross|Sorry is a word. The shrine prefers proof. Three hundred years of visitors, and every one of them wanted something.
KAITO|I only want to know what it is.
SHIRO point|That is what the last one said, right before he tried to carry off the bell. So. Show me your manners, storm boy.
KAITO draw|My manners are fine. It is my patience that is short tonight.
SHIRO laugh|Oh, good. I was hoping you would be fun.
KAITO point|Something fell here. Step aside and I will be quiet about it.
T|The Frost Oracle|0|KAITO,RIN,YUKI
KAITO kneel|It is not a rock. It is glass. And it is humming.
RIN shock|It is cold! Why is a star cold?
YUKI ent|Because it was never a star. Please put it down.
KAITO turn|And you are?
YUKI look|Yuki. Keeper of the Frost Seal. That shard is a piece of it.
RIN|It is the size of my hand. All that light, all that noise, for something this small?
KAITO|Small things can be heavy. Hold it. It feels like it is pulling down harder than it should.
YUKI|It is pulling toward the other pieces. They want to be whole again. That is the only reason I found you so fast.
RIN cross|Hold on. You came down a mountain, in the dark, by following a feeling?
YUKI|I have guarded that seal since I was nine years old. I would know its voice anywhere.
KAITO|Then you know what it was sealing.
YUKI look|I do. And I would rather tell you after we are somewhere with walls and a fire.
YUKI tired|The seal broke tonight. Ten pieces fell across the land. This is only one.
F|Test of Ice|0|KAITO,YUKI|YUKI
YUKI draw|If you mean to carry a shard, show me you can hold on to it.
KAITO|You do not look like someone who enjoys fighting.
YUKI|I do not. I enjoy quiet, and snow, and tea that someone else has made. This is none of those.
KAITO laugh|Then why test me at all? You could just ask for it back.
YUKI look|Because the last keeper who trusted a stranger with a shard is the reason there are no other keepers.
KAITO|...I see.
YUKI|I am not saying you are a thief. I am saying I cannot afford to be wrong about you. Not tonight.
KAITO point|Then do not go easy. If I cannot hold on to this against you, I should not be carrying it.
YUKI|That is the first sensible thing anyone has said to me since the sky broke.
KAITO|Rin is going to be upset she missed this.
YUKI laugh|I think Rin will be upset regardless. She seems to enjoy it.
KAITO slash|Fair. Try to take it.
T|Ten Shards|0|KAITO,RIN,YUKI
YUKI sit|The seal held something asleep. Every shard that goes missing wakes it a little more.
RIN cross|So we find all ten and glue your seal back together. Easy.
YUKI look|It will not be easy. Others felt it fall. They are already hunting.
KAITO point|Then we hunt faster. Where is the next one?
YUKI point|South. I can feel it moving. Someone is carrying it.
RIN|How do we even find them? You cannot follow a feeling in ten directions at once.
YUKI|Each shard sings a little differently. The nearest one is always the loudest. We go one at a time.
KAITO|And the people hunting them. Who are they?
YUKI tired|Thieves. Collectors. People who think a piece of a star will make them strong. And a few who know exactly what it is.
RIN|Those last ones sound like the problem.
YUKI|They are. Someone wanted the seal broken. Stars do not just fall.
KAITO cross|Then it is not only a hunt. It is a race against whoever started this.
RIN laugh|A race! See, Kaito? I told you tonight was a race.
RIN cheer|A chase after all! I knew tonight was going to be good.
F|Crow at Dusk|0|KAITO,KURO|KURO
KURO ent|Shiny things belong to crows. Hand it over, little storm.
KAITO|That was fast. We have not even left the shrine and someone is already here for it.
KURO laugh|Crows fly ahead of the storm, boy. I watched it fall from the harbor road. I was walking before it hit the ground.
KAITO|You do not even know what it is.
KURO|I know it glows, I know three people are guarding it, and I know a man in the city who pays for things that glow.
KAITO cross|That is a thin reason to get hurt.
KURO|I have been hurt for thinner. Last winter I fought a man over a spoon. A nice spoon, mind you.
KAITO|...Did you win?
KURO point|I still have the spoon. So here is my offer, little storm. Give me the glass and you walk away with your sword.
KAITO|Here is mine. Walk away now and you keep your spoon.
KAITO draw|Come and peck at it.
F|Petals and Blades|0|RIN,HANA|HANA
HANA in|You trampled my flowers on the way up. Apologize with your fists.
RIN|Flowers? I did not see any flowers. It was dark and I was running!
HANA|White moonblooms, planted along the whole east path. Forty of them. I counted what was left after you came through.
RIN shock|...How many are left?
HANA|Six.
RIN tired|Oh. Oh no. I am actually sorry about that. I did not know someone took care of this place.
HANA cross|Somebody takes care of every place. That is the thing people who run everywhere never notice.
RIN|I can help replant them! I am great at digging. I dug a whole training pit once.
HANA laugh|Hm. Maybe after. First I want to see whether those feet are good for anything besides trampling.
RIN|You want to dance? I only know one dance and it is mostly punching.
RIN laugh|Finally, somebody who talks my language!
T|A Voice in the Glass|0|KAITO,YUKI,RIN
N|That night the shard would not stop humming.
KAITO sit|It is whispering. Can you hear it?
YUKI shock|Do not listen. That is her. The one the seal was built to hold.
RIN step|Her who? You keep saying scary things in a calm voice.
YUKI tired|Nova. The Void Empress. If she wakes all the way, the sky goes dark for good.
RIN|What is it saying? I only hear a ringing, like after someone hits a bell.
KAITO|Not words exactly. More like someone calling from the bottom of a well. It knows my name.
YUKI|It knows everyone's name. That is how she works. She finds the thing you want and she says it back to you.
RIN cross|That is creepy. What does she say I want?
YUKI look|You would have to listen to find out. Please do not.
KAITO|How long was she sealed, Yuki?
YUKI|A thousand years. Long enough for most people to decide she was only a story.
RIN|And how long until she is all the way awake?
YUKI tired|If we keep the shards apart and safe? Years. If someone gathers them? Days.
KAITO look|Then she stays asleep. Simple.
B|Night Phantom|0|KAITO,ZERO,RIN,YUKI|ZERO
ZERO ent|You hold it like a lantern. No wonder I found you so fast.
KAITO draw|Who are you working for?
KAITO|You have been following us since the shrine steps. I counted three rooftops.
ZERO|Four. You missed the bell tower. Your friend with the fire nearly looked up, but then she saw a food cart.
KAITO laugh|That does sound like Rin.
ZERO|You are not built for this. You stop and talk. You make camp where anyone can see the smoke. You keep the shard in your coat like a letter.
KAITO cross|And you would do it better.
ZERO|I would do it alone, at night, and nobody would ever know it had been found. That is the only way these stay safe.
KAITO|Safe from her, or safe for you?
ZERO look|...You ask better questions than I expected. It does not change anything.
KAITO draw|It might. Tell me after.
ZERO point|Nobody. That is why I am the only one you should be afraid of.
>ZERO back|Not bad. But you blinked. The shard comes with me to the city.
>RIN in|I leave you alone for one hour! One hour, and a man in black takes the only shard we have!
>KAITO tired|He was fast, Rin. Faster than anyone I have fought.
>YUKI in|He did not hurt you badly. Good. And he did not run toward the mountains. He ran toward the city.
>RIN|Is that better or worse?
>YUKI|Better. There are a thousand places to hide in Neon District, but there is only one road in from here.
>KAITO look|He said he would keep it where nobody could find it. He did not sound like a thief. He sounded scared.
>RIN cross|Scared people still steal things, Kaito.
>YUKI|And they can still be reasoned with. I can feel the shard moving. It is slow. He is not running any more.
>RIN laugh|Then we pack up and walk. I have always wanted to see the city. I hear the noodles are amazing.
>KAITO shock|He is gone. And so is the shard. Rin, Yuki, we are going to Neon District.
T|Neon Hunt|1|KAITO,RIN
N|The trail led to Neon District, a city that never turns its lights off.
RIN look|So many signs. How does anyone sleep here?
KAITO look|They do not. Which is why a phantom can hide in plain sight.
RIN point|Then we ask around. Loudly. Someone always knows something.
KAITO cross|That is your whole plan?
RIN|Look at that one! It is a cat, and it is waving, and it is three stories tall. Why is it waving?
KAITO|It is an advertisement, Rin. It wants you to buy something.
RIN cheer|It is working. I want whatever the giant cat is selling.
KAITO look|Stay focused. Yuki says the shard stopped moving somewhere on the east side.
RIN|Where is Yuki, anyway?
KAITO|On a rooftop, listening. She says the city is so loud she can barely hear the shard over it.
RIN|So the oracle listens to the sky, and we do the legwork. That seems fair. I like legwork.
RIN laugh|It has never failed me. Mostly.
F|Arcade Trouble|1|RIN,NIKO|NIKO
NIKO in|You want info? Beat my high score. My high score is you, on the floor.
RIN|I just want to know if you have seen a man in black. Tall, quiet, walks like he is late for something.
NIKO laugh|Lady, this is Neon District. You just described half my customers.
RIN|He would have come through tonight. Carrying something that glows.
NIKO|Everything in here glows. That is the whole business model.
RIN cross|You are not being very helpful.
NIKO|I am being exactly as helpful as a stranger who walked into my arcade without buying a single token deserves.
RIN|Fine! How much is a token?
NIKO point|For you? One round. Winner gets answers. I have a crossbow that shoots light and a very boring evening.
RIN laugh|You know, where I come from, people just say hello.
RIN draw|I like this city already.
F|Encore|1|KAITO,EMI|EMI
EMI ent|No cutting the line at my show! Security is me, by the way.
KAITO|There is a line? I did not see a line.
EMI|There is ALWAYS a line. Four hundred people have been waiting since noon and you walked straight to the stage door.
KAITO|I am looking for someone. I was told he went through the back of this building.
EMI cross|Oh, sure. Everybody is always looking for someone at the stage door. Usually it is me.
KAITO|It is not you.
EMI shock|...Wow. Okay. You did not have to say it that fast.
KAITO|I did not mean it like that. I am sure the show is very good.
EMI point|It is the best show in the district and you are about to get a private performance. Lights! Somebody hit the lights!
KAITO|I really did just want directions.
KAITO tired|I just asked for directions.
T|The Gambler's Offer|1|KAITO,GIN,RIN
GIN in|Looking for a man in black who walks through walls? I might know a door.
KAITO cross|And what does that cost?
GIN laugh|One game. You win, I talk. I win, I keep that nice sword.
RIN step|Kaito, do not. He is smiling too much.
RIN|How do you know about him? We have not told anybody in this city why we are here.
GIN|You did not have to. A country boy with a storm blade and a girl who punched an arcade owner? Word travels.
KAITO|Then word travels about him too. Where is he?
GIN laugh|Information is the only thing in Neon District that never goes on sale, friend.
RIN|We have money. Some money. Kaito, how much money do we have?
KAITO|Enough for noodles. Not enough for him.
GIN|I do not want your coins anyway. Coins are boring. I want a story to tell at the tables tonight.
RIN cross|I have a bad feeling about what kind of story.
KAITO point|Deal. But we play my game.
F|All In|1|KAITO,GIN|GIN
GIN draw|Blades instead of cards? I count those too.
GIN|You understand you have already lost? I have never once sat down at a game I did not rig.
KAITO|This is not a game you can rig. There are no cards up a sleeve in a sword fight.
GIN laugh|You would be amazed what fits up a sleeve.
KAITO cross|Why do you even want the sword? You do not look like a swordsman.
GIN|I am not. But the man who is hunting your phantom is, and he pays very well for storm steel.
KAITO shock|Someone else is after Zero?
GIN|Oh, you did not know. How delightful. Now the stakes are interesting for both of us.
KAITO|Who is it?
GIN point|Win, and I will tell you. Lose, and you can ask him yourself when he comes to collect your blade.
KAITO slash|Count this one.
T|Rooftop Whisper|1|YUKI,KAITO
N|Above the neon, the city was almost quiet.
YUKI sit|I should have felt the seal weaken. I was its keeper. I felt nothing.
KAITO sit|You are here now. That counts for more.
YUKI look|You do not know me well enough to say that.
KAITO look|I know you chased a stranger down a mountain to fix it. That is enough.
KAITO|How long have you been up here?
YUKI|Since sunset. It is the only place in this city where I can hear myself think.
KAITO|Rin found a noodle cart that never closes. I think she is going to move here.
YUKI laugh|She would light the whole district on fire within a week. By accident.
KAITO|Probably. Yuki, the gambler said someone else is hunting Zero. Someone who pays for storm steel.
YUKI look|Then there are at least three sides now. Us, the phantom, and whoever wants them both.
KAITO|Does that change anything?
YUKI|It means we stop treating Zero as the enemy. Whoever broke the seal is the enemy. Everyone else is just frightened.
YUKI nod|...Thank you. Zero is below us. Three streets east.
F|Alley Ambush|1|KAITO,NIKO,EMI|NIKO,EMI
NIKO in|Rematch! And I brought a friend with better lighting.
KAITO|I thought we settled this at the arcade. And at the theater.
NIKO|You settled it. We did not agree to be settled.
EMI|Also, somebody is paying a lot for anyone who slows you down. I have rent, you know. Stage lights are not free.
KAITO cross|Who is paying?
EMI|A man with a tiger pin on his collar. Very polite. Very scary. He did not blink once.
NIKO|He said to keep you busy until morning. He did not say why.
KAITO look|Until morning. So something happens tonight.
EMI laugh|See, now I feel bad. You seem nice. Niko, do we still have to do this?
NIKO|We already spent the deposit.
KAITO|Then let us make it quick. I have a phantom to find before the tiger does.
KAITO draw|Two of you. That is almost fair.
F|Thunder Fist|1|RIN,JIN|JIN
JIN ent|Word is a fire girl is punching her way across my city. I had to see.
RIN|Your city? I thought this place belonged to the giant waving cat.
JIN laugh|The cat owns the signs. I own the ring. Volt Arena, six years undefeated.
RIN|Six years! Who have you been fighting, shopkeepers?
JIN|Champions from four countries. And one very angry shopkeeper, yes.
RIN cheer|I like you. What do you want with me?
JIN|Same thing I want with anybody new. A good fight, no reason, no grudge. Those are getting rare.
RIN|People keep attacking us for money tonight. You are the first one who just wants to.
JIN point|Money makes a fight boring. Come on, fire girl. Show me what they teach in the crater.
RIN|How did you know I am from the crater?
JIN|You have ash on your boots and you have not stopped smiling. Nobody else smiles like that.
RIN cheer|See it up close, then!
T|Zero's Reason|1|KAITO,ZERO
KAITO point|No more running. Why do you want the shards?
ZERO cross|The same reason you do. To stop her.
KAITO shock|Then why steal from us?
ZERO look|Because the last people who tried to guard a shard were my family. The void took the whole street.
ZERO turn|I do not trust guards. I trust distance.
ZERO|You found me. I did not think you would get past the tiger's hired fists.
KAITO|They were not very committed. Who is the man with the tiger pin?
ZERO|A recruiter. He works for an army in the desert. They want every shard, and they want anyone who has touched one.
KAITO|Including you.
ZERO|Especially me. I have been carrying two.
KAITO shock|Two? You had one before you ever took ours.
ZERO tired|I have been doing this for a long time, storm boy. Longer than you have known the shards existed.
KAITO|Then you know more than we do. We could use that.
KAITO step|Then trust this. I do not lose things twice.
B|Phantom's Last Door|1|KAITO,ZERO,RIN,YUKI|ZERO
ZERO draw|Prove it. If you fall here, the shard is safer with me.
KAITO draw|And if I do not fall?
KAITO|You keep saying safer. You are tired, Zero. I can see it. How long since you slept?
ZERO|Sleep is when she talks the loudest. I stopped being fond of it.
KAITO|Then you cannot keep doing this alone. Sooner or later you slip, and the tiger takes both shards off you.
ZERO cross|And three people are harder to rob than one?
KAITO|Three people can take turns staying awake.
ZERO look|...I had a brother who used to say things like that. Simple things that were annoyingly correct.
KAITO|What happened to him?
ZERO|He guarded a shard. I told you how that ended.
KAITO draw|Then let me show you it can end differently. One fight. Everything you have.
ZERO look|Then I will have been wrong. I would like that.
>ZERO kneel|...Take it. And take this too. A second shard. I found it before I found you.
>RIN in|There you are! We heard thunder from six streets away. Is this him? Is this the phantom?
>KAITO|This is Zero. He is with us now. I think.
>ZERO|I have not agreed to that.
>RIN laugh|You handed him two shards and you are still standing here. That is agreeing.
>YUKI in|Two shards. I can hear both of them clearly. You have kept them well, Zero. They are quiet.
>ZERO look|...Nobody has ever said that. Most people only ask where I got them.
>YUKI|I know where you got one of them. I am sorry about your street. I should have been there.
>ZERO|You were nine years old and on a mountain. I checked.
>RIN|Okay, this is getting sad. Who wants noodles? The cart on the corner is open all night and I have a punch card.
>KAITO laugh|Three shards, a phantom and a punch card. Not a bad night.
>KAITO cheer|Two shards. Come with us, Zero. Distance is not working.
T|Road of Ash|3|KAITO,RIN
N|East of the city, the ground turned black and the air tasted of smoke.
RIN cheer|Smell that? That is home. Ember Crater.
KAITO tired|It smells like something is on fire.
RIN laugh|Everything is on fire. That is the point.
KAITO|People live here? On purpose?
RIN|Three hundred families. The ground is warm all winter, the forges never go cold, and nobody ever needs a blanket.
KAITO|And when the mountain erupts?
RIN|We go up the ridge, watch it like fireworks, and then come back down and sweep. It is not so bad.
KAITO look|You sweep lava.
RIN laugh|You sweep ASH. You do not sweep lava, Kaito. That would be silly.
KAITO|Of course. How foolish of me.
RIN|I have not been home in two years. Do I look taller? I feel like I should look taller.
RIN look|My old teacher is here. Dai. If a shard fell in the crater, he saw it.
F|Cinder Ghost|3|KAITO,ASH|ASH
ASH ent|The crater keeps what falls into it. You should let it keep you too.
KAITO|You are the first person on this road who has not asked me for money.
ASH|Ghosts have no use for money. Only company.
KAITO|You do not look much like a ghost.
ASH laugh|Give it time. Everyone on the ash road looks like one eventually. The dust gets in and it does not get out.
KAITO|I am only passing through. There is a girl ahead of me, red hair, very loud. Did she come this way?
ASH|She ran past an hour ago shouting that she was home. The crater shouted back. It likes her.
KAITO|That sounds right.
ASH cross|It does not know you, though. Strangers who carry cold things into a warm place tend to stay here.
KAITO|Is that a warning or a threat?
ASH|In the crater there has never been a difference.
KAITO draw|I will pass.
F|The Lava Smith|3|RIN,DAI|DAI
DAI in|Rin! You left without finishing your forms. Show me you practiced.
RIN|I practiced! Mostly. I practiced the punching ones.
DAI|There are forty forms. Thirty-one of them are not punching.
RIN|And those are the ones I am a little behind on.
DAI cross|Two years, Rin. No letter, no word. I had to hear from a traveling merchant that you fought a champion in the city.
RIN cheer|You heard about that? I did really well!
DAI|I heard you won. I also heard you broke his arena.
RIN tired|...It was a weak arena.
DAI laugh|Hah! There she is. Come. If you have truly grown, the forge will know before I do.
RIN|Are you still mad about the letters?
DAI|Ask me again after you show me form twenty-two.
RIN draw|Yes, teacher! Sorry in advance, teacher!
T|The Forge's Secret|3|RIN,DAI,KAITO
DAI sit|That glass you carry. I know it. My grandfather forged the frame that held it.
RIN shock|You never told me that!
DAI look|You never sat still long enough to hear it.
KAITO step|Then you know where the third shard fell.
KAITO|Your grandfather built the frame for a seal on a frozen mountain. Why would a crater smith do that?
DAI|Because nothing else would hold. Ice cracks. Stone crumbles. But crater steel, folded in the heart of the mountain, does not forget its shape.
RIN|Wait, so our village helped lock up the scariest thing in the world and nobody put it on a sign?
DAI laugh|It was meant to be forgotten. That is the best kind of lock.
KAITO|And now a piece of it has come home.
DAI look|I felt it land. The forge went cold for a whole breath. That has not happened in my lifetime.
RIN|Then it is here. In the crater.
DAI point|At the Mountain Gate. And the keeper of that gate has never been moved.
F|Crimson Ronin|3|KAITO,AKIRA|AKIRA
AKIRA in|A storm blade on the ash road. I have wanted to test one for years.
KAITO|You were waiting on this road for me. Specifically.
AKIRA|For anyone with a blade worth crossing. Yours hums. I heard it from the ridge.
KAITO|That would be the storm steel. It does that when the weather turns.
AKIRA laugh|A sword that warns you about rain. I have carried mine for twenty years and all it does is get heavier.
KAITO|What do you want, ronin?
AKIRA|I lost my lord, my school and my name in one bad winter. Since then I walk, and I measure myself against whoever I meet.
KAITO look|And when you have measured everyone?
AKIRA|Then I will know whether what I lost was worth keeping. So far, the answer changes with every duel.
KAITO|That is a sad way to travel.
AKIRA point|It is an honest one. Draw, storm blade. Let us see what answer you give me.
KAITO draw|You picked a bad week. I am in a hurry.
T|Rivals|3|KAITO,AKIRA
AKIRA sit|You fight like someone with somewhere to be.
KAITO sit|I have a world to keep the lights on in.
AKIRA laugh|Ha! Then hear this. An army is moving in the desert under a tiger banner.
AKIRA look|They are collecting the same glass you are.
KAITO|You pulled that last cut. You could have ended it.
AKIRA|So did you. Twice. We are both terrible at winning.
KAITO laugh|Do not tell Rin. She thinks I never hold back.
AKIRA|Who trained you?
KAITO|A man called Raizo, in a citadel on the north coast. I left three years ago. We did not part well.
AKIRA look|The Storm Ogre. I know the name. He is the reason nobody attacks that coast.
KAITO|He is also the reason I learned to leave. Tell me about the army.
KAITO shock|An army. Wonderful.
F|Smoke and Steel|3|KAITO,ASH,DAI|ASH,DAI
DAI draw|One last lesson before the gate. The ghost wanted in on it.
KAITO|I thought ghosts did not take sides.
ASH|The smith asked nicely. And you did carry a cold thing into the crater. I was not wrong about that.
DAI|This is not a punishment, boy. The gate you are walking toward has broken stronger people than you.
KAITO cross|So you want to break me first?
DAI laugh|I want to see where you bend. A blade that has never been tested snaps at the worst time.
KAITO|Rin said you were the kindest man in the village.
DAI|I am. This is me being kind.
ASH|He made me train for a month before he let me haunt the road properly.
KAITO look|...I am not sure which of you worries me more.
KAITO draw|Rin, your teacher has strange friends.
F|The Steel Wall|3|RIN,TETSU|TETSU
TETSU in|Gate is closed. Come back never.
RIN|You do not even want to know why we are here?
TETSU|No.
RIN|We are saving the world. Sort of. There is a star, and it is actually a lock, and there is an empress.
TETSU|Still no.
RIN cross|Has anybody ever told you that you are hard to talk to?
TETSU|Yes. It is why I got the job.
RIN laugh|Okay, that is actually funny. Who hired you?
TETSU|The mountain. It pays in soup. It is very good soup.
RIN|What if I bring you better soup?
TETSU look|...There is no better soup. Now you have insulted the soup. Put up your hands.
RIN point|I love it when they say that.
T|Before the Gate|3|KAITO,RIN,GOU
GOU look|Small ones. You climbed far to be turned around.
KAITO point|There is a shard behind you. We need it.
GOU cross|Many have needed what is behind me. The mountain did not care.
RIN step|We are not asking the mountain. We are asking you.
KAITO|How long have you stood here?
GOU|Since I was a boy. My father stood here. His father stood here. The gate has never opened for a stranger.
RIN|What is behind it?
GOU|The heart of the mountain. The place the old smiths folded the steel. And now, a piece of cold glass that fell through my roof.
KAITO|That glass is part of a seal. If it stays apart from the others, something terrible wakes up.
GOU look|Something terrible is always waking up. Every traveler has a story. Every story ends with them wanting through my gate.
RIN|But ours is true!
GOU laugh|Good. Then ask properly.
B|Iron Mountain|3|KAITO,GOU,RIN,DAI,YUKI|GOU
GOU aura|Move me one step and the gate is yours.
KAITO|You could simply let us through. You heard the smith. You know what the shard is.
GOU|I know what Dai believes. I know what you believe. The mountain does not weigh beliefs.
KAITO|What does it weigh?
GOU|Feet. Whether they stay planted when the ground shakes. Whether they come back after being knocked away.
KAITO cross|That is all? No riddle, no oath?
GOU laugh|Riddles are for people who have time. I have had forty years to make this simple.
KAITO|And nobody has moved you. Not once.
GOU|A bear, once. Half a step. I still think about that bear.
KAITO look|Then I had better be more stubborn than a bear.
KAITO draw|One step. Got it.
>GOU step|...One step. Hah. The gate is yours, and so is the shard.
>RIN in|Kaito! You did it! He moved! I saw his heel come off the ground!
>GOU laugh|She has good eyes. Forty years, and it is a boy with a humming sword. The bear would be ashamed.
>KAITO tired|I think I broke something. Several things.
>DAI in|You bent. You did not snap. That is all I needed to see.
>RIN|Teacher! Did you watch? Did you see me keep the Steel Wall busy?
>DAI|I saw form twenty-two, performed badly, at exactly the right moment. I am proud of you.
>RIN cheer|He said proud! Kaito, you heard that. You are my witness.
>GOU|Keeper of the Frost Seal. The mountain held your shard as well as it could. It is cold in there now. Take it somewhere it belongs.
>YUKI in|Thank you, gatekeeper. When this is over, I will bring it back to rest here if you wish.
>GOU look|Bring the bear instead. I would like a rematch.
>RIN cheer|Three! Yuki, write that down. We are winning.
T|Green Silence|8|KAITO,YUKI
N|South of the crater, the bamboo closed in and the wind went soft.
KAITO sit|First time in days nobody is trying to hit me.
YUKI look|Do not get comfortable. Something in this grove is dreaming, and it is not a tree.
KAITO tired|You could let me have one minute.
KAITO|What kind of something?
YUKI|It feels like a thought that is not attached to anyone. It drifts between the stalks and it listens.
KAITO|That is not helping me relax.
YUKI|I did not come here to help you relax. I came to keep you alive.
KAITO laugh|You and Rin have very different ideas about travel.
YUKI look|Where is she?
KAITO|She saw a monastery through the trees and went to ask whether they have food. Zero went with her to make sure she does not start a fight.
YUKI|...She is going to start a fight.
YUKI laugh|You have had forty seconds. That is generous.
F|Jade Fist|8|RIN,MEI|MEI
MEI in|Visitors bow at the grove's edge. You did not bow.
RIN|Bow? I walked in and said hello! I even waved!
MEI|You walked in on the wrong foot, crossed the threshold without pausing, and waved with your left hand.
RIN|There is a wrong HAND?
MEI|There are eleven steps to entering Jade Monastery. You skipped nine and insulted the other two.
RIN tired|I only wanted to ask if you had dumplings.
MEI cross|We do. They are for guests. Guests bow.
RIN|Okay, okay! Teach me the bow and I will do it. I am a fast learner. I learned a whole form last week.
MEI laugh|The bow takes a season to learn properly. But there is a faster way to show respect here.
RIN|Please tell me it is the way I think it is.
MEI point|A match. Win or lose, you eat. Lose badly, you wash the dishes.
RIN draw|I will bow after. Promise.
F|Wild Fang|8|KAITO,BRAN|BRAN
BRAN ent|You smell like city and smoke. The grove does not like it. I do not either.
KAITO|I am only here for one night. I will not touch anything.
BRAN|Everything a traveler does touches something. You bent three stalks on the way in. I heard each one.
KAITO|You were watching me.
BRAN|I watch everyone. The grove has no walls, so I am the wall.
KAITO cross|Then you know there is something else in here. Something that is not me.
BRAN look|...You can feel it too? The others say I am imagining it. The birds stopped singing eight days ago.
KAITO|Eight days. That is when the star fell.
BRAN|I do not care about stars. I care that the deer will not come to the stream any more.
KAITO|Then we want the same thing. Let me help.
BRAN|The grove decides who helps. Come on, city boy. Show it your teeth.
KAITO draw|I have had worse reviews.
T|Tea with a Fox|8|KAITO,SHIRO,RIN
SHIRO sit|We meet again, loud feet. Tea?
KAITO shock|You. From the shrine. Did you follow us?
SHIRO laugh|I go where the story is. Yours is getting interesting.
RIN step|If you know where the shard is, just say it.
RIN|Since when do you two know each other?
KAITO|He attacked me at the shrine for walking too loudly.
SHIRO|I tested him. He passed. Mostly. There is a difference, and it matters to foxes.
RIN|Is this tea safe to drink? You have a look on your face.
SHIRO laugh|This is simply my face. I have had it for three hundred years and nobody has complained.
KAITO|Why are you really here, Shiro?
SHIRO look|The same reason as the wolf boy at the stream and the monk on the hill. Something is wrong in the green places, and I would like it to stop.
SHIRO point|The dancer has it. But she will not give it to people who cannot keep a beat.
F|Fox's Game|8|KAITO,SHIRO|SHIRO
SHIRO draw|Before the dancer, a warm-up. Catch me if you can.
KAITO|You said you would tell us where the shard was. You did not say there would be a game.
SHIRO|A fox never says. It is more fun when you find out.
KAITO|How many of these games are there going to be?
SHIRO laugh|As many as it takes for you to stop frowning. You have a very serious face for someone so young.
KAITO cross|People keep trying to steal a piece of the sky from me. It has been a serious month.
SHIRO|And yet the fire girl laughs through all of it. Have you wondered why?
KAITO|Because nothing scares her.
SHIRO look|Because everything does, and she decided long ago to be loud about it instead. Learn from that.
KAITO|...Are you giving me advice or stalling?
SHIRO|Both. Catch me, and I will give you more.
KAITO slash|I am getting tired of foxes.
T|The Blossom Dancer|8|HANA,KAITO
HANA look|The shard fell into my garden. Nothing has wilted since.
KAITO step|It is not a blessing. It is a piece of a prison.
HANA cross|Maybe. But it is my garden's piece now.
KAITO look|If she wakes, there is no garden.
KAITO|You have not asked who I am.
HANA|I know who you are. You are the friend of the girl who crushed my moonblooms at the shrine.
KAITO|She did offer to replant them.
HANA laugh|She did. I did not expect that. Most people who break things run faster afterward.
KAITO|Then you followed the shard here. All the way from the shrine.
HANA|My family has two gardens. This one is older. When the glass fell in it, every bud opened at once, in the wrong season.
KAITO look|And you thought it was a gift.
HANA point|Then show me you can protect it better than I can.
F|Dance of Petals|8|KAITO,HANA|HANA
HANA draw|Follow my steps. If you can.
HANA|My grandmother taught me that a garden is an argument with time. You plant, it takes. You plant again.
KAITO|That sounds tiring.
HANA|It is the only thing I have ever been good at. So when something falls from the sky and makes the arguing stop, I notice.
KAITO|It did not stop. It only paused. When she wakes, the shard will take everything back at once.
HANA cross|You say that as though you have seen it.
KAITO|I have a friend whose whole street was taken. He does not talk about it. He does not have to.
HANA look|...Then I will ask the garden's question, and you will answer it with your feet, not your mouth.
KAITO|What is the question?
HANA point|Whether you move like someone who protects things, or someone who only cuts them down.
KAITO draw|I am better at leading.
F|Grove Defenders|8|RIN,MEI,BRAN|MEI,BRAN
MEI in|The dancer may trust you. We have not decided.
RIN|Did I not already beat one of you? I am sure I already beat one of you.
MEI|You washed our dishes afterward. Badly. We had to rewash them.
RIN shock|I was being careful! Those bowls were tiny!
BRAN|The monk says you are a guest now. I say guests do not bring cold glass into the grove.
RIN|The glass was already here! We are trying to take it OUT.
MEI cross|That is what concerns us. It has been here eight days and the garden has never been greener.
RIN|And the birds stopped singing and the deer are gone. Wolf boy told Kaito. That is not a good trade!
BRAN look|...She listens better than she bows.
MEI laugh|Then let us see whether she fights better than she washes.
RIN cheer|Two at once! Yuki, hold my scarf.
T|The Grove Darkens|8|YUKI,HANA,KAITO
YUKI shock|The dreaming thing. It is awake. Everyone, behind me!
HANA step|My flowers. They are closing. All of them.
KAITO draw|Yuki, what is it?
KAITO|How long has it been in the grove?
YUKI|Eight days. It followed the shard down, the way a shadow follows a lamp.
HANA|It has been in my garden all this time? Watching me water things?
YUKI look|Feeding. Every night you slept near the shard, it took a little. Have you been dreaming at all?
HANA shock|...No. Not once. I thought I was only tired.
KAITO|That is why the birds left. Animals know.
YUKI point|A servant of Nova. It eats dreams and leaves people empty. Do not close your eyes.
B|Dream Eater|8|KAITO,YORU,RIN,YUKI,ZERO,HANA|YORU
YORU ent|Such tired little heroes. Sleep. I will carry the glass for you.
KAITO point|Nobody is sleeping tonight.
KAITO|You have been in Yuki's head. In Hana's. How many others?
YORU|Oh, I do not count. Counting is for people who expect to run out.
KAITO cross|Why does the empress need dreams?
YORU laugh|She does not. I do. She simply lets me keep what I find, and in return I open doors for her.
KAITO|What doors?
YORU|The ones inside people. You would be amazed how many of you leave them unlocked at night.
KAITO look|Mine are shut.
YORU|Yours are the loudest of all, little storm. A citadel on a cliff. An old man's back, turned. Shall I go on?
KAITO shock|...
YORU|There it is. That lovely crack. Now hold still.
YORU laugh|Everyone sleeps. It is only a question of when.
>YORU back|Mmm. Bitter dreams. I will come back when you are softer.
>RIN in|Kaito! We felt the whole grove shake. What was that thing?
>KAITO tired|It knew about the citadel. It knew things I have never told anyone.
>YUKI in|It reads what you are afraid of. That is all. It does not know you, it only knows where you flinch.
>ZERO in|It ran north. I followed as far as the ridge. It did not leave tracks. It did not have feet.
>RIN|So it is still out there. Great. I am never sleeping again.
>HANA in|The buds are closing. All the ones that opened wrong. I think the garden is going back to arguing.
>KAITO look|Is that good?
>HANA laugh|It is the right kind of tired. Thank you, storm boy. And tell the loud one her moonblooms will be ready by spring.
>RIN cheer|She forgave me! Four shards AND I am forgiven. Best day of the trip.
>HANA kneel|Take the shard. My garden is safer without it, and safer with you.
T|Harbor Lights|7|KAITO,RIN
N|Four shards. The fifth had fallen across the sea.
RIN look|That is a lot of water. I do not do water.
KAITO laugh|The girl who walks on lava is scared of a boat.
RIN cross|Lava is honest. Water lies. It looks flat and then it is not.
RIN|How far is it?
KAITO|Yuki says three days by ship, if the wind holds.
RIN shock|Three DAYS? On something that moves under your feet the whole time?
KAITO|You fought a dream monster last week.
RIN|That was different. I could punch the dream monster. You cannot punch the sea. I have thought about it.
KAITO laugh|You have actually thought about it.
RIN|At length. The sea would win. It is very big and it does not get tired.
KAITO look|Zero is already on the docks asking about ships. Come on. We will find you a bucket.
KAITO point|Then we find a captain who knows its lies.
F|Wave Rider|7|KAITO,KAI|KAI
KAI in|You want a ride across? Nobody rides my boat who cannot stay on their feet.
KAITO|We can pay. Not much, but we can pay.
KAI laugh|I do not want your coins, friend. Coins sink. I want to know who I am carrying.
KAITO|Four travelers. One of them is seasick already and we have not left the pier.
KAI|The red one? I saw her hugging a mooring post. I like her. She is honest about it.
KAITO|Then you will take us.
KAI cross|The crossing to the desert coast is the roughest water I know. I do not take passengers who freeze when it turns bad.
KAITO|I do not freeze.
KAI|Everybody says that on dry land. Come aboard. The deck is wet and it is moving. Let us see how you stand.
KAITO look|You test everyone this way?
KAI|Only the ones I plan to keep alive.
KAITO draw|Then let us see who falls first.
F|Tide Caller|7|RIN,AOI|AOI
AOI ent|You are afraid of the sea. It can tell, you know.
RIN|I was hugging that post for balance. It was a tactical hug.
AOI laugh|The sea does not mind. It likes being feared a little. It is the ones who are not afraid that it worries about.
RIN|You talk about it like it is a person.
AOI|It is older than people and it has moods. That is close enough.
RIN cross|What is its mood right now?
AOI look|Uneasy. Something fell into the deep water nine nights ago and it has not settled since.
RIN|That would be one of ours. A shard. We are sort of collecting them.
AOI|Then you are the reason my tides are wrong. I would like a word with you about that.
RIN|Is the word going to be a fight? Everyone's word is a fight lately.
AOI point|The sea speaks in waves. I am only translating.
RIN shock|Is everyone here a mind reader?
T|The Captain's Price|7|KAI,KAITO,RIN
KAI sit|All right, you can fight. Here is my price. The Crow gang owns these docks.
KAITO cross|Kuro. We have met.
KAI laugh|Then you know. Clear them off my pier and I will sail you to the moon.
RIN step|The desert is fine. We only need the desert.
KAITO|How many are there?
KAI|Twenty, maybe thirty. They take a cut of every cargo. Last month they took a whole boat because the owner was late paying.
RIN|And nobody stops them?
KAI|The harbor master is scared and the guards are bought. I am one man with a paddle.
KAITO look|It is a bo staff.
KAI laugh|It is a paddle when I am on the water and a staff when I am not. Saves room.
RIN|We beat their boss once already. He likes spoons.
KAI cheer|Desert it is! After the crows.
F|Crow's Nest|7|KAITO,KURO|KURO
KURO ent|The little storm again. And without your shiny thing.
KURO|Do you know how long it took me to build this? The docks, the crews, the arrangement with the harbor master?
KAITO|I do not care how long it took.
KURO|Eleven years. I came here with nothing but a coat. Now nothing moves on this water unless I say so.
KAITO cross|You are robbing people who have less than you did.
KURO laugh|I am taxing them. It is only robbery when you do it once.
KAITO|The boatman says you took a man's whole ship.
KURO|He was late. Rules are rules. A crow who forgives one debt has no nest by winter.
KAITO look|You could have been something better than this, Kuro. You are quick and you are clever.
KURO|Better does not pay, little storm. Come. Let me show you what eleven years buys.
KAITO point|I have more of them now. You are still not getting one.
T|What Zero Knows|7|ZERO,KAITO
ZERO ent|I went ahead. You are slower than I thought.
KAITO turn|You could knock.
ZERO look|The tiger banner Akira spoke of. Their general is called Tora. He has two shards.
KAITO shock|Two already.
KAITO|You were gone four days. Rin thought you had left for good.
ZERO|I told her I would be back. She said people always say that.
KAITO|What else did you find?
ZERO|Tora's army is not hired swords. They are farmers, mostly. Families. They follow him because he fed them through a famine.
KAITO look|So they are not our enemy either.
ZERO|No. Which makes it worse. You cannot fight your way through people who are only there because they are hungry.
KAITO|Then we do not fight the army. We go to the general.
ZERO cross|And he is not collecting them to break her prison. He is collecting them to hand over.
F|Dockside Brawl|7|KAITO,KURO,GIN|KURO,GIN
GIN in|Small world. The crow pays better than you did.
KAITO|You work for the Crows now. Last month you were selling us out to a tiger.
GIN laugh|I work for whoever is holding the cards. This week it is birds. I am very flexible.
KAITO|Does it ever bother you?
GIN|What, changing sides? Sides are for people who expect to lose. I just want to be standing next to the winner.
KURO|Enough chatter. The boy has four shards on him and I have a buyer.
KAITO cross|A buyer with a tiger pin?
GIN|Oh, he is sharp tonight. Yes. Same polite gentleman. He has doubled his offer.
KAITO look|Then you are both working for the same man and you do not even know what he serves.
GIN|I find it is healthier not to ask.
KAITO draw|He is about to pay worse.
F|Storm on Deck|7|RIN,AOI,KAI|AOI,KAI
KAI in|One more test before we sail. The sea wanted to join.
RIN|I have been sick four times and we are still tied to the dock!
KAI laugh|That is a harbor record. I am almost impressed.
AOI|The sea has been asking about you. It wants to know if you are really coming.
RIN|Tell it I am thinking about it.
KAI|Here is the thing, fire girl. Once we are out there, I cannot have someone who locks up when the deck tilts.
RIN cross|I do not lock up. I just... hold very still and hope.
AOI|That is locking up.
RIN tired|Fine. What do I have to do?
KAI point|Fight us both, on this deck, while it is rocking. If you are still upright at the end, you are crew.
RIN tired|I am going to be sick and then I am going to win.
T|Night Crossing|7|YUKI,KAITO
N|The ship slid out past the last lantern. Nobody could sleep.
YUKI look|I did not tell you everything. I did not miss the seal breaking.
KAITO look|Go on.
YUKI tired|I was asleep. On watch. I have never fallen asleep on watch in my life.
KAITO step|The Dream Eater.
YUKI kneel|I think it was in my head for weeks. I think I let it in.
KAITO|Is that why you never rest? You sit up every night. Rin noticed before I did.
YUKI|If I am asleep, it can find me. If it finds me, it finds the shards. So I do not sleep.
KAITO|That is not something a person can keep doing.
YUKI look|I have managed thirty-one days so far.
KAITO shock|Thirty-one. Yuki.
YUKI|I doze sitting up. A few minutes at a time. It is enough.
KAITO kneel|Then it used you. That is on it, not on you.
B|The Crow Reaper|7|KAITO,KURO,KAI,YUKI,RIN|KURO
KURO ent|You took my docks. I will take your ship, and everything shiny on it.
KAITO draw|You do not learn, do you.
KAITO|You followed us onto open water. In a rowboat.
KURO|Three rowboats. You sank two of them. That is coming out of what you owe me.
KAITO|I do not owe you anything.
KURO laugh|You owe me a harbor. Eleven years, and in one night a boy, a fish girl and a paddle man took it apart.
KAITO cross|It was not yours to keep. You know that. Somewhere under the coat, you know it.
KURO|Do not tell me what is under the coat.
KAITO look|Then tell me. Why the shards? You do not believe in empresses.
KURO|I believe in a buyer who pays triple. I believe in never being the boy with nothing but a coat again.
KAITO|There are other ways to not be that boy.
KURO|Name one that does not involve losing. No? Then draw.
KURO aura|Crows remember every face. That is all the learning we need.
>KURO kneel|Tch. Keep your glass. I found this one on the tide. It gives me bad dreams.
>KAI in|Is it over? I heard a splash and then a lot of swearing.
>KAITO|It is over. He gave up a shard he had been hiding. He said it was giving him bad dreams.
>YUKI in|The Dream Eater was working on him too. Poor man. He would never have known why he felt so empty.
>KURO|I can hear you, snow girl. I am sitting right here. Do not pity me.
>RIN in|Are you going to keep robbing the harbor?
>KURO tired|...With what? My crew jumped overboard the moment the fish girl raised the tide.
>KAI laugh|The boatmen are short a hand for night watch. Pay is bad. Nobody steals from you, though.
>KURO look|...Does it come with a coat?
>KAI|It comes with a paddle.
>RIN cheer|Five shards and the crow got a job. Can we please get off this boat now?
>KAITO cheer|That is five. Halfway, Yuki. Halfway.
T|Sand and Bones|6|KAITO,RIN,YUKI,ZERO
N|The desert had been a kingdom once. Now it was pillars and wind.
RIN tired|I miss the lava. At least lava has shade next to it.
YUKI look|These ruins are older than the seal. Someone here knew about her first.
RIN|How did a whole kingdom just stop?
YUKI|The stories say the wells went dry in a single season. I think now it may have been something else.
KAITO|Her?
YUKI|The carvings on that pillar show a sky with a hole in it. That is not how people draw a drought.
RIN cross|So she has done this before. Eaten a whole country.
YUKI look|Or tried to. Something stopped her. I would very much like to know what.
ZERO in|The army is camped two valleys east. Thousands of fires. They are not hiding.
KAITO|Then neither will we. But first I want to read these walls.
KAITO point|Tracks. Hundreds of them. The tiger army came through here.
F|Desert Sentry|6|KAITO,TETSU|TETSU
TETSU in|You again. The general pays better than the mountain did.
KAITO|You guarded a gate in a volcano. Now you guard a hole in the sand.
TETSU|The mountain stopped paying after you moved Gou. No gate, no soup.
KAITO|That is my fault?
TETSU|Yes.
KAITO laugh|Fair enough. What does the general pay in?
TETSU|Stew. It is not as good. I think about the soup often.
KAITO|You could simply let me past and I could put in a word with Gou.
TETSU look|...Would he take me back?
KAITO|He is looking for a bear to wrestle. He might settle for you.
TETSU cross|Tempting. But I gave my word to the tiger, and I have only ever broken my word once. It was about soup. Never again.
KAITO draw|Does everyone I beat get a new job?
F|Sandstorm Duel|6|RIN,ASH|ASH
ASH ent|Ash goes where the wind carries it. Today it carried me to you.
RIN|Did you follow us from the crater? That is three countries!
ASH|I do not follow. I drift. The wind was going this way, and it seems to like you.
RIN|Everyone keeps saying things like that. The sea likes me, the crater likes me. Why does everything like me?
ASH laugh|You make a great deal of noise and you mean all of it. The world finds that restful.
RIN shock|I am RESTFUL?
ASH|Compared to people who say one thing and want another. Yes.
RIN|Huh. Nobody has ever called me that. My teacher calls me a landslide.
ASH look|He told me to check on you, if the wind ever carried me close. He worries.
RIN|He does? He never says so!
ASH|He would not. So he sent a ghost instead. Come. Show me what to tell him.
RIN draw|Then I will send you back.
T|The Comet Witch|6|VEGA,YUKI,KAITO
VEGA sit|Oracle of Frost. You are a long way from snow.
YUKI shock|Vega. I thought you never left your tower.
VEGA laugh|A star falls and you expect an astronomer to stay home?
VEGA point|Read the wall. Ten shards make the seal. But ten shards in one hand also make a key.
KAITO|You came all this way to read a wall?
VEGA|I came to read the wall before the tiger's men use it for firewood. They are burning anything that is not sand.
YUKI|What does the rest say?
VEGA|That the people here built the first seal. Not your mountain. They were the ones who called her down in the first place.
KAITO shock|Called her down. She was invited?
VEGA look|They wanted rain. They asked the sky for help, and something answered. It was not what they hoped.
YUKI|And the first oracle made the seal to hold what they had let in.
VEGA|At the cost of this whole kingdom. Read the last line.
KAITO shock|So whoever gathers them all can lock her in. Or let her out.
F|Witch's Trial|6|KAITO,VEGA|VEGA
VEGA draw|Before you carry a key, I want to know what kind of hands hold it.
VEGA|Do you know why I live in a tower, Storm Blade?
KAITO|Yuki says you do not like people.
VEGA laugh|I like people very much. From a distance. Up close they keep asking me what the stars say about their love lives.
KAITO|What do the stars say about this?
VEGA|That a key and a lock look identical until someone turns them. And that you are the only one of your friends who has not asked what he will do when he has all ten.
KAITO look|I will give them to Yuki.
VEGA|And if Yuki is not there? If it is only you, and the empress, and a choice?
KAITO cross|Then I will choose.
VEGA point|Everyone says that. Let me see what your hands say when they are tired.
KAITO draw|Steady ones.
T|The Tiger General|6|TORA,KAITO
TORA ent|So you are the storm that has been knocking over my scouts.
KAITO cross|And you are the one handing shards to a monster.
TORA look|I am the one keeping forty thousand people alive. She promised to spare my lands.
KAITO step|She will not keep that promise.
KAITO|Your scouts could have killed us on the road. You told them not to.
TORA|I told them to watch. You fought my hired men without once reaching for a killing stroke. I wanted to know why.
KAITO|Because they were not the problem.
TORA laugh|Wiser than most generals. Sit. You have walked a long way to insult me. At least drink something first.
KAITO|How did she make the promise? Did you see her?
TORA look|In a dream. Every man in my camp had the same one, on the same night. A woman on a throne of glass, offering rain.
KAITO|That was not her. That was her servant. It eats dreams and it lies.
TORA turn|Perhaps. But she made it. You have offered me nothing.
F|Vanguard|6|KAITO,TETSU,ASH|TETSU,ASH
TETSU in|General's orders. Nobody reaches the tent.
TETSU|The tent is behind me. So this is where you stop.
KAITO|How many times have we done this now? Four?
TETSU|Three. The time in the crater was the red one.
ASH|He keeps count. He keeps count of everything. It is unsettling.
KAITO laugh|And you? I thought you were only here to check on Rin.
ASH|I was. Then the general's cook offered me a bowl of stew, and now I appear to have enlisted.
TETSU|The stew is not that good.
ASH look|You say that every night and then you have three bowls.
KAITO cross|Both of you could walk away. You do not owe this army anything.
TETSU|I gave my word. He ate their stew. Those are the rules.
KAITO draw|I am not here for the tent.
F|Honor Guard|6|RIN,JIN,TETSU|JIN,TETSU
JIN in|Sorry, fire girl. The tiger hired half the fighters in the country.
RIN|You too? You are a champion! You do not need the money!
JIN|I do not. But he asked me in person, fire girl. Rode into my arena, alone, and asked.
RIN|And you said yes to a man who works for a monster?
JIN look|I said yes to a man who told me forty thousand people would starve if he lost. I did not ask many questions after that.
RIN tired|...That is a really annoying good reason.
TETSU|Can we begin? I would like to be done before the stew goes cold.
RIN|Is that all you think about?
TETSU|Yes.
JIN laugh|No hard feelings either way. Same as last time. A clean fight, and whoever wins buys the noodles.
RIN point|You are on. But this time I am hungry, so I am going to hurry.
RIN point|Then I will punch half the country. Starting with you.
T|Rin's Resolve|6|RIN,KAITO
RIN look|Let me take him.
KAITO turn|Tora? He is the strongest one we have met.
RIN cross|He is scared for his people. I know that fight. I grew up in a crater that could go off any day.
RIN point|I am not going to beat him. I am going to show him what not being scared looks like.
KAITO|He has an army and thirty years of war behind him.
RIN|And I have a scarf and a bad attitude. I know.
KAITO laugh|That is not what I meant.
RIN|When I was six, the crater shook for nine days. Everyone ran for the ridge. My teacher stayed and held the forge doors shut so the village would have something to come back to.
KAITO look|You never told me that.
RIN|He was terrified. I could see his hands. He did it anyway, and he was laughing the whole time so I would not cry.
KAITO laugh|Then I will hold your scarf.
B|Tiger General|6|RIN,TORA,KAITO,YUKI,ZERO|TORA
TORA aura|A girl with fire in her hands. Is this the storm's offer?
RIN draw|This is mine. Fight me, and then listen.
TORA|You are very young to carry an offer for the fate of the world.
RIN|I am not carrying an offer. I am carrying an example.
TORA laugh|Explain.
RIN|You made a deal because you were scared for your people. I get that. I would have done it too.
TORA cross|Then you understand why I cannot break it.
RIN|I understand you think you cannot. That is different.
TORA look|She came to us in the same dream, child. Forty thousand of us. How do you fight that?
RIN|You stop letting a dream decide for you. Somebody has to go first. I thought it might as well be me.
TORA|And if you are wrong, they starve.
RIN point|And if you are wrong, there is no sky. Hit me as hard as you want, General. I am not moving until you hear it.
TORA draw|If you are still standing, I will.
>TORA kneel|...Forty thousand people. And one girl stood in front of me for all of them.
>KAITO in|Rin! You are still standing. I did not think... I mean, I knew you would.
>RIN tired|You did not think I would. It is okay. I did not either, around the middle part.
>TORA|She took everything I had and kept talking the entire time. I have fought kings who had less to say.
>YUKI in|General. The dream your army shared. I can end it, if you let me walk through the camp tonight.
>TORA look|You can do that?
>YUKI|It is the same creature that put me to sleep. I know its voice now. I can teach your people to stop listening.
>TORA|Then do it. And take my scouts north with you. If the empress wants my lands, she can come and ask me to my face.
>ZERO in|Seven shards. Three left. And one fewer army between us and the end.
>RIN cheer|I counted first! Zero, you cannot just walk in and say my number!
>RIN cheer|He gave us both shards! Seven! Somebody tell Yuki I counted.
T|Above the Clouds|4|KAITO,SORA
N|The eighth shard had not fallen at all. It had been caught, high in the sky.
SORA in|Ground walkers! You are standing on a holy cloud. Technically.
KAITO look|We are looking for a piece of glass that fell from up here.
SORA laugh|Fell? Nothing falls past the Sanctuary. The monk caught it out of the air.
KAITO|How do people get up here at all?
SORA|Most do not. You climbed the stair of ten thousand steps, which is the hard way. There is a lift on the north side.
KAITO shock|There is a lift.
SORA laugh|Nobody ever asks. They see the stairs and they just start climbing. It is very funny from up here.
KAITO|Rin is going to be furious.
SORA|Is she the one who has been shouting numbers for the last hour?
KAITO look|She was counting steps. She lost count twice and started over out of spite.
SORA|I like her already. Come on. The monk said to expect you.
KAITO tired|Of course he did.
F|Sky Lancer|4|KAITO,SORA|SORA
SORA draw|Nobody sees the monk without a pass. I am the pass.
KAITO|I thought you said the monk was expecting us.
SORA|He is. He is expecting you to be tested first. He did not say by whom, so I volunteered.
KAITO|Of course you did.
SORA cheer|It gets boring up here! The clouds do not fight back and the birds are bad conversationalists.
KAITO|You could come down the mountain sometimes.
SORA look|I did, once. Everything was so heavy. People walk like they are carrying something. Up here nobody does.
KAITO|That is because down there, people usually are.
SORA|...Huh. You are, too. I can see it in your shoulders.
KAITO cross|I am carrying seven pieces of a prison. It tends to show.
SORA point|Then let us see if you can still move like the wind with all that on your back.
KAITO draw|Then stamp me.
F|Star Archer|4|RIN,MIRA|MIRA
MIRA ent|That star was part of my sky. Give me one reason you should carry it.
RIN|I climbed ten thousand steps and there was a LIFT.
MIRA|I heard. The whole Sanctuary heard. You have a carrying voice.
RIN|Thank you! I think. Who are you?
MIRA look|The one who watched that star every night for eleven years. Then one evening I looked up and there was a hole where it used to be.
RIN|Oh. That must have been strange.
MIRA|It was like coming home and finding a wall missing. I have not slept well since.
RIN tired|Nobody is sleeping well. It is a whole thing. There is a monster.
MIRA cross|I do not care about monsters. I care that you are walking around with pieces of something that was mine to watch over.
RIN|It was not yours. No offense. It was a lock on a scary empress.
MIRA|It was the fixed point in my sky. Do not tell me what it was. Show me you deserve to hold it.
RIN point|I carried two across a desert. Your turn.
T|The Monk's Riddle|4|REN,KAITO,YUKI
REN sit|You came for the glass. Sit. Tell me what the wind is saying.
KAITO sit|...It is just wind.
REN laugh|Then you are not ready. The shard is loud. Whoever holds it must be quiet.
YUKI sit|He is right. I held one and heard nothing but my own fear.
KAITO|We do not have time to train. Every day we wait, she wakes a little more.
REN|And if you rush to her with a head full of noise, she will not need to wake. She will simply walk in.
YUKI|He is right, Kaito. The Dream Eater found the crack in you in a single breath.
KAITO cross|I know what it found.
REN laugh|Good. Knowing is the first half. Now, how long can you sit without thinking about the old man in the citadel?
KAITO shock|How do you...
REN|The wind told me. You shout it with your whole back, boy. Sit down.
REN point|Train with me. When you can hear the wind over the glass, I will give it to you.
F|Breath of Wind|4|KAITO,REN|REN
REN draw|First lesson. Stop trying to win.
KAITO|How do I fight without trying to win?
REN|The same way you breathe without trying to. You have been doing both wrong for years.
KAITO|That is not an answer.
REN laugh|It is the only answer. You grip the sword like it owes you money.
KAITO cross|My master taught me that grip.
REN|Your master taught you to hold on. He did not teach you when to let go. That is why you left him angry.
KAITO look|...You do not know anything about why I left.
REN|I know a young man who is still arguing with someone who is not in the room.
KAITO|Fine. Show me, then.
REN point|Attack me. And every time you think about winning, I will hit you with this stick.
KAITO shock|That is the opposite of everything I do.
T|Stargazing|4|MIRA,KAITO
MIRA sit|I used to name the stars. I named that one too, before it fell.
KAITO sit|What did you call it?
MIRA look|Anchor. It never moved. Sailors steered by it.
KAITO look|We will put it back.
KAITO|Rin said you tested her.
MIRA|I shot at her for a quarter of an hour. She caught the last arrow and handed it back. I did not know what to do with that.
KAITO laugh|Nobody does.
MIRA|She told me the star was a lock. I did not want to hear it.
KAITO look|It can be both. A lock for the world, and an anchor for you.
MIRA|You are kinder than you look, storm boy.
MIRA laugh|You cannot put a star back, storm boy. But you can stop the dark. I will help.
F|Twin Winds|4|KAITO,SORA,MIRA|SORA,MIRA
SORA cheer|Graduation day! The archer and I are your final exam.
SORA|The monk says you sat for six hours yesterday without moving.
KAITO|I fell asleep for four of them.
MIRA laugh|He says that counts. Sleeping without dreaming is harder than it sounds these days.
KAITO|What is the exam, exactly?
SORA|Simple! I come from above, she shoots from below, and you try to hear both of us before we get there.
KAITO cross|That does not sound simple.
MIRA|It is not. I have never missed, and she has never been caught.
SORA|If you are thinking about winning, you will be too slow. If you are thinking about the citadel, you will be much too slow.
KAITO look|And if I am not thinking about anything?
MIRA point|Then you might be the first person to pass. Ready?
KAITO draw|I thought the monk was the final exam.
F|The Holy Knight|4|YUKI,SERA|SERA
SERA ent|Yuki of the Frost Seal. By order of the Cathedral, you will answer for your failure.
YUKI|The Cathedral sent a knight. For me.
SERA|They sent a hundred. I am the one who climbed fastest. The rest took the stairs.
YUKI|There is a lift.
SERA shock|...There is a what?
YUKI|It does not matter. Sera, I know what the council thinks. I was the keeper. The seal broke.
SERA cross|A thousand years of unbroken watch, and it ended with you. Do you understand what that means to people?
YUKI look|Better than anyone. I see their faces every time I close my eyes.
SERA|Then come back with me. Stand before the council. Let someone else carry the shards.
YUKI|Someone who has never heard them sing? Someone the Dream Eater has not already tried? No.
SERA point|That was not a request, Oracle.
YUKI draw|I am answering for it. Every day. Stand aside.
T|Judgment|4|SERA,YUKI,KAITO
SERA point|The seal broke on her watch. She should not be allowed near the shards.
YUKI kneel|She is not wrong.
KAITO step|She is completely wrong. Yuki found seven shards. What has the Cathedral found?
SERA shock|...
KAITO point|Judge her when the sky is safe. Until then, help or get out of the way.
SERA|You defend her very quickly for someone who met her two months ago.
KAITO|I have walked beside her for two months. How long have you?
SERA|I do not need to walk beside someone to read a record. The watch failed on her night.
YUKI|Kaito, please. She is only doing what she swore to do.
KAITO cross|So are you. And you have not slept properly in sixty days doing it.
SERA look|...Sixty days?
YUKI tired|It is not important.
SERA cross|...I will watch. Closely.
B|Gale Monk|4|KAITO,REN,RIN,YUKI,SERA,MIRA|REN
REN aura|Last lesson. Tell me what the wind is saying now.
KAITO look|It says you are about to move left.
REN|You sat. You slept. You passed the wind twins. And still you are frowning.
KAITO|I am listening. It is what my face does.
REN laugh|Then your face is doing it wrong. Tell me, what did you hear this morning?
KAITO|Rin snoring. Zero pretending not to be awake. Yuki actually asleep, for the first time since I met her.
REN look|And yourself?
KAITO|...Quiet. Mostly. The citadel is still in there. It is just not shouting.
REN|That is all quiet ever is, boy. Not an empty room. A room where nothing is shouting.
KAITO cross|You could have told me that on the first day.
REN|You would have nodded and understood nothing. Now. One more time, with everything you have learned.
REN laugh|Good! Then stop me.
>REN sit|You heard it. The glass is yours. Carry it quietly.
>RIN in|He gave it to you! Is that eight? That is eight!
>KAITO|Eight. He caught it out of the sky with his bare hands and kept it under a teacup.
>REN laugh|It was the quietest place I could think of. Nobody looks under a teacup.
>YUKI in|Thank you, Master Ren. For the shard, and for the six hours of sleep.
>REN look|You carry more than he does, Oracle. Come back when this is done. I will teach you to put some of it down.
>SERA in|I have sent word to the Cathedral. I told them the Oracle is not to be recalled until the seal is whole.
>YUKI shock|Sera. They will be furious with you.
>SERA|Probably. I find I do not mind as much as I expected.
>MIRA in|I am coming with you as far as the snow line. I want to see where my star is going.
>RIN cheer|Everybody is nice now! I love this mountain. Is there really a lift down?
>KAITO kneel|Eight. Thank you, teacher. I will try the quiet part.
T|Home of Ice|2|YUKI,KAITO,RIN,ZERO
N|The ninth shard had fallen where the seal once stood. Frozen Summit.
YUKI look|This is where I grew up. That empty ring of stone is where I failed.
RIN shock|It is freezing! How did you grow up here and turn out so calm?
YUKI laugh|It is hard to be loud when your teeth are chattering.
KAITO|It is beautiful.
YUKI|It is empty. There were forty keepers when I was a child. Then twelve. Then me.
RIN|What happened to them?
YUKI|Some grew old. Some left for warmer places. A thousand quiet years makes people forget why the watch matters.
KAITO look|But you stayed.
YUKI|Someone had to. I used to think that made me strong. Now I think I was only the last one too stubborn to leave.
RIN cross|Those are the same thing, Yuki. Trust me. I am an expert on stubborn.
ZERO in|There are fresh tracks at the ring. One person. Small feet, a staff. They have been here for days.
KAITO point|Someone is at the ring. Waiting for us.
F|Moon Priestess|2|YUKI,LUNA|LUNA
LUNA ent|Sister. You came back. The mountain has been asking where you were.
YUKI|How long have you been waiting here?
LUNA|Since the night it broke. I came up from the Moon Shrine as soon as I felt it. You were already gone.
YUKI|I had to follow the shards. There was no time to send word.
LUNA look|There was time for a note, sister. One line. Still alive. I spent a month not knowing.
YUKI tired|...I am sorry. I was not thinking about anything except fixing it.
LUNA|You never are. You were the same at nine years old. You carried water for the whole temple and never asked for help.
YUKI|Is that why you are standing in my way? Because I did not write?
LUNA cross|I am standing in your way because you look like you have not slept in a season and you are about to walk into the worst place on this mountain.
YUKI|I have to go to the ring, Luna.
LUNA point|Then prove to me you are strong enough to come back out of it.
YUKI draw|Luna. Please. I do not want to fight you.
F|Cold Blades|2|KAITO,SERA|SERA
SERA in|I said I would watch. I did not say I would watch quietly.
KAITO|I thought you were on our side now.
SERA|I am. That is why I am doing this here, where it is only snow, and not later, where it will matter.
KAITO|Doing what, exactly?
SERA cross|You defended her to my face without knowing whether she deserved it. I admire that. It also worries me.
KAITO|She did deserve it.
SERA|You did not know that then. You decided, and you would have drawn on a Cathedral knight to back it up.
KAITO look|I would do it again.
SERA|I believe you. So I need to know something before we reach the throne. When she is wrong, will you tell her?
KAITO|That is a strange thing to fight about.
SERA point|It is the only thing worth fighting about. Loyalty that cannot say no is just another kind of sleep.
KAITO draw|Fine. Let us get this over with.
T|The Truth|2|YUKI,LUNA,KAITO
LUNA sit|You did not fail, Yuki. I have read the old stones since you left.
YUKI look|I fell asleep, Luna.
LUNA point|You were put to sleep. And the seal did not crack from outside. It cracked from within.
KAITO shock|She broke out on her own?
LUNA look|She had help. And she knew exactly which keeper to put to sleep. Nova was the first Frost Oracle.
KAITO|How can stones tell you that?
LUNA|The old keepers carved the seal's whole life into the ring. Every crack, every repair, for a thousand years.
YUKI|I have read those stones a hundred times. There was never a crack from within.
LUNA look|There was one. On the very first night. It was hidden under moss. I only found it because the moss died when the seal broke.
KAITO|What does it say?
LUNA|That the seal was not built around her. It was built by her. From the inside.
YUKI shock|No. That is not possible. Nobody would lock themselves in.
YUKI shock|She was one of us.
F|Nightmare|2|YUKI,YORU|YORU
YORU ent|Hello again, little keeper. I kept your dreams warm for you.
YUKI|You are not as large as I remember.
YORU laugh|You were asleep the last time. Everyone is larger in a dream.
YUKI|Thirty-one nights. You sat in my head for thirty-one nights and I never felt you.
YORU|You felt me. You called it being tired. You called it duty. You have such lovely names for giving up.
YUKI cross|I did not give up.
YORU look|No? Then why did it feel so good when you finally slept? Admit it, little keeper. You wanted someone to take the watch.
YUKI tired|...Maybe I did.
YORU|There. Was that so hard? Come, lie down. I will take it again.
YUKI aura|I wanted help. I did not want you. Those are not the same thing, and I know the difference now.
YORU shock|...Oh. That is new. I do not like that at all.
YUKI aura|Get out of my head. And then get off my mountain.
T|Rin's Fire|2|RIN,YUKI
RIN sit|Hey. You are doing the staring thing again.
YUKI sit|The first of us became the thing we guard against. What does that make me?
RIN laugh|Someone who walked across the whole world to fix it. That is what it makes you.
RIN point|You want to know the difference between you and her? You have us.
YUKI|How do you do it, Rin? You are afraid of the sea, of heights, of being left behind. And you laugh.
RIN|Who told you I am afraid of being left behind?
YUKI|Nobody. You count us every morning before you say anything else.
RIN shock|...You noticed that.
YUKI look|I notice everything. It is the only thing I was ever trained to do.
RIN|Well. Yeah. My parents left the crater when I was small and did not come back. So I count.
YUKI|I did not know.
YUKI laugh|...You are very loud. I am glad.
F|Frozen Echoes|2|KAITO,LUNA,SERA|LUNA,SERA
LUNA draw|The mountain wants to see the ones who carry its seal.
KAITO|You are both testing me at the same time now?
LUNA|The mountain has only ever had one keeper at a time. I think that was the mistake.
SERA|And the Cathedral has only ever had knights who obey. I think that was ours.
KAITO cross|So this is not about me at all.
LUNA laugh|It is a little about you. You are the one all of them follow.
KAITO|I am not leading anyone. I just keep walking and they keep being there.
SERA look|That is what leading is. Nobody told you?
KAITO|My master said leading was standing in a tower and being right.
LUNA|Then your master was lonely. Come. Show the mountain what it looks like when four people guard something together.
KAITO point|Four? There are only two of you.
KAITO draw|The mountain could just ask.
F|Under the Ice|2|RIN,YORU,KURO|YORU,KURO
KURO in|The dream thing pays in nightmares. I sell those.
RIN|Where is Yuki? She was right behind me.
KURO|Busy. The dream thing wanted her alone. It paid me to keep the loud one occupied.
RIN shock|You have a job! On a boat! We got you a job!
KURO tired|I had a job. Then I started dreaming again, and in the dream there was a mountain of silver, and I woke up here.
RIN|That is not a dream, that is the monster! It is using you!
YORU laugh|It is rude to explain the trick while I am performing it.
RIN cross|Let him go. He was doing better. He had a paddle and everything.
YORU|He let me in the same way they all do. A little hunger, a little door.
KURO look|...Fire girl. Hit me hard. I think it lets go when I am knocked down.
RIN point|That is the nicest thing you have ever asked me. Hold still.
RIN draw|Yuki is busy. You get me instead.
T|Nine Shards|2|KAITO,YUKI,RIN,ZERO
KAITO cheer|Nine. One left.
ZERO ent|I know where it is. You will not like it.
KAITO turn|Say it.
ZERO look|Storm Citadel. Your home. Your old master has had it since the night it fell.
KAITO shock|Raizo.
RIN|One left! Where is it? Volcano, done. Ocean, done. Sky, done. What is left, the moon?
ZERO|You will not like it.
KAITO|You said that already.
ZERO look|I wanted to give you a moment. It is on the north coast. In a tower. It has been there since the first night.
KAITO shock|The north coast.
RIN|Kaito? Why did your face do that?
YUKI tired|Kaito. Something is wrong. I can hear her. She is very close.
B|Frost Oracle|2|KAITO,YUKI,RIN,ZERO,LUNA|YUKI
YUKI aura|Give me the shards. All nine. She has waited so long.
KAITO shock|Yuki! That is not you talking. Wake up!
KAITO|Yuki, put the staff down. You are scaring Rin.
YUKI|Rin is asleep. Zero is asleep. Everyone on this mountain is asleep but you and me.
KAITO look|What did you do to them?
YUKI laugh|Nothing they did not want. They were so tired, Kaito. You all are. I only opened the door.
KAITO|That is the Dream Eater's line. Yuki would never say that.
YUKI|Yuki is resting. She has earned it. Sixty days awake, carrying everyone. Do you know what she dreams about?
KAITO cross|Tell me.
YUKI|A warm room, and somebody else on watch. That is all. It is the smallest wish I have ever eaten.
KAITO|Then she can have it. After. Give her back.
YUKI point|Take her back, storm boy. If you can reach her through me.
YUKI draw|The keeper sleeps. I will keep her watch.
>YUKI kneel|...Kaito? I was dreaming again. Did I hurt anyone?
>RIN in|What happened? I was counting everyone and then I was on the floor!
>KAITO|The Dream Eater. It went into Yuki one last time. It is gone now. Really gone.
>YUKI tired|I felt it leave. Like a splinter coming out. Rin, did I hurt you?
>RIN|You put me to sleep for ten minutes. Honestly, I needed it.
>ZERO in|I woke on the stairs with frost on my coat. I would like that never to happen again.
>LUNA in|The ninth shard was under the ring the whole time. I dug it out while you were fighting. Here.
>YUKI look|Nine. And I gave them to it. I held them out with both hands.
>KAITO|You fought it from the inside the whole time. I could see it. Every strike you threw was half a second slow.
>YUKI shock|...You noticed that?
>KAITO laugh|I notice things too. Come on. One more shard. And then you can have your warm room.
>KAITO kneel|Nobody that will not heal. It is out of your head now. For good.
T|Homecoming|9|KAITO,RIN
N|Storm Citadel. Kaito had not walked its bridge in three years.
RIN look|You grew up in a castle? You never said you grew up in a castle.
KAITO cross|It is a fortress. It is cold and it leaks.
RIN laugh|You left because of a leaky roof?
RIN|How long is this bridge?
KAITO|A mile. It is the only way in. My master used to make us run it every morning before food.
RIN|Before food? That is a crime.
KAITO laugh|He would stand at the far end with a bowl of rice and eat it slowly while we ran.
RIN|I hate him already. What was he like otherwise?
KAITO|The strongest man I have ever seen. He once stopped a landslide by shouting at it.
RIN shock|That is not real.
KAITO|I was there. The landslide stopped. I think it was embarrassed.
KAITO look|I left because my master thinks power should be locked in a tower. I think it should be used for people.
F|Thunder Fist|9|KAITO,JIN|JIN
JIN in|Kaito! Three years and not one letter. I am going to hit you for each month.
KAITO|You look the same. Did you get shorter?
JIN|You got taller and it is unfair. Also, the fire girl beat me twice this year and told me she knew you. I nearly fell over.
KAITO laugh|She mentioned an arena she broke.
JIN|My arena! I had just had it painted!
KAITO|How is he, Jin?
JIN look|Older. Louder. He still sets a place for you at the table. He would deny it if you asked.
KAITO shock|...Three years, and he sets a place.
JIN|Every night. Then he complains that the rice is going to waste and eats it himself.
KAITO|That sounds like him.
JIN point|Come on. I cannot let you in without a fight. He would never forgive me, and frankly neither would I.
KAITO laugh|Hello to you too, Jin.
F|Storm Drills|9|RIN,JIN,TETSU|JIN,TETSU
TETSU in|Citadel pays best of all. Do not look at me like that.
RIN|How do you two even know each other?
JIN|We do not. He was standing at the gate when I got here and he has not said a word in an hour.
TETSU|I said good morning.
JIN|You nodded.
TETSU|That is how I say it.
RIN laugh|Okay, Tetsu, I have to know. Volcano, desert, now a citadel. Is there anywhere you have not guarded?
TETSU look|A bakery, once. Two days. They let me go.
RIN|Why?
TETSU|I would not let the customers in.
JIN|The old man told us to drill anyone who crosses the bridge. Sorry, fire girl. Third time is the charm?
RIN tired|How many jobs does this man have?
T|The Storm Ogre|9|RAIZO,KAITO
RAIZO ent|The boy who walked out comes back with a bag of glass. Sit.
KAITO point|You have the tenth shard. I need it.
RAIZO cross|I know what it is. It is the last lock on the worst thing that ever lived. It stays here.
KAITO step|Nine locks are with me. One alone is not a wall. It is bait.
KAITO|You knew what it was. The night it fell, you knew.
RAIZO|I have known since before you were born. Why do you think this citadel was built on this rock?
KAITO shock|It was built to guard the seal?
RAIZO laugh|It was built to guard the last piece, if the seal ever broke. The keepers on the mountain were the watch. We were the wall behind them.
KAITO|You never told me any of this.
RAIZO look|You left before I could. You were fifteen and you knew everything.
KAITO cross|I left because you would not let the citadel help a village two miles away during the flood.
RAIZO|Because if the wall leaves its post, there is no wall. I have regretted that flood every night for three years. I would still do it again.
RAIZO laugh|Then let her come. I have been bored for three years.
F|Lightning Step|9|KAITO,RAIZO|RAIZO
RAIZO draw|Show me what you learned out there. I will go easy.
RAIZO|Your stance is wider. Someone has been teaching you.
KAITO|A monk on a mountain. He hit me with a stick until I stopped thinking.
RAIZO laugh|Ha! I spent ten years trying to make you think more. He undid it in a week.
KAITO|He said you taught me to hold on but not to let go.
RAIZO look|...Did he. Wise man. Annoying, I expect.
KAITO|Very.
RAIZO|And the grip. You changed the grip. It is looser.
KAITO cross|It is better.
RAIZO|It is different. Whether it is better, we are about to find out. Do not embarrass that monk.
KAITO point|Do not go easy. I mean it.
KAITO draw|Do not.
T|Old Friends|9|JIN,KAITO,RIN
JIN sit|He will not give it up, you know. He would rather the tower fall on him.
KAITO sit|I know. He taught me to be exactly that stubborn.
RIN step|Then we out-stubborn him. I am very good at that.
JIN laugh|I like her. Kaito, for what it is worth, half the citadel is with you.
RIN|Why is he like that? He is clearly glad Kaito is back. He just keeps yelling.
JIN|That is him being glad. If he were angry he would be very quiet and someone would be running laps.
KAITO laugh|That is accurate.
RIN|My teacher is the same, except with hammers.
JIN look|He has not left this rock in forty years. He thinks if he walks to the end of the bridge, the sky will fall in.
KAITO|He might be right. It is the last shard.
RIN cross|Then we do not take it away from him. We bring the other nine here.
KAITO look|I would rather have all of it. And him.
F|The Citadel Falls|9|KAITO,TORA,YORU|TORA,YORU
YORU ent|Knock knock. The Empress would like her last piece.
KAITO|Tora. You broke free of her. I watched you do it.
TORA tired|I did. Most of my people did. But she kept two hundred of them, and they marched in the night. I came to bring them home.
YORU|And walked straight into my arms. Generals are so reliable.
KAITO shock|You. Yuki drove you out. You were finished.
YORU laugh|From her. There are so many other heads, little storm. I only ever need one open door.
TORA|I can feel it pushing. Like a hand on the back of my skull. Kaito, I am going to swing at you and I will not mean it.
KAITO cross|I know. I have fought you before. I will be careful.
YORU|Careful! How sweet. He thinks this is the kind of night where careful matters.
TORA look|Hit me the way the girl did. It worked the first time.
KAITO point|Rin is at the gate. You will have to settle for me.
TORA look|My soldiers are not all free of her yet. Forgive me, storm. This one is not my choice.
F|Hold the Gate|9|RIN,KURO,ASH|KURO,ASH
KURO in|The winning side pays in shiny things. Nothing personal.
RIN|You AGAIN? I knocked that thing out of you on the mountain!
KURO|It grows back. Like mold. I am starting to think it is me that is the problem.
ASH|I was offered a very good stew. I am not proud of what I do for stew.
RIN tired|Does nobody in this country have willpower?
KURO laugh|Says the girl who crossed a desert for noodles.
RIN|That was DIFFERENT. Those were really good noodles.
ASH look|The dream is loud tonight. It wants the tower. I do not think I can stop walking toward it.
RIN cross|Then I will stop you. Both of you. And then you are both coming inside and getting real food.
KURO|Is that a threat or an invitation?
RIN point|In the crater there is no difference. Ask the ghost.
RIN aura|It is personal now. Nobody gets past this gate.
T|The Sky Goes Dark|9|YUKI,KAITO,RAIZO
N|The gate held. The tower did not. A hand of shadow reached down and closed.
YUKI shock|The shards! All of them! She pulled them right through the walls!
RAIZO tired|...Bait. You said it was bait. And I sat on it like an old fool.
KAITO kneel|It is done. She has all ten.
KAITO|Where are they? I had them. They were on my belt!
YUKI|She did not need to be awake to do it. She only needed all ten within the same walls.
RAIZO look|Forty years I kept it apart from the others. And the moment they arrive, I let them in the front gate.
KAITO|You could not have known.
RAIZO|It was my whole purpose to know. Do not comfort me, boy. I do not deserve it and I do not like it.
YUKI tired|The sky is going dark from the north. Can you see it? That is not weather.
RAIZO point|Then stop kneeling. A key in her hand still has to be turned. Go and take it back.
B|Final Lesson|9|KAITO,RAIZO,JIN,RIN,YUKI|RAIZO
RAIZO aura|You are not going to her throne until I know you can survive it. Everything, boy. Now.
KAITO|There is no time for this. Every minute she is closer to turning the key.
RAIZO|There is exactly enough time for this. If you go to her throne as you are, she takes you in one breath.
KAITO cross|I have beaten a general, a mountain and a monster.
RAIZO laugh|And you have never once beaten me. That is the one that is still shouting in your head.
KAITO look|...The monk said the same thing.
RAIZO|Then he and I agree, and I refuse to be less wise than a man with a stick.
KAITO|What if I lose?
RAIZO|Then you stay here and hold the wall, and I go in your place. One of us is leaving this rock tonight.
KAITO shock|You would leave the citadel?
RAIZO|For this? For you? Boy, I would have left it three years ago if I had known how.
KAITO draw|Yes, master.
>RAIZO kneel|Hah. Hah! There it is. Take my blade's blessing. It is all I have left to teach.
>JIN in|Is it over? The whole tower was shaking. Half the roof tiles are in the sea.
>RAIZO laugh|It is over. He put me on my back. Forty years, and it is the boy who ran away.
>KAITO tired|I think I only won because you were laughing too hard to block.
>RAIZO|That is the best reason I have ever lost for.
>RIN in|Did you see it, Jin? He let go of the sword at the end. He just let go and caught it again!
>RAIZO look|The monk's trick. I have decided to forgive him for it.
>YUKI in|The dark is spreading faster. We need to leave tonight. The throne is under the old mountain, three days south.
>RAIZO|Two, if you take the citadel's ships. They are yours. So are my men. So is whatever is left of me.
>KAITO shock|You are coming?
>RAIZO|To the end of the bridge. Someone has to hold the wall. But I will be standing on the far side of it for once, waving.
>KAITO cheer|I will bring the sky back with me. Keep the roof from leaking until then.
T|The Hollow Throne|5|KAITO,RIN,YUKI,ZERO
N|Under the mountain, past the last light, the crystals sang with her voice.
RIN look|It is beautiful. Why is the scary place always beautiful?
ZERO cross|So you walk in.
YUKI point|The throne is at the bottom. She is not fully awake. The seal is a key, and she has not turned it yet.
KAITO|How deep does it go?
YUKI|Nobody knows. The first keepers sealed the entrance and then forgot where it was. I only found it because the shards are pulling me.
RIN|It is warm down here. Why is it warm? It should not be warm.
ZERO|Because something is breathing.
RIN shock|Zero! You cannot just say things like that!
ZERO look|You asked.
KAITO|Stay together. If the Dream Eater is down here, it will try to split us up first.
RIN|I counted this morning. Four. I am going to keep counting the whole way down.
KAITO draw|Then we are not late. Stay close.
F|Throne Guard|5|RIN,TORA|TORA
TORA in|She still holds my people. Free me the way you did before, fire girl.
RIN|General! You look terrible!
TORA tired|I have been walking for three days with something else moving my legs. It is not restful.
RIN|Where are your two hundred?
TORA|Behind me, in the dark, standing in rows. They are not hurt. They are simply... waiting.
RIN cross|For what?
TORA look|For her to turn the key. She wants an army at her door when she opens it.
RIN|That is not going to happen. I punched it out of you once. I can do it again.
TORA|It is stronger here. This close to her, I can barely hear my own name.
RIN|Then listen to mine. I am Rin, I am from the crater, and I am extremely loud.
TORA laugh|...Yes. That, I can hear. Do your worst, child.
RIN draw|Hold still, General. This will only hurt a lot.
F|Wall of Dreams|5|YUKI,YORU|YORU
YORU ent|Little keeper. You came all this way to sleep at her feet.
YUKI|This is the last time.
YORU|You said that on the mountain. And yet here I am, and here you are, and you look so very tired.
YUKI|I am tired. I have stopped being ashamed of it.
YORU shock|That is not how this goes. You are supposed to hide it. That is where I live.
YUKI look|I know. Rin told me she counts us every morning. Kaito told me about a place set at a table. Zero told me his brother's name.
YORU|What does any of that have to do with me?
YUKI|You eat the things people cannot say. We have started saying them.
YORU cross|Words. You think words can starve me?
YUKI|I think you have been getting smaller every time we meet. I think you are frightened.
YORU|I am never frightened. I am the thing at the bottom of the stairs.
YUKI draw|I came all this way to wake everyone up.
T|The Empress|5|NOVA,KAITO
NOVA ent|Storm Blade. You carried my pieces so carefully. Thank you.
KAITO point|Give them back.
NOVA laugh|They were mine first. I made the seal, child. I sat inside it for a thousand years so the void would not eat your world.
KAITO shock|You were the lock.
KAITO|You made the seal yourself.
NOVA|With my own hands. The desert kings called something down they could not send back. It was eating their sky.
KAITO|So you trapped it.
NOVA look|I could not trap it. Nothing could. I could only give it something to hold on to instead of the world. So I gave it me.
KAITO shock|The void is not you. It is inside you.
NOVA|For a thousand years. I told the other keepers to watch the seal. I did not tell them I was in it. They would have tried to get me out.
KAITO|Why did nobody come?
NOVA look|And nobody ever came to take my place. So I am leaving. What happens after is no longer my watch.
F|Shadows of Friends|5|KAITO,RIN,YUKI,NOVA|RIN,YUKI
NOVA in|Before you raise that sword at me, raise it at them.
KAITO|Rin. It is me. Put your hands down.
RIN|Kaito always wins. Kaito always bows. Kaito leaves, just like everyone leaves.
KAITO shock|That is not you talking. Rin, count us. Count!
YUKI|There is no one to count. There was only ever the watch, and I failed it.
NOVA|Do you see? I did not put those thoughts there. I only turned up the volume.
KAITO cross|They told me those things themselves. Out loud, by a fire. You are too late to use them.
NOVA look|...They told you?
KAITO|That is what friends are for. Something you would not know about, after a thousand years of telling nobody anything.
NOVA|Careful, child.
KAITO point|Rin, Yuki, I am sorry about this. I will buy the noodles after.
KAITO shock|Rin? Yuki? No. Those are not their eyes.
T|Light a Fire|5|RIN,KAITO,YUKI
RIN kneel|Ow. Did I hit you? I dreamed I hit you.
KAITO laugh|You hit like you always do. I am fine.
YUKI look|She is not lying. She was the first keeper. She held the void alone, and nobody relieved her.
RIN step|So she is not evil. She is tired.
YUKI|When did you count last?
RIN|This morning. Four. Then the dark came and I could not find anyone.
KAITO|We were right here the whole time.
RIN laugh|I know that NOW. In the dream I was back on the ridge, and the village was empty.
YUKI look|I was at the ring. Alone. It felt exactly like it always has.
KAITO|That is what she has had for a thousand years. Not a nightmare. Just that.
RIN shock|...Oh. Oh, that is so much worse than being evil.
KAITO look|Then we do not just beat her. We give her what nobody did. Someone to take the watch.
F|Last Guard|5|KAITO,TORA,YORU|TORA,YORU
YORU aura|No more dreams. No more games. You do not reach the throne.
KAITO|General. Fight it.
TORA|I am. This is me fighting it. You should see what it wants me to do.
YORU laugh|He is doing very well. He has almost moved one finger on his own.
KAITO cross|You are down to two puppets and a cave. You were bigger in the grove.
YORU|Mind your tongue.
KAITO look|Yuki was right. You are shrinking. Every person who shook you off took a piece with them.
YORU|I have her. I will always have her. A thousand years of loneliness is a feast that never ends.
KAITO|Not if we end the loneliness.
TORA|Boy, whatever you are planning, do it soon. My arm is coming up and I did not tell it to.
YORU point|Enough. Sleep.
KAITO draw|Tora, I know you can hear me. Fight it!
F|Edge of the Void|5|KAITO,KURO,ASH,YORU|KURO,ASH,YORU
YORU ent|Everything she has left, between you and her. Sleep, storm.
KAITO|Three of you. Is that everyone you have left?
YORU|It is enough. A crow who is hungry, a ghost who is lonely, and me.
KURO tired|Little storm. For what it is worth, I liked the paddle.
ASH|And I liked the stew. Tell the fire girl I said so.
KAITO|Tell her yourselves. You are both walking out of here.
YORU laugh|Listen to him. He still thinks this is a rescue.
KAITO cross|It has been a rescue since the shrine. I just did not know who we were rescuing.
YORU shock|...What did you say?
KAITO look|Her. We are here for her. And you are standing in the doorway.
YORU|No. No, she is MINE. She was mine before your grandfathers were born!
KAITO aura|Not tonight. Not ever again.
T|Before the End|5|KAITO,RIN,YUKI,ZERO
KAITO look|This is it. Past that door there is no more road.
RIN cheer|Then we make a lot of noise on the way in.
ZERO look|I spent years keeping my distance. I would like to stand close for this one.
YUKI point|Kaito. When the seal reforms, someone has to keep it. I will. And this time I will not be alone.
RIN|Does anybody have anything they want to say? In case, you know.
ZERO|My brother's name was Ren. Not the monk. A different Ren. He would have liked all of you.
YUKI|I am glad I did not write to the Cathedral for help. They would have sent knights. I got you instead.
RIN laugh|I want it on record that I am not scared, and that I am lying.
KAITO|I left home angry and I thought that made me free. It only made me alone.
RIN shock|Kaito said a feeling! Everybody saw that, right?
ZERO look|I saw it. I will deny it if asked.
KAITO point|None of us will. Let us go wake her up properly.
B|Event Horizon|5|KAITO,NOVA,YUKI,RIN,ZERO|NOVA
NOVA aura|A thousand years, and the first people to reach me came to fight.
KAITO draw|We came to take over your watch. You can rest. But not like this.
NOVA|Take my watch. Do you know what you are offering?
KAITO|No. Tell me.
NOVA|Cold that does not end. A voice that is not yours, asking to be let out, every hour of every year.
KAITO look|And you held that alone.
NOVA|Someone had to. I chose it. I would choose it again. I simply cannot do it any longer.
KAITO|You do not have to. That is the part you never tried. It does not have to be one person.
NOVA laugh|Four children. Against the thing that ate a kingdom.
KAITO cross|Four today. The Cathedral tomorrow. A citadel, a crater, a harbor, an army. We have been collecting more than shards.
NOVA shock|...You brought them all.
KAITO point|Everyone we fought is standing on the mountain above us. Waiting to take a turn. So let go, and let us show you.
NOVA draw|Then show me that you can hold what I held.
>NOVA kneel|...You are still standing. All of you. I held it alone because I thought nobody else could.
>YUKI in|The seal is whole again. And it has four keepers now. Rest, first oracle.
>RIN in|Is she... is it over? The humming stopped. I can hear my own ears.
>NOVA tired|It is quiet. I had forgotten what quiet was. I thought it would be emptier.
>KAITO|It is not an empty room. It is just a room where nothing is shouting. A monk told me that.
>ZERO in|The dark is pulling back from the north. I watched it go from the cave mouth. The stars are coming out in order.
>YUKI|The void is still there. It will always be there. But it is spread across forty thousand hands now instead of one.
>NOVA look|And if they grow tired?
>YUKI|Then they will say so, and someone else will take a turn. That is the whole of it. That is all it ever needed.
>RIN|Hey. First oracle. Do you like noodles? Because there is a cart in Neon District that never closes.
>NOVA laugh|...I have not eaten in a thousand years, child.
>RIN cheer|Then you are going to LOVE the cart.
>KAITO cheer|Look up. The star is back. Chapter one, done. Who is hungry?
`;
const QS=[];
RAW.split('\n').forEach(l=>{l=l.trim();if(!l)return;const p=l.split('|');
 if(/^[TFB]$/.test(p[0])&&p.length>=4){QS.push({k:p[0],t:p[1],st:+p[2]|0,cast:p[3].split(',').map(n=>NM[n]).filter(v=>v!=null),foe:(p[4]||'').split(',').map(n=>NM[n]).filter(v=>v!=null),s:[],a:[]});return}
 const q=QS[QS.length-1];if(!q)return;let aft=false,h=p[0];if(h[0]==='>'){aft=true;h=h.slice(1)}const hp=h.split(' '),w=hp[0]==='N'?-1:NM[hp[0]];if(w==null)return;(aft?q.a:q.s).push({w,act:hp[1]||'',line:p.slice(1).join('|')})});
const done=()=>Math.max(0,Math.min(QS.length,SV.st1|0));
function mark(qi){if(qi>=done()){SV.st1=qi+1;save();G.spg=Math.min(9,(SV.st1/10)|0)}}
const CAMS=['front','two','orbit','behind','low','pull','two','front','wide'],RCAM=['front','orbit','two','eyes','low','pull','two','eyes'],NACT=['','','point','','cross','','step','','back',''];
const others=f=>SC.list.filter(q=>q!==f&&!q.hide);
function nearest(f){let b=null;SC.list.forEach(q=>{if(q!==f&&!q.hide&&(!b||Math.abs(q.x-f.x)<Math.abs(b.x-f.x)))b=q});return b||f}
function walkTo(f,x,leave){f.wx=clamp(x,-720,720);f.leave=leave?1:0;f.hide=false}
function doAct(f,act){f.pers=0;f.ex='';f.em=act==='shock'?['!',0]:act==='tired'||act==='kneel'?['sweat',0]:act==='laugh'||act==='cheer'?['spark',0]:null;if(SC&&(act==='draw'||act==='aura'||act==='slash'||act==='shock'))SC.spd=act==='shock'?.7:1.1;const c=f.c,ring=()=>G.fx.push({type:'ring',t:0,life:.4,x:f.x,y:f.y-75,r0:14,r1:150,col:c.col,w:7});
 const pose=(pz,pers)=>{f.state='pose';f.pz=pz;f.pvx=0;f.st=0;f.pers=pers?1:0};
 switch(act){
 case'point':pose(L1B);break;case'cross':pose(GUARD,1);break;case'cheer':pose(RAISE);f.ex='happy';break;
 case'shock':pose(HURT);f.ex='hurt';shake(7);break;case'tired':pose(TIRED,1);f.ex='tired';break;case'sit':pose(SIT,1);break;
 case'kneel':f.state='kneel';f.st=0;f.pers=1;f.ex='tired';break;
 case'draw':pose(HA);f.ex='yell';ring();sfx('sw');break;
 case'slash':startMove(f,f.c.mv.L[0],null);break;
 case'jump':f.vy=-760;f.y=-1;f.state='air';f.st=0;sfx('jump');break;
 case'laugh':f.state='win';f.st=0;f.ex='happy';break;
 case'aura':pose(RAISE);f.ex='yell';for(let i=0;i<3;i++)G.fx.push({type:'ring',t:-i*.1,life:.5,x:f.x,y:f.y-75,r0:16,r1:200,col:i%2?c.col2:c.col,w:8});shake(14);G.flash=.3;sfx('ult');break;
 case'turn':f.face=-f.face;f.state='idle';break;
 case'step':{const o=nearest(f);if(o!==f&&Math.abs(o.x-f.x)>210)walkTo(f,f.x+(o.x>=f.x?1:-1)*60);else f.state='idle';break}
 case'back':{const o=nearest(f),nx=f.x-(o.x>=f.x?1:-1)*70;if(o!==f&&Math.abs(nx)<560&&Math.abs(o.x-f.x)<330)walkTo(f,nx);else f.state='idle';break}
 case'in':{const hx=f.hx;f.x=clamp(hx+(hx>=0?1:-1)*560,-720,720);walkTo(f,hx);break}
 case'out':walkTo(f,f.x>=0?720:-720,1);break;
 case'ent':f.x=f.hx;entrance(f);break;
 default:if(f.state!=='kneel'||!f.pers)f.state='idle'}}
/* Every cutscene is laid out to run three minutes: the written lines, a reaction shot after each one, and longer silent shots
   (scenery, walking, a stare-down and an exchange of blows before a fight) share out whatever time the lines leave. */
const VO={"1A":{"p":"4db1992010ac4cd08c8d129b2283d93a","c":"5f2b230799ea4c859f50a16a57471a48","t":[["e05a5e83b2994d0fbb477c765ca8e91d",6.78],["7e718684ae0e4c68bcb4ec8f684affb7",5.2],["3750fac758864081ad8bf2391cf9b4dd",3.9],["aefdfa5ca5c84ff5824112d371e2fb5f",3.58],["718815df1536423e8ae1f7a24a65e336",5.43],["a5d57a800bcd4586b3a1716b8598a3d8",2.55],["8b0163d2d0bd4c1682552438361a6e14",5.53],["342fd83e203e432b84f666f294bf3d9e",7.34],["e4c84be4a55c45d49719e3b2929e450f",5.2],["7128391460254d71a9bfcd250f5ef26d",3.16],["35f21e0623f34cf6aa9392c3bba489b9",6.18],["c2429da1caf44b25bf06fc6e8f786d7b",2.97]]},"2A":{"p":"82abf3b8a3c140afb6410046f042405d","c":"315df2d4b7b443499b151eef44dee252","t":[["ac24e48d06f3405889b5c20487633b58",3.39],["0a9f6ba24c554d0799fb35745b818578",4.88],["8dc8718723b640edb52e602123e4fa51",7.01],["2e6bb4495d6a4261a6d7910744d03b14",3.76],["5b3de4bfe5384fd5b68cfaec785d9796",7.94],["1c8507eb3a1149acb93120ad75b10b39",1.53],["07b55ae687454a38b858248160d61416",4.69],["50c758eff25e4e9cbbf0d1d4c3472312",4.46],["0f8accace9054e0c98741d419a6bcd54",6.92],["b3f46d8cbf684e7283dbab6b66915aa1",1.58],["07743290b712488ebfd06f828a50e4d6",4.83],["92f6c24f518841f5b441b4d1087841b8",2.65]]},"3A":{"p":"82abf3b8a3c140afb6410046f042405d","c":"7763e5bda13a4b69b8fa85b83f6b17a1","t":[["91c5c1317ee042689c2dc4a7f108fa3d",6.36],["ecfbe1b411604eff82f2b33db70fbc7a",5.9],["9bc558ebb00e462eb7888fb928662171",12.63],["faa3468a63524e9ebeb8e9914e708a38",2.41],["c60d1ec918434a15a157ae27f2da8d6a",10.77],["525df8cf0bd34b139f21778f498d4a8c",4.13],["0d5cc0f7f99a4ea28b516a97c4a7e88d",11.56],["35f68cb6849e4ea79136f75fedb887d8",2.6],["67668c1f867e46c28b57911594663cfd",11.19],["da7a99c2d1ab476d8583e9e6c934d591",5.34],["8ff5de7b1c574e59badfabb841549165",5.53],["7e7f4ffd85f14a80b06d9e58ae97ac2a",5.06]]},"4A":{"p":"82abf3b8a3c140afb6410046f042405d","c":"6b2845bd14b14937b436a4a0a7855f83","t":[["420c63ca567446fbae9e442c30c2d03c",4.46],["4f19bce37b994ec2838968d7d34de400",3.02],["c2bbe14b49af4f719e89811bf116d61f",4.32],["b8b684e64b6644d3b81551cb1e9faa85",0.98],["60df01a67ac248e19f26cd248eefcef8",5.34],["a74fb88739fd49fba57017853a20920f",5.99],["f9823c09cbff47209ecb38f506631bce",6.5],["ef454c81b57e45a085fd19ab7fe32e7a",8.17],["9674695fa34c408db2b2cad98e03a548",5.29],["2a6d8ab54bbb457f90a3cc2f7b29a642",6.64],["48ab4ff173954a298168fae146274de1",2.14],["93dea0857b0e4306a12cd438502647fa",5.9],["16e5de6757794b0db158df781db0702c",7.06]]},"5A":{"p":"82abf3b8a3c140afb6410046f042405d","c":"138d4ab0148942a481c51e16dffe846e","t":[["bb96f46be08a4348b9cc842b73c41d56",4.46],["23bb47813510416cb665fb85722ec71d",2.83],["26fd772961ea4cf0aabac9067d748906",9.85],["31f819f83cdd4539b888615c72de8e09",5.48],["241a32810a9341d5954683cba390bd5c",7.57],["d266d3000967489eb8ceba095daa5109",1.16],["a7c4338d0c4d48a0b2a1116c008ebb2f",8.17],["b0d08f87046d463aa7ed8a3958a684e0",7.48],["00203253ccdb4b7da59ce789c48cde49",5.15],["50d5e512810d4903940444cae58b3edf",2.88],["7815dcfd426b4db2839b6c14a8bd95b9",5.8],["fad4aa7f17664f938f7aeeff12fbbb3b",2.6]]},"6A":{"p":"82abf3b8a3c140afb6410046f042405d","c":"f38740c8db7d4d3bafd2d27aa6be2282","t":[["07aff3bf6ee9435eb1bb13ffe85b438e",7.34],["ea18935cbd424d44814f9ee9825dee08",3.67],["b70bba3d7ac94bb794a7b40a92b25473",6.87],["7ab6986fece84ddf8149880df38eacd3",3.16],["eedf6b411211487b9fe924222ad485a6",5.39],["099d08425bc9447a9cc106f2735a0035",4.97],["315005c5ee32489999418a914fd7f7d0",9.43],["1e7f2399a71d4321822c4bbe271c34a5",2.55],["3d95b531d4144dd78abcad809ba26a47",11.01],["0b6bd6c73aa14f058b4c79edb618ae3f",2.32],["4c4af67b174a4539b9e951694b7ceb88",7.38],["5bc5bf376f5742fc971304a4589c2fb9",5.29],["9a2edf8f8aa64b2eb54d16d29382c8b9",4.92],["0ffbf86c70ea4358a3e8038c4acb1be3",3.9]]},"7A":{"p":"82abf3b8a3c140afb6410046f042405d","c":"e4de8c5c1c3249ba975b4ba2db9e8323","t":[["d3dd564019d547e38f0205a66e10a3c1",3.07],["b00b98a59389441c9369fec25b4f4518",5.43],["35c439dbf7474407a31460c38030f5ad",8.22],["eb1d641a213349c29f4c25681bd25317",2.0],["cb5d0f6ee83d4b49ad286e2a273496a4",7.01],["6fea1077d11848beb3eaf9e6847d6e20",2.51],["e903e5b5bdeb45f78f3f7969e08c7cbf",6.59],["3da24c5388dc4433831ded184ff55308",1.07],["0ada6113d25c4c76aea964038f7e5c7c",7.94],["92478f40e15341f7955eb5b8de37f5d1",4.37],["7b2063562dd849ed9a6181c0142168ce",1.49]]},"8A":{"p":"82abf3b8a3c140afb6410046f042405d","c":"a63ea71964444ea7bd801bbe6e1009f7","t":[["06dee6c0cae34eb687e03defa9d3fb31",4.78],["10e50f8471ae48919bb2cca0cf4a14da",4.6],["2545982f91bc4ab78ad6311ece1b8bf6",9.71],["4b78c83644d140d48d082e3a6bf23321",1.35],["0a2fdb3d7c4846868e595ac2607944ca",1.39],["ecd17bf581c24a41bf3353fd23a9fd67",7.66],["d916ad9a08594d908eec8a4d5951d2c1",6.87],["ff2cc46fdb7e4521ac18b274f68fa2a0",5.71],["73c1c952958544c18d5f7b2e2ff0dfcd",7.29],["5c8cab740b0746039d7e2061af62c623",4.74],["32cc44a5df744e0fbb3219854f63343c",3.85]]},"9A":{"p":"82abf3b8a3c140afb6410046f042405d","c":"906107926bce47799f7db17211191da9","t":[["8677704b20d7437b991382938e3b4333",3.62],["b70175f7631249a993cf81b59585bd56",2.51],["5def09c2dad6466fa4f5da520ae81390",5.06],["f09472a7e0074a6e906d88724ac27e70",3.76],["dea2371f3acb4e3db74e12d07e46ad27",8.54],["1d02b268dfc340729714c61ae61223f4",4.78],["81a472dc64dd48318b02346a87e552a1",6.87],["98e8348fc78148f8801c92d50eb4bdfe",8.73],["3bb6d460088a4e72af9cac3178fda350",3.39],["aa2cb7f2a5234fa2b0bcb18a70ee5d7c",4.6],["345eb6b6e993476d879ded7a87bf12d8",1.95],["5aa583422a4f4b97840e1ef68b0ea521",6.73],["0608f3f729284593afa44ec9447ae881",2.79],["dd5ad8b2e10840cc956813db8cb804b3",8.03],["536c1752077b467dbf65212370a98fc7",2.65]]},"10A":{"p":"82abf3b8a3c140afb6410046f042405d","c":"44a665df26674e42b54e0e9324053c54","t":[["50010999eff041b182c7959e1705c0f5",4.83],["954ef9e68b9e4437a789734c689028c7",1.9],["d051c84b8e2b4267874ce290685029f8",5.25],["f17e7c4e37f944499e4188200391ce5d",7.99],["fe6d7009f109410e90f0abca91563a99",2.93],["8c502d6729cf4314acc97160c001c836",11.15],["74d7a391afba449196cf3b190cf7adf3",2.14],["8bd752a1acc54b7c856640dd4efa14e5",9.89],["d392e92620724d739db079af62b105bb",3.62],["14ce535aa4704f8d9e255b888f0a2296",6.04],["580b1df2d1e745b89bf079bd57da5545",2.83],["ddc506083f72473cbdd80acdbdf83e65",5.8]]},"10B":{"p":"82abf3b8a3c140afb6410046f042405d","c":"74be67b07d5948939f3e36c100ac9cf1","t":[["9aea2721a74c49309f87b1f8e71657b4",5.39],["094d8ceb6a1c4398b159e8d153c5aa88",6.13],["810c8c638cd0445785d0805ce37716c1",4.69],["19e416b4cb594d7ca71f17fdcaab4890",7.76],["8eada4b426ec410d8a3ce84523414ad9",1.72],["f1ebe1abfbb04073b065aab3785a8c71",7.99],["b07a778c383645f49a4dfb84cce7e0c9",7.99],["e2f75c4b2a02407ea8b9d0c6009349a5",2.88],["e5a2a0b5f70947d89dc733a5253c87c4",9.24],["86cadb8618244af98673f59c88f00bc8",7.71],["3bf0bebb5b994151992deccdf35b8772",7.38]]},"11A":{"p":"2fac5a3d3a754a02b2970b42b47e392e","c":"0eac1731174344f987288a8b921081d8","t":[["f0f8e587cc5b415caba54a1e2ff4e284",6.04],["58afc3c8af9d40a8a89be4ace16b711b",3.44],["7a8e4af557ba468baeaee9a2e3f76a76",3.9],["751e071d1e65447ba404c2a84341014b",4.5],["a810caef299443db8c140fcec75d59e3",1.58],["ba7a9e478e2d4c408d5cb5a4cceb5843",7.85],["fbcf0a62b3d54f47a0389645be06624f",4.13],["561ce9c6d6e34a628bb3334bb53bb2aa",4.46],["2b49641c843341bd859219054b791c5d",5.62],["21ef3f3951be4c0f9f5856e1b5bb952d",1.86],["788f9dbd47674a59bca48ca90b7db8f3",7.48],["e3adc0120e604f328097641b3b934073",7.11],["cfdbbcf32ae1477097cc30bbea7dbc57",3.99]]},"12A":{"p":"2fac5a3d3a754a02b2970b42b47e392e","c":"15bb7bbfbd5f416695d34e89d79aa194","t":[["41a69bf6f44f46ceb19e95d6d694c9d1",4.6],["28b1914f2c384bf893ec6269a7343fec",5.99],["fa0c88f4b1b940958be5805a53c1b91b",5.67],["1290bd2f585e4a3c82d0d3ac0862d2fd",3.44],["527cfda22670420ba2a1964c84dee6c9",4.27],["37c265e0ec6140e58ce0d7abf941dd59",2.09],["d931b3f70d1c41e7882631d9e2d80de8",7.29],["46b4bdb5d7ef479da095e8592809607a",2.14],["4b80d9772906404cb95f5cf872c1cc47",8.45],["d4ee5c2351ee43fa8c3669006313c4f6",4.55],["64c9f8fbae2241f0bd4ca937f529c7ad",1.9]]},"13A":{"p":"2fac5a3d3a754a02b2970b42b47e392e","c":"5f29a1a556024399b518e118afe27e0f","t":[["875c2b7b884346f1a3d33a32ff629931",4.04],["66cd84f010ae4d1f92a9885374c86b47",3.16],["8921adad0b3f4a959da6297875aef032",6.69],["61dc4055a1c94bf3913533132d65335f",5.02],["a5cc7705f71048a7860da1fa4d01f829",5.8],["814a56e1f7ed4e9d9d8d863770e35d44",1.25],["eaac1d4faad2453e93c02892f44fe37f",3.48],["3fa3790f28a64285892bba1af8a0a77c",4.5],["27d138a82d9e4700934f763f13f88b97",7.29],["1e2542f172cd4681b7d51a3b346e289d",2.65],["5b3eed5aa8e84b80bfdba26447f13322",3.3]]},"14A":{"p":"2fac5a3d3a754a02b2970b42b47e392e","c":"5bab63cd308344d6953ee93b072672b3","t":[["6ab08671d36a4e96a11b31cbb636d0b6",4.41],["426b21d92bc744f88c889edc04bdb2d0",1.49],["55d569c399354af9a7534a7530f21ceb",6.73],["fa772bb968d14608ae05700f35c2cc95",2.83],["0440246a74114e17b9d1492f4c4d4c5b",4.64],["d1c06d2dba34426da7fb536e95fc34af",7.66],["67887b0ad0f54bc79674e99943fd8d4d",3.53],["bcb9508142f04d678acc230b4cc72cb6",6.27],["e3d81e18459243daa71abe75a7eace91",4.23],["03394169412a484e83afb0380c0dfc78",2.79],["052adea31fb24253b2775aa96020f580",7.01],["762fd64366b44541b5a1af66402e6886",2.97],["e73f006964f74da0a9f0a49ba3a84852",2.6]]},"15A":{"p":"2fac5a3d3a754a02b2970b42b47e392e","c":"e758345717f34c18bb6f72cdc854514f","t":[["613b40522b6040eead54e4bf43714405",3.67],["d79f93ba95c348618c8f7959b66ec63f",7.15],["09629eae22014a23b7677d5ad2b49755",5.48],["cf464e3e9da8460bad77c7104b95f249",4.18],["87051f8d902149caa9467ceb76b0fb09",4.27],["d116881b7ddd4825a6cb9b0e255c71d5",7.06],["2399c6f583054b7b8ac194d59f40a7c6",2.37],["3714bfe270cd4189b87fedeb2af9a4a4",6.97],["b274db6518464da284cb9d6de84cb0c3",0.88],["df9b2dcb17a246cf9f1889b6590e0a8d",7.99],["ff8fbb9fe28f4cf5af840f86b70b23f5",1.35]]},"16A":{"p":"2fac5a3d3a754a02b2970b42b47e392e","c":"d1d0377a379a480eada1fb7488506bea","t":[["324775180dcd4d9094a7b7eeab2a2a47",4.13],["a963a75dbf094790ab8a7afee76732df",6.64],["125bbeacb491480c87384dc4c0dacc65",3.16],["b3a7d3a8813542988f1fd20cd6ba1531",3.62],["bd0d0aed80ef41a193b854a8124d53de",5.06],["9a698d2db4754017ac6d135f06a191b9",2.0],["5eccb2ade17e43ca910668349d84f978",6.22],["83e54502d1f9488bba0cd0160e4e30c4",5.2],["8ca0b6f9dfcb4158ae6ac63a0582a74f",7.34],["68860c69062745108d1568a8b16812dc",7.94],["a754d5bc4c594cd2804ff03b533a1650",8.17],["b7d782d2dcd547148bd3ded5f8706582",1.81],["47f6824c9ef64ad0a5e1405847993a76",10.36],["753b71f95ef74db89ebdb2ed29c6b662",5.06]]},"17A":{"p":"2fac5a3d3a754a02b2970b42b47e392e","c":"c5fbfdbf9018487a96993f1ee4e8269d","t":[["23ab7d9fcdea44c6acddf228d3fe29a5",2.83],["ef4e03fb347c449aa506e4a9c06af33d",4.37],["f681541c8c194facb468c1ee015671be",2.69],["6539874faf9e43c4a807f60895df3ffb",6.97],["add03d71817e4e558598b1111d4bb54b",1.72],["afeb813f029a48c0a31439537c3a7164",6.97],["094cd1ebd4ee4fcd8eaf73697335d1ff",3.67],["6f8217d22d5a4697b495babf69cad9cd",4.55],["f2990f017b284f46af97ddde1d18dc51",6.55],["1101c8fdf49c42a7b82ab101147d60b6",1.63],["dd1c4bef878a4de6ad1cd8ef0a11355a",6.04],["a4d208d8cc5144b9baef8c9e43defe27",3.25]]},"18A":{"p":"2fac5a3d3a754a02b2970b42b47e392e","c":"5ac731e4b5554b20a256f66f7b3606f3","t":[["b1abc3e0747143e6b5d52085253b6378",5.15],["ad74f0194cde4200b2eb96018cc84704",3.9],["b60037ec253147db81c22dd2b4a97e4c",8.17],["b7ed75ac4d7f4ba7b3f5b98cdb8fa32b",3.67],["825985da5c9e4d038215c6a6be61bd4f",5.76],["6558b392078f4e5e8c0c53da78f438a5",2.37],["fb9280492dbb4cfd9199a53b1324fe7d",7.71],["3a680a1332b9451986a9887045e20434",5.11],["8d01446e9cd546438375b27771c03e98",6.5],["e28a4087f53d4b89a5c34fa9a95d3ad5",2.09],["04fde735be984516bacd97f982796b3a",6.13],["387a0906c1634d37bd10a8bf0cebf1d4",1.63]]},"19A":{"p":"2fac5a3d3a754a02b2970b42b47e392e","c":"1b69c09f9f3446cf8ac0684ed1b7f99b","t":[["624416d05d054c87a20e52d57264b99d",3.62],["5f8151b7009f41919e348a24935ed677",3.58],["86ce9241db1d45feb84bee80b1b0f6cb",1.81],["917f975be8164da8aa5d4061de09637c",7.8],["93c15da7301148fea5ae6a492702ee9f",4.92],["26a83c62f7474d9797d173d7afa70c68",6.27],["e6770be8f3794fb9aad82a5329045977",4.23],["d5ae57d6f23e43039656f70c4529e1ac",9.43],["dbbe767908504edbb4f9aa53c73a5233",1.86],["3b27fa7d14654e459e10896621e08613",4.46],["e51311486c3a4f8bbf50237ed43a68ca",3.85],["ca74cd85ea0f42528e95365f4c6bbefe",7.48],["3aa5d9e6b2414bfeb19e6b463909f14b",4.27],["daf73151c95047bba196c85741f998f4",4.69]]},"20A":{"p":"2fac5a3d3a754a02b2970b42b47e392e","c":"08106fc6369348b5b6e1e0b1df4e7d8f","t":[["81a60a04ecf64392bdd6a1f0e2bb8332",4.55],["fe086424f07244eda8675fb68f8fc2d9",1.39],["b471b0cc1b514b39b7a99f9b1b39a01a",7.43],["8498e5c6f51c4984a5456aae65a749b1",4.92],["63a3899604f346929c665f759bc43458",8.08],["165f5915ff3c4342bf837699f4a255a4",3.07],["5c74b1e490a94c568c75a01b2393f1eb",3.02],["2394c62504964dc4993a8f99b7338d8f",6.5],["d15def5ae4514e9d92811bce769c6a6d",1.3],["03b67d367b0b48b98bccb9a6b0eeec82",3.9],["9b18a5b1a217499090a00ea377e343df",6.69],["b604565e8fb447c08804c34234b6d399",3.72]]},"20B":{"p":"2fac5a3d3a754a02b2970b42b47e392e","c":"5e09db6585dc445980b09dd344c2bdac","t":[["15ff13a72f53435bbc89eb6bbb09c660",6.64],["08779012ebbb4e2a9eb4fdf08a58d057",5.62],["337ee983c9714066833dbf5bee1de603",3.72],["1d6b3957a5144c37828231b56f942043",2.41],["99c926deb42f4006bed9816fcc11bfdf",6.18],["6010c0505ff24154b9535171754dcfbb",8.13],["9131b04d683b4891a1cf20e084b59e30",5.99],["a1a80b3c3c1e4430bbd9415b5b3095ea",6.83],["889e31c704894a739464d876c8b320ec",3.99],["0f24e487422b4957a7e2231eb0847aa4",7.01],["94e18a46be11423491e04a30d2552e62",5.76],["0b06e198d09e449881d0a05f9d28e206",4.41]]},"21A":{"p":"2fac5a3d3a754a02b2970b42b47e392e","c":"b68ba498cba34683a762ccf8b2747aaa","t":[["79e09f4736794af7b4b0ff2eae36fd6d",5.9],["c6e7ccad75c44d41aa4f8f06de399b59",3.85],["55231cb04b134a9eb18e0b9bbd00e70b",2.6],["02f29c26a091410cb9b16b04ca577eb6",4.5],["fceffd90142649568660134d4a7bf957",3.95],["3f54f2257b674bf29ae3cddc0e615273",9.01],["507ad36ab2504e838cef909f0a4e7296",2.28],["4efc37b8289740d4acae486de124d83e",7.24],["66c55d6e0d564e2099dc7199cc3d2a5b",2.23],["366e0c7fdd094d36b7be072990008b5c",6.64],["9b4ba44744a049f190d26e42a9b3c1e6",3.3],["5e288ff8a48f4e03933865a4c351b5ac",6.27],["60ddf6d2b28843f3b8ca9e452ab26b6a",5.9]]},"22A":{"p":"2fac5a3d3a754a02b2970b42b47e392e","c":"2ec4d392500b4a6d9a60ec391512fc0d","t":[["7b439f15ebb04e339b72b5f03aad8a6d",5.94],["7e50dee4d77b4bfcb00ab6d633e8af5c",4.04],["be93a8072f25491794555519f9ffd1ae",3.95],["09ce576f206e45b3a776a6cc47ec2559",2.28],["a57536a23f6a4815869bbce8082247e0",11.33],["3746400f27d846d4b61b64ff52f1b259",7.94],["993266d8c5374415914823018f860efe",8.68],["9b88fda1cdcd42029b695d7a0c432466",1.16],["21b96530c6e940958ac703ef78968f15",8.59],["ea8e829334f1448fac3a1c40a917269c",2.37],["4f1540e0aa2a4f969238806cb8ed524e",3.53],["7d21aa4c4988492a9f6b6acb0442e67d",1.39]]},"23A":{"p":"2fac5a3d3a754a02b2970b42b47e392e","c":"a743646d9bc34ccfbb53a04a304d38d2","t":[["7515de721f454486bae0d17af22437c9",4.09],["6fc8c59cacfe4febac1b726ab934a33b",3.81],["442fb51504b14e11ae79841b2a8c6f42",3.9],["631b90d3ab844a749a2b59e99f7f0ddd",2.65],["b710e34a2854446c80b34d0b86d9d8d6",8.36],["2812f180e1014354bb329555f4041186",3.2],["8dba0ec2a6e84073826a7838866e53d3",4.04],["9e5ddc32a75b4ab18139e8c06742f942",3.11],["8b7766ed7e7845359fde5e6f05a84d71",7.01],["9777e5ff56f64276911a9c9e5160a037",2.09],["369743b495f042a1a8d48bf0d1600d6f",3.99],["f745d270c6a841c69f041dca4496ef8c",3.25]]},"24A":{"p":"2fac5a3d3a754a02b2970b42b47e392e","c":"7d39cb870c7b47a7941405433614079d","t":[["b402d80e1e094a3798c6a082860e0d95",6.41],["8dd5ea99cdce4338a677923c5087d6d1",1.81],["819fd13287c74445b0301e1f2583299c",3.25],["29e73925779547e1bb5d5f48f2d2960e",2.83],["8762e30d80e34efe8b1dfb8e1c16d257",7.71],["6b3c51a1b623491d8c9c25295fed1980",13.0],["753c24ff3502493bb45659d250ce8edb",6.55],["46ba7ca3a1524a15bb792660f34b532e",6.64],["041d24c441b54751bbc82d653b778e3f",2.41],["5212eafeb264424caf3422088a72748a",9.06],["aab55abddca04e4aa1d3dde1bd071e7b",2.6],["f3f01d2d5aa54c05a29538702ccd4ee7",6.92]]},"25A":{"p":"e61fa1bb2ba64643b84e0cde40aa3e78","c":"7e11b7b8c30c415996a6634378ca4e97","t":[["ce927d7b76f942e38b647016372532c3",4.64],["17b2d87e6f1f453baedfd14279bbe0a5",4.13],["40ec599afa9444f3874f68f5293ac6c6",5.15],["267feb28e9ee4694b4898bfca75f469a",4.83],["ea3ebe02a4de4d0d996f660cbc498e2e",8.08],["3701a11e01d2497593f72114277fbe60",2.0],["e9faefcf4fdf45cab905ed4c784f1693",10.08],["26f3acb193aa4664ab7841db993bca24",2.51],["c45f4e1039d64405851398fd42452406",7.48],["e107ba7200294c9eb6dbc05f6cecc2b1",2.18],["aa0f670b7fdd4e349987afeb245a0c71",6.64],["1c2f3799411a4b98b684791d5b0f4d9f",3.16]]},"26A":{"p":"e61fa1bb2ba64643b84e0cde40aa3e78","c":"69748ed544484385bd9b3f4f6ae1ba23","t":[["ec33aa2f64ea452994638aa85335bb7d",2.04],["b492f1047ca24a4b85d604dcf216900b",2.18],["75a71e08917c4844a34caeaaefcde97b",5.29],["054373e5cfec425e80dcf4f4d636f56c",3.25],["d3ba3b9f38734e5280c2a5bc92fab040",3.67],["936db968e1d4481d99070d8745fc2fb8",3.99],["96aa1feabaac4e36a2ed247543142e45",4.92],["8e171cd91acf4eaf98de52957530b020",0.93],["cb053184930b4a0ea4b70661c4400066",9.8],["517bba1c21964d5f8ec33127a326f0cf",5.8],["14b20ff7ca1f4a1ab40143e28566dad1",5.57],["65701f3cd98e4cf3a3de537e882fec70",2.69]]},"27A":{"p":"e61fa1bb2ba64643b84e0cde40aa3e78","c":"af59e2af8f374bb1b58522d3fa758d98","t":[["60fdb587dc8d47dbb4307ee73d340102",3.76],["35a2c0e7dd9247f48e74ddd7a26e3965",2.74],["4ddec8aec4e942d690359bead086d809",8.5],["f6bde1a4f0824ed0b20b3306f50129b4",6.22],["88d73291e3b446c98d3b12de06d22b63",2.04],["2d33e08fe0b44bbd9f80a5166cd759a3",7.99],["349ebfb27e2f4b2b83ab960547f47c8f",3.07],["757fb941bf314ea5a77e6f3a80391c36",2.83],["48d8ea8e147e4f97b98a552f7ed48937",4.78],["85228059aed3496d97aeb201a57bb332",2.88],["fb97a3271a294068a305fbb05e70abd7",3.9]]},"28A":{"p":"e61fa1bb2ba64643b84e0cde40aa3e78","c":"7cfd535119da44179b47abc86e55fc1e","t":[["451f4a75ec4f41fd98353460caf1d434",2.04],["1af3efd9c27543d199a4edf02d9b28ee",2.97],["fedc3361ec3d44a8a864dd623993cafb",0.56],["d780a1c030044bdf8068b9b66c1df1d7",7.34],["e51da6ad09914ab2b5f3bb0179fbcb15",0.88],["b3e28d6a2d274c24b8aa94fd1b0e66b2",3.53],["8f694741bff84a23832e69022013fc9f",2.18],["97d3efe87a0343e5bd9a226c26beae39",4.78],["b1ccb81a9c2d44bd9832930301ad4163",3.81],["1c445b1f576d4f97a9fcb405d6c11863",2.18],["90547a7fb3904a1ca22fc1aafc6312ee",4.92],["783fe8f2b6804d0c87dfbb9b59f37dcf",2.0]]},"29A":{"p":"e61fa1bb2ba64643b84e0cde40aa3e78","c":"5dc16538c9754b4ba92a99bb166ee2bf","t":[["1426000ac8ef485dbb953ffd0b164cf2",3.53],["a5bcd710b09c4899a611401ba67c9bc4",2.97],["e943783dc5ed45ed8c4ed28a377e21b1",4.13],["0eb1fb32d74645df81b1a7a9a6fcd73d",4.04],["46556aefd589486dbd175b081a9dc50b",1.67],["ef3cd42034924a078f06ee3d5de2f816",7.62],["5e1cab07ea984f8998cd871d74eb9318",1.76],["3b4c6e89c8e04332b2f739363b429c73",9.24],["e4d34af3f1bf4a459c6c27cd71470b10",6.46],["327b3380b84c4e73bb827399548f4f0c",9.43],["18f9c7e4732d469980ae8598eb78e3f5",2.14],["fae8c7d57f18451981a4dc362f35d01b",3.72]]},"30A":{"p":"e61fa1bb2ba64643b84e0cde40aa3e78","c":"84c37a4678b148f7944462475ef30fad","t":[["c308916ae0854324a2d5923ce2f96a1e",2.6],["91574204bfbd4c888b2869f237665d15",6.55],["2ed60b07c6374f22856f51e5978347cb",6.04],["27cb12df6099457c92c2f3a0963b1d38",1.95],["e6fb69c5a93d478daa4b76de789cb7b9",6.46],["a579a6a46e0244dfaa2328460f637327",4.18],["1624f4ae93c64cfd9725540073258939",6.83],["185ac14168b340729ce9859918724130",4.18],["6427d95bbfe14ea59c4700c7db5b8178",5.39],["0235685cf34746929185d2a0dc9bc5bc",3.81],["c4c50ccf04c642029d6fe1834c440f32",2.46]]},"30B":{"p":"e61fa1bb2ba64643b84e0cde40aa3e78","c":"8d65f43148894b6a8eeee7860d4d54f1","t":[["813d34c857734c3ba167008519d66766",4.97],["1819ee15e7144f6bbe321183e5ffc5aa",4.88],["b5665c3b032e455a87e16f92ea891e46",9.75],["962cdc89a73844d792f71faaaa363fc3",3.44],["a54f2487724d440e8f2426d84daba4f9",5.43],["ec0afc36ecb74ba0b48f8db812d04d74",4.64],["19bb11ee81b44b488e9f0efe4081c408",7.89],["6f058a7f8e7c41919978bd15d7e40538",5.02],["d86565fb51604d4194f64a5e1499c6db",10.36],["040456f4fa2d4502b2b81bc6e7cff5ef",5.8],["80b448b6fd934d599750e405a4495589",4.13],["b229d9480baf4ebcbc5fc22f3c1c2ac5",3.81]]},"31A":{"p":"e61fa1bb2ba64643b84e0cde40aa3e78","c":"c4076c9842064f6f8e909dfc536f9c0e","t":[["75517eb73e354abdbc17b8ed7867e8bd",6.08],["f2d727a95887438c98d0f084bab3fa1b",2.97],["fd43a1cb9b1245beaab477774b710a7c",7.85],["0c4e424392454bcaaac2ae47d41d1299",2.37],["8cc2b9afaa0540db844b1106963a9a6f",1.67],["0f1359e0a65a4ff2bce8920ff68087c2",9.01],["32785ca4600a4b6cbc4856f775b331e0",2.51],["b6fccb759f754b06a3254150bf90d549",6.46],["c865b65584d844109872a31fe1b8c55b",4.6],["93bac1d9a977430e90cdd95bbc739be7",1.9],["747a1a45419d4036adbfd0276c34c664",9.1],["a7229c24383b44c6b7269e26f21cedad",3.07],["c6f84c902a0c49158ef74c857bbebd29",5.71]]},"32A":{"p":"e61fa1bb2ba64643b84e0cde40aa3e78","c":"6b654a0e295b44878dd0b878e1c3942a","t":[["abf9d35a7a76451daa402d1a4c384b03",4.18],["606ca677ddb149ad8579643cf11a7301",4.27],["7e2f525d2766461b84c7b1178a9c2cb0",7.76],["0b98223731a44e01b5c7ac0c4b47c5fb",1.9],["f9a3d6dd62994973911fe35c58cd3f1e",6.97],["16d8ae711a104b16a783bf15ad8c130f",3.58],["249cc37820494c78a60dd61142050d0b",4.37],["95e724c6d0f945fcabb3f01ccf25b5d4",7.01],["8946f8095bf3457d9808a4b517813da8",7.66],["80cc1d9717bd47968f801c15cc0c82db",2.46],["bfbe4f8e57874f1fa263107498daf0b5",7.15],["f3d08ef60c4843829f4d11a75bf17517",2.6]]},"33A":{"p":"e61fa1bb2ba64643b84e0cde40aa3e78","c":"d6355e63512a435ea1105ba60588474d","t":[["356c3553e1df4bed8d948a842e3e6dd2",5.53],["eed70078ba3c4e8fafcfec48f63cb464",4.13],["b78449a3dc5d42fb9291e1d865a06196",7.99],["d8599abe8aa34cb6a335821b8b4381dd",1.35],["58f53395708f40c98251217420c29437",5.85],["aaa10277a8ab46be8539ae5a82e6fbc8",5.02],["34c1a9bb62744c07af234a26ff082f4b",7.71],["1e2d0cd7e11644afa16804b9bb9faade",3.34],["80ef33c695564fd7a3c68eaaf34df61e",6.13],["83dd1b9944d8499e9275dca8f2f7556d",3.58],["48dbf976041148619cce54f2cb279c38",6.41],["a4a058612b2f4ca1a1c43a902db60b2c",2.23]]},"34A":{"p":"e61fa1bb2ba64643b84e0cde40aa3e78","c":"3a144b2ddb7843f199e34cab540af1e9","t":[["a3cfd2c0f7db4604b087615d37dfd0e8",3.02],["48a64642419e45a7bca82ac867828f42",4.04],["7829d122e869403a9ff7fec979b33650",6.64],["f58a4e6a531c4ae6a1ad82c9de091171",2.79],["20451cb43ca74505b12cbf1ece89777c",2.14],["6e65bc5cd27246038e4d012f32e5a307",3.85],["ecde5a9ff5e14b8cab5c99ae16626cb9",7.66],["c17abd5eb60a43f8ad9f39e5100334df",3.9],["aee0bacfb8894b9881c32d725a3943b3",8.92],["952aae97ef7249c3ba14e7818b8ab316",2.23],["f1bfc666b0854b89a1c6b60521220ad9",11.19],["3ce456dd8f9849df844a9af1e5f4e2d8",5.9]]},"35A":{"p":"e61fa1bb2ba64643b84e0cde40aa3e78","c":"8632364adcc641cca57670610aca3ced","t":[["9058d13da16d4da68a688f396f40deae",4.55],["f321097a857146b085a9f7e5631d3060",5.02],["515393da5b8c4cfebe62319ef3221947",4.78],["84f6607a525d48298c5e110f4e5246e6",2.83],["62364ddd8b0b414987dba54b360d1300",8.92],["bf0ae07d6e654e16b9d6756dfea2aead",5.8],["4b03ad3285a94e249b97119ccd29cee4",6.22],["828d6488923745de8ac406a4e6adb9a7",2.04],["e1abc1f67c374fcfbddd8b4d48d5f7f9",7.99],["be2d502566a348bdb1706d3da1094cb5",2.65],["68a85fd20ff140f5947f55f494555e42",4.27],["dce1f4ff9af541f2b21cd99aff01aa79",2.6]]},"36A":{"p":"e61fa1bb2ba64643b84e0cde40aa3e78","c":"ebe12a44163f4a47babca22d8fb4f9ac","t":[["a0f8a23ab5024af7be116e78ee4eabb3",4.5],["d21ad087335f41a1bbc46c2d98cd3f2a",4.83],["2c9d24f76ae34a1b8ff7d2c1569bda72",3.3],["b81d021b4e7d4d6d8fa85f437daee279",3.76],["b5f1c8517f1c49c486f722296d10c353",2.18],["c001ddc4b0614a86840b6f84101ad784",5.85],["f7dc56d0f9c14b119ffdb14e8ab4c1e1",2.28],["e0f69cb4f0d04b4aa5306e49e5eff211",7.62],["ddba53733917430c9ac1b0a2f37a8369",4.46],["2a80e228c2c54b228fcb2d8ba385db28",10.45],["0513f22401f04553912f47759678d770",1.86],["9f61c9f53e9d481898ba6e9a007feecd",3.53]]},"37A":{"p":"e61fa1bb2ba64643b84e0cde40aa3e78","c":"145c364a637e43b8b987efddd4dfe3e1","t":[["1f2755702999415ba74ad6acc6f39d19",2.28],["f369e374184141528e7f62ca90558751",8.96],["a3344bf7e7a444c9896de652f66a606b",1.63],["78c572c5351843fe9205dcfc317fa40b",9.52],["75df9c5ce14840bbb4045a62d5407ba6",8.03],["7f829acbe1a54977bc0f92782b5c4d09",2.97],["f520d9eac7b04d4b98c9b794d433227b",7.66],["eebb0c7c43ab44dbbbfb5af703276e23",7.15],["488d061bf531494d9d80a7f6c4839695",1.58],["6dc25e6922e84691a7e3622faf8f5615",6.27],["b5ee96d00cf94d748e9fbb11c62df6d0",1.86]]},"38A":{"p":"e61fa1bb2ba64643b84e0cde40aa3e78","c":"2a1c8264b3874d41a945fc9fb9f3006d","t":[["a85d89a5981a4e16a5436b8533573f4c",3.44],["57634b39d191415caa61c801f5a15995",3.99],["125dc19e4ea24cbea8645e9b38cf8971",5.29],["e461a961f4f04e11bbd5ab7af66fc9fa",3.34],["795c9cbd328444e992e54caea7ffca67",6.92],["b80d5cb15b31400e9b6155fcf7cc1890",4.37],["5d8e7da42249410bb20d7e380261a5f0",6.27],["fc47892b249f40c3b739491a9425b918",7.85],["5b3b6ebd99864c0d921e81955cd1b7b0",2.79],["3a0ed5bb84c84931a498167f3f473c91",4.55],["726c766564814b23ba3312f783620446",3.76]]},"39A":{"p":"e61fa1bb2ba64643b84e0cde40aa3e78","c":"19630941720a4a9ba0b80cdc9880ff18","t":[["8a0acb608cf04e56a161df9306e2c411",4.5],["0142baffc58d4c7388cf1be5e4477b27",4.69],["6ecc4500154a4d21b0d2a5a3eca6d5e1",1.76],["c965ce5311e14bdc95a2375abe47808e",2.28],["c98ddea4c1424562bdc610ff4cc6d90d",6.64],["070a962027b5457db8bf96d8f206ebac",5.25],["91a19a510865426089f2fe467e66cbb7",7.57],["927a49f017884a1c9022d2b3e1529be5",4.83],["7a5f715a33b849cb852c7f4aa0ddf6ed",3.58],["55bec0a42fc249a59ec1b048add0fd4d",7.24]]},"40A":{"p":"45e182003dce400088bc7ba66f8bcae1","c":"f842fa1364c04f188b5d8617148038cb","t":[["ade69a6865f944bf86f6126c0693463e",6.87],["3561da4b7df64502af7c69b4af07ef03",2.14],["f5b33d7f6c69478db2b00296d74bb68e",5.06],["f5a81eaa3e094a80aa9486170f6529ad",5.67],["58f849dc2e6a4132a0f23d7f1659bac9",2.97],["d64ef31c4b904e81a4ce34b1591bb08b",11.15],["5d6f72ee1fee48458371b2237c7f2a71",1.72],["9796382b6dc44b5b8a3ab9dbc363116e",7.71],["d07ce542b49d4973a2582d6cdb3e973d",1.63],["ad89df4ae04a425caac394a4a268abdf",11.05],["6c3048fb24df4e87a540ab2f0da171ed",0.7],["0e91069d383d44dcad1e86dd6755d0e0",5.43],["7893f4ef38084e00807ead45587bb70b",6.04]]},"40B":{"p":"45e182003dce400088bc7ba66f8bcae1","c":"571a7164c7b3401f9337bc1f10fcaba8","t":[["ab725ff10d994f1bbd382dc9304df7c2",5.43],["cf8002ddca2a4f62a3af8ba9af7311eb",3.99],["1dca5dda51e044c4a4db8212114d9f6a",4.6],["bea3259e74ac46dc9f37c22b5091951c",8.03],["dd3b596e40c24ecd903ef13caaf62630",7.2],["8168680fee1843e48cac7a052b79a3b1",4.41],["e5c7501d63e848338bea4630c1d1be96",6.97],["ed3c76dc468c46a79aa727f835628924",1.02],["be4551b7f65247448c4b1052b8a103d7",9.33],["372dbe036a5f47ea8d611c69395f654e",5.53],["135b0096e3f34ddca56c2391eab5dfd4",6.04]]},"41A":{"p":"45e182003dce400088bc7ba66f8bcae1","c":"dd5de633b55c40d4bd3c2a7d847b224e","t":[["2b1afaddc64444398abc7900a0bebf4d",4.74],["24d5e454443d43d6b3ca25aab156ec6a",3.34],["587d96b19ee048518220494a22696179",4.64],["9634efc115c540b69be741d803d41bd3",5.53],["78a3357385bd4b06ba34ef518d02faeb",1.02],["13498f3904bd42e6814a52dffe48be2f",3.85],["3219d9fd97624332b5fb2d6f8740c993",4.5],["cff84581101d462fb004d78bab9ec018",2.6],["b5621a455d8a4b3a83472e696a38b6d4",7.01],["87b30bc9b0e344038e29e9a11b5425ad",3.3],["73086dcdc95746e6b5d07b2d8f9a6279",5.76],["00c0a9e39c32408396ea0d18ff43f2fb",6.32],["b945a2fc092b4021af39b970de4f3817",3.67]]},"42A":{"p":"45e182003dce400088bc7ba66f8bcae1","c":"7bcf8e63b9f2446a99744506469570a4","t":[["f8f68013a477409899c9946de8d15dbb",5.02],["fd55a5c590334375a2260d36406920e1",3.48],["49864e2a6f7b4bfe86f9ddf6987843ce",7.48],["dac53bbc570745e0bb2ea3ebbcf6fafb",5.15],["0343387d887c4e89a199366ff1cf6b2a",6.64],["07da588579e04b20a61d66ab867beaae",1.49],["7ad103d8e97c4c6ba4fc93d89e985c6c",8.13],["8bc3ea7750e14f2d9cbaa6d3a68cf174",1.3],["9b02de40a27240da952776e3b9d86caa",8.82],["54fe0225dcc544589906da3160197cc4",1.86],["62147e9b3ab940c48c3a762bd73d7397",2.93],["d0b8a5f618a848288a5fddc806b836e7",2.65]]},"43A":{"p":"45e182003dce400088bc7ba66f8bcae1","c":"f421db40cc674b11aedcbcc8b665c601","t":[["ea46496a1ede4341a6759cf9a693de02",3.44],["7748a9d914cc4df782ded9377a41bc7c",3.48],["044411e70c7a4d759e08c8c776a9d2e3",8.82],["07d615f050be4dd189c4abd18789ad72",2.18],["ee6586e1a7194a959090a4bb73f227a4",5.15],["4fa069caf58a4b89bc7ae91c4d94532e",1.76],["3fb7b9999bf54e519a82e0aa7b43138b",7.48],["44b3ba636ebd492c9f0bd3f6e7908a16",3.85],["7092fe0bb4e54715b7e7bc38bb04d23d",5.8],["b783b8a7455e494b9bc0e88c4b397a75",3.95],["1efa5216c2f9489ab2118de470f8b9df",4.88],["6a35c781ae934b9dbb3c45de1e37bb76",2.14]]},"44A":{"p":"45e182003dce400088bc7ba66f8bcae1","c":"cd465503e1634e4ca845ed66fc01313c","t":[["b21f85f3bf9644b9ad1e649d9e5a9ade",6.22],["f9f14f82012e4c318f7fd442b72530cd",1.86],["2a54675e1f5747d5934f20674e85b7a7",5.57],["cb3302d5285a440496e488ea069fe181",2.74],["1573f57e685b4249acf2cd49f8ed5dd3",1.07],["23ca69e07aa940f2bd6b4a6963559509",9.06],["f5e9bad1eac04817b4d573637d70688f",1.49],["07fe0849b630489eb1ba1907225093a3",5.76],["9e2d3bf7d00b4294abe611a2efa8c29b",1.39],["a27df0f5858e428c9b028ec019b2ebb2",6.18],["3e495f7c983544eab970aa24a245a486",3.34],["06eba5affa534217aa37f1458170894a",2.93]]},"45A":{"p":"45e182003dce400088bc7ba66f8bcae1","c":"6ac224d70a9045598b170dcbf7321c89","t":[["d11e5448e34f4d9fa888be72b261b903",3.95],["0109b0bcf4d040b9adac872ecc83c6c9",7.29],["905c10fe7a9a4c06ab973b63bd671ff9",2.28],["1ee1e9999c004cb0a56115f5b985a61d",8.41],["63574a1ccd8f4667bf5851938598ecdd",3.16],["5dedf6aa241d42e5938903676684eb29",5.94],["9038390975af4d85ac3ccbe786bc6346",3.11],["3cdebe1f74704b5c987aadb4cb2a9840",7.89],["c4daad116cc34e188c922f9bff6bf4b4",5.85],["3558a9c061b74d5092bf52c26380d4c9",7.38],["b1da7c78d4bd46a7bf7ed8a6dcd69819",4.5]]},"46A":{"p":"45e182003dce400088bc7ba66f8bcae1","c":"d46e095c0b754170b6c22e89cf71c8d9","t":[["7365a5c2d9214612acc0f09b78a4824a",3.62],["8af4356b5ef043c591583ab7361499e6",1.02],["c7b8e19e9a074971b1c5a9b5e1b1f72e",7.62],["3405f01a0d7b4aa7ab1b64cdbbc9a9da",1.9],["d6c50b26562e4276b58ed11a925350db",4.74],["668eefde4b19442bb5b003257ecc5529",5.02],["d0d2a3d58494407cb0a73933807ac287",2.0],["377715bb48ed4c8b8ddcac34bb954be6",9.89],["6bac1bb4bc2945d29150673d5a85b337",2.46],["f4ed9f8c03ef4ed59a63830ee0e92ab6",8.17],["313330bff2124ad3b8099f716e5d1f54",3.58],["abefa52ca4674ce1810b3efe5da72369",6.64]]},"47A":{"p":"45e182003dce400088bc7ba66f8bcae1","c":"96347af98f714fa383902be5c8a4c248","t":[["8b2fdec4ce6143968200379ac14a845c",3.25],["241127a0f5d74e0c8e51ac854dcfde53",5.53],["8bb207dd6e994eb89a97e8174f696566",7.85],["be5a3f8777664ed2bbdebd2a7ca2ae5c",1.53],["02a8a233e0664c8a90524b24f92f3001",7.52],["d1a24052ae714b70a866efd247b027c5",3.95],["abd58f512a9a41aeafe428fcbd5b34ea",2.65],["444cb9991e9943a7990e2c264d47dcba",6.59],["e94ed486e7b04ad2b1cde9845dbd7d01",6.08],["d1283d4d73f3447da94cccfbf67898e5",2.65],["33e47593119b4d7c9691ca17c51eda9a",2.23]]},"48A":{"p":"45e182003dce400088bc7ba66f8bcae1","c":"e1c2f60ab8ac472594c4245096ef4c1c","t":[["f9b91d329ad1454b93bbab8e1b1bfcd1",3.95],["032768cccb404ba2b733e5c62e8af516",4.18],["6f3a7c254194412a85c957f0a447bfa6",4.88],["b9d2737d11434a3e8094b1a807182c71",5.62],["6a1d840546da47c591a733ea50da169f",2.28],["47c58a5747404113969aa1505785c30e",7.38],["b2880e52df184fb8aa0aca4b3ea9b8a3",4.64],["39d2a2f73c0b4333868b2436cf3126a3",1.81],["9a9222d7c5204faabf7ee4e55d0fded5",2.88],["f647e6b4bc654b9b835b860bbf278f3b",8.59],["1c206f16a52f431fa3cdc992b0e323d1",4.32]]},"49A":{"p":"45e182003dce400088bc7ba66f8bcae1","c":"d337ae7a394c440180749ce5b6fdba25","t":[["dea0bc82eb8a4b71a5f612a89c44ecd1",5.62],["a70cc95230e44e5ea45e8ba71c22db9a",5.29],["d6cdc9b04947468d962f50a6fd8a96cc",0.79],["e20c418cf4154589afa890ae3ac9928e",7.06],["74d9a34356e94c88bde4a1ea27b1ddfc",1.21],["00212025193041d5a0d3b5c951982a19",5.57],["76f99c63c92142839ec563cbd97ebc68",6.13],["2aa392ecd7d94590a4abd92099e665c0",9.24],["f57b6c5730f64529ab96da7366032451",3.11],["e199c33472ef4391995c1365d300f034",3.58],["57eddc273b724192b25d8ef82ace44a2",2.51],["a717ac1833504ce0b070b7a29dd679a8",5.15],["273aaf521ceb42fe895e68c73e17800b",4.64]]},"50A":{"p":"45e182003dce400088bc7ba66f8bcae1","c":"3418d6200f454616988631b57c5c19de","t":[["cb085f0e61484e1fa1f282c234571074",5.53],["1ccdc8f68d0d474485e6c265fe44cf09",2.65],["b568606b814e49a08f207263d8d89c26",4.55],["d2d0b346f7784cfb8f83f885fc4e5fed",5.62],["c1c6a94f580b46e492198b64d6e0676e",2.97],["5295eaf42bf94c00aea9fe9698288aba",10.82],["8db6b3119c0243f29065a9e01b7c7c85",7.38],["cbe04c80b95949c5bf56b4062e447c03",2.69],["8e148845757d4c80bdbad8cc87617ae9",6.32],["8e78393cfae04643a546a5bf4219d982",7.66],["b3b7a2fe37fb4e0ab8cc452e685cf70c",3.67],["119ee55cefb6424ab573a682d5b137c2",5.76],["ca2bd59f2bbc40699577f516d3402b53",6.13]]},"50B":{"p":"45e182003dce400088bc7ba66f8bcae1","c":"3612934ea61840f09e4fa4946b778160","t":[["84623066cc7f4ac08bb49c36738e8651",6.73],["2b01362d28514e3bb669f4d0bf28ddc9",3.62],["bbd74233261149a887efe7ea943f8a03",6.97],["374c731ef76b42ad869f266900bc21a7",9.29],["18a58774ae954c7c8f25cccefcfe6fd3",6.36],["f29be738944e4684a90652f980327947",2.09],["9809c61455324411a64a728decff1659",6.87],["858cf326d2ca460a96707a199392bda2",7.06],["d1adbf9bad5445c18128d0cb8f700446",1.67],["f1555836d18e468985cc95a995947feb",1.58],["d7a6bcf08c204c848a6224b8fd513391",5.06],["030be177a4f440d799721d09e6f6a23d",4.13]]},"51A":{"p":"45e182003dce400088bc7ba66f8bcae1","c":"32e723d45dcf4984ba9df6b16ffecae2","t":[["36399ddcb18842119dc39e1c35a97e05",6.13],["2ce3a16d0cfa45698f05b7b8fb9d83a4",3.67],["35f9a60069f74bb293d6199a4b8816bb",5.85],["338650aee2bf40239de280d517f37cb2",2.46],["deb33071dfb440e29c3a0122c4556214",8.73],["d7c12b0ccb324e1e95e32f487d47d0d0",1.16],["270edb03cd0548718a3e9e7715d921cd",7.66],["602507339c91451bb6543cba6e2adf48",3.85],["947cad6b18da48c4aec458cd55e12e22",6.55],["7d7b4fefe6f34f469094d0f504acddeb",6.41],["b6597764bc5c46eea7de3131d34bd547",5.34],["6e5fcb50eca94aa1bdc3ba8da85dbbd0",5.15]]},"52A":{"p":"45e182003dce400088bc7ba66f8bcae1","c":"641db3580b0643e88bed4e2946da6c5c","t":[["fca63297535243b88175321cd01c0a84",3.62],["ce6bb3206b0241378c164d7d78d06e9d",5.06],["552e8bdc968f4455afbc35566e5d1d3c",4.83],["400c04bf394a4d87b2ed070897b6d94e",1.9],["5abe83d18ff44d3ba8d270c58c991edc",0.74],["b6f4bd51cf964b63a3c0389dd203577f",4.69],["22d15e2395234485b493dd2a8bdbeb76",4.97],["2142ab5e61944e4ebd2ea800f284da37",4.41],["c5f93b743b3a4bb88052231c4ef14cbf",1.63],["af62596bc2a84af5a85a74eb407c94f1",4.64],["776c7ddfbe64464a97c8994469e883b3",10.36],["bbac3f46475540908e188c65b3adeef7",3.07]]},"53A":{"p":"6459e4ee08ea4aea901053e261b682d3","c":"ddd6862ebe814bc7b1501f0a66084112","t":[["1b1342fe95e2428c826fda3cc49a4298",4.83],["bdefe19484d64098a82ba37a8e0ce09d",4.18],["6d89f211171941df8e3583405ffb420b",6.69],["d913518cd52b4af796179eb4c38a5fb6",7.57],["2027ee8292584c2fb71c05ceaeec8c25",7.71],["426c5d4316754402b32ad9a9267177bc",1.76],["72c0d4b9aa5c4b24a808647b8eb9b1aa",5.34],["9b80e45fff1d4e98b23918c529260385",5.39],["854dfa79d78d4fc29b26fc0db176b45e",6.59],["f8181d6bffdf4c60bae42c8b7a647354",2.83],["f41ccd1d283142fd81d6a3b27cd6c12b",6.59],["d0c93fb2c2454814a64abec2d7bdd81a",2.18]]},"54A":{"p":"6459e4ee08ea4aea901053e261b682d3","c":"c52c050b00a54211a11080acdf7d9998","t":[["b99cc3f79f1e489aa8c923453ddc1c8c",3.2],["94011c08a17d4492bb579b34e28a26ec",3.99],["8a5789cf3f3540f289154313f09e3c7d",4.5],["28164ecee88a48bb92c6fb5bee1bcf8a",7.71],["5f4f43e58c6547a8853ab4e38e548f86",2.51],["5d09b0c803ec4729b6596f4265cc585a",6.64],["c2b8805df02d4db38fedff4951efade0",2.74],["cadb2fc29ea44912bf5b72ca5568a466",7.11],["9d130513750e42418dc5a29cdb24f65d",3.72],["95b306859c3146cca43d39eda0424b61",7.24],["38e390c9a9e047709ac1703835287be0",5.71],["1f503df6675142298cb24b890df11404",4.78],["d2b3796d9cb3484d90f01382c3a55621",4.92]]},"55A":{"p":"6459e4ee08ea4aea901053e261b682d3","c":"a71147797bfd4024ae8fa979b65c3624","t":[["994aaade30194cc5a62ae36b67639791",3.81],["9ae012b8bad34b2cbde859b34203cf56",2.32],["d494f06fc392450b903d8dfa5dfe84d0",2.83],["ccdfdcf7f59641d89f11d9df3d82cd82",7.48],["9b5ad99dffb44904b806804ddf7a89aa",2.79],["ee60a4d656c2496499409c1f3e3958b4",9.52],["0956fe86e36c4f3fb53e12f9db6af341",2.23],["066ec64865364e298d79f11781b5daef",5.02],["98a5be65d14d48ca84e1866cbe5f0a8d",2.04],["d4f0f5be620f4187a9822c42df16f034",4.6],["0a480f1f1b4049038d5cac1d709f5481",1.63]]},"56A":{"p":"6459e4ee08ea4aea901053e261b682d3","c":"73c30f38b72a41aba8f5fb1b98a72711","t":[["5bf8d38cac4d4ef59ad962f6d6fb9032",3.76],["f06432a5eb7049298e9f405b8b6c8dc1",3.58],["ead5a02433a541c98c9300924049634f",6.55],["16ddc39972ff4249b061213ab6b89853",2.93],["5cfc43318186490d88f2c96ccbd1c91e",5.25],["4eb2b965f3ff4adbbb4f666e96bbf94b",8.73],["83107516094f4c8bb4715eaeba7ae1ef",3.02],["23e52c0896a0425fa841e3788d6f4fb5",10.36],["da5730ab36684118b8cb95423f1508ec",4.27],["948958fbbfb84d56bcf4c51b975ede5a",10.17],["0a64a2fc7a3b490891f81aaba00b5031",7.11],["52c86251400245e78bc990b47a44c941",5.11]]},"57A":{"p":"6459e4ee08ea4aea901053e261b682d3","c":"e2919b21977b4038bda05be3a1ed753b","t":[["666f826ea0d04212bb0a5da06c7de3cd",2.55],["bb876f4920924824a4a2d6ee50634811",2.97],["8b21ef1bd0fc4b24b408cfe4f706f28b",3.16],["ab94006ae3e44ec888f989dcb51ccfe6",2.32],["243c15c4f4284d63a547db0d2d5387b1",5.11],["30ce5aa5612f4cc3862f33bce1732174",5.06],["c640f0da419940a5a662b3af7cd4a683",6.87],["17dd7060c4d44fc09ff7e45638ec0c18",1.72],["6a7a92aa9c984804b20c43db67ad4457",3.85],["d8752d50aac54077bad812a6366dc335",5.02],["7978881606324637af91fe12cc9097e1",4.6],["c5c0d050b08740f1bfdcba8207341579",2.65]]},"58A":{"p":"6459e4ee08ea4aea901053e261b682d3","c":"0062646439b14acb9becae53394de707","t":[["d884381ba5e240248c163166f54e9f26",4.6],["c35bfc70d91d44c9badb49dbffd43664",3.95],["ab667a3676b043ada55056014d64eed9",7.34],["a44319f885d84cada6163a5cd0f2091c",3.39],["f01061876aa34fdab019d5b0aa0286f1",8.03],["a169f4cab8e64b38b15cacab7efd0df6",3.58],["bc630224389041bda5d884fef8994d4d",3.81],["d0de09e983b341db92837b476450d2f9",1.86],["b76b01a8f55b4645b5ca47b5897891da",0.65],["58f37cf6cb6941f98cb73c419410ac3c",7.71],["e04d7c39f48c413fa361f0b2a7b4cb14",4.88],["c73a00f2795c4b8db09514fd66a51c1b",3.81]]},"59A":{"p":"6459e4ee08ea4aea901053e261b682d3","c":"670232ac59ce49d7945b4726db23bd18","t":[["408664fb822d4b4eb5fbce7950acb138",1.63],["197ce14622984c27879fea7be5b6e77f",4.18],["57b98cb1c1b44452bdebd4a8daf8e8cb",7.06],["b34b582b0fd841d190719d2c9694bc75",5.85],["22250013e3cf47afbbe1e7d304579c8f",4.18],["de86cb021a3c4fde9e40ed68ce6504ae",3.85],["efc52ff87ea3413faac6e28826e20659",3.3],["9d1b7a3b18e242198cd6efbe2b59ee82",11.61],["10e8a33ca7b94413a476610c73f7f8ff",2.0],["0e28a81224a04729b9ea3e8c8a56fe17",9.1],["89e4fd1023254b04bc0fe00e83190a74",3.2]]},"60A":{"p":"6459e4ee08ea4aea901053e261b682d3","c":"3fca9eb4b144482188855a8cc40d7903","t":[["98f4d151e2da4d1584ef92c62c4d64b5",5.25],["f40f4e1eb66e4749a14dccad542ac5aa",3.48],["0ae1d36476a044cd952e90c17e0681a7",4.18],["97ea583be1334395a526d978680a6580",4.5],["0128b2d87b1e4523913586a204d376f4",2.69],["978690610a9c4e64aeb538270e7d841a",6.04],["0a508c251aed4e469a9855af053ca2db",3.39],["91c63ebe48bd4a2ba59e16eec6f14d83",4.13],["7297f4f87b78424fbf2b9fa7b5b74f12",7.38],["79cb2c4604824b58bff5645ad74d387d",7.24],["cdfc8a1333b94580b5a676dbcbb67754",3.34],["f3970b86e765406d80c067b96456969f",8.73],["e6427a80b68c4fa0b2e1aedd0939ea35",3.72]]},"60B":{"p":"6459e4ee08ea4aea901053e261b682d3","c":"81a566493d0043fc8fed89a4a2c99ca5","t":[["7e748a10d4a94aa39f404b4bc64a0bd3",6.13],["1d0de89719e24b7eb625d0ac501d02eb",7.48],["e694d5a3a5384934a44f35ccca59cb41",5.39],["6ca3a7101a714fa59aa3fb70d61d12c7",7.99],["9d00bd3c131349609c6067e800018c04",8.5],["7fe3010ef24743ad9f96d820ffdecb58",1.86],["29928fabbda749a9b36da4e7f5724664",9.1],["c3a17afc4c694e0faf69923640e2c0bc",9.01],["024445eb593246948e032323468aa5d5",6.27],["528353d2be164bc8ad966d079e9cfaf1",4.92],["84c0d667a3ed44a084c40fdcb907a2aa",4.78]]},"61A":{"p":"6459e4ee08ea4aea901053e261b682d3","c":"b4096213d2e84e2bbd30b759a532913b","t":[["8cb9cffff9d745c795763e35a2411b00",6.36],["397266b4d1544d3e82158eefa2dea0ea",4.92],["c391d418385a409d9943dc1294c3de33",3.81],["5106025507c6476f99386c80a230a4de",6.87],["b8f56f59216940768fa158d096f16759",2.37],["7e35a1c0821845d981e2b51cfe65e500",8.59],["b3311f68345646498d234a140695d73a",1.86],["5499f8e1fee4468a8f117f9bda7922d7",8.41],["138c3ecab1214ebdb0dd9ccd6c6579ae",2.74],["a7e86b2543474796809da658204489af",3.76],["175758fb4ab3427f899b8b12504ab31a",6.08],["e8d780e3c6b44a2c912dfad45b535d30",4.6],["9133e584e6b74a339aaed813d5dc7295",2.0]]},"62A":{"p":"6459e4ee08ea4aea901053e261b682d3","c":"1729e6b97553473f9da620e803e5bf08","t":[["24c49db88c3542b9a9870a9700591b7f",5.48],["fc064f0ef63b40b7a4f0e4d776068e40",3.02],["6fd5f1d8db70493cb2e10e753f31c27c",7.52],["2d5ed880f0d94412ad3eae165a18c24c",1.86],["4b1bbb2c574c40aab050b46cc565e0f5",7.76],["b0eb222f1cad4743bfda31215cc2ce9c",2.69],["7ec9ee50a0e742649b91b5318a317b4d",10.96],["73fabc849d434cd894f80c7c26e1fd84",3.9],["2e8f546adc2c4178930e011328684c85",4.6],["4e71539b457f4151b28a55a9dd831f59",4.92],["d56ade984f7a4de2bb82a1456ca06968",6.32],["7c9baab21be8449a9058822781ac71df",1.53]]},"63A":{"p":"6459e4ee08ea4aea901053e261b682d3","c":"78e8f37db6be40ab935d1cd0f89456c9","t":[["7a75f6665b0e4ab59965fdd367b532f0",5.25],["7371812196e04b62b8d2555bea359d16",3.2],["10a3b212b32841d8a70b8baca6e7a6c3",5.43],["1fffc173b4024811833f5c60fc07261a",2.65],["e374c59e34c7478aa171b5f6b049c87d",9.66],["e81388ce0abd4a1187dafb65a0f1a61c",2.28],["6b6574bb6c9d4d4fb36c21a5a80db1d3",5.85],["29db1da37a1c45e18609dea9031d00fa",5.43],["c250bf9fa6904f92b92de65068f65331",8.22],["d42d3c7e77324517af152412c332718d",4.92],["936b0d6a48cd4490834a36d10f57ac92",7.62],["5add51d69da546cfab1bfc60a8168fd3",3.2]]},"64A":{"p":"6459e4ee08ea4aea901053e261b682d3","c":"dbd9864e021346cda51af4a30ce7492a","t":[["bc91deb46fe947f3b1fad510c9c1f5af",5.43],["7fade2a6cd234cb08132a3fed51382b8",1.72],["0b7e6343e1c24c01a0fc8c14daccdb6a",9.15],["63f2b61ed3134aada348fd2d592a1135",5.48],["17aea62471bb4e709ea9ed22251aff07",5.85],["9541cfbe089b42c58faa17130f639400",8.13],["49751596dd274154a8a0136441fe6582",6.55],["44e5d39cd141457d81fb55b212d22e45",1.72],["3c7aeeced9cd458db5d18d285737dff3",11.42],["a80c7d6be3b9455e82326db196deed6f",0.98],["05ed9f440adf412995d65428d3899f58",7.52],["1830b38e932b488ea6e27625c89a0b49",7.15]]},"65A":{"p":"6459e4ee08ea4aea901053e261b682d3","c":"81e9f5972c894565a51be56b5f23ba9d","t":[["98946edaa88c47dbba43afecd73cce88",3.58],["eb5b9f41f3e3401f86cd4c0140e13e80",2.32],["8cd4ebe7a9f84b27a4ef8b5233f94074",6.55],["9c215eee1df74a9cac0c38edd9ef0e97",1.44],["f035682418c74deba7cc71bd813f4e97",7.34],["f5a7b65e5e3640fc85ab9971d1322e58",1.9],["827da7e5e26442cda6cbcd5ba943e063",8.96],["7b812ad33ded4c46a2c241cb5f8be366",3.11],["578093fa62ee473a8da819d9b24fa23f",5.85],["6d755d73154648c6a50efda057c015a9",1.9],["8928d451f1be41afba3f258f68292d09",6.83],["f84cb37cc0c24828ba49fad90d3476ce",2.93]]},"66A":{"p":"6459e4ee08ea4aea901053e261b682d3","c":"4ef76c47dd5543b5abd69301a432042b","t":[["974b7aa5db7a4731afff1bbda218501d",5.43],["1ad0c2fa53e848c6a9d6b32f9c627c28",1.63],["2162caa5cdde4f37914eb5e8b42b3d40",4.6],["4dbb47fa6a694e44a65ceb936cb02bdd",1.76],["9db1c479e25c49f681db9593fc431d78",2.0],["4a43314967364cf89ce7a2be70b935b5",8.31],["b6479b2de0d74b7b838343ad7fe47e26",2.97],["39c0aaeeb2c4481997075487493a64dc",4.83],["d137d1d7d28a49e7959f2cc073125ec0",5.06],["f64b364dfb1141d1990cd34350931928",2.79],["ebd4728c9afc493d9a8e1891a3e922fb",7.66]]},"67A":{"p":"bc2d9384c81b487ba5dfd1b6f44016b9","c":"70ba833070d14bc294cb2919be6340e5","t":[["53b52dc2459840cc89d5db9f1a242745",4.97],["a417c290691446098f5e96c7dc2f285b",4.27],["b603230d4d4e456dbe3dde3f358135a0",2.41],["4385abf0796548e0adf2b462e785c26f",6.92],["ba981dec373946bfb0fe6d4d3d4e2022",2.74],["6de1da92e10b4c479730f4e01e8c69a5",7.8],["6c5bc80774334c80974db681176e45fe",2.46],["8e1b958279154640802f003ebe8a513a",5.2],["6c9d9bd78a904d06a9e453d67bec20c1",8.64],["9c28169f09a143819f4e49ee93e85e94",2.88],["5cc8bf4147bc4a1480fabe62b0111a06",3.72],["bde3f0bbbe4c450a8bed7657e09cde57",2.74]]},"68A":{"p":"bc2d9384c81b487ba5dfd1b6f44016b9","c":"f15eb69d52934cada78fadb297b23185","t":[["62e4ebbfd9db48c385058b303e1f8814",7.52],["f6eb7c5488f54c989c261e0b14f4b8c6",3.67],["ae7d65b0602f4c61aea24b69f343f74f",7.01],["e877203efcfd4d27b54e2d69bfe07cbe",1.67],["ea809d47b1154443a34b336dbe5a28f6",1.76],["1ba93fa4f1354301b00bc0e6dcb9e927",8.92],["f2f8f92430114d5eb484535a5e304f90",8.73],["8d40ce515d0c44be8d51174679b8514d",6.08],["8d4d91e3c009451a8973c20d388c8175",5.94],["94d4d7c054104026bdbef8345a4c3c3b",7.66],["b306a8eb2ad945d5a96c4c2d0306f377",3.34],["5350a81d168841fb879ee47c386ab918",4.92]]},"69A":{"p":"bc2d9384c81b487ba5dfd1b6f44016b9","c":"827db1cdc7ec4271961d7499e44c5b4b","t":[["9d5edf77fc6b4569a6d1a856a5a3c44c",5.94],["fbdc368dee124c2483d107a559455063",2.04],["8f8fb75cc262419ba6fa8194c1f6f9a1",6.55],["f637ea4fa88f417ea31d6adf95fb9971",0.79],["e68e4b84f5b842f0bf6e54962e1c6e09",5.94],["ee310b0b9827472eba514bb64f3e8b62",5.2],["cb3374c345b3489b86789d41cb1dcef5",4.64],["7597bece7d9a4c9881646f3c63a46096",7.38],["2e330f2cc4944ffab7dc7e023af98002",5.57],["95a0705b253b45aba024e1901739d868",5.67],["328e2aea9f2440709c7f2fe26f3652c5",2.23],["c2d09008d7844e14a062b986f5353d8e",3.16],["378ac00a27d94f10b6a86d94425a3f91",2.74]]},"70A":{"p":"bc2d9384c81b487ba5dfd1b6f44016b9","c":"ad5e8d0d81af4ef0b54768acb381cfc2","t":[["75b3d78d52d74d35b1f18121b0a1a133",5.02],["2909df61fdd84cb1b815bfdc24a93efb",2.37],["b5b3e57f4f1d4fa2ad50252cb6946cbd",7.01],["0b2f038df9174a2ebc533821633f5700",3.62],["75b31ae9ddc7490e95b1ba311bbdf661",7.11],["33b983fe2f2c4d52a3fb3981eb9b32ef",9.15],["ab1b5ffe98034e44b5d15dc9a90c0c1e",1.25],["ba539be4e7cf4d43b1614eb4d2b9f7aa",7.57],["2e5b5c508a0447b2a9f10ca558888491",7.89],["d03692618ee544e7b9b1a0fa913394ba",2.88],["08ab745cf0664cedaf73f5a33db43ea9",9.33],["ef5f431f4b534ae290a0162328522396",3.99]]},"70B":{"p":"bc2d9384c81b487ba5dfd1b6f44016b9","c":"aa08e87e7eec4c01aefb5d20ad50bb7d","t":[["e3ccb8bfbcb146428d0f4fa18102feee",4.46],["2e9e8860c2a940ed9b063fed692d3212",3.34],["daf7840bf1a54dc392fa639da9ab7059",5.9],["57efdbe2701b43fe958878d6b7a3f884",7.06],["68e0472ce38f4018ba0adccaf94f5127",5.2],["5375a65cb9494207bd189d87bd3448de",8.13],["99fae337795842158e62cf5b00e3f269",7.71],["9b96f60a3b464f94a4b795f91462b4cd",3.16],["bea0ce0e713e4cee853e20f1aaf6dd35",4.41],["ba64985d1af3492baffebf9f86d47c55",5.76],["050fc60a23d14b2bb90010d9595a51d8",5.15],["49e75ccc508441cda5f13db6e2a2adc2",4.83]]},"71A":{"p":"bc2d9384c81b487ba5dfd1b6f44016b9","c":"f1544f8a564b47f3b5f9dfb3acae046f","t":[["661937bc89f440f385800c9e961808b5",5.94],["7c00bdd54acd4e989bb17ca324b004ca",5.99],["2f88b29d913b48eabe490f4f5f266ba4",4.04],["f7976a17bfe44f1aa106a2a9c6f8a993",4.92],["9cba0f9e013548868bb3a457463e3ba7",1.67],["2db5736f11174d008f01a7a920672bed",8.5],["01efe8310e41415eaa41a9093fc8c68a",1.21],["806e55f0c8b24a92879f9d83b558754e",11.05],["3ca5aa23dffe409f8583a238bd6016c7",1.76],["3abdcd9b23174ab8a1cfdf3c847d9b75",10.68],["d2481eddddc94fccae73489c2e9ef74f",4.92],["ab1cd4b47a68488b9878848368a33978",7.62],["bd9b2c188fcb416f8fa597a3bb1fbe87",3.34]]},"72A":{"p":"bc2d9384c81b487ba5dfd1b6f44016b9","c":"094a44470a7c4c879b6fb8750ca32a1a","t":[["64840d7f16104f8d957b3073a4c39438",5.76],["2d157ba734bb4b9c9c67839226901350",2.88],["02bc88c4ef1348b693e7c127dc330f8d",8.68],["14d2eabf08ed43b6aaaf8c3a09385914",5.39],["f6127085401446f3af3a0525b4a7e15f",8.73],["97bd960e8004413796f2becf3371f453",6.41],["a6895e20aca944dab1143fc29648de26",10.17],["50880c57b58343ff9b74c759b2784c7e",5.11],["e7b429df2f31405f8f69702dd498e944",9.52],["10e2b98e7fd24063bffa14f51c1d2eb0",2.32],["65ec4a980d344350b443304d8d62eedf",5.06],["fe15f9e4679c4892933e75cb6f643175",3.76]]},"73A":{"p":"bc2d9384c81b487ba5dfd1b6f44016b9","c":"2eeaa0c0d39348c18374b41f5e0ddf29","t":[["961df461181440d4900ee5d30b7bda56",4.6],["91335b614f1b4d77835b08c67fc4ca97",2.37],["ecb7c3abfcff45639d2544f0c4ba2a8c",8.68],["644e19aec5f44f05a1b59b58a5a20d98",1.53],["163403f1b604476b8b0b5a9d3f9159a8",9.06],["1b76bdae243a42cfb0f49500f36da9b0",1.81],["f6cd71ea8f884bc59e48f19fd85d7e60",7.48],["cecdfd9d7ac145b996989da229cdf952",1.3],["8b1dacadcb9c4671ae2422ec4553f789",8.78],["58c63a948d7340dcaaa96bbc745c1818",2.32],["3afbf494523e4d6c9d51abe4dbc027db",8.5],["843aa97498ac4b76bd6dc5a7387f682b",2.6]]},"74A":{"p":"bc2d9384c81b487ba5dfd1b6f44016b9","c":"c100dd1f12574e51b7a15f9ad66b7629","t":[["a69ed9585ed6455f89f1741c1e1977b0",5.34],["430150a19eea42449bd78dd8668f8042",2.51],["b0953fbe7fbf44db8cbaf5e7b5959c96",7.11],["ba7cbc8072c34018be510579329c7b36",2.0],["71b99f350f594ddb882e85e6a05f24a0",8.73],["9a4094c1742d4b6aba7b0bedd186b49b",1.95],["4dd9f6d744b84b8f994acea4959dcb36",9.43],["6903e08a56ff4fe0aa58b8972c188ad3",6.27],["a2f56a3c1cd249d2ac098496d5e71c03",10.77],["7716bad8fe124bd688fa7b4ee2140b40",0.98],["87df4dcc68854ddfb5e21aac7f632810",7.11],["5859bd91b7594b90bfae391e5c7fda9d",4.55],["57f37e43fbd442569ba4d9868883a8bf",1.72]]},"75A":{"p":"bc2d9384c81b487ba5dfd1b6f44016b9","c":"2c011929fef14864bb5069031d1fc9fe","t":[["6f1e470a54d348f184acd6320d1458a8",4.92],["57941c92cdc64ccfaa975a1004abcc9a",3.39],["a76ee987aefe47ae96ccd683e87b98f6",6.73],["705033394cf04cfa9e19b667a131ca41",7.8],["69359326594c4d4eaeafac0194a2af57",9.71],["41685ec3b8d54fbf99c7263e34d186a5",3.34],["4da3018ced4b4e3a93806537e341c0f2",11.98],["391b20c6c4bc496db480cd10cb247664",2.79],["1ed7419c8936479da606b5b27db08f88",7.38],["67f795a58d3c4a07b3c41b775fe3d2cd",9.01],["e92ae2d47cdd4b22819f9c20d93ecb34",5.67],["c1feb976f3e444da8ca837a558fbf7cd",4.37]]},"76A":{"p":"bc2d9384c81b487ba5dfd1b6f44016b9","c":"d99652da69914c1283a82141432c5815","t":[["94b3736e8b91424da95ca5dd3a9adc01",2.65],["f75cf5989e4242b49c74f2cc5b537b25",5.25],["a7dbfde4692a48e690fca4d879fbb037",6.64],["825882c478054f8790761b7228d2a1b9",4.46],["208a898b3edb46c087c6a1a80a04e227",8.5],["6f078ccf60e54ed3a5e575ac65d635d4",3.02],["f94702b39dd346f1b4f815dad2468331",5.53],["243bb3ff0aba4c2f9a6318f8e6899ccb",1.86],["952d3287d670409f92857fee93da3a35",5.62],["17ed0ad63a8e4a649eb54e6e33ec4c9d",6.55],["3289e165ffb44a979725f988c8dffebb",1.49],["c4bce1084e124730a9f9c3679e31c412",4.41]]},"77A":{"p":"bc2d9384c81b487ba5dfd1b6f44016b9","c":"562b44015cdb4a18bd247f5f83f00c23","t":[["4e88ab45907e494db778c11a7790775e",3.34],["ffa3b966cacb4376ba520bc9c9d8da1a",3.44],["7e86592a37b342cba05d3a3b39a6bf92",6.27],["85f93b3150cc45f6a06f40519ab21eb2",5.99],["84d18743477e4c55bd367311eb90e67d",2.69],["082cf9953ff44141822c6050b6f38df0",5.99],["a900785fbfea4e6ea698271fb32a591d",6.27],["ab5148e22e6c43b995540415152a7199",4.41],["c9c5b5419fe74b829b44633e235beb99",4.88],["273439981c444f7ba00a0270d268bb49",8.36],["ab064998362e4d26b210a005e9717e8f",3.9],["243f20da2c254c3f82529d614bedbccd",2.65]]},"78A":{"p":"bc2d9384c81b487ba5dfd1b6f44016b9","c":"a07f07ec2c7a4671b56f52262dd48e84","t":[["bd602d1e5b3d4ad6989b36a7c91020cf",3.44],["7ec11f83abe04cfa91b05c8c4284e5e5",2.41],["b1490d2ac4104423baa97267d9ee7b35",6.5],["33b05740052044449b99fe6ef0c29d7b",4.6],["415af5b9e06448cdaedd3f911e722219",9.57],["4c9c1c8c17cd41faac7105e5f63d8407",4.64],["fe0b67ef8ff8465aae1ae266ccf478f2",5.8],["938ea8ca9b5c46b4b1593db2dfeac379",4.46],["f0c24ce041c748e48a4a697e5ce89f37",5.71],["1ef0b771bbbb43cf9739ecea47b4d6cf",6.32],["ee1276410e1349469954b59442aa968f",4.32],["8a35aca9f55c46c9b9a3240397d15206",3.25]]},"79A":{"p":"bc2d9384c81b487ba5dfd1b6f44016b9","c":"c6be2ad4b16e4da9bd2a73ce146ab67a","t":[["ee87033d22c04f39a2001bf4b6f50e79",2.6],["6a53d5f9817044aa8631566c5c7da2ab",3.67],["242a9cf975aa4bd6929d3c4c5b88b3be",1.39],["7c4daf8118964436b7117d1cf16d383b",7.57],["cc2ef11d0ab642d8958f82a05c5688fe",1.67],["f9bfaa40ff84433893ff59d37d5412c2",7.52],["171037ca948740c78d6834ade497936f",1.76],["a7d857476a8e4e30934b48542c1cb5f1",2.14],["4dcefa1ae2f34fab82ae642921ecef20",8.78],["f019861aad9a4019ab8cad7f4ece1247",1.76],["f2c18ac73593421c911d76b1d0a5c6b8",2.65],["39dce71e6bcb42b9867a6bb2dc466b53",8.03]]},"80A":{"p":"bc2d9384c81b487ba5dfd1b6f44016b9","c":"39a6689b9d0c4f2689c6250817f7b8d0","t":[["a79c91821a13470eaaff3b5309db8f07",5.43],["2e46253086c945018dfdd0564f4c5615",3.53],["e0b12612bd7441ddab8c84c95e7855cc",4.32],["ec7ebbdcc6d944e0b0f31589faea288e",8.5],["9adc06af5d9d497985e0f0fd400039d6",1.58],["4a9e5ed8f3024db2bdc92161895758c2",10.26],["b3e8414bfb2c4fa9894e93f16586add9",4.41],["c09af28345ea4403bfbe886539d76b04",10.17],["5f37e905459d439c826630941ec5cfd4",0.79],["78b876cfe09a4d8abdccbda8b5a6c45a",9.29],["7ae7797036f741e4a3a6a627d530ed69",4.04],["aed71bde70b248fba07ae572b98f99e9",4.69],["edae232d282644fd8b9d883a93e362fb",3.95]]},"80B":{"p":"4119b6faa1ef44ce8637fafb1edf0624","c":"5fa5487dbbdb4717b5abd8fb72e4ced1","t":[["44f3852e03564efba90141299fb08607",4.64],["3b1059987c2e4e888c84601711243f97",3.16],["0ef8531d46a544d29c7c85c231720317",8.31],["5ed0e7b3aebb4fd28df55bce8d94944d",7.76],["5b73c8bcf4a94d34afef98c0c22f2f85",3.76],["db865f8789df4f41b95d192d10718872",5.85],["867c2aff7c9f4f37994616e25855158c",7.99],["b1f5fbcac9524cf4b1e62d5df7ffe678",6.27],["8200ea0b0ab8472e907391dada757f28",8.5],["5060ad8e80f04919866c5795b8fb2453",2.14],["bdb6a5294ff34143a00b6b95922176d6",8.31],["5d6bc5b3f30d44b6b460022fb2df5d53",6.13]]},"81A":{"p":"4119b6faa1ef44ce8637fafb1edf0624","c":"4230263375c345d89cb78005a60336b5","t":[["733df67abdd845bbb577e454ff91dbec",6.22],["106b30de6e9548afa77116d5e21d5f73",4.13],["be35e97fc9ad492db944faea3758f91d",4.23],["59d547fe978f4f269b857e560a9fa3f2",3.53],["1ebde42be597410898306384bd92103c",1.76],["0ae9d4d07d3743dc9b2720235369af8f",7.29],["72d6bed038ed4e5799634ee6ba28a1b1",2.97],["f8aec28acc1d4cc7991468f462492fb9",6.36],["bee13af243484c18bd9e8ee79eb6f493",3.44],["df0e9acbb2bf4430a5efd94fb9b97ae5",6.04],["dc3dee6097274996bc1683e9bdabbe62",2.0],["9ba1b1c1f4c34344a9c51eac79adb5f2",5.48],["f64fa013e2d64206847387781bcbfc9a",7.94]]},"82A":{"p":"4119b6faa1ef44ce8637fafb1edf0624","c":"b26344ebdccf4e598fb03b75509fed7f","t":[["8742acab164541859890480af1aafaad",6.73],["92e797208e1f4388be7883125b3d229a",2.65],["5a52c6e33a12416082a9235d15a68e98",11.84],["d96507d9dceb4050839858e199252b0d",3.72],["059e4b76c8844de49d3e3c371f511a30",5.11],["79cd0eb031f04034b47c0f55a70728a0",1.3],["7249e9b52dec4a8e9e8047817e0c5543",7.34],["f7793480be0145bd98e6358df191a122",3.25],["f9ad1e9a1a8f4ecd8bae2f25bcdbe29e",6.13],["ef61742b6f5f4d179b88aed3ebbbe324",1.3],["810b4b8c770a41708c5594fb4f5fc0aa",8.22],["17069086648042d181702cb75443bc65",2.65]]},"83A":{"p":"4119b6faa1ef44ce8637fafb1edf0624","c":"16c773a0e6df4e91a4e5d3fb5a448ca3","t":[["7b45ca4898ef451fbc59d95de9bb9c37",3.67],["6bd67bb9b99d4c2a9b46e7a98b72f9ff",2.09],["7c616c2d8e71430fb2947bb8d8b7212f",5.71],["ceba566babdc426395196b0e3798d52b",1.86],["a1772f7da9e4425ca01b926aa8183b0c",0.98],["3752bad481a34031af183822b7a2de30",1.95],["5b0eb3e6c1194673a26c36f2d2d650bf",10.17],["fd49a3a1e23847b6b1936cd784f50b84",4.55],["ee9e57c2253248619aff6fe95e3de64c",1.11],["741b0ec9322647c48e401ab00db718fe",2.18],["42bc84d1293d401d90e319a7e8578b19",6.55],["3dc3438b7bc9440199ca7d118e81fccb",2.88]]},"84A":{"p":"4119b6faa1ef44ce8637fafb1edf0624","c":"c0e97f66962e467c9ac59e59f79b71a2","t":[["92bf1902832f40489056e5685dbc09dc",4.37],["1975b29b63af444483d45016b9e80a09",3.34],["c4c4067a14b54beb88e84b3d3379739d",7.15],["50e13fde16ff4ba3a831476de10b7118",5.76],["e065c0dde1e84163a43c4b8735665b3f",4.88],["0b19f359dc7144cba1e076845ad04360",6.32],["d751e5567eb84af1a6b7d2248d76b202",2.55],["f5f0a01d3563421e966b43992c2ed908",11.38],["dddb9653acc84df5acb6a6b06228cdf6",2.65],["c9b8c589db264180b4ac8a224cf57174",6.41],["bee62e0ab1c24c33bba7a94ca5f20f37",6.55],["7e41e74f35814cfeb13cbdeac1212269",11.94],["f88c8636e8eb481ca5ee1e1b57258301",6.55]]},"85A":{"p":"4119b6faa1ef44ce8637fafb1edf0624","c":"962334d592224fb29f196d7f44c1ae97","t":[["328e2ca7975d4a4ba055256b1352e214",2.83],["3c98d5ce96d741f7937faeaf5915a9e8",3.16],["fcad34515386476b982e56bed0d00bd5",4.69],["a87ff92217fa4193ae64155320cd1c8e",5.25],["7bfc6c0b462b4d8aa9d0c640918ff5a7",3.48],["8d24cd1a61584bfb87fd6f145e7c306f",4.13],["bf209fc738b74c2b9f6f3accbb4a3e92",0.84],["4c0337cf3ada4b06b0bbdc97c9f294af",3.95],["971d1c67f33741b28c0e7203e1f4a93b",1.16],["62e66fe4f8eb4cbdbc45ea025cd97b87",6.97],["1469723b90844fde8a0e9d337890baa9",2.69],["03efc90f798b4ca4a7e90e7428969310",1.02]]},"86A":{"p":"4119b6faa1ef44ce8637fafb1edf0624","c":"ecb0e80d6fb145ffa68cd7ce452fe0ad","t":[["63fd5decefd24ef4b3ac721d1c242ef4",4.97],["6f0367028e644a4095e80b01dfc585d8",3.44],["d77d1488bea04705bd5577da21085a1c",3.58],["379a150848ad416ebed77974a1d8b45a",6.78],["0ccbf464f935455893ff055e25017085",5.76],["edce033f638b4e469914333f974f1972",7.43],["8e8acc376ce9411988731c349ea0ea17",2.46],["281d2c1f57e14c70bdec2eb978c8445d",2.88],["f6cddf6b5c6b480daa9f14423665413e",8.59],["375d0f20beea466b91663a84e2a3bd08",4.23],["348b9a867e054a4aaeed550eb8e48503",4.64],["465ecf7fe73b440389a439d4cb93cebf",3.3]]},"87A":{"p":"4119b6faa1ef44ce8637fafb1edf0624","c":"93fd48c164b34d0c9e08df24399cde3d","t":[["a2771cbc6ab14bcab38abd423416a0b9",4.41],["bcce02dd46014df7af959d11f40a8568",5.29],["1726f2e027b34f9bbd76e18e31295f58",8.13],["34f0bd033cac4db3aa3185e040629417",5.53],["6cf1466cb0fd4eee93029ebf21f60660",5.71],["751b7ca130c84a4197ae18ba8932554f",10.22],["85c633228079471dbdcd935522a89464",9.47],["8aca8996a5fd4238a8966a93535400c8",5.25],["58d4e1bb6dff47aa8cc64cc364a18e68",7.01],["b6d006e2e15d4b6fa05857d0cb337092",4.23],["32f844cedb254ac5929e4021582c13de",5.06],["9ff330f838754ae0924f2d69813d4adc",6.83]]},"88A":{"p":"4119b6faa1ef44ce8637fafb1edf0624","c":"7a19f0c1f5404550968f2d510d6cd148","t":[["da6663f3d82e4e88864075dd011bb148",4.09],["1967bad0bec84049a42477b1a134d7ab",3.58],["6b76b307f1e34132acb6648eacab4a5b",6.41],["c629e00367a3439292cb6e4134924c24",4.64],["211450029769480bb4abaecf3527ce13",2.97],["5b891e9cc08d42c988852961397eb4f1",4.69],["709c96009fcd42e7bb62e5ad82f21802",4.13],["54b8c9e7ac284da487fd38ca7c5822a2",7.34],["720f3aad5d1a4845bbaf5afe7494ff8f",6.32],["86e14b64956142b28cc5dcb4b799c73e",3.02],["e9d68c2485bd4416bac794d16c85d845",4.04],["be747bbe08d941c09d8c2e543dc67aa5",4.37]]},"89A":{"p":"4119b6faa1ef44ce8637fafb1edf0624","c":"887efeae09c84e7391e5b78be6752fcb","t":[["86614f40eb4f41a3916a2319c23f37c6",8.17],["5e1cb5b4c73a495e8942ae6499b0dda4",4.78],["7a097883b8114948880b4896dd2f531d",4.92],["0d687032fe1142788357409830e24007",3.85],["5c1aa2101aff425293aa03a55850d31f",5.57],["bb9499af466c4b14bffb9d69682c8f26",6.73],["cedc1e85204a4495837524f3129640ac",7.85],["f9cfb35800d24378ac8f70eb0ea7b7c1",2.04],["2b195f2032f8416880ac52b63cc6022a",9.38],["3c3107ca31fb40b392aab1e475d319e0",7.24],["d7a8a1cfc80c4ed48b3786288f483545",7.38]]},"90A":{"p":"4119b6faa1ef44ce8637fafb1edf0624","c":"7a9557745fbd42ccb4259c04f2caab64","t":[["7e430dd5713246389d98037d6384d0f7",6.46],["1e093921dffc498fac3f6db254026297",5.48],["2c797348c96541918fa22ed85f75d2f6",6.87],["3d8fbbb939c443b48f463a4585e8eea4",5.62],["32e28b7843094d4a82ae46fea9e67540",7.48],["4ff3aa895a3f466f81bde951f12429e9",2.79],["92f58717b89149b6898b7d8df1f325ed",5.39],["755d8aea93404c5b920181e7922f3c51",2.09],["1af9b3b44e3941b492128875790623e6",7.24],["18c7d29f407a4daf8eacf1e0008c06a8",2.83],["2f67014743e742b78832816abf4c0101",6.87],["51d2d20299194aaab3034394c5a4a2df",1.81]]},"90B":{"p":"4119b6faa1ef44ce8637fafb1edf0624","c":"75fe2d90d26d413b90a7a0a1355c1456","t":[["be714902941247fc88bc92c4acdba611",5.8],["f052942e8fae4573ba602679afacc0fb",5.71],["cc4eb299b6024f169d0d25cd41a8f622",7.34],["c401fc48c39248d1885ca11b8a13a8cc",3.44],["1c00b81944cf4e9ca70bc03bdfa9b5b1",3.02],["30d539b2f1f0478e813543f24d8e30df",5.48],["6de4d169c5b5410aab7977197760b08e",3.76],["16319aa2dfba4a22a5fbc41748c07af3",6.83],["fe7f3d14a44d42ba8cd7f55c641e9e38",7.66],["f1820c3bcc5b495aa9a65e5ff97c5fd1",1.16],["e27e89f1159e4f2f9cc90d106bd50588",8.27],["6b0e0cabe34d43be8c884c34bb9ffc6d",4.83]]},"91A":{"p":"4119b6faa1ef44ce8637fafb1edf0624","c":"09aff6165e4a4beda869421768297269","t":[["cd2a1ba88f9947c18a98d697a579b3f3",6.46],["331f326d45fe4f78904ff35139d5e7d9",4.6],["554111d496144f56ad98d653f2f1ff96",1.76],["90bbc8c3323a48a9bd244cf8a6be11c5",8.92],["27af40bc109c4a9193ac744d87221b9e",1.49],["d31b5853665143cca6ae8e0f27e0ddda",10.12],["6df08ca038054c2a88b1e5f93625c8d4",5.06],["ff7b2f0bdaf6476eb953dc30d1ae35f9",2.55],["d08eec67f3e644418e4e6e1bf7587dea",3.3],["fa54a8468da74107af0e764dfb298a6f",0.98],["3b80175be57b4521b6b973295b3ea06b",5.94],["158efedcb0414310b10943ebac2eaadd",5.53],["d00b2b6927a94965bb0e346c4a7d9010",3.25]]},"92A":{"p":"4119b6faa1ef44ce8637fafb1edf0624","c":"7a0cfaa830aa48beb2838348e2afc8fc","t":[["9cd9d5548dea414c8efe904b78a0a731",4.6],["e74cf21901ea4e2e8da3f17d0e2a67f3",1.81],["39f052151d2f4736a111084244591f19",6.18],["6b499c0be0704147a177c69a580d6ef3",1.49],["14a0c54bd6cc4a659821571280eec7e8",7.15],["5a4d08e0c3774e2aae1c1b4631307ca3",0.88],["2bd4440870b24befa2d28d141aaa731a",5.29],["8dafb7542b4c41a9962f3941ea1b1dcd",4.92],["62a1a4e9bc414c29986b92b79d29e737",5.71],["becf38f502924035a7cfde06ab0d87fb",5.76],["2096e912955e47f1a984b01ed71482c0",6.18],["c300037d0a2c4933aaa2498f4b2bffc9",3.62]]},"93A":{"p":"4119b6faa1ef44ce8637fafb1edf0624","c":"848f933feade4320bf5e3c4bd6d6ba79","t":[["2fb49f14ab5043b2ab1819b0236b7e89",5.34],["b31b976409f048e8bb19178b68cf8be6",2.14],["b611f3982d31469bb8d6b05776261a57",8.03],["3551cf8c6943436b8ae607c0541da67c",4.64],["7e715da06911484482907d06db9c83fa",6.04],["a42d3b5162a24125b7bffce290943917",10.77],["ce1530ca0f8e4305817de39a1c8f32be",2.79],["1c5d60bee85f49bca3764d9ec66fa6a2",5.62],["30015e31077640109f64b39940ab0f4f",4.13],["32cf1552283647c593776c0e173db1bd",6.32],["6eb3385f107f4eadb28530de63cacc5c",5.2],["9b5e86f62020442b9967d6270bac16d1",3.99]]},"94A":{"p":"de8258e514ca4740a42379260fb23c37","c":"f82b8f8dfb6d43abb729324c6297c8d7","t":[["638ddf684b8f413b83feb5361e3a0b8a",3.67],["e1b20ce4be1b4baeb3e2c92935e12aeb",1.53],["a285bac0811649c4bd4764f6c9119caf",8.41],["0eac70c8cac84f15b5e46851ce51c5e5",2.18],["486216d7019a448fbf09aed81518ae67",2.83],["46f7a82f34024cf693af8f8df8505fea",6.87],["b87b9f7513034736935b12dae710c7fa",2.28],["b0e78a7ae24044508b79b5e7ac39341f",7.8],["69fe97f1042345e1bad620d17d0fc636",4.64],["483e703fff2b4e5b832480f288c05eec",8.54],["7d44a2480bc34e619a0660392cccba4c",2.28],["1c5f163cd5164f9ba038419efec17aa3",7.43]]},"95A":{"p":"de8258e514ca4740a42379260fb23c37","c":"c83f6511c5b34b78b532a9a8f91eaa4b","t":[["6b74e11c4a704f19a226c56b8227c8ca",2.37],["ffb7dcea3df140dc8b4dd0498c5ea50c",4.37],["0255781adb0b4a3391d9332b05068c91",6.97],["6c62f4b2f55a4043b3267389f8145f92",5.34],["8144b14396694c9986d9a383cc5b592e",7.29],["1743cf9bc134407a97b9a319c0308841",4.74],["c9ada8440b104f139eb7a6b3d99591aa",8.5],["96607ad44ea94e57b938e6f60a837fd0",1.21],["ce393a3bd3164c38bae138d2eb7fdc86",9.1],["569be6226243441ea1f146ffa571e6be",1.07],["2e0003148b7b4595b2068149c6912c7d",6.83],["c45352002d404273958c7adac7db21b4",5.8]]},"96A":{"p":"de8258e514ca4740a42379260fb23c37","c":"3d063bc688fe4bc68ee44b17cafbeb7b","t":[["69223ea275674509ba92832bec83cd4a",4.97],["19d04486d9ce45eeb89c6dc837d3908d",3.85],["a4b82ac011804eaabf631486c98152ed",8.45],["84a41bbb5657477091567c03a4428007",4.37],["cb1f05420cfc4a97ad8fad0477534bf1",2.04],["2126a0ba68b84d93a7562329bd2baecf",5.29],["7fd2594b4b2843d5b14fba1be5476255",2.32],["abb66d00efa748dc9f6f8e4cca6becd6",7.48],["b261b86a339f453fa0ea5194b3f903ed",6.18],["d644b544fe764a4ebd059464967edd48",6.08],["30759b2facd24379946a622ead6804f7",4.64],["ea1c090503f843c7b998b4a60b38e978",9.06]]},"97A":{"p":"de8258e514ca4740a42379260fb23c37","c":"b56fc715c6ab4e3fb8add8f95ff8753b","t":[["1fd76fa39d8b4d98aa4086848414dd46",6.36],["7a89f24b76a34a7887be1c62cc238aa1",1.9],["adf8f315affd400dba282884aa316aca",3.85],["c0122c75eb7644e3b6ffd95720bd03ea",7.2],["199001507c7146d1ab479314b584ff94",6.18],["d910382013eb441ba03a586e42180a36",1.67],["0fc13b32d0c24b77870cd1695a5d2448",8.17],["a76eecd3bbdb42fc854750e9bfa68d7d",9.33],["047019caa6b44176a87af4503dfc634b",3.85],["0de9c9abe20c4598b0a572c78af84550",5.62],["ff88e8c848814adc9161e74bb1564367",2.41],["bae772632a6b4fd2862941c2ecc4f294",4.09]]},"98A":{"p":"de8258e514ca4740a42379260fb23c37","c":"d5c9c73c32414248af9a043c3d764f6f","t":[["cd1db34eea024778923e45e44b0e331d",6.5],["0f95c925c54c4ea09ca28b4b1ca2258e",3.3],["993646aefdb041a092a72ca0b1ece728",6.27],["652915c7d1444945b45605e1c0abe377",3.99],["5c1e7a251f8041cdb1e081024f506596",3.81],["7d9cf147bd634279bbfd78604e26f18e",4.5],["1cbd28e5fd68479d8310396f220b411d",5.06],["0cf72ac36c184347aa4400b562a3d890",6.32],["ae57c7474774413b96c2cf23b9181d29",1.58],["a33a3fdef72a44a79ee7d7dd25a7abc2",6.97],["3c630413709e4c4ab46c915300bc53fb",7.71],["5c95b2557c764e9ab0abe4039085423a",4.04]]},"99A":{"p":"de8258e514ca4740a42379260fb23c37","c":"bad20758024d4a829ec691843b29c037","t":[["3ed21372cf9e4a769bfe4b5564a72dc0",5.39],["e54ec59526ce4e98a7377cac2159d7aa",2.55],["6b348d579f3444cfbbcc39cad4987820",5.57],["5778ebae36834cdf9e43cbf2304814c5",10.59],["d3c543e87d9b48cf9694ceeac4710cd6",3.67],["f7df8d942fd54a66809efaea93e291f0",8.27],["68fbf4c9a54048c59b6f663d9bd279c7",8.27],["fb24c03c96834065828f8f714fb106a6",5.43],["c2dbeda700314d389f5f7dc98b5de04a",6.64],["8eb8556cc56648808627e0e6aa5c6e40",3.76],["9cb0c1c0a6874cbfb90bbd696aa41470",3.39],["fa70b3dbc3fe4f6584a27e915dddf9d5",4.27]]},"100A":{"p":"de8258e514ca4740a42379260fb23c37","c":"d46b411be2ff4a2fa9608aea6b650865","t":[["60d86ed2c9ce4dacb005c21bfc5f4170",4.55],["2e42bbdb647344668f08578e1a8f5f6c",6.13],["16a231f14f7d4cf3aac152230d171fa2",3.99],["1b9dceb95ea84425a3b0f65f12ed68b6",1.58],["fde7c5005b0844d6a14a406f03cf6147",9.61],["745040c95e2f43ddbff99303a753806e",1.67],["0a6207a5c79548718b4b3d7ffa9ed87b",7.99],["9e88566518df41d292feba427a9f4103",7.38],["079e8dc92cc9460dbacf310e7e25047e",6.08],["6a82ca5e099348a7b86034d14d89d9b2",11.84],["3d6efd4e480f47b5b4cc512aa26129ac",1.95],["ed0319fcde8442a2af66e934d6b3d7d9",10.36],["10f9b5b37e8d41f38685bdf5dab3e070",3.39]]},"100B":{"p":"de8258e514ca4740a42379260fb23c37","c":"7f51f225f2114065834df0b0a9b4d74a","t":[["b0aded6c6f134c3b9561d9ae3c609594",7.24],["cb94fc4d67cc420b8e507575a81efc35",7.34],["3ab70219d83c4a8a816672b138f8865e",4.88],["3e2b2aab22d04900b0f5b269d38144c5",6.59],["48f6f30a8ad04422bef45d04ac672faf",7.62],["8605a1d9f3e44859b44e6363eb8beb1d",7.34],["29a244eed26a4c1587219f5c380276f6",10.08],["3b9a2ab843f4499dbc05f5697d472989",1.67],["e2aa03e4eb8f43ecac8fc25d7d4a4544",9.85],["78fe741b4e5c4402aef781316f5a6947",6.83],["af7f38a5fadb4b27b9f1441dc1bc8a44",4.32],["5802a00e81a74206a523b7e13859cc33",2.41],["bd803ace0d284a25b259e282bab4037b",4.92]]}};
/* Story voices: one clip per line, streamed from Fish Audio. VO is keyed by quest number + A (the scene) or B (the scene after a boss). */
const VBASE='https://platform.r2.fish.audio/studio_block_audio/',VX={el:null,ok:false};
let SIL=null;function silent(){if(SIL)return SIL;const n=2400,b=new Uint8Array(44+n*2),dv=new DataView(b.buffer),w=(o,t)=>{for(let i=0;i<t.length;i++)b[o+i]=t.charCodeAt(i)};w(0,'RIFF');dv.setUint32(4,36+n*2,true);w(8,'WAVEfmt ');dv.setUint32(16,16,true);dv.setUint16(20,1,true);dv.setUint16(22,1,true);dv.setUint32(24,24000,true);dv.setUint32(28,48000,true);dv.setUint16(32,2,true);dv.setUint16(34,16,true);w(36,'data');dv.setUint32(40,n*2,true);let q='';for(let i=0;i<b.length;i++)q+=String.fromCharCode(b[i]);return SIL='data:audio/wav;base64,'+btoa(q)}
/* Phones only let a sound element play after it was started inside a tap, so the one voice element is started (silently) on the first tap and reused for every line. */
function vxUnlock(){try{if(!VX.el){VX.el=new Audio();VX.el.preload='auto'}if(VX.want){const u=VX.want;VX.want=null;vxPlay(u);VX.ok=true;return}if(VX.ok||(VX.el.src&&!VX.el.paused))return;VX.el.src=silent();VX.el.volume=0;const p=VX.el.play();VX.ok=true;if(p&&p.catch)p.catch(()=>{VX.ok=false})}catch(e){}}
function vxPlay(url){try{if(!VX.el){VX.el=new Audio();VX.el.preload='auto'}const a=VX.el;a.pause();a.src=url;a.volume=[0,.6,1][SV.set.vol]||0;try{a.playbackRate=a.defaultPlaybackRate=F().cine2?SMUL():1}catch(e){}const p=a.play();if(p&&p.catch)p.catch(()=>{VX.want=url;VX.ok=false})}catch(e){}}
function vxStop(){VX.want=null;try{if(VX.el&&!VX.el.paused)VX.el.pause()}catch(e){}}
try{['pointerup','touchend','click'].forEach(e=>window.addEventListener(e,vxUnlock,{passive:true}))}catch(e){}
const cps=b=>b.cps||34;
const TOTAL=180,TITLE=3.5;
function layout(q,lines,after,qi){const fight=!after&&q.k!=='T',B=[],nl=lines.length;let D=0;const NW=F().nowait;lines.forEach(b=>{b.dur=b.vd?b.vd+(NW?.35:.9):2.6+.09*b.line.length;if(b.vd)b.cps=Math.max(12,b.line.length/Math.max(.6,b.vd*.9));D+=b.dur});
 if(NW){B.push({sil:'env',dur:2,dir:qi%2?1:-1});lines.forEach(b=>B.push(b));if(fight)B.push({sil:'spar',dur:8});let t=0;B.forEach(b=>{t+=b.dur});return{B,tot:t}}
 const open=7,big=fight?17:12;let rest=TOTAL-(after?0:TITLE)-D-open-big,extra=0;while(nl&&rest/nl>6.5&&extra<14){extra++;rest-=6}const r=nl?Math.max(0,rest/nl):0,ev=extra?Math.max(1,Math.floor(nl/(extra+1))):0;
 B.push({sil:'env',dur:open,dir:qi%2?1:-1});let used=0;
 lines.forEach((b,k)=>{B.push(b);const last=k===nl-1;if(r>=1.2&&!(fight&&last))B.push({sil:'react',dur:r,k});else if(fight&&last&&r>=1.2)B[0].dur+=r;
  if(extra&&used<extra&&(k+1)%ev===0&&!last){used++;B.push({sil:used%2?'close':'env',dur:6,dir:used%2?1:-1,k})}
  if(!fight&&(k===Math.floor(nl/3)||k===Math.floor(nl*2/3))&&!last)B.push({sil:'walk',dur:6,k});
  if(fight&&k===nl-2)B.push({sil:'stare',dur:5})});
 if(!fight&&nl<3)B.push({sil:'env',dur:12,dir:1});if(extra>used)B.push({sil:'env',dur:6*(extra-used),dir:-1});if(fight)B.push({sil:'spar',dur:12});
 let tot=0;B.forEach(b=>{tot+=b.dur});return{B,tot}}
function startScene(qi,after){const q=QS[qi],lines=(after?q.a:q.s).map(b=>({w:b.w,act:b.act,line:b.line}));if(!q||!lines.length){if(after||q.k==='T'){goto('story')}else startFight(qi);return}
 G.rules={type:'scene',ret:'story'};G.me=0;G.stg=q.st%STAGES.length;G.proj=[];G.fx=[];G.as=[];G.intro=null;G.cine=null;G.msg=null;G.slow=1;G.hitstop=0;G.flash=0;G.impact=0;G.ally=false;G.net&&netClose();
 const V=F().voice1?VO[(qi+1)+(after?'B':'A')]:null;if(V)lines.forEach((b,k)=>{const t=V.t[k];if(t){b.vo=VBASE+V.p+'/'+V.c+'/'+t[0]+'.wav';b.vd=t[1]}});
 const xs=[-150,150,300,-300,440,-440],L=layout(q,lines,after,qi);SC={qi,after,beats:L.B,i:-1,t:0,act:{},list:[],title:after?0:TITLE,left:L.tot,tot:L.tot,ev:[],seen:{},spd:0,card:null};
 q.cast.forEach((ci,k)=>{const f=mkF(ci,xs[k%6],xs[k%6]<=0?1:-1,false);f.side=k%2;f.hx=f.x;f.inv=99;SC.act[ci]=f;SC.list.push(f)});
 const seen={};lines.forEach(b=>{if(b.w>=0&&!seen[b.w]){seen[b.w]=1;const f=SC.act[b.w];if(f&&(b.act==='in'||b.act==='ent'))f.hide=true}});SC.list.forEach(f=>{if(!seen[f.c.ix]&&q.cast.indexOf(f.c.ix)>1)f.hide=true});
 SC.A=SC.list[0];SC.Bf=(q.foe.length&&SC.act[q.foe[0]])||SC.list[1]||SC.list[0];
 G.f=[SC.list[0],SC.list[1]||SC.list[0]];G.al=SC.list.slice(2);G.tm=[{list:[G.f[0]],i:0,sw:0,as:0,an:0},{list:[G.f[1]],i:0,sw:0,as:0,an:0}];
 cam.x=0;cam.y=-300;cam.z=.66;cam.rot=0;G.mode='scene';G.ui=[];G.focus=0;if(!SC.title)nextBeat()}
function vis(){return SC.list.filter(f=>!f.hide)}
function nextBeat(){if(SC.i>=0&&SC.beats[SC.i])SC.left-=SC.beats[SC.i].dur;SC.i++;SC.t=0;SC.ev=[];SC.bl=0;vxStop();if(SC.i>=SC.beats.length)return endScene();const b=SC.beats[SC.i],h=SC.qi*7+SC.i*3;
 if(b.sil){const V=vis(),prev=SC.beats[SC.i-1],ps=prev&&prev.w>=0?SC.act[prev.w]:null;SC.sp=null;
  SC.list.forEach(q=>{if(!q.pers&&!q.hide&&q.wx==null&&(q.state==='pose'||q.state==='win'))q.state='idle'});
  if(b.sil==='env'){SC.kind='env'}
  else if(b.sil==='react'||b.sil==='close'){let f=ps?nearest(ps):V[h%Math.max(1,V.length)];if(!f||f.hide)f=V[0]||SC.list[0];if(b.sil==='close'&&V.length)f=V[h%V.length];SC.foc=f;SC.kind=RCAM[h%RCAM.length];if(SC.kind==='two'&&V.length<2)SC.kind='front';
   const a=['','','cross','','step','','turnback',''][(h>>1)%8];if(a==='turnback'){SC.ev.push([b.dur*.35,()=>{f.face=-f.face}],[b.dur*.75,()=>{const o=nearest(f);if(o!==f)faceO(f,o)}])}else if(a&&!f.pers&&f.wx==null)doAct(f,a)}
  else if(b.sil==='walk'){const f=V.length?V[h%V.length]:SC.list[0];SC.foc=f;SC.kind=V.length>1?'two':'front';if(f.wx==null&&!f.pers){const o=nearest(f),d=o!==f?(o.x>=f.x?-1:1):1,x0=f.x;walkTo(f,clamp(x0+d*90,-560,560));SC.ev.push([b.dur*.5,()=>{if(!f.pers)walkTo(f,x0)}])}}
  else if(b.sil==='stare'){const A=SC.A,Bf=SC.Bf;SC.foc=A;SC.kind='two';[A,Bf].forEach(f=>{if(!f.hide&&f.wx==null){f.pers=0;doAct(f,'draw')}});SC.ev.push([b.dur*.5,()=>{SC.kind='low';SC.foc=Bf.hide?A:Bf}])}
  else if(b.sil==='spar'){const A=SC.A,Bf=SC.Bf,d=b.dur,ok=f=>!f.hide&&f.wx==null,mid=(A.x+Bf.x)/2,sg=A.x<=Bf.x?-1:1;SC.foc=A;SC.kind='two';
   if(A!==Bf&&!Bf.hide){[A,Bf].forEach(f=>{f.pers=0});walkTo(A,mid+sg*70);walkTo(Bf,mid-sg*70);
    SC.ev.push([d*.14,()=>{SC.kind='low';SC.foc=A;if(ok(A))doAct(A,'slash');if(ok(Bf))doAct(Bf,'cross');spark(mid,-95,A.c.col,false);shake(8);sfx('guard')}],[d*.3,()=>{SC.kind='two';if(ok(Bf))doAct(Bf,'slash');if(ok(A))doAct(A,'jump');sfx('hit')}],
     [d*.46,()=>{SC.kind='orbit';SC.foc=Bf;if(ok(A))doAct(A,'slash');if(ok(Bf))doAct(Bf,'jump')}],[d*.6,()=>{SC.kind='two';spark(mid,-95,'#fff',true);G.flash=.35;shake(16);sfx('big');walkTo(A,mid+sg*190);walkTo(Bf,mid-sg*190)}],
     [d*.8,()=>{SC.kind='two';[A,Bf].forEach(f=>{if(ok(f))doAct(f,'aura')})}])}
   else{doAct(A,'draw');SC.ev.push([d*.5,()=>doAct(A,'aura')])}}
  return}
 const f=b.w>=0?SC.act[b.w]:null;SC.sp=f;SC.foc=f;if(b.vo)vxPlay(b.vo);
 SC.list.forEach(q=>{if(q!==f&&!q.pers&&!q.hide&&q.wx==null&&(q.state==='pose'||q.state==='win'))q.state='idle';if(q!==f&&q.wx==null&&!q.hide&&q.state==='idle'){const o=f&&!f.hide?f:nearest(q);if(o!==q)faceO(q,o)}});
 if(f){const act=b.act||(f.hide?'in':NACT[h%NACT.length]);doAct(f,act);if(f.wx==null&&act!=='turn'&&act!=='ent'){const o=nearest(f);if(o!==f)faceO(f,o)}
  if(!SC.seen[f.c.ix]){SC.seen[f.c.ix]=1;SC.card={f,t:0}}
  SC.kind=act==='in'||act==='out'||act==='ent'?'two':act==='aura'||act==='slash'||act==='jump'?'low':act==='shock'||act==='kneel'?'eyes':CAMS[h%CAMS.length];if((SC.kind==='behind'||SC.kind==='two')&&others(f).length<1)SC.kind='front'}else SC.kind='wide'}
const typed=b=>b.line?b.line.length/cps(b):0;
function advance(){if(!SC)return;if(SC.title>0){SC.title=0;nextBeat();return}const b=SC.beats[SC.i];if(b&&b.line&&SC.t<typed(b)){SC.t=typed(b);return}sfx('ui');nextBeat()}
function endScene(){const s=SC,q=QS[s.qi];SC=null;vxStop();G.al=[];if(s.after){goto('story');return}if(q.k==='T'){mark(s.qi);G.note={t:'QUEST '+(s.qi+1)+' CLEAR',T:2.4};sfx('ult');goto('story');return}startFight(s.qi)}
function startFight(qi){const q=QS[qi],boss=q.k==='B',cd=Math.min(2,(qi/34)|0),pw=Math.round((1+qi*.011)*(boss?1.7:1)*100)/100;SC=null;G.al=[];
 begin(()=>({type:'story1',q:qi,team:SV.team.slice(),eteam:q.foe.slice(0,3),stage:q.st%STAGES.length,cd,epw:pw,ret:'story',noIntro:1}))}
let PEND=null;
/* cine2: cutscene speed (x1, x2, x3), kept for the session; voices play at the same speed */
function SMUL(){return clamp(G.smul|0,1,3)}function vxRate(){try{if(VX.el){VX.el.playbackRate=F().cine2?SMUL():1}}catch(e){}}
function sceneStep(rdt){if(!SC)return;if(F().cine2)rdt*=SMUL();const dt=rdt;cam.sh=Math.max(0,cam.sh-rdt*60);
 SC.list.forEach(f=>{f.inv=99;f.hp=f.mhp;if(f.wx!=null){const d=f.wx>f.x?1:-1;f.runP=(f.runP||0)+dt*14;const s=Math.sin(f.runP),c=Math.cos(f.runP);f.state='pose';f.pz=[24,-12,-55+s*8,-15,-72-s*8,-12,s*48+6,-25-40*(.5+.5*c),-s*48+6,-25-40*(.5-.5*c),0,0];f.pvx=d*330;f.face=d;
   if(Math.abs(f.wx-f.x)<=330*dt+2){f.x=f.wx;f.wx=null;f.pvx=0;f.state='idle';if(f.leave)f.hide=true;else{const o=nearest(f);if(o!==f)faceO(f,o);dust(f.x,4)}}}
  if(!f.hide||f.state==='enter')try{stepF(f,nearest(f),dt)}catch(e){f.state='idle';f.mv=null}});
 G.proj.length=0;for(let i=G.fx.length-1;i>=0;i--){const e=G.fx[i];e.t+=dt;if(e.type==='p'){e.vy+=e.g*dt;e.x+=e.vx*dt;e.y+=e.vy*dt}if(e.t>=e.life)G.fx.splice(i,1)}
 let c;if(SC.title>0){SC.title-=rdt;const k=1-clamp(SC.title/TITLE,0,1);c={x:0,y:lerp(-300,-40,ease(k)),z:lerp(.62,.8,k)};if(SC.title<=0){nextBeat();if(!SC)return}}
 else{SC.t+=rdt;let b=SC.beats[SC.i];while(SC&&SC.ev.length&&SC.t>=SC.ev[0][0]){const e=SC.ev.shift();try{e[1]()}catch(x){}}
  if(b&&SC.t>=b.dur){nextBeat();if(!SC)return;b=SC.beats[SC.i]}
  const f=SC.foc&&!SC.foc.hide?SC.foc:null,k=clamp(SC.t/Math.max(3,b.dur),0,1),o=f?nearest(f):null,sp=SC.sp;
  if(b.line&&sp&&!b.vo){const n=(SC.t*34)|0;if(n<b.line.length&&n>=(SC.bl||0)+3){SC.bl=n;sfx('talk',sp.c.style)}}
  if(SC.kind==='env'){const d=b.dir||1;c={x:lerp(-240*d,240*d,ease(k)),y:lerp(-190,-110,k),z:lerp(.82,.9,k)}}
  else if(!f||SC.kind==='wide'){let lo=1e9,hi=-1e9;SC.list.forEach(q=>{if(!q.hide){lo=Math.min(lo,q.x);hi=Math.max(hi,q.x)}});if(lo>hi){lo=-150;hi=150}c={x:(lo+hi)/2,y:-66,z:clamp((W-160)/(hi-lo+300),.7,1.15)+.03*k}}
  else if(SC.kind==='two'){const ox=o===f?f.x:o.x;c={x:(f.x+ox)/2,y:-78,z:clamp((W-220)/(Math.abs(f.x-ox)+240),.85,1.6)+.05*k}}
  else if(SC.kind==='eyes'){const sc=f.c.sc||1;c={x:f.x+f.face*lerp(10,4,k),y:f.y-131*sc,z:lerp(3.1,3.5,k),rot:f.face*.02}}
  else c=shotCam({who:f,kind:SC.kind},k)}
 if(SC.spd>0)SC.spd-=rdt;if(SC.card){SC.card.t+=rdt;if(SC.card.t>2.6)SC.card=null}SC.list.forEach(f=>{if(f.em){f.em[1]+=rdt;if(f.em[1]>1.6)f.em=null}});
 cam.x=c.x;cam.y=c.y;cam.z=c.z;cam.rot=c.rot||0;cam.ay=lerp(GY,H*.46,clamp(c.z-1.1,0,1))}
/* dlg2: all speech in one box at the bottom, with the speaker's face in a square and the words next to it */
function dialog(f,b){const C2=F().cine2,ps=Math.min(64,H*.17),pad=9,bw=Math.min(W-24,760),bh=ps+pad*2,bx=(W-bw)/2,by=H-bh-(C2?10:H*.08+8),fs=17,lh=fs*1.26,tx=bx+(f?ps+pad*2+4:pad+14),mw=bx+bw-14-tx;
 g.save();g.globalAlpha=clamp(SC.t*8,0,1);rr(bx,by,bw,bh,12);g.fillStyle='rgba(8,4,20,.9)';g.fill();g.lineWidth=3;g.strokeStyle=f?f.c.col:'rgba(255,255,255,.55)';g.stroke();
 if(f){const px=bx+pad,py=by+pad,c=f.c;g.save();rr(px,py,ps,ps,8);g.fillStyle=c.col;g.fill();g.clip();const gr=g.createLinearGradient(0,py,0,py+ps);gr.addColorStop(0,'rgba(255,255,255,.28)');gr.addColorStop(1,'rgba(0,0,0,.3)');g.fillStyle=gr;g.fillRect(px,py,ps,ps);
   const talk=SC.t<typed(b)&&((SC.t*9)|0)%2===0;try{drawHead(c,px+ps*.46,py+ps*.5,ps/42,1,f.ex||(talk?'yell':''),0)}catch(e){}g.restore();rr(px,py,ps,ps,8);g.lineWidth=3;g.strokeStyle='#fff';g.stroke();
   txt(c.name,tx,by+pad+9,15,c.col,INK,'left',FB,4)}
 g.font=(f?'700 ':'italic 700 ')+fs+'px '+FU;const ls=wrap(b.line,mw).slice(0,3),y0=f?by+pad+22:by+(bh-ls.length*lh)/2;let n=(SC.t*cps(b))|0;ls.forEach((l,i)=>{const s2=l.slice(0,Math.max(0,n));n-=l.length+1;if(s2)txt(s2,tx,y0+lh*(i+.5),fs,'#fff',INK,'left',FU,3)});
 g.restore()}
function bubble(f,b){const fs=17,mw=Math.min(W*.5,370);g.font='700 '+fs+'px '+FU;const ls=wrap(b.line,mw),lh=fs*1.28;let tw=0;ls.forEach(l=>{tw=Math.max(tw,g.measureText(l).width)});const bw=Math.max(150,tw+34),bh=ls.length*lh+22;
 const sc=f.c.sc||1,hx=W/2+(f.x-cam.x)*cam.z,hy=cam.ay+(f.y-150*sc-cam.y)*cam.z,side=f.face>0?1:-1;let bx=clamp(hx+side*26-(side>0?0:bw),12,W-bw-12),by=hy-bh-22;if(by<52){by=clamp(hy+10,52,H-bh-64);bx=clamp(hx+side*(70*cam.z)-(side>0?0:bw),12,W-bw-12)}by=Math.min(by,H-bh-64);if(by<H*.08+50)bx=Math.min(bx,W-bw-130);
 const pop=Math.min(1,SC.t*9);g.save();g.translate(bx+bw/2,by+bh/2);g.scale(.85+.15*pop,.85+.15*pop);g.translate(-bx-bw/2,-by-bh/2);g.globalAlpha=pop;
 const tx=clamp(hx,bx+22,bx+bw-22),ty=by+bh<hy?by+bh:by,td=by+bh<hy?1:-1;
 g.lineJoin='round';g.beginPath();g.moveTo(tx-11,ty-td*2);g.lineTo(tx+(hx-tx)*.25,ty+td*16);g.lineTo(tx+11,ty-td*2);g.closePath();g.fillStyle='#fff';g.strokeStyle=INK;g.lineWidth=5;g.stroke();
 rr(bx,by,bw,bh,16);g.lineWidth=5;g.strokeStyle=INK;g.stroke();g.fillStyle='#fff';g.fill();g.beginPath();g.moveTo(tx-9,ty-td*3);g.lineTo(tx+(hx-tx)*.25,ty+td*13);g.lineTo(tx+9,ty-td*3);g.closePath();g.fill();
 g.font='20px '+FB;const nw=g.measureText(f.c.name).width+22;rr(bx+12,by-15,nw,24,8);g.fillStyle=f.c.col;g.fill();g.strokeStyle=INK;g.lineWidth=3;g.stroke();txt(f.c.name,bx+12+nw/2,by-2.5,17,'#fff',INK,'center',FB,4);
 let n=(SC.t*cps(b))|0;g.font='700 '+fs+'px '+FU;ls.forEach((l,i)=>{const q=l.slice(0,Math.max(0,n));n-=l.length+1;if(q)txt(q,bx+17,by+12+lh*(i+.5),fs,'#1b1426',null,'left',FU)});g.restore()}
function drawScene(){if(!SC){goto('story');return}g.setTransform(S*dpr,0,0,S*dpr,0,0);G.ui=[];if(cam.rot){g.translate(W/2,H/2);g.rotate(cam.rot);const q=1+Math.abs(cam.rot)*1.9;g.scale(q,q);g.translate(-W/2,-H/2)}drawBG();
 const b=SC.title>0?null:SC.beats[SC.i],sp=b&&b.line&&SC.sp&&!SC.sp.hide?SC.sp:null,top=sp||(SC.foc&&!SC.foc.hide?SC.foc:null),shx=cam.sh?rnd(-cam.sh,cam.sh)*.5:0;
 g.save();g.translate(W/2+shx,cam.ay);g.scale(cam.z,cam.z);g.translate(-cam.x,-cam.y);
 SC.list.forEach(f=>{if(f.hide)return;const k=clamp(1+f.y/400,.3,1);g.fillStyle='rgba(10,0,30,.45)';g.beginPath();g.ellipse(f.x,4,38*k,8*k,0,0,TAU);g.fill()});
 SC.list.forEach(f=>{if(f!==top)drawFighter(f)});if(top)drawFighter(top);drawFX();
 SC.list.forEach(f=>{const e=f.em;if(!e||f.hide)return;const sc=f.c.sc||1,t=e[1],x=f.x+f.face*26,y=f.y-170*sc,al=clamp((1.6-t)*3,0,1),pop=Math.min(1,t*8);g.save();g.globalAlpha=al;g.translate(x,y);g.scale(pop,pop);
  if(e[0]==='!'){g.rotate(f.face*.15);poly([[-9,-30],[9,-30],[5,2],[-5,2]],'#ffe14d',INK,3);circ(0,12,6,'#ffe14d',INK,3);for(let i=0;i<5;i++){const a=-Math.PI/2+(i-2)*.5;g.strokeStyle='#fff';g.lineWidth=3;g.beginPath();g.moveTo(Math.cos(a)*38,Math.sin(a)*38-8);g.lineTo(Math.cos(a)*52,Math.sin(a)*52-8);g.stroke()}}
  else if(e[0]==='sweat'){g.translate(0,10+t*14);g.beginPath();g.moveTo(0,-14);g.quadraticCurveTo(10,2,0,8);g.quadraticCurveTo(-10,2,0,-14);g.fillStyle='#9fe3ff';g.fill();g.strokeStyle=INK;g.lineWidth=2.5;g.stroke()}
  else{for(let i=0;i<3;i++){const a=t*3+i*2.1,px=Math.cos(a)*22,py=Math.sin(a)*12-10-i*8,r=6+2*Math.sin(t*9+i);poly([[px,py-r],[px+r*.3,py-r*.3],[px+r,py],[px+r*.3,py+r*.3],[px,py+r],[px-r*.3,py+r*.3],[px-r,py],[px-r*.3,py-r*.3]],'#fff6a0',INK,1.5)}}
  g.restore()});
 g.restore();drawFG();g.setTransform(S*dpr,0,0,S*dpr,0,0);
 if(top&&SC.kind==='behind'){const o=nearest(top);if(o!==top&&!o.hide)drawOTS(o,clamp(SC.t/4,0,1))}
 if(SC.spd>0){const al=clamp(SC.spd*2.2,0,1)*.3,cx=W/2,cy=H*.46,fr=(G.t*24)|0,R1=Math.max(W,H);g.save();g.globalAlpha=al;g.fillStyle='#fff';for(let i=0;i<40;i++){const a=i*TAU/40+Math.sin(i*91+fr)*.08,r0=R1*(.3+((i*37+fr*13)%17)/60);g.beginPath();g.moveTo(cx+Math.cos(a)*r0,cy+Math.sin(a)*r0);g.lineTo(cx+Math.cos(a-.012)*R1,cy+Math.sin(a-.012)*R1);g.lineTo(cx+Math.cos(a+.012)*R1,cy+Math.sin(a+.012)*R1);g.fill()}g.restore()}
 const lbx=SC.kind==='eyes'&&SC.title<=0?.2:.08;SC.lb=lerp(SC.lb||.08,lbx,.18);const C2=F().cine2;g.fillStyle='#05020c';if(!C2){g.fillRect(0,0,W,H*.08);g.fillRect(0,H-H*.08,W,H*.08);if(SC.lb>.085){g.fillRect(0,0,W,H*SC.lb);g.fillRect(0,H-H*SC.lb,W,H*SC.lb)}}
 if(SC.card&&SC.title<=0&&!SC.card.f.hide){const cd=SC.card,c=cd.f.c,t=cd.t,k=ease(clamp(t*4,0,1))*clamp((2.6-t)*4,0,1),y=F().dlg2?H*.46:H*.74,w=Math.min(300,W*.4),x=-w+k*(w+0);g.save();g.globalAlpha=clamp(k*1.4,0,1);g.beginPath();g.moveTo(x,y);g.lineTo(x+w,y);g.lineTo(x+w-22,y+52);g.lineTo(x,y+52);g.closePath();g.fillStyle=c.col;g.fill();g.strokeStyle=INK;g.lineWidth=4;g.stroke();g.fillStyle='rgba(10,4,24,.35)';g.fillRect(x,y+34,w-14,18);txt(c.name,x+16,y+19,30,'#fff',INK,'left',FB,7);txt(c.title.toUpperCase(),x+16,y+43,12,'#fff',INK,'left',FU,3);g.restore()}
 if(G.flash>0){g.fillStyle='rgba(255,255,255,'+Math.min(.85,G.flash)+')';g.fillRect(0,0,W,H)}
 const q=QS[SC.qi];
 if(SC.title>0){const al=clamp(Math.min((TITLE-SC.title)*3,SC.title*3),0,1),fs=Math.min(58,W*.08);g.save();g.globalAlpha=al;txt('CHAPTER 1  ·  QUEST '+(SC.qi+1),W/2,H*.3,fs*.34,'#ffd58a',INK,'center',FU,4);g.save();g.translate(W/2,H*.3+fs*.72);g.rotate(-.02);txt(q.t.toUpperCase(),0,0,Math.min(fs,W*.9/(q.t.length*.56)),'#fff',INK,'center',FB,10);g.restore();txt(STAGES[G.stg].name+'  ·  '+(q.k==='T'?'STORY':q.k==='B'?'BOSS FIGHT':'FIGHT'),W/2,H*.3+fs*1.5,fs*.3,q.k==='B'?'#ff9aa6':'#7fdcff',INK,'center',FU,4);g.restore()}
 else if(b){if(b.line){if(F().dlg2)dialog(sp,b);else if(sp)bubble(sp,b);else{const fs=18,mw=Math.min(W*.8,640);g.font='italic 700 '+fs+'px '+FU;const ls=wrap(b.line,mw),lh=fs*1.3,bh=ls.length*lh+20,by=H*.9-bh,bw=mw+44,bx=(W-bw)/2;g.save();g.globalAlpha=clamp(SC.t*5,0,1);rr(bx,by,bw,bh,10);g.fillStyle='rgba(6,3,16,.8)';g.fill();g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=1.5;g.stroke();let n=(SC.t*cps(b))|0;ls.forEach((l,i)=>{const s2=l.slice(0,Math.max(0,n));n-=l.length+1;g.font='italic 700 '+fs+'px '+FU;if(s2)txt(s2,W/2-g.measureText(l).width/2,by+10+lh*(i+.5),fs,'#fff',INK,'left',FU,3)});g.restore()}}
  const left=Math.max(0,SC.left-SC.t),mm=(left/60)|0,ss=('0'+((left|0)%60)).slice(-2);if(!C2)txt((SC.qi+1)+'. '+q.t.toUpperCase()+'   ·   '+mm+':'+ss,14,H*.04,12,'#e6dcff',null,'left',FU);
  if(!C2){g.fillStyle='rgba(255,255,255,.18)';g.fillRect(0,H*.08-3,W,3);g.fillStyle='#ffe14d';g.fillRect(0,H*.08-3,W*clamp(1-left/SC.tot,0,1),3)}
  if(!SC.after&&q.k==='T'&&left<3.2){g.save();g.globalAlpha=clamp((3.2-left)*1.5,0,1);g.translate(W-22,F().dlg2?H*.56:H*.82);g.rotate(-.03);txt('TO BE CONTINUED  ▶',0,0,24,'#fff',INK,'right',FB,7);g.restore()}
  if(!C2)txt(lastDev==='touch'?'PLAYING  ·  TAP TO GO FASTER':'PLAYING  ·  CLICK OR PRESS ENTER TO GO FASTER',W/2,H-H*.04,11,'#e6dcff',null,'center',FU)}
 const sk={x:W-118,y:C2?10:H*.08+8,w:104,h:34};hit(sk.x,sk.y,sk.w,sk.h,()=>{if(SC)endScene()});g.save();g.beginPath();g.moveTo(sk.x+8,sk.y);g.lineTo(sk.x+sk.w,sk.y);g.lineTo(sk.x+sk.w-8,sk.y+sk.h);g.lineTo(sk.x,sk.y+sk.h);g.closePath();g.fillStyle='rgba(10,4,24,.78)';g.fill();g.strokeStyle='#fff';g.lineWidth=2.5;g.stroke();txt('SKIP  »',sk.x+sk.w/2,sk.y+sk.h/2+1,18,'#ffe14d',INK);g.restore();
 if(C2){const sp={x:sk.x-78,y:sk.y,w:70,h:34};hit(sp.x,sp.y,sp.w,sp.h,()=>{G.smul=SMUL()%3+1;vxRate();sfx('ui')});g.save();g.beginPath();g.moveTo(sp.x+8,sp.y);g.lineTo(sp.x+sp.w,sp.y);g.lineTo(sp.x+sp.w-8,sp.y+sp.h);g.lineTo(sp.x,sp.y+sp.h);g.closePath();g.fillStyle='rgba(10,4,24,.78)';g.fill();g.strokeStyle='#fff';g.lineWidth=2.5;g.stroke();txt('x'+SMUL(),sp.x+sp.w/2,sp.y+sp.h/2+1,18,'#7fdcff',INK);g.restore()}
 else hit(0,0,W,H,advance)}
function drawStory1(){if(PEND!=null){const p=PEND;PEND=null;if(QS[p].a.length){startScene(p,true);return drawScene()}}
 scr();const dn=done();if(G.spg==null)G.spg=Math.min(9,(dn/10)|0);G.spg=clamp(G.spg|0,0,9);if(G.sfo!==dn){G.sfo=dn;if(G.spg===((dn/10)|0))G.focus=dn%10}const pg=G.spg,gap=8,bw=Math.min((W-(F().sarrow?148:40))/2,430),bh=Math.min(54,(H-150)/5-gap),x0=(W-(bw*2+gap))/2,y0=92;
 txt('CHAPTER 1  ·  PART '+(pg+1)+':  '+ARCS[pg],W/2,72,17,'#ffe14d',INK,'center',FB,5);
 for(let k=0;k<10;k++){const i=pg*10+k,q=QS[i];if(!q)break;const x=x0+(k%2)*(bw+gap),y=y0+(k/2|0)*(bh+gap),open=i<=dn,cl=i<dn,col=q.k==='T'?'#3fa9ff':q.k==='B'?'#ff3d5a':'#ffb020';
  const foc=hit(x,y,bw,bh,()=>{if(open)startScene(i,false);else G.note={t:'Clear quest '+(dn+1)+' first',T:2}});
  g.save();rr(x,y,bw,bh,10);g.fillStyle=open?'rgba(10,4,24,.74)':'rgba(10,4,24,.4)';g.fill();g.strokeStyle=foc?'#ffe14d':open?col:'rgba(255,255,255,.2)';g.lineWidth=foc?4:2;g.stroke();g.globalAlpha=open?1:.45;
  const hc=CH[q.k==='T'?q.cast[q.cast.length>1?1:0]:q.foe[0]];g.save();g.beginPath();g.rect(x+4,y+4,48,bh-8);g.clip();drawHead(hc,x+28,y+bh/2+5,Math.min(1.45,bh/38),1,'');g.restore();
  txt((i+1)+'. '+q.t.toUpperCase(),x+60,y+bh*.36,Math.min(18,(bw-150)/(q.t.length*.55+2)),'#fff',INK,'left');
  g.font='700 10.5px '+FU;const tag=q.k==='T'?'STORY':q.k==='B'?'BOSS':'FIGHT',tw=g.measureText(tag).width+12;rr(x+60,y+bh*.58,tw,15,4);g.fillStyle=col;g.fill();txt(tag,x+60+tw/2,y+bh*.58+8,10.5,'#10061e',null,'center',FU);
  txt(q.k==='T'?q.cast.map(c=>CH[c].name).join(', '):'vs '+q.foe.map(c=>CH[c].name).join(', '),x+68+tw,y+bh*.58+8,11,'#cbbfe6',null,'left',FU);
  txt(cl?'CLEAR':open?'PLAY':'LOCKED',x+bw-12,y+bh*.5,14,cl?'#7fdcff':open?'#ffe14d':'#aaa',INK,'right');g.restore()}
 const py=y0+5*(bh+gap)+2;if(F().sarrow){const ah=64,ay=y0+(5*(bh+gap)-gap)/2-ah/2,lx=Math.max(6,x0-56),rx=Math.min(W-52,x0+bw*2+gap+10);button(lx,ay,46,ah,'‹','#3a2a5e',()=>{G.spg=((G.spg|0)+9)%10},34);button(rx,ay,46,ah,'›','#3a2a5e',()=>{G.spg=((G.spg|0)+1)%10},34);txt(((G.spg|0)+1)+' / 10',W/2,py+16,15,'#fff',INK,'center',FU,3)}else pager(W/2-78,py,'spg',10);txt(dn+' / '+QS.length+' quests cleared  ·  fights use your team from TEAMS',W/2,py+44,12,'#e6dcff',null,'center',FU);hdr('STORY','menu')}
/* ---------- hooks ---------- */
{const s0=SCR.story;SCR.story=function(){if(F().story1)drawStory1();else if(s0)s0()};SCR.scene=drawScene;BACK.story='menu';BACK.scene='story'}
{const u0=update;update=function(rdt){u0(rdt);if(G.mode==='scene')sceneStep(rdt);musicTick()}}
{const e0=exprOf;exprOf=function(f){if(G.mode==='scene'&&SC){const b=SC.beats[SC.i];if(SC.title<=0&&b&&b.line&&SC.sp===f&&(b.vd?SC.t<b.vd:SC.t*34<b.line.length))return Math.sin(G.t*18)>0?'talk':(f.ex||'');if(f.ex)return f.ex;if(f.state==='pose'||f.state==='idle')return f.at%3.3<.1?'blink':''}return e0(f)}}
{const m0=menuAct;menuAct=function(a){if(G.mode==='scene'&&SC){if(a==='ok')advance();else if(a==='back'){SC=null;G.al=[];vxStop();goto('story')}return}m0(a)}}
{const f0=finish;finish=function(win){const r=G.rules;f0(win);if(r&&r.type==='story1'&&win){mark(r.q);if(G.res)G.res.sub='QUEST '+(r.q+1)+' CLEAR';if(QS[r.q].a.length)PEND=r.q}}}
{const r0=rlab;rlab=function(){const r=G.rules;return r&&r.type==='story1'?'QUEST '+(r.q+1)+(QS[r.q].k==='B'?'  ·  BOSS':''):r0()}}
})();
