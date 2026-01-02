import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgtsPrismGeometry } from 'angular-three-soba/abstractions';

@Component({
	selector: 'app-scene-graph',
	template: `
		<!-- Triangular prism -->
		<ngt-mesh [position]="[-2, 0, 0]">
			<ngts-prism-geometry [vertices]="triangleVertices" [options]="{ height: 1.5 }" />
			<ngt-mesh-standard-material color="#ff6b6b" />
		</ngt-mesh>

		<!-- Square prism (rectangular column) -->
		<ngt-mesh [position]="[0, 0, 0]">
			<ngts-prism-geometry [vertices]="squareVertices" [options]="{ height: 1.5 }" />
			<ngt-mesh-standard-material color="#4ecdc4" />
		</ngt-mesh>

		<!-- Hexagonal prism -->
		<ngt-mesh [position]="[2, 0, 0]">
			<ngts-prism-geometry [vertices]="hexagonVertices" [options]="{ height: 1.5 }" />
			<ngt-mesh-standard-material color="#a29bfe" />
		</ngt-mesh>

		<!-- Pentagon prism -->
		<ngt-mesh [position]="[0, 0, -2.5]">
			<ngts-prism-geometry [vertices]="pentagonVertices" [options]="{ height: 1 }" />
			<ngt-mesh-standard-material color="#ffeaa7" />
		</ngt-mesh>
	`,
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgtsPrismGeometry],
})
export class SceneGraph {
	// Triangle vertices
	triangleVertices: [number, number][] = [
		[0, 0.8],
		[-0.7, -0.5],
		[0.7, -0.5],
	];

	// Square vertices
	squareVertices: [number, number][] = [
		[-0.5, 0.5],
		[0.5, 0.5],
		[0.5, -0.5],
		[-0.5, -0.5],
	];

	// Hexagon vertices
	hexagonVertices: [number, number][] = Array.from({ length: 6 }, (_, i) => {
		const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
		return [Math.cos(angle) * 0.6, Math.sin(angle) * 0.6] as [number, number];
	});

	// Pentagon vertices
	pentagonVertices: [number, number][] = Array.from({ length: 5 }, (_, i) => {
		const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
		return [Math.cos(angle) * 0.8, Math.sin(angle) * 0.8] as [number, number];
	});
}
