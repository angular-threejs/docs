import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	ElementRef,
	input,
	signal,
	viewChild,
} from '@angular/core';
import { injectStore, type NgtEuler } from 'angular-three';
import { NgtsGrid } from 'angular-three-soba/abstractions';
import { NgtsCameraControls } from 'angular-three-soba/controls';
import { injectGLTF } from 'angular-three-soba/loaders';
import { NgtsAccumulativeShadows, NgtsCenter, NgtsEnvironment, NgtsRandomizedLights } from 'angular-three-soba/staging';
import {
	TweakpaneButton,
	TweakpaneCheckbox,
	TweakpaneFolder,
	TweakpaneNumber,
	TweakpanePane,
	TweakpanePoint,
} from 'angular-three-tweakpane';
import * as THREE from 'three';

import suziGLB from '@common-assets/suzanne.glb' with { loader: 'file' };

@Component({
	selector: 'app-suzi',
	template: `
		@if (gltf(); as gltf) {
			<ngt-mesh
				#mesh
				[geometry]="gltf.meshes['Suzanne'].geometry"
				[rotation]="rotation()"
				castShadow
				receiveShadow
			>
				<ngt-mesh-standard-material color="#9d4b4b" />
			</ngt-mesh>
		}
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Suzi {
	rotation = input<NgtEuler>([0, 0, 0]);

	protected gltf = injectGLTF(() => suziGLB);

	meshRef = viewChild<ElementRef<THREE.Mesh>>('mesh');
}

@Component({
	selector: 'app-ground',
	template: `
		<ngts-grid
			[options]="{
				planeArgs: [10.5, 10.5],
				position: [0, -0.01, 0],
				cellSize: 0.5,
				cellThickness: 0.5,
				cellColor: '#6f6f6f',
				sectionSize: 3,
				sectionThickness: 1,
				sectionColor: '#9d4b4b',
				fadeDistance: 30,
				fadeStrength: 1,
				followCamera: false,
				infiniteGrid: true,
			}"
		/>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtsGrid],
})
export class Ground {}

