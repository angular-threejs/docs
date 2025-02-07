import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	Directive,
	ElementRef,
	inject,
	input,
	viewChild,
} from '@angular/core';
import { extend, injectBeforeRender, injectStore, NgtArgs, type NgtVector3 } from 'angular-three';
import { NgtpBloom, NgtpEffectComposer } from 'angular-three-postprocessing';
import { NgtsText } from 'angular-three-soba/abstractions';
import { injectGLTF } from 'angular-three-soba/loaders';
import { NgtsAdaptiveDpr } from 'angular-three-soba/performances';
import * as THREE from 'three';
import { FlakesTexture, RectAreaLightUniformsLib } from 'three-stdlib';

import botGLB from './untitled-draco2.glb' with { loader: 'file' };

// Credits: https://codesandbox.io/p/sandbox/pz0q6?file=/src/App.js:1,1-115,1
// This demo shows how to use react-three-fibers regression system
// When call call state.regress() nothing really will happen, all it
// does is setting a flag. But parts of the scene graph can now respond
// to it in whatever way the want. Here we cause regression on mouse-move
// and scale the pixel ratio as well as skipping some post-processing effects.

RectAreaLightUniformsLib.init();

function equals(a: THREE.Vector2, b: THREE.Vector2, epsilon = 0.001) {
	return Math.abs(a.x - b.x) < epsilon && Math.abs(a.y - b.y) < epsilon;
}

@Directive()
export class LerpedMouse {
	private store = injectStore();
	lerped = this.store.snapshot.pointer.clone();
	constructor() {
		const previous = new THREE.Vector2();

		injectBeforeRender(({ pointer, performance }) => {
			previous.copy(this.lerped);
			this.lerped.lerp(pointer, 0.1);

			// Regress system when the mouse is moved
			if (!equals(previous, this.lerped)) performance.regress();
		});
	}
}

@Component({
	selector: 'app-ybot',
	template: `
		<ngt-group #group [position]="position()" [dispose]="null">
			@if (gltf(); as gltf) {
				<ngt-mesh castShadow receiveShadow [geometry]="gltf.nodes.Alpha_Surface.geometry">
					<ngt-mesh-standard-material
						[metalness]="0.4"
						[roughness]="0.2"
						[color]="gltf.materials.Alpha_Body_MAT.color"
						[normalMap]="texture"
						[normalScale]="[0.15, 0.15]"
					>
						<ngt-vector2 *args="[35, 35]" attach="normalMap.repeat" />
					</ngt-mesh-standard-material>
				</ngt-mesh>
				<ngt-mesh castShadow [geometry]="gltf.nodes.Alpha_Joints.geometry">
					<ngt-mesh-standard-material
						[metalness]="1"
						[roughness]="0.1"
						[color]="gltf.materials.Alpha_Joints_MAT.color"
					/>
				</ngt-mesh>
			}
		</ngt-group>
	`,
	imports: [NgtArgs],
	changeDetection: ChangeDetectionStrategy.OnPush,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class YBot {
	position = input<NgtVector3>([0, 0, 0]);

	private groupRef = viewChild.required<ElementRef<THREE.Group>>('group');

	protected gltf = injectGLTF(() => botGLB);
	protected texture = new THREE.CanvasTexture(
		new FlakesTexture() as HTMLCanvasElement,
		THREE.UVMapping,
		THREE.RepeatWrapping,
		THREE.RepeatWrapping,
	);

	constructor() {
		const lerpedMouse = inject(LerpedMouse);

		injectBeforeRender(() => {
			this.groupRef().nativeElement.rotation.y = (lerpedMouse.lerped.x * Math.PI) / 10;
			this.groupRef().nativeElement.rotation.x = (lerpedMouse.lerped.y * Math.PI) / 200;
		});
	}
}

@Component({
	selector: 'app-lights',
	template: `
		<ngt-directional-light [intensity]="1" [position]="[2, 2, 0]" color="red" [distance]="5" />
		<ngt-spot-light [intensity]="2" [position]="[-5, 10, 2]" [angle]="0.2" [penumbra]="1" [decay]="0" castShadow>
			<ngt-vector2 *args="[2048, 2048]" attach="shadow.mapSize" />
		</ngt-spot-light>
		<ngt-group #group>
			<ngt-rect-area-light
				[intensity]="2"
				[position]="[4.5, 0, -3]"
				[width]="40"
				[height]="4"
				(updated)="onRectLightUpdate($event)"
			/>
			<ngt-rect-area-light
				[intensity]="2"
				[position]="[-10, 2, -10]"
				[width]="40"
				[height]="4"
				(updated)="onRectLightUpdate($event)"
			/>
		</ngt-group>
	`,
	imports: [NgtArgs],
	changeDetection: ChangeDetectionStrategy.OnPush,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Lights {
	protected readonly Math = Math;

	private groupRef = viewChild.required<ElementRef<THREE.Group>>('group');

	protected onRectLightUpdate(event: THREE.RectAreaLight) {
		event.lookAt(0, 0, 0);
	}

	constructor() {
		const lerpedMouse = inject(LerpedMouse);

		injectBeforeRender(() => {
			this.groupRef().nativeElement.rotation.x = (lerpedMouse.lerped.x * Math.PI) / 2;
			this.groupRef().nativeElement.rotation.y = Math.PI * 0.25 - (lerpedMouse.lerped.y * Math.PI) / 2;
		});
	}
}

@Component({
	selector: 'app-effects',
	template: `
		<ngtp-effect-composer [options]="{ multisampling: 8 }">
			<ngtp-bloom [options]="{ mipmapBlur: true, radius: 0.75, luminanceThreshold: 0.8, intensity: 3 }" />
		</ngtp-effect-composer>
	`,
	imports: [NgtpEffectComposer, NgtpBloom],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Effects {}

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-color *args="['lightblue']" attach="background" />
		<ngt-fog *args="['#000', 0.8, 1]" attach="fog" />

		<app-lights />
		<app-ybot [position]="[0, -1.3, 0]" />
		<ngts-text text="angular" [options]="{ position: [0, 0, -0.15], fontSize: 0.5, letterSpacing: 0 }">
			<ngt-mesh-standard-material
				[fog]="false"
				emissive="white"
				[emissiveIntensity]="1.01"
				[toneMapped]="false"
			/>
		</ngts-text>

		<ngt-mesh [scale]="4" [position]="[0, 1, -0.2]">
			<ngt-plane-geometry />
			<ngt-mesh-standard-material color="lightblue" [toneMapped]="false" [fog]="false" [envMapIntensity]="0" />
		</ngt-mesh>

		<ngts-adaptive-dpr pixelated />
		<app-effects />
	`,
	imports: [NgtArgs, Lights, Effects, YBot, NgtsText, NgtsAdaptiveDpr],
	hostDirectives: [LerpedMouse],
	changeDetection: ChangeDetectionStrategy.OnPush,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SceneGraph {
	constructor() {
		extend(THREE);
	}
}
