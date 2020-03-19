const recordBtn = document.getElementById("recordBtn");
const textCount = document.getElementById("playCount");

const constraints = { audio: true };
const options = { mimeType: "audio/webm;codecs=opus" };

let streamObj;
let mediaRecorder;
const secondsInit = 0;
let seconds = 0;
let real;

const handleVoiceData = e => {
  const { data } = event;
  console.log(data);
  const link = document.createElement("a");
  link.href = URL.createObjectURL(data);
  link.download = "voice.webm";
  document.body.appendChild(link);
  link.click();
};

const stopRecording = () => {
  seconds = 0;
  clearInterval(real);
  textCount.innerHTML = "";
  mediaRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", allowAuth);
  recordBtn.addEventListener("click", handleCount);
  recordBtn.innerHTML = "start recording";
};

const startRecording = () => {
  mediaRecorder = new MediaRecorder(streamObj, options);
  mediaRecorder.start();
  mediaRecorder.addEventListener("dataavailable", handleVoiceData);
  recordBtn.addEventListener("click", stopRecording);
};

const getVoice = () => {
  try {
    recordBtn.innerHTML = "stop recording";
    startRecording();
  } catch (error) {
    recordBtn.innerHTML = "cant record";
  } finally {
    recordBtn.removeEventListener("click", allowAuth);
    recordBtn.removeEventListener("click", handleCount);
  }
};

const getStream = stream => {
  streamObj = stream;
};

const allowAuth = () => {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(getStream)
    .then(getVoice);
};

const plusNum = () => {
  seconds += 1;
  textCount.innerHTML = `recording for : ${seconds}s`;
};

const handleCount = () => {
  real = setInterval(plusNum, 1000);
};

function init() {
  recordBtn.addEventListener("click", allowAuth);
  recordBtn.addEventListener("click", handleCount);
}

if (recordBtn) {
  init();
}
