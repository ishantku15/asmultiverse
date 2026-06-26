const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') || f.endsWith('.js'));
for (const file of files) {
  if (file === 'remove_ads.js') continue;
  
  let content = fs.readFileSync(file, 'utf8');
  let originalLength = content.length;
  
  // Desktop side ads
  content = content.replace(/<!-- Desktop Side Ads -->[\s\S]*?class="desktop-side-ad desktop-side-ad-right"[\s\S]*?<\/a>\s*<\/div>\s*/g, '');
  
  // Premium footer ad
  content = content.replace(/<!-- Premium Footer Ad -->[\s\S]*?class="premium-ad-container"[\s\S]*?<\/a>\s*<\/div>\s*<\/div>\s*/g, '');

  // Custom sponsor ad injected dynamically or in other files
  content = content.replace(/<div class="custom-sponsor-ad"[\s\S]*?biwebloom\.in[\s\S]*?<\/a>\s*<\/div>\s*/g, '');
  
  // JS string variants
  content = content.replace(/<div class=\\"custom-sponsor-ad\\"[\s\S]*?biwebloom\.in[\s\S]*?<\\\/a>\\n\s*<\\\/div>/g, '');

  if (content.length !== originalLength) {
    fs.writeFileSync(file, content);
    console.log('Cleaned ' + file);
  }
}
