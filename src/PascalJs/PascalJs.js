
import { FileIO } from '../IO/FileIO';
import { LexicalAnalyzer } from '../LexicalAnalyzer/LexicalAnalyzer';
import { SyntaxAnalyzer } from '../SyntaxAnalyzer/SyntaxAnalyzer';
import { Engine } from '../Semantics/Engine';

/**
 * Основной файл проекта, предоставляющий возможность интерпретировать код
 */
export class PascalJs {
    /**
     * @type Engine  
     */
    engine;


    runFile(filePath) {
        var fileIO = new FileIO(filePath);
        var lexicalAnalyzer = new LexicalAnalyzer(fileIO);
        var syntaxAnalyzer = new SyntaxAnalyzer(lexicalAnalyzer);
        syntaxAnalyzer.analyze();
        var engine = new Engine(syntaxAnalyzer.trees);
        engine.run();

        this.engine = engine;
        return engine;
    }

    // Не используется до реализации поддержки переменных
    getVar(varName) {
        return this.engine.getCurrentScope().items[varName];
    }

    // Не используется до реализации поддержки переменных
    getVarValue(varName) {
        let variable = this.getVar(varName);
        
        if (variable.typeId === TypesIds.ARRAY) {
            return this.getVar(varName).items;
        } else  if (variable.typeId === TypesIds.ENUM) {
            return this.getVar(varName).value.symbol.stringValue;
        } else {
            return this.getVar(varName).value;
        }
    }

    // Не используется до реализации поддержки ошибок
    getError() {
       return this.error;   
    }
}