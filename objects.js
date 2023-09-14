const myImage = new Image();
const foregroundImg = new Image();
const spriteImg = new Image(160,320);
const walkDown = new Image();
const walkUp = new Image();
const walkRight = new Image();
const walkLeft = new Image();
const stayLeft = new Image();
const firstFight = new Image();
const secondFight = new Image();
const thirdFight = new Image();
const firstAnim = new Image();
const prof = new Image();
const beginingText = new Image();
const fightText = new Image();
const lastMoota = new Image();
const professorsHouse = new Image();
const empty = new Image();
const start = new Image();
const won = new Image();
const home = new Image();
const thanks = new Image();

let gameState = new State(-3120, -930);

myImage.src="images/mapa.png";
foregroundImg.src="images/foreground.png";
spriteImg.src="images/Characters_V3_Colour.png";
walkDown.src="images/walk_down.png"
walkUp.src="images/walk_up.png";
walkRight.src="images/walk_right.png";
walkLeft.src="images/walk_left.png";
stayLeft.src="images/stay_left.png";
firstFight.src="images/firstFight.png";
secondFight.src="images/secondFight.png";
thirdFight.src="images/thirdFight.png";
firstAnim.src = "images/firstAnimBcg.png";
prof.src = "images/prof.png";
beginingText.src = "images/beginingText.png";
fightText.src = "images/fight.png";
lastMoota.src = "images/lastMoota.png";
professorsHouse.src = "images/profesorsHouse.png";
empty.src = "images/empty.png";
start.src="images/start.png";
won.src = "images/won.png";
home.src = "images/home.png";
thanks.src="images/thanks.png";

const background = new Background(myImage);
const foreground = new Background(foregroundImg);

let canva = new GameArea(720,480);

let player = new Player(0,0,30,30, frames = { max: 2 });
const firstTalk = ["Kid: This Rose right here looks exactly like the one i left on my home planet", "You: Sure kid, but why is everyone here so big?? Or I've just became small?"];
const secondTalk = ["Bash: One day I will be Mootamons Champion!", "You: Well, certainly not in the next 20 years"];
const thirdTalk  = ["Stan: Excelsior!!!", "You: We really miss You Stan.."];
const fourthTalk = ["You: What's it like to be a scribe, okay?","Scribe: You know, I don't think it's good or bad. If I had to say what I value most in life,I would say people.", "People who gave me a helping hand when I couldn't cope, when I was alone,", "and interestingly, it is chance meetings that affect our lives.", " The point is that when we profess certain values,"," even seemingly universal ones,it happens that we do not find an understanding that, ", " so to speak, that helps us to develop."," I was lucky so to speak because I found it, and thank life!", "I thank it; life is singing, life is dancing, life is love!", " Many people ask me the same thing: but how do you do it, where do you get this joy from?", " And I answer that it's easy! It's the love of life. ", " This is what makes me build machines today, for example, and tomorrow - who knows? ", " Why not - I will devote myself to social work and I will, just like, plant ... enough - c-carrots ..."];
const fifthTalk = ["Wizzard: You shall not pass!!!", "You: Shouldn't you be grey or somthing?"];
const sixthTalk = ["Girl: I heard some noise in those bushes", "You: I should check it"];
const seventhTalk = ["Mather: I'm outraged! ", " Some gray guy with two swords wanted to take my daughter and make her some monster hunter! ", "Mather: It's not a safe neighborhood anymore..", "You: Now I have seen everything"];
const eigthtTalk = ["Old Man: Hello There!", "You: General Kenobi!"];
const firtsAnimTalk = ["All right, it is time to finally send my resume to that company.", "I have been preparing myself for this moment last few years.", "I hope that they will will consider my candidacy positively.", "Wait, why can't I send any email?!", "What?! My internet is blocked by Professor Cloak?", "It must be this crazy old man living nearby.", "I should probably wisit him."];
const secondAmimTalk = ["",
"Professor: Oh, yes you have finally arived!",
"You: I will ask only once, Who are you and why did u blocked my email??",
"Professor: There is no time for it now, you must help me!",
"You: I am not going to help you!",
"You: Give me my email access back right now!",
"You: I am applaying for job in this company I always dreamed to work for.",
"You: You won't take that from me crazy old man!",
"Professor: Oh yes, I saw your resume.",
"Professor: you'd be lucky if anyone even read it",
"You: What do you mean?",
"Professor: It is awfull!",
"Professor: But I will help you with it, if you will help me.",
"You: Since when you know how to write good resume?",
"Professor: I am not a professor by accident.",
"You: All right then, I will help you.",
"You: What am i supposed to do?",
"Professor: Great! So there is a problem.",
"Professor: I created creatures i called Mootamons.",
"Professor: I made them to send them to my pocket world, so they can live there free.",
"Professor: Unfortunatelly 3 of them escaped to early.",
"Professor: Thats bad because i didnt train them yet",
"Professor: Now they are hiding somewhere. You have to find them.",
"Professor: Here, take this. This is a mootaball with Monero inside",
"Professor: He is the most powerfull of them all.",
"Professor: You shold defeat them easily",
"You: Wait, what? Pocket World?  Mootamons?",
"You: What are you talkin about!?",
"Professor: There is no time for it now! Hurry! You are our last hope!",
"You: Wait! What is goooo.... AAAAAA..."
];

