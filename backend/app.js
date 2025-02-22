const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8080;
require('./models/dbConnection');
const authRouter = require('./routes/authrouter')
const cors = require('cors');
const UserRouter = require('./controllers/users');
const middleware = require('./utils/middleware');

app.use(cors());
app.use(express.json());
app.get('/', (req,res) => {
    res.send('hello from backend');
})

app.use(middleware.requestLogger)
app.use('/auth', authRouter )
app.use('/api/users', UserRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app