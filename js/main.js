const HIDDEN_CLASS_NM = "hidden";
const clock = document.querySelector(".js-clock");
const loginForm = document.querySelector("#loginForm");
const myName = document.querySelector("#inputMyName");
const loginOK = document.querySelector("#loginOK");


function getTime(){
    const now = new Date();
    const hour = String(now.getHours()).padStart(2,"0");
    const min = String(now.getMinutes()).padStart(2,"0");
    const sec = String(now.getSeconds()).padStart(2,"0");
    
    clock.innerText =`${hour}:${min}:${sec}`;
}

function handleLogin(event){
    event.preventDefault();
    localStorage.setItem("id",myName.value);
    handleLoginCheck();
}

function handleLoginCheck(){
    const id = localStorage.getItem("id");
    if(id){
        loginForm.classList.add(HIDDEN_CLASS_NM);
        loginOK.classList.remove(HIDDEN_CLASS_NM);
        loginOK.innerText=`Hello ${id}.`;
    }
}

//시계시작
getTime();
setInterval(getTime, 1000);
//로그인체크
handleLoginCheck();
loginForm.addEventListener("submit", handleLogin);
//배경이미지 
const images = ["1.jpg", "2.jpg","4.jpg", "5.jpg", "8.jpg", "9.jpg","10.jpg"];
const chosenImage = images[Math.floor(Math.random() * images.length)];
document.body.style.backgroundImage = `url(img/${chosenImage})`;  


//날씨와 위치
const weather = document.querySelector("#weather span:first-child");
const city = document.querySelector("#weather span:last-child");
const API_KEY = "150b76ccd12f98527017c528bff588ba";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main} / ${data.main.temp}˚C`;
    });
}
function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
