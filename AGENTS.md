# Agent Notes — Military Guesser

## Project Overview
- Static browser game where players guess military assets from images.
- Hosted on **GitHub Pages** at: https://yamatino.github.io/military-guesser/
- No build step required — pure HTML/CSS/JS.

## Key Features
- **Game modes:** Classic, Hard (excludes easy assets), Sudden Death (1 life).
- **Categories:** Land, Air, Sea, Infantry.
- **Eras:** Pre-1950, Cold War, Modern, Contemporary.
- **Hidden Mode:** Blurred image that clears slightly with each wrong guess.
- **Hints:** Year revealed after 2 wrong guesses, country after 3.
- **Stats:** Streak, high score, and accuracy tracked in `localStorage`.
- **Leaderboard:** Local-only top 10 and per-category bests stored in `localStorage`.

## File Structure
- `index.html` — Main game UI.
- `js/db.js` — Asset database (100 military assets with images, aliases, categories, years, countries, difficulty).
- `js/game.js` — All game logic, event listeners, and `localStorage` persistence.
- `css/style.css` — Styling.
- `assets/images/` — JPG images for each asset.
- `tool.html` — Utility page (not part of the main game).

## Deployment
- Repo: https://github.com/Yamatino/military-guesser
- Branch: `main`
- GitHub Pages source: `main` branch, `/(root)` folder.
- To update the live site: commit and push to `main`. GitHub Pages redeploys automatically.

## Notes
- No backend or global leaderboard — everything is client-side.
- Image paths are relative: `assets/images/<filename>`.
