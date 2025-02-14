import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, signal } from '@angular/core';
import { NgtsStats } from 'angular-three-soba/stats';
import { NgtTweakCheckbox, NgtTweakPane } from 'angular-three-tweakpane';
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

				<ngt-tweak-pane title="On-demand Rendering">
					<ngt-tweak-checkbox [(value)]="onDemand" label="Enabled" />
				</ngt-tweak-pane>
			</ng-template>
		</ngt-canvas>
	`,
	imports: [NgtCanvas, SceneGraph, NgtsStats, NgtTweakPane, NgtTweakCheckbox],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'color-grading-demo relative block h-full !mt-0' },
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
