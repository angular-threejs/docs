import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { extend, injectBeforeRender, NgtArgs } from 'angular-three';
import * as THREE from 'three';

extend(THREE);

@Component({
	selector: 'app-step-five-scene-graph',
	template: `
		<ngt-mesh #mesh [position]="[0, 1, 0]">
			<ngt-box-geometry *args="[1, 2, 1]" />
			<ngt-mesh-basic-material color="mediumpurple" />
		</ngt-mesh>
	`,
	imports: [NgtArgs],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepFive {
	private meshRef = viewChild.required<ElementRef<THREE.Mesh>>('mesh');

	constructor() {
		injectBeforeRender(({ delta }) => {
			this.meshRef().nativeElement.rotation.y += delta;
		});
	}
}
