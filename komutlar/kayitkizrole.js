const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')

exports.run = async(client, message, args) => {
  
  let ayarrolu2 = message.mentions.roles.first()
  let user = message.author
  let sunucu = message.guild
  
  if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send("Bu komutu yalnızca Rolleri Yönet yetkisine sahip olanlar kullanabilir.")
  
  if (!ayarrolu2) return message.channel.send("Lütfen kız rolünü etiketleyiniz.")
  
  const embed2 = new Discord.MessageEmbed()
  .setTitle("Kız Rolü Ayarlandı")
  .setDescription(`**Kayıtta Kullanılacak Kız Rolü Başarıyla Ayarlandı.** \n** Ayarlayan Yetkili : ${user}** \n** Ayarlanan Rol : ${ayarrolu2}**`)
  .setFooter("Whisky | Code Army" , user.displayAvatarURL({ dynamic: true }))
  .setTimestamp()
  .setThumbnail(user.displayAvatarURL({ dynamic: true }))
  db.set(`kızrol_${sunucu.id}` , `${ayarrolu2.id}`)
  message.channel.send(embed2)

};

exports.conf = {
  enabled : true,
  guildOnly : false,
  aliases : ["kız-rol" , "k-rol"],
  permLevel : 0,
  category : ''
};

exports.help = {
  name : 'k-rol',
  description : 'kız rol ayarlar',
  usage : 'k-rol'
};