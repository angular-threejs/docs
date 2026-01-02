import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtsMeshReflectorMaterial } from 'angular-three-soba/materials';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-mesh [position]="[0, 1, 0]">
			<ngt-torus-knot-geometry *args="[0.5, 0.2, 128, 32]" />
			<ngt-mesh-standard-material color="#ff6b6b" [metalness]="0.5" [roughness]="0.2" />
		</ngt-mesh>

		<ngt-mesh [rotation]="[-Math.PI / 2, 0, 0]">
			<ngt-plane-geometry *args="[10, 10]" />
			<ngts-mesh-reflector-material
				[options]="{
					resolution: 512,
					mirror: 0.75,
					mixBlur: 10,
					mixStrength: 2,
					color: '#a0a0a0',
					metalness: 0.5,
					roughness: 1,
				}"
			/>
		</ngt-mesh>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsMeshReflectorMaterial],
})
export class SceneGraph {
	protected readonly Math = Math;
}
