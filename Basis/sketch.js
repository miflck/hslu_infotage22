let patternarray = [];

// hier wird die Dimension der Canvas festgelegt
let visWidth = 1240 / 2;
let visHeight = 1748 / 2;

// der Array aller Dropdowns
let paramArray = [];
let canvas;

// Zähler, zählt mit bei welcher Frage wir sind
let fragenindex = 0;

// die Fragen
let fragenarray = [
  "meine erste Frage <span class='red'>hallo</span>",
  "meine zweite Frage",
  "meine dritte Frage",
  "meine 4 Frage",
  "meine 5 Frage",
  "meine 6 Frage",
  "meine 7 Frage",
  "meine 8 Frage",
  "meine 9 Frage",
  "meine 10 Frage",
  "meine 11 Frage",
  "meine 12 Frage",
  "meine 13 Frage",
  "meine 14 Frage",
  "meine 15 Frage",
  "meine 16 Frage",
];

// variable por serialPortName
let serialPortName = "/dev/tty.usbmodem14401"; // fill in your serial port name here, you can see it in either your console or in the p5 serial control app

// variable for p5.SerialPort object
let serial;

// variable for latest incoming data
let latestData = "waiting for incoming data";

// variable for HTML DOM input for serial port name
let htmlInputPortName;

// variable for HTML DOM button for entering new serial port name
let htmlButtonPortName;

let incomingData = -1;

function preload() {
  // alle bilder müssen geladen werden
  patternarray.push(loadImage("assets/01.1.png"));
  patternarray.push(loadImage("assets/01.2.png"));
  patternarray.push(loadImage("assets/02.1.png"));
  patternarray.push(loadImage("assets/02.2.png"));
  patternarray.push(loadImage("assets/03.1.png"));
  patternarray.push(loadImage("assets/03.2.png"));
  patternarray.push(loadImage("assets/04.1.png"));
  patternarray.push(loadImage("assets/04.2.png"));
  patternarray.push(loadImage("assets/05.1.png"));
  patternarray.push(loadImage("assets/05.2.png"));
  patternarray.push(loadImage("assets/06.1.png"));
  patternarray.push(loadImage("assets/06.2.png"));
  //Effekt
  patternarray.push(loadImage("assets/07.1.png"));
  patternarray.push(loadImage("assets/07.2.png"));

  patternarray.push(loadImage("assets/08.1.png"));
  patternarray.push(loadImage("assets/08.2.png"));
  patternarray.push(loadImage("assets/09.1.png"));
  patternarray.push(loadImage("assets/09.2.png"));
  /*
  patternarray.push(loadImage("assets/0.png"));
  patternarray.push(loadImage("assets/1.png"));
  patternarray.push(loadImage("assets/2.png"));
  patternarray.push(loadImage("assets/3.png"));
  patternarray.push(loadImage("assets/4.png"));
  patternarray.push(loadImage("assets/5.png"));
  patternarray.push(loadImage("assets/6.png"));
  patternarray.push(loadImage("assets/7.png"));
  patternarray.push(loadImage("assets/8.png"));
  patternarray.push(loadImage("assets/9.png"));
  patternarray.push(loadImage("assets/10.png"));
  patternarray.push(loadImage("assets/11.png"));
  patternarray.push(loadImage("assets/12.png"));
  patternarray.push(loadImage("assets/13.png"));
  patternarray.push(loadImage("assets/14.png"));
  patternarray.push(loadImage("assets/15.png"));
  patternarray.push(loadImage("assets/16.png"));
  patternarray.push(loadImage("assets/17.png"));
  patternarray.push(loadImage("assets/18.png"));
  patternarray.push(loadImage("assets/19.png"));
  patternarray.push(loadImage("assets/20.png"));
  patternarray.push(loadImage("assets/21.png"));
  patternarray.push(loadImage("assets/22.png"));
  patternarray.push(loadImage("assets/23.png"));
  patternarray.push(loadImage("assets/24.png"));
  patternarray.push(loadImage("assets/25.png"));
  patternarray.push(loadImage("assets/26.png"));
  patternarray.push(loadImage("assets/27.png"));
  patternarray.push(loadImage("assets/28.png"));
  patternarray.push(loadImage("assets/29.png"));
  patternarray.push(loadImage("assets/30.png"));
  patternarray.push(loadImage("assets/31.png"));
  */
}

function setup() {
  canvas = createCanvas(visWidth, visHeight);
  colorMode(HSB, 360, 100, 100, 100);
  frameRate(60);
  noLoop();

  // websocket, um sich mit der "Wand" zu verbinden
  // socket.emit("hello", "world");

  // erste Frage laden
  $("#fragen").html(fragenarray[fragenindex]);

  // p5.js to create HTML input and set initial value
  htmlInputPortName = createInput(serialPortName);

  // p5.js to create HTML button and set message
  button = createButton("update port");

  // p5.js to add callback function for mouse press
  button.mousePressed(updatePort);

  // create instance of p5.SerialPort
  serial = new p5.SerialPort();

  // print version of p5.serialport library
  console.log("p5.serialport.js " + serial.version);
  serial.list(); // list the serial ports

  // when we connect to the underlying server
  serial.on("connected", gotServerConnection);

  // when we get a list of serial ports that are available
  serial.on("list", gotList);

  // When we some data from the serial port
  serial.on("data", gotData);

  // When or if we get an error
  serial.on("error", gotError);

  // When our serial port is opened and ready for read/write
  serial.on("open", gotOpen);

  serial.on("close", gotClose);

  // Callback to get the raw data, as it comes in for handling yourself
  serial.on("rawdata", gotRawData);
}

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    console.log(i + portList[i]);
  }
}

