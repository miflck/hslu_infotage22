let patternarray = [];
let numRows = 4; //-> wieviele in X Richtung
let numCols = 4; //-> wieviele in Y Richtung
let tileSize = 200;

function preload() {
  patternarray.push(loadImage("assets/0.png"));
  patternarray.push(loadImage("assets/1.png"));
  patternarray.push(loadImage("assets/2.png"));
  patternarray.push(loadImage("assets/3.png"));
  patternarray.push(loadImage("assets/4.png"));
  patternarray.push(loadImage("assets/5.png"));
}

function setup() {
  colorMode(HSB, 360, 100, 100);
  angleMode(DEGREES);
  createCanvas(numRows * tileSize, numCols * tileSize);
  noLoop();
}

function draw() {
  background(220);
  for (let y = 0; y < numCols; y++) {
    for (let x = 0; x < numCols; x++) {
      push();
      translate(x * tileSize, y * tileSize);
      fill(((x + y) * 360) / (numCols + numRows), 80, 80);
      //rect(0, 0, tileSize, tileSize);
      //fill(0);
      image(random(patternarray), 0, 0, tileSize, tileSize);
      // rotate(random(patternarray));
      // arc(0, 0, tileSize * 2, tileSize * 2, 0, 90);
      pop();
    }
  }
}

function keyPressed() {
  if (key == "r") {
    redraw();
  }
  if (key == "s") {
    saveCanvas("myVis", ".png");
  }
}
