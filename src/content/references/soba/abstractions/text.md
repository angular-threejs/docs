---
credits:
    text: 'Credits: Spherical Text'
    link: 'https://codesandbox.io/p/sandbox/yup2o'
options:
    extends:
        - name: THREE.Mesh
          link: 'https://threejs.org/docs/index.html#api/en/objects/Mesh'
    properties:
        - name: characters
          type: string
          description: >-
              Characters to extract from font. Useful to optimize SDF texture and
              prevent FOUC
        - name: color
          type: THREE.ColorRepresentation
          description: >-
              This is a shortcut for setting the color of the text's material. You can
              use this if you don't want to specify a whole custom material and just
              want to change its color
        - name: fontSize
          type: number
          description: >-
              The em-height at which to render the font, in local world units.
              Default: 1
        - name: fontWeight
          type: number | string
          description: >-
              A numeric font weight, 'normal', or 'bold'. Currently only used to
              select the preferred weight for the fallback Unicode fonts
        - name: fontStyle
          type: string
          description: >-
              Either 'italic' or 'normal'. Currently only used to select the preferred
              style for the fallback Unicode fonts
        - name: maxWidth
          type: number
          description: >-
              The maximum width of the text block, above which text may start wrapping
              according to the whiteSpace and overflowWrap properties.
        - name: lineHeight
          type: number
          description: >-
              Sets the height of each line of text. Can be 'normal' which chooses a
              reasonable height based on the chosen font's ascender/descender metrics,
              or a number that is interpreted as a multiple of the fontSize
        - name: letterSpacing
          type: number
          description: >-
              Sets a uniform adjustment to spacing between letters after kerning is
              applied, in local world units. Positive numbers increase spacing and
              negative numbers decrease it
        - name: textAlign
          type: string
          description: >-
              The horizontal alignment of each line of text within the overall text
              bounding box. Can be one of 'left', 'right', 'center', or 'justify'.
        - name: font
          type: string
          description: >-
              The URL of a custom font file to be used. Supported font formats are:
              .ttf, .otf, .woff (.woff2 is not supported)
        - name: anchorX
          type: number | string
          description: >-
              Defines the horizontal position in the text block that should line up
              with the local origin. Can be specified as a numeric x position in local
              units, a string percentage of the total text block width e.g. "25%", or
              one of the following keyword strings: "left", "center", or "right".
              Default: center
        - name: anchorY
          type: number | string
          description: >-
              Defines the vertical position in the text block that should line up with
              the local origin. Can be specified as a numeric y position in local
              units (note: down is negative y), a string percentage of the total text
              block height e.g. "25%", or one of the following keyword strings: "top",
              "top-baseline", "top-cap", "top-ex", "middle", "bottom-baseline", or
              "bottom". Default: middle
        - name: clipRect
          type: '[number, number, number, number]'
          description: >-
              If specified, defines the [minX, minY, maxX, maxY] of a rectangle
              outside of which all pixels will be discarded. This can be used for
              example to clip overflowing text when whiteSpace="nowrap"
        - name: depthOffset
          type: number
          description: >-
              This is a shortcut for setting the material's polygonOffset and related
              properties, which can be useful in preventing z-fighting when this text
              is laid on top of another plane in the scene.
        - name: direction
          type: string
          description: >-
              Sets the base direction for the text. The default value of 'auto' will
              choose a direction based on the text's content according to the bidi
              spec. A value of 'ltr' or 'rtl' will force the direction
        - name: overflowWrap
          type: string
          description: >-
              Defines how text wraps if the whiteSpace property is 'normal'. Can be
              either 'normal' to break at whitespace characters, or 'break-word' to
              allow breaking within words.
        - name: whiteSpace
          type: string
          description: >-
              Defines whether text should wrap when a line reaches the maxWidth. Can
              be either 'normal' to allow wrapping, or 'nowrap' to prevent wrapping.
              Note that 'normal' honors newline characters.
        - name: outlineWidth
          type: number | string
          description: >-
              The width of an outline/halo drawn around each text glyph. Can be
              specified as an absolute number in local units, or as a percentage
              string e.g. '10%' of the fontSize
        - name: outlineOffsetX
          type: number | string
          description: >-
              Horizontal offset of the text outline. Can be specified as an absolute
              number in local units, or as a percentage string e.g. '12%' of the
              fontSize
        - name: outlineOffsetY
          type: number | string
          description: >-
              Vertical offset of the text outline. Can be specified as an absolute
              number in local units, or as a percentage string e.g. '12%' of the
              fontSize
        - name: outlineBlur
          type: number | string
          description: >-
              Blur radius applied to the outer edge of the text's outlineWidth. Can be
              specified as an absolute number in local units, or as a percentage
              string e.g. '12%' of the fontSize
        - name: outlineColor
          type: THREE.ColorRepresentation
          description: >-
              The color to use for the text outline when outlineWidth, outlineBlur,
              and/or outlineOffsetX/Y are set.
        - name: outlineOpacity
          type: number
          description: 'Sets the opacity of a configured text outline, in the range 0 to 1.'
        - name: strokeWidth
          type: number | string
          description: >-
              Sets the width of a stroke drawn inside the edge of each text glyph. Can
              be specified as an absolute number in local units, or as a percentage
              string e.g. '10%' of the fontSize
        - name: strokeColor
          type: THREE.ColorRepresentation
          description: 'The color of the text stroke, when strokeWidth is nonzero.'
        - name: strokeOpacity
          type: number
          description: >-
              The opacity of the text stroke, when strokeWidth is nonzero. Accepts a
              number from 0 to 1.
        - name: fillOpacity
          type: number
          description: >-
              Controls the opacity of just the glyph's fill area, separate from any
              configured strokeOpacity, outlineOpacity, and the material's opacity.
        - name: sdfGlyphSize
          type: number
          description: >-
              The size of each glyph's SDF (signed distance field) used for rendering.
              Must be a power-of-two number. Default: 64
        - name: debugSDF
          type: boolean
          description: debug sdf
        - name: glyphGeometryDetail
          type: number
          description: >-
              The number of vertical/horizontal segments that make up each glyph's
              rectangular plane. Can be increased to provide more geometrical detail
              for custom vertex shader effects.
inputs:
    - name: text
      type: string
      description: text to render
      required: true
---

Hi-quality text rendering w/ signed distance fields (SDF) and antialiasing, using [troika-three-text](https://www.npmjs.com/package/troika-three-text).

### Usage

```angular-ts
import { NgtsText } from 'angular-three-soba/abstractions';
```

```angular-html
<ngts-text [text]="text" [options]="options" />
```

### Custom Material

`NgtsText` can accept custom material(s) via content projection.

```angular-html
<ngts-text [text]="text" [options]="options">
    <ngt-mesh-basic-material [color]="color()" />
</ngts-text>
```

### Prevent FOUC

By default, `NgtsText` uses every characters from the font. If you want to use only a subset of characters, you can pass the `characters` option.

```angular-html
<ngts-text [text]="text" [options]="{ characters: 'abcdef' }" />
```

:::note

When specifying `characters` for ligatures, you need to include both the individual characters and their ligature combinations. For example, `['t', 'h', 'th']` will include the 't' and 'th' glyphs plus the 'th' glyph's ligature.

:::
