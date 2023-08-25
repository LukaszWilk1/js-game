  const newBoundries = [];
  const newCharactersAreas = [];
  const newMootamonsAreas = [];

  for(let i = 0; i < layerBoundries.length; i+=70){
    newBoundries.push(layerBoundries.slice(i, 70+i));
  }
  for(let i = 0; i < charactersAreas.length; i+=70){
    newCharactersAreas.push(charactersAreas.slice(i, 70+i));
  }
  for(let i = 0; i < mootamonsAreas.length; i+=70){
    newMootamonsAreas.push(mootamonsAreas.slice(i, 70+i));
  }

class GameArea{
  constructor(width, height){
      this.canvas = document.createElement("canvas");
      this.canvas.width=width;
      this.canvas.height=height;
      document.body.appendChild(this.canvas);
      this.cx = this.canvas.getContext("2d");
  }
  getHeight(){
    return this.canvas.height;
  }
  clear(){
    this.cx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

GameArea.prototype.getWidth = function(){
  return this.canvas.width;
}

const myImage = new Image();
const foregroundImg = new Image();
myImage.src="mapa.png";
foregroundImg.src="foreground.png";

class Background{
constructor(image){
  this.image=image;
    this.x=-3120;
    this.y=-930;
  }
  updateBackground(){
    canva.cx.drawImage(this.image, this.x, this.y);
  }
}

const background = new Background(myImage);
const foreground = new Background(foregroundImg);

let canva = new GameArea(720,480);

const spriteImg = new Image(160,320);
spriteImg.src="Characters_V3_Colour.png";
const walkDown = new Image();
walkDown.src="walk_down.png"
const walkUp = new Image();
walkUp.src="walk_up.png";
const walkRight = new Image();
walkRight.src="walk_right.png";
const walkLeft = new Image();
walkLeft.src="walk_left.png";
const stayLeft = new Image();
stayLeft.src="stay_left.png";

class Player{
  constructor(x, y, width, height, frames = { max: 0 }){
    this.x=x;
    this.y=y;
    this.width = width;
    this.height = height;
    this.moving = false;
    this.movingDirection = "none";
    this.frames = {...frames, val: 0, elapsed: 0};
  }
  update(){
    this.x=(canva.getWidth()/2)-(this.width/2);
    this.y=(canva.getHeight()/2)-(this.height/2);
    this.body = canva.cx;
    if(!this.moving){
      switch(this.movingDirection){
        case "none":
        this.body.drawImage(spriteImg, 0, 0, 16, 16, (canva.getWidth()/2)-(this.width/2),(canva.getHeight()/2)-(this.height/2), this.width, this.height);
        break;
        case "down":
        this.body.drawImage(spriteImg, 0, 0, 16, 16, (canva.getWidth()/2)-(this.width/2),(canva.getHeight()/2)-(this.height/2), this.width, this.height);
        break;
        case "up":
        this.body.drawImage(spriteImg, 16, 0, 16, 16, (canva.getWidth()/2)-(this.width/2),(canva.getHeight()/2)-(this.height/2), this.width, this.height);
        break;
        case "right":
        this.body.drawImage(spriteImg, 32, 0, 16, 16, (canva.getWidth()/2)-(this.width/2),(canva.getHeight()/2)-(this.height/2), this.width, this.height);
        break;
        case "left":
        this.body.drawImage(stayLeft, 0, 0, 16, 16, (canva.getWidth()/2)-(this.width/2),(canva.getHeight()/2)-(this.height/2), this.width, this.height);
        break;
        default: console.log("SOMTHING WENT WRONG WHILE STOPPING");
      }
    }
    else{
      switch(this.movingDirection){
        case "down":
        this.body.drawImage(walkDown, this.frames.val*16, 0, 16, 16, (canva.getWidth()/2)-(this.width/2),(canva.getHeight()/2)-(this.height/2), this.width, this.height);
        if(this.frames.max > 1){
         this.frames.elapsed++;
        }
        if(this.frames.elapsed % 10 ===0){
          if(this.frames.val < 1) this.frames.val++;
          else this.frames.val = 0;
        }
        break;
        case "up":
        this.body.drawImage(walkUp, this.frames.val*16, 0, 16, 16, (canva.getWidth()/2)-(this.width/2),(canva.getHeight()/2)-(this.height/2), this.width, this.height);
        if(this.frames.max > 1){
         this.frames.elapsed++;
        }
        if(this.frames.elapsed % 10 ===0){
          if(this.frames.val < 1) this.frames.val++;
          else this.frames.val = 0;
        }
        break;
        case "right":
        this.body.drawImage(walkRight, this.frames.val*16, 0, 16, 16, (canva.getWidth()/2)-(this.width/2),(canva.getHeight()/2)-(this.height/2), this.width, this.height);
        if(this.frames.max > 1){
         this.frames.elapsed++;
        }
        if(this.frames.elapsed % 10 ===0){
          if(this.frames.val < 1) this.frames.val++;
          else this.frames.val = 0;
        }
        break;
        case "left":
        this.body.drawImage(walkLeft, this.frames.val*16, 0, 16, 16, (canva.getWidth()/2)-(this.width/2),(canva.getHeight()/2)-(this.height/2), this.width, this.height);
        if(this.frames.max > 1){
         this.frames.elapsed++;
        }
        if(this.frames.elapsed % 10 ===0){
          if(this.frames.val < 1) this.frames.val++;
          else this.frames.val = 0;
        }
        break;
        default: console.log("SOMTHING WENT WRONG WHILE WALKING!!!");
      }
    }
  }
  clear(){
    this.body.clearRect(this.x, this.y, this.width, this.height);
  }
}

class Obstacles{
  constructor(x, y, width, height, color){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height = height;
    this.color=color;
  }
  update(){
    this.body = canva.cx;
    this.body.fillStyle = this.color;
    this.body.fillRect(this.x, this.y, this.width, this.height);
  }
  clear(){
    this.body.clearRect(this.x, this.y, this.width, this.height);
  }
}

const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  },
  enter: {
    pressed: false
  }
}

