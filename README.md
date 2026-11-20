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

- 30 fighters, each with two skills, a cinematic ultimate and their own world
- 3 vs 3 team matches with swapping and assists
- Offline: Team Match and Practice. Online: Casual Combo and Ranked Combo
- Gacha with 8 banners and a summon cutscene, paid for with gems earned by playing
- Intro and ending cutscenes with matchup dialogue

## Controls

| | Keyboard / mouse | Controller | Touch |
|---|---|---|---|
| Move | A / D | Stick or D-pad left/right | Drag left side |
| Jump | W / Space | A | Flick up or JUMP |
| Light attack | Left click / J | X | ATK |
| Heavy attack | Right click / K | Y | HVY |
| Dash | Shift | B | DASH |
| Skills | Q / E | LB / RB | S1 / S2 |
| Ultimate | R | RT | ULT |
| Guard | F / S | LT | GRD |
| Swap fighter | C | D-pad up | SWAP |
| Assist | V | D-pad down | AST |

Progress is saved in the browser's local storage.
