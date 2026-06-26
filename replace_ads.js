const fs = require('fs');
const files = ['about.html', 'contact.html', 'privacy.html', 'terms.html'];
const replacement = `            `;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let updated = content.replace(/<div style="max-width:728px; margin:2rem auto; padding:1rem; text-align:center; background:rgba\(18,18,45,0\.4\); border-radius:12px; border:1px solid rgba\(123,77,255,0\.1\);">[\s\S]*?<script>\(adsbygoogle = window\.adsbygoogle \|\| \[\]\)\.push\(\{\}\);<\/script>\s*<\/div>/g, replacement);
    fs.writeFileSync(file, updated);
    console.log(`Updated ${file}`);
});

