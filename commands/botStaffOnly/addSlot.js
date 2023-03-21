import staffWhitelist from "../../schemas/admin/staffWhitelist.js";
import GuildWhitelist from "../../schemas/admin/guildWhitelist.js";
import botData from "../../configs/bot.js";
import { sendEmbed } from "../../api/discord/contentManager.js";

async function getUser(id) {
  const response = await fetch(`https://discord.com/api/v9/users/${id}`, {
    method: "GET",
    headers: { authorization: `Bot ${botData.token}` },
  });
  const data = await response.json();
  return data;
}

export default {
  name: "addSlot",
  alternatives: [],
  description: "",
  async execute(data) {
    const userId = data.content.split(" ")[1];
    const user = await getUser(userId);
    if (!user.id) return;

    // Check if the user is a staff member
    const staffWhitelists = await staffWhitelist.find({});
    if (!staffWhitelists.some((obj) => obj.id === data.author.id)) return;

    try {
            await GuildWhitelist.updateOne(
        { "keyOwner.id": user.id },
        { $inc: { slots: 1 } }
      );
      const whiteLists = await GuildWhitelist.find({});
      for (const whiteList of whiteLists) {
        const ownerId = whiteList.keyOwner.id;
        if (ownerId === user.id) {
          const result = whiteList.slots;
          await sendEmbed(data.channel_id, {
            fields: [
              {
                name: "UPDATE",
                value: `User's new slot count is \`${result}\``
              }
            ],
            color: 3092790
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
};
