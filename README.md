
# Requirements :

- ffmpeg
- mpv

```` bash

ffmpeg -loop 1 -i image.png -i audio.mp3 -c:v libx264 -c:a aac -b:a 192k -t 30 -pix_fmt yuv420p -vf scale=1920:1080 -shortest output.mp4

````