


  var selects = document.getElementsByTagName("select");
  // var btn = document.getElementsByTagName("button");
  // var index = sel[0].selectedIndex;
  // var value = sel[0].options[index].value;

  var btns = document.getElementsByTagName("button");

  var connect = btns[0];
  var query = btns[1];
  var send = btns[2];
  var serial = btns[3];
  var close = btns[4];

  connect.addEventListener('click', Connect, false);

  function Connect(){

  	WebMidi.enable(function (err) {

  		if (err) {
  			console.log("WebMidi could not be enabled.", err);
  		}
  		console.log(WebMidi.sysexEnabled);

  		query.addEventListener('click', Query, false);

      send.addEventListener('click', Send, false);

  		serial.addEventListener('click', Serial, false);

      close.addEventListener('click', Refresh, false);


  	},true);

 }









function Query(){

  var output = WebMidi.getOutputById("123456789");
  output = WebMidi.getOutputByName("Axiom Pro 25 Ext Out");
  output = WebMidi.outputs[0];


console.log(JSON.stringify(output,null,4));
// output.sendSysex([0x00, 0x20, 0x2B], [0x69,0x01, 0x02]);


output.sendSysex([], [0x00,0x00,0x0e,0x52,0x5e,0x02,0x00,0x00]);

// output.sendSysex([0xF0,0x00,0x20,0x2B,0x69,0x01,0x02,0xF7]);


  // Play a note on all channels of the selected output
  // output.playNote("C3");

  // Play a note on channel 3
  // output.playNote("Gb4", 3);

  // Play a chord on all available channels
  // output.playNote(["C3", "D#3", "G3"]);

  // Play a chord on channel 7
  // output.playNote(["C3", "D#3", "G3"], 7);

  // Play a note at full velocity on all channels)
  // output.playNote("F#-1", "all", {velocity: 1});

  // Play a note on channel 16 in 2 seconds (relative time)
  // output.playNote("F5", 16, {time: "+2000"});

  // Play a note on channel 1 at an absolute time in the future
  // output.playNote("F5", 16, {time: WebMidi.time + 3000});

  // Play a note for a duration of 2 seconds (will send a note off message in 2 seconds). Also use
  // a low attack velocity
  // output.playNote("Gb2", 10, {duration: 2000, velocity: 0.25});

  // Stop a playing note on all channels
  // output.stopNote("C-1");

  // Stopping a playing note on channel 11
  // output.stopNote("F3", 11);

  // Stop a playing note on channel 11 and use a high release velocity
  // output.stopNote("G8", 11, {velocity: 0.9});

  // Stopping a playing note in 2.5 seconds
  // output.stopNote("Bb2", 11, {time: "+2500"});

  // Send polyphonic aftertouch message to channel 8
  // output.sendKeyAftertouch("C#3", 8, 0.25);

  // Send pitch bend (between -1 and 1) to channel 12
  // output.sendPitchBend(-1, 12);

  // You can chain most method calls
  // output.playNote("G5", 12)
  //   .sendPitchBend(-0.5, 12, {time: 400}) // After 400 ms.
  //   .sendPitchBend(0.5, 12, {time: 800})  // After 800 ms.
  //   .stopNote("G5", 12, {time: 1200});    // After 1.2 s.

  // Retrieve an input by name, id or index
  var input = WebMidi.getInputByName("nanoKEY2 KEYBOARD");
  input = WebMidi.getInputById("1809568182");
  input = WebMidi.inputs[0];

  // Listen for a 'note on' message on all channels
  input.addListener('noteon', "all",
    function (e) {
      console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
    }
  );

  // Listen to pitch bend message on channel 3
  input.addListener('pitchbend', 1,
    function (e) {
      console.log("Received 'pitchbend' message.", e);
    }
  );

  // Listen to control change message on all channels
  input.addListener('controlchange', "all",
    function (e) {
      console.log("Received 'controlchange' message.", e);
    }
  );

  // Check for the presence of an event listener (n such cases, you cannot use anonymous functions).
  function test(e) { console.log(e); }
  input.addListener('programchange', 12, test);
  // console.log("Has event listener: ", input.hasListener('programchange', 12, test));

  // Remove a specific listener
  // input.removeListener('programchange', 12, test);
  // console.log("Has event listener: ", input.hasListener('programchange', 12, test));

  // Remove all listeners of a specific type on a specific channel
  // input.removeListener('noteoff', 12);

  // Remove all listeners for 'noteoff' on all channels
  // input.removeListener('noteoff');

  // Remove all listeners on the input
  // input.removeListener();


    input.addListener('sysex', "all",
    function (e) {
      // console.log("Received 'sysex' message.", Array.from(e.data));
      // console.log(typeof(Array.from(e.data)));
      // console.log(Array.from(e.data) instanceof Array);
      var returnaDataArray = Array.from(e.data);   // Array
      var selects = document.getElementsByTagName("select");


      for (var i=26, j=0; i<returnaDataArray.length-1; i++) {
        selects[j].selectedIndex = returnaDataArray[i];
        // console.log(i, returnaDataArray[i]);
        j++;
        // if (i=57) {
        //   console.log(returnaDataArray[i]);
        // };
      };

      alert("Query finished!")
    });

// },true);

}
// -------------------------------------------------------------------------






