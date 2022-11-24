let patternarray = [];

// hier wird die Dimension der Canvas festgelegt
let visWidth = 1240 * 0.8; // 2; //620
let visHeight = 1748 * 0.8; // 2; // 874

// der Array aller Dropdowns
let paramArray = [];
let canvas;

// Zähler, zählt mit bei welcher Frage wir sind
let fragenindex = 0;

let startscreen = true;

// die Fragen
let fragenarray = [
  "<span class='red'>Tag</span> <span class='oder'> oder </span> Nacht?",
  "<span class='red'>Fahrerin</span> <span class='oder'> oder </span>  Beifahrerin?",
  "<span class='red'>Avocado</span> <span class='oder'> oder </span>  Jeans?",
  "<span class='red'>Chaos</span> <span class='oder'> oder </span>  Struktur?",
  "<span class='red'>Edward</span> <span class='oder'> oder </span>  Jacob?",
  "<span class='red'>Lego</span> <span class='oder'> oder </span>  Playmobil?",
  "<span class='red'>Rindsfilet</span> <span class='oder'> oder </span>  SUV?",
  "<span class='red'>Netflix</span> <span class='oder'> oder </span>  Warme Dusche?",
  "<span class='red'>Zalando</span> <span class='oder'> oder </span>  Zoo?",
  "<span class='red'>Skipiste</span> <span class='oder'> oder </span>  Autobahn?",
  "<span class='red'>Siehst du dich in dem?</span> <span class='oder'> oder </span>  Bist du das?",
  "<span class='red'>Drucken</span> <span class='oder'> oder </span>  posten?",
];

function preload() {
  patternarray.push(loadImage("assets/01_rot.png"));
  patternarray.push(loadImage("assets/01_schwarz.png"));
  patternarray.push(loadImage("assets/02_rot.png"));
  patternarray.push(loadImage("assets/02_schwarz.png"));
  patternarray.push(loadImage("assets/03_rot.png"));
  patternarray.push(loadImage("assets/03_schwarz.png"));
  patternarray.push(loadImage("assets/04_rot.png"));
  patternarray.push(loadImage("assets/04_schwarz.png"));
  patternarray.push(loadImage("assets/05_rot.png"));
  patternarray.push(loadImage("assets/05_schwarz.png"));
  patternarray.push(loadImage("assets/06_rot.png"));
  patternarray.push(loadImage("assets/06_schwarz.png"));
  //Effekt
  patternarray.push(loadImage("assets/07_rot.png"));
  patternarray.push(loadImage("assets/07_schwarz.png"));

  patternarray.push(loadImage("assets/08_rot.png"));
  patternarray.push(loadImage("assets/08_schwarz.png"));
  patternarray.push(loadImage("assets/09_rot.png"));
  patternarray.push(loadImage("assets/09_schwarz.png"));
  patternarray.push(loadImage("assets/10_rot.png"));
  patternarray.push(loadImage("assets/10_schwarz.png"));
  patternarray.push(loadImage("assets/11_rot.png"));
  patternarray.push(loadImage("assets/11_schwarz.png"));

  // drucken oder nicht braucht auch ein bild, respektive der array muss gross genug sein. das wird aber nicht gebraucht
  patternarray.push(loadImage("assets/11_rot.png"));
  patternarray.push(loadImage("assets/11_schwarz.png"));
}

function setup() {
  canvas = createCanvas(visWidth, visHeight);
  canvas.parent("canvasForHTML");

  colorMode(HSB, 360, 100, 100, 100);
  frameRate(60);
  noLoop();

  // websocket, um sich mit der "Wand" zu verbinden
  // socket.emit("hello", "world");

  // erste Frage laden
  // $("#fragen").html(fragenarray[fragenindex]);
}

function draw() {
  background(255);
  if (startscreen) {
    console.log(startscreen);
    textAlign(CENTER, CENTER);

    text("hello", 0, 0);
    textSize(800);
    text("?", width / 2, height / 2);
  } else {
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
  if (key == "n") {
    fragenindex++;
    if (startscreen) {
      reset();
    }
    setImage(fragenindex, 0);
    $("#fragen").html(fragenarray[fragenindex]);
    console.log(fragenindex, fragenarray.length);
    if (fragenindex >= fragenarray.length) {
      handleUpload(1);
      startScreen();
    }
  }

  if (key == "j") {
    fragenindex++;
    if (startscreen) {
      reset();
    }
    setImage(fragenindex, 1);
    $("#fragen").html(fragenarray[fragenindex]);
    console.log(fragenindex, fragenarray.length);
    if (fragenindex >= fragenarray.length) {
      // hier noch ohne druck
      handleUpload(0);
      startScreen();
    }
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
  /*if (fragenindex >= fragenarray.length) {
    reset();
  }*/
  redraw();
}

function reset() {
  startscreen = false;
  //-> hier muss noch gesaved, gedruckt und an die Wand gesendet werden
  fragenindex = 0;
  paramArray = [];
  for (let i = 0; i < fragenarray.length; i++) {
    $("#" + i).val("");
  }
  $("#fragen").html(fragenarray[fragenindex]);

  redraw();
}

function startScreen() {
  console.log(startscreen);
  startscreen = true;
  console.log("start", startscreen);

  $("#fragen").html("Buzzer für neustart");

  redraw();
}

// Upload Function für die Wand, noch in Arbeit…
function handleUpload(print) {
  var c = canvas.canvas.toDataURL("image/png");

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

  fetch("./upload/upload.php?print=" + print, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: c,
  })
    .then((response) => response.text())
    .then((success) => console.log(success))
    .catch((error) => console.log(error));

  if (print == 0) {
    fetch("https://hslu2022.michaelflueckiger.ch/upload/upload.php", {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: c,
    })
      .then((response) => response.text())
      .then((success) => console.log(success))
      .catch((error) => console.log(error));
  }
}
