import { ChangeDetectionStrategy, Component, ElementRef, inject, signal } from '@angular/core';
import { SobaWrapper } from '@soba/wrapper.ts';
import { TweakpaneCheckbox, TweakpanePane } from 'angular-three-tweakpane';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-soba-billboard',
	template: `
		<ngt-canvas [camera]="{ position: [0, 5, 10] }">
			<app-soba-wrapper *canvasContent [controls]="null">
				<app-scene-graph [follow]="follow()" [lockX]="lockX()" [lockY]="lockY()" [lockZ]="lockZ()" />
			</app-soba-wrapper>
		</ngt-canvas>

		<tweakpane-pane title="Billboard" [container]="host">
			<tweakpane-checkbox [(value)]="follow" label="Follow" />
			<tweakpane-checkbox [(value)]="lockX" label="Lock X" />
			<tweakpane-checkbox [(value)]="lockY" label="Lock Y" />
			<tweakpane-checkbox [(value)]="lockZ" label="Lock Z" />
		</tweakpane-pane>
	`,
	host: { class: 'billboard-demo relative block h-full' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtCanvas, SobaWrapper, SceneGraph, TweakpanePane, TweakpaneCheckbox],
})
export default class Billboard {
	static clientProviders = [provideNgtRenderer()];

	protected host = inject(ElementRef);

	protected follow = signal(true);
	protected lockX = signal(false);
	protected lockY = signal(false);
	protected lockZ = signal(false);
}
