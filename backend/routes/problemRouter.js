const { authenticate } = require('../Middleware/authMiddleware');
const ProblemModel = require('../models/problemModel');
const UserModel = require('../models/userModel');
const executeFile = require('../utils/execute');
const generateCodeFile = require('../utils/generateFile');
const inputFileGenerate = require('../utils/inputFileGenerator');
const run = require('../utils/run');
const problemRouter = require('express').Router();

problemRouter.get('/', async (req,res) => {
    const problems = await ProblemModel.find({});
    res.status(200).json(problems);
})

problemRouter.get('/:id', async (req, res) => {
    try {
        const problem = await ProblemModel.findById(req.params.id);
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }
        res.status(200).json(problem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

problemRouter.post('/run/:id', authenticate, async (req, res) => {
    try {
        console.log('this is executing');
        const { input, code, language } = req.body;
        const id = req.params.id;
        const filePath = await generateCodeFile(language, code);
        await inputFileGenerate(id, input);
        const response = await run(filePath.path, id, language); 

        if (response.success) {
            res.status(200).json({ success: true, message: 'Execution successful', output: response.output });
        } else {
            res.status(200).json({ success: false, message: 'Execution failed', errorType: response.type, output: response.message });
        }
    } catch (error) {
        console.error('Error running code:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});



problemRouter.post('/:id', authenticate, async (req,res) => {
    try {
        const {code, language} = req.body;
        const id = req.params.id;
        const userId = req.user._id;

        const filePath = await generateCodeFile(language,code);
        const output = await executeFile(filePath.path,id,language);
        console.log('output', output);
        
        if (output.success) {
            await UserModel.findByIdAndUpdate(userId, { $addToSet: { problems: id } });
            await ProblemModel.findByIdAndUpdate(id, { $addToSet: { user: userId } });

            res.status(200).json({ success: true, message: 'Problem solved successfully', output });
        } else {
            res.status(200).json({ success: false, message: 'Problem not solved', errorType: output.type, output });
        }
    } catch (error) {
        console.error('Error solving problem:', error);
        res.status(500).json({ success: false, message: error.message });
    }
})

module.exports = problemRouter