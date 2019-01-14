var blobs = new Array()
var colours = [0xFF3300, 0x33FF00, 0x0033FF, 0xFF00FF, 0x00FFFF, 0xFFFF00]

class Blob extends PIXI.Graphics {
  constructor(species, stage, rules) {
    super(stage)

    this.interactive = true
    this.on('pointerdown', onClick)
    this.species = getRandomInt(species)
    this.rules = rules.rules[this.species]

    this.x = Math.random() * 1024
    this.y = Math.random() * 1024
    this.vx = 0.0
    this.vy = 0.0
    this.max = 100
    this.maxX = stage.width
    this.maxY = stage.height
    this.draw()
    stage.addChild(this)
  }

  update(blobs) {
    var neighbours = this.neighbours(this.max, blobs)
    var l = neighbours.length
    for (var i = 0; i < l; i++) {
      b = neighbours[i]
      this.neighbourForce(b)
    }
    this.animate()
    // if (neighbours.length > 0) {
    //   this.draw()
    // }
  }

  animate() {
    if(this.vx > 1.0) { this.vx = 1.0 }
    if(this.vy > 1.0) { this.vy = 1.0 }
    if(this.vx < -1.0) { this.vx = -1.0 }
    if(this.vy < -1.0) { this.vy = -1.0 }
    this.x = this.x + this.vx
    this.y = this.y + this.vy
    if(this.x > this.maxX - 5.0) { this.x = this.maxX - 5.0 }
    if(this.x < 5.0) { this.x = 5.0 }
    if(this.y > this.maxY - 5.0) { this.y = this.maxY - 5.0}
    if(this.y < 5.0) { this.y = 5.0 }
    this.vy = this.vy * 0.9
    this.vx = this.vx * 0.9
  }

  draw() {
    var neighbours = this.neighbours(this.max, blobs).length
    this.clear()
    this.beginFill(colours[this.species])
    this.circle = this.drawCircle(0, 0, 5)
    this.endFill()
  }

  neighbourForce(blob) {
    this.repulse(blob)
    this.attract(blob)
  }

  repulse(blob) {
    var repulsion = this.rules[blob.species].repulsion
    var angle = heading(this, blob)
    var dist = distance(this, blob)
    if (dist < this.rules[blob.species].min) {
      // this.x = this.x + (Math.cos(angle) * 1 * repulsion)
      // this.y = this.y + (Math.sin(angle) * 1 * repulsion)
      this.vx = this.vx + (Math.cos(angle) * repulsion)
      this.vy = this.vy + (Math.sin(angle) * repulsion)
    }
  }

  attract(blob){
    var attraction = this.rules[blob.species].attraction
    var angle = heading(this, blob)
    var dist = distance(this, blob)
    if (dist > this.rules[blob.species].min) {
      // this.x = this.x - (Math.cos(angle) * 1 * attraction)
      // this.y = this.y - (Math.sin(angle) * 1 * attraction)
      this.vx = this.vx - (Math.cos(angle) * attraction)
      this.vy = this.vy - (Math.sin(angle) *attraction)
    }
   }

  neighbours(dist, blobs) {
    var n = new Array()
    var l = blobs.length
    for (var i = 0; i < l; i++) {
      b = blobs[i]
      if ((this !== b) && affects(dist, this, b)) {
        n.push(b)
      }
    }
    return n
  }

  jiggle() {
    this.x = this.x + (Math.random() - 0.5) * 2.0
    this.y = this.y + (Math.random() - 0.5) * 2.0
  }

}

function onClick() {
  console.log(this.species)
  console.log(this.rules)
  console.log(this.vx)
  console.log(this.vy)
  console.log(this.neighbours(this.max, blobs).length)
}

function addBlobs(pop, species, stage, rules) {
  for (var i = 0; i < pop; i++) {
    b = new Blob(species, stage, rules)
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

