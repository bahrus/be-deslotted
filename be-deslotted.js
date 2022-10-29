import { define } from 'be-decorated/DE.js';
import { register } from 'be-hive/register.js';
export class BeDeslotted extends EventTarget {
    onProps(pp) {
        const { self } = pp;
        return [{}, { getProps: { on: 'slotchange', of: self, doInit: true } }];
    }
    getProps({ props, self, propMap }) {
        const propArr = Array.isArray(props) ? props : [props];
        let host;
        const assignedNodes = self.assignedNodes();
        for (const assignedNode of assignedNodes) {
            for (const prop of propArr) {
                const propVal = prop === '.' ? assignedNode : assignedNode[prop];
                if (propVal !== undefined) {
                    if (host === undefined) {
                        host = self.getRootNode().host;
                    }
                    const hostKey = propMap !== undefined && propMap[prop] !== undefined ? propMap[prop] : prop;
                    host[hostKey] = propVal;
                }
            }
        }
        return { resolved: true };
    }
}
const tagName = 'be-deslotted';
define({
    config: {
        tagName,
        propDefaults: {
            virtualProps: ['props', 'propMap'],
            primaryProp: 'props',
            forceVisible: ['slot'],
        },
        actions: {
            onProps: 'props'
        }
    },
    complexPropDefaults: {
        controller: BeDeslotted
    }
});
register('deslotted', 'slot', tagName);
