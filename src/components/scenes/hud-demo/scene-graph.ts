import {
	ChangeDetectionStrategy,
	Component,
	computed,
	CUSTOM_ELEMENTS_SCHEMA,
	ElementRef,
	inject,
	input,
	signal,
	viewChild,
} from '@angular/core';
import { extend, injectBeforeRender, injectStore, NgtArgs, NgtPortal, NgtPortalAutoRender } from 'angular-three';
import { NgtsText } from 'angular-three-soba/abstractions';
import { NgtsOrthographicCamera, NgtsPerspectiveCamera } from 'angular-three-soba/cameras';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { NgtsEnvironment, NgtsRenderTexture, NgtsRenderTextureContent } from 'angular-three-soba/staging';
import * as THREE from 'three';

@Component({
	selector: 'app-torus',
	template: `
		<ngt-mesh [scale]="scale()" (pointerover)="hovered.set(true)" (pointerout)="hovered.set(false)">
			<ngt-torus-geometry *args="[1, 0.25, 32, 100]" />
			<ngt-mesh-standard-material [color]="color()" />
		</ngt-mesh>
	`,
	imports: [NgtArgs],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Torus {
	scale = input(1);

	protected hovered = signal(false);
	protected color = computed(() => (this.hovered() ? 'mediumpurple' : 'orange'));
}

@Component({
	selector: 'app-face-material',
	template: `
		<ngt-mesh-standard-material [attach]="['material', index()]" [color]="color()">
			<ngts-render-texture [options]="{ frames: 6, anisotropy: 16 }">
				<ng-template renderTextureContent>
					<ngt-color *args="['white']" attach="background" />
					<ngts-orthographic-camera
						[options]="{
							makeDefault: true,
							left: -1,
							right: 1,
							top: 1,
							bottom: -1,
							position: [0, 0, 10],
							zoom: 0.5,
						}"
					/>
					<ngts-text
						[text]="text()"
						[options]="{
							color: 'black',
							font: 'https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff',
						}"
					/>
				</ng-template>
			</ngts-render-texture>
		</ngt-mesh-standard-material>
	`,
	imports: [NgtsText, NgtsRenderTexture, NgtsOrthographicCamera, NgtArgs, NgtsRenderTextureContent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaceMaterial {
	index = input.required<number>();
	text = input.required<string>();

	private box = inject(Box);
	protected color = computed(() => (this.box.isHovered() === this.index() ? 'mediumpurple' : 'orange'));
}

@Component({
	selector: 'app-box',
	template: `
		<ngt-mesh
			#mesh
			[position]="position()"
			[scale]="scale()"
			(click)="clicked.set(!clicked())"
			(pointermove)="$event.stopPropagation(); hovered.set($event.face.materialIndex)"
			(pointerout)="hovered.set(-1)"
		>
			<ngt-box-geometry />
			@for (face of faces; track face) {
				<app-face-material [index]="$index" [text]="face" />
			}
		</ngt-mesh>
	`,
	imports: [FaceMaterial],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Box {
	position = input([0, 0, 0]);

	mesh = viewChild.required<ElementRef<THREE.Mesh>>('mesh');

	protected hovered = signal(-1);
	isHovered = this.hovered.asReadonly();
	protected clicked = signal(false);
	protected scale = computed(() => (this.clicked() ? 1.5 : 1));

	protected faces = ['front', 'back', 'top', 'bottom', 'left', 'right'];
}

@Component({
	selector: 'app-view-cube',
	template: `
		<ngt-portal [container]="scene()" autoRender>
			<ng-template portalContent>
				<ngt-ambient-light [intensity]="Math.PI / 2" />
				<ngt-spot-light
					[position]="[10, 10, 10]"
					[angle]="0.15"
					[penumbra]="0"
					[decay]="0"
					[intensity]="Math.PI"
				/>
				<ngt-point-light [position]="[-10, -10, -10]" [decay]="0" [intensity]="Math.PI" />
				<ngts-perspective-camera [options]="{ makeDefault: true, position: [0, 0, 10] }" />
				<app-box [position]="boxPosition()" />
				<ngt-ambient-light [intensity]="1" />
				<ngt-point-light [position]="[200, 200, 100]" [intensity]="0.5" />
			</ng-template>
		</ngt-portal>
	`,
	imports: [Box, NgtPortal, NgtsPerspectiveCamera, NgtPortalAutoRender],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewCube {
	protected readonly Math = Math;

	private box = viewChild(Box);

	private store = injectStore();

	protected boxPosition = computed(() => [
		this.store.viewport.width() / 2 - 1,
		this.store.viewport.height() / 2 - 1,
		0,
	]);

	protected scene = computed(() => {
		const scene = new THREE.Scene();
		scene.name = 'hud-view-cube-virtual-scene';
		return scene;
	});

	constructor() {
		const matrix = new THREE.Matrix4();
		injectBeforeRender(() => {
			const box = this.box()?.mesh().nativeElement;
			if (box) {
				matrix.copy(this.store.snapshot.camera.matrix).invert();
				box.quaternion.setFromRotationMatrix(matrix);
			}
		});
	}
}

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-ambient-light [intensity]="0.5 * Math.PI" />

		<app-torus [scale]="1.75" />
		<app-view-cube />

		<ngts-orbit-controls />
		<ngts-environment [options]="{ preset: 'city' }" />
	`,
	imports: [NgtsOrbitControls, NgtsEnvironment, Torus, ViewCube],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneGraph {
	protected readonly Math = Math;

	constructor() {
		extend(THREE);
	}
}
