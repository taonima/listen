export function play(audio) {
  audio.play();
};

export function pause(audio) {
  audio.pause();
};

export function setAudioOption(audio, option = {}) {
  Object.entries(option).forEach(([k, v]) => {
    audio[k] = v;
  });
};
