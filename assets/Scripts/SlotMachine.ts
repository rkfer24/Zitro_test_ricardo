
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

    //distancia entre iconos en píxeles
    distanceBetweenIcones: number = 125;

    timeBetweenSpines: number = 2000; //in ms

    maxSpinSpeed: number = 2; 
    rodillosStopped = 0;

    canISpin = true;


    //Creo Matrices para los rodillos lógica y Nodos para cambiar iconos
    rodillosLogic = [];
    rodillosNodes = [];


    start () {

        //this.animationRodillo.play("rodilloRoll");

        this.loadRodillos();

    }

    public playButton() {
        if (!this.canISpin) return;
        this.spinRodillos();
    }


    loadRodillos = () => {

        //Tenemos unos valores predefinidos para los iconos, pero podría extraerse los iconos y la cantidad de ellos de un JSON
        const rodilloLeft = ["Siete", "Mora", "BigWin", "Fresa", "Limon", "SlotMachine"];
        const rodilloMid = ["Siete", "SlotMachine", "Mora", "Limon", "BigWin", "Fresa"];
        const rodilloRight = ["Siete", "BigWin", "SlotMachine", "Mora", "Fresa", "Limon"];

        this.rodillosLogic = [rodilloLeft, rodilloMid, rodilloRight];
        this.rodillosNodes = [this.rodilloLeftNode, this.rodilloMidNode, this.rodilloRightNode]


        //Cargamos los iconos
        for (let j = 0; j < this.rodillosNodes.length; j++) {
            for (let i = 0; i < (this.rodillosLogic[j].length * 2); i++) {

                let indexIcon = i;

                if (indexIcon >= this.rodillosLogic[j].length) {
                    // Para el truco de duplicar los rollos y tenemos que restar el tamaño del rollo cuando llegamos al límite
                    indexIcon = indexIcon - this.rodillosLogic[j].length;
                }
                const icon = this.rodillosLogic[j][indexIcon]; // seleccionamos el string del icono de la lista que tiene que coincidir con el nombre de las properties antes creadas
                this.rodillosNodes[j].getChildByName(i.toString()).getComponent(Sprite).spriteFrame = this[icon]; // Cambiamos el spire
            }
        }

    }

    spinRodillos = async () =>{

        this.canISpin = false;
        function getRndInteger(max) {
            return Math.floor(Math.random() * (max));
        }
        //Seleccion RANDOM posicion
        for (let i = 0; i < this.rodillosLogic.length; i++) {

            const randomNumber = getRndInteger(this.rodillosLogic[i].length)
            console.log(this.rodillosLogic[i][randomNumber]);
            //moveRodillos(this.rodillosNodes[i], randomNumber, this.distanceBetweenIcones);

            this.animateRodillo(this.rodillosNodes[i], randomNumber, this.distanceBetweenIcones, this.maxSpinSpeed); //Llamamos a animacion
            await new Promise(resolve => setTimeout(resolve, this.timeBetweenSpines)); //Esperamos para ranzomizar el siguiente rodillo tiempo predefinido
        }
    }



    animateRodillo = async (rodillo: Node, result: number, distance: number, maxSpinSpeed: number) => {

        
        const animationRodillo = rodillo.getComponent(Animation);    
        const animationState = animationRodillo.getState("rodilloRoll");

        //Reseteamos valores animacion 
        animationState.wrapMode = 1; 
        animationState.repeatCount = 100;
        animationState.speed = 0.1;
        animationRodillo.play();

        
        await accelerate(animationState, animationState.speed, maxSpinSpeed); //Aceleración inicio animación

        async function accelerate(animState, animSpeed: number, maxSpinSpeed: number) {
            animSpeed += 0.1;
            animState.speed = animSpeed;

            if (animSpeed < 2) {
                await new Promise((resolve) => setTimeout(resolve, 300));
                await accelerate(animState, animSpeed, maxSpinSpeed);
            }
            else {
                //En velocidad máxima definido por max
                rodillo.getParent().setPosition(rodillo.getParent().position.x, distance * -result, 0); //Colocamos el padre para que la figura quede en el centro

                console.log(rodillo.getParent().position.y);
                console.log(-result);

                await deAccelerate(animState, animSpeed, animationState);
            }
        }

        async function deAccelerate(animState, animSpeed, animationState) {
            animSpeed -= 0.1;
            animState.speed = animSpeed;

            if (animSpeed > 0.2) {
                await new Promise((resolve) => setTimeout(resolve, 300));
                await deAccelerate(animState, animSpeed, animationState);
            } else {
                animationState.repeatCount = 1; // La velocidad es baja y hacemos que se hagan 2 repeticiones más hasta parar
                this.finishAnimation();
            }
        }

        


    }        

    finishAnimation = () =>{

        console.log("Test");
        this.rodillosStopped++;
        if (this.rodillosStopped < 2) return;
        console.log("Test2");
        this.rodillosStopped = 0;
        this.canISpin = true;
        this.loadRodillos();


    }

}


