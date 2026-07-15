const fs = require('fs');

const htmlFiles = ['index.html', 'details.html'];
for (const file of htmlFiles) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Change data-ad-format="vertical" to data-ad-format="auto" in sidebars
        content = content.replace(/data-ad-format="vertical"/g, 'data-ad-format="auto"');
        
        fs.writeFileSync(file, content);
        console.log('Fixed ad format in ' + file);
    }
}
