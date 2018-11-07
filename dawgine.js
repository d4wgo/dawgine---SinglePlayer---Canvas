/*
goals:
player 
gameobjects -  position,size,type
rayscanning
gravity
world positional differentiation
*/
var gameObjects = [];
//player class
//new Player(id,x,y,posX,posY,sizeX,sizeY)
class Player{
    constructor(a,b,c,d,e,f){
        this.id = a;
        this.x = b;
        this.y = c;
        this.sizeX = d;
        this.sizeY = e;
        this.state = f;
    }
}
//gameObject
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
//rayscan(starting x, starting y, angle, distance)
function rayscan(a,b,c,d){
    var checkX = a;
    var checkY = b;
    var ang = c;
    for(var i = 0; i < d; i++){
        for(var j = 0; j < gameObjects.length; j++){
            var objCheck = gameObjects[j];
            console.log(checkX + "--" + checkY);
            if(checkX >= (objCheck.x - objCheck.sizeX/2) && checkX <= (objCheck.x + objCheck.sizeX/2) && checkY <= (objCheck.y + objCheck.sizeY/2) && checkY >= (objCheck.y - objCheck.sizeY/2)){
                return objCheck;
            }
        }
        checkX += Math.cos(ang);
        checkY -= Math.sin(ang);
    }
    return false;
}
//random code for bugTesting
//------------------
//rayscan and gameObject proof of concept
var newGO = new GameObject("you",200,200,10,1000);
gameObjects.push(newGO);
var rsT = rayscan(0,0,0,1000);
console.log(rsT);
//------------------



