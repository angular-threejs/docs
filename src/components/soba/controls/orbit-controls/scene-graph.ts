import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtsOrbitControls } from 'angular-three-soba/controls';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-mesh>
			<ngt-torus-knot-geometry *args="[0.8, 0.25, 128, 32]" />
			<ngt-mesh-normal-material />
		</ngt-mesh>

		<ngts-orbit-controls
			[options]="{
				autoRotate: autoRotate(),
				enableDamping: true,
				makeDefault: true,
			}"
		/>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsOrbitControls],
})
export class SceneGraph {
	protected autoRotate = signal(true);
}
