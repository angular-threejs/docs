import {
	ChangeDetectionStrategy,
	Component,
	computed,
	CUSTOM_ELEMENTS_SCHEMA,
	effect,
	type ElementRef,
	input,
	viewChild,
} from '@angular/core';
import { injectGLTF } from 'angular-three-soba/loaders';
import { injectAnimations, type NgtsAnimationClips } from 'angular-three-soba/misc';
import { injectMatcapTexture } from 'angular-three-soba/staging';
import * as THREE from 'three';
import type { GLTF } from 'three-stdlib';

import botGLB from '@common-assets/ybot.glb' with { loader: 'file' };
import { NgtArgs } from 'angular-three';

type BotGLTF = GLTF & {
	animations: NgtsAnimationClips<'Dance' | 'Idle' | 'Strut'>[];
	nodes: {
		'Y-Bot': THREE.Object3D;
		YB_Body: THREE.SkinnedMesh;
		YB_Joints: THREE.SkinnedMesh;
		mixamorigHips: THREE.Bone;
	};
	materials: { YB_Body: THREE.MeshStandardMaterial; YB_Joints: THREE.MeshStandardMaterial };
};

@Component({
	selector: 'app-scene-graph',
	template: `
		@if (gltf(); as gltf) {
			<ngt-group #group [dispose]="null">
				<ngt-group [rotation]="[Math.PI / 2, 0, 0]" [scale]="0.01">
					<ngt-primitive #bone *args="[gltf.nodes.mixamorigHips]" />
					<ngt-skinned-mesh [geometry]="gltf.nodes.YB_Body.geometry" [skeleton]="gltf.nodes.YB_Body.skeleton">
						<ngt-mesh-matcap-material [matcap]="matcapBody.texture()" />
					</ngt-skinned-mesh>
					<ngt-skinned-mesh
						[geometry]="gltf.nodes.YB_Joints.geometry"
						[skeleton]="gltf.nodes.YB_Joints.skeleton"
					>
						<ngt-mesh-matcap-material [matcap]="matcapJoints.texture()" />
					</ngt-skinned-mesh>
				</ngt-group>
			</ngt-group>
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	imports: [NgtArgs],
})
export class SceneGraph {
	animation = input<'Dance' | 'Idle' | 'Strut'>('Strut');

	private boneRef = viewChild<ElementRef<THREE.Bone>>('bone');
	private groupRef = viewChild.required<ElementRef<THREE.Group>>('group');

	protected gltf = injectGLTF<BotGLTF>(() => botGLB);
	protected matcapBody = injectMatcapTexture(() => '293534_B2BFC5_738289_8A9AA7', {
		onLoad: (textures) => {
			textures[0].colorSpace = THREE.SRGBColorSpace;
		},
	});
	protected matcapJoints = injectMatcapTexture(() => '3A2412_A78B5F_705434_836C47', {
		onLoad: (textures) => {
			textures[0].colorSpace = THREE.SRGBColorSpace;
		},
	});
	protected readonly Math = Math;

	private animationHost = computed(() => (this.boneRef() ? this.groupRef() : null));
	private animations = injectAnimations(this.gltf, this.animationHost);

	constructor() {
		effect((onCleanup) => {
			if (!this.animations.isReady) return;

			const action = this.animations.actions[this.animation()];
			action.reset().fadeIn(0.5).play();
			onCleanup(() => action.fadeOut(0.5));
		});
	}
}
