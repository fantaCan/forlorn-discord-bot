import fetch from "node-fetch";

const baseURL = "https://clientsettings.roblox.com/v2";


async function getClientVersion(binaryType){
    const url = baseURL.concat(`client-version/${binaryType}`);
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export {
    getClientVersion
}