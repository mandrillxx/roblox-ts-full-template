import type { RootState } from "..";

export function selectDebugOpen() {
	return (state: RootState) => state.debug.debugOpen;
}
