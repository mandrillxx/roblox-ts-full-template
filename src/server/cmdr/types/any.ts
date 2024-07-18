/* eslint-disable ts/no-non-null-assertion -- not needed */
import type { Registry } from "@rbxts/cmdr";

import { isNaN } from "shared/util/number-util";

export = function (registry: Registry): void {
	registry.RegisterType("any", {
		Parse: value => {
			if (tonumber(value) !== undefined && !isNaN(tonumber(value)!)) {
				return tonumber(value)!;
			} else if (value === "true") {
				return true;
			} else if (value === "false") {
				return false;
			} else if (["nil", "null", "undefined"].includes(value as string)) {
				return;
			}

			return value;
		},
	});
};
