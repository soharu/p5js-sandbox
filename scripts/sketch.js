const mousePressedSubject = new rxjs.BehaviorSubject({ x: 600, y: 400 });

class Dot {
  constructor(minRadius, variance, fillColor) {
    this.minRadius = minRadius;
    this.variance = variance;
    this.fillColor = fillColor;
  }

  radius(t) {
    const dir = (parseInt(t / this.variance) % 2 == 0) ? 1 : -1;
    if (dir == 1) {
      return this.minRadius + t % this.variance;
    } else {
      return this.minRadius + this.variance - (t % this.variance);
    }
  }

  draw(t) {
    push();
    fill(this.fillColor);
    noStroke();
    rectMode(CENTER);
    circle(width / 2, height / 2, this.radius(t / 15) * 2);
    pop();
  }
}

let textColor;
let redDot = new Dot(10, 150, '#ff5555');

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

  redDot.draw(millis());

  push();
  stroke('#d4d4d480');
  line(0, center.y, width, center.y);
  line(center.x, 0, center.x, height);
  pop();

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
