import type { CommandDefinition } from "@rbxts/cmdr";

export = identity<CommandDefinition>({
	Args: [],
	Description: "Toggle the debug menu",
	Group: "Dev",
	Name: "debug",
});
