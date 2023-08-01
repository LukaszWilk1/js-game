class GameArea{
  constructor(width, height){
      this.canvas = document.createElement("canvas");
      this.canvas.width=width;
      this.canvas.height=height;
      document.body.appendChild(this.canvas);
      this.cx = this.canvas.getContext("2d");
      this.interval = setInterval(updateGame, 20);
  }
  clear(){
    this.cx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

GameArea.prototype.loadMap = function(){
  let count = 0;
  for(let i=0; i<=480;i+=20){
    for(let j=0; j<=720;j+=20){
      if(count%2==0){
          this.cx.fillStyle="green";
          this.cx.fillRect(j,i,20,20);
          count++;
      } else if(count%2!=0) {
        this.cx.fillStyle="red";
        this.cx.fillRect(j,i,20,20);
        count++;
      }
    }
  }
}

let canva = new GameArea(720,480);
canva.loadMap();

class Player{
  constructor(x, y, width, height, color){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height = height;
    this.color=color;
    this.speedX=0;
    this.speedY=0;
  }
  update(){
    this.body = canva.cx;
    this.body.fillStyle = this.color;
    this.body.fillRect(this.x, this.y, this.width, this.height);
  }
  clear(){
    this.body.clearRect(this.x, this.y, this.width, this.height);
  }
  newPos(){
    this.x+=this.speedX;
    this.y+=this.speedY;
  }
  colision(otherObj){
    let playerLeft = this.x;
    let playerTop = this.y;
    let playerRight = this.x+this.width;
    let playerBottom = this.y+this.heigt;
    let otherLeft = otherObj.x;
    let otherTop = otherObj.y;
    let otherRight = otherObj.x+otherObj.width;
    let otherBottom = otherObj.y+otherObj.height;
    let crash = true;
    if(playerBottom<otherTop || playerRight<otherLeft || playerTop>otherBottom || playerLeft>otherRight){
      crash = false;
    }
    return crash;
  }
}

let player = new Player(100,100,30,30,"black");
player.update();

let obstacle = new Player(200, 200, 50, 50, "yellow");

function updateGame(){
  if(player.colision(obstacle)){
    player.speedX=0;
    player.speedY=0;
  }
  canva.clear();
  canva.loadMap();
  obstacle.update();
  player.newPos();
  player.update();
}

document.addEventListener("keydown", e => {
  if(e.key=="d") player.speedX=20;
  if(e.key=="a") player.speedX=-20;
  if(e.key=="s") player.speedY=20;
  if(e.key=="w") player.speedY=-20;
})

document.addEventListener("keyup", e => {
  if(e.key=="d") player.speedX=0;
  if(e.key=="a") player.speedX=0;
  if(e.key=="s") player.speedY=0;
  if(e.key=="w") player.speedY=0;
})
