
# Requirements :

- ffmpeg
- mpv

```` bash

ffmpeg -loop 1 -i image.png -i audio.mp3 -c:v libx264 -c:a aac -b:a 192k -t 30 -pix_fmt yuv420p -vf scale=1920:1080 -shortest output.mp4


# import to use JPG
ffmpeg -loop 1 -i '.\ChatGPT Image Jul 23, 2025, 12_07_40 AM.jpg' -i audio_1.mp3 -c:v libx264 -t 30 -pix_fmt yuv420p -c:a aac -b:a 192k -vf "fade=t=in:st=0:d=3" -shortest output.mp4


````