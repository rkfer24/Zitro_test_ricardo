
import { _decorator, Component, Node, Animation } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('SlotMachine')
export class SlotMachine extends Component {

    @property({
        type: Animation
    })
    animationRodillo: Animation = null!;


    start () {
        // [3]



        this.animationRodillo.play("rodilloRoll");
    }


}


