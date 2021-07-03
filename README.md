# Timelapse Screen Recorder

A basic nodejs and bash script to handle ffmpeg recording with timelapse

> Note: No audio is recorded, just screen, screen size is detected automatically

## Run

### With node:
```bash
node record.js video.mp4 --fps 25 --speed 2
```

### With bash script:

First, set file permissions to execute

```bash
chmod +x record.sh
```

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
