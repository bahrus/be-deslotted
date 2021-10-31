export interface BeDeslottedVirtualProps{
    props: string | string[];
}

export interface BeDeslottedProps extends BeDeslottedVirtualProps{
    proxy: Element & BeDeslottedVirtualProps
}

export interface BeDeslottedActions{
    onProps(self: this): void;
}