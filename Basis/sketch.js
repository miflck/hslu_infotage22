// Start local php server:
//php -S localhost:8000

// array der layer
let layerarray = [];

// hier wird die Dimension der Canvas festgelegt
let visWidth = 1240 * 0.8; // 2; //620
let visHeight = 1748 * 0.8; // 2; // 874

// der Array aller Dropdowns
let paramArray = [];
let canvas;

// Zähler, zählt mit bei welcher Frage wir sind
let fragenindex = 0;

// Boolean, nach jedem Durchgang soll ein Startscreen gezeigt werden
let startscreen = true;

// Druckeradresse, wird ans php skript weiter gegeben für lp cups
let printer = "EPSON_ET_2850_Series";

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
  layerarray.push(loadImage("assets/01_rot.png"));
  layerarray.push(loadImage("assets/01_schwarz.png"));
  layerarray.push(loadImage("assets/02_rot.png"));
  layerarray.push(loadImage("assets/02_schwarz.png"));
  layerarray.push(loadImage("assets/03_rot.png"));
  layerarray.push(loadImage("assets/03_schwarz.png"));
  layerarray.push(loadImage("assets/04_rot.png"));
  layerarray.push(loadImage("assets/04_schwarz.png"));
  layerarray.push(loadImage("assets/05_rot.png"));
  layerarray.push(loadImage("assets/05_schwarz.png"));
  layerarray.push(loadImage("assets/06_rot.png"));
  layerarray.push(loadImage("assets/06_schwarz.png"));
  layerarray.push(loadImage("assets/07_rot.png"));
  layerarray.push(loadImage("assets/07_schwarz.png"));
  layerarray.push(loadImage("assets/08_rot.png"));
  layerarray.push(loadImage("assets/08_schwarz.png"));
  layerarray.push(loadImage("assets/09_rot.png"));
  layerarray.push(loadImage("assets/09_schwarz.png"));
  layerarray.push(loadImage("assets/10_rot.png"));
  layerarray.push(loadImage("assets/10_schwarz.png"));
  layerarray.push(loadImage("assets/11_rot.png"));
  layerarray.push(loadImage("assets/11_schwarz.png"));

  // drucken oder nicht? braucht auch ein bild, respektive der array muss gross genug sein. das wird aber nicht angezeigt…
  layerarray.push(loadImage("assets/11_rot.png"));
  layerarray.push(loadImage("assets/11_schwarz.png"));
}

function setup() {
  canvas = createCanvas(visWidth, visHeight);
  canvas.parent("canvasForHTML");
  colorMode(HSB, 360, 100, 100, 100);
  frameRate(60);
  noLoop();
}

function draw() {
  background(255);
  if (startscreen) {
    console.log(startscreen);
    textAlign(CENTER, CENTER);

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
      image(layerarray[element], 0, 0, visWidth, visHeight);
      //blendMode(SCREEN)
      pop();
    });
  }
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
      handleUpload(0);
      startScreen();
    }
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

  redraw();
}

function reset() {
  startscreen = false;
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
  $("#fragen").html("Buzzer für Neustart");
  redraw();
}

// Upload Function für die Wand, noch in Arbeit…
function handleUpload(print) {
  var c = canvas.canvas.toDataURL("image/png");

  fetch("./upload/upload.php?print=" + print + "&printer=" + printer, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: c,
  })
    .then((response) => response.text())
    .then((success) => console.log(success))
    .catch((error) => console.log(error));

  /*
  Die Bilder für die Postings wurden zusätzlich auf meinen Server geladen, damit das SCM-Team zugriff auf die Bilder hatte. das muss nicht länger sein…
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
  */
}
