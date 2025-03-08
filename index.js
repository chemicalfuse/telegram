import { Telegraf, Markup } from "telegraf";
import { format } from "date-fns";
//initialize the telegram bot with your bot token from BotFather
const bot = new Telegraf("7046270789:AAFxEmd_Ph-gq7GH81-X04tvM5fzXKxVEOQ");
// -----------------
// Utility functions
// -----------------
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const getCurrentDateTime = () => {
  const getCurrentDate = new Date();
  return format(getCurrentDate, "yyyy-MM-dd HH:mm:ss");
};
const getCoinSide = () => (getRandomInt(0, 1) === 0 ? "Heads" : "Tails");
const coinInlineKeyboard = Markup.inlineKeyboard([
  Markup.button.callback("Flip again", "flip_a_coin"),
]);

bot.action("flip_a_coin", async (ctx) => {
  await ctx.editMessageText(
    `${getCoinSide()}\nEdited: ${getCurrentDateTime()}`,
    coinInlineKeyboard
  );
});
bot.hears("Flip a coin", (ctx) => ctx.reply(getCoinSide(), coinInlineKeyboard));

const replyKeyboard = Markup.keyboard([["Flip a coin"]]);
bot.use(async (ctx) => {
  await ctx.reply("what do we do?", replyKeyboard);
});
console.log("Bot is ready");
bot.launch();
process.once("SIGNIT", () => bot.stop("SIGNIT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
