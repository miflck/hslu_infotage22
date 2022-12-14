let numRows = 5;
let numCols = 2;

// hier wird die Dimension der Canvas festgelegt
let visWidth = 1240 * 0.25;
let visHeight = 1748 * 0.25;

let cols = [];
var possible_images;

var imageurls = [];

function fentchFiles() {
  fetch("  ./upload/getFiles.php", {
    method: "GET",
    mode: "cors", // no-cors, *cors, same-origin
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  })
    .then((response) => response.text())
    .then((success) => {
      // all files
      let incoming = JSON.parse(success);
      // only keep new files in result
      let result = incoming.filter((n) => !imageurls.includes(n));
      //combine arrays
      imageurls = [...new Set([...imageurls, ...incoming])];
      console.log(incoming, result, imageurls);
      // push in new tile
      result.forEach((item) => {
        createNewTile(0, item);
        console.log(item);
      });
    })
    .catch((error) => console.log("error", error));
}

function setup() {
  createCanvas(numRows * visWidth, numCols * visHeight);
  setInterval(fentchFiles, 3000);
  possible_images = [];

  let xPos = -visWidth;
  let yPos = 0;
  let targetX = 0;

  for (let i = 0; i < numCols; i++) {
    cols.push(new Array());
  }
}

function draw() {
  background(0);
  cols.forEach(function (col, i) {
    col.forEach(function (tile, ti) {
      tile.move();
      push();
      translate(0, i * visHeight);
      tile.display();
      pop();
    });
  });

  // remove overlapping tile
  cols.forEach(function (col, i) {
    col.forEach(function (tile, ti) {
      if (tile.remove) {
        if (cols.length > i + 1) addTileToCol(tile, i + 1);
        tile.setPositionX(-visWidth) / 2;
        tile.setTargetX(0);
        tile.remove = false;
        col.splice(ti, 1);
      }
    });
  });
}

function keyPressed() {
  if (key == "n") {
    console.log("----------");
    createNewTile(0);
  }

  if (key == "l") {
    fetch("  ./upload/getFiles.php", {
      method: "GET",
      mode: "cors", // no-cors, *cors, same-origin
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((response) => response.text())
      .then((success) => {
        console.log("s", success, JSON.parse(success));
        imageurls = JSON.parse(success);
        console.log(imageurls);
        imageurls.forEach((item) => {
          createNewTile(0, item);
          console.log(item);
        });
      })
      .catch((error) => console.log("error", error));
  }

  if (key == "m") {
    fetch("  ./upload/getFiles.php", {
      method: "GET",
      mode: "cors", // no-cors, *cors, same-origin
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((response) => response.text())
      .then((success) => {
        // all files
        let incoming = JSON.parse(success);
        // only keep new files in result
        let result = incoming.filter((n) => !imageurls.includes(n));
        //combine arrays
        imageurls = [...new Set([...imageurls, ...incoming])];
        console.log(incoming, result, imageurls);
        // push in new tile
        result.forEach((item) => {
          createNewTile(0, item);
          console.log(item);
        });
      })
      .catch((error) => console.log("error", error));
  }
}

class Tile {
  constructor(tileWidth, tileHeight, posX, posY) {
    this.x = posX;
    this.y = posY;
    this.startX = posX;
    this.startY = posY;
    this.targetX = 0;
    this.targetY = 0;
    this.tileWidth = tileWidth;
    this.tileHeigh = tileHeight;
    this.animationStartTime;
    this._remove = false;
    this.image;
  }

  move() {
    if (millis() < this.animationStartTime + 500) {
      this.x = ceil(
        easeOutSine(
          millis() - this.animationStartTime,
          this.startX,
          this.targetX - this.startX,
          500
        )
      );
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    if (this.x >= numRows * this.tileWidth) {
      this.remove = true;
    }

    rect(0, 0, this.tileWidth, this.tileHeigh);
    image(this.image, 0, 0, this.tileWidth, this.tileHeigh);
    fill(0);
    /*  text(
      "pos " +
        this.x +
        " t " +
        this.targetX +
        " startX " +
        this.startX +
        " r " +
        this._remove,
      10,
      30
    );*/
    pop();
  }

  setTargetX(x) {
    this.startX = this.x;
    this.targetX = x;
    this.animationStartTime = millis();
  }

  get getTargetX() {
    return this.targetX;
  }

  setPositionX(x) {
    this.x = x;
  }

  get positionX() {
    return this.x;
  }

  setPositionY(y) {
    this.y = y;
  }

  setImage(img) {
    this.image = img;
  }

  get positionY() {
    return this.y;
  }

  set remove(r) {
    this._remove = r;
  }
  get remove() {
    return this._remove;
  }
}

function addTileToCol(newTile, i) {
  cols[i].forEach(function (tile, i) {
    tile.setTargetX(tile.targetX + tile.tileWidth);
  });
  cols[i].push(newTile);
}

function createNewTile(rowIndex) {
  cols[rowIndex].forEach(function (tile, i) {
    tile.setTargetX(tile.targetX + tile.tileWidth);
  });

  let t = new Tile(visWidth, visHeight, -visWidth, 0);
  let img = loadImage(random(possible_images));
  t.setImage(img);
  t.setTargetX(0);
  cols[rowIndex].push(t);
}

function createNewTile(rowIndex, url) {
  cols[rowIndex].forEach(function (tile, i) {
    tile.setTargetX(tile.targetX + tile.tileWidth);
  });
  let t = new Tile(visWidth, visHeight, -visWidth, 0);
  let img = loadImage("./upload/getImage.php?file=" + url);
  t.setImage(img);
  t.setTargetX(0);
  cols[rowIndex].push(t);
}

// HELPER

function easeInSine(t, b, c, d) {
  return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;
}
function easeOutSine(t, b, c, d) {
  return c * Math.sin((t / d) * (Math.PI / 2)) + b;
}
function easeInOutSine(t, b, c, d) {
  return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
}

function easeInOutQuart(t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b;
  return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
}

function ease(t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b;
  return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
}
