import { FileIO } from '../IO/FileIO';
import { IntegerConstant } from '../LexicalAnalyzer/Symbols/IntegerConstant';
import { Symbol } from '../LexicalAnalyzer/Symbols/Symbol';
import { SymbolsCodes } from './SymbolsCodes';


export class LexicalAnalyzer {
    currentWord: string;
    fileIO: FileIO;
    char: string | null;

    constructor(fileIO) {
        this.fileIO = fileIO;
        this.char = ' ';
        this.currentWord = '';
    }

    nextSym() {
        if (this.char === null) {
            return null;
        }

        this.skipWhiteSpaces();

        return this.scanSymbol();
    }

    /**
     * "Прокручиваем" пробельные символы (их может быть сколько угодно, мы их не считываем как "слова")
     */
    skipWhiteSpaces() {
        let ws = /[ \t]/;

        while ((this.char !== null)
            && ws.exec(this.char) !== null) {
            this.char = this.fileIO.nextCh();
        }
    }


    /**
     * Проходимся по символам, которые являются составляющими чего-то какого-то "слова" в смысле, что там не одна "буква", 
     * напр. имени переменной или числа
     */
    scanWord(regExp: RegExp) {
        while ((this.char !== null)
            && regExp.exec(this.char) !== null) {
            this.currentWord += this.char;
            this.char = this.fileIO.nextCh();
        }
    }


    scanSymbol() {

        if (this.char === null) {
            return null;
        }

        this.currentWord = '';
        const numberSymbolsRegExp = /\d/;  
        const variableSymbolsRegExp = /\w/i;

        if (numberSymbolsRegExp.exec(this.char) !== null) {    
            this.scanWord(numberSymbolsRegExp);

            return new IntegerConstant(SymbolsCodes.integerConst, this.currentWord);

        } else if (variableSymbolsRegExp.exec(this.char) !== null) {
            this.scanWord(variableSymbolsRegExp);

            return this.getSymbol(SymbolsCodes.identifier);

        } else if (/\n/.exec(this.char) !== null) {
            this.char = this.fileIO.nextCh();
            return this.getSymbol(SymbolsCodes.endOfLine);
        } else {

            switch (this.char) {
                case '-':
                    this.char = this.fileIO.nextCh();
                    return this.getSymbol(SymbolsCodes.minus);

                case '+':
                    this.char = this.fileIO.nextCh();
                    return this.getSymbol(SymbolsCodes.plus);

                case '*':
                    this.char = this.fileIO.nextCh();
                    return this.getSymbol(SymbolsCodes.star);

                case '/':
                    this.char = this.fileIO.nextCh();
                    return this.getSymbol(SymbolsCodes.slash);
            }
        }
        throw `Inadmissible symbol:${this.char}.`;
    }

    getSymbol(symbolCode) {
        return new Symbol(symbolCode, this.currentWord);
    }
}