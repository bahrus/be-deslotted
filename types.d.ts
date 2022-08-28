import {MinimalProxy} from 'be-decorated/types';

export interface BeDeslottedVirtualProps extends MinimalProxy{
    props: string | string[];
    propMap: {[key: string]: string};
}

export interface BeDeslottedProps extends BeDeslottedVirtualProps{
    proxy: HTMLSlotElement & BeDeslottedVirtualProps
}

export interface BeDeslottedActions{
    onProps(self: this): void;
    finale(): void;
}