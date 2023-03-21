import WebSocket from 'ws';
import fs from "fs";
import path from 'path';

import botData from "./configs/bot.js";
import connectDB from './database/connect.js';
const ws = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');

console.clear()
let interval = 0;
ws.on('message', async function (data) {
    const {t, event, op, d} = JSON.parse(data);

    switch (op) {
        case 10:
            const {heartbeat_interval} = d;
            interval = heartbeat(heartbeat_interval)
            break;
    }
    switch (t) {
        case "READY":
            console.clear()
            console.log("[|] online!")
            await connectDB();
            const eventsPath = path.join(process.cwd(), "events");
            fs.readdir(eventsPath, async (err, folders) => {
                if (err) {
                    console.error(`Error reading events folder: ${err}`);
                    return;
                }
                for (const folder of folders) {
                  if (folder == "example.js") continue;
                    const folderPath = path.join(eventsPath, folder);
                    fs.readdir(folderPath, async (err, files) => {
                        if (err) {
                            console.error(`Error reading ${folder} folder: ${err}`);
                            return;
                        }
                        if (Array.isArray(files)) {
                            for (const file of files) {
                                const eventFile = await import (`./events/${folder}/${file}`);
                                const event = eventFile.default;
                                await event.execute()
                            }
                        } else {
                            console.error(`${folder} is not an array: ${files}`);
                        }
                    });
                }
            });

            break;

        case "MESSAGE_CREATE":
            if (d.author.id == botData.id) 
                return;
            
            const commandsFolders = path.join(process.cwd(), "commands");
            fs.readdir(commandsFolders, async (err, folders) => {
                if (err) {
                    console.error(`Error reading commands folder: ${err}`);
                    return;
                }

                for (const folder of folders) {
                    if (folder == "example.js") 
                        continue;
                    
                    const folderPath = path.join(commandsFolders, folder);
                    fs.readdir(folderPath, async (error, files) => {
                        if (error) {
                            console.error(`Error reading folder ${folder}: ${error}`);
                            return;
                        }

                        for (const file of files) {
                            const commandFile = await import (`./commands/${folder}/${file}`)
                            const command = commandFile.default;
                            const content = d.content.toLowerCase()
                            const preCommand = content.split(" ")[0];
                            if (preCommand.startsWith(botData.prefix) && preCommand.slice(1) == command.name.toLowerCase()) {
                                await command.execute(d)

                            }
                        }
                    });
                }
            });
            break;


    }
})

ws.on('open', () => {
    ws.send(JSON.stringify(botData.payload))
})

ws.on("close", () => {
    console.log("Bot has closed")
})

function heartbeat(ms) {
    return setInterval(() => {
        ws.send(JSON.stringify({op: 1, d: null}))
    }, ms)
}


export default ws;