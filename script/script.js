

const pole = document.querySelector('.container'),
  btn = document.querySelector('.btnStart'),
  btnSt = document.querySelector('.btnStop'),
  lZmei = document.querySelector('.zmi'),
  gameOver = document.querySelector('.over'),
  records = document.querySelector('.tabRec'),
  inPut = document.querySelector('#enter'),
  heder = document.querySelector('.header'),
  info = document.querySelector('#information'),
  windOws = document.querySelector('#win'),
  rus = document.querySelector('#ru'),
  usa = document.querySelector('#us'),
  m_rus = document.querySelector('#m_ru'),
  m_usa = document.querySelector('#m_us'),
  ochi = document.querySelector('.ochKi'),
  mobBtn = document.querySelector('#block_btn'),
  mobLeft = document.querySelector('#mBot1'),
  mobRight = document.querySelector('#mBot3'),
  mobUp = document.querySelector('#mBot4'),
  mobDown = document.querySelector('#mBot2'),
  mobMenu = document.querySelector('.mob_menu'),
  mobRec = document.querySelector('.record_mob'),
  leftBlock = document.querySelector('.left'),
  subMenu = document.querySelector('.sub_mobMenu'),
  mInfo = document.querySelector('#m_info'),
  mRec = document.querySelector('#m_rec'),
  hidBody = document.querySelector('.telo'),
  shadow = document.querySelector('.shadow'),
  rightBlock = document.querySelector('.right');


records.rows[0].style.background = 'rgba(190, 180, 147, 0.66)';

let time,
  mobVersion = 0,
  gameSpeed = 0,
  posMass,
  foo,
  forSnake,
  lengthSnake,//? длина змеи
  flag,
  gameScore,
  posCol,
  ru_us = 'us',
  posRow,
  btnFlag = 0,
  mobileRecord = '',
  widthWindow;//? по сути, ширина экрана
let scoreGame = [];

//! Оперделение типа устройства
const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows());
  }
};

if (isMobile.any()) {
  mobBtn.classList.remove('noVisible');
}
else {
  mobBtn.classList.add('noVisible');
}

scoreGame = localStorage.getItem('result');
if (scoreGame) {
  scoreGame = JSON.parse(scoreGame);
  moving();
} else scoreGame = [];

//? функция случайных чисел
function randOm(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

let posX = heder.offsetWidth;
if (posX <= 425) {
  let w = posX / 2;
  posX = w - 125;
  windOws.style.left = posX + 'px';
}
else
  windOws.style.left = posX - 250 + 'px';



//? переключение языка
rus.addEventListener('click', () => {
  ru_us = 'ru';
  switchLanguage();
  m_rus.checked = 'true';
});
m_rus.addEventListener('click', () => {
  ru_us = 'ru';
  switchLanguage();
  rus.checked = 'true';
});
usa.addEventListener('click', () => {
  ru_us = 'us';
  switchLanguage();
  m_usa.checked = 'true';
});
m_usa.addEventListener('click', () => {
  ru_us = 'us';
  switchLanguage();
  usa.checked = 'true';
});

//! слушатель изменения экрана
start();
window.onresize = start;
function start() {
  widthWindow = document.documentElement.clientWidth;
  resazeWindow();
}

windOws.classList.add('wind_info');
//* клик по инфо окну для скрытия
windOws.onclick = () => {
  windOws.classList.toggle('wind_info_active');
  if (widthWindow <= 425)
    shadow.classList.toggle('shadow_on');
}

//? массив для div-ов (поле)
const massiv = [];
for (let i = 0; i < 20; i++) {
  massiv.push([0]);
  for (let p = 0; p < 20; p++) {
    massiv[i][p] = 0;
  }
}
//? заполнение поля пустыми эл-ми
for (let i = 0; i < 20; i++) {
  for (let j = 0; j < 20; j++) {
    let dive = document.createElement('div');
    dive.classList.add('kub');
    massiv[i][j] = pole.appendChild(dive);
  }
}

function startRestart() {
  forSnake = [];
  lengthSnake = 3;
  flag = 1;
  gameSpeed = 0;
  gameScore = 0;
  posCol = 2;
  posRow = 10;
  posMass = [
    [10, 1],
    [10, 0],
    [10, 0],
  ]
}
//* гамбургер и субменю
mobMenu.addEventListener('click', mobileMenu);

//! меню бургер
function mobileMenu() {
  mobMenu.classList.toggle('_active');
  subMenu.classList.toggle('sub_active');
}

//? очистка поля
function divClear() {
  let div_i = document.querySelectorAll('.kub');
  for (let item of div_i) {
    item.classList.remove('kub_activ');
    item.classList.remove('food');
  }
}

//? кнопка инфо
info.addEventListener('click', infoWindow);

mInfo.addEventListener('click', () => {
  shadow.classList.toggle('shadow_on');
  infoWindow();
  mobileMenu();
})

//? кнопка таблица мибильная
mRec.addEventListener('click', openMobTable)
function openMobTable() {
  document.querySelector('.right').classList.toggle('right_active');
  shadow.classList.toggle('shadow_on');
  mobileMenu();
}

//? клик по таблице для скрытия
document.querySelector('.right').onclick = closeMobTable;
function closeMobTable() {
  document.querySelector('.right').classList.toggle('right_active');
  shadow.classList.toggle('shadow_on');
}

btn.addEventListener('click', () => { //? старт
  gameOver.classList.remove('over_active');
  hidBody.classList.add('hiden');
  btnFlag = 0;
  btnSt.innerHTML = lang['stop'][ru_us];
  divClear();
  startRestart();
  bodySnake();
  foods();
  lZmei.innerHTML = lengthSnake;
  ochi.innerHTML = gameScore;
  clearInterval(time);
  time = setInterval(frame, 330);
  frame();
})


btnSt.addEventListener('click', () => { //? стоп
  if (btnFlag == 0) {
    clearInterval(time);
    btnFlag = 1;
    btnSt.innerHTML = lang['continue'][ru_us];
    hidBody.classList.remove('hiden');
  } else {
    btnFlag = 0;
    time = setInterval(frame, 330 - gameSpeed);
    btnSt.innerHTML = lang['stop'][ru_us];
    frame();
    hidBody.classList.add('hiden');
  }

})


//? смена класса у div-ов
//! Проверка на конец игры
function resetClass(flagSet, pos_1, pos_2) {

  let x;
  let y;
  if (flagSet == 1) {
    posRow += pos_1;
    posCol += pos_2;
  }
  else {
    posRow -= pos_1;
    posCol -= pos_2;
  }
  x = posMass[posMass.length - 1][0];
  y = posMass[posMass.length - 1][1];
  hedSnake = massiv[x][y];
  hedSnake.classList.remove('kub_activ');

  if (scanBody(posRow, posCol)) {
    clearInterval(time);
    gameOver.classList.add('over_active');
    results();
    document.querySelector('.right').classList.toggle('right_active');
    shadow.classList.toggle('shadow_on');
    setTimeout(closeMobTable, 2300);
    return;
  }
  //! проверка на захват еды
  if (forSnake[0] == posRow && forSnake[1] == posCol) {
    foo.classList.remove('food');
    lengthSnake++;
    gameScore += 5;
    lZmei.innerHTML = lengthSnake;
    ochi.innerHTML = gameScore;
    upSpeed(gameScore);
    foods();
  }
  bodySnake();
}

//? Увеличение скорости относительно очков
//? через каждые 100
function upSpeed(scor) {
  if ((scor % 100) == 0) {
    clearInterval(time);
    gameSpeed += 50;
    time = setInterval(frame, 330 - gameSpeed);
  }
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

