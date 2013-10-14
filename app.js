var express = require("express");
var app = express();
var io = require("socket.io").listen(app.listen(3333));
var serialport = require('serialport');

//midi 
var midi = require('midi'),
    midiOut = new midi.output();

try {
  midiOut.openPort(0);
} catch(error) {
  midiOut.openVirtualPort('');
}


var routes = require('./routes');
var http = require('http');
var path = require('path');
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', routes.index);


/*
// Serial Port code
var portName = '/dev/tty.usbmodemfa131'; 
var sp = new serialport.SerialPort(portName, {
  baudRate: 31250,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false,
  parser: serialport.parsers.readline("\n")
});


//socket.io code
io.sockets.on('connection', function (socket) {
  socket.emit('news_event',{name : 'websocket is ready'});
  
  //message receive
  socket.on('message', function(data){
    socket.emit('message_receive',{maintext : data["content"]});
    socket.broadcast.emit('message_receive',{maintext : data["content"]});
  });



// data from arduino via serial port
sp.on('data', function(input){
  console.log(input);
 
  //arduinoからのjsonを送信
  var buffer = new Buffer(input, 'utf8');
  var jsonData;
  try {
    jsonData = JSON.parse(buffer);
    console.log('led_state: ' + jsonData.code);
  } catch(e) {
    return;
  }
  //socket.emit(jsonData.code, { led : jsonData.code });
  var arduino_data = input;
  socket.emit('one', {led : arduino_data});
  
});

// send data to arduino via serial port
socket.on('ledon',function(data){
  sp.write(data["switch"]);
});
socket.on('ledoff',function(data){
  sp.write(data["switch"]);
});


});
*/

