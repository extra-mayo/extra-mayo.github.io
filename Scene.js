/**
 * Created by Zhi Jian Zheng on 11/26/2016.
 */
// let sound;

function WinterScene(world) {
    this.width = 50;
    this.height = 50;

    this.rainMoney = [];

    for (var i = 0; i < 100; i++){
        this.rainMoney.push(new Money(this.width, this.height));
    }


    this.ground = new Plane({
        x: 0, y: 0, z: 0,
        width: this.width, height: this.height,
        asset: 'snow',
        repeatX: 1,
        repeatY: 1,
        rotationX: -90, metalness: 0.25
    });
    // add the plane to our world
    world.add(this.ground);

    this.snow = new MEMSnow(10000, 10000);

    this.tree = new DAE({
        asset: "xmasTree",
        x: -6, y: 0, z: 0,
        scaleX: 2, scaleY: 2, scaleZ: 2
    });
    world.add(this.tree);

    this.presentsArray = [];

    this.presentsArray.push(new DAE({
        x: -1, y: 0, z: -4,
        scaleX: 0.2, scaleY: 0.2, scaleZ: 0.2,
        asset: "presents",
        rotationY: -40,
    }));

    world.add(this.presentsArray[0]);

    this.presentsArray.push(new DAE({
        x: 3, y: 0, z: -3,
        scaleX: 0.2, scaleY: 0.2, scaleZ: 0.2,
        asset: "presents",
        rotationY: 40
    }));
    world.add(this.presentsArray[1]);


    this.text = document.createElement("a-entity");
    this.text.setAttribute("bmfont-text", "text: Happy Holidays!!!; color: white");
    this.text.setAttribute("position", "-0.8, 2.5, 0");
    this.text.setAttribute("scale", "3, 3, 3");
    world.scene.appendChild(this.text);

    this.textTwo = document.createElement("a-entity");
    this.textTwo.setAttribute("bmfont-text", "text: Click on the presents for a surprise!; color: white");
    this.textTwo.setAttribute("position", "-1, 2, 0");
    this.textTwo.setAttribute("scale", "1.5, 1.5, 1.5");
    world.scene.appendChild(this.textTwo);


    this.textThree = document.createElement("a-entity");
    this.textThree.setAttribute("bmfont-text", "text: HO HO HO Y'ALL; color: white");
    this.textThree.setAttribute("position", "-0.8, 2.5, 0");
    this.textThree.setAttribute("scale", "3, 3, 3");



    this.textFour = document.createElement("a-entity");
    this.textFour.setAttribute("bmfont-text", "text: GET SOME DOLLA DOLLA BILL MON; color: white");
    this.textFour.setAttribute("position", "-3, 3.5, 0");
    this.textFour.setAttribute("scale", "5, 5, 5");


    this.moveSanta = false;


    var that = this;
    this.presentWrapperOne = new Plane({
        x: 1.5, y: 0.5, z: -3,
        // rotationX: 90,
        red: 0, blue: 255, green: 0,
        width: 4, height: 1,
        opacity: 0,
        transparent: true,
        clickFunction: function(event){

            for (var i = 0; i < that.presentsArray.length; i++){
                world.remove(that.presentsArray[i]);
            }

            for (var i = 0; i < that.rainMoney.length; i++){
                that.rainMoney[i].money.toggleVisibility();
            }

            world.remove(that.presentWrapperOne);
            world.remove(that.presentWrapperTwo);

            for (var i = 0; i < world.scene.childNodes.length; i++){
                if (world.scene.childNodes[i] == that.text){
                    world.scene.removeChild(world.scene.childNodes[i]);
                }
                if (world.scene.childNodes[i] == that.textTwo){
                    world.scene.removeChild(world.scene.childNodes[i]);
                }

            }
            that.moveSanta = true;
            world.scene.appendChild(that.textThree);
            world.scene.appendChild(that.textFour);
        }
    });

    world.add(this.presentWrapperOne);



    this.presentWrapperTwo = new Plane({
        x: 1.5, y: 0.5, z: -4,
        // rotationX: 90,
        red: 0, blue: 255, green: 0,
        width: 4, height: 1,
        opacity: 0,
        transparent: true,
        clickFunction: function(event){

            for (var i = 0; i < that.presentsArray.length; i++){
                world.remove(that.presentsArray[i]);
            }
            for (var i = 0; i < that.rainMoney.length; i++){
                that.rainMoney[i].money.toggleVisibility();
            }

            world.remove(that.presentWrapperOne);
            world.remove(that.presentWrapperTwo);

            for (var i = 0; i < world.scene.childNodes.length; i++){
                if (world.scene.childNodes[i] == that.text){
                    world.scene.removeChild(world.scene.childNodes[i]);
                }
                if (world.scene.childNodes[i] == that.textTwo){
                    world.scene.removeChild(world.scene.childNodes[i]);
                }

            }

            that.moveSanta = true;
            world.scene.appendChild(that.textThree);
            world.scene.appendChild(that.textFour);

        }
    });

    world.add(this.presentWrapperTwo);


    this.santa = new DAE({
        asset: "santa"
    });
    world.add(this.santa);

    this.santaDance = function (){
        this.santa.spinY(20);



    }

    this.operate = function(){
        for (var i = 0; i < this.rainMoney.length; i++){
            this.rainMoney[i].move();
        }
        if (this.moveSanta){
            this.santa.spinY(20);
        }

    };


}


function MEMSnow(particleCount, maxParticleCount){

    this.snow = document.createElement("a-entity");

    this.snow.setAttribute("id", "snow");

    this.snow.setAttribute("position", "0 5 0");
    this.snow.setAttribute("particle-system", "preset: snow; particleCount:" + particleCount + "; maxParticleCount:" + maxParticleCount + "; size: 1; opacity: 1; color: #143945");


    document.querySelector("#VRScene").appendChild(this.snow);


}


function Money(x, z) {

    // //randomly generate x, z
    this.x = random(-x/2 + 1 - 10, x/2-1 - 10);
    this.y = random(10);
    this.z = random(-z/2 + 1, z/2 - 1);

    // console.log(this.x, this.y, this.z);

    this.money = new DAE({

        asset: "money",
        scaleX: 10, scaleY: 10, scaleZ: 10,
        x: this.x,
        y: this.y,
        z: this.z,
        visible: false
        // opacity: 0.9,
        // red: this.r, green: this.g, blue: this.b
    });

    world.add(this.money);

    // keep track of an offset in Perlin noise space
    this.xOffset = random(1000);
    this.zOffset = random(2000, 3000);


    // function to move our box
    this.move = function () {
        // compute how the particle should move
        // the particle should always move up by a small amount
        var yMovement = -0.05;

        // the particle should randomly move in the x & z directions
        var xMovement = map(noise(this.xOffset), 0, 1, -0.05, 0.05);
        var zMovement = map(noise(this.zOffset), 0, 1, -0.05, 0.05);

        // update our poistions in perlin noise space
        this.xOffset += 0.01;
        this.zOffset += 0.01;

        // set the position of our box (using the 'nudge' method)
        this.money.nudge(xMovement, yMovement, zMovement);

        // if we get too small we need to indicate that this box is now no longer viable
        if (this.money.y < 0) {
            this.money.y = 10;
        }

        if (this.money.z < -z/2 || this.money.z > z/2) {
            this.money.z = random(-z/2 + 1, z/2 - 1);
        }
        if (this.money.x < -x/2 || this.money.x > x/2){
            this.money.x = random(-x/2 + 1 - 10, x/2 -1 - 10);
        }

    }
}

