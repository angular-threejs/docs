import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtsRoundedBox } from 'angular-three-soba/abstractions';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngts-rounded-box [options]="{ args: [1.5, 1.5, 1.5], radius: 0.1, smoothness: 4 }">
			<ngt-mesh-standard-material color="#ff6b6b" [metalness]="0.5" [roughness]="0.3" />
		</ngts-rounded-box>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtsRoundedBox],
})
export class SceneGraph {}
