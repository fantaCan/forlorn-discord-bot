import { sendEmbed, sendContent} from "../../api/discord/contentManager.js";
import { embeds } from "../../test/container.js";

export default {
    name: "createEmbed",
    alternatives: [],
    description: "",
    async execute(data){
        const content = data.content.toLowerCase();
        const contentInputs = content.split(" ").splice(1)[0];
        const name = contentInputs.split(":")[1].trim();
        if(embeds.length == 0) {
            embeds.push({
                name: name
            })
        } else {
            for(var x = 0; x < embeds.length; x++){
                if(embeds[x].name && embeds[x].name == name){
                    await sendContent(data.channel_id, "Must include embed name! \n\n```JSON\n<prefix><commandname> name:apples```")
                }else {
                    embeds.push({
                        name: name
                    })
                }
            }
        }
        console.log(embeds);
    }
}