import { Addition } from '../SyntaxAnalyzer/Tree/Addition';
import { Multiplication } from '../SyntaxAnalyzer/Tree/Multiplication';
import { Subtraction } from '../SyntaxAnalyzer/Tree/Subtraction';
import { Division } from '../SyntaxAnalyzer/Tree/Division';
import { NumberConstant } from '../SyntaxAnalyzer/Tree/NumberConstant';
import { NumberVariable } from './Variables/NumberVariable';

export class Engine
{
    /**
     * Результаты вычислений (изначально - один для каждой строки)
     * 
     * @type string[]
     */
    results;

    constructor(trees)
    {
        this.trees = trees;
        this.results = [];
    }

    run()
    {
        let self = this;

        this.trees.forEach(

            function(tree)
            {
                let result = self.evaluateSimpleExpression(tree);
                console.log(result.value);
                self.results.push(result.value); // пишем в массив результатов
            }
        );

    }

    evaluateSimpleExpression(expression)
    {
        if (expression instanceof Addition ||
                expression instanceof Subtraction) {

            let leftOperand = this.evaluateSimpleExpression(expression.left);
            let rightOperand = this.evaluateSimpleExpression(expression.right);

            let result = null;
            if (expression instanceof Addition) {
                result = leftOperand.value + rightOperand.value;
            } else if (expression instanceof Subtraction) {
                result = leftOperand.value - rightOperand.value;
            }

            return new NumberVariable(result);
        } else {
            return this.evaluateTerm(expression);
        }
    }

    evaluateTerm(expression)
    {
        if (expression instanceof Multiplication) {
            let leftOperand = this.evaluateTerm(expression.left);
            let rightOperand = this.evaluateTerm(expression.right);

            let result = leftOperand.value * rightOperand.value;

            return new NumberVariable(result);
        } else if (expression instanceof Division) {
            let leftOperand = this.evaluateTerm(expression.left);
            let rightOperand = this.evaluateTerm(expression.right);
            let result = leftOperand.value / rightOperand.value;

            return new NumberVariable(result);
        } else {
            return this.evaluateMultiplier(expression);
        }
    }

    evaluateMultiplier(expression)
    {
        if (expression instanceof NumberConstant) {
            return new NumberVariable(expression.symbol.value);
        } else {
            throw 'Number Constant expected.';
        }
    }
};