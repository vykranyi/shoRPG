import { db } from "../database/initDb.js";
import { Player } from "../models/playerModel.js";

export async function getOrCreatePlayer(id, name) {
  let row = await db.get("SELECT * FROM players WHERE id = ?", id);
  if (!row) {
    await db.run("INSERT INTO players (id, name) VALUES (?, ?)", id, name);
    row = await db.get("SELECT * FROM players WHERE id = ?", id);
  }
  return new Player({
    id: row.id,
    name: row.name,
    level: row.level,
    exp: row.exp,
    inventory: JSON.parse(row.inventory),
  });
}

export function getPlayerInfo(player) {
  return `👤 Гравець: ${player.name}\n🔢 Рівень: ${player.level}\n⭐ Досвід: ${
    player.exp
  }\n🎒 Інвентар: ${player.inventory.join(", ") || "порожній"}`;
}
