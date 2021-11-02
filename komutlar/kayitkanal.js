const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')

exports.run = async(client, message, args) => {

let user = message.author
let kanal = message.mentions.channels.first()
let qwa = args[0]
let sunucu = message.guild

if (!qwa) return message.channel.send("Geçerli bir argüman giriniz kayıt/sohbet")

if (args[0] === 'kayıt') {

if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send("Bu komutu kullanabilmek için Kanalları Yönet yetkisine sahip olman gerekiyor.")

if (!kanal) return message.channel.send("Lütfen Kayıt Yapılacak Kanalı Etiketleyin.")

const embed1 = new Discord.MessageEmbed()
.setTitle("Mükemmel!")
.setDescription(`**Kayıt Kanalı Başarıyla ${kanal} Olarak Ayarlandı.** \n**Ayarlayan Yetkili : ${user}**`)
.setFooter("Whisky | Code Army")
.setThumbnail(user.displayAvatarURL({ dynamic: true }))
.setTimestamp()
.setColor("GREEN")
db.set(`kayıtkanalı_${sunucu.id}` , `${kanal.id}`)
message.channel.send(embed1)

}

if (args[0] === 'sohbet') {
  
  if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send("Bu komutu kullanabilmek için Kanalları Yönet yetkisine sahip olman gerekiyor.")

if (!kanal) return message.channel.send("Lütfen Kayıt Sonrası Aramıza Katıldı Mesajının  Atılacağı Kanalı Etiketleyin.")
  
  const embed2 = new Discord.MessageEmbed()
  .setTitle("Mükemmel!")
.setDescription(`**Sohbet Kanalı Başarıyla ${kanal} Olarak Ayarlandı.** \n**Ayarlayan Yetkili : ${user}**`)
.setFooter("Whisky | Code Army")
.setThumbnail(user.displayAvatarURL({ dynamic: true }))
.setTimestamp()
.setColor("GREEN")
db.set(`sohbetkanalı_${sunucu.id}` , `${kanal.id}`)
message.channel.send(embed2)
  
}

};

exports.conf = {
  enabled : true,
  guildOnly : false,
  aliases : ["ayarla"],
  permLevel : 0,
  category : ''
};

exports.help = {
  name : 'ayarla',
  description : 'lsdjworhdjdj',
  usage : 'ayarla'
};
