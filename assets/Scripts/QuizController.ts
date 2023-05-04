import { _decorator, Component, Node, find, Label, AssetManager, assetManager, JsonAsset, SpriteFrame, js, TextAsset, EventHandler, Animation} from 'cc';
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
        type: Animation
    })
    questionAnimation: Animation = null!;

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

    @property({
        type: Node
    })
    repplyPanel: Node = null!;

    //VARIABLES
    quizJSON = JSON;

    questions; answers; actualQuestion; score;

    JSONURL = "https://raw.githubusercontent.com/rkfer24/Zitro_test_ricardo/main/assets/Resources/JSON/Quiz.json";

    start = () => {
        const gameManagerNode = find("GameManager");
        this.gameManager = gameManagerNode.getComponent("GameManager");
    }

    async onLoad () {

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                this.quizJSON= JSON.parse(xhr.responseText);

            }
        };
        await xhr.open("GET", this.JSONURL);
        xhr.send();

        await new Promise(resolve => setTimeout(resolve, 1000));
               
        this.beginQuiz();
    }


    goHome() {
        this.gameManager.changeScene("Menu");
    }

    beginQuiz = () => {

        this.questions = this.quizJSON;
        this.questions.preguntas = this.shuffle(this.questions.preguntas);
        this.actualQuestion = 0; 
        this.score = 0;

        this.nextQuestion();
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

    nextQuestion = () => {

        if (this.actualQuestion < this.questions.preguntas.length) {

            this.showQuestion(this.actualQuestion);
            return;
        }

        this.labelQuestion.string = "Test finalizado \nPuntuaci\u00F3n: " + this.score*10 + " / 100";

        this.labelAnswer1.node.getParent().active = false;
        this.labelAnswer2.node.getParent().active = false;
        this.labelAnswer3.node.getParent().active = false;
    }

    showQuestion(actualQuestion: number) {


        this.questionAnimation.play("questionFadeIn");
        this.labelQuestion.string = this.questions.preguntas[actualQuestion].Pregunta;

        this.labelAnswer1.string = this.questions.preguntas[actualQuestion].Respuestas[0];
        this.labelAnswer2.string = this.questions.preguntas[actualQuestion].Respuestas[1];
        this.labelAnswer3.string = this.questions.preguntas[actualQuestion].Respuestas[2];


    }


    async quizResponse(response: EventTarget) {


        if ((this.quizJSON.preguntas[this.actualQuestion].RespuestaCorrecta) == (response.currentTarget._children[0]._components[1]._string)) {

            console.log("Correct Answer!");
            this.repplyPanel.getComponentInChildren(Label).string = "Respuesta correcta";
            this.score++;

        } else {

            console.log("Incorrect Answer");
            this.repplyPanel.getComponentInChildren(Label).string = "Respuesta incorrecta";  

        }
        
        this.actualQuestion++;
        this.repplyPanel.active = true;
        await new Promise(resolve => setTimeout(resolve, 1500));
        this.repplyPanel.active = false;

        this.nextQuestion();

    }


}

