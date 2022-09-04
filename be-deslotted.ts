import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeDeslottedVirtualProps, PP, BeDeslottedActions, Proxy} from './types';
import {register} from 'be-hive/register.js';

export class BeDeslottedController extends EventTarget implements BeDeslottedActions{
    
    #slotChangeAbortController: AbortController | undefined;

    onProps(pp: PP){
        const {proxy} = pp;
        this.disconnect();
        this.#slotChangeAbortController = new AbortController();
        proxy.addEventListener('slotchange', e => {
            this.getProps(pp);
        }, {
            signal: this.#slotChangeAbortController.signal,
        });
        this.getProps(pp);
    }

    getProps({props, proxy, propMap}: PP){
        const propArr = Array.isArray(props) ? props : [props] as string[];
        let host: any;
        const assignedNodes = proxy.assignedNodes();
        for(const assignedNode of assignedNodes){
            for(const prop of propArr){
                const propVal = prop === '.' ? assignedNode : (<any>assignedNode)[prop];
                if(propVal !== undefined){
                    if(host === undefined){
                        host = (<any>proxy.getRootNode()).host;
                    }
                    const hostKey = propMap !== undefined && propMap[prop] !== undefined ? propMap[prop] :  prop;
                    host[hostKey] = propVal;
                }
            }
        }
        proxy.resolved = true;
    }

    disconnect(){
        if(this.#slotChangeAbortController !== undefined) this.#slotChangeAbortController.abort();
    }

    finale(){
        this.disconnect();
    }

}

export interface DeslottedController {
    proxy: Proxy;
}


const tagName = 'be-deslotted';
const ifWantsToBe = 'deslotted';
const upgrade = 'slot';

define<BeDeslottedVirtualProps & BeDecoratedProps<BeDeslottedVirtualProps, BeDeslottedActions>, BeDeslottedActions>({
    config:{
        tagName,
        propDefaults:{
            virtualProps: ['props', 'propMap'],
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