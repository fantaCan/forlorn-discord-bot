import fetch from "node-fetch";

const baseURL = "https://avatar.roblox.com/v1";

async function getUserAvatar(user_id){
    const url = baseURL.concat(`/users/${user_id}/avatar`);
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

async function getUserCurrentWears(user_id){
    const url = baseURL.concat(`/users/${user_id}/currently-wearing`);
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

async function getUserOutfits(user_id){
    const url = baseURL.concat(`/users/${user_id}/outfits`);
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export {
    getUserAvatar,
    getUserCurrentWears,
    getUserOutfits
};