audioRecorder = new WebAudioRecorder(sourceNode, {
    workerDir: "javascripts/"     // must end with slash
  });

recorder = new WebAudioRecorder(sourceNode, configs)
recorder.startRecording()

export {recorder}