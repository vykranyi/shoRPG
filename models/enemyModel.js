export class Enemy {
  constructor({
    id,
    name = "Ворог",
    level = 1,
    damage = 1,
    health = 10,
    armor = 0,
  }) {
    this.id = id;
    this.name = name;
    this.level = level;
    this.damage = damage;
    this.health = health;
    this.armor = armor;
  }
}
