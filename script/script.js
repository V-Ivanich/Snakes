
const hedSnake = document.querySelector('.heads');
const pole = document.querySelector('.container');
const btn = document.querySelector('.btnStart');
let pos = 0;

btn.addEventListener('click', () => {
  let time = setInterval(frame, 20);
  frame();
})

function frame() {
  if (pos == 380) {
    clearInterval(time);
  } else {
    pos++;
    hedSnake.style.top = pos + 'px';
    hedSnake.style.left = pos + 'px';
  }
}