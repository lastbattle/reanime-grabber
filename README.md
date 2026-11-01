# Re:ANIME Grabber

A small unpacked Chrome/Edge extension for saving episodes played on reanime.to.

## What it does

Re:ANIME embeds its player from FlixCloud. The extension watches for that player iframe while you are on a watch page, remembers the episode, and adds a popup action to start the site's direct-file download flow.

When you press **Download**, the extension:

1. Opens the matching FlixCloud download page.
2. Uses a content script to complete that page's two-step download control.
3. Lets the browser save the original video file, normally under `Downloads`.

This avoids scraping or downloading the protected HLS playlist separately; the request stays in the normal browser context with its cookies and origin.

## Install unpacked

1. Open `chrome://extensions` or `edge://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select this folder.

In Chromium-based Edge, developer mode may need to remain enabled for an unpacked extension to stay active.

## Use

1. Open an episode on `reanime.to`.
2. Wait for the player to appear.
3. Click the extension icon.
4. Press **Download**.

The popup can also copy the detected player link. The extension is intentionally narrow: it supports the Re:ANIME / FlixCloud flow rather than acting as a general HLS downloader.
