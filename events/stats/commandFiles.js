import path from "path";
import fs from "fs";
import chalk from "chalk";

export default { 
    eventName: "commandFiles",
    async execute(isLoggable) {
        const eventsPath = path.join(process.cwd(), "commands");
        const promises = [];
        const eventFiles = [];

        fs.readdir(eventsPath, async (err, folders) => {
            if (err) {
              console.error(`Error reading events folder: ${err}`);
              return;
            }
            for (let folder of folders) {
                if (folder == "example.js") continue;
                const folderPath = path.join(eventsPath, folder);
                const promise = new Promise((resolve, reject) => {
                    fs.readdir(folderPath, (err, files) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        for(const file of files) {
                            eventFiles.push(file);
                        }
                        resolve();
                    });
                });
                promises.push(promise);
            }
            Promise.all(promises).then(() => {
                const logMessage = chalk.yellow(`[|] Command Files: ${eventFiles.length}`)
                if(isLoggable == undefined) console.log(logMessage);
                return eventFiles;
            }).catch((err) => {
                console.error(`Error while reading event files: ${err}`);
            });
        });
    }
}
