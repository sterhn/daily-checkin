# daily check-in

A small, private daily check-in app: rate your **sleep, mood, and body** in the morning, set an intention, then close the day in the evening with boundaries, gym, and a couple of honest notes. A **trends** tab shows how the last 7/14/30 days went.

Built as a single self-contained page — no accounts, no server, no tracking. Everything is stored in your browser's local storage, on your device only.

## Features

- **Morning**: sleep / mood / body on a 1–10 scale, mood also pickable by emoji 😫→🥰, and an intention for the day
- **Evening**: how you feel now, boundary tracking (held / slipped), gym (went / rest day / skipped), "what happened", and "one honest thing"
- **Emoji mood picker**: tap an emoji to set your mood — it stays in sync with the numeric scale
- **Trends**: averages, a sleep/mood/body chart, boundary hold rates, and a mood × sleep comparison over 7, 14, or 30 days
- **Editable boundaries**: add or remove your own boundaries from the evening tab
- **Copy daily note as markdown** — paste the day into your journal or notes app
- **Export / import** your data as JSON from the trends tab
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
