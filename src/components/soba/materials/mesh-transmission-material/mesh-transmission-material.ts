import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, signal } from '@angular/core';
import { SobaWrapper } from '@soba/wrapper';
import {
	TweakpaneCheckbox,
	TweakpaneColor,
	TweakpaneFolder,
	TweakpaneNumber,
	TweakpanePane,
} from 'angular-three-tweakpane';
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

		<tweakpane-pane title="MeshTransmissionMaterial" [container]="host">
			<tweakpane-number [(value)]="blur" label="blur" [params]="{ min: 0, max: 1, step: 0.1 }" />
			<tweakpane-folder title="material">
				<tweakpane-color [(value)]="background" label="background" />
				<tweakpane-checkbox [(value)]="backside" label="backside" />
				<tweakpane-number [(value)]="samples" label="samples" [params]="{ min: 1, max: 100, step: 1 }" />
				<tweakpane-number [(value)]="resolution" label="resolution" [params]="{ min: 1, max: 1000, step: 1 }" />
				<tweakpane-number
					[(value)]="transmission"
					label="transmission"
					[params]="{ min: 0, max: 10, step: 0.1 }"
				/>
				<tweakpane-number [(value)]="roughness" label="roughness" [params]="{ min: 0, max: 1, step: 0.1 }" />
				<tweakpane-number [(value)]="thickness" label="thickness" [params]="{ min: 0, max: 10, step: 0.1 }" />
				<tweakpane-number [(value)]="ior" label="ior" [params]="{ min: 0, max: 10, step: 0.1 }" />
				<tweakpane-number
					[(value)]="chromaticAberration"
					label="chromaticAberration"
					[params]="{ min: 0, max: 10, step: 0.1 }"
				/>
				<tweakpane-number [(value)]="anisotropy" label="anisotropy" [params]="{ min: 0, max: 10, step: 0.1 }" />
				<tweakpane-number [(value)]="distortion" label="distortion" [params]="{ min: 0, max: 10, step: 0.1 }" />
				<tweakpane-number
					[(value)]="distortionScale"
					label="distortionScale"
					[params]="{ min: 0, max: 10, step: 0.1 }"
				/>
				<tweakpane-number
					[(value)]="temporalDistortion"
					label="temporalDistortion"
					[params]="{ min: 0, max: 10, step: 0.1 }"
				/>
				<tweakpane-number [(value)]="clearcoat" label="clearcoat" [params]="{ min: 0, max: 10, step: 0.1 }" />
				<tweakpane-number
					[(value)]="attenuationDistance"
					label="attenuationDistance"
					[params]="{ min: 0, max: 10, step: 0.1 }"
				/>
				<tweakpane-color [(value)]="attenuationColor" label="attenuationColor" />
			</tweakpane-folder>
		</tweakpane-pane>
	`,
	host: { class: 'mesh-transmission-material-demo relative block h-full' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		NgtCanvas,
		SceneGraph,
		SobaWrapper,
		TweakpanePane,
		TweakpaneNumber,
		TweakpaneFolder,
		TweakpaneCheckbox,
		TweakpaneColor,
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
