```angular-ts
@Component({
    selector: "app-scene-graph",
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
}
```
