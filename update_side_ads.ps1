$files = @("about.html", "contact.html", "details.html", "index.html", "privacy.html", "terms.html")
$oldUrl = "https://i.ibb.co/7tCQN5Sj/Chat-GPT-Image-Jun-16-2026-04-13-40-AM.png"
$newUrl = "https://i.ibb.co/dsw1JY2f/Chat-GPT-Image-Jun-16-2026-04-34-32-AM.png"

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        # Regex to match the img src inside a desktop-side-ad div
        $pattern = '(?s)(<div class="desktop-side-ad[^>]*>.*?<img src=")' + [regex]::Escape($oldUrl) + '(".*?>\s*</a>\s*</div>)'
        
        $newContent = [regex]::Replace($content, $pattern, "`${1}$newUrl`$2")
        
        if ($content -ne $newContent) {
            Set-Content -Path $file -Value $newContent
            Write-Host "Updated $file"
        }
    }
}
