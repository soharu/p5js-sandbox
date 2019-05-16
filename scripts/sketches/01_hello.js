const mousePressedSubject = new rxjs.BehaviorSubject({ x: 300, y: 200 });

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

  draw(p, t) {
    p.push();
    p.fill(this.fillColor);
    p.noStroke();
    p.rectMode(p.CENTER);
    p.circle(p.width / 2, p.height / 2, this.radius(t / 15) * 2);
    p.pop();
  }
}

const hello = (p) => {
  let textColor;
  const redDot = new Dot(10, 120, '#ff5555');

  function bind() {
    mousePressedSubject.subscribe(position => {
      let r = position.x % 255;
      let g = position.y % 255;
      let b = (position.x + position.y) % 255;
      textColor = p.color(r, g, b);
    });
  }

  p.setup = () => {
    p.createCanvas(Config.sketch.width, Config.sketch.height);
    bind();
  };

  p.draw = () => {
    const center = {
      x: p.width / 2,
      y: p.height / 2
    };

    p.background(Palette.lightGray);

    redDot.draw(p, p.millis());

    p.push();
    p.stroke('#d4d4d480');
    p.line(0, center.y, p.width, center.y);
    p.line(center.x, 0, center.x, p.height);
    p.pop();

    p.fill(textColor);
    p.noStroke();
    p.textSize(32);
    p.textStyle(p.BOLD);
    p.textAlign(p.CENTER, p.CENTER);
    p.translate(center.x, center.y);
    p.angleMode(p.DEGREES);
    p.rotate(parseInt((p.millis() / 10)) % 360);
    p.text('Hello, World', 0, 0);
  };

  p.mousePressed = () => {
    mousePressedSubject.next({ x: p.mouseX, y: p.mouseY });
  };
};

new p5(hello, '01_hello');
