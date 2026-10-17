---
name: homepage-hero
description: Sets the Ullim Games homepage hero (main visual swiper) media format. Use when the owner mentions 히어로, 메인 비주얼, GIF, MP4, hero video, hero image, or replacing the top slideshow.
---

# Homepage hero media

The top slideshow is `.main-visual.mainSwiper` in `index.html`. It is full-width video, not a GIF.

Plan first, explain in Korean, then edit after the owner agrees. Do not invent footage. Commit only when asked.

## Use MP4, not GIF

| | MP4 (use this) | GIF (do not put on the hero) |
|---|---|---|
| Tag | `<video autoplay loop muted playsinline>` | `<img>` only if the owner insists |
| Ratio | 16:9 | same, but files get huge |
| Size | 1920×1080 | keep under 1280px wide if they insist |
| Length | 8–12 s, seamless loop | short; still much heavier |
| Audio | none | none |
| File | aim ≤15 MB | avoid; a few seconds can pass 15 MB |

H.264 MP4. Class `responsive-media` so the slide stays the video’s own 16:9 height (`height: auto`, `object-fit: cover`). Do not crop the hero into a short banner.

```html
<div class="swiper-slide">
  <video src="images/hero/{name}.mp4" autoplay loop muted playsinline class="responsive-media"></video>
</div>
```

Current files stay where they are until the owner asks to move them:

- `images/mainvisual_1_replica.mp4`
- `images/main_visual_2.mp4`
- `images/main_visual_3.mp4`

New owner files go in `images/hero/{name}.mp4`.

A still frame, if they send a picture instead of video: JPG or PNG, 1920×1080, 16:9, about 1 MB. Use `<img class="responsive-media">`. Do not draw a fake gameplay frame.

## When the owner says GIF

1. Tell them the hero is built for silent looping MP4, and a GIF of the same shot is larger and softer.
2. Ask for an MP4, or convert their GIF with ffmpeg if it is installed:

```bash
ffmpeg -i hero.gif -an -movflags +faststart -pix_fmt yuv420p -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" images/hero/{name}.mp4
```

3. Put a GIF in the swiper only if they refuse MP4. Then it is an `<img>`, not a `<video>`.

Game-card covers are a different spec. Follow `add-homepage-game` for those.
