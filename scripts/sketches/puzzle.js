const puzzle = (p) => {
  let img;
  const tileGrid = { r: 4, c: 4 };
  const tiles = new Array(tileGrid.r * tileGrid.c);
  let tileImageSize;
  const padding = 20;

  const indexFromPosition = (pos) => {
    return pos.r * tileGrid.c + pos.c;
  }

  const positionFromIndex = (index) => {
    return {
      r: Math.floor(index / tileGrid.c),
      c: index % tileGrid.c
    };
  }

  const calculatePosition = {
    'ArrowDown': (pos) => { return { r: pos.r - 1, c: pos.c } },
    'ArrowUp': (pos) => { return { r: pos.r + 1, c: pos.c } },
    'ArrowRight': (pos) => { return { r: pos.r, c: pos.c - 1 } },
    'ArrowLeft': (pos) => { return { r: pos.r, c: pos.c + 1 } }
  };

  p.preload = () => {
    img = p.loadImage('https://avatars0.githubusercontent.com/u/1327853?s=460&v=4');
  }

  p.setup = () => {
    p.createCanvas(img.width + padding * 2, img.height + padding * 2);
    setUpTiles();
  };

  p.draw = () => {
    p.background('#ddd');

    p.translate(padding, padding);
    p.fill('#bbb');
    p.noStroke();
    p.rect(0, 0, 460, 460);

    tiles.forEach((tile, index) => {
      if (tile.isBlank) { return; }
      const pos = positionFromIndex(index);
      const x = pos.c * tileImageSize.w;
      const y = pos.r * tileImageSize.h;
      p.image(img, x, y, tileImageSize.w, tileImageSize.h, tile.imgX, tile.imgY, tileImageSize.w, tileImageSize.h);
      p.noFill();
      p.stroke('#ddd');
      p.rect(x, y, tileImageSize.w, tileImageSize.h);
    });
  };

  p.keyPressed = () => {
    const f = calculatePosition[p.key];
    if (f !== undefined) {
      moveBlank(f);
      return false;
    }
    return true;
  };

  function setUpTiles() {
    tileImageSize = {
      w: Math.floor(img.width / tileGrid.c),
      h: Math.floor(img.width / tileGrid.r)
    };

    for (let i = 0; i < tiles.length; ++i) {
      const pos = positionFromIndex(i);
      tiles[i] = {
        n: i,
        isBlank: i === tiles.length - 1,
        imgX: pos.c * tileImageSize.w,
        imgY: pos.r * tileImageSize.h
      };
    }
  }

  function moveBlank(calculateFunction) {
    const blankIndex = tiles.findIndex((e) => { return e.isBlank });
    if (blankIndex === undefined) {
      return;
    }

    const pos = positionFromIndex(blankIndex);
    let newPos = calculateFunction(pos);
    if (isValidPosition(newPos)) {
      swapTiles(pos, newPos);
    }
  }

  function isValidPosition(pos) {
    return (0 <= pos.r && pos.r < tileGrid.r) && (0 <= pos.c && pos.c < tileGrid.c);
  }

  function swapTiles(a, b) {
    const aIndex = indexFromPosition(a);
    const bIndex = indexFromPosition(b);
    let t = tiles[aIndex];
    tiles[aIndex] = tiles[bIndex];
    tiles[bIndex] = t;
  }
};

new p5(puzzle, 'puzzle');
