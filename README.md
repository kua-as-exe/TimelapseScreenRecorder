# Timelapse Screen Recorder

> Created to create beautiful coding or design timelapses

A basic nodejs and bash script to handle ffmpeg recording with timelapse

Record timelapse with less cpu and gpu usage.

Instead of record your entire screen at normal speed and then speed it up the video in a editor, this scripts will capture frame by frame every x seconds corresponding to the desire speed. This will generate the video already accelerated, reducing file size and post-editing work.

> Note: No audio is recorded, just screen. Screen size is detected automatically. Not tested in windows yet

Example image (node script):

<img src="https://i.imgur.com/7AQWi3u.png" width="500" alt="Timelapse Screen Recorder in action"/>

## Requirements

- ffmpeg in path
- nodejs & npm for node script

## Use

### With node: (node version is better)

Clone and install dependencies

```
git clone https://github.com/JorgeArreolaS/TimelapseScreenRecorder
npm install
```

Run

```bash
node record.js video.mp4 --fps 25 --speed 2
```

### With bash script:

Clone and set file permissions to execute

```bash
git clone https://github.com/JorgeArreolaS/TimelapseScreenRecorder
chmod +x record.sh
```
Run

Then record with the following structure:

```bash
./record.sh $fps $speed $output
```

Example:

```bash
./record.sh 25 2 video.mp4
```

## Exit

Exit by pressing `Ctr + C`

## Tips

Use speed option to handle your time

Speed | Result
--- | ---
`2` | will speedup your video by 2
`60` | one second per minute
`600` | one second per 10 minutes *`(60*10)`*
`1800` | one second per half hour (30 minutes) *`(60*10*3)`* 
`3600` | one second per hour *`(60*60)`* 

# Roadmap

- Babel or Typescript support
- Pause option
- Graphic interface

Feel free to PR any upgrade c:
