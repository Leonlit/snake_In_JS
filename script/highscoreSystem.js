//storing scores so that the system could know whether player curret score is a new high records
//highScores and parsedJSON declared as global as I need to update their value while make use the current data structure they have
let scores = [],
    highScores = [],
    parsedJSON;

let scorePlace = document.getElementById("position"),
    homeBtn = document.getElementById("gameOverHome"),
    noticeText = document.getElementById("newHighText"),
    submitBtn = document.getElementById("gameOverSubmit"),
    gameOverMenu = document.getElementById("gameOverMenu"),
    restartBtn = document.getElementById("gameOverRestart"),
    newScoreCont = document.getElementById("newPlayerScore"),
    playerNameCont = document.getElementById("playerNameCont"),
    playerNameInput = document.getElementById("getPlayerName"),
    highScoreBoardBody = highScoreBoard.getElementsByTagName("tbody")[0];
    gameOverLeaderboard = document.getElementById("gameOverScoreTable").getElementsByTagName("tbody")[0];

//since I'll be rewriting the innerHTML of the table that means every data previously filled the table, will be 
//replaced, therefore we need to include them every time we rewrite the table.

/* 
    Demo of the JSON structure of the localStorage is:
    " {
        "highScore": [
            {name: "Leon", score: 12321, date: 1341343141},
            {name: "Leon2", score: 1221, date: 1321124341}
        ]
    } "
*/
function constructTableData (newHighPos) {
    let JSONData = localStorage.getItem("highScore");
    //incase there's no early data for the leaderboard
    if (JSONData != null) {
        scores = [];
        highScoreBoardBody.innerHTML = "";
        gameOverLeaderboard.innerHTML = "";
        parsedJSON = JSON.parse(JSONData);
        highScores = parsedJSON["highScores"];
        for (let i = 0; i< highScores.length;i++) {

            let currentRecord = highScores[i];
            //saving the scores in the array so that later can be used for checking new highScore
            scores.push(currentRecord["score"]);

            //seperate <tr> tag so that i could highlight the new records when user achieve a new highscore
            let tr = "<tr>";
            if (newHighPos != null && newHighPos != undefined && i == newHighPos) {
                tr = "<tr style='color:yellow;'>";
            }
            let element = `
                                <td>${i+1}</td>
                                <td>${currentRecord["name"]}</td>
                                <td>${currentRecord["score"]}</td>
                                <td>${formatCurrentTime(currentRecord["date"])}</td>
                           </tr>`;

            if (gameStatus != -1) highScoreBoardBody.innerHTML += (tr + element);
            else gameOverLeaderboard.innerHTML += (tr + element);
        }
    }
}

//formatting the time for display
function formatCurrentTime (date) {
    let dateObj = new Date(date),
        year = dateObj.getFullYear(),
        month = dateObj.getMonth() + 1,
        currDate = dateObj.getDate(),
        hour = dateObj.getHours(),
        minute = dateObj.getMinutes();
    return `${currDate}/${month}/${year} , ${hour}:${minute}`;
}

let newScore, scoreIndex;
//check if the player score is a new highScore
function checkIfHighScore (checkScore) {
    let isNewHigh = false
    scoreIndex = 0;
    newScore = checkScore;
    if (scores.length != 0) {
        //if the scores array is less than 10, means that there's still empty, thus add smallest score to lower place
        if (scores.length < 10) {
            scores.push(0);
        }
        //find the score that has lower score than the current one
        for (let i = 0; i< scores.length;i++) {
            if (scores[i] <= checkScore) {
                isNewHigh = true;
                scoreIndex = i;
                break;
            }
        }
    }else {
        isNewHigh = true;
        if (checkScore <=0) isNewHigh = false;
    }
    constructMenu(isNewHigh);
}

//constructing the game over menu by showing relevant info, such as placement and need of providing names
function constructMenu(newHigh) {
    gameOverMenu.className = "menus";
    submitBtn.style.display = "none";
    homeBtn.style.display = "block"
    scorePlace.style.display = "none";
    playerNameInput.style.display = "none"
    restartBtn.style.display = "block";
    noticeText.style.display = "none";
    newScoreCont.innerHTML = `Score :\t ${newScore}`;
    constructTableData();
    if (newHigh) {
        homeBtn.style.display = "none";
        restartBtn.style.display = "none";
        noticeText.style.display = "block";
        submitBtn.style.display = "block";
        scorePlace.innerHTML = `Position : \t ${scoreIndex + 1}`;
        scorePlace.style.display = "block";
        playerNameInput.style.display= "block"
    }
}

//saving the updated data to localstorage
function saveNewHighScore (playerName) {
    let dateObj = new Date(),
        currDate = dateObj.getTime(),
        newData = {name: playerName, score: newScore, date: currDate};
    //since the new score might replace certain places, then move the value backward
    for (let x = scores.length - 1; x > scoreIndex ;x--) {
        highScores[x] = highScores[x-1];
    }

    //delete the scores that has exceeded #10
    //first need to check the length of the highscore array
    //then if there's more than 10, delete the rest while don't touch the remaining scores
    if (highScores.length > 10) {
        highScores = highScores.slice(0, 10);
    }

    highScores[scoreIndex] = newData;
    localStorage.setItem("highScore", JSON.stringify({highScores: highScores}));
    //updating the table data
    constructTableData(scoreIndex);
}

//simple function to get the name of the player
function getPlayerName () {
    let playerName = playerNameInput.value;
    if (playerName === "") {
        alert("You must provide a name");
    }else {
        //merely filtering the input
        playerName = playerName.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        submitBtn.style.display = "none";
        homeBtn.style.display = "block";
        restartBtn.style.display = "block";
        playerNameInput.style.display = "none"
        saveNewHighScore(playerName);
    }
}

//can't use the original gameOver() function as need to hide the game over menu
function startGameAgain () {
    restartGame();
    gameOverMenu.className = "subMenu";
}