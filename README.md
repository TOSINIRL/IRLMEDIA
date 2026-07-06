# IRL Media — ScenePacks (prototype)

This small static prototype implements the layout and interactions you described:
- Banner/header with clickable CTAs
- Clickable 3D-style buttons for categories
- ScenePack tabs and a cover grid
- Download buttons under each pack cover
- A waitlist request pop-up

## Preview locally

Open `irlmedia-site/index.html` directly, or run a simple server:

```bash
cd irlmedia-site
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Replace assets

Add your own banner images and cover art to `irlmedia-site/assets/` and update the filenames in `index.html`.

## Push to GitHub

If you want to publish this branch to your IRLMEDIA repo:

```bash
cd irlmedia-site
git status
git add .
git commit -m "Update ScenePacks prototype layout"
git push
```

This repository already has a branch pushed as `irlmedia-prototype-final`.

## Next steps

- Replace placeholder images with real scenepack art
- Add real download URLs for each pack
- Add a live form backend for the waitlist
- Improve the hero panel with custom typography and graphics
