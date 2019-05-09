function setup() {
  createCanvas(600, 400);
}

function draw() {
  const center = {
    x: width / 2,
    y: height / 2
  };

  background('#f4f4f4');

  stroke('#d4d4d4');
  line(0, center.y, width, center.y);
  line(center.x, 0, center.x, height);

  fill('#ed215D');
  noStroke();
  textSize(32);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  translate(center.x, center.y);
  angleMode(DEGREES);
  rotate(parseInt((millis() / 10)) % 360);
  text('Hello, World', 0, 0);
}
