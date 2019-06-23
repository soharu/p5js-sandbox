let img;

function preload() {
  img = loadImage('https://avatars0.githubusercontent.com/u/1327853?s=460&v=4');
}

function setup() {
  createCanvas(img.width, img.height);

  img.loadPixels();
  const count = width * height * 4;
  for (let i = 0; i < count; i += 4) {
    const value = (img.pixels[i] + img.pixels[i + 1] + img.pixels[i + 2]) / 3;
    img.pixels[i] = value;
    img.pixels[i + 1] = value;
    img.pixels[i + 2] = value;
  }
  img.updatePixels();
  noLoop();
}

function draw() {
  background('#000');
  image(img, 0, 0);
}
