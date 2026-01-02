import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { NgtsAdaptiveDpr, NgtsAdaptiveEvents } from 'angular-three-soba/performances';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Interactive meshes -->
		@for (pos of positions; track $index) {
			<ngt-mesh [position]="pos" (pointerover)="hoveredIndex.set($index)" (pointerout)="hoveredIndex.set(-1)">
				<ngt-box-geometry *args="[0.5, 0.5, 0.5]" />
				<ngt-mesh-standard-material [color]="hoveredIndex() === $index ? '#ff6b6b' : '#4ecdc4'" />
			</ngt-mesh>
		}

		<!-- Spinning torus to create load -->
		<ngt-mesh #torus [position]="[0, 0, -2]">
			<ngt-torus-knot-geometry *args="[0.8, 0.3, 256, 64]" />
			<ngt-mesh-standard-material color="#a29bfe" />
		</ngt-mesh>

		<!-- Adaptive performance components -->
		<ngts-adaptive-dpr [pixelated]="true" />
		<ngts-adaptive-events />

		<!-- Controls with regress to trigger performance regression -->
		<ngts-orbit-controls [options]="{ regress: true }" />
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsAdaptiveDpr, NgtsAdaptiveEvents, NgtsOrbitControls],
})
export class SceneGraph {
	hoveredIndex = signal(-1);

	// Grid of interactive boxes
	positions = [
		[-1.5, 1, 0],
		[0, 1, 0],
		[1.5, 1, 0],
		[-1.5, -0.5, 0],
		[0, -0.5, 0],
		[1.5, -0.5, 0],
	];

	constructor() {
		// Animate torus to create continuous rendering load
		let torusMesh: THREE.Mesh | null = null;

		beforeRender(({ scene, delta }) => {
			if (!torusMesh) {
				torusMesh = scene.getObjectByName('torus') as THREE.Mesh;
			}
			// Find torus by traversing - simpler approach
			scene.traverse((obj) => {
				if (obj.type === 'Mesh' && (obj as THREE.Mesh).geometry?.type === 'TorusKnotGeometry') {
					obj.rotation.x += delta * 0.5;
					obj.rotation.y += delta * 0.3;
				}
			});
		});
	}
}
