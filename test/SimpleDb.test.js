import { rm, mkdir } from 'fs/promises';
import { SimpleDb } from '../SimpleDb.js';

describe('SimpleDb', () => {
  const rootDir = '../store';

  beforeEach(() => {
    return rm(rootDir, { recursive: true, force: true }).then(() => {
      return mkdir(rootDir, { recursive: true });
    });
  });

  it('should create a file within RootDir', () => {
    const newFile = new SimpleDb(rootDir);
    const objectContent = { word: 'banana' };

    return newFile
      .keep(objectContent)
      .then(() => {
        return newFile.tell();
      })
      .then((content) => {
        expect(content).toEqual(objectContent);
      });
  });
});
