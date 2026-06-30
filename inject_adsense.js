const fs = require('fs');

const displayAd = `
<!-- Google Display Ad -->
<div class="ad-block display-ad" style="margin: 1rem auto; max-width: 900px; text-align: center; overflow: hidden;">
    <div class="ad-label">Sponsored</div>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6608561504651468" crossorigin="anonymous"></script>
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-6608561504651468"
         data-ad-slot="8412177756"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
</div>
`;

const inFeedAd = `
<!-- Google In-Feed Ad -->
<div class="ad-label" style="text-align:center; font-size: 0.7rem; color: rgba(255, 255, 255, 0.3); margin-bottom: 5px;">Sponsored</div>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6608561504651468" crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-format="fluid"
     data-ad-layout-key="-6t+ed+2i-1n-4w"
     data-ad-client="ca-pub-6608561504651468"
     data-ad-slot="1884895487"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
`;

const inArticleAd = `
<!-- Google In-Article Ad -->
<div class="ad-label" style="font-size: 0.7rem; color: rgba(255, 255, 255, 0.3); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem;">Sponsored</div>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6608561504651468" crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-6608561504651468"
     data-ad-slot="8443967348"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
`;

// 1. Inject Display Ads under Navbar in HTML files
const htmlFiles = ['index.html', 'about.html', 'contact.html', 'privacy.html', 'terms.html'];
for (const file of htmlFiles) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        // Check if not already inserted
        if (!content.includes('8412177756')) {
            // Insert after </nav> or </header>
            content = content.replace(/(<\/nav>|<\/header>)\s*/, '$1\n' + displayAd);
            fs.writeFileSync(file, content);
            console.log('Injected Display Ad into ' + file);
        }
    }
}

// 2. Inject In-Article Ad into details.html
if (fs.existsSync('details.html')) {
    let content = fs.readFileSync('details.html', 'utf8');
    if (!content.includes('8443967348')) {
        content = content.replace(/<span class="premium-ad-label">Sponsored<\/span>\s*<\/div>/g, inArticleAd + '\n                            </div>');
        
        // Also inject display ad below navbar for details.html
        if (!content.includes('8412177756')) {
            content = content.replace(/(<\/nav>)\s*/, '$1\n' + displayAd);
        }
        
        fs.writeFileSync('details.html', content);
        console.log('Injected In-Article Ad into details.html');
    }
}

// 3. Inject In-Feed Ad into script.js
if (fs.existsSync('script.js')) {
    let content = fs.readFileSync('script.js', 'utf8');
    if (!content.includes('1884895487')) {
        const inFeedRegex = /<span class="premium-ad-label">Sponsored<\/span>/;
        content = content.replace(inFeedRegex, inFeedAd.replace(/\n/g, '\\n').replace(/"/g, '\\"'));
        fs.writeFileSync('script.js', content);
        console.log('Injected In-Feed Ad into script.js');
    }
}
