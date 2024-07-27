let initialList = [
    "SS"/*Sam*/, "SB"/*Sophia*/, "LL"/*Luca*/, "JA"/*Jad*/,
    "MK"/*Mads*/, "EF"/*Eli*/, "JZ"/*Joaquin*/, "IG"/*Gaeta*/
];
let killAction = [
    "seriously?", "magician",
    "toenail", "that's my drink",
    "I've no idea", "helicopter",
    "are you drunk?", "tiny dancer"
];

function sfc32(a, b, c, d) {
    return function() {
        a |= 0; b |= 0; c |= 0; d |= 0;
        let t = (a + b | 0) + d | 0;
        d = d + 1 | 0;
        a = b ^ b >>> 9;
        b = c + (c << 3) | 0;
        c = (c << 21 | c >>> 11);
        c = c + t | 0;
        return (t >>> 0) / 4294967296;
    }
}
const seedgen = () => (641);//(Math.random()*2**32)>>>0;
const getRand = sfc32(seedgen(), seedgen(), seedgen(), seedgen());
for(let i=0; i<2; i++) console.log(getRand());

function createText(text) {
    const para = document.createElement("p");
    const node = document.createTextNode(text);
    para.appendChild(node);
    document.body.appendChild(para);
    return para;
}

function shuffleArray(array) { //internet code lol
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(getRand() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

shuffleArray(initialList);
shuffleArray(killAction);

let badText = undefined;

const inputBox = document.getElementById("input");

inputBox.addEventListener("keydown", function (e) { //also from StackO
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        submit();
    }
});

function submit() {
    myInitials = inputBox.value.toUpperCase();
    if (initialList.includes(myInitials)) {
        if (badText != undefined) {
            badText.remove();
        }
        document.getElementById("inputFull").remove();
        document.getElementById("revealButton").remove();
        
        let myIndex = initialList.indexOf(myInitials);
        let myTarget = initialList[(myIndex + 1) % initialList.length];
        let myMethod = killAction[myIndex];
        console.log("Target: " + myTarget + "\nMethod: " + myMethod);
        createText(myTarget);
        createText(myMethod);
    } else if (badText == undefined) {
        console.log("badText");
        badText = createText("Bad Initials");
    }
}
