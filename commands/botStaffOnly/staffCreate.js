import staffWhitelist from "../../schemas/admin/staffWhitelist.js"
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
    name: "staffCreate",
    alternatives: [],
    description: "",
    async execute(data) {
        const userId = data.content.split(" ").splice(1);
        const user = await getUser(userId);
        if (! user.id) return;
        const username = user.username;
        const discriminator = user.discriminator;

        
    // Check if the user is a staff member
    const staffWhitelists = await staffWhitelist.find({});
    if (!staffWhitelists.some((obj) => obj.id === data.author.id)) return;
    

        // check if user is already a bot staff member
        const staffMembers = await staffWhitelist.find({});
        try {
            for (var x = 0; x < staffMembers.length; x++) {
                if (staffMembers[x].id == userId) {
                    await sendEmbed(data.channel_id, {
                        fields: [
                            {
                              name: "Error",
                              value: `\`User is registered in database\``,
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

        //write new doc in database
        try {
            const tag = username + "#" + discriminator
            await new staffWhitelist({
                id: user.id,
                tag: tag
            }).save();

            await sendEmbed(data.channel_id, {
                fields: [
                    {
                      name: "Notice",
                      value: `\`User ${tag} has been appended to the database\``,
                    }
                  ],
                  color: 3092790
            });

        } catch (err) {
            console.log(err);
        }

    }
};

  