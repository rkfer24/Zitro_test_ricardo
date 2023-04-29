import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Home')
export class Home extends Component {

    onLoad() {

        const xhr = new XMLHttpRequest();
        const url = "http://worldtimeapi.org/api/timezone/Europe/Madrid";

        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                console.log("Resutlado POSITIVO");

                let response = JSON.parse(xhr.responseText);
                console.log(response);
            }
        };

        xhr.open("GET", url, true);
        xhr.send();
    }
}
