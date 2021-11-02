const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')

exports.run = async(client, message, args) => {
  
  let ayarrolu4 = message.mentions.roles.first()
  let user = message.author
  let sunucu = message.guild
  
  if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send("Bu komutu yalnızca Rolleri Yönet yetkisine sahip olanlar kullanabilir.")
  
  if (!ayarrolu4) return message.channel.send("Lütfen Erkek rolünü etiketleyiniz.")
  
  const embed4 = new Discord.MessageEmbed()
  .setTitle("Kayıtsız Rolü Ayarlandı")
  .setDescription(`**Kayıt İşleminde Kullanıcıdan Alınacak Rol Başarıyla Ayarlandı.** \n** ✅ Ayarlayan Yetkili : ${user}** \n** ✅ Ayarlanan Rol : ${ayarrolu4}**`)
  .setFooter("Whisky | Code Army" , user.displayAvatarURL({ dynamic: true }))
  .setTimestamp()
  .setThumbnail(user.displayAvatarURL({ dynamic: true }))
  db.set(`kayıtsızrol_${sunucu.id}` , `${ayarrolu4.id}`)
  message.channel.send(embed4)

};

exports.conf = {
  enabled : true,
  guildOnly : false,
  aliases : ["kayıtsız-rol"],
  permLevel : 0,
  category : ''
};

exports.help = {
  name : 'kayıtsız-rol',
  description : 'kayıtsız rol ayarlar',
  usage : 'kayıtsız-rol'
};