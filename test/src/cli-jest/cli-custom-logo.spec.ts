import { exists, shell, stats, temporaryDir } from '../helpers';
const tmp = temporaryDir();

interface Image {
    size: number;
}

describe('CLI custom logo', () => {
    const distFolder = tmp.name + '-logo';

    describe('when specifying a custom logo png image', () => {
        beforeEach(function(done) {
            tmp.create(distFolder);
            let ls = shell('node', [
                './bin/index-cli.js',
                '-p',
                './test/src/todomvc-ng2/src/tsconfig.json',
                '-d',
                distFolder,
                '--customLogo',
                './test/src/todomvc-ng2/logo.png'
            ]);

            if (ls.stderr.toString() !== '') {
                console.error(`shell error: ${ls.stderr.toString()}`);
                done('error');
            }

            done();
        });
        afterEach(() => tmp.clean(distFolder));

        it('should have copied the customLogo', () => {
            let isFileExists = exists(`${distFolder}/images/logo.png`);
            expect(isFileExists).toBeTruthy();
            let originalFileSize = (stats('test/src/todomvc-ng2/logo.png') as Image).size,
                copiedFileSize = (stats(`${distFolder}/images/logo.png`) as Image).size;
            expect(originalFileSize).toEqual(copiedFileSize);
        });
    });

    describe('when specifying a custom logo svg image', () => {
        beforeEach(function(done) {
            tmp.create(distFolder);
            let ls = shell('node', [
                './bin/index-cli.js',
                '-p',
                './test/src/todomvc-ng2/src/tsconfig.json',
                '-d',
                distFolder,
                '--customLogo',
                './test/src/todomvc-ng2/logo.svg'
            ]);

            if (ls.stderr.toString() !== '') {
                console.error(`shell error: ${ls.stderr.toString()}`);
                done('error');
            }

            done();
        });
        afterEach(() => tmp.clean(distFolder));

        it('should have copied the customLogo', () => {
            let isFileExists = exists(`${distFolder}/images/logo.svg`);
            expect(isFileExists).toBeTruthy();
            let originalFileSize = (stats('test/src/todomvc-ng2/logo.svg') as Image).size,
                copiedFileSize = (stats(`${distFolder}/images/logo.svg`) as Image).size;
            expect(originalFileSize).toEqual(copiedFileSize);
        });
    });

    describe('when not specifying a custom logo svg image', () => {
        beforeEach(function(done) {
            tmp.create(distFolder);
            let ls = shell('node', [
                './bin/index-cli.js',
                '-p',
                './test/src/todomvc-ng2/src/tsconfig.json',
                '-d',
                distFolder
            ]);

            if (ls.stderr.toString() !== '') {
                console.error(`shell error: ${ls.stderr.toString()}`);
                done('error');
            }

            done();
        });
        afterEach(() => tmp.clean(distFolder));

        it('should not have copied the customLogo', () => {
            let isFileExists = exists(`${distFolder}/images/logo.svg`);
            expect(isFileExists).toBeFalsy();
        });
    });
});