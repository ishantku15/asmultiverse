$files = @("about.html", "contact.html", "privacy.html", "terms.html")

$oldBlock = '(?s)<div class="custom-sponsor-ad" style="position: relative; width: 100%; margin: 2rem auto; text-align: center;">\s*<div style="font-size:0\.7rem; color:rgba\(255,255,255,0\.3\); text-transform:uppercase; letter-spacing:1px; margin-bottom:0\.5rem;">Sponsored</div>\s*<button onclick="this\.parentElement\.style\.display=''none''" style="position: absolute; top: -10px; right: -10px; background: #ff5252; color: white; border: none; border-radius: 50%; width: 25px; height: 25px; cursor: pointer; font-weight: bold; z-index: 10; display: flex; align-items: center; justify-content: center;">X</button>\s*<a href="https://biwebloom\.in/" target="_blank">\s*<img src="https://i\.ibb\.co/7tCQN5Sj/Chat-GPT-Image-Jun-16-2026-04-13-40-AM\.png" alt="BiWebloom Sponsored Ad" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 8px rgba\(0,0,0,0\.2\);">\s*</a>\s*</div>'

$newBlock = @"
            <div class="premium-ad-container" style="max-width: 728px; margin: 2rem auto; text-align: center;">
                <span class="premium-ad-label">Sponsored</span>
                <div class="custom-sponsor-ad" style="position: relative; width: 100%; margin: 0 auto; text-align: center;">
                    <button onclick="this.parentElement.parentElement.style.display='none'" style="position: absolute; top: -10px; right: -10px; background: #ff5252; color: white; border: none; border-radius: 50%; width: 25px; height: 25px; cursor: pointer; font-weight: bold; z-index: 10; display: flex; align-items: center; justify-content: center;">X</button>
                    <a href="https://biwebloom.in/" target="_blank">
                        <img src="https://i.ibb.co/7tCQN5Sj/Chat-GPT-Image-Jun-16-2026-04-13-40-AM.png" alt="BiWebloom Sponsored Ad" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.2);">
                    </a>
                </div>
            </div>
"@

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $newContent = [regex]::Replace($content, $oldBlock, $newBlock)
        if ($content -ne $newContent) {
            Set-Content -Path $file -Value $newContent
            Write-Host "Updated $file"
        }
    }
}
