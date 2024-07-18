import type { OnStart } from "@flamework/core";
import { Controller } from "@flamework/core";
import { Context as InputContext } from "@rbxts/gamejoy";
import Iris from "@rbxts/iris";
import Object from "@rbxts/object-utils";

import { Events } from "client/network";
import { store } from "client/store";
import { selectDebugOpen } from "client/store/debug/debug-selectors";

import type CameraController from "../camera/camera-controller";

const WINDOW_X = 300;
const WINDOW_Z = 400;

/**
 * A controller for controlling and monitoring debug values. Uses Iris for
 * rendering the debug window.
 */
@Controller({})
export default class ControlPanelController implements OnStart {
	private readonly input = new InputContext({
		ActionGhosting: 0,
		Process: false,
		RunSynchronously: true,
	});

	constructor(private readonly camera: CameraController) {}

	/** @ignore */
	public onStart(): void {
		const windowSize = new Vector2(WINDOW_X, WINDOW_Z);

		Iris.Init();
		Iris.UpdateGlobalConfig(Iris.TemplateConfig.colorDark);
		Iris.UpdateGlobalConfig(Iris.TemplateConfig.sizeClear);

		let open = false;

		store.subscribe(selectDebugOpen(), debugOpen => {
			open = debugOpen;
		});

		Events.debug.toggleMenu.connect(() => {
			store.setDebugOpen(!open);
		});

		Iris.Connect(() => {
			if (!open) {
				return;
			}

			Iris.Window(["Control Panel"], { size: Iris.State(windowSize) });

			this.renderTest();

			this.renderAnalyticsTab();
			this.renderCameraTab();

			Iris.End();
		});
	}

	private renderTest(): void {
		Iris.Tree(["Search Player"]);

		Iris.End();
	}

	private renderAnalyticsTab(): void {
		Iris.Tree(["Analytics"]);

		Iris.Text(["FPS"]);

		Iris.End();
	}

	private renderCameraTab(): void {
		Iris.Tree(["Camera"]);

		const currentCamera = this.camera.get().instance;
		const increment = 0.25;
		const min = 1;
		const max = 120;
		const fov = Iris.SliderNum(["FOV", increment, min, max], {
			number: Iris.State(currentCamera.FieldOfView),
		});
		if (fov.numberChanged()) {
			currentCamera.FieldOfView = fov.state.number.get();
		}

		const cameraComponents = Object.keys(this.camera.cameras).sort();
		const componentIndex = Iris.State<keyof typeof this.camera.cameras>(
			this.camera.currentName,
		);
		Iris.Combo(["Camera Component"], { index: componentIndex });
		for (const component of cameraComponents) {
			Iris.Selectable([component, component], { index: componentIndex });
		}

		Iris.End();

		if (this.camera.currentName !== componentIndex.get()) {
			this.camera.set(componentIndex.get());
		}

		Iris.End();
	}
}
