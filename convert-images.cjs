const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// libvips 내부 캐시가 원본 파일 핸들을 잡고 있으면 제자리 덮어쓰기가 실패하므로 비활성화
sharp.cache(false);

// src/assets 전체를 대상으로 함 (projects + images + hero.webp 등)
const targetDir = path.join(__dirname, 'src/assets');

// 리사이즈 최대 가로폭 (이보다 작은 이미지는 확대하지 않음)
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 78;

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else {
      // jpg/png 뿐 아니라 이미 변환된 webp도 다시 리사이즈 대상에 포함
      if (/\.(jpg|jpeg|png|webp)$/i.test(fullPath)) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

async function convert() {
  const files = getFiles(targetDir);
  console.log(`Found ${files.length} images to process. (max width ${MAX_WIDTH}px, q${WEBP_QUALITY})`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const output = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const isAlreadyWebp = /\.webp$/i.test(file);
    try {
      const beforeSize = fs.statSync(file).size;
      totalBefore += beforeSize;

      // 같은 경로(webp)를 동시에 read/write 하면 충돌하므로 buffer로 먼저 만든 뒤 기록
      const buffer = await sharp(file)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toBuffer();

      // 같은 경로 동시 read/write 충돌을 피하려 임시파일에 쓴 뒤 원자적으로 교체
      const tmp = output + '.tmp';
      fs.writeFileSync(tmp, buffer);
      fs.renameSync(tmp, output);
      totalAfter += buffer.length;

      // jpg/png 원본이었다면 변환 후 원본 삭제 (webp는 제자리 덮어쓰기라 삭제 불필요)
      if (!isAlreadyWebp && file !== output) {
        fs.unlinkSync(file);
      }

      const before = (beforeSize / 1024).toFixed(0);
      const after = (buffer.length / 1024).toFixed(0);
      console.log(`${path.relative(__dirname, output)}: ${before}KB -> ${after}KB`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }

  console.log(
    `\nDone. Total: ${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB`
  );
}

convert();
