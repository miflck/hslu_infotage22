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
  socket.emit("hello", "world");

  // erste Frage laden
  $("#fragen").html(fragenarray[fragenindex]);
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
