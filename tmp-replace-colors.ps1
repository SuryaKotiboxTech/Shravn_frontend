$root = "c:\Users\hp\Desktop\Shrvn\Shravn_frontend"
$replace = @{
    '#C9A84C' = '#5B96D1'
    '#B08D40' = '#2660A2'
    '#A08040' = '#5B7FBB'
    '#A07828' = '#5A7BC1'
    '#7A6040' = '#4A6E9A'
    '#5C4A1E' = '#1F3E7D'
    '#2C1F0A' = '#1D325E'
    '#F5EDD8' = '#EFF5FF'
    '#FAF6EF' = '#F7FBFF'
    '#E8D5A8' = '#D4E0FF'
}
Get-ChildItem -Path $root -Recurse -Include *.tsx,*.ts | ForEach-Object {
    $text = Get-Content -Raw $_.FullName
    $new = $text
    foreach ($old in $replace.Keys) {
        $new = $new.Replace($old, $replace[$old])
    }
    if ($new -ne $text) {
        Set-Content -Path $_.FullName -Value $new
        Write-Host "updated $($_.FullName)"
    }
}
