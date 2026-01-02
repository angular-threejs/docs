import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtsPointMaterial } from 'angular-three-soba/materials';
import { NgtsPointsBuffer } from 'angular-three-soba/performances';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-group #group>
			<ngts-points-buffer [positions]="sphere" [stride]="3" [options]="{ frustumCulled: false }">
				<ngts-point-material
					[options]="{
						transparent: true,
						color: '#ffa0e0',
						size: 0.015,
						sizeAttenuation: true,
						depthWrite: false,
					}"
				/>
			</ngts-points-buffer>
		</ngt-group>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsPointsBuffer, NgtsPointMaterial],
})
export class SceneGraph {
	private groupRef = viewChild<ElementRef<THREE.Group>>('group');

	protected sphere = new Float32Array(
		Array.from({ length: 5000 }, () => {
			const point = new THREE.Vector3();
			point.randomDirection().multiplyScalar(1.5);
			return [point.x, point.y, point.z];
		}).flat(),
	);

	constructor() {
		beforeRender(({ delta }) => {
			const group = this.groupRef()?.nativeElement;
			if (group) {
				group.rotation.x += delta * 0.1;
				group.rotation.y += delta * 0.15;
			}
		});
	}
}
