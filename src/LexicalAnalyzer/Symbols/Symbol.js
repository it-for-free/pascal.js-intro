import { SymbolBase } from './SymbolBase';

export class Symbol extends SymbolBase
{
    constructor(symbolCode, stringValue)
    {
        super(symbolCode, stringValue, stringValue);
    }
}