function draw() {
  background(255);
  paramArray.forEach((element, index) => {
    push();
    translate(0, 0);
    // farben festlegen. das kann natürlich z.b auch an ein dropdown geknüpft werden
    let hue = map(index, 0, paramArray.length, 0, 360);
    let saturation = 80;
    let brightness = 80;
    // blendmodes, wie bei Photoshop. Also wird das bild normal dargestellt oder z.B multipliziert etc
    //if(index==2)blendMode(DIFFERENCE);
    // das png wird eingefärbt: achtung, es muss weiss auf transparent sein
    // tint(hue, saturation, brightness);
    // rect(0, 0, tileSize, tileSize);
    // deas bild wird getzeichnet
    image(patternarray[element], 0, 0, visWidth, visHeight);
    //blendMode(SCREEN)
    pop();
  });
}

function keyPressed() {
  if (key == "S") {
    saveCanvas("myPattern", ".png");
  }

  if (key == "r") {
    redraw();
  }
  if (key == "s") {
    handleUpload();
    //saveCanvas("myPattern", ".png");
  }

  // fragen beantworten
  if (key == "j") {
    fragenindex++;
    setImage(fragenindex, 0);
    $("#fragen").html(fragenarray[fragenindex]);
  }

  if (key == "n") {
    fragenindex++;
    setImage(fragenindex, 1);
    $("#fragen").html(fragenarray[fragenindex]);
  }

  if (key == "l") {
    fetch("./upload/getFiles.php", {
      method: "GET",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((response) => response.text())
      .then((success) => console.log(success))
      .catch((error) => console.log(error));
  }
}

// immer wenn ein dropdown bedient wird, wird diese funktion ausgelöst:
// der value des dropdowns wird ausgelesen und das entsprechende bild in den paramArray geladen
function getValue(selectObject) {
  console.log(selectObject);
  var value = parseInt(selectObject.value);
  var id = parseInt(selectObject.id);
  paramArray[id] = value;
  console.log(id, value, paramArray);
  redraw();
}

// je nach frage und antwort das entsprechende Bild in den Array schreiben und neu zeichnen
function setImage(index, answer) {
  var id = index - 1;
  var value = id * 2 + answer;
  paramArray[id] = value;
  $("#" + id).val(value);
  // reset if needed:
  if (fragenindex >= fragenarray.length) {
    reset();
  }
  redraw();
}

function reset() {
  //-> hier muss noch gesaved, gedruckt und an die Wand gesendet werden
  fragenindex = 0;
  paramArray = [];
  for (let i = 0; i < fragenarray.length; i++) {
    $("#" + i).val("");
  }
}

// Upload Function für die Wand, noch in Arbeit…
function handleUpload() {
  var c = canvas.canvas.toDataURL("image/png");
  const e = document.createElement("div");
  e.innerHTML = "JavaScript DOM";
  document.body.appendChild(e);

  var dataURL = canvas.canvas.toDataURL();

  /*const img = document.createElement("img");
  img.width = width;
  img.height = height;
  img.src = dataURL;
  document.body.appendChild(img);
  */

  /*let response = fetch("./upload/upload.php", {
    // HTTP request type
    method: "POST",
    // Sending our blob with our request
    body: { imgBase64: c },
    image: c,
  });*/

  fetch("./upload/upload.php", {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: c,
  })
    .then((response) => response.text())
    .then((success) => console.log(success))
    .catch((error) => console.log(error));
}

function serialEvent() {
  // get sensor value if its only 1 byte
  //inData = Number(serial.read());

  //read serial as string if you got more than 1 byte
  inString = serial.readLine();
  if (inString.length > 0) {
    // split the inString by , to get each value
    const myDataArray = inString.split(",");
    let val0 = myDataArray[0];
    let val1 = myDataArray[1];

    // convert it to a number:
    inData = Number(val0);
  }
}

// callback function to update serial port name
function updatePort() {
  console.log("update");
  // retrieve serial port name from the text area
  serialPortName = htmlInputPortName.value();
  // open the serial port
  serial.openPort(serialPortName);
}

// We are connected and ready to go
function gotServerConnection() {
  print("connected to server");
}

// Got the list of ports
function gotList(list) {
  print("list of serial ports:");
  // list is an array of their names
  for (let i = 0; i < list.length; i++) {
    print(list[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("serial port is open");
}

function gotClose() {
  print("serial port is closed");
  latestData = "serial port is closed";
}

// Ut oh, here is an error, let's log it
function gotError(e) {
  print(e);
}

// there is data available to work with from the serial port
function gotData() {
  // read the incoming string
  let currentString = serial.readLine();
  // remove any trailing whitespace
  trim(currentString);
  // if the string is empty, do no more
  if (!currentString) {
    return;
  }
  // print the string
  console.log(currentString);
  // save it for the draw method
  latestData = currentString;
}

// we got raw from the serial port
function gotRawData(data) {
  // print("gotRawData: " + data);
  incomingData = data;
}
