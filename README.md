# Emberwake — a playable gamebook

A modern, playable rebuild inspired by [cjauvin/gamebook.js](https://github.com/cjauvin/gamebook.js).

## Play

**Live:** [https://johnconstant99-dev.github.io/gamebook-play/](https://johnconstant99-dev.github.io/gamebook-play/)

GitHub Pages is deployed from `main` by `.github/workflows/pages.yml`. First publish can take a minute or two.

You can also open `index.html` locally.

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
