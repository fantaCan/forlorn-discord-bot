import whitelist from "../../schemas/guild/whitelist.js"
import botData from "../../configs/bot.js"
import { sendEmbed } from "../../api/discord/contentManager.js";
export default {
    name: "wl",
    alternatives: [],
    description: "",
    async execute(data){
        const userId = data.author.id;
        const guildId = data.guild_id
        const content = data.content.split(" ").splice(1);
        
        if(content.length == 0) return;
        const whitelists = await whitelist.find({});
        const isOwner = whitelists.some(whitelist => whitelist.owner_id == userId && whitelist.guild_id == guildId || "1058537536630304798");
        if(isOwner){
            const whitelistId = content[0].startsWith("<@") ? content[0].replace(/\D/g, '') : content[0];
            const user = await getUser(whitelistId);
            if(!user.id) {
                await sendEmbed(data.channel_id, {
                    fields: [
                        {
                            name: "INVALID_USER_ID",
                            value: ""
                        }
                    ],
                    color: 3092790
                });
                return;
            }

            //check if user is already registered
           const isDocumented = whitelists.some(whitelist => whitelist.whitelist.includes(whitelistId));
           if(isDocumented){

            const result = await whitelist.updateOne(
                {guild_id: guildId},
                {$pull: {whitelist: whitelistId}}
            );
            if(result.modifiedCount>0){
                await sendEmbed(data.channel_id, {
                    fields: [
                        {
                            name: "UPDATED_DOCUMENT",
                            value: `\`id deleted from array\``,
                            inline: true
                        },
                        {
                            name: "REMOVED_WHITELIST",
                            value: `\`${user.username+"#"+user.discriminator}\``,
                            inline: true
                        }
                    ],
                    color: 3092790
                });
                return;
            }
           }



           const result = await whitelist.updateOne(
                {guild_id: guildId},
                {$push: {whitelist: whitelistId}}
            );
            if(result.modifiedCount !== 0){
                await sendEmbed(data.channel_id, {
                    fields: [
                        {
                            name: "UPDATED_DOCUMENT",
                            value: `\`pushed to array\``,
                            inline: true
                        },
                        {
                            name: "NEW_WHITELIST",
                            value: `\`${user.username+"#"+user.discriminator}\``,
                            inline: true
                        }
                    ],
                    color: 3092790
                });
                return;
            }
        } else return;
    }
}



async function getUser(id) {
    const options = {
        headers: {
            authorization: `Bot ${
                botData.token
            }`
        },
        method: "GET"
    };
    const url = `https://discord.com/api/v9/users/${id}`;
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
}