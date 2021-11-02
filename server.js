const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.on("guildMemberAdd", member => {
let kanal = db.get(`otorolkanal_${member.guild.id}`)
let sistem = db.get(`otorol_${member.guild.id}`)
let rol = db.get(`otorolrol_${member.guild.id}`) 
let kisi = member.user.tag

if (sistem === 'açık') {

const embed = new Discord.MessageEmbed()
.setDescription(`●▬▬▬▬▬▬▬▬「**Whisky - Otorol**」▬▬▬▬▬●\n \n ║  <:uye:883019525405163530> ${kisi} sunucuya giriş yaptı. \n ║ <:tik:883019606841757746> <@&${rol}> rolü otomatik olarak verildi! \n ║ <:ara:883019680766390342> Sunucu Toplam ${member.guild.memberCount} Üye oldu! \n 
●▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬●`)
.setColor("RANDOM")
member.roles.add(member.guild.roles.cache.get(rol))
client.channels.cache.get(kanal).send(embed)
}

if (sistem != 'açık') {
return 
}
});

   client.on("guildMemberAdd", member => {

if (db.has(`kayıtkanalı_${member.guild.id}`)) {

const embedhg = new Discord.MessageEmbed()
.setAuthor("Sunucumuza Hoşgeldin!", member.user.displayAvatarURL({ dynamic: true }))
  .setDescription(`**${member} Sunucumuza Hoşgeldin!** \n **Seninle Beraber ${member.guild.memberCount} Kişi Olduk!** \n \n **Kayıt Olmak İçin İsim Yaşınızı Yazıp Yetkilileri Bekle!** ✅`)
  .setImage("https://c.tenor.com/kBhihKytDZsAAAAM/alice-in-wonder-land-welcome.gif")
  .setFooter(member.guild.name)
  .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
  .setColor("RANDOM")
  .setTimestamp()
  client.channels.cache.get(db.get(`kayıtkanalı_${member.guild.id}`)).send(embedhg)
}

if (!db.has(`kayıtkanalı_${member.guild.id}`)) {
  return
}
    
   });

client.login(process.env.TOKEN);
 
