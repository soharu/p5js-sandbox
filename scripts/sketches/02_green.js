const green = (p) => {
  let range = {
    min: 50,
    max: 200
  }
  let green = range.min;
  let direction = 1;
  let speed = 1;

  p.setup = () => {
    p.createCanvas(Config.sketch.width, Config.sketch.height);
  };

  p.draw = () => {
    green += direction * speed;

    p.background(Palette.lightGray);

    p.stroke(Palette.lightGray);
    p.strokeWeight(5);

    const radiuses = [75, 40, 15];
    const offsets = [0, 70, 110];
    const colors = [
      p.color(0, green, 0),
      p.color(0, 55 + green, 0),
      p.color(range.max, 255 - green, range.min)
    ];
    const fullWidth = radiuses[0] + offsets[2] + radiuses[2];

    p.translate((p.width - fullWidth) / 2, p.height / 2 - radiuses[0]);
    p.rectMode(p.CORNER);

    for (let i = 0; i < radiuses.length; i++) {
      p.fill(colors[i]);
      p.circle(
        radiuses[0] + offsets[i],
        radiuses[0],
        radiuses[i] * 2);
    }

    if (green == range.max) {
      direction = -1;
    } else if (green == range.min) {
      direction = 1;
    }
  };
};

new p5(green, '02_green');
