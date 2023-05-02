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

    url = "http://worldtimeapi.org/api/timezone/Europe/Madrid";




    start = () => {

        this.updateClockRequest();
        const gameManagerNode = find("GameManager");

        this.gameManager = gameManagerNode.getComponent("GameManager");
    }

    updateClockRequest = () => {
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {

                let response = JSON.parse(xhr.responseText);
                let datetime = response.datetime;
                
                const myDate = new Date(datetime);
                this.timer(myDate);
                
                
            }
        };
        xhr.open("GET", this.url, true);
        xhr.send();
    }

    timer = (date) => {
        var h = date.getHours(); // 0 - 23
        var m = date.getMinutes(); // 0 - 59
        var s = date.getSeconds(); // 0 - 59
        var session = "AM";

        if (h == 0) {
            h = 12;
        }

        if (h > 12) {
            h = h - 12;
            session = "PM";
        }

        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;

        var time = h + ":" + m + ":" + s + " " + session;

        document.getElementById("MyClockDisplay").innerText = time;
        document.getElementById("MyClockDisplay").textContent = time;

        setTimeout(() => {
            const now = new Date(date);
            now.setSeconds((now.getSeconds()) + 1 );
            this.timer(now);
        }, 1000);


        this.labelTime.string = time;
    }

    goQuiz() {
        this.gameManager.changeScene("Quiz");

    }

    goSlots() {
        this.gameManager.changeScene("Slots");
    }

}
