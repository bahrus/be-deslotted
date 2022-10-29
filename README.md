# be-deslotted

Transfer values from light children to host.



[![Actions Status](https://github.com/bahrus/be-deslotted/workflows/CI/badge.svg)](https://github.com/bahrus/be-deslotted/actions?query=workflow%3ACI)

Size of package, including custom element behavior framework (be-decorated):

[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-deslotted?style=for-the-badge)](https://bundlephobia.com/result?p=be-deslotted)

Size of new code in this package:

<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/be-deslotted?compression=gzip">

<a href="https://nodei.co/npm/be-deslotted/"><img src="https://nodei.co/npm/be-deslotted.png"></a>

```html
<my-custom-element>
    #shadow
        <slot name=link be-deslotted=href></slot>
    <a slot=link href=//cnn.com>This is CNN</a>
</my-custom-element>
```

my-custom-element's href property gets set to //cnn.com

Props can be mapped via propMap.  [TODO]:  Show example.

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