import { SymbolBase } from '../../LexicalAnalyzer/Symbols/SymbolBase';
import { UnaryOperation } from './UnaryOperation';
import { TreeNodeBase } from './TreeNodeBase';


export class UnaryMinus extends UnaryOperation
{
    constructor(symbol: SymbolBase, right: TreeNodeBase)
    {
        super(symbol, right);
    }
}