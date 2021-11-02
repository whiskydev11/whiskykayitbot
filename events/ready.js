const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(`Bot Aktif, Başarıyla Tüm Kayıt Komutları yüklendi!`);
  console.log(`${client.user.username} ismi ile giriş yapıldı!`); 
  client.user.setStatus("online");
  client.user.setActivity(`Kayıt Bot ❤ Whisky`);
  client.channels.cache.get("ses kanal id").join();
//whisky iyi kullanımlar diler
}; 
