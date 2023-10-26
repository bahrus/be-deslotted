import { ActionOnEventConfigs } from "trans-render/froop/types";
import {IBE} from 'be-enhanced/types';

export interface EndUserProps extends IBE<HTMLSlotElement>{
    From?: Array<FromStatement>,
    from?: Array<FromStatement>
}

export interface AllProps extends EndUserProps{
    isParsed?: boolean,
    deslotRules?: Array<DeslotRule>,
}

export type FromStatement = string;

export type AP = AllProps;

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>;

export type POA = [PAP | undefined, ActionOnEventConfigs<PAP, Actions>];

export interface Actions{
    onCamelized(self: this): ProPAP;
    hydrate(self: this): POA;
    getProps(self: this): PAP;
}

export interface DeslotRule{
    slottedProp: string,
}