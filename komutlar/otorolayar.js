const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')

exports.run = async(client, message, args) => {
  
  let user = message.author
  let sunucu = message.guild
  let kanal = message.mentions.channels.first()
  let rol = message.mentions.roles.first()
  let qwe = args[0]
  let sistem = db.get(`otorol_${sunucu.id}`)
  
  if (qwe === 'aç') {
    
    if (sistem === 'açık') return message.channel.send("Sistem zaten açık kapatıp tekrar deneyin.")
  
  if (!kanal) return message.channel.send("Lütfen otorol mesajının atılacağı kanalı etiketleyin.")
  
  if (!rol) return message.channel.send("Lütfen oto verilecek rolü etiketleyiniz.")
  
  if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send("Bu komutu Rolleri Yönet yetkisine sahip olanlar kullanabilir.")
  
  const embed1 = new Discord.MessageEmbed()
  .setTitle("Otorol Ayarlandı")
  .setDescription(`**Otorol Başarıyla Açıldı Ve Ayarlandı!** \n**Ayarlanan Kanal : ${kanal}** \n**Ayarlanan Rol : ${rol}** \n**Ayarlayan Yetkili : ${user}**`)
  .setFooter("Whisky | Code Army" , user.displayAvatarURL({ dynamic: true }))
  .setTimestamp()
  .setColor("GREEN")
  .setThumbnail(user.displayAvatarURL({ dynamic: true }))
  db.set(`otorol_${sunucu.id}` , 'açık')
  db.set(`otorolkanal_${sunucu.id}` , `${kanal.id}`)
  db.set(`otorolrol_${sunucu.id}` , `${rol.id}`)
  message.channel.send(embed1)
}

if (qwe === 'kapat') {
  
  if (sistem === 'kapalı') return message.channel.send("Sistem zaten kapalı.")
  
  if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send("Bu komutu Rolleri Yönet yetkisine sahip olanlar kullanabilir.")
  
  const embed2 = new Discord.MessageEmbed()
  .setTitle("Otorol Kapatıldı!")
  .setDescription(`**Otorol Sistemi Başarıyla Kapatılıp Tüm Değerler Sıfırlanmıştır.** \n**Kapatan Yetkili : ${user}**`)
  .setFooter("Whisky | Code Army" , user.displayAvatarURL({ dynamic: true }))
  .setTimestamp()
  .setColor("RED")
  .setThumbnail(user.displayAvatarURL({ dynamic: true }))
  db.delete(`otorolrol_${sunucu.id}`)
  db.delete(`otorolkanal_${sunucu.id}`)
  db.set(`otorol_${sunucu.id}` , 'kapalı')
  message.channel.send(embed2)
  
}
};

exports.conf = {
  enabled : true,
  guildOnly : false,
  aliases : ["otorol"],
  permLevel : 0,
  category : ''
};

exports.help = {
  name : 'otorol',
  description : 'otorol yapar osksksdj',
  usage : 'otorol'
};
