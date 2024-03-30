import { SymbolBase } from '../../LexicalAnalyzer/Symbols/SymbolBase';
import { TreeNodeBase } from './TreeNodeBase';

export class NumberConstant extends TreeNodeBase
{
    constructor(symbol: SymbolBase)
    {
        super(symbol);
    }
}