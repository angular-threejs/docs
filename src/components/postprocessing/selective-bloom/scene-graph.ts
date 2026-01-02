import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	ElementRef,
	signal,
	viewChild,
} from '@angular/core';
import { beforeRender, extend, NgtArgs, NgtSelection, NgtSelectionApi } from 'angular-three';
import { NgtpEffectComposer, NgtpSelectiveBloom } from 'angular-three-postprocessing';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-ambient-light #ambientLight [intensity]="0.3" />
		<ngt-point-light #pointLight [position]="[5, 5, 5]" [intensity]="1" />

		<!-- Non-glowing box (gray, no bloom) -->
		<ngt-mesh [position]="[-2, 0, 0]">
			<ngt-box-geometry *args="[1, 1, 1]" />
			<ngt-mesh-standard-material color="#4b5563" />
		</ngt-mesh>

		<!-- Glowing orb 1 - hover to select -->
		<ngt-mesh
			#orb1
			[select]="selected() === 'orb1'"
			[position]="[0, 0, 0]"
			(pointerover)="selected.set('orb1')"
			(pointerout)="selected.set(null)"
		>
			<ngt-sphere-geometry *args="[0.5, 32, 32]" />
			<ngt-mesh-standard-material color="#ff00ff" [emissive]="'#ff00ff'" [emissiveIntensity]="0.5" />
		</ngt-mesh>

		<!-- Glowing orb 2 - hover to select -->
		<ngt-mesh
			#orb2
			[select]="selected() === 'orb2'"
			[position]="[2, 0, 0]"
			(pointerover)="selected.set('orb2')"
			(pointerout)="selected.set(null)"
		>
			<ngt-sphere-geometry *args="[0.5, 32, 32]" />
			<ngt-mesh-standard-material color="#00ffff" [emissive]="'#00ffff'" [emissiveIntensity]="0.5" />
		</ngt-mesh>

		<ngtp-effect-composer>
			<ngtp-selective-bloom
				[lights]="[ambientLight, pointLight]"
				[options]="{
					intensity: 2,
					luminanceThreshold: 0.2,
					luminanceSmoothing: 0.025,
				}"
			/>
		</ngtp-effect-composer>
	`,
	hostDirectives: [NgtSelectionApi],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectComposer, NgtpSelectiveBloom, NgtSelection],
})
export class SceneGraph {
	ambientLight = viewChild.required<ElementRef<THREE.AmbientLight>>('ambientLight');
	pointLight = viewChild.required<ElementRef<THREE.PointLight>>('pointLight');
	orb1Ref = viewChild.required<ElementRef<THREE.Mesh>>('orb1');
	orb2Ref = viewChild.required<ElementRef<THREE.Mesh>>('orb2');

	selected = signal<string | null>(null);

	constructor() {
		extend(THREE);

		beforeRender(({ clock }) => {
			const t = clock.getElapsedTime();
			const orb1 = this.orb1Ref().nativeElement;
			const orb2 = this.orb2Ref().nativeElement;

			orb1.position.y = Math.sin(t * 2) * 0.3;
			orb2.position.y = Math.sin(t * 2 + Math.PI) * 0.3;
		});
	}
}
