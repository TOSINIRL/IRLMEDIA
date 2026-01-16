import os
import re

root_dir = '/Users/kidtoasty/.gemini/antigravity/scratch/pure_hearted_studioz'
public_dir = os.path.join(root_dir, 'public')

# Read root files
with open(os.path.join(root_dir, 'index.html'), 'r') as f:
    root_html = f.read()

with open(os.path.join(root_dir, 'style.css'), 'r') as f:
    root_css = f.read()

with open(os.path.join(root_dir, 'script.js'), 'r') as f:
    root_js = f.read()

# 1. Update public/index.html
# Adjust CSS path
public_html = root_html.replace('href="style.css"', 'href="css/style.css"')
# Adjust JS path
public_html = public_html.replace('src="script.js"', 'src="js/main.js"')

# Adjust Image paths: src="filename.jpg" -> src="assets/images/filename.jpg"
# Also handle png
image_extensions = ['jpg', 'png', 'jpeg', 'gif', 'webp']
for ext in image_extensions:
    # Match patterns like src="image.ext" or src='image.ext'
    pattern = rf'(src=["\'])([^"\']+\.{ext})(["\'])'
    # Check if the path already starts with assets/ or http
    def replace_img_path(match):
        prefix = match.group(1)
        path = match.group(2)
        suffix = match.group(3)
        if path.startswith('assets/') or path.startswith('http') or '/' in path:
            return f'{prefix}{path}{suffix}'
        return f'{prefix}assets/images/{path}{suffix}'
    
    public_html = re.sub(pattern, replace_img_path, public_html)

# Specifically fix the stylist photo if it's different in the root index.html
# root uses stylist_photo.jpg, public folder has stylist_photo.jpg and meet_stylist.png
# The user wants "pics to there right spots".
# Root index.html uses:
# Line 184: <img src="stylist_photo.jpg" alt="Meet Your Hairstylist" class="stylist-main-image">
# This should become assets/images/stylist_photo.jpg

# 2. Update public/css/style.css
# Adjust background-image paths: url('filename.jpg') -> url('../assets/images/filename.jpg')
public_css = root_css
for ext in image_extensions:
    pattern = rf'(url\([ \t]*["\']?)([^"\'\)]+\.{ext})(["\']?[ \t]*\))'
    def replace_css_bg(match):
        prefix = match.group(1)
        path = match.group(2)
        suffix = match.group(3)
        if path.startswith('../') or path.startswith('http') or 'assets/' in path:
            return f'{prefix}{path}{suffix}'
        return f'{prefix}../assets/images/{path}{suffix}'
    public_css = re.sub(pattern, replace_css_bg, public_css)

# Update public files
with open(os.path.join(public_dir, 'index.html'), 'w') as f:
    f.write(public_html)

with open(os.path.join(public_dir, 'css', 'style.css'), 'w') as f:
    f.write(public_css)

with open(os.path.join(public_dir, 'js', 'main.js'), 'w') as f:
    f.write(root_js)

print("Synchronization complete.")
