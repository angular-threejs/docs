import { ChangeDetectionStrategy, Component, ElementRef, inject, signal } from '@angular/core';
import { SobaWrapper } from '@soba/wrapper.ts';
import { NgtTweakNumber, NgtTweakPane } from 'angular-three-tweakpane';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-soba-text',
	template: `
		<ngt-canvas [camera]="{ position: [0, 2, 35], fov: 90 }">
			<app-soba-wrapper *canvasContent [grid]="false" [controls]="null">
				<app-scene-graph [count]="count()" [radius]="radius()" />
			</app-soba-wrapper>
		</ngt-canvas>

		<ngt-tweak-pane title="Text" [container]="host">
			<ngt-tweak-number [(value)]="count" label="word count param" [params]="{ min: 1, max: 10, step: 1 }" />
			<ngt-tweak-number [(value)]="radius" label="sphere radius" [params]="{ min: 10, max: 100, step: 1 }" />
		</ngt-tweak-pane>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtCanvas, SobaWrapper, SceneGraph, NgtTweakPane, NgtTweakNumber],
	host: { class: 'text-demo relative block h-full' },
})
export default class Text {
	static clientProviders = [provideNgtRenderer()];

	protected host = inject(ElementRef);

	protected count = signal(8);
	protected radius = signal(20);
}
