var randomColor = Math.floor(Math.random() * 16777215).toString(16);

exports.run = (Discord, client, message, args) => {
let name = client.user.username;
let thumbnail = client.user.avatarURL;
    message.reply("Commands:");
    var embedcmds= new Discord.RichEmbed()
        .setFooter("© " + name + "  | Made by Aaron#1742")
        .setAuthor(name,thumbnail)
        .setColor(randomColor)
        .setTitle(":book:   " + name + " Commands")
        .setDescription("The prefix here is '!' you can find a full list of commands here: http://ibot.space/cmds")
       
    message.channel.sendEmbed(embedcmds);
    message.delete(10000)

}
