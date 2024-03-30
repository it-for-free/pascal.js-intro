
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
    engine: Engine;


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
}