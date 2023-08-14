import { UnaryOperation } from './UnaryOperation';

export class UnaryMinus extends UnaryOperation
{
    constructor(symbol, operand)
    {
        super(symbol, operand);
    }
}