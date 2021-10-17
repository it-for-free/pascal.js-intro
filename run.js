import { FileIO } from './src/IO/FileIO';
import { LexicalAnalyzer } from './src/LexicalAnalyzer/LexicalAnalyzer';
import { SyntaxAnalyzer } from './src/SyntaxAnalyzer/SyntaxAnalyzer';
import { Engine } from './src/Semantics/Engine';

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
console.log(trees);
let engine = new Engine(trees);
engine.run();
