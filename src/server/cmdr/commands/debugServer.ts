import type { CommandContext } from "@rbxts/cmdr";

import { Events } from "server/network";

export = function (context: CommandContext): void {
	Events.debug.toggleMenu.fire(context.Executor);
};
