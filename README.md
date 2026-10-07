# daily check-in

A small, private daily check-in app that looks like a graph-paper notebook, with cards stuck on a little crooked and a hand-drawn hoodie-wearing character: rate your **sleep, mood, and body** in the morning, set an intention, then close the day in the evening with boundaries, gym, and a couple of honest notes. A **goals** tab holds small weekly and monthly adventures, and a **progress** tab shows your streak and how the last 7/14/30 days went.

Built as a single self-contained page — no accounts, no server, no tracking. Everything is stored in your browser's local storage, on your device only.

## Features

- **Streaks**: a rubber stamp at the top shows how many days in a row you've checked in (morning *or* evening counts) — fresh ink once today is in, faded before — and a *this week* card ticks off each day
- **Autosave**: every tap and keystroke is saved immediately — no more losing a check-in because you forgot to press a button
- **Up next**: a gradient card points you at the goal with the least time left
- **Goals**: small adventures with their own streaks, shown as a grid of cards with an ink doodle for each (a folded map, a bowl of ramen, a book…) — tap one to log it — *go somewhere new* (weekly), *eat something new* (weekly, ordered or cooked), and *read a book* (monthly, with a "currently reading" note). Log what you did, see your collection grow, and add your own goals or pick from ideas
- **Morning**: sleep / mood / body on a 1–10 scale — tap or slide across to set a value — plus an intention for the day
- **Evening**: the morning's intention read back to you, how you feel now, boundary tracking (held / slipped), gym (went / rest day / skipped), a rough "spent today", "what happened", and "one honest thing"
- **Yesterday / today toggle** on the evening tab — for when you close the day after midnight. Before 5am the app opens on the evening tab already set to yesterday, and a small dot marks days you've already saved
- **The character**: your own hand-drawn character — messy pale-blue hair, tired eyes, a black hoodie — sits on top of the sleep / mood / body card and changes face as you slide: pouting at 3–4, hiding in its sleeves at 1–2, ecstatic at 9–10. Before you pick a mood it's drinking coffee in the morning and cozy in the evening, and sleepy in the small hours. It sighs when you skip the gym or slip on a boundary, does finger guns when you hold one, and gets annoyed at a blank check-in. The stickers live in `chars/` and are cached on the phone, so faces swap instantly. The mood word (drained → radiant) shows live under the slider
- **Toasts with a bit of personality**: dry, warm one-liners when you finish a check-in, with special lines for late nights and streak milestones
- **Journal**: scroll back through every intention, "what happened" and "one honest thing", newest first
- **This week's story**: the week stitched together day by day like a short diary — intentions, notes, boundaries, gym, spending, mood — with a *copy week* button for your weekly review
- **Haptics**: a tiny tick on phones that support it when you tap chips, finish a goal or save
- **Progress**: your streak and record, the last 7 days, averages vs the period before, a sleep/mood/body chart, boundary hold rates, and mood after better vs worse sleep over 7, 14, or 30 days
- **Editable boundaries**: add or remove your own boundaries from the evening tab
- **Copy daily note as markdown** — paste the day into your journal or notes app
- **Export / import** your data (check-ins and goals) as JSON from the progress tab
- **Light and dark**: follows your phone's appearance setting
- Installable as an app (PWA) and works offline

## Use it

The easiest way is GitHub Pages:

1. In this repository, go to **Settings → Pages**
2. Under **Build and deployment**, choose **Deploy from a branch**, pick your default branch and `/ (root)`, and save
3. After a minute, the app is live at `https://<your-username>.github.io/daily-checkin/`

### Install on your phone

Open the Pages URL in your browser, then:

- **Android (Chrome)**: menu ⋮ → **Add to Home screen** → **Install**
- **iPhone (Safari)**: share button → **Add to Home Screen**

It opens full-screen like a native app and works offline. Your data never leaves the device — which also means it's per-browser: use **export data** on the progress tab if you switch devices.

## Development

No build step. Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

- `index.html` — the whole app (markup, styles, logic)
- `chars/` — the character's expression stickers
- `sw.js` — service worker for offline use
- `manifest.webmanifest`, `icons/` — PWA install metadata
