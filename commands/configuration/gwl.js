import botData from "../../configs/bot.js";
import guildWhitelist from "../../schemas/admin/guildWhitelist.js";
import {sendEmbed} from "../../api/discord/contentManager.js";
export default {
    name: "gwl",
    alternatives: [],
    description: "guild white list",
    async execute(data) {
        const args = data.content.split(" ").splice(1);
        if (args.length == 0) {
            await sendEmbed(data.channel_id, {
                fields: [
                    {
                        name: "MISSING KEY",
                        value: `\`${args[0]}\``,
                        inline: true
                    },
                    {
                        name: "MISSING ID",
                        value: `\`${args[1]}\``,
                        inline: true
                    },
                ],
                color: 3092790
            });
            return;
        }

        // Checks if key is valid
        try {
            const result = await guildWhitelist.find({});
            const filteredId = result.some(userDoc => userDoc.key == args[0]);
            if(!filteredId){
                await sendEmbed(data.channel_id, {
                    fields: [
                        {
                            name: "INVALID KEY",
                            value: ""
                        },
                    ],
                    color: 3092790
                });
                return;
            }
        }catch( err ) {
            return;
        };



        //check if the user still has slots left
            try {
                const result = await guildWhitelist.find({});
                const filteredDoc = result.filter(userDoc => {
                    return userDoc.key == args[0];
                });

                const NoMoreSlots = filteredDoc[0].guilds.length >= filteredDoc[0].slots
                if (NoMoreSlots){
                    await sendEmbed(data.channel_id, {
                        fields: [
                            {
                                name: "ERROR",
                                value: `\`No opened slots\``,
                                inline: true
                            },
                            {
                                name: "SLOTS",
                                value: `\`${filteredDoc[0].slots}\``,
                                inline: true
                            },
                            {
                                name: "SLOTS IN USE",
                                value: `\`${filteredDoc[0].guilds.length}\``,
                                inline: true
                            }
                        ],
                        color: 3092790
                    });
                    return;
                }
            } catch (err){
                return;
            }
            
        //Checks if guild is already registered
            try {
                const result = await guildWhitelist.find({});
                const filteredDoc = result.filter(userDoc => {
                    return userDoc.key == args[0];
                });
                const isAlreadyRegistered = filteredDoc[0].guilds.some(guildId => guildId == args[1]);
                if (isAlreadyRegistered) {
                    await sendEmbed(data.channel_id, {
                        fields: [
                            {
                                name: "ERROR",
                                value: `\`Id Already Registered\``,
                                inline: true
                            },
                            {
                                name: "GUILD ID",
                                value: `\`${args[1]}\``,
                                inline: true
                            }
                        ],
                        color: 3092790
                    });
                    return;
                };
            }catch (err){
                return;
            }
        // Pushes the guildID inside the guild whitelist doc
            try {
                const result = await guildWhitelist.updateOne({
                    key: args[0]
                }, {
                    $push: {
                        guilds: args[1]
                    }
                });
                if (result.modifiedCount > 0) {
                    await sendEmbed(data.channel_id, {
                        fields: [
                            {
                                name: "UPDATED_DOCUMENT",
                                value: ""
                            }
                        ],
                        color: 3092790
                    });
                };
            } catch (err) {
                return;
            }


    }
}


