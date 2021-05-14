const textToSpeech = require('./rest-api').textToSpeech;

class GoogleSpeechSynthesis {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async speak(text, languageCode = 'en-US') {
    if (!this.audioContext) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContext();
      this.audioContext.resume(); // Safari needs this for some reason
    }

    const audioBuffer = await textToSpeech(text, languageCode, this.apiKey);

    this.audioContext.decodeAudioData(audioBuffer, buffer => {
      const source = this.audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(this.audioContext.destination);
      source.start();
    });
  }
}

module.exports = GoogleSpeechSynthesis;
