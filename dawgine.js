/*
goals:
player 
gameobjects -  position,size,type
rayscanning
canvas resizing and such
gravity
world positional differentiation
*/
//image refrences
//---------------
var gameObjects = []; //gameobjects are seen by rayscans
var nullObjects = []; //null objects are not seen by rayscans
//gameObject
//syntax:
//new var newGO = GameObject(id,x,y,posX,posY,sizeX,sizeY);
//gameObjects.push(newGO);
class GameObject{
    constructor(a,b,c,d,e){
        this.id = a;
        this.x = b;
        this.y = c;
        this.sizeX = d;
        this.sizeY = e;
        this.image = null;
        this.color = null;
        this.gravity = null;
        this.rotation = null;
    }
}
function findObject(id){
    for(var i = 0; i < gameObjects.length; i++){
        if(gameObjects[i].id == id){
            return gameObjects[i];
        }
    }
    for(var i = 0; i < nullObjects.length; i++){
        if(nullObjects[i].id == id){
            return nullObjects[i];
        }
    }
    return null;
}
//rayscan
//syntax:
//rayscan(starting x, starting y, angle, distance)
function rayscan(a,b,c,d){
    var checkX = a;
    var checkY = b;
    var ang = c;
    for(var i = 0; i < d; i++){
        for(var j = 0; j < gameObjects.length; j++){
            var objCheck = gameObjects[j];
            if(checkX >= (objCheck.x - objCheck.sizeX/2) && checkX <= (objCheck.x + objCheck.sizeX/2) && checkY <= (objCheck.y + objCheck.sizeY/2) && checkY >= (objCheck.y - objCheck.sizeY/2)){
                return objCheck;
            }
        }
        checkX += Math.cos(ang);
        checkY -= Math.sin(ang);
    }
    return false;
}
//input
var input = {
    w:false,
    a:false,
    s:false,
    d:false,
    up:false,
    left:false,
    down:false,
    right:false,
    space:false,
    f:false,
    shift:false,
    one:false,
    two:false,
    three:false,
    four:false,
    five:false,
    six:false,
    seven:false,
    mouse1:false
}
document.addEventListener('keydown', function(event) {
    switch(event.code){
        case "KeyW":
            input.w = true;
            break;
        case "KeyA":
            input.a = true;
            break;
        case "KeyS":
            input.s = true;
            break;
        case "KeyD":
            input.d = true;
            break;
        case "ArrowUp":
            input.up = true;
            break;
        case "ArrowLeft":
            input.left = true;
            break;
        case "ArrowDown":
            input.down = true;
            break;
        case "ArrowRight":
            input.right = true;
            break;
        case "Space":
            input.space = true;
            break;
        case "KeyF":
            input.f = true;
            break;
        case "ShiftLeft":
            input.shift = true;
            break;
        case "Digit1":
            input.one = true;
            break;
        case "Digit2":
            input.two = true;
            break;
        case "Digit3":
            input.three = true;
            break;
        case "Digit4":
            input.four = true;
            break;
        case "Digit5":
            input.five = true;
            break;
        case "Digit6":
            input.six = true;
            break;
        case "Digit7":
            input.seven = true;
            break;
    }
});
document.addEventListener('keyup', function(event) {
    switch(event.code){
        case "KeyW":
            input.w = false;
            break;
        case "KeyA":
            input.a = false;
            break;
        case "KeyS":
            input.s = false;
            break;
        case "KeyD":
            input.d = false;
            break;
        case "ArrowUp":
            input.up = false;
            break;
        case "ArrowLeft":
            input.left = false;
            break;
        case "ArrowDown":
            input.down = false;
            break;
        case "ArrowRight":
            input.right = false;
            break;
        case "Space":
            input.space = false;
            break;
        case "KeyF":
            input.f = false;
            break;
        case "ShiftLeft":
            input.shift = false;
            break;
        case "Digit1":
            input.one = false;
            break;
        case "Digit2":
            input.two = false;
            break;
        case "Digit3":
            input.three = false;
            break;
        case "Digit4":
            input.four = false;
            break;
        case "Digit5":
            input.five = false;
            break;
        case "Digit6":
            input.six = false;
            break;
        case "Digit7":
            input.seven = false;
            break;
    }
});
document.addEventListener('mousedown', function(event) {
    input.mouse1 = true;
});
document.addEventListener('mouseup', function(event) {
    input.mouse1 = false;
});
//canvas creation
var canvasName = "myCanvas"; //replace with id of canvas within the html
var canvas = document.getElementById(canvasName);
var ctx = canvas.getContext("2d");
var virtualHeight = 900; //the width of the canvas things are being drawn on before scaling
var virtualWidth = 1600; //the height of the canvas things are being drawn on before scaling
fullScreen = false; //should the canvas fill the whole screen - make sure body and the canvas have a margin and padding of 0
fitAspectRatioFullscreen = true; //should the aspect ratio of the virtual canvas be forced - this removes distortion of stretching
fitDiv = false; //if you want the canvas to be in a part of the page instead of the whole page
/*recomended css settings for canvas
    padding:0;
    margin-bottom:0;
    margin-top:0;
    margin-left:auto;
    margin-right:auto;
    display:block;
*/
var scaleX;
var scaleY;
setInterval(function(){
    if(fullScreen){
        fullScreenCanvas();
    }
    else if(fitAspectRatioFullscreen){
        aspectRatioFullScreenCanvas();
    }
    else if(fitDiv){
        fitDivCanvas();
    }
    scaleX = canvas.width / virtualWidth;
    scaleY = canvas.height / virtualHeight;
},1000/10); //refreshes canvas size a set times per second - the "10" is changeable to whatever tickrate works the best
//canvas fit functions
function fullScreenCanvas(){
    canvas.width = window.innerWidth;
    canvas.height =  window.innerHeight;
}
function aspectRatioFullScreenCanvas(){
    var heightW = window.innerHeight;
    canvas.height = heightW;
    var aspectR = virtualWidth / virtualHeight;
    canvas.width = heightW * aspectR;
}
function fitDivCanvas(){
    var divIn = document.getElementById("myDIV"); //replace myDiv with the div the canvas is within
    canvas.height = divIn.offsetHeight;
    canvas.height = divIn.offsetWidth;
}
//game type:
//overview - the player is in the middle of the screen, and moves around the world
//non-follow overview, the player is in a world where the camera doesnt follow them, the whole game world is just the window
//no player - used for games where the player is not a focal point, turned based stuff or anything like that
var overview = false;
var nFOverview = true;
var nPO = false;
var fov = { //fov is only used for overview follow games
    x: 400,
    y: 200
}
var presetWorldImage = false; //can be set to true or false
var worldImage = new Image();
worldImage.src = "http://logicsimplified.com/newgames/wp-content/uploads/2017/09/shovelknight.jpg"; //world background image replace with your own
//the start function -  where every game object is made before the game starts
function start(){
    gameObjects.push(new GameObject("me",400,400,10,10));
    //create objects
    
    //--------------
}
start();
var prevTime = Date.now();
var totalTime = 0;
var fps = 0;
function runGame(){
    var delta = Date.now() - prevTime;
    totalTime += delta;
    fps++;
    if(totalTime >= 100){
        console.log(fps * 10);
        totalTime = 0;
        fps = 0;
    }
    prevTime = Date.now();
    //do stuff

    //--------
    draw();
    window.requestAnimationFrame(runGame);
}
window.requestAnimationFrame(runGame);

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(presetWorldImage){
        if(!overview){
            ctx.drawImage(worldImage,0,0,canvas.width,canvas.height);
        }
        else{
            ctx.drawImage(worldImage,me.x - fov.x/2,me.y - fov.y/2,fov.x,fov.y,0,0,canvas.width,canvas.height);
        }
    }
    for(var i = 0; i < nullObjects.length; i++){
        var tempObject = nullObjects[i];
        
        if(tempObject.color != null){
            ctx.fillStyle = tempObject.color;
            ctx.fillRect((tempObject.x - tempObject.sizeX/2) * scaleX,(tempObject.y - tempObject.sizeY/2) * scaleY,tempObject.sizeX * scaleX,tempObject.sizeY * scaleY);
        }
        else if(tempObject.image != null){
            ctx.drawImage(tempObject.image,(tempObject.x - tempObject.sizeX/2) * scaleX,(tempObject.y - tempObject.sizeY/2) * scaleY,tempObject.sizeX * scaleX,tempObject.sizeY * scaleY);
        }
        
    }
    for(var i = 0; i < gameObjects.length; i++){
        var tempObject = gameObjects[i];
        if(tempObject.rotation != null){
            ctx.translate(tempObject.x * scaleX,tempObject.y * scaleY);
            ctx.rotate(tempObject.rotation);
            ctx.translate(-tempObject.x * scaleX,-tempObject.y * scaleY);
        }
        if(tempObject.color != null){
            ctx.fillStyle = tempObject.color;
            ctx.fillRect((tempObject.x - tempObject.sizeX/2) * scaleX,(tempObject.y - tempObject.sizeY/2) * scaleY,tempObject.sizeX * scaleX,tempObject.sizeY * scaleY);
        }
        else if(tempObject.image != null){
            ctx.drawImage(tempObject.image,(tempObject.x - tempObject.sizeX/2) * scaleX,(tempObject.y - tempObject.sizeY/2) * scaleY,tempObject.sizeX * scaleX,tempObject.sizeY * scaleY);
        }
        if(tempObject.rotation != null){
            ctx.translate(tempObject.x * scaleX,tempObject.y * scaleY);
            ctx.rotate(-tempObject.rotation);
            ctx.translate(-tempObject.x * scaleX,-tempObject.y * scaleY);
        }
    }
}

//game functions go down here




