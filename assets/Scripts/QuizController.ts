import { _decorator, Component, Node, find, Label, AssetManager, assetManager, JsonAsset, SpriteFrame, js, TextAsset, EventHandler} from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

 
@ccclass('QuizController')
export class QuizController extends Component {

    //PROPERTIES
    @property({
        type: GameManager
    })
    gameManager: GameManager = null!;

    @property({
        type: Label
    })
    labelQuestion: Label = null!;

    @property({
        type: Label
    })
    labelAnswer1: Label = null!;

    @property({
        type: Label
    })
    labelAnswer2: Label = null!;

    @property({
        type: Label
    })
    labelAnswer3: Label = null!;

    @property({
        type: String
    })

    //VARIABLES
    pathQuizJSON: string = "";

    quizJSON = JSON;


    start = () => {


        const gameManagerNode = find("GameManager");
        this.gameManager = gameManagerNode.getComponent("GameManager");

    }

    goHome() {
        this.gameManager.changeScene("Menu");

    }

    onLoad = () => {

        assetManager.loadRemote(this.pathQuizJSON, TextAsset, (err, textAsset) => {
            if (err) {
                console.log("error");
                return;
            }

            this.quizJSON = textAsset.json;
            this.beginQuiz();
        });

    }

    beginQuiz = () => {
        
        this.labelQuestion.string = this.quizJSON.preguntas[0].Pregunta;
        this.labelAnswer1.string = this.quizJSON.preguntas[0].Respuestas[0];
        this.labelAnswer2.string = this.quizJSON.preguntas[0].Respuestas[1];
        this.labelAnswer3.string = this.quizJSON.preguntas[0].Respuestas[2];
        
    }

    quizResponse(response: EventTarget) {


        if ((this.quizJSON.preguntas[0].Respuestas[0]) == (response.currentTarget._children[0]._components[1]._string)) {

            console.log("Correct Answer!");

        } else {

            console.log("Incorrect Answer");

        }


    }

}

