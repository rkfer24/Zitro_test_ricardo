
import { _decorator, Component, Node, game, director, } from 'cc';
//añado el espacio de nombre "game" para controlar estados de juego, director para controlar Scenes.
//
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    onLoad() {

       
        game.addPersistRootNode(this.node); //Nodo en persistente para tener control sobre el juego y el cambio de escenas


        function iniciarTimer(milisegundos) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve('NivelCargado');
                }, milisegundos);
            });
        }

        async function cuentaAtrasCarga() {

            
            console.log('CargandoNivel'); //Empiezo a Cargar el Nivel
            director.preloadScene("Menu");  //Pruebo de hacer un preload de la Scene

            const result = await iniciarTimer(4000);
            console.log(result);

            director.loadScene("Menu");

        }

        //cuentaAtrasCarga(); //prueba funciones asincronicas y carga de escenas

    }


}
