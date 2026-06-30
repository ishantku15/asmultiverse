const fs = require('fs');

const displayAdRegex = /<!-- Google Display Ad -->[\s\S]*?<\/div>\s*/g;
const inArticleAdRegex = /<!-- Google In-Article Ad -->[\s\S]*?<\/script>\s*/g;

// 1. Remove Display Ads from all HTML files
const htmlFiles = ['index.html', 'about.html', 'contact.html', 'privacy.html', 'terms.html', 'details.html'];
for (const file of htmlFiles) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        let originalLength = content.length;
        
        content = content.replace(displayAdRegex, '');
        
        if (file === 'details.html') {
            // Remove the In-Article Ad from the innerHTML template literal
            content = content.replace(inArticleAdRegex, '<span class="premium-ad-label">Sponsored</span>\n                            ');
            // Clean up double sponsored tags if any
            content = content.replace(/<span class="premium-ad-label">Sponsored<\/span>\s*<span class="premium-ad-label">Sponsored<\/span>/g, '<span class="premium-ad-label">Sponsored</span>');
        }

        if (content.length !== originalLength) {
            fs.writeFileSync(file, content);
            console.log('Fixed ads in ' + file);
        }
    }
}

// 2. Fix script.js
if (fs.existsSync('script.js')) {
    let content = fs.readFileSync('script.js', 'utf8');
    // Revert the injected In-Feed ad
    content = content.replace(/<!-- Google In-Feed Ad -->[\s\S]*?<\/script>\\n/g, '<span class="premium-ad-label">Sponsored</span>');
    fs.writeFileSync('script.js', content);
    console.log('Fixed script.js');
}
