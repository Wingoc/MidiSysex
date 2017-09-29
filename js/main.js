


var selects = document.getElementsByTagName("select");
var btns = document.getElementsByTagName("button");
var preNumber = document.getElementById("preNumber");
var currentPreset = document.getElementById("currentPreset");

var connect = btns[0];
var query = btns[1];
var send = btns[2];
var serial = btns[3];
var close = btns[4];
var preset = btns[5];

connect.addEventListener('click', Connect, false);

function Connect(){

  WebMidi.enable(function (err) {

    if (err) {
     console.log("WebMidi could not be enabled.", err);
   }
   console.log(WebMidi.sysexEnabled);
   alert("Midi Device is Connected！");

   connect.style.backgroundColor = "green";
   connect.innerText = "Connected";

   var output = WebMidi.outputs[0];
   var input = WebMidi.inputs[0];

   query.addEventListener('click', Query, false);
   send.addEventListener('click', Send, false);
   serial.addEventListener('click', Serial, false);
   close.addEventListener('click', Refresh, false);
   preset.addEventListener('click', Change, false);


   input.addListener('sysex', "all", function (e) {
    var returnaDataArray = Array.from(e.data);   // Array
    if (returnaDataArray.length == 21){
      for (var k=0; k<returnaDataArray.length; k++) {
        returnaDataArray[k] = returnaDataArray[k].toString(16).toUpperCase();
      };
      alert(returnaDataArray);
    }else {
      var selects = document.getElementsByTagName("select");
      for (var i=26, j=0; i<returnaDataArray.length-1; i++) {
        selects[j].selectedIndex = returnaDataArray[i];
        j++;
      };
      alert("Query finished!");
    }
  });

 },true);
}





function Query(){

  var output = WebMidi.outputs[0];
  output.sendSysex([], [0x00,0x00,0x0e,0x52,0x5e,0x02,0x00,0x00]);
}



function Send(){

  output = WebMidi.outputs[0];

  // stableArr为第6个值为预设值序号，“00”为第1组预设参数，“24”为第25组参数
  // var stableArr = [0x52,0x5E,0x01,0x01,0x06,0x00,0x50,0x72,0x65,0x73,0x65,0x74,0x30,0x32,0x4E,0x61,0x6D,0x65,0x20,0x20,0x20,0x20];
  var stableArr = [0x52,0x5E,0x01,0x01,0x2C,0x00,0x50,0x72,0x65,0x73,0x65,0x74,0x30,0x32,0x4E,0x61,0x6D,0x65,0x20,0x20,0x20,0x20];

  for (var i=0; i<selects.length; i++) {

    var index = selects[i].selectedIndex;
    var value = selects[i].options[index].value;   // Dec
    var parameter = value.toString(16);     // Hex
    stableArr.push(parameter);
  };

  var value = Number(currentPreset.value);
  if (value>0 && value<26){
    var number = "0x" + (value - 1).toString(16);
    stableArr[5] = number;
  } else {
    alert("Error! Effective value must between 1-25! \nCurrent parameter will set the Preset 01!");
  }
  console.log(stableArr[5]);

  output.sendSysex([0x00,0x00,0x0E], [0x52,0x5E,0x00,0x00,0x04,0x00,0x01,0x02,0x03]);
  output.sendSysex([0x00,0x00,0x0E], stableArr);

  // alert("Your message is sent！");
}




function Serial(){

  var output = WebMidi.outputs[0];
  output.sendSysex([], [0x7E,0x00,0x06,0x01]);
}



function Refresh(){
  window.location.reload();
  alert("MIDI is already Closed!");
  
}


function Change() {

  output = WebMidi.outputs[0];
  var value = Number(preNumber.value);

  if (value>0 && value<26){
    var number = "0x" + (value - 1).toString(16);
    output.send(0xb0, [0x00,0x00]);
    output.send(0xb0, [0x20,0x00]);
    output.send(0xc0, [Number(number)]);
  } else {
    alert("Error! Effective value must between 1-25!");
    preNumber.value = 1;
  }


}



















