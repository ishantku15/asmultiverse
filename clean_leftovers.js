const fs = require('fs');

const leftoverDisplayAdRegex = /<script async src="https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-6608561504651468" crossorigin="anonymous"><\/script>\s*<ins class="adsbygoogle"\s*style="display:block"\s*data-ad-client="ca-pub-6608561504651468"\s*data-ad-slot="8412177756"\s*data-ad-format="auto"\s*data-full-width-responsive="true"><\/ins>\s*<script>\s*\(adsbygoogle = window\.adsbygoogle \|\| \[\]\)\.push\(\{\}\);\s*<\/script>\s*<\/div>/g;

const htmlFiles = ['index.html', 'about.html', 'contact.html', 'privacy.html', 'terms.html', 'details.html'];
for (const file of htmlFiles) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        let originalLength = content.length;
        
        content = content.replace(leftoverDisplayAdRegex, '');
        
        if (content.length !== originalLength) {
            fs.writeFileSync(file, content);
            console.log('Cleaned leftover display ads in ' + file);
        }
    }
}
