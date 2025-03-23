import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { loaderResource, NgtArgs } from 'angular-three';
import { NgtsCameraControls } from 'angular-three-soba/controls';
import { gltfResource } from 'angular-three-soba/loaders';
import { NgtsCenter, NgtsEnvironment } from 'angular-three-soba/staging';

import littlestTokyo from './LittlestTokyo-transformed.glb' with { loader: 'file' };

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
	protected gltf = gltfResource(() => littlestTokyo);

	constructor() {
		loaderResource.clear(littlestTokyo);
	}
}
