# Administrador de archivos y categorías



Pequeño abm de categorías y archivos. Los archivos subidos son almacenados en la carpeta public del proyecto para ser accedidos por los usuarios.

### Secciones
  - Permisos
  - Categorías
  - Archivos




### Instalación y uso

Seguir estos pasos para instalar y ejecutar el proyecto:

Este administrador requiere [Node.js](https://nodejs.org/) v4+ para funcionar.

Instalar las dependencias y correr el servidor

```sh
$ cd administrador-archivos
$ npm install 
//completar variables archivo .ENV
//correr migraciones
$ npx sequelize-cli db:migrate
$ npm start
```




License
----

MIT

