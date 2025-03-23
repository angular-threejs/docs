import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { extend, NgtArgs } from 'angular-three';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { textureResource } from 'angular-three-soba/loaders';
import { NgtsEnvironment } from 'angular-three-soba/staging';
import * as THREE from 'three';

/**
 *
Image Attributions

The images used in this project are sourced from NASA and ESA and may require attribution. Please refer to the image sources for specific attribution requirements.

- Earth Albedo map: https://visibleearth.nasa.gov/images/57730/the-blue-marble-land-surface-ocean-color-and-sea-ice/82679l
- Earth Bump map: https://visibleearth.nasa.gov/images/73934/topography/84331l
*/

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-mesh>
			<ngt-sphere-geometry *args="[10, 64, 64]" />

			@let _textures = textures.value();
			@let map = _textures?.map;
			@let bumpMap = _textures?.bumpMap;
			<ngt-mesh-standard-material [map]="map" [bumpMap]="bumpMap" />
		</ngt-mesh>

		<ngts-environment [options]="{ preset: 'sunset' }" />
		<ngts-orbit-controls [options]="{ autoRotate: true, autoRotateSpeed: 0.25 }" />
	`,
	imports: [NgtArgs, NgtsOrbitControls, NgtsEnvironment],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneGraph {
	protected textures = textureResource(() => ({
		map: 'https://raw.githubusercontent.com/nartc/threejs-earth/refs/heads/main/src/assets/Albedo.jpg',
		bumpMap: 'https://raw.githubusercontent.com/nartc/threejs-earth/refs/heads/main/src/assets/Bump.jpg',
	}));

	constructor() {
		extend(THREE);
	}
}
