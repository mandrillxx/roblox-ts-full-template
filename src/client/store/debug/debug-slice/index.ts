import { createProducer } from "@rbxts/reflex";

import type { DebugState } from "./default-data";

export * from "./default-data";

const initialState: DebugState = {
	debugOpen: false,
};

export const debugSlice = createProducer(initialState, {
	setDebugOpen: (state, open: boolean) => {
		return {
			...state,
			debugOpen: open,
		};
	},
});
