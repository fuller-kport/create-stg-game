# シューティングゲームをつくる

### ゲームループ（[デモ](https://codepen.io/chooblarin/pen/c86459b7160ee09766a236cdf187c1d2)）

```js
const canvas = document.querySelector("#my-canvas");
const ctx = canvas.getContext("2d");

(function loop() {
  requestAnimationFrame(loop);
  // 繰り返し実行される処理
})();
```

### 自機を操作する

- [キーボード入力を扱うデモ](https://codepen.io/chooblarin/pen/39a76bc2d6af28df7c190356240bffaf)
- [自機を移動するデモ](https://codepen.io/chooblarin/pen/ab0e0c71763234bb562a6162daa70667)

### 敵機を追加する

- [敵機を左右に移動するデモ](https://codepen.io/chooblarin/pen/2496bc3bbd9aa4b68523c6652dbca402)
- [複数の敵機のデモ](https://codepen.io/chooblarin/pen/4668a0d4e32ed0e7ecd3bb50f1640160)

### 弾を発射する

- [スペースキーを押すと弾を 1 発撃つデモ](https://codepen.io/chooblarin/pen/2215244c872736316f2674963c295f04)
- [弾を複数撃つデモ ver.1](https://codepen.io/chooblarin/pen/ae124d942d31368b2867cb636eaf7a23)
- [弾を複数撃つデモ ver.2](https://codepen.io/chooblarin/pen/10773109181a2f19aed79a26bd6275e5)

### 衝突判定

- [衝突判定のデモ](https://codepen.io/chooblarin/pen/11c8e0d6fb21dce98464ea7cb84ae12c)

### 画像やエフェクトを追加する

- [画像を Canvas に描画するデモ](https://codepen.io/chooblarin/pen/ae2b194136d27f30c719f989250a2fe3)
- [クリックした座標に爆発エフェクトを追加するデモ](https://codepen.io/chooblarin/pen/93fc0a45bb4bb386056c7eea5ddcd627)
- [背景の星を描画するデモ](https://codepen.io/chooblarin/pen/2a86dd2f6ce88ff94b6cd216c2545ef6)
