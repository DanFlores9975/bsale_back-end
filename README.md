# Back-end de base de datos con productos 
## Elaboración de una rest api con node js y express para una tienda online

Para consultar la rest API de manera online se utilizan los siguientes endpoints
---
* **GET ->** https://bsaleback-end-production.up.railway.app/api
    * Obtiene todos los productos ordenados por categoria.
---
* **GET ->** https://bsaleback-end-production.up.railway.app/api/category
    * Params - **cat**
    * Obtiene los productos de la categoria solicitada.
---
* **GET ->** https://bsaleback-end-production.up.railway.app/api/search
    * Params - **name**
    * Obtiene todos los productos con incidencias en el nombre.

---


## Recursos y elaboracion del Rest API

Los recursos utilizados para que esta rest api funcionara, son:

* NodeJS (Entorno)
* Express (Framework)
    - Body-parser
* Nodemon
* MySQL2


A continuación mencionaré cual es la función de cada uno y como instalarlo:

### NodeJS
* Node.js es un entorno en tiempo de ejecución multiplataforma, de código abierto, para la capa del servidor (pero no limitándose a ello) basado en el lenguaje de programación JavaScript, asíncrono, con E/S de datos en una arquitectura orientada a eventos y basado en el motor V8 de Google. Fue creado con el enfoque de ser útil en la creación de programas de red altamente escalables, como por ejemplo, servidores web.​ Fue creado por Ryan Dahl en 2009 y su evolución está apadrinada por la empresa Joyent, que además tiene contratado a Dahl en plantilla.Node.js es similar en su propósito a Twisted o Tornado de Python, Perl Object Environment de Perl, libevent o libev de C, EventMachine de Ruby, vibe.d de D y Java EE de Java existe Apache MINA, Netty, Akka, Vert.x, Grizzly o Xsocket. Al contrario que la mayoría del código JavaScript, no se ejecuta en un navegador, sino en el servidor. Node.js implementa algunas especificaciones de CommonJS.7​ Node.js incluye un entorno REPL para depuración interactiva.

