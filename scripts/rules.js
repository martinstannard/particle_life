class Rules {
  constructor(species) {
    this.species = species
    console.log(species)
    this.rules = new Array(species)
    this.initialRules()
    // this.buildRules()
  }

  buildRules() {
    for(var i = 0; i < this.species; i++) {
      this.rules[i] = {
        min: Math.random() * 50 + 5,
        max: Math.random() * 100,
        repulsion: Math.random() * 30,
        attraction: Math.random() * 10,
      }
    }
  }

  initialRules() {
    for(var i = 0; i < this.species; i++) {
      this.rules[i] = new Array(this.species)
      for(var j = 0; j < this.species; j++) {
        if (Math.random() < 0.5) {
          this.rules[i][j] = {
            min: Math.random() * 50 + 10,
            max: Math.random() * 100,
            repulsion: Math.random() * 30,
            attraction: Math.random() * 10,
          }
        } else {
          this.rules[i][j] = {
            min: Math.random() * 50 + 10,
            max: Math.random() * 100,
            repulsion: 0,
            attraction: 0,
          }
        }
      }
    }
  }
}
