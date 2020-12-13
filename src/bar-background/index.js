const stickPath = `M407,76H105C47.109,76,0,123.109,0,181v150c0,57.891,47.109,105,105,105h302c57.891,0,105-47.109,105-105V181
C512,123.109,464.891,76,407,76z`;
const Background = function ({
  canvas,
  colors = ['white', 'red', 'yellow', 'green', 'blue', 'pink'],
  bgcolor,
  scale = 1,
  speed = 1,
  sctickCountFactor = 3,
  fps = 60,
  offset = 300,
}) {
  const cxt = canvas.getContext('2d');
  if (!cxt || !(cxt instanceof CanvasRenderingContext2D)) {
    throw new Error('Invalid canvas provided');
  }
  this.cv = canvas;
  this.cxt = cxt;
  this.speed = speed;
  this.colors = colors;
  this.bgcolor = bgcolor;
  this.scale = scale;
  this.sctickCountFactor = sctickCountFactor;
  this.w = this.cv.width;
  this.h = this.cv.height;
  this.unit = fps / 60;
  this.nextFrame = 0;
  this.offset = offset;
};
Background.prototype.init = function () {
  this.sticksCount = Math.round(
    (this.sctickCountFactor / 100) * this.offset * 9,
  );
  const positions = Array(this.sticksCount)
    .fill()
    .map(
      () =>
        new Position({
          ...this.getRandomPositionAndSpeed(
            -this.offset,
            -this.offset,
            this.scale,
            this.w + this.offset * 2,
            this.h + this.offset * 2,
            -this.speed,
            +this.speed,
          ),
          angle: -Math.PI / 4,
          brightnessFactor: this.scale,
        }),
    );
  positions.sort((p1, p2) => (p1.z < p2.z ? -1 : 1));
  this.positions = positions;
  this.sticks = positions.map(
    (position) =>
      new Stick({
        color: this.colors[
          Math.max(
            0,
            Math.min(
              this.colors.length - 1,
              Math.floor(Math.random() * this.colors.length),
            ),
          )
        ],
        position,
      }),
  );
};
Background.prototype.getRandomPositionAndSpeed = function (
  x,
  y,
  z,
  width,
  height,
  speedX,
  speedY,
) {
  const speedMulti = 0.5 + Math.random() * 0.5;
  const zMulti = 0.1 + Math.random() * 0.9;

  return {
    x: x + Math.random() * width,
    y: y + Math.random() * height,
    z: z * zMulti,
    speedX: speedX * speedMulti,
    speedY: speedY * speedMulti,
    directionX: Math.random() > 0.5 ? 1 : -1,
    directionY: Math.random() > 0.5 ? 1 : -1,
  };
};
Background.prototype.draw = function () {
  this.init();
  requestAnimationFrame(() => this.loop());
};
Background.prototype.loop = function () {
  this.sticks.forEach((stick) =>
    stick.position.update(this.w, this.h, this.offset),
  );
  this.nextFrame += this.unit;
  if (this.nextFrame >= 1) {
    this.nextFrame -= 1;
    this.cxt.clearRect(0, 0, this.w, this.h);
    if (this.bgcolor) {
      this.cxt.fillStyle = this.bgcolor;
      this.cxt.fillRect(0, 0, this.w, this.h);
    }
    this.sticks.forEach((stick) => {
      this.cxt.save();
      stick.draw(this.cxt);
    });
  }
  requestAnimationFrame(() => this.loop());
};
Background.prototype.shift = function (deltaX, deltaY, minmax) {
  minmax = Math.abs(minmax);
  this.positions.forEach((position) => {
    position.deltaX = Math.min(
      Math.max(deltaX + position.deltaX, -minmax),
      minmax,
    );
    position.deltaY = Math.min(
      Math.max(deltaY + position.deltaY, -minmax),
      minmax,
    );
  });
};
const Position = function ({
  x,
  y,
  z,
  speedX,
  speedY,
  angle,
  brightnessFactor = 1,
  directionX = 1,
  directionY = 1,
}) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.speedX = speedX;
  this.speedY = speedY;
  this.angle = angle;
  this.deltaX = 0;
  this.deltaY = 0;
  this.brightness = 0.2 + 0.8 * normalize(this.z, 1 / brightnessFactor);
  this.shiftAnimationId = null;
  this.directionX = directionX;
  this.directionY = directionY;
};
Position.prototype.update = function (width, height, offset) {
  this.deltaX += this.speedX * 0.5 * this.directionX;
  this.deltaY += this.speedY * 0.5 * this.directionY;
  const stepX = this.deltaX * 0.07 * normalize(this.z, 5);
  const stepY = this.deltaY * 0.07 * normalize(this.z, 5);
  this.deltaX -= stepX;
  this.deltaY -= stepY;
  this.x += stepX;
  this.y += stepY;
  this.x += this.speedX;
  this.y += this.speedY;
  if (this.x < -offset) {
    this.x = width + offset;
  } else if (this.x > width + offset) {
    this.x = -offset;
  }
  if (this.y < -offset) {
    this.y = height + offset;
  } else if (this.y > height + offset) {
    this.y = -offset;
  }
};
Position.prototype.apply = function (context) {
  context.translate(this.x, this.y);
  context.rotate(this.angle);
  context.scale(this.z, this.z);
  //context.globalAlpha = this.brightness;
};
const Stick = function ({ color, position }) {
  this.color = color;
  this.x = color;
  this.position = position;
  this.path = new Path2D(stickPath);
};
Stick.prototype.draw = function (context) {
  context.fillStyle = this.color;
  this.position.apply(context);
  context.fill(this.path);
  context.restore();
};

function normalize(x, factor) {
  const e = Math.E;
  const p = Math.pow;
  return Math.abs((1 - p(e, factor * x)) / (1 + p(e, factor * x)));
}

export default Background;
