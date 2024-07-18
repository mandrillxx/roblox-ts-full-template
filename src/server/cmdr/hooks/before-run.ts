import type { Registry } from "@rbxts/cmdr";
import { RunService } from "@rbxts/services";

const DEVELOPERS = new Set([1, game.CreatorId]);
const NO_PERMISSION = "You do not have permission to execute this command!";

export = function (registry: Registry) {
	registry.RegisterHook("BeforeRun", context => {
		switch (context.Group) {
			case "Dev": {
				if (DEVELOPERS.has(context.Executor.UserId) || RunService.IsStudio()) {
					return;
				}

				return NO_PERMISSION;
			}
		}

		// eslint-disable-next-line sonar/no-redundant-jump, no-autofix/no-useless-return -- false positive
		return;
	});
};
