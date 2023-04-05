import playList from './playList.js';

const time = document.querySelector('.time');
const dateHtml = document.querySelector('.date');
const timeOfDayDocument = document.querySelector('.greeting');
const name = document.querySelector('.name');
const body = document.querySelector('.body');
const slidePrew = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');
let randomNum;
let bgNum = getRandomNum(10, 20);
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const playBtn = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
const audio = new Audio();
let isPlay = false;
const playNum = 0;

// time display function
function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    showDate();
    getTimeOfDay();
    setTimeout(showTime, 1000);

    time.textContent = currentTime;
}
// date display function
function showDate() {
    const date = new Date();
    const options = {
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
    };
    const currentDate = date.toLocaleDateString('en-US', options);

    dateHtml.textContent = currentDate;
}

// The function returns the time of day 
// (Morning, Afternoon, Evening, Night) depending on the current time in the clock
function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    const goodString = 'Good';

    if (hours >= 5 && hours < 12) {
        timeOfDayDocument.textContent = `${goodString} morning,`;
    } else if (hours >= 12 && hours < 18) {
        timeOfDayDocument.textContent = `${goodString} afternoon,`;
    } else if (hours >= 18 && hours < 21) {
        timeOfDayDocument.textContent = `${goodString} evening,`;
    } else if (hours >= 21 || hours < 5) {
        timeOfDayDocument.textContent = `${goodString} night,`;
    }
}

// Preservation of data before rebooting or closing the page (Beforeunload event)
function setLocalStorage() {
    localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage);

// Restoring and displaying data before loading the page (Load event)
function getLocalStorage() {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage);

// Returns a random number
function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

// a function that changes the background image depending on the time of day
function setBg() {
    const date = new Date();
    let timeOfDay = date.getHours();


    if (timeOfDay >= 5 && timeOfDay < 12) {
        body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/morning/${bgNum}.jpg')`;
    } else if (timeOfDay >= 12 && timeOfDay < 18) {
        body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/afternoon/${bgNum}.jpg')`;
    } else if (timeOfDay >= 18 && timeOfDay < 21) {
        body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/${bgNum}.jpg')`;
    } else if (timeOfDay >= 21 || timeOfDay < 5) {
        body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/night/${bgNum}.jpg')`;
    }
}

// Functions for arrows located on the sides of the screen so that you can scroll through images

// functions that either decrease the randomNum variable or increase it to change pictures
function getSlidePrev() {
    randomNum = bgNum - 1;
    console.log('Prew');
    console.log(randomNum);
}

function getSlideNext() {
    randomNum = bgNum + 1;
    console.log(randomNum);
    console.log('Next');
}

slidePrew.addEventListener('click', getSlidePrev);
slideNext.addEventListener('click', getSlideNext);

// Weather API
// An asynchronous function that receives weather information.
async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=71585ff0069ddea4fba09fbd351aa4d7&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
}

city.addEventListener('change', getWeather);
document.addEventListener('DOMContentLoaded', getWeather);

// Function to display quote of the day
// async function getQuotes() {
//     const quotes = './data.json';
//     const res = await fetch(quotes);
//     const data = await res.json();
//     console.log(data);
// }

// Function to enable and disable the audio player
function playPauseAudio() {
    audio.src = '../assets/sounds/Aqua Caelestis.mp3';
    audio.currentTime = 0;
    if (isPlay === false) {
        isPlay = true;
        audio.play();
    } else if (isPlay === true) {
        isPlay = false;
        audio.pause();
    }
}
playBtn.addEventListener('click', playPauseAudio);

// A function that switches classes for buttons
function toggleBtn() {
    playBtn.classList.toggle('pause');
}
function toggleBtnNextPrev() {
    if (isPlay === false) {
        playBtn.classList.add('pause');
        playBtn.classList.add('pause');
    }
}
playBtn.addEventListener('click', toggleBtn);
playPrevBtn.addEventListener('click', toggleBtnNextPrev);
playNextBtn.addEventListener('click', toggleBtnNextPrev);

// Track scrolling function

function playAudio() {
    audio.src = '../assets/sounds/Aqua Caelestis.mp3';
    audio.currentTime = 0;
    audio.play();
}
function playNext() {
    let next = playNum + 1;
    playAudio();
}
function playPrev() {
    let prev = playNum - 1;
    playAudio();
}
playPrevBtn.addEventListener('click', playPrev());
playNextBtn.addEventListener('click', playNext());

// Function calls
showTime();
getTimeOfDay();
setBg();
getWeather();
// getQuotes();