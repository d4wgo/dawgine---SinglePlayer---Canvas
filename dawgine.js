/*
goals:
player 
gameobjects -  position,size,type
rayscanning
canvas resizing and such
gravity
world positional differentiation
*/
var gameObjects = [];
//player class
//syntax:
//new Player(id,x,y,sizeX,sizeY)
class Player{
    constructor(a,b,c,d,e){
        this.id = a;
        this.x = b;
        this.y = c;
        this.sizeX = d;
        this.sizeY = e;
    }
}
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
    }
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
//canvas creation
var canvasName = "myCanvas"; //replace with id of canvas within the html
var canvas = document.getElementById(canvasName);
var ctx = canvas.getContext("2d");
var virtualHeight = 900; //the width of the canvas things are being drawn on before scaling
var virtualWidth = 1600; //the height of the canvas things are being drawn on before scaling
fullScreen = true; //should the canvas fill the whole screen - make sure body and the canvas have a margin and padding of 0
fitAspectRatioFullscreen = false; //should the aspect ratio of the virtual canvas be forced - this removes distortion of stretching
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
var presetWorldImage = true; //can be set to true or false
var worldImage = new Image();
worldImage.src = "http://logicsimplified.com/newgames/wp-content/uploads/2017/09/shovelknight.jpg"; //world background image
//the start function -  where every game object is made before the game starts
var me; //player var for use in whole game
function start(){
    me = new Player("me",800,450,20,20);
    me.color = "red";
    me.image = null;
}
start();
function runGame(){
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
            
        }
    }
    if(overview || nFOverview){
        if(me.color != null){
            ctx.fillStyle = me.color;
            ctx.fillRect((me.x * scaleX) - me.sizeX/2,(me.y * scaleY) - me.sizeY/2,me.sizeX,me.sizeY);
        }
        else if(me.image != null){
            ctx.drawImage(me.image,(me.x * scaleX) - me.sizeX/2,(me.y * scaleY) - me.sizeY/2,me.sizeX,me.sizeY);
        }
    }
}




