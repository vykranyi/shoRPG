import { Enemy } from "../models/enemyModel.js";

// Приклад генерації випадкової ситуації
function getRandomSituation() {
  const situations = [
    "Ви опинилися у темному лісі, де чути дивні звуки...",
    "Перед вами покинута вежа, з якої лунає світло...",
    "Ви натрапили на старий міст через бурхливу річку...",
    "На шляху з'явився туман і ви чуєте кроки позаду...",
  ];
  return situations[Math.floor(Math.random() * situations.length)];
}

// Генерація ворогів для події
function generateEnemies() {
  // Для прикладу створимо 2 ворогів з випадковими статами
  const enemies = [
    new Enemy({
      id: 1,
      name: "Гоблін",
      level: Math.floor(Math.random() * 3) + 1,
      damage: Math.floor(Math.random() * 3) + 1,
      health: Math.floor(Math.random() * 10) + 10,
      armor: Math.floor(Math.random() * 2),
    }),
    new Enemy({
      id: 2,
      name: "Вовк",
      level: Math.floor(Math.random() * 3) + 1,
      damage: Math.floor(Math.random() * 4) + 2,
      health: Math.floor(Math.random() * 8) + 8,
      armor: Math.floor(Math.random() * 2),
    }),
  ];
  return enemies;
}

export const actionHandler = async (ctx) => {
  // Збираємо учасників (для прикладу лише поточний користувач)
  const usernames = [
    ctx.from.username ? `@${ctx.from.username}` : ctx.from.first_name,
  ];
  // Можна розширити для групових пригод

  const situation = getRandomSituation();
  const enemies = generateEnemies();

  let message = `\u26A0\uFE0F Увага! ${usernames.join(
    " та "
  )} потрапили в пригоду!\n\n`;
  message += `\uD83D\uDCDD Ситуація:\n${situation}\n\n`;
  message += `\uD83D\uDC7E Вороги:\n`;
  enemies.forEach((enemy, idx) => {
    message += `#${idx + 1} ${enemy.name} (Рівень: ${enemy.level}, Шкода: ${
      enemy.damage
    }, Здоров'я: ${enemy.health}, Армор: ${enemy.armor})\n`;
  });

  ctx.reply(message, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "\u2694\uFE0F У бій", callback_data: "fight" },
          { text: "\uD83C\uDFC3 Втеча", callback_data: "run" },
        ],
      ],
    },
  });
};
