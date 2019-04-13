var colours = [0xFF3300, 0x33FF00, 0x0033FF, 0xFF00FF, 0x00FFFF, 0xFFFF00, 0xFFFFFF, 0xFF8800,
	0x88FF00, 0x0088FF, 0x4488FF, 0x8844FF, 0xFF4488, 0xFF8844, 0x44FF88, 0x88FF44,
        0xFF0000, 0x00FF00, 0x0000FF, 0xCCCCCC]

class Blob extends PIXI.Graphics {
  constructor(params, app, rules) {
    super(app.stage)

    this.species = getRandomInt(params.species)
    this.rules = rules.rules[this.species]

    this.x = Math.random() * app.view.width
    this.y = Math.random() * app.view.height
    this.vx = 0.0
    this.vy = 0.0
    this.neighbourRadius = params.radius
    this.maxX = app.view.width 
    this.maxY = app.view.height
    this.radius = 5.0
    this.decay = params.decay

    this.interactive = true
    this.on('pointerdown', onClick)

    this.create()
    app.stage.addChild(this)
  }

  update(blobs) {
    this.calculateForces()
    this.animate()
  }

  calculateForces() {
    var neighbours = this.neighbours()
    for (var i = 0; i < neighbours.length; i++) {
      this.neighbourForce(neighbours[i])
    }
  }

  neighbourForce(blob) {
    this.repulse(blob)
    this.attract(blob)
  }

  animate() {
    this.x = this.x + this.vx
    this.y = this.y + this.vy
    if(this.x > this.maxX) { this.x -= this.maxX }
    if(this.x < 0.0) { this.x += this.maxX }
    if(this.y > this.maxY) { this.y -= this.maxY }
    if(this.y < 0.0) { this.y += this.maxY }
    this.vy = this.vy * this.decay
    this.vx = this.vx * this.decay
  }

  create() {
    this.clear()
    this.beginFill(colours[this.species])
    this.circle = this.drawCircle(0, 0, this.radius)
    this.endFill()
  }

  repulse(blob) {
    var repulsion = this.rules[blob.species].repulsion
    var angle = heading(this, blob)
    var dist = distance(this, blob)
    if (dist < this.rules[blob.species].min) {
      this.vx = this.vx + (Math.cos(angle) * repulsion)
      this.vy = this.vy + (Math.sin(angle) * repulsion)
    }
  }

  attract(blob){
    var attraction = this.rules[blob.species].attraction
    var angle = heading(this, blob)
    var dist = distance(this, blob)
    if (dist > this.rules[blob.species].min) {
      this.vx = this.vx - (Math.cos(angle) * attraction)
      this.vy = this.vy - (Math.sin(angle) * attraction)
    }
   }

  neighbours() {
    var n = new Array()
    var l = blobs.length
    for (var i = 0; i < l; i++) {
      b = blobs[i]
      if ((this !== b) && affects(this.neighbourRadius, this, b)) {
        n.push(b)
      }
    }
    return n
  }
}

function onClick() {
  console.log(this.species)
  console.log(this.rules)
  console.log(this.vx)
  console.log(this.vy)
  console.log(this.neighbours(this.max, blobs).length)
}

function addBlobs(params, app, rules) {
  for (var i = 0; i < params.population; i++) {
    b = new Blob(params, app, rules)
    blobs.push(b)
  }
}

function affects(dist, a, b) {
  return dist > distance(a, b)
}

function distance(a, b) {
  xd = a.x - b.x
  yd = a.y - b.y
  return Math.sqrt(xd * xd + yd * yd)
}

function heading(a, b) {
  xd = a.x - b.x
  yd = a.y - b.y
  return calcAngle(xd, yd)
}

function calcAngle(x, y) {
  return Math.atan2(y, x)
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

