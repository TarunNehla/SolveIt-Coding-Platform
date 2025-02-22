const UserModel = require("../models/userModel");
const { oauth2client } = require("../utils/googleConfig");
const axios = require('axios')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const GoogleLogin = async (req,res) => {
    try{
        const {code} = req.query;
        const googleRes = await oauth2client.getToken(code);
        oauth2client.setCredentials(googleRes.tokens);

        const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)
        // console.log('complete data ', userRes);
        // console.log('data of userRes ', userRes.data);
        
        const {email, name, picture} = userRes.data;
        // console.log('picture url', picture);
        let user = await UserModel.findOne({email});
        if(!user){
            user = await UserModel.create({
                name,email
            })
        }
        const {_id} = user;
        const token = jwt.sign({_id,email},
            process.env.JWT_SECRET,
            {
                expiresIn : process.env.JWT_TIMEOUT
            }
        );
        return res.status(200).json({
            message : 'success',
            token,
            user
        })
    }
    catch(err){
        res.status(500).json({
            message : 'internal server error'
        })
    }
}

module.exports = {
    GoogleLogin
}