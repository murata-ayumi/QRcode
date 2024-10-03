document.getElementById('generate').addEventListener('click', () => {
  const text = document.getElementById('text').value;
  const fgColor = document.getElementById('fgColor').value;
  const bgColor = document.getElementById('bgColor').value;
  const size = parseInt(document.getElementById('size').value);

  // URL形式の正規表現パターン
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$|^[\w\s]+$/i;
  // 入力がURL形式かどうかをチェック
  if (!urlPattern.test(text.trim())) {
    alert('正しいURL形式でテキストを入力してください🥰');
    document.getElementById('text').value = '';
    return;
  }

  const qrcodeContainer = document.getElementById('qrcode');
  qrcodeContainer.innerHTML = ''; // 既存のQRコードをクリア

  // 歯車の画像を回転させる
  const gearImg = document.querySelector('.gear img:last-of-type');
  gearImg.style.animation = 'rotation 2s infinite linear';

  // QRコード生成後、アニメーションを停止する
  setTimeout(() => {
    gearImg.style.animation = 'none';
    // QRコード生成
    new QRCode(qrcodeContainer, {
      text: text,
      width: size,
      height: size,
      colorDark: fgColor,
      colorLight: bgColor,
    });
  }, 1500); // 1.5秒後に停止（QRコード生成に応じて調整可能）
});
document.getElementById('textClear').addEventListener('click', () => {
  document.getElementById('text').value = '';
});

document.getElementById('copy').addEventListener('click', () => {
  const qrcodeCanvas = document.querySelector('#qrcode canvas');
  if (qrcodeCanvas) {
    qrcodeCanvas.toBlob((blob) => {
      const item = new ClipboardItem({ 'image/png': blob });
      navigator.clipboard
        .write([item])
        .then(() => {
          alert('QRコードをクリップボードにコピーしました🤩');
        })
        .catch((error) => {
          console.error('クリップボードへのコピーに失敗しました😭', error);
          alert('クリップボードへのコピーに失敗しました😭');
        });
    });
  } else {
    alert('最初にQRコードを生成してください🥰');
  }
});
