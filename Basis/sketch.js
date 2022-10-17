let patternarray = [];

let visWidth = 600;
let visHeight = 600;

let paramArray = [];

let canvas;

function preload() {
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
}

function setup() {
  canvas = createCanvas(visWidth, visHeight);

  colorMode(HSB, 360, 100, 100, 100);
  frameRate(60);
  noLoop();
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

    //blendMode(DIFFERENCE);
    // das png wird eingefärbt: achtung, es muss weiss auf transparent sein
    tint(hue, saturation, brightness);
    // rect(0, 0, tileSize, tileSize);
    image(patternarray[element], 0, 0, visWidth, visHeight);
    pop();
  });
}

function keyPressed() {
  if (key == "r") {
    redraw();
  }
  if (key == "s") {
    //saveCanvas("myPattern", ".png");

    var c = canvas.canvas.toDataURL("image/png");
    console.log("c", c);
    //asyncCall();
    console.log("h");

    const e = document.createElement("div");
    e.innerHTML = "JavaScript DOM";
    document.body.appendChild(e);

    //asyncCall();

    var dataURL = canvas.canvas.toDataURL();
    //console.log(dataURL);

    const img = document.createElement("img");
    img.width = width;
    img.height = height;
    img.src = dataURL;
    document.body.appendChild(img);

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
}

// immer wenn ein dropdown bedient wird, wird diese funktion ausgelöst:
// der value des dropdowns wird ausgelesen und das entsprechende bild in den paramArray geladen
function getValue(selectObject) {
  var value = parseInt(selectObject.value);
  var id = parseInt(selectObject.id);
  paramArray[id] = value;
  console.log(id, value, paramArray);
  redraw();
}
