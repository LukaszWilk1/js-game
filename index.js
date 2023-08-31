  const newBoundries = [];
  const newCharactersAreas = [];
  const newMootamonsAreas = [];
  let convoIterator = 0;
  let characterNumber;

  for(let i = 0; i < layerBoundries.length; i+=70){
    newBoundries.push(layerBoundries.slice(i, 70+i));
  }
  for(let i = 0; i < charactersAreas.length; i+=70){
    newCharactersAreas.push(charactersAreas.slice(i, 70+i));
  }
  for(let i = 0; i < mootamonsAreas.length; i+=70){
    newMootamonsAreas.push(mootamonsAreas.slice(i, 70+i));
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

  newBoundries.forEach((row, i) => {
    row.forEach((number, j) => {
      if(number === 524){
          boundaries.push(new Obstacles(j*64 - 3120, i*64 - 930, 64, 64, "rgba(255, 255, 255, 0)"))
      }
    })
  })

  newCharactersAreas.forEach((row, i) => {
    row.forEach((number, j) => {
      if(number !== 0){
          finalCharactersAreas.push(new Obstacles(j*64 - 3120, i*64 - 930, 64, 64, "rgba(255, 255, 255, 0)", number))
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
let movable = false;

function updateGame(){
 movable=true;
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
          characterNumber = characters.number;
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
          characterNumber = characters.number;
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
          characterNumber = characters.number;
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
          characterNumber = characters.number;
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
    if(talking){
      keys.enter.pressed = true;
    }
      break;
    case " ":
      keys.space.pressed = true;
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
    case " ":
    keys.space.pressed = false;
      break;
  }
})

window.addEventListener("load", e => {
  if(window.innerWidth >= 1024){
      const button = document.createElement("button");
      button.innerHTML = "START GAME";
      button.onclick = function(){
        button.remove();
        canva.create();
      }
      document.getElementById("main").appendChild(button);
  }
  else{
    document.getElementById("main").innerHTML = "<h2>SORYY, BUT YOUR SCREEN IS TO SMALL TO PLAY MOOTAMONS :(</h2>";
  }
})
