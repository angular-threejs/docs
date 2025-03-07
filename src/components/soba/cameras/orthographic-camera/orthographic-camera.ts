import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { NgtsOrthographicCamera } from 'angular-three-soba/cameras';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';

import { SobaWrapper } from '@soba/wrapper.ts';
import { positions } from '../positions';

@Component({
	selector: 'app-orthographic-camera-demo',
	template: `
		<ngt-canvas>
			<app-soba-wrapper *canvasContent>
				<ngts-orthographic-camera [options]="{ makeDefault: true, zoom: 40, position: [0, 0, 10] }" />

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
	imports: [NgtCanvas, NgtArgs, NgtsOrthographicCamera, SobaWrapper],
})
export default class OrthographicCamera {
	static clientProviders = [provideNgtRenderer()];

	protected readonly positions = positions;
}
