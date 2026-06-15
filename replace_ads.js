const fs = require('fs');
const files = ['about.html', 'contact.html', 'privacy.html', 'terms.html'];
const replacement = `            <div class="custom-sponsor-ad" style="position: relative; width: 100%; margin: 2rem auto; text-align: center;">
                <div style="font-size:0.7rem; color:rgba(255,255,255,0.3); text-transform:uppercase; letter-spacing:1px; margin-bottom:0.5rem;">Sponsored</div>
                <button onclick="this.parentElement.style.display='none'" style="position: absolute; top: -10px; right: -10px; background: #ff5252; color: white; border: none; border-radius: 50%; width: 25px; height: 25px; cursor: pointer; font-weight: bold; z-index: 10; display: flex; align-items: center; justify-content: center;">X</button>
                <a href="https://biwebloom.in/" target="_blank">
                    <img src="https://i.ibb.co/7tCQN5Sj/Chat-GPT-Image-Jun-16-2026-04-13-40-AM.png" alt="BiWebloom Sponsored Ad" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                </a>
            </div>`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let updated = content.replace(/<div style="max-width:728px; margin:2rem auto; padding:1rem; text-align:center; background:rgba\(18,18,45,0\.4\); border-radius:12px; border:1px solid rgba\(123,77,255,0\.1\);">[\s\S]*?<script>\(adsbygoogle = window\.adsbygoogle \|\| \[\]\)\.push\(\{\}\);<\/script>\s*<\/div>/g, replacement);
    fs.writeFileSync(file, updated);
    console.log(`Updated ${file}`);
});

