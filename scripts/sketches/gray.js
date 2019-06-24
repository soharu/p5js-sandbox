let originalImage;
let newImage;

function rgba(image, x, y) {
  return {
    r: image.pixels[(y * image.width + x) * 4],
    g: image.pixels[(y * image.width + x) * 4 + 1],
    b: image.pixels[(y * image.width + x) * 4 + 2],
    a: image.pixels[(y * image.width + x) * 4 + 3],
  }
}

function writeImage(srcImage, destImage, destOffset, generateColor) {
  for (let y = 0, offsetY = destOffset; y < srcImage.height; y += 1, offsetY += destImage.width) {
    for (let x = 0; x < srcImage.width; x += 1) {
      const color = generateColor(srcImage, x, y);
      destImage.pixels[(offsetY + x) * 4] = color.r;
      destImage.pixels[(offsetY + x) * 4 + 1] = color.g;
      destImage.pixels[(offsetY + x) * 4 + 2] = color.b;
      destImage.pixels[(offsetY + x) * 4 + 3] = color.a;
    }
  }
}

function preload() {
  originalImage = loadImage('https://avatars0.githubusercontent.com/u/1327853?s=460&v=4');
}

function setup() {
  newImage = createImage(originalImage.width * 2, originalImage.height * 2);
  createCanvas(newImage.width, newImage.height);

  originalImage.loadPixels();
  newImage.loadPixels();

  writeImage(originalImage, newImage, 0, (image, x, y) => {
    return rgba(image, x, y);
  });

  writeImage(originalImage, newImage, originalImage.width, (image, x, y) => {
    const values = rgba(image, x, y);
    const avg = (values.r + values.g + values.b) / 3;
    return {
      r: avg,
      g: avg,
      b: avg,
      a: values.a,
    }
  });

  writeImage(originalImage, newImage, newImage.width * originalImage.height, (image, x, y) => {
    const values = rgba(image, x, y);
    const avg = (values.r + values.g + values.b) / 3;
    const inverted = 255 - avg;
    return {
      r: inverted,
      g: inverted,
      b: inverted,
      a: values.a,
    }
  });

  writeImage(originalImage, newImage, (newImage.width * originalImage.height) + originalImage.width, (image, x, y) => {
    const values = rgba(image, x, y);
    const avg = (values.r + values.g + values.b) / 3;
    const bw = ( avg > 128) ? 255 : 0;
    return {
      r: bw,
      g: bw,
      b: bw,
      a: values.a,
    }
  });

  newImage.updatePixels();
  noLoop();
}

function draw() {
  background('#000');
  image(newImage, 0, 0);
}
