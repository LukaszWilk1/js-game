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
const firstTalk = ["This Rose right here looks exactly like the one i left on my home planet", "Sure kid, but why is everyone here so big?? Or I've just became small?"];
const secondTalk = ["One day I will be Mootamons Champion!", "Well, certainly not in the next 20 years"];
const thirdTalk  = ["Excelsior!!!", "We really miss You Stan.."];
const fourthTalk = ["What's it like to be a scribe, okay?","You know, I don't think it's good or bad. If I had to say what I value most in life,I would say people.", "People who gave me a helping hand when I couldn't cope, when I was alone,", "and interestingly, it is chance meetings that affect our lives.", " The point is that when we profess certain values,"," even seemingly universal ones,it happens that we do not find an understanding that, so to speak, that helps us to develop."," I was lucky so to speak because I found it, and thank life!", "I thank it; life is singing, life is dancing, life is love!", " Many people ask me the same thing: but how do you do it, where do you get this joy from?", " And I answer that it's easy! It's the love of life. ", " This is what makes me build machines today, for example, and tomorrow - who knows? ", " Why not - I will devote myself to social work and I will, just like, plant ... enough - c-carrots ..."];
const fifthTalk = ["You shall not pass!!!", "Shouldn't you be grey or somthing?"];
let firstConv = new ConversationFrame(firstTalk);
let secondConv = new ConversationFrame(secondTalk);
let thirdConv = new ConversationFrame(thirdTalk);
let fourthConv = new ConversationFrame(fourthTalk);
let fifthConv = new ConversationFrame(fifthTalk);
