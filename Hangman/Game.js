// Sets up vars for use later
OldWord = "" //Tracks old words to stop repeating already selected words
let Running
let Music = ["Rock", "Pop", "Jazz", "Sing", "Band"]
let Travel = ["Bus", "Plane", "Car", "Map", "Compass"]
let Sport = ["Tennis", "Soccer", "Swimming", "Running", "Netball", "Basketball", "Golf", "Cricket", ""]
let Food = ["Apple"]
let Animals = ["Bird"]
let Random = []
let Revealword = []; //Tracks changes made to the underscores
let lives = 6; //Tracks the amount of lives the user has left
let damage = "" // Defines dummy varible to be used for animation later
let PastLetters = [] // Defines an array to be added to when a user clicks a letter, to prevent them from clicking it again
let username = window.prompt("Enter your username") // Asks the user to enter a username (Fix later)
if(username === "") {
    username = "NULL" //If the user does not enter a username, set the username to NULL
}
let highscore = 0 // Counts the score the user has, or the amount of times the user has guessed a word correctly
let leaderboards = JSON.parse(localStorage.getItem("Leaders")) || []; //Pulls the current leaderboard from a file stored in the pc
let OldArray = [] // Defines OldArray to be used in functions later


function SelectWord() {
    Catagory = document.getElementById("words").value
    switch(Catagory) {
        case "Music":
            if(Running != 1) {
            word = Music[Math.floor(Math.random() * Music.length)]
            if(word === OldWord) {
                SelectWord()
            } else {
                OldWord = word
                Running = 1
            }
        }
            break;
        case "Travel":
            if(Running != 1) {
            word = Travel[Math.floor(Math.random() * Travel.length)]
            if(word === OldWord) {
                SelectWord()
            }   else {
                OldWord = word
                Running = 1
            }
        }
    }
    console.log()
    return word
}


function Continue() { // Defines continue function for use when the user wins the game
    leaderboards = OldArray // Removes changes to the leaderboard if the user clicks "Continue"
    SetUp() // Starts the game again
}

function UpdateScore(Placing /*Provides score infomation to allow the leaderboard to be updated*/) { //Defines a function to update the user's score and the leaderboard at the end of each game
    leaderboards.push(Placing) //Adds the user and the score to the leaderboard array
    leaderboards.sort((a, b) => b.score - a.score) //Sorts array from highest score to lowest score
    leaderboards.splice(5) //Removes any user that is not in the top 5 scores
    localStorage.setItem("Leaders", JSON.stringify(leaderboards)) //Creates a JSON file and stores leaderboard infomation, allows leaderboard to persist over multiple app reboots
    UpdateTable() //Tells the game to change the leaderboard infomation
}

function UpdateTable() {
    document.getElementById("myTb").innerHTML = "" //Clears the currently displayed leaderboard
    var x = document.createElement("TB"); //Makes a new TableBody, for the leaderboard infomation
        x.setAttribute("id", "myTb"); //Sets the id of the new TableBody to "myTb"
        document.getElementById("LeaderboardPlayers").appendChild(x); //Adds the newly created TableBody to the table with the id of "LeaderboardPlayers"
    for(let i = 0; i < leaderboards.length; i++) { //Basic for loop loops through every entry in the leaderboard array

        
        var y = document.createElement("TR"); //Creates a varrible to create a Table Row 
        y.setAttribute("id", "myTr" + [i] ); //Sets the varible's id to "myTr[1-5], decides which number to put infront of myTb with the progress of the iteration"
        document.getElementById("myTb").appendChild(y); //Adds the variable to the previously created TableBody

        var z = document.createElement("TD"); //Creates a new variable to create Table Data
        var t = document.createTextNode(leaderboards[i]["username"]); //Creates a new variable to create text, pulls the text from the leaderboard username, uses i to index and select wich username to display
        z.appendChild(t); //Adds the newly created text data to the Table Data
        document.getElementById("myTr" + [i]).appendChild(z); //Adds the new Table Data to myTr[1-5], using i it matches username, score and placing to the correct place 

        var z = document.createElement("TD"); //Creates another variable to create more Table Data
        var t = document.createTextNode(leaderboards[i]["score"]); //Creates another variable to create more Text Data, using i to match the username and score to the correct place
        z.appendChild(t); //Adds Text Data to Table data again
        document.getElementById("myTr" + [i]).appendChild(z); 
    }
}

