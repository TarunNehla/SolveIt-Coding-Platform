const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

const run = async (filePath, problemId, language) => {
    console.log('Starting execution process...');

    const inputFolderPath = path.join(__dirname, 'inputRun');
    const inputFile = path.join(inputFolderPath, `${problemId}.txt`);

    try {
        console.log(`Reading input data from: ${inputFile}`);
        const inputData = await fs.readFile(inputFile, 'utf-8');
        console.log('Input data:', inputData);

        const folderPath = path.join(__dirname, 'outputRun');
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
                    resolve({ success: false, type: 'runtime', message: error.message });
                    return;
                }

                console.log('Execution output:', stdout);
                if (stderr) {
                    console.error('Execution stderr:', stderr);
                }

                resolve({ success: true, message: 'Execution successful', output: stdout });
            });
        });
    } catch (err) {
        console.error('Execution process failed:', err);
        return { success: false, message: err.message };
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

module.exports = run;