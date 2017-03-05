// variable to hold a reference to our A-Frame world
var world;
var scene;

function preload(){
}

function setup() {
    // no canvas needed
    noCanvas();

    world = new World('VRScene');

    scene = new WinterScene(world);



}

function draw() {
    // if (mouseIsPressed || touchIsDown) {
    //     world.moveUserForward(0.1);
    // }
    scene.operate();
}

