var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var fs = require('fs');

var textToSpeech = new TextToSpeechV1({
  username: 'elemaryo@mcmaster.ca',
  password: 'Amora1998'
});

var synthesizeParams = {
  text: 'Hello world',
  accept: 'audio/wav',
  voice: 'en-US_AllisonVoice'
};

// Pipe the synthesized text to a file.
textToSpeech.synthesize(synthesizeParams).on('error', function(error) {
  console.log(error);
}).pipe(fs.createWriteStream('hello_world.wav'));

