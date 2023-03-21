import botData from "../../configs/bot.js"

export default async function (guildId) {

    const url = `https://discord.com/api/v9/users/@me/guilds/${guildId}`;
    const options = {
        method: 'DELETE',
        headers: {
            authorization: `Bot ${botData.token}`
        }
    };

    const res = await fetch(url, options);
    return res;
}
