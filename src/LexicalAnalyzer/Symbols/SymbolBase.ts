import { SymbolsCodes } from "../SymbolsCodes";

export class SymbolBase
{

    symbolCode: SymbolsCodes;
    stringValue: SymbolsCodes;
    value: number;

    /**
     * @todo Разобраться тут с типами - почему дублируются
     */
    constructor(symbolCode: SymbolsCodes, stringValue: string, value: number)
    {
        this.symbolCode = symbolCode;
        this.stringValue = symbolCode;
        this.value = value;
    }
}