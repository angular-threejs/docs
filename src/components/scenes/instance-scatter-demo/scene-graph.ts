import {
	ChangeDetectionStrategy,
	Component,
	computed,
	CUSTOM_ELEMENTS_SCHEMA,
	effect,
	ElementRef,
	viewChild,
} from '@angular/core';
import { beforeRender, extend, NgtArgs } from 'angular-three';
import { gltfResource } from 'angular-three-soba/loaders';
import * as THREE from 'three';
import { MeshSurfaceSampler, type GLTF } from 'three-stdlib';

// # Flower
//
// Model by [Kenney](https://twitter.com/KenneyNL), from [Nature Pack](https://www.kenney.nl/assets/nature-pack). CC0 1.0.
//
// Modifications by [Don McCurdy](https://donmccurdy.com/):
//
// - Split stem and blossom meshes.
// - Color adjustments.
import FlowerGLB from './Flower.glb' with { loader: 'file' };

interface FlowerGLTFResult extends GLTF {
	nodes: {
		Stem: THREE.Mesh;
		Blossom: THREE.Mesh;
	};
}

const blossomPalette = [0xf20587, 0xf2d479, 0xf2c879, 0xf2b077, 0xf24405];

@Component({
	selector: 'app-scene-graph',
	template: `
		<ngt-ambient-light [intensity]="3" />
		<ngt-point-light color="#AA8899" [intensity]="2.5" [distance]="0" [decay]="0" [position]="[50, -25, 75]" />

		<ngt-mesh #surface [geometry]="surfaceGeometry">
			<ngt-mesh-lambert-material color="#967259" />
		</ngt-mesh>

		@if (flowerGLTF.value(); as gltf) {
			<ngt-instanced-mesh #stem *args="[gltf.nodes.Stem.geometry, gltf.nodes.Stem.material, 2000]" />
			<ngt-instanced-mesh #blossom *args="[gltf.nodes.Blossom.geometry, gltf.nodes.Blossom.material, 2000]" />
		}
	`,
	imports: [NgtArgs],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneGraph {
	protected flowerGLTF = gltfResource<FlowerGLTFResult>(() => FlowerGLB);

	private surfaceRef = viewChild.required<ElementRef<THREE.Mesh>>('surface');
	private stemRef = viewChild<ElementRef<THREE.InstancedMesh>>('stem');
	private blossomRef = viewChild<ElementRef<THREE.InstancedMesh>>('blossom');

	protected surfaceGeometry = new THREE.TorusKnotGeometry(10, 3, 100, 16).toNonIndexed();

	private position = new THREE.Vector3();
	private normal = new THREE.Vector3();
	private scale = new THREE.Vector3();
	private dummy = new THREE.Object3D();
	private ages = new Float32Array(2000);
	private scales = new Float32Array(2000);

	private surfaceSampler = computed(() => {
		const surface = this.surfaceRef().nativeElement;
		return new MeshSurfaceSampler(surface);
	});

	constructor() {
		extend(THREE);

		beforeRender(({ clock, scene }) => {
			const [stem, blossom] = [this.stemRef()?.nativeElement, this.blossomRef()?.nativeElement];
			if (!stem || !blossom) return;

			scene.rotation.x = Math.sin(clock.elapsedTime / 4);
			scene.rotation.y = Math.sin(clock.elapsedTime / 2);

			for (let i = 0; i < 2000; i++) {
				this.ages[i] += 0.005;
				if (this.ages[i] >= 1) {
					this.ages[i] = 0.001;
					this.scales[i] = this.scaleCurve(this.ages[i]);
					this.sampleParticle(stem, blossom, this.surfaceSampler(), i);
					continue;
				}

				const prevScale = this.scales[i];
				this.scales[i] = this.scaleCurve(this.ages[i]);
				this.scale.set(this.scales[i] / prevScale, this.scales[i] / prevScale, this.scales[i] / prevScale);

				stem.getMatrixAt(i, this.dummy.matrix);
				this.dummy.matrix.scale(this.scale);

				stem.setMatrixAt(i, this.dummy.matrix);
				blossom.setMatrixAt(i, this.dummy.matrix);
			}

			stem.instanceMatrix.needsUpdate = true;
			blossom.instanceMatrix.needsUpdate = true;

			stem.computeBoundingSphere();
			blossom.computeBoundingSphere();
		});

		effect(() => {
			const [stem, blossom] = [this.stemRef()?.nativeElement, this.blossomRef()?.nativeElement];
			if (!stem || !blossom) return;

			const defaultTransform = new THREE.Matrix4()
				.makeRotationX(Math.PI)
				.multiply(new THREE.Matrix4().makeScale(7, 7, 7));

			stem.geometry.applyMatrix4(defaultTransform);
			blossom.geometry.applyMatrix4(defaultTransform);

			const color = new THREE.Color();

			for (let i = 0; i < 2000; i++) {
				color.setHex(blossomPalette[Math.floor(Math.random() * blossomPalette.length)]);
				blossom.setColorAt(i, color);
			}

			blossom.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
			stem.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

			this.sample(stem, blossom);
		});
	}

	private sample(stem: THREE.InstancedMesh, blossom: THREE.InstancedMesh) {
		this.surfaceSampler().build();

		for (let i = 0; i < 2000; i++) {
			this.ages[i] = Math.random();
			this.scales[i] = this.scaleCurve(this.ages[i]);
			this.sampleParticle(stem, blossom, this.surfaceSampler(), i);
		}

		stem.instanceMatrix.needsUpdate = true;
		blossom.instanceMatrix.needsUpdate = true;
	}

	private sampleParticle(
		stem: THREE.InstancedMesh,
		blossom: THREE.InstancedMesh,
		sampler: MeshSurfaceSampler,
		index: number,
	) {
		sampler.sample(this.position, this.normal);
		this.normal.add(this.position);
		this.dummy.position.copy(this.position);
		this.dummy.scale.set(this.scales[index], this.scales[index], this.scales[index]);
		this.dummy.lookAt(this.normal);
		this.dummy.updateMatrix();
		stem.setMatrixAt(index, this.dummy.matrix);
		blossom.setMatrixAt(index, this.dummy.matrix);
	}

	// Source: https://gist.github.com/gre/1650294
	private easeOutCubic(t: number) {
		return --t * t * t + 1;
	}

	// Scaling curve causes particles to grow quickly, ease gradually into full scale, then
	// disappear quickly. More of the particle's lifetime is spent around full scale.
	private scaleCurve(t: number) {
		return Math.abs(this.easeOutCubic((t > 0.5 ? 1 - t : t) * 2));
	}
}
