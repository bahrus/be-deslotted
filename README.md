# be-deslotted [TODO]

Transfer values from light children to host.

[![Actions Status](https://github.com/bahrus/be-deslotted/workflows/CI/badge.svg)](https://github.com/bahrus/be-deslotted/actions?query=workflow%3ACI)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-deslotted?style=for-the-badge)](https://bundlephobia.com/result?p=be-deslotted)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-deslotted?compression=gzip">
<a href="https://nodei.co/npm/be-deslotted/"><img src="https://nodei.co/npm/be-deslotted.png"></a>


## Example 1 [TODO]

```html
<my-custom-element>
    #shadow
        <slot name=link be-deslotted='from href.'></slot>
    <a slot=link href=https://cnn.com>This is CNN</a>
</my-custom-element>
```

... sets oMyCustomElement's href property to https://cnn.com.

```html
<my-custom-element>
    #shadow
        <slot name=inputEl be-deslotted='from value as number to numeric prop.
            From dataset:msg to stringProp.
        '></slot>
    <input type=number data-msg=hello slot=inputEl>
</my-custom-element>
```

... sets oMyCustomElement's numericProp property to oInput.valueAsNumber at the moment when the input element is slotted.  It does not 

## Viewing Locally

1.  Install git.
2.  Fork/clone this repo.
3.  Install node.
4.  Open command window to folder where you cloned this repo.
5.  > npm install
6.  > npm run serve
7.  Open http://localhost:3030/demo/dev in a modern browser.

## Importing in ES Modules:

```JavaScript
import 'be-exportable/be-deslotted.js';
```

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/be-deslotted';
</script>
```