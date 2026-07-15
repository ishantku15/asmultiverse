const fs = require('fs');

// 1. Clean up CSS
if (fs.existsSync('style.css')) {
    let style = fs.readFileSync('style.css', 'utf8');
    style = style.replace('background: rgba(255, 255, 255, 0.02);', '');
    style = style.replace('border-radius: 8px;', '');
    style = style.replace('border: 1px solid rgba(255,255,255,0.05);', '');
    fs.writeFileSync('style.css', style);
    console.log('Removed box styling from style.css');
}

// 2. Remove Sponsored tags from sidebars
const htmlFiles = ['index.html', 'details.html'];
for (const file of htmlFiles) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        const spanRegex = /<span class="premium-ad-label"[^>]*>Sponsored<\/span>/g;
        content = content.replace(spanRegex, '');
        fs.writeFileSync(file, content);
        console.log('Removed Sponsored labels from ' + file);
    }
}
