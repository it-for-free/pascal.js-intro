import { Multiplication } from './Tree/Multiplication';
import { Division } from './Tree/Division';
import { Addition } from './Tree/Addition';
import { Subtraction } from './Tree/Subtraction';
import { NumberConstant } from './Tree/NumberConstant';
import { SymbolsCodes } from '../LexicalAnalyzer/SymbolsCodes';
import { LexicalAnalyzer } from '../LexicalAnalyzer/LexicalAnalyzer';
import { TreeNodeBase } from './Tree/TreeNodeBase';
import { SymbolBase } from '../LexicalAnalyzer/Symbols/SymbolBase';
import { BinaryOperation } from './Tree/BinaryOperation';

/**
 * Синтаксический анализатор - отвечат за построения дерева выполнения
 * 
 * @todo Уточнить возвращаемые типы
 */
export class SyntaxAnalyzer {

    lexicalAnalyzer: LexicalAnalyzer;


    symbol: SymbolBase | null;
    tree: TreeNodeBase | null;

    /**
     * Деревья, которые будут построены (напр. для каждой строки исходного кода)
     */
    trees: TreeNodeBase[];

    constructor(lexicalAnalyzer: LexicalAnalyzer) {
        this.lexicalAnalyzer = lexicalAnalyzer;
        this.symbol = null;
        this.tree = null;
        this.trees = [];
    }

    /**
     * Перемещаемся по последовательности "символов" лексического анализотора
     * получая очередной "символ" ("слово")
     */
    nextSym(): void {
        this.symbol = this.lexicalAnalyzer.nextSym();
    }

    accept(expectedSymbolCode): void {
        if (this.symbol !== null && this.symbol.symbolCode === expectedSymbolCode) {
            this.nextSym();
        } else {
            throw `${expectedSymbolCode} expected but ${this.symbol?.symbolCode} found!`;
        }
    }

    analyze() {
        this.nextSym();

        while (this.symbol !== null) {
            let expression = this.scanExpression();

            if (expression) {
                this.trees.push(expression);
            }

            // Последняя строка может не заканчиваться переносом на следующую строку.
            if (this.symbol !== null) {
                this.accept(SymbolsCodes.endOfLine);
            }

        }

        return this.tree;
    }

    /**
     * Разбор выражения
     */
    scanExpression(): TreeNodeBase | null {
        let term = this.scanTerm();
        let operationSymbol: SymbolBase | null = null;

        if (term) {
        while (this.symbol !== null && (
            this.symbol.symbolCode === SymbolsCodes.plus ||
            this.symbol.symbolCode === SymbolsCodes.minus
        )) {

            operationSymbol = this.symbol;
            this.nextSym();

             /**
             *  @todo Проверить: нормальный ли вариант добавления  secondTerm  (нужна прлверка на null) 
             */ 
            let secondTerm = this.scanTerm();

            if ( secondTerm ) {
            switch (operationSymbol.symbolCode) {
                case SymbolsCodes.plus:
                    term = new Addition(operationSymbol, term, secondTerm);
                    break;
                case SymbolsCodes.minus:
                    term = new Subtraction(operationSymbol, term, secondTerm);
                    break;
            }
        }
        }
    }

        return term;
    }

    /**
     * Разбор "слагаемого"
     */
    scanTerm(): TreeNodeBase | null{
        let multiplier = this.scanMultiplier();
        let operationSymbol: SymbolBase | null = null;

        if (multiplier !== null) {
            while (this.symbol !== null && (
                this.symbol.symbolCode === SymbolsCodes.star ||
                this.symbol.symbolCode === SymbolsCodes.slash
            )) {

                operationSymbol = this.symbol;
                this.nextSym();

                /**
                 *  @todo Проверить: нормальный ли вариант добавления  secondMultiplier  (нужна прлверка на null) 
                 */ 
                let secondTerm = this.scanMultiplier();

                if (secondTerm !== null) {

                    switch (operationSymbol.symbolCode) {
                        case SymbolsCodes.star:
                            multiplier = new Multiplication(operationSymbol, multiplier, secondTerm);
                            break;
                        case SymbolsCodes.slash:
                            multiplier = new Division(operationSymbol, multiplier, secondTerm);
                            break;
                    }
                }
            }
        }

        return multiplier;
    }

    /**
     *  Разбор "множителя" 
     */
    scanMultiplier(): NumberConstant | null {
        let integerConstant: SymbolBase | null = this.symbol;

        this.accept(SymbolsCodes.integerConst); // проверим, что текущий символ это именно константа, а не что-то еще 

        if (integerConstant !== null) {
            return new NumberConstant(integerConstant);
        } else {
            return null;
        }
    }
};