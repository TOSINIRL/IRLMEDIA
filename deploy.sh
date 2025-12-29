#!/bin/bash

# Deployment script for PureHearted Studio website
# This script automates the process of deploying to GitHub Pages

echo "🚀 Starting deployment process..."

# Make sure we're on the development branch
git checkout development

# Add all changes
git add -A

# Commit changes
echo "📝 Enter commit message:"
read commit_message
git commit -m "$commit_message"

# Push to development branch
echo "📤 Pushing to development branch..."
git push origin development

# Switch to gh-pages branch
echo "🔄 Switching to gh-pages branch..."
git checkout gh-pages

# Merge changes from development
echo "🔀 Merging development into gh-pages..."
git merge development -m "Deploy: $commit_message"

# Remove unnecessary files/folders from gh-pages
echo "🧹 Cleaning up gh-pages branch..."
git rm -rf public deploy_to_godaddy.zip deploy_to_godaddy_updated.zip refactor_paths.py payless 2>/dev/null || true

# Commit the cleanup
git commit -m "Clean up gh-pages" || echo "Nothing to clean up"

# Push to gh-pages
echo "🌐 Deploying to GitHub Pages..."
git push origin gh-pages

# Switch back to development
git checkout development

echo "✅ Deployment complete! Your site will be live at https://tosinirl.github.io/IRLMEDIA/ in a few minutes."
