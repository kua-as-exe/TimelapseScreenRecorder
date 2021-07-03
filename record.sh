#!/bin/bash

# args
fps=$1
mul=$2
video=$3

echo $fps $mul $video

dimensions=$(xrandr | grep ' connected' | head -n 1 | cut -d " " -f 4 | cut -d "+" -f 1)
echo "Recording dimensions: $dimensions"
# ffmpeg -framerate 30 -f x11grab -s $dimensions -i :0.0+0,0 -vf settb=1/30,setpts=N/TB/30 -r 30 -vcodec libx264 -crf 0 -preset ultrafast -threads 0 out.mp4

# r=$(($fps/$mul))
r=$( bc <<< "scale=5; $fps/$mul" )

ffmpeg -framerate $r -f x11grab -s $dimensions -i :0.0+0,0 -vf settb=1/$fps,setpts=N/TB/$fps -r $fps -vcodec libx264 -crf 0 -preset ultrafast -threads 0 -t 10 $video



