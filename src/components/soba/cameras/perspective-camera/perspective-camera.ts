import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SobaWrapper } from '@soba/wrapper.ts';
import { NgtArgs } from 'angular-three';
import { NgtsPerspectiveCamera } from 'angular-three-soba/cameras';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';

import { positions } from '../positions';

@Component({
	selector: 'app-perspective-camera-demo',
	template: `
		<ngt-canvas>
			<app-soba-wrapper *canvasContent>
				<ngts-perspective-camera [options]="{ makeDefault: true, position: [0, 0, 10] }" />

				<ngt-group [position]="[0, 0, -10]">
					@for (position of positions; track position.id) {
						<ngt-mesh [position]="position.position">
							<ngt-icosahedron-geometry *args="[1, 1]" />
							<ngt-mesh-basic-material color="white" wireframe />
						</ngt-mesh>
					}
				</ngt-group>
			</app-soba-wrapper>
		</ngt-canvas>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtCanvas, NgtsPerspectiveCamera, NgtArgs, SobaWrapper],
})
export default class PerspectiveCamera {
	static clientProviders = [provideNgtRenderer()];

	protected readonly positions = positions;
}
