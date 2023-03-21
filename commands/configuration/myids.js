import GuildWhitelist from "../../schemas/admin/guildWhitelist.js";
import {sendEmbed} from "../../api/discord/contentManager.js";
export default {
    name: "myids",
    alternatives: [],
    description: "",
    async execute(data) {
        const key = data.content.split(" ").splice(1)
        if (key.length == 0) {
            await sendEmbed(data.channel_id, {
                fields: [
                    {
                        name: "MISSING KEY",
                        value: ""
                    }
                ],
                color: 3092790
            })
            return;
        }

        // check if key exists
        try {
            const docs = await GuildWhitelist.find({});
            const validKey = docs.some(doc => doc.key == key);
            if (validKey) {
                const userDoc = docs.filter(doc => doc.key == key);
                if (userDoc[0].guilds.length == 0){ 
                    await sendEmbed(data.channel_id, {
                        fields: [
                            {
                                name: "GUILD_WHITELIST",
                                value: `\`null\``
                            }
                        ],
                        color: 3092790
                    });
                    return;
                }

                const guilds = userDoc[0].guilds.toString().replace(/,/g, "\n");
                await sendEmbed(data.channel_id, {
                    fields: [
                        {
                            name: "GUILD_WHITELIST",
                            value: `\`${guilds}\``
                        }
                    ],
                    color: 3092790
                });
            } else return;
        } catch (e) {
            return;
        }
    }
}
