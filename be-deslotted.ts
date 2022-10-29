import {define, BeDecoratedProps} from 'be-decorated/DE.js';
import {VirtualProps, PP, Actions, Proxy, PPE, PPP} from './types';
import {register} from 'be-hive/register.js';

export class BeDeslotted extends EventTarget implements Actions{
    
    onProps(pp: PP){
        const {self} = pp;
        return [{}, {getProps: {on: 'slotchange', of: self, doInit: true}}] as PPE;
    }

    getProps({props, self, propMap}: PP){
        const propArr = Array.isArray(props) ? props : [props] as string[];
        let host: any;
        const assignedNodes = self.assignedNodes();
        for(const assignedNode of assignedNodes){
            for(const prop of propArr){
                const propVal = prop === '.' ? assignedNode : (<any>assignedNode)[prop];
                if(propVal !== undefined){
                    if(host === undefined){
                        host = (<any>self.getRootNode()).host;
                    }
                    const hostKey = propMap !== undefined && propMap[prop] !== undefined ? propMap[prop] :  prop;
                    host[hostKey] = propVal;
                }
            }
        }
        return {resolved: true} as PPP;
    }
}



const tagName = 'be-deslotted';

define<VirtualProps & BeDecoratedProps<VirtualProps, Actions>, Actions>({
    config:{
        tagName,
        propDefaults:{
            virtualProps: ['props', 'propMap'],
            primaryProp: 'props',
            forceVisible: ['slot'],
        },
        actions:{
            onProps:'props'
        }
    },
    complexPropDefaults:{
        controller: BeDeslotted
    }
});
register('deslotted', 'slot', tagName);