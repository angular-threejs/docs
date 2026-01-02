import {
	ChangeDetectionStrategy,
	Component,
	computed,
	CUSTOM_ELEMENTS_SCHEMA,
	input,
	signal,
	viewChild,
} from '@angular/core';
import { extend, objectEvents } from 'angular-three';
import { NgtsPoint, NgtsPointsInstances } from 'angular-three-soba/performances';
import { shaderMaterial } from 'angular-three-soba/vanilla-exports';
import { MathUtils } from 'three';

// Custom shader material for colorful points
const ColorPointsMaterial = shaderMaterial(
	{},
	/* glsl */ `
		attribute float size;
		attribute vec3 color;
		varying vec3 vColor;

		void main() {
			vColor = color;
			vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
			gl_PointSize = size * (300.0 / -mvPosition.z);
			gl_Position = projectionMatrix * mvPosition;
		}
	`,
	/* glsl */ `
		varying vec3 vColor;

		void main() {
			// Create circular points
			vec2 center = gl_PointCoord - vec2(0.5);
			if (length(center) > 0.5) discard;

			gl_FragColor = vec4(vColor, 1.0);
			#include <tonemapping_fragment>
			#include <colorspace_fragment>
		}
	`,
);

extend({ ColorPointsMaterial });

@Component({
	selector: 'app-point-with-events',
	template: `
		<ngts-point [options]="{ position: position(), size: finalSize(), color: $any(finalColor()) }" />
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtsPoint],
})
export class PointWithEvents {
	position = input<[number, number, number]>([0, 0, 0]);
	color = input<[number, number, number]>([1, 1, 1]);
	size = input(0.3);

	pointRef = viewChild.required(NgtsPoint);

	hovered = signal(false);
	clicked = signal(false);

	finalColor = computed(() => (this.hovered() ? [1, 0.4, 0.7] : this.color())); // hotpink when hovered
	finalSize = computed(() => this.size() * (this.clicked() ? 1.5 : 1));

	constructor() {
		objectEvents(() => this.pointRef().positionPointRef(), {
			pointerover: (event) => {
				event.stopPropagation();
				this.hovered.set(true);
			},
			pointerout: () => {
				this.hovered.set(false);
			},
			click: (event) => {
				event.stopPropagation();
				this.clicked.update((prev) => !prev);
			},
		});
	}
}

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngts-points-instances>
			@for (point of points; track $index) {
				<app-point-with-events [position]="point.position" [size]="point.size" [color]="point.color" />
			}
			<ngt-color-points-material />
		</ngts-points-instances>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtsPointsInstances, PointWithEvents],
})
export class SceneGraph {
	points: { position: [number, number, number]; color: [number, number, number]; size: number }[] = [];

	constructor() {
		// Create a 6x6x6 grid of points
		const n = 6;
		for (let i = 0; i < n * n * n; i++) {
			this.points.push({
				position: [MathUtils.randFloatSpread(4), MathUtils.randFloatSpread(4), MathUtils.randFloatSpread(4)],
				color: [Math.random(), Math.random(), Math.random()],
				size: Math.random() * 0.4 + 0.2,
			});
		}
	}
}
