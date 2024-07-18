import type { CommandContext } from "@rbxts/cmdr";

export = function (context: CommandContext, directory: string): void {
	warn(`Directory: ${directory}`);
	context.Reply("Information about the game");
};
