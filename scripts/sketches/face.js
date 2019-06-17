'use strict';

// Face class
// -----------------------------------------------------------------

class Face {
  constructor(center, radius) {
    this.center = center

    this.radius = radius;
    this.eyeRadius = radius / 3;
    this.mouthRadius = radius / 3;

    this.color = '#F3B900';
    this.eyeColor = '#1C213F';
    this.mouthColor = '#F5534F';
  }

  // Getter

  get leftEyeCenter() {
    return {
      x: -(this.radius - this.eyeRadius) * cos(QUARTER_PI),
      y: -(this.radius - this.eyeRadius) * sin(QUARTER_PI)
    };
  }

  get rightEyeCenter() {
    return {
      x: (this.radius - this.eyeRadius) * cos(QUARTER_PI),
      y: -(this.radius - this.eyeRadius) * sin(QUARTER_PI)
    };
  }

  get mouthCenter() {
    return { x: 0, y: this.radius / 10 };
  }

  // Draw methods

  draw() {
    const mouse = {
      x: mouseX - this.center.x,
      y: mouseY - this.center.y
    };
    const isMouthOpened = mouseIsPressed;

    push();
    translate(this.center.x, this.center.y);

    this.drawBackground();
    this.drawEye(this.leftEyeCenter, mouse);
    this.drawEye(this.rightEyeCenter, mouse);
    this.drawMouth(isMouthOpened);

    pop();
  }

  drawBackground() {
    push();

    noStroke();
    fill(this.color);

    ellipseMode(RADIUS);
    ellipse(0, 0, this.radius);

    pop();
  }

  drawEye(center, mouse) {
    const radius = this.eyeRadius / 2;
    // https://ko.wikipedia.org/wiki/%EC%82%BC%EA%B0%81%ED%95%A8%EC%88%98
    const dx = mouse.x;
    const dy = mouse.y;
    const h = Math.sqrt(dx * dx + dy * dy);
    const sinTheta = dy / h;
    const cosTheta = dx / h;
    const x = (this.eyeRadius - radius) * cosTheta;
    const y = (this.eyeRadius - radius) * sinTheta;

    push();
    translate(center.x, center.y);

    ellipseMode(RADIUS);
    noStroke();

    fill('white');
    ellipse(0, 0, this.eyeRadius);

    fill(this.eyeColor);
    ellipse(x, y, radius);

    pop();
  }

  drawMouth(isOpend) {
    push();
    translate(this.mouthCenter.x, this.mouthCenter.y);

    noStroke();
    fill(this.mouthColor);

    rectMode(CENTER);
    rect(0, 0, this.mouthRadius * 2, 2);

    if (isOpend) {
      // open mouth
      ellipseMode(RADIUS);
      arc(0, 0, this.mouthRadius, this.mouthRadius, 0, PI, PIE);
    }

    pop();
  }
}

class Canvas {
  constructor(width, height) {
    this.size = { width: width, height: height }
  }

  get center() {
    return { x: width / 2, y: height / 2 };
  }

  create() {
    createCanvas(this.size.width, this.size.height);
  }

  resize(width, height) {
    this.size = { width: width, height: height }
    resizeCanvas(this.size.width, this.size.height);
  }

  fill(color) {
    background(color);
  }

  draw(drawable) {
    drawable.draw();
  }
}

// p5js
// -----------------------------------------------------------------
let canvas;

function setup() {
  canvas = new Canvas(windowWidth, windowHeight);
  canvas.create();
}

function draw() {
  canvas.fill('#313A87');
  canvas.draw(new Face(canvas.center, Math.min(canvas.size.width, canvas.size.height) / 4));
}

function windowResized() {
  canvas.resize(windowWidth, windowHeight);
}
