"use strict";

const columnMoveEventSubject = new rxjs.Subject();

const imageSize = {
  width: 32,
  height: 32,
};

const pixelSize = 12;

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
    p.textSize(pixelSize * 0.8);
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

  swapSelectedColumnIndex(selectedIndex, targetIndex) {
    if (targetIndex < 0 || targetIndex >= imageSize.width) {
      return;
    }

    // swap columns' order
    const selectedColumn = this.orders[selectedIndex];
    const targetColumn = this.orders[targetIndex];
    this.orders[targetIndex] = selectedColumn;
    this.orders[selectedIndex] = targetColumn;

    if (this.selectedColumnIndex !== null) {
      this.selectedColumnIndex = targetIndex;
    }
  }
}

const sketchImpl = (p) => {
  var columnImage = null;
  const headerHeight = 20;
  const padding = 5;
  const imageOffset = { x: padding, y: headerHeight + padding };

  function bind() {
    columnMoveEventSubject.subscribe((event) => {
      if (columnImage === null) {
        return;
      }
      switch (event.direction) {
        case "left":
          columnImage.swapSelectedColumnIndex(event.selectedIndex, event.selectedIndex - 1);
          break;
        case "right":
          columnImage.swapSelectedColumnIndex(event.selectedIndex, event.selectedIndex + 1);
          break;
        default:
          break;
      }
    });
  }

  p.setup = () => {
    p.createCanvas(
      imageSize.width * pixelSize + padding * 2,
      headerHeight + imageSize.height * pixelSize + padding * 2
    );
    bind();
  };

  p.draw = () => {
    p.background("#00f");
    if (columnImage === null) {
      return;
    }
    columnImage.draw(p, imageOffset);
  };

  p.touchEnded = () => {
    const point = {
      x: Math.floor(p.mouseX - imageOffset.x),
      y: Math.floor(p.mouseY - imageOffset.y),
    };

    if (point.y < 0 || point.y > imageSize.height * pixelSize) {
      columnImage.selectedColumnIndex = null;
      return;
    }

    if (point.x < 0 || point.x > imageSize.width * pixelSize) {
      columnImage.selectedColumnIndex = null;
      return;
    }

    const index = Math.floor(point.x / pixelSize);
    columnImage.selectedColumnIndex = index;
  };

  p.keyPressed = () => {
    const selectedIndex = columnImage.selectedColumnIndex;

    if (selectedIndex === null) {
      return;
    }

    switch (p.keyCode) {
      case p.LEFT_ARROW:
        columnMoveEventSubject.next({
          selectedIndex: selectedIndex,
          direction: "left",
        });
        break;
      case p.RIGHT_ARROW:
        columnMoveEventSubject.next({
          selectedIndex: selectedIndex,
          direction: "right",
        });
        break;
      default:
        break;
    }
  };

  p.setImage = (imageData) => {
    columnImage = new ColumnImage(imageSize.width, imageSize.height, imageData);
  };
};

var dataIndices = _.range(encryptedImageList.length);

function createSketch(dataIndex) {
  const sketch = new p5(sketchImpl, "sketch-" + dataIndex);
  sketch.setImage(encryptedImageList[dataIndex]);
}

const sketches = _.map(dataIndices, createSketch);
