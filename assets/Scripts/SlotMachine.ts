
import { _decorator, Component, Node, Animation, SpriteFrame, Sprite, math, animation, } from 'cc';
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

    @property({
        type: Number
    })


    distanceBetweenIcones: number = 125;

    private canISpin = true;







    start () {

        //this.animationRodillo.play("rodilloRoll");

        this.loadRodillos();

    }


    rodillosLogic = [];
    rodillosNodes = [];

    loadRodillos =() =>{

        const rodilloLeft = ["Siete", "Mora", "BigWin", "Fresa", "Limon", "SlotMachine"];
        const rodilloMid = ["Siete", "SlotMachine", "Fresa", "Limon", "BigWin", "Mora"];
        const rodilloRight = ["Siete", "BigWin", "SlotMachine", "Mora", "Fresa", "Limon"];

        this.rodillosLogic = [rodilloLeft, rodilloMid, rodilloRight];
        this.rodillosNodes = [this.rodilloLeftNode, this.rodilloMidNode, this.rodilloRightNode]

        for (var j = 0; j < this.rodillosNodes.length; j++) {

            for (var i = 0; i < (this.rodillosLogic[j].length * 2); i++) {

                var indexIcon = i;

                if (indexIcon >= this.rodillosLogic[j].length) {

                    // Para el truco de duplicar los rollos y tenemos que restar el tamaño del rollo cuando llegamos al límite
                    indexIcon = indexIcon - this.rodillosLogic[j].length;
                }

                const icon = this.rodillosLogic[j][indexIcon]; // seleccionamos el string del icono de la lista que tiene que coincidir con el nombre de las properties antes creadas

                this.rodillosNodes[j].getChildByName(i.toString()).getComponent(Sprite).spriteFrame = this[icon]; // cambiamos el sprite del nodo de los rodillos
            }
        }

    }

    spinRodillos = async () =>{

        if (!this.canISpin) return;

        this.canISpin = false


        function getRndInteger(max) {
            return Math.floor(Math.random() * (max));
        }

        for (var i = 0; i < this.rodillosLogic.length; i++) {            //Seleccion RANDOM icono 

            const randomNumber = getRndInteger(this.rodillosLogic[i].length)
            console.log("Rodillo número " +i + ":")
            console.log(this.rodillosLogic[i][randomNumber]);
            //moveRodillos(this.rodillosNodes[i], randomNumber, this.distanceBetweenIcones);

            this.animateRodillo(this.rodillosNodes[i], randomNumber, this.distanceBetweenIcones);

            await new Promise(resolve => setTimeout(resolve, 2000)); //Tiempo de 2 segundos entre ellos yendo de izq a derecha
        }

    }


    public playButton() {

        if (!this.canISpin){
            return;
        }

        this.spinRodillos();
    }



    animateRodillo = async (rodillo: Node, result: number, distance: number) => {

        
        //rodillo.setPosition(0, distance * -result, 0); poner rodillo donde queiro

        const animationRodillo = rodillo.getComponent(Animation);    
        var animationState = animationRodillo.getState("rodilloRoll");


        animationState.speed = 0.1;
        animationRodillo.play();

        accelerate(animationState, 0.1);

        async function accelerate(animState, animSpeed: number) {

            animSpeed += 0.1;
            animState.speed = animSpeed;

            if (animSpeed < 2) {
                setTimeout(() => {
                    accelerate(animState, animSpeed);
                }, 300);
            }
            else {
                console.log("Maximum speed reached");
                rodillo.setPosition(0, distance * -result, 0); //poner rodillo donde queiro
                deAccelerate(animState, animSpeed);
            }
        }

        function deAccelerate(animState, animSpeed) {
            animSpeed -= 0.1;
            animState.speed = animSpeed;

            if (animSpeed > 0.2) {
                setTimeout(() => {
                    deAccelerate(animState, animSpeed);
                }, 300);
            }
        }

    }
}


