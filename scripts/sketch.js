const mousePressedSubject = new rxjs.BehaviorSubject({ x: 0, y: 0 });

let textColor;

function setup() {
  createCanvas(600, 400);
  bind();
}

function bind() {
  mousePressedSubject.subscribe(position => {
    let r = position.x % 255;
    let g = position.y % 255;
    let b = (position.x + position.y) % 255;
    textColor = color(r, g, b);
  });
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

  fill(textColor);
  noStroke();
  textSize(32);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  translate(center.x, center.y);
  angleMode(DEGREES);
  rotate(parseInt((millis() / 10)) % 360);
  text('Hello, World', 0, 0);
}

function mousePressed() {
  mousePressedSubject.next({ x: mouseX, y: mouseY });
}
