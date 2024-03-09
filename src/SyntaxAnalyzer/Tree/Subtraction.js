import { BinaryOperation } from './BinaryOperation.js';

export class Subtraction extends BinaryOperation
{
    constructor(symbol, left, right)
    {
        super(symbol, left, right);
    }
}