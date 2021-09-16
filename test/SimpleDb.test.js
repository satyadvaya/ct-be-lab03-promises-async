import { rm, mkdir } from 'fs/promises';
import { SimpleDb } from '../SimpleDb.js';

describe('SimpleDb', () => {
  const rootDir = './store';

  beforeEach(() => {
    return rm(rootDir, { recursive: true, force: true }).then(() => {
      return mkdir(rootDir, { recursive: true });
    });
  });

  it('should create a file within RootDir', () => {
    const newSimpleDb = new SimpleDb(rootDir);
    const objectContent = { word: 'banana' };

    return newSimpleDb.save(objectContent).then(() => {
      expect(objectContent.id).toEqual(expect.any(String));
    });
  });

  it('returns null for nonexistent id', () => {
    const newSimpleDb = new SimpleDb(rootDir);

    return newSimpleDb.get(123).then((whatever) => {
      expect(whatever).toBe(null);
    });
  });
});
