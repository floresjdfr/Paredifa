## Autores
- Rolando Herrera Bustos ID: 402330997 10am
- Marvin Aguilar Fuentes ID: 116830152 10am
- Alonso Calderón Trigueros ID: 116880486 10am
- José David Flores Rodríguez ID: 402390142 10am

**Grupo: 02**
**Curso: EIF400**

## ¿Qué es Paredifa?
- Paredifa es una Single Web Application creada con la finalidad de generar automátas a partir de la interacción de forma manual por parte del usuario, o generación automática apartir de una expresión regular dada. La Aplicación está desarrollada con la biblioteca de Javascript React JS para la parte frontend, para el backend cuenta con dos servidores, el servidor express, el cuál se encarga de comunicarse con la base de datos y hacer peticiones a la misma para interactuar con la capa de persistencia de datos, además también manda peticiones al segundo servidor, un servidor escrito en prolog de funcionalidad compilador de expresiones regulares y generación de autómatas apartir de esa expresión, además verifica si los recorridos de los autómatas son correctos o incorrectos, y da la opción de parsear los automátas a JSON tanto para los request como para las respuestas.

## ¿Cómo usar Paredifa?

### Creación de un autómata
- Hay dos formas de crear un automáta:
    - La primera forma es el modo DFA el cuál me brinda las mismas carácterísticas que en el paredifa versión 1, primero agregando un vocabulario y confirmando el mismo al presionar el botón llamado "Set Vocabulary" esto me permitirá crear un autómata basado en el vocabulario dado.
        Opciones de Creación (Botones):
        - New State: Este botón permite crear un estado/nodo en el canvas, para ello se da un click en el y luego un click en el canvas en el sitio que deseo agregar ese estado.
        - New Transition: Este botón permite crear una transición entre un mismo estado u otro, para ello se da un click en el y luego click en el estado de entrada y otro click en el estado de salida, luego se pregunta por el símbolo a agregar a la transición, esté símbolo debe ser acorde al vocabulario, si no, no permite agregar el símbolo digitado, para agregar multiples símbolos se separan con comas y se da click en el botón aceptar para añadir la transición.
        - Delete: Este botón permite borrar los estados o transiciones que se encuentran seleccionadas al hacer click en ellas.
        - Set Start: Este botón permite setear un estado a inicial, solo permite un inicial si existe un estado inicial previo y se elije otro, se le cederá la opción de inicial al mismo.
        - Set final: Este botón permite setear un estado o varios a final, para ello se seleccionan los estados y se presiona el botón.

    - La segunda forma es el modo RE el cuál utiliza las opciones de compilación de prologo, para ello se ingresa la Regex en el campo establecido y seguidamente se presiona el botón "Set Regex", esto nos desplegará un autómata generado en prolog con base a la regex dada por el usuario.

### Otras Opciones de las Cajas de Herramientas
- Run: Esta opción me permite ejecutar una animación de recorrido en el autómata, dependiendo del camino que el usuario digite, al hacer click en el botón Run este mandará una petición al servidor de prolog para verificar e informar si el cámino es correcto, es decir se detiene en un estado final o caso contrario me informa si el camino es incorrecto/rechazado.
- Export DFA to PNG: Permite guardar una imagen PNG del canvas cuando se encuentra un autómata en el mismo, de lo contrario se denegará dicha opción.
- Save / Update Automaton: Permite guardar o actualizar un autómata en la base de datos del usuario, si el usuario no ha iniciado sesión me muestra una alerta sugiriendo el incio de sesión, también mostrará otra alerta en caso de presionar el botón sin que exista un autómata en el canvas, si hay un usuario autentificado y un autómata en el canvas, si este existe en la lista de autómatas del usuario, se actualizará, si no existe se guardará como nuevo automata.
- Search Automaton: Despliega un listado de los autómatas del usuario, si no se ha iniciado sesión se indica que lo haga para visualizar la lista de autómatas, al cargar la lista, si el usuario posee autómatas guardados en la base de datos me da la opción de display el cuál desplegará el automata en el canvas y la opción de delete me permite borrar el autómata de la base de datos.
- Clear Canvas: Limpia el canvas y borra los autómatas desplegados en este, lo hace por medio de un diálogo de confirmación de sí o no.
- Show Errors: Muestra una lista de errores dependiendo si existe una mala configuración del autómata.

### Otras Funcionalidades
- El botón "Instruccions" despliega una ventana con la lista de instrucciones de la aplicación.
- El botón "About Us" permite realzar un gesto about, donde obtiene la información del proyecto por medio de un request a la base de datos.
- Funcionalidad de "Login" está permite la autenticación o registro de un usuario en la aplicación utilizando la técnología OAuth por medio de la herramienta Auth0.

### Técnologías utilizadas
- Persistencia con Base de Datos NoSQL MongoDB, utilizando el paquete Mongoose en el API.
- Server Express para la realización de peticiones a la base de datos MongoDB.
- React JS para la creación del sitio Single Web Application.
- Auth0 para la autenticación de usuarios con la tecnología OAuth por medio de una cuenta de Google, Facebook o propia del servicio de Auth0.
- ////////////////////////EXPLICAR LO DE DOCKER Y AZURE////////////////////////////


### Declaración jurada
_Declaramos de manera jurada que el proyecto entregado fue realizado por el grupo de autores con participación proporcional y balanceada de todos y solo los autores declarados, de manera original y que las fuentes de consulta usadas son las declaradas._