import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtsSparkles } from 'angular-three-soba/staging';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngts-sparkles
			[options]="{
				count: 100,
				scale: 4,
				size: 6,
				speed: 0.4,
				color: '#ffa0e0',
			}"
		/>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtsSparkles],
})
export class SceneGraph {}
