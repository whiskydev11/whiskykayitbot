const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {
  
  let user = message.author
  let sunucu = message.guild

 const embed = new Discord.MessageEmbed()
 .setTitle("Kayıt Sistemi")
 .addField(`**${ayarlar.prefix}erkek-rol @rol**` , 'Kayıtta verilecek erkek rolü ayarlar.')
 .addField(`**${ayarlar.prefix}kız-rol @rol**` , 'Kayıtta verilecek kız rolü ayarlar.')
 .addField(`**${ayarlar.prefix}kayıtsız-rol @rol**` , 'Kayıt bitiminde kullanıcıdan alınacak rolü ayarlar.')
 .addField(`**${ayarlar.prefix}kayıtcı-rol @rol**` , 'Kayıt komutlarını kullanabilecek rolü ayarlar.')
 .addField(`**${ayarlar.prefix}ayarla sohbet #kanal**` , 'Kayıt bitiminde atılacak hoşgeldin mesajının atılacağı kanalı ayarlar.')
 .addField(`**${ayarlar.prefix}ayarla kayıt #kanal**` , 'Sunucuya biri katıldığında embedli atılacak mesajın atılacağı kanalı ayarlar.')
 .addField(`**${ayarlar.prefix}otorol aç #kanal @rol**` , 'Sunucuya katılan kişiye otomatik verilecek rolü ayarlar.')
 .addField(`**${ayarlar.prefix}otorol kapat**` , 'Otorol sistemini kapatıp değerleri sıfırlar.')
 .setFooter("Whisky | Code Army" , message.guild.iconURL)
 .setTimestamp()
 .setThumbnail(user.displayAvatarURL({ dynamic: true }))
message.channel.send(embed)

};

exports.conf = {
  enabled : true,
  guildOnly : false,
  aliases : ["kayıt-yardım", "help", "yardım"],
  permLevel : 0,
  category : ''
};

exports.help = {
  name : 'kayityardim',
  description : 'ısjdshd',
  usage : 'kayıt-yardım'
};
