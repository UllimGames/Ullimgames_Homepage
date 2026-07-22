# Fruit Valley (WebGL)

Drop your Unity **WebGL** build files into this folder (overwrite `index.html` and add `Build/`, etc.).

## Recommended Unity settings (GitHub Pages)

1. Platform: **WebGL**
2. Compression Format: **Disabled** (GitHub Pages often fails with Brotli/Gzip builds)
3. Publish the build, then copy **all** output files into this folder

## After copying

Open `/play/fruit-valley/` on the site. The play page loads this folder via iframe.

If you replace `index.html` from a new Unity build, keep this line inside `<head>` (right after `<title>` is fine):

```html
<base href="/games/fruit-valley/">
```

Without it, some local servers break relative `Build/` paths.

## How to replace a rebuild (simple)

1. In Unity: WebGL build, Compression **Disabled**
2. In this folder (`games/fruit-valley/`): delete old files (`index.html`, `Build/` folder, etc.)
3. Copy the **new** build output here (all files)
4. Open the new `index.html` and add the `<base href=...>` line again if missing
5. Refresh the browser (Ctrl+F5)

