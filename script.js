const generateBtn = document.getElementById('generateBtn');
const qrcodeContainer = document.getElementById('qrcode');

generateBtn.addEventListener('click', () => {
  const url = document.getElementById('urlInput').value.trim();
  const sizeValue = document.getElementById('qrSize').value;

  if (!url) {
    alert("Please enter a URL or text first.");
    return;
  }

  if (!sizeValue) {
    alert("Please select a QR size.");
    return;
  }

  const size = parseInt(sizeValue);

  qrcodeContainer.innerHTML = "";

  new QRCode(qrcodeContainer, {
    text: url,
    width: size,
    height: size,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
  downloadBtn.style.display = 'inline-block';
  copyBtn.style.display = 'inline-block';
});

const downloadBtn = document.getElementById('downloadBtn');

downloadBtn.addEventListener('click', () => {
  const canvas = qrcodeContainer.querySelector('canvas');
  
  if (!canvas) {
    alert("Please generate a QR code first.");
    return;
  }

  const link = document.createElement('a');
  link.download = 'qrcode.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});

const copyBtn = document.getElementById('copyBtn');

copyBtn.addEventListener('click', async () => {
  const canvas = qrcodeContainer.querySelector('canvas');

  if (!canvas) {
    alert("Please generate a QR code first.");
    return;
  }

  canvas.toBlob(async (blob) => {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      alert("QR code copied to clipboard!");
    } catch (err) {
      console.error('Copy failed:', err);
      alert("Couldn't copy image. Your browser may not support this feature.");
    }
  });
});