function setup() {
  WIDTH = windowWidth;
  HEIGHT = windowHeight;
  createCanvas(WIDTH, HEIGHT);
  // noiseDetail(8, 0.5);
}

let slowCount;
let medCount;

function draw() {
  slowCount = frameCount / 200;
  medCount = slowCount * 30;
  background(255);
  // seeup(10);
  // sqas(10)
  squares(50);
  sircles(60);
  // noLoop();
  // stroke(0)
  // strokeWeight(1)
  // fill(237, 186, 3)
  // textAlign(CENTER, CENTER)
  // textSize(100);
  // text("ACM", windowWidth / 2, windowHeight / 2)
}

function squares(side) {
  noStroke();
  for (let x = 0; x <= WIDTH + 100 * side; x += side) {
    for (let y = 0; y < HEIGHT; y += side) {
      let n = 150 * noise(x - ((medCount / 100) % side), y, slowCount) - 50;
      fill(color(80, 150 + n, 0));
      square(
        x - (medCount % (side * 100)) + n / 100,
        y + n / 10,
        (side / 5) * 4
      );
    }
  }
}

function sqas(side) {
  noStroke();
  for (let x = 0; x <= WIDTH; x += side) {
    for (let y = 0; y < HEIGHT; y += side) {
      b = (noise(x) * 255 + side * medCount - y) % 255;
      fill(color(b));
      circle(x, y, side);
    }
  }
}

function seeup(side) {
  noStroke();
  for (let x = 0; x <= WIDTH; x += side) {
    for (let y = 0; y < HEIGHT; y += side) {
      r = round(255 * abs(sin(medCount / 19)));
      fill(
        r,
        255 * noise(y, slowCount, slowCount),
        255 * noise(x, y, slowCount),
        30
      );
      circle(
        WIDTH / 2 + 300 * tan(x + medCount + slowCount / 10),
        height / 2 + ((300 * (y + slowCount)) % 600) - 300,
        10
      );
    }
  }
}

function sircles(space) {
  noStroke();
  for (let x = 0; x < WIDTH + 100 * space; x += space) {
    for (let y = 0; y < HEIGHT; y += 180) {
      let n = 150 * noise(x, y, slowCount) - 50;
      if (n < 0) {
        fill(color(100, 100, 100, 200));
        r = (space * sqrt(-n)) / 6;
        circle(
          x - (medCount % (space * 100)) + n / 100 + r / 3,
          y + n / 10 + r / 3,
          pow(r, 0.85)
        );
        fill(color(255, 200, 0));
        circle(x - (medCount % (space * 100)) + n / 100, y + n / 10, r);
      }
    }
  }
}
