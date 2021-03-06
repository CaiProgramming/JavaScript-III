/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.

  Each constructor function has unique properties and methods that are defined in their block comments below:
*/

/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/

/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/

/*
 * Inheritance chain: GameObject -> CharacterStats -> Humanoid
 * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
 * Instances of CharacterStats should have all of the same properties as GameObject.
 */

// Test you work by un-commenting these 3 objects and the list of console logs below
"use strict";

function GameObject(createdAt, name, dimensions) {
  this.createdAt = createdAt;
  this.name = name;
  this.dimensions = dimensions;
  this.destroy = function() {
    return `${this.name} was removed from the game.`;
  };
}

function CharacterStats(createdAt, dimensions, healthPoints, name) {
  GameObject.call(this, createdAt, name, dimensions);
  this.healthPoints = healthPoints;
  this.takeDamage = function() {
    return `${this.name} took damage.`;
  };
  this.destroy = new GameObject().destroy;
}

function Humanoid(object, healthPoints, name, team, weapons, language) {
  CharacterStats.call(
    this,
    object.createdAt,
    object.dimensions,
    object.healthPoints,
    object.name
  );
  this.team = object.team;
  this.weapons = object.weapons;
  this.language = object.language;
  this.greet = function() {
    return `${this.name} offers a greeting in ${this.language}.`;
  };
  this.destroy = new CharacterStats().destroy;
  this.takeDamage = new CharacterStats().takeDamage;
}

const mage = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1
  },
  healthPoints: 5,
  name: "Bruce",
  team: "Mage Guild",
  weapons: ["Staff of Shamalama"],
  language: "Common Tongue"
});

const swordsman = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2
  },
  healthPoints: 15,
  name: "Sir Mustachio",
  team: "The Round Table",
  weapons: ["Giant Sword", "Shield"],
  language: "Common Tongue"
});

const archer = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4
  },
  healthPoints: 10,
  name: "Lilith",
  team: "Forest Kingdom",
  weapons: ["Bow", "Dagger"],
  language: "Elvish"
});

console.log(mage.createdAt); // Today's date
console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
console.log("\n" + swordsman.healthPoints + "\n"); // 15
console.log(mage.name + "\n"); // Bruce
console.log(swordsman.team + "\n"); // The Round Table
console.log(mage.weapons + "\n"); // Staff of Shamalama
console.log(archer.language + "\n"); // Elvish
console.log(archer.greet() + "\n"); // Lilith offers a greeting in Elvish.
console.log(mage.takeDamage() + "\n"); // Bruce took damage.
console.log(swordsman.destroy() + "\n" + "\n" + "\n" + "\n"); // Sir Mustachio was removed from the game.

// Stretch task:
// * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.
// * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
// * Create two new objects, one a villain and one a hero and fight it out with methods!

const Hero = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4
  },
  healthPoints: 25,
  name: "Hero",
  team: "Good guy",
  weapons: ["Bow", "Dagger"],
  language: "Elvish"
});

const Villan = new Humanoid({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4
  },
  healthPoints: 1000,
  name: "Villan",
  team: "bad guy",
  weapons: ["Dagger"],
  language: "common"
});

console.log(Hero.greet() + "\n");
console.log(Villan.greet() + "\n");

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

while (Villan.healthPoints > 0 || Hero.healthPoints > 0) {
  let herodamage = getRandomInt(50);
  let villandamage = getRandomInt(3);
  if (Villan.healthPoints <= 0) {
    break;
  }
  if (Hero.healthPoints <= 0) {
    break;
  }
  if (Hero.healthPoints >= 0) {
    if (herodamage === 0) {
      console.log(`Hero misses`);
    } else if (herodamage < 30) {
      console.log(Villan.takeDamage());
      console.log(`Hero deals ${herodamage} damage`);
    } else {
      console.log(Villan.takeDamage());
      console.log(`Hero lands a critical hit dealing ${herodamage} damage`);
    }
    console.log(`Villan's health is ${(Villan.healthPoints -= herodamage)}\n`);
  }
  if (Villan.healthPoints >= 0) {
    if (villandamage === 0) {
      console.log(`Villan misses`);
    } else {
      console.log(Hero.takeDamage());
      console.log(`Villan deals ${villandamage} damage`);
    }
    console.log(`Hero's health is ${(Hero.healthPoints -= villandamage)}\n`);
  }
}

if (Hero.healthPoints <= 0) {
  console.log(Hero.destroy());
}
if (Villan.healthPoints <= 0) {
  console.log(Villan.destroy());
}
