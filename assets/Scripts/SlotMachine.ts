
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

    const rodilloLeft = ["Limon", "SlotMachine", "Siete", "Mora", "BigWin", "Fresa"];
    const rodilloMid = ["BigWin", "Mora", "Siete", "SlotMachine", "Fresa", "Limon"];
    const rodilloRight = ["Fresa", "Limon", "Siete", "BigWin", "SlotMachine", "Mora"];

    const rodillosLogic = [rodilloLeft, rodilloMid, rodilloRight];
    const rodillosNodes = [this.rodilloLeftNode, this.rodilloMidNode, this.rodilloRightNode]

    for (var j = 0; j < rodillosNodes.length; j++) {

        for (var i = 0; i < (rodillosLogic[j].length * 2); i++) {

            var indexIcon = i;

            if (indexIcon >= rodillosLogic[j].length) {

                // Para el truco de duplicar los rollos y tenemos que restar el tamaño del rollo cuando llegamos al límite
                indexIcon = indexIcon - rodillosLogic[j].length;
            }

            const icon = rodillosLogic[j][indexIcon]; // seleccionamos el string del icono de la lista que tiene que coincidir con el nombre de las properties antes creadas

            rodillosNodes[j].getChildByName(i.toString()).getComponent(Sprite).spriteFrame = this[icon]; // cambiamos el sprite del nodo de los rodillos
        }
    }
}

    shuffleRodillos() {

        
    }


}


