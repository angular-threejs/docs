import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	ElementRef,
	signal,
	viewChild,
} from '@angular/core';
import { extend, injectBeforeRender } from 'angular-three';
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-mesh
			#mesh
			[scale]="scale()"
			(click)="scale.set(scale() === 1 ? 1.5 : 1)"
			(pointerover)="color.set('mediumpurple')"
			(pointerout)="color.set('orange')"
		>
			<ngt-box-geometry />
			<ngt-mesh-basic-material [color]="color()" />
		</ngt-mesh>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneGraph {
	private meshRef = viewChild.required<ElementRef<Mesh>>('mesh');

	protected color = signal('orange');
	protected scale = signal(1);

	constructor() {
		extend({ Mesh, MeshBasicMaterial, BoxGeometry });

		injectBeforeRender(() => {
			const mesh = this.meshRef().nativeElement;
			mesh.rotation.x += 0.01;
		});
	}
}