function collisions({oPlayer, otherObj}){
  let playerLeft = player.x;
  let playerTop = player.y;
  let playerRight = player.x+player.width;
  let playerBottom = player.y+player.height;
  let otherLeft = otherObj.x;
  let otherTop = otherObj.y;
  let otherRight = otherObj.x+otherObj.width;
  let otherBottom = otherObj.y+otherObj.height;
  if(playerRight>otherLeft && playerLeft < otherRight && playerTop < otherBottom && playerBottom > otherTop){
    return true;
  }
}

let player = new Player(0,0,30,30, frames = { max: 2 });
player.update();

let boundaries = [];
let finalCharactersAreas = [];
let finalMootamonsAreas = [];

  newBoundries.forEach((row, i) => {
    row.forEach((number, j) => {
      if(number === 524){
          boundaries.push(new Obstacles(j*64 - 3120, i*64 - 930, 64, 64, "rgba(255, 255, 255, 0)"))
      }
    })
  })

  newCharactersAreas.forEach((row, i) => {
    row.forEach((number, j) => {
      if(number === 532){
          finalCharactersAreas.push(new Obstacles(j*64 - 3120, i*64 - 930, 64, 64, "rgba(255, 255, 255, 0)"))
      }
    })
  })

  newMootamonsAreas.forEach((row, i) => {
    row.forEach((number, j) => {
      if(number === 776){
          finalMootamonsAreas.push(new Obstacles(j*64 - 3120, i*64 - 930, 64, 64, "rgba(255, 255, 255, 0)"))
      }
    })
  })

const movingObjects = [background, foreground, ...boundaries, ...finalCharactersAreas, ...finalMootamonsAreas];

let talking = false;

