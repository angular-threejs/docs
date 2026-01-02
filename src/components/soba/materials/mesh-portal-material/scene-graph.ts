import {
	ChangeDetectionStrategy,
	Component,
	computed,
	CUSTOM_ELEMENTS_SCHEMA,
	ElementRef,
	input,
	viewChild,
} from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtsMeshPortalMaterial } from 'angular-three-soba/materials';
import type { ColorRepresentation } from 'three';
import { Mesh } from 'three';

/**
 * Each face of the cube is a portal into a different "world"
 * with its own background color and spinning shape
 */
@Component({
	selector: 'app-portal-side',
	template: `
		<ngts-mesh-portal-material [attach]="attach()">
			<ng-template>
				<!-- Each portal has its own isolated scene -->
				<ngt-color *args="[bg()]" attach="background" />
				<ngt-ambient-light [intensity]="0.5 * Math.PI" />
				<ngt-point-light [position]="[10, 10, 10]" [intensity]="Math.PI" />

				<!-- Spinning shape inside the portal -->
				<ngt-mesh #shape castShadow receiveShadow>
					<ng-content />
					<ngt-mesh-standard-material [color]="shapeColor()" [metalness]="0.5" [roughness]="0.2" />
				</ngt-mesh>
			</ng-template>
		</ngts-mesh-portal-material>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtsMeshPortalMaterial, NgtArgs],
})
export class PortalSide {
	protected readonly Math = Math;

	bg = input.required<ColorRepresentation>();
	shapeColor = input<ColorRepresentation>('white');
	index = input.required<number>();
	attach = computed(() => ['material', this.index()]);

	shapeRef = viewChild<ElementRef<Mesh>>('shape');

	constructor() {
		beforeRender(({ delta }) => {
			const shape = this.shapeRef()?.nativeElement;
			if (!shape) return;
			shape.rotation.x += delta;
			shape.rotation.y += delta * 0.5;
		});
	}
}

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- A cube where each face is a portal to a different world -->
		<ngt-mesh castShadow receiveShadow>
			<ngt-box-geometry *args="[2, 2, 2]" />

			<!-- Front face (index 0): Orange world with torus -->
			<app-portal-side bg="#ff6b6b" [index]="0">
				<ngt-torus-geometry *args="[0.5, 0.2, 32, 64]" />
			</app-portal-side>

			<!-- Back face (index 1): Cyan world with torus knot -->
			<app-portal-side bg="#4ecdc4" [index]="1">
				<ngt-torus-knot-geometry *args="[0.4, 0.15, 128, 32]" />
			</app-portal-side>

			<!-- Top face (index 2): Green world with box -->
			<app-portal-side bg="#95e1d3" [index]="2">
				<ngt-box-geometry *args="[0.8, 0.8, 0.8]" />
			</app-portal-side>

			<!-- Bottom face (index 3): Aqua world with octahedron -->
			<app-portal-side bg="#a29bfe" [index]="3">
				<ngt-octahedron-geometry *args="[0.6]" />
			</app-portal-side>

			<!-- Right face (index 4): Pink world with icosahedron -->
			<app-portal-side bg="#f38181" [index]="4">
				<ngt-icosahedron-geometry *args="[0.5]" />
			</app-portal-side>

			<!-- Left face (index 5): Yellow world with dodecahedron -->
			<app-portal-side bg="#ffe66d" [index]="5">
				<ngt-dodecahedron-geometry *args="[0.5]" />
			</app-portal-side>
		</ngt-mesh>

		<!-- Main scene lighting -->
		<ngt-ambient-light [intensity]="0.3 * Math.PI" />
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, PortalSide],
})
export class SceneGraph {
	protected readonly Math = Math;
}
