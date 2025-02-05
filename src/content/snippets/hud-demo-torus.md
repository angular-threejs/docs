```angular-ts
@Component({
    selector: "app-torus",
    template: `
        <ngt-mesh [scale]="scale()" (pointerover)="hovered.set(true)" (pointerout)="hovered.set(false)">
            <ngt-torus-geometry *args="[1, 0.25, 32, 100]" />
            <ngt-mesh-standard-material [color]="color()" />
        </ngt-mesh>
    `,
    imports: [NgtArgs],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Torus {
    scale = input(1);

    protected hovered = signal(false);
    protected color = computed(() => this.hovered() ? "mediumpurple" : "orange");
}
```
