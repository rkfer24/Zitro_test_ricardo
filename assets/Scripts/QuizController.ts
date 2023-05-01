import { _decorator, Component, Node, find } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

 
@ccclass('QuizController')
export class QuizController extends Component {

    @property({
        type: GameManager
    })
    gameManager: GameManager = null!;

    start = () => {


        const gameManagerNode = find("GameManager");
        this.gameManager = gameManagerNode.getComponent("GameManager");

    }

    goHome() {
        this.gameManager.changeScene("Menu");

    }


    beginQuiz(){



    }


}

