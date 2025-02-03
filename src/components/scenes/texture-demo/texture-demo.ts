import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  NgtCanvas,
  NgtCanvasContent,
  provideNgtRenderer,
} from "angular-three/dom";
import { SceneGraph } from "./scene-graph";

@Component({
  template: `
    <ngt-canvas [camera]="{ position: [0, 0, 20] }">
      <app-scene-graph *canvasContent />
    </ngt-canvas>
  `,
  imports: [NgtCanvas, NgtCanvasContent, SceneGraph],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextureDemo {
  static clientProviders = [provideNgtRenderer()];
}
