import { TreeNodeBase } from './TreeNodeBase.js';

export class BinaryOperation extends TreeNodeBase
{
    constructor(symbol, left, right)
    {
        super(symbol);
        this.left = left;
        this.right = right;
    }
}