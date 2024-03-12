
import fs from 'fs';

export class FileIO
{
    charPointer: number;
    text: string;

    constructor(fileName)
    {
        this.charPointer = 0;
        this.text = fs.readFileSync(fileName, 'utf-8');
    }

    nextCh()
    {
        return this.charPointer < this.text.length ?
            this.text[this.charPointer++] :
            null;
    }
}