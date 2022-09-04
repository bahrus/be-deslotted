import {MinimalProxy} from 'be-decorated/types';


export interface BeDeslottedEndUserProps {
    props?: string | string[];
    propMap?: {[key: string]: string};
}

export interface BeDeslottedVirtualProps extends BeDeslottedEndUserProps, MinimalProxy<HTMLSlotElement>{
}

export type Proxy = HTMLSlotElement & BeDeslottedVirtualProps;

export interface ProxyProps extends BeDeslottedVirtualProps {
    proxy: Proxy;
}

export type PP = ProxyProps;


export interface BeDeslottedActions{
    onProps(pp: PP): void;
    finale(): void;
}