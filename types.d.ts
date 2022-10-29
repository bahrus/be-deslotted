import {MinimalProxy, EventConfigs} from 'be-decorated/types';


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

export type PPP = Partial<PP>;

export type PPE = [PPP, EventConfigs<Proxy, Actions>]


export interface Actions{
    onProps(pp: PP): PPE;

    getProps(pp: PP): PPP;
    //finale(): void;
}