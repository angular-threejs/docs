```angular-ts
import { ChangeDetectionStrategy, Component, computed, CUSTOM_ELEMENTS_SCHEMA, effect, input } from '@angular/core';
import { NgtArgs } from 'angular-three';
import { injectGLTF } from 'angular-three-soba/loaders';
import { injectAnimations, type NgtsAnimationClips } from 'angular-three-soba/misc';
import { injectMatcapTexture } from 'angular-three-soba/staging';
import * as THREE from 'three';
import { SkeletonUtils, type GLTF } from 'three-stdlib';

import botGLB from './ybot.glb' with { loader: 'file' };

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

    private gltf = injectGLTF<BotGLTF>(() => botGLB);
    private matcapBody = injectMatcapTexture(() => bodies[this.bodyTexture()], {
        onLoad: (textures) => {
            textures[0].colorSpace = THREE.SRGBColorSpace;
        },
    });
    private matcapJoints = injectMatcapTexture(() => '394641_B1A67E_75BEBE_7D7256', {
        onLoad: (textures) => {
            textures[0].colorSpace = THREE.SRGBColorSpace;
        },
    });

    protected scene = computed(() => {
        const gltf = this.gltf();
        if (!gltf) return null;

        const [matcapBody, matcapJoints] = [this.matcapBody.texture(), this.matcapJoints.texture()];
        if (!matcapBody || !matcapJoints) return null;

        const scene = SkeletonUtils.clone(gltf.scene);
        const body = scene.getObjectByName('YB_Body') as THREE.SkinnedMesh;
        const joints = scene.getObjectByName('YB_Joints') as THREE.SkinnedMesh;

        if (!body || !joints) return scene;

        body.material = new THREE.MeshMatcapMaterial({ matcap: matcapBody });
        joints.material = new THREE.MeshMatcapMaterial({ matcap: matcapJoints });

        return scene;
    });

    private animations = injectAnimations(this.gltf, this.scene);

    constructor() {
        effect(() => {
            if (!this.animations.isReady) return;
            this.animations.actions.Dance.reset().fadeIn(0.5).play();
        });
    }
}
```
