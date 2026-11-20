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
const VO={"1A":{"p":"4db1992010ac4cd08c8d129b2283d93a","c":"5f2b230799ea4c859f50a16a57471a48","t":[["e05a5e83b2994d0fbb477c765ca8e91d",6.78],["7e718684ae0e4c68bcb4ec8f684affb7",5.2],["3750fac758864081ad8bf2391cf9b4dd",3.9],["aefdfa5ca5c84ff5824112d371e2fb5f",3.58],["718815df1536423e8ae1f7a24a65e336",5.43],["a5d57a800bcd4586b3a1716b8598a3d8",2.55],["8b0163d2d0bd4c1682552438361a6e14",5.53],["342fd83e203e432b84f666f294bf3d9e",7.34],["e4c84be4a55c45d49719e3b2929e450f",5.2],["7128391460254d71a9bfcd250f5ef26d",3.16],["35f21e0623f34cf6aa9392c3bba489b9",6.18],["c2429da1caf44b25bf06fc6e8f786d7b",2.97]]},"2A":{"p":"82abf3b8a3c140afb6410046f042405d","c":"315df2d4b7b443499b151eef44dee252","t":[["ac24e48d06f3405889b5c20487633b58",3.39],["0a9f6ba24c554d0799fb35745b818578",4.88],["8dc8718723b640edb52e602123e4fa51",7.01],["2e6bb4495d6a4261a6d7910744d03b14",3.76],["5b3de4bfe5384fd5b68cfaec785d9796",7.94],["1c8507eb3a1149acb93120ad75b10b39",1.53],["07b55ae687454a38b858248160d61416",4.69],["50c758eff25e4e9cbbf0d1d4c3472312",4.46],["0f8accace9054e0c98741d419a6bcd54",6.92],["b3f46d8cbf684e7283dbab6b66915aa1",1.58],["07743290b712488ebfd06f828a50e4d6",4.83],["92f6c24f518841f5b441b4d1087841b8",2.65]]},"3A":{"p":"82abf3b8a3c140afb6410046f042405d","c":"7763e5bda13a4b69b8fa85b83f6b17a1","t":[["91c5c1317ee042689c2dc4a7f108fa3d",6.36],["ecfbe1b411604eff82f2b33db70fbc7a",5.9],["9bc558ebb00e462eb7888fb928662171",12.63],["faa3468a63524e9ebeb8e9914e708a38",2.41],["c60d1ec918434a15a157ae27f2da8d6a",10.77],["525df8cf0bd34b139f21778f498d4a8c",4.13],["0d5cc0f7f99a4ea28b516a97c4a7e88d",11.56],["35f68cb6849e4ea79136f75fedb887d8",2.6],["67668c1f867e46c28b57911594663cfd",11.19],["da7a99c2d1ab476d8583e9e6c934d591",5.34],["8ff5de7b1c574e59badfabb841549165",5.53],["7e7f4ffd85f14a80b06d9e58ae97ac2a",5.06]]},"4A":{"p":"82abf3b8a3c140afb6410046f042405d","c":"6b2845bd14b14937b436a4a0a7855f83","t":[["420c63ca567446fbae9e442c30c2d03c",4.46],["4f19bce37b994ec2838968d7d34de400",3.02],["c2bbe14b49af4f719e89811bf116d61f",4.32],["b8b684e64b6644d3b81551cb1e9faa85",0.98],["60df01a67ac248e19f26cd248eefcef8",5.34],["a74fb88739fd49fba57017853a20920f",5.99],["f9823c09cbff47209ecb38f506631bce",6.5],["ef454c81b57e45a085fd19ab7fe32e7a",8.17],["9674695fa34c408db2b2cad98e03a548",5.29],["2a6d8ab54bbb457f90a3cc2f7b29a642",6.64],["48ab4ff173954a298168fae146274de1",2.14],["93dea0857b0e4306a12cd438502647fa",5.9],["16e5de6757794b0db158df781db0702c",7.06]]},"5A":{"p":"82abf3b8a3c140afb6410046f042405d","c":"138d4ab0148942a481c51e16dffe846e","t":[["bb96f46be08a4348b9cc842b73c41d56",4.46],["23bb47813510416cb665fb85722ec71d",2.83],["26fd772961ea4cf0aabac9067d748906",9.85],["31f819f83cdd4539b888615c72de8e09",5.48],["241a32810a9341d5954683cba390bd5c",7.57],["d266d3000967489eb8ceba095daa5109",1.16],["a7c4338d0c4d48a0b2a1116c008ebb2f",8.17],["b0d08f87046d463aa7ed8a3958a684e0",7.48],["00203253ccdb4b7da59ce789c48cde49",5.15],["50d5e512810d4903940444cae58b3edf",2.88],["7815dcfd426b4db2839b6c14a8bd95b9",5.8],["fad4aa7f17664f938f7aeeff12fbbb3b",2.6]]},"6A":{"p":"82abf3b8a3c140afb6410046f042405d","c":"f38740c8db7d4d3bafd2d27aa6be2282","t":[["07aff3bf6ee9435eb1bb13ffe85b438e",7.34],["ea18935cbd424d44814f9ee9825dee08",3.67],["b70bba3d7ac94bb794a7b40a92b25473",6.87],["7ab6986fece84ddf8149880df38eacd3",3.16],["eedf6b411211487b9fe924222ad485a6",5.39],["099d08425bc9447a9cc106f2735a0035",4.97],["315005c5ee32489999418a914fd7f7d0",9.43],["1e7f2399a71d4321822c4bbe271c34a5",2.55],["3d95b531d4144dd78abcad809ba26a47",11.01],["0b6bd6c73aa14f058b4c79edb618ae3f",2.32],["4c4af67b174a4539b9e951694b7ceb88",7.38],["5bc5bf376f5742fc971304a4589c2fb9",5.29],["9a2edf8f8aa64b2eb54d16d29382c8b9",4.92],["0ffbf86c70ea4358a3e8038c4acb1be3",3.9]]},"7A":{"p":"82abf3b8a3c140afb6410046f042405d","c":"e4de8c5c1c3249ba975b4ba2db9e8323","t":[["d3dd564019d547e38f0205a66e10a3c1",3.07],["b00b98a59389441c9369fec25b4f4518",5.43],["35c439dbf7474407a31460c38030f5ad",8.22],["eb1d641a213349c29f4c25681bd25317",2.0],["cb5d0f6ee83d4b49ad286e2a273496a4",7.01],["6fea1077d11848beb3eaf9e6847d6e20",2.51],["e903e5b5bdeb45f78f3f7969e08c7cbf",6.59],["3da24c5388dc4433831ded184ff55308",1.07],["0ada6113d25c4c76aea964038f7e5c7c",7.94],["92478f40e15341f7955eb5b8de37f5d1",4.37],["7b2063562dd849ed9a6181c0142168ce",1.49]]},"8A":{"p":"82abf3b8a3c140afb6410046f042405d","c":"a63ea71964444ea7bd801bbe6e1009f7","t":[["06dee6c0cae34eb687e03defa9d3fb31",4.78],["10e50f8471ae48919bb2cca0cf4a14da",4.6],["2545982f91bc4ab78ad6311ece1b8bf6",9.71],["4b78c83644d140d48d082e3a6bf23321",1.35],["0a2fdb3d7c4846868e595ac2607944ca",1.39],["ecd17bf581c24a41bf3353fd23a9fd67",7.66],["d916ad9a08594d908eec8a4d5951d2c1",6.87],["ff2cc46fdb7e4521ac18b274f68fa2a0",5.71],["73c1c952958544c18d5f7b2e2ff0dfcd",7.29],["5c8cab740b0746039d7e2061af62c623",4.74],["32cc44a5df744e0fbb3219854f63343c",3.85]]},"9A":{"p":"82abf3b8a3c140afb6410046f042405d","c":"906107926bce47799f7db17211191da9","t":[["8677704b20d7437b991382938e3b4333",3.62],["b70175f7631249a993cf81b59585bd56",2.51],["5def09c2dad6466fa4f5da520ae81390",5.06],["f09472a7e0074a6e906d88724ac27e70",3.76],["dea2371f3acb4e3db74e12d07e46ad27",8.54],["1d02b268dfc340729714c61ae61223f4",4.78],["81a472dc64dd48318b02346a87e552a1",6.87],["98e8348fc78148f8801c92d50eb4bdfe",8.73],["3bb6d460088a4e72af9cac3178fda350",3.39],["aa2cb7f2a5234fa2b0bcb18a70ee5d7c",4.6],["345eb6b6e993476d879ded7a87bf12d8",1.95],["5aa583422a4f4b97840e1ef68b0ea521",6.73],["0608f3f729284593afa44ec9447ae881",2.79],["dd5ad8b2e10840cc956813db8cb804b3",8.03],["536c1752077b467dbf65212370a98fc7",2.65]]},"10A":{"p":"82abf3b8a3c140afb6410046f042405d","c":"44a665df26674e42b54e0e9324053c54","t":[["50010999eff041b182c7959e1705c0f5",4.83],["954ef9e68b9e4437a789734c689028c7",1.9],["d051c84b8e2b4267874ce290685029f8",5.25],["f17e7c4e37f944499e4188200391ce5d",7.99],["fe6d7009f109410e90f0abca91563a99",2.93],["8c502d6729cf4314acc97160c001c836",11.15],["74d7a391afba449196cf3b190cf7adf3",2.14],["8bd752a1acc54b7c856640dd4efa14e5",9.89],["d392e92620724d739db079af62b105bb",3.62],["14ce535aa4704f8d9e255b888f0a2296",6.04],["580b1df2d1e745b89bf079bd57da5545",2.83],["ddc506083f72473cbdd80acdbdf83e65",5.8]]},"10B":{"p":"82abf3b8a3c140afb6410046f042405d","c":"74be67b07d5948939f3e36c100ac9cf1","t":[["9aea2721a74c49309f87b1f8e71657b4",5.39],["094d8ceb6a1c4398b159e8d153c5aa88",6.13],["810c8c638cd0445785d0805ce37716c1",4.69],["19e416b4cb594d7ca71f17fdcaab4890",7.76],["8eada4b426ec410d8a3ce84523414ad9",1.72],["f1ebe1abfbb04073b065aab3785a8c71",7.99],["b07a778c383645f49a4dfb84cce7e0c9",7.99],["e2f75c4b2a02407ea8b9d0c6009349a5",2.88],["e5a2a0b5f70947d89dc733a5253c87c4",9.24],["86cadb8618244af98673f59c88f00bc8",7.71],["3bf0bebb5b994151992deccdf35b8772",7.38]]}};
/* Story voices: one clip per line, streamed from Fish Audio. VO is keyed by quest number + A (the scene) or B (the scene after a boss). */
const VBASE='https://platform.r2.fish.audio/studio_block_audio/',VX={el:null,ok:false};
let SIL=null;function silent(){if(SIL)return SIL;const n=2400,b=new Uint8Array(44+n*2),dv=new DataView(b.buffer),w=(o,t)=>{for(let i=0;i<t.length;i++)b[o+i]=t.charCodeAt(i)};w(0,'RIFF');dv.setUint32(4,36+n*2,true);w(8,'WAVEfmt ');dv.setUint32(16,16,true);dv.setUint16(20,1,true);dv.setUint16(22,1,true);dv.setUint32(24,24000,true);dv.setUint32(28,48000,true);dv.setUint16(32,2,true);dv.setUint16(34,16,true);w(36,'data');dv.setUint32(40,n*2,true);let q='';for(let i=0;i<b.length;i++)q+=String.fromCharCode(b[i]);return SIL='data:audio/wav;base64,'+btoa(q)}
/* Phones only let a sound element play after it was started inside a tap, so the one voice element is started (silently) on the first tap and reused for every line. */
function vxUnlock(){try{if(!VX.el){VX.el=new Audio();VX.el.preload='auto'}if(VX.want){const u=VX.want;VX.want=null;vxPlay(u);VX.ok=true;return}if(VX.ok||(VX.el.src&&!VX.el.paused))return;VX.el.src=silent();VX.el.volume=0;const p=VX.el.play();VX.ok=true;if(p&&p.catch)p.catch(()=>{VX.ok=false})}catch(e){}}
function vxPlay(url){try{if(!VX.el){VX.el=new Audio();VX.el.preload='auto'}const a=VX.el;a.pause();a.src=url;a.volume=[0,.6,1][SV.set.vol]||0;const p=a.play();if(p&&p.catch)p.catch(()=>{VX.want=url;VX.ok=false})}catch(e){}}
function vxStop(){VX.want=null;try{if(VX.el&&!VX.el.paused)VX.el.pause()}catch(e){}}
try{['pointerup','touchend','click'].forEach(e=>window.addEventListener(e,vxUnlock,{passive:true}))}catch(e){}
const cps=b=>b.cps||34;
const TOTAL=180,TITLE=3.5;
function layout(q,lines,after,qi){const fight=!after&&q.k!=='T',B=[],nl=lines.length;let D=0;lines.forEach(b=>{b.dur=b.vd?b.vd+.9:2.6+.09*b.line.length;if(b.vd)b.cps=Math.max(12,b.line.length/Math.max(.6,b.vd*.9));D+=b.dur});
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
function sceneStep(rdt){if(!SC)return;const dt=rdt;cam.sh=Math.max(0,cam.sh-rdt*60);
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
 const lbx=SC.kind==='eyes'&&SC.title<=0?.2:.08;SC.lb=lerp(SC.lb||.08,lbx,.18);g.fillStyle='#05020c';g.fillRect(0,0,W,H*.08);g.fillRect(0,H-H*.08,W,H*.08);if(SC.lb>.085){g.fillRect(0,0,W,H*SC.lb);g.fillRect(0,H-H*SC.lb,W,H*SC.lb)}
 if(SC.card&&SC.title<=0&&!SC.card.f.hide){const cd=SC.card,c=cd.f.c,t=cd.t,k=ease(clamp(t*4,0,1))*clamp((2.6-t)*4,0,1),y=H*.74,w=Math.min(300,W*.4),x=-w+k*(w+0);g.save();g.globalAlpha=clamp(k*1.4,0,1);g.beginPath();g.moveTo(x,y);g.lineTo(x+w,y);g.lineTo(x+w-22,y+52);g.lineTo(x,y+52);g.closePath();g.fillStyle=c.col;g.fill();g.strokeStyle=INK;g.lineWidth=4;g.stroke();g.fillStyle='rgba(10,4,24,.35)';g.fillRect(x,y+34,w-14,18);txt(c.name,x+16,y+19,30,'#fff',INK,'left',FB,7);txt(c.title.toUpperCase(),x+16,y+43,12,'#fff',INK,'left',FU,3);g.restore()}
 if(G.flash>0){g.fillStyle='rgba(255,255,255,'+Math.min(.85,G.flash)+')';g.fillRect(0,0,W,H)}
 const q=QS[SC.qi];
 if(SC.title>0){const al=clamp(Math.min((TITLE-SC.title)*3,SC.title*3),0,1),fs=Math.min(58,W*.08);g.save();g.globalAlpha=al;txt('CHAPTER 1  ·  QUEST '+(SC.qi+1),W/2,H*.3,fs*.34,'#ffd58a',INK,'center',FU,4);g.save();g.translate(W/2,H*.3+fs*.72);g.rotate(-.02);txt(q.t.toUpperCase(),0,0,Math.min(fs,W*.9/(q.t.length*.56)),'#fff',INK,'center',FB,10);g.restore();txt(STAGES[G.stg].name+'  ·  '+(q.k==='T'?'STORY':q.k==='B'?'BOSS FIGHT':'FIGHT'),W/2,H*.3+fs*1.5,fs*.3,q.k==='B'?'#ff9aa6':'#7fdcff',INK,'center',FU,4);g.restore()}
 else if(b){if(b.line){if(sp)bubble(sp,b);else{const fs=18,mw=Math.min(W*.8,640);g.font='italic 700 '+fs+'px '+FU;const ls=wrap(b.line,mw),lh=fs*1.3,bh=ls.length*lh+20,by=H*.9-bh,bw=mw+44,bx=(W-bw)/2;g.save();g.globalAlpha=clamp(SC.t*5,0,1);rr(bx,by,bw,bh,10);g.fillStyle='rgba(6,3,16,.8)';g.fill();g.strokeStyle='rgba(255,255,255,.35)';g.lineWidth=1.5;g.stroke();let n=(SC.t*cps(b))|0;ls.forEach((l,i)=>{const s2=l.slice(0,Math.max(0,n));n-=l.length+1;g.font='italic 700 '+fs+'px '+FU;if(s2)txt(s2,W/2-g.measureText(l).width/2,by+10+lh*(i+.5),fs,'#fff',INK,'left',FU,3)});g.restore()}}
  const left=Math.max(0,SC.left-SC.t),mm=(left/60)|0,ss=('0'+((left|0)%60)).slice(-2);txt((SC.qi+1)+'. '+q.t.toUpperCase()+'   ·   '+mm+':'+ss,14,H*.04,12,'#e6dcff',null,'left',FU);
  g.fillStyle='rgba(255,255,255,.18)';g.fillRect(0,H*.08-3,W,3);g.fillStyle='#ffe14d';g.fillRect(0,H*.08-3,W*clamp(1-left/SC.tot,0,1),3);
  if(!SC.after&&q.k==='T'&&left<3.2){g.save();g.globalAlpha=clamp((3.2-left)*1.5,0,1);g.translate(W-22,H*.82);g.rotate(-.03);txt('TO BE CONTINUED  ▶',0,0,24,'#fff',INK,'right',FB,7);g.restore()}
  txt(lastDev==='touch'?'PLAYING  ·  TAP TO GO FASTER':'PLAYING  ·  CLICK OR PRESS ENTER TO GO FASTER',W/2,H-H*.04,11,'#e6dcff',null,'center',FU)}
 const sk={x:W-118,y:H*.08+8,w:104,h:34};hit(sk.x,sk.y,sk.w,sk.h,()=>{if(SC)endScene()});g.save();g.beginPath();g.moveTo(sk.x+8,sk.y);g.lineTo(sk.x+sk.w,sk.y);g.lineTo(sk.x+sk.w-8,sk.y+sk.h);g.lineTo(sk.x,sk.y+sk.h);g.closePath();g.fillStyle='rgba(10,4,24,.78)';g.fill();g.strokeStyle='#fff';g.lineWidth=2.5;g.stroke();txt('SKIP  »',sk.x+sk.w/2,sk.y+sk.h/2+1,18,'#ffe14d',INK);g.restore();
 hit(0,0,W,H,advance)}
function drawStory1(){if(PEND!=null){const p=PEND;PEND=null;if(QS[p].a.length){startScene(p,true);return drawScene()}}
 scr();const dn=done();if(G.spg==null)G.spg=Math.min(9,(dn/10)|0);G.spg=clamp(G.spg|0,0,9);if(G.sfo!==dn){G.sfo=dn;if(G.spg===((dn/10)|0))G.focus=dn%10}const pg=G.spg,gap=8,bw=Math.min((W-40)/2,430),bh=Math.min(54,(H-150)/5-gap),x0=(W-(bw*2+gap))/2,y0=92;
 txt('CHAPTER 1  ·  PART '+(pg+1)+':  '+ARCS[pg],W/2,72,17,'#ffe14d',INK,'center',FB,5);
 for(let k=0;k<10;k++){const i=pg*10+k,q=QS[i];if(!q)break;const x=x0+(k%2)*(bw+gap),y=y0+(k/2|0)*(bh+gap),open=i<=dn,cl=i<dn,col=q.k==='T'?'#3fa9ff':q.k==='B'?'#ff3d5a':'#ffb020';
  const foc=hit(x,y,bw,bh,()=>{if(open)startScene(i,false);else G.note={t:'Clear quest '+(dn+1)+' first',T:2}});
  g.save();rr(x,y,bw,bh,10);g.fillStyle=open?'rgba(10,4,24,.74)':'rgba(10,4,24,.4)';g.fill();g.strokeStyle=foc?'#ffe14d':open?col:'rgba(255,255,255,.2)';g.lineWidth=foc?4:2;g.stroke();g.globalAlpha=open?1:.45;
  const hc=CH[q.k==='T'?q.cast[q.cast.length>1?1:0]:q.foe[0]];g.save();g.beginPath();g.rect(x+4,y+4,48,bh-8);g.clip();drawHead(hc,x+28,y+bh/2+5,Math.min(1.45,bh/38),1,'');g.restore();
  txt((i+1)+'. '+q.t.toUpperCase(),x+60,y+bh*.36,Math.min(18,(bw-150)/(q.t.length*.55+2)),'#fff',INK,'left');
  g.font='700 10.5px '+FU;const tag=q.k==='T'?'STORY':q.k==='B'?'BOSS':'FIGHT',tw=g.measureText(tag).width+12;rr(x+60,y+bh*.58,tw,15,4);g.fillStyle=col;g.fill();txt(tag,x+60+tw/2,y+bh*.58+8,10.5,'#10061e',null,'center',FU);
  txt(q.k==='T'?q.cast.map(c=>CH[c].name).join(', '):'vs '+q.foe.map(c=>CH[c].name).join(', '),x+68+tw,y+bh*.58+8,11,'#cbbfe6',null,'left',FU);
  txt(cl?'CLEAR':open?'PLAY':'LOCKED',x+bw-12,y+bh*.5,14,cl?'#7fdcff':open?'#ffe14d':'#aaa',INK,'right');g.restore()}
 const py=y0+5*(bh+gap)+2;pager(W/2-78,py,'spg',10);txt(dn+' / '+QS.length+' quests cleared  ·  fights use your team from TEAMS',W/2,py+44,12,'#e6dcff',null,'center',FU);hdr('STORY','menu')}
/* ---------- hooks ---------- */
{const s0=SCR.story;SCR.story=function(){if(F().story1)drawStory1();else if(s0)s0()};SCR.scene=drawScene;BACK.story='menu';BACK.scene='story'}
{const u0=update;update=function(rdt){u0(rdt);if(G.mode==='scene')sceneStep(rdt);musicTick()}}
{const e0=exprOf;exprOf=function(f){if(G.mode==='scene'&&SC){const b=SC.beats[SC.i];if(SC.title<=0&&b&&b.line&&SC.sp===f&&(b.vd?SC.t<b.vd:SC.t*34<b.line.length))return Math.sin(G.t*18)>0?'talk':(f.ex||'');if(f.ex)return f.ex;if(f.state==='pose'||f.state==='idle')return f.at%3.3<.1?'blink':''}return e0(f)}}
{const m0=menuAct;menuAct=function(a){if(G.mode==='scene'&&SC){if(a==='ok')advance();else if(a==='back'){SC=null;G.al=[];vxStop();goto('story')}return}m0(a)}}
{const f0=finish;finish=function(win){const r=G.rules;f0(win);if(r&&r.type==='story1'&&win){mark(r.q);if(G.res)G.res.sub='QUEST '+(r.q+1)+' CLEAR';if(QS[r.q].a.length)PEND=r.q}}}
{const r0=rlab;rlab=function(){const r=G.rules;return r&&r.type==='story1'?'QUEST '+(r.q+1)+(QS[r.q].k==='B'?'  ·  BOSS':''):r0()}}
})();
