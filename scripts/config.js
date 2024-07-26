export default {
    admin_tag: "Admin", // Админ тег
    block_links: true, // Блокировка ссылок
    bad_words: ["фантайм", "холиворлд"], // Запрещённые слова
    warnings: 3, // Кол-во предупреждений перед наказанием
    warning (player, warnings) => { // Предупреждение
        player.sendMessage("§cВ вашем сообщении содержаться запрещённые слова!");
    },
    punishment (player) => { // Наказание
        player.runCommand(`kick "${player.name}" §r\n§cВ вашем сообщении содержаться запрещённые слова!`);
    }
}
