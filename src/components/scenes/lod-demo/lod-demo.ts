import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { NgtsLoader } from 'angular-three-soba/loaders';
import { NgtsStats } from 'angular-three-soba/stats';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	template: `
		<ngt-canvas
			frameloop="demand"
			[stats]="{ parent: host, domClass: 'stats' }"
			[camera]="{ position: [0, 0, 40] }"
		>
			<app-scene-graph *canvasContent />
		</ngt-canvas>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtCanvas, NgtsLoader, NgtsStats, SceneGraph],
	host: { class: 'lod-demo relative block h-full !mt-0' },
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
export default class LOD {
	static clientProviders = [provideNgtRenderer()];

	protected host = inject(ElementRef);
}
