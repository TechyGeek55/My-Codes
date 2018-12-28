
const request= require('request');
	  const rbx= require('noblox.js');
const db = require('quick.db')
	  exports.run = async (Discord, client, message, args) => {
      let groupid = process.env.group;
		  request('https://verify.eryn.io/api/user/' + message.author.id, { json: true }, (err, res, body) => {
              if (err || body.robloxUsername == null) {
                    return message.channel.send(`Hi there, welcome to ${message.guild.name}. Please go to https://verify.eryn.io, verify your roblox account and then run this command again.`);              
              } else { 
                    message.member.setNickname(body.robloxUsername).catch(function(err){ 
				message.channel.send(`Error: I was not able to update your discord nickname.`)
			    	const newname = body.robloxUsername;
			});
                let verifyrole = message.guild.roles.find("name", "Verified")
                              if (message.guild.me.hasPermission('MANAGE_ROLES') && !verifyrole) {
              message.guild.createRole({
  name: "Verified"
});
    }
                    message.member.addRole(message.guild.roles.find("name", "Verified")).catch(function(err){ 
				message.channel.send(`Error: I was not able to give you the verified role.`)
			});
					rbx.getRankNameInGroup(groupid,body.robloxId).then(data => {
						rbx.getRankInGroup(groupid,body.robloxId).then(data1 => {
							let RankForGroup = message.guild.roles.find("name",data);
              if (message.guild.me.hasPermission('MANAGE_ROLES') && !RankForGroup) {
              message.guild.createRole({
  name: data
});
    }
							message.member.addRole(RankForGroup).catch(function(err){ 
				message.channel.send(`Error: I was not able to update your discord role.`)
			});
	
							const embed = new Discord.RichEmbed()
							    .setColor(0x8cff00)
							    .setTimestamp()
							    .setDescription(`${message.author.tag}, your Discord account has been updated with the following infomation.`)
							    .setTitle('Roblox Verification')
							    .addField('Username',body.robloxUsername,true)
							    .addField('ID',body.robloxId,true)
							    .addField('Rank',data,true)
							    .setThumbnail("https://www.roblox.com/Thumbs/Avatar.ashx?x=100&y=100&userid=" + body.robloxId);
							message.channel.send({embed})
					})
					})
                }
        });
	
	
  }
