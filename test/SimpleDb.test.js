import { rm, mkdir } from 'fs/promises';
import { SimpleDb } from '../SimpleDb.js';

describe('SimpleDb', () => {
    const rootDir = '../store';

    beforeEach(() => {
        return rm(rootDir, { recursive: true, force: true }).then(() => {
            return mkdir(rootDir, { recursive: true });
        });
    });

    it('should create a file within RootDir', async () => {
        const newSimpleDb = new SimpleDb(rootDir);
        const objectContent = { word: 'banana' };

        await newSimpleDb.save(objectContent);

        expect(objectContent.id).toEqual(expect.any(String));
    });

    it('should save and get an object', async () => {
        const newSimpleDb = new SimpleDb(rootDir);
        const objectContent = { word: 'banana' };

        await newSimpleDb.save(objectContent);
        const objectId = await newSimpleDb.get(objectContent.id);

        expect(objectId).toEqual(objectContent);
    });

    it('should return null for nonexistent id', async () => {
        const newSimpleDb = new SimpleDb(rootDir);

        const objectId = await newSimpleDb.get('nonexistent-id');

        expect(objectId).toBe(null);
    });

    it('should get all objects', async () => {
        const newSimpleDb = new SimpleDb(rootDir);
        const fruits = [
            { word: 'banana' },
            { word: 'plum' },
            { word: 'cherry' },
        ];

        await Promise.all(fruits.map((fruit) => newSimpleDb.save(fruit)));
        const objectId = await newSimpleDb.getAll();

        expect(objectId).toEqual(expect.arrayContaining(fruits));
    });

    it('should delete an object', async () => {
        const newSimpleDb = new SimpleDb(rootDir);
        const objectContent = { word: 'banana' };

        await newSimpleDb.save(objectContent);
        await newSimpleDb.delete(objectContent.id);
        const objectId = await newSimpleDb.get(objectContent.id);

        expect(objectId).toBe(null);
    });

    it('should update an object', async () => {
        const newSimpleDb = new SimpleDb(rootDir);
        const objectContent = { word: 'banana' };

        await newSimpleDb.save(objectContent);
        objectContent.word = 'apple';
        await newSimpleDb.update(objectContent);
        const objectId = await newSimpleDb.get(objectContent.id);

        expect(objectId).toEqual(objectContent);
    });
});
