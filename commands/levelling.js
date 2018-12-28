const Discord = require('discord.js');
const db = require('quick.db');
let levelsforservers = new db.table('Lallowed')
const ms = require('parse-ms');
let cooldown = 600000;
const levelcooldown = new db.table('lcd');


    let lcd = await levelcooldown.fetch(`time_${message.guild.id}`);
    if (lcd === null) levelcooldown.set(`time_${message.guild.id}`, 0);
    let timeObj = ms(cooldown - (Date.now() - lcd));
    if ((args[0] === 'enable' || args[0] === 'disable') && lcd !== null && cooldown - (Date.now() - lcd) > 0) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You need **ADMINISTRATOR** permission to use this command.`)
        return message.channel.send(`To prevent spam, this command is now in cooldown. Come back in ${timeObj.minutes} minutes and ${timeObj.seconds} seconds to use this command again`)
    } else if ((args[0] === 'enable' || args[0] === 'disable') && cooldown - (Date.now() - lcd) <= 0) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You need **ADMINISTRATOR** permission to use this command.`)
        levelcooldown.set(`time_${message.guild.id}`, Date.now());
        if (args[0] === 'enable') {
            levelsforservers.set(`Lallowed_${message.guild.id}`, `true`)
            return message.channel.send(`Leveling enabled on this server <:tickYes:432418492889694210>`)
        }
        if (args[0] === 'disable') {
            levelsforservers.set(`Lallowed_${message.guild.id}`, `false`)
            return message.channel.send(`Leveling disabled on this server <:tickYes:432418492889694210>`)
        }
        return;
    }
    let user = message.mentions.users.first() || message.author;
    if (user.bot) return message.channel.send(`${user} is a bot. I'm not giving xp to bots`)
    let levellingenabled = await levelsforservers.fetch(`Lallowed_${message.guild.id}`);
    if (levellingenabled === `false` || levellingenabled === null) return message.channel.send(`Leveling is not enabled for this server. Enable it by using !level enable`);
    let levelss = await db.fetch(`Levels_${message.author.id}`)
    if (levelss === null) await db.set(`Levels_${message.author.id}`, {
        level: 0,
        xp: 0,
        totalxp: 0
    })
    let level = await db.fetch(`Levels_${user.id}`, {
        target: '.level'
    });
    let xp = await db.fetch(`Levels_${user.id}`, {
        target: '.xp'
    });
    let totxp = await db.fetch(`Levels_${user.id}`, {
        target: '.totalxp'
    });
    let nxtlvlxp;
if(level === 0) nxtlvlxp = 150;
if(level === 1) nxtlvlxp = 180;
if(level === 2) nxtlvlxp = 210;
if(level === 3) nxtlvlxp = 250;
if(level === 4) nxtlvlxp = 300;
if(level === 5) nxtlvlxp = 350;
if(level === 6) nxtlvlxp = 400;
if(level === 7) nxtlvlxp = 450;
if(level === 8) nxtlvlxp = 500;
if(level === 9) nxtlvlxp = 550;
if(level === 10) nxtlvlxp = 600;
if(level === 11) nxtlvlxp = 650;
if(level === 12) nxtlvlxp = 700;
if(level === 13) nxtlvlxp = 750;
if(level === 14) nxtlvlxp = 800;
if(level === 15) nxtlvlxp = 850;
if(level === 16) nxtlvlxp = 900;
if(level === 17) nxtlvlxp = 950;
if(level === 18) nxtlvlxp = 1000;
if(level === 19) nxtlvlxp = 1050;
if(level === 20) nxtlvlxp = 1100;
if(level === 21) nxtlvlxp = 1150;
if(level === 22) nxtlvlxp = 1200;
if(level === 23) nxtlvlxp = 1300;
if(level === 24) nxtlvlxp = 1400;
if(level === 25) nxtlvlxp = 1500;
if(level === 26) nxtlvlxp = 2000;
if(level === 27) nxtlvlxp = 2500;
if(level === 28) nxtlvlxp = 3000;
if(level === 29) nxtlvlxp = 3500;
if(level === 30) nxtlvlxp = 4000;
if(level === 31) nxtlvlxp = 5000;
if(level === 32) nxtlvlxp = 5750;
if(level === 33) nxtlvlxp = 6500;
if(level === 34) nxtlvlxp = 7250;
if(level === 35) nxtlvlxp = 8000;
if(level === 36) nxtlvlxp = 10000;
if(level === 37) nxtlvlxp = 12000;
if(level === 38) nxtlvlxp = 14000;
if(level === 39) nxtlvlxp = 16000;
if(level === 40) nxtlvlxp = 18000;
if(level === 41) nxtlvlxp = 20000;
if(level === 42) nxtlvlxp = 22000;
if(level === 43) nxtlvlxp = 24000;
if(level === 44) nxtlvlxp = 26000;
if(level === 45) nxtlvlxp = 28000;
if(level === 46) nxtlvlxp = 30000;
if(level === 47) nxtlvlxp = 32500;
if(level === 48) nxtlvlxp = 35000;
if(level === 49) nxtlvlxp = 37500;
if(level === 50) nxtlvlxp = 40000;
    let nxp = nxtlvlxp - xp
    const lembed = new Discord.RichEmbed()
        .setAuthor(`${user.username}`, `${user.displayAvatarURL}`)
        .setColor("0x7289da")
        .addField(`Level`, level, true)
        .addField(`Xp`, `${xp}/${nxtlvlxp}`, true)
        .addField(`Total xp`, totxp, true)
        .setFooter(`${nxp} more xp needed for next level up`)
    message.channel.send(lembed);
}
