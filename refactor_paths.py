
import re

def refactor_html():
    with open('index.html', 'r') as f:
        content = f.read()

    # 1. Update CSS link
    content = content.replace('href="style.css"', 'href="css/style.css"')

    # 2. Update JS Path
    content = content.replace('src="script.js"', 'src="js/main.js"')

    # 3. Update Image Paths
    # Finds src="filename.jpg" and replaces with src="assets/images/filename.jpg"
    # Ignores http/https/data links
    def image_replacer(match):
        quote = match.group(1)
        filename = match.group(2)
        if filename.startswith('http') or filename.startswith('data:'):
            return match.group(0)
        return f'src={quote}assets/images/{filename}{quote}'

    content = re.sub(r'src=(["\'])(.*?)\1', image_replacer, content)

    with open('public/index.html', 'w') as f:
        f.write(content)

if __name__ == "__main__":
    refactor_html()
