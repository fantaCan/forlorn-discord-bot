import crypto from "crypto";
import staffWhitelist from "../../schemas/admin/staffWhitelist.js";
import GuildWhitelist from "../../schemas/admin/guildWhitelist.js";
import botData from "../../configs/bot.js";
import {sendEmbed} from "../../api/discord/contentManager.js";

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

export default {
    name: "generateKey",
    alternatives: [],
    description: "",
    async execute(data) {
        const uniqueKey = crypto.randomBytes(16).toString("hex");
        const userId = data.content.split(" ").splice(1);
        const user = await getUser(userId);
        if (! user.id) 
            return;
        
        const username = user.username;
        const discriminator = user.discriminator;
    // Check if the user is a staff member
    const staffWhitelists = await staffWhitelist.find({});
    if (!staffWhitelists.some((obj) => obj.id === data.author.id)) return;



          
        try {
            const guildWhitelists = await GuildWhitelist.find({});
            for (let x = 0; x < guildWhitelists.length; x++) {
                const ownerId = guildWhitelists[x].keyOwner.id;
                if (ownerId == userId) {
                    await sendEmbed(data.channel_id, {
                        fields: [
                            {
                                name: "ERROR",
                                value:"User is registered in database"
                            }
                        ],
                        color: 3092790
                    });
                    return;
                }
            }
        } catch (err) {
            console.log(err);
        }


        const now = new Date();
        const formattedDate = now.toLocaleString();
        const buyer = {
            tag: username + "#" + discriminator,
            id: user.id,
            Date: formattedDate
        };

        try {
            await new GuildWhitelist({key: uniqueKey, keyOwner: buyer, slots: 1}).save();
            await sendEmbed(data.channel_id, {
                fields: [
                    {
                        name: "KEY",
                        value: `\`${uniqueKey}\``,
                        inline: true
                    },
                    {
                        name: "DATE",
                        value:`\`${formattedDate}\``,
                        inline: true
                    }
                ],
                color: 3092790
            });
        } catch (err) {
            console.log(err);
        }
    }
};

