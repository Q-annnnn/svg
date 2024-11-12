// Tạo tệp 'circle_packing_staggered.js'

// Kích thước khung (mm)
const frameWidth = 320;
const frameHeight = 430;

// Kích thước đường tròn (mm)
const diameter = 60;
const radius = diameter / 2;

// Khoảng cách giữa các tâm đường tròn
const horizontalSpacing = diameter;
const verticalSpacing = diameter * Math.sqrt(3) / 2;

// Tạo danh sách lưu tọa độ
let circlePositions = [];

let count = 0;
let row = 0;

while (true) {
  const isEvenRow = row % 2 === 0;

  // Tính số cột trong hàng
  const maxColumns = Math.floor((frameWidth - (isEvenRow ? 0 : radius)) / horizontalSpacing);

  // Tính toán lề để căn giữa theo chiều ngang
  const offsetX = isEvenRow
    ? (frameWidth - (maxColumns * horizontalSpacing)) / 2 + radius
    : (frameWidth - ((maxColumns * horizontalSpacing) + horizontalSpacing / 2)) / 2 + radius + horizontalSpacing / 2;

  // Tính tọa độ y
  const y = radius + row * verticalSpacing;

  // Kiểm tra xem đường tròn có vượt quá khung theo chiều dọc không
  if (y + radius > frameHeight) {
    break;
  }

  for (let col = 0; col < maxColumns; col++) {
    const x = offsetX + col * horizontalSpacing;

    // Kiểm tra xem đường tròn có nằm trong khung không
    if (x - radius < 0 || x + radius > frameWidth) {
      continue;
    }

    circlePositions.push({ x: x, y: y });
    count++;
  }
  row++;
}

// Tạo nội dung SVG
let svgContent = '';
svgContent += `<svg xmlns="http://www.w3.org/2000/svg" width="${frameWidth}mm" height="${frameHeight}mm">\n`;

circlePositions.forEach(circle => {
  svgContent += `  <circle cx="${circle.x.toFixed(2)}mm" cy="${circle.y.toFixed(2)}mm" r="${radius.toFixed(2)}mm" stroke="black" stroke-width="0.1mm" fill="none" />\n`;
});

svgContent += '</svg>';

// Ghi nội dung SVG vào tệp
const fs = require('fs');
fs.writeFileSync('circle_packing_staggered.svg', svgContent);

console.log('Tệp SVG đã được tạo: circle_packing_staggered.svg');
