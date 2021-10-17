
import fs from 'fs';

export class FileIO
{
    constructor(fileName)
    {
        this.charPointer = 0;
        this.text = fs.readFileSync(fileName, 'UTF-8');
    }

    nextCh()
    {
        return this.charPointer < this.text.length ?
            this.text[this.charPointer++] :
            null;
    }
}