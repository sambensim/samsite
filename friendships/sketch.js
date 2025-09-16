let boidList = [];
let border = 0;
// let slider;

function setup() {
  createCanvas(windowWidth, windowHeight);

  boidCount = 600;

  for (let i = 0; i < boidCount; i++) {
    boidList.push(new boid(createVector(random() * width, random() * height), createVector(random() * 2 * PI - PI, random() * 2 * PI - PI), 1));
  }
  // slider = createSlider(0, 255);
  // slider.position(10, 10);
  // slider.size(width - 20);
  background(50, 50, 50);
}

// windowResized = function() {
//   background(50, 50, 50);
//   resizeCanvas(windowWidth, windowHeight);
// }

class boid {
  constructor(position, direction, speed = 1) {
    this.position = position;
    this.direction = direction.normalize();
    this.vel = speed;
    this.sightRadius = 64;
  }

  step() {
    let dir = this.direction.normalize();
    this.position.add(p5.Vector.mult(dir, this.vel));
    // this.sightAngle = PI/3 * 2//PI/3 * 2
    // if (this.position.x < -border) {
    //   this.position.x = width + border;
    // } else if (this.position.x > width + border) {
    //   this.position.x = -border;
    // }
    // if (this.position.y < -border) {
    //   this.position.y = height + border;
    // } else if (this.position.y > height + border) {
    //   this.position.y = -border;
    // }
    this.position.x = (this.position.x + width) % width;
    this.position.y = (this.position.y + height) % height;
  }

  scan(boidList) {
    stroke(255, 255, 255, 8);
    boidList.forEach((friend) => {
      if (this.position.dist(friend.position) < this.sightRadius
      // && friend.position.x < this.position.x //x comparison makes only one boid draw
    ){ 
      // if (this.position.dist(friend.position) < this.sightRadius * 2
      // && abs(this.direction.angleBetween(p5.Vector.sub(friend.position, this.position))) < 0.5) {
        line(this.position.x, this.position.y, friend.position.x, friend.position.y);
        this.direction = p5.Vector.lerp(this.direction, friend.position.cross(this.direction).normalize(), 0.004 * this.vel);
        // this.direction = p5.Vector.lerp(this.direction, friend.direction, 0.004 * this.vel);
      }
    });
  }

  draw() {
    // let pos = this.position,
      // dir = this.direction;
    stroke(255, 255, 255, 255);
    fill(255, 255, 255, 255);
    circle(this.position.x, this.position.y, 1);
    //line(pos.x, pos.y, pos.x + dir.x * 8, pos.y + dir.y * 8);
    stroke(255, 255, 255, 40);
    fill(255, 255, 255, 40);
    //arc(pos.x, pos.y, this.sightRadius * 2, this.sightRadius * 2,
    //  dir.heading() - 0.5 * this.sightAngle,
    //  dir.heading() + 0.5 * this.sightAngle,
    //  PIE
    //);
  }
}

function draw() {
  background(40, 40, 40, 15);
  // background(40, 40, 40, 255);
  for (let i = 0; i < boidCount; i++) {
    // boidList[i].vel = 1;//slider.value() / 255 * 5;
    boidList[i].scan(boidList);
    boidList[i].step();
    // boidList[i].draw();
  }
}
