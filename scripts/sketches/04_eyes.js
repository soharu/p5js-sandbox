const eyes = (p) => {
  p.setup = () => {
    p.createCanvas(Config.sketch.width, Config.sketch.height);
  };

  p.draw = () => {
    const eyeballR = 40;

    const face = {
      x: Config.sketch.width / 2,
      y: Config.sketch.height / 2,
      r: 120
    };

    const leftCenter = {
      x: face.x - (face.r - eyeballR) * Math.cos(Math.PI / 4),
      y: face.y - (face.r - eyeballR) * Math.sin(Math.PI / 4),
    };

    const rightCenter = {
      x: face.x + (face.r - eyeballR) * Math.cos(Math.PI / 4),
      y: face.y - (face.r - eyeballR) * Math.sin(Math.PI / 4),
    };

    p.background(Palette.lightGray);

    p.stroke('black');
    p.fill('yellow');
    p.circle(face.x, face.y, face.r * 2);

    // eyeballs
    p.fill('white');
    p.circle(leftCenter.x, leftCenter.y, eyeballR * 2);
    p.circle(rightCenter.x, rightCenter.y, eyeballR * 2);

    // pupils
    // https://ko.wikipedia.org/wiki/%EC%82%BC%EA%B0%81%ED%95%A8%EC%88%98
    const dx = face.x - p.mouseX;
    const dy = face.y - p.mouseY;
    const h = Math.sqrt(dx * dx + dy * dy);
    const sinTheta = dy / h;
    const cosTheta = dx / h;
    const pupilR = 20;
    const pupils = {
      left: {
        x: leftCenter.x - (eyeballR - pupilR) * cosTheta,
        y: leftCenter.y - (eyeballR - pupilR) * sinTheta,
      },
      right: {
        x: rightCenter.x - (eyeballR - pupilR) * cosTheta,
        y: rightCenter.y - (eyeballR - pupilR) * sinTheta,
      }
    };
    p.fill('#000');
    p.circle(pupils.left.x, pupils.left.y, eyeballR);
    p.circle(pupils.right.x, pupils.right.y, eyeballR);

    // for debug
    p.noFill();
    p.stroke(255, 255, 255, 128);
    p.circle(leftCenter.x, leftCenter.y, eyeballR);
    p.circle(rightCenter.x, rightCenter.y, eyeballR);
    p.circle(face.x, face.y, (face.r - eyeballR) * 2);
  };
};

new p5(eyes, '04_eyesddd');
