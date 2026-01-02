import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtsHTML } from 'angular-three-soba/misc';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Rotating cube with HTML label that follows it -->
		<ngt-mesh #cube [position]="[0, 0, 0]">
			<ngt-box-geometry *args="[1.5, 1.5, 1.5]" />
			<ngt-mesh-standard-material color="#4ecdc4" />

			<!-- HTML label attached to the mesh -->
			<ngts-html [options]="{ position: [0, 1.2, 0], center: true }">
				<div
					htmlContent
					style="
						background: rgba(78, 205, 196, 0.95);
						color: white;
						padding: 8px 16px;
						border-radius: 8px;
						font-size: 14px;
						font-weight: bold;
						white-space: nowrap;
						box-shadow: 0 4px 12px rgba(0,0,0,0.3);
					"
				>
					I follow the cube!
				</div>
			</ngts-html>
		</ngt-mesh>

		<!-- Static HTML annotation in 3D space -->
		<ngts-html [options]="{ position: [-2.5, 0, 0], transform: true }">
			<div
				htmlContent
				[distanceFactor]="8"
				style="
					color: white;
					padding: 12px 20px;
					border-radius: 12px;
					font-size: 16px;
					font-weight: bold;
					text-align: center;
				"
			>
				3D Transform Mode
				<div style="font-size: 11px; opacity: 0.9; margin-top: 4px;">Scales with distance</div>
			</div>
		</ngts-html>

		<!-- Another annotation -->
		<ngts-html [options]="{ position: [2.5, 0, 0] }">
			<div
				htmlContent
				[center]="true"
				style="
					background: rgba(162, 155, 254, 0.95);
					color: white;
					padding: 8px 16px;
					border-radius: 8px;
					font-size: 14px;
					white-space: nowrap;
					box-shadow: 0 4px 12px rgba(0,0,0,0.3);
				"
			>
				Screen-space HTML
			</div>
		</ngts-html>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsHTML],
})
export class SceneGraph {
	private cubeRef = viewChild<ElementRef<THREE.Mesh>>('cube');

	constructor() {
		beforeRender(({ delta }) => {
			const cube = this.cubeRef()?.nativeElement;
			if (cube) {
				cube.rotation.y += delta * 0.5;
				cube.rotation.x += delta * 0.3;
			}
		});
	}
}
