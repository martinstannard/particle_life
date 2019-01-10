var blobs = new Array()
var colours = [0xFF3300, 0x33FF00, 0x0033FF, 0x3300FF]

class Blob extends PIXI.Graphics {
  constructor(stage, index) {
    super(stage)

    this.interactive = true
    this.on('pointerdown', onClick)
    this.index = index
    this.species = getRandomInt(4)

    this.x = Math.random() * 800
    this.y = Math.random() * 600
    this.min = Math.random() * 10 + 10
    this.max = Math.random() * 40 + 40
    this.draw()
    stage.addChild(this)
  }

  draw() {
    var neighbours = this.neighbours(this.max, blobs).length
    this.clear()
    this.beginFill(colours[this.species])
    this.circle = this.drawCircle(0, 0, 5)
    // this.circle = this.drawCircle(0, 0, 10 + neighbours * 2.0)
    this.endFill()
  }

  update(blobs) {
    var neighbours = this.neighbours(this.max, blobs)
    var l = neighbours.length
    for (var i = 0; i < l; i++) {
      b = neighbours[i]
      this.neighbourForce(b)
    }
    if (neighbours.length > 0) {
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

  neighbourForce(blob) {
    this.repulsion(blob)
    this.attraction(blob)
  }

  repulsion(blob) {
    if (blob.species !== this.species) {
      var angle = heading(this, blob)
      var dist = distance(this, blob)
      if (dist < this.min) {
        this.x = this.x + (Math.cos(angle) * repelForce(dist, this.min) * blob.species)
        this.y = this.y + (Math.sin(angle) * repelForce(dist, this.min) * blob.species)
      }
    }
  }

  attraction(blob){
    if (blob.species == 0) return
    if (blob.species !== this.species) {
      var angle = heading(this, blob)
      var dist = distance(this, blob)
      if (dist > this.min) {
        this.x = this.x - (Math.cos(angle) * 0.1 * blob.species)
        this.y = this.y - (Math.sin(angle) * 0.1 * blob.species)
      }
    }
  }
}

function onClick() {
  console.log("Click")
  console.log(this.x)
  console.log(this.y)
  console.log(this.neighbours(this.max, blobs))
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
  return calcAngle(xd, yd)
}

function calcAngle(x, y) {
  return Math.atan2(y, x)
}

function repelForce(blob_distance, repel_distance) {
  return (repel_distance - blob_distance) / repel_distance
}

function attractForce(blob, min, max) {
  var mid = ((max - min) / 2.0) + min
  if (blob < mid) {
    return (mid - blob) / mid
  } else {
    
  }

  return (_distance - blob_distance) / repel_distance
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

