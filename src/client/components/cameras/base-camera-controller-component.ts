import { BaseComponent } from "@flamework/components";
import { Workspace } from "@rbxts/services";

const { rad } = math;

export default class CameraControllerComponent<A extends object = object> extends BaseComponent<
	A,
	Camera
> {
	protected readonly offsets: Array<CFrame> = [];

	public toggle(on: boolean): void {
		Workspace.CurrentCamera = on ? this.instance : Workspace.CurrentCamera;
	}

	public setCFrame(cframe: CFrame): void {
		this.instance.CFrame = cframe;
	}

	public setPosition(position: Vector3): void {
		this.setCFrame(new CFrame(position));
	}

	public setOrientation(orientation: Vector3): void {
		this.setCFrame(
			this.instance.CFrame.mul(
				CFrame.Angles(rad(orientation.X), rad(orientation.Y), rad(orientation.Z)),
			),
		);
	}

	public lookAt(position: Vector3): void {
		this.setCFrame(CFrame.lookAt(this.instance.CFrame.Position, position));
	}
}
