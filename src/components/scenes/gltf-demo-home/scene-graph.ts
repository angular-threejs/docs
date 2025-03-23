import { ChangeDetectionStrategy, Component, computed, CUSTOM_ELEMENTS_SCHEMA, effect, input } from '@angular/core';
import { extend, NgtArgs } from 'angular-three';
import { NgtsOrbitControls } from 'angular-three-soba/controls';
import { gltfResource } from 'angular-three-soba/loaders';
import { animations, type NgtsAnimationClips } from 'angular-three-soba/misc';
import { matcapTextureResource } from 'angular-three-soba/staging';
import * as THREE from 'three';
import { SkeletonUtils, type GLTF } from 'three-stdlib';

import botGLB from '@common-assets/ybot.glb' with { loader: 'file' };

type BotGLTF = GLTF & {
	animations: NgtsAnimationClips<'Dance'>[];
};

const bodies = {
	1: '312D20_80675C_8B8C8B_85848C',
	2: '5B4CBC_B59AF2_9B84EB_8F78E4',
};

@Component({
	selector: 'app-bot',
	template: `
		<ngt-primitive *args="[scene()]" [position.x]="positionX()" [rotation.y]="rotationY()" />
	`,
	imports: [NgtArgs],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Bot {
	protected readonly Math = Math;

	positionX = input(0);
	rotationY = input(0);
	bodyTexture = input.required<1 | 2>();

	private gltf = gltfResource<BotGLTF>(() => botGLB);
	private matcapBody = matcapTextureResource(() => bodies[this.bodyTexture()], {
		onLoad: (texture) => (texture.colorSpace = THREE.SRGBColorSpace),
	});
	private matcapJoints = matcapTextureResource(() => '394641_B1A67E_75BEBE_7D7256', {
		onLoad: (texture) => (texture.colorSpace = THREE.SRGBColorSpace),
	});

	protected scene = computed(() => {
		const gltf = this.gltf.value();
		if (!gltf) return null;
		const [matcapBody, matcapJoints] = [this.matcapBody.resource.value(), this.matcapJoints.resource.value()];
		if (!matcapBody || !matcapJoints) return null;

		const scene = SkeletonUtils.clone(gltf.scene);

		const body = scene.getObjectByName('YB_Body') as THREE.SkinnedMesh;
		const joints = scene.getObjectByName('YB_Joints') as THREE.SkinnedMesh;

		if (!body || !joints) return scene;

		body.material = new THREE.MeshMatcapMaterial({ matcap: matcapBody });
		joints.material = new THREE.MeshMatcapMaterial({ matcap: matcapJoints });
		return scene;
	});

	private animations = animations(this.gltf.value, this.scene);

	constructor() {
		effect(() => {
			if (!this.animations.isReady) return;
			this.animations.actions.Dance.reset().fadeIn(0.5).play();
		});
	}
}

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-color *args="['#303030']" attach="background" />
		<ngt-grid-helper *args="[10, 20]" />

		<app-bot [positionX]="0.75" [rotationY]="-Math.PI / 2" [bodyTexture]="1" />
		<app-bot [positionX]="-0.75" [rotationY]="Math.PI / 2" [bodyTexture]="2" />

		<ngts-orbit-controls [options]="{ enableZoom: false, enablePan: false }" />
	`,
	imports: [NgtArgs, Bot, NgtsOrbitControls],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneGraph {
	protected readonly Math = Math;

	constructor() {
		extend(THREE);
	}
}
