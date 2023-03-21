import fetch from "node-fetch";

const baseURL = "https://friends.roblox.com/v1";

async function getFriends (user_id){
    const url = baseURL.concat(`/users/${user_id}/friends`);
    const res = await fetch(url);
    const data = await res.json();
    return data;
};

async function getFriendCount(user_id){
    const url =  baseURL.concat(`/users/${user_id}/friends/count`);
    const res = await fetch(url);
    const data = await res.json();
    return data;
};
async function getUserFollowings(user_id){
    const url =  baseURL.concat(`/users/${user_id}/followings`);
    const res = await fetch(url);
    const data = await res.json();
    return data;
};
async function getUserFollowingCount(user_id){
    const url = baseURL.concat(`/users/${user_id}/followings/count`);
    const res = await fetch(url);
    const data = await res.json();
    return data;
};
async function getOnlineFriends(){
    const url = baseURL.concat(`/users/${user_id}/friends/online`);
    const res = await fetch(url);
    const data = await res.json();
    return data;
};
async function getFriendsStatuses(){
    const url = baseURL.concat(`/users/${user_id}/friends/statuses`);
    const res = await fetch(url);
    const data = await res.json();
    return data;
};

export{
    getFriends,
    getFriendCount,
    getUserFollowings,
    getUserFollowingCount,
    getOnlineFriends,
    getFriendsStatuses
};