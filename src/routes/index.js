import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const router = express.Router();

// Get the current file path and directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the path to the routes directory
const PATH_ROUTES = join(__dirname);

// Remove the extension from the file name
const removeExtension = (fileName) => {
    return fileName.split('.').shift();
};

// Get all files from the routes directory
const files = fs.readdirSync(PATH_ROUTES).filter((file) => {
    return file !== 'index.js';
});

// Dynamically import each file as a route module and register it with the Express router
for (let file of files) {
    const routeModule = await import(join(PATH_ROUTES, file));
    router.use(`/${removeExtension(file)}`, routeModule.default);
}

export default router;
