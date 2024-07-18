import type { CommandDefinition } from "@rbxts/cmdr";

export = identity<CommandDefinition>({
	Aliases: ["information"],
	Args: [
		{
			Description: "The directory to get information about",
			Name: "Directory",
			Type: "string",
		},
	],
	Description: "Get information about the game",
	Group: "Dev",
	Name: "info",
});
