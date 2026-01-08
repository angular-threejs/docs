---
options:
    properties:
        - name: size
          type: number
          description: >-
              Size of the light source. The larger the value, the softer the shadows. Default: 25
        - name: samples
          type: number
          description: >-
              Number of samples for shadow calculation. More samples = less noise but more expensive. Default: 10
        - name: focus
          type: number
          description: >-
              Depth focus to shift the focal point where the shadow is sharpest. 0 means at the beginning. Default: 0
---

`NgtsSoftShadows` is a directive that injects Percentage-Closer Soft Shadows (PCSS) into the scene. PCSS produces contact-hardening soft shadows where shadows are sharper near the contact point and softer further away, creating more realistic shadow effects.

This works by patching Three.js's shadow shader chunk at runtime. When the directive is destroyed or options change, it restores the original shader and recompiles affected materials.

## Usage

```angular-html
<ngts-soft-shadows [options]="{ size: 25, samples: 10, focus: 0 }" />
```

### Basic Setup

For soft shadows to work, you need:

1. A light source with `castShadow` enabled
2. Objects with `castShadow` and `receiveShadow` properties set
3. Shadow map enabled on the renderer (handled by `NgtCanvas` with `shadows` input)

```angular-html
<ngt-canvas [shadows]="true">
    <ng-template canvasContent>
        <!-- Enable soft shadows -->
        <ngts-soft-shadows [options]="{ size: 25, samples: 10 }" />

        <!-- Light that casts shadows -->
        <ngt-directional-light [castShadow]="true" [position]="[5, 5, 5]" />

        <!-- Object that casts shadow -->
        <ngt-mesh [castShadow]="true" [position]="[0, 1, 0]">
            <ngt-box-geometry />
            <ngt-mesh-standard-material />
        </ngt-mesh>

        <!-- Ground that receives shadow -->
        <ngt-mesh [receiveShadow]="true" [rotation]="[-Math.PI / 2, 0, 0]">
            <ngt-plane-geometry *args="[10, 10]" />
            <ngt-mesh-standard-material />
        </ngt-mesh>
    </ng-template>
</ngt-canvas>
```

### Adjusting Shadow Softness

The `size` option controls how soft the shadows appear. Larger values create softer, more diffuse shadows:

```angular-html
<!-- Sharp shadows -->
<ngts-soft-shadows [options]="{ size: 5 }" />

<!-- Medium soft shadows -->
<ngts-soft-shadows [options]="{ size: 25 }" />

<!-- Very soft shadows -->
<ngts-soft-shadows [options]="{ size: 50 }" />
```

### Performance Considerations

The `samples` option affects both quality and performance:

```angular-html
<!-- Lower quality, better performance -->
<ngts-soft-shadows [options]="{ samples: 5 }" />

<!-- Higher quality, more expensive -->
<ngts-soft-shadows [options]="{ samples: 20 }" />
```
