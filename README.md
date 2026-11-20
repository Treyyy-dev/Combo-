# Combo

A 2.5D anime fighting game that runs in the browser. The whole game is in `index.html`. `server.js` is a small Node server (no dependencies) that serves the game and pairs players for online matches.

## Play offline

Open `index.html` in a browser. Everything except online matches works this way.

## Play online (Render)

Online matches need the game server running. This repo is set up for [Render](https://render.com):

1. In the Render dashboard choose **New → Blueprint** and pick this repository. Render reads `render.yaml` and creates one free web service.
2. When the deploy finishes, open the service URL (something like `https://combo-xxxx.onrender.com`). That page is the game, and Match → Online works there.
3. Send the same URL to whoever you want to play. Two players searching in the same queue (Casual or Ranked) get matched.

Notes:

- A free Render service goes to sleep when nobody is using it. The first visit after a sleep takes up to a minute to load.
- If you host `index.html` somewhere else (GitHub Pages for example), set `ONLINE_URL` near the top of the script in `index.html` to `wss://<your-service>.onrender.com`.
- To run it on your own machine: `node server.js`, then open `http://localhost:10000`.

## What's in it

- 30 fighters, each with two skills, an 8 second cinematic ultimate and their own world
- 3 vs 3 team matches with swapping, assists and a clash cutscene when a new fighter comes in
- Offline: Team Match and Practice. Online: Casual Combo and Ranked Combo
- If nobody else is searching, online queues fill with a computer opponent (relaxed in Casual, hard in Ranked)
- Player profile with username, level, rank, icon and banner
- Friends: search a username, send a request, chat. Both players need to be online on the same server
- Gacha with 8 banners and a summon cutscene. Fighters, icons and banners all come from gems earned by playing
- The game always plays in landscape

## Controls

Every action can be rebound for keyboard and controller in Configure → Controls. Defaults:

| | Keyboard / mouse | Xbox | PS5 | Touch |
|---|---|---|---|---|
| Move | A / D | Stick or D-pad | Stick or D-pad | Drag left side |
| Jump | Space / W | A | Cross | Flick up or JUMP |
| Light attack | J / left click | X | Square | ATK |
| Heavy attack | K / right click | Y | Triangle | HVY |
| Dash | Left Shift | B | Circle | DASH |
| Skills | Q / E | LB / RB | L1 / R1 | S1 / S2 |
| Ultimate | R | RT | R2 | ULT |
| Guard | F / S | LT | L2 | GRD |
| Swap fighter | C | D-pad up | D-pad up | SWAP |
| Assist | V | D-pad down | D-pad down | AST |

Progress, friends and binds are saved in the browser's local storage. The server keeps nothing on disk.