function Send(){

 
// query.removeEventListener('click', Query, false);

console.log("working?");

// Enable WebMidi.js
// WebMidi.enable(function (err) {

  // if (err) {
  //   console.log("WebMidi could not be enabled.", err);
  // }

  // Viewing available inputs and outputs
  // console.log(WebMidi.inputs);
  // console.log(WebMidi.outputs);

  // Display the current time
  // console.log(WebMidi.time);
  console.log(WebMidi.sysexEnabled );

  // Retrieving an output port/device using its id, name or index
  var output = WebMidi.getOutputById("123456789");
  output = WebMidi.getOutputByName("Axiom Pro 25 Ext Out");
  output = WebMidi.outputs[0];


console.log(JSON.stringify(output,null,4));
// output.sendSysex([0x00, 0x20, 0x2B], [0x69,0x01, 0x02]);


var stableArr = [0x52,0x5E,0x01,0x01,0x06,0x00,0x50,0x72,0x65,0x73,0x65,0x74,0x30,0x32,0x4E,0x61,0x6D,0x65,0x20,0x20,0x20,0x20];

for (var i=0; i<selects.length; i++) {

  var index = selects[i].selectedIndex;
  var value = selects[i].options[index].value;   // Dec
  var parameter = value.toString(16);     // Hex
  stableArr.push(parameter);
};

console.log(stableArr);

output.sendSysex([0x00,0x00,0x0E], [0x52,0x5E,0x00,0x00,0x04,0x00,0x01,0x02,0x03]);
output.sendSysex([0x00,0x00,0x0E], stableArr);

// output.sendSysex([0xF0,0x00,0x20,0x2B,0x69,0x01,0x02,0xF7]);


  // Play a note on all channels of the selected output
  // output.playNote("C3");

  // Play a note on channel 3
  // output.playNote("Gb4", 3);

  // Play a chord on all available channels
  // output.playNote(["C3", "D#3", "G3"]);

  // Play a chord on channel 7
  // output.playNote(["C3", "D#3", "G3"], 7);

  // Play a note at full velocity on all channels)
  // output.playNote("F#-1", "all", {velocity: 1});

  // Play a note on channel 16 in 2 seconds (relative time)
  // output.playNote("F5", 16, {time: "+2000"});

  // Play a note on channel 1 at an absolute time in the future
  // output.playNote("F5", 16, {time: WebMidi.time + 3000});

  // Play a note for a duration of 2 seconds (will send a note off message in 2 seconds). Also use
  // a low attack velocity
  // output.playNote("Gb2", 10, {duration: 2000, velocity: 0.25});

  // Stop a playing note on all channels
  // output.stopNote("C-1");

  // Stopping a playing note on channel 11
  // output.stopNote("F3", 11);

  // Stop a playing note on channel 11 and use a high release velocity
  // output.stopNote("G8", 11, {velocity: 0.9});

  // Stopping a playing note in 2.5 seconds
  // output.stopNote("Bb2", 11, {time: "+2500"});

  // Send polyphonic aftertouch message to channel 8
  // output.sendKeyAftertouch("C#3", 8, 0.25);

  // Send pitch bend (between -1 and 1) to channel 12
  // output.sendPitchBend(-1, 12);

  // You can chain most method calls
  // output.playNote("G5", 12)
  //   .sendPitchBend(-0.5, 12, {time: 400}) // After 400 ms.
  //   .sendPitchBend(0.5, 12, {time: 800})  // After 800 ms.
  //   .stopNote("G5", 12, {time: 1200});    // After 1.2 s.

  // Retrieve an input by name, id or index
  var input = WebMidi.getInputByName("nanoKEY2 KEYBOARD");
  input = WebMidi.getInputById("1809568182");
  input = WebMidi.inputs[0];

  // Listen for a 'note on' message on all channels
  input.addListener('noteon', "all",
    function (e) {
      console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
    }
  );

  // Listen to pitch bend message on channel 3
  input.addListener('pitchbend', 1,
    function (e) {
      console.log("Received 'pitchbend' message.", e);
    }
  );

  // Listen to control change message on all channels
  input.addListener('controlchange', "all",
    function (e) {
      console.log("Received 'controlchange' message.", e);
    }
  );

  // Check for the presence of an event listener (n such cases, you cannot use anonymous functions).
  function test(e) { console.log(e); }
  input.addListener('programchange', 12, test);
  console.log("Has event listener: ", input.hasListener('programchange', 12, test));

  // Remove a specific listener
  // input.removeListener('programchange', 12, test);
  // console.log("Has event listener: ", input.hasListener('programchange', 12, test));

  // Remove all listeners of a specific type on a specific channel
  // input.removeListener('noteoff', 12);

  // Remove all listeners for 'noteoff' on all channels
  // input.removeListener('noteoff');

  // Remove all listeners on the input
  // input.removeListener();


    input.addListener('sysex', "all",
    function (e) {
      // console.log("Received 'sysex' message.", Array.from(e.data));
      // console.log(typeof(Array.from(e.data)));
      // console.log(Array.from(e.data) instanceof Array);
      var returnaDataArray = Array.from(e.data);   // Array
      var selects = document.getElementsByTagName("select");


      for (var i=26, j=0; i<returnaDataArray.length-1; i++) {
        selects[j].selectedIndex = returnaDataArray[i];
        // console.log(i, returnaDataArray[i]);
        j++;
        // if (i=57) {
        //   console.log(returnaDataArray[i]);
        // };
      };

      alert("Query finished!")
    });


}




