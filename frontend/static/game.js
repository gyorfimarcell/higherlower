const container = document.getElementById("container");
const leftSide = document.getElementById("left");
const leftName = document.getElementById("left-name");
const leftNumber = document.getElementById("left-number");

const rightSide = document.getElementById("right");
const rightName = document.getElementById("right-name");
const rightNumber = document.getElementById("right-number");
const compareName = document.getElementById("compare-name");

const rightResults = document.getElementById("right-results");
const rightButtons = document.getElementById("right-buttons");

const vsDiv = document.getElementById("vs");
const scoreEl = document.getElementById("score");
const loseScore = document.getElementById("lose-score");

let people = null;
let score = 0;

async function FetchPeople() {
    const res = await fetch("/api/twopersons/");
    const data = await res.json();
    data[0].img = data[0].img.replace("/frontend", "");
    data[1].img = data[1].img.replace("/frontend", "");
    return data;
}

async function StartGame() {
    people = await FetchPeople();
    SetData();
}

async function NextGame() {
    const newPeople = await FetchPeople();

    people[0] = people[1];
    people[1] = newPeople[0].id == people[0].id ? newPeople[1] : newPeople[0];

    SetData();
}

function SetData() {
    container.classList.remove("transition");
    rightButtons.style.display = "inherit";
    rightResults.style.display = "none";
    vsDiv.className = "";

    leftSide.style.backgroundImage = `url(${people[0].img})`;
    leftName.innerText = people[0].name;
    leftNumber.innerText = people[0].value.toLocaleString("en-US");

    rightSide.style.backgroundImage = `url(${people[1].img})`;
    rightName.innerText = people[1].name;
    rightNumber.innerText = people[1].value.toLocaleString("en-US");
    compareName.innerText = people[0].name;
}

function Compare(guess) {
    rightButtons.style.display = "none";
    rightResults.style.display = "inherit";

    const higher = people[0].value < people[1].value;
    const win = higher === guess;

    if (win) {
        vsDiv.className = "win";
        scoreEl.innerText = ++score;
        loseScore.innerText = score;
    } else {
        vsDiv.className = "lose";
    }

    setTimeout(() => {
        if (win) {
            container.classList.add("transition");
            setTimeout(() => {
                NextGame();
            }, 1000);
        } else {
            document.getElementById("game").style.display = "none";
            document.getElementById("lose-screen").style.display = "flex";
        }
    }, 2000);
}

StartGame();