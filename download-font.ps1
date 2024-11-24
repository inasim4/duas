$url = "https://github.com/SIL-Roms/Font-Scheherazade/raw/master/ScheherazadeNew-Regular.ttf"
$output = "public/fonts/ScheherazadeNew-Regular.ttf"

Invoke-WebRequest -Uri $url -OutFile $output
