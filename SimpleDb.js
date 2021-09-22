import { readFile, writeFile, readdir, rm } from 'fs/promises';
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

    get(id) {
        const fileName = `${id}.json`;
        this.newFile = path.join(this.rootDir, fileName);
        return readFile(this.newFile, 'utf-8')
            .then((booger) => {
                return JSON.parse(booger);
            })
            .catch((error) => {
                if (error.code === 'ENOENT') {
                    return null;
                }
                throw error;
            });
    }

    async getAll() {
        const directoryFiles = await readdir(this.rootDir);
        const ids = directoryFiles.map((file) => path.basename(file, '.json'));
        return Promise.all(ids.map((id) => this.get(id)));
    }

    async delete(id) {
        const fileName = `${id}.json`;
        this.newFile = path.join(this.rootDir, fileName);
        return rm(this.newFile);
    }
}
