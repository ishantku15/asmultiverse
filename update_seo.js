const fs = require('fs');

// Read data.js and evaluate it to get window.appsData
global.window = {};
const dataContent = fs.readFileSync('data.js', 'utf8');
eval(dataContent);

const apps = window.appsData;
const schemaItems = apps.map((app, index) => {
    return `            {"@type": "ListItem", "position": ${index + 1}, "name": "${app.name}", "url": "https://asmultiverse.in/details.html?id=${encodeURIComponent(app.id)}"}`;
}).join(',\n');

const newSchema = `    <!-- Schema for Individual Apps -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "As Multiverse — Educational Apps Collection",
        "description": "Free educational apps for JEE, NEET, SSC and competitive exam preparation at asmultiverse.in",
        "numberOfItems": ${apps.length},
        "itemListElement": [
${schemaItems}
        ]
    }
    </script>`;

let indexContent = fs.readFileSync('index.html', 'utf8');

// Replace the old schema with the new one
const regex = /<!-- Schema for Individual Apps -->[\s\S]*?<\/script>/;
indexContent = indexContent.replace(regex, newSchema);

fs.writeFileSync('index.html', indexContent);
console.log('Updated index.html SEO schema with ' + apps.length + ' apps.');
