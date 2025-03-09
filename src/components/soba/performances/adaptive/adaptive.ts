import { ChangeDetectionStrategy, Component, ElementRef, inject, signal } from '@angular/core';
import { SobaWrapper } from '@soba/wrapper.ts';
import { NgtTweakCheckbox, NgtTweakPane } from 'angular-three-tweakpane';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-adaptive-soba',
	template: `
		<ngt-canvas [camera]="{ position: [0, 0, 30], fov: 50 }" [performance]="{ min: 0.2 }">
			<app-soba-wrapper *canvasContent [grid]="false" [controls]="null" [lights]="false">
				<app-scene-graph [pixelated]="pixelated()" />
			</app-soba-wrapper>
		</ngt-canvas>

		<ngt-tweak-pane title="Adaptive" [container]="host">
			<ngt-tweak-checkbox [(value)]="pixelated" label="pixelated" />
		</ngt-tweak-pane>
	`,
	host: { class: 'adaptive-demo relative block h-full' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtCanvas, SobaWrapper, SceneGraph, NgtTweakPane, NgtTweakCheckbox],
})
export default class Adaptive {
	static clientProviders = [provideNgtRenderer()];

	protected host = inject(ElementRef);
	protected pixelated = signal(true);
}
