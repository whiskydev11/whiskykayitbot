const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')

exports.run = async(client, message, args) => {
  
  let ayarrolu3 = message.mentions.roles.first()
  let user = message.author
  let sunucu = message.guild
  
  if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send("Bu komutu yalnızca Rolleri Yönet yetkisine sahip olanlar kullanabilir.")
  
  if (!ayarrolu3) return message.channel.send("Lütfen kayıtcı rolünü etiketleyiniz.")
  
  const embed3 = new Discord.MessageEmbed()
  .setTitle("Kayıtcı Rolü Ayarlandı")
  .setDescription(`**Kayıt Komutlarını Kullanabilecek Rol Başarıyla Ayarlandı.** \n** ✅ Ayarlayan Yetkili : ${user}** \n** ✅ Ayarlanan Rol : ${ayarrolu3}**`)
  .setFooter("Whisky | Code Army" , user.displayAvatarURL({ dynamic: true }))
  .setTimestamp()
  .setThumbnail(user.displayAvatarURL({ dynamic: true }))
  db.set(`kayıtcırol_${sunucu.id}` , `${ayarrolu3.id}`)
  message.channel.send(embed3)

};

exports.conf = {
  enabled : true,
  guildOnly : false,
  aliases : ["kayıtcı-rol"],
  permLevel : 0,
  category : ''
};

exports.help = {
  name : 'kayıtcı-rol',
  description : 'kayıtcı rol ayarlar',
  usage : 'kayıtcı-rol'
};