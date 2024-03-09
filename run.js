import { FileIO } from './src/IO/FileIO.js';
import { LexicalAnalyzer } from './src/LexicalAnalyzer/LexicalAnalyzer.js';
import { SyntaxAnalyzer } from './src/SyntaxAnalyzer/SyntaxAnalyzer.js';
import { Engine } from './src/Semantics/Engine.js';

let fileIO = new FileIO('example.code');

//for (let i = 1; i <= 34; i++ ) {
//    let currentChar = fileIO.nextCh();
//    console.log(i, ') ', currentChar);
//}

let lexicalAnalyzer = new LexicalAnalyzer(fileIO);


//for (let i = 1; i <= 10; i++ ) {
//    let currentSym = lexicalAnalyzer.nextSym();
//    console.log(i, ') ', currentSym);
//}


let syntaxAnalyzer = new SyntaxAnalyzer(lexicalAnalyzer);
syntaxAnalyzer.analyze();

let trees = syntaxAnalyzer.trees;

let engine = new Engine(trees);
engine.run();
