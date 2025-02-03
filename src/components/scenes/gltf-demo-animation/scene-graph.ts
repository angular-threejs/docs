import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
} from "@angular/core";
import { injectGLTF } from "angular-three-soba/loaders";
import { injectLoader, NgtArgs } from "angular-three";
import { NgtsCameraControls } from "angular-three-soba/controls";
import { NgtsCenter, NgtsEnvironment } from "angular-three-soba/staging";
import {
  injectAnimations,
  type NgtsAnimationClips,
} from "angular-three-soba/misc";
import type { GLTF } from "three-stdlib";

import littlestTokyo from "../gltf-demo/LittlestTokyo-transformed.glb" with { loader: "file" };

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
  protected gltf = injectGLTF<
    GLTF & { animations: NgtsAnimationClips<"Take 001">[] }
  >(() => littlestTokyo);
  private animations = injectAnimations(this.gltf, this.gltf.scene);

  constructor() {
    injectLoader.clear(littlestTokyo);

    effect((onCleanup) => {
      if (!this.animations.isReady) return;
      const { actions } = this.animations;
      actions["Take 001"].reset().fadeIn(0.5).play();
      onCleanup(() => actions["Take 001"].fadeOut(0.5).stop());
    });
  }
}
