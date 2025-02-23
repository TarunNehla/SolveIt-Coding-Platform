const { authenticate } = require('../Middleware/authMiddleware');
const ProblemModel = require('../models/problemModel');
const UserModel = require('../models/userModel');
const executeFile = require('../utils/execute');
const generateCodeFile = require('../utils/generateFile');
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

problemRouter.post('/:id', authenticate, async (req,res) => {
    try {
        const {code, language} = req.body;
        const id = req.params.id;
        const userId = req.user._id;

        const filePath = await generateCodeFile(language,code);
        const output = await executeFile(filePath.path,id,language);
        console.log('output', output);
        
        if (output.success) {
            // Update the UserModel with the new problem ID
            await UserModel.findByIdAndUpdate(userId, { $addToSet: { solvedProblems: id } });

            // Update the ProblemModel with the user ID
            await ProblemModel.findByIdAndUpdate(id, { $addToSet: { solvedBy: userId } });

            res.status(200).json({ success: true, message: 'Problem solved successfully', output });
        } else {
            res.status(400).json({ success: false, message: 'Problem not solved', output });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
})

module.exports = problemRouter