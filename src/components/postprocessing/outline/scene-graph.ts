import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	ElementRef,
	signal,
	viewChild,
} from '@angular/core';
import { beforeRender, NgtArgs } from 'angular-three';
import { NgtpEffectComposer, NgtpOutline } from 'angular-three-postprocessing';
import { KernelSize } from 'postprocessing';
import * as THREE from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Hoverable objects -->
		<ngt-mesh
			#mesh1
			[position]="[-1.5, 0, 0]"
			(pointerover)="hovered.set(mesh1Ref())"
			(pointerout)="hovered.set(null)"
		>
			<ngt-box-geometry *args="[1, 1, 1]" />
			<ngt-mesh-standard-material color="#3b82f6" />
		</ngt-mesh>

		<ngt-mesh
			#mesh2
			[position]="[0, 0, 0]"
			(pointerover)="hovered.set(mesh2Ref())"
			(pointerout)="hovered.set(null)"
		>
			<ngt-sphere-geometry *args="[0.6, 32, 32]" />
			<ngt-mesh-standard-material color="#ef4444" />
		</ngt-mesh>

		<ngt-mesh
			#mesh3
			[position]="[1.5, 0, 0]"
			(pointerover)="hovered.set(mesh3Ref())"
			(pointerout)="hovered.set(null)"
		>
			<ngt-dodecahedron-geometry *args="[0.6, 0]" />
			<ngt-mesh-standard-material color="#22c55e" />
		</ngt-mesh>

		<ngtp-effect-composer [options]="{ autoClear: false, multisampling: 0 }">
			<ngtp-outline
				[options]="{
					selection: [hovered()],
					edgeStrength: 5,
					visibleEdgeColor: '#ffffff',
					hiddenEdgeColor: '#444444',
					pulseSpeed: 0.5,
					blur: true,
					kernelSize: KernelSize.SMALL,
				}"
			/>
		</ngtp-effect-composer>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtpEffectComposer, NgtpOutline],
})
export class SceneGraph {
	protected KernelSize = KernelSize;

	mesh1Ref = viewChild.required<ElementRef<THREE.Mesh>>('mesh1');
	mesh2Ref = viewChild.required<ElementRef<THREE.Mesh>>('mesh2');
	mesh3Ref = viewChild.required<ElementRef<THREE.Mesh>>('mesh3');

	hovered = signal<ElementRef<THREE.Mesh> | null>(null);

	constructor() {
		beforeRender(({ clock }) => {
			const t = clock.getElapsedTime();
			const mesh1 = this.mesh1Ref().nativeElement;
			const mesh2 = this.mesh2Ref().nativeElement;
			const mesh3 = this.mesh3Ref().nativeElement;

			mesh1.rotation.x = t * 0.3;
			mesh1.rotation.y = t * 0.4;
			mesh2.rotation.x = t * 0.4;
			mesh2.rotation.y = t * 0.3;
			mesh3.rotation.x = t * 0.5;
			mesh3.rotation.y = t * 0.2;
		});
	}
}
