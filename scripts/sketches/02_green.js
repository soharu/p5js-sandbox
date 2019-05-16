const green = (p) => {
  let range = {
    min: 50,
    max: 200
  }
  let green = range.min;
  let sign = 1;

  p.setup = () => {
    p.createCanvas(300, 200);
  };

  p.draw = () => {
    green += sign * 1;

    p.background('#f4f4f4');
    p.stroke('#f4f4f4');
    p.strokeWeight(5);

    p.fill(p.color(0, green, 0));
    p.circle(100, 100, 150);
    p.fill(p.color(0, 55 + green, 0));
    p.circle(170, 100, 80);
    p.fill(p.color(range.max, 255 - green, range.min));
    p.circle(210, 100, 30);

    if (green == range.max) {
      sign = -1;
    } else if (green == range.min) {
      sign = 1;
    }
  };
};

new p5(green, '02_green');
