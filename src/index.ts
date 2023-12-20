import express from "express";
import "reflect-metadata";
import { Container } from "inversify";
import { bindCommands } from "./commands";
import Command, { CommandSymbol } from "./interfaces/command.interface";
import { authenticateInteraction } from "./middlewares/authentication/authenticate-interaction";
import { acknowledgeInteraction } from "./middlewares/authentication/acknowledge-interaction";

const app = express();
const container = new Container();
/**
 * Bind commands to container
 */
bindCommands(container);

const PORT = process.env.PORT || 3000;

app.use(express.json());

/**
 * Interactions controllers
 */
app.use("/interacts", authenticateInteraction, acknowledgeInteraction);

app.listen(PORT, async () => {
    console.log("Listening on port ", PORT);
    /**
     * Create commands
     */
    const commands = container.getAll<Command>(CommandSymbol);
    for (const command of commands) {
        await command.create();
    }
});