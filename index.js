const newBoundries = [];
const newCharactersAreas = [];
let newMootamonsAreas = [];
let convoIterator = 0;
let characterNumber;
let mootamonNumber;
let yoursHealth = 100;
let enemysHealth = 100;
let yourTurn = true;
let didUHit = true;
let animationHelper = false;
let animIterator = 0;
let animTalk = false;

const spaceEventHandler = e => {
  if(e.key===" "){
    keys.space.pressed = true;
  }
}

const spaceAnimHandler = e => {
  if(e.key===" "){
    animIterator++;
  }
}

const onDownFunction = e => {
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
    if(talking && keys.w.pressed == false && keys.s.pressed == false && keys.a.pressed == false && keys.d.pressed == false){
      keys.enter.pressed = true;
      movable=false;
      player.moving=false;
      window.removeEventListener("keydown", onDownFunction);
      window.addEventListener("keydown", spaceEventHandler);
    }
      break;
    case " ":
      keys.space.pressed = true;
      break;
  }
}

const onUpFunction = e => {
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
    case " ":
    keys.space.pressed = false;
      break;
  }
}

const slicing = () => {
  newMootamonsAreas = [];
  for(let i = 0; i < layerBoundries.length; i+=70){
    newBoundries.push(layerBoundries.slice(i, 70+i));
  }
  for(let i = 0; i < charactersAreas.length; i+=70){
    newCharactersAreas.push(charactersAreas.slice(i, 70+i));
  }
  for(let i = 0; i < mootamonsAreas.length; i+=70){
    newMootamonsAreas.push(mootamonsAreas.slice(i, 70+i));
  }
}

