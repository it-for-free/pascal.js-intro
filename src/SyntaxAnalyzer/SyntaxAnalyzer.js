import { Multiplication } from './Tree/Multiplication';
import { Division } from './Tree/Division';
import { Addition } from './Tree/Addition';
import { Subtraction } from './Tree/Subtraction';
import { NumberConstant } from './Tree/NumberConstant';
import { SymbolsCodes } from '../LexicalAnalyzer/SymbolsCodes';


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

    anotherSymbolExpected(expectedSymbol)
    {
        let description = this.symbolsDescription.getSymbolTextByCode(expectedSymbol);
        let errorText = `'${description}' expected but '${this.symbol.stringValue}' found.`;
    }

    accept(expectedSymbolCode)
    {
        if (this.symbol.symbolCode === expectedSymbolCode) {
            this.nextSym();
        } else {
            throw `${expectedSymbolCode} expected but ${this.symbol.symbolCode} found!`;
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

    scanExpression()
    {
        let term = this.scanTerm();

        while ( this.symbol !== null &&
                this.symbol.symbolCode !== SymbolsCodes.endOfLine  && (
                    this.symbol.symbolCode === SymbolsCodes.plus ||
                    this.symbol.symbolCode === SymbolsCodes.minus
                )) {

            switch (this.symbol.symbolCode) {
                case SymbolsCodes.plus:
                    this.nextSym();
                    term = new Addition(this.symbol, term, this.scanTerm());
                    break;
                case SymbolsCodes.minus:
                    this.nextSym();
                    term = new Subtraction(this.symbol, term, this.scanTerm());
                    break;
            }
        }

        return term;
    }

    scanTerm()
    {
        let term = this.scanMultiplier();
        let symbolCode = null;

        while ( this.symbol !== null && (
                this.symbol.symbolCode === SymbolsCodes.star ||
                this.symbol.symbolCode === SymbolsCodes.slash
            )) {

            symbolCode = this.symbol.symbolCode;

            this.nextSym();

            switch (symbolCode) {
                case SymbolsCodes.star:
                    term = new Multiplication(this.symbol, term, this.scanMultiplier());
                    break;
                case SymbolsCodes.slash:
                    term = new Division(this.symbol, term, this.scanMultiplier());
                    break;
            }
        }

        return term;
    }

    /** Синтаксическая диаграмма "множитель" */
    scanMultiplier()
    {
        let integerConstant = this.symbol;

        this.accept(SymbolsCodes.integerConst);

        return new NumberConstant(integerConstant);
    }
};