


var selects = document.getElementsByTagName("select");
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

  output.sendSysex([], [0x00,0x00,0x0e,0x52,0x5e,0x02,0x00,0x00]);

  // Retrieve an input by name, id or index
  var input = WebMidi.getInputByName("nanoKEY2 KEYBOARD");
  input = WebMidi.getInputById("1809568182");
  input = WebMidi.inputs[0];

  input.addListener('sysex', "all",
    function (e) {

    var returnaDataArray = Array.from(e.data);   // Array
    var selects = document.getElementsByTagName("select");
    for (var i=26, j=0; i<returnaDataArray.length-1; i++) {
      selects[j].selectedIndex = returnaDataArray[i];
      j++;
    };
    alert("Query finished!")
  });
}


function Send(){

  var output = WebMidi.getOutputById("123456789");
  output = WebMidi.getOutputByName("Axiom Pro 25 Ext Out");
  output = WebMidi.outputs[0];

  var stableArr = [0x52,0x5E,0x01,0x01,0x06,0x00,0x50,0x72,0x65,0x73,0x65,0x74,0x30,0x32,0x4E,0x61,0x6D,0x65,0x20,0x20,0x20,0x20];

  for (var i=0; i<selects.length; i++) {

    var index = selects[i].selectedIndex;
  var value = selects[i].options[index].value;   // Dec
  var parameter = value.toString(16);     // Hex
  stableArr.push(parameter);
};

output.sendSysex([0x00,0x00,0x0E], [0x52,0x5E,0x00,0x00,0x04,0x00,0x01,0x02,0x03]);
output.sendSysex([0x00,0x00,0x0E], stableArr);

var input = WebMidi.getInputByName("nanoKEY2 KEYBOARD");
input = WebMidi.getInputById("1809568182");
input = WebMidi.inputs[0];

input.addListener('sysex', "all",
  function (e) {

      var returnaDataArray = Array.from(e.data);     // Array
      var selects = document.getElementsByTagName("select");

      for (var i=26, j=0; i<returnaDataArray.length-1; i++) {
        selects[j].selectedIndex = returnaDataArray[i];
        j++;
      };
      alert("Query finished!")
    });
}




function Serial(){

  var output = WebMidi.getOutputById("123456789");
  output = WebMidi.getOutputByName("Axiom Pro 25 Ext Out");
  output = WebMidi.outputs[0];

output.sendSysex([], [0x7E,0x7F,0x06,0x01]);


var input = WebMidi.getInputByName("nanoKEY2 KEYBOARD");
input = WebMidi.getInputById("1809568182");
input = WebMidi.inputs[0];


input.addListener('sysex', "all",
  function (e) {
      var returnaDataArray = Array.from(e.data);   // Array

      for (var i=0; i<returnaDataArray.length; i++) {
        returnaDataArray[i] = returnaDataArray[i].toString(16).toUpperCase();
      };
      alert(returnaDataArray);
    });

// },true);

}



function Refresh(){
  window.location.reload();
  alert("MIDI is already Closed!");
  
}



















