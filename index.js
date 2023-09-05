// Packages
const { Telegraf, Telegram } = require('telegraf');
const config = require('./config.json');
const bot = new Telegraf(config.bot_token);
// Handler
const handler = require('./app/handler');
// Database
require('./app/database');
// Commands
bot.start(async (ctx) => {
    let id = ctx.message.chat.id;
    ctx.reply('Welcome to Mail Bot\nUse your Telegram Chat to send e-mail messages');
    handler.addUser(id);
});
// Models
const userInfo = require('./app/userData');


bot.command('setsmtp', (ctx) => {
    let id = ctx.message.chat.id;
    handler.setSMTP(ctx, id);
});

bot.command('setport', (ctx) => {
  let id = ctx.message.chat.id;
  handler.setPORT(ctx, id);
});

bot.command('setuser', (ctx) => {
  let id = ctx.message.chat.id;
  handler.setUSER(ctx, id);
});

bot.command('setpass', (ctx) => {
  let id = ctx.message.chat.id;
  handler.setPASS(ctx, id);
});

bot.command('setemail', (ctx) => {
  let id = ctx.message.chat.id;
  handler.setEMAIL(ctx, id);
});

bot.command('myinfo', (ctx) => {
  let id = ctx.message.chat.id;
  handler.getUserInfo(id);
});

bot.command('send', (ctx) => {
  let id = ctx.message.chat.id;
  handler.sendMSG(id);
});

bot.command('setTo', (ctx) => {
  ctx.sendMessage(
    "Who you want to send this message?",
    {
      reply_markup: {
        force_reply: true,
        input_field_placeholder: "Reply with your answer",
      },
    },
  );
});

bot.command('setSubject', (ctx) => {
  ctx.sendMessage(
    "Subject for your email",
    {
      reply_markup: {
        force_reply: true,
        input_field_placeholder: "Reply with your answer",
      },
    },
  );
});

bot.command('setMessage', (ctx) => {
  ctx.sendMessage(
    "Your message for your email",
    {
      reply_markup: {
        force_reply: true,
        input_field_placeholder: "Reply with your answer",
      },
    },
  );
});

bot.on('text', async (ctx) => {
  let id = ctx.message.chat.id;
  const existingUserInfo = await userInfo.findOne({ user_id: id });
        if (!existingUserInfo) {
          await userInfo.create({
            user_id: id,
            smtp: "none",
            port: 0,
            user: "none",
            pass: "none",
            email: "none",
            to: "none",
            subject: "none",
            content: "none",
          });
          await ctx.reply(
            "You are not included in database! Making a warm place for you :3"
          );
          return;
        }
  if (ctx.message.reply_to_message && ctx.message.reply_to_message.text === "Who you want to send this message?") {
    const userAnswer = ctx.message.text;
    await userInfo.findOneAndUpdate({ user_id: id, to: userAnswer });
    ctx.reply('Set!');
  } else if (ctx.message.reply_to_message && ctx.message.reply_to_message.text === "Subject for your email") {
    const userAnswer = ctx.message.text;
    await userInfo.findOneAndUpdate({ user_id: id, subject: userAnswer });
    ctx.reply('Set!');
  } else if (ctx.message.reply_to_message && ctx.message.reply_to_message.text === "Your message for your email") {
    const userAnswer = ctx.message.text;
    await userInfo.findOneAndUpdate({ user_id: id, content: userAnswer });
    ctx.reply('Set!');
  }
});
// Start
bot.launch();