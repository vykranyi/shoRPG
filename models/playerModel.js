export class Player {
  constructor({ id, name, level = 1, exp = 0, inventory = [] }) {
    this.id = id;
    this.name = name;
    this.level = level;
    this.exp = exp;
    this.inventory = inventory;
  }
}
