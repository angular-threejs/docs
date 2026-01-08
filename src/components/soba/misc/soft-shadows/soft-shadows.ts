import { ChangeDetectionStrategy, Component, ElementRef, inject, signal } from '@angular/core';
import { TweakpaneCheckbox, TweakpanePane } from 'angular-three-tweakpane';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-soft-shadows',
	template: `
		<ngt-canvas [shadows]="true" [camera]="{ position: [5, 5, 5], fov: 50 }">
			<app-scene-graph *canvasContent [enabled]="enabled()" />
		</ngt-canvas>

		<tweakpane-pane title="Soft Shadows" [container]="host">
			<tweakpane-checkbox [(value)]="enabled" label="enabled" />
		</tweakpane-pane>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'soft-shadows-demo relative block h-full' },
	imports: [NgtCanvas, SceneGraph, TweakpanePane, TweakpaneCheckbox],
})
export default class SoftShadows {
	static clientProviders = [provideNgtRenderer()];

	protected host = inject(ElementRef);
	protected enabled = signal(true);
}
