const Constants = require('../shared/constants');

class CommunityChest extends Location{
  constructor(position) {
    this.position = position;
    var f1 = {string: "Ay Caramba! You missed assembly. Lose $50",wealthImpact:-50};
    var f2 = {string: "Oh no! You accidentally slept in! Lose $50",wealthImpact:-50};
    var f3 = {string: "You gave a great tour today! Gain $50",wealthImpact:50};
    var f3 = {string: "You went to Open Table and served your community! Gain $50",wealthImpact:50};
    this.fortuneList = [f1,f2,f3,f4];
  }

  generateRandomFortune() {
    var fortuneNum = Math.random()*NUM_CHANCE_FORTUNES;
    return fortuneList[fortuneNum];
  }

  executeFortune(player){
    var fortune = generateRandomFortune();
    fortune.applyWealthImpact(player);
  }
}
