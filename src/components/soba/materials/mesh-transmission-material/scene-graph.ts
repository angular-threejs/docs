import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, input } from '@angular/core';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { gltfResource } from 'angular-three-soba/loaders';
import { NgtsMeshTransmissionMaterial, type NgtsMeshTransmissionMaterialOptions } from 'angular-three-soba/materials';
import { NgtsAccumulativeShadows, NgtsCenter, NgtsEnvironment, NgtsRandomizedLights } from 'angular-three-soba/staging';
import * as THREE from 'three';

import gelatinousCubeGLB from '@common-assets/gelatinous_cube.glb' with { loader: 'file' };

@Component({
	selector: 'app-gelatinous-cube',
	template: `
		<ngt-group [dispose]="null">
			@if (gltf.value(); as gltf) {
				<ngt-mesh [geometry]="gltf.meshes['cube1'].geometry" [position]="[-0.56, 0.38, -0.11]">
					<ngts-mesh-transmission-material [options]="options()" />
				</ngt-mesh>

				<ngt-mesh
					castShadow
					[renderOrder]="100"
					[geometry]="gltf.meshes['cube2'].geometry"
					[material]="gltf.materials['cube_mat']"
					[position]="[-0.56, 0.38, -0.11]"
				>
					<ngt-value [rawValue]="FrontSide" attach="material.side" />
				</ngt-mesh>

				<ngt-mesh
					[geometry]="gltf.meshes['bubbles'].geometry"
					[material]="gltf.materials['cube_bubbles_mat']"
					[position]="[-0.56, 0.38, -0.11]"
				/>

				<ngt-group [position]="[-0.56, 0.38, -0.41]">
					<ngt-mesh [geometry]="gltf.meshes['arrows'].geometry" [material]="gltf.materials['weapons_mat']" />
					<ngt-mesh
						[geometry]="gltf.meshes['skeleton_1'].geometry"
						[material]="gltf.materials['skele_mat']"
					/>
					<ngt-mesh
						[geometry]="gltf.meshes['skeleton_2'].geometry"
						[material]="gltf.materials['weapons_mat']"
					>
						<ngt-value [rawValue]="FrontSide" attach="material.side" />
					</ngt-mesh>
				</ngt-group>
			}
		</ngt-group>
	`,

	imports: [NgtsMeshTransmissionMaterial],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GelatinousCube {
	protected readonly FrontSide = THREE.FrontSide;

	options = input({} as NgtsMeshTransmissionMaterialOptions);

	protected gltf = gltfResource(() => gelatinousCubeGLB);
}

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-ambient-light />

		<ngt-group [position]="[0, -2.5, 0]">
			<ngts-center [options]="{ top: true }">
				<app-gelatinous-cube [options]="options()" />
			</ngts-center>
			<ngts-accumulative-shadows
				[options]="{
					temporal: true,
					frames: 100,
					alphaTest: 0.9,
					color: '#3ead5d',
					colorBlend: 1,
					opacity: 0.8,
					scale: 20,
				}"
			>
				<ngts-randomized-lights
					[options]="{ radius: 10, ambient: 0.5, intensity: Math.PI, position: [2.5, 8, -2.5], bias: 0.001 }"
				/>
			</ngts-accumulative-shadows>
		</ngt-group>

		<ngts-orbit-controls [options]="{ minPolarAngle: 0, maxPolarAngle: Math.PI / 2, makeDefault: true }" />

		<ngts-environment
			[options]="{
				files: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/dancing_hall_1k.hdr',
				background: true,
				backgroundBlurriness: blur(),
			}"
		/>
	`,
	imports: [
		GelatinousCube,
		NgtsCenter,
		NgtsEnvironment,
		NgtsOrbitControls,
		NgtsAccumulativeShadows,
		NgtsRandomizedLights,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneGraph {
	protected readonly Math = Math;

	blur = input(0.1);
	options = input({} as NgtsMeshTransmissionMaterialOptions);
}
