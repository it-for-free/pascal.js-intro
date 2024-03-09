import { BinaryOperation } from './BinaryOperation.js';

export class Division extends BinaryOperation
{
    constructor(symbol, left, right)
    {
        super(symbol, left, right);
    }
}