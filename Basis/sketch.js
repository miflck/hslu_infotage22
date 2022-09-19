let numRows = 3;
let numCols = 3;
let tileSize = 400;
let patternarray = [];
let subdivide = 4;

function preload() {
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

function setup() {
  createCanvas(numRows * tileSize, numCols * tileSize);
  frameRate(60);
  noLoop();
}

function draw() {
  background(255);
  for (var y = 0; y < numCols; y++) {
    for (var x = 0; x < numRows; x++) {
      console.log("y", y, "x", x);
      push();
      translate(x * tileSize, y * tileSize);
      subdivide = int(random(2, 4));
      if (int(random(0, 2)) > 0) {
        for (var y1 = 0; y1 < subdivide; y1++) {
          for (var x1 = 0; x1 < subdivide; x1++) {
            push();
            translate((x1 * tileSize) / subdivide, (y1 * tileSize) / subdivide);
            image(
              random(patternarray),
              0,
              0,
              tileSize / subdivide,
              tileSize / subdivide
            );
            stroke(255, 0, 0);
            pop();
          }
        }
      } else {
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
