import { ChangeDetectionStrategy, Component, ElementRef, inject, signal } from '@angular/core';
import { SobaWrapper } from '@soba/wrapper.ts';
import { TweakpaneList, TweakpanePane } from 'angular-three-tweakpane';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-soba-animations',
	template: `
		<ngt-canvas [camera]="{ position: [0, 2, 4] }">
			<app-soba-wrapper *canvasContent>
				<app-scene-graph [animation]="animation()" />
			</app-soba-wrapper>
		</ngt-canvas>

		<tweakpane-pane title="Animations" [container]="host">
			<tweakpane-list [(value)]="animation" label="animation" [options]="['Dance', 'Idle', 'Strut']" />
		</tweakpane-pane>
	`,
	imports: [NgtCanvas, SobaWrapper, SceneGraph, TweakpaneList, TweakpanePane],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'animations-demo relative block h-full' },
})
export default class Animations {
	static clientProviders = [provideNgtRenderer()];

	protected host = inject(ElementRef);
	protected animation = signal<'Dance' | 'Idle' | 'Strut'>('Strut');
}
