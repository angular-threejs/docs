import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtsCloud, NgtsCloudInstance } from 'angular-three-soba/staging';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngts-cloud [options]="{ opacity: 0.8, speed: 0.4, segments: 40 }">
			<ngts-cloud-instance [position]="[-4, -2, 0]" />
			<ngts-cloud-instance [position]="[4, 2, 0]" />
		</ngts-cloud>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtsCloud, NgtsCloudInstance],
})
export class SceneGraph {}
