const myTimer = (p) => {
  let startedAt = p.millis();
  let timeout = 10;

  p.setup = () => {
    const size = containerSize(p, '#03_timer');
    p.createCanvas(size.width, size.height);
    p.frameRate(30);
  };

  p.draw = () => {
    const center = {
      x: p.width / 2,
      y: p.height / 2
    }

    const t = p.min((p.millis() - startedAt) / 1000, timeout);
    p.background(Palette.lightGray);

    p.push();
    if (t < timeout) {
      p.fill('#ff5555');
      p.strokeWeight(5);
      p.arc(
        center.x, center.y,
        p.height * 0.75, p.height * 0.75,
        p.PI + p.HALF_PI + (p.TWO_PI * t / timeout), p.PI + p.HALF_PI);
    } else {
      const blink = p.round((p.millis() / 500)) % 2;
      p.fill(blink === 1 ? '#ff5555' : Palette.lightGray);
      p.noStroke();
      p.textSize(50);
      p.textStyle(p.BOLD);
      p.textAlign(p.CENTER);
      p.text('Time out!', center.x, center.y)
    }
    p.pop();

    p.fill('black');
    p.noStroke();
    p.textAlign(p.RIGHT);
    p.text(p.round(t) + ' seconds', p.width - 10, p.height - 10);
  };

  p.mousePressed = () => {
    if (((p.millis() - startedAt) / 1000) > timeout) {
      startedAt = p.millis();
    }
  }
};

new p5(myTimer, '03_timer');
