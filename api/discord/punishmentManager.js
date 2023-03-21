import fetch from "node-fetch";
import botData from "../../configs/bot.js";

const baseURL = "https://discord.com/api/v9/";



async function banUser(guildId, userId){
    const url = baseURL + `guilds/${guildId}/bans/${userId}`;
    const options = {
        method: 'PUT',
        headers: {
          authorization: `Bot ${botData.token}`
        }
      };
      const res = await fetch(url, options);
      return res;
};

async function kickUser(guildId, userId){
    const url = baseURL + `guilds/${guildId}/members/${userId}`;
    const options = {
        method: 'DELETE',
        headers: {
            authorization: `Bot ${botData.token}`
        }
      };
      const res = await fetch(url, options);
      return res;
};

export {
    kickUser, 
    banUser
};