const fullAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let shuffledAlphabet = shuffleString(fullAlphabet);
let curPlayer = 0;
const start = 1;
const end = fullAlphabet.length;
let numPlayers = end;
let shufflePageDiv;
let startPageDiv;
let selectNumberElement;
let letterNumberMap;
let playerNumberDiv;
let playerLetterDiv;
let prevPlayerButton;
let nextPlayerButton;
function getRandomIndex(array) {
    if (array.length === 0) {
        throw new Error("Cannot get index from an empty array.");
    }
    return Math.floor(Math.random() * array.length);
}
function createDom() {
    const startPage = createStartPage();
    const shufflePage = createShufflePage();
    document.body.appendChild(startPage);
    document.body.appendChild(shufflePage);
    goToPage(0);
}
function createStartPage() {
    startPageDiv = document.createElement("div");
    startPageDiv.id = "startPage";
    let selectNumberText = document.createElement("div");
    selectNumberText.id = "selectNumberText";
    selectNumberText.innerText = "Players:";
    selectNumberElement = document.createElement("select");
    selectNumberElement.id = "selectNumberElement";
    for (let i = start; i <= end; i++) {
        const option = document.createElement('option');
        option.value = i.toString();
        option.textContent = i.toString();
        selectNumberElement.appendChild(option);
    }
    startPageDiv.appendChild(selectNumberText);
    startPageDiv.appendChild(selectNumberElement);
    let goButton = document.createElement("button");
    goButton.id = "goButton";
    goButton.innerText = "Go!";
    goButton.onclick = doShuffle;
    startPageDiv.appendChild(document.createElement("br"));
    startPageDiv.appendChild(goButton);
    return startPageDiv;
}
function createShufflePage() {
    shufflePageDiv = document.createElement("div");
    shufflePageDiv.id = "shufflePage";
    let startAgainButton = document.createElement("button");
    startAgainButton.id = "startAgainButton";
    startAgainButton.innerText = "< Start Again";
    startAgainButton.onclick = startOver;
    shufflePageDiv.appendChild(startAgainButton);
    let resultDiv = document.createElement("div");
    resultDiv.id = "result";
    let playerLetterLabelDiv = document.createElement("div");
    playerLetterLabelDiv.innerText = "Letter";
    playerLetterLabelDiv.className = "shuffleLabel";
    resultDiv.appendChild(playerLetterLabelDiv);
    playerLetterDiv = document.createElement("div");
    playerLetterDiv.id = "playerLetter";
    playerLetterDiv.innerText = "A";
    resultDiv.appendChild(playerLetterDiv);
    let playerNumberLabelDiv = document.createElement("div");
    playerNumberLabelDiv.innerText = "is player number";
    playerNumberLabelDiv.className = "shuffleLabel";
    resultDiv.appendChild(playerNumberLabelDiv);
    playerNumberDiv = document.createElement("div");
    playerNumberDiv.id = "playerNumber";
    playerNumberDiv.innerText = "0";
    resultDiv.appendChild(playerNumberDiv);
    shufflePageDiv.appendChild(resultDiv);
    let playerNavigationDiv = document.createElement("div");
    playerNavigationDiv.id = "playerNavigation";
    prevPlayerButton = document.createElement("button");
    prevPlayerButton.id = "prevPlayerButton";
    prevPlayerButton.className = "playerNavButton";
    prevPlayerButton.innerText = "<";
    prevPlayerButton.onclick = () => {
        curPlayer--;
        goToPlayer(curPlayer);
    };
    playerNavigationDiv.appendChild(prevPlayerButton);
    nextPlayerButton = document.createElement("button");
    nextPlayerButton.id = "nextPlayerButton";
    nextPlayerButton.className = "playerNavButton";
    nextPlayerButton.innerText = ">";
    nextPlayerButton.onclick = () => {
        curPlayer++;
        goToPlayer(curPlayer);
    };
    playerNavigationDiv.appendChild(nextPlayerButton);
    shufflePageDiv.appendChild(playerNavigationDiv);
    return shufflePageDiv;
}
function doShuffle() {
    numPlayers = parseInt(selectNumberElement.value);
    let neededAlphabet = fullAlphabet.substring(0, numPlayers);
    shuffledAlphabet = shuffleString(neededAlphabet);
    letterNumberMap = assignRandomPositions(numPlayers);
    console.log(letterNumberMap);
    curPlayer = 0;
    goToPlayer(curPlayer);
    goToPage(1);
}
function startOver() {
    goToPage(0);
}
function goToPage(whichPage) {
    if (whichPage == 0) {
        shufflePageDiv.style.display = "none";
        startPageDiv.style.display = "flex";
    }
    else {
        startPageDiv.style.display = "none";
        shufflePageDiv.style.display = "flex";
    }
}
function goToPlayer(player) {
    if (player >= shuffledAlphabet.length) {
        return;
    }
    // playerNumberDiv.innerText = (player + 1).toString();
    // playerLetterDiv.innerText = shuffledAlphabet[player];
    let _curPlayerLetter = getPlayerByIndex(letterNumberMap, player);
    console.log(_curPlayerLetter);
    if (_curPlayerLetter) {
        playerLetterDiv.innerText = fullAlphabet[player];
        playerNumberDiv.innerText = _curPlayerLetter.toString();
    }
    prevPlayerButton.disabled = (curPlayer <= 0);
    nextPlayerButton.disabled = (curPlayer >= (numPlayers - 1));
}
function shuffleString(input) {
    const arr = input.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
function assignRandomPositions(length) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    if (length > alphabet.length) {
        throw new Error(`Too many players! Max is ${alphabet.length}`);
    }
    const letters = alphabet.slice(0, length);
    const positions = [...Array(length).keys()].map(n => n + 1);
    for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]];
    }
    const result = {};
    letters.forEach((letter, index) => {
        result[letter] = positions[index];
    });
    return result;
}
function getPlayerByIndex(playerMap, index) {
    const letter = fullAlphabet[index];
    if (!letter)
        return undefined;
    return playerMap[letter];
}
export function StartCitzShuffle() {
    console.log("Starting CitzShuffle.");
    createDom();
}
