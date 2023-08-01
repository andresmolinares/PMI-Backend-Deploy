import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const router = express.Router();
let PATH_ROUTES = null;

if (process.platform === 'win32') {
    // Get the current file path and directory path in windows
    const { pathname: root } = new URL('./', import.meta.url);

    //Define the path to the routes directory
    PATH_ROUTES = (root.replace(/%20/g, ' ').replace(/\//g, '\\')).substring(1, root.length - 1);
} else if(process.platform === 'linux') {
    // Get the current file path and directory path in linux
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    // Define the path to the routes directory
    PATH_ROUTES = join(__dirname);
}

// Remove the extension from the file name
const removeExtension = (fileName) => {
    return fileName.split('.').shift();
};

// Get all files from the routes directory
const files = fs.readdirSync(PATH_ROUTES).filter((file) => {
    return file !== 'index.js';
});

if (process.platform === 'win32') {
    // Dynamically import each file as a route module and register it with the Express router in windows
    for (let file of files) {
        router.use(`/${removeExtension(file)}`, (await import(`./${file}`)).default);
    }
} else if(process.platform === 'linux') {
    // Dynamically import each file as a route module and register it with the Express router in linux
    for (let file of files) {
        const routeModule = await import(join(PATH_ROUTES, file));
        router.use(`/${removeExtension(file)}`, routeModule.default);
    }
}

export default router;