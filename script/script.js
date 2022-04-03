

const pole = document.querySelector('.container'),
  btn = document.querySelector('.btnStart'),
  btnSt = document.querySelector('.btnStop'),
  btnCont = document.querySelector('.btnCont'),
  lZmei = document.querySelector('.zmi'),
  gameOver = document.querySelector('.over'),
  records = document.querySelector('.tabRec'),
  inPut = document.querySelector('#enter'),
  heder = document.querySelector('.header'),
  info = document.querySelector('#information'),
  windOws = document.querySelector('#win'),
  rus = document.querySelector('#ru'),
  usa = document.querySelector('#us'),
  ochi = document.querySelector('.ochKi'),
  mobBtn = document.querySelector('#block_btn'),
  leftBlock = document.querySelector('.left'),
  rightBlock = document.querySelector('.right');


records.rows[0].style.background = 'rgba(190, 180, 147, 0.66)';

let time,
  posMass,
  foo,
  forSnake,
  legthSnake,//? длина змеи
  flag,
  gameScore,
  posCol,
  ru_us,
  posRow,
  widthWindow;//? по сути, ширина экрана
let scoreGame = [];

//? функция случайных чисел
function randOm(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//? переключение языка
rus.addEventListener('click', () => {
  ru_us = 'ru';
  switchLanguage();
});
usa.addEventListener('click', () => {
  ru_us = 'us';
  switchLanguage();
});

//! слушатель изменения экрана
start();
window.onresize = start;
function start() {
  widthWindow = document.documentElement.clientWidth;
  resazeWindow();
}

windOws.classList.add('wind_info');

//? массив для div-ов
const massiv = [];
for (let i = 0; i < 20; i++) {
  massiv.push([0]);
  for (let p = 0; p < 20; p++) {
    massiv[i][p] = 0;
  }
}

for (let i = 0; i < 20; i++) {
  for (let j = 0; j < 20; j++) {
    let dive = document.createElement('div');
    dive.classList.add('kub');
    massiv[i][j] = pole.appendChild(dive);
  }
}

function startRestart() {
  forSnake = [];
  legthSnake = 3;
  flag = 1;
  gameScore = 0;
  posCol = 2;
  posRow = 10;
  posMass = [
    [10, 1],
    [10, 0],
    [10, 0],
  ]
}


function divClear() {
  let div_i = document.querySelectorAll('.kub');
  for (let item of div_i) {
    item.classList.remove('kub_activ');
    item.classList.remove('food');
  }
}

//? кнопка инфо
info.addEventListener('click', () => {
  windOws.classList.toggle('wind_info_active');
  let posX = heder.offsetWidth;
  windOws.style.left = posX - 250 + 'px';
});


btn.addEventListener('click', () => { //? старт
  gameOver.classList.remove('over_active');
  divClear();
  startRestart();
  bodySnake();
  foods();
  lZmei.innerHTML = legthSnake;
  ochi.innerHTML = gameScore;
  clearInterval(time);
  time = setInterval(frame, 330);
  frame();
})


btnCont.addEventListener('click', () => { //? продолжить
  time = setInterval(frame, 330);
  frame();
})

btnSt.addEventListener('click', () => { //? стоп
  clearInterval(time);
})


//? смена класса у div-ов
function resetClass(flagSet, pos_1, pos_2) {

  if (flagSet == 1) {
    posRow += pos_1;
    posCol += pos_2;
  }
  else {
    posRow -= pos_1;
    posCol -= pos_2;
  }
  let x = posMass[posMass.length - 1][0];
  let y = posMass[posMass.length - 1][1];
  hedSnake = massiv[x][y];
  hedSnake.classList.remove('kub_activ');

  if (scanBody(posRow, posCol)) {
    clearInterval(time);
    gameOver.classList.add('over_active');
    results();
    return;
  }

  //! проверка на захват еды
  if (forSnake[0] == posRow && forSnake[1] == posCol) {
    foo.classList.remove('food');
    legthSnake++;
    gameScore += 5;
    lZmei.innerHTML = legthSnake;
    ochi.innerHTML = gameScore;
    foods();
  }
  bodySnake();

}

//? сканирование клавиш, "стрелок"
document.onkeydown = function (event) {
  if (event.key == 'ArrowLeft') {
    if (flag != 1) {
      flag = 3;
    } else return;
  }
  if (event.key == 'ArrowRight') {
    if (flag != 3) {
      flag = 1;
    } else return;
  }

  if (event.key == 'ArrowUp') {
    if (flag != 2) {
      flag = 4;
    } else return;
  }

  if (event.key == 'ArrowDown') {
    if (flag != 4) {
      flag = 2;
    } else return;
  }
}

