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
    for (var k = 0; k < this.species; k++) {
      this.cluster(k)
    }
    for (var k = 0; k < this.species; k++) {
      this.chaser(k)
    }
  }

  cluster(species) {
    this.rules[species][species] = {
      min: this.min,
      max: this.max,
      repulsion: 0.4,
      attraction: 0.2,
    }
  }
  chaser(pursuer) {
    var a = getRandomInt(this.rules.length)
    var b = getRandomInt(this.rules.length)
    this.rules[pursuer][b] = {
      min: this.min,
      max: this.max,
      repulsion: 0.0,
      attraction: 0.3,
    }
    this.rules[b][pursuer] = {
      min: this.min,
      max: this.max,
      repulsion: 0.3,
      attraction: 0.0,
    }
  }

  repeller() {
    return {
      min: this.min,
      max: this.max,
      repulsion: 0.3,
      attraction: 0.0,
    }
  }

  attractor() {
    return {
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
