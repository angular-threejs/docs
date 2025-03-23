import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { SobaWrapper } from '@soba/wrapper.ts';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-grid-soba',
	template: `
		<ngt-canvas shadows [camera]="{ position: [10, 12, 12], fov: 25 }">
			<app-soba-wrapper *canvasContent [lights]="false" background="#303035" [grid]="false">
				<app-scene-graph [host]="host" />
			</app-soba-wrapper>
		</ngt-canvas>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'grid-demo relative block h-full' },
	imports: [NgtCanvas, SobaWrapper, SceneGraph],
})
export default class Grid {
	static clientProviders = [provideNgtRenderer()];

	protected host = inject(ElementRef);
}
