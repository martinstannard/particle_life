var blobs = new Array()

class Blob extends PIXI.Graphics {
  constructor(stage, index) {
    super(stage)

    this.interactive = true
    this.on('pointerdown', onClick)
    this.index = index

    this.x = Math.random() * 800
    this.y = Math.random() * 600
    this.min = 20.0
    this.max = 100.0
    this.draw()
    stage.addChild(this)
  }

  draw() {
    var neighbours = this.neighbours(100, blobs).length
    this.clear()
    this.beginFill(0xFF3300)
    this.circle = this.drawCircle(0, 0, 10 + neighbours * 2.0)
    this.endFill()
  }

  update(dist, blobs) {
    var neighbours = (this.neighbours(dist, blobs)).length
    if (neighbours > 0) {
      this.jiggle()
      this.draw()
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
  console.log("Click")
  console.log(this.x)
  console.log(this.y)
  console.log(this.radius)
  console.log(this.neighbours(100, blobs))
}

function addBlobs(count, stage) {
  for (var i = 0; i < count; i++) {
    b = new Blob(stage, i)
    blobs.push(b)
  }
}

function neighbours(dist, a, blobs) {
  var n = new Array()
  var l = blobs.length
  for (var i = 0; i < l; i++) {
    b = blobs[i]
    if ((a !== b) && affects(dist, a, b)) {
      n.push(b)
    }
  }
  return n
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
  return calcAngleDegrees(xd, yd)
}

function calcAngle(x, y) {
  return Math.atan2(y, x)
}
