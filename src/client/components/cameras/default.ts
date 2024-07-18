import type { Components } from "@flamework/components";
import { Component } from "@flamework/components";
import { Dependency } from "@flamework/core";
import { Workspace } from "@rbxts/services";

import { LocalPlayer } from "client/constants";
import type CameraController from "client/controllers/camera/camera-controller";

import CameraControllerComponent from "./base-camera-controller-component";

@Component({ tag: "DefaultCamera" })
export default class DefaultCamera extends CameraControllerComponent {
	public static create(controller: CameraController): DefaultCamera {
		const components = Dependency<Components>();
		const camera = Workspace.CurrentCamera;
		assert(camera, "No camera found in Workspace");

		camera.Name = "DefaultCamera";
		camera.Parent = controller.cameraStorage;

		return components.addComponent(camera);
	}

	public override toggle(on: boolean): void {
		super.toggle(on);
		LocalPlayer.CameraMode = on ? Enum.CameraMode.Classic : LocalPlayer.CameraMode;
	}
}
