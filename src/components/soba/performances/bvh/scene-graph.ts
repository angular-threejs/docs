import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { NgtsBVH } from 'angular-three-soba/performances';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- BVH-accelerated meshes for fast raycasting -->
		<ngts-bvh [options]="{ firstHitOnly: true }">
			<!-- Complex geometry - torus knot -->
			<ngt-mesh
				[position]="[-2, 0, 0]"
				(pointerover)="color1.set('#ffff00')"
				(pointerout)="color1.set('#ff6b6b')"
			>
				<ngt-torus-knot-geometry *args="[0.6, 0.2, 128, 32]" />
				<ngt-mesh-standard-material [color]="color1()" />
			</ngt-mesh>

			<!-- Complex geometry - icosahedron with high detail -->
			<ngt-mesh [position]="[0, 0, 0]" (pointerover)="color2.set('#ffff00')" (pointerout)="color2.set('#4ecdc4')">
				<ngt-icosahedron-geometry *args="[0.8, 4]" />
				<ngt-mesh-standard-material [color]="color2()" />
			</ngt-mesh>

			<!-- Complex geometry - dodecahedron -->
			<ngt-mesh [position]="[2, 0, 0]" (pointerover)="color3.set('#ffff00')" (pointerout)="color3.set('#a29bfe')">
				<ngt-dodecahedron-geometry *args="[0.8, 2]" />
				<ngt-mesh-standard-material [color]="color3()" />
			</ngt-mesh>
		</ngts-bvh>

		<ngts-orbit-controls [options]="{ enablePan: false }" />
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsBVH, NgtsOrbitControls],
})
export class SceneGraph {
	color1 = signal('#ff6b6b');
	color2 = signal('#4ecdc4');
	color3 = signal('#a29bfe');
}
