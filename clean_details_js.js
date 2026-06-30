const fs = require('fs');

if (fs.existsSync('details.html')) {
    let content = fs.readFileSync('details.html', 'utf8');
    let originalLength = content.length;
    
    // The leftover broken block in details.html is inside the innerHTML template string:
    /*
<span class="premium-ad-label">Sponsored</span>
                            <ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-6608561504651468"
     data-ad-slot="8443967348"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
    */
    const leftoverInArticleRegex = /<span class="premium-ad-label">Sponsored<\/span>\s*<ins class="adsbygoogle"\s*style="display:block;\s*text-align:center;"\s*data-ad-layout="in-article"\s*data-ad-format="fluid"\s*data-ad-client="ca-pub-6608561504651468"\s*data-ad-slot="8443967348"><\/ins>\s*<script>\s*\(adsbygoogle = window\.adsbygoogle \|\| \[\]\)\.push\(\{\}\);\s*<\/script>/g;

    content = content.replace(leftoverInArticleRegex, '<span class="premium-ad-label">Sponsored</span>');

    if (content.length !== originalLength) {
        fs.writeFileSync('details.html', content);
        console.log('Cleaned leftover In-Article ad from details.html');
    }
}
