import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PostprocessingWrapper } from '@postprocessing/wrapper.ts';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-tone-mapping',
	template: `
		<ngt-canvas [camera]="{ position: [0, 0, 5], fov: 50 }">
			<app-postprocessing-wrapper *canvasContent [lights]="false" background="#111">
				<app-scene-graph />
			</app-postprocessing-wrapper>
		</ngt-canvas>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'tone-mapping-demo relative block h-full' },
	imports: [NgtCanvas, PostprocessingWrapper, SceneGraph],
})
export default class ToneMapping {
	static clientProviders = [provideNgtRenderer()];
}
