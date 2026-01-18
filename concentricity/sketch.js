let img
let btn_download

function setup() {
  let btn_generate = createButton('generate (this may take a second)')
  btn_generate.mousePressed(generate)
}

function generate() {
  img = main()
  createCanvas(img.width, img.height)
  image(img, 0, 0)
  if (btn_download) {
    btn_download.remove()
  }
  btn_download = createButton('download')
  btn_download.mousePressed(download)
}

function download() {
  img.save(str("Concentricity"))
}

function main() {
  let img = createImage(800 + 200 * round(random() * 4) - 400, 800 + 200 * round(random() * 4) - 400);
  let hueMode = random()
  let huehuehue = random() * 100;
  let gap = 40;
  // set(50, 50, [255, 0, 0, 255]); 
  let circles = [];
  append(circles, new Circle(random() * img.width, random() * img.height, 15))
  for (let i = 0; i < 12; i++) {
    circles = append(circles, new Circle(circles[0].x, circles[0].y, (i + 1) * gap))
  }
  for (let i = 0; i < 6 + round(random() * 14); i++) {
    circles = append(circles, new Circle(random() * img.width, random() * img.height, gap * random() + 5))
  }
  noFill();
  let mode = random()
  if (mode < 0.6) {
    colorMode(HSL, 100);
  } else if (mode < 0.9) {
    colorMode(HSB, 100);
  } else {
    colorMode(RGB, 100);
  }
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let smallDist = img.width
      for (let circ of circles) {
        let d = dist(circ.x, circ.y, x, y) - circ.radius;
        if (d < 0) {
          continue;
        }
        smallDist = min(smallDist, d);
      }
      let variationSD = 30;
      let medium = 60
      let decayCoefficient = 1.0 + 0.2 * random();
      let b = medium - (variationSD * (smallDist / (gap * decayCoefficient)));
      b = max(b, lerp(b, 0, 0.65));
      let variationNoise = 30;
      b -= variationNoise * random() - variationNoise / 2;
      let variationBD = 60;
      let bigDist = dist(circles[0].x, circles[0].y, x, y);
      b += variationBD * (bigDist / img.width);
      let c;
      if (hueMode < 0.1) {
        huehuehue = random() * 100;
      } else if (hueMode < 0.2) {
        c = color(min(90, b), huehuehue, 60);
      } else if (hueMode < 0.3) {
        c = color(min(90, b), 60, huehuehue);
      } else {
        c = color(huehuehue, 60, min(90, b));
      }
      img.set(x, y, c); 
    }
  }
  img.updatePixels();
  return img;
}

class Circle {
  constructor(x, y, r) {
    this.x = x
    this.y = y
    this.radius = r
  }
}