
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

function switchLanguage() {
  document.querySelector('.titleH2').innerHTML = lang['title'][ru_us];
  document.querySelector('.lenSnake').innerHTML = lang['length'][ru_us];
  document.querySelector('.resUlt').innerHTML = lang['result'][ru_us];
  document.querySelector('#information').innerHTML = lang['info'][ru_us];
  document.querySelector('.btnStart').innerHTML = lang['btStart'][ru_us];
  document.querySelector('.btnCont').innerHTML = lang['continue'][ru_us];
  document.querySelector('.btnStop').innerHTML = lang['stop'][ru_us];
  document.querySelector('.gamOv').innerHTML = lang['over'][ru_us];
  document.querySelector('.rec').innerHTML = lang['records'][ru_us];
  document.querySelector('.namTab').innerHTML = lang['tablName'][ru_us];
  document.querySelector('.lenTab').innerHTML = lang['tablLen'][ru_us];
  document.querySelector('.scTab').innerHTML = lang['tablScore'][ru_us];
  document.querySelector('.infoTit').innerHTML = lang['titlInfo'][ru_us];
  document.querySelector('.paragraf').innerHTML = lang['textInfo'][ru_us];
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

//! рождение и рост змеи
function bodySnake() {
  if (legthSnake > posMass.length) posMass.push([0, 0]);
  let moveData = [];
  for (let i = posMass.length - 1; i > 0; i--) {
    moveData[i] = posMass[i - 1];
    posMass[i] = moveData[i];
  }
  posMass[0] = [posRow, posCol];
  let x, y;
  for (let n = posMass.length - 1; n >= 0; n--) {
    y = posMass[n][0];
    x = posMass[n][1];
    hedSnake = massiv[y][x];
    hedSnake.classList.add('kub_activ');
  }
}


function foods() {
  let m = randOm(0, 19);
  let n = randOm(0, 19);

  if (scanBody(m, n)) {
    foods();
  } else {
    foo = massiv[m][n];
    foo.classList.add('food');
    forSnake = [m, n];
  }
}

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

//? фун-я направления движения,
//? в зависимости от нажатой клавиши
function frame() {
  switch (flag) {
    case 1:
      if (posCol == 19) posCol = -1;
      resetClass(1, 0, 1);
      break;
    case 2:
      if (posRow == 19) posRow = -1;
      resetClass(1, 1, 0);
      break;
    case 3:
      if (posCol == 0) posCol = 20;
      resetClass(0, 0, 1);
      break;
    case 4:
      if (posRow == 0) posRow = 20;
      resetClass(0, 1, 0);
      break;
  }
}

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

//? проверка на положение тела змеи
function scanBody(y, x) {
  let result = false,
    z;
  for (let i = 0; i < posMass.length; i++) {
    z = posMass[i][0];
    if (y == z) {
      z = posMass[i][1];
      if (x == z) {
        result = true;
        break;
      } else continue;
    } else continue;
  }
  return result;
}

//? вывод результата и его сравнение
function results() {
  scoreGame.push([inPut.value, legthSnake, gameScore]);
  let temp = []; //* промежуточный массив
  let maxPoint = 0; //* максимальное значение
  while (scoreGame.length != 0) {
    for (let i = 0; i < scoreGame.length - 1; i++) {
      if (scoreGame[maxPoint][2] < scoreGame[i + 1][2])
        maxPoint = i + 1;
    }
    temp.push(scoreGame[maxPoint]);
    scoreGame.splice(maxPoint, 1);
    maxPoint = 0;
  }
  scoreGame = [];
  scoreGame = temp.slice(0, 7);

  for (let i = 0; i < scoreGame.length; i++) {
    records.rows[i + 1].cells[0].innerHTML = scoreGame[i][0];
    records.rows[i + 1].cells[1].innerHTML = scoreGame[i][1];
    records.rows[i + 1].cells[2].innerHTML = scoreGame[i][2];
  }
}

function resazeWindow() {
  if (widthWindow <= 425) {
    mobBtn.classList.remove('noVisible');
    leftBlock.classList.add('absolut');
    rightBlock.classList.add('absolut');
  } else {
    mobBtn.classList.add('noVisible');
    leftBlock.classList.remove('absolut');
    rightBlock.classList.remove('absolut');
  }
}
