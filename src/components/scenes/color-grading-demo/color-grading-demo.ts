import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, signal } from '@angular/core';
import { NgtsStats } from 'angular-three-soba/stats';
import { TweakpaneCheckbox, TweakpanePane } from 'angular-three-tweakpane';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	template: `
		<ngt-canvas
			[stats]="{ parent: host, domClass: 'stats' }"
			[frameloop]="frameloop()"
			[camera]="{ position: [0, 0, 3], fov: 45 }"
		>
			<ng-template canvasContent>
				<app-scene-graph />

				<tweakpane-pane title="On-demand Rendering" [container]="host">
					<tweakpane-checkbox [(value)]="onDemand" label="Enabled" />
				</tweakpane-pane>
			</ng-template>
		</ngt-canvas>
	`,
	imports: [NgtCanvas, SceneGraph, NgtsStats, TweakpanePane, TweakpaneCheckbox],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'color-grading-demo relative block h-full' },
	styles: `
		:host {
			& .stats {
				position: static !important;

				& canvas {
					margin-top: 0 !important;
				}
			}
		}
	`,
})
export default class ColorGradingDemo {
	static clientProviders = [provideNgtRenderer()];

	protected host = inject(ElementRef);
	protected onDemand = signal(true);
	protected frameloop = computed(() => (this.onDemand() ? 'demand' : 'always'));
}
