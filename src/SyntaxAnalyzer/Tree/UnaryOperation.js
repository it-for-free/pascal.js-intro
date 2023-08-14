import { TreeNodeBase } from './TreeNodeBase';

export class UnaryOperation extends TreeNodeBase
{
    constructor(symbol, operand)
    {
        super(symbol);
        this.operand = operand;
    }
}