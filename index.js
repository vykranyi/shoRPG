// bot.js
import { Telegraf, Markup } from "telegraf";
import dotenv from "dotenv";
import { initDb } from "./database/initDb.js";

import { playerHandler } from "./handlers/playerHandler.js";
import { actionHandler } from "./handlers/actionHandler.js";

// 📦 Завантаження .env
dotenv.config();

if (!process.env.BOT_TOKEN) {
  throw new Error("BOT_TOKEN не заданий у .env");
}

async function startBot() {
  await initDb();
  const bot = new Telegraf(process.env.BOT_TOKEN);

  bot.command("player", playerHandler);
  bot.command("action", actionHandler);

  // 🛑 Graceful shutdown
  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));

  await bot.launch();
}

startBot();
