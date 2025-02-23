const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');

const generateCodeFile = async (language, code) => {
  console.log('Starting code file generation process...');

  if (!code) {
    console.error('No code provided to save.');
    throw new Error('No code provided to save.');
  }

  const folderPath = path.join(__dirname, 'codes');
  console.log(`Code folder path: ${folderPath}`);

  try {
    await fs.access(folderPath);
    console.log('Code folder exists.');
  } catch {
    console.log('Code folder does not exist, creating it.');
    await fs.mkdir(folderPath, { recursive: true });
  }

  const fileExtension = {
    cpp: 'cpp',
    python: 'py'
  }[language];

  if (!fileExtension) {
    console.error('Unsupported language:', language);
    throw new Error('Unsupported language');
  }

  const fileName = `${uuidv4()}.${fileExtension}`;
  const filePath = path.join(folderPath, fileName);
  console.log(`Generated file name: ${fileName}`);
  console.log(`Full file path: ${filePath}`);

  try {
    await fs.writeFile(filePath, code);
    console.log(`Code file "${fileName}" saved successfully.`);
    return { success: true, message: `Code file "${fileName}" saved successfully.`, path: filePath };
  } catch (err) {
    console.error('Error saving code file:', err);
    throw new Error(`Failed to save code file: ${err.message}`);
  }
};

module.exports = generateCodeFile;