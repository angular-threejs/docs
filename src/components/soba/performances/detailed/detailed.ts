import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SobaWrapper } from '@soba/wrapper.ts';
import { NgtArgs } from 'angular-three';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { NgtsDetailed } from 'angular-three-soba/performances';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';

@Component({
	selector: 'app-detailed-soba',
	template: `
		<ngt-canvas [camera]="{ position: [0, 0, 100] }">
			<app-soba-wrapper *canvasContent [controls]="null" [grid]="false">
				<ngts-detailed [distances]="[0, 50, 150]">
					<ngt-mesh>
						<ngt-icosahedron-geometry *args="[10, 3]" />
						<ngt-mesh-basic-material color="hotpink" wireframe />
					</ngt-mesh>

					<ngt-mesh>
						<ngt-icosahedron-geometry *args="[10, 2]" />
						<ngt-mesh-basic-material color="lightgreen" wireframe />
					</ngt-mesh>

					<ngt-mesh>
						<ngt-icosahedron-geometry *args="[10, 1]" />
						<ngt-mesh-basic-material color="lightblue" wireframe />
					</ngt-mesh>
				</ngts-detailed>

				<ngts-orbit-controls [options]="{ enablePan: false, enableRotate: false, zoomSpeed: 0.5 }" />
			</app-soba-wrapper>
		</ngt-canvas>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtCanvas, NgtsDetailed, NgtArgs, NgtsOrbitControls, SobaWrapper],
})
export default class Detailed {
	static clientProviders = [provideNgtRenderer()];
}
