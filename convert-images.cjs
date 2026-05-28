const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'src/assets/projects');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file));
    } else {
      if (/\.(jpg|jpeg|png)$/i.test(file)) {
        results.push(file);
      }
    }
  });
  return results;
}

async function convert() {
  const files = getFiles(targetDir);
  console.log(`Found ${files.length} images to convert.`);

  for (const file of files) {
    const output = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    try {
      await sharp(file)
        .webp({ quality: 75 })
        .toFile(output);
      console.log(`Converted: ${path.relative(__dirname, file)} -> ${path.relative(__dirname, output)}`);
      // 원본 파일 삭제
      fs.unlinkSync(file);
      console.log(`Deleted original: ${path.relative(__dirname, file)}`);
    } catch (err) {
      console.error(`Error converting ${file}:`, err);
    }
  }
}

convert();
