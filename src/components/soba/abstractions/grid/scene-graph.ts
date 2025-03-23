import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	type ElementRef,
	input,
	signal,
} from '@angular/core';
import { NgtArgs, type NgtEuler, type NgtVector3 } from 'angular-three';
import { gltfResource } from 'angular-three-soba/loaders';
import { NgtsAccumulativeShadows, NgtsCenter, NgtsEnvironment, NgtsRandomizedLights } from 'angular-three-soba/staging';

import suziGLB from '@common-assets/suzanne.glb';
import { NgtsGrid } from 'angular-three-soba/abstractions';
import { TweakpaneCheckbox, TweakpaneColor, TweakpaneNumber, TweakpanePane } from 'angular-three-tweakpane';

@Component({
	selector: 'app-suzi',
	template: `
		@if (gltf.value(); as gltf) {
			<ngt-mesh
				[geometry]="gltf.meshes['Suzanne'].geometry"
				[rotation]="rotation()"
				[scale]="scale()"
				castShadow
				receiveShadow
			>
				<ngt-mesh-standard-material color="#9d4b4b" />
			</ngt-mesh>
		}
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Suzi {
	rotation = input<NgtEuler>([0, 0, 0]);
	scale = input<NgtVector3>(1);

	protected gltf = gltfResource(() => suziGLB);
}

@Component({
	selector: 'app-shadows',
	template: `
		<ngts-accumulative-shadows
			[options]="{ temporal: true, frames: 100, color: '#9d4b4b', colorBlend: 0.5, alphaTest: 0.75, scale: 20 }"
		>
			<ngts-randomized-lights [options]="{ amount: 8, radius: 4, position: [5, 5, -10] }" />
		</ngts-accumulative-shadows>
	`,
	imports: [NgtsAccumulativeShadows, NgtsRandomizedLights],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Shadows {}

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-group [position]="[0, -0.5, 0]">
			<ngts-center [options]="{ top: true }">
				<app-suzi [rotation]="[-0.63, 0, 0]" [scale]="2" />
			</ngts-center>

			<ngts-center [options]="{ top: true, position: [-2, 0, 2] }">
				<ngt-mesh castShadow>
					<ngt-sphere-geometry *args="[0.5, 64, 64]" />
					<ngt-mesh-standard-material color="#9d4b4b" />
				</ngt-mesh>
			</ngts-center>

			<ngts-center [options]="{ top: true, position: [2.5, 0, 1] }">
				<ngt-mesh castShadow [rotation.y]="Math.PI / 4">
					<ngt-box-geometry *args="[0.7, 0.7, 0.7]" />
					<ngt-mesh-standard-material color="#9d4b4b" />
				</ngt-mesh>
			</ngts-center>

			<app-shadows />

			<ngts-grid
				[options]="{
					planeArgs: [planeWidth(), planeHeight()],
					position: [0, -0.01, 0],
					cellSize: cellSize(),
					cellThickness: cellThickness(),
					cellColor: cellColor(),
					sectionSize: sectionSize(),
					sectionThickness: sectionThickness(),
					sectionColor: sectionColor(),
					fadeDistance: fadeDistance(),
					fadeStrength: fadeStrength(),
					followCamera: followCamera(),
					infiniteGrid: infiniteGrid(),
				}"
			/>
		</ngt-group>
		<ngts-environment [options]="{ preset: 'city' }" />

		<tweakpane-pane title="Grid" [container]="host()">
			<tweakpane-number [(value)]="planeWidth" label="planeWidth" />
			<tweakpane-number [(value)]="planeHeight" label="planeHeight" />
			<tweakpane-number [(value)]="cellSize" label="cellSize" />
			<tweakpane-number [(value)]="cellThickness" label="cellThickness" />
			<tweakpane-color [(value)]="cellColor" label="cellColor" />
			<tweakpane-number [(value)]="sectionSize" label="sectionSize" />
			<tweakpane-number [(value)]="sectionThickness" label="sectionThickness" />
			<tweakpane-color [(value)]="sectionColor" label="sectionColor" />
			<tweakpane-number [(value)]="fadeDistance" label="fadeDistance" />
			<tweakpane-number [(value)]="fadeStrength" label="fadeStrength" />
			<tweakpane-checkbox [(value)]="followCamera" label="followCamera" />
			<tweakpane-checkbox [(value)]="infiniteGrid" label="infiniteGrid" />
		</tweakpane-pane>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		NgtsCenter,
		Suzi,
		NgtArgs,
		Shadows,
		NgtsGrid,
		NgtsEnvironment,
		TweakpanePane,
		TweakpaneNumber,
		TweakpaneColor,
		TweakpaneCheckbox,
	],
})
export class SceneGraph {
	protected readonly Math = Math;

	host = input.required<ElementRef>();

	protected planeWidth = signal(10.5);
	protected planeHeight = signal(10.5);
	protected cellSize = signal(0.6);
	protected cellThickness = signal(1);
	protected cellColor = signal('#6f6f6f');
	protected sectionSize = signal(3.3);
	protected sectionThickness = signal(1.5);
	protected sectionColor = signal('#9d4b4b');
	protected fadeDistance = signal(25);
	protected fadeStrength = signal(1);
	protected followCamera = signal(false);
	protected infiniteGrid = signal(true);
}
