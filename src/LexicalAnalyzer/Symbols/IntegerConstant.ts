import { SymbolsCodes } from '../SymbolsCodes';
import { SymbolBase } from './SymbolBase';

export class IntegerConstant extends SymbolBase
{
    /**
     * 
     * @todo Не надо ли тут зафиксировать symbolCode ?

     */
    constructor(symbolCode: SymbolsCodes, stringValue)
    {
        super(symbolCode, stringValue, Number.parseInt(stringValue));
    }
}