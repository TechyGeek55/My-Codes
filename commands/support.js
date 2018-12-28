exports.run = async (Discord, client, message, args) => {
    let myRole = message.guild.roles.find("name", "Supporter");
    if(message.channel.id !== "447117133952974859") return message.channel.send("This command can only be executed in the `Alert eSports roles` channel!");
    if(message.member.roles.has(myRole.id)) return message.channel.send("You already have the role!");
        message.reply("You've been given the support role!")
        let member = message.author;
        await (message.member.addRole(myRole.id)).catch(console.error)
    
}
