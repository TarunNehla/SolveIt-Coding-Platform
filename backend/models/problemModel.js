const mongoose = require('mongoose')

const ProblemSchema = new mongoose.Schema({
    name: String,
    discription: String,
    difficulty: String,
    sampleInput: String,
    sampleOutput: String,
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

ProblemSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const ProblemModel = mongoose.model('Problem', ProblemSchema);
module.exports = ProblemModel;