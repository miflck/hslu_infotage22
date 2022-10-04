let numRows = 3;
let numCols = 3;
let tileSize = 200;
let patternarray = [];

let imageArray = [];
let paramArray = [];

let sel;
let sel2;

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

  /*for (var y = 0; y < numCols; y++) {
    for (var x = 0; x < numRows; x++) {
      //console.log("y", y, "x", x);
      push();
      translate(x * tileSize, y * tileSize);
      //   noStroke();
      //  fill(random(255), random(255), random(255));
      //  rect(0, 0, tileSize, tileSize);
      image(random(patternarray), 0, 0, tileSize, tileSize);
      pop();
    }
  }*/

  paramArray.forEach((element, index) => {
    console.log(element);
    push();
    translate((index % numRows) * tileSize, floor(index / numCols) * tileSize);
    fill(255, 0, 0);
    // rect(0, 0, tileSize, tileSize);
    image(patternarray[element], 0, 0, tileSize, tileSize);

    pop();
  });
}

function keyPressed() {
  if (key == "r") {
    redraw();
  }
  if (key == "s") {
    saveCanvas("myPattern", ".png");
  }
}

function getValue(selectObject) {
  var value = parseInt(selectObject.value);
  var id = parseInt(selectObject.id);
  paramArray[id] = value;
  console.log(id, value, paramArray);

  redraw();
}

function changeBg() {
  console.log(this.value(), this.attribute("thing"), this.id());
  let val = sel.value();
  /*if (val == "Red") {
    redraw();
  } else if (val == "Blue") {
  } else if (val == "Green") {
  }*/
}
