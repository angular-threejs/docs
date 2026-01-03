import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtsCloud, NgtsClouds } from 'angular-three-soba/staging';

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngts-clouds>
			<ngts-cloud [options]="{ position: [-6, 2, -3], color: '#ff1493' }" />
			<ngts-cloud [options]="{ position: [3, -1, 2], color: '#00ffff' }" />
			<ngts-cloud [options]="{ position: [-2, 3, -1], color: '#ff4500' }" />
			<ngts-cloud [options]="{ position: [5, 0, -2], color: '#7fff00' }" />
			<ngts-cloud [options]="{ position: [0, -2, 1], color: '#ff00ff' }" />
			<ngts-cloud [options]="{ position: [-4, -1, 3], color: '#00ff7f' }" />
			<ngts-cloud [options]="{ position: [2, 2, -4], color: '#ffff00' }" />
		</ngts-clouds>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtsCloud, NgtsClouds],
})
export class SceneGraph {}
