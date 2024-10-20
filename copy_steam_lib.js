const fs = require('fs');
const path = require('path');

const platform = process.argv[2]; // win32, darwin, linux
const arch = process.argv[3]; // x64, arm64, etc.

let steamLib;
let steamArchDir;
switch (platform) {
    case 'darwin':
        steamArchDir = 'osx';
        steamLib = 'libsteam_api.dylib';
        break;

    case 'linux':
        steamArchDir = arch === 'x64' ? 'linux64' : 'linux32';
        steamLib = 'libsteam_api.so';
        break;

    case 'win32':
    default:
        steamArchDir = arch === 'x64' ? 'win64' : 'win32';
        steamLib = arch === 'x64' ? 'steam_api64.dll' : 'steam_api.dll';
        break;
}

const appName = 'Kosmolaris';
const buildDir = path.join(__dirname, `builds/${appName}-${platform}-${arch}`);
const sourceFile = path.join(__dirname, `.steamlibs/${steamArchDir}/${steamLib}`);
const destinationFile = path.join(buildDir, steamLib);

fs.copyFile(sourceFile, destinationFile, (err) => {
    if (err) {
        console.error('Error al copiar el archivo:', err);
    } else {
        console.log(`Archivo copiado correctamente en el root del build para: ${platform}-${arch}.`);
    }
});