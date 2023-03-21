import fetch from "node-fetch";
import botData from "../../configs/bot.js";

const baseURL = "https://discord.com/api/v9/"
async function sendContent(channelId, content){
    const url = baseURL.concat(`channels/${channelId}/messages`)
    const options = {
        headers: {
            authorization: `Bot ${botData.token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content: content
        }),
        method: "POST"

    }
    try {
        const res = await fetch(url, options);
        const data = await res.json();
        return data;
    } catch (e) {
        console.log(e)
    }
}

async function sendEmbed(channelId, embed){
    const url = baseURL.concat(`channels/${channelId}/messages`)
    const options = {
        headers: {
            authorization: `Bot ${botData.token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            embeds: [
              embed
            ]
        }),
        method: "POST"

    }
    try {
        const res = await fetch(url, options);
        const data = await res.json();
        return data;
    } catch (e) {
        console.log(e)
    }
}


async function deleteContent(channelId, messageId){
    const url = baseURL.concat(`channels/${channelId}/messages/${messageId}`)
    const options = {
        method: "DELETE",
        headers: {
            authorization: `Bot ${botData.token}`,
        },
    }

    try {
        await fetch(url, options)
    } catch (  e  ) {
        return;
    } 
}

async function editContent(channelId, messageId, newContent){
    const url = baseURL.concat(`channels/${channelId}/messages/${messageId}`);
    const options = {
        method: "PATCH",
        headers: {
            authorization: `Bot ${botData.token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            content:newContent
        })
    }
try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
} catch (  e  ) {
    return;
}
}


export {
    sendContent,
    sendEmbed,
    deleteContent,
    editContent
}