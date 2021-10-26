import "./style.css";

const viperImageUrl = "images/viper.png";
const enemyImageUrl = "images/enemy_small.png";
const shotImageUrl = "images/viper_single_shot.png";

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

const canvas = document.querySelector("#my-canvas");
const ctx = canvas.getContext("2d");

let stars = []; // 背景の星
const starSpeed = 0.4;

for (let i = 0; i < 20; i += 1) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const size = 1 + Math.random() * 3;
  stars.push({
    x,
    y,
    width: size,
    height: size,
  });
}

function updateStars() {
  for (const star of stars) {
    star.y += starSpeed;
    if (star.y > canvas.height) {
      star.x = Math.random() * canvas.width;
      star.y = 0;
    }
  }
}

function drawStars() {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#cdcdcd";
  for (const star of stars) {
    ctx.fillRect(star.x, star.y, star.width, star.height);
  }
}

const fireColors = ["#D364EB", "#C4F4F6", "#AAD1CE"]; // 爆発の炎の色
let explosionEffects = []; // 爆発エフェクトの配列

// 爆発エフェクトを作成する関数
function createExplosionEffect(x, y) {
  // 炎をつくる
  const fires = [];
  for (let i = 0; i < 10; i += 1) {
    const theta = Math.random() * 2.0 * Math.PI;
    const vx = Math.cos(theta);
    const vy = Math.sin(theta);
    const size = 10 + 3 * Math.random();
    const color = getRandomElement(fireColors);
    fires.push({ x: 0, y: 0, vx, vy, size, color });
  }
  return {
    x,
    y,
    fires,
    duration: 30,
    time: 0,
  };
}

