import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
export class BeDeslotted extends BE {
    static get beConfig() {
        return {
            parse: true,
            primaryProp: 'props'
        };
    }
    onProps(self) {
        const { enhancedElement } = self;
        return [{}, {
                getProps: { on: 'slotchange', of: enhancedElement, doInit: true }
            }];
    }
    getProps(self) {
        const { props, enhancedElement, propMap } = self;
        const propArr = Array.isArray(props) ? props : [props];
        let host;
        const assignedNodes = enhancedElement.assignedNodes();
        for (const assignedNode of assignedNodes) {
            for (const prop of propArr) {
                const propVal = prop === '.' ? assignedNode : assignedNode[prop];
                if (propVal !== undefined) {
                    if (host === undefined) {
                        host = enhancedElement.getRootNode().host;
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
const ifWantsToBe = 'deslotted';
const upgrade = 'slot';
const xe = new XE({
    config: {
        tagName,
        propDefaults: {
            ...propDefaults
        },
        propInfo: {
            ...propInfo
        },
        actions: {
            onProps: 'props',
        }
    },
    superclass: BeDeslotted
});
register(ifWantsToBe, upgrade, tagName);
