var blobs = new Array()
var colours = [0xFF3300, 0x33FF00, 0x0033FF, 0xFF00FF, 0x00FFFF, 0xFFFF00]

class Blob extends PIXI.Graphics {
  constructor(stage, rules) {
    super(stage)

    this.interactive = true
    this.on('pointerdown', onClick)
    this.species = getRandomInt(6)
    this.rules = rules.rules[this.species]

    this.x = Math.random() * 800
    this.y = Math.random() * 600
    this.max = 100
    // this.min = this.rules.min
    // this.max = this.rules.max
    // this.repulsion = this.rules.repulsion
    // this.attraction = this.rules.attraction
    this.draw()
    stage.addChild(this)
  }

  draw() {
    var neighbours = this.neighbours(this.max, blobs).length
    this.clear()
    this.beginFill(colours[this.species])
    this.circle = this.drawCircle(0, 0, 5)
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
    this.repulse(blob)
    this.attract(blob)
  }

  repulse(blob) {
    var repulsion = this.rules[blob.species].repulsion
    var angle = heading(this, blob)
    var dist = distance(this, blob)
    if (dist < this.rules[blob.species].min) {
      this.x = this.x + (Math.cos(angle) * 0.1 * repulsion)
      this.y = this.y + (Math.sin(angle) * 0.1 * repulsion)
    }
  }

  attract(blob){
    var attraction = this.rules[blob.species].attraction
    var angle = heading(this, blob)
    var dist = distance(this, blob)
    if (dist > this.rules[blob.species].min) {
      this.x = this.x - (Math.cos(angle) * 0.1 * attraction)
      this.y = this.y - (Math.sin(angle) * 0.1 * attraction)
    }
   }
}

function onClick() {
  console.log(this.species)
  console.log(this.rules)
  console.log(this.neighbours(this.max, blobs).length)
}

function addBlobs(count, stage, rules) {
  for (var i = 0; i < count; i++) {
    b = new Blob(stage, rules)
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

