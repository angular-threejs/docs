import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtsSegment, NgtsSegments } from 'angular-three-soba/performances';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngts-segments [options]="{ limit: 100, lineWidth: 2 }">
			@for (segment of segments; track $index) {
				<ngts-segment [start]="segment.start" [end]="segment.end" [color]="segment.color" />
			}
		</ngts-segments>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtsSegments, NgtsSegment],
})
export class SceneGraph {
	segments: { start: [number, number, number]; end: [number, number, number]; color: string }[] = [];

	constructor() {
		const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d'];
		for (let i = 0; i < 20; i++) {
			this.segments.push({
				start: [(Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4],
				end: [(Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4],
				color: colors[Math.floor(Math.random() * colors.length)],
			});
		}
	}
}
