const { spawn, execSync } = require("child_process");
const { existsSync, mkdirSync } = require("fs");
const { join, resolve } = require("path");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const defaults = {
    fps: 30,
    speed: 1
}

const getDimensionsCmd = `xrandr | grep ' connected' | head -n 1 | cut -d " " -f 4 | cut -d "+" -f 1`;
const round = (x, p) => Math.round(x * 10 ** p) / 10 ** p;
const getFfmpegData = (str) => {
  propsArray = str
    .split(/(?<=\S)(?<!\=)\s(?=\S)/gm)
    .map((x) => x.split("=").map((y) => y.trim()));
  return Object.fromEntries(propsArray);
};

const argv = yargs(hideBin(process.argv)).argv;

const output = argv["_"][0];
if(!output){
    console.log("No output especified. Exiting")
    process.exit()
}

if(existsSync(output)){
    console.log("Output already exists. Exiting");
    process.exit()
}

let { fps,  speed } = argv;
if(!fps){
    console.log("No fps found, using default: " + defaults.fps)
    fps = defaults.fps
}
if(!speed){
    console.log("No speed specified, using default: " + defaults.speed)
    speed = defaults.speed
}

const framerate = round(fps/speed, 5);
const dimensions = execSync(getDimensionsCmd).toString().replace("\n", "");
console.log(`Detected dimensions: ${dimensions}`)
console.log(`Framerate: ${framerate}`)
console.log("Start recording");
let ffmpeg = spawn(
  "ffmpeg",
  [
    "-framerate",
    framerate,
    "-f",
    "x11grab",
    "-s",
    dimensions,
    "-i",
    ":0.0+0,0",
    "-vf",
    `settb=1/${fps},setpts=N/TB/${fps}`,
    "-r",
    fps,
    "-vcodec",
    "libx264",
    "-crf",
    "0",
    "-preset",
    "ultrafast",
    "-threads",
    "0",
    "-y",
    output,
  ],
  {
    killSignal: "SIGINT",
  }
);

const log = (buffer, code) => {
  const msg = buffer.toString();

  if (!msg) return;
  if (msg.includes("frame=")) {
    const { time, fps } = getFfmpegData(msg);
    process.stdout.write(`Current time: ${time} (${fps} fps) \r`);
  }
};

ffmpeg.stdout.on("data", (data) => log(data, "out"));
ffmpeg.stderr.on("data", (data) => log(data, "err"));

ffmpeg.on("close", (code) => {
  console.log(`\nChild process exited with code ${code}`);
});

const onExit = () => {
  ffmpeg.stdin.write("q");
  console.log("Exiting ");
};

// On exit handler
// ~ https://stackoverflow.com/a/49392671
const exitEvents = [
  `SIGINT`,
  `SIGUSR1`,
  `SIGUSR2`,
  `uncaughtException`,
  `SIGTERM`,
];
exitEvents.forEach((eventType) => process.on(eventType, onExit));