const beforeGameTalk = ["You: What happend? Where am i?", "You: This must be this pocket world this crazy old man was talking about", "You: All right sonner i finish my mission, sooner i will be back", "You: Lets get to work. I should probably look for them in some bushes."]
const afterGameTalk = ["You: All right, I caught them all, what now?", "You: Oh no, not this agai... AAAA..."];
const portal = ["You: I hate portals"];
const lastProffTalk = ["","Professor: Haha You have made it! I knew i made a goood choice.", "You: Yeah it was crazy adventure but i made it.", "You: Can you please give me back my intenet back now?", "Professor: Yes of course", "Professor: I also improved your resume, it is on your computer already.", "Professor: Good luck with finding job.", "You: Thank you so much.", "You: And what about you?" ," Professor: Now i am going to train mootamons,", "Professor: Then I will send them to pocket world,", "Professor: and then i will send this 9 year old kid Bash that you probably met there", "Professor: to catch them all!", "Professor: Isn't it great idea to send 9 year ol kid for that dangerous mission?", "You: Yeah definitely", "You: Thanks again, good bye."];
const yourLastTalk = ["You: All right, lets check this new resume.", "You: Wow it is really good. But i hope i am not late", "You: Great! This position is still open!", "You: All right resume has been sent, now i must wait.", "You: This was really crazy adventure. I hope They will like it."]

let firstConv = new ConversationFrame(firstTalk);
let secondConv = new ConversationFrame(secondTalk);
let thirdConv = new ConversationFrame(thirdTalk);
let fourthConv = new ConversationFrame(fourthTalk);
let fifthConv = new ConversationFrame(fifthTalk);
let sixthConv = new ConversationFrame(sixthTalk);
let seventhConv = new ConversationFrame(seventhTalk);
let eigthtConv = new ConversationFrame(eigthtTalk);
let firstAnimConv = new ConversationFrame(firtsAnimTalk);
let secondAnimConv = new ConversationFrame(secondAmimTalk);
let beforeGameConv = new ConversationFrame(beforeGameTalk);
let afterGameConv = new ConversationFrame(afterGameTalk);
let portalConv = new ConversationFrame(portal);
let lastProfConv = new ConversationFrame(lastProffTalk);
let yourLastConv = new ConversationFrame(yourLastTalk);

const images = [beginingText, firstAnim, professorsHouse, prof, empty, start, empty];
const endingImages = [start, empty, professorsHouse, prof, home, firstAnim, thanks];

let fightRectangle = new ConversationFrame();
