
import { _decorator, Component, Node, Animation, SpriteFrame, Sprite } from 'cc';
const { ccclass, property } = _decorator;


@ccclass('SlotMachine')
export class SlotMachine extends Component {

    @property({
        type: Animation
    })
    animationRodillo: Animation = null!;

    @property({
        type: Node
    })
    rodilloLeftNode: Node = null!;

    @property({
        type: Node
    })
    rodilloMidNode: Node = null!;

    @property({
        type: Node
    })
    rodilloRightNode: Node = null!;

    @property({
        type: SpriteFrame
    })
    BigWin: SpriteFrame = null!;

    @property({
        type: SpriteFrame
    })
    Fresa: SpriteFrame = null!;

    @property({
        type: SpriteFrame
    })
    Siete: SpriteFrame = null!;

    @property({
        type: SpriteFrame
    })
    Limon: SpriteFrame = null!;

    @property({
        type: SpriteFrame
    })
    Mora: SpriteFrame = null!;

    @property({
        type: SpriteFrame
    })
    SlotMachine: SpriteFrame = null!;

    start () {

        //this.animationRodillo.play("rodilloRoll");

        this.loadRodillos();

    }

    loadRodillos() {

        const rodilloLeft = ["BigWin", "Fresa", "Siete", "Limon", "Mora", "SlotMachine"];
        const rodilloMid = ["Mora", "BigWin", "Siete", "SlotMachine", "Fresa", "Limon"];
        const rodilloRight = ["Limon", "Mora", "Siete", "BigWin", "SlotMachine", "Fresa"];

        const rodillosLogic = [rodilloLeft, rodilloMid, rodilloRight];
        const rodillosNodes = [this.rodilloLeftNode, this.rodilloMidNode, this.rodilloRightNode]

        for (var j = 0; j < rodillosNodes.length; j++) {

            for (var i = 0; i < rodillosLogic[0].length; i++) {

                const icon = rodillosLogic[j][i];

                console.log(icon);
                rodillosNodes[j].getChildByName(i.toString()).getComponent(Sprite).spriteFrame = this.[icon];




                //this.rodilloLeftNode.getChildByName(i.toString()).getComponent(Sprite).spriteFrame = this[icon];
            }
        }


    }


}


