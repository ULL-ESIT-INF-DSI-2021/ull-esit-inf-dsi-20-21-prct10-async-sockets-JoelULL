## introducción
En esta práctica se ha usado el lenguaje de programación TypeScript. La herramienta utilizada en esta práctica ha sido la API asíncrona de Node.js. El objetivo principal es implementar a partir de la aplicación de procesamiento de notas de texto de la práctica 8, un servidor y un cliente haciendo uso de los sockets proporcionados por el módulo net de Node.js que permitan utilizar la aplicación de notas.

## Objetivos
  1. Conocer los sockets proporcionados por el módulo net de Node.js.
  2. Desarrollar la funcionalidad requerida en la práctica.
  3. Ganar experiencia en el lenguaje de programación TypeScript.

## Implementación de la práctica

### note.ts

Se ha recuperado este archivo en el que se define una nota de la práctica 8. Aquí se definirá la clase que permitirá al usuario crear sus notas añadiendo el usuario al que pertenece, el título, el cuerpo de la nota, y el color elegido.

### note-list.ts
Este archivo se ha recuperado también de la práctica anterior sin embargo para hacer esta práctica más sencilla y por lo que se pide, ha sido modificada de forma drástica. La funcionalidad que tenía el archivo note-app.ts ha sido trasladada a esta clase. Todos los métodos de la API de node.js para modificar ficheros se han utilizado en esta clase en sus distintos métodos:

##### addNote
Será un método que permite añadir una nota a un directorio de un usuario. Si el directorio no existe, se creará. En caso de que no haya una nota con ese título se añadirá, en caso contrario no lo hará puesto que ya existe. Si el color de la nota no es un color permitido no se añadirá, comprobando esto último con la función validateColors que se utilizó en la práctica 8 también en el archivo note-app.ts pero como ya se ha comentado esa funcionalidad también ha pasado a note-list.ts.

##### modifyNote
modifyNote será el método que permita al usuario modificar una nota que se encuentre en el directorio al que pertenece. De nuevo se vuelve a comprobar si la nota existe y también si el color nuevo que se pretende añadir sea uno valido.

##### deleteNote
Este método se encargará de eliminar una nota del directorio del usuario en caso de que exista.

Todos los métodos anteriores son booleanos, de esta manera se podrá comunicar al usuario si se ha tenido éxito en la operación que haya requerido a través de mensajes como se explicará más adelante.

##### listNotes
En este método se permitirá listar las notas que hay en el directorio del usuario. Si el directorio existe se cargarán todas las notas en un array de notas que será el que devuelva la función para luego poder mostrar sus títulos con el color correspondiente de cada una. En el caso de que no exista la carpeta del usuario, se enviará un array vacío.

#### ReadSpecificNote
Como el propio nombre del método indica, permitirá leer una nota especifica cuyo título se haya especificado. Si la nota existe se devolverá una nota con la información de la nota requerida.

### types.ts
Como se sugirió en la práctica, en este archivo se definen los tipos para las peticiones y respuestas en la aplicación, usandose RequestType en el cliente y ResponseType en el servidor.

### eventEmitterServer
Clase que hereda de la clase proporcionada por node.js eventEmitter, con esta clase podremos recibir y enviar eventos a través de sockets. 

### server.ts

En este fichero haremos uso del método net proporcionado por node.js. Lo primero que se hará es crear un servidor con el método createServer. A continuación se creará un emitter utilizando la clase nombrada anteriormente. Después de esto se tendrá en cuenta el tipo de la petición que se ha solicitado la cual contedrá la información del usuario. A partir de esta información con request.type (que contendrá el comando introducido por el usuario) en un switch se llamará a los metodos correspondientes de la clase note-list.ts. En caso de que haya exito,(en el caso de los métodos booleanos de la clase note-list.ts cuando devuelvan true) se realizarán los cambios pertinentes del comando introducido y se guardarán los resultados en response. En caso de que no se conozca el tipo de la petición que se ha generado, es decir el comando que ha ingresado el usuario, se mostrará un mensaje de error. Una vez terminado se procederá a enviar al cliente la información que se ha generado con el request mediante el método write. El servidor escucha en el puerto 60300 siguiendo el ejemplo de los apuntes de la asignatura.


## Observaciones

## Bibliografía
[API asíncrona de Node.js](https://nodejs.org/dist/latest/docs/api/child_process.html#child_process_asynchronous_process_creation)

[API de callbacks de Node.js](https://nodejs.org/dist/latest/docs/api/fs.html#fs_callback_api)

[StackOverflow](https://stackoverflow.com/)
