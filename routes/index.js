import express from 'express';
import fs from 'fs';

const router = express.Router();

//obtener la ruta del directorio actual
const { pathname: root } = new URL('./', import.meta.url);

//limpiar la ruta del directorio actual
const PATH_ROUTES = (root.replace(/%20/g, ' ').replace(/\//g, '\\')).substring(1, root.length - 1);

//eliminar la extension del archivo
const removeExtension = (fileName) => {
    return fileName.split('.').shift();
};

//obtener todos los archivos de la carpeta routes
const files = fs.readdirSync(PATH_ROUTES).filter((file) => {
    return file != 'index.js';
});

//importar de manera dinamica todas las rutas
for (let file of files) {
    router.use(`/${removeExtension(file)}`, (await import(`./${file}`)).default);
}

export default router;