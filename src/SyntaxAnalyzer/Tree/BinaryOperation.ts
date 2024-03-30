import { SymbolBase } from '../../LexicalAnalyzer/Symbols/SymbolBase';
import { TreeNodeBase } from './TreeNodeBase';

export class BinaryOperation extends TreeNodeBase
{
    left: TreeNodeBase;
    right: TreeNodeBase;

    constructor(symbol: SymbolBase, left: TreeNodeBase, right: TreeNodeBase)
    {
        super(symbol);
        this.left = left;
        this.right = right;
    }
}