// 配列からランダムな位置の要素を取得する関数
function getRandomElement(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

const viperSize = 36;

let viper = {
  x: canvas.width / 2,
  y: canvas.height - viperSize / 2,
  width: viperSize,
  height: viperSize,
  speed: 0.1,
};

let enemies = [];
let shots = [];
const shotCountLimit = 5;
const shotInterval = 200;
const shotSpeed = 0.2;
const shotWidth = 4;
const shotHeight = 12;
let lastShootTime = 0;

// 敵機の状態を初期化
const enemySize = 32;
const enemySpeed = 0.1;

for (let i = 0; i < 5; i += 1) {
  const x = i * (enemySize + 5) + enemySize / 2;
  const enemy = {
    x,
    y: enemySize / 2,
    width: enemySize,
    height: enemySize,
    velocity: enemySpeed,
  };
  enemies.push(enemy);
}

/*
敵機の位置を更新。等速で左右移動し，境界では折り返す。
*/
function updateEnemy(enemy, dt) {
  const leftEdge = enemy.width / 2; // 可動域左端
  const rightEdge = canvas.width - enemy.width / 2; // 可動域の右端

  let nextX = enemy.x + enemy.velocity * dt;

  if (nextX > rightEdge) {
    // 右端境界
    enemy.x = rightEdge - (nextX % rightEdge);
    enemy.velocity = -1 * enemySpeed;
  } else if (nextX < leftEdge) {
    // 左端境界
    enemy.x = leftEdge + leftEdge - nextX;
    enemy.velocity = enemySpeed;
  } else {
    enemy.x = nextX;
  }
}

// 衝突判定の関数
function detectCollision(r1, r2) {
  return (
    Math.max(r1.x - r1.width / 2, r2.x - r2.width / 2) <
      Math.min(r1.x + r1.width / 2, r2.x + r2.width / 2) &&
    Math.max(r1.y - r1.height / 2, r2.y - r2.height / 2) <
      Math.min(r1.y + r1.height / 2, r2.y + r2.height / 2)
  );
}

// キー入力の状態
let keyState = {
  ArrowLeft: false,
  ArrowRight: false,
  Space: false,
};

window.addEventListener("keydown", (ev) => {
  // キーボードを押す度に実行される
  keyState[ev.code] = true;
});

window.addEventListener("keyup", (ev) => {
  // キーボードを離す度に実行される
  keyState[ev.code] = false;
});

function drawViper(v) {
  const x = v.x - v.width / 2;
  const y = v.y - v.height / 2;
  ctx.drawImage(viperImage, x, y, v.width, v.height);
}

function drawEnemy(enemy) {
  const x = enemy.x - enemy.width / 2;
  const y = enemy.y - enemy.height / 2;
  ctx.drawImage(enemyImage, x, y, enemy.width, enemy.height);
}

function drawShot(shot) {
  const x = shot.x - shot.width / 2;
  const y = shot.y - shot.height / 2;
  ctx.drawImage(shotImage, x, y, shot.width, shot.height);
}

function drawCongrats(record) {
  ctx.font = "24px serif";
  ctx.fillStyle = "#00000077";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillText("おめでとう", 10, 50);
  ctx.fillText(`あなたの記録は${record}秒です`, 10, 80);
}

const startTime = Date.now(); // ゲームループ開始時刻（ミリ秒）
let lastTime = 0;
let frameId;

(function loop() {
  frameId = requestAnimationFrame(loop);

  if (!isGameReady) {
    return;
  }

  const now = Date.now();
  const time = now - startTime; // ゲームループの時刻
  const dt = time - lastTime;

  if (enemies.length === 0) {
    const record = Math.floor(time / 1000);
    drawCongrats(record);
    cancelAnimationFrame(frameId);
    return;
  }

  // 状態更新

  updateStars();

  // 弾の状態を更新
  const nextShots = [];
  for (const shot of shots) {
    shot.y += -shot.speed * dt;
    if (
      shot.x >= 0 &&
      shot.x <= canvas.width &&
      shot.y >= 0 &&
      shot.y <= canvas.height
    ) {
      nextShots.push(shot);
    }
  }
  shots = nextShots;

  // 敵機の状態を更新
  const nextEnemies = [];
  for (const enemy of enemies) {
    updateEnemy(enemy, dt);
    // 全ての弾が衝突していない場合のみnextEnemiesに追加
    let isAlive = true;
    for (const shot of shots) {
      if (detectCollision(shot, enemy)) {
        isAlive = false;

        const exp = createExplosionEffect(shot.x, shot.y);
        explosionEffects.push(exp);
        break;
      }
    }
    if (isAlive) {
      nextEnemies.push(enemy);
    }
  }
  enemies = nextEnemies;

  if (keyState["ArrowLeft"]) {
    viper.x -= viper.speed * dt;
  }
  if (keyState["ArrowRight"]) {
    viper.x += viper.speed * dt;
  }
  if (
    keyState["Space"] &&
    shots.length < shotCountLimit &&
    lastShootTime + shotInterval < time
  ) {
    const x = viper.x;
    const y = viper.y;
    shots.push({
      x,
      y,
      width: shotWidth,
      height: shotHeight,
      speed: shotSpeed,
    });
    lastShootTime = time;
  }

  // フィールドの境界条件
  viper.x = Math.max(
    viper.width / 2,
    Math.min(canvas.width - viper.width / 2, viper.x)
  );

  viper.y = Math.max(
    viper.height / 2,
    Math.min(canvas.height - viper.height / 2, viper.y)
  );

  // 描画
  drawStars();
  drawViper(viper);
  enemies.forEach(drawEnemy);
  shots.forEach(drawShot);

  const nextExplosionEffects = [];

  for (const exp of explosionEffects) {
    ctx.save(); // 座標変換
    ctx.translate(exp.x, exp.y);
    for (const fire of exp.fires) {
      const { x, y, size, color } = fire;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, size, size);

      fire.x += fire.vx;
      fire.y += fire.vy;
      fire.size *= 0.95;
    }

    ctx.restore();

    exp.time += 1;

    if (exp.duration > exp.time) {
      nextExplosionEffects.push(exp);
    }
  }

  explosionEffects = nextExplosionEffects;

  lastTime = time;
})();
