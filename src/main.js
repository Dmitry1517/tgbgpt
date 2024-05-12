import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import config from "config";
import fetch from "node-fetch";

const bot = new Telegraf(config.get("TELEGRAM_TOKEN"));

bot.start(async (ctx) => {
  await ctx.reply("Привет, друг! Добро пожаловать на общение с chatGPT!");
});

bot.on(message("text"), async (ctx) => {
  try {
    const response = await fetch(
      "https://api.proxyapi.ru/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.get("PROXYAPI_TOKEN")}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: ctx.message.text,
            },
          ],
          temperature: 0.7,
        }),
      }
    );
    const data = await response.json();
    ctx.reply(`${data.choices[0].message.content}`);
  } catch (error) {
    ctx.reply("Произошла ошибка при запросе к API");
  }
});

bot.launch();

process.once("SIGTERM", () => bot.stop("SIGTERM"));
