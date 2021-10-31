# be-deslotted

Transfer values from light children to host.

```html
<my-custom-element>
    #shadow
        <slot name=link be-deslotted=href></slot>
    <a slot=link href=//cnn.com>This is CNN</a>
</my-custom-element>
```

my-custom-element's href property gets set to //cnn.com