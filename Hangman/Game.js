// Sets up vars for use later
OldWord = "" //Tracks old words to stop repeating already selected words
let Running
let Music = ["Rock", "Piano", "Jazz", "Sing", "Band", "Flute", "Trumpet", "Beat", "Music Sheet", "Microphone", "Quarter tone", "Bar", "Clef", "Drum", "Song", "Guitar", "Trumbone", "Violin", "Clarinet", "Note"]
let Travel = ["Bus", "Plane", "Car", "Map", "Compass", "Caravan", "Backpack", "Trailer", "Truck", "Boat", "Road", "Train", "Railroad", "Distance", "Destination", "Traffic", "Kilometers", "Meters", "Speedometer", "Arrival"]
let Sport = ["Tennis", "Soccer", "Swimming", "Running", "Netball", "Basketball", "Golf", "Cricket", "Cycling", "Fishing", "Sky Diving", "Bowling", "Archery", "Score", "Team", "Goal", "Spectator", "Athletics", "Snowboarding", "Volleyball"]
let Food = ["Apple", "Bacon", "Chicken", "Cheese", "Chocolate", "Burger", "Hash Browns", "Carrot", "Strawberry", "Grapes", "Oranges", "Vegetable", "Tomatoes", "Salmon", "Bread", "Fruit", "Pork", "Steak", "Sandwich", "Salad"]
let Animals = ["Bird", "Whale", "Tiger", "Lion", "Jellyfish", "Elephant", "Platypus", "Fish", "Lizard", "Spider", "Snake", "Cheetah", "Emu", "Kangaroo", "Koala", "Eel", "Sheep", "Shark", "Dolphin", "Sea lion"]
let Random = ["Music", "Travel", "Sport", "Food", "Animals"]
let Revealword = []; //Tracks changes made to the underscores
let lives = 10; //Tracks the amount of lives the user has left
let damage = "" // Defines dummy varible to be used for animation later
let PastLetters = [] // Defines an array to be added to when a user clicks a letter, to prevent them from clicking it again
let username = window.prompt("Enter your username") // Asks the user to enter a username (Fix later)
if(username === "") {
    username = "NULL" //If the user does not enter a username, set the username to NULL
}
let highscore = 0 // Counts the score the user has, or the amount of times the user has guessed a word correctly
let leaderboards = JSON.parse(localStorage.getItem("Leaders")) || []; //Pulls the current leaderboard from a file stored in the pc
let OldArray = [] // Defines OldArray to be used in functions later
let Category

function SelectWord() {
    Category = document.getElementById("words").value
    if(Category == "Random") {
        Category = Random[Math.floor(Math.random() * Random.length)]
        console.log(Category)
        document.getElementById("DisplayCategory").innerHTML = "Random - " + Category
    } else {
        document.getElementById("DisplayCategory").innerHTML = document.getElementById("words").value
    }
    document.getElementById("Dropdown").style.visibility = "hidden"
    document.getElementById("DisplayCategory").style.visibility = "visible"
    switch(Category) {
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

        case "Sport":
            if(Running != 1) {
                word = Sport[Math.floor(Math.random() * Sport.length)]
                if(word === OldWord) {
                    SelectWord()
                }   else {
                    OldWord = word
                    Running = 1
                }
            }
            
        case "Food":
            if(Running != 1) {
                word = Food[Math.floor(Math.random() * Food.length)]
                if(word === OldWord) {
                    SelectWord()
                }   else {
                    OldWord = word
                    Running = 1
                }
            }

        case "Animals":
            if(Running != 1) {
                word = Animals[Math.floor(Math.random() * Animals.length)]
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
let Alphabet = ["A", "B", "C","D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
for(let i = 0; i < Alphabet.length; i++) {
    document.getElementById('keyboard').innerHTML += '<button' + ' class=button' + Alphabet[i] + ' id="button" onclick="TestLetter(innerHTML)" >' + Alphabet[i] + '</button>'
}
document.getElementById("Image").src = "images/Hangman.png"
PastLetters = []

SelectWord();

Revealword = [];
lives = 10;
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
document.getElementById('LifeCounter').innerHTML = "&#128154;" + " " + lives + "/10";
}


function TestLetter(SelectedLetter) {
    if(PastLetters.includes(SelectedLetter) == false) {
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
            document.getElementById("Image").src = "images/Hangman" + lives + ".png";
            document.getElementById('LifeCounter').innerHTML = "&#128148;" + " " + lives + "/10";
            damage = setTimeout(function() {
                if(lives > 6) {
                    document.getElementById('LifeCounter').innerHTML = "&#128154;" + " " + lives + "/10"} else 
                if(lives > 3) {
                    document.getElementById('LifeCounter').innerHTML = "&#128155;" + " " + lives + "/10" } else
                if(lives > 0) {
                    document.getElementById('LifeCounter').innerHTML = "&#10084;&#65039;" + " " + lives + "/10" }}, 500);}
    };
    if(lives <= 0) {
        document.getElementById("keyboard").innerHTML = ""
        document.getElementById('Letters').innerHTML = word;
        highscore = 0
        if(highscore > 0) {
            UpdateScore()
        }
        Running = 0
        document.getElementById("Dropdown").style.visibility = "visible"
        document.getElementById("DisplayCategory").style.visibility = "hidden"
        document.getElementById("LifeCounter").innerHTML = "<button class=button id=ReplayButton onclick=SetUp()>TRY AGAIN</button>" 
    };
    if(DisplayWord.indexOf("_") == -1) {
        document.getElementById("keyboard").innerHTML = ""
        highscore += 1
        document.getElementById('score').innerHTML = "&#128293; " + highscore
        PushScore = {
            username: username,
            score: highscore
        }
        OldArray = Array.from(leaderboards)
        UpdateScore(PushScore)
        Running = 0
        document.getElementById("Dropdown").style.visibility = "visible"
        document.getElementById("DisplayCategory").style.visibility = "hidden"
        document.getElementById("LifeCounter").innerHTML = "<button class=button center id=ReplayButton onclick=Continue()>CONTINUE</button>" 
    };
}
};
