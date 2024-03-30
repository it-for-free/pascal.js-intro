import { SymbolsCodes } from '../SymbolsCodes';
import { SymbolBase } from './SymbolBase';

export class IntegerConstant extends SymbolBase
{
    constructor(symbolCode: SymbolsCodes, stringValue)
    {
        super(symbolCode, stringValue, Number.parseInt(stringValue));
    }
}