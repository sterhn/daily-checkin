# daily check-in

A small, private daily check-in app, dressed as a vintage newspaper — *The Daily Check-In*: rate your **sleep, mood, and body** in the morning, set an intention, then close the day in the evening with boundaries, gym, and a couple of honest notes. A **goals** tab holds small weekly and monthly adventures, and a **trends** tab shows how the last 7/14/30 days went.

Built as a single self-contained page — no accounts, no server, no tracking. Everything is stored in your browser's local storage, on your device only.

## Features

- **Streaks**: a strip at the top shows how many days in a row you've checked in (morning *or* evening counts), your best run, and this week at a glance — left half of each circle is the morning, right half the evening
- **Autosave**: every tap and keystroke is saved immediately — no more losing a check-in because you forgot to press a button
- **Goals**: small adventures with their own streaks — *go somewhere new* (weekly), *eat something new* (weekly, ordered or cooked), and *read a book* (monthly, with a "currently reading" note). Log what you did, see your collection grow, and add your own goals or pick from ideas
- **Morning**: sleep / mood / body on a 1–10 scale — tap or slide across to set a value — plus an intention for the day
- **Evening**: how you feel now, boundary tracking (held / slipped), gym (went / rest day / skipped), "what happened", and "one honest thing"
- **Yesterday / today toggle** on the evening tab — for when you close the day after midnight. Before 5am the app opens on the evening tab already set to yesterday, and a small dot marks days you've already saved
- **Mood face picker**: a row of ten minimal line-drawn faces, frown to smile — tap one to set your mood, in sync with the numeric scale, each with its own word (drained → radiant)
- **Trends**: averages, a sleep/mood/body chart, boundary hold rates, and a mood × sleep comparison over 7, 14, or 30 days
- **Editable boundaries**: add or remove your own boundaries from the evening tab
- **Copy daily note as markdown** — paste the day into your journal or notes app
- **Export / import** your data (check-ins and goals) as JSON from the trends tab
- **Day and night editions**: cream newsprint by day, a dark night edition — toggle it in the masthead
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

It opens full-screen like a native app and works offline. Your data never leaves the device — which also means it's per-browser: use **export data** on the trends tab if you switch devices.

## Development

No build step. Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
```

- `index.html` — the whole app (markup, styles, logic)
- `sw.js` — service worker for offline use
- `manifest.webmanifest`, `icons/` — PWA install metadata
