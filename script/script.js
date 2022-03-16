
const pole = document.querySelector('.container'),
  btn = document.querySelector('.btnStart'),
  btnSt = document.querySelector('.btnStop');

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

// let time,
//   flag = 1,
//   posH = 0,
//   posV = 190;

// btn.addEventListener('click', () => { //? старт
//   time = setInterval(frame, 20);
//   frame();
// })

// btnSt.addEventListener('click', () => { //? стоп
//   clearInterval(time);
// })

// function frame() {
//   switch (flag) {
//     case 1:
//       if (posH == 400) posH = -20;
//       posH += 2;
//       hedSnake.style.left = posH + 'px';
//       body_1.style.left = posH - 21 + 'px';
//       body_1.style.top = posV + 'px';
//       break;
//     case 2:
//       if (posV == 400) posV = -20;
//       posV += 2;
//       hedSnake.style.top = posV + 'px';
//       body_1.style.top = posV - 21 + 'px';
//       body_1.style.left = posH + 'px';
//       break;
//     case 3:
//       if (posH == -20) posH = 400;
//       posH -= 2;
//       hedSnake.style.left = posH + 'px';
//       body_1.style.left = posH + 21 + 'px';
//       body_1.style.top = posV + 'px';
//       break;
//     case 4:
//       if (posV == -20) posV = 400;
//       posV -= 2;
//       hedSnake.style.top = posV + 'px';
//       body_1.style.top = posV + 21 + 'px';
//       body_1.style.left = posH + 'px';
//       break;
//   }
// }


// document.onkeydown = function (event) {
//   if (event.key == 'ArrowLeft') flag = 3;

//   if (event.key == 'ArrowRight') flag = 1;

//   if (event.key == 'ArrowUp') flag = 4;

//   if (event.key == 'ArrowDown') flag = 2;
// }
