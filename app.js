// Number alien ships in separate divs
// ask about play again button
// fix retreat function

let playerTurn = true;
let alienTurn = false;

let player = document.querySelector(".playerAttack");
let alien = document.querySelector(".alienAttack");
let message = document.querySelector(".message");
let score = document.querySelector(".score");

let retreatBtn = document.querySelector(".retreat");

// both ships under one class
class Ship {
  hull = 0;
  firePower = 0;
  accuracy = 0;
  img = "";
  constructor(hull, firePower, accuracy, img) {
    this.hull = hull;
    this.firePower = firePower;
    this.accuracy = accuracy;
    this.img = img;
  }
}

// functions representing alien ship parameters
const alienHull = () => {
  return Math.floor(Math.random() * 4 + 3);
};

const alienFirepower = () => {
  return Math.floor(Math.random() * 3 + 2);
};

const alienAccuracy = () => {
  return Math.floor(Math.random() * 3 + 6) / 10;
};

// initialized an empty array to hold the six alien ships
let alienArray = [];

// creating my ship
const uss = new Ship(20, 5, 0.7);
let ussArray = [uss];

let playerImg = document.querySelector(".player");
let opponentImg = document.querySelector(".opponent");

// generating six alien ships
for (let i = 0; i < 6; i++) {
  let alienImg = [
    "https://i.redd.it/9gvo2imxyxd81.gif",
    "https://i.pinimg.com/originals/45/dc/86/45dc86f84906fcf2e90cae87f54758fd.gif",
    "https://cdna.artstation.com/p/assets/images/images/027/859/460/original/pim-alink-pq3-final-boss.gif?1592775707",
    "https://i.pinimg.com/originals/af/f1/4c/aff14c3945103903f69fb415f31482ff.gif",
    "https://opengameart.org/sites/default/files/JEROM_bossA2_CC-BY-3.gif",
  ];

  const alien = new Ship(
    alienHull(),
    alienFirepower(),
    alienAccuracy(),
    alienImg[i]
  );
  alienArray.push(alien);
}

//   USS and Alien Rows
let row1 = document.querySelector(".row1");
let row2 = document.querySelector(".row2");
let row3 = document.querySelector(".row3");

const ussCol = () => {
  row1.innerHTML = `USS Hull: ${ussArray[0].hull}`;
  row2.innerHTML = `USS Firepower: ${ussArray[0].firePower}`;
  row3.innerHTML = `USS Accuracy: ${ussArray[0].accuracy}`;
};

let alienrow1 = document.querySelector(".alienrow1");
let alienrow2 = document.querySelector(".alienrow2");
let alienrow3 = document.querySelector(".alienrow3");

const alienCol = () => {
  alienrow1.innerHTML = `Alien Hull: ${alienArray[0].hull}`;
  alienrow2.innerHTML = `Alien Firepower: ${alienArray[0].firePower}`;
  alienrow3.innerHTML = `Alien Accuracy: ${alienArray[0].accuracy}`;
};

ussCol();
alienCol();

// USS player attack function
let ussAttack = () => {
  if (playerTurn) {
    if (uss.hull > 0 && alienArray.length > 0) {
      if (uss.accuracy >= alienArray[0].accuracy) {
        alienArray[0].hull -= uss.firePower;
        alienCol();
        console.log("You have hit!");
        console.log("Alien : " + alienArray[0].hull + " | USS : " + uss.hull);
        message.innerHTML = "You have hit!";
        score.innerHTML =
          "Alien : " + alienArray[0].hull + " | USS : " + uss.hull;
        playerTurn = false;
        alienTurn = true;
        player.style.backgroundColor = "red";
        alien.style.backgroundColor = "green";
        if (alienArray[0].hull <= 0) {
          opponentImg.setAttribute("src", alienArray[0].img);
          alienArray.shift();
          console.log("Enemy destroyed!");
          message.innerHTML = "Enemy destroyed!";
          playerTurn = true;
          alienTurn = false;
          player.style.backgroundColor = "green";
          alien.style.backgroundColor = "red";
        }
        if (alienArray.length === 0) {
          console.log("Congratulations! YOU WON!");
          message.innerHTML = "Congratulations! YOU WON!";
          alert("You have saved the earth from an alien invasion!");
          opponentImg.style.display = "none";
          retreatBtn.style.display = "none";
          player.style.display = "none";
          alien.style.display = "none";
        } else {
          alienCol();
        }
      } else {
        console.log("You missed!");
        console.log("Alien : " + alienArray[0].hull + "| USS : " + uss.hull);
        message.innerHTML = "You missed!";
        score.innerHTML =
          "Alien : " + alienArray[0].hull + " | USS : " + uss.hull;
        playerTurn = false;
        alienTurn = true;
        player.style.backgroundColor = "red";
        alien.style.backgroundColor = "green";
      }
    }
    // console.log(alienArray, uss)
  }
};

// If you destroy the ship, you have the option to attack the next ship or to retreat
// If you retreat, the game is over, perhaps leaving the game open for further developments or options

// retreat function
let retreat = () => {
  if (alienArray.length < 5 && playerTurn) {
    alienTurn = false;
    playerTurn = false;
    message.innerHTML = "You have retreated, you are a traitor!";
    score.innerHTML = "";
    playerImg.style.display = "none";
    player.style.display = "none";
    alien.style.display = "none";
    alert("You have retreated! No shots can be fired.");
  }
};

// Alien player attack function
let alienAttack = () => {
  if (alienTurn) {
    if (alienArray.length !== 0 && ussArray.length !== 0) {
      if (uss.accuracy <= alienArray[0].accuracy) {
        uss.hull -= alienArray[0].firePower;
        ussCol();
        console.log("Alien has hit!");
        console.log(alienArray[0].firePower + " damage!");
        console.log("Alien : " + alienArray[0].hull + " | USS : " + uss.hull);
        message.innerHTML =
          "Alien has hit! " + alienArray[0].firePower + " damage taken!";
        score.innerHTML =
          "Alien : " + alienArray[0].hull + " | USS : " + uss.hull;
        alienTurn = false;
        playerTurn = true;
        alien.style.backgroundColor = "red";
        player.style.backgroundColor = "green";
        if (uss.hull <= 0) {
          ussArray.shift();
          console.log("Game Over, You LOSE!");
          console.log("Alien : " + alienArray[0].hull, "| USS : " + uss.hull);
          message.innerHTML = "Game Over, You LOSE!";
          score.innerHTML =
            "Alien : " + alienArray[0].hull + " | USS : " + uss.hull;
          playerImg.style.display = "none";
          retreatBtn.style.display = "none";
          player.style.display = "none";
          alien.style.display = "none";
          alert(
            "The aliens have destoyed our only defense, the Earth is DOOMED!"
          );
        }
      } else {
        console.log("Enemy missed!");
        console.log(
          "Alien : " + alienArray[0].hull + " | USS         : " + uss.hull
        );
        message.innerHTML = "Enemy missed!";
        score.innerHTML =
          "Alien : " + alienArray[0].hull + " | USS : " + uss.hull;
        alienTurn = false;
        playerTurn = true;
        alien.style.backgroundColor = "red";
        player.style.backgroundColor = "green";
      }
      alienArray[0].accuracy = alienAccuracy();
      // console.log(alienArray, uss)
    }
  }
};
