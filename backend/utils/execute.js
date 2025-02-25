const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

const executeFile = async (filePath, problemId, language) => {
    console.log('Starting execution process...');

    const inputFolderPath = path.join(__dirname, 'input');
    const outputFolderPath = path.join(__dirname, 'answer');
    const inputFile = path.join(inputFolderPath, `${problemId}.txt`);
    const outputFile = path.join(outputFolderPath, `${problemId}.txt`);

    try {
        console.log(`Reading input data from: ${inputFile}`);
        const inputData = await fs.readFile(inputFile, 'utf-8');
        console.log('Input data:', inputData);

        const folderPath = path.join(__dirname, 'output');
        try {
            await fs.access(folderPath);
            console.log('Output folder exists.');
        } catch {
            console.log('Output folder does not exist, creating it.');
            await fs.mkdir(folderPath, { recursive: true });
        }

        const fileName = path.basename(filePath).split('.')[0];
        const outPath = path.join(folderPath, fileName + '.out');

        let compileCommand, runCommand;
        let containerName;
        switch (language) {
            case 'cpp':
                containerName = 'my-gcc';
                compileCommand = `docker exec ${containerName} g++ /code/${fileName}.cpp -o /code/${fileName}.out`;
                runCommand = `docker exec ${containerName} sh -c "/code/${fileName}.out < /code/input.txt"`;
                console.log(`Selected language: C++`);
                break;
            case 'python':
                containerName = 'my-python';
                compileCommand = ''; // No compile step for Python
                runCommand = `docker exec ${containerName} sh -c "python /code/${fileName}.py < /code/input.txt"`;
                console.log(`Selected language: Python`);
                break;
            default:
                throw new Error('Unsupported language');
        }

        // Log the code file content before copying it to Docker
        const codeFileContent = await fs.readFile(filePath, 'utf-8');
        console.log('Code file content:', codeFileContent);

        // Ensure the /code directory exists in the Docker container
        console.log(`Ensuring /code directory exists in container ${containerName}`);
        await execPromise(`docker exec ${containerName} mkdir -p /code`);

        // Copy the code file into the Docker container
        console.log(`Copying file ${filePath} to Docker container ${containerName}`);
        await execPromise(`docker cp "${filePath}" ${containerName}:/code/${path.basename(filePath)}`);

        // Copy the input file into the Docker container
        console.log(`Copying input file ${inputFile} to Docker container ${containerName}`);
        await execPromise(`docker cp "${inputFile}" ${containerName}:/code/input.txt`);

        if (compileCommand) {
            console.log(`Compiling file inside Docker container with command: ${compileCommand}`);
            try {
                await execPromise(compileCommand);
            } catch (error) {
                console.error('Compilation error:', error.message);
                return { success: false, type: 'compilation', message: error.message };
            }
        }

        console.log(`Running file inside Docker container with command: ${runCommand}`);
        return new Promise((resolve, reject) => {
            exec(runCommand, (error, stdout, stderr) => {
                if (error) {
                    console.error('Runtime error:', error.message);
                    reject({ success: false, type: 'runtime', message: error.message });
                    return;
                }

                console.log('Execution output:', stdout);
                if (stderr) {
                    console.error('Execution stderr:', stderr);
                }

                console.log(`Reading expected output from: ${outputFile}`);
                fs.readFile(outputFile, 'utf-8')
                    .then((expectedOutput) => {
                        console.log('Expected output:', expectedOutput);
                        console.log('Comparing output...');
                        if (stdout.trim() === expectedOutput.trim()) {
                            console.log('Output matches expected output.');
                            resolve({ success: true, message: 'Output matches expected output.' });
                        } else {
                            console.log('Output does not match expected output.');
                            resolve({ success: false, type: 'output', message: 'Output does not match expected output.' });
                        }
                    })
                    .catch((err) => {
                        console.error('Error reading expected output file:', err);
                        reject({ success: false, type: 'file', message: 'Error reading expected output file.' });
                    });
            });
        });
    } catch (err) {
        console.error('Execution process failed:', err);
        throw err;
    }
};

const execPromise = (command) => {
    return new Promise((resolve, reject) => {
        console.log(`Executing command: ${command}`);
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error('Command execution error:', error);
                reject(error);
            } else {
                console.log('Command executed successfully');
                resolve(stdout);
            }
        });
    });
};

module.exports = executeFile;