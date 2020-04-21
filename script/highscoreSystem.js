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
    gameOverLeaderboard = document.getElementById("gameOverScoreTable");

let defaultTable = `<tr>
                        <td>No.</td>
                        <td>Name</td>
                        <td>Score</td>
                        <td>date, time</td>
                    </tr>`

function constructTableData (newHighPos) {
    let JSONData = localStorage.getItem("highScore");
    //incase there's no early data for the leaderboard
    if (JSONData != null) {
        gameOverLeaderboard.innerHTML = defaultTable;
        highScoreBoard.innerHTML = defaultTable;
        parsedJSON = JSON.parse(JSONData);
        highScores = parsedJSON["highScores"];
        console.log(parsedJSON);
        console.log(highScores)
        for (let i = 0; i< highScores.length;i++) {
            let currentRecord = highScores[i];
            scores[i] = currentRecord["score"];
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

            if (gameStatus != -1) highScoreBoard.innerHTML += (tr + element);
            else gameOverLeaderboard.innerHTML += (tr + element);
        }
        console.log(scores)
    }else {
        console.log("Records empty")
    }
}

function formatCurrentTime () {
    let dateObj = new Date(),
        year = dateObj.getFullYear(),
        month = dateObj.getMonth() + 1,
        day = dateObj.getDay(),
        hour = dateObj.getHours(),
        minute = dateObj.getMinutes();
    return `${day}/${month}/${year} , ${hour}:${minute}`;
}
let newScore, scoreIndex;

function checkIfHighScore (checkScore) {
    let isNewHigh = false
    scoreIndex = 0;
    newScore = checkScore;
    if (scores.length != 0) {
        if (scores.length < 10) {
            scores.push(0);
        }
        for (let i = 0; i< scores.length;i++) {
            if (scores[i] <= checkScore) {
                isNewHigh = true;
                scoreIndex = i;
                break;
            }
        }
    }else {
        isNewHigh = true;
        if (checkScore <=0) {
            isNewHigh = false;
        }
    }
    constructMenu(isNewHigh);
}

function constructMenu(newHigh) {
    shader.style.display = "block";
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

function saveNewHighScore (playerName) {
    let dateObj = new Date(),
        currDate = dateObj.getTime(),
        newData = {name: playerName, score: newScore, date: currDate};
        console.log(currDate)

    for (let x = scores.length - 1; x > scoreIndex ;x--) {
        highScores[x] = highScores[x-1];
    }

    highScores[scoreIndex] = newData;
    let json = {highScores: highScores}
    localStorage.setItem("highScore", JSON.stringify(json));

    //updating the table data
    constructTableData(scoreIndex);
}

function getPlayerName () {
    let playerName = playerNameInput.value;
    if (playerName === "") {
        alert("You must provide a name");
    }else {
        playerName = playerName.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        submitBtn.style.display = "none";
        homeBtn.style.display = "block";
        restartBtn.style.display = "block";
        playerNameInput.style.display = "none"
        saveNewHighScore(playerName);
    }
}

function startGameAgain () {
    restartGame();
    gameOverMenu.className = "subMenu";
}