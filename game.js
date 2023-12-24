
// treasure coordinates
const WIDTH = 400;
const HEIGH = 400;


let target = {
  x: getRandomNumber(WIDTH),
  y: getRandomNumber(HEIGH)
};


// click handler
let $map = document.querySelector('#map');
let $distance = document.querySelector('#distance');
let clicks = 0;


$map.addEventListener('click', function (e) {
  console.log('click');
  clicks++;
  let distance = getDistance(e, target);
  let distanceHint = getDistanceHint(distance);
  $distance.innerHTML = `<h1>${distanceHint}</h1>`;

  if (distance < 20) {
    document.getElementById('modalMessage').innerText = `Encontré el tesoro en ${clicks} clicks!`;
    document.getElementById('modalOverlay').classList.add('active');
  }  
  /*
if (distance < 20 ) {
  alert();
  alert(`Encontré el tesoro en ${clicks} clicks!`);
  location.reload();
}*/

});






//


function resetGame() {
  clicks = 0;
  target = {
    x: getRandomNumber(WIDTH),
    y: getRandomNumber(HEIGH)
  };
  $distance.innerHTML = "";
  document.getElementById('modalOverlay').classList.remove('active');
}


//
function startGame() {
  document.getElementById('intro').classList.remove('active');
  setTimeout(() => {
    document.getElementById('intro').style.display = 'none';
  }, 1000);
}
