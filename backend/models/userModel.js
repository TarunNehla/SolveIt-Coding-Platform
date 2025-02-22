const  mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    passwordHash: String,
    problems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Problem'
        }
    ]
});

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
