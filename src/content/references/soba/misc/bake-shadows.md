---
---

`NgtsBakeShadows` is a directive that disables automatic shadow map updates for performance optimization.

When added to the scene, this directive sets `shadowMap.autoUpdate` to `false` and triggers a single `needsUpdate` to bake the current shadow state. This is useful for static scenes where shadows don't need to update every frame.

On cleanup, automatic shadow updates are restored.

## Usage

```angular-html
<ngt-group>
    <ngts-bake-shadows />
    <!-- static meshes with shadows -->
</ngt-group>
```

### When to Use

Use `NgtsBakeShadows` when:

- Your scene has static objects that don't move
- Shadow-casting lights are stationary
- You want to improve performance by avoiding per-frame shadow calculations

### Example with Static Scene

```angular-html
<ngt-canvas [shadows]="true">
    <ng-template canvasContent>
        <!-- Bake shadows once -->
        <ngts-bake-shadows />

        <!-- Static directional light -->
        <ngt-directional-light [castShadow]="true" [position]="[5, 5, 5]" />

        <!-- Static objects -->
        <ngt-mesh [castShadow]="true" [position]="[0, 1, 0]">
            <ngt-box-geometry />
            <ngt-mesh-standard-material />
        </ngt-mesh>

        <ngt-mesh [receiveShadow]="true" [rotation]="[-Math.PI / 2, 0, 0]">
            <ngt-plane-geometry *args="[10, 10]" />
            <ngt-mesh-standard-material />
        </ngt-mesh>
    </ng-template>
</ngt-canvas>
```

### Performance Considerations

- Shadows are only calculated once when the directive is initialized
- Moving objects or lights after baking will not update shadows
- Remove the directive if you need dynamic shadows again
