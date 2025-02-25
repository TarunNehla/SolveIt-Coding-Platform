const fs = require('fs');
const path = require('path');

function inputFileGenerate(problemId, textData) {
    const dirPath = path.join(__dirname, 'inputRun');
    const filePath = path.join(dirPath, `${problemId}.txt`);

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(filePath, textData, 'utf8');
}

module.exports = inputFileGenerate;