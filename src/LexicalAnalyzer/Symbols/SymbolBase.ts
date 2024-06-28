import { SymbolsCodes } from "../SymbolsCodes";

export class SymbolBase
{

    symbolCode: SymbolsCodes;
    stringValue: string;
    value: number;
    constructor(symbolCode: SymbolsCodes, stringValue: string, value: number)
    {
        this.symbolCode = symbolCode;
        this.stringValue = stringValue;
        this.value = value;
    }
}