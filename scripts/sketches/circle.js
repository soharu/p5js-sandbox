const circles = [];
let circleWidth = 200;// 250;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function draw() {
  background('#f2f2f2');

  for (let i = 0; i < circles.length; ++i) {
    const fillColor = 255 - ((255 * circles[i].width) / 250);
    const strokeColor = Math.min(fillColor + 10, 255);

    fill(fillColor, fillColor / 10, fillColor / 10);
    stroke(strokeColor, strokeColor / 10, strokeColor / 10);
    circle(circles[i].x, circles[i].y, circles[i].width);

    fill(fillColor / 10, fillColor, fillColor / 10);
    stroke(strokeColor / 10, strokeColor, strokeColor / 10);
    circle(width - circles[i].x, height - circles[i].y, circles[i].width);
  }
}

function touchMoved() {
  if (circleWidth < 5) {
    return;
  }

  if (circles.length > 0) {
    const lastCircle = circles[circles.length - 1];
    const dist = distance(mouseX, mouseY, lastCircle.x, lastCircle.y);
    if (dist < 20) {
      return;
    }
  }

  const newCircle = {
    x: mouseX,
    y: mouseY,
    width: circleWidth
  }
  circles.push(newCircle);
  circleWidth -= Math.min(circleWidth / 10);

  redraw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.abs(x1 - x2) ** 2 + Math.abs(y1 - y2) ** 2)
}
