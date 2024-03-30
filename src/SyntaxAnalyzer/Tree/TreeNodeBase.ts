import { SymbolBase } from "../../LexicalAnalyzer/Symbols/SymbolBase";

/**
 * Базовый класс для любого узла дерева
 */
export class TreeNodeBase
{
    symbol: SymbolBase;
    
    constructor(symbol: SymbolBase)
    {
        this.symbol = symbol;
    }
}