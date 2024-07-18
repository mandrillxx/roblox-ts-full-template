import type { OnInit, OnRender } from "@flamework/core";
import { Controller } from "@flamework/core";
import { Workspace } from "@rbxts/services";

import AerialCamera from "client/components/cameras/aerial";
import type CameraControllerComponent from "client/components/cameras/base-camera-controller-component";
import DefaultCamera from "client/components/cameras/default";

interface Cameras {
	readonly Aerial: AerialCamera;
	readonly Default: DefaultCamera;
}

/**
 * A controller for managing the camera state based off the associated values
 * from within the camera slice.
 */
@Controller({})
export default class CameraController implements OnInit, OnRender {
	public readonly cameraStorage = new Instance("Actor", Workspace);

	public cameras!: Cameras;
	public currentName!: keyof typeof this.cameras;

	public onInit(): void {
		this.cameraStorage.Name = "Cameras";
		this.cameras = {
			Aerial: AerialCamera.create(this),
			Default: DefaultCamera.create(this),
		};
	}

	public onRender(dt: number): void {
		const camera = this.get();
		if ("onRender" in camera && typeOf(camera.onRender) === "function") {
			const update = camera.onRender as (
				camera: CameraControllerComponent,
				dt: number,
			) => void;
			update(camera, dt);
		}
	}

	public set(cameraName: keyof typeof this.cameras): void {
		this.currentName = cameraName;
		for (const [otherCameraName] of pairs(this.cameras)) {
			this.get(otherCameraName).toggle(cameraName === otherCameraName);
		}
	}

	public get<T extends CameraControllerComponent>(
		cameraName: keyof typeof this.cameras = this.currentName,
	): T {
		return this.cameras[cameraName] as T;
	}
}
