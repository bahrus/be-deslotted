import { define } from 'be-decorated/be-decorated.js';
import { register } from 'be-hive/register.js';
export class BeDeslottedController {
    onProps({ props, proxy }) {
        proxy.addEventListener('slotchange', this.handleSlotChange);
        this.getProps(this);
    }
    getProps({ props, proxy, propMap }) {
        const propArr = Array.isArray(props) ? props : [props];
        let host;
        const assignedNodes = proxy.assignedNodes();
        for (const assignedNode of assignedNodes) {
            for (const prop of propArr) {
                const propVal = prop === '.' ? assignedNode : assignedNode[prop];
                if (propVal !== undefined) {
                    if (host === undefined) {
                        host = proxy.getRootNode().host;
                    }
                    const hostKey = propMap !== undefined && propMap[prop] !== undefined ? propMap[prop] : prop;
                    host[hostKey] = propVal;
                }
            }
        }
    }
    finale() {
        this.disconnect(this);
    }
    handleSlotChange(e) {
        this.getProps(this);
    }
    disconnect({ proxy }) {
        proxy.removeEventListener('slotchange', this.handleSlotChange);
    }
}
const tagName = 'be-deslotted';
const ifWantsToBe = 'deslotted';
const upgrade = 'slot';
define({
    config: {
        tagName,
        propDefaults: {
            virtualProps: ['props', 'propMap'],
            upgrade,
            ifWantsToBe,
            finale: 'finale',
            primaryProp: 'props',
            forceVisible: ['slot'],
        },
        actions: {
            onProps: 'props'
        }
    },
    complexPropDefaults: {
        controller: BeDeslottedController
    }
});
register(ifWantsToBe, upgrade, tagName);
