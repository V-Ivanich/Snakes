
const pole = document.querySelector('.container'),
  btn = document.querySelector('.btnStart'),
  btnSt = document.querySelector('.btnStop');

let posMass = [
  [10, 2],
  [10, 1],
  [10, 0],
];//! позиции змеи

//? функция случайных чисел
function randOm(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

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
console.log(massiv);

let time,
  foo,
  forSnake = [],
  legthSnake = 3,
  flag = 1,
  posCol = 2,
  posRow = 10;
hedSnake = massiv[posRow][posCol];
hedSnake.classList.add('kub_activ');
hedSnake = massiv[posRow][posCol - 1];
hedSnake.classList.add('kub_activ');
hedSnake = massiv[posRow][posCol - 2];
hedSnake.classList.add('kub_activ');

function foods() {
  let m = randOm(0, 19);
  let n = randOm(0, 19);
  foo = massiv[m][n];
  foo.classList.add('food');
  forSnake = [m, n];
}

foods();

btn.addEventListener('click', () => { //? старт
  time = setInterval(frame, 250);
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
  let moveData;
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

  for (let i = 1; i <= posMass.length - 1; i++) {
    moveData = posMass[posMass.length - 1 - i];
    posMass[posMass.length - i] = moveData;
  }
  posMass[0] = [posRow, posCol];
  if (forSnake[0] == posRow && forSnake[0] == posCol) {
    foo.classList.remove('food');
    posMass.push(0, 0);
  }

  console.log(posMass);
  hedSnake = massiv[posMass[1][0]][posMass[1][1]];
  hedSnake.classList.add('kub_activ');

  hedSnake = massiv[posRow][posCol];
  hedSnake.classList.add('kub_activ');


}

//? сканирование клавиш, "стрелок"
document.onkeydown = function (event) {
  if (event.key == 'ArrowLeft') flag = 3;

  if (event.key == 'ArrowRight') flag = 1;

  if (event.key == 'ArrowUp') flag = 4;

  if (event.key == 'ArrowDown') flag = 2;
}