UpdateTable()
function SetUp() {
PastLetters = []
document.getElementById("keyboard").style.visibility = "visible"
for(let KBS = 0; KBS < Alphabet.length; KBS++) {
    document.querySelector("button.button" + Alphabet[KBS]).style.opacity = "1";
}
SelectWord();
Revealword = [];
lives = 6;
DisplayWord = ""
let damage = ""
for (underscores = 0; underscores < word.length; underscores++) {
    if(word[underscores] === " ") {
        Revealword.push("&nbsp&nbsp&nbsp");
    } else if(word[underscores + 1] === " ") {
        Revealword.push("_");
    } else {
        Revealword.push("_ ");
    };
DisplayWord = Revealword.join("");
document.getElementById('Letters').innerHTML = DisplayWord;
}
document.getElementById('LifeCounter').innerHTML = "&#128154;" + " " + lives + "/6";
}


function TestLetter(SelectedLetter) {
    if(PastLetters.includes(SelectedLetter) !== true) {
    PastLetters.push(SelectedLetter)
    clearTimeout(damage);
    if(lives > 0) {

        document.querySelector("button.button" + SelectedLetter).style.opacity = "0.3";
        if(word.toUpperCase().includes(SelectedLetter)) {
            for(GuessI = 0; GuessI < word.length; GuessI++) {
                if(word[GuessI].toUpperCase() == SelectedLetter) {
                    if(SelectedLetter == word[GuessI]) {
                    Revealword[GuessI] = SelectedLetter;
                    DisplayWord = Revealword.join("");
                    document.getElementById('Letters').innerHTML = DisplayWord;
                } else {
                    Revealword[GuessI] = SelectedLetter.toLowerCase();
                    DisplayWord = Revealword.join("");
                    document.getElementById('Letters').innerHTML = DisplayWord;
                };
                };
            }
        } else {
            lives = lives - 1;
            document.getElementById('LifeCounter').innerHTML = "&#128148;" + " " + lives + "/6";
            damage = setTimeout(function() {
                if(lives > 4) {
                    document.getElementById('LifeCounter').innerHTML = "&#128154;" + " " + lives + "/6"} else 
                if(lives > 2) {
                    document.getElementById('LifeCounter').innerHTML = "&#128155;" + " " + lives + "/6" } else
                if(lives > 0) {
                    document.getElementById('LifeCounter').innerHTML = "&#10084;&#65039;" + " " + lives + "/6" }}, 500);}
    };
    if(lives <= 0) {
        document.getElementById("keyboard").style.visibility = "hidden"
        document.getElementById('Letters').innerHTML = word;
        highscore = 0
        console.log("lose")
        if(highscore > 0) {
            UpdateScore()
        }
        Running = 0
        document.getElementById("LifeCounter").innerHTML = "<button class=button id=ReplayButton onclick=SetUp()>TRY AGAIN</button>" 
    };
    if(DisplayWord.indexOf("_") == -1) {
        document.getElementById("keyboard").style.visibility = "hidden";
        highscore += 1
        document.getElementById('score').innerHTML = "&#128293; " + highscore
        PushScore = {
            username: username,
            score: highscore
        }
        OldArray = Array.from(leaderboards)
        UpdateScore(PushScore)
        Running = 0
        document.getElementById("LifeCounter").innerHTML = "<button class=button center id=ReplayButton onclick=Continue()>CONTINUE</button>" 
    };
}
};
