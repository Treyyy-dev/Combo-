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
/* flag "jpstory": story lines shown in Japanese when SUBTITLES is set to JAPANESE in Configure. Same order as the script, keyed like VO. */
const JS={"1A":["空が裂けたあの夜、古い神社の裏に星がひとつ落ちた。","あれは流れ星じゃない。神社のすぐ裏に落ちた。","あんたも見たの、嵐の剣？よかった。ひとりで追いかけるのは嫌いなんだ。","リンか。当ててやろう。競争したいんだな。","晩ごはんの途中で空がぜんぶ光ったんだよ。ちなみに、ラーメン一杯おごりだからね。","星を落としたのは俺じゃないぞ、リン。","でも、そこで真面目な顔して立ってるのはあんたでしょ。それで十分。","木立のほうを見ろ。まだあそこで光っている。落ちたものが何であれ、消えていない。","師匠が言ってた。流れ星は願いをひとつ叶えてくれるって。あたしの願いはもう決まってる。","もう一度当てよう。最強になること、だろう。","最強になること、それと、かけっこでついにあんたに勝つこと。願いはふたつ。あたしは欲張りなの。","先に触ったほうのもの！ついてきなよ！"],"2A":["予定変更。あんたが地面に転がってれば、あたしが先に着く。","競争のはずだった。戦いじゃない。違いは覚えているか？","競争なんて、誰も殴られない戦いでしょ。口に出すとつまんなく聞こえるね。","一年中、口実を待っていたんだろう。","春祭りからずっとね。村じゅうの前であたしに勝って、それからおじぎした。おじぎしたんだよ、カイト！","おじぎは礼儀だ。","相手が田んぼに顔から突っこんでるときにおじぎするのは失礼なの！","…わかった。それは認めよう。","だから今夜、流れ星の下で借りを返す。それから何が落ちたか見に行く。","また俺が勝ったら？","そしたら神社までおぶってよ。腹が立って歩けないから。","戦いたいと素直に言えばよかったのに。"],"3A":["聖なる石の上でうるさい足音。神社はうるさい足音が嫌いなんだ。","この神社にまだ守り手がいたとは知らなかった。神主たちは何年も前に去ったはずだ。","神主は去る。狐は残る。最初の石が置かれる前からここにいたし、最後の石が崩れたあともここにいるよ。","なら、落ちてくるのを見たんだな。","空が古い紙みたいに破れるのを見た。冷たい何かがボクの庭に落ちるのも見た。そのあとで足音が聞こえた。","それは俺だ。騒がせてすまない。","すまない、はただの言葉だよ。神社は証を好むんだ。三百年分の客が来て、みんな何かを欲しがった。","俺はあれが何なのか知りたいだけだ。","前に来た男もそう言って、鐘を持ち去ろうとした。さあ、礼儀を見せてごらん、嵐の小僧。","礼儀なら問題ない。今夜足りないのは我慢のほうだ。","ああ、よかった。楽しい相手だといいなと思ってたんだ。","ここに何かが落ちた。どいてくれれば静かに済ませる。"],"4A":["岩じゃない。ガラスだ。それに、鳴っている。","冷たい！なんで星が冷たいの？","星ではなかったからです。どうか、それを置いてください。","君は？","ユキです。氷の封印の守り手。そのかけらは封印の一部です。","あたしの手くらいの大きさだよ。あれだけ光って、あれだけうるさくて、こんなに小さいの？","小さくても重いものはある。持ってみろ。見た目よりも強く下に引かれている気がする。","ほかのかけらに引かれているのです。もう一度ひとつになりたがっている。だから、こんなに早くあなたたちを見つけられました。","待って。暗い中、感じだけを頼りに山を下りてきたの？","九つのときからあの封印を守ってきました。その声なら、どこにいてもわかります。","なら、何を封じていたのか知っているんだな。","知っています。できれば、壁と火のある場所に着いてからお話ししたいです。","今夜、封印が砕けました。十のかけらが各地に落ちたのです。これはそのひとつにすぎません。"],"5A":["かけらを運ぶつもりなら、手放さずにいられると見せてください。","戦いを楽しむ人には見えないな。","楽しみません。私が好きなのは静けさと、雪と、誰かがいれてくれたお茶です。これはそのどれでもありません。","なら、なぜ俺を試す？返してくれと言えば済む話だ。","よそ者を信じてかけらを預けた最後の守り手のせいで、ほかの守り手はもういないからです。","…そうか。","あなたが盗人だと言っているのではありません。あなたを見誤るわけにはいかない、と言っているのです。今夜だけは。","なら手加減はするな。君を相手に守りきれないなら、俺が持つべきじゃない。","空が砕けてから聞いた中で、初めてのまともな言葉です。","リンは見逃して悔しがるだろうな。","リンさんはどちらにしても悔しがると思います。それを楽しんでいるようですから。","たしかに。奪ってみろ。"],"6A":["封印は、あるものを眠らせていました。かけらがひとつ失われるたび、それは少しずつ目を覚まします。","じゃあ十個ぜんぶ見つけて、封印をくっつければいいんでしょ。簡単。","簡単ではありません。落ちるのを感じた者はほかにもいます。もう狩りは始まっています。","なら、俺たちがもっと速く狩る。次はどこだ？","南です。動いているのを感じます。誰かが運んでいます。","どうやって見つけるの？十の方向を一度に感じて追うなんて無理でしょ。","かけらはそれぞれ、少しずつ違う歌を歌います。いちばん近いものが、いつもいちばん大きく聞こえる。ひとつずつ行きましょう。","かけらを狙っている連中は、何者だ？","盗賊。収集家。星のかけらで強くなれると思っている人たち。そして、それが何なのかを正確に知っている少数の者。","その最後のやつらが問題っぽいね。","そうです。誰かが封印を砕こうとしたのです。星はひとりでには落ちません。","なら、これはただの狩りじゃない。これを始めた何者かとの競争だ。","競争！ほらね、カイト？今夜は競争だって言ったでしょ。","やっぱり追いかけっこだ！今夜は楽しくなるってわかってた。"],"7A":["光るものはカラスのものだ。よこしな、嵐の坊や。","早いな。まだ神社を出てもいないのに、もう誰かが狙いに来た。","カラスは嵐の前を飛ぶんだよ、坊主。港の道から落ちるのを見た。地面に着く前にはもう歩き出してたさ。","それが何なのかも知らないくせに。","光ってるのは知ってる。三人が守ってるのも知ってる。光るものに金を払う男が街にいるのも知ってる。","怪我をする理由にしては薄いな。","もっと薄い理由で怪我したこともある。去年の冬はスプーン一本で男とやり合った。いいスプーンだったがな。","…勝ったのか？","スプーンはまだ持ってる。で、取引だ、嵐の坊や。そのガラスをよこせば、剣は持ったまま帰っていい。","こっちの条件はこうだ。今すぐ去れば、スプーンは持ったままでいい。","ついばみに来い。"],"8A":["登ってくる途中で、わたしの花を踏みつぶしたでしょう。拳で謝りなさい。","花？花なんて見なかったよ。暗かったし、走ってたし！","白い月見花よ。東の道にずっと植えてあったの。四十本。あなたが通ったあと、残りを数えたわ。","…何本残ってる？","六本。","あ。ああ、やっちゃった。それは本当にごめん。ここを世話してる人がいるなんて知らなかった。","どんな場所にも世話をする誰かがいるの。どこでも走り回る人が気づかないことよ。","植え直すの手伝うよ！穴掘りは得意なんだ。修行用の穴をまるごとひとつ掘ったことあるし。","ふうん。それはあとでね。まずは、その足が踏みつぶす以外の役に立つのか見せてもらうわ。","踊りたいの？あたしが知ってる踊りはひとつだけで、ほとんどパンチだよ。","やっと話の通じる相手が来た！"],"9A":["その夜、かけらはずっと鳴りやまなかった。","ささやいている。聞こえるか？","聞いてはいけません。あれは彼女です。封印が閉じこめていた者。","彼女って誰？落ち着いた声で怖いことばっかり言うよね。","ノヴァ。虚無の女帝です。彼女が完全に目覚めれば、空は永遠に暗くなります。","何て言ってるの？あたしには耳鳴りみたいな音しか聞こえない。鐘を鳴らしたあとみたいな。","言葉というわけじゃない。井戸の底から誰かが呼んでいるような感じだ。俺の名前を知っている。","誰の名前でも知っています。それが彼女のやり方です。あなたの望みを見つけて、それをそのまま言い返してくるのです。","気味悪い。あたしの望みは何だって言ってるの？","知るには耳を傾けるしかありません。どうか、やめてください。","どのくらい封じられていたんだ、ユキ？","千年です。ほとんどの人が、ただのおとぎ話だと思うようになるほど長く。","じゃあ、完全に目覚めるまではどのくらい？","かけらを離して安全に守れば、何年も。誰かが集めてしまえば、数日です。","なら眠らせておく。簡単な話だ。"],"10A":["ちょうちんみたいに持っているな。どうりで、すぐに見つかったわけだ。","誰に雇われている？","神社の石段からずっとつけていたな。屋根を三つ数えた。","四つだ。鐘楼を見落としている。炎の娘はもう少しで見上げるところだったが、屋台に気を取られた。","それはいかにもリンらしい。","お前はこの仕事に向いていない。立ち止まって話をする。煙が誰にでも見える場所で野営する。かけらを手紙みたいに上着に入れている。","お前ならもっとうまくやれる、と。","俺なら夜に、ひとりでやる。見つかったことすら誰にも知られない。それが、こいつらを安全に保つただひとつの方法だ。","彼女から守るためか。それとも、お前のためか？","…思ったよりいい質問をする。だが、何も変わらない。","変わるかもしれない。終わったら聞かせろ。","誰にも。だから、お前が恐れるべきなのは俺だけだ。"],"10B":["悪くない。だが、まばたきをしたな。かけらは俺が街へ持っていく。","一時間ひとりにしただけだよ！たった一時間で、黒ずくめの男にたったひとつのかけらを持っていかれるなんて！","速かったんだ、リン。今まで戦った誰よりも。","ひどい怪我ではありませんね。よかった。それに、彼は山のほうへは逃げませんでした。街のほうへ走ったのです。","それっていいこと？悪いこと？","いいことです。ネオン街には隠れる場所が千はありますが、ここから入る道は一本だけです。","誰にも見つからない場所にしまう、と言っていた。盗人のようには聞こえなかった。怯えているように聞こえた。","怯えてる人だって物は盗むよ、カイト。","そして、話が通じる相手でもあります。かけらが動いているのを感じます。ゆっくりです。もう走ってはいません。","じゃあ荷物をまとめて歩こう。ずっと街を見てみたかったんだ。ラーメンが最高らしいし。","奴は消えた。かけらもだ。リン、ユキ、ネオン街へ行くぞ。"],"11A":["足取りはネオン街へ続いていた。決して明かりの消えない街だ。","看板だらけ。みんなどうやって寝てるの？","寝ないのさ。だからこそ、幻影が堂々と隠れていられる。","じゃあ聞いて回ろう。大声で。誰かしら何か知ってるもんだよ。","それが作戦のすべてか？","あれ見て！猫だよ、手を振ってる、しかも三階建ての高さ。なんで手を振ってるの？","広告だ、リン。何かを買わせたいんだ。","効いてる。あの巨大猫が売ってるもの、なんでも欲しい。","集中しろ。ユキによれば、かけらは東側のどこかで止まった。","そういえばユキはどこ？","屋根の上で耳を澄ませている。街がうるさすぎて、かけらの音がほとんど聞こえないそうだ。","つまり巫女は空の声を聞いて、あたしたちは足で稼ぐ。公平だね。足で稼ぐのは好きだよ。","失敗したことないんだ。だいたいは。"],"12A":["情報が欲しい？アタシのハイスコアを超えてみな。ハイスコアってのは、床に転がったアンタのことだけど。","黒ずくめの男を見なかったか知りたいだけ。背が高くて、無口で、何かに遅刻しそうな歩き方のやつ。","お姉さん、ここはネオン街だよ。それ、うちの客の半分だって。","今夜ここを通ったはずなんだ。光るものを持って。","ここにあるものは全部光るよ。それが商売のすべてだからね。","あんまり役に立ってくれないね。","コインの一枚も買わずにうちのゲーセンに入ってきたよそ者には、ちょうどこれくらいの親切がお似合いだよ。","わかったよ！コイン一枚いくら？","アンタなら？一勝負。勝ったほうが答えをもらう。こっちには光を撃つクロスボウと、すごく退屈な夜があるんだ。","あのさ、あたしの故郷じゃ、普通に「こんにちは」って言うんだけど。","この街、もう気に入った。"],"13A":["わたしのショーで割りこみは禁止！ちなみに警備はわたしだから。","列があるのか？列など見えなかったが。","列はいつだってあるの！四百人がお昼から待ってるのに、あなたはまっすぐ楽屋口に来たでしょ。","人を探している。この建物の裏を通ったと聞いた。","はいはい。楽屋口ではみんないつも誰かを探してるの。たいていはわたしをね。","君じゃない。","…うわ。そう。そんなに即答しなくてもいいのに。","そういう意味じゃない。ショーはきっと素晴らしいんだろう。","この街で一番のショーよ。そしてあなたは今から貸し切り公演を受けるの。ライト！誰かライトをつけて！","本当に道を聞きたかっただけなんだが。","道を聞いただけだぞ。"],"14A":["壁を通り抜ける黒ずくめの男を探してるのかい？扉をひとつ知ってるかもしれないよ。","それはいくらだ？","一勝負。君が勝てば話す。俺が勝てば、そのいい剣をもらう。","カイト、やめときな。あいつ、笑いすぎ。","なんであいつのこと知ってるの？ここに来た理由なんて、この街の誰にも話してないのに。","話す必要はなかったさ。嵐の剣を持った田舎の少年と、ゲーセンの店主を殴った娘だろう？噂は広まるものさ。","なら奴の噂も広まっているはずだ。どこにいる？","ネオン街で絶対に安売りされないもの、それが情報だよ、友よ。","お金ならあるよ。ちょっとは。カイト、あたしたちいくら持ってる？","ラーメン代には足りる。あいつには足りない。","どのみち小銭はいらない。小銭は退屈だ。今夜、卓で語れる話が欲しいのさ。","どんな話になるのか、嫌な予感しかしない。","乗った。ただし、勝負は俺の流儀でやる。"],"15A":["カードの代わりに刃かい？それも数えられるよ。","もう負けてるってわかってるかい？俺は仕込みのない勝負の席についたことが一度もないんだ。","これは仕込める勝負じゃない。剣の戦いに、袖に隠すカードはない。","袖に何が入るか知ったら驚くよ。","なぜ剣が欲しい？剣士には見えないが。","違うとも。だが、君たちの幻影を狩っている男は剣士でね、嵐の鋼には実にいい値を払うんだ。","ほかにもゼロを追っている者がいるのか？","おや、知らなかったのか。それは愉快だ。これで賭けはお互いに面白くなった。","誰だ？","勝てば教えよう。負ければ、君の剣を受け取りに来たときに本人に聞くといい。","これを数えてみろ。"],"16A":["ネオンの上では、街はほとんど静かだった。","封印が弱まるのを感じるべきでした。私は守り手だったのに。何も感じなかった。","君は今ここにいる。そのほうが大事だ。","そう言えるほど、あなたは私を知りません。","直すために、見知らぬ者を追って山を下りてきたことは知っている。それで十分だ。","いつからここにいる？","日が沈んでからです。この街で、自分の考えが聞こえるのはここだけですから。","リンが、絶対に閉まらないラーメン屋台を見つけた。ここに引っ越すつもりだと思う。","彼女なら一週間でこの街をまるごと燃やしてしまいます。うっかりと。","おそらくな。ユキ、あの賭博師が言っていた。ほかにもゼロを狩っている者がいる。嵐の鋼に金を払う者だ。","なら、少なくとも三つの勢力がいることになります。私たち、幻影、そしてその両方を狙う何者か。","それで何か変わるのか？","ゼロを敵として扱うのをやめる、ということです。封印を砕いた者こそが敵。ほかの人はみな、怯えているだけです。","…ありがとうございます。ゼロはこの下です。東へ通り三つ。"],"17A":["再戦だよ！それと、照明のいい友達を連れてきた。","ゲーセンで決着はついたはずだ。劇場でも。","決着をつけたのはアンタ。アタシたちは、つけられることに同意してないよ。","それに、あなたたちを足止めした人に大金を払うって人がいるの。家賃があるのよ。ステージの照明はタダじゃないんだから。","誰が払っている？","襟に虎のピンをつけた男。すごく礼儀正しくて、すごく怖いの。一度もまばたきしなかった。","朝まで足止めしろってさ。理由は言わなかった。","朝まで、か。つまり今夜、何かが起きる。","ほら、もう申し訳なくなってきた。いい人そうだし。ニコ、これまだやらなきゃだめ？","前金はもう使っちゃったよ。","なら手早く済ませよう。虎より先に幻影を見つけなければならない。","二人がかりか。それでほぼ公平だな。"],"18A":["炎の娘が殴りながら俺の街を横断してるって噂でね。見ずにはいられなかった。","あんたの街？ここはあの手を振る巨大猫のものだと思ってた。","看板は猫のもの。リングは俺のものだ。ボルトアリーナ、六年無敗。","六年！誰と戦ってきたの、店屋のおじさん？","四つの国のチャンピオンたちだ。それと、すごく怒った店主がひとり、たしかにいた。","あんた気に入った。あたしに何の用？","新顔には誰にでも求めるものさ。いい勝負。理由も恨みもなしで。そういうのは珍しくなってきた。","今夜はお金目当てで襲ってくるやつばっかり。ただ戦いたいだけなのは、あんたが初めてだよ。","金は勝負をつまらなくする。来いよ、炎の娘。火口で何を教わるのか見せてくれ。","なんであたしが火口の出だってわかったの？","ブーツに灰がついてるし、ずっと笑ってる。そんなふうに笑うやつはほかにいない。","じゃあ間近で見せてあげる！"],"19A":["もう逃げるな。なぜかけらを欲しがる？","お前と同じ理由だ。彼女を止めるため。","なら、なぜ俺たちから盗んだ？","最後にかけらを守ろうとしたのは、俺の家族だったからだ。虚無が通りごと飲みこんだ。","守り手は信じない。信じるのは距離だ。","見つけたか。虎に雇われた拳を抜けてくるとは思わなかった。","あまり本気じゃなかった。虎のピンの男は何者だ？","勧誘係だ。砂漠の軍のために働いている。奴らはすべてのかけらと、それに触れた者すべてを欲しがっている。","お前も含めて、か。","特に俺だ。ふたつ持ち歩いていたからな。","ふたつ？俺たちのを奪う前から、ひとつ持っていたのか。","俺は長いことこれを続けている、嵐の小僧。お前がかけらの存在を知るよりずっと前から。","なら、お前は俺たちより多くを知っている。それは力になる。","なら、これを信じろ。俺は同じものを二度は失わない。"],"20A":["証明しろ。ここで倒れるなら、かけらは俺が持つほうが安全だ。","倒れなかったら？","安全、安全と言い続けているな。疲れているだろう、ゼロ。見ればわかる。最後に眠ったのはいつだ？","眠ると、彼女の声がいちばん大きくなる。眠りを好まなくなった。","なら、ひとりで続けるのは無理だ。遅かれ早かれしくじって、虎にふたつとも奪われる。","三人なら、ひとりより奪われにくいとでも？","三人なら、交代で起きていられる。","…そういうことを言う兄がいた。単純で、腹が立つほど正しいことを。","その兄はどうなった？","かけらを守っていた。結末は話したとおりだ。","なら、別の結末があると見せてやる。一勝負だ。持てるすべてで来い。","そのときは、俺が間違っていたことになる。そうであってほしい。"],"20B":["…持っていけ。これもだ。ふたつ目のかけら。お前たちを見つける前に見つけた。","いたいた！六つ先の通りまで雷が聞こえたよ。こいつ？こいつが幻影？","ゼロだ。もう仲間だ。たぶん。","同意した覚えはない。","かけらをふたつ渡して、まだここに立ってるでしょ。それが同意だよ。","かけらがふたつ。両方ともはっきり聞こえます。よく守ってくれましたね、ゼロ。静かにしています。","…そんなことを言われたのは初めてだ。たいていは、どこで手に入れたかしか聞かれない。","そのひとつをどこで手に入れたかは知っています。あなたの通りのこと、ごめんなさい。私がそこにいるべきでした。","お前は九歳で、山の上にいた。調べた。","ちょっと、しんみりしてきたよ。ラーメン食べたい人？角の屋台は一晩中やってるし、スタンプカードもあるんだ。","かけらが三つ、幻影がひとり、スタンプカードが一枚。悪くない夜だ。","かけらがふたつ。一緒に来い、ゼロ。距離ではうまくいっていない。"],"21A":["街の東では、地面は黒くなり、空気は煙の味がした。","この匂い、わかる？これが故郷。エンバークレーターだよ。","何かが燃えている匂いがする。","ぜんぶ燃えてるの。それがいいんだよ。","ここに人が住んでいるのか？わざわざ？","三百世帯。冬じゅう地面はあったかいし、鍛冶場の火は消えないし、誰も毛布がいらないんだ。","山が噴火したら？","尾根に登って、花火みたいに眺めて、それから下りて掃くの。そんなに悪くないよ。","溶岩を掃くのか。","掃くのは灰！溶岩は掃かないよ、カイト。それはバカみたいでしょ。","もちろんだ。俺が愚かだった。","二年ぶりの故郷だよ。背、伸びたように見える？伸びて見えるべきだと思うんだけど。","昔の師匠がここにいるんだ。ダイ。火口にかけらが落ちたなら、師匠が見てる。"],"22A":["火口は落ちてきたものを手放さない。おまえも手放されずにいるといい。","この道で金をせびらなかったのは、あんたが初めてだ。","幽霊に金は必要ない。必要なのは連れだけだ。","あまり幽霊には見えないな。","時間の問題だ。灰の道にいる者は、いずれみなそう見えるようになる。塵は入りこみ、出ていかない。","俺は通るだけだ。先に娘が行ったはずだ。赤い髪で、とても声が大きい。ここを通ったか？","一時間前、帰ってきたと叫びながら走っていった。火口が叫び返していた。あの娘を気に入っている。","いかにもそれらしい。","だが、火口はおまえを知らない。温かい場所に冷たいものを持ちこむよそ者は、ここに留まることになりがちだ。","それは忠告か、脅しか？","火口では、そのふたつに違いがあったためしがない。","通らせてもらう。"],"23A":["リン！型を終えんうちに出ていきおって。稽古したところを見せてみろ。","稽古したよ！だいたいは。パンチのやつは稽古した。","型は四十ある。そのうち三十一はパンチではない。","ちょっと遅れてるのが、そっちのほうなんだよね。","二年だぞ、リン。手紙も便りもなしだ。お前が街でチャンピオンと戦ったと、旅の商人から聞くはめになった。","聞いたの？あたし、すごくうまくやったんだよ！","勝ったとは聞いた。アリーナを壊したとも聞いた。","…もろいアリーナだったんだよ。","はっ！それでこそお前だ。来い。本当に成長したなら、わしより先に鍛冶場が気づく。","手紙のこと、まだ怒ってる？","二十二番の型を見せてから、もう一度聞け。","はい、師匠！先に謝っときます、師匠！"],"24A":["お前たちが持っているそのガラス。知っておるぞ。それを収めていた枠は、わしの祖父が鍛えた。","そんなの聞いたことないよ！","お前が、聞くほど長くじっと座っておらんかったからだ。","なら、三つ目のかけらがどこに落ちたか知っているんだな。","あなたの祖父は、凍った山の封印のために枠を作った。なぜ火口の鍛冶師がそんなことを？","ほかの何物も持ちこたえんからだ。氷は割れる。石は崩れる。だが山の心臓で折り返した火口の鋼は、己の形を忘れん。","待って、うちの村は世界一怖いものを閉じこめるのを手伝ったのに、誰も看板にしなかったの？","忘れられるためのものだったのだ。それが最良の錠というものよ。","そして今、その一部が故郷に帰ってきた。","落ちるのを感じた。鍛冶場がひと息のあいだ冷えきった。わしの生涯で一度もなかったことだ。","じゃあ、ここにあるんだ。火口の中に。","山門にある。そして、あの門の番人は一度も動かされたことがない。"],"25A":["灰の道に嵐の剣か。何年も前から、一度試してみたかった。","この道で俺を待っていたのか。名指しで。","交える価値のある刃を持つ者なら誰でもだ。お前の剣は鳴っている。尾根から聞こえた。","嵐の鋼だ。天気が変わるとそうなる。","雨を知らせてくれる剣か。俺のは二十年持ち歩いて、重くなるばかりだ。","何が望みだ、浪人。","ひとつの悪い冬に、主も流派も名も失った。それからは歩き、出会った者と己を比べている。","全員と比べ終えたら？","そのとき、失ったものに守る価値があったかどうかがわかる。今のところ、答えは決闘のたびに変わる。","寂しい旅の仕方だな。","正直な旅だ。抜け、嵐の剣。お前がどんな答えをくれるか見せてもらおう。","悪い週を選んだな。俺は急いでいる。"],"26A":["行くべき場所がある者の戦い方だな。","明かりを灯し続けなければならない世界があるんだ。","はっ！なら聞け。砂漠で、虎の旗を掲げた軍が動いている。","奴らは、お前たちと同じガラスを集めている。","最後の一太刀を止めたな。終わらせられたはずだ。","お前もだ。二度も。俺たちはどちらも勝つのが下手だな。","リンには言うな。俺が手加減しないと思っている。","誰に鍛えられた？","ライゾウという男だ。北の海岸の城塞で。三年前に出た。いい別れ方ではなかった。","嵐の鬼か。名は知っている。あの海岸を誰も攻めないのは、あの男がいるからだ。","俺が去ることを覚えた理由でもある。軍のことを教えてくれ。","軍か。素晴らしいな。"],"27A":["門の前に最後の稽古だ。幽霊も加わりたいそうだ。","幽霊はどちらにも肩入れしないと思っていた。","鍛冶師に丁寧に頼まれたのでな。それに、おまえは確かに冷たいものを火口に持ちこんだ。私は間違っていなかった。","これは罰ではないぞ、小僧。お前が向かう門は、お前より強い者たちを砕いてきた。","だから先に俺を砕きたいと？","どこで曲がるのか見たいのだ。試されたことのない刃は、最悪のときに折れる。","リンは、あなたが村で一番優しい人だと言っていた。","そのとおりだ。これが、わしの優しさよ。","私は、この道にきちんと取り憑く前に、ひと月修行させられた。","…どちらのほうが恐ろしいのか、わからなくなってきた。","リン、君の師匠には変わった友人がいるな。"],"28A":["門は閉まっている。二度と来るな。","なんで来たのか、聞きもしないの？","聞かない。","世界を救ってるんだよ。まあ、そんな感じ。星があって、それが実は錠で、女帝がいて。","それでも聞かない。","話しにくいって言われたことない？","ある。だからこの仕事をもらった。","あ、それはちょっと面白い。誰に雇われたの？","山だ。給料はスープ。とてもうまいスープだ。","もっとおいしいスープを持ってきたら？","…あれよりうまいスープはない。お前はスープを侮辱した。構えろ。","そう言われるの、大好き。"],"29A":["小さき者たちよ。追い返されるために、ずいぶん遠くまで登ってきたな。","お前の後ろにかけらがある。それが必要だ。","わしの後ろにあるものを必要とした者は多い。山は気にもかけなかった。","山に頼んでるんじゃない。あんたに頼んでるの。","いつからここに立っている？","子どものころからだ。父もここに立った。その父もここに立った。門がよそ者に開いたことは一度もない。","門の向こうには何があるの？","山の心臓だ。昔の鍛冶師たちが鋼を折り返した場所。そして今は、わしの屋根を突き破って落ちた冷たいガラスがひとかけら。","あのガラスは封印の一部だ。ほかのかけらと離れたままだと、恐ろしいものが目を覚ます。","恐ろしいものはいつも目を覚ましかけている。旅人には誰にも物語がある。どの物語も、門を通りたいという結末だ。","でも、あたしたちのは本当だよ！","よかろう。なら、正しく頼め。"],"30A":["わしを一歩動かせば、門はお前たちのものだ。","ただ通してくれてもいいはずだ。鍛冶師の話は聞いただろう。かけらが何なのか知っているはずだ。","ダイが信じていることは知っている。お前が信じていることも知っている。山は信念を量らない。","なら、何を量る？","足だ。地が揺れても踏みとどまるか。弾き飛ばされても戻ってくるか。","それだけか？謎かけも、誓いもなしか？","謎かけは暇のある者のためのものだ。わしは四十年かけて、これを単純にした。","そして誰もお前を動かせなかった。一度も。","熊が一度。半歩だ。今でもあの熊のことを考える。","なら、熊より頑固にならないとな。","一歩だな。わかった。"],"30B":["…一歩。はっ。門はお前たちのものだ。かけらもな。","カイト！やった！動いたよ！かかとが地面から浮くのを見た！","いい目をした娘だ。四十年、そしてそれが鳴る剣を持った小僧とは。熊が恥じ入るだろう。","どこか折れた気がする。何か所も。","お前は曲がった。折れはしなかった。それさえ見られれば十分だ。","師匠！見てた？あたしが鋼の壁を引きつけてたの見た？","二十二番の型を見た。出来は悪かったが、まさにここぞという時にな。お前を誇りに思う。","誇りって言った！カイト、聞いたよね。あんたが証人だからね。","氷の封印の守り手よ。山はお前のかけらを、できるかぎりよく守った。今、中は冷えておる。あるべき場所へ持っていけ。","ありがとうございます、門番さん。すべてが終わって、お望みなら、ここで眠らせるために持ち帰ります。","代わりに熊を連れてきてくれ。再戦がしたい。","三つ！ユキ、書いといて。あたしたち、勝ってるよ。"],"31A":["火口の南では竹が迫り、風は柔らかくなった。","誰も俺を殴ろうとしないのは、何日ぶりだろう。","気を緩めないでください。この林で何かが夢を見ています。それは木ではありません。","一分くらい休ませてくれてもいいだろう。","何かとは、どんなものだ？","誰にも結びついていない思考のような感じです。竹のあいだを漂って、耳を澄ませています。","それを聞いても、くつろげないな。","くつろがせるために来たのではありません。あなたを生かしておくために来たのです。","君とリンでは、旅の考え方がずいぶん違うな。","彼女はどこですか？","木々の向こうに寺院を見つけて、食べ物があるか聞きに行った。喧嘩を始めないよう、ゼロがついていった。","…彼女は喧嘩を始めますね。","四十秒は休めました。十分に寛大です。"],"32A":["お客様は林の入り口でおじぎをなさるものです。あなたはおじぎをなさいませんでした。","おじぎ？入って「こんにちは」って言ったよ！手だって振ったし！","間違った足から入り、立ち止まらずに敷居をまたぎ、左手で手を振られました。","間違った「手」まであるの？","翡翠寺院に入るには十一の作法があります。あなたは九つを飛ばし、残りのふたつを侮辱なさいました。","おだんごがあるか聞きたかっただけなのに。","ございます。お客様のためのものです。お客様はおじぎをなさいます。","わかった、わかったよ！おじぎを教えてくれたらやるから。覚えるのは早いんだ。先週なんて型をまるごとひとつ覚えたし。","おじぎを正しく身につけるには、ひと季節かかります。ですが、ここにはもっと早く敬意を示す方法があります。","あたしが思ってる方法だって言って。お願い。","手合わせです。勝っても負けても、食事は出します。ひどい負け方をしたら、皿洗いです。","おじぎはあとでする。約束。"],"33A":["おまえ、街と煙の匂いがする。林はそれが嫌いだ。オレも嫌いだ。","一晩だけだ。何にも触らない。","旅人のすることは何でも、何かに触れる。おまえは入ってくるとき竹を三本曲げた。一本ずつ聞こえた。","見ていたのか。","オレは誰でも見る。林に壁はない。だからオレが壁だ。","なら、ここにほかの何かがいるのも知っているな。俺ではない何かが。","…おまえも感じるのか？みんなはオレの気のせいだと言う。鳥は八日前に鳴くのをやめた。","八日前。星が落ちた日だ。","星なんかどうでもいい。鹿がもう小川に来なくなった。大事なのはそっちだ。","なら、望みは同じだ。手伝わせてくれ。","誰が手伝うかは林が決める。来い、街の小僧。林に牙を見せてみろ。","もっとひどい言われ方をしたこともある。"],"34A":["また会ったね、うるさい足。お茶でもどう？","お前か。神社の。ついてきたのか？","ボクは物語のあるところへ行くんだ。キミたちのは面白くなってきた。","かけらの場所を知ってるなら、さっさと言いなよ。","二人とも、いつから知り合いなの？","神社で、足音がうるさいと言って襲ってきた。","試したんだよ。彼は合格した。だいたいはね。そこには違いがあって、狐にとっては大事なことなんだ。","このお茶、飲んで大丈夫？なんか企んでる顔してるけど。","これはただのボクの顔だよ。三百年この顔だけど、誰にも文句を言われたことはない。","本当は何のためにここにいる、シロ？","小川の狼の子や、丘の僧と同じ理由さ。緑の場所で何かがおかしくなっていて、それを止めたいんだ。","踊り子が持ってるよ。でも、拍子を取れない人には渡さないだろうね。"],"35A":["踊り子の前に、準備運動だ。捕まえられるかな？","かけらの場所を教えると言ったはずだ。遊びがあるとは言わなかった。","狐は言わないものさ。自分で気づくほうが楽しいだろう。","この遊びはあといくつあるんだ？","キミがしかめっ面をやめるまで、いくつでも。その若さにしては、ずいぶん真面目な顔だね。","空のかけらを俺から盗もうとする者が後を絶たない。真面目にもなるひと月だった。","なのに炎の娘は、そのあいだずっと笑っている。なぜだか考えたことはある？","何も怖くないからだ。","何もかもが怖いからさ。だからずっと昔に、怖がる代わりに大声でいると決めたんだ。そこから学ぶといい。","…助言をしているのか、時間を稼いでいるのか？","両方だよ。捕まえたら、もっと教えてあげる。","狐にはうんざりしてきた。"],"36A":["かけらはわたしの庭に落ちたの。それから何ひとつしおれていないわ。","あれは祝福じゃない。牢獄のかけらだ。","そうかもしれない。でも今は、わたしの庭のかけらよ。","彼女が目覚めれば、庭もなくなる。","俺が誰なのか、聞かないんだな。","知っているもの。神社でわたしの月見花を踏みつぶした子の友達でしょう。","植え直すと申し出てはいた。","ええ。それは意外だったわ。物を壊した人はたいてい、そのあともっと速く逃げるものだから。","なら、かけらを追ってここまで来たのか。神社からずっと。","うちの家には庭がふたつあるの。こっちのほうが古いわ。ガラスが落ちたとき、季節はずれなのに、つぼみが一斉に開いたの。","それを贈り物だと思ったんだな。","なら、わたしよりうまく守れると見せて。"],"37A":["わたしのステップについてきて。できるならね。","祖母に教わったの。庭は時間との言い争いだって。植えれば、時間が奪う。だからまた植える。","疲れそうだな。","わたしが得意なことはそれだけなの。だから、空から何かが落ちてきて言い争いが止まったら、気づくわ。","止まったんじゃない。途切れただけだ。彼女が目覚めれば、かけらはすべてを一度に奪い返す。","まるで見てきたように言うのね。","通りをまるごと奪われた友がいる。そのことは話さない。話す必要もない。","…なら、庭からの問いを出すわ。あなたは口ではなく、足で答えて。","どんな問いだ？","あなたの動きが、ものを守る人のものか、ただ斬り倒すだけの人のものか。","俺はリードするほうが得意だ。"],"38A":["踊り子はあなた方を信じたかもしれません。私たちはまだ決めておりません。","あんたたちのどっちかには、もう勝ったよね？絶対もう勝ったはず。","そのあと皿を洗っていただきました。ひどい出来でしたので、洗い直すことになりました。","丁寧にやったんだよ！あのお椀、ちっちゃいんだもん！","僧は、おまえはもう客だと言う。オレは、客は冷たいガラスを林に持ちこまないと言う。","ガラスはもうここにあったの！あたしたちは持ち「出そう」としてるんだよ。","それが気がかりなのです。あれが来て八日、庭はかつてないほど青々としています。","それで鳥は鳴かなくなって、鹿もいなくなったんでしょ。狼の子がカイトに言ってた。割に合わないよ！","…こいつ、おじぎよりは話を聞くのがうまい。","では、皿洗いより戦いがうまいかどうか、見せていただきましょう。","二人いっぺんに！ユキ、マフラー持ってて。"],"39A":["夢を見ていたものが、目を覚ましました。皆さん、私の後ろへ！","わたしの花が。閉じていく。全部。","ユキ、あれは何だ？","いつからこの林にいた？","八日です。かけらを追って降りてきたのです。影が灯りについてくるように。","ずっとわたしの庭にいたの？わたしが水をやるのを見ていたの？","食べていたのです。あなたがかけらのそばで眠るたび、少しずつ奪っていました。夢は見ていましたか？","…いいえ。一度も。疲れているだけだと思っていたわ。","だから鳥がいなくなったんだ。動物にはわかる。","ノヴァのしもべです。夢を食べ、人を空っぽにします。目を閉じないでください。"],"40A":["なんて疲れた小さな英雄たち。お眠りなさい。ガラスは私が運んであげましょう。","今夜は誰も眠らない。","ユキの頭の中に入ったな。ハナの中にも。ほかに何人だ？","ああ、数えたりはしませんよ。数えるのは、尽きることを心配する者のすることです。","なぜ女帝に夢が必要なんだ？","彼女には必要ありません。必要なのは私です。彼女は見つけたものを私に持たせてくれる。その代わり、私は彼女のために扉を開けるのです。","何の扉だ？","人の内側にある扉ですよ。夜、鍵をかけずにいる方がどれほど多いか、きっと驚くでしょう。","俺のは閉まっている。","あなたのがいちばん騒がしいのですよ、小さな嵐。崖の上の城塞。背を向けた老人。続けましょうか？","…","ほら、それです。その愛らしいひび。さあ、じっとしていて。","誰もが眠ります。いつ眠るか、というだけのこと。"],"40B":["んん。苦い夢ですね。もっと柔らかくなったころに、また来ましょう。","カイト！林じゅうが揺れたよ。今のは何？","城塞のことを知っていた。誰にも話したことのないことを知っていた。","あなたが恐れているものを読むのです。それだけです。あなたを知っているのではなく、どこでひるむかを知っているだけ。","北へ逃げた。尾根まで追った。足跡は残さなかった。足がなかった。","じゃあ、まだどこかにいるんだ。最高。あたし、もう二度と寝ない。","つぼみが閉じていくわ。間違って開いたものは全部。庭がまた言い争いに戻っていくんだと思う。","それはいいことなのか？","正しい疲れ方よ。ありがとう、嵐の子。それと、あのにぎやかな子に伝えて。月見花は春までに咲くって。","許してもらえた！かけらが四つ、しかも許された。この旅で最高の日だ。","かけらを持っていって。庭は、それがないほうが安全。あなたたちが持つほうが安全よ。"],"41A":["かけらは四つ。五つ目は海の向こうに落ちていた。","水が多すぎる。あたし、水はだめなんだ。","溶岩の上を歩く娘が、船を怖がるとはな。","溶岩は正直なの。水は嘘つき。平らに見えて、そうじゃないんだから。","どのくらい遠いの？","ユキによれば、風が続けば船で三日だ。","三日！？足の下がずっと動いてるものの上で？","先週は夢の怪物と戦っただろう。","あれは別。夢の怪物は殴れた。海は殴れない。考えたことあるんだ。","本当に考えたのか。","じっくりね。海が勝つよ。すごく大きいし、疲れないから。","ゼロがもう波止場で船を探している。行くぞ。バケツを見つけてやる。","なら、海の嘘を知っている船長を探そう。"],"42A":["向こうまで乗せてほしいって？立っていられないやつは、俺の船には乗せない。","金なら払える。多くはないが、払える。","小銭はいらないよ、友よ。小銭は沈む。知りたいのは、誰を運ぶのかだ。","旅人が四人。そのうちひとりは、まだ桟橋を離れてもいないのにもう船酔いしている。","赤い髪の子か？もやい杭に抱きついてるのを見た。気に入ったよ。正直でいい。","なら、乗せてくれるんだな。","砂漠の海岸への航路は、俺の知るかぎりいちばん荒い海だ。荒れたときに固まる客は乗せない。","俺は固まらない。","乾いた陸の上じゃ、みんなそう言う。乗りな。甲板は濡れていて、揺れている。どう立つか見せてもらおう。","誰でもこうやって試すのか？","生かしておくつもりのやつだけだ。","なら、どちらが先に倒れるか見てみよう。"],"43A":["あなたは海を怖がっていますね。海にはわかるのですよ。","あの杭に抱きついてたのはバランスのため。戦術的な抱きつきだよ。","海は気にしません。少し怖がられるのが好きなのです。海が心配するのは、怖がらない人のほうです。","海のこと、人みたいに話すんだね。","人よりも古くて、気分があります。それなら、ほとんど同じことです。","今はどんな気分なの？","落ち着きません。九日前の夜、深い海に何かが落ちて、それからずっと静まらないのです。","それ、あたしたちのだ。かけら。まあ、集めてるんだよね。","では、潮が狂っているのはあなたたちのせいですね。その件で、ひとこと申し上げたいことがあります。","そのひとことって、戦い？最近みんなのひとことは戦いなんだけど。","海は波で語ります。私は通訳をしているだけです。","ここの人、みんな心が読めるの？"],"44A":["よし、戦えるのはわかった。こっちの条件だ。この波止場はカラス団が仕切っている。","クロか。会ったことがある。","なら話は早い。奴らを俺の桟橋から追い払ってくれれば、月までだって乗せてやる。","砂漠でいいよ。砂漠までで十分。","何人いる？","二十人、いや三十人か。積み荷のたびに分け前を取る。先月は、持ち主の払いが遅れたからって船を一隻まるごと持っていった。","誰も止めないの？","港長は怯えていて、衛兵は買収されている。こっちは櫂一本の男ひとりだ。","それは棒だろう。","水の上では櫂、陸では棒だ。場所を取らなくていい。","あいつらのボスには一回勝ってるよ。スプーンが好きなやつ。","砂漠行きで決まりだ！カラスのあとでな。"],"45A":["また嵐の坊やか。しかも光るものなしでな。","これを築くのにどれだけかかったか知ってるか？波止場、手下、港長との取り決め。","どれだけかかったかなど知ったことか。","十一年だ。上着一枚きりでここに来た。今じゃ、俺がうんと言わなきゃこの海では何も動かない。","昔のお前より持たない人たちから奪っているんだぞ。","税を取ってるんだ。強盗ってのは一度きりのときに言うもんだ。","船頭は、お前が男の船をまるごと奪ったと言っている。","払いが遅れたんだ。決まりは決まりだ。借りを一度でも許したカラスは、冬には巣がなくなる。","お前はこんなものよりましな何かになれたはずだ、クロ。速いし、頭も切れる。","ましなものは金にならないんだよ、嵐の坊や。来な。十一年で何が買えるか見せてやる。","今はもっと持っている。それでも、ひとつも渡さない。"],"46A":["先に行っていた。思ったより遅いな。","ノックくらいしろ。","アキラが言っていた虎の旗だ。将軍の名はトラ。かけらをふたつ持っている。","もうふたつか。","四日もいなかった。リンは、お前がもう戻らないと思っていた。","戻ると言った。みんなそう言う、と返された。","ほかに何がわかった？","トラの軍は雇われの剣士じゃない。ほとんどが農民だ。家族連れだ。飢饉のあいだ食わせてくれたから、彼についていっている。","なら、彼らも敵じゃない。","ああ。だから余計に厄介だ。腹が減っているからそこにいるだけの人々を、斬って進むことはできない。","なら、軍とは戦わない。将軍のところへ行く。","それに、奴は彼女の牢を破るために集めているんじゃない。引き渡すために集めている。"],"47A":["世間は狭いね。カラスは君より払いがいいんだ。","今はカラス団で働いているのか。先月は俺たちを虎に売っていただろう。","カードを握っている者のために働くのさ。今週は鳥だ。俺はとても柔軟でね。","気がとがめることはないのか？","寝返ることがかい？どちら側、なんてのは負けるつもりの人間が気にすることさ。俺は勝者の隣に立っていたいだけだよ。","無駄話はそこまでだ。その小僧はかけらを四つ持っていて、俺には買い手がいる。","虎のピンをつけた買い手か？","おや、今夜は冴えてるね。そうとも。同じ礼儀正しい紳士だ。値を倍にしてきたよ。","なら、お前たちは二人とも同じ男のために働いていて、その男が何に仕えているのかも知らないわけだ。","聞かないほうが体にいいと思っていてね。","これから、もっと払いが悪くなるぞ。"],"48A":["出航の前にもうひとつ試験だ。海も加わりたいそうだ。","もう四回も吐いたのに、まだ波止場につながれたままだよ！","港の新記録だ。ちょっと感心しそうだよ。","海がずっとあなたのことを尋ねています。本当に来るのか知りたいそうです。","考え中って伝えといて。","いいか、炎の娘。沖に出たら、甲板が傾いたときに固まるやつは乗せておけない。","固まってないよ。ただ…じっとして祈ってるだけ。","それを固まると言うのです。","わかったよ。何をすればいいの？","この甲板の上で、揺れているあいだ、俺たち二人と戦え。最後にまだ立っていたら、お前は船員だ。","吐いて、それから勝つ。"],"49A":["船は最後の灯りを過ぎて沖へ滑り出た。誰も眠れなかった。","すべてをお話ししたわけではありません。封印が砕けるのを、見逃したのではないのです。","続けてくれ。","眠っていたのです。見張りの最中に。見張り中に眠ったことなど、生まれて一度もなかったのに。","夢喰いか。","何週間も私の頭の中にいたのだと思います。私が、招き入れてしまったのだと。","だから休まないのか？毎晩起きて座っている。俺より先にリンが気づいた。","眠れば、あれに見つかります。私が見つかれば、かけらも見つかる。だから眠りません。","それは人が続けられることじゃない。","今のところ、三十一日は持ちこたえています。","三十一日だと。ユキ。","座ったまま、うとうとします。一度に数分ずつ。それで足ります。","なら、あれが君を利用したんだ。責めを負うのはあれで、君じゃない。"],"50A":["お前らは俺の波止場を奪った。なら俺はお前らの船と、そこにある光るもの全部をいただく。","懲りないな、お前は。","外海まで追ってきたのか。手こぎの小舟で。","小舟は三艘だ。お前らが二艘沈めた。その分はお前の借りに上乗せだ。","お前に借りなどない。","港ひとつ分の借りがある。十一年だぞ。それを一晩で、小僧と魚の娘と櫂の男がばらばらにした。","あれはお前が持ち続けていいものじゃなかった。わかっているはずだ。その上着の下のどこかで、わかっている。","上着の下に何があるかなんて、お前が言うな。","なら教えろ。なぜかけらを？お前は女帝なんて信じていないだろう。","三倍払う買い手なら信じる。上着一枚きりの小僧には二度と戻らないってことを信じる。","その小僧に戻らない方法はほかにもある。","負けずに済むやつをひとつ挙げてみろ。ないか？なら抜け。","カラスはどんな顔も忘れない。学ぶのはそれで十分だ。"],"50B":["ちっ。お前らのガラスは持っていけ。こいつは潮で拾った。悪い夢を見せやがる。","終わったのか？水しぶきの音と、そのあと悪態がたっぷり聞こえたが。","終わった。隠していたかけらを手放した。悪い夢を見せられる、と言っていた。","夢喰いは彼にも手を出していたのですね。気の毒な人。なぜこんなに空っぽなのか、決してわからなかったでしょう。","聞こえてるぞ、雪の娘。ここに座ってるんだ。哀れむな。","これからも港で強盗を続けるの？","…何を使ってだ？魚の娘が潮を上げたとたん、手下は海に飛びこんで逃げた。","船頭仲間で夜の見張りがひとり足りない。給料は安い。だが、お前から盗むやつはいない。","…上着はつくのか？","櫂がつく。","かけらが五つ、カラスは就職。お願いだから、もうこの船降りていい？","これで五つ。半分だ、ユキ。半分だぞ。"],"51A":["砂漠はかつて王国だった。今あるのは柱と風だけだ。","溶岩が恋しい。少なくとも溶岩のそばには日陰があるもん。","この遺跡は封印よりも古いものです。ここの誰かが、最初に彼女のことを知っていたのです。","王国がまるごと、どうやって終わっちゃったの？","言い伝えでは、ひとつの季節で井戸が枯れたそうです。今は、別の何かだったのではと思っています。","彼女か？","あの柱の彫刻には、穴のあいた空が描かれています。人は日照りをあんなふうには描きません。","じゃあ、前にもやったんだ。国をまるごと食べたんだ。","あるいは、食べようとした。何かが彼女を止めたのです。それが何だったのか、ぜひ知りたい。","軍は谷ふたつ東で野営している。何千というかがり火だ。隠れる気はない。","なら俺たちも隠れない。だがその前に、この壁を読みたい。","足跡だ。何百もある。虎の軍がここを通った。"],"52A":["またお前か。将軍は山より払いがいい。","火山の門を守っていたお前が、今は砂の穴を守っているのか。","お前がゴウを動かしてから、山は払わなくなった。門がなければ、スープもない。","それは俺のせいか？","そうだ。","もっともだ。将軍は何で払う？","シチューだ。あれほどうまくない。スープのことをよく考える。","ただ通してくれれば、ゴウに口をきいてやれるんだが。","…俺をまた雇ってくれるだろうか？","組み合う熊を探している。お前で手を打つかもしれない。","心が動く。だが虎に約束した。俺が約束を破ったのは生涯で一度きりだ。スープのことだった。二度とやらない。","俺に負けた者は、みんな新しい仕事に就くのか？"],"53A":["灰は風の運ぶところへ行く。今日はおまえのもとへ運ばれた。","火口からついてきたの？国を三つも越えてるよ！","ついていきはしない。漂うのだ。風がこちらへ吹いていて、どうやらおまえを気に入っている。","みんなそういうこと言うんだよね。海があたしを気に入ってる、火口があたしを気に入ってる。なんで何でもかんでもあたしを気に入るの？","おまえは大きな音を立て、そのすべてが本心だ。世界はそれを安らぎと感じる。","あたしが「安らぎ」！？","口と望みが食い違う者たちに比べれば。そうだ。","へえ。そんなふうに言われたの初めて。師匠には地すべりって呼ばれてる。","風が近くへ運ぶことがあれば、おまえの様子を見てくれと頼まれた。心配している。","師匠が？一度もそんなこと言わないのに！","言わないだろう。だから代わりに幽霊をよこした。来い。何と伝えればいいか見せてくれ。","じゃあ、送り返してあげる。"],"54A":["氷の巫女。雪からずいぶん遠くまで来たのね。","ベガ。あなたは決して塔を離れないと思っていました。","星が落ちたのに、天文学者が家にこもっていると思う？","壁を読みなさい。十のかけらが封印を成す。けれど、ひとつの手に集まった十のかけらは、鍵にもなる。","壁を読むために、はるばるここまで来たのか？","虎の兵たちが薪にしてしまう前に読みに来たのよ。彼らは砂でないものを何でも燃やしているから。","続きには何と書いてありますか？","最初の封印を作ったのはここの人々だと。あなたの山ではなくてね。そもそも彼女を呼び降ろしたのも、ここの人々だった。","呼び降ろした。彼女は招かれたのか？","雨が欲しかったのよ。空に助けを求めたら、何かが応えた。望んだものではなかったけれど。","そして最初の巫女が、招き入れてしまったものを封じるために封印を作った。","この王国すべてを代償にしてね。最後の行を読みなさい。","つまり、すべてを集めた者は彼女を閉じこめられる。あるいは、解き放てる。"],"55A":["鍵を運ぶ前に、それを握るのがどんな手なのか知っておきたいの。","私がなぜ塔に住んでいるか知っている、嵐の剣？","ユキは、あなたが人嫌いだと言っていた。","人は大好きよ。遠くから見るぶんにはね。近くに来ると、恋愛運を星に聞いてくれとばかり言うんだもの。","星はこの件について何と言っている？","鍵と錠は、誰かが回すまで見分けがつかないと。そして、十個そろったらどうするかをまだ聞かれていないのは、仲間の中であなただけだと。","ユキに渡す。","ユキがそこにいなかったら？あなたと、女帝と、選択だけだったら？","そのときは、選ぶ。","みんなそう言うわ。疲れたときに、あなたの手が何と言うか見せてちょうだい。","揺るがない手だ。"],"56A":["お前が、私の斥候たちを倒して回っている嵐か。","そしてお前が、怪物にかけらを渡している男だ。","私は四万の民を生かしている男だ。彼女は私の土地を見逃すと約束した。","その約束は守られない。","あなたの斥候は、道中で俺たちを殺せたはずだ。あなたがそうさせなかった。","見張れと命じた。お前は私の雇った者たちと戦いながら、一度も命を奪う一撃を出さなかった。その理由が知りたかった。","彼らは問題じゃなかったからだ。","たいていの将軍より賢いな。座れ。私を侮辱するために長い道を歩いてきたのだろう。まずは何か飲め。","彼女はどうやって約束した？姿を見たのか？","夢の中でだ。陣の者全員が、同じ夜に同じ夢を見た。ガラスの玉座に座る女が、雨を差し出していた。","それは彼女じゃない。しもべだ。夢を食い、嘘をつく。","そうかもしれん。だが、彼女は約束をした。お前は私に何も差し出していない。"],"57A":["将軍の命令だ。誰も天幕には近づけない。","天幕は俺の後ろだ。だから、お前はここで止まる。","これで何度目だ？四度目か？","三度目だ。火口のときは赤いほうだった。","数えているのだ。この男は何でも数えている。落ち着かない。","お前は？リンの様子を見に来ただけだと思っていた。","そうだった。それから将軍の料理番がシチューを一杯くれてな。どうやら私は入隊したらしい。","シチューはそれほどうまくない。","毎晩そう言って、三杯食べている。","二人とも立ち去れるはずだ。この軍に何の義理もない。","俺は約束した。こいつはシチューを食った。それが決まりだ。","天幕が目当てじゃない。"],"58A":["悪いな、炎の娘。虎がこの国の闘士の半分を雇った。","あんたも？チャンピオンでしょ！お金なんていらないじゃない！","いらないさ。だが、彼が直接頼みに来たんだ、炎の娘。ひとりで俺のアリーナに乗りこんできて、頼んだ。","それで、怪物のために働く男に「はい」って言ったの？","自分が負ければ四万人が飢える、と言った男に「はい」と言ったんだ。そのあとは、あまり質問しなかった。","…それ、すごく腹が立つくらいちゃんとした理由だね。","始めていいか？シチューが冷める前に終わらせたい。","あんた、それしか考えてないの？","そうだ。","どっちに転んでも恨みっこなしだ。前と同じ。きれいな勝負で、勝ったほうがラーメンをおごる。","乗った。でも今回はお腹すいてるから、急ぐよ。","じゃあ、この国の半分を殴る。まずはあんたから。"],"59A":["あたしにやらせて。","トラをか？今まで会った中で一番強い相手だぞ。","あの人は自分の民のことが怖いんだよ。その戦いなら知ってる。あたしは、いつ噴火してもおかしくない火口で育ったんだから。","倒すんじゃない。怖がらないってどういうことか、見せてあげるの。","向こうには軍と、三十年の戦の経験がある。","あたしにはマフラーと悪い態度がある。わかってるよ。","そういう意味じゃない。","六歳のとき、火口が九日間揺れたんだ。みんな尾根へ逃げた。師匠は残って、村に帰る場所が残るように、鍛冶場の扉を押さえ続けた。","その話は初めて聞いた。","師匠は怯えてた。手を見ればわかった。それでもやったんだ。あたしが泣かないように、ずっと笑いながら。","なら、マフラーは俺が持っていよう。"],"60A":["手に炎を宿した娘か。これが嵐の申し出か？","これはあたしの。あたしと戦って、それから話を聞いて。","世界の命運をかけた申し出を運ぶには、ずいぶん若いな。","申し出を運んでるんじゃない。お手本を運んでるの。","説明しろ。","あんたは民のことが怖くて取引をした。それはわかる。あたしだってそうしたと思う。","なら、私がそれを破れぬ理由もわかるはずだ。","破れないって、あんたが思ってるのはわかる。それは別のこと。","彼女は同じ夢の中で我らのもとに来たのだ、娘よ。四万人全員にだ。それとどう戦う？","夢に決めさせるのをやめるの。誰かが最初にやらなきゃ。それなら、あたしでいいかなって。","お前が間違っていれば、民は飢える。","あんたが間違ってれば、空がなくなる。好きなだけ強く殴りなよ、将軍。聞いてくれるまで動かないから。","まだ立っていられたら、聞こう。"],"60B":["…四万の民。そのすべてのために、ひとりの娘が私の前に立った。","リン！まだ立っているな。まさか…いや、立っていると思っていた。","思ってなかったでしょ。いいよ。あたしも途中あたりでは思ってなかったし。","私のすべてを受けきって、そのあいだずっとしゃべり続けていた。もっと口数の少ない王たちとも戦ってきたというのに。","将軍。あなたの軍が見た夢のことです。今夜、陣の中を歩かせていただければ、私が終わらせられます。","そんなことができるのか？","私を眠らせたのと同じものです。もうその声はわかります。耳を貸さない方法を、皆さんに教えられます。","なら頼む。それと、私の斥候を北へ連れていけ。女帝が私の土地を欲するなら、ここへ来て面と向かって頼むがいい。","かけらは七つ。残りは三つ。そして、終わりまでのあいだに立ちはだかる軍がひとつ減った。","あたしが先に数えたの！ゼロ、入ってきていきなりあたしの数字を言わないでよ！","両方くれたよ！七つ！誰かユキに、あたしが数えたって伝えて。"],"61A":["八つ目のかけらは落ちてすらいなかった。空の高みで受け止められていたのだ。","地を歩く人たち！キミたちは聖なる雲の上に立ってるんだよ。厳密にはね。","ここから落ちたガラスのかけらを探している。","落ちた？聖域より下に落ちるものなんてないよ。お坊さんが空中でつかまえたんだ。","そもそも、どうやってここまで登るんだ？","たいていは登らない。キミたちは一万段の階段を登ってきたけど、あれは大変なほうの道。北側に昇降機があるよ。","昇降機があるのか。","誰も聞かないんだよね。階段を見ると、そのまま登りはじめちゃう。上から見てるとすごく面白いよ。","リンが激怒するな。","この一時間ずっと数字を叫んでた子のこと？","段を数えていたんだ。二度数えそこねて、意地で最初からやり直した。","もう気に入った。おいでよ。お坊さんが、キミたちが来るって言ってた。","だろうな。"],"62A":["通行証なしでお坊さんには会えないよ。ボクが通行証。","俺たちを待っていると言わなかったか。","待ってるよ。まず試されることをね。誰が試すかは言わなかったから、ボクが名乗り出たんだ。","だろうな。","ここは退屈なんだよ！雲は反撃してこないし、鳥は話し相手として最悪だし。","たまには山を下りればいい。","一度下りたよ。何もかもが重かった。みんな何かを背負ってるみたいに歩くんだ。ここじゃ誰もそうしない。","それは、下ではたいてい本当に背負っているからだ。","…へえ。キミもだね。肩を見ればわかる。","牢獄のかけらを七つ背負っている。表に出るものだ。","じゃあ、それだけ背負ってもまだ風みたいに動けるか見せてよ。","なら、判を押してくれ。"],"63A":["あの星はわたしの空の一部だったの。あなたたちが持っていていい理由をひとつ言ってみて。","一万段登ったのに、昇降機があったんだよ！","聞こえたわ。聖域じゅうに聞こえた。よく通る声ね。","ありがとう！たぶん。あんた誰？","十一年間、毎晩あの星を見ていた者よ。ある晩見上げたら、星があった場所に穴があいていた。","ああ。それは変な感じだっただろうね。","家に帰ったら壁が一枚なくなっていたみたいだった。それからよく眠れないの。","誰もよく眠れてないよ。いろいろあってさ。怪物がいるんだ。","怪物なんてどうでもいい。わたしが見守るはずだったもののかけらを、あなたたちが持ち歩いている。気になるのはそこよ。","あんたのじゃなかったんだよ。悪いけど。怖い女帝を閉じこめる錠だったの。","わたしの空の、動かない一点だったのよ。あれが何だったかなんて言わないで。持つにふさわしいと見せて。","あたしはふたつ持って砂漠を越えたよ。そっちの番。"],"64A":["ガラスを求めて来たのだな。座りなさい。風が何と言っているか、聞かせておくれ。","…ただの風だ。","ならば、まだ早い。かけらは騒がしい。持つ者は静かでなければならない。","そのとおりです。私もひとつ持ちましたが、自分の恐れしか聞こえませんでした。","修行している時間はない。待てば待つほど、彼女は少しずつ目覚めていく。","雑音だらけの頭で彼女のもとへ急げば、彼女は目覚める必要すらない。ただ歩いて入ってくるだけだ。","そのとおりです、カイト。夢喰いは、ひと息であなたのひびを見つけました。","何を見つけたかは、わかっている。","よろしい。知ることが最初の半分だ。さて、城塞の老人のことを考えずに、どれだけ座っていられる？","なぜそれを…","風が教えてくれた。お前は背中全体でそれを叫んでいるぞ、若者よ。座りなさい。","私と修行しなさい。ガラスの音の向こうに風が聞こえるようになったら、渡そう。"],"65A":["最初の教えだ。勝とうとするのをやめなさい。","勝とうとせずに、どうやって戦う？","息をしようとせずに息をするのと同じだ。お前は何年も、その両方を間違えてきた。","それは答えになっていない。","これが唯一の答えだ。お前は、剣に金を貸しているかのように握っている。","その握りは師に教わった。","お前の師は、握り続けることを教えた。いつ手放すかは教えなかった。だからお前は怒って師のもとを去ったのだ。","…俺がなぜ去ったか、あんたは何も知らない。","この部屋にいない誰かと、まだ言い争っている若者なら知っている。","わかった。なら見せてくれ。","打ちこんできなさい。勝つことを考えるたびに、この棒で打つ。","俺のやることすべての正反対だ。"],"66A":["昔は星に名前をつけていたの。あの星にもつけたわ。落ちる前に。","何と呼んでいた？","「いかり」。決して動かなかったから。船乗りたちはあれを頼りに舵を取ったの。","俺たちが元に戻す。","リンが、あなたに試されたと言っていた。","十五分間あの子を射ち続けたわ。最後の矢をつかんで、返してきた。どうしていいかわからなかった。","誰にもわからない。","あの星は錠だったと言われたわ。聞きたくなかった。","両方であっていい。世界にとっての錠で、あなたにとってのいかりだ。","見かけより優しいのね、嵐の子。","星を元に戻すことはできないわ、嵐の子。でも、闇を止めることはできる。手伝うわ。"],"67A":["卒業の日だよ！弓使いとボクが最終試験だ。","お坊さんが言ってたよ。キミは昨日、六時間動かずに座ってたって。","そのうち四時間は寝ていた。","それも数に入るそうよ。夢を見ずに眠るのは、近ごろは思うより難しいもの。","試験というのは、具体的には？","簡単！ボクが上から行って、彼女が下から射つ。キミは、届く前にその両方を聞き取るんだ。","簡単には聞こえないな。","簡単じゃないわ。わたしは外したことがないし、あの子は捕まったことがない。","勝つことを考えてたら遅すぎる。城塞のことを考えてたら、もっとずっと遅すぎる。","何も考えていなかったら？","そのときは、初めての合格者になるかもね。準備はいい？","最終試験は僧だと思っていた。"],"68A":["氷の封印のユキ。大聖堂の命により、あなたの失態について申し開きをしていただきます。","大聖堂が騎士をよこしたのですね。私のために。","百人をよこしました。いちばん速く登ったのが私です。残りは階段を使いました。","昇降機があります。","…何があると？","それはいいのです。セラ、評議会がどう考えているかは知っています。私は守り手でした。そして封印は砕けた。","千年途切れなかった見張りが、あなたの代で終わった。それが人々にとって何を意味するか、わかっていますか？","誰よりもわかっています。目を閉じるたびに、人々の顔が見えます。","なら、私と一緒に戻ってください。評議会の前に立ち、かけらはほかの者に運ばせるのです。","かけらの歌を一度も聞いたことのない者に？夢喰いがまだ試していない者に？いいえ。","お願いしたのではありません、巫女。","申し開きなら、毎日しています。どいてください。"],"69A":["封印は彼女の見張りの最中に砕けました。彼女をかけらに近づけるべきではありません。","彼女は間違っていません。","完全に間違っている。ユキはかけらを七つ見つけた。大聖堂は何を見つけた？","…","彼女を裁くのは、空が安全になってからにしろ。それまでは、手を貸すか、道をあけるかだ。","二か月前に会ったばかりの相手を、ずいぶんすぐにかばうのですね。","俺は二か月、彼女の隣を歩いてきた。あんたはどれだけ歩いた？","記録を読むのに、隣を歩く必要はありません。見張りは彼女の夜に破れたのです。","カイト、お願いです。彼女は誓ったことをしているだけです。","君もだ。そのために六十日もまともに眠っていない。","…六十日？","大したことではありません。","…見ています。近くで。"],"70A":["最後の教えだ。今、風は何と言っている？","あんたが左へ動こうとしている、と。","お前は座った。眠った。風の双子にも合格した。それでもまだ、しかめ面をしている。","耳を澄ませているんだ。そうすると、こういう顔になる。","なら、顔のほうが間違っている。言ってごらん、今朝は何が聞こえた？","リンのいびき。起きていないふりをするゼロ。そして、出会ってから初めて、本当に眠っているユキ。","お前自身は？","…静かだった。だいたいは。城塞はまだ中にある。ただ、叫んでいないだけだ。","静けさとは、ただそれだけのものだ、若者よ。空っぽの部屋ではない。何も叫んでいない部屋だ。","初日にそう言ってくれてもよかった。","うなずいて、何もわからずにいただろう。さあ。もう一度、学んだすべてを込めて。","よろしい！なら、私を止めてみなさい。"],"70B":["聞こえたな。ガラスはお前のものだ。静かに運びなさい。","もらえたんだ！これで八つ？八つだよ！","八つだ。彼は素手で空からつかみ取って、湯のみの下にしまっていた。","思いつくかぎり、いちばん静かな場所だったのでな。湯のみの下は誰も見ない。","ありがとうございます、レン師。かけらと、六時間の眠りを。","お前は彼よりも多くを背負っている、巫女よ。これが済んだら戻ってきなさい。いくらか下ろす方法を教えよう。","大聖堂に知らせを送りました。封印が元どおりになるまで、巫女を呼び戻してはならないと伝えました。","セラ。あなたがひどく叱られます。","おそらく。思っていたほど気にならないものですね。","雪線までは一緒に行くわ。わたしの星がどこへ行くのか見届けたいの。","みんな優しくなった！この山、大好き。下りの昇降機って本当にあるの？","八つ。ありがとう、師よ。静けさのほうも、やってみる。"],"71A":["九つ目のかけらは、かつて封印があった場所に落ちていた。凍てつく山頂だ。","ここが私の育った場所です。あの空っぽの石の輪が、私のしくじった場所です。","凍えそう！ここで育って、なんでそんなに落ち着いた人になれたの？","歯が鳴っていると、大きな声は出しにくいものです。","美しい場所だ。","空っぽです。私が子どものころ、守り手は四十人いました。それが十二人になり、そして私ひとりに。","その人たちはどうなったの？","年老いた者もいます。暖かい土地へ去った者もいます。静かな千年は、見張りがなぜ大切なのかを人に忘れさせるのです。","だが、君は残った。","誰かが残らねばなりませんでした。それが自分の強さだと思っていました。今は、頑固すぎて去れなかった最後のひとりだっただけだと思います。","それは同じことだよ、ユキ。信じて。あたしは頑固の専門家だから。","輪のところに新しい足跡がある。ひとり。小さな足、それと杖。何日もここにいる。","輪に誰かがいる。俺たちを待っている。"],"72A":["ユキ。帰ってきたのね。山があなたはどこかとずっと尋ねていたわ。","いつからここで待っていたのですか？","砕けたあの夜から。感じてすぐ、月の社から登ってきたの。あなたはもういなかった。","かけらを追わねばなりませんでした。知らせを送る時間がなかったのです。","書き置きの時間くらいはあったでしょう。一行でいい。「まだ生きている」と。私は何もわからないまま、ひと月過ごしたのよ。","…ごめんなさい。直すこと以外、何も考えていませんでした。","あなたはいつもそう。九つのときから同じ。寺じゅうの水を運んで、一度も助けを求めなかった。","それで私の前に立ちはだかっているのですか？手紙を書かなかったから？","立ちはだかっているのは、あなたがひと季節も眠っていないような顔で、この山でいちばんひどい場所に入ろうとしているからよ。","輪へ行かなければならないのです、ルナ。","なら、そこから戻ってこられるだけの強さがあると、私に示して。","ルナ。お願いです。あなたとは戦いたくありません。"],"73A":["見ている、とは言いました。黙って見ている、とは言っていません。","もう味方になったと思っていたが。","味方です。だからこそ、今ここで、雪しかない場所でやるのです。あとで、取り返しのつかない場面でではなく。","具体的に、何をだ？","あなたは、彼女がそれに値するかも知らないまま、私の面前で彼女をかばいました。それは立派です。同時に、不安でもあります。","彼女はそれに値した。","あのときは知らなかったはずです。あなたは決めて、そのためなら大聖堂の騎士に剣を抜くつもりでした。","もう一度でもやる。","信じます。だから、玉座に着く前に知っておきたいのです。彼女が間違ったとき、あなたはそう言えますか？","妙な理由で戦うんだな。","戦う価値のある理由はこれだけです。「いいえ」と言えない忠誠は、別の形の眠りにすぎません。","わかった。さっさと済ませよう。"],"74A":["あなたはしくじっていないわ、ユキ。あなたが去ってから、古い石を読んだの。","私は眠ってしまったのです、ルナ。","眠らされたのよ。それに、封印は外から割れたんじゃない。内側から割れたの。","彼女が自力で破ったのか？","手を貸した者がいた。そして彼女は、どの守り手を眠らせればいいかを正確に知っていた。ノヴァは最初の氷の巫女だったのよ。","石からどうしてそんなことがわかる？","昔の守り手たちは、封印の一生をまるごと輪に刻んだの。ひびのひとつひとつ、修復のひとつひとつを、千年分。","あの石は百回は読みました。内側からのひびなど、ひとつもありませんでした。","ひとつあったの。最初の夜に。苔の下に隠れていた。封印が砕けて苔が枯れたから、見つけられたのよ。","何と書いてある？","封印は彼女のまわりに築かれたのではない、と。彼女が築いたの。内側から。","いいえ。そんなはずはありません。自分で自分を閉じこめる者などいません。","彼女は、私たちのひとりだった。"],"75A":["また会いましたね、小さな守り手。あなたの夢は温めておきましたよ。","覚えているほど大きくはないのですね。","前に会ったとき、あなたは眠っていましたから。夢の中では誰もが大きく見えるものです。","三十一夜。あなたは三十一夜も私の頭の中にいて、私は一度も気づかなかった。","気づいていましたとも。あなたはそれを疲れと呼んだ。務めと呼んだ。あきらめることに、なんと美しい名前をつけるのでしょう。","あきらめてなどいません。","そうですか？なら、ついに眠ったとき、なぜあんなに心地よかったのです？認めなさい、小さな守り手。誰かに見張りを代わってほしかったのでしょう。","…そうだったのかもしれません。","ほら。そんなに難しかったですか？さあ、横になって。また私が引き受けましょう。","私が欲しかったのは助けです。あなたではありません。そのふたつは同じではないし、今の私にはその違いがわかります。","…おや。それは新しい。まったく気に入りませんね。","私の頭から出ていきなさい。それから、私の山からも。"],"76A":["ねえ。また一点を見つめるやつやってるよ。","私たちの最初のひとりが、私たちが防ぐべきものになった。なら、私は何なのでしょう。","それを直すために世界じゅうを歩いてきた人。それがあんただよ。","あんたと彼女の違いを知りたい？あんたには、あたしたちがいる。","どうやっているのですか、リン。あなたは海も、高いところも、置いていかれることも怖い。それなのに笑っている。","置いていかれるのが怖いなんて、誰が言ったの？","誰も。あなたは毎朝、何か言う前にまず私たちを数えます。","…気づいてたんだ。","私は何にでも気づきます。それだけが、私の教わったことですから。","まあ。うん。小さいころ、親が火口を出てって、戻ってこなかったんだ。だから数えるの。","知りませんでした。","…あなたはとてもにぎやかです。それが嬉しい。"],"77A":["山が、封印を運ぶ者たちに会いたがっているわ。","今度は二人同時に俺を試すのか？","山にはいつも、守り手が一度にひとりしかいなかった。それが間違いだったと思うの。","そして大聖堂には、従う騎士しかいませんでした。それが私たちの間違いだったと思います。","なら、これは俺の話ではまったくないわけだ。","少しはあなたの話よ。みんながついていくのは、あなただもの。","俺は誰も率いていない。ただ歩き続けていて、みんながそこにい続けるだけだ。","それを率いると言うのです。誰にも教わらなかったのですか？","師は、率いるとは塔に立って正しくあることだと言った。","なら、あなたの師は孤独だったのね。来て。四人で何かを一緒に守るとどう見えるか、山に見せてあげて。","四人？あんたたちは二人しかいないが。","山は、ただ頼めばいいのに。"],"78A":["夢のあれは、悪夢で払ってくれる。俺はそれを売るのさ。","ユキはどこ？すぐ後ろにいたのに。","取りこみ中だ。夢のあれは、あの娘とふたりきりになりたがった。うるさいほうを引きつけておけと金をくれた。","あんた仕事あるでしょ！船で！あたしたちが見つけてあげたのに！","仕事はあった。それからまた夢を見るようになって、夢の中に銀の山があって、目が覚めたらここにいた。","それは夢じゃなくて、あの怪物だよ！あんたを使ってるんだ！","私が演じている最中に種明かしをするのは、無作法ですよ。","放してあげて。うまくやってたんだよ。櫂だって持ってたんだから。","彼は、ほかの誰もと同じやり方で私を招き入れました。少しの飢えと、小さな扉。","…炎の娘。思いきり殴れ。倒されると、あれは手を放す気がする。","あんたに頼まれた中で一番うれしいお願いだよ。じっとしてて。","ユキは取りこみ中。代わりにあたしが相手。"],"79A":["九つ。残りはひとつだ。","場所は知っている。気に入らないだろうが。","言え。","嵐の城塞だ。お前の故郷。落ちたあの夜から、お前の昔の師が持っている。","ライゾウ。","あとひとつ！どこにあるの？火山、済み。海、済み。空、済み。残ってるのは何、月？","気に入らないだろう。","それはもう聞いた。","少し時間をやりたかった。北の海岸だ。塔の中にある。最初の夜からずっとそこだ。","北の海岸。","カイト？なんで今そんな顔になったの？","カイト。何かがおかしい。彼女の声が聞こえます。すぐ近くに。"],"80A":["かけらを渡してください。九つすべて。彼女はずっと待っていたのです。","ユキ！それは君の言葉じゃない。目を覚ませ！","ユキ、杖を下ろせ。リンが怖がっている。","リンは眠っています。ゼロも眠っています。この山で起きているのは、あなたと私だけ。","みんなに何をした？","望まないことは何も。みんなとても疲れていたのです、カイト。あなたたち全員が。私は扉を開けただけ。","それは夢喰いの台詞だ。ユキは決してそんなことを言わない。","ユキは休んでいます。それだけのことをしましたから。六十日眠らず、みんなを背負って。彼女がどんな夢を見るか知っていますか？","言ってみろ。","暖かい部屋と、見張りを代わってくれる誰か。それだけ。今まで食べた中でいちばん小さな願いです。","なら、それは叶えさせる。あとでだ。彼女を返せ。","取り返してごらんなさい、嵐の子。私を越えて、彼女に届くのなら。","守り手は眠ります。見張りは私が務めましょう。"],"80B":["…カイト？また夢を見ていました。誰かを傷つけましたか？","何があったの？みんなを数えてたら、いつのまにか床にいたんだけど！","夢喰いだ。最後にもう一度ユキの中に入った。もういない。本当に消えた。","出ていくのを感じました。とげが抜けるように。リン、私はあなたを傷つけましたか？","十分間寝かされただけ。正直、必要だった。","階段で目が覚めたら、上着に霜がついていた。二度とごめんだ。","九つ目のかけらは、ずっと輪の下にあったの。あなたたちが戦っているあいだに掘り出したわ。はい。","九つ。それを、私はあれに渡してしまった。両手で差し出したのです。","君はずっと内側から戦っていた。見ていてわかった。君の打ちこみはどれも半秒遅かった。","…気づいていたのですか？","俺だって気づく。行こう。かけらはあとひとつ。それが済んだら、暖かい部屋は君のものだ。","治らない怪我は誰もしていない。あれはもう君の頭から出ていった。永久に。"],"81A":["嵐の城塞。カイトがその橋を渡るのは三年ぶりだった。","お城で育ったの？お城で育ったなんて言ってなかったじゃん。","砦だ。寒いし、雨漏りがする。","雨漏りする屋根のせいで出ていったの？","この橋、どれだけ長いの？","一マイルだ。入る道はここだけ。師は毎朝、飯の前にここを走らせた。","ごはんの前に？それは犯罪だよ。","師は向こうの端に立って、俺たちが走るあいだ、飯を一膳ゆっくり食べていた。","もう嫌いだ、その人。それ以外はどんな人だったの？","俺が見た中で最強の男だ。怒鳴りつけて地すべりを止めたことがある。","それは嘘でしょ。","俺はその場にいた。地すべりは止まった。恥ずかしくなったんだと思う。","俺が出たのは、師が力は塔に閉じこめておくべきだと考えているからだ。俺は、力は人のために使うべきだと思う。"],"82A":["カイト！三年で手紙の一通もなしか。ひと月につき一発殴らせてもらうぞ。","変わらないな。背が縮んだか？","お前が伸びたんだ、不公平だろ。それと、炎の娘が今年二回も俺に勝って、お前を知ってると言った。ひっくり返りそうになった。","アリーナを壊したと言っていたな。","俺のアリーナだ！塗り直したばかりだったんだぞ！","あの人はどうしている、ジン？","歳を取った。声はもっとでかくなった。今でも食卓にお前の席を用意してる。聞いても否定するだろうがな。","…三年たっても、席を用意しているのか。","毎晩だ。それから、飯が無駄になると文句を言って、自分で食べる。","あの人らしい。","来い。戦わずに通すわけにはいかない。あの人が絶対に許さないし、正直言って俺も許さない。","お前も元気そうで何よりだ、ジン。"],"83A":["城塞がいちばん払いがいい。そんな目で見るな。","あんたたち二人、どういう知り合いなの？","知り合いじゃない。俺が来たときにはもう門に立っていて、この一時間ひとことも口をきいてない。","おはようと言った。","うなずいただけだろ。","それが俺の言い方だ。","ねえテツ、これだけは聞かせて。火山、砂漠、今度は城塞。守ったことのない場所ってあるの？","パン屋を一度。二日間。くびになった。","なんで？","客を中に入れなかった。","橋を渡る者は誰でも鍛えてやれと、親父殿に言われてる。悪いな、炎の娘。三度目の正直ってやつか？","この男はいくつ仕事を持っているんだ？"],"84A":["出ていった小僧が、ガラスの袋を下げて帰ってきたか。座れ。","十個目のかけらを持っているな。それが必要だ。","あれが何かは知っておる。この世に生きた最悪のものにかけられた、最後の錠だ。ここに置いておく。","九つの錠は俺が持っている。ひとつだけでは壁にならない。餌だ。","あなたはあれが何か知っていた。落ちたあの夜、知っていたんだ。","お前が生まれる前から知っておった。この城塞がなぜこの岩の上に建てられたと思う？","封印を守るために建てられたのか？","封印が砕けたときに、最後のひとかけらを守るためだ。山の守り手たちが見張り。わしらはその後ろの壁だった。","そんな話は一度も聞いていない。","話す前にお前が出ていったのだ。十五歳で、何でも知った気でおった。","俺が出たのは、洪水のとき、二マイル先の村を城塞が助けるのをあなたが許さなかったからだ。","壁が持ち場を離れれば、壁はなくなるからだ。あの洪水を、わしは三年間毎晩悔いてきた。それでも、もう一度同じことをするだろう。","なら、来させるがいい。この三年、退屈しておったのだ。"],"85A":["外で何を学んだか見せてみろ。手加減はしてやる。","構えが広くなったな。誰かに教わっておる。","山の僧だ。考えるのをやめるまで棒で打たれた。","はっ！わしは十年かけてお前にもっと考えさせようとした。それを一週間で元に戻したか。","あなたは握り続けることは教えたが、手放すことは教えなかった、と言っていた。","…そう言ったか。賢い男だ。うっとうしい男だろうがな。","とても。","それに握りだ。握りを変えたな。緩くなっておる。","このほうがいい。","違うだけだ。良いかどうかは、これからわかる。あの僧に恥をかかせるなよ。","手加減はするな。本気で言っている。","するな。"],"86A":["あの人は手放さないぞ。塔が自分の上に崩れるほうを選ぶだろう。","わかっている。まさにそこまで頑固になれと、俺に教えた人だ。","じゃあ、あたしたちがもっと頑固になればいい。それは大得意。","気に入ったよ。カイト、気休めかもしれないが、城塞の半分はお前の味方だ。","なんであの人あんななの？カイトが帰ってきて、明らかに喜んでるのに。怒鳴ってばっかり。","あれが喜んでるってことだ。怒ってたらすごく静かになって、誰かが走らされてる。","そのとおりだ。","うちの師匠も同じ。ハンマーつきだけど。","あの人は四十年、この岩を離れていない。橋の端まで歩いたら空が落ちてくると思ってるんだ。","正しいのかもしれない。最後のかけらだ。","じゃあ、あの人から取り上げない。ほかの九つをここに持ってくるの。","俺は全部そろえたい。あの人も含めてだ。"],"87A":["コンコン。女帝が最後のひとかけらをご所望です。","トラ。あなたは彼女から自由になった。俺はそれを見た。","なった。民のほとんどもだ。だが彼女は二百人を手放さず、彼らは夜のうちに行軍した。連れ戻しに来たのだ。","そして、まっすぐ私の腕の中へ歩いてきた。将軍というのは実に当てになります。","お前か。ユキが追い出したはずだ。お前は終わったはずだ。","彼女からは、ね。頭はほかにいくらでもあるのですよ、小さな嵐。私に必要なのは、開いた扉がひとつだけ。","押してくるのを感じる。頭の後ろに手を当てられているようだ。カイト、これからお前に斬りかかるが、本意ではない。","わかっている。あなたとは前にも戦った。気をつける。","気をつける！なんて可愛らしい。今夜が、気をつければ済む夜だと思っているのですね。","あの娘がやったように殴れ。最初はそれで効いた。","リンは門にいる。俺で我慢してくれ。","兵たちはまだ全員が彼女から自由になったわけではない。許せ、嵐よ。これは私の選んだことではない。"],"88A":["勝つ側は光るもので払ってくれる。悪く思うな。","またあんた！？山であれを叩き出してあげたのに！","また生えてくるんだ。カビみたいにな。問題なのは俺のほうじゃないかと思いはじめてる。","とてもうまいシチューを勧められた。シチューのために自分がすることを、誇りには思わない。","この国には意志の強い人がいないの？","ラーメンのために砂漠を越えた娘が言うか。","あれは別！あのラーメンは本当においしかったんだから。","今夜は夢が騒がしい。塔を欲しがっている。そちらへ歩くのを、止められそうにない。","じゃあ、あたしが止める。二人とも。そのあと二人とも中に入って、ちゃんとしたごはんを食べるんだよ。","それは脅しか、誘いか？","火口じゃ違いはないの。幽霊に聞いてみな。","もう個人的な話だよ。この門は誰も通さない。"],"89A":["門は持ちこたえた。塔は持たなかった。影の手が伸びてきて、閉じた。","かけらが！全部！壁を突き抜けて引き寄せられました！","…餌。お前は餌だと言った。なのにわしは、老いぼれの愚か者のようにその上に座っておった。","終わった。彼女が十個すべてを持っている。","どこだ？持っていたんだ。帯につけていたのに！","目覚めている必要はなかったのです。十個すべてが同じ壁の中にあれば、それで足りた。","四十年、ほかのかけらから離しておいた。それなのに、やって来たとたん、わしは正門から入れてしまった。","あなたにわかるはずがなかった。","わかることこそが、わしの務めのすべてだった。慰めるな、小僧。わしにその資格はないし、好きでもない。","北から空が暗くなっていきます。見えますか？あれは天気ではありません。","なら、ひざまずくのをやめろ。彼女の手にある鍵も、まだ回されねばならん。行って取り返してこい。"],"90A":["お前が生き残れるとわかるまで、彼女の玉座へは行かせん。すべてを出せ、小僧。今だ。","こんなことをしている時間はない。一分ごとに、彼女は鍵を回すのに近づいている。","ちょうどこれをやるだけの時間はある。今のまま玉座へ行けば、彼女はひと息でお前を取りこむ。","俺は将軍にも、山にも、怪物にも勝った。","そして、わしには一度も勝っておらん。お前の頭の中でまだ叫んでいるのは、それだ。","…僧も同じことを言っていた。","なら、あの男とわしは同意見だ。棒を持った男より賢くないなどということは、断じて認めん。","負けたら？","そのときはお前がここに残って壁を守り、わしが代わりに行く。今夜、どちらかがこの岩を離れる。","城塞を離れるというのか？","このためなら。お前のためなら。小僧、やり方さえ知っておれば、三年前に離れておったわ。","はい、師匠。"],"90B":["はっ。はっ！それだ。わしの刃の祝福を持っていけ。わしに教えられることは、もうこれだけだ。","終わったのか？塔じゅうが揺れてたぞ。屋根瓦の半分が海に落ちた。","終わった。こやつがわしを仰向けに倒した。四十年、そしてそれが逃げ出した小僧とはな。","俺が勝てたのは、あなたが笑いすぎて防げなかったからだと思う。","それは、わしが負けた理由の中で最高のものだ。","見た、ジン？最後に剣を手放したんだよ。ぱっと放して、またつかんだの！","あの僧の技だ。許してやることにした。","闇が広がるのが速くなっています。今夜発たなければ。玉座は古い山の下、南へ三日です。","城塞の船を使えば二日だ。お前たちのものだ。わしの部下たちも。わしに残っているものすべてもな。","来てくれるのか？","橋の端までだ。誰かが壁を守らねばならん。だが今度ばかりは、わしは橋の向こう側に立って、手を振っておる。","空を連れて帰る。それまで、屋根が雨漏りしないようにしておいてくれ。"],"91A":["山の下、最後の光の先で、水晶が彼女の声で歌っていた。","きれい。怖い場所って、なんでいつもきれいなの？","だから、人は入っていく。","玉座は底にあります。彼女は完全には目覚めていません。封印は鍵で、彼女はまだそれを回していません。","どこまで深いんだ？","誰も知りません。最初の守り手たちは入り口を封じ、その場所を忘れました。かけらが私を引くから、見つけられただけです。","ここ、暖かいよ。なんで暖かいの？暖かいはずないのに。","何かが息をしているからだ。","ゼロ！そういうことをさらっと言わないでよ！","聞いたのはお前だ。","離れるな。夢喰いがここにいるなら、まず俺たちを引き離そうとする。","今朝数えたよ。四人。下までずっと数え続けるから。","なら、まだ間に合う。離れるな。"],"92A":["彼女はまだ私の民を握っている。前と同じように私を解き放ってくれ、炎の娘。","将軍！ひどい顔だよ！","別の何かに足を動かされながら、三日歩いてきた。安らぐものではない。","二百人はどこ？","私の後ろ、闇の中に、列をなして立っている。傷ついてはいない。ただ…待っている。","何を？","彼女が鍵を回すのを。扉を開けるとき、戸口に軍を置いておきたいのだ。","そんなことにはならないよ。一回あんたから叩き出したんだ。もう一回できる。","ここではあれが強い。これほど彼女に近いと、自分の名もほとんど聞こえん。","じゃあ、あたしの名前を聞いて。あたしはリン、火口の出で、ものすごくうるさい。","…ああ。それなら聞こえる。存分にやれ、娘よ。","じっとしてて、将軍。すごく痛いだけだから。"],"93A":["小さな守り手。彼女の足もとで眠るために、はるばるここまで来たのですね。","これが最後です。","山でもそう言いましたね。なのに私はここにいて、あなたもここにいて、とてもお疲れのようです。","疲れています。それを恥じるのは、もうやめました。","そういう筋書きではありません。あなたはそれを隠すはずなのです。私が棲むのは、そこなのですから。","知っています。リンは、毎朝私たちを数えると話してくれました。カイトは、食卓に用意された席のことを。ゼロは、兄の名前を。","それが私と何の関係があるのです？","あなたは、人が口にできないものを食べます。私たちは、それを口にしはじめました。","言葉。言葉で私を飢えさせられるとでも？","あなたは会うたびに小さくなっていると思います。怯えているのだと思います。","私は決して怯えません。私は、階段の底にいるものです。","私は、みんなを目覚めさせるために、はるばるここまで来たのです。"],"94A":["嵐の剣。私のかけらを、とても大切に運んでくれたのね。ありがとう。","返せ。","もとは私のものよ。あの封印を作ったのは私なの、坊や。虚無があなたたちの世界を食べないように、千年のあいだその中に座っていたの。","あなたが、錠だったのか。","封印は、あなたが自分で作った。","この手でね。砂漠の王たちは、送り返せないものを呼び降ろした。それは彼らの空を食べていた。","だから、閉じこめた。","閉じこめることはできなかった。何にもできなかった。世界の代わりにつかまるものを与えることしかできなかった。だから、私自身を与えたの。","虚無はあなたじゃない。あなたの中にいるんだ。","千年のあいだね。ほかの守り手たちには封印を見張るように言った。私がその中にいるとは言わなかった。言えば、出そうとしただろうから。","なぜ誰も来なかった？","そして、誰も私と代わりに来てはくれなかった。だから私は去るの。そのあと何が起きようと、もう私の見張りではないわ。"],"95A":["その剣を私に向ける前に、あの子たちに向けなさい。","リン。俺だ。手を下ろせ。","カイトはいつも勝つ。カイトはいつもおじぎする。カイトは行っちゃう、みんなが行っちゃうみたいに。","それは君の言葉じゃない。リン、俺たちを数えろ。数えるんだ！","数える相手などいません。あったのは見張りだけ。そして私は、それをしくじった。","わかる？あの考えは私が入れたものではないの。音を大きくしただけ。","二人とも、それを自分で俺に話してくれた。声に出して、たき火のそばで。今さら使っても手遅れだ。","…話したの？","仲間とはそのためにいる。千年、誰にも何も話さなかったあなたには、わからないことだろうが。","口に気をつけなさい、坊や。","リン、ユキ、すまない。あとでラーメンをおごる。","リン？ユキ？違う。あれは二人の目じゃない。"],"96A":["いたた。あたし、あんたを殴った？殴る夢を見たんだけど。","いつもどおりの殴り方だった。俺は大丈夫だ。","彼女は嘘をついていません。最初の守り手でした。ひとりで虚無を抱え、誰も代わってはくれなかった。","じゃあ、悪者じゃないんだ。疲れてるんだ。","最後に数えたのはいつですか？","今朝。四人。それから闇が来て、誰も見つけられなくなった。","俺たちはずっとここにいた。","「今」はわかってるよ。夢の中ではまた尾根にいて、村が空っぽだったの。","私は輪にいました。ひとりで。いつもとまったく同じ感じでした。","それが、彼女が千年抱えてきたものだ。悪夢じゃない。ただ、それだけだ。","…ああ。ああ、それって悪者よりずっとひどいよ。","なら、倒すだけじゃない。誰も与えなかったものを彼女に与える。見張りを代わる誰かを。"],"97A":["夢はもう終わり。遊びも終わり。あなたたちは玉座には届きません。","将軍。抗え。","抗っている。これが抗っている姿だ。あれが私にやらせたがっていることを見せてやりたいくらいだ。","とてもよくやっていますよ。自力で指を一本、もう少しで動かせそうです。","お前に残っているのは操り人形ふたつと洞窟ひとつだ。林ではもっと大きかった。","口を慎みなさい。","ユキの言うとおりだ。お前は縮んでいる。お前を振り払った者がひとりずつ、かけらを持ち去った。","私には彼女がいる。いつまでも彼女がいる。千年の孤独は、決して尽きないごちそうです。","孤独を終わらせれば、尽きる。","小僧、何を企んでいるにせよ、早くやれ。腕が上がっていく。私は命じていない。","もういい。眠りなさい。","トラ、聞こえているはずだ。抗え！"],"98A":["彼女に残されたすべてが、あなたと彼女のあいだに立つ。眠りなさい、嵐。","三人か。残っているのはそれで全員か？","これで足ります。飢えたカラス、寂しい幽霊、そして私。","嵐の坊や。気休めかもしれんが、あの櫂は気に入ってた。","私はあのシチューが気に入っていた。炎の娘にそう伝えてくれ。","自分で言え。お前たちは二人とも、ここから歩いて出るんだ。","聞きましたか。まだこれを救出だと思っているのですよ。","神社のときからずっと救出だった。誰を救うのか、俺が知らなかっただけだ。","…今、何と？","彼女だ。俺たちは彼女のために来た。そして、お前が戸口に立っている。","違う。違う、彼女は「私の」ものだ。あなたたちの祖父が生まれる前から私のものだった！","今夜は違う。もう二度とだ。"],"99A":["ここだ。あの扉の先に、もう道はない。","じゃあ、入るときに思いっきり音を立てよう。","何年も距離を取ってきた。今回は、近くに立ちたい。","カイト。封印が元に戻ったら、誰かがそれを守らなければなりません。私が守ります。そして今度は、ひとりではありません。","誰か、言っておきたいことある？ほら、万が一のために。","兄の名はレンだった。あの僧じゃない。別のレンだ。お前たち全員を気に入っただろう。","大聖堂に助けを求める手紙を書かなくてよかった。書けば騎士が来たでしょう。代わりに、あなたたちに会えました。","あたしは怖くないって記録しといて。それと、今のは嘘だって。","俺は怒って故郷を出て、それで自由になったと思っていた。ひとりになっただけだった。","カイトが気持ちを言った！みんな見たよね？","見た。聞かれたら否定する。","誰も否定しない。行こう。彼女をちゃんと目覚めさせに。"],"100A":["千年たって、私のもとにたどり着いた最初の者たちは、戦いに来た。","俺たちは、あなたの見張りを引き継ぎに来た。休んでいい。だが、こんな形ではだめだ。","私の見張りを引き継ぐ。自分が何を差し出しているか、わかっているの？","いや。教えてくれ。","終わりのない寒さ。自分のものではない声が、出してくれと頼み続ける。毎年、毎時間。","それを、あなたはひとりで抱えた。","誰かがやらねばならなかった。私が選んだの。もう一度でも選ぶわ。ただ、もう続けられないだけ。","続けなくていい。それが、あなたが一度も試さなかったことだ。ひとりである必要はない。","子どもが四人。王国を食べたものを相手に。","今日は四人。明日は大聖堂。城塞、火口、港、軍。俺たちが集めてきたのは、かけらだけじゃない。","…全員を連れてきたのね。","俺たちが戦った全員が、この上の山に立っている。交代の番を待って。だから手を放して、俺たちに見せさせてくれ。","なら見せなさい。私が抱えたものを、あなたたちが抱えられると。"],"100B":["…まだ立っている。全員が。ほかの誰にもできないと思ったから、私はひとりで抱えたのに。","封印は元どおりになりました。そして今は、守り手が四人います。お休みください、最初の巫女。","彼女は…終わったの？あの音が止まった。自分の耳の音が聞こえる。","静かね。静けさが何だったか、忘れていた。もっと空っぽなものだと思っていたわ。","空っぽの部屋じゃない。何も叫んでいない部屋というだけだ。ある僧がそう教えてくれた。","闇が北から引いていく。洞窟の口から見ていた。星が順番に出てきている。","虚無はまだそこにあります。これからもずっと。けれど今は、ひとつの手ではなく、四万の手に分かれています。","その人たちが疲れたら？","そのときはそう言って、ほかの誰かが代わります。それがすべてです。必要だったのは、ずっとそれだけでした。","ねえ。最初の巫女さん。ラーメンは好き？ネオン街に、絶対に閉まらない屋台があるんだ。","…千年、何も食べていないのよ、お嬢さん。","じゃあ、あの屋台、「絶対」気に入るよ。","見上げてみろ。星が戻った。第一章、完了だ。腹が減っているのは誰だ？"]};
function startScene(qi,after){const q=QS[qi];let JL=null;try{if(F().jpstory&&SV.set.slang===1)JL=JS[(qi+1)+(after?'B':'A')]||null}catch(e){}const lines=(after?q.a:q.s).map((b,k)=>({w:b.w,act:b.act,line:(JL&&JL[k])||b.line}));if(!q||!lines.length){if(after||q.k==='T'){goto('story')}else startFight(qi);return}
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
 g.save();g.translate(W/2+shx,cam.ay);g.scale(cam.z,cam.z);g.translate(-cam.x,-cam.y);if(SC.env)try{envWorld()}catch(e){}
 SC.list.forEach(f=>{if(f.hide)return;const k=clamp(1+f.y/400,.3,1);g.fillStyle='rgba(10,0,30,.45)';g.beginPath();const dk=1-.34*(f.dz||0);g.ellipse(f.x,4-(f.dz||0)*52,38*k*dk,8*k*dk,0,0,TAU);g.fill()});
 SC.list.slice().sort((a,b)=>(b.dz||0)-(a.dz||0)).forEach(f=>{if(f!==top)drawFighter(f)});if(top)drawFighter(top);drawFX();
 SC.list.forEach(f=>{const e=f.em;if(!e||f.hide)return;const sc=f.c.sc||1,t=e[1],x=f.x+f.face*26,y=f.y-170*sc,al=clamp((1.6-t)*3,0,1),pop=Math.min(1,t*8);g.save();g.globalAlpha=al;g.translate(x,y);g.scale(pop,pop);
  if(e[0]==='!'){g.rotate(f.face*.15);poly([[-9,-30],[9,-30],[5,2],[-5,2]],'#ffe14d',INK,3);circ(0,12,6,'#ffe14d',INK,3);for(let i=0;i<5;i++){const a=-Math.PI/2+(i-2)*.5;g.strokeStyle='#fff';g.lineWidth=3;g.beginPath();g.moveTo(Math.cos(a)*38,Math.sin(a)*38-8);g.lineTo(Math.cos(a)*52,Math.sin(a)*52-8);g.stroke()}}
  else if(e[0]==='sweat'){g.translate(0,10+t*14);g.beginPath();g.moveTo(0,-14);g.quadraticCurveTo(10,2,0,8);g.quadraticCurveTo(-10,2,0,-14);g.fillStyle='#9fe3ff';g.fill();g.strokeStyle=INK;g.lineWidth=2.5;g.stroke()}
  else{for(let i=0;i<3;i++){const a=t*3+i*2.1,px=Math.cos(a)*22,py=Math.sin(a)*12-10-i*8,r=6+2*Math.sin(t*9+i);poly([[px,py-r],[px+r*.3,py-r*.3],[px+r,py],[px+r*.3,py+r*.3],[px,py+r],[px-r*.3,py+r*.3],[px-r,py],[px-r*.3,py-r*.3]],'#fff6a0',INK,1.5)}}
  g.restore()});
 g.restore();if(!(SC.env&&EIN[SC.env.set]))drawFG();g.setTransform(S*dpr,0,0,S*dpr,0,0);if(SC.env)try{envScreen()}catch(e){}
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
/* ================= flag "anime": cutscenes that play like an anime =================
   Same lines and voices. Each line gets a mood, and the mood drives faces (blush, sweat, anger mark, gloom, tears), marks over the head,
   how the speaker and the listeners move, relaxed standing poses instead of the fight stance, front and back views, walking in from and
   out to the background, and short fight exchanges between lines. */
const AON=()=>!!F().anime;
const MRX=[['funny',/\b(noodles?|ramen|dinner|lunch|breakfast|hungry|snacks?|dumplings?|nap|snor\w*|greedy|owe me|bet|jok\w+|funny|idiot|dummy|silly|ridiculous|embarrass\w*|oops|haha|heh|loud|pays)\b/i],
 ['sad',/\b(sorry|died|dead|grave|buried|cry|crying|tears|goodbye|lonely|too late|never came back|nobody came|could not save|left behind|miss (him|her|them|you))\b/i],
 ['angry',/\b(enough|how dare|shut up|liar|lied|traitor|betray\w*|coward|i hate you|never forgive|pay for|get out|out of my way|fool|damn|crush you|destroy)\b/i],
 ['shy',/\b(not that i care|not like that|blush\w*|cute|pretty|handsome|proud of you|thank you|thanks|worried about you|missed you|i like|stay with)\b/i],
 ['happy',/\b(we did it|won|glad|happy|great|wonderful|perfect|together|friends?|promise|home|warm|celebrate|feast|finally|smil\w+|laugh\w*|good)\b/i],
 ['tense',/\b(careful|danger\w*|behind you|run|hide|army|general|seal|storm|dark\w*|shadows?|scared|afraid|fear|trap|war|blade|sword|fight|blood|monster|wak\w+|crack\w*|broke\w*|zero)\b/i]];
function moodOf(b){const s=b.en||b.line||'',a=b.act||'';if(a==='laugh')return'funny';if(a==='cheer')return'happy';if(a==='shock')return'shock';if(a==='tired'||a==='kneel')return'sad';if(a==='draw'||a==='aura'||a==='slash')return'tense';
 if(/\?!|!\?/.test(s))return'shock';for(const m of MRX)if(m[1].test(s))return m[0];if(/!\s*$/.test(s))return'happy';return'calm'}
/* tag every line with its English text and mood (used by "anime" and "moodmx") */
function sceneMoods(){if(!SC||SC.md)return;SC.md=1;const q=QS[SC.qi],src=SC.after?q.a:q.s;let k=0;SC.beats.forEach(b=>{if(b.sil)return;const s=src[k++];b.en=s?s.line:b.line;b.mood=moodOf(b)})}
const CAS=[[2,-2,6,10,-8,12,5,-7,-5,-4,0,0],[3,-3,-24,96,-8,12,6,-8,-5,-4,0,0],[1,2,22,104,34,96,5,-7,-5,-4,0,0],[4,-6,34,122,-10,14,7,-9,-4,-4,0,0],[-2,-4,-14,-10,-22,-8,4,-6,-6,-4,0,0]];
const TALKP=[4,-3,38,62,-8,14,6,-8,-5,-4,0,0];
function casual(f){const b=SC.beats[SC.i],talk=b&&b.line&&SC.sp===f,src=talk?TALKP:CAS[(f.c.ix*3+SC.qi)%CAS.length],p=src.slice(),s=Math.sin(f.at*2.2);p[0]+=s*1.2;p[2]+=s*2;p[4]-=s*2;if(talk){const w=Math.sin(f.at*7);p[2]+=w*7;p[3]+=w*9}return p}
function animeInit(){SC.an={n:0};sceneMoods();if(SC.i>=0)return;const q=QS[SC.qi],fq=!SC.after&&q.k!=='T',B=SC.beats,out=[];let n=0;
 B.forEach((b,i)=>{out.push(b);if(b.sil||b.w<0||n>=2)return;const nx=B[i+1];if(!nx||nx.sil||nx.w<0||nx.w===b.w)return;
  if(b.mood==='angry'||(fq&&b.mood==='tense'&&i%3===1)||/\b(spar|train with|show me|come at me|try me|prove it|test you|draw your)\b/i.test(b.en)){n++;out.push({sil:'clash',dur:3.2,a:b.w,b:nx.w,soft:!fq});SC.left+=3.2;SC.tot+=3.2}});
 SC.beats=out}
function em2(f,k){if(f&&!f.hide)f.em2=[k,0]}
function setEx(f,ex,T){f.ex=ex;f.exT=T||3}
function zWalk(f,to,leave){f.wz=to;f.lz=leave?1:0;f.hide=false;f.wx=null;f.state='idle'}
function animeLine(b){const f=SC.sp,m=b.mood,h=SC.qi*7+SC.i*3,d=b.dur||3;if(!f||f.hide)return;const L=others(f).slice(0,2),free=!b.act,ok=q=>!q.pers&&q.wx==null&&q.wz==null&&q.y>=0&&q.state!=='atk';
 if(b.act==='look'){f.view=h%2?'back':'front';f.vT=d*.7;SC.kind=h%2?'wide':'front'}
 else if(b.act==='nod'){SC.ev.push([.3,()=>{if(ok(f))f.nod=.5}])}
 else if(b.act==='in'&&h%2===0&&f.wx!=null){f.x=f.hx;f.dz=1;zWalk(f,0);SC.kind='wide'}
 else if(b.act==='out'&&h%2===0&&f.wx!=null){zWalk(f,1,1);SC.kind='wide'}
 switch(m){
 case'funny':em2(f,'note');if(free&&ok(f)){f.state='win';f.st=0}f.ex='happy';L.forEach((o,i)=>SC.ev.push([.5+i*.3,()=>{em2(o,'drop');o.fs=2.4}]));break;
 case'happy':em2(f,'spark');f.ex='happy';if(free&&ok(f)&&h%2){f.vy=-430;f.y=-1;f.state='air';f.st=0}L.forEach(o=>setEx(o,'happy',d));break;
 case'angry':em2(f,'anger');f.fv=d;f.ex='angry';if(free&&ok(f)){doAct(f,'point');f.em=null;f.ex='angry'}L.forEach((o,i)=>SC.ev.push([.45+i*.2,()=>{o.fs=2.2;if(ok(o)&&i===0&&Math.abs(o.x-f.x)<260)walkTo(o,clamp(o.x+(o.x>=f.x?1:-1)*46,-560,560))}]));SC.spd=.6;break;
 case'sad':em2(f,'gloom');f.fg=d;f.ex='tired';if(/\b(cry|crying|tears|died|dead|gone|goodbye)\b/i.test(b.en||''))f.ft=d;if(free&&ok(f)&&h%2){f.view='back';f.vT=d*.55}L.forEach(o=>{setEx(o,'tired',d);SC.ev.push([d*.5,()=>em2(o,'dots')])});break;
 case'shock':em2(f,'!');L.forEach((o,i)=>SC.ev.push([.25+i*.15,()=>{em2(o,'!');setEx(o,'hurt',1.6)}]));break;
 case'shy':f.fb=d+1;em2(f,'steam');if(free&&ok(f)){f.face=-f.face;SC.ev.push([d*.7,()=>{const o=nearest(f);if(o!==f)faceO(f,o)}])}L.forEach(o=>{setEx(o,'smirk',d);SC.ev.push([d*.4,()=>em2(o,'?')])});break;
 case'tense':f.ex='angry';if(/\b(scared|afraid|fear|run|hide|careful)\b/i.test(b.en||''))f.fs=d;L.forEach(o=>setEx(o,'angry',d));break;
 default:if(/\?\s*$/.test(b.en||'')){SC.ev.push([d*.6,()=>L[0]&&em2(L[0],'?')])}
  if(free&&ok(f)&&h%4===0){f.view='front';f.vT=d*.6}
  else if(L[0]&&ok(L[0])&&h%4===2){const o=L[0],x0=o.x;SC.ev.push([d*.3,()=>{if(ok(o))walkTo(o,clamp(x0+(x0>=f.x?1:-1)*54,-560,560))}])}}
 if(m==='calm'&&L[0]&&h%3===1)SC.ev.push([d*.8,()=>{L[0].nod=.5}]);
 if(f.view&&(SC.kind==='eyes'||SC.kind==='behind'||SC.kind==='orbit'))SC.kind='front'}
function animeSil(b){if(b.sil!=='clash')return;const A=SC.act[b.a],Bf=SC.act[b.b],ok=f=>f&&!f.hide&&f.wx==null&&f.y>=0;
 if(!A||!Bf||A===Bf||A.hide||Bf.hide||A.wz!=null||Bf.wz!=null){if(A&&!A.hide){SC.foc=A;SC.kind='low';doAct(A,'draw')}return}
 const ax=A.x,sg=A.x<=Bf.x?-1:1,mid=Bf.x+sg*62;[A,Bf].forEach(f=>{f.pers=0;f.view=null});SC.foc=A;SC.kind='two';SC.spd=.9;walkTo(A,Bf.x+sg*124);
 SC.ev.push([.75,()=>{SC.kind='low';if(ok(A))doAct(A,'slash');if(ok(Bf))doAct(Bf,'cross');spark(mid,-95,A.c.col,false);shake(b.soft?5:9);sfx('guard')}],
  [1.35,()=>{SC.kind='two';if(ok(Bf))doAct(Bf,'slash');if(ok(A))doAct(A,'jump');sfx(b.soft?'guard':'hit');spark(mid,-110,Bf.c.col,false)}],
  [2,()=>{spark(mid,-95,'#fff',!b.soft);if(!b.soft){G.flash=.3;shake(14);sfx('big')}walkTo(A,ax)}],
  [2.7,()=>{[A,Bf].forEach(f=>{if(ok(f)){const o=f===A?Bf:A;faceO(f,o)}});em2(A,b.soft?'spark':'anger');em2(Bf,b.soft?'note':'drop')}])}
{const n0=nextBeat;nextBeat=function(){if(!AON()||!SC)return n0();if(!SC.an)try{animeInit()}catch(e){SC.an={}}
  SC.list.forEach(f=>{if(f.cas){f.cas=0;if(f.state==='pose'&&f.pz===f.cpz)f.state='idle'}if(f.wz==null){f.view=null;f.vT=0}});
  n0();if(!SC)return;const b=SC.beats[SC.i];if(!b)return;SC.list.forEach(f=>{if(f.em){const k=f.em[0];f.em=null;em2(f,k==='sweat'?'drop':k==='spark'?'spark':'!')}});try{if(b.sil)animeSil(b);else animeLine(b)}catch(e){}}}
{const s0=sceneStep;sceneStep=function(rdt){if(!AON()||!SC)return s0(rdt);const dt=rdt*(F().cine2?SMUL():1);
  SC.list.forEach(f=>{if(f.cas){f.cas=0;if(f.state==='pose'&&f.pz===f.cpz)f.state='idle'}});
  s0(rdt);if(!SC)return;
  SC.list.forEach(f=>{['fb','fs','fv','fg','ft','vT','nod'].forEach(k=>{if(f[k]>0)f[k]=Math.max(0,f[k]-dt)});if(f.exT>0){f.exT-=dt;if(f.exT<=0&&SC.sp!==f)f.ex=''}
   if(f.em2){f.em2[1]+=dt;if(f.em2[1]>1.9)f.em2=null}if(f.view&&f.wz==null&&f.vT<=0)f.view=null;
   if(f.wz!=null){const d=f.wz>(f.dz||0)?1:-1;f.dz=(f.dz||0)+d*dt*.5;f.view=d>0?'back':'front';f.zb=(f.zb||0)+dt*11;if((f.wz-f.dz)*d<=0){f.dz=f.wz;f.wz=null;f.view=null;if(f.lz){f.hide=true;f.lz=0;f.dz=0}else dust(f.x,3)}}
   if(!f.hide&&f.state==='idle'&&f.wx==null&&f.y>=0){f.state='pose';f.pz=f.cpz=casual(f);f.pvx=0;f.cas=1}})}}
/* faces */
let FXF=null;
function faceFX(f,front){const t=G.t,ck=front?[[-7.5,8.4],[7.5,8.4]]:[[4.6,8.4]];g.lineCap='round';
 if(f.fb>0){const a=clamp(f.fb,0,1);ck.forEach(q=>{g.fillStyle='rgba(255,90,120,'+.45*a+')';g.beginPath();g.ellipse(q[0],q[1],4.4,2.5,0,0,TAU);g.fill();g.strokeStyle='rgba(225,50,90,'+.9*a+')';g.lineWidth=.9;g.beginPath();for(let i=-1;i<=1;i++){g.moveTo(q[0]+i*2.2-1,q[1]+1.7);g.lineTo(q[0]+i*2.2+1,q[1]-1.7)}g.stroke()})}
 if(f.fs>0){const k=(t*.8)%1,x=front?12.2:-6.5,y=-7+k*13;g.globalAlpha=clamp(f.fs*2,0,1)*(1-k*.5);g.beginPath();g.moveTo(x,y-4);g.quadraticCurveTo(x+3.2,y+1.2,x,y+2.6);g.quadraticCurveTo(x-3.2,y+1.2,x,y-4);g.fillStyle='#bfeaff';g.fill();g.strokeStyle=INK;g.lineWidth=.9;g.stroke();g.globalAlpha=1}
 if(f.fv>0){const x=front?9:-5,y=-10,s=1+.16*Math.sin(t*14);g.save();g.translate(x,y);g.scale(s,s);g.strokeStyle='#e0142c';g.lineWidth=1.9;g.beginPath();[[1,1],[-1,1],[-1,-1],[1,-1]].forEach(q=>{g.moveTo(q[0]*1.1,q[1]*4.4);g.quadraticCurveTo(q[0]*1.5,q[1]*1.5,q[0]*4.4,q[1]*1.1)});g.stroke();g.restore()}
 if(f.fg>0){g.strokeStyle='rgba(40,50,120,'+.6*clamp(f.fg,0,1)+')';g.lineWidth=1.1;g.beginPath();const n=front?8:6,x0=front?-10:-3;for(let i=0;i<n;i++){const x=x0+i*2.8;g.moveTo(x,-7);g.lineTo(x,-1+((i*7)%4))}g.stroke()}
 if(f.ft>0){(front?[[-5.8,7],[5.8,7]]:[[6,7]]).forEach(q=>{g.fillStyle='rgba(150,220,255,.92)';g.strokeStyle=INK;g.lineWidth=.7;g.beginPath();g.ellipse(q[0],q[1]+1+((t*7)%5),1.4,2.7,0,0,TAU);g.fill();g.stroke()})}}
{const h0=headFront;headFront=function(c,o){h0(c,o);const f=FXF;if(f&&!o.sil)try{faceFX(f,0)}catch(e){}}}
function drawEm2(f){const e=f.em2;if(!e)return;const sc=f.c.sc||1,t=e[1],k=e[0],x=f.x+(f.view?18:f.face*26),y=f.y-172*sc,al=clamp((1.9-t)*3,0,1),pop=Math.min(1,t*8);g.save();g.globalAlpha*=al;g.translate(x,y);g.scale(pop,pop);g.lineCap='round';g.lineJoin='round';
 if(k==='!'){g.rotate(.15);poly([[-9,-30],[9,-30],[5,2],[-5,2]],'#ffe14d',INK,3);circ(0,12,6,'#ffe14d',INK,3)}
 else if(k==='?'){g.strokeStyle=INK;g.lineWidth=9;const q=()=>{g.beginPath();g.moveTo(-9,-22);g.quadraticCurveTo(-8,-34,2,-33);g.quadraticCurveTo(13,-31,10,-20);g.quadraticCurveTo(7,-12,1,-9);g.lineTo(1,-2);g.stroke()};q();g.strokeStyle='#7fdcff';g.lineWidth=5;q();circ(1,10,5,'#7fdcff',INK,3)}
 else if(k==='dots'){for(let i=0;i<3;i++)if(t>i*.28)circ(-14+i*14,-8,4.6,'#fff',INK,2.5)}
 else if(k==='anger'){const s=1+.2*Math.sin(t*16);g.scale(s,s);g.strokeStyle=INK;g.lineWidth=9;const q=()=>{g.beginPath();[[1,1],[-1,1],[-1,-1],[1,-1]].forEach(v=>{g.moveTo(v[0]*4,v[1]*15);g.quadraticCurveTo(v[0]*5,v[1]*5,v[0]*15,v[1]*4)});g.stroke()};g.translate(0,-10);q();g.strokeStyle='#ff2d4a';g.lineWidth=5;q()}
 else if(k==='drop'){g.translate(-f.face*8,-4+t*12);g.scale(1.5,1.5);g.beginPath();g.moveTo(0,-14);g.quadraticCurveTo(10,2,0,8);g.quadraticCurveTo(-10,2,0,-14);g.fillStyle='#9fe3ff';g.fill();g.strokeStyle=INK;g.lineWidth=2.2;g.stroke();g.fillStyle='#fff';g.beginPath();g.ellipse(-2.5,0,1.6,3,.3,0,TAU);g.fill()}
 else if(k==='note'){for(let i=0;i<2;i++){g.save();g.translate(-12+i*26,-10-t*16-i*8+Math.sin(t*6+i*2)*4);g.rotate(Math.sin(t*5+i)*.25);g.fillStyle=i?'#ff8fd0':'#ffe14d';g.strokeStyle=INK;g.lineWidth=2;g.beginPath();g.ellipse(-3,6,5,3.8,-.4,0,TAU);g.fill();g.stroke();g.lineWidth=5;g.beginPath();g.moveTo(1.4,5);g.lineTo(1.4,-12);g.lineTo(9,-9);g.stroke();g.strokeStyle=i?'#ff8fd0':'#ffe14d';g.lineWidth=2.4;g.stroke();g.restore()}}
 else if(k==='gloom'){g.translate(-f.face*14,-6);g.strokeStyle='rgba(60,70,150,.9)';g.lineWidth=3;g.beginPath();for(let i=0;i<5;i++){const x2=-20+i*10;g.moveTo(x2,-16);g.lineTo(x2,-16+12+((i*5)%9)+t*6)}g.stroke();g.fillStyle='rgba(50,56,120,.55)';g.beginPath();g.ellipse(0,-20,28,7,0,0,TAU);g.fill()}
 else if(k==='steam'){for(let i=0;i<3;i++){const a=(t*.9+i*.33)%1;g.globalAlpha=al*(1-a);g.strokeStyle='#fff';g.lineWidth=4;g.beginPath();const x2=-14+i*14,y2=-a*26;g.moveTo(x2,y2);g.quadraticCurveTo(x2+6,y2-6,x2,y2-12);g.quadraticCurveTo(x2-6,y2-18,x2,y2-24);g.stroke()}}
 else{for(let i=0;i<3;i++){const a=t*3+i*2.1,px=Math.cos(a)*22,py=Math.sin(a)*12-10-i*8,r=6+2*Math.sin(t*9+i);poly([[px,py-r],[px+r*.3,py-r*.3],[px+r,py],[px+r*.3,py+r*.3],[px,py+r],[px-r*.3,py+r*.3],[px-r,py],[px-r*.3,py-r*.3]],'#fff6a0',INK,1.5)}}
 g.restore()}
/* full body seen from behind */
function segB(a,b,r0,r1,fill){const dx=b.x-a.x,dy=b.y-a.y,L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L;g.beginPath();g.moveTo(a.x+nx*r0,a.y+ny*r0);g.lineTo(b.x+nx*r1,b.y+ny*r1);g.arc(b.x,b.y,r1,Math.atan2(ny,nx),Math.atan2(-ny,-nx),true);g.lineTo(a.x-nx*r0,a.y-ny*r0);g.arc(a.x,a.y,r0,Math.atan2(-ny,-nx),Math.atan2(ny,nx),true);g.closePath();g.fillStyle=fill;g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke()}
function drawBackChar(c,o){const t=o.t||0,ink=INK,A=c.acc||[],long=[1,2,5,6,7].includes(c.style),bk=(c.sc>1.07||c.dm>1)?1.12:1,br=Math.sin(t*3)*.8,wk=o.walk||0;g.lineJoin='round';g.lineCap='round';
 [-1,1].forEach(sx=>{const sw=wk?Math.sin(wk+(sx>0?0:Math.PI))*5:0;segB({x:sx*6.2*bk,y:-70},{x:sx*7.6*bk,y:-37-sw*.4},7.6*bk,5.8*bk,sx>0?c.pantsSh:c.pants);segB({x:sx*7.6*bk,y:-37-sw*.4},{x:sx*8.2*bk,y:-3-Math.max(0,sw)},5.8*bk,3.9,sx>0?c.pantsSh:c.pants);
  g.beginPath();g.ellipse(sx*8.6*bk,1.6-Math.max(0,sw),5.2,4.4,0,0,TAU);g.fillStyle=c.bare?c.skinSh:'#221c2e';g.fill();g.strokeStyle=ink;g.lineWidth=2;g.stroke()});
 const TP=[[-11,-65],[-12.6,-74],[-10,-88],[-13.4,-100-br],[-18,-108-br],[-9,-115],[9,-115],[18,-108-br],[13.4,-100-br],[10,-88],[12.6,-74],[11,-65]].map(q=>[q[0]*bk,q[1]]);
 const sm=()=>{const n=TP.length;let m=[(TP[n-1][0]+TP[0][0])/2,(TP[n-1][1]+TP[0][1])/2];g.beginPath();g.moveTo(m[0],m[1]);for(let i=0;i<n;i++){const j=(i+1)%n;m=[(TP[i][0]+TP[j][0])/2,(TP[i][1]+TP[j][1])/2];g.quadraticCurveTo(TP[i][0],TP[i][1],m[0],m[1])}g.closePath()};
 sm();g.strokeStyle=ink;g.lineWidth=4;g.stroke();g.fillStyle=c.top;g.fill();g.save();sm();g.clip();g.fillStyle=c.topSh;g.fillRect(-22*bk,-120,8*bk,60);g.fillRect(12*bk,-120,10*bk,60);
 g.strokeStyle='rgba(0,0,0,.28)';g.lineWidth=1.3;g.beginPath();g.moveTo(0,-112);g.lineTo(0,-78);g.moveTo(-9*bk,-104);g.quadraticCurveTo(-5*bk,-98,-7*bk,-90);g.moveTo(9*bk,-104);g.quadraticCurveTo(5*bk,-98,7*bk,-90);g.stroke();
 g.strokeStyle=c.col;g.lineWidth=2.2;g.beginPath();g.moveTo(-8,-114);g.quadraticCurveTo(0,-109,8,-114);g.stroke();g.fillStyle=c.col2;g.fillRect(-16*bk,-77,32*bk,5.4);g.restore();
 [-1,1].forEach(sx=>{const sw=wk?Math.sin(wk+(sx>0?Math.PI:0))*3:0,S={x:sx*17.5*bk,y:-107-br},E={x:sx*21*bk,y:-89+sw*.4},Hd={x:sx*19.5*bk,y:-71+sw};segB(S,E,5.9*bk,4.6*bk,sx>0?c.topSh:c.top);segB(E,Hd,4.6*bk,3.5*bk,c.bare?(sx>0?c.skinSh:c.skin):(sx>0?c.topSh:c.top));
  const gl=c.weapon==='fist',r=gl?(c.fistR||8.2)*.8:4.3;circ(Hd.x,Hd.y+2,r,gl?c.col2:c.skinSh,ink,2)});
 if(c.style===7||c.style===3){poly([[-17*bk,-112],[17*bk,-112],[26*bk,-26],[-26*bk,-26]],c.style===7?c.col:c.col2,ink,2);g.strokeStyle='rgba(0,0,0,.22)';g.lineWidth=1.4;g.beginPath();g.moveTo(-6,-108);g.lineTo(-10,-30);g.moveTo(6,-108);g.lineTo(10,-30);g.stroke()}
 g.fillStyle=c.skinSh;g.fillRect(-3.8,-121,7.6,8);g.strokeStyle=ink;g.lineWidth=2;g.strokeRect(-3.8,-121,7.6,8);
 g.save();g.translate(0,-132);[-1,1].forEach(sx=>{g.beginPath();g.ellipse(sx*14.6,3,2.4,3.8,0,0,TAU);g.fillStyle=c.skinSh;g.fill();g.strokeStyle=ink;g.lineWidth=1.8;g.stroke()});
 if(A.includes('horns'))[-1,1].forEach(sx=>poly([[sx*4,-14],[sx*11,-28],[sx*12,-11]],c.col2,ink));
 if(A.includes('ears'))[-1,1].forEach(sx=>poly([[sx*4,-15],[sx*11.5,-28],[sx*13.5,-10]],c.hair,ink));
 if(c.style===0||c.style===4||c.style===3)[[-12,-8,-24,-20,-8,-14],[12,-8,24,-20,8,-14],[-15,0,-27,-2,-15,7],[15,0,27,-2,15,7],[-4,-15,0,-30,4,-15]].forEach(q=>poly([[q[0],q[1]],[q[2],q[3]],[q[4],q[5]]],c.hair,ink));
 g.beginPath();g.arc(0,-1,16.2,0,TAU);g.fillStyle=c.hair;g.fill();g.strokeStyle=ink;g.lineWidth=2;g.stroke();
 poly([[-15,2],[-13,11],[-9,17],[-5,11],[-1,19],[3,12],[7,18],[11,11],[14,13],[15,2]],c.hair,ink,2);g.fillStyle=c.hair;g.fillRect(-14,-2,28,8);
 g.strokeStyle='rgba(0,0,0,.25)';g.lineWidth=1.1;g.beginPath();[-9,-4,0,4,9].forEach((x,i)=>{g.moveTo(x*.3,-15);g.quadraticCurveTo(x+(i-2)*.5,-2,x,12)});g.stroke();g.strokeStyle=c.hairHi;g.lineWidth=2.2;g.beginPath();g.arc(0,-1,11.5,-2.2,-1.1);g.stroke();
 if(long)ribbon(0,6,c.style===2||c.style===7?74:52,22,9,0,.12,t,c.hair,ink);
 if(c.style===1||c.style===5||c.style===6)circ(0,6,3.2,c.col2,ink,1.5);
 if(c.style===4||A.includes('band')||c.style===0){g.lineCap='butt';g.strokeStyle=ink;g.lineWidth=6.5;g.beginPath();g.moveTo(-15.8,-6);g.quadraticCurveTo(0,-3,15.8,-6);g.stroke();g.strokeStyle=c.col;g.lineWidth=3.5;g.stroke();g.lineCap='round';ribbon(-3,-5,24,5,2,-20,.3,t,c.col,ink)}
 if(A.includes('halo')){g.strokeStyle=ink;g.lineWidth=4.5;g.beginPath();g.ellipse(0,-24,12,3.5,0,0,TAU);g.stroke();g.strokeStyle='#ffe98a';g.lineWidth=2.5;g.stroke()}
 g.restore()}
{const d0=drawFighter;drawFighter=function(f,sil){if(G.mode!=='scene'||!SC||!AON()||f.hide)return d0(f,sil);const dz=f.dz||0,FR=window.CFRONT;g.save();
  if(dz){const k=1-.34*dz;g.translate(f.x,f.y-dz*52);g.scale(k,k);g.translate(-f.x,-f.y)}
  if(f.nod>0){g.translate(0,Math.sin(f.nod*TAU*2)*2.5)}
  FXF=f;let dp=0;try{if(f.view&&!sil&&f.state!=='enter'&&f.state!=='atk'&&f.y>=0&&(f.view==='back'||FR)){g.save();dp=1;const sc=f.sc||f.c.sc||1,wk=f.wz!=null?f.zb||0:0;g.translate(f.x,f.y-(wk?Math.abs(Math.sin(wk))*3:0));g.scale(sc,sc);
    if(f.view==='back')drawBackChar(f.c,{t:f.at,walk:wk});else FR(f.c,{t:f.at,expr:exprOf(f),sway:f.sway,fx:fr=>faceFX(f,fr)});g.restore();dp=0}else d0(f,sil)}catch(e){if(dp)try{g.restore()}catch(x){}}finally{FXF=null}
  try{drawEm2(f)}catch(e){}g.restore()}}
/* ================= flag "moodmx": the cutscene music and small sound cues follow the mood of the lines ================= */
Object.assign(TRK,{m_happy:{bpm:138,root:62,scale:'maj',prog:[0,3,4,0],seed:31,bass:'walk',drum:'pop',arp:1,lead:'triangle'},
 m_funny:{bpm:172,root:65,scale:'lyd',prog:[0,1,0,4],seed:47,bass:'walk',drum:'fast',arp:0,lead:'square'},
 m_sad:{bpm:70,root:57,scale:'min',prog:[0,5,3,4],seed:53,bass:'half',drum:'none',arp:1,lead:'triangle'},
 m_serious:{bpm:96,root:50,scale:'phr',prog:[0,1,0,6],seed:61,bass:'half',drum:'soft',arp:0,lead:'sawtooth'},
 m_fight:{bpm:178,root:52,scale:'hmin',prog:[0,5,3,4],seed:67,bass:'drive',drum:'fast',arp:2,lead:'sawtooth'}});
const MFAM={funny:'m_funny',happy:'m_happy',shy:'m_happy',sad:'m_sad',angry:'m_serious',tense:'m_serious',shock:'m_serious'};
function moodTracks(){if(SC.mt)return;SC.mt=1;sceneMoods();const ln=SC.beats.filter(b=>!b.sil);let prev=null;ln.forEach((b,i)=>{const c={};for(let j=Math.max(0,i-2);j<=Math.min(ln.length-1,i+2);j++){const m=MFAM[ln[j].mood];if(m)c[m]=(c[m]||0)+1}let best=null,bn=1;for(const k in c)if(c[k]>bn||(c[k]===bn&&bn>1&&k===prev)){best=k;bn=c[k]}b.mt=best;prev=best})}
{const w0=wantTrack;wantTrack=function(){const w=w0();if(w==null||G.mode!=='scene'||!SC||!F().moodmx)return w;try{moodTracks()}catch(e){return w}const b=SC.beats[SC.i];if(SC.title>0||!b)return w;
  if(b.sil)return b.sil==='spar'||b.sil==='clash'||b.sil==='stare'?'m_fight':SC.lmt||w;SC.lmt=b.mt||null;return b.mt||w}}
function sting(m){if(typeof AC==='undefined'||!AC||AC.state!=='running'||!SV.set.vol)return;const later=(ms,fn)=>setTimeout(()=>{try{fn()}catch(e){}},ms);try{switch(m){
 case'funny':tone('sine',330,660,.09,.12);later(100,()=>tone('sine',660,330,.12,.1));break;
 case'happy':tone('triangle',880,880,.1,.1);later(90,()=>tone('triangle',1320,1320,.16,.09));break;
 case'sad':tone('sine',392,294,.6,.09);break;
 case'angry':noise(.3,.16,220,1,'lowpass');tone('sawtooth',110,70,.3,.07);break;
 case'shock':tone('square',233,116,.22,.1);noise(.1,.14,1800,2,'bandpass');break;
 case'shy':tone('sine',1568,2093,.18,.05);break;
 case'tense':tone('sine',70,50,.16,.22);later(240,()=>tone('sine',70,50,.16,.16));break}}catch(e){}}
{const n1=nextBeat;nextBeat=function(){n1();if(!SC||!F().moodmx)return;try{sceneMoods();const b=SC.beats[SC.i];if(b&&!b.sil&&b.mood!==SC.lm){SC.lm=b.mood;sting(b.mood)}}catch(e){}}}
/* ================= flag "storyenv": story scenes get their own place (props or a room that are not part of the map), people passing in the
   background, time of day, and one walk to a second place in the middle of longer story scenes ================= */
const ERX=[['camp',/\b(camp|campfire|fire|night watch|sleep|asleep|rest)\b/gi],['inn',/\b(noodles?|ramen|dinner|inn|tavern|tea|table|eat|bowl)\b/gi],['dojo',/\b(teacher|master|train\w*|dojo|lesson|practice|student)\b/gi],['market',/\b(market|shop|street|city|district|money|crowd|stall)\b/gi],['dock',/\b(harbor|ship|dock|boat|pier|sea)\b/gi],['cave',/\b(cave|cavern|crystal|crater|underground|tunnel)\b/gi],['ruins',/\b(ruins?|tower|citadel|desert|temple|gate|wall)\b/gi],['woods',/\b(forest|trees?|grove|garden|bamboo|mountain|woods)\b/gi],['road',/\b(road|walk\w*|travel\w*|journey|path|follow)\b/gi]];
const EIN={dojo:1,inn:1,cave:1},EOUT=['road','woods','market','camp','ruins','dock'];
function envInit(){const q=QS[SC.qi],story=SC.after||q.k==='T',tx=q.t+' '+(SC.after?q.a:q.s).map(l=>l.line).join(' ');let set=null;
 if(story){let bn=3;ERX.forEach(m=>{const n=(tx.match(m[1])||[]).length+3*(q.t.match(m[1])||[]).length;if(n>bn){bn=n;set=m[0]}});if(!set)set=['road','market','camp','camp','ruins','road','ruins','dock','woods','ruins'][G.stg%10]||'road'}
 const night=/\b(night|tonight|dream|asleep|moon)\b/i.test(tx),dawn=/\b(morning|dawn|sunrise)\b/i.test(tx),E=SC.env={set,set2:null,night,tint:night?'rgba(8,10,60,.3)':dawn?'rgba(255,170,90,.12)':null,ppl:[],wipe:-1};
 let sd=SC.qi*977+13;const R=()=>{sd=(sd*16807+11)%2147483647;return sd/2147483647};for(let i=0;i<4;i++)E.ppl.push({x:-900+R()*1800,v:(R()<.5?-1:1)*(34+R()*40),s:.46+R()*.12,p:R()*6,c:i});
 if(story&&!SC.after&&SC.i<0){const ln=SC.beats.filter(b=>!b.sil);if(ln.length>=8){const at=SC.beats.indexOf(ln[ln.length>>1]);E.set2=EOUT[(EOUT.indexOf(set)+1+SC.qi%3)%EOUT.length];if(E.set2===set)E.set2=EOUT[(EOUT.indexOf(set)+2)%EOUT.length];SC.beats.splice(at,0,{sil:'travel',dur:3.6});SC.left+=3.6;SC.tot+=3.6}}}
{const n2=nextBeat;nextBeat=function(){if(SC&&F().storyenv&&!SC.env)try{envInit()}catch(e){SC.env=null}n2();if(!SC||!SC.env)return;const b=SC.beats[SC.i];if(!b||b.sil!=='travel')return;
  const E=SC.env,V=SC.list.filter(f=>!f.hide);SC.kind='wide';SC.foc=null;V.forEach(f=>{f.pers=0;f.view=null;f.wz=null;f.dz=0;f.state='idle';walkTo(f,f.x+760)});E.wipe=0;
  SC.ev.push([1.7,()=>{E.set=E.set2;V.forEach((f,i)=>{f.hide=false;f.x=f.hx-640-i*40;f.face=1;walkTo(f,f.hx)})}],[3.4,()=>{V.forEach(f=>{const o=nearest(f);if(o!==f&&f.wx==null)faceO(f,o)})}])}}
{const s1=sceneStep;sceneStep=function(rdt){s1(rdt);if(!SC||!SC.env)return;const E=SC.env,dt=rdt*(F().cine2?SMUL():1);if(E.wipe>=0){E.wipe+=dt/3.4;if(E.wipe>=1)E.wipe=-1}E.ppl.forEach(p=>{p.x+=p.v*dt;if(p.x>1000)p.x=-1000;if(p.x<-1000)p.x=1000})}}
function envWorld(){const E=SC.env,s=E.set,t=G.t,ink=INK;g.save();g.lineJoin='round';g.lineCap='round';
 const box=(x,y,w,h,c,lw)=>{g.fillStyle=c;g.fillRect(x,y,w,h);g.strokeStyle=ink;g.lineWidth=lw||2;g.strokeRect(x,y,w,h)},glow=(x,y,r,c)=>{const q=g.createRadialGradient(x,y,2,x,y,r);q.addColorStop(0,'rgba('+c+',.7)');q.addColorStop(1,'rgba('+c+',0)');g.fillStyle=q;g.fillRect(x-r,y-r,r*2,r*2)};
 const walkers=()=>{E.ppl.forEach(p=>{const y=-84,k=p.s,w=Math.sin(t*6+p.p)*7;g.save();g.translate(p.x,y);g.scale(k*(p.v>0?1:-1),k);g.globalAlpha=.6;g.strokeStyle='#1a1436';g.fillStyle='#1a1436';g.lineWidth=7;g.beginPath();g.moveTo(0,-62);g.lineTo(w,0);g.moveTo(0,-62);g.lineTo(-w,0);g.stroke();g.beginPath();g.moveTo(-11,-112);g.lineTo(11,-112);g.lineTo(9,-58);g.lineTo(-9,-58);g.fill();g.beginPath();g.arc(1,-127,12,0,TAU);g.fill();if(p.c%2){g.beginPath();g.moveTo(-22,-134);g.lineTo(24,-134);g.lineTo(2,-150);g.fill()}else{g.fillRect(8,-104,10,22)}g.restore()})};
 if(EIN[s]){const wc=s==='dojo'?['#d8bb8a','#b8935f','#7a5636','#5d4027']:s==='inn'?['#9a6846','#7a4f34','#4a2d1c','#38200f']:['#34304e','#242138','#15132a','#0c0b1a'];
  g.fillStyle=wc[0];g.fillRect(-1700,-1000,3400,1000);g.fillStyle=wc[2];g.fillRect(-1700,-6,3400,700);g.fillStyle=wc[3];g.fillRect(-1700,-10,3400,8);
  g.strokeStyle='rgba(0,0,0,.25)';g.lineWidth=2;g.beginPath();[18,48,96,170].forEach(y=>{g.moveTo(-1700,y);g.lineTo(1700,y)});for(let x=-1600;x<=1600;x+=200){g.moveTo(x,-6);g.lineTo(x*1.5,300)}g.stroke();
  if(s==='dojo'){for(let x=-1500;x<=1500;x+=300){box(x-9,-560,18,552,wc[2]);const wx=x+40;box(wx,-300,220,190,'#f6efd9');g.strokeStyle=wc[2];g.lineWidth=3;g.beginPath();for(let i=1;i<4;i++){g.moveTo(wx+i*55,-300);g.lineTo(wx+i*55,-110)}for(let i=1;i<3;i++){g.moveTo(wx,-300+i*63);g.lineTo(wx+220,-300+i*63)}g.stroke()}
   box(-1700,-580,3400,26,wc[2]);box(-64,-250,128,150,'#f3ead2');g.strokeStyle='#1b1426';g.lineWidth=8;g.beginPath();g.moveTo(-26,-222);g.lineTo(28,-206);g.moveTo(0,-232);g.lineTo(-6,-128);g.moveTo(-30,-170);g.lineTo(30,-176);g.stroke();
   [[-520,1],[-490,-1],[520,1]].forEach(q=>{g.strokeStyle=ink;g.lineWidth=9;g.beginPath();g.moveTo(q[0],-4);g.lineTo(q[0]+q[1]*26,-150);g.stroke();g.strokeStyle='#c9a05c';g.lineWidth=5;g.stroke()})}
  else if(s==='inn'){g.strokeStyle='rgba(0,0,0,.22)';g.lineWidth=2;g.beginPath();for(let x=-1600;x<=1600;x+=90){g.moveTo(x,-1000);g.lineTo(x,-10)}g.stroke();
   [-760,-240,300,820].forEach((x,i)=>{box(x-110,-200,220,12,wc[3]);for(let j=0;j<6;j++)box(x-96+j*33,-200-(22+(j*7+i*5)%16),16,22+(j*7+i*5)%16,['#7fc98a','#e8c35a','#c96a6a','#8aa8e8'][(j+i)%4],1.5);
    const lx=x+150;glow(lx,-262,130,'255,200,120');g.strokeStyle=ink;g.lineWidth=2;g.beginPath();g.moveTo(lx,-1000);g.lineTo(lx,-286);g.stroke();box(lx-17,-286,34,44,'#ffcf7a');g.fillStyle='#d0483a';g.fillRect(lx-19,-290,38,7);g.fillRect(lx-19,-244,38,7)});
   [-470,430].forEach(x=>{box(x-70,-62,140,12,'#b8834f');box(x-58,-50,10,48,wc[3]);box(x+48,-50,10,48,wc[3]);box(x-112,-34,34,32,wc[1]);box(x+78,-34,34,32,wc[1]);g.fillStyle='#fff';g.beginPath();g.ellipse(x-18,-66,15,6,0,0,TAU);g.fill();g.stroke();g.strokeStyle='rgba(255,255,255,.6)';g.lineWidth=2;for(let i=0;i<2;i++){const k=(t*.5+i*.5)%1;g.globalAlpha=1-k;g.beginPath();g.moveTo(x-22+i*8,-74-k*34);g.quadraticCurveTo(x-28+i*8,-84-k*34,x-22+i*8,-94-k*34);g.stroke()}g.globalAlpha=1})}
  else{g.fillStyle=wc[1];g.beginPath();g.moveTo(-1700,-1000);for(let x=-1700,i=0;x<=1700;x+=85,i++)g.lineTo(x,-470+((i*53)%120)-(i%2?130:0));g.lineTo(1700,-1000);g.fill();g.fillStyle=wc[2];for(let x=-1600,i=0;x<=1600;x+=240,i++){g.beginPath();g.moveTo(x-70,-8);g.lineTo(x-20,-90-((i*37)%70));g.lineTo(x+40,-8);g.fill()}
   [-640,-210,260,700].forEach((x,i)=>{const c=i%2?'120,220,255':'190,130,255';glow(x,-70,170+Math.sin(t*2+i)*18,c);[[-26,-8,-36,-76,-8,-8],[-6,-8,4,-128,22,-8],[18,-8,44,-64,48,-8]].forEach(q=>poly([[x+q[0],q[1]],[x+q[2],q[3]],[x+q[4],q[5]]],'rgb('+c+')','#fff',1.5))})}
  g.restore();return}
 if(s==='market'||s==='road'||s==='dock'||!s&&(STAGES[G.stg||0].bld==='city'))walkers();
 if(s==='camp'){poly([[-470,-4],[-360,-150],[-250,-4]],'#6a5a8a',ink,3);poly([[-392,-4],[-360,-96],[-330,-4]],'#2a2140',ink,2);g.strokeStyle=ink;g.lineWidth=2;g.beginPath();g.moveTo(-360,-150);g.lineTo(-360,-170);g.stroke();
  [[-70,-12,-40],[60,-10,40]].forEach(q=>{g.save();g.translate(q[0],q[1]);box(-34,-10,68,20,'#7a5234');circ(q[2]>0?34:-34,0,10,'#c9a074',ink,2);g.restore()});
  glow(0,-40,260+Math.sin(t*9)*20,'255,150,60');box(-40,-12,80,10,'#3a2a22');for(let i=0;i<3;i++){const h=96+Math.sin(t*11+i*2)*18-i*22,w=30-i*7;g.beginPath();g.moveTo(-w,-8);g.quadraticCurveTo(-w*1.2,-h*.5,Math.sin(t*7+i)*5,-h-8);g.quadraticCurveTo(w*1.2,-h*.5,w,-8);g.closePath();g.fillStyle=['#ff7a2a','#ffb347','#fff3b0'][i];g.fill();if(!i){g.strokeStyle=ink;g.lineWidth=2;g.stroke()}}
  for(let i=0;i<5;i++){const k=(t*.6+i*.2)%1;g.fillStyle='rgba(255,190,90,'+(1-k)+')';g.fillRect(Math.sin(i*5+t)*16,-50-k*130,3,3)}}
 else if(s==='market'){[-470,-40,390].forEach((x,i)=>{const c=['#e0564a','#3fa9ff','#ffb020'][i];box(x-92,-190,8,186,'#5a4030');box(x+84,-190,8,186,'#5a4030');box(x-86,-78,172,74,'#8a6240');
   g.beginPath();g.moveTo(x-108,-196);g.lineTo(x+108,-196);g.lineTo(x+122,-150);g.lineTo(x-122,-150);g.closePath();g.fillStyle='#fff';g.fill();g.save();g.clip();g.fillStyle=c;for(let j=-4;j<4;j+=2)g.fillRect(x+j*31,-200,31,60);g.restore();g.strokeStyle=ink;g.lineWidth=2.5;g.stroke();
   for(let j=0;j<5;j++)circ(x-62+j*31,-86,10,['#ff8a3a','#ff4d5e','#9be35a'][(i+j)%3],ink,1.5);box(x+100,-44,44,40,'#a37a4e');box(x+108,-80,36,36,'#b98c5c')});
  g.strokeStyle=ink;g.lineWidth=1.5;g.beginPath();g.moveTo(-700,-250);g.quadraticCurveTo(-250,-205,200,-250);g.quadraticCurveTo(450,-215,700,-250);g.stroke();for(let i=0;i<9;i++){const x=-640+i*160,y=-236+Math.sin(i*1.9)*10;glow(x,y+10,40,'255,200,110');box(x-8,y,16,20,i%2?'#ff6a5a':'#ffcf7a',1.5)}}
 else if(s==='road'){for(let x=-720;x<=720;x+=120){box(x-5,-78,10,76,'#7a5a3c')}g.strokeStyle=ink;g.lineWidth=9;g.beginPath();g.moveTo(-760,-64);g.lineTo(760,-64);g.moveTo(-760,-36);g.lineTo(760,-36);g.stroke();g.strokeStyle='#96724c';g.lineWidth=5;g.stroke();
  box(266,-150,8,148,'#6a4a30');poly([[230,-150],[320,-150],[338,-136],[320,-122],[230,-122]],'#c9a074',ink,2.5);poly([[310,-112],[226,-112],[208,-98],[226,-84],[310,-84]],'#b98c5c',ink,2.5);
  glow(-340,-92,110,'255,205,130');box(-352,-60,24,58,'#8f8a9a');box(-362,-112,44,52,'#a5a0b2');g.fillStyle='#ffd58a';g.fillRect(-352,-102,24,30);poly([[-372,-112],[-340,-140],[-308,-112]],'#6f6a80',ink,2);box(-366,-10,52,8,'#8f8a9a')}
 else if(s==='woods'){[-610,-350,-110,220,470,690].forEach((x,i)=>{const w=26+(i*7)%14;g.fillStyle=i%2?'#3a2a22':'#46332a';g.fillRect(x-w/2,-700,w,698);g.strokeStyle=ink;g.lineWidth=2;g.strokeRect(x-w/2,-700,w,698);g.strokeStyle='rgba(0,0,0,.3)';g.beginPath();g.moveTo(x-3,-600);g.lineTo(x-5,-20);g.stroke();
   g.fillStyle=i%2?'rgba(40,110,70,.95)':'rgba(56,130,80,.95)';[[0,-330,120],[-70,-290,80],[70,-300,86]].forEach(q=>{g.beginPath();g.arc(x+q[0],q[1]-40+Math.sin(t*.8+i)*4,q[2],0,TAU);g.fill()})});
  [-480,-230,80,350,580].forEach((x,i)=>{g.fillStyle='#2f7a4e';g.strokeStyle=ink;g.lineWidth=2;g.beginPath();g.ellipse(x,-14,54+(i*9)%20,26,0,Math.PI,TAU);g.fill();g.stroke();circ(x-14,-26,4,i%2?'#ff8fd0':'#ffe14d')})}
 else if(s==='ruins'){[[-560,230],[-330,120],[-90,300],[240,90],[470,260],[680,160]].forEach((q,i)=>{const x=q[0],h=q[1];box(x-24,-h,48,h-4,'#b9b0a0');g.fillStyle='rgba(0,0,0,.14)';g.fillRect(x-24,-h,14,h-4);g.strokeStyle='rgba(0,0,0,.25)';g.lineWidth=1.5;g.beginPath();[-10,2,14].forEach(o=>{g.moveTo(x+o,-h+6);g.lineTo(x+o,-10)});g.stroke();box(x-34,-12,68,10,'#a39a8a');if(h>200)box(x-32,-h-14,64,14,'#c9c0b0');else poly([[x-24,-h],[x-10,-h-16],[x+4,-h-4],[x+24,-h-12],[x+24,-h]],'#b9b0a0',ink,2)});
  g.save();g.translate(90,-14);g.rotate(.12);box(-60,-18,120,34,'#a8a090');g.restore();g.strokeStyle='#4a8a5a';g.lineWidth=4;g.beginPath();g.moveTo(-94,-300);g.quadraticCurveTo(-70,-240,-100,-180);g.moveTo(466,-260);g.quadraticCurveTo(500,-210,474,-150);g.stroke()}
 else if(s==='dock'){g.fillStyle='#7a5a3c';g.fillRect(-1700,-6,3400,600);g.strokeStyle='rgba(0,0,0,.3)';g.lineWidth=2;g.beginPath();for(let x=-1600;x<=1600;x+=70){g.moveTo(x,-6);g.lineTo(x*1.4,300)}g.stroke();box(-1700,-10,3400,8,'#5a4030');
  for(let x=-700;x<=700;x+=280){box(x-9,-96,18,94,'#5a4030');g.strokeStyle='#d9c9a0';g.lineWidth=4;g.beginPath();g.moveTo(x,-84);g.quadraticCurveTo(x+140,-40,x+280,-84);g.stroke()}
  box(-466,-560,12,556,'#5a4030');poly([[-456,-540],[-330,-500],[-456,-400]],'#efe6d0',ink,2.5);[[-250,0],[-196,0],[-224,-52]].forEach(q=>{box(q[0]-24,q[1]-54,48,52,'#8a5a34');g.strokeStyle='#3a2a22';g.lineWidth=3;g.beginPath();g.moveTo(q[0]-24,q[1]-40);g.lineTo(q[0]+24,q[1]-40);g.moveTo(q[0]-24,q[1]-16);g.lineTo(q[0]+24,q[1]-16);g.stroke()});box(330,-50,56,48,'#a37a4e');box(392,-40,44,38,'#b98c5c');box(346,-92,46,42,'#b98c5c')}
 g.restore()}
function envScreen(){const E=SC.env,t=G.t;g.save();
 if(E.night&&(E.set==='camp'||E.set==='woods')){for(let i=0;i<14;i++){const x=((i*.137+t*.01*(1+i%3))%1)*W,y=H*(.3+.4*((i*.61)%1))+Math.sin(t*1.3+i)*12;g.fillStyle='rgba(210,255,140,'+(.35+.35*Math.sin(t*3+i*2))+')';g.beginPath();g.arc(x,y,2.2,0,TAU);g.fill()}}
 if(EIN[E.set]){for(let i=0;i<16;i++){const x=((i*.211+t*.006)%1)*W,y=((i*.37+t*.012)%1)*H;g.fillStyle='rgba(255,240,210,.22)';g.fillRect(x,y,2,2)}}
 if(E.tint){g.fillStyle=E.tint;g.fillRect(0,0,W,H)}
 if(E.wipe>=0){const k=E.wipe,a=k<.5?clamp((k-.3)*5,0,1):clamp((.7-k)*5,0,1);if(a>0){g.fillStyle='rgba(5,2,12,'+a+')';g.fillRect(0,0,W,H)}}
 g.restore()}
try{window.CBACK=drawBackChar}catch(e){}
})();
