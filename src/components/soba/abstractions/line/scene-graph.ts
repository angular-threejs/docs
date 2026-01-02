import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtsLine } from 'angular-three-soba/abstractions';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngts-line [points]="points" [options]="{ color: '#ff6b6b', lineWidth: 3 }" />
		<ngts-line [points]="curve" [options]="{ color: '#4ecdc4', lineWidth: 2 }" />
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtsLine],
})
export class SceneGraph {
	protected points: [number, number, number][] = [
		[-2, -1, 0],
		[-1, 1, 0],
		[0, -1, 0],
		[1, 1, 0],
		[2, -1, 0],
	];

	protected curve = new THREE.CatmullRomCurve3([
		new THREE.Vector3(-2, 0, 0),
		new THREE.Vector3(-1, 1.5, 0),
		new THREE.Vector3(1, -1.5, 0),
		new THREE.Vector3(2, 0, 0),
	]).getPoints(50);
}
