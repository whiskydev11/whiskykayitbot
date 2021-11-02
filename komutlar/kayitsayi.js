const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');

exports.run = async(client, message, args) => {
  
  let user = message.author || message.mentions.users.first()
  let erkek = db.get(`erkekks_${user.id}`) || 0
  let kız = db.get(`kızks_${user.id}`) || 0
  
  if (!user) return message.channel.send("Birini etiketle.")
  
  
  const embed = new Discord.MessageEmbed()
  .setTitle(`${user.username} Kullanıcısının Kayıt Sayısı`)
  .setDescription(`**Erkek Kayıt** \n ${erkek} \n \n**Kız Kayıt** \n ${kız}`)
  message.channel.send(embed)

};

exports.conf = {
  enabled : true,
  guildOnly : false,
  aliases : ["kayıt-sayı" , "ks"],
  permLevel : 0,
  category : ''
};

exports.help = {
  name : 'ks',
  description : 'ksjdjdh',
  usage : 'ks'
};
