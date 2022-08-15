# be-deslotted

Transfer values from light children to host.

[![Actions Status](https://github.com/bahrus/be-deslotted/workflows/CI/badge.svg)](https://github.com/bahrus/be-deslotted/actions?query=workflow%3ACI)

[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/be-deslotted?style=for-the-badge)](https://bundlephobia.com/result?p=be-deslotted)

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