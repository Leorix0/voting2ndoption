const qrcode = require('qrcode');

async function generateQRCode(data) {
  const path = `./qrcodes/${data}.png`;
  await qrcode.toFile(path, data);
  return path;
}

module.exports = {
  generateQRCode,
};
