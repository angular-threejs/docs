import { ChangeDetectionStrategy, Component, input } from "@angular/core";
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
  `,
  imports: [NgtCanvas, NgtCanvasContent, SceneGraph],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GLTFDemo {
  static clientProviders = [provideNgtRenderer()];
}
