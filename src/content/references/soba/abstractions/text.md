---
credits:
  text: 'Credits: Spherical Text'
  link: 'https://codesandbox.io/p/sandbox/yup2o'
options:
  extends: 'THREE.Mesh'
  extendsLink: 'https://threejs.org/docs/index.html#api/en/objects/Mesh'
  properties:
    - name: 'characters'
      type: 'string'
      description: 'characters to extract from font'
    - name: 'color'
      type: 'THREE.ColorRepresentation'
      description: 'color of the text'
    - name: 'fontSize'
      type: 'number'
      description: 'font size, default to 1'
    - name: 'fontWeight'
      type: 'number | string'
      description: 'font weight'
    - name: 'fontStyle'
      type: 'string'
      description: 'font style'
    - name: 'maxWidth'
      type: 'number'
      description: 'max width of the text'
    - name: 'lineHeight'
      type: 'number'
      description: 'line height'
    - name: 'letterSpacing'
      type: 'number'
      description: 'letter spacing'
    - name: 'textAlign'
      type: 'string'
      description: 'text align'
    - name: 'font'
      type: 'string'
      description: 'font'
    - name: 'anchorX'
      type: 'number | string'
      description: 'anchor x, default to center'
    - name: 'anchorY'
      type: 'number | string'
      description: 'anchor y, default to middle'
    - name: 'clipRect'
      type: '[number, number, number, number]'
      description: 'clip rect'
    - name: 'depthOffset'
      type: 'number'
      description: 'depth offset'
    - name: 'direction'
      type: 'string'
      description: 'direction'
    - name: 'overflowWrap'
      type: 'string'
      description: 'overflow wrap'
    - name: 'whiteSpace'
      type: 'string'
      description: 'white space'
    - name: 'outlineWidth'
      type: 'number | string'
      description: 'outline width'
    - name: 'outlineOffsetX'
      type: 'number | string'
      description: 'outline offset x'
    - name: 'outlineOffsetY'
      type: 'number | string'
      description: 'outline offset y'
    - name: 'outlineBlur'
      type: 'number | string'
      description: 'outline blur'
    - name: 'outlineColor'
      type: 'THREE.ColorRepresentation'
      description: 'outline color'
    - name: 'outlineOpacity'
      type: 'number'
      description: 'outline opacity'
    - name: 'strokeWidth'
      type: 'number | string'
      description: 'stroke width'
    - name: 'strokeColor'
      type: 'THREE.ColorRepresentation'
      description: 'stroke color'
    - name: 'strokeOpacity'
      type: 'number'
      description: 'stroke opacity'
    - name: 'fillOpacity'
      type: 'number'
      description: 'fill opacity'
    - name: 'sdfGlyphSize'
      type: 'number'
      description: 'sdf glyph size, default to 64'
    - name: 'debugSDF'
      type: 'boolean'
      description: 'debug sdf'
    - name: 'glyphGeometryDetail'
      type: 'number'
      description: 'glyph geometry detail'
inputs:
    - name: 'text'
      type: 'string'
      description: 'text to render'
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
