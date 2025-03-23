import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	ElementRef,
	input,
	signal,
	viewChild,
} from '@angular/core';
import { beforeRender, extend, NgtArgs } from 'angular-three';
import * as THREE from 'three';

extend(THREE);

@Component({
	selector: 'app-cube',
	template: `
		<ngt-mesh
			#mesh
			[position]="[positionX(), 1, 0]"
			[scale]="clicked() ? 1.5 : 1"
			(pointerover)="hovered.set(true)"
			(pointerout)="hovered.set(false)"
			(click)="clicked.set(!clicked())"
		>
			<ngt-box-geometry *args="[1, 2, 1]" />
			<ngt-mesh-basic-material [color]="hovered() ? 'hotpink' : 'mediumpurple'" />
		</ngt-mesh>
	`,
	imports: [NgtArgs],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cube {
	positionX = input(0);

	private meshRef = viewChild.required<ElementRef<THREE.Mesh>>('mesh');

	protected hovered = signal(false);
	protected clicked = signal(false);

	constructor() {
		beforeRender(({ delta }) => {
			this.meshRef().nativeElement.rotation.y += delta;
		});
	}
}

@Component({
	selector: 'app-step-seven-scene-graph',
	template: `
		<app-cube [positionX]="-2" />
		<app-cube [positionX]="2" />
	`,
	imports: [Cube],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepSeven {}
