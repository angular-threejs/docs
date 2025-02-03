import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from "@angular/core";
import { injectGLTF } from "angular-three-soba/loaders";
import { injectLoader, NgtArgs } from "angular-three";
import { NgtsCameraControls } from "angular-three-soba/controls";
import { NgtsCenter, NgtsEnvironment } from "angular-three-soba/staging";

import littlestTokyo from "./LittlestTokyo-transformed.glb" with { loader: "file" };

@Component({
  selector: "app-scene-graph",
  template: `
    <ngts-center>
      <ngt-primitive *args="[gltf.scene()]" [parameters]="{ scale: 0.0075 }" />
    </ngts-center>

    <ngts-environment [options]="{ preset: 'city' }" />

    <ngts-camera-controls />
  `,
  imports: [NgtArgs, NgtsCameraControls, NgtsEnvironment, NgtsCenter],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneGraph {
  protected gltf = injectGLTF(() => littlestTokyo);

  constructor() {
    injectLoader.clear(littlestTokyo);
  }
}
