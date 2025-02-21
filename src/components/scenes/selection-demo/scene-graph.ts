import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	ElementRef,
	input,
	model,
	signal,
	viewChild,
} from '@angular/core';
import {
	extend,
	injectBeforeRender,
	NgtArgs,
	NgtSelection,
	NgtSelectionApi,
	type NgtThreeElements,
} from 'angular-three';
import { NgtpEffectComposer, NgtpSelectiveBloom } from 'angular-three-postprocessing';
import * as THREE from 'three';

@Component({
	selector: 'app-box',
	template: `
		<ngt-mesh
			#mesh
			[select]="selected() === mesh"
			(pointerover)="selected.set(mesh)"
			(pointerout)="selected.set(null)"
			[position.x]="positionX()"
		>
			<ngt-box-geometry />
			<ngt-mesh-standard-material color="mediumpurple" />
		</ngt-mesh>
	`,
	imports: [NgtSelection],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Box {
	selected = model.required<NgtThreeElements['ngt-mesh'] | null>();
	positionX = input.required<number>();

	private meshRef = viewChild.required<ElementRef<THREE.Mesh>>('mesh');

	constructor() {
		injectBeforeRender(() => {
			this.meshRef().nativeElement.rotation.x += 0.01;
		});
	}
}

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-color *args="['#0c0c0c']" attach="background" />

		<ngt-ambient-light #light [intensity]="Math.PI * 0.5" />
		<ngt-spot-light #light2 [position]="10" [angle]="0.15" [penumbra]="1" [decay]="0" [intensity]="Math.PI" />
		<ngt-point-light #light3 [position]="-10" [decay]="0" />

		<app-box [(selected)]="selected" [positionX]="1.5" />
		<app-box [(selected)]="selected" [positionX]="-1.5" />

		<ngtp-effect-composer>
			<ngtp-selective-bloom
				[lights]="[light, light2, light3]"
				[options]="{ intensity: 5, luminanceThreshold: 0.01, luminanceSmoothing: 0.025 }"
			/>
		</ngtp-effect-composer>
	`,
	hostDirectives: [NgtSelectionApi],
	imports: [Box, NgtpEffectComposer, NgtpSelectiveBloom, NgtArgs],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneGraph {
	protected readonly Math = Math;

	protected selected = signal<NgtThreeElements['ngt-mesh'] | null>(null);

	constructor() {
		extend(THREE);
	}
}
