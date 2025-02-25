const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8080;
require('./models/dbConnection');
const authRouter = require('./routes/authrouter')
const cors = require('cors');
const UserRouter = require('./controllers/users');
const middleware = require('./utils/middleware');
const problemRouter = require('./routes/problemRouter');

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger)

app.use(express.static('dist'))

app.get('/', (req,res) => {
    res.send('hello from backend');
})


app.use('/auth', authRouter )
app.use('/api/users', UserRouter)
app.use('/api/problems', problemRouter)


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app