const { Client, Intents } = require("discord.js");
//const config = require("./config.json");
//const dotenv = require('dotenv');
const axios = require("axios");
const prefix = "!";

//dotenv.config();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log("Bot ready");
  client.user.setActivity("Yae Publishing House", {type: "WATCHING"});
});

const food = [];

client.on("messageCreate", async (msg) => {
  if (msg.content == "!help") {
    msg.reply(
      "!info = แสดงสถานะ server\n!list = แสดงรายชื่ออาหาร\n!food = สุ่มอาหาร\n!addf <ชื่ออาหาร1> <ชื่ออาหาร2> ... = เพิ่มอาหารลงในรายชื่อ\n!clear = ล้างรายชื่ออาหาร\n!meme = ขอมีม"
    );
  } else if (msg.content == "!meme") {
    const meme = await axios.get("https://meme-api.herokuapp.com/gimme");
    const img2 = meme.data.url;
    msg.reply(img2);
  } else if (msg.content == "!info") {
    msg.reply("ชื่อเซิร์ฟเวอร์: " + msg.guild.name);
    msg.reply("สมาชิกทั้งหมด: " + msg.guild.memberCount + " คน");
  } else if (msg.content == "!list") {
    if (food.length == 0) {
      msg.reply("รายชื่อว่าง");
    } else {
      msg.reply(food.toString());
    }
  }
});

client.on("messageCreate", async (msg) => {
  if (!msg.content.startsWith(prefix)) return;
  const withoutPrefix = msg.content.slice(prefix.length);
  const split = withoutPrefix.split(/ +/);
  const command = split[0];
  const args = split.slice(1);
  if (command == "addf") {
    for (var i = 0; i < args.length; i++) {
      food.push(args[i]);
    }
    console.log(food);
    msg.reply("เพิ่ม " + "'" + args.join(", ") + "'" + " ลงในรายชื่อ");
  } else if (command == "food") {
    if (food.length == 0) {
      msg.reply("รายชื่อว่าง");
    } else {
      var x = getRandomInt(0, food.length);
      msg.reply(food[x]);
      console.log(food[x]);
    }
  } else if (command == "clear") {
    food.length = 0;
    console.log(food);
    msg.reply("ล้างรายชื่อแล้ว");
  }
});

client.on("guildCreate", (guild) => {
  guild.systemChannel.send(
    "ไม่รู้จะกินอะไรหรอ? ให้เอย์จังช่วยเลือกสิ!! ถึงจะทำอาหารไม่เป็นแต่ก็กินเก่งนะ! พิมพ์ !help เพื่อดูคำสั่งเลยย"
  );
});

client.login(process.env.DJS_TOKEN);