slicing();

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
},
space: {
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

player.update();

let boundaries = [];
let finalCharactersAreas = [];
let finalMootamonsAreas = [];

const objectsCreating = () => {
newBoundries.forEach((row, i) => {
  row.forEach((number, j) => {
    if(number === 524){
        boundaries.push(new Obstacles(j*64 + background.x, i*64 + background.y, 64, 64, "rgba(255, 255, 255, 0)"))
    }
  })
})

newCharactersAreas.forEach((row, i) => {
  row.forEach((number, j) => {
    if(number !== 0){
        finalCharactersAreas.push(new Obstacles(j*64 + background.x, i*64 + background.y, 64, 64, "rgba(255, 255, 255, 0)", number))
    }
  })
})

newMootamonsAreas.forEach((row, i) => {
  row.forEach((number, j) => {
    if(number !== 0){
        finalMootamonsAreas.push(new Obstacles(j*64 + background.x, i*64 + background.y, 64, 64, "rgba(255, 255, 255, 0)", number))
    }
  })
})
}

objectsCreating();

let movingObjects = []

const updateMovingObjects = () => {
  movingObjects = [background, foreground, ...boundaries, ...finalCharactersAreas, ...finalMootamonsAreas];
}

updateMovingObjects();

let talking = false;
let movable = false;
let inFight = false;
let i = 1;
let j = 0;

function fadingOut(){
canva.cx.fillStyle=`rgba(0, 0, 0, ${i})`;
canva.cx.fillRect(0, 0, 720, 480);
  setInterval(() => {
    if(i>=0){
      canva.cx.clearRect(0, 0, 720, 480);
      canva.cx.fillStyle=`rgba(0, 0, 0, ${i})`;
      canva.cx.fillRect(0, 0, 720, 480);
      i-=0.1;
    }
  }, 50);
  i=1;
}

function fadingIn(){
canva.cx.fillStyle=`rgba(0, 0, 0, ${j})`;
canva.cx.fillRect(0, 0, 720, 480);
  setInterval(() => {
    if(j<=1){
      canva.cx.clearRect(0, 0, 720, 480);
      canva.cx.fillStyle=`rgba(0, 0, 0, ${j})`;
      canva.cx.fillRect(0, 0, 720, 480);
      j+=0.1;
    }
  }, 50);
  j=0;
}

function updateGame(){
let id = window.requestAnimationFrame(updateGame);
movable=true;
if(!inFight){
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
         characterNumber = characters.number;
       }
     }
     for(let i=0;i<finalMootamonsAreas.length;i++){
       let mootamons = finalMootamonsAreas[i];
       if(collisions({oPlayer: player, otherObj:{...mootamons, x: mootamons.x, y: mootamons.y+2.5}})){
         mootamonNumber = mootamons.number;
         console.log(mootamonNumber);
         inFight = true;
         movable=false;
         player.moving=false;
         enemysHealth = 100;
         yoursHealth = 100;
         window.removeEventListener("keydown", onDownFunction);
         window.addEventListener("keydown", spaceEventHandler);
       }
     }
     if(movable){
       for(let i=0;i<movingObjects.length;i++){
         movingObjects[i].y+=3;
         gameState.updateY+=3;
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
         characterNumber = characters.number;
       }
     }
     for(let i=0;i<finalMootamonsAreas.length;i++){
       let mootamons = finalMootamonsAreas[i];
       if(collisions({oPlayer: player, otherObj:{...mootamons, x: mootamons.x, y: mootamons.y+2.5}})){
         mootamonNumber = mootamons.number;
         console.log(mootamonNumber);
         inFight = true;
         movable=false;
         player.moving=false;
         enemysHealth = 100;
         yoursHealth = 100;
         window.removeEventListener("keydown", onDownFunction);
         window.addEventListener("keydown", spaceEventHandler);
       }
     }
     if(movable){
       for(let i=0;i<movingObjects.length;i++){
         movingObjects[i].y-=3;
         gameState.updateY-=3;
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
         characterNumber = characters.number;
       }
     }
     for(let i=0;i<finalMootamonsAreas.length;i++){
       let mootamons = finalMootamonsAreas[i];
       if(collisions({oPlayer: player, otherObj:{...mootamons, x: mootamons.x, y: mootamons.y+2.5}})){
         mootamonNumber = mootamons.number;
         console.log(mootamonNumber);
         inFight = true;
         movable=false;
         player.moving=false;
         enemysHealth = 100;
         yoursHealth = 100;
         window.removeEventListener("keydown", onDownFunction);
         window.addEventListener("keydown", spaceEventHandler);
       }
     }
       if(movable){
         for(let i=0;i<movingObjects.length;i++){
           movingObjects[i].x+=3;
           gameState.updateX+=3;
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
         characterNumber = characters.number;
       }
     }
     for(let i=0;i<finalMootamonsAreas.length;i++){
       let mootamons = finalMootamonsAreas[i];
       if(collisions({oPlayer: player, otherObj:{...mootamons, x: mootamons.x, y: mootamons.y+2.5}})){
         mootamonNumber = mootamons.number;
         console.log(mootamonNumber);
         inFight = true;
         movable=false;
         player.moving=false;
         enemysHealth = 100;
         yoursHealth = 100;
         window.removeEventListener("keydown", onDownFunction);
         window.addEventListener("keydown", spaceEventHandler);
       }
     }
      if(movable){
        for(let i=0;i<movingObjects.length;i++){
          movingObjects[i].x-=3;
          gameState.updateX-=3;
        }
      }
   }
   if(keys.enter.pressed && talking){
     switch(characterNumber){
       case 1:
       firstConv.draw();
       break;
       case 2:
       secondConv.draw();
       break;
       case 3:
       thirdConv.draw();
       break;
       case 4:
       fourthConv.draw();
       break;
       case 5:
       fifthConv.draw();
       break;
       case 6:
       sixthConv.draw();
       break;
       case 7:
       seventhConv.draw();
       break;
       case 8:
       eigthtConv.draw();
       break;
       default: console.log("CONVO NOT READY YET!");
     }
   }
}
else {
window.removeEventListener("keyup", onUpFunction);
 //setTimeout(() => {
   canva.clear();
   for(let it = 0; it < mootamonsAreas.length; it++){
     if(mootamonsAreas[it] === mootamonNumber){
       mootamonsAreas[it] = 0;
     }
   }
   switch(mootamonNumber){
    case 1:
    canva.cx.drawImage(firstFight, 0, 0, 720, 480);
    canva.cx.fillStyle = "yellow";
    canva.cx.font = "25px Arial";
    canva.cx.fillText(`Monero's healt: ${yoursHealth}%`, 470, 380);
    canva.cx.beginPath();
    canva.cx.fillStyle = "yellow";
    canva.cx.font = "25px Arial";
    canva.cx.fillText(`Tinoroco's healt: ${enemysHealth}%`, 10, 30);
    canva.cx.beginPath();
    canva.cx.fillStyle = "black";
    canva.cx.font = "15px Arial";
    fightRectangle.fightDraw();
    canva.cx.fillText("Use space to attack enemy!", 10, 420);
    if(enemysHealth===0){
      keys.w.pressed = false;
      keys.s.pressed = false;
      keys.a.pressed = false;
      keys.d.pressed = false;
      finalMootamonsAreas = [];
      slicing();
      objectsCreating();
      updateMovingObjects();
      window.addEventListener("keydown", onDownFunction);
      window.addEventListener("keyup", onUpFunction);
      inFight = false;
      window.cancelAnimationFrame(id);
      updateGame();
    }
    break;
    case 2:
    canva.cx.drawImage(secondFight, 0, 0, 720, 480);
    canva.cx.fillStyle = "yellow";
    canva.cx.font = "25px Arial";
    canva.cx.fillText(`Monero's healt: ${yoursHealth}%`, 450, 380);
    canva.cx.beginPath();
    canva.cx.fillStyle = "yellow";
    canva.cx.font = "25px Arial";
    canva.cx.fillText(`Feracton's healt: ${enemysHealth}%`, 10, 30);
    fightRectangle.fightDraw();
    canva.cx.fillText("Use space to attack enemy!", 10, 420);
    if(enemysHealth===0){
      keys.w.pressed = false;
      keys.s.pressed = false;
      keys.a.pressed = false;
      keys.d.pressed = false;
      finalMootamonsAreas = [];
      slicing();
      objectsCreating();
      updateMovingObjects();
      window.addEventListener("keydown", onDownFunction);
      window.addEventListener("keyup", onUpFunction);
      inFight = false;
      window.cancelAnimationFrame(id);
      updateGame();
    }
    break;
    case 3:
    canva.cx.drawImage(thirdFight, 0, 0, 720, 480);
    canva.cx.fillStyle = "yellow";
    canva.cx.font = "25px Arial";
    canva.cx.fillText(`Monero's healt: ${yoursHealth}%`, 450, 380);
    canva.cx.beginPath();
    canva.cx.fillStyle = "yellow";
    canva.cx.font = "25px Arial";
    canva.cx.fillText(`Priglot's healt: ${enemysHealth}%`, 10, 30);
    fightRectangle.fightDraw();
    canva.cx.fillText("Use space to attack enemy!", 10, 420);
    if(enemysHealth===0){
      keys.w.pressed = false;
      keys.s.pressed = false;
      keys.a.pressed = false;
      keys.d.pressed = false;
      finalMootamonsAreas = [];
      slicing();
      objectsCreating();
      updateMovingObjects();
      window.addEventListener("keydown", onDownFunction);
      window.addEventListener("keyup", onUpFunction);
      inFight = false;
      window.cancelAnimationFrame(id);
      updateGame();
    }
    break;
    default: console.log("Fight image does not work :(");
   }
   /*
   setTimeout(() => {
     finalMootamonsAreas = [];
     slicing();
     objectsCreating();
     updateMovingObjects();
     window.addEventListener("keydown", onDownFunction);
     updateGame();
   }, 1000);
   */
 //}, 1000);
}
}

