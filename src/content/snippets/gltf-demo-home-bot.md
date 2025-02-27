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

    private gltf = injectGLTF<BotGLTF>(() => botGLB);
    private matcapBody = injectMatcapTexture(() => '293534_B2BFC5_738289_8A9AA7', {
        onLoad: (textures) => {
            textures[0].colorSpace = THREE.SRGBColorSpace;
        },
    });
    private matcapJoints = injectMatcapTexture(() => '3A2412_A78B5F_705434_836C47', {
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
