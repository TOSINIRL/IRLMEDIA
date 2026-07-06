<<<<<<< HEAD
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
=======
# PureHearted Studioz

**Live Website:** [https://tosinirl.github.io/IRLMEDIA/](https://tosinirl.github.io/IRLMEDIA/)

---

## Setup Guide

Your website is deployed on GitHub Pages. Follow these steps if you need to re-configure the email form.

### Step 1: Set up EmailJS (For Booking Emails)

To make the booking form send emails to you, you need a free EmailJS account.

1.  **Create Account**: Go to [EmailJS.com](https://www.emailjs.com/) and sign up for a free account.
2.  **Add Service**:
    - Click "Email Services" -> "Add New Service".
    - Select "Gmail" (or your preferred provider).
    - Click "Connect Account" and follow the prompts.
    - Click "Create Service".
    - **Copy the `Service ID`** (e.g., `service_xyz123`).
3.  **Create Email Template**:
    - Click "Email Templates" -> "Create New Template".
    - Design your email. Use these variables in the template (they match your code):
        - `{{to_name}}` (This will be "PureHearted Studioz")
        - `{{from_name}}` (Customer's Name)
        - `{{from_email}}` (Customer's Email)
        - `{{service}}` (Selected Service)
        - `{{date}}` (Selected Date)
        - `{{message}}` (Full message string)
    - Save the template.
    - **Copy the `Template ID`** (e.g., `template_abc456`).
4.  **Get Public Key**:
    - Go to "Account" (click your name in top right).
    - **Copy the `Public Key`**.

### Step 2: Update Your Code

You need to paste your keys into the code I wrote.

1.  Open `index.html`.
    - Find `emailjs.init("YOUR_PUBLIC_KEY");`.
    - Replace `YOUR_PUBLIC_KEY` with the key you copied in Step 1.4.
2.  Open `script.js`.
    - Find `emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)`.
    - Replace `YOUR_SERVICE_ID` with the ID from Step 1.2.
    - Replace `YOUR_TEMPLATE_ID` with the ID from Step 1.3.

### Deployment

This site is hosted on GitHub Pages. Any changes pushed to the `gh-pages` branch will automatically update the live site.
>>>>>>> origin/main
