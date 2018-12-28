exports.run = (Discord, client, message, args) => {
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Only admins can edit premium bot settings.!");
let status = args.slice(0).join(" ");
client.user.setUsername(status)
}
