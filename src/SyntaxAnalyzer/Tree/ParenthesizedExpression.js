import { TreeNodeBase } from './TreeNodeBase';

export class ParenthesizedExpression extends TreeNodeBase
{
    constructor(symbol, expression)
    {   
        super(symbol);
        this.expression = expression;
    }
}