@Component({
	selector: 'app-shadows',
	template: `
		<ngts-accumulative-shadows
			[options]="{ temporal: true, frames: 100, color: '#9d4b4b', colorBlend: 0.5, alphaTest: 0.9, scale: 20 }"
		>
			<ngts-randomized-lights [options]="{ amount: 8, radius: 4, position: [5, 5, -10] }" />
		</ngts-accumulative-shadows>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtsAccumulativeShadows, NgtsRandomizedLights],
})
export class Shadows {}

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-group [position.y]="-0.5">
			<ngts-center [options]="{ top: true }">
				<app-suzi #suzi [rotation]="[-0.63, 0, 0]" />
			</ngts-center>
			<app-ground />
			<app-shadows />
			<ngts-camera-controls
				#cameraControls
				[options]="{
					minDistance: minDistance(),
					verticalDragToForward: verticalDragToForward(),
					dollyToCursor: dollyToCursor(),
					infinityDolly: infinityDolly(),
				}"
			/>
			<ngts-environment [options]="{ preset: 'city' }" />
		</ngt-group>

		@let controls = cameraControls.controls();
		@let mesh = suzi.meshRef()?.nativeElement;
		@let camera = store.camera();

		<tweakpane-pane title="Camera Controls" [container]="host()">
			<tweakpane-folder title="rotate theta">
				<tweakpane-button title="+45º" (click)="controls.rotate(45 * DEG2RAD, 0, true)" />
				<tweakpane-button title="-90º" (click)="controls.rotate(-90 * DEG2RAD, 0, true)" />
				<tweakpane-button title="+360º" (click)="controls.rotate(360 * DEG2RAD, 0, true)" />
			</tweakpane-folder>
			<tweakpane-folder title="rotate phi">
				<tweakpane-button title="+20º" (click)="controls.rotate(0, 20 * DEG2RAD, true)" />
				<tweakpane-button title="-40º" (click)="controls.rotate(0, -40 * DEG2RAD, true)" />
			</tweakpane-folder>
			<tweakpane-folder title="truck">
				<tweakpane-button title="(1,0)" (click)="controls.truck(1, 0, true)" />
				<tweakpane-button title="(0,1)" (click)="controls.truck(0, 1, true)" />
				<tweakpane-button title="(-1,-1)" (click)="controls.truck(-1, -1, true)" />
			</tweakpane-folder>
			<tweakpane-folder title="dolly">
				<tweakpane-button title="1" (click)="controls.dolly(1, true)" />
				<tweakpane-button title="-1" (click)="controls.dolly(-1, true)" />
			</tweakpane-folder>
			<tweakpane-folder title="zoom">
				<tweakpane-button title="/2" (click)="controls.zoom(camera.zoom / 2, true)" />
				<tweakpane-button title="/-2" (click)="controls.zoom(-camera.zoom / 2, true)" />
			</tweakpane-folder>
			<tweakpane-number [(value)]="minDistance" label="minDistance" />
			<tweakpane-folder title="moveTo">
				<tweakpane-point [(value)]="moveToVec" label="vec" />
				@let moveTo = moveToVec();
				<tweakpane-button
					title="moveTo(…vec)"
					(click)="controls.moveTo(moveTo[0], moveTo[1], moveTo[2], true)"
				/>
			</tweakpane-folder>
			<tweakpane-button title="fitToBox(mesh)" (click)="controls.fitToBox(mesh, true)" />
			<tweakpane-folder title="setPosition">
				<tweakpane-point [(value)]="setPositionVec" label="vec" />
				@let setPosition = setPositionVec();
				<tweakpane-button
					title="setPosition(…vec)"
					(click)="controls.setPosition(setPosition[0], setPosition[1], setPosition[2], true)"
				/>
			</tweakpane-folder>
			<tweakpane-folder title="setTarget">
				<tweakpane-point [(value)]="setTargetVec" label="vec" />
				@let setTarget = setTargetVec();
				<tweakpane-button
					title="setTarget(…vec)"
					(click)="controls.setTarget(setTarget[0], setTarget[1], setTarget[2], true)"
				/>
			</tweakpane-folder>
			<tweakpane-folder title="setLookAt">
				<tweakpane-point [(value)]="setLookAtVec.position" label="position" />
				<tweakpane-point [(value)]="setLookAtVec.target" label="target" />
				@let setLookAtPosition = setLookAtVec.position();
				@let setLookAtTarget = setLookAtVec.target();
				<tweakpane-button
					title="setLookAt(…position, …target)"
					(click)="
						controls.setLookAt(
							setLookAtPosition[0],
							setLookAtPosition[1],
							setLookAtPosition[2],
							setLookAtTarget[0],
							setLookAtTarget[1],
							setLookAtTarget[2],
							true
						)
					"
				/>
			</tweakpane-folder>
			<tweakpane-folder title="lerpLookAt">
				<tweakpane-point [(value)]="lerpLookAt.posA" label="posA" />
				<tweakpane-point [(value)]="lerpLookAt.targetA" label="targetA" />
				<tweakpane-point [(value)]="lerpLookAt.posB" label="posB" />
				<tweakpane-point [(value)]="lerpLookAt.targetB" label="targetB" />
				<tweakpane-number [(value)]="lerpLookAt.t" label="t" [params]="{ min: 0, max: 1 }" />

				@let posA = lerpLookAt.posA();
				@let targetA = lerpLookAt.targetA();
				@let posB = lerpLookAt.posB();
				@let targetB = lerpLookAt.targetB();
				@let t = lerpLookAt.t();
				<tweakpane-button
					title="lerpLookAt(…posA,…targetA,…posB,…targetB,t)"
					(click)="
						controls.lerpLookAt(
							posA[0],
							posA[1],
							posA[2],
							targetA[0],
							targetA[1],
							targetA[2],
							posB[0],
							posB[1],
							posB[2],
							targetB[0],
							targetB[1],
							targetB[2],
							t,
							true
						)
					"
				/>
			</tweakpane-folder>
			<tweakpane-button title="saveState()" (click)="controls.saveState()" />
			<tweakpane-button title="reset()" (click)="controls.reset(true)" />
			<tweakpane-checkbox [(value)]="verticalDragToForward" label="verticalDragToForward" />
			<tweakpane-checkbox [(value)]="dollyToCursor" label="dollyToCursor" />
			<tweakpane-checkbox [(value)]="infinityDolly" label="infinityDolly" />
		</tweakpane-pane>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [
		NgtsCenter,
		Suzi,
		Ground,
		Shadows,
		NgtsCameraControls,
		NgtsEnvironment,
		TweakpanePane,
		TweakpaneNumber,
		TweakpaneCheckbox,
		TweakpaneFolder,
		TweakpaneButton,
		TweakpanePoint,
		// TweakpaneNumber,
		// TweakpaneCheckbox,
	],
})
export class SceneGraph {
	host = input.required<ElementRef>();

	protected store = injectStore();

	protected minDistance = signal(0);
	protected moveToVec = signal([3, 5, 2]);
	protected setPositionVec = signal([-5, 2, 1]);
	protected setTargetVec = signal([3, 0, -3]);
	protected setLookAtVec = { position: signal([1, 2, 3]), target: signal([1, 1, 0]) };
	protected lerpLookAt = {
		posA: signal([-2, 0, 0]),
		targetA: signal([1, 1, 0]),
		posB: signal([0, 2, 5]),
		targetB: signal([-1, 0, 0]),
		t: signal(Math.random()),
	};
	protected verticalDragToForward = signal(false);
	protected dollyToCursor = signal(false);
	protected infinityDolly = signal(false);

	protected readonly DEG2RAD = THREE.MathUtils.DEG2RAD;
}
