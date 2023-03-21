import { kickUser } from "../../api/discord/punishmentManager.js"
import { sendEmbed } from "../../api/discord/contentManager.js";
import botData from "../../configs/bot.js";

export default {
    name: "kick",
    alternatives: [],
    description: "",
    async execute(data){
        const userId = data.content.split(" ").splice(1);

        if( userId[0].startsWith("<@") ){
            let d = data.content.split(" ").splice(1)[0]
            d = d.replace(/\D/g, '');
            const user = await getUser(d);
            if (!user.id) return console.error(`Could not find user with ID ${d}`);
            const res = await kickUser(data.guild_id, user.id);
            const status = await res.status;
            switch(status){
                case 204: 
                    await sendEmbed(data.channel_id, {
                        fields: [
                            {
                                name: "EVENT",
                                value: `\`${user.username + "#" +user.discriminator}\` kicked`
                            }
                        ],
                        color: 3092790
                    });
                    break;
                case 403: 
                    await sendEmbed(data.channel_id, {
                        fields: [
                            {
                                name: "STATUS",
                                value: `status: \`${status}\``,
                                inline: true
                            },
                            {
                                name: "ERROR",
                                value: `\`permission denied\``,
                                inline: true
                            }
                        ],
                        color: 3092790
                    });
                    break;

                default: 
                    await sendEmbed(data.channel_id, {
                        fields: [
                            {
                                name: "ERROR",
                                value:  `status: \`${status}\``
                            },
                        ],
                        color: 3092790
                    });
                    break;
            }
            return;
        }

        const user = await getUser(userId);
        if (!user.id) return console.error(`Could not find user with ID ${userId}`);
        const res = await kickUser(data.guild_id, user.id);
        const status = await res.status;
        switch(status){
            case 204: 
                await sendEmbed(data.channel_id, {
                    fields: [
                        {
                            name: "EVENT",
                            value: `\`${user.username + "#" +user.discriminator}\` kicked`
                        }
                    ],
                    color: 3092790
                });
                break;
            case 403: 
                await sendEmbed(data.channel_id, {
                    fields: [
                        {
                            name: "STATUS",
                            value: `status: \`${status}\``,
                            inline: true
                        },
                        {
                            name: "ERROR",
                            value: `\`permission denied\``,
                            inline: true
                        }
                    ],
                    color: 3092790
                });
                break;

            default: 
                await sendEmbed(data.channel_id, {
                    fields: [
                        {
                            name: "ERROR",
                            value: `status: \`${status}\``
                        },
                    ],
                    color: 3092790
                });
                break;
        }
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
