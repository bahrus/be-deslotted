import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA, DeslotRule} from './types';
import {register} from 'be-hive/register.js';

export class BeDeslotted extends BE<AP, Actions, HTMLSlotElement> implements Actions{
    static override get beConfig(){
        return {
            parse: true,
            parseAndCamelize: true,
            isParsedProp: 'isParsed'
        } as BEConfig;
    }
    
    async onCamelized(self: this) {
        const {from, From} = self;
        let deslotRules: Array<DeslotRule> = [];
        if((from || From) !== undefined){
            const {prsFrom} = await import('./prsFrom.js');
            deslotRules = prsFrom(self);
        }
        return {
            deslotRules
        }
    }

    hydrate(self: this): POA{
        const {enhancedElement} = self;
        return [{},
            {getProps: {on: 'slotchange', of: enhancedElement, doInit: true}}
        ]
            
    }

    getProps(self: this){
        const {deslotRules, enhancedElement} = self;
        const assignedNodes = enhancedElement.assignedNodes();
        for(const assignedNode of assignedNodes){
            for(const deslotRule of deslotRules!){
                
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
    config: {
        tagName,
        isEnh: true,
        propDefaults: {
            ...propDefaults,
        },
        propInfo: {
            ...propInfo,
        },
        actions: {
            onCamelized:{
                ifAllOf: ['isParsed'],
                ifAtLeastOneOf: ['from', 'From']
            },
            hydrate: 'deslotRules'
        }

    }
});

register(ifWantsToBe, upgrade, tagName);
