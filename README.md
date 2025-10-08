```` bash 
npx tsx src/index.ts
````


# Requirements :

- ffmpeg
- mpv

```` bash

https://pixabay.com/music/search/432hz/


ffmpeg -ss 00 -i .\mocks\test_data\golden-waves-432hz-219189.mp3 -t 15 -c copy clip1.mp3

ffmpeg -loop 1 -i image.png -i audio.mp3 -c:v libx264 -c:a aac -b:a 192k -t 30 -pix_fmt yuv420p -vf scale=1920:1080 -shortest output.mp4


# import to use JPG
ffmpeg -loop 1 -i '.\ChatGPT Image Jul 23, 2025, 12_07_40 AM.jpg' -i audio_1.mp3 -c:v libx264 -t 30 -pix_fmt yuv420p -c:a aac -b:a 192k -vf "fade=t=in:st=0:d=3" -shortest output.mp4


ffmpeg -i "concat:clip1.mp3|clip2.mp3" -acodec copy merged.mp3

www.imagine.art

ffmpeg -i "Sylvain_Joly_A_photo-realistic,_high-quality_looping_video_of_a_golden_lucky_c_https___cdn.imagine.art_processed_70e9f08a-50f7-4763-b2f5-889bdd1.mp4" -filter_complex "[0:v]split[main][reverse]; [reverse]reverse[rev]; [main][rev]concat=n=2:v=1:a=0,format=yuv420p" output_looped.mp4

````