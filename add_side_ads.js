const fs = require('fs');

const leftAd = `
    <aside class="desktop-ad-left">
        <span class="premium-ad-label" style="display:block; text-align:center; font-size:10px; margin-bottom:5px; color: rgba(255, 255, 255, 0.4);">Sponsored</span>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6608561504651468" crossorigin="anonymous"></script>
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-6608561504651468"
             data-ad-slot="8412177756"
             data-ad-format="vertical"
             data-full-width-responsive="true"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
    </aside>
`;

const rightAd = `
    <aside class="desktop-ad-right">
        <span class="premium-ad-label" style="display:block; text-align:center; font-size:10px; margin-bottom:5px; color: rgba(255, 255, 255, 0.4);">Sponsored</span>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6608561504651468" crossorigin="anonymous"></script>
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="ca-pub-6608561504651468"
             data-ad-slot="8412177756"
             data-ad-format="vertical"
             data-full-width-responsive="true"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
    </aside>
`;

// Add CSS to style.css
const cssCode = `
/* Desktop Ad Layout */
.desktop-layout-wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    max-width: 1600px;
    margin: 0 auto;
    position: relative;
    width: 100%;
}

.desktop-layout-wrapper > main {
    flex: 1;
    width: 100%;
    min-width: 0;
}

.desktop-ad-left, .desktop-ad-right {
    display: none;
    width: 160px;
    position: sticky;
    top: 100px;
    margin: 20px 15px;
    min-height: 600px;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.05);
}

@media (min-width: 1350px) {
    .desktop-ad-left, .desktop-ad-right {
        display: block;
    }
}
`;

if (fs.existsSync('style.css')) {
    let style = fs.readFileSync('style.css', 'utf8');
    if (!style.includes('.desktop-layout-wrapper')) {
        fs.appendFileSync('style.css', '\n' + cssCode);
        console.log('Added CSS to style.css');
    }
}

// Modify HTML files
const htmlFiles = ['index.html', 'details.html'];
for (const file of htmlFiles) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Wrap <main ...> ... </main>
        // Use a generic regex to capture main
        if (!content.includes('<div class="desktop-layout-wrapper">')) {
            content = content.replace(/(<main[^>]*>[\s\S]*?<\/main>)/, `<div class="desktop-layout-wrapper">\n${leftAd}\n$1\n${rightAd}\n</div>`);
            fs.writeFileSync(file, content);
            console.log('Wrapped <main> in ' + file);
        }
    }
}
