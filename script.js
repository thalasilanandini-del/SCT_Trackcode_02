
const display = document.getElementById("display");

const startBtn = document.getElementById("startBtn");

const pauseBtn = document.getElementById("pauseBtn");

const resetBtn = document.getElementById("resetBtn");

const lapBtn = document.getElementById("lapBtn");

const lapsContainer = document.getElementById("lapsContainer");

const statusText = document.getElementById("statusText");

const statusDot = document.querySelector(".status-dot");


// Stopwatch variables

let startTime = 0;

let elapsedTime = 0;

let timerId = null;

let isRunning = false;

let lapCount = 0;

let lastLapTime = 0;


// Format time

function formatTime(time) {

    const hours = Math.floor(time / 3600000);

    const minutes = Math.floor(
        (time % 3600000) / 60000
    );

    const seconds = Math.floor(
        (time % 60000) / 1000
    );

    const centiseconds = Math.floor(
        (time % 1000) / 10
    );


    return (

        String(hours).padStart(2, "0") + ":" +

        String(minutes).padStart(2, "0") + ":" +

        String(seconds).padStart(2, "0") + "." +

        String(centiseconds).padStart(2, "0")

    );

}


// Update display

function updateDisplay() {

    const currentTime = isRunning

        ? elapsedTime + (performance.now() - startTime)

        : elapsedTime;

    display.textContent = formatTime(currentTime);

}


// Start stopwatch

function startStopwatch() {

    if (isRunning) {

        return;

    }

    startTime = performance.now();

    isRunning = true;

    timerId = setInterval(updateDisplay, 10);


    startBtn.disabled = true;

    pauseBtn.disabled = false;

    lapBtn.disabled = false;

    statusText.textContent = "Stopwatch running";

    statusDot.style.background = "#27c7b8";

}


// Pause stopwatch

function pauseStopwatch() {

    if (!isRunning) {

        return;

    }


    elapsedTime += performance.now() - startTime;

    isRunning = false;


    clearInterval(timerId);

    timerId = null;


    updateDisplay();


    startBtn.disabled = false;

    pauseBtn.disabled = true;

    lapBtn.disabled = true;

    statusText.textContent = "Paused";

    statusDot.style.background = "#f4b942";

}


// Reset stopwatch

function resetStopwatch() {

    clearInterval(timerId);

    timerId = null;


    startTime = 0;

    elapsedTime = 0;

    isRunning = false;

    lapCount = 0;

    lastLapTime = 0;


    display.textContent = "00:00:00.00";


    startBtn.disabled = false;

    pauseBtn.disabled = true;

    lapBtn.disabled = true;


    statusText.textContent = "Ready to start";

    statusDot.style.background = "#64748b";


    lapsContainer.innerHTML = `

        <p class="empty-message">

            Your lap times will appear here.

        </p>

    `;

}


// Record lap

function recordLap() {

    if (!isRunning) {

        return;

    }


    const currentTime =

        elapsedTime + (performance.now() - startTime);


    const lapTime = currentTime - lastLapTime;

    lastLapTime = currentTime;

    lapCount++;


    // Remove empty message

    const emptyMessage =

        lapsContainer.querySelector(".empty-message");

    if (emptyMessage) {

        emptyMessage.remove();

    }


    const lapRow = document.createElement("div");

    lapRow.className = "lap-row";


    lapRow.innerHTML = `

        <span class="lap-number">

            Lap ${lapCount}

        </span>

        <span class="lap-time">

            ${formatTime(lapTime)}

        </span>

    `;


    lapsContainer.prepend(lapRow);

}


// Button events

startBtn.addEventListener(

    "click",

    startStopwatch

);

pauseBtn.addEventListener(

    "click",

    pauseStopwatch

);

resetBtn.addEventListener(

    "click",

    resetStopwatch

);

lapBtn.addEventListener(

    "click",

    recordLap

);