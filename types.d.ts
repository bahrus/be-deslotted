import { ActionOnEventConfigs } from "trans-render/froop/types";
import {IBE} from 'be-enhanced/types';


export interface EndUserProps extends IBE<HTMLSlotElement> {
    props?: string | string[];
    propMap?: {[key: string]: string};
}

export interface AllProps extends EndUserProps{
}

export interface AllProps extends EndUserProps {}

export type AP = AllProps;

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>;

export type POA = [PAP | undefined, ActionOnEventConfigs<PAP, Actions>]


export interface Actions{
    onProps(self: this): POA;

    getProps(self: this): PAP;
    //finale(): void;
}