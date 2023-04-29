
import { _decorator, Component, Node, game, director, } from 'cc';
//añado el espacio de nombre "game" para controlar estados de juego, director para controlar Scenes.
//
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    onLoad() {

        game.addPersistRootNode(this.node); //Nodo en persistente para tener control sobre el juego y el cambio de escenas

    }


    public changeScene(sceneName: string) {
        director.loadScene(sceneName);

    }


}
