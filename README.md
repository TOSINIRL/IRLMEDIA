# IRL Media — ScenePacks (prototype)

This small static prototype implements the layout and interactions you described:
- Banner/header with clickable CTAs
- Clickable 'words' / buttons that act like 3D CTAs
- Scenepack tabs and a grid of covers
- Small download links under each cover
- A waitlist popup to request scenepacks

Preview locally

1. Open `irlmedia-site/index.html` in your browser (double-click or use a static server).
2. To run a quick local server from the folder (recommended):

```bash
cd irlmedia-site
python3 -m http.server 8000
# then open http://localhost:8000
```

Replace assets

- Put banner and pack cover images in `irlmedia-site/assets/` and update filenames used in `index.html`.

Publish to your GitHub (IRLMEDIA)

1. Create a repo named `IRLMEDIA` on GitHub (or use an existing one).
2. From the `tosincreates` workspace run:

```bash
cd irlmedia-site
git init
git add .
git commit -m "Add IRL Media scenepack prototype"
git remote add origin git@github.com:YOUR_USERNAME/IRLMEDIA.git
git branch -M main
git push -u origin main
```

If you prefer, I can prepare a commit and open a PR if you add me as a collaborator or share a deploy token.

Next steps I can help with

- Swap in your real images and typographic assets
- Add real download links and analytics
- Deploy to GitHub Pages or Netlify
- Polish the 3D look and add animated button interactions

Tell me which of these you'd like me to do next.
