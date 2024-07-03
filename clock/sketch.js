function setup() {
  createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
  sinceLastSecond = 0;
  lastSecond = second();
  clockSpeed = 1;
  radius = width / 2;
}

function windowResized() {
  resizeCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight))
  radius = width / 2;
}

function getAngle(p1x, p1y, p2x, p2y) {
  let angle = acos((p2x - p1x) / dist(p1x, p1y, p2x, p2y))
  return (p1y - p2y < 0)? angle : -angle;
}

function addVectors(vec1, vec2) {
  let posx = vec1[0] * cos(vec1[1]) + vec2[0] * cos(vec2[1])
  let posy = vec1[0] * sin(vec1[1]) + vec2[0] * sin(vec2[1])
  return ([
    dist(0, 0, posx, posy),
    getAngle(0, 0, posx, posy)
  ])
}

function calculateVectorAndColor(xx, yy, gravPoints) {
  let vecList = [];
  let myColor = color(0, 0, 0);
  let currentTotalInfluence = 0;
  for (let i = 0; i < gravPoints.length; i += 1) {
    vecList.push([
      constrain(pow(dist(xx, yy, gravPoints[i][0], gravPoints[i][1]), -2.2) * gravPoints[i][2], 0, 1),
      getAngle(xx, yy, gravPoints[i][0], gravPoints[i][1])
    ]);
    currentTotalInfluence += vecList[i][0];
    myColor = lerpColor(myColor, gravPoints[i][3], vecList[i][0] / currentTotalInfluence);
  }
  function sumVectors(total, currentValue) {
    return addVectors(total, currentValue);
  }
  return ([vecList.reduce(sumVectors, [0, 0]), myColor]);
}

function draw() {
  background(255);
  if (lastSecond != second()) {
    lastSecond = second();
    sinceLastSecond = deltaTime;
  } else {
    sinceLastSecond += deltaTime;
  }
  let hourAngle = ((hour() % 12) + minute() / 60 + second() / 3600 + sinceLastSecond / 3600000) / 12 * clockSpeed * 2 * PI - PI / 2;
  let minuteAngle = (minute() + second() / 60 + sinceLastSecond / 60000) / 60 * clockSpeed * 2 * PI - PI / 2;
  let secondAngle = (second() + sinceLastSecond / 1000) / 60 * clockSpeed * 2 * PI - PI / 2;
  let gravPoints = [
    [cos(hourAngle) * radius + radius, sin(hourAngle) * radius + radius, 15000, color(255, 0, 0)],
    [cos(minuteAngle) * (radius * 3 / 4) + radius, sin(minuteAngle) * (radius * 3 / 4) + radius, 2000, color(0, 255, 0)],
    [cos(secondAngle) * (radius / 2) + radius, sin(secondAngle) * (radius / 2) + radius, 600, color(0, 0, 255)]
  ];
  for (let xx = 5; xx < radius * 2; xx += 5) {
    for (let yy = 5; yy < radius * 2; yy += 5) {
      if ((dist(radius, radius, xx, yy) < radius)) {
        let pointInfo = calculateVectorAndColor(xx, yy, gravPoints);
        let vec = pointInfo[0];
        stroke(pointInfo[1]);
        strokeWeight(vec[0]);
        line(xx, yy, xx + cos(vec[1]) * 3 * vec[0], yy + sin(vec[1]) * 3 * vec[0]);
      }
    }
  }
}
