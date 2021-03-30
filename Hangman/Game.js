// Sets up vars for use later
OldWord = "" //Tracks old words to stop repeating already selected words
let Running // Defines Running, which prevents glitches
let Music = ["Rock", "Piano", "Jazz", "Sing", "Band", "Flute", "Trumpet", "Beat", "Music Sheet", "Microphone", "Quarter tone", "Bar", "Clef", "Drum", "Song", "Guitar", "Trombone", "Violin", "Clarinet", "Note"] //Defines Music category
let Travel = ["Bus", "Plane", "Car", "Map", "Compass", "Caravan", "Backpack", "Trailer", "Truck", "Boat", "Road", "Train", "Railroad", "Distance", "Destination", "Traffic", "Kilometers", "Meters", "Speedometer", "Arrival"] //Defines Travel category
let Sport = ["Tennis", "Soccer", "Swimming", "Running", "Netball", "Basketball", "Golf", "Cricket", "Cycling", "Fishing", "Sky Diving", "Bowling", "Archery", "Score", "Team", "Goal", "Spectator", "Athletics", "Snowboarding", "Volleyball"] //Devines Sport category
let Food = ["Apple", "Bacon", "Chicken", "Cheese", "Chocolate", "Burger", "Hash Browns", "Carrot", "Strawberry", "Grapes", "Oranges", "Vegetable", "Tomatoes", "Salmon", "Bread", "Fruit", "Pork", "Steak", "Sandwich", "Salad"] //Defines Food category
let Animals = ["Bird", "Whale", "Tiger", "Lion", "Jellyfish", "Elephant", "Platypus", "Fish", "Lizard", "Spider", "Snake", "Cheetah", "Emu", "Kangaroo", "Koala", "Eel", "Sheep", "Shark", "Dolphin", "Sea lion"] //Defines Animals category
let Random = ["Music", "Travel", "Sport", "Food", "Animals"] //Defines Random category, used to pick a random category
let Revealword = []; //Tracks changes made to the underscores
let lives = 10; //Tracks the amount of lives the user has left
let damage = "" // Defines dummy variable\ to be used for animation later
let username = window.prompt("Enter your username") // Asks the user to enter a username
if(username === "") {
    username = "NULL" //If the user does not enter a username, set the username to NULL
}
let highscore = 0 // Counts the score the user has, or the amount of times the user has guessed a word correctly
let leaderboards = JSON.parse(localStorage.getItem("Leaders")) || []; //Pulls the current leaderboard from a file stored in the pc
let OldArray = [] // Defines OldArray to be used in functions later
let Category //Defines category variable, used to pick what category to grab a random word from