- [Instalación de NodeJS](https://nodejs.org/en/)

![Nodejs](https://adrianalonso.es/wp-content/uploads/2014/09/nodejs.png)

### Express (nodeJS)
* Express es el framework web más popular de Node, y es la librería subyacente para un gran número de otros frameworks web de Node populares. Proporciona mecanismos para:

* Escritura de manejadores de peticiones con diferentes verbos HTTP en diferentes caminos URL (rutas).
Integración con motores de renderización de "vistas" para generar respuestas mediante la introducción de datos en plantillas.
Establecer ajustes de aplicaciones web como qué puerto usar para conectar, y la localización de las plantillas que se utilizan para renderizar la respuesta.
Añadir procesamiento de peticiones "middleware" adicional en cualquier punto dentro de la tubería de manejo de la petición.
A pesar de que Express es en sí mismo bastante minimalista, los desarrolladores han creado paquetes de middleware compatibles para abordar casi cualquier problema de desarrollo web. Hay librerías para trabajar con cookies, sesiones, inicios de sesión de usuario, parámetros URL, datos POST, cabeceras de seguridad y muchos más. Puedes encontrar una lista de paquetes middleware mantenida por el equipo de Express en Express Middleware (junto con una lista de algunos de los paquetes más populares de terceros).
* Para instalar el framework dentro del entorno de nodejs se tiene que que usar el comando **npm i express** dentro de la carpeta del proyecto
* Body-parser Se utiliza para que nuestro framework express pueda leer o comprender todo lo que se le envia desde el campo body,  para instalarlo simplemente se utiliza el comando **npm i body-parser**

* [Pagína oficial de express](https://expressjs.com/)

![Express](https://portafolio-fabricio.web.app/images/skills/express.png)


### Nodemon
* En Node.js, debe reiniciar el proceso para que los cambios surtan efecto. Eso añade un otro paso a su flujo de trabajo para que los cambios surtan efecto. Puede eliminar este paso adicional usando nodemon para reiniciar el proceso automáticamente.

* nodemon es una utilidad de interfaz de línea de comandos (CLI) desarrollada por @rem que envuelve su aplicación Node, vigila el sistema de archivos y reinicia automáticamente el proceso.
* [Mas acerca de nodemon, su instalación y configuración](https://www.digitalocean.com/community/tutorials/workflow-nodemon-es)

    ![Nodemon](https://www.returngis.net/wp-content/uploads/2019/08/nodemon-logo.png)

---
## Desarrollo de la Rest API
Cabe resaltar que los archivos de nuestra ruta fuente son archivos de configuración.

Una vez creado nuestro proyecto e instaladas todas las dependencias, nuestro package.json puede verse tal que así.
~~~javascript
{
  "name": "bsale_back-end",
  "version": "1.0.0",
  "description": "bsale app back-end",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/DanFlores9975/bsale_back-end.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/DanFlores9975/bsale_back-end/issues"
  },
  "homepage": "https://github.com/DanFlores9975/bsale_back-end#readme",
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "mysql2": "^2.3.3"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
~~~
En esta podemos observar absolutamente todo lo que se esta utilizando en este proyecto.

### **Index.js**
Ahora bien, comprendido todo esto sigamos con nuestro archivo fuente el cual se llama index.js y se encuentra en la carpeta "src".

~~~javascript
import app from './app.js'
import {PORT} from './config.js'

app.listen(PORT);
console.log("Server on port ", PORT);
};
~~~
Al ser este nuestro documento principal solo se utilizara para que se ejecute el metodo principal el cual es la escucha del puerto al que nos conectamos
~~~javascript 
import express from "express";
import productQ from "./routes/product.routes.js";
import cors from "cors";

const app = express();
app.use(cors());

app.use("/api", productQ);
app.use((req, res, next) => {
    res.status(404).json({
        message: 'No se encontro la pagína :('
    })
})

export default app;
~~~
Pues bien, en este fragmento de nuestro archivo app.js podemos observar como instanciamos nuestro objeto app el cual tiene la dependencia de express();

Tambien se agrega cors para que se pueda hacer fetch() a nuestros datos a la hora de consumirlos en una aplicacion.

Asi mismo declaramos la ruta que utilizará nuesta rest api y los metodos dentro de nuestro archivo product.routes.js donde se encuentra todo el codigo de nuestros endpoints.

En caso de acceder a una pagina que no existe regresamos un


### **config.js**
En este documento configuramos el puerto donde ira conectado en produccion si no, le asignamos uno:
~~~javascript
import { config } from "dotenv";

config()

export const PORT = process.env.PORT || 3000
~~~
### **db.js**
En este documento configuramos la conexion a la base de datos proporcionada, hacemos un createPool() ya que este evita las reconexiones y se mantiene comunicado.
~~~javascript
import { createPool } from "mysql2/promise";

export const pool = createPool({
    host: 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
    user: 'bsale_test',
    password: 'bsale_test',
    port: 3306,
    database: 'bsale_test'
})
~~~

### **./routes/product.routes.js**

En este archivo se encuentra todo el codigo de nuestros endpoints por lo cual es el mas extenso de los anteriores.

Comencemos con las dependencias.
~~~javascript
import { Router } from "express";
import { getP, getPS, getPC } from "../controllers/product.controller.js";

const router = Router();

router.get("/", getPS);
router.get("/search", getP);
router.get("/category", getPC);


export default router;
~~~
En esta primera parte obtenemos los metodos necesarios como lo son {Router} El cual nos permite tener conexion directa con nuestro archivo *app.js* para recibir y poder utilizar los metodos en cuestion y la ruta especificada como lo vimos en dicho archivo, tambien importamos los controladores para los respectivos endpoints

Instanciamos nuestro objeto router para hacer uso de el mismo.

Y lo exportamos para utilizarlo en el archivo app.js

### **./controllers/product.controller.js**
### Endpoint _GET obtiene todos los productos ordenados por categoria.
~~~javascript
import {pool} from '../db.js';

export const getPS = async(req, res)=>{
    try{
    const [result] = await pool.query('SELECT * FROM category C INNER JOIN product P ON C.id=P.category;');
    res.json(result);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo salio mal!'
        })
    }
    
}

~~~
Se hace la peticion a la base de datos. hago un JOIN INNER de los productos y las categorias y selecciono todos sus campos para retornalos en un archivo json

### Endpoint _GET category obtiene todos los productos de una categoria.
~~~javascript
export const getPC = async(req, res)=>{

    try{
        const [result] = await pool.query('SELECT * FROM product WHERE category = ?;',[req.query.cat]);
    
        if(result.length <= 0 ) return res.status(404).json({
            message:'La busqueda no coincide con ningun producto.'
        })
        
        res.json(result);
    } catch (error) {
            return res.status(500).json({
            message: 'Algo salio mal!'
        })
    }

}
~~~

Podemos observar principalmente que recibimos la petición _GET y vamos a hacer una busqueda en el campo category de la base de datos para asi retornar solamente los que pertenecen a esa categoria y los retornamos en un objeto json, si no se encuentra se envia un mensaje.


### Endpoint _GET obtiene todos los productos con incidencias de nombre.

~~~javascript
export const getP = async(req, res)=>{

    try{
        const [result] = await pool.query('SELECT * FROM product WHERE name LIKE ?;',[`%${req.query.name}%`]);
    
        if(result.length <= 0 ) return res.status(404).json({
            message:'La busqueda no coincide con ningun producto.'
        })
        
        res.json(result);
    } catch (error) {
            return res.status(500).json({
            message: 'Algo salio mal!'
        })
    }

}
~~~
En este endpoint recibimos la peticion get por medio de un parametro llamado name, hacemos una busqueda de todos los productos que tengas incidencias de nombre y los retornamos en un objeto json, si no hay incidencia se envia mensaje de que no hay coincidencias.

Como se observa en el archivo, todas estos metodos son exportados a nuestro archivo *app.js* en el cual hacemos el manejo de todos los endpoints solicitados.

## Despedida
Esto seria todo por mi parte, espero les haya gustado esta implementación de rest api, si observan que se podria mejorar algo o tienen alguna duda del funcionamiento de la misma, me lo pueden hacer saber a mi correo.

danflores9977@gmail.com

Suerte y mucho exito a todos!! 🚀💻🌌
