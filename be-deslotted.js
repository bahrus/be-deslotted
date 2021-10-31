import { define } from 'be-decorated/be-decorated.js';
import { register } from 'be-hive/register.js';
export class BeDeslottedController {
    onProps({ props, proxy }) {
        proxy.addEventListener('slotchange', this.handleSlotChange);
        this.getProps(this);
    }
    getProps({ props, proxy }) {
        const propArr = Array.isArray(props) ? props : [props];
        let host;
        const assignedNodes = proxy.assignedNodes();
        for (const assignedNode of assignedNodes) {
            for (const prop of propArr) {
                if (assignedNode[prop] !== undefined) {
                    if (host === undefined) {
                        host = proxy.getRootNode().host;
                    }
                    host[prop] = assignedNode[prop];
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
            virtualProps: ['props'],
            upgrade,
            ifWantsToBe,
            finale: 'finale'
        }
    },
    complexPropDefaults: {
        controller: BeDeslottedController
    }
});
register(ifWantsToBe, upgrade, tagName);
