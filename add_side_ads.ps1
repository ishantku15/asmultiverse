$css = @"

/* Desktop Side Ads */
.desktop-side-ad {
    display: none;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    width: 160px;
    z-index: 1000;
}
.desktop-side-ad-left {
    left: 20px;
}
.desktop-side-ad-right {
    right: 20px;
}
.desktop-side-ad img {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}
.desktop-side-ad-close {
    position: absolute;
    top: -10px;
    right: -10px;
    background: #ff5252;
    color: white;
    border: none;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    cursor: pointer;
    font-weight: bold;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}
@media (min-width: 1540px) {
    .desktop-side-ad {
        display: block;
    }
}
"@

Add-Content -Path "style.css" -Value $css
Write-Host "Appended CSS to style.css"

$htmlSnippet = @"
    <!-- Desktop Side Ads -->
    <div class="desktop-side-ad desktop-side-ad-left">
        <button onclick="this.parentElement.style.display='none'" class="desktop-side-ad-close">X</button>
        <div style="font-size:0.7rem; color:rgba(255,255,255,0.3); text-transform:uppercase; letter-spacing:1px; margin-bottom:0.5rem; text-align:center;">Sponsored</div>
        <a href="https://biwebloom.in/" target="_blank">
            <img src="https://i.ibb.co/7tCQN5Sj/Chat-GPT-Image-Jun-16-2026-04-13-40-AM.png" alt="BiWebloom Sponsored Ad">
        </a>
    </div>
    <div class="desktop-side-ad desktop-side-ad-right">
        <button onclick="this.parentElement.style.display='none'" class="desktop-side-ad-close">X</button>
        <div style="font-size:0.7rem; color:rgba(255,255,255,0.3); text-transform:uppercase; letter-spacing:1px; margin-bottom:0.5rem; text-align:center;">Sponsored</div>
        <a href="https://biwebloom.in/" target="_blank">
            <img src="https://i.ibb.co/7tCQN5Sj/Chat-GPT-Image-Jun-16-2026-04-13-40-AM.png" alt="BiWebloom Sponsored Ad">
        </a>
    </div>
"@

$files = @("about.html", "contact.html", "details.html", "index.html", "privacy.html", "terms.html")

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        if ($content -notmatch 'class="desktop-side-ad') {
            $newContent = $content -replace '<body[^>]*>', "`$&`n$htmlSnippet"
            Set-Content -Path $file -Value $newContent
            Write-Host "Updated $file"
        }
    }
}
