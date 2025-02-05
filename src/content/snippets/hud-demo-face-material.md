```angular-ts
@Component({
    selector: "app-face-material",
    template: `
        <ngt-mesh-standard-material [attach]="['material', index()]" [color]="color()">
            <ngts-render-texture [options]="{ frames: 6, anisotropy: 16 }">
                <ng-template renderTextureContent>
                    <ngt-color *args="['white']" attach="background" />
                    <ngts-orthographic-camera [options]="{ makeDefault: true, left: -1, right: 1, top: 1, bottom: -1, position: [0, 0, 10], zoom: 0.5 }" />
                    <ngts-text [text]="text()" [options]="{ color: 'black', font: 'https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff' }" />
                </ng-template>
            </ngts-render-texture>
        </ngt-mesh-standard-material>
    `,
    imports: [NgtsText, NgtsRenderTexture, NgtsOrthographicCamera, NgtArgs, NgtsRenderTextureContent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaceMaterial {
    index = input.required<number>();
    text = input.required<string>();

    private box = inject(Box);
    protected color = computed(() => this.box.isHovered() === this.index() ? "mediumpurple" : "orange");
}
```
