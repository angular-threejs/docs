```angular-ts
@Component({
    selector: "app-view-cube",
    template: `
        <ngt-portal [container]="scene()" autoRender>
            <ng-template portalContent>
                <ngt-ambient-light [intensity]="Math.PI / 2" />
                <ngt-spot-light [position]="[10, 10, 10]" [angle]="0.15" [penumbra]="0" [decay]="0" [intensity]="Math.PI" />
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

    protected boxPosition = computed(() => [this.store.viewport.width() / 2 - 1, this.store.viewport.height() / 2 - 1, 0]);

    protected scene = computed(() => {
        const scene = new THREE.Scene();
        scene.name = "hud-view-cube-virtual-scene";
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
```
