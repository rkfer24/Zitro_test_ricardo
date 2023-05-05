# Zitro_test_ricardo
////////////
//README
///////////
En general estoy contento con que funcione el proyecto, pero creo que hay muchas cosas a mejorar, entre ellas ordenar los elementos en layers y trabajar la estética mas allá de la lógica, sobretodo en la SlotMachine. Me ha dado el tiempo justo para acabarlo sin poder repasar y optimizar la aplicación. Siendo la primera vez que tocaba Typescript y Cocos, he necesitado también probar métodos que a veces podian ser más sencillos pero no tan eficientes.




//////////////////////////////////////
/////////////GameManager.ts///////////
//////////////////////////////////////

Decido crear un GameManager para gestionar el cambio y el control entre escenas. Si el proyecto fuera más grande, creo que tendría sentido desarrollar cada función de forma más modular para controlar por ejemplo cambios de escenas, personalización de plataformas, gestion de audio, carga y guardado de datos persistentes, etc por separado.

En este caso, se encarga solo de gestionar las cargas entre escenas. Lo mejoraría:

- gestionando errores de carga.

- gestionando estados de carga/loading.

- lanzando el script como un Singleton desde la clase principal del proyecto, garantizando una sola instancia y acceso a él desde cualquier parte, pero he priorizado lanzarlo desde la escena splash directamente como componente de un Nodo por ser mas rápido de probar.

- validar el GameManager en cada escena como pasa ahora puede casuar errores si no se encuentra.

//////////////////////////////////////
/////////////GameLoader.ts////////////
//////////////////////////////////////
Para simular la carga, loadingSimulator devuelve una promise representando si la carga ha sido completada o no. 


Lo mejoraría:

- introducir una función de manejo de errores para mostrar qué ha fallado.


/////////////////////////////////////
/////////////Menu.ts/////////////////
/////////////////////////////////////

Nunca antes había hecho una request API. Inicialmente se consultaba cada segundo a la url, pero creo que era innecesario e implementé un código de un reloj que encontré rápidamente para actualizar el tiempo después de hacer una primera llamada para establecer la hora actual.

Pueden haber problemas de desincronización y quizás sería interesante repetir la llamada cada x segundos para verificar que no hay discrepancias. Mejoraría:

- Declararía algunos métodos private.
- Gestión de errores de petición.
- fetch en lugar de XMLHttpRequest?? (tendria que investigar mas)



//////////////////////////////////////
/////////////QuizController.ts////////
//////////////////////////////////////

Decido randomizar el orden de las preguntas y las respuestas. Aunque no es necesario me pareció interesante probarlo. Utilizo el algoritmo Fisher-Yates porque no lo había utilizado nunca y he visto que es un algoritmo de randomización usual en los juegos de azar, lo que me pareció relevante para el test.

Hay varias formas de almacenar la pregunta correcta. Decido crear otro campo llamado "RespuestaCorrecta" para cada pregunta en el JSON y comprararla con la respuesta. También consideré comparar la respuesta con la posición[0] de esa pregunta en Respuestas, pero implica almacenar un índice de la pregunta para saber cuál es y consultar el JSON original, lo que por otra parte para validar la repsuesta a través de internet podría ser interesante.

Creo que el código está separado por funcionalidades y eso me parece bien. Mejoraría:

- Ocultar los cuadros de respuesta hasta mostrarlas.
- Animar aparición respuestas después de la pregunta.
- Blindar las respuestas hasta 1 segundo después para evitar respuestas involuntarias.
- hacer fetch en lugar de XMLHttpRequest??
- sonidos acierto/error/animacion.


//////////////////////////////////////
/////////////SlotMachine.ts///////////
//////////////////////////////////////

La idea era familiarizarme con las animaciones de Cocos y con su control a través AnimationController. Al final he tenido algunos problemas con el renderizado de los iconos( y me he visto obligado a no dejarlo tan smooth), creo porque los sprites estaban fuera de la pantalla a la hora de dibujarlos, pero tendría que investigar más y familiarizarme con la herramienta.

Primero cargamos el contenido de los rodillos por código, y luego los sprites correspondientes. Esto lo separaría para hacerlo más modular.

He expuesto el contenido de los rodillos porque podría ser interesante cambiar en un JSON tanto el número de elementos como el contenido. Además con algunas mejoras podría hacerse válido para indefinido número de rodillos e iconos que contengan dentro.

Para representar el movimiento rodillo, he decidido crear una animación de giro estándar en loop y que el padre de cada rodillo sea el único que cambia su posición para colocar el icono correspondiente en el centro de la pantalla. Por una parte definimos el icono(resultado en lógica) y por otra animamos el padre del rodillo y lo movemos a la posición que nos permita centrar de tal forma la parte gráfica. Acelerando la animación y cambiando la posición del padre cuando la velocidad es máxima podemos hacer ese cambio sin ser perceptible y que la animación transcurra de forma natural. Como digo, un bug hacía que desaparecieran los iconos de más arriba, aunque redimensionando la pantalla aparecián correctamente y tendría que seguir investigando. Esto carga gráficamente el proyecto. En general, me parece una implementación funcional pero muy mejorable.


Mejoraría:

- Probaría otro sistema por código en lugar de por animación con el sistema Tween (la idea desarrollada me parció más rápida).
- Separaría funcionalidades para hacerlo más modular.
- Separaría funcionalidades de gráficos para que un equipo de arte pudiera entrar y trabajar sin solapar nodos a modificar.
- Añadiría otros campos en un JSON para comparar qué iconos han tocado y dar premios en consecuencia.
- Añadiría sonidos. Lo primero que probaría sería lanzando un OneShot desde un método asociado a la animación en uno o dos frames concretos, de forma que cada vez que el rodillo "pase" por ahi, suene ese click. Habría que estudiar como queda en función del resultado y del rendimiento. También sonidos de play y stop, etc, pero en segunda instancia.
- Haría las modificaciones pertinentes y testearía para que fuera replicable con más o menos número de rodillos e iconos.
- Sería mejor comparar un índice de icono en lugar que directamente sus strings.
- Probaría de apagar y encender nodos de los iconos fuera de donde pueden ser visualizados para comparar si beneficia suficiente a la parte gráfica en relación a la carga de cpu.
- Animación de ganar.
- El método para comprobar si los rodillos han parado es mejorable.
- A otro nivel y más familiarizado con lo anterior, estudiaría como controlar las probabilidades de premio y gestionar estados del jugador.

