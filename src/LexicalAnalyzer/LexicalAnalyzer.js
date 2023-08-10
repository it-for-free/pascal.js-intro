import { FileIO } from '../IO/FileIO';
import { IntegerConstant } from '../LexicalAnalyzer/Symbols/IntegerConstant';
import { Symbol } from '../LexicalAnalyzer/Symbols/Symbol';
import { SymbolsCodes } from './SymbolsCodes';


export class LexicalAnalyzer
{
    constructor(fileIO)
    {
        this.fileIO = fileIO;
        this.char = ' ';
        this.currentWord = '';
    }

    nextSym()
    {
        if (this.char === null) {
            return null;
        }

        this.skipWhiteSpaces();

        return this.scanSymbol();
    }

    skipWhiteSpaces()
    {
        let ws = /[ \t]/;

        while (ws.exec(this.char) !== null) {
            this.char = this.fileIO.nextCh();
        }
    }

    scanSymbol()
    {
        if (this.char === null) {
            return null;
        }

        let predWord = this.currentWord;
        this.currentWord = '';

        if ( isNaN(parseInt(predWord)) && 
            /[-\d]/.exec(this.char) !== null ) {

            if (/-/.exec(this.char) !== null) {
                this.currentWord += this.char;
                this.char = this.fileIO.nextCh();
                this.skipWhiteSpaces();
            } 

            while (/[\d.]/.exec(this.char) !== null) {
                this.currentWord += this.char;
                this.char = this.fileIO.nextCh();
            }

            return new IntegerConstant(SymbolsCodes.integerConst, this.currentWord);

        } else if (/\w/i.exec(this.char) !== null) {

            while (/\w/i.exec(this.char) !== null) {
                this.currentWord += this.char;
                this.char = this.fileIO.nextCh();
            }

            return this.getSymbol(SymbolsCodes.identifier);

        } else if (/\n/.exec(this.char) !== null) {
            this.char = this.fileIO.nextCh();
            return this.getSymbol(SymbolsCodes.endOfLine, this.currentWord);
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

                case '=':
                    this.char = this.fileIO.nextCh();
                    return this.getSymbol(SymbolsCodes.equal);

            }
        }
        throw `Inadmissible symbol:${this.char}.`;
    }

    getSymbol(symbolCode)
    {
        return new Symbol(symbolCode, this.currentWord);
    }
}