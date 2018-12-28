var roblox = require('noblox.js');

exports.run = (Discord, client, message, args) => {;
if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Only MR/HR can rank people!")
var groupId = process.env.group;
var maximumRank = process.env.rank;
let staffc = message.guild.channels.find("name", "logs") 

roblox.login({username: process.env.username, password: process.env.password}).then((success) => {

}).catch(() => {console.log("Failed to login.");});

    	var username = args[0]
    	if (username){
    		roblox.getIdFromUsername(username)
			.then(function(id){
				roblox.getRankInGroup(groupId, id)
			        
				.then(function(rank){
					if(maximumRank <= rank){
						message.channel.send(`${id} is rank ${rank} and not changable.`)
					} else {
						let rank2 = args[1];
						roblox.changeRank(groupId, id, rank2)
						
						.then(function(roles){
							message.channel.send(`Changed user ${username}, rank changed from ${roles.oldRole.Name} to ${roles.newRole.Name}`)
							const embed = new Discord.RichEmbed()
							    .setColor(0x8cff00)
							    .setTimestamp()
							    .setDescription(`**Action:** Changed\n**Target:** ${username}\n**User:** ${message.author.tag}\n**Old Rank:** ${roles.oldRole.Name}\n**New Rank:** ${roles.newRole.Name}`);
							staffc.send({embed});
						}).catch(function(err){
							message.channel.send("Failed to change.")
						});
					}
				}).catch(function(err){
					message.channel.send("Couldn't get them in the group.")
				});
			}).catch(function(err){ 
				message.channel.send(`Sorry, but ${username} doesn't exist on ROBLOX.`)
			});
    	} else {
    		message.channel.send("Please enter a username.")
    	}
    	return;
}
