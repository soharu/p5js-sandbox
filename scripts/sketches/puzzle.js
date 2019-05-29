const puzzle = (p) => {
  let img;
  const tileCount = 4;
  const tiles = new Array(tileCount * tileCount);
  const tileSize = 115;

  let space = tileCount * tileCount - 1;

  p.preload = () => {
    // img = p.loadImage('./images/haru.png');
    img = p.loadImage('https://avatars0.githubusercontent.com/u/1327853?s=460&v=4');
  }

  p.setup = () => {
    p.createCanvas(500, 500);

    for (let r = 0; r < 4; ++r) {
      for (let c = 0; c < 4; ++c) {
        let pos = r * tileCount + c;
        if (pos === tileCount * tileCount - 1) {
          tiles[pos] = {
            n: pos,
            isBlank: true
          };
        } else {
          tiles[pos] = {
            n: pos,
            isBlank: false,
            x: c * tileSize,
            y: r * tileSize,
            w: tileSize,
            h: tileSize
          };
        }
      }
    }
  };

  p.draw = () => {
    p.background('#ddd');

    p.translate(20, 20);
    p.fill('#bbb');
    p.noStroke();
    p.rect(0, 0, 460, 460);

    tiles.forEach((tile) => {
      if (tile.isBlank) { return; }
      // TODO: fix mapping
      p.image(img, tile.x, tile.y, tile.w, tile.h, tile.x, tile.y, tile.w, tile.h);
      p.noFill();
      p.stroke('#ddd');
      p.rect(tile.x, tile.y, tile.w, tile.h);
    });
  };

  p.keyPressed = () => {
    switch (p.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
        moveBlank(p.key);
        return false;
      default:
        return true;
    }
  };

  const calculatePosition = {
    'ArrowUp': (pos) => { return { r: pos.r - 1, c: pos.c } },
    'ArrowDown': (pos) => { return { r: pos.r + 1, c: pos.c } },
    'ArrowLeft': (pos) => { return { r: pos.r, c: pos.c - 1 } },
    'ArrowRight': (pos) => { return { r: pos.r, c: pos.c + 1 } }
  };

  function moveBlank(direction) {
    const blankIndex = tiles.findIndex((e) => { return e.isBlank });
    if (blankIndex === undefined) {
      return;
    }

    console.log(blankIndex);
    let pos = {
      r: Math.floor(blankIndex / tileCount),
      c: blankIndex % tileCount
    };

    switch (direction) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
        let newPos = calculatePosition[direction](pos);
        console.log(newPos);
        if (isValidPosition(newPos)) {
          swapTiles(pos, newPos);
        }
        return;
      default:
        return;
    }
  }

  function findBlank() {
    return tiles.find((e) => { return e.isBlank });
  }

  function isValidPosition(pos) {
    return (0 <= pos.r && pos.r < tileCount) && (0 <= pos.c && pos.c < tileCount);
  }

  function swapTiles(a, b) {
    const aIndex = a.r * tileCount + a.c;
    const bIndex = b.r * tileCount + b.c;
    let t = tiles[aIndex];
    tiles[aIndex] = tiles[bIndex];
    tiles[bIndex] = t;
    console.log(tiles);
  }
};

new p5(puzzle, 'puzzle');
