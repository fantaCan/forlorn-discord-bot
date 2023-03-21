import ws from "../index.js";
import keys from "../schemas/admin/guildWhitelist.js";
import whitelist from "../schemas/guild/whitelist.js";
import leaveServer from "../api/discord/leaveServer.js";
import { sendEmbed } from "../api/discord/contentManager.js";

export default {
    eventName: "checkIfWhitelisted",
    async execute() {
        ws.on('message', async function (data) {
            const {t, d} = JSON.parse(data);
            if (t == "GUILD_CREATE") {
                const guildId = d.id;
                const ownerId = d.owner_id
                const ownerKey = await keys.find({
                    guilds: {
                        $in: [guildId]
                    }
                });
                switch(ownerKey.length){
                    case 0: 
                    try{
                        await leaveServer(guildId)
                    }catch(e){
                        return;
                    }
                    break;
                    default: 
                    const newDoc = await new whitelist({
                        guild_id: guildId,
                        owner_id: ownerId
                    });
                    newDoc.save();
                    break;
                }
            };
        });


    }
}
