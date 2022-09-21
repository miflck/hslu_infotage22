// Grid Variabeln
let numRows = 3; // Anzahl Kacheln in X-Richtung
let numCols = 3; // Anzahl Kacheln in Y Richtung
let tileSize = 400; // Grösse der Kacheln
let patternarray = []; // Liste aller verfügbaren Muster/Kacheln
let canvas;

// Vor dem Setup ausführen
function preload() {
  // hier werden die Muster aus dem Assets Ordner geladen
  patternarray.push(loadImage("assets/0.png"));
  patternarray.push(loadImage("assets/1.png"));
  patternarray.push(loadImage("assets/kreis 1.png"));
  patternarray.push(loadImage("assets/kreis 2.png"));
  patternarray.push(loadImage("assets/kreis 3.png"));
  patternarray.push(loadImage("assets/kreis 4.png"));
  patternarray.push(loadImage("assets/dreieck 1.png"));
  patternarray.push(loadImage("assets/dreieck 2.png"));
  patternarray.push(loadImage("assets/dreieck 3.png"));
  patternarray.push(loadImage("assets/dreieck 4.png"));
}

// das Setup wird beim Start/Reload der Seite einmal ausgeführt
function setup() {
  // Auf Hue, Saturation, Brightness umstellen. Macht es einfacher, shades von Farben zu generieren
  colorMode(HSB, 360, 100, 100);
  // Die Canvas aufssetzen
  canvas = createCanvas(numRows * tileSize, numCols * tileSize);
  // Gewünschte Framerate
  frameRate(60);
  // Für den Moment brauchen wir keinen Loop über die draw funktion. Sie wird nur einmal ausgeführt.
  noLoop();
}

// draw loop wird ca 60 mal pro Sekunde ausgeführt respektive wiederholt
function draw() {
  // wähle eine zufällige Farbe
  let hue = random(360);
  // bild löschen, respektive die Leinwand mit der Komplementärfarbe der zufälligen Farbe übermalen
  background((hue + 180) % 360, 80, 80);
  // Duch alle Zeilen loopen, die y-Variable zählt dabei mit, in welchem Durchgang wir sind
  for (var y = 0; y < numCols; y++) {
    // Pro Zeile einemal durch alle Reihen/kacheln loopen, die x Variable zählt mit, in wenlchem Durchgang wir uns befinden
    for (var x = 0; x < numRows; x++) {
      // jede Kachel soll etwas von der brightness verlieren, so dass die kachel rechts unten am dunkelsten ist
      //let brightness = map(x + y * numRows, 0, numCols * numRows - 1, 100, 20);

      // wähle pro kachel eine zufällige brightness
      let brightness = random(100);

      push();
      // an die entsprechenden Koordinaten translozieren
      translate(x * tileSize, y * tileSize);
      //if (int(random(0, 2)) > 0) {
      if (int(random(0, 10)) > 7) {
        let subdivide = int(random(2, 4)); // in wieviele Unterkacheln soll die Kachel geteilt werden? hier mal zufällig zwischen 2 und 4
        // jetzt loopen wir zeilenweise durch die Unterkacheln
        for (var y1 = 0; y1 < subdivide; y1++) {
          for (var x1 = 0; x1 < subdivide; x1++) {
            // wähle eine zufällige Sättigung
            let saturation = random(100);
            push();
            // an die entsprechende Koordinate gehen
            translate((x1 * tileSize) / subdivide, (y1 * tileSize) / subdivide);
            // die Unterkachel zeichnen
            tint(hue, saturation, brightness);
            image(
              random(patternarray),
              0,
              0,
              tileSize / subdivide,
              tileSize / subdivide
            );
            pop();
          }
        }
      } else {
        // wähle eine zufällige Sättigung
        let saturation = random(100);

        tint(hue, saturation, brightness);
        // wenn die Kachel nicht unterteilt werden soll, geht es hier weiter mit dem Zeichnen der Kachel
        image(random(patternarray), 0, 0, tileSize, tileSize);
      }
      pop();
    }
  }
}

function keyPressed() {
  if (key == "r") {
    redraw();
  }
  if (key == "s") {
    // saveCanvas("myPattern", ".png");
    // var dataURL = canvas.toDataURL();
    //const file = dataURLtoBlob(canvas.toDataURL());
    // console.log(canvas);
    var photo = canvas.canvas.toDataURL("image/jpeg");

    //let url = "https://hslu2022.michaelflueckiger.ch/upload/upload.php";
    let url = "./upload/upload.php";

    let postData = {
      userId: 1,
      title: "p5 Clicked!",
      body: "p5.js is very cool.",
    };

    httpPost(url, "image/jpeg", photo);

    //    httpPost("./upload/upload.php", "hello");
    /*
    $.ajax({
      method: "POST",
      url: "https://hslu2022.michaelflueckiger.ch/upload/upload.php",
      data: {
        photo: photo,
      },
    });*/
  }
}

function dataURLtoBlob(dataURL) {
  let array, binary, i, len;
  binary = atob(dataURL.split(",")[1]);
  array = [];
  i = 0;
  len = binary.length;
  while (i < len) {
    array.push(binary.charCodeAt(i));
    i++;
  }
  return new Blob([new Uint8Array(array)], {
    type: "image/png",
  });
}