function SelectWord() {
    Category = document.getElementById("words").value //Sets the category label to whatever category was chosen by the user
    if(Category == "Random") { //If Category is random do this
        Category = Random[Math.floor(Math.random() * Random.length)] //Set Category to a random string from the Random array 
        document.getElementById("DisplayCategory").innerHTML = "Random - " + Category //Changes the html element with the id of DisplayCategory to show Random and the Category that was randomly picked
    } else { //If Category is not equal to "Random" do this 
        document.getElementById("DisplayCategory").innerHTML = document.getElementById("words").value //Changes the html element with the id of DisplayCategory to show Random and the Category that the user has picked
    }
    document.getElementById("Dropdown").style.visibility = "hidden" //hides the Category selection box after the user has selected the category they want to play
    document.getElementById("DisplayCategory").style.visibility = "visible" //shows what category the word is from but does not allow the user to change the Category
    switch(Category) { //Defines a switch selector, this is a easier form of a if variable is equal to something, uses the variable Category, since this is choosing a word from one of the Categories
        case "Music": //If Category is equal to string Music do this
            if(Running != 1) {//If running does not equal 1 do this
            word = Music[Math.floor(Math.random() * Music.length)] //Choose a random word from the Music category and define it to word
            if(word === OldWord) { //If word is equal to OldWord do this
                SelectWord() //Call SelectWord again to randomise the word again
            } else {//Else
                OldWord = word //Make OldWord equal word, to prevent duplicate words in the future
                Running = 1 //Set Running to 1
            }
        }
        break; //End the Music switch case
        //These are the same as the Music switch case but for every other category
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
        break;

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
        break;

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
        break;

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
    return word //Once word has been decided return it to the function call
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

function UpdateTable() { //Declares UpdateTable function to update the displayed leaderboard
    document.getElementById("myTb").innerHTML = "" //Clears the currently displayed leaderboard
    var x = document.createElement("TB"); //Makes a new TableBody, for the leaderboard infomation
        x.setAttribute("id", "myTb"); //Sets the id of the new TableBody to "myTb"
        document.getElementById("LeaderboardPlayers").appendChild(x); //Adds the newly created TableBody to the table with the id of "LeaderboardPlayers"
    for(let i = 0; i < leaderboards.length; i++) { //Basic for loop loops through every entry in the leaderboard array

        
        var y = document.createElement("TR"); //Creates a variable to create a Table Row 
        y.setAttribute("id", "myTr" + i); //Sets the variable's id to "myTr[1-5], decides which number to put in front of myTb with the progress of the iteration"
        document.getElementById("myTb").appendChild(y); //Adds the variable to the previously created TableBody

        var z = document.createElement("TD"); //Creates a new variable to create Table Data
        var t = document.createTextNode(leaderboards[i]["username"]); //Creates a new variable to create text, pulls the text from the leaderboard username, uses i to index and select wich username to display
        z.appendChild(t); //Adds the newly created text data to the Table Data
        document.getElementById("myTr" + [i]).appendChild(z); //Adds the new Table Data to myTr[1-5], using i it matches username, score and placing to the correct place 

        var z = document.createElement("TD"); //Creates another variable to create more Table Data
        var t = document.createTextNode(leaderboards[i]["score"]); //Creates another variable to create more Text Data, using i to match the username and score to the correct place
        z.appendChild(t); //Adds Text Data to Table data again
        document.getElementById("myTr" + [i]).appendChild(z);  //Adds new Table Data to HTML table
    }
}

UpdateTable() //Calls function UpdateTable
function SetUp() {//Defines function SetUp, allows continuing of games, allowing for scoring
let Alphabet = ["A", "B", "C","D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];//Defines Alphabet array, includes the Alphabet
for(let i = 0; i < Alphabet.length; i++) { //Creates a for loop using i to count
  var x = document.createElement("BUTTON"); //Creates a HTML button and assigns it to x
  x.setAttribute("id", "button") //Changes the HTML button id to button
  x.setAttribute("class", "button" + Alphabet[i]) //Changes the HTML button class to button and the letter equal to the index of the loop progress, for example if the loop was at it's 5th iteration the button class would end up as "buttonE"
  x.setAttribute("onclick", "TestLetter(innerHTML)") //Sets the onclick event of the button to Call TestLetter and passes it's letter (done with innerHTML) to the function selector
  var t = document.createTextNode(Alphabet[i]); //Sets the text inside the button to Alphabet with the index of the progress through the loop, for example if the loop was at it's 5th iteration the button would end up as "E"
  x.appendChild(t); //Adds the text data to the button stored in x
  document.getElementById("keyboard").appendChild(x); //Adds the button data stored in x to the on-screen keyboard
}
document.getElementById("Image").src = "images/Hangman.png" //Resets the hangman image

SelectWord(); //Selects a new word

Revealword = []; //Resets the array used to handle the underscores
lives = 10; //Resets lives
DisplayWord = "" //Resets the word that is displayed to the user
let damage = "" //Resets the animation counter
for (underscores = 0; underscores < word.length; underscores++) {//Defines a for loop designed to handle the amount of underscores and spaces
    if(word[underscores] === " ") {//If the current value of the index of word[underscores] (the place the loop is currently at) is equal to a space, meaning that if there is a space in the character the loop is currently at, do this
        Revealword.push("&nbsp&nbsp&nbsp"); //Adds 3 non-breaking-spaces to the array (as one entry), array was chosen so it will not mess up the letter handling and non-breaking-spaces were chosen so they give a fair gap between each underscore for easy reading
    } else if(word[underscores + 1] === " ") { //If the character ahead of the current character is a space do this
        Revealword.push("_"); //Add one underscore to the Array
    } else {//If neither
        Revealword.push("_ "); //Add one underscore and one space to the array (as one entry)
    };
DisplayWord = Revealword.join(""); //Makes the array a string and assigns the string to DisplayWord, allowing it to be displayed to the user
document.getElementById('Letters').innerHTML = DisplayWord; //Displays DisplayWord to the user
}
document.getElementById('LifeCounter').innerHTML = "&#128154; " + lives + "/10"; //Sets up the life counter
}


function TestLetter(SelectedLetter) {//Defines TestLetter function using the variable SelectedLetter, given to it by the button, which calls this function and gives the variable innerHTML, which points to whatever the button displays
    clearTimeout(damage); //Reset the animation timer
    if(lives > 0) {//If lives is greater than 0 do this
        document.querySelector("button.button" + SelectedLetter).disabled = true; //Disables the button the user pressed
        document.querySelector("button.button" + SelectedLetter).style.opacity = "0.3"; //Greys out the button the user pressed
        if(word.toUpperCase().includes(SelectedLetter)) { //If the word converted to all uppercase includes the button the user pressed do this
            for(GuessI = 0; GuessI < word.length; GuessI++) { //Makes for loop for every character in word
                if(word[GuessI].toUpperCase() == SelectedLetter) { //If the letter selected matches the letter in the word
                    if(SelectedLetter == word[GuessI]) { //If the letter is a capital
                    Revealword[GuessI] = SelectedLetter; //Put the letter the user selected in the place of the array reveal word, due to array indexing this will be the same place the matching letter in word is
                    DisplayWord = Revealword.join(""); //Coverts Revealword to string and assign the string to Display word, with the new modifications
                    document.getElementById('Letters').innerHTML = DisplayWord; //Displays DisplayWord to the user
                } else { //If the correct guess does is not a capital letter
                    Revealword[GuessI] = SelectedLetter.toLowerCase(); //Adds the user selected letter to the correct place matching the loop progress, but this time converts the letter to lowercase
                    DisplayWord = Revealword.join(""); //Coverts Revealword to string and assigns the string to Display word, with the new modifications
                    document.getElementById('Letters').innerHTML = DisplayWord; //Displays DisplayWord to the user
                };
                };
            }
        } else { //If the user did not guess correctly
            lives = lives - 1; //Take 1 from lives
            document.getElementById("Image").src = "images/Hangman" + lives + ".png"; //Update picture to match lives
            document.getElementById('LifeCounter').innerHTML = "&#128148; " + lives + "/10"; //Update life counter to display remaining lives
            damage = setTimeout(function() { //Sets code to run after a certain time
                if(lives > 6) {//If lives is greater than 6
                    document.getElementById('LifeCounter').innerHTML = "&#128154;" + " " + lives + "/10"}/*Set the heart to a green heart and include lives left*/ else //If lives is not greater than 6
                if(lives > 3) {//If lives is greater than 3
                    document.getElementById('LifeCounter').innerHTML = "&#128155;" + " " + lives + "/10" } /*Set the heart to a yellow heart and include lives left*/ else //If lives is not greater than 4
                if(lives > 0) {
                    document.getElementById('LifeCounter').innerHTML = "&#10084;&#65039;" + " " + lives + "/10" }/*Set the heart to a red heart and include lives left*/}, 500) /*Sets the countdown to execute to 500ms*/;}
    };
    if(lives <= 0) {//If the user loses all lives
        document.getElementById("keyboard").innerHTML = "" //Remove the keyboard
        document.getElementById('Letters').innerHTML = word; //Reveal the word to the user, helps with spelling practice
        highscore = 0 //Clears the score
        if(highscore > 0) { //If the user's score is greater than 0
            UpdateScore() //Update the leaderboard
        }
        Running = 0 //Set Running to 0
        document.getElementById("Dropdown").style.visibility = "visible" //Display the category selector to the user
        document.getElementById("DisplayCategory").style.visibility = "hidden" //Remove the Category label
        document.getElementById("LifeCounter").innerHTML = "<button class=button id=ReplayButton onclick=SetUp()>TRY AGAIN</button>" //Replace lives with TRY AGAIN button, with the classes button and center, the ID ReplayButton and the onclick event to call the SetUp function
    };
    if(DisplayWord.includes("_") == false) { //If there are no more underscores
        document.getElementById("keyboard").innerHTML = "" //Remove the keyboard
        highscore += 1 //Add 1 to the score
        document.getElementById('score').innerHTML = "&#128293; " + highscore //Display the user's new score
        PushScore = { //Define array with user's username and score
            username: username,
            score: highscore
        }
        OldArray = Array.from(leaderboards) //make a backup of the old array
        UpdateScore(PushScore) //Update the leaderboard
        Running = 0 //Set running to 0
        document.getElementById("Dropdown").style.visibility = "visible" //Display the Category selector 
        document.getElementById("DisplayCategory").style.visibility = "hidden" //Removes the Category label
        document.getElementById("LifeCounter").innerHTML = "<button class=button center id=ReplayButton onclick=Continue()>CONTINUE</button>" //Replace lives with CONTINUE button, with the classes button and center, the ID ReplayButton and the onclick event to call the Continue function
    };
};
