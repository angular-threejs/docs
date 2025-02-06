import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import {
  NgtCanvas,
  NgtCanvasContent,
  provideNgtRenderer,
} from "angular-three/dom";
import { NgtHexify } from "angular-three";
import { SceneGraph } from "./scene-graph";

@Component({
  template: `
    <ngt-canvas shadows [camera]="{ position: [5, 0, 5], fov: 35 }">
      <app-scene-graph
        *canvasContent
        [leftShoe]="leftShoeColor()"
        [rightShoe]="rightShoeColor()"
      />
    </ngt-canvas>
    <div class="absolute top-4 right-4 flex gap-4 flex-col">
      <input
        type="color"
        [value]="leftShoeColor()"
        (input)="leftShoeColor.set($any($event).target.value)"
      />
      <input
        type="color"
        [value]="rightShoeColor()"
        (input)="rightShoeColor.set($any($event).target.value)"
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgtCanvas, NgtCanvasContent, SceneGraph, NgtHexify],
  host: { class: "reuse-gltf-demo block relative h-full !mt-0" },
})
export default class ReuseGLTFDemo {
  static clientProviders = [provideNgtRenderer()];

  leftShoeColor = signal("#ff0000");
  rightShoeColor = signal("#0000ff");
}
