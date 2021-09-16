// import { readFile, writeFile } from 'fs/promises';
import { writeFile } from 'fs/promises';
import path from 'path';
import shortid from 'shortid';

export class SimpleDb {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  save(objectFile) {
    objectFile.id = shortid.generate();
    const fileName = `${objectFile.id}.json`;
    this.newFile = path.join(this.rootDir, fileName);
    return writeFile(this.newFile, JSON.stringify(objectFile));
  }
}
