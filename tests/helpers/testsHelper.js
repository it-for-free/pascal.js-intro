import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {PascalJs} from '../../src/PascalJs/PascalJs';
import util from 'util';

export function getFullPath(ImportMetaUrlData, fileName) {
    const __filename = fileURLToPath(ImportMetaUrlData);
    return dirname(__filename) + '/' + fileName;
}

export function runFile(ImportMetaUrlData, fileName) {

    let PJS = new PascalJs();
    PJS.runFile(getFullPath(ImportMetaUrlData, fileName));

    return PJS;
}


/**
 * Распечатывает значения для отладки (с произвольной вложенностью)
 * 
 * @param {*} data 
 */
 export function insp(data, comment = '') {
    console.log('⚑', comment,  util.inspect(data, 
        {showHidden: false, depth: null}));
}
