import {MinimalProxy} from 'be-decorated/types';


export interface EndUserProps {
    props?: string | string[];
    propMap?: {[key: string]: string};
}

export interface VirtualProps extends EndUserProps, MinimalProxy<HTMLSlotElement>{
}

export type Proxy = HTMLSlotElement & VirtualProps;

export interface ProxyProps extends VirtualProps {
    proxy: Proxy;
}

export type PP = ProxyProps;


export interface Actions{
    onProps(pp: PP): void;
    finale(): void;
}