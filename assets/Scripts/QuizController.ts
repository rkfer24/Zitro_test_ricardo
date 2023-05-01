import { _decorator, Component, Node, find, Label, AssetManager, assetManager, JsonAsset, SpriteFrame, js, TextAsset} from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

 
@ccclass('QuizController')
export class QuizController extends Component {

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
    pathQuizJSON: string = "";

    private parsedQuiz = new Object();

    start = () => {


        const gameManagerNode = find("GameManager");
        this.gameManager = gameManagerNode.getComponent("GameManager");

    }

    goHome() {
        this.gameManager.changeScene("Menu");

    }


    /*beginQuiz = () => {

            

        this.labelQuestion.string = this.parsedQuiz.preguntas[0].Pregunta;
        this.labelAnswer1.string = this.parsedQuiz.preguntas[0].Respuestas[0];
        this.labelAnswer2.string = this.parsedQuiz.preguntas[0].Respuestas[1];
        this.labelAnswer3.string = this.parsedQuiz.Preguntas[0].Respuestas[2];



    }
    */

    onLoad = () => {

        console.log("Intenando leer JSON. Ruta: " + this.pathQuizJSON);

        // remote Text
        assetManager.loadRemote(this.pathQuizJSON, TextAsset, function (err, textAsset) {
            if (err) {

                console.log("error");
                return;

            }

            const jsonPreguntas = textAsset.json;


            const pregunta = jsonPreguntas.preguntas[0].Pregunta;
            console.log(pregunta); // Imprimir el texto de la primera pregunta*/

             
        });
        /*assetManager.resources.load(this.pathQuizJSON, (err, data) {

            if (err) {
                console.log("Tira error y la ruta del JSON es: " + this.pathQuizJSON);
            }
            this.parsedQuiz = JSON.parse(this.data);

            console.log(this.parsedQuiz);
        });*/


        /*
        this.parsedQuiz = JSON.parse(this.jsonQuizPath);

        this.beginQuiz();

        */
    }

}

