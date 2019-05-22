class Eye {
  constructor(radius) {
    this.outerRadius = radius;
    this.innerRadius = radius / 2;
  }

  draw(p, x, y) {
    p.push();
    p.stroke('black');

    // eyeball
    p.fill('white');
    p.circle(x, y, this.outerRadius * 2);

    // pupil
    p.fill('black');
    // https://ko.wikipedia.org/wiki/%EC%82%BC%EA%B0%81%ED%95%A8%EC%88%98
    const dx = (p.width / 2) - p.mouseX;
    const dy = (p.height / 2) - p.mouseY;
    const h = Math.sqrt(dx * dx + dy * dy);
    const sinTheta = dy / h;
    const cosTheta = dx / h;
    const pupil = {
      x: x - (this.outerRadius - this.innerRadius) * cosTheta,
      y: y - (this.outerRadius - this.innerRadius) * sinTheta
    };
    p.circle(pupil.x, pupil.y, this.innerRadius * 2);
    p.pop();
  }
}

const eyes = (p) => {
  const face = {
    x: Config.sketch.width / 2,
    y: Config.sketch.height / 2,
    r: 120
  };
  const eyeRadius = 40;
  const leftEye = new Eye(eyeRadius);
  const rightEye = new Eye(eyeRadius);
  const leftCenter = {
    x: face.x - (face.r - eyeRadius) * Math.cos(Math.PI / 4),
    y: face.y - (face.r - eyeRadius) * Math.sin(Math.PI / 4),
  };

  const rightCenter = {
    x: face.x + (face.r - eyeRadius) * Math.cos(Math.PI / 4),
    y: face.y - (face.r - eyeRadius) * Math.sin(Math.PI / 4),
  };

  p.setup = () => {
    p.createCanvas(Config.sketch.width, Config.sketch.height);
  };

  p.draw = () => {
    p.background(Palette.lightGray);

    p.stroke('black');
    p.fill('yellow');
    p.circle(face.x, face.y, face.r * 2);

    leftEye.draw(p, leftCenter.x, leftCenter.y);
    rightEye.draw(p, rightCenter.x, rightCenter.y);
  };
};

new p5(eyes, '04_eyes');
