import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { gltfResource } from 'angular-three-soba/loaders';
import { NgtsAdaptiveDpr, NgtsAdaptiveEvents } from 'angular-three-soba/performances';
import * as THREE from 'three';
import type { GLTF } from 'three-stdlib';

import archerGLB from '@common-assets/archer.glb' with { loader: 'file' };

interface ArcherGLTF extends GLTF {
	materials: { material_0: THREE.MeshStandardMaterial };
	nodes: Record<'mesh_0' | 'mesh_1' | 'mesh_2', THREE.Mesh>;
}

@Component({
	selector: 'app-adaptive-archer',
	template: `
		@if (gltf.value(); as gltf) {
			@let material = gltf.materials.material_0;
			@let nodes = gltf.nodes;

			<ngt-group [dispose]="null">
				<ngt-group [rotation]="[-Math.PI / 2, 0, 0]">
					<ngt-group [position]="[0, 0, 2]">
						<ngt-mesh castShadow receiveShadow [material]="material" [geometry]="nodes.mesh_0.geometry" />
						<ngt-mesh castShadow receiveShadow [geometry]="nodes.mesh_1.geometry" [material]="material" />
						<ngt-mesh castShadow receiveShadow [material]="material" [geometry]="nodes.mesh_2.geometry" />
					</ngt-group>
				</ngt-group>
			</ngt-group>
		}
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class Archer {
	protected readonly Math = Math;
	protected gltf = gltfResource<ArcherGLTF>(() => archerGLB);
}

@Component({
	selector: 'app-scene-graph',
	template: `
		<app-adaptive-archer />
		<ngt-directional-light
			castShadow
			[intensity]="0.2 * Math.PI"
			[position]="[10, 10, 5]"
			[shadow.mapSize]="[64, 64]"
			[shadow.bias]="-0.001"
		/>

		<ngts-adaptive-dpr [pixelated]="pixelated()" />
		<ngts-adaptive-events />
		<ngts-orbit-controls [options]="{ regress: true }" />
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [Archer, NgtsAdaptiveDpr, NgtsAdaptiveEvents, NgtsOrbitControls],
})
export class SceneGraph {
	pixelated = input(true);

	protected readonly Math = Math;
}
