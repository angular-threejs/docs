import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { extend, NgtArgs } from 'angular-three';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { NgtsSoftShadows } from 'angular-three-soba/misc';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-color attach="background" *args="['#f0f0f0']" />

		<!-- Enable soft shadows with PCSS -->
		@if (enabled()) {
			<ngts-soft-shadows [options]="{ size: 25, samples: 17, focus: 0 }" />
		}

		<!-- Directional light that casts shadows -->
		<ngt-directional-light
			[castShadow]="true"
			[position]="[5, 8, 5]"
			[intensity]="1.5"
			[shadow.mapSize.width]="1024"
			[shadow.mapSize.height]="1024"
			[shadow.camera.far]="50"
			[shadow.camera.left]="-10"
			[shadow.camera.right]="10"
			[shadow.camera.top]="10"
			[shadow.camera.bottom]="-10"
		/>

		<!-- Ambient light for fill -->
		<ngt-ambient-light [intensity]="0.4" />

		<!-- Floating sphere -->
		<ngt-mesh [castShadow]="true" [position]="[-1.5, 1.5, 0]">
			<ngt-sphere-geometry *args="[0.5, 32, 32]" />
			<ngt-mesh-standard-material color="#ff6b6b" />
		</ngt-mesh>

		<!-- Floating box -->
		<ngt-mesh [castShadow]="true" [position]="[0, 1, 0]" [rotation]="[0.4, 0.4, 0]">
			<ngt-box-geometry *args="[1, 1, 1]" />
			<ngt-mesh-standard-material color="#4ecdc4" />
		</ngt-mesh>

		<!-- Floating torus -->
		<ngt-mesh [castShadow]="true" [position]="[1.5, 1.2, 0]" [rotation]="[Math.PI / 2, 0, 0]">
			<ngt-torus-geometry *args="[0.4, 0.15, 16, 32]" />
			<ngt-mesh-standard-material color="#ffe66d" />
		</ngt-mesh>

		<!-- Ground plane that receives shadows -->
		<ngt-mesh [receiveShadow]="true" [rotation]="[-Math.PI / 2, 0, 0]" [position]="[0, 0, 0]">
			<ngt-plane-geometry *args="[15, 15]" />
			<ngt-mesh-standard-material color="#f8f8f8" />
		</ngt-mesh>

		<ngts-orbit-controls [options]="{ makeDefault: true }" />
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsSoftShadows, NgtsOrbitControls],
})
export class SceneGraph {
	enabled = input(true);

	protected readonly Math = Math;

	constructor() {
		extend(THREE);
	}
}
