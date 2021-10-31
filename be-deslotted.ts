import {define, BeDecoratedProps} from 'be-decorated/be-decorated.js';
import {BeDeslottedVirtualProps, BeDeslottedProps, BeDeslottedActions} from './types';
import {nudge} from 'trans-render/lib/nudge.js';
import {register} from 'be-hive/register.js';

export class BeDeslottedController implements BeDeslottedActions{
    onProps({}: this){

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
            ifWantsToBe
        }
    }
});