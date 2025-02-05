import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import {
  NgtCanvas,
  NgtCanvasContent,
  provideNgtRenderer,
} from "angular-three/dom";
import { SceneGraph } from "./scene-graph";
import { ToggleButton } from "../toggle-button";

@Component({
  template: `
    <ngt-canvas
      [camera]="{ position: [11, 11, 11], fov: 45, near: 0.1, far: 1000 }"
      [lookAt]="[-8, 3, -3]"
    >
      <app-scene-graph *canvasContent [stopPropagation]="stopPropagation()" />
    </ngt-canvas>
    <button class="absolute top-0 right-4" [(toggleButton)]="stopPropagation">
      stopPropagation()
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "pointer-events relative block !mt-0 h-full w-full" },
  imports: [NgtCanvas, NgtCanvasContent, SceneGraph, ToggleButton],
})
export default class EventPropagationDemo {
  static clientProviders = [provideNgtRenderer()];

  protected stopPropagation = signal(true);
}
