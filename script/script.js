
const hedSnake = document.querySelector('.heads'),
  pole = document.querySelector('.container'),
  btn = document.querySelector('.btnStart'),
  btnSt = document.querySelector('.btnStop'),
  hori = document.querySelector('.horizont'),
  vert = document.querySelector('.vertikal');

let time,
  flag = 1,
  posH = 0,
  posV = 190;

btn.addEventListener('click', () => { //? старт
  time = setInterval(frame, 15);
  frame();
})

btnSt.addEventListener('click', () => { //? стоп
  clearInterval(time);
})

function frame() {
  switch (flag) {
    case 1:
      if (posH == 400) posH = -20;
      posH++;
      hedSnake.style.left = posH + 'px';
      break;
    case 2:
      if (posV == 400) posV = -20;
      posV++;
      hedSnake.style.top = posV + 'px';
      break;
    case 3:
      if (posH == -20) posH = 400;
      posH--;
      hedSnake.style.left = posH + 'px';
      break;
    case 4:
      if (posV == -20) posV = 400;
      posV--;
      hedSnake.style.top = posV + 'px';
      break;
  }

}


document.onkeydown = function (event) {
  if (event.key == 'ArrowLeft') flag = 3;

  if (event.key == 'ArrowRight') flag = 1;

  if (event.key == 'ArrowUp') flag = 4;

  if (event.key == 'ArrowDown') flag = 2;
}


