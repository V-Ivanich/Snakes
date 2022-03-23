
const pole = document.querySelector('.container'),
  btn = document.querySelector('.btnStart'),
  btnSt = document.querySelector('.btnStop'),
  lZmei = document.querySelector('.zmi'),
  gameOver = document.querySelector('.over'),
  ochi = document.querySelector('.ochKi');

let posMass = [
  [10, 1],
  [10, 0],
  [10, 0],
];//! позиции змеи начальные значения

//? функция случайных чисел
function randOm(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//? массив для div-ов
const massiv = [];
for (let i = 0; i < 20; i++) {
  massiv.push([0]);
  for (let p = 0; p < 20; p++) {
    massiv[i][p] = 0;
  }
}

//! создаем и заносим в массив div-вы
for (let i = 0; i < 20; i++) {
  for (let j = 0; j < 20; j++) {
    let dive = document.createElement('div');
    dive.classList.add('kub');
    massiv[i][j] = pole.appendChild(dive);
  }
}

let time,
  foo,
  forSnake = [],
  legthSnake = 3,//? длина змеи
  flag = 1,
  gameScore = 0,
  posCol = 2,
  posRow = 10;

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
bodySnake();

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

foods();

btn.addEventListener('click', () => { //? старт
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
