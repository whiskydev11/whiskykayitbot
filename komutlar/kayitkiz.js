const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')

exports.run = async(client, message, args) => {
  
  let yetkili = message.author
  let kayıtedilen = message.mentions.members.first()
  let kayıtedilen2 = message.mentions.users.first()
  let sunucu = message.guild
  let kızrol = db.get(`kızrol_${sunucu.id}`)
  let isim = args[1]
  let yaş = parseInt(args[2])
  let kayıtsayı = db.get(`kayıtsayı_${yetkili.id}`) || 0
  let toplam = parseInt(kayıtsayı) + 1
  let kyetki = db.get(`kayıtcırol_${sunucu.id}`) 
  let kayıtsızrol = db.get(`kayıtsızrol_${sunucu.id}`)
  let sohbetkanal = db.get(`sohbetkanalı_${sunucu.id}`)
  
  if (kyetki === null) return message.channel.send("Kayıtcı Rolü Ayarlanmamış")
  
  if (kızrol === null) return message.channel.send("Kız Rolü Ayarlanmamış")
  
  if (kayıtsızrol === null) return message.channel.send("Kayıtsız Rolü Ayarlanmamış")
  
  if (sohbetkanal === null) return message.channel.send("Sohbet Kanalı Ayarlanmamış")
  
  if (!kayıtedilen) return message.channel.send("Lütfen Kayıt Edilecek Kişiyi Etiketleyin")
  
  if (!message.member.roles.cache.has(kyetki)) return message.channel.send("Bu Komutu Kullanabilmek İçin Ayarlanmış Kayıtcı Rolüne Sahip Olmanız Gerekiyor.")
  
  if (!isim) return message.channel.send("Lütfen Kayıt Edilecek Kullanıcının Adını Giriniz.")
  
  if (isim.length > 12) return message.channel.send("Kullanıcı İsmi 12 Karakterden Fazla Olamaz.")
  
  if (!yaş) return message.channel.send("Lütfen Kayıt Edilecek Kullanıcının Yaşını Giriniz.")
  
  if (kayıtedilen.id === message.author.id) return message.channel.send("Kendinizi Kayıt Edemezsiniz.")

const embed = new Discord.MessageEmbed()
.setTitle("Harikasın!")
.setDescription(`**${kayıtedilen} kullanıcısına <@&${kızrol}> rolü verilip <@&${kayıtsızrol}> rolü alındı!** \n**İsim : ${isim}** \n**Yaş : ${yaş}** \n**Kayıt Eden Yetkili : ${yetkili}**`)
.setFooter("Whisky | Code Army" , yetkili.displayAvatarURL({ dynamic: true }))
.setTimestamp()
.setThumbnail(kayıtedilen2.displayAvatarURL({ dynamic: true }))
kayıtedilen.roles.add(kızrol)
kayıtedilen.roles.remove(kayıtsızrol)
message.guild.members.cache.get(kayıtedilen.id).setNickname(`${isim} | ${yaş}`)
db.set(`kayıtsayı_${yetkili.id}` , `${toplam}`)
message.channel.send(embed)
client.channels.cache.get(sohbetkanal).send(`${kayıtedilen} **aramıza katıldı hoşgeldin!**`)

};

exports.conf = {
  enabled : true,
  guildOnly : false,
  aliases : ["kız" , "k"],
  permLevel : 0,
  category : ''
};

exports.help = {
  name : 'k',
  description : 'kız kayıt eder',
  usage : 'k'
};
