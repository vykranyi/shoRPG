import { getOrCreatePlayer, getPlayerInfo } from "../services/playerService.js";

export const playerHandler = async (ctx) => {
  const userId = ctx.from.id;
  const userName = ctx.from.first_name;
  const player = await getOrCreatePlayer(userId, userName);
  ctx.reply(getPlayerInfo(player));
};
