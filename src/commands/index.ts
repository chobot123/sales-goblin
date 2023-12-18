
import { Container } from "inversify";
import { PingCommand, PingCommandSymbol } from "./ping.command";
import Command, { CommandSymbol } from "../interfaces/command.interface";
import { PriceCheckCommand } from "./price-check.command";
import { TestCommand } from "./test.command";

export const bindToPingCommand = (container: Container): Container => {
    container.bind<Command>(CommandSymbol).to(PingCommand);
    return container;
}

export const bindToPriceCheckCommand = (container: Container): Container => {
    container.bind<Command>(CommandSymbol).to(PriceCheckCommand);
    return container;
}

export const bindToTestCommand = (container: Container): Container => {
    container.bind<Command>(CommandSymbol).to(TestCommand);
    return container;
}

export const bindCommands = (container: Container): Container => {
    bindToPingCommand(container);
    bindToPriceCheckCommand(container);
    bindToTestCommand(container);
    return container;
}