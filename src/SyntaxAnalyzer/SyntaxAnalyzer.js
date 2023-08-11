import { Multiplication } from './Tree/Multiplication';
import { Division } from './Tree/Division';
import { Addition } from './Tree/Addition';
import { Subtraction } from './Tree/Subtraction';
import { NumberConstant } from './Tree/NumberConstant';
import { SymbolsCodes } from '../LexicalAnalyzer/SymbolsCodes';
import { ParenthesizedExpression } from './Tree/ParenthesizedExpression';
import { UnaryMinus } from './Tree/Division copy';
import { variables } from '../Semantics/Variables/Variables';
import { Assignment } from './Tree/Assignment';
import { Identifier } from './Tree/Identtifier';

/**
 * Синтаксический анализатор - отвечат за построения дерева выполнения
 */
export class SyntaxAnalyzer
{
    constructor(lexicalAnalyzer)
    {
        this.lexicalAnalyzer = lexicalAnalyzer;
        this.symbol = null;
        this.tree = null;
        this.trees = [];
    }

    nextSym()
    {
        this.symbol = this.lexicalAnalyzer.nextSym();
    }

    accept(expectedSymbolCode)
    {
        if (this.symbol?.symbolCode === expectedSymbolCode) {
            this.nextSym();
        } else {
            throw `${expectedSymbolCode} expected but ${this.symbol?.symbolCode} found!`;
        }
    }

    analyze()
    {
        this.nextSym();
        while (this.symbol !== null) {
            let expression = this.scanExpression();

            this.trees.push(expression);

            // Последняя строка может не заканчиваться переносом на следующую строку.
            if (this.symbol !== null) {
                this.accept(SymbolsCodes.endOfLine);
            }

        }

        return this.tree;
    }
    // Разбор выражения
    scanExpression()
    {
        let term = this.scanTerm();
        let operationSymbol = null;

        while ( this.symbol !== null && (
                    this.symbol.symbolCode === SymbolsCodes.plus ||
                    this.symbol.symbolCode === SymbolsCodes.minus
            )) {

            operationSymbol = this.symbol;
            this.nextSym();

            switch (operationSymbol.symbolCode) {
                case SymbolsCodes.plus:
                    term = new Addition(operationSymbol, term, this.scanTerm());
                    break;
                case SymbolsCodes.minus:
                    term = new Subtraction(operationSymbol, term, this.scanTerm());
                    break;
            }
        }

        return term;
    }
    // Разбор слагаемого
    scanTerm()
    {
        let term = this.scanMultiplier();
        let operationSymbol = null;

        while ( this.symbol !== null && (
                    this.symbol.symbolCode === SymbolsCodes.star ||
                    this.symbol.symbolCode === SymbolsCodes.slash
            )) {

            operationSymbol = this.symbol;
            this.nextSym();

            switch (operationSymbol.symbolCode) {
                case SymbolsCodes.star:
                    term = new Multiplication(operationSymbol, term, this.scanMultiplier());
                    break;
                case SymbolsCodes.slash:
                    term = new Division(operationSymbol, term, this.scanMultiplier());
                    break;
            }
        }

        return term;
    }
    // Разбор множителя
    scanMultiplier()
    {
        let operationSymbol;
        if (this.symbol?.symbolCode === SymbolsCodes.minus) {
            operationSymbol = this.symbol;
            this.nextSym();
            return new UnaryMinus(operationSymbol, this.scanMultiplier());    
        }
        if (this.symbol?.symbolCode === SymbolsCodes.openingBracket) {
            operationSymbol = this.symbol;
            this.nextSym();
            let expression = this.scanExpression();
            this.accept(SymbolsCodes.closingBracket);
            return new ParenthesizedExpression(operationSymbol, expression);
        }
        if (this.symbol?.symbolCode === SymbolsCodes.identifier) {
            let id = this.symbol.value;
            this.nextSym();
            if (this.symbol?.symbolCode === SymbolsCodes.equal) {
                operationSymbol = this.symbol;
                variables[id] = undefined;
                this.nextSym();
                return new Assignment(operationSymbol, new Identifier(id), this.scanExpression());
            } else {
                if (id in variables) {
                    return new Identifier(id);
                } else {
                    throw `необъявленная переменная ${id}! Строка `;   
                }
            }

        }
        let integerConstant = this.symbol;

        this.accept(SymbolsCodes.integerConst);

        return new NumberConstant(integerConstant);
    }
};