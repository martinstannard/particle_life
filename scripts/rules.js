class Rules {
  constructor(species) {
    this.species = species
    this.rules = new Array(species)
    this.initialRules()
  }

  initialRules() {
    for(var i = 0; i < this.species; i++) {
      this.rules[i] = new Array(this.species)
      for(var j = 0; j < this.species; j++) {
        // this.rules[i][j] = {
        //   min: Math.random() * 20 + 10,
        //   max: Math.random() * 100,
        //   repulsion: 0.2,
        //   attraction: 0,
        // }
        if (Math.random() < 0.3) {
          this.rules[i][j] = {
            min: Math.random() * 20 + 10,
            max: Math.random() * 100,
            repulsion: Math.random() * 0.3,
            attraction: Math.random() * 0.03,
          }
        } else {
          this.rules[i][j] = {
            min: Math.random() * 50 + 10,
            max: Math.random() * 100,
            repulsion: Math.random() * 0.5,
            attraction: 0,
          }
        }
      }
    }
    // for (var k = 0; k < 6; k++) {
    //   this.chaser()
    // }
  }

  chaser() {
    var a = getRandomInt(this.rules.length)
    var b = getRandomInt(this.rules.length)
    this.rules[a][b] = {
      min: 20,
      max: 50,
      repulsion: 0,
      attraction: 0.1,
    }
    this.rules[b][a] = {
      min: 20,
      max: 50,
      repulsion: 0.3,
      attraction: 0,
    }
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
