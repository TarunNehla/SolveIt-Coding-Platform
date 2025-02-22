const {GoogleLogin}  = require('../controllers/authController');
const loginRouter = require('../controllers/login');

const router = require('express').Router();

router.get('/test', (req,res) => {
    res.send('check');
})

router.get('/google',GoogleLogin)

router.use('/login',loginRouter)


module.exports = router;