class Rules {
  constructor(species, boundary, radius) {
    this.species = species
    this.max = radius
    this.min = boundary
    console.log(this.min)
    console.log(this.max)
    this.rules = new Array(species)
    this.initialRules()
  }

  initialRules() {
    for(var i = 0; i < this.species; i++) {
      this.rules[i] = new Array(this.species)
      for(var j = 0; j < this.species; j++) {
        // set all the initial blobs as repellers
        this.rules[i][j] = this.repeller()
      }
    }
    // add a few chasers
    for (var k = 0; k < 13; k++) {
      this.chaser()
    }
  }

  chaser() {
    var a = getRandomInt(this.rules.length)
    var b = getRandomInt(this.rules.length)
    this.rules[a][b] = {
      min: this.min,
      max: this.max,
      repulsion: 0.1,
      attraction: 0.2,
    }
    this.rules[b][a] = {
      min: 20,
      max: 50,
      repulsion: 0.3,
      attraction: 0,
    }
  }

  repeller() {
    return {
      min: this.min,
      max: this.max,
      repulsion: Math.random() * 0.3,
      attraction: 0.0,
    }
  }

  attractor() {
    return {
      // min: Math.random() * 20 + 10,
      // max: Math.random() * 100,
      min: this.min,
      max: this.max,
      repulsion: Math.random() * 0.3,
      attraction: Math.random() * 0.03,
    }
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