const listen = () => {
  let id = requestAnimationFrame(listen);
  window.addEventListener("keydown", spaceAnimHandler);
  /*if(keys.space.pressed){
    //window.cancelAnimationFrame(id);
    //keys.space.pressed = false;
    //window.removeEventListener("keydown", spaceEventHandler);
    canva.clear();
    canva.cx.drawImage(firstAnim, 0, 0);
    firstAnimConv.draw();
    if(animationHelper){
      animationHelper = false;
      canva.clear();
      canva.cx.drawImage(professorsHouse, 0, 0);
      if(keys.space.pressed){
        canva.clear();
        canva.cx.drawImage(prof, 0, 0);
      }
    }
    //window.addEventListener("keydown", onDownFunction);
    //window.addEventListener("keyup", onUpFunction);
    //updateGame();
    */
    canva.cx.drawImage(images[animIterator], 0, 0);
    if(animIterator == 1){
      window.removeEventListener("keydown", spaceAnimHandler);
      window.addEventListener("keydown", spaceEventHandler);
      animTalk = true;
      firstAnimConv.draw();
      if(animationHelper){
        animationHelper = false;
        console.log("HELPER WORKS");
        animIterator++;
        window.addEventListener("keydown", spaceAnimHandler);
        window.removeEventListener("keydown", spaceEventHandler);
      }
    }
    if(animIterator == 3){
      window.removeEventListener("keydown", spaceAnimHandler);
      window.addEventListener("keydown", spaceEventHandler);
      animTalk = true;
      secondAnimConv.draw();
      if(animationHelper){
        animationHelper = false;
        console.log("HELPER WORKS");
        animIterator++;
        window.addEventListener("keydown", spaceAnimHandler);
        window.removeEventListener("keydown", spaceEventHandler);
      }
    }
    if(animIterator == images.length - 1){
      animIterator = 0;
      window.cancelAnimationFrame(id);
      window.addEventListener("keydown", onDownFunction);
      window.addEventListener("keyup", onUpFunction);
      updateGame();
    }
  }


let lastKey;
window.addEventListener("load", e => {
if(window.innerWidth >= 1024){
    const button = document.createElement("button");
    button.innerHTML = "START GAME";
    button.onclick = function(){
      button.remove();
      canva.create();
      canva.cx.drawImage(beginingText, 0, 0);
      listen();
    }
    document.getElementById("main").appendChild(button);
}
else{
  document.getElementById("main").innerHTML = "<h2>SORYY, BUT YOUR SCREEN IS TO SMALL TO PLAY MOOTAMONS :(</h2>";
}
})
