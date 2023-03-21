import GuildWhitelist from "../../schemas/admin/guildWhitelist.js";
import {sendEmbed} from "../../api/discord/contentManager.js";
import leaveServer from "../../api/discord/leaveServer.js";

export default {
    name: "rgid",
    alternatives: [],
    description: "",
    async execute(data) {
        const args = data.content.split(" ").splice(1);
        const key = args[0];
        const gid = args[1];
        if (args.length == 0) {
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
        };

        // check if key exists
        try {
            const docs = await GuildWhitelist.find({});
            const validKey = docs.some(doc => doc.key == key);
            if (! validKey) 
                return;
            
        } catch (e) {
            return;
        }

        try {
            const result = await GuildWhitelist.updateOne({
                key: key
            }, {
                $pull: {
                    guilds: gid
                }
            });
            switch (result.modifiedCount) {
                case 0:
                    await sendEmbed(data.channel_id, {
                        fields: [
                            {
                                name: "NO_MATCHES_FOUND",
                                value: ""
                            }
                        ],
                        color: 3092790
                    });
                    break;

                default:
                    await sendEmbed(data.channel_id, {
                        fields: [
                            {
                                name: "UPDATED_DOCUMENT",
                                value: ""
                            }
                        ],
                        color: 3092790
                    });
                    try {
                        await leaveServer(gid);
                    } catch (e){
                        return;
                    }
                    break
            }

        } catch (err) {
            console.log(err)
        }


    }
}
