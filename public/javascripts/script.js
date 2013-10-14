
$.runTest = function() {
  navigator.requestMIDIAccess().then( success, failure );
  alert("here");
}

$.success = function(midiAccess) {
  alert("ok you can use MIDI");
  m = midiAccess;
  inputs = m.inputs();
  outputs = m.outputs();
}

$.failure = function(error) {
  alert( "NG MIDI error 1" );
}


$.goSound = function() {
  var m = midiAccess;
  inputs = m.inputs();
  outputs = m.outputs();

  if(outputs == null) {
    alert("outputs=null");
  }
  alert("outputs" + outputs);
  alert("inputs" + inputs);
  output = outputs[0];
  output.send([0x90,0x48, 0x7f]);
  output.send([0x90,0x48, 0x00],window.performance.now()+1000.0 );
}

$.soundChange = function(parts) {
  var value = 0;
  if(outputs == null) alert( "outputs=null" );
  if(output == null) output=outputs[0];
  value = parts.options[parts.selectedIndex].value;
  output.send( [0xC0, value] );
}


$(function() {
  $('button').click( function() {
    var val = $(this).text()
    if(val == 1) {
      $.goSound("0x4A");
    }
  });
});
