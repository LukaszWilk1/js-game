const myImage = new Image();
const foregroundImg = new Image();
const spriteImg = new Image(160,320);
const walkDown = new Image();
const walkUp = new Image();
const walkRight = new Image();
const walkLeft = new Image();
const stayLeft = new Image();

myImage.src="mapa.png";
foregroundImg.src="foreground.png";
spriteImg.src="Characters_V3_Colour.png";
walkDown.src="walk_down.png"
walkUp.src="walk_up.png";
walkRight.src="walk_right.png";
walkLeft.src="walk_left.png";
stayLeft.src="stay_left.png";

const background = new Background(myImage);
const foreground = new Background(foregroundImg);

let canva = new GameArea(720,480);

let player = new Player(0,0,30,30, frames = { max: 2 });
const smallTalk = ["Hello!", "Hi!"];
let firstConv = new ConversationFrame(smallTalk);
