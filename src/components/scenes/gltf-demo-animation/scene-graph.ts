import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, effect } from '@angular/core';
import { loaderResource, NgtArgs } from 'angular-three';
import { NgtsCameraControls } from 'angular-three-soba/controls';
import { gltfResource } from 'angular-three-soba/loaders';
import { animations, type NgtsAnimationClips } from 'angular-three-soba/misc';
import { NgtsCenter, NgtsEnvironment } from 'angular-three-soba/staging';
import type { GLTF } from 'three-stdlib';

import littlestTokyo from '../gltf-demo/LittlestTokyo-transformed.glb' with { loader: 'file' };

@Component({
	selector: 'app-scene-graph',
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
	protected gltf = gltfResource<GLTF & { animations: NgtsAnimationClips<'Take 001'>[] }>(() => littlestTokyo);
	private animations = animations(this.gltf.value, this.gltf.scene);

	constructor() {
		loaderResource.clear(littlestTokyo);

		effect((onCleanup) => {
			if (!this.animations.isReady) return;
			const { actions } = this.animations;
			actions['Take 001'].reset().fadeIn(0.5).play();
			onCleanup(() => actions['Take 001'].fadeOut(0.5).stop());
		});
	}
}
