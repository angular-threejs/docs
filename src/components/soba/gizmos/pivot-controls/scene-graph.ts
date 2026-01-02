import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtsPivotControls } from 'angular-three-soba/gizmos';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngts-pivot-controls
			[options]="{
				anchor: [-1, -1, -1],
				scale: 0.75,
				depthTest: false,
				annotations: true,
			}"
		>
			<ngt-mesh>
				<ngt-box-geometry *args="[1.5, 1.5, 1.5]" />
				<ngt-mesh-normal-material />
			</ngt-mesh>
		</ngts-pivot-controls>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtArgs, NgtsPivotControls],
})
export class SceneGraph {}
