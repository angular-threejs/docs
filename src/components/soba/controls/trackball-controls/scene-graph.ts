import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtsTrackballControls } from 'angular-three-soba/controls';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-mesh>
			<ngt-icosahedron-geometry *args="[1, 1]" />
			<ngt-mesh-normal-material [flatShading]="true" />
		</ngt-mesh>

		<ngts-trackball-controls [options]="{ makeDefault: true }" />
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsTrackballControls],
})
export class SceneGraph {}
