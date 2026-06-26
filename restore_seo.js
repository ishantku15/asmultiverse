const fs = require('fs');

const originalSchema = `    <!-- Schema for Individual Apps -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "As Multiverse — Educational Apps Collection",
        "description": "Free educational apps for JEE, NEET, SSC and competitive exam preparation at asmultiverse.in",
        "numberOfItems": 13,
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "AS Multiverse App", "url": "https://asmultiverse.in/details.html?id=as-multiverse"},
            {"@type": "ListItem", "position": 2, "name": "IshiTube — Video Downloader", "url": "https://asmultiverse.in/details.html?id=Ishitube"},
            {"@type": "ListItem", "position": 3, "name": "Apna College — Learn Coding", "url": "https://asmultiverse.in/details.html?id=apna-college-mod-apk"},
            {"@type": "ListItem", "position": 4, "name": "Career Will — Exam Preparation", "url": "https://asmultiverse.in/details.html?id=Career%20Will"},
            {"@type": "ListItem", "position": 5, "name": "Khan Global Studies — Khan Sir", "url": "https://asmultiverse.in/details.html?id=Khan%20Global%20Studies"},
            {"@type": "ListItem", "position": 6, "name": "VidyaKul — Board Exams", "url": "https://asmultiverse.in/details.html?id=vidyakul"},
            {"@type": "ListItem", "position": 7, "name": "KD Live — SSC & Banking", "url": "https://asmultiverse.in/details.html?id=kd-live"},
            {"@type": "ListItem", "position": 8, "name": "Education Baba — Bihar Board", "url": "https://asmultiverse.in/details.html?id=education-baba"},
            {"@type": "ListItem", "position": 9, "name": "Rojgar With Ankit — Competitive Exams", "url": "https://asmultiverse.in/details.html?id=rojgar-with-ankit"},
            {"@type": "ListItem", "position": 10, "name": "Selection Way — Online Learning", "url": "https://asmultiverse.in/details.html?id=selection-way"},
            {"@type": "ListItem", "position": 11, "name": "Study IQ — India's Learning Platform", "url": "https://asmultiverse.in/details.html?id=study-iq"},
            {"@type": "ListItem", "position": 12, "name": "Next Toppers — JEE & NEET", "url": "https://asmultiverse.in/details.html?id=next-toppers"},
            {"@type": "ListItem", "position": 13, "name": "TuteDude — Free Courses", "url": "https://asmultiverse.in/details.html?id=tutedude"}
        ]
    }
    </script>`;

let indexContent = fs.readFileSync('index.html', 'utf8');

// Replace the old schema with the original one + tutedude
const regex = /<!-- Schema for Individual Apps -->[\s\S]*?<\/script>/;
indexContent = indexContent.replace(regex, originalSchema);

fs.writeFileSync('index.html', indexContent);
console.log('Restored original SEO schema and added TuteDude.');