function updateGame(){
  let movable=true;
  window.requestAnimationFrame(updateGame);
  canva.clear();
  background.updateBackground();
  boundaries.forEach(boundary => {
    boundary.update();
  })
  finalCharactersAreas.forEach(boundary => {
    boundary.update();
  })
  finalMootamonsAreas.forEach(boundary => {
    boundary.update();
  })
  player.update();
  foreground.updateBackground();

    if(keys.w.pressed && lastKey==='w'){
      player.moving = true;
      player.movingDirection = "up";
      for(let i=0;i<boundaries.length;i++){
        let obstacle = boundaries[i];
        if(collisions({oPlayer: player, otherObj:{...obstacle, x: obstacle.x, y: obstacle.y+2.5}})){
          movable=false;
        }
      }
      for(let i=0;i<finalCharactersAreas.length;i++){
        let characters = finalCharactersAreas[i];
        if(collisions({oPlayer: player, otherObj:{...characters, x: characters.x, y: characters.y+2.5}})){
          talking = true;
        }
      }
      for(let i=0;i<finalMootamonsAreas.length;i++){
        let mootamons = finalMootamonsAreas[i];
        if(collisions({oPlayer: player, otherObj:{...mootamons, x: mootamons.x, y: mootamons.y+2.5}})){
          console.log("YOU HAVE JUST FOUND MOOTAMON!!!");
        }
      }
      if(movable){
        for(let i=0;i<movingObjects.length;i++){
          movingObjects[i].y+=3;
        }
      }
    }
    else if(keys.s.pressed && lastKey==='s'){
      player.moving = true;
      player.movingDirection = "down";
      for(let i=0;i<boundaries.length;i++){
        let obstacle = boundaries[i];
        if(collisions({oPlayer: player, otherObj:{...obstacle, x: obstacle.x, y: obstacle.y-2.5}})){
          movable=false;
        }
      }
      for(let i=0;i<finalCharactersAreas.length;i++){
        let characters = finalCharactersAreas[i];
        if(collisions({oPlayer: player, otherObj:{...characters, x: characters.x, y: characters.y+2.5}})){
          talking = true;
        }
      }
      for(let i=0;i<finalMootamonsAreas.length;i++){
        let mootamons = finalMootamonsAreas[i];
        if(collisions({oPlayer: player, otherObj:{...mootamons, x: mootamons.x, y: mootamons.y+2.5}})){
          console.log("YOU HAVE JUST FOUND MOOTAMON!!!");
        }
      }
      if(movable){
        for(let i=0;i<movingObjects.length;i++){
          movingObjects[i].y-=3;
        }
      }
    }
    else if(keys.a.pressed && lastKey==='a'){
      player.moving = true;
      player.movingDirection = "left";
      for(let i=0;i<boundaries.length;i++){
        let obstacle = boundaries[i];
        if(collisions({oPlayer: player, otherObj:{...obstacle, x: obstacle.x+2.5, y: obstacle.y}})){
          movable=false;
        }
      }
      for(let i=0;i<finalCharactersAreas.length;i++){
        let characters = finalCharactersAreas[i];
        if(collisions({oPlayer: player, otherObj:{...characters, x: characters.x, y: characters.y+2.5}})){
          talking = true;
        }
      }
      for(let i=0;i<finalMootamonsAreas.length;i++){
        let mootamons = finalMootamonsAreas[i];
        if(collisions({oPlayer: player, otherObj:{...mootamons, x: mootamons.x, y: mootamons.y+2.5}})){
          console.log("YOU HAVE JUST FOUND MOOTAMON!!!");
        }
      }
        if(movable){
          for(let i=0;i<movingObjects.length;i++){
            movingObjects[i].x+=3;
          }
        }
    }
    else if(keys.d.pressed && lastKey==='d'){
      player.moving = true;
      player.movingDirection = "right";
      for(let i=0;i<boundaries.length;i++){
        let obstacle = boundaries[i];
        if(collisions({oPlayer: player, otherObj:{...obstacle, x: obstacle.x-2.5, y: obstacle.y}})){
          movable=false;
        }
      }
      for(let i=0;i<finalCharactersAreas.length;i++){
        let characters = finalCharactersAreas[i];
        if(collisions({oPlayer: player, otherObj:{...characters, x: characters.x, y: characters.y+2.5}})){
          talking = true;
        }
      }
      for(let i=0;i<finalMootamonsAreas.length;i++){
        let mootamons = finalMootamonsAreas[i];
        if(collisions({oPlayer: player, otherObj:{...mootamons, x: mootamons.x, y: mootamons.y+2.5}})){
          console.log("YOU HAVE JUST FOUND MOOTAMON!!!");
        }
      }
       if(movable){
         for(let i=0;i<movingObjects.length;i++){
           movingObjects[i].x-=3;
         }
       }
    }
    if(keys.enter.pressed && talking){
      console.log("YOU ARE TALKING WITH SOMEONE!!!");
    }
}

updateGame();

let lastKey;
window.addEventListener("keydown", e => {
  switch(e.key){
    case "w":
      keys.w.pressed=true;
      lastKey='w';
      break;
    case "a":
      keys.a.pressed=true;
      lastKey='a';
      break;
    case "s":
      player.moving = true;
      keys.s.pressed=true;
      lastKey='s';
      break;
    case "d":
      keys.d.pressed=true;
      lastKey='d';
      break;
    case "Enter":
      keys.enter.pressed=true;
      break;
  }
})

window.addEventListener("keyup", e => {
  switch(e.key){
    case "w":
      player.moving = false;
      keys.w.pressed=false;
      player.speedY=0;
      break;
    case "a":
      player.moving = false;
      keys.a.pressed=false;
      player.speedX=0;
      break;
    case "s":
      player.moving = false;
      keys.s.pressed=false;
      player.speedY=0;
      break;
    case "d":
      player.moving = false;
      keys.d.pressed=false;
      player.speedX=0;
      break;
      case "Enter":
        keys.enter.pressed=false;
        break;
  }
})
