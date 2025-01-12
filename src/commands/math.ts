import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { evaluate } from "mathjs";
import { IBotCommand } from "../types";

export const command: IBotCommand = {
    data: new SlashCommandBuilder()
        .setName("math")
        .setDescription("Calculates the input.")
        .addStringOption((option) =>
            option
                .setName("calculation")
                .setDescription("Calculation to evaluate.")
                .setRequired(true)
        ),
    async execute(interaction) {
        const calc = interaction.options.getString("calculation", true);

        try {
            const result = evaluate(calc);
            const successEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`Input: \`${calc}\`\nResult: \`${result}\``);
            interaction.reply({ embeds: [successEmbed], ephemeral: true });
        } catch (err) {
            const errorEmbed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`Input: \`${calc}\`\nError: \`${err}\``);
            interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    },
};
