import { BinaryOperation } from './BinaryOperation.js';

export class Multiplication extends BinaryOperation
{
    constructor(symbol, left, right)
    {
        super(symbol, left, right);
    }
}