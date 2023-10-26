import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA} from './types';
import {register} from 'be-hive/register.js';

export class BeDeslotted extends BE<AP, Actions, HTMLSlotElement> implements Actions{
    static  override get beConfig(){
        return {
            parse: true,
            primaryProp: 'props'
        } as BEConfig
    }
    onProps(self: this): POA {
        const {enhancedElement} = self;
        return [{}, {
            getProps: {on:'slotchange', of: enhancedElement, doInit: true}
        }]
    }

    getProps(self: this): Partial<AllProps> {
        const {props, enhancedElement, propMap} = self;
        const propArr = Array.isArray(props) ? props : [props] as string[];
        let host: any;
        const assignedNodes = enhancedElement.assignedNodes();
        for(const assignedNode of assignedNodes){
            for(const prop of propArr){
                const propVal = prop === '.' ? assignedNode : (<any>assignedNode)[prop];
                if(propVal !== undefined){
                    if(host === undefined){
                        host = (<any>enhancedElement.getRootNode()).host;
                    }
                    const hostKey = propMap !== undefined && propMap[prop] !== undefined ? propMap[prop] :  prop;
                    host[hostKey] = propVal;
                }
            }
        }
        return {resolved: true};
    }
}

export interface BeDeslotted extends AllProps{}

const tagName = 'be-deslotted';
const ifWantsToBe = 'deslotted';
const upgrade = 'slot';

const xe = new XE<AP, Actions>({
    config:{
        tagName,
        propDefaults:{
            ...propDefaults
        },
        propInfo:{
            ...propInfo
        },
        actions:{
            onProps: 'props',
        }
    },
    superclass: BeDeslotted
});

register(ifWantsToBe, upgrade, tagName);