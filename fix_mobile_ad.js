const fs = require('fs');

if (fs.existsSync('script.js')) {
    let content = fs.readFileSync('script.js', 'utf8');

    // Remove the broken innerHTML logic and replace it with a working one
    // Specifically looking for the block around line 90-99
    const regex = /if \(\(index \+ 1\) % 3 === 0 && index !== apps\.length - 1\) \{[\s\S]*?grid\.appendChild\(adCard\);\s*\}/g;
    
    const newAdLogic = `if ((index + 1) % 3 === 0 && index !== apps.length - 1) {
                const adCard = document.createElement('div');
                adCard.className = 'ad-card ad-mobile-only';
                adCard.style.animationDelay = \`\${(index + 1) * 0.1}s\`;
                adCard.innerHTML = \`
                    <span class="premium-ad-label">Sponsored</span>
                    <ins class="adsbygoogle"
                         style="display:block"
                         data-ad-format="fluid"
                         data-ad-layout-key="-6t+ed+2i-1n-4w"
                         data-ad-client="ca-pub-6608561504651468"
                         data-ad-slot="1884895487"></ins>
                \`;
                grid.appendChild(adCard);
                
                // Initialize AdSense unit safely after adding to DOM
                setTimeout(() => {
                    try {
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                    } catch (e) {
                        console.error('AdSense injection error:', e);
                    }
                }, 100);
            }`;

    content = content.replace(regex, newAdLogic);
    fs.writeFileSync('script.js', content);
    console.log('Fixed mobile ad injection in script.js');
}
