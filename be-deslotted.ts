import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeDeslottedVirtualProps, BeDeslottedProps, BeDeslottedActions} from './types';
import {register} from 'be-hive/register.js';

export class BeDeslottedController implements BeDeslottedActions{
    
    onProps({props, proxy}: this){
        proxy.addEventListener('slotchange', this.handleSlotChange);
        this.getProps(this);
    }

    getProps({props, proxy}: this){
        const propArr = Array.isArray(props) ? props : [props];
        let host: any;
        const assignedNodes = proxy.assignedNodes();
        for(const assignedNode of assignedNodes){
            for(const prop of propArr){
                if((<any>assignedNode)[prop] !== undefined){
                    if(host === undefined){
                        host = (<any>proxy.getRootNode()).host;
                    }
                    host[prop] = (<any>assignedNode)[prop];
                }
            }
        }
    }

    finale(){
        this.disconnect(this);
    }

    handleSlotChange(e: Event){
        this.getProps(this);
    }

    disconnect({proxy}: this){
        proxy.removeEventListener('slotchange', this.handleSlotChange);
    }
}

export interface BeDeslottedController extends BeDeslottedProps{}

const tagName = 'be-deslotted';
const ifWantsToBe = 'deslotted';
const upgrade = 'slot';

define<BeDeslottedProps & BeDecoratedProps<BeDeslottedVirtualProps, BeDeslottedActions>, BeDeslottedActions>({
    config:{
        tagName,
        propDefaults:{
            virtualProps: ['props'],
            upgrade,
            ifWantsToBe,
            finale: 'finale',
            primaryProp: 'props',
            forceVisible: ['slot'],
        },
        actions:{
            onProps:'props'
        }
    },
    complexPropDefaults:{
        controller: BeDeslottedController
    }
});
register(ifWantsToBe, upgrade, tagName);