import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, signal } from '@angular/core';
import { SobaWrapper } from '@soba/wrapper.ts';
import { NgtArgs } from 'angular-three';
import { NgtsGradientTexture } from 'angular-three-soba/abstractions';
import { NgtsMeshWobbleMaterial } from 'angular-three-soba/materials';
import { NgtsFloat } from 'angular-three-soba/staging';
import { TweakpaneColor, TweakpaneNumber, TweakpanePane } from 'angular-three-tweakpane';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import * as THREE from 'three';

@Component({
	selector: 'app-gradient-texture-soba',
	template: `
		<ngt-canvas>
			<app-soba-wrapper *canvasContent>
				<ngts-float>
					<ngt-mesh [scale]="[2, 4, 1]">
						<ngt-plane-geometry *args="[1, 1, 32, 32]" />
						<ngts-mesh-wobble-material [options]="{ side: DoubleSide }">
							<ngts-gradient-texture
								[stops]="[0, midPoint(), 1]"
								[colors]="[startColor(), midColor(), endColor()]"
								[options]="{ size: 100 }"
							/>
						</ngts-mesh-wobble-material>
					</ngt-mesh>
				</ngts-float>
			</app-soba-wrapper>
		</ngt-canvas>

		<tweakpane-pane title="GradientTexture" [container]="host">
			<tweakpane-color [(value)]="startColor" label="startColor" />
			<tweakpane-color [(value)]="midColor" label="midColor" />
			<tweakpane-color [(value)]="endColor" label="endColor" />
			<tweakpane-number [(value)]="midPoint" label="midPoint" [params]="{ min: 0.05, max: 0.95, step: 0.01 }" />
		</tweakpane-pane>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	host: { class: 'gradient-texture-demo relative block h-full' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		NgtCanvas,
		SobaWrapper,
		NgtsFloat,
		NgtsMeshWobbleMaterial,
		NgtsGradientTexture,
		NgtArgs,
		TweakpanePane,
		TweakpaneColor,
		TweakpaneNumber,
	],
})
export default class GradientTexture {
	static clientProviders = [provideNgtRenderer()];

	protected readonly DoubleSide = THREE.DoubleSide;

	protected host = inject(ElementRef);

	protected startColor = signal('#e63946');
	protected midColor = signal('#f1faee');
	protected endColor = signal('#a8dadc');
	protected midPoint = signal(0.8);
}
