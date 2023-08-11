import { BinaryOperation } from './BinaryOperation';

export class Assignment extends BinaryOperation
{
    constructor(symbol, left, right)
    {
        super(symbol, left, right);
    }
}