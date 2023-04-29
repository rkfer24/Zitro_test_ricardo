import { _decorator, Component, Node, ProgressBar, director } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('GameLoader')




export class GameLoader extends Component {

    @property({
        type: ProgressBar
    })
    progressBar: ProgressBar = null!;


    onLoad() {

        const startLoading = async () => { // Usar una función flecha para que `this` se herede del contexto de la instancia
            const loadCompleted = await loadingSimulator();

            return loadCompleted;
        };

        const loadingSimulator = () => { 
            return new Promise((resolve) => {
                let loadingProgress = 0;

                const interval = setInterval(() => {
                    loadingProgress += 10;

                    this.progressBar.progress = loadingProgress / 100; 

                    if (loadingProgress === 100) {
                        clearInterval(interval);
                        resolve(true);
                    }
                }, 500);
            });
        };

        startLoading().then(loadCompleted => {

            if (loadCompleted) director.loadScene("Menu");
            else console.log("Error Loading Resources"); // Podriamos manejar el error usando reject en la Promise 
        });

    }


    
}

