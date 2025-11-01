const fs = require('fs');
const path = require('path');

function fixMotionDivs(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      fixMotionDivs(filePath);
    } else if (file.endsWith('.tsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Remove className from all motion elements
      content = content.replace(
        /<motion\.(\w+)([^>]*?)className="([^"]*?)"([^>]*?)>/g,
        '<motion.$1$2$4>'
      );
      
      fs.writeFileSync(filePath, content);
      console.log(`Fixed: ${filePath}`);
    }
  });
}

fixMotionDivs('./app');
fixMotionDivs('./components');
console.log('All motion element className issues fixed!');