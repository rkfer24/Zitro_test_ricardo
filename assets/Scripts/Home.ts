import { _decorator, Component, Label, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Home')
export class Home extends Component {

    @property({
        type: Label
    })
    labelTime: Label = null!;

    private timer = 0;


    updateClock= () => {

        const xhr = new XMLHttpRequest();
        const url = "http://worldtimeapi.org/api/timezone/Europe/Madrid";

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("Resultado POSITIVO");

                let response = JSON.parse(xhr.responseText);
                let datetime = response.datetime;

                let dateTimeCurrentHour = datetime.substring(datetime.indexOf('T') + 1, datetime.indexOf('T') + 9);

                console.log(dateTimeCurrentHour);

                if (this.labelTime) {
                    this.labelTime.string = dateTimeCurrentHour;
                }
            }
        };

        xhr.open("GET", url, true);
        xhr.send();

    }


    update(deltaTime: number) {

        this.timer += deltaTime;

        if (this.timer > 1) {

            this.updateClock();
            this.timer = 0;
        }


        
    }

    goQuiz() {
        director.loadScene("Quiz");
        
    }

    goSlots() {
        director.loadScene("Slots");
        
    }
}
