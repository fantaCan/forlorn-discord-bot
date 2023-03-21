import path from "path";
import fs from "fs";
import chalk from "chalk";
export default {
    eventName: "commandFolders",
    async execute(isLoggable) {
        const eventsPath = path.join(process.cwd(), "commands");
        const eventFolders = [];
        return new Promise((resolve, reject) => {
            fs.readdir(eventsPath, (err, folders) => {
                if (err) {
                    console.error(`Error reading events folder: ${err}`);
                    reject(err);
                }
                for (let folder of folders) {
                    if (folder == "example.js") 
                        continue;
                    
                    eventFolders.push(folder);
                }
                const logMessage = chalk.yellow(`[|] Command Folders: ${
                    eventFolders.length
                }`)
                if (isLoggable == undefined) 
                    console.log(logMessage);
                
                resolve(eventFolders);
            });
        });
    }
}
