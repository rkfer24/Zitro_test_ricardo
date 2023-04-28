import { _decorator, Component, Node, ProgressBar, director } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('GameLoader')


export class GameLoader extends Component {

    @property({
        type: ProgressBar
    })
    progressBar: ProgressBar = null!;

    //public ratioLoaded;

    onLoad() {

        async function startLoading() { //GameManager llamar desde ahi??

            const result = await loadingSimulator();

        }


        function loadingSimulator() {
            return new Promise((resolve) => {
                let loadingProgress = 0;

                const interval = setInterval(() => {
                    loadingProgress += 10;

                    this.ratioLoaded = loadingProgress/100;


                    if (loadingProgress === 100) {
                        clearInterval(interval);
                        resolve('Loading Complete'); //GameManager cambiar nivel?
                    }

                }, 1000); // cada 1000 milisegundos se repite el intervalo
            });
        }



        startLoading(); //prueba funciones asincronicas y carga de escenas


    }

    update() {

        //this.progressBar.progress = this.ratioLoaded / 100;
    }


    
}

