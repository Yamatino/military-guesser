# Agent Notes — Military Guesser

## Project Overview
- Static browser game where players guess military assets from images.
- Hosted on **GitHub Pages** at: https://yamatino.github.io/military-guesser/
- No build step required — pure HTML/CSS/JS.

## Key Features
- **Game modes:** Classic, Hard (excludes easy assets), Sudden Death (1 life).
- **Categories:** Land, Air, Sea, Infantry.
- **Eras:** World War II (≤1945), Cold War (≤1991), Post-Cold War — derived from `year` via `getEra()`.
- **Hidden Mode:** Blurred image that clears slightly with each wrong guess.
- **Hints:** Year revealed after 2 wrong guesses, country after 3.
- **Stats:** Streak, high score, and accuracy tracked in `localStorage`.
- **Leaderboard:** Local-only top 10 and per-category bests stored in `localStorage`.
- **Multiplayer:** Keyword lobbies, host-authoritative rounds with a timer and speed-based points.

## File Structure
- `index.html` — Main game UI.
- `js/db.js` — Asset database (~380 military assets with images, aliases, categories, years, countries, difficulty).
- `js/game.js` — Single-player logic, event listeners, `localStorage` persistence; exposes `window.GameAPI` for multiplayer.
- `js/multiplayer-rtdb.js` — Multiplayer (PeerJS WebRTC data channels + Firebase RTDB lobby registry).
- `database.rules.json` / `firebase.json` — Firebase Realtime Database security rules.
- `css/style.css` — Styling.
- `assets/images/` — JPG images for each asset.
- `tool.html` — Utility page (not part of the main game).

## Deployment
- Repo: https://github.com/Yamatino/military-guesser
- Branch: `main`
- GitHub Pages source: `main` branch, `/(root)` folder.
- To update the live site: commit and push to `main`. GitHub Pages redeploys automatically.

## Multiplayer architecture
- Firebase RTDB holds only `militaryGuesserLobbies/<keyword> = { hostPeerId, created }`. A transaction claims the keyword; whoever wins hosts, everyone else connects to `hostPeerId` via PeerJS (public 0.peerjs.com signalling server).
- The host is authoritative: picks assets, validates guesses, scores, and broadcasts state. Clients only send `join` / `ready` / `guess` / `leave`.
- `join` carries `PROTOCOL_VERSION` and a db signature; the host rejects mismatches (stale cached `db.js`). Bump `PROTOCOL_VERSION` when changing message formats.
- If Firebase returns "permission denied", the rules have expired or been reset — redeploy `database.rules.json` (`firebase deploy --only database`, or paste into the Firebase console → Realtime Database → Rules).

## Notes
- No backend or global leaderboard — everything is client-side (Firebase is only a lobby registry).
- When changing JS/CSS, bump the `?v=` query string on the `<script>`/`<link>` tags in `index.html` so GitHub Pages caches don't serve stale files.
- Image paths are relative: `assets/images/<filename>`.
