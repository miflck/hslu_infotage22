// Grid Variabeln
let numRows = 3; // Anzahl Kacheln in X-Richtung
let numCols = 3; // Anzahl Kacheln in Y Richtung
let tileSize = 200; // Grösse der Kacheln
let patternarray = []; // Liste aller verfügbaren Muster/Kacheln

// Vor dem Setup ausführen
function preload() {
  // hier werden die Muster aus dem Assets Ordner geladen
  patternarray.push(loadImage("assets/0.png"));
  patternarray.push(loadImage("assets/1.png"));
  patternarray.push(loadImage("assets/2.png"));
  patternarray.push(loadImage("assets/3.png"));
  patternarray.push(loadImage("assets/4.png"));
  patternarray.push(loadImage("assets/5.png"));
  patternarray.push(loadImage("assets/dreieck 1.png"));
  patternarray.push(loadImage("assets/dreieck 2.png"));
  patternarray.push(loadImage("assets/dreieck 3.png"));
  patternarray.push(loadImage("assets/dreieck 4.png"));
}

// das Setup wird beim Start/Reload der Seite einmal ausgeführt
function setup() {
  // Die Canvas aufssetzen
  createCanvas(numRows * tileSize, numCols * tileSize);
  // Gewünschte Framerate
  frameRate(60);
  // Für den Moment brauchen wir keinen Loop über die draw funktion. Sie wird nur einmal ausgeführt.
  noLoop();
}

// draw loop wird ca 60 mal pro Sekunde ausgeführt respektive wiederholt
function draw() {
  // bild löschen, respektive die Leinwand übermalen
  background(255);
  // Duch alle Zeilen loopen, die y-Variable zählt dabei mit, in welchem Durchgang wir sind
  for (var y = 0; y < numCols; y++) {
    // Pro Zeile einemal durch alle Reihen/kacheln loopen, die x Variable zählt mit, in wenlchem Durchgang wir uns befinden
    for (var x = 0; x < numRows; x++) {
      push();
      // an die entsprechenden Koordinaten translozieren
      translate(x * tileSize, y * tileSize);

      /* NEU: es ist nun auch möglich, eine Kachel in kleinere Kacheln zu unterteilen. Das bringt noch mehr Varianz. 
      Ev binden wir das an eine kluge Frage wie z.B Aufgeräumter Schreibtisch ermöglicht keine Subdivides, messy Schreibtisch schon? */
      if (int(random(0, 2)) > 0) {
        // mit 50% Wahrscheinlichkeit zufällig bestimmen ob es zum Subdivide kommen soll
        let subdivide = int(random(2, 4)); // in wieviele Unterkacheln soll die Kachel geteilt werden? hier mal zufällig zwischen 2 und 4

        // jetzt loopen wir zeilenweise durch die Unterkacheln
        for (var y1 = 0; y1 < subdivide; y1++) {
          for (var x1 = 0; x1 < subdivide; x1++) {
            push();
            // an die entsprechende Koordinate gehen
            translate((x1 * tileSize) / subdivide, (y1 * tileSize) / subdivide);
            // die Unterkachel zeichnen
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
    saveCanvas("myPattern", ".png");
  }
}
