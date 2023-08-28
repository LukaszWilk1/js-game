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


class ConversationFrame{
  constructor(tab){
    this.tab = tab;
  }
  draw(){
    canva.cx.fillStyle = "white";
    canva.cx.fillRect(0, 400, 720, 80);
    canva.cx.beginPath();
    canva.cx.fillStyle = "black";
    canva.cx.strokeRect(0, 400, 720, 80);
    canva.cx.beginPath();
    canva.cx.font = "15px Arial"
    canva.cx.fillText(this.tab[convoIterator], 10, 430);
    if(keys.space.pressed){
      convoIterator++;
      keys.space.pressed = false;
      console.log(keys.enter.pressed);
      if(convoIterator==this.tab.length){
        convoIterator = 0;
        talking=false;
        keys.enter.pressed=false;
        movable=true;
      }
    }
  }
}
