import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { extend } from 'angular-three';
import { NgtsCameraControls } from 'angular-three-soba/controls';
import { NgtsAccumulativeShadows, NgtsEnvironment, NgtsRandomizedLights } from 'angular-three-soba/staging';
import { NgtTweakColor, NgtTweakPane } from 'angular-three-tweakpane';
import * as THREE from 'three';
import { Shoe } from './shoe';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-ambient-light [intensity]="Math.PI" />

		<app-shoe [color]="leftShoeColor()" [options]="{ position: [0, 0, 0.85] }" />
		<app-shoe
			[color]="rightShoeColor()"
			[options]="{
				position: [0, 0, -0.85],
				rotation: [0, 0.5, Math.PI],
				scale: -1,
			}"
		/>

		<ngts-accumulative-shadows
			[options]="{
				position: [0, -0.5, 0],
				temporal: true,
				frames: 100,
				alphaTest: 0.75,
				opacity: 0.9,
			}"
		>
			<ngts-randomized-lights [options]="{ radius: 6, position: [5, 5, -10], bias: 0.001 }" />
		</ngts-accumulative-shadows>

		<ngts-camera-controls [options]="{ maxPolarAngle: Math.PI / 2 }" />
		<ngts-environment [options]="{ preset: 'city' }" />

		<ngt-tweak-pane title="Reuse GLTF">
			<ngt-tweak-color [(value)]="leftShoeColor" label="Left-shoe" />
			<ngt-tweak-color [(value)]="rightShoeColor" label="Right-shoe" />
		</ngt-tweak-pane>
	`,
	imports: [
		Shoe,
		NgtsAccumulativeShadows,
		NgtsRandomizedLights,
		NgtsCameraControls,
		NgtsEnvironment,
		NgtTweakPane,
		NgtTweakColor,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneGraph {
	protected readonly Math = Math;

	leftShoeColor = signal('#ff0000');
	rightShoeColor = signal('#0000ff');

	constructor() {
		extend(THREE);
	}
}
