import { _decorator, Component, Label, find} from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Menu')
export class Menu extends Component {

    //properties
    @property({
        type: Label
    })
    labelTime: Label = null!;

    @property({
        type: GameManager
    })
    gameManager: GameManager = null!;


    //Variables
    private timer = 0;




    updateClock = () => {

        const xhr = new XMLHttpRequest();
        const url = "http://worldtimeapi.org/api/timezone/Europe/Madrid";

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {

                let response = JSON.parse(xhr.responseText);
                let datetime = response.datetime;

                let dateTimeCurrentHour = datetime.substring(datetime.indexOf('T') + 1, datetime.indexOf('T') + 9);

                if (this.labelTime) {
                    this.labelTime.string = dateTimeCurrentHour;
                }
            }
        };

        xhr.open("GET", url, true);
        xhr.send();

    }

    goQuiz() {
        this.gameManager.changeScene("Quiz");

    }

    goSlots() {
        this.gameManager.changeScene("Slots");
    }

    start = () => {

        this.updateClock();

        const gameManagerNode = find("GameManager");
        this.gameManager = gameManagerNode.getComponent("GameManager");

    }

    update(deltaTime: number) {

        this.timer += deltaTime;

        if (this.timer > 1) {

            this.updateClock();
            this.timer = 0;
        }
    }

}
