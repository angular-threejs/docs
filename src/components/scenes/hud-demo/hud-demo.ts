import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  NgtCanvas,
  NgtCanvasContent,
  provideNgtRenderer,
} from "angular-three/dom";
import { SceneGraph } from "./scene-graph";

@Component({
  template: `
    <ngt-canvas>
      <app-scene-graph *canvasContent />
    </ngt-canvas>
    <span class="absolute font-mono text-xs bottom-4 right-4">
      * click/hover the cube
    </span>
  `,
  imports: [NgtCanvas, NgtCanvasContent, SceneGraph],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "hud-demo-docs block h-full relative !mt-0" },
})
export default class HudDemo {
  static clientProviders = [provideNgtRenderer()];
}
