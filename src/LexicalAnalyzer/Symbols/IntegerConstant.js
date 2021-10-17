import { SymbolBase } from './SymbolBase';

export class IntegerConstant extends SymbolBase
{
    constructor(symbolCode, stringValue)
    {
        super(symbolCode, stringValue, Number.parseInt(stringValue));
    }
}