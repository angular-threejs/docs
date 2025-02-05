```angular-ts
@Component({
    selector: "app-box",
    template: `
        <ngt-mesh
            #mesh
            [position]="position()"
            [scale]="scale()"
            (click)="clicked.set(!clicked())"
            (pointermove)="$event.stopPropagation(); hovered.set($event.face.materialIndex)"
            (pointerout)="hovered.set(-1)"
        >
            <ngt-box-geometry />
            @for (face of faces; track face) {
                <app-face-material [index]="$index" [text]="face" />
            }
        </ngt-mesh>
    `,
    imports: [FaceMaterial],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Box {
    position = input([0, 0, 0]);

    mesh = viewChild.required<ElementRef<THREE.Mesh>>("mesh");

    protected hovered = signal(-1);
    isHovered = this.hovered.asReadonly();

    protected clicked = signal(false);
    protected scale = computed(() => (this.clicked() ? 1.5 : 1));

    protected faces = ["front", "back", "top", "bottom", "left", "right"];
}
```
