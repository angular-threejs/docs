import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, signal } from '@angular/core';
import { SobaWrapper } from '@soba/wrapper';
import { NgtTweakCheckbox, NgtTweakColor, NgtTweakFolder, NgtTweakNumber, NgtTweakPane } from 'angular-three-tweakpane';
import { NgtCanvas, provideNgtRenderer } from 'angular-three/dom';
import { SceneGraph } from './scene-graph';

@Component({
	selector: 'app-soba-mesh-transmission-material',
	template: `
		<ngt-canvas shadows [camera]="{ position: [15, 0, 15], fov: 25 }">
			<app-soba-wrapper *canvasContent [grid]="false" [controls]="null">
				<app-scene-graph [blur]="blur()" [options]="materialOptions()" />
			</app-soba-wrapper>
		</ngt-canvas>

		<ngt-tweak-pane title="MeshTransmissionMaterial" [container]="host">
			<ngt-tweak-number [(value)]="blur" label="blur" [params]="{ min: 0, max: 1, step: 0.1 }" />
			<ngt-tweak-folder title="material">
				<ngt-tweak-color [(value)]="background" label="background" />
				<ngt-tweak-checkbox [(value)]="backside" label="backside" />
				<ngt-tweak-number [(value)]="samples" label="samples" [params]="{ min: 1, max: 100, step: 1 }" />
				<ngt-tweak-number [(value)]="resolution" label="resolution" [params]="{ min: 1, max: 1000, step: 1 }" />
				<ngt-tweak-number
					[(value)]="transmission"
					label="transmission"
					[params]="{ min: 0, max: 10, step: 0.1 }"
				/>
				<ngt-tweak-number [(value)]="roughness" label="roughness" [params]="{ min: 0, max: 1, step: 0.1 }" />
				<ngt-tweak-number [(value)]="thickness" label="thickness" [params]="{ min: 0, max: 10, step: 0.1 }" />
				<ngt-tweak-number [(value)]="ior" label="ior" [params]="{ min: 0, max: 10, step: 0.1 }" />
				<ngt-tweak-number
					[(value)]="chromaticAberration"
					label="chromaticAberration"
					[params]="{ min: 0, max: 10, step: 0.1 }"
				/>
				<ngt-tweak-number [(value)]="anisotropy" label="anisotropy" [params]="{ min: 0, max: 10, step: 0.1 }" />
				<ngt-tweak-number [(value)]="distortion" label="distortion" [params]="{ min: 0, max: 10, step: 0.1 }" />
				<ngt-tweak-number
					[(value)]="distortionScale"
					label="distortionScale"
					[params]="{ min: 0, max: 10, step: 0.1 }"
				/>
				<ngt-tweak-number
					[(value)]="temporalDistortion"
					label="temporalDistortion"
					[params]="{ min: 0, max: 10, step: 0.1 }"
				/>
				<ngt-tweak-number [(value)]="clearcoat" label="clearcoat" [params]="{ min: 0, max: 10, step: 0.1 }" />
				<ngt-tweak-number
					[(value)]="attenuationDistance"
					label="attenuationDistance"
					[params]="{ min: 0, max: 10, step: 0.1 }"
				/>
				<ngt-tweak-color [(value)]="attenuationColor" label="attenuationColor" />
			</ngt-tweak-folder>
		</ngt-tweak-pane>
	`,
	host: { class: 'mesh-transmission-material-demo relative block h-full' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		NgtCanvas,
		SceneGraph,
		SobaWrapper,
		NgtTweakPane,
		NgtTweakNumber,
		NgtTweakFolder,
		NgtTweakCheckbox,
		NgtTweakColor,
	],
})
export default class MeshTransmissionMaterial {
	static clientProviders = [provideNgtRenderer()];

	protected host = inject(ElementRef);
	protected blur = signal(0.1);
	protected background = signal('#839681');
	protected backside = signal(false);
	protected samples = signal(10);
	protected resolution = signal(2048);
	protected transmission = signal(1);
	protected roughness = signal(0);
	protected thickness = signal(3.5);
	protected ior = signal(1.5);
	protected chromaticAberration = signal(0.06);
	protected anisotropy = signal(0.1);
	protected distortion = signal(0.0);
	protected distortionScale = signal(0.3);
	protected temporalDistortion = signal(0.5);
	protected clearcoat = signal(1);
	protected attenuationDistance = signal(0.5);
	protected attenuationColor = signal('#ffffff');
	protected color = signal('#c9ffa1');

	protected materialOptions = computed(() => ({
		background: this.background(),
		backside: this.backside(),
		samples: this.samples(),
		resolution: this.resolution(),
		transmission: this.transmission(),
		roughness: this.roughness(),
		thickness: this.thickness(),
		ior: this.ior(),
		chromaticAberration: this.chromaticAberration(),
		anisotropy: this.anisotropy(),
		distortion: this.distortion(),
		distortionScale: this.distortionScale(),
		temporalDistortion: this.temporalDistortion(),
		clearcoat: this.clearcoat(),
		attenuationDistance: this.attenuationDistance(),
		attenuationColor: this.attenuationColor(),
		color: this.color(),
	}));
}
