import "./style.css";

const viperImageUrl = "/images/viper.png";
const enemyImageUrl = "/images/enemy_small.png";
const shotImageUrl = "/images/viper_single_shot.png";

let isGameReady = false;
let viperImage;
let enemyImage;
let shotImage;

async function loadImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.addEventListener("load", () => {
      resolve(img);
    });
    img.src = url;
  });
}

Promise.all([
  loadImage(viperImageUrl),
  loadImage(enemyImageUrl),
  loadImage(shotImageUrl),
]).then(([v, e, s]) => {
  viperImage = v;
  enemyImage = e;
  shotImage = s;
  isGameReady = true;
});
