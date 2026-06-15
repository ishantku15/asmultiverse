$files = Get-ChildItem -Path . -Include *.html,*.js -Recurse -File
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    $updatedContent = $content -replace 'class="custom-sponsor-ad" style="position: relative; max-width: 50%;', 'class="custom-sponsor-ad" style="position: relative; width: 100%;'
    $updatedContent = $updatedContent -replace 'class="custom-sponsor-ad" style="position: relative; width: 50%;', 'class="custom-sponsor-ad" style="position: relative; width: 100%;'
    
    if ($content -ne $updatedContent) {
        Set-Content -Path $file.FullName -Value $updatedContent
        Write-Host "Updated $($file.Name)"
    }
}
