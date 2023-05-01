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
    pathQuizJSON: string = "";



    //VARIABLES
    quizJSON = JSON;

    questions; answers;

    start = () => {

        const gameManagerNode = find("GameManager");
        this.gameManager = gameManagerNode.getComponent("GameManager");

    }

    onLoad = () => {
        assetManager.loadRemote(this.pathQuizJSON, TextAsset, (err, textAsset) => {
            if (err) {
                console.log("Error Leyendo JSON");
                return;
            }

            this.quizJSON = textAsset.json;
            this.beginQuiz();
        });
    }

    goHome() {
        this.gameManager.changeScene("Menu");

    }



    beginQuiz = () => {

        this.questions = this.quizJSON;
        this.questions.preguntas = this.shuffle(this.questions.preguntas);
        this.showQuestion();
    }

    shuffle(questions: any[]) { // Algoritmo Fisher–Yates randomizar

        let m = questions.length;
        let t: any;
        let i: number;

        // Mientras quedan preguntas (m)
        while (m) {
            // Cogemos una random && m--
            i = Math.floor(Math.random() * m--);

            // Y la cambiamos por el elemento actual
            t = questions[m];
            questions[m] = questions[i];
            questions[i] = t;

            // Mezclamos tmb las respuestas para la pregunta actual
            let answers = questions[i].Respuestas;

            let n = answers.length;
            let u: any;
            let j: number;


            while (n) {

                // Cogemos una random && n--
                u = Math.floor(Math.random() * n--);

                j = answers[n];
                answers[n] = answers[u];
                answers[u] = j;
            }
        }

        return questions;
    }

    showQuestion() {

        console.log(this.questions.preguntas[0].Pregunta);
        console.log(this.questions.preguntas[0].Respuestas[0] + this.questions.preguntas[0].Respuestas[1] + this.questions.preguntas[0].Respuestas[2]);

        this.labelQuestion.string = this.questions.preguntas[0].Pregunta;
        this.labelAnswer1.string = this.questions.preguntas[0].Respuestas[0];
        this.labelAnswer2.string = this.questions.preguntas[0].Respuestas[1];
        this.labelAnswer3.string = this.questions.preguntas[0].Respuestas[2];
    }


    quizResponse(response: EventTarget) {


        if ((this.quizJSON.preguntas[0].Respuestas[0]) == (response.currentTarget._children[0]._components[1]._string)) {

            console.log("Correct Answer!");

        } else {

            console.log("Incorrect Answer");    

        }

    }




}

