import { SymbolBase } from './SymbolBase.js';

export class Symbol extends SymbolBase
{
    constructor(symbolCode, stringValue)
    {
        super(symbolCode, stringValue, stringValue);
    }
}