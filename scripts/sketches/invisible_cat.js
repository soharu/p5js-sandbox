"use strict";

const imageSize = {
  width: 32,
  height: 32,
};

const pixelSize = 20;

class ColumnImage {
  constructor(rows, cols, pixels) {
    this.columns = [];
    this.orders = [];
    this.selectedColumnIndex = null;
    for (var c = 0; c < cols; ++c) {
      var vline = [];
      for (var r = 0; r < rows; ++r) {
        const value = pixels[r * cols + c];
        vline.push(value);
      }
      this.columns.push(vline);
      this.orders.push(c);
    }
  }

  draw(p, offset) {
    p.push();
    p.translate(offset.x, offset.y);
    for (var i = 0; i < this.columns.length; ++i) {
      this.drawColumn(p, i, this.orders[i]);
    }
    this.drawSelectedColumnBorder(p);
    p.pop();
  }

  drawSelectedColumnBorder(p) {
    if (this.selectedColumnIndex === null) {
      return;
    }
    p.push();
    p.stroke("#000");
    p.strokeWeight(2);
    p.noFill();
    p.rect(
      this.selectedColumnIndex * pixelSize,
      0,
      pixelSize,
      imageSize.height * pixelSize
    );
    p.pop();
  }

  drawColumn(p, index, c) {
    const x = index * pixelSize;
    const values = this.columns[c];
    p.push();

    p.noStroke();
    p.fill("#fff");
    p.textAlign(p.CENTER);
    p.text(c, x + pixelSize / 2, -10);
    p.pop();

    p.push();
    for (var i = 0; i < values.length; ++i) {
      p.noStroke();
      p.fill(values[i]);
      p.rect(x, i * pixelSize, pixelSize, pixelSize);
    }
    p.pop();
  }

  moveSelectedColumnIndexToLeft() {
    if (this.selectedColumnIndex === null) {
      return;
    }

    const targetIndex = this.selectedColumnIndex - 1;
    if (targetIndex < 0) {
      return;
    }

    this.swapSelectedColumnIndexTo(targetIndex);
  }

  moveSelectedColumnIndexToRight() {
    if (this.selectedColumnIndex === null) {
      return;
    }

    const targetIndex = this.selectedColumnIndex + 1;
    if (targetIndex >= imageSize.width) {
      return;
    }

    this.swapSelectedColumnIndexTo(targetIndex);
  }

  swapSelectedColumnIndexTo(targetIndex) {
    // swap columns' order
    const selectedColumn = this.orders[this.selectedColumnIndex];
    const targetColumn = this.orders[targetIndex];
    this.orders[targetIndex] = selectedColumn;
    this.orders[this.selectedColumnIndex] = targetColumn;

    this.selectedColumnIndex = targetIndex;
  }
}

const sketchImpl = (p) => {
  const imageData = encryptedImageList[20];
  const columnImage = new ColumnImage(
    imageSize.width,
    imageSize.height,
    imageData
  );
  const headerHeight = 20;
  const padding = 25;
  const imageOffset = { x: padding, y: headerHeight + padding };

  p.setup = () => {
    p.createCanvas(
      imageSize.width * pixelSize + padding * 2,
      headerHeight + imageSize.height * pixelSize + padding * 2
    );
    p.noLoop();
  };

  p.draw = () => {
    p.background("#00f");
    columnImage.draw(p, imageOffset);
  };

  p.drawImage = (offset) => {
    p.push();
    p.translate(offset.x, offset.y);
    for (var x = 0; x < imageSize.width; ++x) {
      for (var y = 0; y < imageSize.height; ++y) {
        const color = imageData[y * imageSize.width + x];
        p.noStroke();
        p.fill(color);
        p.rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }
    }
    p.pop();
  };

  p.touchEnded = () => {
    const point = {
      x: Math.floor(p.mouseX - imageOffset.x),
      y: Math.floor(p.mouseY - imageOffset.y),
    };

    if (point.y < 0 || point.y > imageSize.height * pixelSize) {
      columnImage.selectedColumnIndex = null;
      p.redraw();
      return;
    }

    if (point.x < 0 || point.x > imageSize.width * pixelSize) {
      columnImage.selectedColumnIndex = null;
      p.redraw();
      return;
    }

    const index = Math.floor(point.x / pixelSize);
    columnImage.selectedColumnIndex = index;
    p.redraw();
  };

  p.keyPressed = () => {
    switch (p.keyCode) {
      case p.LEFT_ARROW:
        columnImage.moveSelectedColumnIndexToLeft();
        p.redraw();
        break;
      case p.RIGHT_ARROW:
        columnImage.moveSelectedColumnIndexToRight();
        p.redraw();
        break;
      default:
        break;
    }
  };
};

new p5(sketchImpl, "sketch");
