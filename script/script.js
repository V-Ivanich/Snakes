
const hedSnake = document.querySelector('.heads'),
  pole = document.querySelector('.container'),
  btn = document.querySelector('.btnStart'),
  btnSt = document.querySelector('.btnStop'),
  hori = document.querySelector('.horizont'),
  vert = document.querySelector('.vertikal');

let time,
  posH = 0,
  posV = 0;

btn.addEventListener('click', () => {
  time = setInterval(frame, 20);
  frame();
})

function frame() {
  if (posH == 400) {
    posH = -20;
  } else {
    posH++;
    hedSnake.style.top = posH + 'px';
    // hedSnake.style.left = pos + 'px';
  }
}
btnSt.addEventListener('click', () => {
  clearInterval(time);
})
hori.addEventListener('click', () => {
  if (posV == 400) {
    posV = -20;
  } else {
    posV++;
    hedSnake.style.left = posV + 'px';
  }
})