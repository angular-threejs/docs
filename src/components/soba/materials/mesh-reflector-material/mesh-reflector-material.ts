import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SobaWrapper } from '@soba/wrapper.ts';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-mesh-reflector-material',
	template: `
		<ngt-canvas [camera]="{ position: [0, 2, 5], fov: 50 }">
			<app-soba-wrapper *canvasContent [grid]="false">
				<app-scene-graph />
			</app-soba-wrapper>
		</ngt-canvas>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'mesh-reflector-material-demo relative block h-full' },
	imports: [NgtCanvas, SobaWrapper, SceneGraph],
})
export default class MeshReflectorMaterial {
	static clientProviders = [provideNgtRenderer()];
}
