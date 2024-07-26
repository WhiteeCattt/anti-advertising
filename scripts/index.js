console.warn("Аддон «Анти-реклама» успешно загружен!");
import { world, system } from "@minecraft/server";
import config from "./config";

let warnings = {};
world.beforeEvents.chatSend.subscribe((data) => {
    const { sender: player, message } = data;
    if (player.hasTag(config.admin_tag)) return;
    if (config.block_links == true) {
        if (hasWords(message, ["http", "t.me", ".com", ".ru", ".ua", ".org", ".io", ".gg", ".net", ".web", "www."])) {
            data.cancel = true;
            system.run(() => warn(player));
        }
    }
    if (hasWords(message, config.bad_words)) {
        data.cancel = true;
        system.run(() => warn(player));
    }
});

function warn(player) {
    if (!warnings[player.name.toLowerCase()]) {
        warnings[player.name.toLowerCase()] = 0;
    }
    warnings[player.name.toLowerCase()]++;
    if (warnings[player.name.toLowerCase()] >= config.warnings) {
        warnings[player.name.toLowerCase()] = 0;
        config.punishment(player);
    } else {
        config.warning(player, warnings[player.name.toLowerCase()]);
    }
}

function hasWords(message, words) {
    message = message.toLowerCase();
    for (const word of words) {
        if (message.indexOf(word) !== -1) {
            return true;
        }
    }
    return false;
}
