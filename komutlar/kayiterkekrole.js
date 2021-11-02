const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')

exports.run = async(client, message, args) => {
  
  let ayarrolu = message.mentions.roles.first()
  let user = message.author
  let sunucu = message.guild
  
  if (!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send("Bu komutu yalnızca Rolleri Yönet yetkisine sahip olanlar kullanabilir.")
  
  if (!ayarrolu) return message.channel.send("Lütfen Erkek rolünü etiketleyiniz.")
  
  const embed1 = new Discord.MessageEmbed()
  .setTitle("Erkek Rolü Ayarlandı")
  .setDescription(`**Kayıtta Kullanılacak Erkek Rolü Başarıyla Ayarlandı.** \n** Ayarlayan Yetkili : ${user}** \n** Ayarlanan Rol : ${ayarrolu}**`)
  .setFooter("Whisky | Code Army" , user.displayAvatarURL({ dynamic: true }))
  .setTimestamp()
  .setThumbnail(user.displayAvatarURL({ dynamic: true }))
  db.set(`erkekrol_${sunucu.id}` , `${ayarrolu.id}`)
  message.channel.send(embed1)

};

exports.conf = {
  enabled : true,
  guildOnly : false,
  aliases : ["erkek-rol" , "e-rol"],
  permLevel : 0,
  category : ''
};

exports.help = {
  name : 'kayiterkekrol',
  description : 'erkek rol ayarlar',
  usage : 'e-rol'
};