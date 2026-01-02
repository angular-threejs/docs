import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { extend, loaderResource, NgtArgs } from 'angular-three';
import { NgtpEffectComposer, NgtpLUT } from 'angular-three-postprocessing';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { textureResource } from 'angular-three-soba/loaders';
import { NgtsEnvironment } from 'angular-three-soba/staging';
import * as THREE from 'three';
import { LUTCubeLoader } from 'three-stdlib';

import cubicleCube from '@common-assets/cubicle-99.CUBE' with { loader: 'file' };
import terrazoUrl from '@common-assets/terrazo.png' with { loader: 'file' };

@Component({
	selector: 'app-grading',
	template: `
		<ngtp-effect-composer>
			@if (result.value(); as lut) {
				<ngtp-lut [options]="{ lut, tetrahedralInterpolation: true }" />
			}
		</ngtp-effect-composer>
	`,
	imports: [NgtpEffectComposer, NgtpLUT],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Grading {
	protected result = loaderResource(
		() => LUTCubeLoader,
		() => cubicleCube,
	);
}

@Component({
	selector: 'app-sphere',
	template: `
		<ngt-mesh>
			<ngt-sphere-geometry *args="[1, 64, 64]" />
			<ngt-mesh-physical-material
				[clearcoat]="1"
				[clearcoatRoughness]="0"
				[roughness]="0"
				[metalness]="0.5"
				[map]="texture.value()"
			/>
		</ngt-mesh>
	`,
	imports: [NgtArgs],
	changeDetection: ChangeDetectionStrategy.OnPush,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Sphere {
	protected texture = textureResource(() => terrazoUrl.src);
}

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-ambient-light />
		<ngt-spot-light [intensity]="Math.PI * 0.5" [angle]="0.2" [decay]="0" [penumbra]="1" [position]="[5, 15, 10]" />

		<app-sphere />
		<app-grading />

		<ngts-environment [options]="{ preset: 'warehouse', background: true, blur: 0.6 }" />
		<ngts-orbit-controls [options]="{ enableZoom: false }" />
	`,
	imports: [Sphere, Grading, NgtsEnvironment, NgtsOrbitControls],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneGraph {
	protected readonly Math = Math;

	constructor() {
		extend(THREE);
	}
}
