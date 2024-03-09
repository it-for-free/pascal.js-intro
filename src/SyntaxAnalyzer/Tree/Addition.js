import { BinaryOperation } from './BinaryOperation.js';

export class Addition extends BinaryOperation
{
    constructor(symbol, left, right)
    {
        super(symbol, left, right);
    }
}