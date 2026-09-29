# RIFT SMP — Minecraft Server Website

A professional, dark-themed website for the **RIFT SMP** Minecraft server.

## Features

- 🎮 Hero section with server IP **riftsmp.fun** (click to copy) + YouTube button
- 🌌 Dark purple/cyan gaming theme with animated grid + glow orbs
- 🏷️ Fixed navbar with mobile hamburger menu & scroll-spy active links
- 👑 **Shop section** with two tabs:
  - **Ranks**: PHANTOM 50 TK, SHADOW 100 TK, DEMON 200 TK, COSMIC 300 TK
  - **Money**: 100M — 50 TK, 250M — 100 TK, 1B — 300 TK, 10B — 500 TK
- 🛒 "Buy on Discord" buttons pre-fill a message and open the Discord invite
- 💬 Discord + YouTube community links (https://discord.gg/FycpnfvW)
- ✨ Scroll-reveal animations, toast notifications, fully responsive

## Files

| File            | Purpose                          |
| --------------- | -------------------------------- |
| `index.html`    | Page structure & content         |
| `css/style.css` | Dark theme styling & animations  |
| `js/main.js`    | Interactions (copy IP, tabs, …)  |
| `assets/logo.jpg` | Server logo (shown as a circle)   |

## How to preview

Open `index.html` in any browser (everything works as static files).
For a local server, run:

```bash
node _serve.js
```

Then open <http://127.0.0.1:8123/>.

## Customize

- Server IP shown on the site: edit `SERVER_IP` in `js/main.js`.
- Discord invite link is used in `index.html` (nav, shop section, footer) and
  `js/main.js` (`DISCORD_LINK` for the buy buttons).
- Prices / ranks are plain HTML in the `#shop` section of `index.html`.