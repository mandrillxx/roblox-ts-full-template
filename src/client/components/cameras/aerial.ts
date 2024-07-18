import type { Components } from "@flamework/components";
import { Component } from "@flamework/components";
import { Dependency, type OnRender } from "@flamework/core";
import { Workspace } from "@rbxts/services";

import type CameraController from "client/controllers/camera/camera-controller";
import type CharacterController from "client/controllers/player/character/character-controller";

import CameraControllerComponent from "./base-camera-controller-component";

interface Attributes {
	aerialCameraHeight: number;
}

@Component({
	defaults: {
		aerialCameraHeight: 20,
	},
	tag: "AerialCamera",
})
export default class AerialCamera
	extends CameraControllerComponent<Attributes>
	implements OnRender
{
	public static create(controller: CameraController): AerialCamera {
		assert(Workspace.CurrentCamera, "No camera found in Workspace");
		const components = Dependency<Components>();
		const camera = Workspace.CurrentCamera.Clone();
		camera.CameraType = Enum.CameraType.Scriptable;
		camera.Name = "AerialCamera";
		camera.Parent = controller.cameraStorage;

		return components.addComponent(camera);
	}

	constructor(private readonly character: CharacterController) {
		super();
	}

	public onRender(_dt: number): void {
		const root = this.character.getRoot();
		if (root === undefined) {
			return;
		}

		const position = root.Position.add(new Vector3(0, this.getHeight(), 0));
		this.setCFrame(CFrame.lookAt(position, root.Position));
	}

	private getHeight(): number | undefined {
		return this.attributes.aerialCameraHeight;
	}
}
