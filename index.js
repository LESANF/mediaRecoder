const recordBtn = document.getElementById("recordBtn");

const constraints = { audio: true };

let streamObj;
let mediaRecorder;

const handleVoiceData = e => {
  const { data } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(data);
  link.download = "voice.webm";
  document.body.appendChild(link);
  link.click();
};

const stopRecording = () => {
  mediaRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVoice);
  recordBtn.innerHTML = "start recording";
};

const startRecording = () => {
  mediaRecorder = new MediaRecorder(streamObj);
  mediaRecorder.start();
  mediaRecorder.addEventListener("dataavailable", handleVoiceData);
  recordBtn.addEventListener("click", stopRecording);
};

const getVoice = () => {
  try {
    recordBtn.innerHTML = "stop recording";
    streamObj = stream;
    startRecording();
  } catch (error) {
    recordBtn.innerHTML = "cant record";
  } finally {
    recordBtn.removeEventListener("click", getVoice);
  }
};

function init() {
  recordBtn.addEventListener("click", getVoice);
}

if (recordBtn) {
  const stream = navigator.mediaDevices
    .getUserMedia(constraints)
    .then(getVoice);
  init();
}
