# PureHearted Studioz - Deployment Guide

Your website is ready to go! Follow these steps to make the email form work and publish your site to the web.

## Step 1: Set up EmailJS (For Booking Emails)

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

## Step 2: Update Your Code

You need to paste your keys into the code I wrote.

1.  Open `index.html`.
    - Find `emailjs.init("YOUR_PUBLIC_KEY");`.
    - Replace `YOUR_PUBLIC_KEY` with the key you copied in Step 1.4.
2.  Open `script.js`.
    - Find `emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)`.
    - Replace `YOUR_SERVICE_ID` with the ID from Step 1.2.
    - Replace `YOUR_TEMPLATE_ID` with the ID from Step 1.3.

## Step 3: Deploy to Netlify (Free Hosting)

1.  Go to [Netlify.com](https://www.netlify.com/) and sign up.
2.  Log in to your dashboard.
3.  You will see a box that says "Drag and drop your site output folder here".
4.  Drag the **entire `pure_hearted_studioz` folder** from your computer into that box.
5.  Netlify will upload it and give you a live URL (e.g., `https://random-name-12345.netlify.app`) instantly!
6.  You can change the site name in "Site Settings" -> "Change site name".

**That's it! Your site is live and bookings will be sent to your email.**
