const wsUri = "wss://ws.postman-echo.com/raw";

const output = document.getElementById("output");
const chat = document.getElementById("chat");
const btnSend = document.querySelector('.j-btn-send');
const btnGeo = document.querySelector('.j-btn-geolocation');
const status = document.querySelector('#status');
const mapLink = document.querySelector('#map-link');

let websocket;

function writeToScreen(message) {
  let pre = document.createElement("p");
  pre.innerHTML = message;
  output.appendChild(pre);
}

websocket = new WebSocket(wsUri);
websocket.onmessage = function(evt) {
    writeToScreen(
    '<span style="color: blue; ">Ответ: ' + evt.data+'</span>'
    );
};
websocket.onerror = function(evt) {
    writeToScreen(
      '<span style="color: red; ">Ошибка:</span> ' + evt.data
    );
};

btnSend.addEventListener('click', () => {
  let message = chat.value;
  writeToScreen("Отправлено: " + message);
  websocket.send(message);
});

// Обработчик Гео-локации
const error = () => {
    writeToScreen("Невозможно получить ваше местоположение");
}

const success = (position) => {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = 'Гео-локация';
}
  
btnGeo.addEventListener('click', () => {
    mapLink.href = '';
    mapLink.textContent = '';
    
    if (!navigator.geolocation) {
        writeToScreen("Geolocation не поддерживается вашим браузером");
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
});