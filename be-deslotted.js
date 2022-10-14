import { define } from 'be-decorated/DE.js';
import { register } from 'be-hive/register.js';
export class BeDeslottedController extends EventTarget {
    #slotChangeAbortController;
    onProps(pp) {
        const { proxy } = pp;
        this.disconnect();
        this.#slotChangeAbortController = new AbortController();
        proxy.addEventListener('slotchange', e => {
            this.getProps(pp);
        }, {
            signal: this.#slotChangeAbortController.signal,
        });
        this.getProps(pp);
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
        proxy.resolved = true;
    }
    disconnect() {
        if (this.#slotChangeAbortController !== undefined)
            this.#slotChangeAbortController.abort();
    }
    finale() {
        this.disconnect();
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
