let Time = new Date();
let Hours;
let Minutes;
let Seconds
let AM_or_PM;
let OldTime;
let DisplaySeconds;

function googlebox() {
    window.location.href = "https://www.google.com/search?q=" + document.getElementById("SearchBox").value
}

function RefreshTime() {
Time = new Date();
Hours = Time.getHours();

if(Hours > 12) {
    Hours = Hours - 12;
    AM_or_PM = "PM";
} else if(Hours == 0) {
    Hours = 12
    AM_or_PM = "AM"
} else{
    AM_or_PM = "AM"
};

Minutes = Time.getMinutes();
if(Minutes < 10) {
    Minutes = "0" + Minutes.toString();
}

Seconds = Time.getSeconds();
if(Seconds < 10) {
    Seconds = "0" + Seconds.toString();
}

if(DisplaySeconds == "Yes") {
    FinishedTime = Hours.toString() + ":" + Minutes.toString()+ ":" + Seconds.toString() + " " + AM_or_PM.toString();
    document.getElementById("Clock").innerHTML = FinishedTime;
} else {
    window.FinishedTime = Hours.toString() + ":" + Minutes.toString()+ " " + AM_or_PM.toString();
}

if(FinishedTime !== OldTime) {
    document.getElementById("Clock").innerHTML = FinishedTime;
    OldTime = FinishedTime
};

};
RefreshTime();
Clock = setInterval(RefreshTime, 1000);

document.getElementById("Date").innerHTML = Time.toDateString();

function RemoveSeconds() {
    FinishedTime = Hours.toString() + ":" + Minutes.toString()+ " " + AM_or_PM.toString();
    document.getElementById("Clock").innerHTML = FinishedTime;
}

function Switch(SwitchTo) {
    if(SwitchTo == 'Short') {
        document.getElementById("Date").innerHTML = Time.toLocaleDateString();
        document.getElementById("Date").setAttribute("onclick", "Switch('Long')")
    } else if(SwitchTo == 'Long') {
        document.getElementById("Date").innerHTML = Time.toDateString();
        document.getElementById("Date").setAttribute("onclick", "Switch('Short')")
    };
}