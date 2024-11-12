// Tạo tệp 'circle_packing_grid.js'

// Kích thước khung (mm)
const frameWidth = 320;
const frameHeight = 430;

// Kích thước đường tròn (mm)
const diameter = 60;
const radius = diameter / 2;

// Tính toán số cột và hàng
const columns = Math.floor(frameWidth / diameter);
const rows = Math.floor(frameHeight / diameter);

// Tính toán lề để căn giữa
const offsetX = (frameWidth - columns * diameter) / 2 + radius;
const offsetY = (frameHeight - rows * diameter) / 2 + radius;

// Tạo danh sách lưu tọa độ
let circlePositions = [];

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < columns; col++) {
    const x = offsetX + col * diameter;
    const y = offsetY + row * diameter;

    circlePositions.push({ x: x, y: y });
  }
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
fs.writeFileSync('circle_packing_grid.svg', svgContent);

console.log('Tệp SVG đã được tạo: circle_packing_grid.svg');
