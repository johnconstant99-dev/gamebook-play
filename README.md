# Emberwake — a playable gamebook

A modern, playable rebuild inspired by [cjauvin/gamebook.js](https://github.com/cjauvin/gamebook.js).

The 2013 project was an IF-style engine on top of *Fire on the Water* (Lone Wolf / Project Aon). That book text is copyrighted and cannot live in this repo. This project keeps the *idea* — type a command, the engine matches it to a hidden choice — and turns it into a self-contained game you can finish.

## Play

Open `index.html` in a browser, or enable GitHub Pages on this repository (Settings → Pages → Deploy from `main` → `/`).

You can:

- Click choices
- Type commands (`board ferry`, `sneak`, `attack`, `buy wine`)
- Fight with a random-number combat loop
- Spend gold, loot, drink emberwine / use salve
- Save and load in the browser

## Why not the original book?

Project Aon allows certain Lone Wolf mashups only when the copyrighted JSON stays on their servers. This repo ships an original short adventure, **Emberwake: The Last Light of Vellhaven**, so the game runs offline with no remote book file.

## Files

| File | Role |
| --- | --- |
| `index.html` | Shell |
| `styles.css` | Layout and theme |
| `engine.js` | Parser, combat, save, action chart |
| `story.js` | Original sections, options, synonyms |

## Credit

Parser concept and “suspension of parser disbelief” belong to Christian Jauvin’s [gamebook.js](https://github.com/cjauvin/gamebook.js). This is a separate playable work, not a drop-in replacement for the FotW demo.