function Serial(){


  var output = WebMidi.getOutputById("123456789");
  output = WebMidi.getOutputByName("Axiom Pro 25 Ext Out");
  output = WebMidi.outputs[0];


console.log(JSON.stringify(output,null,4));
// output.sendSysex([0x00, 0x20, 0x2B], [0x69,0x01, 0x02]);


output.sendSysex([], [0x7E,0x7F,0x06,0x01]);


  var input = WebMidi.getInputByName("nanoKEY2 KEYBOARD");
  input = WebMidi.getInputById("1809568182");
  input = WebMidi.inputs[0];

  
    input.addListener('sysex', "all",
    function (e) {

      var returnaDataArray = Array.from(e.data);   // Array
      // var selects = document.getElementsByTagName("select");


      for (var i=0; i<returnaDataArray.length; i++) {
        // selects[j].selectedIndex = returnaDataArray[i];
        // console.log(i, returnaDataArray[i]);
        // if (i=57) {
        //   console.log(returnaDataArray[i]);
        returnaDataArray[i] = returnaDataArray[i].toString(16).toUpperCase();
        // };
      };

      alert(returnaDataArray);
    });

// },true);

}



















function Refresh(){
  console.log("Inning...");
  window.location.reload();
  alert("MIDI is already Closed!");
  
}



















