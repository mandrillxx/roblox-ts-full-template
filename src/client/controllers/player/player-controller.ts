import type { OnStart } from "@flamework/core";
import { Controller } from "@flamework/core";

import type CameraController from "../camera/camera-controller";

@Controller({ loadOrder: 1000 })
export default class PlayerController implements OnStart {
	constructor(private readonly camera: CameraController) {}

	/** @ignore */
	public onStart(): void {
		this.camera.set("Default");
	}
}
