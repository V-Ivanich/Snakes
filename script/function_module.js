
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
  localStorage.setItem('result', JSON.stringify(scoreGame));//!запись в "браузер"
  mobileRecord = '';
  mobileRecord = scoreGame[0][0] + '-';
  mobileRecord += scoreGame[0][2];
  document.querySelector('.mob_rec').innerHTML = mobileRecord;
  moving();
}
//? заполнение таблицы рекордов
function moving() {
  for (let i = 0; i < scoreGame.length; i++) {
    records.rows[i + 1].cells[0].innerHTML = scoreGame[i][0];
    records.rows[i + 1].cells[1].innerHTML = scoreGame[i][1];
    records.rows[i + 1].cells[2].innerHTML = scoreGame[i][2];
  }
}
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

function switchLanguage() {
  document.querySelector('.titleH2').innerHTML = lang['title'][ru_us];
  document.querySelector('.lenSnake').innerHTML = lang['length'][ru_us];
  document.querySelector('.resUlt').innerHTML = lang['result'][ru_us];
  document.querySelector('#information').innerHTML = lang['info'][ru_us];
  document.querySelector('.btnStart').innerHTML = lang['btStart'][ru_us];
  document.querySelector('.btnStop').innerHTML = lang['stop'][ru_us];
  document.querySelector('.gamOv').innerHTML = lang['over'][ru_us];
  document.querySelector('.rec').innerHTML = lang['records'][ru_us];
  document.querySelector('.namTab').innerHTML = lang['tablName'][ru_us];
  document.querySelector('.lenTab').innerHTML = lang['tablLen'][ru_us];
  document.querySelector('.scTab').innerHTML = lang['tablScore'][ru_us];
  document.querySelector('.infoTit').innerHTML = lang['titlInfo'][ru_us];
  document.querySelector('.paragraf').innerHTML = lang['textInfo'][ru_us];
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

function resazeWindow() {
  if (widthWindow <= 425) {
    mobBtn.classList.remove('noVisible');
    mobMenu.classList.remove('noVisible');
    mobRec.classList.remove('noVisible');
    rightBlock.classList.add('absolut');
  } else {
    mobBtn.classList.add('noVisible');
    mobMenu.classList.add('noVisible');
    mobRec.classList.add('noVisible');
    rightBlock.classList.remove('absolut');
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
}
//? сканирование мобильных клавиш, "стрелок"
mBot1.onclick = () => {
  if (flag != 1) {
    flag = 3;
  } else return;
}

mBot3.onclick = () => {
  if (flag != 3) {
    flag = 1;
  } else return;
}

mBot4.onclick = () => {
  if (flag != 2) {
    flag = 4;
  } else return;
}

mBot2.onclick = () => {
  if (flag != 4) {
    flag = 2;
  } else return;
}

window.addEventListener('resize', () => {
  let posX = heder.offsetWidth;
  if (posX <= 425) {
    let w = posX / 2;
    posX = w - 125;
    windOws.style.left = posX + 'px';
  }
  else {
    windOws.style.left = posX - 250 + 'px';
  }
})
function infoWindow() {
  windOws.classList.toggle('wind_info_active');
}
