import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, signal } from '@angular/core';
import { NgtsStats } from 'angular-three-soba/stats';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { ToggleButton } from '../toggle-button';
import { SceneGraph } from './scene-graph';

@Component({
	template: `
		<ngt-canvas
			[stats]="{ parent: host, domClass: 'stats' }"
			[frameloop]="frameloop()"
			[camera]="{ position: [0, 0, 3], fov: 45 }"
		>
			<app-scene-graph *canvasContent />
		</ngt-canvas>
		<button [(toggleButton)]="onDemand" class="absolute right-4 top-4">on-demand renderering</button>
	`,
	imports: [NgtCanvas, SceneGraph, NgtsStats, ToggleButton],
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
