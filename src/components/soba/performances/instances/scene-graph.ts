import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, input, viewChild } from '@angular/core';
import { beforeRender, NgtArgs, omit, pick } from 'angular-three';
import { NgtsInstance, NgtsInstances } from 'angular-three-soba/performances';
import { MathUtils } from 'three';

interface InstanceData {
	random: number;
	position: [number, number, number];
	rotation: [number, number, number];
	color: string;
}

@Component({
	selector: 'app-cube-instance',
	template: `
		<ngt-group [parameters]="parameters()">
			<ngts-instance #instance [color]="color()" />
		</ngt-group>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtsInstance],
})
export class CubeInstance {
	data = input.required<InstanceData>();
	parameters = omit(this.data, ['random', 'color']);
	color = pick(this.data, 'color');
	random = pick(this.data, 'random');

	instance = viewChild.required(NgtsInstance);

	constructor() {
		beforeRender(({ clock }) => {
			const instance = this.instance().positionMeshRef().nativeElement;
			const t = clock.elapsedTime + this.random() * 100;

			// Gentle floating animation
			instance.position.y += Math.sin(t * 2) * 0.002;
			instance.rotation.x = Math.cos(t / 2) / 4;
			instance.rotation.y = Math.sin(t / 2) / 4;

			// Scale pulse
			const scale = MathUtils.lerp(instance.scale.x, 1 + Math.sin(t * 3) * 0.1, 0.1);
			instance.scale.setScalar(scale);
		});
	}
}

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngts-instances [options]="{ limit: 100 }">
			<ngt-box-geometry *args="[0.3, 0.3, 0.3]" />
			<ngt-mesh-standard-material [metalness]="0.5" [roughness]="0.3" />

			@for (instance of instances; track $index) {
				<app-cube-instance [data]="instance" />
			}
		</ngts-instances>

		<ngt-ambient-light [intensity]="0.5 * Math.PI" />
		<ngt-directional-light [position]="[5, 5, 5]" [intensity]="Math.PI" />
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsInstances, CubeInstance],
})
export class SceneGraph {
	protected readonly Math = Math;

	instances: InstanceData[] = [];

	constructor() {
		const colorPalette = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181', '#a29bfe'];

		// Create 50 instances in a spherical distribution
		for (let i = 0; i < 50; i++) {
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.acos(2 * Math.random() - 1);
			const r = 2 + Math.random() * 1.5;

			this.instances.push({
				random: Math.random(),
				position: [r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)],
				rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
				color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
			});
		}
	}
}
